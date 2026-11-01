# Skeleton

Loading placeholder for content that is not ready yet.

## Nodex UI component

```js
import { Skeleton } from "nodexui";
```

```base-ui
<div class="d-flex align-items-center gap-3" style="max-width: 28rem">
  <div style="width: 3rem">
    <Skeleton shape="'circle'"/>
  </div>
  <div class="d-flex flex-column gap-2">
    <div style="width: 250px">
      <Skeleton/>
    </div>
    <div style="width: 200px">
      <Skeleton/>
    </div>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Skeleton` | `shape` | `String` | optional |
| `Skeleton` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<span b-ui="skeleton" style="width: 12rem"></span>
<span b-ui="skeleton" b-att-shape="circle" style="width: 2rem"></span>
```

Options: `b-att-shape="block|circle"`.

Accessibility: skeletons are hidden from assistive technology by default; pair the loading region with status text when needed.
