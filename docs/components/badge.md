# Badge

Small status label for counts, states, and metadata.

## Nodex UI component

```js
import { Badge } from "nodexui";
```

```base-ui
<div class="d-flex gap-2" style="max-width: 28rem">
  <Badge variant="'primary'">Default</Badge>
  <Badge variant="'secondary'">Secondary</Badge>
  <Badge variant="'danger'">Destructive</Badge>
  <Badge variant="'muted'">Outline</Badge>
</div>
```

| Prop | Type | Notes |
| --- | --- | --- |
| `variant` | `String` | `primary` \| `secondary` (default) \| `success` \| `warning` \| `danger` \| `info` \| `muted` |
| `pill` | `Boolean` | adds `rounded-pill` |
| `label` | `String` | alternative to default-slot children |
| `className` | `String` | appended to the generated `badge ...` classes |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<span b-ui="badge" b-att-variant="primary">New</span>
<span b-ui="badge" b-att-variant="muted" b-att-pill="true">Draft</span>
```

Options: `b-att-variant="primary|secondary|success|warning|danger|info|muted"`, `b-att-pill="true"`.

Accessibility: badges are static text by default; add visually hidden context when a badge contains only a number.
