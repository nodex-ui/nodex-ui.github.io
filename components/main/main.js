import { Component, onMounted, onWillUnmount, useState } from "nodexui";
import { DocsSidebar, DocsContent } from "@/components/docs/docs.js";
import { BlocksSidebar, BlocksContent } from "@/components/block-gallery/block-gallery.js";
import { IconsSidebar, IconsContent } from "@/components/icons/icons.js";
import { ChartSidebar, ChartContent } from "@/components/chart-gallery/chart-gallery.js";
import { OwlFrameworkSidebar, OwlFrameworkContent } from "@/components/owl-framework/owl-framework.js";
import { ThemeCreatorSidebar, ThemeCreatorContent } from "@/components/theme-creator/theme-creator.js";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher.js";
import { mountPage } from "@/components/page/page.js";
import { setPageMeta } from "@/seo.js";
import { trackEvent } from "@/tracking.js";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

const routes = [
  { id: "docs", label: t("Docs"), description: t("Install paths, usage guidance, and per-component sample code with live Nodex UI previews.") },
  { id: "blocks", label: t("Blocks"), description: t("Catalog of composed Nodex UI blocks and runnable examples.") },
  { id: "icons", label: t("Icons"), description: t("Lucide-backed icon usage through the Icon component.") },
  { id: "chart", label: t("Chart"), description: t("Interactive Nodex UI chart catalog.") },
  { id: "owl-framework", label: t("Concept"), description: t("Reference for everything exported by the underlying runtime.") },
  { id: "theme", label: t("Theme"), description: t("Pick colours and radius, preview Nodex UI live, and download nodexui-light.css / nodexui-dark.css.") },
];

function routeFromHash() {
  const id = window.location.hash.replace(/^#\/?/, "").split("/")[0] || "docs";
  return routes.some((route) => route.id === id) ? id : "docs";
}

// Puts the active tab's name in the browser tab title so history and bookmarks are readable.
function setRouteTitle(id) {
  const route = routes.find((entry) => entry.id === id);
  setPageMeta({ title: `${route.label} · Nodex UI`, description: route.description });
}

/** Every `main-nav` tab is rendered as one shared `Shell`: the active tab's item list fills `ShellSidebar`, and the selected item's content fills `ShellContent`. */
export class Root extends Component {
  static components = {
    DocsSidebar, DocsContent, BlocksSidebar, BlocksContent, IconsSidebar, IconsContent, ChartSidebar, ChartContent,
    OwlFrameworkSidebar, OwlFrameworkContent, ThemeCreatorSidebar, ThemeCreatorContent, LanguageSwitcher,
  };

  static template = "examples.MainApp";

  t = t;

  setup() {
    this.routes = routes;
    this.state = useState({ route: routeFromHash(), collapsed: false });
    this.onHashChange = () => {
      this.state.route = routeFromHash();
      setRouteTitle(this.state.route);
    };
    onMounted(() => {
      setRouteTitle(this.state.route);
      window.addEventListener("hashchange", this.onHashChange);
    });
    onWillUnmount(() => window.removeEventListener("hashchange", this.onHashChange));
  }

  selectRoute(route) {
    this.state.route = route;
    setRouteTitle(route);
  }

  /** Records a light/dark theme switch made with the header theme button. */
  onThemeChange(theme) {
    trackEvent("Theme: Change", { theme });
  }
}

await mountPage(Root, [
  "/components/main/main.xml",
  "/components/docs/docs.xml",
  "/components/block-gallery/block-gallery.xml",
  "/components/icons/icons.xml",
  "/components/chart-gallery/chart-gallery.xml",
  "/components/apidoc-demo/apidoc-demo.xml",
  "/components/qr-demo/qr-demo.xml",
  "/components/i18n-demo/i18n-demo.xml",
  "/components/analytics-dashboard/analytics-dashboard.xml",
  "/components/owl-framework/owl-framework.xml",
  "/components/theme-creator/theme-creator.xml",
], document.getElementById("b-example-app"));
