# Select

## Nodex UI component

```js
import { Select, SelectContent, SelectItem, SelectTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 240px">
  <Select label="'Theme'" value="'dark'">
    <SelectTrigger>Dark</SelectTrigger>
    <SelectContent>
      <SelectItem value="'light'">Light</SelectItem>
      <SelectItem value="'dark'">Dark</SelectItem>
      <SelectItem value="'system'">System</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Help tooltip (`useTip`)

Set `useTip="1"` to move `supportingText` into a tooltip: a question-mark icon appears right after the label, in the same label box, and the text shows on hover or focus. Error text still shows under the field.

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Select label="'Theme'" value="'dark'" supportingText="'Applies to this device only'" useTip="1">
    <SelectTrigger>Dark</SelectTrigger>
    <SelectContent>
      <SelectItem value="'light'">Light</SelectItem>
      <SelectItem value="'dark'">Dark</SelectItem>
    </SelectContent>
  </Select>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Select` | `value` | `String` | optional |
| `Select` | `onChange` | `Function` | optional |
| `Select` | `className` | `String` | optional |
| `Select` | `label`, `labelBackground`, `supportingText`, `useTip`, `errorText`, `invalid` | `String` / `Boolean` | Material-style outlined field, same behaviour as [Input](/index.html#/docs/components/input): the label floats onto the border, `errorText` replaces `supportingText`. Also inherited from a parent `Field`. |
| `SelectContent` | `className` | `String` | optional |
| `SelectItem` | `value` | `String` | required |
| `SelectItem` | `className` | `String` | optional |
| `SelectTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="select">
  <button b-select-trigger type="button">
    <span b-select-value>Owner</span>
  </button>
  <div b-select-content>
    <div b-select-item b-att-value="owner">Owner</div>
    <div b-select-item b-att-value="editor">Editor</div>
  </div>
</div>
```
