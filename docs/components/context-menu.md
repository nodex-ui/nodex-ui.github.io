# Context Menu

Use `b-ui="context-menu"` for a CDN-ready context menu component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="d-flex align-items-center justify-content-center rounded border border-dashed small w-100" style="height: 6.25rem">
        Right click here
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `ContextMenu` | `className` | `String` | optional |
| `ContextMenuContent` | `className` | `String` | optional |
| `ContextMenuItem` | `className` | `String` | optional |
| `ContextMenuItem` | `onClick` | `Function` | optional |
| `ContextMenuTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="context-menu">Context Menu</div>
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
