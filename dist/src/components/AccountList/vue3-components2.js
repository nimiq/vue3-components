import { defineComponent as w, ref as o, onBeforeUpdate as B } from "vue";
import D from "../Account/vue3-components.js";
import T from "../Tooltip/vue3-components.js";
import { CaretRightSmallIcon as p } from "../../icons/vue3-components.js";
import { loadI18n as $ } from "../../i18n/vue3-components.js";
var h = /* @__PURE__ */ ((t) => (t.ACCOUNT_SELECTED = "account-selected", t.ACCOUNT_CHANGED = "account-changed", t))(h || {});
const _ = w({
  name: "AccountList",
  emits: Object.values(h),
  props: {
    accounts: {
      type: Array,
      required: !0
    },
    disabledAddresses: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: !1
    },
    disableContracts: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    walletId: String,
    decimals: Number,
    minBalance: Number,
    tooltipProps: Object
  },
  methods: { $t: $("AccountList") },
  setup: (t, u) => {
    const l = o(null), r = o(-1), a = o({}), i = o({});
    B(() => {
      a.value = {}, i.value = {};
    });
    function m(e) {
      t.editable && a.value.hasOwnProperty(e) && a.value[e].focus();
    }
    function v(e) {
      if (t.disabled || t.editable)
        return;
      window.clearTimeout(r.value), e.userFriendlyAddress !== l.value && f();
      const s = n(e), b = d(e);
      if (s || b || c(e)) {
        l.value = e.userFriendlyAddress, i.value[`tooltip-${l.value}`] && i.value[`tooltip-${l.value}`].show();
        const g = s || b ? 2e3 : 300;
        r.value = window.setTimeout(() => f(), g);
      } else
        u.emit("account-selected", e.walletId || t.walletId, e.userFriendlyAddress);
    }
    function A(e, s) {
      u.emit("account-changed", e, s);
    }
    function C(e) {
      return t.disabled || !t.editable && (n(e) || d(e) || c(e));
    }
    function n(e) {
      return t.disableContracts && !("path" in e && e.path);
    }
    function d(e) {
      return t.disabledAddresses.includes(e.userFriendlyAddress);
    }
    function c(e) {
      return t.minBalance && (e.balance || 0) < t.minBalance;
    }
    function y(e) {
      return !t.disabled && !t.editable && (n(e) || d(e));
    }
    function f() {
      !l.value || (i.value[`tooltip-${l.value}`] && i.value[`tooltip-${l.value}`].hide(!1), l.value = null);
    }
    return u.expose({ focus: m }), {
      highlightedDisabledAddress: l,
      highlightedDisabledAddressTimeout: r,
      accounts$: a,
      tooltips$: i,
      focus: m,
      accountSelected: v,
      onAccountChanged: A,
      isDisabled: C,
      isDisabledContract: n,
      isDisabledAccount: d,
      hasInsufficientBalance: c,
      hasTooltip: y,
      clearHighlightedDisabledAddress: f
    };
  },
  components: {
    Account: D,
    CaretRightSmallIcon: p,
    Tooltip: T
  }
});
export {
  h as AccountListEvent,
  _ as default
};
//# sourceMappingURL=vue3-components2.js.map
