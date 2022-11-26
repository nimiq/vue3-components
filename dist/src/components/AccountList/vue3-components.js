import h from "./vue3-components2.js";
import { AccountListEvent as j } from "./vue3-components2.js";
import { resolveComponent as i, openBlock as r, createElementBlock as d, Fragment as b, renderList as u, createBlock as l, resolveDynamicComponent as C, normalizeClass as c, withCtx as n, createVNode as y, createCommentVNode as a, mergeProps as A, withModifiers as g, createTextVNode as v, toDisplayString as $ } from "vue";
import "./vue3-components3.js";
import k from "../../../_virtual/vue3-components.js";
const D = { class: "account-list" };
function F(e, t, T, B, P, I) {
  const p = i("Account"), m = i("CaretRightSmallIcon"), f = i("Tooltip");
  return r(), d("div", D, [
    (r(!0), d(b, null, u(e.accounts, (s) => (r(), l(C(!e.isDisabled(s) && !e.editable ? "a" : "div"), {
      href: "javascript:void(0)",
      class: c(["account-entry", {
        disabled: e.isDisabled(s),
        "has-tooltip": e.hasTooltip(s),
        "highlight-insufficient-balance": e.highlightedDisabledAddress === s.userFriendlyAddress && e.hasInsufficientBalance(s) && !e.isDisabledContract(s) && !e.isDisabledAccount(s)
      }]),
      onClick: (o) => e.accountSelected(s),
      key: s.userFriendlyAddress
    }, {
      default: n(() => [
        y(p, {
          ref_for: !0,
          ref: (o) => e.accounts$[s.userFriendlyAddress] = o,
          address: s.userFriendlyAddress,
          label: s.label,
          placeholder: "",
          balance: e.minBalance ? s.balance : void 0,
          decimals: e.decimals,
          editable: e.editable && !e.disabled,
          onChanged: (o) => e.onAccountChanged(s.userFriendlyAddress, o)
        }, null, 8, ["address", "label", "placeholder", "balance", "decimals", "editable", "onChanged"]),
        e.isDisabled(s) ? a("", !0) : (r(), l(m, {
          key: 0,
          class: "caret"
        })),
        e.hasTooltip(s) ? (r(), l(f, A({
          key: 1,
          ref_for: !0,
          ref: (o) => e.tooltips$[`tooltip-${s.userFriendlyAddress}`] = o
        }, {
          preferredPosition: "bottom left",
          ...e.tooltipProps,
          styles: {
            width: "22.25rem",
            pointerEvents: "none",
            ...e.tooltipProps ? e.tooltipProps.styles : void 0
          }
        }, {
          onClick: t[0] || (t[0] = g(() => {
          }, ["stop"]))
        }), {
          default: n(() => [
            v($(e.isDisabledContract(s) ? e.$t("Contracts cannot be used for this operation.") : e.$t("This address cannot be used for this operation.")), 1)
          ]),
          _: 2
        }, 1040)) : a("", !0)
      ]),
      _: 2
    }, 1032, ["class", "onClick"]))), 128))
  ]);
}
const N = /* @__PURE__ */ k(h, [["render", F], ["__scopeId", "data-v-646ef48d"]]);
export {
  j as AccountListEvent,
  N as default
};
//# sourceMappingURL=vue3-components.js.map
