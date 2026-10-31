# Bubble

## Nodex UI component

```js
import { Bubble } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-3 w-100" style="max-width: 28rem">
  <div class="d-flex justify-content-start">
    <Bubble>Hey there! what's up?</Bubble>
  </div>
  <div class="d-flex justify-content-end">
    <Bubble side="'outgoing'">Hey! Want to see chat bubbles?</Bubble>
  </div>
  <div class="d-flex flex-column align-items-start gap-1">
    <Bubble>I can group messages, switch sides, and keep the whole thread easy to scan.</Bubble>
    <div class="d-flex gap-1">
      <Badge variant="'outline'" pill="true">👍</Badge>
    </div>
  </div>
  <div class="d-flex justify-content-end">
    <Bubble side="'outgoing'">Sure. Hit me with your best demo.</Bubble>
  </div>
  <div class="d-flex flex-column align-items-start gap-1">
    <Bubble>Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.</Bubble>
    <div class="d-flex gap-1">
      <Badge variant="'outline'" pill="true">👍</Badge>
      <Badge variant="'outline'" pill="true">🔥</Badge>
      <Badge variant="'outline'" pill="true">👀</Badge>
      <Badge variant="'outline'" pill="true">+2</Badge>
    </div>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Bubble` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="bubble">Incoming message</div>
<div b-ui="bubble" b-att-side="outgoing">Outgoing message</div>
```
