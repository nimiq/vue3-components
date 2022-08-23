var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, computed, ref, watch, openBlock, createElementBlock, createElementVNode, normalizeClass, createTextVNode, toDisplayString, nextTick, withModifiers, withDirectives, normalizeStyle, vModelText, resolveComponent, createBlock, createCommentVNode, createVNode, createStaticVNode, onMounted, onBeforeUnmount, renderSlot, pushScopeId, popScopeId, resolveDynamicComponent, withCtx, Fragment, renderList, h, onUnmounted, Transition, onBeforeUpdate, mergeProps, vModelRadio } from "vue";
class BrowserDetection {
  static getBrowserInfo() {
    return {
      browser: BrowserDetection.detectBrowser(),
      version: BrowserDetection.detectVersion(),
      isMobile: BrowserDetection.isMobile()
    };
  }
  static isMobile() {
    return /i?Phone|iP(ad|od)|Android|BlackBerry|Opera Mini|WPDesktop|Mobi(le)?|Silk/i.test(navigator.userAgent);
  }
  static detectBrowser() {
    if (BrowserDetection._detectedBrowser) {
      return BrowserDetection._detectedBrowser;
    }
    const ua = navigator.userAgent;
    if (/Edge\//i.test(ua)) {
      BrowserDetection._detectedBrowser = BrowserDetection.Browser.EDGE;
    } else if (/(Opera|OPR)\//i.test(ua)) {
      BrowserDetection._detectedBrowser = BrowserDetection.Browser.OPERA;
    } else if (/Firefox\//i.test(ua)) {
      BrowserDetection._detectedBrowser = BrowserDetection.Browser.FIREFOX;
    } else if (/Chrome\//i.test(ua)) {
      BrowserDetection._detectedBrowser = navigator.plugins.length === 0 && navigator.mimeTypes.length === 0 && !BrowserDetection.isMobile() ? BrowserDetection.Browser.BRAVE : BrowserDetection.Browser.CHROME;
    } else if (/^((?!chrome|android).)*safari/i.test(ua)) {
      BrowserDetection._detectedBrowser = BrowserDetection.Browser.SAFARI;
    } else {
      BrowserDetection._detectedBrowser = BrowserDetection.Browser.UNKNOWN;
    }
    return BrowserDetection._detectedBrowser;
  }
  static detectVersion() {
    if (typeof BrowserDetection._detectedVersion !== "undefined") {
      return BrowserDetection._detectedVersion;
    }
    let regex;
    switch (BrowserDetection.detectBrowser()) {
      case BrowserDetection.Browser.EDGE:
        regex = /Edge\/(\S+)/i;
        break;
      case BrowserDetection.Browser.OPERA:
        regex = /(Opera|OPR)\/(\S+)/i;
        break;
      case BrowserDetection.Browser.FIREFOX:
        regex = /Firefox\/(\S+)/i;
        break;
      case BrowserDetection.Browser.CHROME:
        regex = /Chrome\/(\S+)/i;
        break;
      case BrowserDetection.Browser.SAFARI:
        regex = /(iP(hone|ad|od).*?OS |Version\/)(\S+)/i;
        break;
      case BrowserDetection.Browser.BRAVE:
      default:
        BrowserDetection._detectedVersion = null;
        return null;
    }
    const match = navigator.userAgent.match(regex);
    if (!match) {
      BrowserDetection._detectedVersion = null;
      return null;
    }
    const versionString = match[match.length - 1].replace(/_/g, ".");
    const versionParts = versionString.split(".");
    const parsedVersionParts = [];
    for (let i = 0; i < 4; ++i) {
      parsedVersionParts.push(parseInt(versionParts[i], 10) || 0);
    }
    const [major, minor, build, patch] = parsedVersionParts;
    BrowserDetection._detectedVersion = { versionString, major, minor, build, patch };
    return BrowserDetection._detectedVersion;
  }
  static isChrome() {
    return BrowserDetection.detectBrowser() === BrowserDetection.Browser.CHROME;
  }
  static isFirefox() {
    return BrowserDetection.detectBrowser() === BrowserDetection.Browser.FIREFOX;
  }
  static isOpera() {
    return BrowserDetection.detectBrowser() === BrowserDetection.Browser.OPERA;
  }
  static isEdge() {
    return BrowserDetection.detectBrowser() === BrowserDetection.Browser.EDGE;
  }
  static isSafari() {
    return BrowserDetection.detectBrowser() === BrowserDetection.Browser.SAFARI;
  }
  static isBrave() {
    return BrowserDetection.detectBrowser() === BrowserDetection.Browser.BRAVE;
  }
  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  static isBadIOS() {
    const browserInfo = BrowserDetection.getBrowserInfo();
    return browserInfo.browser === BrowserDetection.Browser.SAFARI && browserInfo.isMobile && browserInfo.version && (browserInfo.version.major < 11 || browserInfo.version.major === 11 && browserInfo.version.minor === 2);
  }
  static isPrivateMode() {
    return new Promise((resolve) => {
      const on = () => resolve(true);
      const off = () => resolve(false);
      const isSafari = () => /Constructor/.test(window.HTMLElement) || window.safari && window.safari.pushNotification && window.safari.pushNotification.toString() === "[object SafariRemoteNotification]";
      if (window.webkitRequestFileSystem) {
        window.webkitRequestFileSystem(0, 0, off, on);
        return;
      }
      if (document.documentElement && "MozAppearance" in document.documentElement.style) {
        const db = indexedDB.open(null);
        db.onerror = on;
        db.onsuccess = off;
        return;
      }
      if (isSafari()) {
        try {
          window.openDatabase(null, null, null, null);
        } catch (_) {
          on();
          return;
        }
      }
      if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
        on();
        return;
      }
      off();
    });
  }
}
(function(BrowserDetection2) {
  (function(Browser) {
    Browser["CHROME"] = "chrome";
    Browser["FIREFOX"] = "firefox";
    Browser["OPERA"] = "opera";
    Browser["EDGE"] = "edge";
    Browser["SAFARI"] = "safari";
    Browser["BRAVE"] = "brave";
    Browser["UNKNOWN"] = "unknown";
  })(BrowserDetection2.Browser || (BrowserDetection2.Browser = {}));
})(BrowserDetection || (BrowserDetection = {}));
var BrowserDetection$1 = BrowserDetection;
var BrowserDetection$2 = BrowserDetection$1;
class Clipboard {
  static copy(text) {
    const element = document.createElement("textarea");
    element.value = text;
    element.setAttribute("readonly", "");
    element.style.contain = "strict";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.fontSize = "12pt";
    const selection = document.getSelection();
    const originalRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const activeInput = document.activeElement && (document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA") ? document.activeElement : null;
    document.body.append(element);
    element.select();
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    let isSuccess = false;
    try {
      isSuccess = document.execCommand("copy");
    } catch (e2) {
    }
    element.remove();
    if (activeInput) {
      activeInput.focus();
    } else if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    return isSuccess;
  }
}
function getCookie(cookieName) {
  const match = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(cookieName)}=([^;]+)`));
  return match && decodeURIComponent(match[2]);
}
function setCookie(cookieName, cookieValue, options) {
  if (typeof cookieName !== "string")
    throw new Error("cookieName must be a string");
  if (typeof cookieValue !== "string")
    throw new Error("cookieValue must be a string");
  const cookie = [`${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}`];
  if (options) {
    if (typeof options !== "object")
      throw new Error("options must be an object");
    if (options.path && typeof options.path !== "string") {
      throw new Error("options.path must be a string");
    }
    if (options.domain && typeof options.domain !== "string") {
      throw new Error("options.domain must be a string");
    }
    if (options.maxAge && typeof options.maxAge !== "number") {
      throw new Error("options.maxAge must be a number");
    }
    if (options.expires && typeof options.expires !== "string") {
      throw new Error("options.expires must be a string");
    }
    if (options.samesite && !["lax", "strict", "none"].includes(options.samesite)) {
      throw new Error('options.samesite must be either "lax", "strict" or "none"');
    }
    if (options.path)
      cookie.push(`path=${options.path}`);
    if (options.secure)
      cookie.push("secure");
    if (options.domain)
      cookie.push(`domain=${options.domain}`);
    if (options.maxAge)
      cookie.push(`max-age=${options.maxAge}`);
    if (options.expires)
      cookie.push(`expires=${options.expires}`);
    if (options.samesite)
      cookie.push(`samesite=${options.samesite}`);
  }
  const cookieString = cookie.join(";");
  document.cookie = cookieString;
  return cookieString;
}
function unsetCookie(cookieName) {
  document.cookie = `${encodeURIComponent(cookieName)}=;max-age=0`;
}
var Cookie = /* @__PURE__ */ Object.freeze({
  getCookie,
  setCookie,
  unsetCookie
});
class CurrencyInfo {
  constructor(currencyCode, decimalsOrLocaleOrOptions, name, symbol) {
    if (!CurrencyInfo.CURRENCY_CODE_REGEX.test(currencyCode)) {
      throw new Error(`Invalid currency code ${currencyCode}`);
    }
    let decimals;
    let locale;
    if (typeof decimalsOrLocaleOrOptions === "number") {
      decimals = decimalsOrLocaleOrOptions;
    } else if (typeof decimalsOrLocaleOrOptions === "string") {
      locale = decimalsOrLocaleOrOptions;
    } else if (typeof decimalsOrLocaleOrOptions === "object") {
      ({ decimals, name, symbol, locale } = decimalsOrLocaleOrOptions);
    }
    this.code = currencyCode.toUpperCase();
    const currencyCountry = this.code.substring(0, 2);
    const nameLocalesToTry = [
      ...locale ? [locale] : [],
      `${navigator.language.substring(0, 2)}-${currencyCountry}`,
      navigator.language,
      "en-US"
    ];
    let supportsDisplayNames = "DisplayNames" in Intl;
    [this.locale] = supportsDisplayNames ? Intl.DisplayNames.supportedLocalesOf(nameLocalesToTry) : Intl.NumberFormat.supportedLocalesOf(nameLocalesToTry);
    if (supportsDisplayNames && !this.locale) {
      supportsDisplayNames = false;
      [this.locale] = Intl.NumberFormat.supportedLocalesOf(nameLocalesToTry);
    }
    const isAutoGenerated = decimals === void 0 && name === void 0 && symbol === void 0;
    const cacheKey = `${this.code} ${this.locale}`;
    const cachedCurrencyInfo = CurrencyInfo.CACHED_AUTO_GENERATED_CURRENCY_INFOS[cacheKey];
    if (isAutoGenerated && cachedCurrencyInfo) {
      return cachedCurrencyInfo;
    }
    let formattedString;
    const formatterOptions = {
      style: "currency",
      currency: currencyCode,
      useGrouping: false,
      numberingSystem: "latn"
    };
    if (name !== void 0) {
      this.name = name;
    } else if (cachedCurrencyInfo) {
      this.name = cachedCurrencyInfo.name;
    } else if (supportsDisplayNames) {
      try {
        this.name = new Intl.DisplayNames(this.locale, { type: "currency" }).of(currencyCode);
      } catch (e2) {
      }
    }
    if (!this.name) {
      formattedString = CurrencyInfo.failsafeNumberToLocaleString(0, this.locale, __spreadValues({ currencyDisplay: "name" }, formatterOptions));
      this.name = formattedString ? formattedString.replace(CurrencyInfo.NUMBER_REGEX, "").trim() : this.code;
    }
    if (symbol !== void 0) {
      this.symbol = symbol;
    } else if (cachedCurrencyInfo) {
      this.symbol = cachedCurrencyInfo.symbol;
    } else {
      const extraSymbol = CurrencyInfo.EXTRA_SYMBOLS[this.code];
      if (typeof extraSymbol === "string") {
        this.symbol = extraSymbol;
      } else if (Array.isArray(extraSymbol)) {
        const useRightToLeft = this.locale === locale && CurrencyInfo.RIGHT_TO_LEFT_DETECTION_REGEX.test(this.name);
        this.symbol = extraSymbol[useRightToLeft ? 1 : 0];
      } else {
        const symbolLocalesToTry = [
          ...locale ? [locale] : [],
          `en-${currencyCountry}`,
          "en"
        ];
        const symbolFormattedString = CurrencyInfo.failsafeNumberToLocaleString(0, symbolLocalesToTry, __spreadValues({ currencyDisplay: "narrowSymbol" }, formatterOptions)) || CurrencyInfo.failsafeNumberToLocaleString(0, symbolLocalesToTry, __spreadValues({ currencyDisplay: "symbol" }, formatterOptions));
        if (symbolFormattedString) {
          formattedString = symbolFormattedString;
          this.symbol = formattedString.replace(CurrencyInfo.NUMBER_REGEX, "").trim();
        } else {
          this.symbol = this.code;
        }
      }
    }
    if (decimals !== void 0) {
      this.decimals = decimals;
    } else if (cachedCurrencyInfo) {
      this.decimals = cachedCurrencyInfo.decimals;
    } else if (CurrencyInfo.CUSTOM_DECIMAL_LESS_CURRENCIES.has(this.code)) {
      this.decimals = 0;
    } else {
      formattedString = formattedString || CurrencyInfo.failsafeNumberToLocaleString(0, "en", __spreadValues({ currencyDisplay: "code" }, formatterOptions));
      if (formattedString) {
        const numberMatch = formattedString.match(CurrencyInfo.NUMBER_REGEX);
        this.decimals = numberMatch ? (numberMatch[1] || "").length : 2;
      } else {
        this.decimals = 2;
      }
    }
    if (isAutoGenerated) {
      CurrencyInfo.CACHED_AUTO_GENERATED_CURRENCY_INFOS[cacheKey] = this;
    }
  }
  static failsafeNumberToLocaleString(value, locales, options) {
    try {
      return value.toLocaleString(locales, options);
    } catch (e2) {
      return null;
    }
  }
}
CurrencyInfo.EXTRA_SYMBOLS = {
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
CurrencyInfo.CUSTOM_DECIMAL_LESS_CURRENCIES = /* @__PURE__ */ new Set([
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
CurrencyInfo.CACHED_AUTO_GENERATED_CURRENCY_INFOS = {};
CurrencyInfo.CURRENCY_CODE_REGEX = /[A-Z]{3}/i;
CurrencyInfo.NUMBER_REGEX = /\d+(?:\D(\d+))?/;
CurrencyInfo.RIGHT_TO_LEFT_DETECTION_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
var FiatApiSupportedCryptoCurrency;
(function(FiatApiSupportedCryptoCurrency2) {
  FiatApiSupportedCryptoCurrency2["NIM"] = "nim";
  FiatApiSupportedCryptoCurrency2["BTC"] = "btc";
  FiatApiSupportedCryptoCurrency2["ETH"] = "eth";
})(FiatApiSupportedCryptoCurrency || (FiatApiSupportedCryptoCurrency = {}));
var FiatApiSupportedFiatCurrency;
(function(FiatApiSupportedFiatCurrency2) {
  FiatApiSupportedFiatCurrency2["AED"] = "aed";
  FiatApiSupportedFiatCurrency2["ARS"] = "ars";
  FiatApiSupportedFiatCurrency2["AUD"] = "aud";
  FiatApiSupportedFiatCurrency2["BDT"] = "bdt";
  FiatApiSupportedFiatCurrency2["BHD"] = "bhd";
  FiatApiSupportedFiatCurrency2["BMD"] = "bmd";
  FiatApiSupportedFiatCurrency2["BRL"] = "brl";
  FiatApiSupportedFiatCurrency2["CAD"] = "cad";
  FiatApiSupportedFiatCurrency2["CHF"] = "chf";
  FiatApiSupportedFiatCurrency2["CLP"] = "clp";
  FiatApiSupportedFiatCurrency2["CNY"] = "cny";
  FiatApiSupportedFiatCurrency2["CZK"] = "czk";
  FiatApiSupportedFiatCurrency2["DKK"] = "dkk";
  FiatApiSupportedFiatCurrency2["EUR"] = "eur";
  FiatApiSupportedFiatCurrency2["GBP"] = "gbp";
  FiatApiSupportedFiatCurrency2["HKD"] = "hkd";
  FiatApiSupportedFiatCurrency2["HUF"] = "huf";
  FiatApiSupportedFiatCurrency2["IDR"] = "idr";
  FiatApiSupportedFiatCurrency2["ILS"] = "ils";
  FiatApiSupportedFiatCurrency2["INR"] = "inr";
  FiatApiSupportedFiatCurrency2["JPY"] = "jpy";
  FiatApiSupportedFiatCurrency2["KRW"] = "krw";
  FiatApiSupportedFiatCurrency2["KWD"] = "kwd";
  FiatApiSupportedFiatCurrency2["LKR"] = "lkr";
  FiatApiSupportedFiatCurrency2["MMK"] = "mmk";
  FiatApiSupportedFiatCurrency2["MXN"] = "mxn";
  FiatApiSupportedFiatCurrency2["MYR"] = "myr";
  FiatApiSupportedFiatCurrency2["NOK"] = "nok";
  FiatApiSupportedFiatCurrency2["NGN"] = "ngn";
  FiatApiSupportedFiatCurrency2["NZD"] = "nzd";
  FiatApiSupportedFiatCurrency2["PHP"] = "php";
  FiatApiSupportedFiatCurrency2["PKR"] = "pkr";
  FiatApiSupportedFiatCurrency2["PLN"] = "pln";
  FiatApiSupportedFiatCurrency2["RUB"] = "rub";
  FiatApiSupportedFiatCurrency2["SAR"] = "sar";
  FiatApiSupportedFiatCurrency2["SEK"] = "sek";
  FiatApiSupportedFiatCurrency2["SGD"] = "sgd";
  FiatApiSupportedFiatCurrency2["THB"] = "thb";
  FiatApiSupportedFiatCurrency2["TRY"] = "try";
  FiatApiSupportedFiatCurrency2["TWD"] = "twd";
  FiatApiSupportedFiatCurrency2["UAH"] = "uah";
  FiatApiSupportedFiatCurrency2["USD"] = "usd";
  FiatApiSupportedFiatCurrency2["VND"] = "vnd";
  FiatApiSupportedFiatCurrency2["ZAR"] = "zar";
})(FiatApiSupportedFiatCurrency || (FiatApiSupportedFiatCurrency = {}));
const API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_COIN_IDS = {
  [FiatApiSupportedCryptoCurrency.NIM]: "nimiq-2",
  [FiatApiSupportedCryptoCurrency.BTC]: "bitcoin",
  [FiatApiSupportedCryptoCurrency.ETH]: "ethereum"
};
async function getExchangeRates(cryptoCurrencies, vsCurrencies) {
  cryptoCurrencies = cryptoCurrencies.map((currency) => currency.toLowerCase());
  const coinIds = cryptoCurrencies.map((currency) => COINGECKO_COIN_IDS[currency]);
  const apiResult = await _fetch(`${API_URL}/simple/price?ids=${coinIds.join(",")}&vs_currencies=${vsCurrencies.join(",")}`);
  return cryptoCurrencies.reduce((result, cryptoCurrency) => __spreadProps(__spreadValues({}, result), {
    [cryptoCurrency]: apiResult[COINGECKO_COIN_IDS[cryptoCurrency]]
  }), {});
}
async function _fetch(input, init) {
  let result = null;
  do {
    let retry = true;
    try {
      const response = await fetch(input, init);
      if (!response.ok) {
        if (response.status === 400) {
          retry = false;
          throw new Error("400 - Bad request");
        }
        throw new Error(`Failed to fetch: ${response.status}. Retrying...`);
      }
      result = await response.json();
    } catch (e2) {
      if (retry) {
        await new Promise((resolve) => setTimeout(resolve, 15e3));
      } else {
        throw e2;
      }
    }
  } while (!result);
  return result;
}
class FormattableNumber {
  constructor(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    const numberMatch = value.match(FormattableNumber.NUMBER_REGEX);
    if (!numberMatch)
      throw new Error(`${value} is not a valid number`);
    this._sign = numberMatch[1];
    this._digits = `${numberMatch[2]}${numberMatch[3]}`;
    if (!this._digits)
      throw new Error(`${value} is not a valid number`);
    this._decimalSeparatorPosition = numberMatch[2].length;
    const exponent = Number.parseInt(numberMatch[5], 10);
    if (exponent)
      this.moveDecimalSeparator(exponent);
  }
  toString(optionsOrUseGrouping) {
    let { maxDecimals = void 0, minDecimals = void 0, useGrouping = optionsOrUseGrouping === true, groupSeparator = "\u202F" } = typeof optionsOrUseGrouping === "object" ? optionsOrUseGrouping : {};
    if (maxDecimals !== void 0 && minDecimals !== void 0) {
      minDecimals = Math.min(minDecimals, maxDecimals);
    }
    if (maxDecimals !== void 0 && maxDecimals < this._digits.length - this._decimalSeparatorPosition) {
      this.round(maxDecimals);
    }
    let integers = this._digits.slice(0, this._decimalSeparatorPosition).replace(/^0+/, "");
    let decimals = this._digits.slice(this._decimalSeparatorPosition).replace(/0+$/, "");
    if (minDecimals !== void 0 && minDecimals > decimals.length) {
      decimals = decimals.padEnd(minDecimals, "0");
    }
    if (useGrouping && groupSeparator && integers.length > 4) {
      integers = integers.replace(/(\d)(?=(\d{3})+$)/g, `$1${groupSeparator}`);
    }
    return `${this._sign}${integers || "0"}${decimals ? `.${decimals}` : ""}`;
  }
  valueOf() {
    return this.toString();
  }
  moveDecimalSeparator(moveBy) {
    this._decimalSeparatorPosition += moveBy;
    if (this._decimalSeparatorPosition > this._digits.length) {
      this._digits = this._digits.padEnd(this._decimalSeparatorPosition, "0");
    } else if (this._decimalSeparatorPosition < 0) {
      this._digits = this._digits.padStart(this._digits.length - this._decimalSeparatorPosition, "0");
      this._decimalSeparatorPosition = 0;
    }
    return this;
  }
  round(decimals) {
    if (this._digits.length - this._decimalSeparatorPosition <= decimals)
      return this;
    const firstCutOffIndex = this._decimalSeparatorPosition + decimals;
    const digitsToKeep = this._digits.substring(0, firstCutOffIndex).padEnd(this._decimalSeparatorPosition, "0");
    if (Number.parseInt(this._digits[firstCutOffIndex], 10) < 5) {
      this._digits = digitsToKeep;
      return this;
    }
    const digits = `0${digitsToKeep}`.split("");
    const lastRemainingIndex = firstCutOffIndex;
    for (let i = lastRemainingIndex; i >= 0; --i) {
      const newDigit = Number.parseInt(digits[i], 10) + 1;
      if (newDigit < 10) {
        digits[i] = newDigit.toString();
        break;
      } else {
        digits[i] = "0";
      }
    }
    this._digits = digits.join("");
    this._decimalSeparatorPosition += 1;
    return this;
  }
  equals(other) {
    if (!(other instanceof FormattableNumber)) {
      try {
        other = new FormattableNumber(other);
      } catch (e2) {
        return false;
      }
    }
    return this.toString() === other.toString();
  }
}
FormattableNumber.NUMBER_REGEX = /^(-?)(\d*)\.?(\d*)(e(-?\d+))?$/;
class ValidationUtils {
  static isValidAddress(address) {
    if (!address)
      return false;
    try {
      this.isUserFriendlyAddress(address);
      return true;
    } catch (e2) {
      return false;
    }
  }
  static isUserFriendlyAddress(str) {
    if (!str)
      return;
    str = str.replace(/ /g, "");
    if (str.substr(0, 2).toUpperCase() !== "NQ") {
      throw new Error("Addresses start with NQ");
    }
    if (str.length !== 36) {
      throw new Error("Addresses are 36 chars (ignoring spaces)");
    }
    if (!this._alphabetCheck(str)) {
      throw new Error("Address has invalid characters");
    }
    if (this._ibanCheck(str.substr(4) + str.substr(0, 4)) !== 1) {
      throw new Error("Address Checksum invalid");
    }
  }
  static _alphabetCheck(str) {
    str = str.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      if (!ValidationUtils.NIMIQ_ALPHABET.includes(str[i]))
        return false;
    }
    return true;
  }
  static _ibanCheck(str) {
    const num = str.split("").map((c) => {
      const code = c.toUpperCase().charCodeAt(0);
      return code >= 48 && code <= 57 ? c : (code - 55).toString();
    }).join("");
    let tmp = "";
    for (let i = 0; i < Math.ceil(num.length / 6); i++) {
      tmp = (parseInt(tmp + num.substr(i * 6, 6), 10) % 97).toString();
    }
    return parseInt(tmp, 10);
  }
  static isValidHash(hash) {
    try {
      return atob(hash).length === 32;
    } catch (e2) {
      return false;
    }
  }
  static get NIMIQ_ALPHABET() {
    return "0123456789ABCDEFGHJKLMNPQRSTUVXY";
  }
}
class Tweenable {
  constructor(targetValue = 0, startValue = targetValue, tweenTime = 0, startTime = Date.now(), easing = Tweenable.Easing.EASE_IN_OUT_CUBIC) {
    this.targetValue = targetValue;
    this.startValue = startValue;
    this.tweenTime = tweenTime;
    this.startTime = startTime;
    this.easing = easing;
  }
  get currentValue() {
    const easedProgress = this.easing(this.progress);
    return this.startValue + (this.targetValue - this.startValue) * easedProgress;
  }
  get progress() {
    if (this.tweenTime === 0)
      return 1;
    return Math.min(1, (Date.now() - this.startTime) / this.tweenTime);
  }
  get finished() {
    return this.progress === 1;
  }
  tweenTo(targetValue, tweenTime = this.tweenTime) {
    if (targetValue === this.targetValue)
      return;
    this.startValue = this.currentValue;
    this.targetValue = targetValue;
    this.startTime = Date.now();
    this.tweenTime = tweenTime;
  }
}
(function(Tweenable2) {
  Tweenable2.Easing = {
    LINEAR: (t) => t,
    EASE_IN_OUT_CUBIC: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };
})(Tweenable || (Tweenable = {}));
var Tweenable$1 = Tweenable;
var Tweenable$2 = Tweenable$1;
class Utf8Tools {
  static stringToUtf8ByteArray(str) {
    if (typeof TextEncoder !== "undefined") {
      const encoder = new TextEncoder();
      return encoder.encode(str);
    }
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 128) {
        out[p++] = c;
      } else if (c < 2048) {
        out[p++] = c >> 6 | 192;
        out[p++] = c & 63 | 128;
      } else if ((c & 64512) == 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) == 56320) {
        c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
        out[p++] = c >> 18 | 240;
        out[p++] = c >> 12 & 63 | 128;
        out[p++] = c >> 6 & 63 | 128;
        out[p++] = c & 63 | 128;
      } else {
        out[p++] = c >> 12 | 224;
        out[p++] = c >> 6 & 63 | 128;
        out[p++] = c & 63 | 128;
      }
    }
    return new Uint8Array(out);
  }
  static utf8ByteArrayToString(bytes) {
    if (typeof TextDecoder !== "undefined") {
      const decoder = new TextDecoder("utf-8");
      return decoder.decode(bytes);
    }
    const out = [];
    let pos = 0;
    let c = 0;
    while (pos < bytes.length) {
      const c1 = bytes[pos++];
      if (c1 < 128) {
        out[c++] = String.fromCharCode(c1);
      } else if (c1 > 191 && c1 < 224) {
        const c2 = bytes[pos++];
        out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
      } else if (c1 > 239 && c1 < 365) {
        const c2 = bytes[pos++];
        const c3 = bytes[pos++];
        const c4 = bytes[pos++];
        const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
        out[c++] = String.fromCharCode(55296 + (u >> 10));
        out[c++] = String.fromCharCode(56320 + (u & 1023));
      } else {
        const c2 = bytes[pos++];
        const c3 = bytes[pos++];
        out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
      }
    }
    return out.join("");
  }
  static isValidUtf8(bytes, denyControlCharacters = false) {
    const controlCharsWhitelist = [
      9,
      10,
      13
    ];
    if (typeof TextDecoder !== "undefined") {
      try {
        const decoder = new TextDecoder("utf-8", { fatal: true });
        const decoded = decoder.decode(bytes);
        if (!denyControlCharacters)
          return true;
        const controlCharsMatch = decoded.match(/[\u0000-\u001F\u007F]/gu);
        if (!controlCharsMatch)
          return true;
        return controlCharsMatch.every((char) => controlCharsWhitelist.includes(char.charCodeAt(0)));
      } catch (e2) {
        return false;
      }
    }
    let i = 0;
    while (i < bytes.length) {
      const bytesLeft = bytes.length - i;
      const first = bytes[i];
      if (first <= 127) {
        if (first >= 32 && first <= 126)
          ++i;
        else if (!denyControlCharacters)
          ++i;
        else if (controlCharsWhitelist.indexOf(first) > -1)
          ++i;
        else
          break;
      } else if (first >= 194 && first <= 223 && bytesLeft >= 2) {
        const second = bytes[++i];
        if (second >= 128 && second <= 191)
          ++i;
        else
          break;
      } else if (first === 224 && bytesLeft >= 3) {
        const second = bytes[++i];
        const third = bytes[++i];
        if (second >= 160 && second <= 191 && third >= 128 && third <= 191)
          ++i;
        else
          break;
      } else if (first >= 225 && first <= 236 && bytesLeft >= 3) {
        const second = bytes[++i];
        const third = bytes[++i];
        if (second >= 128 && second <= 191 && third >= 128 && third <= 191)
          ++i;
        else
          break;
      } else if (first === 237 && bytesLeft >= 3) {
        const second = bytes[++i];
        const third = bytes[++i];
        if (second >= 128 && second <= 159 && third >= 128 && third <= 191)
          ++i;
        else
          break;
      } else if (first >= 238 && first <= 239 && bytesLeft >= 3) {
        const second = bytes[++i];
        const third = bytes[++i];
        if (second >= 128 && second <= 191 && third >= 128 && third <= 191)
          ++i;
        else
          break;
      } else if (first === 240 && bytesLeft >= 4) {
        const second = bytes[++i];
        const third = bytes[++i];
        const fourth = bytes[++i];
        if (second >= 144 && second <= 191 && third >= 128 && third <= 191 && fourth >= 128 && fourth <= 191)
          ++i;
        else
          break;
      } else if (first >= 241 && first <= 243 && bytesLeft >= 4) {
        const second = bytes[++i];
        const third = bytes[++i];
        const fourth = bytes[++i];
        if (second >= 128 && second <= 191 && third >= 128 && third <= 191 && fourth >= 128 && fourth <= 191)
          ++i;
        else
          break;
      } else if (first === 244 && bytesLeft >= 4) {
        const second = bytes[++i];
        const third = bytes[++i];
        const fourth = bytes[++i];
        if (second >= 128 && second <= 143 && third >= 128 && third <= 191 && fourth >= 128 && fourth <= 191)
          ++i;
        else
          break;
      } else
        break;
    }
    return i === bytes.length;
  }
  static truncateToUtf8ByteLength(input, length, applyEllipsis = true) {
    if (length < 0) {
      throw new Error("Invalid byte length");
    }
    let bytes;
    if (typeof input === "string") {
      bytes = Utf8Tools.stringToUtf8ByteArray(input);
    } else {
      bytes = input;
    }
    if (bytes.length <= length) {
      return {
        result: input,
        didTruncate: false
      };
    }
    const ellipsisBytes = [226, 128, 166];
    if (length < ellipsisBytes.length)
      applyEllipsis = false;
    bytes = bytes.subarray(0, length - (applyEllipsis ? ellipsisBytes.length : 0));
    while (!Utf8Tools.isValidUtf8(bytes))
      bytes = bytes.subarray(0, bytes.length - 1);
    if (applyEllipsis) {
      bytes = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.length + ellipsisBytes.length);
      if (typeof input !== "string") {
        bytes = new Uint8Array(bytes);
      }
      bytes.set(ellipsisBytes, bytes.length - ellipsisBytes.length);
    }
    return {
      result: typeof input === "string" ? Utf8Tools.utf8ByteArrayToString(bytes) : bytes,
      didTruncate: true
    };
  }
}
class Identicons {
  static async svg(t) {
    const e2 = makeHash(t);
    return this._svgTemplate(e2[0], e2[2], e2[3] + e2[4], e2[5] + e2[6], e2[7] + e2[8], e2[9] + e2[10], e2[11]);
  }
  static async render(t, e2) {
    e2.innerHTML = await this.svg(t);
  }
  static async toDataUrl(t) {
    return `data:image/svg+xml;base64,${this._btoa(await this.svg(t, true))}`;
  }
  static placeholder(t = "#bbb", e2 = 1) {
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
<path fill="none" stroke="${t}" stroke-width="${2 * e2}" transform="translate(0, 8) scale(0.5)" d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>
<g transform="scale(0.9) translate(9, 8)">
<circle cx="80" cy="80" r="40" fill="none" stroke="${t}" stroke-width="${e2}" opacity=".9"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
</g></svg>`;
  }
  static renderPlaceholder(t, e2, a) {
    t.innerHTML = this.placeholder(e2, a);
  }
  static placeholderToDataUrl(t, e2) {
    return `data:image/svg+xml;base64,${this._btoa(this.placeholder(t, e2))}`;
  }
  static async image(t) {
    const e2 = await this.toDataUrl(t), a = await this._loadImage(e2);
    return a.style.width = "100%", a.style.height = "100%", a;
  }
  static async _svgTemplate(t, e2, a, s, n, i, r) {
    return this._$svg(await this._$identicons(t, e2, a, s, n, i, r));
  }
  static async _$identicons(t, e2, a, s, n, i, r) {
    const o = hashToRGB(t, e2, r);
    return t = o.main, e2 = o.background, `<g color="${t}" fill="${r = o.accent}">
<rect fill="${e2}" x="0" y="0" width="160" height="160"/>
<circle cx="80" cy="80" r="40" fill="${t}"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
${await this._generatePart("top", s)}
${await this._generatePart("side", n)}
${await this._generatePart("face", a)}
${await this._generatePart("bottom", i)}
</g>`;
  }
  static _$svg(t) {
    const e2 = this._getRandomId();
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="hexagon-clip-${e2}">
<path d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z" transform="scale(0.5) translate(0, 16)"/>
</clipPath></defs>
<g clip-path="url(#hexagon-clip-${e2})">
${t}
</g></svg>`;
  }
  static async _generatePart(t, e2) {
    const a = await this._getAssets(), s = t + "_" + this._assetIndex(e2, t), n = a.getElementById(s);
    return n ? n.innerHTML : "";
  }
  static _loadImage(t) {
    return new Promise((e2, a) => {
      const s = document.createElement("img");
      s.addEventListener("load", (t2) => e2(s), { once: true }), s.src = t;
    });
  }
  static async _getAssets() {
    return this._assetsPromise || (this._assetsPromise = new Promise(async function(t) {
      let e2;
      if (e2 = typeof IdenticonsAssets != "undefined" ? IdenticonsAssets : await fetch(self.NIMIQ_IDENTICONS_SVG_PATH || Identicons.svgPath).then((t2) => t2.text()), typeof DOMParser != "function") {
        if (typeof module == "undefined" || !module.exports)
          throw new Error("No DOMParser available");
        global.DOMParser = require("dom-parser");
      }
      t(new DOMParser().parseFromString(e2, "image/svg+xml"));
    }));
  }
  static _btoa(t) {
    if (typeof btoa == "function")
      return btoa(t);
    if (typeof module != "undefined" && module.exports)
      return Buffer.from(t).toString("base64");
    throw new Error("No btoa or equivalent available");
  }
  static _assetIndex(t, e2) {
    return (t = Number(t) % 21 + 1) < 10 && (t = "0" + t), t;
  }
  static _getRandomId() {
    return Math.floor(256 * Math.random());
  }
}
Identicons.svgPath = "/node_modules/@nimiq/identicons/dist/identicons.min.svg";
function makeHash(t) {
  const r = ("" + t.split("").map((t2) => Number(t2.charCodeAt(0)) + 3).reduce((t2, r2) => t2 * (1 - t2) * __chaosHash(r2), 0.5)).split("").reduce((t2, r2) => r2 + t2, "");
  return _padEnd(r.replace(".", r[5]).substr(4, 17), 13, r[5]);
}
function __chaosHash(t) {
  let r = 1 / t;
  for (let t2 = 0; t2 < 100; t2++)
    r = (1 - r) * r * 3.569956786876;
  return r;
}
function _padEnd(t, r, e2) {
  if (String.prototype.padEnd)
    return t.padEnd(r, e2);
  for (; t.length < r; )
    t += e2;
  return t.substring(0, Math.max(t.length, r));
}
function hashToRGB(o, n, r) {
  return indicesToRGB(hashToIndices(o, n, r));
}
function hashToIndices(o, n, r) {
  for (o = parseInt(o, 10), n = parseInt(n, 10), r = parseInt(r, 10), o === n && ++o > 9 && (o = 0); r === o || r === n; )
    ++r > 9 && (r = 0);
  return { main: o, background: n, accent: r };
}
function indicesToRGB(o) {
  return { main: colors[o.main], background: backgroundColors[o.background], accent: colors[o.accent] };
}
const colors = ["#FC8702", "#D94432", "#E9B213", "#1A5493", "#0582CA", "#5961A8", "#21BCA5", "#FA7268", "#88B04B", "#795548"];
const backgroundColors = ["#FC8702", "#D94432", "#E9B213", "#1F2348", "#0582CA", "#5F4B8B", "#21BCA5", "#FA7268", "#88B04B", "#795548"];
var Identicon_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$u = defineComponent({
  name: "Identicon",
  props: {
    address: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    function formatAddress(str) {
      return str.replace(/[\+ ]/g, "").toUpperCase().match(/.{4}/g).join(" ");
    }
    function isUserFriendlyAddress(str) {
      return ValidationUtils.isValidAddress(str);
    }
    context.expose({
      formatAddress,
      isUserFriendlyAddress
    });
    const placeholderDataUrl = computed(() => {
      return 'data:image/svg+xml,<svg width="64" height="64" viewBox="0 -4 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".1" d="M62.3 25.4L49.2 2.6A5.3 5.3 0 0 0 44.6 0H18.4c-1.9 0-3.6 1-4.6 2.6L.7 25.4c-1 1.6-1 3.6 0 5.2l13.1 22.8c1 1.6 2.7 2.6 4.6 2.6h26.2c1.9 0 3.6-1 4.6-2.6l13-22.8c1-1.6 1-3.6.1-5.2z" fill="url(%23identicon_radial)"/><defs><radialGradient id="identicon_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-63.0033 0 0 -56 63 56)"><stop stop-color="%23260133"/><stop offset="1" stop-color="%231F2348"/></radialGradient></defs></svg>';
    });
    const dataUrl = ref(placeholderDataUrl.value);
    watch(() => props.address, computeDataUrl, { immediate: true });
    async function computeDataUrl(address, oldAddress) {
      if (props.address && isUserFriendlyAddress(props.address)) {
        Identicons.svgPath = (await Promise.resolve().then(function() {
          return identicons_min$1;
        })).default;
        dataUrl.value = await Identicons.toDataUrl(formatAddress(props.address));
      } else {
        dataUrl.value = placeholderDataUrl.value;
      }
      return true;
    }
    return { dataUrl };
  }
});
const _hoisted_1$10 = { class: "identicon" };
const _hoisted_2$O = ["src"];
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$10, [
    createElementVNode("img", { src: _ctx.dataUrl }, null, 8, _hoisted_2$O)
  ]);
}
var Identicon = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-5b627ba0"]]);
var Amount_vue_vue_type_style_index_0_scoped_true_lang = "";
function amountValidator(value) {
  return typeof value === "number" || typeof value === "bigint" || value && value.constructor && value.constructor.name.endsWith("Integer");
}
const _sfc_main$t = defineComponent({
  name: "Amount",
  props: {
    amount: {
      required: true,
      validator: amountValidator,
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
      default: false
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
  setup(props, context) {
    function _validateDecimals(decimals) {
      if (props.decimals !== void 0 && decimals !== props.decimals) {
        return;
      }
      if (decimals !== void 0 && (decimals < 0 || decimals > props.currencyDecimals || !Number.isInteger(decimals))) {
        throw new Error("Amount: decimals is not in range");
      }
    }
    watch(() => props.minDecimals, _validateDecimals, { immediate: true });
    watch(() => props.maxDecimals, _validateDecimals, { immediate: true });
    watch(() => props.decimals, _validateDecimals, { immediate: true });
    const formattedAmount = computed(() => {
      let minDecimals;
      let maxDecimals;
      if (typeof props.decimals === "number") {
        minDecimals = maxDecimals = props.decimals;
      } else {
        minDecimals = props.minDecimals;
        maxDecimals = props.maxDecimals;
      }
      return new FormattableNumber(props.amount).moveDecimalSeparator(-props.currencyDecimals).toString({ maxDecimals, minDecimals, useGrouping: true });
    });
    const isApprox = computed(() => {
      return !new FormattableNumber(props.amount).moveDecimalSeparator(-props.currencyDecimals).equals(formattedAmount.value.replace(/\s/g, ""));
    });
    const ticker = computed(() => {
      if (props.currency === "tnim")
        return "tNIM";
      if (props.currency === "mbtc")
        return "mBTC";
      if (props.currency === "tbtc")
        return "tBTC";
      return props.currency.toUpperCase();
    });
    return {
      formattedAmount,
      isApprox,
      ticker
    };
  }
});
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(["amount", { approx: _ctx.showApprox && _ctx.isApprox }])
  }, [
    createTextVNode(toDisplayString(_ctx.formattedAmount) + " ", 1),
    createElementVNode("span", {
      class: normalizeClass(["currency", _ctx.currency])
    }, toDisplayString(_ctx.ticker), 3)
  ], 2);
}
var Amount = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-08f04120"]]);
function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const I18N_DEFAULT_LANGUAGE = "en";
const I18N_SUPPORTED_LANGUAGES = [
  I18N_DEFAULT_LANGUAGE,
  "de",
  "es",
  "fr",
  "nl",
  "ru",
  "uk",
  "zh"
];
const i18nLang = ref(detectLanguage());
const loadedMessages = {};
const registeredComponents = [];
function setLanguage(lang) {
  if (!I18N_SUPPORTED_LANGUAGES.includes(lang)) {
    lang = I18N_DEFAULT_LANGUAGE;
  }
  if (lang === i18nLang.value)
    return;
  i18nLang.value = lang;
  for (const componentName of Object.keys(registeredComponents)) {
    loadComponentLanguageFile(componentName);
  }
}
function detectLanguage() {
  const langCookie = Cookie.getCookie("lang");
  const fallbackLang = "en";
  let lang = langCookie || fallbackLang;
  if (!I18N_SUPPORTED_LANGUAGES.includes(lang)) {
    lang = I18N_DEFAULT_LANGUAGE;
  }
  return lang;
}
async function loadComponentLanguageFile(componentName) {
  const componentLang = i18nLang.value + "-" + componentName;
  if (!(componentLang in loadedMessages) && i18nLang.value !== "en") {
    const messages = await __variableDynamicImportRuntime0__(`./${i18nLang}/${componentName}.json`);
    loadedMessages[componentLang] = messages.default || {};
  }
}
function $t(componentName, key, variablesOrLang, variables) {
  let lang;
  if (typeof variablesOrLang === "string") {
    lang = variablesOrLang;
  } else {
    lang = i18nLang.value;
    variables = variablesOrLang;
  }
  const componentLang = `${lang}-${componentName}`;
  let message = loadedMessages[componentLang] ? loadedMessages[componentLang][key] || key : key;
  if (typeof variables === "object" || Array.isArray(variables)) {
    message = message.replace(/{(\w+?)}/g, (match, variable) => variables[variable].toString() || match);
  }
  return message;
}
function loadI18n(componentName) {
  loadComponentLanguageFile(componentName);
  return $t.bind(void 0, componentName);
}
window.addEventListener("focus", () => setLanguage(detectLanguage()));
var LabelInput_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$s = defineComponent({
  name: "LabelInput",
  emits: ["update:modelValue", "changed", "paste"],
  props: {
    maxBytes: Number,
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: String,
    vanishing: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: { $t: loadI18n("LabelInput") },
  setup(props, context) {
    const input$ = ref(null);
    const widthPlaceholder$ = ref(null);
    const widthValue$ = ref(null);
    const liveValue = ref("");
    const lastValue = ref("");
    const lastEmittedValue = ref("");
    const width = ref(50);
    function focus() {
      if (input$.value)
        input$.value.focus();
    }
    context.expose({ focus });
    function onInput() {
      if (props.maxBytes) {
        const lengthInBytes = Utf8Tools.stringToUtf8ByteArray(liveValue.value).byteLength;
        if (lengthInBytes > props.maxBytes) {
          liveValue.value = lastValue.value;
          return;
        }
        lastValue.value = liveValue.value;
      }
      context.emit("update:modelValue", liveValue.value);
    }
    function onBlur() {
      if (liveValue.value === lastEmittedValue.value)
        return;
      context.emit("changed", liveValue.value);
      lastEmittedValue.value = liveValue.value;
      if (input$.value)
        input$.value.blur();
    }
    watch(() => props.modelValue, updateValue, { immediate: true });
    function updateValue(newValue) {
      liveValue.value = newValue;
      lastValue.value = liveValue.value;
      lastEmittedValue.value = lastValue.value;
    }
    watch(liveValue, updateWidth, { immediate: true });
    async function updateWidth() {
      await nextTick();
      if (!widthPlaceholder$.value || !widthValue$.value || !input$.value)
        return;
      const placeholderWidth = widthPlaceholder$.value.offsetWidth;
      const valueWidth = widthValue$.value.offsetWidth;
      const fontSize = parseFloat(window.getComputedStyle(input$.value, null).getPropertyValue("font-size"));
      width.value = (liveValue.value.length ? valueWidth : placeholderWidth) + fontSize / 3;
    }
    return {
      input$,
      widthPlaceholder$,
      widthValue$,
      liveValue,
      width,
      onInput,
      onBlur
    };
  }
});
const _hoisted_1$$ = ["placeholder", "disabled"];
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", {
    class: normalizeClass(["label-input", { disabled: _ctx.disabled }]),
    onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.onBlur && _ctx.onBlur(...args), ["prevent"]))
  }, [
    createElementVNode("span", {
      class: "width-finder width-placeholder",
      ref: "widthPlaceholder$"
    }, toDisplayString(_ctx.placeholder || _ctx.$t("Name your address")), 513),
    createElementVNode("span", {
      class: "width-finder width-value",
      ref: "widthValue$"
    }, toDisplayString(_ctx.liveValue), 513),
    withDirectives(createElementVNode("input", {
      type: "text",
      class: normalizeClass(["nq-input", { "vanishing": _ctx.vanishing }]),
      placeholder: _ctx.placeholder || _ctx.$t("Name your address"),
      style: normalizeStyle({ width: `${_ctx.width}px` }),
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.liveValue = $event),
      disabled: _ctx.disabled,
      onInput: _cache[1] || (_cache[1] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
      onPaste: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("paste", $event)),
      ref: "input$"
    }, null, 46, _hoisted_1$$), [
      [vModelText, _ctx.liveValue]
    ])
  ], 34);
}
var LabelInput = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__scopeId", "data-v-2398ba4a"]]);
var Account_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$r = defineComponent({
  name: "Account",
  emits: ["changed"],
  props: {
    label: {
      type: String,
      required: true
    },
    displayAsCashlink: {
      type: Boolean,
      default: false
    },
    decimals: {
      type: Number,
      default: 2
    },
    layout: {
      type: String,
      default: "row",
      validator: (layout) => ["row", "column"].indexOf(layout) !== -1
    },
    address: String,
    image: String,
    placeholder: String,
    walletLabel: String,
    balance: Number,
    editable: Boolean
  },
  setup: (props, context) => {
    const label$ = ref(null);
    const showImage = ref(!!props.image);
    function focus() {
      if (props.editable && label$.value) {
        label$.value.focus();
      }
    }
    context.expose({ focus });
    function onInput(label) {
      context.emit("changed", label);
    }
    watch(() => props.image, () => {
      showImage.value = !!props.image;
    }, { immediate: true });
    function isNimiqAddress() {
      return props.address ? ValidationUtils.isValidAddress(props.address) : false;
    }
    function isLabelNimiqAddress() {
      return ValidationUtils.isValidAddress(props.label);
    }
    return {
      label$,
      showImage,
      isNimiqAddress,
      isLabelNimiqAddress,
      onInput
    };
  },
  components: {
    Identicon,
    Amount,
    LabelInput
  }
});
const _hoisted_1$_ = { class: "identicon-and-label" };
const _hoisted_2$N = ["src"];
const _hoisted_3$M = {
  key: 1,
  class: "identicon"
};
const _hoisted_4$i = /* @__PURE__ */ createStaticVNode('<div class="nq-blue-bg" data-v-6f648f64><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="white" stroke-linecap="round" stroke-width="2.5" data-v-6f648f64><path d="M40.25 23.25v-.5a6.5 6.5 0 0 0-6.5-6.5h-3.5a6.5 6.5 0 0 0-6.5 6.5v6.5a6.5 6.5 0 0 0 6.5 6.5h2" data-v-6f648f64></path><path d="M23.75 40.75v.5a6.5 6.5 0 0 0 6.5 6.5h3.5a6.5 6.5 0 0 0 6.5-6.5v-6.5a6.5 6.5 0 0 0-6.5-6.5h-2" data-v-6f648f64></path><path d="M32 11.25v4M32 48.75v4" data-v-6f648f64></path></svg></div>', 1);
const _hoisted_5$9 = [
  _hoisted_4$i
];
const _hoisted_6$6 = {
  key: 5,
  class: "nq-label wallet-label"
};
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Identicon = resolveComponent("Identicon");
  const _component_LabelInput = resolveComponent("LabelInput");
  const _component_Amount = resolveComponent("Amount");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["account", [{ editable: _ctx.editable }, _ctx.layout, { cashlink: _ctx.displayAsCashlink }]])
  }, [
    createElementVNode("div", _hoisted_1$_, [
      _ctx.showImage ? (openBlock(), createElementBlock("img", {
        key: 0,
        class: "identicon account-image",
        src: _ctx.image,
        onError: _cache[0] || (_cache[0] = ($event) => _ctx.showImage = false)
      }, null, 40, _hoisted_2$N)) : _ctx.displayAsCashlink ? (openBlock(), createElementBlock("div", _hoisted_3$M, _hoisted_5$9)) : _ctx.isNimiqAddress() ? (openBlock(), createBlock(_component_Identicon, {
        key: 2,
        address: _ctx.address
      }, null, 8, ["address"])) : createCommentVNode("", true),
      !_ctx.editable ? (openBlock(), createElementBlock("div", {
        key: 3,
        class: normalizeClass(["label", { "address-font": _ctx.isLabelNimiqAddress() }])
      }, toDisplayString(_ctx.label), 3)) : (openBlock(), createElementBlock("div", {
        key: 4,
        class: normalizeClass(["label editable", { "address-font": _ctx.isLabelNimiqAddress() }])
      }, [
        createVNode(_component_LabelInput, {
          maxBytes: 63,
          value: _ctx.label,
          placeholder: _ctx.placeholder,
          "onUpdate:modelValue": _ctx.onInput,
          ref: "label$"
        }, null, 8, ["value", "placeholder", "onUpdate:modelValue"])
      ], 2)),
      _ctx.layout === "column" && _ctx.walletLabel ? (openBlock(), createElementBlock("div", _hoisted_6$6, toDisplayString(_ctx.walletLabel), 1)) : createCommentVNode("", true)
    ]),
    _ctx.balance || _ctx.balance === 0 ? (openBlock(), createBlock(_component_Amount, {
      key: 0,
      class: "balance",
      amount: _ctx.balance,
      decimals: _ctx.decimals
    }, null, 8, ["amount", "decimals"])) : createCommentVNode("", true)
  ], 2);
}
var Account = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-6f648f64"]]);
var Copyable_vue_vue_type_style_index_0_scoped_true_lang = "";
const COPYABLE_DISPLAY_TIME = 800;
const _sfc_main$q = defineComponent({
  name: "Copyable",
  props: {
    text: String
  },
  methods: { $t: loadI18n("Copyable") },
  setup(props, context) {
    const root$ = ref(null);
    const tooltip$ = ref(null);
    const copied = ref(false);
    const _copiedResetTimeout = ref(null);
    function copy() {
      let text = props.text;
      if (!text && root$.value && tooltip$.value) {
        const copiedLabel = tooltip$.value.textContent;
        text = root$.value.innerText.replace(new RegExp(`\\s*${copiedLabel}$`), "");
      }
      if (text)
        Clipboard.copy(text);
      window.clearTimeout(_copiedResetTimeout.value);
      copied.value = true;
      _copiedResetTimeout.value = window.setTimeout(() => {
        copied.value = false;
      }, COPYABLE_DISPLAY_TIME);
    }
    function onKeyDown2(event) {
      if (event.key === " " || event.key === "Enter") {
        copy();
      }
    }
    onMounted(() => root$.value.addEventListener("keydown", onKeyDown2));
    onBeforeUnmount(() => root$.value.removeEventListener("keydown", onKeyDown2));
    return {
      root$,
      tooltip$,
      copied,
      copy
    };
  }
});
const _withScopeId$7 = (n) => (pushScopeId("data-v-6ba524f8"), n = n(), popScopeId(), n);
const _hoisted_1$Z = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("div", { class: "background" }, null, -1));
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["copyable", { copied: _ctx.copied }]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.copy && _ctx.copy(...args)),
    tabindex: "0",
    ref: "root$"
  }, [
    _hoisted_1$Z,
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    createElementVNode("div", {
      class: "tooltip",
      ref: "tooltip$"
    }, toDisplayString(_ctx.$t("Copied")), 513)
  ], 2);
}
var Copyable = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-6ba524f8"]]);
var AddressDisplay_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$p = defineComponent({
  name: "AddressDisplay",
  components: { Copyable },
  props: {
    address: { type: String, required: true },
    copyable: { type: Boolean, default: false }
  },
  setup(props) {
    const chunks = computed(() => {
      if (!props.address)
        return new Array(9).fill("-");
      return props.address.replace(/[+ ]/g, "").match(/.{4}/g);
    });
    return { chunks };
  }
});
const _withScopeId$6 = (n) => (pushScopeId("data-v-91dfb81a"), n = n(), popScopeId(), n);
const _hoisted_1$Y = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("span", { class: "space" }, "\xA0", -1));
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.copyable ? "Copyable" : "div"), {
    text: _ctx.chunks.join(" ").toUpperCase(),
    class: "address-display"
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.chunks, (chunk, index) => {
        return openBlock(), createElementBlock("span", {
          class: "chunk",
          key: chunk + index
        }, [
          createTextVNode(toDisplayString(chunk), 1),
          _hoisted_1$Y
        ]);
      }), 128))
    ]),
    _: 1
  }, 8, ["text"]);
}
var AddressDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-91dfb81a"]]);
const _hoisted_1$X = {
  width: "17",
  height: "16",
  viewBox: "0 0 17 16",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$M = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M15.913 13.333L9.68 1.433a1.333 1.333 0 0 0-2.362 0l-6.232 11.9a1.333 1.333 0 0 0 1.182 1.952H14.73a1.333 1.333 0 0 0 1.182-1.952zm-8.08-7.718a.667.667 0 0 1 1.334 0v4a.667.667 0 1 1-1.334 0v-4zm.682 7.674h.018a.983.983 0 0 0 .967-1.022 1.018 1.018 0 0 0-1.016-.978h-.019a.984.984 0 0 0-.965 1.02c.02.546.468.978 1.015.98z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$L = [
  _hoisted_2$M
];
function render$B(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$X, _hoisted_3$L);
}
var AlertTriangle = { render: render$B };
const _hoisted_1$W = {
  width: "11",
  height: "9",
  viewBox: "0 0 11 9",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$L = /* @__PURE__ */ createElementVNode("path", {
  d: "M4.25,7.75.75,4.25,4.25.75",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  stroke: "currentColor",
  fill: "none"
}, null, -1);
const _hoisted_3$K = /* @__PURE__ */ createElementVNode("line", {
  x1: "1",
  y1: "4.25",
  x2: "10.25",
  y2: "4.25",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  stroke: "currentColor",
  fill: "none"
}, null, -1);
const _hoisted_4$h = [
  _hoisted_2$L,
  _hoisted_3$K
];
function render$A(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$W, _hoisted_4$h);
}
var ArrowLeftSmall = { render: render$A };
const _hoisted_1$V = {
  width: "23",
  height: "18",
  viewBox: "0 0 23 18",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$K = /* @__PURE__ */ createElementVNode("path", {
  d: "M22 9L3 9",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$J = /* @__PURE__ */ createElementVNode("path", {
  d: "M9 16L2 9L9 2",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$g = [
  _hoisted_2$K,
  _hoisted_3$J
];
function render$z(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$V, _hoisted_4$g);
}
var ArrowLeft = { render: render$z };
const _hoisted_1$U = {
  width: "16",
  height: "12",
  viewBox: "0 0 16 12",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$J = /* @__PURE__ */ createElementVNode("path", {
  d: "M10,1l5,5l-5,5",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$I = /* @__PURE__ */ createElementVNode("line", {
  x1: "14",
  y1: "6",
  x2: "1",
  y2: "6",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$f = [
  _hoisted_2$J,
  _hoisted_3$I
];
function render$y(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$U, _hoisted_4$f);
}
var ArrowRightSmall = { render: render$y };
const _hoisted_1$T = {
  width: "23",
  height: "18",
  viewBox: "0 0 23 18",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$I = /* @__PURE__ */ createElementVNode("path", {
  d: "M13.9995 1.99902L20.999 9.00049L13.9995 16",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$H = /* @__PURE__ */ createElementVNode("line", {
  x1: "18.999",
  y1: "9",
  x2: "0.999023",
  y2: "9",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$e = [
  _hoisted_2$I,
  _hoisted_3$H
];
function render$x(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$T, _hoisted_4$e);
}
var ArrowRight = { render: render$x };
const _hoisted_1$S = {
  width: "10",
  height: "11",
  viewBox: "0 0 10 11",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$H = /* @__PURE__ */ createElementVNode("path", {
  d: "M5.00098 2L8.53602 5.53603L5.00098 9.07107",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$G = [
  _hoisted_2$H
];
function render$w(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$S, _hoisted_3$G);
}
var CaretRightSmall = { render: render$w };
const _hoisted_1$R = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 64 64",
  width: "64",
  height: "64"
};
const _hoisted_2$G = /* @__PURE__ */ createStaticVNode('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.5px" stroke-linejoin="round"><path d="M40.25,23.25v-.5a6.5,6.5,0,0,0-6.5-6.5h-3.5a6.5,6.5,0,0,0-6.5,6.5v6.5a6.5,6.5,0,0,0,6.5,6.5h2"></path><path d="M23.75,40.75v.5a6.5,6.5,0,0,0,6.5,6.5h3.5a6.5,6.5,0,0,0,6.5-6.5v-6.5a6.5,6.5,0,0,0-6.5-6.5h-2"></path><line x1="32" y1="11.25" x2="32" y2="15.25"></line><line x1="32" y1="48.75" x2="32" y2="52.75"></line></g>', 1);
const _hoisted_3$F = [
  _hoisted_2$G
];
function render$v(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$R, _hoisted_3$F);
}
var Cashlink = { render: render$v };
const _hoisted_1$Q = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24"
};
const _hoisted_2$F = /* @__PURE__ */ createStaticVNode('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5px" stroke-linejoin="round"><path d="M15.25,8.25h0a2.5,2.5,0,0,0-2.5-2.5h-1.5a2.5,2.5,0,0,0-2.5,2.5v3a2.5,2.5,0,0,0,2.5,2.5h.5"></path><path d="M8.75,15.75h0a2.5,2.5,0,0,0,2.5,2.5h1.5a2.5,2.5,0,0,0,2.5-2.5v-3a2.5,2.5,0,0,0-2.5-2.5h-.5"></path><line x1="12" y1="3.75" x2="12" y2="5.25"></line><line x1="12" y1="18.75" x2="12" y2="20.25"></line></g>', 1);
const _hoisted_3$E = [
  _hoisted_2$F
];
function render$u(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$Q, _hoisted_3$E);
}
var CashlinkSmall = { render: render$u };
const _hoisted_1$P = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  width: "16",
  height: "16"
};
const _hoisted_2$E = /* @__PURE__ */ createElementVNode("g", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M10.5,5.5h0a2,2,0,0,0-2-2h-1a2,2,0,0,0-2,2V7a2,2,0,0,0,2,2H8" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M5.5,10.5h0a2,2,0,0,0,2,2h1a2,2,0,0,0,2-2V9a2,2,0,0,0-2-2H8" })
], -1);
const _hoisted_3$D = [
  _hoisted_2$E
];
function render$t(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$P, _hoisted_3$D);
}
var CashlinkXSmall = { render: render$t };
const _hoisted_1$O = {
  width: "74",
  height: "74",
  viewBox: "0 0 74 74",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$D = /* @__PURE__ */ createElementVNode("path", {
  d: "M71.12 1.84a4.5 4.5 0 0 0-6.28 1.04l-42.1 58.74L8.68 47.54a4.5 4.5 0 1 0-6.36 6.37l17.8 17.81a4.57 4.57 0 0 0 6.84-.56l45.2-63.03a4.5 4.5 0 0 0-1.04-6.29z",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": ".8"
}, null, -1);
const _hoisted_3$C = [
  _hoisted_2$D
];
function render$s(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$O, _hoisted_3$C);
}
var Checkmark = { render: render$s };
const _hoisted_1$N = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12"
};
const _hoisted_2$C = /* @__PURE__ */ createElementVNode("path", {
  d: "M11,1,4,11,1,8",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
}, null, -1);
const _hoisted_3$B = [
  _hoisted_2$C
];
function render$r(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$N, _hoisted_3$B);
}
var CheckmarkSmall = { render: render$r };
const _hoisted_1$M = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$B = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M3.528 3.52c4.683-4.684 12.275-4.686 16.96-.005 4.678 4.69 4.678 12.28 0 16.97-4.685 4.68-12.277 4.678-16.96-.005-4.682-4.684-4.682-12.276 0-16.96zm13.145 13.133a1 1 0 0 0 .036-1.374l-3.11-3.11a.25.25 0 0 1 0-.352l3.11-3.11a1 1 0 1 0-1.414-1.415l-3.11 3.11a.25.25 0 0 1-.354 0l-3.11-3.11a1 1 0 0 0-1.41 1.415l3.11 3.11a.249.249 0 0 1 0 .353l-3.11 3.109a1 1 0 0 0 0 1.415c.396.38 1.021.38 1.416 0l3.109-3.11a.252.252 0 0 1 .354 0l3.11 3.11a1 1 0 0 0 1.373-.041z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$A = [
  _hoisted_2$B
];
function render$q(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$M, _hoisted_3$A);
}
var Close = { render: render$q };
const _hoisted_1$L = {
  width: "40",
  height: "49",
  viewBox: "0 0 40 49",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$A = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M35.73 7.25c0 .48.34.9.82 1a4.08 4.08 0 0 1 3.26 4v32.67A4.08 4.08 0 0 1 35.73 49H6.13A6.13 6.13 0 0 1 0 42.87V6.13A6.13 6.13 0 0 1 6.13 0h25.52a4.08 4.08 0 0 1 4.08 4.08v3.17zm-5.1 31.88A10.23 10.23 0 0 0 20.4 29.6c-5.21 0-9.6 3.9-10.19 9.08a1.02 1.02 0 0 0 1.02 1.13h18.75a.64.64 0 0 0 .64-.68zm-16.38-17.7a6.15 6.15 0 1 1 12.3-.04 6.15 6.15 0 0 1-12.3.05zM6.12 4.09a2.04 2.04 0 0 0 0 4.09h25.01c.29 0 .51-.23.51-.51V4.59a.51.51 0 0 0-.5-.5H6.11z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$z = [
  _hoisted_2$A
];
function render$p(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$L, _hoisted_3$z);
}
var Contacts = { render: render$p };
const _hoisted_1$K = {
  width: "35",
  height: "40",
  viewBox: "0 0 35 40",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$z = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M34.07 6.01L28.95.92c-.6-.59-1.4-.92-2.24-.92H12.33a3.17 3.17 0 0 0-3.16 3.17v5.16h-6A3.17 3.17 0 0 0 0 11.5v25.35A3.17 3.17 0 0 0 3.17 40h19.5a3.17 3.17 0 0 0 3.16-3.16v-5.17h6A3.17 3.17 0 0 0 35 28.5V8.25c0-.84-.33-1.65-.93-2.24zM22.5 35.83c0 .46-.37.84-.83.84H4.17a.83.83 0 0 1-.84-.84V12.5c0-.46.38-.83.84-.83h12.97c.22 0 .43.08.58.23l4.53 4.43c.16.16.25.37.25.6v18.9zm3.75-7.5h4.58c.46 0 .84-.37.84-.83V8.6a.83.83 0 0 0-.25-.6l-4.58-4.47a.83.83 0 0 0-.58-.24l-12.93.04a.83.83 0 0 0-.83.84v3.75c0 .23.19.41.42.41h4.63c.84 0 1.64.33 2.23.93l5.12 5.09c.6.59.93 1.4.93 2.23v11.34c0 .23.19.41.42.41z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$y = [
  _hoisted_2$z
];
function render$o(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$K, _hoisted_3$y);
}
var Copy = { render: render$o };
const _hoisted_1$J = {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$y = /* @__PURE__ */ createElementVNode("path", {
  d: "M2 13L13 2",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$x = /* @__PURE__ */ createElementVNode("path", {
  d: "M2 2L13 13",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$d = [
  _hoisted_2$y,
  _hoisted_3$x
];
function render$n(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$J, _hoisted_4$d);
}
var Cross = { render: render$n };
const _hoisted_1$I = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$x = /* @__PURE__ */ createElementVNode("path", {
  d: "M15.36 11.38a.83.83 0 0 0-.59-1.42h-3.31a.2.2 0 0 1-.2-.2V1.24a1.25 1.25 0 1 0-2.5 0v8.5c0 .12-.1.2-.22.2H5.23a.83.83 0 0 0-.59 1.43l4.77 4.77c.33.33.86.33 1.18 0l4.77-4.77zM16.02 18.75c0-.69-.55-1.25-1.25-1.25H5.23a1.25 1.25 0 1 0 0 2.5h9.54c.7 0 1.25-.56 1.25-1.25z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$w = [
  _hoisted_2$x
];
function render$m(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$I, _hoisted_3$w);
}
var Download = { render: render$m };
const _hoisted_1$H = {
  width: "102",
  height: "102",
  viewBox: "0 0 102 102",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$w = /* @__PURE__ */ createElementVNode("circle", {
  cx: "51",
  cy: "51",
  r: "48",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6"
}, null, -1);
const _hoisted_3$v = /* @__PURE__ */ createElementVNode("circle", {
  cx: "35.1485",
  cy: "40.6627",
  r: "4.82432",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$c = /* @__PURE__ */ createElementVNode("circle", {
  cx: "66.8514",
  cy: "40.6622",
  r: "4.82432",
  fill: "currentColor"
}, null, -1);
const _hoisted_5$8 = /* @__PURE__ */ createElementVNode("path", {
  d: "M39 68.9863C39 68.9863 44.8244 68.9863 51.0271 68.9863C57.2298 68.9863 63.0541 68.9863 63.0541 68.9863",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_6$5 = [
  _hoisted_2$w,
  _hoisted_3$v,
  _hoisted_4$c,
  _hoisted_5$8
];
function render$l(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$H, _hoisted_6$5);
}
var FaceNeutral = { render: render$l };
const _hoisted_1$G = {
  width: "102",
  height: "102",
  viewBox: "0 0 102 102",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$v = /* @__PURE__ */ createElementVNode("circle", {
  cx: "51",
  cy: "51",
  r: "48",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6"
}, null, -1);
const _hoisted_3$u = /* @__PURE__ */ createElementVNode("circle", {
  cx: "35.1485",
  cy: "40.6627",
  r: "4.82432",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$b = /* @__PURE__ */ createElementVNode("circle", {
  cx: "66.8514",
  cy: "40.6622",
  r: "4.82432",
  fill: "currentColor"
}, null, -1);
const _hoisted_5$7 = /* @__PURE__ */ createElementVNode("path", {
  d: "M39.9729 70.9867C39.9729 70.9867 44.7972 68.23 50.9999 68.23C57.2026 68.23 62.027 70.9867 62.027 70.9867",
  stroke: "currentColor",
  fill: "none",
  "stroke-width": "6",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_6$4 = [
  _hoisted_2$v,
  _hoisted_3$u,
  _hoisted_4$b,
  _hoisted_5$7
];
function render$k(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$G, _hoisted_6$4);
}
var FaceSad = { render: render$k };
const _hoisted_1$F = {
  width: "25",
  height: "24",
  viewBox: "0 0 25 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$u = /* @__PURE__ */ createElementVNode("path", {
  d: "M21.66 9.31l1.26.45a2.37 2.37 0 0 1 0 4.48l-1.27.45a1.37 1.37 0 0 0-.77 1.88l.57 1.22a2.38 2.38 0 0 1-3.16 3.16l-1.22-.57a1.37 1.37 0 0 0-1.88.78l-.45 1.26a2.38 2.38 0 0 1-4.48 0l-.45-1.26a1.37 1.37 0 0 0-1.88-.78l-1.22.57a2.38 2.38 0 0 1-3.16-3.16l.57-1.22a1.37 1.37 0 0 0-.78-1.88l-1.26-.45a2.38 2.38 0 0 1 0-4.48l1.26-.45a1.38 1.38 0 0 0 .78-1.88l-.57-1.21A2.38 2.38 0 0 1 6.7 3.04l1.22.58a1.38 1.38 0 0 0 1.88-.78l.45-1.27a2.38 2.38 0 0 1 4.48 0l.45 1.27a1.37 1.37 0 0 0 1.88.78l1.22-.58a2.38 2.38 0 0 1 3.16 3.17l-.57 1.2a1.37 1.37 0 0 0 .78 1.9zm-13.6 4.53a4.93 4.93 0 0 0 6.28 2.6 4.81 4.81 0 0 0 2.6-6.28 4.87 4.87 0 0 0-6.28-2.6 4.81 4.81 0 0 0-2.6 6.28z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$t = [
  _hoisted_2$u
];
function render$j(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$F, _hoisted_3$t);
}
var Gear = { render: render$j };
const _hoisted_1$E = {
  width: "58",
  height: "49",
  viewBox: "0 0 27 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$t = /* @__PURE__ */ createElementVNode("path", {
  d: "M26.6991 10.875L21.0741 1.125C20.6691 0.4275 19.9266 0 19.1241 0H7.87414C7.07164 0 6.32914 0.4275 5.92789 1.125L0.302891 10.875C-0.0983594 11.5725 -0.0983594 12.4275 0.302891 13.125L5.92789 22.875C6.32914 23.5725 7.07164 24 7.87414 24H19.1241C19.9266 24 20.6691 23.5725 21.0704 22.875L26.6954 13.125C27.1004 12.4275 27.1004 11.5725 26.6991 10.875Z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$s = [
  _hoisted_2$t
];
function render$i(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$E, _hoisted_3$s);
}
var Hexagon = { render: render$i };
const _hoisted_1$D = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$s = /* @__PURE__ */ createElementVNode("line", {
  x1: "8",
  y1: "7.83301",
  x2: "8",
  y2: "11.333",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round"
}, null, -1);
const _hoisted_3$r = /* @__PURE__ */ createElementVNode("circle", {
  cx: "8",
  cy: "4.75",
  r: "0.5",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": "0.5"
}, null, -1);
const _hoisted_4$a = /* @__PURE__ */ createElementVNode("circle", {
  cx: "8",
  cy: "8",
  r: "7.5",
  stroke: "currentColor",
  fill: "none"
}, null, -1);
const _hoisted_5$6 = [
  _hoisted_2$s,
  _hoisted_3$r,
  _hoisted_4$a
];
function render$h(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$D, _hoisted_5$6);
}
var InfoCircle = { render: render$h };
const _hoisted_1$C = {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$r = /* @__PURE__ */ createElementVNode("line", {
  x1: "8",
  y1: "7.83301",
  x2: "8",
  y2: "11.333",
  stroke: "currentColor",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-width": "1.5"
}, null, -1);
const _hoisted_3$q = /* @__PURE__ */ createElementVNode("circle", {
  cx: "8",
  cy: "4.75",
  r: "0.5",
  fill: "currentColor",
  stroke: "currentColor",
  "stroke-width": "1"
}, null, -1);
const _hoisted_4$9 = /* @__PURE__ */ createElementVNode("circle", {
  cx: "8",
  cy: "8",
  r: "7.25",
  stroke: "currentColor",
  "stroke-width": "1.5",
  fill: "none"
}, null, -1);
const _hoisted_5$5 = [
  _hoisted_2$r,
  _hoisted_3$q,
  _hoisted_4$9
];
function render$g(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$C, _hoisted_5$5);
}
var InfoCircleSmall = { render: render$g };
const _hoisted_1$B = {
  width: "39",
  height: "39",
  viewBox: "0 0 39 39",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$q = /* @__PURE__ */ createElementVNode("g", { fill: "currentColor" }, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M21.94 14.04a9.1 9.1 0 0 0-2.44-6.18V3.9c0-2.15-1.82-3.9-4.06-3.9a3.98 3.98 0 0 0-4.07 3.9v.81a9.58 9.58 0 0 0-8.83 8.13 9.34 9.34 0 0 0 6.4 10.02v1l-1.39 1.33a.76.76 0 0 0 0 1.1l1.39 1.33v.92l-1.39 1.33c-.32.3-.32.8 0 1.1l1.39 1.33v2.02c0 .2.08.4.23.55l2.44 2.34a.83.83 0 0 0 1.15 0l2.44-2.34a.76.76 0 0 0 .24-.55V22.86a9.42 9.42 0 0 0 6.5-8.82zm-9.75-4.68c.9 0 1.62.7 1.62 1.56a1.6 1.6 0 0 1-1.62 1.56c-.9 0-1.63-.7-1.63-1.56 0-.86.73-1.56 1.63-1.56zm5.69-5.46c0-1.3-1.1-2.34-2.44-2.34A2.39 2.39 0 0 0 13 3.9v3.9h1.63V4.98c1.16.29 2.27.79 3.24 1.46V3.9z"
  }),
  /* @__PURE__ */ createElementVNode("path", { d: "M36.33 28.12l-8.45-8.11a9.07 9.07 0 0 0-3.45-11.85.84.84 0 0 0-.98.07.76.76 0 0 0-.2.91 11.4 11.4 0 0 1-4.52 14.75.77.77 0 0 0-.34.87c.1.33.42.56.78.56h.01c1.43-.01 2.84-.32 4.13-.92l1.06.9v2c0 .43.36.78.8.78h2.1l.35.35v1.99c0 .43.36.78.8.78h1.83l1.49 1.35c.15.13.35.21.56.21h3.45a.8.8 0 0 0 .81-.78v-3.3c0-.22-.08-.41-.23-.56z" })
], -1);
const _hoisted_3$p = [
  _hoisted_2$q
];
function render$f(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$B, _hoisted_3$p);
}
var Keys$1 = { render: render$f };
const _hoisted_1$A = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 290 61"
};
const _hoisted_2$p = /* @__PURE__ */ createElementVNode("path", {
  d: "M145.5,46C137,46,130,39,130,30.5S137,15,145.5,15S161,22,161,30.5S154,46,145.5,46z M145.5,17 c-7.4,0-13.5,6.1-13.5,13.5S138.1,44,145.5,44S159,37.9,159,30.5S152.9,17,145.5,17z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$o = /* @__PURE__ */ createElementVNode("path", {
  d: "M285.5,3H107V2c0-1.1-0.9-2-2-2H89c-1.1,0-2,0.9-2,2v1H41V2c0-1.1-0.9-2-2-2H23c-1.1,0-2,0.9-2,2v1H4 C1.8,3,0,4.8,0,7v47c0,2.2,1.8,4,4,4h281.5c2.5,0,4.5-2,4.5-4.5v-46C290,5,288,3,285.5,3z M102,40.9c0,1.1-0.9,2.1-2,2.1H28 c-1.1,0-2-0.9-2-2.1V20.1c0-1.1,0.9-2.1,2-2.1h72c1.1,0,2,0.9,2,2.1V40.9z M288,53.5c0,1.4-1.1,2.5-2.5,2.5h-140 C131.4,56,120,44.6,120,30.5C120,16.4,131.4,5,145.5,5h140c1.4,0,2.5,1.1,2.5,2.5V53.5z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$8 = [
  _hoisted_2$p,
  _hoisted_3$o
];
function render$e(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$A, _hoisted_4$8);
}
var Ledger = { render: render$e };
const _hoisted_1$z = {
  width: "32",
  height: "47",
  viewBox: "0 0 32 47",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$o = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M29.5 22.512V12.96C29.5 5.802 23.456 0 16 0S2.5 5.802 2.5 12.96v9.552c-4.26 6.43-2.966 14.887 3.041 19.868 6.007 4.982 14.911 4.982 20.918 0 6.008-4.981 7.302-13.438 3.041-19.868zM16 34.56c-2.209 0-4-1.72-4-3.84s1.791-3.84 4-3.84c2.21 0 4 1.72 4 3.84s-1.79 3.84-4 3.84zm8.027-17.653a.952.952 0 0 0 .473-.816V12.96c0-4.507-3.805-8.16-8.5-8.16-4.694 0-8.5 3.653-8.5 8.16v3.131c0 .332.179.641.473.816.294.175.661.192.971.045a16.437 16.437 0 0 1 14.112 0c.31.147.677.13.971-.045z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$n = [
  _hoisted_2$o
];
function render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$z, _hoisted_3$n);
}
var LockLocked = { render: render$d };
const _hoisted_1$y = {
  width: "32",
  height: "47",
  viewBox: "0 0 32 47",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$n = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M30.5 12.96v9.552c3.93 5.944 3.165 13.69-1.859 18.818-5.024 5.129-13.03 6.337-19.451 2.935-6.421-3.401-9.625-10.548-7.783-17.363C3.248 20.087 9.667 15.336 17 15.36c2.449 0 4.864.545 7.056 1.592.31.147.677.13.971-.045a.952.952 0 0 0 .473-.816V12.96c0-4.507-3.805-8.16-8.5-8.16-4.694 0-8.5 3.653-8.5 8.16 0 1.325-1.12 2.4-2.5 2.4s-2.5-1.074-2.5-2.4C3.5 5.802 9.544 0 17 0s13.5 5.802 13.5 12.96zM13 30.72c0 2.12 1.79 3.84 4 3.84s4-1.72 4-3.84-1.79-3.84-4-3.84-4 1.72-4 3.84z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$m = [
  _hoisted_2$n
];
function render$c(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$y, _hoisted_3$m);
}
var LockUnlocked = { render: render$c };
const _hoisted_1$x = {
  width: "54",
  height: "54",
  viewBox: "0 0 54 54",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$m = /* @__PURE__ */ createElementVNode("path", {
  d: "M26.95 0A27.05 27.05 0 0 0 .21 22.32a1.12 1.12 0 0 0 1.13 1.3h18.72c.62 0 1.12-.5 1.12-1.12v-8.1a2.25 2.25 0 0 1 3.66-1.76l15.75 12.6a2.25 2.25 0 0 1 0 3.52l-15.75 12.6a2.25 2.25 0 0 1-3.66-1.76v-8.1c0-.62-.5-1.12-1.12-1.12H1.35a1.14 1.14 0 0 0-1.13 1.3 27 27 0 0 0 53.55-5.78A27.25 27.25 0 0 0 26.95 0z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$l = [
  _hoisted_2$m
];
function render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$x, _hoisted_3$l);
}
var Login = { render: render$b };
const _hoisted_1$w = {
  width: "7",
  height: "30",
  viewBox: "0 0 7 30",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$l = /* @__PURE__ */ createElementVNode("g", { fill: "currentColor" }, [
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "3.5",
    cy: "3",
    r: "3"
  }),
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "3.5",
    cy: "15",
    r: "3"
  }),
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "3.5",
    cy: "27",
    r: "3"
  })
], -1);
const _hoisted_3$k = [
  _hoisted_2$l
];
function render$a(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$w, _hoisted_3$k);
}
var MenuDots = { render: render$a };
const _hoisted_1$v = {
  width: "54",
  height: "54",
  viewBox: "0 0 54 54",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$k = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M27 54a27 27 0 1 0 0-54 27 27 0 0 0 0 54zm2.5-40c.6 0 1 .4 1 1v8.5H39c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-8.5V39c0 .6-.4 1-1 1h-5a1 1 0 0 1-1-1v-8.5H15a1 1 0 0 1-1-1v-5c0-.6.4-1 1-1h8.5V15c0-.6.4-1 1-1h5z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$j = [
  _hoisted_2$k
];
function render$9(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$v, _hoisted_3$j);
}
var PlusCircle = { render: render$9 };
const _hoisted_1$u = {
  width: "99",
  height: "99",
  viewBox: "0 0 99 99",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$j = /* @__PURE__ */ createStaticVNode('<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M28.9 33H4A4.1 4.1 0 0 1 0 28.9V4A4.1 4.1 0 0 1 4.1 0H29A4.1 4.1 0 0 1 33 4.1V29a4.1 4.1 0 0 1-4.1 4.1zM9.3 8.2a1 1 0 0 0-1 1v14.5c0 .6.4 1 1 1h14.4c.6 0 1-.4 1-1V9.3c0-.6-.4-1-1-1H9.3zM4 66H29a4.1 4.1 0 0 1 4.1 4.1V95a4.1 4.1 0 0 1-4.1 4.1H4A4.1 4.1 0 0 1 0 94.9V70A4.1 4.1 0 0 1 4.1 66zm19.6 24.8c.6 0 1-.5 1-1V75.2c0-.6-.4-1-1-1H9.3a1 1 0 0 0-1 1v14.4c0 .6.4 1 1 1h14.4zM70.1 0H95A4.1 4.1 0 0 1 99 4.1V29a4.1 4.1 0 0 1-4.1 4.1H70a4.1 4.1 0 0 1-4.1-4.1V4A4.1 4.1 0 0 1 70.1 0zm19.6 24.8c.6 0 1-.5 1-1V9.2c0-.6-.4-1-1-1H75.3a1 1 0 0 0-1 1v14.4c0 .6.4 1 1 1h14.4z"></path><path d="M41.3 17.5h4a3 3 0 1 0 0-6.2 1 1 0 0 1-1-1V4.1a3 3 0 0 0-6.1 0v10.3a3 3 0 0 0 3 3.1zM53.5 7.2c.6 0 1 .5 1 1V31a3 3 0 0 0 6.2 0V4.1a3 3 0 0 0-3-3h-4.2a3 3 0 0 0 0 6.1zM23.7 43.3a3 3 0 0 0 3.1 3.1h14.4a3 3 0 0 0 3.1-3V26.7a3 3 0 0 0-6.1 0v12.4c0 .6-.5 1-1 1H26.7a3 3 0 0 0-3 3.1z"></path><path d="M12.4 40.2a3 3 0 0 0-3.1 3.1v10.3c0 .6-.5 1-1 1H4a3 3 0 0 0 0 6.2h53.6a3 3 0 0 0 3.1-3V45.4a3 3 0 0 0-6.1 0v8.2c0 .6-.5 1-1 1H16.4a1 1 0 0 1-1-1V43.3a3 3 0 0 0-3.1-3zm44.3 30a3 3 0 0 0-3-3.2H41.1a3 3 0 0 0-3 3.1v16.5a3 3 0 0 0 6.1 0V74.3c0-.6.5-1 1-1h8.3a3 3 0 0 0 3.1-3.2zM95 91.7h-35a1 1 0 0 1-1.1-1v-8.3a3 3 0 1 0-6.2 0v12.4a3 3 0 0 0 3 3H95a3 3 0 0 0 0-6.1z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M80.4 83.5H68.1a3 3 0 0 1-3.1-3V68a3 3 0 0 1 3-3.1h12.4a3 3 0 0 1 3.1 3v12.4a3 3 0 0 1-3 3.1zm-8.2-12.3a1 1 0 0 0-1 1v4.1c0 .6.4 1 1 1h4.1c.6 0 1-.4 1-1v-4.1c0-.6-.4-1-1-1h-4.1z"></path><path d="M92.8 52.6a3 3 0 0 0-3 3v26.9a3 3 0 0 0 6.1 0V55.7a3 3 0 0 0-3-3.1zM96 41.2a3 3 0 0 0-3-3H70a3 3 0 0 0-3 3v12.4a3 3 0 0 0 6.1 0v-8.2c0-.6.5-1 1-1h18.6a3 3 0 0 0 3.1-3.1z"></path></g>', 1);
const _hoisted_3$i = [
  _hoisted_2$j
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$u, _hoisted_3$i);
}
var QrCode$1 = { render: render$8 };
const _hoisted_1$t = {
  width: "16",
  height: "26",
  viewBox: "0 0 16 26",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$i = /* @__PURE__ */ createElementVNode("path", {
  d: "M7.98 25a2.62 2.62 0 1 1 0-5.24 2.62 2.62 0 0 1 0 5.24zM10.78 14.38c-.64.28-1.05.91-1.05 1.6a1.75 1.75 0 0 1-3.5 0 5.24 5.24 0 0 1 3.15-4.8 3.5 3.5 0 1 0-4.89-3.2 1.75 1.75 0 0 1-3.49 0 6.98 6.98 0 1 1 9.78 6.4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$h = [
  _hoisted_2$i
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$t, _hoisted_3$h);
}
var Questionmark = { render: render$7 };
const _hoisted_1$s = {
  width: "40",
  height: "40",
  viewBox: "0 0 40 40",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$h = /* @__PURE__ */ createStaticVNode('<g fill="currentColor"><path d="M1.21 7.06c.67 0 1.21-.54 1.21-1.21l-.04-3.12a.3.3 0 0 1 .3-.3H5.7a1.21 1.21 0 1 0 0-2.43H2.37A2.4 2.4 0 0 0 0 2.42v3.43c0 .67.54 1.21 1.21 1.21zM5.69 37.58H2.73a.3.3 0 0 1-.3-.3v-3.13a1.21 1.21 0 1 0-2.43 0v3.43A2.4 2.4 0 0 0 2.37 40H5.7a1.21 1.21 0 0 0 0-2.42zM38.79 32.94c-.67 0-1.21.54-1.21 1.21l.04 3.12a.3.3 0 0 1-.3.3H34.3a1.21 1.21 0 1 0 0 2.43h3.32A2.4 2.4 0 0 0 40 37.58v-3.43c0-.67-.54-1.21-1.21-1.21zM37.63 0H34.3a1.21 1.21 0 1 0 0 2.42h2.96c.17 0 .3.14.3.3v3.13a1.21 1.21 0 0 0 2.43 0V2.42A2.4 2.4 0 0 0 37.63 0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.94 15.15H6.67c-.67 0-1.22-.54-1.22-1.21V6.67c0-.67.55-1.21 1.22-1.21h7.27c.67 0 1.21.54 1.21 1.2v7.28c0 .67-.54 1.21-1.21 1.21zM8.18 7.88a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24a.3.3 0 0 0 .3-.3V8.18a.3.3 0 0 0-.3-.3H8.18zM6.67 24.85h7.27c.67 0 1.21.54 1.21 1.21v7.27c0 .67-.54 1.22-1.21 1.22H6.67c-.67 0-1.22-.55-1.22-1.22v-7.27c0-.67.55-1.21 1.22-1.21zm5.75 7.27a.3.3 0 0 0 .3-.3v-4.24a.3.3 0 0 0-.3-.3H8.18a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24zM26.06 5.45h7.27c.67 0 1.21.55 1.21 1.22v7.27c0 .67-.54 1.21-1.2 1.21h-7.28c-.67 0-1.21-.54-1.21-1.21V6.67c0-.67.54-1.22 1.21-1.22zm5.76 7.28a.3.3 0 0 0 .3-.3V8.17a.3.3 0 0 0-.3-.3h-4.24a.3.3 0 0 0-.3.3v4.24c0 .17.13.3.3.3h4.24z"></path><path d="M17.58 10.6h1.2a.9.9 0 1 0 0-1.81.3.3 0 0 1-.3-.3V6.66a.9.9 0 1 0-1.81 0V9.7c0 .5.4.9.9.9zM21.21 7.58c.17 0 .3.13.3.3v6.66a.9.9 0 1 0 1.82 0V6.67c0-.5-.4-.91-.9-.91H21.2a.9.9 0 1 0 0 1.82zM12.42 18.18c0 .5.41.91.91.91h4.25c.5 0 .9-.4.9-.9v-4.86a.9.9 0 1 0-1.81 0v3.64a.3.3 0 0 1-.3.3h-3.04c-.5 0-.9.4-.9.91z"></path><path d="M9.09 17.27c-.5 0-.9.4-.9.91v3.03a.3.3 0 0 1-.31.3H6.67a.9.9 0 1 0 0 1.82h15.75c.5 0 .91-.4.91-.9v-3.64a.9.9 0 0 0-1.82 0v2.42a.3.3 0 0 1-.3.3h-10.9a.3.3 0 0 1-.31-.3v-3.03c0-.5-.4-.9-.91-.9zM22.12 26.06c0-.5-.4-.9-.9-.9h-3.64c-.5 0-.91.4-.91.9v4.85a.9.9 0 1 0 1.81 0v-3.64c0-.16.14-.3.3-.3h2.43c.5 0 .91-.4.91-.9zM33.33 32.42h-10.3a.3.3 0 0 1-.3-.3V29.7a.9.9 0 1 0-1.82 0v3.63c0 .5.4.91.9.91h11.52a.9.9 0 0 0 0-1.82z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M29.1 30h-3.65a.9.9 0 0 1-.9-.91v-3.64c0-.5.4-.9.9-.9h3.64c.5 0 .91.4.91.9v3.64c0 .5-.4.91-.9.91zm-2.43-3.64a.3.3 0 0 0-.3.3v1.22c0 .17.13.3.3.3h1.2a.3.3 0 0 0 .31-.3v-1.21a.3.3 0 0 0-.3-.3h-1.21z"></path><path d="M32.73 20.9c-.5 0-.91.42-.91.92v7.88a.9.9 0 0 0 1.82 0v-7.88c0-.5-.41-.91-.91-.91zM33.64 17.58c0-.5-.41-.91-.91-.91h-6.67c-.5 0-.9.4-.9.9v3.64a.9.9 0 0 0 1.8 0V18.8c0-.17.15-.3.31-.3h5.46c.5 0 .9-.41.9-.91z"></path></g>', 1);
const _hoisted_3$g = [
  _hoisted_2$h
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$s, _hoisted_3$g);
}
var ScanQrCode = { render: render$6 };
const _hoisted_1$r = {
  width: "30",
  height: "28",
  viewBox: "0 0 30 28",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$g = /* @__PURE__ */ createElementVNode("path", {
  d: "M27.634 15.68H9.544a1.428 1.428 0 0 1 0-2.856h18.09a1.428 1.428 0 0 1 0 2.857zM29.064 25.676c0 .789-.639 1.428-1.428 1.428h-8.569a1.428 1.428 0 0 1 0-2.856h8.57a1.428 1.428 0 0 1 1.427 1.43v-.002zM13.482 27.996a2.856 2.856 0 1 1-.282-5.705 2.856 2.856 0 0 1 .283 5.705zM1.922 24.248h4.76a1.428 1.428 0 0 1 0 2.856h-4.76a1.428 1.428 0 1 1 0-2.856zM.004 13.776a2.856 2.856 0 1 1 5.705.285 2.856 2.856 0 0 1-5.705-.285zM6.691 3.778H1.455a1.428 1.428 0 0 1 0-2.856H6.69a1.428 1.428 0 0 1 0 2.856zM13.177.004a2.856 2.856 0 1 1 .283 5.705 2.856 2.856 0 0 1-.283-5.705zM27.63 4.25h-7.616a1.428 1.428 0 0 1 0-2.855h7.617a1.428 1.428 0 0 1 0 2.856z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$f = [
  _hoisted_2$g
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$r, _hoisted_3$f);
}
var Settings = { render: render$5 };
const _hoisted_1$q = {
  width: "98",
  height: "123",
  viewBox: "0 0 98 123",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$f = /* @__PURE__ */ createElementVNode("path", {
  d: "M85.7 42.3l8-8a5.1 5.1 0 1 0-7.3-7.2l-8.2 8.2c-7-5.2-15.4-8.5-24-9.4V10.3h10.2a5.1 5.1 0 0 0 0-10.3H33.6a5.1 5.1 0 0 0 0 10.3H44v15.6a48.7 48.7 0 1 0 41.8 16.4zM49 112.8a38.4 38.4 0 1 1 0-77 38.4 38.4 0 0 1 0 77z M54.2 48.6a5.1 5.1 0 0 0-10.3 0V74a5.2 5.2 0 0 0 5.2 5.1 5.1 5.1 0 0 0 5-5V48.5z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$e = [
  _hoisted_2$f
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$q, _hoisted_3$e);
}
var Stopwatch = { render: render$4 };
const _hoisted_1$p = {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$e = /* @__PURE__ */ createElementVNode("path", {
  d: "M10.01 14.82a1 1 0 0 0 1.37-.37l3.37-5.83a.17.17 0 0 1 .22-.06l.73.41a.67.67 0 0 0 1-.58l-.07-3.89a.67.67 0 0 0-.99-.57l-3.4 1.89a.67.67 0 0 0 0 1.15l.71.42c.08.05.11.15.06.23l-3.37 5.83a1 1 0 0 0 .37 1.37zM8.23 5.19l-3.55 5.76a.17.17 0 0 1-.23.06l-.55-.32a.67.67 0 0 0-1 .59l.07 3.89a.67.67 0 0 0 .99.57l3.4-1.89a.67.67 0 0 0 0-1.16l-.89-.51a.17.17 0 0 1-.07-.1.16.16 0 0 1 .02-.13l3.52-5.72a1 1 0 1 0-1.7-1.05z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$d = [
  _hoisted_2$e
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$p, _hoisted_3$d);
}
var Transfer = { render: render$3 };
const _hoisted_1$o = {
  width: "150",
  height: "149",
  viewBox: "0 0 150 149",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$d = /* @__PURE__ */ createElementVNode("path", {
  d: "M81 103a26 26 0 100-52 26 26 0 000 52zM3 97h15c1 0 2 1 2 3v35c0 2-1 3-2 3H3c-2 0-3-1-3-3v-35c0-2 1-3 3-3zm60 17h-1c-5-7-13-11-21-11H28l-2 1v30l1 1c26 9 37 14 47 14 11 0 21-7 54-24 3-1 4-5 2-8-1-2-3-3-6-3l-5 1-19 6-1 1c-1 6-6 10-12 10H64c-2 0-3-1-3-3s1-3 3-3h23c3 0 6-3 6-6s-3-6-6-6H63zm61-61.8h-.3a24 24 0 01-6.4-1c-1.6-.3-2.5-2-2-3.5.3-1.5 2-2.4 3.5-2 1.6.5 3.3.6 5 .7h.2a22 22 0 005-.6c1.6-.5 3.2.5 3.6 2a3 3 0 01-2.1 3.6 31 31 0 01-6.5.8zm15.8-6.3a3 3 0 01-2-5 21 21 0 003.2-4 3 3 0 014-.9 3 3 0 01.9 4 23 23 0 01-4.2 5c-.5.6-1.2.9-2 .9zm-31.9-.2c-.7 0-1.4-.3-2-.8a28 28 0 01-4.1-5 3 3 0 011-4 3 3 0 014 .8c.8 1.5 2 2.8 3.1 4a3 3 0 01.2 4.1 3 3 0 01-2.2.9zM147 30.5h-.2a2.9 2.9 0 01-2.7-3.1V26c0-1.3 0-2.6-.3-3.8a2.9 2.9 0 015.7-1c.3 1.5.5 3.2.5 4.8v1.7a3 3 0 01-3 2.7zm-46.2-.3a3 3 0 01-2.9-2.7V26c0-1.7.1-3.4.4-5a3 3 0 013.4-2.3 3 3 0 012.4 3.4c-.3 1.3-.4 2.6-.4 4v1a3 3 0 01-2.8 3.1zm41-16a3 3 0 01-2.3-1 20.7 20.7 0 00-3.6-3.5 3 3 0 01-.7-4 3 3 0 014.1-.7c1.7 1.3 3.3 2.8 4.7 4.5 1 1.2.9 3-.4 4-.5.6-1.1.7-1.8.7zm-35.6-.1c-.7 0-1.4-.3-1.9-.7a2.9 2.9 0 01-.3-4.1c1.3-1.7 3-3.1 4.7-4.4a3 3 0 014 .6 3 3 0 01-.5 4 21 21 0 00-3.8 3.5 3 3 0 01-2.2 1zM126.9 6h-.4c-1.7-.2-3.4-.2-5 0a3 3 0 11-.7-5.8c2.1-.3 4.3-.3 6.5 0a3 3 0 012.5 3.2 2.8 2.8 0 01-2.9 2.6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$c = [
  _hoisted_2$d
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$o, _hoisted_3$c);
}
var UnderPayment = { render: render$2 };
const _hoisted_1$n = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$c = /* @__PURE__ */ createElementVNode("g", { fill: "currentColor" }, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M18.9 6.95c1.59 1 3.03 2.21 4.3 3.6.74.82.74 2.07 0 2.9-2.56 2.81-6.79 5.8-11.04 5.8h-.3a11.26 11.26 0 0 1-4.31-.94L3.4 22.45a1 1 0 0 1-1.63-1.08l.01-.01.01-.01 19.5-19.5a.74.74 0 0 0 .18-.3l.02-.01a1 1 0 1 1 1.41 1.41l-4 4zm-5.59 9.35a4.58 4.58 0 0 0 3-3.03 4.3 4.3 0 0 0-.2-3.06.25.25 0 0 0-.4-.07l-5.57 5.56a.25.25 0 0 0 .07.4 4.3 4.3 0 0 0 3.1.2z"
  }),
  /* @__PURE__ */ createElementVNode("path", { d: "M7.62 13.4a.24.24 0 0 0 .06-.24A4.32 4.32 0 0 1 7.5 12a4.5 4.5 0 0 1 5.66-4.33c.09.03.18 0 .24-.06l1.94-1.94a.25.25 0 0 0-.1-.42c-1.05-.34-2.14-.5-3.24-.5C7.7 4.69 3.4 7.7.81 10.55a2.15 2.15 0 0 0 0 2.9 21.21 21.21 0 0 0 3.43 3.03c.1.07.24.06.33-.03l3.05-3.05z" })
], -1);
const _hoisted_3$b = [
  _hoisted_2$c
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$n, _hoisted_3$b);
}
var ViewOff = { render: render$1 };
const _hoisted_1$m = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$b = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M12 4.6c4.4-.06 8.79 3.01 11.43 5.92.75.84.75 2.11 0 2.95-2.61 2.88-6.94 5.93-11.28 5.93h-.31c-4.33 0-8.66-3.05-11.27-5.93a2.21 2.21 0 0 1 0-2.95C3.2 7.62 7.6 4.54 12 4.6zm0 2.8a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$a = /* @__PURE__ */ createElementVNode("path", {
  d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$7 = [
  _hoisted_2$b,
  _hoisted_3$a
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$m, _hoisted_4$7);
}
var View = { render };
const IconBase = (component) => defineComponent({
  functional: true,
  render: () => h(component, Object.assign({ class: "nq-icon" }))
});
const AlertTriangleIcon = IconBase(AlertTriangle);
const ArrowLeftSmallIcon = IconBase(ArrowLeftSmall);
const ArrowLeftIcon = IconBase(ArrowLeft);
const ArrowRightSmallIcon = IconBase(ArrowRightSmall);
const ArrowRightIcon = IconBase(ArrowRight);
const CaretRightSmallIcon = IconBase(CaretRightSmall);
const CashlinkIcon = IconBase(Cashlink);
const CashlinkSmallIcon = IconBase(CashlinkSmall);
const CashlinkXSmallIcon = IconBase(CashlinkXSmall);
const CheckmarkIcon = IconBase(Checkmark);
const CheckmarkSmallIcon = IconBase(CheckmarkSmall);
const CloseIcon = IconBase(Close);
const ContactsIcon = IconBase(Contacts);
const CopyIcon = IconBase(Copy);
const CrossIcon = IconBase(Cross);
const DownloadIcon = IconBase(Download);
const FaceNeutralIcon = IconBase(FaceNeutral);
const FaceSadIcon = IconBase(FaceSad);
const GearIcon = IconBase(Gear);
const HexagonIcon = IconBase(Hexagon);
const InfoCircleIcon = IconBase(InfoCircle);
const InfoCircleSmallIcon = IconBase(InfoCircleSmall);
const KeysIcon = IconBase(Keys$1);
const LedgerIcon = IconBase(Ledger);
const LockLockedIcon = IconBase(LockLocked);
const LockUnlockedIcon = IconBase(LockUnlocked);
const LoginIcon = IconBase(Login);
const MenuDotsIcon = IconBase(MenuDots);
const PlusCircleIcon = IconBase(PlusCircle);
const QrCodeIcon = IconBase(QrCode$1);
const QuestionmarkIcon = IconBase(Questionmark);
const ScanQrCodeIcon = IconBase(ScanQrCode);
const SettingsIcon = IconBase(Settings);
const StopwatchIcon = IconBase(Stopwatch);
const TransferIcon = IconBase(Transfer);
const UnderPaymentIcon = IconBase(UnderPayment);
const ViewOffIcon = IconBase(ViewOff);
const ViewIcon = IconBase(View);
var CloseButton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$o = defineComponent({
  name: "CloseButton",
  setup(props, context) {
    function onClick(event) {
      context.emit("click", event);
    }
    return { onClick };
  },
  components: {
    CloseIcon
  }
});
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CloseIcon = resolveComponent("CloseIcon");
  return openBlock(), createElementBlock("button", {
    class: "close-button nq-button-s",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {
    }, ["prevent"]))
  }, [
    createVNode(_component_CloseIcon)
  ], 32);
}
var CloseButton = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-1f782dd5"]]);
var AccountDetails_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$n = defineComponent({
  name: "AccountDetails",
  emits: ["close", "changed"],
  props: {
    address: {
      type: String,
      required: true
    },
    image: String,
    label: String,
    walletLabel: String,
    balance: Number,
    editable: Boolean,
    placeholder: String
  },
  setup: (props, context) => {
    const account$ = ref(null);
    function focus() {
      if (account$.value)
        account$.value.focus();
    }
    context.expose({ focus });
    function onInput(label) {
      context.emit("changed", label);
    }
    function onClose() {
      context.emit("close");
    }
    return {
      account$,
      onInput,
      onClose
    };
  },
  components: {
    Account,
    Amount,
    AddressDisplay,
    CloseButton
  }
});
const _hoisted_1$l = { class: "account-details" };
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CloseButton = resolveComponent("CloseButton");
  const _component_Account = resolveComponent("Account");
  const _component_AddressDisplay = resolveComponent("AddressDisplay");
  return openBlock(), createElementBlock("div", _hoisted_1$l, [
    createVNode(_component_CloseButton, {
      class: "top-right",
      onClick: _ctx.onClose
    }, null, 8, ["onClick"]),
    createVNode(_component_Account, {
      layout: "column",
      address: _ctx.address,
      image: _ctx.image,
      label: _ctx.label && _ctx.label !== _ctx.address ? _ctx.label : "",
      walletLabel: _ctx.walletLabel,
      balance: _ctx.balance,
      editable: _ctx.editable,
      placeholder: _ctx.placeholder,
      onChanged: _ctx.onInput,
      ref: "account$"
    }, null, 8, ["address", "image", "label", "walletLabel", "balance", "editable", "placeholder", "onChanged"]),
    createVNode(_component_AddressDisplay, {
      address: _ctx.address,
      copyable: ""
    }, null, 8, ["address"])
  ]);
}
var AccountDetails = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-17728649"]]);
var Tooltip_vue_vue_type_style_index_0_scoped_true_lang = "";
var TooltipVerticalPosition = /* @__PURE__ */ ((TooltipVerticalPosition2) => {
  TooltipVerticalPosition2["TOP"] = "top";
  TooltipVerticalPosition2["BOTTOM"] = "bottom";
  return TooltipVerticalPosition2;
})(TooltipVerticalPosition || {});
var TooltipHorizontalPosition = /* @__PURE__ */ ((TooltipHorizontalPosition2) => {
  TooltipHorizontalPosition2["LEFT"] = "left";
  TooltipHorizontalPosition2["RIGHT"] = "right";
  return TooltipHorizontalPosition2;
})(TooltipHorizontalPosition || {});
var TooltipThemes = /* @__PURE__ */ ((TooltipThemes2) => {
  TooltipThemes2["NORMAL"] = "normal";
  TooltipThemes2["INVERSE"] = "inverse";
  return TooltipThemes2;
})(TooltipThemes || {});
const _sfc_main$m = defineComponent({
  name: "Tooltip",
  props: {
    container: HTMLElement,
    disabled: Boolean,
    noFocus: Boolean,
    preferredPosition: {
      type: String,
      default: "top right",
      validator: (value) => {
        if (typeof value !== "string")
          return false;
        const [vertical, horizontal] = value.split(" ");
        return Object.values(TooltipVerticalPosition).includes(vertical) && (!horizontal || Object.values(TooltipHorizontalPosition).includes(horizontal));
      }
    },
    margin: {
      type: Object,
      validator: (value) => typeof value === "object" && Object.entries(value).every(([position, margin]) => typeof margin === "number" && (Object.values(TooltipVerticalPosition).includes(position) || Object.values(TooltipHorizontalPosition).includes(position)))
    },
    autoWidth: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "normal",
      validator: (value) => Object.values(TooltipThemes).includes(value)
    },
    styles: Object
  },
  setup(props, context) {
    const tooltipTrigger$ = ref(null);
    const tooltipBox$ = ref(null);
    const root$ = ref(null);
    const verticalPosition = ref(null);
    const tooltipToggled = ref(false);
    const transitionPosition = ref(false);
    const mousedOver = ref(false);
    const mouseOverTimeout = ref(null);
    const lastToggle = ref(-1);
    const height = ref(0);
    const width = ref(0);
    const maxWidth = ref(0);
    const left = ref(0);
    const top = ref(0);
    const isShown = computed(() => {
      return (tooltipToggled.value || mousedOver.value) && !props.disabled;
    });
    const tooltipBoxStyles = computed(() => {
      return __spreadProps(__spreadValues({}, props.styles), {
        top: top.value + "px",
        left: left.value + "px",
        width: props.container && props.autoWidth ? width.value + "px" : (props.styles || {}).width,
        maxWidth: props.container ? maxWidth.value + "px" : (props.styles || {}).maxWidth
      });
    });
    onMounted(() => {
      if ("icon" in context.slots) {
        console.warn("Tooltip: Slot `icon` is deprecated and support will be removed in the future. Use slot `trigger` instead.");
      }
      if (props.container)
        setContainer(props.container);
    });
    onUnmounted(() => {
      if (props.container) {
        props.container.removeEventListener("scroll", updatePosition);
      }
    });
    function show() {
      tooltipToggled.value = true;
    }
    function hide(force = false) {
      tooltipToggled.value = false;
      if (tooltipTrigger$.value)
        tooltipTrigger$.value.blur();
      if (!force)
        return;
      mousedOver.value = false;
    }
    function toggle(force = false) {
      if (tooltipToggled.value || mousedOver.value) {
        hide(force);
      } else {
        show();
      }
    }
    watch(isShown, update);
    async function update(newWatcherValue) {
      if (!isShown.value) {
        transitionPosition.value = false;
        if (newWatcherValue === false) {
          lastToggle.value = Date.now();
          context.emit("hide");
        }
        return;
      } else if (newWatcherValue === true) {
        lastToggle.value = Date.now();
        context.emit("show");
      }
      if (props.container) {
        await new Promise((resolve) => requestAnimationFrame(() => {
          if (!props.container)
            return;
          const leftMargin = getMargin("left") || 0;
          const rightMargin = getMargin("right") || 0;
          maxWidth.value = props.container.offsetWidth - leftMargin - rightMargin;
          if (props.autoWidth)
            width.value = maxWidth.value;
          resolve(null);
        }));
      }
      await nextTick();
      if (!isShown.value || !tooltipBox$.value)
        return;
      height.value = tooltipBox$.value.offsetHeight;
      width.value = tooltipBox$.value.offsetWidth;
      updatePosition();
      await nextTick();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      transitionPosition.value = true;
    }
    watch(() => props.preferredPosition, updatePosition);
    function updatePosition() {
      if (!isShown.value || !tooltipTrigger$.value)
        return;
      let [preferredVerticalPosition, preferredHorizontalPosition] = props.preferredPosition.split(" ");
      preferredHorizontalPosition = preferredHorizontalPosition || "right";
      left.value = preferredHorizontalPosition === "right" ? Math.round(tooltipTrigger$.value.offsetWidth / 2 - 25) : Math.round(tooltipTrigger$.value.offsetWidth / 2 - width.value + 25);
      if (props.container) {
        const triggerBoundingRect = tooltipTrigger$.value.getBoundingClientRect();
        const containerBoundingRect = props.container.getBoundingClientRect();
        const topMargin = getMargin("top") || 0;
        const bottomMargin = getMargin("bottom") || 0;
        const spaceNeeded = height.value + 16;
        const fitsTop = triggerBoundingRect.top - containerBoundingRect.top - topMargin >= spaceNeeded;
        const fitsBottom = containerBoundingRect.bottom - triggerBoundingRect.bottom - bottomMargin >= spaceNeeded;
        if (preferredVerticalPosition === "top" && (fitsTop || !fitsBottom) || preferredVerticalPosition === "bottom" && (fitsTop && !fitsBottom)) {
          verticalPosition.value = "top";
        } else {
          verticalPosition.value = "bottom";
        }
        const leftMargin = getMargin("left") || 0;
        const rightMargin = getMargin("right") || 0;
        const leftBound = containerBoundingRect.left + leftMargin - triggerBoundingRect.left;
        const rightBound = containerBoundingRect.right - rightMargin - triggerBoundingRect.left;
        left.value = Math.max(leftBound, Math.min(rightBound - width.value, left.value));
      } else {
        verticalPosition.value = preferredVerticalPosition;
      }
      top.value = verticalPosition.value === "bottom" ? tooltipTrigger$.value.offsetHeight : -height.value;
    }
    watch(() => props.container, setContainer);
    async function setContainer(newContainer, oldContainer) {
      if (oldContainer) {
        oldContainer.removeEventListener("scroll", updatePosition);
      }
      if (newContainer) {
        await new Promise((resolve) => requestAnimationFrame(() => {
          if (newContainer.scrollHeight !== newContainer.offsetHeight) {
            newContainer.addEventListener("scroll", updatePosition);
          }
          resolve(null);
        }));
      }
      await update();
    }
    function getMargin(position) {
      if (props.margin && props.margin[position] !== void 0)
        return props.margin[position];
      const containerEl = props.container || null;
      if (!containerEl)
        return 0;
      if ((position === "top" || position === "bottom") && containerEl.scrollHeight !== containerEl.offsetHeight) {
        return 0;
      }
      return parseInt(window.getComputedStyle(containerEl, null).getPropertyValue(`padding-${position}`), 10);
    }
    function mouseOver(mouseOverTooltip) {
      if (!mouseOverTooltip) {
        mouseOverTimeout.value = window.setTimeout(() => mousedOver.value = false, 100);
      } else {
        if (mouseOverTimeout.value)
          window.clearTimeout(mouseOverTimeout.value);
        mousedOver.value = true;
      }
    }
    function onClick() {
      if (Date.now() - lastToggle.value < 200)
        return;
      toggle(true);
      context.emit("click");
    }
    context.expose({ show, hide, toggle, update });
    return {
      TooltipThemes,
      tooltipTrigger$,
      tooltipBox$,
      root$,
      verticalPosition,
      transitionPosition,
      isShown,
      tooltipBoxStyles,
      show,
      hide,
      mouseOver,
      onClick
    };
  },
  components: { AlertTriangleIcon }
});
const _hoisted_1$k = ["tabindex"];
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AlertTriangleIcon = resolveComponent("AlertTriangleIcon");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(["tooltip", [_ctx.verticalPosition, {
      shown: _ctx.isShown,
      "transition-position": _ctx.transitionPosition,
      "inverse-theme": _ctx.theme === _ctx.TooltipThemes.INVERSE
    }]]),
    ref: "root$",
    onMouseenter: _cache[3] || (_cache[3] = ($event) => _ctx.mouseOver(true)),
    onMouseleave: _cache[4] || (_cache[4] = ($event) => _ctx.mouseOver(false))
  }, [
    createElementVNode("a", {
      href: "javascript:void(0);",
      ref: "tooltipTrigger$",
      onFocus: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.show(), ["stop"])),
      onBlur: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.hide(), ["stop"])),
      onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onClick()),
      tabindex: _ctx.disabled || _ctx.noFocus ? -1 : 0,
      class: "trigger"
    }, [
      !_ctx.$slots.icon ? renderSlot(_ctx.$slots, "trigger", { key: 0 }, () => [
        createVNode(_component_AlertTriangleIcon, { class: "nq-orange" })
      ], true) : createCommentVNode("", true),
      _ctx.$slots.icon && !_ctx.$slots.trigger ? renderSlot(_ctx.$slots, "icon", { key: 1 }, void 0, true) : createCommentVNode("", true)
    ], 40, _hoisted_1$k),
    createVNode(Transition, { name: "transition-fade" }, {
      default: withCtx(() => [
        _ctx.isShown ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref: "tooltipBox$",
          class: "tooltip-box",
          style: normalizeStyle(_ctx.tooltipBoxStyles)
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)) : createCommentVNode("", true)
      ]),
      _: 3
    })
  ], 34);
}
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-0e12440b"]]);
var AccountList_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$l = defineComponent({
  name: "AccountList",
  emits: ["account-selected", "account-changed"],
  props: {
    accounts: {
      type: Array,
      required: true
    },
    disabledAddresses: {
      type: Array,
      default: () => []
    },
    walletId: String,
    editable: Boolean,
    decimals: Number,
    minBalance: Number,
    disableContracts: Boolean,
    disabled: Boolean,
    tooltipProps: Object
  },
  methods: { $t: loadI18n("AccountList") },
  setup: (props, context) => {
    const highlightedDisabledAddress = ref(null);
    const highlightedDisabledAddressTimeout = ref(-1);
    const accounts$ = ref({});
    const tooltips$ = ref({});
    function focus(address) {
      if (props.editable && accounts$.value.hasOwnProperty(address)) {
        accounts$.value[address].focus();
      }
    }
    onBeforeUpdate(() => {
      accounts$.value = {};
      tooltips$.value = {};
    });
    function accountSelected(account) {
      if (props.disabled || props.editable)
        return;
      window.clearTimeout(highlightedDisabledAddressTimeout.value);
      if (account.userFriendlyAddress !== highlightedDisabledAddress.value) {
        _clearHighlightedDisabledAddress();
      }
      const isDisabledContract = _isDisabledContract(account);
      const isDisabledAccount = _isDisabledAccount(account);
      if (isDisabledContract || isDisabledAccount || _hasInsufficientBalance(account)) {
        highlightedDisabledAddress.value = account.userFriendlyAddress;
        if (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`]) {
          tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`].show();
        }
        const waitTime = isDisabledContract || isDisabledAccount ? 2e3 : 300;
        highlightedDisabledAddressTimeout.value = window.setTimeout(() => _clearHighlightedDisabledAddress(), waitTime);
      } else {
        context.emit("account-selected", account.walletId || props.walletId, account.userFriendlyAddress);
      }
    }
    function onAccountChanged(address, label) {
      context.emit("account-changed", address, label);
    }
    function _isDisabled(account) {
      return props.disabled || !props.editable && (_isDisabledContract(account) || _isDisabledAccount(account) || _hasInsufficientBalance(account));
    }
    function _isDisabledContract(account) {
      return props.disableContracts && !("path" in account && account.path);
    }
    function _isDisabledAccount(account) {
      return props.disabledAddresses.includes(account.userFriendlyAddress);
    }
    function _hasInsufficientBalance(account) {
      return props.minBalance && (account.balance || 0) < props.minBalance;
    }
    function _hasTooltip(account) {
      return !props.disabled && !props.editable && (_isDisabledContract(account) || _isDisabledAccount(account));
    }
    function _clearHighlightedDisabledAddress() {
      if (!highlightedDisabledAddress.value)
        return;
      if (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`]) {
        tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`].hide(false);
      }
      highlightedDisabledAddress.value = null;
    }
    return {
      highlightedDisabledAddress,
      highlightedDisabledAddressTimeout,
      accounts$,
      tooltips$,
      focus,
      accountSelected,
      onAccountChanged,
      _isDisabled,
      _isDisabledContract,
      _isDisabledAccount,
      _hasInsufficientBalance,
      _hasTooltip,
      _clearHighlightedDisabledAddress
    };
  },
  components: {
    Account,
    CaretRightSmallIcon,
    Tooltip
  }
});
const _hoisted_1$j = { class: "account-list" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Account = resolveComponent("Account");
  const _component_CaretRightSmallIcon = resolveComponent("CaretRightSmallIcon");
  const _component_Tooltip = resolveComponent("Tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1$j, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.accounts, (account) => {
      return openBlock(), createBlock(resolveDynamicComponent(!_ctx._isDisabled(account) && !_ctx.editable ? "a" : "div"), {
        href: "javascript:void(0)",
        class: normalizeClass(["account-entry", {
          "disabled": _ctx._isDisabled(account),
          "has-tooltip": _ctx._hasTooltip(account),
          "highlight-insufficient-balance": _ctx.highlightedDisabledAddress === account.userFriendlyAddress && _ctx._hasInsufficientBalance(account) && !_ctx._isDisabledContract(account) && !_ctx._isDisabledAccount(account)
        }]),
        onClick: ($event) => _ctx.accountSelected(account),
        key: account.userFriendlyAddress
      }, {
        default: withCtx(() => [
          createVNode(_component_Account, {
            ref_for: true,
            ref: (account$) => _ctx.accounts$[account.userFriendlyAddress] = account$,
            address: account.userFriendlyAddress,
            label: account.label,
            placeholder: "",
            balance: _ctx.minBalance ? account.balance : void 0,
            decimals: _ctx.decimals,
            editable: _ctx.editable && !_ctx.disabled,
            onChanged: ($event) => _ctx.onAccountChanged(account.userFriendlyAddress, $event)
          }, null, 8, ["address", "label", "placeholder", "balance", "decimals", "editable", "onChanged"]),
          !_ctx._isDisabled(account) ? (openBlock(), createBlock(_component_CaretRightSmallIcon, {
            key: 0,
            class: "caret"
          })) : createCommentVNode("", true),
          _ctx._hasTooltip(account) ? (openBlock(), createBlock(_component_Tooltip, mergeProps({
            key: 1,
            ref_for: true,
            ref: (tooltip$) => _ctx.tooltips$[`tooltip-${account.userFriendlyAddress}`] = tooltip$
          }, __spreadProps(__spreadValues({
            preferredPosition: "bottom left"
          }, _ctx.tooltipProps), {
            styles: __spreadValues({
              width: "22.25rem",
              pointerEvents: "none"
            }, _ctx.tooltipProps ? _ctx.tooltipProps.styles : void 0)
          }), {
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }), {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx._isDisabledContract(account) ? _ctx.$t("Contracts cannot be used for this operation.") : _ctx.$t("This address cannot be used for this operation.")), 1)
            ]),
            _: 2
          }, 1040)) : createCommentVNode("", true)
        ]),
        _: 2
      }, 1032, ["class", "onClick"]);
    }), 128))
  ]);
}
var AccountList = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-73b0d882"]]);
var AccountRing_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$k = defineComponent({
  name: "AccountRing",
  components: { Identicon },
  props: {
    addresses: { default: () => [], type: Array },
    animate: { default: false, type: Boolean }
  }
});
const _hoisted_1$i = { class: "account-ring" };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Identicon = resolveComponent("Identicon");
  return openBlock(), createElementBlock("div", _hoisted_1$i, [
    (openBlock(), createElementBlock(Fragment, null, renderList(6, (n) => {
      return createElementVNode("div", {
        class: "account",
        key: n
      }, [
        createVNode(_component_Identicon, {
          address: _ctx.addresses[n - 1],
          class: normalizeClass({ "pop-in": _ctx.animate && _ctx.addresses.length >= n })
        }, null, 8, ["address", "class"])
      ]);
    }), 64))
  ]);
}
var AccountRing = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-7c6b58b8"]]);
var AccountSelector_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$j = defineComponent({
  name: "AccountSelector",
  emits: ["account-selected", "login"],
  components: { AccountList, Tooltip },
  props: {
    wallets: {
      type: Array,
      required: true
    },
    disabledAddresses: {
      type: Array,
      default: () => []
    },
    allowLogin: {
      type: Boolean,
      default: true
    },
    decimals: Number,
    minBalance: Number,
    disableContracts: Boolean,
    disableLegacyAccounts: Boolean,
    disableBip39Accounts: Boolean,
    disableLedgerAccounts: Boolean,
    highlightBitcoinAccounts: Boolean
  },
  methods: { $t: loadI18n("AccountSelector") },
  setup: (props, context) => {
    const container$ = ref(null);
    const tooltips$ = ref({});
    onBeforeUpdate(() => tooltips$.value = {});
    const shownTooltip = ref(null);
    const hideTooltipTimeout = ref(-1);
    const tooltipProps = ref({
      get container() {
        return container$.value;
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
    });
    const sortedWallets = computed(() => {
      return props.wallets.slice(0).sort((a, b) => {
        const aDisabled = _isAccountDisabled(a);
        const bDisabled = _isAccountDisabled(b);
        if (aDisabled && !bDisabled)
          return 1;
        if (!aDisabled && bDisabled)
          return -1;
        if (!props.minBalance)
          return 0;
        const hasAddressWithSufficientBalance = (accounts, contracts) => Array.from(accounts.values()).some((account) => (account.balance || 0) >= (props.minBalance || 0)) || !props.disableContracts && contracts.some((contract) => (contract.balance || 0) >= (props.minBalance || 0));
        const aHasAddressWithSufficientBalance = hasAddressWithSufficientBalance(a.accounts, a.contracts);
        const bHasAddressWithSufficientBalance = hasAddressWithSufficientBalance(b.accounts, b.contracts);
        if (!aHasAddressWithSufficientBalance && bHasAddressWithSufficientBalance)
          return 1;
        if (aHasAddressWithSufficientBalance && !bHasAddressWithSufficientBalance)
          return -1;
        return 0;
      });
    });
    function onAccountSelected(walletId, address) {
      context.emit("account-selected", { walletId, address });
    }
    function onLogin() {
      context.emit("login");
    }
    function _isAccountDisabled(account) {
      return props.disableLegacyAccounts && account.type === 1 || props.disableBip39Accounts && account.type === 2 || props.disableLedgerAccounts && account.type === 3;
    }
    function _getAccountTypeName(account) {
      switch (account.type) {
        case 1:
          return loadI18n("AccountSelector")("Legacy");
        case 2:
          return "Keyguard";
        case 3:
          return "Ledger";
        default:
          throw new Error(`Unknown account type ${account.type}`);
      }
    }
    function _accountClicked(account) {
      window.clearTimeout(hideTooltipTimeout.value);
      const tooltip = tooltips$.value[`tooltip-${account.id}`] ? tooltips$.value[`tooltip-${account.id}`][0] : null;
      if (shownTooltip.value && shownTooltip.value !== tooltip) {
        shownTooltip.value.hide(false);
      }
      if (tooltip) {
        tooltip.show();
        hideTooltipTimeout.value = window.setTimeout(() => {
          tooltip.hide(false);
          shownTooltip.value = null;
        }, 2e3);
      }
      shownTooltip.value = tooltip;
    }
    function listAccountsAndContracts(wallet) {
      return [...wallet.accounts.values(), ...wallet.contracts];
    }
    function sortAccountsAndContracts(accounts, minBalance, disableContracts, disabledAddresses) {
      if (!minBalance)
        return accounts;
      return accounts.sort((a, b) => {
        const aIsDisabledContract = disableContracts && !("path" in a && a.path);
        const bIsDisabledContract = disableContracts && !("path" in b && b.path);
        if (aIsDisabledContract && !bIsDisabledContract)
          return 1;
        if (!aIsDisabledContract && bIsDisabledContract)
          return -1;
        const aIsDisabledAddress = disabledAddresses && disabledAddresses.includes(a.userFriendlyAddress);
        const bIsDisabledAddress = disabledAddresses && disabledAddresses.includes(b.userFriendlyAddress);
        if (aIsDisabledAddress && !bIsDisabledAddress)
          return 1;
        if (!aIsDisabledAddress && bIsDisabledAddress)
          return -1;
        if ((!a.balance || a.balance < minBalance) && b.balance && b.balance >= minBalance)
          return 1;
        if ((!b.balance || b.balance < minBalance) && a.balance && a.balance >= minBalance)
          return -1;
        return 0;
      });
    }
    return {
      container$,
      tooltips$,
      tooltipProps,
      sortedWallets,
      onAccountSelected,
      onLogin,
      listAccountsAndContracts,
      sortAccountsAndContracts,
      _isAccountDisabled,
      _getAccountTypeName,
      _accountClicked
    };
  }
});
const _hoisted_1$h = { class: "account-selector" };
const _hoisted_2$a = {
  key: 0,
  class: "wallet-label"
};
const _hoisted_3$9 = { class: "nq-label" };
const _hoisted_4$6 = {
  key: 0,
  class: "btc-pill"
};
const _hoisted_5$4 = { class: "footer" };
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Tooltip = resolveComponent("Tooltip");
  const _component_AccountList = resolveComponent("AccountList");
  return openBlock(), createElementBlock("div", _hoisted_1$h, [
    createElementVNode("div", {
      ref: "container$",
      class: normalizeClass(["container", { "extra-spacing": _ctx.wallets.length === 1 }])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sortedWallets, (wallet) => {
        return openBlock(), createElementBlock("div", {
          key: wallet.id
        }, [
          _ctx.wallets.length > 1 || _ctx._isAccountDisabled(wallet) ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
            createElementVNode("div", _hoisted_3$9, [
              createTextVNode(toDisplayString(wallet.label) + " ", 1),
              _ctx.highlightBitcoinAccounts && wallet.btcXPub ? (openBlock(), createElementBlock("span", _hoisted_4$6, "BTC")) : createCommentVNode("", true)
            ]),
            _ctx._isAccountDisabled(wallet) ? (openBlock(), createBlock(_component_Tooltip, {
              key: 0,
              ref_for: true,
              ref: (tooltip$) => _ctx.tooltips$[`tooltip-${wallet.id}`] = tooltip$,
              margin: _ctx.tooltipProps.margin,
              container: _ctx.tooltipProps.container || void 0,
              preferredPosition: _ctx.tooltipProps.preferredPosition,
              styles: __spreadValues({ width: "25.25rem" }, _ctx.tooltipProps.styles)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t("{type} accounts cannot be used for this operation.", { type: _ctx._getAccountTypeName(wallet) })), 1)
              ]),
              _: 2
            }, 1032, ["margin", "container", "preferredPosition", "styles"])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createVNode(_component_AccountList, {
            accounts: _ctx.sortAccountsAndContracts(_ctx.listAccountsAndContracts(wallet), _ctx.minBalance, _ctx.disableContracts, _ctx.disabledAddresses),
            disabledAddresses: _ctx.disabledAddresses,
            walletId: wallet.id,
            minBalance: _ctx.minBalance,
            decimals: _ctx.decimals,
            disableContracts: _ctx.disableContracts,
            disabled: _ctx._isAccountDisabled(wallet),
            tooltipProps: _ctx.tooltipProps,
            onAccountSelected: _ctx.onAccountSelected,
            onClick: ($event) => _ctx._accountClicked(wallet)
          }, null, 8, ["accounts", "disabledAddresses", "walletId", "minBalance", "decimals", "disableContracts", "disabled", "tooltipProps", "onAccountSelected", "onClick"])
        ]);
      }), 128))
    ], 2),
    createElementVNode("div", _hoisted_5$4, [
      _ctx.allowLogin ? (openBlock(), createElementBlock("button", {
        key: 0,
        class: "nq-button-s",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onLogin && _ctx.onLogin(...args))
      }, toDisplayString(_ctx.$t("Login to another account")), 1)) : createCommentVNode("", true)
    ])
  ]);
}
var AccountSelector = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-6fad498a"]]);
function count_occurences(symbol, string) {
  var count = 0;
  for (var _iterator = string.split(""), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
    var _ref;
    if (_isArray) {
      if (_i >= _iterator.length)
        break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done)
        break;
      _ref = _i.value;
    }
    var character = _ref;
    if (character === symbol) {
      count++;
    }
  }
  return count;
}
function closeBraces(retained_template, template) {
  var placeholder = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x";
  var empty_placeholder = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
  var cut_before = retained_template.length;
  var opening_braces = count_occurences("(", retained_template);
  var closing_braces = count_occurences(")", retained_template);
  var dangling_braces = opening_braces - closing_braces;
  while (dangling_braces > 0 && cut_before < template.length) {
    retained_template += template[cut_before].replace(placeholder, empty_placeholder);
    if (template[cut_before] === ")") {
      dangling_braces--;
    }
    cut_before++;
  }
  return retained_template;
}
function template_formatter(template) {
  var placeholder = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x";
  var should_close_braces = arguments.length > 2 ? arguments[2] : void 0;
  if (!template) {
    return function(value) {
      return {
        text: value
      };
    };
  }
  var characters_in_template = count_occurences(placeholder, template);
  return function(value) {
    if (!value) {
      return {
        text: "",
        template
      };
    }
    var value_character_index = 0;
    var filled_in_template = "";
    for (var _iterator = template.split(""), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
      var _ref;
      if (_isArray) {
        if (_i >= _iterator.length)
          break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done)
          break;
        _ref = _i.value;
      }
      var character = _ref;
      if (character !== placeholder) {
        filled_in_template += character;
        continue;
      }
      filled_in_template += value[value_character_index];
      value_character_index++;
      if (value_character_index === value.length) {
        if (value.length < characters_in_template) {
          break;
        }
      }
    }
    if (should_close_braces) {
      filled_in_template = closeBraces(filled_in_template, template);
    }
    return {
      text: filled_in_template,
      template
    };
  };
}
function parse(text, caret_position, parse_character) {
  var value = "";
  var focused_input_character_index = 0;
  var index = 0;
  while (index < text.length) {
    var character = parse_character(text[index], value);
    if (character !== void 0) {
      value += character;
      if (caret_position !== void 0) {
        if (caret_position === index) {
          focused_input_character_index = value.length - 1;
        } else if (caret_position > index) {
          focused_input_character_index = value.length;
        }
      }
    }
    index++;
  }
  if (caret_position === void 0) {
    focused_input_character_index = value.length;
  }
  var result = {
    value,
    caret: focused_input_character_index
  };
  return result;
}
function format(value, caret, formatter) {
  if (typeof formatter === "string") {
    formatter = template_formatter(formatter);
  }
  var _ref = formatter(value) || {}, text = _ref.text, template = _ref.template;
  if (text === void 0) {
    text = value;
  }
  if (template) {
    if (caret === void 0) {
      caret = text.length;
    } else {
      var index = 0;
      var found = false;
      var possibly_last_input_character_index = -1;
      while (index < text.length && index < template.length) {
        if (text[index] !== template[index]) {
          if (caret === 0) {
            found = true;
            caret = index;
            break;
          }
          possibly_last_input_character_index = index;
          caret--;
        }
        index++;
      }
      if (!found) {
        caret = possibly_last_input_character_index + 1;
      }
    }
  }
  return {
    text,
    caret
  };
}
function edit(value, caret, operation) {
  switch (operation) {
    case "Backspace":
      if (caret > 0) {
        value = value.slice(0, caret - 1) + value.slice(caret);
        caret--;
      }
      break;
    case "Delete":
      value = value.slice(0, caret) + value.slice(caret + 1);
      break;
  }
  return {
    value,
    caret
  };
}
function isReadOnly(element) {
  return element.hasAttribute("readonly");
}
function getSelection(element) {
  if (element.selectionStart === element.selectionEnd) {
    return;
  }
  return {
    start: element.selectionStart,
    end: element.selectionEnd
  };
}
var Keys = {
  Backspace: 8,
  Delete: 46
};
function getOperation(event) {
  switch (event.keyCode) {
    case Keys.Backspace:
      return "Backspace";
    case Keys.Delete:
      return "Delete";
  }
}
function getCaretPosition(element) {
  return element.selectionStart;
}
function setCaretPosition(element, caret_position) {
  if (caret_position === void 0) {
    return;
  }
  if (isAndroid()) {
    setTimeout(function() {
      return element.setSelectionRange(caret_position, caret_position);
    }, 0);
  } else {
    element.setSelectionRange(caret_position, caret_position);
  }
}
function isAndroid() {
  if (typeof navigator !== "undefined") {
    return ANDROID_USER_AGENT_REG_EXP.test(navigator.userAgent);
  }
}
var ANDROID_USER_AGENT_REG_EXP = /Android/i;
function onCut(event, input, _parse2, _format2, on_change) {
  if (isReadOnly(input)) {
    return;
  }
  setTimeout(function() {
    return formatInputText(input, _parse2, _format2, void 0, on_change);
  }, 0);
}
function onPaste(event, input, _parse2, _format2, on_change) {
  if (isReadOnly(input)) {
    return;
  }
  var selection = getSelection(input);
  if (selection) {
    eraseSelection(input, selection);
  }
  formatInputText(input, _parse2, _format2, void 0, on_change);
}
function onChange(event, input, _parse2, _format2, on_change) {
  formatInputText(input, _parse2, _format2, void 0, on_change);
}
function onKeyDown(event, input, _parse2, _format2, on_change) {
  if (isReadOnly(input)) {
    return;
  }
  var operation = getOperation(event);
  switch (operation) {
    case "Delete":
    case "Backspace":
      event.preventDefault();
      var selection = getSelection(input);
      if (selection) {
        eraseSelection(input, selection);
        return formatInputText(input, _parse2, _format2, void 0, on_change);
      }
      return formatInputText(input, _parse2, _format2, operation, on_change);
  }
}
function eraseSelection(input, selection) {
  var text = input.value;
  text = text.slice(0, selection.start) + text.slice(selection.end);
  input.value = text;
  setCaretPosition(input, selection.start);
}
function formatInputText(input, _parse2, _format2, operation, on_change) {
  var _parse22 = parse(input.value, getCaretPosition(input), _parse2), value = _parse22.value, caret = _parse22.caret;
  if (operation) {
    var newValueAndCaret = edit(value, caret, operation);
    value = newValueAndCaret.value;
    caret = newValueAndCaret.caret;
  }
  var formatted = format(value, caret, _format2);
  var text = formatted.text;
  caret = formatted.caret;
  input.value = text;
  setCaretPosition(input, caret);
  on_change(value);
}
var AddressInput_vue_vue_type_style_index_0_scoped_true_lang = "";
const ADDRESS_MAX_LENGTH_WITHOUT_SPACES = 9 * 4;
const ADDRESS_MAX_LENGTH = ADDRESS_MAX_LENGTH_WITHOUT_SPACES + 8;
function _parse(char, value, allowDomains = false) {
  if (!allowDomains || _willBeAddress(value + char)) {
    switch (char.toUpperCase()) {
      case "I":
        char = "1";
        break;
      case "O":
        char = "0";
        break;
      case "Z":
        char = "2";
        break;
      case "W":
        return;
    }
    const regex = new RegExp(`^(N(Q?)|NQ\\d{1,2}|NQ\\d{2}[0-9A-Z]{1,${ADDRESS_MAX_LENGTH_WITHOUT_SPACES - 4}})$`, "i");
    if (regex.test(value + char))
      return char;
    else
      return;
  } else {
    if (/^[-a-z0-9]*([a-z0-9]\.[a-z]*)?$/i.test(value + char))
      return char;
    else
      return;
  }
}
function _format(value, allowDomains = false) {
  if (!allowDomains || _willBeAddress(value)) {
    if (value !== "" && value.toUpperCase() !== "N") {
      value = _stripWhitespace(value).replace(/.{4}/g, (match, offset) => `${match}${(offset + 4) % 12 ? " " : "\n"}`).substring(0, ADDRESS_MAX_LENGTH);
      if (value.endsWith(" ")) {
        value += "\u200B";
      }
    }
    return {
      text: value,
      template: "wwww wwww wwww\nwwww wwww wwww\nwwww wwww wwww"
    };
  } else {
    return {
      text: value
    };
  }
}
function _stripWhitespace(value) {
  return value.replace(/\s|\u200B/g, "");
}
function _exportValue(value, allowDomains = false) {
  if (!allowDomains || _willBeAddress(value)) {
    return value.toUpperCase().replace(/\n/g, " ").replace(/\u200B/g, "");
  } else {
    return value.replace(/\n/g, "").replace(/\u200B/g, "");
  }
}
function _willBeAddress(value) {
  if (value.length < 3)
    return false;
  if (value.toUpperCase().startsWith("NQ") && !isNaN(parseInt(value[2], 10)))
    return true;
  return false;
}
const _sfc_main$i = defineComponent({
  name: "AddressInput",
  emits: ["paste", "update:modelValue", "address"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    autofocus: Boolean,
    allowDomains: Boolean
  },
  setup(props, context) {
    function focus(scrollIntoView = false) {
      if (!textarea$.value)
        return;
      textarea$.value.focus();
      if (scrollIntoView)
        textarea$.value.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const root$ = ref(null);
    const textarea$ = ref(null);
    const currentValue = ref("");
    const selectionStartBlock = ref(-1);
    const selectionEndBlock = ref(-1);
    const supportsMixBlendMode = CSS.supports("mix-blend-mode", "screen");
    const willBeAddress = computed(() => !props.allowDomains || _willBeAddress(currentValue.value));
    const isDomain = computed(() => currentValue.value.length >= 3 && !willBeAddress.value);
    onMounted(() => {
      _onExternalValueChange();
      document.addEventListener("selectionchange", _updateSelection);
      if (props.autofocus)
        focus();
    });
    onUnmounted(() => {
      document.removeEventListener("selectionchange", _updateSelection);
    });
    watch(() => props.modelValue, () => _onExternalValueChange());
    function _onExternalValueChange() {
      if (_stripWhitespace(props.modelValue) === _stripWhitespace(currentValue.value))
        return;
      const parsedValue = props.modelValue.split("").reduce((parsed, char) => parsed + (_parse(char, parsed, props.allowDomains) || ""), "");
      if (textarea$.value) {
        textarea$.value.value = _format(parsedValue, props.allowDomains).text;
      }
      _afterChange(parsedValue);
    }
    function _onKeyDown(e2) {
      onKeyDown(e2, textarea$.value, (char, value) => _parse(char, value, props.allowDomains), (value) => _format(value, props.allowDomains), _afterChange);
      setTimeout(() => _updateSelection(), 10);
    }
    function _onInput(e2) {
      if (e2.inputType === "deleteByDrag")
        return;
      const textarea = textarea$.value;
      onChange(e2, textarea, (char, value) => _parse(char, value, props.allowDomains), (value) => _format(value, props.allowDomains), _afterChange);
    }
    function _onPaste(e2) {
      const clipboardData = e2.clipboardData;
      const pastedData = clipboardData ? clipboardData.getData("text/plain") : "";
      context.emit("paste", e2, pastedData);
      onPaste(e2, textarea$.value, (char, value) => _parse(char, value, props.allowDomains), (value) => _format(value, props.allowDomains), _afterChange);
    }
    function _onCut(e2) {
      onCut(e2, textarea$.value, (char, value) => _parse(char, value, props.allowDomains), (value) => _format(value, props.allowDomains), _afterChange);
      _formatClipboard();
    }
    function _onFocus() {
      setTimeout(() => _updateSelection());
    }
    function _formatClipboard() {
      const text = _exportValue(document.getSelection().toString(), props.allowDomains);
      setTimeout(() => Clipboard.copy(text));
    }
    function _afterChange(value) {
      if (!textarea$.value)
        return;
      const textarea = textarea$.value;
      if (textarea.selectionStart === textarea.selectionEnd && (textarea.value[textarea.selectionStart] === " " || textarea.value[textarea.selectionStart] === "\n")) {
        textarea.selectionStart += 1;
      }
      currentValue.value = _exportValue(textarea$.value.value, props.allowDomains);
      context.emit("update:modelValue", currentValue.value);
      if (_willBeAddress(value)) {
        const isValid = ValidationUtils.isValidAddress(currentValue.value);
        if (isValid)
          context.emit("address", currentValue.value);
        if (root$.value) {
          root$.value.classList.toggle("invalid", currentValue.value.length === ADDRESS_MAX_LENGTH && !isValid);
        }
      }
    }
    function _updateSelection() {
      if (!textarea$.value)
        return;
      const textarea = textarea$.value;
      const focused = document.activeElement === textarea && (textarea.selectionStart !== ADDRESS_MAX_LENGTH || textarea.selectionEnd !== ADDRESS_MAX_LENGTH);
      selectionStartBlock.value = focused ? Math.floor(textarea.selectionStart / 5) : -1;
      selectionEndBlock.value = focused ? Math.floor(textarea.selectionEnd / 5) : -1;
    }
    function _isBlockFocused(blockIndex) {
      return selectionStartBlock.value <= blockIndex && blockIndex <= selectionEndBlock.value;
    }
    return {
      root$,
      textarea$,
      currentValue,
      supportsMixBlendMode,
      willBeAddress,
      isDomain,
      _onKeyDown,
      _onInput,
      _onPaste,
      _onCut,
      _onFocus,
      _formatClipboard,
      _updateSelection,
      _isBlockFocused
    };
  }
});
const _hoisted_1$g = /* @__PURE__ */ createStaticVNode('<svg width="210" height="99" viewBox="0 0 210 99" fill="none" xmlns="http://www.w3.org/2000/svg" class="grid" data-v-69cc6516><g stroke-width="1.5" stroke-linecap="round" data-v-69cc6516><line x1="67.75" y1="0.75" x2="67.75" y2="22.25" data-v-69cc6516></line><line x1="67.75" y1="37.75" x2="67.75" y2="60.25" data-v-69cc6516></line><line x1="67.75" y1="75.75" x2="67.75" y2="98.25" data-v-69cc6516></line><line x1="0.75" y1="30.25" x2="209.25" y2="30.25" data-v-69cc6516></line><line x1="0.75" y1="68.25" x2="209.25" y2="68.25" data-v-69cc6516></line><line x1="143.75" y1="37.75" x2="143.75" y2="60.25" data-v-69cc6516></line><line x1="143.75" y1="0.75" x2="143.75" y2="22.25" data-v-69cc6516></line><line x1="143.75" y1="75.75" x2="143.75" y2="98.25" data-v-69cc6516></line></g></svg>', 1);
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["address-input", { "is-domain": _ctx.isDomain }]),
    ref: "root$"
  }, [
    createElementVNode("textarea", {
      ref: "textarea$",
      spellcheck: "false",
      autocomplete: "off",
      class: normalizeClass({ "will-be-address": _ctx.willBeAddress }),
      onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx._onKeyDown && _ctx._onKeyDown(...args)),
      onInput: _cache[1] || (_cache[1] = (...args) => _ctx._onInput && _ctx._onInput(...args)),
      onPaste: _cache[2] || (_cache[2] = (...args) => _ctx._onPaste && _ctx._onPaste(...args)),
      onCut: _cache[3] || (_cache[3] = (...args) => _ctx._onCut && _ctx._onCut(...args)),
      onCopy: _cache[4] || (_cache[4] = (...args) => _ctx._formatClipboard && _ctx._formatClipboard(...args)),
      onClick: _cache[5] || (_cache[5] = (...args) => _ctx._updateSelection && _ctx._updateSelection(...args)),
      onSelect: _cache[6] || (_cache[6] = (...args) => _ctx._updateSelection && _ctx._updateSelection(...args)),
      onBlur: _cache[7] || (_cache[7] = (...args) => _ctx._updateSelection && _ctx._updateSelection(...args)),
      onFocus: _cache[8] || (_cache[8] = (...args) => _ctx._onFocus && _ctx._onFocus(...args))
    }, null, 34),
    _ctx.willBeAddress && _ctx.supportsMixBlendMode ? (openBlock(), createElementBlock(Fragment, { key: 0 }, renderList(3, (row) => {
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createElementBlock(Fragment, null, renderList(3, (column) => {
          return createElementVNode("div", {
            key: `color-${row}-${column}`,
            class: "color-overlay",
            style: normalizeStyle({
              visibility: _ctx.currentValue ? "visible" : "hidden",
              left: `calc(${column - 1} * (var(--block-width) + var(--block-gap-h)) + var(--block-gap-h) - 0.25rem)`,
              top: `calc(${row - 1} * (var(--block-height) + var(--block-gap-v)) + var(--block-gap-v) + 0.25rem)`,
              background: `var(--nimiq-${_ctx._isBlockFocused((row - 1) * 3 + (column - 1)) ? "light-" : ""}blue)`
            })
          }, null, 4);
        }), 64))
      ], 64);
    }), 64)) : createCommentVNode("", true),
    _hoisted_1$g
  ], 2);
}
var AddressInput = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-69cc6516"]]);
var AmountInput_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$h = defineComponent({
  name: "AmountInput",
  emits: ["update:modelValue"],
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
      default: false
    },
    decimals: {
      type: Number,
      default: 5
    }
  },
  setup(props, context) {
    const fullWidth$ = ref(null);
    const input$ = ref(null);
    const widthPlaceholder$ = ref(null);
    const widthValue$ = ref(null);
    const liveValue = ref("");
    const lastEmittedValue = ref(0);
    const width = ref(50);
    const fontSize = ref(props.maxFontSize);
    const maxWidth = ref(0);
    const valueInLuna = ref(0);
    const isFocussed = ref(false);
    onMounted(() => {
      if (props.maxFontSize && fullWidth$.value) {
        maxWidth.value = fullWidth$.value.offsetWidth;
      }
    });
    function focus() {
      if (input$.value) {
        input$.value.focus();
      }
    }
    context.expose({ focus });
    function updateValue(newValue) {
      if (newValue === valueInLuna.value)
        return;
      lastEmittedValue.value = newValue || 0;
      formattedValue.value = newValue ? (newValue / Math.pow(10, props.decimals)).toString() : "";
      updateWidth();
    }
    async function updateWidth() {
      await nextTick();
      if (!widthPlaceholder$.value || !widthValue$.value)
        return;
      const placeholderWidth = widthPlaceholder$.value.offsetWidth;
      const valueWidth = widthValue$.value.offsetWidth;
      const fontSizeFactor = Math.min(1, Math.max(maxWidth.value / valueWidth, 1 / props.maxFontSize));
      fontSize.value = fontSizeFactor * props.maxFontSize;
      width.value = formattedValue.value ? fontSizeFactor === 1 ? valueWidth : maxWidth.value : placeholderWidth;
    }
    const formattedValue = computed({
      get() {
        return liveValue.value;
      },
      set(value) {
        liveValue.value = value;
        if (!value) {
          liveValue.value = "";
          lastEmittedValue.value = 0;
          valueInLuna.value = 0;
          context.emit("update:modelValue", valueInLuna.value);
          return;
        }
        value = value.replace(/\,/, ".");
        const regExp = new RegExp(`(\\d*)(\\.(\\d{0,${props.decimals}}))?`, "g");
        const regExpResult = regExp.exec(value);
        if (regExpResult[1] || regExpResult[2]) {
          liveValue.value = `${regExpResult[1] ? regExpResult[1] : "0"}${regExpResult[2] ? regExpResult[2] : ""}`;
          valueInLuna.value = Number(`${regExpResult[1]}${(regExpResult[2] ? regExpResult[3] : "").padEnd(props.decimals, "0")}`);
        } else {
          liveValue.value = "";
          valueInLuna.value = 0;
        }
        if (lastEmittedValue.value !== valueInLuna.value) {
          context.emit("update:modelValue", valueInLuna.value);
          lastEmittedValue.value = valueInLuna.value;
        }
      }
    });
    watch(formattedValue, updateWidth);
    watch(() => props.modelValue, (newValue) => newValue && updateValue(newValue), { immediate: true });
    return {
      fullWidth$,
      input$,
      widthPlaceholder$,
      widthValue$,
      valueInLuna,
      isFocussed,
      maxWidth,
      formattedValue,
      width,
      fontSize
    };
  }
});
const _withScopeId$5 = (n) => (pushScopeId("data-v-9ca624f4"), n = n(), popScopeId(), n);
const _hoisted_1$f = ["placeholder"];
const _hoisted_2$9 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("span", { class: "nim" }, "NIM", -1));
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["amount-input", { "has-value": _ctx.valueInLuna > 0, "focussed": _ctx.isFocussed }])
  }, [
    createElementVNode("form", {
      class: "label-input",
      onSubmit: _cache[3] || (_cache[3] = withModifiers(() => {
      }, ["prevent"])),
      ref: "fullWidth$"
    }, [
      createElementVNode("span", {
        class: "width-finder width-placeholder",
        ref: "widthPlaceholder$"
      }, toDisplayString(_ctx.placeholder), 513),
      _ctx.maxFontSize ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["full-width", { "width-finder": _ctx.maxWidth > 0 }])
      }, "Width", 2)) : createCommentVNode("", true),
      createElementVNode("span", {
        class: "width-finder width-value",
        ref: "widthValue$"
      }, toDisplayString(_ctx.formattedValue || ""), 513),
      withDirectives(createElementVNode("input", {
        type: "text",
        inputmode: "decimal",
        class: normalizeClass(["nq-input", { vanishing: _ctx.vanishing }]),
        ref: "input$",
        placeholder: _ctx.placeholder,
        style: normalizeStyle({ width: `${_ctx.width}px`, fontSize: `${_ctx.fontSize}rem` }),
        onFocus: _cache[0] || (_cache[0] = ($event) => _ctx.isFocussed = true),
        onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.isFocussed = false),
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.formattedValue = $event)
      }, null, 46, _hoisted_1$f), [
        [vModelText, _ctx.formattedValue]
      ])
    ], 544),
    _hoisted_2$9
  ], 2);
}
var AmountInput = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-9ca624f4"]]);
const FIAT_AMOUNT_NUMBER_REGEX = /(-)?\D*(\d+)(\.(\d+))?/;
const FIAT_AMOUNT_DECIMAL_SEPARATOR_REGEX = /(\d)\D(\d)/;
const FIAT_AMOUNT_CURRENCY_CODE_REGEX = /[A-Z]{3}\s?/i;
const FIAT_AMOUNT_SYMBOL_TRAILING_ALPHA_REGEX = /[A-Z.]$/i;
const _sfc_main$g = defineComponent({
  name: "FiatAmount",
  props: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    maxRelativeDeviation: {
      type: Number,
      default: 0.1
    },
    hideDecimals: {
      type: Boolean,
      default: false
    },
    locale: String
  },
  setup(props) {
    const _currencyString = computed(() => {
      const positioningLocale = _getPositioningLocale(props.currency);
      const currencyInfo = props.locale ? new CurrencyInfo(props.currency, props.locale) : new CurrencyInfo(props.currency);
      const formattingOptions = {
        style: "currency",
        currency: props.currency,
        currencyDisplay: "code",
        useGrouping: false,
        numberingSystem: "latn",
        minimumFractionDigits: props.hideDecimals ? 0 : currencyInfo.decimals,
        maximumFractionDigits: props.hideDecimals ? 0 : currencyInfo.decimals
      };
      let formatted;
      let integers;
      let relativeDeviation;
      do {
        formatted = props.amount.toLocaleString([
          props.locale || positioningLocale,
          positioningLocale,
          `${navigator.language.substring(0, 2)}-${positioningLocale}`,
          navigator.language,
          `en-${positioningLocale}`,
          "en"
        ], formattingOptions).replace(FIAT_AMOUNT_DECIMAL_SEPARATOR_REGEX, "$1.$2");
        const regexMatch = formatted.match(FIAT_AMOUNT_NUMBER_REGEX);
        const [, sign, , decimalsIncludingSeparator, decimals] = regexMatch;
        integers = regexMatch[2];
        const formattedNumber = `${sign || ""}${integers}${decimalsIncludingSeparator || ""}`;
        relativeDeviation = Math.abs((props.amount - Number.parseFloat(formattedNumber)) / props.amount);
        const nextDecimals = decimals ? decimals.length + 1 : 1;
        formattingOptions.minimumFractionDigits = nextDecimals;
        formattingOptions.maximumFractionDigits = nextDecimals;
      } while (relativeDeviation > props.maxRelativeDeviation && formattingOptions.minimumFractionDigits <= 20 && !props.hideDecimals);
      formatted = formatted.replace(FIAT_AMOUNT_CURRENCY_CODE_REGEX, (match, position) => {
        if (position !== 0 || !FIAT_AMOUNT_SYMBOL_TRAILING_ALPHA_REGEX.test(currencyInfo.symbol)) {
          return currencyInfo.symbol;
        }
        return `${currencyInfo.symbol}\xA0`;
      });
      if (integers.length <= 4)
        return formatted;
      return formatted.replace(integers, new FormattableNumber(integers).toString(true));
    });
    function _getPositioningLocale(currency) {
      currency = currency.toLowerCase();
      switch (currency) {
        case "eur":
        case "chf":
          return "de";
        case "gbp":
        case "usd":
          return "en";
        case "cny":
          return "zh";
        default:
          return currency.substr(0, 2);
      }
    }
    return { _currencyString };
  }
});
const _hoisted_1$e = { class: "fiat-amount" };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$e, toDisplayString(_ctx._currencyString), 1);
}
var FiatAmount = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f]]);
var AmountWithFee_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$f = defineComponent({
  name: "AmountWithFee",
  props: {
    modelValue: {
      type: Object,
      default: () => ({ amount: 0, fee: 0, isValid: false })
    },
    availableBalance: {
      type: Number,
      default: 0
    },
    fiatAmount: Number,
    fiatCurrency: String
  },
  methods: { $t: loadI18n("AmountWithFee") },
  setup(props, context) {
    const amountInput$ = ref(null);
    const liveAmount = ref(props.modelValue.amount);
    const isValid = computed(() => {
      return liveAmount.value > 0 && liveAmount.value + props.modelValue.fee <= props.availableBalance;
    });
    onMounted(watchAmountChange);
    watch(isValid, watchAvailableAmountChange, { immediate: true });
    function watchAvailableAmountChange() {
      context.emit("input", { amount: liveAmount.value, fee: props.modelValue.fee, isValid: isValid.value });
    }
    watch(liveAmount, watchAmountChange, { immediate: true });
    function watchAmountChange() {
      context.emit("input", { amount: liveAmount.value, fee: props.modelValue.fee, isValid: isValid.value });
    }
    function focus() {
      if (amountInput$.value)
        amountInput$.value.focus();
    }
    context.expose({ focus });
    return {
      amountInput$,
      liveAmount,
      isValid
    };
  },
  components: {
    Amount,
    AmountInput,
    FiatAmount
  }
});
const _hoisted_1$d = { class: "amount-with-fee" };
const _hoisted_2$8 = { class: "fee-section nq-text-s" };
const _hoisted_3$8 = {
  key: 0,
  class: "nq-red"
};
const _hoisted_4$5 = { key: 1 };
const _hoisted_5$3 = {
  key: 0,
  class: "fiat"
};
const _hoisted_6$3 = /* @__PURE__ */ createTextVNode(" ~");
const _hoisted_7$3 = {
  key: 1,
  class: "fee"
};
const _hoisted_8$3 = /* @__PURE__ */ createTextVNode(" + ");
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AmountInput = resolveComponent("AmountInput");
  const _component_FiatAmount = resolveComponent("FiatAmount");
  const _component_Amount = resolveComponent("Amount");
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    createVNode(_component_AmountInput, {
      class: normalizeClass(["value", { invalid: !_ctx.isValid && _ctx.liveAmount > 0 }]),
      modelValue: _ctx.liveAmount,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.liveAmount = $event),
      ref: "amountInput"
    }, null, 8, ["modelValue", "class"]),
    createElementVNode("div", _hoisted_2$8, [
      !_ctx.isValid && _ctx.liveAmount ? (openBlock(), createElementBlock("div", _hoisted_3$8, [
        renderSlot(_ctx.$slots, "insufficient-balance-error", {}, () => [
          createTextVNode(toDisplayString(_ctx.$t("Insufficient balance")), 1)
        ], true)
      ])) : (openBlock(), createElementBlock("div", _hoisted_4$5, [
        _ctx.fiatAmount && _ctx.fiatCurrency ? (openBlock(), createElementBlock("span", _hoisted_5$3, [
          _hoisted_6$3,
          createVNode(_component_FiatAmount, {
            amount: _ctx.fiatAmount,
            currency: _ctx.fiatCurrency
          }, null, 8, ["amount", "currency"])
        ])) : createCommentVNode("", true),
        _ctx.modelValue.fee ? (openBlock(), createElementBlock("span", _hoisted_7$3, [
          _hoisted_8$3,
          createVNode(_component_Amount, {
            amount: _ctx.modelValue.fee,
            minDecimals: 0,
            maxDecimals: 5
          }, null, 8, ["amount"]),
          createTextVNode(" " + toDisplayString(_ctx.$t("fee")), 1)
        ])) : createCommentVNode("", true)
      ]))
    ])
  ]);
}
var AmountWithFee = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-5cfbc912"]]);
var BottomOverlay_vue_vue_type_style_index_0_scoped_true_lang = "";
var BottomOverlayEvents = /* @__PURE__ */ ((BottomOverlayEvents2) => {
  BottomOverlayEvents2["CLOSE"] = "close";
  return BottomOverlayEvents2;
})(BottomOverlayEvents || {});
const _sfc_main$e = defineComponent({
  name: "BottomOverlay",
  props: {
    theme: {
      type: String,
      default: "dark",
      validator: (theme) => typeof theme === "string" && ["dark", "light", "green"].includes(theme)
    }
  },
  setup(props, context) {
    const hasCloseButton = ref(false);
    function onClose() {
      context.emit("close");
    }
    function _onListenerChange() {
      hasCloseButton.value = !!context.attrs.onClose;
    }
    watch(() => context.attrs.onClose, _onListenerChange, { immediate: true });
    return {
      BottomOverlayEvents,
      hasCloseButton,
      onClose
    };
  },
  components: {
    CloseButton
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CloseButton = resolveComponent("CloseButton");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["bottom-overlay", [_ctx.theme, { "has-close-button": _ctx.hasCloseButton }]])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    _ctx.hasCloseButton ? (openBlock(), createBlock(_component_CloseButton, {
      key: 0,
      class: normalizeClass(["close-button", { "inverse": ["dark", "green"].includes(_ctx.theme) }]),
      onClick: _ctx.onClose
    }, null, 8, ["class", "onClick"])) : createCommentVNode("", true)
  ], 2);
}
var BottomOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-76eac8fa"]]);
var Carousel_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$d = defineComponent({
  name: "Carousel",
  props: {
    entries: {
      type: Array,
      default: () => [],
      validator: (entries) => Array.isArray(entries) && entries.length > 0 && !entries.some((entry) => typeof entry !== "string")
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
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const root$ = ref(null);
    const refs$ = ref({});
    const effectiveSelected = ref("");
    const requestAnimationFrameId = ref(null);
    const radius = new Tweenable$2();
    const rotations = /* @__PURE__ */ new Map();
    const _hasDummyPosition = computed(() => {
      return props.entries.length <= 2;
    });
    const _totalPositionCount = computed(() => {
      return props.entries.length + (_hasDummyPosition.value ? 1 : 0);
    });
    onMounted(async () => {
      document.addEventListener("keydown", _onKeydown);
      await updateDimensions(false);
      _updateSelection(props.selected);
      _updateRotations(false);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", _onKeydown);
      if (requestAnimationFrameId.value === null)
        return;
      cancelAnimationFrame(requestAnimationFrameId.value);
    });
    watch(() => props.entryMargin, updateDimensions);
    async function updateDimensions(newWatcherValueOrTween = true) {
      const tween = typeof newWatcherValueOrTween === "boolean" ? newWatcherValueOrTween : true;
      await nextTick();
      let largestHeight = 0;
      let largestMinDistance = 0;
      for (let i = 0; i < props.entries.length; ++i) {
        const el1 = refs$.value[props.entries[i]];
        const el2 = refs$.value[props.entries[(i + 1) % props.entries.length]];
        largestHeight = Math.max(largestHeight, el1.offsetHeight);
        const minDistance = el1.offsetWidth / 2 + el2.offsetWidth / 2 + props.entryMargin;
        largestMinDistance = Math.max(largestMinDistance, minDistance);
      }
      const centerAngle = 2 * Math.PI / _totalPositionCount.value / 2;
      const newRadius = largestMinDistance / 2 / Math.sin(centerAngle);
      radius.tweenTo(newRadius, tween ? props.animationDuration : 0);
      if (root$.value)
        root$.value.style.minHeight = `${largestHeight}px`;
      _rerender();
    }
    watch(() => props.entries, _onEntriesChange);
    async function _onEntriesChange() {
      await updateDimensions();
      _updateSelection(effectiveSelected.value);
      _updateRotations();
    }
    watch(() => props.selected, _updateSelection);
    function _updateSelection(newSelection) {
      if (newSelection === void 0)
        return;
      const oldSelection = effectiveSelected.value;
      const isNewSelectionValid = props.entries.includes(newSelection);
      const isOldSelectionValid = props.entries.includes(oldSelection);
      if (isNewSelectionValid) {
        effectiveSelected.value = newSelection;
      } else if (!isOldSelectionValid) {
        effectiveSelected.value = props.entries[0];
      }
      if (effectiveSelected.value !== oldSelection) {
        context.emit("select", effectiveSelected.value);
      }
    }
    watch(effectiveSelected, _updateRotations);
    watch(() => props.disabled, _updateRotations);
    function _updateRotations(newWatcherValueOrTween = true, previousWatcherValue) {
      const tween = typeof newWatcherValueOrTween === "boolean" && typeof previousWatcherValue === "undefined" ? newWatcherValueOrTween : true;
      for (const entry of rotations.keys()) {
        if (props.entries.includes(entry))
          continue;
        rotations.delete(entry);
      }
      for (const entry of props.entries) {
        const rotation = rotations.get(entry) || new Tweenable$2();
        const tweenTime = tween ? props.animationDuration : 0;
        rotation.tweenTo(_calculateTargetRotation(entry, rotation.currentValue), tweenTime);
        rotations.set(entry, rotation);
      }
      _rerender();
    }
    function _calculateTargetRotation(entry, currentRotation) {
      if (props.disabled && entry !== effectiveSelected.value) {
        return currentRotation + _calculateRotationInClosestDirection(currentRotation, Math.PI);
      }
      const stepSize = 2 * Math.PI / _totalPositionCount.value;
      const entryIndex = props.entries.indexOf(entry);
      const selectedIndex = props.entries.indexOf(effectiveSelected.value);
      let offset = entryIndex - selectedIndex;
      if (_hasDummyPosition.value && offset > _totalPositionCount.value / 2) {
        offset += 1;
      }
      return currentRotation + _calculateRotationInClosestDirection(currentRotation, offset * stepSize);
    }
    watch(() => props.hideBackgroundEntries, _rerender);
    function _rerender() {
      if (requestAnimationFrameId.value !== null)
        return;
      requestAnimationFrameId.value = requestAnimationFrame(() => {
        const zCoordinatesForEntries = [];
        let finished = radius.finished;
        for (const [entry, rotation] of rotations) {
          const currentRotation = rotation.currentValue;
          const currentRadius = radius.currentValue;
          const x = Math.sin(currentRotation) * currentRadius;
          const z = Math.cos(currentRotation) * currentRadius - currentRadius;
          const el = refs$.value[entry];
          el.style.transform = `translate3d(calc(${x}px - 50%),-50%,${z}px)`;
          el.style.display = _shouldHide(entry) ? "none" : "";
          zCoordinatesForEntries.push([entry, z]);
          finished = finished && rotation.finished;
        }
        zCoordinatesForEntries.sort(([, z1], [, z2]) => z1 - z2);
        for (let i = 0; i < zCoordinatesForEntries.length; ++i) {
          const el = refs$.value[zCoordinatesForEntries[i][0]];
          el.style.zIndex = `${i}`;
        }
        requestAnimationFrameId.value = null;
        if (!finished)
          _rerender();
      });
    }
    function _calculateRotationInClosestDirection(fromAngle, toAngle) {
      const rotation = (toAngle - fromAngle) % (2 * Math.PI);
      const rotationOppositeDirection = rotation - Math.sign(rotation) * 2 * Math.PI;
      if (Math.abs(Math.abs(rotation) - Math.abs(rotationOppositeDirection)) < 1e-10) {
        return Math.min(rotation, rotationOppositeDirection);
      } else if (Math.abs(rotation) < Math.abs(rotationOppositeDirection)) {
        return rotation;
      } else {
        return rotationOppositeDirection;
      }
    }
    function _shouldHide(entry) {
      const rotation = rotations.get(entry);
      if (!rotation || !props.disabled && !props.hideBackgroundEntries)
        return false;
      const absoluteRotation = Math.abs(_calculateRotationInClosestDirection(0, rotation.currentValue));
      if (props.disabled) {
        return Math.abs(absoluteRotation - Math.PI) < 1e-10;
      } else if (props.hideBackgroundEntries) {
        const stepSize = 2 * Math.PI / _totalPositionCount.value;
        const threshold = Math.PI / 2 + stepSize / (_totalPositionCount.value - 1);
        return absoluteRotation > threshold;
      }
      return false;
    }
    function _onKeydown(event) {
      const target = event.target;
      if (props.disabled || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || rotations.values().next().value.progress < 0.5)
        return;
      const currentIndex = props.entries.indexOf(effectiveSelected.value);
      let newIndex;
      if (event.key === "ArrowLeft") {
        newIndex = (currentIndex - 1 + props.entries.length) % props.entries.length;
      } else if (event.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % props.entries.length;
      } else {
        return;
      }
      _updateSelection(props.entries[newIndex]);
    }
    return {
      root$,
      refs$,
      effectiveSelected,
      _updateSelection
    };
  }
});
const _hoisted_1$c = ["onClick", "onFocusin"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["carousel", { disabled: _ctx.disabled }]),
    ref: "root$"
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.entries, (entry, index) => {
      return openBlock(), createElementBlock("div", {
        ref_for: true,
        ref: (el) => {
          _ctx.refs$[entry] = el;
        },
        key: index,
        class: normalizeClass({ selected: _ctx.effectiveSelected === entry }),
        onClick: ($event) => !_ctx.disabled && _ctx._updateSelection(entry),
        onFocusin: ($event) => !_ctx.disabled && _ctx._updateSelection(entry)
      }, [
        renderSlot(_ctx.$slots, entry, {}, void 0, true)
      ], 42, _hoisted_1$c);
    }), 128))
  ], 2);
}
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-3aee44b6"]]);
var CircleSpinner_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$c = {};
const _withScopeId$4 = (n) => (pushScopeId("data-v-7da3c207"), n = n(), popScopeId(), n);
const _hoisted_1$b = {
  class: "circle-spinner",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 18 18",
  width: "18",
  height: "18",
  fill: "none",
  "stroke-width": "2",
  "stroke-linecap": "round"
};
const _hoisted_2$7 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", {
  stroke: "#0582CA",
  d: "M9,1c4.42,0,8,3.58,8,8"
}, null, -1));
const _hoisted_3$7 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("path", {
  stroke: "#1F2348",
  opacity: ".3",
  d: "M4.27,2.56C2.29,4.01,1,6.35,1,9c0,4.42,3.58,8,8,8c2.65,0,4.99-1.29,6.44-3.27"
}, null, -1));
const _hoisted_4$4 = [
  _hoisted_2$7,
  _hoisted_3$7
];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, _hoisted_4$4);
}
var CircleSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-7da3c207"]]);
var CopyableField_vue_vue_type_style_index_0_scoped_true_lang = "";
const COPYABLE_FIELD_DEFAULT_FONT_SIZE = 3;
const COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL = 2.5;
const _sfc_main$b = defineComponent({
  name: "CopyableField",
  props: {
    modelValue: {
      type: Object,
      required: true,
      validator: (value) => typeof value === "string" || typeof value === "number" || typeof value === "object" && Object.keys(value).length > 0
    },
    label: String,
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: { $t: loadI18n("CopyableField") },
  setup(props) {
    const value$ = ref(null);
    const valueContainer$ = ref(null);
    const currentKey = ref("");
    const fontSize = ref(props.small ? COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL : COPYABLE_FIELD_DEFAULT_FONT_SIZE);
    const copied = ref(false);
    const _copiedResetTimeout = ref(null);
    onMounted(() => {
      window.addEventListener("resize", _updateFontSize);
      _updateFontSize();
    });
    onUnmounted(() => window.removeEventListener("resize", _updateFontSize));
    const isKeyedValue = computed(() => {
      return typeof props.modelValue !== "string" && typeof props.modelValue !== "number";
    });
    const hasSingleKey = computed(() => {
      return isKeyedValue.value && Object.keys(props.modelValue).length === 1;
    });
    watch(() => props.modelValue, _onValueChange, { immediate: true });
    function _onValueChange() {
      const keys = isKeyedValue.value ? Object.keys(props.modelValue) : [];
      if (keys.length > 0 && (!currentKey.value || !keys.includes(currentKey.value))) {
        currentKey.value = keys[0];
      } else {
        _updateFontSize();
      }
    }
    watch(currentKey, _updateFontSize);
    watch(() => props.small, _updateFontSize);
    async function _updateFontSize() {
      await nextTick();
      if (!valueContainer$.value || !value$.value)
        return;
      const defaultFontSize = props.small ? COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL : COPYABLE_FIELD_DEFAULT_FONT_SIZE;
      value$.value.style.fontSize = `${defaultFontSize}rem`;
      const availableWidth = valueContainer$.value.offsetWidth;
      const referenceWidth = value$.value.offsetWidth;
      const scaleFactor = availableWidth / referenceWidth;
      value$.value.style.fontSize = "";
      fontSize.value = Math.min(defaultFontSize, defaultFontSize * scaleFactor);
    }
    function copy() {
      Clipboard.copy(isKeyedValue.value ? props.modelValue[currentKey.value].toString() : props.modelValue.toString());
      copied.value = true;
      if (_copiedResetTimeout.value)
        window.clearTimeout(_copiedResetTimeout.value);
      _copiedResetTimeout.value = window.setTimeout(() => {
        copied.value = false;
      }, 500);
    }
    return {
      value$,
      valueContainer$,
      currentKey,
      fontSize,
      copied,
      isKeyedValue,
      hasSingleKey,
      copy
    };
  }
});
const _hoisted_1$a = {
  key: 0,
  class: "nq-label"
};
const _hoisted_2$6 = ["onClick", "tabindex"];
const _hoisted_3$6 = { class: "copy-notice" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["copyable-field", { small: _ctx.small }])
  }, [
    _ctx.label ? (openBlock(), createElementBlock("span", _hoisted_1$a, toDisplayString(_ctx.label), 1)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass(["copyable-field-content", { "simple-value": !_ctx.isKeyedValue, copied: _ctx.copied }]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.copy && _ctx.copy(...args))
    }, [
      createElementVNode("div", {
        ref: "valueContainer$",
        class: "value-container",
        style: normalizeStyle({ fontSize: _ctx.fontSize + "rem" })
      }, [
        createElementVNode("span", {
          ref: "value$",
          class: "value"
        }, toDisplayString(typeof _ctx.modelValue === "object" ? _ctx.modelValue[_ctx.currentKey] : _ctx.modelValue), 513)
      ], 4),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.isKeyedValue ? Object.keys(_ctx.modelValue) : [], (key) => {
        return openBlock(), createElementBlock("button", {
          class: normalizeClass(["nq-button-s", {
            inverse: _ctx.currentKey === key,
            "single-key": _ctx.hasSingleKey
          }]),
          key,
          onClick: withModifiers(($event) => _ctx.currentKey = key, ["stop"]),
          tabindex: _ctx.hasSingleKey ? -1 : 0
        }, toDisplayString(key), 11, _hoisted_2$6);
      }), 128)),
      createElementVNode("div", _hoisted_3$6, toDisplayString(_ctx.$t("Copied")), 1)
    ], 2)
  ], 2);
}
var CopyableField = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-9c987ee2"]]);
var LoadingSpinner_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$a = {};
const _withScopeId$3 = (n) => (pushScopeId("data-v-5e542d5c"), n = n(), popScopeId(), n);
const _hoisted_1$9 = {
  height: "48",
  width: "54",
  viewBox: "0 0 54 48",
  color: "inherit",
  class: "loading-spinner"
};
const _hoisted_2$5 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", {
  id: "big-hex",
  d: "M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z",
  stroke: "currentColor",
  "stroke-width": "3",
  fill: "none",
  "stroke-linecap": "round",
  opacity: "0.4",
  "stroke-dasharray": "92.5 60"
}, null, -1));
const _hoisted_3$5 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("path", {
  id: "small-hex",
  d: "M51.9,21.9L41.3,3.6c-0.8-1.3-2.2-2.1-3.7-2.1H16.4c-1.5,0-2.9,0.8-3.7,2.1L2.1,21.9c-0.8,1.3-0.8,2.9,0,4.2 l10.6,18.3c0.8,1.3,2.2,2.1,3.7,2.1h21.3c1.5,0,2.9-0.8,3.7-2.1l10.6-18.3C52.7,24.8,52.7,23.2,51.9,21.9z",
  stroke: "currentColor",
  "stroke-width": "3",
  fill: "none",
  "stroke-linecap": "round",
  "stroke-dasharray": "47.5 105"
}, null, -1));
const _hoisted_4$3 = [
  _hoisted_2$5,
  _hoisted_3$5
];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_4$3);
}
var LoadingSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-5e542d5c"]]);
var PageBody_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$9 = {};
const _hoisted_1$8 = { class: "page-body nq-card-body" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var PageBody = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-158672f4"]]);
var PageFooter_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$8 = {};
const _hoisted_1$7 = { class: "page-footer nq-card-footer" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var PageFooter = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-7e998b5b"]]);
var PageHeader_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$7 = defineComponent({
  name: "PageHeader",
  props: {
    backArrow: {
      type: Boolean,
      default: false
    },
    progressIndicator: {
      type: Boolean,
      default: false
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
  methods: { $t: loadI18n("PageHeader") },
  setup(props) {
    const progressSteps = computed(() => {
      const list = [];
      for (let i = 1; i <= props.numberSteps; i++)
        list.push(i);
      return list;
    });
    return { progressSteps };
  },
  components: { ArrowLeftIcon }
});
const _hoisted_1$6 = {
  key: 0,
  class: "progress-indicator"
};
const _hoisted_2$4 = ["title"];
const _hoisted_3$4 = { class: "nq-h1" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ArrowLeftIcon = resolveComponent("ArrowLeftIcon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["page-header nq-card-header", _ctx.progressIndicator ? "has-progress-indicator" : ""])
  }, [
    _ctx.progressIndicator ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.progressSteps, (thisStep) => {
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["indicator", thisStep <= _ctx.step ? "active" : ""]),
          key: thisStep
        }, null, 2);
      }), 128))
    ])) : createCommentVNode("", true),
    _ctx.backArrow ? (openBlock(), createElementBlock("a", {
      key: 1,
      href: "#",
      class: "page-header-back-button",
      onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("back"), ["prevent"])),
      title: _ctx.$t("Go back")
    }, [
      createVNode(_component_ArrowLeftIcon)
    ], 8, _hoisted_2$4)) : createCommentVNode("", true),
    createElementVNode("h1", _hoisted_3$4, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]),
    renderSlot(_ctx.$slots, "more", {}, void 0, true)
  ], 2);
}
var PageHeader = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-9121b88a"]]);
const _sfc_main$6 = defineComponent({
  name: "I18n",
  props: {
    path: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  methods: {
    $t(key, variablesOrLang, variables) {
      return loadI18n(this.tag)(key, variablesOrLang, variables);
    }
  },
  render() {
    if (!Object.keys(this.$slots).length) {
      throw new Error("I18n: the component must contain at least 1 template slot, otherwise simply use the $t function.");
    }
    const message = this.$t(this.$options.name, this.path.replace(/\\n/g, "\n"));
    const children = message.split(/({\w+})/g).map((part) => {
      const variableNameMatch = part.match(/^{(\w+)}$/);
      if (!variableNameMatch)
        return part;
      return this.$slots[variableNameMatch[1]] || part;
    });
    return h(this.$props.tag, h(children));
  }
});
var Timer_vue_vue_type_style_index_0_scoped_true_lang = "";
const TIME_STEPS = [
  { unit: "minute", factor: 60 },
  { unit: "hour", factor: 60 },
  { unit: "day", factor: 24 }
];
function _toSimplifiedTime(millis, includeUnit = true, maxUnit) {
  let resultTime = millis / 1e3;
  let resultUnit = "second";
  for (const { unit, factor } of TIME_STEPS) {
    if (resultTime / factor < 1 || resultUnit === maxUnit)
      break;
    resultTime /= factor;
    resultUnit = unit;
  }
  resultTime = Math.floor(resultTime);
  if (!includeUnit) {
    return resultTime;
  } else {
    const $t2 = loadI18n("Timer");
    const i18nTime = {
      get second() {
        return $t2("second");
      },
      get seconds() {
        return $t2("seconds");
      },
      get minute() {
        return $t2("minute");
      },
      get minutes() {
        return $t2("minutes");
      },
      get hour() {
        return $t2("hour");
      },
      get hours() {
        return $t2("hours");
      },
      get day() {
        return $t2("day");
      },
      get days() {
        return $t2("days");
      }
    };
    resultUnit = i18nTime[`${resultUnit}${resultTime !== 1 ? "s" : ""}`];
    return `${resultTime} ${resultUnit}`;
  }
}
const TIMER_REM_FACTOR = 8;
const TIMER_BASE_SIZE = 3.25 * TIMER_REM_FACTOR;
const TIMER_BASE_RADIUS = TIMER_REM_FACTOR;
const TIMER_RADIUS_GROWTH_FACTOR = 1.5;
var TimerThemes = /* @__PURE__ */ ((TimerThemes2) => {
  TimerThemes2["NORMAL"] = "normal";
  TimerThemes2["INVERSE"] = "inverse";
  TimerThemes2["WHITE"] = "white";
  return TimerThemes2;
})(TimerThemes || {});
const _sfc_main$5 = defineComponent({
  name: "Timer",
  props: {
    startTime: Number,
    endTime: Number,
    alwaysShowTime: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: "normal",
      validator: (value) => Object.values(TimerThemes).includes(value)
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    tooltipProps: Object,
    maxUnit: {
      type: String,
      required: false,
      validator: (value) => [void 0, "second", "minute", "hour", "day"].includes(value)
    }
  },
  setup(props, context) {
    const root$ = ref(null);
    const timeOffset = ref(0);
    const sampledTime = ref(0);
    const detailsShown = ref(false);
    const radius = new Tweenable$2(detailsShown.value || props.alwaysShowTime ? TIMER_BASE_RADIUS * TIMER_RADIUS_GROWTH_FACTOR : TIMER_BASE_RADIUS);
    const fullCircleLength = ref(2 * Math.PI * radius.currentValue);
    const timeoutId = ref(null);
    const updateTimeoutId = ref(null);
    const requestAnimationFrameId = ref(null);
    const size = ref(TIMER_BASE_SIZE);
    function synchronize(referenceTime) {
      timeOffset.value = referenceTime - Date.now();
    }
    context.expose({ synchronize });
    onMounted(() => {
      requestAnimationFrame(() => size.value = root$.value.offsetWidth);
      window.addEventListener("resize", _onResize);
    });
    onUnmounted(() => {
      if (timeoutId.value)
        clearTimeout(timeoutId.value);
      if (updateTimeoutId.value)
        clearTimeout(updateTimeoutId.value);
      if (requestAnimationFrameId.value)
        cancelAnimationFrame(requestAnimationFrameId.value);
      window.removeEventListener("resize", _onResize);
    });
    const _totalTime = computed(() => {
      if (props.startTime === void 0 || props.endTime === void 0) {
        return 0;
      } else {
        return Math.max(0, props.endTime - props.startTime);
      }
    });
    const _timeLeft = computed(() => {
      if (props.startTime === void 0 || props.endTime === void 0) {
        return 0;
      } else {
        return Math.max(0, Math.min(_totalTime.value, props.endTime - sampledTime.value));
      }
    });
    const _progress = computed(() => {
      if (props.startTime === void 0 || props.endTime === void 0 || _totalTime.value === 0) {
        return 0;
      } else {
        return 1 - _timeLeft.value / _totalTime.value;
      }
    });
    const _timeCircleInfo = computed(() => {
      const maxLength = fullCircleLength.value - 2.5 * props.strokeWidth;
      const length = Math.min(maxLength, (1 - _progress.value) * fullCircleLength.value);
      const lengthWithLineCaps = length + props.strokeWidth;
      const gap = fullCircleLength.value - length;
      const offset = fullCircleLength.value / 4 - gap;
      return { length, lengthWithLineCaps, gap, offset, strokeWidth: props.strokeWidth };
    });
    const _fillerCircleInfo = computed(() => {
      const availableSpace = fullCircleLength.value - _timeCircleInfo.value.lengthWithLineCaps - 2 * props.strokeWidth;
      const lengthWithLineCaps = Math.max(0, availableSpace);
      const strokeWidth = Math.min(props.strokeWidth, lengthWithLineCaps);
      const length = Math.max(0, lengthWithLineCaps - strokeWidth);
      const gap = fullCircleLength.value - length;
      const offset = fullCircleLength.value / 4 - props.strokeWidth / 2 - props.strokeWidth - strokeWidth / 2;
      return { length, lengthWithLineCaps, gap, offset, strokeWidth };
    });
    function _calculateUpdateInterval() {
      const scaleFactor = size.value / TIMER_BASE_SIZE;
      const circleLengthPixels = fullCircleLength.value * scaleFactor;
      const steps = circleLengthPixels * 3;
      const minInterval = 1e3 / 60;
      const timeLeft = _timeLeft.value;
      const totalTime = _totalTime.value;
      const updatesPerTimeStep = 2;
      let timeStep = 1e3;
      let maxInterval = timeStep / updatesPerTimeStep;
      for (const { factor } of TIME_STEPS) {
        const nextTimeStep = timeStep * factor;
        const nextMaxInterval = nextTimeStep / updatesPerTimeStep;
        const nextInterval = Math.min(nextMaxInterval, Math.max(minInterval, totalTime / steps));
        if ((timeLeft - nextInterval) / nextTimeStep < 1) {
          if (timeLeft / nextTimeStep > 1) {
            maxInterval = timeLeft - nextTimeStep;
          }
          break;
        }
        timeStep = nextTimeStep;
        maxInterval = nextMaxInterval;
      }
      return Math.min(maxInterval, Math.max(minInterval, _totalTime.value / steps));
    }
    watch(detailsShown, _setRadius, { immediate: true });
    watch(() => props.alwaysShowTime, _setRadius);
    function _setRadius() {
      radius.tweenTo(detailsShown.value || props.alwaysShowTime ? TIMER_RADIUS_GROWTH_FACTOR * TIMER_BASE_RADIUS : TIMER_BASE_RADIUS, 300);
      _rerender();
    }
    watch(() => props.startTime, _setTimer, { immediate: true });
    watch(() => props.endTime, _setTimer);
    watch(timeOffset, _setTimer);
    function _setTimer() {
      sampledTime.value = Date.now() + timeOffset.value;
      if (timeoutId.value)
        clearTimeout(timeoutId.value);
      if (props.startTime && props.endTime) {
        timeoutId.value = window.setTimeout(() => context.emit("end", props.endTime), props.endTime - sampledTime.value);
        _rerender();
      }
    }
    function _rerender() {
      sampledTime.value = Date.now() + timeOffset.value;
      fullCircleLength.value = 2 * Math.PI * radius.currentValue;
      if (_timeLeft.value === 0 && radius.finished)
        return;
      if (updateTimeoutId.value)
        clearTimeout(updateTimeoutId.value);
      if (requestAnimationFrameId.value)
        cancelAnimationFrame(requestAnimationFrameId.value);
      if (!radius.finished) {
        requestAnimationFrameId.value = requestAnimationFrame(() => _rerender());
      } else {
        updateTimeoutId.value = window.setTimeout(() => _rerender(), _calculateUpdateInterval());
      }
    }
    function _onResize() {
      if (root$.value)
        size.value = root$.value.offsetWidth;
    }
    return {
      _toSimplifiedTime,
      TooltipThemes,
      TimerThemes,
      root$,
      detailsShown,
      radius,
      _timeLeft,
      _progress,
      _timeCircleInfo,
      _fillerCircleInfo
    };
  },
  components: { Tooltip, I18n: _sfc_main$6 }
});
const _withScopeId$2 = (n) => (pushScopeId("data-v-c908e45a"), n = n(), popScopeId(), n);
const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 26 26"
};
const _hoisted_2$3 = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"];
const _hoisted_3$3 = ["r", "stroke-dasharray", "stroke-dashoffset", "stroke-width"];
const _hoisted_4$2 = {
  key: 0,
  class: "info-exclamation-icon"
};
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("rect", {
  x: "12",
  y: "9",
  width: "2",
  height: "2",
  rx: "1"
}, null, -1));
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("rect", {
  x: "12",
  y: "12.5",
  width: "2",
  height: "4.5",
  rx: "1"
}, null, -1));
const _hoisted_7$2 = [
  _hoisted_5$2,
  _hoisted_6$2
];
const _hoisted_8$2 = {
  key: 1,
  class: "countdown",
  x: "50%",
  y: "50%"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_I18n = resolveComponent("I18n");
  const _component_Tooltip = resolveComponent("Tooltip");
  return openBlock(), createBlock(_component_Tooltip, mergeProps({
    class: "timer",
    ref: "root$"
  }, __spreadProps(__spreadValues({
    preferredPosition: "bottom right",
    theme: _ctx.theme === _ctx.TimerThemes.INVERSE || _ctx.theme === _ctx.TimerThemes.WHITE ? _ctx.TooltipThemes.INVERSE : _ctx.TooltipThemes.NORMAL
  }, _ctx.tooltipProps), {
    styles: __spreadValues({
      width: "18.25rem",
      pointerEvents: "none"
    }, _ctx.tooltipProps ? _ctx.tooltipProps.styles : void 0)
  }), {
    onShow: _cache[0] || (_cache[0] = ($event) => _ctx.detailsShown = true),
    onHide: _cache[1] || (_cache[1] = ($event) => _ctx.detailsShown = false),
    class: {
      "time-shown": _ctx.detailsShown || _ctx.alwaysShowTime,
      "little-time-left": _ctx._progress >= 0.75,
      "inverse-theme": _ctx.theme === _ctx.TimerThemes.INVERSE,
      "white-theme": _ctx.theme === _ctx.TimerThemes.WHITE
    }
  }), {
    trigger: withCtx(() => [
      (openBlock(), createElementBlock("svg", _hoisted_1$5, [
        createElementVNode("circle", {
          ref: "time-circle",
          class: "time-circle",
          cx: "50%",
          cy: "50%",
          r: _ctx.radius.currentValue,
          "stroke-dasharray": `${_ctx._timeCircleInfo.length} ${_ctx._timeCircleInfo.gap}`,
          "stroke-dashoffset": _ctx._timeCircleInfo.offset,
          "stroke-width": _ctx._timeCircleInfo.strokeWidth
        }, null, 8, _hoisted_2$3),
        createElementVNode("circle", {
          class: "filler-circle",
          cx: "50%",
          cy: "50%",
          r: _ctx.radius.currentValue,
          "stroke-dasharray": `${_ctx._fillerCircleInfo.length} ${_ctx._fillerCircleInfo.gap}`,
          "stroke-dashoffset": _ctx._fillerCircleInfo.offset,
          "stroke-width": _ctx._fillerCircleInfo.strokeWidth
        }, null, 8, _hoisted_3$3),
        createVNode(Transition, { name: "transition-fade" }, {
          default: withCtx(() => [
            !_ctx.detailsShown && !_ctx.alwaysShowTime ? (openBlock(), createElementBlock("g", _hoisted_4$2, _hoisted_7$2)) : (openBlock(), createElementBlock("text", _hoisted_8$2, toDisplayString(_ctx._toSimplifiedTime(_ctx._timeLeft, false, _ctx.maxUnit)), 1))
          ]),
          _: 1
        })
      ]))
    ]),
    default: withCtx(() => [
      createVNode(_component_I18n, { path: "This offer expires in\xA0{timer}." }, {
        timer: withCtx(() => [
          createTextVNode(toDisplayString(_ctx._toSimplifiedTime(_ctx._timeLeft, true, _ctx.maxUnit)), 1)
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16, ["class"]);
}
var Timer = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-c908e45a"]]);
var PaymentInfoLine_vue_vue_type_style_index_0_scoped_true_lang = "";
function cryptoAmountInfoValidator(value) {
  return "amount" in value && "currency" in value && "decimals" in value && amountValidator(value.amount) && typeof value.currency === "string" && typeof value.decimals === "number" && Number.isInteger(value.decimals);
}
function fiatAmountInfoValidator(value) {
  return "amount" in value && "currency" in value && typeof value.amount === "number" && typeof value.currency === "string";
}
const PAYMENT_INFO_LINE_REFERENCE_RATE_UPDATE_INTERVAL = 6e4;
const PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD = 0.1;
var PaymentInfoLineThemes = /* @__PURE__ */ ((PaymentInfoLineThemes2) => {
  PaymentInfoLineThemes2["NORMAL"] = "normal";
  PaymentInfoLineThemes2["INVERSE"] = "inverse";
  return PaymentInfoLineThemes2;
})(PaymentInfoLineThemes || {});
const _sfc_main$4 = defineComponent({
  name: "PaymentInfoLine",
  props: {
    cryptoAmount: {
      type: Object,
      required: true,
      validator: cryptoAmountInfoValidator
    },
    fiatAmount: {
      type: Object,
      validator: fiatAmountInfoValidator
    },
    vendorMarkup: {
      type: Number,
      validator: (value) => value > -1
    },
    networkFee: {
      type: Number,
      validator: amountValidator
    },
    origin: {
      type: String,
      required: true
    },
    address: String,
    shopLogoUrl: String,
    startTime: Number,
    endTime: Number,
    theme: {
      type: String,
      validator: (value) => Object.values(PaymentInfoLineThemes).includes(value),
      default: "normal"
    },
    tooltipContainer: HTMLElement
  },
  methods: { $t: loadI18n("PaymentInfoLine") },
  setup(props, context) {
    const timer$ = ref(null);
    const priceTooltip$ = ref(null);
    const referenceRate = ref(null);
    const referenceRateUpdateTimeout = ref(-1);
    const lastTooltipToggle = ref(-1);
    onMounted(() => updateReferenceRate());
    onUnmounted(() => window.clearTimeout(referenceRateUpdateTimeout.value));
    async function setTime(time) {
      await nextTick();
      if (!timer$.value)
        return;
      timer$.value.synchronize(time);
    }
    context.expose({ setTime });
    const originDomain = computed(() => {
      return props.origin.split("://")[1];
    });
    const effectiveRate = computed(() => {
      if (!props.fiatAmount)
        return null;
      return props.fiatAmount.amount / (Number(props.cryptoAmount.amount) / 10 ** props.cryptoAmount.decimals);
    });
    const formattedVendorMarkup = computed(() => {
      if (typeof props.vendorMarkup !== "number")
        return null;
      return `${props.vendorMarkup >= 0 ? "+" : ""}${Math.ceil(props.vendorMarkup * 100 * 100 - 1e-10) / 100}%`;
    });
    const isFormattedNetworkFeeZero = computed(() => {
      if (props.networkFee === null || props.networkFee === void 0)
        return true;
      const networkFeeBaseCurrency = Number(props.networkFee) / 10 ** props.cryptoAmount.decimals;
      const maxDecimals = Math.min(6, props.cryptoAmount.decimals);
      const roundingFactor = 10 ** maxDecimals;
      return Math.round(networkFeeBaseCurrency * roundingFactor) / roundingFactor === 0;
    });
    const rateDeviation = computed(() => {
      if (effectiveRate.value === null || referenceRate.value === null)
        return null;
      const flippedEffectiveRate = 1 / effectiveRate.value;
      const flippedReferenceRate = 1 / referenceRate.value;
      return (flippedEffectiveRate - flippedReferenceRate) / flippedReferenceRate;
    });
    const isBadRate = computed(() => {
      if (rateDeviation.value === null)
        return false;
      return rateDeviation.value >= PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD || props.vendorMarkup && props.vendorMarkup < 0 && rateDeviation.value >= props.vendorMarkup + PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD;
    });
    const formattedRateDeviation = computed(() => {
      if (rateDeviation.value === null)
        return null;
      return `${Math.round(Math.abs(rateDeviation.value) * 100 * 10) / 10}%`;
    });
    function rateInfo() {
      const $t2 = loadI18n("PaymentInfoLine");
      if (rateDeviation.value === null || formattedRateDeviation.value === null || Math.abs(rateDeviation.value) < PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD && !isBadRate.value) {
        return null;
      }
      if (rateDeviation.value < 0 && isBadRate.value) {
        return $t2("Your actual discount is approx. {formattedRateDeviation} compared to the current market rate (coingecko.com).", { formattedRateDeviation: formattedRateDeviation.value });
      }
      if (rateDeviation.value > 0) {
        return $t2("You are paying approx. {formattedRateDeviation} more than at the current market rate (coingecko.com).", { formattedRateDeviation: formattedRateDeviation.value });
      } else {
        return $t2("You are paying approx. {formattedRateDeviation} less than at the current market rate (coingecko.com).", { formattedRateDeviation: formattedRateDeviation.value });
      }
    }
    watch(() => props.cryptoAmount.currency, updateReferenceRate);
    watch(() => props.fiatAmount && props.fiatAmount.currency, updateReferenceRate);
    async function updateReferenceRate() {
      window.clearTimeout(referenceRateUpdateTimeout.value);
      const cryptoCurrency = props.cryptoAmount.currency.toLowerCase();
      const fiatCurrency = props.fiatAmount ? props.fiatAmount.currency.toLowerCase() : null;
      if (!props.fiatAmount || !fiatCurrency || !Object.values(FiatApiSupportedFiatCurrency).includes(fiatCurrency) || !Object.values(FiatApiSupportedCryptoCurrency).includes(cryptoCurrency)) {
        referenceRate.value = null;
        return;
      } else {
        const { [cryptoCurrency]: { [fiatCurrency]: newReferenceRate } } = await getExchangeRates([cryptoCurrency], [fiatCurrency]);
        referenceRate.value = newReferenceRate || null;
      }
      referenceRateUpdateTimeout.value = window.setTimeout(() => updateReferenceRate(), PAYMENT_INFO_LINE_REFERENCE_RATE_UPDATE_INTERVAL);
    }
    function onPriceTooltipToggle(isShow) {
      lastTooltipToggle.value = Date.now();
      if (!isShow)
        return;
      updateReferenceRate();
    }
    return {
      PaymentInfoLineThemes,
      TooltipThemes,
      timer$,
      priceTooltip$,
      lastTooltipToggle,
      originDomain,
      effectiveRate,
      formattedVendorMarkup,
      isFormattedNetworkFeeZero,
      isBadRate,
      rateInfo,
      onPriceTooltipToggle
    };
  },
  components: {
    Account,
    Timer,
    Amount,
    FiatAmount,
    Tooltip,
    AlertTriangleIcon,
    ArrowRightSmallIcon,
    I18n: _sfc_main$6
  }
});
const _withScopeId$1 = (n) => (pushScopeId("data-v-3ff5be4d"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "price-breakdown" };
const _hoisted_2$2 = { key: 0 };
const _hoisted_3$2 = { key: 1 };
const _hoisted_4$1 = { class: "free-service-info info" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("hr", null, null, -1));
const _hoisted_6$1 = { class: "total" };
const _hoisted_7$1 = {
  key: 1,
  class: "network-fee-info info"
};
const _hoisted_8$1 = /* @__PURE__ */ createTextVNode(" + ");
const _hoisted_9$1 = { slot: "amount" };
const _hoisted_10$1 = { class: "arrow-runway" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Amount = resolveComponent("Amount");
  const _component_AlertTriangleIcon = resolveComponent("AlertTriangleIcon");
  const _component_FiatAmount = resolveComponent("FiatAmount");
  const _component_I18n = resolveComponent("I18n");
  const _component_Tooltip = resolveComponent("Tooltip");
  const _component_ArrowRightSmallIcon = resolveComponent("ArrowRightSmallIcon");
  const _component_Account = resolveComponent("Account");
  const _component_Timer = resolveComponent("Timer");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["info-line", { "inverse-theme": _ctx.theme === _ctx.PaymentInfoLineThemes.INVERSE }])
  }, [
    createElementVNode("div", {
      class: "amounts",
      onMouseenter: _cache[3] || (_cache[3] = ($event) => _ctx.priceTooltip$ && _ctx.priceTooltip$.show()),
      onMouseleave: _cache[4] || (_cache[4] = ($event) => _ctx.priceTooltip$ && _ctx.priceTooltip$.hide()),
      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.priceTooltip$ && Date.now() - _ctx.lastTooltipToggle > 200 && _ctx.priceTooltip$.toggle())
    }, [
      createVNode(_component_Amount, {
        currency: _ctx.cryptoAmount.currency,
        amount: _ctx.cryptoAmount.amount,
        currencyDecimals: _ctx.cryptoAmount.decimals,
        minDecimals: 0,
        maxDecimals: Math.min(4, _ctx.cryptoAmount.decimals)
      }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"]),
      _ctx.fiatAmount ? (openBlock(), createBlock(_component_Tooltip, {
        key: 0,
        ref: "priceTooltip$",
        container: _ctx.tooltipContainer,
        preferredPosition: "bottom left",
        margin: { left: 8 },
        styles: {
          minWidth: "37rem",
          padding: "2rem",
          lineHeight: "1.3"
        },
        theme: _ctx.theme === _ctx.PaymentInfoLineThemes.INVERSE ? _ctx.TooltipThemes.INVERSE : _ctx.TooltipThemes.NORMAL,
        onShow: _cache[0] || (_cache[0] = ($event) => _ctx.onPriceTooltipToggle(true)),
        onHide: _cache[1] || (_cache[1] = ($event) => _ctx.onPriceTooltipToggle(false)),
        onClick: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["stop"])),
        class: "price-tooltip"
      }, {
        trigger: withCtx(() => [
          _ctx.isBadRate ? (openBlock(), createBlock(_component_AlertTriangleIcon, { key: 0 })) : createCommentVNode("", true),
          createVNode(_component_FiatAmount, {
            currency: _ctx.fiatAmount.currency,
            amount: _ctx.fiatAmount.amount
          }, null, 8, ["currency", "amount"])
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$4, [
            createElementVNode("label", null, toDisplayString(_ctx.$t("Order amount")), 1),
            createVNode(_component_FiatAmount, {
              currency: _ctx.fiatAmount.currency,
              amount: _ctx.fiatAmount.amount
            }, null, 8, ["currency", "amount"]),
            _ctx.vendorMarkup || _ctx.vendorMarkup === 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              _ctx.vendorMarkup >= 0 ? (openBlock(), createElementBlock("label", _hoisted_2$2, toDisplayString(_ctx.$t("Vendor crypto markup")), 1)) : (openBlock(), createElementBlock("label", _hoisted_3$2, toDisplayString(_ctx.$t("Vendor crypto discount")), 1)),
              createElementVNode("div", null, toDisplayString(_ctx.formattedVendorMarkup), 1)
            ], 64)) : createCommentVNode("", true),
            createElementVNode("label", {
              class: normalizeClass({ "nq-orange": _ctx.isBadRate })
            }, toDisplayString(_ctx.$t("Effective rate")), 3),
            _ctx.effectiveRate ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass({ "nq-orange": _ctx.isBadRate })
            }, [
              createVNode(_component_FiatAmount, {
                currency: _ctx.fiatAmount.currency,
                amount: _ctx.effectiveRate,
                maxRelativeDeviation: 1e-4
              }, null, 8, ["currency", "amount"]),
              createTextVNode(" / " + toDisplayString(_ctx.cryptoAmount.currency.toUpperCase()), 1)
            ], 2)) : createCommentVNode("", true)
          ]),
          _ctx.rateInfo() ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([{ "nq-orange": _ctx.isBadRate }, "rate-info info"])
          }, toDisplayString(_ctx.rateInfo()), 3)) : createCommentVNode("", true),
          createElementVNode("div", _hoisted_4$1, toDisplayString(_ctx.$t("Nimiq provides this service free of charge.")), 1),
          _hoisted_5$1,
          createElementVNode("div", _hoisted_6$1, [
            createElementVNode("label", null, toDisplayString(_ctx.$t("Total")), 1),
            createVNode(_component_Amount, {
              currency: _ctx.cryptoAmount.currency,
              amount: _ctx.cryptoAmount.amount,
              currencyDecimals: _ctx.cryptoAmount.decimals,
              minDecimals: 0,
              maxDecimals: Math.min(8, _ctx.cryptoAmount.decimals),
              showApprox: ""
            }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])
          ]),
          _ctx.networkFee === void 0 || _ctx.networkFee === null || Number(_ctx.networkFee) !== 0 ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            _hoisted_8$1,
            !_ctx.isFormattedNetworkFeeZero ? (openBlock(), createBlock(_component_I18n, {
              key: 0,
              path: "{amount} suggested network fee"
            }, {
              default: withCtx(() => [
                createElementVNode("template", _hoisted_9$1, [
                  _ctx.networkFee ? (openBlock(), createBlock(_component_Amount, {
                    key: 0,
                    currency: _ctx.cryptoAmount.currency,
                    amount: _ctx.networkFee,
                    currencyDecimals: _ctx.cryptoAmount.decimals,
                    minDecimals: 0,
                    maxDecimals: Math.min(6, _ctx.cryptoAmount.decimals)
                  }, null, 8, ["currency", "amount", "currencyDecimals", "maxDecimals"])) : createCommentVNode("", true)
                ])
              ]),
              _: 1
            })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(_ctx.$t("network fee")), 1)
            ], 64))
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["container", "styles", "theme"])) : createCommentVNode("", true)
    ], 32),
    createElementVNode("div", _hoisted_10$1, [
      createVNode(_component_ArrowRightSmallIcon)
    ]),
    createVNode(_component_Account, {
      address: _ctx.address,
      image: _ctx.shopLogoUrl,
      label: _ctx.originDomain
    }, null, 8, ["address", "image", "label"]),
    _ctx.startTime && _ctx.endTime ? (openBlock(), createBlock(_component_Timer, {
      key: 0,
      ref: "timer$",
      startTime: _ctx.startTime,
      endTime: _ctx.endTime,
      theme: _ctx.theme,
      tooltipProps: {
        container: _ctx.tooltipContainer,
        margin: { right: 8 }
      }
    }, null, 8, ["startTime", "endTime", "theme", "tooltipProps"])) : createCommentVNode("", true)
  ], 2);
}
var PaymentInfoLine = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-3ff5be4d"]]);
let G = null;
class H {
}
H.render = function(w, B) {
  G(w, B);
};
self.QrCreator = H;
(function(w) {
  function B(t, c, a, e2) {
    var b = {}, h2 = w(a, c);
    h2.u(t);
    h2.J();
    e2 = e2 || 0;
    var r = h2.h(), d = h2.h() + 2 * e2;
    b.text = t;
    b.level = c;
    b.version = a;
    b.O = d;
    b.a = function(b2, a2) {
      b2 -= e2;
      a2 -= e2;
      return 0 > b2 || b2 >= r || 0 > a2 || a2 >= r ? false : h2.a(b2, a2);
    };
    return b;
  }
  function C(t, c, a, e2, b, h2, r, d, g, x) {
    function u(b2, a2, f, c2, d2, r2, g2) {
      b2 ? (t.lineTo(a2 + r2, f + g2), t.arcTo(a2, f, c2, d2, h2)) : t.lineTo(a2, f);
    }
    r ? t.moveTo(c + h2, a) : t.moveTo(c, a);
    u(d, e2, a, e2, b, -h2, 0);
    u(g, e2, b, c, b, 0, -h2);
    u(x, c, b, c, a, h2, 0);
    u(r, c, a, e2, a, 0, h2);
  }
  function z(t, c, a, e2, b, h2, r, d, g, x) {
    function u(b2, a2, c2, d2) {
      t.moveTo(b2 + c2, a2);
      t.lineTo(b2, a2);
      t.lineTo(b2, a2 + d2);
      t.arcTo(b2, a2, b2 + c2, a2, h2);
    }
    r && u(c, a, h2, h2);
    d && u(e2, a, -h2, h2);
    g && u(e2, b, -h2, -h2);
    x && u(c, b, h2, -h2);
  }
  function A(t, c) {
    var a = c.fill;
    if (typeof a === "string")
      t.fillStyle = a;
    else {
      var e2 = a.type, b = a.colorStops;
      a = a.position.map((b2) => Math.round(b2 * c.size));
      if (e2 === "linear-gradient")
        var h2 = t.createLinearGradient.apply(t, a);
      else if (e2 === "radial-gradient")
        h2 = t.createRadialGradient.apply(t, a);
      else
        throw Error("Unsupported fill");
      b.forEach(([b2, a2]) => {
        h2.addColorStop(b2, a2);
      });
      t.fillStyle = h2;
    }
  }
  function y(t, c) {
    a: {
      var a = c.text, e2 = c.v, b = c.N, h2 = c.K, r = c.P;
      b = Math.max(1, b || 1);
      for (h2 = Math.min(40, h2 || 40); b <= h2; b += 1)
        try {
          var d = B(a, e2, b, r);
          break a;
        } catch (J) {
        }
      d = void 0;
    }
    if (!d)
      return null;
    a = t.getContext("2d");
    c.background && (a.fillStyle = c.background, a.fillRect(c.left, c.top, c.size, c.size));
    e2 = d.O;
    h2 = c.size / e2;
    a.beginPath();
    for (r = 0; r < e2; r += 1)
      for (b = 0; b < e2; b += 1) {
        var g = a, x = c.left + b * h2, u = c.top + r * h2, p = r, q = b, f = d.a, k = x + h2, m = u + h2, D = p - 1, E = p + 1, n = q - 1, l = q + 1, y2 = Math.floor(Math.min(0.5, Math.max(0, c.R)) * h2), v2 = f(p, q), I = f(D, n), w2 = f(D, q);
        D = f(D, l);
        var F = f(p, l);
        l = f(E, l);
        q = f(E, q);
        E = f(E, n);
        p = f(p, n);
        x = Math.round(x);
        u = Math.round(u);
        k = Math.round(k);
        m = Math.round(m);
        v2 ? C(g, x, u, k, m, y2, !w2 && !p, !w2 && !F, !q && !F, !q && !p) : z(g, x, u, k, m, y2, w2 && p && I, w2 && F && D, q && F && l, q && p && E);
      }
    A(a, c);
    a.fill();
    return t;
  }
  var v = { minVersion: 1, maxVersion: 40, ecLevel: "L", left: 0, top: 0, size: 200, fill: "#000", background: null, text: "no text", radius: 0.5, quiet: 0 };
  G = function(t, c) {
    var a = {};
    Object.assign(a, v, t);
    a.N = a.minVersion;
    a.K = a.maxVersion;
    a.v = a.ecLevel;
    a.left = a.left;
    a.top = a.top;
    a.size = a.size;
    a.fill = a.fill;
    a.background = a.background;
    a.text = a.text;
    a.R = a.radius;
    a.P = a.quiet;
    if (c instanceof HTMLCanvasElement) {
      if (c.width !== a.size || c.height !== a.size)
        c.width = a.size, c.height = a.size;
      c.getContext("2d").clearRect(0, 0, c.width, c.height);
      y(c, a);
    } else
      t = document.createElement("canvas"), t.width = a.size, t.height = a.size, a = y(t, a), c.appendChild(a);
  };
})(function() {
  function w(c) {
    var a = C.s(c);
    return { S: function() {
      return 4;
    }, b: function() {
      return a.length;
    }, write: function(c2) {
      for (var b = 0; b < a.length; b += 1)
        c2.put(a[b], 8);
    } };
  }
  function B() {
    var c = [], a = 0, e2 = {
      B: function() {
        return c;
      },
      c: function(b) {
        return (c[Math.floor(b / 8)] >>> 7 - b % 8 & 1) == 1;
      },
      put: function(b, h2) {
        for (var a2 = 0; a2 < h2; a2 += 1)
          e2.m((b >>> h2 - a2 - 1 & 1) == 1);
      },
      f: function() {
        return a;
      },
      m: function(b) {
        var h2 = Math.floor(a / 8);
        c.length <= h2 && c.push(0);
        b && (c[h2] |= 128 >>> a % 8);
        a += 1;
      }
    };
    return e2;
  }
  function C(c, a) {
    function e2(b2, h3) {
      for (var a2 = -1; 7 >= a2; a2 += 1)
        if (!(-1 >= b2 + a2 || d <= b2 + a2))
          for (var c2 = -1; 7 >= c2; c2 += 1)
            -1 >= h3 + c2 || d <= h3 + c2 || (r[b2 + a2][h3 + c2] = 0 <= a2 && 6 >= a2 && (c2 == 0 || c2 == 6) || 0 <= c2 && 6 >= c2 && (a2 == 0 || a2 == 6) || 2 <= a2 && 4 >= a2 && 2 <= c2 && 4 >= c2 ? true : false);
    }
    function b(b2, a2) {
      for (var f = d = 4 * c + 17, k = Array(f), m = 0; m < f; m += 1) {
        k[m] = Array(f);
        for (var p = 0; p < f; p += 1)
          k[m][p] = null;
      }
      r = k;
      e2(0, 0);
      e2(d - 7, 0);
      e2(0, d - 7);
      f = y.G(c);
      for (k = 0; k < f.length; k += 1)
        for (m = 0; m < f.length; m += 1) {
          p = f[k];
          var q = f[m];
          if (r[p][q] == null)
            for (var n = -2; 2 >= n; n += 1)
              for (var l = -2; 2 >= l; l += 1)
                r[p + n][q + l] = n == -2 || n == 2 || l == -2 || l == 2 || n == 0 && l == 0;
        }
      for (f = 8; f < d - 8; f += 1)
        r[f][6] == null && (r[f][6] = f % 2 == 0);
      for (f = 8; f < d - 8; f += 1)
        r[6][f] == null && (r[6][f] = f % 2 == 0);
      f = y.w(h2 << 3 | a2);
      for (k = 0; 15 > k; k += 1)
        m = !b2 && (f >> k & 1) == 1, r[6 > k ? k : 8 > k ? k + 1 : d - 15 + k][8] = m, r[8][8 > k ? d - k - 1 : 9 > k ? 15 - k : 14 - k] = m;
      r[d - 8][8] = !b2;
      if (7 <= c) {
        f = y.A(c);
        for (k = 0; 18 > k; k += 1)
          m = !b2 && (f >> k & 1) == 1, r[Math.floor(k / 3)][k % 3 + d - 8 - 3] = m;
        for (k = 0; 18 > k; k += 1)
          m = !b2 && (f >> k & 1) == 1, r[k % 3 + d - 8 - 3][Math.floor(k / 3)] = m;
      }
      if (g == null) {
        b2 = t.I(c, h2);
        f = B();
        for (k = 0; k < x.length; k += 1)
          m = x[k], f.put(4, 4), f.put(m.b(), y.f(4, c)), m.write(f);
        for (k = m = 0; k < b2.length; k += 1)
          m += b2[k].j;
        if (f.f() > 8 * m)
          throw Error("code length overflow. (" + f.f() + ">" + 8 * m + ")");
        for (f.f() + 4 <= 8 * m && f.put(0, 4); f.f() % 8 != 0; )
          f.m(false);
        for (; !(f.f() >= 8 * m); ) {
          f.put(236, 8);
          if (f.f() >= 8 * m)
            break;
          f.put(17, 8);
        }
        var u2 = 0;
        m = k = 0;
        p = Array(b2.length);
        q = Array(b2.length);
        for (n = 0; n < b2.length; n += 1) {
          var v2 = b2[n].j, w2 = b2[n].o - v2;
          k = Math.max(k, v2);
          m = Math.max(m, w2);
          p[n] = Array(v2);
          for (l = 0; l < p[n].length; l += 1)
            p[n][l] = 255 & f.B()[l + u2];
          u2 += v2;
          l = y.C(w2);
          v2 = z(p[n], l.b() - 1).l(l);
          q[n] = Array(l.b() - 1);
          for (l = 0; l < q[n].length; l += 1)
            w2 = l + v2.b() - q[n].length, q[n][l] = 0 <= w2 ? v2.c(w2) : 0;
        }
        for (l = f = 0; l < b2.length; l += 1)
          f += b2[l].o;
        f = Array(f);
        for (l = u2 = 0; l < k; l += 1)
          for (n = 0; n < b2.length; n += 1)
            l < p[n].length && (f[u2] = p[n][l], u2 += 1);
        for (l = 0; l < m; l += 1)
          for (n = 0; n < b2.length; n += 1)
            l < q[n].length && (f[u2] = q[n][l], u2 += 1);
        g = f;
      }
      b2 = g;
      f = -1;
      k = d - 1;
      m = 7;
      p = 0;
      a2 = y.F(a2);
      for (q = d - 1; 0 < q; q -= 2)
        for (q == 6 && --q; ; ) {
          for (n = 0; 2 > n; n += 1)
            r[k][q - n] == null && (l = false, p < b2.length && (l = (b2[p] >>> m & 1) == 1), a2(k, q - n) && (l = !l), r[k][q - n] = l, --m, m == -1 && (p += 1, m = 7));
          k += f;
          if (0 > k || d <= k) {
            k -= f;
            f = -f;
            break;
          }
        }
    }
    var h2 = A[a], r = null, d = 0, g = null, x = [], u = { u: function(b2) {
      b2 = w(b2);
      x.push(b2);
      g = null;
    }, a: function(b2, a2) {
      if (0 > b2 || d <= b2 || 0 > a2 || d <= a2)
        throw Error(b2 + "," + a2);
      return r[b2][a2];
    }, h: function() {
      return d;
    }, J: function() {
      for (var a2 = 0, h3 = 0, c2 = 0; 8 > c2; c2 += 1) {
        b(true, c2);
        var d2 = y.D(u);
        if (c2 == 0 || a2 > d2)
          a2 = d2, h3 = c2;
      }
      b(false, h3);
    } };
    return u;
  }
  function z(c, a) {
    if (typeof c.length == "undefined")
      throw Error(c.length + "/" + a);
    var e2 = function() {
      for (var b2 = 0; b2 < c.length && c[b2] == 0; )
        b2 += 1;
      for (var r = Array(c.length - b2 + a), d = 0; d < c.length - b2; d += 1)
        r[d] = c[d + b2];
      return r;
    }(), b = { c: function(b2) {
      return e2[b2];
    }, b: function() {
      return e2.length;
    }, multiply: function(a2) {
      for (var h2 = Array(b.b() + a2.b() - 1), c2 = 0; c2 < b.b(); c2 += 1)
        for (var g = 0; g < a2.b(); g += 1)
          h2[c2 + g] ^= v.i(v.g(b.c(c2)) + v.g(a2.c(g)));
      return z(h2, 0);
    }, l: function(a2) {
      if (0 > b.b() - a2.b())
        return b;
      for (var c2 = v.g(b.c(0)) - v.g(a2.c(0)), h2 = Array(b.b()), g = 0; g < b.b(); g += 1)
        h2[g] = b.c(g);
      for (g = 0; g < a2.b(); g += 1)
        h2[g] ^= v.i(v.g(a2.c(g)) + c2);
      return z(h2, 0).l(a2);
    } };
    return b;
  }
  C.s = function(c) {
    for (var a = [], e2 = 0; e2 < c.length; e2++) {
      var b = c.charCodeAt(e2);
      128 > b ? a.push(b) : 2048 > b ? a.push(192 | b >> 6, 128 | b & 63) : 55296 > b || 57344 <= b ? a.push(224 | b >> 12, 128 | b >> 6 & 63, 128 | b & 63) : (e2++, b = 65536 + ((b & 1023) << 10 | c.charCodeAt(e2) & 1023), a.push(240 | b >> 18, 128 | b >> 12 & 63, 128 | b >> 6 & 63, 128 | b & 63));
    }
    return a;
  };
  var A = { L: 1, M: 0, Q: 3, H: 2 }, y = function() {
    function c(b) {
      for (var a2 = 0; b != 0; )
        a2 += 1, b >>>= 1;
      return a2;
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
    ], e2 = { w: function(b) {
      for (var a2 = b << 10; 0 <= c(a2) - c(1335); )
        a2 ^= 1335 << c(a2) - c(1335);
      return (b << 10 | a2) ^ 21522;
    }, A: function(b) {
      for (var a2 = b << 12; 0 <= c(a2) - c(7973); )
        a2 ^= 7973 << c(a2) - c(7973);
      return b << 12 | a2;
    }, G: function(b) {
      return a[b - 1];
    }, F: function(b) {
      switch (b) {
        case 0:
          return function(b2, a2) {
            return (b2 + a2) % 2 == 0;
          };
        case 1:
          return function(b2) {
            return b2 % 2 == 0;
          };
        case 2:
          return function(b2, a2) {
            return a2 % 3 == 0;
          };
        case 3:
          return function(b2, a2) {
            return (b2 + a2) % 3 == 0;
          };
        case 4:
          return function(b2, a2) {
            return (Math.floor(b2 / 2) + Math.floor(a2 / 3)) % 2 == 0;
          };
        case 5:
          return function(b2, a2) {
            return b2 * a2 % 2 + b2 * a2 % 3 == 0;
          };
        case 6:
          return function(b2, a2) {
            return (b2 * a2 % 2 + b2 * a2 % 3) % 2 == 0;
          };
        case 7:
          return function(b2, a2) {
            return (b2 * a2 % 3 + (b2 + a2) % 2) % 2 == 0;
          };
        default:
          throw Error("bad maskPattern:" + b);
      }
    }, C: function(b) {
      for (var a2 = z([1], 0), c2 = 0; c2 < b; c2 += 1)
        a2 = a2.multiply(z([1, v.i(c2)], 0));
      return a2;
    }, f: function(b, a2) {
      if (b != 4 || 1 > a2 || 40 < a2)
        throw Error("mode: " + b + "; type: " + a2);
      return 10 > a2 ? 8 : 16;
    }, D: function(b) {
      for (var a2 = b.h(), c2 = 0, d = 0; d < a2; d += 1)
        for (var g = 0; g < a2; g += 1) {
          for (var e3 = 0, t2 = b.a(d, g), p = -1; 1 >= p; p += 1)
            if (!(0 > d + p || a2 <= d + p))
              for (var q = -1; 1 >= q; q += 1)
                0 > g + q || a2 <= g + q || (p != 0 || q != 0) && t2 == b.a(d + p, g + q) && (e3 += 1);
          5 < e3 && (c2 += 3 + e3 - 5);
        }
      for (d = 0; d < a2 - 1; d += 1)
        for (g = 0; g < a2 - 1; g += 1)
          if (e3 = 0, b.a(d, g) && (e3 += 1), b.a(d + 1, g) && (e3 += 1), b.a(d, g + 1) && (e3 += 1), b.a(d + 1, g + 1) && (e3 += 1), e3 == 0 || e3 == 4)
            c2 += 3;
      for (d = 0; d < a2; d += 1)
        for (g = 0; g < a2 - 6; g += 1)
          b.a(d, g) && !b.a(d, g + 1) && b.a(d, g + 2) && b.a(d, g + 3) && b.a(d, g + 4) && !b.a(d, g + 5) && b.a(d, g + 6) && (c2 += 40);
      for (g = 0; g < a2; g += 1)
        for (d = 0; d < a2 - 6; d += 1)
          b.a(d, g) && !b.a(d + 1, g) && b.a(d + 2, g) && b.a(d + 3, g) && b.a(d + 4, g) && !b.a(d + 5, g) && b.a(d + 6, g) && (c2 += 40);
      for (g = e3 = 0; g < a2; g += 1)
        for (d = 0; d < a2; d += 1)
          b.a(d, g) && (e3 += 1);
      return c2 += Math.abs(100 * e3 / a2 / a2 - 50) / 5 * 10;
    } };
    return e2;
  }(), v = function() {
    for (var c = Array(256), a = Array(256), e2 = 0; 8 > e2; e2 += 1)
      c[e2] = 1 << e2;
    for (e2 = 8; 256 > e2; e2 += 1)
      c[e2] = c[e2 - 4] ^ c[e2 - 5] ^ c[e2 - 6] ^ c[e2 - 8];
    for (e2 = 0; 255 > e2; e2 += 1)
      a[c[e2]] = e2;
    return { g: function(b) {
      if (1 > b)
        throw Error("glog(" + b + ")");
      return a[b];
    }, i: function(b) {
      for (; 0 > b; )
        b += 255;
      for (; 256 <= b; )
        b -= 255;
      return c[b];
    } };
  }(), t = function() {
    function c(b, c2) {
      switch (c2) {
        case A.L:
          return a[4 * (b - 1)];
        case A.M:
          return a[4 * (b - 1) + 1];
        case A.Q:
          return a[4 * (b - 1) + 2];
        case A.H:
          return a[4 * (b - 1) + 3];
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
    ], e2 = { I: function(b, a2) {
      var e3 = c(b, a2);
      if (typeof e3 == "undefined")
        throw Error("bad rs block @ typeNumber:" + b + "/errorCorrectLevel:" + a2);
      b = e3.length / 3;
      a2 = [];
      for (var d = 0; d < b; d += 1)
        for (var g = e3[3 * d], h2 = e3[3 * d + 1], t2 = e3[3 * d + 2], p = 0; p < g; p += 1) {
          var q = t2, f = {};
          f.o = h2;
          f.j = q;
          a2.push(f);
        }
      return a2;
    } };
    return e2;
  }();
  return C;
}());
var QrCreator$1 = QrCreator;
const _sfc_main$3 = defineComponent({
  name: "QrCode",
  props: {
    data: String,
    errorCorrection: {
      type: String,
      default: "M",
      validator: (value) => ["L", "M", "H", "Q"].includes(value)
    },
    radius: {
      type: Number,
      default: 0.5,
      validator: (value) => value >= 0 && value <= 1
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
      validator: (fill) => {
        const isValidColor = (c) => typeof c === "string" && /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(c);
        if (isValidColor(fill))
          return true;
        const gradient = fill;
        const isValidGradient = (gradient.type === "linear-gradient" && gradient.position.length === 4 || gradient.type === "radial-gradient" && gradient.position.length === 6) && gradient.position.every((coordinate) => typeof coordinate === "number");
        if (!isValidGradient)
          return false;
        const hasValidGradientStops = gradient.colorStops.length >= 2 && gradient.colorStops.every(([offset, color]) => typeof offset === "number" && isValidColor(color));
        return hasValidGradientStops;
      }
    },
    background: {
      type: String,
      default: null,
      validator: (background) => background === null || /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(background)
    },
    size: {
      type: Number,
      default: 240,
      validator: (size) => size > 0
    }
  },
  setup(props, context) {
    const canvas$ = ref(null);
    async function toDataUrl(type = "image/png") {
      await nextTick();
      if (!props.data || !canvas$.value)
        return "data:,";
      return canvas$.value.toDataURL(type);
    }
    watch([
      () => props.data,
      () => props.errorCorrection,
      () => props.radius,
      () => props.fill,
      () => props.background,
      () => props.size
    ], async () => {
      await nextTick();
      if (!props.data || !canvas$.value)
        return;
      QrCreator$1.render({
        text: props.data,
        radius: props.radius,
        ecLevel: props.errorCorrection,
        fill: props.fill,
        background: props.background,
        size: props.size
      }, canvas$.value);
    }, { immediate: true });
    context.expose({
      toDataUrl
    });
    return {
      data: props.data,
      canvas$
    };
  }
});
const _hoisted_1$3 = {
  key: 0,
  ref: "canvas$",
  class: "qr-code"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return !!_ctx.data ? (openBlock(), createElementBlock("canvas", _hoisted_1$3, null, 512)) : createCommentVNode("", true);
}
var QrCode = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
class e {
  constructor(a, b, c, d, f) {
    this._legacyCanvasSize = e.DEFAULT_CANVAS_SIZE;
    this._preferredCamera = "environment";
    this._maxScansPerSecond = 25;
    this._lastScanTimestamp = -1;
    this._destroyed = this._flashOn = this._paused = this._active = false;
    this.$video = a;
    this.$canvas = document.createElement("canvas");
    c && typeof c === "object" ? this._onDecode = b : (c || d || f ? console.warn("You're using a deprecated version of the QrScanner constructor which will be removed in the future") : console.warn("Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."), this._legacyOnDecode = b);
    b = typeof c === "object" ? c : {};
    this._onDecodeError = b.onDecodeError || (typeof c === "function" ? c : this._onDecodeError);
    this._calculateScanRegion = b.calculateScanRegion || (typeof d === "function" ? d : this._calculateScanRegion);
    this._preferredCamera = b.preferredCamera || f || this._preferredCamera;
    this._legacyCanvasSize = typeof c === "number" ? c : typeof d === "number" ? d : this._legacyCanvasSize;
    this._maxScansPerSecond = b.maxScansPerSecond || this._maxScansPerSecond;
    this._onPlay = this._onPlay.bind(this);
    this._onLoadedMetaData = this._onLoadedMetaData.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._updateOverlay = this._updateOverlay.bind(this);
    a.disablePictureInPicture = true;
    a.playsInline = true;
    a.muted = true;
    let h2 = false;
    a.hidden && (a.hidden = false, h2 = true);
    document.body.contains(a) || (document.body.appendChild(a), h2 = true);
    c = a.parentElement;
    if (b.highlightScanRegion || b.highlightCodeOutline) {
      d = !!b.overlay;
      this.$overlay = b.overlay || document.createElement("div");
      f = this.$overlay.style;
      f.position = "absolute";
      f.display = "none";
      f.pointerEvents = "none";
      this.$overlay.classList.add("scan-region-highlight");
      if (!d && b.highlightScanRegion) {
        this.$overlay.innerHTML = '<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';
        try {
          this.$overlay.firstElementChild.animate({ transform: [
            "scale(.98)",
            "scale(1.01)"
          ] }, { duration: 400, iterations: Infinity, direction: "alternate", easing: "ease-in-out" });
        } catch (m) {
        }
        c.insertBefore(this.$overlay, this.$video.nextSibling);
      }
      b.highlightCodeOutline && (this.$overlay.insertAdjacentHTML("beforeend", '<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'), this.$codeOutlineHighlight = this.$overlay.lastElementChild);
    }
    this._scanRegion = this._calculateScanRegion(a);
    requestAnimationFrame(() => {
      let m = window.getComputedStyle(a);
      m.display === "none" && (a.style.setProperty("display", "block", "important"), h2 = true);
      m.visibility !== "visible" && (a.style.setProperty("visibility", "visible", "important"), h2 = true);
      h2 && (console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."), a.style.opacity = "0", a.style.width = "0", a.style.height = "0", this.$overlay && this.$overlay.parentElement && this.$overlay.parentElement.removeChild(this.$overlay), delete this.$overlay, delete this.$codeOutlineHighlight);
      this.$overlay && this._updateOverlay();
    });
    a.addEventListener("play", this._onPlay);
    a.addEventListener("loadedmetadata", this._onLoadedMetaData);
    document.addEventListener("visibilitychange", this._onVisibilityChange);
    window.addEventListener("resize", this._updateOverlay);
    this._qrEnginePromise = e.createQrEngine();
  }
  static set WORKER_PATH(a) {
    console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.");
  }
  static async hasCamera() {
    try {
      return !!(await e.listCameras(false)).length;
    } catch (a) {
      return false;
    }
  }
  static async listCameras(a = false) {
    if (!navigator.mediaDevices)
      return [];
    let b = async () => (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput"), c;
    try {
      a && (await b()).every((d) => !d.label) && (c = await navigator.mediaDevices.getUserMedia({ audio: false, video: true }));
    } catch (d) {
    }
    try {
      return (await b()).map((d, f) => ({ id: d.deviceId, label: d.label || (f === 0 ? "Default Camera" : `Camera ${f + 1}`) }));
    } finally {
      c && (console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"), e._stopVideoStream(c));
    }
  }
  async hasFlash() {
    let a;
    try {
      if (this.$video.srcObject) {
        if (!(this.$video.srcObject instanceof MediaStream))
          return false;
        a = this.$video.srcObject;
      } else
        a = (await this._getCameraStream()).stream;
      return "torch" in a.getVideoTracks()[0].getSettings();
    } catch (b) {
      return false;
    } finally {
      a && a !== this.$video.srcObject && (console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"), e._stopVideoStream(a));
    }
  }
  isFlashOn() {
    return this._flashOn;
  }
  async toggleFlash() {
    this._flashOn ? await this.turnFlashOff() : await this.turnFlashOn();
  }
  async turnFlashOn() {
    if (!this._flashOn && !this._destroyed && (this._flashOn = true, this._active && !this._paused))
      try {
        if (!await this.hasFlash())
          throw "No flash available";
        await this.$video.srcObject.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: true }] });
      } catch (a) {
        throw this._flashOn = false, a;
      }
  }
  async turnFlashOff() {
    this._flashOn && (this._flashOn = false, await this._restartVideoStream());
  }
  destroy() {
    this.$video.removeEventListener("loadedmetadata", this._onLoadedMetaData);
    this.$video.removeEventListener("play", this._onPlay);
    document.removeEventListener("visibilitychange", this._onVisibilityChange);
    window.removeEventListener("resize", this._updateOverlay);
    this._destroyed = true;
    this._flashOn = false;
    this.stop();
    e._postWorkerMessage(this._qrEnginePromise, "close");
  }
  async start() {
    if (this._destroyed)
      throw Error("The QR scanner can not be started as it had been destroyed.");
    if (!this._active || this._paused) {
      if (window.location.protocol !== "https:" && console.warn("The camera stream is only accessible if the page is transferred via https."), this._active = true, !document.hidden)
        if (this._paused = false, this.$video.srcObject)
          await this.$video.play();
        else
          try {
            let { stream: a, facingMode: b } = await this._getCameraStream();
            !this._active || this._paused ? e._stopVideoStream(a) : (this._setVideoMirror(b), this.$video.srcObject = a, await this.$video.play(), this._flashOn && (this._flashOn = false, this.turnFlashOn().catch(() => {
            })));
          } catch (a) {
            if (!this._paused)
              throw this._active = false, a;
          }
    }
  }
  stop() {
    this.pause();
    this._active = false;
  }
  async pause(a = false) {
    this._paused = true;
    if (!this._active)
      return true;
    this.$video.pause();
    this.$overlay && (this.$overlay.style.display = "none");
    let b = () => {
      this.$video.srcObject instanceof MediaStream && (e._stopVideoStream(this.$video.srcObject), this.$video.srcObject = null);
    };
    if (a)
      return b(), true;
    await new Promise((c) => setTimeout(c, 300));
    if (!this._paused)
      return false;
    b();
    return true;
  }
  async setCamera(a) {
    a !== this._preferredCamera && (this._preferredCamera = a, await this._restartVideoStream());
  }
  static async scanImage(a, b, c, d, f = false, h2 = false) {
    let m, n = false;
    b && ("scanRegion" in b || "qrEngine" in b || "canvas" in b || "disallowCanvasResizing" in b || "alsoTryWithoutScanRegion" in b || "returnDetailedScanResult" in b) ? (m = b.scanRegion, c = b.qrEngine, d = b.canvas, f = b.disallowCanvasResizing || false, h2 = b.alsoTryWithoutScanRegion || false, n = true) : b || c || d || f || h2 ? console.warn("You're using a deprecated api for scanImage which will be removed in the future.") : console.warn("Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true.");
    b = !!c;
    try {
      let p, k;
      [c, p] = await Promise.all([c || e.createQrEngine(), e._loadImage(a)]);
      [d, k] = e._drawToCanvas(p, m, d, f);
      let q;
      if (c instanceof Worker) {
        let g = c;
        b || e._postWorkerMessageSync(g, "inversionMode", "both");
        q = await new Promise((l, v) => {
          let w, u, r, y = -1;
          u = (t) => {
            t.data.id === y && (g.removeEventListener("message", u), g.removeEventListener("error", r), clearTimeout(w), t.data.data !== null ? l({ data: t.data.data, cornerPoints: e._convertPoints(t.data.cornerPoints, m) }) : v(e.NO_QR_CODE_FOUND));
          };
          r = (t) => {
            g.removeEventListener("message", u);
            g.removeEventListener("error", r);
            clearTimeout(w);
            v("Scanner error: " + (t ? t.message || t : "Unknown Error"));
          };
          g.addEventListener("message", u);
          g.addEventListener("error", r);
          w = setTimeout(() => r("timeout"), 1e4);
          let x = k.getImageData(0, 0, d.width, d.height);
          y = e._postWorkerMessageSync(g, "decode", x, [x.data.buffer]);
        });
      } else
        q = await Promise.race([new Promise((g, l) => window.setTimeout(() => l("Scanner error: timeout"), 1e4)), (async () => {
          try {
            var [g] = await c.detect(d);
            if (!g)
              throw e.NO_QR_CODE_FOUND;
            return { data: g.rawValue, cornerPoints: e._convertPoints(g.cornerPoints, m) };
          } catch (l) {
            g = l.message || l;
            if (/not implemented|service unavailable/.test(g))
              return e._disableBarcodeDetector = true, e.scanImage(a, { scanRegion: m, canvas: d, disallowCanvasResizing: f, alsoTryWithoutScanRegion: h2 });
            throw `Scanner error: ${g}`;
          }
        })()]);
      return n ? q : q.data;
    } catch (p) {
      if (!m || !h2)
        throw p;
      let k = await e.scanImage(a, { qrEngine: c, canvas: d, disallowCanvasResizing: f });
      return n ? k : k.data;
    } finally {
      b || e._postWorkerMessage(c, "close");
    }
  }
  setGrayscaleWeights(a, b, c, d = true) {
    e._postWorkerMessage(this._qrEnginePromise, "grayscaleWeights", {
      red: a,
      green: b,
      blue: c,
      useIntegerApproximation: d
    });
  }
  setInversionMode(a) {
    e._postWorkerMessage(this._qrEnginePromise, "inversionMode", a);
  }
  static async createQrEngine(a) {
    a && console.warn("Specifying a worker path is not required and not supported anymore.");
    return !e._disableBarcodeDetector && "BarcodeDetector" in window && BarcodeDetector.getSupportedFormats && (await BarcodeDetector.getSupportedFormats()).includes("qr_code") ? new BarcodeDetector({ formats: ["qr_code"] }) : Promise.resolve().then(function() {
      return qrScannerWorker_min;
    }).then((b) => b.createWorker());
  }
  _onPlay() {
    this._scanRegion = this._calculateScanRegion(this.$video);
    this._updateOverlay();
    this.$overlay && (this.$overlay.style.display = "");
    this._scanFrame();
  }
  _onLoadedMetaData() {
    this._scanRegion = this._calculateScanRegion(this.$video);
    this._updateOverlay();
  }
  _onVisibilityChange() {
    document.hidden ? this.pause() : this._active && this.start();
  }
  _calculateScanRegion(a) {
    let b = Math.round(2 / 3 * Math.min(a.videoWidth, a.videoHeight));
    return {
      x: Math.round((a.videoWidth - b) / 2),
      y: Math.round((a.videoHeight - b) / 2),
      width: b,
      height: b,
      downScaledWidth: this._legacyCanvasSize,
      downScaledHeight: this._legacyCanvasSize
    };
  }
  _updateOverlay() {
    requestAnimationFrame(() => {
      if (this.$overlay) {
        var a = this.$video, b = a.videoWidth, c = a.videoHeight, d = a.offsetWidth, f = a.offsetHeight, h2 = a.offsetLeft, m = a.offsetTop, n = window.getComputedStyle(a), p = n.objectFit, k = b / c, q = d / f;
        switch (p) {
          case "none":
            var g = b;
            var l = c;
            break;
          case "fill":
            g = d;
            l = f;
            break;
          default:
            (p === "cover" ? k > q : k < q) ? (l = f, g = l * k) : (g = d, l = g / k), p === "scale-down" && (g = Math.min(g, b), l = Math.min(l, c));
        }
        var [v, w] = n.objectPosition.split(" ").map((r, y) => {
          const x = parseFloat(r);
          return r.endsWith("%") ? (y ? f - l : d - g) * x / 100 : x;
        });
        n = this._scanRegion.width || b;
        q = this._scanRegion.height || c;
        p = this._scanRegion.x || 0;
        var u = this._scanRegion.y || 0;
        k = this.$overlay.style;
        k.width = `${n / b * g}px`;
        k.height = `${q / c * l}px`;
        k.top = `${m + w + u / c * l}px`;
        c = /scaleX\(-1\)/.test(a.style.transform);
        k.left = `${h2 + (c ? d - v - g : v) + (c ? b - p - n : p) / b * g}px`;
        k.transform = a.style.transform;
      }
    });
  }
  static _convertPoints(a, b) {
    if (!b)
      return a;
    let c = b.x || 0, d = b.y || 0, f = b.width && b.downScaledWidth ? b.width / b.downScaledWidth : 1;
    b = b.height && b.downScaledHeight ? b.height / b.downScaledHeight : 1;
    for (let h2 of a)
      h2.x = h2.x * f + c, h2.y = h2.y * b + d;
    return a;
  }
  _scanFrame() {
    !this._active || this.$video.paused || this.$video.ended || ("requestVideoFrameCallback" in this.$video ? this.$video.requestVideoFrameCallback.bind(this.$video) : requestAnimationFrame)(async () => {
      if (!(1 >= this.$video.readyState)) {
        var a = Date.now() - this._lastScanTimestamp, b = 1e3 / this._maxScansPerSecond;
        a < b && await new Promise((d) => setTimeout(d, b - a));
        this._lastScanTimestamp = Date.now();
        try {
          var c = await e.scanImage(this.$video, { scanRegion: this._scanRegion, qrEngine: this._qrEnginePromise, canvas: this.$canvas });
        } catch (d) {
          if (!this._active)
            return;
          this._onDecodeError(d);
        }
        !e._disableBarcodeDetector || await this._qrEnginePromise instanceof Worker || (this._qrEnginePromise = e.createQrEngine());
        c ? (this._onDecode ? this._onDecode(c) : this._legacyOnDecode && this._legacyOnDecode(c.data), this.$codeOutlineHighlight && (clearTimeout(this._codeOutlineHighlightRemovalTimeout), this._codeOutlineHighlightRemovalTimeout = void 0, this.$codeOutlineHighlight.setAttribute("viewBox", `${this._scanRegion.x || 0} ${this._scanRegion.y || 0} ${this._scanRegion.width || this.$video.videoWidth} ${this._scanRegion.height || this.$video.videoHeight}`), this.$codeOutlineHighlight.firstElementChild.setAttribute("points", c.cornerPoints.map(({ x: d, y: f }) => `${d},${f}`).join(" ")), this.$codeOutlineHighlight.style.display = "")) : this.$codeOutlineHighlight && !this._codeOutlineHighlightRemovalTimeout && (this._codeOutlineHighlightRemovalTimeout = setTimeout(() => this.$codeOutlineHighlight.style.display = "none", 100));
      }
      this._scanFrame();
    });
  }
  _onDecodeError(a) {
    a !== e.NO_QR_CODE_FOUND && console.log(a);
  }
  async _getCameraStream() {
    if (!navigator.mediaDevices)
      throw "Camera not found.";
    let a = /^(environment|user)$/.test(this._preferredCamera) ? "facingMode" : "deviceId", b = [{ width: { min: 1024 } }, { width: { min: 768 } }, {}], c = b.map((d) => Object.assign({}, d, { [a]: { exact: this._preferredCamera } }));
    for (let d of [...c, ...b])
      try {
        let f = await navigator.mediaDevices.getUserMedia({ video: d, audio: false }), h2 = this._getFacingMode(f) || (d.facingMode ? this._preferredCamera : this._preferredCamera === "environment" ? "user" : "environment");
        return { stream: f, facingMode: h2 };
      } catch (f) {
      }
    throw "Camera not found.";
  }
  async _restartVideoStream() {
    let a = this._paused;
    await this.pause(true) && !a && this._active && await this.start();
  }
  static _stopVideoStream(a) {
    for (let b of a.getTracks())
      b.stop(), a.removeTrack(b);
  }
  _setVideoMirror(a) {
    this.$video.style.transform = "scaleX(" + (a === "user" ? -1 : 1) + ")";
  }
  _getFacingMode(a) {
    return (a = a.getVideoTracks()[0]) ? /rear|back|environment/i.test(a.label) ? "environment" : /front|user|face/i.test(a.label) ? "user" : null : null;
  }
  static _drawToCanvas(a, b, c, d = false) {
    c = c || document.createElement("canvas");
    let f = b && b.x ? b.x : 0, h2 = b && b.y ? b.y : 0, m = b && b.width ? b.width : a.videoWidth || a.width, n = b && b.height ? b.height : a.videoHeight || a.height;
    d || (d = b && b.downScaledWidth ? b.downScaledWidth : m, b = b && b.downScaledHeight ? b.downScaledHeight : n, c.width !== d && (c.width = d), c.height !== b && (c.height = b));
    b = c.getContext("2d", { alpha: false });
    b.imageSmoothingEnabled = false;
    b.drawImage(a, f, h2, m, n, 0, 0, c.width, c.height);
    return [c, b];
  }
  static async _loadImage(a) {
    if (a instanceof Image)
      return await e._awaitImageLoad(a), a;
    if (a instanceof HTMLVideoElement || a instanceof HTMLCanvasElement || a instanceof SVGImageElement || "OffscreenCanvas" in window && a instanceof OffscreenCanvas || "ImageBitmap" in window && a instanceof ImageBitmap)
      return a;
    if (a instanceof File || a instanceof Blob || a instanceof URL || typeof a === "string") {
      let b = new Image();
      b.src = a instanceof File || a instanceof Blob ? URL.createObjectURL(a) : a.toString();
      try {
        return await e._awaitImageLoad(b), b;
      } finally {
        (a instanceof File || a instanceof Blob) && URL.revokeObjectURL(b.src);
      }
    } else
      throw "Unsupported image type.";
  }
  static async _awaitImageLoad(a) {
    a.complete && a.naturalWidth !== 0 || await new Promise((b, c) => {
      let d = (f) => {
        a.removeEventListener("load", d);
        a.removeEventListener("error", d);
        f instanceof ErrorEvent ? c("Image load error") : b();
      };
      a.addEventListener("load", d);
      a.addEventListener("error", d);
    });
  }
  static async _postWorkerMessage(a, b, c, d) {
    return e._postWorkerMessageSync(await a, b, c, d);
  }
  static _postWorkerMessageSync(a, b, c, d) {
    if (!(a instanceof Worker))
      return -1;
    let f = e._workerMessageId++;
    a.postMessage({ id: f, type: b, data: c }, d);
    return f;
  }
}
e.DEFAULT_CANVAS_SIZE = 400;
e.NO_QR_CODE_FOUND = "No QR code found";
e._disableBarcodeDetector = false;
e._workerMessageId = 0;
var QrScanner_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = defineComponent({
  name: "QrScanner",
  props: {
    reportFrequency: {
      type: Number,
      default: 7e3
    },
    validate: Function
  },
  methods: { $t: loadI18n("QrScanner") },
  setup(props, context) {
    const root$ = ref(null);
    const video$ = ref(null);
    const overlay$ = ref(null);
    const cameraAccessFailed = ref(false);
    const hasCamera = ref(true);
    const isMobileOrTablet = BrowserDetection$2.isMobile();
    const browser = BrowserDetection$2.detectBrowser();
    let _scanner = null;
    let _lastResult = "";
    let _lastResultTime = 0;
    let _cameraRetryTimer = null;
    onMounted(async () => {
      _scanner = new e(video$.value, (result) => _onResult(result), {});
      video$.value.addEventListener("canplay", () => video$.value.classList.add("ready"));
      window.addEventListener("resize", repositionOverlay);
      e.hasCamera().then((newHasCamera) => hasCamera.value = newHasCamera);
      if (_isVisible()) {
        start();
        repositionOverlay();
      }
    });
    onUnmounted(() => {
      stop();
      if (_scanner)
        _scanner.destroy();
      window.removeEventListener("resize", repositionOverlay);
    });
    async function start() {
      try {
        await _scanner.start();
        cameraAccessFailed.value = false;
        if (_cameraRetryTimer) {
          window.clearInterval(_cameraRetryTimer);
          _cameraRetryTimer = null;
        }
      } catch (e2) {
        cameraAccessFailed.value = true;
        context.emit("error", e2);
        if (!_cameraRetryTimer) {
          _cameraRetryTimer = window.setInterval(() => start(), 3e3);
        }
      }
      return !cameraAccessFailed.value;
    }
    function stop() {
      if (!_scanner)
        return;
      _scanner.stop();
      if (_cameraRetryTimer) {
        window.clearInterval(_cameraRetryTimer);
        _cameraRetryTimer = null;
      }
    }
    function setGrayscaleWeights(red, green, blue) {
      if (_scanner)
        _scanner.setGrayscaleWeights(red, green, blue);
    }
    function setInversionMode(inversionMode) {
      if (_scanner)
        _scanner.setInversionMode(inversionMode);
    }
    function repositionOverlay() {
      requestAnimationFrame(() => {
        if (!root$.value || !overlay$.value)
          return;
        const scannerHeight = root$.value.offsetHeight;
        const scannerWidth = root$.value.offsetWidth;
        const smallerDimension = Math.min(scannerHeight, scannerWidth);
        if (smallerDimension === 0)
          return;
        const overlaySize = Math.ceil(2 / 3 * smallerDimension);
        overlay$.value.style.width = overlaySize + "px";
        overlay$.value.style.height = overlaySize + "px";
        overlay$.value.style.top = (scannerHeight - overlaySize) / 2 + "px";
        overlay$.value.style.left = (scannerWidth - overlaySize) / 2 + "px";
      });
    }
    context.expose({ start, stop, setGrayscaleWeights, setInversionMode, repositionOverlay });
    function _isVisible() {
      return !!root$.value && root$.value.offsetWidth > 0;
    }
    function _cancel() {
      context.emit("cancel");
    }
    function _onResult(result) {
      if (result.data === _lastResult && Date.now() - _lastResultTime < props.reportFrequency || props.validate && !props.validate(result.data))
        return;
      _lastResult = result.data;
      _lastResultTime = Date.now();
      context.emit("result", result);
    }
    return {
      root$,
      video$,
      overlay$,
      cameraAccessFailed,
      hasCamera,
      isMobileOrTablet,
      browser,
      _cancel
    };
  },
  components: { I18n: _sfc_main$6 }
});
const _withScopeId = (n) => (pushScopeId("data-v-751a3d3d"), n = n(), popScopeId(), n);
const _hoisted_1$2 = {
  class: "qr-scanner nq-blue-bg",
  ref: "root$"
};
const _hoisted_2$1 = {
  ref: "video$",
  muted: "",
  autoplay: "",
  playsinline: "",
  width: "600",
  height: "600"
};
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 238 238"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "4",
    d: "M31.3 2H10a8 8 0 0 0-8 8v21.3M206.8 2H228a8 8 0 0 1 8 8v21.3m0 175.4V228a8 8 0 0 1-8 8h-21.3m-175.4 0H10a8 8 0 0 1-8-8v-21.3"
  })
], -1));
const _hoisted_4 = {
  key: 0,
  class: "camera-access-failed"
};
const _hoisted_5 = {
  key: 0,
  class: "camera-access-failed-warning"
};
const _hoisted_6 = { key: 1 };
const _hoisted_7 = { class: "camera-access-failed-warning" };
const _hoisted_8 = { key: 0 };
const _hoisted_9 = { key: 0 };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", { class: "browser-menu-icon" }, null, -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "browser-menu-arrow" }, null, -1));
const _hoisted_12 = {
  key: 1,
  class: "access-denied-instructions"
};
const _hoisted_13 = {
  key: 1,
  class: "access-denied-instructions"
};
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("b", null, "Safari", -1));
const _hoisted_15 = {
  key: 0,
  class: "camera-icon-chrome"
};
const _hoisted_16 = {
  key: 1,
  class: "camera-icon-firefox"
};
const _hoisted_17 = { key: 2 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_I18n = resolveComponent("I18n");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("video", _hoisted_2$1, null, 512),
    createElementVNode("div", {
      ref: "overlay$",
      class: normalizeClass(["overlay", { inactive: _ctx.cameraAccessFailed }])
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        _hoisted_3$1
      ], true)
    ], 2),
    createElementVNode("button", {
      class: "nq-button-s inverse cancel-button",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx._cancel && _ctx._cancel(...args))
    }, toDisplayString(_ctx.$t("Cancel")), 1),
    createVNode(Transition, { name: "fade" }, {
      default: withCtx(() => [
        _ctx.cameraAccessFailed ? (openBlock(), createElementBlock("div", _hoisted_4, [
          !_ctx.hasCamera ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(_ctx.$t("Your device does not have an accessible camera.")), 1)) : (openBlock(), createElementBlock("div", _hoisted_6, [
            createElementVNode("div", _hoisted_7, toDisplayString(_ctx.$t("Unblock the camera for this website to scan QR codes.")), 1),
            _ctx.isMobileOrTablet ? (openBlock(), createElementBlock("div", _hoisted_8, [
              _ctx.browser === "chrome" ? (openBlock(), createElementBlock("div", _hoisted_9, [
                createVNode(_component_I18n, {
                  path: "Click on {icon} and go to\\nSettings > Site Settings > Camera",
                  tag: "div",
                  class: "access-denied-instructions"
                }, {
                  icon: withCtx(() => [
                    _hoisted_10
                  ]),
                  _: 1
                }),
                _hoisted_11
              ])) : (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(_ctx.$t("Grant camera access when asked.")), 1))
            ])) : (openBlock(), createElementBlock("div", _hoisted_13, [
              _ctx.browser === "safari" ? (openBlock(), createBlock(_component_I18n, {
                key: 0,
                path: "Click on {safari} and go to\\nSettings for this Website > Camera",
                tag: "div"
              }, {
                safari: withCtx(() => [
                  _hoisted_14
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_I18n, {
                key: 1,
                path: "Click on {icon} in the URL bar.",
                tag: "div"
              }, {
                icon: withCtx(() => [
                  _ctx.browser === "chrome" ? (openBlock(), createElementBlock("span", _hoisted_15)) : _ctx.browser === "firefox" ? (openBlock(), createElementBlock("span", _hoisted_16)) : (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(_ctx.$t("the camera icon")), 1))
                ]),
                _: 1
              }))
            ]))
          ]))
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 512);
}
var QrScanner = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-751a3d3d"]]);
var SelectBar_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = defineComponent({
  name: "SelectBar",
  emits: ["changed"],
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    selectedValue: Number
  },
  setup(props, context) {
    const value = computed(() => {
      var _a;
      return (_a = selectedOption.value) == null ? void 0 : _a.value;
    });
    const sortedOptions = computed(() => props.options.sort((a, b) => a.index - b.index));
    const selectedOption = ref(props.selectedValue ? sortedOptions.value.find((val) => val.value === props.selectedValue) : sortedOptions.value[0]);
    function getColor(option) {
      if (option.index <= selectedOption.value.index) {
        return selectedOption.value.color;
      } else
        return "nq-highlight-bg";
    }
    watch(selectedOption, onChanged);
    function onChanged(option) {
      context.emit("changed", option.value);
    }
    context.expose({ value });
    return {
      sortedOptions,
      selectedOption,
      getColor
    };
  }
});
const _hoisted_1$1 = { class: "select-bar" };
const _hoisted_2 = ["value", "name", "id"];
const _hoisted_3 = ["for"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sortedOptions, (option) => {
      return openBlock(), createElementBlock("div", {
        key: option.value
      }, [
        withDirectives(createElementVNode("input", {
          value: option,
          type: "radio",
          name: _ctx.name,
          id: option.value.toString(),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedOption = $event)
        }, null, 8, _hoisted_2), [
          [vModelRadio, _ctx.selectedOption]
        ]),
        createElementVNode("label", {
          for: option.value.toString(),
          class: normalizeClass(["nq-label", _ctx.getColor(option)])
        }, toDisplayString(option.text), 11, _hoisted_3)
      ]);
    }), 128))
  ]);
}
var SelectBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-3cf86b2e"]]);
var SmallPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {};
const _hoisted_1 = { class: "small-page nq-card" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var SmallPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7d4a8b52"]]);
function setAssetPublicPath(path, imageAssetsPath) {
  window.__dynamicImportHandler__ = function(importer) {
    console.debug("__dynamicImportHandler__: ", importer);
    return customImportHandler(importer, path, imageAssetsPath);
  };
  window.__dynamicImportPreload__ = function(preloads) {
    console.debug("__dynamicImportPreload__: ", preloads);
    return preloads.map((preload) => customImportHandler(preload, path, imageAssetsPath));
  };
}
function customImportHandler(importerOrPreload, path, imageAssetsPath) {
  if (typeof imageAssetsPath === "string" && importerOrPreload.endsWith(".svg")) {
    return `${imageAssetsPath}${!imageAssetsPath.endsWith("/") ? "/" : ""}` + importerOrPreload;
  }
  return `${path}${!path.endsWith("/") ? "/" : ""}` + importerOrPreload;
}
var identicons_min = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzeW1ib2wgaWQ9ImZhY2VfMDEiPjxwYXRoIGQ9Ik05NCA4NXM0LjgtMiA4LjIgMGMuOC40LjcgMS4xIDAgMiAwIDAtMy40IDQtNC4xIDRzLTQuOC00LTQuOC00Yy0uNi0xLS4zLTEuNy43LTJ6Ii8+PHBhdGggZD0iTTk5LjMgODQuMWMxIC4yIDIgLjQgMyAuOS44LjQuNyAxLjEgMCAyYTIyLjEgMjIuMSAwIDAxLTQuMSA0YzEuOS0zLjIgMi42LTYuMyAxLjEtNi45eiIgZmlsbD0iIzNhM2EzYSIgb3BhY2l0eT0iLjIiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTk2IDEwMGMxLjYuMiAyLTUuOCAyLTlNODggOTUuNXM3LjUgMTEgMTggMCIvPjwvZz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc5IDgyczAtMTIgNi0xMiA2IDExLjYgNiAxMS42Uzg2IDcwIDc5IDgyek0xMDIgODJzMC0xMiA2LTEyIDYgMTEuNiA2IDExLjYtNS0xMS42LTEyIC40eiIvPjwvZz48cGF0aCBkPSJNOTYgODZzNC0xIDYgMGgtNnoiIG9wYWNpdHk9Ii4zIiBmaWxsPSIjZmZmIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiPjxwYXRoIGQ9Ik05MyA5MGMtOS45LTMuOC0yMC40LTYuMi0zMS03TTkyLjYgOTEuM2MtMTItMi44LTI3LjctMS4yLTI3LjctMS4yTTkyLjUgOTMuMmMtMTIuMy0xLTI3LjYgNS0yNy42IDVNMTAxIDkwYTg0LjEgODQuMSAwIDAxMjctN00xMDEuMyA5MS4zYzEwLjUtMi44IDI0LjEtMS4yIDI0LjEtMS4yTTEwMS40IDkzLjJjMTAuNy0xIDI0IDUgMjQgNSIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzAyIj48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc3IDc1czAtMTIgNi0xMiA2IDExLjYgNiAxMS42Uzg0IDYzIDc3IDc1ek0xMDEgNzQuNXMwLTExIDUuNS0xMSA1LjUgMTAuNiA1LjUgMTAuNi00LjYtMTAuNi0xMSAuNHpNMTA2LjcgMTAwYTE1IDE1IDAgMDEtMTEuMSA1SDk1YTE1IDE1IDAgMDEtMTEuMS01Yy0zLTMuMi01LTguNS01LTExczQuNiAxLjUgMTYgMS41aC42YzcuOCAwIDEyLjctMi41IDEzLjYtM3MyLjQtLjYgMi40IDEuNi0xLjkgNy43LTQuOSAxMXoiLz48L2c+PGNpcmNsZSBjeD0iOTkiIGN5PSI3OS44IiByPSI5Ii8+PHBhdGggZD0iTTEwOCA4MC44YTkgOSAwIDAxLTE2IDQuNmMyLjMuOCA4IDEuNiAxMS42LTIgMi43LTIuNSAyLjgtNy4yIDIuMS05LjZhOSA5IDAgMDEyLjIgN3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4yIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wMyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTcyLjQgNzAuNXMtNSAyLjMtNC41IDUuNCA0LjUgMi4zIDQuNS0uNCAxLjQtNC41IDAtNXpNMTExIDY2LjhzMy4yLS45IDQuMy43LTEuMiAyLjktMi4zIDEuNi0yLjUtMS42LTItMi4zek03MC41IDY3LjJzLTMuNC0uMS00IDEuOCAxLjkgMi41IDIuNiAxIDItMi4yIDEuNC0yLjh6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNMTA5LjkgMTAxLjFINzUuNXMxLjctMTkuNCAxOC42LTE5LjRjNC40LS4yIDguOCAxLjYgMTEuOCA0LjggNS4zIDUuNyA0IDE0LjYgNCAxNC42eiIvPjxjaXJjbGUgY3g9Ijc4LjgiIGN5PSI2Ny43IiByPSI0LjgiLz48Y2lyY2xlIGN4PSIxMDYuMSIgY3k9IjY3LjciIHI9IjQuNCIvPjwvZz48cGF0aCBkPSJNMTA1LjMgNTguNWMyLjktLjMgNS44IDQuNiA4LjYgNi45IDAgMC0zLjctNy41LTQuNC04LjZzLTQuMiAxLjctNC4yIDEuN3pNODAuNyA1OS4yYy0yLjYtMS4yLTcgMi4zLTEwLjQgMy42IDAgMCA2LTUuOCA3LjEtNi42czMuMyAzIDMuMyAzeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDQiPjxlbGxpcHNlIGN4PSIxMDguOCIgY3k9IjcxLjYiIHJ4PSIzLjciIHJ5PSI0LjMiIGZpbGw9IiM0MjIxMGIiLz48cGF0aCBkPSJNNzYuMSA4Ny4zczIuOCAxMy40IDE4LjQgMTIuN2MxNi0uOCAxNi41LTEzLjYgMTYuNS0xMy42IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MjIxMGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTc1LjYgNjguMmE5LjMgOS4zIDAgMDE4LjcgNi4yYy0zLjItMi4xLTQuMi0yLjgtOS0uNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyMTBiIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wNSI+PHBhdGggZD0iTTgzLjUgNTcuN2ExIDEgMCAwMC0uOSAxLjNzNCAxMS44IDQuMyAyMi4zYTEgMSAwIDEwMiAwYy0uMy0xMS00LjQtMjMtNC40LTIzYTEgMSAwIDAwLTEtLjZ6bS0uMyAyLjVjLTEuNi4yLTIuNy43LTMuMyAxLjctLjcgMS0uNSAyIDAgMyAuOSAyIDMgMy45IDUuOCA1LjIgMi40IDEuMiA0LjIgMyA0LjcgNCAuMy42LjIgMSAwIDEuMy0uMi40LS44LjgtMiAxLjEtMi40LjUtMy44IDAtNC42LS45LS45LS44LTEuMS0yLS43LTMuMWExIDEgMCAxMC0yLS43IDUuMSA1LjEgMCAwMDEuMiA1LjJjMS40IDEuNCAzLjcgMi4xIDYuNSAxLjUgMS42LS40IDIuNy0xIDMuMy0yIC42LTEgLjYtMi4xLjEtMy4xLS44LTItMy0zLjctNS42LTUtMi40LTEuMy00LjQtMy01LTQuMy0uMi0uNi0uMi0uOSAwLTEuMSAwLS4zLjYtLjYgMS44LS44IDIuNi0uMiAzLjguNiA0LjUgMS4yLjYuNy43IDEuMy43IDEuM2ExIDEgMCAxMDItLjNzLS4yLTEuMy0xLjMtMi40Yy0xLTEtMy0yLTYuMS0xLjh6TTEwMi4yIDU3LjlhMSAxIDAgMDAtMSAxLjRzNSAxMC42IDYuMiAyMC4zYTEgMSAwIDEwMi0uMiA4MC43IDgwLjcgMCAwMC02LjMtMjEgMSAxIDAgMDAtLjktLjV6bS0uMSAyLjVjLTEuNS40LTIuNSAxLTMgMS45LS41IDEtLjMgMiAuMyAzIDEgMS43IDMuMyAzLjIgNiA0LjIgMi4zLjkgNC4yIDIuMyA0LjcgMy4zLjMuNS4zLjguMSAxLjEtLjEuMy0uNi44LTEuNyAxLjItMi4xLjctMy41LjMtNC4zLS40YTIuOSAyLjkgMCAwMS0xLTIuOCAxIDEgMCAxMC0yLS40Yy0uMyAxLjcuMyAzLjYgMS43IDQuOCAxLjQgMS4yIDMuNiAxLjYgNi4yLjcgMS40LS41IDIuNC0xLjIgMy0yLjIuNC0xIC4zLTItLjItMy0xLTEuOC0zLjItMy4yLTUuOS00LjItMi4zLS45LTQuMy0yLjMtNS0zLjQtLjItLjUtLjItLjgtLjEtMSAwLS4yLjUtLjYgMS42LS44IDIuNC0uNCAzLjYuMSA0LjIuNi43LjYuOCAxLjEuOCAxLjFhMSAxIDAgMTAyLS41cy0uNC0xLjItMS41LTIuMWMtMS4xLTEtMy0xLjYtNi0xLjF6Ii8+PHBhdGggZD0iTTEwNi43IDk5YTE1IDE1IDAgMDEtMTEuMSA1SDk1YTE1IDE1IDAgMDEtMTEtNWMtMy0zLjItNS04LjUtNS0xMXM0LjYgMS41IDE2IDEuNWguNmM3LjggMCAxMi43LTIuNSAxMy42LTNzMi40LS42IDIuNCAxLjYtMS45IDcuNy00LjkgMTF6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik05MiA5MC4zYy0uNC4xLS43IDEwLjUgMCAxNC41czkuMiA3LjYgMTEuNy00YzEuNC00LjQuNy0xMS45LjctMTEuOXMtNi44IDIuMi0xMi4zIDEuM3oiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNOTguNyA5Mi42cy43IDcuMS0uMiAxMS40LjcgNC4yIDIuNCAyIDMuOC02LjIgMy41LTEzLjd2LTMuNGwtNS45IDEuNnoiIGZpbGw9IiNlODQ3MTUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA2Ij48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc3IDc2czAtMTIgNi0xMiA2IDExLjU5IDYgMTEuNTlTODQgNjQgNzcgNzZ6TTEwMSA3NS41czAtMTEgNS41LTExIDUuNSAxMC42MiA1LjUgMTAuNjItNC41OC0xMC42Mi0xMSAuMzh6TTk1LjMzIDk1LjA5cS0uNzcgMC0xLjUtLjA2Yy0uODgtLjA2LTEuMjggNS4zNi0yLjU1IDUuNjdzLTEuNzItNi4zOC0yLjU0LTYuNjNjLTIuMzctLjcyLTYuNDgtMS43Ni04LjI2LTIuOTEtNC0yLjU5LTQuNDItNS43NC00LjQyLTcgMC0yLjM4IDcuNDYgNS40MiAxOSA1LjQyaC40NmM3Ljg5IDAgMTIuNzgtMi41MyAxMy42NS0zczIuMzktLjY1IDIuMzkgMS42YzAgMS4wOS0xLjg1IDIuNzctNC42OSA0LjIxLS43My4zNy0uODYgOC40My0yLjM4IDguMDVzLTEuNzMtNi4zOS0yLjY1LTYuMTRhMjQuMiAyNC4yIDAgMDEtNi41MS43OXoiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTg3LjkzIDg4LjU0bDIuNTcgMTEuMzhzLjQ2IDEuOTIgMS40OCAwIDIuNS0xMC40IDIuNS0xMC40YTI2LjY2IDI2LjY2IDAgMDEtNi41NS0uOTh6TTEwMC44NCA4OS4xM2wyLjgxIDEwLjIxczEuMjIgMi4zNCAxLjc4IDAgMS43Ny0xMS44OSAxLjc3LTExLjg5LTEuNTEuODItNi4zNiAxLjY4eiIvPjwvZz48ZyBvcGFjaXR5PSIuMDUiPjxwYXRoIGQ9Ik05MSA5MS41MXMxLjE5LS41MSAwIDguNDFjMCAwIDAgMS4wOCAxIDAgLjgtMS45MiAyLjQ4LTEwLjQgMi40OC0xMC40YTE5LjIxIDE5LjIxIDAgMDEtNC4zNi0uNDV6TTEwMy40NSA5MC44czEuMDctLjcyIDEuNSA4LjI3YS44Ny44NyAwIDAwLjIzLjQzYy4xNi4xNCAxLjY5LTExLjYzIDEuNjktMTEuNjNhNDguMTYgNDguMTYgMCAwMS00LjcyIDEuNjh6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDciPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNNzYgNzdzMC0xMiA2LTEyIDYgMTEuNiA2IDExLjZTODMgNjUgNzYgNzd6TTEwMCA3Ni41czAtMTEgNS41LTExIDUuNSAxMC42IDUuNSAxMC42LTQuNi0xMC42LTExIC40eiIvPjwvZz48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTc1IDkxLjFjLS4yLTEuNS40LTIuOSAxLjQtMy45IDAgMCAxMC44IDAgMTMtNC42czQuMy0xMC4xIDcuOS03LjhjNS43IDMuMyA1IDcuOCA4LjYgMTAuMXM3LjIgNS43IDEyLjIgNS43IDUuOC41IDUuOCAyLjEtMi4yIDQuNy02LjUgMy4xLTEwLjQtNC4zLTE5LjgtLjQtNSA0LjctMTAuOCAyLjNjLTQuMS0xLjgtOC00LTExLjgtNi42eiIvPjxwYXRoIGQ9Ik03Ny44IDkyLjZsLS42IDIuOSAyLjIgMy42czYuNSAwIDguNyAyLjIgMTMuNyA1IDIwLjkgMi45IDYuNy04LjYgNi43LTguNi0xMi43IDUuNC0yMi4xIDIuMWE5IDkgMCAwMS0zLjEgMS41Yy0yLjItLjctNC40LTEuNS02LjYtMi41LTIuMy0xLTQuMy0yLjQtNi4xLTQuMXoiLz48cGF0aCBkPSJNMTE2LjMgOTQuNXMtNS44LTIuMi0xMC4xLTEuNGMtMy40LjUtNi43IDEuMy05LjkgMi42IDQuMiAxLjcgMTMuNi0xLjIgMjAtMS4yeiIvPjwvZz48cGF0aCBkPSJNMTE2LjMgOTQuNXMtNS44LTIuMi0xMC4xLTEuNC05IDEuOC0xMS4zIDMuNGMwIDAgMi40IDEuNyA3LjIgMS4zczEyLjEtMS44IDE0LjItMy4zeiIgZmlsbD0iI2ViNTI3MyIvPjxwYXRoIGQ9Ik03NiA5MC45bDEuNC0zLjZzMTAuOCAwIDEzLTQuMyA0LjMtOS40IDcuOS03LjIgNSA3LjIgOC42IDkuNCA3LjIgNC4zIDEyLjIgNC4zIDUuNyAxLjQgNS43IDIuOS0yLjIgNC4zLTYuNSAyLjktMTAuNC00LTE5LjgtLjQtNSA0LjMtMTAuOCAyLjJjLTQtMS43LTcuOS0zLjgtMTEuNy02LjJ6IiBmaWxsPSIjZmJkYjMxIi8+PHBhdGggZD0iTTc2IDkwLjlsMS40LTMuNmE1MCA1MCAwIDAwMTUuMSA3LjJjNC4zLTUgMjEuNi01IDMyLjQtMi4yLjEgMS40LTIuMiA0LjMtNi41IDIuOXMtMTAuNC00LTE5LjgtLjQtNSA0LjMtMTAuOCAyLjJjLTQuMS0xLjYtOC0zLjctMTEuOC02LjF6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNOTEuOCA4M2wtLjcgMi4yIDUuMSA0LjNjLjQuNCAxIC40IDEuNCAwIC43LS43LTIuMi0zLjYtMi4yLTMuNkw5My4zIDgzYy0uNC0uNC0xLS40LTEuNSAwIC4xIDAgLjEgMCAwIDB6Ii8+PHBhdGggZD0iTTc4LjggOTIuNmwtLjYgMS45IDIuMiAzLjZzNi41IDAgOC43IDIuMiAxMy43IDUgMjAuOSAyLjkgNi43LTguNiA2LjctOC42LTEyLjcgNS40LTIyLjEgMi4xYTkgOSAwIDAxLTMuMSAxLjVjLTIuMi0uNy00LjQtMS41LTYuNi0yLjUtMy41LTEuNS02LjEtMy4xLTYuMS0zLjF6IiBmaWxsPSIjZmJkYjMxIi8+PHBhdGggZD0iTTc4LjggOTIuNmwtLjYgMS45IDIuMiAzLjZzNi41IDAgOC43IDIuMiAxMy43IDUgMjAuOSAyLjkgNi43LTguNiA2LjctOC42LTEyLjcgNS40LTIyLjEgMi4xYTkgOSAwIDAxLTMuMSAxLjVjLTIuMi0uNy00LjQtMS41LTYuNi0yLjUtMy41LTEuNS02LjEtMy4xLTYuMS0zLjF6IiBvcGFjaXR5PSIuMiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDgiPjxwYXRoIGQ9Ik0xMTEuNCA2OC4zYy42IDIuNy0uNiA1LjMtMi41IDUuN3MtNC0xLjUtNC42LTQuMi42LTUuMyAyLjUtNS43Yy43LS4xIDcuOS4zIDcuOS4zcy0zLjYgMi41LTMuMyAzLjl6TTgwLjcgNjYuOWMtLjYgMy4xLjcgNS45IDIuOCA2LjNzNC40LTEuNyA1LjEtNC43LS42LTUuOS0yLjgtNi4zYy0uNi0uMS0xMC4xLS4xLTEwLjYuMS0uOS4zIDYuOCAzLjcgNS41IDQuNnoiLz48cGF0aCBkPSJNMTExLjkgODEuNmMtNy43IDEwLjMtMjEuMiA5LjYtMzMuNCAwIDAgMCAxLjcgMTUuNCAxOCAxNS40IDUuMyAwIDguOS0xLjYgMTEuNC0zLjggNS4yLTQuNiA0LTExLjYgNC0xMS42eiIgb3BhY2l0eT0iLjYiIGZpbGw9IiMwMTAxMDEiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA5Ij48cGF0aCBkPSJNODUuMiA5NGgyMS4ycy0uNiAxMS0xMC44IDExYy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zLTMuMy04LjMtMy4zLTguM3oiIGZpbGw9IiM2MDM4MTMiLz48cGF0aCBkPSJNMTAzLjUgMTAxLjNhMTAgMTAgMCAwMS03LjkgMy41Yy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zIDE3LjctNCAxNS0uOHoiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNODIuMiA4Mi40cy0xMC00LjktOC41LTExLjQgMTAuMS0uNyA5LjUtLjkgNi4yLTUuNCA4LjUuOGMxLjcgNi4xLTcuOSAxMi41LTkuNSAxMS41ek0xMDcgODIuNHMtOC41LTQuOS03LjItMTEuNGMxLjItNi41IDguNi0uNyA4LS45LS40LS4yIDUuNC01LjQgNy4zLjggMS41IDYuMS02LjcgMTIuNS04IDExLjV6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik04Mi4yIDgyLjRzLTEwLTQuOS04LjUtMTEuNCAxMC0uNiA5LjUtLjljLTcuMi00LTcuNSA4LjYtMSAxMi4zek0xMDcgODIuNHMtOC42LTQuOS03LjMtMTEuNGMxLjMtNi41IDguNS0uNiA4LS45LTYtNC02LjMgOC42LS44IDEyLjN6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTAiPjxwYXRoIGQ9Ik05Ny42IDgyLjRjNC44LjIgOC41IDQuMyA4LjMgOS4xbC0uMSAzLjNhOC43IDguNyAwIDAxLTkuMSA4LjNIOTZhOCA4IDAgMDEtNy42LTguNGwuMi00YTguNiA4LjYgMCAwMTktOC4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNOTIuNiA2M2ExIDEgMCAwMC0uOS41TDgyLjEgODBhMSAxIDAgMTAxLjcgMWw5LjctMTYuNmExIDEgMCAwMC0uOS0xLjV6bS0xMSAuNGExIDEgMCAwMC0uOCAxLjZsMTEuNCAxNS44YTEgMSAwIDEwMS42LTEuMkw4Mi40IDYzLjhhMSAxIDAgMDAtLjgtLjR6TTExMi4yIDYzLjdhMSAxIDAgMDAtLjguNGwtMTAgMTUuNGExIDEgMCAxMDEuNiAxbDEwLTE1LjNhMSAxIDAgMDAtLjgtMS41em0tOS41LS45YTEgMSAwIDAwLTEgMS40bDguMyAxN2ExIDEgMCAxMDEuOC0uOGwtOC4yLTE3YTEgMSAwIDAwLS45LS42eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTEiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik03Ny4yIDcwLjljMS01LjYgOS4xLTUuNiA5LjgtLjJNMTAzLjUgNzAuN2MuOS01LjIgOC41LTUuMiA5LjEtLjIiLz48L2c+PHBhdGggZD0iTTg1LjIgOTFoMjEuMnMtLjYgMTEtMTAuOCAxMWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMy0zLjMtOC4zLTMuMy04LjN6IiBmaWxsPSIjNjAzODEzIi8+PHBhdGggZD0iTTEwMy41IDk4LjNhMTAgMTAgMCAwMS03LjkgMy41Yy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zIDE3LjctNCAxNS0uOHoiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNOTggODQuOWMxLjEtNi42LTMuMy0xMi4xLTEzLjItOS45LTcuOCAyLTQuNCA5LjktOC44IDEzLjJzLTExIDMuMy0xMSAzLjMgMjcuNSA5LjkgMzMtNi42eiIgZmlsbD0iIzRkMzExOCIvPjxwYXRoIGQ9Ik05Ny4yIDg0LjdjLTEtNi40IDMtMTEuOCAxMi05LjcgNi44IDEgNCA5LjcgOCAxMi45czEwIDMuMiAxMCAzLjItMjUgOS43LTMwLTYuNHoiIGZpbGw9IiM0ZDMxMTgiLz48ZyBvcGFjaXR5PSIuMTUiPjxwYXRoIGQ9Ik05OCA4NC43YzEtNi40LTMtMTEuOC0xMi05LjcgMTMuMiA0IDIuMiAyMS0xOCAxNi4xIDAgMCAyNSA5LjcgMzAtNi40ek0xMDIuOCA3NS4xUzEwOCA3NSAxMDkgNzhzMCA2IDEgOCA3LjggNy44IDE2LjQgNS40YzAgMC05LjMgMS4yLTExLjMtNy4xcy0zLjUtMTAuMi0xMi4zLTkuMnoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xMiI+PHBhdGggZD0iTTEwNC43IDEwMS4xYy0yLjggMy4yLTYuOSA1LTExLjEgNWgtLjRjLTQuMyAwLTguMy0xLjgtMTEuMS01LTMtMy4zLTQuOS04LjYtNC45LTExIDAtMi4xIDMuNS42IDEyLjMgMS4zbDMuNy4xaC41YzcuOSAwIDEyLjgtMi41IDEzLjctMyAuOS0uNSAyLjQtLjcgMi40IDEuNnMtMi4xIDcuNy01LjEgMTF6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0zLjEgODIuOCA3NS44KSIgY3g9IjgyLjgiIGN5PSI3NS44IiByeD0iNi4yIiByeT0iOC42IiBmaWxsPSIjZmZmIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTMuMSAxMDUuOCA3NS45KSIgY3g9IjEwNS44IiBjeT0iNzUuOSIgcng9IjYuMiIgcnk9IjguNiIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIGN4PSI4Mi45IiBjeT0iNzYuMyIgcng9IjMuNyIgcnk9IjQuNCIvPjxlbGxpcHNlIGN4PSIxMDUuOSIgY3k9Ijc2LjMiIHJ4PSIzLjciIHJ5PSI0LjQiLz48Y2lyY2xlIGN4PSI4MC41IiBjeT0iNzMuOSIgcj0iMiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjEwMy41IiBjeT0iNzMuOSIgcj0iMiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03Ny43IDY3LjNjMy41LTQuMSA3LTQgMTAuNCAwIDAgMC00LjgtOS42LTEwLjQgMHpNMTAwLjcgNjcuM2MzLjUtNC4xIDctNCAxMC40IDAgMCAwLTQuOC05LjYtMTAuNCAweiIvPjxwYXRoIGQ9Ik02OC4zIDY3djRsMiAuMmMuOC4zIDEuMyAxIDEuNCAxLjh2NS40cy45IDkgMTAuOCA4LjVTOTIuNyA3NyA5Mi43IDc3czAtNi41IDIuMi02LjUgMi4zIDYuNSAyLjMgNi41LjQgOS45IDEwLjMgOS45IDEwLjMtOC41IDEwLjMtOC41di01LjhjMC0uNy42LTEuMyAxLjMtMS4zaDEuOXYtNGwtMjEuOC0uMWMtLjguMi0xLjQuNi0yIDEuMmwtMi4xIDItMi4yLTIuMWEzLjQgMy40IDAgMDAtMi43LTFMNjguMyA2N3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNOTAuMSA5Ni41bC0uMi00LjNjMy4zLjQgNi43LjMgMTAtLjRsLjIgNC4yYy4xLjUtLjIuNy0uNy45bC00IC4yLS40LTMuNC0uMyAzLjMtMy45LjJjLS41LS4xLS43LS4zLS43LS43eiIgZmlsbD0iI2ZmZiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTMiPjxwYXRoIGQ9Ik0xMDkgOTguNGEyMS4xIDIxLjEgMCAwMS0xMi45IDQuMWgtLjVhMjEuMiAyMS4yIDAgMDEtMTIuOS00LjFjLTMuNS0yLjgtNS43LTctNS43LTlzNy4yIDEuMSAyMC42IDEuMWgtMS41YzkuMSAwIDE0LjgtMiAxNS44LTIuNCAxLS40IDIuNy0uNiAyLjcgMS4zIDAgMS44LTIgNi4yLTUuNiA5eiIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxlbGxpcHNlIGN4PSI5Ny4zIiBjeT0iNzIuNyIgcng9IjcuNyIgcnk9IjEwLjgiIHRyYW5zZm9ybT0icm90YXRlKC0zLjIgOTcuNCA3Mi43KSIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIGN4PSI5Ny40IiBjeT0iNzQuNSIgcng9IjQuNiIgcnk9IjUuNSIvPjxjaXJjbGUgY3g9Ijk0LjUiIGN5PSI3MS41IiByPSIyLjUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTEgNjJjNC40LTUuMSA4LjctNSAxMyAwIDAgMC02LTEyLTEzIDB6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNCI+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik04NCA2M2MtMi0xLTUtMi05IDNzLTggMTMtNSAxOSAxMSAzIDEyLTEgMC02IDMtOSA0LTktMS0xMnpNMTAzLjIgNjIuOGMxLjktLjkgNC43LTEuOSA4LjQgMi44czcuNCAxMi4xIDQuNyAxNy43LTEwLjMgMi43LTExLjItMSAwLTUuNi0yLjgtOC40LTMuNy04LjMuOS0xMS4xeiIvPjwvZz48cGF0aCBkPSJNOTggODMuMTFjLTMuNy0uMDYtNyAuODktNyAuODktMS41LjMtMiAxLTEgMiAwIDAgNC43NCAzLjE2IDYuNSAzLjg2YTU4LjQ1IDU4LjQ1IDAgMDEtLjE3IDMuNjhjLS4xMSAxLjM3LS4zIDIuNzMtLjU3IDMuNjktLjE0LjQ4LS4zLjc4LS40IDEuMDEtLjIzLjQ5LS4zOC42MS0uMzguNjEtLjM4LjA0LS40Ny4wMy0uNDcuMDMtMS41LS4wNi0yLjg4LS4zMy00LjEtLjczYTE2LjM3IDE2LjM3IDAgMDEtNi41NC0zLjk5LjUuNSAwIDEwLS43NC42OHMyLjU4IDIuODQgNi45NyA0LjI2YzQuMzggMS40MiAxMC42IDEuMzggMTcuNy00LjIuNTgtLjQxLS4wOC0xLjI2LS42LS44LTQuMTMgMy4yNS03Ljg1IDQuNTItMTEuMDYgNC43NS4yNS0uMzYuNDMtLjgyLjU4LTEuMzUuMy0xLjA4LjQ5LTIuNDguNi0zLjg4LjExLTEuMzcuMTYtMi43My4xOC0zLjc3Qzk5LjEgODkuMTMgMTAzIDg2IDEwMyA4NmMxLS45IDEuMi0xLjYgMC0yYTE0LjIxIDE0LjIxIDAgMDAtNS0uODl6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNSI+PHBhdGggZD0iTTk0IDcxYy03LjQuNS04LjkgNC44LTguOSA0LjhhMjEgMjEgMCAwMC0yLjQgOS4yYzAgNC4zLS44IDQgNC41IDUuMiAwIDAtMSAxMSA5LjMgMTAuM3YzLjdjMCAxMC42IDYuNCAzLjQgNi40IDMuNHM3LjktMy45IDkuOS0xNi40UzEwMi45IDcxIDk0IDcxem0uMSAyMS4ybC0uMy0uMi4zLjJ6bS0uMy0uMWwtMi42LS45Yy45LjIgMS44LjUgMi42Ljl6bS44LjRjMS4yLjggMS43IDEuOSAxLjkgMy44YTYgNiAwIDAwLTEuOS0zLjh6IiBvcGFjaXR5PSIuMiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0xNC43IDEwNi45IDcyLjMpIiBjeD0iMTA2LjgiIGN5PSI3Mi4zIiByeD0iMy42IiByeT0iNS4xIiBmaWxsPSIjNDIyMTBiIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTgxLjYgODMuNyA3Mi40KSIgY3g9IjgzLjciIGN5PSI3Mi40IiByeD0iNS43IiByeT0iNCIgZmlsbD0iIzQyMjEwYiIvPjxwYXRoIGQ9Ik05NC45IDcyYy02LjcuNC04IDQuNC04IDQuNGExOS4xIDE5LjEgMCAwMC0yLjIgOC40YzAgMy45LS43IDMuNyA0LjEgNC44IDAgMC0uOSAxMC4xIDguNCA5LjZ2My40YzAgOS44IDUuOCAzLjEgNS44IDMuMXM3LjEtMy42IDguOS0xNS4xLTktMTguNi0xNy0xOC42em0uMSAxOS42bC0uMy0uMi4zLjJ6bS0uMy0uMWwtMi4zLS44Yy44LjEgMS42LjQgMi4zLjh6bS43LjRjMS4xLjggMS41IDEuOCAxLjcgMy41YTUuMSA1LjEgMCAwMC0xLjctMy41eiIgZmlsbD0iI2ZiZGIzMSIvPjxwYXRoIGQ9Ik04OC44IDg5LjdzLS45IDEwLjEgOC40IDkuNmMwIDAgLjgtNi41LTIuNC03LjhzLTYtMi02LTEuOHoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTg2LjkgNzYuNHMxLjMtNCA4LTQuNGM4IDAgMTguNyA3LjEgMTYuOSAxOC43cy04LjkgMTUuMS04LjkgMTUuMWM4LjktMTYgNS4yLTMwLjUtMTYtMjkuNHoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik05MC4zIDc5LjFjLS43IDEuNC0xLjIgMi45LTEuNiA0LjQgMCAuOSAzLjItNS4zIDEuNi00LjR6bTEuMyAwYTE0IDE0IDAgMDAtLjkgMi45Yy4xLjUgMi4yLTMuNy45LTIuOXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzE2Ij48ZyBvcGFjaXR5PSIuMyI+PGVsbGlwc2UgY3g9IjEwMC41IiBjeT0iODYuNSIgcng9IjE0LjUiIHJ5PSIxMS43IiBmaWxsPSIjZmNmY2ZjIi8+PHBhdGggZD0iTTEwMC41IDk4LjJjLTggMC0xNC41LTUuMi0xNC41LTExLjdzNi41LTExLjcgMTQuNS0xMS43UzExNSA4MCAxMTUgODYuNWMwLTcuMy03LjQtMTMuMy0xNi41LTEzLjNTODIgNzkuMiA4MiA4Ni41czcuNCAxMy4zIDE2LjUgMTMuMyAxNi41LTYgMTYuNS0xMy4zYzAgNi41LTYuNSAxMS43LTE0LjUgMTEuN3oiLz48L2c+PGcgZmlsbD0iIzIxMTMwOSI+PGVsbGlwc2UgY3g9Ijk2IiBjeT0iODYuNSIgcng9IjMiIHJ5PSI1LjUiLz48ZWxsaXBzZSBjeD0iMTA3IiBjeT0iODYuNSIgcng9IjMiIHJ5PSI1LjUiLz48L2c+PGcgZmlsbD0iIzQyMjEwYiI+PHBhdGggZD0iTTk5IDg2LjVjMCAzLTEuMyA1LjUtMyA1LjUtLjUgMC0xLjEtLjItMS40LS42Qzk4IDkxIDk4IDgyIDk0LjMgODJjLjQtLjYgMS0uOSAxLjctMSAxLjcgMCAzIDIuNSAzIDUuNXpNMTEwIDg2LjVjMCAzLTEuMyA1LjUtMyA1LjUtLjUgMC0xLjEtLjItMS40LS42IDMuNC0uNCAzLjQtOS40LS4zLTkuNC40LS42IDEtLjkgMS43LTEgMS43IDAgMyAyLjUgMyA1LjV6Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTExLjUgMTA5LjggNjkpIiBjeD0iMTA5LjgiIGN5PSI2OSIgcng9IjMuNiIgcnk9IjUuMSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC03OC41IDg2LjcgNjcuNykiIGN4PSI4Ni43IiBjeT0iNjcuNyIgcng9IjUuNyIgcnk9IjQiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNyI+PHBhdGggZD0iTTExNy4yIDY2UzgxLjQgNTQuNSA0NCA2My41IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMDEuNSA2My40cy41IDE5LjYgNyAyMC42YzQuNSAxLjEgNi41LTEuNyA3LTQuNnMuNC0xMS40LTEuOC0xNC4zTDEwMSA2MmwuNSAxLjR6IiBmaWxsPSIjMDEwMTAxIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTMuMSA4NS4zIDcyLjcpIiBjeD0iODUuMyIgY3k9IjcyLjciIHJ4PSI3LjciIHJ5PSIxMC44IiBmaWxsPSIjZmZmIi8+PGVsbGlwc2UgY3g9Ijg1LjQiIGN5PSI3NC41IiByeD0iNC42IiByeT0iNS41Ii8+PGNpcmNsZSBjeD0iODIuNSIgY3k9IjcxLjUiIHI9IjIuNSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03OSA2Mi40YzMuNi0yLjYgMTEuNSAxLjYgMTcgMi42IDAgMC0xMC45LTcuMi0xMi44LTguMlM3OSA2Mi40IDc5IDYyLjR6Ii8+PHBhdGggZD0iTTEwNi45IDkwLjhjLTIuNy0zLTYuNi00LjgtMTAuNi00LjhoLS40Yy0xMC42IDEuMS0xOC4xIDEwLjQtMTUuMyAxNS4zIDIuNSA1LjUgMTkuOS04LjMgMjcuOC42IDIuMyAxLjMgMy43LTEgMy4yLTMuNC0uNC0yLjItMS44LTQuNS00LjctNy43eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNODAuOCA5NS42cy0xLjggMy40LS4zIDUuN2MyLjUgNS41IDE5LjktOC4zIDI3LjguNi40LTIuOS41LTUuOS40LTguOC4xLS4xLTI3LjkgMy4zLTI3LjkgMi41eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04MC44IDk1LjZzLTEuOCAzLjQtLjMgNS43YzIuNSA1LjUgMTkuOS04LjMgMjcuOC42LjQtMi45LjUtNS45LjQtOC44LjEtLjEtMjcuOSAzLjMtMjcuOSAyLjV6IiBmaWxsPSIjZmZmIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xOCI+PHBhdGggZD0iTTc3IDgxczAtMTIgNi0xMiA2IDExLjYgNiAxMS42Uzg0IDY5IDc3IDgxem0yNC0uNXMwLTExIDUuNS0xMSA1LjUgMTAuNiA1LjUgMTAuNi00LjYtMTAuNi0xMSAuNHoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ii8+PHBhdGggZD0iTTc1IDg1LjRoMzguM3MtMS4xIDIzLjEtMTkuNCAyMy4xYy01IC4yLTkuNy0xLjktMTIuOS01LjgtNS44LTYuOC02LTE3LjMtNi0xNy4zeiIgZmlsbD0iIzYwMzgxMyIvPjxwYXRoIGQ9Ik0xMDguMSAxMDAuOGExNi41IDE2LjUgMCAwMS0xNC4yIDcuM2MtNSAuMi05LjctMS45LTEyLjktNS44LTUuOC02LjggMzEuOS04LjMgMjcuMS0xLjV6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTc1IDg1aDM4LjNjLS4xIDIuNS0uNSA1LTEuMyA3LjMgMCAwLTIyLjUgNC4yLTM1LjktLjNhMzMgMzMgMCAwMS0xLjEtN3oiIGZpbGw9IiNmZmYiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzE5Ij48cGF0aCBkPSJNNzQuNCA4M2MxMy41IDIgMjYuNCAyLjUgMzguMiAwIDAgMC0xLjEgMjMtMTkuNCAyMy00LjkuMi05LjYtMi0xMi44LTUuNy01LjctNi44LTYtMTcuMy02LTE3LjN6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik0xMDcuNCA5OC40YTE2LjcgMTYuNyAwIDAxLTE0LjIgNy4zYy00LjkuMi05LjYtMi0xMi44LTUuNy01LjctNi45IDMxLjgtOC40IDI3LTEuNnoiIGZpbGw9IiNmMTVhMjQiLz48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTkzLjQgNjcuOGMtLjItLjQtLjYtLjYtMS0uNmwtNy45LjItNC44LTYuOWMtLjQtLjUtMS0uNi0xLjUtLjJsLS40LjUtMi4xIDguMS03LjUgMi41YTEgMSAwIDAwLS43LjljLS4xLjQuMS44LjUgMS4xbDYuNiA0LjguMSA4LjRjMCAuNC4yLjguNiAxIC40LjIuOC4xIDEuMS0uMWw2LjItNS4xIDcuNiAyLjdoLjVsLjYtLjNjLjMtLjMuNC0uOC4yLTEuMmwtMi44LThjLjEuMSA0LjktNy40IDQuNy03Ljh6TTEyMS41IDcxLjlhMSAxIDAgMDAtLjgtLjhsLTcuNi0xLjktMi43LTcuNGMtLjItLjUtLjktLjgtMS40LS41bC0uNC40LTQuMiA2LjctNy44LjRjLS40IDAtLjguMy0uOS42LS4yLjQtLjEuOC4yIDEuMWw1IDYuMS0yLjEgNy43Yy0uMS40IDAgLjguMyAxLjEuMy4zLjcuNCAxLjEuMmw3LjMtM0wxMTQgODdsLjUuMi42LS4xYy4zLS4yLjUtLjYuNS0xbC0uNS03LjljLS4xLS4zIDYuNS01LjkgNi40LTYuM3oiLz48L2c+PGcgZmlsbD0iI2YzZmYwMCI+PHBhdGggZD0iTTkyLjMgNjguNmExIDEgMCAwMC0uOS0uNWwtNy4xLjItNC4yLTUuOWMtLjQtLjQtMS0uNS0xLjQtLjFsLS4zLjQtMiA3LTYuOCAyLjNjLS4zLjEtLjYuNC0uNy44IDAgLjQuMS43LjQuOWw1LjkgNC4xVjg1YzAgLjQuMi43LjYuOS4zLjEuNy4xIDEtLjFsNS43LTQuNCA2LjggMi4yYy40LjEuNyAwIDEtLjIuMi0uMy4zLS43LjItMWwtMi40LTYuOXM0LjQtNi42IDQuMi02Ljl6TTExOC45IDcyLjRjLS4xLS4zLS4zLS42LS42LS43bC02LjItMS42LTIuMi02LjFjLS4yLS41LS43LS43LTEuMi0uNWwtLjQuMy0zLjQgNS41LTYuNC4zYy0uNSAwLS45LjQtLjguOWwuMi41IDQuMSA1LTEuNyA2LjNjLS4xLjMgMCAuNy4zLjkuMi4yLjYuMy45LjJsNi0yLjQgNS4zIDMuNi40LjEuNS0uMWMuMy0uMi41LS41LjQtLjhsLS40LTYuNWMtLjEgMCA1LjMtNC42IDUuMi00Ljl6Ii8+PC9nPjxnIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNODQgNjguM2wtNC01LjlhMSAxIDAgMDAtMS4zLS4yYy0uMi4xLS4zLjMtLjMuNWwzLjcgNi4zIDEuOS0uN3pNOTAuNyA2OC44bC00LjQgNS44LjEuMi0uMSAxLjEgMi40IDYuN2MuMi41LjcuNyAxLjIuNWwuNC0uNC0yLTcuMWgtLjRsMy43LTUuNmMuMi0uNC4xLTEtLjQtMS4yaC0uNXpNMTExLjggNzAuMWwtMi4xLTYuMWMtLjItLjQtLjYtLjYtMS0uNWwtLjQuMyAxLjcgNi40IDEuOC0uMXpNMTE3LjQgNzIuMWwtNS4zIDR2LjJsLS40LjkuNCA2LjRjMCAuNC40LjguOS43bC41LS4ydi02LjZsLS4zLS4xIDQuNi00Yy4zLS4zLjMtLjggMC0xLjFsLS40LS4yeiIvPjwvZz48ZyBvcGFjaXR5PSIuMDUiPjxwYXRoIGQ9Ik04MS42IDc5LjJsLTUuMiA0LjlhMSAxIDAgMDAwIDEuM2wuNS4yIDUuNi00LjctLjktMS43ek0xMDcgNzguOWwtNS43IDNjLS40LjItLjUuNy0uMyAxLjEuMS4yLjIuMy40LjNsNi0yLjctLjQtMS43eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzIwIj48cGF0aCBkPSJNODcuMiA5NGgyMS4ycy0uNiAxMS0xMC44IDExYy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zLTMuMy04LjMtMy4zLTguM3oiIGZpbGw9IiM2MDM4MTMiLz48cGF0aCBkPSJNMTA1LjUgMTAxLjNhMTAgMTAgMCAwMS03LjkgMy41Yy0yLjYuMS01LjItLjktNy4xLTIuNy0zLjItMy4zIDE3LjctNCAxNS0uOHoiIGZpbGw9IiNmMTVhMjQiLz48cGF0aCBkPSJNNzEuMyA2OGgtMS44djRoMS44YzEgLjMgMS44IDEuMiAxLjggMi4yVjgwcy0uMyA4LjEgMTEuOCA3LjljMCAwLTguNi4yLTEwLTguM3YtNS40YzAtLjgtLjYtMS41LTEuMy0xLjhsLTEuOS0uNC0uNC00eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNNzEuMyA2OHY0bDIgLjJjLjguMyAxLjMgMSAxLjQgMS44djUuNHMuOSA5IDEwLjggOC41Uzk1LjcgNzggOTUuNyA3OHMwLTQuNSAyLjItNC41IDIuMyA0LjUgMi4zIDQuNS40IDkuOSAxMC4zIDkuOSAxMC4zLTguNSAxMC4zLTguNXYtNS44YzAtLjcuNi0xLjMgMS4zLTEuM2gxLjl2LTRsLTIxLjgtLjFjLS44LjItMS40LjYtMiAxLjJsLTIuMSAyLTIuMi0yLjFhMy40IDMuNCAwIDAwLTIuNy0xTDcxLjMgNjh6IiBvcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNNzEuMyA2OHY0bDIgLjJjLjguMyAxLjMgMSAxLjQgMS44djUuNHMuOSA5IDEwLjggOC41Uzk1LjcgNzggOTUuNyA3OHMwLTQuNSAyLjItNC41IDIuMyA0LjUgMi4zIDQuNS40IDkuOSAxMC4zIDkuOSAxMC4zLTguNSAxMC4zLTguNXYtNS44YzAtLjcuNi0xLjMgMS4zLTEuM2gxLjl2LTRsLTIxLjgtLjFjLS44LjItMS40LjYtMiAxLjJsLTIuMSAyLTIuMi0yLjFhMy40IDMuNCAwIDAwLTIuNy0xTDcxLjMgNjh6IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMjEiPjxwYXRoIGQ9Ik03OSA4OC41Yy0uMy0uMS02LjQgNC4yLTguMyA2LjJzLjQgNy44IDguMyA0YzMuMi0xLjIgNy4xLTQuNyA3LjEtNC43cy00LjgtMi40LTcuMS01LjV6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTgxLjEgOTIuN2MtMiAxLjgtNC4yIDMuNS02LjYgNC44LTIuOSAxLjQtMi4xIDIuMiAwIDIuMXM1LjUtLjggOS43LTQuMmwxLjktMS40LTQtMi4yLTEgLjl6IiBmaWxsPSIjZTg0NzE1Ii8+PHBhdGggZD0iTTc2LjEgODMuM2MtLjUtMi42IDMuMyAxMy40IDE4LjQgMTIuNyAxNi0uOCAxNi41LTEzLjYgMTYuNS0xMy42IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MjIxMGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik03NyA3NXMwLTEyIDYtMTIgNiAxMS42IDYgMTEuNlM4NCA2MyA3NyA3NXpNMTAwIDc1czAtMTIgNi0xMiA2IDExLjYgNiAxMS42LTUtMTEuNi0xMiAuNHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzAxIj48cGF0aCBkPSJNOTAuNSAxMjIuNXM1IDAgNC0yYy0uNC0uOS0zLjktMi42LTMuOS0yLjZsLTIuNC4zYzIuNCAyIDMgMy40IDIuMyA0LjN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik04OSAxMjIuOHMtMS4xIDMuNiAyIDQuMmM2IDEgNyA2IDYgOC0yIDUtMTYgOC0yMi0ycy02LTExLTE2LTEyLTEyIDUtMTIgNWMwIDIgMSAxIDEgMSAyLTMuNiA1LjktNS42IDEwLTUgOSAxIDExIDMgMTIgNXM1IDExIDEyIDEzIDE0IDAgMTYtNS0zLjMtOC41LTYtOWMtLjgtLjItMS44IDAtMi0yLjh2LS4yYzAtMi0xLS4yLTEtLjJ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik04NC41IDEyMy41YzEgMiA2LTEgNi0xczUgMCA0LTJjLS40LS45LTMuOS0yLjYtMy45LTIuNmwtNC44LjZzLTEuOCAzLjktMS4zIDV6Ii8+PHBhdGggZD0iTTkwIDEyMi44cy0xLjEgMy42IDIgNC4yYzYgMSA3IDYgNiA4LTIgNS0xNiA4LTIyLTJzLTYtMTEtMTYtMTItMTIgNS0xMiA1YzAgMiAxIDEgMSAxIDItMy42IDUuOS01LjYgMTAtNSA5IDEgMTEgMyAxMiA1czUgMTEgMTIgMTMgMTQgMCAxNi01LTMuMy04LjUtNi05Yy0uOC0uMi0xLjggMC0yLTIuOHYtLjJjMC0yLTEtLjItMS0uMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODQuNSAxMjMuNWMxIDIgNC0xIDYtMXM1IDAgNC0yYy0xLjUuNS03LjUgMi41LTEwIDN6IiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wMiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTE3LjggMTI3LjNjLTUtNS45LTkuOS0yLjUtMTEuOS0uNy0xLjItMS0yLjMtMi4xLTMuMi0zLjRMOTcgMTE1YTM1LjIgMzUuMiAwIDAxLTEyLjIgNC4xbDMuNiAxMXMtNSAuNy01IDMuNCAyLjIgNi4yIDguNiAzLjQgMTIuOS0uNyAxOC42LjcgMTIuMi0uNyAxMi4yLTQuOGMwLTMuMi0xLjMtNS42LTUtNS41ek03NS41IDEyNS45bC0uOC03LjJzLTEwLTEuNC0xNi40LTUuN2MwIDAtMy40IDEyLjktNi45IDE0LjlhNCA0IDAgMDAtNS40IDEuMyAzLjkgMy45IDAgMDAzLjMgNmMuNiAwIDEuMy0uMiAxLjgtLjVhNS4zIDUuMyAwIDAwOSAuMiA1LjQgNS40IDAgMDA3LjEgMi42IDUgNSAwIDAwMi41LTIuNSA2IDYgMCAwMDguMyAyLjEgNiA2IDAgMDAyLjEtOC4zIDUuNiA1LjYgMCAwMC00LjYtMi45eiIvPjwvZz48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTEyMiAxMzEuOWMtMi42LTIuNi03LjktMy03LjktM2E5IDkgMCAwMTMuOS0uOWMyLjItLjEgNCAxLjcgNCAzLjl6TTg2LjEgMTE5LjFTOTAgMTI4IDg5IDEzMWMwIDAgMS45LTggMS0xMC4ycy0zLjktMS43LTMuOS0xLjd6TTU4LjkgMTEzLjlzLTMuMyAxMS4yLTYuMyAxM2MwIDAgNy4yLTUuNiA4LjEtOC40cy0xLjgtNC42LTEuOC00LjZ6TTc5IDEzMC45Yy0yLjYtMi42LTQuNi0zLjMtNy45IDAgMC0yLjIgMS44LTMuOSAzLjktMy45czQgMS43IDQgMy45ek02Ny42IDEzM2MtMS45LTEuOS0zLjMtMi40LTUuNyAwLS4xLTEuNiAxLjEtMi45IDIuNy0zczIuOSAxLjEgMyAyLjd2LjN6TTU4LjMgMTMxLjZjLTEuNC0xLjQtMi41LTEuOC00LjMgMGEyLjEgMi4xIDAgMDEyLjMtMmMxLjEgMCAxLjkuOSAyIDJ6TTUyLjEgMTMxLjZjLTEuMy0yLjQtMi42LTMuMi01LjUtMS42LjQtMS41IDEuOS0yLjUgMy40LTIuMSAxLjUuNCAyLjUgMS45IDIuMSAzLjR2LjN6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNODMuNCAxMzMuNWMwIDIuNyAyLjIgNi4yIDguNiAzLjRzMTIuOS0uNyAxOC42LjcgMTIuMi0uNyAxMi4yLTQuOEMxMTQgMTM4IDExMyAxMzQgOTggMTM0LjZjLTggMC0xMiA0LjQtMTQuNi0xLjF6TTcxLjUgMTM2LjFjNS4yLS40IDcuOC0xLjggNy4zLTguNGE1LjYgNS42IDAgMDEtNyA4LjZjLS4yIDAtLjItLjEtLjMtLjJ6TTYyLjYgMTM2LjVjNC4yLS4zIDYuMi0xLjUgNS44LTYuNyAxLjkgMS42IDIuMSA0LjQuNSA2LjJzLTQuNCAyLjEtNi4yLjVjMCAuMS0uMSAwLS4xIDB6TTUzLjUgMTM1LjljMy43LS4yIDUuNS0xLjMgNS4yLTUuOSAxLjcgMS40IDIgMy44LjYgNS41YTMuOSAzLjkgMCAwMS01LjUuNmwtLjMtLjJ6TTQ3LjMgMTM0YzMtLjIgNC41LTEgNC4yLTQuOCAxLjQgMS4xIDEuNiAzLjEuNSA0LjVzLTMuMSAxLjYtNC41LjVsLS4yLS4yek02OSAxMTcuNWwuOCA3LjNjLTUuMS0uNC0xMC4yLjYtMTQuNyAyLjhhNDAgNDAgMCAwMTE0LjktLjhzMi44LTEuOCA1LjYtLjlsLS45LTcuNGEyMiAyMiAwIDAxLTUuNy0xek0xMDUuOSAxMjYuNmMyLTEuOCA2LjktNS4yIDExLjkuNyAwIC4xLTguOCAyLjctMTEuOS0uN3oiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzAzIj48cGF0aCBkPSJNNTkuNSAxMTQuNGMtLjYtMS0xLjktMS4yLTIuOS0uNmgtLjFjLTEuOCAxLjItMS44IDIuOS0xLjIgMy41bDEyLjIgMTMuNCAxLjIgMTEuMXMwIDEuMiAyLjMgMS4yIDEuOC0xLjggMS44LTEuOGwtLjYtMTEuMSA4LjgtMTRjMS4yLTEuOC0xLjItNS44LTQuNy0yLjlMNzEuNiAxMjYgNzAgMTA5LjhhMyAzIDAgMDAtMi45LTEuOGMtMi4zIDAtMi4zIDIuMy0yLjMgMy41czIuOSAxNS4yIDIuOSAxNS4ybC04LjItMTIuM3pNMTE5IDEyMC4yYzAtLjYtLjUtMS4yLTEuMS0xLjJsLTExLjEgMi45LTIuMSAyYzEuNy0xLjkgMy4xLTMuOSA0LjQtNi4xIDEuMi0yLjMgMi4zLTEuOCAyLjMtMS44czIuOSAwIDMuNS0xLjgtLjYtMS44LTIuOS0yLjNjLTEuNS0uMy0zIC4xLTQuMSAxLjJsLTguOCA5LjktMy41LTUuMiAxLjgtMy41Yy0xLjggMi4zLTEyLjIgNS4yLTEyLjIgNS4ybDUuMiAxLjJjMiAxLjcgMy44IDMuNyA1LjIgNS44IDEuOCAyLjktMi4zIDE0LTIuMyAxNC0uMyAyLjUgMy43IDEuNSA0LjctMi4yLjUtMi44IDEuMi01LjUgMi04LjEgMS40LjIgOS4zIDEuMSAxMC45IDEuMS45IDAgMS43LS43IDEuOC0xLjd2LS4xbC01LjgtMy41Yy0uMS4xIDEyLjEtNC42IDEyLjEtNS44eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNNTkuNSAxMTQuNGMtLjYtLjItMS4yLS4yLTEuOCAwLTEuOCAxLjIgMS44IDUuMiAxLjggNS4ybDkuMyAxMS4xIDEuMiAxMS4xcy0uMyAxLjIgMS4yIDEuMmMyLS4zIDEuOC0xLjggMS44LTEuOGwtLjYtMTEuMSA4LjgtMTRjMS4yLTEuOC0uOS0zLjgtMy41LTEuMmwtNS44IDEyLjgtMS45LTE3LjlzMC0xLjItMi4zLTEuMi0xLjggMi45LTEuOCAyLjlsMi45IDE2LjktOS4zLTE0ek05Mi40IDExOC4ybDUuMyA3IDEuNS0yLjEtMy42LTUuMSAxLjQtMi45LTQuNiAyLjV6Ii8+PC9nPjxwYXRoIGQ9Ik05OS44IDEyNi43YzIuMy0xLjggNi42LTguMyA5LjItMTIuMSAyLjItMS42IDQuOS0yLjIgNi0uMi0uNSAxLjgtMy41IDEuOC0zLjUgMS44cy0xLjItLjYtMi4zIDEuOC01LjggOC4yLTcuNiA5LjMtMy42IDExLTMuNiAxMWMtMSAxLjktMiAzLTMuMSAzbDQuOS0xNC42eiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMTA2LjggMTIybDExLjEtMi45Yy42IDAgMS4yLjUgMS4yIDEuMSAwIDEuMi0xMi4yIDUuOC0xMi4yIDUuOGw1LjggMy41YzAgLjktLjcgMS43LTEuNyAxLjhoLS4xYy0xLjggMC0xMS4xLTEuMi0xMS4xLTEuMmwxLjItMi41IDUuOC01LjZ6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wNCI+PHBhdGggZD0iTTg2LjggMTE4LjdMMTA4IDEwOWM1LjggMTAuNyA1IDE5LjkgMCAyOC4xbC0yMS4yLTEwLjhjLjktMS4xIDEuOS01LjIgMC03LjZ6TTc5LjEgMTE3LjdsLTI2LTEyYy01LjUgOS42LTUuNSAyMS4yIDAgMzQuNmwyNi4xLTEzLjRjLTEuMi0xLjMtMy44LTUuNC0uMS05LjJ6Ii8+PHBhdGggZD0iTTc5LjEgMTE3LjdsLTI2LTEyYy01LjUgOS42LTUuNSAyMS4yIDAgMzQuNmwyNi4xLTEzLjRjLTEuMi0xLjMtMy44LTUuNC0uMS05LjJ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMTUiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNSI+PHBhdGggZD0iTTk3LjkgMTI1LjlsLTcuMS0xLjZzLTEuMi0uMS0xLjEtLjhjLjEtLjcgMS4zLS41IDEuMy0uNWw3LjIuMmMuNy4xIDEuMi44IDEuMSAxLjUtLjEuNy0uNyAxLjItMS40IDEuMnpNOTguMiAxMjBsLTcuMSAxLjRzLTEuMS40LTEuMy0uM2MtLjItLjcgMS0xIDEtMWw2LjgtMi43YTEgMSAwIDAxMS40Ljl2LjFjLjMuNy0uMSAxLjMtLjggMS42ek02Ni44IDEyN2w5LjEtMi4yczEuNi0uMiAxLjUtMWMtLjItLjYtMS44LS4zLTEuOC0uM2wtOS4zLjljLS44IDAtMS40LjgtMS4zIDEuNi4yLjggMSAxLjIgMS44IDF6TTY2LjMgMTIwbDkuMyAxLjVzMS41LjQgMS43LS4zYy4yLS43LTEuMy0xLTEuMy0xbC04LjktMi43Yy0uOC0uMi0xLjYuMi0xLjkgMS0uMi43LjMgMS40IDEuMSAxLjZ6Ii8+PC9nPjxjaXJjbGUgY3g9IjgzLjkiIGN5PSIxMjIuMSIgcj0iNi43Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzA1Ij48cGF0aCBkPSJNOTUuOCAxMTUuNWExNiAxNiAwIDAwMi43IDIuNWMuNCAwIDEuMy0yLjQgMi4xLTUgMi43LTEuOCAyLjItMS40IDQuNy0zLjUgMy4xIDYuNSA4LjYgMTkuNSA4LjYgMTkuNWwtMS45IDEwdi05cy03LjctMTctOC43LTE3Yy0xIDAtMi45IDExLTMuOSAxMS0uNSAwLTcuMy03LjItNy4zLTcuMnpNNTUuOSAxMTAuNnMtMy42IDMuNC00IDMuNGMtMS4xIDAtNC40LTEyLTUuNS0xMnMtMTIuMSAyMy0xMi4xIDIzbDIuMiAxMHYtOXM4LjgtMTcgOS45LTE3IDMuMyAxMSA0LjQgMTFjLjUgMCA4LjMtNy4xIDguMy03LjFsLTMuMi0yLjN6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik01NS45IDExMC42cy0zLjYgMy40LTQgMy40Yy0xLjEgMC00LjQtMTItNS41LTEycy0xMi4xIDIzLTEyLjEgMjNsMi4yIDEwdi05czguOC0xNyA5LjktMTcgMy4zIDExIDQuNCAxMWMuNSAwIDguMy03LjEgOC4zLTcuMWwtMy4yLTIuM3pNOTUuOCAxMTUuNWExNiAxNiAwIDAwMi43IDIuNWMuNCAwIDEuMy0yLjMgMi4xLTUgMi42LTEuNyAyLjMtMS41IDQuNy0zLjUgMy4xIDYuNSA4LjYgMTkuNSA4LjYgMTkuNWwtMS45IDEwdi05cy03LjctMTctOC43LTE3Yy0xIDAtMi45IDExLTMuOSAxMS0uNSAwLTcuMy03LjItNy4zLTcuMnoiLz48L2c+PHBhdGggZD0iTTcwIDEwNy4xcy05IDEyLjMtMTAgMTIuMy00LTEzLjQtNS0xMy40LTExIDI1LjgtMTEgMjUuOGwyIDExLjJ2LTEwLjFzOC0xOS4xIDktMTkuMSAzIDEyLjMgNCAxMi4zIDE1LTE2LjggMTUtMTYuOCAwLTMuMy00LTIuMnoiLz48cGF0aCBkPSJNNjAgMTIyLjRjLTEgMC00LTEyLjQtNS0xMi40cy0xMCAyMS44LTEwIDIxLjhsMSAxMS4ydi0xMC4xczgtMTkuMSA5LTE5LjEgMyAxMi4zIDQgMTIuMyAxNS0xNi44IDE1LTE2LjhjMC0uOS0uNS0xLjgtMS4zLTIuMi0uNi0uMy0xMS43IDE1LjMtMTIuNyAxNS4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNOTYgMTA3LjJzOSAxMi4zIDEwIDEyLjMgNC0xMy41IDUtMTMuNSAxMSAyNS44IDExIDI1LjhsLTIgMTEuMnYtMTAuMXMtOC0xOS4xLTktMTkuMS0zIDEyLjMtNCAxMi4zLTE1LTE2LjgtMTUtMTYuOCAwLTMuMiA0LTIuMXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMDYiPjxwYXRoIGQ9Ik02MSAxMTQuN2E2My4zIDYzLjMgMCAwMDI2LjYgMTZjLTcgMi41LTggNi41LTkuNiAxMi4zIDAgMCAxNS40LTMuMyAxNy03LjcgMCAwIDYgNi44IDE4IDUuOC0yLjItNS44LTktMTIuMi0xOC0xMy41LTIuNyAwLTQuMi02LjggMy0xMi42LTIyIDguNy0zNy0uMy0zNy0uM3oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik04Ny42IDEzMC43Yy02LjYgMi4xLTguMyA2LjctOS42IDEyLjMgMCAwIDE1LjQtMy4zIDE3LTcuNyAwIDAgNiA2LjggMTggNS44LTIuMi01LjgtOS0xMi4yLTE4LTEzLjUgMCAuNC0uNiAxLS42IDIuMi0xLjYtLjMtNC4zLjEtNi44IDF6Ii8+PHBhdGggZD0iTTkxIDEyOC41czE0IDQuOCAyMiAxMi42Yy0yLjItNS44LTktMTIuMi0xOC0xMy41LTIuNyAwLTQuMi02LjggMy0xMi42YTUyIDUyIDAgMDEtOC41IDIuNmMtMi41IDggMS41IDEwLjkgMS41IDEwLjl6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wNyI+PHBhdGggZD0iTTg1LjIgMTIwLjVjLS42IDUuMyAwIDEwLjYgMS44IDE1LjUgMyA4IDIgNiAyIDYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNmMjkwNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNODggMTM4cy02LjQtMTkuMSAxMi44LTE5LjZTMTI5IDk5IDEyOSA5OWEzNC40IDM0LjQgMCAwMS0xMCAyOWMtNyA4LTIzLTQtMzEgMTB6TTg0LjcgMTMwLjRzLTMuMy04LjgtMTcuOS0xMC0yOS4yIDEuMi0zMi41LTE0LjRjLTEgOC4yIDEuNCAxNi41IDYuOCAyMi44IDkgMTAuOCAzMS40IDMuNiAzMS40IDMuNnM5LTMuNiAxNC42IDMuNmwtMi40LTUuNnoiLz48ZyBvcGFjaXR5PSIuMjUiIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik04OCAxMzhjLTEtMTcgMzYtOCA0MS0zOWEzNC40IDM0LjQgMCAwMS0xMCAyOWMtNyA4LTIzLTQtMzEgMTB6TTM0LjIgMTA2UzMzIDEyMCA0MSAxMjguOGM5IDEwLjIgMzEuNCAzLjYgMzEuNCAzLjYgMS40LTIuNCAxNS42LS4zIDE0LjYgMy42IDAtMTMuNy00OC0zLjktNTIuOC0zMHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzA4Ij48cGF0aCBmaWxsPSIjZmQ5NzI3IiBkPSJNMTAxLjYyIDEyNy44Yy42My02LjktLjc1LTguODgtLjc1LTguODhzLTEuNjItMTAuMjQtNi40NC0xMi44M2MtMy4xMy0xLjc4LTUuNjctMS44My03LjkzLTEuMTEtMi4xMy4wMi00LjE4LjY3LTYuMDIgMS44Ny0uMTEuMDgtLjMzLjE0LS40NS4yMmEzNC4xIDM0LjEgMCAwMS0xMy4xOC0yLjk3IDE1LjYgMTUuNiAwIDAwLTkuOTUtMS4xNmMtNC43LjE3LTEwLjA0IDIuNzctMTEuMTMgMTIuODQtMS44NCAxNi41MyA2LjU1IDI0LjEzIDYuNTUgMjQuMTMgMy43NSA0LjAyIDEwLjY2IDYuODggMTYuMjIgNS4zMyAyLjQzLjAzIDQuNzMtLjg4IDYuNjItMi4zNyAwIDAgNC4xMy02LjA3IDEwLjAyLTcuNzZsLjMxLS4wNGMyLjcxLjE4IDUuNDguMDYgOC4xMS0uNDggNC41MS0uMjEgNy41Mi0xLjcgOC4wMi02Ljh6Ii8+PHBhdGggZD0iTTY5LjQzIDE0My42N2E5LjY2IDkuNjYgMCAwMS0zLjggMS45N2MuOTItLjA0IDEuODUtLjE4IDIuNzEtLjQzIDIuNDQuMDIgNC43My0uODkgNi42Mi0yLjM4IDAgMCA0LjA0LTYuMDggMTAuMDItNy43NS0uOTIuMDMtMS44Ni4xNy0yLjgxLjQtNy4zNC4xMi0xMi43NCA4LjItMTIuNzQgOC4yem0zMi4xOS0xNS44OGMuNjMtNi45LS43NS04Ljg3LS43NS04Ljg3cy0xLjYyLTEwLjI1LTYuNDQtMTIuODRjLTMuMTQtMS43Ny01LjY3LTEuODItNy45My0xLjEtLjkyLjAzLTEuODYuMTctMi43Mi40MiAxLjgxLjEyIDMuNTUuNjQgNS4xMiAxLjUyIDQuODIgMi42IDYuNDQgMTIuODQgNi40NCAxMi44NHMxLjM3IDEuOTcuNzUgOC44N2MtLjQgMy45OS0yLjMzIDUuNjgtNS4zMiA2LjQ2LjkyLS4wMyAxLjg2LS4xNyAyLjgyLS40IDQuNTItLjMyIDcuNTMtMS44MSA4LjAzLTYuOXptLTM0Ljg3LTIzLjdhMTUuNiAxNS42IDAgMDAtOS45NS0xLjE3Yy0uOTIuMDQtMS44Ni4xNy0yLjgyLjQgMi40NS0uMDYgNSAuNSA3LjE0IDEuNTkgMy4wNSAxLjY2IDEyLjMgMy45MiAxNiAyLjU1IDEuMS4xIDIuMjUtLjEgMy4yNi0uNjMtLjEyLjA4LS4zMy4xNC0uNDUuMjJhMzQuMSAzNC4xIDAgMDEtMTMuMTgtMi45NnoiIG9wYWNpdHk9Ii44Ii8+PGNpcmNsZSBmaWxsPSIjMzMyMjFmIiB0cmFuc2Zvcm09InJvdGF0ZSgxMC4xMykiIHI9IjUuNyIgY3k9IjEwNS4xMiIgY3g9IjEwMC42MyIvPjxwYXRoIGZpbGw9IiM1NDM5MzMiIGQ9Ik0xMTMuMDIgMTE0LjA4bC0yOC4xOCAzLjY2YTUuNyA1LjcgMCAwMTEuMDggNC40NSA1LjcgNS43IDAgMDEtLjQ2IDEuNGwyOC4zNC0zLjY4Yy40MS0uMDMuNy0uNDguNjctLjlsLS41Ni00LjI2Yy0uMDMtLjQtLjQ4LS43LS45LS42N3oiLz48cGF0aCBkPSJNNjguNDEgMTE1LjI1bDIuNTkgMTUuMS0zLjU2LjU4LS4zLTEuNzhjLS45My4xMy0xLjkyLS41NS0yLjA2LTEuNDlsLjAyLS4xYy0uMy0xLjc4LTEuNTQtNy45LTEuNTQtNy45LjEyLS42OC43NC0xLjI4IDEuMzgtMS40N2wtLjE4LTIuMzd6Ii8+PHBhdGggZmlsbD0iI2ZkOTcyNyIgZD0iTTExOC45NyAxMTAuODhsNi44Ny0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wM2E0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOTFhNC45OCA0Ljk4IDAgMDEtNS41NC00LjI0bC0uMTItMS4wNGE0Ljk4IDQuOTggMCAwMTQuMjQtNS41NHoiLz48cGF0aCBvcGFjaXR5PSIuMiIgZD0iTTExOC45NyAxMTAuODhsNi44Ny0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wM2E0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOTFhNC45OCA0Ljk4IDAgMDEtNS41NC00LjI0bC0uMTItMS4wNGE0Ljk4IDQuOTggMCAwMTQuMjQtNS41NHoiLz48cGF0aCBmaWxsPSIjNTQzOTMzIiBkPSJNMTE2LjYyIDExMC45N3MtLjU5LTEuODMuOTYtMS45NmMxLjU1LS4xMyAxLjMzIDEuNjYgMS4zMyAxLjY2em0zLjU5IDEwLjZzLjQ5IDEuODEtLjk2IDEuOTZjLTEuNDUuMTUtMS4zMy0xLjY2LTEuMzMtMS42NnptNC4xMy0uMzhzLjQ5IDEuODEtLjk2IDEuOTZjLTEuNDUuMTUtMS4zMy0xLjY2LTEuMzMtMS42NnptMy41NC0uNDlzLjUgMS44Mi0uOTYgMS45NmMtMS40NS4xNS0xLjMzLTEuNjYtMS4zMy0xLjY2em0tNy4xMS0xMC4ycy0uNTktMS44NC45Ni0xLjk3YzEuNTUtLjEzIDEuMzMgMS42NiAxLjMzIDEuNjZ6bTQuMTMtLjM5cy0uNTktMS44My45Ni0xLjk2YzEuNTUtLjEzIDEuMzMgMS42NiAxLjMzIDEuNjZ6Ii8+PHBhdGggZmlsbD0iI2ZkOTcyNyIgZD0iTTExOC4wOSAxMTAuNzJsNi44Ni0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wNGE0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOWE0Ljk4IDQuOTggMCAwMS01LjU0LTQuMjRsLS4xMi0xLjA0YTUuMDcgNS4wNyAwIDAxNC4yNS01LjU0eiIvPjxwYXRoIGQ9Ik0xMTcuNTEgMTEzLjM2bDguNTMtMS4xMWMuMzEtLjA1LjU3LjIuNjIuNTEuMDUuMzItLjIuNTgtLjUyLjYybC04LjUzIDEuMTJjLS4zLjA0LS41Ny0uMi0uNjEtLjUyLS4wNS0uMzEuMi0uNTcuNTEtLjYyem0xLjA3IDQuMjZsOC41My0xLjEyYy4zMS0uMDQuNTcuMi42Mi41Mi4wNC4zMS0uMi41Ny0uNTIuNjJsLTguNTMgMS4xMWMtLjMxLjA1LS41Ny0uMi0uNjItLjUxLS4wNi0uMjIuMi0uNTguNTItLjYyeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wOSI+PHBhdGggZD0iTTczLjcgMTI0LjhsLS4xLTEgLjEtNi4zLTMuOC0uNS41IDRjLTMtLjItNS45LjUtOC41IDItMyAyLTUgNS0zIDhzNiAzIDExIDBhNy4yIDcuMiAwIDAwMy44LTYuMnoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik03Ni44IDEyMnMwLTIuMS0zLjItMi41djQuM2wuMSAxYy0uMSAyLjYtMS41IDUtMy44IDYuMi01IDMtOSAzLTExIDBzMC02IDMtOGMyLjYtMS41IDUuNS0yLjIgOC41LTJsLS4yLTEuM2MtMS44LjMtMy42LjgtNS4zIDEuMy0xMiA0LTEzIDE2LTEyIDE3czMgMiAxMCAyYzQuMi0uMSA4LTIuMyAxMC02bDEgNXMyIDIgMyAwLS4xLTE3LS4xLTE3eiIvPjxwYXRoIGQ9Ik04Ny4yIDEyNC44bC4xLTEtLjEtNi4zIDMuOC0uNS0uNSA0YzMtLjIgNS45LjUgOC41IDIgMyAyIDUgNSAzIDhzLTYgMy0xMSAwYTcgNyAwIDAxLTMuOC02LjJ6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNODQgMTIyczAtMi4xIDMuMi0yLjV2NC4zbC0uMSAxYy4xIDIuNiAxLjUgNSAzLjggNi4yIDUgMyA5IDMgMTEgMHMwLTYtMy04YTE0LjkgMTQuOSAwIDAwLTguNS0ybC4yLTEuM2MxLjguMyAzLjYuOCA1LjMgMS4zIDEyIDQgMTMgMTYgMTIgMTdzLTMgMi0xMCAyYy00LjItLjEtOC0yLjMtMTAtNmwtMSA1cy0yIDItMyAwIC4xLTE3IC4xLTE3eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMCI+PGVsbGlwc2UgY3g9IjgwIiBjeT0iMTMxLjUiIHJ4PSIzMiIgcnk9IjguNyIgb3BhY2l0eT0iLjMiLz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxMzAuMyIgcng9IjE3IiByeT0iNC4xIiBvcGFjaXR5PSIuNiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMSI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNjQuNyAxMTUuOXMtMi44IDEwLjctMTEuMiAxMi45Yy01IDEuMy0xMC4zLjUtMTQuNi0yLjIgMCAwLTMuOS0xLjEtMS43IDIuOHM4LjQgMTEuOCAyNS44IDUuNiAxOC0xNi45IDE4LTE2LjktMTEuMiAxLjItMTYuMy0yLjJ6Ii8+PHBhdGggZD0iTTU4IDExMnMtNi4yIDEzLjUtMTUuMiAzLjljMCAwLTUuNi01LjYtMy40IDEuMXMxMS4xIDE4LjcgMzAuMy45YzAgLjEtNy44LTItMTEuNy01Ljl6TTk0LjggMTE1LjlzMi44IDEwLjcgMTEuMiAxMi45YzUgMS4zIDEwLjMuNSAxNC42LTIuMiAwIDAgMy45LTEuMSAxLjcgMi44cy04LjQgMTEuOC0yNS45IDUuNi0xOC0xNi45LTE4LTE2LjkgMTEuMyAxLjIgMTYuNC0yLjJ6Ii8+PHBhdGggZD0iTTEwMS41IDExMnM2LjIgMTMuNSAxNS4yIDMuOWMwIDAgNS42LTUuNiAzLjQgMS4xcy0xMS4yIDE4LjctMzAuMy45Yy0uMS4xIDcuOC0yIDExLjctNS45eiIvPjwvZz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjUgNDYgMTIxLjYpIiBjeD0iNDUuOSIgY3k9IjEyMS42IiByeD0iMS40IiByeT0iMS44Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTIuNSA1MSAxMjIuMykiIGN4PSI1MSIgY3k9IjEyMi4zIiByeD0iMS44IiByeT0iMS40Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTI3LjUgNTUuNiAxMjEpIiBjeD0iNTUuNiIgY3k9IjEyMS4xIiByeD0iMS40IiByeT0iMS4xIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQ3LjggNTguNCAxMTguNikiIGN4PSI1OC40IiBjeT0iMTE4LjYiIHJ4PSIxLjQiIHJ5PSIxLjEiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMjUgMTEzLjUgMTIxLjYpIiBjeD0iMTEzLjUiIGN5PSIxMjEuNiIgcng9IjEuOCIgcnk9IjEuNCIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC04Ny41IDEwOC41IDEyMi4zKSIgY3g9IjEwOC41IiBjeT0iMTIyLjMiIHJ4PSIxLjQiIHJ5PSIxLjgiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjIuNSAxMDMuOSAxMjEuMSkiIGN4PSIxMDMuOSIgY3k9IjEyMS4xIiByeD0iMS4xIiByeT0iMS40Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQyLjIgMTAxIDExOC42KSIgY3g9IjEwMS4xIiBjeT0iMTE4LjYiIHJ4PSIxLjEiIHJ5PSIxLjQiLz48cGF0aCBkPSJNNTggMTEycy02LjIgMTMuNS0xNS4yIDMuOWMwIDAtNS42LTUuNi0zLjQgMS4xczExLjEgMTguNyAzMC4zLjljMCAuMS03LjgtMi0xMS43LTUuOXoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4zIi8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0xMDEuNSAxMTJzNi4yIDEzLjUgMTUuMiAzLjljMCAwIDUuNi01LjYgMy40IDEuMXMtMTEuMiAxOC43LTMwLjMuOWMtLjEuMSA3LjgtMiAxMS43LTUuOXpNNjQuNyAxMTUuOXMtMi44IDEwLjctMTEuMiAxMi45Yy01IDEuMy0xMC4zLjUtMTQuNi0yLjIgMCAwLTMuOS0xLjEtMS43IDIuOHM4LjQgMTEuOCAyNS44IDUuNiAxOC0xNi45IDE4LTE2LjktMTEuMiAxLjItMTYuMy0yLjJ6Ii8+PHBhdGggZD0iTTk0LjggMTE1LjlzMi44IDEwLjcgMTEuMiAxMi45YzUgMS4zIDEwLjMuNSAxNC42LTIuMiAwIDAgMy45LTEuMSAxLjcgMi44cy04LjQgMTEuOC0yNS45IDUuNi0xOC0xNi45LTE4LTE2LjkgMTEuMyAxLjIgMTYuNC0yLjJ6Ii8+PC9nPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTYyLjUgMTE0LjhzLTEuNyAxNC42LTcuMyAxNC42YzAgMC0yLjIgMC0zLjktMi44cy0zLjQtMi4yLTIuOC42UzUwLjcgMTM5LjYgNjIgMTM5czE1LjctMTEuMiAxNS43LTE3LjR2LTMuMmMtLjEgMC05LjYuMy0xNS4yLTMuNnpNOTcgMTE0LjhzMS43IDE0LjYgNy4zIDE0LjZjMCAwIDIuMiAwIDMuOS0yLjhzMy40LTIuMiAyLjguNi0yLjIgMTIuNC0xMy41IDExLjgtMTUuNy0xMS4yLTE1LjctMTcuNHYtMy4yczkuNi4zIDE1LjItMy42eiIvPjwvZz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMzcuMSA2NC4xIDEyOC4zKSIgY3g9IjY0LjEiIGN5PSIxMjguMyIgcng9IjIuMiIgcnk9IjEuNyIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC05LjUgNTguNSAxMzEuMSkiIGN4PSI1OC41IiBjeT0iMTMxLjEiIHJ4PSIyLjIiIHJ5PSIxLjciLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjIuMSA2OCAxMjMuOCkiIGN4PSI2OCIgY3k9IjEyMy44IiByeD0iMS44IiByeT0iMS4zIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTgyLjQgNjkgMTE5LjMpIiBjeD0iNjkuMSIgY3k9IjExOS4zIiByeD0iMS44IiByeT0iMS4zIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTUyLjkgOTUuMyAxMjguMykiIGN4PSI5NS4zIiBjeT0iMTI4LjMiIHJ4PSIxLjciIHJ5PSIyLjIiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtODAuNSAxMDEgMTMxLjEpIiBjeD0iMTAwLjkiIGN5PSIxMzEuMSIgcng9IjEuNyIgcnk9IjIuMiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0yNy45IDkxLjUgMTIzLjgpIiBjeD0iOTEuNSIgY3k9IjEyMy44IiByeD0iMS4zIiByeT0iMS44Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTcuNiA5MC40IDExOS4zKSIgY3g9IjkwLjQiIGN5PSIxMTkuMyIgcng9IjEuMyIgcnk9IjEuOCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMiI+PGcgZmlsbD0iI2VkZWRlZCI+PHBhdGggZD0iTTYxIDExNS4ybDMuNiA1LjFzNi4yIDQgMTYuOCAzLjZjMTMuMS0uNyAxNy41LTMuNiAxNy41LTMuNmwyLjktNy4zcy0xNiAxMC45LTQwLjggMi4yeiIvPjxwYXRoIGQ9Ik02Ny45IDEzMWE2IDYgMCAwMDIgMS4yYzYuMSAyLjYgMjEgMi41IDI0LjItMS4ybDIuMi05LjZhNjAgNjAgMCAwMS0yOS45IDBsMS41IDkuNnoiLz48cGF0aCBkPSJNNzAuMyAxMzMuN2MzLjEgMy4xIDcuMyA0LjggMTEuNyA0LjggNy4zIDAgMTAuMi00LjggMTAuMi00Ljh2LTEuMXMtMTAuOSAzLjgtMjEuOS0uNXYxLjZ6Ii8+PC9nPjxwYXRoIGQ9Ik04MS40IDEyMy45bDEuNi0uMWEzNy42IDM3LjYgMCAwMDE1LjktMy41bDIuOS03LjNzLTcuMSA0LjktMTkuMiA1LjVjMi40IDEuMS0xLjIgNS40LTEuMiA1LjR6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNzAuMyAxMzMuN2MzLjEgMy4xIDcuMyA0LjggMTEuNyA0LjggNy4zIDAgMTAuMi00LjggMTAuMi00Ljh2LTEuMXMtMTAuOSAzLjgtMjEuOS0uNXYxLjZ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik03OC4xIDEyMy41Yy4zLjMtNi40IDMuOS0xMC45IDMuN2wuMyAxczkuNy0xIDEyLjctNWwtMi4xLjN6bTE2LjggNC44YzEuMi43LTEwLjMgNi43LTE2IDUuOWw0LS4xczktLjQgMTItNC41di0xLjN6bS0uNC02LjRzLTEzLjQgMTAuMy0yNS42IDkuOGwxLjYuNnMxMC45IDEuNiAyNS44LTEwLjRoLTEuOHoiLz48ZyBvcGFjaXR5PSIuMTUiPjxwYXRoIGQ9Ik04MSAxMzRjNS42LjEgMTEuMy0uOSAxMy4xLTNsMi4yLTkuNmE4NiA4NiAwIDAxLTE0LjMgMS44Yy45IDEuNS4xIDUuOC0xIDEwLjh6Ii8+PHBhdGggZD0iTTgyLjEgMTIzLjJjMTAuMiAwIDEzLjctMS41IDEzLjctMS41bC0uNiAxLjVzLTE2LjggMy42LTI4LjQtLjd2LTEuMXM1LjEgMS44IDE1LjMgMS44eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMTMiPjxwYXRoIGQ9Ik04OC44IDExNy45bC4yIDYuMWMzLjIgMS4yIDYuOCAxLjIgMTAgMGwzLjItMTEuOHMtNy43IDQuNi0xMy40IDUuN3oiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNOTEgMTI0LjZTODkuOSAxMzcgOTEgMTM5czQuNCAzIDQuNCAwIDEuNi0xNC40IDEuNi0xNC40bC0zIC4yYy0xIDAtMiAwLTMtLjJ6IiBmaWxsPSIjZjVmNWY1Ii8+PHBhdGggZD0iTTkxIDEzOWMxLjEgMiA0LjQgMyA0LjQgMHMxLjYtMTQuNCAxLjYtMTQuNGwtMyAuMnMwIDE1LjItMyAxNC4yeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNjkuNiAxMjMuM3MyLjYgNS4yIDUuMiA3LjFMNzggMTMzdjQuMmMwIC40LTkuOC0yLjgtOC40LTEzLjl6IiBmaWxsPSIjNmQ0NzE2Ii8+PHBhdGggZD0iTTY4LjkgMTIzLjNzNS4yLTEuMyA4LjQgMiAzLjIgNy44IDEuMyA3LjgtMS45LjYtOS43LTkuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDQuMiAxMDguNHM0LjUtNy44IDE4LjItLjdTNjUgMTI5LjggNzcuMyAxMzdjMCAwLTMuNSAzLjUtOC01LjctNC40LTktNC4zLTIzLjYtMjUuMS0yMi45eiIgZmlsbD0iIzk5NjcxZCIvPjxwYXRoIGQ9Ik03Ny4zIDEzN3MtNS44IDIuNi05LjgtMTAuNFM1OSAxMDUuOCA0OCAxMDYuNGMtMS42IDAtMyAuNi00LjIgMS42LTUuMyA0LjgtMS4yIDE4LjcgNC4yIDIzLjEgNi41IDUuMiAyMC44IDEwLjQgMjYuNyA4LjRzMi42LTIuNSAyLjYtMi41eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik03OC4yIDExOC4ybC0uOSA3LjFjLTEuOC0xLjMtMy40LTIuMi00LjgtMi4ybC42LTUuOWMxLjcuNSAzLjQuOCA1LjEgMXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik00NS41IDExMWgxMWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTExYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTQ0LjUgMTE0aDE0Yy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTRjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNDQuNSAxMTdoMTdjLjMgMCAuNS4yLjUuNXMtLjIuNS0uNS41aC0xN2MtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41ek00NS41IDEyMGgxN2MuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTE3Yy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTQ2LjUgMTIzaDE3Yy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTdjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNDguNSAxMjZoMTdjLjMgMCAuNS4yLjUuNXMtLjIuNS0uNS41aC0xN2MtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41ek01MC41IDEyOWgxNWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTE1Yy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTU0LjUgMTMyaDEzYy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTNjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNTkuNSAxMzVoOWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTljLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXoiLz48cGF0aCBkPSJNOTQuNyAxMjQuN2MxLjgtLjIgMi41LS4xIDQuMy0uN2wzLjItMTEuOC00LjMgMi40cy0uNyAxMC4yLTMuMiAxMHoiIG9wYWNpdHk9Ii4xIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE0Ij48cGF0aCBkPSJNOTcgMTIyLjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNOTcuNiAxMjIuNXMtNS40LTEuNC04LjkgMi0zLjQgOC4yLTEuNCA4LjIgMi4yLjcgMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjMuNSAxMDYuOHMtNC44LTguMi0xOS4xLS43Yy0xNC4zIDcuNS0yLjcgMjMuMi0xNS43IDMwLjcgMCAwIDMuNCA0LjMgOC40LTUuOSA0LjctOS4zIDQuNi0yNC43IDI2LjQtMjQuMXoiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNODguOCAxMzYuOHM2LjEgMi43IDEwLjItMTAuOSA4LjktMjEuOCAyMC40LTIxLjFjMS42IDAgMy4yLjYgNC40IDEuNyA1LjYgNSAxLjMgMTkuNi00LjQgMjQuMi02LjggNS40LTIxLjggMTAuOS0yNy45IDguOXMtMi43LTIuOC0yLjctMi44eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik04Ny44IDExNy4ybDEgNy40YzEuOS0xLjQgMy42LTIuMyA1LTIuM2wtLjYtNi4yYy0xLjguNS0zLjYuOC01LjQgMS4xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTEyMi4yIDExMC42aC0xMS42Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTEyMy4zIDExMy44aC0xNC43Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNC43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMy4zIDExNi45aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMi4yIDEyMC4xaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMi41LS41LjV6TTEyMS4xIDEyMy4yaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTExOS4xIDEyNi40aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTExNyAxMjkuNWgtMTUuOGMtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41SDExN2MuMyAwIC41LjIuNS41di4xYzAgLjItLjMuNC0uNS40ek0xMTIuOCAxMzIuN0g5OS4xYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTEwNy41IDEzNS44SDk4Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWg5LjVjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNXoiLz48cGF0aCBkPSJNNjMgMTIzLjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNNjAuMyAxMTNsLTIuMSAxMS4zYzEuOS0xLjQgMi43LS4zIDQuMS0uM2wyLjItOS4yYy0yLS40LTIuOS0xLjQtNC4yLTEuOHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik02My42IDEyMy41cy01LjUtMS40LTguOSAyYy0zLjQgMy40LTMuNCA4LjItMS40IDguMnMyLjIuNyAxMC4zLTEwLjJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg5LjUgMTA3LjhzLTQuOC04LjItMTkuMS0uN2MtMTQuMyA3LjUtMi43IDIzLjItMTUuNyAzMC43IDAgMCAzLjYgNCA4LjQtNiA0LjYtOS4zIDQuNi0yNC42IDI2LjQtMjR6IiBmaWxsPSIjOTk2NzFkIi8+PHBhdGggZD0iTTU0LjggMTM3LjhzNi4xIDIuNyAxMC4yLTEwLjkgOC45LTIxLjggMjAuNC0yMS4xYzEuNiAwIDMuMi42IDQuNCAxLjcgNS42IDUgMS4zIDE5LjYtNC40IDI0LjItNi44IDUuNC0yMS44IDEwLjktMjggOC45cy0yLjYtMi44LTIuNi0yLjh6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTg4LjIgMTExLjZINzYuNmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTEuNmMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41ek04OS4zIDExNC44SDc0LjVjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDE0LjdjLjMgMCAuNS4yLjUuNXYuMWMuMS4zLS4yLjUtLjQuNXpNODkuMyAxMTcuOUg3MS40Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTg4LjIgMTIxLjFINzAuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjItLjIuNS0uNS41ek04Ny4xIDEyNC4ySDY5LjNjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDE3LjljLjMgMCAuNS4yLjUuNXYuMWMtLjEuMy0uMy41LS42LjV6TTg1LjEgMTI3LjRINjcuMmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjItLjMuNS0uNS41ek04MyAxMzAuNUg2Ny4yYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjVIODNjLjMgMCAuNS4yLjUuNXYuMWMwIC4yLS4zLjQtLjUuNHpNNzguOCAxMzMuN0g2NS4xYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTczLjUgMTM2LjhINjRjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xNSI+PHBhdGggZD0iTTEyOS4xIDExNC4xYzEuMi0xLjgtLjktMi44LTMuMi0yLjMgMCAwLTE0LjYgMi42LTMwIDQtMTMuMiA1LjctMjcgNi0zNS43LTEuNi0xMi42LTMtMjIuNC03LjUtMjUuNy01LjggMCAwLTYuNi45LTUuMyA1LjMtLjEgMS4zLjIgMi41LjggMy43IDMuNiA1LjcgMzkuOCAxMy44IDcyLjQgOCAxOC4zLTMuMiAyNS4yLTYuOCAyNi43LTkuMi4zLS42LjMtMS40IDAtMi4xek01NCAxMjMuNHptNDUuOC4zbDIuNS0uNGEyNjcuMSAyNjcuMSAwIDAwLTIuNS40eiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjYzLjgiIGN5PSIxMzQuNyIgcj0iNi4xIiBmaWxsPSIjNDkwYjM3Ii8+PGNpcmNsZSBjeD0iNjEuMSIgY3k9IjEzNC41IiByPSI2LjEiLz48Y2lyY2xlIGN4PSIxMTEuMyIgY3k9IjEzMy4xIiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI2MS4xIiBjeT0iMTM0LjUiIHI9IjYuMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNNTYuNSAxMzJsNC4yLjRjLjcuMSAxLjIuNyAxLjIgMS40bC0uMSAxLjVjLS4xLjctLjcgMS4yLTEuNCAxLjJsLTQuMi0uNGMtLjctLjEtMS4yLS43LTEuMi0xLjRsLjEtMS41Yy4xLS43LjctMS4yIDEuNC0xLjJ6IiBmaWxsPSIjMDEwMTAxIi8+PGNpcmNsZSBjeD0iMTA4LjciIGN5PSIxMzMuNyIgcj0iNi4xIi8+PGNpcmNsZSBjeD0iMTA4LjciIGN5PSIxMzMuNyIgcj0iNi4xIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNCIvPjxwYXRoIGQ9Ik0xMDMuNSAxMzIuN2w0LjEtLjljLjctLjIgMS40LjMgMS41IDFsLjMgMS41Yy4yLjctLjMgMS40LTEgMS41bC00LjEuOWMtLjcuMi0xLjQtLjMtMS41LTFsLS4zLTEuNWMtLjItLjYuMy0xLjMgMS0xLjV6IiBmaWxsPSIjMDEwMTAxIi8+PGNpcmNsZSBjeD0iOTkuMyIgY3k9IjEzNS43IiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI5Ni42IiBjeT0iMTM2LjMiIHI9IjYuMSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9Ijk2LjYiIGN5PSIxMzYuMyIgcj0iMy40Ii8+PHBhdGggZD0iTTEyMC4zIDEyNS41Yy0xNC4zIDQuNS01OS42IDkuOC03Ny44LS45LTEuOC0xLTQuNC0yLjktNC40LTIuOXMzMi45IDEwLjggNzIuOSAxLjhjMTEuMy0yLjkgMTgtNS41IDE4LjQtOS4yIDMuMSAyLTIuNSA5LjEtOS4xIDExLjJ6IiBmaWxsPSIjNDkwYjM3Ii8+PHBhdGggZD0iTTI5LjIgMTEzLjZjLS4xIDEuMy4yIDIuNS44IDMuNyAzLjYgNS43IDM5LjggMTMuOCA3Mi40IDggMTguMy0zLjIgMjUuMi02LjggMjYuNy05LjIuNS0uOCAwLTIuNi0uMS0xLjktNiA0LjctMjMuNCAxMC00My4zIDEwLjctMjYuMSAxLTU0LjQtMy43LTU2LjUtMTEuM3oiIG9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBjeD0iNTEuNyIgY3k9IjEzMy43IiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEzMy40IiByPSI2LjEiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEzMy40IiByPSIzLjQiLz48cGF0aCBkPSJNMzQuNSAxMDguNHMtOC4xIDEuMi00LjUgNi45YzMuNiA1LjcgMzkuOCAxMy44IDcyLjQgOCAxOC4zLTMuMiAyNS4yLTYuOCAyNi43LTkuMiAxLjItMS44LS44LTIuOC0zLjItMi4zIDAgMC0xNC42IDIuNi0zMCA0YTQyLjkgNDIuOSAwIDAxLTM1LjYtMS42Yy0xMi42LTMtMjIuNS03LjUtMjUuOC01Ljh6Ii8+PGVsbGlwc2UgY3g9Ijc5IiBjeT0iMTIxIiByeD0iMTgiIHJ5PSIyIiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMTUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMTYiPjxnIGZpbGw9IiNhMzRiMWEiPjxwYXRoIGQ9Ik03OSAxMTkuMmwtLjQgMTEuMnMxLjEgMi42LTkuNyAyLjZINDYuMnMtNS40LTUuMi0yLjItNy44IDExLjktMy40IDExLjktMy40bC0yLjYtNi42IDI1LjcgNHpNODEuNiAxMTkuMkw4MCAxMzAuNHMtMSAyLjYgOS44IDIuNmgyMi43czUuNC01LjIgMi4yLTcuOC0xNC45LTMuNC0xNC45LTMuNGwuNi01LjYtMTguOCAzeiIvPjwvZz48cGF0aCBkPSJNNTkuOCAxMTguNGwtOC4zLS45Yy0uMyAwLS41LS4zLS40LS42bC4xLS41YzAtLjMuMy0uNS42LS40bDguMy45Yy4zIDAgLjUuMy40LjZsLS4xLjVjLS4xLjItLjMuNC0uNi40ek02MC42IDEyMC45bC04LjMtLjljLS4zIDAtLjUtLjMtLjQtLjZsLjEtLjVjMC0uMy4zLS41LjYtLjRsOC4zLjljLjMgMCAuNS4zLjQuNmwtLjEuNWMtLjEuMy0uNC41LS42LjR6TTk0LjkgMTE3LjNsOC4zLjVjLjMgMCAuNS4zLjUuNXYuNWMwIC4zLS4zLjUtLjUuNWwtOC4zLS41Yy0uMyAwLS41LS4zLS41LS41di0uNWMwLS4zLjMtLjYuNS0uNXpNOTMuOSAxMTkuNmw4LjMuNWMuMyAwIC41LjMuNS41di41YzAgLjMtLjMuNS0uNS41bC04LjMtLjVjLS4zIDAtLjUtLjMtLjUtLjV2LS41YzAtLjMuMi0uNS41LS41eiIvPjxnIGZpbGw9IiM0OTBiMzciPjxjaXJjbGUgY3g9IjY4LjUiIGN5PSIxMzUuOSIgcj0iMy45Ii8+PGNpcmNsZSBjeD0iNTIuNSIgY3k9IjEzNS45IiByPSIzLjkiLz48Y2lyY2xlIGN4PSI5MC4yIiBjeT0iMTM1LjkiIHI9IjMuOSIvPjxjaXJjbGUgY3g9IjEwNi4yIiBjeT0iMTM1LjkiIHI9IjMuOSIvPjwvZz48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSI3MC4yIiBjeT0iMTM1LjciIHI9IjMuOSIvPjxjaXJjbGUgY3g9IjU0LjIiIGN5PSIxMzUuNyIgcj0iMy45Ii8+PGNpcmNsZSBjeD0iODguNSIgY3k9IjEzNS43IiByPSIzLjkiLz48Y2lyY2xlIGN4PSIxMDQuNSIgY3k9IjEzNS43IiByPSIzLjkiLz48L2c+PGNpcmNsZSBjeD0iNzAuMiIgY3k9IjEzNS43IiByPSIyLjIiLz48Y2lyY2xlIGN4PSI1NC4yIiBjeT0iMTM1LjciIHI9IjIuMiIvPjxjaXJjbGUgY3g9Ijg4LjUiIGN5PSIxMzUuNyIgcj0iMi4yIi8+PGNpcmNsZSBjeD0iMTA0LjUiIGN5PSIxMzUuNyIgcj0iMi4yIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE3Ij48cGF0aCBkPSJNNDUgMTM3aDc1czYgMCA3LTIuMiAxIDMuMy03IDQuNS02NyAwLTc1IDAtOS0yLjMgMC0yLjN6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTM0IDEzOC4zaDc1czYgMCA3LTIuMiAxIDMuMy03IDQuNS02NyAwLTc1IDBsLTIuMi0uMS0xLjUtMiAzLjctLjJ6IiBmaWxsPSIjOTE5MTkxIi8+PHBhdGggZD0iTTc5LjkgMTE3LjhsLTEwLjYgMTcuNlM2OC4yIDEzOCA3OSAxMzhoMjIuN3M1LjQtNS4yIDIuMi03LjgtMTEuOS0zLjQtMTEuOS0zLjRsOC42LTEzLjhzLTcuNiA1LjItMjAuNyA0Ljh6IiBmaWxsPSIjNDkyMzBmIi8+PHBhdGggZD0iTTYzLjYgMTE1LjJMNTIgMTM1LjRzLTEgMi42IDkuOCAyLjZoMjIuN3M1LjQtNS4yIDIuMi03LjgtMTEuOS0zLjQtMTEuOS0zLjRsNy42LTguNmMtLjEgMC03LjcuOC0xOC44LTN6IiBmaWxsPSIjYTM0YjFhIi8+PHBhdGggZD0iTTc0LjQgMTE5LjdsOC4xIDEuOWMuMy4xLjQuMy40LjZsLS4xLjVjLS4xLjMtLjMuNC0uNi40bC04LjEtMS45Yy0uMy0uMS0uNC0uMy0uNC0uNmwuMS0uNWMuMS0uMy40LS40LjYtLjR6TTcyLjkgMTIyLjhsOC4xIDEuOWMuMy4xLjQuMy40LjZsLS4xLjVjLS4xLjMtLjMuNC0uNi40bC04LjEtMS45Yy0uMy0uMS0uNC0uMy0uNC0uNmwuMS0uNWMwLS4zLjMtLjQuNi0uNHpNOTEuNCAxMTguN2w4LjEgMS45Yy4zLjEuNC4zLjQuNmwtLjEuNWMtLjEuMy0uMy40LS42LjRsLTguMS0xLjljLS4zLS4xLS40LS4zLS40LS42bC4xLS41Yy4xLS4zLjMtLjQuNi0uNHpNODkuOSAxMjEuOGw4LjEgMS45Yy4zLjEuNC4zLjQuNmwtLjEuNWMtLjEuMy0uMy40LS42LjRsLTguMS0xLjljLS4zLS4xLS40LS4zLS40LS42bC4xLS41YzAtLjMuMy0uNC42LS40eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xOCI+PHBhdGggZD0iTTY0LjUgMTIyLjVzMi43IDUuNSA1LjUgNy41YzEuMi44IDIuMyAxLjggMy40IDIuN3Y0LjRjMCAuNC0xMC4yLTMtOC45LTE0LjZ6IiBmaWxsPSIjNmQ0NzE2Ii8+PHBhdGggZD0iTTYzLjggMTIyLjVzNS41LTEuNCA4LjkgMiAzLjQgOC4yIDEuNCA4LjItMi4xLjctMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNy45IDEwNi44czQuOC04LjIgMTkuMS0uN2MxNC4zIDcuNSAyLjcgMjMuMiAxNS43IDMwLjcgMCAwLTMuNyAzLjY1LTguMzYtNS45My00LjU5LTkuNDItNC41NC0yNC42Ny0yNi40NC0yNC4wN3oiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNNzIuNyAxMzYuOHMtNi4xIDIuNy0xMC4yLTEwLjktOC45LTIxLjgtMjAuNS0yMS4xYy0xLjYgMC0zLjIuNi00LjQgMS43LTUuNSA1LTEuMyAxOS42IDQuNCAyNC4yIDYuOCA1LjQgMjEuOCAxMC45IDI4IDguOXMyLjctMi44IDIuNy0yLjh6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTczLjcgMTE3LjJsLTEgNy40Yy0xLjktMS40LTMuNi0yLjMtNS0yLjNsLjctNi4yYzEuNy41IDMuNC44IDUuMyAxLjF6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNMzkuMyAxMDkuNmgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVIMzkuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjV6TTM4LjIgMTEyLjdINTNjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUgzOC4yYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4yLjMtLjUuNS0uNXpNMzguMiAxMTUuOWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVIMzguMmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4zLS41LjUtLjV6TTM5LjMgMTE5aDE3LjljLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUgzOS4zYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4yLjItLjUuNS0uNXpNNDAuMyAxMjIuMmgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVINDAuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4zLS41LjUtLjV6TTQyLjQgMTI1LjNoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41SDQyLjRjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41ek00NC41IDEyOC41aDE1LjhjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUg0NC41Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNXpNNDguNyAxMzEuNmgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVINDguN2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjV6TTU0IDEzNC44aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41SDU0Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNXoiLz48Y2lyY2xlIGN4PSIxMDIuOCIgY3k9IjEyMy45IiByPSIxNS41IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExOC4zIDEyMy45YzAgOC41LTYuOSAxNS41LTE1LjUgMTUuNS01IC4xLTkuOC0yLjQtMTIuNi02LjUgMjMuMyA1LjYgMjMuMy0xOC43IDE5LjEtMjMgNS41IDIuMyA5LjEgNy45IDkgMTR6IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBkPSJNMTExLjIgMTIybC0xLjkgNi42Yy0uMS40LS40LjYtLjguNmwtNi44LjJjLS40IDAtLjctLjItLjgtLjZsLTIuMy02LjRjLS4xLS40IDAtLjguMy0xbDUuNC00LjJjLjMtLjIuNy0uMiAxIDBsNS42IDMuOWMuMi4yLjQuNS4zLjl6TTEwOC44IDEwOS42bC00LjIgMy4yYy0uMy4yLS43LjItMSAwbC01LjUtMy44YzMuNS0xLjEgNy4zLS45IDEwLjcuNnpNOTkuMiAxMzQuMWwxLjggNS4xYy0yLjIuMS05LTIuOC0xMC01LjIgMC0uMi4zLS4yLjYtLjJsNi45LS4yYy4zIDAgLjYuMi43LjV6TTkwLjkgMTEzLjlsMS45IDUuNGMuMS4zIDAgLjctLjMuOWwtNS4zIDQuMWMtLjEtMy44IDEuMi03LjUgMy43LTEwLjR6TTExMC44IDEzNy4ybDEuNC00LjdjLjEtLjMuNC0uNi44LS42bDMuMi0uMWMtMS40IDIuMi0zLjIgNC01LjQgNS40ek0xMTggMTIwLjdsLTEuNy0xLjFjLS4zLS4yLS40LS42LS4zLS45bC42LTEuOWMuNyAxLjIgMS4yIDIuNSAxLjQgMy45ek0xMDAuOCAxMjkuNDVhLjI1LjI1IDAgMDAtLjIzLjE2bC0xLjQgMy40YS4yNS4yNSAwIDEwLjQ2LjE5bDEuNC0zLjRhLjI1LjI1IDAgMDAtLjI0LS4zNXpNOTMuNTcgMTE5Ljg1YS4yNS4yNSAwIDAwLS4wNi40OGwzLjQgMS4zYS4yNS4yNSAwIDEwLjE4LS40NmwtMy40LTEuM2EuMjUuMjUgMCAwMC0uMTItLjAyek0xMTUuMyAxMTguNjVhLjI1LjI1IDAgMDAtLjExLjAzbC0zLjMgMS43YS4yNS4yNSAwIDEwLjIzLjQ0bDMuMy0xLjdhLjI1LjI1IDAgMDAtLjEyLS40N3oiLz48cGF0aCBkPSJNMTAzLjkgMTEyLjg1YS4yNS4yNSAwIDAwLS4yNS4yNmwuMiAzLjdhLjI1LjI1IDAgMTAuNS0uMDJsLS4yLTMuN2EuMjUuMjUgMCAwMC0uMjQtLjI0ek0xMDkuNSAxMjguODVhLjI1LjI1IDAgMDAtLjE4LjQzbDIuNiAyLjZhLjI1LjI1IDAgMTAuMzYtLjM2bC0yLjYtMi42YS4yNS4yNSAwIDAwLS4xOC0uMDd6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE5Ij48cGF0aCBkPSJNMzkgMTEwbDkgMjNzNDgtMSA0Ny0yYy0uNi0uNi0yLjgtNy4zLTQuNi0xMy0yMi40IDUtMzYuMy04LTM2LjMtOEgzOXoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTk1IDEzMWwyNiA5LTI2IDIuNC0xNyAxLjYtMzAtMTEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTk1IDEzMC45VjE0MmwyNi0yeiIgb3BhY2l0eT0iLjUiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTYzLjUgMTMxLjljLS44LTIuOCAzMS45LTEyLjUgMzIuNy04LjMuNCAyLjQtMzQuNCA1LTM0LjggMi42czcuMS01LjIgMTYuNy02LjJsMi4xLS4yIi8+PHBhdGggZD0iTTYzLjUgMTM3LjljLS44LTIuMSAzMi4xLTEwLjcgMzIuOC03LjQuMyAxLjktNy4yIDMuNC0xNi44IDQuNXMtMTcuNi40LTE3LjktMS40Yy0uMS0uNi41LTEuMiAxLjctMS44Ii8+PC9nPjxwYXRoIGQ9Ik00OCAxMzN2MTguMmMuOC41IDMuMS42IDUuMi44SDc4di04bC0zMC0xMXoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZD0iTTEyMSAxNDB2Ny4yYTI2IDI2IDAgMDEtMTUgNC44SDc4di04bDQzLTR6Ii8+PHBhdGggZD0iTTEyMSAxNDB2Ny4yYTI2IDI2IDAgMDEtMTUgNC44SDc4di04bDQzLTR6IiBvcGFjaXR5PSIuMSIgZmlsbD0iI2ZmZiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8yMCI+PHBhdGggZD0iTTQ2LjQgMTAxLjFzLTEuMyAxLjktMS4xIDUuOWMuNyA5LjctMi4xIDE5LjUgMy41IDI2LjQgNS42IDcgMTYuNyAxMS44IDIyLjkgOC40czUuNi0xNS4zLTEuNC0yMC4yYTIxLjggMjEuOCAwIDAxLTQuNC00LjcgNDAgNDAgMCAwMS0xOS41LTE1Ljh6IiBmaWxsPSIjOTk2NzFkIi8+PHBhdGggZD0iTTQ2LjQgMTAxLjFzLTEuMyAxLjktMS4xIDUuOWMuNyA5LjctMi4xIDE5LjUgMy41IDI2LjQgMTIuMiAxMi45IDIyLjkgOC40IDIyLjkgOC40LTEwLjEgMS4xLTIxLjYtMzUuOC0yMS42LTM1LjhhMzAgMzAgMCAwMS0zLjctNC45eiIgZmlsbD0iIzZkNDcxNiIvPjxwYXRoIGQ9Ik01NC44IDExNS40Yy00IDAtNy4zLTMuMy03LjMtNy4zLjEtMS4zLjUtMi43IDEuMS0zLjguMS0uMiA3LjEgOC4xIDEwLjggOS41IDAtLjEtMS4zIDEuMi00LjYgMS42eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01OC44IDExMy4zYy0uOC4zLTEuNy41LTIuNi42YTYgNiAwIDAxLTUuOS02LjNsLjItMS44YTI0IDI0IDAgMDA4LjMgNy41eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNOTQgMTI0LjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNOTQuNiAxMjQuNXMtNS40LTEuNC04LjkgMmMtMy40IDMuNC0zLjQgOC4yLTEuNCA4LjJzMi4yLjcgMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjAuNSAxMDguOHMtNC44LTguMi0xOS4xLS43Yy0xNC4zIDcuNS0yLjcgMjMuMi0xNS43IDMwLjcgMCAwIDMuNyAzLjYgOC40LTUuOSA0LjYtOS4zIDQuNi0yNC43IDI2LjQtMjQuMXoiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNODUuOCAxMzguOHM2LjEgMi43IDEwLjItMTAuOSA4LjktMjEuOCAyMC40LTIxLjFjMS42IDAgMy4yLjYgNC40IDEuNyA1LjYgNSAxLjMgMTkuNi00LjQgMjQuMi02LjggNS40LTIxLjggMTAuOS0yNy45IDguOXMtMi43LTIuOC0yLjctMi44eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik04NC44IDExOS4ybDEgNy40YzEuOS0xLjQgMy42LTIuMyA1LTIuM2wtLjYtNi4yYy0xLjguNS0zLjYuOC01LjQgMS4xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTExOS4yIDExMi42aC0xMS42Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTEyMC4zIDExNS44aC0xNC43Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNC43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMC4zIDExOC45aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTExOS4yIDEyMi4xaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMi41LS41LjV6TTExOC4xIDEyNS4yaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTExNi4xIDEyOC40SDk4LjJjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjUgMCAuMi0uMy41LS41LjV6TTExNCAxMzEuNUg5OC4yYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjVIMTE0Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy40LS41LjR6TTEwOS44IDEzNC43SDk2LjFjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDEzLjdjLjMgMCAuNS4yLjUuNXYuMWMwIC4yLS4zLjUtLjUuNXpNMTA0LjUgMTM3LjhIOTVjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8yMSI+PGVsbGlwc2UgY3g9IjM2LjkiIGN5PSIxMjYuNyIgcng9IjE1LjQiIHJ5PSIyNS42IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTAuMSkiLz48cGF0aCBkPSJNNTkgMTE4Yy4zIDEuNy0xLjUgMy42LTEuNSAzLjZzLTIuNC0xLTIuOC0zIDEuNi0zLjYgMS42LTMuNiAyLjQgMSAyLjcgM3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEyMC43IDEyMC44Yy0yLjYgMTMuNS0xMS4yIDIzLjEtMTkuMiAyMS42LTcuNi0xLjQtMTItMTIuMi0xMC40LTI0LjZDOTQgMTE2IDEwNyAxMTMgMTE1LjYgOTYuM2M0LjggNC41IDcgMTQuMSA1IDI0LjV6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjQiPjxwYXRoIGQ9Ik00OS4yIDEyMC4zYy44IDQuMiA0LjcgMTYuNCAxMCAxOC41LTUuMiAxLTExLjEtNy4xLTEzLTE4cy43LTIwLjYgNi0yMS42Yy00LjYgMi4zLTMuOCAxNi45LTMgMjF6TTk3IDExNi43Yy0uNyA0LTEuNCAxNi40IDIuNyAyMC4yLTUtMS03LjUtOS44LTUuOC0xOS45bDMuNC0xLjYtLjMgMS4zeiIvPjwvZz48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTU1LjYgOTIuOWEyNS42IDE1LjQgNzkuOSAwMC0xLjUuMSAyNS42IDE1LjQgNzkuOSAwMC0xMC43IDI4IDI1LjYgMTUuNCA3OS45IDAwMTkuNyAyMi41IDI1LjYgMTUuNCA3OS45IDAwMTAuNi0yOCAyNS42IDE1LjQgNzkuOSAwMC0xOC0yMi42em0tMi41IDYuM2M1IDAgMTAuNCA3LjggMTIuMiAxOC4xIDIgMTEtLjcgMjAuNi02IDIxLjVhNC45IDQuOSAwIDAxLS45IDBjLTUgMC0xMC40LTcuNy0xMi4yLTE4LTItMTEgLjctMjAuNiA2LTIxLjZhNC44IDQuOCAwIDAxLjkgMHpNMTE1LjYgOTYuM0MxMDcgMTEzIDk0IDExNiA5MSAxMTcuOGMtMS42IDEyLjQgMi44IDIzLjIgMTAuNCAyNC42IDggMS41IDE2LjYtOC4xIDE5LjItMjEuNiAyLTEwLjQtLjMtMjAtNS4xLTI0LjV6bS00IDdjMS43IDQgMi4xIDkuOCAxIDE2LjItMiAxMC03LjIgMTcuNC0xMiAxNy40YTQuMyA0LjMgMCAwMS0xIDBjLTQuOS0xLTcuNC05LjgtNS44LTE5LjkuMS0uMyAxMS4yLTQgMTcuOC0xMy42eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzAxIj48cGF0aCBkPSJNNTMuNSA4NC4yYTIuNSAyLjUgMCAwMC0yLjktMi4ybC0xNiAyLjQtMi4zLThzMC0yLTEuNy0uN2wyLjYgOC45LTMuOC42LTIuMy03LjlzMC0yLTEuNy0uN2wyLjYgOC45LTIuMi4zYy40IDEuMy41IDIuNi4yIDMuOWwzLjQtLjMgMi40IDguNGguMWMtLjIuNS4xIDEgLjUgMS4xLjQuMi44IDAgMS4xLS40aC4xdi0uMmExIDEgMCAwMC0uMi0uOUwzMSA4OWwzLjYtLjQgMi42IDguOWguMWMtLjIuNCAwIDEgLjQgMS4ybC41LjJjLjYgMCAxLS41IDEtMWExIDEgMCAwMC0uNy0uOWwtMi40LTguNEw1MS41IDg3YzEuMi0uMSAyLjItMS40IDItMi44eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01MS4zIDg3LjFsLTE1LjQgMS42LS41LTEuNnMxOC44LTIuMyAxOC0yLjljLjEgMCAuNiAyLjEtMi4xIDIuOXoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTguOCA4Ny41YTguNSA4LjUgMCAwMTkuNS03LjNjNC43LjUgOCA0LjcgNy41IDkuM2E4LjUgOC41IDAgMDEtOS41IDcuMyA4LjQgOC40IDAgMDEtNy41LTkuM3pNMTQ2LjcgNzcuNWMtLjUgNC00LjMgNi45LTguMyA2LjNhNy40IDcuNCAwIDAxLTYtNC45Yy0uMS0uNCA0LjYuMSA0LjYtMS45IDAtMS0xLjctMS0zLS45bC0yIC4yLjEtLjhjLjYtNCA0LjMtNi45IDguMy02LjNzNi45IDQuMiA2LjMgOC4zeiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4zIj48cGF0aCBkPSJNMjUuOCA4OS40YTguNSA4LjUgMCAwMS05LjUgNy4zIDkgOSAwIDAxLTUuNy0zLjFjMi4yLjggNy43IDEuNiAxMS4xLTEuOCAyLjUtMi40IDIuNi02LjggMi05YTguNiA4LjYgMCAwMTIuMSA2LjZ6TTE0Ni43IDc3LjVjLS42IDQtNC4zIDYuOS04LjMgNi4zYTcuNCA3LjQgMCAwMS00LjgtMi44YzEuOS43IDYuNiAxLjUgOS42LTEuNCAyLjItMi4xIDIuNC02IDEuOS03LjlhOCA4IDAgMDExLjYgNS44eiIvPjwvZz48cGF0aCBkPSJNMTM3LjEgNzYuNWMtLjItLjgtMi4zLS41LTIuMy0uNWwtNi40LjUtMS41LTUuN3MwLTEuNC0xLjItLjVsMS43IDYuMy0zLjMuMy0xLjYtNS44czAtMS40LTEuMi0uNUwxMjMgNzdsLTMuNy4zLjEgMy4yIDQuNi0uNiAyLjEgOGguMWMtLjIuNCAwIC45LjMgMS4xLjQuMi44IDAgMS0uM2guMXYtLjJjLjEtLjMgMC0uNi0uMi0uOGwtMi4xLTggMy4xLS40IDIuMyA4LjVoLjFjLS4yLjQgMCAuOC40IDEgLjQuMi44IDAgMS0uM2guMXYtLjJjLjEtLjMgMC0uNi0uMi0uOGwtMi4zLTguNSA1LjUtLjdjMS42IDAgMi0uOCAxLjgtMS44eiIgZmlsbD0iI2ZmZiIvPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNMTIzLjkgODBsLTQuNi41di0xLjRsNC0uNC4yLS4xek0xMjguMyA3OS40bC0zLjEuNC0uMy0xLjQgMy4xLS4zek0xMzQuNCA3OC43bC00LjcuNi0uNC0xLjQgNy41LS45YzAgLjEuOC45LTIuNCAxLjd6TTI5LjQgODkuM2wtMy40LjMuMS0xLjUgMi42LS4zLjMuMnpNMzAuMyA4Ny45bDMuNS0uNi41IDEuNC0zLjUuNHoiLz48Y2lyY2xlIGN4PSIzOCIgY3k9Ijk4IiByPSIxIi8+PGNpcmNsZSBjeD0iMzIuNyIgY3k9Ijk4LjIiIHI9Ii45Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDIiPjxwYXRoIGQ9Ik0xMjUuOCA3MS40czE5LjIgMS40IDE5LjYgMi44Yy4xLjQtMTguMiA5LjctMTcgOS4xIDAgMCAyLjQtNS44IDIuMS03LjFzLTQuNy00LjgtNC43LTQuOHoiIGZpbGw9IiM1ZTVlNWUiLz48cGF0aCBkPSJNMTI1LjIgNzEuM3MxOS4yIDEuNCAxOS42IDIuOGMtNSAxLTE0LjYgMi40LTE0LjYgMi40bC01LTUuMnoiIGZpbGw9IiNlMmUyZTIiLz48ZyBmaWxsPSIjNjAzODEzIj48cGF0aCBkPSJNMTMwLjYgNzkuMmwtMTEuNiAxdi00LjdsMTAuOC0uOHM1IC40IDUuMiAxLjItMi43IDMtNC40IDMuM3pNNTQuNiA4My43bC0zNi41IDJzLTIuOC4xLTMtMS42Yy0uMS0xLjUuOC0yLjQgMi42LTIuOUw1NCA3Ny41YTMuMiAzLjIgMCAwMTMuNCAyLjggMyAzIDAgMDEtMi44IDMuNHoiLz48L2c+PHBhdGggZD0iTTU0LjYgODMuN2wtMzYuNSAyYy0xLjggMC0yLjgtLjUtMy0xLjYgMTctMS4yIDQ0LjItMi40IDQyLjMtMy44IDAgLjEuNSAyLjctMi44IDMuNHoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTM4LjggODAuNGwtNS40LTUuOC0xNy4xLjEgNi4xIDYuNnpNMzkuNCA4My4ybC02LjYgNy45LTE3LjEgMS4yIDYuNi03Ljl6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0yMy44IDc2LjdjLjItLjIuNS0uMi43IDBsMi43IDIuOWMuMi4yLjIuNSAwIC43LS4yLjItLjUuMi0uNyAwbC0yLjctMi45YS41LjUgMCAwMTAtLjd6TTIwLjggNzYuN2MuMi0uMi41LS4yLjcgMGwyLjcgMi45Yy4yLjIuMi41IDAgLjctLjIuMi0uNS4yLS43IDBsLTIuNy0yLjlhLjUuNSAwIDAxMC0uN3pNMjYuOCA3Ni43Yy4yLS4yLjUtLjIuNyAwbDIuNyAyLjljLjIuMi4yLjUgMCAuNy0uMi4yLS41LjItLjcgMGwtMi43LTIuOWEuNS41IDAgMDEwLS43ek0yOS44IDc2LjdjLjItLjIuNS0uMi43IDBsMi43IDIuOWMuMi4yLjIuNSAwIC43LS4yLjItLjUuMi0uNyAwbC0yLjctMi45YS41LjUgMCAwMTAtLjd6TTMyLjggNzYuN2MuMi0uMi41LS4yLjcgMGwyLjcgMi45Yy4yLjIuMi41IDAgLjctLjIuMi0uNS4yLS43IDBsLTIuNy0yLjlhLjUuNSAwIDAxMC0uN3pNMjYuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMjMuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMjkuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMzIuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHpNMzUuMiA4NS43Yy4yLjIuMi41IDAgLjdsLTIuNyAyLjljLS4yLjItLjUuMi0uNyAwYS41LjUgMCAwMTAtLjdsMi43LTIuOWMuMi0uMi41LS4yLjcgMHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wMyI+PHBhdGggZD0iTTI2LjQgNzFsMi40IDI0LTIuNCAydjMuM3MwIDEuNyAyLjQgMi4zYzIuNS41IDcuMSAyIDE0LjIgMS40IDMuOC0uMyA3LjUtMS4zIDExLTIuOWEzIDMgMCAwMDEuOC0yLjVsLS45LTMuNi0yLjQtMi0yLjQtMjMiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmNiYjAwIj48cGF0aCBkPSJNMjguOSA3MS4ybDIuNSAyMy43LTMuNyAzczAgMS4zIDQuOSAyYzYuNyAyLjIgMTcuNy0uMSAyMC45LTEuOSAyLjUtLjkuNS0yIC41LTJsLTIuNS0zTDQ5IDcwLjJsLTIwLjEgMXoiLz48cGF0aCBkPSJNNTQuOSA5Ny4yYy4xIDEuNy01LjkgNC40LTEzLjQgNC44cy0xMy44LTEuNi0xMy45LTMuMiA1LjktMy40IDEzLjUtMy44IDEzLjYuNSAxMy44IDIuMnoiIG9wYWNpdHk9Ii41Ii8+PC9nPjxnIGZpbGw9IiNmZmQyMmQiIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGQ9Ik0zNC42IDkzYy0uOS4xLTEuNy0uNS0xLjktMS40bC0xLjEtMTNjMC0uOS44LTEuNiAxLjctMS42LjktLjEgMS43LjUgMS45IDEuNGwxIDEzYzAgLjktLjcgMS42LTEuNiAxLjZ6TTQwLjUgOTNjLS45LjEtMS43LS41LTEuOS0xLjRsLTEuMS0xM2MwLS45LjctMS42IDEuNi0xLjYuOS0uMSAxLjcuNSAxLjkgMS40bDEgMTNjLjEuOS0uNiAxLjYtMS41IDEuNnpNNDYuNCA5MmMtLjkuMS0xLjctLjUtMS45LTEuNGwtMS4xLTEzYzAtLjkuNy0xLjYgMS42LTEuNi45LS4xIDEuNy41IDEuOCAxLjRsMS4xIDEzYy4xLjktLjYgMS42LTEuNSAxLjZ6Ii8+PC9nPjxwYXRoIGQ9Ik0yOS43IDcyLjlzLTguMSAyLjItNi45LTQuNGMwIDAtNC45LTUuNSAxLjItNS41IDAgMCAxLjItNC40IDYuMSAwIDAgMCA0LjktNy43IDkuOCAxLjEgMCAwIDMuNy00LjQgNi4xIDIuMiAwIDAgNy42IDIuNCAyIDUuMVMzMS43IDc0IDI5LjcgNzIuOXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAuOSA3Mi40UzI0IDc0LjIgMjUuMSA2OWMwIDAtNC4xLTQuMyAxLTQuMyAwIDAgMS0zLjUgNS4yIDAgMCAwIDQuMS02LjEgOC4zLjkgMCAwIDMuMS0zLjUgNS4yIDEuNyAwIDAgNi40IDIgMS43IDRzLTE0IDItMTUuNiAxLjF6IiBmaWxsPSIjZmZlZmFlIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PGcgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik00MS4yIDY0LjRTNDMgNjQgNDMgNjdzLTMuMSAzLjktMy4xIDMuOS44LS45IDEuOS4xLTEuNSAxLjctMS41IDEuNyA2LjQtLjMgOC43LTIuNS0zLjYtMy4yLTMuNi0zLjIgMC0zLjEtNC4yLTIuNnpNMzEuMSA2NmMuNyAxLjkgMi43IDMgNC43IDIuNiAwIDAtMy41IDIuNC00LjctMi42ek0yNy40IDY3LjFjMS4yLjcgMi43LjUgMy44LS40IDAgMC0uNiAyLjYtMy44LjR6TTM3LjkgNjguNXMyLjQtLjggMS43LTIuOWMtLjEuMSAyLjIgMS45LTEuNyAyLjl6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDQiPjxwYXRoIGQ9Ik0xMTcuMSA2OC4xYzEuOSAxLjYgMi45IDEyIDEgMjAuOSAwIDAgNC43IDMuMiA2LjkgMy43bDMgLjljNS42IDEuNSAxNiAzLjQgMTYuMy03LjhsLTEtNS44Yy0uNS0yLjkuOC01LjItMi0xMC41cy04LjUtNS41LTEyLjYtMy45YzAgMC0uNi42LTIuMy0xLjJzLTcuMy0yLjEtOS4zIDMuN3pNMjYuMyA2OC43YTguNiA4LjYgMCAwMC0xLjMgNy42bC4zIDJzLTEwLjEtMS44LTkgNi4ybC4zIDIuMWMxIDYuNiAyIDkuNiA2LjQgMTEuNiA0LjggMi4yIDUtMi40IDguMS0xLjJzMTkuNyAxMC43IDIyLjQtNC41bC0uMi02LjVjLS4xLTMuMyAxLjctNS42LS41LTExLjlzLTguNS03LjQtMTMuMy02LjNjMCAwLS44LjUtMi4zLTEuN3MtNy44LTMuNC0xMC45IDIuNnoiLz48ZyBmaWxsPSIjMDEwMTAxIj48cGF0aCBkPSJNMTE3LjEgNjguMWMxLjkgMS42IDIuOSAxMiAxIDIwLjkgMCAwIDQuNyAzLjIgNi45IDMuN2wzIC45Yy0yLjYtLjEtMy41LTUuMS0zLTUuMyAwLTcuNi0xLjQtMTIuNS0xLjMtMTcuOGE1LjIgNS4yIDAgMDE1LTQuOXMtLjYuNi0yLjMtMS4yLTcuMy0yLjEtOS4zIDMuN3oiIG9wYWNpdHk9Ii4xNiIvPjxnIG9wYWNpdHk9Ii4zIj48cGF0aCBkPSJNMTE4LjUgODkuM3M1LjEgMyA2LjYgMy4zYzIuNS42IDE1LjEgNS41IDE4LjUtMi42LjQtMS40LjctMi45LjktNC4zLS42IDIuMS00LjYgNC4zLTguOSA0LjktNS44IDEtMTAuNC0yLjctMTMuOS0xLjZsLTIuOC0xLjItLjQgMS41ek0xOSA5NS4xYzEuMiAxLjMgMi41IDIuMyA0IDMuMSA0LjggMi4yIDUtMi40IDguMS0xLjIgMi43IDEgMTUuNyA4LjUgMjAuOC4xYTI1IDI1IDAgMDAxLjYtNC42Yy0xIDIuMi01LjggNC0xMC41IDQtNi42LjEtMTEtNC42LTE1LTQtNi42IDMuNS05IDIuNi05IDIuNnoiLz48L2c+PGcgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0xMjUuMSA5Mi43Yy0zLS4zIDE4LjkgNyAxOS40LTYuOWwtMS01LjhjLS41LTIuOS44LTUuMi0yLTEwLjVzLTguNS01LjUtMTIuNi0zLjljMTMuMS0uOCAxMC43IDI3LjItMy44IDI3LjF6TTMxIDk3Yy0zLjItLjggMTkuNyAxMC43IDIyLjQtNC41bC0uMS02LjVjLS4xLTMuMyAxLjctNS42LS41LTExLjlzLTguNS03LjQtMTMuMy02LjNDNTQuMSA2OS4xIDQ3IDk5LjYgMzEgOTd6Ii8+PC9nPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzA1Ij48cGF0aCBkPSJNMTI0LjYgODAuN3MyMCAuMyAxOC42LTEyLjVjMCAwIDkuNiAxMS4xIDEgMjAuOXMtMjcuMyA2LjEtMjcuMyA2LjFsNy43LTE0LjV6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE0My4yIDY4LjJjLjMgMTMuNy0yMC4yIDEyLjEtMjAuMiAxMi4xbC0xLjIgNS43LTQuOSA5LjJzMTguNyAzLjYgMjcuMy02LjEtMS0yMC45LTEtMjAuOXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTQzLjIgNjguMmM4LjQgMjIuNC0yMS43IDE5LjQtMjEuNyAxOS40bC4zLTEuNy00LjkgOS4yczE4LjcgMy42IDI3LjMtNi4xLTEtMjAuOC0xLTIwLjh6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMTguNSA3NXM3LjEgMSA3LjMgMTEuMi0xMSAxMS44LTExIDExLjhhMzkuNiAzOS42IDAgMDAzLjctMjN6TTM4LjIgNzguMWw5LjYtNHM4LjYuOSA5LjUgMTEuNC01LjUgMTIuOS01LjUgMTIuOWwtMTAuMy4ycy00LjUtMy4xLTUuMi0xMS4zIDEuOS05LjIgMS45LTkuMnoiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMzguMiA3OC4xbDkuNi00YzUgMS41IDkgNC4zIDkuNSAxMS40LS44LTEuNi0yLjMtMi4zLTQuNS0yLjJMNDggODQuNGwtNS43IDEuNC01LjkgMS40Yy40LTUtLjEtNy4zIDEuOC05LjF6IiBvcGFjaXR5PSIuMSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC00LjYgNDIgODguMikiIGN4PSI0MiIgY3k9Ijg4LjIiIHJ4PSI0LjkiIHJ5PSI5LjEiIG9wYWNpdHk9Ii4xNiIvPjxwYXRoIGQ9Ik00MS43IDgwLjZzLTE1LjYgMi4xLTIwLTIuOS0uMi0xMy45LS4yLTEzLjktMTEuMSA2LjQtMTAgMTkgMjUgMTMuOCAzMC4zIDEyLjRjMCAwIDMuNi0xLjggMy4zLTcuNSAwLTUuOC0zLjQtNy4xLTMuNC03LjF6Ii8+PHBhdGggZD0iTTQxLjcgODAuNnMtMTUuNiAyLjEtMjAtMi45LS4yLTEzLjktLjItMTMuOS0xMS4xIDYuNC0xMCAxOSAyNSAxMy44IDMwLjMgMTIuNGMwIDAgMy42LTEuOCAzLjMtNy41IDAtNS44LTMuNC03LjEtMy40LTcuMXoiIG9wYWNpdHk9Ii4zIi8+PC9nPjxwYXRoIGQ9Ik00NSA4Ny43Yy0xNS45IDMuOC0zOS44LTIuNi0yMy41LTIzLjggMCAwLTExLjEgNi40LTEwIDE5czI1IDEzLjggMzAuMyAxMi40YzAgMCAzLjYtMS44IDMuMi03LjZ6IiBvcGFjaXR5PSIuMyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDYiPjxwYXRoIGQ9Ik00MiA2Ni41TDI2IDUxYy0uOS0uMi00IDktNCAxOXM0IDE1IDYgMTdsNyA3YzMgMyA2IDQgMTAgNiAzIDEgNCAyIDQtMnMtNC01LTUtMThsMS05LTMtNC41ek0xMTQgNjEuMWMzLjYtNC43IDE5LjctMTEgMTkuNy0xMXMyLjIgMTIuMi00LjggMjguOGMtMi41IDYtNiAxNC41LTkgMTYuOC0zIDIuMy0zLjguMy0zLjguMy0xLjEgMCA3LjktMTktMi4xLTM0Ljl6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTI2IDUyLjJDNDEgNjkgNDMuNiA3OC43IDQzLjYgNzguN2wxLjQtOC42UzI5IDUyIDI2IDUyLjJ6TTEyMS42IDU1LjhsOC42LTEuN2MxIDYtMS42IDE1LjItMy4xIDIwLTIuNyA4LjMtNC45IDEyLjktNy4xIDE3LjktMi4yIDUtMy45IDQtMy45IDQgMSAxLjggNC43LjggOC41LTcuNCAyLjQtNS40IDQuOC0xMC40IDYuNC0xNS44IDAgMCAzLjktMTAuOCAyLjctMjIuNy00LjEgMS43LTguMiAzLjUtMTIuMSA1Ljd6TTI1Ljk5MyA4NC40NTNjMjIuMDYgMTguNjMzIDIxLjMwMyAxMy42ODcgMjEuNDI2IDkuMDc5IDIuMDA3IDIuNDYyIDIgNy4xNS42ODcgNy4yMDEtMS44MDUuMTQ3LTkuOTA0LTMuNzgtMTEuNzk2LTUuNjUzLTMuNzg0LTMuNzQ3LTcuMjItNi43NDYtMTAuMzE3LTEwLjYyN3oiLz48L2c+PHBhdGggZD0iTTQ0IDc0Yy0xLTItMTUtMTItMTUtMTJzLTIgMTYgNCAyMmMyLjMgMi4zIDQuOCA0LjUgNy40IDYuNUw0NCA5MnMzLTEgMC01Yy0yLjEtMi45LS45LTUuOC4xLTcuNmwuOC0xLjVDNDUgNzcgNDUgNzYgNDQgNzR6TTExOC41IDcwLjZjLjUtMS43IDkuMi04IDkuMi04cy0uOCAxMC44LTMuMyAxNi4xYy0xIDIuMS0yLjMgNC40LTQgNi4yLS41LjYtMi4zIDEuNS0yLjMgMS41bC41LTMuN2EzOC44IDM4LjggMCAwMC0uMS04LjlsLS4zLTIuMmMwLS4zIDAtLjUuMy0xeiIvPjxnIGZpbGw9IiMwMTAxMDEiPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNDQgNzRjMiAxLTE1LTEyLTE1LTEyLS43LS4xLS44IDE3LjkgNCAyMmw3LjQgNi41TDQ0IDkyYy0xMy03LjItMTkuMi0yNy4yIDAtMTh6TTExOC41MSA3MC42NTNjLjMyOC0xLjYzNCA5LjI1My04LjA4NSA5LjI1My04LjA4NS0uNTQ4IDQuNDczLTEuMDQgMTEuODctMy41MDQgMTYuNTE1LTIuMTkgNC4yMTUtMy4wMTIgNC45MDMtMy43NzggNS43NjMtLjU0OC42MDItMS45NzEgMS4yOS0xLjk3MSAxLjI5IDcuMTE3LTYuMTkzIDEwLjUxMi0yMy4zOTYgMC0xNS40ODN6Ii8+PC9nPjxnIG9wYWNpdHk9Ii40Ij48cGF0aCBkPSJNMzkgNzVjLTIgMC00IDMtMiA2czYgMyA2IDMtMS0uOS41LTMuNVM0MSA3NSAzOSA3NXpNMTIxLjI0OCA3MS41MTNjMS4wOTQgMCAyLjE5IDIuNTgxIDEuMDk0IDUuMTYycy0zLjUwMyAyLjU4LTMuNTAzIDIuNThsLS4wNTUtMy4wMWMtLjExLTIuNTgxIDEuMzY4LTQuNzMyIDIuNDYzLTQuNzMyeiIvPjwvZz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wNyI+PHBhdGggZD0iTTEzNy4xIDY0LjNzNy4yIDYuMyA2LjMgMTUuMmMwIDAtMS44IDkuMi0yLjQgMTAuNXMtMy4xIDguNy05LjEgOS45bC00LjEuNWMtLjggMS4zLTEuOCAyLjQtMyAzLjMtMi40IDItNi42IDIuNS03LjggMS45cy0uNiAxLjMtMS45LjdsLTQuNi0xLjZjNS01LjggNy45LTEzLjEgOC43LTIyLjhsMS4yLTEuMiA1LjctNy41YzIuMS0yLjkgNi44LTQuNyA3LjctNS4xIDAgMC01LjEgNi4yLTMuNSA3LjdzNC40LjQgNC40LjQgNC4xLS4zIDIuNC0xMS45ek0xOS45IDY0LjNzLTcuMiA2LjMtNi4zIDE1LjJjMCAwIDEuOCA5LjIgMi40IDEwLjVzMy4xIDguNyA5LjEgOS45bDQuMS41Yy44IDEuMyAxLjggMi40IDMgMy4zIDIuNSAyIDYuNSAyLjUgNy44IDEuOXMuNiAxLjMgMS45LjcgNy0xLjYgOC4xLTQuNGMuNi0xLjcuNi0zLjctLjEtNS40IDAgMC00LjEtLjUtNS43IDEgMCAwLS44LTMuNS00LjMtMi43IDAgMCAzLjItOC40LTMuMi0xNC4xTDMxIDczLjJjLTIuMS0yLjktNi44LTQuNy03LjctNS4xIDAgMCA1LjEgNi4yIDMuNSA3LjdzLTQuNS40LTQuNS40LTQuMS0uMy0yLjQtMTEuOXoiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTEzNy4xIDY0LjNzNy4yIDYuMyA2LjMgMTUuMmMwIDAtMS44IDkuMi0yLjQgMTAuNXMtMy4xIDguNy05LjEgOS45bC00LjEuNWMtMS44LjYtMy45LS4xLTYtMS4yIDMuNSAxIDIwLjctMTQuOCAxMi45LTIyLjggMCAwIDQuMS0uNSAyLjQtMTIuMXpNMjkgNzcuOXMyLjYtMS40IDQtMS4xYzAgMC0yLjktNS42LTUuOS02LjQgMCAwIDMuMyA0LjcgMS45IDcuNXoiLz48L2c+PGcgb3BhY2l0eT0iLjIiPjxnIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik0xMjcuOCAxMDAuNGMtLjggMS4zLTEuOCAyLjQtMyAzLjMtMi40IDItNi42IDIuNS03LjggMS45cy0uNiAxLjMtMS45LjdsLTQuNi0xLjYgMS43LTIuNHMxLjktLjMgMi0xYzIuMSAzLjMgNy4xLTEuOCA1LjYtMy41IDAgMCAzLjkgMy4xIDggMi42ek0yOS4yIDEwMC40Yy44IDEuMyAxLjggMi40IDMgMy4zIDIuNSAyIDYuNSAyLjUgNy44IDEuOXMuNiAxLjMgMS45LjcgNy0xLjYgOC4xLTQuNGMuNi0xLjcuNi0zLjctLjEtNS40LTEuNCA2LjQtNi45IDYuNy03LjIgNC44LTIuMSAzLjMtNy4xLTEuOC01LjYtMy41LjEgMC0zLjggMy4xLTcuOSAyLjZ6Ii8+PC9nPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0xMjkuNyA3Ny4zcy0zLjUtLjgtNS40LS4xYzAgMCAzLjUtNi41IDcuNC04LjEgMCAwLTQgNS43LTIgOC4yek0xOS45IDY0LjNzLTcuMiA2LjMtNi4zIDE1LjJjMCAwIDEuOCA5LjIgMi40IDEwLjVzMy4xIDguNyA5LjEgOS45bDQuMS41YzEuOC42IDMuOS0uMSA2LTEuMi0zLjUgMS0yMC43LTE0LjgtMTMtMjIuOC4xIDAtNC0uNS0yLjMtMTIuMXoiLz48L2c+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDgiPjxwYXRoIGQ9Ik0zNC41IDExNi45TDMyLjkgMTA0bDItLjQgMS41IDEzcy0uNCAyLTEuOS4zeiIgZmlsbD0iIzMwMzAzMCIvPjxwYXRoIGQ9Ik00Ni44IDcxLjdjMS42IDIuMyAyIDUuMSAxLjIgNy43bC0uNCAyIDQuMy4xYzMgLjkgMy4yIDggLjYgMTAuMi0xLjEuNi0yLjEgMS40LTMgMi4yYTI1IDI1IDAgMDEtOC40IDYuM2wtMy4zIDEuNGMtNiAyLjQtMTcuNCA1LjktMTkuMy02LjVsLjMtNi42Yy4yLTMuMy0xLjUtNS43LjgtMTJzOC44LTcuMyAxMy42LTZjMCAwIC44LjUgMi40LTEuN3M4LjMtMy4zIDExLjIgMi45eiIgZmlsbD0iI2Q4ZDhkOCIvPjxwYXRoIGQ9Ik0zOS4xIDEwMS4xYy01LjYgMi40LTE4LjQgNy4yLTIwLjQtNi4xbC40LTYuN2MuMi0zLjMtMS41LTUuNy44LTEyczIuNC02LjQgMTMuNi02YzEwLjMuMyA1LjMgMTYuMyA3LjIgMjcuMSAwIDEuMS0uNyAzLjMtMS42IDMuN3oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDEuMiAxMDAuMmMzLjItLjctMjAuMiAxMC4zLTIyLjUtNS4ybC4zLTYuNmMuMi0zLjMtMS41LTUuNy44LTEyczguOC03LjMgMTMuNi02Yy0xNC44LjktOC40IDMxLjkgNy44IDI5Ljh6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNTIuNiA5MS45cy04LjMgNy4yLTExLjQgOC40Yy0yLjcgMS0xNi4yIDguMS0yMS0uNS0uNi0xLjUtMS4yLTMuMS0xLjUtNC43LjkgMi4yIDUuNyA0LjIgMTAuNiA0LjMgNi42LjMgMTEuMi00LjMgMTUuMy0zLjYgMi41LTEuNiA1LjItMi45IDgtMy45eiIgb3BhY2l0eT0iLjE2Ii8+PHBhdGggZD0iTTMzIDU0LjdsOC42LjMtNS4zIDYuNiAyLjEgOC4xLTcuOC0zLjItNyA0LjguNS04LjQtNi42LTUuMiA4LjItMi4yIDMtOHoiLz48cGF0aCBkPSJNMzAuMyA1NC4zbDEuMyAyYy4yLjMuNi41IDEgLjVsMi4yLjFjLjYgMCAxIC42IDEgMS4ybC0uMi43LTEuNSAyYy0uMy4yLS4zLjUtLjMgMWwuNiAyLjNjLjEuNS0uMSAxLjEtLjcgMS4zaC0uOGwtMi4xLTFhLjkuOSAwIDAwLTEgLjJsLTIgMS4zYy0uNS4zLTEuMi4yLTEuNi0uMi0uMi0uMi0uMi0uNS0uMi0uOGwuMi0yLjNjMC0uNC0uMi0uNy0uNS0xTDIzLjggNjBjLS40LS4zLS41LTEtLjMtMS42bC42LS40IDIuMy0uNmMuMy0uMS42LS4zLjgtLjdsLjgtMi4yYy4yLS42LjktLjkgMS41LS43LjQgMCAuNy4xLjguNHoiIG9wYWNpdHk9Ii41IiBmaWxsPSIjZmZmIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wOSI+PHBhdGggZD0iTTUyLjUgMTAzLjFzLjkuMSAxLjktMS42LjUtNS4zLTIuMS02LjUtMy4zLTMuOS00LjgtNi43LTcuNC03LjgtMTktOS43LTEyLjktNi41LTEzLjctNy41LTIuNSA3LjkgMS40IDE1LjRTMjYuNyAxMDAgMzYgOTcuMnMxMi40IDIgMTIuNCAyIDIuMyAzLjcgNC4xIDMuOXpNMTE5LjUgODJjMy4yLTEgNi41LTEuNiA5LjktMS44IDEyLTEgMTMuOC01LjQgMTQuNy02LjNzMS45IDgtMi42IDE1LjEtMTEuOSAxMi41LTIxLjIgOWMtMS40LS41LTIuOC0uOS00LjMtMS4xYTM1LjIgMzUuMiAwIDAwMy41LTE0Ljl6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjE0Ij48cGF0aCBkPSJNNTIuNSAxMDMuMXMuOS4xIDEuOS0xLjYuNS01LjMtMi4xLTYuNS0zLjMtMy45LTQuOC02LjctNy40LTcuOC0xOS05LjctMTMuNS05LjMtMTMuNy03LjVjMS4zIDE2LjMgMjkuNiAxMS41IDM3LjcgMzJ6TTExOS4yIDgyLjRjMy42LTEuMiA3LjMtMS45IDExLTIuMiAxMi0xIDE0LjctOC4xIDE0LjctNi4zLTEuOCAxMC41LTE0LjkgMTEuMS0yNi40IDE2IDEuMi00LjMgMS4yLTUuMi43LTcuNXoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xMCI+PHBhdGggZD0iTTYzLjMgNzYuMXMuOCAxNC4xLTE3LjYgMjEuMS0yNy44LTUuNS0yNy44LTUuNS0uNS0xNSAxOC40LTIxIDI3IDUuNCAyNyA1LjR6IiBmaWxsPSIjZGQ4MzEzIi8+PHBhdGggZD0iTTYzLjMgNzYuMXMuOCAxNC4xLTE3LjYgMjEuMS0yNy44LTUuNS0yNy44LTUuNWMyMC45IDIuMSAzNC40LTMuOCA0NS40LTE1LjZ6IiBvcGFjaXR5PSIuNSIgZmlsbD0iIzc1NGMyNCIvPjxwYXRoIGQ9Ik00Ni44IDc3LjZoLS4ybC0uNC4xYy0uMi4xLS4zLjQtLjMuNmwxLjMgMy43LTUgMS44LTEuOS01LjFjLS4xLS4zLS4zLS40LS42LS4zbC0uNC4xYy0uMi4xLS40LjQtLjMuN2wyIDUuMS01LjggMi4xLTEuMS0zLjFjLS4xLS4zLS4zLS40LS42LS4zbC0uNC4xYy0uMy4xLS40LjQtLjMuNmwxLjIgMy4yLTQuNiAxLjdjLS4zLjEtLjQuMy0uMy42bC4xLjRjLjEuMi40LjMuNi4zbDQuNi0xLjcgMS40IDMuN2MuMS4zLjMuNC42LjNsLjQtLjFjLjMtLjEuNC0uMy4zLS42bC0xLjQtMy44IDUuNy0yLjEgMiA1LjJjLjEuMy4zLjQuNi4zbC4zLS4yYy4zLS4xLjQtLjMuMy0uNmwtMi01LjIgNS4xLTEuOSAxLjIgMy4zYy4xLjMuMy40LjYuM2wuNC0uMWMuMy0uMS40LS4zLjMtLjZMNDkgODIuOGw1LTEuOWMuMy0uMS40LS4zLjMtLjZsLS4xLS40Yy0uMS0uMy0uMy0uNC0uNi0uM2wtNSAxLjktMS40LTMuNmMwLS4yLS4yLS4zLS40LS4zeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTEiPjxwYXRoIGQ9Ik0xNC4yIDgwLjNsNi4xLS45YzEuNy0uMiAzLjMuOSAzLjUgMi42LjIgMS43LS45IDMuMy0yLjYgMy41bC02LjEuOWMtMS43LjItMy4zLS45LTMuNS0yLjYtLjItMS43LjktMy4yIDIuNi0zLjV6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48ZyBmaWxsPSIjZTBlMGUwIj48cGF0aCBkPSJNMzYuMyA5Mi4zTDM2IDk5Yy0uMy0uMyAyLjcgMi4zIDUgMGwtLjQtNy44LTQuMyAxLjF6TTEyOS42IDk3LjFsLS44IDYuN2MtLjMtLjMgMi41IDIuNSA1IC4zbC4xLTYuMWE2IDYgMCAwMS00LjMtLjl6TTM0IDQyLjJzLjktNC4zIDMuNS0xLjcgNS44IDE2LjEgMi40IDIzLjljLS44IDQuNy0uNiA1LjctLjYgNS43LTEuMS41LTIuNC41LTMuNSAwTDM0IDQyLjJ6TTEyOS41IDUwLjhsLS44IDE1LjRzLS4yIDQuNiA0LjQgNC45IDUuNS0yLjggNS42LTQuM2wuOC0xNS40cy0xLjIuMy0xLjQgNC4yLTEuMiA3LjYtMiA3LjZoLS42Yy0uNSAwLS45LS4yLS44LTIuNC4yLTMuMS41LTkuMi0uMy05LjNzLTEuMyA5LjItMS4zIDkuMi0uMSAyLjMtMS43IDIuMi0xLjEtOC41LTEuMS04LjUuNC00LS44LTMuNnpNMTMwLjkgNzdsLTIuNCA3LjggMiAuMiAyLjItNy4zeiIvPjwvZz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMzcuNSA0MC40UzQ0IDUwIDM5LjkgNjQuM2MuNSA1LjctLjMtMjIuMi0yLjQtMjMuOXoiIG9wYWNpdHk9Ii4xIi8+PGcgb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik0zNC42IDQyYy4zIDAgLjUuMi41LjVsMS43IDI2LjljMCAuMy0uMi41LS41LjVzLS41LS4yLS41LS41bC0xLjctMjYuOWMwLS4yLjItLjQuNS0uNXpNMTM5LjUgNTEuM3MtLjkgMy0xLjQgMTAuN2MwIDAgMCA4LjQtMi42IDguNyAwIDAgMi44LjQgMy4zLTguOGwuNy0xMC42ek0xMzQuNCA2MC4ybC41LTguNXMtLjQgOC41LS4xIDEwLS41IDEuNS0uNSAxLjVsLjEtM3oiLz48L2c+PHBhdGggZD0iTTI3IDY4LjJhNyA3IDAgMDAtMS43IDUuOWwuMSAxLjZzLTcuOS0yLjMtNy42IDQuMmwuMSAxLjdjLjIgNS4zLjggNy44IDQuMSA5LjcgMy42IDIuMSA0LjItMS40IDYuNS0uMnMxNC42IDEwLjIgMTguMS0xLjZsLjUtNS4yYy4yLTIuNiAxLjgtNC4zLjYtOS40cy02LjEtNi42LTEwLTYuMWMwIDAtLjYuMy0xLjctMS42cy02LTMuNS05IDF6Ii8+PC9nPjxwYXRoIGQ9Ik0yNSA4MC40bDQuNC0uNGMuMiAwIC41LjIuNS40cy0uMi41LS40LjVsLTQuNC40Yy0uMiAwLS41LS4yLS41LS40cy4xLS40LjQtLjV6TTI1LjIgODIuMmw0LjQtLjRjLjIgMCAuNS4yLjUuNHMtLjIuNS0uNC41bC00LjQuNGMtLjIgMC0uNS0uMi0uNS0uNCAwLS4zLjItLjUuNC0uNXpNMjUuNSA4My45bDQuNC0uNGMuMiAwIC41LjIuNS40cy0uMi41LS40LjVsLTQuNC40Yy0uMiAwLS41LS4yLS41LS40cy4xLS40LjQtLjV6Ii8+PHBhdGggZD0iTTEyNCA3My41YTYuOCA2LjggMCAwMC0xLjYgNS44bC4xIDEuNi0zLjMtLjMtMS40IDcuN2MuOC42IDEuNSAxLjIgMi4xIDEuOS42IDEgMy41IDQuNCA1LjggNS41bDIuNCAxLjNjNC40IDIuNCAxMi43IDYgMTUuMi0zLjNsLjQtNS4xYy4yLTIuNSAxLjctNC4yLjQtOS4ycy02LTYuMy05LjgtNS44YzAgMC0uNi4zLTEuNy0xLjVzLTUuOC0zLTguNiAxLjR6IiBmaWxsPSIjZDhkOGQ4Ii8+PHBhdGggZD0iTTEyNy4yIDk2LjVjNCAyLjMgMTMuNCA3LjEgMTYuMS0yLjhsLjQtNS4xYy4yLTIuNSAxLjctNC4yLjQtOS4ycy0xLjMtNS05LjgtNS44Yy03LjgtLjctNS41IDExLjktNy44IDIwLS4zLjguMSAyLjUuNyAyLjl6IiBmaWxsPSIjZmZmIi8+PGcgb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMjguNCA5MWMtMi41LS45IDE0LjcgMTAuMiAxOC4xLTEuNmwuNS01LjJjLjItMi42IDEuOC00LjMuNi05LjRzLTYuMS02LjYtMTAtNi4xQzQ5IDcwLjkgNDAuOCA5NC40IDI4LjQgOTF6TTEyNS43IDk1LjdjLTIuNC0uOCAxNC40IDkuNiAxNy42LTEuOWwuNC01LjFjLjItMi41IDEuNy00LjIuNC05LjJzLTYtNi4zLTkuOC01LjhjMTEuMSAyIDMuNSAyNS04LjYgMjJ6Ii8+PC9nPjxnIG9wYWNpdHk9Ii4xNiI+PHBhdGggZD0iTTE5IDg4LjRjLjggMS4xIDEuOCAyIDIuOSAyLjggMy42IDIuMSA0LjItMS40IDYuNS0uMiAyIDEuMSAxMS43IDggMTYuNCAxLjkuNy0xLjEgMS4yLTIuMyAxLjctMy41LTEgMS42LTQuOSAyLjctOC43IDIuMy01LjItLjUtOC4zLTQuNi0xMS41LTQuNC01LjQgMi4xLTcuMyAxLjEtNy4zIDEuMXpNMTE3LjggODguM3M1LjcgNi4yIDcuOSA3LjRjMiAxIDExLjYgNy42IDE2IDEuNWEyNiAyNiAwIDAwMS42LTMuNGMtLjkgMS42LTQuNyAyLjctOC40IDIuNC01LjEtLjMtOC4xLTQuMy0xMS4zLTQuMWEyNi4zIDI2LjMgMCAwMC01LjgtMy44eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzEyIj48cGF0aCBkPSJNNDIgNjYuNWMtMi4xLTQtNi42LTYuMi0xMS01LjUtOCAxLTEwIDQtMTIgOXM3IDE3IDcgMTdsNiA2YzEgMSAwIDcgNCA5czEzIDAgMTMtNC00LTUtNS0xOGwxLTktMy00LjV6TTExNCA2MS4xczE0LjMtNy40IDE5LjctMWM1LjQgNi40LTUuNSAxOC4xLTUuNSAyNC41IDAgNi40LjUgOS4zLTUuMyAxMi4xLTcuMSAzLjUtNi44LS43LTYuOC0uNy0xLjEgMCA2LjYtMTktMi4xLTM0Ljl6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNNDQgNzRjLTEtMi02LTctMTItNHMtMyAxMCAxIDE0YzIuMyAyLjMgNC44IDQuNSA3LjQgNi41TDQ0IDkyczMtMSAwLTVjLTIuMS0yLjktLjktNS44LjEtNy42bC44LTEuNUM0NSA3NyA0NSA3NiA0NCA3NHpNMTE4IDY5LjdjLjUtMiAzLjYtNi43IDcuMy0zLjggMy43IDIuOCAxLjkgOS42LS42IDEzLjQtMS40IDIuMi0zLjIgNS00LjYgNi4yLS43LjYtMi41IDEuMy0yLjUgMS4zcy4zLTEuNS41LTQuNmE0OC42IDQ4LjYgMCAwMC0uNC05LjdjLS4xLTEuMy0uMy0xLjYuMi0yLjh6Ii8+PHBhdGggZD0iTTQyIDY2LjVjLTIuMS00LTYuNi02LjItMTEtNS41IDEzIDQgMTQgMzIgMTMgMTlsMS05LTMtNC41eiIgb3BhY2l0eT0iLjEiLz48ZyBmaWxsPSIjMDEwMTAxIj48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTMxIDYxYy04IDEtMTAgNC0xMiA5czcgMTcgNyAxN2w2IDZjMSAxIDAgNyA0IDkgMS44IDEgNi42IDEuMSAxMC4yLS42IDMuNy0xLjggMy0zLjkgMi4xLTYuMyAxIDQuNy0xMi41IDguMy0xMy42LjZDMzMuOCA4OS43IDIyIDgwLjIgMjIgNzNjMC04IDQuOS04LjkgOS0xMnpNMTE4LjYgNTkuMnM5LjktMS40IDExLjYgNC40YzIgNi43LTMuOCAxMS43LTQuOCAxNi43UzEyNSA4NyAxMjQgOTJjLS40IDIuOC0yLjQgNS01LjEgNS45IDAgMCA5LjctMS4xIDkuMy05LjYtLjQtNy43IDEuOS0xMC4yIDMuNy0xMy45IDEuOC0zLjYgNS04LjkgMi4xLTEzLjgtMi42LTQuNy0xMi0yLjctMTUuNC0xLjR6Ii8+PC9nPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNDQgNzRjLTEuNS0yLjQtNi4xLTYuOC0xMi00LTYgMy0zIDEwIDEgMTQgMi4zIDIuMyA0LjggNC41IDcuNCA2LjVMNDQgOTJjLTEzLTcuMi0xOS4yLTI3LjIgMC0xOHpNMTE3LjkgNjkuNjg1Yy4xMjQtLjQ4IDMuMzg4LTcuMDk4IDcuMzkxLTMuODM3IDMuNjM0IDIuODc4IDEuODQ4IDkuNTkzLS42MTYgMTMuNDMtMS40MTYgMi4yMDYtMy4yNjQgNS4wODQtNC41NTcgNi4yMzUtLjc0LjY3Mi0yLjUyNiAxLjI0Ny0yLjUyNiAxLjI0NyA4LjE5Mi02LjcxNSAxMi4xMzQtMjUuOS4zMDgtMTcuMDc1eiIvPjwvZz48ZyBvcGFjaXR5PSIuNSI+PHBhdGggZD0iTTM5IDc1Yy0yIDAtNCAzLTIgNnM2IDMgNiAzLTEtLjkuNS0zLjVTNDEgNzUgMzkgNzV6TTEyMC45OCA3MC42NDVjMS4yMzIgMCAyLjQ2MyAyLjg3NyAxLjIzMiA1Ljc1NXMtNC4wMDQgMi44NzgtNC4wMDQgMi44NzggMC0xLjkxOS0uMTIzLTMuNTVjLS4zNy0yLjY4NSAxLjY2My01LjA4MyAyLjg5NS01LjA4M3oiLz48L2c+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTMiPjxwYXRoIGQ9Ik00Ni43IDY3LjJzLTguNC42LTkuOSA3LjdjMCAwLTguNS4xLTEyLjEgNi40TDE2IDg0LjlsLjIgMyAxNy40IDE4LjggMS40IDQuOXM0LjIgNC45IDkuMyA1LjZsNi43LTYuN3MtLjQtNS0yLjQtNS44LTcuMy0zLjUtOC4zLTMuNC02LTEyLjYtNi0xMi42IDEyIDYuNyAxNi42LTYuMmMwLS4xIDguOC0xNC44LTQuMi0xNS4zek0xMTcuMSA2N2wuNS4yYzMuMy45IDUuOCAzLjUgNi43IDYuOCAwIDAgOC41LS4xIDEyLjIgNmw4LjkgMy40LS4xIDMtMTYuOSAxOS4zLTEuMiA1cy0xLjEgMy02LjIgMy43bC05LjgtNC40cy4yLTUgMi4zLTUuOSA3LjItMy43IDguMi0zLjYgNS42LTEyLjggNS42LTEyLjgtNC40IDIuNi05IDEuN0MxMjAgNzggMTE4IDc0IDExNy4xIDY3eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PGcgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zNy43IDk2Yy44IDIgMS41IDMuMiAyLjMgNC42LTQuOCAxLTYuMiAzLTcgNS45bC00LTQuM2MxLjMtNC40IDQtNS44IDguNy02LjJ6TTEzMy4xIDEwMWMtMS42IDEuNS0yLjUgMi42LTMuNiAzLjgtMi41LTQuMi00LjgtNC43LTcuOS00LjRsMi43LTUuNGM0LjUtLjMgNi43IDEuNyA4LjggNnoiLz48L2c+PGcgZmlsbD0iIzAxMDEwMSI+PHBhdGggZD0iTTQ2LjcgNjcuMmM2LjMgMyA1LjEgMTQuNS0yLjEgMTMtLjQgMi45LTEuNSA3LjEtOS44IDYtMy4xLjgtNS43IDEuMi01LjcgMS4ybDkuMSAxNC44YzUuOSAxLjYgMTAuNSA0LjMgMTIuOCA4LjMgMCAwLS40LTUtMi40LTUuOC0yLS44LTcuNS0zLjUtOC41LTMuNS0xLS40LTUuOS0xMi42LTUuOS0xMi42czEyIDYuOCAxNi43LTYuMWMtLjEtLjIgOC44LTE0LjctNC4yLTE1LjN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMTcuNCA2OS40czQuOCAyLjggNS44IDYuOGMwIDAgNyAxIDkgNmwzIDEtMTEgMTktOCA1YTExIDExIDAgMDAtMyAzLjhsLTItMXMuMS01LjggMy4yLTYuMmMyLjYtMS4zIDYuNS0zLjQgNy42LTMuNCAyLjItNCAzLjctOC40IDUuMy0xMi43YTEzLjcgMTMuNyAwIDAxLTkgMS43YzEuMi03LjEuOC0xMy4xLS45LTIweiIgb3BhY2l0eT0iLjE1Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTQiPjxwYXRoIGQ9Ik0zMCA3MXM2LTUgMTAgMi0xIDEyLjEtMSAxMi4xIDExLjEgMTUuMyAxOS4yIDE2LjJjMCAwIDMuMy00LjkgMTAuMi0xLjUgNyAzLjQgMy44IDkuNSAzLjggOS41cy0yIDQtOSA0LTI0LjEtMTMtMzAuMS0yNUMyNyA3Ni4xIDI5IDczIDMwIDcxeiIvPjxwYXRoIGQ9Ik0zMCA3MXM2LTUgMTAgMi0xIDEyLjEtMSAxMi4xIDExLjEgMTUuMyAxOS4yIDE2LjJjMCAwIDMuMy00LjkgMTAuMi0xLjUgNyAzLjQgMy44IDkuNSAzLjggOS41LTQuMy03LjUtNy44LTYuNy0xNS4yLTYuMi0xMi0zLjItMjEuNi0xNC40LTIwLTE2LjggMCAwIDUuMy0xNC42LTctMTUuM3oiIG9wYWNpdHk9Ii4yIiBmaWxsPSIjMDEwMTAxIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTI2LjcgNTUuNmEyMiAyMiAwIDAwLTkuNyAxMyIvPjxwYXRoIGQ9Ik0zMCA1OS4yYTE3LjkgMTcuOSAwIDAwLTcuOSAxMC43IiBvcGFjaXR5PSIuNiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE1Ij48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0xMzkuNSA2MS41bC03LjQgMTMuMy0xMi44IDcuN3MtLjYgNC42LTEgNS45Yy0xLjEgNCAyMC4xIDIuMyAyMi4zLTEuN2wtMi44LTQuNyAxMS4yLTkuNmMxLjQtMi41LjktMy43LTEuOS0zLjRsLTEwLjkgOC4xIDYuOC0xMy40Yy42LTIuOC0yLTMuMy0zLjUtMi4yeiIvPjxwYXRoIGQ9Ik0xMTkuNCA4Mi40bDYuMy05LjhjLjgtLjkgMS44LTEgMy4xLS40YTE0Mi4yIDE0Mi4yIDAgMDA4LjIgNi41cy0uNiAyLjgtNC40IDJMMTI5IDgwcy42IDMuMS0zLjQgMy43LTYuMi0xLjMtNi4yLTEuM3pNMjUuOCA2My43TDM0IDc3LjNsMTQuNiA3LjZzLjYgNC44IDEgNi4xYzEuMiA0LjEtMjEuNiAzLTI0LTFsMS42LTUuMS0xMi43LTkuNmMtMS42LTIuNS0uOS0zLjggMi4zLTMuNWwxMi40IDguMS03LjUtMTMuN2MtLjYtMyAyLjMtMy42IDQuMS0yLjV6Ii8+PHBhdGggZD0iTTQ4LjQgODQuOGwtNy4xLTkuOWMtLjktLjktMi4xLTEtMy42LS4zIDAgMC0zLjkgMi42LTIuMSAxLjVTMjggODEuNiAyOCA4MS42cy42IDIuOSA1IDJsNC40LS45cy0uOCAzLjIgMy44IDMuOCA3LjItMS43IDcuMi0xLjd6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiPjxnIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMTE5LjQgODIuNGw2LjMtOS44Yy44LS45IDEuOC0xIDMuMS0uNGExNDIuMiAxNDIuMiAwIDAwOC4yIDYuNXMtLjYgMi44LTQuNCAyTDEyOSA4MHMuNiAzLjEtMy40IDMuNy02LjItMS4zLTYuMi0xLjN6TTQ4LjQgODQuOGwtNy4xLTkuOWMtLjktLjktMi4xLTEtMy42LS4zIDAgMC0zLjkgMi42LTIuMSAxLjVTMjggODEuNiAyOCA4MS42cy42IDIuOSA1IDJsNC40LS45cy0uOCAzLjIgMy44IDMuOCA3LjItMS43IDcuMi0xLjd6Ii8+PHBhdGggZD0iTTIyIDY0LjFjMS4zIDAgMi41LjggMyAxLjlsNi45IDEyLjkgMi4xLTEuNkwyNiA2NGEyLjggMi44IDAgMDAtNCAuMWMwLS4xIDAgMCAwIDB6TTE0OSA2OS4xYy4yIDEuMy0xLjIgMi0yLjIgMi43TDEzNiA4MGwxLjkgMS44IDExLjEtOS40Yy42LTEgMS4zLTIuNCAwLTMuM3pNMTQxLjMgNjFzLjUuOC0uNyAyLjdsLTcuMiAxMS43IDIuNSAxLjkgNy0xMy4zYzAgLjIgMS0yLjctMS42LTN6TTEzLjcxOCA3Mi44NjhjLjk5MS0uNDIgMi4wMDYuMjU4IDMuMDI0IDEuMTM3IDEuNzMgMS4zNjQgMTAuNzY0IDcuNjc3IDEwLjc2NCA3LjY3N2wyLjI3Mi0xLjM0OC0xMi45ODItOC41M2MtMS4zMDQtLjE3My0yLjc5OS4wNTgtMy4wNzggMS4wNjR6TTEzOS41IDg0LjlTMTI1IDkxIDExOCA4OGwuNCAxLjFzMy4zIDIuNSAxMi41IDEuMmMwIDAgOC4xLTEuMyA5LjEtMy4zbC0uNS0yLjF6TS0zMDQuNjU5IDcyLjg5OHMxNS41OTEgNy44NjkgMjIuNzQ2IDUuMjU4YzAgMCAuMjUuOTE1LS4yNiAxLjA4Ny0zLjM3MiAxLjIxNy02LjE3NCAxLjE2My0xNC4wMDEtLjM3IDAgMC03LjgyMi0xLjYzMi05LjM3Ny00LjMyMXoiLz48L2c+PHBhdGggZD0iTTQ4LjQgODQuOGwtNy4xLTkuOWMtLjktLjktMi4xLTEtMy42LS4zIDAgMC0zLjkgMi42LTIuMSAxLjVTMjggODEuNiAyOCA4MS42YzIuMy0xLjMgMTMuNS03LjIgMjAuNCAzLjJ6IiBvcGFjaXR5PSIuMSIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE2Ij48cGF0aCBkPSJNNDIuOCA2OC43YzEuNiAyLjMgMiA1LjEgMS4yIDcuN2wtLjQgMiA0LjMuMWMzIC45IDMuMiA4IC42IDEwLjItMS4xLjYtMi4xIDEuNC0zIDIuMmEyNSAyNSAwIDAxLTguNCA2LjNsLTMuMyAxLjRjLTYgMi40LTE3LjQgNS45LTE5LjMtNi41bC4zLTYuNmMuMi0zLjMtMS41LTUuNy44LTEyczguOC03LjMgMTMuNi02YzAgMCAuOC41IDIuNC0xLjdzOC4zLTMuMyAxMS4yIDIuOXoiIGZpbGw9IiNkOGQ4ZDgiLz48cGF0aCBkPSJNNDguNiA4OC45cy04LjMgNy4yLTExLjQgOC40Yy0yLjcgMS0xNi4yIDguMS0yMS0uNS0uNi0xLjUtMS4yLTMuMS0xLjUtNC43LjkgMi4yIDUuNyA0LjIgMTAuNiA0LjMgNi42LjMgMTEuMi00LjMgMTUuMy0zLjYgMi41LTEuNiA1LjItMi45IDgtMy45eiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjE2Ii8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00MSAyMmwtMTYgOU00OSA1N0wyNyA3ME00NiAyN0wxOSA0Mk00OCAzNEwxNiA1Mk00MSA3MUwyOC41IDI3TTQ1IDY1TDMyIDIwTTM1IDcyTDI0IDM0TTQ5IDU4TDM3IDE3TTI4IDY4bC04LTI4TTUwIDQxTDE4IDU5TTUzIDQ3TDIxIDY1Ii8+PC9nPjxwYXRoIGQ9Ik01Mi41IDM1LjVjLTEuNy05LjItOS43LTE3LjgtMTcuOS0xOS40QzMzIDE1LjggMjAgNDEgMTIuMyA1My41YTUwIDUwIDAgMDA5LjIgMTVjOSAxNCAxMSAxNSAxMiAyOGwxIDEycy0xIDAtMSAyIDIgMyA0IDMgNC0xIDQtM2EyIDIgMCAwMC0yLTJsLTEtMTJzLS42LTIwLjIgOC0zMWM4LjUtMTAuNiA4LTE5IDYtMzB6bS0xOCA0OGwtNS0xMXMzIDQgOSAwbC00IDExem0tLjEtMTVjLTguOS43LTE3LjEtOC41LTE4LjktMjAuOUMyMiAzNiAzMCAyMyAzMS43IDE5LjVjOC45LjMgMTYuNiAxMC4zIDE3LjcgMjMuMSAxLjIgMTMuNS01LjYgMjUuMS0xNSAyNS45eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzQgMTYuNGMzLjIuMiA1LjggMi41IDggNC42IDYgNiA4IDEwIDkgMjFzLTMuNSAyMC41LTcuNSAyNC41LTE0IDYtMTQgNmE4IDggMCAwMDUgMWMxLjQtLjMgMi44LS44IDQuMS0xLjRsMi45IDIuNGMxLjYtMy41IDMuNS02LjkgNS44LTEwYTI5IDI5IDAgMDA2LjQtMTkuNGMtLjMtOS0zLTI0LjYtMTkuMi0yOXpNMzcgMTAzLjVsLjUgN3MuNyAyLjItMS4xIDIuNiA2LjEuNCA1LjEtMi42YTIgMiAwIDAwLTItMmwtLjQtNC44LTIuMS0uMnoiLz48L2c+PHBhdGggZD0iTTM1LjEgOTguMWMtNS42IDIuNC0xOC40IDcuMi0yMC40LTYuMWwuNC02LjdjLjItMy4zLTEuNS01LjcuOC0xMnMyLjQtNi40IDEzLjYtNmMxMC4zLjMgNS4zIDE2LjMgNy4yIDI3LjEgMCAxLjEtLjcgMy4zLTEuNiAzLjd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM3LjIgOTcuMmMzLjItLjctMjAuMiAxMC4zLTIyLjUtNS4ybC4zLTYuNmMuMi0zLjMtMS41LTUuNy44LTEyczguOC03LjMgMTMuNi02Yy0xNC44LjktOC40IDMxLjkgNy44IDI5Ljh6IiBvcGFjaXR5PSIuMDUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE3Ij48ZyBmaWxsPSIjNDIyMTBiIj48cGF0aCBkPSJNNTQuNyA3NC40cy0xMS42LS40LTEzLjMtMi43LTUuOCA2LjQtNS44IDYuNC00LjcgNC43LTguNSA0LjRhNjAuOCA2MC44IDAgMDEtMTEuMy01LjhsOS44IDEwLjcgOS4zLjYgMi41LTIuNC0xLjcgOC41IDEuNyA5LjEuNi05IDUuNS0xMi43IDQuNy4zIDIuMSAzLjIgMi4zLjJjLjIuMSA1LjEtMy41IDIuMS0xMC44ek0xMTkuMSA3Ni4yczYuOCA0LjcgMTAuNSA0LjRjMi40LS4yIDExLjQtNS44IDExLjQtNS44bC05LjggMTAuNy05LjMuNi0yLjUtMi40IDEuNyA4LjUtMS43IDkuMS0uNi05LTEtMi40YTQ1LjMgNDUuMyAwIDAwMS4zLTEzLjd6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii43Ij48cGF0aCBkPSJNMTQxLjIgNzQuOGwtOS44IDEwLjctOS4zLjYtMi41LTIuNCAxLjcgOC41LTEuNyA5LjEtLjYtOS0xLjEtMi40IDEuNC04LjQgNi4zIDEuOWM1LjYuNSAxMC42LTMuOSAxNS42LTguNnpNMTUuNiA3Ni44bDkuOCAxMC43IDkuMy42IDIuNS0yLjQtMS43IDguNSAxLjcgOS4xLjYtOSA1LjUtMTIuNyA0LjcuMyAyLjEgMy4yIDIuMy4yYTguNCA4LjQgMCAwMDIuOS01LjhjMC0uNS0xMy4xLTEuNS0xMy4xLTEuNWwtMTEgNy41Yy01LjYuNC0xMC42LTQtMTUuNi04Ljd6Ii8+PC9nPjxwYXRoIGQ9Ik0yNi44IDYxLjFzLTIuNiAxNy43IDEwLjYgMTYuMmMwIDAgMTAuMy05LjQtMTAuNi0xNi4yek0zMyAxMTIuN3MxMi41LTYuNiA1LjQtMTQuNGMtLjEuMS0xMC45LTIuMS01LjQgMTQuNHoiLz48cGF0aCBkPSJNMjYuMyA5NnMxMS4xIDQuNiAxMi4zLTQuM2MuMS4xLTQuNC04LjItMTIuMyA0LjN6TTExLjEgNzYuOHM3LjYgMTEgMTQuMSAzLjRjMCAwIC44LTEwLjQtMTQuMS0zLjR6TTEyOS4yIDYzLjFzMiAxMy41LTguMSAxMi40YzAgMC03LjktNy4yIDguMS0xMi40ek0xMzAuNSA5NHMtMTEuMSA0LjYtMTIuMy00LjNjMCAuMSA0LjQtOC4yIDEyLjMgNC4zek0xNDYuOSA3NC42cy04LjIgMTEuOC0xNS4yIDMuN2MwIDAtLjktMTEuMiAxNS4yLTMuN3oiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTI2LjggNjEuMXMtMi42IDE3LjcgMTAuNiAxNi4yTDI2LjggNjEuMXpNMzMgMTEyLjdzMTIuNS02LjYgNS40LTE0LjRMMzMgMTEyLjd6TTI2LjMgOTZzMTEuMSA0LjYgMTIuMy00LjNMMjYuMyA5NnpNMTEuMSA3Ni44czcuNiAxMSAxNC4xIDMuNGwtMTQuMS0zLjR6TTEyOS4yIDYzLjFzMiAxMy41LTguMSAxMi40bDguMS0xMi40ek0xMzAuNSA5NHMtMTEuMSA0LjYtMTIuMy00LjNsMTIuMyA0LjN6TTE0Ni45IDc0LjZzLTguMiAxMS44LTE1LjIgMy43bDE1LjItMy43eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE4Ij48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTE2LjQgOTYuMmMtMi43IDcuOCAxMi44LS4zIDEyLjUtMS4yLS45LS45LTQuMi0xLjItNC4yLTEuMmEzNSAzNSAwIDAwNi41LS42YzMuNi0uNiA1LjYtMy4zIDUuMy00LjJzLTUuMy0xLjItNS4zLTEuMmMyLjQgMCA0LjgtLjQgNy4xLTEuMiAzLTEuMiA0LjgtMy42IDMuNi00LjJhOCA4IDAgMDAtMy0uNmMzLjMtLjMgNy4xLTMgNy43LTQuOHMtMi40LS42LTIuNC0uNmMtNy4xIDEuMi0xNi45LTMuOS0xNi45LTMuOXMtLjYtMy0yLjQtMy42LTIuNC0uNi00LjIgMi40Yy0uNC42LTEgMS4yLTEuNiAxLjdsLS41LjRjLjkgNy45LjEgMTUuNi0yLjIgMjIuOHptLTcyLjYgMS4xYy03LjkgMy45LTEzLS40LTEyLjctMS40LjktMS4xIDQuMi0xLjQgNC4yLTEuNGEzNiAzNiAwIDAxLTYuNi0uN2MtMy42LS43LTUuNy0zLjktNS40LTVzNS40LTEuNCA1LjQtMS40Yy0yLjUgMC00LjktLjUtNy4yLTEuNC0zLTEuNC00LjgtNC4zLTMuNi01IC45LS41IDItLjcgMy0uNy0zLjMtLjQtNy4yLTMuNi03LjgtNS43czIuNC0uNyAyLjQtLjdjNy4yIDEuNCAxNy4yLTQuNiAxNy4yLTQuNnMuNi0zLjYgMi40LTQuMyAyLjQtLjcgNC4yIDIuOFM1MiA3Ny4xIDUyIDc3LjFsNS41IDEuNHM2LTEgMyAyLTQgMi02IDQtMi4zIDguNy0xMC43IDEyLjh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTUzIDgycy0xMi00LTE2LTctMTggMS0xOCAxIDYgNCAxMSA0bC04IDJzNyA2IDEzIDVsLTcgM2MzLjUgMi41IDcuOSAzLjIgMTIgMmwtMyA0czcgMyAxMy03IDctNyAzLTd6bTY2LjItMi44YzEuNS0uNiAyLjktMS40IDQuMi0yLjMgMy42LTIuNyAxNiAuOSAxNiAuOXMtNS4zIDMuNi05LjggMy42bDcuMSAxLjhzLTYuMiA1LjMtMTEuNiA0LjRsNi4yIDIuN2MtMy4xIDIuMi03IDIuOC0xMC43IDEuOGwyLjcgMy42Yy0yLjEuNy00LjUuNC02LjQtLjggMi4xLTUuOSAyLjEtOC45IDIuMy0xNS43eiIgb3BhY2l0eT0iLjA1Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xOSI+PGVsbGlwc2UgY3g9IjQ3LjUiIGN5PSI4MSIgcng9IjkuNSIgcnk9IjE1Ii8+PHBhdGggZD0iTTU3IDgxYzAgOC4zLTQuMiAxNS05LjUgMTVTMzggODkuMyAzOCA4MXM0IDAgMTkgMHoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIi8+PGVsbGlwc2UgY3g9IjQ0LjUiIGN5PSI4MSIgcng9IjkuNSIgcnk9IjE1Ii8+PGVsbGlwc2UgY3g9IjQ0LjUiIGN5PSI4MSIgcng9IjkuNSIgcnk9IjE1IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik00OSA4MC41YzAgNC43LTIuNCA4LjUtNS40IDguNWwtNC41LjFjLS41LTIuOC0uOC01LjctLjktOC42IDAtMi42IDEuOS04LjUgMS45LTguNWgzLjVjMyAwIDUuNCAzLjggNS40IDguNXoiLz48ZWxsaXBzZSBjeD0iMzkuOSIgY3k9IjgwLjUiIHJ4PSI1LjQiIHJ5PSI4LjUiLz48cGF0aCBkPSJNNDQgODlsMTUgMTcgMTcgNSAxLTItMTYtNS0xNS0xN3MtMy0xLTIgMnoiLz48ZyBmaWxsPSIjMDEwMTAxIj48ZWxsaXBzZSBjeD0iMzkuOSIgY3k9IjgwLjUiIHJ4PSI1LjQiIHJ5PSI4LjUiIG9wYWNpdHk9Ii40Ii8+PHBhdGggZD0iTTQ0IDg5bDE1IDE3IDE3IDUgMS0yLTE3LTQtMTUuOC0xOGMtLjQuMy0uNi45LS4yIDJ6IiBvcGFjaXR5PSIuMSIvPjwvZz48cGF0aCBkPSJNNzQuNCAxMDYuNGwxMi41IDMuNGMxLjMuNCAyLjEgMS43IDEuOCAzLjFhMi42IDIuNiAwIDAxLTMuMSAxLjhsLTEyLjUtMy40YTIuNiAyLjYgMCAwMS0xLjgtMy4xIDIuNSAyLjUgMCAwMTMuMS0xLjh6IiBmaWxsPSIjMjMxMTAwIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8yMCI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNDAuNSA3NGE2LjggNi44IDAgMDEtNS41LTNjLTMtNS0xNi0xMS0yMS0xMXMzIDguNSAzIDguNSAwIDEuMiAyIDIuNGMyIDEuMyA0IDEuMyAyIDEuM3MtMyAwLTIgMi40IDQgMi40IDQgOC41LTEwIDEzLjQtOCAxNC42YzIgMS4yIDctMS4yIDExLTQuOSA0LTMuNiA4LTEzLjMgMTQtMTIuMSA1LS43IDMuMy02LjUuNS02Ljh6TTUzLjQgODEuNnMxOS4yIDQuNiAxNS41IDYuMi0yMC42IDYuNS0yOSAxLjUtMS4zIDIuNyAxMy41LTcuN3pNMTE5LjQgODAuNGEzNSAzNSAwIDAxLTIuMyAxMC40czE2LjYtMy44IDIwLjgtOC40YzcuMS03LjkgMi42IDItMTguNS0yeiIvPjwvZz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTI4IDg0LjFDMjUgOTEgMTMgOTYuNSAxNSA5Ny43YzIgMS4yIDctMS4yIDExLTQuOSA0LTMuNiA4LTEzLjMgMTQtMTIuMSAzLjMtLjUgMy43LTMuMiAyLjctNWEyIDIgMCAwMC0xLjktMS4xQzQzIDc5IDMwIDc4IDI4IDg0LjF6TTY1LjYgODUuMXM0LjcgMiAzLjMgMi43Yy0zLjYgMS41LTIwLjYgNi41LTI5IDEuNWwtMy4yLTEuNmM3LjQgNC4xIDMzLjEtMS41IDI4LjktMi42eiIvPjwvZz48cGF0aCBkPSJNMjIgNjZzNSAwIDEwIDUgMiA2IDIgNi03IDItOCA3IDMtMTQtNC0xOHpNNTMuNiA4MS41bDEyIDMuNGMtNy41IDIuMi0xNiAzLTI1LjQgMi45IDAgMCA3LjktMi40IDEzLjQtNi4zek0xMTkgODAuNGwtLjcgNnMxMi4xLTMuMSAxOC41LTUuNGMwIDAtOS44IDEtMTcuNy0uNnoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzIxIj48cGF0aCBkPSJNMTMwLjggNjNjLTIuMy0yLTE1LjctLjUtMTUuNy0uNWwuOSAxLjkgMi4zIDQuOWMyLjUtMS4xIDUuMi0yIDcuOC0yLjQgMCAuMSAxLjkgMTkuMS0uMSAyMS4xcy04LjQgMy4zLTguNCAzLjNMMTE3IDkzbC0xIDIuNlMxMzMgOTcgMTMzIDg1Yy43LTE2LjMuNi0xOS42LTIuMy0yMnpNMjQuNiA2Ny45cy00LjcuMy02LjUgMS4zYy0uNS4yLS40IDEgLjIgMS41IDMuNyAyLjggNi41IDYuNiA4IDExIDMuNCA4LjUgMy40IDE2LjcgMTMuOCAyMC40IDEwLjQgMy43IDE0LjggMCAxNC44IDBTNjIgOTMgNTQgODQuMmMwIDAtMS42LTEuNi00LjctLjYtMy42IDEuMi03LjUgMS45LTExLjYtNS43LTQuMi03LjUtNi4yLTEwLjktMTMuMS0xMHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxnIGZpbGw9IiNmZmYiPjxlbGxpcHNlIGN4PSIyNC43IiBjeT0iNjkuNiIgcng9IjYuNSIgcnk9IjEuNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTMuNSAyNC43IDY5LjcpIiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik00NS40IDg1YzUuMiAxIDkgLjEgMTAuNSAxLjgtLjUtLjktLjktMS40LTEuOS0yLjYtLjEtLjEtMi0xLjYtNC42LS42LTEwLjkgNC0xMS42LTkuNS0xNy42LTE0LjEgNi4xIDcuMSA1LjcgMTQgMTMuNiAxNS41eiIgb3BhY2l0eT0iLjMiLz48cGF0aCBkPSJNMTE1LjEgNjIuNXMxNC42LTEuNyAxNi4xIDFjLTIuMy0uOC02LS40LTguOCAwbC02LjQuOHoiIG9wYWNpdHk9Ii40Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik0xOS44IDcyYzQuNyA0IDUuOSA3LjkgNi42IDkuNyAzLjMgOC41IDMuMyAxNi43IDEzLjcgMjAuNCAxMC40IDMuNyAxNC44IDAgMTQuOCAwczUuMy02IDEuNy0xNGMwIDAgMy45IDExLTcuOSAxMS01LjQtLjEtMTAuNS0uOS0xNC41LTYtNS4zLTYuOC03LjgtMTktMTQuNC0yMS4xeiIgb3BhY2l0eT0iLjE2Ii8+PGVsbGlwc2UgY3g9IjI0LjkiIGN5PSI2OS42IiByeD0iNC44IiByeT0iLjkiIHRyYW5zZm9ybT0icm90YXRlKC0zLjUgMjQuOSA2OS43KSIgb3BhY2l0eT0iLjM1Ii8+PHBhdGggZD0iTTI5LjggNjkuM2MuNS45LTQuOCAxLjItNC44IDEuMi40LTEuMS4zLTEuNy0uMS0xLjcgMCAwIDQuNC0uMyA0LjkuNXoiIG9wYWNpdHk9Ii4zNSIvPjxwYXRoIGQ9Ik0xMjYuMSA2Ni45UzEyOCA4NiAxMjYgODhzLTguNCAzLjMtOC40IDMuM0wxMTcgOTNzOC44LTEuMiAxMS00LjEgMS0xNy45IDEtMTcuOS4zLTUuMy0yLjktNC4xeiIgb3BhY2l0eT0iLjUiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzAxIj48cGF0aCBkPSJNOTUuNCA0OS45UzkyIDYwIDgxIDUzYy4zIDMuOC0xLjYgNS41LTYgNSAwIDAtMyA5LTcgMy0uOSAxLjMuNiA3LjItNyA0LTEuNiA1LjYtNS42IDYuNy0xMSA1IDAgMC0xNSAxLTEwLTkgMCAwLTE1LTkgMi0xMiAwIDAtNS0yMiAxNS0xNyAwLTUgMTIuOS0yMi4zIDMyLTUgMCAwIDE1LTEzIDIyIDYgMCAwIDE1IDIgOCAxNiAxLjktLjggMTIuMiAzLjcgNSAxMiAxLjkgNS4zLS4yIDcuMy01IDcgMCAwIDMgMi0uNCA0LjUgMCAwLTYuNi0yLjUtNi42LTkuNS00LTEuMS01LjYtMy44LTMuOC04LjkgMCAwLTEwLjMgNi44LTEyLjgtNC4yeiIgZmlsbD0iIzQyMjEwYiIvPjxwYXRoIGQ9Ik02OC41IDM5LjVTNTIgMzQgNTQgNTFjLTEyIDItMyAxMy0zIDEzcy0xNC41LTEyLjUtMS40LTEzLjRjMCAwLTQuNC0xOC40IDEzLjEtMTQgMC00LjQgNy44LTIwLjQgMjQuNS01LjJDNzQgMjkgNzEgMzAgNjguNSAzOS41eiIgb3BhY2l0eT0iLjA1IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg5IDI3czE1LTEzIDIyIDZjMCAwIDE1IDIgOCAxNiAxLjktLjggMTIuMiAzLjcgNSAxMiAxLjkgNS4zLS4yIDcuMy01IDcgMCAwIDMgMi0uNCA0LjUgMCAwLTYuNi0yLjUtNi42LTkuNS00LTEuMS01LjYtMy44LTMuOC04LjktNS4yIDQuOS0xMy44LjYtMTIuNy00LjQgMCAwIDcuOC43IDcuNy02LjVDMTA1IDM1IDk1LjUgMjYuMiA4OSAyN3oiIG9wYWNpdHk9Ii41Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzAyIj48cGF0aCBkPSJNNzUuOSAyNy44Yy4xIDIuMi0yLjcgNS40LTIuNyA1LjRzLTEuNS0yLjgtMy42LTMuOC00IDEtMyAxLjVsMiA0LjctMi42LjFhOSA5IDAgMDEtNy45LTEwIDkgOSAwIDAxMTAtNy45IDkgOSAwIDAxNy44IDEweiIvPjxwYXRoIGQ9Ik03NS45IDI3LjhjLjEgMi4yLTIuNyA1LjQtMi43IDUuNGwtMS42LTIuN2MxIDAgMy42LTcuMyAyLjEtOS43YTkgOSAwIDAxMi4yIDd6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNjYgMzFzMy43IDUuNyA0LjggMTAuM2MuNiAyLjIgMSA0LjQgMS4yIDYuNyAxIDQgOCAyIDgtMSAwIDAtNi4xLTEzLjktOS0xNy0yLjYtMy45LTYuMi0xLjItNSAxeiIgZmlsbD0iIzkzNTA1YyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wMyI+PHBhdGggZD0iTTgwLjUgNDIuOVM3NyAyNS4xIDczLjMgMjAuM2MtLjItLjItMS43LS41LTQuMS42bC0uMi4yczIuNiAyLjYgOSAyMS44YzAgMCAyLjUgMS4zIDIuNSAweiIgZmlsbD0iIzgyNTEwNSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC00LjYgNzEuMiAyMC42KSIgY3g9IjcxLjIiIGN5PSIyMC42IiByeD0iMi4yIiByeT0iLjUiIGZpbGw9IiNmNGIxNDUiLz48cGF0aCBkPSJNNzcuMiA0MS4zcy43LS4xIDEuMi0xLjRjLjUtMS45LS41LTMuOC0yLjQtNC40LTItLjUtMi45LTIuNC00LjMtNC4ycy02LjQtNC43LTE0LjktNC41LTEwLjItMy0xMC45LTMuNi0uOCA2IDMgMTAuOSA5LjMgOC4zIDE1LjYgNS4xIDkuMi0uMiA5LjItLjIgMi4yIDIuNCAzLjUgMi4zeiIvPjxwYXRoIGQ9Ik03Ny4yIDQxLjNzLjctLjEgMS4yLTEuNGMuNS0xLjktLjUtMy44LTIuNC00LjQtMi0uNS0yLjktMi40LTQuMy00LjItMS40LTEuOC02LjQtNC44LTE0LjktNC41LTkuOC4zLTExLjItNC43LTExLTMuNCAzIDExLjUgMjIuOSA0LjIgMzEuNCAxNy45eiIgb3BhY2l0eT0iLjIiIGZpbGw9IiMwMTAxMDEiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMDQiPjxwYXRoIGQ9Ik0zMy42IDU5LjhMNjggMjFzMi4xLTMgNi40IDBjNC4zIDMgNDQuNSAyNy40IDQ0LjUgMjcuNCAxLjUgMSAxLjEgMiAxLjMgMi44LS4zIDEuMy03LjUtOC4yLTQ2LjgtMy44QzM0IDUyLjkgMzMuMSA2MS44IDM0LjEgNjIuOHMtLjUtMS0uNS0zeiIgZmlsbD0iIzkzNTA1YyIvPjxwYXRoIGQ9Ik0zMy42IDU5LjhMNjggMjFzMi4xLTMgNi40IDBjLTMuMi0xLTIzLjMgMjcuNS0yNyAzMS44LTEzLjcgNC41LTE0IDkuMi0xMy4yIDkuOSAxIDEuMS0uNi0xLS42LTN6IiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNNDIuOSA2NC42Yy0uMy0xMCA2NC40LTE2LjMgNjcuNS04LjUgMi42LjggMTUuOS00LjggNi40LTcuMnMtMjUuMS01LjktNTcuNi45LTI1LjkgMTMuNy0yNS45IDEzLjcgNy45IDIuNCA5LjYgMS4xeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNSI+PHBhdGggZD0iTTUwLjggMzIuNXMyLjQgNiA1LjQgNC44IDQ4LjEtMS43IDQ4LjEtMS43bDQtNC43czcuNy01LjEgNC4xIDMuM2wtMi4xIDMuNmMtLjYgMS0xLjEgMi4yLTEuNCAzLjQtLjEgMS40IDEuNy0yLjggMS43LTIuOGwzLjggNi4xczIuNSA0LjYtMS44IDQuMi03LTMuNS04LjMtNS4xbC00OC4xIDEuN3MtNi41IDguMi05LjQgNy45LTIuNi0zLjEtLjctOC44YzAgMCAxLjctMi44IDEuOC00LjJTNDYuMyA0MyA0Ni4zIDQzcy0zLjMtNy42LTMuNi05Yy0uNy0zLjcgMy4zLTkuMSA4LjEtMS41eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuMSAyOS41czIuMyAxLjEtLjkgNS4yLTYuMyA1LjMtLjcgOC43IDQuMy40IDQuMy40bC0zLjItNS4zYzAtLjEgNi4yLTEwLjEuNS05ek00OC40IDQwLjZzMy4yLS43IDEuNy42LTQuMyA1LjIgMy43IDIuNCA0Ny4yLTIuNyA0Ny4yLTIuN2wyLjggMi4zLTQ3LjUgMnMtNS44IDctOC43IDYuOC0uNy03LS43LTdsMS41LTQuNHoiIG9wYWNpdHk9Ii4xNCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNiI+PHBhdGggZD0iTTQ2LjggNTMuNFMzNCA0OSAzNiAzN2MyLTExIDE0LTEwIDE0LTEwYTEyIDEyIDAgMDExMi05YzEwIDAgMTUgNiAxNSA2czEtNyAxMS03YzUuOC0uMSAxMS4xIDMgMTQgOCAwIDAgMTMtMyAxNyA2cy0xNC4xIDE1LjMtMTQuMSAxNS4zLTcuOS05LjMtNi40LTkuOGMwIDAtNC41IDcuNS0xNy41LjUgMCAwLTcgMTAtMTcgNCAwIDAtNyA3LjctMTUgMi44bC0yLjIgOS42eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00OCAzOXMxMyA2IDE2LTVjMCAwIDE1IDQgMTgtNCAwIDAgMTAgNyAxOCAyIDAgMCA0LjQgMTIuMSA5LjcgOS4xQTI1LjUgMjUuNSAwIDAxMTA0IDQ0bC01NiAzcy0zLjctLjItNC44LTEuMWMwIDAgNS44LS45IDQuOC02Ljl6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik00NC4yIDYyLjhjMS0uOCAyMy45LTE5LjIgNjYtNy4xIDAgMCAzLjggMSAzLjgtMS43bC00LTMuNnMtMTAtOS0xMS0xNC40YzAgMC05IDYuMy0xNy0uOSAwIDAtNSA5LTE4IDUuNCAwIDAtNSA4LjEtMTUgMi43IDAgMC0zIDE1LjMtNSAxNy4ycy4yIDIuNC4yIDIuNHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDUuNSA2MC4yQTQ4LjIgNDguMiAwIDAxNjggNTBjMTgtNCAzOS4xIDEuNiAzOS4xIDEuNnM1LjkgMS4xIDUuOSAzLjMtMyAuMi0zIC4yYy0yNC4zLTUuMy00Ny43LTUuNi02NiA4IDAtLjEtMS0uNyAxLjUtMi45ek02NCA0MHMxIDguNi0xIDEwYzAgMCAwLTguNiAxLTEwem0tMTQuNiAzcy4zIDEwLjQtMS44IDEyYzAgMCAuNy0xMC4zIDEuOC0xMnptMzIuNS03LjNhMjggMjggMCAwMC4zIDcuMWMuOCA0LjIgMi45IDQuNSAyLjkgNC41LTEuNS41LTMuNi0xNS4zLTMuMi0xMS42em0xNy44IDNjLjcgMi4zIDEuNiA0LjQgMi44IDYuNSAyIDMuNiAzLjYgMy4yIDMuNiAzLjItLjkuOS04LTEzLTYuNC05Ljd6IiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNyI+PHBhdGggZD0iTTQwLjEgNzguM1M1MiA1NS42IDg0LjQgNTQuOGMyOC4yLTEuOSAzMy42IDE2LjEgMzMuNiAxNi4xIDMzLjEtMjUgMi44LTM4LjkgMi44LTM4LjlhMjIuMyAyMi4zIDAgMDEtMTQuMyAxNy40Qzc2LjQgNTYuNyA1OSA0Mi44IDU5IDQyLjhzLTEwLjUtMTIuMS0yMS4yLTkuMmMtLjEuMy0xMC4yIDEuNS0xMi40IDE1LjVhMjYuNCAyNi40IDAgMDAxNC43IDI5LjJ6IiBmaWxsPSIjNzQzYTRiIi8+PHBhdGggZD0iTTQwLjkgMzNjLTIuNy40LTUuOC44LTUuOCA2LjIgMCAyLjcgMy4yIDUuOSA3LjYgOC42IDQuNCAyLjcgOS4zIDQuNyAxNC4zIDUuOWw2LjQgMS4yYzEzLjctMi44IDI1LjktNC44IDM3LjktLjkgMCAwIDMxLjgtMTIuOCAyMS4zLTIwLjgtNC4yLTMuOC0xMS40IDEuOC0xNi43IDUtMy40IDItNS45LjktNS45LjlzLTEuMi03LjctMi0xMC4yYy0yLTYuNi01LjgtMTMuOC0yMy44LTEzLjhTNTguOSAyNi4zIDU4LjkgMjYuM2wuMSAxMy4yYy0xLjcgMC00LjQtMS4xLTcuNy0zLjEgMCAwLTUuNS0zLjctMTAuNC0zLjR6IiBmaWxsPSIjOTM1MDVjIi8+PHBhdGggZD0iTTM5LjYgNzcuN3MxNS0yMi45IDQ0LjMtMjMuNWMyOS4zLS42IDM0LjIgMTYuMSAzNC4yIDE2LjFMMTIzIDY3cy0xOS0xNy4zLTQwLTE1Yy0zNC44IDIuMy00OC41IDIxLjktNDguNSAyMS45eiIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNODIgMTUuOFM1OS43IDExIDU4LjggMjQuMmwuNCAxNWMzLjQuMiA2LjggMCAxMC4xLS42VjI1LjRjLjEgMC0xLjQtOS43IDEyLjctOS42eiIgZmlsbD0iIzc0M2E0YiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wOCI+PHBhdGggZD0iTTEyMy45IDQzLjhjLTUgMS4yLTcuMiA0LjgtMTMuNyA1YTQuNiA0LjYgMCAwMS0yLjktMS43bC0xLTEuN3MtMS43LTE0LjctMi45LTE3LjFjLTMuMS02LjQtNC0xMC4zLTMyLjItMTAuMy0yLjUtLjItNS4xIDAtNy42LjUtOC44IDEtMTYuNSA0LjQtMTMuNiAxMy42YTgxIDgxIDAgMDAzLjkgMTYuMmMtLjYgMS0xLjUgMS45LTIuNSAyLjRsLTEuNy42Yy0zIC42LTcuNS0uMi0xMi45LTEuNi0xMS4xLTIuOC0xMC43IDYuNC04LjQgOS41IDIuMyAzLjEgNy4zIDQuNSAxNS41IDIuMSAxMS4yLTMuNCAyNy41LTcuNSA0MS04LjMgMTUtLjYgMjUuMiAxIDMyLjIgMy40IDYuNSAyLjIgMTYuMy0xLjggMTYuMS01LjctLjItMy45LTQuMy04LjEtOS4zLTYuOXoiIGZpbGw9IiMyNDQyNWIiLz48cGF0aCBkPSJNNTguMSA1Ny4zYzguNy0yLjYgMTcuNi00LjIgMjYuNy00LjggMTYuMS0uOCAzMy43IDMuOSAzMy43IDMuOSAyLjEuNyA0LjUuOCA2LjYuMSAwIDAtMjQuMS05LjUtNDAuOS04LjItOC40LjctMjQuOSA1LTI0LjkgNXMtMTkuOCA2LjQtMzAuOSA2LjNjLjIuMiAzLjIgNy42IDI5LjctMi4zeiIgb3BhY2l0eT0iLjE1Ii8+PHBhdGggZD0iTTUxLjQgMzguOXMzMy4zLTEzLjIgNTMuNS00bDEgNy40cy0xMS41LTgtNTIuNyAzLjRsLTEuOC02Ljh6Ii8+PHBhdGggZD0iTTgzLjUgMTkuMVM0NCAxMyA1MCAzMi4xYzEgNi43IDIuOCAxMy4yIDUuMyAxOS40IDAgMCAxMi43LTIuMSAxOC4yLTQuMmwtNC44LTE2LjJjMCAuMS0zLjctMTEuMSAxNC44LTEyeiIgb3BhY2l0eT0iLjE1Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzA5Ij48cGF0aCBkPSJNNDMuOCA2Mi4zYy0yLjguNy0zLjUtMS42LjItNS4zYTU1LjQgNTUuNCAwIDAxMzktMTRjMjQgMSAzMSAxMCAzMSAxMHM0IDUtMi40IDMuN2MwIDAtMzEtMTQuMS02Ny44IDUuNnoiIGZpbGw9IiM3NDNhNGIiLz48cGF0aCBkPSJNNDUuNSA2MC4yQTQ4LjIgNDguMiAwIDAxNjggNTBjMTgtNCAzOS4xIDEuNiAzOS4xIDEuNnM1LjkgMS4xIDUuOSAzLjMtMyAuMi0zIC4yYy0yNC4zLTUuMy00Ny43LTUuNi02NiA4IDAtLjEtMS0uNyAxLjUtMi45eiIgb3BhY2l0eT0iLjIiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMjMuOSA5NCAzNy4zKSIgY3g9Ijk0IiBjeT0iMzcuMyIgcng9IjE0LjgiIHJ5PSIxNi45IiBmaWxsPSIjYzFjMWMxIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTI0LjMgOTQuNyAzNi4yKSIgY3g9Ijk0LjciIGN5PSIzNi4yIiByeD0iMTQuMSIgcnk9IjE2LjIiIGZpbGw9IiNlZmVmZWYiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMTcuMSA5NS40IDM2LjcpIiBjeD0iOTUuNCIgY3k9IjM2LjciIHJ4PSIxMS41IiByeT0iMTMiIGZpbGw9IiNmZmYiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMTcuMSA5Ni4xIDM2LjUpIiBjeD0iOTYuMSIgY3k9IjM2LjUiIHJ4PSIzLjUiIHJ5PSI0Ii8+PHBhdGggZD0iTTkzLjIgMzQuMmE3IDcgMCAwMTMuNiAyLjJjMS41IDEuNy44IDQtMS4yIDMuOSAzLjQuNyA0LjYtMi43IDMuMy01LjkgMCAwLTIuNS00LjEtNS43LS4yeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjMiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTAiPjxwYXRoIGQ9Ik00NC42IDYyQzU1LjEgNDUgNjMuOSAyOC43IDY3IDE1YzMuOC0xLjMgMjQuMyAxOCA0MiAzOC41IDAgMC0yOS4xLTMxLjktNjQuNCA4LjV6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNNjggMTVjOC40IDQuOCAyNS4yIDIyLjUgNDEgMzguNS05LjktOC43LTE3LjktMTIuNC0yNC43LTEyLjhMNjggMTV6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMTMuNyAzNy45czExIDUgMTAgMTItMTAgNS0xMC0xLTMtMTAgMC0xMXpNMTE1LjIgMzMuOHM0LjItMS40IDUuNy43YzEuNSAyLTEuNCAzLjgtMi45IDIuMi0xLjUtMS42LTMuMy0yLTIuOC0zek00OC44IDI1LjVzLTEwIDQuNS05LjEgMTAuOSA5LjEgNC41IDkuMS0uOSAyLjctOS4xIDAtMTB6TTMzLjUgNDYuOHMuNyA1LjYtMi40IDYuOS00LjQtMi44LTItNC4yIDMuMy0zLjYgNC40LTIuN3oiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTEiPjxwYXRoIGQ9Ik04MS4xIDMzLjhzNi43IDIuNCA0LjQgNC44LTQuOS0zLjgtMTYuNy0xLjJTNDIgNDIgNDEgNzIuNGwxNi4xIDMuMXMtMy4zLTEyLjEgNi43LTEyLjFWNTEuM3MyMCAxMC45IDMzLjQgNiAyNy44LTM2LjIgMy4zLTM5LjktMTkuNCAxNi40LTE5LjQgMTYuNHoiIGZpbGw9IiM0NDJhMTYiLz48cGF0aCBkPSJNNDEgNzIuNGwxNi4xIDMuMXMtMy4zLTEyLjEgNi43LTEyLjFjMCAwLTEwLTEwLjkgMC0xMi4xczIwIDEwLjkgMzMuNCA2IDI3LjgtMzYuMiAzLjMtMzkuOWM5LjIgMTMuOSA2LjIgMjEtNi4xIDI1LjktMTAuOSA0LjQtMjEuNC45LTMzLjIgNS4xQzQ2IDUyIDQxLjUgNjcuMSA0MSA3Mi40eiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMTA1IDUwLjZzNiA2LjUgNy4yIDEwLjUgMy42IDEuMyAzLjYtMi42YzAtNy40LTMtMTAuNC01LjktMTQuNCIgZmlsbD0iIzQ0MmExNiIvPjxwYXRoIGQ9Ik0xMDUgNTAuNnM2IDYuNSA3LjIgMTAuNSAzLjYgMS4zIDMuNi0yLjZjMS4xLTUuMi01LjktMTQuNC01LjktMTQuNCIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNDEuMyA3My45TDU3IDc3LjV2MmwtMTUuNS00em00IDQuNGwxMS4yIDIuOC4yIDItMTEuMS0zLjJ6IiBmaWxsPSIjNzU0YzI0Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzEyIj48cGF0aCBkPSJNNzguMSAyMC42QzU5LjkgMjEuNyA0NS42IDI2LjQgNDYgMzEuMXMxNS41IDcuNyAzMy43IDYuNiAzMi41LTUuOCAzMi4xLTEwLjUtMTUuNi03LjctMzMuNy02LjZ6bTEuMyAxNC41Yy0xNi4zLjktMjkuOC0xLjEtMzAuMS00LjZzMTIuNi03LjEgMjktOC4xIDI5LjggMS4xIDMwLjEgNC42LTEyLjYgNy4xLTI5IDguMXoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTc4LjEgMTkuNkM1OS45IDIwLjcgNDUuNiAyNS40IDQ2IDMwLjFzMTUuNSA3LjcgMzMuNyA2LjYgMzIuNS01LjggMzIuMS0xMC41LTE1LjYtNy43LTMzLjctNi42em0xLjMgMTQuNWMtMTYuMy45LTI5LjgtMS4xLTMwLjEtNC42czEyLjYtNy4xIDI5LTguMSAyOS44IDEuMSAzMC4xIDQuNi0xMi42IDcuMS0yOSA4LjF6IiBmaWxsPSIjZmZmODAwIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzEzIj48cGF0aCBkPSJNNDMuOCA2Mi4zYy0yLjguNy0zLjUtMS42LjItNS4zYTU1LjQgNTUuNCAwIDAxMzktMTRjMjQgMSAzMSAxMCAzMSAxMHM0IDUtMi40IDMuN2MwIDAtMzEtMTQuMS02Ny44IDUuNnoiIGZpbGw9IiM3NDNhNGIiLz48cGF0aCBkPSJNNDUuNSA2MC4yQTQ4LjIgNDguMiAwIDAxNjggNTBjMTgtNCAzOS4xIDEuNiAzOS4xIDEuNnM1LjkgMS4xIDUuOSAzLjMtMyAuMi0zIC4yYy0yNC4zLTUuMy00Ny43LTUuNi02NiA4IDAtLjEtMS0uNyAxLjUtMi45eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNNzEuNSA1MC4yYzEtMi43LjYtOS41LS45LTEzLjUtLjItLjUtLjkgMS40LTEuMSAxLTEuNy02LjUtMy43LTYuOS01LTcuMmwtMS4xIDJjLjgtNi4xLTUuMi05LjUtNS4yLTkuNWwuNCAxLjZjLTEuOS0yLTQuMS0zLjYtNi41LTUtLjMtLjMtLjMtLjMtLjIuMi4yIDIuNy44IDUuNCAxLjggNy45bC0xLjItMXMuNSA2LjkgNi41IDguN2wtMi4zLjJjLjQgNC42IDUgNi42IDUgNi42cy0yLjUtLjMtMi4yLjFjMy4xIDMuOCA3LjMgNi42IDEyIDcuOXoiLz48cGF0aCBkPSJNNzEuNSA1MC4yYzEtMi43LjYtOS41LS45LTEzLjUtLjItLjUtLjkgMS40LTEuMSAxLTEuNy02LjUtMy43LTYuOS01LTcuMmwtMS4xIDJjLjgtNi4xLTUuMi05LjUtNS4yLTkuNWwuNCAxLjZjLTEuOS0yLTQuMS0zLjYtNi41LTUtLjMtLjMtLjMtLjMtLjIuMmwxOS42IDMwLjR6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik02Mi45IDUwLjdjLS4zLTIuMS0yLjktNi43LTUuMi04LjktLjMtLjMtLjEgMS4zLS40IDEtMy40LTMuOS00LjktMy41LTUuOS0zLjJsLS4xIDEuOGMtMS41LTQuNS02LjgtNC43LTYuOC00LjdsLjguOWMtMi0uNy00LTEtNi4xLTEuMi0uMy0uMS0uMy0uMS0uMS4yIDEuMSAxLjggMi40IDMuNCAzLjkgNC44bC0xLjItLjNzMi43IDQuNSA3LjQgMy43bC0xLjUuOWMxLjggMyA1LjcgMi43IDUuNyAyLjdzLTEuOC43LTEuNS44YzMuNSAxLjcgNy4zIDIuMiAxMSAxLjV6IiBmaWxsPSIjMzliNTRhIi8+PHBhdGggZD0iTTYyLjkgNTAuN2MtLjMtMi4xLTIuOS02LjctNS4yLTguOS0uMy0uMy0uMSAxLjMtLjQgMS0zLjQtMy45LTQuOS0zLjUtNS45LTMuMmwtLjEgMS44Yy0xLjUtNC41LTYuOC00LjctNi44LTQuN2wuOC45Yy0yLS43LTQtMS02LjEtMS4yLS4zLS4xLS4zLS4xLS4xLjIgMS4xIDEuOCAyLjQgMy40IDMuOSA0LjhsLTEuMi0uM3MyLjcgNC41IDcuNCAzLjdsLTEuNS45YzEuOCAzIDUuNyAyLjcgNS43IDIuN3MtMS44LjctMS41LjhjMy41IDEuNyA3LjMgMi4yIDExIDEuNXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTQiPjxwYXRoIGQ9Ik00NSA1NWwtNi0xOC44czQgOC45IDExIDYuOCA4LTE3LjEgOC0xNy4xIDMgMTIuNCAxMSAxMi4yUzc5LjUgMjQgNzkuNSAyNCA4MyAzNyA4OCAzN2MxMC4xIDAgMTMtMTIuMSAxMy0xMi4xczMgMTYgOCAxNmMzLjEtLjEgNi0xLjQgOC0zLjhsLTYgMTVjMCAuMS00OS01LjYtNjYgMi45eiIgZmlsbD0iI2ZmZTAwMCIvPjxwYXRoIGQ9Ik00NSA1NWMzMC0yLjcgNTEuOS04LjkgNTYtMzAuMSAwIDAgMyAxNiA4IDE2IDMuMS0uMSA2LTEuNCA4LTMuOGwtNiAxNWMwIC4xLTQ5LTUuNi02NiAyLjl6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNDQuNSA2Mi4yQTcwLjMgNzAuMyAwIDAxODMgNTFjMjMgMCAyNy4yIDMuOSAyNy4yIDMuOWwzLjIgNC40czMuMSAzLjIgNS4xLS44LTMtMTItMTgtMTUtNDIgMC01NCA3LTcgMTUtNSAxNUg0M2wxLjUtMy4zeiIgZmlsbD0iI2M2OTc1NyIvPjxwYXRoIGQ9Ik00NC41IDYyLjdBNzAuMyA3MC4zIDAgMDE4MyA1MS41YzIzIDAgMjcuMiAzLjkgMjcuMiAzLjlsMy4yIDQuNHMzLjEgMy4yIDUuMS0uOEMxMDkgMzcgMzkgNDkgMzkuNCA2My45Yy42IDEuMyAxLjUgMi4xIDIuMSAyLjFINDNsMS41LTMuM3oiIG9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBjeD0iMTAxLjciIGN5PSIyMi4yIiByPSI2LjgiLz48cGF0aCBkPSJNMTA4LjUgMjNhNi44IDYuOCAwIDAxLTcuNiA2IDcgNyAwIDAxLTQuNi0yLjVjMS43LjYgNi4xIDEuMyA4LjktMS40IDItMS45IDIuMS01LjYgMS42LTcuNGE2LjggNi44IDAgMDExLjcgNS4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjI1Ii8+PGNpcmNsZSBjeD0iMTAwLjciIGN5PSIzOS4yIiByPSIyLjUiLz48Y2lyY2xlIGN4PSI2MC43IiBjeT0iNDAuMiIgcj0iMi41Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzE1Ij48cGF0aCBkPSJNMTMzIDQ4LjhjLTEuOS04LjYtMTAuMi0xMi42LTI4LjItOS41Qzk5LjQgMzIgODkgMTkgODIgMTVsLTMuNy0yLTIxLjMtLjJjLTMuMi4zLTUuOC43LTcuMiAxLjUgMCAwLS43IDMtMS45IDQuMS0yLjkgMi40IDUuMSAzLjQgNS4xIDMuNGwtMiAzIDQgMnYzYzEuOCA2LjktLjMgMTQtLjMgMTRzMS4yIDEuNi0xNy4yLjRDMTkuMSA0MyAyMyA2NS44IDM2IDYzLjhsOC45LTFhMTcxIDE3MSAwIDAwNDkuNC05LjRjMy44LTEgNy42LTEuNiAxMS41LTEuOSAzLjcgMi44IDYuOCA2LjMgOS4yIDEwLjJsLjMtLjItLjIuMWMwIC4yIDE5LjktMy44IDE3LjktMTIuOHptLTIxLjUgM2MxLjcuMiAzLjIuOSA0LjUgMi0xLjQtLjktMi45LTEuNi00LjUtMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTA1LjggNTEuNWMzLjcgMyA3IDYuMiA5LjIgMTAuNSAwIDAgNi4zLTIuOCAxLjYtOCAwIDAtMS42LTMtMTAuOC0yLjV6IiBvcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0zNy44IDYzLjRzMzMtLjkgNTYuOC0xMGMwIDAgMTYuNy00LjYgMjEuNy40cy0uOSA4LS45IDggMjAtNCAxOC0xMy0xMS0xMy0zMS05LTE4LjYgMTcuMy02NC42IDIzLjZ6IiBvcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNzAuOSAxM2MxMSAxMS42IDIyIDI1LjYgMTkgMzEuNiA1LTIuNSA4LjEtNC4yIDE0LjktNS4zLTIuOS00LjItNi04LjItOS4yLTEyLjFDOTUuNiAyNy4yIDgzIDE0IDc4IDEzeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNTQuNCA0NGM5IDIgMjkuMi0yIDQ1LjUtMTEuNWwtOC42LTkuOWMtLjUgMi0zMC43IDcuNy0zNi4zIDguNC45IDMuNS4yIDcuOC0uNiAxM3oiLz48cGF0aCBkPSJNNjkuOSAyNkw4MyAyMi4yYzItLjYgNCAuNiA0LjYgMi41bDMuMyAxMS40Yy42IDItLjYgNC0yLjUgNC42bC0xMy4xIDMuOGMtMiAuNi00LS42LTQuNi0yLjVsLTMuMy0xMS40Yy0uNi0yIC42LTQgMi41LTQuNnoiIGZpbGw9IiNmZmUwMDAiLz48cGF0aCBkPSJNNzMuOSAyOC41bDcuMS0yYzEuNS0uNCAzIC40IDMuNSAxLjlsMS45IDYuNmMuNCAxLjUtLjQgMy0xLjkgMy41bC03LjEgMmMtMS41LjQtMy0uNC0zLjUtMS45TDcyIDMxLjljLS40LTEuNS40LTMgMS45LTMuNHoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTYiPjxwYXRoIGQ9Ik00My41IDYyLjJzLTcuNS0uMi05LjQtMy44Yy0uMi0xLjEtLjItMi4zLS4xLTMuNWE0NS43IDQ1LjcgMCAwMTQ3LTM3YzMyIDEgNDQgMzMgNDIgNDMtMSAzLTYgNS03LjYgMy41QzExMSA1NyA5OS45IDUzLjQgODMgNTRjLTMyIDAtMzkuNSA4LjItMzkuNSA4LjJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTgzIDIwczE2IDggMTggMjVsLTYgMTBjMTUgMCAyMSAxMCAyMSAxMHM1IDAgNy00LjNjLjctNSAuMS0xNC4yLTExLjEtMjguMiAwIDAtMTAuOS0xMy41LTI4LjktMTQuNSAwIDAtNCAxIDAgMnoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik00My42IDYxLjlzLTcuNS0uMS05LjItMy42Yy0xLjQtMiAxNC43LTExLjkgNDctMTEuM3M0My40IDExLjcgNDEuNCAxNC4xYy0yIDQuMS03LjUgMy45LTcuNSAzLjkgMC0uNy0yLjYtMTEuOS0zMS45LTEwLjYtMzQuNC42LTM5LjggNy41LTM5LjggNy41eiIgb3BhY2l0eT0iLjIiLz48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTM0LjggNTcuN3M0LjkgNC4xIDcgNC4zbDEuMi0uNi03LjMtNC43LS45IDF6TTQxIDUzLjJsNy43IDUuOCAyLjMtLjgtNy40LTZ6TTU0LjYgNDkuMmw1LjEgNy40IDMuMi0uNi00LjctNy41ek03MC40IDQ3LjJsMi4zIDcuNiAyLjktLjItMS03LjZ6TTg5LjEgNDcuM2wtMS4zIDcuMSAyLjguMSAyLjMtNi44ek0xMDUuMiA0OS45bC0zLjggNi4xIDIuNC43IDQuMy02ek0xMTguOSA1NS42bC03LjYgNC4xIDIuNSAxLjYgOC0zLjJ6Ii8+PC9nPjxlbGxpcHNlIGN4PSI5Ni4yIiBjeT0iMzIuNSIgcng9IjguMiIgcnk9IjkuNSIvPjxwYXRoIGQ9Ik0xMjIuMiA1MS44YTkuNSA5LjUgMCAwMS03LjUtNmMtMS4xLTIuOS0uOS02LjEuNy04LjggMy4xIDQuNCA1LjUgOS40IDYuOCAxNC44ek01Mi45IDMyLjJjLTEuOCA1LTYuNiA3LjctMTAuOSA2LjJsLTEtLjVzNS04IDExLjgtMTJjLjggMi4xLjggNC4zLjEgNi4zek04MS4xIDIzLjZjLTEuMyA1LjEtNS45IDguMy0xMC4zIDcuMXMtNi43LTUuOS01LjctMTAuOEM3MSAxOCA3NCAxOCA4MC43IDE4YTkgOSAwIDAxLjQgNS42ek01MCA1MC4yVjUwYTkuMyA5LjMgMCAwMTkuNS05YzQtLjEgNy42IDIuNCA5IDYuMUE4MC40IDgwLjQgMCAwMDUwIDUwLjJ6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzE3Ij48cGF0aCBkPSJNNDYuNSA1OC4ycy0xMi0uNi0xNi41LTMuOGE5LjEgOS4xIDAgMDA2LTQuM2MxLjUtMi41IDIuMS01LjQgMS43LTguMyAwIDAgOS4xLS4zIDEzLjgtNS41UzU3IDIzLjcgNTcgMjMuN3M3LjkgNC4xIDIxLjUgMS44Uzk1LjMgMTggOTUuMyAxOHMyLjIgOSA5LjQgMTJjNC42IDEuOCA5LjQgMyAxNC4zIDMuNi0uNyA4LjYtNi4xIDEzLjUtMTMgMTUuOC0xOS42LTcuMS01OS41IDguOC01OS41IDguOHoiIGZpbGw9IiMxMTIyODkiLz48cGF0aCBkPSJNNDYuNSA1OC4ycy0xMi0uNi0xNi41LTMuOGE5LjEgOS4xIDAgMDA2LTQuM2MxLjUtMi41IDIuMS01LjQgMS43LTguMyAwIDAgOS4xLS4zIDEzLjgtNS41UzU3IDIzLjcgNTcgMjMuN3M3LjkgNC4xIDIxLjUgMS44Uzk1LjMgMTggOTUuMyAxOHMyLjIgOSA5LjQgMTJjNC42IDEuOCA5LjQgMyAxNC4zIDMuNi0uNyA4LjYtNi4xIDEzLjUtMTMgMTUuOC0xOS42LTcuMS01OS41IDguOC01OS41IDguOHoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTQ1IDYyczEzLjctMTMuNiA0OS43LTExLjNjMCAwIDExLjMgMiAxNC42IDQuOCAwIDAgLjQtMTMuOS0xNi4yLTE2cy0zNS42IDEuNi00My41IDExLjdBMjUuOSAyNS45IDAgMDA0NSA2MnoiIGZpbGw9IiMxNTI0YTUiLz48ZWxsaXBzZSBjeD0iOTQuMSIgY3k9IjQzLjEiIHJ4PSI1IiByeT0iNy43IiBmaWxsPSIjMTExYzYwIi8+PGVsbGlwc2UgY3g9Ijk1LjciIGN5PSI0My4xIiByeD0iNSIgcnk9IjcuNyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xOCI+PHBhdGggZD0iTTc1LjMgMzguOEExMy45IDEzLjkgMCAwMDYwIDM0Yy0xMCAzLTcuNCAxMy40LTE2LjIgMTkuMlMzNCA1MSAzNCA1MXMtMSAyNCAyMSAxNmMwIDAgOS0yIDEyLTktLjEgMi41LS43IDQuOS0yIDcgNC43LS44IDkuNC0xLjcgMTQtNyAwIDAgMy01IDQgMCAzIDcgMTQgNyAxNCA3cy0zLTYgMC0xMGMzLTMgMi44LTEuOCAyLjgtMS44UzEwMyA2MyAxMTMgNjJzMTAtMTIgMTAtMTItMyA3LTYgMi0xMC40LTIxLjEtMTcuNy0xMy41LTI0IC4zLTI0IC4zeiIvPjxwYXRoIGQ9Ik03NCAyMmwyIDI0czExLTMgMjIgMWw1LTI1LTEwIDEwLTQtMTYtNyAxNS04LTl6IiBmaWxsPSIjZmYwIi8+PHBhdGggZD0iTTc1LjggNDMuNEw3NiA0NnMxMS0zIDIyIDFsLjUtMi42YTQwLjIgNDAuMiAwIDAwLTIyLjctMXoiIGZpbGw9IiNkNjgyMjciLz48ZyBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTg5IDE2bDQgMTYuNC0zLTEuOC0yLjMtMTEuOHptLTE1IDYuNGw4IDguMi0zIC45LTQuNy01Ljh6TTkzLjUgNDUuNmw0LjEgMS4zIDUuOS0yNC44LTUuNiA1LjItNC40IDE4LjN6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xOSI+PHBhdGggZD0iTTEwNS4xIDI0LjNoNy45Uzk0LjIgOS44IDc1IDIxLjZDNjkuMiAyNSA2My40IDM1LjcgNjEgNDUuMmMwIDAgMjMuNS03LjcgMzMuOCAxMS44aDQuOEwxMTMgMjQuM3oiLz48cGF0aCBkPSJNMTEzIDI0LjNTOTIuOCA4LjcgNzMuNCAyMi43YzAgMCAxMS41LTEwLjMgMzEuNyAxLjZ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik05NC44IDU3aDQuN0wxMTMgMjQuM2gtNy45eiIgZmlsbD0iIzAxMDEwNyIgb3BhY2l0eT0iLjEiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMjAiPjxwYXRoIGQ9Ik04My44IDQzLjRBOC4zIDguMyAwIDAwODIgNDZjLTEgMiAxIDcgNyA4czExIDIgMTItMy0xMy40LTguMy0xNy4yLTcuNnoiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTgyLjggNDQuOEwxMDIgMTlsLTMuNiAyOS44Qzk3IDU1IDc5IDU1IDgyLjggNDQuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODIuOCA0NC44QzkxIDUxIDk2IDQwIDk3LjkgMjQuNEwxMDIgMTlsLTMuNiAyOS44Qzk3IDU1IDc5IDU1IDgyLjggNDQuOHoiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik05OC44IDQ1Uzg5IDUyIDg1IDQxLjhsMS4zLTEuN3M0LjcgOCAxMi44IDN6bS04LjktOS43czMuNSA3LjcgOS44IDIuN2wuMy0yYy0zLjMgMS42LTYuMyAxLjMtOS0yLjN6bTQuMS01LjZzMiA0LjIgNi41IDEuN2wuMi0yLjJzLTMuNCAyLTUuNi0xeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8yMSI+PHBhdGggZD0iTTc0LjkgMzMuNXMtNy0yLjQtNi4yLTkuNiA5LjUtMTEuNCAxNS4zLTUuMWMzLjQgMy40IDQuMSA4LjYgMS44IDEyLjhsLTEwLjkgMS45eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik03OS44IDI2LjZjLTMxLjctMS42LTMzLjkgMjctMzMuOSAyN2w2NSAuOGMtLjEtLjEuNS0yNi4zLTMxLjEtMjcuOHoiLz48cGF0aCBkPSJNNDYuMSA0OS44cy00LjcgMS4yLTUuNCA0LjYtMS4yIDcuOC0xLjIgNy44Yy4xIDEuOSAyLjkgNC4xIDIuOSA0LjFsMS4xLTIuN2MxMC44LTUuOCA0Mi4xLTguNCA1MC43LTguOCA1LjYtLjEgMTEuMi4zIDE2LjcgMS4xbDIuMiAzLjQgMy42LTIuNWMuNy0uNCAxLjEtMS4yLjctMi0uNi0xLjQtMy0xMC4zLTUtMTEuNy0xLjMtLjktMTEtMi4zLTI4LjgtLjRhMjY5LjIgMjY5LjIgMCAwMC0zNy41IDcuMXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzkuNSA2Mi4yYy4xIDEuOSAyLjkgNC4xIDIuOSA0LjFsMS4xLTIuN2MxMC44LTUuOCA0Mi4xLTguNCA1MC43LTguOCA1LjMtLjEgMTAuNS4yIDE1LjcgMS4xbDMuMiAzLjUgMy42LTIuNWMuNy0uNCAxLjEtMS4yLjctMi0zLjktOS40LTgwIDIuNC03Ny45IDcuM3oiIG9wYWNpdHk9Ii4xMiIvPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNDUuNyA0OS44cy0xLjQgNy41LTEuMiA5LjRjLjEgMS4yLjQgMi4zLjggMy40bDIuMS0uNy0uOC0zLjQgMS4xLTkuMi0yIC41eiIvPjxwYXRoIGQ9Ik00OC41IDQ5LjJzLTEuNCA3LjUtMS4yIDkuNGMuMSAxLjIuNCAyLjMuOCAzLjRsMi4xLS43LS44LTMuNCAxLjEtOS4yLTIgLjV6TTU1LjkgNDcuNGwtLjMgOC44IDEgMy4zIDItLjMtLjktM3YtOS4xeiIvPjxwYXRoIGQ9Ik01OC4zIDQ2LjhsLS4zIDguOCAxIDMuMiAyLS4zLS45LTN2LTl6TTY3LjcgNDVsLjkgOS4yLS4xIDMuMiAyLjctLjMtLjQtMy4xLTEuMi05LjN6TTcxLjEgNDQuNGwuOCA5LjJ2My4ybDIuNi0uMy0uMy0zLjItMS4yLTkuMnpNODMuOSA1NS40bC4xLTMuMS0xLjEtOS42IDIuNS0uMiAxLjQgOS41LS43IDMuNHpNODcuMiA1NS4ydi0zbC0xLjEtOS42IDIuNS0uMyAxLjQgOS42LS43IDMuM3pNOTkgNDEuN2wxLjQgOS41LS40IDMuNiAyLjMuMi42LTMuNy0xLjgtOS42ek0xMDIuNCA0MS43bDEuOCA5LjYtLjUgMy44IDIuNS4yLjUtMy44LTItOS43ek0xMTEuNyA0Mi43bDMuOSAxMC40LTQuOSAyLjcgMS40IDIgNS41LTMuMi0zLjUtOC45Yy4xIDAtMS0yLjYtMi40LTN6Ii8+PC9nPjwvc3ltYm9sPjwvc3ZnPg==";
var identicons_min$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": identicons_min
});
const createWorker = () => new Worker(URL.createObjectURL(new Blob([`class x{constructor(a,b){this.width=b;this.height=a.length/b;this.data=a}static createEmpty(a,b){return new x(new Uint8ClampedArray(a*b),a)}get(a,b){return 0>a||a>=this.width||0>b||b>=this.height?!1:!!this.data[b*this.width+a]}set(a,b,c){this.data[b*this.width+a]=c?1:0}setRegion(a,b,c,d,e){for(let f=b;f<b+d;f++)for(let g=a;g<a+c;g++)this.set(g,f,!!e)}}
class A{constructor(a,b,c){this.width=a;a*=b;if(c&&c.length!==a)throw Error("Wrong buffer size");this.data=c||new Uint8ClampedArray(a)}get(a,b){return this.data[b*this.width+a]}set(a,b,c){this.data[b*this.width+a]=c}}
class ba{constructor(a){this.bitOffset=this.byteOffset=0;this.bytes=a}readBits(a){if(1>a||32<a||a>this.available())throw Error("Cannot read "+a.toString()+" bits");var b=0;if(0<this.bitOffset){b=8-this.bitOffset;var c=a<b?a:b;b-=c;b=(this.bytes[this.byteOffset]&255>>8-c<<b)>>b;a-=c;this.bitOffset+=c;8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(0<a){for(;8<=a;)b=b<<8|this.bytes[this.byteOffset]&255,this.byteOffset++,a-=8;0<a&&(c=8-a,b=b<<a|(this.bytes[this.byteOffset]&255>>c<<c)>>c,
this.bitOffset+=a)}return b}available(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset}}var B,C=B||(B={});C.Numeric="numeric";C.Alphanumeric="alphanumeric";C.Byte="byte";C.Kanji="kanji";C.ECI="eci";C.StructuredAppend="structuredappend";var D,E=D||(D={});E[E.Terminator=0]="Terminator";E[E.Numeric=1]="Numeric";E[E.Alphanumeric=2]="Alphanumeric";E[E.Byte=4]="Byte";E[E.Kanji=8]="Kanji";E[E.ECI=7]="ECI";E[E.StructuredAppend=3]="StructuredAppend";let F="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
function ca(a,b){let c=[],d="";b=a.readBits([8,16,16][b]);for(let e=0;e<b;e++){let f=a.readBits(8);c.push(f)}try{d+=decodeURIComponent(c.map(e=>\`%\${("0"+e.toString(16)).substr(-2)}\`).join(""))}catch(e){}return{bytes:c,text:d}}
function da(a,b){a=new ba(a);let c=9>=b?0:26>=b?1:2;for(b={text:"",bytes:[],chunks:[],version:b};4<=a.available();){var d=a.readBits(4);if(d===D.Terminator)return b;if(d===D.ECI)0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(7)}):0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(14)}):0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(21)}):b.chunks.push({type:B.ECI,assignmentNumber:-1});else if(d===D.Numeric){var e=a,f=[];d="";for(var g=
e.readBits([10,12,14][c]);3<=g;){var h=e.readBits(10);if(1E3<=h)throw Error("Invalid numeric value above 999");var k=Math.floor(h/100),m=Math.floor(h/10)%10;h%=10;f.push(48+k,48+m,48+h);d+=k.toString()+m.toString()+h.toString();g-=3}if(2===g){g=e.readBits(7);if(100<=g)throw Error("Invalid numeric value above 99");e=Math.floor(g/10);g%=10;f.push(48+e,48+g);d+=e.toString()+g.toString()}else if(1===g){e=e.readBits(4);if(10<=e)throw Error("Invalid numeric value above 9");f.push(48+e);d+=e.toString()}b.text+=
d;b.bytes.push(...f);b.chunks.push({type:B.Numeric,text:d})}else if(d===D.Alphanumeric){e=a;f=[];d="";for(g=e.readBits([9,11,13][c]);2<=g;)m=e.readBits(11),k=Math.floor(m/45),m%=45,f.push(F[k].charCodeAt(0),F[m].charCodeAt(0)),d+=F[k]+F[m],g-=2;1===g&&(e=e.readBits(6),f.push(F[e].charCodeAt(0)),d+=F[e]);b.text+=d;b.bytes.push(...f);b.chunks.push({type:B.Alphanumeric,text:d})}else if(d===D.Byte)d=ca(a,c),b.text+=d.text,b.bytes.push(...d.bytes),b.chunks.push({type:B.Byte,bytes:d.bytes,text:d.text});
else if(d===D.Kanji){f=a;d=[];e=f.readBits([8,10,12][c]);for(g=0;g<e;g++)k=f.readBits(13),k=Math.floor(k/192)<<8|k%192,k=7936>k?k+33088:k+49472,d.push(k>>8,k&255);f=(new TextDecoder("shift-jis")).decode(Uint8Array.from(d));b.text+=f;b.bytes.push(...d);b.chunks.push({type:B.Kanji,bytes:d,text:f})}else d===D.StructuredAppend&&b.chunks.push({type:B.StructuredAppend,currentSequence:a.readBits(4),totalSequence:a.readBits(4),parity:a.readBits(8)})}if(0===a.available()||0===a.readBits(a.available()))return b}
class G{constructor(a,b){if(0===b.length)throw Error("No coefficients.");this.field=a;let c=b.length;if(1<c&&0===b[0]){let d=1;for(;d<c&&0===b[d];)d++;if(d===c)this.coefficients=a.zero.coefficients;else for(this.coefficients=new Uint8ClampedArray(c-d),a=0;a<this.coefficients.length;a++)this.coefficients[a]=b[d+a]}else this.coefficients=b}degree(){return this.coefficients.length-1}isZero(){return 0===this.coefficients[0]}getCoefficient(a){return this.coefficients[this.coefficients.length-1-a]}addOrSubtract(a){if(this.isZero())return a;
if(a.isZero())return this;let b=this.coefficients;a=a.coefficients;b.length>a.length&&([b,a]=[a,b]);let c=new Uint8ClampedArray(a.length),d=a.length-b.length;for(var e=0;e<d;e++)c[e]=a[e];for(e=d;e<a.length;e++)c[e]=b[e-d]^a[e];return new G(this.field,c)}multiply(a){if(0===a)return this.field.zero;if(1===a)return this;let b=this.coefficients.length,c=new Uint8ClampedArray(b);for(let d=0;d<b;d++)c[d]=this.field.multiply(this.coefficients[d],a);return new G(this.field,c)}multiplyPoly(a){if(this.isZero()||
a.isZero())return this.field.zero;let b=this.coefficients,c=b.length;a=a.coefficients;let d=a.length,e=new Uint8ClampedArray(c+d-1);for(let f=0;f<c;f++){let g=b[f];for(let h=0;h<d;h++)e[f+h]=H(e[f+h],this.field.multiply(g,a[h]))}return new G(this.field,e)}multiplyByMonomial(a,b){if(0>a)throw Error("Invalid degree less than 0");if(0===b)return this.field.zero;let c=this.coefficients.length;a=new Uint8ClampedArray(c+a);for(let d=0;d<c;d++)a[d]=this.field.multiply(this.coefficients[d],b);return new G(this.field,
a)}evaluateAt(a){let b=0;if(0===a)return this.getCoefficient(0);let c=this.coefficients.length;if(1===a)return this.coefficients.forEach(d=>{b^=d}),b;b=this.coefficients[0];for(let d=1;d<c;d++)b=H(this.field.multiply(a,b),this.coefficients[d]);return b}}function H(a,b){return a^b}
class ea{constructor(a,b,c){this.primitive=a;this.size=b;this.generatorBase=c;this.expTable=Array(this.size);this.logTable=Array(this.size);a=1;for(b=0;b<this.size;b++)this.expTable[b]=a,a*=2,a>=this.size&&(a=(a^this.primitive)&this.size-1);for(a=0;a<this.size-1;a++)this.logTable[this.expTable[a]]=a;this.zero=new G(this,Uint8ClampedArray.from([0]));this.one=new G(this,Uint8ClampedArray.from([1]))}multiply(a,b){return 0===a||0===b?0:this.expTable[(this.logTable[a]+this.logTable[b])%(this.size-1)]}inverse(a){if(0===
a)throw Error("Can't invert 0");return this.expTable[this.size-this.logTable[a]-1]}buildMonomial(a,b){if(0>a)throw Error("Invalid monomial degree less than 0");if(0===b)return this.zero;a=new Uint8ClampedArray(a+1);a[0]=b;return new G(this,a)}log(a){if(0===a)throw Error("Can't take log(0)");return this.logTable[a]}exp(a){return this.expTable[a]}}
function fa(a,b,c,d){b.degree()<c.degree()&&([b,c]=[c,b]);let e=a.zero;for(var f=a.one;c.degree()>=d/2;){var g=b;let h=e;b=c;e=f;if(b.isZero())return null;c=g;f=a.zero;g=b.getCoefficient(b.degree());for(g=a.inverse(g);c.degree()>=b.degree()&&!c.isZero();){let k=c.degree()-b.degree(),m=a.multiply(c.getCoefficient(c.degree()),g);f=f.addOrSubtract(a.buildMonomial(k,m));c=c.addOrSubtract(b.multiplyByMonomial(k,m))}f=f.multiplyPoly(e).addOrSubtract(h);if(c.degree()>=b.degree())return null}d=f.getCoefficient(0);
if(0===d)return null;a=a.inverse(d);return[f.multiply(a),c.multiply(a)]}
function ha(a,b){let c=new Uint8ClampedArray(a.length);c.set(a);a=new ea(285,256,0);var d=new G(a,c),e=new Uint8ClampedArray(b),f=!1;for(var g=0;g<b;g++){var h=d.evaluateAt(a.exp(g+a.generatorBase));e[e.length-1-g]=h;0!==h&&(f=!0)}if(!f)return c;d=new G(a,e);d=fa(a,a.buildMonomial(b,1),d,b);if(null===d)return null;b=d[0];g=b.degree();if(1===g)b=[b.getCoefficient(1)];else{e=Array(g);f=0;for(h=1;h<a.size&&f<g;h++)0===b.evaluateAt(h)&&(e[f]=a.inverse(h),f++);b=f!==g?null:e}if(null==b)return null;e=d[1];
f=b.length;d=Array(f);for(g=0;g<f;g++){h=a.inverse(b[g]);let k=1;for(let m=0;m<f;m++)g!==m&&(k=a.multiply(k,H(1,a.multiply(b[m],h))));d[g]=a.multiply(e.evaluateAt(h),a.inverse(k));0!==a.generatorBase&&(d[g]=a.multiply(d[g],h))}for(e=0;e<b.length;e++){f=c.length-1-a.log(b[e]);if(0>f)return null;c[f]^=d[e]}return c}
let I=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,
dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,
ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},
{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,
34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,
ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},
{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},
{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,
dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,
dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},
{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},
{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},
{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,
ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,
74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,
versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,
dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,
dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},
{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},
{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},
{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},
{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},
{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,
ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,
dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,
dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},
{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},
{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,
ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,
26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},
{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},
{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,
dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},
{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,
dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},
{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,
dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},
{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,
dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],
errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,
versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},
{numBlocks:61,dataCodewordsPerBlock:16}]}]}];function J(a,b){a^=b;for(b=0;a;)b++,a&=a-1;return b}function K(a,b){return b<<1|a}
let ia=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,
dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,
formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,
dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],ja=[a=>0===(a.y+a.x)%2,a=>0===a.y%2,a=>0===a.x%3,a=>0===(a.y+a.x)%3,a=>0===(Math.floor(a.y/2)+Math.floor(a.x/3))%2,a=>0===a.x*a.y%
2+a.x*a.y%3,a=>0===(a.y*a.x%2+a.y*a.x%3)%2,a=>0===((a.y+a.x)%2+a.y*a.x%3)%2];
function ka(a,b,c){c=ja[c.dataMask];let d=a.height;var e=17+4*b.versionNumber;let f=x.createEmpty(e,e);f.setRegion(0,0,9,9,!0);f.setRegion(e-8,0,8,9,!0);f.setRegion(0,e-8,9,8,!0);for(var g of b.alignmentPatternCenters)for(var h of b.alignmentPatternCenters)6===g&&6===h||6===g&&h===e-7||g===e-7&&6===h||f.setRegion(g-2,h-2,5,5,!0);f.setRegion(6,9,1,e-17,!0);f.setRegion(9,6,e-17,1,!0);6<b.versionNumber&&(f.setRegion(e-11,0,3,6,!0),f.setRegion(0,e-11,6,3,!0));b=[];h=g=0;e=!0;for(let k=d-1;0<k;k-=2){6===
k&&k--;for(let m=0;m<d;m++){let l=e?d-1-m:m;for(let n=0;2>n;n++){let q=k-n;if(!f.get(q,l)){h++;let r=a.get(q,l);c({y:l,x:q})&&(r=!r);g=g<<1|r;8===h&&(b.push(g),g=h=0)}}}e=!e}return b}
function la(a){var b=a.height,c=Math.floor((b-17)/4);if(6>=c)return I[c-1];c=0;for(var d=5;0<=d;d--)for(var e=b-9;e>=b-11;e--)c=K(a.get(e,d),c);d=0;for(e=5;0<=e;e--)for(let g=b-9;g>=b-11;g--)d=K(a.get(e,g),d);a=Infinity;let f;for(let g of I){if(g.infoBits===c||g.infoBits===d)return g;b=J(c,g.infoBits);b<a&&(f=g,a=b);b=J(d,g.infoBits);b<a&&(f=g,a=b)}if(3>=a)return f}
function ma(a){let b=0;for(var c=0;8>=c;c++)6!==c&&(b=K(a.get(c,8),b));for(c=7;0<=c;c--)6!==c&&(b=K(a.get(8,c),b));var d=a.height;c=0;for(var e=d-1;e>=d-7;e--)c=K(a.get(8,e),c);for(e=d-8;e<d;e++)c=K(a.get(e,8),c);a=Infinity;d=null;for(let {bits:f,formatInfo:g}of ia){if(f===b||f===c)return g;e=J(b,f);e<a&&(d=g,a=e);b!==c&&(e=J(c,f),e<a&&(d=g,a=e))}return 3>=a?d:null}
function na(a,b,c){let d=b.errorCorrectionLevels[c],e=[],f=0;d.ecBlocks.forEach(h=>{for(let k=0;k<h.numBlocks;k++)e.push({numDataCodewords:h.dataCodewordsPerBlock,codewords:[]}),f+=h.dataCodewordsPerBlock+d.ecCodewordsPerBlock});if(a.length<f)return null;a=a.slice(0,f);b=d.ecBlocks[0].dataCodewordsPerBlock;for(c=0;c<b;c++)for(var g of e)g.codewords.push(a.shift());if(1<d.ecBlocks.length)for(g=d.ecBlocks[0].numBlocks,b=d.ecBlocks[1].numBlocks,c=0;c<b;c++)e[g+c].codewords.push(a.shift());for(;0<a.length;)for(let h of e)h.codewords.push(a.shift());
return e}function L(a){let b=la(a);if(!b)return null;var c=ma(a);if(!c)return null;a=ka(a,b,c);var d=na(a,b,c.errorCorrectionLevel);if(!d)return null;c=d.reduce((e,f)=>e+f.numDataCodewords,0);c=new Uint8ClampedArray(c);a=0;for(let e of d){d=ha(e.codewords,e.codewords.length-e.numDataCodewords);if(!d)return null;for(let f=0;f<e.numDataCodewords;f++)c[a++]=d[f]}try{return da(c,b.versionNumber)}catch(e){return null}}
function M(a,b,c,d){var e=a.x-b.x+c.x-d.x;let f=a.y-b.y+c.y-d.y;if(0===e&&0===f)return{a11:b.x-a.x,a12:b.y-a.y,a13:0,a21:c.x-b.x,a22:c.y-b.y,a23:0,a31:a.x,a32:a.y,a33:1};let g=b.x-c.x;var h=d.x-c.x;let k=b.y-c.y,m=d.y-c.y;c=g*m-h*k;h=(e*m-h*f)/c;e=(g*f-e*k)/c;return{a11:b.x-a.x+h*b.x,a12:b.y-a.y+h*b.y,a13:h,a21:d.x-a.x+e*d.x,a22:d.y-a.y+e*d.y,a23:e,a31:a.x,a32:a.y,a33:1}}
function oa(a,b,c,d){a=M(a,b,c,d);return{a11:a.a22*a.a33-a.a23*a.a32,a12:a.a13*a.a32-a.a12*a.a33,a13:a.a12*a.a23-a.a13*a.a22,a21:a.a23*a.a31-a.a21*a.a33,a22:a.a11*a.a33-a.a13*a.a31,a23:a.a13*a.a21-a.a11*a.a23,a31:a.a21*a.a32-a.a22*a.a31,a32:a.a12*a.a31-a.a11*a.a32,a33:a.a11*a.a22-a.a12*a.a21}}
function pa(a,b){var c=oa({x:3.5,y:3.5},{x:b.dimension-3.5,y:3.5},{x:b.dimension-6.5,y:b.dimension-6.5},{x:3.5,y:b.dimension-3.5}),d=M(b.topLeft,b.topRight,b.alignmentPattern,b.bottomLeft),e=d.a11*c.a11+d.a21*c.a12+d.a31*c.a13,f=d.a12*c.a11+d.a22*c.a12+d.a32*c.a13,g=d.a13*c.a11+d.a23*c.a12+d.a33*c.a13,h=d.a11*c.a21+d.a21*c.a22+d.a31*c.a23,k=d.a12*c.a21+d.a22*c.a22+d.a32*c.a23,m=d.a13*c.a21+d.a23*c.a22+d.a33*c.a23,l=d.a11*c.a31+d.a21*c.a32+d.a31*c.a33,n=d.a12*c.a31+d.a22*c.a32+d.a32*c.a33,q=d.a13*
c.a31+d.a23*c.a32+d.a33*c.a33;c=x.createEmpty(b.dimension,b.dimension);d=(r,u)=>{const p=g*r+m*u+q;return{x:(e*r+h*u+l)/p,y:(f*r+k*u+n)/p}};for(let r=0;r<b.dimension;r++)for(let u=0;u<b.dimension;u++){let p=d(u+.5,r+.5);c.set(u,r,a.get(Math.floor(p.x),Math.floor(p.y)))}return{matrix:c,mappingFunction:d}}let N=(a,b)=>Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));function O(a){return a.reduce((b,c)=>b+c)}
function qa(a,b,c){let d=N(a,b),e=N(b,c),f=N(a,c),g,h,k;e>=d&&e>=f?[g,h,k]=[b,a,c]:f>=e&&f>=d?[g,h,k]=[a,b,c]:[g,h,k]=[a,c,b];0>(k.x-h.x)*(g.y-h.y)-(k.y-h.y)*(g.x-h.x)&&([g,k]=[k,g]);return{bottomLeft:g,topLeft:h,topRight:k}}
function ra(a,b,c,d){d=(O(P(a,c,d,5))/7+O(P(a,b,d,5))/7+O(P(c,a,d,5))/7+O(P(b,a,d,5))/7)/4;if(1>d)throw Error("Invalid module size");b=Math.round(N(a,b)/d);a=Math.round(N(a,c)/d);a=Math.floor((b+a)/2)+7;switch(a%4){case 0:a++;break;case 2:a--}return{dimension:a,moduleSize:d}}
function Q(a,b,c,d){let e=[{x:Math.floor(a.x),y:Math.floor(a.y)}];var f=Math.abs(b.y-a.y)>Math.abs(b.x-a.x);if(f){var g=Math.floor(a.y);var h=Math.floor(a.x);a=Math.floor(b.y);b=Math.floor(b.x)}else g=Math.floor(a.x),h=Math.floor(a.y),a=Math.floor(b.x),b=Math.floor(b.y);let k=Math.abs(a-g),m=Math.abs(b-h),l=Math.floor(-k/2),n=g<a?1:-1,q=h<b?1:-1,r=!0;for(let u=g,p=h;u!==a+n;u+=n){g=f?p:u;h=f?u:p;if(c.get(g,h)!==r&&(r=!r,e.push({x:g,y:h}),e.length===d+1))break;l+=m;if(0<l){if(p===b)break;p+=q;l-=k}}c=
[];for(f=0;f<d;f++)e[f]&&e[f+1]?c.push(N(e[f],e[f+1])):c.push(0);return c}function P(a,b,c,d){let e=b.y-a.y,f=b.x-a.x;b=Q(a,b,c,Math.ceil(d/2));a=Q(a,{x:a.x-f,y:a.y-e},c,Math.ceil(d/2));c=b.shift()+a.shift()-1;return a.concat(c).concat(...b)}function R(a,b){let c=O(a)/O(b),d=0;b.forEach((e,f)=>{d+=Math.pow(a[f]-e*c,2)});return{averageSize:c,error:d}}
function S(a,b,c){try{let d=P(a,{x:-1,y:a.y},c,b.length),e=P(a,{x:a.x,y:-1},c,b.length),f=P(a,{x:Math.max(0,a.x-a.y)-1,y:Math.max(0,a.y-a.x)-1},c,b.length),g=P(a,{x:Math.min(c.width,a.x+a.y)+1,y:Math.min(c.height,a.y+a.x)+1},c,b.length),h=R(d,b),k=R(e,b),m=R(f,b),l=R(g,b),n=(h.averageSize+k.averageSize+m.averageSize+l.averageSize)/4;return Math.sqrt(h.error*h.error+k.error*k.error+m.error*m.error+l.error*l.error)+(Math.pow(h.averageSize-n,2)+Math.pow(k.averageSize-n,2)+Math.pow(m.averageSize-n,2)+
Math.pow(l.averageSize-n,2))/n}catch(d){return Infinity}}function T(a,b){for(var c=Math.round(b.x);a.get(c,Math.round(b.y));)c--;for(var d=Math.round(b.x);a.get(d,Math.round(b.y));)d++;c=(c+d)/2;for(d=Math.round(b.y);a.get(Math.round(c),d);)d--;for(b=Math.round(b.y);a.get(Math.round(c),b);)b++;return{x:c,y:(d+b)/2}}
function sa(a){var b=[],c=[];let d=[];var e=[];for(let p=0;p<=a.height;p++){var f=0,g=!1;let t=[0,0,0,0,0];for(let v=-1;v<=a.width;v++){var h=a.get(v,p);if(h===g)f++;else{t=[t[1],t[2],t[3],t[4],f];f=1;g=h;var k=O(t)/7;k=Math.abs(t[0]-k)<k&&Math.abs(t[1]-k)<k&&Math.abs(t[2]-3*k)<3*k&&Math.abs(t[3]-k)<k&&Math.abs(t[4]-k)<k&&!h;var m=O(t.slice(-3))/3;h=Math.abs(t[2]-m)<m&&Math.abs(t[3]-m)<m&&Math.abs(t[4]-m)<m&&h;if(k){let z=v-t[3]-t[4],y=z-t[2];k={startX:y,endX:z,y:p};m=c.filter(w=>y>=w.bottom.startX&&
y<=w.bottom.endX||z>=w.bottom.startX&&y<=w.bottom.endX||y<=w.bottom.startX&&z>=w.bottom.endX&&1.5>t[2]/(w.bottom.endX-w.bottom.startX)&&.5<t[2]/(w.bottom.endX-w.bottom.startX));0<m.length?m[0].bottom=k:c.push({top:k,bottom:k})}if(h){let z=v-t[4],y=z-t[3];h={startX:y,y:p,endX:z};k=e.filter(w=>y>=w.bottom.startX&&y<=w.bottom.endX||z>=w.bottom.startX&&y<=w.bottom.endX||y<=w.bottom.startX&&z>=w.bottom.endX&&1.5>t[2]/(w.bottom.endX-w.bottom.startX)&&.5<t[2]/(w.bottom.endX-w.bottom.startX));0<k.length?
k[0].bottom=h:e.push({top:h,bottom:h})}}}b.push(...c.filter(v=>v.bottom.y!==p&&2<=v.bottom.y-v.top.y));c=c.filter(v=>v.bottom.y===p);d.push(...e.filter(v=>v.bottom.y!==p));e=e.filter(v=>v.bottom.y===p)}b.push(...c.filter(p=>2<=p.bottom.y-p.top.y));d.push(...e);c=[];for(var l of b)2>l.bottom.y-l.top.y||(b=(l.top.startX+l.top.endX+l.bottom.startX+l.bottom.endX)/4,e=(l.top.y+l.bottom.y+1)/2,a.get(Math.round(b),Math.round(e))&&(f=[l.top.endX-l.top.startX,l.bottom.endX-l.bottom.startX,l.bottom.y-l.top.y+
1],f=O(f)/f.length,g=S({x:Math.round(b),y:Math.round(e)},[1,1,3,1,1],a),c.push({score:g,x:b,y:e,size:f})));if(3>c.length)return null;c.sort((p,t)=>p.score-t.score);l=[];for(b=0;b<Math.min(c.length,5);++b){e=c[b];f=[];for(var n of c)n!==e&&f.push(Object.assign(Object.assign({},n),{score:n.score+Math.pow(n.size-e.size,2)/e.size}));f.sort((p,t)=>p.score-t.score);l.push({points:[e,f[0],f[1]],score:e.score+f[0].score+f[1].score})}l.sort((p,t)=>p.score-t.score);let {topRight:q,topLeft:r,bottomLeft:u}=qa(...l[0].points);
l=U(a,d,q,r,u);n=[];l&&n.push({alignmentPattern:{x:l.alignmentPattern.x,y:l.alignmentPattern.y},bottomLeft:{x:u.x,y:u.y},dimension:l.dimension,topLeft:{x:r.x,y:r.y},topRight:{x:q.x,y:q.y}});l=T(a,q);b=T(a,r);c=T(a,u);(a=U(a,d,l,b,c))&&n.push({alignmentPattern:{x:a.alignmentPattern.x,y:a.alignmentPattern.y},bottomLeft:{x:c.x,y:c.y},topLeft:{x:b.x,y:b.y},topRight:{x:l.x,y:l.y},dimension:a.dimension});return 0===n.length?null:n}
function U(a,b,c,d,e){let f,g;try{({dimension:f,moduleSize:g}=ra(d,c,e,a))}catch(l){return null}var h=c.x-d.x+e.x,k=c.y-d.y+e.y;c=(N(d,e)+N(d,c))/2/g;e=1-3/c;let m={x:d.x+e*(h-d.x),y:d.y+e*(k-d.y)};b=b.map(l=>{const n=(l.top.startX+l.top.endX+l.bottom.startX+l.bottom.endX)/4;l=(l.top.y+l.bottom.y+1)/2;if(a.get(Math.floor(n),Math.floor(l))){var q=S({x:Math.floor(n),y:Math.floor(l)},[1,1,1],a)+N({x:n,y:l},m);return{x:n,y:l,score:q}}}).filter(l=>!!l).sort((l,n)=>l.score-n.score);return{alignmentPattern:15<=
c&&b.length?b[0]:m,dimension:f}}
function V(a){var b=sa(a);if(!b)return null;for(let e of b){b=pa(a,e);var c=b.matrix;if(null==c)c=null;else{var d=L(c);if(d)c=d;else{for(d=0;d<c.width;d++)for(let f=d+1;f<c.height;f++)c.get(d,f)!==c.get(f,d)&&(c.set(d,f,!c.get(d,f)),c.set(f,d,!c.get(f,d)));c=L(c)}}if(c)return{binaryData:c.bytes,data:c.text,chunks:c.chunks,version:c.version,location:{topRightCorner:b.mappingFunction(e.dimension,0),topLeftCorner:b.mappingFunction(0,0),bottomRightCorner:b.mappingFunction(e.dimension,e.dimension),bottomLeftCorner:b.mappingFunction(0,
e.dimension),topRightFinderPattern:e.topRight,topLeftFinderPattern:e.topLeft,bottomLeftFinderPattern:e.bottomLeft,bottomRightAlignmentPattern:e.alignmentPattern},matrix:b.matrix}}return null}let ta={inversionAttempts:"attemptBoth",greyScaleWeights:{red:.2126,green:.7152,blue:.0722,useIntegerApproximation:!1},canOverwriteImage:!0};function W(a,b){Object.keys(b).forEach(c=>{a[c]=b[c]})}
function X(a,b,c,d={}){let e=Object.create(null);W(e,ta);W(e,d);d="onlyInvert"===e.inversionAttempts||"invertFirst"===e.inversionAttempts;var f="attemptBoth"===e.inversionAttempts||d;var g=e.greyScaleWeights,h=e.canOverwriteImage,k=b*c;if(a.length!==4*k)throw Error("Malformed data passed to binarizer.");var m=0;if(h){var l=new Uint8ClampedArray(a.buffer,m,k);m+=k}l=new A(b,c,l);if(g.useIntegerApproximation)for(var n=0;n<c;n++)for(var q=0;q<b;q++){var r=4*(n*b+q);l.set(q,n,g.red*a[r]+g.green*a[r+1]+
g.blue*a[r+2]+128>>8)}else for(n=0;n<c;n++)for(q=0;q<b;q++)r=4*(n*b+q),l.set(q,n,g.red*a[r]+g.green*a[r+1]+g.blue*a[r+2]);g=Math.ceil(b/8);n=Math.ceil(c/8);q=g*n;if(h){var u=new Uint8ClampedArray(a.buffer,m,q);m+=q}u=new A(g,n,u);for(q=0;q<n;q++)for(r=0;r<g;r++){var p=Infinity,t=0;for(var v=0;8>v;v++)for(let w=0;8>w;w++){let aa=l.get(8*r+w,8*q+v);p=Math.min(p,aa);t=Math.max(t,aa)}v=(p+t)/2;v=Math.min(255,1.11*v);24>=t-p&&(v=p/2,0<q&&0<r&&(t=(u.get(r,q-1)+2*u.get(r-1,q)+u.get(r-1,q-1))/4,p<t&&(v=t)));
u.set(r,q,v)}h?(q=new Uint8ClampedArray(a.buffer,m,k),m+=k,q=new x(q,b)):q=x.createEmpty(b,c);r=null;f&&(h?(a=new Uint8ClampedArray(a.buffer,m,k),r=new x(a,b)):r=x.createEmpty(b,c));for(b=0;b<n;b++)for(a=0;a<g;a++){c=g-3;c=2>a?2:a>c?c:a;h=n-3;h=2>b?2:b>h?h:b;k=0;for(m=-2;2>=m;m++)for(p=-2;2>=p;p++)k+=u.get(c+m,h+p);c=k/25;for(h=0;8>h;h++)for(k=0;8>k;k++)m=8*a+h,p=8*b+k,t=l.get(m,p),q.set(m,p,t<=c),f&&r.set(m,p,!(t<=c))}f=f?{binarized:q,inverted:r}:{binarized:q};let {binarized:z,inverted:y}=f;(f=V(d?
y:z))||"attemptBoth"!==e.inversionAttempts&&"invertFirst"!==e.inversionAttempts||(f=V(d?z:y));return f}X.default=X;let Y="dontInvert",Z={red:77,green:150,blue:29,useIntegerApproximation:!0};
self.onmessage=a=>{let b=a.data.id,c=a.data.data;switch(a.data.type){case "decode":(a=X(c.data,c.width,c.height,{inversionAttempts:Y,greyScaleWeights:Z}))?self.postMessage({id:b,type:"qrResult",data:a.data,cornerPoints:[a.location.topLeftCorner,a.location.topRightCorner,a.location.bottomRightCorner,a.location.bottomLeftCorner]}):self.postMessage({id:b,type:"qrResult",data:null});break;case "grayscaleWeights":Z.red=c.red;Z.green=c.green;Z.blue=c.blue;Z.useIntegerApproximation=c.useIntegerApproximation;
break;case "inversionMode":switch(c){case "original":Y="dontInvert";break;case "invert":Y="onlyInvert";break;case "both":Y="attemptBoth";break;default:throw Error("Invalid inversion mode");}break;case "close":self.close()}}
`]), { type: "application/javascript" }));
var qrScannerWorker_min = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  createWorker
});
export { Account, AccountDetails, AccountList, AccountRing, AccountSelector, AddressDisplay, AddressInput, AlertTriangleIcon, Amount, AmountInput, AmountWithFee, ArrowLeftIcon, ArrowLeftSmallIcon, ArrowRightIcon, ArrowRightSmallIcon, BottomOverlay, CaretRightSmallIcon, Carousel, CashlinkIcon, CashlinkSmallIcon, CashlinkXSmallIcon, CheckmarkIcon, CheckmarkSmallIcon, CircleSpinner, CloseButton, CloseIcon, ContactsIcon, CopyIcon, Copyable, CopyableField, CrossIcon, DownloadIcon, FaceNeutralIcon, FaceSadIcon, FiatAmount, GearIcon, HexagonIcon, Identicon, InfoCircleIcon, InfoCircleSmallIcon, KeysIcon, LabelInput, LedgerIcon, LoadingSpinner, LockLockedIcon, LockUnlockedIcon, LoginIcon, MenuDotsIcon, PageBody, PageFooter, PageHeader, PaymentInfoLine, PlusCircleIcon, QrCode, QrCodeIcon, QrScanner, QuestionmarkIcon, ScanQrCodeIcon, SelectBar, SettingsIcon, SmallPage, StopwatchIcon, Timer, Tooltip, TransferIcon, UnderPaymentIcon, ViewIcon, ViewOffIcon, setAssetPublicPath };
