import p from "./vue3-components2.js";
import { ADDRESS_MAX_LENGTH as F, ADDRESS_MAX_LENGTH_WITHOUT_SPACES as N, AddressInputEvent as M } from "./vue3-components2.js";
import { openBlock as l, createElementBlock as t, normalizeClass as a, createElementVNode as s, Fragment as r, renderList as d, normalizeStyle as u, createCommentVNode as v, createStaticVNode as f } from "vue";
import "./vue3-components3.js";
import y from "../../../_virtual/vue3-components.js";
const b = /* @__PURE__ */ f('<svg width="210" height="99" viewBox="0 0 210 99" fill="none" xmlns="http://www.w3.org/2000/svg" class="grid" data-v-7b22efe7><g stroke-width="1.5" stroke-linecap="round" data-v-7b22efe7><line x1="67.75" y1="0.75" x2="67.75" y2="22.25" data-v-7b22efe7></line><line x1="67.75" y1="37.75" x2="67.75" y2="60.25" data-v-7b22efe7></line><line x1="67.75" y1="75.75" x2="67.75" y2="98.25" data-v-7b22efe7></line><line x1="0.75" y1="30.25" x2="209.25" y2="30.25" data-v-7b22efe7></line><line x1="0.75" y1="68.25" x2="209.25" y2="68.25" data-v-7b22efe7></line><line x1="143.75" y1="37.75" x2="143.75" y2="60.25" data-v-7b22efe7></line><line x1="143.75" y1="0.75" x2="143.75" y2="22.25" data-v-7b22efe7></line><line x1="143.75" y1="75.75" x2="143.75" y2="98.25" data-v-7b22efe7></line></g></svg>', 1);
function m(e, n, g, k, S, w) {
  return l(), t("div", {
    class: a(["address-input", { "is-domain": e.isDomain }]),
    ref: "root$"
  }, [
    s("textarea", {
      ref: "textarea$",
      spellcheck: "false",
      autocomplete: "off",
      class: a({ "will-be-address": e.willBeAddressBool }),
      onKeydown: n[0] || (n[0] = (...o) => e.onKeyDown && e.onKeyDown(...o)),
      onInput: n[1] || (n[1] = (...o) => e.onInput && e.onInput(...o)),
      onPaste: n[2] || (n[2] = (...o) => e.onPaste && e.onPaste(...o)),
      onCut: n[3] || (n[3] = (...o) => e.onCut && e.onCut(...o)),
      onCopy: n[4] || (n[4] = (...o) => e.formatClipboard && e.formatClipboard(...o)),
      onClick: n[5] || (n[5] = (...o) => e.updateSelection && e.updateSelection(...o)),
      onSelect: n[6] || (n[6] = (...o) => e.updateSelection && e.updateSelection(...o)),
      onBlur: n[7] || (n[7] = (...o) => e.updateSelection && e.updateSelection(...o)),
      onFocus: n[8] || (n[8] = (...o) => e.onFocus && e.onFocus(...o))
    }, null, 34),
    e.willBeAddressBool && e.supportsMixBlendMode ? (l(), t(r, { key: 0 }, d(3, (o) => (l(), t(r, null, [
      (l(), t(r, null, d(3, (i) => s("div", {
        key: `color-${o}-${i}`,
        class: "color-overlay",
        style: u({
          visibility: e.currentValue ? "visible" : "hidden",
          left: `calc(${i - 1} * (var(--block-width) + var(--block-gap-h)) + var(--block-gap-h) - 0.25rem)`,
          top: `calc(${o - 1} * (var(--block-height) + var(--block-gap-v)) + var(--block-gap-v) + 0.25rem)`,
          background: `var(--nimiq-${e.isBlockFocused((o - 1) * 3 + (i - 1)) ? "light-" : ""}blue)`
        })
      }, null, 4)), 64))
    ], 64))), 64)) : v("", !0),
    b
  ], 2);
}
const E = /* @__PURE__ */ y(p, [["render", m], ["__scopeId", "data-v-7b22efe7"]]);
export {
  F as ADDRESS_MAX_LENGTH,
  N as ADDRESS_MAX_LENGTH_WITHOUT_SPACES,
  M as AddressInputEvent,
  E as default
};
//# sourceMappingURL=vue3-components.js.map
