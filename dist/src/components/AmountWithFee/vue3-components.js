import f from "./vue3-components2.js";
import { AmountWithFeeEvent as z } from "./vue3-components2.js";
import { resolveComponent as s, openBlock as o, createElementBlock as t, createVNode as a, normalizeClass as p, createElementVNode as A, renderSlot as v, createTextVNode as n, toDisplayString as m, createCommentVNode as l } from "vue";
import "./vue3-components3.js";
import V from "../../../_virtual/vue3-components.js";
const _ = { class: "amount-with-fee" }, y = { class: "fee-section nq-text-s" }, h = {
  key: 0,
  class: "nq-red"
}, $ = { key: 1 }, k = {
  key: 0,
  class: "fiat"
}, C = {
  key: 1,
  class: "fee"
};
function I(e, i, F, N, D, E) {
  const u = s("AmountInput"), r = s("FiatAmount"), c = s("Amount");
  return o(), t("div", _, [
    a(u, {
      class: p(["value", { invalid: !e.isValid && e.liveAmount > 0 }]),
      modelValue: e.liveAmount,
      "onUpdate:modelValue": i[0] || (i[0] = (d) => e.liveAmount = d),
      ref: "amountInput$"
    }, null, 8, ["modelValue", "class"]),
    A("div", y, [
      !e.isValid && e.liveAmount ? (o(), t("div", h, [
        v(e.$slots, "insufficient-balance-error", {}, () => [
          n(m(e.$t("Insufficient balance")), 1)
        ], !0)
      ])) : (o(), t("div", $, [
        e.fiatAmount && e.fiatCurrency ? (o(), t("span", k, [
          n(" ~"),
          a(r, {
            amount: e.fiatAmount,
            currency: e.fiatCurrency
          }, null, 8, ["amount", "currency"])
        ])) : l("", !0),
        e.modelValue.fee ? (o(), t("span", C, [
          n(" + "),
          a(c, {
            amount: e.modelValue.fee,
            minDecimals: 0,
            maxDecimals: 5
          }, null, 8, ["amount"]),
          n(" " + m(e.$t("fee")), 1)
        ])) : l("", !0)
      ]))
    ])
  ]);
}
const W = /* @__PURE__ */ V(f, [["render", I], ["__scopeId", "data-v-3554c7c4"]]);
export {
  z as AmountWithFeeEvent,
  W as default
};
//# sourceMappingURL=vue3-components.js.map
