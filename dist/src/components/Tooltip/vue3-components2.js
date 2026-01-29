import { defineComponent as J, ref as i, computed as F, onMounted as Q, onUnmounted as X, watch as j, nextTick as k } from "vue";
import { AlertTriangleIcon as Y } from "../../icons/vue3-components.js";
var H = /* @__PURE__ */ ((e) => (e.TOP = "top", e.BOTTOM = "bottom", e))(H || {}), W = /* @__PURE__ */ ((e) => (e.LEFT = "left", e.RIGHT = "right", e))(W || {}), x = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e))(x || {}), C = /* @__PURE__ */ ((e) => (e.SHOW = "show", e.HIDE = "hide", e.CLICK = "click", e))(C || {});
const ee = J({
  name: "Tooltip",
  emits: Object.values(C),
  props: {
    container: HTMLElement,
    disabled: {
      type: Boolean,
      default: !1
    },
    noFocus: {
      type: Boolean,
      default: !1
    },
    preferredPosition: {
      type: String,
      default: "top right",
      validator: (e) => {
        if (typeof e != "string")
          return !1;
        const [l, a] = e.split(" ");
        return Object.values(H).includes(l) && (!a || Object.values(W).includes(a));
      }
    },
    margin: {
      type: Object,
      validator: (e) => typeof e == "object" && Object.entries(e).every(([l, a]) => typeof a == "number" && (Object.values(H).includes(l) || Object.values(W).includes(l)))
    },
    autoWidth: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "normal",
      validator: (e) => Object.values(x).includes(e)
    },
    styles: Object
  },
  setup(e, l) {
    const a = i(null), m = i(null), D = i(null), s = i(null), g = i(!1), b = i(!1), f = i(!1), w = i(null), y = i(-1), O = i(0), c = i(0), M = i(0), h = i(0), S = i(0), d = F(() => (g.value || f.value) && !e.disabled), $ = F(() => ({
      ...e.styles,
      top: S.value + "px",
      left: h.value + "px",
      width: e.container && e.autoWidth ? c.value + "px" : (e.styles || {}).width,
      maxWidth: e.container ? M.value + "px" : (e.styles || {}).maxWidth
    }));
    Q(() => {
      "icon" in l.slots && console.warn("Tooltip: Slot `icon` is deprecated and support will be removed in the future. Use slot `trigger` instead."), e.container && L(e.container);
    }), X(() => {
      e.container && e.container.removeEventListener("scroll", v);
    });
    function B() {
      e.disabled || (g.value = !0);
    }
    function P(t = !1) {
      e.disabled || (g.value = !1, a.value && a.value.blur(), t && (f.value = !1));
    }
    function E(t = !1) {
      g.value || f.value ? P(t) : B();
    }
    j(d, T);
    async function T(t) {
      if (d.value)
        t === !0 && (y.value = Date.now(), l.emit("show"));
      else {
        b.value = !1, t === !1 && (y.value = Date.now(), l.emit("hide"));
        return;
      }
      e.container && await new Promise((n) => requestAnimationFrame(() => {
        if (!e.container)
          return;
        const o = u("left") || 0, r = u("right") || 0;
        M.value = e.container.offsetWidth - o - r, e.autoWidth && (c.value = M.value), n(null);
      })), await k(), !(!d.value || !m.value) && (O.value = m.value.offsetHeight, c.value = m.value.offsetWidth, v(), await k(), await new Promise((n) => requestAnimationFrame(n)), b.value = !0);
    }
    j(() => e.preferredPosition, v);
    function v() {
      if (!d.value || !a.value)
        return;
      let [t, n] = e.preferredPosition.split(" ");
      if (n = n || "right", h.value = Math.round(n === "right" ? a.value.offsetWidth / 2 - 25 : a.value.offsetWidth / 2 - c.value + 25), e.container) {
        const o = a.value.getBoundingClientRect(), r = e.container.getBoundingClientRect(), U = u("top") || 0, _ = u("bottom") || 0, R = O.value + 16, I = o.top - r.top - U >= R, A = r.bottom - o.bottom - _ >= R;
        t === "top" && (I || !A) || t === "bottom" && I && !A ? s.value = "top" : s.value = "bottom";
        const z = u("left") || 0, G = u("right") || 0, K = r.left + z - o.left, V = r.right - G - o.left;
        h.value = Math.max(
          K,
          Math.min(
            V - c.value,
            h.value
          )
        );
      } else
        s.value = t;
      S.value = s.value === "bottom" ? a.value.offsetHeight : -O.value;
    }
    j(() => e.container, L);
    async function L(t, n) {
      n && n.removeEventListener("scroll", v), t && await new Promise((o) => requestAnimationFrame(() => {
        t.scrollHeight !== t.offsetHeight && t.addEventListener("scroll", v), o(null);
      })), await T();
    }
    function u(t) {
      if (e.margin && e.margin[t] !== void 0)
        return e.margin[t];
      const n = e.container || null;
      return !n || (t === "top" || t === "bottom") && n.scrollHeight !== n.offsetHeight ? 0 : parseInt(window.getComputedStyle(n, null).getPropertyValue(`padding-${t}`), 10);
    }
    function q(t) {
      t ? (w.value && window.clearTimeout(w.value), f.value = !0) : w.value = window.setTimeout(
        () => f.value = !1,
        100
      );
    }
    function N() {
      Date.now() - y.value < 200 || (E(!0), l.emit("click"));
    }
    return l.expose({ show: B, hide: P, toggle: E, update: T }), {
      TooltipThemes: x,
      tooltipTrigger$: a,
      tooltipBox$: m,
      root$: D,
      verticalPosition: s,
      transitionPosition: b,
      isShown: d,
      tooltipBoxStyles: $,
      show: B,
      hide: P,
      mouseOver: q,
      onClick: N
    };
  },
  components: { AlertTriangleIcon: Y }
});
export {
  C as TooltipEvents,
  W as TooltipHorizontalPosition,
  x as TooltipThemes,
  H as TooltipVerticalPosition,
  ee as default
};
//# sourceMappingURL=vue3-components2.js.map
