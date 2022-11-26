import n from "./vue3-components2.js";
import { SelectBarEvent as q } from "./vue3-components2.js";
import { openBlock as r, createElementBlock as o, Fragment as i, renderList as d, withDirectives as m, createElementVNode as a, vModelRadio as c, normalizeClass as p, toDisplayString as u } from "vue";
import "./vue3-components3.js";
import f from "../../../_virtual/vue3-components.js";
const v = { class: "select-bar" }, _ = ["value", "name", "id"], g = ["for"];
function S(t, l, B, $, b, h) {
  return r(), o("div", v, [
    (r(!0), o(i, null, d(t.sortedOptions, (e) => (r(), o("div", {
      key: e.value
    }, [
      m(a("input", {
        value: e,
        type: "radio",
        name: t.name,
        id: e.value.toString(),
        "onUpdate:modelValue": l[0] || (l[0] = (s) => t.selectedOption = s)
      }, null, 8, _), [
        [c, t.selectedOption]
      ]),
      a("label", {
        for: e.value.toString(),
        class: p(["nq-label", t.getColor(e)])
      }, u(e.text), 11, g)
    ]))), 128))
  ]);
}
const C = /* @__PURE__ */ f(n, [["render", S], ["__scopeId", "data-v-4f36c277"]]);
export {
  q as SelectBarEvent,
  C as default
};
//# sourceMappingURL=vue3-components.js.map
