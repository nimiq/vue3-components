import d from "./vue3-components2.js";
import { TooltipEvents as z, TooltipHorizontalPosition as M, TooltipThemes as A, TooltipVerticalPosition as F } from "./vue3-components2.js";
import { resolveComponent as m, openBlock as n, createElementBlock as r, normalizeClass as u, createElementVNode as f, withModifiers as l, renderSlot as i, createVNode as a, createCommentVNode as s, Transition as v, withCtx as $, normalizeStyle as T } from "vue";
import "./vue3-components3.js";
import g from "../../../_virtual/vue3-components.js";
const k = ["tabindex"];
function w(o, e, y, C, S, B) {
  const p = m("AlertTriangleIcon");
  return n(), r("span", {
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
      o.$slots.icon ? s("", !0) : i(o.$slots, "trigger", { key: 0 }, () => [
        a(p, { class: "nq-orange" })
      ], !0),
      o.$slots.icon && !o.$slots.trigger ? i(o.$slots, "icon", { key: 1 }, void 0, !0) : s("", !0)
    ], 40, k),
    a(v, { name: "transition-fade" }, {
      default: $(() => [
        o.isShown ? (n(), r("div", {
          key: 0,
          ref: "tooltipBox$",
          class: "tooltip-box",
          style: T(o.tooltipBoxStyles)
        }, [
          i(o.$slots, "default", {}, void 0, !0)
        ], 4)) : s("", !0)
      ]),
      _: 3
    })
  ], 34);
}
const I = /* @__PURE__ */ g(d, [["render", w], ["__scopeId", "data-v-72d41571"]]);
export {
  z as TooltipEvents,
  M as TooltipHorizontalPosition,
  A as TooltipThemes,
  F as TooltipVerticalPosition,
  I as default
};
//# sourceMappingURL=vue3-components.js.map
