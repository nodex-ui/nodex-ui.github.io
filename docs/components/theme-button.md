# Theme Button

Use `b-ui="theme-button"` for an icon-only light/dark theme toggle.

## CDN install requirements

Load Nodex UI CSS and Nodex UI JavaScript bundle (`nodexui.min.js`). The component uses the built-in Lucide icon renderer and the `nodexui` helper bundled with Nodex UI.

## Nodex UI component

```js
import { ThemeButton } from "nodexui";
```

```base-ui
<ThemeButton variant="'outline'" storageKey="'b-theme'"/>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `ThemeButton` | `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | optional, default `"outline"` |
| `ThemeButton` | `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | optional |
| `ThemeButton` | `storageKey` | `String` | optional |
| `ThemeButton` | `className` | `String` | optional |
| `ThemeButton` | `onChange` | `Function` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button b-ui="theme-button" b-att-variant="outline" type="button"></button>
```

## Enhanced usage

The static bundle mounts initial `b-ui="theme-button"` markup automatically. Call `thebase.mount(element)` or `thebase.mountAll(root)` only when adding a theme button after the page has loaded. The component updates `b-theme` and `data-bs-theme` on the document root, persists the selected theme, and keeps its icon/ARIA label in sync.

## Options and attributes

Use `b-att-variant="default|outline|ghost|destructive|secondary|link"` and `b-att-size="default|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg"` to match Button variants. Use `b-att-storage-key` when a page needs a custom persistence key.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`. For direct theme control, import `createThemeController` from `nodexui`.

## Events

Theme changes dispatch `nodexui:theme-change` on `document` with `{ theme }` in `event.detail`.

## CSS variables

The component inherits Button and Icon tokens, including `--b-radius-lg`, `--b-primary`, `--b-border`, and `--b-icon-size`.

## Accessibility behavior

The visible content is a Lucide moon/sun icon. The button sets `aria-label`, `title`, and `aria-pressed`, and includes a visually hidden label for assistive technologies.

## Examples

See the example page headers for working `b-ui="theme-button"` navigation usage.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify the icon changes from moon to sun, the root theme attributes update, keyboard activation works, and multiple mounted buttons stay synchronized.
