# Label

Form label with consistent spacing and optional required marker.

## Nodex UI component

```js
import { Label } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <div class="d-flex align-items-center gap-2">
    <Checkbox/>
    <Label for="'terms'">Accept terms and conditions</Label>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Label` | `for` | `String` | optional |
| `Label` | `required` | `Boolean` | optional |
| `Label` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<label b-ui="label" b-att-required="true" for="email">Email</label>
```

Options: `b-att-required="true"`.

Accessibility: use `for` with the matching control `id`.
