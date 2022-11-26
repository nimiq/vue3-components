import s from "./vue3-components2.js";
import { BottomOverlayEvent as _, BottomOverlayTheme as b } from "./vue3-components2.js";
import { resolveComponent as l, openBlock as e, createElementBlock as n, normalizeClass as t, renderSlot as a, createBlock as m, createCommentVNode as c } from "vue";
import "./vue3-components3.js";
import p from "../../../_virtual/vue3-components.js";
function u(o, i, d, v, B, f) {
  const r = l("CloseButton");
  return e(), n("div", {
    class: t(["bottom-overlay", [o.theme, { "has-close-button": o.hasCloseButton }]])
  }, [
    a(o.$slots, "default", {}, void 0, !0),
    o.hasCloseButton ? (e(), m(r, {
      key: 0,
      class: t(["close-button", { inverse: [o.BottomOverlayTheme.DARK, o.BottomOverlayTheme.GREEN].includes(o.theme) }]),
      onClick: o.onClose
    }, null, 8, ["class", "onClick"])) : c("", !0)
  ], 2);
}
const O = /* @__PURE__ */ p(s, [["render", u], ["__scopeId", "data-v-4caafc56"]]);
export {
  _ as BottomOverlayEvent,
  b as BottomOverlayTheme,
  O as default
};
//# sourceMappingURL=vue3-components.js.map
