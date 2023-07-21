import o from "./vue3-components2.js";
import { openBlock as t, createBlock as n, resolveDynamicComponent as c, normalizeClass as p, withCtx as l, createElementBlock as a, Fragment as i, renderList as d, createTextVNode as m, toDisplayString as f, createCommentVNode as u } from "vue";
import "./vue3-components3.js";
import y from "../../../_virtual/vue3-components.js";
const _ = {
  key: 0,
  class: "space"
};
function k(e, h, C, $, x, g) {
  return t(), n(c(e.copyable ? "Copyable" : "div"), {
    text: e.text,
    class: p(["address-display", `format-${e.format}`])
  }, {
    default: l(() => [
      (t(!0), a(i, null, d(e.chunks, (r, s) => (t(), a("span", {
        class: "chunk",
        key: r + s
      }, [
        m(f(r), 1),
        e.chunkTrailingSpaces ? (t(), a("span", _, "\xA0")) : u("", !0)
      ]))), 128))
    ]),
    _: 1
  }, 8, ["text", "class"]);
}
const A = /* @__PURE__ */ y(o, [["render", k], ["__scopeId", "data-v-7dae2213"]]);
export {
  A as default
};
//# sourceMappingURL=vue3-components.js.map
