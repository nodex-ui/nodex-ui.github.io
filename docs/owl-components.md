# Nodex UI Component

See the [Usage Guide](usage-guide.md) for when to reach for this API versus the static `b-ui` one. This page covers the pure Nodex UI API only.

Nodex UI ships a second, additive public API alongside the static `b-ui` markers: real Nodex component classes you import, compose with `static components`, and mount as part of your own application. This page covers how to load and use it; see [Component Authoring](component-authoring.md) for how components implement both APIs from one source folder.

As of 1.1.0, every component in the registry (all 74) has a pure Nodex UI export — there are no static-only components left. Compound components export a root class plus sub-components (e.g. `Dialog`/`DialogTrigger`/`DialogContent`/...); check a component's `owlComponents` entry in `dist/nodexui.registry.json`, or its doc page under [`docs/components/`](components/), for the exact export list. A few components have a deliberately reshaped pure Nodex UI API versus their static markup-scanning adapter — see [Registry](registry.md#component-export-policy) for which ones and why.

## What you need to load

Everything — the static `b-ui` runtime, the Nodex runtime, every Nodex UI component class, and the theme helper — is one file: `dist/nodexui.esm.js` (or `dist/nodexui.min.js` as a classic script). There is no separate `nodexui.owl.*`/`nodexui.components.esm.js`/`nodexui.theme.esm.js` to load.

| File | Purpose |
| --- | --- |
| `dist/nodexui.min.css` | the built-in styles + Nodex UI styling, shared by both APIs. |
| `nodexui` (`dist/nodexui.esm.js`) | The Nodex runtime — `Component`, `mount`, `xml`, `useState`, etc. Pinned to Nodex `2.8.3`, embedded directly in this file. Import your app's own Nodex usage from here too, not `@odoo/owl`. |
| `nodexui` (`dist/nodexui.esm.js`) | The Nodex UI component classes — same file as `nodexui` above, just a different import-map key for readability. |
| `nodexui` (`dist/nodexui.esm.js`) | Same file again — the theme helper for persisted light/dark toggles, URL overrides, button-label sync, and iframe preview sync. |
| `nodexui/templates` (`dist/nodexui.templates.xml`) | The Nodex templates the component classes reference (`static template = "nodexui.Button"`, etc). Must be loaded and passed to `mount()` before any Nodex UI component tag renders — a component class alone does not carry its template. |

## Browser (import map) usage

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
<script type="module">
  import { Component, mount, xml } from "nodexui";
  import { Button, Card, CardBody, CardHeader, CardTitle } from "nodexui";

  // "nodexui/templates" is an import-map entry, not a JS module — resolve it
  // to its mapped URL and fetch the text.
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

`https://unpkg.com/nodexui@latest/dist/...` mirrors the same files as an alternative CDN if jsDelivr is unreachable — swap the host in each URL above. For a self-hosted build, replace the CDN host with your own served path (e.g. `/dist/nodexui.esm.js`). These snippets use `@latest` for readability; pin an exact version (e.g. `@1.3.1`, or `@1` to take only non-breaking updates) in production so a new release can't change what your page loads.

No `@odoo/owl` import appears anywhere in that snippet — `nodexui` is the only Nodex entry point Nodex UI components and consumer apps need. Because `nodexui`, `nodexui`, and `nodexui` all point at the exact same `dist/nodexui.esm.js` URL, the browser fetches and evaluates it once and every key shares the same module instance — no separate classic `<script>` needs to load first to set up a shared global.

## npm / bundler usage

```sh
npm install nodexui
```

```js
import { Component, mount, xml, Button, Card } from "nodexui";
import nodexuiTemplates from "nodexui/dist/nodexui.templates.xml?raw"; // exact loader syntax depends on your bundler

class Root extends Component {
  static components = { Button, Card };
  static template = "Root";
}
```

There's only one package entry now — `nodexui` exports the Nodex runtime (built from the exact `@odoo/owl@2.8.3` this Nodex UI release vendors; you do not need to install `@odoo/owl` yourself), every Nodex UI component class, and the theme helper together. Browser import-map examples above still use the `nodexui`/`nodexui`/`nodexui` keys for readability, but they're just local aliases to the same file.

When a bundler cannot import XML with `?raw`, load `dist/nodexui.templates.xml` as a served asset and pass the fetched string to `mount(Root, target, { templates })`. The template file is part of the runtime contract, not optional documentation.

## Mixing with the static API

Both APIs come from the exact same bundle now, so there's nothing extra to load — just be clear about which mechanism owns which markup:

- `thebase.mountAll(root)` enhances static `[b-ui]` and `[b-icon]` markers.
- Nodex `mount(Root, target, { templates })` renders component tags such as `<Button/>`.
- Importing the package always also runs `autoMount()` (its `[b-ui]`/`[b-icon]` DOM scan on `DOMContentLoaded`) — harmless if your page has none, but means there's no side-effect-free way to import just the component classes anymore.
- Both APIs share `dist/nodexui.min.css`, `nodexui`, and the same `b-theme` / `data-bs-theme` root attributes.

## Props, events, slots

- Props are camelCase (`variant`, `label`, `disabled`, `className`).
- Almost every component that renders its own root element also accepts `style` (a string or a plain object of CSS properties) alongside `className`. Components that only forward a default slot with no wrapping element of their own (`AlertDialog`, `Pwa`, `Sheet`, `ContextMenu`, `Drawer`) have neither prop. A handful of components that already compute an internal style (`Icon`, `AspectRatio`, `Progress`, `ContextMenuContent`, `SidebarMenuSkeleton`) merge your `style` with their own computed value instead of one overwriting the other.
- Events are callback props (`onClick`, `onChange`, `onOpenChange`), not DOM `CustomEvent`s — that's the static API's contract, not this one.
- Default slot content works as normal Nodex children (`<Badge>Draft</Badge>`); compound components use named slots/sub-tags (`<CardHeader>`, `<DialogFooter>`).

## Global component fallback

`Component` exported from `nodexui` / `nodexui` is Nodex's `Component` with one addition: any component that extends it can use every registered Nodex UI component (`<Icon/>`, `<Button/>`, `<Card/>`, ...) in its template, even if its own `static components` doesn't list it. Without this, Nodex only checks a component's own `static components` map, so a nested child that used `<Icon/>` without declaring it crashed with `Cannot find the definition of component "Icon"`.

- The fallback applies to every component in the tree, not only the root passed to `mount()`.
- Entries in your own `static components` still take precedence over a Nodex UI component with the same name.
- Listing Nodex UI classes in `static components` is still allowed and is the clearest choice for shared or library code. The fallback mainly protects deeply nested app components.
- The fallback only works for classes that extend Nodex UI's `Component`. A class built on `Component` from `@odoo/owl` directly does not get it.

```js
import { Component, mount, xml } from "nodexui";

class SaveRow extends Component {
  // No static components — <Button/> and <Icon/> resolve from the NodexUI registry.
  static template = xml`<div><Icon name="'save'"/><Button label="'Save'"/></div>`;
}

class Root extends Component {
  static components = { SaveRow };
  static template = xml`<SaveRow/>`;
}
```

See each component's page under [`docs/components/`](components/) for its specific props table and a Nodex usage example alongside the static `b-ui` one.

## Common mistakes

- **Rendering a bare `<Button/>` with no template loaded.** `mount(Root, target)` without `{ templates }` (or `app.addTemplates(...)`) throws — the `.xml` file is a real build/runtime input, not documentation.
- **Registering `Button` under the wrong tag name.** `static components = { Button }` must match the tag used in the template (`<Button/>`), same as any other Nodex component. If you alias a Nodex UI class under a different tag (`{ PrimaryButton: Button }`), the alias exists only in that component's map.
- **Importing from `@odoo/owl`.** Always import from `nodexui` instead, even in your own app code — it keeps your app on the exact Nodex version this Nodex UI release was tested against, and only `nodexui`'s `Component` provides the [global component fallback](#global-component-fallback).
- **Adding a `nodexui.owl.min.js`/`nodexui.owl.esm.js`/`nodexui.components.esm.js` script or import-map entry.** None of those files are published anymore — point `nodexui`/`nodexui`/`nodexui` all at `dist/nodexui.esm.js` instead.
