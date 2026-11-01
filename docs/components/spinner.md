# Spinner

Inline loading indicator using built-in spinner classes.

## Nodex UI component

```js
import { Spinner } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Item className="'d-flex align-items-center gap-2'">
    <Spinner/>
    <span>Processing payment...</span>
    <span class="ms-auto text-muted">$100.00</span>
  </Item>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Spinner` | `type` | `String` | optional |
| `Spinner` | `label` | `String` | optional |
| `Spinner` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<span b-ui="spinner" b-att-label="Loading"></span>
<span b-ui="spinner" b-att-type="grow"></span>
```

Options: `b-att-type="border|grow"`, `b-att-label`.

Accessibility: Nodex UI adds `role="status"` and hidden loading text.
