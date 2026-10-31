import { Component, loadFile, markup, mount } from "nodexui";
import {
  Badge, Button, Card, CardBody, CardHeader, ClipboardButton, Icon, TabContent, TabTrigger, Tabs, TabsList, ThemeButton,
} from "nodexui";
import { LanguageSwitcher } from "@/components/language-switcher/language-switcher.js";
import { setPageMeta } from "@/seo.js";
import { trackEvent } from "@/tracking.js";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

// Latest version published to npm; bump this one value on release (drives the hero badge and CDN snippets).
const version = "1.3.1";
const cdn = `https://cdn.jsdelivr.net/npm/nodexui@${version}`;

const features = [
  { icon: "zap", title: t("No build step"), text: t("One stylesheet and one script from jsDelivr or unpkg. Nothing to compile.") },
  { icon: "layers", title: t("Two APIs, one source"), text: t("Pure Nodex UI <Button/> classes and base static markup (`b-ui`) share the same components.") },
  { icon: "puzzle", title: t("Modular"), text: t("Each component is self-contained. Use one or all 73, plus a full Lucide icon set.") },
  { icon: "moon", title: t("Themeable"), text: t("--b-* design tokens with light and dark themes built in.") },
];

const sections = [
  { route: "docs", icon: "book-open", title: t("Docs"), text: t("Install paths, usage guides, and live previews for every component.") },
  { route: "blocks", icon: "layout-dashboard", title: t("Blocks"), text: t("Dashboards, sidebars, data tables, and auth screens ready to copy.") },
  { route: "icons", icon: "shapes", title: t("Icons"), text: t("The full Lucide set through b-icon and the Icon component.") },
  { route: "chart", icon: "chart-column", title: t("Charts"), text: t("Bar and area charts built from native Nodex UI markup.") },
];

const analyticsFeatures = [
  { icon: "cookie", text: t("Cookieless: no visitor ID leaves the browser, and nothing is sent until init().") },
  { icon: "feather", text: t("Standalone ~5.6 KB bundle with no framework or component runtime.") },
  { icon: "route", text: t("Automatic pageviews, including pushState and hash-routed SPAs.") },
  { icon: "timer", text: t("Engagement: time on page and max scroll depth.") },
  { icon: "mouse-pointer-click", text: t("Outbound links, file downloads, form submits, and custom events with props and revenue.") },
  { icon: "server", text: t("One POST route on your backend. Go Fiber and FastAPI samples ship with a ready-made dashboard.") },
];

const apidocFeatures = [
  { icon: "file-json", text: t("Renders an OpenAPI 3.x JSON file as browsable docs: grouped sidebar, parameters, request bodies, responses, callbacks.") },
  { icon: "send", text: t("Try It panel with request code samples in 17 languages and a Send API Request button.") },
  { icon: "key-round", text: t("Authorize dialog for API key, basic, bearer, OpenID Connect, and OAuth2 flows.") },
  { icon: "workflow", text: t("Markdown descriptions with Mermaid diagrams, light and dark themes, and linkable pages.") },
  { icon: "package", text: t("Standalone bundle: the runtime and its templates are embedded, so it needs no other Nodex UI script.") },
];

const snippets = {
  static: `<link rel="stylesheet" href="${cdn}/dist/nodexui.min.css">
<script src="${cdn}/dist/nodexui.min.js" defer></script>

<button b-ui="button" b-att-variant="outline">Hello Nodex UI</button>`,
  owl: `import { Component, mount, xml } from "nodexui";
import { Button } from "nodexui";

const templates = await fetch(import.meta.resolve("nodexui/templates")).then((r) => r.text());

class Root extends Component {
  static components = { Button };
  static template = xml\`<Button label="'Save'" onClick="() => console.log('saved')"/>\`;
}

await mount(Root, document.getElementById("app"), { templates });`,
  apidoc: `<link rel="stylesheet" href="${cdn}/dist/nodexui.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script src="${cdn}/dist/nodexui.apidoc.min.js"></script>

<div id="docs"></div>
<script>
  thebase.apidoc.mountApiDoc("#docs", { src: "/openapi.json", hash: true, themeToggle: true });
</script>`,
  analytics: `<script type="module">
  import { init, track } from "${cdn}/dist/nodexui.analytics.esm.js";

  init({ backendUrl: "https://stats.example.com" }); // POSTs to /api/event
  track("Signup", { props: { plan: "pro" } });
</script>`,
};

// The three paragraphs that contain inline <code>, translated as whole sentences and marked safe because the text is ours.
function richText() {
  return {
    hero: markup(t("Nodex UI is a CDN-installable kit of 73 Nodex UI components with built-in theming. Use them as pure Nodex UI components in your app, or as plain <code>b-ui</code> HTML markup on any page.")),
    apidoc: markup(t("<code>nodexui/apidoc</code> turns any OpenAPI 3.x JSON document into interactive API docs. Use it as the <code>ApiDoc</code> Nodex UI component, as <code>b-ui=\"apidoc\"</code> markup, or as its own bundle.")),
    analytics: markup(t("<code>nodexui/analytics</code> is a cookieless pageview and event tracker you can load on any page, with or without the rest of Nodex UI. Point it at your own backend and keep the data.")),
  };
}

/** Nodex UI marketing landing page: pitches the library and links into each section of the examples app. */
export class Landing extends Component {
  static components = { LanguageSwitcher, Badge, Button, Card, CardBody, CardHeader, ClipboardButton, Icon, TabContent, TabTrigger, Tabs, TabsList, ThemeButton };
  static template = "examples.Landing";

  t = t;

  setup() {
    setPageMeta({
      title: t("Nodex UI — Ready-to-use UI components, straight from a CDN"),
      description: t("Nodex UI (nodexui) is a free, no-build JavaScript UI component library, usable as Nodex UI components or plain b-ui HTML markup, loaded from a CDN."),
    });
    this.cdn = cdn;
    this.version = version;
    this.features = features;
    this.sections = sections;
    this.apidocFeatures = apidocFeatures;
    this.analyticsFeatures = analyticsFeatures;
    this.snippets = snippets;
    this.richText = richText();
  }

  /** Records a light/dark theme switch made with the header theme button. */
  onThemeChange(theme) {
    trackEvent("Theme: Change", { theme });
  }

  /** Records which install snippet (static HTML or pure Nodex UI) the visitor opened. */
  selectTab(tab) {
    trackEvent("Tab: Select", { tab });
  }
}

/** Strips the outer <templates> wrapper so several XML files can be merged into one bundle. */
function templateBody(xml) {
  return xml.match(/<templates[^>]*>([\s\S]*)<\/templates>/)?.[1] || xml;
}

const [baseTemplates, landingTemplates] = await Promise.all([
  loadFile(import.meta.resolve("nodexui/templates")),
  loadFile("/components/landing/landing.xml"),
]);
await mount(Landing, document.getElementById("b-example-app"), {
  templates: `<templates>${templateBody(baseTemplates)}${templateBody(landingTemplates)}</templates>`,
});
