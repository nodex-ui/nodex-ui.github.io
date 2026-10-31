# QR

Nodex UI ships a standalone QR service: a QR code generator and the VietQR (Napas/EMV) payment payload builder. It wraps [`@thebeanfamily/vietqr`](https://www.npmjs.com/package/@thebeanfamily/vietqr), which bundles `qrcode.js` and `vietqr.js`, and needs no other Nodex UI file (no Owl, no Bootstrap).

```js
import { buildVietQr, qrSvg } from "nodexui/qr";

const payload = buildVietQr({ bank: "970436", account: "0123456789", holder: "Nguyen Van A", amount: 50000, dynamic: true });
document.querySelector("#qr").innerHTML = qrSvg(payload, { ecc: "M", margin: 2, label: "VietQR" });
```

```html
<!-- ES module from the CDN (or map it as "nodexui/qr" in an import map) -->
<script type="module">
  import { qrSvg } from "https://cdn.jsdelivr.net/npm/nodexui@1.3.1/dist/nodexui.qr.esm.js";
</script>

<!-- Classic script tag: sets window.thebase.qr -->
<script src="https://cdn.jsdelivr.net/npm/nodexui@1.3.1/dist/nodexui.qr.min.js"></script>
```

Types ship as `dist/types/qr.d.ts`.

## API

| Export | What it does |
| --- | --- |
| `qrSvg(text, options?)` | Standalone SVG string. Options: `ecc` (`"L"`, `"M"`, `"Q"`, `"H"`; default `"M"`), `fg`, `bg`, `transparent`, `margin` (modules), `label` (adds `role="img"` and `aria-label`). Throws if the text does not fit a QR code. |
| `qrMatrix(text, { ecc })` | `{ size, isDark(row, col) }` for custom renderers (canvas, PNG, ...). |
| `buildVietQr({ bank, account, holder, amount, purpose, dynamic })` | VietQR payment string. `bank` is the bank BIN, `amount` is VND, `dynamic` marks a single-use code. Accents in `holder` and `purpose` are removed. |
| `stripAccents(text)` | Removes Vietnamese accents. |
| `qrcode`, `VIETQR`, `SERVICE_CODE`, `CURRENCY` | Low-level objects from `@thebeanfamily/vietqr`. `qrcode` is the `qrcode(typeNumber, ecc)` generator with UTF-8 already enabled. |

Text is encoded as UTF-8, so Vietnamese text scans correctly.

See [Blocks → Examples → QR code](/index.html#/blocks/qr) (`components/qr-demo/`) for a working page, plus the `emvhub` QR tool and `qr-page` app.
