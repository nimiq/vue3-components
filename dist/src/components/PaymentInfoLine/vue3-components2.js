import { defineComponent as b, ref as u, onMounted as D, onUnmounted as F, computed as o, watch as A, nextTick as _ } from "vue";
import C from "../Account/vue3-components.js";
import L from "../Timer/vue3-components.js";
import O from "../Amount/vue3-components.js";
import x from "../FiatAmount/vue3-components.js";
import S from "../Tooltip/vue3-components.js";
import { AlertTriangleIcon as V, ArrowRightSmallIcon as $ } from "../../icons/vue3-components.js";
import P from "../../i18n/vue3-components2.js";
import { loadI18n as R } from "../../i18n/vue3-components.js";
import { amountValidator as T } from "../Amount/vue3-components2.js";
import { FiatApiSupportedFiatCurrency as j, FiatApiSupportedCryptoCurrency as Y, getExchangeRates as U } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components5.js";
import { TooltipThemes as H } from "../Tooltip/vue3-components2.js";
function q(e) {
  return "amount" in e && "currency" in e && "decimals" in e && T(e.amount) && typeof e.currency == "string" && typeof e.decimals == "number" && Number.isInteger(e.decimals);
}
function B(e) {
  return "amount" in e && "currency" in e && typeof e.amount == "number" && typeof e.currency == "string";
}
const z = 6e4, v = 0.1;
var y = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e))(y || {});
const ae = b({
  name: "PaymentInfoLine",
  props: {
    cryptoAmount: {
      type: Object,
      required: !0,
      validator: q
    },
    fiatAmount: {
      type: Object,
      validator: B
    },
    vendorMarkup: {
      type: Number,
      validator: (e) => e > -1
    },
    networkFee: {
      type: Number,
      validator: T
    },
    origin: {
      type: String,
      required: !0
    },
    address: String,
    shopLogoUrl: String,
    startTime: Number,
    endTime: Number,
    theme: {
      type: String,
      validator: (e) => Object.values(y).includes(e),
      default: "normal"
    },
    tooltipContainer: HTMLElement
  },
  methods: { $t: R("PaymentInfoLine") },
  setup(e, g) {
    const l = u(null), k = u(null), i = u(null), f = u(-1), p = u(-1);
    D(() => a()), F(() => window.clearTimeout(f.value));
    async function w(t) {
      await _(), l.value && l.value.synchronize(t);
    }
    g.expose({ setTime: w });
    const E = o(() => e.origin.split("://")[1]), d = o(() => e.fiatAmount ? e.fiatAmount.amount / (Number(e.cryptoAmount.amount) / 10 ** e.cryptoAmount.decimals) : null), M = o(() => typeof e.vendorMarkup != "number" ? null : `${e.vendorMarkup >= 0 ? "+" : ""}${Math.ceil(e.vendorMarkup * 100 * 100 - 1e-10) / 100}%`), N = o(() => {
      if (e.networkFee === null || e.networkFee === void 0)
        return !0;
      const t = Number(e.networkFee) / 10 ** e.cryptoAmount.decimals, m = 10 ** Math.min(6, e.cryptoAmount.decimals);
      return Math.round(t * m) / m === 0;
    }), n = o(() => {
      if (d.value === null || i.value === null)
        return null;
      const t = 1 / d.value, r = 1 / i.value;
      return (t - r) / r;
    }), s = o(() => n.value === null ? !1 : n.value >= v || e.vendorMarkup && e.vendorMarkup < 0 && n.value >= e.vendorMarkup + v), c = o(() => n.value === null ? null : `${Math.round(Math.abs(n.value) * 100 * 10) / 10}%`);
    function h() {
      const t = R("PaymentInfoLine");
      return n.value === null || c.value === null || Math.abs(n.value) < v && !s.value ? null : n.value < 0 && s.value ? t(
        "Your actual discount is approx. {formattedRateDeviation} compared to the current market rate (coingecko.com).",
        { formattedRateDeviation: c.value }
      ) : n.value > 0 ? t(
        "You are paying approx. {formattedRateDeviation} more than at the current market rate (coingecko.com).",
        { formattedRateDeviation: c.value }
      ) : t(
        "You are paying approx. {formattedRateDeviation} less than at the current market rate (coingecko.com).",
        { formattedRateDeviation: c.value }
      );
    }
    A(() => e.cryptoAmount.currency, a), A(() => e.fiatAmount && e.fiatAmount.currency, a);
    async function a() {
      window.clearTimeout(f.value);
      const t = e.cryptoAmount.currency.toLowerCase(), r = e.fiatAmount ? e.fiatAmount.currency.toLowerCase() : null;
      if (!e.fiatAmount || !r || !Object.values(j).includes(r) || !Object.values(Y).includes(t)) {
        i.value = null;
        return;
      } else {
        const { [t]: { [r]: m } } = await U([t], [r]);
        i.value = m || null;
      }
      f.value = window.setTimeout(
        () => a(),
        z
      );
    }
    function I(t) {
      p.value = Date.now(), t && a();
    }
    return {
      PaymentInfoLineThemes: y,
      TooltipThemes: H,
      timer$: l,
      priceTooltip$: k,
      lastTooltipToggle: p,
      originDomain: E,
      effectiveRate: d,
      formattedVendorMarkup: M,
      isFormattedNetworkFeeZero: N,
      isBadRate: s,
      rateInfo: h,
      onPriceTooltipToggle: I
    };
  },
  components: {
    Account: C,
    Timer: L,
    Amount: O,
    FiatAmount: x,
    Tooltip: S,
    AlertTriangleIcon: V,
    ArrowRightSmallIcon: $,
    I18n: P
  }
});
export {
  y as PaymentInfoLineThemes,
  ae as default
};
//# sourceMappingURL=vue3-components2.js.map
