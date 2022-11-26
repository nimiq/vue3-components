import { defineComponent as A, computed as D } from "vue";
import { CurrencyInfo as s } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components4.js";
import { FormattableNumber as _ } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components6.js";
const b = /(-)?\D*(\d+)(\.(\d+))?/, h = /(\d)\D(\d)/, E = /[A-Z]{3}\s?/i, F = /[A-Z.]$/i, T = A({
  name: "FiatAmount",
  props: {
    amount: {
      type: Number,
      required: !0
    },
    currency: {
      type: String,
      required: !0
    },
    maxRelativeDeviation: {
      type: Number,
      default: 0.1
    },
    hideDecimals: {
      type: Boolean,
      default: !1
    },
    locale: String
  },
  setup(e) {
    const g = D(() => {
      const t = d(e.currency), i = e.locale ? new s(e.currency, e.locale) : new s(e.currency), r = {
        style: "currency",
        currency: e.currency,
        currencyDisplay: "code",
        useGrouping: !1,
        numberingSystem: "latn",
        minimumFractionDigits: e.hideDecimals ? 0 : i.decimals,
        maximumFractionDigits: e.hideDecimals ? 0 : i.decimals
      };
      let n, a, m;
      do {
        n = e.amount.toLocaleString([
          e.locale || t,
          t,
          `${navigator.language.substring(0, 2)}-${t}`,
          navigator.language,
          `en-${t}`,
          "en"
        ], r).replace(h, "$1.$2");
        const c = n.match(b), [, o, , f, u] = c;
        a = c[2];
        const y = `${o || ""}${a}${f || ""}`;
        m = Math.abs((e.amount - Number.parseFloat(y)) / e.amount);
        const l = u ? u.length + 1 : 1;
        r.minimumFractionDigits = l, r.maximumFractionDigits = l;
      } while (m > e.maxRelativeDeviation && r.minimumFractionDigits <= 20 && !e.hideDecimals);
      return n = n.replace(E, (c, o) => o !== 0 || !F.test(i.symbol) ? i.symbol : `${i.symbol}\xA0`), a.length <= 4 ? n : n.replace(a, new _(a).toString(!0));
    });
    function d(t) {
      switch (t = t.toLowerCase(), t) {
        case "eur":
        case "chf":
          return "de";
        case "gbp":
        case "usd":
          return "en";
        case "cny":
          return "zh";
        default:
          return t.substr(0, 2);
      }
    }
    return { currencyString: g };
  }
});
export {
  T as default
};
//# sourceMappingURL=vue3-components2.js.map
