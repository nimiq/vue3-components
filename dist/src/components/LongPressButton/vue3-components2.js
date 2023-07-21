import { defineComponent as l, ref as r, onMounted as m, onUnmounted as d, watch as p } from "vue";
import { loadI18n as f } from "../../i18n/vue3-components.js";
var i = /* @__PURE__ */ ((e) => (e.LONG_PRESS = "long-press", e))(i || {});
const v = l({
  name: "LongPressButton",
  emits: Object.values(i),
  props: {
    duration: {
      type: Number,
      default: 3e3
    },
    color: {
      type: String,
      default: "light-blue"
    }
  },
  methods: { $t: f("LongPressButton") },
  setup(e, a) {
    const t = r(!1), o = r(!1), s = () => t.value = !1;
    m(() => document.addEventListener("mouseup", s)), d(() => document.removeEventListener("mouseup", s));
    let n = -1, u = -1;
    return p(t, () => {
      t.value ? (n = window.setTimeout(() => o.value = !0, e.duration * 0.4), u = window.setTimeout(
        () => a.emit("long-press"),
        e.duration
      )) : (clearTimeout(n), clearTimeout(u), o.value = !1);
    }), {
      isPressed: t,
      showKeepPressingPrompt: o
    };
  }
});
export {
  i as LongPressButtonEvent,
  v as default
};
//# sourceMappingURL=vue3-components2.js.map
