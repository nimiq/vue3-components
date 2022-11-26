class a {
  static isValidAddress(e) {
    if (!e)
      return !1;
    try {
      return this.isUserFriendlyAddress(e), !0;
    } catch {
      return !1;
    }
  }
  static isUserFriendlyAddress(e) {
    if (!!e) {
      if (e = e.replace(/ /g, ""), e.substr(0, 2).toUpperCase() !== "NQ")
        throw new Error("Addresses start with NQ");
      if (e.length !== 36)
        throw new Error("Addresses are 36 chars (ignoring spaces)");
      if (!this._alphabetCheck(e))
        throw new Error("Address has invalid characters");
      if (this._ibanCheck(e.substr(4) + e.substr(0, 4)) !== 1)
        throw new Error("Address Checksum invalid");
    }
  }
  static _alphabetCheck(e) {
    e = e.toUpperCase();
    for (let r = 0; r < e.length; r++)
      if (!a.NIMIQ_ALPHABET.includes(e[r]))
        return !1;
    return !0;
  }
  static _ibanCheck(e) {
    const r = e.split("").map((t) => {
      const i = t.toUpperCase().charCodeAt(0);
      return i >= 48 && i <= 57 ? t : (i - 55).toString();
    }).join("");
    let s = "";
    for (let t = 0; t < Math.ceil(r.length / 6); t++)
      s = (parseInt(s + r.substr(t * 6, 6), 10) % 97).toString();
    return parseInt(s, 10);
  }
  static isValidHash(e) {
    try {
      return atob(e).length === 32;
    } catch {
      return !1;
    }
  }
  static get NIMIQ_ALPHABET() {
    return "0123456789ABCDEFGHJKLMNPQRSTUVXY";
  }
}
export {
  a as ValidationUtils
};
//# sourceMappingURL=vue3-components9.js.map
