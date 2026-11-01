# Native Select

Browser-native select control with standard styling.

## Nodex UI component

```js
import { NativeSelect } from "nodexui";
```

```base-ui
<div class="d-grid w-100 gap-2" style="max-width: 24rem">
  <NativeSelect label="'Fruit'">
    <option value="'apple'">Apple</option>
    <option value="'banana'">Banana</option>
    <option value="'blueberry'">Blueberry</option>
    <option value="'pineapple'">Pineapple</option>
  </NativeSelect>
</div>
```

### Help tooltip (`useTip`)

Set `useTip="1"` to move `supportingText` into a tooltip: a question-mark icon appears right after the label, in the same label box, and the text shows on hover or focus. Error text still shows under the field.

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <NativeSelect label="'Fruit'" supportingText="'Shown on your order'" useTip="1">
    <option value="'apple'">Apple</option>
    <option value="'banana'">Banana</option>
  </NativeSelect>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `NativeSelect` | `value` | `String` | optional |
| `NativeSelect` | `size` | `String` | optional |
| `NativeSelect` | `disabled` | `Boolean` | optional |
| `NativeSelect` | `className` | `String` | optional |
| `NativeSelect` | `ariaLabel` / `aria-label` | `String` | optional, accessible name for the control |
| `NativeSelect` | `id` | `String` | optional, e.g. for `Label`'s `for` |
| `NativeSelect` | `onChange` | `Function` | optional |
| `NativeSelect` | `label`, `labelBackground`, `supportingText`, `useTip`, `errorText`, `invalid` | `String` / `Boolean` | Material-style outlined field, same behaviour as [Input](/examples/blocks.html#/docs/components/input): the label floats onto the border, `errorText` replaces `supportingText`. Also inherited from a parent `Field`. |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<select b-ui="native-select" id="role">
  <option>Owner</option>
  <option>Viewer</option>
</select>
```

Options: `b-att-size="sm|lg"`.

Accessibility: keep a visible label and avoid replacing native keyboard behavior.
