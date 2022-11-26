import d from "./vue3-components2.js";
import { TooltipHorizontalPosition as z, TooltipThemes as M, TooltipVerticalPosition as A } from "./vue3-components2.js";
import { resolveComponent as m, openBlock as s, createElementBlock as n, normalizeClass as u, createElementVNode as f, withModifiers as l, renderSlot as i, createVNode as a, createCommentVNode as r, Transition as $, withCtx as v, normalizeStyle as g } from "vue";
import "./vue3-components3.js";
import T from "../../../_virtual/vue3-components.js";
const k = ["tabindex"];
function w(o, e, y, C, S, b) {
  const p = m("AlertTriangleIcon");
  return s(), n("span", {
    class: u(["tooltip", [o.verticalPosition, {
      shown: o.isShown,
      "transition-position": o.transitionPosition,
      "inverse-theme": o.theme === o.TooltipThemes.INVERSE
    }]]),
    ref: "root$",
    onMouseenter: e[3] || (e[3] = (t) => o.mouseOver(!0)),
    onMouseleave: e[4] || (e[4] = (t) => o.mouseOver(!1))
  }, [
    f("a", {
      href: "javascript:void(0);",
      ref: "tooltipTrigger$",
      onFocus: e[0] || (e[0] = l((t) => o.show(), ["stop"])),
      onBlur: e[1] || (e[1] = l((t) => o.hide(), ["stop"])),
      onClick: e[2] || (e[2] = (t) => o.onClick()),
      tabindex: o.disabled || o.noFocus ? -1 : 0,
      class: "trigger"
    }, [
      o.$slots.icon ? r("", !0) : i(o.$slots, "trigger", { key: 0 }, () => [
        a(p, { class: "nq-orange" })
      ], !0),
      o.$slots.icon && !o.$slots.trigger ? i(o.$slots, "icon", { key: 1 }, void 0, !0) : r("", !0)
    ], 40, k),
    a($, { name: "transition-fade" }, {
      default: v(() => [
        o.isShown ? (s(), n("div", {
          key: 0,
          ref: "tooltipBox$",
          class: "tooltip-box",
          style: g(o.tooltipBoxStyles)
        }, [
          i(o.$slots, "default", {}, void 0, !0)
        ], 4)) : r("", !0)
      ]),
      _: 3
    })
  ], 34);
}
const I = /* @__PURE__ */ T(d, [["render", w], ["__scopeId", "data-v-0ca9be35"]]);
export {
  z as TooltipHorizontalPosition,
  M as TooltipThemes,
  A as TooltipVerticalPosition,
  I as default
};
//# sourceMappingURL=vue3-components.js.map
