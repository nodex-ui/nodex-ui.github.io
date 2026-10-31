import {
  Chart, Component, Icon, Select, SelectContent, SelectItem, SelectTrigger, onMounted, onWillStart, onWillUnmount, reactive, useRef, useState,
} from "nodexui";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

export const categories = [
  { id: "bar", label: t("Bar Charts") },
  { id: "line", label: t("Line Charts") },
  { id: "area", label: t("Area Charts") },
  { id: "pie", label: t("Pie Charts") },
  { id: "radar", label: t("Radar Charts") },
  { id: "radial", label: t("Radial Charts") },
  { id: "chartjs", label: t("Chart.js Charts") },
];

const CHART_JS = "https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const desktop = [186, 305, 237, 73, 209, 214];
const mobile = [80, 200, 120, 190, 130, 140];
const browsers = { Chrome: 275, Safari: 200, Firefox: 187, Edge: 173, Other: 90 };
let chartJsLoading = null;

// Downloads Chart.js once, the first time the Chart.js category is opened, so no other page pays for it.
function loadChartJs() {
  chartJsLoading ||= new Promise((resolve, reject) => {
    document.head.append(Object.assign(document.createElement("script"), { src: CHART_JS, onload: resolve, onerror: reject }));
  });
  return chartJsLoading;
}

// Reads the theme's chart, grid and label colours, because a canvas cannot resolve CSS variables by itself.
function themeColors() {
  const style = getComputedStyle(document.documentElement);
  const read = (name) => style.getPropertyValue(name).trim();
  return { series: [1, 2, 3, 4, 5].map((n) => read(`--b-chart-${n}`)), grid: read("--b-border"), text: read("--b-muted-foreground") };
}

// Builds the round-chart scale (radar, polar area) so its rings and labels match the theme instead of Chart.js grey.
function radialScale(colors) {
  return { r: { grid: { color: colors.grid }, angleLines: { color: colors.grid }, pointLabels: { color: colors.text }, ticks: { display: false } } };
}

// Lists the Chart.js samples: each is a card title, a description and the JSON config Nodex UI passes to Chart.js.
function chartJsSamples() {
  const colors = themeColors();
  const labels = months.map((month) => t(month));
  const visitors = [{ label: t("Desktop"), data: desktop }, { label: t("Mobile"), data: mobile }];
  const browserData = { labels: Object.keys(browsers).map((name) => t(name)), datasets: [{ data: Object.values(browsers), backgroundColor: colors.series, borderWidth: 0 }] };
  const sessions = (seed) => desktop.map((value, index) => ({ x: (value + seed * index) % 60, y: Math.round(value / 30) + seed, r: 4 + (index % 4) * 3 }));
  const samples = [
    { id: "bar", title: "Chart.js - Bar", description: "Showing total visitors for the last 6 months", config: { type: "bar", data: { labels, datasets: visitors } } },
    { id: "line", title: "Chart.js - Line", description: "Showing total visitors for the last 6 months", config: { type: "line", data: { labels, datasets: visitors.map((set) => ({ ...set, tension: 0.4 })) } } },
    { id: "mixed", title: "Chart.js - Mixed", description: "Desktop visitors with a trend line", config: { type: "bar", data: { labels, datasets: [{ type: "line", label: t("Trend"), data: [170, 230, 250, 190, 200, 225], tension: 0.4, borderColor: colors.series[1], backgroundColor: colors.series[1] }, { ...visitors[0], backgroundColor: colors.series[0] }] } } },
    { id: "doughnut", title: "Chart.js - Doughnut", description: "Visitors by browser, January - June 2024", config: { type: "doughnut", data: browserData, options: { scales: {}, cutout: "60%" } } },
    { id: "polar", title: "Chart.js - Polar Area", description: "Visitors by browser, January - June 2024", config: { type: "polarArea", data: browserData, options: { scales: radialScale(colors) } } },
    { id: "radar", title: "Chart.js - Radar", description: "Showing total visitors for the last 6 months", config: { type: "radar", data: { labels, datasets: visitors.map((set) => ({ ...set, backgroundColor: "transparent" })) }, options: { scales: radialScale(colors) } } },
    { id: "scatter", title: "Chart.js - Scatter", description: "Session length and pages viewed", config: { type: "scatter", data: { datasets: [{ label: t("Desktop"), data: sessions(2) }, { label: t("Mobile"), data: sessions(0) }] } } },
    { id: "bubble", title: "Chart.js - Bubble", description: "Session length, pages viewed and visitor count", config: { type: "bubble", data: { datasets: [{ label: t("Desktop"), data: sessions(2) }, { label: t("Mobile"), data: sessions(0) }] } } },
  ];
  return samples.map(({ config, ...sample }) => ({ ...sample, title: t(sample.title), description: t(sample.description), json: JSON.stringify(config) }));
}

const ranges = [
  { value: "90d", label: "Last 3 months" },
  { value: "30d", label: "Last 30 days" },
  { value: "7d", label: "Last 7 days" },
];

/** Shared reactive state for the Chart tab, subscribed to by both `ChartSidebar` and `ChartContent`. */
export const chartState = reactive({ activeCategory: categories[0].id, range: ranges[0].value });

function chartCategoryFromHash() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts[0] === "chart"
  const id = parts[1];
  return categories.some((category) => category.id === id) ? id : categories[0].id;
}

function loadChartRoute() {
  chartState.activeCategory = chartCategoryFromHash();
}

/** Chart tab sidebar: list of chart categories, deep-linked via `#/chart/<id>`. Owns hash-listening for the Chart tab. */
export class ChartSidebar extends Component {
  static template = "examples.ChartSidebar";

  setup() {
    this.categories = categories;
    this.state = useState(chartState);
    this.onHashChange = () => loadChartRoute();
    onWillStart(() => loadChartRoute());
    onMounted(() => window.addEventListener("hashchange", this.onHashChange));
    onWillUnmount(() => window.removeEventListener("hashchange", this.onHashChange));
  }
}

/** Chart.js category: waits for Chart.js to load, then renders one canvas card per sample. The Nodex UI runtime
 * notices each new `b-ui="chart"` canvas and starts Chart.js on it with the theme colours. */
export class ChartJsGallery extends Component {
  static components = { Chart };
  static template = "examples.ChartJsGallery";

  t = t;

  setup() {
    this.root = useRef("root");
    onWillStart(() => loadChartJs().then(() => { this.samples = chartJsSamples(); }));
    onWillUnmount(() => this.destroyCharts());
  }

  // Frees every Chart.js instance when the category is left; Chart.js keeps its own list of live charts otherwise.
  destroyCharts() {
    for (const canvas of this.root.el.querySelectorAll("canvas")) globalThis.Chart.getChart(canvas)?.destroy();
  }
}

/** Chart tab content: one gallery per chart family (bar, line, area, pie, radar, radial) built from the pure `Chart`
 * component with native Nodex UI markup, plus Chart.js canvas samples; the first area chart has a date-range picker. */
export class ChartContent extends Component {
  static template = "examples.ChartContent";
  static components = { Chart, ChartJsGallery, Icon, Select, SelectContent, SelectItem, SelectTrigger };

  t = t;
  ranges = ranges;

  setup() {
    this.state = useState(chartState);
  }

  get rangeLabel() {
    return ranges.find((range) => range.value === this.state.range).label;
  }
}
