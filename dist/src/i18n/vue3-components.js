import p from "../../@vite/vue3-components.js";
import { ref as L } from "vue";
import { d as A } from "../../node_modules/@nimiq/utils/dist/module/vue3-components3.js";
const r = "en", u = [
  r,
  "de",
  "es",
  "fr",
  "nl",
  "ru",
  "uk",
  "zh"
], t = L(l()), s = {}, k = [];
function C(n) {
  if (u.includes(n) || (n = r), n !== t.value) {
    t.value = n;
    for (const e of Object.keys(k))
      g(e);
  }
}
function l() {
  let o = A.getCookie("lang") || "en";
  return u.includes(o) || (o = r), o;
}
async function g(n) {
  const e = t.value + "-" + n;
  if (!(e in s) && t.value !== "en") {
    const o = await p(/* @__PURE__ */ Object.assign({}), `./${t}/${n}.json`);
    s[e] = o.default || {};
  }
}
function _(n, e, o, i) {
  let c;
  typeof o == "string" ? c = o : (c = t.value, i = o);
  const f = `${c}-${n}`;
  let a = s[f] && s[f][e] || e;
  return (typeof i == "object" || Array.isArray(i)) && (a = a.replace(/{(\w+?)}/g, (d, m) => i[m].toString() || d)), a;
}
function j(n) {
  return g(n), _.bind(void 0, n);
}
window.addEventListener("focus", () => C(l()));
export {
  _ as $t,
  l as detectLanguage,
  j as loadI18n,
  C as setLanguage
};
//# sourceMappingURL=vue3-components.js.map
