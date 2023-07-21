import { defineComponent as U, ref as E, computed as g, onMounted as k, onUnmounted as G, watch as O } from "vue";
import { ValidationUtils as Q } from './../../../modules/@nimiq/utils/dist/module/vue3-components9.js';
import { onKeyDown as z, onChange as K, onPaste as W, onCut as j } from './../../../modules/input-format/modules/vue3-components4.js';
import { Clipboard as J } from './../../../modules/@nimiq/utils/dist/module/vue3-components2.js';
const Y = {
  O: "0",
  I: "1",
  Z: "2"
}, v = 9 * 4 + 8, Z = new RegExp(`^(?:NQ?|NQ\\d{1,2}|NQ\\d{2}[0-9A-HJ-NP-VXY]{1,${v - 4 - 8}})$`, "i"), S = 2 + 40, q = new RegExp(`^(?:0x?|0x[0-9a-f]{1,${S - 2}})$`, "i"), F = new RegExp("^[-a-z0-9]*(?:[a-z0-9]\\.[a-z]*)?$", "i"), N = /\s|\u200B/g;
function A(e, o, i) {
  if (N.test(e))
    return;
  const a = o.length >= 2 && Y[e.toUpperCase()] || e;
  if (d(o + a, i))
    return a;
  if (D(o + a, i))
    return o === "0" && a === "X" ? "x" : a;
  if (B(o + e, i))
    return e;
}
function p(e, o) {
  return d(e, o) ? (e = c(e).replace(/.{4}/g, (i, a) => `${i}${(a + 4) % 12 ? " " : `
`}`).substring(0, v), e.endsWith(" ") && (e += "\u200B"), {
    text: e,
    template: `wwww wwww wwww
wwww wwww wwww
wwww wwww wwww`
  }) : D(e, o) ? (e = c(e).replace(/.{14}/g, (i) => `${i}
`).substring(0, S + 2), {
    text: e,
    template: `wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww`
  }) : {
    text: e
  };
}
function c(e) {
  return e.replace(N, "");
}
function _(e, o) {
  return d(e, o) ? e.toUpperCase().replace(/\n/g, " ").replace(/\u200B/g, "") : e.replace(/\n/g, "").replace(/\u200B/g, "");
}
function d(e, o) {
  return o.allowNimAddresses && Z.test(c(e));
}
function D(e, o) {
  return o.allowEthAddresses && q.test(c(e));
}
function B(e, o) {
  return o.allowDomains && !!e.length && F.test(e) && !d(e, o) && !D(e, o);
}
async function ee(e) {
  if (/^0x[0-9a-f]{40}$/i.test(e)) {
    if (!/[a-f]/.test(e) || !/[A-F]/.test(e))
      return !0;
    {
      const o = e.replace(/0x/gi, ""), i = o.toLowerCase().split("").map((r) => r.charCodeAt(0)), { keccak_256: a } = await import("js-sha3"), u = a(i);
      for (let r = 0; r < 40; r++)
        if ((parseInt(u[r], 16) >= 8 ? o[r].toUpperCase() : o[r].toLowerCase()) !== o[r])
          return !1;
      return !0;
    }
  } else
    return !1;
}
var R = /* @__PURE__ */ ((e) => (e.PASTE = "paste", e.MODELVALUE_UPDATE = "update:modelValue", e.ADDRESS = "address", e))(R || {});
const se = U({
  name: "AddressInput",
  emits: Object.values(R),
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    autofocus: Boolean,
    allowNimAddresses: {
      type: Boolean,
      default: !0
    },
    allowEthAddresses: Boolean,
    allowDomains: Boolean
  },
  setup(e, o) {
    const i = E(null), a = E(null), u = E(""), r = E(-1), h = E(-1), $ = CSS.supports("mix-blend-mode", "screen"), l = g(() => ({
      allowNimAddresses: e.allowNimAddresses,
      allowEthAddresses: !!e.allowEthAddresses,
      allowDomains: !!e.allowDomains
    })), y = g(
      () => e.allowNimAddresses && !e.allowEthAddresses && (!e.allowDomains || !u.value) || d(u.value, l.value)
    ), L = g(
      () => e.allowDomains && !e.allowNimAddresses && !e.allowEthAddresses || B(u.value, l.value)
    );
    k(() => {
      C(), document.addEventListener("selectionchange", m), e.autofocus && x();
    }), G(() => {
      document.removeEventListener("selectionchange", m);
    });
    function x(t = !1) {
      const n = a.value;
      !n || (n.focus(), t && n.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
    O(() => e.modelValue, () => C());
    function C() {
      if (c(e.modelValue) === c(u.value))
        return;
      const t = e.modelValue.split("").reduce((n, s) => n + (A(s, n, l.value) || ""), "");
      a.value && (a.value.value = p(t, l.value).text), f(t);
    }
    function M(t) {
      z(
        t,
        a.value,
        (n, s) => A(n, s, l.value),
        (n) => p(n, l.value),
        f
      ), setTimeout(() => m(), 10);
    }
    function T(t) {
      if (t.inputType === "deleteByDrag")
        return;
      const n = a.value;
      K(
        t,
        n,
        (s, w) => A(s, w, l.value),
        (s) => p(s, l.value),
        f
      );
    }
    function H(t) {
      const n = t.clipboardData, s = n ? n.getData("text/plain") : "";
      o.emit("paste", t, s), W(
        t,
        a.value,
        (w, I) => A(w, I, l.value),
        (w) => p(w, l.value),
        f
      );
    }
    function b(t) {
      j(
        t,
        a.value,
        (n, s) => A(n, s, l.value),
        (n) => p(n, l.value),
        f
      ), V();
    }
    function P() {
      setTimeout(() => m());
    }
    function V() {
      const t = _(document.getSelection().toString(), l.value);
      setTimeout(() => J.copy(t));
    }
    async function f(t) {
      const n = a.value;
      if (!!n) {
        if (n.selectionStart === n.selectionEnd && /\s/.test(n.value[n.selectionStart]) && (n.selectionStart += 1), u.value = _(n.value, l.value), o.emit("update:modelValue", u.value), d(t, l.value)) {
          const s = Q.isValidAddress(u.value);
          if (s && o.emit("address", u.value), !i.value)
            return;
          i.value.classList.toggle(
            "invalid",
            u.value.length === v && !s
          );
        } else if (D(t, l.value)) {
          const s = u.value, w = await ee(c(s));
          if (w && o.emit("address", s), !i.value)
            return;
          i.value.classList.toggle(
            "invalid",
            s.length === S && !w
          );
        }
      }
    }
    function m() {
      const t = a.value;
      if (!t)
        return;
      const n = document.activeElement === t && (t.selectionStart !== v || t.selectionEnd !== v);
      r.value = n ? Math.floor(t.selectionStart / 5) : -1, h.value = n ? Math.floor(t.selectionEnd / 5) : -1;
    }
    function X(t) {
      return r.value <= t && t <= h.value;
    }
    return o.expose({ focus: x }), {
      root$: i,
      textarea$: a,
      currentValue: u,
      supportsMixBlendMode: $,
      displayAsNimAddress: y,
      displayAsDomain: L,
      onKeyDown: M,
      onInput: T,
      onPaste: H,
      onCut: b,
      onFocus: P,
      formatClipboard: V,
      updateSelection: m,
      isBlockFocused: X
    };
  }
});
export {
  R as AddressInputEvent,
  se as default
};
//# sourceMappingURL=vue3-components2.js.map
