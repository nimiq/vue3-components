import t from "./vue3-components2.js";
import { COPYABLE_FIELD_DEFAULT_FONT_SIZE as I, COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL as O } from "./vue3-components2.js";
import { openBlock as l, createElementBlock as a, normalizeClass as i, toDisplayString as n, createCommentVNode as d, createElementVNode as s, normalizeStyle as p, Fragment as m, renderList as u, withModifiers as c } from "vue";
import "./vue3-components3.js";
import f from "../../../_virtual/vue3-components.js";
const y = {
  key: 0,
  class: "nq-label"
}, b = ["onClick", "tabindex"], v = { class: "copy-notice" };
function C(e, r, E, L, S, F) {
  return l(), a("div", {
    class: i(["copyable-field", { small: e.small }])
  }, [
    e.label ? (l(), a("span", y, n(e.label), 1)) : d("", !0),
    s("div", {
      class: i(["copyable-field-content", { "simple-value": !e.isKeyedValue, copied: e.copied }]),
      onClick: r[0] || (r[0] = (...o) => e.copy && e.copy(...o))
    }, [
      s("div", {
        ref: "valueContainer$",
        class: "value-container",
        style: p({ fontSize: e.fontSize + "rem" })
      }, [
        s("span", {
          ref: "value$",
          class: "value"
        }, n(typeof e.modelValue == "object" ? e.modelValue[e.currentKey] : e.modelValue), 513)
      ], 4),
      (l(!0), a(m, null, u(e.isKeyedValue ? Object.keys(e.modelValue) : [], (o) => (l(), a("button", {
        class: i(["nq-button-s", {
          inverse: e.currentKey === o,
          "single-key": e.hasSingleKey
        }]),
        key: o,
        onClick: c((V) => e.currentKey = o, ["stop"]),
        tabindex: e.hasSingleKey ? -1 : 0
      }, n(o), 11, b))), 128)),
      s("div", v, n(e.$t("Copied")), 1)
    ], 2)
  ], 2);
}
const k = /* @__PURE__ */ f(t, [["render", C], ["__scopeId", "data-v-c41faa3b"]]);
export {
  I as COPYABLE_FIELD_DEFAULT_FONT_SIZE,
  O as COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL,
  k as default
};
//# sourceMappingURL=vue3-components.js.map
