# Resizable

Use `b-ui="resizable"` for a CDN-ready resizable component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Resizable } from "nodexui";
```

```base-ui
<div class="d-flex border rounded-3" style="max-width: 28rem; width: 100%;">
  <Resizable min="80" max="300" className="'flex-shrink-0 border-end'">
    <div class="d-flex align-items-center justify-content-center h-100 p-3">
      <span class="fw-semibold">One</span>
    </div>
  </Resizable>
  <Resizable min="80" max="300" className="'flex-shrink-0 border-end'">
    <div class="d-flex align-items-center justify-content-center h-100 p-3">
      <span class="fw-semibold">Two</span>
    </div>
  </Resizable>
  <div class="flex-grow-1">
    <div class="d-flex align-items-center justify-content-center h-100 p-3">
      <span class="fw-semibold">Three</span>
    </div>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Resizable` | `min` | `Number` | optional |
| `Resizable` | `max` | `Number` | optional |
| `Resizable` | `onChange` | `Function` | optional |
| `Resizable` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="resizable">Resizable</div>
```

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. Static components do not emit events.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
