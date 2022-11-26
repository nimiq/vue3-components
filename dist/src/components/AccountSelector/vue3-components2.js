import { defineComponent as I, ref as u, onBeforeUpdate as $, computed as N } from "vue";
import E from "../AccountList/vue3-components.js";
import W from "../Tooltip/vue3-components.js";
import { loadI18n as h } from "../../i18n/vue3-components.js";
var g = /* @__PURE__ */ ((n) => (n.ACCOUNT_SELECTED = "account-selected", n.LOGIN = "login", n))(g || {});
const F = I({
  name: "AccountSelector",
  emits: Object.values(g),
  components: { AccountList: E, Tooltip: W },
  props: {
    wallets: {
      type: Array,
      required: !0
    },
    disabledAddresses: {
      type: Array,
      default: () => []
    },
    allowLogin: {
      type: Boolean,
      default: !0
    },
    decimals: Number,
    minBalance: Number,
    disableContracts: {
      type: Boolean,
      default: !1
    },
    disableLegacyAccounts: {
      type: Boolean,
      default: !1
    },
    disableBip39Accounts: {
      type: Boolean,
      default: !1
    },
    disableLedgerAccounts: {
      type: Boolean,
      default: !1
    },
    highlightBitcoinAccounts: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: h("AccountSelector") },
  setup: (n, A) => {
    const y = u(null), d = u({});
    $(() => d.value = {});
    const s = u(null), b = u(-1), v = u({
      get container() {
        return y.value;
      },
      preferredPosition: "bottom right",
      margin: {
        left: 16,
        right: 16,
        top: 32,
        bottom: 32
      },
      styles: {
        pointerEvents: "none"
      }
    }), B = N(() => n.wallets.slice(0).sort((e, t) => {
      const l = m(e), c = m(t);
      if (l && !c)
        return 1;
      if (!l && c)
        return -1;
      if (!n.minBalance)
        return 0;
      const o = (f, p) => Array.from(f.values()).some((r) => (r.balance || 0) >= (n.minBalance || 0)) || !n.disableContracts && p.some((r) => (r.balance || 0) >= (n.minBalance || 0)), a = o(e.accounts, e.contracts), i = o(t.accounts, t.contracts);
      return !a && i ? 1 : a && !i ? -1 : 0;
    }));
    function w(e, t) {
      A.emit("account-selected", { walletId: e, address: t });
    }
    function L() {
      A.emit("login");
    }
    function m(e) {
      return n.disableLegacyAccounts && e.type === 1 || n.disableBip39Accounts && e.type === 2 || n.disableLedgerAccounts && e.type === 3;
    }
    function C(e) {
      switch (e.type) {
        case 1:
          return h("AccountSelector")("Legacy");
        case 2:
          return "Keyguard";
        case 3:
          return "Ledger";
        default:
          throw new Error(`Unknown account type ${e.type}`);
      }
    }
    function T(e) {
      window.clearTimeout(b.value);
      const t = d.value[`tooltip-${e.id}`] ? d.value[`tooltip-${e.id}`][0] : null;
      s.value && s.value !== t && s.value.hide(!1), t && (t.show(), b.value = window.setTimeout(() => {
        t.hide(!1), s.value = null;
      }, 2e3)), s.value = t;
    }
    function D(e) {
      return [...e.accounts.values(), ...e.contracts];
    }
    function S(e, t, l, c) {
      return t ? e.sort((o, a) => {
        const i = l && !("path" in o && o.path), f = l && !("path" in a && a.path);
        if (i && !f)
          return 1;
        if (!i && f)
          return -1;
        const p = c && c.includes(o.userFriendlyAddress), r = c && c.includes(a.userFriendlyAddress);
        return p && !r ? 1 : !p && r ? -1 : (!o.balance || o.balance < t) && a.balance && a.balance >= t ? 1 : (!a.balance || a.balance < t) && o.balance && o.balance >= t ? -1 : 0;
      }) : e;
    }
    return {
      container$: y,
      tooltips$: d,
      tooltipProps: v,
      sortedWallets: B,
      onAccountSelected: w,
      onLogin: L,
      listAccountsAndContracts: D,
      sortAccountsAndContracts: S,
      isAccountDisabled: m,
      getAccountTypeName: C,
      accountClicked: T
    };
  }
});
export {
  g as AccountSelectorEvent,
  F as default
};
//# sourceMappingURL=vue3-components2.js.map
