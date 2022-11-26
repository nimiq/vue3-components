import { defineComponent as H, ref as u, onMounted as G, onUnmounted as Z, computed as I, watch as M } from "vue";
import J from "../Tooltip/vue3-components.js";
import K from "../../i18n/vue3-components2.js";
import { loadI18n as Q } from "../../i18n/vue3-components.js";
import X from "../../../node_modules/@nimiq/utils/dist/module/vue3-components7.js";
import { TooltipThemes as Y } from "../Tooltip/vue3-components2.js";
const z = [
  { unit: "minute", factor: 60 },
  { unit: "hour", factor: 60 },
  { unit: "day", factor: 24 }
];
function p(e, g = !0, d) {
  let n = e / 1e3, i = "second";
  for (const { unit: t, factor: a } of z) {
    if (n / a < 1 || i === d)
      break;
    n /= a, i = t;
  }
  if (n = Math.floor(n), g) {
    const t = Q("Timer");
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
const D = 8, U = 3.25 * D, x = D, $ = 1.5;
var L = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e.WHITE = "white", e))(L || {});
const ue = H({
  name: "Timer",
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
    const d = u(null), n = u(0), i = u(0), t = u(!1), a = new X(t.value || e.alwaysShowTime ? x * $ : x), o = u(2 * Math.PI * a.currentValue), f = u(null), v = u(null), h = u(null), R = u(U);
    function N(m) {
      n.value = m - Date.now();
    }
    g.expose({ synchronize: N }), G(() => {
      requestAnimationFrame(() => R.value = d.value.offsetWidth), window.addEventListener("resize", F);
    }), Z(() => {
      f.value && clearTimeout(f.value), v.value && clearTimeout(v.value), h.value && cancelAnimationFrame(h.value), window.removeEventListener("resize", F);
    });
    const T = I(() => e.startTime === void 0 || e.endTime === void 0 ? 0 : Math.max(0, e.endTime - e.startTime)), S = I(() => e.startTime === void 0 || e.endTime === void 0 ? 0 : Math.max(0, Math.min(T.value, e.endTime - i.value))), _ = I(() => e.startTime === void 0 || e.endTime === void 0 || T.value === 0 ? 0 : 1 - S.value / T.value), b = I(() => {
      const m = o.value - 2.5 * e.strokeWidth, l = Math.min(m, (1 - _.value) * o.value), r = l + e.strokeWidth, s = o.value - l, c = o.value / 4 - s;
      return { length: l, lengthWithLineCaps: r, gap: s, offset: c, strokeWidth: e.strokeWidth };
    }), q = I(() => {
      const m = o.value - b.value.lengthWithLineCaps - 2 * e.strokeWidth, l = Math.max(0, m), r = Math.min(e.strokeWidth, l), s = Math.max(0, l - r), c = o.value - s, E = o.value / 4 - e.strokeWidth / 2 - e.strokeWidth - r / 2;
      return { length: s, lengthWithLineCaps: l, gap: c, offset: E, strokeWidth: r };
    });
    function B() {
      const m = R.value / U, r = o.value * m * 3, s = 1e3 / 60, c = S.value, E = T.value, O = 2;
      let k = 1e3, A = k / O;
      for (const { factor: V } of z) {
        const w = k * V, P = w / O, j = Math.min(P, Math.max(s, E / r));
        if ((c - j) / w < 1) {
          c / w > 1 && (A = c - w);
          break;
        }
        k = w, A = P;
      }
      return Math.min(A, Math.max(s, T.value / r));
    }
    M(t, C, { immediate: !0 }), M(() => e.alwaysShowTime, C);
    function C() {
      a.tweenTo(t.value || e.alwaysShowTime ? $ * x : x, 300), W();
    }
    M(() => e.startTime, y, { immediate: !0 }), M(() => e.endTime, y), M(n, y);
    function y() {
      i.value = Date.now() + n.value, f.value && clearTimeout(f.value), e.startTime && e.endTime && (f.value = window.setTimeout(
        () => g.emit("end", e.endTime),
        e.endTime - i.value
      ), W());
    }
    function W() {
      i.value = Date.now() + n.value, o.value = 2 * Math.PI * a.currentValue, !(S.value === 0 && a.finished) && (v.value && clearTimeout(v.value), h.value && cancelAnimationFrame(h.value), a.finished ? v.value = window.setTimeout(() => W(), B()) : h.value = requestAnimationFrame(() => W()));
    }
    function F() {
      d.value && (R.value = d.value.offsetWidth);
    }
    return {
      toSimplifiedTime: p,
      TooltipThemes: Y,
      TimerThemes: L,
      root$: d,
      detailsShown: t,
      radius: a,
      timeLeftRef: S,
      progress: _,
      timeCircleInfo: b,
      fillerCircleInfo: q
    };
  },
  components: { Tooltip: J, I18n: K }
});
export {
  L as TimerThemes,
  ue as default
};
//# sourceMappingURL=vue3-components2.js.map
