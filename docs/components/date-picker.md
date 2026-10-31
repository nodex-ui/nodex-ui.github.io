# Date Picker

Use `b-ui="date-picker"` for a CDN-ready date picker component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { DatePicker } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100 d-flex flex-column gap-4">
  <DatePicker label="'Date of birth'" supportingText="'As on your ID'"/>
  <DatePicker label="'Start date'" errorText="'Pick a date'"/>
</div>
```

### Help tooltip (`useTip`)

Set `useTip="1"` to move `supportingText` into a tooltip: a question-mark icon appears right after the label, in the same label box, and the text shows on hover or focus. Error text still shows under the field.

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <DatePicker label="'Date of birth'" supportingText="'As on your ID'" useTip="1"/>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `DatePicker` | `value` | `String` | optional |
| `DatePicker` | `disabled` | `Boolean` | optional |
| `DatePicker` | `className` | `String` | optional |
| `DatePicker` | `onChange` | `Function` | optional |
| `DatePicker` | `label`, `labelBackground`, `supportingText`, `useTip`, `errorText`, `invalid` | `String` / `Boolean` | Material-style outlined field, same behaviour as [Input](/index.html#/docs/components/input): the label floats onto the border, `errorText` replaces `supportingText`. Also inherited from a parent `Field`. |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="date-picker">Date Picker</div>
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
