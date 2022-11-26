function a(e) {
  return e.hasAttribute("readonly");
}
function o(e) {
  if (e.selectionStart !== e.selectionEnd)
    return {
      start: e.selectionStart,
      end: e.selectionEnd
    };
}
var n = {
  Backspace: 8,
  Delete: 46
};
function s(e) {
  switch (e.keyCode) {
    case n.Backspace:
      return "Backspace";
    case n.Delete:
      return "Delete";
  }
}
function u(e) {
  return e.selectionStart;
}
function c(e, t) {
  t !== void 0 && (r() ? setTimeout(function() {
    return e.setSelectionRange(t, t);
  }, 0) : e.setSelectionRange(t, t));
}
function r() {
  if (typeof navigator < "u")
    return i.test(navigator.userAgent);
}
var i = /Android/i;
export {
  n as Keys,
  u as getCaretPosition,
  s as getOperation,
  o as getSelection,
  a as isReadOnly,
  c as setCaretPosition
};
//# sourceMappingURL=vue3-components8.js.map
