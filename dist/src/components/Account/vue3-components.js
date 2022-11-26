import p from "./vue3-components2.js";
import { AccountEvent as z, AccountLayout as D } from "./vue3-components2.js";
import { resolveComponent as o, openBlock as a, createElementBlock as l, normalizeClass as s, createElementVNode as u, createBlock as d, createCommentVNode as n, toDisplayString as i, createVNode as v, createStaticVNode as h } from "vue";
import "./vue3-components3.js";
import b from "../../../_virtual/vue3-components.js";
const k = { class: "identicon-and-label" }, f = ["src"], y = {
  key: 1,
  class: "identicon"
}, w = /* @__PURE__ */ h('<div class="nq-blue-bg" data-v-404555aa><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="white" stroke-linecap="round" stroke-width="2.5" data-v-404555aa><path d="M40.25 23.25v-.5a6.5 6.5 0 0 0-6.5-6.5h-3.5a6.5 6.5 0 0 0-6.5 6.5v6.5a6.5 6.5 0 0 0 6.5 6.5h2" data-v-404555aa></path><path d="M23.75 40.75v.5a6.5 6.5 0 0 0 6.5 6.5h3.5a6.5 6.5 0 0 0 6.5-6.5v-6.5a6.5 6.5 0 0 0-6.5-6.5h-2" data-v-404555aa></path><path d="M32 11.25v4M32 48.75v4" data-v-404555aa></path></svg></div>', 1), g = [
  w
], A = {
  key: 5,
  class: "nq-label wallet-label"
};
function I(e, t, L, N, V, $) {
  const r = o("Identicon"), c = o("LabelInput"), m = o("Amount");
  return a(), l("div", {
    class: s(["account", [{ editable: e.editable }, e.layout, { cashlink: e.displayAsCashlink }]])
  }, [
    u("div", k, [
      e.showImage ? (a(), l("img", {
        key: 0,
        class: "identicon account-image",
        src: e.image,
        onError: t[0] || (t[0] = (q) => e.showImage = !1)
      }, null, 40, f)) : e.displayAsCashlink ? (a(), l("div", y, g)) : e.isNimiqAddress() ? (a(), d(r, {
        key: 2,
        address: e.address
      }, null, 8, ["address"])) : n("", !0),
      e.editable ? (a(), l("div", {
        key: 4,
        class: s(["label editable", { "address-font": e.isLabelNimiqAddress() }])
      }, [
        v(c, {
          ref: "label$",
          maxBytes: 63,
          value: e.label,
          placeholder: e.placeholder,
          "onUpdate:modelValue": e.onModelValueUpdate
        }, null, 8, ["value", "placeholder", "onUpdate:modelValue"])
      ], 2)) : (a(), l("div", {
        key: 3,
        class: s(["label", { "address-font": e.isLabelNimiqAddress() }])
      }, i(e.label), 3)),
      e.layout === "column" && e.walletLabel ? (a(), l("div", A, i(e.walletLabel), 1)) : n("", !0)
    ]),
    e.balance || e.balance === 0 ? (a(), d(m, {
      key: 0,
      class: "balance",
      amount: e.balance,
      decimals: e.decimals
    }, null, 8, ["amount", "decimals"])) : n("", !0)
  ], 2);
}
const U = /* @__PURE__ */ b(p, [["render", I], ["__scopeId", "data-v-404555aa"]]);
export {
  z as AccountEvent,
  D as AccountLayout,
  U as default
};
//# sourceMappingURL=vue3-components.js.map
