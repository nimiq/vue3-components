import t from "./vue3-components2.js";
import { amountValidator as h } from "./vue3-components2.js";
import { openBlock as a, createElementBlock as p, normalizeClass as r, createTextVNode as n, toDisplayString as e, createElementVNode as s } from "vue";
import "./vue3-components3.js";
import m from "../../../_virtual/vue3-components.js";
function c(o, i, l, d, f, u) {
  return a(), p("span", {
    class: r(["amount", { approx: o.showApprox && o.isApprox }])
  }, [
    n(e(o.formattedAmount) + " ", 1),
    s("span", {
      class: r(["currency", o.currency])
    }, e(o.ticker), 3)
  ], 2);
}
const x = /* @__PURE__ */ m(t, [["render", c], ["__scopeId", "data-v-3134b609"]]);
export {
  h as amountValidator,
  x as default
};
//# sourceMappingURL=vue3-components.js.map
