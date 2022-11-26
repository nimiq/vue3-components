import c from "./vue3-components2.js";
import { PageHeaderEvent as P } from "./vue3-components2.js";
import { resolveComponent as l, openBlock as r, createElementBlock as o, normalizeClass as a, Fragment as p, renderList as m, createCommentVNode as n, withModifiers as f, createVNode as u, createElementVNode as v, renderSlot as d } from "vue";
import "./vue3-components3.js";
import g from "../../../_virtual/vue3-components.js";
const h = {
  key: 0,
  class: "progress-indicator"
}, k = ["title"], $ = { class: "nq-h1" };
function _(e, s, C, I, b, w) {
  const i = l("ArrowLeftIcon");
  return r(), o("div", {
    class: a(["page-header nq-card-header", e.progressIndicator ? "has-progress-indicator" : ""])
  }, [
    e.progressIndicator ? (r(), o("div", h, [
      (r(!0), o(p, null, m(e.progressSteps, (t) => (r(), o("div", {
        class: a(["indicator", t <= e.step ? "active" : ""]),
        key: t
      }, null, 2))), 128))
    ])) : n("", !0),
    e.backArrow ? (r(), o("a", {
      key: 1,
      href: "#",
      class: "page-header-back-button",
      onClick: s[0] || (s[0] = f((t) => e.$emit(e.PageHeaderEvent.BACK), ["prevent"])),
      title: e.$t("Go back")
    }, [
      u(i)
    ], 8, k)) : n("", !0),
    v("h1", $, [
      d(e.$slots, "default", {}, void 0, !0)
    ]),
    d(e.$slots, "more", {}, void 0, !0)
  ], 2);
}
const H = /* @__PURE__ */ g(c, [["render", _], ["__scopeId", "data-v-50129964"]]);
export {
  P as PageHeaderEvent,
  H as default
};
//# sourceMappingURL=vue3-components.js.map
