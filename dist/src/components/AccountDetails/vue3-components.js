import t from "./vue3-components2.js";
import { AccountDetailsEvent as y } from "./vue3-components2.js";
import { resolveComponent as o, openBlock as d, createElementBlock as r, createVNode as a } from "vue";
import "./vue3-components3.js";
import c from "../../../_virtual/vue3-components.js";
const p = { class: "account-details" };
function i(e, m, u, b, f, h) {
  const l = o("CloseButton"), n = o("Account"), s = o("AddressDisplay");
  return d(), r("div", p, [
    a(l, {
      class: "top-right",
      onClick: e.onClose
    }, null, 8, ["onClick"]),
    a(n, {
      ref: "account$",
      layout: "column",
      address: e.address,
      image: e.image,
      label: e.label && e.label !== e.address ? e.label : "",
      walletLabel: e.walletLabel,
      balance: e.balance,
      editable: e.editable,
      placeholder: e.placeholder,
      onChanged: e.onChanged
    }, null, 8, ["address", "image", "label", "walletLabel", "balance", "editable", "placeholder", "onChanged"]),
    a(s, {
      address: e.address,
      copyable: ""
    }, null, 8, ["address"])
  ]);
}
const $ = /* @__PURE__ */ c(t, [["render", i], ["__scopeId", "data-v-3f00a98b"]]);
export {
  y as AccountDetailsEvent,
  $ as default
};
//# sourceMappingURL=vue3-components.js.map
