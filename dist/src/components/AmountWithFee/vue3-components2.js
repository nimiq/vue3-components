import { defineComponent as r, ref as l, computed as c, onMounted as s, watch as n } from "vue";
import v from "../Amount/vue3-components.js";
import V from "../AmountInput/vue3-components.js";
import p from "../FiatAmount/vue3-components.js";
import { loadI18n as A } from "../../i18n/vue3-components.js";
var i = /* @__PURE__ */ ((e) => (e.MODELVALUE_UPDATE = "update:modelValue", e))(i || {});
const y = r({
  name: "AmountWithFee",
  emits: Object.values(i),
  props: {
    modelValue: {
      type: Object,
      default: () => ({ amount: 0, fee: 0, isValid: !1 })
    },
    availableBalance: {
      type: Number,
      default: 0
    },
    fiatAmount: Number,
    fiatCurrency: String
  },
  methods: { $t: A("AmountWithFee") },
  setup(e, u) {
    const m = l(null), t = l(e.modelValue.amount), a = c(() => t.value > 0 && t.value + e.modelValue.fee <= e.availableBalance);
    s(o), n(a, f, { immediate: !0 });
    function f() {
      u.emit("update:modelValue", {
        amount: t.value,
        fee: e.modelValue.fee,
        isValid: a.value
      });
    }
    n(t, o, { immediate: !0 });
    function o() {
      u.emit("update:modelValue", {
        amount: t.value,
        fee: e.modelValue.fee,
        isValid: a.value
      });
    }
    function d() {
      m.value && m.value.focus();
    }
    return u.expose({ focus: d }), {
      amountInput$: m,
      liveAmount: t,
      isValid: a
    };
  },
  components: {
    Amount: v,
    AmountInput: V,
    FiatAmount: p
  }
});
export {
  i as AmountWithFeeEvent,
  y as default
};
//# sourceMappingURL=vue3-components2.js.map
