import r from "./vue3-components.js";
function v(i, f, l) {
  typeof l == "string" && (l = r(l));
  var m = l(i) || {}, e = m.text, g = m.template;
  if (e === void 0 && (e = i), g)
    if (f === void 0)
      f = e.length;
    else {
      for (var t = 0, p = !1, h = -1; t < e.length && t < g.length; ) {
        if (e[t] !== g[t]) {
          if (f === 0) {
            p = !0, f = t;
            break;
          }
          h = t, f--;
        }
        t++;
      }
      p || (f = h + 1);
    }
  return {
    text: e,
    caret: f
  };
}
export {
  v as default
};
//# sourceMappingURL=vue3-components3.js.map
