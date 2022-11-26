import m from "./vue3-components2.js";
import { AccountSelectorEvent as X } from "./vue3-components2.js";
import { resolveComponent as l, openBlock as t, createElementBlock as s, createElementVNode as i, normalizeClass as b, Fragment as A, renderList as f, createTextVNode as d, toDisplayString as r, createCommentVNode as n, createBlock as g, withCtx as C, createVNode as h } from "vue";
import "./vue3-components3.js";
import k from "../../../_virtual/vue3-components.js";
const y = { class: "account-selector" }, v = {
  key: 0,
  class: "wallet-label"
}, P = { class: "nq-label" }, $ = {
  key: 0,
  class: "btc-pill"
}, B = { class: "footer" };
function L(e, a, S, N, T, D) {
  const p = l("Tooltip"), u = l("AccountList");
  return t(), s("div", y, [
    i("div", {
      ref: "container$",
      class: b(["container", { "extra-spacing": e.wallets.length === 1 }])
    }, [
      (t(!0), s(A, null, f(e.sortedWallets, (o) => (t(), s("div", {
        key: o.id
      }, [
        e.wallets.length > 1 || e.isAccountDisabled(o) ? (t(), s("div", v, [
          i("div", P, [
            d(r(o.label) + " ", 1),
            e.highlightBitcoinAccounts && o.btcXPub ? (t(), s("span", $, "BTC")) : n("", !0)
          ]),
          e.isAccountDisabled(o) ? (t(), g(p, {
            key: 0,
            ref_for: !0,
            ref: (c) => e.tooltips$[`tooltip-${o.id}`] = c,
            margin: e.tooltipProps.margin,
            container: e.tooltipProps.container || void 0,
            preferredPosition: e.tooltipProps.preferredPosition,
            styles: { width: "25.25rem", ...e.tooltipProps.styles }
          }, {
            default: C(() => [
              d(r(e.$t(
                "{type} accounts cannot be used for this operation.",
                { type: e.getAccountTypeName(o) }
              )), 1)
            ]),
            _: 2
          }, 1032, ["margin", "container", "preferredPosition", "styles"])) : n("", !0)
        ])) : n("", !0),
        h(u, {
          accounts: e.sortAccountsAndContracts(e.listAccountsAndContracts(o), e.minBalance, e.disableContracts, e.disabledAddresses),
          disabledAddresses: e.disabledAddresses,
          walletId: o.id,
          minBalance: e.minBalance,
          decimals: e.decimals,
          disableContracts: e.disableContracts,
          disabled: e.isAccountDisabled(o),
          tooltipProps: e.tooltipProps,
          onAccountSelected: e.onAccountSelected,
          onClick: (c) => e.accountClicked(o)
        }, null, 8, ["accounts", "disabledAddresses", "walletId", "minBalance", "decimals", "disableContracts", "disabled", "tooltipProps", "onAccountSelected", "onClick"])
      ]))), 128))
    ], 2),
    i("div", B, [
      e.allowLogin ? (t(), s("button", {
        key: 0,
        class: "nq-button-s",
        onClick: a[0] || (a[0] = (...o) => e.onLogin && e.onLogin(...o))
      }, r(e.$t("Login to another account")), 1)) : n("", !0)
    ])
  ]);
}
const z = /* @__PURE__ */ k(m, [["render", L], ["__scopeId", "data-v-0ee37ce2"]]);
export {
  X as AccountSelectorEvent,
  z as default
};
//# sourceMappingURL=vue3-components.js.map
