import u from "./vue3-components2.js";
import { LongPressButtonEvent as z } from "./vue3-components2.js";
import { openBlock as r, createElementBlock as i, normalizeClass as n, withModifiers as t, withKeys as d, createElementVNode as l, createVNode as m, Transition as P, withCtx as f, normalizeStyle as $, createCommentVNode as p, renderSlot as a, toDisplayString as v } from "vue";
import "./vue3-components3.js";
import b from "../../../_virtual/vue3-components.js";
const w = { class: "mix-blend-mode-mask" };
function g(e, s, y, k, K, B) {
  return r(), i("button", {
    class: n(["long-press-button nq-button", e.color]),
    onMousedown: s[0] || (s[0] = t((o) => {
      e.isPressed = !0;
    }, ["left", "prevent"])),
    onTouchstart: s[1] || (s[1] = t((o) => {
      e.isPressed = !0;
    }, ["prevent"])),
    onKeydown: s[2] || (s[2] = d(t((o) => {
      e.isPressed = !0;
    }, ["prevent"]), ["enter", "space"])),
    onTouchend: s[3] || (s[3] = (o) => e.isPressed = !1),
    onKeyup: s[4] || (s[4] = d((o) => e.isPressed = !1, ["enter", "space"])),
    onBlur: s[5] || (s[5] = (o) => e.isPressed = !1),
    onClick: s[6] || (s[6] = t((o) => {
      o.stopImmediatePropagation();
    }, ["prevent", "stop"])),
    onSubmit: s[7] || (s[7] = t((o) => {
      o.stopImmediatePropagation();
    }, ["prevent", "stop"]))
  }, [
    l("span", w, [
      m(P, { name: "transition-indicator" }, {
        default: f(() => [
          e.isPressed ? (r(), i("div", {
            key: 0,
            class: "indicator",
            style: $(`--transition-time: ${e.duration}ms`)
          }, null, 4)) : p("", !0)
        ]),
        _: 1
      }),
      l("label", {
        class: n({ show: !e.showKeepPressingPrompt, center: e.isPressed && e.$slots.subline })
      }, [
        a(e.$slots, "default", {}, void 0, !0)
      ], 2),
      l("label", {
        class: n({ show: e.showKeepPressingPrompt, center: e.isPressed && e.$slots.subline })
      }, v(e.$t("Keep pressing\u2026")), 3),
      e.$slots.subline ? (r(), i("span", {
        key: 0,
        class: n(["subline", { show: !e.isPressed }])
      }, [
        a(e.$slots, "subline", {}, void 0, !0)
      ], 2)) : p("", !0)
    ])
  ], 34);
}
const N = /* @__PURE__ */ b(u, [["render", g], ["__scopeId", "data-v-649d3bf2"]]);
export {
  z as LongPressButtonEvent,
  N as default
};
//# sourceMappingURL=vue3-components.js.map
