# Marker

## Nodex UI component

```js
import { Marker } from "nodexui";
```

```base-ui
<div style="max-width: 28rem">
  <Marker>
    <Icon name="'git-branch'" class="'me-1'"/>
    Switched to a new branch
  </Marker>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Marker` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<span b-ui="marker">Beta</span>
<span b-ui="marker" b-att-variant="destructive">Issue</span>
```
