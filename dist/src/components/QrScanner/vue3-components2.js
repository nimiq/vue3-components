import { defineComponent as S, ref as i, onMounted as $, onUnmounted as q } from "vue";
import b from "../../../node_modules/qr-scanner/vue3-components.js";
import x from "../../i18n/vue3-components2.js";
import { loadI18n as z } from "../../i18n/vue3-components.js";
import I from "../../../node_modules/@nimiq/utils/dist/module/vue3-components.js";
const B = S({
  name: "QrScanner",
  props: {
    reportFrequency: {
      type: Number,
      default: 7e3
    },
    validate: Function
  },
  methods: { $t: z("QrScanner") },
  setup(v, o) {
    const a = i(null), l = i(null), r = i(null), s = i(!1), p = i(!0), M = I.isMobile(), g = I.detectBrowser();
    let t = null, y = "", w = 0, n = null;
    $(async () => {
      t = new b(l.value, (e) => R(e), {}), l.value.addEventListener("canplay", () => l.value.classList.add("ready")), window.addEventListener("resize", u), b.hasCamera().then((e) => p.value = e), W() && (m(), u());
    }), q(() => {
      h(), t && t.destroy(), window.removeEventListener("resize", u);
    });
    async function m() {
      try {
        await t.start(), s.value = !1, n && (window.clearInterval(n), n = null);
      } catch (e) {
        s.value = !0, o.emit("error", e), n || (n = window.setInterval(() => m(), 3e3));
      }
      return !s.value;
    }
    function h() {
      !t || (t.stop(), n && (window.clearInterval(n), n = null));
    }
    function F(e, c, f) {
      t && t.setGrayscaleWeights(e, c, f);
    }
    function L(e) {
      t && t.setInversionMode(e);
    }
    function u() {
      requestAnimationFrame(() => {
        if (!a.value || !r.value)
          return;
        const e = a.value.offsetHeight, c = a.value.offsetWidth, f = Math.min(e, c);
        if (f === 0)
          return;
        const d = Math.ceil(2 / 3 * f);
        r.value.style.width = d + "px", r.value.style.height = d + "px", r.value.style.top = (e - d) / 2 + "px", r.value.style.left = (c - d) / 2 + "px";
      });
    }
    function W() {
      return !!a.value && a.value.offsetWidth > 0;
    }
    function D() {
      o.emit("cancel");
    }
    function R(e) {
      e.data === y && Date.now() - w < v.reportFrequency || v.validate && !v.validate(e.data) || (y = e.data, w = Date.now(), o.emit("result", e));
    }
    return o.expose({
      start: m,
      stop: h,
      setGrayscaleWeights: F,
      setInversionMode: L,
      repositionOverlay: u
    }), {
      root$: a,
      video$: l,
      overlay$: r,
      cameraAccessFailed: s,
      hasCamera: p,
      isMobileOrTablet: M,
      browser: g,
      cancel: D
    };
  },
  components: { I18n: x }
});
export {
  B as default
};
//# sourceMappingURL=vue3-components2.js.map
