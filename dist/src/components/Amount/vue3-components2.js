import { defineComponent as l, watch as n, computed as i } from "vue";
import { FormattableNumber as c } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components6.js";
function f(e) {
  return typeof e == "number" || typeof e == "bigint" || e && e.constructor && e.constructor.name.endsWith("Integer");
}
const D = l({
  name: "Amount",
  props: {
    amount: {
      required: !0,
      validator: f,
      type: Number
    },
    decimals: Number,
    minDecimals: {
      type: Number,
      default: 2
    },
    maxDecimals: {
      type: Number,
      default: 5
    },
    showApprox: {
      type: Boolean,
      default: !1
    },
    currency: {
      type: String,
      default: "nim"
    },
    currencyDecimals: {
      type: Number,
      default: 5
    }
  },
  setup(e, d) {
    function r(t) {
      if (!(e.decimals !== void 0 && t !== e.decimals) && t !== void 0 && (t < 0 || t > e.currencyDecimals || !Number.isInteger(t)))
        throw new Error("Amount: decimals is not in range");
    }
    n(() => e.minDecimals, r, { immediate: !0 }), n(() => e.maxDecimals, r, { immediate: !0 }), n(() => e.decimals, r, { immediate: !0 });
    const a = i(() => {
      let t, m;
      return typeof e.decimals == "number" ? t = m = e.decimals : (t = e.minDecimals, m = e.maxDecimals), new c(e.amount).moveDecimalSeparator(-e.currencyDecimals).toString({ maxDecimals: m, minDecimals: t, useGrouping: !0 });
    }), u = i(() => !new c(e.amount).moveDecimalSeparator(-e.currencyDecimals).equals(a.value.replace(/\s/g, ""))), o = i(() => e.currency === "tnim" ? "tNIM" : e.currency === "mbtc" ? "mBTC" : e.currency === "tbtc" ? "tBTC" : e.currency.toUpperCase());
    return {
      formattedAmount: a,
      isApprox: u,
      ticker: o
    };
  }
});
export {
  f as amountValidator,
  D as default
};
//# sourceMappingURL=vue3-components2.js.map
