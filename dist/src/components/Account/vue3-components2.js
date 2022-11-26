import { defineComponent as c, ref as l, watch as b } from "vue";
import g from "../Identicon/vue3-components.js";
import p from "../Amount/vue3-components.js";
import v from "../LabelInput/vue3-components.js";
import { ValidationUtils as n } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components9.js";
var r = /* @__PURE__ */ ((e) => (e.CHANGED = "changed", e))(r || {}), d = /* @__PURE__ */ ((e) => (e.ROW = "row", e.COLUMN = "column", e))(d || {});
const w = c({
  name: "Account",
  emits: Object.values(r),
  props: {
    label: {
      type: String,
      required: !0
    },
    displayAsCashlink: {
      type: Boolean,
      default: !1
    },
    decimals: {
      type: Number,
      default: 2
    },
    layout: {
      type: String,
      default: "row",
      validator: (e) => Object.values(d).includes(e)
    },
    editable: {
      type: Boolean,
      default: !1
    },
    address: String,
    image: String,
    placeholder: String,
    walletLabel: String,
    balance: Number
  },
  setup: (e, t) => {
    const a = l(null), i = l(!!e.image);
    function s() {
      e.editable && a.value && a.value.focus();
    }
    function o(f) {
      t.emit("changed", f);
    }
    b(() => e.image, () => {
      i.value = !!e.image;
    }, { immediate: !0 });
    function u() {
      return e.address ? n.isValidAddress(e.address) : !1;
    }
    function m() {
      return n.isValidAddress(e.label);
    }
    return t.expose({ focus: s }), {
      label$: a,
      showImage: i,
      isNimiqAddress: u,
      isLabelNimiqAddress: m,
      onModelValueUpdate: o
    };
  },
  components: {
    Identicon: g,
    Amount: p,
    LabelInput: v
  }
});
export {
  r as AccountEvent,
  d as AccountLayout,
  w as default
};
//# sourceMappingURL=vue3-components2.js.map
