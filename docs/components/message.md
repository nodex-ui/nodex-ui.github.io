# Message

Use `b-ui="message"` for a CDN-ready message component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Message } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-3 w-100" style="max-width: 24rem">
  <div class="d-flex align-items-end gap-2">
    <Avatar className="'flex-shrink-0'"><t t-set-slot="fallback">JL</t></Avatar>
    <Message side="'incoming'">Hey, are we still on for the deploy today?</Message>
  </div>
  <div class="d-flex align-items-end gap-2 justify-content-end">
    <Message side="'outgoing'">Deploying to prod real quick.</Message>
    <Avatar className="'flex-shrink-0'"><t t-set-slot="fallback">ME</t></Avatar>
  </div>
  <div class="d-flex flex-column align-items-end gap-1">
    <div class="d-flex align-items-end gap-2 justify-content-end">
      <Message side="'outgoing'">Just kicked it off, should be done in a few minutes.</Message>
      <Avatar className="'flex-shrink-0'"><t t-set-slot="fallback">ME</t></Avatar>
    </div>
    <Typography variant="'muted'" className="'me-1'">Delivered</Typography>
  </div>
  <div class="d-flex align-items-end gap-2">
    <Avatar className="'flex-shrink-0'"><t t-set-slot="fallback">JL</t></Avatar>
    <Message side="'incoming'">Sounds good, keep me posted 🚀</Message>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Message` | `side` | `String` | optional |
| `Message` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="message">Message</div>
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
