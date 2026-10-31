# Installation

See the [Usage Guide](usage-guide.md) for the end-to-end integration path (choosing an API, install, theming, verification). This page covers install mechanics only.

Nodex UI is distributed as one CSS file and one JavaScript file for browser use. `dist/nodexui.min.js` is fully self-contained: the JS bundle (Popper.js included) and the Nodex runtime are embedded ahead of Nodex UI's own code, in load order (JS bundle, then runtime, then Nodex UI) — nothing else needs to load first. Both install paths below load this same file; the Nodex UI component API is the recommended way to consume Nodex UI in an application, with the base static markup (`b-ui`) API available as a lighter-weight alternative for non-component pages.

The snippets below use the `@latest` tag for readability. Pin an exact version instead (e.g. `@1.3.1`, or `@1` to take only non-breaking updates) for any production page — `@latest` can silently change what your page loads the moment a new version is published.

## Nodex UI component install (recommended)

If you're building your own application and want to import Nodex UI components as real Nodex component classes (`<Button/>`, `<Card/>`, `<Tabs/>`, ...) instead of `b-ui` markup, it's the same one file as the static install, just accessed through an import map:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.css">
<script type="importmap">
{
  "imports": {
    "nodexui": "https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.esm.js",
    "nodexui/templates": "https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.templates.xml"
  }
}
</script>
```

`https://unpkg.com/nodexui@latest/dist/...` mirrors the same files if jsDelivr is unreachable — swap the host in each URL above.

`nodexui` resolves to the `dist/nodexui.esm.js` module — the browser fetches and evaluates it once, so `Component`/`mount`/`xml` from `nodexui` and `Button`/`Card`/... from `nodexui` are guaranteed to be the same runtime identity (no separate script needs to load first to set up a shared global). Your own app code should still import Nodex from `nodexui`, never install or import `@odoo/owl` directly — that's what keeps a `class Root extends Component` you write instanceof-compatible with Nodex UI's own components. `nodexui/templates` maps to the templates XML — not a JS module, so resolve it with `import.meta.resolve("nodexui/templates")` and `fetch()` the result rather than `import`ing it.

For npm/bundler usage, everything (Nodex runtime, component classes, theme helper) is exported from the one `nodexui` package entry: `import { Component, mount, xml, Button, Card, createThemeController } from "nodexui";` — plus `nodexui/dist/nodexui.templates.xml` (component templates — fetch or load them before mounting). Note that importing the main entry always runs its `autoMount()` side effect (it scans the DOM for `[b-ui]`/`[b-icon]` markers on `DOMContentLoaded`) — harmless if your page has none, but worth knowing if you specifically wanted a side-effect-free import.

See [Nodex UI Component](owl-components.md) for the full loading contract, a worked example, and common mistakes.

## Static `b-ui` install (alternative)

For static HTML, a server-rendered page, or a Base HUB website page that has no Nodex runtime of its own, load the same bundle as plain CSS + a classic `<script>` tag instead of an import map:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.css">
<script src="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.js" defer></script>
```

base is the bundled baseline CSS framework, and its JS bundle now drives Nodex UI's interactive components directly.

`nodexui` is published on npm, so [unpkg](https://unpkg.com/nodexui@latest/) mirrors the same files as an alternative CDN (`https://unpkg.com/nodexui@latest/dist/nodexui.min.css` / `nodexui.min.js`) if jsDelivr is unreachable in your environment. Pin an exact version (e.g. `@1.3.1`, or `@1` to take only non-breaking updates) instead of `@latest` for production.

For npm/self-hosted usage:

```sh
npm install nodexui
```

Then copy or serve `node_modules/nodexui/dist/nodexui.min.css` and `node_modules/nodexui/dist/nodexui.min.js`.

`dist/bootstrap.bundle.min.js` also ships standalone, unmodified, with its own integrity hash in `dist/nodexui.registry.json`, in case a project wants vendored built-in JS on its own — Nodex UI itself never needs it loaded separately.

The static bundle auto-mounts existing `[b-ui]` and `[b-icon]` markers on `DOMContentLoaded`. Use `thebase.mountAll(root)` after later DOM injection, and `thebase.destroy(root)` before removing a mounted subtree that owns listeners or an runtime-backed controller.

The package also ships the complete Lucide SVG icon set under `dist/icons/lucide/` and a generated `dist/icons/lucide.json` manifest. The built-in icon component can use the pinned jsDelivr Lucide CDN by default or your own self-hosted path:

```html
<span b-icon="search"></span>
<span b-icon="panel-left" b-icon-base-url="/dist/icons/lucide"></span>
```

Production pages should use pinned version URLs. `latest` is for demos and experiments.

## Package exports and browser aliases

| Need | npm/bundler export | Browser import-map key | Dist file |
| --- | --- | --- | --- |
| Static `b-ui` runtime, Nodex runtime, every Nodex UI component class, theme helper | `nodexui` | `nodexui` (one key pointing at the same file) | `dist/nodexui.esm.js`, `dist/nodexui.min.js` |
| Styles | `nodexui/nodexui.css` | none; load with `<link>` | `dist/nodexui.min.css` |
| built-in JS | embedded; standalone file is a vendoring convenience only, not part of Nodex UI's own load path | none | `dist/bootstrap.bundle.min.js` |
| Named-icon components (`IconEye`, ...) | `nodexui/icons` | `nodexui/icons` | `dist/nodexui.icons.esm.js` |
| Nodex templates XML | `nodexui/dist/nodexui.templates.xml` | `nodexui/templates` | `dist/nodexui.templates.xml` |
| Registry metadata | `nodexui/registry` | none; fetch the JSON file | `dist/nodexui.registry.json` |
| Optional analytics service (`init`, `track`) | `nodexui/analytics` | none; import the file URL or load the `<script>` build (sets `window.thebase.analytics`) | `dist/nodexui.analytics.esm.js`, `dist/nodexui.analytics.min.js` |
| Optional i18n service (`init`, `t`, `loadCatalog`) | `nodexui/i18n` | `nodexui/i18n` (as in `emvhub/index.html`); or load the `<script>` build (sets `window.thebase.i18n`) | `dist/nodexui.i18n.esm.js`, `dist/nodexui.i18n.min.js` |
| Optional QR / VietQR service (`qrSvg`, `buildVietQr`) | `nodexui/qr` | `nodexui/qr`; or load the `<script>` build (sets `window.thebase.qr`) | `dist/nodexui.qr.esm.js`, `dist/nodexui.qr.min.js` |
| Standalone ApiDoc (`mountApiDoc`) | `nodexui/apidoc` | none; embeds Nodex + its templates, still needs `nodexui.min.css`; set `assetBase` for the language logos | `dist/nodexui.apidoc.esm.js`, `dist/nodexui.apidoc.min.js` |

`nodexui/templates` points to XML, not JavaScript. Resolve and fetch it (`fetch(import.meta.resolve("nodexui/templates"))`) before mounting an application that uses Nodex UI component classes.

## Release Guardrails

Nodex UI intentionally keeps its built-in styles and scripts bundled for the browser build, both CSS and JS. The JS bundle and the Nodex runtime are embedded directly into `dist/nodexui.min.js`/`nodexui.esm.js` — in that load order — along with every Nodex UI component class and the theme helper, so both the static API and the pure Nodex UI API install with one stylesheet and one script/import: there is no more separate `nodexui.owl.*`/`nodexui.components.esm.js`/`nodexui.theme.esm.js` file to keep in load order. the bundled JS instances (`bootstrap.Modal`, `Dropdown`, `Collapse`, `Tab`, `Toast`, `Carousel`, `Tooltip`, `Popover`, `Alert`) drive the components that map to them, wrapped by Nodex UI's own `.behavior.js`/`runtime/*.js` helpers so both the static and pure Nodex UI APIs share identical ARIA/keyboard/event behavior.

Release checks enforce runtime dependency, peer dependency, scoped CSS selector, and CDN file-size budgets through `npm run lint` and `npm run build`.
