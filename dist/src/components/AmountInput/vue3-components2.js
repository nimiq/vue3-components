import { defineComponent as z, ref as l, onMounted as F, computed as V, watch as g, nextTick as b } from "vue";
var h = /* @__PURE__ */ ((t) => (t.MODELVALUE_UPDATE = "update:modelValue", t.PASTE = "paste", t.SUBMIT = "submit", t))(h || {});
const y = z({
  name: "AmountInput",
  emits: Object.values(h),
  props: {
    modelValue: Number,
    maxFontSize: {
      type: Number,
      default: 8
    },
    placeholder: {
      type: String,
      default: "0"
    },
    vanishing: {
      type: Boolean,
      default: !1
    },
    decimals: {
      type: Number,
      default: 5
    }
  },
  setup(t, s) {
    const c = l(null), m = l(null), f = l(null), v = l(null), i = l(""), o = l(0), p = l(50), x = l(t.maxFontSize), d = l(0), u = l(0), $ = l(!1);
    F(() => {
      t.maxFontSize && c.value && (d.value = c.value.offsetWidth);
    });
    function E() {
      m.value && m.value.focus();
    }
    function W(e) {
      e !== u.value && (o.value = e || 0, n.value = e ? (e / Math.pow(10, t.decimals)).toString() : "", S());
    }
    async function S() {
      if (await b(), !f.value || !v.value)
        return;
      const e = f.value.offsetWidth, r = v.value.offsetWidth, a = Math.min(1, Math.max(d.value / r, 1 / t.maxFontSize));
      x.value = a * t.maxFontSize, p.value = n.value ? a === 1 ? r : d.value : e;
    }
    const n = V({
      get() {
        return i.value;
      },
      set(e) {
        if (i.value = e, !e) {
          i.value = "", o.value = 0, u.value = 0, s.emit("update:modelValue", u.value);
          return;
        }
        e = e.replace(/\,/, ".");
        const a = new RegExp(`(\\d*)(\\.(\\d{0,${t.decimals}}))?`, "g").exec(e);
        a[1] || a[2] ? (i.value = `${a[1] ? a[1] : "0"}${a[2] ? a[2] : ""}`, u.value = Number(
          `${a[1]}${(a[2] ? a[3] : "").padEnd(t.decimals, "0")}`
        )) : (i.value = "", u.value = 0), o.value !== u.value && (s.emit("update:modelValue", u.value), o.value = u.value);
      }
    });
    return g(n, S), g(
      () => t.modelValue,
      (e) => e && W(e),
      { immediate: !0 }
    ), s.expose({ focus: E, formattedValue: n }), {
      fullWidth$: c,
      input$: m,
      widthPlaceholder$: f,
      widthValue$: v,
      valueInLuna: u,
      isFocussed: $,
      maxWidth: d,
      formattedValue: n,
      width: p,
      fontSize: x,
      AmountInputEvent: h
    };
  }
});
export {
  h as AmountInputEvent,
  y as default
};
//# sourceMappingURL=vue3-components2.js.map
