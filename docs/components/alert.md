# Alert

## Nodex UI component

```js
import { Alert, AlertAction, AlertDescription, AlertTitle, Button, Icon } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-3 w-100" style="max-width: 28rem">
  <Alert>
    <Icon name="'circle-check-big'"/>
    <AlertTitle>Payment successful</AlertTitle>
    <AlertDescription>Your payment of $29.99 has been processed. A receipt has been sent to your email address.</AlertDescription>
  </Alert>
  <Alert>
    <Icon name="'info'"/>
    <AlertTitle>New feature available</AlertTitle>
    <AlertDescription>We've added dark mode support. You can enable it in your account settings.</AlertDescription>
  </Alert>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Alert` | `variant` | `String` | optional |
| `Alert` | `dismissible` | `Boolean` | optional; renders a built-in close button that fades and removes the alert |
| `Alert` | `className` | `String` | optional |
| `AlertTitle` | `className` | `String` | optional |
| `AlertDescription` | `className` | `String` | optional |
| `AlertAction` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="alert">Heads up!</div>
<div b-ui="alert" b-att-variant="destructive">Payment failed.</div>
```

Options: `b-att-variant="default|destructive"`, `b-att-dismissible="true"`. Legacy aliases `info|success|warning|danger` are still supported for existing markup.

Alerts receive built-in alert classes and a default `role="alert"`. Alerts lay out as a grid — putting an icon (`b-ui="icon"`/`<Icon>`) as the first child shifts the title/description into a second column automatically.

Setting `b-att-dismissible` appends a built-in close button (`<button class="btn-close" data-bs-dismiss="alert">`) if one isn't already present and instantiates `bootstrap.Alert` so clicking it fades out and removes the alert from the DOM.
