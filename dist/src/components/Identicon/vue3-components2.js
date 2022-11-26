import { defineComponent as l, computed as c, ref as m, watch as u } from "vue";
import s from "../../../node_modules/@nimiq/identicons/dist/vue3-components.js";
import f from "../../../node_modules/@nimiq/identicons/dist/vue3-components2.js";
import { ValidationUtils as p } from "../../../node_modules/@nimiq/utils/dist/module/vue3-components9.js";
s.svgPath = `data:text/plain;base64,${window.btoa(f)}`;
const x = l({
  name: "Identicon",
  props: {
    address: {
      required: !0,
      type: String
    }
  },
  setup(e, n) {
    function r(t) {
      return t.replace(/[\+ ]/g, "").toUpperCase().match(/.{4}/g).join(" ");
    }
    function d(t) {
      return p.isValidAddress(t);
    }
    const i = c(() => 'data:image/svg+xml,<svg width="64" height="64" viewBox="0 -4 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".1" d="M62.3 25.4L49.2 2.6A5.3 5.3 0 0 0 44.6 0H18.4c-1.9 0-3.6 1-4.6 2.6L.7 25.4c-1 1.6-1 3.6 0 5.2l13.1 22.8c1 1.6 2.7 2.6 4.6 2.6h26.2c1.9 0 3.6-1 4.6-2.6l13-22.8c1-1.6 1-3.6.1-5.2z" fill="url(%23identicon_radial)"/><defs><radialGradient id="identicon_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-63.0033 0 0 -56 63 56)"><stop stop-color="%23260133"/><stop offset="1" stop-color="%231F2348"/></radialGradient></defs></svg>'), a = m(i.value);
    u(() => e.address, o, { immediate: !0 });
    async function o(t, g) {
      return e.address && d(e.address) ? a.value = await s.toDataUrl(r(e.address)) : a.value = i.value, !0;
    }
    return n.expose({
      formatAddress: r,
      isUserFriendlyAddress: d
    }), { dataUrl: a };
  }
});
export {
  x as default
};
//# sourceMappingURL=vue3-components2.js.map
