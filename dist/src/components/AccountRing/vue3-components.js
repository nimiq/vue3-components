import r from "./vue3-components2.js";
import { resolveComponent as a, openBlock as s, createElementBlock as n, Fragment as c, renderList as d, createElementVNode as i, createVNode as l, normalizeClass as p } from "vue";
import "./vue3-components3.js";
import m from "../../../_virtual/vue3-components.js";
const _ = { class: "account-ring" };
function u(e, f, g, v, $, h) {
  const t = a("Identicon");
  return s(), n("div", _, [
    (s(), n(c, null, d(6, (o) => i("div", {
      class: "account",
      key: o
    }, [
      l(t, {
        address: e.addresses[o - 1],
        class: p({ "pop-in": e.animate && e.addresses.length >= o })
      }, null, 8, ["address", "class"])
    ])), 64))
  ]);
}
const E = /* @__PURE__ */ m(r, [["render", u], ["__scopeId", "data-v-9365ed09"]]);
export {
  E as default
};
//# sourceMappingURL=vue3-components.js.map
