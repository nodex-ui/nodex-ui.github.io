# Checkbox

Native checkbox input or label wrapper.

## Nodex UI component

```js
import { Checkbox } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100 d-flex align-items-center gap-2">
  <Checkbox className="'me-1'">Accept terms and conditions</Checkbox>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Checkbox` | `checked` | `Boolean` | optional |
| `Checkbox` | `disabled` | `Boolean` | optional |
| `Checkbox` | `className` | `String` | optional |
| `Checkbox` | `id` | `String` | optional, e.g. for `Label`'s `for` |
| `Checkbox` | `onChange` | `Function` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<label b-ui="checkbox">
  <input type="checkbox" checked>
  Receive updates
</label>
```

Accessibility: use the native `checked`, `disabled`, and `required` attributes.
