# Command

Use `b-ui="command"` for a CDN-ready command component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Command } from "nodexui";
```

```base-ui
<div class="border rounded-3 shadow-sm bg-body" style="max-width: 28rem; width: 100%;">
  <Command
    placeholder="'Type a command or search...'"
    className="'border-0 shadow-none'"
    items="[
      { value: 'calendar', label: 'Calendar' },
      { value: 'search-emoji', label: 'Search Emoji' },
      { value: 'calculator', label: 'Calculator (disabled)' },
      { value: 'profile', label: 'Profile — ⌘P' },
      { value: 'billing', label: 'Billing — ⌘B' },
      { value: 'settings', label: 'Settings — ⌘S' },
    ]"
  />
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Command` | `items` | `Array` | required |
| `Command` | `placeholder` | `String` | optional |
| `Command` | `className` | `String` | optional |
| `Command` | `onSelect` | `Function` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="command">Command</div>
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
