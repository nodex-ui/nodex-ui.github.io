# Switch

Checkbox-backed switch control using `role="switch"`.

## Nodex UI component

```js
import { Switch } from "nodexui";
```

```base-ui
<div class="d-flex align-items-center gap-2" style="max-width: 28rem">
  <Switch>Airplane Mode</Switch>
</div>
```

### Help tooltip (`useTip`)

```base-ui
<div class="d-flex flex-column gap-3" style="max-width: 28rem">
  <Switch supportingText="'Turns off all wireless radios'">Airplane Mode</Switch>
  <Switch supportingText="'Turns off all wireless radios'" useTip="1">Airplane Mode</Switch>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Switch` | `checked` | `Boolean` | optional |
| `Switch` | `disabled` | `Boolean` | optional |
| `Switch` | `supportingText` | `String` | optional helper text shown under the label |
| `Switch` | `useTip` | `Number` | `1` moves `supportingText` into a tooltip on a question-mark icon right after the label |
| `Switch` | `className` | `String` | optional |
| `Switch` | `onChange` | `Function` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<label b-ui="switch">
  <input type="checkbox" role="switch">
  Auto-save
</label>
```

Accessibility: keep the native checkbox input and use clear on/off labeling.
