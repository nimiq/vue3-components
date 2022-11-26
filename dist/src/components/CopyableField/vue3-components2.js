import { defineComponent as g, ref as o, onMounted as w, onUnmounted as E, computed as m, watch as d, nextTick as L } from "vue";
import { loadI18n as V } from "../../i18n/vue3-components.js";
import { Clipboard as C } from './../../../modules/@nimiq/utils/dist/module/vue3-components2.js';
const f = 3, v = 2.5, p = g({
  name: "CopyableField",
  props: {
    modelValue: {
      type: Object,
      required: !0,
      validator: (e) => typeof e == "string" || typeof e == "number" || typeof e == "object" && Object.keys(e).length > 0
    },
    label: String,
    small: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: V("CopyableField") },
  setup(e) {
    const a = o(null), i = o(null), l = o(""), r = o(e.small ? v : f), s = o(!1), c = o(null);
    w(() => {
      window.addEventListener("resize", n), n();
    }), E(() => window.removeEventListener("resize", n));
    const u = m(() => typeof e.modelValue != "string" && typeof e.modelValue != "number"), y = m(() => u.value && Object.keys(e.modelValue).length === 1);
    d(() => e.modelValue, b, { immediate: !0 });
    function b() {
      const t = u.value ? Object.keys(e.modelValue) : [];
      t.length > 0 && (!l.value || !t.includes(l.value)) ? l.value = t[0] : n();
    }
    d(l, n), d(() => e.small, n);
    async function n() {
      if (await L(), !i.value || !a.value)
        return;
      const t = e.small ? v : f;
      a.value.style.fontSize = `${t}rem`;
      const S = i.value.offsetWidth, F = a.value.offsetWidth, _ = S / F;
      a.value.style.fontSize = "", r.value = Math.min(t, t * _);
    }
    function h() {
      C.copy(
        u.value ? e.modelValue[l.value].toString() : e.modelValue.toString()
      ), s.value = !0, c.value && window.clearTimeout(c.value), c.value = window.setTimeout(() => {
        s.value = !1;
      }, 500);
    }
    return {
      value$: a,
      valueContainer$: i,
      currentKey: l,
      fontSize: r,
      copied: s,
      isKeyedValue: u,
      hasSingleKey: y,
      copy: h
    };
  }
});
export {
  f as COPYABLE_FIELD_DEFAULT_FONT_SIZE,
  v as COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL,
  p as default
};
//# sourceMappingURL=vue3-components2.js.map
