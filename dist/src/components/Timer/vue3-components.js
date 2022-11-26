import p from "./vue3-components2.js";
import { TimerThemes as j } from "./vue3-components2.js";
import { resolveComponent as l, openBlock as t, createBlock as T, mergeProps as c, withCtx as r, createElementBlock as s, createElementVNode as i, createVNode as n, Transition as w, toDisplayString as a, createTextVNode as u, pushScopeId as k, popScopeId as I } from "vue";
import "./vue3-components3.js";
import g from "../../../_virtual/vue3-components.js";
const m = (e) => (k("data-v-84be38fa"), e = e(), I(), e), y = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 26 26"
}, S = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"], v = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"], E = {
  key: 0,
  class: "info-exclamation-icon"
}, $ = /* @__PURE__ */ m(() => /* @__PURE__ */ i("rect", {
  x: "12",
  y: "9",
  width: "2",
  height: "2",
  rx: "1"
}, null, -1)), C = /* @__PURE__ */ m(() => /* @__PURE__ */ i("rect", {
  x: "12",
  y: "12.5",
  width: "2",
  height: "4.5",
  rx: "1"
}, null, -1)), N = [
  $,
  C
], V = {
  key: 1,
  class: "countdown",
  x: "50%",
  y: "50%"
};
function R(e, o, P, B, W, b) {
  const h = l("I18n"), f = l("Tooltip");
  return t(), T(f, c({
    class: "timer",
    ref: "root$"
  }, {
    preferredPosition: "bottom right",
    theme: e.theme === e.TimerThemes.INVERSE || e.theme === e.TimerThemes.WHITE ? e.TooltipThemes.INVERSE : e.TooltipThemes.NORMAL,
    ...e.tooltipProps,
    styles: {
      width: "18.25rem",
      pointerEvents: "none",
      ...e.tooltipProps ? e.tooltipProps.styles : void 0
    }
  }, {
    onShow: o[0] || (o[0] = (d) => e.detailsShown = !0),
    onHide: o[1] || (o[1] = (d) => e.detailsShown = !1),
    class: {
      "time-shown": e.detailsShown || e.alwaysShowTime,
      "little-time-left": e.progress >= 0.75,
      "inverse-theme": e.theme === e.TimerThemes.INVERSE,
      "white-theme": e.theme === e.TimerThemes.WHITE
    }
  }), {
    trigger: r(() => [
      (t(), s("svg", y, [
        i("circle", {
          ref: "time-circle",
          class: "time-circle",
          cx: "50%",
          cy: "50%",
          r: e.radius.currentValue,
          "stroke-dasharray": `${e.timeCircleInfo.length} ${e.timeCircleInfo.gap}`,
          "stroke-dashoffset": e.timeCircleInfo.offset,
          "stroke-width": e.timeCircleInfo.strokeWidth
        }, null, 8, S),
        i("circle", {
          class: "filler-circle",
          cx: "50%",
          cy: "50%",
          r: e.radius.currentValue,
          "stroke-dasharray": `${e.fillerCircleInfo.length} ${e.fillerCircleInfo.gap}`,
          "stroke-dashoffset": e.fillerCircleInfo.offset,
          "stroke-width": e.fillerCircleInfo.strokeWidth
        }, null, 8, v),
        n(w, { name: "transition-fade" }, {
          default: r(() => [
            !e.detailsShown && !e.alwaysShowTime ? (t(), s("g", E, N)) : (t(), s("text", V, a(e.toSimplifiedTime(e.timeLeftRef, !1, e.maxUnit)), 1))
          ]),
          _: 1
        })
      ]))
    ]),
    default: r(() => [
      n(h, {
        path: "This offer expires in {timer}.",
        componentName: "Timer"
      }, {
        timer: r(() => [
          u(a(e.toSimplifiedTime(e.timeLeftRef, !0, e.maxUnit)), 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16, ["class"]);
}
const D = /* @__PURE__ */ g(p, [["render", R], ["__scopeId", "data-v-84be38fa"]]);
export {
  j as TimerThemes,
  D as default
};
//# sourceMappingURL=vue3-components.js.map
