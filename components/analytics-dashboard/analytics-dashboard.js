// Sample analytics dashboard for `nodexui/analytics`, shown at /index.html#/blocks/analytics. It runs on
// generated demo data in the same shape as GET /api/stats of the sample backends (server-go/, server-fastapi/),
// so the page works without any server.
import {
  Button, Card, CardBody, CardDescription, CardHeader, CardTitle, Chart, Component, NativeSelect, onMounted,
  onWillUnmount, Table, useRef, useState,
} from "nodexui";

const DAY_MS = 86_400_000;
const CHART_HEIGHT = 250;
const PERIODS = [
  { days: 1, label: "Today" },
  { days: 7, label: "Last 7 days" },
  { days: 30, label: "Last 30 days" },
  { days: 90, label: "Last 90 days" },
];
const DOMAINS = ["shop.example.com", "docs.example.com", "blog.example.com"];
const PAGES = ["/", "/pricing", "/docs/getting-started", "/blog/launch-week", "/about", "/contact"];
const SOURCES = ["Direct", "google.com", "github.com", "news.ycombinator.com", "x.com"];
const EVENTS = ["outbound_click", "signup", "file_download", "form_submit", "copy_code"];

const number = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 });
const shortDate = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", timeZone: "UTC" });

/** Shows a number of seconds the way people read it: "42s" or "3m 05s". */
function duration(seconds) {
  const s = Math.round(seconds);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

/** Rounds the y-axis maximum up to 1, 2, 2.5 or 5 × 10^n so grid labels stay readable. */
function niceMax(value) {
  if (value <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(value));
  return [1, 2, 2.5, 5, 10].map((step) => step * pow).find((step) => step >= value);
}

/** Horizontal position of the i-th day on the chart; a single day sits in the middle. */
function xAt(index, geo) {
  const span = geo.plot.right - geo.plot.left;
  return geo.count === 1 ? geo.plot.left + span / 2 : geo.plot.left + (index * span) / (geo.count - 1);
}

/** Vertical position of a value on the chart (0 at the bottom, the axis maximum at the top). */
function yAt(value, geo) {
  return geo.plot.bottom - (value / geo.max) * (geo.plot.bottom - geo.plot.top);
}

/** SVG path that connects one series (visitors or pageviews) day by day. */
function linePath(points, key, geo) {
  return points.map((p, i) => `${i ? "L" : "M"}${xAt(i, geo).toFixed(1)} ${yAt(p[key], geo).toFixed(1)}`).join(" ");
}

/** The same path closed down to the x-axis, so it can be filled as an area. */
function areaPath(points, key, geo) {
  return `${linePath(points, key, geo)} L${xAt(geo.count - 1, geo).toFixed(1)} ${geo.plot.bottom} L${xAt(0, geo).toFixed(1)} ${geo.plot.bottom} Z`;
}

/** Everything the traffic chart draws. The viewBox is as wide as the chart in CSS pixels, so text never scales. */
function buildChart(points, width) {
  const plot = { left: 44, right: width - 16, top: 12, bottom: 216 };
  const geo = { plot, count: points.length, max: niceMax(Math.max(...points.map((p) => p.pageviews), 0)) };
  const labelStep = Math.ceil(points.length / Math.max(2, Math.floor((plot.right - plot.left) / 110)));
  return {
    plot,
    viewBox: `0 0 ${width} ${CHART_HEIGHT}`,
    grid: [0, 0.25, 0.5, 0.75, 1].map((f) => ({ y: yAt(geo.max * f, geo), label: number.format(geo.max * f) })),
    xLabels: points
      .map((p, i) => ({ x: xAt(i, geo), label: shortDate.format(new Date(p.date)) }))
      .filter((_, i) => (i % labelStep === 0 && points.length - 1 - i >= labelStep / 2) || i === points.length - 1),
    dots: points.length <= 31
      ? points.map((p, i) => ({
          key: p.date, x: xAt(i, geo), y: yAt(p.visitors, geo),
          title: `${shortDate.format(new Date(p.date))}: ${p.visitors} visitors, ${p.pageviews} pageviews`,
        }))
      : [],
    visitorsLine: linePath(points, "visitors", geo),
    visitorsArea: areaPath(points, "visitors", geo),
    pageviewsLine: linePath(points, "pageviews", geo),
    pageviewsArea: areaPath(points, "pageviews", geo),
  };
}

/** One "top N" table card (pages, sources or events), with the largest count used to scale the row bars. */
function statList(title, description, column, countLabel, rows) {
  return { title, description, column, countLabel, rows, max: Math.max(1, ...rows.map((r) => r.count)) };
}

/** A random number between min and max, used to make the demo data look organic. */
function between(min, max) {
  return min + Math.random() * (max - min);
}

/** Spreads a total over named rows with falling shares (top pages, sources, events), largest first. */
function topRows(names, total) {
  return names
    .map((name, i) => {
      const count = Math.round((total * 0.4 * between(0.7, 1.3)) / (i + 1));
      return { name, count, visitors: Math.round(count * between(0.55, 0.85)) };
    })
    .sort((a, b) => b.count - a.count);
}

/** Builds demo stats for one site and period in the GET /api/stats shape: daily traffic with quieter weekends
 * and a slight upward trend, headline totals and top-N lists. */
function dummyStats(domain, days) {
  const base = 160 * (DOMAINS.indexOf(domain) + 1);
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const timeseries = Array.from({ length: days }, (_, i) => {
    const date = new Date(today - (days - 1 - i) * DAY_MS);
    const weekend = date.getUTCDay() % 6 === 0 ? 0.6 : 1;
    const visitors = Math.round(base * weekend * between(0.8, 1.2) * (1 + (0.3 * i) / days));
    return { date: date.toISOString().slice(0, 10), visitors, pageviews: Math.round(visitors * between(1.8, 2.8)) };
  });
  const visitors = Math.round(timeseries.reduce((sum, p) => sum + p.visitors, 0) * 0.8);
  const pageviews = timeseries.reduce((sum, p) => sum + p.pageviews, 0);
  return {
    domain,
    domains: DOMAINS,
    timeseries,
    totals: { visitors, pageviews, avgTimeSec: between(40, 160), avgScrollDepth: between(45, 80) },
    topPages: topRows(PAGES, pageviews),
    topSources: topRows(SOURCES, visitors),
    topEvents: topRows(EVENTS, pageviews * 0.3),
  };
}

/** The dashboard page: site and period pickers, four headline numbers, a traffic chart and three top-N tables,
 * all from demo data that the refresh button regenerates. */
export class AnalyticsDashboard extends Component {
  static components = {
    Button, Card, CardBody, CardDescription, CardHeader, CardTitle, Chart, NativeSelect, Table,
  };

  static template = "examples.AnalyticsDashboard";

  periods = PERIODS;

  setup() {
    this.state = useState({ domain: DOMAINS[0], days: 7, stats: null, chartWidth: 640 });
    this.chartBody = useRef("chartBody");
    this.resize = new ResizeObserver(([entry]) => {
      this.state.chartWidth = Math.max(320, Math.round(entry.contentRect.width));
    });
    this.load();
    onMounted(() => this.resize.observe(this.chartBody.el));
    onWillUnmount(() => this.resize.disconnect());
  }

  get stats() {
    return this.state.stats;
  }

  get daysValue() {
    return String(this.state.days);
  }

  get chart() {
    return buildChart(this.stats.timeseries, this.state.chartWidth);
  }

  get kpis() {
    const t = this.stats.totals;
    return [
      { label: "Unique visitors", value: number.format(t.visitors) },
      { label: "Pageviews", value: number.format(t.pageviews) },
      { label: "Avg. time on page", value: duration(t.avgTimeSec) },
      { label: "Avg. scroll depth", value: `${Math.round(t.avgScrollDepth)}%` },
    ];
  }

  get lists() {
    const s = this.stats;
    return [
      statList("Top pages", "Most viewed paths", "Page", "Views", s.topPages),
      statList("Top sources", "Where visitors came from", "Source", "Views", s.topSources),
      statList("Events", "Custom and auto-captured events", "Event", "Count", s.topEvents),
    ];
  }

  /** Short number for table cells, e.g. 1.2K. */
  format(value) {
    return number.format(value);
  }

  /** Switches the site or the period and regenerates the demo stats for it. */
  select(key, value) {
    this.state[key] = key === "days" ? Number(value) : value;
    this.load();
  }

  /** Generates fresh demo stats for the chosen site and period; no server is called. */
  load() {
    this.state.stats = dummyStats(this.state.domain, this.state.days);
  }
}
