import d from "../../@vite/vue3-components.js";
import { ref as L } from "vue";
import { d as g } from './../../modules/@nimiq/utils/dist/module/vue3-components3.js';
const m = "en", l = [
  m,
  "de",
  "es",
  "fr",
  "nl",
  "pt",
  "ru",
  "uk",
  "zh"
], e = L(a()), i = {}, A = [];
function y(o) {
  if (l.includes(o) || (o = m), o !== e.value) {
    e.value = o;
    for (const n of Object.keys(A))
      u(n);
  }
}
function a() {
  let t = g.getCookie("lang") || "en";
  return l.includes(t) || (t = m), t;
}
async function u(o) {
  const n = e.value + "-" + o;
  if (!(n in i) && e.value !== "en") {
    const t = await d(/* @__PURE__ */ Object.assign({ "./de/AccountList.json": () => import("./de/vue3-components.js"), "./de/AccountSelector.json": () => import("./de/vue3-components2.js"), "./de/AmountWithFee.json": () => import("./de/vue3-components3.js"), "./de/Copyable.json": () => import("./de/vue3-components4.js"), "./de/CopyableField.json": () => import("./de/vue3-components5.js"), "./de/LabelInput.json": () => import("./de/vue3-components6.js"), "./de/LongPressButton.json": () => import("./de/vue3-components7.js"), "./de/PageHeader.json": () => import("./de/vue3-components8.js"), "./de/PaymentInfoLine.json": () => import("./de/vue3-components9.js"), "./de/QrScanner.json": () => import("./de/vue3-components10.js"), "./de/Timer.json": () => import("./de/vue3-components11.js"), "./de/Wallet.json": () => import("./de/vue3-components12.js"), "./es/AccountList.json": () => import("./es/vue3-components.js"), "./es/AccountSelector.json": () => import("./es/vue3-components2.js"), "./es/AmountWithFee.json": () => import("./es/vue3-components3.js"), "./es/Copyable.json": () => import("./es/vue3-components4.js"), "./es/CopyableField.json": () => import("./es/vue3-components5.js"), "./es/LabelInput.json": () => import("./es/vue3-components6.js"), "./es/LongPressButton.json": () => import("./es/vue3-components7.js"), "./es/PageHeader.json": () => import("./es/vue3-components8.js"), "./es/PaymentInfoLine.json": () => import("./es/vue3-components9.js"), "./es/QrScanner.json": () => import("./es/vue3-components10.js"), "./es/Timer.json": () => import("./es/vue3-components11.js"), "./es/Wallet.json": () => import("./es/vue3-components12.js"), "./fil/AccountList.json": () => import("./fil/vue3-components.js"), "./fil/AccountSelector.json": () => import("./fil/vue3-components2.js"), "./fil/AmountWithFee.json": () => import("./fil/vue3-components3.js"), "./fil/Copyable.json": () => import("./fil/vue3-components4.js"), "./fil/CopyableField.json": () => import("./fil/vue3-components5.js"), "./fil/LabelInput.json": () => import("./fil/vue3-components6.js"), "./fil/LongPressButton.json": () => import("./fil/vue3-components7.js"), "./fil/PageHeader.json": () => import("./fil/vue3-components8.js"), "./fil/PaymentInfoLine.json": () => import("./fil/vue3-components9.js"), "./fil/QrScanner.json": () => import("./fil/vue3-components10.js"), "./fil/Timer.json": () => import("./fil/vue3-components11.js"), "./fil/Wallet.json": () => import("./fil/vue3-components12.js"), "./fr/AccountList.json": () => import("./fr/vue3-components.js"), "./fr/AccountSelector.json": () => import("./fr/vue3-components2.js"), "./fr/AmountWithFee.json": () => import("./fr/vue3-components3.js"), "./fr/Copyable.json": () => import("./fr/vue3-components4.js"), "./fr/CopyableField.json": () => import("./fr/vue3-components5.js"), "./fr/LabelInput.json": () => import("./fr/vue3-components6.js"), "./fr/LongPressButton.json": () => import("./fr/vue3-components7.js"), "./fr/PageHeader.json": () => import("./fr/vue3-components8.js"), "./fr/PaymentInfoLine.json": () => import("./fr/vue3-components9.js"), "./fr/QrScanner.json": () => import("./fr/vue3-components10.js"), "./fr/Timer.json": () => import("./fr/vue3-components11.js"), "./fr/Wallet.json": () => import("./fr/vue3-components12.js"), "./nl/AccountList.json": () => import("./nl/vue3-components.js"), "./nl/AccountSelector.json": () => import("./nl/vue3-components2.js"), "./nl/AmountWithFee.json": () => import("./nl/vue3-components3.js"), "./nl/Copyable.json": () => import("./nl/vue3-components4.js"), "./nl/CopyableField.json": () => import("./nl/vue3-components5.js"), "./nl/LabelInput.json": () => import("./nl/vue3-components6.js"), "./nl/LongPressButton.json": () => import("./nl/vue3-components7.js"), "./nl/PageHeader.json": () => import("./nl/vue3-components8.js"), "./nl/PaymentInfoLine.json": () => import("./nl/vue3-components9.js"), "./nl/QrScanner.json": () => import("./nl/vue3-components10.js"), "./nl/Timer.json": () => import("./nl/vue3-components11.js"), "./nl/Wallet.json": () => import("./nl/vue3-components12.js"), "./pt/AccountList.json": () => import("./pt/vue3-components.js"), "./pt/AccountSelector.json": () => import("./pt/vue3-components2.js"), "./pt/AmountWithFee.json": () => import("./pt/vue3-components3.js"), "./pt/Copyable.json": () => import("./pt/vue3-components4.js"), "./pt/CopyableField.json": () => import("./pt/vue3-components5.js"), "./pt/LabelInput.json": () => import("./pt/vue3-components6.js"), "./pt/LongPressButton.json": () => import("./pt/vue3-components7.js"), "./pt/PageHeader.json": () => import("./pt/vue3-components8.js"), "./pt/PaymentInfoLine.json": () => import("./pt/vue3-components9.js"), "./pt/QrScanner.json": () => import("./pt/vue3-components10.js"), "./pt/Timer.json": () => import("./pt/vue3-components11.js"), "./pt/Wallet.json": () => import("./pt/vue3-components12.js"), "./ru/AccountList.json": () => import("./ru/vue3-components.js"), "./ru/AccountSelector.json": () => import("./ru/vue3-components2.js"), "./ru/AmountWithFee.json": () => import("./ru/vue3-components3.js"), "./ru/Copyable.json": () => import("./ru/vue3-components4.js"), "./ru/CopyableField.json": () => import("./ru/vue3-components5.js"), "./ru/LabelInput.json": () => import("./ru/vue3-components6.js"), "./ru/LongPressButton.json": () => import("./ru/vue3-components7.js"), "./ru/PageHeader.json": () => import("./ru/vue3-components8.js"), "./ru/PaymentInfoLine.json": () => import("./ru/vue3-components9.js"), "./ru/QrScanner.json": () => import("./ru/vue3-components10.js"), "./ru/Timer.json": () => import("./ru/vue3-components11.js"), "./ru/Wallet.json": () => import("./ru/vue3-components12.js"), "./uk/AccountList.json": () => import("./uk/vue3-components.js"), "./uk/AccountSelector.json": () => import("./uk/vue3-components2.js"), "./uk/AmountWithFee.json": () => import("./uk/vue3-components3.js"), "./uk/Copyable.json": () => import("./uk/vue3-components4.js"), "./uk/CopyableField.json": () => import("./uk/vue3-components5.js"), "./uk/LabelInput.json": () => import("./uk/vue3-components6.js"), "./uk/LongPressButton.json": () => import("./uk/vue3-components7.js"), "./uk/PageHeader.json": () => import("./uk/vue3-components8.js"), "./uk/PaymentInfoLine.json": () => import("./uk/vue3-components9.js"), "./uk/QrScanner.json": () => import("./uk/vue3-components10.js"), "./uk/Timer.json": () => import("./uk/vue3-components11.js"), "./uk/Wallet.json": () => import("./uk/vue3-components12.js"), "./zh/AccountList.json": () => import("./zh/vue3-components.js"), "./zh/AccountSelector.json": () => import("./zh/vue3-components2.js"), "./zh/AmountWithFee.json": () => import("./zh/vue3-components3.js"), "./zh/Copyable.json": () => import("./zh/vue3-components4.js"), "./zh/CopyableField.json": () => import("./zh/vue3-components5.js"), "./zh/LabelInput.json": () => import("./zh/vue3-components6.js"), "./zh/LongPressButton.json": () => import("./zh/vue3-components7.js"), "./zh/PageHeader.json": () => import("./zh/vue3-components8.js"), "./zh/PaymentInfoLine.json": () => import("./zh/vue3-components9.js"), "./zh/QrScanner.json": () => import("./zh/vue3-components10.js"), "./zh/Timer.json": () => import("./zh/vue3-components11.js"), "./zh/Wallet.json": () => import("./zh/vue3-components12.js") }), `./${e.value}/${o}.json`);
    i[n] = t.default || {};
  }
}
function b(o, n, t, r) {
  let s;
  typeof t == "string" ? s = t : (s = e.value, r = t);
  const j = `${s}-${o}`;
  let p = i[j] && i[j][n] || n;
  return (typeof r == "object" || Array.isArray(r)) && (p = p.replace(/{(\w+?)}/g, (c, f) => r[f].toString() || c)), p;
}
function I(o) {
  return u(o), b.bind(void 0, o);
}
window.addEventListener("focus", () => y(a()));
export {
  b as $t,
  a as detectLanguage,
  I as loadI18n,
  y as setLanguage
};
//# sourceMappingURL=vue3-components.js.map
