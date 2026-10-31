# Radio Group

Native radio input or label wrapper.

## Nodex UI component

```js
import { RadioGroup, RadioGroupItem } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <RadioGroup value="'option-one'" className="'d-flex flex-column gap-2'">
    <RadioGroupItem value="'option-one'">Option One</RadioGroupItem>
    <RadioGroupItem value="'option-two'">Option Two</RadioGroupItem>
  </RadioGroup>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `RadioGroup` | `value` | `String` | optional |
| `RadioGroup` | `name` | `String` | optional |
| `RadioGroup` | `disabled` | `Boolean` | optional |
| `RadioGroup` | `className` | `String` | optional |
| `RadioGroup` | `onChange` | `Function` | optional |
| `RadioGroupItem` | `value` | `String` | required |
| `RadioGroupItem` | `disabled` | `Boolean` | optional |
| `RadioGroupItem` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<label b-ui="radio-group">
  <input type="radio" name="plan" checked>
  Starter
</label>
```

Accessibility: group radios with the same `name`; use a fieldset and legend for larger groups.
