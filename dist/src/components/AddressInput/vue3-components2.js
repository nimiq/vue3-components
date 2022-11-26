import { defineComponent as k, ref as f, computed as x, onMounted as P, onUnmounted as W, watch as O } from "vue";
import { ValidationUtils as Q } from './../../../modules/@nimiq/utils/dist/module/vue3-components9.js';
import { onKeyDown as R, onChange as z, onPaste as H, onCut as I } from './../../../modules/input-format/modules/vue3-components4.js';
import { Clipboard as K } from './../../../modules/@nimiq/utils/dist/module/vue3-components2.js';
const A = 9 * 4, D = A + 8;
function w(e, l, s = !1) {
  if (!s || d(l + e)) {
    switch (e.toUpperCase()) {
      case "I":
        e = "1";
        break;
      case "O":
        e = "0";
        break;
      case "Z":
        e = "2";
        break;
      case "W":
        return;
    }
    return new RegExp(`^(N(Q?)|NQ\\d{1,2}|NQ\\d{2}[0-9A-Z]{1,${A - 4}})$`, "i").test(l + e) ? e : void 0;
  } else
    return /^[-a-z0-9]*([a-z0-9]\.[a-z]*)?$/i.test(l + e) ? e : void 0;
}
function m(e, l = !1) {
  return !l || d(e) ? (e !== "" && e.toUpperCase() !== "N" && (e = g(e).replace(/.{4}/g, (s, o) => `${s}${(o + 4) % 12 ? " " : `
`}`).substring(0, D), e.endsWith(" ") && (e += "\u200B")), {
    text: e,
    template: `wwww wwww wwww
wwww wwww wwww
wwww wwww wwww`
  }) : {
    text: e
  };
}
function g(e) {
  return e.replace(/\s|\u200B/g, "");
}
function B(e, l = !1) {
  return !l || d(e) ? e.toUpperCase().replace(/\n/g, " ").replace(/\u200B/g, "") : e.replace(/\n/g, "").replace(/\u200B/g, "");
}
function d(e) {
  return e.length < 3 ? !1 : !!(e.toUpperCase().startsWith("NQ") && !isNaN(parseInt(e[2], 10)));
}
var b = /* @__PURE__ */ ((e) => (e.PASTE = "paste", e.MODELVALUE_UPDATE = "update:modelValue", e.ADDRESS = "address", e))(b || {});
const j = k({
  name: "AddressInput",
  emits: Object.values(b),
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    autofocus: Boolean,
    allowDomains: Boolean
  },
  setup(e, l) {
    const s = f(null), o = f(null), i = f(""), v = f(-1), S = f(-1), T = CSS.supports("mix-blend-mode", "screen"), p = x(() => !e.allowDomains || d(i.value)), $ = x(() => i.value.length >= 3 && !p.value);
    P(() => {
      C(), document.addEventListener("selectionchange", r), e.autofocus && E();
    }), W(() => {
      document.removeEventListener("selectionchange", r);
    });
    function E(t = !1) {
      !o.value || (o.value.focus(), t && o.value.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
    O(() => e.modelValue, () => C());
    function C() {
      if (g(e.modelValue) === g(i.value))
        return;
      const t = e.modelValue.split("").reduce((n, a) => n + (w(a, n, e.allowDomains) || ""), "");
      o.value && (o.value.value = m(t, e.allowDomains).text), u(t);
    }
    function h(t) {
      R(
        t,
        o.value,
        (n, a) => w(n, a, e.allowDomains),
        (n) => m(n, e.allowDomains),
        u
      ), setTimeout(() => r(), 10);
    }
    function N(t) {
      if (t.inputType === "deleteByDrag")
        return;
      const n = o.value;
      z(
        t,
        n,
        (a, c) => w(a, c, e.allowDomains),
        (a) => m(a, e.allowDomains),
        u
      );
    }
    function U(t) {
      const n = t.clipboardData, a = n ? n.getData("text/plain") : "";
      l.emit("paste", t, a), H(
        t,
        o.value,
        (c, L) => w(c, L, e.allowDomains),
        (c) => m(c, e.allowDomains),
        u
      );
    }
    function _(t) {
      I(
        t,
        o.value,
        (n, a) => w(n, a, e.allowDomains),
        (n) => m(n, e.allowDomains),
        u
      ), V();
    }
    function M() {
      setTimeout(() => r());
    }
    function V() {
      const t = B(document.getSelection().toString(), e.allowDomains);
      setTimeout(() => K.copy(t));
    }
    function u(t) {
      if (!o.value)
        return;
      const n = o.value;
      if (n.selectionStart === n.selectionEnd && (n.value[n.selectionStart] === " " || n.value[n.selectionStart] === `
`) && (n.selectionStart += 1), i.value = B(o.value.value, e.allowDomains), l.emit("update:modelValue", i.value), d(t)) {
        const a = Q.isValidAddress(i.value);
        a && l.emit("address", i.value), s.value && s.value.classList.toggle("invalid", i.value.length === D && !a);
      }
    }
    function r() {
      if (!o.value)
        return;
      const t = o.value, n = document.activeElement === t && (t.selectionStart !== D || t.selectionEnd !== D);
      v.value = n ? Math.floor(t.selectionStart / 5) : -1, S.value = n ? Math.floor(t.selectionEnd / 5) : -1;
    }
    function y(t) {
      return v.value <= t && t <= S.value;
    }
    return l.expose({ focus: E }), {
      root$: s,
      textarea$: o,
      currentValue: i,
      supportsMixBlendMode: T,
      willBeAddressBool: p,
      isDomain: $,
      onKeyDown: h,
      onInput: N,
      onPaste: U,
      onCut: _,
      onFocus: M,
      formatClipboard: V,
      updateSelection: r,
      isBlockFocused: y
    };
  }
});
export {
  D as ADDRESS_MAX_LENGTH,
  A as ADDRESS_MAX_LENGTH_WITHOUT_SPACES,
  b as AddressInputEvent,
  j as default
};
//# sourceMappingURL=vue3-components2.js.map
