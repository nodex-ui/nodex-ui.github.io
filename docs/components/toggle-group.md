# Toggle Group

Use `b-ui="toggle-group"` for a CDN-ready toggle group component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { ToggleGroup, ToggleGroupItem } from "nodexui";
```

```base-ui
<div style="max-width: 28rem">
  <ToggleGroup>
    <ToggleGroupItem value="'bold'">
      <Icon name="'bold'" className="'h-4 w-4'"/>
    </ToggleGroupItem>
    <ToggleGroupItem value="'italic'">
      <Icon name="'italic'" className="'h-4 w-4'"/>
    </ToggleGroupItem>
    <ToggleGroupItem value="'underline'">
      <Icon name="'underline'" className="'h-4 w-4'"/>
    </ToggleGroupItem>
  </ToggleGroup>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `ToggleGroup` | `multiple` | `Boolean` | optional |
| `ToggleGroup` | `onChange` | `Function` | optional |
| `ToggleGroup` | `className` | `String` | optional |
| `ToggleGroupItem` | `value` | `String` | required |
| `ToggleGroupItem` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="toggle-group">Toggle Group</div>
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
