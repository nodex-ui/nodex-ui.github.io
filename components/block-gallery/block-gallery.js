/* global thebase */

import { Component, onMounted, onPatched, onWillStart, onWillUnmount, reactive, useState } from "nodexui";
import { createThemeController } from "nodexui";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

const exampleTheme = createThemeController({
  storageKey: "b-example-theme",
  toggleSelector: "",
  labelSelector: "",
});

export const featureBlocks = [
  { name: "apidoc-01", label: "API Doc 01", height: 720 },
  { name: "chart-01", label: "Chart 01", height: 640 },
  { name: "dashboard-01", label: "Dashboard 01", height: 720 },
  { name: "data-table-01", label: "Data Table 01", height: 760 },
];
export const sidebarBlocks = Array.from({ length: 16 }, (_, index) => ({
  name: `sidebar-${String(index + 1).padStart(2, "0")}`,
  label: `Sidebar ${String(index + 1).padStart(2, "0")}`,
  height: 620,
}));
export const authBlocks = ["login-03", "login-04", "signup-03", "signup-04"].map((name) => ({
  name,
  label: name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
  height: 620,
}));

const tallDemoSlugs = new Set([
  "calendar", "chart", "code-editor", "command", "data-table", "navigation-menu", "questionnaire", "sidebar", "table", "text-editor",
]);
const demoSlugs = [
  "accordion", "alert", "alert-dialog", "aspect-ratio", "attachment", "avatar", "badge", "breadcrumb", "bubble",
  "button", "button-group", "calendar", "card", "carousel", "chart", "checkbox", "code-editor", "collapsible", "combobox",
  "command", "context-menu", "data-table", "date-picker", "dialog", "direction", "drawer", "dropdown-menu",
  "empty", "field", "hover-card", "input", "input-otp", "item", "kbd", "label", "marker",
  "menubar", "message", "message-scroller", "native-select", "navigation-menu", "pagination", "popover",
  "progress", "qr-card", "questionnaire", "radio-group", "resizable", "scroll-area", "select", "separator", "sheet",
  "sidebar", "skeleton", "slider", "spinner", "switch", "table", "tabs", "text-editor", "textarea", "toast",
  "toggle", "toggle-group", "tooltip", "typography",
];
export const componentDemoBlocks = demoSlugs.map((slug) => ({
  name: `${slug}-demo`,
  label: slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
  height: tallDemoSlugs.has(slug) ? 640 : 420,
}));

const allBlocks = [...featureBlocks, ...sidebarBlocks, ...authBlocks, ...componentDemoBlocks];

/** Shared reactive state for the Blocks tab, subscribed to by both `BlocksSidebar` and `BlocksContent`. */
export const blocksState = reactive({ name: featureBlocks[0].name });

function blockNameFromHash() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts[0] === "blocks"
  const name = parts[1];
  return allBlocks.some((block) => block.name === name) ? name : featureBlocks[0].name;
}

function loadBlocksRoute() {
  blocksState.name = blockNameFromHash();
}

/** Blocks tab sidebar: grouped list of every block, deep-linked via `#/blocks/<name>`. Owns hash-listening for the Blocks tab. */
export class BlocksSidebar extends Component {
  static template = "examples.BlocksSidebar";

  t = t;

  setup() {
    this.featureBlocks = featureBlocks;
    this.sidebarBlocks = sidebarBlocks;
    this.authBlocks = authBlocks;
    this.componentDemoBlocks = componentDemoBlocks;
    this.state = useState(blocksState);
    this.onHashChange = () => loadBlocksRoute();
    onWillStart(() => loadBlocksRoute());
    onMounted(() => window.addEventListener("hashchange", this.onHashChange));
    onWillUnmount(() => window.removeEventListener("hashchange", this.onHashChange));
  }
}

/** Blocks tab content: full-size preview iframe for the selected block. */
export class BlocksContent extends Component {
  static template = "examples.BlocksContent";

  t = t;

  setup() {
    this.state = useState(blocksState);
    onMounted(() => this.mountStaticNodexUI());
    onPatched(() => this.mountStaticNodexUI());
  }

  get block() {
    return allBlocks.find((entry) => entry.name === this.state.name) || featureBlocks[0];
  }

  mountStaticNodexUI() {
    thebase?.mountAll(document);
    exampleTheme.set(exampleTheme.current(), { skipStorage: true });
  }
}
