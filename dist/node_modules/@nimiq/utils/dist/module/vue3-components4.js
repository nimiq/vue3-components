class e {
  constructor(a, s, D, o) {
    if (!e.CURRENCY_CODE_REGEX.test(a))
      throw new Error(`Invalid currency code ${a}`);
    let R, E;
    typeof s == "number" ? R = s : typeof s == "string" ? E = s : typeof s == "object" && ({ decimals: R, name: D, symbol: o, locale: E } = s), this.code = a.toUpperCase();
    const N = this.code.substring(0, 2), r = [
      ...E ? [E] : [],
      `${navigator.language.substring(0, 2)}-${N}`,
      navigator.language,
      "en-US"
    ];
    let c = "DisplayNames" in Intl;
    [this.locale] = c ? Intl.DisplayNames.supportedLocalesOf(r) : Intl.NumberFormat.supportedLocalesOf(r), c && !this.locale && (c = !1, [this.locale] = Intl.NumberFormat.supportedLocalesOf(r));
    const T = R === void 0 && D === void 0 && o === void 0, h = `${this.code} ${this.locale}`, i = e.CACHED_AUTO_GENERATED_CURRENCY_INFOS[h];
    if (T && i)
      return i;
    let t;
    const n = {
      style: "currency",
      currency: a,
      useGrouping: !1,
      numberingSystem: "latn"
    };
    if (D !== void 0)
      this.name = D;
    else if (i)
      this.name = i.name;
    else if (c)
      try {
        this.name = new Intl.DisplayNames(this.locale, { type: "currency" }).of(a);
      } catch {
      }
    if (this.name || (t = e.failsafeNumberToLocaleString(0, this.locale, { currencyDisplay: "name", ...n }), this.name = t ? t.replace(e.NUMBER_REGEX, "").trim() : this.code), o !== void 0)
      this.symbol = o;
    else if (i)
      this.symbol = i.symbol;
    else {
      const l = e.EXTRA_SYMBOLS[this.code];
      if (typeof l == "string")
        this.symbol = l;
      else if (Array.isArray(l)) {
        const S = this.locale === E && e.RIGHT_TO_LEFT_DETECTION_REGEX.test(this.name);
        this.symbol = l[S ? 1 : 0];
      } else {
        const S = [
          ...E ? [E] : [],
          `en-${N}`,
          "en"
        ], m = e.failsafeNumberToLocaleString(0, S, { currencyDisplay: "narrowSymbol", ...n }) || e.failsafeNumberToLocaleString(0, S, { currencyDisplay: "symbol", ...n });
        m ? (t = m, this.symbol = t.replace(e.NUMBER_REGEX, "").trim()) : this.symbol = this.code;
      }
    }
    if (R !== void 0)
      this.decimals = R;
    else if (i)
      this.decimals = i.decimals;
    else if (e.CUSTOM_DECIMAL_LESS_CURRENCIES.has(this.code))
      this.decimals = 0;
    else if (t = t || e.failsafeNumberToLocaleString(0, "en", { currencyDisplay: "code", ...n }), t) {
      const l = t.match(e.NUMBER_REGEX);
      this.decimals = l ? (l[1] || "").length : 2;
    } else
      this.decimals = 2;
    T && (e.CACHED_AUTO_GENERATED_CURRENCY_INFOS[h] = this);
  }
  static failsafeNumberToLocaleString(a, s, D) {
    try {
      return a.toLocaleString(s, D);
    } catch {
      return null;
    }
  }
}
e.EXTRA_SYMBOLS = {
  AED: ["DH", "\u062F.\u0625"],
  AFN: ["Afs", "\u060B"],
  ALL: "L",
  ANG: "\u0192",
  AWG: "\u0192",
  BGN: "\u043B\u0432.",
  BHD: ["BD", ".\u062F.\u0628"],
  BTN: "Nu.",
  BYN: "Br",
  CDF: "Fr",
  CHF: "Fr.",
  CVE: "$",
  DJF: "Fr",
  DZD: ["DA", "\u062F.\u062C"],
  EGP: ["\xA3", "\u062C.\u0645"],
  ETB: "Br",
  HTG: "G",
  IQD: ["ID", "\u0639.\u062F"],
  IRR: ["RI", "\uFDFC"],
  JOD: ["JD", "\u062F.\u0627"],
  KES: "Sh",
  KGS: "\u20C0",
  KWD: ["KD", "\u062F.\u0643"],
  LBP: ["LL", "\u0644.\u0644"],
  LSL: "M",
  LYD: ["LD", "\u0644.\u062F"],
  MAD: ["DH", "\u062F\u0631\u0647\u0645"],
  MDL: "L",
  MKD: "\u0434\u0435\u043D",
  MMK: "Ks",
  MRU: "UM",
  MVR: ["Rf", ".\u0783"],
  MZN: "MT",
  NPR: "\u0930\u0941",
  OMR: ["R.O.", "\u0631.\u0639."],
  PAB: "B/.",
  PEN: "S/",
  PKR: "\u20A8",
  QAR: ["QR", "\u0631.\u0642"],
  RSD: "\u0434\u0438\u043D.",
  SAR: ["SR", "\uFDFC"],
  SDG: ["\xA3SD", "\u062C.\u0633."],
  SOS: "Sh.",
  TJS: "SM",
  TMT: "m",
  TND: ["DT", "\u062F.\u062A"],
  UZS: "\u0441\u0443\u043C",
  VES: "Bs.",
  WST: "T",
  XPF: "\u20A3",
  YER: ["RI", "\uFDFC"]
};
e.CUSTOM_DECIMAL_LESS_CURRENCIES = /* @__PURE__ */ new Set([
  "AMD",
  "AOA",
  "ARS",
  "BDT",
  "BTN",
  "CDF",
  "COP",
  "CRC",
  "CVE",
  "CZK",
  "DOP",
  "DZD",
  "GMD",
  "GYD",
  "HUF",
  "IDR",
  "INR",
  "JMD",
  "KES",
  "KGS",
  "KHR",
  "KZT",
  "LKR",
  "MAD",
  "MKD",
  "MNT",
  "MOP",
  "MWK",
  "MXN",
  "NGN",
  "NOK",
  "NPR",
  "PHP",
  "PKR",
  "RUB",
  "SEK",
  "TWD",
  "TZS",
  "UAH",
  "UYU",
  "UZS",
  "VES"
]);
e.CACHED_AUTO_GENERATED_CURRENCY_INFOS = {};
e.CURRENCY_CODE_REGEX = /[A-Z]{3}/i;
e.NUMBER_REGEX = /\d+(?:\D(\d+))?/;
e.RIGHT_TO_LEFT_DETECTION_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
export {
  e as CurrencyInfo
};
//# sourceMappingURL=vue3-components4.js.map
