function i(d, f, a) {
  for (var e = "", u = 0, n = 0; n < d.length; ) {
    var l = a(d[n], e);
    l !== void 0 && (e += l, f !== void 0 && (f === n ? u = e.length - 1 : f > n && (u = e.length))), n++;
  }
  f === void 0 && (u = e.length);
  var r = {
    value: e,
    caret: u
  };
  return r;
}
export {
  i as default
};
//# sourceMappingURL=vue3-components2.js.map
