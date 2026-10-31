/* global NodexUI */

import { Component, onMounted, onPatched, onWillStart, onWillUnmount, reactive, useState } from "nodexui";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

export const categories = [
  { id: "bar", label: t("Bar Charts") },
  { id: "area", label: t("Area Charts") },
];

/** Shared reactive state for the Chart tab, subscribed to by both `ChartSidebar` and `ChartContent`. */
export const chartState = reactive({ activeCategory: categories[0].id });

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

/** Chart tab content: static native `b-ui="chart"` bar and area chart demos, filtered by the active sidebar category. */
export class ChartContent extends Component {
  static template = "examples.ChartContent";

  t = t;

  setup() {
    this.state = useState(chartState);
    // Re-mount static the Nodex UI behavior (e.g. the interactive area chart's Select) whenever the
    // active category swaps in new markup.
    onMounted(() => this.mountStaticNodexUI());
    onPatched(() => this.mountStaticNodexUI());
  }

  mountStaticNodexUI() {
    NodexUI?.mountAll(document);
  }
}
