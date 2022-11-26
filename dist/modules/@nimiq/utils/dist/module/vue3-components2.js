class i {
  static copy(n) {
    const e = document.createElement("textarea");
    e.value = n, e.setAttribute("readonly", ""), e.style.contain = "strict", e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "12pt";
    const t = document.getSelection(), c = t.rangeCount > 0 ? t.getRangeAt(0) : null, o = document.activeElement && (document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA") ? document.activeElement : null;
    document.body.append(e), e.select(), e.selectionStart = 0, e.selectionEnd = n.length;
    let l = !1;
    try {
      l = document.execCommand("copy");
    } catch {
    }
    return e.remove(), o ? o.focus() : c && (t.removeAllRanges(), t.addRange(c)), l;
  }
}
export {
  i as Clipboard
};
//# sourceMappingURL=vue3-components2.js.map
