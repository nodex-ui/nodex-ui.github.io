// Sample analytics dashboard: pure Nodex UI + the Nodex UI components, fed by GET /api/stats of the sample
// backends in ../server-go and ../server-fastapi. Served by those servers at "/", or open it from any
// static host with ?backend=https://stats.example.com.
import { Component, mount, onMounted, onWillStart, onWillUnmount, useRef, useState, xml } from "nodexui";
import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  Chart,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  NativeSelect,
  Skeleton,
  Table,
  ThemeButton,
} from "nodexui";
import { init as initAnalytics } from "nodexui/analytics";

const BACKEND = (new URLSearchParams(location.search).get("backend") || location.origin).replace(/\/+$/, "");
const REFRESH_MS = 30_000;
const PERIODS = [
  { days: 1, label: "Today" },
  { days: 7, label: "Last 7 days" },
  { days: 30, label: "Last 30 days" },
  { days: 90, label: "Last 90 days" },
];

// The dashboard tracks its own visits too, so a fresh backend has data to show (domain = this host).
initAnalytics({ backendUrl: BACKEND, captureOnLocalhost: true });

const number = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 });
const shortDate = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", timeZone: "UTC" });

function duration(seconds) {
  const s = Math.round(seconds);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

// Rounds the y-axis maximum up to 1, 2, 2.5 or 5 × 10^n so grid labels stay readable.
function niceMax(value) {
  if (value <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(value));
  return [1, 2, 2.5, 5, 10].map((step) => step * pow).find((step) => step >= value);
}

// SVG geometry for the area chart: the viewBox is as wide as the chart body in CSS pixels, so text never scales.
const CHART_HEIGHT = 250;

function buildChart(points, width) {
  const plot = { left: 44, right: width - 16, top: 12, bottom: 216 };
  const max = niceMax(Math.max(...points.map((p) => p.pageviews), 0));
  const span = plot.right - plot.left;
  const x = (i) => (points.length === 1 ? plot.left + span / 2 : plot.left + (i * span) / (points.length - 1));
  const y = (v) => plot.bottom - (v / max) * (plot.bottom - plot.top);
  const line = (key) => points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(" ");
  const area = (key) => `${line(key)} L${x(points.length - 1).toFixed(1)} ${plot.bottom} L${x(0).toFixed(1)} ${plot.bottom} Z`;
  const labelStep = Math.ceil(points.length / Math.max(2, Math.floor(span / 110)));
  return {
    plot: plot,
    viewBox: `0 0 ${width} ${CHART_HEIGHT}`,
    grid: [0, 0.25, 0.5, 0.75, 1].map((f) => ({ y: y(max * f), label: number.format(max * f) })),
    xLabels: points
      .map((p, i) => ({ x: x(i), label: shortDate.format(new Date(p.date)) }))
      .filter((_, i) => i % labelStep === 0 || i === points.length - 1),
    dots: points.length <= 31
      ? points.map((p, i) => ({
          key: p.date, x: x(i), y: y(p.visitors),
          title: `${shortDate.format(new Date(p.date))}: ${p.visitors} visitors, ${p.pageviews} pageviews`,
        }))
      : [],
    visitorsLine: line("visitors"),
    visitorsArea: area("visitors"),
    pageviewsLine: line("pageviews"),
    pageviewsArea: area("pageviews"),
  };
}

class Dashboard extends Component {
  static components = {
    Button, Card, CardBody, CardDescription, CardHeader, CardTitle, Chart,
    Empty, EmptyDescription, EmptyHeader, EmptyTitle, NativeSelect, Skeleton, Table, ThemeButton,
  };

  static template = xml`
    <div class="container-xl py-4 d-grid gap-4">
      <header class="d-flex flex-wrap align-items-center gap-2">
        <div class="me-auto">
          <h1 class="h4 mb-0">Analytics</h1>
          <p class="text-body-secondary small mb-0">Source: <t t-esc="backend"/></p>
        </div>
        <NativeSelect ariaLabel="'Site'" value="state.domain" onChange="(v) => this.select('domain', v)"
                      disabled="!domains.length" style="'width: auto'">
          <option t-if="!domains.length" value="">No sites yet</option>
          <option t-foreach="domains" t-as="d" t-key="d" t-att-value="d" t-att-selected="d === state.domain" t-esc="d"/>
        </NativeSelect>
        <NativeSelect ariaLabel="'Period'" value="daysValue" onChange="(v) => this.select('days', v)"
                      style="'width: auto'">
          <option t-foreach="periods" t-as="p" t-key="p.days" t-att-value="p.days" t-att-selected="p.days === state.days" t-esc="p.label"/>
        </NativeSelect>
        <Button variant="'outline'" size="'icon'" icon="'refresh-cw'" ariaLabel="'Refresh'" title="'Refresh'"
                disabled="state.loading" onClick="() => this.load()"/>
        <ThemeButton size="'icon'"/>
      </header>

      <Card t-if="state.error">
        <CardBody>
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Can't load stats</EmptyTitle>
              <EmptyDescription><t t-esc="state.error"/></EmptyDescription>
            </EmptyHeader>
            <Button variant="'outline'" label="'Try again'" onClick="() => this.load()"/>
          </Empty>
        </CardBody>
      </Card>

      <t t-else="">
        <div class="row g-3">
          <div class="col-6 col-lg-3" t-foreach="kpis" t-as="kpi" t-key="kpi.label">
            <Card className="'h-100'">
              <CardBody>
                <div class="text-body-secondary small" t-esc="kpi.label"/>
                <Skeleton t-if="!stats" style="'height: 2.1rem; width: 60%'" className="'mt-1'"/>
                <div t-else="" class="kpi-value" t-esc="kpi.value"/>
              </CardBody>
            </Card>
          </div>
        </div>

        <Chart type="'area'" variant="'area-card'">
          <div b-chart-header="">
            <h3 b-chart-title="">Traffic</h3>
            <p b-chart-description="">Unique visitors and pageviews per day (UTC)</p>
          </div>
          <div b-chart-body="" t-ref="chartBody">
            <Skeleton t-if="!chart" style="'height: 15rem'"/>
            <svg t-else="" t-att-viewBox="chart.viewBox" role="img" aria-label="Visitors and pageviews per day">
              <g b-chart-grid="">
                <line t-foreach="chart.grid" t-as="g" t-key="g_index" t-att-x1="chart.plot.left" t-att-x2="chart.plot.right" t-att-y1="g.y" t-att-y2="g.y"/>
              </g>
              <g b-chart-axis="">
                <text t-foreach="chart.grid" t-as="g" t-key="g_index" t-att-x="chart.plot.left - 8" t-att-y="g.y + 4" text-anchor="end" t-esc="g.label"/>
                <text t-foreach="chart.xLabels" t-as="l" t-key="l_index" t-att-x="l.x" y="240" text-anchor="middle" t-esc="l.label"/>
              </g>
              <path b-chart-area="" style="--b-chart-color: var(--b-chart-2)" t-att-d="chart.pageviewsArea"/>
              <path b-chart-line="" b-att-thin="" style="--b-chart-color: var(--b-chart-2)" t-att-d="chart.pageviewsLine"/>
              <path b-chart-area="" b-att-strong="" style="--b-chart-color: var(--b-chart-1)" t-att-d="chart.visitorsArea"/>
              <path b-chart-line="" style="--b-chart-color: var(--b-chart-1)" t-att-d="chart.visitorsLine"/>
              <circle t-foreach="chart.dots" t-as="d" t-key="d.key" b-chart-dot="" r="3"
                      style="--b-chart-color: var(--b-chart-1)" t-att-cx="d.x" t-att-cy="d.y"><title t-esc="d.title"/></circle>
            </svg>
          </div>
          <div b-chart-footer="">
            <div b-chart-legend="">
              <span style="--b-chart-color: var(--b-chart-1)">Visitors</span>
              <span style="--b-chart-color: var(--b-chart-2)">Pageviews</span>
            </div>
          </div>
        </Chart>

        <div class="row g-3">
          <div class="col-12 col-lg-4" t-foreach="lists" t-as="list" t-key="list.title">
            <Card className="'h-100'">
              <CardHeader>
                <CardTitle><t t-esc="list.title"/></CardTitle>
                <CardDescription><t t-esc="list.description"/></CardDescription>
              </CardHeader>
              <CardBody>
                <Skeleton t-if="!stats" style="'height: 8rem'"/>
                <p t-elif="!list.rows.length" class="text-body-secondary small mb-0">No data for this period.</p>
                <Table t-else="" className="'table-sm mb-0'">
                  <thead>
                    <tr><th t-esc="list.column"/><th class="num">Visitors</th><th class="num" t-esc="list.countLabel"/></tr>
                  </thead>
                  <tbody>
                    <tr t-foreach="list.rows" t-as="row" t-key="row.name">
                      <td>
                        <div class="bar-cell text-truncate">
                          <div class="bar" t-att-style="'width: ' + (row.count / list.max * 100) + '%'"/>
                          <span t-esc="row.name"/>
                        </div>
                      </td>
                      <td class="num" t-esc="format(row.visitors)"/>
                      <td class="num" t-esc="format(row.count)"/>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </div>
      </t>
    </div>`;

  setup() {
    this.backend = BACKEND;
    this.periods = PERIODS;
    this.format = (n) => number.format(n);
    this.state = useState({ domain: "", days: 7, stats: null, loading: false, error: "", chartWidth: 640 });
    const chartBody = useRef("chartBody");
    const resize = new ResizeObserver(([entry]) => {
      this.state.chartWidth = Math.max(320, Math.round(entry.contentRect.width));
    });
    onMounted(() => chartBody.el && resize.observe(chartBody.el));
    onWillUnmount(() => resize.disconnect());
    onWillStart(() => this.load());
    const timer = setInterval(() => this.load(), REFRESH_MS);
    onWillUnmount(() => clearInterval(timer));
  }

  get stats() {
    return this.state.stats;
  }

  get domains() {
    return this.stats?.domains || [];
  }

  get daysValue() {
    return String(this.state.days);
  }

  get chart() {
    return this.stats ? buildChart(this.stats.timeseries, this.state.chartWidth) : null;
  }

  get kpis() {
    const t = this.stats?.totals;
    return [
      { label: "Unique visitors", value: t && number.format(t.visitors) },
      { label: "Pageviews", value: t && number.format(t.pageviews) },
      { label: "Avg. time on page", value: t && duration(t.avgTimeSec) },
      { label: "Avg. scroll depth", value: t && `${Math.round(t.avgScrollDepth)}%` },
    ];
  }

  get lists() {
    const s = this.stats;
    const list = (title, description, column, countLabel, rows = []) => ({
      title, description, column, countLabel, rows, max: Math.max(1, ...rows.map((r) => r.count)),
    });
    return [
      list("Top pages", "Most viewed paths", "Page", "Views", s?.topPages),
      list("Top sources", "Where visitors came from", "Source", "Views", s?.topSources),
      list("Events", "Custom and auto-captured events", "Event", "Count", s?.topEvents),
    ];
  }

  select(key, value) {
    this.state[key] = key === "days" ? Number(value) : value;
    this.state.stats = null;
    this.load();
  }

  async load() {
    this.state.loading = true;
    try {
      const query = new URLSearchParams({ days: String(this.state.days) });
      if (this.state.domain) query.set("domain", this.state.domain);
      const response = await fetch(`${BACKEND}/api/stats?${query}`);
      if (!response.ok) throw new Error(`GET /api/stats answered ${response.status}`);
      const stats = await response.json();
      Object.assign(this.state, { stats, domain: stats.domain, error: "" });
    } catch (error) {
      this.state.error = `${error.message}. Is the backend running at ${BACKEND}?`;
    } finally {
      this.state.loading = false;
    }
  }
}

const templates = await fetch(import.meta.resolve("nodexui/templates")).then((r) => r.text());
await mount(Dashboard, document.getElementById("app"), { templates });
