class i {
  static copy(c) {
    const e = document.createElement("textarea");
    e.value = c, e.setAttribute("readonly", ""), e.style.contain = "strict", e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "12pt";
    const t = document.getSelection(), o = t.rangeCount > 0 ? t.getRangeAt(0) : null, n = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.append(e), e.select(), e.selectionStart = 0, e.selectionEnd = c.length;
    let l = !1;
    try {
      l = document.execCommand("copy");
    } catch {
    }
    return e.remove(), n && n.focus(), o && !(n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) && (t.removeAllRanges(), t.addRange(o)), l;
  }
}
export {
  i as Clipboard
};
//# sourceMappingURL=vue3-components2.js.map
