import r from "./vue3-components2.js";
import { COPYABLE_DISPLAY_TIME as h, CopyableEvent as A } from "./vue3-components2.js";
import { openBlock as d, createElementBlock as a, normalizeClass as s, renderSlot as i, createElementVNode as t, toDisplayString as l, pushScopeId as c, popScopeId as n } from "vue";
import "./vue3-components3.js";
import f from "../../../_virtual/vue3-components.js";
const m = (o) => (c("data-v-fb610bda"), o = o(), n(), o), b = /* @__PURE__ */ m(() => /* @__PURE__ */ t("div", { class: "background" }, null, -1));
function u(o, e, _, $, v, y) {
  return d(), a("div", {
    class: s(["copyable", { copied: o.copied }]),
    onClick: e[0] || (e[0] = (...p) => o.copy && o.copy(...p)),
    tabindex: "0",
    ref: "root$"
  }, [
    b,
    i(o.$slots, "default", {}, void 0, !0),
    t("div", {
      class: "tooltip",
      ref: "tooltip$"
    }, l(o.$t("Copied")), 513)
  ], 2);
}
const k = /* @__PURE__ */ f(r, [["render", u], ["__scopeId", "data-v-fb610bda"]]);
export {
  h as COPYABLE_DISPLAY_TIME,
  A as CopyableEvent,
  k as default
};
//# sourceMappingURL=vue3-components.js.map
