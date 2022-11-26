import a from "./vue3-components2.js";
import { openBlock as t, createBlock as p, resolveDynamicComponent as c, withCtx as n, createElementBlock as s, Fragment as d, renderList as i, createTextVNode as l, toDisplayString as m, pushScopeId as u, popScopeId as _, createElementVNode as f } from "vue";
import "./vue3-components3.js";
import h from "../../../_virtual/vue3-components.js";
const y = (e) => (u("data-v-51e3bdc9"), e = e(), _(), e), k = /* @__PURE__ */ y(() => /* @__PURE__ */ f("span", { class: "space" }, "\xA0", -1));
function x(e, b, v, C, I, S) {
  return t(), p(c(e.copyable ? "Copyable" : "div"), {
    text: e.chunks.join(" ").toUpperCase(),
    class: "address-display"
  }, {
    default: n(() => [
      (t(!0), s(d, null, i(e.chunks, (o, r) => (t(), s("span", {
        class: "chunk",
        key: o + r
      }, [
        l(m(o), 1),
        k
      ]))), 128))
    ]),
    _: 1
  }, 8, ["text"]);
}
const w = /* @__PURE__ */ h(a, [["render", x], ["__scopeId", "data-v-51e3bdc9"]]);
export {
  w as default
};
//# sourceMappingURL=vue3-components.js.map
