import { defineComponent as G, ref as u, onMounted as Z, onUnmounted as J, computed as I, watch as M } from "vue";
import K from "../Tooltip/vue3-components.js";
import Q from "../../i18n/vue3-components2.js";
import { loadI18n as X } from "../../i18n/vue3-components.js";
import Y from './../../../modules/@nimiq/utils/dist/module/vue3-components7.js';
import { TooltipThemes as p } from "../Tooltip/vue3-components2.js";
const U = [
  { unit: "minute", factor: 60 },
  { unit: "hour", factor: 60 },
  { unit: "day", factor: 24 }
];
function ee(e, g = !0, d) {
  let n = e / 1e3, i = "second";
  for (const { unit: t, factor: a } of U) {
    if (n / a < 1 || i === d)
      break;
    n /= a, i = t;
  }
  if (n = Math.floor(n), g) {
    const t = X("Timer");
    return i = {
      get second() {
        return t("second");
      },
      get seconds() {
        return t("seconds");
      },
      get minute() {
        return t("minute");
      },
      get minutes() {
        return t("minutes");
      },
      get hour() {
        return t("hour");
      },
      get hours() {
        return t("hours");
      },
      get day() {
        return t("day");
      },
      get days() {
        return t("days");
      }
    }[`${i}${n !== 1 ? "s" : ""}`], `${n} ${i}`;
  } else
    return n;
}
const $ = 8, D = 3.25 * $, x = $, N = 1.5;
var z = /* @__PURE__ */ ((e) => (e.END = "end", e))(z || {}), L = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e.WHITE = "white", e))(L || {});
const re = G({
  name: "Timer",
  emits: Object.values(z),
  props: {
    startTime: Number,
    endTime: Number,
    alwaysShowTime: {
      type: Boolean,
      default: !0
    },
    theme: {
      type: String,
      default: "normal",
      validator: (e) => Object.values(L).includes(e)
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    tooltipProps: Object,
    maxUnit: {
      type: String,
      required: !1,
      validator: (e) => [void 0, "second", "minute", "hour", "day"].includes(e)
    }
  },
  setup(e, g) {
    const d = u(null), n = u(0), i = u(0), t = u(!1), a = new Y(t.value || e.alwaysShowTime ? x * N : x), o = u(2 * Math.PI * a.currentValue), v = u(null), f = u(null), h = u(null), E = u(D);
    function q(m) {
      n.value = m - Date.now();
    }
    g.expose({ synchronize: q }), Z(() => {
      requestAnimationFrame(() => E.value = d.value.offsetWidth), window.addEventListener("resize", F);
    }), J(() => {
      v.value && clearTimeout(v.value), f.value && clearTimeout(f.value), h.value && cancelAnimationFrame(h.value), window.removeEventListener("resize", F);
    });
    const T = I(() => e.startTime === void 0 || e.endTime === void 0 ? 0 : Math.max(0, e.endTime - e.startTime)), S = I(() => e.startTime === void 0 || e.endTime === void 0 ? 0 : Math.max(0, Math.min(T.value, e.endTime - i.value))), _ = I(() => e.startTime === void 0 || e.endTime === void 0 || T.value === 0 ? 0 : 1 - S.value / T.value), b = I(() => {
      const m = o.value - 2.5 * e.strokeWidth, r = Math.min(m, (1 - _.value) * o.value), l = r + e.strokeWidth, s = o.value - r, c = o.value / 4 - s;
      return { length: r, lengthWithLineCaps: l, gap: s, offset: c, strokeWidth: e.strokeWidth };
    }), j = I(() => {
      const m = o.value - b.value.lengthWithLineCaps - 2 * e.strokeWidth, r = Math.max(0, m), l = Math.min(e.strokeWidth, r), s = Math.max(0, r - l), c = o.value - s, y = o.value / 4 - e.strokeWidth / 2 - e.strokeWidth - l / 2;
      return { length: s, lengthWithLineCaps: r, gap: c, offset: y, strokeWidth: l };
    });
    function B() {
      const m = E.value / D, l = o.value * m * 3, s = 1e3 / 60, c = S.value, y = T.value, O = 2;
      let k = 1e3, A = k / O;
      for (const { factor: V } of U) {
        const w = k * V, P = w / O, H = Math.min(P, Math.max(s, y / l));
        if ((c - H) / w < 1) {
          c / w > 1 && (A = c - w);
          break;
        }
        k = w, A = P;
      }
      return Math.min(A, Math.max(s, T.value / l));
    }
    M(t, C, { immediate: !0 }), M(() => e.alwaysShowTime, C);
    function C() {
      a.tweenTo(t.value || e.alwaysShowTime ? N * x : x, 300), W();
    }
    M(() => e.startTime, R, { immediate: !0 }), M(() => e.endTime, R), M(n, R);
    function R() {
      i.value = Date.now() + n.value, v.value && clearTimeout(v.value), e.startTime && e.endTime && (v.value = window.setTimeout(
        () => g.emit("end", e.endTime),
        e.endTime - i.value
      ), W());
    }
    function W() {
      i.value = Date.now() + n.value, o.value = 2 * Math.PI * a.currentValue, !(S.value === 0 && a.finished) && (f.value && clearTimeout(f.value), h.value && cancelAnimationFrame(h.value), a.finished ? f.value = window.setTimeout(() => W(), B()) : h.value = requestAnimationFrame(() => W()));
    }
    function F() {
      d.value && (E.value = d.value.offsetWidth);
    }
    return {
      toSimplifiedTime: ee,
      TooltipThemes: p,
      TimerThemes: L,
      root$: d,
      detailsShown: t,
      radius: a,
      timeLeftRef: S,
      progress: _,
      timeCircleInfo: b,
      fillerCircleInfo: j
    };
  },
  components: { Tooltip: K, I18n: Q }
});
export {
  z as TimerEvents,
  L as TimerThemes,
  re as default
};
//# sourceMappingURL=vue3-components2.js.map
