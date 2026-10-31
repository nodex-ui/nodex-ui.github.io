// Sample analytics backend for nodexui/analytics (Go + Fiber v3).
//
//	POST /api/event   receives tracker events (text/plain JSON)
//	GET  /api/stats   aggregates for the sample dashboard (?domain=&days=1..90)
//
// The dashboard UI is the #/examples/analytics route of the Nodex UI site, which calls /api/stats cross-origin.
// Events live in memory only and /api/stats has no auth: a demo, not a production store.
// Run with `DEMO_SEED=1 go run .` to preload 30 days of synthetic traffic for demo.example.com.
package main

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"log"
	mrand "math/rand/v2"
	"net/url"
	"os"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

const maxRecords = 200_000

// Event is the compact payload POSTed by nodexui/analytics.
type Event struct {
	Name        string         `json:"n"`
	URL         string         `json:"u"`
	Domain      string         `json:"d"`
	Referrer    *string        `json:"r"`
	Props       map[string]any `json:"p"`
	Revenue     map[string]any `json:"$"`
	Interactive *bool          `json:"i"`
	HashRouting int            `json:"h"`
	ScrollDepth *int           `json:"sd"`
	EngagedMs   *int64         `json:"e"`
	Version     int            `json:"v"`
}

type record struct {
	at      time.Time
	visitor string
	ev      Event
}

type store struct {
	mu      sync.RWMutex
	records []record
	saltDay string
	salt    []byte
}

// visitorID is a cookieless daily visitor hash; the salt rotates each UTC day so IDs can't be linked
// across days. Callers must hold s.mu.
func (s *store) visitorID(domain, ip, ua string, now time.Time) string {
	if day := now.UTC().Format(time.DateOnly); s.saltDay != day {
		s.salt = make([]byte, 16)
		rand.Read(s.salt)
		s.saltDay = day
	}
	h := sha256.New()
	h.Write(s.salt)
	h.Write([]byte(domain + "|" + ip + "|" + ua))
	return hex.EncodeToString(h.Sum(nil))[:16]
}

func (s *store) add(ev Event, ip, ua string) {
	now := time.Now()
	s.mu.Lock()
	defer s.mu.Unlock()
	s.append(record{at: now, visitor: s.visitorID(ev.Domain, ip, ua, now), ev: ev})
}

// append keeps at most maxRecords, dropping the oldest 10% when full. Callers must hold s.mu.
func (s *store) append(r record) {
	if len(s.records) >= maxRecords {
		s.records = append([]record(nil), s.records[maxRecords/10:]...)
	}
	s.records = append(s.records, r)
}

type Totals struct {
	Visitors       int     `json:"visitors"`
	Pageviews      int     `json:"pageviews"`
	Events         int     `json:"events"`
	AvgTimeSec     float64 `json:"avgTimeSec"`
	AvgScrollDepth float64 `json:"avgScrollDepth"`
}

type Point struct {
	Date      string `json:"date"`
	Visitors  int    `json:"visitors"`
	Pageviews int    `json:"pageviews"`
}

type Row struct {
	Name     string `json:"name"`
	Visitors int    `json:"visitors"`
	Count    int    `json:"count"`
}

type Stats struct {
	Domain     string   `json:"domain"`
	Domains    []string `json:"domains"`
	Days       int      `json:"days"`
	Totals     Totals   `json:"totals"`
	Timeseries []Point  `json:"timeseries"`
	TopPages   []Row    `json:"topPages"`
	TopSources []Row    `json:"topSources"`
	TopEvents  []Row    `json:"topEvents"`
}

type counter struct {
	count    int
	visitors map[string]struct{}
}

func bump(m map[string]*counter, key, visitor string) {
	c := m[key]
	if c == nil {
		c = &counter{visitors: map[string]struct{}{}}
		m[key] = c
	}
	c.count++
	c.visitors[visitor] = struct{}{}
}

// top returns the 10 keys with the most hits.
func top(m map[string]*counter) []Row {
	rows := make([]Row, 0, len(m))
	for k, c := range m {
		rows = append(rows, Row{Name: k, Visitors: len(c.visitors), Count: c.count})
	}
	sort.Slice(rows, func(i, j int) bool {
		if rows[i].Count != rows[j].Count {
			return rows[i].Count > rows[j].Count
		}
		return rows[i].Name < rows[j].Name
	})
	return rows[:min(len(rows), 10)]
}

func pagePath(raw string) string {
	if u, err := url.Parse(raw); err == nil && u.Path != "" {
		return u.Path
	}
	return "/"
}

// source is the referrer's host, or "Direct / None" for no referrer or an internal one.
func source(ref *string, domain string) string {
	if ref != nil {
		if u, err := url.Parse(*ref); err == nil && u.Host != "" && u.Hostname() != domain {
			return strings.TrimPrefix(u.Hostname(), "www.")
		}
	}
	return "Direct / None"
}

func (s *store) stats(domain string, days int, now time.Time) Stats {
	s.mu.RLock()
	defer s.mu.RUnlock()

	st := Stats{Domain: domain, Domains: []string{}, Days: days}
	perDomain := map[string]int{}
	for _, r := range s.records {
		perDomain[r.ev.Domain]++
	}
	for d, n := range perDomain {
		st.Domains = append(st.Domains, d)
		if domain == "" && (n > perDomain[st.Domain] || n == perDomain[st.Domain] && d < st.Domain) {
			st.Domain = d // default to the busiest site
		}
	}
	sort.Strings(st.Domains)

	from := now.UTC().Truncate(24*time.Hour).AddDate(0, 0, -(days - 1))
	daily := map[string]*counter{}
	pages, sources, events := map[string]*counter{}, map[string]*counter{}, map[string]*counter{}
	visitors := map[string]struct{}{}
	depth := map[string]int{} // max scroll depth per visitor + page
	var engagedMs int64
	for _, r := range s.records {
		if r.ev.Domain != st.Domain || r.at.Before(from) {
			continue
		}
		path := pagePath(r.ev.URL)
		switch r.ev.Name {
		case "pageview":
			st.Totals.Pageviews++
			visitors[r.visitor] = struct{}{}
			bump(daily, r.at.UTC().Format(time.DateOnly), r.visitor)
			bump(pages, path, r.visitor)
			bump(sources, source(r.ev.Referrer, st.Domain), r.visitor)
		case "engagement":
			if r.ev.EngagedMs != nil {
				engagedMs += *r.ev.EngagedMs
			}
			if r.ev.ScrollDepth != nil {
				key := r.visitor + " " + path
				depth[key] = max(depth[key], *r.ev.ScrollDepth)
			}
		default:
			st.Totals.Events++
			bump(events, r.ev.Name, r.visitor)
		}
	}

	st.Totals.Visitors = len(visitors)
	if st.Totals.Pageviews > 0 {
		st.Totals.AvgTimeSec = float64(engagedMs) / 1000 / float64(st.Totals.Pageviews)
	}
	if len(depth) > 0 {
		sum := 0
		for _, d := range depth {
			sum += d
		}
		st.Totals.AvgScrollDepth = float64(sum) / float64(len(depth))
	}
	for i := range days {
		date := from.AddDate(0, 0, i).Format(time.DateOnly)
		p := Point{Date: date}
		if c := daily[date]; c != nil {
			p.Visitors, p.Pageviews = len(c.visitors), c.count
		}
		st.Timeseries = append(st.Timeseries, p)
	}
	st.TopPages, st.TopSources, st.TopEvents = top(pages), top(sources), top(events)
	return st
}

// seed adds 30 days of synthetic traffic for demo.example.com.
func (s *store) seed() {
	const domain = "demo.example.com"
	rng := mrand.New(mrand.NewPCG(42, 42))
	paths := []string{"/", "/", "/", "/pricing", "/pricing", "/docs", "/docs/install", "/blog/launch", "/signup"}
	refs := []string{"", "", "https://www.google.com/", "https://www.google.com/", "https://github.com/", "https://news.ycombinator.com/", "https://t.co/x"}
	today := time.Now().UTC().Truncate(24 * time.Hour)
	s.mu.Lock()
	defer s.mu.Unlock()
	for d := 29; d >= 0; d-- {
		day := today.AddDate(0, 0, -d)
		n := 40 + rng.IntN(30) + (29-d)*2 // gentle upward trend
		if wd := day.Weekday(); wd == time.Saturday || wd == time.Sunday {
			n /= 2
		}
		for v := range n {
			visitor := day.Format(time.DateOnly) + "-" + strconv.Itoa(v)
			at := day.Add(time.Duration(rng.IntN(86_400)) * time.Second)
			if at.After(time.Now()) {
				at = time.Now()
			}
			ref := refs[rng.IntN(len(refs))]
			for p := range 1 + rng.IntN(4) {
				ev := Event{Name: "pageview", URL: "https://" + domain + paths[rng.IntN(len(paths))], Domain: domain, Version: 36}
				if p == 0 && ref != "" {
					ev.Referrer = &ref
				}
				s.append(record{at: at, visitor: visitor, ev: ev})
				ms, sd := int64(2_000+rng.IntN(120_000)), 20+rng.IntN(81)
				s.append(record{at: at, visitor: visitor, ev: Event{Name: "engagement", URL: ev.URL, Domain: domain, EngagedMs: &ms, ScrollDepth: &sd, Version: 36}})
			}
			if rng.IntN(100) < 6 {
				s.append(record{at: at, visitor: visitor, ev: Event{Name: "Signup", URL: "https://" + domain + "/signup", Domain: domain, Version: 36}})
			}
			if rng.IntN(100) < 12 {
				s.append(record{at: at, visitor: visitor, ev: Event{Name: "Outbound Link: Click", URL: "https://" + domain + "/docs", Domain: domain, Version: 36}})
			}
		}
	}
	sort.SliceStable(s.records, func(i, j int) bool { return s.records[i].at.Before(s.records[j].at) })
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func main() {
	db := &store{}
	if os.Getenv("DEMO_SEED") == "1" {
		db.seed()
	}

	app := fiber.New(fiber.Config{BodyLimit: 16 * 1024})
	app.Use(cors.New(cors.Config{AllowOrigins: strings.Split(env("ALLOWED_ORIGINS", "*"), ",")}))

	app.Post("/api/event", func(c fiber.Ctx) error {
		// Body is text/plain, so decode it directly instead of c.Bind().JSON().
		var ev Event
		if err := json.Unmarshal(c.Body(), &ev); err != nil || ev.Name == "" || ev.URL == "" || ev.Domain == "" {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		db.add(ev, c.IP(), c.Get(fiber.HeaderUserAgent))
		return c.SendStatus(fiber.StatusAccepted)
	})

	app.Get("/api/stats", func(c fiber.Ctx) error {
		days, err := strconv.Atoi(c.Query("days", "7"))
		if err != nil || days < 1 || days > 90 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "days must be 1..90"})
		}
		return c.JSON(db.stats(c.Query("domain"), days, time.Now()))
	})

	log.Fatal(app.Listen(env("ADDR", ":8080")))
}
