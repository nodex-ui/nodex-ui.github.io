# Registry

Every release publishes `dist/nodexui.registry.json`. The registry lists package metadata, CDN paths, build files, themes, and per-component metadata (type, dependencies, `b-*` attributes, events, and — since the Phase 8 pure Nodex UI rollout — Nodex component/template metadata). It only registers components under `src/components/`; example blocks under `examples/blocks/` are not part of the registry.

Nodex UI ships as bundled files only — there is no per-component source distribution. Use the registry's `components` entries to look up a component's contract, not to locate individual source files.

## Build files

`buildFiles` lists every top-level `dist/` artifact the release validates and hashes:

- `nodexui.min.css` — Nodex UI styles (static and pure Nodex UI APIs share the same stylesheet).
- `nodexui.min.js` / `nodexui.esm.js` — the one bundle for both APIs: the static `b-ui` runtime (`NodexUI.register(...)`, `thebase.mountAll()`), the Nodex runtime (`Component`, `mount`, `xml`, ...), every Nodex UI component class (`Button`, `Card`, `Tabs`, ...), and the theme helper (`createThemeController`, `NodexUITheme`). The JS bundle and Nodex's global build are embedded ahead of Nodex UI's own code, in that load order — no separate `nodexui.owl.*`/`nodexui.components.esm.js`/`nodexui.theme.esm.js`/`bootstrap.bundle.min.js` script is needed.
- `bootstrap.bundle.min.js` — vendored built-in JS, standalone, unmodified. Ships in case a project wants it on its own; Nodex UI's own bundle never needs it loaded separately (it's embedded in `nodexui.min.js`/`nodexui.esm.js` too).
- `nodexui.icons.esm.js` — the 2000+ generated `Icon<Name>` components (`IconEye`, `IconSearch`, ...), split out because they'd blow the main bundle's size budget. The one deliberate exception to "everything is one bundle".
- `nodexui.templates.xml` — every Nodex UI component's compiled `<templates>` body, concatenated into one file. Load this into the Nodex `App`'s `templates` config before mounting; `.xml` files under `src/components/` are authoring sources, not something a consumer app loads directly.
- `nodexui.analytics.esm.js` / `nodexui.analytics.min.js` — the optional, standalone cookieless analytics service (`nodexui/analytics`). Not part of the main bundles and needs no other Nodex UI file; see [Analytics](analytics.md).
- `nodexui.i18n.esm.js` / `nodexui.i18n.min.js` — the optional, standalone gettext-style i18n service (`nodexui/i18n`). Not part of the main bundles and needs no other Nodex UI file; see [i18n](i18n.md).
- `nodexui.qr.esm.js` / `nodexui.qr.min.js` — the optional, standalone QR and VietQR service (`nodexui/qr`). Not part of the main bundles; see [QR](qr.md).
- `icons/lucide.json` — the built-in icon manifest.

## Component export policy

Every component folder under `src/components/<name>/` is one of:

1. **Both APIs** — has `<name>.js` (static `NodexUI.register(...)` adapter) *and* `<name>.component.js` (pure Nodex UI `Component` class(es)). As of the Phase 8 rollout this is **all 74** registry components; there are no static-only exceptions left. A handful of components (`chart`, most notably) have lighter-fidelity pure Nodex UI treatments than their static adapter — see their component doc page for the documented gap — but every registry component has a real Nodex export.
2. Static-only components would report `"type": "static"` with no `owlComponents` field, but none currently exist in this registry.

Per-component registry entries now include:

- `owlComponents` — the exact list of exported Nodex class names from `<name>.component.js`, e.g. `["Dialog", "DialogTrigger", "DialogContent", ...]` for compound components. Import these from `nodexui`.
- `templateName` — the namespaced template name the component's *root* class renders, e.g. `"nodexui.Dialog"`. Every template also registers a short un-namespaced alias (e.g. `Dialog`) via `t-call` for local convenience; `templateName` documents the namespaced form because that's the collision-safe one to rely on across a large template set.

Existing fields (`type`, `dependencies`, `attributes`, `events`) are unchanged and describe the static `b-ui` contract; they apply regardless of whether a Nodex export also exists.

## Validation

The build validates every registry path against `dist/` and adds SHA-384 integrity hashes for build files and themes. Example blocks (composed static HTML demos styled by `nodexui.min.css`) live under `examples/blocks/` with per-block CSS split from `examples/blocks/shared.css`, but are not registry or JavaScript components.
