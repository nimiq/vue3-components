import a from "./vue3-components2.js";
import { AmountInputEvent as P } from "./vue3-components2.js";
import { openBlock as s, createElementBlock as d, normalizeClass as i, createElementVNode as n, withModifiers as r, toDisplayString as l, createCommentVNode as p, withDirectives as u, normalizeStyle as m, vModelText as f, pushScopeId as h, popScopeId as v } from "vue";
import "./vue3-components3.js";
import $ from "../../../_virtual/vue3-components.js";
const w = (e) => (h("data-v-426cc8a1"), e = e(), v(), e), I = ["placeholder"], S = /* @__PURE__ */ w(() => /* @__PURE__ */ n("span", { class: "nim" }, "NIM", -1));
function V(e, t, c, E, y, z) {
  return s(), d("div", {
    class: i(["amount-input", { "has-value": e.valueInLuna > 0, focussed: e.isFocussed }])
  }, [
    n("form", {
      class: "label-input",
      onSubmit: t[4] || (t[4] = r((o) => e.$emit(e.AmountInputEvent.SUBMIT, o), ["prevent"])),
      ref: "fullWidth$"
    }, [
      n("span", {
        class: "width-finder width-placeholder",
        ref: "widthPlaceholder$"
      }, l(e.placeholder), 513),
      e.maxFontSize ? (s(), d("div", {
        key: 0,
        class: i(["full-width", { "width-finder": e.maxWidth > 0 }])
      }, "Width", 2)) : p("", !0),
      n("span", {
        class: "width-finder width-value",
        ref: "widthValue$"
      }, l(e.formattedValue || ""), 513),
      u(n("input", {
        type: "text",
        inputmode: "decimal",
        class: i(["nq-input", { vanishing: e.vanishing }]),
        ref: "input$",
        placeholder: e.placeholder,
        style: m({ width: `${e.width}px`, fontSize: `${e.fontSize}rem` }),
        onFocus: t[0] || (t[0] = (o) => e.isFocussed = !0),
        onBlur: t[1] || (t[1] = (o) => e.isFocussed = !1),
        onPaste: t[2] || (t[2] = (o) => e.$emit(e.AmountInputEvent.PASTE, o)),
        "onUpdate:modelValue": t[3] || (t[3] = (o) => e.formattedValue = o)
      }, null, 46, I), [
        [f, e.formattedValue]
      ])
    ], 544),
    S
  ], 2);
}
const g = /* @__PURE__ */ $(a, [["render", V], ["__scopeId", "data-v-426cc8a1"]]);
export {
  P as AmountInputEvent,
  g as default
};
//# sourceMappingURL=vue3-components.js.map
