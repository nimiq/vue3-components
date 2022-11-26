import { defineComponent as l, ref as p, watch as c, getCurrentInstance as f } from "vue";
import d from "../CloseButton/vue3-components.js";
var a = /* @__PURE__ */ ((e) => (e.CLOSE = "close", e))(a || {}), t = /* @__PURE__ */ ((e) => (e.DARK = "dark", e.LIGHT = "light", e.GREEN = "green", e))(t || {});
const g = l({
  name: "BottomOverlay",
  emits: Object.values(a),
  props: {
    theme: {
      type: String,
      default: "dark",
      validator: (e) => typeof e == "string" && Object.values(t).includes(e)
    }
  },
  setup(e, n) {
    const o = p(!1);
    function i() {
      n.emit("close");
    }
    async function u() {
      var r, s;
      o.value = !!((s = (r = f()) == null ? void 0 : r.vnode.props) != null && s.onClose);
    }
    return c(() => n.attrs.onClose, u, { immediate: !0 }), {
      hasCloseButton: o,
      onClose: i,
      BottomOverlayTheme: t
    };
  },
  components: {
    CloseButton: d
  }
});
export {
  a as BottomOverlayEvent,
  t as BottomOverlayTheme,
  g as default
};
//# sourceMappingURL=vue3-components2.js.map
