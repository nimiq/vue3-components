import d from "./vue3-components2.js";
import { LabelInputEvent as N } from "./vue3-components2.js";
import { openBlock as t, createElementBlock as a, normalizeClass as r, withModifiers as s, createElementVNode as o, toDisplayString as i, withDirectives as p, normalizeStyle as u, vModelText as m } from "vue";
import "./vue3-components3.js";
import f from "../../../_virtual/vue3-components.js";
const v = ["placeholder", "disabled"];
function b(e, l, $, h, w, B) {
  return t(), a("form", {
    class: r(["label-input", { disabled: e.disabled }]),
    onSubmit: l[4] || (l[4] = s((...n) => e.onBlur && e.onBlur(...n), ["prevent"]))
  }, [
    o("span", {
      class: "width-finder width-placeholder",
      ref: "widthPlaceholder$"
    }, i(e.placeholder || e.$t("Name your address")), 513),
    o("span", {
      class: "width-finder width-value",
      ref: "widthValue$"
    }, i(e.liveValue), 513),
    p(o("input", {
      type: "text",
      class: r(["nq-input", { vanishing: e.vanishing }]),
      placeholder: e.placeholder || e.$t("Name your address"),
      style: u({ width: `${e.width}px` }),
      "onUpdate:modelValue": l[0] || (l[0] = (n) => e.liveValue = n),
      disabled: e.disabled,
      onInput: l[1] || (l[1] = (...n) => e.onInput && e.onInput(...n)),
      onBlur: l[2] || (l[2] = (...n) => e.onBlur && e.onBlur(...n)),
      onPaste: l[3] || (l[3] = (n) => e.$emit(e.LabelInputEvent.PASTE, n)),
      ref: "input$"
    }, null, 46, v), [
      [m, e.liveValue]
    ])
  ], 34);
}
const S = /* @__PURE__ */ f(d, [["render", b], ["__scopeId", "data-v-b35a7398"]]);
export {
  N as LabelInputEvent,
  S as default
};
//# sourceMappingURL=vue3-components.js.map
