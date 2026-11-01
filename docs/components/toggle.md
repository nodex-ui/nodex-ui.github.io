# Toggle

Use `b-ui="toggle"` for a CDN-ready toggle component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Toggle } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-4" style="max-width: 28rem">
  <div class="d-flex align-items-center gap-2">
    <Toggle>Toggle</Toggle>
  </div>
  <div class="d-flex align-items-center gap-2">
    <Toggle variant="'outline'"><Icon name="'italic'"/></Toggle>
    <Toggle variant="'outline'"><Icon name="'bold'"/></Toggle>
  </div>
  <div class="d-flex align-items-center gap-2">
    <Toggle><Icon name="'italic'"/> Italic</Toggle>
  </div>
  <div class="d-flex align-items-center gap-2">
    <Toggle className="'disabled'" pressed="false"><Icon name="'italic'"/></Toggle>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Toggle` | `pressed` | `Boolean` | optional |
| `Toggle` | `variant` | `String` | optional |
| `Toggle` | `className` | `String` | optional |
| `Toggle` | `onChange` | `Function` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="toggle">Toggle</div>
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
