class a {
  constructor(i) {
    typeof i != "string" && (i = i.toString());
    const t = i.match(a.NUMBER_REGEX);
    if (!t)
      throw new Error(`${i} is not a valid number`);
    if (this._sign = t[1], this._digits = `${t[2]}${t[3]}`, !this._digits)
      throw new Error(`${i} is not a valid number`);
    this._decimalSeparatorPosition = t[2].length;
    const s = Number.parseInt(t[5], 10);
    s && this.moveDecimalSeparator(s);
  }
  toString(i) {
    let { maxDecimals: t = void 0, minDecimals: s = void 0, useGrouping: r = i === !0, groupSeparator: o = "\u202F" } = typeof i == "object" ? i : {};
    t !== void 0 && s !== void 0 && (s = Math.min(s, t)), t !== void 0 && t < this._digits.length - this._decimalSeparatorPosition && this.round(t);
    let e = this._digits.slice(0, this._decimalSeparatorPosition).replace(/^0+/, ""), n = this._digits.slice(this._decimalSeparatorPosition).replace(/0+$/, "");
    return s !== void 0 && s > n.length && (n = n.padEnd(s, "0")), r && o && e.length > 4 && (e = e.replace(/(\d)(?=(\d{3})+$)/g, `$1${o}`)), `${this._sign}${e || "0"}${n ? `.${n}` : ""}`;
  }
  valueOf() {
    return this.toString();
  }
  moveDecimalSeparator(i) {
    return this._decimalSeparatorPosition += i, this._decimalSeparatorPosition > this._digits.length ? this._digits = this._digits.padEnd(this._decimalSeparatorPosition, "0") : this._decimalSeparatorPosition < 0 && (this._digits = this._digits.padStart(this._digits.length - this._decimalSeparatorPosition, "0"), this._decimalSeparatorPosition = 0), this;
  }
  round(i) {
    if (this._digits.length - this._decimalSeparatorPosition <= i)
      return this;
    const t = this._decimalSeparatorPosition + i, s = this._digits.substring(0, t).padEnd(this._decimalSeparatorPosition, "0");
    if (Number.parseInt(this._digits[t], 10) < 5)
      return this._digits = s, this;
    const r = `0${s}`.split(""), o = t;
    for (let e = o; e >= 0; --e) {
      const n = Number.parseInt(r[e], 10) + 1;
      if (n < 10) {
        r[e] = n.toString();
        break;
      } else
        r[e] = "0";
    }
    return this._digits = r.join(""), this._decimalSeparatorPosition += 1, this;
  }
  equals(i) {
    if (!(i instanceof a))
      try {
        i = new a(i);
      } catch {
        return !1;
      }
    return this.toString() === i.toString();
  }
}
a.NUMBER_REGEX = /^(-?)(\d*)\.?(\d*)(e(-?\d+))?$/;
export {
  a as FormattableNumber
};
//# sourceMappingURL=vue3-components6.js.map
