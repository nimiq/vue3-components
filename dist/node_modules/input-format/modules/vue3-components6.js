import { count_occurences as g } from "./vue3-components5.js";
function f(r, c) {
  for (var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x", u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ", n = r.length, a = g("(", r), o = g(")", r), e = a - o; e > 0 && n < c.length; )
    r += c[n].replace(s, u), c[n] === ")" && e--, n++;
  return r;
}
export {
  f as default
};
//# sourceMappingURL=vue3-components6.js.map
