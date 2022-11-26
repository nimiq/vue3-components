import g from "./vue3-components7.js";
import C from "./vue3-components2.js";
import D from "./vue3-components3.js";
import { isReadOnly as c, getSelection as d, getOperation as P, setCaretPosition as l, getCaretPosition as y } from "./vue3-components8.js";
function k(r, e, t, a, o) {
  c(e) || setTimeout(function() {
    return v(e, t, a, void 0, o);
  }, 0);
}
function w(r, e, t, a, o) {
  if (!c(e)) {
    var n = d(e);
    n && m(e, n), v(e, t, a, void 0, o);
  }
}
function B(r, e, t, a, o) {
  v(e, t, a, void 0, o);
}
function I(r, e, t, a, o) {
  if (!c(e)) {
    var n = P(r);
    switch (n) {
      case "Delete":
      case "Backspace":
        r.preventDefault();
        var f = d(e);
        return f ? (m(e, f), v(e, t, a, void 0, o)) : v(e, t, a, n, o);
    }
  }
}
function m(r, e) {
  var t = r.value;
  t = t.slice(0, e.start) + t.slice(e.end), r.value = t, l(r, e.start);
}
function v(r, e, t, a, o) {
  var n = C(r.value, y(r), e), f = n.value, i = n.caret;
  if (a) {
    var s = g(f, i, a);
    f = s.value, i = s.caret;
  }
  var u = D(f, i, t), x = u.text;
  i = u.caret, r.value = x, l(r, i), o(f);
}
export {
  B as onChange,
  k as onCut,
  I as onKeyDown,
  w as onPaste
};
//# sourceMappingURL=vue3-components4.js.map
