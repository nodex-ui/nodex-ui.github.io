import { Component, Input, Label, markup, useState } from "nodexui";
import { buildVietQr, qrSvg } from "nodexui/qr";

/** Draws a QR code as SVG markup; text the QR format cannot hold gives an empty preview. */
function safeQrSvg(text, label) {
  try {
    return markup(qrSvg(text, { ecc: "M", margin: 2, label }));
  } catch {
    return "";
  }
}

/** Sample page for the QR service: a free-text QR code and a VietQR bank-transfer code that redraw as you type. */
export class QrDemo extends Component {
  static components = { Input, Label };
  static template = "examples.QrDemo";

  setup() {
    this.state = useState({ text: "https://nodex-ui.github.io", account: "0123456789", amount: "50000" });
  }

  get textQr() {
    return safeQrSvg(this.state.text, "QR code");
  }

  /** The VietQR payload built from the account and amount fields; an empty amount makes a static (reusable) code. */
  get vietQrPayload() {
    const { account, amount } = this.state;
    return buildVietQr({ bank: "970436", account, holder: "Nguyen Van A", amount: Number(amount) || 0, dynamic: Boolean(amount) });
  }

  get vietQr() {
    return safeQrSvg(this.vietQrPayload, "VietQR");
  }
}
