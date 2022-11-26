import n from "./vue3-components2.js";
import { CarouselEvent as g } from "./vue3-components2.js";
import { openBlock as s, createElementBlock as t, normalizeClass as i, Fragment as a, renderList as d, renderSlot as c } from "vue";
import "./vue3-components3.js";
import f from "../../../_virtual/vue3-components.js";
const u = ["onClick", "onFocusin"];
function p(e, m, $, v, k, C) {
  return s(), t("div", {
    class: i(["carousel", { disabled: e.disabled }]),
    ref: "root$"
  }, [
    (s(!0), t(a, null, d(e.entries, (o, l) => (s(), t("div", {
      ref_for: !0,
      ref: (r) => {
        e.refs$[o] = r;
      },
      key: l,
      class: i({ selected: e.effectiveSelected === o }),
      onClick: (r) => !e.disabled && e.updateSelection(o),
      onFocusin: (r) => !e.disabled && e.updateSelection(o)
    }, [
      c(e.$slots, o, {}, void 0, !0)
    ], 42, u))), 128))
  ], 2);
}
const h = /* @__PURE__ */ f(n, [["render", p], ["__scopeId", "data-v-a4c65f86"]]);
export {
  g as CarouselEvent,
  h as default
};
//# sourceMappingURL=vue3-components.js.map
