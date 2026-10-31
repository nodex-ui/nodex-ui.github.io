// Sample page for the standalone QR service: no Owl or component library is loaded.
// Run `npm run dev` and open /qr/.
import { buildVietQr, qrSvg } from "nodexui/qr";

const text = document.getElementById("text");
const account = document.getElementById("account");
const amount = document.getElementById("amount");

// Draws the free-text QR code; text the QR format cannot hold simply clears the preview.
function renderText() {
  try {
    document.getElementById("qr").innerHTML = qrSvg(text.value, { ecc: "M", margin: 2, label: "QR code" });
  } catch {
    document.getElementById("qr").innerHTML = "";
  }
}

// Builds a VietQR bank-transfer payload and draws it as a QR code.
function renderVietQr() {
  const payload = buildVietQr({ bank: "970436", account: account.value, holder: "Nguyen Van A", amount: Number(amount.value) || 0, dynamic: Boolean(amount.value) });
  document.getElementById("payload").textContent = payload;
  document.getElementById("vietqr").innerHTML = qrSvg(payload, { ecc: "M", margin: 2, label: "VietQR" });
}

text.addEventListener("input", renderText);
account.addEventListener("input", renderVietQr);
amount.addEventListener("input", renderVietQr);
renderText();
renderVietQr();
