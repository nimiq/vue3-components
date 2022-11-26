import { defineComponent as o, ref as s, watch as f, nextTick as l } from "vue";
import c from "../../../node_modules/qr-creator/dist/vue3-components.js";
var d = /* @__PURE__ */ ((t) => (t.L = "L", t.M = "M", t.H = "H", t.Q = "Q", t))(d || {});
const m = o({
  name: "QrCode",
  props: {
    data: String,
    errorCorrection: {
      type: String,
      default: "M",
      validator: (t) => Object.values(d).includes(t)
    },
    radius: {
      type: Number,
      default: 0.5,
      validator: (t) => t >= 0 && t <= 1
    },
    fill: {
      type: [String, Object, Object],
      default: () => ({
        type: "radial-gradient",
        position: [1, 1, 0, 1, 1, Math.sqrt(2)],
        colorStops: [
          [0, "#265DD7"],
          [1, "#0582CA"]
        ]
      }),
      validator: (t) => {
        const i = (e) => typeof e == "string" && /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(e);
        if (i(t))
          return !0;
        const a = t;
        return (a.type === "linear-gradient" && a.position.length === 4 || a.type === "radial-gradient" && a.position.length === 6) && a.position.every((e) => typeof e == "number") ? a.colorStops.length >= 2 && a.colorStops.every(([e, u]) => typeof e == "number" && i(u)) : !1;
      }
    },
    background: {
      type: String,
      default: null,
      validator: (t) => t === null || /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(t)
    },
    size: {
      type: Number,
      default: 240,
      validator: (t) => t > 0
    }
  },
  setup(t, i) {
    const a = s(null);
    async function n(r = "image/png") {
      return await l(), !t.data || !a.value ? "data:," : a.value.toDataURL(r);
    }
    return f([
      () => t.data,
      () => t.errorCorrection,
      () => t.radius,
      () => t.fill,
      () => t.background,
      () => t.size
    ], async () => {
      await l(), !(!t.data || !a.value) && c.render({
        text: t.data,
        radius: t.radius,
        ecLevel: t.errorCorrection,
        fill: t.fill,
        background: t.background,
        size: t.size
      }, a.value);
    }, { immediate: !0 }), i.expose({
      toDataUrl: n
    }), {
      data: t.data,
      canvas$: a
    };
  }
});
export {
  d as QrCodeErrorCorrection,
  m as default
};
//# sourceMappingURL=vue3-components2.js.map
