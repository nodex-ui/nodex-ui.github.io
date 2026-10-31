# Slider

## Nodex UI component

```js
import { Slider } from "nodexui";
```

```base-ui
<div style="width: 60%; max-width: 28rem">
  <Slider value="33" max="100" step="1"/>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Slider` | `value` | `Number | String` | optional |
| `Slider` | `min` | `Number | String` | optional |
| `Slider` | `max` | `Number | String` | optional |
| `Slider` | `step` | `Number | String` | optional |
| `Slider` | `disabled` | `Boolean` | optional |
| `Slider` | `className` | `String` | optional |
| `Slider` | `onChange` | `Function` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<input b-ui="slider" type="range" min="0" max="100" value="50">
```
