/* global thebase */

import { Component, onMounted, onPatched, onWillStart, onWillUnmount, reactive, useEffect, useState } from "nodexui";
import { createThemeController } from "nodexui";
import { loadCatalog, t } from "../../i18n.js";
import { allBlocks, authBlocks, componentDemoBlocks, featureBlocks, sidebarBlocks } from "../blocks/blocks.js";

await loadCatalog(import.meta.url);

const exampleTheme = createThemeController({
  storageKey: "b-example-theme",
  toggleSelector: "",
  labelSelector: "",
});

/** Runnable examples listed in the Blocks tab, and the module that holds each one's component. They render inline
 * (not in the block viewer frame) and their modules load only when opened, because some start work on import
 * (Bootstrap's JS for ApiDoc). */
export const exampleBlocks = [
  {
    name: "apidoc",
    label: t("API documentation"),
    description: t("The ApiDoc component rendering the Swagger Petstore OpenAPI 3.0 spec as browsable API docs."),
    module: "/components/apidoc-demo/apidoc-demo.js",
    component: "ApiDocDemo",
  },
  {
    name: "qr",
    label: t("QR code"),
    description: t("A QR code and a VietQR payment code drawn in the browser by the QR service (nodexui/qr)."),
    module: "/components/qr-demo/qr-demo.js",
    component: "QrDemo",
  },
  {
    name: "i18n",
    label: t("Translation"),
    description: t("Switch languages with the i18n service (nodexui/i18n), which reads gettext .po catalogs."),
    module: "/components/i18n-demo/i18n-demo.js",
    component: "I18nDemo",
  },
  {
    name: "analytics",
    label: t("Analytics dashboard"),
    description: t("Traffic stats for nodexui/analytics, shown with generated demo data, no server needed."),
    module: "/components/analytics-dashboard/analytics-dashboard.js",
    component: "AnalyticsDashboard",
  },
];

const galleryEntries = [...allBlocks, ...exampleBlocks];

/** Shared reactive state for the Blocks tab, subscribed to by both `BlocksSidebar` and `BlocksContent`. */
export const blocksState = reactive({ name: featureBlocks[0].name });

function blockNameFromHash() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts[0] === "blocks"
  const name = parts[1];
  return galleryEntries.some((block) => block.name === name) ? name : featureBlocks[0].name;
}

function loadBlocksRoute() {
  blocksState.name = blockNameFromHash();
}

/** Blocks tab sidebar groups, in display order. Each one collapses; only the group holding the open block starts expanded. */
const sidebarGroups = [
  { label: t("Feature blocks"), blocks: featureBlocks },
  { label: t("Examples"), blocks: exampleBlocks },
  { label: t("Sidebar blocks"), blocks: sidebarBlocks },
  { label: t("Auth blocks"), blocks: authBlocks },
  { label: t("Component demos"), blocks: componentDemoBlocks },
];

/** Blocks tab sidebar: collapsible groups of every block and example, deep-linked via `#/blocks/<name>`. Owns hash-listening for the Blocks tab. */
export class BlocksSidebar extends Component {
  static template = "examples.BlocksSidebar";

  setup() {
    this.groups = sidebarGroups;
    this.state = useState(blocksState);
    this.onHashChange = () => loadBlocksRoute();
    onWillStart(() => loadBlocksRoute());
    onMounted(() => window.addEventListener("hashchange", this.onHashChange));
    onWillUnmount(() => window.removeEventListener("hashchange", this.onHashChange));
  }
}

/** Blocks tab content: a full-size preview iframe for the selected block, or the selected example's live component. */
export class BlocksContent extends Component {
  static template = "examples.BlocksContent";

  t = t;

  setup() {
    this.state = useState(blocksState);
    this.view = useState({ component: null });
    useEffect((name) => {
      this.loadExample(name);
    }, () => [this.state.name]);
    onMounted(() => this.mountStaticNodexUI());
    onPatched(() => this.mountStaticNodexUI());
  }

  get example() {
    return exampleBlocks.find((entry) => entry.name === this.state.name);
  }

  get block() {
    return allBlocks.find((entry) => entry.name === this.state.name) || featureBlocks[0];
  }

  /** Imports an example's module and shows its component, unless the reader has moved on to another entry. */
  async loadExample(name) {
    this.view.component = null;
    const example = exampleBlocks.find((entry) => entry.name === name);
    if (!example) return;
    const module = await import(example.module);
    if (this.state.name === name) this.view.component = module[example.component];
  }

  mountStaticNodexUI() {
    thebase?.mountAll(document);
    exampleTheme.set(exampleTheme.current(), { skipStorage: true });
  }
}
