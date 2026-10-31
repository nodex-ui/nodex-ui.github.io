# Analytics

Nodex UI ships a cookieless web-analytics service, ported from [`@plausible-analytics/tracker`](https://www.npmjs.com/package/@plausible-analytics/tracker) 0.4.6 (MIT; notice in `LICENSE`). Nothing is collected until the page calls `init({ backendUrl })`. Available from `nodexui` 1.1.0.

It is an optional, standalone feature: it is **not** part of `dist/nodexui.min.js`/`dist/nodexui.esm.js`, and it needs neither of them (no framework or component runtime). Load it on its own, with or without the rest of Nodex UI (~5.6 KB minified):

```js
// npm / bundler
import { init, track } from "nodexui/analytics";
init({ backendUrl: "https://stats.example.com" });
```

```html
<!-- ES module from the CDN (or map it as "nodexui/analytics" in an import map) -->
<script type="module">
  import { init } from "https://cdn.jsdelivr.net/npm/nodexui@1.3.1/dist/nodexui.analytics.esm.js";
  init({ backendUrl: "https://stats.example.com" });
</script>

<!-- Classic script tag: sets window.thebase.analytics (load order vs dist/nodexui.min.js doesn't matter) -->
<script src="https://cdn.jsdelivr.net/npm/nodexui@1.3.1/dist/nodexui.analytics.min.js"></script>
<script>
  thebase.analytics.init({ backendUrl: "https://stats.example.com" });
</script>
```

Types ship as `dist/types/analytics.d.ts` (resolved automatically for `nodexui/analytics`).

`init()` can be called once. It sends the first pageview, then follows `history.pushState`/`popstate` navigations (or `hashchange` with `hashBasedRouting: true`).

## Options

| Option | Default | Effect |
| --- | --- | --- |
| `backendUrl` | required¹ | Analytics backend origin, e.g. `https://stats.example.com`. Events are POSTed (`text/plain` JSON, no CORS preflight) to `<backendUrl><apiPath>`; a trailing `/` is fine. |
| `apiPath` | `/api/event` | Path appended to `backendUrl` (leading `/` optional), e.g. `/v1/collect`. |
| `endpoint` | — | Full event URL instead of `backendUrl` + `apiPath` (`http(s)://…` or a same-site `/path`, e.g. behind a proxy). |
| `domain` | `location.hostname` | Site name reported with every event. |
| `autoCapturePageviews` | `true` | Send pageviews automatically. |
| `hashBasedRouting` | `false` | Treat `#` changes as navigations. |
| `outboundLinks` | `false` | Track clicks on links to other hosts as `Outbound Link: Click`. |
| `fileDownloads` | `false` | Track download links as `File Download`; pass `{ fileExtensions: [...] }` to replace `analytics.DEFAULT_FILE_TYPES`. |
| `formSubmissions` | `false` | Track valid form submits as `Form: Submission`. |
| `captureOnLocalhost` | `false` | Also send from `localhost`/`127.x`/`file:`. |
| `logging` | `true` | `console.warn` when an event is ignored. |
| `customProperties` | — | Props added to every event (object, or `(eventName) => object`). |
| `transformRequest` | — | Rewrite the payload; return a falsy value to drop the event. |
| `bindToWindow` | `true` | Bind the tracker to `window.thebase.track`. |

¹ One of `backendUrl` or `endpoint` is required. `init()` throws if neither is given, or if the URL has no `http(s)://` scheme and doesn't start with `/` (e.g. `stats.example.com`), since that would silently post to a path on your own site.

Your backend should answer with `Access-Control-Allow-Origin` for your site. The event is delivered either way (there is no preflight), but without that header the browser hides the response and `callback` receives `{ error }`.

## Custom events

```js
thebase.track("Signup", { props: { plan: "pro" }, revenue: { amount: 10, currency: "USD" } });
```

`track(name, options)` accepts `props`, `revenue`, `interactive: false` (excluded from bounce rate), `url` (override the page URL), and `callback(result)` — called with `{ status }`, `{ error }`, or `undefined` when the event was ignored.

Or tag markup with classes — no JavaScript needed:

```html
<button class="thebase-event-name=Signup thebase-event-plan=pro">Sign up</button>
<form class="thebase-event-name=Lead">...</form>
```

`+` in a class value becomes a space; `thebase-revenue-amount=10 thebase-revenue-currency=USD` attaches revenue.

## Visitor context

`visitorContext()` returns coarse facts about the visitor's setup. Pass it as `customProperties` to attach them to every event (available from 1.1.1):

```js
import { init, visitorContext } from "nodexui/analytics";
init({ backendUrl: "https://stats.example.com", customProperties: visitorContext });
// every event's props now include { tz: "Asia/Ho_Chi_Minh", lang: "vi-VN", screen: "Mobile" }
```

| Prop | Value |
| --- | --- |
| `tz` | `Intl.DateTimeFormat().resolvedOptions().timeZone`. Some browsers report legacy aliases (Chromium sends `Asia/Saigon`), so backends should canonicalize. |
| `lang` | `navigator.language`, e.g. `vi-VN`. |
| `screen` | Viewport width bucket: `Mobile` (< 576 px), `Tablet` (< 992), `Laptop` (< 1440), `Desktop`. |

The values are deliberately coarse: no exact pixels, nothing persistent. Backends can treat `tz`, `lang` and `screen` as visit dimensions instead of event props. To combine it with your own props, call it inside your function: `customProperties: (name) => ({ ...visitorContext(), plan: "pro" })`. Don't use `tz`, `lang` or `screen` as your own event prop names: event props override custom properties with the same key, so the visitor's value would be lost. Use something like `uiLang` instead. The IP address and user agent never appear in the payload; the server reads them from the HTTP request (see [Receiving events](#receiving-events-backend)).

## Engagement

After each pageview the service measures time on screen and maximum scroll depth, and sends an `engagement` event (`e` = ms, `sd` = %) when the tab is hidden, loses focus, or navigates — only if the visitor scrolled further or spent at least 3 seconds since the last report.

## Ignored visits

Events are dropped (and `callback()` gets `undefined`) on localhost unless `captureOnLocalhost` is set, in automated browsers (`navigator.webdriver`, Cypress, PhantomJS, Nightmare — unless `window.__thebase` is set), or when `localStorage.thebase_ignore === "true"` (set that on your own devices to exclude them).

## Receiving events (backend)

Any HTTP server can collect events. It needs one route — `POST <backendUrl><apiPath>` (default `/api/event`) — that:

1. Reads the **raw body** as JSON. The tracker sends `Content-Type: text/plain` to avoid a CORS preflight, so framework helpers that only parse `application/json` bodies won't decode it.
2. Rejects bodies missing `n`, `u` or `d`, and caps the body size (events are well under 1 KB).
3. Answers quickly (`202 Accepted`, no body) with `Access-Control-Allow-Origin` for your site. Store or queue the event after you reply, or send it to a queue, so the visitor's browser never waits on the database.

### Payload

| Key | Type | Meaning |
| --- | --- | --- |
| `n` | string | Event name: `pageview`, `engagement`, or a custom name (`Signup`, `Outbound Link: Click`, `File Download`, `Form: Submission`, …). |
| `u` | string | Page URL. |
| `d` | string | Site `domain`. |
| `r` | string \| null | `document.referrer` (pageviews and custom events). |
| `p` | object | Custom properties (`props` + `customProperties`); values are usually strings. |
| `$` | object | Revenue, e.g. `{ "amount": 10, "currency": "USD" }` (`amount` is a string when it comes from a class tag). |
| `i` | `false` | Present only for non-interactive events (excluded from bounce rate). |
| `h` | `1` | Present only with `hashBasedRouting`. |
| `sd` | number | `engagement` only: max scroll depth, %. |
| `e` | number | `engagement` only: engaged time, ms. |
| `v` | number | Tracker version (currently `36`). |

The payload carries no visitor ID or cookie. To count unique visitors, derive one on the server, e.g. `sha256(dailySalt + domain + clientIP + userAgent)`. Rotate the salt every day and never store the raw IP. If the server sits behind a proxy or load balancer, configure it to trust the proxy's `X-Forwarded-For` header so it sees the visitor's IP instead of the proxy's.

### Go — Fiber v3

Requires Go 1.25+ and `go get github.com/gofiber/fiber/v3` (tested with v3.5.0).

```go
package main

import (
	"encoding/json"
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

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

func main() {
	app := fiber.New(fiber.Config{BodyLimit: 16 * 1024})
	app.Use(cors.New(cors.Config{AllowOrigins: []string{"https://www.example.com"}}))

	app.Post("/api/event", func(c fiber.Ctx) error {
		// Body is text/plain, so decode it directly instead of c.Bind().JSON().
		var ev Event
		if err := json.Unmarshal(c.Body(), &ev); err != nil || ev.Name == "" || ev.URL == "" || ev.Domain == "" {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		log.Printf("%s %s %s ip=%s ua=%q", ev.Domain, ev.Name, ev.URL, c.IP(), c.Get(fiber.HeaderUserAgent))
		// TODO: enqueue/store ev.
		return c.SendStatus(fiber.StatusAccepted)
	})

	log.Fatal(app.Listen(":8080"))
}
```

### Python — FastAPI

Requires Python 3.10+ and `pip install "fastapi[standard]"` (tested with FastAPI 0.142.2 / Pydantic 2.13). Run with `fastapi run main.py`.

```python
from typing import Any

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["https://www.example.com"], allow_methods=["POST"])


class Event(BaseModel):
    """Compact payload POSTed by nodexui/analytics."""

    name: str = Field(alias="n", min_length=1)
    url: str = Field(alias="u", min_length=1)
    domain: str = Field(alias="d", min_length=1)
    referrer: str | None = Field(None, alias="r")
    props: dict[str, Any] | None = Field(None, alias="p")
    revenue: dict[str, Any] | None = Field(None, alias="$")
    interactive: bool | None = Field(None, alias="i")
    hash_routing: int | None = Field(None, alias="h")
    scroll_depth: int | None = Field(None, alias="sd")
    engaged_ms: int | None = Field(None, alias="e")
    version: int = Field(alias="v")


@app.post("/api/event", status_code=202)
async def collect(request: Request) -> Response:
    # Body is text/plain, so parse the raw bytes instead of declaring `event: Event` as a parameter.
    body = await request.body()
    if len(body) > 16 * 1024:
        return Response(status_code=413)
    try:
        event = Event.model_validate_json(body)
    except ValidationError:
        return Response(status_code=400)
    ip = request.client.host if request.client else None
    print(event.domain, event.name, event.url, ip, request.headers.get("user-agent"))
    # TODO: enqueue/store event.
    return Response(status_code=202)
```

Point the tracker at either server with `init({ backendUrl: "https://stats.example.com" })`. To smoke-test the server, run:

```sh
curl -i -X POST http://localhost:8080/api/event -H 'Content-Type: text/plain' \
  -d '{"n":"pageview","v":36,"u":"https://www.example.com/","d":"www.example.com","r":null}'
# HTTP/1.1 202 Accepted
```

## Sample dashboard

[`examples/analytics/`](/analytics/dashboard/?backend=http://localhost:8080) contains a working dashboard plus two complete sample backends: [`server-go`](/analytics/server-go/main.go) (Fiber v3) and [`server-fastapi`](/analytics/server-fastapi/main.py). Each one extends the receivers above with an in-memory store, a daily-salted cookieless visitor hash, a `GET /api/stats` endpoint, and static hosting for the dashboard.

The dashboard ([`dashboard/`](/analytics/dashboard/?backend=http://localhost:8080)) is a pure application that loads `nodexui@1.3.1` from jsDelivr: KPI `Card`s, an area `Chart`, top pages/sources/events `Table`s, site and period `NativeSelect`s, and a `ThemeButton`. It refreshes every 30 s and tracks its own visits through `nodexui/analytics`, so a fresh backend has data straight away.

```sh
# Go (1.25+)
cd examples/analytics/server-go && DEMO_SEED=1 go run .

# or Python (3.10+)
cd examples/analytics/server-fastapi && pip install -r requirements.txt && DEMO_SEED=1 fastapi run main.py --port 8080
```

Open <http://localhost:8080/>, the backend serves the dashboard itself. If you are browsing these docs from `npm run dev` (port 5173), the [dashboard link](/analytics/dashboard/?backend=http://localhost:8080) also works once a backend is running on port 8080; until then it shows a "Can't load stats" message. `DEMO_SEED=1` preloads 30 days of synthetic traffic for `demo.example.com`. Other environment variables:
- `ADDR`: the Go listen address.
- `ALLOWED_ORIGINS`: a comma-separated CORS allow-list (default `*`).
- `DASHBOARD_DIR`: the folder served at `/`.

To serve the dashboard from somewhere else, open it with `?backend=https://stats.example.com`.

`GET /api/stats?domain=<site>&days=<1..90>` (default: the busiest site, 7 days, UTC) returns:

```json
{
  "domain": "demo.example.com",
  "domains": ["demo.example.com", "www.example.com"],
  "days": 7,
  "totals": { "visitors": 643, "pageviews": 1582, "events": 124, "avgTimeSec": 62.7, "avgScrollDepth": 63.4 },
  "timeseries": [{ "date": "2026-09-28", "visitors": 105, "pageviews": 261 }],
  "topPages":   [{ "name": "/pricing", "visitors": 296, "count": 373 }],
  "topSources": [{ "name": "google.com", "visitors": 186, "count": 186 }],
  "topEvents":  [{ "name": "Signup", "visitors": 40, "count": 40 }]
}
```

The sample servers are demos, not production stores:
- Events live in memory only and are lost on restart.
- `/api/stats` has no authentication.

Before going live, persist events (e.g. PostgreSQL or ClickHouse), put `/api/stats` behind auth, and restrict `ALLOWED_ORIGINS`.
