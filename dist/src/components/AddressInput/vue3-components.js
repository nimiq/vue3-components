import f from "./vue3-components2.js";
import { AddressInputEvent as J } from "./vue3-components2.js";
import { openBlock as t, createElementBlock as i, normalizeClass as v, createElementVNode as s, Fragment as r, renderList as p, normalizeStyle as k, createCommentVNode as a, createVNode as u, Transition as y, withCtx as m, pushScopeId as b, popScopeId as g } from "vue";
import "./vue3-components3.js";
import h from "../../../_virtual/vue3-components.js";
const l = (e) => (b("data-v-d5747bfe"), e = e(), g(), e), w = ["placeholder"], A = {
  key: 0,
  width: "210",
  height: "99",
  viewBox: "0 0 210 99",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "grid"
}, S = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "0.75",
  y1: "30.25",
  x2: "209.25",
  y2: "30.25"
}, null, -1)), $ = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "0.75",
  y1: "68.25",
  x2: "209.25",
  y2: "68.25"
}, null, -1)), C = { key: 0 }, I = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "67.75",
  y1: "0.75",
  x2: "67.75",
  y2: "22.25"
}, null, -1)), N = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "143.75",
  y1: "0.75",
  x2: "143.75",
  y2: "22.25"
}, null, -1)), B = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "67.75",
  y1: "37.75",
  x2: "67.75",
  y2: "60.25"
}, null, -1)), F = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "143.75",
  y1: "37.75",
  x2: "143.75",
  y2: "60.25"
}, null, -1)), D = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "67.75",
  y1: "75.75",
  x2: "67.75",
  y2: "98.25"
}, null, -1)), E = /* @__PURE__ */ l(() => /* @__PURE__ */ s("line", {
  x1: "143.75",
  y1: "75.75",
  x2: "143.75",
  y2: "98.25"
}, null, -1)), V = [
  I,
  N,
  B,
  F,
  D,
  E
];
function K(e, n, P, z, M, q) {
  return t(), i("div", {
    class: v(["address-input", {
      "display-as-nim-address": e.displayAsNimAddress,
      "display-as-domain": e.displayAsDomain
    }]),
    ref: "root$"
  }, [
    s("textarea", {
      ref: "textarea$",
      spellcheck: "false",
      autocomplete: "off",
      placeholder: e.allowNimAddresses === e.allowEthAddresses ? void 0 : e.allowNimAddresses ? "NQ" : "0x",
      onKeydown: n[0] || (n[0] = (...o) => e.onKeyDown && e.onKeyDown(...o)),
      onInput: n[1] || (n[1] = (...o) => e.onInput && e.onInput(...o)),
      onPaste: n[2] || (n[2] = (...o) => e.onPaste && e.onPaste(...o)),
      onCut: n[3] || (n[3] = (...o) => e.onCut && e.onCut(...o)),
      onCopy: n[4] || (n[4] = (...o) => e.formatClipboard && e.formatClipboard(...o)),
      onClick: n[5] || (n[5] = (...o) => e.updateSelection && e.updateSelection(...o)),
      onSelect: n[6] || (n[6] = (...o) => e.updateSelection && e.updateSelection(...o)),
      onBlur: n[7] || (n[7] = (...o) => e.updateSelection && e.updateSelection(...o)),
      onFocus: n[8] || (n[8] = (...o) => e.onFocus && e.onFocus(...o))
    }, null, 40, w),
    e.displayAsNimAddress && e.supportsMixBlendMode ? (t(), i(r, { key: 0 }, p(3, (o) => (t(), i(r, null, [
      (t(), i(r, null, p(3, (d) => s("div", {
        key: `color-${o}-${d}`,
        class: "color-overlay",
        style: k({
          visibility: e.currentValue ? "visible" : "hidden",
          left: `calc(${d - 1} * (var(--block-width) + var(--block-gap-h)) + var(--block-gap-h) - 0.25rem)`,
          top: `calc(${o - 1} * (var(--block-height) + var(--block-gap-v)) + var(--block-gap-v) + 0.25rem)`,
          background: `var(--nimiq-${e.isBlockFocused((o - 1) * 3 + (d - 1)) ? "light-" : ""}blue)`
        })
      }, null, 4)), 64))
    ], 64))), 64)) : a("", !0),
    u(y, { name: "transition-fade" }, {
      default: m(() => [
        e.displayAsDomain ? a("", !0) : (t(), i("svg", A, [
          S,
          $,
          u(y, { name: "transition-fade" }, {
            default: m(() => [
              e.displayAsNimAddress ? (t(), i("g", C, V)) : a("", !0)
            ]),
            _: 1
          })
        ]))
      ]),
      _: 1
    })
  ], 2);
}
const j = /* @__PURE__ */ h(f, [["render", K], ["__scopeId", "data-v-d5747bfe"]]);
export {
  J as AddressInputEvent,
  j as default
};
//# sourceMappingURL=vue3-components.js.map
