# Icon

Nodex UI includes the full Lucide SVG icon set as a built-in CDN icon library.

## Nodex UI component

```js
import { Icon } from "nodexui";
```

```base-ui
<Icon name="'search'"/>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Icon` | `name` | `String` | required |
| `Icon` | `label` | `String` | optional |
| `Icon` | `title` | `String` | optional, native hover tooltip |
| `Icon` | `size` | `String` | optional |
| `Icon` | `baseUrl` | `String` | optional |
| `Icon` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<span b-icon="search"></span>
<span b-icon="panel-left" b-icon-size="20px" aria-label="Open sidebar"></span>
```

Icons render as CSS masks, so they inherit `currentColor` from the surrounding text, button, menu item, or theme.

## Attributes

- `b-icon` enables the icon component and names any Lucide icon in kebab-case, camelCase, snake_case, or space-separated form.
- `b-icon-size` sets the icon size, such as `16px`, `1rem`, or `1.25em`.
- `aria-label` makes the icon accessible as an image.
- `b-icon-base-url` overrides the SVG base URL for self-hosted icons.

The previous verbose form, `<span b-ui="icon" b-att-icon="search"></span>`, still works for compatibility.

For install patterns, accessibility guidance, self-hosting, and JavaScript examples, see the built-in icon guide at `/docs/icons`.

## JavaScript API

```js
thebase.icons.lucide.url("panel-left");
thebase.icons.lucide.render(document.querySelector("#icon"), "check", { size: "18px" });
```

By default, icon URLs point to `https://cdn.jsdelivr.net/npm/lucide-static@1.31.0/icons`. The build also publishes every SVG under `dist/icons/lucide/` plus a generated `dist/icons/lucide.json` manifest for self-hosted CDN deployments.
