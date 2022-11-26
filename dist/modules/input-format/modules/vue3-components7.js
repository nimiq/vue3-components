function c(s, i, e) {
  switch (e) {
    case "Backspace":
      i > 0 && (s = s.slice(0, i - 1) + s.slice(i), i--);
      break;
    case "Delete":
      s = s.slice(0, i) + s.slice(i + 1);
      break;
  }
  return {
    value: s,
    caret: i
  };
}
export {
  c as default
};
//# sourceMappingURL=vue3-components7.js.map
