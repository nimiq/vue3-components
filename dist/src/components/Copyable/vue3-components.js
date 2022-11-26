import r from "./vue3-components2.js";
import { COPYABLE_DISPLAY_TIME as h } from "./vue3-components2.js";
import { openBlock as s, createElementBlock as d, normalizeClass as i, renderSlot as a, createElementVNode as t, toDisplayString as l, pushScopeId as c, popScopeId as n } from "vue";
import "./vue3-components3.js";
import f from "../../../_virtual/vue3-components.js";
const m = (o) => (c("data-v-57319f65"), o = o(), n(), o), u = /* @__PURE__ */ m(() => /* @__PURE__ */ t("div", { class: "background" }, null, -1));
function _(o, e, $, v, I, S) {
  return s(), d("div", {
    class: i(["copyable", { copied: o.copied }]),
    onClick: e[0] || (e[0] = (...p) => o.copy && o.copy(...p)),
    tabindex: "0",
    ref: "root$"
  }, [
    u,
    a(o.$slots, "default", {}, void 0, !0),
    t("div", {
      class: "tooltip",
      ref: "tooltip$"
    }, l(o.$t("Copied")), 513)
  ], 2);
}
const E = /* @__PURE__ */ f(r, [["render", _], ["__scopeId", "data-v-57319f65"]]);
export {
  h as COPYABLE_DISPLAY_TIME,
  E as default
};
//# sourceMappingURL=vue3-components.js.map
