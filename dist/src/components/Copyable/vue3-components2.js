import { defineComponent as m, ref as n, onMounted as d, onBeforeUnmount as f } from "vue";
import { loadI18n as v } from "../../i18n/vue3-components.js";
import { Clipboard as y } from './../../../modules/@nimiq/utils/dist/module/vue3-components2.js';
const w = 800;
var p = /* @__PURE__ */ ((t) => (t.COPY = "copy", t))(p || {});
const b = m({
  name: "Copyable",
  emits: Object.values(p),
  props: {
    text: String
  },
  methods: { $t: v("Copyable") },
  setup(t, s) {
    const o = n(null), l = n(null), a = n(!1), i = n(null);
    function r() {
      let e = t.text;
      if (!e && o.value && l.value) {
        const c = l.value.textContent;
        e = o.value.innerText.replace(new RegExp(`\\s*${c}$`), "");
      }
      e && y.copy(e), window.clearTimeout(i.value), a.value = !0, i.value = window.setTimeout(() => {
        a.value = !1;
      }, w), s.emit("copy", e);
    }
    function u(e) {
      (e.key === " " || e.key === "Enter") && r();
    }
    return d(() => o.value.addEventListener("keydown", u)), f(() => o.value.removeEventListener("keydown", u)), {
      root$: o,
      tooltip$: l,
      copied: a,
      copy: r
    };
  }
});
export {
  w as COPYABLE_DISPLAY_TIME,
  p as CopyableEvent,
  b as default
};
//# sourceMappingURL=vue3-components2.js.map
