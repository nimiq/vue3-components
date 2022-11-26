import { count_occurences as m } from "./vue3-components5.js";
import d from "./vue3-components6.js";
function v(n) {
  var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x", l = arguments.length > 2 ? arguments[2] : void 0;
  if (!n)
    return function(r) {
      return {
        text: r
      };
    };
  var s = m(o, n);
  return function(r) {
    if (!r)
      return {
        text: "",
        template: n
      };
    for (var u = 0, t = "", e = n.split(""), c = Array.isArray(e), a = 0, e = c ? e : e[Symbol.iterator](); ; ) {
      var f;
      if (c) {
        if (a >= e.length)
          break;
        f = e[a++];
      } else {
        if (a = e.next(), a.done)
          break;
        f = a.value;
      }
      var i = f;
      if (i !== o) {
        t += i;
        continue;
      }
      if (t += r[u], u++, u === r.length && r.length < s)
        break;
    }
    return l && (t = d(t, n)), {
      text: t,
      template: n
    };
  };
}
export {
  v as default
};
//# sourceMappingURL=vue3-components.js.map
