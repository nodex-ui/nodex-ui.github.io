# Input Otp

Use `b-ui="input-otp"` for a CDN-ready input otp component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { InputOtp } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100 d-flex justify-content-center">
  <InputOtp length="6"/>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `InputOtp` | `length` | `Number` | optional |
| `InputOtp` | `value` | `String` | optional |
| `InputOtp` | `disabled` | `Boolean` | optional |
| `InputOtp` | `className` | `String` | optional |
| `InputOtp` | `onChange` | `Function` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="input-otp">Input Otp</div>
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
