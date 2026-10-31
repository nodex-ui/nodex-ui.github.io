# Input

Use `b-ui="input"` on a native input element.

## Nodex UI component

```js
import { Input } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Input type="'email'" placeholder="'Email'"/>
</div>
```

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Input label="'First name'" value="'Odette'" supportingText="'As on your ID'" leadingIcon="'user'"/>
</div>
```

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Input label="'Email'" value="'odette@'" errorText="'Enter a valid email'" leadingIcon="'mail'"/>
</div>
```

### Addons (`start` / `end` slots)

Put text, icons or buttons inside the field with the `start` and `end` slots. The text stays clear of them, and the label moves over for `start`.  Content can be plain text, an `Icon`, a `Kbd` or a `Button`. For a textarea, see the `footer` slot on [Textarea](/index.html#/docs/components/textarea).

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3 d-flex flex-column gap-4">
  <Input label="'Website'" placeholder="'example.com'">
    <t t-set-slot="start"><span>https://</span></t>
  </Input>
  <Input label="'Search'">
    <t t-set-slot="end"><Button size="'xs'">Search</Button></t>
  </Input>
</div>
```

### Help tooltip (`useTip`)

Set `useTip="1"` to move `supportingText` into a tooltip: a question-mark icon appears right after the label, in the same label box, and the text shows on hover or focus. Error text still shows under the field.

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Input label="'Email'" supportingText="'We only use it to send receipts'" useTip="1" leadingIcon="'mail'"/>
</div>
```

| Prop | Type | Notes |
| --- | --- | --- |
| `value` | `String` | controlled value; the component never mutates it itself |
| `label` | `String` | Material-style outlined field: label rests inside, floats onto the border when focused/filled (or when `placeholder` is set) |
| `labelBackground` | `String` | any CSS colour for the floated label's background (default matches the field, `--b-field-bg`); use it when the field sits on a surface of a different colour |
| `supportingText` | `String` | helper line under the field, linked via `aria-describedby` |
| `useTip` | `Number` | `0` (default) shows `supportingText` under the field; `1` hides it and shows it in a tooltip on a question-mark icon right after the label (error text still shows under the field) |
| `errorText` | `String` | marks the field invalid, replaces `supportingText`, swaps the trailing icon for an error icon, sets `aria-invalid` |
| slots `start` / `end` | slot | content drawn inside the box at the left/right edge (e.g. text, `Icon`, `Kbd`, `Button`); forces the outlined box even without a `label` |
| `leadingIcon` / `trailingIcon` | `String` | Lucide icon names (outlined mode only) |
| `maxLength` | `Number` | native limit; outlined mode also shows a `n/max` counter |
| `placeholder` | `String` | |
| `type` | `String` | native `<input type>` |
| `disabled` | `Boolean` | |
| `readonly` | `Boolean` | |
| `invalid` | `Boolean` | adds `is-invalid` |
| `className` | `String` | appended to the generated `form-control` class |
| `id` | `String` | forwarded to the rendered `<input>`, e.g. for `Label`'s `for` |
| `autocomplete` | `String` | forwarded to the rendered `<input>` |
| `ariaLabel` / `aria-label` | `String` | accessible name when there's no visible label |
| `min` / `max` / `step` | `String \| Number` | forwarded to the rendered `<input>`, for `type="number"`/date-like inputs |
| `list` | `String` | forwarded to the rendered `<input>`, pair with a `<datalist id="...">` for suggestions |
| `onInput` | `Function` | called as `(value, event)` on the native `input` event |
| `onChange` | `Function` | called as `(value, event)` on the native `change` event |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<input b-ui="input" type="email" placeholder="name@example.com">
```

Options: use the native `type`, `placeholder`, `disabled`, `readonly`, `required`, and validation attributes.

Accessibility: provide a visible label or an `aria-label` when the input is not paired with `b-ui="field"`.

## CDN install requirements

Load `nodexui.min.css` and `nodexui.min.js`.

## Enhanced usage

Input is a static component. It can be mounted by `thebase.mountAll()` with no extra JavaScript.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Input does not emit custom Nodex UI events. Use native `input` and `change` events.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-input`, `--b-border`, `--b-ring`, and `--b-radius`.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify default, disabled, readonly, invalid, focus, placeholder, light theme, and dark theme states.
