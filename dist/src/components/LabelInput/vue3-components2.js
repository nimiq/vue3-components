import { defineComponent as B, ref as l, watch as v, nextTick as w } from "vue";
import { loadI18n as b } from "../../i18n/vue3-components.js";
import { Utf8Tools as A } from './../../../modules/@nimiq/utils/dist/module/vue3-components8.js';
var r = /* @__PURE__ */ ((t) => (t.MODELVALUE_UPDATE = "update:modelValue", t.CHANGED = "changed", t.PASTE = "paste", t))(r || {});
const x = B({
  name: "LabelInput",
  emits: Object.values(r),
  props: {
    maxBytes: Number,
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: String,
    vanishing: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: b("LabelInput") },
  setup(t, o) {
    const a = l(null), i = l(null), s = l(null), e = l(""), u = l(""), d = l(""), f = l(50);
    function c() {
      a.value && a.value.focus();
    }
    function m() {
      if (t.maxBytes) {
        if (A.stringToUtf8ByteArray(e.value).byteLength > t.maxBytes) {
          e.value = u.value;
          return;
        }
        u.value = e.value;
      }
      o.emit("update:modelValue", e.value);
    }
    function h() {
      e.value !== d.value && (o.emit("changed", e.value), d.value = e.value, a.value && a.value.blur());
    }
    v(() => t.modelValue, p, { immediate: !0 });
    function p(n) {
      e.value = n, u.value = e.value, d.value = u.value;
    }
    v(e, y, { immediate: !0 });
    async function y() {
      if (await w(), !i.value || !s.value || !a.value)
        return;
      const n = i.value.offsetWidth, g = s.value.offsetWidth, V = parseFloat(window.getComputedStyle(a.value, null).getPropertyValue("font-size"));
      f.value = (e.value.length ? g : n) + V / 3;
    }
    return o.expose({ focus: c }), {
      input$: a,
      widthPlaceholder$: i,
      widthValue$: s,
      liveValue: e,
      width: f,
      onInput: m,
      onBlur: h,
      LabelInputEvent: r
    };
  }
});
export {
  r as LabelInputEvent,
  x as default
};
//# sourceMappingURL=vue3-components2.js.map
