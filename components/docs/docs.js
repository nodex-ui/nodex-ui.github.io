/* global thebase */

import { Component, onMounted, onPatched, onWillStart, onWillUnmount, reactive, useState } from "nodexui";
import { createThemeController } from "nodexui";
import { setPageMeta } from "@/seo.js";
import { trackEvent } from "@/tracking.js";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

const exampleTheme = createThemeController({
  storageKey: "b-example-theme",
  toggleSelector: "",
  labelSelector: "",
});

const registryUrl = "/dist/nodexui.registry.json";
export const guidePages = [
  {
    slug: "usage-guide",
    title: t("Usage Guide"),
    description: t("The single entry point for integrating Nodex UI into a consumer project."),
  },
  {
    slug: "installation",
    title: t("Installation"),
    description: t("Install mechanics: CSS and JS files, load order, and CDN paths."),
  },
  {
    slug: "theming",
    title: t("Theming"),
    description: t("Set the theme on `html` or a subtree and override semantic tokens."),
  },
  {
    slug: "runtime-api",
    title: t("Runtime API"),
    description: t("The `window.thebase` global: mount, mountAll, destroy, and events."),
  },
  {
    slug: "analytics",
    title: t("Analytics"),
    description: t("Optional standalone, cookieless pageview and event tracking (`nodexui/analytics`)."),
  },
  {
    slug: "i18n",
    title: t("i18n"),
    description: t("Optional standalone gettext (.po) translations and language switching (`nodexui/i18n`)."),
  },
  {
    slug: "base-ui-skill",
    title: t("Skill for AI"),
    description: t("Install the Nodex UI agent skill so Claude Code builds apps and components with Nodex UI."),
  },
  {
    slug: "registry",
    title: t("Registry"),
    description: t("How `dist/nodexui.registry.json` describes every shipped component."),
  },
  {
    slug: "owl-components",
    title: t("Nodex UI Component"),
    description: t("Import real component classes instead of the static `b-ui` markers."),
  },
  {
    slug: "component-authoring",
    title: t("Component Authoring"),
    description: t("How components implement both the static and pure Nodex UI public APIs."),
  },
  {
    slug: "blocks",
    title: t("Blocks"),
    description: t("Static HTML block compositions styled by the shadcn-aligned tokens."),
  },
  {
    slug: "icons",
    title: t("Built-in Icons"),
    description: t("Use the bundled Lucide icon library from plain HTML or JavaScript."),
  },
];

/** Shared reactive state for the Docs tab, subscribed to by both `DocsSidebar` and `DocsContent`. */
export const docsState = reactive({
  loading: true,
  error: "",
  kind: "guide",
  slug: "usage-guide",
  query: "",
  title: "",
  description: "",
  components: [],
  componentType: "",
  attributeCount: 0,
  eventCount: 0,
});

async function loadRegistry() {
  const response = await fetch(registryUrl);
  if (!response.ok) throw new Error(t("Unable to load Nodex UI registry."));
  return response.json();
}

export function titleize(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function componentDescription(component) {
  const type = component.type === "owl" ? "Enhanced with runtime behavior" : "Static HTML primitive";
  const events = component.events?.length ? `${component.events.length} event${component.events.length === 1 ? "" : "s"}` : "No custom events";
  return `${type}. ${events}.`;
}

/** Parses the hash into a docs sub-route: guide/<slug> (default) or components/<slug>. Bare `#/docs` defaults to the first guide. */
function docsRouteFromHash() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts[0] === "docs"
  if (parts[1] === "components" && parts[2]) {
    return { kind: "component", slug: parts[2] };
  }
  if (parts[1] === "guide" && parts[2]) {
    return { kind: "guide", slug: parts.slice(2).join("/") };
  }
  return { kind: "guide", slug: guidePages[0].slug };
}

async function ensureComponentsLoaded() {
  if (docsState.components.length) return;
  const registry = await loadRegistry();
  docsState.components = [...registry.components].sort((a, b) => a.name.localeCompare(b.name));
}

function loadGuide(slug) {
  const guide = guidePages.find((entry) => entry.slug === slug) || guidePages[0];
  setPageMeta({ title: t("{title} - Nodex UI Docs", { title: guide.title }), description: guide.description });
  docsState.kind = "guide";
  docsState.slug = guide.slug;
  docsState.title = guide.title;
  docsState.description = guide.description;
}

let lastViewedComponent = "";

function loadComponent(slug) {
  const component = docsState.components.find((entry) => entry.name === slug);
  setPageMeta({
    title: t("{title} - Nodex UI Docs", { title: titleize(slug) }),
    description: component ? componentDescription(component) : "",
  });
  // Skip the repeat emission when the same page re-renders (e.g. a language change reloads the route).
  if (lastViewedComponent !== slug) trackEvent("Component: View", { component: slug });
  lastViewedComponent = slug;
  docsState.kind = "component";
  docsState.slug = slug;
  docsState.title = titleize(slug);
  docsState.description = "";
  docsState.componentType = component?.type || "";
  docsState.attributeCount = component?.attributes?.length || 0;
  docsState.eventCount = component?.events?.length || 0;
}

async function loadDocsRoute() {
  const route = docsRouteFromHash();
  try {
    await ensureComponentsLoaded();
    if (route.kind === "component") {
      loadComponent(route.slug);
    } else {
      loadGuide(route.slug);
    }
  } catch (error) {
    docsState.error = error.message || t("Unable to render docs.");
  } finally {
    docsState.loading = false;
  }
}

/** Docs tab sidebar: search + Guides/Components lists. Owns hash-listening and registry loading for the whole Docs tab. */
export class DocsSidebar extends Component {
  static template = "examples.DocsSidebar";

  t = t;

  setup() {
    this.guidePages = guidePages;
    this.state = useState(docsState);
    this.onHashChange = () => loadDocsRoute();
    onWillStart(() => loadDocsRoute());
    onMounted(() => window.addEventListener("hashchange", this.onHashChange));
    onWillUnmount(() => {
      window.removeEventListener("hashchange", this.onHashChange);
      clearTimeout(this.searchTimer);
    });
  }

  get visibleComponents() {
    const query = this.state.query.trim().toLowerCase();
    if (!query) return this.state.components;
    return this.state.components.filter((component) => titleize(component.name).toLowerCase().includes(query));
  }

  titleize(value) {
    return titleize(value);
  }

  onQueryInput(value) {
    this.state.query = value;
    this.scheduleSearchEvent();
  }

  /** Reports a finished search (after typing pauses) and whether it matched anything, so empty searches show gaps in the docs. */
  scheduleSearchEvent() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      const query = this.state.query.trim().toLowerCase();
      if (query.length < 2) return;
      const results = this.visibleComponents.length;
      trackEvent(results ? "Docs: Search" : "Docs: Search Empty", { query: query.slice(0, 50), results });
    }, 1000);
  }
}

/** Docs tab content: renders the selected guide or component doc via `Markdown`. */
export class DocsContent extends Component {
  static template = "examples.DocsContent";

  t = t;

  setup() {
    this.state = useState(docsState);
    onMounted(() => this.mountStaticNodexUI());
    onPatched(() => this.mountStaticNodexUI());
  }

  get docSrc() {
    if (this.state.kind === "component") return `/docs/components/${this.state.slug}.md`;
    return `/docs/${this.state.slug}.md`;
  }

  mountStaticNodexUI() {
    thebase?.mountAll(document);
    exampleTheme.set(exampleTheme.current(), { skipStorage: true });
  }
}
