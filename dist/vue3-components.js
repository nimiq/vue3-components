import { defineComponent as U, computed as P, ref as S, watch as B, openBlock as y, createElementBlock as w, createElementVNode as $, normalizeClass as V, createTextVNode as X, toDisplayString as x, nextTick as a1, withModifiers as o1, withDirectives as j1, normalizeStyle as z1, vModelText as re, resolveComponent as O, createBlock as q, createCommentVNode as H, createVNode as j, createStaticVNode as f1, onMounted as n1, onBeforeUnmount as qe, renderSlot as Y, pushScopeId as l1, popScopeId as r1, resolveDynamicComponent as ce, withCtx as K, Fragment as Z, renderList as t1, h as de, onUnmounted as c1, Transition as W1, onBeforeUpdate as ue, mergeProps as he, getCurrentInstance as Ke, vModelRadio as Qe } from "vue";
class I {
  static getBrowserInfo() {
    return {
      browser: I.detectBrowser(),
      version: I.detectVersion(),
      isMobile: I.isMobile()
    };
  }
  static isMobile() {
    return /i?Phone|iP(ad|od)|Android|BlackBerry|Opera Mini|WPDesktop|Mobi(le)?|Silk/i.test(navigator.userAgent);
  }
  static detectBrowser() {
    if (I._detectedBrowser)
      return I._detectedBrowser;
    const t = navigator.userAgent;
    return /Edge\//i.test(t) ? I._detectedBrowser = I.Browser.EDGE : /(Opera|OPR)\//i.test(t) ? I._detectedBrowser = I.Browser.OPERA : /Firefox\//i.test(t) ? I._detectedBrowser = I.Browser.FIREFOX : /Chrome\//i.test(t) ? I._detectedBrowser = navigator.plugins.length === 0 && navigator.mimeTypes.length === 0 && !I.isMobile() ? I.Browser.BRAVE : I.Browser.CHROME : /^((?!chrome|android).)*safari/i.test(t) ? I._detectedBrowser = I.Browser.SAFARI : I._detectedBrowser = I.Browser.UNKNOWN, I._detectedBrowser;
  }
  static detectVersion() {
    if (typeof I._detectedVersion < "u")
      return I._detectedVersion;
    let t;
    switch (I.detectBrowser()) {
      case I.Browser.EDGE:
        t = /Edge\/(\S+)/i;
        break;
      case I.Browser.OPERA:
        t = /(Opera|OPR)\/(\S+)/i;
        break;
      case I.Browser.FIREFOX:
        t = /Firefox\/(\S+)/i;
        break;
      case I.Browser.CHROME:
        t = /Chrome\/(\S+)/i;
        break;
      case I.Browser.SAFARI:
        t = /(iP(hone|ad|od).*?OS |Version\/)(\S+)/i;
        break;
      case I.Browser.BRAVE:
      default:
        return I._detectedVersion = null, null;
    }
    const n = navigator.userAgent.match(t);
    if (!n)
      return I._detectedVersion = null, null;
    const o = n[n.length - 1].replace(/_/g, "."), a = o.split("."), i = [];
    for (let p = 0; p < 4; ++p)
      i.push(parseInt(a[p], 10) || 0);
    const [s, l, r, d] = i;
    return I._detectedVersion = { versionString: o, major: s, minor: l, build: r, patch: d }, I._detectedVersion;
  }
  static isChrome() {
    return I.detectBrowser() === I.Browser.CHROME;
  }
  static isFirefox() {
    return I.detectBrowser() === I.Browser.FIREFOX;
  }
  static isOpera() {
    return I.detectBrowser() === I.Browser.OPERA;
  }
  static isEdge() {
    return I.detectBrowser() === I.Browser.EDGE;
  }
  static isSafari() {
    return I.detectBrowser() === I.Browser.SAFARI;
  }
  static isBrave() {
    return I.detectBrowser() === I.Browser.BRAVE;
  }
  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  static isBadIOS() {
    const t = I.getBrowserInfo();
    return t.browser === I.Browser.SAFARI && t.isMobile && t.version && (t.version.major < 11 || t.version.major === 11 && t.version.minor === 2);
  }
  static isPrivateMode() {
    return new Promise((t) => {
      const n = () => t(!0), o = () => t(!1), a = () => /Constructor/.test(window.HTMLElement) || window.safari && window.safari.pushNotification && window.safari.pushNotification.toString() === "[object SafariRemoteNotification]";
      if (window.webkitRequestFileSystem) {
        window.webkitRequestFileSystem(0, 0, o, n);
        return;
      }
      if (document.documentElement && "MozAppearance" in document.documentElement.style) {
        const i = indexedDB.open(null);
        i.onerror = n, i.onsuccess = o;
        return;
      }
      if (a())
        try {
          window.openDatabase(null, null, null, null);
        } catch {
          n();
          return;
        }
      if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
        n();
        return;
      }
      o();
    });
  }
}
(function(e) {
  (function(t) {
    t.CHROME = "chrome", t.FIREFOX = "firefox", t.OPERA = "opera", t.EDGE = "edge", t.SAFARI = "safari", t.BRAVE = "brave", t.UNKNOWN = "unknown";
  })(e.Browser || (e.Browser = {}));
})(I || (I = {}));
var Xe = I;
const Z1 = Xe;
class G1 {
  static copy(t) {
    const n = document.createElement("textarea");
    n.value = t, n.setAttribute("readonly", ""), n.style.contain = "strict", n.style.position = "absolute", n.style.left = "-9999px", n.style.fontSize = "12pt";
    const o = document.getSelection(), a = o.rangeCount > 0 ? o.getRangeAt(0) : null, i = document.activeElement && (document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA") ? document.activeElement : null;
    document.body.append(n), n.select(), n.selectionStart = 0, n.selectionEnd = t.length;
    let s = !1;
    try {
      s = document.execCommand("copy");
    } catch {
    }
    return n.remove(), i ? i.focus() : a && (o.removeAllRanges(), o.addRange(a)), s;
  }
}
function Ye(e) {
  const t = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(e)}=([^;]+)`));
  return t && decodeURIComponent(t[2]);
}
function Ze(e, t, n) {
  if (typeof e != "string")
    throw new Error("cookieName must be a string");
  if (typeof t != "string")
    throw new Error("cookieValue must be a string");
  const o = [`${encodeURIComponent(e)}=${encodeURIComponent(t)}`];
  if (n) {
    if (typeof n != "object")
      throw new Error("options must be an object");
    if (n.path && typeof n.path != "string")
      throw new Error("options.path must be a string");
    if (n.domain && typeof n.domain != "string")
      throw new Error("options.domain must be a string");
    if (n.maxAge && typeof n.maxAge != "number")
      throw new Error("options.maxAge must be a number");
    if (n.expires && typeof n.expires != "string")
      throw new Error("options.expires must be a string");
    if (n.samesite && !["lax", "strict", "none"].includes(n.samesite))
      throw new Error('options.samesite must be either "lax", "strict" or "none"');
    n.path && o.push(`path=${n.path}`), n.secure && o.push("secure"), n.domain && o.push(`domain=${n.domain}`), n.maxAge && o.push(`max-age=${n.maxAge}`), n.expires && o.push(`expires=${n.expires}`), n.samesite && o.push(`samesite=${n.samesite}`);
  }
  const a = o.join(";");
  return document.cookie = a, a;
}
function Je(e) {
  document.cookie = `${encodeURIComponent(e)}=;max-age=0`;
}
var et = /* @__PURE__ */ Object.freeze({
  getCookie: Ye,
  setCookie: Ze,
  unsetCookie: Je
});
class W {
  constructor(t, n, o, a) {
    if (!W.CURRENCY_CODE_REGEX.test(t))
      throw new Error(`Invalid currency code ${t}`);
    let i, s;
    typeof n == "number" ? i = n : typeof n == "string" ? s = n : typeof n == "object" && ({ decimals: i, name: o, symbol: a, locale: s } = n), this.code = t.toUpperCase();
    const l = this.code.substring(0, 2), r = [
      ...s ? [s] : [],
      `${navigator.language.substring(0, 2)}-${l}`,
      navigator.language,
      "en-US"
    ];
    let d = "DisplayNames" in Intl;
    [this.locale] = d ? Intl.DisplayNames.supportedLocalesOf(r) : Intl.NumberFormat.supportedLocalesOf(r), d && !this.locale && (d = !1, [this.locale] = Intl.NumberFormat.supportedLocalesOf(r));
    const p = i === void 0 && o === void 0 && a === void 0, u = `${this.code} ${this.locale}`, c = W.CACHED_AUTO_GENERATED_CURRENCY_INFOS[u];
    if (p && c)
      return c;
    let v;
    const g = {
      style: "currency",
      currency: t,
      useGrouping: !1,
      numberingSystem: "latn"
    };
    if (o !== void 0)
      this.name = o;
    else if (c)
      this.name = c.name;
    else if (d)
      try {
        this.name = new Intl.DisplayNames(this.locale, { type: "currency" }).of(t);
      } catch {
      }
    if (this.name || (v = W.failsafeNumberToLocaleString(0, this.locale, { currencyDisplay: "name", ...g }), this.name = v ? v.replace(W.NUMBER_REGEX, "").trim() : this.code), a !== void 0)
      this.symbol = a;
    else if (c)
      this.symbol = c.symbol;
    else {
      const f = W.EXTRA_SYMBOLS[this.code];
      if (typeof f == "string")
        this.symbol = f;
      else if (Array.isArray(f)) {
        const b = this.locale === s && W.RIGHT_TO_LEFT_DETECTION_REGEX.test(this.name);
        this.symbol = f[b ? 1 : 0];
      } else {
        const b = [
          ...s ? [s] : [],
          `en-${l}`,
          "en"
        ], C = W.failsafeNumberToLocaleString(0, b, { currencyDisplay: "narrowSymbol", ...g }) || W.failsafeNumberToLocaleString(0, b, { currencyDisplay: "symbol", ...g });
        C ? (v = C, this.symbol = v.replace(W.NUMBER_REGEX, "").trim()) : this.symbol = this.code;
      }
    }
    if (i !== void 0)
      this.decimals = i;
    else if (c)
      this.decimals = c.decimals;
    else if (W.CUSTOM_DECIMAL_LESS_CURRENCIES.has(this.code))
      this.decimals = 0;
    else if (v = v || W.failsafeNumberToLocaleString(0, "en", { currencyDisplay: "code", ...g }), v) {
      const f = v.match(W.NUMBER_REGEX);
      this.decimals = f ? (f[1] || "").length : 2;
    } else
      this.decimals = 2;
    p && (W.CACHED_AUTO_GENERATED_CURRENCY_INFOS[u] = this);
  }
  static failsafeNumberToLocaleString(t, n, o) {
    try {
      return t.toLocaleString(n, o);
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
var d1;
(function(e) {
  e.NIM = "nim", e.BTC = "btc", e.ETH = "eth";
})(d1 || (d1 = {}));
var x1;
(function(e) {
  e.AED = "aed", e.ARS = "ars", e.AUD = "aud", e.BDT = "bdt", e.BHD = "bhd", e.BMD = "bmd", e.BRL = "brl", e.CAD = "cad", e.CHF = "chf", e.CLP = "clp", e.CNY = "cny", e.CZK = "czk", e.DKK = "dkk", e.EUR = "eur", e.GBP = "gbp", e.HKD = "hkd", e.HUF = "huf", e.IDR = "idr", e.ILS = "ils", e.INR = "inr", e.JPY = "jpy", e.KRW = "krw", e.KWD = "kwd", e.LKR = "lkr", e.MMK = "mmk", e.MXN = "mxn", e.MYR = "myr", e.NOK = "nok", e.NGN = "ngn", e.NZD = "nzd", e.PHP = "php", e.PKR = "pkr", e.PLN = "pln", e.RUB = "rub", e.SAR = "sar", e.SEK = "sek", e.SGD = "sgd", e.THB = "thb", e.TRY = "try", e.TWD = "twd", e.UAH = "uah", e.USD = "usd", e.VND = "vnd", e.ZAR = "zar";
})(x1 || (x1 = {}));
const tt = "https://api.coingecko.com/api/v3", J1 = {
  [d1.NIM]: "nimiq-2",
  [d1.BTC]: "bitcoin",
  [d1.ETH]: "ethereum"
};
async function nt(e, t) {
  e = e.map((a) => a.toLowerCase());
  const n = e.map((a) => J1[a]), o = await at(`${tt}/simple/price?ids=${n.join(",")}&vs_currencies=${t.join(",")}`);
  return e.reduce((a, i) => ({
    ...a,
    [i]: o[J1[i]]
  }), {});
}
async function at(e, t) {
  let n = null;
  do {
    let o = !0;
    try {
      const a = await fetch(e, t);
      if (!a.ok)
        throw a.status === 400 ? (o = !1, new Error("400 - Bad request")) : new Error(`Failed to fetch: ${a.status}. Retrying...`);
      n = await a.json();
    } catch (a) {
      if (o)
        await new Promise((i) => setTimeout(i, 15e3));
      else
        throw a;
    }
  } while (!n);
  return n;
}
class i1 {
  constructor(t) {
    typeof t != "string" && (t = t.toString());
    const n = t.match(i1.NUMBER_REGEX);
    if (!n)
      throw new Error(`${t} is not a valid number`);
    if (this._sign = n[1], this._digits = `${n[2]}${n[3]}`, !this._digits)
      throw new Error(`${t} is not a valid number`);
    this._decimalSeparatorPosition = n[2].length;
    const o = Number.parseInt(n[5], 10);
    o && this.moveDecimalSeparator(o);
  }
  toString(t) {
    let { maxDecimals: n = void 0, minDecimals: o = void 0, useGrouping: a = t === !0, groupSeparator: i = "\u202F" } = typeof t == "object" ? t : {};
    n !== void 0 && o !== void 0 && (o = Math.min(o, n)), n !== void 0 && n < this._digits.length - this._decimalSeparatorPosition && this.round(n);
    let s = this._digits.slice(0, this._decimalSeparatorPosition).replace(/^0+/, ""), l = this._digits.slice(this._decimalSeparatorPosition).replace(/0+$/, "");
    return o !== void 0 && o > l.length && (l = l.padEnd(o, "0")), a && i && s.length > 4 && (s = s.replace(/(\d)(?=(\d{3})+$)/g, `$1${i}`)), `${this._sign}${s || "0"}${l ? `.${l}` : ""}`;
  }
  valueOf() {
    return this.toString();
  }
  moveDecimalSeparator(t) {
    return this._decimalSeparatorPosition += t, this._decimalSeparatorPosition > this._digits.length ? this._digits = this._digits.padEnd(this._decimalSeparatorPosition, "0") : this._decimalSeparatorPosition < 0 && (this._digits = this._digits.padStart(this._digits.length - this._decimalSeparatorPosition, "0"), this._decimalSeparatorPosition = 0), this;
  }
  round(t) {
    if (this._digits.length - this._decimalSeparatorPosition <= t)
      return this;
    const n = this._decimalSeparatorPosition + t, o = this._digits.substring(0, n).padEnd(this._decimalSeparatorPosition, "0");
    if (Number.parseInt(this._digits[n], 10) < 5)
      return this._digits = o, this;
    const a = `0${o}`.split(""), i = n;
    for (let s = i; s >= 0; --s) {
      const l = Number.parseInt(a[s], 10) + 1;
      if (l < 10) {
        a[s] = l.toString();
        break;
      } else
        a[s] = "0";
    }
    return this._digits = a.join(""), this._decimalSeparatorPosition += 1, this;
  }
  equals(t) {
    if (!(t instanceof i1))
      try {
        t = new i1(t);
      } catch {
        return !1;
      }
    return this.toString() === t.toString();
  }
}
i1.NUMBER_REGEX = /^(-?)(\d*)\.?(\d*)(e(-?\d+))?$/;
class h1 {
  static isValidAddress(t) {
    if (!t)
      return !1;
    try {
      return this.isUserFriendlyAddress(t), !0;
    } catch {
      return !1;
    }
  }
  static isUserFriendlyAddress(t) {
    if (!!t) {
      if (t = t.replace(/ /g, ""), t.substr(0, 2).toUpperCase() !== "NQ")
        throw new Error("Addresses start with NQ");
      if (t.length !== 36)
        throw new Error("Addresses are 36 chars (ignoring spaces)");
      if (!this._alphabetCheck(t))
        throw new Error("Address has invalid characters");
      if (this._ibanCheck(t.substr(4) + t.substr(0, 4)) !== 1)
        throw new Error("Address Checksum invalid");
    }
  }
  static _alphabetCheck(t) {
    t = t.toUpperCase();
    for (let n = 0; n < t.length; n++)
      if (!h1.NIMIQ_ALPHABET.includes(t[n]))
        return !1;
    return !0;
  }
  static _ibanCheck(t) {
    const n = t.split("").map((a) => {
      const i = a.toUpperCase().charCodeAt(0);
      return i >= 48 && i <= 57 ? a : (i - 55).toString();
    }).join("");
    let o = "";
    for (let a = 0; a < Math.ceil(n.length / 6); a++)
      o = (parseInt(o + n.substr(a * 6, 6), 10) % 97).toString();
    return parseInt(o, 10);
  }
  static isValidHash(t) {
    try {
      return atob(t).length === 32;
    } catch {
      return !1;
    }
  }
  static get NIMIQ_ALPHABET() {
    return "0123456789ABCDEFGHJKLMNPQRSTUVXY";
  }
}
class y1 {
  constructor(t = 0, n = t, o = 0, a = Date.now(), i = y1.Easing.EASE_IN_OUT_CUBIC) {
    this.targetValue = t, this.startValue = n, this.tweenTime = o, this.startTime = a, this.easing = i;
  }
  get currentValue() {
    const t = this.easing(this.progress);
    return this.startValue + (this.targetValue - this.startValue) * t;
  }
  get progress() {
    return this.tweenTime === 0 ? 1 : Math.min(1, (Date.now() - this.startTime) / this.tweenTime);
  }
  get finished() {
    return this.progress === 1;
  }
  tweenTo(t, n = this.tweenTime) {
    t !== this.targetValue && (this.startValue = this.currentValue, this.targetValue = t, this.startTime = Date.now(), this.tweenTime = n);
  }
}
(function(e) {
  e.Easing = {
    LINEAR: (t) => t,
    EASE_IN_OUT_CUBIC: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };
})(y1 || (y1 = {}));
var ot = y1;
const D1 = ot;
class g1 {
  static stringToUtf8ByteArray(t) {
    if (typeof TextEncoder < "u")
      return new TextEncoder().encode(t);
    const n = [];
    let o = 0;
    for (let a = 0; a < t.length; a++) {
      let i = t.charCodeAt(a);
      i < 128 ? n[o++] = i : i < 2048 ? (n[o++] = i >> 6 | 192, n[o++] = i & 63 | 128) : (i & 64512) == 55296 && a + 1 < t.length && (t.charCodeAt(a + 1) & 64512) == 56320 ? (i = 65536 + ((i & 1023) << 10) + (t.charCodeAt(++a) & 1023), n[o++] = i >> 18 | 240, n[o++] = i >> 12 & 63 | 128, n[o++] = i >> 6 & 63 | 128, n[o++] = i & 63 | 128) : (n[o++] = i >> 12 | 224, n[o++] = i >> 6 & 63 | 128, n[o++] = i & 63 | 128);
    }
    return new Uint8Array(n);
  }
  static utf8ByteArrayToString(t) {
    if (typeof TextDecoder < "u")
      return new TextDecoder("utf-8").decode(t);
    const n = [];
    let o = 0, a = 0;
    for (; o < t.length; ) {
      const i = t[o++];
      if (i < 128)
        n[a++] = String.fromCharCode(i);
      else if (i > 191 && i < 224) {
        const s = t[o++];
        n[a++] = String.fromCharCode((i & 31) << 6 | s & 63);
      } else if (i > 239 && i < 365) {
        const s = t[o++], l = t[o++], r = t[o++], d = ((i & 7) << 18 | (s & 63) << 12 | (l & 63) << 6 | r & 63) - 65536;
        n[a++] = String.fromCharCode(55296 + (d >> 10)), n[a++] = String.fromCharCode(56320 + (d & 1023));
      } else {
        const s = t[o++], l = t[o++];
        n[a++] = String.fromCharCode((i & 15) << 12 | (s & 63) << 6 | l & 63);
      }
    }
    return n.join("");
  }
  static isValidUtf8(t, n = !1) {
    const o = [
      9,
      10,
      13
    ];
    if (typeof TextDecoder < "u")
      try {
        const s = new TextDecoder("utf-8", { fatal: !0 }).decode(t);
        if (!n)
          return !0;
        const l = s.match(/[\u0000-\u001F\u007F]/gu);
        return l ? l.every((r) => o.includes(r.charCodeAt(0))) : !0;
      } catch {
        return !1;
      }
    let a = 0;
    for (; a < t.length; ) {
      const i = t.length - a, s = t[a];
      if (s <= 127)
        if (s >= 32 && s <= 126)
          ++a;
        else if (!n)
          ++a;
        else if (o.indexOf(s) > -1)
          ++a;
        else
          break;
      else if (s >= 194 && s <= 223 && i >= 2) {
        const l = t[++a];
        if (l >= 128 && l <= 191)
          ++a;
        else
          break;
      } else if (s === 224 && i >= 3) {
        const l = t[++a], r = t[++a];
        if (l >= 160 && l <= 191 && r >= 128 && r <= 191)
          ++a;
        else
          break;
      } else if (s >= 225 && s <= 236 && i >= 3) {
        const l = t[++a], r = t[++a];
        if (l >= 128 && l <= 191 && r >= 128 && r <= 191)
          ++a;
        else
          break;
      } else if (s === 237 && i >= 3) {
        const l = t[++a], r = t[++a];
        if (l >= 128 && l <= 159 && r >= 128 && r <= 191)
          ++a;
        else
          break;
      } else if (s >= 238 && s <= 239 && i >= 3) {
        const l = t[++a], r = t[++a];
        if (l >= 128 && l <= 191 && r >= 128 && r <= 191)
          ++a;
        else
          break;
      } else if (s === 240 && i >= 4) {
        const l = t[++a], r = t[++a], d = t[++a];
        if (l >= 144 && l <= 191 && r >= 128 && r <= 191 && d >= 128 && d <= 191)
          ++a;
        else
          break;
      } else if (s >= 241 && s <= 243 && i >= 4) {
        const l = t[++a], r = t[++a], d = t[++a];
        if (l >= 128 && l <= 191 && r >= 128 && r <= 191 && d >= 128 && d <= 191)
          ++a;
        else
          break;
      } else if (s === 244 && i >= 4) {
        const l = t[++a], r = t[++a], d = t[++a];
        if (l >= 128 && l <= 143 && r >= 128 && r <= 191 && d >= 128 && d <= 191)
          ++a;
        else
          break;
      } else
        break;
    }
    return a === t.length;
  }
  static truncateToUtf8ByteLength(t, n, o = !0) {
    if (n < 0)
      throw new Error("Invalid byte length");
    let a;
    if (typeof t == "string" ? a = g1.stringToUtf8ByteArray(t) : a = t, a.length <= n)
      return {
        result: t,
        didTruncate: !1
      };
    const i = [226, 128, 166];
    for (n < i.length && (o = !1), a = a.subarray(0, n - (o ? i.length : 0)); !g1.isValidUtf8(a); )
      a = a.subarray(0, a.length - 1);
    return o && (a = new Uint8Array(a.buffer, a.byteOffset, a.length + i.length), typeof t != "string" && (a = new Uint8Array(a)), a.set(i, a.length - i.length)), {
      result: typeof t == "string" ? g1.utf8ByteArrayToString(a) : a,
      didTruncate: !0
    };
  }
}
class $1 {
  static async svg(t) {
    const n = st(t);
    return this._svgTemplate(n[0], n[2], n[3] + n[4], n[5] + n[6], n[7] + n[8], n[9] + n[10], n[11]);
  }
  static async render(t, n) {
    n.innerHTML = await this.svg(t);
  }
  static async toDataUrl(t) {
    return `data:image/svg+xml;base64,${this._btoa(await this.svg(t, !0))}`;
  }
  static placeholder(t = "#bbb", n = 1) {
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
<path fill="none" stroke="${t}" stroke-width="${2 * n}" transform="translate(0, 8) scale(0.5)" d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>
<g transform="scale(0.9) translate(9, 8)">
<circle cx="80" cy="80" r="40" fill="none" stroke="${t}" stroke-width="${n}" opacity=".9"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
</g></svg>`;
  }
  static renderPlaceholder(t, n, o) {
    t.innerHTML = this.placeholder(n, o);
  }
  static placeholderToDataUrl(t, n) {
    return `data:image/svg+xml;base64,${this._btoa(this.placeholder(t, n))}`;
  }
  static async image(t) {
    const n = await this.toDataUrl(t), o = await this._loadImage(n);
    return o.style.width = "100%", o.style.height = "100%", o;
  }
  static async _svgTemplate(t, n, o, a, i, s, l) {
    return this._$svg(await this._$identicons(t, n, o, a, i, s, l));
  }
  static async _$identicons(t, n, o, a, i, s, l) {
    const r = rt(t, n, l);
    return t = r.main, n = r.background, `<g color="${t}" fill="${l = r.accent}">
<rect fill="${n}" x="0" y="0" width="160" height="160"/>
<circle cx="80" cy="80" r="40" fill="${t}"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
${await this._generatePart("top", a)}
${await this._generatePart("side", i)}
${await this._generatePart("face", o)}
${await this._generatePart("bottom", s)}
</g>`;
  }
  static _$svg(t) {
    const n = this._getRandomId();
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="hexagon-clip-${n}">
<path d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z" transform="scale(0.5) translate(0, 16)"/>
</clipPath></defs>
<g clip-path="url(#hexagon-clip-${n})">
${t}
</g></svg>`;
  }
  static async _generatePart(t, n) {
    const o = await this._getAssets(), a = t + "_" + this._assetIndex(n, t), i = o.getElementById(a);
    return i ? i.innerHTML : "";
  }
  static _loadImage(t) {
    return new Promise((n, o) => {
      const a = document.createElement("img");
      a.addEventListener("load", (i) => n(a), { once: !0 }), a.src = t;
    });
  }
  static async _getAssets() {
    return this._assetsPromise || (this._assetsPromise = new Promise(async function(t) {
      let n;
      if (n = typeof IdenticonsAssets < "u" ? IdenticonsAssets : await fetch(self.NIMIQ_IDENTICONS_SVG_PATH || $1.svgPath).then((o) => o.text()), typeof DOMParser != "function") {
        if (typeof module > "u" || !module.exports)
          throw new Error("No DOMParser available");
        global.DOMParser = require("dom-parser");
      }
      t(new DOMParser().parseFromString(n, "image/svg+xml"));
    }));
  }
  static _btoa(t) {
    if (typeof btoa == "function")
      return btoa(t);
    if (typeof module < "u" && module.exports)
      return Buffer.from(t).toString("base64");
    throw new Error("No btoa or equivalent available");
  }
  static _assetIndex(t, n) {
    return (t = Number(t) % 21 + 1) < 10 && (t = "0" + t), t;
  }
  static _getRandomId() {
    return Math.floor(256 * Math.random());
  }
}
$1.svgPath = "/node_modules/@nimiq/identicons/dist/identicons.min.svg";
function st(e) {
  const t = ("" + e.split("").map((n) => Number(n.charCodeAt(0)) + 3).reduce((n, o) => n * (1 - n) * it(o), 0.5)).split("").reduce((n, o) => o + n, "");
  return lt(t.replace(".", t[5]).substr(4, 17), 13, t[5]);
}
function it(e) {
  let t = 1 / e;
  for (let n = 0; n < 100; n++)
    t = (1 - t) * t * 3.569956786876;
  return t;
}
function lt(e, t, n) {
  if (String.prototype.padEnd)
    return e.padEnd(t, n);
  for (; e.length < t; )
    e += n;
  return e.substring(0, Math.max(e.length, t));
}
function rt(e, t, n) {
  return dt(ct(e, t, n));
}
function ct(e, t, n) {
  for (e = parseInt(e, 10), t = parseInt(t, 10), n = parseInt(n, 10), e === t && ++e > 9 && (e = 0); n === e || n === t; )
    ++n > 9 && (n = 0);
  return { main: e, background: t, accent: n };
}
function dt(e) {
  return { main: ee[e.main], background: ut[e.background], accent: ee[e.accent] };
}
const ee = ["#FC8702", "#D94432", "#E9B213", "#1A5493", "#0582CA", "#5961A8", "#21BCA5", "#FA7268", "#88B04B", "#795548"], ut = ["#FC8702", "#D94432", "#E9B213", "#1F2348", "#0582CA", "#5F4B8B", "#21BCA5", "#FA7268", "#88B04B", "#795548"], ht = '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="face_01"><path d="M94 85s4.8-2 8.2 0c.8.4.7 1.1 0 2 0 0-3.4 4-4.1 4s-4.8-4-4.8-4c-.6-1-.3-1.7.7-2z"/><path d="M99.3 84.1c1 .2 2 .4 3 .9.8.4.7 1.1 0 2a22.1 22.1 0 01-4.1 4c1.9-3.2 2.6-6.3 1.1-6.9z" fill="#3a3a3a" opacity=".2"/><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"><path d="M96 100c1.6.2 2-5.8 2-9M88 95.5s7.5 11 18 0"/></g><g fill="#010101" opacity=".6"><path d="M79 82s0-12 6-12 6 11.6 6 11.6S86 70 79 82zM102 82s0-12 6-12 6 11.6 6 11.6-5-11.6-12 .4z"/></g><path d="M96 86s4-1 6 0h-6z" opacity=".3" fill="#fff"/><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5"><path d="M93 90c-9.9-3.8-20.4-6.2-31-7M92.6 91.3c-12-2.8-27.7-1.2-27.7-1.2M92.5 93.2c-12.3-1-27.6 5-27.6 5M101 90a84.1 84.1 0 0127-7M101.3 91.3c10.5-2.8 24.1-1.2 24.1-1.2M101.4 93.2c10.7-1 24 5 24 5"/></g></symbol><symbol id="face_02"><g fill="#010101" opacity=".6"><path d="M77 75s0-12 6-12 6 11.6 6 11.6S84 63 77 75zM101 74.5s0-11 5.5-11 5.5 10.6 5.5 10.6-4.6-10.6-11 .4zM106.7 100a15 15 0 01-11.1 5H95a15 15 0 01-11.1-5c-3-3.2-5-8.5-5-11s4.6 1.5 16 1.5h.6c7.8 0 12.7-2.5 13.6-3s2.4-.6 2.4 1.6-1.9 7.7-4.9 11z"/></g><circle cx="99" cy="79.8" r="9"/><path d="M108 80.8a9 9 0 01-16 4.6c2.3.8 8 1.6 11.6-2 2.7-2.5 2.8-7.2 2.1-9.6a9 9 0 012.2 7z" fill="#010101" opacity=".2"/></symbol><symbol id="face_03"><g fill="#fff"><path d="M72.4 70.5s-5 2.3-4.5 5.4 4.5 2.3 4.5-.4 1.4-4.5 0-5zM111 66.8s3.2-.9 4.3.7-1.2 2.9-2.3 1.6-2.5-1.6-2-2.3zM70.5 67.2s-3.4-.1-4 1.8 1.9 2.5 2.6 1 2-2.2 1.4-2.8z"/></g><g fill="#010101" opacity=".6"><path d="M109.9 101.1H75.5s1.7-19.4 18.6-19.4c4.4-.2 8.8 1.6 11.8 4.8 5.3 5.7 4 14.6 4 14.6z"/><circle cx="78.8" cy="67.7" r="4.8"/><circle cx="106.1" cy="67.7" r="4.4"/></g><path d="M105.3 58.5c2.9-.3 5.8 4.6 8.6 6.9 0 0-3.7-7.5-4.4-8.6s-4.2 1.7-4.2 1.7zM80.7 59.2c-2.6-1.2-7 2.3-10.4 3.6 0 0 6-5.8 7.1-6.6s3.3 3 3.3 3z"/></symbol><symbol id="face_04"><ellipse cx="108.8" cy="71.6" rx="3.7" ry="4.3" fill="#42210b"/><path d="M76.1 87.3s2.8 13.4 18.4 12.7c16-.8 16.5-13.6 16.5-13.6" fill="none" stroke="#42210b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M75.6 68.2a9.3 9.3 0 018.7 6.2c-3.2-2.1-4.2-2.8-9-.6" fill="none" stroke="#42210b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></symbol><symbol id="face_05"><path d="M83.5 57.7a1 1 0 00-.9 1.3s4 11.8 4.3 22.3a1 1 0 102 0c-.3-11-4.4-23-4.4-23a1 1 0 00-1-.6zm-.3 2.5c-1.6.2-2.7.7-3.3 1.7-.7 1-.5 2 0 3 .9 2 3 3.9 5.8 5.2 2.4 1.2 4.2 3 4.7 4 .3.6.2 1 0 1.3-.2.4-.8.8-2 1.1-2.4.5-3.8 0-4.6-.9-.9-.8-1.1-2-.7-3.1a1 1 0 10-2-.7 5.1 5.1 0 001.2 5.2c1.4 1.4 3.7 2.1 6.5 1.5 1.6-.4 2.7-1 3.3-2 .6-1 .6-2.1.1-3.1-.8-2-3-3.7-5.6-5-2.4-1.3-4.4-3-5-4.3-.2-.6-.2-.9 0-1.1 0-.3.6-.6 1.8-.8 2.6-.2 3.8.6 4.5 1.2.6.7.7 1.3.7 1.3a1 1 0 102-.3s-.2-1.3-1.3-2.4c-1-1-3-2-6.1-1.8zM102.2 57.9a1 1 0 00-1 1.4s5 10.6 6.2 20.3a1 1 0 102-.2 80.7 80.7 0 00-6.3-21 1 1 0 00-.9-.5zm-.1 2.5c-1.5.4-2.5 1-3 1.9-.5 1-.3 2 .3 3 1 1.7 3.3 3.2 6 4.2 2.3.9 4.2 2.3 4.7 3.3.3.5.3.8.1 1.1-.1.3-.6.8-1.7 1.2-2.1.7-3.5.3-4.3-.4a2.9 2.9 0 01-1-2.8 1 1 0 10-2-.4c-.3 1.7.3 3.6 1.7 4.8 1.4 1.2 3.6 1.6 6.2.7 1.4-.5 2.4-1.2 3-2.2.4-1 .3-2-.2-3-1-1.8-3.2-3.2-5.9-4.2-2.3-.9-4.3-2.3-5-3.4-.2-.5-.2-.8-.1-1 0-.2.5-.6 1.6-.8 2.4-.4 3.6.1 4.2.6.7.6.8 1.1.8 1.1a1 1 0 102-.5s-.4-1.2-1.5-2.1c-1.1-1-3-1.6-6-1.1z"/><path d="M106.7 99a15 15 0 01-11.1 5H95a15 15 0 01-11-5c-3-3.2-5-8.5-5-11s4.6 1.5 16 1.5h.6c7.8 0 12.7-2.5 13.6-3s2.4-.6 2.4 1.6-1.9 7.7-4.9 11z" fill="#010101" opacity=".6"/><path d="M92 90.3c-.4.1-.7 10.5 0 14.5s9.2 7.6 11.7-4c1.4-4.4.7-11.9.7-11.9s-6.8 2.2-12.3 1.3z" fill="#f15a24"/><path d="M98.7 92.6s.7 7.1-.2 11.4.7 4.2 2.4 2 3.8-6.2 3.5-13.7v-3.4l-5.9 1.6z" fill="#e84715"/></symbol><symbol id="face_06"><g fill="#010101" opacity=".6"><path d="M77 76s0-12 6-12 6 11.59 6 11.59S84 64 77 76zM101 75.5s0-11 5.5-11 5.5 10.62 5.5 10.62-4.58-10.62-11 .38zM95.33 95.09q-.77 0-1.5-.06c-.88-.06-1.28 5.36-2.55 5.67s-1.72-6.38-2.54-6.63c-2.37-.72-6.48-1.76-8.26-2.91-4-2.59-4.42-5.74-4.42-7 0-2.38 7.46 5.42 19 5.42h.46c7.89 0 12.78-2.53 13.65-3s2.39-.65 2.39 1.6c0 1.09-1.85 2.77-4.69 4.21-.73.37-.86 8.43-2.38 8.05s-1.73-6.39-2.65-6.14a24.2 24.2 0 01-6.51.79z"/></g><g fill="#fff"><path d="M87.93 88.54l2.57 11.38s.46 1.92 1.48 0 2.5-10.4 2.5-10.4a26.66 26.66 0 01-6.55-.98zM100.84 89.13l2.81 10.21s1.22 2.34 1.78 0 1.77-11.89 1.77-11.89-1.51.82-6.36 1.68z"/></g><g opacity=".05"><path d="M91 91.51s1.19-.51 0 8.41c0 0 0 1.08 1 0 .8-1.92 2.48-10.4 2.48-10.4a19.21 19.21 0 01-4.36-.45zM103.45 90.8s1.07-.72 1.5 8.27a.87.87 0 00.23.43c.16.14 1.69-11.63 1.69-11.63a48.16 48.16 0 01-4.72 1.68z"/></g></symbol><symbol id="face_07"><g fill="#010101" opacity=".6"><path d="M76 77s0-12 6-12 6 11.6 6 11.6S83 65 76 77zM100 76.5s0-11 5.5-11 5.5 10.6 5.5 10.6-4.6-10.6-11 .4z"/></g><g opacity=".2"><path d="M75 91.1c-.2-1.5.4-2.9 1.4-3.9 0 0 10.8 0 13-4.6s4.3-10.1 7.9-7.8c5.7 3.3 5 7.8 8.6 10.1s7.2 5.7 12.2 5.7 5.8.5 5.8 2.1-2.2 4.7-6.5 3.1-10.4-4.3-19.8-.4-5 4.7-10.8 2.3c-4.1-1.8-8-4-11.8-6.6z"/><path d="M77.8 92.6l-.6 2.9 2.2 3.6s6.5 0 8.7 2.2 13.7 5 20.9 2.9 6.7-8.6 6.7-8.6-12.7 5.4-22.1 2.1a9 9 0 01-3.1 1.5c-2.2-.7-4.4-1.5-6.6-2.5-2.3-1-4.3-2.4-6.1-4.1z"/><path d="M116.3 94.5s-5.8-2.2-10.1-1.4c-3.4.5-6.7 1.3-9.9 2.6 4.2 1.7 13.6-1.2 20-1.2z"/></g><path d="M116.3 94.5s-5.8-2.2-10.1-1.4-9 1.8-11.3 3.4c0 0 2.4 1.7 7.2 1.3s12.1-1.8 14.2-3.3z" fill="#eb5273"/><path d="M76 90.9l1.4-3.6s10.8 0 13-4.3 4.3-9.4 7.9-7.2 5 7.2 8.6 9.4 7.2 4.3 12.2 4.3 5.7 1.4 5.7 2.9-2.2 4.3-6.5 2.9-10.4-4-19.8-.4-5 4.3-10.8 2.2c-4-1.7-7.9-3.8-11.7-6.2z" fill="#fbdb31"/><path d="M76 90.9l1.4-3.6a50 50 0 0015.1 7.2c4.3-5 21.6-5 32.4-2.2.1 1.4-2.2 4.3-6.5 2.9s-10.4-4-19.8-.4-5 4.3-10.8 2.2c-4.1-1.6-8-3.7-11.8-6.1z" opacity=".05"/><path d="M91.8 83l-.7 2.2 5.1 4.3c.4.4 1 .4 1.4 0 .7-.7-2.2-3.6-2.2-3.6L93.3 83c-.4-.4-1-.4-1.5 0 .1 0 .1 0 0 0z"/><path d="M78.8 92.6l-.6 1.9 2.2 3.6s6.5 0 8.7 2.2 13.7 5 20.9 2.9 6.7-8.6 6.7-8.6-12.7 5.4-22.1 2.1a9 9 0 01-3.1 1.5c-2.2-.7-4.4-1.5-6.6-2.5-3.5-1.5-6.1-3.1-6.1-3.1z" fill="#fbdb31"/><path d="M78.8 92.6l-.6 1.9 2.2 3.6s6.5 0 8.7 2.2 13.7 5 20.9 2.9 6.7-8.6 6.7-8.6-12.7 5.4-22.1 2.1a9 9 0 01-3.1 1.5c-2.2-.7-4.4-1.5-6.6-2.5-3.5-1.5-6.1-3.1-6.1-3.1z" opacity=".2"/></symbol><symbol id="face_08"><path d="M111.4 68.3c.6 2.7-.6 5.3-2.5 5.7s-4-1.5-4.6-4.2.6-5.3 2.5-5.7c.7-.1 7.9.3 7.9.3s-3.6 2.5-3.3 3.9zM80.7 66.9c-.6 3.1.7 5.9 2.8 6.3s4.4-1.7 5.1-4.7-.6-5.9-2.8-6.3c-.6-.1-10.1-.1-10.6.1-.9.3 6.8 3.7 5.5 4.6z"/><path d="M111.9 81.6c-7.7 10.3-21.2 9.6-33.4 0 0 0 1.7 15.4 18 15.4 5.3 0 8.9-1.6 11.4-3.8 5.2-4.6 4-11.6 4-11.6z" opacity=".6" fill="#010101"/></symbol><symbol id="face_09"><path d="M85.2 94h21.2s-.6 11-10.8 11c-2.6.1-5.2-.9-7.1-2.7-3.2-3.3-3.3-8.3-3.3-8.3z" fill="#603813"/><path d="M103.5 101.3a10 10 0 01-7.9 3.5c-2.6.1-5.2-.9-7.1-2.7-3.2-3.3 17.7-4 15-.8z" fill="#f15a24"/><path d="M82.2 82.4s-10-4.9-8.5-11.4 10.1-.7 9.5-.9 6.2-5.4 8.5.8c1.7 6.1-7.9 12.5-9.5 11.5zM107 82.4s-8.5-4.9-7.2-11.4c1.2-6.5 8.6-.7 8-.9-.4-.2 5.4-5.4 7.3.8 1.5 6.1-6.7 12.5-8 11.5z"/><g fill="#010101" opacity=".1"><path d="M82.2 82.4s-10-4.9-8.5-11.4 10-.6 9.5-.9c-7.2-4-7.5 8.6-1 12.3zM107 82.4s-8.6-4.9-7.3-11.4c1.3-6.5 8.5-.6 8-.9-6-4-6.3 8.6-.8 12.3z"/></g></symbol><symbol id="face_10"><path d="M97.6 82.4c4.8.2 8.5 4.3 8.3 9.1l-.1 3.3a8.7 8.7 0 01-9.1 8.3H96a8 8 0 01-7.6-8.4l.2-4a8.6 8.6 0 019-8.3z" fill="#010101" opacity=".6"/><path d="M92.6 63a1 1 0 00-.9.5L82.1 80a1 1 0 101.7 1l9.7-16.6a1 1 0 00-.9-1.5zm-11 .4a1 1 0 00-.8 1.6l11.4 15.8a1 1 0 101.6-1.2L82.4 63.8a1 1 0 00-.8-.4zM112.2 63.7a1 1 0 00-.8.4l-10 15.4a1 1 0 101.6 1l10-15.3a1 1 0 00-.8-1.5zm-9.5-.9a1 1 0 00-1 1.4l8.3 17a1 1 0 101.8-.8l-8.2-17a1 1 0 00-.9-.6z"/></symbol><symbol id="face_11"><g fill="none" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M77.2 70.9c1-5.6 9.1-5.6 9.8-.2M103.5 70.7c.9-5.2 8.5-5.2 9.1-.2"/></g><path d="M85.2 91h21.2s-.6 11-10.8 11c-2.6.1-5.2-.9-7.1-2.7-3.2-3.3-3.3-8.3-3.3-8.3z" fill="#603813"/><path d="M103.5 98.3a10 10 0 01-7.9 3.5c-2.6.1-5.2-.9-7.1-2.7-3.2-3.3 17.7-4 15-.8z" fill="#f15a24"/><path d="M98 84.9c1.1-6.6-3.3-12.1-13.2-9.9-7.8 2-4.4 9.9-8.8 13.2s-11 3.3-11 3.3 27.5 9.9 33-6.6z" fill="#4d3118"/><path d="M97.2 84.7c-1-6.4 3-11.8 12-9.7 6.8 1 4 9.7 8 12.9s10 3.2 10 3.2-25 9.7-30-6.4z" fill="#4d3118"/><g opacity=".15"><path d="M98 84.7c1-6.4-3-11.8-12-9.7 13.2 4 2.2 21-18 16.1 0 0 25 9.7 30-6.4zM102.8 75.1S108 75 109 78s0 6 1 8 7.8 7.8 16.4 5.4c0 0-9.3 1.2-11.3-7.1s-3.5-10.2-12.3-9.2z"/></g></symbol><symbol id="face_12"><path d="M104.7 101.1c-2.8 3.2-6.9 5-11.1 5h-.4c-4.3 0-8.3-1.8-11.1-5-3-3.3-4.9-8.6-4.9-11 0-2.1 3.5.6 12.3 1.3l3.7.1h.5c7.9 0 12.8-2.5 13.7-3 .9-.5 2.4-.7 2.4 1.6s-2.1 7.7-5.1 11z" fill="#010101" opacity=".6"/><ellipse transform="rotate(-3.1 82.8 75.8)" cx="82.8" cy="75.8" rx="6.2" ry="8.6" fill="#fff"/><ellipse transform="rotate(-3.1 105.8 75.9)" cx="105.8" cy="75.9" rx="6.2" ry="8.6" fill="#fff"/><ellipse cx="82.9" cy="76.3" rx="3.7" ry="4.4"/><ellipse cx="105.9" cy="76.3" rx="3.7" ry="4.4"/><circle cx="80.5" cy="73.9" r="2" fill="#fff"/><circle cx="103.5" cy="73.9" r="2" fill="#fff"/><path d="M77.7 67.3c3.5-4.1 7-4 10.4 0 0 0-4.8-9.6-10.4 0zM100.7 67.3c3.5-4.1 7-4 10.4 0 0 0-4.8-9.6-10.4 0z"/><path d="M68.3 67v4l2 .2c.8.3 1.3 1 1.4 1.8v5.4s.9 9 10.8 8.5S92.7 77 92.7 77s0-6.5 2.2-6.5 2.3 6.5 2.3 6.5.4 9.9 10.3 9.9 10.3-8.5 10.3-8.5v-5.8c0-.7.6-1.3 1.3-1.3h1.9v-4l-21.8-.1c-.8.2-1.4.6-2 1.2l-2.1 2-2.2-2.1a3.4 3.4 0 00-2.7-1L68.3 67z" fill="none" stroke="#000" stroke-width="2" stroke-miterlimit="10"/><path d="M90.1 96.5l-.2-4.3c3.3.4 6.7.3 10-.4l.2 4.2c.1.5-.2.7-.7.9l-4 .2-.4-3.4-.3 3.3-3.9.2c-.5-.1-.7-.3-.7-.7z" fill="#fff"/></symbol><symbol id="face_13"><path d="M109 98.4a21.1 21.1 0 01-12.9 4.1h-.5a21.2 21.2 0 01-12.9-4.1c-3.5-2.8-5.7-7-5.7-9s7.2 1.1 20.6 1.1h-1.5c9.1 0 14.8-2 15.8-2.4 1-.4 2.7-.6 2.7 1.3 0 1.8-2 6.2-5.6 9z" clip-rule="evenodd" fill="#010101" opacity=".6"/><ellipse cx="97.3" cy="72.7" rx="7.7" ry="10.8" transform="rotate(-3.2 97.4 72.7)" fill="#fff"/><ellipse cx="97.4" cy="74.5" rx="4.6" ry="5.5"/><circle cx="94.5" cy="71.5" r="2.5" fill="#fff"/><path d="M91 62c4.4-5.1 8.7-5 13 0 0 0-6-12-13 0z"/></symbol><symbol id="face_14"><g fill="#010101" opacity=".6"><path d="M84 63c-2-1-5-2-9 3s-8 13-5 19 11 3 12-1 0-6 3-9 4-9-1-12zM103.2 62.8c1.9-.9 4.7-1.9 8.4 2.8s7.4 12.1 4.7 17.7-10.3 2.7-11.2-1 0-5.6-2.8-8.4-3.7-8.3.9-11.1z"/></g><path d="M98 83.11c-3.7-.06-7 .89-7 .89-1.5.3-2 1-1 2 0 0 4.74 3.16 6.5 3.86a58.45 58.45 0 01-.17 3.68c-.11 1.37-.3 2.73-.57 3.69-.14.48-.3.78-.4 1.01-.23.49-.38.61-.38.61-.38.04-.47.03-.47.03-1.5-.06-2.88-.33-4.1-.73a16.37 16.37 0 01-6.54-3.99.5.5 0 10-.74.68s2.58 2.84 6.97 4.26c4.38 1.42 10.6 1.38 17.7-4.2.58-.41-.08-1.26-.6-.8-4.13 3.25-7.85 4.52-11.06 4.75.25-.36.43-.82.58-1.35.3-1.08.49-2.48.6-3.88.11-1.37.16-2.73.18-3.77C99.1 89.13 103 86 103 86c1-.9 1.2-1.6 0-2a14.21 14.21 0 00-5-.89z"/></symbol><symbol id="face_15"><path d="M94 71c-7.4.5-8.9 4.8-8.9 4.8a21 21 0 00-2.4 9.2c0 4.3-.8 4 4.5 5.2 0 0-1 11 9.3 10.3v3.7c0 10.6 6.4 3.4 6.4 3.4s7.9-3.9 9.9-16.4S102.9 71 94 71zm.1 21.2l-.3-.2.3.2zm-.3-.1l-2.6-.9c.9.2 1.8.5 2.6.9zm.8.4c1.2.8 1.7 1.9 1.9 3.8a6 6 0 00-1.9-3.8z" opacity=".2"/><ellipse transform="rotate(-14.7 106.9 72.3)" cx="106.8" cy="72.3" rx="3.6" ry="5.1" fill="#42210b"/><ellipse transform="rotate(-81.6 83.7 72.4)" cx="83.7" cy="72.4" rx="5.7" ry="4" fill="#42210b"/><path d="M94.9 72c-6.7.4-8 4.4-8 4.4a19.1 19.1 0 00-2.2 8.4c0 3.9-.7 3.7 4.1 4.8 0 0-.9 10.1 8.4 9.6v3.4c0 9.8 5.8 3.1 5.8 3.1s7.1-3.6 8.9-15.1-9-18.6-17-18.6zm.1 19.6l-.3-.2.3.2zm-.3-.1l-2.3-.8c.8.1 1.6.4 2.3.8zm.7.4c1.1.8 1.5 1.8 1.7 3.5a5.1 5.1 0 00-1.7-3.5z" fill="#fbdb31"/><path d="M88.8 89.7s-.9 10.1 8.4 9.6c0 0 .8-6.5-2.4-7.8s-6-2-6-1.8z" opacity=".2"/><path d="M86.9 76.4s1.3-4 8-4.4c8 0 18.7 7.1 16.9 18.7s-8.9 15.1-8.9 15.1c8.9-16 5.2-30.5-16-29.4z" opacity=".05"/><path d="M90.3 79.1c-.7 1.4-1.2 2.9-1.6 4.4 0 .9 3.2-5.3 1.6-4.4zm1.3 0a14 14 0 00-.9 2.9c.1.5 2.2-3.7.9-2.9z"/></symbol><symbol id="face_16"><g opacity=".3"><ellipse cx="100.5" cy="86.5" rx="14.5" ry="11.7" fill="#fcfcfc"/><path d="M100.5 98.2c-8 0-14.5-5.2-14.5-11.7s6.5-11.7 14.5-11.7S115 80 115 86.5c0-7.3-7.4-13.3-16.5-13.3S82 79.2 82 86.5s7.4 13.3 16.5 13.3 16.5-6 16.5-13.3c0 6.5-6.5 11.7-14.5 11.7z"/></g><g fill="#211309"><ellipse cx="96" cy="86.5" rx="3" ry="5.5"/><ellipse cx="107" cy="86.5" rx="3" ry="5.5"/></g><g fill="#42210b"><path d="M99 86.5c0 3-1.3 5.5-3 5.5-.5 0-1.1-.2-1.4-.6C98 91 98 82 94.3 82c.4-.6 1-.9 1.7-1 1.7 0 3 2.5 3 5.5zM110 86.5c0 3-1.3 5.5-3 5.5-.5 0-1.1-.2-1.4-.6 3.4-.4 3.4-9.4-.3-9.4.4-.6 1-.9 1.7-1 1.7 0 3 2.5 3 5.5z"/><ellipse transform="rotate(-11.5 109.8 69)" cx="109.8" cy="69" rx="3.6" ry="5.1"/><ellipse transform="rotate(-78.5 86.7 67.7)" cx="86.7" cy="67.7" rx="5.7" ry="4"/></g></symbol><symbol id="face_17"><path d="M117.2 66S81.4 54.5 44 63.5" fill="none" stroke="#000" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round"/><path d="M101.5 63.4s.5 19.6 7 20.6c4.5 1.1 6.5-1.7 7-4.6s.4-11.4-1.8-14.3L101 62l.5 1.4z" fill="#010101"/><ellipse transform="rotate(-3.1 85.3 72.7)" cx="85.3" cy="72.7" rx="7.7" ry="10.8" fill="#fff"/><ellipse cx="85.4" cy="74.5" rx="4.6" ry="5.5"/><circle cx="82.5" cy="71.5" r="2.5" fill="#fff"/><path d="M79 62.4c3.6-2.6 11.5 1.6 17 2.6 0 0-10.9-7.2-12.8-8.2S79 62.4 79 62.4z"/><path d="M106.9 90.8c-2.7-3-6.6-4.8-10.6-4.8h-.4c-10.6 1.1-18.1 10.4-15.3 15.3 2.5 5.5 19.9-8.3 27.8.6 2.3 1.3 3.7-1 3.2-3.4-.4-2.2-1.8-4.5-4.7-7.7z" fill="#010101" opacity=".6"/><path d="M80.8 95.6s-1.8 3.4-.3 5.7c2.5 5.5 19.9-8.3 27.8.6.4-2.9.5-5.9.4-8.8.1-.1-27.9 3.3-27.9 2.5z" fill="#fff"/><path d="M80.8 95.6s-1.8 3.4-.3 5.7c2.5 5.5 19.9-8.3 27.8.6.4-2.9.5-5.9.4-8.8.1-.1-27.9 3.3-27.9 2.5z" fill="#fff"/></symbol><symbol id="face_18"><path d="M77 81s0-12 6-12 6 11.6 6 11.6S84 69 77 81zm24-.5s0-11 5.5-11 5.5 10.6 5.5 10.6-4.6-10.6-11 .4z" fill="#010101" opacity=".6"/><path d="M75 85.4h38.3s-1.1 23.1-19.4 23.1c-5 .2-9.7-1.9-12.9-5.8-5.8-6.8-6-17.3-6-17.3z" fill="#603813"/><path d="M108.1 100.8a16.5 16.5 0 01-14.2 7.3c-5 .2-9.7-1.9-12.9-5.8-5.8-6.8 31.9-8.3 27.1-1.5z" fill="#f15a24"/><path d="M75 85h38.3c-.1 2.5-.5 5-1.3 7.3 0 0-22.5 4.2-35.9-.3a33 33 0 01-1.1-7z" fill="#fff"/></symbol><symbol id="face_19"><path d="M74.4 83c13.5 2 26.4 2.5 38.2 0 0 0-1.1 23-19.4 23-4.9.2-9.6-2-12.8-5.7-5.7-6.8-6-17.3-6-17.3z" fill="#010101" opacity=".6"/><path d="M107.4 98.4a16.7 16.7 0 01-14.2 7.3c-4.9.2-9.6-2-12.8-5.7-5.7-6.9 31.8-8.4 27-1.6z" fill="#f15a24"/><g opacity=".2"><path d="M93.4 67.8c-.2-.4-.6-.6-1-.6l-7.9.2-4.8-6.9c-.4-.5-1-.6-1.5-.2l-.4.5-2.1 8.1-7.5 2.5a1 1 0 00-.7.9c-.1.4.1.8.5 1.1l6.6 4.8.1 8.4c0 .4.2.8.6 1 .4.2.8.1 1.1-.1l6.2-5.1 7.6 2.7h.5l.6-.3c.3-.3.4-.8.2-1.2l-2.8-8c.1.1 4.9-7.4 4.7-7.8zM121.5 71.9a1 1 0 00-.8-.8l-7.6-1.9-2.7-7.4c-.2-.5-.9-.8-1.4-.5l-.4.4-4.2 6.7-7.8.4c-.4 0-.8.3-.9.6-.2.4-.1.8.2 1.1l5 6.1-2.1 7.7c-.1.4 0 .8.3 1.1.3.3.7.4 1.1.2l7.3-3L114 87l.5.2.6-.1c.3-.2.5-.6.5-1l-.5-7.9c-.1-.3 6.5-5.9 6.4-6.3z"/></g><g fill="#f3ff00"><path d="M92.3 68.6a1 1 0 00-.9-.5l-7.1.2-4.2-5.9c-.4-.4-1-.5-1.4-.1l-.3.4-2 7-6.8 2.3c-.3.1-.6.4-.7.8 0 .4.1.7.4.9l5.9 4.1V85c0 .4.2.7.6.9.3.1.7.1 1-.1l5.7-4.4 6.8 2.2c.4.1.7 0 1-.2.2-.3.3-.7.2-1l-2.4-6.9s4.4-6.6 4.2-6.9zM118.9 72.4c-.1-.3-.3-.6-.6-.7l-6.2-1.6-2.2-6.1c-.2-.5-.7-.7-1.2-.5l-.4.3-3.4 5.5-6.4.3c-.5 0-.9.4-.8.9l.2.5 4.1 5-1.7 6.3c-.1.3 0 .7.3.9.2.2.6.3.9.2l6-2.4 5.3 3.6.4.1.5-.1c.3-.2.5-.5.4-.8l-.4-6.5c-.1 0 5.3-4.6 5.2-4.9z"/></g><g opacity=".1"><path d="M84 68.3l-4-5.9a1 1 0 00-1.3-.2c-.2.1-.3.3-.3.5l3.7 6.3 1.9-.7zM90.7 68.8l-4.4 5.8.1.2-.1 1.1 2.4 6.7c.2.5.7.7 1.2.5l.4-.4-2-7.1h-.4l3.7-5.6c.2-.4.1-1-.4-1.2h-.5zM111.8 70.1l-2.1-6.1c-.2-.4-.6-.6-1-.5l-.4.3 1.7 6.4 1.8-.1zM117.4 72.1l-5.3 4v.2l-.4.9.4 6.4c0 .4.4.8.9.7l.5-.2v-6.6l-.3-.1 4.6-4c.3-.3.3-.8 0-1.1l-.4-.2z"/></g><g opacity=".05"><path d="M81.6 79.2l-5.2 4.9a1 1 0 000 1.3l.5.2 5.6-4.7-.9-1.7zM107 78.9l-5.7 3c-.4.2-.5.7-.3 1.1.1.2.2.3.4.3l6-2.7-.4-1.7z"/></g></symbol><symbol id="face_20"><path d="M87.2 94h21.2s-.6 11-10.8 11c-2.6.1-5.2-.9-7.1-2.7-3.2-3.3-3.3-8.3-3.3-8.3z" fill="#603813"/><path d="M105.5 101.3a10 10 0 01-7.9 3.5c-2.6.1-5.2-.9-7.1-2.7-3.2-3.3 17.7-4 15-.8z" fill="#f15a24"/><path d="M71.3 68h-1.8v4h1.8c1 .3 1.8 1.2 1.8 2.2V80s-.3 8.1 11.8 7.9c0 0-8.6.2-10-8.3v-5.4c0-.8-.6-1.5-1.3-1.8l-1.9-.4-.4-4z" fill="#010101" opacity=".5"/><path d="M71.3 68v4l2 .2c.8.3 1.3 1 1.4 1.8v5.4s.9 9 10.8 8.5S95.7 78 95.7 78s0-4.5 2.2-4.5 2.3 4.5 2.3 4.5.4 9.9 10.3 9.9 10.3-8.5 10.3-8.5v-5.8c0-.7.6-1.3 1.3-1.3h1.9v-4l-21.8-.1c-.8.2-1.4.6-2 1.2l-2.1 2-2.2-2.1a3.4 3.4 0 00-2.7-1L71.3 68z" opacity=".5" stroke="#000" stroke-miterlimit="10"/><path d="M71.3 68v4l2 .2c.8.3 1.3 1 1.4 1.8v5.4s.9 9 10.8 8.5S95.7 78 95.7 78s0-4.5 2.2-4.5 2.3 4.5 2.3 4.5.4 9.9 10.3 9.9 10.3-8.5 10.3-8.5v-5.8c0-.7.6-1.3 1.3-1.3h1.9v-4l-21.8-.1c-.8.2-1.4.6-2 1.2l-2.1 2-2.2-2.1a3.4 3.4 0 00-2.7-1L71.3 68z" fill="none" stroke="#000" stroke-miterlimit="10"/></symbol><symbol id="face_21"><path d="M79 88.5c-.3-.1-6.4 4.2-8.3 6.2s.4 7.8 8.3 4c3.2-1.2 7.1-4.7 7.1-4.7s-4.8-2.4-7.1-5.5z" fill="#f15a24"/><path d="M81.1 92.7c-2 1.8-4.2 3.5-6.6 4.8-2.9 1.4-2.1 2.2 0 2.1s5.5-.8 9.7-4.2l1.9-1.4-4-2.2-1 .9z" fill="#e84715"/><path d="M76.1 83.3c-.5-2.6 3.3 13.4 18.4 12.7 16-.8 16.5-13.6 16.5-13.6" fill="none" stroke="#42210b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><g fill="#010101" opacity=".6"><path d="M77 75s0-12 6-12 6 11.6 6 11.6S84 63 77 75zM100 75s0-12 6-12 6 11.6 6 11.6-5-11.6-12 .4z"/></g></symbol><symbol id="bottom_01"><path d="M90.5 122.5s5 0 4-2c-.4-.9-3.9-2.6-3.9-2.6l-2.4.3c2.4 2 3 3.4 2.3 4.3z" opacity=".1"/><path d="M89 122.8s-1.1 3.6 2 4.2c6 1 7 6 6 8-2 5-16 8-22-2s-6-11-16-12-12 5-12 5c0 2 1 1 1 1 2-3.6 5.9-5.6 10-5 9 1 11 3 12 5s5 11 12 13 14 0 16-5-3.3-8.5-6-9c-.8-.2-1.8 0-2-2.8v-.2c0-2-1-.2-1-.2z" opacity=".3"/><path d="M84.5 123.5c1 2 6-1 6-1s5 0 4-2c-.4-.9-3.9-2.6-3.9-2.6l-4.8.6s-1.8 3.9-1.3 5z"/><path d="M90 122.8s-1.1 3.6 2 4.2c6 1 7 6 6 8-2 5-16 8-22-2s-6-11-16-12-12 5-12 5c0 2 1 1 1 1 2-3.6 5.9-5.6 10-5 9 1 11 3 12 5s5 11 12 13 14 0 16-5-3.3-8.5-6-9c-.8-.2-1.8 0-2-2.8v-.2c0-2-1-.2-1-.2z" fill="#fff"/><path d="M84.5 123.5c1 2 4-1 6-1s5 0 4-2c-1.5.5-7.5 2.5-10 3z" opacity=".1"/></symbol><symbol id="bottom_02"><g fill="currentColor"><path d="M117.8 127.3c-5-5.9-9.9-2.5-11.9-.7-1.2-1-2.3-2.1-3.2-3.4L97 115a35.2 35.2 0 01-12.2 4.1l3.6 11s-5 .7-5 3.4 2.2 6.2 8.6 3.4 12.9-.7 18.6.7 12.2-.7 12.2-4.8c0-3.2-1.3-5.6-5-5.5zM75.5 125.9l-.8-7.2s-10-1.4-16.4-5.7c0 0-3.4 12.9-6.9 14.9a4 4 0 00-5.4 1.3 3.9 3.9 0 003.3 6c.6 0 1.3-.2 1.8-.5a5.3 5.3 0 009 .2 5.4 5.4 0 007.1 2.6 5 5 0 002.5-2.5 6 6 0 008.3 2.1 6 6 0 002.1-8.3 5.6 5.6 0 00-4.6-2.9z"/></g><g fill="#fff" opacity=".2"><path d="M122 131.9c-2.6-2.6-7.9-3-7.9-3a9 9 0 013.9-.9c2.2-.1 4 1.7 4 3.9zM86.1 119.1S90 128 89 131c0 0 1.9-8 1-10.2s-3.9-1.7-3.9-1.7zM58.9 113.9s-3.3 11.2-6.3 13c0 0 7.2-5.6 8.1-8.4s-1.8-4.6-1.8-4.6zM79 130.9c-2.6-2.6-4.6-3.3-7.9 0 0-2.2 1.8-3.9 3.9-3.9s4 1.7 4 3.9zM67.6 133c-1.9-1.9-3.3-2.4-5.7 0-.1-1.6 1.1-2.9 2.7-3s2.9 1.1 3 2.7v.3zM58.3 131.6c-1.4-1.4-2.5-1.8-4.3 0a2.1 2.1 0 012.3-2c1.1 0 1.9.9 2 2zM52.1 131.6c-1.3-2.4-2.6-3.2-5.5-1.6.4-1.5 1.9-2.5 3.4-2.1 1.5.4 2.5 1.9 2.1 3.4v.3z"/></g><g fill="#010101" opacity=".1"><path d="M83.4 133.5c0 2.7 2.2 6.2 8.6 3.4s12.9-.7 18.6.7 12.2-.7 12.2-4.8C114 138 113 134 98 134.6c-8 0-12 4.4-14.6-1.1zM71.5 136.1c5.2-.4 7.8-1.8 7.3-8.4a5.6 5.6 0 01-7 8.6c-.2 0-.2-.1-.3-.2zM62.6 136.5c4.2-.3 6.2-1.5 5.8-6.7 1.9 1.6 2.1 4.4.5 6.2s-4.4 2.1-6.2.5c0 .1-.1 0-.1 0zM53.5 135.9c3.7-.2 5.5-1.3 5.2-5.9 1.7 1.4 2 3.8.6 5.5a3.9 3.9 0 01-5.5.6l-.3-.2zM47.3 134c3-.2 4.5-1 4.2-4.8 1.4 1.1 1.6 3.1.5 4.5s-3.1 1.6-4.5.5l-.2-.2zM69 117.5l.8 7.3c-5.1-.4-10.2.6-14.7 2.8a40 40 0 0114.9-.8s2.8-1.8 5.6-.9l-.9-7.4a22 22 0 01-5.7-1zM105.9 126.6c2-1.8 6.9-5.2 11.9.7 0 .1-8.8 2.7-11.9-.7z"/></g></symbol><symbol id="bottom_03"><path d="M59.5 114.4c-.6-1-1.9-1.2-2.9-.6h-.1c-1.8 1.2-1.8 2.9-1.2 3.5l12.2 13.4 1.2 11.1s0 1.2 2.3 1.2 1.8-1.8 1.8-1.8l-.6-11.1 8.8-14c1.2-1.8-1.2-5.8-4.7-2.9L71.6 126 70 109.8a3 3 0 00-2.9-1.8c-2.3 0-2.3 2.3-2.3 3.5s2.9 15.2 2.9 15.2l-8.2-12.3zM119 120.2c0-.6-.5-1.2-1.1-1.2l-11.1 2.9-2.1 2c1.7-1.9 3.1-3.9 4.4-6.1 1.2-2.3 2.3-1.8 2.3-1.8s2.9 0 3.5-1.8-.6-1.8-2.9-2.3c-1.5-.3-3 .1-4.1 1.2l-8.8 9.9-3.5-5.2 1.8-3.5c-1.8 2.3-12.2 5.2-12.2 5.2l5.2 1.2c2 1.7 3.8 3.7 5.2 5.8 1.8 2.9-2.3 14-2.3 14-.3 2.5 3.7 1.5 4.7-2.2.5-2.8 1.2-5.5 2-8.1 1.4.2 9.3 1.1 10.9 1.1.9 0 1.7-.7 1.8-1.7v-.1l-5.8-3.5c-.1.1 12.1-4.6 12.1-5.8z"/><g fill="#010101" opacity=".1"><path d="M59.5 114.4c-.6-.2-1.2-.2-1.8 0-1.8 1.2 1.8 5.2 1.8 5.2l9.3 11.1 1.2 11.1s-.3 1.2 1.2 1.2c2-.3 1.8-1.8 1.8-1.8l-.6-11.1 8.8-14c1.2-1.8-.9-3.8-3.5-1.2l-5.8 12.8-1.9-17.9s0-1.2-2.3-1.2-1.8 2.9-1.8 2.9l2.9 16.9-9.3-14zM92.4 118.2l5.3 7 1.5-2.1-3.6-5.1 1.4-2.9-4.6 2.5z"/></g><path d="M99.8 126.7c2.3-1.8 6.6-8.3 9.2-12.1 2.2-1.6 4.9-2.2 6-.2-.5 1.8-3.5 1.8-3.5 1.8s-1.2-.6-2.3 1.8-5.8 8.2-7.6 9.3-3.6 11-3.6 11c-1 1.9-2 3-3.1 3l4.9-14.6z" opacity=".1"/><path d="M106.8 122l11.1-2.9c.6 0 1.2.5 1.2 1.1 0 1.2-12.2 5.8-12.2 5.8l5.8 3.5c0 .9-.7 1.7-1.7 1.8h-.1c-1.8 0-11.1-1.2-11.1-1.2l1.2-2.5 5.8-5.6z" fill="#010101" opacity=".2"/></symbol><symbol id="bottom_04"><path d="M86.8 118.7L108 109c5.8 10.7 5 19.9 0 28.1l-21.2-10.8c.9-1.1 1.9-5.2 0-7.6zM79.1 117.7l-26-12c-5.5 9.6-5.5 21.2 0 34.6l26.1-13.4c-1.2-1.3-3.8-5.4-.1-9.2z"/><path d="M79.1 117.7l-26-12c-5.5 9.6-5.5 21.2 0 34.6l26.1-13.4c-1.2-1.3-3.8-5.4-.1-9.2z" fill="#fff" opacity=".15"/><g fill="#010101" opacity=".5"><path d="M97.9 125.9l-7.1-1.6s-1.2-.1-1.1-.8c.1-.7 1.3-.5 1.3-.5l7.2.2c.7.1 1.2.8 1.1 1.5-.1.7-.7 1.2-1.4 1.2zM98.2 120l-7.1 1.4s-1.1.4-1.3-.3c-.2-.7 1-1 1-1l6.8-2.7a1 1 0 011.4.9v.1c.3.7-.1 1.3-.8 1.6zM66.8 127l9.1-2.2s1.6-.2 1.5-1c-.2-.6-1.8-.3-1.8-.3l-9.3.9c-.8 0-1.4.8-1.3 1.6.2.8 1 1.2 1.8 1zM66.3 120l9.3 1.5s1.5.4 1.7-.3c.2-.7-1.3-1-1.3-1l-8.9-2.7c-.8-.2-1.6.2-1.9 1-.2.7.3 1.4 1.1 1.6z"/></g><circle cx="83.9" cy="122.1" r="6.7"/></symbol><symbol id="bottom_05"><path d="M95.8 115.5a16 16 0 002.7 2.5c.4 0 1.3-2.4 2.1-5 2.7-1.8 2.2-1.4 4.7-3.5 3.1 6.5 8.6 19.5 8.6 19.5l-1.9 10v-9s-7.7-17-8.7-17c-1 0-2.9 11-3.9 11-.5 0-7.3-7.2-7.3-7.2zM55.9 110.6s-3.6 3.4-4 3.4c-1.1 0-4.4-12-5.5-12s-12.1 23-12.1 23l2.2 10v-9s8.8-17 9.9-17 3.3 11 4.4 11c.5 0 8.3-7.1 8.3-7.1l-3.2-2.3z"/><g fill="#010101" opacity=".2"><path d="M55.9 110.6s-3.6 3.4-4 3.4c-1.1 0-4.4-12-5.5-12s-12.1 23-12.1 23l2.2 10v-9s8.8-17 9.9-17 3.3 11 4.4 11c.5 0 8.3-7.1 8.3-7.1l-3.2-2.3zM95.8 115.5a16 16 0 002.7 2.5c.4 0 1.3-2.3 2.1-5 2.6-1.7 2.3-1.5 4.7-3.5 3.1 6.5 8.6 19.5 8.6 19.5l-1.9 10v-9s-7.7-17-8.7-17c-1 0-2.9 11-3.9 11-.5 0-7.3-7.2-7.3-7.2z"/></g><path d="M70 107.1s-9 12.3-10 12.3-4-13.4-5-13.4-11 25.8-11 25.8l2 11.2v-10.1s8-19.1 9-19.1 3 12.3 4 12.3 15-16.8 15-16.8 0-3.3-4-2.2z"/><path d="M60 122.4c-1 0-4-12.4-5-12.4s-10 21.8-10 21.8l1 11.2v-10.1s8-19.1 9-19.1 3 12.3 4 12.3 15-16.8 15-16.8c0-.9-.5-1.8-1.3-2.2-.6-.3-11.7 15.3-12.7 15.3z" fill="#010101" opacity=".1"/><path d="M96 107.2s9 12.3 10 12.3 4-13.5 5-13.5 11 25.8 11 25.8l-2 11.2v-10.1s-8-19.1-9-19.1-3 12.3-4 12.3-15-16.8-15-16.8 0-3.2 4-2.1z"/></symbol><symbol id="bottom_06"><path d="M61 114.7a63.3 63.3 0 0026.6 16c-7 2.5-8 6.5-9.6 12.3 0 0 15.4-3.3 17-7.7 0 0 6 6.8 18 5.8-2.2-5.8-9-12.2-18-13.5-2.7 0-4.2-6.8 3-12.6-22 8.7-37-.3-37-.3z" fill="currentColor"/><path d="M87.6 130.7c-6.6 2.1-8.3 6.7-9.6 12.3 0 0 15.4-3.3 17-7.7 0 0 6 6.8 18 5.8-2.2-5.8-9-12.2-18-13.5 0 .4-.6 1-.6 2.2-1.6-.3-4.3.1-6.8 1z"/><path d="M91 128.5s14 4.8 22 12.6c-2.2-5.8-9-12.2-18-13.5-2.7 0-4.2-6.8 3-12.6a52 52 0 01-8.5 2.6c-2.5 8 1.5 10.9 1.5 10.9z" fill="#010101" opacity=".1"/></symbol><symbol id="bottom_07"><path d="M85.2 120.5c-.6 5.3 0 10.6 1.8 15.5 3 8 2 6 2 6" fill="none" stroke="#3f2904" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M88 138s-6.4-19.1 12.8-19.6S129 99 129 99a34.4 34.4 0 01-10 29c-7 8-23-4-31 10zM84.7 130.4s-3.3-8.8-17.9-10-29.2 1.2-32.5-14.4c-1 8.2 1.4 16.5 6.8 22.8 9 10.8 31.4 3.6 31.4 3.6s9-3.6 14.6 3.6l-2.4-5.6z"/><g opacity=".25" fill="#010101"><path d="M88 138c-1-17 36-8 41-39a34.4 34.4 0 01-10 29c-7 8-23-4-31 10zM34.2 106S33 120 41 128.8c9 10.2 31.4 3.6 31.4 3.6 1.4-2.4 15.6-.3 14.6 3.6 0-13.7-48-3.9-52.8-30z"/></g></symbol><symbol id="bottom_08"><path fill="#fd9727" d="M101.62 127.8c.63-6.9-.75-8.88-.75-8.88s-1.62-10.24-6.44-12.83c-3.13-1.78-5.67-1.83-7.93-1.11-2.13.02-4.18.67-6.02 1.87-.11.08-.33.14-.45.22a34.1 34.1 0 01-13.18-2.97 15.6 15.6 0 00-9.95-1.16c-4.7.17-10.04 2.77-11.13 12.84-1.84 16.53 6.55 24.13 6.55 24.13 3.75 4.02 10.66 6.88 16.22 5.33 2.43.03 4.73-.88 6.62-2.37 0 0 4.13-6.07 10.02-7.76l.31-.04c2.71.18 5.48.06 8.11-.48 4.51-.21 7.52-1.7 8.02-6.8z"/><path d="M69.43 143.67a9.66 9.66 0 01-3.8 1.97c.92-.04 1.85-.18 2.71-.43 2.44.02 4.73-.89 6.62-2.38 0 0 4.04-6.08 10.02-7.75-.92.03-1.86.17-2.81.4-7.34.12-12.74 8.2-12.74 8.2zm32.19-15.88c.63-6.9-.75-8.87-.75-8.87s-1.62-10.25-6.44-12.84c-3.14-1.77-5.67-1.82-7.93-1.1-.92.03-1.86.17-2.72.42 1.81.12 3.55.64 5.12 1.52 4.82 2.6 6.44 12.84 6.44 12.84s1.37 1.97.75 8.87c-.4 3.99-2.33 5.68-5.32 6.46.92-.03 1.86-.17 2.82-.4 4.52-.32 7.53-1.81 8.03-6.9zm-34.87-23.7a15.6 15.6 0 00-9.95-1.17c-.92.04-1.86.17-2.82.4 2.45-.06 5 .5 7.14 1.59 3.05 1.66 12.3 3.92 16 2.55 1.1.1 2.25-.1 3.26-.63-.12.08-.33.14-.45.22a34.1 34.1 0 01-13.18-2.96z" opacity=".8"/><circle fill="#33221f" transform="rotate(10.13)" r="5.7" cy="105.12" cx="100.63"/><path fill="#543933" d="M113.02 114.08l-28.18 3.66a5.7 5.7 0 011.08 4.45 5.7 5.7 0 01-.46 1.4l28.34-3.68c.41-.03.7-.48.67-.9l-.56-4.26c-.03-.4-.48-.7-.9-.67z"/><path d="M68.41 115.25l2.59 15.1-3.56.58-.3-1.78c-.93.13-1.92-.55-2.06-1.49l.02-.1c-.3-1.78-1.54-7.9-1.54-7.9.12-.68.74-1.28 1.38-1.47l-.18-2.37z"/><path fill="#fd9727" d="M118.97 110.88l6.87-.9a4.98 4.98 0 015.54 4.24l.12 1.03a4.98 4.98 0 01-4.24 5.54l-6.87.91a4.98 4.98 0 01-5.54-4.24l-.12-1.04a4.98 4.98 0 014.24-5.54z"/><path opacity=".2" d="M118.97 110.88l6.87-.9a4.98 4.98 0 015.54 4.24l.12 1.03a4.98 4.98 0 01-4.24 5.54l-6.87.91a4.98 4.98 0 01-5.54-4.24l-.12-1.04a4.98 4.98 0 014.24-5.54z"/><path fill="#543933" d="M116.62 110.97s-.59-1.83.96-1.96c1.55-.13 1.33 1.66 1.33 1.66zm3.59 10.6s.49 1.81-.96 1.96c-1.45.15-1.33-1.66-1.33-1.66zm4.13-.38s.49 1.81-.96 1.96c-1.45.15-1.33-1.66-1.33-1.66zm3.54-.49s.5 1.82-.96 1.96c-1.45.15-1.33-1.66-1.33-1.66zm-7.11-10.2s-.59-1.84.96-1.97c1.55-.13 1.33 1.66 1.33 1.66zm4.13-.39s-.59-1.83.96-1.96c1.55-.13 1.33 1.66 1.33 1.66z"/><path fill="#fd9727" d="M118.09 110.72l6.86-.9a4.98 4.98 0 015.54 4.24l.12 1.04a4.98 4.98 0 01-4.24 5.54l-6.87.9a4.98 4.98 0 01-5.54-4.24l-.12-1.04a5.07 5.07 0 014.25-5.54z"/><path d="M117.51 113.36l8.53-1.11c.31-.05.57.2.62.51.05.32-.2.58-.52.62l-8.53 1.12c-.3.04-.57-.2-.61-.52-.05-.31.2-.57.51-.62zm1.07 4.26l8.53-1.12c.31-.04.57.2.62.52.04.31-.2.57-.52.62l-8.53 1.11c-.31.05-.57-.2-.62-.51-.06-.22.2-.58.52-.62z"/></symbol><symbol id="bottom_09"><path d="M73.7 124.8l-.1-1 .1-6.3-3.8-.5.5 4c-3-.2-5.9.5-8.5 2-3 2-5 5-3 8s6 3 11 0a7.2 7.2 0 003.8-6.2z" fill="currentColor"/><path d="M76.8 122s0-2.1-3.2-2.5v4.3l.1 1c-.1 2.6-1.5 5-3.8 6.2-5 3-9 3-11 0s0-6 3-8c2.6-1.5 5.5-2.2 8.5-2l-.2-1.3c-1.8.3-3.6.8-5.3 1.3-12 4-13 16-12 17s3 2 10 2c4.2-.1 8-2.3 10-6l1 5s2 2 3 0-.1-17-.1-17z"/><path d="M87.2 124.8l.1-1-.1-6.3 3.8-.5-.5 4c3-.2 5.9.5 8.5 2 3 2 5 5 3 8s-6 3-11 0a7 7 0 01-3.8-6.2z" fill="currentColor"/><path d="M84 122s0-2.1 3.2-2.5v4.3l-.1 1c.1 2.6 1.5 5 3.8 6.2 5 3 9 3 11 0s0-6-3-8a14.9 14.9 0 00-8.5-2l.2-1.3c1.8.3 3.6.8 5.3 1.3 12 4 13 16 12 17s-3 2-10 2c-4.2-.1-8-2.3-10-6l-1 5s-2 2-3 0 .1-17 .1-17z"/></symbol><symbol id="bottom_10"><ellipse cx="80" cy="131.5" rx="32" ry="8.7" opacity=".3"/><ellipse cx="80" cy="130.3" rx="17" ry="4.1" opacity=".6"/></symbol><symbol id="bottom_11"><g fill="currentColor"><path d="M64.7 115.9s-2.8 10.7-11.2 12.9c-5 1.3-10.3.5-14.6-2.2 0 0-3.9-1.1-1.7 2.8s8.4 11.8 25.8 5.6 18-16.9 18-16.9-11.2 1.2-16.3-2.2z"/><path d="M58 112s-6.2 13.5-15.2 3.9c0 0-5.6-5.6-3.4 1.1s11.1 18.7 30.3.9c0 .1-7.8-2-11.7-5.9zM94.8 115.9s2.8 10.7 11.2 12.9c5 1.3 10.3.5 14.6-2.2 0 0 3.9-1.1 1.7 2.8s-8.4 11.8-25.9 5.6-18-16.9-18-16.9 11.3 1.2 16.4-2.2z"/><path d="M101.5 112s6.2 13.5 15.2 3.9c0 0 5.6-5.6 3.4 1.1s-11.2 18.7-30.3.9c-.1.1 7.8-2 11.7-5.9z"/></g><ellipse transform="rotate(-65 46 121.6)" cx="45.9" cy="121.6" rx="1.4" ry="1.8"/><ellipse transform="rotate(-2.5 51 122.3)" cx="51" cy="122.3" rx="1.8" ry="1.4"/><ellipse transform="rotate(-27.5 55.6 121)" cx="55.6" cy="121.1" rx="1.4" ry="1.1"/><ellipse transform="rotate(-47.8 58.4 118.6)" cx="58.4" cy="118.6" rx="1.4" ry="1.1"/><ellipse transform="rotate(-25 113.5 121.6)" cx="113.5" cy="121.6" rx="1.8" ry="1.4"/><ellipse transform="rotate(-87.5 108.5 122.3)" cx="108.5" cy="122.3" rx="1.4" ry="1.8"/><ellipse transform="rotate(-62.5 103.9 121.1)" cx="103.9" cy="121.1" rx="1.1" ry="1.4"/><ellipse transform="rotate(-42.2 101 118.6)" cx="101.1" cy="118.6" rx="1.1" ry="1.4"/><path d="M58 112s-6.2 13.5-15.2 3.9c0 0-5.6-5.6-3.4 1.1s11.1 18.7 30.3.9c0 .1-7.8-2-11.7-5.9z" fill="#010101" opacity=".3"/><g fill="#010101" opacity=".2"><path d="M101.5 112s6.2 13.5 15.2 3.9c0 0 5.6-5.6 3.4 1.1s-11.2 18.7-30.3.9c-.1.1 7.8-2 11.7-5.9zM64.7 115.9s-2.8 10.7-11.2 12.9c-5 1.3-10.3.5-14.6-2.2 0 0-3.9-1.1-1.7 2.8s8.4 11.8 25.8 5.6 18-16.9 18-16.9-11.2 1.2-16.3-2.2z"/><path d="M94.8 115.9s2.8 10.7 11.2 12.9c5 1.3 10.3.5 14.6-2.2 0 0 3.9-1.1 1.7 2.8s-8.4 11.8-25.9 5.6-18-16.9-18-16.9 11.3 1.2 16.4-2.2z"/></g><g fill="currentColor"><path d="M62.5 114.8s-1.7 14.6-7.3 14.6c0 0-2.2 0-3.9-2.8s-3.4-2.2-2.8.6S50.7 139.6 62 139s15.7-11.2 15.7-17.4v-3.2c-.1 0-9.6.3-15.2-3.6zM97 114.8s1.7 14.6 7.3 14.6c0 0 2.2 0 3.9-2.8s3.4-2.2 2.8.6-2.2 12.4-13.5 11.8-15.7-11.2-15.7-17.4v-3.2s9.6.3 15.2-3.6z"/></g><ellipse transform="rotate(-37.1 64.1 128.3)" cx="64.1" cy="128.3" rx="2.2" ry="1.7"/><ellipse transform="rotate(-9.5 58.5 131.1)" cx="58.5" cy="131.1" rx="2.2" ry="1.7"/><ellipse transform="rotate(-62.1 68 123.8)" cx="68" cy="123.8" rx="1.8" ry="1.3"/><ellipse transform="rotate(-82.4 69 119.3)" cx="69.1" cy="119.3" rx="1.8" ry="1.3"/><ellipse transform="rotate(-52.9 95.3 128.3)" cx="95.3" cy="128.3" rx="1.7" ry="2.2"/><ellipse transform="rotate(-80.5 101 131.1)" cx="100.9" cy="131.1" rx="1.7" ry="2.2"/><ellipse transform="rotate(-27.9 91.5 123.8)" cx="91.5" cy="123.8" rx="1.3" ry="1.8"/><ellipse transform="rotate(-7.6 90.4 119.3)" cx="90.4" cy="119.3" rx="1.3" ry="1.8"/></symbol><symbol id="bottom_12"><g fill="#ededed"><path d="M61 115.2l3.6 5.1s6.2 4 16.8 3.6c13.1-.7 17.5-3.6 17.5-3.6l2.9-7.3s-16 10.9-40.8 2.2z"/><path d="M67.9 131a6 6 0 002 1.2c6.1 2.6 21 2.5 24.2-1.2l2.2-9.6a60 60 0 01-29.9 0l1.5 9.6z"/><path d="M70.3 133.7c3.1 3.1 7.3 4.8 11.7 4.8 7.3 0 10.2-4.8 10.2-4.8v-1.1s-10.9 3.8-21.9-.5v1.6z"/></g><path d="M81.4 123.9l1.6-.1a37.6 37.6 0 0015.9-3.5l2.9-7.3s-7.1 4.9-19.2 5.5c2.4 1.1-1.2 5.4-1.2 5.4z" opacity=".05"/><path d="M70.3 133.7c3.1 3.1 7.3 4.8 11.7 4.8 7.3 0 10.2-4.8 10.2-4.8v-1.1s-10.9 3.8-21.9-.5v1.6z" opacity=".3"/><path d="M78.1 123.5c.3.3-6.4 3.9-10.9 3.7l.3 1s9.7-1 12.7-5l-2.1.3zm16.8 4.8c1.2.7-10.3 6.7-16 5.9l4-.1s9-.4 12-4.5v-1.3zm-.4-6.4s-13.4 10.3-25.6 9.8l1.6.6s10.9 1.6 25.8-10.4h-1.8z"/><g opacity=".15"><path d="M81 134c5.6.1 11.3-.9 13.1-3l2.2-9.6a86 86 0 01-14.3 1.8c.9 1.5.1 5.8-1 10.8z"/><path d="M82.1 123.2c10.2 0 13.7-1.5 13.7-1.5l-.6 1.5s-16.8 3.6-28.4-.7v-1.1s5.1 1.8 15.3 1.8z"/></g></symbol><symbol id="bottom_13"><path d="M88.8 117.9l.2 6.1c3.2 1.2 6.8 1.2 10 0l3.2-11.8s-7.7 4.6-13.4 5.7z" fill="#99671d"/><path d="M91 124.6S89.9 137 91 139s4.4 3 4.4 0 1.6-14.4 1.6-14.4l-3 .2c-1 0-2 0-3-.2z" fill="#f5f5f5"/><path d="M91 139c1.1 2 4.4 3 4.4 0s1.6-14.4 1.6-14.4l-3 .2s0 15.2-3 14.2z" opacity=".1"/><path d="M69.6 123.3s2.6 5.2 5.2 7.1L78 133v4.2c0 .4-9.8-2.8-8.4-13.9z" fill="#6d4716"/><path d="M68.9 123.3s5.2-1.3 8.4 2 3.2 7.8 1.3 7.8-1.9.6-9.7-9.8z" fill="#fff"/><path d="M44.2 108.4s4.5-7.8 18.2-.7S65 129.8 77.3 137c0 0-3.5 3.5-8-5.7-4.4-9-4.3-23.6-25.1-22.9z" fill="#99671d"/><path d="M77.3 137s-5.8 2.6-9.8-10.4S59 105.8 48 106.4c-1.6 0-3 .6-4.2 1.6-5.3 4.8-1.2 18.7 4.2 23.1 6.5 5.2 20.8 10.4 26.7 8.4s2.6-2.5 2.6-2.5z" fill="#444"/><path d="M78.2 118.2l-.9 7.1c-1.8-1.3-3.4-2.2-4.8-2.2l.6-5.9c1.7.5 3.4.8 5.1 1z" fill="currentColor"/><path d="M45.5 111h11c.3 0 .5.2.5.5s-.2.5-.5.5h-11c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM44.5 114h14c.3 0 .5.2.5.5s-.2.5-.5.5h-14c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM44.5 117h17c.3 0 .5.2.5.5s-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM45.5 120h17c.3 0 .5.2.5.5s-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM46.5 123h17c.3 0 .5.2.5.5s-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM48.5 126h17c.3 0 .5.2.5.5s-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM50.5 129h15c.3 0 .5.2.5.5s-.2.5-.5.5h-15c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM54.5 132h13c.3 0 .5.2.5.5s-.2.5-.5.5h-13c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM59.5 135h9c.3 0 .5.2.5.5s-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5z"/><path d="M94.7 124.7c1.8-.2 2.5-.1 4.3-.7l3.2-11.8-4.3 2.4s-.7 10.2-3.2 10z" opacity=".1"/></symbol><symbol id="bottom_14"><path d="M97 122.5s-2.8 5.5-5.5 7.5c-1.2.8-2.3 1.8-3.4 2.7v4.4c0 .4 10.2-3 8.9-14.6z" fill="#6d4716"/><path d="M97.6 122.5s-5.4-1.4-8.9 2-3.4 8.2-1.4 8.2 2.2.7 10.3-10.2z" fill="#fff"/><path d="M123.5 106.8s-4.8-8.2-19.1-.7c-14.3 7.5-2.7 23.2-15.7 30.7 0 0 3.4 4.3 8.4-5.9 4.7-9.3 4.6-24.7 26.4-24.1z" fill="#99671d"/><path d="M88.8 136.8s6.1 2.7 10.2-10.9 8.9-21.8 20.4-21.1c1.6 0 3.2.6 4.4 1.7 5.6 5 1.3 19.6-4.4 24.2-6.8 5.4-21.8 10.9-27.9 8.9s-2.7-2.8-2.7-2.8z" fill="#444"/><path d="M87.8 117.2l1 7.4c1.9-1.4 3.6-2.3 5-2.3l-.6-6.2c-1.8.5-3.6.8-5.4 1.1z" fill="currentColor"/><path d="M122.2 110.6h-11.6c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5zM123.3 113.8h-14.7c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h14.7c.3 0 .5.2.5.5v.1c0 .3-.3.5-.5.5zM123.3 116.9h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .3-.3.5-.5.5zM122.2 120.1h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .2-.2.5-.5.5zM121.1 123.2h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5zM119.1 126.4h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .2-.3.5-.5.5zM117 129.5h-15.8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5H117c.3 0 .5.2.5.5v.1c0 .2-.3.4-.5.4zM112.8 132.7H99.1c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h13.7c.3 0 .5.2.5.5v.1c0 .2-.3.5-.5.5zM107.5 135.8H98c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h9.5c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5z"/><path d="M63 123.5s-2.8 5.5-5.5 7.5c-1.2.8-2.3 1.8-3.4 2.7v4.4c0 .4 10.2-3 8.9-14.6z" fill="#6d4716"/><path d="M60.3 113l-2.1 11.3c1.9-1.4 2.7-.3 4.1-.3l2.2-9.2c-2-.4-2.9-1.4-4.2-1.8z" fill="currentColor"/><path d="M63.6 123.5s-5.5-1.4-8.9 2c-3.4 3.4-3.4 8.2-1.4 8.2s2.2.7 10.3-10.2z" fill="#fff"/><path d="M89.5 107.8s-4.8-8.2-19.1-.7c-14.3 7.5-2.7 23.2-15.7 30.7 0 0 3.6 4 8.4-6 4.6-9.3 4.6-24.6 26.4-24z" fill="#99671d"/><path d="M54.8 137.8s6.1 2.7 10.2-10.9 8.9-21.8 20.4-21.1c1.6 0 3.2.6 4.4 1.7 5.6 5 1.3 19.6-4.4 24.2-6.8 5.4-21.8 10.9-28 8.9s-2.6-2.8-2.6-2.8z" fill="#444"/><path d="M88.2 111.6H76.6c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5zM89.3 114.8H74.5c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h14.7c.3 0 .5.2.5.5v.1c.1.3-.2.5-.4.5zM89.3 117.9H71.4c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .3-.3.5-.5.5zM88.2 121.1H70.3c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .2-.2.5-.5.5zM87.1 124.2H69.3c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c-.1.3-.3.5-.6.5zM85.1 127.4H67.2c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .2-.3.5-.5.5zM83 130.5H67.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5H83c.3 0 .5.2.5.5v.1c0 .2-.3.4-.5.4zM78.8 133.7H65.1c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h13.7c.3 0 .5.2.5.5v.1c0 .2-.3.5-.5.5zM73.5 136.8H64c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h9.5c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5z"/></symbol><symbol id="bottom_15"><path d="M129.1 114.1c1.2-1.8-.9-2.8-3.2-2.3 0 0-14.6 2.6-30 4-13.2 5.7-27 6-35.7-1.6-12.6-3-22.4-7.5-25.7-5.8 0 0-6.6.9-5.3 5.3-.1 1.3.2 2.5.8 3.7 3.6 5.7 39.8 13.8 72.4 8 18.3-3.2 25.2-6.8 26.7-9.2.3-.6.3-1.4 0-2.1zM54 123.4zm45.8.3l2.5-.4a267.1 267.1 0 00-2.5.4z" fill="#fff"/><circle cx="63.8" cy="134.7" r="6.1" fill="#490b37"/><circle cx="61.1" cy="134.5" r="6.1"/><circle cx="111.3" cy="133.1" r="6.1" fill="#490b37"/><circle cx="61.1" cy="134.5" r="6.1" fill="#fff" opacity=".4"/><path d="M56.5 132l4.2.4c.7.1 1.2.7 1.2 1.4l-.1 1.5c-.1.7-.7 1.2-1.4 1.2l-4.2-.4c-.7-.1-1.2-.7-1.2-1.4l.1-1.5c.1-.7.7-1.2 1.4-1.2z" fill="#010101"/><circle cx="108.7" cy="133.7" r="6.1"/><circle cx="108.7" cy="133.7" r="6.1" fill="#fff" opacity=".4"/><path d="M103.5 132.7l4.1-.9c.7-.2 1.4.3 1.5 1l.3 1.5c.2.7-.3 1.4-1 1.5l-4.1.9c-.7.2-1.4-.3-1.5-1l-.3-1.5c-.2-.6.3-1.3 1-1.5z" fill="#010101"/><circle cx="99.3" cy="135.7" r="6.1" fill="#490b37"/><circle cx="96.6" cy="136.3" r="6.1" fill="#fff"/><circle cx="96.6" cy="136.3" r="3.4"/><path d="M120.3 125.5c-14.3 4.5-59.6 9.8-77.8-.9-1.8-1-4.4-2.9-4.4-2.9s32.9 10.8 72.9 1.8c11.3-2.9 18-5.5 18.4-9.2 3.1 2-2.5 9.1-9.1 11.2z" fill="#490b37"/><path d="M29.2 113.6c-.1 1.3.2 2.5.8 3.7 3.6 5.7 39.8 13.8 72.4 8 18.3-3.2 25.2-6.8 26.7-9.2.5-.8 0-2.6-.1-1.9-6 4.7-23.4 10-43.3 10.7-26.1 1-54.4-3.7-56.5-11.3z" opacity=".1"/><circle cx="51.7" cy="133.7" r="6.1" fill="#490b37"/><circle cx="49" cy="133.4" r="6.1" fill="#fff"/><circle cx="49" cy="133.4" r="3.4"/><path d="M34.5 108.4s-8.1 1.2-4.5 6.9c3.6 5.7 39.8 13.8 72.4 8 18.3-3.2 25.2-6.8 26.7-9.2 1.2-1.8-.8-2.8-3.2-2.3 0 0-14.6 2.6-30 4a42.9 42.9 0 01-35.6-1.6c-12.6-3-22.5-7.5-25.8-5.8z"/><ellipse cx="79" cy="121" rx="18" ry="2" fill="#010101" opacity=".15"/></symbol><symbol id="bottom_16"><g fill="#a34b1a"><path d="M79 119.2l-.4 11.2s1.1 2.6-9.7 2.6H46.2s-5.4-5.2-2.2-7.8 11.9-3.4 11.9-3.4l-2.6-6.6 25.7 4zM81.6 119.2L80 130.4s-1 2.6 9.8 2.6h22.7s5.4-5.2 2.2-7.8-14.9-3.4-14.9-3.4l.6-5.6-18.8 3z"/></g><path d="M59.8 118.4l-8.3-.9c-.3 0-.5-.3-.4-.6l.1-.5c0-.3.3-.5.6-.4l8.3.9c.3 0 .5.3.4.6l-.1.5c-.1.2-.3.4-.6.4zM60.6 120.9l-8.3-.9c-.3 0-.5-.3-.4-.6l.1-.5c0-.3.3-.5.6-.4l8.3.9c.3 0 .5.3.4.6l-.1.5c-.1.3-.4.5-.6.4zM94.9 117.3l8.3.5c.3 0 .5.3.5.5v.5c0 .3-.3.5-.5.5l-8.3-.5c-.3 0-.5-.3-.5-.5v-.5c0-.3.3-.6.5-.5zM93.9 119.6l8.3.5c.3 0 .5.3.5.5v.5c0 .3-.3.5-.5.5l-8.3-.5c-.3 0-.5-.3-.5-.5v-.5c0-.3.2-.5.5-.5z"/><g fill="#490b37"><circle cx="68.5" cy="135.9" r="3.9"/><circle cx="52.5" cy="135.9" r="3.9"/><circle cx="90.2" cy="135.9" r="3.9"/><circle cx="106.2" cy="135.9" r="3.9"/></g><g fill="#fff"><circle cx="70.2" cy="135.7" r="3.9"/><circle cx="54.2" cy="135.7" r="3.9"/><circle cx="88.5" cy="135.7" r="3.9"/><circle cx="104.5" cy="135.7" r="3.9"/></g><circle cx="70.2" cy="135.7" r="2.2"/><circle cx="54.2" cy="135.7" r="2.2"/><circle cx="88.5" cy="135.7" r="2.2"/><circle cx="104.5" cy="135.7" r="2.2"/></symbol><symbol id="bottom_17"><path d="M45 137h75s6 0 7-2.2 1 3.3-7 4.5-67 0-75 0-9-2.3 0-2.3z" fill="#444"/><path d="M34 138.3h75s6 0 7-2.2 1 3.3-7 4.5-67 0-75 0l-2.2-.1-1.5-2 3.7-.2z" fill="#919191"/><path d="M79.9 117.8l-10.6 17.6S68.2 138 79 138h22.7s5.4-5.2 2.2-7.8-11.9-3.4-11.9-3.4l8.6-13.8s-7.6 5.2-20.7 4.8z" fill="#49230f"/><path d="M63.6 115.2L52 135.4s-1 2.6 9.8 2.6h22.7s5.4-5.2 2.2-7.8-11.9-3.4-11.9-3.4l7.6-8.6c-.1 0-7.7.8-18.8-3z" fill="#a34b1a"/><path d="M74.4 119.7l8.1 1.9c.3.1.4.3.4.6l-.1.5c-.1.3-.3.4-.6.4l-8.1-1.9c-.3-.1-.4-.3-.4-.6l.1-.5c.1-.3.4-.4.6-.4zM72.9 122.8l8.1 1.9c.3.1.4.3.4.6l-.1.5c-.1.3-.3.4-.6.4l-8.1-1.9c-.3-.1-.4-.3-.4-.6l.1-.5c0-.3.3-.4.6-.4zM91.4 118.7l8.1 1.9c.3.1.4.3.4.6l-.1.5c-.1.3-.3.4-.6.4l-8.1-1.9c-.3-.1-.4-.3-.4-.6l.1-.5c.1-.3.3-.4.6-.4zM89.9 121.8l8.1 1.9c.3.1.4.3.4.6l-.1.5c-.1.3-.3.4-.6.4l-8.1-1.9c-.3-.1-.4-.3-.4-.6l.1-.5c0-.3.3-.4.6-.4z"/></symbol><symbol id="bottom_18"><path d="M64.5 122.5s2.7 5.5 5.5 7.5c1.2.8 2.3 1.8 3.4 2.7v4.4c0 .4-10.2-3-8.9-14.6z" fill="#6d4716"/><path d="M63.8 122.5s5.5-1.4 8.9 2 3.4 8.2 1.4 8.2-2.1.7-10.3-10.2z" fill="#fff"/><path d="M37.9 106.8s4.8-8.2 19.1-.7c14.3 7.5 2.7 23.2 15.7 30.7 0 0-3.7 3.65-8.36-5.93-4.59-9.42-4.54-24.67-26.44-24.07z" fill="#99671d"/><path d="M72.7 136.8s-6.1 2.7-10.2-10.9-8.9-21.8-20.5-21.1c-1.6 0-3.2.6-4.4 1.7-5.5 5-1.3 19.6 4.4 24.2 6.8 5.4 21.8 10.9 28 8.9s2.7-2.8 2.7-2.8z" fill="#444"/><path d="M73.7 117.2l-1 7.4c-1.9-1.4-3.6-2.3-5-2.3l.7-6.2c1.7.5 3.4.8 5.3 1.1z" fill="currentColor"/><path d="M39.3 109.6h11.6c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H39.3c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5zM38.2 112.7H53c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H38.2c-.3 0-.5-.2-.5-.5v-.1c0-.2.3-.5.5-.5zM38.2 115.9h17.9c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H38.2c-.3 0-.5-.2-.5-.5v-.1c0-.3.3-.5.5-.5zM39.3 119h17.9c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H39.3c-.3 0-.5-.2-.5-.5v-.1c0-.2.2-.5.5-.5zM40.3 122.2h17.9c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H40.3c-.3 0-.5-.2-.5-.5v-.1c0-.3.3-.5.5-.5zM42.4 125.3h17.9c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H42.4c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5zM44.5 128.5h15.8c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H44.5c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5zM48.7 131.6h13.7c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H48.7c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5zM54 134.8h9.5c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5H54c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5z"/><circle cx="102.8" cy="123.9" r="15.5" fill="#fff"/><path d="M118.3 123.9c0 8.5-6.9 15.5-15.5 15.5-5 .1-9.8-2.4-12.6-6.5 23.3 5.6 23.3-18.7 19.1-23 5.5 2.3 9.1 7.9 9 14z" opacity=".15"/><path d="M111.2 122l-1.9 6.6c-.1.4-.4.6-.8.6l-6.8.2c-.4 0-.7-.2-.8-.6l-2.3-6.4c-.1-.4 0-.8.3-1l5.4-4.2c.3-.2.7-.2 1 0l5.6 3.9c.2.2.4.5.3.9zM108.8 109.6l-4.2 3.2c-.3.2-.7.2-1 0l-5.5-3.8c3.5-1.1 7.3-.9 10.7.6zM99.2 134.1l1.8 5.1c-2.2.1-9-2.8-10-5.2 0-.2.3-.2.6-.2l6.9-.2c.3 0 .6.2.7.5zM90.9 113.9l1.9 5.4c.1.3 0 .7-.3.9l-5.3 4.1c-.1-3.8 1.2-7.5 3.7-10.4zM110.8 137.2l1.4-4.7c.1-.3.4-.6.8-.6l3.2-.1c-1.4 2.2-3.2 4-5.4 5.4zM118 120.7l-1.7-1.1c-.3-.2-.4-.6-.3-.9l.6-1.9c.7 1.2 1.2 2.5 1.4 3.9zM100.8 129.45a.25.25 0 00-.23.16l-1.4 3.4a.25.25 0 10.46.19l1.4-3.4a.25.25 0 00-.24-.35zM93.57 119.85a.25.25 0 00-.06.48l3.4 1.3a.25.25 0 10.18-.46l-3.4-1.3a.25.25 0 00-.12-.02zM115.3 118.65a.25.25 0 00-.11.03l-3.3 1.7a.25.25 0 10.23.44l3.3-1.7a.25.25 0 00-.12-.47z"/><path d="M103.9 112.85a.25.25 0 00-.25.26l.2 3.7a.25.25 0 10.5-.02l-.2-3.7a.25.25 0 00-.24-.24zM109.5 128.85a.25.25 0 00-.18.43l2.6 2.6a.25.25 0 10.36-.36l-2.6-2.6a.25.25 0 00-.18-.07z"/></symbol><symbol id="bottom_19"><path d="M39 110l9 23s48-1 47-2c-.6-.6-2.8-7.3-4.6-13-22.4 5-36.3-8-36.3-8H39z" opacity=".3"/><path d="M95 131l26 9-26 2.4-17 1.6-30-11" opacity=".5"/><path d="M95 130.9V142l26-2z" opacity=".5"/><g fill="none" stroke="#000" stroke-miterlimit="10"><path d="M63.5 131.9c-.8-2.8 31.9-12.5 32.7-8.3.4 2.4-34.4 5-34.8 2.6s7.1-5.2 16.7-6.2l2.1-.2"/><path d="M63.5 137.9c-.8-2.1 32.1-10.7 32.8-7.4.3 1.9-7.2 3.4-16.8 4.5s-17.6.4-17.9-1.4c-.1-.6.5-1.2 1.7-1.8"/></g><path d="M48 133v18.2c.8.5 3.1.6 5.2.8H78v-8l-30-11z" opacity=".7"/><path d="M121 140v7.2a26 26 0 01-15 4.8H78v-8l43-4z"/><path d="M121 140v7.2a26 26 0 01-15 4.8H78v-8l43-4z" opacity=".1" fill="#fff"/></symbol><symbol id="bottom_20"><path d="M46.4 101.1s-1.3 1.9-1.1 5.9c.7 9.7-2.1 19.5 3.5 26.4 5.6 7 16.7 11.8 22.9 8.4s5.6-15.3-1.4-20.2a21.8 21.8 0 01-4.4-4.7 40 40 0 01-19.5-15.8z" fill="#99671d"/><path d="M46.4 101.1s-1.3 1.9-1.1 5.9c.7 9.7-2.1 19.5 3.5 26.4 12.2 12.9 22.9 8.4 22.9 8.4-10.1 1.1-21.6-35.8-21.6-35.8a30 30 0 01-3.7-4.9z" fill="#6d4716"/><path d="M54.8 115.4c-4 0-7.3-3.3-7.3-7.3.1-1.3.5-2.7 1.1-3.8.1-.2 7.1 8.1 10.8 9.5 0-.1-1.3 1.2-4.6 1.6z" fill="#fff"/><path d="M58.8 113.3c-.8.3-1.7.5-2.6.6a6 6 0 01-5.9-6.3l.2-1.8a24 24 0 008.3 7.5z" opacity=".2"/><path d="M94 124.5s-2.8 5.5-5.5 7.5c-1.2.8-2.3 1.8-3.4 2.7v4.4c0 .4 10.2-3 8.9-14.6z" fill="#6d4716"/><path d="M94.6 124.5s-5.4-1.4-8.9 2c-3.4 3.4-3.4 8.2-1.4 8.2s2.2.7 10.3-10.2z" fill="#fff"/><path d="M120.5 108.8s-4.8-8.2-19.1-.7c-14.3 7.5-2.7 23.2-15.7 30.7 0 0 3.7 3.6 8.4-5.9 4.6-9.3 4.6-24.7 26.4-24.1z" fill="#99671d"/><path d="M85.8 138.8s6.1 2.7 10.2-10.9 8.9-21.8 20.4-21.1c1.6 0 3.2.6 4.4 1.7 5.6 5 1.3 19.6-4.4 24.2-6.8 5.4-21.8 10.9-27.9 8.9s-2.7-2.8-2.7-2.8z" fill="#444"/><path d="M84.8 119.2l1 7.4c1.9-1.4 3.6-2.3 5-2.3l-.6-6.2c-1.8.5-3.6.8-5.4 1.1z" fill="currentColor"/><path d="M119.2 112.6h-11.6c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5zM120.3 115.8h-14.7c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h14.7c.3 0 .5.2.5.5v.1c0 .3-.3.5-.5.5zM120.3 118.9h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .3-.3.5-.5.5zM119.2 122.1h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .2-.2.5-.5.5zM118.1 125.2h-17.9c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h17.9c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5zM116.1 128.4H98.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h17.9c.3 0 .5.2.5.5 0 .2-.3.5-.5.5zM114 131.5H98.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5H114c.3 0 .5.2.5.5v.1c0 .2-.3.4-.5.4zM109.8 134.7H96.1c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h13.7c.3 0 .5.2.5.5v.1c0 .2-.3.5-.5.5zM104.5 137.8H95c-.3 0-.5-.2-.5-.5v-.1c0-.3.2-.5.5-.5h9.5c.3 0 .5.2.5.5v.1c0 .3-.2.5-.5.5z"/></symbol><symbol id="bottom_21"><ellipse cx="36.9" cy="126.7" rx="15.4" ry="25.6" transform="rotate(-10.1)"/><path d="M59 118c.3 1.7-1.5 3.6-1.5 3.6s-2.4-1-2.8-3 1.6-3.6 1.6-3.6 2.4 1 2.7 3z" fill="#010101" opacity=".5"/><path d="M120.7 120.8c-2.6 13.5-11.2 23.1-19.2 21.6-7.6-1.4-12-12.2-10.4-24.6C94 116 107 113 115.6 96.3c4.8 4.5 7 14.1 5 24.5z"/><g fill="#010101" opacity=".4"><path d="M49.2 120.3c.8 4.2 4.7 16.4 10 18.5-5.2 1-11.1-7.1-13-18s.7-20.6 6-21.6c-4.6 2.3-3.8 16.9-3 21zM97 116.7c-.7 4-1.4 16.4 2.7 20.2-5-1-7.5-9.8-5.8-19.9l3.4-1.6-.3 1.3z"/></g><g fill="#fff" opacity=".2"><path d="M55.6 92.9a25.6 15.4 79.9 00-1.5.1 25.6 15.4 79.9 00-10.7 28 25.6 15.4 79.9 0019.7 22.5 25.6 15.4 79.9 0010.6-28 25.6 15.4 79.9 00-18-22.6zm-2.5 6.3c5 0 10.4 7.8 12.2 18.1 2 11-.7 20.6-6 21.5a4.9 4.9 0 01-.9 0c-5 0-10.4-7.7-12.2-18-2-11 .7-20.6 6-21.6a4.8 4.8 0 01.9 0zM115.6 96.3C107 113 94 116 91 117.8c-1.6 12.4 2.8 23.2 10.4 24.6 8 1.5 16.6-8.1 19.2-21.6 2-10.4-.3-20-5.1-24.5zm-4 7c1.7 4 2.1 9.8 1 16.2-2 10-7.2 17.4-12 17.4a4.3 4.3 0 01-1 0c-4.9-1-7.4-9.8-5.8-19.9.1-.3 11.2-4 17.8-13.6z"/></g></symbol><symbol id="side_01"><path d="M53.5 84.2a2.5 2.5 0 00-2.9-2.2l-16 2.4-2.3-8s0-2-1.7-.7l2.6 8.9-3.8.6-2.3-7.9s0-2-1.7-.7l2.6 8.9-2.2.3c.4 1.3.5 2.6.2 3.9l3.4-.3 2.4 8.4h.1c-.2.5.1 1 .5 1.1.4.2.8 0 1.1-.4h.1v-.2a1 1 0 00-.2-.9L31 89l3.6-.4 2.6 8.9h.1c-.2.4 0 1 .4 1.2l.5.2c.6 0 1-.5 1-1a1 1 0 00-.7-.9l-2.4-8.4L51.5 87c1.2-.1 2.2-1.4 2-2.8z" fill="#fff"/><path d="M51.3 87.1l-15.4 1.6-.5-1.6s18.8-2.3 18-2.9c.1 0 .6 2.1-2.1 2.9z" opacity=".2"/><path d="M8.8 87.5a8.5 8.5 0 019.5-7.3c4.7.5 8 4.7 7.5 9.3a8.5 8.5 0 01-9.5 7.3 8.4 8.4 0 01-7.5-9.3zM146.7 77.5c-.5 4-4.3 6.9-8.3 6.3a7.4 7.4 0 01-6-4.9c-.1-.4 4.6.1 4.6-1.9 0-1-1.7-1-3-.9l-2 .2.1-.8c.6-4 4.3-6.9 8.3-6.3s6.9 4.2 6.3 8.3z"/><g fill="#010101" opacity=".3"><path d="M25.8 89.4a8.5 8.5 0 01-9.5 7.3 9 9 0 01-5.7-3.1c2.2.8 7.7 1.6 11.1-1.8 2.5-2.4 2.6-6.8 2-9a8.6 8.6 0 012.1 6.6zM146.7 77.5c-.6 4-4.3 6.9-8.3 6.3a7.4 7.4 0 01-4.8-2.8c1.9.7 6.6 1.5 9.6-1.4 2.2-2.1 2.4-6 1.9-7.9a8 8 0 011.6 5.8z"/></g><path d="M137.1 76.5c-.2-.8-2.3-.5-2.3-.5l-6.4.5-1.5-5.7s0-1.4-1.2-.5l1.7 6.3-3.3.3-1.6-5.8s0-1.4-1.2-.5L123 77l-3.7.3.1 3.2 4.6-.6 2.1 8h.1c-.2.4 0 .9.3 1.1.4.2.8 0 1-.3h.1v-.2c.1-.3 0-.6-.2-.8l-2.1-8 3.1-.4 2.3 8.5h.1c-.2.4 0 .8.4 1 .4.2.8 0 1-.3h.1v-.2c.1-.3 0-.6-.2-.8l-2.3-8.5 5.5-.7c1.6 0 2-.8 1.8-1.8z" fill="#fff"/><g opacity=".2"><path d="M123.9 80l-4.6.5v-1.4l4-.4.2-.1zM128.3 79.4l-3.1.4-.3-1.4 3.1-.3zM134.4 78.7l-4.7.6-.4-1.4 7.5-.9c0 .1.8.9-2.4 1.7zM29.4 89.3l-3.4.3.1-1.5 2.6-.3.3.2zM30.3 87.9l3.5-.6.5 1.4-3.5.4z"/><circle cx="38" cy="98" r="1"/><circle cx="32.7" cy="98.2" r=".9"/></g></symbol><symbol id="side_02"><path d="M125.8 71.4s19.2 1.4 19.6 2.8c.1.4-18.2 9.7-17 9.1 0 0 2.4-5.8 2.1-7.1s-4.7-4.8-4.7-4.8z" fill="#5e5e5e"/><path d="M125.2 71.3s19.2 1.4 19.6 2.8c-5 1-14.6 2.4-14.6 2.4l-5-5.2z" fill="#e2e2e2"/><g fill="#603813"><path d="M130.6 79.2l-11.6 1v-4.7l10.8-.8s5 .4 5.2 1.2-2.7 3-4.4 3.3zM54.6 83.7l-36.5 2s-2.8.1-3-1.6c-.1-1.5.8-2.4 2.6-2.9L54 77.5a3.2 3.2 0 013.4 2.8 3 3 0 01-2.8 3.4z"/></g><path d="M54.6 83.7l-36.5 2c-1.8 0-2.8-.5-3-1.6 17-1.2 44.2-2.4 42.3-3.8 0 .1.5 2.7-2.8 3.4z" opacity=".2"/><path d="M38.8 80.4l-5.4-5.8-17.1.1 6.1 6.6zM39.4 83.2l-6.6 7.9-17.1 1.2 6.6-7.9z"/><g fill="#010101" opacity=".2"><path d="M23.8 76.7c.2-.2.5-.2.7 0l2.7 2.9c.2.2.2.5 0 .7-.2.2-.5.2-.7 0l-2.7-2.9a.5.5 0 010-.7zM20.8 76.7c.2-.2.5-.2.7 0l2.7 2.9c.2.2.2.5 0 .7-.2.2-.5.2-.7 0l-2.7-2.9a.5.5 0 010-.7zM26.8 76.7c.2-.2.5-.2.7 0l2.7 2.9c.2.2.2.5 0 .7-.2.2-.5.2-.7 0l-2.7-2.9a.5.5 0 010-.7zM29.8 76.7c.2-.2.5-.2.7 0l2.7 2.9c.2.2.2.5 0 .7-.2.2-.5.2-.7 0l-2.7-2.9a.5.5 0 010-.7zM32.8 76.7c.2-.2.5-.2.7 0l2.7 2.9c.2.2.2.5 0 .7-.2.2-.5.2-.7 0l-2.7-2.9a.5.5 0 010-.7zM26.2 85.7c.2.2.2.5 0 .7l-2.7 2.9c-.2.2-.5.2-.7 0a.5.5 0 010-.7l2.7-2.9c.2-.2.5-.2.7 0zM23.2 85.7c.2.2.2.5 0 .7l-2.7 2.9c-.2.2-.5.2-.7 0a.5.5 0 010-.7l2.7-2.9c.2-.2.5-.2.7 0zM29.2 85.7c.2.2.2.5 0 .7l-2.7 2.9c-.2.2-.5.2-.7 0a.5.5 0 010-.7l2.7-2.9c.2-.2.5-.2.7 0zM32.2 85.7c.2.2.2.5 0 .7l-2.7 2.9c-.2.2-.5.2-.7 0a.5.5 0 010-.7l2.7-2.9c.2-.2.5-.2.7 0zM35.2 85.7c.2.2.2.5 0 .7l-2.7 2.9c-.2.2-.5.2-.7 0a.5.5 0 010-.7l2.7-2.9c.2-.2.5-.2.7 0z"/></g></symbol><symbol id="side_03"><path d="M26.4 71l2.4 24-2.4 2v3.3s0 1.7 2.4 2.3c2.5.5 7.1 2 14.2 1.4 3.8-.3 7.5-1.3 11-2.9a3 3 0 001.8-2.5l-.9-3.6-2.4-2-2.4-23" fill="#fff"/><g fill="#fcbb00"><path d="M28.9 71.2l2.5 23.7-3.7 3s0 1.3 4.9 2c6.7 2.2 17.7-.1 20.9-1.9 2.5-.9.5-2 .5-2l-2.5-3L49 70.2l-20.1 1z"/><path d="M54.9 97.2c.1 1.7-5.9 4.4-13.4 4.8s-13.8-1.6-13.9-3.2 5.9-3.4 13.5-3.8 13.6.5 13.8 2.2z" opacity=".5"/></g><g fill="#ffd22d" fill-opacity=".5"><path d="M34.6 93c-.9.1-1.7-.5-1.9-1.4l-1.1-13c0-.9.8-1.6 1.7-1.6.9-.1 1.7.5 1.9 1.4l1 13c0 .9-.7 1.6-1.6 1.6zM40.5 93c-.9.1-1.7-.5-1.9-1.4l-1.1-13c0-.9.7-1.6 1.6-1.6.9-.1 1.7.5 1.9 1.4l1 13c.1.9-.6 1.6-1.5 1.6zM46.4 92c-.9.1-1.7-.5-1.9-1.4l-1.1-13c0-.9.7-1.6 1.6-1.6.9-.1 1.7.5 1.8 1.4l1.1 13c.1.9-.6 1.6-1.5 1.6z"/></g><path d="M29.7 72.9s-8.1 2.2-6.9-4.4c0 0-4.9-5.5 1.2-5.5 0 0 1.2-4.4 6.1 0 0 0 4.9-7.7 9.8 1.1 0 0 3.7-4.4 6.1 2.2 0 0 7.6 2.4 2 5.1S31.7 74 29.7 72.9z" fill="#fff"/><path d="M30.9 72.4S24 74.2 25.1 69c0 0-4.1-4.3 1-4.3 0 0 1-3.5 5.2 0 0 0 4.1-6.1 8.3.9 0 0 3.1-3.5 5.2 1.7 0 0 6.4 2 1.7 4s-14 2-15.6 1.1z" fill="#ffefae" fill-opacity=".5"/><g opacity=".1"><path d="M41.2 64.4S43 64 43 67s-3.1 3.9-3.1 3.9.8-.9 1.9.1-1.5 1.7-1.5 1.7 6.4-.3 8.7-2.5-3.6-3.2-3.6-3.2 0-3.1-4.2-2.6zM31.1 66c.7 1.9 2.7 3 4.7 2.6 0 0-3.5 2.4-4.7-2.6zM27.4 67.1c1.2.7 2.7.5 3.8-.4 0 0-.6 2.6-3.8.4zM37.9 68.5s2.4-.8 1.7-2.9c-.1.1 2.2 1.9-1.7 2.9z"/></g></symbol><symbol id="side_04"><path d="M117.1 68.1c1.9 1.6 2.9 12 1 20.9 0 0 4.7 3.2 6.9 3.7l3 .9c5.6 1.5 16 3.4 16.3-7.8l-1-5.8c-.5-2.9.8-5.2-2-10.5s-8.5-5.5-12.6-3.9c0 0-.6.6-2.3-1.2s-7.3-2.1-9.3 3.7zM26.3 68.7a8.6 8.6 0 00-1.3 7.6l.3 2s-10.1-1.8-9 6.2l.3 2.1c1 6.6 2 9.6 6.4 11.6 4.8 2.2 5-2.4 8.1-1.2s19.7 10.7 22.4-4.5l-.2-6.5c-.1-3.3 1.7-5.6-.5-11.9s-8.5-7.4-13.3-6.3c0 0-.8.5-2.3-1.7s-7.8-3.4-10.9 2.6z"/><g fill="#010101"><path d="M117.1 68.1c1.9 1.6 2.9 12 1 20.9 0 0 4.7 3.2 6.9 3.7l3 .9c-2.6-.1-3.5-5.1-3-5.3 0-7.6-1.4-12.5-1.3-17.8a5.2 5.2 0 015-4.9s-.6.6-2.3-1.2-7.3-2.1-9.3 3.7z" opacity=".16"/><g opacity=".3"><path d="M118.5 89.3s5.1 3 6.6 3.3c2.5.6 15.1 5.5 18.5-2.6.4-1.4.7-2.9.9-4.3-.6 2.1-4.6 4.3-8.9 4.9-5.8 1-10.4-2.7-13.9-1.6l-2.8-1.2-.4 1.5zM19 95.1c1.2 1.3 2.5 2.3 4 3.1 4.8 2.2 5-2.4 8.1-1.2 2.7 1 15.7 8.5 20.8.1a25 25 0 001.6-4.6c-1 2.2-5.8 4-10.5 4-6.6.1-11-4.6-15-4-6.6 3.5-9 2.6-9 2.6z"/></g><g opacity=".1"><path d="M125.1 92.7c-3-.3 18.9 7 19.4-6.9l-1-5.8c-.5-2.9.8-5.2-2-10.5s-8.5-5.5-12.6-3.9c13.1-.8 10.7 27.2-3.8 27.1zM31 97c-3.2-.8 19.7 10.7 22.4-4.5l-.1-6.5c-.1-3.3 1.7-5.6-.5-11.9s-8.5-7.4-13.3-6.3C54.1 69.1 47 99.6 31 97z"/></g></g></symbol><symbol id="side_05"><path d="M124.6 80.7s20 .3 18.6-12.5c0 0 9.6 11.1 1 20.9s-27.3 6.1-27.3 6.1l7.7-14.5z" fill="#fff"/><path d="M143.2 68.2c.3 13.7-20.2 12.1-20.2 12.1l-1.2 5.7-4.9 9.2s18.7 3.6 27.3-6.1-1-20.9-1-20.9z" fill="#fff"/><path d="M143.2 68.2c8.4 22.4-21.7 19.4-21.7 19.4l.3-1.7-4.9 9.2s18.7 3.6 27.3-6.1-1-20.8-1-20.8z" opacity=".1"/><path d="M118.5 75s7.1 1 7.3 11.2-11 11.8-11 11.8a39.6 39.6 0 003.7-23zM38.2 78.1l9.6-4s8.6.9 9.5 11.4-5.5 12.9-5.5 12.9l-10.3.2s-4.5-3.1-5.2-11.3 1.9-9.2 1.9-9.2z"/><g fill="#fff"><path d="M38.2 78.1l9.6-4c5 1.5 9 4.3 9.5 11.4-.8-1.6-2.3-2.3-4.5-2.2L48 84.4l-5.7 1.4-5.9 1.4c.4-5-.1-7.3 1.8-9.1z" opacity=".1"/><ellipse transform="rotate(-4.6 42 88.2)" cx="42" cy="88.2" rx="4.9" ry="9.1" opacity=".16"/><path d="M41.7 80.6s-15.6 2.1-20-2.9-.2-13.9-.2-13.9-11.1 6.4-10 19 25 13.8 30.3 12.4c0 0 3.6-1.8 3.3-7.5 0-5.8-3.4-7.1-3.4-7.1z"/><path d="M41.7 80.6s-15.6 2.1-20-2.9-.2-13.9-.2-13.9-11.1 6.4-10 19 25 13.8 30.3 12.4c0 0 3.6-1.8 3.3-7.5 0-5.8-3.4-7.1-3.4-7.1z" opacity=".3"/></g><path d="M45 87.7c-15.9 3.8-39.8-2.6-23.5-23.8 0 0-11.1 6.4-10 19s25 13.8 30.3 12.4c0 0 3.6-1.8 3.2-7.6z" opacity=".3"/></symbol><symbol id="side_06"><path d="M42 66.5L26 51c-.9-.2-4 9-4 19s4 15 6 17l7 7c3 3 6 4 10 6 3 1 4 2 4-2s-4-5-5-18l1-9-3-4.5zM114 61.1c3.6-4.7 19.7-11 19.7-11s2.2 12.2-4.8 28.8c-2.5 6-6 14.5-9 16.8-3 2.3-3.8.3-3.8.3-1.1 0 7.9-19-2.1-34.9z" fill="currentColor"/><g fill="#010101" opacity=".1"><path d="M26 52.2C41 69 43.6 78.7 43.6 78.7l1.4-8.6S29 52 26 52.2zM121.6 55.8l8.6-1.7c1 6-1.6 15.2-3.1 20-2.7 8.3-4.9 12.9-7.1 17.9-2.2 5-3.9 4-3.9 4 1 1.8 4.7.8 8.5-7.4 2.4-5.4 4.8-10.4 6.4-15.8 0 0 3.9-10.8 2.7-22.7-4.1 1.7-8.2 3.5-12.1 5.7zM25.993 84.453c22.06 18.633 21.303 13.687 21.426 9.079 2.007 2.462 2 7.15.687 7.201-1.805.147-9.904-3.78-11.796-5.653-3.784-3.747-7.22-6.746-10.317-10.627z"/></g><path d="M44 74c-1-2-15-12-15-12s-2 16 4 22c2.3 2.3 4.8 4.5 7.4 6.5L44 92s3-1 0-5c-2.1-2.9-.9-5.8.1-7.6l.8-1.5C45 77 45 76 44 74zM118.5 70.6c.5-1.7 9.2-8 9.2-8s-.8 10.8-3.3 16.1c-1 2.1-2.3 4.4-4 6.2-.5.6-2.3 1.5-2.3 1.5l.5-3.7a38.8 38.8 0 00-.1-8.9l-.3-2.2c0-.3 0-.5.3-1z"/><g fill="#010101"><g opacity=".2"><path d="M44 74c2 1-15-12-15-12-.7-.1-.8 17.9 4 22l7.4 6.5L44 92c-13-7.2-19.2-27.2 0-18zM118.51 70.653c.328-1.634 9.253-8.085 9.253-8.085-.548 4.473-1.04 11.87-3.504 16.515-2.19 4.215-3.012 4.903-3.778 5.763-.548.602-1.971 1.29-1.971 1.29 7.117-6.193 10.512-23.396 0-15.483z"/></g><g opacity=".4"><path d="M39 75c-2 0-4 3-2 6s6 3 6 3-1-.9.5-3.5S41 75 39 75zM121.248 71.513c1.094 0 2.19 2.581 1.094 5.162s-3.503 2.58-3.503 2.58l-.055-3.01c-.11-2.581 1.368-4.732 2.463-4.732z"/></g></g></symbol><symbol id="side_07"><path d="M137.1 64.3s7.2 6.3 6.3 15.2c0 0-1.8 9.2-2.4 10.5s-3.1 8.7-9.1 9.9l-4.1.5c-.8 1.3-1.8 2.4-3 3.3-2.4 2-6.6 2.5-7.8 1.9s-.6 1.3-1.9.7l-4.6-1.6c5-5.8 7.9-13.1 8.7-22.8l1.2-1.2 5.7-7.5c2.1-2.9 6.8-4.7 7.7-5.1 0 0-5.1 6.2-3.5 7.7s4.4.4 4.4.4 4.1-.3 2.4-11.9zM19.9 64.3s-7.2 6.3-6.3 15.2c0 0 1.8 9.2 2.4 10.5s3.1 8.7 9.1 9.9l4.1.5c.8 1.3 1.8 2.4 3 3.3 2.5 2 6.5 2.5 7.8 1.9s.6 1.3 1.9.7 7-1.6 8.1-4.4c.6-1.7.6-3.7-.1-5.4 0 0-4.1-.5-5.7 1 0 0-.8-3.5-4.3-2.7 0 0 3.2-8.4-3.2-14.1L31 73.2c-2.1-2.9-6.8-4.7-7.7-5.1 0 0 5.1 6.2 3.5 7.7s-4.5.4-4.5.4-4.1-.3-2.4-11.9z"/><g fill="#010101" opacity=".1"><path d="M137.1 64.3s7.2 6.3 6.3 15.2c0 0-1.8 9.2-2.4 10.5s-3.1 8.7-9.1 9.9l-4.1.5c-1.8.6-3.9-.1-6-1.2 3.5 1 20.7-14.8 12.9-22.8 0 0 4.1-.5 2.4-12.1zM29 77.9s2.6-1.4 4-1.1c0 0-2.9-5.6-5.9-6.4 0 0 3.3 4.7 1.9 7.5z"/></g><g opacity=".2"><g fill="#010101"><path d="M127.8 100.4c-.8 1.3-1.8 2.4-3 3.3-2.4 2-6.6 2.5-7.8 1.9s-.6 1.3-1.9.7l-4.6-1.6 1.7-2.4s1.9-.3 2-1c2.1 3.3 7.1-1.8 5.6-3.5 0 0 3.9 3.1 8 2.6zM29.2 100.4c.8 1.3 1.8 2.4 3 3.3 2.5 2 6.5 2.5 7.8 1.9s.6 1.3 1.9.7 7-1.6 8.1-4.4c.6-1.7.6-3.7-.1-5.4-1.4 6.4-6.9 6.7-7.2 4.8-2.1 3.3-7.1-1.8-5.6-3.5.1 0-3.8 3.1-7.9 2.6z"/></g><g fill="#fff"><path d="M129.7 77.3s-3.5-.8-5.4-.1c0 0 3.5-6.5 7.4-8.1 0 0-4 5.7-2 8.2zM19.9 64.3s-7.2 6.3-6.3 15.2c0 0 1.8 9.2 2.4 10.5s3.1 8.7 9.1 9.9l4.1.5c1.8.6 3.9-.1 6-1.2-3.5 1-20.7-14.8-13-22.8.1 0-4-.5-2.3-12.1z"/></g></g></symbol><symbol id="side_08"><path d="M34.5 116.9L32.9 104l2-.4 1.5 13s-.4 2-1.9.3z" fill="#303030"/><path d="M46.8 71.7c1.6 2.3 2 5.1 1.2 7.7l-.4 2 4.3.1c3 .9 3.2 8 .6 10.2-1.1.6-2.1 1.4-3 2.2a25 25 0 01-8.4 6.3l-3.3 1.4c-6 2.4-17.4 5.9-19.3-6.5l.3-6.6c.2-3.3-1.5-5.7.8-12s8.8-7.3 13.6-6c0 0 .8.5 2.4-1.7s8.3-3.3 11.2 2.9z" fill="#d8d8d8"/><path d="M39.1 101.1c-5.6 2.4-18.4 7.2-20.4-6.1l.4-6.7c.2-3.3-1.5-5.7.8-12s2.4-6.4 13.6-6c10.3.3 5.3 16.3 7.2 27.1 0 1.1-.7 3.3-1.6 3.7z" fill="#fff"/><path d="M41.2 100.2c3.2-.7-20.2 10.3-22.5-5.2l.3-6.6c.2-3.3-1.5-5.7.8-12s8.8-7.3 13.6-6c-14.8.9-8.4 31.9 7.8 29.8z" opacity=".05"/><path d="M52.6 91.9s-8.3 7.2-11.4 8.4c-2.7 1-16.2 8.1-21-.5-.6-1.5-1.2-3.1-1.5-4.7.9 2.2 5.7 4.2 10.6 4.3 6.6.3 11.2-4.3 15.3-3.6 2.5-1.6 5.2-2.9 8-3.9z" opacity=".16"/><path d="M33 54.7l8.6.3-5.3 6.6 2.1 8.1-7.8-3.2-7 4.8.5-8.4-6.6-5.2 8.2-2.2 3-8z"/><path d="M30.3 54.3l1.3 2c.2.3.6.5 1 .5l2.2.1c.6 0 1 .6 1 1.2l-.2.7-1.5 2c-.3.2-.3.5-.3 1l.6 2.3c.1.5-.1 1.1-.7 1.3h-.8l-2.1-1a.9.9 0 00-1 .2l-2 1.3c-.5.3-1.2.2-1.6-.2-.2-.2-.2-.5-.2-.8l.2-2.3c0-.4-.2-.7-.5-1L23.8 60c-.4-.3-.5-1-.3-1.6l.6-.4 2.3-.6c.3-.1.6-.3.8-.7l.8-2.2c.2-.6.9-.9 1.5-.7.4 0 .7.1.8.4z" opacity=".5" fill="#fff"/></symbol><symbol id="side_09"><path d="M52.5 103.1s.9.1 1.9-1.6.5-5.3-2.1-6.5-3.3-3.9-4.8-6.7-7.4-7.8-19-9.7-12.9-6.5-13.7-7.5-2.5 7.9 1.4 15.4S26.7 100 36 97.2s12.4 2 12.4 2 2.3 3.7 4.1 3.9zM119.5 82c3.2-1 6.5-1.6 9.9-1.8 12-1 13.8-5.4 14.7-6.3s1.9 8-2.6 15.1-11.9 12.5-21.2 9c-1.4-.5-2.8-.9-4.3-1.1a35.2 35.2 0 003.5-14.9z"/><g fill="#010101" opacity=".14"><path d="M52.5 103.1s.9.1 1.9-1.6.5-5.3-2.1-6.5-3.3-3.9-4.8-6.7-7.4-7.8-19-9.7-13.5-9.3-13.7-7.5c1.3 16.3 29.6 11.5 37.7 32zM119.2 82.4c3.6-1.2 7.3-1.9 11-2.2 12-1 14.7-8.1 14.7-6.3-1.8 10.5-14.9 11.1-26.4 16 1.2-4.3 1.2-5.2.7-7.5z"/></g></symbol><symbol id="side_10"><path d="M63.3 76.1s.8 14.1-17.6 21.1-27.8-5.5-27.8-5.5-.5-15 18.4-21 27 5.4 27 5.4z" fill="#dd8313"/><path d="M63.3 76.1s.8 14.1-17.6 21.1-27.8-5.5-27.8-5.5c20.9 2.1 34.4-3.8 45.4-15.6z" opacity=".5" fill="#754c24"/><path d="M46.8 77.6h-.2l-.4.1c-.2.1-.3.4-.3.6l1.3 3.7-5 1.8-1.9-5.1c-.1-.3-.3-.4-.6-.3l-.4.1c-.2.1-.4.4-.3.7l2 5.1-5.8 2.1-1.1-3.1c-.1-.3-.3-.4-.6-.3l-.4.1c-.3.1-.4.4-.3.6l1.2 3.2-4.6 1.7c-.3.1-.4.3-.3.6l.1.4c.1.2.4.3.6.3l4.6-1.7 1.4 3.7c.1.3.3.4.6.3l.4-.1c.3-.1.4-.3.3-.6l-1.4-3.8 5.7-2.1 2 5.2c.1.3.3.4.6.3l.3-.2c.3-.1.4-.3.3-.6l-2-5.2 5.1-1.9 1.2 3.3c.1.3.3.4.6.3l.4-.1c.3-.1.4-.3.3-.6L49 82.8l5-1.9c.3-.1.4-.3.3-.6l-.1-.4c-.1-.3-.3-.4-.6-.3l-5 1.9-1.4-3.6c0-.2-.2-.3-.4-.3z"/></symbol><symbol id="side_11"><path d="M14.2 80.3l6.1-.9c1.7-.2 3.3.9 3.5 2.6.2 1.7-.9 3.3-2.6 3.5l-6.1.9c-1.7.2-3.3-.9-3.5-2.6-.2-1.7.9-3.2 2.6-3.5z" fill="currentColor"/><g fill="#e0e0e0"><path d="M36.3 92.3L36 99c-.3-.3 2.7 2.3 5 0l-.4-7.8-4.3 1.1zM129.6 97.1l-.8 6.7c-.3-.3 2.5 2.5 5 .3l.1-6.1a6 6 0 01-4.3-.9zM34 42.2s.9-4.3 3.5-1.7 5.8 16.1 2.4 23.9c-.8 4.7-.6 5.7-.6 5.7-1.1.5-2.4.5-3.5 0L34 42.2zM129.5 50.8l-.8 15.4s-.2 4.6 4.4 4.9 5.5-2.8 5.6-4.3l.8-15.4s-1.2.3-1.4 4.2-1.2 7.6-2 7.6h-.6c-.5 0-.9-.2-.8-2.4.2-3.1.5-9.2-.3-9.3s-1.3 9.2-1.3 9.2-.1 2.3-1.7 2.2-1.1-8.5-1.1-8.5.4-4-.8-3.6zM130.9 77l-2.4 7.8 2 .2 2.2-7.3z"/></g><g fill="#fff"><path d="M37.5 40.4S44 50 39.9 64.3c.5 5.7-.3-22.2-2.4-23.9z" opacity=".1"/><g opacity=".3"><path d="M34.6 42c.3 0 .5.2.5.5l1.7 26.9c0 .3-.2.5-.5.5s-.5-.2-.5-.5l-1.7-26.9c0-.2.2-.4.5-.5zM139.5 51.3s-.9 3-1.4 10.7c0 0 0 8.4-2.6 8.7 0 0 2.8.4 3.3-8.8l.7-10.6zM134.4 60.2l.5-8.5s-.4 8.5-.1 10-.5 1.5-.5 1.5l.1-3z"/></g><path d="M27 68.2a7 7 0 00-1.7 5.9l.1 1.6s-7.9-2.3-7.6 4.2l.1 1.7c.2 5.3.8 7.8 4.1 9.7 3.6 2.1 4.2-1.4 6.5-.2s14.6 10.2 18.1-1.6l.5-5.2c.2-2.6 1.8-4.3.6-9.4s-6.1-6.6-10-6.1c0 0-.6.3-1.7-1.6s-6-3.5-9 1z"/></g><path d="M25 80.4l4.4-.4c.2 0 .5.2.5.4s-.2.5-.4.5l-4.4.4c-.2 0-.5-.2-.5-.4s.1-.4.4-.5zM25.2 82.2l4.4-.4c.2 0 .5.2.5.4s-.2.5-.4.5l-4.4.4c-.2 0-.5-.2-.5-.4 0-.3.2-.5.4-.5zM25.5 83.9l4.4-.4c.2 0 .5.2.5.4s-.2.5-.4.5l-4.4.4c-.2 0-.5-.2-.5-.4s.1-.4.4-.5z"/><path d="M124 73.5a6.8 6.8 0 00-1.6 5.8l.1 1.6-3.3-.3-1.4 7.7c.8.6 1.5 1.2 2.1 1.9.6 1 3.5 4.4 5.8 5.5l2.4 1.3c4.4 2.4 12.7 6 15.2-3.3l.4-5.1c.2-2.5 1.7-4.2.4-9.2s-6-6.3-9.8-5.8c0 0-.6.3-1.7-1.5s-5.8-3-8.6 1.4z" fill="#d8d8d8"/><path d="M127.2 96.5c4 2.3 13.4 7.1 16.1-2.8l.4-5.1c.2-2.5 1.7-4.2.4-9.2s-1.3-5-9.8-5.8c-7.8-.7-5.5 11.9-7.8 20-.3.8.1 2.5.7 2.9z" fill="#fff"/><g opacity=".05"><path d="M28.4 91c-2.5-.9 14.7 10.2 18.1-1.6l.5-5.2c.2-2.6 1.8-4.3.6-9.4s-6.1-6.6-10-6.1C49 70.9 40.8 94.4 28.4 91zM125.7 95.7c-2.4-.8 14.4 9.6 17.6-1.9l.4-5.1c.2-2.5 1.7-4.2.4-9.2s-6-6.3-9.8-5.8c11.1 2 3.5 25-8.6 22z"/></g><g opacity=".16"><path d="M19 88.4c.8 1.1 1.8 2 2.9 2.8 3.6 2.1 4.2-1.4 6.5-.2 2 1.1 11.7 8 16.4 1.9.7-1.1 1.2-2.3 1.7-3.5-1 1.6-4.9 2.7-8.7 2.3-5.2-.5-8.3-4.6-11.5-4.4-5.4 2.1-7.3 1.1-7.3 1.1zM117.8 88.3s5.7 6.2 7.9 7.4c2 1 11.6 7.6 16 1.5a26 26 0 001.6-3.4c-.9 1.6-4.7 2.7-8.4 2.4-5.1-.3-8.1-4.3-11.3-4.1a26.3 26.3 0 00-5.8-3.8z"/></g></symbol><symbol id="side_12"><path d="M42 66.5c-2.1-4-6.6-6.2-11-5.5-8 1-10 4-12 9s7 17 7 17l6 6c1 1 0 7 4 9s13 0 13-4-4-5-5-18l1-9-3-4.5zM114 61.1s14.3-7.4 19.7-1c5.4 6.4-5.5 18.1-5.5 24.5 0 6.4.5 9.3-5.3 12.1-7.1 3.5-6.8-.7-6.8-.7-1.1 0 6.6-19-2.1-34.9z" fill="currentColor"/><path d="M44 74c-1-2-6-7-12-4s-3 10 1 14c2.3 2.3 4.8 4.5 7.4 6.5L44 92s3-1 0-5c-2.1-2.9-.9-5.8.1-7.6l.8-1.5C45 77 45 76 44 74zM118 69.7c.5-2 3.6-6.7 7.3-3.8 3.7 2.8 1.9 9.6-.6 13.4-1.4 2.2-3.2 5-4.6 6.2-.7.6-2.5 1.3-2.5 1.3s.3-1.5.5-4.6a48.6 48.6 0 00-.4-9.7c-.1-1.3-.3-1.6.2-2.8z"/><path d="M42 66.5c-2.1-4-6.6-6.2-11-5.5 13 4 14 32 13 19l1-9-3-4.5z" opacity=".1"/><g fill="#010101"><g opacity=".1"><path d="M31 61c-8 1-10 4-12 9s7 17 7 17l6 6c1 1 0 7 4 9 1.8 1 6.6 1.1 10.2-.6 3.7-1.8 3-3.9 2.1-6.3 1 4.7-12.5 8.3-13.6.6C33.8 89.7 22 80.2 22 73c0-8 4.9-8.9 9-12zM118.6 59.2s9.9-1.4 11.6 4.4c2 6.7-3.8 11.7-4.8 16.7S125 87 124 92c-.4 2.8-2.4 5-5.1 5.9 0 0 9.7-1.1 9.3-9.6-.4-7.7 1.9-10.2 3.7-13.9 1.8-3.6 5-8.9 2.1-13.8-2.6-4.7-12-2.7-15.4-1.4z"/></g><g opacity=".2"><path d="M44 74c-1.5-2.4-6.1-6.8-12-4-6 3-3 10 1 14 2.3 2.3 4.8 4.5 7.4 6.5L44 92c-13-7.2-19.2-27.2 0-18zM117.9 69.685c.124-.48 3.388-7.098 7.391-3.837 3.634 2.878 1.848 9.593-.616 13.43-1.416 2.206-3.264 5.084-4.557 6.235-.74.672-2.526 1.247-2.526 1.247 8.192-6.715 12.134-25.9.308-17.075z"/></g><g opacity=".5"><path d="M39 75c-2 0-4 3-2 6s6 3 6 3-1-.9.5-3.5S41 75 39 75zM120.98 70.645c1.232 0 2.463 2.877 1.232 5.755s-4.004 2.878-4.004 2.878 0-1.919-.123-3.55c-.37-2.685 1.663-5.083 2.895-5.083z"/></g></g></symbol><symbol id="side_13"><path d="M46.7 67.2s-8.4.6-9.9 7.7c0 0-8.5.1-12.1 6.4L16 84.9l.2 3 17.4 18.8 1.4 4.9s4.2 4.9 9.3 5.6l6.7-6.7s-.4-5-2.4-5.8-7.3-3.5-8.3-3.4-6-12.6-6-12.6 12 6.7 16.6-6.2c0-.1 8.8-14.8-4.2-15.3zM117.1 67l.5.2c3.3.9 5.8 3.5 6.7 6.8 0 0 8.5-.1 12.2 6l8.9 3.4-.1 3-16.9 19.3-1.2 5s-1.1 3-6.2 3.7l-9.8-4.4s.2-5 2.3-5.9 7.2-3.7 8.2-3.6 5.6-12.8 5.6-12.8-4.4 2.6-9 1.7C120 78 118 74 117.1 67z" fill="currentColor"/><g stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M37.7 96c.8 2 1.5 3.2 2.3 4.6-4.8 1-6.2 3-7 5.9l-4-4.3c1.3-4.4 4-5.8 8.7-6.2zM133.1 101c-1.6 1.5-2.5 2.6-3.6 3.8-2.5-4.2-4.8-4.7-7.9-4.4l2.7-5.4c4.5-.3 6.7 1.7 8.8 6z"/></g><g fill="#010101"><path d="M46.7 67.2c6.3 3 5.1 14.5-2.1 13-.4 2.9-1.5 7.1-9.8 6-3.1.8-5.7 1.2-5.7 1.2l9.1 14.8c5.9 1.6 10.5 4.3 12.8 8.3 0 0-.4-5-2.4-5.8-2-.8-7.5-3.5-8.5-3.5-1-.4-5.9-12.6-5.9-12.6s12 6.8 16.7-6.1c-.1-.2 8.8-14.7-4.2-15.3z" opacity=".1"/><path d="M117.4 69.4s4.8 2.8 5.8 6.8c0 0 7 1 9 6l3 1-11 19-8 5a11 11 0 00-3 3.8l-2-1s.1-5.8 3.2-6.2c2.6-1.3 6.5-3.4 7.6-3.4 2.2-4 3.7-8.4 5.3-12.7a13.7 13.7 0 01-9 1.7c1.2-7.1.8-13.1-.9-20z" opacity=".15"/></g></symbol><symbol id="side_14"><path d="M30 71s6-5 10 2-1 12.1-1 12.1 11.1 15.3 19.2 16.2c0 0 3.3-4.9 10.2-1.5 7 3.4 3.8 9.5 3.8 9.5s-2 4-9 4-24.1-13-30.1-25C27 76.1 29 73 30 71z"/><path d="M30 71s6-5 10 2-1 12.1-1 12.1 11.1 15.3 19.2 16.2c0 0 3.3-4.9 10.2-1.5 7 3.4 3.8 9.5 3.8 9.5-4.3-7.5-7.8-6.7-15.2-6.2-12-3.2-21.6-14.4-20-16.8 0 0 5.3-14.6-7-15.3z" opacity=".2" fill="#010101"/><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M26.7 55.6a22 22 0 00-9.7 13"/><path d="M30 59.2a17.9 17.9 0 00-7.9 10.7" opacity=".6"/></g></symbol><symbol id="side_15"><g fill="currentColor"><path d="M139.5 61.5l-7.4 13.3-12.8 7.7s-.6 4.6-1 5.9c-1.1 4 20.1 2.3 22.3-1.7l-2.8-4.7 11.2-9.6c1.4-2.5.9-3.7-1.9-3.4l-10.9 8.1 6.8-13.4c.6-2.8-2-3.3-3.5-2.2z"/><path d="M119.4 82.4l6.3-9.8c.8-.9 1.8-1 3.1-.4a142.2 142.2 0 008.2 6.5s-.6 2.8-4.4 2L129 80s.6 3.1-3.4 3.7-6.2-1.3-6.2-1.3zM25.8 63.7L34 77.3l14.6 7.6s.6 4.8 1 6.1c1.2 4.1-21.6 3-24-1l1.6-5.1-12.7-9.6c-1.6-2.5-.9-3.8 2.3-3.5l12.4 8.1-7.5-13.7c-.6-3 2.3-3.6 4.1-2.5z"/><path d="M48.4 84.8l-7.1-9.9c-.9-.9-2.1-1-3.6-.3 0 0-3.9 2.6-2.1 1.5S28 81.6 28 81.6s.6 2.9 5 2l4.4-.9s-.8 3.2 3.8 3.8 7.2-1.7 7.2-1.7z"/></g><g fill="#010101"><g opacity=".1"><path d="M119.4 82.4l6.3-9.8c.8-.9 1.8-1 3.1-.4a142.2 142.2 0 008.2 6.5s-.6 2.8-4.4 2L129 80s.6 3.1-3.4 3.7-6.2-1.3-6.2-1.3zM48.4 84.8l-7.1-9.9c-.9-.9-2.1-1-3.6-.3 0 0-3.9 2.6-2.1 1.5S28 81.6 28 81.6s.6 2.9 5 2l4.4-.9s-.8 3.2 3.8 3.8 7.2-1.7 7.2-1.7z"/><path d="M22 64.1c1.3 0 2.5.8 3 1.9l6.9 12.9 2.1-1.6L26 64a2.8 2.8 0 00-4 .1c0-.1 0 0 0 0zM149 69.1c.2 1.3-1.2 2-2.2 2.7L136 80l1.9 1.8 11.1-9.4c.6-1 1.3-2.4 0-3.3zM141.3 61s.5.8-.7 2.7l-7.2 11.7 2.5 1.9 7-13.3c0 .2 1-2.7-1.6-3zM13.718 72.868c.991-.42 2.006.258 3.024 1.137 1.73 1.364 10.764 7.677 10.764 7.677l2.272-1.348-12.982-8.53c-1.304-.173-2.799.058-3.078 1.064zM139.5 84.9S125 91 118 88l.4 1.1s3.3 2.5 12.5 1.2c0 0 8.1-1.3 9.1-3.3l-.5-2.1zM-304.659 72.898s15.591 7.869 22.746 5.258c0 0 .25.915-.26 1.087-3.372 1.217-6.174 1.163-14.001-.37 0 0-7.822-1.632-9.377-4.321z"/></g><path d="M48.4 84.8l-7.1-9.9c-.9-.9-2.1-1-3.6-.3 0 0-3.9 2.6-2.1 1.5S28 81.6 28 81.6c2.3-1.3 13.5-7.2 20.4 3.2z" opacity=".1"/></g></symbol><symbol id="side_16"><path d="M42.8 68.7c1.6 2.3 2 5.1 1.2 7.7l-.4 2 4.3.1c3 .9 3.2 8 .6 10.2-1.1.6-2.1 1.4-3 2.2a25 25 0 01-8.4 6.3l-3.3 1.4c-6 2.4-17.4 5.9-19.3-6.5l.3-6.6c.2-3.3-1.5-5.7.8-12s8.8-7.3 13.6-6c0 0 .8.5 2.4-1.7s8.3-3.3 11.2 2.9z" fill="#d8d8d8"/><path d="M48.6 88.9s-8.3 7.2-11.4 8.4c-2.7 1-16.2 8.1-21-.5-.6-1.5-1.2-3.1-1.5-4.7.9 2.2 5.7 4.2 10.6 4.3 6.6.3 11.2-4.3 15.3-3.6 2.5-1.6 5.2-2.9 8-3.9z" fill="#010101" opacity=".16"/><g fill="none" stroke="#000" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round"><path d="M41 22l-16 9M49 57L27 70M46 27L19 42M48 34L16 52M41 71L28.5 27M45 65L32 20M35 72L24 34M49 58L37 17M28 68l-8-28M50 41L18 59M53 47L21 65"/></g><path d="M52.5 35.5c-1.7-9.2-9.7-17.8-17.9-19.4C33 15.8 20 41 12.3 53.5a50 50 0 009.2 15c9 14 11 15 12 28l1 12s-1 0-1 2 2 3 4 3 4-1 4-3a2 2 0 00-2-2l-1-12s-.6-20.2 8-31c8.5-10.6 8-19 6-30zm-18 48l-5-11s3 4 9 0l-4 11zm-.1-15c-8.9.7-17.1-8.5-18.9-20.9C22 36 30 23 31.7 19.5c8.9.3 16.6 10.3 17.7 23.1 1.2 13.5-5.6 25.1-15 25.9z"/><g fill="#010101" opacity=".1"><path d="M34 16.4c3.2.2 5.8 2.5 8 4.6 6 6 8 10 9 21s-3.5 20.5-7.5 24.5-14 6-14 6a8 8 0 005 1c1.4-.3 2.8-.8 4.1-1.4l2.9 2.4c1.6-3.5 3.5-6.9 5.8-10a29 29 0 006.4-19.4c-.3-9-3-24.6-19.2-29zM37 103.5l.5 7s.7 2.2-1.1 2.6 6.1.4 5.1-2.6a2 2 0 00-2-2l-.4-4.8-2.1-.2z"/></g><path d="M35.1 98.1c-5.6 2.4-18.4 7.2-20.4-6.1l.4-6.7c.2-3.3-1.5-5.7.8-12s2.4-6.4 13.6-6c10.3.3 5.3 16.3 7.2 27.1 0 1.1-.7 3.3-1.6 3.7z" fill="#fff"/><path d="M37.2 97.2c3.2-.7-20.2 10.3-22.5-5.2l.3-6.6c.2-3.3-1.5-5.7.8-12s8.8-7.3 13.6-6c-14.8.9-8.4 31.9 7.8 29.8z" opacity=".05"/></symbol><symbol id="side_17"><g fill="#42210b"><path d="M54.7 74.4s-11.6-.4-13.3-2.7-5.8 6.4-5.8 6.4-4.7 4.7-8.5 4.4a60.8 60.8 0 01-11.3-5.8l9.8 10.7 9.3.6 2.5-2.4-1.7 8.5 1.7 9.1.6-9 5.5-12.7 4.7.3 2.1 3.2 2.3.2c.2.1 5.1-3.5 2.1-10.8zM119.1 76.2s6.8 4.7 10.5 4.4c2.4-.2 11.4-5.8 11.4-5.8l-9.8 10.7-9.3.6-2.5-2.4 1.7 8.5-1.7 9.1-.6-9-1-2.4a45.3 45.3 0 001.3-13.7z"/></g><g fill="#010101" opacity=".7"><path d="M141.2 74.8l-9.8 10.7-9.3.6-2.5-2.4 1.7 8.5-1.7 9.1-.6-9-1.1-2.4 1.4-8.4 6.3 1.9c5.6.5 10.6-3.9 15.6-8.6zM15.6 76.8l9.8 10.7 9.3.6 2.5-2.4-1.7 8.5 1.7 9.1.6-9 5.5-12.7 4.7.3 2.1 3.2 2.3.2a8.4 8.4 0 002.9-5.8c0-.5-13.1-1.5-13.1-1.5l-11 7.5c-5.6.4-10.6-4-15.6-8.7z"/></g><path d="M26.8 61.1s-2.6 17.7 10.6 16.2c0 0 10.3-9.4-10.6-16.2zM33 112.7s12.5-6.6 5.4-14.4c-.1.1-10.9-2.1-5.4 14.4z"/><path d="M26.3 96s11.1 4.6 12.3-4.3c.1.1-4.4-8.2-12.3 4.3zM11.1 76.8s7.6 11 14.1 3.4c0 0 .8-10.4-14.1-3.4zM129.2 63.1s2 13.5-8.1 12.4c0 0-7.9-7.2 8.1-12.4zM130.5 94s-11.1 4.6-12.3-4.3c0 .1 4.4-8.2 12.3 4.3zM146.9 74.6s-8.2 11.8-15.2 3.7c0 0-.9-11.2 15.2-3.7z"/><g fill="#010101" opacity=".2"><path d="M26.8 61.1s-2.6 17.7 10.6 16.2L26.8 61.1zM33 112.7s12.5-6.6 5.4-14.4L33 112.7zM26.3 96s11.1 4.6 12.3-4.3L26.3 96zM11.1 76.8s7.6 11 14.1 3.4l-14.1-3.4zM129.2 63.1s2 13.5-8.1 12.4l8.1-12.4zM130.5 94s-11.1 4.6-12.3-4.3l12.3 4.3zM146.9 74.6s-8.2 11.8-15.2 3.7l15.2-3.7z"/></g></symbol><symbol id="side_18"><path class="st0" d="M116.4 96.2c-2.7 7.8 12.8-.3 12.5-1.2-.9-.9-4.2-1.2-4.2-1.2a35 35 0 006.5-.6c3.6-.6 5.6-3.3 5.3-4.2s-5.3-1.2-5.3-1.2c2.4 0 4.8-.4 7.1-1.2 3-1.2 4.8-3.6 3.6-4.2a8 8 0 00-3-.6c3.3-.3 7.1-3 7.7-4.8s-2.4-.6-2.4-.6c-7.1 1.2-16.9-3.9-16.9-3.9s-.6-3-2.4-3.6-2.4-.6-4.2 2.4c-.4.6-1 1.2-1.6 1.7l-.5.4c.9 7.9.1 15.6-2.2 22.8zm-72.6 1.1c-7.9 3.9-13-.4-12.7-1.4.9-1.1 4.2-1.4 4.2-1.4a36 36 0 01-6.6-.7c-3.6-.7-5.7-3.9-5.4-5s5.4-1.4 5.4-1.4c-2.5 0-4.9-.5-7.2-1.4-3-1.4-4.8-4.3-3.6-5 .9-.5 2-.7 3-.7-3.3-.4-7.2-3.6-7.8-5.7s2.4-.7 2.4-.7c7.2 1.4 17.2-4.6 17.2-4.6s.6-3.6 2.4-4.3 2.4-.7 4.2 2.8S52 77.1 52 77.1l5.5 1.4s6-1 3 2-4 2-6 4-2.3 8.7-10.7 12.8z" fill="#fff"/><path d="M53 82s-12-4-16-7-18 1-18 1 6 4 11 4l-8 2s7 6 13 5l-7 3c3.5 2.5 7.9 3.2 12 2l-3 4s7 3 13-7 7-7 3-7zm66.2-2.8c1.5-.6 2.9-1.4 4.2-2.3 3.6-2.7 16 .9 16 .9s-5.3 3.6-9.8 3.6l7.1 1.8s-6.2 5.3-11.6 4.4l6.2 2.7c-3.1 2.2-7 2.8-10.7 1.8l2.7 3.6c-2.1.7-4.5.4-6.4-.8 2.1-5.9 2.1-8.9 2.3-15.7z" opacity=".05"/></symbol><symbol id="side_19"><ellipse cx="47.5" cy="81" rx="9.5" ry="15"/><path d="M57 81c0 8.3-4.2 15-9.5 15S38 89.3 38 81s4 0 19 0z" fill="#010101" opacity=".1"/><ellipse cx="44.5" cy="81" rx="9.5" ry="15"/><ellipse cx="44.5" cy="81" rx="9.5" ry="15" fill="#010101" opacity=".6"/><path d="M49 80.5c0 4.7-2.4 8.5-5.4 8.5l-4.5.1c-.5-2.8-.8-5.7-.9-8.6 0-2.6 1.9-8.5 1.9-8.5h3.5c3 0 5.4 3.8 5.4 8.5z"/><ellipse cx="39.9" cy="80.5" rx="5.4" ry="8.5"/><path d="M44 89l15 17 17 5 1-2-16-5-15-17s-3-1-2 2z"/><g fill="#010101"><ellipse cx="39.9" cy="80.5" rx="5.4" ry="8.5" opacity=".4"/><path d="M44 89l15 17 17 5 1-2-17-4-15.8-18c-.4.3-.6.9-.2 2z" opacity=".1"/></g><path d="M74.4 106.4l12.5 3.4c1.3.4 2.1 1.7 1.8 3.1a2.6 2.6 0 01-3.1 1.8l-12.5-3.4a2.6 2.6 0 01-1.8-3.1 2.5 2.5 0 013.1-1.8z" fill="#231100"/></symbol><symbol id="side_20"><g fill="currentColor"><path d="M40.5 74a6.8 6.8 0 01-5.5-3c-3-5-16-11-21-11s3 8.5 3 8.5 0 1.2 2 2.4c2 1.3 4 1.3 2 1.3s-3 0-2 2.4 4 2.4 4 8.5-10 13.4-8 14.6c2 1.2 7-1.2 11-4.9 4-3.6 8-13.3 14-12.1 5-.7 3.3-6.5.5-6.8zM53.4 81.6s19.2 4.6 15.5 6.2-20.6 6.5-29 1.5-1.3 2.7 13.5-7.7zM119.4 80.4a35 35 0 01-2.3 10.4s16.6-3.8 20.8-8.4c7.1-7.9 2.6 2-18.5-2z"/></g><g fill="#010101" opacity=".1"><path d="M28 84.1C25 91 13 96.5 15 97.7c2 1.2 7-1.2 11-4.9 4-3.6 8-13.3 14-12.1 3.3-.5 3.7-3.2 2.7-5a2 2 0 00-1.9-1.1C43 79 30 78 28 84.1zM65.6 85.1s4.7 2 3.3 2.7c-3.6 1.5-20.6 6.5-29 1.5l-3.2-1.6c7.4 4.1 33.1-1.5 28.9-2.6z"/></g><path d="M22 66s5 0 10 5 2 6 2 6-7 2-8 7 3-14-4-18zM53.6 81.5l12 3.4c-7.5 2.2-16 3-25.4 2.9 0 0 7.9-2.4 13.4-6.3zM119 80.4l-.7 6s12.1-3.1 18.5-5.4c0 0-9.8 1-17.7-.6z"/></symbol><symbol id="side_21"><path d="M130.8 63c-2.3-2-15.7-.5-15.7-.5l.9 1.9 2.3 4.9c2.5-1.1 5.2-2 7.8-2.4 0 .1 1.9 19.1-.1 21.1s-8.4 3.3-8.4 3.3L117 93l-1 2.6S133 97 133 85c.7-16.3.6-19.6-2.3-22zM24.6 67.9s-4.7.3-6.5 1.3c-.5.2-.4 1 .2 1.5 3.7 2.8 6.5 6.6 8 11 3.4 8.5 3.4 16.7 13.8 20.4 10.4 3.7 14.8 0 14.8 0S62 93 54 84.2c0 0-1.6-1.6-4.7-.6-3.6 1.2-7.5 1.9-11.6-5.7-4.2-7.5-6.2-10.9-13.1-10z" fill="currentColor"/><g fill="#fff"><ellipse cx="24.7" cy="69.6" rx="6.5" ry="1.7" transform="rotate(-3.5 24.7 69.7)" opacity=".3"/><path d="M45.4 85c5.2 1 9 .1 10.5 1.8-.5-.9-.9-1.4-1.9-2.6-.1-.1-2-1.6-4.6-.6-10.9 4-11.6-9.5-17.6-14.1 6.1 7.1 5.7 14 13.6 15.5z" opacity=".3"/><path d="M115.1 62.5s14.6-1.7 16.1 1c-2.3-.8-6-.4-8.8 0l-6.4.8z" opacity=".4"/></g><g fill="#010101"><path d="M19.8 72c4.7 4 5.9 7.9 6.6 9.7 3.3 8.5 3.3 16.7 13.7 20.4 10.4 3.7 14.8 0 14.8 0s5.3-6 1.7-14c0 0 3.9 11-7.9 11-5.4-.1-10.5-.9-14.5-6-5.3-6.8-7.8-19-14.4-21.1z" opacity=".16"/><ellipse cx="24.9" cy="69.6" rx="4.8" ry=".9" transform="rotate(-3.5 24.9 69.7)" opacity=".35"/><path d="M29.8 69.3c.5.9-4.8 1.2-4.8 1.2.4-1.1.3-1.7-.1-1.7 0 0 4.4-.3 4.9.5z" opacity=".35"/><path d="M126.1 66.9S128 86 126 88s-8.4 3.3-8.4 3.3L117 93s8.8-1.2 11-4.1 1-17.9 1-17.9.3-5.3-2.9-4.1z" opacity=".5"/></g></symbol><symbol id="top_01"><path d="M95.4 49.9S92 60 81 53c.3 3.8-1.6 5.5-6 5 0 0-3 9-7 3-.9 1.3.6 7.2-7 4-1.6 5.6-5.6 6.7-11 5 0 0-15 1-10-9 0 0-15-9 2-12 0 0-5-22 15-17 0-5 12.9-22.3 32-5 0 0 15-13 22 6 0 0 15 2 8 16 1.9-.8 12.2 3.7 5 12 1.9 5.3-.2 7.3-5 7 0 0 3 2-.4 4.5 0 0-6.6-2.5-6.6-9.5-4-1.1-5.6-3.8-3.8-8.9 0 0-10.3 6.8-12.8-4.2z" fill="#42210b"/><path d="M68.5 39.5S52 34 54 51c-12 2-3 13-3 13s-14.5-12.5-1.4-13.4c0 0-4.4-18.4 13.1-14 0-4.4 7.8-20.4 24.5-5.2C74 29 71 30 68.5 39.5z" opacity=".05" fill="#fff"/><path d="M89 27s15-13 22 6c0 0 15 2 8 16 1.9-.8 12.2 3.7 5 12 1.9 5.3-.2 7.3-5 7 0 0 3 2-.4 4.5 0 0-6.6-2.5-6.6-9.5-4-1.1-5.6-3.8-3.8-8.9-5.2 4.9-13.8.6-12.7-4.4 0 0 7.8.7 7.7-6.5C105 35 95.5 26.2 89 27z" opacity=".5"/></symbol><symbol id="top_02"><path d="M75.9 27.8c.1 2.2-2.7 5.4-2.7 5.4s-1.5-2.8-3.6-3.8-4 1-3 1.5l2 4.7-2.6.1a9 9 0 01-7.9-10 9 9 0 0110-7.9 9 9 0 017.8 10z"/><path d="M75.9 27.8c.1 2.2-2.7 5.4-2.7 5.4l-1.6-2.7c1 0 3.6-7.3 2.1-9.7a9 9 0 012.2 7z" fill="#010101" opacity=".25"/><path d="M66 31s3.7 5.7 4.8 10.3c.6 2.2 1 4.4 1.2 6.7 1 4 8 2 8-1 0 0-6.1-13.9-9-17-2.6-3.9-6.2-1.2-5 1z" fill="#93505c"/></symbol><symbol id="top_03"><path d="M80.5 42.9S77 25.1 73.3 20.3c-.2-.2-1.7-.5-4.1.6l-.2.2s2.6 2.6 9 21.8c0 0 2.5 1.3 2.5 0z" fill="#825105"/><ellipse transform="rotate(-4.6 71.2 20.6)" cx="71.2" cy="20.6" rx="2.2" ry=".5" fill="#f4b145"/><path d="M77.2 41.3s.7-.1 1.2-1.4c.5-1.9-.5-3.8-2.4-4.4-2-.5-2.9-2.4-4.3-4.2s-6.4-4.7-14.9-4.5-10.2-3-10.9-3.6-.8 6 3 10.9 9.3 8.3 15.6 5.1 9.2-.2 9.2-.2 2.2 2.4 3.5 2.3z"/><path d="M77.2 41.3s.7-.1 1.2-1.4c.5-1.9-.5-3.8-2.4-4.4-2-.5-2.9-2.4-4.3-4.2-1.4-1.8-6.4-4.8-14.9-4.5-9.8.3-11.2-4.7-11-3.4 3 11.5 22.9 4.2 31.4 17.9z" opacity=".2" fill="#010101"/></symbol><symbol id="top_04"><path d="M33.6 59.8L68 21s2.1-3 6.4 0c4.3 3 44.5 27.4 44.5 27.4 1.5 1 1.1 2 1.3 2.8-.3 1.3-7.5-8.2-46.8-3.8C34 52.9 33.1 61.8 34.1 62.8s-.5-1-.5-3z" fill="#93505c"/><path d="M33.6 59.8L68 21s2.1-3 6.4 0c-3.2-1-23.3 27.5-27 31.8-13.7 4.5-14 9.2-13.2 9.9 1 1.1-.6-1-.6-3z" opacity=".14"/><path d="M42.9 64.6c-.3-10 64.4-16.3 67.5-8.5 2.6.8 15.9-4.8 6.4-7.2s-25.1-5.9-57.6.9-25.9 13.7-25.9 13.7 7.9 2.4 9.6 1.1z"/></symbol><symbol id="top_05"><path d="M50.8 32.5s2.4 6 5.4 4.8 48.1-1.7 48.1-1.7l4-4.7s7.7-5.1 4.1 3.3l-2.1 3.6c-.6 1-1.1 2.2-1.4 3.4-.1 1.4 1.7-2.8 1.7-2.8l3.8 6.1s2.5 4.6-1.8 4.2-7-3.5-8.3-5.1l-48.1 1.7s-6.5 8.2-9.4 7.9-2.6-3.1-.7-8.8c0 0 1.7-2.8 1.8-4.2S46.3 43 46.3 43s-3.3-7.6-3.6-9c-.7-3.7 3.3-9.1 8.1-1.5z" fill="#fff"/><path d="M111.1 29.5s2.3 1.1-.9 5.2-6.3 5.3-.7 8.7 4.3.4 4.3.4l-3.2-5.3c0-.1 6.2-10.1.5-9zM48.4 40.6s3.2-.7 1.7.6-4.3 5.2 3.7 2.4 47.2-2.7 47.2-2.7l2.8 2.3-47.5 2s-5.8 7-8.7 6.8-.7-7-.7-7l1.5-4.4z" opacity=".14"/></symbol><symbol id="top_06"><path d="M46.8 53.4S34 49 36 37c2-11 14-10 14-10a12 12 0 0112-9c10 0 15 6 15 6s1-7 11-7c5.8-.1 11.1 3 14 8 0 0 13-3 17 6s-14.1 15.3-14.1 15.3-7.9-9.3-6.4-9.8c0 0-4.5 7.5-17.5.5 0 0-7 10-17 4 0 0-7 7.7-15 2.8l-2.2 9.6z" fill="#fff"/><path d="M48 39s13 6 16-5c0 0 15 4 18-4 0 0 10 7 18 2 0 0 4.4 12.1 9.7 9.1A25.5 25.5 0 01104 44l-56 3s-3.7-.2-4.8-1.1c0 0 5.8-.9 4.8-6.9z" opacity=".1"/><path d="M44.2 62.8c1-.8 23.9-19.2 66-7.1 0 0 3.8 1 3.8-1.7l-4-3.6s-10-9-11-14.4c0 0-9 6.3-17-.9 0 0-5 9-18 5.4 0 0-5 8.1-15 2.7 0 0-3 15.3-5 17.2s.2 2.4.2 2.4z" fill="#fff"/><path d="M45.5 60.2A48.2 48.2 0 0168 50c18-4 39.1 1.6 39.1 1.6s5.9 1.1 5.9 3.3-3 .2-3 .2c-24.3-5.3-47.7-5.6-66 8 0-.1-1-.7 1.5-2.9zM64 40s1 8.6-1 10c0 0 0-8.6 1-10zm-14.6 3s.3 10.4-1.8 12c0 0 .7-10.3 1.8-12zm32.5-7.3a28 28 0 00.3 7.1c.8 4.2 2.9 4.5 2.9 4.5-1.5.5-3.6-15.3-3.2-11.6zm17.8 3c.7 2.3 1.6 4.4 2.8 6.5 2 3.6 3.6 3.2 3.6 3.2-.9.9-8-13-6.4-9.7z" opacity=".1"/></symbol><symbol id="top_07"><path d="M40.1 78.3S52 55.6 84.4 54.8c28.2-1.9 33.6 16.1 33.6 16.1 33.1-25 2.8-38.9 2.8-38.9a22.3 22.3 0 01-14.3 17.4C76.4 56.7 59 42.8 59 42.8s-10.5-12.1-21.2-9.2c-.1.3-10.2 1.5-12.4 15.5a26.4 26.4 0 0014.7 29.2z" fill="#743a4b"/><path d="M40.9 33c-2.7.4-5.8.8-5.8 6.2 0 2.7 3.2 5.9 7.6 8.6 4.4 2.7 9.3 4.7 14.3 5.9l6.4 1.2c13.7-2.8 25.9-4.8 37.9-.9 0 0 31.8-12.8 21.3-20.8-4.2-3.8-11.4 1.8-16.7 5-3.4 2-5.9.9-5.9.9s-1.2-7.7-2-10.2c-2-6.6-5.8-13.8-23.8-13.8S58.9 26.3 58.9 26.3l.1 13.2c-1.7 0-4.4-1.1-7.7-3.1 0 0-5.5-3.7-10.4-3.4z" fill="#93505c"/><path d="M39.6 77.7s15-22.9 44.3-23.5c29.3-.6 34.2 16.1 34.2 16.1L123 67s-19-17.3-40-15c-34.8 2.3-48.5 21.9-48.5 21.9z" opacity=".6"/><path d="M82 15.8S59.7 11 58.8 24.2l.4 15c3.4.2 6.8 0 10.1-.6V25.4c.1 0-1.4-9.7 12.7-9.6z" fill="#743a4b"/></symbol><symbol id="top_08"><path d="M123.9 43.8c-5 1.2-7.2 4.8-13.7 5a4.6 4.6 0 01-2.9-1.7l-1-1.7s-1.7-14.7-2.9-17.1c-3.1-6.4-4-10.3-32.2-10.3-2.5-.2-5.1 0-7.6.5-8.8 1-16.5 4.4-13.6 13.6a81 81 0 003.9 16.2c-.6 1-1.5 1.9-2.5 2.4l-1.7.6c-3 .6-7.5-.2-12.9-1.6-11.1-2.8-10.7 6.4-8.4 9.5 2.3 3.1 7.3 4.5 15.5 2.1 11.2-3.4 27.5-7.5 41-8.3 15-.6 25.2 1 32.2 3.4 6.5 2.2 16.3-1.8 16.1-5.7-.2-3.9-4.3-8.1-9.3-6.9z" fill="#24425b"/><path d="M58.1 57.3c8.7-2.6 17.6-4.2 26.7-4.8 16.1-.8 33.7 3.9 33.7 3.9 2.1.7 4.5.8 6.6.1 0 0-24.1-9.5-40.9-8.2-8.4.7-24.9 5-24.9 5s-19.8 6.4-30.9 6.3c.2.2 3.2 7.6 29.7-2.3z" opacity=".15"/><path d="M51.4 38.9s33.3-13.2 53.5-4l1 7.4s-11.5-8-52.7 3.4l-1.8-6.8z"/><path d="M83.5 19.1S44 13 50 32.1c1 6.7 2.8 13.2 5.3 19.4 0 0 12.7-2.1 18.2-4.2l-4.8-16.2c0 .1-3.7-11.1 14.8-12z" opacity=".15"/></symbol><symbol id="top_09"><path d="M43.8 62.3c-2.8.7-3.5-1.6.2-5.3a55.4 55.4 0 0139-14c24 1 31 10 31 10s4 5-2.4 3.7c0 0-31-14.1-67.8 5.6z" fill="#743a4b"/><path d="M45.5 60.2A48.2 48.2 0 0168 50c18-4 39.1 1.6 39.1 1.6s5.9 1.1 5.9 3.3-3 .2-3 .2c-24.3-5.3-47.7-5.6-66 8 0-.1-1-.7 1.5-2.9z" opacity=".2"/><ellipse transform="rotate(-23.9 94 37.3)" cx="94" cy="37.3" rx="14.8" ry="16.9" fill="#c1c1c1"/><ellipse transform="rotate(-24.3 94.7 36.2)" cx="94.7" cy="36.2" rx="14.1" ry="16.2" fill="#efefef"/><ellipse transform="rotate(-17.1 95.4 36.7)" cx="95.4" cy="36.7" rx="11.5" ry="13" fill="#fff"/><ellipse transform="rotate(-17.1 96.1 36.5)" cx="96.1" cy="36.5" rx="3.5" ry="4"/><path d="M93.2 34.2a7 7 0 013.6 2.2c1.5 1.7.8 4-1.2 3.9 3.4.7 4.6-2.7 3.3-5.9 0 0-2.5-4.1-5.7-.2z" fill="#010101" opacity=".3"/></symbol><symbol id="top_10"><path d="M44.6 62C55.1 45 63.9 28.7 67 15c3.8-1.3 24.3 18 42 38.5 0 0-29.1-31.9-64.4 8.5z" fill="currentColor"/><path d="M68 15c8.4 4.8 25.2 22.5 41 38.5-9.9-8.7-17.9-12.4-24.7-12.8L68 15z" fill="#010101" opacity=".1"/><path d="M113.7 37.9s11 5 10 12-10 5-10-1-3-10 0-11zM115.2 33.8s4.2-1.4 5.7.7c1.5 2-1.4 3.8-2.9 2.2-1.5-1.6-3.3-2-2.8-3zM48.8 25.5s-10 4.5-9.1 10.9 9.1 4.5 9.1-.9 2.7-9.1 0-10zM33.5 46.8s.7 5.6-2.4 6.9-4.4-2.8-2-4.2 3.3-3.6 4.4-2.7z"/></symbol><symbol id="top_11"><path d="M81.1 33.8s6.7 2.4 4.4 4.8-4.9-3.8-16.7-1.2S42 42 41 72.4l16.1 3.1s-3.3-12.1 6.7-12.1V51.3s20 10.9 33.4 6 27.8-36.2 3.3-39.9-19.4 16.4-19.4 16.4z" fill="#442a16"/><path d="M41 72.4l16.1 3.1s-3.3-12.1 6.7-12.1c0 0-10-10.9 0-12.1s20 10.9 33.4 6 27.8-36.2 3.3-39.9c9.2 13.9 6.2 21-6.1 25.9-10.9 4.4-21.4.9-33.2 5.1C46 52 41.5 67.1 41 72.4z" opacity=".1"/><path d="M105 50.6s6 6.5 7.2 10.5 3.6 1.3 3.6-2.6c0-7.4-3-10.4-5.9-14.4" fill="#442a16"/><path d="M105 50.6s6 6.5 7.2 10.5 3.6 1.3 3.6-2.6c1.1-5.2-5.9-14.4-5.9-14.4" opacity=".1"/><path d="M41.3 73.9L57 77.5v2l-15.5-4zm4 4.4l11.2 2.8.2 2-11.1-3.2z" fill="#754c24"/></symbol><symbol id="top_12"><path d="M78.1 20.6C59.9 21.7 45.6 26.4 46 31.1s15.5 7.7 33.7 6.6 32.5-5.8 32.1-10.5-15.6-7.7-33.7-6.6zm1.3 14.5c-16.3.9-29.8-1.1-30.1-4.6s12.6-7.1 29-8.1 29.8 1.1 30.1 4.6-12.6 7.1-29 8.1z" opacity=".1"/><path d="M78.1 19.6C59.9 20.7 45.6 25.4 46 30.1s15.5 7.7 33.7 6.6 32.5-5.8 32.1-10.5-15.6-7.7-33.7-6.6zm1.3 14.5c-16.3.9-29.8-1.1-30.1-4.6s12.6-7.1 29-8.1 29.8 1.1 30.1 4.6-12.6 7.1-29 8.1z" fill="#fff800"/></symbol><symbol id="top_13"><path d="M43.8 62.3c-2.8.7-3.5-1.6.2-5.3a55.4 55.4 0 0139-14c24 1 31 10 31 10s4 5-2.4 3.7c0 0-31-14.1-67.8 5.6z" fill="#743a4b"/><path d="M45.5 60.2A48.2 48.2 0 0168 50c18-4 39.1 1.6 39.1 1.6s5.9 1.1 5.9 3.3-3 .2-3 .2c-24.3-5.3-47.7-5.6-66 8 0-.1-1-.7 1.5-2.9z" opacity=".2"/><path d="M71.5 50.2c1-2.7.6-9.5-.9-13.5-.2-.5-.9 1.4-1.1 1-1.7-6.5-3.7-6.9-5-7.2l-1.1 2c.8-6.1-5.2-9.5-5.2-9.5l.4 1.6c-1.9-2-4.1-3.6-6.5-5-.3-.3-.3-.3-.2.2.2 2.7.8 5.4 1.8 7.9l-1.2-1s.5 6.9 6.5 8.7l-2.3.2c.4 4.6 5 6.6 5 6.6s-2.5-.3-2.2.1c3.1 3.8 7.3 6.6 12 7.9z"/><path d="M71.5 50.2c1-2.7.6-9.5-.9-13.5-.2-.5-.9 1.4-1.1 1-1.7-6.5-3.7-6.9-5-7.2l-1.1 2c.8-6.1-5.2-9.5-5.2-9.5l.4 1.6c-1.9-2-4.1-3.6-6.5-5-.3-.3-.3-.3-.2.2l19.6 30.4z" fill="#010101" opacity=".1"/><path d="M62.9 50.7c-.3-2.1-2.9-6.7-5.2-8.9-.3-.3-.1 1.3-.4 1-3.4-3.9-4.9-3.5-5.9-3.2l-.1 1.8c-1.5-4.5-6.8-4.7-6.8-4.7l.8.9c-2-.7-4-1-6.1-1.2-.3-.1-.3-.1-.1.2 1.1 1.8 2.4 3.4 3.9 4.8l-1.2-.3s2.7 4.5 7.4 3.7l-1.5.9c1.8 3 5.7 2.7 5.7 2.7s-1.8.7-1.5.8c3.5 1.7 7.3 2.2 11 1.5z" fill="#39b54a"/><path d="M62.9 50.7c-.3-2.1-2.9-6.7-5.2-8.9-.3-.3-.1 1.3-.4 1-3.4-3.9-4.9-3.5-5.9-3.2l-.1 1.8c-1.5-4.5-6.8-4.7-6.8-4.7l.8.9c-2-.7-4-1-6.1-1.2-.3-.1-.3-.1-.1.2 1.1 1.8 2.4 3.4 3.9 4.8l-1.2-.3s2.7 4.5 7.4 3.7l-1.5.9c1.8 3 5.7 2.7 5.7 2.7s-1.8.7-1.5.8c3.5 1.7 7.3 2.2 11 1.5z"/></symbol><symbol id="top_14"><path d="M45 55l-6-18.8s4 8.9 11 6.8 8-17.1 8-17.1 3 12.4 11 12.2S79.5 24 79.5 24 83 37 88 37c10.1 0 13-12.1 13-12.1s3 16 8 16c3.1-.1 6-1.4 8-3.8l-6 15c0 .1-49-5.6-66 2.9z" fill="#ffe000"/><path d="M45 55c30-2.7 51.9-8.9 56-30.1 0 0 3 16 8 16 3.1-.1 6-1.4 8-3.8l-6 15c0 .1-49-5.6-66 2.9z" opacity=".05"/><path d="M44.5 62.2A70.3 70.3 0 0183 51c23 0 27.2 3.9 27.2 3.9l3.2 4.4s3.1 3.2 5.1-.8-3-12-18-15-42 0-54 7-7 15-5 15H43l1.5-3.3z" fill="#c69757"/><path d="M44.5 62.7A70.3 70.3 0 0183 51.5c23 0 27.2 3.9 27.2 3.9l3.2 4.4s3.1 3.2 5.1-.8C109 37 39 49 39.4 63.9c.6 1.3 1.5 2.1 2.1 2.1H43l1.5-3.3z" opacity=".1"/><circle cx="101.7" cy="22.2" r="6.8"/><path d="M108.5 23a6.8 6.8 0 01-7.6 6 7 7 0 01-4.6-2.5c1.7.6 6.1 1.3 8.9-1.4 2-1.9 2.1-5.6 1.6-7.4a6.8 6.8 0 011.7 5.3z" fill="#010101" opacity=".25"/><circle cx="100.7" cy="39.2" r="2.5"/><circle cx="60.7" cy="40.2" r="2.5"/></symbol><symbol id="top_15"><path d="M133 48.8c-1.9-8.6-10.2-12.6-28.2-9.5C99.4 32 89 19 82 15l-3.7-2-21.3-.2c-3.2.3-5.8.7-7.2 1.5 0 0-.7 3-1.9 4.1-2.9 2.4 5.1 3.4 5.1 3.4l-2 3 4 2v3c1.8 6.9-.3 14-.3 14s1.2 1.6-17.2.4C19.1 43 23 65.8 36 63.8l8.9-1a171 171 0 0049.4-9.4c3.8-1 7.6-1.6 11.5-1.9 3.7 2.8 6.8 6.3 9.2 10.2l.3-.2-.2.1c0 .2 19.9-3.8 17.9-12.8zm-21.5 3c1.7.2 3.2.9 4.5 2-1.4-.9-2.9-1.6-4.5-2z" fill="#fff"/><path d="M105.8 51.5c3.7 3 7 6.2 9.2 10.5 0 0 6.3-2.8 1.6-8 0 0-1.6-3-10.8-2.5z" opacity=".5"/><path d="M37.8 63.4s33-.9 56.8-10c0 0 16.7-4.6 21.7.4s-.9 8-.9 8 20-4 18-13-11-13-31-9-18.6 17.3-64.6 23.6z" opacity=".25"/><path d="M70.9 13c11 11.6 22 25.6 19 31.6 5-2.5 8.1-4.2 14.9-5.3-2.9-4.2-6-8.2-9.2-12.1C95.6 27.2 83 14 78 13z" opacity=".1"/><path d="M54.4 44c9 2 29.2-2 45.5-11.5l-8.6-9.9c-.5 2-30.7 7.7-36.3 8.4.9 3.5.2 7.8-.6 13z"/><path d="M69.9 26L83 22.2c2-.6 4 .6 4.6 2.5l3.3 11.4c.6 2-.6 4-2.5 4.6l-13.1 3.8c-2 .6-4-.6-4.6-2.5l-3.3-11.4c-.6-2 .6-4 2.5-4.6z" fill="#ffe000"/><path d="M73.9 28.5l7.1-2c1.5-.4 3 .4 3.5 1.9l1.9 6.6c.4 1.5-.4 3-1.9 3.5l-7.1 2c-1.5.4-3-.4-3.5-1.9L72 31.9c-.4-1.5.4-3 1.9-3.4z"/></symbol><symbol id="top_16"><path d="M43.5 62.2s-7.5-.2-9.4-3.8c-.2-1.1-.2-2.3-.1-3.5a45.7 45.7 0 0147-37c32 1 44 33 42 43-1 3-6 5-7.6 3.5C111 57 99.9 53.4 83 54c-32 0-39.5 8.2-39.5 8.2z" fill="#fff"/><path d="M83 20s16 8 18 25l-6 10c15 0 21 10 21 10s5 0 7-4.3c.7-5 .1-14.2-11.1-28.2 0 0-10.9-13.5-28.9-14.5 0 0-4 1 0 2z" opacity=".05"/><path d="M43.6 61.9s-7.5-.1-9.2-3.6c-1.4-2 14.7-11.9 47-11.3s43.4 11.7 41.4 14.1c-2 4.1-7.5 3.9-7.5 3.9 0-.7-2.6-11.9-31.9-10.6-34.4.6-39.8 7.5-39.8 7.5z" opacity=".2"/><g opacity=".1"><path d="M34.8 57.7s4.9 4.1 7 4.3l1.2-.6-7.3-4.7-.9 1zM41 53.2l7.7 5.8 2.3-.8-7.4-6zM54.6 49.2l5.1 7.4 3.2-.6-4.7-7.5zM70.4 47.2l2.3 7.6 2.9-.2-1-7.6zM89.1 47.3l-1.3 7.1 2.8.1 2.3-6.8zM105.2 49.9l-3.8 6.1 2.4.7 4.3-6zM118.9 55.6l-7.6 4.1 2.5 1.6 8-3.2z"/></g><ellipse cx="96.2" cy="32.5" rx="8.2" ry="9.5"/><path d="M122.2 51.8a9.5 9.5 0 01-7.5-6c-1.1-2.9-.9-6.1.7-8.8 3.1 4.4 5.5 9.4 6.8 14.8zM52.9 32.2c-1.8 5-6.6 7.7-10.9 6.2l-1-.5s5-8 11.8-12c.8 2.1.8 4.3.1 6.3zM81.1 23.6c-1.3 5.1-5.9 8.3-10.3 7.1s-6.7-5.9-5.7-10.8C71 18 74 18 80.7 18a9 9 0 01.4 5.6zM50 50.2V50a9.3 9.3 0 019.5-9c4-.1 7.6 2.4 9 6.1A80.4 80.4 0 0050 50.2z"/></symbol><symbol id="top_17"><path d="M46.5 58.2s-12-.6-16.5-3.8a9.1 9.1 0 006-4.3c1.5-2.5 2.1-5.4 1.7-8.3 0 0 9.1-.3 13.8-5.5S57 23.7 57 23.7s7.9 4.1 21.5 1.8S95.3 18 95.3 18s2.2 9 9.4 12c4.6 1.8 9.4 3 14.3 3.6-.7 8.6-6.1 13.5-13 15.8-19.6-7.1-59.5 8.8-59.5 8.8z" fill="#112289"/><path d="M46.5 58.2s-12-.6-16.5-3.8a9.1 9.1 0 006-4.3c1.5-2.5 2.1-5.4 1.7-8.3 0 0 9.1-.3 13.8-5.5S57 23.7 57 23.7s7.9 4.1 21.5 1.8S95.3 18 95.3 18s2.2 9 9.4 12c4.6 1.8 9.4 3 14.3 3.6-.7 8.6-6.1 13.5-13 15.8-19.6-7.1-59.5 8.8-59.5 8.8z" opacity=".1"/><path d="M45 62s13.7-13.6 49.7-11.3c0 0 11.3 2 14.6 4.8 0 0 .4-13.9-16.2-16s-35.6 1.6-43.5 11.7A25.9 25.9 0 0045 62z" fill="#1524a5"/><ellipse cx="94.1" cy="43.1" rx="5" ry="7.7" fill="#111c60"/><ellipse cx="95.7" cy="43.1" rx="5" ry="7.7"/></symbol><symbol id="top_18"><path d="M75.3 38.8A13.9 13.9 0 0060 34c-10 3-7.4 13.4-16.2 19.2S34 51 34 51s-1 24 21 16c0 0 9-2 12-9-.1 2.5-.7 4.9-2 7 4.7-.8 9.4-1.7 14-7 0 0 3-5 4 0 3 7 14 7 14 7s-3-6 0-10c3-3 2.8-1.8 2.8-1.8S103 63 113 62s10-12 10-12-3 7-6 2-10.4-21.1-17.7-13.5-24 .3-24 .3z"/><path d="M74 22l2 24s11-3 22 1l5-25-10 10-4-16-7 15-8-9z" fill="#ff0"/><path d="M75.8 43.4L76 46s11-3 22 1l.5-2.6a40.2 40.2 0 00-22.7-1z" fill="#d68227"/><g opacity=".2"><path d="M89 16l4 16.4-3-1.8-2.3-11.8zm-15 6.4l8 8.2-3 .9-4.7-5.8zM93.5 45.6l4.1 1.3 5.9-24.8-5.6 5.2-4.4 18.3z"/></g></symbol><symbol id="top_19"><path d="M105.1 24.3h7.9S94.2 9.8 75 21.6C69.2 25 63.4 35.7 61 45.2c0 0 23.5-7.7 33.8 11.8h4.8L113 24.3z"/><path d="M113 24.3S92.8 8.7 73.4 22.7c0 0 11.5-10.3 31.7 1.6z" fill="#fff" opacity=".5"/><path d="M94.8 57h4.7L113 24.3h-7.9z" fill="#010107" opacity=".1"/></symbol><symbol id="top_20"><path d="M83.8 43.4A8.3 8.3 0 0082 46c-1 2 1 7 7 8s11 2 12-3-13.4-8.3-17.2-7.6z" opacity=".2"/><path d="M82.8 44.8L102 19l-3.6 29.8C97 55 79 55 82.8 44.8z" fill="#fff"/><path d="M82.8 44.8C91 51 96 40 97.9 24.4L102 19l-3.6 29.8C97 55 79 55 82.8 44.8z" opacity=".15"/><path d="M98.8 45S89 52 85 41.8l1.3-1.7s4.7 8 12.8 3zm-8.9-9.7s3.5 7.7 9.8 2.7l.3-2c-3.3 1.6-6.3 1.3-9-2.3zm4.1-5.6s2 4.2 6.5 1.7l.2-2.2s-3.4 2-5.6-1z"/></symbol><symbol id="top_21"><path d="M74.9 33.5s-7-2.4-6.2-9.6 9.5-11.4 15.3-5.1c3.4 3.4 4.1 8.6 1.8 12.8l-10.9 1.9z" fill="#fff"/><path d="M79.8 26.6c-31.7-1.6-33.9 27-33.9 27l65 .8c-.1-.1.5-26.3-31.1-27.8z"/><path d="M46.1 49.8s-4.7 1.2-5.4 4.6-1.2 7.8-1.2 7.8c.1 1.9 2.9 4.1 2.9 4.1l1.1-2.7c10.8-5.8 42.1-8.4 50.7-8.8 5.6-.1 11.2.3 16.7 1.1l2.2 3.4 3.6-2.5c.7-.4 1.1-1.2.7-2-.6-1.4-3-10.3-5-11.7-1.3-.9-11-2.3-28.8-.4a269.2 269.2 0 00-37.5 7.1z" fill="#fff"/><path d="M39.5 62.2c.1 1.9 2.9 4.1 2.9 4.1l1.1-2.7c10.8-5.8 42.1-8.4 50.7-8.8 5.3-.1 10.5.2 15.7 1.1l3.2 3.5 3.6-2.5c.7-.4 1.1-1.2.7-2-3.9-9.4-80 2.4-77.9 7.3z" opacity=".12"/><g opacity=".2"><path d="M45.7 49.8s-1.4 7.5-1.2 9.4c.1 1.2.4 2.3.8 3.4l2.1-.7-.8-3.4 1.1-9.2-2 .5z"/><path d="M48.5 49.2s-1.4 7.5-1.2 9.4c.1 1.2.4 2.3.8 3.4l2.1-.7-.8-3.4 1.1-9.2-2 .5zM55.9 47.4l-.3 8.8 1 3.3 2-.3-.9-3v-9.1z"/><path d="M58.3 46.8l-.3 8.8 1 3.2 2-.3-.9-3v-9zM67.7 45l.9 9.2-.1 3.2 2.7-.3-.4-3.1-1.2-9.3zM71.1 44.4l.8 9.2v3.2l2.6-.3-.3-3.2-1.2-9.2zM83.9 55.4l.1-3.1-1.1-9.6 2.5-.2 1.4 9.5-.7 3.4zM87.2 55.2v-3l-1.1-9.6 2.5-.3 1.4 9.6-.7 3.3zM99 41.7l1.4 9.5-.4 3.6 2.3.2.6-3.7-1.8-9.6zM102.4 41.7l1.8 9.6-.5 3.8 2.5.2.5-3.8-2-9.7zM111.7 42.7l3.9 10.4-4.9 2.7 1.4 2 5.5-3.2-3.5-8.9c.1 0-1-2.6-2.4-3z"/></g></symbol></svg>';
$1.svgPath = `data:text/plain;base64,${window.btoa(ht)}`;
const ft = U({
  name: "Identicon",
  props: {
    address: {
      required: !0,
      type: String
    }
  },
  setup(e, t) {
    function n(l) {
      return l.replace(/[\+ ]/g, "").toUpperCase().match(/.{4}/g).join(" ");
    }
    function o(l) {
      return h1.isValidAddress(l);
    }
    const a = P(() => 'data:image/svg+xml,<svg width="64" height="64" viewBox="0 -4 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".1" d="M62.3 25.4L49.2 2.6A5.3 5.3 0 0 0 44.6 0H18.4c-1.9 0-3.6 1-4.6 2.6L.7 25.4c-1 1.6-1 3.6 0 5.2l13.1 22.8c1 1.6 2.7 2.6 4.6 2.6h26.2c1.9 0 3.6-1 4.6-2.6l13-22.8c1-1.6 1-3.6.1-5.2z" fill="url(%23identicon_radial)"/><defs><radialGradient id="identicon_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-63.0033 0 0 -56 63 56)"><stop stop-color="%23260133"/><stop offset="1" stop-color="%231F2348"/></radialGradient></defs></svg>'), i = S(a.value);
    B(() => e.address, s, { immediate: !0 });
    async function s(l, r) {
      return e.address && o(e.address) ? i.value = await $1.toDataUrl(n(e.address)) : i.value = a.value, !0;
    }
    return t.expose({
      formatAddress: n,
      isUserFriendlyAddress: o
    }), { dataUrl: i };
  }
});
const F = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, mt = { class: "identicon" }, pt = ["src"];
function vt(e, t, n, o, a, i) {
  return y(), w("div", mt, [
    $("img", { src: e.dataUrl }, null, 8, pt)
  ]);
}
const fe = /* @__PURE__ */ F(ft, [["render", vt], ["__scopeId", "data-v-55792d6b"]]);
function q1(e) {
  return typeof e == "number" || typeof e == "bigint" || e && e.constructor && e.constructor.name.endsWith("Integer");
}
const gt = U({
  name: "Amount",
  props: {
    amount: {
      required: !0,
      validator: q1,
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
  setup(e, t) {
    function n(s) {
      if (!(e.decimals !== void 0 && s !== e.decimals) && s !== void 0 && (s < 0 || s > e.currencyDecimals || !Number.isInteger(s)))
        throw new Error("Amount: decimals is not in range");
    }
    B(() => e.minDecimals, n, { immediate: !0 }), B(() => e.maxDecimals, n, { immediate: !0 }), B(() => e.decimals, n, { immediate: !0 });
    const o = P(() => {
      let s, l;
      return typeof e.decimals == "number" ? s = l = e.decimals : (s = e.minDecimals, l = e.maxDecimals), new i1(e.amount).moveDecimalSeparator(-e.currencyDecimals).toString({ maxDecimals: l, minDecimals: s, useGrouping: !0 });
    }), a = P(() => !new i1(e.amount).moveDecimalSeparator(-e.currencyDecimals).equals(o.value.replace(/\s/g, ""))), i = P(() => e.currency === "tnim" ? "tNIM" : e.currency === "mbtc" ? "mBTC" : e.currency === "tbtc" ? "tBTC" : e.currency.toUpperCase());
    return {
      formattedAmount: o,
      isApprox: a,
      ticker: i
    };
  }
});
function yt(e, t, n, o, a, i) {
  return y(), w("span", {
    class: V(["amount", { approx: e.showApprox && e.isApprox }])
  }, [
    X(x(e.formattedAmount) + " ", 1),
    $("span", {
      class: V(["currency", e.currency])
    }, x(e.ticker), 3)
  ], 2);
}
const E1 = /* @__PURE__ */ F(gt, [["render", yt], ["__scopeId", "data-v-3134b609"]]), Mt = (e, t) => {
  const n = e[t];
  return n ? typeof n == "function" ? n() : Promise.resolve(n) : new Promise((o, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + t)));
  });
}, K1 = "en", me = [
  K1,
  "de",
  "es",
  "fr",
  "nl",
  "ru",
  "uk",
  "zh"
], u1 = S(pe()), k1 = {}, _t = [];
function wt(e) {
  if (me.includes(e) || (e = K1), e !== u1.value) {
    u1.value = e;
    for (const t of Object.keys(_t))
      ve(t);
  }
}
function pe() {
  let n = et.getCookie("lang") || "en";
  return me.includes(n) || (n = K1), n;
}
async function ve(e) {
  const t = u1.value + "-" + e;
  if (!(t in k1) && u1.value !== "en") {
    const n = await Mt(/* @__PURE__ */ Object.assign({}), `./${u1}/${e}.json`);
    k1[t] = n.default || {};
  }
}
function zt(e, t, n, o) {
  let a;
  typeof n == "string" ? a = n : (a = u1.value, o = n);
  const i = `${a}-${e}`;
  let s = k1[i] && k1[i][t] || t;
  return (typeof o == "object" || Array.isArray(o)) && (s = s.replace(/{(\w+?)}/g, (l, r) => o[r].toString() || l)), s;
}
function J(e) {
  return ve(e), zt.bind(void 0, e);
}
window.addEventListener("focus", () => wt(pe()));
var R1 = /* @__PURE__ */ ((e) => (e.MODELVALUE_UPDATE = "update:modelValue", e.CHANGED = "changed", e.PASTE = "paste", e))(R1 || {});
const $t = U({
  name: "LabelInput",
  emits: Object.values(R1),
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
  methods: { $t: J("LabelInput") },
  setup(e, t) {
    const n = S(null), o = S(null), a = S(null), i = S(""), s = S(""), l = S(""), r = S(50);
    function d() {
      n.value && n.value.focus();
    }
    function p() {
      if (e.maxBytes) {
        if (g1.stringToUtf8ByteArray(i.value).byteLength > e.maxBytes) {
          i.value = s.value;
          return;
        }
        s.value = i.value;
      }
      t.emit("update:modelValue", i.value);
    }
    function u() {
      i.value !== l.value && (t.emit("changed", i.value), l.value = i.value, n.value && n.value.blur());
    }
    B(() => e.modelValue, c, { immediate: !0 });
    function c(g) {
      i.value = g, s.value = i.value, l.value = s.value;
    }
    B(i, v, { immediate: !0 });
    async function v() {
      if (await a1(), !o.value || !a.value || !n.value)
        return;
      const g = o.value.offsetWidth, f = a.value.offsetWidth, b = parseFloat(window.getComputedStyle(n.value, null).getPropertyValue("font-size"));
      r.value = (i.value.length ? f : g) + b / 3;
    }
    return t.expose({ focus: d }), {
      input$: n,
      widthPlaceholder$: o,
      widthValue$: a,
      liveValue: i,
      width: r,
      onInput: p,
      onBlur: u,
      LabelInputEvent: R1
    };
  }
});
const bt = ["placeholder", "disabled"];
function St(e, t, n, o, a, i) {
  return y(), w("form", {
    class: V(["label-input", { disabled: e.disabled }]),
    onSubmit: t[4] || (t[4] = o1((...s) => e.onBlur && e.onBlur(...s), ["prevent"]))
  }, [
    $("span", {
      class: "width-finder width-placeholder",
      ref: "widthPlaceholder$"
    }, x(e.placeholder || e.$t("Name your address")), 513),
    $("span", {
      class: "width-finder width-value",
      ref: "widthValue$"
    }, x(e.liveValue), 513),
    j1($("input", {
      type: "text",
      class: V(["nq-input", { vanishing: e.vanishing }]),
      placeholder: e.placeholder || e.$t("Name your address"),
      style: z1({ width: `${e.width}px` }),
      "onUpdate:modelValue": t[0] || (t[0] = (s) => e.liveValue = s),
      disabled: e.disabled,
      onInput: t[1] || (t[1] = (...s) => e.onInput && e.onInput(...s)),
      onBlur: t[2] || (t[2] = (...s) => e.onBlur && e.onBlur(...s)),
      onPaste: t[3] || (t[3] = (s) => e.$emit(e.LabelInputEvent.PASTE, s)),
      ref: "input$"
    }, null, 46, bt), [
      [re, e.liveValue]
    ])
  ], 34);
}
const Ct = /* @__PURE__ */ F($t, [["render", St], ["__scopeId", "data-v-b35a7398"]]);
var ge = /* @__PURE__ */ ((e) => (e.CHANGED = "changed", e))(ge || {}), ye = /* @__PURE__ */ ((e) => (e.ROW = "row", e.COLUMN = "column", e))(ye || {});
const At = U({
  name: "Account",
  emits: Object.values(ge),
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
      validator: (e) => Object.values(ye).includes(e)
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
  setup: (e, t) => {
    const n = S(null), o = S(!!e.image);
    function a() {
      e.editable && n.value && n.value.focus();
    }
    function i(r) {
      t.emit("changed", r);
    }
    B(() => e.image, () => {
      o.value = !!e.image;
    }, { immediate: !0 });
    function s() {
      return e.address ? h1.isValidAddress(e.address) : !1;
    }
    function l() {
      return h1.isValidAddress(e.label);
    }
    return t.expose({ focus: a }), {
      label$: n,
      showImage: o,
      isNimiqAddress: s,
      isLabelNimiqAddress: l,
      onModelValueUpdate: i
    };
  },
  components: {
    Identicon: fe,
    Amount: E1,
    LabelInput: Ct
  }
});
const kt = { class: "identicon-and-label" }, Et = ["src"], Tt = {
  key: 1,
  class: "identicon"
}, It = /* @__PURE__ */ f1('<div class="nq-blue-bg" data-v-404555aa><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="white" stroke-linecap="round" stroke-width="2.5" data-v-404555aa><path d="M40.25 23.25v-.5a6.5 6.5 0 0 0-6.5-6.5h-3.5a6.5 6.5 0 0 0-6.5 6.5v6.5a6.5 6.5 0 0 0 6.5 6.5h2" data-v-404555aa></path><path d="M23.75 40.75v.5a6.5 6.5 0 0 0 6.5 6.5h3.5a6.5 6.5 0 0 0 6.5-6.5v-6.5a6.5 6.5 0 0 0-6.5-6.5h-2" data-v-404555aa></path><path d="M32 11.25v4M32 48.75v4" data-v-404555aa></path></svg></div>', 1), Lt = [
  It
], xt = {
  key: 5,
  class: "nq-label wallet-label"
};
function Dt(e, t, n, o, a, i) {
  const s = O("Identicon"), l = O("LabelInput"), r = O("Amount");
  return y(), w("div", {
    class: V(["account", [{ editable: e.editable }, e.layout, { cashlink: e.displayAsCashlink }]])
  }, [
    $("div", kt, [
      e.showImage ? (y(), w("img", {
        key: 0,
        class: "identicon account-image",
        src: e.image,
        onError: t[0] || (t[0] = (d) => e.showImage = !1)
      }, null, 40, Et)) : e.displayAsCashlink ? (y(), w("div", Tt, Lt)) : e.isNimiqAddress() ? (y(), q(s, {
        key: 2,
        address: e.address
      }, null, 8, ["address"])) : H("", !0),
      e.editable ? (y(), w("div", {
        key: 4,
        class: V(["label editable", { "address-font": e.isLabelNimiqAddress() }])
      }, [
        j(l, {
          ref: "label$",
          maxBytes: 63,
          value: e.label,
          placeholder: e.placeholder,
          "onUpdate:modelValue": e.onModelValueUpdate
        }, null, 8, ["value", "placeholder", "onUpdate:modelValue"])
      ], 2)) : (y(), w("div", {
        key: 3,
        class: V(["label", { "address-font": e.isLabelNimiqAddress() }])
      }, x(e.label), 3)),
      e.layout === "column" && e.walletLabel ? (y(), w("div", xt, x(e.walletLabel), 1)) : H("", !0)
    ]),
    e.balance || e.balance === 0 ? (y(), q(r, {
      key: 0,
      class: "balance",
      amount: e.balance,
      decimals: e.decimals
    }, null, 8, ["amount", "decimals"])) : H("", !0)
  ], 2);
}
const Q1 = /* @__PURE__ */ F(At, [["render", Dt], ["__scopeId", "data-v-404555aa"]]), Rt = 800, Bt = U({
  name: "Copyable",
  props: {
    text: String
  },
  methods: { $t: J("Copyable") },
  setup(e, t) {
    const n = S(null), o = S(null), a = S(!1), i = S(null);
    function s() {
      let r = e.text;
      if (!r && n.value && o.value) {
        const d = o.value.textContent;
        r = n.value.innerText.replace(new RegExp(`\\s*${d}$`), "");
      }
      r && G1.copy(r), window.clearTimeout(i.value), a.value = !0, i.value = window.setTimeout(() => {
        a.value = !1;
      }, Rt);
    }
    function l(r) {
      (r.key === " " || r.key === "Enter") && s();
    }
    return n1(() => n.value.addEventListener("keydown", l)), qe(() => n.value.removeEventListener("keydown", l)), {
      root$: n,
      tooltip$: o,
      copied: a,
      copy: s
    };
  }
});
const Vt = (e) => (l1("data-v-57319f65"), e = e(), r1(), e), Pt = /* @__PURE__ */ Vt(() => /* @__PURE__ */ $("div", { class: "background" }, null, -1));
function Nt(e, t, n, o, a, i) {
  return y(), w("div", {
    class: V(["copyable", { copied: e.copied }]),
    onClick: t[0] || (t[0] = (...s) => e.copy && e.copy(...s)),
    tabindex: "0",
    ref: "root$"
  }, [
    Pt,
    Y(e.$slots, "default", {}, void 0, !0),
    $("div", {
      class: "tooltip",
      ref: "tooltip$"
    }, x(e.$t("Copied")), 513)
  ], 2);
}
const Ot = /* @__PURE__ */ F(Bt, [["render", Nt], ["__scopeId", "data-v-57319f65"]]), Ht = U({
  name: "AddressDisplay",
  components: { Copyable: Ot },
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
  setup(e) {
    return { chunks: P(() => e.address ? e.address.replace(/[+ ]/g, "").match(/.{4}/g) : new Array(9).fill("-")) };
  }
});
const Ft = (e) => (l1("data-v-51e3bdc9"), e = e(), r1(), e), Ut = /* @__PURE__ */ Ft(() => /* @__PURE__ */ $("span", { class: "space" }, "\xA0", -1));
function jt(e, t, n, o, a, i) {
  return y(), q(ce(e.copyable ? "Copyable" : "div"), {
    text: e.chunks.join(" ").toUpperCase(),
    class: "address-display"
  }, {
    default: K(() => [
      (y(!0), w(Z, null, t1(e.chunks, (s, l) => (y(), w("span", {
        class: "chunk",
        key: s + l
      }, [
        X(x(s), 1),
        Ut
      ]))), 128))
    ]),
    _: 1
  }, 8, ["text"]);
}
const Wt = /* @__PURE__ */ F(Ht, [["render", jt], ["__scopeId", "data-v-51e3bdc9"]]), Gt = {
  width: "17",
  height: "16",
  viewBox: "0 0 17 16",
  xmlns: "http://www.w3.org/2000/svg"
}, qt = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M15.913 13.333L9.68 1.433a1.333 1.333 0 0 0-2.362 0l-6.232 11.9a1.333 1.333 0 0 0 1.182 1.952H14.73a1.333 1.333 0 0 0 1.182-1.952zm-8.08-7.718a.667.667 0 0 1 1.334 0v4a.667.667 0 1 1-1.334 0v-4zm.682 7.674h.018a.983.983 0 0 0 .967-1.022 1.018 1.018 0 0 0-1.016-.978h-.019a.984.984 0 0 0-.965 1.02c.02.546.468.978 1.015.98z",
  fill: "currentColor"
}, null, -1), Kt = [
  qt
];
function Qt(e, t) {
  return y(), w("svg", Gt, Kt);
}
const Xt = { render: Qt }, Yt = {
  width: "11",
  height: "9",
  viewBox: "0 0 11 9",
  xmlns: "http://www.w3.org/2000/svg"
}, Zt = /* @__PURE__ */ $("path", {
  d: "M4.25,7.75.75,4.25,4.25.75",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  stroke: "currentColor",
  fill: "none"
}, null, -1), Jt = /* @__PURE__ */ $("line", {
  x1: "1",
  y1: "4.25",
  x2: "10.25",
  y2: "4.25",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  stroke: "currentColor",
  fill: "none"
}, null, -1), e2 = [
  Zt,
  Jt
];
function t2(e, t) {
  return y(), w("svg", Yt, e2);
}
const n2 = { render: t2 }, a2 = {
  width: "23",
  height: "18",
  viewBox: "0 0 23 18",
  xmlns: "http://www.w3.org/2000/svg"
}, o2 = /* @__PURE__ */ $("path", {
  d: "M22 9L3 9",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), s2 = /* @__PURE__ */ $("path", {
  d: "M9 16L2 9L9 2",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), i2 = [
  o2,
  s2
];
function l2(e, t) {
  return y(), w("svg", a2, i2);
}
const r2 = { render: l2 }, c2 = {
  width: "16",
  height: "12",
  viewBox: "0 0 16 12",
  xmlns: "http://www.w3.org/2000/svg"
}, d2 = /* @__PURE__ */ $("path", {
  d: "M10,1l5,5l-5,5",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), u2 = /* @__PURE__ */ $("line", {
  x1: "14",
  y1: "6",
  x2: "1",
  y2: "6",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), h2 = [
  d2,
  u2
];
function f2(e, t) {
  return y(), w("svg", c2, h2);
}
const m2 = { render: f2 }, p2 = {
  width: "23",
  height: "18",
  viewBox: "0 0 23 18",
  xmlns: "http://www.w3.org/2000/svg"
}, v2 = /* @__PURE__ */ $("path", {
  d: "M13.9995 1.99902L20.999 9.00049L13.9995 16",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), g2 = /* @__PURE__ */ $("line", {
  x1: "18.999",
  y1: "9",
  x2: "0.999023",
  y2: "9",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), y2 = [
  v2,
  g2
];
function M2(e, t) {
  return y(), w("svg", p2, y2);
}
const _2 = { render: M2 }, w2 = {
  width: "10",
  height: "11",
  viewBox: "0 0 10 11",
  xmlns: "http://www.w3.org/2000/svg"
}, z2 = /* @__PURE__ */ $("path", {
  d: "M5.00098 2L8.53602 5.53603L5.00098 9.07107",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), $2 = [
  z2
];
function b2(e, t) {
  return y(), w("svg", w2, $2);
}
const S2 = { render: b2 }, C2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 64 64",
  width: "64",
  height: "64"
}, A2 = /* @__PURE__ */ f1('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.5px" stroke-linejoin="round"><path d="M40.25,23.25v-.5a6.5,6.5,0,0,0-6.5-6.5h-3.5a6.5,6.5,0,0,0-6.5,6.5v6.5a6.5,6.5,0,0,0,6.5,6.5h2"></path><path d="M23.75,40.75v.5a6.5,6.5,0,0,0,6.5,6.5h3.5a6.5,6.5,0,0,0,6.5-6.5v-6.5a6.5,6.5,0,0,0-6.5-6.5h-2"></path><line x1="32" y1="11.25" x2="32" y2="15.25"></line><line x1="32" y1="48.75" x2="32" y2="52.75"></line></g>', 1), k2 = [
  A2
];
function E2(e, t) {
  return y(), w("svg", C2, k2);
}
const T2 = { render: E2 }, I2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24"
}, L2 = /* @__PURE__ */ f1('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5px" stroke-linejoin="round"><path d="M15.25,8.25h0a2.5,2.5,0,0,0-2.5-2.5h-1.5a2.5,2.5,0,0,0-2.5,2.5v3a2.5,2.5,0,0,0,2.5,2.5h.5"></path><path d="M8.75,15.75h0a2.5,2.5,0,0,0,2.5,2.5h1.5a2.5,2.5,0,0,0,2.5-2.5v-3a2.5,2.5,0,0,0-2.5-2.5h-.5"></path><line x1="12" y1="3.75" x2="12" y2="5.25"></line><line x1="12" y1="18.75" x2="12" y2="20.25"></line></g>', 1), x2 = [
  L2
];
function D2(e, t) {
  return y(), w("svg", I2, x2);
}
const R2 = { render: D2 }, B2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  width: "16",
  height: "16"
}, V2 = /* @__PURE__ */ $("g", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round"
}, [
  /* @__PURE__ */ $("path", { d: "M10.5,5.5h0a2,2,0,0,0-2-2h-1a2,2,0,0,0-2,2V7a2,2,0,0,0,2,2H8" }),
  /* @__PURE__ */ $("path", { d: "M5.5,10.5h0a2,2,0,0,0,2,2h1a2,2,0,0,0,2-2V9a2,2,0,0,0-2-2H8" })
], -1), P2 = [
  V2
];
function N2(e, t) {
  return y(), w("svg", B2, P2);
}
const O2 = { render: N2 }, H2 = {
  width: "74",
  height: "74",
  viewBox: "0 0 74 74",
  xmlns: "http://www.w3.org/2000/svg"
}, F2 = /* @__PURE__ */ $("path", {
  d: "M71.12 1.84a4.5 4.5 0 0 0-6.28 1.04l-42.1 58.74L8.68 47.54a4.5 4.5 0 1 0-6.36 6.37l17.8 17.81a4.57 4.57 0 0 0 6.84-.56l45.2-63.03a4.5 4.5 0 0 0-1.04-6.29z",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": ".8"
}, null, -1), U2 = [
  F2
];
function j2(e, t) {
  return y(), w("svg", H2, U2);
}
const W2 = { render: j2 }, G2 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12"
}, q2 = /* @__PURE__ */ $("path", {
  d: "M11,1,4,11,1,8",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
}, null, -1), K2 = [
  q2
];
function Q2(e, t) {
  return y(), w("svg", G2, K2);
}
const X2 = { render: Q2 }, Y2 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Z2 = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M3.528 3.52c4.683-4.684 12.275-4.686 16.96-.005 4.678 4.69 4.678 12.28 0 16.97-4.685 4.68-12.277 4.678-16.96-.005-4.682-4.684-4.682-12.276 0-16.96zm13.145 13.133a1 1 0 0 0 .036-1.374l-3.11-3.11a.25.25 0 0 1 0-.352l3.11-3.11a1 1 0 1 0-1.414-1.415l-3.11 3.11a.25.25 0 0 1-.354 0l-3.11-3.11a1 1 0 0 0-1.41 1.415l3.11 3.11a.249.249 0 0 1 0 .353l-3.11 3.109a1 1 0 0 0 0 1.415c.396.38 1.021.38 1.416 0l3.109-3.11a.252.252 0 0 1 .354 0l3.11 3.11a1 1 0 0 0 1.373-.041z",
  fill: "currentColor"
}, null, -1), J2 = [
  Z2
];
function en(e, t) {
  return y(), w("svg", Y2, J2);
}
const tn = { render: en }, nn = {
  width: "40",
  height: "49",
  viewBox: "0 0 40 49",
  xmlns: "http://www.w3.org/2000/svg"
}, an = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M35.73 7.25c0 .48.34.9.82 1a4.08 4.08 0 0 1 3.26 4v32.67A4.08 4.08 0 0 1 35.73 49H6.13A6.13 6.13 0 0 1 0 42.87V6.13A6.13 6.13 0 0 1 6.13 0h25.52a4.08 4.08 0 0 1 4.08 4.08v3.17zm-5.1 31.88A10.23 10.23 0 0 0 20.4 29.6c-5.21 0-9.6 3.9-10.19 9.08a1.02 1.02 0 0 0 1.02 1.13h18.75a.64.64 0 0 0 .64-.68zm-16.38-17.7a6.15 6.15 0 1 1 12.3-.04 6.15 6.15 0 0 1-12.3.05zM6.12 4.09a2.04 2.04 0 0 0 0 4.09h25.01c.29 0 .51-.23.51-.51V4.59a.51.51 0 0 0-.5-.5H6.11z",
  fill: "currentColor"
}, null, -1), on = [
  an
];
function sn(e, t) {
  return y(), w("svg", nn, on);
}
const ln = { render: sn }, rn = {
  width: "35",
  height: "40",
  viewBox: "0 0 35 40",
  xmlns: "http://www.w3.org/2000/svg"
}, cn = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M34.07 6.01L28.95.92c-.6-.59-1.4-.92-2.24-.92H12.33a3.17 3.17 0 0 0-3.16 3.17v5.16h-6A3.17 3.17 0 0 0 0 11.5v25.35A3.17 3.17 0 0 0 3.17 40h19.5a3.17 3.17 0 0 0 3.16-3.16v-5.17h6A3.17 3.17 0 0 0 35 28.5V8.25c0-.84-.33-1.65-.93-2.24zM22.5 35.83c0 .46-.37.84-.83.84H4.17a.83.83 0 0 1-.84-.84V12.5c0-.46.38-.83.84-.83h12.97c.22 0 .43.08.58.23l4.53 4.43c.16.16.25.37.25.6v18.9zm3.75-7.5h4.58c.46 0 .84-.37.84-.83V8.6a.83.83 0 0 0-.25-.6l-4.58-4.47a.83.83 0 0 0-.58-.24l-12.93.04a.83.83 0 0 0-.83.84v3.75c0 .23.19.41.42.41h4.63c.84 0 1.64.33 2.23.93l5.12 5.09c.6.59.93 1.4.93 2.23v11.34c0 .23.19.41.42.41z",
  fill: "currentColor"
}, null, -1), dn = [
  cn
];
function un(e, t) {
  return y(), w("svg", rn, dn);
}
const hn = { render: un }, fn = {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, mn = /* @__PURE__ */ $("path", {
  d: "M2 13L13 2",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), pn = /* @__PURE__ */ $("path", {
  d: "M2 2L13 13",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), vn = [
  mn,
  pn
];
function gn(e, t) {
  return y(), w("svg", fn, vn);
}
const yn = { render: gn }, Mn = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, _n = /* @__PURE__ */ $("path", {
  d: "M15.36 11.38a.83.83 0 0 0-.59-1.42h-3.31a.2.2 0 0 1-.2-.2V1.24a1.25 1.25 0 1 0-2.5 0v8.5c0 .12-.1.2-.22.2H5.23a.83.83 0 0 0-.59 1.43l4.77 4.77c.33.33.86.33 1.18 0l4.77-4.77zM16.02 18.75c0-.69-.55-1.25-1.25-1.25H5.23a1.25 1.25 0 1 0 0 2.5h9.54c.7 0 1.25-.56 1.25-1.25z",
  fill: "currentColor"
}, null, -1), wn = [
  _n
];
function zn(e, t) {
  return y(), w("svg", Mn, wn);
}
const $n = { render: zn }, bn = {
  width: "102",
  height: "102",
  viewBox: "0 0 102 102",
  xmlns: "http://www.w3.org/2000/svg"
}, Sn = /* @__PURE__ */ $("circle", {
  cx: "51",
  cy: "51",
  r: "48",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6"
}, null, -1), Cn = /* @__PURE__ */ $("circle", {
  cx: "35.1485",
  cy: "40.6627",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), An = /* @__PURE__ */ $("circle", {
  cx: "66.8514",
  cy: "40.6622",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), kn = /* @__PURE__ */ $("path", {
  d: "M39 68.9863C39 68.9863 44.8244 68.9863 51.0271 68.9863C57.2298 68.9863 63.0541 68.9863 63.0541 68.9863",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), En = [
  Sn,
  Cn,
  An,
  kn
];
function Tn(e, t) {
  return y(), w("svg", bn, En);
}
const In = { render: Tn }, Ln = {
  width: "102",
  height: "102",
  viewBox: "0 0 102 102",
  xmlns: "http://www.w3.org/2000/svg"
}, xn = /* @__PURE__ */ $("circle", {
  cx: "51",
  cy: "51",
  r: "48",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6"
}, null, -1), Dn = /* @__PURE__ */ $("circle", {
  cx: "35.1485",
  cy: "40.6627",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), Rn = /* @__PURE__ */ $("circle", {
  cx: "66.8514",
  cy: "40.6622",
  r: "4.82432",
  fill: "currentColor"
}, null, -1), Bn = /* @__PURE__ */ $("path", {
  d: "M39.9729 70.9867C39.9729 70.9867 44.7972 68.23 50.9999 68.23C57.2026 68.23 62.027 70.9867 62.027 70.9867",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1), Vn = [
  xn,
  Dn,
  Rn,
  Bn
];
function Pn(e, t) {
  return y(), w("svg", Ln, Vn);
}
const Nn = { render: Pn }, On = {
  width: "25",
  height: "24",
  viewBox: "0 0 25 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Hn = /* @__PURE__ */ $("path", {
  d: "M21.66 9.31l1.26.45a2.37 2.37 0 0 1 0 4.48l-1.27.45a1.37 1.37 0 0 0-.77 1.88l.57 1.22a2.38 2.38 0 0 1-3.16 3.16l-1.22-.57a1.37 1.37 0 0 0-1.88.78l-.45 1.26a2.38 2.38 0 0 1-4.48 0l-.45-1.26a1.37 1.37 0 0 0-1.88-.78l-1.22.57a2.38 2.38 0 0 1-3.16-3.16l.57-1.22a1.37 1.37 0 0 0-.78-1.88l-1.26-.45a2.38 2.38 0 0 1 0-4.48l1.26-.45a1.38 1.38 0 0 0 .78-1.88l-.57-1.21A2.38 2.38 0 0 1 6.7 3.04l1.22.58a1.38 1.38 0 0 0 1.88-.78l.45-1.27a2.38 2.38 0 0 1 4.48 0l.45 1.27a1.37 1.37 0 0 0 1.88.78l1.22-.58a2.38 2.38 0 0 1 3.16 3.17l-.57 1.2a1.37 1.37 0 0 0 .78 1.9zm-13.6 4.53a4.93 4.93 0 0 0 6.28 2.6 4.81 4.81 0 0 0 2.6-6.28 4.87 4.87 0 0 0-6.28-2.6 4.81 4.81 0 0 0-2.6 6.28z",
  fill: "currentColor"
}, null, -1), Fn = [
  Hn
];
function Un(e, t) {
  return y(), w("svg", On, Fn);
}
const jn = { render: Un }, Wn = {
  width: "58",
  height: "49",
  viewBox: "0 0 27 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Gn = /* @__PURE__ */ $("path", {
  d: "M26.6991 10.875L21.0741 1.125C20.6691 0.4275 19.9266 0 19.1241 0H7.87414C7.07164 0 6.32914 0.4275 5.92789 1.125L0.302891 10.875C-0.0983594 11.5725 -0.0983594 12.4275 0.302891 13.125L5.92789 22.875C6.32914 23.5725 7.07164 24 7.87414 24H19.1241C19.9266 24 20.6691 23.5725 21.0704 22.875L26.6954 13.125C27.1004 12.4275 27.1004 11.5725 26.6991 10.875Z",
  fill: "currentColor"
}, null, -1), qn = [
  Gn
];
function Kn(e, t) {
  return y(), w("svg", Wn, qn);
}
const Qn = { render: Kn }, Xn = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
}, Yn = /* @__PURE__ */ $("line", {
  x1: "8",
  y1: "7.83301",
  x2: "8",
  y2: "11.333",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round"
}, null, -1), Zn = /* @__PURE__ */ $("circle", {
  cx: "8",
  cy: "4.75",
  r: "0.5",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": "0.5"
}, null, -1), Jn = /* @__PURE__ */ $("circle", {
  cx: "8",
  cy: "8",
  r: "7.5",
  stroke: "currentColor",
  fill: "none"
}, null, -1), ea = [
  Yn,
  Zn,
  Jn
];
function ta(e, t) {
  return y(), w("svg", Xn, ea);
}
const na = { render: ta }, aa = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
}, oa = /* @__PURE__ */ $("line", {
  x1: "8",
  y1: "7.83301",
  x2: "8",
  y2: "11.333",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-width": "1.5"
}, null, -1), sa = /* @__PURE__ */ $("circle", {
  cx: "8",
  cy: "4.75",
  r: "0.5",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": "1"
}, null, -1), ia = /* @__PURE__ */ $("circle", {
  cx: "8",
  cy: "8",
  r: "7.25",
  stroke: "currentColor",
  "stroke-width": "1.5",
  fill: "none"
}, null, -1), la = [
  oa,
  sa,
  ia
];
function ra(e, t) {
  return y(), w("svg", aa, la);
}
const ca = { render: ra }, da = {
  width: "39",
  height: "39",
  viewBox: "0 0 39 39",
  xmlns: "http://www.w3.org/2000/svg"
}, ua = /* @__PURE__ */ $("g", { fill: "currentColor" }, [
  /* @__PURE__ */ $("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M21.94 14.04a9.1 9.1 0 0 0-2.44-6.18V3.9c0-2.15-1.82-3.9-4.06-3.9a3.98 3.98 0 0 0-4.07 3.9v.81a9.58 9.58 0 0 0-8.83 8.13 9.34 9.34 0 0 0 6.4 10.02v1l-1.39 1.33a.76.76 0 0 0 0 1.1l1.39 1.33v.92l-1.39 1.33c-.32.3-.32.8 0 1.1l1.39 1.33v2.02c0 .2.08.4.23.55l2.44 2.34a.83.83 0 0 0 1.15 0l2.44-2.34a.76.76 0 0 0 .24-.55V22.86a9.42 9.42 0 0 0 6.5-8.82zm-9.75-4.68c.9 0 1.62.7 1.62 1.56a1.6 1.6 0 0 1-1.62 1.56c-.9 0-1.63-.7-1.63-1.56 0-.86.73-1.56 1.63-1.56zm5.69-5.46c0-1.3-1.1-2.34-2.44-2.34A2.39 2.39 0 0 0 13 3.9v3.9h1.63V4.98c1.16.29 2.27.79 3.24 1.46V3.9z"
  }),
  /* @__PURE__ */ $("path", { d: "M36.33 28.12l-8.45-8.11a9.07 9.07 0 0 0-3.45-11.85.84.84 0 0 0-.98.07.76.76 0 0 0-.2.91 11.4 11.4 0 0 1-4.52 14.75.77.77 0 0 0-.34.87c.1.33.42.56.78.56h.01c1.43-.01 2.84-.32 4.13-.92l1.06.9v2c0 .43.36.78.8.78h2.1l.35.35v1.99c0 .43.36.78.8.78h1.83l1.49 1.35c.15.13.35.21.56.21h3.45a.8.8 0 0 0 .81-.78v-3.3c0-.22-.08-.41-.23-.56z" })
], -1), ha = [
  ua
];
function fa(e, t) {
  return y(), w("svg", da, ha);
}
const ma = { render: fa }, pa = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 290 61"
}, va = /* @__PURE__ */ $("path", {
  d: "M145.5,46C137,46,130,39,130,30.5S137,15,145.5,15S161,22,161,30.5S154,46,145.5,46z M145.5,17 c-7.4,0-13.5,6.1-13.5,13.5S138.1,44,145.5,44S159,37.9,159,30.5S152.9,17,145.5,17z",
  fill: "currentColor"
}, null, -1), ga = /* @__PURE__ */ $("path", {
  d: "M285.5,3H107V2c0-1.1-0.9-2-2-2H89c-1.1,0-2,0.9-2,2v1H41V2c0-1.1-0.9-2-2-2H23c-1.1,0-2,0.9-2,2v1H4 C1.8,3,0,4.8,0,7v47c0,2.2,1.8,4,4,4h281.5c2.5,0,4.5-2,4.5-4.5v-46C290,5,288,3,285.5,3z M102,40.9c0,1.1-0.9,2.1-2,2.1H28 c-1.1,0-2-0.9-2-2.1V20.1c0-1.1,0.9-2.1,2-2.1h72c1.1,0,2,0.9,2,2.1V40.9z M288,53.5c0,1.4-1.1,2.5-2.5,2.5h-140 C131.4,56,120,44.6,120,30.5C120,16.4,131.4,5,145.5,5h140c1.4,0,2.5,1.1,2.5,2.5V53.5z",
  fill: "currentColor"
}, null, -1), ya = [
  va,
  ga
];
function Ma(e, t) {
  return y(), w("svg", pa, ya);
}
const _a = { render: Ma }, wa = {
  width: "32",
  height: "47",
  viewBox: "0 0 32 47",
  xmlns: "http://www.w3.org/2000/svg"
}, za = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M29.5 22.512V12.96C29.5 5.802 23.456 0 16 0S2.5 5.802 2.5 12.96v9.552c-4.26 6.43-2.966 14.887 3.041 19.868 6.007 4.982 14.911 4.982 20.918 0 6.008-4.981 7.302-13.438 3.041-19.868zM16 34.56c-2.209 0-4-1.72-4-3.84s1.791-3.84 4-3.84c2.21 0 4 1.72 4 3.84s-1.79 3.84-4 3.84zm8.027-17.653a.952.952 0 0 0 .473-.816V12.96c0-4.507-3.805-8.16-8.5-8.16-4.694 0-8.5 3.653-8.5 8.16v3.131c0 .332.179.641.473.816.294.175.661.192.971.045a16.437 16.437 0 0 1 14.112 0c.31.147.677.13.971-.045z",
  fill: "currentColor"
}, null, -1), $a = [
  za
];
function ba(e, t) {
  return y(), w("svg", wa, $a);
}
const Sa = { render: ba }, Ca = {
  width: "32",
  height: "47",
  viewBox: "0 0 32 47",
  xmlns: "http://www.w3.org/2000/svg"
}, Aa = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M30.5 12.96v9.552c3.93 5.944 3.165 13.69-1.859 18.818-5.024 5.129-13.03 6.337-19.451 2.935-6.421-3.401-9.625-10.548-7.783-17.363C3.248 20.087 9.667 15.336 17 15.36c2.449 0 4.864.545 7.056 1.592.31.147.677.13.971-.045a.952.952 0 0 0 .473-.816V12.96c0-4.507-3.805-8.16-8.5-8.16-4.694 0-8.5 3.653-8.5 8.16 0 1.325-1.12 2.4-2.5 2.4s-2.5-1.074-2.5-2.4C3.5 5.802 9.544 0 17 0s13.5 5.802 13.5 12.96zM13 30.72c0 2.12 1.79 3.84 4 3.84s4-1.72 4-3.84-1.79-3.84-4-3.84-4 1.72-4 3.84z",
  fill: "currentColor"
}, null, -1), ka = [
  Aa
];
function Ea(e, t) {
  return y(), w("svg", Ca, ka);
}
const Ta = { render: Ea }, Ia = {
  width: "54",
  height: "54",
  viewBox: "0 0 54 54",
  xmlns: "http://www.w3.org/2000/svg"
}, La = /* @__PURE__ */ $("path", {
  d: "M26.95 0A27.05 27.05 0 0 0 .21 22.32a1.12 1.12 0 0 0 1.13 1.3h18.72c.62 0 1.12-.5 1.12-1.12v-8.1a2.25 2.25 0 0 1 3.66-1.76l15.75 12.6a2.25 2.25 0 0 1 0 3.52l-15.75 12.6a2.25 2.25 0 0 1-3.66-1.76v-8.1c0-.62-.5-1.12-1.12-1.12H1.35a1.14 1.14 0 0 0-1.13 1.3 27 27 0 0 0 53.55-5.78A27.25 27.25 0 0 0 26.95 0z",
  fill: "currentColor"
}, null, -1), xa = [
  La
];
function Da(e, t) {
  return y(), w("svg", Ia, xa);
}
const Ra = { render: Da }, Ba = {
  width: "7",
  height: "30",
  viewBox: "0 0 7 30",
  xmlns: "http://www.w3.org/2000/svg"
}, Va = /* @__PURE__ */ $("g", { fill: "currentColor" }, [
  /* @__PURE__ */ $("circle", {
    cx: "3.5",
    cy: "3",
    r: "3"
  }),
  /* @__PURE__ */ $("circle", {
    cx: "3.5",
    cy: "15",
    r: "3"
  }),
  /* @__PURE__ */ $("circle", {
    cx: "3.5",
    cy: "27",
    r: "3"
  })
], -1), Pa = [
  Va
];
function Na(e, t) {
  return y(), w("svg", Ba, Pa);
}
const Oa = { render: Na }, Ha = {
  width: "54",
  height: "54",
  viewBox: "0 0 54 54",
  xmlns: "http://www.w3.org/2000/svg"
}, Fa = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M27 54a27 27 0 1 0 0-54 27 27 0 0 0 0 54zm2.5-40c.6 0 1 .4 1 1v8.5H39c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-8.5V39c0 .6-.4 1-1 1h-5a1 1 0 0 1-1-1v-8.5H15a1 1 0 0 1-1-1v-5c0-.6.4-1 1-1h8.5V15c0-.6.4-1 1-1h5z",
  fill: "currentColor"
}, null, -1), Ua = [
  Fa
];
function ja(e, t) {
  return y(), w("svg", Ha, Ua);
}
const Wa = { render: ja }, Ga = {
  width: "99",
  height: "99",
  viewBox: "0 0 99 99",
  xmlns: "http://www.w3.org/2000/svg"
}, qa = /* @__PURE__ */ f1('<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M28.9 33H4A4.1 4.1 0 0 1 0 28.9V4A4.1 4.1 0 0 1 4.1 0H29A4.1 4.1 0 0 1 33 4.1V29a4.1 4.1 0 0 1-4.1 4.1zM9.3 8.2a1 1 0 0 0-1 1v14.5c0 .6.4 1 1 1h14.4c.6 0 1-.4 1-1V9.3c0-.6-.4-1-1-1H9.3zM4 66H29a4.1 4.1 0 0 1 4.1 4.1V95a4.1 4.1 0 0 1-4.1 4.1H4A4.1 4.1 0 0 1 0 94.9V70A4.1 4.1 0 0 1 4.1 66zm19.6 24.8c.6 0 1-.5 1-1V75.2c0-.6-.4-1-1-1H9.3a1 1 0 0 0-1 1v14.4c0 .6.4 1 1 1h14.4zM70.1 0H95A4.1 4.1 0 0 1 99 4.1V29a4.1 4.1 0 0 1-4.1 4.1H70a4.1 4.1 0 0 1-4.1-4.1V4A4.1 4.1 0 0 1 70.1 0zm19.6 24.8c.6 0 1-.5 1-1V9.2c0-.6-.4-1-1-1H75.3a1 1 0 0 0-1 1v14.4c0 .6.4 1 1 1h14.4z"></path><path d="M41.3 17.5h4a3 3 0 1 0 0-6.2 1 1 0 0 1-1-1V4.1a3 3 0 0 0-6.1 0v10.3a3 3 0 0 0 3 3.1zM53.5 7.2c.6 0 1 .5 1 1V31a3 3 0 0 0 6.2 0V4.1a3 3 0 0 0-3-3h-4.2a3 3 0 0 0 0 6.1zM23.7 43.3a3 3 0 0 0 3.1 3.1h14.4a3 3 0 0 0 3.1-3V26.7a3 3 0 0 0-6.1 0v12.4c0 .6-.5 1-1 1H26.7a3 3 0 0 0-3 3.1z"></path><path d="M12.4 40.2a3 3 0 0 0-3.1 3.1v10.3c0 .6-.5 1-1 1H4a3 3 0 0 0 0 6.2h53.6a3 3 0 0 0 3.1-3V45.4a3 3 0 0 0-6.1 0v8.2c0 .6-.5 1-1 1H16.4a1 1 0 0 1-1-1V43.3a3 3 0 0 0-3.1-3zm44.3 30a3 3 0 0 0-3-3.2H41.1a3 3 0 0 0-3 3.1v16.5a3 3 0 0 0 6.1 0V74.3c0-.6.5-1 1-1h8.3a3 3 0 0 0 3.1-3.2zM95 91.7h-35a1 1 0 0 1-1.1-1v-8.3a3 3 0 1 0-6.2 0v12.4a3 3 0 0 0 3 3H95a3 3 0 0 0 0-6.1z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M80.4 83.5H68.1a3 3 0 0 1-3.1-3V68a3 3 0 0 1 3-3.1h12.4a3 3 0 0 1 3.1 3v12.4a3 3 0 0 1-3 3.1zm-8.2-12.3a1 1 0 0 0-1 1v4.1c0 .6.4 1 1 1h4.1c.6 0 1-.4 1-1v-4.1c0-.6-.4-1-1-1h-4.1z"></path><path d="M92.8 52.6a3 3 0 0 0-3 3v26.9a3 3 0 0 0 6.1 0V55.7a3 3 0 0 0-3-3.1zM96 41.2a3 3 0 0 0-3-3H70a3 3 0 0 0-3 3v12.4a3 3 0 0 0 6.1 0v-8.2c0-.6.5-1 1-1h18.6a3 3 0 0 0 3.1-3.1z"></path></g>', 1), Ka = [
  qa
];
function Qa(e, t) {
  return y(), w("svg", Ga, Ka);
}
const Xa = { render: Qa }, Ya = {
  width: "16",
  height: "26",
  viewBox: "0 0 16 26",
  xmlns: "http://www.w3.org/2000/svg"
}, Za = /* @__PURE__ */ $("path", {
  d: "M7.98 25a2.62 2.62 0 1 1 0-5.24 2.62 2.62 0 0 1 0 5.24zM10.78 14.38c-.64.28-1.05.91-1.05 1.6a1.75 1.75 0 0 1-3.5 0 5.24 5.24 0 0 1 3.15-4.8 3.5 3.5 0 1 0-4.89-3.2 1.75 1.75 0 0 1-3.49 0 6.98 6.98 0 1 1 9.78 6.4z",
  fill: "currentColor"
}, null, -1), Ja = [
  Za
];
function eo(e, t) {
  return y(), w("svg", Ya, Ja);
}
const to = { render: eo }, no = {
  width: "40",
  height: "40",
  viewBox: "0 0 40 40",
  xmlns: "http://www.w3.org/2000/svg"
}, ao = /* @__PURE__ */ f1('<g fill="currentColor"><path d="M1.21 7.06c.67 0 1.21-.54 1.21-1.21l-.04-3.12a.3.3 0 0 1 .3-.3H5.7a1.21 1.21 0 1 0 0-2.43H2.37A2.4 2.4 0 0 0 0 2.42v3.43c0 .67.54 1.21 1.21 1.21zM5.69 37.58H2.73a.3.3 0 0 1-.3-.3v-3.13a1.21 1.21 0 1 0-2.43 0v3.43A2.4 2.4 0 0 0 2.37 40H5.7a1.21 1.21 0 0 0 0-2.42zM38.79 32.94c-.67 0-1.21.54-1.21 1.21l.04 3.12a.3.3 0 0 1-.3.3H34.3a1.21 1.21 0 1 0 0 2.43h3.32A2.4 2.4 0 0 0 40 37.58v-3.43c0-.67-.54-1.21-1.21-1.21zM37.63 0H34.3a1.21 1.21 0 1 0 0 2.42h2.96c.17 0 .3.14.3.3v3.13a1.21 1.21 0 0 0 2.43 0V2.42A2.4 2.4 0 0 0 37.63 0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.94 15.15H6.67c-.67 0-1.22-.54-1.22-1.21V6.67c0-.67.55-1.21 1.22-1.21h7.27c.67 0 1.21.54 1.21 1.2v7.28c0 .67-.54 1.21-1.21 1.21zM8.18 7.88a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24a.3.3 0 0 0 .3-.3V8.18a.3.3 0 0 0-.3-.3H8.18zM6.67 24.85h7.27c.67 0 1.21.54 1.21 1.21v7.27c0 .67-.54 1.22-1.21 1.22H6.67c-.67 0-1.22-.55-1.22-1.22v-7.27c0-.67.55-1.21 1.22-1.21zm5.75 7.27a.3.3 0 0 0 .3-.3v-4.24a.3.3 0 0 0-.3-.3H8.18a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24zM26.06 5.45h7.27c.67 0 1.21.55 1.21 1.22v7.27c0 .67-.54 1.21-1.2 1.21h-7.28c-.67 0-1.21-.54-1.21-1.21V6.67c0-.67.54-1.22 1.21-1.22zm5.76 7.28a.3.3 0 0 0 .3-.3V8.17a.3.3 0 0 0-.3-.3h-4.24a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24z"></path><path d="M17.58 10.6h1.2a.9.9 0 1 0 0-1.81.3.3 0 0 1-.3-.3V6.66a.9.9 0 1 0-1.81 0V9.7c0 .5.4.9.9.9zM21.21 7.58c.17 0 .3.13.3.3v6.66a.9.9 0 1 0 1.82 0V6.67c0-.5-.4-.91-.9-.91H21.2a.9.9 0 1 0 0 1.82zM12.42 18.18c0 .5.41.91.91.91h4.25c.5 0 .9-.4.9-.9v-4.86a.9.9 0 1 0-1.81 0v3.64a.3.3 0 0 1-.3.3h-3.04c-.5 0-.9.4-.9.91z"></path><path d="M9.09 17.27c-.5 0-.9.4-.9.91v3.03a.3.3 0 0 1-.31.3H6.67a.9.9 0 1 0 0 1.82h15.75c.5 0 .91-.4.91-.9v-3.64a.9.9 0 0 0-1.82 0v2.42a.3.3 0 0 1-.3.3h-10.9a.3.3 0 0 1-.31-.3v-3.03c0-.5-.4-.9-.91-.9zM22.12 26.06c0-.5-.4-.9-.9-.9h-3.64c-.5 0-.91.4-.91.9v4.85a.9.9 0 1 0 1.81 0v-3.64c0-.16.14-.3.3-.3h2.43c.5 0 .91-.4.91-.9zM33.33 32.42h-10.3a.3.3 0 0 1-.3-.3V29.7a.9.9 0 1 0-1.82 0v3.63c0 .5.4.91.9.91h11.52a.9.9 0 0 0 0-1.82z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M29.1 30h-3.65a.9.9 0 0 1-.9-.91v-3.64c0-.5.4-.9.9-.9h3.64c.5 0 .91.4.91.9v3.64c0 .5-.4.91-.9.91zm-2.43-3.64a.3.3 0 0 0-.3.3v1.22c0 .17.13.3.3.3h1.2a.3.3 0 0 0 .31-.3v-1.21a.3.3 0 0 0-.3-.3h-1.21z"></path><path d="M32.73 20.9c-.5 0-.91.42-.91.92v7.88a.9.9 0 0 0 1.82 0v-7.88c0-.5-.41-.91-.91-.91zM33.64 17.58c0-.5-.41-.91-.91-.91h-6.67c-.5 0-.9.4-.9.9v3.64a.9.9 0 0 0 1.8 0V18.8c0-.17.15-.3.31-.3h5.46c.5 0 .9-.41.9-.91z"></path></g>', 1), oo = [
  ao
];
function so(e, t) {
  return y(), w("svg", no, oo);
}
const io = { render: so }, lo = {
  width: "30",
  height: "28",
  viewBox: "0 0 30 28",
  xmlns: "http://www.w3.org/2000/svg"
}, ro = /* @__PURE__ */ $("path", {
  d: "M27.634 15.68H9.544a1.428 1.428 0 0 1 0-2.856h18.09a1.428 1.428 0 0 1 0 2.857zM29.064 25.676c0 .789-.639 1.428-1.428 1.428h-8.569a1.428 1.428 0 0 1 0-2.856h8.57a1.428 1.428 0 0 1 1.427 1.43v-.002zM13.482 27.996a2.856 2.856 0 1 1-.282-5.705 2.856 2.856 0 0 1 .283 5.705zM1.922 24.248h4.76a1.428 1.428 0 0 1 0 2.856h-4.76a1.428 1.428 0 1 1 0-2.856zM.004 13.776a2.856 2.856 0 1 1 5.705.285 2.856 2.856 0 0 1-5.705-.285zM6.691 3.778H1.455a1.428 1.428 0 0 1 0-2.856H6.69a1.428 1.428 0 0 1 0 2.856zM13.177.004a2.856 2.856 0 1 1 .283 5.705 2.856 2.856 0 0 1-.283-5.705zM27.63 4.25h-7.616a1.428 1.428 0 0 1 0-2.855h7.617a1.428 1.428 0 0 1 0 2.856z",
  fill: "currentColor"
}, null, -1), co = [
  ro
];
function uo(e, t) {
  return y(), w("svg", lo, co);
}
const ho = { render: uo }, fo = {
  width: "98",
  height: "123",
  viewBox: "0 0 98 123",
  xmlns: "http://www.w3.org/2000/svg"
}, mo = /* @__PURE__ */ $("path", {
  d: "M85.7 42.3l8-8a5.1 5.1 0 1 0-7.3-7.2l-8.2 8.2c-7-5.2-15.4-8.5-24-9.4V10.3h10.2a5.1 5.1 0 0 0 0-10.3H33.6a5.1 5.1 0 0 0 0 10.3H44v15.6a48.7 48.7 0 1 0 41.8 16.4zM49 112.8a38.4 38.4 0 1 1 0-77 38.4 38.4 0 0 1 0 77z M54.2 48.6a5.1 5.1 0 0 0-10.3 0V74a5.2 5.2 0 0 0 5.2 5.1 5.1 5.1 0 0 0 5-5V48.5z",
  fill: "currentColor"
}, null, -1), po = [
  mo
];
function vo(e, t) {
  return y(), w("svg", fo, po);
}
const go = { render: vo }, yo = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, Mo = /* @__PURE__ */ $("path", {
  d: "M10.01 14.82a1 1 0 0 0 1.37-.37l3.37-5.83a.17.17 0 0 1 .22-.06l.73.41a.67.67 0 0 0 1-.58l-.07-3.89a.67.67 0 0 0-.99-.57l-3.4 1.89a.67.67 0 0 0 0 1.15l.71.42c.08.05.11.15.06.23l-3.37 5.83a1 1 0 0 0 .37 1.37zM8.23 5.19l-3.55 5.76a.17.17 0 0 1-.23.06l-.55-.32a.67.67 0 0 0-1 .59l.07 3.89a.67.67 0 0 0 .99.57l3.4-1.89a.67.67 0 0 0 0-1.16l-.89-.51a.17.17 0 0 1-.07-.1.16.16 0 0 1 .02-.13l3.52-5.72a1 1 0 1 0-1.7-1.05z",
  fill: "currentColor"
}, null, -1), _o = [
  Mo
];
function wo(e, t) {
  return y(), w("svg", yo, _o);
}
const zo = { render: wo }, $o = {
  width: "150",
  height: "149",
  viewBox: "0 0 150 149",
  xmlns: "http://www.w3.org/2000/svg"
}, bo = /* @__PURE__ */ $("path", {
  d: "M81 103a26 26 0 100-52 26 26 0 000 52zM3 97h15c1 0 2 1 2 3v35c0 2-1 3-2 3H3c-2 0-3-1-3-3v-35c0-2 1-3 3-3zm60 17h-1c-5-7-13-11-21-11H28l-2 1v30l1 1c26 9 37 14 47 14 11 0 21-7 54-24 3-1 4-5 2-8-1-2-3-3-6-3l-5 1-19 6-1 1c-1 6-6 10-12 10H64c-2 0-3-1-3-3s1-3 3-3h23c3 0 6-3 6-6s-3-6-6-6H63zm61-61.8h-.3a24 24 0 01-6.4-1c-1.6-.3-2.5-2-2-3.5.3-1.5 2-2.4 3.5-2 1.6.5 3.3.6 5 .7h.2a22 22 0 005-.6c1.6-.5 3.2.5 3.6 2a3 3 0 01-2.1 3.6 31 31 0 01-6.5.8zm15.8-6.3a3 3 0 01-2-5 21 21 0 003.2-4 3 3 0 014-.9 3 3 0 01.9 4 23 23 0 01-4.2 5c-.5.6-1.2.9-2 .9zm-31.9-.2c-.7 0-1.4-.3-2-.8a28 28 0 01-4.1-5 3 3 0 011-4 3 3 0 014 .8c.8 1.5 2 2.8 3.1 4a3 3 0 01.2 4.1 3 3 0 01-2.2.9zM147 30.5h-.2a2.9 2.9 0 01-2.7-3.1V26c0-1.3 0-2.6-.3-3.8a2.9 2.9 0 015.7-1c.3 1.5.5 3.2.5 4.8v1.7a3 3 0 01-3 2.7zm-46.2-.3a3 3 0 01-2.9-2.7V26c0-1.7.1-3.4.4-5a3 3 0 013.4-2.3 3 3 0 012.4 3.4c-.3 1.3-.4 2.6-.4 4v1a3 3 0 01-2.8 3.1zm41-16a3 3 0 01-2.3-1 20.7 20.7 0 00-3.6-3.5 3 3 0 01-.7-4 3 3 0 014.1-.7c1.7 1.3 3.3 2.8 4.7 4.5 1 1.2.9 3-.4 4-.5.6-1.1.7-1.8.7zm-35.6-.1c-.7 0-1.4-.3-1.9-.7a2.9 2.9 0 01-.3-4.1c1.3-1.7 3-3.1 4.7-4.4a3 3 0 014 .6 3 3 0 01-.5 4 21 21 0 00-3.8 3.5 3 3 0 01-2.2 1zM126.9 6h-.4c-1.7-.2-3.4-.2-5 0a3 3 0 11-.7-5.8c2.1-.3 4.3-.3 6.5 0a3 3 0 012.5 3.2 2.8 2.8 0 01-2.9 2.6z",
  fill: "currentColor"
}, null, -1), So = [
  bo
];
function Co(e, t) {
  return y(), w("svg", $o, So);
}
const Ao = { render: Co }, ko = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Eo = /* @__PURE__ */ $("g", { fill: "currentColor" }, [
  /* @__PURE__ */ $("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M18.9 6.95c1.59 1 3.03 2.21 4.3 3.6.74.82.74 2.07 0 2.9-2.56 2.81-6.79 5.8-11.04 5.8h-.3a11.26 11.26 0 0 1-4.31-.94L3.4 22.45a1 1 0 0 1-1.63-1.08l.01-.01.01-.01 19.5-19.5a.74.74 0 0 0 .18-.3l.02-.01a1 1 0 1 1 1.41 1.41l-4 4zm-5.59 9.35a4.58 4.58 0 0 0 3-3.03 4.3 4.3 0 0 0-.2-3.06.25.25 0 0 0-.4-.07l-5.57 5.56a.25.25 0 0 0 .07.4 4.3 4.3 0 0 0 3.1.2z"
  }),
  /* @__PURE__ */ $("path", { d: "M7.62 13.4a.24.24 0 0 0 .06-.24A4.32 4.32 0 0 1 7.5 12a4.5 4.5 0 0 1 5.66-4.33c.09.03.18 0 .24-.06l1.94-1.94a.25.25 0 0 0-.1-.42c-1.05-.34-2.14-.5-3.24-.5C7.7 4.69 3.4 7.7.81 10.55a2.15 2.15 0 0 0 0 2.9 21.21 21.21 0 0 0 3.43 3.03c.1.07.24.06.33-.03l3.05-3.05z" })
], -1), To = [
  Eo
];
function Io(e, t) {
  return y(), w("svg", ko, To);
}
const Lo = { render: Io }, xo = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Do = /* @__PURE__ */ $("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12 4.6c4.4-.06 8.79 3.01 11.43 5.92.75.84.75 2.11 0 2.95-2.61 2.88-6.94 5.93-11.28 5.93h-.31c-4.33 0-8.66-3.05-11.27-5.93a2.21 2.21 0 0 1 0-2.95C3.2 7.62 7.6 4.54 12 4.6zm0 2.8a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2z",
  fill: "currentColor"
}, null, -1), Ro = /* @__PURE__ */ $("path", {
  d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  fill: "currentColor"
}, null, -1), Bo = [
  Do,
  Ro
];
function Vo(e, t) {
  return y(), w("svg", xo, Bo);
}
const Po = { render: Vo }, R = (e) => U({
  functional: !0,
  render: () => de(e, Object.assign({ class: "nq-icon" }))
}), Me = R(Xt), Ii = R(n2), No = R(r2), Oo = R(m2), Li = R(_2), Ho = R(S2), xi = R(T2), Di = R(R2), Ri = R(O2), Bi = R(W2), Vi = R(X2), Fo = R(tn), Pi = R(ln), Ni = R(hn), Oi = R(yn), Hi = R($n), Fi = R(In), Ui = R(Nn), ji = R(jn), Wi = R(Qn), Gi = R(na), qi = R(ca), Ki = R(ma), Qi = R(_a), Xi = R(Sa), Yi = R(Ta), Zi = R(Ra), Ji = R(Oa), el = R(Wa), tl = R(Xa), nl = R(to), al = R(io), ol = R(ho), sl = R(go), il = R(zo), ll = R(Ao), rl = R(Lo), cl = R(Po), Uo = U({
  name: "CloseButton",
  components: {
    CloseIcon: Fo
  }
});
function jo(e, t, n, o, a, i) {
  const s = O("CloseIcon");
  return y(), w("button", {
    class: "close-button nq-button-s",
    onMousedown: t[0] || (t[0] = o1(() => {
    }, ["prevent"]))
  }, [
    j(s)
  ], 32);
}
const _e = /* @__PURE__ */ F(Uo, [["render", jo], ["__scopeId", "data-v-04d3da97"]]);
var we = /* @__PURE__ */ ((e) => (e.CLOSE = "close", e.CHANGED = "changed", e))(we || {});
const Wo = U({
  name: "AccountDetails",
  emits: Object.values(we),
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
  setup: (e, t) => {
    const n = S(null);
    function o() {
      n.value && n.value.focus();
    }
    function a(s) {
      t.emit("changed", s);
    }
    function i() {
      t.emit("close");
    }
    return t.expose({ focus: o }), {
      account$: n,
      onChanged: a,
      onClose: i
    };
  },
  components: {
    Account: Q1,
    Amount: E1,
    AddressDisplay: Wt,
    CloseButton: _e
  }
});
const Go = { class: "account-details" };
function qo(e, t, n, o, a, i) {
  const s = O("CloseButton"), l = O("Account"), r = O("AddressDisplay");
  return y(), w("div", Go, [
    j(s, {
      class: "top-right",
      onClick: e.onClose
    }, null, 8, ["onClick"]),
    j(l, {
      ref: "account$",
      layout: "column",
      address: e.address,
      image: e.image,
      label: e.label && e.label !== e.address ? e.label : "",
      walletLabel: e.walletLabel,
      balance: e.balance,
      editable: e.editable,
      placeholder: e.placeholder,
      onChanged: e.onChanged
    }, null, 8, ["address", "image", "label", "walletLabel", "balance", "editable", "placeholder", "onChanged"]),
    j(r, {
      address: e.address,
      copyable: ""
    }, null, 8, ["address"])
  ]);
}
const dl = /* @__PURE__ */ F(Wo, [["render", qo], ["__scopeId", "data-v-3f00a98b"]]);
var B1 = /* @__PURE__ */ ((e) => (e.TOP = "top", e.BOTTOM = "bottom", e))(B1 || {}), V1 = /* @__PURE__ */ ((e) => (e.LEFT = "left", e.RIGHT = "right", e))(V1 || {}), M1 = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e))(M1 || {});
const Ko = U({
  name: "Tooltip",
  props: {
    container: HTMLElement,
    disabled: Boolean,
    noFocus: Boolean,
    preferredPosition: {
      type: String,
      default: "top right",
      validator: (e) => {
        if (typeof e != "string")
          return !1;
        const [t, n] = e.split(" ");
        return Object.values(B1).includes(t) && (!n || Object.values(V1).includes(n));
      }
    },
    margin: {
      type: Object,
      validator: (e) => typeof e == "object" && Object.entries(e).every(([t, n]) => typeof n == "number" && (Object.values(B1).includes(t) || Object.values(V1).includes(t)))
    },
    autoWidth: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "normal",
      validator: (e) => Object.values(M1).includes(e)
    },
    styles: Object
  },
  setup(e, t) {
    const n = S(null), o = S(null), a = S(null), i = S(null), s = S(!1), l = S(!1), r = S(!1), d = S(null), p = S(-1), u = S(0), c = S(0), v = S(0), g = S(0), f = S(0), b = P(() => (s.value || r.value) && !e.disabled), C = P(() => ({
      ...e.styles,
      top: f.value + "px",
      left: g.value + "px",
      width: e.container && e.autoWidth ? c.value + "px" : (e.styles || {}).width,
      maxWidth: e.container ? v.value + "px" : (e.styles || {}).maxWidth
    }));
    n1(() => {
      "icon" in t.slots && console.warn("Tooltip: Slot `icon` is deprecated and support will be removed in the future. Use slot `trigger` instead."), e.container && A(e.container);
    }), c1(() => {
      e.container && e.container.removeEventListener("scroll", _);
    });
    function z() {
      s.value = !0;
    }
    function M(L = !1) {
      s.value = !1, n.value && n.value.blur(), L && (r.value = !1);
    }
    function m(L = !1) {
      s.value || r.value ? M(L) : z();
    }
    B(b, h);
    async function h(L) {
      if (b.value)
        L === !0 && (p.value = Date.now(), t.emit("show"));
      else {
        l.value = !1, L === !1 && (p.value = Date.now(), t.emit("hide"));
        return;
      }
      e.container && await new Promise((N) => requestAnimationFrame(() => {
        if (!e.container)
          return;
        const G = k("left") || 0, Q = k("right") || 0;
        v.value = e.container.offsetWidth - G - Q, e.autoWidth && (c.value = v.value), N(null);
      })), await a1(), !(!b.value || !o.value) && (u.value = o.value.offsetHeight, c.value = o.value.offsetWidth, _(), await a1(), await new Promise((N) => requestAnimationFrame(N)), l.value = !0);
    }
    B(() => e.preferredPosition, _);
    function _() {
      if (!b.value || !n.value)
        return;
      let [L, N] = e.preferredPosition.split(" ");
      if (N = N || "right", g.value = Math.round(N === "right" ? n.value.offsetWidth / 2 - 25 : n.value.offsetWidth / 2 - c.value + 25), e.container) {
        const G = n.value.getBoundingClientRect(), Q = e.container.getBoundingClientRect(), e1 = k("top") || 0, b1 = k("bottom") || 0, s1 = u.value + 16, m1 = G.top - Q.top - e1 >= s1, S1 = Q.bottom - G.bottom - b1 >= s1;
        L === "top" && (m1 || !S1) || L === "bottom" && m1 && !S1 ? i.value = "top" : i.value = "bottom";
        const Ue = k("left") || 0, je = k("right") || 0, We = Q.left + Ue - G.left, Ge = Q.right - je - G.left;
        g.value = Math.max(
          We,
          Math.min(
            Ge - c.value,
            g.value
          )
        );
      } else
        i.value = L;
      f.value = i.value === "bottom" ? n.value.offsetHeight : -u.value;
    }
    B(() => e.container, A);
    async function A(L, N) {
      N && N.removeEventListener("scroll", _), L && await new Promise((G) => requestAnimationFrame(() => {
        L.scrollHeight !== L.offsetHeight && L.addEventListener("scroll", _), G(null);
      })), await h();
    }
    function k(L) {
      if (e.margin && e.margin[L] !== void 0)
        return e.margin[L];
      const N = e.container || null;
      return !N || (L === "top" || L === "bottom") && N.scrollHeight !== N.offsetHeight ? 0 : parseInt(window.getComputedStyle(N, null).getPropertyValue(`padding-${L}`), 10);
    }
    function T(L) {
      L ? (d.value && window.clearTimeout(d.value), r.value = !0) : d.value = window.setTimeout(
        () => r.value = !1,
        100
      );
    }
    function E() {
      Date.now() - p.value < 200 || (m(!0), t.emit("click"));
    }
    return t.expose({ show: z, hide: M, toggle: m, update: h }), {
      TooltipThemes: M1,
      tooltipTrigger$: n,
      tooltipBox$: o,
      root$: a,
      verticalPosition: i,
      transitionPosition: l,
      isShown: b,
      tooltipBoxStyles: C,
      show: z,
      hide: M,
      mouseOver: T,
      onClick: E
    };
  },
  components: { AlertTriangleIcon: Me }
});
const Qo = ["tabindex"];
function Xo(e, t, n, o, a, i) {
  const s = O("AlertTriangleIcon");
  return y(), w("span", {
    class: V(["tooltip", [e.verticalPosition, {
      shown: e.isShown,
      "transition-position": e.transitionPosition,
      "inverse-theme": e.theme === e.TooltipThemes.INVERSE
    }]]),
    ref: "root$",
    onMouseenter: t[3] || (t[3] = (l) => e.mouseOver(!0)),
    onMouseleave: t[4] || (t[4] = (l) => e.mouseOver(!1))
  }, [
    $("a", {
      href: "javascript:void(0);",
      ref: "tooltipTrigger$",
      onFocus: t[0] || (t[0] = o1((l) => e.show(), ["stop"])),
      onBlur: t[1] || (t[1] = o1((l) => e.hide(), ["stop"])),
      onClick: t[2] || (t[2] = (l) => e.onClick()),
      tabindex: e.disabled || e.noFocus ? -1 : 0,
      class: "trigger"
    }, [
      e.$slots.icon ? H("", !0) : Y(e.$slots, "trigger", { key: 0 }, () => [
        j(s, { class: "nq-orange" })
      ], !0),
      e.$slots.icon && !e.$slots.trigger ? Y(e.$slots, "icon", { key: 1 }, void 0, !0) : H("", !0)
    ], 40, Qo),
    j(W1, { name: "transition-fade" }, {
      default: K(() => [
        e.isShown ? (y(), w("div", {
          key: 0,
          ref: "tooltipBox$",
          class: "tooltip-box",
          style: z1(e.tooltipBoxStyles)
        }, [
          Y(e.$slots, "default", {}, void 0, !0)
        ], 4)) : H("", !0)
      ]),
      _: 3
    })
  ], 34);
}
const T1 = /* @__PURE__ */ F(Ko, [["render", Xo], ["__scopeId", "data-v-0ca9be35"]]);
var ze = /* @__PURE__ */ ((e) => (e.ACCOUNT_SELECTED = "account-selected", e.ACCOUNT_CHANGED = "account-changed", e))(ze || {});
const Yo = U({
  name: "AccountList",
  emits: Object.values(ze),
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
  methods: { $t: J("AccountList") },
  setup: (e, t) => {
    const n = S(null), o = S(-1), a = S({}), i = S({});
    ue(() => {
      a.value = {}, i.value = {};
    });
    function s(f) {
      e.editable && a.value.hasOwnProperty(f) && a.value[f].focus();
    }
    function l(f) {
      if (e.disabled || e.editable)
        return;
      window.clearTimeout(o.value), f.userFriendlyAddress !== n.value && g();
      const b = p(f), C = u(f);
      if (b || C || c(f)) {
        n.value = f.userFriendlyAddress, i.value[`tooltip-${n.value}`] && i.value[`tooltip-${n.value}`].show();
        const z = b || C ? 2e3 : 300;
        o.value = window.setTimeout(() => g(), z);
      } else
        t.emit("account-selected", f.walletId || e.walletId, f.userFriendlyAddress);
    }
    function r(f, b) {
      t.emit("account-changed", f, b);
    }
    function d(f) {
      return e.disabled || !e.editable && (p(f) || u(f) || c(f));
    }
    function p(f) {
      return e.disableContracts && !("path" in f && f.path);
    }
    function u(f) {
      return e.disabledAddresses.includes(f.userFriendlyAddress);
    }
    function c(f) {
      return e.minBalance && (f.balance || 0) < e.minBalance;
    }
    function v(f) {
      return !e.disabled && !e.editable && (p(f) || u(f));
    }
    function g() {
      !n.value || (i.value[`tooltip-${n.value}`] && i.value[`tooltip-${n.value}`].hide(!1), n.value = null);
    }
    return t.expose({ focus: s }), {
      highlightedDisabledAddress: n,
      highlightedDisabledAddressTimeout: o,
      accounts$: a,
      tooltips$: i,
      focus: s,
      accountSelected: l,
      onAccountChanged: r,
      isDisabled: d,
      isDisabledContract: p,
      isDisabledAccount: u,
      hasInsufficientBalance: c,
      hasTooltip: v,
      clearHighlightedDisabledAddress: g
    };
  },
  components: {
    Account: Q1,
    CaretRightSmallIcon: Ho,
    Tooltip: T1
  }
});
const Zo = { class: "account-list" };
function Jo(e, t, n, o, a, i) {
  const s = O("Account"), l = O("CaretRightSmallIcon"), r = O("Tooltip");
  return y(), w("div", Zo, [
    (y(!0), w(Z, null, t1(e.accounts, (d) => (y(), q(ce(!e.isDisabled(d) && !e.editable ? "a" : "div"), {
      href: "javascript:void(0)",
      class: V(["account-entry", {
        disabled: e.isDisabled(d),
        "has-tooltip": e.hasTooltip(d),
        "highlight-insufficient-balance": e.highlightedDisabledAddress === d.userFriendlyAddress && e.hasInsufficientBalance(d) && !e.isDisabledContract(d) && !e.isDisabledAccount(d)
      }]),
      onClick: (p) => e.accountSelected(d),
      key: d.userFriendlyAddress
    }, {
      default: K(() => [
        j(s, {
          ref_for: !0,
          ref: (p) => e.accounts$[d.userFriendlyAddress] = p,
          address: d.userFriendlyAddress,
          label: d.label,
          placeholder: "",
          balance: e.minBalance ? d.balance : void 0,
          decimals: e.decimals,
          editable: e.editable && !e.disabled,
          onChanged: (p) => e.onAccountChanged(d.userFriendlyAddress, p)
        }, null, 8, ["address", "label", "placeholder", "balance", "decimals", "editable", "onChanged"]),
        e.isDisabled(d) ? H("", !0) : (y(), q(l, {
          key: 0,
          class: "caret"
        })),
        e.hasTooltip(d) ? (y(), q(r, he({
          key: 1,
          ref_for: !0,
          ref: (p) => e.tooltips$[`tooltip-${d.userFriendlyAddress}`] = p
        }, {
          preferredPosition: "bottom left",
          ...e.tooltipProps,
          styles: {
            width: "22.25rem",
            pointerEvents: "none",
            ...e.tooltipProps ? e.tooltipProps.styles : void 0
          }
        }, {
          onClick: t[0] || (t[0] = o1(() => {
          }, ["stop"]))
        }), {
          default: K(() => [
            X(x(e.isDisabledContract(d) ? e.$t("Contracts cannot be used for this operation.") : e.$t("This address cannot be used for this operation.")), 1)
          ]),
          _: 2
        }, 1040)) : H("", !0)
      ]),
      _: 2
    }, 1032, ["class", "onClick"]))), 128))
  ]);
}
const es = /* @__PURE__ */ F(Yo, [["render", Jo], ["__scopeId", "data-v-646ef48d"]]), ts = U({
  name: "AccountRing",
  components: { Identicon: fe },
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
const ns = { class: "account-ring" };
function as(e, t, n, o, a, i) {
  const s = O("Identicon");
  return y(), w("div", ns, [
    (y(), w(Z, null, t1(6, (l) => $("div", {
      class: "account",
      key: l
    }, [
      j(s, {
        address: e.addresses[l - 1],
        class: V({ "pop-in": e.animate && e.addresses.length >= l })
      }, null, 8, ["address", "class"])
    ])), 64))
  ]);
}
const ul = /* @__PURE__ */ F(ts, [["render", as], ["__scopeId", "data-v-9365ed09"]]);
var $e = /* @__PURE__ */ ((e) => (e.ACCOUNT_SELECTED = "account-selected", e.LOGIN = "login", e))($e || {});
const os = U({
  name: "AccountSelector",
  emits: Object.values($e),
  components: { AccountList: es, Tooltip: T1 },
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
  methods: { $t: J("AccountSelector") },
  setup: (e, t) => {
    const n = S(null), o = S({});
    ue(() => o.value = {});
    const a = S(null), i = S(-1), s = S({
      get container() {
        return n.value;
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
    }), l = P(() => e.wallets.slice(0).sort((f, b) => {
      const C = p(f), z = p(b);
      if (C && !z)
        return 1;
      if (!C && z)
        return -1;
      if (!e.minBalance)
        return 0;
      const M = (_, A) => Array.from(_.values()).some((k) => (k.balance || 0) >= (e.minBalance || 0)) || !e.disableContracts && A.some((k) => (k.balance || 0) >= (e.minBalance || 0)), m = M(f.accounts, f.contracts), h = M(b.accounts, b.contracts);
      return !m && h ? 1 : m && !h ? -1 : 0;
    }));
    function r(f, b) {
      t.emit("account-selected", { walletId: f, address: b });
    }
    function d() {
      t.emit("login");
    }
    function p(f) {
      return e.disableLegacyAccounts && f.type === 1 || e.disableBip39Accounts && f.type === 2 || e.disableLedgerAccounts && f.type === 3;
    }
    function u(f) {
      switch (f.type) {
        case 1:
          return J("AccountSelector")("Legacy");
        case 2:
          return "Keyguard";
        case 3:
          return "Ledger";
        default:
          throw new Error(`Unknown account type ${f.type}`);
      }
    }
    function c(f) {
      window.clearTimeout(i.value);
      const b = o.value[`tooltip-${f.id}`] ? o.value[`tooltip-${f.id}`][0] : null;
      a.value && a.value !== b && a.value.hide(!1), b && (b.show(), i.value = window.setTimeout(() => {
        b.hide(!1), a.value = null;
      }, 2e3)), a.value = b;
    }
    function v(f) {
      return [...f.accounts.values(), ...f.contracts];
    }
    function g(f, b, C, z) {
      return b ? f.sort((M, m) => {
        const h = C && !("path" in M && M.path), _ = C && !("path" in m && m.path);
        if (h && !_)
          return 1;
        if (!h && _)
          return -1;
        const A = z && z.includes(M.userFriendlyAddress), k = z && z.includes(m.userFriendlyAddress);
        return A && !k ? 1 : !A && k ? -1 : (!M.balance || M.balance < b) && m.balance && m.balance >= b ? 1 : (!m.balance || m.balance < b) && M.balance && M.balance >= b ? -1 : 0;
      }) : f;
    }
    return {
      container$: n,
      tooltips$: o,
      tooltipProps: s,
      sortedWallets: l,
      onAccountSelected: r,
      onLogin: d,
      listAccountsAndContracts: v,
      sortAccountsAndContracts: g,
      isAccountDisabled: p,
      getAccountTypeName: u,
      accountClicked: c
    };
  }
});
const ss = { class: "account-selector" }, is = {
  key: 0,
  class: "wallet-label"
}, ls = { class: "nq-label" }, rs = {
  key: 0,
  class: "btc-pill"
}, cs = { class: "footer" };
function ds(e, t, n, o, a, i) {
  const s = O("Tooltip"), l = O("AccountList");
  return y(), w("div", ss, [
    $("div", {
      ref: "container$",
      class: V(["container", { "extra-spacing": e.wallets.length === 1 }])
    }, [
      (y(!0), w(Z, null, t1(e.sortedWallets, (r) => (y(), w("div", {
        key: r.id
      }, [
        e.wallets.length > 1 || e.isAccountDisabled(r) ? (y(), w("div", is, [
          $("div", ls, [
            X(x(r.label) + " ", 1),
            e.highlightBitcoinAccounts && r.btcXPub ? (y(), w("span", rs, "BTC")) : H("", !0)
          ]),
          e.isAccountDisabled(r) ? (y(), q(s, {
            key: 0,
            ref_for: !0,
            ref: (d) => e.tooltips$[`tooltip-${r.id}`] = d,
            margin: e.tooltipProps.margin,
            container: e.tooltipProps.container || void 0,
            preferredPosition: e.tooltipProps.preferredPosition,
            styles: { width: "25.25rem", ...e.tooltipProps.styles }
          }, {
            default: K(() => [
              X(x(e.$t(
                "{type} accounts cannot be used for this operation.",
                { type: e.getAccountTypeName(r) }
              )), 1)
            ]),
            _: 2
          }, 1032, ["margin", "container", "preferredPosition", "styles"])) : H("", !0)
        ])) : H("", !0),
        j(l, {
          accounts: e.sortAccountsAndContracts(e.listAccountsAndContracts(r), e.minBalance, e.disableContracts, e.disabledAddresses),
          disabledAddresses: e.disabledAddresses,
          walletId: r.id,
          minBalance: e.minBalance,
          decimals: e.decimals,
          disableContracts: e.disableContracts,
          disabled: e.isAccountDisabled(r),
          tooltipProps: e.tooltipProps,
          onAccountSelected: e.onAccountSelected,
          onClick: (d) => e.accountClicked(r)
        }, null, 8, ["accounts", "disabledAddresses", "walletId", "minBalance", "decimals", "disableContracts", "disabled", "tooltipProps", "onAccountSelected", "onClick"])
      ]))), 128))
    ], 2),
    $("div", cs, [
      e.allowLogin ? (y(), w("button", {
        key: 0,
        class: "nq-button-s",
        onClick: t[0] || (t[0] = (...r) => e.onLogin && e.onLogin(...r))
      }, x(e.$t("Login to another account")), 1)) : H("", !0)
    ])
  ]);
}
const hl = /* @__PURE__ */ F(os, [["render", ds], ["__scopeId", "data-v-0ee37ce2"]]);
function P1(e, t) {
  for (var n = 0, i = t.split(""), o = Array.isArray(i), a = 0, i = o ? i : i[Symbol.iterator](); ; ) {
    var s;
    if (o) {
      if (a >= i.length)
        break;
      s = i[a++];
    } else {
      if (a = i.next(), a.done)
        break;
      s = a.value;
    }
    var l = s;
    l === e && n++;
  }
  return n;
}
function us(e, t) {
  for (var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x", o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ", a = e.length, i = P1("(", e), s = P1(")", e), l = i - s; l > 0 && a < t.length; )
    e += t[a].replace(n, o), t[a] === ")" && l--, a++;
  return e;
}
function hs(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x", n = arguments.length > 2 ? arguments[2] : void 0;
  if (!e)
    return function(a) {
      return {
        text: a
      };
    };
  var o = P1(t, e);
  return function(a) {
    if (!a)
      return {
        text: "",
        template: e
      };
    for (var i = 0, s = "", d = e.split(""), l = Array.isArray(d), r = 0, d = l ? d : d[Symbol.iterator](); ; ) {
      var p;
      if (l) {
        if (r >= d.length)
          break;
        p = d[r++];
      } else {
        if (r = d.next(), r.done)
          break;
        p = r.value;
      }
      var u = p;
      if (u !== t) {
        s += u;
        continue;
      }
      if (s += a[i], i++, i === a.length && a.length < o)
        break;
    }
    return n && (s = us(s, e)), {
      text: s,
      template: e
    };
  };
}
function fs(e, t, n) {
  for (var o = "", a = 0, i = 0; i < e.length; ) {
    var s = n(e[i], o);
    s !== void 0 && (o += s, t !== void 0 && (t === i ? a = o.length - 1 : t > i && (a = o.length))), i++;
  }
  t === void 0 && (a = o.length);
  var l = {
    value: o,
    caret: a
  };
  return l;
}
function ms(e, t, n) {
  typeof n == "string" && (n = hs(n));
  var o = n(e) || {}, a = o.text, i = o.template;
  if (a === void 0 && (a = e), i)
    if (t === void 0)
      t = a.length;
    else {
      for (var s = 0, l = !1, r = -1; s < a.length && s < i.length; ) {
        if (a[s] !== i[s]) {
          if (t === 0) {
            l = !0, t = s;
            break;
          }
          r = s, t--;
        }
        s++;
      }
      l || (t = r + 1);
    }
  return {
    text: a,
    caret: t
  };
}
function ps(e, t, n) {
  switch (n) {
    case "Backspace":
      t > 0 && (e = e.slice(0, t - 1) + e.slice(t), t--);
      break;
    case "Delete":
      e = e.slice(0, t) + e.slice(t + 1);
      break;
  }
  return {
    value: e,
    caret: t
  };
}
function X1(e) {
  return e.hasAttribute("readonly");
}
function be(e) {
  if (e.selectionStart !== e.selectionEnd)
    return {
      start: e.selectionStart,
      end: e.selectionEnd
    };
}
var te = {
  Backspace: 8,
  Delete: 46
};
function vs(e) {
  switch (e.keyCode) {
    case te.Backspace:
      return "Backspace";
    case te.Delete:
      return "Delete";
  }
}
function gs(e) {
  return e.selectionStart;
}
function Se(e, t) {
  t !== void 0 && (ys() ? setTimeout(function() {
    return e.setSelectionRange(t, t);
  }, 0) : e.setSelectionRange(t, t));
}
function ys() {
  if (typeof navigator < "u")
    return Ms.test(navigator.userAgent);
}
var Ms = /Android/i;
function _s(e, t, n, o, a) {
  X1(t) || setTimeout(function() {
    return _1(t, n, o, void 0, a);
  }, 0);
}
function ws(e, t, n, o, a) {
  if (!X1(t)) {
    var i = be(t);
    i && Ce(t, i), _1(t, n, o, void 0, a);
  }
}
function zs(e, t, n, o, a) {
  _1(t, n, o, void 0, a);
}
function $s(e, t, n, o, a) {
  if (!X1(t)) {
    var i = vs(e);
    switch (i) {
      case "Delete":
      case "Backspace":
        e.preventDefault();
        var s = be(t);
        return s ? (Ce(t, s), _1(t, n, o, void 0, a)) : _1(t, n, o, i, a);
    }
  }
}
function Ce(e, t) {
  var n = e.value;
  n = n.slice(0, t.start) + n.slice(t.end), e.value = n, Se(e, t.start);
}
function _1(e, t, n, o, a) {
  var i = fs(e.value, gs(e), t), s = i.value, l = i.caret;
  if (o) {
    var r = ps(s, l, o);
    s = r.value, l = r.caret;
  }
  var d = ms(s, l, n), p = d.text;
  l = d.caret, e.value = p, Se(e, l), a(s);
}
const Ae = 9 * 4, A1 = Ae + 8;
function p1(e, t, n = !1) {
  if (!n || w1(t + e)) {
    switch (e.toUpperCase()) {
      case "I":
        e = "1";
        break;
      case "O":
        e = "0";
        break;
      case "Z":
        e = "2";
        break;
      case "W":
        return;
    }
    return new RegExp(`^(N(Q?)|NQ\\d{1,2}|NQ\\d{2}[0-9A-Z]{1,${Ae - 4}})$`, "i").test(t + e) ? e : void 0;
  } else
    return /^[-a-z0-9]*([a-z0-9]\.[a-z]*)?$/i.test(t + e) ? e : void 0;
}
function v1(e, t = !1) {
  return !t || w1(e) ? (e !== "" && e.toUpperCase() !== "N" && (e = N1(e).replace(/.{4}/g, (n, o) => `${n}${(o + 4) % 12 ? " " : `
`}`).substring(0, A1), e.endsWith(" ") && (e += "\u200B")), {
    text: e,
    template: `wwww wwww wwww
wwww wwww wwww
wwww wwww wwww`
  }) : {
    text: e
  };
}
function N1(e) {
  return e.replace(/\s|\u200B/g, "");
}
function ne(e, t = !1) {
  return !t || w1(e) ? e.toUpperCase().replace(/\n/g, " ").replace(/\u200B/g, "") : e.replace(/\n/g, "").replace(/\u200B/g, "");
}
function w1(e) {
  return e.length < 3 ? !1 : !!(e.toUpperCase().startsWith("NQ") && !isNaN(parseInt(e[2], 10)));
}
var ke = /* @__PURE__ */ ((e) => (e.PASTE = "paste", e.MODELVALUE_UPDATE = "update:modelValue", e.ADDRESS = "address", e))(ke || {});
const bs = U({
  name: "AddressInput",
  emits: Object.values(ke),
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    autofocus: Boolean,
    allowDomains: Boolean
  },
  setup(e, t) {
    const n = S(null), o = S(null), a = S(""), i = S(-1), s = S(-1), l = CSS.supports("mix-blend-mode", "screen"), r = P(() => !e.allowDomains || w1(a.value)), d = P(() => a.value.length >= 3 && !r.value);
    n1(() => {
      u(), document.addEventListener("selectionchange", M), e.autofocus && p();
    }), c1(() => {
      document.removeEventListener("selectionchange", M);
    });
    function p(h = !1) {
      !o.value || (o.value.focus(), h && o.value.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
    B(() => e.modelValue, () => u());
    function u() {
      if (N1(e.modelValue) === N1(a.value))
        return;
      const h = e.modelValue.split("").reduce((_, A) => _ + (p1(A, _, e.allowDomains) || ""), "");
      o.value && (o.value.value = v1(h, e.allowDomains).text), z(h);
    }
    function c(h) {
      $s(
        h,
        o.value,
        (_, A) => p1(_, A, e.allowDomains),
        (_) => v1(_, e.allowDomains),
        z
      ), setTimeout(() => M(), 10);
    }
    function v(h) {
      if (h.inputType === "deleteByDrag")
        return;
      const _ = o.value;
      zs(
        h,
        _,
        (A, k) => p1(A, k, e.allowDomains),
        (A) => v1(A, e.allowDomains),
        z
      );
    }
    function g(h) {
      const _ = h.clipboardData, A = _ ? _.getData("text/plain") : "";
      t.emit("paste", h, A), ws(
        h,
        o.value,
        (k, T) => p1(k, T, e.allowDomains),
        (k) => v1(k, e.allowDomains),
        z
      );
    }
    function f(h) {
      _s(
        h,
        o.value,
        (_, A) => p1(_, A, e.allowDomains),
        (_) => v1(_, e.allowDomains),
        z
      ), C();
    }
    function b() {
      setTimeout(() => M());
    }
    function C() {
      const h = ne(document.getSelection().toString(), e.allowDomains);
      setTimeout(() => G1.copy(h));
    }
    function z(h) {
      if (!o.value)
        return;
      const _ = o.value;
      if (_.selectionStart === _.selectionEnd && (_.value[_.selectionStart] === " " || _.value[_.selectionStart] === `
`) && (_.selectionStart += 1), a.value = ne(o.value.value, e.allowDomains), t.emit("update:modelValue", a.value), w1(h)) {
        const A = h1.isValidAddress(a.value);
        A && t.emit("address", a.value), n.value && n.value.classList.toggle("invalid", a.value.length === A1 && !A);
      }
    }
    function M() {
      if (!o.value)
        return;
      const h = o.value, _ = document.activeElement === h && (h.selectionStart !== A1 || h.selectionEnd !== A1);
      i.value = _ ? Math.floor(h.selectionStart / 5) : -1, s.value = _ ? Math.floor(h.selectionEnd / 5) : -1;
    }
    function m(h) {
      return i.value <= h && h <= s.value;
    }
    return t.expose({ focus: p }), {
      root$: n,
      textarea$: o,
      currentValue: a,
      supportsMixBlendMode: l,
      willBeAddressBool: r,
      isDomain: d,
      onKeyDown: c,
      onInput: v,
      onPaste: g,
      onCut: f,
      onFocus: b,
      formatClipboard: C,
      updateSelection: M,
      isBlockFocused: m
    };
  }
});
const Ss = /* @__PURE__ */ f1('<svg width="210" height="99" viewBox="0 0 210 99" fill="none" xmlns="http://www.w3.org/2000/svg" class="grid" data-v-7b22efe7><g stroke-width="1.5" stroke-linecap="round" data-v-7b22efe7><line x1="67.75" y1="0.75" x2="67.75" y2="22.25" data-v-7b22efe7></line><line x1="67.75" y1="37.75" x2="67.75" y2="60.25" data-v-7b22efe7></line><line x1="67.75" y1="75.75" x2="67.75" y2="98.25" data-v-7b22efe7></line><line x1="0.75" y1="30.25" x2="209.25" y2="30.25" data-v-7b22efe7></line><line x1="0.75" y1="68.25" x2="209.25" y2="68.25" data-v-7b22efe7></line><line x1="143.75" y1="37.75" x2="143.75" y2="60.25" data-v-7b22efe7></line><line x1="143.75" y1="0.75" x2="143.75" y2="22.25" data-v-7b22efe7></line><line x1="143.75" y1="75.75" x2="143.75" y2="98.25" data-v-7b22efe7></line></g></svg>', 1);
function Cs(e, t, n, o, a, i) {
  return y(), w("div", {
    class: V(["address-input", { "is-domain": e.isDomain }]),
    ref: "root$"
  }, [
    $("textarea", {
      ref: "textarea$",
      spellcheck: "false",
      autocomplete: "off",
      class: V({ "will-be-address": e.willBeAddressBool }),
      onKeydown: t[0] || (t[0] = (...s) => e.onKeyDown && e.onKeyDown(...s)),
      onInput: t[1] || (t[1] = (...s) => e.onInput && e.onInput(...s)),
      onPaste: t[2] || (t[2] = (...s) => e.onPaste && e.onPaste(...s)),
      onCut: t[3] || (t[3] = (...s) => e.onCut && e.onCut(...s)),
      onCopy: t[4] || (t[4] = (...s) => e.formatClipboard && e.formatClipboard(...s)),
      onClick: t[5] || (t[5] = (...s) => e.updateSelection && e.updateSelection(...s)),
      onSelect: t[6] || (t[6] = (...s) => e.updateSelection && e.updateSelection(...s)),
      onBlur: t[7] || (t[7] = (...s) => e.updateSelection && e.updateSelection(...s)),
      onFocus: t[8] || (t[8] = (...s) => e.onFocus && e.onFocus(...s))
    }, null, 34),
    e.willBeAddressBool && e.supportsMixBlendMode ? (y(), w(Z, { key: 0 }, t1(3, (s) => (y(), w(Z, null, [
      (y(), w(Z, null, t1(3, (l) => $("div", {
        key: `color-${s}-${l}`,
        class: "color-overlay",
        style: z1({
          visibility: e.currentValue ? "visible" : "hidden",
          left: `calc(${l - 1} * (var(--block-width) + var(--block-gap-h)) + var(--block-gap-h) - 0.25rem)`,
          top: `calc(${s - 1} * (var(--block-height) + var(--block-gap-v)) + var(--block-gap-v) + 0.25rem)`,
          background: `var(--nimiq-${e.isBlockFocused((s - 1) * 3 + (l - 1)) ? "light-" : ""}blue)`
        })
      }, null, 4)), 64))
    ], 64))), 64)) : H("", !0),
    Ss
  ], 2);
}
const fl = /* @__PURE__ */ F(bs, [["render", Cs], ["__scopeId", "data-v-7b22efe7"]]);
var O1 = /* @__PURE__ */ ((e) => (e.MODELVALUE_UPDATE = "update:modelValue", e.PASTE = "paste", e.SUBMIT = "submit", e))(O1 || {});
const As = U({
  name: "AmountInput",
  emits: Object.values(O1),
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
  setup(e, t) {
    const n = S(null), o = S(null), a = S(null), i = S(null), s = S(""), l = S(0), r = S(50), d = S(e.maxFontSize), p = S(0), u = S(0), c = S(!1);
    n1(() => {
      e.maxFontSize && n.value && (p.value = n.value.offsetWidth);
    });
    function v() {
      o.value && o.value.focus();
    }
    function g(C) {
      C !== u.value && (l.value = C || 0, b.value = C ? (C / Math.pow(10, e.decimals)).toString() : "", f());
    }
    async function f() {
      if (await a1(), !a.value || !i.value)
        return;
      const C = a.value.offsetWidth, z = i.value.offsetWidth, M = Math.min(1, Math.max(p.value / z, 1 / e.maxFontSize));
      d.value = M * e.maxFontSize, r.value = b.value ? M === 1 ? z : p.value : C;
    }
    const b = P({
      get() {
        return s.value;
      },
      set(C) {
        if (s.value = C, !C) {
          s.value = "", l.value = 0, u.value = 0, t.emit("update:modelValue", u.value);
          return;
        }
        C = C.replace(/\,/, ".");
        const M = new RegExp(`(\\d*)(\\.(\\d{0,${e.decimals}}))?`, "g").exec(C);
        M[1] || M[2] ? (s.value = `${M[1] ? M[1] : "0"}${M[2] ? M[2] : ""}`, u.value = Number(
          `${M[1]}${(M[2] ? M[3] : "").padEnd(e.decimals, "0")}`
        )) : (s.value = "", u.value = 0), l.value !== u.value && (t.emit("update:modelValue", u.value), l.value = u.value);
      }
    });
    return B(b, f), B(
      () => e.modelValue,
      (C) => C && g(C),
      { immediate: !0 }
    ), t.expose({ focus: v, formattedValue: b }), {
      fullWidth$: n,
      input$: o,
      widthPlaceholder$: a,
      widthValue$: i,
      valueInLuna: u,
      isFocussed: c,
      maxWidth: p,
      formattedValue: b,
      width: r,
      fontSize: d,
      AmountInputEvent: O1
    };
  }
});
const ks = (e) => (l1("data-v-426cc8a1"), e = e(), r1(), e), Es = ["placeholder"], Ts = /* @__PURE__ */ ks(() => /* @__PURE__ */ $("span", { class: "nim" }, "NIM", -1));
function Is(e, t, n, o, a, i) {
  return y(), w("div", {
    class: V(["amount-input", { "has-value": e.valueInLuna > 0, focussed: e.isFocussed }])
  }, [
    $("form", {
      class: "label-input",
      onSubmit: t[4] || (t[4] = o1((s) => e.$emit(e.AmountInputEvent.SUBMIT, s), ["prevent"])),
      ref: "fullWidth$"
    }, [
      $("span", {
        class: "width-finder width-placeholder",
        ref: "widthPlaceholder$"
      }, x(e.placeholder), 513),
      e.maxFontSize ? (y(), w("div", {
        key: 0,
        class: V(["full-width", { "width-finder": e.maxWidth > 0 }])
      }, "Width", 2)) : H("", !0),
      $("span", {
        class: "width-finder width-value",
        ref: "widthValue$"
      }, x(e.formattedValue || ""), 513),
      j1($("input", {
        type: "text",
        inputmode: "decimal",
        class: V(["nq-input", { vanishing: e.vanishing }]),
        ref: "input$",
        placeholder: e.placeholder,
        style: z1({ width: `${e.width}px`, fontSize: `${e.fontSize}rem` }),
        onFocus: t[0] || (t[0] = (s) => e.isFocussed = !0),
        onBlur: t[1] || (t[1] = (s) => e.isFocussed = !1),
        onPaste: t[2] || (t[2] = (s) => e.$emit(e.AmountInputEvent.PASTE, s)),
        "onUpdate:modelValue": t[3] || (t[3] = (s) => e.formattedValue = s)
      }, null, 46, Es), [
        [re, e.formattedValue]
      ])
    ], 544),
    Ts
  ], 2);
}
const Ls = /* @__PURE__ */ F(As, [["render", Is], ["__scopeId", "data-v-426cc8a1"]]), xs = /(-)?\D*(\d+)(\.(\d+))?/, Ds = /(\d)\D(\d)/, Rs = /[A-Z]{3}\s?/i, Bs = /[A-Z.]$/i, Vs = U({
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
  setup(e) {
    const t = P(() => {
      const o = n(e.currency), a = e.locale ? new W(e.currency, e.locale) : new W(e.currency), i = {
        style: "currency",
        currency: e.currency,
        currencyDisplay: "code",
        useGrouping: !1,
        numberingSystem: "latn",
        minimumFractionDigits: e.hideDecimals ? 0 : a.decimals,
        maximumFractionDigits: e.hideDecimals ? 0 : a.decimals
      };
      let s, l, r;
      do {
        s = e.amount.toLocaleString([
          e.locale || o,
          o,
          `${navigator.language.substring(0, 2)}-${o}`,
          navigator.language,
          `en-${o}`,
          "en"
        ], i).replace(Ds, "$1.$2");
        const d = s.match(xs), [, p, , u, c] = d;
        l = d[2];
        const v = `${p || ""}${l}${u || ""}`;
        r = Math.abs((e.amount - Number.parseFloat(v)) / e.amount);
        const g = c ? c.length + 1 : 1;
        i.minimumFractionDigits = g, i.maximumFractionDigits = g;
      } while (r > e.maxRelativeDeviation && i.minimumFractionDigits <= 20 && !e.hideDecimals);
      return s = s.replace(Rs, (d, p) => p !== 0 || !Bs.test(a.symbol) ? a.symbol : `${a.symbol}\xA0`), l.length <= 4 ? s : s.replace(l, new i1(l).toString(!0));
    });
    function n(o) {
      switch (o = o.toLowerCase(), o) {
        case "eur":
        case "chf":
          return "de";
        case "gbp":
        case "usd":
          return "en";
        case "cny":
          return "zh";
        default:
          return o.substr(0, 2);
      }
    }
    return { currencyString: t };
  }
}), Ps = { class: "fiat-amount" };
function Ns(e, t, n, o, a, i) {
  return y(), w("span", Ps, x(e.currencyString), 1);
}
const Ee = /* @__PURE__ */ F(Vs, [["render", Ns]]);
var Te = /* @__PURE__ */ ((e) => (e.MODELVALUE_UPDATE = "update:modelValue", e))(Te || {});
const Os = U({
  name: "AmountWithFee",
  emits: Object.values(Te),
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
  methods: { $t: J("AmountWithFee") },
  setup(e, t) {
    const n = S(null), o = S(e.modelValue.amount), a = P(() => o.value > 0 && o.value + e.modelValue.fee <= e.availableBalance);
    n1(s), B(a, i, { immediate: !0 });
    function i() {
      t.emit("update:modelValue", {
        amount: o.value,
        fee: e.modelValue.fee,
        isValid: a.value
      });
    }
    B(o, s, { immediate: !0 });
    function s() {
      t.emit("update:modelValue", {
        amount: o.value,
        fee: e.modelValue.fee,
        isValid: a.value
      });
    }
    function l() {
      n.value && n.value.focus();
    }
    return t.expose({ focus: l }), {
      amountInput$: n,
      liveAmount: o,
      isValid: a
    };
  },
  components: {
    Amount: E1,
    AmountInput: Ls,
    FiatAmount: Ee
  }
});
const Hs = { class: "amount-with-fee" }, Fs = { class: "fee-section nq-text-s" }, Us = {
  key: 0,
  class: "nq-red"
}, js = { key: 1 }, Ws = {
  key: 0,
  class: "fiat"
}, Gs = {
  key: 1,
  class: "fee"
};
function qs(e, t, n, o, a, i) {
  const s = O("AmountInput"), l = O("FiatAmount"), r = O("Amount");
  return y(), w("div", Hs, [
    j(s, {
      class: V(["value", { invalid: !e.isValid && e.liveAmount > 0 }]),
      modelValue: e.liveAmount,
      "onUpdate:modelValue": t[0] || (t[0] = (d) => e.liveAmount = d),
      ref: "amountInput$"
    }, null, 8, ["modelValue", "class"]),
    $("div", Fs, [
      !e.isValid && e.liveAmount ? (y(), w("div", Us, [
        Y(e.$slots, "insufficient-balance-error", {}, () => [
          X(x(e.$t("Insufficient balance")), 1)
        ], !0)
      ])) : (y(), w("div", js, [
        e.fiatAmount && e.fiatCurrency ? (y(), w("span", Ws, [
          X(" ~"),
          j(l, {
            amount: e.fiatAmount,
            currency: e.fiatCurrency
          }, null, 8, ["amount", "currency"])
        ])) : H("", !0),
        e.modelValue.fee ? (y(), w("span", Gs, [
          X(" + "),
          j(r, {
            amount: e.modelValue.fee,
            minDecimals: 0,
            maxDecimals: 5
          }, null, 8, ["amount"]),
          X(" " + x(e.$t("fee")), 1)
        ])) : H("", !0)
      ]))
    ])
  ]);
}
const ml = /* @__PURE__ */ F(Os, [["render", qs], ["__scopeId", "data-v-3554c7c4"]]);
var Ie = /* @__PURE__ */ ((e) => (e.CLOSE = "close", e))(Ie || {}), H1 = /* @__PURE__ */ ((e) => (e.DARK = "dark", e.LIGHT = "light", e.GREEN = "green", e))(H1 || {});
const Ks = U({
  name: "BottomOverlay",
  emits: Object.values(Ie),
  props: {
    theme: {
      type: String,
      default: "dark",
      validator: (e) => typeof e == "string" && Object.values(H1).includes(e)
    }
  },
  setup(e, t) {
    const n = S(!1);
    function o() {
      t.emit("close");
    }
    async function a() {
      var i, s;
      n.value = !!((s = (i = Ke()) == null ? void 0 : i.vnode.props) != null && s.onClose);
    }
    return B(() => t.attrs.onClose, a, { immediate: !0 }), {
      hasCloseButton: n,
      onClose: o,
      BottomOverlayTheme: H1
    };
  },
  components: {
    CloseButton: _e
  }
});
function Qs(e, t, n, o, a, i) {
  const s = O("CloseButton");
  return y(), w("div", {
    class: V(["bottom-overlay", [e.theme, { "has-close-button": e.hasCloseButton }]])
  }, [
    Y(e.$slots, "default", {}, void 0, !0),
    e.hasCloseButton ? (y(), q(s, {
      key: 0,
      class: V(["close-button", { inverse: [e.BottomOverlayTheme.DARK, e.BottomOverlayTheme.GREEN].includes(e.theme) }]),
      onClick: e.onClose
    }, null, 8, ["class", "onClick"])) : H("", !0)
  ], 2);
}
const pl = /* @__PURE__ */ F(Ks, [["render", Qs], ["__scopeId", "data-v-4caafc56"]]);
var Le = /* @__PURE__ */ ((e) => (e.SELECT = "select", e))(Le || {});
const Xs = U({
  name: "Carousel",
  emits: Object.values(Le),
  props: {
    entries: {
      type: Array,
      default: () => [],
      validator: (e) => Array.isArray(e) && e.length > 0 && !e.some((t) => typeof t != "string")
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
  setup(e, t) {
    const n = S(null), o = S({}), a = S(""), i = S(null), s = new D1(), l = /* @__PURE__ */ new Map(), r = P(() => e.entries.length <= 2), d = P(() => e.entries.length + (r.value ? 1 : 0));
    n1(async () => {
      document.addEventListener("keydown", z), await p(!1), c(e.selected), v(!1);
    }), c1(() => {
      document.removeEventListener("keydown", z), i.value !== null && cancelAnimationFrame(i.value);
    }), B(() => e.entryMargin, p);
    async function p(M = !0) {
      const m = typeof M == "boolean" ? M : !0;
      await a1();
      let h = 0, _ = 0;
      for (let T = 0; T < e.entries.length; ++T) {
        const E = o.value[e.entries[T]], L = o.value[e.entries[(T + 1) % e.entries.length]];
        h = Math.max(h, E.offsetHeight);
        const N = E.offsetWidth / 2 + L.offsetWidth / 2 + e.entryMargin;
        _ = Math.max(_, N);
      }
      const A = 2 * Math.PI / d.value / 2, k = _ / 2 / Math.sin(A);
      s.tweenTo(k, m ? e.animationDuration : 0), n.value && (n.value.style.minHeight = `${h}px`), f();
    }
    B(() => e.entries, u);
    async function u() {
      await p(), c(a.value), v();
    }
    B(() => e.selected, c);
    function c(M) {
      if (M === void 0)
        return;
      const m = a.value, h = e.entries.includes(M), _ = e.entries.includes(m);
      h ? a.value = M : _ || (a.value = e.entries[0]), a.value !== m && t.emit("select", a.value);
    }
    B(a, v), B(() => e.disabled, v);
    function v(M = !0, m) {
      const h = typeof M == "boolean" && typeof m > "u" ? M : !0;
      for (const _ of l.keys())
        e.entries.includes(_) || l.delete(_);
      for (const _ of e.entries) {
        const A = l.get(_) || new D1(), k = h ? e.animationDuration : 0;
        A.tweenTo(g(_, A.currentValue), k), l.set(_, A);
      }
      f();
    }
    function g(M, m) {
      if (e.disabled && M !== a.value)
        return m + b(m, Math.PI);
      const h = 2 * Math.PI / d.value, _ = e.entries.indexOf(M), A = e.entries.indexOf(a.value);
      let k = _ - A;
      return r.value && k > d.value / 2 && (k += 1), m + b(m, k * h);
    }
    B(() => e.hideBackgroundEntries, f);
    function f() {
      i.value === null && (i.value = requestAnimationFrame(() => {
        const M = [];
        let m = s.finished;
        for (const [h, _] of l) {
          const A = _.currentValue, k = s.currentValue, T = Math.sin(A) * k, E = Math.cos(A) * k - k, L = o.value[h];
          L.style.transform = `translate3d(calc(${T}px - 50%),-50%,${E}px)`, L.style.display = C(h) ? "none" : "", M.push([h, E]), m = m && _.finished;
        }
        M.sort(([, h], [, _]) => h - _);
        for (let h = 0; h < M.length; ++h) {
          const _ = o.value[M[h][0]];
          _.style.zIndex = `${h}`;
        }
        i.value = null, m || f();
      }));
    }
    function b(M, m) {
      const h = (m - M) % (2 * Math.PI), _ = h - Math.sign(h) * 2 * Math.PI;
      return Math.abs(Math.abs(h) - Math.abs(_)) < 1e-10 ? Math.min(h, _) : Math.abs(h) < Math.abs(_) ? h : _;
    }
    function C(M) {
      const m = l.get(M);
      if (!m || !e.disabled && !e.hideBackgroundEntries)
        return !1;
      const h = Math.abs(b(0, m.currentValue));
      if (e.disabled)
        return Math.abs(h - Math.PI) < 1e-10;
      if (e.hideBackgroundEntries) {
        const _ = 2 * Math.PI / d.value, A = Math.PI / 2 + _ / (d.value - 1);
        return h > A;
      }
      return !1;
    }
    function z(M) {
      const m = M.target;
      if (e.disabled || m.tagName === "INPUT" || m.tagName === "TEXTAREA" || l.values().next().value.progress < 0.5)
        return;
      const h = e.entries.indexOf(a.value);
      let _;
      if (M.key === "ArrowLeft")
        _ = (h - 1 + e.entries.length) % e.entries.length;
      else if (M.key === "ArrowRight")
        _ = (h + 1) % e.entries.length;
      else
        return;
      c(e.entries[_]);
    }
    return {
      root$: n,
      refs$: o,
      effectiveSelected: a,
      updateSelection: c
    };
  }
});
const Ys = ["onClick", "onFocusin"];
function Zs(e, t, n, o, a, i) {
  return y(), w("div", {
    class: V(["carousel", { disabled: e.disabled }]),
    ref: "root$"
  }, [
    (y(!0), w(Z, null, t1(e.entries, (s, l) => (y(), w("div", {
      ref_for: !0,
      ref: (r) => {
        e.refs$[s] = r;
      },
      key: l,
      class: V({ selected: e.effectiveSelected === s }),
      onClick: (r) => !e.disabled && e.updateSelection(s),
      onFocusin: (r) => !e.disabled && e.updateSelection(s)
    }, [
      Y(e.$slots, s, {}, void 0, !0)
    ], 42, Ys))), 128))
  ], 2);
}
const vl = /* @__PURE__ */ F(Xs, [["render", Zs], ["__scopeId", "data-v-a4c65f86"]]), Js = {};
const xe = (e) => (l1("data-v-fe97e451"), e = e(), r1(), e), e3 = {
  class: "circle-spinner",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 18 18",
  width: "18",
  height: "18",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round"
}, t3 = /* @__PURE__ */ xe(() => /* @__PURE__ */ $("path", {
  stroke: "#0582CA",
  d: "M9,1c4.42,0,8,3.58,8,8"
}, null, -1)), n3 = /* @__PURE__ */ xe(() => /* @__PURE__ */ $("path", {
  stroke: "#1F2348",
  opacity: ".3",
  d: "M4.27,2.56C2.29,4.01,1,6.35,1,9c0,4.42,3.58,8,8,8c2.65,0,4.99-1.29,6.44-3.27"
}, null, -1)), a3 = [
  t3,
  n3
];
function o3(e, t, n, o, a, i) {
  return y(), w("svg", e3, a3);
}
const gl = /* @__PURE__ */ F(Js, [["render", o3], ["__scopeId", "data-v-fe97e451"]]), ae = 3, oe = 2.5, s3 = U({
  name: "CopyableField",
  props: {
    modelValue: {
      type: Object,
      required: !0,
      validator: (e) => typeof e == "string" || typeof e == "number" || typeof e == "object" && Object.keys(e).length > 0
    },
    label: String,
    small: {
      type: Boolean,
      default: !1
    }
  },
  methods: { $t: J("CopyableField") },
  setup(e) {
    const t = S(null), n = S(null), o = S(""), a = S(e.small ? oe : ae), i = S(!1), s = S(null);
    n1(() => {
      window.addEventListener("resize", p), p();
    }), c1(() => window.removeEventListener("resize", p));
    const l = P(() => typeof e.modelValue != "string" && typeof e.modelValue != "number"), r = P(() => l.value && Object.keys(e.modelValue).length === 1);
    B(() => e.modelValue, d, { immediate: !0 });
    function d() {
      const c = l.value ? Object.keys(e.modelValue) : [];
      c.length > 0 && (!o.value || !c.includes(o.value)) ? o.value = c[0] : p();
    }
    B(o, p), B(() => e.small, p);
    async function p() {
      if (await a1(), !n.value || !t.value)
        return;
      const c = e.small ? oe : ae;
      t.value.style.fontSize = `${c}rem`;
      const v = n.value.offsetWidth, g = t.value.offsetWidth, f = v / g;
      t.value.style.fontSize = "", a.value = Math.min(c, c * f);
    }
    function u() {
      G1.copy(
        l.value ? e.modelValue[o.value].toString() : e.modelValue.toString()
      ), i.value = !0, s.value && window.clearTimeout(s.value), s.value = window.setTimeout(() => {
        i.value = !1;
      }, 500);
    }
    return {
      value$: t,
      valueContainer$: n,
      currentKey: o,
      fontSize: a,
      copied: i,
      isKeyedValue: l,
      hasSingleKey: r,
      copy: u
    };
  }
});
const i3 = {
  key: 0,
  class: "nq-label"
}, l3 = ["onClick", "tabindex"], r3 = { class: "copy-notice" };
function c3(e, t, n, o, a, i) {
  return y(), w("div", {
    class: V(["copyable-field", { small: e.small }])
  }, [
    e.label ? (y(), w("span", i3, x(e.label), 1)) : H("", !0),
    $("div", {
      class: V(["copyable-field-content", { "simple-value": !e.isKeyedValue, copied: e.copied }]),
      onClick: t[0] || (t[0] = (...s) => e.copy && e.copy(...s))
    }, [
      $("div", {
        ref: "valueContainer$",
        class: "value-container",
        style: z1({ fontSize: e.fontSize + "rem" })
      }, [
        $("span", {
          ref: "value$",
          class: "value"
        }, x(typeof e.modelValue == "object" ? e.modelValue[e.currentKey] : e.modelValue), 513)
      ], 4),
      (y(!0), w(Z, null, t1(e.isKeyedValue ? Object.keys(e.modelValue) : [], (s) => (y(), w("button", {
        class: V(["nq-button-s", {
          inverse: e.currentKey === s,
          "single-key": e.hasSingleKey
        }]),
        key: s,
        onClick: o1((l) => e.currentKey = s, ["stop"]),
        tabindex: e.hasSingleKey ? -1 : 0
      }, x(s), 11, l3))), 128)),
      $("div", r3, x(e.$t("Copied")), 1)
    ], 2)
  ], 2);
}
const yl = /* @__PURE__ */ F(s3, [["render", c3], ["__scopeId", "data-v-c41faa3b"]]), d3 = {};
const De = (e) => (l1("data-v-500cd6b7"), e = e(), r1(), e), u3 = {
  height: "48",
  width: "54",
  viewBox: "0 0 54 48",
  color: "inherit",
  class: "loading-spinner"
}, h3 = /* @__PURE__ */ De(() => /* @__PURE__ */ $("path", {
  id: "big-hex",
  d: "M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z",
  stroke: "currentColor",
  "stroke-width": "3",
  fill: "none",
  "stroke-linecap": "round",
  opacity: "0.4",
  "stroke-dasharray": "92.5 60"
}, null, -1)), f3 = /* @__PURE__ */ De(() => /* @__PURE__ */ $("path", {
  id: "small-hex",
  d: "M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z",
  stroke: "currentColor",
  "stroke-width": "3",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-dasharray": "47.5 105"
}, null, -1)), m3 = [
  h3,
  f3
];
function p3(e, t, n, o, a, i) {
  return y(), w("svg", u3, m3);
}
const Ml = /* @__PURE__ */ F(d3, [["render", p3], ["__scopeId", "data-v-500cd6b7"]]), v3 = {};
const g3 = { class: "page-body nq-card-body" };
function y3(e, t, n, o, a, i) {
  return y(), w("div", g3, [
    Y(e.$slots, "default", {}, void 0, !0)
  ]);
}
const _l = /* @__PURE__ */ F(v3, [["render", y3], ["__scopeId", "data-v-62242d50"]]), M3 = {};
const _3 = { class: "page-footer nq-card-footer" };
function w3(e, t, n, o, a, i) {
  return y(), w("div", _3, [
    Y(e.$slots, "default", {}, void 0, !0)
  ]);
}
const wl = /* @__PURE__ */ F(M3, [["render", w3], ["__scopeId", "data-v-6c313288"]]);
var Re = /* @__PURE__ */ ((e) => (e.BACK = "back", e))(Re || {});
const z3 = U({
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
  methods: { $t: J("PageHeader") },
  setup(e) {
    return {
      progressSteps: P(() => {
        const n = [];
        for (let o = 1; o <= e.numberSteps; o++)
          n.push(o);
        return n;
      }),
      PageHeaderEvent: Re
    };
  },
  components: { ArrowLeftIcon: No }
});
const $3 = {
  key: 0,
  class: "progress-indicator"
}, b3 = ["title"], S3 = { class: "nq-h1" };
function C3(e, t, n, o, a, i) {
  const s = O("ArrowLeftIcon");
  return y(), w("div", {
    class: V(["page-header nq-card-header", e.progressIndicator ? "has-progress-indicator" : ""])
  }, [
    e.progressIndicator ? (y(), w("div", $3, [
      (y(!0), w(Z, null, t1(e.progressSteps, (l) => (y(), w("div", {
        class: V(["indicator", l <= e.step ? "active" : ""]),
        key: l
      }, null, 2))), 128))
    ])) : H("", !0),
    e.backArrow ? (y(), w("a", {
      key: 1,
      href: "#",
      class: "page-header-back-button",
      onClick: t[0] || (t[0] = o1((l) => e.$emit(e.PageHeaderEvent.BACK), ["prevent"])),
      title: e.$t("Go back")
    }, [
      j(s)
    ], 8, b3)) : H("", !0),
    $("h1", S3, [
      Y(e.$slots, "default", {}, void 0, !0)
    ]),
    Y(e.$slots, "more", {}, void 0, !0)
  ], 2);
}
const zl = /* @__PURE__ */ F(z3, [["render", C3], ["__scopeId", "data-v-50129964"]]), Y1 = U({
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
    const t = J(this.$props.componentName)(this.$props.path.replace(/\\n/g, `
`)).split(/({\w+})/g).map((n) => {
      const o = n.match(/^{(\w+)}$/);
      return o && this.$slots[o[1]]() || n;
    });
    return de(this.$props.tag, {}, t);
  }
}), Be = [
  { unit: "minute", factor: 60 },
  { unit: "hour", factor: 60 },
  { unit: "day", factor: 24 }
];
function A3(e, t = !0, n) {
  let o = e / 1e3, a = "second";
  for (const { unit: i, factor: s } of Be) {
    if (o / s < 1 || a === n)
      break;
    o /= s, a = i;
  }
  if (o = Math.floor(o), t) {
    const i = J("Timer");
    return a = {
      get second() {
        return i("second");
      },
      get seconds() {
        return i("seconds");
      },
      get minute() {
        return i("minute");
      },
      get minutes() {
        return i("minutes");
      },
      get hour() {
        return i("hour");
      },
      get hours() {
        return i("hours");
      },
      get day() {
        return i("day");
      },
      get days() {
        return i("days");
      }
    }[`${a}${o !== 1 ? "s" : ""}`], `${o} ${a}`;
  } else
    return o;
}
const Ve = 8, se = 3.25 * Ve, C1 = Ve, ie = 1.5;
var F1 = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e.WHITE = "white", e))(F1 || {});
const k3 = U({
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
      validator: (e) => Object.values(F1).includes(e)
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    tooltipProps: Object,
    maxUnit: {
      type: String,
      required: !1,
      validator: (e) => [void 0, "second", "minute", "hour", "day"].includes(e)
    }
  },
  setup(e, t) {
    const n = S(null), o = S(0), a = S(0), i = S(!1), s = new D1(i.value || e.alwaysShowTime ? C1 * ie : C1), l = S(2 * Math.PI * s.currentValue), r = S(null), d = S(null), p = S(null), u = S(se);
    function c(A) {
      o.value = A - Date.now();
    }
    t.expose({ synchronize: c }), n1(() => {
      requestAnimationFrame(() => u.value = n.value.offsetWidth), window.addEventListener("resize", _);
    }), c1(() => {
      r.value && clearTimeout(r.value), d.value && clearTimeout(d.value), p.value && cancelAnimationFrame(p.value), window.removeEventListener("resize", _);
    });
    const v = P(() => e.startTime === void 0 || e.endTime === void 0 ? 0 : Math.max(0, e.endTime - e.startTime)), g = P(() => e.startTime === void 0 || e.endTime === void 0 ? 0 : Math.max(0, Math.min(v.value, e.endTime - a.value))), f = P(() => e.startTime === void 0 || e.endTime === void 0 || v.value === 0 ? 0 : 1 - g.value / v.value), b = P(() => {
      const A = l.value - 2.5 * e.strokeWidth, k = Math.min(A, (1 - f.value) * l.value), T = k + e.strokeWidth, E = l.value - k, L = l.value / 4 - E;
      return { length: k, lengthWithLineCaps: T, gap: E, offset: L, strokeWidth: e.strokeWidth };
    }), C = P(() => {
      const A = l.value - b.value.lengthWithLineCaps - 2 * e.strokeWidth, k = Math.max(0, A), T = Math.min(e.strokeWidth, k), E = Math.max(0, k - T), L = l.value - E, N = l.value / 4 - e.strokeWidth / 2 - e.strokeWidth - T / 2;
      return { length: E, lengthWithLineCaps: k, gap: L, offset: N, strokeWidth: T };
    });
    function z() {
      const A = u.value / se, T = l.value * A * 3, E = 1e3 / 60, L = g.value, N = v.value, G = 2;
      let Q = 1e3, e1 = Q / G;
      for (const { factor: b1 } of Be) {
        const s1 = Q * b1, m1 = s1 / G, S1 = Math.min(m1, Math.max(E, N / T));
        if ((L - S1) / s1 < 1) {
          L / s1 > 1 && (e1 = L - s1);
          break;
        }
        Q = s1, e1 = m1;
      }
      return Math.min(e1, Math.max(E, v.value / T));
    }
    B(i, M, { immediate: !0 }), B(() => e.alwaysShowTime, M);
    function M() {
      s.tweenTo(i.value || e.alwaysShowTime ? ie * C1 : C1, 300), h();
    }
    B(() => e.startTime, m, { immediate: !0 }), B(() => e.endTime, m), B(o, m);
    function m() {
      a.value = Date.now() + o.value, r.value && clearTimeout(r.value), e.startTime && e.endTime && (r.value = window.setTimeout(
        () => t.emit("end", e.endTime),
        e.endTime - a.value
      ), h());
    }
    function h() {
      a.value = Date.now() + o.value, l.value = 2 * Math.PI * s.currentValue, !(g.value === 0 && s.finished) && (d.value && clearTimeout(d.value), p.value && cancelAnimationFrame(p.value), s.finished ? d.value = window.setTimeout(() => h(), z()) : p.value = requestAnimationFrame(() => h()));
    }
    function _() {
      n.value && (u.value = n.value.offsetWidth);
    }
    return {
      toSimplifiedTime: A3,
      TooltipThemes: M1,
      TimerThemes: F1,
      root$: n,
      detailsShown: i,
      radius: s,
      timeLeftRef: g,
      progress: f,
      timeCircleInfo: b,
      fillerCircleInfo: C
    };
  },
  components: { Tooltip: T1, I18n: Y1 }
});
const Pe = (e) => (l1("data-v-84be38fa"), e = e(), r1(), e), E3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 26 26"
}, T3 = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"], I3 = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"], L3 = {
  key: 0,
  class: "info-exclamation-icon"
}, x3 = /* @__PURE__ */ Pe(() => /* @__PURE__ */ $("rect", {
  x: "12",
  y: "9",
  width: "2",
  height: "2",
  rx: "1"
}, null, -1)), D3 = /* @__PURE__ */ Pe(() => /* @__PURE__ */ $("rect", {
  x: "12",
  y: "12.5",
  width: "2",
  height: "4.5",
  rx: "1"
}, null, -1)), R3 = [
  x3,
  D3
], B3 = {
  key: 1,
  class: "countdown",
  x: "50%",
  y: "50%"
};
function V3(e, t, n, o, a, i) {
  const s = O("I18n"), l = O("Tooltip");
  return y(), q(l, he({
    class: "timer",
    ref: "root$"
  }, {
    preferredPosition: "bottom right",
    theme: e.theme === e.TimerThemes.INVERSE || e.theme === e.TimerThemes.WHITE ? e.TooltipThemes.INVERSE : e.TooltipThemes.NORMAL,
    ...e.tooltipProps,
    styles: {
      width: "18.25rem",
      pointerEvents: "none",
      ...e.tooltipProps ? e.tooltipProps.styles : void 0
    }
  }, {
    onShow: t[0] || (t[0] = (r) => e.detailsShown = !0),
    onHide: t[1] || (t[1] = (r) => e.detailsShown = !1),
    class: {
      "time-shown": e.detailsShown || e.alwaysShowTime,
      "little-time-left": e.progress >= 0.75,
      "inverse-theme": e.theme === e.TimerThemes.INVERSE,
      "white-theme": e.theme === e.TimerThemes.WHITE
    }
  }), {
    trigger: K(() => [
      (y(), w("svg", E3, [
        $("circle", {
          ref: "time-circle",
          class: "time-circle",
          cx: "50%",
          cy: "50%",
          r: e.radius.currentValue,
          "stroke-dasharray": `${e.timeCircleInfo.length} ${e.timeCircleInfo.gap}`,
          "stroke-dashoffset": e.timeCircleInfo.offset,
          "stroke-width": e.timeCircleInfo.strokeWidth
        }, null, 8, T3),
        $("circle", {
          class: "filler-circle",
          cx: "50%",
          cy: "50%",
          r: e.radius.currentValue,
          "stroke-dasharray": `${e.fillerCircleInfo.length} ${e.fillerCircleInfo.gap}`,
          "stroke-dashoffset": e.fillerCircleInfo.offset,
          "stroke-width": e.fillerCircleInfo.strokeWidth
        }, null, 8, I3),
        j(W1, { name: "transition-fade" }, {
          default: K(() => [
            !e.detailsShown && !e.alwaysShowTime ? (y(), w("g", L3, R3)) : (y(), w("text", B3, x(e.toSimplifiedTime(e.timeLeftRef, !1, e.maxUnit)), 1))
          ]),
          _: 1
        })
      ]))
    ]),
    default: K(() => [
      j(s, {
        path: "This offer expires in {timer}.",
        componentName: "Timer"
      }, {
        timer: K(() => [
          X(x(e.toSimplifiedTime(e.timeLeftRef, !0, e.maxUnit)), 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16, ["class"]);
}
const P3 = /* @__PURE__ */ F(k3, [["render", V3], ["__scopeId", "data-v-84be38fa"]]);
function N3(e) {
  return "amount" in e && "currency" in e && "decimals" in e && q1(e.amount) && typeof e.currency == "string" && typeof e.decimals == "number" && Number.isInteger(e.decimals);
}
function O3(e) {
  return "amount" in e && "currency" in e && typeof e.amount == "number" && typeof e.currency == "string";
}
const H3 = 6e4, L1 = 0.1;
var U1 = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.INVERSE = "inverse", e))(U1 || {});
const F3 = U({
  name: "PaymentInfoLine",
  props: {
    cryptoAmount: {
      type: Object,
      required: !0,
      validator: N3
    },
    fiatAmount: {
      type: Object,
      validator: O3
    },
    vendorMarkup: {
      type: Number,
      validator: (e) => e > -1
    },
    networkFee: {
      type: Number,
      validator: q1
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
      validator: (e) => Object.values(U1).includes(e),
      default: "normal"
    },
    tooltipContainer: HTMLElement
  },
  methods: { $t: J("PaymentInfoLine") },
  setup(e, t) {
    const n = S(null), o = S(null), a = S(null), i = S(-1), s = S(-1);
    n1(() => b()), c1(() => window.clearTimeout(i.value));
    async function l(z) {
      await a1(), n.value && n.value.synchronize(z);
    }
    t.expose({ setTime: l });
    const r = P(() => e.origin.split("://")[1]), d = P(() => e.fiatAmount ? e.fiatAmount.amount / (Number(e.cryptoAmount.amount) / 10 ** e.cryptoAmount.decimals) : null), p = P(() => typeof e.vendorMarkup != "number" ? null : `${e.vendorMarkup >= 0 ? "+" : ""}${Math.ceil(e.vendorMarkup * 100 * 100 - 1e-10) / 100}%`), u = P(() => {
      if (e.networkFee === null || e.networkFee === void 0)
        return !0;
      const z = Number(e.networkFee) / 10 ** e.cryptoAmount.decimals, m = 10 ** Math.min(6, e.cryptoAmount.decimals);
      return Math.round(z * m) / m === 0;
    }), c = P(() => {
      if (d.value === null || a.value === null)
        return null;
      const z = 1 / d.value, M = 1 / a.value;
      return (z - M) / M;
    }), v = P(() => c.value === null ? !1 : c.value >= L1 || e.vendorMarkup && e.vendorMarkup < 0 && c.value >= e.vendorMarkup + L1), g = P(() => c.value === null ? null : `${Math.round(Math.abs(c.value) * 100 * 10) / 10}%`);
    function f() {
      const z = J("PaymentInfoLine");
      return c.value === null || g.value === null || Math.abs(c.value) < L1 && !v.value ? null : c.value < 0 && v.value ? z(
        "Your actual discount is approx. {formattedRateDeviation} compared to the current market rate (coingecko.com).",
        { formattedRateDeviation: g.value }
      ) : c.value > 0 ? z(
        "You are paying approx. {formattedRateDeviation} more than at the current market rate (coingecko.com).",
        { formattedRateDeviation: g.value }
      ) : z(
        "You are paying approx. {formattedRateDeviation} less than at the current market rate (coingecko.com).",
        { formattedRateDeviation: g.value }
      );
    }
    B(() => e.cryptoAmount.currency, b), B(() => e.fiatAmount && e.fiatAmount.currency, b);
    async function b() {
      window.clearTimeout(i.value);
      const z = e.cryptoAmount.currency.toLowerCase(), M = e.fiatAmount ? e.fiatAmount.currency.toLowerCase() : null;
      if (!e.fiatAmount || !M || !Object.values(x1).includes(M) || !Object.values(d1).includes(z)) {
        a.value = null;
        return;
      } else {
        const { [z]: { [M]: m } } = await nt([z], [M]);
        a.value = m || null;
      }
      i.value = window.setTimeout(
        () => b(),
        H3
      );
    }
    function C(z) {
      s.value = Date.now(), z && b();
    }
    return {
      PaymentInfoLineThemes: U1,
      TooltipThemes: M1,
      timer$: n,
      priceTooltip$: o,
      lastTooltipToggle: s,
      originDomain: r,
      effectiveRate: d,
      formattedVendorMarkup: p,
      isFormattedNetworkFeeZero: u,
      isBadRate: v,
      rateInfo: f,
      onPriceTooltipToggle: C
    };
  },
  components: {
    Account: Q1,
    Timer: P3,
    Amount: E1,
    FiatAmount: Ee,
    Tooltip: T1,
    AlertTriangleIcon: Me,
    ArrowRightSmallIcon: Oo,
    I18n: Y1
  }
});
const U3 = (e) => (l1("data-v-d82993c8"), e = e(), r1(), e), j3 = { class: "price-breakdown" }, W3 = { key: 0 }, G3 = { key: 1 }, q3 = { class: "free-service-info info" }, K3 = /* @__PURE__ */ U3(() => /* @__PURE__ */ $("hr", null, null, -1)), Q3 = { class: "total" }, X3 = {
  key: 1,
  class: "network-fee-info info"
}, Y3 = { class: "arrow-runway" };
function Z3(e, t, n, o, a, i) {
  const s = O("Amount"), l = O("AlertTriangleIcon"), r = O("FiatAmount"), d = O("I18n"), p = O("Tooltip"), u = O("ArrowRightSmallIcon"), c = O("Account"), v = O("Timer");
  return y(), w("div", {
    class: V(["info-line", { "inverse-theme": e.theme === e.PaymentInfoLineThemes.INVERSE }])
  }, [
    $("div", {
      class: "amounts",
      onMouseenter: t[3] || (t[3] = (g) => e.priceTooltip$ && e.priceTooltip$.show()),
      onMouseleave: t[4] || (t[4] = (g) => e.priceTooltip$ && e.priceTooltip$.hide()),
      onClick: t[5] || (t[5] = (g) => e.priceTooltip$ && Date.now() - e.lastTooltipToggle > 200 && e.priceTooltip$.toggle())
    }, [
      j(s, {
        currency: e.cryptoAmount.currency,
        amount: e.cryptoAmount.amount,
        currencyDecimals: e.cryptoAmount.decimals,
        minDecimals: 0,
        maxDecimals: Math.min(4, e.cryptoAmount.decimals)
      }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"]),
      e.fiatAmount ? (y(), q(p, {
        key: 0,
        ref: "priceTooltip$",
        container: e.tooltipContainer,
        preferredPosition: "bottom left",
        margin: { left: 8 },
        styles: {
          minWidth: "37rem",
          padding: "2rem",
          lineHeight: "1.3"
        },
        theme: e.theme === e.PaymentInfoLineThemes.INVERSE ? e.TooltipThemes.INVERSE : e.TooltipThemes.NORMAL,
        onShow: t[0] || (t[0] = (g) => e.onPriceTooltipToggle(!0)),
        onHide: t[1] || (t[1] = (g) => e.onPriceTooltipToggle(!1)),
        onClick: t[2] || (t[2] = o1(() => {
        }, ["stop"])),
        class: "price-tooltip"
      }, {
        trigger: K(() => [
          e.isBadRate ? (y(), q(l, { key: 0 })) : H("", !0),
          j(r, {
            currency: e.fiatAmount.currency,
            amount: e.fiatAmount.amount
          }, null, 8, ["currency", "amount"])
        ]),
        default: K(() => [
          $("div", j3, [
            $("label", null, x(e.$t("Order amount")), 1),
            j(r, {
              currency: e.fiatAmount.currency,
              amount: e.fiatAmount.amount
            }, null, 8, ["currency", "amount"]),
            e.vendorMarkup || e.vendorMarkup === 0 ? (y(), w(Z, { key: 0 }, [
              e.vendorMarkup >= 0 ? (y(), w("label", W3, x(e.$t("Vendor crypto markup")), 1)) : (y(), w("label", G3, x(e.$t("Vendor crypto discount")), 1)),
              $("div", null, x(e.formattedVendorMarkup), 1)
            ], 64)) : H("", !0),
            $("label", {
              class: V({ "nq-orange": e.isBadRate })
            }, x(e.$t("Effective rate")), 3),
            e.effectiveRate ? (y(), w("div", {
              key: 1,
              class: V({ "nq-orange": e.isBadRate })
            }, [
              j(r, {
                currency: e.fiatAmount.currency,
                amount: e.effectiveRate,
                maxRelativeDeviation: 1e-4
              }, null, 8, ["currency", "amount"]),
              X(" / " + x(e.cryptoAmount.currency.toUpperCase()), 1)
            ], 2)) : H("", !0)
          ]),
          e.rateInfo() ? (y(), w("div", {
            key: 0,
            class: V([{ "nq-orange": e.isBadRate }, "rate-info info"])
          }, x(e.rateInfo()), 3)) : H("", !0),
          $("div", q3, x(e.$t("Nimiq provides this service free of charge.")), 1),
          K3,
          $("div", Q3, [
            $("label", null, x(e.$t("Total")), 1),
            j(s, {
              currency: e.cryptoAmount.currency,
              amount: e.cryptoAmount.amount,
              currencyDecimals: e.cryptoAmount.decimals,
              minDecimals: 0,
              maxDecimals: Math.min(8, e.cryptoAmount.decimals),
              showApprox: ""
            }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])
          ]),
          e.networkFee === void 0 || e.networkFee === null || Number(e.networkFee) !== 0 ? (y(), w("div", X3, [
            X(" + "),
            e.isFormattedNetworkFeeZero ? (y(), w(Z, { key: 1 }, [
              X(x(e.$t("network fee")), 1)
            ], 64)) : (y(), q(d, {
              key: 0,
              path: "{amount} suggested network fee",
              componentName: "PaymentInfoLine"
            }, {
              amount: K(() => [
                e.networkFee ? (y(), q(s, {
                  key: 0,
                  currency: e.cryptoAmount.currency,
                  amount: e.networkFee,
                  currencyDecimals: e.cryptoAmount.decimals,
                  minDecimals: 0,
                  maxDecimals: Math.min(6, e.cryptoAmount.decimals)
                }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])) : H("", !0)
              ]),
              _: 1
            }))
          ])) : H("", !0)
        ]),
        _: 1
      }, 8, ["container", "styles", "theme"])) : H("", !0)
    ], 32),
    $("div", Y3, [
      j(u)
    ]),
    j(c, {
      address: e.address,
      image: e.shopLogoUrl,
      label: e.originDomain
    }, null, 8, ["address", "image", "label"]),
    e.startTime && e.endTime ? (y(), q(v, {
      key: 0,
      ref: "timer$",
      startTime: e.startTime,
      endTime: e.endTime,
      theme: e.theme,
      tooltipProps: {
        container: e.tooltipContainer,
        margin: { right: 8 }
      }
    }, null, 8, ["startTime", "endTime", "theme", "tooltipProps"])) : H("", !0)
  ], 2);
}
const $l = /* @__PURE__ */ F(F3, [["render", Z3], ["__scopeId", "data-v-d82993c8"]]);
let Ne = null;
class Oe {
}
Oe.render = function(e, t) {
  Ne(e, t);
};
self.QrCreator = Oe;
(function(e) {
  function t(l, r, d, p) {
    var u = {}, c = e(d, r);
    c.u(l), c.J(), p = p || 0;
    var v = c.h(), g = c.h() + 2 * p;
    return u.text = l, u.level = r, u.version = d, u.O = g, u.a = function(f, b) {
      return f -= p, b -= p, 0 > f || f >= v || 0 > b || b >= v ? !1 : c.a(f, b);
    }, u;
  }
  function n(l, r, d, p, u, c, v, g, f, b) {
    function C(z, M, m, h, _, A, k) {
      z ? (l.lineTo(M + A, m + k), l.arcTo(M, m, h, _, c)) : l.lineTo(M, m);
    }
    v ? l.moveTo(r + c, d) : l.moveTo(r, d), C(g, p, d, p, u, -c, 0), C(f, p, u, r, u, 0, -c), C(b, r, u, r, d, c, 0), C(v, r, d, p, d, 0, c);
  }
  function o(l, r, d, p, u, c, v, g, f, b) {
    function C(z, M, m, h) {
      l.moveTo(z + m, M), l.lineTo(
        z,
        M
      ), l.lineTo(z, M + h), l.arcTo(z, M, z + m, M, c);
    }
    v && C(r, d, c, c), g && C(p, d, -c, c), f && C(p, u, -c, -c), b && C(r, u, c, -c);
  }
  function a(l, r) {
    var d = r.fill;
    if (typeof d == "string")
      l.fillStyle = d;
    else {
      var p = d.type, u = d.colorStops;
      if (d = d.position.map((v) => Math.round(v * r.size)), p === "linear-gradient")
        var c = l.createLinearGradient.apply(l, d);
      else if (p === "radial-gradient")
        c = l.createRadialGradient.apply(l, d);
      else
        throw Error("Unsupported fill");
      u.forEach(([v, g]) => {
        c.addColorStop(v, g);
      }), l.fillStyle = c;
    }
  }
  function i(l, r) {
    e: {
      var d = r.text, p = r.v, u = r.N, c = r.K, v = r.P;
      for (u = Math.max(1, u || 1), c = Math.min(40, c || 40); u <= c; u += 1)
        try {
          var g = t(d, p, u, v);
          break e;
        } catch {
        }
      g = void 0;
    }
    if (!g)
      return null;
    for (d = l.getContext("2d"), r.background && (d.fillStyle = r.background, d.fillRect(r.left, r.top, r.size, r.size)), p = g.O, c = r.size / p, d.beginPath(), v = 0; v < p; v += 1)
      for (u = 0; u < p; u += 1) {
        var f = d, b = r.left + u * c, C = r.top + v * c, z = v, M = u, m = g.a, h = b + c, _ = C + c, A = z - 1, k = z + 1, T = M - 1, E = M + 1, L = Math.floor(Math.min(0.5, Math.max(0, r.R)) * c), N = m(z, M), G = m(A, T), Q = m(A, M);
        A = m(A, E);
        var e1 = m(z, E);
        E = m(k, E), M = m(
          k,
          M
        ), k = m(k, T), z = m(z, T), b = Math.round(b), C = Math.round(C), h = Math.round(h), _ = Math.round(_), N ? n(f, b, C, h, _, L, !Q && !z, !Q && !e1, !M && !e1, !M && !z) : o(f, b, C, h, _, L, Q && z && G, Q && e1 && A, M && e1 && E, M && z && k);
      }
    return a(d, r), d.fill(), l;
  }
  var s = { minVersion: 1, maxVersion: 40, ecLevel: "L", left: 0, top: 0, size: 200, fill: "#000", background: null, text: "no text", radius: 0.5, quiet: 0 };
  Ne = function(l, r) {
    var d = {};
    Object.assign(d, s, l), d.N = d.minVersion, d.K = d.maxVersion, d.v = d.ecLevel, d.left = d.left, d.top = d.top, d.size = d.size, d.fill = d.fill, d.background = d.background, d.text = d.text, d.R = d.radius, d.P = d.quiet, r instanceof HTMLCanvasElement ? ((r.width !== d.size || r.height !== d.size) && (r.width = d.size, r.height = d.size), r.getContext("2d").clearRect(0, 0, r.width, r.height), i(r, d)) : (l = document.createElement("canvas"), l.width = d.size, l.height = d.size, d = i(l, d), r.appendChild(d));
  };
})(function() {
  function e(r) {
    var d = n.s(r);
    return { S: function() {
      return 4;
    }, b: function() {
      return d.length;
    }, write: function(p) {
      for (var u = 0; u < d.length; u += 1)
        p.put(d[u], 8);
    } };
  }
  function t() {
    var r = [], d = 0, p = {
      B: function() {
        return r;
      },
      c: function(u) {
        return (r[Math.floor(u / 8)] >>> 7 - u % 8 & 1) == 1;
      },
      put: function(u, c) {
        for (var v = 0; v < c; v += 1)
          p.m((u >>> c - v - 1 & 1) == 1);
      },
      f: function() {
        return d;
      },
      m: function(u) {
        var c = Math.floor(d / 8);
        r.length <= c && r.push(0), u && (r[c] |= 128 >>> d % 8), d += 1;
      }
    };
    return p;
  }
  function n(r, d) {
    function p(z, M) {
      for (var m = -1; 7 >= m; m += 1)
        if (!(-1 >= z + m || g <= z + m))
          for (var h = -1; 7 >= h; h += 1)
            -1 >= M + h || g <= M + h || (v[z + m][M + h] = 0 <= m && 6 >= m && (h == 0 || h == 6) || 0 <= h && 6 >= h && (m == 0 || m == 6) || 2 <= m && 4 >= m && 2 <= h && 4 >= h);
    }
    function u(z, M) {
      for (var m = g = 4 * r + 17, h = Array(m), _ = 0; _ < m; _ += 1) {
        h[_] = Array(m);
        for (var A = 0; A < m; A += 1)
          h[_][A] = null;
      }
      for (v = h, p(0, 0), p(g - 7, 0), p(0, g - 7), m = i.G(r), h = 0; h < m.length; h += 1)
        for (_ = 0; _ < m.length; _ += 1) {
          A = m[h];
          var k = m[_];
          if (v[A][k] == null)
            for (var T = -2; 2 >= T; T += 1)
              for (var E = -2; 2 >= E; E += 1)
                v[A + T][k + E] = T == -2 || T == 2 || E == -2 || E == 2 || T == 0 && E == 0;
        }
      for (m = 8; m < g - 8; m += 1)
        v[m][6] == null && (v[m][6] = m % 2 == 0);
      for (m = 8; m < g - 8; m += 1)
        v[6][m] == null && (v[6][m] = m % 2 == 0);
      for (m = i.w(c << 3 | M), h = 0; 15 > h; h += 1)
        _ = !z && (m >> h & 1) == 1, v[6 > h ? h : 8 > h ? h + 1 : g - 15 + h][8] = _, v[8][8 > h ? g - h - 1 : 9 > h ? 15 - h : 14 - h] = _;
      if (v[g - 8][8] = !z, 7 <= r) {
        for (m = i.A(r), h = 0; 18 > h; h += 1)
          _ = !z && (m >> h & 1) == 1, v[Math.floor(h / 3)][h % 3 + g - 8 - 3] = _;
        for (h = 0; 18 > h; h += 1)
          _ = !z && (m >> h & 1) == 1, v[h % 3 + g - 8 - 3][Math.floor(h / 3)] = _;
      }
      if (f == null) {
        for (z = l.I(r, c), m = t(), h = 0; h < b.length; h += 1)
          _ = b[h], m.put(4, 4), m.put(_.b(), i.f(4, r)), _.write(m);
        for (h = _ = 0; h < z.length; h += 1)
          _ += z[h].j;
        if (m.f() > 8 * _)
          throw Error("code length overflow. (" + m.f() + ">" + 8 * _ + ")");
        for (m.f() + 4 <= 8 * _ && m.put(0, 4); m.f() % 8 != 0; )
          m.m(!1);
        for (; !(m.f() >= 8 * _) && (m.put(236, 8), !(m.f() >= 8 * _)); )
          m.put(17, 8);
        var L = 0;
        for (_ = h = 0, A = Array(z.length), k = Array(z.length), T = 0; T < z.length; T += 1) {
          var N = z[T].j, G = z[T].o - N;
          for (h = Math.max(h, N), _ = Math.max(_, G), A[T] = Array(N), E = 0; E < A[T].length; E += 1)
            A[T][E] = 255 & m.B()[E + L];
          for (L += N, E = i.C(G), N = o(A[T], E.b() - 1).l(E), k[T] = Array(E.b() - 1), E = 0; E < k[T].length; E += 1)
            G = E + N.b() - k[T].length, k[T][E] = 0 <= G ? N.c(G) : 0;
        }
        for (E = m = 0; E < z.length; E += 1)
          m += z[E].o;
        for (m = Array(m), E = L = 0; E < h; E += 1)
          for (T = 0; T < z.length; T += 1)
            E < A[T].length && (m[L] = A[T][E], L += 1);
        for (E = 0; E < _; E += 1)
          for (T = 0; T < z.length; T += 1)
            E < k[T].length && (m[L] = k[T][E], L += 1);
        f = m;
      }
      for (z = f, m = -1, h = g - 1, _ = 7, A = 0, M = i.F(M), k = g - 1; 0 < k; k -= 2)
        for (k == 6 && --k; ; ) {
          for (T = 0; 2 > T; T += 1)
            v[h][k - T] == null && (E = !1, A < z.length && (E = (z[A] >>> _ & 1) == 1), M(h, k - T) && (E = !E), v[h][k - T] = E, --_, _ == -1 && (A += 1, _ = 7));
          if (h += m, 0 > h || g <= h) {
            h -= m, m = -m;
            break;
          }
        }
    }
    var c = a[d], v = null, g = 0, f = null, b = [], C = { u: function(z) {
      z = e(z), b.push(z), f = null;
    }, a: function(z, M) {
      if (0 > z || g <= z || 0 > M || g <= M)
        throw Error(z + "," + M);
      return v[z][M];
    }, h: function() {
      return g;
    }, J: function() {
      for (var z = 0, M = 0, m = 0; 8 > m; m += 1) {
        u(!0, m);
        var h = i.D(C);
        (m == 0 || z > h) && (z = h, M = m);
      }
      u(!1, M);
    } };
    return C;
  }
  function o(r, d) {
    if (typeof r.length > "u")
      throw Error(r.length + "/" + d);
    var p = function() {
      for (var c = 0; c < r.length && r[c] == 0; )
        c += 1;
      for (var v = Array(r.length - c + d), g = 0; g < r.length - c; g += 1)
        v[g] = r[g + c];
      return v;
    }(), u = { c: function(c) {
      return p[c];
    }, b: function() {
      return p.length;
    }, multiply: function(c) {
      for (var v = Array(u.b() + c.b() - 1), g = 0; g < u.b(); g += 1)
        for (var f = 0; f < c.b(); f += 1)
          v[g + f] ^= s.i(s.g(u.c(g)) + s.g(c.c(f)));
      return o(v, 0);
    }, l: function(c) {
      if (0 > u.b() - c.b())
        return u;
      for (var v = s.g(u.c(0)) - s.g(c.c(0)), g = Array(u.b()), f = 0; f < u.b(); f += 1)
        g[f] = u.c(f);
      for (f = 0; f < c.b(); f += 1)
        g[f] ^= s.i(s.g(c.c(f)) + v);
      return o(g, 0).l(c);
    } };
    return u;
  }
  n.s = function(r) {
    for (var d = [], p = 0; p < r.length; p++) {
      var u = r.charCodeAt(p);
      128 > u ? d.push(u) : 2048 > u ? d.push(192 | u >> 6, 128 | u & 63) : 55296 > u || 57344 <= u ? d.push(224 | u >> 12, 128 | u >> 6 & 63, 128 | u & 63) : (p++, u = 65536 + ((u & 1023) << 10 | r.charCodeAt(p) & 1023), d.push(240 | u >> 18, 128 | u >> 12 & 63, 128 | u >> 6 & 63, 128 | u & 63));
    }
    return d;
  };
  var a = { L: 1, M: 0, Q: 3, H: 2 }, i = function() {
    function r(u) {
      for (var c = 0; u != 0; )
        c += 1, u >>>= 1;
      return c;
    }
    var d = [
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
    ], p = { w: function(u) {
      for (var c = u << 10; 0 <= r(c) - r(1335); )
        c ^= 1335 << r(c) - r(1335);
      return (u << 10 | c) ^ 21522;
    }, A: function(u) {
      for (var c = u << 12; 0 <= r(c) - r(7973); )
        c ^= 7973 << r(c) - r(7973);
      return u << 12 | c;
    }, G: function(u) {
      return d[u - 1];
    }, F: function(u) {
      switch (u) {
        case 0:
          return function(c, v) {
            return (c + v) % 2 == 0;
          };
        case 1:
          return function(c) {
            return c % 2 == 0;
          };
        case 2:
          return function(c, v) {
            return v % 3 == 0;
          };
        case 3:
          return function(c, v) {
            return (c + v) % 3 == 0;
          };
        case 4:
          return function(c, v) {
            return (Math.floor(c / 2) + Math.floor(v / 3)) % 2 == 0;
          };
        case 5:
          return function(c, v) {
            return c * v % 2 + c * v % 3 == 0;
          };
        case 6:
          return function(c, v) {
            return (c * v % 2 + c * v % 3) % 2 == 0;
          };
        case 7:
          return function(c, v) {
            return (c * v % 3 + (c + v) % 2) % 2 == 0;
          };
        default:
          throw Error("bad maskPattern:" + u);
      }
    }, C: function(u) {
      for (var c = o([1], 0), v = 0; v < u; v += 1)
        c = c.multiply(o([1, s.i(v)], 0));
      return c;
    }, f: function(u, c) {
      if (u != 4 || 1 > c || 40 < c)
        throw Error("mode: " + u + "; type: " + c);
      return 10 > c ? 8 : 16;
    }, D: function(u) {
      for (var c = u.h(), v = 0, g = 0; g < c; g += 1)
        for (var f = 0; f < c; f += 1) {
          for (var b = 0, C = u.a(g, f), z = -1; 1 >= z; z += 1)
            if (!(0 > g + z || c <= g + z))
              for (var M = -1; 1 >= M; M += 1)
                0 > f + M || c <= f + M || (z != 0 || M != 0) && C == u.a(g + z, f + M) && (b += 1);
          5 < b && (v += 3 + b - 5);
        }
      for (g = 0; g < c - 1; g += 1)
        for (f = 0; f < c - 1; f += 1)
          b = 0, u.a(g, f) && (b += 1), u.a(g + 1, f) && (b += 1), u.a(g, f + 1) && (b += 1), u.a(g + 1, f + 1) && (b += 1), (b == 0 || b == 4) && (v += 3);
      for (g = 0; g < c; g += 1)
        for (f = 0; f < c - 6; f += 1)
          u.a(g, f) && !u.a(g, f + 1) && u.a(g, f + 2) && u.a(g, f + 3) && u.a(g, f + 4) && !u.a(g, f + 5) && u.a(g, f + 6) && (v += 40);
      for (f = 0; f < c; f += 1)
        for (g = 0; g < c - 6; g += 1)
          u.a(g, f) && !u.a(g + 1, f) && u.a(g + 2, f) && u.a(g + 3, f) && u.a(g + 4, f) && !u.a(g + 5, f) && u.a(g + 6, f) && (v += 40);
      for (f = b = 0; f < c; f += 1)
        for (g = 0; g < c; g += 1)
          u.a(g, f) && (b += 1);
      return v += Math.abs(100 * b / c / c - 50) / 5 * 10;
    } };
    return p;
  }(), s = function() {
    for (var r = Array(256), d = Array(256), p = 0; 8 > p; p += 1)
      r[p] = 1 << p;
    for (p = 8; 256 > p; p += 1)
      r[p] = r[p - 4] ^ r[p - 5] ^ r[p - 6] ^ r[p - 8];
    for (p = 0; 255 > p; p += 1)
      d[r[p]] = p;
    return { g: function(u) {
      if (1 > u)
        throw Error("glog(" + u + ")");
      return d[u];
    }, i: function(u) {
      for (; 0 > u; )
        u += 255;
      for (; 256 <= u; )
        u -= 255;
      return r[u];
    } };
  }(), l = function() {
    function r(u, c) {
      switch (c) {
        case a.L:
          return d[4 * (u - 1)];
        case a.M:
          return d[4 * (u - 1) + 1];
        case a.Q:
          return d[4 * (u - 1) + 2];
        case a.H:
          return d[4 * (u - 1) + 3];
      }
    }
    var d = [
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
    ], p = { I: function(u, c) {
      var v = r(u, c);
      if (typeof v > "u")
        throw Error("bad rs block @ typeNumber:" + u + "/errorCorrectLevel:" + c);
      u = v.length / 3, c = [];
      for (var g = 0; g < u; g += 1)
        for (var f = v[3 * g], b = v[3 * g + 1], C = v[3 * g + 2], z = 0; z < f; z += 1) {
          var M = C, m = {};
          m.o = b, m.j = M, c.push(m);
        }
      return c;
    } };
    return p;
  }();
  return n;
}());
const J3 = QrCreator;
var He = /* @__PURE__ */ ((e) => (e.L = "L", e.M = "M", e.H = "H", e.Q = "Q", e))(He || {});
const ei = U({
  name: "QrCode",
  props: {
    data: String,
    errorCorrection: {
      type: String,
      default: "M",
      validator: (e) => Object.values(He).includes(e)
    },
    radius: {
      type: Number,
      default: 0.5,
      validator: (e) => e >= 0 && e <= 1
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
      validator: (e) => {
        const t = (i) => typeof i == "string" && /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(i);
        if (t(e))
          return !0;
        const n = e;
        return (n.type === "linear-gradient" && n.position.length === 4 || n.type === "radial-gradient" && n.position.length === 6) && n.position.every((i) => typeof i == "number") ? n.colorStops.length >= 2 && n.colorStops.every(([i, s]) => typeof i == "number" && t(s)) : !1;
      }
    },
    background: {
      type: String,
      default: null,
      validator: (e) => e === null || /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(e)
    },
    size: {
      type: Number,
      default: 240,
      validator: (e) => e > 0
    }
  },
  setup(e, t) {
    const n = S(null);
    async function o(a = "image/png") {
      return await a1(), !e.data || !n.value ? "data:," : n.value.toDataURL(a);
    }
    return B([
      () => e.data,
      () => e.errorCorrection,
      () => e.radius,
      () => e.fill,
      () => e.background,
      () => e.size
    ], async () => {
      await a1(), !(!e.data || !n.value) && J3.render({
        text: e.data,
        radius: e.radius,
        ecLevel: e.errorCorrection,
        fill: e.fill,
        background: e.background,
        size: e.size
      }, n.value);
    }, { immediate: !0 }), t.expose({
      toDataUrl: o
    }), {
      data: e.data,
      canvas$: n
    };
  }
}), ti = {
  key: 0,
  ref: "canvas$",
  class: "qr-code"
};
function ni(e, t, n, o, a, i) {
  return e.data ? (y(), w("canvas", ti, null, 512)) : H("", !0);
}
const bl = /* @__PURE__ */ F(ei, [["render", ni]]);
class D {
  constructor(t, n, o, a, i) {
    this._legacyCanvasSize = D.DEFAULT_CANVAS_SIZE, this._preferredCamera = "environment", this._maxScansPerSecond = 25, this._lastScanTimestamp = -1, this._destroyed = this._flashOn = this._paused = this._active = !1, this.$video = t, this.$canvas = document.createElement("canvas"), o && typeof o == "object" ? this._onDecode = n : (console.warn(o || a || i ? "You're using a deprecated version of the QrScanner constructor which will be removed in the future" : "Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), this._legacyOnDecode = n), n = typeof o == "object" ? o : {}, this._onDecodeError = n.onDecodeError || (typeof o == "function" ? o : this._onDecodeError), this._calculateScanRegion = n.calculateScanRegion || (typeof a == "function" ? a : this._calculateScanRegion), this._preferredCamera = n.preferredCamera || i || this._preferredCamera, this._legacyCanvasSize = typeof o == "number" ? o : typeof a == "number" ? a : this._legacyCanvasSize, this._maxScansPerSecond = n.maxScansPerSecond || this._maxScansPerSecond, this._onPlay = this._onPlay.bind(this), this._onLoadedMetaData = this._onLoadedMetaData.bind(this), this._onVisibilityChange = this._onVisibilityChange.bind(this), this._updateOverlay = this._updateOverlay.bind(this), t.disablePictureInPicture = !0, t.playsInline = !0, t.muted = !0;
    let s = !1;
    if (t.hidden && (t.hidden = !1, s = !0), document.body.contains(t) || (document.body.appendChild(t), s = !0), o = t.parentElement, n.highlightScanRegion || n.highlightCodeOutline) {
      if (a = !!n.overlay, this.$overlay = n.overlay || document.createElement("div"), i = this.$overlay.style, i.position = "absolute", i.display = "none", i.pointerEvents = "none", this.$overlay.classList.add("scan-region-highlight"), !a && n.highlightScanRegion) {
        this.$overlay.innerHTML = '<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';
        try {
          this.$overlay.firstElementChild.animate({ transform: [
            "scale(.98)",
            "scale(1.01)"
          ] }, { duration: 400, iterations: 1 / 0, direction: "alternate", easing: "ease-in-out" });
        } catch {
        }
        o.insertBefore(this.$overlay, this.$video.nextSibling);
      }
      n.highlightCodeOutline && (this.$overlay.insertAdjacentHTML("beforeend", '<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'), this.$codeOutlineHighlight = this.$overlay.lastElementChild);
    }
    this._scanRegion = this._calculateScanRegion(t), requestAnimationFrame(() => {
      let l = window.getComputedStyle(t);
      l.display === "none" && (t.style.setProperty("display", "block", "important"), s = !0), l.visibility !== "visible" && (t.style.setProperty("visibility", "visible", "important"), s = !0), s && (console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."), t.style.opacity = "0", t.style.width = "0", t.style.height = "0", this.$overlay && this.$overlay.parentElement && this.$overlay.parentElement.removeChild(this.$overlay), delete this.$overlay, delete this.$codeOutlineHighlight), this.$overlay && this._updateOverlay();
    }), t.addEventListener("play", this._onPlay), t.addEventListener("loadedmetadata", this._onLoadedMetaData), document.addEventListener("visibilitychange", this._onVisibilityChange), window.addEventListener("resize", this._updateOverlay), this._qrEnginePromise = D.createQrEngine();
  }
  static set WORKER_PATH(t) {
    console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.");
  }
  static async hasCamera() {
    try {
      return !!(await D.listCameras(!1)).length;
    } catch {
      return !1;
    }
  }
  static async listCameras(t = !1) {
    if (!navigator.mediaDevices)
      return [];
    let n = async () => (await navigator.mediaDevices.enumerateDevices()).filter((a) => a.kind === "videoinput"), o;
    try {
      t && (await n()).every((a) => !a.label) && (o = await navigator.mediaDevices.getUserMedia({ audio: !1, video: !0 }));
    } catch {
    }
    try {
      return (await n()).map((a, i) => ({ id: a.deviceId, label: a.label || (i === 0 ? "Default Camera" : `Camera ${i + 1}`) }));
    } finally {
      o && (console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"), D._stopVideoStream(o));
    }
  }
  async hasFlash() {
    let t;
    try {
      if (this.$video.srcObject) {
        if (!(this.$video.srcObject instanceof MediaStream))
          return !1;
        t = this.$video.srcObject;
      } else
        t = (await this._getCameraStream()).stream;
      return "torch" in t.getVideoTracks()[0].getSettings();
    } catch {
      return !1;
    } finally {
      t && t !== this.$video.srcObject && (console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"), D._stopVideoStream(t));
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
      } catch (t) {
        throw this._flashOn = !1, t;
      }
  }
  async turnFlashOff() {
    this._flashOn && (this._flashOn = !1, await this._restartVideoStream());
  }
  destroy() {
    this.$video.removeEventListener("loadedmetadata", this._onLoadedMetaData), this.$video.removeEventListener("play", this._onPlay), document.removeEventListener(
      "visibilitychange",
      this._onVisibilityChange
    ), window.removeEventListener("resize", this._updateOverlay), this._destroyed = !0, this._flashOn = !1, this.stop(), D._postWorkerMessage(this._qrEnginePromise, "close");
  }
  async start() {
    if (this._destroyed)
      throw Error("The QR scanner can not be started as it had been destroyed.");
    if ((!this._active || this._paused) && (window.location.protocol !== "https:" && console.warn("The camera stream is only accessible if the page is transferred via https."), this._active = !0, !document.hidden))
      if (this._paused = !1, this.$video.srcObject)
        await this.$video.play();
      else
        try {
          let { stream: t, facingMode: n } = await this._getCameraStream();
          !this._active || this._paused ? D._stopVideoStream(t) : (this._setVideoMirror(n), this.$video.srcObject = t, await this.$video.play(), this._flashOn && (this._flashOn = !1, this.turnFlashOn().catch(() => {
          })));
        } catch (t) {
          if (!this._paused)
            throw this._active = !1, t;
        }
  }
  stop() {
    this.pause(), this._active = !1;
  }
  async pause(t = !1) {
    if (this._paused = !0, !this._active)
      return !0;
    this.$video.pause(), this.$overlay && (this.$overlay.style.display = "none");
    let n = () => {
      this.$video.srcObject instanceof MediaStream && (D._stopVideoStream(this.$video.srcObject), this.$video.srcObject = null);
    };
    return t ? (n(), !0) : (await new Promise((o) => setTimeout(o, 300)), this._paused ? (n(), !0) : !1);
  }
  async setCamera(t) {
    t !== this._preferredCamera && (this._preferredCamera = t, await this._restartVideoStream());
  }
  static async scanImage(t, n, o, a, i = !1, s = !1) {
    let l, r = !1;
    n && ("scanRegion" in n || "qrEngine" in n || "canvas" in n || "disallowCanvasResizing" in n || "alsoTryWithoutScanRegion" in n || "returnDetailedScanResult" in n) ? (l = n.scanRegion, o = n.qrEngine, a = n.canvas, i = n.disallowCanvasResizing || !1, s = n.alsoTryWithoutScanRegion || !1, r = !0) : console.warn(n || o || a || i || s ? "You're using a deprecated api for scanImage which will be removed in the future." : "Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), n = !!o;
    try {
      let d, p;
      [o, d] = await Promise.all([o || D.createQrEngine(), D._loadImage(t)]), [a, p] = D._drawToCanvas(d, l, a, i);
      let u;
      if (o instanceof Worker) {
        let c = o;
        n || D._postWorkerMessageSync(c, "inversionMode", "both"), u = await new Promise((v, g) => {
          let f, b, C, z = -1;
          b = (m) => {
            m.data.id === z && (c.removeEventListener("message", b), c.removeEventListener("error", C), clearTimeout(f), m.data.data !== null ? v({ data: m.data.data, cornerPoints: D._convertPoints(m.data.cornerPoints, l) }) : g(D.NO_QR_CODE_FOUND));
          }, C = (m) => {
            c.removeEventListener("message", b), c.removeEventListener("error", C), clearTimeout(f), g("Scanner error: " + (m ? m.message || m : "Unknown Error"));
          }, c.addEventListener("message", b), c.addEventListener("error", C), f = setTimeout(() => C("timeout"), 1e4);
          let M = p.getImageData(0, 0, a.width, a.height);
          z = D._postWorkerMessageSync(c, "decode", M, [M.data.buffer]);
        });
      } else
        u = await Promise.race([new Promise((c, v) => window.setTimeout(() => v("Scanner error: timeout"), 1e4)), (async () => {
          try {
            var [c] = await o.detect(a);
            if (!c)
              throw D.NO_QR_CODE_FOUND;
            return { data: c.rawValue, cornerPoints: D._convertPoints(c.cornerPoints, l) };
          } catch (v) {
            if (c = v.message || v, /not implemented|service unavailable/.test(c))
              return D._disableBarcodeDetector = !0, D.scanImage(t, { scanRegion: l, canvas: a, disallowCanvasResizing: i, alsoTryWithoutScanRegion: s });
            throw `Scanner error: ${c}`;
          }
        })()]);
      return r ? u : u.data;
    } catch (d) {
      if (!l || !s)
        throw d;
      let p = await D.scanImage(t, { qrEngine: o, canvas: a, disallowCanvasResizing: i });
      return r ? p : p.data;
    } finally {
      n || D._postWorkerMessage(o, "close");
    }
  }
  setGrayscaleWeights(t, n, o, a = !0) {
    D._postWorkerMessage(this._qrEnginePromise, "grayscaleWeights", {
      red: t,
      green: n,
      blue: o,
      useIntegerApproximation: a
    });
  }
  setInversionMode(t) {
    D._postWorkerMessage(this._qrEnginePromise, "inversionMode", t);
  }
  static async createQrEngine(t) {
    if (t && console.warn("Specifying a worker path is not required and not supported anymore."), t = () => import("__PUBLIC_PATH_MARKER__" + (window.__dynamicImportHandler__ || function(o) {
      return o;
    })("../node_modules/qr-scanner/qr-scanner-worker.min.js") + "__PUBLIC_PATH_MARKER__").then((o) => o.createWorker()), !(!D._disableBarcodeDetector && "BarcodeDetector" in window && BarcodeDetector.getSupportedFormats && (await BarcodeDetector.getSupportedFormats()).includes("qr_code")))
      return t();
    let n = navigator.userAgentData;
    return n && n.brands.some(({ brand: o }) => /Chromium/i.test(o)) && /mac ?OS/i.test(n.platform) && await n.getHighEntropyValues(["architecture", "platformVersion"]).then(({ architecture: o, platformVersion: a }) => /arm/i.test(o || "arm") && 13 <= parseInt(a || "13")).catch(() => !0) ? t() : new BarcodeDetector({ formats: ["qr_code"] });
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
  _calculateScanRegion(t) {
    let n = Math.round(0.6666666666666666 * Math.min(t.videoWidth, t.videoHeight));
    return { x: Math.round((t.videoWidth - n) / 2), y: Math.round((t.videoHeight - n) / 2), width: n, height: n, downScaledWidth: this._legacyCanvasSize, downScaledHeight: this._legacyCanvasSize };
  }
  _updateOverlay() {
    requestAnimationFrame(() => {
      if (this.$overlay) {
        var t = this.$video, n = t.videoWidth, o = t.videoHeight, a = t.offsetWidth, i = t.offsetHeight, s = t.offsetLeft, l = t.offsetTop, r = window.getComputedStyle(t), d = r.objectFit, p = n / o, u = a / i;
        switch (d) {
          case "none":
            var c = n, v = o;
            break;
          case "fill":
            c = a, v = i;
            break;
          default:
            (d === "cover" ? p > u : p < u) ? (v = i, c = v * p) : (c = a, v = c / p), d === "scale-down" && (c = Math.min(c, n), v = Math.min(v, o));
        }
        var [g, f] = r.objectPosition.split(" ").map((C, z) => {
          const M = parseFloat(C);
          return C.endsWith("%") ? (z ? i - v : a - c) * M / 100 : M;
        });
        r = this._scanRegion.width || n, u = this._scanRegion.height || o, d = this._scanRegion.x || 0;
        var b = this._scanRegion.y || 0;
        p = this.$overlay.style, p.width = `${r / n * c}px`, p.height = `${u / o * v}px`, p.top = `${l + f + b / o * v}px`, o = /scaleX\(-1\)/.test(t.style.transform), p.left = `${s + (o ? a - g - c : g) + (o ? n - d - r : d) / n * c}px`, p.transform = t.style.transform;
      }
    });
  }
  static _convertPoints(t, n) {
    if (!n)
      return t;
    let o = n.x || 0, a = n.y || 0, i = n.width && n.downScaledWidth ? n.width / n.downScaledWidth : 1;
    n = n.height && n.downScaledHeight ? n.height / n.downScaledHeight : 1;
    for (let s of t)
      s.x = s.x * i + o, s.y = s.y * n + a;
    return t;
  }
  _scanFrame() {
    !this._active || this.$video.paused || this.$video.ended || ("requestVideoFrameCallback" in this.$video ? this.$video.requestVideoFrameCallback.bind(this.$video) : requestAnimationFrame)(async () => {
      if (!(1 >= this.$video.readyState)) {
        var t = Date.now() - this._lastScanTimestamp, n = 1e3 / this._maxScansPerSecond;
        t < n && await new Promise((a) => setTimeout(a, n - t)), this._lastScanTimestamp = Date.now();
        try {
          var o = await D.scanImage(this.$video, { scanRegion: this._scanRegion, qrEngine: this._qrEnginePromise, canvas: this.$canvas });
        } catch (a) {
          if (!this._active)
            return;
          this._onDecodeError(a);
        }
        !D._disableBarcodeDetector || await this._qrEnginePromise instanceof Worker || (this._qrEnginePromise = D.createQrEngine()), o ? (this._onDecode ? this._onDecode(o) : this._legacyOnDecode && this._legacyOnDecode(o.data), this.$codeOutlineHighlight && (clearTimeout(this._codeOutlineHighlightRemovalTimeout), this._codeOutlineHighlightRemovalTimeout = void 0, this.$codeOutlineHighlight.setAttribute("viewBox", `${this._scanRegion.x || 0} ${this._scanRegion.y || 0} ${this._scanRegion.width || this.$video.videoWidth} ${this._scanRegion.height || this.$video.videoHeight}`), this.$codeOutlineHighlight.firstElementChild.setAttribute(
          "points",
          o.cornerPoints.map(({ x: a, y: i }) => `${a},${i}`).join(" ")
        ), this.$codeOutlineHighlight.style.display = "")) : this.$codeOutlineHighlight && !this._codeOutlineHighlightRemovalTimeout && (this._codeOutlineHighlightRemovalTimeout = setTimeout(() => this.$codeOutlineHighlight.style.display = "none", 100));
      }
      this._scanFrame();
    });
  }
  _onDecodeError(t) {
    t !== D.NO_QR_CODE_FOUND && console.log(t);
  }
  async _getCameraStream() {
    if (!navigator.mediaDevices)
      throw "Camera not found.";
    let t = /^(environment|user)$/.test(this._preferredCamera) ? "facingMode" : "deviceId", n = [{ width: { min: 1024 } }, { width: { min: 768 } }, {}], o = n.map((a) => Object.assign({}, a, { [t]: { exact: this._preferredCamera } }));
    for (let a of [...o, ...n])
      try {
        let i = await navigator.mediaDevices.getUserMedia({ video: a, audio: !1 }), s = this._getFacingMode(i) || (a.facingMode ? this._preferredCamera : this._preferredCamera === "environment" ? "user" : "environment");
        return { stream: i, facingMode: s };
      } catch {
      }
    throw "Camera not found.";
  }
  async _restartVideoStream() {
    let t = this._paused;
    await this.pause(!0) && !t && this._active && await this.start();
  }
  static _stopVideoStream(t) {
    for (let n of t.getTracks())
      n.stop(), t.removeTrack(n);
  }
  _setVideoMirror(t) {
    this.$video.style.transform = "scaleX(" + (t === "user" ? -1 : 1) + ")";
  }
  _getFacingMode(t) {
    return (t = t.getVideoTracks()[0]) ? /rear|back|environment/i.test(t.label) ? "environment" : /front|user|face/i.test(t.label) ? "user" : null : null;
  }
  static _drawToCanvas(t, n, o, a = !1) {
    o = o || document.createElement("canvas");
    let i = n && n.x ? n.x : 0, s = n && n.y ? n.y : 0, l = n && n.width ? n.width : t.videoWidth || t.width, r = n && n.height ? n.height : t.videoHeight || t.height;
    return a || (a = n && n.downScaledWidth ? n.downScaledWidth : l, n = n && n.downScaledHeight ? n.downScaledHeight : r, o.width !== a && (o.width = a), o.height !== n && (o.height = n)), n = o.getContext("2d", { alpha: !1 }), n.imageSmoothingEnabled = !1, n.drawImage(t, i, s, l, r, 0, 0, o.width, o.height), [o, n];
  }
  static async _loadImage(t) {
    if (t instanceof Image)
      return await D._awaitImageLoad(t), t;
    if (t instanceof HTMLVideoElement || t instanceof HTMLCanvasElement || t instanceof SVGImageElement || "OffscreenCanvas" in window && t instanceof OffscreenCanvas || "ImageBitmap" in window && t instanceof ImageBitmap)
      return t;
    if (t instanceof File || t instanceof Blob || t instanceof URL || typeof t == "string") {
      let n = new Image();
      n.src = t instanceof File || t instanceof Blob ? URL.createObjectURL(t) : t.toString();
      try {
        return await D._awaitImageLoad(n), n;
      } finally {
        (t instanceof File || t instanceof Blob) && URL.revokeObjectURL(n.src);
      }
    } else
      throw "Unsupported image type.";
  }
  static async _awaitImageLoad(t) {
    t.complete && t.naturalWidth !== 0 || await new Promise((n, o) => {
      let a = (i) => {
        t.removeEventListener("load", a), t.removeEventListener("error", a), i instanceof ErrorEvent ? o("Image load error") : n();
      };
      t.addEventListener("load", a), t.addEventListener("error", a);
    });
  }
  static async _postWorkerMessage(t, n, o, a) {
    return D._postWorkerMessageSync(await t, n, o, a);
  }
  static _postWorkerMessageSync(t, n, o, a) {
    if (!(t instanceof Worker))
      return -1;
    let i = D._workerMessageId++;
    return t.postMessage({ id: i, type: n, data: o }, a), i;
  }
}
D.DEFAULT_CANVAS_SIZE = 400;
D.NO_QR_CODE_FOUND = "No QR code found";
D._disableBarcodeDetector = !1;
D._workerMessageId = 0;
const le = D, ai = U({
  name: "QrScanner",
  props: {
    reportFrequency: {
      type: Number,
      default: 7e3
    },
    validate: Function
  },
  methods: { $t: J("QrScanner") },
  setup(e, t) {
    const n = S(null), o = S(null), a = S(null), i = S(!1), s = S(!0), l = Z1.isMobile(), r = Z1.detectBrowser();
    let d = null, p = "", u = 0, c = null;
    n1(async () => {
      d = new le(o.value, (h) => m(h), {}), o.value.addEventListener("canplay", () => o.value.classList.add("ready")), window.addEventListener("resize", C), le.hasCamera().then((h) => s.value = h), z() && (v(), C());
    }), c1(() => {
      g(), d && d.destroy(), window.removeEventListener("resize", C);
    });
    async function v() {
      try {
        await d.start(), i.value = !1, c && (window.clearInterval(c), c = null);
      } catch (h) {
        i.value = !0, t.emit("error", h), c || (c = window.setInterval(() => v(), 3e3));
      }
      return !i.value;
    }
    function g() {
      !d || (d.stop(), c && (window.clearInterval(c), c = null));
    }
    function f(h, _, A) {
      d && d.setGrayscaleWeights(h, _, A);
    }
    function b(h) {
      d && d.setInversionMode(h);
    }
    function C() {
      requestAnimationFrame(() => {
        if (!n.value || !a.value)
          return;
        const h = n.value.offsetHeight, _ = n.value.offsetWidth, A = Math.min(h, _);
        if (A === 0)
          return;
        const k = Math.ceil(2 / 3 * A);
        a.value.style.width = k + "px", a.value.style.height = k + "px", a.value.style.top = (h - k) / 2 + "px", a.value.style.left = (_ - k) / 2 + "px";
      });
    }
    function z() {
      return !!n.value && n.value.offsetWidth > 0;
    }
    function M() {
      t.emit("cancel");
    }
    function m(h) {
      h.data === p && Date.now() - u < e.reportFrequency || e.validate && !e.validate(h.data) || (p = h.data, u = Date.now(), t.emit("result", h));
    }
    return t.expose({
      start: v,
      stop: g,
      setGrayscaleWeights: f,
      setInversionMode: b,
      repositionOverlay: C
    }), {
      root$: n,
      video$: o,
      overlay$: a,
      cameraAccessFailed: i,
      hasCamera: s,
      isMobileOrTablet: l,
      browser: r,
      cancel: M
    };
  },
  components: { I18n: Y1 }
});
const I1 = (e) => (l1("data-v-f23a72ce"), e = e(), r1(), e), oi = {
  class: "qr-scanner nq-blue-bg",
  ref: "root$"
}, si = {
  ref: "video$",
  muted: "",
  autoplay: "",
  playsinline: "",
  width: "600",
  height: "600"
}, ii = /* @__PURE__ */ I1(() => /* @__PURE__ */ $("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 238 238"
}, [
  /* @__PURE__ */ $("path", {
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "4",
    d: "M31.3 2H10a8 8 0 0 0-8 8v21.3M206.8 2H228a8 8 0 0 1 8 8v21.3m0 175.4V228a8 8 0 0 1-8 8h-21.3m-175.4 0H10a8 8 0 0 1-8-8v-21.3"
  })
], -1)), li = {
  key: 0,
  class: "camera-access-failed"
}, ri = {
  key: 0,
  class: "camera-access-failed-warning"
}, ci = { key: 1 }, di = { class: "camera-access-failed-warning" }, ui = { key: 0 }, hi = { key: 0 }, fi = /* @__PURE__ */ I1(() => /* @__PURE__ */ $("span", { class: "browser-menu-icon" }, null, -1)), mi = /* @__PURE__ */ I1(() => /* @__PURE__ */ $("div", { class: "browser-menu-arrow" }, null, -1)), pi = {
  key: 1,
  class: "access-denied-instructions"
}, vi = {
  key: 1,
  class: "access-denied-instructions"
}, gi = /* @__PURE__ */ I1(() => /* @__PURE__ */ $("b", null, "Safari", -1)), yi = {
  key: 0,
  class: "camera-icon-chrome"
}, Mi = {
  key: 1,
  class: "camera-icon-firefox"
}, _i = { key: 2 };
function wi(e, t, n, o, a, i) {
  const s = O("I18n");
  return y(), w("div", oi, [
    $("video", si, null, 512),
    $("div", {
      ref: "overlay$",
      class: V(["overlay", { inactive: e.cameraAccessFailed }])
    }, [
      Y(e.$slots, "default", {}, () => [
        ii
      ], !0)
    ], 2),
    $("button", {
      class: "nq-button-s inverse cancel-button",
      onClick: t[0] || (t[0] = (...l) => e.cancel && e.cancel(...l))
    }, x(e.$t("Cancel")), 1),
    j(W1, { name: "fade" }, {
      default: K(() => [
        e.cameraAccessFailed ? (y(), w("div", li, [
          e.hasCamera ? (y(), w("div", ci, [
            $("div", di, x(e.$t("Unblock the camera for this website to scan QR codes.")), 1),
            e.isMobileOrTablet ? (y(), w("div", ui, [
              e.browser === "chrome" ? (y(), w("div", hi, [
                j(s, {
                  path: "Click on {icon} and go to\\nSettings > Site Settings > Camera",
                  tag: "div",
                  componentName: "QrScanner",
                  class: "access-denied-instructions"
                }, {
                  icon: K(() => [
                    fi
                  ]),
                  _: 1
                }),
                mi
              ])) : (y(), w("div", pi, x(e.$t("Grant camera access when asked.")), 1))
            ])) : (y(), w("div", vi, [
              e.browser === "safari" ? (y(), q(s, {
                key: 0,
                path: "Click on {safari} and go to\\nSettings for this Website > Camera",
                tag: "div",
                componentName: "QrScanner"
              }, {
                safari: K(() => [
                  gi
                ]),
                _: 1
              })) : (y(), q(s, {
                key: 1,
                path: "Click on {icon} in the URL bar.",
                tag: "div",
                componentName: "QrScanner"
              }, {
                icon: K(() => [
                  e.browser === "chrome" ? (y(), w("span", yi)) : e.browser === "firefox" ? (y(), w("span", Mi)) : (y(), w("span", _i, x(e.$t("the camera icon")), 1))
                ]),
                _: 1
              }))
            ]))
          ])) : (y(), w("div", ri, x(e.$t("Your device does not have an accessible camera.")), 1))
        ])) : H("", !0)
      ]),
      _: 1
    })
  ], 512);
}
const Sl = /* @__PURE__ */ F(ai, [["render", wi], ["__scopeId", "data-v-f23a72ce"]]);
var Fe = /* @__PURE__ */ ((e) => (e.CHANGED = "changed", e))(Fe || {});
const zi = U({
  name: "SelectBar",
  emits: Object.values(Fe),
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
  setup(e, t) {
    const n = P(() => {
      var l;
      return (l = a.value) == null ? void 0 : l.value;
    }), o = P(() => e.options.sort((l, r) => l.index - r.index)), a = S(e.selectedValue ? o.value.find((l) => l.value === e.selectedValue) : o.value[0]);
    function i(l) {
      return l.index <= a.value.index ? a.value.color : "nq-highlight-bg";
    }
    B(a, s);
    function s(l) {
      t.emit("changed", l.value);
    }
    return t.expose({ value: n }), {
      sortedOptions: o,
      selectedOption: a,
      getColor: i
    };
  }
});
const $i = { class: "select-bar" }, bi = ["value", "name", "id"], Si = ["for"];
function Ci(e, t, n, o, a, i) {
  return y(), w("div", $i, [
    (y(!0), w(Z, null, t1(e.sortedOptions, (s) => (y(), w("div", {
      key: s.value
    }, [
      j1($("input", {
        value: s,
        type: "radio",
        name: e.name,
        id: s.value.toString(),
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.selectedOption = l)
      }, null, 8, bi), [
        [Qe, e.selectedOption]
      ]),
      $("label", {
        for: s.value.toString(),
        class: V(["nq-label", e.getColor(s)])
      }, x(s.text), 11, Si)
    ]))), 128))
  ]);
}
const Cl = /* @__PURE__ */ F(zi, [["render", Ci], ["__scopeId", "data-v-4f36c277"]]), Ai = {};
const ki = { class: "small-page nq-card" };
function Ei(e, t, n, o, a, i) {
  return y(), w("div", ki, [
    Y(e.$slots, "default", {}, void 0, !0)
  ]);
}
const Al = /* @__PURE__ */ F(Ai, [["render", Ei], ["__scopeId", "data-v-00e2ad62"]]);
export {
  Q1 as Account,
  dl as AccountDetails,
  es as AccountList,
  ul as AccountRing,
  hl as AccountSelector,
  Wt as AddressDisplay,
  fl as AddressInput,
  Me as AlertTriangleIcon,
  E1 as Amount,
  Ls as AmountInput,
  ml as AmountWithFee,
  No as ArrowLeftIcon,
  Ii as ArrowLeftSmallIcon,
  Li as ArrowRightIcon,
  Oo as ArrowRightSmallIcon,
  pl as BottomOverlay,
  Ho as CaretRightSmallIcon,
  vl as Carousel,
  xi as CashlinkIcon,
  Di as CashlinkSmallIcon,
  Ri as CashlinkXSmallIcon,
  Bi as CheckmarkIcon,
  Vi as CheckmarkSmallIcon,
  gl as CircleSpinner,
  _e as CloseButton,
  Fo as CloseIcon,
  Pi as ContactsIcon,
  Ni as CopyIcon,
  Ot as Copyable,
  yl as CopyableField,
  Oi as CrossIcon,
  Hi as DownloadIcon,
  Fi as FaceNeutralIcon,
  Ui as FaceSadIcon,
  Ee as FiatAmount,
  ji as GearIcon,
  Wi as HexagonIcon,
  fe as Identicon,
  Gi as InfoCircleIcon,
  qi as InfoCircleSmallIcon,
  Ki as KeysIcon,
  Ct as LabelInput,
  Qi as LedgerIcon,
  Ml as LoadingSpinner,
  Xi as LockLockedIcon,
  Yi as LockUnlockedIcon,
  Zi as LoginIcon,
  Ji as MenuDotsIcon,
  _l as PageBody,
  wl as PageFooter,
  zl as PageHeader,
  $l as PaymentInfoLine,
  el as PlusCircleIcon,
  bl as QrCode,
  tl as QrCodeIcon,
  Sl as QrScanner,
  nl as QuestionmarkIcon,
  al as ScanQrCodeIcon,
  Cl as SelectBar,
  ol as SettingsIcon,
  Al as SmallPage,
  sl as StopwatchIcon,
  P3 as Timer,
  T1 as Tooltip,
  il as TransferIcon,
  ll as UnderPaymentIcon,
  cl as ViewIcon,
  rl as ViewOffIcon
};
//# sourceMappingURL=vue3-components.js.map
