import { defineComponent as E, ref as o, onMounted as O, onUnmounted as T } from "vue";
import b from './../../../modules/qr-scanner/vue3-components.js';
import $ from "../../i18n/vue3-components2.js";
import { loadI18n as q } from "../../i18n/vue3-components.js";
import R from './../../../modules/@nimiq/utils/dist/module/vue3-components.js';
var I = /* @__PURE__ */ ((n) => (n.RESULT = "result", n.CANCEL = "cancel", n.ERROR = "error", n))(I || {});
const G = E({
  name: "QrScanner",
  emits: Object.values(I),
  props: {
    reportFrequency: {
      type: Number,
      default: 7e3
    },
    validate: Function
  },
  methods: { $t: q("QrScanner") },
  setup(n, l) {
    const r = o(null), s = o(null), i = o(null), u = o(!1), p = o(!0), L = R.isMobile(), M = R.detectBrowser();
    let t = null, y = "", w = 0, a = null;
    O(async () => {
      t = new b(s.value, (e) => D(e), {}), s.value.addEventListener("canplay", () => s.value.classList.add("ready")), window.addEventListener("resize", c), b.hasCamera().then((e) => p.value = e), F() && (v(), c());
    }), T(() => {
      h(), t && t.destroy(), window.removeEventListener("resize", c);
    });
    async function v() {
      try {
        await t.start(), u.value = !1, a && (window.clearInterval(a), a = null);
      } catch (e) {
        u.value = !0, l.emit("error", e), a || (a = window.setInterval(() => v(), 3e3));
      }
      return !u.value;
    }
    function h() {
      !t || (t.stop(), a && (window.clearInterval(a), a = null));
    }
    function g(e, f, d) {
      t && t.setGrayscaleWeights(e, f, d);
    }
    function C(e) {
      t && t.setInversionMode(e);
    }
    function c() {
      requestAnimationFrame(() => {
        if (!r.value || !i.value)
          return;
        const e = r.value.offsetHeight, f = r.value.offsetWidth, d = Math.min(e, f);
        if (d === 0)
          return;
        const m = Math.ceil(2 / 3 * d);
        i.value.style.width = m + "px", i.value.style.height = m + "px", i.value.style.top = (e - m) / 2 + "px", i.value.style.left = (f - m) / 2 + "px";
      });
    }
    function F() {
      return !!r.value && r.value.offsetWidth > 0;
    }
    function W() {
      l.emit("cancel");
    }
    function D(e) {
      e.data === y && Date.now() - w < n.reportFrequency || n.validate && !n.validate(e.data) || (y = e.data, w = Date.now(), l.emit("result", e));
    }
    return l.expose({
      start: v,
      stop: h,
      setGrayscaleWeights: g,
      setInversionMode: C,
      repositionOverlay: c
    }), {
      root$: r,
      video$: s,
      overlay$: i,
      cameraAccessFailed: u,
      hasCamera: p,
      isMobileOrTablet: L,
      browser: M,
      cancel: W
    };
  },
  components: { I18n: $ }
});
export {
  I as QrScannerEvents,
  G as default
};
//# sourceMappingURL=vue3-components2.js.map
