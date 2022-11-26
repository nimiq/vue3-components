import { defineComponent as $, ref as b, computed as D, onMounted as z, onUnmounted as F, watch as c, nextTick as H } from "vue";
import T from "../../../node_modules/@nimiq/utils/dist/module/vue3-components7.js";
var C = /* @__PURE__ */ ((e) => (e.SELECT = "select", e))(C || {});
const V = $({
  name: "Carousel",
  emits: Object.values(C),
  props: {
    entries: {
      type: Array,
      default: () => [],
      validator: (e) => Array.isArray(e) && e.length > 0 && !e.some((x) => typeof x != "string")
    },
    selected: String,
    entryMargin: {
      type: Number,
      default: 16
    },
    animationDuration: {
      type: Number,
      default: 1e3
    },
    hideBackgroundEntries: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, x) {
    const I = b(null), d = b({}), l = b(""), f = b(null), w = new T(), r = /* @__PURE__ */ new Map(), P = D(() => e.entries.length <= 2), h = D(() => e.entries.length + (P.value ? 1 : 0));
    z(async () => {
      document.addEventListener("keydown", k), await E(!1), m(e.selected), v(!1);
    }), F(() => {
      document.removeEventListener("keydown", k), f.value !== null && cancelAnimationFrame(f.value);
    }), c(() => e.entryMargin, E);
    async function E(a = !0) {
      const i = typeof a == "boolean" ? a : !0;
      await H();
      let t = 0, n = 0;
      for (let u = 0; u < e.entries.length; ++u) {
        const g = d.value[e.entries[u]], M = d.value[e.entries[(u + 1) % e.entries.length]];
        t = Math.max(t, g.offsetHeight);
        const R = g.offsetWidth / 2 + M.offsetWidth / 2 + e.entryMargin;
        n = Math.max(n, R);
      }
      const s = 2 * Math.PI / h.value / 2, o = n / 2 / Math.sin(s);
      w.tweenTo(o, i ? e.animationDuration : 0), I.value && (I.value.style.minHeight = `${t}px`), y();
    }
    c(() => e.entries, S);
    async function S() {
      await E(), m(l.value), v();
    }
    c(() => e.selected, m);
    function m(a) {
      if (a === void 0)
        return;
      const i = l.value, t = e.entries.includes(a), n = e.entries.includes(i);
      t ? l.value = a : n || (l.value = e.entries[0]), l.value !== i && x.emit("select", l.value);
    }
    c(l, v), c(() => e.disabled, v);
    function v(a = !0, i) {
      const t = typeof a == "boolean" && typeof i > "u" ? a : !0;
      for (const n of r.keys())
        e.entries.includes(n) || r.delete(n);
      for (const n of e.entries) {
        const s = r.get(n) || new T(), o = t ? e.animationDuration : 0;
        s.tweenTo(B(n, s.currentValue), o), r.set(n, s);
      }
      y();
    }
    function B(a, i) {
      if (e.disabled && a !== l.value)
        return i + A(i, Math.PI);
      const t = 2 * Math.PI / h.value, n = e.entries.indexOf(a), s = e.entries.indexOf(l.value);
      let o = n - s;
      return P.value && o > h.value / 2 && (o += 1), i + A(i, o * t);
    }
    c(() => e.hideBackgroundEntries, y);
    function y() {
      f.value === null && (f.value = requestAnimationFrame(() => {
        const a = [];
        let i = w.finished;
        for (const [t, n] of r) {
          const s = n.currentValue, o = w.currentValue, u = Math.sin(s) * o, g = Math.cos(s) * o - o, M = d.value[t];
          M.style.transform = `translate3d(calc(${u}px - 50%),-50%,${g}px)`, M.style.display = N(t) ? "none" : "", a.push([t, g]), i = i && n.finished;
        }
        a.sort(([, t], [, n]) => t - n);
        for (let t = 0; t < a.length; ++t) {
          const n = d.value[a[t][0]];
          n.style.zIndex = `${t}`;
        }
        f.value = null, i || y();
      }));
    }
    function A(a, i) {
      const t = (i - a) % (2 * Math.PI), n = t - Math.sign(t) * 2 * Math.PI;
      return Math.abs(Math.abs(t) - Math.abs(n)) < 1e-10 ? Math.min(t, n) : Math.abs(t) < Math.abs(n) ? t : n;
    }
    function N(a) {
      const i = r.get(a);
      if (!i || !e.disabled && !e.hideBackgroundEntries)
        return !1;
      const t = Math.abs(A(0, i.currentValue));
      if (e.disabled)
        return Math.abs(t - Math.PI) < 1e-10;
      if (e.hideBackgroundEntries) {
        const n = 2 * Math.PI / h.value, s = Math.PI / 2 + n / (h.value - 1);
        return t > s;
      }
      return !1;
    }
    function k(a) {
      const i = a.target;
      if (e.disabled || i.tagName === "INPUT" || i.tagName === "TEXTAREA" || r.values().next().value.progress < 0.5)
        return;
      const t = e.entries.indexOf(l.value);
      let n;
      if (a.key === "ArrowLeft")
        n = (t - 1 + e.entries.length) % e.entries.length;
      else if (a.key === "ArrowRight")
        n = (t + 1) % e.entries.length;
      else
        return;
      m(e.entries[n]);
    }
    return {
      root$: I,
      refs$: d,
      effectiveSelected: l,
      updateSelection: m
    };
  }
});
export {
  C as CarouselEvent,
  V as default
};
//# sourceMappingURL=vue3-components2.js.map
