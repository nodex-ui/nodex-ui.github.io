import { Component, onMounted, onWillStart, onWillUnmount, reactive, useState } from "nodexui";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

// Icon list shipped with the nodexui version pinned in the page's import map.
const manifestUrl = new URL("icons/lucide.json", import.meta.resolve("nodexui")).href;

async function loadIconNames() {
  const response = await fetch(manifestUrl);
  if (!response.ok) throw new Error(t("Unable to load the Lucide icon manifest."));
  const manifest = await response.json();
  return manifest.icons || [];
}

/** Shared reactive state for the Icons tab, subscribed to by both `IconsSidebar` and `IconsContent`. */
export const iconsState = reactive({
  loading: true,
  error: "",
  query: "",
  names: [],
  name: "",
});

function iconNameFromHash() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts[0] === "icons"
  return parts[1] || "";
}

async function ensureIconsLoaded() {
  if (iconsState.names.length) return;
  iconsState.names = await loadIconNames();
}

async function loadIconsRoute() {
  try {
    await ensureIconsLoaded();
    iconsState.error = "";
    const requested = iconNameFromHash();
    iconsState.name = iconsState.names.includes(requested) ? requested : iconsState.names[0] || "";
  } catch (error) {
    iconsState.error = error.message || t("Unable to load icons.");
  } finally {
    iconsState.loading = false;
  }
}

/** Icons tab sidebar: search + full icon-name list, deep-linked via `#/icons/<name>`. Owns hash-listening and manifest loading. */
export class IconsSidebar extends Component {
  static template = "examples.IconsSidebar";

  t = t;

  setup() {
    this.state = useState(iconsState);
    this.onHashChange = () => loadIconsRoute();
    onWillStart(() => loadIconsRoute());
    onMounted(() => window.addEventListener("hashchange", this.onHashChange));
    onWillUnmount(() => window.removeEventListener("hashchange", this.onHashChange));
  }

  get filteredNames() {
    const query = this.state.query.trim().toLowerCase();
    const names = query ? this.state.names.filter((name) => name.includes(query)) : this.state.names;
    return names.slice(0, 240);
  }

  get total() {
    return this.state.names.length;
  }

  get shownCount() {
    return this.filteredNames.length;
  }

  onQueryInput(value) {
    this.state.query = value;
  }
}

/** Icons tab content: large preview plus static/Owl usage snippets for the selected icon. */
export class IconsContent extends Component {
  static template = "examples.IconsContent";

  t = t;

  setup() {
    this.state = useState(iconsState);
  }

  get componentName() {
    return `Icon${this.state.name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")}`;
  }

  get staticSnippet() {
    return `<span b-icon="${this.state.name}"></span>`;
  }

  get owlSnippet() {
    return `<Icon name="'${this.state.name}'"/>\n<${this.componentName}/>`;
  }
}
