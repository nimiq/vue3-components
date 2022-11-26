function v(l, o) {
  for (var u = 0, n = o.split(""), a = Array.isArray(n), e = 0, n = a ? n : n[Symbol.iterator](); ; ) {
    var c;
    if (a) {
      if (e >= n.length)
        break;
      c = n[e++];
    } else {
      if (e = n.next(), e.done)
        break;
      c = e.value;
    }
    var r = c;
    r === l && u++;
  }
  return u;
}
export {
  v as count_occurences
};
//# sourceMappingURL=vue3-components5.js.map
