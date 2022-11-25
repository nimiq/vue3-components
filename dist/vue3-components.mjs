import { defineComponent as Z, computed as Q, ref as E, watch as U, openBlock as l, createElementBlock as D, createElementVNode as x, normalizeClass as b, createTextVNode as J, toDisplayString as k, nextTick as it, withModifiers as ut, withDirectives as $t, normalizeStyle as xt, vModelText as ne, resolveComponent as G, createBlock as H, createCommentVNode as B, createVNode as $, createStaticVNode as Nt, onMounted as Mt, onBeforeUnmount as He, renderSlot as X, pushScopeId as jt, popScopeId as nt, resolveDynamicComponent as oe, withCtx as V, Fragment as K, renderList as et, h as ae, onUnmounted as ot, Transition as Wt, onBeforeUpdate as se, mergeProps as ge, getCurrentInstance as Ve, vModelRadio as Fe } from "vue";
class v {
  static getBrowserInfo() {
    return {
      browser: v.detectBrowser(),
      version: v.detectVersion(),
      isMobile: v.isMobile()
    };
  }
  static isMobile() {
    return /i?Phone|iP(ad|od)|Android|BlackBerry|Opera Mini|WPDesktop|Mobi(le)?|Silk/i.test(navigator.userAgent);
  }
  static detectBrowser() {
    if (v._detectedBrowser)
      return v._detectedBrowser;
    const e = navigator.userAgent;
    return /Edge\//i.test(e) ? v._detectedBrowser = v.Browser.EDGE : /(Opera|OPR)\//i.test(e) ? v._detectedBrowser = v.Browser.OPERA : /Firefox\//i.test(e) ? v._detectedBrowser = v.Browser.FIREFOX : /Chrome\//i.test(e) ? v._detectedBrowser = navigator.plugins.length === 0 && navigator.mimeTypes.length === 0 && !v.isMobile() ? v.Browser.BRAVE : v.Browser.CHROME : /^((?!chrome|android).)*safari/i.test(e) ? v._detectedBrowser = v.Browser.SAFARI : v._detectedBrowser = v.Browser.UNKNOWN, v._detectedBrowser;
  }
  static detectVersion() {
    if (typeof v._detectedVersion < "u")
      return v._detectedVersion;
    let e;
    switch (v.detectBrowser()) {
      case v.Browser.EDGE:
        e = /Edge\/(\S+)/i;
        break;
      case v.Browser.OPERA:
        e = /(Opera|OPR)\/(\S+)/i;
        break;
      case v.Browser.FIREFOX:
        e = /Firefox\/(\S+)/i;
        break;
      case v.Browser.CHROME:
        e = /Chrome\/(\S+)/i;
        break;
      case v.Browser.SAFARI:
        e = /(iP(hone|ad|od).*?OS |Version\/)(\S+)/i;
        break;
      case v.Browser.BRAVE:
      default:
        return v._detectedVersion = null, null;
    }
    const M = navigator.userAgent.match(e);
    if (!M)
      return v._detectedVersion = null, null;
    const u = M[M.length - 1].replace(/_/g, "."), i = u.split("."), I = [];
    for (let y = 0; y < 4; ++y)
      I.push(parseInt(i[y], 10) || 0);
    const [L, j, n, a] = I;
    return v._detectedVersion = { versionString: u, major: L, minor: j, build: n, patch: a }, v._detectedVersion;
  }
  static isChrome() {
    return v.detectBrowser() === v.Browser.CHROME;
  }
  static isFirefox() {
    return v.detectBrowser() === v.Browser.FIREFOX;
  }
  static isOpera() {
    return v.detectBrowser() === v.Browser.OPERA;
  }
  static isEdge() {
    return v.detectBrowser() === v.Browser.EDGE;
  }
  static isSafari() {
    return v.detectBrowser() === v.Browser.SAFARI;
  }
  static isBrave() {
    return v.detectBrowser() === v.Browser.BRAVE;
  }
  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  static isBadIOS() {
    const e = v.getBrowserInfo();
    return e.browser === v.Browser.SAFARI && e.isMobile && e.version && (e.version.major < 11 || e.version.major === 11 && e.version.minor === 2);
  }
  static isPrivateMode() {
    return new Promise((e) => {
      const M = () => e(!0), u = () => e(!1), i = () => /Constructor/.test(window.HTMLElement) || window.safari && window.safari.pushNotification && window.safari.pushNotification.toString() === "[object SafariRemoteNotification]";
      if (window.webkitRequestFileSystem) {
        window.webkitRequestFileSystem(0, 0, u, M);
        return;
      }
      if (document.documentElement && "MozAppearance" in document.documentElement.style) {
        const I = indexedDB.open(null);
        I.onerror = M, I.onsuccess = u;
        return;
      }
      if (i())
        try {
          window.openDatabase(null, null, null, null);
        } catch {
          M();
          return;
        }
      if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
        M();
        return;
      }
      u();
    });
  }
}
(function(t) {
  (function(e) {
    e.CHROME = "chrome", e.FIREFOX = "firefox", e.OPERA = "opera", e.EDGE = "edge", e.SAFARI = "safari", e.BRAVE = "brave", e.UNKNOWN = "unknown";
  })(t.Browser || (t.Browser = {}));
})(v || (v = {}));
var Je = v;
const Kt = Je;
class Rt {
  static copy(e) {
    const M = document.createElement("textarea");
    M.value = e, M.setAttribute("readonly", ""), M.style.contain = "strict", M.style.position = "absolute", M.style.left = "-9999px", M.style.fontSize = "12pt";
    const u = document.getSelection(), i = u.rangeCount > 0 ? u.getRangeAt(0) : null, I = document.activeElement && (document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA") ? document.activeElement : null;
    document.body.append(M), M.select(), M.selectionStart = 0, M.selectionEnd = e.length;
    let L = !1;
    try {
      L = document.execCommand("copy");
    } catch {
    }
    return M.remove(), I ? I.focus() : i && (u.removeAllRanges(), u.addRange(i)), L;
  }
}
function Xe(t) {
  const e = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(t)}=([^;]+)`));
  return e && decodeURIComponent(e[2]);
}
function Ke(t, e, M) {
  if (typeof t != "string")
    throw new Error("cookieName must be a string");
  if (typeof e != "string")
    throw new Error("cookieValue must be a string");
  const u = [`${encodeURIComponent(t)}=${encodeURIComponent(e)}`];
  if (M) {
    if (typeof M != "object")
      throw new Error("options must be an object");
    if (M.path && typeof M.path != "string")
      throw new Error("options.path must be a string");
    if (M.domain && typeof M.domain != "string")
      throw new Error("options.domain must be a string");
    if (M.maxAge && typeof M.maxAge != "number")
      throw new Error("options.maxAge must be a number");
    if (M.expires && typeof M.expires != "string")
      throw new Error("options.expires must be a string");
    if (M.samesite && !["lax", "strict", "none"].includes(M.samesite))
      throw new Error('options.samesite must be either "lax", "strict" or "none"');
    M.path && u.push(`path=${M.path}`), M.secure && u.push("secure"), M.domain && u.push(`domain=${M.domain}`), M.maxAge && u.push(`max-age=${M.maxAge}`), M.expires && u.push(`expires=${M.expires}`), M.samesite && u.push(`samesite=${M.samesite}`);
  }
  const i = u.join(";");
  return document.cookie = i, i;
}
function qe(t) {
  document.cookie = `${encodeURIComponent(t)}=;max-age=0`;
}
var tM = /* @__PURE__ */ Object.freeze({
  getCookie: Xe,
  setCookie: Ke,
  unsetCookie: qe
});
class W {
  constructor(e, M, u, i) {
    if (!W.CURRENCY_CODE_REGEX.test(e))
      throw new Error(`Invalid currency code ${e}`);
    let I, L;
    typeof M == "number" ? I = M : typeof M == "string" ? L = M : typeof M == "object" && ({ decimals: I, name: u, symbol: i, locale: L } = M), this.code = e.toUpperCase();
    const j = this.code.substring(0, 2), n = [
      ...L ? [L] : [],
      `${navigator.language.substring(0, 2)}-${j}`,
      navigator.language,
      "en-US"
    ];
    let a = "DisplayNames" in Intl;
    [this.locale] = a ? Intl.DisplayNames.supportedLocalesOf(n) : Intl.NumberFormat.supportedLocalesOf(n), a && !this.locale && (a = !1, [this.locale] = Intl.NumberFormat.supportedLocalesOf(n));
    const y = I === void 0 && u === void 0 && i === void 0, s = `${this.code} ${this.locale}`, o = W.CACHED_AUTO_GENERATED_CURRENCY_INFOS[s];
    if (y && o)
      return o;
    let r;
    const S = {
      style: "currency",
      currency: e,
      useGrouping: !1,
      numberingSystem: "latn"
    };
    if (u !== void 0)
      this.name = u;
    else if (o)
      this.name = o.name;
    else if (a)
      try {
        this.name = new Intl.DisplayNames(this.locale, { type: "currency" }).of(e);
      } catch {
      }
    if (this.name || (r = W.failsafeNumberToLocaleString(0, this.locale, { currencyDisplay: "name", ...S }), this.name = r ? r.replace(W.NUMBER_REGEX, "").trim() : this.code), i !== void 0)
      this.symbol = i;
    else if (o)
      this.symbol = o.symbol;
    else {
      const N = W.EXTRA_SYMBOLS[this.code];
      if (typeof N == "string")
        this.symbol = N;
      else if (Array.isArray(N)) {
        const C = this.locale === L && W.RIGHT_TO_LEFT_DETECTION_REGEX.test(this.name);
        this.symbol = N[C ? 1 : 0];
      } else {
        const C = [
          ...L ? [L] : [],
          `en-${j}`,
          "en"
        ], z = W.failsafeNumberToLocaleString(0, C, { currencyDisplay: "narrowSymbol", ...S }) || W.failsafeNumberToLocaleString(0, C, { currencyDisplay: "symbol", ...S });
        z ? (r = z, this.symbol = r.replace(W.NUMBER_REGEX, "").trim()) : this.symbol = this.code;
      }
    }
    if (I !== void 0)
      this.decimals = I;
    else if (o)
      this.decimals = o.decimals;
    else if (W.CUSTOM_DECIMAL_LESS_CURRENCIES.has(this.code))
      this.decimals = 0;
    else if (r = r || W.failsafeNumberToLocaleString(0, "en", { currencyDisplay: "code", ...S }), r) {
      const N = r.match(W.NUMBER_REGEX);
      this.decimals = N ? (N[1] || "").length : 2;
    } else
      this.decimals = 2;
    y && (W.CACHED_AUTO_GENERATED_CURRENCY_INFOS[s] = this);
  }
  static failsafeNumberToLocaleString(e, M, u) {
    try {
      return e.toLocaleString(M, u);
    } catch {
      return null;
    }
  }
}
W.EXTRA_SYMBOLS = {
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
W.CUSTOM_DECIMAL_LESS_CURRENCIES = /* @__PURE__ */ new Set([
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
W.CACHED_AUTO_GENERATED_CURRENCY_INFOS = {};
W.CURRENCY_CODE_REGEX = /[A-Z]{3}/i;
W.NUMBER_REGEX = /\d+(?:\D(\d+))?/;
W.RIGHT_TO_LEFT_DETECTION_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
var at;
(function(t) {
  t.NIM = "nim", t.BTC = "btc", t.ETH = "eth";
})(at || (at = {}));
var ft;
(function(t) {
  t.AED = "aed", t.ARS = "ars", t.AUD = "aud", t.BDT = "bdt", t.BHD = "bhd", t.BMD = "bmd", t.BRL = "brl", t.CAD = "cad", t.CHF = "chf", t.CLP = "clp", t.CNY = "cny", t.CZK = "czk", t.DKK = "dkk", t.EUR = "eur", t.GBP = "gbp", t.HKD = "hkd", t.HUF = "huf", t.IDR = "idr", t.ILS = "ils", t.INR = "inr", t.JPY = "jpy", t.KRW = "krw", t.KWD = "kwd", t.LKR = "lkr", t.MMK = "mmk", t.MXN = "mxn", t.MYR = "myr", t.NOK = "nok", t.NGN = "ngn", t.NZD = "nzd", t.PHP = "php", t.PKR = "pkr", t.PLN = "pln", t.RUB = "rub", t.SAR = "sar", t.SEK = "sek", t.SGD = "sgd", t.THB = "thb", t.TRY = "try", t.TWD = "twd", t.UAH = "uah", t.USD = "usd", t.VND = "vnd", t.ZAR = "zar";
})(ft || (ft = {}));
const eM = "https://api.coingecko.com/api/v3", qt = {
  [at.NIM]: "nimiq-2",
  [at.BTC]: "bitcoin",
  [at.ETH]: "ethereum"
};
async function MM(t, e) {
  t = t.map((i) => i.toLowerCase());
  const M = t.map((i) => qt[i]), u = await iM(`${eM}/simple/price?ids=${M.join(",")}&vs_currencies=${e.join(",")}`);
  return t.reduce((i, I) => ({
    ...i,
    [I]: u[qt[I]]
  }), {});
}
async function iM(t, e) {
  let M = null;
  do {
    let u = !0;
    try {
      const i = await fetch(t, e);
      if (!i.ok)
        throw i.status === 400 ? (u = !1, new Error("400 - Bad request")) : new Error(`Failed to fetch: ${i.status}. Retrying...`);
      M = await i.json();
    } catch (i) {
      if (u)
        await new Promise((I) => setTimeout(I, 15e3));
      else
        throw i;
    }
  } while (!M);
  return M;
}
class It {
  constructor(e) {
    typeof e != "string" && (e = e.toString());
    const M = e.match(It.NUMBER_REGEX);
    if (!M)
      throw new Error(`${e} is not a valid number`);
    if (this._sign = M[1], this._digits = `${M[2]}${M[3]}`, !this._digits)
      throw new Error(`${e} is not a valid number`);
    this._decimalSeparatorPosition = M[2].length;
    const u = Number.parseInt(M[5], 10);
    u && this.moveDecimalSeparator(u);
  }
  toString(e) {
    let { maxDecimals: M = void 0, minDecimals: u = void 0, useGrouping: i = e === !0, groupSeparator: I = "\u202F" } = typeof e == "object" ? e : {};
    M !== void 0 && u !== void 0 && (u = Math.min(u, M)), M !== void 0 && M < this._digits.length - this._decimalSeparatorPosition && this.round(M);
    let L = this._digits.slice(0, this._decimalSeparatorPosition).replace(/^0+/, ""), j = this._digits.slice(this._decimalSeparatorPosition).replace(/0+$/, "");
    return u !== void 0 && u > j.length && (j = j.padEnd(u, "0")), i && I && L.length > 4 && (L = L.replace(/(\d)(?=(\d{3})+$)/g, `$1${I}`)), `${this._sign}${L || "0"}${j ? `.${j}` : ""}`;
  }
  valueOf() {
    return this.toString();
  }
  moveDecimalSeparator(e) {
    return this._decimalSeparatorPosition += e, this._decimalSeparatorPosition > this._digits.length ? this._digits = this._digits.padEnd(this._decimalSeparatorPosition, "0") : this._decimalSeparatorPosition < 0 && (this._digits = this._digits.padStart(this._digits.length - this._decimalSeparatorPosition, "0"), this._decimalSeparatorPosition = 0), this;
  }
  round(e) {
    if (this._digits.length - this._decimalSeparatorPosition <= e)
      return this;
    const M = this._decimalSeparatorPosition + e, u = this._digits.substring(0, M).padEnd(this._decimalSeparatorPosition, "0");
    if (Number.parseInt(this._digits[M], 10) < 5)
      return this._digits = u, this;
    const i = `0${u}`.split(""), I = M;
    for (let L = I; L >= 0; --L) {
      const j = Number.parseInt(i[L], 10) + 1;
      if (j < 10) {
        i[L] = j.toString();
        break;
      } else
        i[L] = "0";
    }
    return this._digits = i.join(""), this._decimalSeparatorPosition += 1, this;
  }
  equals(e) {
    if (!(e instanceof It))
      try {
        e = new It(e);
      } catch {
        return !1;
      }
    return this.toString() === e.toString();
  }
}
It.NUMBER_REGEX = /^(-?)(\d*)\.?(\d*)(e(-?\d+))?$/;
class gt {
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
    for (let M = 0; M < e.length; M++)
      if (!gt.NIMIQ_ALPHABET.includes(e[M]))
        return !1;
    return !0;
  }
  static _ibanCheck(e) {
    const M = e.split("").map((i) => {
      const I = i.toUpperCase().charCodeAt(0);
      return I >= 48 && I <= 57 ? i : (I - 55).toString();
    }).join("");
    let u = "";
    for (let i = 0; i < Math.ceil(M.length / 6); i++)
      u = (parseInt(u + M.substr(i * 6, 6), 10) % 97).toString();
    return parseInt(u, 10);
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
class lt {
  constructor(e = 0, M = e, u = 0, i = Date.now(), I = lt.Easing.EASE_IN_OUT_CUBIC) {
    this.targetValue = e, this.startValue = M, this.tweenTime = u, this.startTime = i, this.easing = I;
  }
  get currentValue() {
    const e = this.easing(this.progress);
    return this.startValue + (this.targetValue - this.startValue) * e;
  }
  get progress() {
    return this.tweenTime === 0 ? 1 : Math.min(1, (Date.now() - this.startTime) / this.tweenTime);
  }
  get finished() {
    return this.progress === 1;
  }
  tweenTo(e, M = this.tweenTime) {
    e !== this.targetValue && (this.startValue = this.currentValue, this.targetValue = e, this.startTime = Date.now(), this.tweenTime = M);
  }
}
(function(t) {
  t.Easing = {
    LINEAR: (e) => e,
    EASE_IN_OUT_CUBIC: (e) => e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
  };
})(lt || (lt = {}));
var uM = lt;
const kt = uM;
class St {
  static stringToUtf8ByteArray(e) {
    if (typeof TextEncoder < "u")
      return new TextEncoder().encode(e);
    const M = [];
    let u = 0;
    for (let i = 0; i < e.length; i++) {
      let I = e.charCodeAt(i);
      I < 128 ? M[u++] = I : I < 2048 ? (M[u++] = I >> 6 | 192, M[u++] = I & 63 | 128) : (I & 64512) == 55296 && i + 1 < e.length && (e.charCodeAt(i + 1) & 64512) == 56320 ? (I = 65536 + ((I & 1023) << 10) + (e.charCodeAt(++i) & 1023), M[u++] = I >> 18 | 240, M[u++] = I >> 12 & 63 | 128, M[u++] = I >> 6 & 63 | 128, M[u++] = I & 63 | 128) : (M[u++] = I >> 12 | 224, M[u++] = I >> 6 & 63 | 128, M[u++] = I & 63 | 128);
    }
    return new Uint8Array(M);
  }
  static utf8ByteArrayToString(e) {
    if (typeof TextDecoder < "u")
      return new TextDecoder("utf-8").decode(e);
    const M = [];
    let u = 0, i = 0;
    for (; u < e.length; ) {
      const I = e[u++];
      if (I < 128)
        M[i++] = String.fromCharCode(I);
      else if (I > 191 && I < 224) {
        const L = e[u++];
        M[i++] = String.fromCharCode((I & 31) << 6 | L & 63);
      } else if (I > 239 && I < 365) {
        const L = e[u++], j = e[u++], n = e[u++], a = ((I & 7) << 18 | (L & 63) << 12 | (j & 63) << 6 | n & 63) - 65536;
        M[i++] = String.fromCharCode(55296 + (a >> 10)), M[i++] = String.fromCharCode(56320 + (a & 1023));
      } else {
        const L = e[u++], j = e[u++];
        M[i++] = String.fromCharCode((I & 15) << 12 | (L & 63) << 6 | j & 63);
      }
    }
    return M.join("");
  }
  static isValidUtf8(e, M = !1) {
    const u = [
      9,
      10,
      13
    ];
    if (typeof TextDecoder < "u")
      try {
        const L = new TextDecoder("utf-8", { fatal: !0 }).decode(e);
        if (!M)
          return !0;
        const j = L.match(/[\u0000-\u001F\u007F]/gu);
        return j ? j.every((n) => u.includes(n.charCodeAt(0))) : !0;
      } catch {
        return !1;
      }
    let i = 0;
    for (; i < e.length; ) {
      const I = e.length - i, L = e[i];
      if (L <= 127)
        if (L >= 32 && L <= 126)
          ++i;
        else if (!M)
          ++i;
        else if (u.indexOf(L) > -1)
          ++i;
        else
          break;
      else if (L >= 194 && L <= 223 && I >= 2) {
        const j = e[++i];
        if (j >= 128 && j <= 191)
          ++i;
        else
          break;
      } else if (L === 224 && I >= 3) {
        const j = e[++i], n = e[++i];
        if (j >= 160 && j <= 191 && n >= 128 && n <= 191)
          ++i;
        else
          break;
      } else if (L >= 225 && L <= 236 && I >= 3) {
        const j = e[++i], n = e[++i];
        if (j >= 128 && j <= 191 && n >= 128 && n <= 191)
          ++i;
        else
          break;
      } else if (L === 237 && I >= 3) {
        const j = e[++i], n = e[++i];
        if (j >= 128 && j <= 159 && n >= 128 && n <= 191)
          ++i;
        else
          break;
      } else if (L >= 238 && L <= 239 && I >= 3) {
        const j = e[++i], n = e[++i];
        if (j >= 128 && j <= 191 && n >= 128 && n <= 191)
          ++i;
        else
          break;
      } else if (L === 240 && I >= 4) {
        const j = e[++i], n = e[++i], a = e[++i];
        if (j >= 144 && j <= 191 && n >= 128 && n <= 191 && a >= 128 && a <= 191)
          ++i;
        else
          break;
      } else if (L >= 241 && L <= 243 && I >= 4) {
        const j = e[++i], n = e[++i], a = e[++i];
        if (j >= 128 && j <= 191 && n >= 128 && n <= 191 && a >= 128 && a <= 191)
          ++i;
        else
          break;
      } else if (L === 244 && I >= 4) {
        const j = e[++i], n = e[++i], a = e[++i];
        if (j >= 128 && j <= 143 && n >= 128 && n <= 191 && a >= 128 && a <= 191)
          ++i;
        else
          break;
      } else
        break;
    }
    return i === e.length;
  }
  static truncateToUtf8ByteLength(e, M, u = !0) {
    if (M < 0)
      throw new Error("Invalid byte length");
    let i;
    if (typeof e == "string" ? i = St.stringToUtf8ByteArray(e) : i = e, i.length <= M)
      return {
        result: e,
        didTruncate: !1
      };
    const I = [226, 128, 166];
    for (M < I.length && (u = !1), i = i.subarray(0, M - (u ? I.length : 0)); !St.isValidUtf8(i); )
      i = i.subarray(0, i.length - 1);
    return u && (i = new Uint8Array(i.buffer, i.byteOffset, i.length + I.length), typeof e != "string" && (i = new Uint8Array(i)), i.set(I, i.length - I.length)), {
      result: typeof e == "string" ? St.utf8ByteArrayToString(i) : i,
      didTruncate: !0
    };
  }
}
class Tt {
  static async svg(e) {
    const M = LM(e);
    return this._svgTemplate(M[0], M[2], M[3] + M[4], M[5] + M[6], M[7] + M[8], M[9] + M[10], M[11]);
  }
  static async render(e, M) {
    M.innerHTML = await this.svg(e);
  }
  static async toDataUrl(e) {
    return `data:image/svg+xml;base64,${this._btoa(await this.svg(e, !0))}`;
  }
  static placeholder(e = "#bbb", M = 1) {
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
<path fill="none" stroke="${e}" stroke-width="${2 * M}" transform="translate(0, 8) scale(0.5)" d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>
<g transform="scale(0.9) translate(9, 8)">
<circle cx="80" cy="80" r="40" fill="none" stroke="${e}" stroke-width="${M}" opacity=".9"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
</g></svg>`;
  }
  static renderPlaceholder(e, M, u) {
    e.innerHTML = this.placeholder(M, u);
  }
  static placeholderToDataUrl(e, M) {
    return `data:image/svg+xml;base64,${this._btoa(this.placeholder(e, M))}`;
  }
  static async image(e) {
    const M = await this.toDataUrl(e), u = await this._loadImage(M);
    return u.style.width = "100%", u.style.height = "100%", u;
  }
  static async _svgTemplate(e, M, u, i, I, L, j) {
    return this._$svg(await this._$identicons(e, M, u, i, I, L, j));
  }
  static async _$identicons(e, M, u, i, I, L, j) {
    const n = nM(e, M, j);
    return e = n.main, M = n.background, `<g color="${e}" fill="${j = n.accent}">
<rect fill="${M}" x="0" y="0" width="160" height="160"/>
<circle cx="80" cy="80" r="40" fill="${e}"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
${await this._generatePart("top", i)}
${await this._generatePart("side", I)}
${await this._generatePart("face", u)}
${await this._generatePart("bottom", L)}
</g>`;
  }
  static _$svg(e) {
    const M = this._getRandomId();
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="hexagon-clip-${M}">
<path d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z" transform="scale(0.5) translate(0, 16)"/>
</clipPath></defs>
<g clip-path="url(#hexagon-clip-${M})">
${e}
</g></svg>`;
  }
  static async _generatePart(e, M) {
    const u = await this._getAssets(), i = e + "_" + this._assetIndex(M, e), I = u.getElementById(i);
    return I ? I.innerHTML : "";
  }
  static _loadImage(e) {
    return new Promise((M, u) => {
      const i = document.createElement("img");
      i.addEventListener("load", (I) => M(i), { once: !0 }), i.src = e;
    });
  }
  static async _getAssets() {
    return this._assetsPromise || (this._assetsPromise = new Promise(async function(e) {
      let M;
      if (M = typeof IdenticonsAssets < "u" ? IdenticonsAssets : await fetch(self.NIMIQ_IDENTICONS_SVG_PATH || Tt.svgPath).then((u) => u.text()), typeof DOMParser != "function") {
        if (typeof module > "u" || !module.exports)
          throw new Error("No DOMParser available");
        global.DOMParser = require("dom-parser");
      }
      e(new DOMParser().parseFromString(M, "image/svg+xml"));
    }));
  }
  static _btoa(e) {
    if (typeof btoa == "function")
      return btoa(e);
    if (typeof module < "u" && module.exports)
      return Buffer.from(e).toString("base64");
    throw new Error("No btoa or equivalent available");
  }
  static _assetIndex(e, M) {
    return (e = Number(e) % 21 + 1) < 10 && (e = "0" + e), e;
  }
  static _getRandomId() {
    return Math.floor(256 * Math.random());
  }
}
Tt.svgPath = "/node_modules/@nimiq/identicons/dist/identicons.min.svg";
function LM(t) {
  const e = ("" + t.split("").map((M) => Number(M.charCodeAt(0)) + 3).reduce((M, u) => M * (1 - M) * IM(u), 0.5)).split("").reduce((M, u) => u + M, "");
  return jM(e.replace(".", e[5]).substr(4, 17), 13, e[5]);
}
function IM(t) {
  let e = 1 / t;
  for (let M = 0; M < 100; M++)
    e = (1 - e) * e * 3.569956786876;
  return e;
}
function jM(t, e, M) {
  if (String.prototype.padEnd)
    return t.padEnd(e, M);
  for (; t.length < e; )
    t += M;
  return t.substring(0, Math.max(t.length, e));
}
function nM(t, e, M) {
  return aM(oM(t, e, M));
}
function oM(t, e, M) {
  for (t = parseInt(t, 10), e = parseInt(e, 10), M = parseInt(M, 10), t === e && ++t > 9 && (t = 0); M === t || M === e; )
    ++M > 9 && (M = 0);
  return { main: t, background: e, accent: M };
}
function aM(t) {
  return { main: te[t.main], background: sM[t.background], accent: te[t.accent] };
}
const te = ["#FC8702", "#D94432", "#E9B213", "#1A5493", "#0582CA", "#5961A8", "#21BCA5", "#FA7268", "#88B04B", "#795548"], sM = ["#FC8702", "#D94432", "#E9B213", "#1F2348", "#0582CA", "#5F4B8B", "#21BCA5", "#FA7268", "#88B04B", "#795548"], gM = Z({
  name: "Identicon",
  props: {
    address: {
      required: !0,
      type: String
    }
  },
  setup(t, e) {
    function M(j) {
      return j.replace(/[\+ ]/g, "").toUpperCase().match(/.{4}/g).join(" ");
    }
    function u(j) {
      return gt.isValidAddress(j);
    }
    const i = Q(() => 'data:image/svg+xml,<svg width="64" height="64" viewBox="0 -4 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".1" d="M62.3 25.4L49.2 2.6A5.3 5.3 0 0 0 44.6 0H18.4c-1.9 0-3.6 1-4.6 2.6L.7 25.4c-1 1.6-1 3.6 0 5.2l13.1 22.8c1 1.6 2.7 2.6 4.6 2.6h26.2c1.9 0 3.6-1 4.6-2.6l13-22.8c1-1.6 1-3.6.1-5.2z" fill="url(%23identicon_radial)"/><defs><radialGradient id="identicon_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-63.0033 0 0 -56 63 56)"><stop stop-color="%23260133"/><stop offset="1" stop-color="%231F2348"/></radialGradient></defs></svg>'), I = E(i.value);
    U(() => t.address, L, { immediate: !0 });
    async function L(j, n) {
      return t.address && u(t.address) ? (Tt.svgPath = (await Promise.resolve().then(() => hj)).default, I.value = await Tt.toDataUrl(M(t.address))) : I.value = i.value, !0;
    }
    return e.expose({
      formatAddress: M,
      isUserFriendlyAddress: u
    }), { dataUrl: I };
  }
});
const _ = (t, e) => {
  const M = t.__vccOpts || t;
  for (const [u, i] of e)
    M[u] = i;
  return M;
}, NM = { class: "identicon" }, cM = ["src"];
function yM(t, e, M, u, i, I) {
  return l(), D("div", NM, [
    x("img", { src: t.dataUrl }, null, 8, cM)
  ]);
}
const Ne = /* @__PURE__ */ _(gM, [["render", yM], ["__scopeId", "data-v-7c2b0509"]]);
function Ht(t) {
  return typeof t == "number" || typeof t == "bigint" || t && t.constructor && t.constructor.name.endsWith("Integer");
}
const rM = Z({
  name: "Amount",
  props: {
    amount: {
      required: !0,
      validator: Ht,
      type: Number
    },
    decimals: Number,
    minDecimals: {
      type: Number,
      default: 2
    },
    maxDecimals: {
      type: Number,
      default: 5
    },
    showApprox: {
      type: Boolean,
      default: !1
    },
    currency: {
      type: String,
      default: "nim"
    },
    currencyDecimals: {
      type: Number,
      default: 5
    }
  },
  setup(t, e) {
    function M(L) {
      if (!(t.decimals !== void 0 && L !== t.decimals) && L !== void 0 && (L < 0 || L > t.currencyDecimals || !Number.isInteger(L)))
        throw new Error("Amount: decimals is not in range");
    }
    U(() => t.minDecimals, M, { immediate: !0 }), U(() => t.maxDecimals, M, { immediate: !0 }), U(() => t.decimals, M, { immediate: !0 });
    const u = Q(() => {
      let L, j;
      return typeof t.decimals == "number" ? L = j = t.decimals : (L = t.minDecimals, j = t.maxDecimals), new It(t.amount).moveDecimalSeparator(-t.currencyDecimals).toString({ maxDecimals: j, minDecimals: L, useGrouping: !0 });
    }), i = Q(() => !new It(t.amount).moveDecimalSeparator(-t.currencyDecimals).equals(u.value.replace(/\s/g, ""))), I = Q(() => t.currency === "tnim" ? "tNIM" : t.currency === "mbtc" ? "mBTC" : t.currency === "tbtc" ? "tBTC" : t.currency.toUpperCase());
    return {
      formattedAmount: u,
      isApprox: i,
      ticker: I
    };
  }
});
function SM(t, e, M, u, i, I) {
  return l(), D("span", {
    class: b(["amount", { approx: t.showApprox && t.isApprox }])
  }, [
    J(k(t.formattedAmount) + " ", 1),
    x("span", {
      class: b(["currency", t.currency])
    }, k(t.ticker), 3)
  ], 2);
}
const mt = /* @__PURE__ */ _(rM, [["render", SM], ["__scopeId", "data-v-3134b609"]]), lM = (t, e) => {
  const M = t[e];
  return M ? typeof M == "function" ? M() : Promise.resolve(M) : new Promise((u, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
}, Vt = "en", ce = [
  Vt,
  "de",
  "es",
  "fr",
  "nl",
  "ru",
  "uk",
  "zh"
], st = E(ye()), ht = {}, TM = [];
function AM(t) {
  if (ce.includes(t) || (t = Vt), t !== st.value) {
    st.value = t;
    for (const e of Object.keys(TM))
      re(e);
  }
}
function ye() {
  let M = tM.getCookie("lang") || "en";
  return ce.includes(M) || (M = Vt), M;
}
async function re(t) {
  const e = st.value + "-" + t;
  if (!(e in ht) && st.value !== "en") {
    const M = await lM(/* @__PURE__ */ Object.assign({}), `./${st}/${t}.json`);
    ht[e] = M.default || {};
  }
}
function DM(t, e, M, u) {
  let i;
  typeof M == "string" ? i = M : (i = st.value, u = M);
  const I = `${i}-${t}`;
  let L = ht[I] && ht[I][e] || e;
  return (typeof u == "object" || Array.isArray(u)) && (L = L.replace(/{(\w+?)}/g, (j, n) => u[n].toString() || j)), L;
}
function q(t) {
  return re(t), DM.bind(void 0, t);
}
window.addEventListener("focus", () => AM(ye()));
var pt = /* @__PURE__ */ ((t) => (t.MODELVALUE_UPDATE = "update:modelValue", t.CHANGED = "changed", t.PASTE = "paste", t))(pt || {});
const dM = Z({
  name: "LabelInput",
  emits: Object.values(pt),
  props: {
    maxBytes: Number,
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: String,
    vanishing: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: q("LabelInput") },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(null), I = E(""), L = E(""), j = E(""), n = E(50);
    function a() {
      M.value && M.value.focus();
    }
    function y() {
      if (t.maxBytes) {
        if (St.stringToUtf8ByteArray(I.value).byteLength > t.maxBytes) {
          I.value = L.value;
          return;
        }
        L.value = I.value;
      }
      e.emit("update:modelValue", I.value);
    }
    function s() {
      I.value !== j.value && (e.emit("changed", I.value), j.value = I.value, M.value && M.value.blur());
    }
    U(() => t.modelValue, o, { immediate: !0 });
    function o(S) {
      I.value = S, L.value = I.value, j.value = L.value;
    }
    U(I, r, { immediate: !0 });
    async function r() {
      if (await it(), !u.value || !i.value || !M.value)
        return;
      const S = u.value.offsetWidth, N = i.value.offsetWidth, C = parseFloat(window.getComputedStyle(M.value, null).getPropertyValue("font-size"));
      n.value = (I.value.length ? N : S) + C / 3;
    }
    return e.expose({ focus: a }), {
      input$: M,
      widthPlaceholder$: u,
      widthValue$: i,
      liveValue: I,
      width: n,
      onInput: y,
      onBlur: s,
      LabelInputEvent: pt
    };
  }
});
const xM = ["placeholder", "disabled"];
function CM(t, e, M, u, i, I) {
  return l(), D("form", {
    class: b(["label-input", { disabled: t.disabled }]),
    onSubmit: e[4] || (e[4] = ut((...L) => t.onBlur && t.onBlur(...L), ["prevent"]))
  }, [
    x("span", {
      class: "width-finder width-placeholder",
      ref: "widthPlaceholder$"
    }, k(t.placeholder || t.$t("Name your address")), 513),
    x("span", {
      class: "width-finder width-value",
      ref: "widthValue$"
    }, k(t.liveValue), 513),
    $t(x("input", {
      type: "text",
      class: b(["nq-input", { vanishing: t.vanishing }]),
      placeholder: t.placeholder || t.$t("Name your address"),
      style: xt({ width: `${t.width}px` }),
      "onUpdate:modelValue": e[0] || (e[0] = (L) => t.liveValue = L),
      disabled: t.disabled,
      onInput: e[1] || (e[1] = (...L) => t.onInput && t.onInput(...L)),
      onBlur: e[2] || (e[2] = (...L) => t.onBlur && t.onBlur(...L)),
      onPaste: e[3] || (e[3] = (L) => t.$emit(t.LabelInputEvent.PASTE, L)),
      ref: "input$"
    }, null, 46, xM), [
      [ne, t.liveValue]
    ])
  ], 34);
}
const EM = /* @__PURE__ */ _(dM, [["render", CM], ["__scopeId", "data-v-b35a7398"]]);
var Se = /* @__PURE__ */ ((t) => (t.CHANGED = "changed", t))(Se || {}), le = /* @__PURE__ */ ((t) => (t.ROW = "row", t.COLUMN = "column", t))(le || {});
const zM = Z({
  name: "Account",
  emits: Object.values(Se),
  props: {
    label: {
      type: String,
      required: !0
    },
    displayAsCashlink: {
      type: Boolean,
      default: !1
    },
    decimals: {
      type: Number,
      default: 2
    },
    layout: {
      type: String,
      default: "row",
      validator: (t) => Object.values(le).includes(t)
    },
    editable: {
      type: Boolean,
      default: !1
    },
    address: String,
    image: String,
    placeholder: String,
    walletLabel: String,
    balance: Number
  },
  setup: (t, e) => {
    const M = E(null), u = E(!!t.image);
    function i() {
      t.editable && M.value && M.value.focus();
    }
    function I(n) {
      e.emit("changed", n);
    }
    U(() => t.image, () => {
      u.value = !!t.image;
    }, { immediate: !0 });
    function L() {
      return t.address ? gt.isValidAddress(t.address) : !1;
    }
    function j() {
      return gt.isValidAddress(t.label);
    }
    return e.expose({ focus: i }), {
      label$: M,
      showImage: u,
      isNimiqAddress: L,
      isLabelNimiqAddress: j,
      onModelValueUpdate: I
    };
  },
  components: {
    Identicon: Ne,
    Amount: mt,
    LabelInput: EM
  }
});
const wM = { class: "identicon-and-label" }, hM = ["src"], mM = {
  key: 1,
  class: "identicon"
}, OM = /* @__PURE__ */ Nt('<div class="nq-blue-bg" data-v-404555aa><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="white" stroke-linecap="round" stroke-width="2.5" data-v-404555aa><path d="M40.25 23.25v-.5a6.5 6.5 0 0 0-6.5-6.5h-3.5a6.5 6.5 0 0 0-6.5 6.5v6.5a6.5 6.5 0 0 0 6.5 6.5h2" data-v-404555aa></path><path d="M23.75 40.75v.5a6.5 6.5 0 0 0 6.5 6.5h3.5a6.5 6.5 0 0 0 6.5-6.5v-6.5a6.5 6.5 0 0 0-6.5-6.5h-2" data-v-404555aa></path><path d="M32 11.25v4M32 48.75v4" data-v-404555aa></path></svg></div>', 1), vM = [
  OM
], YM = {
  key: 5,
  class: "nq-label wallet-label"
};
function fM(t, e, M, u, i, I) {
  const L = G("Identicon"), j = G("LabelInput"), n = G("Amount");
  return l(), D("div", {
    class: b(["account", [{ editable: t.editable }, t.layout, { cashlink: t.displayAsCashlink }]])
  }, [
    x("div", wM, [
      t.showImage ? (l(), D("img", {
        key: 0,
        class: "identicon account-image",
        src: t.image,
        onError: e[0] || (e[0] = (a) => t.showImage = !1)
      }, null, 40, hM)) : t.displayAsCashlink ? (l(), D("div", mM, vM)) : t.isNimiqAddress() ? (l(), H(L, {
        key: 2,
        address: t.address
      }, null, 8, ["address"])) : B("", !0),
      t.editable ? (l(), D("div", {
        key: 4,
        class: b(["label editable", { "address-font": t.isLabelNimiqAddress() }])
      }, [
        $(j, {
          ref: "label$",
          maxBytes: 63,
          value: t.label,
          placeholder: t.placeholder,
          "onUpdate:modelValue": t.onModelValueUpdate
        }, null, 8, ["value", "placeholder", "onUpdate:modelValue"])
      ], 2)) : (l(), D("div", {
        key: 3,
        class: b(["label", { "address-font": t.isLabelNimiqAddress() }])
      }, k(t.label), 3)),
      t.layout === "column" && t.walletLabel ? (l(), D("div", YM, k(t.walletLabel), 1)) : B("", !0)
    ]),
    t.balance || t.balance === 0 ? (l(), H(n, {
      key: 0,
      class: "balance",
      amount: t.balance,
      decimals: t.decimals
    }, null, 8, ["amount", "decimals"])) : B("", !0)
  ], 2);
}
const Ft = /* @__PURE__ */ _(zM, [["render", fM], ["__scopeId", "data-v-404555aa"]]), kM = 800, pM = Z({
  name: "Copyable",
  props: {
    text: String
  },
  methods: { $t: q("Copyable") },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(!1), I = E(null);
    function L() {
      let n = t.text;
      if (!n && M.value && u.value) {
        const a = u.value.textContent;
        n = M.value.innerText.replace(new RegExp(`\\s*${a}$`), "");
      }
      n && Rt.copy(n), window.clearTimeout(I.value), i.value = !0, I.value = window.setTimeout(() => {
        i.value = !1;
      }, kM);
    }
    function j(n) {
      (n.key === " " || n.key === "Enter") && L();
    }
    return Mt(() => M.value.addEventListener("keydown", j)), He(() => M.value.removeEventListener("keydown", j)), {
      root$: M,
      tooltip$: u,
      copied: i,
      copy: L
    };
  }
});
const UM = (t) => (jt("data-v-57319f65"), t = t(), nt(), t), bM = /* @__PURE__ */ UM(() => /* @__PURE__ */ x("div", { class: "background" }, null, -1));
function QM(t, e, M, u, i, I) {
  return l(), D("div", {
    class: b(["copyable", { copied: t.copied }]),
    onClick: e[0] || (e[0] = (...L) => t.copy && t.copy(...L)),
    tabindex: "0",
    ref: "root$"
  }, [
    bM,
    X(t.$slots, "default", {}, void 0, !0),
    x("div", {
      class: "tooltip",
      ref: "tooltip$"
    }, k(t.$t("Copied")), 513)
  ], 2);
}
const PM = /* @__PURE__ */ _(pM, [["render", QM], ["__scopeId", "data-v-57319f65"]]), GM = Z({
  name: "AddressDisplay",
  components: { Copyable: PM },
  props: {
    address: {
      type: String,
      required: !0
    },
    copyable: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return { chunks: Q(() => t.address ? t.address.replace(/[+ ]/g, "").match(/.{4}/g) : new Array(9).fill("-")) };
  }
});
const BM = (t) => (jt("data-v-51e3bdc9"), t = t(), nt(), t), _M = /* @__PURE__ */ BM(() => /* @__PURE__ */ x("span", { class: "space" }, "\xA0", -1));
function ZM(t, e, M, u, i, I) {
  return l(), H(oe(t.copyable ? "Copyable" : "div"), {
    text: t.chunks.join(" ").toUpperCase(),
    class: "address-display"
  }, {
    default: V(() => [
      (l(!0), D(K, null, et(t.chunks, (L, j) => (l(), D("span", {
        class: "chunk",
        key: L + j
      }, [
        J(k(L), 1),
        _M
      ]))), 128))
    ]),
    _: 1
  }, 8, ["text"]);
}
const $M = /* @__PURE__ */ _(GM, [["render", ZM], ["__scopeId", "data-v-51e3bdc9"]]), WM = {
  width: "17",
  height: "16",
  viewBox: "0 0 17 16",
  xmlns: "http://www.w3.org/2000/svg"
}, RM = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M15.913 13.333L9.68 1.433a1.333 1.333 0 0 0-2.362 0l-6.232 11.9a1.333 1.333 0 0 0 1.182 1.952H14.73a1.333 1.333 0 0 0 1.182-1.952zm-8.08-7.718a.667.667 0 0 1 1.334 0v4a.667.667 0 1 1-1.334 0v-4zm.682 7.674h.018a.983.983 0 0 0 .967-1.022 1.018 1.018 0 0 0-1.016-.978h-.019a.984.984 0 0 0-.965 1.02c.02.546.468.978 1.015.98z",
  fill: "currentColor"
}, null, -1), HM = [
  RM
];
function VM(t, e) {
  return l(), D("svg", WM, HM);
}
const FM = { render: VM }, JM = {
  width: "11",
  height: "9",
  viewBox: "0 0 11 9",
  xmlns: "http://www.w3.org/2000/svg"
}, XM = /* @__PURE__ */ x("path", {
  d: "M4.25,7.75.75,4.25,4.25.75",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  stroke: "currentColor",
  fill: "none"
}, null, -1), KM = /* @__PURE__ */ x("line", {
  x1: "1",
  y1: "4.25",
  x2: "10.25",
  y2: "4.25",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  stroke: "currentColor",
  fill: "none"
}, null, -1), qM = [
  XM,
  KM
];
function ti(t, e) {
  return l(), D("svg", JM, qM);
}
const ei = { render: ti }, Mi = {
  width: "23",
  height: "18",
  viewBox: "0 0 23 18",
  xmlns: "http://www.w3.org/2000/svg"
}, ii = /* @__PURE__ */ x("path", {
  d: "M22 9L3 9",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), ui = /* @__PURE__ */ x("path", {
  d: "M9 16L2 9L9 2",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Li = [
  ii,
  ui
];
function Ii(t, e) {
  return l(), D("svg", Mi, Li);
}
const ji = { render: Ii }, ni = {
  width: "16",
  height: "12",
  viewBox: "0 0 16 12",
  xmlns: "http://www.w3.org/2000/svg"
}, oi = /* @__PURE__ */ x("path", {
  d: "M10,1l5,5l-5,5",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), ai = /* @__PURE__ */ x("line", {
  x1: "14",
  y1: "6",
  x2: "1",
  y2: "6",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), si = [
  oi,
  ai
];
function gi(t, e) {
  return l(), D("svg", ni, si);
}
const Ni = { render: gi }, ci = {
  width: "23",
  height: "18",
  viewBox: "0 0 23 18",
  xmlns: "http://www.w3.org/2000/svg"
}, yi = /* @__PURE__ */ x("path", {
  d: "M13.9995 1.99902L20.999 9.00049L13.9995 16",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), ri = /* @__PURE__ */ x("line", {
  x1: "18.999",
  y1: "9",
  x2: "0.999023",
  y2: "9",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Si = [
  yi,
  ri
];
function li(t, e) {
  return l(), D("svg", ci, Si);
}
const Ti = { render: li }, Ai = {
  width: "10",
  height: "11",
  viewBox: "0 0 10 11",
  xmlns: "http://www.w3.org/2000/svg"
}, Di = /* @__PURE__ */ x("path", {
  d: "M5.00098 2L8.53602 5.53603L5.00098 9.07107",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), di = [
  Di
];
function xi(t, e) {
  return l(), D("svg", Ai, di);
}
const Ci = { render: xi }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 64 64",
  width: "64",
  height: "64"
}, zi = /* @__PURE__ */ Nt('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.5px" stroke-linejoin="round"><path d="M40.25,23.25v-.5a6.5,6.5,0,0,0-6.5-6.5h-3.5a6.5,6.5,0,0,0-6.5,6.5v6.5a6.5,6.5,0,0,0,6.5,6.5h2"></path><path d="M23.75,40.75v.5a6.5,6.5,0,0,0,6.5,6.5h3.5a6.5,6.5,0,0,0,6.5-6.5v-6.5a6.5,6.5,0,0,0-6.5-6.5h-2"></path><line x1="32" y1="11.25" x2="32" y2="15.25"></line><line x1="32" y1="48.75" x2="32" y2="52.75"></line></g>', 1), wi = [
  zi
];
function hi(t, e) {
  return l(), D("svg", Ei, wi);
}
const mi = { render: hi }, Oi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24"
}, vi = /* @__PURE__ */ Nt('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5px" stroke-linejoin="round"><path d="M15.25,8.25h0a2.5,2.5,0,0,0-2.5-2.5h-1.5a2.5,2.5,0,0,0-2.5,2.5v3a2.5,2.5,0,0,0,2.5,2.5h.5"></path><path d="M8.75,15.75h0a2.5,2.5,0,0,0,2.5,2.5h1.5a2.5,2.5,0,0,0,2.5-2.5v-3a2.5,2.5,0,0,0-2.5-2.5h-.5"></path><line x1="12" y1="3.75" x2="12" y2="5.25"></line><line x1="12" y1="18.75" x2="12" y2="20.25"></line></g>', 1), Yi = [
  vi
];
function fi(t, e) {
  return l(), D("svg", Oi, Yi);
}
const ki = { render: fi }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  width: "16",
  height: "16"
}, Ui = /* @__PURE__ */ x("g", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round"
}, [
  /* @__PURE__ */ x("path", { d: "M10.5,5.5h0a2,2,0,0,0-2-2h-1a2,2,0,0,0-2,2V7a2,2,0,0,0,2,2H8" }),
  /* @__PURE__ */ x("path", { d: "M5.5,10.5h0a2,2,0,0,0,2,2h1a2,2,0,0,0,2-2V9a2,2,0,0,0-2-2H8" })
], -1), bi = [
  Ui
];
function Qi(t, e) {
  return l(), D("svg", pi, bi);
}
const Pi = { render: Qi }, Gi = {
  width: "74",
  height: "74",
  viewBox: "0 0 74 74",
  xmlns: "http://www.w3.org/2000/svg"
}, Bi = /* @__PURE__ */ x("path", {
  d: "M71.12 1.84a4.5 4.5 0 0 0-6.28 1.04l-42.1 58.74L8.68 47.54a4.5 4.5 0 1 0-6.36 6.37l17.8 17.81a4.57 4.57 0 0 0 6.84-.56l45.2-63.03a4.5 4.5 0 0 0-1.04-6.29z",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": ".8"
}, null, -1), _i = [
  Bi
];
function Zi(t, e) {
  return l(), D("svg", Gi, _i);
}
const $i = { render: Zi }, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12"
}, Ri = /* @__PURE__ */ x("path", {
  d: "M11,1,4,11,1,8",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
}, null, -1), Hi = [
  Ri
];
function Vi(t, e) {
  return l(), D("svg", Wi, Hi);
}
const Fi = { render: Vi }, Ji = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Xi = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M3.528 3.52c4.683-4.684 12.275-4.686 16.96-.005 4.678 4.69 4.678 12.28 0 16.97-4.685 4.68-12.277 4.678-16.96-.005-4.682-4.684-4.682-12.276 0-16.96zm13.145 13.133a1 1 0 0 0 .036-1.374l-3.11-3.11a.25.25 0 0 1 0-.352l3.11-3.11a1 1 0 1 0-1.414-1.415l-3.11 3.11a.25.25 0 0 1-.354 0l-3.11-3.11a1 1 0 0 0-1.41 1.415l3.11 3.11a.249.249 0 0 1 0 .353l-3.11 3.109a1 1 0 0 0 0 1.415c.396.38 1.021.38 1.416 0l3.109-3.11a.252.252 0 0 1 .354 0l3.11 3.11a1 1 0 0 0 1.373-.041z",
  fill: "currentColor"
}, null, -1), Ki = [
  Xi
];
function qi(t, e) {
  return l(), D("svg", Ji, Ki);
}
const tu = { render: qi }, eu = {
  width: "40",
  height: "49",
  viewBox: "0 0 40 49",
  xmlns: "http://www.w3.org/2000/svg"
}, Mu = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M35.73 7.25c0 .48.34.9.82 1a4.08 4.08 0 0 1 3.26 4v32.67A4.08 4.08 0 0 1 35.73 49H6.13A6.13 6.13 0 0 1 0 42.87V6.13A6.13 6.13 0 0 1 6.13 0h25.52a4.08 4.08 0 0 1 4.08 4.08v3.17zm-5.1 31.88A10.23 10.23 0 0 0 20.4 29.6c-5.21 0-9.6 3.9-10.19 9.08a1.02 1.02 0 0 0 1.02 1.13h18.75a.64.64 0 0 0 .64-.68zm-16.38-17.7a6.15 6.15 0 1 1 12.3-.04 6.15 6.15 0 0 1-12.3.05zM6.12 4.09a2.04 2.04 0 0 0 0 4.09h25.01c.29 0 .51-.23.51-.51V4.59a.51.51 0 0 0-.5-.5H6.11z",
  fill: "currentColor"
}, null, -1), iu = [
  Mu
];
function uu(t, e) {
  return l(), D("svg", eu, iu);
}
const Lu = { render: uu }, Iu = {
  width: "35",
  height: "40",
  viewBox: "0 0 35 40",
  xmlns: "http://www.w3.org/2000/svg"
}, ju = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M34.07 6.01L28.95.92c-.6-.59-1.4-.92-2.24-.92H12.33a3.17 3.17 0 0 0-3.16 3.17v5.16h-6A3.17 3.17 0 0 0 0 11.5v25.35A3.17 3.17 0 0 0 3.17 40h19.5a3.17 3.17 0 0 0 3.16-3.16v-5.17h6A3.17 3.17 0 0 0 35 28.5V8.25c0-.84-.33-1.65-.93-2.24zM22.5 35.83c0 .46-.37.84-.83.84H4.17a.83.83 0 0 1-.84-.84V12.5c0-.46.38-.83.84-.83h12.97c.22 0 .43.08.58.23l4.53 4.43c.16.16.25.37.25.6v18.9zm3.75-7.5h4.58c.46 0 .84-.37.84-.83V8.6a.83.83 0 0 0-.25-.6l-4.58-4.47a.83.83 0 0 0-.58-.24l-12.93.04a.83.83 0 0 0-.83.84v3.75c0 .23.19.41.42.41h4.63c.84 0 1.64.33 2.23.93l5.12 5.09c.6.59.93 1.4.93 2.23v11.34c0 .23.19.41.42.41z",
  fill: "currentColor"
}, null, -1), nu = [
  ju
];
function ou(t, e) {
  return l(), D("svg", Iu, nu);
}
const au = { render: ou }, su = {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, gu = /* @__PURE__ */ x("path", {
  d: "M2 13L13 2",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Nu = /* @__PURE__ */ x("path", {
  d: "M2 2L13 13",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), cu = [
  gu,
  Nu
];
function yu(t, e) {
  return l(), D("svg", su, cu);
}
const ru = { render: yu }, Su = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, lu = /* @__PURE__ */ x("path", {
  d: "M15.36 11.38a.83.83 0 0 0-.59-1.42h-3.31a.2.2 0 0 1-.2-.2V1.24a1.25 1.25 0 1 0-2.5 0v8.5c0 .12-.1.2-.22.2H5.23a.83.83 0 0 0-.59 1.43l4.77 4.77c.33.33.86.33 1.18 0l4.77-4.77zM16.02 18.75c0-.69-.55-1.25-1.25-1.25H5.23a1.25 1.25 0 1 0 0 2.5h9.54c.7 0 1.25-.56 1.25-1.25z",
  fill: "currentColor"
}, null, -1), Tu = [
  lu
];
function Au(t, e) {
  return l(), D("svg", Su, Tu);
}
const Du = { render: Au }, du = {
  width: "102",
  height: "102",
  viewBox: "0 0 102 102",
  xmlns: "http://www.w3.org/2000/svg"
}, xu = /* @__PURE__ */ x("circle", {
  cx: "51",
  cy: "51",
  r: "48",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6"
}, null, -1), Cu = /* @__PURE__ */ x("circle", {
  cx: "35.1485",
  cy: "40.6627",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), Eu = /* @__PURE__ */ x("circle", {
  cx: "66.8514",
  cy: "40.6622",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), zu = /* @__PURE__ */ x("path", {
  d: "M39 68.9863C39 68.9863 44.8244 68.9863 51.0271 68.9863C57.2298 68.9863 63.0541 68.9863 63.0541 68.9863",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), wu = [
  xu,
  Cu,
  Eu,
  zu
];
function hu(t, e) {
  return l(), D("svg", du, wu);
}
const mu = { render: hu }, Ou = {
  width: "102",
  height: "102",
  viewBox: "0 0 102 102",
  xmlns: "http://www.w3.org/2000/svg"
}, vu = /* @__PURE__ */ x("circle", {
  cx: "51",
  cy: "51",
  r: "48",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6"
}, null, -1), Yu = /* @__PURE__ */ x("circle", {
  cx: "35.1485",
  cy: "40.6627",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), fu = /* @__PURE__ */ x("circle", {
  cx: "66.8514",
  cy: "40.6622",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), ku = /* @__PURE__ */ x("path", {
  d: "M39.9729 70.9867C39.9729 70.9867 44.7972 68.23 50.9999 68.23C57.2026 68.23 62.027 70.9867 62.027 70.9867",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), pu = [
  vu,
  Yu,
  fu,
  ku
];
function Uu(t, e) {
  return l(), D("svg", Ou, pu);
}
const bu = { render: Uu }, Qu = {
  width: "25",
  height: "24",
  viewBox: "0 0 25 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Pu = /* @__PURE__ */ x("path", {
  d: "M21.66 9.31l1.26.45a2.37 2.37 0 0 1 0 4.48l-1.27.45a1.37 1.37 0 0 0-.77 1.88l.57 1.22a2.38 2.38 0 0 1-3.16 3.16l-1.22-.57a1.37 1.37 0 0 0-1.88.78l-.45 1.26a2.38 2.38 0 0 1-4.48 0l-.45-1.26a1.37 1.37 0 0 0-1.88-.78l-1.22.57a2.38 2.38 0 0 1-3.16-3.16l.57-1.22a1.37 1.37 0 0 0-.78-1.88l-1.26-.45a2.38 2.38 0 0 1 0-4.48l1.26-.45a1.38 1.38 0 0 0 .78-1.88l-.57-1.21A2.38 2.38 0 0 1 6.7 3.04l1.22.58a1.38 1.38 0 0 0 1.88-.78l.45-1.27a2.38 2.38 0 0 1 4.48 0l.45 1.27a1.37 1.37 0 0 0 1.88.78l1.22-.58a2.38 2.38 0 0 1 3.16 3.17l-.57 1.2a1.37 1.37 0 0 0 .78 1.9zm-13.6 4.53a4.93 4.93 0 0 0 6.28 2.6 4.81 4.81 0 0 0 2.6-6.28 4.87 4.87 0 0 0-6.28-2.6 4.81 4.81 0 0 0-2.6 6.28z",
  fill: "currentColor"
}, null, -1), Gu = [
  Pu
];
function Bu(t, e) {
  return l(), D("svg", Qu, Gu);
}
const _u = { render: Bu }, Zu = {
  width: "58",
  height: "49",
  viewBox: "0 0 27 24",
  xmlns: "http://www.w3.org/2000/svg"
}, $u = /* @__PURE__ */ x("path", {
  d: "M26.6991 10.875L21.0741 1.125C20.6691 0.4275 19.9266 0 19.1241 0H7.87414C7.07164 0 6.32914 0.4275 5.92789 1.125L0.302891 10.875C-0.0983594 11.5725 -0.0983594 12.4275 0.302891 13.125L5.92789 22.875C6.32914 23.5725 7.07164 24 7.87414 24H19.1241C19.9266 24 20.6691 23.5725 21.0704 22.875L26.6954 13.125C27.1004 12.4275 27.1004 11.5725 26.6991 10.875Z",
  fill: "currentColor"
}, null, -1), Wu = [
  $u
];
function Ru(t, e) {
  return l(), D("svg", Zu, Wu);
}
const Hu = { render: Ru }, Vu = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
}, Fu = /* @__PURE__ */ x("line", {
  x1: "8",
  y1: "7.83301",
  x2: "8",
  y2: "11.333",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round"
}, null, -1), Ju = /* @__PURE__ */ x("circle", {
  cx: "8",
  cy: "4.75",
  r: "0.5",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": "0.5"
}, null, -1), Xu = /* @__PURE__ */ x("circle", {
  cx: "8",
  cy: "8",
  r: "7.5",
  stroke: "currentColor",
  fill: "none"
}, null, -1), Ku = [
  Fu,
  Ju,
  Xu
];
function qu(t, e) {
  return l(), D("svg", Vu, Ku);
}
const tL = { render: qu }, eL = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
}, ML = /* @__PURE__ */ x("line", {
  x1: "8",
  y1: "7.83301",
  x2: "8",
  y2: "11.333",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-width": "1.5"
}, null, -1), iL = /* @__PURE__ */ x("circle", {
  cx: "8",
  cy: "4.75",
  r: "0.5",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": "1"
}, null, -1), uL = /* @__PURE__ */ x("circle", {
  cx: "8",
  cy: "8",
  r: "7.25",
  stroke: "currentColor",
  "stroke-width": "1.5",
  fill: "none"
}, null, -1), LL = [
  ML,
  iL,
  uL
];
function IL(t, e) {
  return l(), D("svg", eL, LL);
}
const jL = { render: IL }, nL = {
  width: "39",
  height: "39",
  viewBox: "0 0 39 39",
  xmlns: "http://www.w3.org/2000/svg"
}, oL = /* @__PURE__ */ x("g", { fill: "currentColor" }, [
  /* @__PURE__ */ x("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M21.94 14.04a9.1 9.1 0 0 0-2.44-6.18V3.9c0-2.15-1.82-3.9-4.06-3.9a3.98 3.98 0 0 0-4.07 3.9v.81a9.58 9.58 0 0 0-8.83 8.13 9.34 9.34 0 0 0 6.4 10.02v1l-1.39 1.33a.76.76 0 0 0 0 1.1l1.39 1.33v.92l-1.39 1.33c-.32.3-.32.8 0 1.1l1.39 1.33v2.02c0 .2.08.4.23.55l2.44 2.34a.83.83 0 0 0 1.15 0l2.44-2.34a.76.76 0 0 0 .24-.55V22.86a9.42 9.42 0 0 0 6.5-8.82zm-9.75-4.68c.9 0 1.62.7 1.62 1.56a1.6 1.6 0 0 1-1.62 1.56c-.9 0-1.63-.7-1.63-1.56 0-.86.73-1.56 1.63-1.56zm5.69-5.46c0-1.3-1.1-2.34-2.44-2.34A2.39 2.39 0 0 0 13 3.9v3.9h1.63V4.98c1.16.29 2.27.79 3.24 1.46V3.9z"
  }),
  /* @__PURE__ */ x("path", { d: "M36.33 28.12l-8.45-8.11a9.07 9.07 0 0 0-3.45-11.85.84.84 0 0 0-.98.07.76.76 0 0 0-.2.91 11.4 11.4 0 0 1-4.52 14.75.77.77 0 0 0-.34.87c.1.33.42.56.78.56h.01c1.43-.01 2.84-.32 4.13-.92l1.06.9v2c0 .43.36.78.8.78h2.1l.35.35v1.99c0 .43.36.78.8.78h1.83l1.49 1.35c.15.13.35.21.56.21h3.45a.8.8 0 0 0 .81-.78v-3.3c0-.22-.08-.41-.23-.56z" })
], -1), aL = [
  oL
];
function sL(t, e) {
  return l(), D("svg", nL, aL);
}
const gL = { render: sL }, NL = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 290 61"
}, cL = /* @__PURE__ */ x("path", {
  d: "M145.5,46C137,46,130,39,130,30.5S137,15,145.5,15S161,22,161,30.5S154,46,145.5,46z M145.5,17 c-7.4,0-13.5,6.1-13.5,13.5S138.1,44,145.5,44S159,37.9,159,30.5S152.9,17,145.5,17z",
  fill: "currentColor"
}, null, -1), yL = /* @__PURE__ */ x("path", {
  d: "M285.5,3H107V2c0-1.1-0.9-2-2-2H89c-1.1,0-2,0.9-2,2v1H41V2c0-1.1-0.9-2-2-2H23c-1.1,0-2,0.9-2,2v1H4 C1.8,3,0,4.8,0,7v47c0,2.2,1.8,4,4,4h281.5c2.5,0,4.5-2,4.5-4.5v-46C290,5,288,3,285.5,3z M102,40.9c0,1.1-0.9,2.1-2,2.1H28 c-1.1,0-2-0.9-2-2.1V20.1c0-1.1,0.9-2.1,2-2.1h72c1.1,0,2,0.9,2,2.1V40.9z M288,53.5c0,1.4-1.1,2.5-2.5,2.5h-140 C131.4,56,120,44.6,120,30.5C120,16.4,131.4,5,145.5,5h140c1.4,0,2.5,1.1,2.5,2.5V53.5z",
  fill: "currentColor"
}, null, -1), rL = [
  cL,
  yL
];
function SL(t, e) {
  return l(), D("svg", NL, rL);
}
const lL = { render: SL }, TL = {
  width: "32",
  height: "47",
  viewBox: "0 0 32 47",
  xmlns: "http://www.w3.org/2000/svg"
}, AL = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M29.5 22.512V12.96C29.5 5.802 23.456 0 16 0S2.5 5.802 2.5 12.96v9.552c-4.26 6.43-2.966 14.887 3.041 19.868 6.007 4.982 14.911 4.982 20.918 0 6.008-4.981 7.302-13.438 3.041-19.868zM16 34.56c-2.209 0-4-1.72-4-3.84s1.791-3.84 4-3.84c2.21 0 4 1.72 4 3.84s-1.79 3.84-4 3.84zm8.027-17.653a.952.952 0 0 0 .473-.816V12.96c0-4.507-3.805-8.16-8.5-8.16-4.694 0-8.5 3.653-8.5 8.16v3.131c0 .332.179.641.473.816.294.175.661.192.971.045a16.437 16.437 0 0 1 14.112 0c.31.147.677.13.971-.045z",
  fill: "currentColor"
}, null, -1), DL = [
  AL
];
function dL(t, e) {
  return l(), D("svg", TL, DL);
}
const xL = { render: dL }, CL = {
  width: "32",
  height: "47",
  viewBox: "0 0 32 47",
  xmlns: "http://www.w3.org/2000/svg"
}, EL = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M30.5 12.96v9.552c3.93 5.944 3.165 13.69-1.859 18.818-5.024 5.129-13.03 6.337-19.451 2.935-6.421-3.401-9.625-10.548-7.783-17.363C3.248 20.087 9.667 15.336 17 15.36c2.449 0 4.864.545 7.056 1.592.31.147.677.13.971-.045a.952.952 0 0 0 .473-.816V12.96c0-4.507-3.805-8.16-8.5-8.16-4.694 0-8.5 3.653-8.5 8.16 0 1.325-1.12 2.4-2.5 2.4s-2.5-1.074-2.5-2.4C3.5 5.802 9.544 0 17 0s13.5 5.802 13.5 12.96zM13 30.72c0 2.12 1.79 3.84 4 3.84s4-1.72 4-3.84-1.79-3.84-4-3.84-4 1.72-4 3.84z",
  fill: "currentColor"
}, null, -1), zL = [
  EL
];
function wL(t, e) {
  return l(), D("svg", CL, zL);
}
const hL = { render: wL }, mL = {
  width: "54",
  height: "54",
  viewBox: "0 0 54 54",
  xmlns: "http://www.w3.org/2000/svg"
}, OL = /* @__PURE__ */ x("path", {
  d: "M26.95 0A27.05 27.05 0 0 0 .21 22.32a1.12 1.12 0 0 0 1.13 1.3h18.72c.62 0 1.12-.5 1.12-1.12v-8.1a2.25 2.25 0 0 1 3.66-1.76l15.75 12.6a2.25 2.25 0 0 1 0 3.52l-15.75 12.6a2.25 2.25 0 0 1-3.66-1.76v-8.1c0-.62-.5-1.12-1.12-1.12H1.35a1.14 1.14 0 0 0-1.13 1.3 27 27 0 0 0 53.55-5.78A27.25 27.25 0 0 0 26.95 0z",
  fill: "currentColor"
}, null, -1), vL = [
  OL
];
function YL(t, e) {
  return l(), D("svg", mL, vL);
}
const fL = { render: YL }, kL = {
  width: "7",
  height: "30",
  viewBox: "0 0 7 30",
  xmlns: "http://www.w3.org/2000/svg"
}, pL = /* @__PURE__ */ x("g", { fill: "currentColor" }, [
  /* @__PURE__ */ x("circle", {
    cx: "3.5",
    cy: "3",
    r: "3"
  }),
  /* @__PURE__ */ x("circle", {
    cx: "3.5",
    cy: "15",
    r: "3"
  }),
  /* @__PURE__ */ x("circle", {
    cx: "3.5",
    cy: "27",
    r: "3"
  })
], -1), UL = [
  pL
];
function bL(t, e) {
  return l(), D("svg", kL, UL);
}
const QL = { render: bL }, PL = {
  width: "54",
  height: "54",
  viewBox: "0 0 54 54",
  xmlns: "http://www.w3.org/2000/svg"
}, GL = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M27 54a27 27 0 1 0 0-54 27 27 0 0 0 0 54zm2.5-40c.6 0 1 .4 1 1v8.5H39c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-8.5V39c0 .6-.4 1-1 1h-5a1 1 0 0 1-1-1v-8.5H15a1 1 0 0 1-1-1v-5c0-.6.4-1 1-1h8.5V15c0-.6.4-1 1-1h5z",
  fill: "currentColor"
}, null, -1), BL = [
  GL
];
function _L(t, e) {
  return l(), D("svg", PL, BL);
}
const ZL = { render: _L }, $L = {
  width: "99",
  height: "99",
  viewBox: "0 0 99 99",
  xmlns: "http://www.w3.org/2000/svg"
}, WL = /* @__PURE__ */ Nt('<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M28.9 33H4A4.1 4.1 0 0 1 0 28.9V4A4.1 4.1 0 0 1 4.1 0H29A4.1 4.1 0 0 1 33 4.1V29a4.1 4.1 0 0 1-4.1 4.1zM9.3 8.2a1 1 0 0 0-1 1v14.5c0 .6.4 1 1 1h14.4c.6 0 1-.4 1-1V9.3c0-.6-.4-1-1-1H9.3zM4 66H29a4.1 4.1 0 0 1 4.1 4.1V95a4.1 4.1 0 0 1-4.1 4.1H4A4.1 4.1 0 0 1 0 94.9V70A4.1 4.1 0 0 1 4.1 66zm19.6 24.8c.6 0 1-.5 1-1V75.2c0-.6-.4-1-1-1H9.3a1 1 0 0 0-1 1v14.4c0 .6.4 1 1 1h14.4zM70.1 0H95A4.1 4.1 0 0 1 99 4.1V29a4.1 4.1 0 0 1-4.1 4.1H70a4.1 4.1 0 0 1-4.1-4.1V4A4.1 4.1 0 0 1 70.1 0zm19.6 24.8c.6 0 1-.5 1-1V9.2c0-.6-.4-1-1-1H75.3a1 1 0 0 0-1 1v14.4c0 .6.4 1 1 1h14.4z"></path><path d="M41.3 17.5h4a3 3 0 1 0 0-6.2 1 1 0 0 1-1-1V4.1a3 3 0 0 0-6.1 0v10.3a3 3 0 0 0 3 3.1zM53.5 7.2c.6 0 1 .5 1 1V31a3 3 0 0 0 6.2 0V4.1a3 3 0 0 0-3-3h-4.2a3 3 0 0 0 0 6.1zM23.7 43.3a3 3 0 0 0 3.1 3.1h14.4a3 3 0 0 0 3.1-3V26.7a3 3 0 0 0-6.1 0v12.4c0 .6-.5 1-1 1H26.7a3 3 0 0 0-3 3.1z"></path><path d="M12.4 40.2a3 3 0 0 0-3.1 3.1v10.3c0 .6-.5 1-1 1H4a3 3 0 0 0 0 6.2h53.6a3 3 0 0 0 3.1-3V45.4a3 3 0 0 0-6.1 0v8.2c0 .6-.5 1-1 1H16.4a1 1 0 0 1-1-1V43.3a3 3 0 0 0-3.1-3zm44.3 30a3 3 0 0 0-3-3.2H41.1a3 3 0 0 0-3 3.1v16.5a3 3 0 0 0 6.1 0V74.3c0-.6.5-1 1-1h8.3a3 3 0 0 0 3.1-3.2zM95 91.7h-35a1 1 0 0 1-1.1-1v-8.3a3 3 0 1 0-6.2 0v12.4a3 3 0 0 0 3 3H95a3 3 0 0 0 0-6.1z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M80.4 83.5H68.1a3 3 0 0 1-3.1-3V68a3 3 0 0 1 3-3.1h12.4a3 3 0 0 1 3.1 3v12.4a3 3 0 0 1-3 3.1zm-8.2-12.3a1 1 0 0 0-1 1v4.1c0 .6.4 1 1 1h4.1c.6 0 1-.4 1-1v-4.1c0-.6-.4-1-1-1h-4.1z"></path><path d="M92.8 52.6a3 3 0 0 0-3 3v26.9a3 3 0 0 0 6.1 0V55.7a3 3 0 0 0-3-3.1zM96 41.2a3 3 0 0 0-3-3H70a3 3 0 0 0-3 3v12.4a3 3 0 0 0 6.1 0v-8.2c0-.6.5-1 1-1h18.6a3 3 0 0 0 3.1-3.1z"></path></g>', 1), RL = [
  WL
];
function HL(t, e) {
  return l(), D("svg", $L, RL);
}
const VL = { render: HL }, FL = {
  width: "16",
  height: "26",
  viewBox: "0 0 16 26",
  xmlns: "http://www.w3.org/2000/svg"
}, JL = /* @__PURE__ */ x("path", {
  d: "M7.98 25a2.62 2.62 0 1 1 0-5.24 2.62 2.62 0 0 1 0 5.24zM10.78 14.38c-.64.28-1.05.91-1.05 1.6a1.75 1.75 0 0 1-3.5 0 5.24 5.24 0 0 1 3.15-4.8 3.5 3.5 0 1 0-4.89-3.2 1.75 1.75 0 0 1-3.49 0 6.98 6.98 0 1 1 9.78 6.4z",
  fill: "currentColor"
}, null, -1), XL = [
  JL
];
function KL(t, e) {
  return l(), D("svg", FL, XL);
}
const qL = { render: KL }, t4 = {
  width: "40",
  height: "40",
  viewBox: "0 0 40 40",
  xmlns: "http://www.w3.org/2000/svg"
}, e4 = /* @__PURE__ */ Nt('<g fill="currentColor"><path d="M1.21 7.06c.67 0 1.21-.54 1.21-1.21l-.04-3.12a.3.3 0 0 1 .3-.3H5.7a1.21 1.21 0 1 0 0-2.43H2.37A2.4 2.4 0 0 0 0 2.42v3.43c0 .67.54 1.21 1.21 1.21zM5.69 37.58H2.73a.3.3 0 0 1-.3-.3v-3.13a1.21 1.21 0 1 0-2.43 0v3.43A2.4 2.4 0 0 0 2.37 40H5.7a1.21 1.21 0 0 0 0-2.42zM38.79 32.94c-.67 0-1.21.54-1.21 1.21l.04 3.12a.3.3 0 0 1-.3.3H34.3a1.21 1.21 0 1 0 0 2.43h3.32A2.4 2.4 0 0 0 40 37.58v-3.43c0-.67-.54-1.21-1.21-1.21zM37.63 0H34.3a1.21 1.21 0 1 0 0 2.42h2.96c.17 0 .3.14.3.3v3.13a1.21 1.21 0 0 0 2.43 0V2.42A2.4 2.4 0 0 0 37.63 0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.94 15.15H6.67c-.67 0-1.22-.54-1.22-1.21V6.67c0-.67.55-1.21 1.22-1.21h7.27c.67 0 1.21.54 1.21 1.2v7.28c0 .67-.54 1.21-1.21 1.21zM8.18 7.88a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24a.3.3 0 0 0 .3-.3V8.18a.3.3 0 0 0-.3-.3H8.18zM6.67 24.85h7.27c.67 0 1.21.54 1.21 1.21v7.27c0 .67-.54 1.22-1.21 1.22H6.67c-.67 0-1.22-.55-1.22-1.22v-7.27c0-.67.55-1.21 1.22-1.21zm5.75 7.27a.3.3 0 0 0 .3-.3v-4.24a.3.3 0 0 0-.3-.3H8.18a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24zM26.06 5.45h7.27c.67 0 1.21.55 1.21 1.22v7.27c0 .67-.54 1.21-1.2 1.21h-7.28c-.67 0-1.21-.54-1.21-1.21V6.67c0-.67.54-1.22 1.21-1.22zm5.76 7.28a.3.3 0 0 0 .3-.3V8.17a.3.3 0 0 0-.3-.3h-4.24a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24z"></path><path d="M17.58 10.6h1.2a.9.9 0 1 0 0-1.81.3.3 0 0 1-.3-.3V6.66a.9.9 0 1 0-1.81 0V9.7c0 .5.4.9.9.9zM21.21 7.58c.17 0 .3.13.3.3v6.66a.9.9 0 1 0 1.82 0V6.67c0-.5-.4-.91-.9-.91H21.2a.9.9 0 1 0 0 1.82zM12.42 18.18c0 .5.41.91.91.91h4.25c.5 0 .9-.4.9-.9v-4.86a.9.9 0 1 0-1.81 0v3.64a.3.3 0 0 1-.3.3h-3.04c-.5 0-.9.4-.9.91z"></path><path d="M9.09 17.27c-.5 0-.9.4-.9.91v3.03a.3.3 0 0 1-.31.3H6.67a.9.9 0 1 0 0 1.82h15.75c.5 0 .91-.4.91-.9v-3.64a.9.9 0 0 0-1.82 0v2.42a.3.3 0 0 1-.3.3h-10.9a.3.3 0 0 1-.31-.3v-3.03c0-.5-.4-.9-.91-.9zM22.12 26.06c0-.5-.4-.9-.9-.9h-3.64c-.5 0-.91.4-.91.9v4.85a.9.9 0 1 0 1.81 0v-3.64c0-.16.14-.3.3-.3h2.43c.5 0 .91-.4.91-.9zM33.33 32.42h-10.3a.3.3 0 0 1-.3-.3V29.7a.9.9 0 1 0-1.82 0v3.63c0 .5.4.91.9.91h11.52a.9.9 0 0 0 0-1.82z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M29.1 30h-3.65a.9.9 0 0 1-.9-.91v-3.64c0-.5.4-.9.9-.9h3.64c.5 0 .91.4.91.9v3.64c0 .5-.4.91-.9.91zm-2.43-3.64a.3.3 0 0 0-.3.3v1.22c0 .17.13.3.3.3h1.2a.3.3 0 0 0 .31-.3v-1.21a.3.3 0 0 0-.3-.3h-1.21z"></path><path d="M32.73 20.9c-.5 0-.91.42-.91.92v7.88a.9.9 0 0 0 1.82 0v-7.88c0-.5-.41-.91-.91-.91zM33.64 17.58c0-.5-.41-.91-.91-.91h-6.67c-.5 0-.9.4-.9.9v3.64a.9.9 0 0 0 1.8 0V18.8c0-.17.15-.3.31-.3h5.46c.5 0 .9-.41.9-.91z"></path></g>', 1), M4 = [
  e4
];
function i4(t, e) {
  return l(), D("svg", t4, M4);
}
const u4 = { render: i4 }, L4 = {
  width: "30",
  height: "28",
  viewBox: "0 0 30 28",
  xmlns: "http://www.w3.org/2000/svg"
}, I4 = /* @__PURE__ */ x("path", {
  d: "M27.634 15.68H9.544a1.428 1.428 0 0 1 0-2.856h18.09a1.428 1.428 0 0 1 0 2.857zM29.064 25.676c0 .789-.639 1.428-1.428 1.428h-8.569a1.428 1.428 0 0 1 0-2.856h8.57a1.428 1.428 0 0 1 1.427 1.43v-.002zM13.482 27.996a2.856 2.856 0 1 1-.282-5.705 2.856 2.856 0 0 1 .283 5.705zM1.922 24.248h4.76a1.428 1.428 0 0 1 0 2.856h-4.76a1.428 1.428 0 1 1 0-2.856zM.004 13.776a2.856 2.856 0 1 1 5.705.285 2.856 2.856 0 0 1-5.705-.285zM6.691 3.778H1.455a1.428 1.428 0 0 1 0-2.856H6.69a1.428 1.428 0 0 1 0 2.856zM13.177.004a2.856 2.856 0 1 1 .283 5.705 2.856 2.856 0 0 1-.283-5.705zM27.63 4.25h-7.616a1.428 1.428 0 0 1 0-2.855h7.617a1.428 1.428 0 0 1 0 2.856z",
  fill: "currentColor"
}, null, -1), j4 = [
  I4
];
function n4(t, e) {
  return l(), D("svg", L4, j4);
}
const o4 = { render: n4 }, a4 = {
  width: "98",
  height: "123",
  viewBox: "0 0 98 123",
  xmlns: "http://www.w3.org/2000/svg"
}, s4 = /* @__PURE__ */ x("path", {
  d: "M85.7 42.3l8-8a5.1 5.1 0 1 0-7.3-7.2l-8.2 8.2c-7-5.2-15.4-8.5-24-9.4V10.3h10.2a5.1 5.1 0 0 0 0-10.3H33.6a5.1 5.1 0 0 0 0 10.3H44v15.6a48.7 48.7 0 1 0 41.8 16.4zM49 112.8a38.4 38.4 0 1 1 0-77 38.4 38.4 0 0 1 0 77z M54.2 48.6a5.1 5.1 0 0 0-10.3 0V74a5.2 5.2 0 0 0 5.2 5.1 5.1 5.1 0 0 0 5-5V48.5z",
  fill: "currentColor"
}, null, -1), g4 = [
  s4
];
function N4(t, e) {
  return l(), D("svg", a4, g4);
}
const c4 = { render: N4 }, y4 = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, r4 = /* @__PURE__ */ x("path", {
  d: "M10.01 14.82a1 1 0 0 0 1.37-.37l3.37-5.83a.17.17 0 0 1 .22-.06l.73.41a.67.67 0 0 0 1-.58l-.07-3.89a.67.67 0 0 0-.99-.57l-3.4 1.89a.67.67 0 0 0 0 1.15l.71.42c.08.05.11.15.06.23l-3.37 5.83a1 1 0 0 0 .37 1.37zM8.23 5.19l-3.55 5.76a.17.17 0 0 1-.23.06l-.55-.32a.67.67 0 0 0-1 .59l.07 3.89a.67.67 0 0 0 .99.57l3.4-1.89a.67.67 0 0 0 0-1.16l-.89-.51a.17.17 0 0 1-.07-.1.16.16 0 0 1 .02-.13l3.52-5.72a1 1 0 1 0-1.7-1.05z",
  fill: "currentColor"
}, null, -1), S4 = [
  r4
];
function l4(t, e) {
  return l(), D("svg", y4, S4);
}
const T4 = { render: l4 }, A4 = {
  width: "150",
  height: "149",
  viewBox: "0 0 150 149",
  xmlns: "http://www.w3.org/2000/svg"
}, D4 = /* @__PURE__ */ x("path", {
  d: "M81 103a26 26 0 100-52 26 26 0 000 52zM3 97h15c1 0 2 1 2 3v35c0 2-1 3-2 3H3c-2 0-3-1-3-3v-35c0-2 1-3 3-3zm60 17h-1c-5-7-13-11-21-11H28l-2 1v30l1 1c26 9 37 14 47 14 11 0 21-7 54-24 3-1 4-5 2-8-1-2-3-3-6-3l-5 1-19 6-1 1c-1 6-6 10-12 10H64c-2 0-3-1-3-3s1-3 3-3h23c3 0 6-3 6-6s-3-6-6-6H63zm61-61.8h-.3a24 24 0 01-6.4-1c-1.6-.3-2.5-2-2-3.5.3-1.5 2-2.4 3.5-2 1.6.5 3.3.6 5 .7h.2a22 22 0 005-.6c1.6-.5 3.2.5 3.6 2a3 3 0 01-2.1 3.6 31 31 0 01-6.5.8zm15.8-6.3a3 3 0 01-2-5 21 21 0 003.2-4 3 3 0 014-.9 3 3 0 01.9 4 23 23 0 01-4.2 5c-.5.6-1.2.9-2 .9zm-31.9-.2c-.7 0-1.4-.3-2-.8a28 28 0 01-4.1-5 3 3 0 011-4 3 3 0 014 .8c.8 1.5 2 2.8 3.1 4a3 3 0 01.2 4.1 3 3 0 01-2.2.9zM147 30.5h-.2a2.9 2.9 0 01-2.7-3.1V26c0-1.3 0-2.6-.3-3.8a2.9 2.9 0 015.7-1c.3 1.5.5 3.2.5 4.8v1.7a3 3 0 01-3 2.7zm-46.2-.3a3 3 0 01-2.9-2.7V26c0-1.7.1-3.4.4-5a3 3 0 013.4-2.3 3 3 0 012.4 3.4c-.3 1.3-.4 2.6-.4 4v1a3 3 0 01-2.8 3.1zm41-16a3 3 0 01-2.3-1 20.7 20.7 0 00-3.6-3.5 3 3 0 01-.7-4 3 3 0 014.1-.7c1.7 1.3 3.3 2.8 4.7 4.5 1 1.2.9 3-.4 4-.5.6-1.1.7-1.8.7zm-35.6-.1c-.7 0-1.4-.3-1.9-.7a2.9 2.9 0 01-.3-4.1c1.3-1.7 3-3.1 4.7-4.4a3 3 0 014 .6 3 3 0 01-.5 4 21 21 0 00-3.8 3.5 3 3 0 01-2.2 1zM126.9 6h-.4c-1.7-.2-3.4-.2-5 0a3 3 0 11-.7-5.8c2.1-.3 4.3-.3 6.5 0a3 3 0 012.5 3.2 2.8 2.8 0 01-2.9 2.6z",
  fill: "currentColor"
}, null, -1), d4 = [
  D4
];
function x4(t, e) {
  return l(), D("svg", A4, d4);
}
const C4 = { render: x4 }, E4 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, z4 = /* @__PURE__ */ x("g", { fill: "currentColor" }, [
  /* @__PURE__ */ x("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M18.9 6.95c1.59 1 3.03 2.21 4.3 3.6.74.82.74 2.07 0 2.9-2.56 2.81-6.79 5.8-11.04 5.8h-.3a11.26 11.26 0 0 1-4.31-.94L3.4 22.45a1 1 0 0 1-1.63-1.08l.01-.01.01-.01 19.5-19.5a.74.74 0 0 0 .18-.3l.02-.01a1 1 0 1 1 1.41 1.41l-4 4zm-5.59 9.35a4.58 4.58 0 0 0 3-3.03 4.3 4.3 0 0 0-.2-3.06.25.25 0 0 0-.4-.07l-5.57 5.56a.25.25 0 0 0 .07.4 4.3 4.3 0 0 0 3.1.2z"
  }),
  /* @__PURE__ */ x("path", { d: "M7.62 13.4a.24.24 0 0 0 .06-.24A4.32 4.32 0 0 1 7.5 12a4.5 4.5 0 0 1 5.66-4.33c.09.03.18 0 .24-.06l1.94-1.94a.25.25 0 0 0-.1-.42c-1.05-.34-2.14-.5-3.24-.5C7.7 4.69 3.4 7.7.81 10.55a2.15 2.15 0 0 0 0 2.9 21.21 21.21 0 0 0 3.43 3.03c.1.07.24.06.33-.03l3.05-3.05z" })
], -1), w4 = [
  z4
];
function h4(t, e) {
  return l(), D("svg", E4, w4);
}
const m4 = { render: h4 }, O4 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, v4 = /* @__PURE__ */ x("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12 4.6c4.4-.06 8.79 3.01 11.43 5.92.75.84.75 2.11 0 2.95-2.61 2.88-6.94 5.93-11.28 5.93h-.31c-4.33 0-8.66-3.05-11.27-5.93a2.21 2.21 0 0 1 0-2.95C3.2 7.62 7.6 4.54 12 4.6zm0 2.8a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2z",
  fill: "currentColor"
}, null, -1), Y4 = /* @__PURE__ */ x("path", {
  d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  fill: "currentColor"
}, null, -1), f4 = [
  v4,
  Y4
];
function k4(t, e) {
  return l(), D("svg", O4, f4);
}
const p4 = { render: k4 }, p = (t) => Z({
  functional: !0,
  render: () => ae(t, Object.assign({ class: "nq-icon" }))
}), Te = p(FM), Oj = p(ei), U4 = p(ji), b4 = p(Ni), vj = p(Ti), Q4 = p(Ci), Yj = p(mi), fj = p(ki), kj = p(Pi), pj = p($i), Uj = p(Fi), P4 = p(tu), bj = p(Lu), Qj = p(au), Pj = p(ru), Gj = p(Du), Bj = p(mu), _j = p(bu), Zj = p(_u), $j = p(Hu), Wj = p(tL), Rj = p(jL), Hj = p(gL), Vj = p(lL), Fj = p(xL), Jj = p(hL), Xj = p(fL), Kj = p(QL), qj = p(ZL), tn = p(VL), en = p(qL), Mn = p(u4), un = p(o4), Ln = p(c4), In = p(T4), jn = p(C4), nn = p(m4), on = p(p4), G4 = Z({
  name: "CloseButton",
  components: {
    CloseIcon: P4
  }
});
function B4(t, e, M, u, i, I) {
  const L = G("CloseIcon");
  return l(), D("button", {
    class: "close-button nq-button-s",
    onMousedown: e[0] || (e[0] = ut(() => {
    }, ["prevent"]))
  }, [
    $(L)
  ], 32);
}
const Ae = /* @__PURE__ */ _(G4, [["render", B4], ["__scopeId", "data-v-04d3da97"]]);
var De = /* @__PURE__ */ ((t) => (t.CLOSE = "close", t.CHANGED = "changed", t))(De || {});
const _4 = Z({
  name: "AccountDetails",
  emits: Object.values(De),
  props: {
    address: {
      type: String,
      required: !0
    },
    editable: {
      type: Boolean,
      default: !1
    },
    image: String,
    label: String,
    walletLabel: String,
    balance: Number,
    placeholder: String
  },
  setup: (t, e) => {
    const M = E(null);
    function u() {
      M.value && M.value.focus();
    }
    function i(L) {
      e.emit("changed", L);
    }
    function I() {
      e.emit("close");
    }
    return e.expose({ focus: u }), {
      account$: M,
      onChanged: i,
      onClose: I
    };
  },
  components: {
    Account: Ft,
    Amount: mt,
    AddressDisplay: $M,
    CloseButton: Ae
  }
});
const Z4 = { class: "account-details" };
function $4(t, e, M, u, i, I) {
  const L = G("CloseButton"), j = G("Account"), n = G("AddressDisplay");
  return l(), D("div", Z4, [
    $(L, {
      class: "top-right",
      onClick: t.onClose
    }, null, 8, ["onClick"]),
    $(j, {
      ref: "account$",
      layout: "column",
      address: t.address,
      image: t.image,
      label: t.label && t.label !== t.address ? t.label : "",
      walletLabel: t.walletLabel,
      balance: t.balance,
      editable: t.editable,
      placeholder: t.placeholder,
      onChanged: t.onChanged
    }, null, 8, ["address", "image", "label", "walletLabel", "balance", "editable", "placeholder", "onChanged"]),
    $(n, {
      address: t.address,
      copyable: ""
    }, null, 8, ["address"])
  ]);
}
const an = /* @__PURE__ */ _(_4, [["render", $4], ["__scopeId", "data-v-3f00a98b"]]);
var Ut = /* @__PURE__ */ ((t) => (t.TOP = "top", t.BOTTOM = "bottom", t))(Ut || {}), bt = /* @__PURE__ */ ((t) => (t.LEFT = "left", t.RIGHT = "right", t))(bt || {}), At = /* @__PURE__ */ ((t) => (t.NORMAL = "normal", t.INVERSE = "inverse", t))(At || {});
const W4 = Z({
  name: "Tooltip",
  props: {
    container: HTMLElement,
    disabled: Boolean,
    noFocus: Boolean,
    preferredPosition: {
      type: String,
      default: "top right",
      validator: (t) => {
        if (typeof t != "string")
          return !1;
        const [e, M] = t.split(" ");
        return Object.values(Ut).includes(e) && (!M || Object.values(bt).includes(M));
      }
    },
    margin: {
      type: Object,
      validator: (t) => typeof t == "object" && Object.entries(t).every(([e, M]) => typeof M == "number" && (Object.values(Ut).includes(e) || Object.values(bt).includes(e)))
    },
    autoWidth: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "normal",
      validator: (t) => Object.values(At).includes(t)
    },
    styles: Object
  },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(null), I = E(null), L = E(!1), j = E(!1), n = E(!1), a = E(null), y = E(-1), s = E(0), o = E(0), r = E(0), S = E(0), N = E(0), C = Q(() => (L.value || n.value) && !t.disabled), z = Q(() => ({
      ...t.styles,
      top: N.value + "px",
      left: S.value + "px",
      width: t.container && t.autoWidth ? o.value + "px" : (t.styles || {}).width,
      maxWidth: t.container ? r.value + "px" : (t.styles || {}).maxWidth
    }));
    Mt(() => {
      "icon" in e.slots && console.warn("Tooltip: Slot `icon` is deprecated and support will be removed in the future. Use slot `trigger` instead."), t.container && w(t.container);
    }), ot(() => {
      t.container && t.container.removeEventListener("scroll", A);
    });
    function d() {
      L.value = !0;
    }
    function T(Y = !1) {
      L.value = !1, M.value && M.value.blur(), Y && (n.value = !1);
    }
    function c(Y = !1) {
      L.value || n.value ? T(Y) : d();
    }
    U(C, g);
    async function g(Y) {
      if (C.value)
        Y === !0 && (y.value = Date.now(), e.emit("show"));
      else {
        j.value = !1, Y === !1 && (y.value = Date.now(), e.emit("hide"));
        return;
      }
      t.container && await new Promise((P) => requestAnimationFrame(() => {
        if (!t.container)
          return;
        const R = h("left") || 0, F = h("right") || 0;
        r.value = t.container.offsetWidth - R - F, t.autoWidth && (o.value = r.value), P(null);
      })), await it(), !(!C.value || !u.value) && (s.value = u.value.offsetHeight, o.value = u.value.offsetWidth, A(), await it(), await new Promise((P) => requestAnimationFrame(P)), j.value = !0);
    }
    U(() => t.preferredPosition, A);
    function A() {
      if (!C.value || !M.value)
        return;
      let [Y, P] = t.preferredPosition.split(" ");
      if (P = P || "right", S.value = Math.round(P === "right" ? M.value.offsetWidth / 2 - 25 : M.value.offsetWidth / 2 - o.value + 25), t.container) {
        const R = M.value.getBoundingClientRect(), F = t.container.getBoundingClientRect(), tt = h("top") || 0, Ct = h("bottom") || 0, Lt = s.value + 16, ct = R.top - F.top - tt >= Lt, Et = F.bottom - R.bottom - Ct >= Lt;
        Y === "top" && (ct || !Et) || Y === "bottom" && ct && !Et ? I.value = "top" : I.value = "bottom";
        const Ze = h("left") || 0, $e = h("right") || 0, We = F.left + Ze - R.left, Re = F.right - $e - R.left;
        S.value = Math.max(
          We,
          Math.min(
            Re - o.value,
            S.value
          )
        );
      } else
        I.value = Y;
      N.value = I.value === "bottom" ? M.value.offsetHeight : -s.value;
    }
    U(() => t.container, w);
    async function w(Y, P) {
      P && P.removeEventListener("scroll", A), Y && await new Promise((R) => requestAnimationFrame(() => {
        Y.scrollHeight !== Y.offsetHeight && Y.addEventListener("scroll", A), R(null);
      })), await g();
    }
    function h(Y) {
      if (t.margin && t.margin[Y] !== void 0)
        return t.margin[Y];
      const P = t.container || null;
      return !P || (Y === "top" || Y === "bottom") && P.scrollHeight !== P.offsetHeight ? 0 : parseInt(window.getComputedStyle(P, null).getPropertyValue(`padding-${Y}`), 10);
    }
    function O(Y) {
      Y ? (a.value && window.clearTimeout(a.value), n.value = !0) : a.value = window.setTimeout(
        () => n.value = !1,
        100
      );
    }
    function m() {
      Date.now() - y.value < 200 || (c(!0), e.emit("click"));
    }
    return e.expose({ show: d, hide: T, toggle: c, update: g }), {
      TooltipThemes: At,
      tooltipTrigger$: M,
      tooltipBox$: u,
      root$: i,
      verticalPosition: I,
      transitionPosition: j,
      isShown: C,
      tooltipBoxStyles: z,
      show: d,
      hide: T,
      mouseOver: O,
      onClick: m
    };
  },
  components: { AlertTriangleIcon: Te }
});
const R4 = ["tabindex"];
function H4(t, e, M, u, i, I) {
  const L = G("AlertTriangleIcon");
  return l(), D("span", {
    class: b(["tooltip", [t.verticalPosition, {
      shown: t.isShown,
      "transition-position": t.transitionPosition,
      "inverse-theme": t.theme === t.TooltipThemes.INVERSE
    }]]),
    ref: "root$",
    onMouseenter: e[3] || (e[3] = (j) => t.mouseOver(!0)),
    onMouseleave: e[4] || (e[4] = (j) => t.mouseOver(!1))
  }, [
    x("a", {
      href: "javascript:void(0);",
      ref: "tooltipTrigger$",
      onFocus: e[0] || (e[0] = ut((j) => t.show(), ["stop"])),
      onBlur: e[1] || (e[1] = ut((j) => t.hide(), ["stop"])),
      onClick: e[2] || (e[2] = (j) => t.onClick()),
      tabindex: t.disabled || t.noFocus ? -1 : 0,
      class: "trigger"
    }, [
      t.$slots.icon ? B("", !0) : X(t.$slots, "trigger", { key: 0 }, () => [
        $(L, { class: "nq-orange" })
      ], !0),
      t.$slots.icon && !t.$slots.trigger ? X(t.$slots, "icon", { key: 1 }, void 0, !0) : B("", !0)
    ], 40, R4),
    $(Wt, { name: "transition-fade" }, {
      default: V(() => [
        t.isShown ? (l(), D("div", {
          key: 0,
          ref: "tooltipBox$",
          class: "tooltip-box",
          style: xt(t.tooltipBoxStyles)
        }, [
          X(t.$slots, "default", {}, void 0, !0)
        ], 4)) : B("", !0)
      ]),
      _: 3
    })
  ], 34);
}
const Ot = /* @__PURE__ */ _(W4, [["render", H4], ["__scopeId", "data-v-0ca9be35"]]);
var de = /* @__PURE__ */ ((t) => (t.ACCOUNT_SELECTED = "account-selected", t.ACCOUNT_CHANGED = "account-changed", t))(de || {});
const V4 = Z({
  name: "AccountList",
  emits: Object.values(de),
  props: {
    accounts: {
      type: Array,
      required: !0
    },
    disabledAddresses: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: !1
    },
    disableContracts: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    walletId: String,
    decimals: Number,
    minBalance: Number,
    tooltipProps: Object
  },
  methods: { $t: q("AccountList") },
  setup: (t, e) => {
    const M = E(null), u = E(-1), i = E({}), I = E({});
    se(() => {
      i.value = {}, I.value = {};
    });
    function L(N) {
      t.editable && i.value.hasOwnProperty(N) && i.value[N].focus();
    }
    function j(N) {
      if (t.disabled || t.editable)
        return;
      window.clearTimeout(u.value), N.userFriendlyAddress !== M.value && S();
      const C = y(N), z = s(N);
      if (C || z || o(N)) {
        M.value = N.userFriendlyAddress, I.value[`tooltip-${M.value}`] && I.value[`tooltip-${M.value}`].show();
        const d = C || z ? 2e3 : 300;
        u.value = window.setTimeout(() => S(), d);
      } else
        e.emit("account-selected", N.walletId || t.walletId, N.userFriendlyAddress);
    }
    function n(N, C) {
      e.emit("account-changed", N, C);
    }
    function a(N) {
      return t.disabled || !t.editable && (y(N) || s(N) || o(N));
    }
    function y(N) {
      return t.disableContracts && !("path" in N && N.path);
    }
    function s(N) {
      return t.disabledAddresses.includes(N.userFriendlyAddress);
    }
    function o(N) {
      return t.minBalance && (N.balance || 0) < t.minBalance;
    }
    function r(N) {
      return !t.disabled && !t.editable && (y(N) || s(N));
    }
    function S() {
      !M.value || (I.value[`tooltip-${M.value}`] && I.value[`tooltip-${M.value}`].hide(!1), M.value = null);
    }
    return e.expose({ focus: L }), {
      highlightedDisabledAddress: M,
      highlightedDisabledAddressTimeout: u,
      accounts$: i,
      tooltips$: I,
      focus: L,
      accountSelected: j,
      onAccountChanged: n,
      isDisabled: a,
      isDisabledContract: y,
      isDisabledAccount: s,
      hasInsufficientBalance: o,
      hasTooltip: r,
      clearHighlightedDisabledAddress: S
    };
  },
  components: {
    Account: Ft,
    CaretRightSmallIcon: Q4,
    Tooltip: Ot
  }
});
const F4 = { class: "account-list" };
function J4(t, e, M, u, i, I) {
  const L = G("Account"), j = G("CaretRightSmallIcon"), n = G("Tooltip");
  return l(), D("div", F4, [
    (l(!0), D(K, null, et(t.accounts, (a) => (l(), H(oe(!t.isDisabled(a) && !t.editable ? "a" : "div"), {
      href: "javascript:void(0)",
      class: b(["account-entry", {
        disabled: t.isDisabled(a),
        "has-tooltip": t.hasTooltip(a),
        "highlight-insufficient-balance": t.highlightedDisabledAddress === a.userFriendlyAddress && t.hasInsufficientBalance(a) && !t.isDisabledContract(a) && !t.isDisabledAccount(a)
      }]),
      onClick: (y) => t.accountSelected(a),
      key: a.userFriendlyAddress
    }, {
      default: V(() => [
        $(L, {
          ref_for: !0,
          ref: (y) => t.accounts$[a.userFriendlyAddress] = y,
          address: a.userFriendlyAddress,
          label: a.label,
          placeholder: "",
          balance: t.minBalance ? a.balance : void 0,
          decimals: t.decimals,
          editable: t.editable && !t.disabled,
          onChanged: (y) => t.onAccountChanged(a.userFriendlyAddress, y)
        }, null, 8, ["address", "label", "placeholder", "balance", "decimals", "editable", "onChanged"]),
        t.isDisabled(a) ? B("", !0) : (l(), H(j, {
          key: 0,
          class: "caret"
        })),
        t.hasTooltip(a) ? (l(), H(n, ge({
          key: 1,
          ref_for: !0,
          ref: (y) => t.tooltips$[`tooltip-${a.userFriendlyAddress}`] = y
        }, {
          preferredPosition: "bottom left",
          ...t.tooltipProps,
          styles: {
            width: "22.25rem",
            pointerEvents: "none",
            ...t.tooltipProps ? t.tooltipProps.styles : void 0
          }
        }, {
          onClick: e[0] || (e[0] = ut(() => {
          }, ["stop"]))
        }), {
          default: V(() => [
            J(k(t.isDisabledContract(a) ? t.$t("Contracts cannot be used for this operation.") : t.$t("This address cannot be used for this operation.")), 1)
          ]),
          _: 2
        }, 1040)) : B("", !0)
      ]),
      _: 2
    }, 1032, ["class", "onClick"]))), 128))
  ]);
}
const X4 = /* @__PURE__ */ _(V4, [["render", J4], ["__scopeId", "data-v-646ef48d"]]), K4 = Z({
  name: "AccountRing",
  components: { Identicon: Ne },
  props: {
    addresses: {
      type: Array,
      default: () => []
    },
    animate: {
      type: Boolean,
      default: !1
    }
  }
});
const q4 = { class: "account-ring" };
function t0(t, e, M, u, i, I) {
  const L = G("Identicon");
  return l(), D("div", q4, [
    (l(), D(K, null, et(6, (j) => x("div", {
      class: "account",
      key: j
    }, [
      $(L, {
        address: t.addresses[j - 1],
        class: b({ "pop-in": t.animate && t.addresses.length >= j })
      }, null, 8, ["address", "class"])
    ])), 64))
  ]);
}
const sn = /* @__PURE__ */ _(K4, [["render", t0], ["__scopeId", "data-v-9365ed09"]]);
var xe = /* @__PURE__ */ ((t) => (t.ACCOUNT_SELECTED = "account-selected", t.LOGIN = "login", t))(xe || {});
const e0 = Z({
  name: "AccountSelector",
  emits: Object.values(xe),
  components: { AccountList: X4, Tooltip: Ot },
  props: {
    wallets: {
      type: Array,
      required: !0
    },
    disabledAddresses: {
      type: Array,
      default: () => []
    },
    allowLogin: {
      type: Boolean,
      default: !0
    },
    decimals: Number,
    minBalance: Number,
    disableContracts: {
      type: Boolean,
      default: !1
    },
    disableLegacyAccounts: {
      type: Boolean,
      default: !1
    },
    disableBip39Accounts: {
      type: Boolean,
      default: !1
    },
    disableLedgerAccounts: {
      type: Boolean,
      default: !1
    },
    highlightBitcoinAccounts: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: q("AccountSelector") },
  setup: (t, e) => {
    const M = E(null), u = E({});
    se(() => u.value = {});
    const i = E(null), I = E(-1), L = E({
      get container() {
        return M.value;
      },
      preferredPosition: "bottom right",
      margin: {
        left: 16,
        right: 16,
        top: 32,
        bottom: 32
      },
      styles: {
        pointerEvents: "none"
      }
    }), j = Q(() => t.wallets.slice(0).sort((N, C) => {
      const z = y(N), d = y(C);
      if (z && !d)
        return 1;
      if (!z && d)
        return -1;
      if (!t.minBalance)
        return 0;
      const T = (A, w) => Array.from(A.values()).some((h) => (h.balance || 0) >= (t.minBalance || 0)) || !t.disableContracts && w.some((h) => (h.balance || 0) >= (t.minBalance || 0)), c = T(N.accounts, N.contracts), g = T(C.accounts, C.contracts);
      return !c && g ? 1 : c && !g ? -1 : 0;
    }));
    function n(N, C) {
      e.emit("account-selected", { walletId: N, address: C });
    }
    function a() {
      e.emit("login");
    }
    function y(N) {
      return t.disableLegacyAccounts && N.type === 1 || t.disableBip39Accounts && N.type === 2 || t.disableLedgerAccounts && N.type === 3;
    }
    function s(N) {
      switch (N.type) {
        case 1:
          return q("AccountSelector")("Legacy");
        case 2:
          return "Keyguard";
        case 3:
          return "Ledger";
        default:
          throw new Error(`Unknown account type ${N.type}`);
      }
    }
    function o(N) {
      window.clearTimeout(I.value);
      const C = u.value[`tooltip-${N.id}`] ? u.value[`tooltip-${N.id}`][0] : null;
      i.value && i.value !== C && i.value.hide(!1), C && (C.show(), I.value = window.setTimeout(() => {
        C.hide(!1), i.value = null;
      }, 2e3)), i.value = C;
    }
    function r(N) {
      return [...N.accounts.values(), ...N.contracts];
    }
    function S(N, C, z, d) {
      return C ? N.sort((T, c) => {
        const g = z && !("path" in T && T.path), A = z && !("path" in c && c.path);
        if (g && !A)
          return 1;
        if (!g && A)
          return -1;
        const w = d && d.includes(T.userFriendlyAddress), h = d && d.includes(c.userFriendlyAddress);
        return w && !h ? 1 : !w && h ? -1 : (!T.balance || T.balance < C) && c.balance && c.balance >= C ? 1 : (!c.balance || c.balance < C) && T.balance && T.balance >= C ? -1 : 0;
      }) : N;
    }
    return {
      container$: M,
      tooltips$: u,
      tooltipProps: L,
      sortedWallets: j,
      onAccountSelected: n,
      onLogin: a,
      listAccountsAndContracts: r,
      sortAccountsAndContracts: S,
      isAccountDisabled: y,
      getAccountTypeName: s,
      accountClicked: o
    };
  }
});
const M0 = { class: "account-selector" }, i0 = {
  key: 0,
  class: "wallet-label"
}, u0 = { class: "nq-label" }, L0 = {
  key: 0,
  class: "btc-pill"
}, I0 = { class: "footer" };
function j0(t, e, M, u, i, I) {
  const L = G("Tooltip"), j = G("AccountList");
  return l(), D("div", M0, [
    x("div", {
      ref: "container$",
      class: b(["container", { "extra-spacing": t.wallets.length === 1 }])
    }, [
      (l(!0), D(K, null, et(t.sortedWallets, (n) => (l(), D("div", {
        key: n.id
      }, [
        t.wallets.length > 1 || t.isAccountDisabled(n) ? (l(), D("div", i0, [
          x("div", u0, [
            J(k(n.label) + " ", 1),
            t.highlightBitcoinAccounts && n.btcXPub ? (l(), D("span", L0, "BTC")) : B("", !0)
          ]),
          t.isAccountDisabled(n) ? (l(), H(L, {
            key: 0,
            ref_for: !0,
            ref: (a) => t.tooltips$[`tooltip-${n.id}`] = a,
            margin: t.tooltipProps.margin,
            container: t.tooltipProps.container || void 0,
            preferredPosition: t.tooltipProps.preferredPosition,
            styles: { width: "25.25rem", ...t.tooltipProps.styles }
          }, {
            default: V(() => [
              J(k(t.$t(
                "{type} accounts cannot be used for this operation.",
                { type: t.getAccountTypeName(n) }
              )), 1)
            ]),
            _: 2
          }, 1032, ["margin", "container", "preferredPosition", "styles"])) : B("", !0)
        ])) : B("", !0),
        $(j, {
          accounts: t.sortAccountsAndContracts(t.listAccountsAndContracts(n), t.minBalance, t.disableContracts, t.disabledAddresses),
          disabledAddresses: t.disabledAddresses,
          walletId: n.id,
          minBalance: t.minBalance,
          decimals: t.decimals,
          disableContracts: t.disableContracts,
          disabled: t.isAccountDisabled(n),
          tooltipProps: t.tooltipProps,
          onAccountSelected: t.onAccountSelected,
          onClick: (a) => t.accountClicked(n)
        }, null, 8, ["accounts", "disabledAddresses", "walletId", "minBalance", "decimals", "disableContracts", "disabled", "tooltipProps", "onAccountSelected", "onClick"])
      ]))), 128))
    ], 2),
    x("div", I0, [
      t.allowLogin ? (l(), D("button", {
        key: 0,
        class: "nq-button-s",
        onClick: e[0] || (e[0] = (...n) => t.onLogin && t.onLogin(...n))
      }, k(t.$t("Login to another account")), 1)) : B("", !0)
    ])
  ]);
}
const gn = /* @__PURE__ */ _(e0, [["render", j0], ["__scopeId", "data-v-0ee37ce2"]]);
function Qt(t, e) {
  for (var M = 0, I = e.split(""), u = Array.isArray(I), i = 0, I = u ? I : I[Symbol.iterator](); ; ) {
    var L;
    if (u) {
      if (i >= I.length)
        break;
      L = I[i++];
    } else {
      if (i = I.next(), i.done)
        break;
      L = i.value;
    }
    var j = L;
    j === t && M++;
  }
  return M;
}
function n0(t, e) {
  for (var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x", u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ", i = t.length, I = Qt("(", t), L = Qt(")", t), j = I - L; j > 0 && i < e.length; )
    t += e[i].replace(M, u), e[i] === ")" && j--, i++;
  return t;
}
function o0(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x", M = arguments.length > 2 ? arguments[2] : void 0;
  if (!t)
    return function(i) {
      return {
        text: i
      };
    };
  var u = Qt(e, t);
  return function(i) {
    if (!i)
      return {
        text: "",
        template: t
      };
    for (var I = 0, L = "", a = t.split(""), j = Array.isArray(a), n = 0, a = j ? a : a[Symbol.iterator](); ; ) {
      var y;
      if (j) {
        if (n >= a.length)
          break;
        y = a[n++];
      } else {
        if (n = a.next(), n.done)
          break;
        y = n.value;
      }
      var s = y;
      if (s !== e) {
        L += s;
        continue;
      }
      if (L += i[I], I++, I === i.length && i.length < u)
        break;
    }
    return M && (L = n0(L, t)), {
      text: L,
      template: t
    };
  };
}
function a0(t, e, M) {
  for (var u = "", i = 0, I = 0; I < t.length; ) {
    var L = M(t[I], u);
    L !== void 0 && (u += L, e !== void 0 && (e === I ? i = u.length - 1 : e > I && (i = u.length))), I++;
  }
  e === void 0 && (i = u.length);
  var j = {
    value: u,
    caret: i
  };
  return j;
}
function s0(t, e, M) {
  typeof M == "string" && (M = o0(M));
  var u = M(t) || {}, i = u.text, I = u.template;
  if (i === void 0 && (i = t), I)
    if (e === void 0)
      e = i.length;
    else {
      for (var L = 0, j = !1, n = -1; L < i.length && L < I.length; ) {
        if (i[L] !== I[L]) {
          if (e === 0) {
            j = !0, e = L;
            break;
          }
          n = L, e--;
        }
        L++;
      }
      j || (e = n + 1);
    }
  return {
    text: i,
    caret: e
  };
}
function g0(t, e, M) {
  switch (M) {
    case "Backspace":
      e > 0 && (t = t.slice(0, e - 1) + t.slice(e), e--);
      break;
    case "Delete":
      t = t.slice(0, e) + t.slice(e + 1);
      break;
  }
  return {
    value: t,
    caret: e
  };
}
function Jt(t) {
  return t.hasAttribute("readonly");
}
function Ce(t) {
  if (t.selectionStart !== t.selectionEnd)
    return {
      start: t.selectionStart,
      end: t.selectionEnd
    };
}
var ee = {
  Backspace: 8,
  Delete: 46
};
function N0(t) {
  switch (t.keyCode) {
    case ee.Backspace:
      return "Backspace";
    case ee.Delete:
      return "Delete";
  }
}
function c0(t) {
  return t.selectionStart;
}
function Ee(t, e) {
  e !== void 0 && (y0() ? setTimeout(function() {
    return t.setSelectionRange(e, e);
  }, 0) : t.setSelectionRange(e, e));
}
function y0() {
  if (typeof navigator < "u")
    return r0.test(navigator.userAgent);
}
var r0 = /Android/i;
function S0(t, e, M, u, i) {
  Jt(e) || setTimeout(function() {
    return Dt(e, M, u, void 0, i);
  }, 0);
}
function l0(t, e, M, u, i) {
  if (!Jt(e)) {
    var I = Ce(e);
    I && ze(e, I), Dt(e, M, u, void 0, i);
  }
}
function T0(t, e, M, u, i) {
  Dt(e, M, u, void 0, i);
}
function A0(t, e, M, u, i) {
  if (!Jt(e)) {
    var I = N0(t);
    switch (I) {
      case "Delete":
      case "Backspace":
        t.preventDefault();
        var L = Ce(e);
        return L ? (ze(e, L), Dt(e, M, u, void 0, i)) : Dt(e, M, u, I, i);
    }
  }
}
function ze(t, e) {
  var M = t.value;
  M = M.slice(0, e.start) + M.slice(e.end), t.value = M, Ee(t, e.start);
}
function Dt(t, e, M, u, i) {
  var I = a0(t.value, c0(t), e), L = I.value, j = I.caret;
  if (u) {
    var n = g0(L, j, u);
    L = n.value, j = n.caret;
  }
  var a = s0(L, j, M), y = a.text;
  j = a.caret, t.value = y, Ee(t, j), i(L);
}
const we = 9 * 4, wt = we + 8;
function yt(t, e, M = !1) {
  if (!M || dt(e + t)) {
    switch (t.toUpperCase()) {
      case "I":
        t = "1";
        break;
      case "O":
        t = "0";
        break;
      case "Z":
        t = "2";
        break;
      case "W":
        return;
    }
    return new RegExp(`^(N(Q?)|NQ\\d{1,2}|NQ\\d{2}[0-9A-Z]{1,${we - 4}})$`, "i").test(e + t) ? t : void 0;
  } else
    return /^[-a-z0-9]*([a-z0-9]\.[a-z]*)?$/i.test(e + t) ? t : void 0;
}
function rt(t, e = !1) {
  return !e || dt(t) ? (t !== "" && t.toUpperCase() !== "N" && (t = Pt(t).replace(/.{4}/g, (M, u) => `${M}${(u + 4) % 12 ? " " : `
`}`).substring(0, wt), t.endsWith(" ") && (t += "\u200B")), {
    text: t,
    template: `wwww wwww wwww
wwww wwww wwww
wwww wwww wwww`
  }) : {
    text: t
  };
}
function Pt(t) {
  return t.replace(/\s|\u200B/g, "");
}
function Me(t, e = !1) {
  return !e || dt(t) ? t.toUpperCase().replace(/\n/g, " ").replace(/\u200B/g, "") : t.replace(/\n/g, "").replace(/\u200B/g, "");
}
function dt(t) {
  return t.length < 3 ? !1 : !!(t.toUpperCase().startsWith("NQ") && !isNaN(parseInt(t[2], 10)));
}
var he = /* @__PURE__ */ ((t) => (t.PASTE = "paste", t.MODELVALUE_UPDATE = "update:modelValue", t.ADDRESS = "address", t))(he || {});
const D0 = Z({
  name: "AddressInput",
  emits: Object.values(he),
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    autofocus: Boolean,
    allowDomains: Boolean
  },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(""), I = E(-1), L = E(-1), j = CSS.supports("mix-blend-mode", "screen"), n = Q(() => !t.allowDomains || dt(i.value)), a = Q(() => i.value.length >= 3 && !n.value);
    Mt(() => {
      s(), document.addEventListener("selectionchange", T), t.autofocus && y();
    }), ot(() => {
      document.removeEventListener("selectionchange", T);
    });
    function y(g = !1) {
      !u.value || (u.value.focus(), g && u.value.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
    U(() => t.modelValue, () => s());
    function s() {
      if (Pt(t.modelValue) === Pt(i.value))
        return;
      const g = t.modelValue.split("").reduce((A, w) => A + (yt(w, A, t.allowDomains) || ""), "");
      u.value && (u.value.value = rt(g, t.allowDomains).text), d(g);
    }
    function o(g) {
      A0(
        g,
        u.value,
        (A, w) => yt(A, w, t.allowDomains),
        (A) => rt(A, t.allowDomains),
        d
      ), setTimeout(() => T(), 10);
    }
    function r(g) {
      if (g.inputType === "deleteByDrag")
        return;
      const A = u.value;
      T0(
        g,
        A,
        (w, h) => yt(w, h, t.allowDomains),
        (w) => rt(w, t.allowDomains),
        d
      );
    }
    function S(g) {
      const A = g.clipboardData, w = A ? A.getData("text/plain") : "";
      e.emit("paste", g, w), l0(
        g,
        u.value,
        (h, O) => yt(h, O, t.allowDomains),
        (h) => rt(h, t.allowDomains),
        d
      );
    }
    function N(g) {
      S0(
        g,
        u.value,
        (A, w) => yt(A, w, t.allowDomains),
        (A) => rt(A, t.allowDomains),
        d
      ), z();
    }
    function C() {
      setTimeout(() => T());
    }
    function z() {
      const g = Me(document.getSelection().toString(), t.allowDomains);
      setTimeout(() => Rt.copy(g));
    }
    function d(g) {
      if (!u.value)
        return;
      const A = u.value;
      if (A.selectionStart === A.selectionEnd && (A.value[A.selectionStart] === " " || A.value[A.selectionStart] === `
`) && (A.selectionStart += 1), i.value = Me(u.value.value, t.allowDomains), e.emit("update:modelValue", i.value), dt(g)) {
        const w = gt.isValidAddress(i.value);
        w && e.emit("address", i.value), M.value && M.value.classList.toggle("invalid", i.value.length === wt && !w);
      }
    }
    function T() {
      if (!u.value)
        return;
      const g = u.value, A = document.activeElement === g && (g.selectionStart !== wt || g.selectionEnd !== wt);
      I.value = A ? Math.floor(g.selectionStart / 5) : -1, L.value = A ? Math.floor(g.selectionEnd / 5) : -1;
    }
    function c(g) {
      return I.value <= g && g <= L.value;
    }
    return e.expose({ focus: y }), {
      root$: M,
      textarea$: u,
      currentValue: i,
      supportsMixBlendMode: j,
      willBeAddressBool: n,
      isDomain: a,
      onKeyDown: o,
      onInput: r,
      onPaste: S,
      onCut: N,
      onFocus: C,
      formatClipboard: z,
      updateSelection: T,
      isBlockFocused: c
    };
  }
});
const d0 = /* @__PURE__ */ Nt('<svg width="210" height="99" viewBox="0 0 210 99" fill="none" xmlns="http://www.w3.org/2000/svg" class="grid" data-v-7b22efe7><g stroke-width="1.5" stroke-linecap="round" data-v-7b22efe7><line x1="67.75" y1="0.75" x2="67.75" y2="22.25" data-v-7b22efe7></line><line x1="67.75" y1="37.75" x2="67.75" y2="60.25" data-v-7b22efe7></line><line x1="67.75" y1="75.75" x2="67.75" y2="98.25" data-v-7b22efe7></line><line x1="0.75" y1="30.25" x2="209.25" y2="30.25" data-v-7b22efe7></line><line x1="0.75" y1="68.25" x2="209.25" y2="68.25" data-v-7b22efe7></line><line x1="143.75" y1="37.75" x2="143.75" y2="60.25" data-v-7b22efe7></line><line x1="143.75" y1="0.75" x2="143.75" y2="22.25" data-v-7b22efe7></line><line x1="143.75" y1="75.75" x2="143.75" y2="98.25" data-v-7b22efe7></line></g></svg>', 1);
function x0(t, e, M, u, i, I) {
  return l(), D("div", {
    class: b(["address-input", { "is-domain": t.isDomain }]),
    ref: "root$"
  }, [
    x("textarea", {
      ref: "textarea$",
      spellcheck: "false",
      autocomplete: "off",
      class: b({ "will-be-address": t.willBeAddressBool }),
      onKeydown: e[0] || (e[0] = (...L) => t.onKeyDown && t.onKeyDown(...L)),
      onInput: e[1] || (e[1] = (...L) => t.onInput && t.onInput(...L)),
      onPaste: e[2] || (e[2] = (...L) => t.onPaste && t.onPaste(...L)),
      onCut: e[3] || (e[3] = (...L) => t.onCut && t.onCut(...L)),
      onCopy: e[4] || (e[4] = (...L) => t.formatClipboard && t.formatClipboard(...L)),
      onClick: e[5] || (e[5] = (...L) => t.updateSelection && t.updateSelection(...L)),
      onSelect: e[6] || (e[6] = (...L) => t.updateSelection && t.updateSelection(...L)),
      onBlur: e[7] || (e[7] = (...L) => t.updateSelection && t.updateSelection(...L)),
      onFocus: e[8] || (e[8] = (...L) => t.onFocus && t.onFocus(...L))
    }, null, 34),
    t.willBeAddressBool && t.supportsMixBlendMode ? (l(), D(K, { key: 0 }, et(3, (L) => (l(), D(K, null, [
      (l(), D(K, null, et(3, (j) => x("div", {
        key: `color-${L}-${j}`,
        class: "color-overlay",
        style: xt({
          visibility: t.currentValue ? "visible" : "hidden",
          left: `calc(${j - 1} * (var(--block-width) + var(--block-gap-h)) + var(--block-gap-h) - 0.25rem)`,
          top: `calc(${L - 1} * (var(--block-height) + var(--block-gap-v)) + var(--block-gap-v) + 0.25rem)`,
          background: `var(--nimiq-${t.isBlockFocused((L - 1) * 3 + (j - 1)) ? "light-" : ""}blue)`
        })
      }, null, 4)), 64))
    ], 64))), 64)) : B("", !0),
    d0
  ], 2);
}
const Nn = /* @__PURE__ */ _(D0, [["render", x0], ["__scopeId", "data-v-7b22efe7"]]);
var Gt = /* @__PURE__ */ ((t) => (t.MODELVALUE_UPDATE = "update:modelValue", t.PASTE = "paste", t.SUBMIT = "submit", t))(Gt || {});
const C0 = Z({
  name: "AmountInput",
  emits: Object.values(Gt),
  props: {
    modelValue: Number,
    maxFontSize: {
      type: Number,
      default: 8
    },
    placeholder: {
      type: String,
      default: "0"
    },
    vanishing: {
      type: Boolean,
      default: !1
    },
    decimals: {
      type: Number,
      default: 5
    }
  },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(null), I = E(null), L = E(""), j = E(0), n = E(50), a = E(t.maxFontSize), y = E(0), s = E(0), o = E(!1);
    Mt(() => {
      t.maxFontSize && M.value && (y.value = M.value.offsetWidth);
    });
    function r() {
      u.value && u.value.focus();
    }
    function S(z) {
      z !== s.value && (j.value = z || 0, C.value = z ? (z / Math.pow(10, t.decimals)).toString() : "", N());
    }
    async function N() {
      if (await it(), !i.value || !I.value)
        return;
      const z = i.value.offsetWidth, d = I.value.offsetWidth, T = Math.min(1, Math.max(y.value / d, 1 / t.maxFontSize));
      a.value = T * t.maxFontSize, n.value = C.value ? T === 1 ? d : y.value : z;
    }
    const C = Q({
      get() {
        return L.value;
      },
      set(z) {
        if (L.value = z, !z) {
          L.value = "", j.value = 0, s.value = 0, e.emit("update:modelValue", s.value);
          return;
        }
        z = z.replace(/\,/, ".");
        const T = new RegExp(`(\\d*)(\\.(\\d{0,${t.decimals}}))?`, "g").exec(z);
        T[1] || T[2] ? (L.value = `${T[1] ? T[1] : "0"}${T[2] ? T[2] : ""}`, s.value = Number(
          `${T[1]}${(T[2] ? T[3] : "").padEnd(t.decimals, "0")}`
        )) : (L.value = "", s.value = 0), j.value !== s.value && (e.emit("update:modelValue", s.value), j.value = s.value);
      }
    });
    return U(C, N), U(
      () => t.modelValue,
      (z) => z && S(z),
      { immediate: !0 }
    ), e.expose({ focus: r, formattedValue: C }), {
      fullWidth$: M,
      input$: u,
      widthPlaceholder$: i,
      widthValue$: I,
      valueInLuna: s,
      isFocussed: o,
      maxWidth: y,
      formattedValue: C,
      width: n,
      fontSize: a,
      AmountInputEvent: Gt
    };
  }
});
const E0 = (t) => (jt("data-v-426cc8a1"), t = t(), nt(), t), z0 = ["placeholder"], w0 = /* @__PURE__ */ E0(() => /* @__PURE__ */ x("span", { class: "nim" }, "NIM", -1));
function h0(t, e, M, u, i, I) {
  return l(), D("div", {
    class: b(["amount-input", { "has-value": t.valueInLuna > 0, focussed: t.isFocussed }])
  }, [
    x("form", {
      class: "label-input",
      onSubmit: e[4] || (e[4] = ut((L) => t.$emit(t.AmountInputEvent.SUBMIT, L), ["prevent"])),
      ref: "fullWidth$"
    }, [
      x("span", {
        class: "width-finder width-placeholder",
        ref: "widthPlaceholder$"
      }, k(t.placeholder), 513),
      t.maxFontSize ? (l(), D("div", {
        key: 0,
        class: b(["full-width", { "width-finder": t.maxWidth > 0 }])
      }, "Width", 2)) : B("", !0),
      x("span", {
        class: "width-finder width-value",
        ref: "widthValue$"
      }, k(t.formattedValue || ""), 513),
      $t(x("input", {
        type: "text",
        inputmode: "decimal",
        class: b(["nq-input", { vanishing: t.vanishing }]),
        ref: "input$",
        placeholder: t.placeholder,
        style: xt({ width: `${t.width}px`, fontSize: `${t.fontSize}rem` }),
        onFocus: e[0] || (e[0] = (L) => t.isFocussed = !0),
        onBlur: e[1] || (e[1] = (L) => t.isFocussed = !1),
        onPaste: e[2] || (e[2] = (L) => t.$emit(t.AmountInputEvent.PASTE, L)),
        "onUpdate:modelValue": e[3] || (e[3] = (L) => t.formattedValue = L)
      }, null, 46, z0), [
        [ne, t.formattedValue]
      ])
    ], 544),
    w0
  ], 2);
}
const m0 = /* @__PURE__ */ _(C0, [["render", h0], ["__scopeId", "data-v-426cc8a1"]]), O0 = /(-)?\D*(\d+)(\.(\d+))?/, v0 = /(\d)\D(\d)/, Y0 = /[A-Z]{3}\s?/i, f0 = /[A-Z.]$/i, k0 = Z({
  name: "FiatAmount",
  props: {
    amount: {
      type: Number,
      required: !0
    },
    currency: {
      type: String,
      required: !0
    },
    maxRelativeDeviation: {
      type: Number,
      default: 0.1
    },
    hideDecimals: {
      type: Boolean,
      default: !1
    },
    locale: String
  },
  setup(t) {
    const e = Q(() => {
      const u = M(t.currency), i = t.locale ? new W(t.currency, t.locale) : new W(t.currency), I = {
        style: "currency",
        currency: t.currency,
        currencyDisplay: "code",
        useGrouping: !1,
        numberingSystem: "latn",
        minimumFractionDigits: t.hideDecimals ? 0 : i.decimals,
        maximumFractionDigits: t.hideDecimals ? 0 : i.decimals
      };
      let L, j, n;
      do {
        L = t.amount.toLocaleString([
          t.locale || u,
          u,
          `${navigator.language.substring(0, 2)}-${u}`,
          navigator.language,
          `en-${u}`,
          "en"
        ], I).replace(v0, "$1.$2");
        const a = L.match(O0), [, y, , s, o] = a;
        j = a[2];
        const r = `${y || ""}${j}${s || ""}`;
        n = Math.abs((t.amount - Number.parseFloat(r)) / t.amount);
        const S = o ? o.length + 1 : 1;
        I.minimumFractionDigits = S, I.maximumFractionDigits = S;
      } while (n > t.maxRelativeDeviation && I.minimumFractionDigits <= 20 && !t.hideDecimals);
      return L = L.replace(Y0, (a, y) => y !== 0 || !f0.test(i.symbol) ? i.symbol : `${i.symbol}\xA0`), j.length <= 4 ? L : L.replace(j, new It(j).toString(!0));
    });
    function M(u) {
      switch (u = u.toLowerCase(), u) {
        case "eur":
        case "chf":
          return "de";
        case "gbp":
        case "usd":
          return "en";
        case "cny":
          return "zh";
        default:
          return u.substr(0, 2);
      }
    }
    return { currencyString: e };
  }
}), p0 = { class: "fiat-amount" };
function U0(t, e, M, u, i, I) {
  return l(), D("span", p0, k(t.currencyString), 1);
}
const me = /* @__PURE__ */ _(k0, [["render", U0]]);
var Oe = /* @__PURE__ */ ((t) => (t.MODELVALUE_UPDATE = "update:modelValue", t))(Oe || {});
const b0 = Z({
  name: "AmountWithFee",
  emits: Object.values(Oe),
  props: {
    modelValue: {
      type: Object,
      default: () => ({ amount: 0, fee: 0, isValid: !1 })
    },
    availableBalance: {
      type: Number,
      default: 0
    },
    fiatAmount: Number,
    fiatCurrency: String
  },
  methods: { $t: q("AmountWithFee") },
  setup(t, e) {
    const M = E(null), u = E(t.modelValue.amount), i = Q(() => u.value > 0 && u.value + t.modelValue.fee <= t.availableBalance);
    Mt(L), U(i, I, { immediate: !0 });
    function I() {
      e.emit("update:modelValue", {
        amount: u.value,
        fee: t.modelValue.fee,
        isValid: i.value
      });
    }
    U(u, L, { immediate: !0 });
    function L() {
      e.emit("update:modelValue", {
        amount: u.value,
        fee: t.modelValue.fee,
        isValid: i.value
      });
    }
    function j() {
      M.value && M.value.focus();
    }
    return e.expose({ focus: j }), {
      amountInput$: M,
      liveAmount: u,
      isValid: i
    };
  },
  components: {
    Amount: mt,
    AmountInput: m0,
    FiatAmount: me
  }
});
const Q0 = { class: "amount-with-fee" }, P0 = { class: "fee-section nq-text-s" }, G0 = {
  key: 0,
  class: "nq-red"
}, B0 = { key: 1 }, _0 = {
  key: 0,
  class: "fiat"
}, Z0 = {
  key: 1,
  class: "fee"
};
function $0(t, e, M, u, i, I) {
  const L = G("AmountInput"), j = G("FiatAmount"), n = G("Amount");
  return l(), D("div", Q0, [
    $(L, {
      class: b(["value", { invalid: !t.isValid && t.liveAmount > 0 }]),
      modelValue: t.liveAmount,
      "onUpdate:modelValue": e[0] || (e[0] = (a) => t.liveAmount = a),
      ref: "amountInput$"
    }, null, 8, ["modelValue", "class"]),
    x("div", P0, [
      !t.isValid && t.liveAmount ? (l(), D("div", G0, [
        X(t.$slots, "insufficient-balance-error", {}, () => [
          J(k(t.$t("Insufficient balance")), 1)
        ], !0)
      ])) : (l(), D("div", B0, [
        t.fiatAmount && t.fiatCurrency ? (l(), D("span", _0, [
          J(" ~"),
          $(j, {
            amount: t.fiatAmount,
            currency: t.fiatCurrency
          }, null, 8, ["amount", "currency"])
        ])) : B("", !0),
        t.modelValue.fee ? (l(), D("span", Z0, [
          J(" + "),
          $(n, {
            amount: t.modelValue.fee,
            minDecimals: 0,
            maxDecimals: 5
          }, null, 8, ["amount"]),
          J(" " + k(t.$t("fee")), 1)
        ])) : B("", !0)
      ]))
    ])
  ]);
}
const cn = /* @__PURE__ */ _(b0, [["render", $0], ["__scopeId", "data-v-3554c7c4"]]);
var ve = /* @__PURE__ */ ((t) => (t.CLOSE = "close", t))(ve || {}), Bt = /* @__PURE__ */ ((t) => (t.DARK = "dark", t.LIGHT = "light", t.GREEN = "green", t))(Bt || {});
const W0 = Z({
  name: "BottomOverlay",
  emits: Object.values(ve),
  props: {
    theme: {
      type: String,
      default: "dark",
      validator: (t) => typeof t == "string" && Object.values(Bt).includes(t)
    }
  },
  setup(t, e) {
    const M = E(!1);
    function u() {
      e.emit("close");
    }
    async function i() {
      var I, L;
      M.value = !!((L = (I = Ve()) == null ? void 0 : I.vnode.props) != null && L.onClose);
    }
    return U(() => e.attrs.onClose, i, { immediate: !0 }), {
      hasCloseButton: M,
      onClose: u,
      BottomOverlayTheme: Bt
    };
  },
  components: {
    CloseButton: Ae
  }
});
function R0(t, e, M, u, i, I) {
  const L = G("CloseButton");
  return l(), D("div", {
    class: b(["bottom-overlay", [t.theme, { "has-close-button": t.hasCloseButton }]])
  }, [
    X(t.$slots, "default", {}, void 0, !0),
    t.hasCloseButton ? (l(), H(L, {
      key: 0,
      class: b(["close-button", { inverse: [t.BottomOverlayTheme.DARK, t.BottomOverlayTheme.GREEN].includes(t.theme) }]),
      onClick: t.onClose
    }, null, 8, ["class", "onClick"])) : B("", !0)
  ], 2);
}
const yn = /* @__PURE__ */ _(W0, [["render", R0], ["__scopeId", "data-v-4caafc56"]]);
var Ye = /* @__PURE__ */ ((t) => (t.SELECT = "select", t))(Ye || {});
const H0 = Z({
  name: "Carousel",
  emits: Object.values(Ye),
  props: {
    entries: {
      type: Array,
      default: () => [],
      validator: (t) => Array.isArray(t) && t.length > 0 && !t.some((e) => typeof e != "string")
    },
    selected: String,
    entryMargin: {
      type: Number,
      default: 16
    },
    animationDuration: {
      type: Number,
      default: 1e3
    },
    hideBackgroundEntries: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(t, e) {
    const M = E(null), u = E({}), i = E(""), I = E(null), L = new kt(), j = /* @__PURE__ */ new Map(), n = Q(() => t.entries.length <= 2), a = Q(() => t.entries.length + (n.value ? 1 : 0));
    Mt(async () => {
      document.addEventListener("keydown", d), await y(!1), o(t.selected), r(!1);
    }), ot(() => {
      document.removeEventListener("keydown", d), I.value !== null && cancelAnimationFrame(I.value);
    }), U(() => t.entryMargin, y);
    async function y(T = !0) {
      const c = typeof T == "boolean" ? T : !0;
      await it();
      let g = 0, A = 0;
      for (let O = 0; O < t.entries.length; ++O) {
        const m = u.value[t.entries[O]], Y = u.value[t.entries[(O + 1) % t.entries.length]];
        g = Math.max(g, m.offsetHeight);
        const P = m.offsetWidth / 2 + Y.offsetWidth / 2 + t.entryMargin;
        A = Math.max(A, P);
      }
      const w = 2 * Math.PI / a.value / 2, h = A / 2 / Math.sin(w);
      L.tweenTo(h, c ? t.animationDuration : 0), M.value && (M.value.style.minHeight = `${g}px`), N();
    }
    U(() => t.entries, s);
    async function s() {
      await y(), o(i.value), r();
    }
    U(() => t.selected, o);
    function o(T) {
      if (T === void 0)
        return;
      const c = i.value, g = t.entries.includes(T), A = t.entries.includes(c);
      g ? i.value = T : A || (i.value = t.entries[0]), i.value !== c && e.emit("select", i.value);
    }
    U(i, r), U(() => t.disabled, r);
    function r(T = !0, c) {
      const g = typeof T == "boolean" && typeof c > "u" ? T : !0;
      for (const A of j.keys())
        t.entries.includes(A) || j.delete(A);
      for (const A of t.entries) {
        const w = j.get(A) || new kt(), h = g ? t.animationDuration : 0;
        w.tweenTo(S(A, w.currentValue), h), j.set(A, w);
      }
      N();
    }
    function S(T, c) {
      if (t.disabled && T !== i.value)
        return c + C(c, Math.PI);
      const g = 2 * Math.PI / a.value, A = t.entries.indexOf(T), w = t.entries.indexOf(i.value);
      let h = A - w;
      return n.value && h > a.value / 2 && (h += 1), c + C(c, h * g);
    }
    U(() => t.hideBackgroundEntries, N);
    function N() {
      I.value === null && (I.value = requestAnimationFrame(() => {
        const T = [];
        let c = L.finished;
        for (const [g, A] of j) {
          const w = A.currentValue, h = L.currentValue, O = Math.sin(w) * h, m = Math.cos(w) * h - h, Y = u.value[g];
          Y.style.transform = `translate3d(calc(${O}px - 50%),-50%,${m}px)`, Y.style.display = z(g) ? "none" : "", T.push([g, m]), c = c && A.finished;
        }
        T.sort(([, g], [, A]) => g - A);
        for (let g = 0; g < T.length; ++g) {
          const A = u.value[T[g][0]];
          A.style.zIndex = `${g}`;
        }
        I.value = null, c || N();
      }));
    }
    function C(T, c) {
      const g = (c - T) % (2 * Math.PI), A = g - Math.sign(g) * 2 * Math.PI;
      return Math.abs(Math.abs(g) - Math.abs(A)) < 1e-10 ? Math.min(g, A) : Math.abs(g) < Math.abs(A) ? g : A;
    }
    function z(T) {
      const c = j.get(T);
      if (!c || !t.disabled && !t.hideBackgroundEntries)
        return !1;
      const g = Math.abs(C(0, c.currentValue));
      if (t.disabled)
        return Math.abs(g - Math.PI) < 1e-10;
      if (t.hideBackgroundEntries) {
        const A = 2 * Math.PI / a.value, w = Math.PI / 2 + A / (a.value - 1);
        return g > w;
      }
      return !1;
    }
    function d(T) {
      const c = T.target;
      if (t.disabled || c.tagName === "INPUT" || c.tagName === "TEXTAREA" || j.values().next().value.progress < 0.5)
        return;
      const g = t.entries.indexOf(i.value);
      let A;
      if (T.key === "ArrowLeft")
        A = (g - 1 + t.entries.length) % t.entries.length;
      else if (T.key === "ArrowRight")
        A = (g + 1) % t.entries.length;
      else
        return;
      o(t.entries[A]);
    }
    return {
      root$: M,
      refs$: u,
      effectiveSelected: i,
      updateSelection: o
    };
  }
});
const V0 = ["onClick", "onFocusin"];
function F0(t, e, M, u, i, I) {
  return l(), D("div", {
    class: b(["carousel", { disabled: t.disabled }]),
    ref: "root$"
  }, [
    (l(!0), D(K, null, et(t.entries, (L, j) => (l(), D("div", {
      ref_for: !0,
      ref: (n) => {
        t.refs$[L] = n;
      },
      key: j,
      class: b({ selected: t.effectiveSelected === L }),
      onClick: (n) => !t.disabled && t.updateSelection(L),
      onFocusin: (n) => !t.disabled && t.updateSelection(L)
    }, [
      X(t.$slots, L, {}, void 0, !0)
    ], 42, V0))), 128))
  ], 2);
}
const rn = /* @__PURE__ */ _(H0, [["render", F0], ["__scopeId", "data-v-a4c65f86"]]), J0 = {};
const fe = (t) => (jt("data-v-fe97e451"), t = t(), nt(), t), X0 = {
  class: "circle-spinner",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 18 18",
  width: "18",
  height: "18",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round"
}, K0 = /* @__PURE__ */ fe(() => /* @__PURE__ */ x("path", {
  stroke: "#0582CA",
  d: "M9,1c4.42,0,8,3.58,8,8"
}, null, -1)), q0 = /* @__PURE__ */ fe(() => /* @__PURE__ */ x("path", {
  stroke: "#1F2348",
  opacity: ".3",
  d: "M4.27,2.56C2.29,4.01,1,6.35,1,9c0,4.42,3.58,8,8,8c2.65,0,4.99-1.29,6.44-3.27"
}, null, -1)), tI = [
  K0,
  q0
];
function eI(t, e, M, u, i, I) {
  return l(), D("svg", X0, tI);
}
const Sn = /* @__PURE__ */ _(J0, [["render", eI], ["__scopeId", "data-v-fe97e451"]]), ie = 3, ue = 2.5, MI = Z({
  name: "CopyableField",
  props: {
    modelValue: {
      type: Object,
      required: !0,
      validator: (t) => typeof t == "string" || typeof t == "number" || typeof t == "object" && Object.keys(t).length > 0
    },
    label: String,
    small: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: q("CopyableField") },
  setup(t) {
    const e = E(null), M = E(null), u = E(""), i = E(t.small ? ue : ie), I = E(!1), L = E(null);
    Mt(() => {
      window.addEventListener("resize", y), y();
    }), ot(() => window.removeEventListener("resize", y));
    const j = Q(() => typeof t.modelValue != "string" && typeof t.modelValue != "number"), n = Q(() => j.value && Object.keys(t.modelValue).length === 1);
    U(() => t.modelValue, a, { immediate: !0 });
    function a() {
      const o = j.value ? Object.keys(t.modelValue) : [];
      o.length > 0 && (!u.value || !o.includes(u.value)) ? u.value = o[0] : y();
    }
    U(u, y), U(() => t.small, y);
    async function y() {
      if (await it(), !M.value || !e.value)
        return;
      const o = t.small ? ue : ie;
      e.value.style.fontSize = `${o}rem`;
      const r = M.value.offsetWidth, S = e.value.offsetWidth, N = r / S;
      e.value.style.fontSize = "", i.value = Math.min(o, o * N);
    }
    function s() {
      Rt.copy(
        j.value ? t.modelValue[u.value].toString() : t.modelValue.toString()
      ), I.value = !0, L.value && window.clearTimeout(L.value), L.value = window.setTimeout(() => {
        I.value = !1;
      }, 500);
    }
    return {
      value$: e,
      valueContainer$: M,
      currentKey: u,
      fontSize: i,
      copied: I,
      isKeyedValue: j,
      hasSingleKey: n,
      copy: s
    };
  }
});
const iI = {
  key: 0,
  class: "nq-label"
}, uI = ["onClick", "tabindex"], LI = { class: "copy-notice" };
function II(t, e, M, u, i, I) {
  return l(), D("div", {
    class: b(["copyable-field", { small: t.small }])
  }, [
    t.label ? (l(), D("span", iI, k(t.label), 1)) : B("", !0),
    x("div", {
      class: b(["copyable-field-content", { "simple-value": !t.isKeyedValue, copied: t.copied }]),
      onClick: e[0] || (e[0] = (...L) => t.copy && t.copy(...L))
    }, [
      x("div", {
        ref: "valueContainer$",
        class: "value-container",
        style: xt({ fontSize: t.fontSize + "rem" })
      }, [
        x("span", {
          ref: "value$",
          class: "value"
        }, k(typeof t.modelValue == "object" ? t.modelValue[t.currentKey] : t.modelValue), 513)
      ], 4),
      (l(!0), D(K, null, et(t.isKeyedValue ? Object.keys(t.modelValue) : [], (L) => (l(), D("button", {
        class: b(["nq-button-s", {
          inverse: t.currentKey === L,
          "single-key": t.hasSingleKey
        }]),
        key: L,
        onClick: ut((j) => t.currentKey = L, ["stop"]),
        tabindex: t.hasSingleKey ? -1 : 0
      }, k(L), 11, uI))), 128)),
      x("div", LI, k(t.$t("Copied")), 1)
    ], 2)
  ], 2);
}
const ln = /* @__PURE__ */ _(MI, [["render", II], ["__scopeId", "data-v-c41faa3b"]]), jI = {};
const ke = (t) => (jt("data-v-500cd6b7"), t = t(), nt(), t), nI = {
  height: "48",
  width: "54",
  viewBox: "0 0 54 48",
  color: "inherit",
  class: "loading-spinner"
}, oI = /* @__PURE__ */ ke(() => /* @__PURE__ */ x("path", {
  id: "big-hex",
  d: "M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z",
  stroke: "currentColor",
  "stroke-width": "3",
  fill: "none",
  "stroke-linecap": "round",
  opacity: "0.4",
  "stroke-dasharray": "92.5 60"
}, null, -1)), aI = /* @__PURE__ */ ke(() => /* @__PURE__ */ x("path", {
  id: "small-hex",
  d: "M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z",
  stroke: "currentColor",
  "stroke-width": "3",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-dasharray": "47.5 105"
}, null, -1)), sI = [
  oI,
  aI
];
function gI(t, e, M, u, i, I) {
  return l(), D("svg", nI, sI);
}
const Tn = /* @__PURE__ */ _(jI, [["render", gI], ["__scopeId", "data-v-500cd6b7"]]), NI = {};
const cI = { class: "page-body nq-card-body" };
function yI(t, e, M, u, i, I) {
  return l(), D("div", cI, [
    X(t.$slots, "default", {}, void 0, !0)
  ]);
}
const An = /* @__PURE__ */ _(NI, [["render", yI], ["__scopeId", "data-v-62242d50"]]), rI = {};
const SI = { class: "page-footer nq-card-footer" };
function lI(t, e, M, u, i, I) {
  return l(), D("div", SI, [
    X(t.$slots, "default", {}, void 0, !0)
  ]);
}
const Dn = /* @__PURE__ */ _(rI, [["render", lI], ["__scopeId", "data-v-6c313288"]]);
var pe = /* @__PURE__ */ ((t) => (t.BACK = "back", t))(pe || {});
const TI = Z({
  name: "PageHeader",
  props: {
    backArrow: {
      type: Boolean,
      default: !1
    },
    progressIndicator: {
      type: Boolean,
      default: !1
    },
    numberSteps: {
      type: Number,
      default: 6
    },
    step: {
      type: Number,
      default: 1
    }
  },
  methods: { $t: q("PageHeader") },
  setup(t) {
    return {
      progressSteps: Q(() => {
        const M = [];
        for (let u = 1; u <= t.numberSteps; u++)
          M.push(u);
        return M;
      }),
      PageHeaderEvent: pe
    };
  },
  components: { ArrowLeftIcon: U4 }
});
const AI = {
  key: 0,
  class: "progress-indicator"
}, DI = ["title"], dI = { class: "nq-h1" };
function xI(t, e, M, u, i, I) {
  const L = G("ArrowLeftIcon");
  return l(), D("div", {
    class: b(["page-header nq-card-header", t.progressIndicator ? "has-progress-indicator" : ""])
  }, [
    t.progressIndicator ? (l(), D("div", AI, [
      (l(!0), D(K, null, et(t.progressSteps, (j) => (l(), D("div", {
        class: b(["indicator", j <= t.step ? "active" : ""]),
        key: j
      }, null, 2))), 128))
    ])) : B("", !0),
    t.backArrow ? (l(), D("a", {
      key: 1,
      href: "#",
      class: "page-header-back-button",
      onClick: e[0] || (e[0] = ut((j) => t.$emit(t.PageHeaderEvent.BACK), ["prevent"])),
      title: t.$t("Go back")
    }, [
      $(L)
    ], 8, DI)) : B("", !0),
    x("h1", dI, [
      X(t.$slots, "default", {}, void 0, !0)
    ]),
    X(t.$slots, "more", {}, void 0, !0)
  ], 2);
}
const dn = /* @__PURE__ */ _(TI, [["render", xI], ["__scopeId", "data-v-50129964"]]), Xt = Z({
  name: "I18n",
  props: {
    path: {
      type: String,
      required: !0
    },
    componentName: {
      type: String,
      required: !0
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  render() {
    if (!Object.keys(this.$slots).length)
      throw new Error(
        "I18n: the component must contain at least 1 template slot, otherwise simply use the $t function."
      );
    const e = q(this.$props.componentName)(this.$props.path.replace(/\\n/g, `
`)).split(/({\w+})/g).map((M) => {
      const u = M.match(/^{(\w+)}$/);
      return u && this.$slots[u[1]]() || M;
    });
    return ae(this.$props.tag, {}, e);
  }
}), Ue = [
  { unit: "minute", factor: 60 },
  { unit: "hour", factor: 60 },
  { unit: "day", factor: 24 }
];
function CI(t, e = !0, M) {
  let u = t / 1e3, i = "second";
  for (const { unit: I, factor: L } of Ue) {
    if (u / L < 1 || i === M)
      break;
    u /= L, i = I;
  }
  if (u = Math.floor(u), e) {
    const I = q("Timer");
    return i = {
      get second() {
        return I("second");
      },
      get seconds() {
        return I("seconds");
      },
      get minute() {
        return I("minute");
      },
      get minutes() {
        return I("minutes");
      },
      get hour() {
        return I("hour");
      },
      get hours() {
        return I("hours");
      },
      get day() {
        return I("day");
      },
      get days() {
        return I("days");
      }
    }[`${i}${u !== 1 ? "s" : ""}`], `${u} ${i}`;
  } else
    return u;
}
const be = 8, Le = 3.25 * be, zt = be, Ie = 1.5;
var _t = /* @__PURE__ */ ((t) => (t.NORMAL = "normal", t.INVERSE = "inverse", t.WHITE = "white", t))(_t || {});
const EI = Z({
  name: "Timer",
  props: {
    startTime: Number,
    endTime: Number,
    alwaysShowTime: {
      type: Boolean,
      default: !0
    },
    theme: {
      type: String,
      default: "normal",
      validator: (t) => Object.values(_t).includes(t)
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    tooltipProps: Object,
    maxUnit: {
      type: String,
      required: !1,
      validator: (t) => [void 0, "second", "minute", "hour", "day"].includes(t)
    }
  },
  setup(t, e) {
    const M = E(null), u = E(0), i = E(0), I = E(!1), L = new kt(I.value || t.alwaysShowTime ? zt * Ie : zt), j = E(2 * Math.PI * L.currentValue), n = E(null), a = E(null), y = E(null), s = E(Le);
    function o(w) {
      u.value = w - Date.now();
    }
    e.expose({ synchronize: o }), Mt(() => {
      requestAnimationFrame(() => s.value = M.value.offsetWidth), window.addEventListener("resize", A);
    }), ot(() => {
      n.value && clearTimeout(n.value), a.value && clearTimeout(a.value), y.value && cancelAnimationFrame(y.value), window.removeEventListener("resize", A);
    });
    const r = Q(() => t.startTime === void 0 || t.endTime === void 0 ? 0 : Math.max(0, t.endTime - t.startTime)), S = Q(() => t.startTime === void 0 || t.endTime === void 0 ? 0 : Math.max(0, Math.min(r.value, t.endTime - i.value))), N = Q(() => t.startTime === void 0 || t.endTime === void 0 || r.value === 0 ? 0 : 1 - S.value / r.value), C = Q(() => {
      const w = j.value - 2.5 * t.strokeWidth, h = Math.min(w, (1 - N.value) * j.value), O = h + t.strokeWidth, m = j.value - h, Y = j.value / 4 - m;
      return { length: h, lengthWithLineCaps: O, gap: m, offset: Y, strokeWidth: t.strokeWidth };
    }), z = Q(() => {
      const w = j.value - C.value.lengthWithLineCaps - 2 * t.strokeWidth, h = Math.max(0, w), O = Math.min(t.strokeWidth, h), m = Math.max(0, h - O), Y = j.value - m, P = j.value / 4 - t.strokeWidth / 2 - t.strokeWidth - O / 2;
      return { length: m, lengthWithLineCaps: h, gap: Y, offset: P, strokeWidth: O };
    });
    function d() {
      const w = s.value / Le, O = j.value * w * 3, m = 1e3 / 60, Y = S.value, P = r.value, R = 2;
      let F = 1e3, tt = F / R;
      for (const { factor: Ct } of Ue) {
        const Lt = F * Ct, ct = Lt / R, Et = Math.min(ct, Math.max(m, P / O));
        if ((Y - Et) / Lt < 1) {
          Y / Lt > 1 && (tt = Y - Lt);
          break;
        }
        F = Lt, tt = ct;
      }
      return Math.min(tt, Math.max(m, r.value / O));
    }
    U(I, T, { immediate: !0 }), U(() => t.alwaysShowTime, T);
    function T() {
      L.tweenTo(I.value || t.alwaysShowTime ? Ie * zt : zt, 300), g();
    }
    U(() => t.startTime, c, { immediate: !0 }), U(() => t.endTime, c), U(u, c);
    function c() {
      i.value = Date.now() + u.value, n.value && clearTimeout(n.value), t.startTime && t.endTime && (n.value = window.setTimeout(
        () => e.emit("end", t.endTime),
        t.endTime - i.value
      ), g());
    }
    function g() {
      i.value = Date.now() + u.value, j.value = 2 * Math.PI * L.currentValue, !(S.value === 0 && L.finished) && (a.value && clearTimeout(a.value), y.value && cancelAnimationFrame(y.value), L.finished ? a.value = window.setTimeout(() => g(), d()) : y.value = requestAnimationFrame(() => g()));
    }
    function A() {
      M.value && (s.value = M.value.offsetWidth);
    }
    return {
      toSimplifiedTime: CI,
      TooltipThemes: At,
      TimerThemes: _t,
      root$: M,
      detailsShown: I,
      radius: L,
      timeLeftRef: S,
      progress: N,
      timeCircleInfo: C,
      fillerCircleInfo: z
    };
  },
  components: { Tooltip: Ot, I18n: Xt }
});
const Qe = (t) => (jt("data-v-84be38fa"), t = t(), nt(), t), zI = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 26 26"
}, wI = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"], hI = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"], mI = {
  key: 0,
  class: "info-exclamation-icon"
}, OI = /* @__PURE__ */ Qe(() => /* @__PURE__ */ x("rect", {
  x: "12",
  y: "9",
  width: "2",
  height: "2",
  rx: "1"
}, null, -1)), vI = /* @__PURE__ */ Qe(() => /* @__PURE__ */ x("rect", {
  x: "12",
  y: "12.5",
  width: "2",
  height: "4.5",
  rx: "1"
}, null, -1)), YI = [
  OI,
  vI
], fI = {
  key: 1,
  class: "countdown",
  x: "50%",
  y: "50%"
};
function kI(t, e, M, u, i, I) {
  const L = G("I18n"), j = G("Tooltip");
  return l(), H(j, ge({
    class: "timer",
    ref: "root$"
  }, {
    preferredPosition: "bottom right",
    theme: t.theme === t.TimerThemes.INVERSE || t.theme === t.TimerThemes.WHITE ? t.TooltipThemes.INVERSE : t.TooltipThemes.NORMAL,
    ...t.tooltipProps,
    styles: {
      width: "18.25rem",
      pointerEvents: "none",
      ...t.tooltipProps ? t.tooltipProps.styles : void 0
    }
  }, {
    onShow: e[0] || (e[0] = (n) => t.detailsShown = !0),
    onHide: e[1] || (e[1] = (n) => t.detailsShown = !1),
    class: {
      "time-shown": t.detailsShown || t.alwaysShowTime,
      "little-time-left": t.progress >= 0.75,
      "inverse-theme": t.theme === t.TimerThemes.INVERSE,
      "white-theme": t.theme === t.TimerThemes.WHITE
    }
  }), {
    trigger: V(() => [
      (l(), D("svg", zI, [
        x("circle", {
          ref: "time-circle",
          class: "time-circle",
          cx: "50%",
          cy: "50%",
          r: t.radius.currentValue,
          "stroke-dasharray": `${t.timeCircleInfo.length} ${t.timeCircleInfo.gap}`,
          "stroke-dashoffset": t.timeCircleInfo.offset,
          "stroke-width": t.timeCircleInfo.strokeWidth
        }, null, 8, wI),
        x("circle", {
          class: "filler-circle",
          cx: "50%",
          cy: "50%",
          r: t.radius.currentValue,
          "stroke-dasharray": `${t.fillerCircleInfo.length} ${t.fillerCircleInfo.gap}`,
          "stroke-dashoffset": t.fillerCircleInfo.offset,
          "stroke-width": t.fillerCircleInfo.strokeWidth
        }, null, 8, hI),
        $(Wt, { name: "transition-fade" }, {
          default: V(() => [
            !t.detailsShown && !t.alwaysShowTime ? (l(), D("g", mI, YI)) : (l(), D("text", fI, k(t.toSimplifiedTime(t.timeLeftRef, !1, t.maxUnit)), 1))
          ]),
          _: 1
        })
      ]))
    ]),
    default: V(() => [
      $(L, {
        path: "This offer expires in {timer}.",
        componentName: "Timer"
      }, {
        timer: V(() => [
          J(k(t.toSimplifiedTime(t.timeLeftRef, !0, t.maxUnit)), 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16, ["class"]);
}
const pI = /* @__PURE__ */ _(EI, [["render", kI], ["__scopeId", "data-v-84be38fa"]]);
function UI(t) {
  return "amount" in t && "currency" in t && "decimals" in t && Ht(t.amount) && typeof t.currency == "string" && typeof t.decimals == "number" && Number.isInteger(t.decimals);
}
function bI(t) {
  return "amount" in t && "currency" in t && typeof t.amount == "number" && typeof t.currency == "string";
}
const QI = 6e4, Yt = 0.1;
var Zt = /* @__PURE__ */ ((t) => (t.NORMAL = "normal", t.INVERSE = "inverse", t))(Zt || {});
const PI = Z({
  name: "PaymentInfoLine",
  props: {
    cryptoAmount: {
      type: Object,
      required: !0,
      validator: UI
    },
    fiatAmount: {
      type: Object,
      validator: bI
    },
    vendorMarkup: {
      type: Number,
      validator: (t) => t > -1
    },
    networkFee: {
      type: Number,
      validator: Ht
    },
    origin: {
      type: String,
      required: !0
    },
    address: String,
    shopLogoUrl: String,
    startTime: Number,
    endTime: Number,
    theme: {
      type: String,
      validator: (t) => Object.values(Zt).includes(t),
      default: "normal"
    },
    tooltipContainer: HTMLElement
  },
  methods: { $t: q("PaymentInfoLine") },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(null), I = E(-1), L = E(-1);
    Mt(() => C()), ot(() => window.clearTimeout(I.value));
    async function j(d) {
      await it(), M.value && M.value.synchronize(d);
    }
    e.expose({ setTime: j });
    const n = Q(() => t.origin.split("://")[1]), a = Q(() => t.fiatAmount ? t.fiatAmount.amount / (Number(t.cryptoAmount.amount) / 10 ** t.cryptoAmount.decimals) : null), y = Q(() => typeof t.vendorMarkup != "number" ? null : `${t.vendorMarkup >= 0 ? "+" : ""}${Math.ceil(t.vendorMarkup * 100 * 100 - 1e-10) / 100}%`), s = Q(() => {
      if (t.networkFee === null || t.networkFee === void 0)
        return !0;
      const d = Number(t.networkFee) / 10 ** t.cryptoAmount.decimals, c = 10 ** Math.min(6, t.cryptoAmount.decimals);
      return Math.round(d * c) / c === 0;
    }), o = Q(() => {
      if (a.value === null || i.value === null)
        return null;
      const d = 1 / a.value, T = 1 / i.value;
      return (d - T) / T;
    }), r = Q(() => o.value === null ? !1 : o.value >= Yt || t.vendorMarkup && t.vendorMarkup < 0 && o.value >= t.vendorMarkup + Yt), S = Q(() => o.value === null ? null : `${Math.round(Math.abs(o.value) * 100 * 10) / 10}%`);
    function N() {
      const d = q("PaymentInfoLine");
      return o.value === null || S.value === null || Math.abs(o.value) < Yt && !r.value ? null : o.value < 0 && r.value ? d(
        "Your actual discount is approx. {formattedRateDeviation} compared to the current market rate (coingecko.com).",
        { formattedRateDeviation: S.value }
      ) : o.value > 0 ? d(
        "You are paying approx. {formattedRateDeviation} more than at the current market rate (coingecko.com).",
        { formattedRateDeviation: S.value }
      ) : d(
        "You are paying approx. {formattedRateDeviation} less than at the current market rate (coingecko.com).",
        { formattedRateDeviation: S.value }
      );
    }
    U(() => t.cryptoAmount.currency, C), U(() => t.fiatAmount && t.fiatAmount.currency, C);
    async function C() {
      window.clearTimeout(I.value);
      const d = t.cryptoAmount.currency.toLowerCase(), T = t.fiatAmount ? t.fiatAmount.currency.toLowerCase() : null;
      if (!t.fiatAmount || !T || !Object.values(ft).includes(T) || !Object.values(at).includes(d)) {
        i.value = null;
        return;
      } else {
        const { [d]: { [T]: c } } = await MM([d], [T]);
        i.value = c || null;
      }
      I.value = window.setTimeout(
        () => C(),
        QI
      );
    }
    function z(d) {
      L.value = Date.now(), d && C();
    }
    return {
      PaymentInfoLineThemes: Zt,
      TooltipThemes: At,
      timer$: M,
      priceTooltip$: u,
      lastTooltipToggle: L,
      originDomain: n,
      effectiveRate: a,
      formattedVendorMarkup: y,
      isFormattedNetworkFeeZero: s,
      isBadRate: r,
      rateInfo: N,
      onPriceTooltipToggle: z
    };
  },
  components: {
    Account: Ft,
    Timer: pI,
    Amount: mt,
    FiatAmount: me,
    Tooltip: Ot,
    AlertTriangleIcon: Te,
    ArrowRightSmallIcon: b4,
    I18n: Xt
  }
});
const GI = (t) => (jt("data-v-d82993c8"), t = t(), nt(), t), BI = { class: "price-breakdown" }, _I = { key: 0 }, ZI = { key: 1 }, $I = { class: "free-service-info info" }, WI = /* @__PURE__ */ GI(() => /* @__PURE__ */ x("hr", null, null, -1)), RI = { class: "total" }, HI = {
  key: 1,
  class: "network-fee-info info"
}, VI = { class: "arrow-runway" };
function FI(t, e, M, u, i, I) {
  const L = G("Amount"), j = G("AlertTriangleIcon"), n = G("FiatAmount"), a = G("I18n"), y = G("Tooltip"), s = G("ArrowRightSmallIcon"), o = G("Account"), r = G("Timer");
  return l(), D("div", {
    class: b(["info-line", { "inverse-theme": t.theme === t.PaymentInfoLineThemes.INVERSE }])
  }, [
    x("div", {
      class: "amounts",
      onMouseenter: e[3] || (e[3] = (S) => t.priceTooltip$ && t.priceTooltip$.show()),
      onMouseleave: e[4] || (e[4] = (S) => t.priceTooltip$ && t.priceTooltip$.hide()),
      onClick: e[5] || (e[5] = (S) => t.priceTooltip$ && Date.now() - t.lastTooltipToggle > 200 && t.priceTooltip$.toggle())
    }, [
      $(L, {
        currency: t.cryptoAmount.currency,
        amount: t.cryptoAmount.amount,
        currencyDecimals: t.cryptoAmount.decimals,
        minDecimals: 0,
        maxDecimals: Math.min(4, t.cryptoAmount.decimals)
      }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"]),
      t.fiatAmount ? (l(), H(y, {
        key: 0,
        ref: "priceTooltip$",
        container: t.tooltipContainer,
        preferredPosition: "bottom left",
        margin: { left: 8 },
        styles: {
          minWidth: "37rem",
          padding: "2rem",
          lineHeight: "1.3"
        },
        theme: t.theme === t.PaymentInfoLineThemes.INVERSE ? t.TooltipThemes.INVERSE : t.TooltipThemes.NORMAL,
        onShow: e[0] || (e[0] = (S) => t.onPriceTooltipToggle(!0)),
        onHide: e[1] || (e[1] = (S) => t.onPriceTooltipToggle(!1)),
        onClick: e[2] || (e[2] = ut(() => {
        }, ["stop"])),
        class: "price-tooltip"
      }, {
        trigger: V(() => [
          t.isBadRate ? (l(), H(j, { key: 0 })) : B("", !0),
          $(n, {
            currency: t.fiatAmount.currency,
            amount: t.fiatAmount.amount
          }, null, 8, ["currency", "amount"])
        ]),
        default: V(() => [
          x("div", BI, [
            x("label", null, k(t.$t("Order amount")), 1),
            $(n, {
              currency: t.fiatAmount.currency,
              amount: t.fiatAmount.amount
            }, null, 8, ["currency", "amount"]),
            t.vendorMarkup || t.vendorMarkup === 0 ? (l(), D(K, { key: 0 }, [
              t.vendorMarkup >= 0 ? (l(), D("label", _I, k(t.$t("Vendor crypto markup")), 1)) : (l(), D("label", ZI, k(t.$t("Vendor crypto discount")), 1)),
              x("div", null, k(t.formattedVendorMarkup), 1)
            ], 64)) : B("", !0),
            x("label", {
              class: b({ "nq-orange": t.isBadRate })
            }, k(t.$t("Effective rate")), 3),
            t.effectiveRate ? (l(), D("div", {
              key: 1,
              class: b({ "nq-orange": t.isBadRate })
            }, [
              $(n, {
                currency: t.fiatAmount.currency,
                amount: t.effectiveRate,
                maxRelativeDeviation: 1e-4
              }, null, 8, ["currency", "amount"]),
              J(" / " + k(t.cryptoAmount.currency.toUpperCase()), 1)
            ], 2)) : B("", !0)
          ]),
          t.rateInfo() ? (l(), D("div", {
            key: 0,
            class: b([{ "nq-orange": t.isBadRate }, "rate-info info"])
          }, k(t.rateInfo()), 3)) : B("", !0),
          x("div", $I, k(t.$t("Nimiq provides this service free of charge.")), 1),
          WI,
          x("div", RI, [
            x("label", null, k(t.$t("Total")), 1),
            $(L, {
              currency: t.cryptoAmount.currency,
              amount: t.cryptoAmount.amount,
              currencyDecimals: t.cryptoAmount.decimals,
              minDecimals: 0,
              maxDecimals: Math.min(8, t.cryptoAmount.decimals),
              showApprox: ""
            }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])
          ]),
          t.networkFee === void 0 || t.networkFee === null || Number(t.networkFee) !== 0 ? (l(), D("div", HI, [
            J(" + "),
            t.isFormattedNetworkFeeZero ? (l(), D(K, { key: 1 }, [
              J(k(t.$t("network fee")), 1)
            ], 64)) : (l(), H(a, {
              key: 0,
              path: "{amount} suggested network fee",
              componentName: "PaymentInfoLine"
            }, {
              amount: V(() => [
                t.networkFee ? (l(), H(L, {
                  key: 0,
                  currency: t.cryptoAmount.currency,
                  amount: t.networkFee,
                  currencyDecimals: t.cryptoAmount.decimals,
                  minDecimals: 0,
                  maxDecimals: Math.min(6, t.cryptoAmount.decimals)
                }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])) : B("", !0)
              ]),
              _: 1
            }))
          ])) : B("", !0)
        ]),
        _: 1
      }, 8, ["container", "styles", "theme"])) : B("", !0)
    ], 32),
    x("div", VI, [
      $(s)
    ]),
    $(o, {
      address: t.address,
      image: t.shopLogoUrl,
      label: t.originDomain
    }, null, 8, ["address", "image", "label"]),
    t.startTime && t.endTime ? (l(), H(r, {
      key: 0,
      ref: "timer$",
      startTime: t.startTime,
      endTime: t.endTime,
      theme: t.theme,
      tooltipProps: {
        container: t.tooltipContainer,
        margin: { right: 8 }
      }
    }, null, 8, ["startTime", "endTime", "theme", "tooltipProps"])) : B("", !0)
  ], 2);
}
const xn = /* @__PURE__ */ _(PI, [["render", FI], ["__scopeId", "data-v-d82993c8"]]);
let Pe = null;
class Ge {
}
Ge.render = function(t, e) {
  Pe(t, e);
};
self.QrCreator = Ge;
(function(t) {
  function e(j, n, a, y) {
    var s = {}, o = t(a, n);
    o.u(j), o.J(), y = y || 0;
    var r = o.h(), S = o.h() + 2 * y;
    return s.text = j, s.level = n, s.version = a, s.O = S, s.a = function(N, C) {
      return N -= y, C -= y, 0 > N || N >= r || 0 > C || C >= r ? !1 : o.a(N, C);
    }, s;
  }
  function M(j, n, a, y, s, o, r, S, N, C) {
    function z(d, T, c, g, A, w, h) {
      d ? (j.lineTo(T + w, c + h), j.arcTo(T, c, g, A, o)) : j.lineTo(T, c);
    }
    r ? j.moveTo(n + o, a) : j.moveTo(n, a), z(S, y, a, y, s, -o, 0), z(N, y, s, n, s, 0, -o), z(C, n, s, n, a, o, 0), z(r, n, a, y, a, 0, o);
  }
  function u(j, n, a, y, s, o, r, S, N, C) {
    function z(d, T, c, g) {
      j.moveTo(d + c, T), j.lineTo(
        d,
        T
      ), j.lineTo(d, T + g), j.arcTo(d, T, d + c, T, o);
    }
    r && z(n, a, o, o), S && z(y, a, -o, o), N && z(y, s, -o, -o), C && z(n, s, o, -o);
  }
  function i(j, n) {
    var a = n.fill;
    if (typeof a == "string")
      j.fillStyle = a;
    else {
      var y = a.type, s = a.colorStops;
      if (a = a.position.map((r) => Math.round(r * n.size)), y === "linear-gradient")
        var o = j.createLinearGradient.apply(j, a);
      else if (y === "radial-gradient")
        o = j.createRadialGradient.apply(j, a);
      else
        throw Error("Unsupported fill");
      s.forEach(([r, S]) => {
        o.addColorStop(r, S);
      }), j.fillStyle = o;
    }
  }
  function I(j, n) {
    t: {
      var a = n.text, y = n.v, s = n.N, o = n.K, r = n.P;
      for (s = Math.max(1, s || 1), o = Math.min(40, o || 40); s <= o; s += 1)
        try {
          var S = e(a, y, s, r);
          break t;
        } catch {
        }
      S = void 0;
    }
    if (!S)
      return null;
    for (a = j.getContext("2d"), n.background && (a.fillStyle = n.background, a.fillRect(n.left, n.top, n.size, n.size)), y = S.O, o = n.size / y, a.beginPath(), r = 0; r < y; r += 1)
      for (s = 0; s < y; s += 1) {
        var N = a, C = n.left + s * o, z = n.top + r * o, d = r, T = s, c = S.a, g = C + o, A = z + o, w = d - 1, h = d + 1, O = T - 1, m = T + 1, Y = Math.floor(Math.min(0.5, Math.max(0, n.R)) * o), P = c(d, T), R = c(w, O), F = c(w, T);
        w = c(w, m);
        var tt = c(d, m);
        m = c(h, m), T = c(
          h,
          T
        ), h = c(h, O), d = c(d, O), C = Math.round(C), z = Math.round(z), g = Math.round(g), A = Math.round(A), P ? M(N, C, z, g, A, Y, !F && !d, !F && !tt, !T && !tt, !T && !d) : u(N, C, z, g, A, Y, F && d && R, F && tt && w, T && tt && m, T && d && h);
      }
    return i(a, n), a.fill(), j;
  }
  var L = { minVersion: 1, maxVersion: 40, ecLevel: "L", left: 0, top: 0, size: 200, fill: "#000", background: null, text: "no text", radius: 0.5, quiet: 0 };
  Pe = function(j, n) {
    var a = {};
    Object.assign(a, L, j), a.N = a.minVersion, a.K = a.maxVersion, a.v = a.ecLevel, a.left = a.left, a.top = a.top, a.size = a.size, a.fill = a.fill, a.background = a.background, a.text = a.text, a.R = a.radius, a.P = a.quiet, n instanceof HTMLCanvasElement ? ((n.width !== a.size || n.height !== a.size) && (n.width = a.size, n.height = a.size), n.getContext("2d").clearRect(0, 0, n.width, n.height), I(n, a)) : (j = document.createElement("canvas"), j.width = a.size, j.height = a.size, a = I(j, a), n.appendChild(a));
  };
})(function() {
  function t(n) {
    var a = M.s(n);
    return { S: function() {
      return 4;
    }, b: function() {
      return a.length;
    }, write: function(y) {
      for (var s = 0; s < a.length; s += 1)
        y.put(a[s], 8);
    } };
  }
  function e() {
    var n = [], a = 0, y = {
      B: function() {
        return n;
      },
      c: function(s) {
        return (n[Math.floor(s / 8)] >>> 7 - s % 8 & 1) == 1;
      },
      put: function(s, o) {
        for (var r = 0; r < o; r += 1)
          y.m((s >>> o - r - 1 & 1) == 1);
      },
      f: function() {
        return a;
      },
      m: function(s) {
        var o = Math.floor(a / 8);
        n.length <= o && n.push(0), s && (n[o] |= 128 >>> a % 8), a += 1;
      }
    };
    return y;
  }
  function M(n, a) {
    function y(d, T) {
      for (var c = -1; 7 >= c; c += 1)
        if (!(-1 >= d + c || S <= d + c))
          for (var g = -1; 7 >= g; g += 1)
            -1 >= T + g || S <= T + g || (r[d + c][T + g] = 0 <= c && 6 >= c && (g == 0 || g == 6) || 0 <= g && 6 >= g && (c == 0 || c == 6) || 2 <= c && 4 >= c && 2 <= g && 4 >= g);
    }
    function s(d, T) {
      for (var c = S = 4 * n + 17, g = Array(c), A = 0; A < c; A += 1) {
        g[A] = Array(c);
        for (var w = 0; w < c; w += 1)
          g[A][w] = null;
      }
      for (r = g, y(0, 0), y(S - 7, 0), y(0, S - 7), c = I.G(n), g = 0; g < c.length; g += 1)
        for (A = 0; A < c.length; A += 1) {
          w = c[g];
          var h = c[A];
          if (r[w][h] == null)
            for (var O = -2; 2 >= O; O += 1)
              for (var m = -2; 2 >= m; m += 1)
                r[w + O][h + m] = O == -2 || O == 2 || m == -2 || m == 2 || O == 0 && m == 0;
        }
      for (c = 8; c < S - 8; c += 1)
        r[c][6] == null && (r[c][6] = c % 2 == 0);
      for (c = 8; c < S - 8; c += 1)
        r[6][c] == null && (r[6][c] = c % 2 == 0);
      for (c = I.w(o << 3 | T), g = 0; 15 > g; g += 1)
        A = !d && (c >> g & 1) == 1, r[6 > g ? g : 8 > g ? g + 1 : S - 15 + g][8] = A, r[8][8 > g ? S - g - 1 : 9 > g ? 15 - g : 14 - g] = A;
      if (r[S - 8][8] = !d, 7 <= n) {
        for (c = I.A(n), g = 0; 18 > g; g += 1)
          A = !d && (c >> g & 1) == 1, r[Math.floor(g / 3)][g % 3 + S - 8 - 3] = A;
        for (g = 0; 18 > g; g += 1)
          A = !d && (c >> g & 1) == 1, r[g % 3 + S - 8 - 3][Math.floor(g / 3)] = A;
      }
      if (N == null) {
        for (d = j.I(n, o), c = e(), g = 0; g < C.length; g += 1)
          A = C[g], c.put(4, 4), c.put(A.b(), I.f(4, n)), A.write(c);
        for (g = A = 0; g < d.length; g += 1)
          A += d[g].j;
        if (c.f() > 8 * A)
          throw Error("code length overflow. (" + c.f() + ">" + 8 * A + ")");
        for (c.f() + 4 <= 8 * A && c.put(0, 4); c.f() % 8 != 0; )
          c.m(!1);
        for (; !(c.f() >= 8 * A) && (c.put(236, 8), !(c.f() >= 8 * A)); )
          c.put(17, 8);
        var Y = 0;
        for (A = g = 0, w = Array(d.length), h = Array(d.length), O = 0; O < d.length; O += 1) {
          var P = d[O].j, R = d[O].o - P;
          for (g = Math.max(g, P), A = Math.max(A, R), w[O] = Array(P), m = 0; m < w[O].length; m += 1)
            w[O][m] = 255 & c.B()[m + Y];
          for (Y += P, m = I.C(R), P = u(w[O], m.b() - 1).l(m), h[O] = Array(m.b() - 1), m = 0; m < h[O].length; m += 1)
            R = m + P.b() - h[O].length, h[O][m] = 0 <= R ? P.c(R) : 0;
        }
        for (m = c = 0; m < d.length; m += 1)
          c += d[m].o;
        for (c = Array(c), m = Y = 0; m < g; m += 1)
          for (O = 0; O < d.length; O += 1)
            m < w[O].length && (c[Y] = w[O][m], Y += 1);
        for (m = 0; m < A; m += 1)
          for (O = 0; O < d.length; O += 1)
            m < h[O].length && (c[Y] = h[O][m], Y += 1);
        N = c;
      }
      for (d = N, c = -1, g = S - 1, A = 7, w = 0, T = I.F(T), h = S - 1; 0 < h; h -= 2)
        for (h == 6 && --h; ; ) {
          for (O = 0; 2 > O; O += 1)
            r[g][h - O] == null && (m = !1, w < d.length && (m = (d[w] >>> A & 1) == 1), T(g, h - O) && (m = !m), r[g][h - O] = m, --A, A == -1 && (w += 1, A = 7));
          if (g += c, 0 > g || S <= g) {
            g -= c, c = -c;
            break;
          }
        }
    }
    var o = i[a], r = null, S = 0, N = null, C = [], z = { u: function(d) {
      d = t(d), C.push(d), N = null;
    }, a: function(d, T) {
      if (0 > d || S <= d || 0 > T || S <= T)
        throw Error(d + "," + T);
      return r[d][T];
    }, h: function() {
      return S;
    }, J: function() {
      for (var d = 0, T = 0, c = 0; 8 > c; c += 1) {
        s(!0, c);
        var g = I.D(z);
        (c == 0 || d > g) && (d = g, T = c);
      }
      s(!1, T);
    } };
    return z;
  }
  function u(n, a) {
    if (typeof n.length > "u")
      throw Error(n.length + "/" + a);
    var y = function() {
      for (var o = 0; o < n.length && n[o] == 0; )
        o += 1;
      for (var r = Array(n.length - o + a), S = 0; S < n.length - o; S += 1)
        r[S] = n[S + o];
      return r;
    }(), s = { c: function(o) {
      return y[o];
    }, b: function() {
      return y.length;
    }, multiply: function(o) {
      for (var r = Array(s.b() + o.b() - 1), S = 0; S < s.b(); S += 1)
        for (var N = 0; N < o.b(); N += 1)
          r[S + N] ^= L.i(L.g(s.c(S)) + L.g(o.c(N)));
      return u(r, 0);
    }, l: function(o) {
      if (0 > s.b() - o.b())
        return s;
      for (var r = L.g(s.c(0)) - L.g(o.c(0)), S = Array(s.b()), N = 0; N < s.b(); N += 1)
        S[N] = s.c(N);
      for (N = 0; N < o.b(); N += 1)
        S[N] ^= L.i(L.g(o.c(N)) + r);
      return u(S, 0).l(o);
    } };
    return s;
  }
  M.s = function(n) {
    for (var a = [], y = 0; y < n.length; y++) {
      var s = n.charCodeAt(y);
      128 > s ? a.push(s) : 2048 > s ? a.push(192 | s >> 6, 128 | s & 63) : 55296 > s || 57344 <= s ? a.push(224 | s >> 12, 128 | s >> 6 & 63, 128 | s & 63) : (y++, s = 65536 + ((s & 1023) << 10 | n.charCodeAt(y) & 1023), a.push(240 | s >> 18, 128 | s >> 12 & 63, 128 | s >> 6 & 63, 128 | s & 63));
    }
    return a;
  };
  var i = { L: 1, M: 0, Q: 3, H: 2 }, I = function() {
    function n(s) {
      for (var o = 0; s != 0; )
        o += 1, s >>>= 1;
      return o;
    }
    var a = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ], y = { w: function(s) {
      for (var o = s << 10; 0 <= n(o) - n(1335); )
        o ^= 1335 << n(o) - n(1335);
      return (s << 10 | o) ^ 21522;
    }, A: function(s) {
      for (var o = s << 12; 0 <= n(o) - n(7973); )
        o ^= 7973 << n(o) - n(7973);
      return s << 12 | o;
    }, G: function(s) {
      return a[s - 1];
    }, F: function(s) {
      switch (s) {
        case 0:
          return function(o, r) {
            return (o + r) % 2 == 0;
          };
        case 1:
          return function(o) {
            return o % 2 == 0;
          };
        case 2:
          return function(o, r) {
            return r % 3 == 0;
          };
        case 3:
          return function(o, r) {
            return (o + r) % 3 == 0;
          };
        case 4:
          return function(o, r) {
            return (Math.floor(o / 2) + Math.floor(r / 3)) % 2 == 0;
          };
        case 5:
          return function(o, r) {
            return o * r % 2 + o * r % 3 == 0;
          };
        case 6:
          return function(o, r) {
            return (o * r % 2 + o * r % 3) % 2 == 0;
          };
        case 7:
          return function(o, r) {
            return (o * r % 3 + (o + r) % 2) % 2 == 0;
          };
        default:
          throw Error("bad maskPattern:" + s);
      }
    }, C: function(s) {
      for (var o = u([1], 0), r = 0; r < s; r += 1)
        o = o.multiply(u([1, L.i(r)], 0));
      return o;
    }, f: function(s, o) {
      if (s != 4 || 1 > o || 40 < o)
        throw Error("mode: " + s + "; type: " + o);
      return 10 > o ? 8 : 16;
    }, D: function(s) {
      for (var o = s.h(), r = 0, S = 0; S < o; S += 1)
        for (var N = 0; N < o; N += 1) {
          for (var C = 0, z = s.a(S, N), d = -1; 1 >= d; d += 1)
            if (!(0 > S + d || o <= S + d))
              for (var T = -1; 1 >= T; T += 1)
                0 > N + T || o <= N + T || (d != 0 || T != 0) && z == s.a(S + d, N + T) && (C += 1);
          5 < C && (r += 3 + C - 5);
        }
      for (S = 0; S < o - 1; S += 1)
        for (N = 0; N < o - 1; N += 1)
          C = 0, s.a(S, N) && (C += 1), s.a(S + 1, N) && (C += 1), s.a(S, N + 1) && (C += 1), s.a(S + 1, N + 1) && (C += 1), (C == 0 || C == 4) && (r += 3);
      for (S = 0; S < o; S += 1)
        for (N = 0; N < o - 6; N += 1)
          s.a(S, N) && !s.a(S, N + 1) && s.a(S, N + 2) && s.a(S, N + 3) && s.a(S, N + 4) && !s.a(S, N + 5) && s.a(S, N + 6) && (r += 40);
      for (N = 0; N < o; N += 1)
        for (S = 0; S < o - 6; S += 1)
          s.a(S, N) && !s.a(S + 1, N) && s.a(S + 2, N) && s.a(S + 3, N) && s.a(S + 4, N) && !s.a(S + 5, N) && s.a(S + 6, N) && (r += 40);
      for (N = C = 0; N < o; N += 1)
        for (S = 0; S < o; S += 1)
          s.a(S, N) && (C += 1);
      return r += Math.abs(100 * C / o / o - 50) / 5 * 10;
    } };
    return y;
  }(), L = function() {
    for (var n = Array(256), a = Array(256), y = 0; 8 > y; y += 1)
      n[y] = 1 << y;
    for (y = 8; 256 > y; y += 1)
      n[y] = n[y - 4] ^ n[y - 5] ^ n[y - 6] ^ n[y - 8];
    for (y = 0; 255 > y; y += 1)
      a[n[y]] = y;
    return { g: function(s) {
      if (1 > s)
        throw Error("glog(" + s + ")");
      return a[s];
    }, i: function(s) {
      for (; 0 > s; )
        s += 255;
      for (; 256 <= s; )
        s -= 255;
      return n[s];
    } };
  }(), j = function() {
    function n(s, o) {
      switch (o) {
        case i.L:
          return a[4 * (s - 1)];
        case i.M:
          return a[4 * (s - 1) + 1];
        case i.Q:
          return a[4 * (s - 1) + 2];
        case i.H:
          return a[4 * (s - 1) + 3];
      }
    }
    var a = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [
        3,
        58,
        36,
        2,
        59,
        37
      ],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],
      [5, 122, 98, 1, 123, 99],
      [
        7,
        73,
        45,
        3,
        74,
        46
      ],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [
        4,
        151,
        121,
        5,
        152,
        122
      ],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ], y = { I: function(s, o) {
      var r = n(s, o);
      if (typeof r > "u")
        throw Error("bad rs block @ typeNumber:" + s + "/errorCorrectLevel:" + o);
      s = r.length / 3, o = [];
      for (var S = 0; S < s; S += 1)
        for (var N = r[3 * S], C = r[3 * S + 1], z = r[3 * S + 2], d = 0; d < N; d += 1) {
          var T = z, c = {};
          c.o = C, c.j = T, o.push(c);
        }
      return o;
    } };
    return y;
  }();
  return M;
}());
const JI = QrCreator;
var Be = /* @__PURE__ */ ((t) => (t.L = "L", t.M = "M", t.H = "H", t.Q = "Q", t))(Be || {});
const XI = Z({
  name: "QrCode",
  props: {
    data: String,
    errorCorrection: {
      type: String,
      default: "M",
      validator: (t) => Object.values(Be).includes(t)
    },
    radius: {
      type: Number,
      default: 0.5,
      validator: (t) => t >= 0 && t <= 1
    },
    fill: {
      type: [String, Object, Object],
      default: () => ({
        type: "radial-gradient",
        position: [1, 1, 0, 1, 1, Math.sqrt(2)],
        colorStops: [
          [0, "#265DD7"],
          [1, "#0582CA"]
        ]
      }),
      validator: (t) => {
        const e = (I) => typeof I == "string" && /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(I);
        if (e(t))
          return !0;
        const M = t;
        return (M.type === "linear-gradient" && M.position.length === 4 || M.type === "radial-gradient" && M.position.length === 6) && M.position.every((I) => typeof I == "number") ? M.colorStops.length >= 2 && M.colorStops.every(([I, L]) => typeof I == "number" && e(L)) : !1;
      }
    },
    background: {
      type: String,
      default: null,
      validator: (t) => t === null || /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(t)
    },
    size: {
      type: Number,
      default: 240,
      validator: (t) => t > 0
    }
  },
  setup(t, e) {
    const M = E(null);
    async function u(i = "image/png") {
      return await it(), !t.data || !M.value ? "data:," : M.value.toDataURL(i);
    }
    return U([
      () => t.data,
      () => t.errorCorrection,
      () => t.radius,
      () => t.fill,
      () => t.background,
      () => t.size
    ], async () => {
      await it(), !(!t.data || !M.value) && JI.render({
        text: t.data,
        radius: t.radius,
        ecLevel: t.errorCorrection,
        fill: t.fill,
        background: t.background,
        size: t.size
      }, M.value);
    }, { immediate: !0 }), e.expose({
      toDataUrl: u
    }), {
      data: t.data,
      canvas$: M
    };
  }
}), KI = {
  key: 0,
  ref: "canvas$",
  class: "qr-code"
};
function qI(t, e, M, u, i, I) {
  return t.data ? (l(), D("canvas", KI, null, 512)) : B("", !0);
}
const Cn = /* @__PURE__ */ _(XI, [["render", qI]]);
class f {
  constructor(e, M, u, i, I) {
    this._legacyCanvasSize = f.DEFAULT_CANVAS_SIZE, this._preferredCamera = "environment", this._maxScansPerSecond = 25, this._lastScanTimestamp = -1, this._destroyed = this._flashOn = this._paused = this._active = !1, this.$video = e, this.$canvas = document.createElement("canvas"), u && typeof u == "object" ? this._onDecode = M : (console.warn(u || i || I ? "You're using a deprecated version of the QrScanner constructor which will be removed in the future" : "Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), this._legacyOnDecode = M), M = typeof u == "object" ? u : {}, this._onDecodeError = M.onDecodeError || (typeof u == "function" ? u : this._onDecodeError), this._calculateScanRegion = M.calculateScanRegion || (typeof i == "function" ? i : this._calculateScanRegion), this._preferredCamera = M.preferredCamera || I || this._preferredCamera, this._legacyCanvasSize = typeof u == "number" ? u : typeof i == "number" ? i : this._legacyCanvasSize, this._maxScansPerSecond = M.maxScansPerSecond || this._maxScansPerSecond, this._onPlay = this._onPlay.bind(this), this._onLoadedMetaData = this._onLoadedMetaData.bind(this), this._onVisibilityChange = this._onVisibilityChange.bind(this), this._updateOverlay = this._updateOverlay.bind(this), e.disablePictureInPicture = !0, e.playsInline = !0, e.muted = !0;
    let L = !1;
    if (e.hidden && (e.hidden = !1, L = !0), document.body.contains(e) || (document.body.appendChild(e), L = !0), u = e.parentElement, M.highlightScanRegion || M.highlightCodeOutline) {
      if (i = !!M.overlay, this.$overlay = M.overlay || document.createElement("div"), I = this.$overlay.style, I.position = "absolute", I.display = "none", I.pointerEvents = "none", this.$overlay.classList.add("scan-region-highlight"), !i && M.highlightScanRegion) {
        this.$overlay.innerHTML = '<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';
        try {
          this.$overlay.firstElementChild.animate({ transform: [
            "scale(.98)",
            "scale(1.01)"
          ] }, { duration: 400, iterations: 1 / 0, direction: "alternate", easing: "ease-in-out" });
        } catch {
        }
        u.insertBefore(this.$overlay, this.$video.nextSibling);
      }
      M.highlightCodeOutline && (this.$overlay.insertAdjacentHTML("beforeend", '<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'), this.$codeOutlineHighlight = this.$overlay.lastElementChild);
    }
    this._scanRegion = this._calculateScanRegion(e), requestAnimationFrame(() => {
      let j = window.getComputedStyle(e);
      j.display === "none" && (e.style.setProperty("display", "block", "important"), L = !0), j.visibility !== "visible" && (e.style.setProperty("visibility", "visible", "important"), L = !0), L && (console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."), e.style.opacity = "0", e.style.width = "0", e.style.height = "0", this.$overlay && this.$overlay.parentElement && this.$overlay.parentElement.removeChild(this.$overlay), delete this.$overlay, delete this.$codeOutlineHighlight), this.$overlay && this._updateOverlay();
    }), e.addEventListener("play", this._onPlay), e.addEventListener("loadedmetadata", this._onLoadedMetaData), document.addEventListener("visibilitychange", this._onVisibilityChange), window.addEventListener("resize", this._updateOverlay), this._qrEnginePromise = f.createQrEngine();
  }
  static set WORKER_PATH(e) {
    console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.");
  }
  static async hasCamera() {
    try {
      return !!(await f.listCameras(!1)).length;
    } catch {
      return !1;
    }
  }
  static async listCameras(e = !1) {
    if (!navigator.mediaDevices)
      return [];
    let M = async () => (await navigator.mediaDevices.enumerateDevices()).filter((i) => i.kind === "videoinput"), u;
    try {
      e && (await M()).every((i) => !i.label) && (u = await navigator.mediaDevices.getUserMedia({ audio: !1, video: !0 }));
    } catch {
    }
    try {
      return (await M()).map((i, I) => ({ id: i.deviceId, label: i.label || (I === 0 ? "Default Camera" : `Camera ${I + 1}`) }));
    } finally {
      u && (console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"), f._stopVideoStream(u));
    }
  }
  async hasFlash() {
    let e;
    try {
      if (this.$video.srcObject) {
        if (!(this.$video.srcObject instanceof MediaStream))
          return !1;
        e = this.$video.srcObject;
      } else
        e = (await this._getCameraStream()).stream;
      return "torch" in e.getVideoTracks()[0].getSettings();
    } catch {
      return !1;
    } finally {
      e && e !== this.$video.srcObject && (console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"), f._stopVideoStream(e));
    }
  }
  isFlashOn() {
    return this._flashOn;
  }
  async toggleFlash() {
    this._flashOn ? await this.turnFlashOff() : await this.turnFlashOn();
  }
  async turnFlashOn() {
    if (!this._flashOn && !this._destroyed && (this._flashOn = !0, this._active && !this._paused))
      try {
        if (!await this.hasFlash())
          throw "No flash available";
        await this.$video.srcObject.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: !0 }] });
      } catch (e) {
        throw this._flashOn = !1, e;
      }
  }
  async turnFlashOff() {
    this._flashOn && (this._flashOn = !1, await this._restartVideoStream());
  }
  destroy() {
    this.$video.removeEventListener("loadedmetadata", this._onLoadedMetaData), this.$video.removeEventListener("play", this._onPlay), document.removeEventListener(
      "visibilitychange",
      this._onVisibilityChange
    ), window.removeEventListener("resize", this._updateOverlay), this._destroyed = !0, this._flashOn = !1, this.stop(), f._postWorkerMessage(this._qrEnginePromise, "close");
  }
  async start() {
    if (this._destroyed)
      throw Error("The QR scanner can not be started as it had been destroyed.");
    if ((!this._active || this._paused) && (window.location.protocol !== "https:" && console.warn("The camera stream is only accessible if the page is transferred via https."), this._active = !0, !document.hidden))
      if (this._paused = !1, this.$video.srcObject)
        await this.$video.play();
      else
        try {
          let { stream: e, facingMode: M } = await this._getCameraStream();
          !this._active || this._paused ? f._stopVideoStream(e) : (this._setVideoMirror(M), this.$video.srcObject = e, await this.$video.play(), this._flashOn && (this._flashOn = !1, this.turnFlashOn().catch(() => {
          })));
        } catch (e) {
          if (!this._paused)
            throw this._active = !1, e;
        }
  }
  stop() {
    this.pause(), this._active = !1;
  }
  async pause(e = !1) {
    if (this._paused = !0, !this._active)
      return !0;
    this.$video.pause(), this.$overlay && (this.$overlay.style.display = "none");
    let M = () => {
      this.$video.srcObject instanceof MediaStream && (f._stopVideoStream(this.$video.srcObject), this.$video.srcObject = null);
    };
    return e ? (M(), !0) : (await new Promise((u) => setTimeout(u, 300)), this._paused ? (M(), !0) : !1);
  }
  async setCamera(e) {
    e !== this._preferredCamera && (this._preferredCamera = e, await this._restartVideoStream());
  }
  static async scanImage(e, M, u, i, I = !1, L = !1) {
    let j, n = !1;
    M && ("scanRegion" in M || "qrEngine" in M || "canvas" in M || "disallowCanvasResizing" in M || "alsoTryWithoutScanRegion" in M || "returnDetailedScanResult" in M) ? (j = M.scanRegion, u = M.qrEngine, i = M.canvas, I = M.disallowCanvasResizing || !1, L = M.alsoTryWithoutScanRegion || !1, n = !0) : console.warn(M || u || i || I || L ? "You're using a deprecated api for scanImage which will be removed in the future." : "Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), M = !!u;
    try {
      let a, y;
      [u, a] = await Promise.all([u || f.createQrEngine(), f._loadImage(e)]), [i, y] = f._drawToCanvas(a, j, i, I);
      let s;
      if (u instanceof Worker) {
        let o = u;
        M || f._postWorkerMessageSync(o, "inversionMode", "both"), s = await new Promise((r, S) => {
          let N, C, z, d = -1;
          C = (c) => {
            c.data.id === d && (o.removeEventListener("message", C), o.removeEventListener("error", z), clearTimeout(N), c.data.data !== null ? r({ data: c.data.data, cornerPoints: f._convertPoints(c.data.cornerPoints, j) }) : S(f.NO_QR_CODE_FOUND));
          }, z = (c) => {
            o.removeEventListener("message", C), o.removeEventListener("error", z), clearTimeout(N), S("Scanner error: " + (c ? c.message || c : "Unknown Error"));
          }, o.addEventListener("message", C), o.addEventListener("error", z), N = setTimeout(() => z("timeout"), 1e4);
          let T = y.getImageData(0, 0, i.width, i.height);
          d = f._postWorkerMessageSync(o, "decode", T, [T.data.buffer]);
        });
      } else
        s = await Promise.race([new Promise((o, r) => window.setTimeout(() => r("Scanner error: timeout"), 1e4)), (async () => {
          try {
            var [o] = await u.detect(i);
            if (!o)
              throw f.NO_QR_CODE_FOUND;
            return { data: o.rawValue, cornerPoints: f._convertPoints(o.cornerPoints, j) };
          } catch (r) {
            if (o = r.message || r, /not implemented|service unavailable/.test(o))
              return f._disableBarcodeDetector = !0, f.scanImage(e, { scanRegion: j, canvas: i, disallowCanvasResizing: I, alsoTryWithoutScanRegion: L });
            throw `Scanner error: ${o}`;
          }
        })()]);
      return n ? s : s.data;
    } catch (a) {
      if (!j || !L)
        throw a;
      let y = await f.scanImage(e, { qrEngine: u, canvas: i, disallowCanvasResizing: I });
      return n ? y : y.data;
    } finally {
      M || f._postWorkerMessage(u, "close");
    }
  }
  setGrayscaleWeights(e, M, u, i = !0) {
    f._postWorkerMessage(this._qrEnginePromise, "grayscaleWeights", {
      red: e,
      green: M,
      blue: u,
      useIntegerApproximation: i
    });
  }
  setInversionMode(e) {
    f._postWorkerMessage(this._qrEnginePromise, "inversionMode", e);
  }
  static async createQrEngine(e) {
    if (e && console.warn("Specifying a worker path is not required and not supported anymore."), e = () => import("__PUBLIC_PATH_MARKER__" + (window.__dynamicImportHandler__ || function(u) {
      return u;
    })("../node_modules/qr-scanner/qr-scanner-worker.min.js") + "__PUBLIC_PATH_MARKER__").then((u) => u.createWorker()), !(!f._disableBarcodeDetector && "BarcodeDetector" in window && BarcodeDetector.getSupportedFormats && (await BarcodeDetector.getSupportedFormats()).includes("qr_code")))
      return e();
    let M = navigator.userAgentData;
    return M && M.brands.some(({ brand: u }) => /Chromium/i.test(u)) && /mac ?OS/i.test(M.platform) && await M.getHighEntropyValues(["architecture", "platformVersion"]).then(({ architecture: u, platformVersion: i }) => /arm/i.test(u || "arm") && 13 <= parseInt(i || "13")).catch(() => !0) ? e() : new BarcodeDetector({ formats: ["qr_code"] });
  }
  _onPlay() {
    this._scanRegion = this._calculateScanRegion(this.$video), this._updateOverlay(), this.$overlay && (this.$overlay.style.display = ""), this._scanFrame();
  }
  _onLoadedMetaData() {
    this._scanRegion = this._calculateScanRegion(this.$video), this._updateOverlay();
  }
  _onVisibilityChange() {
    document.hidden ? this.pause() : this._active && this.start();
  }
  _calculateScanRegion(e) {
    let M = Math.round(0.6666666666666666 * Math.min(e.videoWidth, e.videoHeight));
    return { x: Math.round((e.videoWidth - M) / 2), y: Math.round((e.videoHeight - M) / 2), width: M, height: M, downScaledWidth: this._legacyCanvasSize, downScaledHeight: this._legacyCanvasSize };
  }
  _updateOverlay() {
    requestAnimationFrame(() => {
      if (this.$overlay) {
        var e = this.$video, M = e.videoWidth, u = e.videoHeight, i = e.offsetWidth, I = e.offsetHeight, L = e.offsetLeft, j = e.offsetTop, n = window.getComputedStyle(e), a = n.objectFit, y = M / u, s = i / I;
        switch (a) {
          case "none":
            var o = M, r = u;
            break;
          case "fill":
            o = i, r = I;
            break;
          default:
            (a === "cover" ? y > s : y < s) ? (r = I, o = r * y) : (o = i, r = o / y), a === "scale-down" && (o = Math.min(o, M), r = Math.min(r, u));
        }
        var [S, N] = n.objectPosition.split(" ").map((z, d) => {
          const T = parseFloat(z);
          return z.endsWith("%") ? (d ? I - r : i - o) * T / 100 : T;
        });
        n = this._scanRegion.width || M, s = this._scanRegion.height || u, a = this._scanRegion.x || 0;
        var C = this._scanRegion.y || 0;
        y = this.$overlay.style, y.width = `${n / M * o}px`, y.height = `${s / u * r}px`, y.top = `${j + N + C / u * r}px`, u = /scaleX\(-1\)/.test(e.style.transform), y.left = `${L + (u ? i - S - o : S) + (u ? M - a - n : a) / M * o}px`, y.transform = e.style.transform;
      }
    });
  }
  static _convertPoints(e, M) {
    if (!M)
      return e;
    let u = M.x || 0, i = M.y || 0, I = M.width && M.downScaledWidth ? M.width / M.downScaledWidth : 1;
    M = M.height && M.downScaledHeight ? M.height / M.downScaledHeight : 1;
    for (let L of e)
      L.x = L.x * I + u, L.y = L.y * M + i;
    return e;
  }
  _scanFrame() {
    !this._active || this.$video.paused || this.$video.ended || ("requestVideoFrameCallback" in this.$video ? this.$video.requestVideoFrameCallback.bind(this.$video) : requestAnimationFrame)(async () => {
      if (!(1 >= this.$video.readyState)) {
        var e = Date.now() - this._lastScanTimestamp, M = 1e3 / this._maxScansPerSecond;
        e < M && await new Promise((i) => setTimeout(i, M - e)), this._lastScanTimestamp = Date.now();
        try {
          var u = await f.scanImage(this.$video, { scanRegion: this._scanRegion, qrEngine: this._qrEnginePromise, canvas: this.$canvas });
        } catch (i) {
          if (!this._active)
            return;
          this._onDecodeError(i);
        }
        !f._disableBarcodeDetector || await this._qrEnginePromise instanceof Worker || (this._qrEnginePromise = f.createQrEngine()), u ? (this._onDecode ? this._onDecode(u) : this._legacyOnDecode && this._legacyOnDecode(u.data), this.$codeOutlineHighlight && (clearTimeout(this._codeOutlineHighlightRemovalTimeout), this._codeOutlineHighlightRemovalTimeout = void 0, this.$codeOutlineHighlight.setAttribute("viewBox", `${this._scanRegion.x || 0} ${this._scanRegion.y || 0} ${this._scanRegion.width || this.$video.videoWidth} ${this._scanRegion.height || this.$video.videoHeight}`), this.$codeOutlineHighlight.firstElementChild.setAttribute(
          "points",
          u.cornerPoints.map(({ x: i, y: I }) => `${i},${I}`).join(" ")
        ), this.$codeOutlineHighlight.style.display = "")) : this.$codeOutlineHighlight && !this._codeOutlineHighlightRemovalTimeout && (this._codeOutlineHighlightRemovalTimeout = setTimeout(() => this.$codeOutlineHighlight.style.display = "none", 100));
      }
      this._scanFrame();
    });
  }
  _onDecodeError(e) {
    e !== f.NO_QR_CODE_FOUND && console.log(e);
  }
  async _getCameraStream() {
    if (!navigator.mediaDevices)
      throw "Camera not found.";
    let e = /^(environment|user)$/.test(this._preferredCamera) ? "facingMode" : "deviceId", M = [{ width: { min: 1024 } }, { width: { min: 768 } }, {}], u = M.map((i) => Object.assign({}, i, { [e]: { exact: this._preferredCamera } }));
    for (let i of [...u, ...M])
      try {
        let I = await navigator.mediaDevices.getUserMedia({ video: i, audio: !1 }), L = this._getFacingMode(I) || (i.facingMode ? this._preferredCamera : this._preferredCamera === "environment" ? "user" : "environment");
        return { stream: I, facingMode: L };
      } catch {
      }
    throw "Camera not found.";
  }
  async _restartVideoStream() {
    let e = this._paused;
    await this.pause(!0) && !e && this._active && await this.start();
  }
  static _stopVideoStream(e) {
    for (let M of e.getTracks())
      M.stop(), e.removeTrack(M);
  }
  _setVideoMirror(e) {
    this.$video.style.transform = "scaleX(" + (e === "user" ? -1 : 1) + ")";
  }
  _getFacingMode(e) {
    return (e = e.getVideoTracks()[0]) ? /rear|back|environment/i.test(e.label) ? "environment" : /front|user|face/i.test(e.label) ? "user" : null : null;
  }
  static _drawToCanvas(e, M, u, i = !1) {
    u = u || document.createElement("canvas");
    let I = M && M.x ? M.x : 0, L = M && M.y ? M.y : 0, j = M && M.width ? M.width : e.videoWidth || e.width, n = M && M.height ? M.height : e.videoHeight || e.height;
    return i || (i = M && M.downScaledWidth ? M.downScaledWidth : j, M = M && M.downScaledHeight ? M.downScaledHeight : n, u.width !== i && (u.width = i), u.height !== M && (u.height = M)), M = u.getContext("2d", { alpha: !1 }), M.imageSmoothingEnabled = !1, M.drawImage(e, I, L, j, n, 0, 0, u.width, u.height), [u, M];
  }
  static async _loadImage(e) {
    if (e instanceof Image)
      return await f._awaitImageLoad(e), e;
    if (e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || e instanceof SVGImageElement || "OffscreenCanvas" in window && e instanceof OffscreenCanvas || "ImageBitmap" in window && e instanceof ImageBitmap)
      return e;
    if (e instanceof File || e instanceof Blob || e instanceof URL || typeof e == "string") {
      let M = new Image();
      M.src = e instanceof File || e instanceof Blob ? URL.createObjectURL(e) : e.toString();
      try {
        return await f._awaitImageLoad(M), M;
      } finally {
        (e instanceof File || e instanceof Blob) && URL.revokeObjectURL(M.src);
      }
    } else
      throw "Unsupported image type.";
  }
  static async _awaitImageLoad(e) {
    e.complete && e.naturalWidth !== 0 || await new Promise((M, u) => {
      let i = (I) => {
        e.removeEventListener("load", i), e.removeEventListener("error", i), I instanceof ErrorEvent ? u("Image load error") : M();
      };
      e.addEventListener("load", i), e.addEventListener("error", i);
    });
  }
  static async _postWorkerMessage(e, M, u, i) {
    return f._postWorkerMessageSync(await e, M, u, i);
  }
  static _postWorkerMessageSync(e, M, u, i) {
    if (!(e instanceof Worker))
      return -1;
    let I = f._workerMessageId++;
    return e.postMessage({ id: I, type: M, data: u }, i), I;
  }
}
f.DEFAULT_CANVAS_SIZE = 400;
f.NO_QR_CODE_FOUND = "No QR code found";
f._disableBarcodeDetector = !1;
f._workerMessageId = 0;
const tj = Z({
  name: "QrScanner",
  props: {
    reportFrequency: {
      type: Number,
      default: 7e3
    },
    validate: Function
  },
  methods: { $t: q("QrScanner") },
  setup(t, e) {
    const M = E(null), u = E(null), i = E(null), I = E(!1), L = E(!0), j = Kt.isMobile(), n = Kt.detectBrowser();
    let a = null, y = "", s = 0, o = null;
    Mt(async () => {
      a = new f(u.value, (g) => c(g), {}), u.value.addEventListener("canplay", () => u.value.classList.add("ready")), window.addEventListener("resize", z), f.hasCamera().then((g) => L.value = g), d() && (r(), z());
    }), ot(() => {
      S(), a && a.destroy(), window.removeEventListener("resize", z);
    });
    async function r() {
      try {
        await a.start(), I.value = !1, o && (window.clearInterval(o), o = null);
      } catch (g) {
        I.value = !0, e.emit("error", g), o || (o = window.setInterval(() => r(), 3e3));
      }
      return !I.value;
    }
    function S() {
      !a || (a.stop(), o && (window.clearInterval(o), o = null));
    }
    function N(g, A, w) {
      a && a.setGrayscaleWeights(g, A, w);
    }
    function C(g) {
      a && a.setInversionMode(g);
    }
    function z() {
      requestAnimationFrame(() => {
        if (!M.value || !i.value)
          return;
        const g = M.value.offsetHeight, A = M.value.offsetWidth, w = Math.min(g, A);
        if (w === 0)
          return;
        const h = Math.ceil(2 / 3 * w);
        i.value.style.width = h + "px", i.value.style.height = h + "px", i.value.style.top = (g - h) / 2 + "px", i.value.style.left = (A - h) / 2 + "px";
      });
    }
    function d() {
      return !!M.value && M.value.offsetWidth > 0;
    }
    function T() {
      e.emit("cancel");
    }
    function c(g) {
      g.data === y && Date.now() - s < t.reportFrequency || t.validate && !t.validate(g.data) || (y = g.data, s = Date.now(), e.emit("result", g));
    }
    return e.expose({
      start: r,
      stop: S,
      setGrayscaleWeights: N,
      setInversionMode: C,
      repositionOverlay: z
    }), {
      root$: M,
      video$: u,
      overlay$: i,
      cameraAccessFailed: I,
      hasCamera: L,
      isMobileOrTablet: j,
      browser: n,
      cancel: T
    };
  },
  components: { I18n: Xt }
});
const vt = (t) => (jt("data-v-f23a72ce"), t = t(), nt(), t), ej = {
  class: "qr-scanner nq-blue-bg",
  ref: "root$"
}, Mj = {
  ref: "video$",
  muted: "",
  autoplay: "",
  playsinline: "",
  width: "600",
  height: "600"
}, ij = /* @__PURE__ */ vt(() => /* @__PURE__ */ x("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 238 238"
}, [
  /* @__PURE__ */ x("path", {
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "4",
    d: "M31.3 2H10a8 8 0 0 0-8 8v21.3M206.8 2H228a8 8 0 0 1 8 8v21.3m0 175.4V228a8 8 0 0 1-8 8h-21.3m-175.4 0H10a8 8 0 0 1-8-8v-21.3"
  })
], -1)), uj = {
  key: 0,
  class: "camera-access-failed"
}, Lj = {
  key: 0,
  class: "camera-access-failed-warning"
}, Ij = { key: 1 }, jj = { class: "camera-access-failed-warning" }, nj = { key: 0 }, oj = { key: 0 }, aj = /* @__PURE__ */ vt(() => /* @__PURE__ */ x("span", { class: "browser-menu-icon" }, null, -1)), sj = /* @__PURE__ */ vt(() => /* @__PURE__ */ x("div", { class: "browser-menu-arrow" }, null, -1)), gj = {
  key: 1,
  class: "access-denied-instructions"
}, Nj = {
  key: 1,
  class: "access-denied-instructions"
}, cj = /* @__PURE__ */ vt(() => /* @__PURE__ */ x("b", null, "Safari", -1)), yj = {
  key: 0,
  class: "camera-icon-chrome"
}, rj = {
  key: 1,
  class: "camera-icon-firefox"
}, Sj = { key: 2 };
function lj(t, e, M, u, i, I) {
  const L = G("I18n");
  return l(), D("div", ej, [
    x("video", Mj, null, 512),
    x("div", {
      ref: "overlay$",
      class: b(["overlay", { inactive: t.cameraAccessFailed }])
    }, [
      X(t.$slots, "default", {}, () => [
        ij
      ], !0)
    ], 2),
    x("button", {
      class: "nq-button-s inverse cancel-button",
      onClick: e[0] || (e[0] = (...j) => t.cancel && t.cancel(...j))
    }, k(t.$t("Cancel")), 1),
    $(Wt, { name: "fade" }, {
      default: V(() => [
        t.cameraAccessFailed ? (l(), D("div", uj, [
          t.hasCamera ? (l(), D("div", Ij, [
            x("div", jj, k(t.$t("Unblock the camera for this website to scan QR codes.")), 1),
            t.isMobileOrTablet ? (l(), D("div", nj, [
              t.browser === "chrome" ? (l(), D("div", oj, [
                $(L, {
                  path: "Click on {icon} and go to\\nSettings > Site Settings > Camera",
                  tag: "div",
                  componentName: "QrScanner",
                  class: "access-denied-instructions"
                }, {
                  icon: V(() => [
                    aj
                  ]),
                  _: 1
                }),
                sj
              ])) : (l(), D("div", gj, k(t.$t("Grant camera access when asked.")), 1))
            ])) : (l(), D("div", Nj, [
              t.browser === "safari" ? (l(), H(L, {
                key: 0,
                path: "Click on {safari} and go to\\nSettings for this Website > Camera",
                tag: "div",
                componentName: "QrScanner"
              }, {
                safari: V(() => [
                  cj
                ]),
                _: 1
              })) : (l(), H(L, {
                key: 1,
                path: "Click on {icon} in the URL bar.",
                tag: "div",
                componentName: "QrScanner"
              }, {
                icon: V(() => [
                  t.browser === "chrome" ? (l(), D("span", yj)) : t.browser === "firefox" ? (l(), D("span", rj)) : (l(), D("span", Sj, k(t.$t("the camera icon")), 1))
                ]),
                _: 1
              }))
            ]))
          ])) : (l(), D("div", Lj, k(t.$t("Your device does not have an accessible camera.")), 1))
        ])) : B("", !0)
      ]),
      _: 1
    })
  ], 512);
}
const En = /* @__PURE__ */ _(tj, [["render", lj], ["__scopeId", "data-v-f23a72ce"]]);
var _e = /* @__PURE__ */ ((t) => (t.CHANGED = "changed", t))(_e || {});
const Tj = Z({
  name: "SelectBar",
  emits: Object.values(_e),
  props: {
    name: {
      type: String,
      required: !0
    },
    options: {
      type: Array,
      required: !0
    },
    selectedValue: Number
  },
  setup(t, e) {
    const M = Q(() => {
      var j;
      return (j = i.value) == null ? void 0 : j.value;
    }), u = Q(() => t.options.sort((j, n) => j.index - n.index)), i = E(t.selectedValue ? u.value.find((j) => j.value === t.selectedValue) : u.value[0]);
    function I(j) {
      return j.index <= i.value.index ? i.value.color : "nq-highlight-bg";
    }
    U(i, L);
    function L(j) {
      e.emit("changed", j.value);
    }
    return e.expose({ value: M }), {
      sortedOptions: u,
      selectedOption: i,
      getColor: I
    };
  }
});
const Aj = { class: "select-bar" }, Dj = ["value", "name", "id"], dj = ["for"];
function xj(t, e, M, u, i, I) {
  return l(), D("div", Aj, [
    (l(!0), D(K, null, et(t.sortedOptions, (L) => (l(), D("div", {
      key: L.value
    }, [
      $t(x("input", {
        value: L,
        type: "radio",
        name: t.name,
        id: L.value.toString(),
        "onUpdate:modelValue": e[0] || (e[0] = (j) => t.selectedOption = j)
      }, null, 8, Dj), [
        [Fe, t.selectedOption]
      ]),
      x("label", {
        for: L.value.toString(),
        class: b(["nq-label", t.getColor(L)])
      }, k(L.text), 11, dj)
    ]))), 128))
  ]);
}
const zn = /* @__PURE__ */ _(Tj, [["render", xj], ["__scopeId", "data-v-4f36c277"]]), Cj = {};
const Ej = { class: "small-page nq-card" };
function zj(t, e, M, u, i, I) {
  return l(), D("div", Ej, [
    X(t.$slots, "default", {}, void 0, !0)
  ]);
}
const wn = /* @__PURE__ */ _(Cj, [["render", zj], ["__scopeId", "data-v-00e2ad62"]]);
function hn(t, e) {
  window.__dynamicImportHandler__ = function(M) {
    return console.debug("__dynamicImportHandler__: ", M), je(M, t, e);
  }, window.__dynamicImportPreload__ = function(M) {
    return console.debug("__dynamicImportPreload__: ", M), M.map((u) => je(u, t, e));
  };
}
function je(t, e, M) {
  return typeof M == "string" && t.endsWith(".svg") ? `${M}${M.endsWith("/") ? "" : "/"}` + t : `${e}${e.endsWith("/") ? "" : "/"}` + t;
}
const wj = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzeW1ib2wgaWQ9ImZhY2VfMDEiPjxwYXRoIGQ9Ik05NCA4NXM0LjgtMiA4LjIgMGMuOC40LjcgMS4xIDAgMiAwIDAtMy40IDQtNC4xIDRzLTQuOC00LTQuOC00Yy0uNi0xLS4zLTEuNy43LTJ6Ii8+PHBhdGggZD0iTTk5LjMgODQuMWMxIC4yIDIgLjQgMyAuOS44LjQuNyAxLjEgMCAyYTIyLjEgMjIuMSAwIDAxLTQuMSA0YzEuOS0zLjIgMi42LTYuMyAxLjEtNi45eiIgZmlsbD0iIzNhM2EzYSIgb3BhY2l0eT0iLjIiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTk2IDEwMGMxLjYuMiAyLTUuOCAyLTlNODggOTUuNXM3LjUgMTEgMTggMCIvPjwvZz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc5IDgyczAtMTIgNi0xMiA2IDExLjYgNiAxMS42Uzg2IDcwIDc5IDgyek0xMDIgODJzMC0xMiA2LTEyIDYgMTEuNiA2IDExLjYtNS0xMS42LTEyIC40eiIvPjwvZz48cGF0aCBkPSJNOTYgODZzNC0xIDYgMGgtNnoiIG9wYWNpdHk9Ii4zIiBmaWxsPSIjZmZmIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiPjxwYXRoIGQ9Ik05MyA5MGMtOS45LTMuOC0yMC40LTYuMi0zMS03TTkyLjYgOTEuM2MtMTItMi44LTI3LjctMS4yLTI3LjctMS4yTTkyLjUgOTMuMmMtMTIuMy0xLTI3LjYgNS0yNy42IDVNMTAxIDkwYTg0LjEgODQuMSAwIDAxMjctN00xMDEuMyA5MS4zYzEwLjUtMi44IDI0LjEtMS4yIDI0LjEtMS4yTTEwMS40IDkzLjJjMTAuNy0xIDI0IDUgMjQgNSIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzAyIj48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc3IDc1czAtMTIgNi0xMiA2IDExLjYgNiAxMS42Uzg0IDYzIDc3IDc1ek0xMDEgNzQuNXMwLTExIDUuNS0xMSA1LjUgMTAuNiA1LjUgMTAuNi00LjYtMTAuNi0xMSAuNHpNMTA2LjcgMTAwYTE1IDE1IDAgMDEtMTEuMSA1SDk1YTE1IDE1IDAgMDEtMTEuMS01Yy0zLTMuMi01LTguNS01LTExczQuNiAxLjUgMTYgMS41aC42YzcuOCAwIDEyLjctMi41IDEzLjYtM3MyLjQtLjYgMi40IDEuNi0xLjkgNy43LTQuOSAxMXoiLz48L2c+PGNpcmNsZSBjeD0iOTkiIGN5PSI3OS44IiByPSI5Ii8+PHBhdGggZD0iTTEwOCA4MC44YTkgOSAwIDAxLTE2IDQuNmMyLjMuOCA4IDEuNiAxMS42LTIgMi43LTIuNSAyLjgtNy4yIDIuMS05LjZhOSA5IDAgMDEyLjIgN3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4yIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wMyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTcyLjQgNzAuNXMtNSAyLjMtNC41IDUuNCA0LjUgMi4zIDQuNS0uNCAxLjQtNC41IDAtNXpNMTExIDY2LjhzMy4yLS45IDQuMy43LTEuMiAyLjktMi4zIDEuNi0yLjUtMS42LTItMi4zek03MC41IDY3LjJzLTMuNC0uMS00IDEuOCAxLjkgMi41IDIuNiAxIDItMi4yIDEuNC0yLjh6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNMTA5LjkgMTAxLjFINzUuNXMxLjctMTkuNCAxOC42LTE5LjRjNC40LS4yIDguOCAxLjYgMTEuOCA0LjggNS4zIDUuNyA0IDE0LjYgNCAxNC42eiIvPjxjaXJjbGUgY3g9Ijc4LjgiIGN5PSI2Ny43IiByPSI0LjgiLz48Y2lyY2xlIGN4PSIxMDYuMSIgY3k9IjY3LjciIHI9IjQuNCIvPjwvZz48cGF0aCBkPSJNMTA1LjMgNTguNWMyLjktLjMgNS44IDQuNiA4LjYgNi45IDAgMC0zLjctNy41LTQuNC04LjZzLTQuMiAxLjctNC4yIDEuN3pNODAuNyA1OS4yYy0yLjYtMS4yLTcgMi4zLTEwLjQgMy42IDAgMCA2LTUuOCA3LjEtNi42czMuMyAzIDMuMyAzeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDQiPjxlbGxpcHNlIGN4PSIxMDguOCIgY3k9IjcxLjYiIHJ4PSIzLjciIHJ5PSI0LjMiIGZpbGw9IiM0MjIxMGIiLz48cGF0aCBkPSJNNzYuMSA4Ny4zczIuOCAxMy40IDE4LjQgMTIuN2MxNi0uOCAxNi41LTEzLjYgMTYuNS0xMy42IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MjIxMGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTc1LjYgNjguMmE5LjMgOS4zIDAgMDE4LjcgNi4yYy0zLjItMi4xLTQuMi0yLjgtOS0uNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyMTBiIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wNSI+PHBhdGggZD0iTTgzLjUgNTcuN2ExIDEgMCAwMC0uOSAxLjNzNCAxMS44IDQuMyAyMi4zYTEgMSAwIDEwMiAwYy0uMy0xMS00LjQtMjMtNC40LTIzYTEgMSAwIDAwLTEtLjZ6bS0uMyAyLjVjLTEuNi4yLTIuNy43LTMuMyAxLjctLjcgMS0uNSAyIDAgMyAuOSAyIDMgMy45IDUuOCA1LjIgMi40IDEuMiA0LjIgMyA0LjcgNCAuMy42LjIgMSAwIDEuMy0uMi40LS44LjgtMiAxLjEtMi40LjUtMy44IDAtNC42LS45LS45LS44LTEuMS0yLS43LTMuMWExIDEgMCAxMC0yLS43IDUuMSA1LjEgMCAwMDEuMiA1LjJjMS40IDEuNCAzLjcgMi4xIDYuNSAxLjUgMS42LS40IDIuNy0xIDMuMy0yIC42LTEgLjYtMi4xLjEtMy4xLS44LTItMy0zLjctNS42LTUtMi40LTEuMy00LjQtMy01LTQuMy0uMi0uNi0uMi0uOSAwLTEuMSAwLS4zLjYtLjYgMS44LS44IDIuNi0uMiAzLjguNiA0LjUgMS4yLjYuNy43IDEuMy43IDEuM2ExIDEgMCAxMDItLjNzLS4yLTEuMy0xLjMtMi40Yy0xLTEtMy0yLTYuMS0xLjh6TTEwMi4yIDU3LjlhMSAxIDAgMDAtMSAxLjRzNSAxMC42IDYuMiAyMC4zYTEgMSAwIDEwMi0uMiA4MC43IDgwLjcgMCAwMC02LjMtMjEgMSAxIDAgMDAtLjktLjV6bS0uMSAyLjVjLTEuNS40LTIuNSAxLTMgMS45LS41IDEtLjMgMiAuMyAzIDEgMS43IDMuMyAzLjIgNiA0LjIgMi4zLjkgNC4yIDIuMyA0LjcgMy4zLjMuNS4zLjguMSAxLjEtLjEuMy0uNi44LTEuNyAxLjItMi4xLjctMy41LjMtNC4zLS40YTIuOSAyLjkgMCAwMS0xLTIuOCAxIDEgMCAxMC0yLS40Yy0uMyAxLjcuMyAzLjYgMS43IDQuOCAxLjQgMS4yIDMuNiAxLjYgNi4yLjcgMS40LS41IDIuNC0xLjIgMy0yLjIuNC0xIC4zLTItLjItMy0xLTEuOC0zLjItMy4yLTUuOS00LjItMi4zLS45LTQuMy0yLjMtNS0zLjQtLjItLjUtLjItLjgtLjEtMSAwLS4yLjUtLjYgMS42LS44IDIuNC0uNCAzLjYuMSA0LjIuNi43LjYuOCAxLjEuOCAxLjFhMSAxIDAgMTAyLS41cy0uNC0xLjItMS41LTIuMWMtMS4xLTEtMy0xLjYtNi0xLjF6Ii8+PHBhdGggZD0iTTEwNi43IDk5YTE1IDE1IDAgMDEtMTEuMSA1SDk1YTE1IDE1IDAgMDEtMTEtNWMtMy0zLjItNS04LjUtNS0xMXM0LjYgMS41IDE2IDEuNWguNmM3LjggMCAxMi43LTIuNSAxMy42LTNzMi40LS42IDIuNCAxLjYtMS45IDcuNy00LjkgMTF6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik05MiA5MC4zYy0uNC4xLS43IDEwLjUgMCAxNC41czkuMiA3LjYgMTEuNy00YzEuNC00LjQuNy0xMS45LjctMTEuOXMtNi44IDIuMi0xMi4zIDEuM3oiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNOTguNyA5Mi42cy43IDcuMS0uMiAxMS40LjcgNC4yIDIuNCAyIDMuOC02LjIgMy41LTEzLjd2LTMuNGwtNS45IDEuNnoiIGZpbGw9IiNlODQ3MTUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA2Ij48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc3IDc2czAtMTIgNi0xMiA2IDExLjU5IDYgMTEuNTlTODQgNjQgNzcgNzZ6TTEwMSA3NS41czAtMTEgNS41LTExIDUuNSAxMC42MiA1LjUgMTAuNjItNC41OC0xMC42Mi0xMSAuMzh6TTk1LjMzIDk1LjA5cS0uNzcgMC0xLjUtLjA2Yy0uODgtLjA2LTEuMjggNS4zNi0yLjU1IDUuNjdzLTEuNzItNi4zOC0yLjU0LTYuNjNjLTIuMzctLjcyLTYuNDgtMS43Ni04LjI2LTIuOTEtNC0yLjU5LTQuNDItNS43NC00LjQyLTcgMC0yLjM4IDcuNDYgNS40MiAxOSA1LjQyaC40NmM3Ljg5IDAgMTIuNzgtMi41MyAxMy42NS0zczIuMzktLjY1IDIuMzkgMS42YzAgMS4wOS0xLjg1IDIuNzctNC42OSA0LjIxLS43My4zNy0uODYgOC40My0yLjM4IDguMDVzLTEuNzMtNi4zOS0yLjY1LTYuMTRhMjQuMiAyNC4yIDAgMDEtNi41MS43OXoiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTg3LjkzIDg4LjU0bDIuNTcgMTEuMzhzLjQ2IDEuOTIgMS40OCAwIDIuNS0xMC40IDIuNS0xMC40YTI2LjY2IDI2LjY2IDAgMDEtNi41NS0uOTh6TTEwMC44NCA4OS4xM2wyLjgxIDEwLjIxczEuMjIgMi4zNCAxLjc4IDAgMS43Ny0xMS44OSAxLjc3LTExLjg5LTEuNTEuODItNi4zNiAxLjY4eiIvPjwvZz48ZyBvcGFjaXR5PSIuMDUiPjxwYXRoIGQ9Ik05MSA5MS41MXMxLjE5LS41MSAwIDguNDFjMCAwIDAgMS4wOCAxIDAgLjgtMS45MiAyLjQ4LTEwLjQgMi40OC0xMC40YTE5LjIxIDE5LjIxIDAgMDEtNC4zNi0uNDV6TTEwMy40NSA5MC44czEuMDctLjcyIDEuNSA4LjI3YS44Ny44NyAwIDAwLjIzLjQzYy4xNi4xNCAxLjY5LTExLjYzIDEuNjktMTEuNjNhNDguMTYgNDguMTYgMCAwMS00LjcyIDEuNjh6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDciPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNNzYgNzdzMC0xMiA2LTEyIDYgMTEuNiA2IDExLjZTODMgNjUgNzYgNzd6TTEwMCA3Ni41czAtMTEgNS41LTExIDUuNSAxMC42IDUuNSAxMC42LTQuNi0xMC42LTExIC40eiIvPjwvZz48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTc1IDkxLjFjLS4yLTEuNS40LTIuOSAxLjQtMy45IDAgMCAxMC44IDAgMTMtNC42czQuMy0xMC4xIDcuOS03LjhjNS43IDMuMyA1IDcuOCA4LjYgMTAuMXM3LjIgNS43IDEyLjIgNS43IDUuOC41IDUuOCAyLjEtMi4yIDQuNy02LjUgMy4xLTEwLjQtNC4zLTE5LjgtLjQtNSA0LjctMTAuOCAyLjNjLTQuMS0xLjgtOC00LTExLjgtNi42eiIvPjxwYXRoIGQ9Ik03Ny44IDkyLjZsLS42IDIuOSAyLjIgMy42czYuNSAwIDguNyAyLjIgMTMuNyA1IDIwLjkgMi45IDYuNy04LjYgNi43LTguNi0xMi43IDUuNC0yMi4xIDIuMWE5IDkgMCAwMS0zLjEgMS41Yy0yLjItLjctNC40LTEuNS02LjYtMi41LTIuMy0xLTQuMy0yLjQtNi4xLTQuMXoiLz48cGF0aCBkPSJNMTE2LjMgOTQuNXMtNS44LTIuMi0xMC4xLTEuNGMtMy40LjUtNi43IDEuMy05LjkgMi42IDQuMiAxLjcgMTMuNi0xLjIgMjAtMS4yeiIvPjwvZz48cGF0aCBkPSJNMTE2LjMgOTQuNXMtNS44LTIuMi0xMC4xLTEuNC05IDEuOC0xMS4zIDMuNGMwIDAgMi40IDEuNyA3LjIgMS4zczEyLjEtMS44IDE0LjItMy4zeiIgZmlsbD0iI2ViNTI3MyIvPjxwYXRoIGQ9Ik03NiA5MC45bDEuNC0zLjZzMTAuOCAwIDEzLTQuMyA0LjMtOS40IDcuOS03LjIgNSA3LjIgOC42IDkuNCA3LjIgNC4zIDEyLjIgNC4zIDUuNyAxLjQgNS43IDIuOS0yLjIgNC4zLTYuNSAyLjktMTAuNC00LTE5LjgtLjQtNSA0LjMtMTAuOCAyLjJjLTQtMS43LTcuOS0zLjgtMTEuNy02LjJ6IiBmaWxsPSIjZmJkYjMxIi8+PHBhdGggZD0iTTc2IDkwLjlsMS40LTMuNmE1MCA1MCAwIDAwMTUuMSA3LjJjNC4zLTUgMjEuNi01IDMyLjQtMi4yLjEgMS40LTIuMiA0LjMtNi41IDIuOXMtMTAuNC00LTE5LjgtLjQtNSA0LjMtMTAuOCAyLjJjLTQuMS0xLjYtOC0zLjctMTEuOC02LjF6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNOTEuOCA4M2wtLjcgMi4yIDUuMSA0LjNjLjQuNCAxIC40IDEuNCAwIC43LS43LTIuMi0zLjYtMi4yLTMuNkw5My4zIDgzYy0uNC0uNC0xLS40LTEuNSAwIC4xIDAgLjEgMCAwIDB6Ii8+PHBhdGggZD0iTTc4LjggOTIuNmwtLjYgMS45IDIuMiAzLjZzNi41IDAgOC43IDIuMiAxMy43IDUgMjAuOSAyLjkgNi43LTguNiA2LjctOC42LTEyLjcgNS40LTIyLjEgMi4xYTkgOSAwIDAxLTMuMSAxLjVjLTIuMi0uNy00LjQtMS41LTYuNi0yLjUtMy41LTEuNS02LjEtMy4xLTYuMS0zLjF6IiBmaWxsPSIjZmJkYjMxIi8+PHBhdGggZD0iTTc4LjggOTIuNmwtLjYgMS45IDIuMiAzLjZzNi41IDAgOC43IDIuMiAxMy43IDUgMjAuOSAyLjkgNi43LTguNiA2LjctOC42LTEyLjcgNS40LTIyLjEgMi4xYTkgOSAwIDAxLTMuMSAxLjVjLTIuMi0uNy00LjQtMS41LTYuNi0yLjUtMy41LTEuNS02LjEtMy4xLTYuMS0zLjF6IiBvcGFjaXR5PSIuMiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDgiPjxwYXRoIGQ9Ik0xMTEuNCA2OC4zYy42IDIuNy0uNiA1LjMtMi41IDUuN3MtNC0xLjUtNC42LTQuMi42LTUuMyAyLjUtNS43Yy43LS4xIDcuOS4zIDcuOS4zcy0zLjYgMi41LTMuMyAzLjl6TTgwLjcgNjYuOWMtLjYgMy4xLjcgNS45IDIuOCA2LjNzNC40LTEuNyA1LjEtNC43LS42LTUuOS0yLjgtNi4zYy0uNi0uMS0xMC4xLS4xLTEwLjYuMS0uOS4zIDYuOCAzLjcgNS41IDQuNnoiLz48cGF0aCBkPSJNMTExLjkgODEuNmMtNy43IDEwLjMtMjEuMiA5LjYtMzMuNCAwIDAgMCAxLjcgMTUuNCAxOCAxNS40IDUuMyAwIDguOS0xLjYgMTEuNC0zLjggNS4yLTQuNiA0LTExLjYgNC0xMS42eiIgb3BhY2l0eT0iLjYiIGZpbGw9IiMwMTAxMDEiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA5Ij48cGF0aCBkPSJNODUuMiA5NGgyMS4ycy0uNiAxMS0xMC44IDExYy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zLTMuMy04LjMtMy4zLTguM3oiIGZpbGw9IiM2MDM4MTMiLz48cGF0aCBkPSJNMTAzLjUgMTAxLjNhMTAgMTAgMCAwMS03LjkgMy41Yy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zIDE3LjctNCAxNS0uOHoiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNODIuMiA4Mi40cy0xMC00LjktOC41LTExLjQgMTAuMS0uNyA5LjUtLjkgNi4yLTUuNCA4LjUuOGMxLjcgNi4xLTcuOSAxMi41LTkuNSAxMS41ek0xMDcgODIuNHMtOC41LTQuOS03LjItMTEuNGMxLjItNi41IDguNi0uNyA4LS45LS40LS4yIDUuNC01LjQgNy4zLjggMS41IDYuMS02LjcgMTIuNS04IDExLjV6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik04Mi4yIDgyLjRzLTEwLTQuOS04LjUtMTEuNCAxMC0uNiA5LjUtLjljLTcuMi00LTcuNSA4LjYtMSAxMi4zek0xMDcgODIuNHMtOC42LTQuOS03LjMtMTEuNGMxLjMtNi41IDguNS0uNiA4LS45LTYtNC02LjMgOC42LS44IDEyLjN6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTAiPjxwYXRoIGQ9Ik05Ny42IDgyLjRjNC44LjIgOC41IDQuMyA4LjMgOS4xbC0uMSAzLjNhOC43IDguNyAwIDAxLTkuMSA4LjNIOTZhOCA4IDAgMDEtNy42LTguNGwuMi00YTguNiA4LjYgMCAwMTktOC4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNOTIuNiA2M2ExIDEgMCAwMC0uOS41TDgyLjEgODBhMSAxIDAgMTAxLjcgMWw5LjctMTYuNmExIDEgMCAwMC0uOS0xLjV6bS0xMSAuNGExIDEgMCAwMC0uOCAxLjZsMTEuNCAxNS44YTEgMSAwIDEwMS42LTEuMkw4Mi40IDYzLjhhMSAxIDAgMDAtLjgtLjR6TTExMi4yIDYzLjdhMSAxIDAgMDAtLjguNGwtMTAgMTUuNGExIDEgMCAxMDEuNiAxbDEwLTE1LjNhMSAxIDAgMDAtLjgtMS41em0tOS41LS45YTEgMSAwIDAwLTEgMS40bDguMyAxN2ExIDEgMCAxMDEuOC0uOGwtOC4yLTE3YTEgMSAwIDAwLS45LS42eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTEiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik03Ny4yIDcwLjljMS01LjYgOS4xLTUuNiA5LjgtLjJNMTAzLjUgNzAuN2MuOS01LjIgOC41LTUuMiA5LjEtLjIiLz48L2c+PHBhdGggZD0iTTg1LjIgOTFoMjEuMnMtLjYgMTEtMTAuOCAxMWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMy0zLjMtOC4zLTMuMy04LjN6IiBmaWxsPSIjNjAzODEzIi8+PHBhdGggZD0iTTEwMy41IDk4LjNhMTAgMTAgMCAwMS03LjkgMy41Yy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zIDE3LjctNCAxNS0uOHoiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNOTggODQuOWMxLjEtNi42LTMuMy0xMi4xLTEzLjItOS45LTcuOCAyLTQuNCA5LjktOC44IDEzLjJzLTExIDMuMy0xMSAzLjMgMjcuNSA5LjkgMzMtNi42eiIgZmlsbD0iIzRkMzExOCIvPjxwYXRoIGQ9Ik05Ny4yIDg0LjdjLTEtNi40IDMtMTEuOCAxMi05LjcgNi44IDEgNCA5LjcgOCAxMi45czEwIDMuMiAxMCAzLjItMjUgOS43LTMwLTYuNHoiIGZpbGw9IiM0ZDMxMTgiLz48ZyBvcGFjaXR5PSIuMTUiPjxwYXRoIGQ9Ik05OCA4NC43YzEtNi40LTMtMTEuOC0xMi05LjcgMTMuMiA0IDIuMiAyMS0xOCAxNi4xIDAgMCAyNSA5LjcgMzAtNi40ek0xMDIuOCA3NS4xUzEwOCA3NSAxMDkgNzhzMCA2IDEgOCA3LjggNy44IDE2LjQgNS40YzAgMC05LjMgMS4yLTExLjMtNy4xcy0zLjUtMTAuMi0xMi4zLTkuMnoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xMiI+PHBhdGggZD0iTTEwNC43IDEwMS4xYy0yLjggMy4yLTYuOSA1LTExLjEgNWgtLjRjLTQuMyAwLTguMy0xLjgtMTEuMS01LTMtMy4zLTQuOS04LjYtNC45LTExIDAtMi4xIDMuNS42IDEyLjMgMS4zbDMuNy4xaC41YzcuOSAwIDEyLjgtMi41IDEzLjctMyAuOS0uNSAyLjQtLjcgMi40IDEuNnMtMi4xIDcuNy01LjEgMTF6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0zLjEgODIuOCA3NS44KSIgY3g9IjgyLjgiIGN5PSI3NS44IiByeD0iNi4yIiByeT0iOC42IiBmaWxsPSIjZmZmIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTMuMSAxMDUuOCA3NS45KSIgY3g9IjEwNS44IiBjeT0iNzUuOSIgcng9IjYuMiIgcnk9IjguNiIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIGN4PSI4Mi45IiBjeT0iNzYuMyIgcng9IjMuNyIgcnk9IjQuNCIvPjxlbGxpcHNlIGN4PSIxMDUuOSIgY3k9Ijc2LjMiIHJ4PSIzLjciIHJ5PSI0LjQiLz48Y2lyY2xlIGN4PSI4MC41IiBjeT0iNzMuOSIgcj0iMiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjEwMy41IiBjeT0iNzMuOSIgcj0iMiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03Ny43IDY3LjNjMy41LTQuMSA3LTQgMTAuNCAwIDAgMC00LjgtOS42LTEwLjQgMHpNMTAwLjcgNjcuM2MzLjUtNC4xIDctNCAxMC40IDAgMCAwLTQuOC05LjYtMTAuNCAweiIvPjxwYXRoIGQ9Ik02OC4zIDY3djRsMiAuMmMuOC4zIDEuMyAxIDEuNCAxLjh2NS40cy45IDkgMTAuOCA4LjVTOTIuNyA3NyA5Mi43IDc3czAtNi41IDIuMi02LjUgMi4zIDYuNSAyLjMgNi41LjQgOS45IDEwLjMgOS45IDEwLjMtOC41IDEwLjMtOC41di01LjhjMC0uNy42LTEuMyAxLjMtMS4zaDEuOXYtNGwtMjEuOC0uMWMtLjguMi0xLjQuNi0yIDEuMmwtMi4xIDItMi4yLTIuMWEzLjQgMy40IDAgMDAtMi43LTFMNjguMyA2N3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNOTAuMSA5Ni41bC0uMi00LjNjMy4zLjQgNi43LjMgMTAtLjRsLjIgNC4yYy4xLjUtLjIuNy0uNy45bC00IC4yLS40LTMuNC0uMyAzLjMtMy45LjJjLS41LS4xLS43LS4zLS43LS43eiIgZmlsbD0iI2ZmZiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTMiPjxwYXRoIGQ9Ik0xMDkgOTguNGEyMS4xIDIxLjEgMCAwMS0xMi45IDQuMWgtLjVhMjEuMiAyMS4yIDAgMDEtMTIuOS00LjFjLTMuNS0yLjgtNS43LTctNS43LTlzNy4yIDEuMSAyMC42IDEuMWgtMS41YzkuMSAwIDE0LjgtMiAxNS44LTIuNCAxLS40IDIuNy0uNiAyLjcgMS4zIDAgMS44LTIgNi4yLTUuNiA5eiIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxlbGxpcHNlIGN4PSI5Ny4zIiBjeT0iNzIuNyIgcng9IjcuNyIgcnk9IjEwLjgiIHRyYW5zZm9ybT0icm90YXRlKC0zLjIgOTcuNCA3Mi43KSIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIGN4PSI5Ny40IiBjeT0iNzQuNSIgcng9IjQuNiIgcnk9IjUuNSIvPjxjaXJjbGUgY3g9Ijk0LjUiIGN5PSI3MS41IiByPSIyLjUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTEgNjJjNC40LTUuMSA4LjctNSAxMyAwIDAgMC02LTEyLTEzIDB6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNCI+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik04NCA2M2MtMi0xLTUtMi05IDNzLTggMTMtNSAxOSAxMSAzIDEyLTEgMC02IDMtOSA0LTktMS0xMnpNMTAzLjIgNjIuOGMxLjktLjkgNC43LTEuOSA4LjQgMi44czcuNCAxMi4xIDQuNyAxNy43LTEwLjMgMi43LTExLjItMSAwLTUuNi0yLjgtOC40LTMuNy04LjMuOS0xMS4xeiIvPjwvZz48cGF0aCBkPSJNOTggODMuMTFjLTMuNy0uMDYtNyAuODktNyAuODktMS41LjMtMiAxLTEgMiAwIDAgNC43NCAzLjE2IDYuNSAzLjg2YTU4LjQ1IDU4LjQ1IDAgMDEtLjE3IDMuNjhjLS4xMSAxLjM3LS4zIDIuNzMtLjU3IDMuNjktLjE0LjQ4LS4zLjc4LS40IDEuMDEtLjIzLjQ5LS4zOC42MS0uMzguNjEtLjM4LjA0LS40Ny4wMy0uNDcuMDMtMS41LS4wNi0yLjg4LS4zMy00LjEtLjczYTE2LjM3IDE2LjM3IDAgMDEtNi41NC0zLjk5LjUuNSAwIDEwLS43NC42OHMyLjU4IDIuODQgNi45NyA0LjI2YzQuMzggMS40MiAxMC42IDEuMzggMTcuNy00LjIuNTgtLjQxLS4wOC0xLjI2LS42LS44LTQuMTMgMy4yNS03Ljg1IDQuNTItMTEuMDYgNC43NS4yNS0uMzYuNDMtLjgyLjU4LTEuMzUuMy0xLjA4LjQ5LTIuNDguNi0zLjg4LjExLTEuMzcuMTYtMi43My4xOC0zLjc3Qzk5LjEgODkuMTMgMTAzIDg2IDEwMyA4NmMxLS45IDEuMi0xLjYgMC0yYTE0LjIxIDE0LjIxIDAgMDAtNS0uODl6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNSI+PHBhdGggZD0iTTk0IDcxYy03LjQuNS04LjkgNC44LTguOSA0LjhhMjEgMjEgMCAwMC0yLjQgOS4yYzAgNC4zLS44IDQgNC41IDUuMiAwIDAtMSAxMSA5LjMgMTAuM3YzLjdjMCAxMC42IDYuNCAzLjQgNi40IDMuNHM3LjktMy45IDkuOS0xNi40UzEwMi45IDcxIDk0IDcxem0uMSAyMS4ybC0uMy0uMi4zLjJ6bS0uMy0uMWwtMi42LS45Yy45LjIgMS44LjUgMi42Ljl6bS44LjRjMS4yLjggMS43IDEuOSAxLjkgMy44YTYgNiAwIDAwLTEuOS0zLjh6IiBvcGFjaXR5PSIuMiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0xNC43IDEwNi45IDcyLjMpIiBjeD0iMTA2LjgiIGN5PSI3Mi4zIiByeD0iMy42IiByeT0iNS4xIiBmaWxsPSIjNDIyMTBiIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTgxLjYgODMuNyA3Mi40KSIgY3g9IjgzLjciIGN5PSI3Mi40IiByeD0iNS43IiByeT0iNCIgZmlsbD0iIzQyMjEwYiIvPjxwYXRoIGQ9Ik05NC45IDcyYy02LjcuNC04IDQuNC04IDQuNGExOS4xIDE5LjEgMCAwMC0yLjIgOC40YzAgMy45LS43IDMuNyA0LjEgNC44IDAgMC0uOSAxMC4xIDguNCA5LjZ2My40YzAgOS44IDUuOCAzLjEgNS44IDMuMXM3LjEtMy42IDguOS0xNS4xLTktMTguNi0xNy0xOC42em0uMSAxOS42bC0uMy0uMi4zLjJ6bS0uMy0uMWwtMi4zLS44Yy44LjEgMS42LjQgMi4zLjh6bS43LjRjMS4xLjggMS41IDEuOCAxLjcgMy41YTUuMSA1LjEgMCAwMC0xLjctMy41eiIgZmlsbD0iI2ZiZGIzMSIvPjxwYXRoIGQ9Ik04OC44IDg5LjdzLS45IDEwLjEgOC40IDkuNmMwIDAgLjgtNi41LTIuNC03LjhzLTYtMi02LTEuOHoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTg2LjkgNzYuNHMxLjMtNCA4LTQuNGM4IDAgMTguNyA3LjEgMTYuOSAxOC43cy04LjkgMTUuMS04LjkgMTUuMWM4LjktMTYgNS4yLTMwLjUtMTYtMjkuNHoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik05MC4zIDc5LjFjLS43IDEuNC0xLjIgMi45LTEuNiA0LjQgMCAuOSAzLjItNS4zIDEuNi00LjR6bTEuMyAwYTE0IDE0IDAgMDAtLjkgMi45Yy4xLjUgMi4yLTMuNy45LTIuOXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzE2Ij48ZyBvcGFjaXR5PSIuMyI+PGVsbGlwc2UgY3g9IjEwMC41IiBjeT0iODYuNSIgcng9IjE0LjUiIHJ5PSIxMS43IiBmaWxsPSIjZmNmY2ZjIi8+PHBhdGggZD0iTTEwMC41IDk4LjJjLTggMC0xNC41LTUuMi0xNC41LTExLjdzNi41LTExLjcgMTQuNS0xMS43UzExNSA4MCAxMTUgODYuNWMwLTcuMy03LjQtMTMuMy0xNi41LTEzLjNTODIgNzkuMiA4MiA4Ni41czcuNCAxMy4zIDE2LjUgMTMuMyAxNi41LTYgMTYuNS0xMy4zYzAgNi41LTYuNSAxMS43LTE0LjUgMTEuN3oiLz48L2c+PGcgZmlsbD0iIzIxMTMwOSI+PGVsbGlwc2UgY3g9Ijk2IiBjeT0iODYuNSIgcng9IjMiIHJ5PSI1LjUiLz48ZWxsaXBzZSBjeD0iMTA3IiBjeT0iODYuNSIgcng9IjMiIHJ5PSI1LjUiLz48L2c+PGcgZmlsbD0iIzQyMjEwYiI+PHBhdGggZD0iTTk5IDg2LjVjMCAzLTEuMyA1LjUtMyA1LjUtLjUgMC0xLjEtLjItMS40LS42Qzk4IDkxIDk4IDgyIDk0LjMgODJjLjQtLjYgMS0uOSAxLjctMSAxLjcgMCAzIDIuNSAzIDUuNXpNMTEwIDg2LjVjMCAzLTEuMyA1LjUtMyA1LjUtLjUgMC0xLjEtLjItMS40LS42IDMuNC0uNCAzLjQtOS40LS4zLTkuNC40LS42IDEtLjkgMS43LTEgMS43IDAgMyAyLjUgMyA1LjV6Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTExLjUgMTA5LjggNjkpIiBjeD0iMTA5LjgiIGN5PSI2OSIgcng9IjMuNiIgcnk9IjUuMSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC03OC41IDg2LjcgNjcuNykiIGN4PSI4Ni43IiBjeT0iNjcuNyIgcng9IjUuNyIgcnk9IjQiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNyI+PHBhdGggZD0iTTExNy4yIDY2UzgxLjQgNTQuNSA0NCA2My41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMDEuNSA2My40cy41IDE5LjYgNyAyMC42YzQuNSAxLjEgNi41LTEuNyA3LTQuNnMuNC0xMS40LTEuOC0xNC4zTDEwMSA2MmwuNSAxLjR6IiBmaWxsPSIjMDEwMTAxIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTMuMSA4NS4zIDcyLjcpIiBjeD0iODUuMyIgY3k9IjcyLjciIHJ4PSI3LjciIHJ5PSIxMC44IiBmaWxsPSIjZmZmIi8+PGVsbGlwc2UgY3g9Ijg1LjQiIGN5PSI3NC41IiByeD0iNC42IiByeT0iNS41Ii8+PGNpcmNsZSBjeD0iODIuNSIgY3k9IjcxLjUiIHI9IjIuNSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03OSA2Mi40YzMuNi0yLjYgMTEuNSAxLjYgMTcgMi42IDAgMC0xMC45LTcuMi0xMi44LTguMlM3OSA2Mi40IDc5IDYyLjR6Ii8+PHBhdGggZD0iTTEwNi45IDkwLjhjLTIuNy0zLTYuNi00LjgtMTAuNi00LjhoLS40Yy0xMC42IDEuMS0xOC4xIDEwLjQtMTUuMyAxNS4zIDIuNSA1LjUgMTkuOS04LjMgMjcuOC42IDIuMyAxLjMgMy43LTEgMy4yLTMuNC0uNC0yLjItMS44LTQuNS00LjctNy43eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNODAuOCA5NS42cy0xLjggMy40LS4zIDUuN2MyLjUgNS41IDE5LjktOC4zIDI3LjguNi40LTIuOS41LTUuOS40LTguOC4xLS4xLTI3LjkgMy4zLTI3LjkgMi41eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04MC44IDk1LjZzLTEuOCAzLjQtLjMgNS43YzIuNSA1LjUgMTkuOS04LjMgMjcuOC42LjQtMi45LjUtNS45LjQtOC44LjEtLjEtMjcuOSAzLjMtMjcuOSAyLjV6IiBmaWxsPSIjZmZmIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xOCI+PHBhdGggZD0iTTc3IDgxczAtMTIgNi0xMiA2IDExLjYgNiAxMS42Uzg0IDY5IDc3IDgxem0yNC0uNXMwLTExIDUuNS0xMSA1LjUgMTAuNiA1LjUgMTAuNi00LjYtMTAuNi0xMSAuNHoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ii8+PHBhdGggZD0iTTc1IDg1LjRoMzguM3MtMS4xIDIzLjEtMTkuNCAyMy4xYy01IC4yLTkuNy0xLjktMTIuOS01LjgtNS44LTYuOC02LTE3LjMtNi0xNy4zeiIgZmlsbD0iIzYwMzgxMyIvPjxwYXRoIGQ9Ik0xMDguMSAxMDAuOGExNi41IDE2LjUgMCAwMS0xNC4yIDcuM2MtNSAuMi05LjctMS45LTEyLjktNS44LTUuOC02LjggMzEuOS04LjMgMjcuMS0xLjV6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTc1IDg1aDM4LjNjLS4xIDIuNS0uNSA1LTEuMyA3LjMgMCAwLTIyLjUgNC4yLTM1LjktLjNhMzMgMzMgMCAwMS0xLjEtN3oiIGZpbGw9IiNmZmYiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzE5Ij48cGF0aCBkPSJNNzQuNCA4M2MxMy41IDIgMjYuNCAyLjUgMzguMiAwIDAgMC0xLjEgMjMtMTkuNCAyMy00LjkuMi05LjYtMi0xMi44LTUuNy01LjctNi44LTYtMTcuMy02LTE3LjN6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik0xMDcuNCA5OC40YTE2LjcgMTYuNyAwIDAxLTE0LjIgNy4zYy00LjkuMi05LjYtMi0xMi44LTUuNy01LjctNi45IDMxLjgtOC40IDI3LTEuNnoiIGZpbGw9IiNmMTVhMjQiLz48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTkzLjQgNjcuOGMtLjItLjQtLjYtLjYtMS0uNmwtNy45LjItNC44LTYuOWMtLjQtLjUtMS0uNi0xLjUtLjJsLS40LjUtMi4xIDguMS03LjUgMi41YTEgMSAwIDAwLS43LjljLS4xLjQuMS44LjUgMS4xbDYuNiA0LjguMSA4LjRjMCAuNC4yLjguNiAxIC40LjIuOC4xIDEuMS0uMWw2LjItNS4xIDcuNiAyLjdoLjVsLjYtLjNjLjMtLjMuNC0uOC4yLTEuMmwtMi44LThjLjEuMSA0LjktNy40IDQuNy03Ljh6TTEyMS41IDcxLjlhMSAxIDAgMDAtLjgtLjhsLTcuNi0xLjktMi43LTcuNGMtLjItLjUtLjktLjgtMS40LS41bC0uNC40LTQuMiA2LjctNy44LjRjLS40IDAtLjguMy0uOS42LS4yLjQtLjEuOC4yIDEuMWw1IDYuMS0yLjEgNy43Yy0uMS40IDAgLjguMyAxLjEuMy4zLjcuNCAxLjEuMmw3LjMtM0wxMTQgODdsLjUuMi42LS4xYy4zLS4yLjUtLjYuNS0xbC0uNS03LjljLS4xLS4zIDYuNS01LjkgNi40LTYuM3oiLz48L2c+PGcgZmlsbD0iI2YzZmYwMCI+PHBhdGggZD0iTTkyLjMgNjguNmExIDEgMCAwMC0uOS0uNWwtNy4xLjItNC4yLTUuOWMtLjQtLjQtMS0uNS0xLjQtLjFsLS4zLjQtMiA3LTYuOCAyLjNjLS4zLjEtLjYuNC0uNy44IDAgLjQuMS43LjQuOWw1LjkgNC4xVjg1YzAgLjQuMi43LjYuOS4zLjEuNy4xIDEtLjFsNS43LTQuNCA2LjggMi4yYy40LjEuNyAwIDEtLjIuMi0uMy4zLS43LjItMWwtMi40LTYuOXM0LjQtNi42IDQuMi02Ljl6TTExOC45IDcyLjRjLS4xLS4zLS4zLS42LS42LS43bC02LjItMS42LTIuMi02LjFjLS4yLS41LS43LS43LTEuMi0uNWwtLjQuMy0zLjQgNS41LTYuNC4zYy0uNSAwLS45LjQtLjguOWwuMi41IDQuMSA1LTEuNyA2LjNjLS4xLjMgMCAuNy4zLjkuMi4yLjYuMy45LjJsNi0yLjQgNS4zIDMuNi40LjEuNS0uMWMuMy0uMi41LS41LjQtLjhsLS40LTYuNWMtLjEgMCA1LjMtNC42IDUuMi00Ljl6Ii8+PC9nPjxnIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNODQgNjguM2wtNC01LjlhMSAxIDAgMDAtMS4zLS4yYy0uMi4xLS4zLjMtLjMuNWwzLjcgNi4zIDEuOS0uN3pNOTAuNyA2OC44bC00LjQgNS44LjEuMi0uMSAxLjEgMi40IDYuN2MuMi41LjcuNyAxLjIuNWwuNC0uNC0yLTcuMWgtLjRsMy43LTUuNmMuMi0uNC4xLTEtLjQtMS4yaC0uNXpNMTExLjggNzAuMWwtMi4xLTYuMWMtLjItLjQtLjYtLjYtMS0uNWwtLjQuMyAxLjcgNi40IDEuOC0uMXpNMTE3LjQgNzIuMWwtNS4zIDR2LjJsLS40LjkuNCA2LjRjMCAuNC40LjguOS43bC41LS4ydi02LjZsLS4zLS4xIDQuNi00Yy4zLS4zLjMtLjggMC0xLjFsLS40LS4yeiIvPjwvZz48ZyBvcGFjaXR5PSIuMDUiPjxwYXRoIGQ9Ik04MS42IDc5LjJsLTUuMiA0LjlhMSAxIDAgMDAwIDEuM2wuNS4yIDUuNi00LjctLjktMS43ek0xMDcgNzguOWwtNS43IDNjLS40LjItLjUuNy0uMyAxLjEuMS4yLjIuMy40LjNsNi0yLjctLjQtMS43eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzIwIj48cGF0aCBkPSJNODcuMiA5NGgyMS4ycy0uNiAxMS0xMC44IDExYy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zLTMuMy04LjMtMy4zLTguM3oiIGZpbGw9IiM2MDM4MTMiLz48cGF0aCBkPSJNMTA1LjUgMTAxLjNhMTAgMTAgMCAwMS03LjkgMy41Yy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zIDE3LjctNCAxNS0uOHoiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNNzEuMyA2OGgtMS44djRoMS44YzEgLjMgMS44IDEuMiAxLjggMi4yVjgwcy0uMyA4LjEgMTEuOCA3LjljMCAwLTguNi4yLTEwLTguM3YtNS40YzAtLjgtLjYtMS41LTEuMy0xLjhsLTEuOS0uNC0uNC00eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNNzEuMyA2OHY0bDIgLjJjLjguMyAxLjMgMSAxLjQgMS44djUuNHMuOSA5IDEwLjggOC41Uzk1LjcgNzggOTUuNyA3OHMwLTQuNSAyLjItNC41IDIuMyA0LjUgMi4zIDQuNS40IDkuOSAxMC4zIDkuOSAxMC4zLTguNSAxMC4zLTguNXYtNS44YzAtLjcuNi0xLjMgMS4zLTEuM2gxLjl2LTRsLTIxLjgtLjFjLS44LjItMS40LjYtMiAxLjJsLTIuMSAyLTIuMi0yLjFhMy40IDMuNCAwIDAwLTIuNy0xTDcxLjMgNjh6IiBvcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNNzEuMyA2OHY0bDIgLjJjLjguMyAxLjMgMSAxLjQgMS44djUuNHMuOSA5IDEwLjggOC41Uzk1LjcgNzggOTUuNyA3OHMwLTQuNSAyLjItNC41IDIuMyA0LjUgMi4zIDQuNS40IDkuOSAxMC4zIDkuOSAxMC4zLTguNSAxMC4zLTguNXYtNS44YzAtLjcuNi0xLjMgMS4zLTEuM2gxLjl2LTRsLTIxLjgtLjFjLS44LjItMS40LjYtMiAxLjJsLTIuMSAyLTIuMi0yLjFhMy40IDMuNCAwIDAwLTIuNy0xTDcxLjMgNjh6IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMjEiPjxwYXRoIGQ9Ik03OSA4OC41Yy0uMy0uMS02LjQgNC4yLTguMyA2LjJzLjQgNy44IDguMyA0YzMuMi0xLjIgNy4xLTQuNyA3LjEtNC43cy00LjgtMi40LTcuMS01LjV6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTgxLjEgOTIuN2MtMiAxLjgtNC4yIDMuNS02LjYgNC44LTIuOSAxLjQtMi4xIDIuMiAwIDIuMXM1LjUtLjggOS43LTQuMmwxLjktMS40LTQtMi4yLTEgLjl6IiBmaWxsPSIjZTg0NzE1Ii8+PHBhdGggZD0iTTc2LjEgODMuM2MtLjUtMi42IDMuMyAxMy40IDE4LjQgMTIuNyAxNi0uOCAxNi41LTEzLjYgMTYuNS0xMy42IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MjIxMGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik03NyA3NXMwLTEyIDYtMTIgNiAxMS42IDYgMTEuNlM4NCA2MyA3NyA3NXpNMTAwIDc1czAtMTIgNi0xMiA2IDExLjYgNiAxMS42LTUtMTEuNi0xMiAuNHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzAxIj48cGF0aCBkPSJNOTAuNSAxMjIuNXM1IDAgNC0yYy0uNC0uOS0zLjktMi42LTMuOS0yLjZsLTIuNC4zYzIuNCAyIDMgMy40IDIuMyA0LjN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik04OSAxMjIuOHMtMS4xIDMuNiAyIDQuMmM2IDEgNyA2IDYgOC0yIDUtMTYgOC0yMi0ycy02LTExLTE2LTEyLTEyIDUtMTIgNWMwIDIgMSAxIDEgMSAyLTMuNiA1LjktNS42IDEwLTUgOSAxIDExIDMgMTIgNXM1IDExIDEyIDEzIDE0IDAgMTYtNS0zLjMtOC41LTYtOWMtLjgtLjItMS44IDAtMi0yLjh2LS4yYzAtMi0xLS4yLTEtLjJ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik04NC41IDEyMy41YzEgMiA2LTEgNi0xczUgMCA0LTJjLS40LS45LTMuOS0yLjYtMy45LTIuNmwtNC44LjZzLTEuOCAzLjktMS4zIDV6Ii8+PHBhdGggZD0iTTkwIDEyMi44cy0xLjEgMy42IDIgNC4yYzYgMSA3IDYgNiA4LTIgNS0xNiA4LTIyLTJzLTYtMTEtMTYtMTItMTIgNS0xMiA1YzAgMiAxIDEgMSAxIDItMy42IDUuOS01LjYgMTAtNSA5IDEgMTEgMyAxMiA1czUgMTEgMTIgMTMgMTQgMCAxNi01LTMuMy04LjUtNi05Yy0uOC0uMi0xLjggMC0yLTIuOHYtLjJjMC0yLTEtLjItMS0uMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODQuNSAxMjMuNWMxIDIgNC0xIDYtMXM1IDAgNC0yYy0xLjUuNS03LjUgMi41LTEwIDN6IiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wMiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTE3LjggMTI3LjNjLTUtNS45LTkuOS0yLjUtMTEuOS0uNy0xLjItMS0yLjMtMi4xLTMuMi0zLjRMOTcgMTE1YTM1LjIgMzUuMiAwIDAxLTEyLjIgNC4xbDMuNiAxMXMtNSAuNy01IDMuNCAyLjIgNi4yIDguNiAzLjQgMTIuOS0uNyAxOC42LjcgMTIuMi0uNyAxMi4yLTQuOGMwLTMuMi0xLjMtNS42LTUtNS41ek03NS41IDEyNS45bC0uOC03LjJzLTEwLTEuNC0xNi40LTUuN2MwIDAtMy40IDEyLjktNi45IDE0LjlhNCA0IDAgMDAtNS40IDEuMyAzLjkgMy45IDAgMDAzLjMgNmMuNiAwIDEuMy0uMiAxLjgtLjVhNS4zIDUuMyAwIDAwOSAuMiA1LjQgNS40IDAgMDA3LjEgMi42IDUgNSAwIDAwMi41LTIuNSA2IDYgMCAwMDguMyAyLjEgNiA2IDAgMDAyLjEtOC4zIDUuNiA1LjYgMCAwMC00LjYtMi45eiIvPjwvZz48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTEyMiAxMzEuOWMtMi42LTIuNi03LjktMy03LjktM2E5IDkgMCAwMTMuOS0uOWMyLjItLjEgNCAxLjcgNCAzLjl6TTg2LjEgMTE5LjFTOTAgMTI4IDg5IDEzMWMwIDAgMS45LTggMS0xMC4ycy0zLjktMS43LTMuOS0xLjd6TTU4LjkgMTEzLjlzLTMuMyAxMS4yLTYuMyAxM2MwIDAgNy4yLTUuNiA4LjEtOC40cy0xLjgtNC42LTEuOC00LjZ6TTc5IDEzMC45Yy0yLjYtMi42LTQuNi0zLjMtNy45IDAgMC0yLjIgMS44LTMuOSAzLjktMy45czQgMS43IDQgMy45ek02Ny42IDEzM2MtMS45LTEuOS0zLjMtMi40LTUuNyAwLS4xLTEuNiAxLjEtMi45IDIuNy0zczIuOSAxLjEgMyAyLjd2LjN6TTU4LjMgMTMxLjZjLTEuNC0xLjQtMi41LTEuOC00LjMgMGEyLjEgMi4xIDAgMDEyLjMtMmMxLjEgMCAxLjkuOSAyIDJ6TTUyLjEgMTMxLjZjLTEuMy0yLjQtMi42LTMuMi01LjUtMS42LjQtMS41IDEuOS0yLjUgMy40LTIuMSAxLjUuNCAyLjUgMS45IDIuMSAzLjR2LjN6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNODMuNCAxMzMuNWMwIDIuNyAyLjIgNi4yIDguNiAzLjRzMTIuOS0uNyAxOC42LjcgMTIuMi0uNyAxMi4yLTQuOEMxMTQgMTM4IDExMyAxMzQgOTggMTM0LjZjLTggMC0xMiA0LjQtMTQuNi0xLjF6TTcxLjUgMTM2LjFjNS4yLS40IDcuOC0xLjggNy4zLTguNGE1LjYgNS42IDAgMDEtNyA4LjZjLS4yIDAtLjItLjEtLjMtLjJ6TTYyLjYgMTM2LjVjNC4yLS4zIDYuMi0xLjUgNS44LTYuNyAxLjkgMS42IDIuMSA0LjQuNSA2LjJzLTQuNCAyLjEtNi4yLjVjMCAuMS0uMSAwLS4xIDB6TTUzLjUgMTM1LjljMy43LS4yIDUuNS0xLjMgNS4yLTUuOSAxLjcgMS40IDIgMy44LjYgNS41YTMuOSAzLjkgMCAwMS01LjUuNmwtLjMtLjJ6TTQ3LjMgMTM0YzMtLjIgNC41LTEgNC4yLTQuOCAxLjQgMS4xIDEuNiAzLjEuNSA0LjVzLTMuMSAxLjYtNC41LjVsLS4yLS4yek02OSAxMTcuNWwuOCA3LjNjLTUuMS0uNC0xMC4yLjYtMTQuNyAyLjhhNDAgNDAgMCAwMTE0LjktLjhzMi44LTEuOCA1LjYtLjlsLS45LTcuNGEyMiAyMiAwIDAxLTUuNy0xek0xMDUuOSAxMjYuNmMyLTEuOCA2LjktNS4yIDExLjkuNyAwIC4xLTguOCAyLjctMTEuOS0uN3oiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzAzIj48cGF0aCBkPSJNNTkuNSAxMTQuNGMtLjYtMS0xLjktMS4yLTIuOS0uNmgtLjFjLTEuOCAxLjItMS44IDIuOS0xLjIgMy41bDEyLjIgMTMuNCAxLjIgMTEuMXMwIDEuMiAyLjMgMS4yIDEuOC0xLjggMS44LTEuOGwtLjYtMTEuMSA4LjgtMTRjMS4yLTEuOC0xLjItNS44LTQuNy0yLjlMNzEuNiAxMjYgNzAgMTA5LjhhMyAzIDAgMDAtMi45LTEuOGMtMi4zIDAtMi4zIDIuMy0yLjMgMy41czIuOSAxNS4yIDIuOSAxNS4ybC04LjItMTIuM3pNMTE5IDEyMC4yYzAtLjYtLjUtMS4yLTEuMS0xLjJsLTExLjEgMi45LTIuMSAyYzEuNy0xLjkgMy4xLTMuOSA0LjQtNi4xIDEuMi0yLjMgMi4zLTEuOCAyLjMtMS44czIuOSAwIDMuNS0xLjgtLjYtMS44LTIuOS0yLjNjLTEuNS0uMy0zIC4xLTQuMSAxLjJsLTguOCA5LjktMy41LTUuMiAxLjgtMy41Yy0xLjggMi4zLTEyLjIgNS4yLTEyLjIgNS4ybDUuMiAxLjJjMiAxLjcgMy44IDMuNyA1LjIgNS44IDEuOCAyLjktMi4zIDE0LTIuMyAxNC0uMyAyLjUgMy43IDEuNSA0LjctMi4yLjUtMi44IDEuMi01LjUgMi04LjEgMS40LjIgOS4zIDEuMSAxMC45IDEuMS45IDAgMS43LS43IDEuOC0xLjd2LS4xbC01LjgtMy41Yy0uMS4xIDEyLjEtNC42IDEyLjEtNS44eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNNTkuNSAxMTQuNGMtLjYtLjItMS4yLS4yLTEuOCAwLTEuOCAxLjIgMS44IDUuMiAxLjggNS4ybDkuMyAxMS4xIDEuMiAxMS4xcy0uMyAxLjIgMS4yIDEuMmMyLS4zIDEuOC0xLjggMS44LTEuOGwtLjYtMTEuMSA4LjgtMTRjMS4yLTEuOC0uOS0zLjgtMy41LTEuMmwtNS44IDEyLjgtMS45LTE3LjlzMC0xLjItMi4zLTEuMi0xLjggMi45LTEuOCAyLjlsMi45IDE2LjktOS4zLTE0ek05Mi40IDExOC4ybDUuMyA3IDEuNS0yLjEtMy42LTUuMSAxLjQtMi45LTQuNiAyLjV6Ii8+PC9nPjxwYXRoIGQ9Ik05OS44IDEyNi43YzIuMy0xLjggNi42LTguMyA5LjItMTIuMSAyLjItMS42IDQuOS0yLjIgNi0uMi0uNSAxLjgtMy41IDEuOC0zLjUgMS44cy0xLjItLjYtMi4zIDEuOC01LjggOC4yLTcuNiA5LjMtMy42IDExLTMuNiAxMWMtMSAxLjktMiAzLTMuMSAzbDQuOS0xNC42eiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMTA2LjggMTIybDExLjEtMi45Yy42IDAgMS4yLjUgMS4yIDEuMSAwIDEuMi0xMi4yIDUuOC0xMi4yIDUuOGw1LjggMy41YzAgLjktLjcgMS43LTEuNyAxLjhoLS4xYy0xLjggMC0xMS4xLTEuMi0xMS4xLTEuMmwxLjItMi41IDUuOC01LjZ6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wNCI+PHBhdGggZD0iTTg2LjggMTE4LjdMMTA4IDEwOWM1LjggMTAuNyA1IDE5LjkgMCAyOC4xbC0yMS4yLTEwLjhjLjktMS4xIDEuOS01LjIgMC03LjZ6TTc5LjEgMTE3LjdsLTI2LTEyYy01LjUgOS42LTUuNSAyMS4yIDAgMzQuNmwyNi4xLTEzLjRjLTEuMi0xLjMtMy44LTUuNC0uMS05LjJ6Ii8+PHBhdGggZD0iTTc5LjEgMTE3LjdsLTI2LTEyYy01LjUgOS42LTUuNSAyMS4yIDAgMzQuNmwyNi4xLTEzLjRjLTEuMi0xLjMtMy44LTUuNC0uMS05LjJ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMTUiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNSI+PHBhdGggZD0iTTk3LjkgMTI1LjlsLTcuMS0xLjZzLTEuMi0uMS0xLjEtLjhjLjEtLjcgMS4zLS41IDEuMy0uNWw3LjIuMmMuNy4xIDEuMi44IDEuMSAxLjUtLjEuNy0uNyAxLjItMS40IDEuMnpNOTguMiAxMjBsLTcuMSAxLjRzLTEuMS40LTEuMy0uM2MtLjItLjcgMS0xIDEtMWw2LjgtMi43YTEgMSAwIDAxMS40Ljl2LjFjLjMuNy0uMSAxLjMtLjggMS42ek02Ni44IDEyN2w5LjEtMi4yczEuNi0uMiAxLjUtMWMtLjItLjYtMS44LS4zLTEuOC0uM2wtOS4zLjljLS44IDAtMS40LjgtMS4zIDEuNi4yLjggMSAxLjIgMS44IDF6TTY2LjMgMTIwbDkuMyAxLjVzMS41LjQgMS43LS4zYy4yLS43LTEuMy0xLTEuMy0xbC04LjktMi43Yy0uOC0uMi0xLjYuMi0xLjkgMS0uMi43LjMgMS40IDEuMSAxLjZ6Ii8+PC9nPjxjaXJjbGUgY3g9IjgzLjkiIGN5PSIxMjIuMSIgcj0iNi43Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzA1Ij48cGF0aCBkPSJNOTUuOCAxMTUuNWExNiAxNiAwIDAwMi43IDIuNWMuNCAwIDEuMy0yLjQgMi4xLTUgMi43LTEuOCAyLjItMS40IDQuNy0zLjUgMy4xIDYuNSA4LjYgMTkuNSA4LjYgMTkuNWwtMS45IDEwdi05cy03LjctMTctOC43LTE3Yy0xIDAtMi45IDExLTMuOSAxMS0uNSAwLTcuMy03LjItNy4zLTcuMnpNNTUuOSAxMTAuNnMtMy42IDMuNC00IDMuNGMtMS4xIDAtNC40LTEyLTUuNS0xMnMtMTIuMSAyMy0xMi4xIDIzbDIuMiAxMHYtOXM4LjgtMTcgOS45LTE3IDMuMyAxMSA0LjQgMTFjLjUgMCA4LjMtNy4xIDguMy03LjFsLTMuMi0yLjN6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik01NS45IDExMC42cy0zLjYgMy40LTQgMy40Yy0xLjEgMC00LjQtMTItNS41LTEycy0xMi4xIDIzLTEyLjEgMjNsMi4yIDEwdi05czguOC0xNyA5LjktMTcgMy4zIDExIDQuNCAxMWMuNSAwIDguMy03LjEgOC4zLTcuMWwtMy4yLTIuM3pNOTUuOCAxMTUuNWExNiAxNiAwIDAwMi43IDIuNWMuNCAwIDEuMy0yLjMgMi4xLTUgMi42LTEuNyAyLjMtMS41IDQuNy0zLjUgMy4xIDYuNSA4LjYgMTkuNSA4LjYgMTkuNWwtMS45IDEwdi05cy03LjctMTctOC43LTE3Yy0xIDAtMi45IDExLTMuOSAxMS0uNSAwLTcuMy03LjItNy4zLTcuMnoiLz48L2c+PHBhdGggZD0iTTcwIDEwNy4xcy05IDEyLjMtMTAgMTIuMy00LTEzLjQtNS0xMy40LTExIDI1LjgtMTEgMjUuOGwyIDExLjJ2LTEwLjFzOC0xOS4xIDktMTkuMSAzIDEyLjMgNCAxMi4zIDE1LTE2LjggMTUtMTYuOCAwLTMuMy00LTIuMnoiLz48cGF0aCBkPSJNNjAgMTIyLjRjLTEgMC00LTEyLjQtNS0xMi40cy0xMCAyMS44LTEwIDIxLjhsMSAxMS4ydi0xMC4xczgtMTkuMSA5LTE5LjEgMyAxMi4zIDQgMTIuMyAxNS0xNi44IDE1LTE2LjhjMC0uOS0uNS0xLjgtMS4zLTIuMi0uNi0uMy0xMS43IDE1LjMtMTIuNyAxNS4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNOTYgMTA3LjJzOSAxMi4zIDEwIDEyLjMgNC0xMy41IDUtMTMuNSAxMSAyNS44IDExIDI1LjhsLTIgMTEuMnYtMTAuMXMtOC0xOS4xLTktMTkuMS0zIDEyLjMtNCAxMi4zLTE1LTE2LjgtMTUtMTYuOCAwLTMuMiA0LTIuMXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMDYiPjxwYXRoIGQ9Ik02MSAxMTQuN2E2My4zIDYzLjMgMCAwMDI2LjYgMTZjLTcgMi41LTggNi41LTkuNiAxMi4zIDAgMCAxNS40LTMuMyAxNy03LjcgMCAwIDYgNi44IDE4IDUuOC0yLjItNS44LTktMTIuMi0xOC0xMy41LTIuNyAwLTQuMi02LjggMy0xMi42LTIyIDguNy0zNy0uMy0zNy0uM3oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik04Ny42IDEzMC43Yy02LjYgMi4xLTguMyA2LjctOS42IDEyLjMgMCAwIDE1LjQtMy4zIDE3LTcuNyAwIDAgNiA2LjggMTggNS44LTIuMi01LjgtOS0xMi4yLTE4LTEzLjUgMCAuNC0uNiAxLS42IDIuMi0xLjYtLjMtNC4zLjEtNi44IDF6Ii8+PHBhdGggZD0iTTkxIDEyOC41czE0IDQuOCAyMiAxMi42Yy0yLjItNS44LTktMTIuMi0xOC0xMy41LTIuNyAwLTQuMi02LjggMy0xMi42YTUyIDUyIDAgMDEtOC41IDIuNmMtMi41IDggMS41IDEwLjkgMS41IDEwLjl6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wNyI+PHBhdGggZD0iTTg1LjIgMTIwLjVjLS42IDUuMyAwIDEwLjYgMS44IDE1LjUgMyA4IDIgNiAyIDYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNmMjkwNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNODggMTM4cy02LjQtMTkuMSAxMi44LTE5LjZTMTI5IDk5IDEyOSA5OWEzNC40IDM0LjQgMCAwMS0xMCAyOWMtNyA4LTIzLTQtMzEgMTB6TTg0LjcgMTMwLjRzLTMuMy04LjgtMTcuOS0xMC0yOS4yIDEuMi0zMi41LTE0LjRjLTEgOC4yIDEuNCAxNi41IDYuOCAyMi44IDkgMTAuOCAzMS40IDMuNiAzMS40IDMuNnM5LTMuNiAxNC42IDMuNmwtMi40LTUuNnoiLz48ZyBvcGFjaXR5PSIuMjUiIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik04OCAxMzhjLTEtMTcgMzYtOCA0MS0zOWEzNC40IDM0LjQgMCAwMS0xMCAyOWMtNyA4LTIzLTQtMzEgMTB6TTM0LjIgMTA2UzMzIDEyMCA0MSAxMjguOGM5IDEwLjIgMzEuNCAzLjYgMzEuNCAzLjYgMS40LTIuNCAxNS42LS4zIDE0LjYgMy42IDAtMTMuNy00OC0zLjktNTIuOC0zMHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzA4Ij48cGF0aCBmaWxsPSIjZmQ5NzI3IiBkPSJNMTAxLjYyIDEyNy44Yy42My02LjktLjc1LTguODgtLjc1LTguODhzLTEuNjItMTAuMjQtNi40NC0xMi44M2MtMy4xMy0xLjc4LTUuNjctMS44My03LjkzLTEuMTEtMi4xMy4wMi00LjE4LjY3LTYuMDIgMS44Ny0uMTEuMDgtLjMzLjE0LS40NS4yMmEzNC4xIDM0LjEgMCAwMS0xMy4xOC0yLjk3IDE1LjYgMTUuNiAwIDAwLTkuOTUtMS4xNmMtNC43LjE3LTEwLjA0IDIuNzctMTEuMTMgMTIuODQtMS44NCAxNi41MyA2LjU1IDI0LjEzIDYuNTUgMjQuMTMgMy43NSA0LjAyIDEwLjY2IDYuODggMTYuMjIgNS4zMyAyLjQzLjAzIDQuNzMtLjg4IDYuNjItMi4zNyAwIDAgNC4xMy02LjA3IDEwLjAyLTcuNzZsLjMxLS4wNGMyLjcxLjE4IDUuNDguMDYgOC4xMS0uNDggNC41MS0uMjEgNy41Mi0xLjcgOC4wMi02Ljh6Ii8+PHBhdGggZD0iTTY5LjQzIDE0My42N2E5LjY2IDkuNjYgMCAwMS0zLjggMS45N2MuOTItLjA0IDEuODUtLjE4IDIuNzEtLjQzIDIuNDQuMDIgNC43My0uODkgNi42Mi0yLjM4IDAgMCA0LjA0LTYuMDggMTAuMDItNy43NS0uOTIuMDMtMS44Ni4xNy0yLjgxLjQtNy4zNC4xMi0xMi43NCA4LjItMTIuNzQgOC4yem0zMi4xOS0xNS44OGMuNjMtNi45LS43NS04Ljg3LS43NS04Ljg3cy0xLjYyLTEwLjI1LTYuNDQtMTIuODRjLTMuMTQtMS43Ny01LjY3LTEuODItNy45My0xLjEtLjkyLjAzLTEuODYuMTctMi43Mi40MiAxLjgxLjEyIDMuNTUuNjQgNS4xMiAxLjUyIDQuODIgMi42IDYuNDQgMTIuODQgNi40NCAxMi44NHMxLjM3IDEuOTcuNzUgOC44N2MtLjQgMy45OS0yLjMzIDUuNjgtNS4zMiA2LjQ2LjkyLS4wMyAxLjg2LS4xNyAyLjgyLS40IDQuNTItLjMyIDcuNTMtMS44MSA4LjAzLTYuOXptLTM0Ljg3LTIzLjdhMTUuNiAxNS42IDAgMDAtOS45NS0xLjE3Yy0uOTIuMDQtMS44Ni4xNy0yLjgyLjQgMi40NS0uMDYgNSAuNSA3LjE0IDEuNTkgMy4wNSAxLjY2IDEyLjMgMy45MiAxNiAyLjU1IDEuMS4xIDIuMjUtLjEgMy4yNi0uNjMtLjEyLjA4LS4zMy4xNC0uNDUuMjJhMzQuMSAzNC4xIDAgMDEtMTMuMTgtMi45NnoiIG9wYWNpdHk9Ii44Ii8+PGNpcmNsZSBmaWxsPSIjMzMyMjFmIiB0cmFuc2Zvcm09InJvdGF0ZSgxMC4xMykiIHI9IjUuNyIgY3k9IjEwNS4xMiIgY3g9IjEwMC42MyIvPjxwYXRoIGZpbGw9IiM1NDM5MzMiIGQ9Ik0xMTMuMDIgMTE0LjA4bC0yOC4xOCAzLjY2YTUuNyA1LjcgMCAwMTEuMDggNC40NSA1LjcgNS43IDAgMDEtLjQ2IDEuNGwyOC4zNC0zLjY4Yy40MS0uMDMuNy0uNDguNjctLjlsLS41Ni00LjI2Yy0uMDMtLjQtLjQ4LS43LS45LS42N3oiLz48cGF0aCBkPSJNNjguNDEgMTE1LjI1bDIuNTkgMTUuMS0zLjU2LjU4LS4zLTEuNzhjLS45My4xMy0xLjkyLS41NS0yLjA2LTEuNDlsLjAyLS4xYy0uMy0xLjc4LTEuNTQtNy45LTEuNTQtNy45LjEyLS42OC43NC0xLjI4IDEuMzgtMS40N2wtLjE4LTIuMzd6Ii8+PHBhdGggZmlsbD0iI2ZkOTcyNyIgZD0iTTExOC45NyAxMTAuODhsNi44Ny0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wM2E0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOTFhNC45OCA0Ljk4IDAgMDEtNS41NC00LjI0bC0uMTItMS4wNGE0Ljk4IDQuOTggMCAwMTQuMjQtNS41NHoiLz48cGF0aCBvcGFjaXR5PSIuMiIgZD0iTTExOC45NyAxMTAuODhsNi44Ny0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wM2E0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOTFhNC45OCA0Ljk4IDAgMDEtNS41NC00LjI0bC0uMTItMS4wNGE0Ljk4IDQuOTggMCAwMTQuMjQtNS41NHoiLz48cGF0aCBmaWxsPSIjNTQzOTMzIiBkPSJNMTE2LjYyIDExMC45N3MtLjU5LTEuODMuOTYtMS45NmMxLjU1LS4xMyAxLjMzIDEuNjYgMS4zMyAxLjY2em0zLjU5IDEwLjZzLjQ5IDEuODEtLjk2IDEuOTZjLTEuNDUuMTUtMS4zMy0xLjY2LTEuMzMtMS42NnptNC4xMy0uMzhzLjQ5IDEuODEtLjk2IDEuOTZjLTEuNDUuMTUtMS4zMy0xLjY2LTEuMzMtMS42NnptMy41NC0uNDlzLjUgMS44Mi0uOTYgMS45NmMtMS40NS4xNS0xLjMzLTEuNjYtMS4zMy0xLjY2em0tNy4xMS0xMC4ycy0uNTktMS44NC45Ni0xLjk3YzEuNTUtLjEzIDEuMzMgMS42NiAxLjMzIDEuNjZ6bTQuMTMtLjM5cy0uNTktMS44My45Ni0xLjk2YzEuNTUtLjEzIDEuMzMgMS42NiAxLjMzIDEuNjZ6Ii8+PHBhdGggZmlsbD0iI2ZkOTcyNyIgZD0iTTExOC4wOSAxMTAuNzJsNi44Ni0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wNGE0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOWE0Ljk4IDQuOTggMCAwMS01LjU0LTQuMjRsLS4xMi0xLjA0YTUuMDcgNS4wNyAwIDAxNC4yNS01LjU0eiIvPjxwYXRoIGQ9Ik0xMTcuNTEgMTEzLjM2bDguNTMtMS4xMWMuMzEtLjA1LjU3LjIuNjIuNTEuMDUuMzItLjIuNTgtLjUyLjYybC04LjUzIDEuMTJjLS4zLjA0LS41Ny0uMi0uNjEtLjUyLS4wNS0uMzEuMi0uNTcuNTEtLjYyem0xLjA3IDQuMjZsOC41My0xLjEyYy4zMS0uMDQuNTcuMi42Mi41Mi4wNC4zMS0uMi41Ny0uNTIuNjJsLTguNTMgMS4xMWMtLjMxLjA1LS41Ny0uMi0uNjItLjUxLS4wNi0uMjIuMi0uNTguNTItLjYyeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wOSI+PHBhdGggZD0iTTczLjcgMTI0LjhsLS4xLTEgLjEtNi4zLTMuOC0uNS41IDRjLTMtLjItNS45LjUtOC41IDItMyAyLTUgNS0zIDhzNiAzIDExIDBhNy4yIDcuMiAwIDAwMy44LTYuMnoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik03Ni44IDEyMnMwLTIuMS0zLjItMi41djQuM2wuMSAxYy0uMSAyLjYtMS41IDUtMy44IDYuMi01IDMtOSAzLTExIDBzMC02IDMtOGMyLjYtMS41IDUuNS0yLjIgOC41LTJsLS4yLTEuM2MtMS44LjMtMy42LjgtNS4zIDEuMy0xMiA0LTEzIDE2LTEyIDE3czMgMiAxMCAyYzQuMi0uMSA4LTIuMyAxMC02bDEgNXMyIDIgMyAwLS4xLTE3LS4xLTE3eiIvPjxwYXRoIGQ9Ik04Ny4yIDEyNC44bC4xLTEtLjEtNi4zIDMuOC0uNS0uNSA0YzMtLjIgNS45LjUgOC41IDIgMyAyIDUgNSAzIDhzLTYgMy0xMSAwYTcgNyAwIDAxLTMuOC02LjJ6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNODQgMTIyczAtMi4xIDMuMi0yLjV2NC4zbC0uMSAxYy4xIDIuNiAxLjUgNSAzLjggNi4yIDUgMyA5IDMgMTEgMHMwLTYtMy04YTE0LjkgMTQuOSAwIDAwLTguNS0ybC4yLTEuM2MxLjguMyAzLjYuOCA1LjMgMS4zIDEyIDQgMTMgMTYgMTIgMTdzLTMgMi0xMCAyYy00LjItLjEtOC0yLjMtMTAtNmwtMSA1cy0yIDItMyAwIC4xLTE3IC4xLTE3eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMCI+PGVsbGlwc2UgY3g9IjgwIiBjeT0iMTMxLjUiIHJ4PSIzMiIgcnk9IjguNyIgb3BhY2l0eT0iLjMiLz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxMzAuMyIgcng9IjE3IiByeT0iNC4xIiBvcGFjaXR5PSIuNiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMSI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNjQuNyAxMTUuOXMtMi44IDEwLjctMTEuMiAxMi45Yy01IDEuMy0xMC4zLjUtMTQuNi0yLjIgMCAwLTMuOS0xLjEtMS43IDIuOHM4LjQgMTEuOCAyNS44IDUuNiAxOC0xNi45IDE4LTE2LjktMTEuMiAxLjItMTYuMy0yLjJ6Ii8+PHBhdGggZD0iTTU4IDExMnMtNi4yIDEzLjUtMTUuMiAzLjljMCAwLTUuNi01LjYtMy40IDEuMXMxMS4xIDE4LjcgMzAuMy45YzAgLjEtNy44LTItMTEuNy01Ljl6TTk0LjggMTE1LjlzMi44IDEwLjcgMTEuMiAxMi45YzUgMS4zIDEwLjMuNSAxNC42LTIuMiAwIDAgMy45LTEuMSAxLjcgMi44cy04LjQgMTEuOC0yNS45IDUuNi0xOC0xNi45LTE4LTE2LjkgMTEuMyAxLjIgMTYuNC0yLjJ6Ii8+PHBhdGggZD0iTTEwMS41IDExMnM2LjIgMTMuNSAxNS4yIDMuOWMwIDAgNS42LTUuNiAzLjQgMS4xcy0xMS4yIDE4LjctMzAuMy45Yy0uMS4xIDcuOC0yIDExLjctNS45eiIvPjwvZz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjUgNDYgMTIxLjYpIiBjeD0iNDUuOSIgY3k9IjEyMS42IiByeD0iMS40IiByeT0iMS44Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTIuNSA1MSAxMjIuMykiIGN4PSI1MSIgY3k9IjEyMi4zIiByeD0iMS44IiByeT0iMS40Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTI3LjUgNTUuNiAxMjEpIiBjeD0iNTUuNiIgY3k9IjEyMS4xIiByeD0iMS40IiByeT0iMS4xIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQ3LjggNTguNCAxMTguNikiIGN4PSI1OC40IiBjeT0iMTE4LjYiIHJ4PSIxLjQiIHJ5PSIxLjEiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMjUgMTEzLjUgMTIxLjYpIiBjeD0iMTEzLjUiIGN5PSIxMjEuNiIgcng9IjEuOCIgcnk9IjEuNCIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC04Ny41IDEwOC41IDEyMi4zKSIgY3g9IjEwOC41IiBjeT0iMTIyLjMiIHJ4PSIxLjQiIHJ5PSIxLjgiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjIuNSAxMDMuOSAxMjEuMSkiIGN4PSIxMDMuOSIgY3k9IjEyMS4xIiByeD0iMS4xIiByeT0iMS40Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQyLjIgMTAxIDExOC42KSIgY3g9IjEwMS4xIiBjeT0iMTE4LjYiIHJ4PSIxLjEiIHJ5PSIxLjQiLz48cGF0aCBkPSJNNTggMTEycy02LjIgMTMuNS0xNS4yIDMuOWMwIDAtNS42LTUuNi0zLjQgMS4xczExLjEgMTguNyAzMC4zLjljMCAuMS03LjgtMi0xMS43LTUuOXoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4zIi8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0xMDEuNSAxMTJzNi4yIDEzLjUgMTUuMiAzLjljMCAwIDUuNi01LjYgMy40IDEuMXMtMTEuMiAxOC43LTMwLjMuOWMtLjEuMSA3LjgtMiAxMS43LTUuOXpNNjQuNyAxMTUuOXMtMi44IDEwLjctMTEuMiAxMi45Yy01IDEuMy0xMC4zLjUtMTQuNi0yLjIgMCAwLTMuOS0xLjEtMS43IDIuOHM4LjQgMTEuOCAyNS44IDUuNiAxOC0xNi45IDE4LTE2LjktMTEuMiAxLjItMTYuMy0yLjJ6Ii8+PHBhdGggZD0iTTk0LjggMTE1LjlzMi44IDEwLjcgMTEuMiAxMi45YzUgMS4zIDEwLjMuNSAxNC42LTIuMiAwIDAgMy45LTEuMSAxLjcgMi44cy04LjQgMTEuOC0yNS45IDUuNi0xOC0xNi45LTE4LTE2LjkgMTEuMyAxLjIgMTYuNC0yLjJ6Ii8+PC9nPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTYyLjUgMTE0LjhzLTEuNyAxNC42LTcuMyAxNC42YzAgMC0yLjIgMC0zLjktMi44cy0zLjQtMi4yLTIuOC42UzUwLjcgMTM5LjYgNjIgMTM5czE1LjctMTEuMiAxNS43LTE3LjR2LTMuMmMtLjEgMC05LjYuMy0xNS4yLTMuNnpNOTcgMTE0LjhzMS43IDE0LjYgNy4zIDE0LjZjMCAwIDIuMiAwIDMuOS0yLjhzMy40LTIuMiAyLjguNi0yLjIgMTIuNC0xMy41IDExLjgtMTUuNy0xMS4yLTE1LjctMTcuNHYtMy4yczkuNi4zIDE1LjItMy42eiIvPjwvZz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMzcuMSA2NC4xIDEyOC4zKSIgY3g9IjY0LjEiIGN5PSIxMjguMyIgcng9IjIuMiIgcnk9IjEuNyIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC05LjUgNTguNSAxMzEuMSkiIGN4PSI1OC41IiBjeT0iMTMxLjEiIHJ4PSIyLjIiIHJ5PSIxLjciLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjIuMSA2OCAxMjMuOCkiIGN4PSI2OCIgY3k9IjEyMy44IiByeD0iMS44IiByeT0iMS4zIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTgyLjQgNjkgMTE5LjMpIiBjeD0iNjkuMSIgY3k9IjExOS4zIiByeD0iMS44IiByeT0iMS4zIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTUyLjkgOTUuMyAxMjguMykiIGN4PSI5NS4zIiBjeT0iMTI4LjMiIHJ4PSIxLjciIHJ5PSIyLjIiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtODAuNSAxMDEgMTMxLjEpIiBjeD0iMTAwLjkiIGN5PSIxMzEuMSIgcng9IjEuNyIgcnk9IjIuMiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0yNy45IDkxLjUgMTIzLjgpIiBjeD0iOTEuNSIgY3k9IjEyMy44IiByeD0iMS4zIiByeT0iMS44Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTcuNiA5MC40IDExOS4zKSIgY3g9IjkwLjQiIGN5PSIxMTkuMyIgcng9IjEuMyIgcnk9IjEuOCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMiI+PGcgZmlsbD0iI2VkZWRlZCI+PHBhdGggZD0iTTYxIDExNS4ybDMuNiA1LjFzNi4yIDQgMTYuOCAzLjZjMTMuMS0uNyAxNy41LTMuNiAxNy41LTMuNmwyLjktNy4zcy0xNiAxMC45LTQwLjggMi4yeiIvPjxwYXRoIGQ9Ik02Ny45IDEzMWE2IDYgMCAwMDIgMS4yYzYuMSAyLjYgMjEgMi41IDI0LjItMS4ybDIuMi05LjZhNjAgNjAgMCAwMS0yOS45IDBsMS41IDkuNnoiLz48cGF0aCBkPSJNNzAuMyAxMzMuN2MzLjEgMy4xIDcuMyA0LjggMTEuNyA0LjggNy4zIDAgMTAuMi00LjggMTAuMi00Ljh2LTEuMXMtMTAuOSAzLjgtMjEuOS0uNXYxLjZ6Ii8+PC9nPjxwYXRoIGQ9Ik04MS40IDEyMy45bDEuNi0uMWEzNy42IDM3LjYgMCAwMDE1LjktMy41bDIuOS03LjNzLTcuMSA0LjktMTkuMiA1LjVjMi40IDEuMS0xLjIgNS40LTEuMiA1LjR6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNzAuMyAxMzMuN2MzLjEgMy4xIDcuMyA0LjggMTEuNyA0LjggNy4zIDAgMTAuMi00LjggMTAuMi00Ljh2LTEuMXMtMTAuOSAzLjgtMjEuOS0uNXYxLjZ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik03OC4xIDEyMy41Yy4zLjMtNi40IDMuOS0xMC45IDMuN2wuMyAxczkuNy0xIDEyLjctNWwtMi4xLjN6bTE2LjggNC44YzEuMi43LTEwLjMgNi43LTE2IDUuOWw0LS4xczktLjQgMTItNC41di0xLjN6bS0uNC02LjRzLTEzLjQgMTAuMy0yNS42IDkuOGwxLjYuNnMxMC45IDEuNiAyNS44LTEwLjRoLTEuOHoiLz48ZyBvcGFjaXR5PSIuMTUiPjxwYXRoIGQ9Ik04MSAxMzRjNS42LjEgMTEuMy0uOSAxMy4xLTNsMi4yLTkuNmE4NiA4NiAwIDAxLTE0LjMgMS44Yy45IDEuNS4xIDUuOC0xIDEwLjh6Ii8+PHBhdGggZD0iTTgyLjEgMTIzLjJjMTAuMiAwIDEzLjctMS41IDEzLjctMS41bC0uNiAxLjVzLTE2LjggMy42LTI4LjQtLjd2LTEuMXM1LjEgMS44IDE1LjMgMS44eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMTMiPjxwYXRoIGQ9Ik04OC44IDExNy45bC4yIDYuMWMzLjIgMS4yIDYuOCAxLjIgMTAgMGwzLjItMTEuOHMtNy43IDQuNi0xMy40IDUuN3oiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNOTEgMTI0LjZTODkuOSAxMzcgOTEgMTM5czQuNCAzIDQuNCAwIDEuNi0xNC40IDEuNi0xNC40bC0zIC4yYy0xIDAtMiAwLTMtLjJ6IiBmaWxsPSIjZjVmNWY1Ii8+PHBhdGggZD0iTTkxIDEzOWMxLjEgMiA0LjQgMyA0LjQgMHMxLjYtMTQuNCAxLjYtMTQuNGwtMyAuMnMwIDE1LjItMyAxNC4yeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNjkuNiAxMjMuM3MyLjYgNS4yIDUuMiA3LjFMNzggMTMzdjQuMmMwIC40LTkuOC0yLjgtOC40LTEzLjl6IiBmaWxsPSIjNmQ0NzE2Ii8+PHBhdGggZD0iTTY4LjkgMTIzLjNzNS4yLTEuMyA4LjQgMiAzLjIgNy44IDEuMyA3LjgtMS45LjYtOS43LTkuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDQuMiAxMDguNHM0LjUtNy44IDE4LjItLjdTNjUgMTI5LjggNzcuMyAxMzdjMCAwLTMuNSAzLjUtOC01LjctNC40LTktNC4zLTIzLjYtMjUuMS0yMi45eiIgZmlsbD0iIzk5NjcxZCIvPjxwYXRoIGQ9Ik03Ny4zIDEzN3MtNS44IDIuNi05LjgtMTAuNFM1OSAxMDUuOCA0OCAxMDYuNGMtMS42IDAtMyAuNi00LjIgMS42LTUuMyA0LjgtMS4yIDE4LjcgNC4yIDIzLjEgNi41IDUuMiAyMC44IDEwLjQgMjYuNyA4LjRzMi42LTIuNSAyLjYtMi41eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik03OC4yIDExOC4ybC0uOSA3LjFjLTEuOC0xLjMtMy40LTIuMi00LjgtMi4ybC42LTUuOWMxLjcuNSAzLjQuOCA1LjEgMXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik00NS41IDExMWgxMWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTExYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTQ0LjUgMTE0aDE0Yy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTRjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNDQuNSAxMTdoMTdjLjMgMCAuNS4yLjUuNXMtLjIuNS0uNS41aC0xN2MtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41ek00NS41IDEyMGgxN2MuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTE3Yy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTQ2LjUgMTIzaDE3Yy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTdjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNDguNSAxMjZoMTdjLjMgMCAuNS4yLjUuNXMtLjIuNS0uNS41aC0xN2MtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41ek01MC41IDEyOWgxNWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTE1Yy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTU0LjUgMTMyaDEzYy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTNjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNTkuNSAxMzVoOWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTljLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXoiLz48cGF0aCBkPSJNOTQuNyAxMjQuN2MxLjgtLjIgMi41LS4xIDQuMy0uN2wzLjItMTEuOC00LjMgMi40cy0uNyAxMC4yLTMuMiAxMHoiIG9wYWNpdHk9Ii4xIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE0Ij48cGF0aCBkPSJNOTcgMTIyLjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNOTcuNiAxMjIuNXMtNS40LTEuNC04LjkgMi0zLjQgOC4yLTEuNCA4LjIgMi4yLjcgMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjMuNSAxMDYuOHMtNC44LTguMi0xOS4xLS43Yy0xNC4zIDcuNS0yLjcgMjMuMi0xNS43IDMwLjcgMCAwIDMuNCA0LjMgOC40LTUuOSA0LjctOS4zIDQuNi0yNC43IDI2LjQtMjQuMXoiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNODguOCAxMzYuOHM2LjEgMi43IDEwLjItMTAuOSA4LjktMjEuOCAyMC40LTIxLjFjMS42IDAgMy4yLjYgNC40IDEuNyA1LjYgNSAxLjMgMTkuNi00LjQgMjQuMi02LjggNS40LTIxLjggMTAuOS0yNy45IDguOXMtMi43LTIuOC0yLjctMi44eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik04Ny44IDExNy4ybDEgNy40YzEuOS0xLjQgMy42LTIuMyA1LTIuM2wtLjYtNi4yYy0xLjguNS0zLjYuOC01LjQgMS4xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTEyMi4yIDExMC42aC0xMS42Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTEyMy4zIDExMy44aC0xNC43Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNC43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMy4zIDExNi45aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMi4yIDEyMC4xaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMi41LS41LjV6TTEyMS4xIDEyMy4yaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTExOS4xIDEyNi40aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTExNyAxMjkuNWgtMTUuOGMtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41SDExN2MuMyAwIC41LjIuNS41di4xYzAgLjItLjMuNC0uNS40ek0xMTIuOCAxMzIuN0g5OS4xYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTEwNy41IDEzNS44SDk4Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWg5LjVjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNXoiLz48cGF0aCBkPSJNNjMgMTIzLjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNNjAuMyAxMTNsLTIuMSAxMS4zYzEuOS0xLjQgMi43LS4zIDQuMS0uM2wyLjItOS4yYy0yLS40LTIuOS0xLjQtNC4yLTEuOHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik02My42IDEyMy41cy01LjUtMS40LTguOSAyYy0zLjQgMy40LTMuNCA4LjItMS40IDguMnMyLjIuNyAxMC4zLTEwLjJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg5LjUgMTA3LjhzLTQuOC04LjItMTkuMS0uN2MtMTQuMyA3LjUtMi43IDIzLjItMTUuNyAzMC43IDAgMCAzLjYgNCA4LjQtNiA0LjYtOS4zIDQuNi0yNC42IDI2LjQtMjR6IiBmaWxsPSIjOTk2NzFkIi8+PHBhdGggZD0iTTU0LjggMTM3LjhzNi4xIDIuNyAxMC4yLTEwLjkgOC45LTIxLjggMjAuNC0yMS4xYzEuNiAwIDMuMi42IDQuNCAxLjcgNS42IDUgMS4zIDE5LjYtNC40IDI0LjItNi44IDUuNC0yMS44IDEwLjktMjggOC45cy0yLjYtMi44LTIuNi0yLjh6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTg4LjIgMTExLjZINzYuNmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTEuNmMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41ek04OS4zIDExNC44SDc0LjVjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDE0LjdjLjMgMCAuNS4yLjUuNXYuMWMuMS4zLS4yLjUtLjQuNXpNODkuMyAxMTcuOUg3MS40Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTg4LjIgMTIxLjFINzAuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjItLjIuNS0uNS41ek04Ny4xIDEyNC4ySDY5LjNjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDE3LjljLjMgMCAuNS4yLjUuNXYuMWMtLjEuMy0uMy41LS42LjV6TTg1LjEgMTI3LjRINjcuMmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjItLjMuNS0uNS41ek04MyAxMzAuNUg2Ny4yYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjVIODNjLjMgMCAuNS4yLjUuNXYuMWMwIC4yLS4zLjQtLjUuNHpNNzguOCAxMzMuN0g2NS4xYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTczLjUgMTM2LjhINjRjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xNSI+PHBhdGggZD0iTTEyOS4xIDExNC4xYzEuMi0xLjgtLjktMi44LTMuMi0yLjMgMCAwLTE0LjYgMi42LTMwIDQtMTMuMiA1LjctMjcgNi0zNS43LTEuNi0xMi42LTMtMjIuNC03LjUtMjUuNy01LjggMCAwLTYuNi45LTUuMyA1LjMtLjEgMS4zLjIgMi41LjggMy43IDMuNiA1LjcgMzkuOCAxMy44IDcyLjQgOCAxOC4zLTMuMiAyNS4yLTYuOCAyNi43LTkuMi4zLS42LjMtMS40IDAtMi4xek01NCAxMjMuNHptNDUuOC4zbDIuNS0uNGEyNjcuMSAyNjcuMSAwIDAwLTIuNS40eiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjYzLjgiIGN5PSIxMzQuNyIgcj0iNi4xIiBmaWxsPSIjNDkwYjM3Ii8+PGNpcmNsZSBjeD0iNjEuMSIgY3k9IjEzNC41IiByPSI2LjEiLz48Y2lyY2xlIGN4PSIxMTEuMyIgY3k9IjEzMy4xIiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI2MS4xIiBjeT0iMTM0LjUiIHI9IjYuMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNNTYuNSAxMzJsNC4yLjRjLjcuMSAxLjIuNyAxLjIgMS40bC0uMSAxLjVjLS4xLjctLjcgMS4yLTEuNCAxLjJsLTQuMi0uNGMtLjctLjEtMS4yLS43LTEuMi0xLjRsLjEtMS41Yy4xLS43LjctMS4yIDEuNC0xLjJ6IiBmaWxsPSIjMDEwMTAxIi8+PGNpcmNsZSBjeD0iMTA4LjciIGN5PSIxMzMuNyIgcj0iNi4xIi8+PGNpcmNsZSBjeD0iMTA4LjciIGN5PSIxMzMuNyIgcj0iNi4xIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNCIvPjxwYXRoIGQ9Ik0xMDMuNSAxMzIuN2w0LjEtLjljLjctLjIgMS40LjMgMS41IDFsLjMgMS41Yy4yLjctLjMgMS40LTEgMS41bC00LjEuOWMtLjcuMi0xLjQtLjMtMS41LTFsLS4zLTEuNWMtLjItLjYuMy0xLjMgMS0xLjV6IiBmaWxsPSIjMDEwMTAxIi8+PGNpcmNsZSBjeD0iOTkuMyIgY3k9IjEzNS43IiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI5Ni42IiBjeT0iMTM2LjMiIHI9IjYuMSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9Ijk2LjYiIGN5PSIxMzYuMyIgcj0iMy40Ii8+PHBhdGggZD0iTTEyMC4zIDEyNS41Yy0xNC4zIDQuNS01OS42IDkuOC03Ny44LS45LTEuOC0xLTQuNC0yLjktNC40LTIuOXMzMi45IDEwLjggNzIuOSAxLjhjMTEuMy0yLjkgMTgtNS41IDE4LjQtOS4yIDMuMSAyLTIuNSA5LjEtOS4xIDExLjJ6IiBmaWxsPSIjNDkwYjM3Ii8+PHBhdGggZD0iTTI5LjIgMTEzLjZjLS4xIDEuMy4yIDIuNS44IDMuNyAzLjYgNS43IDM5LjggMTMuOCA3Mi40IDggMTguMy0zLjIgMjUuMi02LjggMjYuNy05LjIuNS0uOCAwLTIuNi0uMS0xLjktNiA0LjctMjMuNCAxMC00My4zIDEwLjctMjYuMSAxLTU0LjQtMy43LTU2LjUtMTEuM3oiIG9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBjeD0iNTEuNyIgY3k9IjEzMy43IiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEzMy40IiByPSI2LjEiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEzMy40IiByPSIzLjQiLz48cGF0aCBkPSJNMzQuNSAxMDguNHMtOC4xIDEuMi00LjUgNi45YzMuNiA1LjcgMzkuOCAxMy44IDcyLjQgOCAxOC4zLTMuMiAyNS4yLTYuOCAyNi43LTkuMiAxLjItMS44LS44LTIuOC0zLjItMi4zIDAgMC0xNC42IDIuNi0zMCA0YTQyLjkgNDIuOSAwIDAxLTM1LjYtMS42Yy0xMi42LTMtMjIuNS03LjUtMjUuOC01Ljh6Ii8+PGVsbGlwc2UgY3g9Ijc5IiBjeT0iMTIxIiByeD0iMTgiIHJ5PSIyIiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMTUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMTYiPjxnIGZpbGw9IiNhMzRiMWEiPjxwYXRoIGQ9Ik03OSAxMTkuMmwtLjQgMTEuMnMxLjEgMi42LTkuNyAyLjZINDYuMnMtNS40LTUuMi0yLjItNy44IDExLjktMy40IDExLjktMy40bC0yLjYtNi42IDI1LjcgNHpNODEuNiAxMTkuMkw4MCAxMzAuNHMtMSAyLjYgOS44IDIuNmgyMi43czUuNC01LjIgMi4yLTcuOC0xNC45LTMuNC0xNC45LTMuNGwuNi01LjYtMTguOCAzeiIvPjwvZz48cGF0aCBkPSJNNTkuOCAxMTguNGwtOC4zLS45Yy0uMyAwLS41LS4zLS40LS42bC4xLS41YzAtLjMuMy0uNS42LS40bDguMy45Yy4zIDAgLjUuMy40LjZsLS4xLjVjLS4xLjItLjMuNC0uNi40ek02MC42IDEyMC45bC04LjMtLjljLS4zIDAtLjUtLjMtLjQtLjZsLjEtLjVjMC0uMy4zLS41LjYtLjRsOC4zLjljLjMgMCAuNS4zLjQuNmwtLjEuNWMtLjEuMy0uNC41LS42LjR6TTk0LjkgMTE3LjNsOC4zLjVjLjMgMCAuNS4zLjUuNXYuNWMwIC4zLS4zLjUtLjUuNWwtOC4zLS41Yy0uMyAwLS41LS4zLS41LS41di0uNWMwLS4zLjMtLjYuNS0uNXpNOTMuOSAxMTkuNmw4LjMuNWMuMyAwIC41LjMuNS41di41YzAgLjMtLjMuNS0uNS41bC04LjMtLjVjLS4zIDAtLjUtLjMtLjUtLjV2LS41YzAtLjMuMi0uNS41LS41eiIvPjxnIGZpbGw9IiM0OTBiMzciPjxjaXJjbGUgY3g9IjY4LjUiIGN5PSIxMzUuOSIgcj0iMy45Ii8+PGNpcmNsZSBjeD0iNTIuNSIgY3k9IjEzNS45IiByPSIzLjkiLz48Y2lyY2xlIGN4PSI5MC4yIiBjeT0iMTM1LjkiIHI9IjMuOSIvPjxjaXJjbGUgY3g9IjEwNi4yIiBjeT0iMTM1LjkiIHI9IjMuOSIvPjwvZz48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSI3MC4yIiBjeT0iMTM1LjciIHI9IjMuOSIvPjxjaXJjbGUgY3g9IjU0LjIiIGN5PSIxMzUuNyIgcj0iMy45Ii8+PGNpcmNsZSBjeD0iODguNSIgY3k9IjEzNS43IiByPSIzLjkiLz48Y2lyY2xlIGN4PSIxMDQuNSIgY3k9IjEzNS43IiByPSIzLjkiLz48L2c+PGNpcmNsZSBjeD0iNzAuMiIgY3k9IjEzNS43IiByPSIyLjIiLz48Y2lyY2xlIGN4PSI1NC4yIiBjeT0iMTM1LjciIHI9IjIuMiIvPjxjaXJjbGUgY3g9Ijg4LjUiIGN5PSIxMzUuNyIgcj0iMi4yIi8+PGNpcmNsZSBjeD0iMTA0LjUiIGN5PSIxMzUuNyIgcj0iMi4yIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE3Ij48cGF0aCBkPSJNNDUgMTM3aDc1czYgMCA3LTIuMiAxIDMuMy03IDQuNS02NyAwLTc1IDAtOS0yLjMgMC0yLjN6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTM0IDEzOC4zaDc1czYgMCA3LTIuMiAxIDMuMy03IDQuNS02NyAwLTc1IDBsLTIuMi0uMS0xLjUtMiAzLjctLjJ6IiBmaWxsPSIjOTE5MTkxIi8+PHBhdGggZD0iTTc5LjkgMTE3LjhsLTEwLjYgMTcuNlM2OC4yIDEzOCA3OSAxMzhoMjIuN3M1LjQtNS4yIDIuMi03LjgtMTEuOS0zLjQtMTEuOS0zLjRsOC42LTEzLjhzLTcuNiA1LjItMjAuNyA0Ljh6IiBmaWxsPSIjNDkyMzBmIi8+PHBhdGggZD0iTTYzLjYgMTE1LjJMNTIgMTM1LjRzLTEgMi42IDkuOCAyLjZoMjIuN3M1LjQtNS4yIDIuMi03LjgtMTEuOS0zLjQtMTEuOS0zLjRsNy42LTguNmMtLjEgMC03LjcuOC0xOC44LTN6IiBmaWxsPSIjYTM0YjFhIi8+PHBhdGggZD0iTTc0LjQgMTE5LjdsOC4xIDEuOWMuMy4xLjQuMy40LjZsLS4xLjVjLS4xLjMtLjMuNC0uNi40bC04LjEtMS45Yy0uMy0uMS0uNC0uMy0uNC0uNmwuMS0uNWMuMS0uMy40LS40LjYtLjR6TTcyLjkgMTIyLjhsOC4xIDEuOWMuMy4xLjQuMy40LjZsLS4xLjVjLS4xLjMtLjMuNC0uNi40bC04LjEtMS45Yy0uMy0uMS0uNC0uMy0uNC0uNmwuMS0uNWMwLS4zLjMtLjQuNi0uNHpNOTEuNCAxMTguN2w4LjEgMS45Yy4zLjEuNC4zLjQuNmwtLjEuNWMtLjEuMy0uMy40LS42LjRsLTguMS0xLjljLS4zLS4xLS40LS4zLS40LS42bC4xLS41Yy4xLS4zLjMtLjQuNi0uNHpNODkuOSAxMjEuOGw4LjEgMS45Yy4zLjEuNC4zLjQuNmwtLjEuNWMtLjEuMy0uMy40LS42LjRsLTguMS0xLjljLS4zLS4xLS40LS4zLS40LS42bC4xLS41YzAtLjMuMy0uNC42LS40eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xOCI+PHBhdGggZD0iTTY0LjUgMTIyLjVzMi43IDUuNSA1LjUgNy41YzEuMi44IDIuMyAxLjggMy40IDIuN3Y0LjRjMCAuNC0xMC4yLTMtOC45LTE0LjZ6IiBmaWxsPSIjNmQ0NzE2Ii8+PHBhdGggZD0iTTYzLjggMTIyLjVzNS41LTEuNCA4LjkgMiAzLjQgOC4yIDEuNCA4LjItMi4xLjctMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNy45IDEwNi44czQuOC04LjIgMTkuMS0uN2MxNC4zIDcuNSAyLjcgMjMuMiAxNS43IDMwLjcgMCAwLTMuNyAzLjY1LTguMzYtNS45My00LjU5LTkuNDItNC41NC0yNC42Ny0yNi40NC0yNC4wN3oiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNNzIuNyAxMzYuOHMtNi4xIDIuNy0xMC4yLTEwLjktOC45LTIxLjgtMjAuNS0yMS4xYy0xLjYgMC0zLjIuNi00LjQgMS43LTUuNSA1LTEuMyAxOS42IDQuNCAyNC4yIDYuOCA1LjQgMjEuOCAxMC45IDI4IDguOXMyLjctMi44IDIuNy0yLjh6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTczLjcgMTE3LjJsLTEgNy40Yy0xLjktMS40LTMuNi0yLjMtNS0yLjNsLjctNi4yYzEuNy41IDMuNC44IDUuMyAxLjF6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNMzkuMyAxMDkuNmgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVIMzkuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjV6TTM4LjIgMTEyLjdINTNjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUgzOC4yYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4yLjMtLjUuNS0uNXpNMzguMiAxMTUuOWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVIMzguMmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4zLS41LjUtLjV6TTM5LjMgMTE5aDE3LjljLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUgzOS4zYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4yLjItLjUuNS0uNXpNNDAuMyAxMjIuMmgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVINDAuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4zLS41LjUtLjV6TTQyLjQgMTI1LjNoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41SDQyLjRjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41ek00NC41IDEyOC41aDE1LjhjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUg0NC41Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNXpNNDguNyAxMzEuNmgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVINDguN2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjV6TTU0IDEzNC44aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41SDU0Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNXoiLz48Y2lyY2xlIGN4PSIxMDIuOCIgY3k9IjEyMy45IiByPSIxNS41IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExOC4zIDEyMy45YzAgOC41LTYuOSAxNS41LTE1LjUgMTUuNS01IC4xLTkuOC0yLjQtMTIuNi02LjUgMjMuMyA1LjYgMjMuMy0xOC43IDE5LjEtMjMgNS41IDIuMyA5LjEgNy45IDkgMTR6IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBkPSJNMTExLjIgMTIybC0xLjkgNi42Yy0uMS40LS40LjYtLjguNmwtNi44LjJjLS40IDAtLjctLjItLjgtLjZsLTIuMy02LjRjLS4xLS40IDAtLjguMy0xbDUuNC00LjJjLjMtLjIuNy0uMiAxIDBsNS42IDMuOWMuMi4yLjQuNS4zLjl6TTEwOC44IDEwOS42bC00LjIgMy4yYy0uMy4yLS43LjItMSAwbC01LjUtMy44YzMuNS0xLjEgNy4zLS45IDEwLjcuNnpNOTkuMiAxMzQuMWwxLjggNS4xYy0yLjIuMS05LTIuOC0xMC01LjIgMC0uMi4zLS4yLjYtLjJsNi45LS4yYy4zIDAgLjYuMi43LjV6TTkwLjkgMTEzLjlsMS45IDUuNGMuMS4zIDAgLjctLjMuOWwtNS4zIDQuMWMtLjEtMy44IDEuMi03LjUgMy43LTEwLjR6TTExMC44IDEzNy4ybDEuNC00LjdjLjEtLjMuNC0uNi44LS42bDMuMi0uMWMtMS40IDIuMi0zLjIgNC01LjQgNS40ek0xMTggMTIwLjdsLTEuNy0xLjFjLS4zLS4yLS40LS42LS4zLS45bC42LTEuOWMuNyAxLjIgMS4yIDIuNSAxLjQgMy45ek0xMDAuOCAxMjkuNDVhLjI1LjI1IDAgMDAtLjIzLjE2bC0xLjQgMy40YS4yNS4yNSAwIDEwLjQ2LjE5bDEuNC0zLjRhLjI1LjI1IDAgMDAtLjI0LS4zNXpNOTMuNTcgMTE5Ljg1YS4yNS4yNSAwIDAwLS4wNi40OGwzLjQgMS4zYS4yNS4yNSAwIDEwLjE4LS40NmwtMy40LTEuM2EuMjUuMjUgMCAwMC0uMTItLjAyek0xMTUuMyAxMTguNjVhLjI1LjI1IDAgMDAtLjExLjAzbC0zLjMgMS43YS4yNS4yNSAwIDEwLjIzLjQ0bDMuMy0xLjdhLjI1LjI1IDAgMDAtLjEyLS40N3oiLz48cGF0aCBkPSJNMTAzLjkgMTEyLjg1YS4yNS4yNSAwIDAwLS4yNS4yNmwuMiAzLjdhLjI1LjI1IDAgMTAuNS0uMDJsLS4yLTMuN2EuMjUuMjUgMCAwMC0uMjQtLjI0ek0xMDkuNSAxMjguODVhLjI1LjI1IDAgMDAtLjE4LjQzbDIuNiAyLjZhLjI1LjI1IDAgMTAuMzYtLjM2bC0yLjYtMi42YS4yNS4yNSAwIDAwLS4xOC0uMDd6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE5Ij48cGF0aCBkPSJNMzkgMTEwbDkgMjNzNDgtMSA0Ny0yYy0uNi0uNi0yLjgtNy4zLTQuNi0xMy0yMi40IDUtMzYuMy04LTM2LjMtOEgzOXoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTk1IDEzMWwyNiA5LTI2IDIuNC0xNyAxLjYtMzAtMTEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTk1IDEzMC45VjE0MmwyNi0yeiIgb3BhY2l0eT0iLjUiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTYzLjUgMTMxLjljLS44LTIuOCAzMS45LTEyLjUgMzIuNy04LjMuNCAyLjQtMzQuNCA1LTM0LjggMi42czcuMS01LjIgMTYuNy02LjJsMi4xLS4yIi8+PHBhdGggZD0iTTYzLjUgMTM3LjljLS44LTIuMSAzMi4xLTEwLjcgMzIuOC03LjQuMyAxLjktNy4yIDMuNC0xNi44IDQuNXMtMTcuNi40LTE3LjktMS40Yy0uMS0uNi41LTEuMiAxLjctMS44Ii8+PC9nPjxwYXRoIGQ9Ik00OCAxMzN2MTguMmMuOC41IDMuMS42IDUuMi44SDc4di04bC0zMC0xMXoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZD0iTTEyMSAxNDB2Ny4yYTI2IDI2IDAgMDEtMTUgNC44SDc4di04bDQzLTR6Ii8+PHBhdGggZD0iTTEyMSAxNDB2Ny4yYTI2IDI2IDAgMDEtMTUgNC44SDc4di04bDQzLTR6IiBvcGFjaXR5PSIuMSIgZmlsbD0iI2ZmZiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8yMCI+PHBhdGggZD0iTTQ2LjQgMTAxLjFzLTEuMyAxLjktMS4xIDUuOWMuNyA5LjctMi4xIDE5LjUgMy41IDI2LjQgNS42IDcgMTYuNyAxMS44IDIyLjkgOC40czUuNi0xNS4zLTEuNC0yMC4yYTIxLjggMjEuOCAwIDAxLTQuNC00LjcgNDAgNDAgMCAwMS0xOS41LTE1Ljh6IiBmaWxsPSIjOTk2NzFkIi8+PHBhdGggZD0iTTQ2LjQgMTAxLjFzLTEuMyAxLjktMS4xIDUuOWMuNyA5LjctMi4xIDE5LjUgMy41IDI2LjQgMTIuMiAxMi45IDIyLjkgOC40IDIyLjkgOC40LTEwLjEgMS4xLTIxLjYtMzUuOC0yMS42LTM1LjhhMzAgMzAgMCAwMS0zLjctNC45eiIgZmlsbD0iIzZkNDcxNiIvPjxwYXRoIGQ9Ik01NC44IDExNS40Yy00IDAtNy4zLTMuMy03LjMtNy4zLjEtMS4zLjUtMi43IDEuMS0zLjguMS0uMiA3LjEgOC4xIDEwLjggOS41IDAtLjEtMS4zIDEuMi00LjYgMS42eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01OC44IDExMy4zYy0uOC4zLTEuNy41LTIuNi42YTYgNiAwIDAxLTUuOS02LjNsLjItMS44YTI0IDI0IDAgMDA4LjMgNy41eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNOTQgMTI0LjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNOTQuNiAxMjQuNXMtNS40LTEuNC04LjkgMmMtMy40IDMuNC0zLjQgOC4yLTEuNCA4LjJzMi4yLjcgMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjAuNSAxMDguOHMtNC44LTguMi0xOS4xLS43Yy0xNC4zIDcuNS0yLjcgMjMuMi0xNS43IDMwLjcgMCAwIDMuNyAzLjYgOC40LTUuOSA0LjYtOS4zIDQuNi0yNC43IDI2LjQtMjQuMXoiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNODUuOCAxMzguOHM2LjEgMi43IDEwLjItMTAuOSA4LjktMjEuOCAyMC40LTIxLjFjMS42IDAgMy4yLjYgNC40IDEuNyA1LjYgNSAxLjMgMTkuNi00LjQgMjQuMi02LjggNS40LTIxLjggMTAuOS0yNy45IDguOXMtMi43LTIuOC0yLjctMi44eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik04NC44IDExOS4ybDEgNy40YzEuOS0xLjQgMy42LTIuMyA1LTIuM2wtLjYtNi4yYy0xLjguNS0zLjYuOC01LjQgMS4xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTExOS4yIDExMi42aC0xMS42Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTEyMC4zIDExNS44aC0xNC43Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNC43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMC4zIDExOC45aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTExOS4yIDEyMi4xaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMi41LS41LjV6TTExOC4xIDEyNS4yaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTExNi4xIDEyOC40SDk4LjJjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjUgMCAuMi0uMy41LS41LjV6TTExNCAxMzEuNUg5OC4yYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjVIMTE0Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy40LS41LjR6TTEwOS44IDEzNC43SDk2LjFjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDEzLjdjLjMgMCAuNS4yLjUuNXYuMWMwIC4yLS4zLjUtLjUuNXpNMTA0LjUgMTM3LjhIOTVjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8yMSI+PGVsbGlwc2UgY3g9IjM2LjkiIGN5PSIxMjYuNyIgcng9IjE1LjQiIHJ5PSIyNS42IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTAuMSkiLz48cGF0aCBkPSJNNTkgMTE4Yy4zIDEuNy0xLjUgMy42LTEuNSAzLjZzLTIuNC0xLTIuOC0zIDEuNi0zLjYgMS42LTMuNiAyLjQgMSAyLjcgM3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEyMC43IDEyMC44Yy0yLjYgMTMuNS0xMS4yIDIzLjEtMTkuMiAyMS42LTcuNi0xLjQtMTItMTIuMi0xMC40LTI0LjZDOTQgMTE2IDEwNyAxMTMgMTE1LjYgOTYuM2M0LjggNC41IDcgMTQuMSA1IDI0LjV6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjQiPjxwYXRoIGQ9Ik00OS4yIDEyMC4zYy44IDQuMiA0LjcgMTYuNCAxMCAxOC41LTUuMiAxLTExLjEtNy4xLTEzLTE4cy43LTIwLjYgNi0yMS42Yy00LjYgMi4zLTMuOCAxNi45LTMgMjF6TTk3IDExNi43Yy0uNyA0LTEuNCAxNi40IDIuNyAyMC4yLTUtMS03LjUtOS44LTUuOC0xOS45bDMuNC0xLjYtLjMgMS4zeiIvPjwvZz48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTU1LjYgOTIuOWEyNS42IDE1LjQgNzkuOSAwMC0xLjUuMSAyNS42IDE1LjQgNzkuOSAwMC0xMC43IDI4IDI1LjYgMTUuNCA3OS45IDAwMTkuNyAyMi41IDI1LjYgMTUuNCA3OS45IDAwMTAuNi0yOCAyNS42IDE1LjQgNzkuOSAwMC0xOC0yMi42em0tMi41IDYuM2M1IDAgMTAuNCA3LjggMTIuMiAxOC4xIDIgMTEtLjcgMjAuNi02IDIxLjVhNC45IDQuOSAwIDAxLS45IDBjLTUgMC0xMC40LTcuNy0xMi4yLTE4LTItMTEgLjctMjAuNiA2LTIxLjZhNC44IDQuOCAwIDAxLjkgMHpNMTE1LjYgOTYuM0MxMDcgMTEzIDk0IDExNiA5MSAxMTcuOGMtMS42IDEyLjQgMi44IDIzLjIgMTAuNCAyNC42IDggMS41IDE2LjYtOC4xIDE5LjItMjEuNiAyLTEwLjQtLjMtMjAtNS4xLTI0LjV6bS00IDdjMS43IDQgMi4xIDkuOCAxIDE2LjItMiAxMC03LjIgMTcuNC0xMiAxNy40YTQuMyA0LjMgMCAwMS0xIDBjLTQuOS0xLTcuNC05LjgtNS44LTE5LjkuMS0uMyAxMS4yLTQgMTcuOC0xMy42eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzAxIj48cGF0aCBkPSJNNTMuNSA4NC4yYTIuNSAyLjUgMCAwMC0yLjktMi4ybC0xNiAyLjQtMi4zLThzMC0yLTEuNy0uN2wyLjYgOC45LTMuOC42LTIuMy03LjlzMC0yLTEuNy0uN2wyLjYgOC45LTIuMi4zYy40IDEuMy41IDIuNi4yIDMuOWwzLjQtLjMgMi40IDguNGguMWMtLjIuNS4xIDEgLjUgMS4xLjQuMi44IDAgMS4xLS40aC4xdi0uMmExIDEgMCAwMC0uMi0uOUwzMSA4OWwzLjYtLjQgMi42IDguOWguMWMtLjIuNCAwIDEgLjQgMS4ybC41LjJjLjYgMCAxLS41IDEtMWExIDEgMCAwMC0uNy0uOWwtMi40LTguNEw1MS41IDg3YzEuMi0uMSAyLjItMS40IDItMi44eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01MS4zIDg3LjFsLTE1LjQgMS42LS41LTEuNnMxOC44LTIuMyAxOC0yLjljLjEgMCAuNiAyLjEtMi4xIDIuOXoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTguOCA4Ny41YTguNSA4LjUgMCAwMTkuNS03LjNjNC43LjUgOCA0LjcgNy41IDkuM2E4LjUgOC41IDAgMDEtOS41IDcuMyA4LjQgOC40IDAgMDEtNy41LTkuM3pNMTQ2LjcgNzcuNWMtLjUgNC00LjMgNi45LTguMyA2LjNhNy40IDcuNCAwIDAxLTYtNC45Yy0uMS0uNCA0LjYuMSA0LjYtMS45IDAtMS0xLjctMS0zLS45bC0yIC4yLjEtLjhjLjYtNCA0LjMtNi45IDguMy02LjNzNi45IDQuMiA2LjMgOC4zeiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4zIj48cGF0aCBkPSJNMjUuOCA4OS40YTguNSA4LjUgMCAwMS05LjUgNy4zIDkgOSAwIDAxLTUuNy0zLjFjMi4yLjggNy43IDEuNiAxMS4xLTEuOCAyLjUtMi40IDIuNi02LjggMi05YTguNiA4LjYgMCAwMTIuMSA2LjZ6TTE0Ni43IDc3LjVjLS42IDQtNC4zIDYuOS04LjMgNi4zYTcuNCA3LjQgMCAwMS00LjgtMi44YzEuOS43IDYuNiAxLjUgOS42LTEuNCAyLjItMi4xIDIuNC02IDEuOS03LjlhOCA4IDAgMDExLjYgNS44eiIvPjwvZz48cGF0aCBkPSJNMTM3LjEgNzYuNWMtLjItLjgtMi4zLS41LTIuMy0uNWwtNi40LjUtMS41LTUuN3MwLTEuNC0xLjItLjVsMS43IDYuMy0zLjMuMy0xLjYtNS44czAtMS40LTEuMi0uNUwxMjMgNzdsLTMuNy4zLjEgMy4yIDQuNi0uNiAyLjEgOGguMWMtLjIuNCAwIC45LjMgMS4xLjQuMi44IDAgMS0uM2guMXYtLjJjLjEtLjMgMC0uNi0uMi0uOGwtMi4xLTggMy4xLS40IDIuMyA4LjVoLjFjLS4yLjQgMCAuOC40IDEgLjQuMi44IDAgMS0uM2guMXYtLjJjLjEtLjMgMC0uNi0uMi0uOGwtMi4zLTguNSA1LjUtLjdjMS42IDAgMi0uOCAxLjgtMS44eiIgZmlsbD0iI2ZmZiIvPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNMTIzLjkgODBsLTQuNi41di0xLjRsNC0uNC4yLS4xek0xMjguMyA3OS40bC0zLjEuNC0uMy0xLjQgMy4xLS4zek0xMzQuNCA3OC43bC00LjcuNi0uNC0xLjQgNy41LS45YzAgLjEuOC45LTIuNCAxLjd6TTI5LjQgODkuM2wtMy40LjMuMS0xLjUgMi42LS4zLjMuMnpNMzAuMyA4Ny45bDMuNS0uNi41IDEuNC0zLjUuNHoiLz48Y2lyY2xlIGN4PSIzOCIgY3k9Ijk4IiByPSIxIi8+PGNpcmNsZSBjeD0iMzIuNyIgY3k9Ijk4LjIiIHI9Ii45Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDIiPjxwYXRoIGQ9Ik0xMjUuOCA3MS40czE5LjIgMS40IDE5LjYgMi44Yy4xLjQtMTguMiA5LjctMTcgOS4xIDAgMCAyLjQtNS44IDIuMS03LjFzLTQuNy00LjgtNC43LTQuOHoiIGZpbGw9IiM1ZTVlNWUiLz48cGF0aCBkPSJNMTI1LjIgNzEuM3MxOS4yIDEuNCAxOS42IDIuOGMtNSAxLTE0LjYgMi40LTE0LjYgMi40bC01LTUuMnoiIGZpbGw9IiNlMmUyZTIiLz48ZyBmaWxsPSIjNjAzODEzIj48cGF0aCBkPSJNMTMwLjYgNzkuMmwtMTEuNiAxdi00LjdsMTAuOC0uOHM1IC40IDUuMiAxLjItMi43IDMtNC40IDMuM3pNNTQuNiA4My43bC0zNi41IDJzLTIuOC4xLTMtMS42Yy0uMS0xLjUuOC0yLjQgMi42LTIuOUw1NCA3Ny41YTMuMiAzLjIgMCAwMTMuNCAyLjggMyAzIDAgMDEtMi44IDMuNHoiLz48L2c+PHBhdGggZD0iTTU0LjYgODMuN2wtMzYuNSAyYy0xLjggMC0yLjgtLjUtMy0xLjYgMTctMS4yIDQ0LjItMi40IDQyLjMtMy44IDAgLjEuNSAyLjctMi44IDMuNHoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTM4LjggODAuNGwtNS40LTUuOC0xNy4xLjEgNi4xIDYuNnpNMzkuNCA4My4ybC02LjYgNy45LTE3LjEgMS4yIDYuNi03Ljl6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0yMy44IDc2LjdjLjItLjIuNS0uMi43IDBsMi43IDIuOWMuMi4yLjIuNSAwIC43LS4yLjItLjUuMi0uNyAwbC0yLjctMi45YS41LjUgMCAwMTAtLjd6TTIwLjggNzYuN2MuMi0uMi41LS4yLjcgMGwyLjcgMi45Yy4yLjIuMi41IDAgLjctLjIuMi0uNS4yLS43IDBsLTIuNy0yLjlhLjUuNSAwIDAxMC0uN3pNMjYuOCA3Ni43Yy4yLS4yLjUtLjIuNyAwbDIuNyAyLjljLjIuMi4yLjUgMCAuNy0uMi4yLS41LjItLjcgMGwtMi43LTIuOWEuNS41IDAgMDEwLS43ek0yOS44IDc2LjdjLjItLjIuNS0uMi43IDBsMi43IDIuOWMuMi4yLjIuNSAwIC43LS4yLjItLjUuMi0uNyAwbC0yLjctMi45YS41LjUgMCAwMTAtLjd6TTMyLjggNzYuN2MuMi0uMi41LS4yLjcgMGwyLjcgMi45Yy4yLjIuMi41IDAgLjctLjIuMi0uNS4yLS43IDBsLTIuNy0yLjlhLjUuNSAwIDAxMC0uN3pNMjYuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMjMuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMjkuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMzIuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMzUuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wMyI+PHBhdGggZD0iTTI2LjQgNzFsMi40IDI0LTIuNCAydjMuM3MwIDEuNyAyLjQgMi4zYzIuNS41IDcuMSAyIDE0LjIgMS40IDMuOC0uMyA3LjUtMS4zIDExLTIuOWEzIDMgMCAwMDEuOC0yLjVsLS45LTMuNi0yLjQtMi0yLjQtMjMiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmNiYjAwIj48cGF0aCBkPSJNMjguOSA3MS4ybDIuNSAyMy43LTMuNyAzczAgMS4zIDQuOSAyYzYuNyAyLjIgMTcuNy0uMSAyMC45LTEuOSAyLjUtLjkuNS0yIC41LTJsLTIuNS0zTDQ5IDcwLjJsLTIwLjEgMXoiLz48cGF0aCBkPSJNNTQuOSA5Ny4yYy4xIDEuNy01LjkgNC40LTEzLjQgNC44cy0xMy44LTEuNi0xMy45LTMuMiA1LjktMy40IDEzLjUtMy44IDEzLjYuNSAxMy44IDIuMnoiIG9wYWNpdHk9Ii41Ii8+PC9nPjxnIGZpbGw9IiNmZmQyMmQiIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGQ9Ik0zNC42IDkzYy0uOS4xLTEuNy0uNS0xLjktMS40bC0xLjEtMTNjMC0uOS44LTEuNiAxLjctMS42LjktLjEgMS43LjUgMS45IDEuNGwxIDEzYzAgLjktLjcgMS42LTEuNiAxLjZ6TTQwLjUgOTNjLS45LjEtMS43LS41LTEuOS0xLjRsLTEuMS0xM2MwLS45LjctMS42IDEuNi0xLjYuOS0uMSAxLjcuNSAxLjkgMS40bDEgMTNjLjEuOS0uNiAxLjYtMS41IDEuNnpNNDYuNCA5MmMtLjkuMS0xLjctLjUtMS45LTEuNGwtMS4xLTEzYzAtLjkuNy0xLjYgMS42LTEuNi45LS4xIDEuNy41IDEuOCAxLjRsMS4xIDEzYy4xLjktLjYgMS42LTEuNSAxLjZ6Ii8+PC9nPjxwYXRoIGQ9Ik0yOS43IDcyLjlzLTguMSAyLjItNi45LTQuNGMwIDAtNC45LTUuNSAxLjItNS41IDAgMCAxLjItNC40IDYuMSAwIDAgMCA0LjktNy43IDkuOCAxLjEgMCAwIDMuNy00LjQgNi4xIDIuMiAwIDAgNy42IDIuNCAyIDUuMVMzMS43IDc0IDI5LjcgNzIuOXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAuOSA3Mi40UzI0IDc0LjIgMjUuMSA2OWMwIDAtNC4xLTQuMyAxLTQuMyAwIDAgMS0zLjUgNS4yIDAgMCAwIDQuMS02LjEgOC4zLjkgMCAwIDMuMS0zLjUgNS4yIDEuNyAwIDAgNi40IDIgMS43IDRzLTE0IDItMTUuNiAxLjF6IiBmaWxsPSIjZmZlZmFlIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PGcgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik00MS4yIDY0LjRTNDMgNjQgNDMgNjdzLTMuMSAzLjktMy4xIDMuOS44LS45IDEuOS4xLTEuNSAxLjctMS41IDEuNyA2LjQtLjMgOC43LTIuNS0zLjYtMy4yLTMuNi0zLjIgMC0zLjEtNC4yLTIuNnpNMzEuMSA2NmMuNyAxLjkgMi43IDMgNC43IDIuNiAwIDAtMy41IDIuNC00LjctMi42ek0yNy40IDY3LjFjMS4yLjcgMi43LjUgMy44LS40IDAgMC0uNiAyLjYtMy44LjR6TTM3LjkgNjguNXMyLjQtLjggMS43LTIuOWMtLjEuMSAyLjIgMS45LTEuNyAyLjl6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDQiPjxwYXRoIGQ9Ik0xMTcuMSA2OC4xYzEuOSAxLjYgMi45IDEyIDEgMjAuOSAwIDAgNC43IDMuMiA2LjkgMy43bDMgLjljNS42IDEuNSAxNiAzLjQgMTYuMy03LjhsLTEtNS44Yy0uNS0yLjkuOC01LjItMi0xMC41cy04LjUtNS41LTEyLjYtMy45YzAgMC0uNi42LTIuMy0xLjJzLTcuMy0yLjEtOS4zIDMuN3pNMjYuMyA2OC43YTguNiA4LjYgMCAwMC0xLjMgNy42bC4zIDJzLTEwLjEtMS44LTkgNi4ybC4zIDIuMWMxIDYuNiAyIDkuNiA2LjQgMTEuNiA0LjggMi4yIDUtMi40IDguMS0xLjJzMTkuNyAxMC43IDIyLjQtNC41bC0uMi02LjVjLS4xLTMuMyAxLjctNS42LS41LTExLjlzLTguNS03LjQtMTMuMy02LjNjMCAwLS44LjUtMi4zLTEuN3MtNy44LTMuNC0xMC45IDIuNnoiLz48ZyBmaWxsPSIjMDEwMTAxIj48cGF0aCBkPSJNMTE3LjEgNjguMWMxLjkgMS42IDIuOSAxMiAxIDIwLjkgMCAwIDQuNyAzLjIgNi45IDMuN2wzIC45Yy0yLjYtLjEtMy41LTUuMS0zLTUuMyAwLTcuNi0xLjQtMTIuNS0xLjMtMTcuOGE1LjIgNS4yIDAgMDE1LTQuOXMtLjYuNi0yLjMtMS4yLTcuMy0yLjEtOS4zIDMuN3oiIG9wYWNpdHk9Ii4xNiIvPjxnIG9wYWNpdHk9Ii4zIj48cGF0aCBkPSJNMTE4LjUgODkuM3M1LjEgMyA2LjYgMy4zYzIuNS42IDE1LjEgNS41IDE4LjUtMi42LjQtMS40LjctMi45LjktNC4zLS42IDIuMS00LjYgNC4zLTguOSA0LjktNS44IDEtMTAuNC0yLjctMTMuOS0xLjZsLTIuOC0xLjItLjQgMS41ek0xOSA5NS4xYzEuMiAxLjMgMi41IDIuMyA0IDMuMSA0LjggMi4yIDUtMi40IDguMS0xLjIgMi43IDEgMTUuNyA4LjUgMjAuOC4xYTI1IDI1IDAgMDAxLjYtNC42Yy0xIDIuMi01LjggNC0xMC41IDQtNi42LjEtMTEtNC42LTE1LTQtNi42IDMuNS05IDIuNi05IDIuNnoiLz48L2c+PGcgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0xMjUuMSA5Mi43Yy0zLS4zIDE4LjkgNyAxOS40LTYuOWwtMS01LjhjLS41LTIuOS44LTUuMi0yLTEwLjVzLTguNS01LjUtMTIuNi0zLjljMTMuMS0uOCAxMC43IDI3LjItMy44IDI3LjF6TTMxIDk3Yy0zLjItLjggMTkuNyAxMC43IDIyLjQtNC41bC0uMS02LjVjLS4xLTMuMyAxLjctNS42LS41LTExLjlzLTguNS03LjQtMTMuMy02LjNDNTQuMSA2OS4xIDQ3IDk5LjYgMzEgOTd6Ii8+PC9nPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzA1Ij48cGF0aCBkPSJNMTI0LjYgODAuN3MyMCAuMyAxOC42LTEyLjVjMCAwIDkuNiAxMS4xIDEgMjAuOXMtMjcuMyA2LjEtMjcuMyA2LjFsNy43LTE0LjV6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE0My4yIDY4LjJjLjMgMTMuNy0yMC4yIDEyLjEtMjAuMiAxMi4xbC0xLjIgNS43LTQuOSA5LjJzMTguNyAzLjYgMjcuMy02LjEtMS0yMC45LTEtMjAuOXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTQzLjIgNjguMmM4LjQgMjIuNC0yMS43IDE5LjQtMjEuNyAxOS40bC4zLTEuNy00LjkgOS4yczE4LjcgMy42IDI3LjMtNi4xLTEtMjAuOC0xLTIwLjh6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMTguNSA3NXM3LjEgMSA3LjMgMTEuMi0xMSAxMS44LTExIDExLjhhMzkuNiAzOS42IDAgMDAzLjctMjN6TTM4LjIgNzguMWw5LjYtNHM4LjYuOSA5LjUgMTEuNC01LjUgMTIuOS01LjUgMTIuOWwtMTAuMy4ycy00LjUtMy4xLTUuMi0xMS4zIDEuOS05LjIgMS45LTkuMnoiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMzguMiA3OC4xbDkuNi00YzUgMS41IDkgNC4zIDkuNSAxMS40LS44LTEuNi0yLjMtMi4zLTQuNS0yLjJMNDggODQuNGwtNS43IDEuNC01LjkgMS40Yy40LTUtLjEtNy4zIDEuOC05LjF6IiBvcGFjaXR5PSIuMSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC00LjYgNDIgODguMikiIGN4PSI0MiIgY3k9Ijg4LjIiIHJ4PSI0LjkiIHJ5PSI5LjEiIG9wYWNpdHk9Ii4xNiIvPjxwYXRoIGQ9Ik00MS43IDgwLjZzLTE1LjYgMi4xLTIwLTIuOS0uMi0xMy45LS4yLTEzLjktMTEuMSA2LjQtMTAgMTkgMjUgMTMuOCAzMC4zIDEyLjRjMCAwIDMuNi0xLjggMy4zLTcuNSAwLTUuOC0zLjQtNy4xLTMuNC03LjF6Ii8+PHBhdGggZD0iTTQxLjcgODAuNnMtMTUuNiAyLjEtMjAtMi45LS4yLTEzLjktLjItMTMuOS0xMS4xIDYuNC0xMCAxOSAyNSAxMy44IDMwLjMgMTIuNGMwIDAgMy42LTEuOCAzLjMtNy41IDAtNS44LTMuNC03LjEtMy40LTcuMXoiIG9wYWNpdHk9Ii4zIi8+PC9nPjxwYXRoIGQ9Ik00NSA4Ny43Yy0xNS45IDMuOC0zOS44LTIuNi0yMy41LTIzLjggMCAwLTExLjEgNi40LTEwIDE5czI1IDEzLjggMzAuMyAxMi40YzAgMCAzLjYtMS44IDMuMi03LjZ6IiBvcGFjaXR5PSIuMyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDYiPjxwYXRoIGQ9Ik00MiA2Ni41TDI2IDUxYy0uOS0uMi00IDktNCAxOXM0IDE1IDYgMTdsNyA3YzMgMyA2IDQgMTAgNiAzIDEgNCAyIDQtMnMtNC01LTUtMThsMS05LTMtNC41ek0xMTQgNjEuMWMzLjYtNC43IDE5LjctMTEgMTkuNy0xMXMyLjIgMTIuMi00LjggMjguOGMtMi41IDYtNiAxNC41LTkgMTYuOC0zIDIuMy0zLjguMy0zLjguMy0xLjEgMCA3LjktMTktMi4xLTM0Ljl6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTI2IDUyLjJDNDEgNjkgNDMuNiA3OC43IDQzLjYgNzguN2wxLjQtOC42UzI5IDUyIDI2IDUyLjJ6TTEyMS42IDU1LjhsOC42LTEuN2MxIDYtMS42IDE1LjItMy4xIDIwLTIuNyA4LjMtNC45IDEyLjktNy4xIDE3LjktMi4yIDUtMy45IDQtMy45IDQgMSAxLjggNC43LjggOC41LTcuNCAyLjQtNS40IDQuOC0xMC40IDYuNC0xNS44IDAgMCAzLjktMTAuOCAyLjctMjIuNy00LjEgMS43LTguMiAzLjUtMTIuMSA1Ljd6TTI1Ljk5MyA4NC40NTNjMjIuMDYgMTguNjMzIDIxLjMwMyAxMy42ODcgMjEuNDI2IDkuMDc5IDIuMDA3IDIuNDYyIDIgNy4xNS42ODcgNy4yMDEtMS44MDUuMTQ3LTkuOTA0LTMuNzgtMTEuNzk2LTUuNjUzLTMuNzg0LTMuNzQ3LTcuMjItNi43NDYtMTAuMzE3LTEwLjYyN3oiLz48L2c+PHBhdGggZD0iTTQ0IDc0Yy0xLTItMTUtMTItMTUtMTJzLTIgMTYgNCAyMmMyLjMgMi4zIDQuOCA0LjUgNy40IDYuNUw0NCA5MnMzLTEgMC01Yy0yLjEtMi45LS45LTUuOC4xLTcuNmwuOC0xLjVDNDUgNzcgNDUgNzYgNDQgNzR6TTExOC41IDcwLjZjLjUtMS43IDkuMi04IDkuMi04cy0uOCAxMC44LTMuMyAxNi4xYy0xIDIuMS0yLjMgNC40LTQgNi4yLS41LjYtMi4zIDEuNS0yLjMgMS41bC41LTMuN2EzOC44IDM4LjggMCAwMC0uMS04LjlsLS4zLTIuMmMwLS4zIDAtLjUuMy0xeiIvPjxnIGZpbGw9IiMwMTAxMDEiPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNDQgNzRjMiAxLTE1LTEyLTE1LTEyLS43LS4xLS44IDE3LjkgNCAyMmw3LjQgNi41TDQ0IDkyYy0xMy03LjItMTkuMi0yNy4yIDAtMTh6TTExOC41MSA3MC42NTNjLjMyOC0xLjYzNCA5LjI1My04LjA4NSA5LjI1My04LjA4NS0uNTQ4IDQuNDczLTEuMDQgMTEuODctMy41MDQgMTYuNTE1LTIuMTkgNC4yMTUtMy4wMTIgNC45MDMtMy43NzggNS43NjMtLjU0OC42MDItMS45NzEgMS4yOS0xLjk3MSAxLjI5IDcuMTE3LTYuMTkzIDEwLjUxMi0yMy4zOTYgMC0xNS40ODN6Ii8+PC9nPjxnIG9wYWNpdHk9Ii40Ij48cGF0aCBkPSJNMzkgNzVjLTIgMC00IDMtMiA2czYgMyA2IDMtMS0uOS41LTMuNVM0MSA3NSAzOSA3NXpNMTIxLjI0OCA3MS41MTNjMS4wOTQgMCAyLjE5IDIuNTgxIDEuMDk0IDUuMTYycy0zLjUwMyAyLjU4LTMuNTAzIDIuNThsLS4wNTUtMy4wMWMtLjExLTIuNTgxIDEuMzY4LTQuNzMyIDIuNDYzLTQuNzMyeiIvPjwvZz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wNyI+PHBhdGggZD0iTTEzNy4xIDY0LjNzNy4yIDYuMyA2LjMgMTUuMmMwIDAtMS44IDkuMi0yLjQgMTAuNXMtMy4xIDguNy05LjEgOS45bC00LjEuNWMtLjggMS4zLTEuOCAyLjQtMyAzLjMtMi40IDItNi42IDIuNS03LjggMS45cy0uNiAxLjMtMS45LjdsLTQuNi0xLjZjNS01LjggNy45LTEzLjEgOC43LTIyLjhsMS4yLTEuMiA1LjctNy41YzIuMS0yLjkgNi44LTQuNyA3LjctNS4xIDAgMC01LjEgNi4yLTMuNSA3LjdzNC40LjQgNC40LjQgNC4xLS4zIDIuNC0xMS45ek0xOS45IDY0LjNzLTcuMiA2LjMtNi4zIDE1LjJjMCAwIDEuOCA5LjIgMi40IDEwLjVzMy4xIDguNyA5LjEgOS45bDQuMS41Yy44IDEuMyAxLjggMi40IDMgMy4zIDIuNSAyIDYuNSAyLjUgNy44IDEuOXMuNiAxLjMgMS45LjcgNy0xLjYgOC4xLTQuNGMuNi0xLjcuNi0zLjctLjEtNS40IDAgMC00LjEtLjUtNS43IDEgMCAwLS44LTMuNS00LjMtMi43IDAgMCAzLjItOC40LTMuMi0xNC4xTDMxIDczLjJjLTIuMS0yLjktNi44LTQuNy03LjctNS4xIDAgMCA1LjEgNi4yIDMuNSA3LjdzLTQuNS40LTQuNS40LTQuMS0uMy0yLjQtMTEuOXoiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTEzNy4xIDY0LjNzNy4yIDYuMyA2LjMgMTUuMmMwIDAtMS44IDkuMi0yLjQgMTAuNXMtMy4xIDguNy05LjEgOS45bC00LjEuNWMtMS44LjYtMy45LS4xLTYtMS4yIDMuNSAxIDIwLjctMTQuOCAxMi45LTIyLjggMCAwIDQuMS0uNSAyLjQtMTIuMXpNMjkgNzcuOXMyLjYtMS40IDQtMS4xYzAgMC0yLjktNS42LTUuOS02LjQgMCAwIDMuMyA0LjcgMS45IDcuNXoiLz48L2c+PGcgb3BhY2l0eT0iLjIiPjxnIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik0xMjcuOCAxMDAuNGMtLjggMS4zLTEuOCAyLjQtMyAzLjMtMi40IDItNi42IDIuNS03LjggMS45cy0uNiAxLjMtMS45LjdsLTQuNi0xLjYgMS43LTIuNHMxLjktLjMgMi0xYzIuMSAzLjMgNy4xLTEuOCA1LjYtMy41IDAgMCAzLjkgMy4xIDggMi42ek0yOS4yIDEwMC40Yy44IDEuMyAxLjggMi40IDMgMy4zIDIuNSAyIDYuNSAyLjUgNy44IDEuOXMuNiAxLjMgMS45LjcgNy0xLjYgOC4xLTQuNGMuNi0xLjcuNi0zLjctLjEtNS40LTEuNCA2LjQtNi45IDYuNy03LjIgNC44LTIuMSAzLjMtNy4xLTEuOC01LjYtMy41LjEgMC0zLjggMy4xLTcuOSAyLjZ6Ii8+PC9nPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0xMjkuNyA3Ny4zcy0zLjUtLjgtNS40LS4xYzAgMCAzLjUtNi41IDcuNC04LjEgMCAwLTQgNS43LTIgOC4yek0xOS45IDY0LjNzLTcuMiA2LjMtNi4zIDE1LjJjMCAwIDEuOCA5LjIgMi40IDEwLjVzMy4xIDguNyA5LjEgOS45bDQuMS41YzEuOC42IDMuOS0uMSA2LTEuMi0zLjUgMS0yMC43LTE0LjgtMTMtMjIuOC4xIDAtNC0uNS0yLjMtMTIuMXoiLz48L2c+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDgiPjxwYXRoIGQ9Ik0zNC41IDExNi45TDMyLjkgMTA0bDItLjQgMS41IDEzcy0uNCAyLTEuOS4zeiIgZmlsbD0iIzMwMzAzMCIvPjxwYXRoIGQ9Ik00Ni44IDcxLjdjMS42IDIuMyAyIDUuMSAxLjIgNy43bC0uNCAyIDQuMy4xYzMgLjkgMy4yIDggLjYgMTAuMi0xLjEuNi0yLjEgMS40LTMgMi4yYTI1IDI1IDAgMDEtOC40IDYuM2wtMy4zIDEuNGMtNiAyLjQtMTcuNCA1LjktMTkuMy02LjVsLjMtNi42Yy4yLTMuMy0xLjUtNS43LjgtMTJzOC44LTcuMyAxMy42LTZjMCAwIC44LjUgMi40LTEuN3M4LjMtMy4zIDExLjIgMi45eiIgZmlsbD0iI2Q4ZDhkOCIvPjxwYXRoIGQ9Ik0zOS4xIDEwMS4xYy01LjYgMi40LTE4LjQgNy4yLTIwLjQtNi4xbC40LTYuN2MuMi0zLjMtMS41LTUuNy44LTEyczIuNC02LjQgMTMuNi02YzEwLjMuMyA1LjMgMTYuMyA3LjIgMjcuMSAwIDEuMS0uNyAzLjMtMS42IDMuN3oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDEuMiAxMDAuMmMzLjItLjctMjAuMiAxMC4zLTIyLjUtNS4ybC4zLTYuNmMuMi0zLjMtMS41LTUuNy44LTEyczguOC03LjMgMTMuNi02Yy0xNC44LjktOC40IDMxLjkgNy44IDI5Ljh6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNTIuNiA5MS45cy04LjMgNy4yLTExLjQgOC40Yy0yLjcgMS0xNi4yIDguMS0yMS0uNS0uNi0xLjUtMS4yLTMuMS0xLjUtNC43LjkgMi4yIDUuNyA0LjIgMTAuNiA0LjMgNi42LjMgMTEuMi00LjMgMTUuMy0zLjYgMi41LTEuNiA1LjItMi45IDgtMy45eiIgb3BhY2l0eT0iLjE2Ii8+PHBhdGggZD0iTTMzIDU0LjdsOC42LjMtNS4zIDYuNiAyLjEgOC4xLTcuOC0zLjItNyA0LjguNS04LjQtNi42LTUuMiA4LjItMi4yIDMtOHoiLz48cGF0aCBkPSJNMzAuMyA1NC4zbDEuMyAyYy4yLjMuNi41IDEgLjVsMi4yLjFjLjYgMCAxIC42IDEgMS4ybC0uMi43LTEuNSAyYy0uMy4yLS4zLjUtLjMgMWwuNiAyLjNjLjEuNS0uMSAxLjEtLjcgMS4zaC0uOGwtMi4xLTFhLjkuOSAwIDAwLTEgLjJsLTIgMS4zYy0uNS4zLTEuMi4yLTEuNi0uMi0uMi0uMi0uMi0uNS0uMi0uOGwuMi0yLjNjMC0uNC0uMi0uNy0uNS0xTDIzLjggNjBjLS40LS4zLS41LTEtLjMtMS42bC42LS40IDIuMy0uNmMuMy0uMS42LS4zLjgtLjdsLjgtMi4yYy4yLS42LjktLjkgMS41LS43LjQgMCAuNy4xLjguNHoiIG9wYWNpdHk9Ii41IiBmaWxsPSIjZmZmIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wOSI+PHBhdGggZD0iTTUyLjUgMTAzLjFzLjkuMSAxLjktMS42LjUtNS4zLTIuMS02LjUtMy4zLTMuOS00LjgtNi43LTcuNC03LjgtMTktOS43LTEyLjktNi41LTEzLjctNy41LTIuNSA3LjkgMS40IDE1LjRTMjYuNyAxMDAgMzYgOTcuMnMxMi40IDIgMTIuNCAyIDIuMyAzLjcgNC4xIDMuOXpNMTE5LjUgODJjMy4yLTEgNi41LTEuNiA5LjktMS44IDEyLTEgMTMuOC01LjQgMTQuNy02LjNzMS45IDgtMi42IDE1LjEtMTEuOSAxMi41LTIxLjIgOWMtMS40LS41LTIuOC0uOS00LjMtMS4xYTM1LjIgMzUuMiAwIDAwMy41LTE0Ljl6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjE0Ij48cGF0aCBkPSJNNTIuNSAxMDMuMXMuOS4xIDEuOS0xLjYuNS01LjMtMi4xLTYuNS0zLjMtMy45LTQuOC02LjctNy40LTcuOC0xOS05LjctMTMuNS05LjMtMTMuNy03LjVjMS4zIDE2LjMgMjkuNiAxMS41IDM3LjcgMzJ6TTExOS4yIDgyLjRjMy42LTEuMiA3LjMtMS45IDExLTIuMiAxMi0xIDE0LjctOC4xIDE0LjctNi4zLTEuOCAxMC41LTE0LjkgMTEuMS0yNi40IDE2IDEuMi00LjMgMS4yLTUuMi43LTcuNXoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xMCI+PHBhdGggZD0iTTYzLjMgNzYuMXMuOCAxNC4xLTE3LjYgMjEuMS0yNy44LTUuNS0yNy44LTUuNS0uNS0xNSAxOC40LTIxIDI3IDUuNCAyNyA1LjR6IiBmaWxsPSIjZGQ4MzEzIi8+PHBhdGggZD0iTTYzLjMgNzYuMXMuOCAxNC4xLTE3LjYgMjEuMS0yNy44LTUuNS0yNy44LTUuNWMyMC45IDIuMSAzNC40LTMuOCA0NS40LTE1LjZ6IiBvcGFjaXR5PSIuNSIgZmlsbD0iIzc1NGMyNCIvPjxwYXRoIGQ9Ik00Ni44IDc3LjZoLS4ybC0uNC4xYy0uMi4xLS4zLjQtLjMuNmwxLjMgMy43LTUgMS44LTEuOS01LjFjLS4xLS4zLS4zLS40LS42LS4zbC0uNC4xYy0uMi4xLS40LjQtLjMuN2wyIDUuMS01LjggMi4xLTEuMS0zLjFjLS4xLS4zLS4zLS40LS42LS4zbC0uNC4xYy0uMy4xLS40LjQtLjMuNmwxLjIgMy4yLTQuNiAxLjdjLS4zLjEtLjQuMy0uMy42bC4xLjRjLjEuMi40LjMuNi4zbDQuNi0xLjcgMS40IDMuN2MuMS4zLjMuNC42LjNsLjQtLjFjLjMtLjEuNC0uMy4zLS42bC0xLjQtMy44IDUuNy0yLjEgMiA1LjJjLjEuMy4zLjQuNi4zbC4zLS4yYy4zLS4xLjQtLjMuMy0uNmwtMi01LjIgNS4xLTEuOSAxLjIgMy4zYy4xLjMuMy40LjYuM2wuNC0uMWMuMy0uMS40LS4zLjMtLjZMNDkgODIuOGw1LTEuOWMuMy0uMS40LS4zLjMtLjZsLS4xLS40Yy0uMS0uMy0uMy0uNC0uNi0uM2wtNSAxLjktMS40LTMuNmMwLS4yLS4yLS4zLS40LS4zeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTEiPjxwYXRoIGQ9Ik0xNC4yIDgwLjNsNi4xLS45YzEuNy0uMiAzLjMuOSAzLjUgMi42LjIgMS43LS45IDMuMy0yLjYgMy41bC02LjEuOWMtMS43LjItMy4zLS45LTMuNS0yLjYtLjItMS43LjktMy4yIDIuNi0zLjV6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48ZyBmaWxsPSIjZTBlMGUwIj48cGF0aCBkPSJNMzYuMyA5Mi4zTDM2IDk5Yy0uMy0uMyAyLjcgMi4zIDUgMGwtLjQtNy44LTQuMyAxLjF6TTEyOS42IDk3LjFsLS44IDYuN2MtLjMtLjMgMi41IDIuNSA1IC4zbC4xLTYuMWE2IDYgMCAwMS00LjMtLjl6TTM0IDQyLjJzLjktNC4zIDMuNS0xLjcgNS44IDE2LjEgMi40IDIzLjljLS44IDQuNy0uNiA1LjctLjYgNS43LTEuMS41LTIuNC41LTMuNSAwTDM0IDQyLjJ6TTEyOS41IDUwLjhsLS44IDE1LjRzLS4yIDQuNiA0LjQgNC45IDUuNS0yLjggNS42LTQuM2wuOC0xNS40cy0xLjIuMy0xLjQgNC4yLTEuMiA3LjYtMiA3LjZoLS42Yy0uNSAwLS45LS4yLS44LTIuNC4yLTMuMS41LTkuMi0uMy05LjNzLTEuMyA5LjItMS4zIDkuMi0uMSAyLjMtMS43IDIuMi0xLjEtOC41LTEuMS04LjUuNC00LS44LTMuNnpNMTMwLjkgNzdsLTIuNCA3LjggMiAuMiAyLjItNy4zeiIvPjwvZz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMzcuNSA0MC40UzQ0IDUwIDM5LjkgNjQuM2MuNSA1LjctLjMtMjIuMi0yLjQtMjMuOXoiIG9wYWNpdHk9Ii4xIi8+PGcgb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik0zNC42IDQyYy4zIDAgLjUuMi41LjVsMS43IDI2LjljMCAuMy0uMi41LS41LjVzLS41LS4yLS41LS41bC0xLjctMjYuOWMwLS4yLjItLjQuNS0uNXpNMTM5LjUgNTEuM3MtLjkgMy0xLjQgMTAuN2MwIDAgMCA4LjQtMi42IDguNyAwIDAgMi44LjQgMy4zLTguOGwuNy0xMC42ek0xMzQuNCA2MC4ybC41LTguNXMtLjQgOC41LS4xIDEwLS41IDEuNS0uNSAxLjVsLjEtM3oiLz48L2c+PHBhdGggZD0iTTI3IDY4LjJhNyA3IDAgMDAtMS43IDUuOWwuMSAxLjZzLTcuOS0yLjMtNy42IDQuMmwuMSAxLjdjLjIgNS4zLjggNy44IDQuMSA5LjcgMy42IDIuMSA0LjItMS40IDYuNS0uMnMxNC42IDEwLjIgMTguMS0xLjZsLjUtNS4yYy4yLTIuNiAxLjgtNC4zLjYtOS40cy02LjEtNi42LTEwLTYuMWMwIDAtLjYuMy0xLjctMS42cy02LTMuNS05IDF6Ii8+PC9nPjxwYXRoIGQ9Ik0yNSA4MC40bDQuNC0uNGMuMiAwIC41LjIuNS40cy0uMi41LS40LjVsLTQuNC40Yy0uMiAwLS41LS4yLS41LS40cy4xLS40LjQtLjV6TTI1LjIgODIuMmw0LjQtLjRjLjIgMCAuNS4yLjUuNHMtLjIuNS0uNC41bC00LjQuNGMtLjIgMC0uNS0uMi0uNS0uNCAwLS4zLjItLjUuNC0uNXpNMjUuNSA4My45bDQuNC0uNGMuMiAwIC41LjIuNS40cy0uMi41LS40LjVsLTQuNC40Yy0uMiAwLS41LS4yLS41LS40cy4xLS40LjQtLjV6Ii8+PHBhdGggZD0iTTEyNCA3My41YTYuOCA2LjggMCAwMC0xLjYgNS44bC4xIDEuNi0zLjMtLjMtMS40IDcuN2MuOC42IDEuNSAxLjIgMi4xIDEuOS42IDEgMy41IDQuNCA1LjggNS41bDIuNCAxLjNjNC40IDIuNCAxMi43IDYgMTUuMi0zLjNsLjQtNS4xYy4yLTIuNSAxLjctNC4yLjQtOS4ycy02LTYuMy05LjgtNS44YzAgMC0uNi4zLTEuNy0xLjVzLTUuOC0zLTguNiAxLjR6IiBmaWxsPSIjZDhkOGQ4Ii8+PHBhdGggZD0iTTEyNy4yIDk2LjVjNCAyLjMgMTMuNCA3LjEgMTYuMS0yLjhsLjQtNS4xYy4yLTIuNSAxLjctNC4yLjQtOS4ycy0xLjMtNS05LjgtNS44Yy03LjgtLjctNS41IDExLjktNy44IDIwLS4zLjguMSAyLjUuNyAyLjl6IiBmaWxsPSIjZmZmIi8+PGcgb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMjguNCA5MWMtMi41LS45IDE0LjcgMTAuMiAxOC4xLTEuNmwuNS01LjJjLjItMi42IDEuOC00LjMuNi05LjRzLTYuMS02LjYtMTAtNi4xQzQ5IDcwLjkgNDAuOCA5NC40IDI4LjQgOTF6TTEyNS43IDk1LjdjLTIuNC0uOCAxNC40IDkuNiAxNy42LTEuOWwuNC01LjFjLjItMi41IDEuNy00LjIuNC05LjJzLTYtNi4zLTkuOC01LjhjMTEuMSAyIDMuNSAyNS04LjYgMjJ6Ii8+PC9nPjxnIG9wYWNpdHk9Ii4xNiI+PHBhdGggZD0iTTE5IDg4LjRjLjggMS4xIDEuOCAyIDIuOSAyLjggMy42IDIuMSA0LjItMS40IDYuNS0uMiAyIDEuMSAxMS43IDggMTYuNCAxLjkuNy0xLjEgMS4yLTIuMyAxLjctMy41LTEgMS42LTQuOSAyLjctOC43IDIuMy01LjItLjUtOC4zLTQuNi0xMS41LTQuNC01LjQgMi4xLTcuMyAxLjEtNy4zIDEuMXpNMTE3LjggODguM3M1LjcgNi4yIDcuOSA3LjRjMiAxIDExLjYgNy42IDE2IDEuNWEyNiAyNiAwIDAwMS42LTMuNGMtLjkgMS42LTQuNyAyLjctOC40IDIuNC01LjEtLjMtOC4xLTQuMy0xMS4zLTQuMWEyNi4zIDI2LjMgMCAwMC01LjgtMy44eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzEyIj48cGF0aCBkPSJNNDIgNjYuNWMtMi4xLTQtNi42LTYuMi0xMS01LjUtOCAxLTEwIDQtMTIgOXM3IDE3IDcgMTdsNiA2YzEgMSAwIDcgNCA5czEzIDAgMTMtNC00LTUtNS0xOGwxLTktMy00LjV6TTExNCA2MS4xczE0LjMtNy40IDE5LjctMWM1LjQgNi40LTUuNSAxOC4xLTUuNSAyNC41IDAgNi40LjUgOS4zLTUuMyAxMi4xLTcuMSAzLjUtNi44LS43LTYuOC0uNy0xLjEgMCA2LjYtMTktMi4xLTM0Ljl6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNNDQgNzRjLTEtMi02LTctMTItNHMtMyAxMCAxIDE0YzIuMyAyLjMgNC44IDQuNSA3LjQgNi41TDQ0IDkyczMtMSAwLTVjLTIuMS0yLjktLjktNS44LjEtNy42bC44LTEuNUM0NSA3NyA0NSA3NiA0NCA3NHpNMTE4IDY5LjdjLjUtMiAzLjYtNi43IDcuMy0zLjggMy43IDIuOCAxLjkgOS42LS42IDEzLjQtMS40IDIuMi0zLjIgNS00LjYgNi4yLS43LjYtMi41IDEuMy0yLjUgMS4zcy4zLTEuNS41LTQuNmE0OC42IDQ4LjYgMCAwMC0uNC05LjdjLS4xLTEuMy0uMy0xLjYuMi0yLjh6Ii8+PHBhdGggZD0iTTQyIDY2LjVjLTIuMS00LTYuNi02LjItMTEtNS41IDEzIDQgMTQgMzIgMTMgMTlsMS05LTMtNC41eiIgb3BhY2l0eT0iLjEiLz48ZyBmaWxsPSIjMDEwMTAxIj48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTMxIDYxYy04IDEtMTAgNC0xMiA5czcgMTcgNyAxN2w2IDZjMSAxIDAgNyA0IDkgMS44IDEgNi42IDEuMSAxMC4yLS42IDMuNy0xLjggMy0zLjkgMi4xLTYuMyAxIDQuNy0xMi41IDguMy0xMy42LjZDMzMuOCA4OS43IDIyIDgwLjIgMjIgNzNjMC04IDQuOS04LjkgOS0xMnpNMTE4LjYgNTkuMnM5LjktMS40IDExLjYgNC40YzIgNi43LTMuOCAxMS43LTQuOCAxNi43UzEyNSA4NyAxMjQgOTJjLS40IDIuOC0yLjQgNS01LjEgNS45IDAgMCA5LjctMS4xIDkuMy05LjYtLjQtNy43IDEuOS0xMC4yIDMuNy0xMy45IDEuOC0zLjYgNS04LjkgMi4xLTEzLjgtMi42LTQuNy0xMi0yLjctMTUuNC0xLjR6Ii8+PC9nPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNDQgNzRjLTEuNS0yLjQtNi4xLTYuOC0xMi00LTYgMy0zIDEwIDEgMTQgMi4zIDIuMyA0LjggNC41IDcuNCA2LjVMNDQgOTJjLTEzLTcuMi0xOS4yLTI3LjIgMC0xOHpNMTE3LjkgNjkuNjg1Yy4xMjQtLjQ4IDMuMzg4LTcuMDk4IDcuMzkxLTMuODM3IDMuNjM0IDIuODc4IDEuODQ4IDkuNTkzLS42MTYgMTMuNDMtMS40MTYgMi4yMDYtMy4yNjQgNS4wODQtNC41NTcgNi4yMzUtLjc0LjY3Mi0yLjUyNiAxLjI0Ny0yLjUyNiAxLjI0NyA4LjE5Mi02LjcxNSAxMi4xMzQtMjUuOS4zMDgtMTcuMDc1eiIvPjwvZz48ZyBvcGFjaXR5PSIuNSI+PHBhdGggZD0iTTM5IDc1Yy0yIDAtNCAzLTIgNnM2IDMgNiAzLTEtLjkuNS0zLjVTNDEgNzUgMzkgNzV6TTEyMC45OCA3MC42NDVjMS4yMzIgMCAyLjQ2MyAyLjg3NyAxLjIzMiA1Ljc1NXMtNC4wMDQgMi44NzgtNC4wMDQgMi44NzggMC0xLjkxOS0uMTIzLTMuNTVjLS4zNy0yLjY4NSAxLjY2My01LjA4MyAyLjg5NS01LjA4M3oiLz48L2c+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTMiPjxwYXRoIGQ9Ik00Ni43IDY3LjJzLTguNC42LTkuOSA3LjdjMCAwLTguNS4xLTEyLjEgNi40TDE2IDg0LjlsLjIgMyAxNy40IDE4LjggMS40IDQuOXM0LjIgNC45IDkuMyA1LjZsNi43LTYuN3MtLjQtNS0yLjQtNS44LTcuMy0zLjUtOC4zLTMuNC02LTEyLjYtNi0xMi42IDEyIDYuNyAxNi42LTYuMmMwLS4xIDguOC0xNC44LTQuMi0xNS4zek0xMTcuMSA2N2wuNS4yYzMuMy45IDUuOCAzLjUgNi43IDYuOCAwIDAgOC41LS4xIDEyLjIgNmw4LjkgMy40LS4xIDMtMTYuOSAxOS4zLTEuMiA1cy0xLjEgMy02LjIgMy43bC05LjgtNC40cy4yLTUgMi4zLTUuOSA3LjItMy43IDguMi0zLjYgNS42LTEyLjggNS42LTEyLjgtNC40IDIuNi05IDEuN0MxMjAgNzggMTE4IDc0IDExNy4xIDY3eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PGcgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zNy43IDk2Yy44IDIgMS41IDMuMiAyLjMgNC42LTQuOCAxLTYuMiAzLTcgNS45bC00LTQuM2MxLjMtNC40IDQtNS44IDguNy02LjJ6TTEzMy4xIDEwMWMtMS42IDEuNS0yLjUgMi42LTMuNiAzLjgtMi41LTQuMi00LjgtNC43LTcuOS00LjRsMi43LTUuNGM0LjUtLjMgNi43IDEuNyA4LjggNnoiLz48L2c+PGcgZmlsbD0iIzAxMDEwMSI+PHBhdGggZD0iTTQ2LjcgNjcuMmM2LjMgMyA1LjEgMTQuNS0yLjEgMTMtLjQgMi45LTEuNSA3LjEtOS44IDYtMy4xLjgtNS43IDEuMi01LjcgMS4ybDkuMSAxNC44YzUuOSAxLjYgMTAuNSA0LjMgMTIuOCA4LjMgMCAwLS40LTUtMi40LTUuOC0yLS44LTcuNS0zLjUtOC41LTMuNS0xLS40LTUuOS0xMi42LTUuOS0xMi42czEyIDYuOCAxNi43LTYuMWMtLjEtLjIgOC44LTE0LjctNC4yLTE1LjN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMTcuNCA2OS40czQuOCAyLjggNS44IDYuOGMwIDAgNyAxIDkgNmwzIDEtMTEgMTktOCA1YTExIDExIDAgMDAtMyAzLjhsLTItMXMuMS01LjggMy4yLTYuMmMyLjYtMS4zIDYuNS0zLjQgNy42LTMuNCAyLjItNCAzLjctOC40IDUuMy0xMi43YTEzLjcgMTMuNyAwIDAxLTkgMS43YzEuMi03LjEuOC0xMy4xLS45LTIweiIgb3BhY2l0eT0iLjE1Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTQiPjxwYXRoIGQ9Ik0zMCA3MXM2LTUgMTAgMi0xIDEyLjEtMSAxMi4xIDExLjEgMTUuMyAxOS4yIDE2LjJjMCAwIDMuMy00LjkgMTAuMi0xLjUgNyAzLjQgMy44IDkuNSAzLjggOS41cy0yIDQtOSA0LTI0LjEtMTMtMzAuMS0yNUMyNyA3Ni4xIDI5IDczIDMwIDcxeiIvPjxwYXRoIGQ9Ik0zMCA3MXM2LTUgMTAgMi0xIDEyLjEtMSAxMi4xIDExLjEgMTUuMyAxOS4yIDE2LjJjMCAwIDMuMy00LjkgMTAuMi0xLjUgNyAzLjQgMy44IDkuNSAzLjggOS41LTQuMy03LjUtNy44LTYuNy0xNS4yLTYuMi0xMi0zLjItMjEuNi0xNC40LTIwLTE2LjggMCAwIDUuMy0xNC42LTctMTUuM3oiIG9wYWNpdHk9Ii4yIiBmaWxsPSIjMDEwMTAxIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTI2LjcgNTUuNmEyMiAyMiAwIDAwLTkuNyAxMyIvPjxwYXRoIGQ9Ik0zMCA1OS4yYTE3LjkgMTcuOSAwIDAwLTcuOSAxMC43IiBvcGFjaXR5PSIuNiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE1Ij48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0xMzkuNSA2MS41bC03LjQgMTMuMy0xMi44IDcuN3MtLjYgNC42LTEgNS45Yy0xLjEgNCAyMC4xIDIuMyAyMi4zLTEuN2wtMi44LTQuNyAxMS4yLTkuNmMxLjQtMi41LjktMy43LTEuOS0zLjRsLTEwLjkgOC4xIDYuOC0xMy40Yy42LTIuOC0yLTMuMy0zLjUtMi4yeiIvPjxwYXRoIGQ9Ik0xMTkuNCA4Mi40bDYuMy05LjhjLjgtLjkgMS44LTEgMy4xLS40YTE0Mi4yIDE0Mi4yIDAgMDA4LjIgNi41cy0uNiAyLjgtNC40IDJMMTI5IDgwcy42IDMuMS0zLjQgMy43LTYuMi0xLjMtNi4yLTEuM3pNMjUuOCA2My43TDM0IDc3LjNsMTQuNiA3LjZzLjYgNC44IDEgNi4xYzEuMiA0LjEtMjEuNiAzLTI0LTFsMS42LTUuMS0xMi43LTkuNmMtMS42LTIuNS0uOS0zLjggMi4zLTMuNWwxMi40IDguMS03LjUtMTMuN2MtLjYtMyAyLjMtMy42IDQuMS0yLjV6Ii8+PHBhdGggZD0iTTQ4LjQgODQuOGwtNy4xLTkuOWMtLjktLjktMi4xLTEtMy42LS4zIDAgMC0zLjkgMi42LTIuMSAxLjVTMjggODEuNiAyOCA4MS42cy42IDIuOSA1IDJsNC40LS45cy0uOCAzLjIgMy44IDMuOCA3LjItMS43IDcuMi0xLjd6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiPjxnIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMTE5LjQgODIuNGw2LjMtOS44Yy44LS45IDEuOC0xIDMuMS0uNGExNDIuMiAxNDIuMiAwIDAwOC4yIDYuNXMtLjYgMi44LTQuNCAyTDEyOSA4MHMuNiAzLjEtMy40IDMuNy02LjItMS4zLTYuMi0xLjN6TTQ4LjQgODQuOGwtNy4xLTkuOWMtLjktLjktMi4xLTEtMy42LS4zIDAgMC0zLjkgMi42LTIuMSAxLjVTMjggODEuNiAyOCA4MS42cy42IDIuOSA1IDJsNC40LS45cy0uOCAzLjIgMy44IDMuOCA3LjItMS43IDcuMi0xLjd6Ii8+PHBhdGggZD0iTTIyIDY0LjFjMS4zIDAgMi41LjggMyAxLjlsNi45IDEyLjkgMi4xLTEuNkwyNiA2NGEyLjggMi44IDAgMDAtNCAuMWMwLS4xIDAgMCAwIDB6TTE0OSA2OS4xYy4yIDEuMy0xLjIgMi0yLjIgMi43TDEzNiA4MGwxLjkgMS44IDExLjEtOS40Yy42LTEgMS4zLTIuNCAwLTMuM3pNMTQxLjMgNjFzLjUuOC0uNyAyLjdsLTcuMiAxMS43IDIuNSAxLjkgNy0xMy4zYzAgLjIgMS0yLjctMS42LTN6TTEzLjcxOCA3Mi44NjhjLjk5MS0uNDIgMi4wMDYuMjU4IDMuMDI0IDEuMTM3IDEuNzMgMS4zNjQgMTAuNzY0IDcuNjc3IDEwLjc2NCA3LjY3N2wyLjI3Mi0xLjM0OC0xMi45ODItOC41M2MtMS4zMDQtLjE3My0yLjc5OS4wNTgtMy4wNzggMS4wNjR6TTEzOS41IDg0LjlTMTI1IDkxIDExOCA4OGwuNCAxLjFzMy4zIDIuNSAxMi41IDEuMmMwIDAgOC4xLTEuMyA5LjEtMy4zbC0uNS0yLjF6TS0zMDQuNjU5IDcyLjg5OHMxNS41OTEgNy44NjkgMjIuNzQ2IDUuMjU4YzAgMCAuMjUuOTE1LS4yNiAxLjA4Ny0zLjM3MiAxLjIxNy02LjE3NCAxLjE2My0xNC4wMDEtLjM3IDAgMC03LjgyMi0xLjYzMi05LjM3Ny00LjMyMXoiLz48L2c+PHBhdGggZD0iTTQ4LjQgODQuOGwtNy4xLTkuOWMtLjktLjktMi4xLTEtMy42LS4zIDAgMC0zLjkgMi42LTIuMSAxLjVTMjggODEuNiAyOCA4MS42YzIuMy0xLjMgMTMuNS03LjIgMjAuNCAzLjJ6IiBvcGFjaXR5PSIuMSIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE2Ij48cGF0aCBkPSJNNDIuOCA2OC43YzEuNiAyLjMgMiA1LjEgMS4yIDcuN2wtLjQgMiA0LjMuMWMzIC45IDMuMiA4IC42IDEwLjItMS4xLjYtMi4xIDEuNC0zIDIuMmEyNSAyNSAwIDAxLTguNCA2LjNsLTMuMyAxLjRjLTYgMi40LTE3LjQgNS45LTE5LjMtNi41bC4zLTYuNmMuMi0zLjMtMS41LTUuNy44LTEyczguOC03LjMgMTMuNi02YzAgMCAuOC41IDIuNC0xLjdzOC4zLTMuMyAxMS4yIDIuOXoiIGZpbGw9IiNkOGQ4ZDgiLz48cGF0aCBkPSJNNDguNiA4OC45cy04LjMgNy4yLTExLjQgOC40Yy0yLjcgMS0xNi4yIDguMS0yMS0uNS0uNi0xLjUtMS4yLTMuMS0xLjUtNC43LjkgMi4yIDUuNyA0LjIgMTAuNiA0LjMgNi42LjMgMTEuMi00LjMgMTUuMy0zLjYgMi41LTEuNiA1LjItMi45IDgtMy45eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjE2Ii8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00MSAyMmwtMTYgOU00OSA1N0wyNyA3ME00NiAyN0wxOSA0Mk00OCAzNEwxNiA1Mk00MSA3MUwyOC41IDI3TTQ1IDY1TDMyIDIwTTM1IDcyTDI0IDM0TTQ5IDU4TDM3IDE3TTI4IDY4bC04LTI4TTUwIDQxTDE4IDU5TTUzIDQ3TDIxIDY1Ii8+PC9nPjxwYXRoIGQ9Ik01Mi41IDM1LjVjLTEuNy05LjItOS43LTE3LjgtMTcuOS0xOS40QzMzIDE1LjggMjAgNDEgMTIuMyA1My41YTUwIDUwIDAgMDA5LjIgMTVjOSAxNCAxMSAxNSAxMiAyOGwxIDEycy0xIDAtMSAyIDIgMyA0IDMgNC0xIDQtM2EyIDIgMCAwMC0yLTJsLTEtMTJzLS42LTIwLjIgOC0zMWM4LjUtMTAuNiA4LTE5IDYtMzB6bS0xOCA0OGwtNS0xMXMzIDQgOSAwbC00IDExem0tLjEtMTVjLTguOS43LTE3LjEtOC41LTE4LjktMjAuOUMyMiAzNiAzMCAyMyAzMS43IDE5LjVjOC45LjMgMTYuNiAxMC4zIDE3LjcgMjMuMSAxLjIgMTMuNS01LjYgMjUuMS0xNSAyNS45eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzQgMTYuNGMzLjIuMiA1LjggMi41IDggNC42IDYgNiA4IDEwIDkgMjFzLTMuNSAyMC41LTcuNSAyNC41LTE0IDYtMTQgNmE4IDggMCAwMDUgMWMxLjQtLjMgMi44LS44IDQuMS0xLjRsMi45IDIuNGMxLjYtMy41IDMuNS02LjkgNS44LTEwYTI5IDI5IDAgMDA2LjQtMTkuNGMtLjMtOS0zLTI0LjYtMTkuMi0yOXpNMzcgMTAzLjVsLjUgN3MuNyAyLjItMS4xIDIuNiA2LjEuNCA1LjEtMi42YTIgMiAwIDAwLTItMmwtLjQtNC44LTIuMS0uMnoiLz48L2c+PHBhdGggZD0iTTM1LjEgOTguMWMtNS42IDIuNC0xOC40IDcuMi0yMC40LTYuMWwuNC02LjdjLjItMy4zLTEuNS01LjcuOC0xMnMyLjQtNi40IDEzLjYtNmMxMC4zLjMgNS4zIDE2LjMgNy4yIDI3LjEgMCAxLjEtLjcgMy4zLTEuNiAzLjd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM3LjIgOTcuMmMzLjItLjctMjAuMiAxMC4zLTIyLjUtNS4ybC4zLTYuNmMuMi0zLjMtMS41LTUuNy44LTEyczguOC03LjMgMTMuNi02Yy0xNC44LjktOC40IDMxLjkgNy44IDI5Ljh6IiBvcGFjaXR5PSIuMDUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE3Ij48ZyBmaWxsPSIjNDIyMTBiIj48cGF0aCBkPSJNNTQuNyA3NC40cy0xMS42LS40LTEzLjMtMi43LTUuOCA2LjQtNS44IDYuNC00LjcgNC43LTguNSA0LjRhNjAuOCA2MC44IDAgMDEtMTEuMy01LjhsOS44IDEwLjcgOS4zLjYgMi41LTIuNC0xLjcgOC41IDEuNyA5LjEuNi05IDUuNS0xMi43IDQuNy4zIDIuMSAzLjIgMi4zLjJjLjIuMSA1LjEtMy41IDIuMS0xMC44ek0xMTkuMSA3Ni4yczYuOCA0LjcgMTAuNSA0LjRjMi40LS4yIDExLjQtNS44IDExLjQtNS44bC05LjggMTAuNy05LjMuNi0yLjUtMi40IDEuNyA4LjUtMS43IDkuMS0uNi05LTEtMi40YTQ1LjMgNDUuMyAwIDAwMS4zLTEzLjd6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii43Ij48cGF0aCBkPSJNMTQxLjIgNzQuOGwtOS44IDEwLjctOS4zLjYtMi41LTIuNCAxLjcgOC41LTEuNyA5LjEtLjYtOS0xLjEtMi40IDEuNC04LjQgNi4zIDEuOWM1LjYuNSAxMC42LTMuOSAxNS42LTguNnpNMTUuNiA3Ni44bDkuOCAxMC43IDkuMy42IDIuNS0yLjQtMS43IDguNSAxLjcgOS4xLjYtOSA1LjUtMTIuNyA0LjcuMyAyLjEgMy4yIDIuMy4yYTguNCA4LjQgMCAwMDIuOS01LjhjMC0uNS0xMy4xLTEuNS0xMy4xLTEuNWwtMTEgNy41Yy01LjYuNC0xMC42LTQtMTUuNi04Ljd6Ii8+PC9nPjxwYXRoIGQ9Ik0yNi44IDYxLjFzLTIuNiAxNy43IDEwLjYgMTYuMmMwIDAgMTAuMy05LjQtMTAuNi0xNi4yek0zMyAxMTIuN3MxMi41LTYuNiA1LjQtMTQuNGMtLjEuMS0xMC45LTIuMS01LjQgMTQuNHoiLz48cGF0aCBkPSJNMjYuMyA5NnMxMS4xIDQuNiAxMi4zLTQuM2MuMS4xLTQuNC04LjItMTIuMyA0LjN6TTExLjEgNzYuOHM3LjYgMTEgMTQuMSAzLjRjMCAwIC44LTEwLjQtMTQuMS0zLjR6TTEyOS4yIDYzLjFzMiAxMy41LTguMSAxMi40YzAgMC03LjktNy4yIDguMS0xMi40ek0xMzAuNSA5NHMtMTEuMSA0LjYtMTIuMy00LjNjMCAuMSA0LjQtOC4yIDEyLjMgNC4zek0xNDYuOSA3NC42cy04LjIgMTEuOC0xNS4yIDMuN2MwIDAtLjktMTEuMiAxNS4yLTMuN3oiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTI2LjggNjEuMXMtMi42IDE3LjcgMTAuNiAxNi4yTDI2LjggNjEuMXpNMzMgMTEyLjdzMTIuNS02LjYgNS40LTE0LjRMMzMgMTEyLjd6TTI2LjMgOTZzMTEuMSA0LjYgMTIuMy00LjNMMjYuMyA5NnpNMTEuMSA3Ni44czcuNiAxMSAxNC4xIDMuNGwtMTQuMS0zLjR6TTEyOS4yIDYzLjFzMiAxMy41LTguMSAxMi40bDguMS0xMi40ek0xMzAuNSA5NHMtMTEuMSA0LjYtMTIuMy00LjNsMTIuMyA0LjN6TTE0Ni45IDc0LjZzLTguMiAxMS44LTE1LjIgMy43bDE1LjItMy43eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE4Ij48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTE2LjQgOTYuMmMtMi43IDcuOCAxMi44LS4zIDEyLjUtMS4yLS45LS45LTQuMi0xLjItNC4yLTEuMmEzNSAzNSAwIDAwNi41LS42YzMuNi0uNiA1LjYtMy4zIDUuMy00LjJzLTUuMy0xLjItNS4zLTEuMmMyLjQgMCA0LjgtLjQgNy4xLTEuMiAzLTEuMiA0LjgtMy42IDMuNi00LjJhOCA4IDAgMDAtMy0uNmMzLjMtLjMgNy4xLTMgNy43LTQuOHMtMi40LS42LTIuNC0uNmMtNy4xIDEuMi0xNi45LTMuOS0xNi45LTMuOXMtLjYtMy0yLjQtMy42LTIuNC0uNi00LjIgMi40Yy0uNC42LTEgMS4yLTEuNiAxLjdsLS41LjRjLjkgNy45LjEgMTUuNi0yLjIgMjIuOHptLTcyLjYgMS4xYy03LjkgMy45LTEzLS40LTEyLjctMS40LjktMS4xIDQuMi0xLjQgNC4yLTEuNGEzNiAzNiAwIDAxLTYuNi0uN2MtMy42LS43LTUuNy0zLjktNS40LTVzNS40LTEuNCA1LjQtMS40Yy0yLjUgMC00LjktLjUtNy4yLTEuNC0zLTEuNC00LjgtNC4zLTMuNi01IC45LS41IDItLjcgMy0uNy0zLjMtLjQtNy4yLTMuNi03LjgtNS43czIuNC0uNyAyLjQtLjdjNy4yIDEuNCAxNy4yLTQuNiAxNy4yLTQuNnMuNi0zLjYgMi40LTQuMyAyLjQtLjcgNC4yIDIuOFM1MiA3Ny4xIDUyIDc3LjFsNS41IDEuNHM2LTEgMyAyLTQgMi02IDQtMi4zIDguNy0xMC43IDEyLjh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTUzIDgycy0xMi00LTE2LTctMTggMS0xOCAxIDYgNCAxMSA0bC04IDJzNyA2IDEzIDVsLTcgM2MzLjUgMi41IDcuOSAzLjIgMTIgMmwtMyA0czcgMyAxMy03IDctNyAzLTd6bTY2LjItMi44YzEuNS0uNiAyLjktMS40IDQuMi0yLjMgMy42LTIuNyAxNiAuOSAxNiAuOXMtNS4zIDMuNi05LjggMy42bDcuMSAxLjhzLTYuMiA1LjMtMTEuNiA0LjRsNi4yIDIuN2MtMy4xIDIuMi03IDIuOC0xMC43IDEuOGwyLjcgMy42Yy0yLjEuNy00LjUuNC02LjQtLjggMi4xLTUuOSAyLjEtOC45IDIuMy0xNS43eiIgb3BhY2l0eT0iLjA1Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xOSI+PGVsbGlwc2UgY3g9IjQ3LjUiIGN5PSI4MSIgcng9IjkuNSIgcnk9IjE1Ii8+PHBhdGggZD0iTTU3IDgxYzAgOC4zLTQuMiAxNS05LjUgMTVTMzggODkuMyAzOCA4MXM0IDAgMTkgMHoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIi8+PGVsbGlwc2UgY3g9IjQ0LjUiIGN5PSI4MSIgcng9IjkuNSIgcnk9IjE1Ii8+PGVsbGlwc2UgY3g9IjQ0LjUiIGN5PSI4MSIgcng9IjkuNSIgcnk9IjE1IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik00OSA4MC41YzAgNC43LTIuNCA4LjUtNS40IDguNWwtNC41LjFjLS41LTIuOC0uOC01LjctLjktOC42IDAtMi42IDEuOS04LjUgMS45LTguNWgzLjVjMyAwIDUuNCAzLjggNS40IDguNXoiLz48ZWxsaXBzZSBjeD0iMzkuOSIgY3k9IjgwLjUiIHJ4PSI1LjQiIHJ5PSI4LjUiLz48cGF0aCBkPSJNNDQgODlsMTUgMTcgMTcgNSAxLTItMTYtNS0xNS0xN3MtMy0xLTIgMnoiLz48ZyBmaWxsPSIjMDEwMTAxIj48ZWxsaXBzZSBjeD0iMzkuOSIgY3k9IjgwLjUiIHJ4PSI1LjQiIHJ5PSI4LjUiIG9wYWNpdHk9Ii40Ii8+PHBhdGggZD0iTTQ0IDg5bDE1IDE3IDE3IDUgMS0yLTE3LTQtMTUuOC0xOGMtLjQuMy0uNi45LS4yIDJ6IiBvcGFjaXR5PSIuMSIvPjwvZz48cGF0aCBkPSJNNzQuNCAxMDYuNGwxMi41IDMuNGMxLjMuNCAyLjEgMS43IDEuOCAzLjFhMi42IDIuNiAwIDAxLTMuMSAxLjhsLTEyLjUtMy40YTIuNiAyLjYgMCAwMS0xLjgtMy4xIDIuNSAyLjUgMCAwMTMuMS0xLjh6IiBmaWxsPSIjMjMxMTAwIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8yMCI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNDAuNSA3NGE2LjggNi44IDAgMDEtNS41LTNjLTMtNS0xNi0xMS0yMS0xMXMzIDguNSAzIDguNSAwIDEuMiAyIDIuNGMyIDEuMyA0IDEuMyAyIDEuM3MtMyAwLTIgMi40IDQgMi40IDQgOC41LTEwIDEzLjQtOCAxNC42YzIgMS4yIDctMS4yIDExLTQuOSA0LTMuNiA4LTEzLjMgMTQtMTIuMSA1LS43IDMuMy02LjUuNS02Ljh6TTUzLjQgODEuNnMxOS4yIDQuNiAxNS41IDYuMi0yMC42IDYuNS0yOSAxLjUtMS4zIDIuNyAxMy41LTcuN3pNMTE5LjQgODAuNGEzNSAzNSAwIDAxLTIuMyAxMC40czE2LjYtMy44IDIwLjgtOC40YzcuMS03LjkgMi42IDItMTguNS0yeiIvPjwvZz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTI4IDg0LjFDMjUgOTEgMTMgOTYuNSAxNSA5Ny43YzIgMS4yIDctMS4yIDExLTQuOSA0LTMuNiA4LTEzLjMgMTQtMTIuMSAzLjMtLjUgMy43LTMuMiAyLjctNWEyIDIgMCAwMC0xLjktMS4xQzQzIDc5IDMwIDc4IDI4IDg0LjF6TTY1LjYgODUuMXM0LjcgMiAzLjMgMi43Yy0zLjYgMS41LTIwLjYgNi41LTI5IDEuNWwtMy4yLTEuNmM3LjQgNC4xIDMzLjEtMS41IDI4LjktMi42eiIvPjwvZz48cGF0aCBkPSJNMjIgNjZzNSAwIDEwIDUgMiA2IDIgNi03IDItOCA3IDMtMTQtNC0xOHpNNTMuNiA4MS41bDEyIDMuNGMtNy41IDIuMi0xNiAzLTI1LjQgMi45IDAgMCA3LjktMi40IDEzLjQtNi4zek0xMTkgODAuNGwtLjcgNnMxMi4xLTMuMSAxOC41LTUuNGMwIDAtOS44IDEtMTcuNy0uNnoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzIxIj48cGF0aCBkPSJNMTMwLjggNjNjLTIuMy0yLTE1LjctLjUtMTUuNy0uNWwuOSAxLjkgMi4zIDQuOWMyLjUtMS4xIDUuMi0yIDcuOC0yLjQgMCAuMSAxLjkgMTkuMS0uMSAyMS4xcy04LjQgMy4zLTguNCAzLjNMMTE3IDkzbC0xIDIuNlMxMzMgOTcgMTMzIDg1Yy43LTE2LjMuNi0xOS42LTIuMy0yMnpNMjQuNiA2Ny45cy00LjcuMy02LjUgMS4zYy0uNS4yLS40IDEgLjIgMS41IDMuNyAyLjggNi41IDYuNiA4IDExIDMuNCA4LjUgMy40IDE2LjcgMTMuOCAyMC40IDEwLjQgMy43IDE0LjggMCAxNC44IDBTNjIgOTMgNTQgODQuMmMwIDAtMS42LTEuNi00LjctLjYtMy42IDEuMi03LjUgMS45LTExLjYtNS43LTQuMi03LjUtNi4yLTEwLjktMTMuMS0xMHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxnIGZpbGw9IiNmZmYiPjxlbGxpcHNlIGN4PSIyNC43IiBjeT0iNjkuNiIgcng9IjYuNSIgcnk9IjEuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTMuNSAyNC43IDY5LjcpIiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik00NS40IDg1YzUuMiAxIDkgLjEgMTAuNSAxLjgtLjUtLjktLjktMS40LTEuOS0yLjYtLjEtLjEtMi0xLjYtNC42LS42LTEwLjkgNC0xMS42LTkuNS0xNy42LTE0LjEgNi4xIDcuMSA1LjcgMTQgMTMuNiAxNS41eiIgb3BhY2l0eT0iLjMiLz48cGF0aCBkPSJNMTE1LjEgNjIuNXMxNC42LTEuNyAxNi4xIDFjLTIuMy0uOC02LS40LTguOCAwbC02LjQuOHoiIG9wYWNpdHk9Ii40Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik0xOS44IDcyYzQuNyA0IDUuOSA3LjkgNi42IDkuNyAzLjMgOC41IDMuMyAxNi43IDEzLjcgMjAuNCAxMC40IDMuNyAxNC44IDAgMTQuOCAwczUuMy02IDEuNy0xNGMwIDAgMy45IDExLTcuOSAxMS01LjQtLjEtMTAuNS0uOS0xNC41LTYtNS4zLTYuOC03LjgtMTktMTQuNC0yMS4xeiIgb3BhY2l0eT0iLjE2Ii8+PGVsbGlwc2UgY3g9IjI0LjkiIGN5PSI2OS42IiByeD0iNC44IiByeT0iLjkiIHRyYW5zZm9ybT0icm90YXRlKC0zLjUgMjQuOSA2OS43KSIgb3BhY2l0eT0iLjM1Ii8+PHBhdGggZD0iTTI5LjggNjkuM2MuNS45LTQuOCAxLjItNC44IDEuMi40LTEuMS4zLTEuNy0uMS0xLjcgMCAwIDQuNC0uMyA0LjkuNXoiIG9wYWNpdHk9Ii4zNSIvPjxwYXRoIGQ9Ik0xMjYuMSA2Ni45UzEyOCA4NiAxMjYgODhzLTguNCAzLjMtOC40IDMuM0wxMTcgOTNzOC44LTEuMiAxMS00LjEgMS0xNy45IDEtMTcuOS4zLTUuMy0yLjktNC4xeiIgb3BhY2l0eT0iLjUiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzAxIj48cGF0aCBkPSJNOTUuNCA0OS45UzkyIDYwIDgxIDUzYy4zIDMuOC0xLjYgNS41LTYgNSAwIDAtMyA5LTcgMy0uOSAxLjMuNiA3LjItNyA0LTEuNiA1LjYtNS42IDYuNy0xMSA1IDAgMC0xNSAxLTEwLTkgMCAwLTE1LTkgMi0xMiAwIDAtNS0yMiAxNS0xNyAwLTUgMTIuOS0yMi4zIDMyLTUgMCAwIDE1LTEzIDIyIDYgMCAwIDE1IDIgOCAxNiAxLjktLjggMTIuMiAzLjcgNSAxMiAxLjkgNS4zLS4yIDcuMy01IDcgMCAwIDMgMi0uNCA0LjUgMCAwLTYuNi0yLjUtNi42LTkuNS00LTEuMS01LjYtMy44LTMuOC04LjkgMCAwLTEwLjMgNi44LTEyLjgtNC4yeiIgZmlsbD0iIzQyMjEwYiIvPjxwYXRoIGQ9Ik02OC41IDM5LjVTNTIgMzQgNTQgNTFjLTEyIDItMyAxMy0zIDEzcy0xNC41LTEyLjUtMS40LTEzLjRjMCAwLTQuNC0xOC40IDEzLjEtMTQgMC00LjQgNy44LTIwLjQgMjQuNS01LjJDNzQgMjkgNzEgMzAgNjguNSAzOS41eiIgb3BhY2l0eT0iLjA1IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg5IDI3czE1LTEzIDIyIDZjMCAwIDE1IDIgOCAxNiAxLjktLjggMTIuMiAzLjcgNSAxMiAxLjkgNS4zLS4yIDcuMy01IDcgMCAwIDMgMi0uNCA0LjUgMCAwLTYuNi0yLjUtNi42LTkuNS00LTEuMS01LjYtMy44LTMuOC04LjktNS4yIDQuOS0xMy44LjYtMTIuNy00LjQgMCAwIDcuOC43IDcuNy02LjVDMTA1IDM1IDk1LjUgMjYuMiA4OSAyN3oiIG9wYWNpdHk9Ii41Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzAyIj48cGF0aCBkPSJNNzUuOSAyNy44Yy4xIDIuMi0yLjcgNS40LTIuNyA1LjRzLTEuNS0yLjgtMy42LTMuOC00IDEtMyAxLjVsMiA0LjctMi42LjFhOSA5IDAgMDEtNy45LTEwIDkgOSAwIDAxMTAtNy45IDkgOSAwIDAxNy44IDEweiIvPjxwYXRoIGQ9Ik03NS45IDI3LjhjLjEgMi4yLTIuNyA1LjQtMi43IDUuNGwtMS42LTIuN2MxIDAgMy42LTcuMyAyLjEtOS43YTkgOSAwIDAxMi4yIDd6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNjYgMzFzMy43IDUuNyA0LjggMTAuM2MuNiAyLjIgMSA0LjQgMS4yIDYuNyAxIDQgOCAyIDgtMSAwIDAtNi4xLTEzLjktOS0xNy0yLjYtMy45LTYuMi0xLjItNSAxeiIgZmlsbD0iIzkzNTA1YyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wMyI+PHBhdGggZD0iTTgwLjUgNDIuOVM3NyAyNS4xIDczLjMgMjAuM2MtLjItLjItMS43LS41LTQuMS42bC0uMi4yczIuNiAyLjYgOSAyMS44YzAgMCAyLjUgMS4zIDIuNSAweiIgZmlsbD0iIzgyNTEwNSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC00LjYgNzEuMiAyMC42KSIgY3g9IjcxLjIiIGN5PSIyMC42IiByeD0iMi4yIiByeT0iLjUiIGZpbGw9IiNmNGIxNDUiLz48cGF0aCBkPSJNNzcuMiA0MS4zcy43LS4xIDEuMi0xLjRjLjUtMS45LS41LTMuOC0yLjQtNC40LTItLjUtMi45LTIuNC00LjMtNC4ycy02LjQtNC43LTE0LjktNC41LTEwLjItMy0xMC45LTMuNi0uOCA2IDMgMTAuOSA5LjMgOC4zIDE1LjYgNS4xIDkuMi0uMiA5LjItLjIgMi4yIDIuNCAzLjUgMi4zeiIvPjxwYXRoIGQ9Ik03Ny4yIDQxLjNzLjctLjEgMS4yLTEuNGMuNS0xLjktLjUtMy44LTIuNC00LjQtMi0uNS0yLjktMi40LTQuMy00LjItMS40LTEuOC02LjQtNC44LTE0LjktNC41LTkuOC4zLTExLjItNC43LTExLTMuNCAzIDExLjUgMjIuOSA0LjIgMzEuNCAxNy45eiIgb3BhY2l0eT0iLjIiIGZpbGw9IiMwMTAxMDEiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMDQiPjxwYXRoIGQ9Ik0zMy42IDU5LjhMNjggMjFzMi4xLTMgNi40IDBjNC4zIDMgNDQuNSAyNy40IDQ0LjUgMjcuNCAxLjUgMSAxLjEgMiAxLjMgMi44LS4zIDEuMy03LjUtOC4yLTQ2LjgtMy44QzM0IDUyLjkgMzMuMSA2MS44IDM0LjEgNjIuOHMtLjUtMS0uNS0zeiIgZmlsbD0iIzkzNTA1YyIvPjxwYXRoIGQ9Ik0zMy42IDU5LjhMNjggMjFzMi4xLTMgNi40IDBjLTMuMi0xLTIzLjMgMjcuNS0yNyAzMS44LTEzLjcgNC41LTE0IDkuMi0xMy4yIDkuOSAxIDEuMS0uNi0xLS42LTN6IiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNNDIuOSA2NC42Yy0uMy0xMCA2NC40LTE2LjMgNjcuNS04LjUgMi42LjggMTUuOS00LjggNi40LTcuMnMtMjUuMS01LjktNTcuNi45LTI1LjkgMTMuNy0yNS45IDEzLjcgNy45IDIuNCA5LjYgMS4xeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNSI+PHBhdGggZD0iTTUwLjggMzIuNXMyLjQgNiA1LjQgNC44IDQ4LjEtMS43IDQ4LjEtMS43bDQtNC43czcuNy01LjEgNC4xIDMuM2wtMi4xIDMuNmMtLjYgMS0xLjEgMi4yLTEuNCAzLjQtLjEgMS40IDEuNy0yLjggMS43LTIuOGwzLjggNi4xczIuNSA0LjYtMS44IDQuMi03LTMuNS04LjMtNS4xbC00OC4xIDEuN3MtNi41IDguMi05LjQgNy45LTIuNi0zLjEtLjctOC44YzAgMCAxLjctMi44IDEuOC00LjJTNDYuMyA0MyA0Ni4zIDQzcy0zLjMtNy42LTMuNi05Yy0uNy0zLjcgMy4zLTkuMSA4LjEtMS41eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuMSAyOS41czIuMyAxLjEtLjkgNS4yLTYuMyA1LjMtLjcgOC43IDQuMy40IDQuMy40bC0zLjItNS4zYzAtLjEgNi4yLTEwLjEuNS05ek00OC40IDQwLjZzMy4yLS43IDEuNy42LTQuMyA1LjIgMy43IDIuNCA0Ny4yLTIuNyA0Ny4yLTIuN2wyLjggMi4zLTQ3LjUgMnMtNS44IDctOC43IDYuOC0uNy03LS43LTdsMS41LTQuNHoiIG9wYWNpdHk9Ii4xNCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNiI+PHBhdGggZD0iTTQ2LjggNTMuNFMzNCA0OSAzNiAzN2MyLTExIDE0LTEwIDE0LTEwYTEyIDEyIDAgMDExMi05YzEwIDAgMTUgNiAxNSA2czEtNyAxMS03YzUuOC0uMSAxMS4xIDMgMTQgOCAwIDAgMTMtMyAxNyA2cy0xNC4xIDE1LjMtMTQuMSAxNS4zLTcuOS05LjMtNi40LTkuOGMwIDAtNC41IDcuNS0xNy41LjUgMCAwLTcgMTAtMTcgNCAwIDAtNyA3LjctMTUgMi44bC0yLjIgOS42eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00OCAzOXMxMyA2IDE2LTVjMCAwIDE1IDQgMTgtNCAwIDAgMTAgNyAxOCAyIDAgMCA0LjQgMTIuMSA5LjcgOS4xQTI1LjUgMjUuNSAwIDAxMTA0IDQ0bC01NiAzcy0zLjctLjItNC44LTEuMWMwIDAgNS44LS45IDQuOC02Ljl6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik00NC4yIDYyLjhjMS0uOCAyMy45LTE5LjIgNjYtNy4xIDAgMCAzLjggMSAzLjgtMS43bC00LTMuNnMtMTAtOS0xMS0xNC40YzAgMC05IDYuMy0xNy0uOSAwIDAtNSA5LTE4IDUuNCAwIDAtNSA4LjEtMTUgMi43IDAgMC0zIDE1LjMtNSAxNy4ycy4yIDIuNC4yIDIuNHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDUuNSA2MC4yQTQ4LjIgNDguMiAwIDAxNjggNTBjMTgtNCAzOS4xIDEuNiAzOS4xIDEuNnM1LjkgMS4xIDUuOSAzLjMtMyAuMi0zIC4yYy0yNC4zLTUuMy00Ny43LTUuNi02NiA4IDAtLjEtMS0uNyAxLjUtMi45ek02NCA0MHMxIDguNi0xIDEwYzAgMCAwLTguNiAxLTEwem0tMTQuNiAzcy4zIDEwLjQtMS44IDEyYzAgMCAuNy0xMC4zIDEuOC0xMnptMzIuNS03LjNhMjggMjggMCAwMC4zIDcuMWMuOCA0LjIgMi45IDQuNSAyLjkgNC41LTEuNS41LTMuNi0xNS4zLTMuMi0xMS42em0xNy44IDNjLjcgMi4zIDEuNiA0LjQgMi44IDYuNSAyIDMuNiAzLjYgMy4yIDMuNiAzLjItLjkuOS04LTEzLTYuNC05Ljd6IiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNyI+PHBhdGggZD0iTTQwLjEgNzguM1M1MiA1NS42IDg0LjQgNTQuOGMyOC4yLTEuOSAzMy42IDE2LjEgMzMuNiAxNi4xIDMzLjEtMjUgMi44LTM4LjkgMi44LTM4LjlhMjIuMyAyMi4zIDAgMDEtMTQuMyAxNy40Qzc2LjQgNTYuNyA1OSA0Mi44IDU5IDQyLjhzLTEwLjUtMTIuMS0yMS4yLTkuMmMtLjEuMy0xMC4yIDEuNS0xMi40IDE1LjVhMjYuNCAyNi40IDAgMDAxNC43IDI5LjJ6IiBmaWxsPSIjNzQzYTRiIi8+PHBhdGggZD0iTTQwLjkgMzNjLTIuNy40LTUuOC44LTUuOCA2LjIgMCAyLjcgMy4yIDUuOSA3LjYgOC42IDQuNCAyLjcgOS4zIDQuNyAxNC4zIDUuOWw2LjQgMS4yYzEzLjctMi44IDI1LjktNC44IDM3LjktLjkgMCAwIDMxLjgtMTIuOCAyMS4zLTIwLjgtNC4yLTMuOC0xMS40IDEuOC0xNi43IDUtMy40IDItNS45LjktNS45LjlzLTEuMi03LjctMi0xMC4yYy0yLTYuNi01LjgtMTMuOC0yMy44LTEzLjhTNTguOSAyNi4zIDU4LjkgMjYuM2wuMSAxMy4yYy0xLjcgMC00LjQtMS4xLTcuNy0zLjEgMCAwLTUuNS0zLjctMTAuNC0zLjR6IiBmaWxsPSIjOTM1MDVjIi8+PHBhdGggZD0iTTM5LjYgNzcuN3MxNS0yMi45IDQ0LjMtMjMuNWMyOS4zLS42IDM0LjIgMTYuMSAzNC4yIDE2LjFMMTIzIDY3cy0xOS0xNy4zLTQwLTE1Yy0zNC44IDIuMy00OC41IDIxLjktNDguNSAyMS45eiIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNODIgMTUuOFM1OS43IDExIDU4LjggMjQuMmwuNCAxNWMzLjQuMiA2LjggMCAxMC4xLS42VjI1LjRjLjEgMC0xLjQtOS43IDEyLjctOS42eiIgZmlsbD0iIzc0M2E0YiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wOCI+PHBhdGggZD0iTTEyMy45IDQzLjhjLTUgMS4yLTcuMiA0LjgtMTMuNyA1YTQuNiA0LjYgMCAwMS0yLjktMS43bC0xLTEuN3MtMS43LTE0LjctMi45LTE3LjFjLTMuMS02LjQtNC0xMC4zLTMyLjItMTAuMy0yLjUtLjItNS4xIDAtNy42LjUtOC44IDEtMTYuNSA0LjQtMTMuNiAxMy42YTgxIDgxIDAgMDAzLjkgMTYuMmMtLjYgMS0xLjUgMS45LTIuNSAyLjRsLTEuNy42Yy0zIC42LTcuNS0uMi0xMi45LTEuNi0xMS4xLTIuOC0xMC43IDYuNC04LjQgOS41IDIuMyAzLjEgNy4zIDQuNSAxNS41IDIuMSAxMS4yLTMuNCAyNy41LTcuNSA0MS04LjMgMTUtLjYgMjUuMiAxIDMyLjIgMy40IDYuNSAyLjIgMTYuMy0xLjggMTYuMS01LjctLjItMy45LTQuMy04LjEtOS4zLTYuOXoiIGZpbGw9IiMyNDQyNWIiLz48cGF0aCBkPSJNNTguMSA1Ny4zYzguNy0yLjYgMTcuNi00LjIgMjYuNy00LjggMTYuMS0uOCAzMy43IDMuOSAzMy43IDMuOSAyLjEuNyA0LjUuOCA2LjYuMSAwIDAtMjQuMS05LjUtNDAuOS04LjItOC40LjctMjQuOSA1LTI0LjkgNXMtMTkuOCA2LjQtMzAuOSA2LjNjLjIuMiAzLjIgNy42IDI5LjctMi4zeiIgb3BhY2l0eT0iLjE1Ii8+PHBhdGggZD0iTTUxLjQgMzguOXMzMy4zLTEzLjIgNTMuNS00bDEgNy40cy0xMS41LTgtNTIuNyAzLjRsLTEuOC02Ljh6Ii8+PHBhdGggZD0iTTgzLjUgMTkuMVM0NCAxMyA1MCAzMi4xYzEgNi43IDIuOCAxMy4yIDUuMyAxOS40IDAgMCAxMi43LTIuMSAxOC4yLTQuMmwtNC44LTE2LjJjMCAuMS0zLjctMTEuMSAxNC44LTEyeiIgb3BhY2l0eT0iLjE1Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzA5Ij48cGF0aCBkPSJNNDMuOCA2Mi4zYy0yLjguNy0zLjUtMS42LjItNS4zYTU1LjQgNTUuNCAwIDAxMzktMTRjMjQgMSAzMSAxMCAzMSAxMHM0IDUtMi40IDMuN2MwIDAtMzEtMTQuMS02Ny44IDUuNnoiIGZpbGw9IiM3NDNhNGIiLz48cGF0aCBkPSJNNDUuNSA2MC4yQTQ4LjIgNDguMiAwIDAxNjggNTBjMTgtNCAzOS4xIDEuNiAzOS4xIDEuNnM1LjkgMS4xIDUuOSAzLjMtMyAuMi0zIC4yYy0yNC4zLTUuMy00Ny43LTUuNi02NiA4IDAtLjEtMS0uNyAxLjUtMi45eiIgb3BhY2l0eT0iLjIiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMjMuOSA5NCAzNy4zKSIgY3g9Ijk0IiBjeT0iMzcuMyIgcng9IjE0LjgiIHJ5PSIxNi45IiBmaWxsPSIjYzFjMWMxIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTI0LjMgOTQuNyAzNi4yKSIgY3g9Ijk0LjciIGN5PSIzNi4yIiByeD0iMTQuMSIgcnk9IjE2LjIiIGZpbGw9IiNlZmVmZWYiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMTcuMSA5NS40IDM2LjcpIiBjeD0iOTUuNCIgY3k9IjM2LjciIHJ4PSIxMS41IiByeT0iMTMiIGZpbGw9IiNmZmYiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMTcuMSA5Ni4xIDM2LjUpIiBjeD0iOTYuMSIgY3k9IjM2LjUiIHJ4PSIzLjUiIHJ5PSI0Ii8+PHBhdGggZD0iTTkzLjIgMzQuMmE3IDcgMCAwMTMuNiAyLjJjMS41IDEuNy44IDQtMS4yIDMuOSAzLjQuNyA0LjYtMi43IDMuMy01LjkgMCAwLTIuNS00LjEtNS43LS4yeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjMiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTAiPjxwYXRoIGQ9Ik00NC42IDYyQzU1LjEgNDUgNjMuOSAyOC43IDY3IDE1YzMuOC0xLjMgMjQuMyAxOCA0MiAzOC41IDAgMC0yOS4xLTMxLjktNjQuNCA4LjV6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNNjggMTVjOC40IDQuOCAyNS4yIDIyLjUgNDEgMzguNS05LjktOC43LTE3LjktMTIuNC0yNC43LTEyLjhMNjggMTV6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMTMuNyAzNy45czExIDUgMTAgMTItMTAgNS0xMC0xLTMtMTAgMC0xMXpNMTE1LjIgMzMuOHM0LjItMS40IDUuNy43YzEuNSAyLTEuNCAzLjgtMi45IDIuMi0xLjUtMS42LTMuMy0yLTIuOC0zek00OC44IDI1LjVzLTEwIDQuNS05LjEgMTAuOSA5LjEgNC41IDkuMS0uOSAyLjctOS4xIDAtMTB6TTMzLjUgNDYuOHMuNyA1LjYtMi40IDYuOS00LjQtMi44LTItNC4yIDMuMy0zLjYgNC40LTIuN3oiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTEiPjxwYXRoIGQ9Ik04MS4xIDMzLjhzNi43IDIuNCA0LjQgNC44LTQuOS0zLjgtMTYuNy0xLjJTNDIgNDIgNDEgNzIuNGwxNi4xIDMuMXMtMy4zLTEyLjEgNi43LTEyLjFWNTEuM3MyMCAxMC45IDMzLjQgNiAyNy44LTM2LjIgMy4zLTM5LjktMTkuNCAxNi40LTE5LjQgMTYuNHoiIGZpbGw9IiM0NDJhMTYiLz48cGF0aCBkPSJNNDEgNzIuNGwxNi4xIDMuMXMtMy4zLTEyLjEgNi43LTEyLjFjMCAwLTEwLTEwLjkgMC0xMi4xczIwIDEwLjkgMzMuNCA2IDI3LjgtMzYuMiAzLjMtMzkuOWM5LjIgMTMuOSA2LjIgMjEtNi4xIDI1LjktMTAuOSA0LjQtMjEuNC45LTMzLjIgNS4xQzQ2IDUyIDQxLjUgNjcuMSA0MSA3Mi40eiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMTA1IDUwLjZzNiA2LjUgNy4yIDEwLjUgMy42IDEuMyAzLjYtMi42YzAtNy40LTMtMTAuNC01LjktMTQuNCIgZmlsbD0iIzQ0MmExNiIvPjxwYXRoIGQ9Ik0xMDUgNTAuNnM2IDYuNSA3LjIgMTAuNSAzLjYgMS4zIDMuNi0yLjZjMS4xLTUuMi01LjktMTQuNC01LjktMTQuNCIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNDEuMyA3My45TDU3IDc3LjV2MmwtMTUuNS00em00IDQuNGwxMS4yIDIuOC4yIDItMTEuMS0zLjJ6IiBmaWxsPSIjNzU0YzI0Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzEyIj48cGF0aCBkPSJNNzguMSAyMC42QzU5LjkgMjEuNyA0NS42IDI2LjQgNDYgMzEuMXMxNS41IDcuNyAzMy43IDYuNiAzMi41LTUuOCAzMi4xLTEwLjUtMTUuNi03LjctMzMuNy02LjZ6bTEuMyAxNC41Yy0xNi4zLjktMjkuOC0xLjEtMzAuMS00LjZzMTIuNi03LjEgMjktOC4xIDI5LjggMS4xIDMwLjEgNC42LTEyLjYgNy4xLTI5IDguMXoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTc4LjEgMTkuNkM1OS45IDIwLjcgNDUuNiAyNS40IDQ2IDMwLjFzMTUuNSA3LjcgMzMuNyA2LjYgMzIuNS01LjggMzIuMS0xMC41LTE1LjYtNy43LTMzLjctNi42em0xLjMgMTQuNWMtMTYuMy45LTI5LjgtMS4xLTMwLjEtNC42czEyLjYtNy4xIDI5LTguMSAyOS44IDEuMSAzMC4xIDQuNi0xMi42IDcuMS0yOSA4LjF6IiBmaWxsPSIjZmZmODAwIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzEzIj48cGF0aCBkPSJNNDMuOCA2Mi4zYy0yLjguNy0zLjUtMS42LjItNS4zYTU1LjQgNTUuNCAwIDAxMzktMTRjMjQgMSAzMSAxMCAzMSAxMHM0IDUtMi40IDMuN2MwIDAtMzEtMTQuMS02Ny44IDUuNnoiIGZpbGw9IiM3NDNhNGIiLz48cGF0aCBkPSJNNDUuNSA2MC4yQTQ4LjIgNDguMiAwIDAxNjggNTBjMTgtNCAzOS4xIDEuNiAzOS4xIDEuNnM1LjkgMS4xIDUuOSAzLjMtMyAuMi0zIC4yYy0yNC4zLTUuMy00Ny43LTUuNi02NiA4IDAtLjEtMS0uNyAxLjUtMi45eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNNzEuNSA1MC4yYzEtMi43LjYtOS41LS45LTEzLjUtLjItLjUtLjkgMS40LTEuMSAxLTEuNy02LjUtMy43LTYuOS01LTcuMmwtMS4xIDJjLjgtNi4xLTUuMi05LjUtNS4yLTkuNWwuNCAxLjZjLTEuOS0yLTQuMS0zLjYtNi41LTUtLjMtLjMtLjMtLjMtLjIuMi4yIDIuNy44IDUuNCAxLjggNy45bC0xLjItMXMuNSA2LjkgNi41IDguN2wtMi4zLjJjLjQgNC42IDUgNi42IDUgNi42cy0yLjUtLjMtMi4yLjFjMy4xIDMuOCA3LjMgNi42IDEyIDcuOXoiLz48cGF0aCBkPSJNNzEuNSA1MC4yYzEtMi43LjYtOS41LS45LTEzLjUtLjItLjUtLjkgMS40LTEuMSAxLTEuNy02LjUtMy43LTYuOS01LTcuMmwtMS4xIDJjLjgtNi4xLTUuMi05LjUtNS4yLTkuNWwuNCAxLjZjLTEuOS0yLTQuMS0zLjYtNi41LTUtLjMtLjMtLjMtLjMtLjIuMmwxOS42IDMwLjR6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik02Mi45IDUwLjdjLS4zLTIuMS0yLjktNi43LTUuMi04LjktLjMtLjMtLjEgMS4zLS40IDEtMy40LTMuOS00LjktMy41LTUuOS0zLjJsLS4xIDEuOGMtMS41LTQuNS02LjgtNC43LTYuOC00LjdsLjguOWMtMi0uNy00LTEtNi4xLTEuMi0uMy0uMS0uMy0uMS0uMS4yIDEuMSAxLjggMi40IDMuNCAzLjkgNC44bC0xLjItLjNzMi43IDQuNSA3LjQgMy43bC0xLjUuOWMxLjggMyA1LjcgMi43IDUuNyAyLjdzLTEuOC43LTEuNS44YzMuNSAxLjcgNy4zIDIuMiAxMSAxLjV6IiBmaWxsPSIjMzliNTRhIi8+PHBhdGggZD0iTTYyLjkgNTAuN2MtLjMtMi4xLTIuOS02LjctNS4yLTguOS0uMy0uMy0uMSAxLjMtLjQgMS0zLjQtMy45LTQuOS0zLjUtNS45LTMuMmwtLjEgMS44Yy0xLjUtNC41LTYuOC00LjctNi44LTQuN2wuOC45Yy0yLS43LTQtMS02LjEtMS4yLS4zLS4xLS4zLS4xLS4xLjIgMS4xIDEuOCAyLjQgMy40IDMuOSA0LjhsLTEuMi0uM3MyLjcgNC41IDcuNCAzLjdsLTEuNS45YzEuOCAzIDUuNyAyLjcgNS43IDIuN3MtMS44LjctMS41LjhjMy41IDEuNyA3LjMgMi4yIDExIDEuNXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTQiPjxwYXRoIGQ9Ik00NSA1NWwtNi0xOC44czQgOC45IDExIDYuOCA4LTE3LjEgOC0xNy4xIDMgMTIuNCAxMSAxMi4yUzc5LjUgMjQgNzkuNSAyNCA4MyAzNyA4OCAzN2MxMC4xIDAgMTMtMTIuMSAxMy0xMi4xczMgMTYgOCAxNmMzLjEtLjEgNi0xLjQgOC0zLjhsLTYgMTVjMCAuMS00OS01LjYtNjYgMi45eiIgZmlsbD0iI2ZmZTAwMCIvPjxwYXRoIGQ9Ik00NSA1NWMzMC0yLjcgNTEuOS04LjkgNTYtMzAuMSAwIDAgMyAxNiA4IDE2IDMuMS0uMSA2LTEuNCA4LTMuOGwtNiAxNWMwIC4xLTQ5LTUuNi02NiAyLjl6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNDQuNSA2Mi4yQTcwLjMgNzAuMyAwIDAxODMgNTFjMjMgMCAyNy4yIDMuOSAyNy4yIDMuOWwzLjIgNC40czMuMSAzLjIgNS4xLS44LTMtMTItMTgtMTUtNDIgMC01NCA3LTcgMTUtNSAxNUg0M2wxLjUtMy4zeiIgZmlsbD0iI2M2OTc1NyIvPjxwYXRoIGQ9Ik00NC41IDYyLjdBNzAuMyA3MC4zIDAgMDE4MyA1MS41YzIzIDAgMjcuMiAzLjkgMjcuMiAzLjlsMy4yIDQuNHMzLjEgMy4yIDUuMS0uOEMxMDkgMzcgMzkgNDkgMzkuNCA2My45Yy42IDEuMyAxLjUgMi4xIDIuMSAyLjFINDNsMS41LTMuM3oiIG9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBjeD0iMTAxLjciIGN5PSIyMi4yIiByPSI2LjgiLz48cGF0aCBkPSJNMTA4LjUgMjNhNi44IDYuOCAwIDAxLTcuNiA2IDcgNyAwIDAxLTQuNi0yLjVjMS43LjYgNi4xIDEuMyA4LjktMS40IDItMS45IDIuMS01LjYgMS42LTcuNGE2LjggNi44IDAgMDExLjcgNS4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjI1Ii8+PGNpcmNsZSBjeD0iMTAwLjciIGN5PSIzOS4yIiByPSIyLjUiLz48Y2lyY2xlIGN4PSI2MC43IiBjeT0iNDAuMiIgcj0iMi41Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzE1Ij48cGF0aCBkPSJNMTMzIDQ4LjhjLTEuOS04LjYtMTAuMi0xMi42LTI4LjItOS41Qzk5LjQgMzIgODkgMTkgODIgMTVsLTMuNy0yLTIxLjMtLjJjLTMuMi4zLTUuOC43LTcuMiAxLjUgMCAwLS43IDMtMS45IDQuMS0yLjkgMi40IDUuMSAzLjQgNS4xIDMuNGwtMiAzIDQgMnYzYzEuOCA2LjktLjMgMTQtLjMgMTRzMS4yIDEuNi0xNy4yLjRDMTkuMSA0MyAyMyA2NS44IDM2IDYzLjhsOC45LTFhMTcxIDE3MSAwIDAwNDkuNC05LjRjMy44LTEgNy42LTEuNiAxMS41LTEuOSAzLjcgMi44IDYuOCA2LjMgOS4yIDEwLjJsLjMtLjItLjIuMWMwIC4yIDE5LjktMy44IDE3LjktMTIuOHptLTIxLjUgM2MxLjcuMiAzLjIuOSA0LjUgMi0xLjQtLjktMi45LTEuNi00LjUtMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTA1LjggNTEuNWMzLjcgMyA3IDYuMiA5LjIgMTAuNSAwIDAgNi4zLTIuOCAxLjYtOCAwIDAtMS42LTMtMTAuOC0yLjV6IiBvcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0zNy44IDYzLjRzMzMtLjkgNTYuOC0xMGMwIDAgMTYuNy00LjYgMjEuNy40cy0uOSA4LS45IDggMjAtNCAxOC0xMy0xMS0xMy0zMS05LTE4LjYgMTcuMy02NC42IDIzLjZ6IiBvcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNzAuOSAxM2MxMSAxMS42IDIyIDI1LjYgMTkgMzEuNiA1LTIuNSA4LjEtNC4yIDE0LjktNS4zLTIuOS00LjItNi04LjItOS4yLTEyLjFDOTUuNiAyNy4yIDgzIDE0IDc4IDEzeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNTQuNCA0NGM5IDIgMjkuMi0yIDQ1LjUtMTEuNWwtOC42LTkuOWMtLjUgMi0zMC43IDcuNy0zNi4zIDguNC45IDMuNS4yIDcuOC0uNiAxM3oiLz48cGF0aCBkPSJNNjkuOSAyNkw4MyAyMi4yYzItLjYgNCAuNiA0LjYgMi41bDMuMyAxMS40Yy42IDItLjYgNC0yLjUgNC42bC0xMy4xIDMuOGMtMiAuNi00LS42LTQuNi0yLjVsLTMuMy0xMS40Yy0uNi0yIC42LTQgMi41LTQuNnoiIGZpbGw9IiNmZmUwMDAiLz48cGF0aCBkPSJNNzMuOSAyOC41bDcuMS0yYzEuNS0uNCAzIC40IDMuNSAxLjlsMS45IDYuNmMuNCAxLjUtLjQgMy0xLjkgMy41bC03LjEgMmMtMS41LjQtMy0uNC0zLjUtMS45TDcyIDMxLjljLS40LTEuNS40LTMgMS45LTMuNHoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTYiPjxwYXRoIGQ9Ik00My41IDYyLjJzLTcuNS0uMi05LjQtMy44Yy0uMi0xLjEtLjItMi4zLS4xLTMuNWE0NS43IDQ1LjcgMCAwMTQ3LTM3YzMyIDEgNDQgMzMgNDIgNDMtMSAzLTYgNS03LjYgMy41QzExMSA1NyA5OS45IDUzLjQgODMgNTRjLTMyIDAtMzkuNSA4LjItMzkuNSA4LjJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTgzIDIwczE2IDggMTggMjVsLTYgMTBjMTUgMCAyMSAxMCAyMSAxMHM1IDAgNy00LjNjLjctNSAuMS0xNC4yLTExLjEtMjguMiAwIDAtMTAuOS0xMy41LTI4LjktMTQuNSAwIDAtNCAxIDAgMnoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik00My42IDYxLjlzLTcuNS0uMS05LjItMy42Yy0xLjQtMiAxNC43LTExLjkgNDctMTEuM3M0My40IDExLjcgNDEuNCAxNC4xYy0yIDQuMS03LjUgMy45LTcuNSAzLjkgMC0uNy0yLjYtMTEuOS0zMS45LTEwLjYtMzQuNC42LTM5LjggNy41LTM5LjggNy41eiIgb3BhY2l0eT0iLjIiLz48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTM0LjggNTcuN3M0LjkgNC4xIDcgNC4zbDEuMi0uNi03LjMtNC43LS45IDF6TTQxIDUzLjJsNy43IDUuOCAyLjMtLjgtNy40LTZ6TTU0LjYgNDkuMmw1LjEgNy40IDMuMi0uNi00LjctNy41ek03MC40IDQ3LjJsMi4zIDcuNiAyLjktLjItMS03LjZ6TTg5LjEgNDcuM2wtMS4zIDcuMSAyLjguMSAyLjMtNi44ek0xMDUuMiA0OS45bC0zLjggNi4xIDIuNC43IDQuMy02ek0xMTguOSA1NS42bC03LjYgNC4xIDIuNSAxLjYgOC0zLjJ6Ii8+PC9nPjxlbGxpcHNlIGN4PSI5Ni4yIiBjeT0iMzIuNSIgcng9IjguMiIgcnk9IjkuNSIvPjxwYXRoIGQ9Ik0xMjIuMiA1MS44YTkuNSA5LjUgMCAwMS03LjUtNmMtMS4xLTIuOS0uOS02LjEuNy04LjggMy4xIDQuNCA1LjUgOS40IDYuOCAxNC44ek01Mi45IDMyLjJjLTEuOCA1LTYuNiA3LjctMTAuOSA2LjJsLTEtLjVzNS04IDExLjgtMTJjLjggMi4xLjggNC4zLjEgNi4zek04MS4xIDIzLjZjLTEuMyA1LjEtNS45IDguMy0xMC4zIDcuMXMtNi43LTUuOS01LjctMTAuOEM3MSAxOCA3NCAxOCA4MC43IDE4YTkgOSAwIDAxLjQgNS42ek01MCA1MC4yVjUwYTkuMyA5LjMgMCAwMTkuNS05YzQtLjEgNy42IDIuNCA5IDYuMUE4MC40IDgwLjQgMCAwMDUwIDUwLjJ6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzE3Ij48cGF0aCBkPSJNNDYuNSA1OC4ycy0xMi0uNi0xNi41LTMuOGE5LjEgOS4xIDAgMDA2LTQuM2MxLjUtMi41IDIuMS01LjQgMS43LTguMyAwIDAgOS4xLS4zIDEzLjgtNS41UzU3IDIzLjcgNTcgMjMuN3M3LjkgNC4xIDIxLjUgMS44Uzk1LjMgMTggOTUuMyAxOHMyLjIgOSA5LjQgMTJjNC42IDEuOCA5LjQgMyAxNC4zIDMuNi0uNyA4LjYtNi4xIDEzLjUtMTMgMTUuOC0xOS42LTcuMS01OS41IDguOC01OS41IDguOHoiIGZpbGw9IiMxMTIyODkiLz48cGF0aCBkPSJNNDYuNSA1OC4ycy0xMi0uNi0xNi41LTMuOGE5LjEgOS4xIDAgMDA2LTQuM2MxLjUtMi41IDIuMS01LjQgMS43LTguMyAwIDAgOS4xLS4zIDEzLjgtNS41UzU3IDIzLjcgNTcgMjMuN3M3LjkgNC4xIDIxLjUgMS44Uzk1LjMgMTggOTUuMyAxOHMyLjIgOSA5LjQgMTJjNC42IDEuOCA5LjQgMyAxNC4zIDMuNi0uNyA4LjYtNi4xIDEzLjUtMTMgMTUuOC0xOS42LTcuMS01OS41IDguOC01OS41IDguOHoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTQ1IDYyczEzLjctMTMuNiA0OS43LTExLjNjMCAwIDExLjMgMiAxNC42IDQuOCAwIDAgLjQtMTMuOS0xNi4yLTE2cy0zNS42IDEuNi00My41IDExLjdBMjUuOSAyNS45IDAgMDA0NSA2MnoiIGZpbGw9IiMxNTI0YTUiLz48ZWxsaXBzZSBjeD0iOTQuMSIgY3k9IjQzLjEiIHJ4PSI1IiByeT0iNy43IiBmaWxsPSIjMTExYzYwIi8+PGVsbGlwc2UgY3g9Ijk1LjciIGN5PSI0My4xIiByeD0iNSIgcnk9IjcuNyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xOCI+PHBhdGggZD0iTTc1LjMgMzguOEExMy45IDEzLjkgMCAwMDYwIDM0Yy0xMCAzLTcuNCAxMy40LTE2LjIgMTkuMlMzNCA1MSAzNCA1MXMtMSAyNCAyMSAxNmMwIDAgOS0yIDEyLTktLjEgMi41LS43IDQuOS0yIDcgNC43LS44IDkuNC0xLjcgMTQtNyAwIDAgMy01IDQgMCAzIDcgMTQgNyAxNCA3cy0zLTYgMC0xMGMzLTMgMi44LTEuOCAyLjgtMS44UzEwMyA2MyAxMTMgNjJzMTAtMTIgMTAtMTItMyA3LTYgMi0xMC40LTIxLjEtMTcuNy0xMy41LTI0IC4zLTI0IC4zeiIvPjxwYXRoIGQ9Ik03NCAyMmwyIDI0czExLTMgMjIgMWw1LTI1LTEwIDEwLTQtMTYtNyAxNS04LTl6IiBmaWxsPSIjZmYwIi8+PHBhdGggZD0iTTc1LjggNDMuNEw3NiA0NnMxMS0zIDIyIDFsLjUtMi42YTQwLjIgNDAuMiAwIDAwLTIyLjctMXoiIGZpbGw9IiNkNjgyMjciLz48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTg5IDE2bDQgMTYuNC0zLTEuOC0yLjMtMTEuOHptLTE1IDYuNGw4IDguMi0zIC45LTQuNy01Ljh6TTkzLjUgNDUuNmw0LjEgMS4zIDUuOS0yNC44LTUuNiA1LjItNC40IDE4LjN6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xOSI+PHBhdGggZD0iTTEwNS4xIDI0LjNoNy45Uzk0LjIgOS44IDc1IDIxLjZDNjkuMiAyNSA2My40IDM1LjcgNjEgNDUuMmMwIDAgMjMuNS03LjcgMzMuOCAxMS44aDQuOEwxMTMgMjQuM3oiLz48cGF0aCBkPSJNMTEzIDI0LjNTOTIuOCA4LjcgNzMuNCAyMi43YzAgMCAxMS41LTEwLjMgMzEuNyAxLjZ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik05NC44IDU3aDQuN0wxMTMgMjQuM2gtNy45eiIgZmlsbD0iIzAxMDEwNyIgb3BhY2l0eT0iLjEiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMjAiPjxwYXRoIGQ9Ik04My44IDQzLjRBOC4zIDguMyAwIDAwODIgNDZjLTEgMiAxIDcgNyA4czExIDIgMTItMy0xMy40LTguMy0xNy4yLTcuNnoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTgyLjggNDQuOEwxMDIgMTlsLTMuNiAyOS44Qzk3IDU1IDc5IDU1IDgyLjggNDQuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODIuOCA0NC44QzkxIDUxIDk2IDQwIDk3LjkgMjQuNEwxMDIgMTlsLTMuNiAyOS44Qzk3IDU1IDc5IDU1IDgyLjggNDQuOHoiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik05OC44IDQ1Uzg5IDUyIDg1IDQxLjhsMS4zLTEuN3M0LjcgOCAxMi44IDN6bS04LjktOS43czMuNSA3LjcgOS44IDIuN2wuMy0yYy0zLjMgMS42LTYuMyAxLjMtOS0yLjN6bTQuMS01LjZzMiA0LjIgNi41IDEuN2wuMi0yLjJzLTMuNCAyLTUuNi0xeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8yMSI+PHBhdGggZD0iTTc0LjkgMzMuNXMtNy0yLjQtNi4yLTkuNiA5LjUtMTEuNCAxNS4zLTUuMWMzLjQgMy40IDQuMSA4LjYgMS44IDEyLjhsLTEwLjkgMS45eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03OS44IDI2LjZjLTMxLjctMS42LTMzLjkgMjctMzMuOSAyN2w2NSAuOGMtLjEtLjEuNS0yNi4zLTMxLjEtMjcuOHoiLz48cGF0aCBkPSJNNDYuMSA0OS44cy00LjcgMS4yLTUuNCA0LjYtMS4yIDcuOC0xLjIgNy44Yy4xIDEuOSAyLjkgNC4xIDIuOSA0LjFsMS4xLTIuN2MxMC44LTUuOCA0Mi4xLTguNCA1MC43LTguOCA1LjYtLjEgMTEuMi4zIDE2LjcgMS4xbDIuMiAzLjQgMy42LTIuNWMuNy0uNCAxLjEtMS4yLjctMi0uNi0xLjQtMy0xMC4zLTUtMTEuNy0xLjMtLjktMTEtMi4zLTI4LjgtLjRhMjY5LjIgMjY5LjIgMCAwMC0zNy41IDcuMXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzkuNSA2Mi4yYy4xIDEuOSAyLjkgNC4xIDIuOSA0LjFsMS4xLTIuN2MxMC44LTUuOCA0Mi4xLTguNCA1MC43LTguOCA1LjMtLjEgMTAuNS4yIDE1LjcgMS4xbDMuMiAzLjUgMy42LTIuNWMuNy0uNCAxLjEtMS4yLjctMi0zLjktOS40LTgwIDIuNC03Ny45IDcuM3oiIG9wYWNpdHk9Ii4xMiIvPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNDUuNyA0OS44cy0xLjQgNy41LTEuMiA5LjRjLjEgMS4yLjQgMi4zLjggMy40bDIuMS0uNy0uOC0zLjQgMS4xLTkuMi0yIC41eiIvPjxwYXRoIGQ9Ik00OC41IDQ5LjJzLTEuNCA3LjUtMS4yIDkuNGMuMSAxLjIuNCAyLjMuOCAzLjRsMi4xLS43LS44LTMuNCAxLjEtOS4yLTIgLjV6TTU1LjkgNDcuNGwtLjMgOC44IDEgMy4zIDItLjMtLjktM3YtOS4xeiIvPjxwYXRoIGQ9Ik01OC4zIDQ2LjhsLS4zIDguOCAxIDMuMiAyLS4zLS45LTN2LTl6TTY3LjcgNDVsLjkgOS4yLS4xIDMuMiAyLjctLjMtLjQtMy4xLTEuMi05LjN6TTcxLjEgNDQuNGwuOCA5LjJ2My4ybDIuNi0uMy0uMy0zLjItMS4yLTkuMnpNODMuOSA1NS40bC4xLTMuMS0xLjEtOS42IDIuNS0uMiAxLjQgOS41LS43IDMuNHpNODcuMiA1NS4ydi0zbC0xLjEtOS42IDIuNS0uMyAxLjQgOS42LS43IDMuM3pNOTkgNDEuN2wxLjQgOS41LS40IDMuNiAyLjMuMi42LTMuNy0xLjgtOS42ek0xMDIuNCA0MS43bDEuOCA5LjYtLjUgMy44IDIuNS4yLjUtMy44LTItOS43ek0xMTEuNyA0Mi43bDMuOSAxMC40LTQuOSAyLjcgMS40IDIgNS41LTMuMi0zLjUtOC45Yy4xIDAtMS0yLjYtMi40LTN6Ii8+PC9nPjwvc3ltYm9sPjwvc3ZnPg==", hj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wj
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ft as Account,
  an as AccountDetails,
  X4 as AccountList,
  sn as AccountRing,
  gn as AccountSelector,
  $M as AddressDisplay,
  Nn as AddressInput,
  Te as AlertTriangleIcon,
  mt as Amount,
  m0 as AmountInput,
  cn as AmountWithFee,
  U4 as ArrowLeftIcon,
  Oj as ArrowLeftSmallIcon,
  vj as ArrowRightIcon,
  b4 as ArrowRightSmallIcon,
  yn as BottomOverlay,
  Q4 as CaretRightSmallIcon,
  rn as Carousel,
  Yj as CashlinkIcon,
  fj as CashlinkSmallIcon,
  kj as CashlinkXSmallIcon,
  pj as CheckmarkIcon,
  Uj as CheckmarkSmallIcon,
  Sn as CircleSpinner,
  Ae as CloseButton,
  P4 as CloseIcon,
  bj as ContactsIcon,
  Qj as CopyIcon,
  PM as Copyable,
  ln as CopyableField,
  Pj as CrossIcon,
  Gj as DownloadIcon,
  Bj as FaceNeutralIcon,
  _j as FaceSadIcon,
  me as FiatAmount,
  Zj as GearIcon,
  $j as HexagonIcon,
  Ne as Identicon,
  Wj as InfoCircleIcon,
  Rj as InfoCircleSmallIcon,
  Hj as KeysIcon,
  EM as LabelInput,
  Vj as LedgerIcon,
  Tn as LoadingSpinner,
  Fj as LockLockedIcon,
  Jj as LockUnlockedIcon,
  Xj as LoginIcon,
  Kj as MenuDotsIcon,
  An as PageBody,
  Dn as PageFooter,
  dn as PageHeader,
  xn as PaymentInfoLine,
  qj as PlusCircleIcon,
  Cn as QrCode,
  tn as QrCodeIcon,
  En as QrScanner,
  en as QuestionmarkIcon,
  Mn as ScanQrCodeIcon,
  zn as SelectBar,
  un as SettingsIcon,
  wn as SmallPage,
  Ln as StopwatchIcon,
  pI as Timer,
  Ot as Tooltip,
  In as TransferIcon,
  jn as UnderPaymentIcon,
  on as ViewIcon,
  nn as ViewOffIcon,
  hn as setAssetPublicPath
};
