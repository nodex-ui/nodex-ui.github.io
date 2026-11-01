# Usage Guide — Integrating Nodex UI Into a Project

This is the single entry point for adding Nodex UI to a consumer project (a static page, a Base HUB website page, a server-rendered app, or your own application). It sequences the existing reference docs into one path and gives copy-paste-ready examples — read the linked page for exhaustive detail on any step.

Audience: engineers and AI coding agents integrating `nodexui` into a project that is **not** this repository.

## Quick start (copy-paste, works as-is)

Save this as an `.html` file and open it — no build step, no server required. It installs Nodex UI from the pinned CDN and renders a button, an input, and a card using the base static markup (`b-ui`) API (the zero-build alternative). If you're building an application, skip straight to the [pure Nodex UI install](#2-install-pure-owl-api--recommended) below — it's the recommended way to consume Nodex UI.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NodexUI quick start</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.css">
  <script src="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.js" defer></script>
</head>
<body>
  <div b-ui="card" style="max-width: 24rem; margin: 2rem auto;">
    <div b-card-header>Sign in</div>
    <div b-card-body>
      <input b-ui="input" type="email" placeholder="name@example.com">
    </div>
    <div b-card-footer>
      <button b-ui="button" b-att-variant="default" type="button">Continue</button>
    </div>
  </div>

</body>
</html>
```

`https://cdn.jsdelivr.net/npm/nodexui@latest/dist/...` is the real jsDelivr URL for the published `nodexui` npm package's `latest` tag, used here for a copy-paste-and-go quick start. Pin an exact version instead (e.g. `@1.3.3`, or `@1` to take only non-breaking updates) for production, so a new release can't change what your page loads. See [Installation](installation.md) for jsDelivr/unpkg/npm/self-hosted paths.

The static bundle calls `thebase.mountAll()` automatically on `DOMContentLoaded`, so initial `[b-ui]` and `[b-icon]` markup mounts without an extra script. Call `thebase.mountAll(root)` yourself only after injecting new markup or when mounting a specific fragment. If the consumer is itself an application, use [step 2](#2-install-pure-owl-api--recommended) instead — that's the recommended path.

## 1. Decide which API you need

| You are building... | Use | Install | Full reference |
| --- | --- | --- | --- |
| Your own application that wants `<Button/>`, `<Card/>`, `<Dialog/>` as real component classes | The Nodex UI component API (recommended) | CSS + the same `nodexui.min.js`/`nodexui.esm.js` (via `nodexui`/`nodexui` import-map keys or a plain npm import) + `dist/nodexui.templates.xml` | [Nodex UI Component](owl-components.md) |
| Static HTML, a server-rendered page, or a Base HUB website page with no Nodex runtime | The base static markup (`b-ui`) API (alternative) | One CSS file + one `<script>` tag | [Installation](installation.md) |

Both APIs come from the same package and the same CSS file, and can be mixed on one page. Prefer the Nodex UI component API by default — real component classes, props, and slots compose more predictably than markup attributes. Reach for the static API only when the target page has no Nodex runtime of its own (plain HTML, server-rendered templates, a Base HUB website page) and adding one isn't worthwhile just to use Nodex UI.

**[VERIFY]** Before choosing, confirm whether the target project already runs Nodex (check for `@odoo/owl` or `nodexui` in its `package.json`), or whether it's a plain page you'd rather not add a component-mount step to. Use the static API for the latter.

## 2. Install (pure Nodex UI API — recommended)

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

`https://unpkg.com/nodexui@latest/dist/...` mirrors the same files as an alternative CDN if jsDelivr is unreachable — swap the host in each URL above. Pin an exact version (e.g. `@1.3.3`, or `@1` to take only non-breaking updates) instead of `@latest` for production.

```html
<script type="module">
  import { Component, mount, xml } from "nodexui";
  import { Button, Card, CardBody, CardHeader, CardTitle } from "nodexui";

  const templates = await fetch(import.meta.resolve("nodexui/templates")).then((r) => r.text());

  class Root extends Component {
    static components = { Button, Card, CardBody, CardHeader, CardTitle };
    static template = xml`
      <Card>
        <CardHeader><CardTitle>Hello</CardTitle></CardHeader>
        <CardBody>
          <Button variant="'default'" label="'Save'" onClick="() => console.log('saved')"/>
        </CardBody>
      </Card>`;
  }

  await mount(Root, document.getElementById("app"), { templates });
</script>
```

`nodexui` resolves to the `dist/nodexui.esm.js` — the one file this whole guide installs for the static API too. For npm/bundler usage, skip the import map entirely and import everything straight from `nodexui` (plus `nodexui/dist/nodexui.templates.xml` as a fetch target) — see [Nodex UI Component](owl-components.md#npm--bundler-usage).

Two rules that account for most integration failures — see [Nodex UI Component](owl-components.md#common-mistakes) for the worked example:

1. `dist/nodexui.templates.xml` must be loaded and passed to `mount()` before any Nodex UI tag renders.
2. Import Nodex itself from `nodexui`, never `@odoo/owl` — otherwise the consumer's `Component` class and Nodex UI's are different runtime identities and mounting throws.

## 3. Install (static `b-ui` API — alternative, no Nodex runtime needed)

**Option A — CDN (static HTML, no build step):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.css">
<script src="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.js" defer></script>
```

`https://unpkg.com/nodexui@latest/dist/...` mirrors the same files as an alternative CDN if jsDelivr is unreachable. Pin an exact version (e.g. `@1.3.3`, or `@1` to take only non-breaking updates) instead of `@latest` for production.

**Option B — npm (bundler-based apps: Vite, webpack, etc.):**

```sh
npm install nodexui
```

```js
import "nodexui/nodexui.css";
import "nodexui"; // side-effect import: registers window.thebase and auto-mounts on DOMContentLoaded
```

`dist/nodexui.min.js`/`nodexui.esm.js` are fully self-contained — the JS bundle and the Nodex runtime are embedded ahead of Nodex UI's own code, in load order, inside this one file. No other script or import is needed for the static API.

Rule that applies to both options:

- Production pages must use a pinned version (e.g. `nodexui@1.3.3` or `nodexui@1`), never `@latest`.

Mount markup:

```html
<button b-ui="button" b-att-variant="default" type="button">Save</button>
```

Initial page markup mounts automatically. `thebase.mountAll()` scans for `[b-ui]` and `[b-icon]` and is idempotent — call it again after injecting new markup (e.g. after an AJAX partial render). Runtime API surface: [Runtime API](runtime-api.md).

### Quick component snippets

Copy-paste starting points for the components you'll reach for first. Every component's full attribute/event/accessibility reference lives under [`docs/components/`](components/) — look up the specific component before shipping.

```html
<!-- Button -->
<button b-ui="button" b-att-variant="default">Save</button>
<button b-ui="button" b-att-variant="outline" b-att-size="sm">Cancel</button>

<!-- Input -->
<input b-ui="input" type="email" placeholder="name@example.com">

<!-- Card -->
<div b-ui="card">
  <div b-card-header>Title</div>
  <div b-card-body>Content</div>
  <div b-card-footer>Footer</div>
</div>

<!-- Dialog -->
<button b-att-trigger="#settings-dialog">Open</button>
<div b-ui="dialog" b-att-trigger="[b-att-trigger='#settings-dialog']" id="settings-dialog">
  <div b-dialog-panel>
    <h2>Settings</h2>
    <button b-dialog-close>Close</button>
  </div>
</div>

<!-- Icon -->
<span b-icon="search"></span>
```

## 4. Theme the install

```html
<html b-theme="dark">
```

```js
thebase.theme.set("dark");
thebase.theme.set({ primary: "#0057d8", radius: "0.5rem" });
```

For a persisted toggle like the docs/examples use:

```html
<button b-ui="theme-button" b-att-variant="outline" type="button"></button>
```

Or control the same theme state from JavaScript:

```js
import { createThemeController } from "nodexui";

const theme = createThemeController();
theme.init();
```

Full token list and the shadcn-aligned default palette: [Theming](theming.md).

## 5. Add icons (optional, no extra install)

```html
<button b-ui="button" b-att-variant="outline" type="button" aria-label="Open sidebar">
  <span b-icon="panel-left" b-icon-size="1rem"></span>
</button>
```

Icons ship with the normal Nodex UI assets — no separate script tag, and every Lucide icon name is available by kebab-case (`panel-left`), camelCase, or snake_case. Sizing, color, accessibility rules, and self-hosting: [Built-in Icons](icons.md).

## 5b. PWA toolkit (optional) — generate manifest.webmanifest + sw.js

Any Nodex UI app can become an installable PWA without hand-writing a service worker. `nodexui/pwa`
exports two pure functions, `buildManifest(config)` and `buildServiceWorker(config)`, that turn a
config object into the exact manifest JSON and service-worker source a hand-written PWA needs
(precache the app shell, network-first for same-origin requests, cache-first for the pinned CDN
build). Define the variables once, regenerate the files whenever they change:

```js
// nodexui.pwa.config.js
export default {
  manifest: {
    name: "My App",
    shortName: "MyApp",
    description: "One sentence about the app.",
    themeColor: "#0f172a",
  },
  serviceWorker: {
    cacheName: "my-app-cache-v1",
    cdnVersion: "1.3.3", // pin to match the importmap in index.html
    appFiles: ["/app.css", "/app.js", "/app.xml", "/favicon.svg", "/icons/icon-192.png", "/icons/icon-512.png"],
  },
};
```

```sh
npx create-nodexui-app pwa . --config nodexui.pwa.config.js
# writes ./manifest.webmanifest, ./sw.js, ./sw-register.js and ./version.json
```

**Auto-reload on a new deploy.** The generated `sw.js` fetches `version.json` (never cached) on activate, on
every page navigation and when the page posts `"check-version"`. When the value differs from the last one it
saw, it wipes the caches, re-precaches the app shell and posts `"version-changed"` to every open page.
`sw-register.js` (load it with `<script type="module" src="/sw-register.js">`, replacing your own
`serviceWorker.register`) registers the worker, reloads on that message and re-checks when the tab becomes
visible. `version.json` is a content hash of `sw.js`, the manifest and every `appFiles` entry found under
`<path>`, so re-run the `pwa` command as the last step of every deploy.

Re-run the command whenever `appFiles`, the CDN pin, or manifest fields change — both output files are
fully regenerated, never hand-patched. Only `manifest.name`, `serviceWorker.cacheName`, and
`serviceWorker.cdnVersion` are required; everything else (icons, theme/background color, display
mode, extra precache URLs) has defaults. The default logo and favicon set (`favicon.ico`, 16/32 px favicons,
`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) is copied into `<path>/icons/` by the command (existing
files are kept, so your own icons win). Serving icons from another folder? Set `iconsBase` (manifest and
service worker) and `manifestUrl` (service worker) in the config. See
`dist/types/pwa.d.ts` for the full config shape.

**Default in every scaffolded project.** `create-nodexui-app create|init` projects ship
`plugins: [nodexuiPwa({ name })]` (from `nodexui/vite`) in `vite.config.js`. Each `vite build` then emits
`manifest.webmanifest`, `sw.js`, `sw-register.js`, `version.json` (hash of the built bundle) and the default
icons into `dist/`, and injects the manifest link, theme color and register script into every page — no
config file, no extra command. Every deploy with changed code therefore reloads open pages automatically.
`vite dev` is untouched. Options: `name`, `description`, `themeColor` and the other manifest fields, plus
`cdnVersion` (only for apps that load NodexUI from the CDN). For an existing project, add the plugin to
`vite.config.js` (`convert` prints this hint). Remove the plugin to opt out.

## 6. Copy a block instead of assembling from primitives

For common layouts (dashboard shells, sidebars, login/signup forms, charts), copy a ready-made block from the gallery instead of composing primitives by hand: [Blocks](blocks.md).

## 7. Verify the integration

- [ ] Only `nodexui.min.css` + `nodexui.min.js` (or `nodexui.esm.js`) are loaded — no separate `nodexui.owl.*`/`bootstrap.bundle.min.js`/`nodexui.components.esm.js` files needed, for either API.
- [ ] `thebase.version` returns the expected pinned version in the browser console.
- [ ] Initial static markup mounts without an extra call; injected markup mounts after `thebase.mountAll(root)`.
- [ ] Nodex UI components render with no console errors (a missing-template error means step 2's `dist/nodexui.templates.xml` load is missing or unawaited).
- [ ] Toggling `b-theme` actually changes rendered colors (a no-op usually means CSS custom properties are being overridden by the consumer's own stylesheet loaded after `nodexui.min.css`).
- [ ] Look up the specific component in [`docs/components/`](components/) for its attributes, events, and accessibility notes before wiring it up.

## 8. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `ReferenceError: NodexUI is not defined` | The bundle script hasn't run yet, or its `<script>` tag is missing/mistyped. | Confirm the `<script src=".../nodexui.min.js" defer>` tag is present and the network tab shows it loading (200, not 404). |
| Components render unstyled (plain HTML, no built-in look) | `nodexui.min.css` isn't loaded, or loaded after your own stylesheet overrides it. | Load `nodexui.min.css` in `<head>`, before any of your own CSS that touches the same elements. |
| `tabs` (or another runtime-backed static component) silently does nothing | `nodexui.min.js` didn't finish loading. | Confirm `nodexui.min.js` loads (network tab, 200 not 404). |
| Pure Nodex UI mount throws `"X is not a Component. It must inherit from the Component class"` | Your app imports `@odoo/owl` directly somewhere instead of `nodexui`. | Replace every `@odoo/owl` import with `nodexui` in your own app code — both must resolve to the same `globalThis.owl` instance. |
| Nodex UI component renders blank / throws a template-not-found error | `dist/nodexui.templates.xml` was never fetched and passed to `mount()`. | Fetch the templates string and pass it as `{ templates }` to `mount()` (or `app.addTemplates(...)`) before rendering any Nodex UI tag. |
| New markup injected via AJAX/fetch doesn't turn into components | Auto-mount only covers markup present when the bundle initializes. | Call `thebase.mountAll(root)` after injecting new `[b-ui]` or `[b-icon]` markup — it's idempotent, safe to call repeatedly. |
| `thebase.theme.set(...)` has no visible effect | A page stylesheet loaded after `nodexui.min.css` re-hardcodes the same properties, or the element isn't a descendant of the themed root. | Load consumer CSS after Nodex UI's, and confirm `b-theme` is set on `<html>` or an ancestor of the components you expect to change. |

## 9. Common mistakes

- Adding a `nodexui.owl.min.js`/`bootstrap.bundle.min.js`/`nodexui.components.esm.js` script tag "just in case" — none of those files are published anymore; `nodexui.min.js`/`nodexui.esm.js` embed everything.
- Using `/latest/` CDN paths in production instead of a pinned version.
- Assuming auto-mount watches the DOM forever — it does not; call `thebase.mountAll(root)` after injecting new `[b-ui]` markup client-side (e.g. from a fetched partial).
- Mixing `@odoo/owl` imports into a project that also imports `nodexui` — always go through `nodexui`.
- Expecting `thebase.mountAll()` to pick up Nodex component tags (`<Button/>`) — it only mounts static `[b-ui]` markers; Nodex UI components are registered and mounted through your own app's `static components` + `mount()`, per step 2.

## Related docs

[Installation](installation.md) · [Runtime API](runtime-api.md) · [Theming](theming.md) · [Built-in Icons](icons.md) · [Nodex UI Component](owl-components.md) · [Blocks](blocks.md) · [Component Authoring](component-authoring.md) (for contributing to Nodex UI itself, not for consuming it) · [Registry](registry.md) · [Component Reference index](components/button.md) (per-component pages live under `docs/components/`)
