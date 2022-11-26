import { defineComponent as s, ref as t, onMounted as c, onBeforeUnmount as d } from "vue";
import { loadI18n as f } from "../../i18n/vue3-components.js";
import { Clipboard as m } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components2.js";
const v = 800, E = s({
  name: "Copyable",
  props: {
    text: String
  },
  methods: { $t: f("Copyable") },
  setup(r, y) {
    const o = t(null), n = t(null), l = t(!1), a = t(null);
    function i() {
      let e = r.text;
      if (!e && o.value && n.value) {
        const p = n.value.textContent;
        e = o.value.innerText.replace(new RegExp(`\\s*${p}$`), "");
      }
      e && m.copy(e), window.clearTimeout(a.value), l.value = !0, a.value = window.setTimeout(() => {
        l.value = !1;
      }, v);
    }
    function u(e) {
      (e.key === " " || e.key === "Enter") && i();
    }
    return c(() => o.value.addEventListener("keydown", u)), d(() => o.value.removeEventListener("keydown", u)), {
      root$: o,
      tooltip$: n,
      copied: l,
      copy: i
    };
  }
});
export {
  v as COPYABLE_DISPLAY_TIME,
  E as default
};
//# sourceMappingURL=vue3-components2.js.map
