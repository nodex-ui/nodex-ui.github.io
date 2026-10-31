# Built-in Icons

Nodex UI ships the full Lucide icon set as a built-in CDN-ready icon library. Icons use the `b-icon` attribute, render as CSS masks, and inherit `currentColor` from the surrounding button, link, menu item, block, or theme.

```html
<button b-ui="button" type="button">
  <span b-icon="search"></span>
  Search
</button>

<button b-ui="button" b-att-variant="outline" type="button" aria-label="Open sidebar">
  <span b-icon="panel-left" b-icon-size="1rem"></span>
</button>
```

## Install

Load the normal Nodex UI assets. No separate icon script is required.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.css">
<script src="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.js" defer></script>
```

`https://unpkg.com/nodexui@latest/dist/...` mirrors the same files as an alternative CDN if jsDelivr is unreachable. Pin an exact version (e.g. `@1.3.1`, or `@1` to take only non-breaking updates) instead of `@latest` for production. `b-icon` also works with the [pure Nodex UI `Icon` component](components/icon.md) — the recommended API in an application; the classic script above is for pages using the static `b-ui` API.

The build publishes every Lucide SVG to `dist/icons/lucide/` and writes the generated icon manifest to `dist/icons/lucide.json`.

## Markup

Use the Lucide icon name in kebab-case, camelCase, snake_case, or space-separated form. Nodex UI normalizes the name to the matching Lucide SVG file.

```html
<span b-icon="check"></span>
<span b-icon="panel-left"></span>
<span b-icon="PanelLeft"></span>
<span b-icon="panel_left"></span>
```

Use `b-icon-size` when the surrounding component should not control the icon size.

```html
<span b-icon="bell" b-icon-size="20px"></span>
<span b-icon="settings" b-icon-size="1.25rem"></span>
```

## Color

Icons inherit `currentColor`, so set color on the parent element or let Nodex UI component variants and themes do it.

```html
<button b-ui="button" b-att-variant="destructive" type="button">
  <span b-icon="trash-2"></span>
  Delete
</button>

<span class="text-body-secondary">
  <span b-icon="info"></span>
  Muted helper text
</span>
```

## Accessibility

Decorative icons should not have a label. Nodex UI marks them with `aria-hidden="true"`.

```html
<span b-icon="mail"></span>
```

Icon-only controls need an accessible name on the control, not just on the icon.

```html
<button b-ui="button" b-att-variant="outline" type="button" aria-label="Copy invite link">
  <span b-icon="copy"></span>
</button>
```

Standalone meaningful icons can use `aria-label`.

```html
<span b-icon="circle-check" aria-label="Complete"></span>
```

## Self-hosting

By default, icon URLs point to the pinned Lucide CDN configured in the registry. To serve icons from your own Nodex UI build, point `b-icon-base-url` at the published icon folder.

```html
<span b-icon="search" b-icon-base-url="/dist/icons/lucide"></span>
```

The same override is available through JavaScript.

```js
thebase.icons.lucide.url("search", { baseUrl: "/dist/icons/lucide" });
```

## JavaScript API

Use the API when you need to build URLs or render icons into existing nodes.

```js
thebase.icons.lucide.normalizeName("Panel_Left");
thebase.icons.lucide.url("panel-left");
thebase.icons.lucide.render(document.querySelector("#status-icon"), "circle-check", {
  size: "18px",
});
```

The compatibility form still works, but new markup should prefer the shorter `b-icon` attribute.

```html
<span b-ui="icon" b-att-icon="search"></span>
```
