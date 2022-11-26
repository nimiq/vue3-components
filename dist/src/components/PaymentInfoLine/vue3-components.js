import w from "./vue3-components2.js";
import { PaymentInfoLineThemes as Q } from "./vue3-components2.js";
import { resolveComponent as i, openBlock as o, createElementBlock as a, normalizeClass as p, createElementVNode as t, createVNode as l, createBlock as s, withModifiers as I, withCtx as y, createCommentVNode as m, toDisplayString as r, Fragment as T, createTextVNode as f, pushScopeId as D, popScopeId as R } from "vue";
import "./vue3-components3.js";
import N from "../../../_virtual/vue3-components.js";
const M = (e) => (D("data-v-d82993c8"), e = e(), R(), e), b = { class: "price-breakdown" }, F = { key: 0 }, P = { key: 1 }, S = { class: "free-service-info info" }, V = /* @__PURE__ */ M(() => /* @__PURE__ */ t("hr", null, null, -1)), C = { class: "total" }, E = {
  key: 1,
  class: "network-fee-info info"
}, B = { class: "arrow-runway" };
function L(e, n, q, H, O, U) {
  const c = i("Amount"), k = i("AlertTriangleIcon"), d = i("FiatAmount"), v = i("I18n"), g = i("Tooltip"), h = i("ArrowRightSmallIcon"), A = i("Account"), $ = i("Timer");
  return o(), a("div", {
    class: p(["info-line", { "inverse-theme": e.theme === e.PaymentInfoLineThemes.INVERSE }])
  }, [
    t("div", {
      class: "amounts",
      onMouseenter: n[3] || (n[3] = (u) => e.priceTooltip$ && e.priceTooltip$.show()),
      onMouseleave: n[4] || (n[4] = (u) => e.priceTooltip$ && e.priceTooltip$.hide()),
      onClick: n[5] || (n[5] = (u) => e.priceTooltip$ && Date.now() - e.lastTooltipToggle > 200 && e.priceTooltip$.toggle())
    }, [
      l(c, {
        currency: e.cryptoAmount.currency,
        amount: e.cryptoAmount.amount,
        currencyDecimals: e.cryptoAmount.decimals,
        minDecimals: 0,
        maxDecimals: Math.min(4, e.cryptoAmount.decimals)
      }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"]),
      e.fiatAmount ? (o(), s(g, {
        key: 0,
        ref: "priceTooltip$",
        container: e.tooltipContainer,
        preferredPosition: "bottom left",
        margin: { left: 8 },
        styles: {
          minWidth: "37rem",
          padding: "2rem",
          lineHeight: "1.3"
        },
        theme: e.theme === e.PaymentInfoLineThemes.INVERSE ? e.TooltipThemes.INVERSE : e.TooltipThemes.NORMAL,
        onShow: n[0] || (n[0] = (u) => e.onPriceTooltipToggle(!0)),
        onHide: n[1] || (n[1] = (u) => e.onPriceTooltipToggle(!1)),
        onClick: n[2] || (n[2] = I(() => {
        }, ["stop"])),
        class: "price-tooltip"
      }, {
        trigger: y(() => [
          e.isBadRate ? (o(), s(k, { key: 0 })) : m("", !0),
          l(d, {
            currency: e.fiatAmount.currency,
            amount: e.fiatAmount.amount
          }, null, 8, ["currency", "amount"])
        ]),
        default: y(() => [
          t("div", b, [
            t("label", null, r(e.$t("Order amount")), 1),
            l(d, {
              currency: e.fiatAmount.currency,
              amount: e.fiatAmount.amount
            }, null, 8, ["currency", "amount"]),
            e.vendorMarkup || e.vendorMarkup === 0 ? (o(), a(T, { key: 0 }, [
              e.vendorMarkup >= 0 ? (o(), a("label", F, r(e.$t("Vendor crypto markup")), 1)) : (o(), a("label", P, r(e.$t("Vendor crypto discount")), 1)),
              t("div", null, r(e.formattedVendorMarkup), 1)
            ], 64)) : m("", !0),
            t("label", {
              class: p({ "nq-orange": e.isBadRate })
            }, r(e.$t("Effective rate")), 3),
            e.effectiveRate ? (o(), a("div", {
              key: 1,
              class: p({ "nq-orange": e.isBadRate })
            }, [
              l(d, {
                currency: e.fiatAmount.currency,
                amount: e.effectiveRate,
                maxRelativeDeviation: 1e-4
              }, null, 8, ["currency", "amount"]),
              f(" / " + r(e.cryptoAmount.currency.toUpperCase()), 1)
            ], 2)) : m("", !0)
          ]),
          e.rateInfo() ? (o(), a("div", {
            key: 0,
            class: p([{ "nq-orange": e.isBadRate }, "rate-info info"])
          }, r(e.rateInfo()), 3)) : m("", !0),
          t("div", S, r(e.$t("Nimiq provides this service free of charge.")), 1),
          V,
          t("div", C, [
            t("label", null, r(e.$t("Total")), 1),
            l(c, {
              currency: e.cryptoAmount.currency,
              amount: e.cryptoAmount.amount,
              currencyDecimals: e.cryptoAmount.decimals,
              minDecimals: 0,
              maxDecimals: Math.min(8, e.cryptoAmount.decimals),
              showApprox: ""
            }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])
          ]),
          e.networkFee === void 0 || e.networkFee === null || Number(e.networkFee) !== 0 ? (o(), a("div", E, [
            f(" + "),
            e.isFormattedNetworkFeeZero ? (o(), a(T, { key: 1 }, [
              f(r(e.$t("network fee")), 1)
            ], 64)) : (o(), s(v, {
              key: 0,
              path: "{amount} suggested network fee",
              componentName: "PaymentInfoLine"
            }, {
              amount: y(() => [
                e.networkFee ? (o(), s(c, {
                  key: 0,
                  currency: e.cryptoAmount.currency,
                  amount: e.networkFee,
                  currencyDecimals: e.cryptoAmount.decimals,
                  minDecimals: 0,
                  maxDecimals: Math.min(6, e.cryptoAmount.decimals)
                }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])) : m("", !0)
              ]),
              _: 1
            }))
          ])) : m("", !0)
        ]),
        _: 1
      }, 8, ["container", "styles", "theme"])) : m("", !0)
    ], 32),
    t("div", B, [
      l(h)
    ]),
    l(A, {
      address: e.address,
      image: e.shopLogoUrl,
      label: e.originDomain
    }, null, 8, ["address", "image", "label"]),
    e.startTime && e.endTime ? (o(), s($, {
      key: 0,
      ref: "timer$",
      startTime: e.startTime,
      endTime: e.endTime,
      theme: e.theme,
      tooltipProps: {
        container: e.tooltipContainer,
        margin: { right: 8 }
      }
    }, null, 8, ["startTime", "endTime", "theme", "tooltipProps"])) : m("", !0)
  ], 2);
}
const G = /* @__PURE__ */ N(w, [["render", L], ["__scopeId", "data-v-d82993c8"]]);
export {
  Q as PaymentInfoLineThemes,
  G as default
};
//# sourceMappingURL=vue3-components.js.map
