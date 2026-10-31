# QR Card

A centred card with a QR code, a title and a description, built from the Card parts (`Card`, `CardBody`, `CardHeader`, `CardTitle`, `CardDescription`). Give it `qrContent` and it encodes the QR code itself, or pass a ready-made `matrix` from [`nodexui/qr`](../qr.md).

## Nodex UI component

```base-ui
<div style="max-width: 24rem">
  <QRCard
    qrContent="'https://nodex-ui.github.io'"
    label="'Connect device QR code'"
    title="'Scan to connect your mobile device'"
    description="'Open the Ledger mobile app and scan this code to link your device.'"/>
</div>
```

To control the error-correction level, build the matrix yourself with `qrMatrix()` and pass `matrix`:

```js
import { Component, QRCard, xml } from "nodexui";
import { qrMatrix } from "nodexui/qr";

class ConnectDevice extends Component {
  static components = { QRCard };
  static template = xml`
    <QRCard
      matrix="matrix"
      label="'Connect device QR code'"
      title="'Scan to connect your mobile device'"
      description="'Open the Ledger mobile app and scan this code to link your device.'"/>`;
  matrix = qrMatrix("https://example.com/connect?token=abc123", { ecc: "M" });
}
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `QRCard` | `matrix` | `Object` | optional, `{ size, isDark(row, col) }` from `qrMatrix()`; takes precedence over `qrContent`; nothing is drawn when both are omitted |
| `QRCard` | `qrContent` | `String` | optional, the content to encode (a URL, a VietQR payload, any text); used when `matrix` is not given |
| `QRCard` | `title` | `String` | optional, rendered as `CardTitle` |
| `QRCard` | `description` | `String` | optional, rendered as `CardDescription` |
| `QRCard` | `label` | `String` | optional, accessible name of the QR image (defaults to `title`, then "QR code") |
| `QRCard` | `className` | `String` | optional |
| `QRCard` | `style` | `String` or `Object` | optional |

The default slot renders after the header, e.g. for a button row. The code always sits on a white frame so it stays scannable in dark mode.

## Static component

```html
<div b-ui="qr-card">
  <div class="card-body b-qr-card-body">
    <div class="b-qr-card-frame">
      <!-- e.g. the SVG string returned by qrSvg() from nodexui/qr -->
      <svg class="b-qr-card-code" viewBox="0 0 21 21" role="img" aria-label="QR code">...</svg>
    </div>
  </div>
  <div class="card-header">
    <h3 class="card-title">Scan to connect your mobile device</h3>
    <p class="card-text text-body-secondary">Open the Ledger mobile app and scan this code to link your device.</p>
  </div>
</div>
```

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.
