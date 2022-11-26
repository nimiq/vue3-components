import { defineComponent as s, ref as u } from "vue";
import m from "../Account/vue3-components.js";
import c from "../Amount/vue3-components.js";
import p from "../AddressDisplay/vue3-components.js";
import f from "../CloseButton/vue3-components.js";
var n = /* @__PURE__ */ ((e) => (e.CLOSE = "close", e.CHANGED = "changed", e))(n || {});
const h = s({
  name: "AccountDetails",
  emits: Object.values(n),
  props: {
    address: {
      type: String,
      required: !0
    },
    editable: {
      type: Boolean,
      default: !1
    },
    image: String,
    label: String,
    walletLabel: String,
    balance: Number,
    placeholder: String
  },
  setup: (e, o) => {
    const t = u(null);
    function r() {
      t.value && t.value.focus();
    }
    function a(l) {
      o.emit("changed", l);
    }
    function i() {
      o.emit("close");
    }
    return o.expose({ focus: r }), {
      account$: t,
      onChanged: a,
      onClose: i
    };
  },
  components: {
    Account: m,
    Amount: c,
    AddressDisplay: p,
    CloseButton: f
  }
});
export {
  n as AccountDetailsEvent,
  h as default
};
//# sourceMappingURL=vue3-components2.js.map
