# Aspect Ratio

## Nodex UI component

```js
import { AspectRatio } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <AspectRatio ratio="'16 / 9'">
    <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&amp;dpr=2&amp;q=80" alt="Image" class="rounded w-100 h-100" style="object-fit: cover"/>
  </AspectRatio>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `AspectRatio` | `ratio` | `String` | optional |
| `AspectRatio` | `width` | `Number` | optional |
| `AspectRatio` | `height` | `Number` | optional |
| `AspectRatio` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="aspect-ratio" b-att-ratio="16 / 9">
  <div class="d-flex h-100 align-items-center justify-content-center bg-body-tertiary text-body-secondary">
    16:9 preview
  </div>
</div>
```
