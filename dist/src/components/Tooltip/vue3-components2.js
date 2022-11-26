import { defineComponent as V, ref as i, computed as I, onMounted as J, onUnmounted as K, watch as j, nextTick as $ } from "vue";
import { AlertTriangleIcon as Q } from "../../icons/vue3-components.js";
var x = /* @__PURE__ */ ((e) => (e.TOP = "top", e.BOTTOM = "bottom", e))(x || {}), W = /* @__PURE__ */ ((e) => (e.LEFT = "left", e.RIGHT = "right", e))(W || {}), E = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e))(E || {});
const Z = V({
  name: "Tooltip",
  props: {
    container: HTMLElement,
    disabled: Boolean,
    noFocus: Boolean,
    preferredPosition: {
      type: String,
      default: "top right",
      validator: (e) => {
        if (typeof e != "string")
          return !1;
        const [a, o] = e.split(" ");
        return Object.values(x).includes(a) && (!o || Object.values(W).includes(o));
      }
    },
    margin: {
      type: Object,
      validator: (e) => typeof e == "object" && Object.entries(e).every(([a, o]) => typeof o == "number" && (Object.values(x).includes(a) || Object.values(W).includes(a)))
    },
    autoWidth: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "normal",
      validator: (e) => Object.values(E).includes(e)
    },
    styles: Object
  },
  setup(e, a) {
    const o = i(null), m = i(null), k = i(null), s = i(null), g = i(!1), b = i(!1), c = i(!1), w = i(null), y = i(-1), M = i(0), f = i(0), O = i(0), h = i(0), H = i(0), v = I(() => (g.value || c.value) && !e.disabled), q = I(() => ({
      ...e.styles,
      top: H.value + "px",
      left: h.value + "px",
      width: e.container && e.autoWidth ? f.value + "px" : (e.styles || {}).width,
      maxWidth: e.container ? O.value + "px" : (e.styles || {}).maxWidth
    }));
    J(() => {
      "icon" in a.slots && console.warn("Tooltip: Slot `icon` is deprecated and support will be removed in the future. Use slot `trigger` instead."), e.container && S(e.container);
    }), K(() => {
      e.container && e.container.removeEventListener("scroll", d);
    });
    function B() {
      g.value = !0;
    }
    function T(t = !1) {
      g.value = !1, o.value && o.value.blur(), t && (c.value = !1);
    }
    function R(t = !1) {
      g.value || c.value ? T(t) : B();
    }
    j(v, P);
    async function P(t) {
      if (v.value)
        t === !0 && (y.value = Date.now(), a.emit("show"));
      else {
        b.value = !1, t === !1 && (y.value = Date.now(), a.emit("hide"));
        return;
      }
      e.container && await new Promise((n) => requestAnimationFrame(() => {
        if (!e.container)
          return;
        const l = u("left") || 0, r = u("right") || 0;
        O.value = e.container.offsetWidth - l - r, e.autoWidth && (f.value = O.value), n(null);
      })), await $(), !(!v.value || !m.value) && (M.value = m.value.offsetHeight, f.value = m.value.offsetWidth, d(), await $(), await new Promise((n) => requestAnimationFrame(n)), b.value = !0);
    }
    j(() => e.preferredPosition, d);
    function d() {
      if (!v.value || !o.value)
        return;
      let [t, n] = e.preferredPosition.split(" ");
      if (n = n || "right", h.value = Math.round(n === "right" ? o.value.offsetWidth / 2 - 25 : o.value.offsetWidth / 2 - f.value + 25), e.container) {
        const l = o.value.getBoundingClientRect(), r = e.container.getBoundingClientRect(), p = u("top") || 0, C = u("bottom") || 0, L = M.value + 16, A = l.top - r.top - p >= L, F = r.bottom - l.bottom - C >= L;
        t === "top" && (A || !F) || t === "bottom" && A && !F ? s.value = "top" : s.value = "bottom";
        const U = u("left") || 0, _ = u("right") || 0, z = r.left + U - l.left, G = r.right - _ - l.left;
        h.value = Math.max(
          z,
          Math.min(
            G - f.value,
            h.value
          )
        );
      } else
        s.value = t;
      H.value = s.value === "bottom" ? o.value.offsetHeight : -M.value;
    }
    j(() => e.container, S);
    async function S(t, n) {
      n && n.removeEventListener("scroll", d), t && await new Promise((l) => requestAnimationFrame(() => {
        t.scrollHeight !== t.offsetHeight && t.addEventListener("scroll", d), l(null);
      })), await P();
    }
    function u(t) {
      if (e.margin && e.margin[t] !== void 0)
        return e.margin[t];
      const n = e.container || null;
      return !n || (t === "top" || t === "bottom") && n.scrollHeight !== n.offsetHeight ? 0 : parseInt(window.getComputedStyle(n, null).getPropertyValue(`padding-${t}`), 10);
    }
    function D(t) {
      t ? (w.value && window.clearTimeout(w.value), c.value = !0) : w.value = window.setTimeout(
        () => c.value = !1,
        100
      );
    }
    function N() {
      Date.now() - y.value < 200 || (R(!0), a.emit("click"));
    }
    return a.expose({ show: B, hide: T, toggle: R, update: P }), {
      TooltipThemes: E,
      tooltipTrigger$: o,
      tooltipBox$: m,
      root$: k,
      verticalPosition: s,
      transitionPosition: b,
      isShown: v,
      tooltipBoxStyles: q,
      show: B,
      hide: T,
      mouseOver: D,
      onClick: N
    };
  },
  components: { AlertTriangleIcon: Q }
});
export {
  W as TooltipHorizontalPosition,
  E as TooltipThemes,
  x as TooltipVerticalPosition,
  Z as default
};
//# sourceMappingURL=vue3-components2.js.map
