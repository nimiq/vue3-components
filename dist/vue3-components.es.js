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
      e2 = typeof IdenticonsAssets != "undefined" ? IdenticonsAssets : await fetch(self.NIMIQ_IDENTICONS_SVG_PATH || Identicons.svgPath).then((t2) => t2.text()), typeof module != "undefined" && module.exports && (global.DOMParser = require("dom-parser")), t(new DOMParser().parseFromString(e2, "image/svg+xml"));
    }));
  }
  static _btoa(t) {
    if (typeof globalThis.btoa == "function")
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
var identicons_min = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzeW1ib2wgaWQ9InNpZGVfMDEiPjxwYXRoIGQ9Ik01My41IDg0LjJhMi41IDIuNSAwIDAwLTIuOS0yLjJsLTE2IDIuNC0yLjMtOHMwLTItMS43LS43bDIuNiA4LjktMy44LjYtMi4zLTcuOXMwLTItMS43LS43bDIuNiA4LjktMi4yLjNjLjQgMS4zLjUgMi42LjIgMy45bDMuNC0uMyAyLjQgOC40aC4xYy0uMi41LjEgMSAuNSAxLjEuNC4yLjggMCAxLjEtLjRoLjF2LS4yYTEgMSAwIDAwLS4yLS45TDMxIDg5bDMuNi0uNCAyLjYgOC45aC4xYy0uMi40IDAgMSAuNCAxLjJsLjUuMmMuNiAwIDEtLjUgMS0xYTEgMSAwIDAwLS43LS45bC0yLjQtOC40TDUxLjUgODdjMS4yLS4xIDIuMi0xLjQgMi0yLjh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTUxLjMgODcuMWwtMTUuNCAxLjYtLjUtMS42czE4LjgtMi4zIDE4LTIuOWMuMSAwIC42IDIuMS0yLjEgMi45eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNOC44IDg3LjVhOC41IDguNSAwIDAxOS41LTcuM2M0LjcuNSA4IDQuNyA3LjUgOS4zYTguNSA4LjUgMCAwMS05LjUgNy4zIDguNCA4LjQgMCAwMS03LjUtOS4zek0xNDYuNyA3Ny41Yy0uNSA0LTQuMyA2LjktOC4zIDYuM2E3LjQgNy40IDAgMDEtNi00LjljLS4xLS40IDQuNi4xIDQuNi0xLjkgMC0xLTEuNy0xLTMtLjlsLTIgLjIuMS0uOGMuNi00IDQuMy02LjkgOC4zLTYuM3M2LjkgNC4yIDYuMyA4LjN6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik0yNS44IDg5LjRhOC41IDguNSAwIDAxLTkuNSA3LjMgOSA5IDAgMDEtNS43LTMuMWMyLjIuOCA3LjcgMS42IDExLjEtMS44IDIuNS0yLjQgMi42LTYuOCAyLTlhOC42IDguNiAwIDAxMi4xIDYuNnpNMTQ2LjcgNzcuNWMtLjYgNC00LjMgNi45LTguMyA2LjNhNy40IDcuNCAwIDAxLTQuOC0yLjhjMS45LjcgNi42IDEuNSA5LjYtMS40IDIuMi0yLjEgMi40LTYgMS45LTcuOWE4IDggMCAwMTEuNiA1Ljh6Ii8+PC9nPjxwYXRoIGQ9Ik0xMzcuMSA3Ni41Yy0uMi0uOC0yLjMtLjUtMi4zLS41bC02LjQuNS0xLjUtNS43czAtMS40LTEuMi0uNWwxLjcgNi4zLTMuMy4zLTEuNi01LjhzMC0xLjQtMS4yLS41TDEyMyA3N2wtMy43LjMuMSAzLjIgNC42LS42IDIuMSA4aC4xYy0uMi40IDAgLjkuMyAxLjEuNC4yLjggMCAxLS4zaC4xdi0uMmMuMS0uMyAwLS42LS4yLS44bC0yLjEtOCAzLjEtLjQgMi4zIDguNWguMWMtLjIuNCAwIC44LjQgMSAuNC4yLjggMCAxLS4zaC4xdi0uMmMuMS0uMyAwLS42LS4yLS44bC0yLjMtOC41IDUuNS0uN2MxLjYgMCAyLS44IDEuOC0xLjh6IiBmaWxsPSIjZmZmIi8+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0xMjMuOSA4MGwtNC42LjV2LTEuNGw0LS40LjItLjF6TTEyOC4zIDc5LjRsLTMuMS40LS4zLTEuNCAzLjEtLjN6TTEzNC40IDc4LjdsLTQuNy42LS40LTEuNCA3LjUtLjljMCAuMS44LjktMi40IDEuN3pNMjkuNCA4OS4zbC0zLjQuMy4xLTEuNSAyLjYtLjMuMy4yek0zMC4zIDg3LjlsMy41LS42LjUgMS40LTMuNS40eiIvPjxjaXJjbGUgY3g9IjM4IiBjeT0iOTgiIHI9IjEiLz48Y2lyY2xlIGN4PSIzMi43IiBjeT0iOTguMiIgcj0iLjkiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wMiI+PHBhdGggZD0iTTEyNS44IDcxLjRzMTkuMiAxLjQgMTkuNiAyLjhjLjEuNC0xOC4yIDkuNy0xNyA5LjEgMCAwIDIuNC01LjggMi4xLTcuMXMtNC43LTQuOC00LjctNC44eiIgZmlsbD0iIzVlNWU1ZSIvPjxwYXRoIGQ9Ik0xMjUuMiA3MS4zczE5LjIgMS40IDE5LjYgMi44Yy01IDEtMTQuNiAyLjQtMTQuNiAyLjRsLTUtNS4yeiIgZmlsbD0iI2UyZTJlMiIvPjxnIGZpbGw9IiM2MDM4MTMiPjxwYXRoIGQ9Ik0xMzAuNiA3OS4ybC0xMS42IDF2LTQuN2wxMC44LS44czUgLjQgNS4yIDEuMi0yLjcgMy00LjQgMy4zek01NC42IDgzLjdsLTM2LjUgMnMtMi44LjEtMy0xLjZjLS4xLTEuNS44LTIuNCAyLjYtMi45TDU0IDc3LjVhMy4yIDMuMiAwIDAxMy40IDIuOCAzIDMgMCAwMS0yLjggMy40eiIvPjwvZz48cGF0aCBkPSJNNTQuNiA4My43bC0zNi41IDJjLTEuOCAwLTIuOC0uNS0zLTEuNiAxNy0xLjIgNDQuMi0yLjQgNDIuMy0zLjggMCAuMS41IDIuNy0yLjggMy40eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNMzguOCA4MC40bC01LjQtNS44LTE3LjEuMSA2LjEgNi42ek0zOS40IDgzLjJsLTYuNiA3LjktMTcuMSAxLjIgNi42LTcuOXoiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTIzLjggNzYuN2MuMi0uMi41LS4yLjcgMGwyLjcgMi45Yy4yLjIuMi41IDAgLjctLjIuMi0uNS4yLS43IDBsLTIuNy0yLjlhLjUuNSAwIDAxMC0uN3pNMjAuOCA3Ni43Yy4yLS4yLjUtLjIuNyAwbDIuNyAyLjljLjIuMi4yLjUgMCAuNy0uMi4yLS41LjItLjcgMGwtMi43LTIuOWEuNS41IDAgMDEwLS43ek0yNi44IDc2LjdjLjItLjIuNS0uMi43IDBsMi43IDIuOWMuMi4yLjIuNSAwIC43LS4yLjItLjUuMi0uNyAwbC0yLjctMi45YS41LjUgMCAwMTAtLjd6TTI5LjggNzYuN2MuMi0uMi41LS4yLjcgMGwyLjcgMi45Yy4yLjIuMi41IDAgLjctLjIuMi0uNS4yLS43IDBsLTIuNy0yLjlhLjUuNSAwIDAxMC0uN3pNMzIuOCA3Ni43Yy4yLS4yLjUtLjIuNyAwbDIuNyAyLjljLjIuMi4yLjUgMCAuNy0uMi4yLS41LjItLjcgMGwtMi43LTIuOWEuNS41IDAgMDEwLS43ek0yNi4yIDg1LjdjLjIuMi4yLjUgMCAuN2wtMi43IDIuOWMtLjIuMi0uNS4yLS43IDBhLjUuNSAwIDAxMC0uN2wyLjctMi45Yy4yLS4yLjUtLjIuNyAwek0yMy4yIDg1LjdjLjIuMi4yLjUgMCAuN2wtMi43IDIuOWMtLjIuMi0uNS4yLS43IDBhLjUuNSAwIDAxMC0uN2wyLjctMi45Yy4yLS4yLjUtLjIuNyAwek0yOS4yIDg1LjdjLjIuMi4yLjUgMCAuN2wtMi43IDIuOWMtLjIuMi0uNS4yLS43IDBhLjUuNSAwIDAxMC0uN2wyLjctMi45Yy4yLS4yLjUtLjIuNyAwek0zMi4yIDg1LjdjLjIuMi4yLjUgMCAuN2wtMi43IDIuOWMtLjIuMi0uNS4yLS43IDBhLjUuNSAwIDAxMC0uN2wyLjctMi45Yy4yLS4yLjUtLjIuNyAwek0zNS4yIDg1LjdjLjIuMi4yLjUgMCAuN2wtMi43IDIuOWMtLjIuMi0uNS4yLS43IDBhLjUuNSAwIDAxMC0uN2wyLjctMi45Yy4yLS4yLjUtLjIuNyAweiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzAzIj48cGF0aCBkPSJNMjYuNCA3MWwyLjQgMjQtMi40IDJ2My4zczAgMS43IDIuNCAyLjNjMi41LjUgNy4xIDIgMTQuMiAxLjQgMy44LS4zIDcuNS0xLjMgMTEtMi45YTMgMyAwIDAwMS44LTIuNWwtLjktMy42LTIuNC0yLTIuNC0yMyIgZmlsbD0iI2ZmZiIvPjxnIGZpbGw9IiNmY2JiMDAiPjxwYXRoIGQ9Ik0yOC45IDcxLjJsMi41IDIzLjctMy43IDNzMCAxLjMgNC45IDJjNi43IDIuMiAxNy43LS4xIDIwLjktMS45IDIuNS0uOS41LTIgLjUtMmwtMi41LTNMNDkgNzAuMmwtMjAuMSAxeiIvPjxwYXRoIGQ9Ik01NC45IDk3LjJjLjEgMS43LTUuOSA0LjQtMTMuNCA0LjhzLTEzLjgtMS42LTEzLjktMy4yIDUuOS0zLjQgMTMuNS0zLjggMTMuNi41IDEzLjggMi4yeiIgb3BhY2l0eT0iLjUiLz48L2c+PGcgZmlsbD0iI2ZmZDIyZCIgZmlsbC1vcGFjaXR5PSIuNSI+PHBhdGggZD0iTTM0LjYgOTNjLS45LjEtMS43LS41LTEuOS0xLjRsLTEuMS0xM2MwLS45LjgtMS42IDEuNy0xLjYuOS0uMSAxLjcuNSAxLjkgMS40bDEgMTNjMCAuOS0uNyAxLjYtMS42IDEuNnpNNDAuNSA5M2MtLjkuMS0xLjctLjUtMS45LTEuNGwtMS4xLTEzYzAtLjkuNy0xLjYgMS42LTEuNi45LS4xIDEuNy41IDEuOSAxLjRsMSAxM2MuMS45LS42IDEuNi0xLjUgMS42ek00Ni40IDkyYy0uOS4xLTEuNy0uNS0xLjktMS40bC0xLjEtMTNjMC0uOS43LTEuNiAxLjYtMS42LjktLjEgMS43LjUgMS44IDEuNGwxLjEgMTNjLjEuOS0uNiAxLjYtMS41IDEuNnoiLz48L2c+PHBhdGggZD0iTTI5LjcgNzIuOXMtOC4xIDIuMi02LjktNC40YzAgMC00LjktNS41IDEuMi01LjUgMCAwIDEuMi00LjQgNi4xIDAgMCAwIDQuOS03LjcgOS44IDEuMSAwIDAgMy43LTQuNCA2LjEgMi4yIDAgMCA3LjYgMi40IDIgNS4xUzMxLjcgNzQgMjkuNyA3Mi45eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMC45IDcyLjRTMjQgNzQuMiAyNS4xIDY5YzAgMC00LjEtNC4zIDEtNC4zIDAgMCAxLTMuNSA1LjIgMCAwIDAgNC4xLTYuMSA4LjMuOSAwIDAgMy4xLTMuNSA1LjIgMS43IDAgMCA2LjQgMiAxLjcgNHMtMTQgMi0xNS42IDEuMXoiIGZpbGw9IiNmZmVmYWUiIGZpbGwtb3BhY2l0eT0iLjUiLz48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTQxLjIgNjQuNFM0MyA2NCA0MyA2N3MtMy4xIDMuOS0zLjEgMy45LjgtLjkgMS45LjEtMS41IDEuNy0xLjUgMS43IDYuNC0uMyA4LjctMi41LTMuNi0zLjItMy42LTMuMiAwLTMuMS00LjItMi42ek0zMS4xIDY2Yy43IDEuOSAyLjcgMyA0LjcgMi42IDAgMC0zLjUgMi40LTQuNy0yLjZ6TTI3LjQgNjcuMWMxLjIuNyAyLjcuNSAzLjgtLjQgMCAwLS42IDIuNi0zLjguNHpNMzcuOSA2OC41czIuNC0uOCAxLjctMi45Yy0uMS4xIDIuMiAxLjktMS43IDIuOXoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wNCI+PHBhdGggZD0iTTExNy4xIDY4LjFjMS45IDEuNiAyLjkgMTIgMSAyMC45IDAgMCA0LjcgMy4yIDYuOSAzLjdsMyAuOWM1LjYgMS41IDE2IDMuNCAxNi4zLTcuOGwtMS01LjhjLS41LTIuOS44LTUuMi0yLTEwLjVzLTguNS01LjUtMTIuNi0zLjljMCAwLS42LjYtMi4zLTEuMnMtNy4zLTIuMS05LjMgMy43ek0yNi4zIDY4LjdhOC42IDguNiAwIDAwLTEuMyA3LjZsLjMgMnMtMTAuMS0xLjgtOSA2LjJsLjMgMi4xYzEgNi42IDIgOS42IDYuNCAxMS42IDQuOCAyLjIgNS0yLjQgOC4xLTEuMnMxOS43IDEwLjcgMjIuNC00LjVsLS4yLTYuNWMtLjEtMy4zIDEuNy01LjYtLjUtMTEuOXMtOC41LTcuNC0xMy4zLTYuM2MwIDAtLjguNS0yLjMtMS43cy03LjgtMy40LTEwLjkgMi42eiIvPjxnIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik0xMTcuMSA2OC4xYzEuOSAxLjYgMi45IDEyIDEgMjAuOSAwIDAgNC43IDMuMiA2LjkgMy43bDMgLjljLTIuNi0uMS0zLjUtNS4xLTMtNS4zIDAtNy42LTEuNC0xMi41LTEuMy0xNy44YTUuMiA1LjIgMCAwMTUtNC45cy0uNi42LTIuMy0xLjItNy4zLTIuMS05LjMgMy43eiIgb3BhY2l0eT0iLjE2Ii8+PGcgb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik0xMTguNSA4OS4zczUuMSAzIDYuNiAzLjNjMi41LjYgMTUuMSA1LjUgMTguNS0yLjYuNC0xLjQuNy0yLjkuOS00LjMtLjYgMi4xLTQuNiA0LjMtOC45IDQuOS01LjggMS0xMC40LTIuNy0xMy45LTEuNmwtMi44LTEuMi0uNCAxLjV6TTE5IDk1LjFjMS4yIDEuMyAyLjUgMi4zIDQgMy4xIDQuOCAyLjIgNS0yLjQgOC4xLTEuMiAyLjcgMSAxNS43IDguNSAyMC44LjFhMjUgMjUgMCAwMDEuNi00LjZjLTEgMi4yLTUuOCA0LTEwLjUgNC02LjYuMS0xMS00LjYtMTUtNC02LjYgMy41LTkgMi42LTkgMi42eiIvPjwvZz48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTEyNS4xIDkyLjdjLTMtLjMgMTguOSA3IDE5LjQtNi45bC0xLTUuOGMtLjUtMi45LjgtNS4yLTItMTAuNXMtOC41LTUuNS0xMi42LTMuOWMxMy4xLS44IDEwLjcgMjcuMi0zLjggMjcuMXpNMzEgOTdjLTMuMi0uOCAxOS43IDEwLjcgMjIuNC00LjVsLS4xLTYuNWMtLjEtMy4zIDEuNy01LjYtLjUtMTEuOXMtOC41LTcuNC0xMy4zLTYuM0M1NC4xIDY5LjEgNDcgOTkuNiAzMSA5N3oiLz48L2c+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMDUiPjxwYXRoIGQ9Ik0xMjQuNiA4MC43czIwIC4zIDE4LjYtMTIuNWMwIDAgOS42IDExLjEgMSAyMC45cy0yNy4zIDYuMS0yNy4zIDYuMWw3LjctMTQuNXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTQzLjIgNjguMmMuMyAxMy43LTIwLjIgMTIuMS0yMC4yIDEyLjFsLTEuMiA1LjctNC45IDkuMnMxOC43IDMuNiAyNy4zLTYuMS0xLTIwLjktMS0yMC45eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNDMuMiA2OC4yYzguNCAyMi40LTIxLjcgMTkuNC0yMS43IDE5LjRsLjMtMS43LTQuOSA5LjJzMTguNyAzLjYgMjcuMy02LjEtMS0yMC44LTEtMjAuOHoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTExOC41IDc1czcuMSAxIDcuMyAxMS4yLTExIDExLjgtMTEgMTEuOGEzOS42IDM5LjYgMCAwMDMuNy0yM3pNMzguMiA3OC4xbDkuNi00czguNi45IDkuNSAxMS40LTUuNSAxMi45LTUuNSAxMi45bC0xMC4zLjJzLTQuNS0zLjEtNS4yLTExLjMgMS45LTkuMiAxLjktOS4yeiIvPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0zOC4yIDc4LjFsOS42LTRjNSAxLjUgOSA0LjMgOS41IDExLjQtLjgtMS42LTIuMy0yLjMtNC41LTIuMkw0OCA4NC40bC01LjcgMS40LTUuOSAxLjRjLjQtNS0uMS03LjMgMS44LTkuMXoiIG9wYWNpdHk9Ii4xIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQuNiA0MiA4OC4yKSIgY3g9IjQyIiBjeT0iODguMiIgcng9IjQuOSIgcnk9IjkuMSIgb3BhY2l0eT0iLjE2Ii8+PHBhdGggZD0iTTQxLjcgODAuNnMtMTUuNiAyLjEtMjAtMi45LS4yLTEzLjktLjItMTMuOS0xMS4xIDYuNC0xMCAxOSAyNSAxMy44IDMwLjMgMTIuNGMwIDAgMy42LTEuOCAzLjMtNy41IDAtNS44LTMuNC03LjEtMy40LTcuMXoiLz48cGF0aCBkPSJNNDEuNyA4MC42cy0xNS42IDIuMS0yMC0yLjktLjItMTMuOS0uMi0xMy45LTExLjEgNi40LTEwIDE5IDI1IDEzLjggMzAuMyAxMi40YzAgMCAzLjYtMS44IDMuMy03LjUgMC01LjgtMy40LTcuMS0zLjQtNy4xeiIgb3BhY2l0eT0iLjMiLz48L2c+PHBhdGggZD0iTTQ1IDg3LjdjLTE1LjkgMy44LTM5LjgtMi42LTIzLjUtMjMuOCAwIDAtMTEuMSA2LjQtMTAgMTlzMjUgMTMuOCAzMC4zIDEyLjRjMCAwIDMuNi0xLjggMy4yLTcuNnoiIG9wYWNpdHk9Ii4zIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wNiI+PHBhdGggZD0iTTQyIDY2LjVMMjYgNTFjLS45LS4yLTQgOS00IDE5czQgMTUgNiAxN2w3IDdjMyAzIDYgNCAxMCA2IDMgMSA0IDIgNC0ycy00LTUtNS0xOGwxLTktMy00LjV6TTExNCA2MS4xYzMuNi00LjcgMTkuNy0xMSAxOS43LTExczIuMiAxMi4yLTQuOCAyOC44Yy0yLjUgNi02IDE0LjUtOSAxNi44LTMgMi4zLTMuOC4zLTMuOC4zLTEuMSAwIDcuOS0xOS0yLjEtMzQuOXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMjYgNTIuMkM0MSA2OSA0My42IDc4LjcgNDMuNiA3OC43bDEuNC04LjZTMjkgNTIgMjYgNTIuMnpNMTIxLjYgNTUuOGw4LjYtMS43YzEgNi0xLjYgMTUuMi0zLjEgMjAtMi43IDguMy00LjkgMTIuOS03LjEgMTcuOS0yLjIgNS0zLjkgNC0zLjkgNCAxIDEuOCA0LjcuOCA4LjUtNy40IDIuNC01LjQgNC44LTEwLjQgNi40LTE1LjggMCAwIDMuOS0xMC44IDIuNy0yMi43LTQuMSAxLjctOC4yIDMuNS0xMi4xIDUuN3pNMjUuOTkzIDg0LjQ1M2MyMi4wNiAxOC42MzMgMjEuMzAzIDEzLjY4NyAyMS40MjYgOS4wNzkgMi4wMDcgMi40NjIgMiA3LjE1LjY4NyA3LjIwMS0xLjgwNS4xNDctOS45MDQtMy43OC0xMS43OTYtNS42NTMtMy43ODQtMy43NDctNy4yMi02Ljc0Ni0xMC4zMTctMTAuNjI3eiIvPjwvZz48cGF0aCBkPSJNNDQgNzRjLTEtMi0xNS0xMi0xNS0xMnMtMiAxNiA0IDIyYzIuMyAyLjMgNC44IDQuNSA3LjQgNi41TDQ0IDkyczMtMSAwLTVjLTIuMS0yLjktLjktNS44LjEtNy42bC44LTEuNUM0NSA3NyA0NSA3NiA0NCA3NHpNMTE4LjUgNzAuNmMuNS0xLjcgOS4yLTggOS4yLThzLS44IDEwLjgtMy4zIDE2LjFjLTEgMi4xLTIuMyA0LjQtNCA2LjItLjUuNi0yLjMgMS41LTIuMyAxLjVsLjUtMy43YTM4LjggMzguOCAwIDAwLS4xLTguOWwtLjMtMi4yYzAtLjMgMC0uNS4zLTF6Ii8+PGcgZmlsbD0iIzAxMDEwMSI+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik00NCA3NGMyIDEtMTUtMTItMTUtMTItLjctLjEtLjggMTcuOSA0IDIybDcuNCA2LjVMNDQgOTJjLTEzLTcuMi0xOS4yLTI3LjIgMC0xOHpNMTE4LjUxIDcwLjY1M2MuMzI4LTEuNjM0IDkuMjUzLTguMDg1IDkuMjUzLTguMDg1LS41NDggNC40NzMtMS4wNCAxMS44Ny0zLjUwNCAxNi41MTUtMi4xOSA0LjIxNS0zLjAxMiA0LjkwMy0zLjc3OCA1Ljc2My0uNTQ4LjYwMi0xLjk3MSAxLjI5LTEuOTcxIDEuMjkgNy4xMTctNi4xOTMgMTAuNTEyLTIzLjM5NiAwLTE1LjQ4M3oiLz48L2c+PGcgb3BhY2l0eT0iLjQiPjxwYXRoIGQ9Ik0zOSA3NWMtMiAwLTQgMy0yIDZzNiAzIDYgMy0xLS45LjUtMy41UzQxIDc1IDM5IDc1ek0xMjEuMjQ4IDcxLjUxM2MxLjA5NCAwIDIuMTkgMi41ODEgMS4wOTQgNS4xNjJzLTMuNTAzIDIuNTgtMy41MDMgMi41OGwtLjA1NS0zLjAxYy0uMTEtMi41ODEgMS4zNjgtNC43MzIgMi40NjMtNC43MzJ6Ii8+PC9nPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzA3Ij48cGF0aCBkPSJNMTM3LjEgNjQuM3M3LjIgNi4zIDYuMyAxNS4yYzAgMC0xLjggOS4yLTIuNCAxMC41cy0zLjEgOC43LTkuMSA5LjlsLTQuMS41Yy0uOCAxLjMtMS44IDIuNC0zIDMuMy0yLjQgMi02LjYgMi41LTcuOCAxLjlzLS42IDEuMy0xLjkuN2wtNC42LTEuNmM1LTUuOCA3LjktMTMuMSA4LjctMjIuOGwxLjItMS4yIDUuNy03LjVjMi4xLTIuOSA2LjgtNC43IDcuNy01LjEgMCAwLTUuMSA2LjItMy41IDcuN3M0LjQuNCA0LjQuNCA0LjEtLjMgMi40LTExLjl6TTE5LjkgNjQuM3MtNy4yIDYuMy02LjMgMTUuMmMwIDAgMS44IDkuMiAyLjQgMTAuNXMzLjEgOC43IDkuMSA5LjlsNC4xLjVjLjggMS4zIDEuOCAyLjQgMyAzLjMgMi41IDIgNi41IDIuNSA3LjggMS45cy42IDEuMyAxLjkuNyA3LTEuNiA4LjEtNC40Yy42LTEuNy42LTMuNy0uMS01LjQgMCAwLTQuMS0uNS01LjcgMSAwIDAtLjgtMy41LTQuMy0yLjcgMCAwIDMuMi04LjQtMy4yLTE0LjFMMzEgNzMuMmMtMi4xLTIuOS02LjgtNC43LTcuNy01LjEgMCAwIDUuMSA2LjIgMy41IDcuN3MtNC41LjQtNC41LjQtNC4xLS4zLTIuNC0xMS45eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMTM3LjEgNjQuM3M3LjIgNi4zIDYuMyAxNS4yYzAgMC0xLjggOS4yLTIuNCAxMC41cy0zLjEgOC43LTkuMSA5LjlsLTQuMS41Yy0xLjguNi0zLjktLjEtNi0xLjIgMy41IDEgMjAuNy0xNC44IDEyLjktMjIuOCAwIDAgNC4xLS41IDIuNC0xMi4xek0yOSA3Ny45czIuNi0xLjQgNC0xLjFjMCAwLTIuOS01LjYtNS45LTYuNCAwIDAgMy4zIDQuNyAxLjkgNy41eiIvPjwvZz48ZyBvcGFjaXR5PSIuMiI+PGcgZmlsbD0iIzAxMDEwMSI+PHBhdGggZD0iTTEyNy44IDEwMC40Yy0uOCAxLjMtMS44IDIuNC0zIDMuMy0yLjQgMi02LjYgMi41LTcuOCAxLjlzLS42IDEuMy0xLjkuN2wtNC42LTEuNiAxLjctMi40czEuOS0uMyAyLTFjMi4xIDMuMyA3LjEtMS44IDUuNi0zLjUgMCAwIDMuOSAzLjEgOCAyLjZ6TTI5LjIgMTAwLjRjLjggMS4zIDEuOCAyLjQgMyAzLjMgMi41IDIgNi41IDIuNSA3LjggMS45cy42IDEuMyAxLjkuNyA3LTEuNiA4LjEtNC40Yy42LTEuNy42LTMuNy0uMS01LjQtMS40IDYuNC02LjkgNi43LTcuMiA0LjgtMi4xIDMuMy03LjEtMS44LTUuNi0zLjUuMSAwLTMuOCAzLjEtNy45IDIuNnoiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTEyOS43IDc3LjNzLTMuNS0uOC01LjQtLjFjMCAwIDMuNS02LjUgNy40LTguMSAwIDAtNCA1LjctMiA4LjJ6TTE5LjkgNjQuM3MtNy4yIDYuMy02LjMgMTUuMmMwIDAgMS44IDkuMiAyLjQgMTAuNXMzLjEgOC43IDkuMSA5LjlsNC4xLjVjMS44LjYgMy45LS4xIDYtMS4yLTMuNSAxLTIwLjctMTQuOC0xMy0yMi44LjEgMC00LS41LTIuMy0xMi4xeiIvPjwvZz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8wOCI+PHBhdGggZD0iTTM0LjUgMTE2LjlMMzIuOSAxMDRsMi0uNCAxLjUgMTNzLS40IDItMS45LjN6IiBmaWxsPSIjMzAzMDMwIi8+PHBhdGggZD0iTTQ2LjggNzEuN2MxLjYgMi4zIDIgNS4xIDEuMiA3LjdsLS40IDIgNC4zLjFjMyAuOSAzLjIgOCAuNiAxMC4yLTEuMS42LTIuMSAxLjQtMyAyLjJhMjUgMjUgMCAwMS04LjQgNi4zbC0zLjMgMS40Yy02IDIuNC0xNy40IDUuOS0xOS4zLTYuNWwuMy02LjZjLjItMy4zLTEuNS01LjcuOC0xMnM4LjgtNy4zIDEzLjYtNmMwIDAgLjguNSAyLjQtMS43czguMy0zLjMgMTEuMiAyLjl6IiBmaWxsPSIjZDhkOGQ4Ii8+PHBhdGggZD0iTTM5LjEgMTAxLjFjLTUuNiAyLjQtMTguNCA3LjItMjAuNC02LjFsLjQtNi43Yy4yLTMuMy0xLjUtNS43LjgtMTJzMi40LTYuNCAxMy42LTZjMTAuMy4zIDUuMyAxNi4zIDcuMiAyNy4xIDAgMS4xLS43IDMuMy0xLjYgMy43eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00MS4yIDEwMC4yYzMuMi0uNy0yMC4yIDEwLjMtMjIuNS01LjJsLjMtNi42Yy4yLTMuMy0xLjUtNS43LjgtMTJzOC44LTcuMyAxMy42LTZjLTE0LjguOS04LjQgMzEuOSA3LjggMjkuOHoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik01Mi42IDkxLjlzLTguMyA3LjItMTEuNCA4LjRjLTIuNyAxLTE2LjIgOC4xLTIxLS41LS42LTEuNS0xLjItMy4xLTEuNS00LjcuOSAyLjIgNS43IDQuMiAxMC42IDQuMyA2LjYuMyAxMS4yLTQuMyAxNS4zLTMuNiAyLjUtMS42IDUuMi0yLjkgOC0zLjl6IiBvcGFjaXR5PSIuMTYiLz48cGF0aCBkPSJNMzMgNTQuN2w4LjYuMy01LjMgNi42IDIuMSA4LjEtNy44LTMuMi03IDQuOC41LTguNC02LjYtNS4yIDguMi0yLjIgMy04eiIvPjxwYXRoIGQ9Ik0zMC4zIDU0LjNsMS4zIDJjLjIuMy42LjUgMSAuNWwyLjIuMWMuNiAwIDEgLjYgMSAxLjJsLS4yLjctMS41IDJjLS4zLjItLjMuNS0uMyAxbC42IDIuM2MuMS41LS4xIDEuMS0uNyAxLjNoLS44bC0yLjEtMWEuOS45IDAgMDAtMSAuMmwtMiAxLjNjLS41LjMtMS4yLjItMS42LS4yLS4yLS4yLS4yLS41LS4yLS44bC4yLTIuM2MwLS40LS4yLS43LS41LTFMMjMuOCA2MGMtLjQtLjMtLjUtMS0uMy0xLjZsLjYtLjQgMi4zLS42Yy4zLS4xLjYtLjMuOC0uN2wuOC0yLjJjLjItLjYuOS0uOSAxLjUtLjcuNCAwIC43LjEuOC40eiIgb3BhY2l0eT0iLjUiIGZpbGw9IiNmZmYiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzA5Ij48cGF0aCBkPSJNNTIuNSAxMDMuMXMuOS4xIDEuOS0xLjYuNS01LjMtMi4xLTYuNS0zLjMtMy45LTQuOC02LjctNy40LTcuOC0xOS05LjctMTIuOS02LjUtMTMuNy03LjUtMi41IDcuOSAxLjQgMTUuNFMyNi43IDEwMCAzNiA5Ny4yczEyLjQgMiAxMi40IDIgMi4zIDMuNyA0LjEgMy45ek0xMTkuNSA4MmMzLjItMSA2LjUtMS42IDkuOS0xLjggMTItMSAxMy44LTUuNCAxNC43LTYuM3MxLjkgOC0yLjYgMTUuMS0xMS45IDEyLjUtMjEuMiA5Yy0xLjQtLjUtMi44LS45LTQuMy0xLjFhMzUuMiAzNS4yIDAgMDAzLjUtMTQuOXoiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMTQiPjxwYXRoIGQ9Ik01Mi41IDEwMy4xcy45LjEgMS45LTEuNi41LTUuMy0yLjEtNi41LTMuMy0zLjktNC44LTYuNy03LjQtNy44LTE5LTkuNy0xMy41LTkuMy0xMy43LTcuNWMxLjMgMTYuMyAyOS42IDExLjUgMzcuNyAzMnpNMTE5LjIgODIuNGMzLjYtMS4yIDcuMy0xLjkgMTEtMi4yIDEyLTEgMTQuNy04LjEgMTQuNy02LjMtMS44IDEwLjUtMTQuOSAxMS4xLTI2LjQgMTYgMS4yLTQuMyAxLjItNS4yLjctNy41eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzEwIj48cGF0aCBkPSJNNjMuMyA3Ni4xcy44IDE0LjEtMTcuNiAyMS4xLTI3LjgtNS41LTI3LjgtNS41LS41LTE1IDE4LjQtMjEgMjcgNS40IDI3IDUuNHoiIGZpbGw9IiNkZDgzMTMiLz48cGF0aCBkPSJNNjMuMyA3Ni4xcy44IDE0LjEtMTcuNiAyMS4xLTI3LjgtNS41LTI3LjgtNS41YzIwLjkgMi4xIDM0LjQtMy44IDQ1LjQtMTUuNnoiIG9wYWNpdHk9Ii41IiBmaWxsPSIjNzU0YzI0Ii8+PHBhdGggZD0iTTQ2LjggNzcuNmgtLjJsLS40LjFjLS4yLjEtLjMuNC0uMy42bDEuMyAzLjctNSAxLjgtMS45LTUuMWMtLjEtLjMtLjMtLjQtLjYtLjNsLS40LjFjLS4yLjEtLjQuNC0uMy43bDIgNS4xLTUuOCAyLjEtMS4xLTMuMWMtLjEtLjMtLjMtLjQtLjYtLjNsLS40LjFjLS4zLjEtLjQuNC0uMy42bDEuMiAzLjItNC42IDEuN2MtLjMuMS0uNC4zLS4zLjZsLjEuNGMuMS4yLjQuMy42LjNsNC42LTEuNyAxLjQgMy43Yy4xLjMuMy40LjYuM2wuNC0uMWMuMy0uMS40LS4zLjMtLjZsLTEuNC0zLjggNS43LTIuMSAyIDUuMmMuMS4zLjMuNC42LjNsLjMtLjJjLjMtLjEuNC0uMy4zLS42bC0yLTUuMiA1LjEtMS45IDEuMiAzLjNjLjEuMy4zLjQuNi4zbC40LS4xYy4zLS4xLjQtLjMuMy0uNkw0OSA4Mi44bDUtMS45Yy4zLS4xLjQtLjMuMy0uNmwtLjEtLjRjLS4xLS4zLS4zLS40LS42LS4zbC01IDEuOS0xLjQtMy42YzAtLjItLjItLjMtLjQtLjN6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xMSI+PHBhdGggZD0iTTE0LjIgODAuM2w2LjEtLjljMS43LS4yIDMuMy45IDMuNSAyLjYuMiAxLjctLjkgMy4zLTIuNiAzLjVsLTYuMS45Yy0xLjcuMi0zLjMtLjktMy41LTIuNi0uMi0xLjcuOS0zLjIgMi42LTMuNXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxnIGZpbGw9IiNlMGUwZTAiPjxwYXRoIGQ9Ik0zNi4zIDkyLjNMMzYgOTljLS4zLS4zIDIuNyAyLjMgNSAwbC0uNC03LjgtNC4zIDEuMXpNMTI5LjYgOTcuMWwtLjggNi43Yy0uMy0uMyAyLjUgMi41IDUgLjNsLjEtNi4xYTYgNiAwIDAxLTQuMy0uOXpNMzQgNDIuMnMuOS00LjMgMy41LTEuNyA1LjggMTYuMSAyLjQgMjMuOWMtLjggNC43LS42IDUuNy0uNiA1LjctMS4xLjUtMi40LjUtMy41IDBMMzQgNDIuMnpNMTI5LjUgNTAuOGwtLjggMTUuNHMtLjIgNC42IDQuNCA0LjkgNS41LTIuOCA1LjYtNC4zbC44LTE1LjRzLTEuMi4zLTEuNCA0LjItMS4yIDcuNi0yIDcuNmgtLjZjLS41IDAtLjktLjItLjgtMi40LjItMy4xLjUtOS4yLS4zLTkuM3MtMS4zIDkuMi0xLjMgOS4yLS4xIDIuMy0xLjcgMi4yLTEuMS04LjUtMS4xLTguNS40LTQtLjgtMy42ek0xMzAuOSA3N2wtMi40IDcuOCAyIC4yIDIuMi03LjN6Ii8+PC9nPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0zNy41IDQwLjRTNDQgNTAgMzkuOSA2NC4zYy41IDUuNy0uMy0yMi4yLTIuNC0yMy45eiIgb3BhY2l0eT0iLjEiLz48ZyBvcGFjaXR5PSIuMyI+PHBhdGggZD0iTTM0LjYgNDJjLjMgMCAuNS4yLjUuNWwxLjcgMjYuOWMwIC4zLS4yLjUtLjUuNXMtLjUtLjItLjUtLjVsLTEuNy0yNi45YzAtLjIuMi0uNC41LS41ek0xMzkuNSA1MS4zcy0uOSAzLTEuNCAxMC43YzAgMCAwIDguNC0yLjYgOC43IDAgMCAyLjguNCAzLjMtOC44bC43LTEwLjZ6TTEzNC40IDYwLjJsLjUtOC41cy0uNCA4LjUtLjEgMTAtLjUgMS41LS41IDEuNWwuMS0zeiIvPjwvZz48cGF0aCBkPSJNMjcgNjguMmE3IDcgMCAwMC0xLjcgNS45bC4xIDEuNnMtNy45LTIuMy03LjYgNC4ybC4xIDEuN2MuMiA1LjMuOCA3LjggNC4xIDkuNyAzLjYgMi4xIDQuMi0xLjQgNi41LS4yczE0LjYgMTAuMiAxOC4xLTEuNmwuNS01LjJjLjItMi42IDEuOC00LjMuNi05LjRzLTYuMS02LjYtMTAtNi4xYzAgMC0uNi4zLTEuNy0xLjZzLTYtMy41LTkgMXoiLz48L2c+PHBhdGggZD0iTTI1IDgwLjRsNC40LS40Yy4yIDAgLjUuMi41LjRzLS4yLjUtLjQuNWwtNC40LjRjLS4yIDAtLjUtLjItLjUtLjRzLjEtLjQuNC0uNXpNMjUuMiA4Mi4ybDQuNC0uNGMuMiAwIC41LjIuNS40cy0uMi41LS40LjVsLTQuNC40Yy0uMiAwLS41LS4yLS41LS40IDAtLjMuMi0uNS40LS41ek0yNS41IDgzLjlsNC40LS40Yy4yIDAgLjUuMi41LjRzLS4yLjUtLjQuNWwtNC40LjRjLS4yIDAtLjUtLjItLjUtLjRzLjEtLjQuNC0uNXoiLz48cGF0aCBkPSJNMTI0IDczLjVhNi44IDYuOCAwIDAwLTEuNiA1LjhsLjEgMS42LTMuMy0uMy0xLjQgNy43Yy44LjYgMS41IDEuMiAyLjEgMS45LjYgMSAzLjUgNC40IDUuOCA1LjVsMi40IDEuM2M0LjQgMi40IDEyLjcgNiAxNS4yLTMuM2wuNC01LjFjLjItMi41IDEuNy00LjIuNC05LjJzLTYtNi4zLTkuOC01LjhjMCAwLS42LjMtMS43LTEuNXMtNS44LTMtOC42IDEuNHoiIGZpbGw9IiNkOGQ4ZDgiLz48cGF0aCBkPSJNMTI3LjIgOTYuNWM0IDIuMyAxMy40IDcuMSAxNi4xLTIuOGwuNC01LjFjLjItMi41IDEuNy00LjIuNC05LjJzLTEuMy01LTkuOC01LjhjLTcuOC0uNy01LjUgMTEuOS03LjggMjAtLjMuOC4xIDIuNS43IDIuOXoiIGZpbGw9IiNmZmYiLz48ZyBvcGFjaXR5PSIuMDUiPjxwYXRoIGQ9Ik0yOC40IDkxYy0yLjUtLjkgMTQuNyAxMC4yIDE4LjEtMS42bC41LTUuMmMuMi0yLjYgMS44LTQuMy42LTkuNHMtNi4xLTYuNi0xMC02LjFDNDkgNzAuOSA0MC44IDk0LjQgMjguNCA5MXpNMTI1LjcgOTUuN2MtMi40LS44IDE0LjQgOS42IDE3LjYtMS45bC40LTUuMWMuMi0yLjUgMS43LTQuMi40LTkuMnMtNi02LjMtOS44LTUuOGMxMS4xIDIgMy41IDI1LTguNiAyMnoiLz48L2c+PGcgb3BhY2l0eT0iLjE2Ij48cGF0aCBkPSJNMTkgODguNGMuOCAxLjEgMS44IDIgMi45IDIuOCAzLjYgMi4xIDQuMi0xLjQgNi41LS4yIDIgMS4xIDExLjcgOCAxNi40IDEuOS43LTEuMSAxLjItMi4zIDEuNy0zLjUtMSAxLjYtNC45IDIuNy04LjcgMi4zLTUuMi0uNS04LjMtNC42LTExLjUtNC40LTUuNCAyLjEtNy4zIDEuMS03LjMgMS4xek0xMTcuOCA4OC4zczUuNyA2LjIgNy45IDcuNGMyIDEgMTEuNiA3LjYgMTYgMS41YTI2IDI2IDAgMDAxLjYtMy40Yy0uOSAxLjYtNC43IDIuNy04LjQgMi40LTUuMS0uMy04LjEtNC4zLTExLjMtNC4xYTI2LjMgMjYuMyAwIDAwLTUuOC0zLjh6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTIiPjxwYXRoIGQ9Ik00MiA2Ni41Yy0yLjEtNC02LjYtNi4yLTExLTUuNS04IDEtMTAgNC0xMiA5czcgMTcgNyAxN2w2IDZjMSAxIDAgNyA0IDlzMTMgMCAxMy00LTQtNS01LTE4bDEtOS0zLTQuNXpNMTE0IDYxLjFzMTQuMy03LjQgMTkuNy0xYzUuNCA2LjQtNS41IDE4LjEtNS41IDI0LjUgMCA2LjQuNSA5LjMtNS4zIDEyLjEtNy4xIDMuNS02LjgtLjctNi44LS43LTEuMSAwIDYuNi0xOS0yLjEtMzQuOXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik00NCA3NGMtMS0yLTYtNy0xMi00cy0zIDEwIDEgMTRjMi4zIDIuMyA0LjggNC41IDcuNCA2LjVMNDQgOTJzMy0xIDAtNWMtMi4xLTIuOS0uOS01LjguMS03LjZsLjgtMS41QzQ1IDc3IDQ1IDc2IDQ0IDc0ek0xMTggNjkuN2MuNS0yIDMuNi02LjcgNy4zLTMuOCAzLjcgMi44IDEuOSA5LjYtLjYgMTMuNC0xLjQgMi4yLTMuMiA1LTQuNiA2LjItLjcuNi0yLjUgMS4zLTIuNSAxLjNzLjMtMS41LjUtNC42YTQ4LjYgNDguNiAwIDAwLS40LTkuN2MtLjEtMS4zLS4zLTEuNi4yLTIuOHoiLz48cGF0aCBkPSJNNDIgNjYuNWMtMi4xLTQtNi42LTYuMi0xMS01LjUgMTMgNCAxNCAzMiAxMyAxOWwxLTktMy00LjV6IiBvcGFjaXR5PSIuMSIvPjxnIGZpbGw9IiMwMTAxMDEiPjxnIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzEgNjFjLTggMS0xMCA0LTEyIDlzNyAxNyA3IDE3bDYgNmMxIDEgMCA3IDQgOSAxLjggMSA2LjYgMS4xIDEwLjItLjYgMy43LTEuOCAzLTMuOSAyLjEtNi4zIDEgNC43LTEyLjUgOC4zLTEzLjYuNkMzMy44IDg5LjcgMjIgODAuMiAyMiA3M2MwLTggNC45LTguOSA5LTEyek0xMTguNiA1OS4yczkuOS0xLjQgMTEuNiA0LjRjMiA2LjctMy44IDExLjctNC44IDE2LjdTMTI1IDg3IDEyNCA5MmMtLjQgMi44LTIuNCA1LTUuMSA1LjkgMCAwIDkuNy0xLjEgOS4zLTkuNi0uNC03LjcgMS45LTEwLjIgMy43LTEzLjkgMS44LTMuNiA1LTguOSAyLjEtMTMuOC0yLjYtNC43LTEyLTIuNy0xNS40LTEuNHoiLz48L2c+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik00NCA3NGMtMS41LTIuNC02LjEtNi44LTEyLTQtNiAzLTMgMTAgMSAxNCAyLjMgMi4zIDQuOCA0LjUgNy40IDYuNUw0NCA5MmMtMTMtNy4yLTE5LjItMjcuMiAwLTE4ek0xMTcuOSA2OS42ODVjLjEyNC0uNDggMy4zODgtNy4wOTggNy4zOTEtMy44MzcgMy42MzQgMi44NzggMS44NDggOS41OTMtLjYxNiAxMy40My0xLjQxNiAyLjIwNi0zLjI2NCA1LjA4NC00LjU1NyA2LjIzNS0uNzQuNjcyLTIuNTI2IDEuMjQ3LTIuNTI2IDEuMjQ3IDguMTkyLTYuNzE1IDEyLjEzNC0yNS45LjMwOC0xNy4wNzV6Ii8+PC9nPjxnIG9wYWNpdHk9Ii41Ij48cGF0aCBkPSJNMzkgNzVjLTIgMC00IDMtMiA2czYgMyA2IDMtMS0uOS41LTMuNVM0MSA3NSAzOSA3NXpNMTIwLjk4IDcwLjY0NWMxLjIzMiAwIDIuNDYzIDIuODc3IDEuMjMyIDUuNzU1cy00LjAwNCAyLjg3OC00LjAwNCAyLjg3OCAwLTEuOTE5LS4xMjMtMy41NWMtLjM3LTIuNjg1IDEuNjYzLTUuMDgzIDIuODk1LTUuMDgzeiIvPjwvZz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xMyI+PHBhdGggZD0iTTQ2LjcgNjcuMnMtOC40LjYtOS45IDcuN2MwIDAtOC41LjEtMTIuMSA2LjRMMTYgODQuOWwuMiAzIDE3LjQgMTguOCAxLjQgNC45czQuMiA0LjkgOS4zIDUuNmw2LjctNi43cy0uNC01LTIuNC01LjgtNy4zLTMuNS04LjMtMy40LTYtMTIuNi02LTEyLjYgMTIgNi43IDE2LjYtNi4yYzAtLjEgOC44LTE0LjgtNC4yLTE1LjN6TTExNy4xIDY3bC41LjJjMy4zLjkgNS44IDMuNSA2LjcgNi44IDAgMCA4LjUtLjEgMTIuMiA2bDguOSAzLjQtLjEgMy0xNi45IDE5LjMtMS4yIDVzLTEuMSAzLTYuMiAzLjdsLTkuOC00LjRzLjItNSAyLjMtNS45IDcuMi0zLjcgOC4yLTMuNiA1LjYtMTIuOCA1LjYtMTIuOC00LjQgMi42LTkgMS43QzEyMCA3OCAxMTggNzQgMTE3LjEgNjd6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48ZyBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTM3LjcgOTZjLjggMiAxLjUgMy4yIDIuMyA0LjYtNC44IDEtNi4yIDMtNyA1LjlsLTQtNC4zYzEuMy00LjQgNC01LjggOC43LTYuMnpNMTMzLjEgMTAxYy0xLjYgMS41LTIuNSAyLjYtMy42IDMuOC0yLjUtNC4yLTQuOC00LjctNy45LTQuNGwyLjctNS40YzQuNS0uMyA2LjcgMS43IDguOCA2eiIvPjwvZz48ZyBmaWxsPSIjMDEwMTAxIj48cGF0aCBkPSJNNDYuNyA2Ny4yYzYuMyAzIDUuMSAxNC41LTIuMSAxMy0uNCAyLjktMS41IDcuMS05LjggNi0zLjEuOC01LjcgMS4yLTUuNyAxLjJsOS4xIDE0LjhjNS45IDEuNiAxMC41IDQuMyAxMi44IDguMyAwIDAtLjQtNS0yLjQtNS44LTItLjgtNy41LTMuNS04LjUtMy41LTEtLjQtNS45LTEyLjYtNS45LTEyLjZzMTIgNi44IDE2LjctNi4xYy0uMS0uMiA4LjgtMTQuNy00LjItMTUuM3oiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTExNy40IDY5LjRzNC44IDIuOCA1LjggNi44YzAgMCA3IDEgOSA2bDMgMS0xMSAxOS04IDVhMTEgMTEgMCAwMC0zIDMuOGwtMi0xcy4xLTUuOCAzLjItNi4yYzIuNi0xLjMgNi41LTMuNCA3LjYtMy40IDIuMi00IDMuNy04LjQgNS4zLTEyLjdhMTMuNyAxMy43IDAgMDEtOSAxLjdjMS4yLTcuMS44LTEzLjEtLjktMjB6IiBvcGFjaXR5PSIuMTUiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0ic2lkZV8xNCI+PHBhdGggZD0iTTMwIDcxczYtNSAxMCAyLTEgMTIuMS0xIDEyLjEgMTEuMSAxNS4zIDE5LjIgMTYuMmMwIDAgMy4zLTQuOSAxMC4yLTEuNSA3IDMuNCAzLjggOS41IDMuOCA5LjVzLTIgNC05IDQtMjQuMS0xMy0zMC4xLTI1QzI3IDc2LjEgMjkgNzMgMzAgNzF6Ii8+PHBhdGggZD0iTTMwIDcxczYtNSAxMCAyLTEgMTIuMS0xIDEyLjEgMTEuMSAxNS4zIDE5LjIgMTYuMmMwIDAgMy4zLTQuOSAxMC4yLTEuNSA3IDMuNCAzLjggOS41IDMuOCA5LjUtNC4zLTcuNS03LjgtNi43LTE1LjItNi4yLTEyLTMuMi0yMS42LTE0LjQtMjAtMTYuOCAwIDAgNS4zLTE0LjYtNy0xNS4zeiIgb3BhY2l0eT0iLjIiIGZpbGw9IiMwMTAxMDEiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjYuNyA1NS42YTIyIDIyIDAgMDAtOS43IDEzIi8+PHBhdGggZD0iTTMwIDU5LjJhMTcuOSAxNy45IDAgMDAtNy45IDEwLjciIG9wYWNpdHk9Ii42Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTUiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTEzOS41IDYxLjVsLTcuNCAxMy4zLTEyLjggNy43cy0uNiA0LjYtMSA1LjljLTEuMSA0IDIwLjEgMi4zIDIyLjMtMS43bC0yLjgtNC43IDExLjItOS42YzEuNC0yLjUuOS0zLjctMS45LTMuNGwtMTAuOSA4LjEgNi44LTEzLjRjLjYtMi44LTItMy4zLTMuNS0yLjJ6Ii8+PHBhdGggZD0iTTExOS40IDgyLjRsNi4zLTkuOGMuOC0uOSAxLjgtMSAzLjEtLjRhMTQyLjIgMTQyLjIgMCAwMDguMiA2LjVzLS42IDIuOC00LjQgMkwxMjkgODBzLjYgMy4xLTMuNCAzLjctNi4yLTEuMy02LjItMS4zek0yNS44IDYzLjdMMzQgNzcuM2wxNC42IDcuNnMuNiA0LjggMSA2LjFjMS4yIDQuMS0yMS42IDMtMjQtMWwxLjYtNS4xLTEyLjctOS42Yy0xLjYtMi41LS45LTMuOCAyLjMtMy41bDEyLjQgOC4xLTcuNS0xMy43Yy0uNi0zIDIuMy0zLjYgNC4xLTIuNXoiLz48cGF0aCBkPSJNNDguNCA4NC44bC03LjEtOS45Yy0uOS0uOS0yLjEtMS0zLjYtLjMgMCAwLTMuOSAyLjYtMi4xIDEuNVMyOCA4MS42IDI4IDgxLjZzLjYgMi45IDUgMmw0LjQtLjlzLS44IDMuMiAzLjggMy44IDcuMi0xLjcgNy4yLTEuN3oiLz48L2c+PGcgZmlsbD0iIzAxMDEwMSI+PGcgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0xMTkuNCA4Mi40bDYuMy05LjhjLjgtLjkgMS44LTEgMy4xLS40YTE0Mi4yIDE0Mi4yIDAgMDA4LjIgNi41cy0uNiAyLjgtNC40IDJMMTI5IDgwcy42IDMuMS0zLjQgMy43LTYuMi0xLjMtNi4yLTEuM3pNNDguNCA4NC44bC03LjEtOS45Yy0uOS0uOS0yLjEtMS0zLjYtLjMgMCAwLTMuOSAyLjYtMi4xIDEuNVMyOCA4MS42IDI4IDgxLjZzLjYgMi45IDUgMmw0LjQtLjlzLS44IDMuMiAzLjggMy44IDcuMi0xLjcgNy4yLTEuN3oiLz48cGF0aCBkPSJNMjIgNjQuMWMxLjMgMCAyLjUuOCAzIDEuOWw2LjkgMTIuOSAyLjEtMS42TDI2IDY0YTIuOCAyLjggMCAwMC00IC4xYzAtLjEgMCAwIDAgMHpNMTQ5IDY5LjFjLjIgMS4zLTEuMiAyLTIuMiAyLjdMMTM2IDgwbDEuOSAxLjggMTEuMS05LjRjLjYtMSAxLjMtMi40IDAtMy4zek0xNDEuMyA2MXMuNS44LS43IDIuN2wtNy4yIDExLjcgMi41IDEuOSA3LTEzLjNjMCAuMiAxLTIuNy0xLjYtM3pNMTMuNzE4IDcyLjg2OGMuOTkxLS40MiAyLjAwNi4yNTggMy4wMjQgMS4xMzcgMS43MyAxLjM2NCAxMC43NjQgNy42NzcgMTAuNzY0IDcuNjc3bDIuMjcyLTEuMzQ4LTEyLjk4Mi04LjUzYy0xLjMwNC0uMTczLTIuNzk5LjA1OC0zLjA3OCAxLjA2NHpNMTM5LjUgODQuOVMxMjUgOTEgMTE4IDg4bC40IDEuMXMzLjMgMi41IDEyLjUgMS4yYzAgMCA4LjEtMS4zIDkuMS0zLjNsLS41LTIuMXpNLTMwNC42NTkgNzIuODk4czE1LjU5MSA3Ljg2OSAyMi43NDYgNS4yNThjMCAwIC4yNS45MTUtLjI2IDEuMDg3LTMuMzcyIDEuMjE3LTYuMTc0IDEuMTYzLTE0LjAwMS0uMzcgMCAwLTcuODIyLTEuNjMyLTkuMzc3LTQuMzIxeiIvPjwvZz48cGF0aCBkPSJNNDguNCA4NC44bC03LjEtOS45Yy0uOS0uOS0yLjEtMS0zLjYtLjMgMCAwLTMuOSAyLjYtMi4xIDEuNVMyOCA4MS42IDI4IDgxLjZjMi4zLTEuMyAxMy41LTcuMiAyMC40IDMuMnoiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTYiPjxwYXRoIGQ9Ik00Mi44IDY4LjdjMS42IDIuMyAyIDUuMSAxLjIgNy43bC0uNCAyIDQuMy4xYzMgLjkgMy4yIDggLjYgMTAuMi0xLjEuNi0yLjEgMS40LTMgMi4yYTI1IDI1IDAgMDEtOC40IDYuM2wtMy4zIDEuNGMtNiAyLjQtMTcuNCA1LjktMTkuMy02LjVsLjMtNi42Yy4yLTMuMy0xLjUtNS43LjgtMTJzOC44LTcuMyAxMy42LTZjMCAwIC44LjUgMi40LTEuN3M4LjMtMy4zIDExLjIgMi45eiIgZmlsbD0iI2Q4ZDhkOCIvPjxwYXRoIGQ9Ik00OC42IDg4LjlzLTguMyA3LjItMTEuNCA4LjRjLTIuNyAxLTE2LjIgOC4xLTIxLS41LS42LTEuNS0xLjItMy4xLTEuNS00LjcuOSAyLjIgNS43IDQuMiAxMC42IDQuMyA2LjYuMyAxMS4yLTQuMyAxNS4zLTMuNiAyLjUtMS42IDUuMi0yLjkgOC0zLjl6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMTYiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQxIDIybC0xNiA5TTQ5IDU3TDI3IDcwTTQ2IDI3TDE5IDQyTTQ4IDM0TDE2IDUyTTQxIDcxTDI4LjUgMjdNNDUgNjVMMzIgMjBNMzUgNzJMMjQgMzRNNDkgNThMMzcgMTdNMjggNjhsLTgtMjhNNTAgNDFMMTggNTlNNTMgNDdMMjEgNjUiLz48L2c+PHBhdGggZD0iTTUyLjUgMzUuNWMtMS43LTkuMi05LjctMTcuOC0xNy45LTE5LjRDMzMgMTUuOCAyMCA0MSAxMi4zIDUzLjVhNTAgNTAgMCAwMDkuMiAxNWM5IDE0IDExIDE1IDEyIDI4bDEgMTJzLTEgMC0xIDIgMiAzIDQgMyA0LTEgNC0zYTIgMiAwIDAwLTItMmwtMS0xMnMtLjYtMjAuMiA4LTMxYzguNS0xMC42IDgtMTkgNi0zMHptLTE4IDQ4bC01LTExczMgNCA5IDBsLTQgMTF6bS0uMS0xNWMtOC45LjctMTcuMS04LjUtMTguOS0yMC45QzIyIDM2IDMwIDIzIDMxLjcgMTkuNWM4LjkuMyAxNi42IDEwLjMgMTcuNyAyMy4xIDEuMiAxMy41LTUuNiAyNS4xLTE1IDI1Ljl6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNCAxNi40YzMuMi4yIDUuOCAyLjUgOCA0LjYgNiA2IDggMTAgOSAyMXMtMy41IDIwLjUtNy41IDI0LjUtMTQgNi0xNCA2YTggOCAwIDAwNSAxYzEuNC0uMyAyLjgtLjggNC4xLTEuNGwyLjkgMi40YzEuNi0zLjUgMy41LTYuOSA1LjgtMTBhMjkgMjkgMCAwMDYuNC0xOS40Yy0uMy05LTMtMjQuNi0xOS4yLTI5ek0zNyAxMDMuNWwuNSA3cy43IDIuMi0xLjEgMi42IDYuMS40IDUuMS0yLjZhMiAyIDAgMDAtMi0ybC0uNC00LjgtMi4xLS4yeiIvPjwvZz48cGF0aCBkPSJNMzUuMSA5OC4xYy01LjYgMi40LTE4LjQgNy4yLTIwLjQtNi4xbC40LTYuN2MuMi0zLjMtMS41LTUuNy44LTEyczIuNC02LjQgMTMuNi02YzEwLjMuMyA1LjMgMTYuMyA3LjIgMjcuMSAwIDEuMS0uNyAzLjMtMS42IDMuN3oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzcuMiA5Ny4yYzMuMi0uNy0yMC4yIDEwLjMtMjIuNS01LjJsLjMtNi42Yy4yLTMuMy0xLjUtNS43LjgtMTJzOC44LTcuMyAxMy42LTZjLTE0LjguOS04LjQgMzEuOSA3LjggMjkuOHoiIG9wYWNpdHk9Ii4wNSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTciPjxnIGZpbGw9IiM0MjIxMGIiPjxwYXRoIGQ9Ik01NC43IDc0LjRzLTExLjYtLjQtMTMuMy0yLjctNS44IDYuNC01LjggNi40LTQuNyA0LjctOC41IDQuNGE2MC44IDYwLjggMCAwMS0xMS4zLTUuOGw5LjggMTAuNyA5LjMuNiAyLjUtMi40LTEuNyA4LjUgMS43IDkuMS42LTkgNS41LTEyLjcgNC43LjMgMi4xIDMuMiAyLjMuMmMuMi4xIDUuMS0zLjUgMi4xLTEwLjh6TTExOS4xIDc2LjJzNi44IDQuNyAxMC41IDQuNGMyLjQtLjIgMTEuNC01LjggMTEuNC01LjhsLTkuOCAxMC43LTkuMy42LTIuNS0yLjQgMS43IDguNS0xLjcgOS4xLS42LTktMS0yLjRhNDUuMyA0NS4zIDAgMDAxLjMtMTMuN3oiLz48L2c+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjciPjxwYXRoIGQ9Ik0xNDEuMiA3NC44bC05LjggMTAuNy05LjMuNi0yLjUtMi40IDEuNyA4LjUtMS43IDkuMS0uNi05LTEuMS0yLjQgMS40LTguNCA2LjMgMS45YzUuNi41IDEwLjYtMy45IDE1LjYtOC42ek0xNS42IDc2LjhsOS44IDEwLjcgOS4zLjYgMi41LTIuNC0xLjcgOC41IDEuNyA5LjEuNi05IDUuNS0xMi43IDQuNy4zIDIuMSAzLjIgMi4zLjJhOC40IDguNCAwIDAwMi45LTUuOGMwLS41LTEzLjEtMS41LTEzLjEtMS41bC0xMSA3LjVjLTUuNi40LTEwLjYtNC0xNS42LTguN3oiLz48L2c+PHBhdGggZD0iTTI2LjggNjEuMXMtMi42IDE3LjcgMTAuNiAxNi4yYzAgMCAxMC4zLTkuNC0xMC42LTE2LjJ6TTMzIDExMi43czEyLjUtNi42IDUuNC0xNC40Yy0uMS4xLTEwLjktMi4xLTUuNCAxNC40eiIvPjxwYXRoIGQ9Ik0yNi4zIDk2czExLjEgNC42IDEyLjMtNC4zYy4xLjEtNC40LTguMi0xMi4zIDQuM3pNMTEuMSA3Ni44czcuNiAxMSAxNC4xIDMuNGMwIDAgLjgtMTAuNC0xNC4xLTMuNHpNMTI5LjIgNjMuMXMyIDEzLjUtOC4xIDEyLjRjMCAwLTcuOS03LjIgOC4xLTEyLjR6TTEzMC41IDk0cy0xMS4xIDQuNi0xMi4zLTQuM2MwIC4xIDQuNC04LjIgMTIuMyA0LjN6TTE0Ni45IDc0LjZzLTguMiAxMS44LTE1LjIgMy43YzAgMC0uOS0xMS4yIDE1LjItMy43eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNMjYuOCA2MS4xcy0yLjYgMTcuNyAxMC42IDE2LjJMMjYuOCA2MS4xek0zMyAxMTIuN3MxMi41LTYuNiA1LjQtMTQuNEwzMyAxMTIuN3pNMjYuMyA5NnMxMS4xIDQuNiAxMi4zLTQuM0wyNi4zIDk2ek0xMS4xIDc2LjhzNy42IDExIDE0LjEgMy40bC0xNC4xLTMuNHpNMTI5LjIgNjMuMXMyIDEzLjUtOC4xIDEyLjRsOC4xLTEyLjR6TTEzMC41IDk0cy0xMS4xIDQuNi0xMi4zLTQuM2wxMi4zIDQuM3pNMTQ2LjkgNzQuNnMtOC4yIDExLjgtMTUuMiAzLjdsMTUuMi0zLjd6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMTgiPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTYuNCA5Ni4yYy0yLjcgNy44IDEyLjgtLjMgMTIuNS0xLjItLjktLjktNC4yLTEuMi00LjItMS4yYTM1IDM1IDAgMDA2LjUtLjZjMy42LS42IDUuNi0zLjMgNS4zLTQuMnMtNS4zLTEuMi01LjMtMS4yYzIuNCAwIDQuOC0uNCA3LjEtMS4yIDMtMS4yIDQuOC0zLjYgMy42LTQuMmE4IDggMCAwMC0zLS42YzMuMy0uMyA3LjEtMyA3LjctNC44cy0yLjQtLjYtMi40LS42Yy03LjEgMS4yLTE2LjktMy45LTE2LjktMy45cy0uNi0zLTIuNC0zLjYtMi40LS42LTQuMiAyLjRjLS40LjYtMSAxLjItMS42IDEuN2wtLjUuNGMuOSA3LjkuMSAxNS42LTIuMiAyMi44em0tNzIuNiAxLjFjLTcuOSAzLjktMTMtLjQtMTIuNy0xLjQuOS0xLjEgNC4yLTEuNCA0LjItMS40YTM2IDM2IDAgMDEtNi42LS43Yy0zLjYtLjctNS43LTMuOS01LjQtNXM1LjQtMS40IDUuNC0xLjRjLTIuNSAwLTQuOS0uNS03LjItMS40LTMtMS40LTQuOC00LjMtMy42LTUgLjktLjUgMi0uNyAzLS43LTMuMy0uNC03LjItMy42LTcuOC01LjdzMi40LS43IDIuNC0uN2M3LjIgMS40IDE3LjItNC42IDE3LjItNC42cy42LTMuNiAyLjQtNC4zIDIuNC0uNyA0LjIgMi44UzUyIDc3LjEgNTIgNzcuMWw1LjUgMS40czYtMSAzIDItNCAyLTYgNC0yLjMgOC43LTEwLjcgMTIuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNTMgODJzLTEyLTQtMTYtNy0xOCAxLTE4IDEgNiA0IDExIDRsLTggMnM3IDYgMTMgNWwtNyAzYzMuNSAyLjUgNy45IDMuMiAxMiAybC0zIDRzNyAzIDEzLTcgNy03IDMtN3ptNjYuMi0yLjhjMS41LS42IDIuOS0xLjQgNC4yLTIuMyAzLjYtMi43IDE2IC45IDE2IC45cy01LjMgMy42LTkuOCAzLjZsNy4xIDEuOHMtNi4yIDUuMy0xMS42IDQuNGw2LjIgMi43Yy0zLjEgMi4yLTcgMi44LTEwLjcgMS44bDIuNyAzLjZjLTIuMS43LTQuNS40LTYuNC0uOCAyLjEtNS45IDIuMS04LjkgMi4zLTE1Ljd6IiBvcGFjaXR5PSIuMDUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzE5Ij48ZWxsaXBzZSBjeD0iNDcuNSIgY3k9IjgxIiByeD0iOS41IiByeT0iMTUiLz48cGF0aCBkPSJNNTcgODFjMCA4LjMtNC4yIDE1LTkuNSAxNVMzOCA4OS4zIDM4IDgxczQgMCAxOSAweiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiLz48ZWxsaXBzZSBjeD0iNDQuNSIgY3k9IjgxIiByeD0iOS41IiByeT0iMTUiLz48ZWxsaXBzZSBjeD0iNDQuNSIgY3k9IjgxIiByeD0iOS41IiByeT0iMTUiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ii8+PHBhdGggZD0iTTQ5IDgwLjVjMCA0LjctMi40IDguNS01LjQgOC41bC00LjUuMWMtLjUtMi44LS44LTUuNy0uOS04LjYgMC0yLjYgMS45LTguNSAxLjktOC41aDMuNWMzIDAgNS40IDMuOCA1LjQgOC41eiIvPjxlbGxpcHNlIGN4PSIzOS45IiBjeT0iODAuNSIgcng9IjUuNCIgcnk9IjguNSIvPjxwYXRoIGQ9Ik00NCA4OWwxNSAxNyAxNyA1IDEtMi0xNi01LTE1LTE3cy0zLTEtMiAyeiIvPjxnIGZpbGw9IiMwMTAxMDEiPjxlbGxpcHNlIGN4PSIzOS45IiBjeT0iODAuNSIgcng9IjUuNCIgcnk9IjguNSIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNNDQgODlsMTUgMTcgMTcgNSAxLTItMTctNC0xNS44LTE4Yy0uNC4zLS42LjktLjIgMnoiIG9wYWNpdHk9Ii4xIi8+PC9nPjxwYXRoIGQ9Ik03NC40IDEwNi40bDEyLjUgMy40YzEuMy40IDIuMSAxLjcgMS44IDMuMWEyLjYgMi42IDAgMDEtMy4xIDEuOGwtMTIuNS0zLjRhMi42IDIuNiAwIDAxLTEuOC0zLjEgMi41IDIuNSAwIDAxMy4xLTEuOHoiIGZpbGw9IiMyMzExMDAiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJzaWRlXzIwIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik00MC41IDc0YTYuOCA2LjggMCAwMS01LjUtM2MtMy01LTE2LTExLTIxLTExczMgOC41IDMgOC41IDAgMS4yIDIgMi40YzIgMS4zIDQgMS4zIDIgMS4zcy0zIDAtMiAyLjQgNCAyLjQgNCA4LjUtMTAgMTMuNC04IDE0LjZjMiAxLjIgNy0xLjIgMTEtNC45IDQtMy42IDgtMTMuMyAxNC0xMi4xIDUtLjcgMy4zLTYuNS41LTYuOHpNNTMuNCA4MS42czE5LjIgNC42IDE1LjUgNi4yLTIwLjYgNi41LTI5IDEuNS0xLjMgMi43IDEzLjUtNy43ek0xMTkuNCA4MC40YTM1IDM1IDAgMDEtMi4zIDEwLjRzMTYuNi0zLjggMjAuOC04LjRjNy4xLTcuOSAyLjYgMi0xOC41LTJ6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMjggODQuMUMyNSA5MSAxMyA5Ni41IDE1IDk3LjdjMiAxLjIgNy0xLjIgMTEtNC45IDQtMy42IDgtMTMuMyAxNC0xMi4xIDMuMy0uNSAzLjctMy4yIDIuNy01YTIgMiAwIDAwLTEuOS0xLjFDNDMgNzkgMzAgNzggMjggODQuMXpNNjUuNiA4NS4xczQuNyAyIDMuMyAyLjdjLTMuNiAxLjUtMjAuNiA2LjUtMjkgMS41bC0zLjItMS42YzcuNCA0LjEgMzMuMS0xLjUgMjguOS0yLjZ6Ii8+PC9nPjxwYXRoIGQ9Ik0yMiA2NnM1IDAgMTAgNSAyIDYgMiA2LTcgMi04IDcgMy0xNC00LTE4ek01My42IDgxLjVsMTIgMy40Yy03LjUgMi4yLTE2IDMtMjUuNCAyLjkgMCAwIDcuOS0yLjQgMTMuNC02LjN6TTExOSA4MC40bC0uNyA2czEyLjEtMy4xIDE4LjUtNS40YzAgMC05LjggMS0xNy43LS42eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InNpZGVfMjEiPjxwYXRoIGQ9Ik0xMzAuOCA2M2MtMi4zLTItMTUuNy0uNS0xNS43LS41bC45IDEuOSAyLjMgNC45YzIuNS0xLjEgNS4yLTIgNy44LTIuNCAwIC4xIDEuOSAxOS4xLS4xIDIxLjFzLTguNCAzLjMtOC40IDMuM0wxMTcgOTNsLTEgMi42UzEzMyA5NyAxMzMgODVjLjctMTYuMy42LTE5LjYtMi4zLTIyek0yNC42IDY3LjlzLTQuNy4zLTYuNSAxLjNjLS41LjItLjQgMSAuMiAxLjUgMy43IDIuOCA2LjUgNi42IDggMTEgMy40IDguNSAzLjQgMTYuNyAxMy44IDIwLjQgMTAuNCAzLjcgMTQuOCAwIDE0LjggMFM2MiA5MyA1NCA4NC4yYzAgMC0xLjYtMS42LTQuNy0uNi0zLjYgMS4yLTcuNSAxLjktMTEuNi01LjctNC4yLTcuNS02LjItMTAuOS0xMy4xLTEweiIgZmlsbD0iY3VycmVudENvbG9yIi8+PGcgZmlsbD0iI2ZmZiI+PGVsbGlwc2UgY3g9IjI0LjciIGN5PSI2OS42IiByeD0iNi41IiByeT0iMS43IiB0cmFuc2Zvcm09InJvdGF0ZSgtMy41IDI0LjcgNjkuNykiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTQ1LjQgODVjNS4yIDEgOSAuMSAxMC41IDEuOC0uNS0uOS0uOS0xLjQtMS45LTIuNi0uMS0uMS0yLTEuNi00LjYtLjYtMTAuOSA0LTExLjYtOS41LTE3LjYtMTQuMSA2LjEgNy4xIDUuNyAxNCAxMy42IDE1LjV6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik0xMTUuMSA2Mi41czE0LjYtMS43IDE2LjEgMWMtMi4zLS44LTYtLjQtOC44IDBsLTYuNC44eiIgb3BhY2l0eT0iLjQiLz48L2c+PGcgZmlsbD0iIzAxMDEwMSI+PHBhdGggZD0iTTE5LjggNzJjNC43IDQgNS45IDcuOSA2LjYgOS43IDMuMyA4LjUgMy4zIDE2LjcgMTMuNyAyMC40IDEwLjQgMy43IDE0LjggMCAxNC44IDBzNS4zLTYgMS43LTE0YzAgMCAzLjkgMTEtNy45IDExLTUuNC0uMS0xMC41LS45LTE0LjUtNi01LjMtNi44LTcuOC0xOS0xNC40LTIxLjF6IiBvcGFjaXR5PSIuMTYiLz48ZWxsaXBzZSBjeD0iMjQuOSIgY3k9IjY5LjYiIHJ4PSI0LjgiIHJ5PSIuOSIgdHJhbnNmb3JtPSJyb3RhdGUoLTMuNSAyNC45IDY5LjcpIiBvcGFjaXR5PSIuMzUiLz48cGF0aCBkPSJNMjkuOCA2OS4zYy41LjktNC44IDEuMi00LjggMS4yLjQtMS4xLjMtMS43LS4xLTEuNyAwIDAgNC40LS4zIDQuOS41eiIgb3BhY2l0eT0iLjM1Ii8+PHBhdGggZD0iTTEyNi4xIDY2LjlTMTI4IDg2IDEyNiA4OHMtOC40IDMuMy04LjQgMy4zTDExNyA5M3M4LjgtMS4yIDExLTQuMSAxLTE3LjkgMS0xNy45LjMtNS4zLTIuOS00LjF6IiBvcGFjaXR5PSIuNSIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMDEiPjxwYXRoIGQ9Ik05NS40IDQ5LjlTOTIgNjAgODEgNTNjLjMgMy44LTEuNiA1LjUtNiA1IDAgMC0zIDktNyAzLS45IDEuMy42IDcuMi03IDQtMS42IDUuNi01LjYgNi43LTExIDUgMCAwLTE1IDEtMTAtOSAwIDAtMTUtOSAyLTEyIDAgMC01LTIyIDE1LTE3IDAtNSAxMi45LTIyLjMgMzItNSAwIDAgMTUtMTMgMjIgNiAwIDAgMTUgMiA4IDE2IDEuOS0uOCAxMi4yIDMuNyA1IDEyIDEuOSA1LjMtLjIgNy4zLTUgNyAwIDAgMyAyLS40IDQuNSAwIDAtNi42LTIuNS02LjYtOS41LTQtMS4xLTUuNi0zLjgtMy44LTguOSAwIDAtMTAuMyA2LjgtMTIuOC00LjJ6IiBmaWxsPSIjNDIyMTBiIi8+PHBhdGggZD0iTTY4LjUgMzkuNVM1MiAzNCA1NCA1MWMtMTIgMi0zIDEzLTMgMTNzLTE0LjUtMTIuNS0xLjQtMTMuNGMwIDAtNC40LTE4LjQgMTMuMS0xNCAwLTQuNCA3LjgtMjAuNCAyNC41LTUuMkM3NCAyOSA3MSAzMCA2OC41IDM5LjV6IiBvcGFjaXR5PSIuMDUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODkgMjdzMTUtMTMgMjIgNmMwIDAgMTUgMiA4IDE2IDEuOS0uOCAxMi4yIDMuNyA1IDEyIDEuOSA1LjMtLjIgNy4zLTUgNyAwIDAgMyAyLS40IDQuNSAwIDAtNi42LTIuNS02LjYtOS41LTQtMS4xLTUuNi0zLjgtMy44LTguOS01LjIgNC45LTEzLjguNi0xMi43LTQuNCAwIDAgNy44LjcgNy43LTYuNUMxMDUgMzUgOTUuNSAyNi4yIDg5IDI3eiIgb3BhY2l0eT0iLjUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMDIiPjxwYXRoIGQ9Ik03NS45IDI3LjhjLjEgMi4yLTIuNyA1LjQtMi43IDUuNHMtMS41LTIuOC0zLjYtMy44LTQgMS0zIDEuNWwyIDQuNy0yLjYuMWE5IDkgMCAwMS03LjktMTAgOSA5IDAgMDExMC03LjkgOSA5IDAgMDE3LjggMTB6Ii8+PHBhdGggZD0iTTc1LjkgMjcuOGMuMSAyLjItMi43IDUuNC0yLjcgNS40bC0xLjYtMi43YzEgMCAzLjYtNy4zIDIuMS05LjdhOSA5IDAgMDEyLjIgN3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik02NiAzMXMzLjcgNS43IDQuOCAxMC4zYy42IDIuMiAxIDQuNCAxLjIgNi43IDEgNCA4IDIgOC0xIDAgMC02LjEtMTMuOS05LTE3LTIuNi0zLjktNi4yLTEuMi01IDF6IiBmaWxsPSIjOTM1MDVjIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzAzIj48cGF0aCBkPSJNODAuNSA0Mi45Uzc3IDI1LjEgNzMuMyAyMC4zYy0uMi0uMi0xLjctLjUtNC4xLjZsLS4yLjJzMi42IDIuNiA5IDIxLjhjMCAwIDIuNSAxLjMgMi41IDB6IiBmaWxsPSIjODI1MTA1Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQuNiA3MS4yIDIwLjYpIiBjeD0iNzEuMiIgY3k9IjIwLjYiIHJ4PSIyLjIiIHJ5PSIuNSIgZmlsbD0iI2Y0YjE0NSIvPjxwYXRoIGQ9Ik03Ny4yIDQxLjNzLjctLjEgMS4yLTEuNGMuNS0xLjktLjUtMy44LTIuNC00LjQtMi0uNS0yLjktMi40LTQuMy00LjJzLTYuNC00LjctMTQuOS00LjUtMTAuMi0zLTEwLjktMy42LS44IDYgMyAxMC45IDkuMyA4LjMgMTUuNiA1LjEgOS4yLS4yIDkuMi0uMiAyLjIgMi40IDMuNSAyLjN6Ii8+PHBhdGggZD0iTTc3LjIgNDEuM3MuNy0uMSAxLjItMS40Yy41LTEuOS0uNS0zLjgtMi40LTQuNC0yLS41LTIuOS0yLjQtNC4zLTQuMi0xLjQtMS44LTYuNC00LjgtMTQuOS00LjUtOS44LjMtMTEuMi00LjctMTEtMy40IDMgMTEuNSAyMi45IDQuMiAzMS40IDE3Ljl6IiBvcGFjaXR5PSIuMiIgZmlsbD0iIzAxMDEwMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8wNCI+PHBhdGggZD0iTTMzLjYgNTkuOEw2OCAyMXMyLjEtMyA2LjQgMGM0LjMgMyA0NC41IDI3LjQgNDQuNSAyNy40IDEuNSAxIDEuMSAyIDEuMyAyLjgtLjMgMS4zLTcuNS04LjItNDYuOC0zLjhDMzQgNTIuOSAzMy4xIDYxLjggMzQuMSA2Mi44cy0uNS0xLS41LTN6IiBmaWxsPSIjOTM1MDVjIi8+PHBhdGggZD0iTTMzLjYgNTkuOEw2OCAyMXMyLjEtMyA2LjQgMGMtMy4yLTEtMjMuMyAyNy41LTI3IDMxLjgtMTMuNyA0LjUtMTQgOS4yLTEzLjIgOS45IDEgMS4xLS42LTEtLjYtM3oiIG9wYWNpdHk9Ii4xNCIvPjxwYXRoIGQ9Ik00Mi45IDY0LjZjLS4zLTEwIDY0LjQtMTYuMyA2Ny41LTguNSAyLjYuOCAxNS45LTQuOCA2LjQtNy4ycy0yNS4xLTUuOS01Ny42LjktMjUuOSAxMy43LTI1LjkgMTMuNyA3LjkgMi40IDkuNiAxLjF6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzA1Ij48cGF0aCBkPSJNNTAuOCAzMi41czIuNCA2IDUuNCA0LjggNDguMS0xLjcgNDguMS0xLjdsNC00LjdzNy43LTUuMSA0LjEgMy4zbC0yLjEgMy42Yy0uNiAxLTEuMSAyLjItMS40IDMuNC0uMSAxLjQgMS43LTIuOCAxLjctMi44bDMuOCA2LjFzMi41IDQuNi0xLjggNC4yLTctMy41LTguMy01LjFsLTQ4LjEgMS43cy02LjUgOC4yLTkuNCA3LjktMi42LTMuMS0uNy04LjhjMCAwIDEuNy0yLjggMS44LTQuMlM0Ni4zIDQzIDQ2LjMgNDNzLTMuMy03LjYtMy42LTljLS43LTMuNyAzLjMtOS4xIDguMS0xLjV6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExMS4xIDI5LjVzMi4zIDEuMS0uOSA1LjItNi4zIDUuMy0uNyA4LjcgNC4zLjQgNC4zLjRsLTMuMi01LjNjMC0uMSA2LjItMTAuMS41LTl6TTQ4LjQgNDAuNnMzLjItLjcgMS43LjYtNC4zIDUuMiAzLjcgMi40IDQ3LjItMi43IDQ3LjItMi43bDIuOCAyLjMtNDcuNSAycy01LjggNy04LjcgNi44LS43LTctLjctN2wxLjUtNC40eiIgb3BhY2l0eT0iLjE0Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzA2Ij48cGF0aCBkPSJNNDYuOCA1My40UzM0IDQ5IDM2IDM3YzItMTEgMTQtMTAgMTQtMTBhMTIgMTIgMCAwMTEyLTljMTAgMCAxNSA2IDE1IDZzMS03IDExLTdjNS44LS4xIDExLjEgMyAxNCA4IDAgMCAxMy0zIDE3IDZzLTE0LjEgMTUuMy0xNC4xIDE1LjMtNy45LTkuMy02LjQtOS44YzAgMC00LjUgNy41LTE3LjUuNSAwIDAtNyAxMC0xNyA0IDAgMC03IDcuNy0xNSAyLjhsLTIuMiA5LjZ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQ4IDM5czEzIDYgMTYtNWMwIDAgMTUgNCAxOC00IDAgMCAxMCA3IDE4IDIgMCAwIDQuNCAxMi4xIDkuNyA5LjFBMjUuNSAyNS41IDAgMDExMDQgNDRsLTU2IDNzLTMuNy0uMi00LjgtMS4xYzAgMCA1LjgtLjkgNC44LTYuOXoiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTQ0LjIgNjIuOGMxLS44IDIzLjktMTkuMiA2Ni03LjEgMCAwIDMuOCAxIDMuOC0xLjdsLTQtMy42cy0xMC05LTExLTE0LjRjMCAwLTkgNi4zLTE3LS45IDAgMC01IDktMTggNS40IDAgMC01IDguMS0xNSAyLjcgMCAwLTMgMTUuMy01IDE3LjJzLjIgMi40LjIgMi40eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00NS41IDYwLjJBNDguMiA0OC4yIDAgMDE2OCA1MGMxOC00IDM5LjEgMS42IDM5LjEgMS42czUuOSAxLjEgNS45IDMuMy0zIC4yLTMgLjJjLTI0LjMtNS4zLTQ3LjctNS42LTY2IDggMC0uMS0xLS43IDEuNS0yLjl6TTY0IDQwczEgOC42LTEgMTBjMCAwIDAtOC42IDEtMTB6bS0xNC42IDNzLjMgMTAuNC0xLjggMTJjMCAwIC43LTEwLjMgMS44LTEyem0zMi41LTcuM2EyOCAyOCAwIDAwLjMgNy4xYy44IDQuMiAyLjkgNC41IDIuOSA0LjUtMS41LjUtMy42LTE1LjMtMy4yLTExLjZ6bTE3LjggM2MuNyAyLjMgMS42IDQuNCAyLjggNi41IDIgMy42IDMuNiAzLjIgMy42IDMuMi0uOS45LTgtMTMtNi40LTkuN3oiIG9wYWNpdHk9Ii4xIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzA3Ij48cGF0aCBkPSJNNDAuMSA3OC4zUzUyIDU1LjYgODQuNCA1NC44YzI4LjItMS45IDMzLjYgMTYuMSAzMy42IDE2LjEgMzMuMS0yNSAyLjgtMzguOSAyLjgtMzguOWEyMi4zIDIyLjMgMCAwMS0xNC4zIDE3LjRDNzYuNCA1Ni43IDU5IDQyLjggNTkgNDIuOHMtMTAuNS0xMi4xLTIxLjItOS4yYy0uMS4zLTEwLjIgMS41LTEyLjQgMTUuNWEyNi40IDI2LjQgMCAwMDE0LjcgMjkuMnoiIGZpbGw9IiM3NDNhNGIiLz48cGF0aCBkPSJNNDAuOSAzM2MtMi43LjQtNS44LjgtNS44IDYuMiAwIDIuNyAzLjIgNS45IDcuNiA4LjYgNC40IDIuNyA5LjMgNC43IDE0LjMgNS45bDYuNCAxLjJjMTMuNy0yLjggMjUuOS00LjggMzcuOS0uOSAwIDAgMzEuOC0xMi44IDIxLjMtMjAuOC00LjItMy44LTExLjQgMS44LTE2LjcgNS0zLjQgMi01LjkuOS01LjkuOXMtMS4yLTcuNy0yLTEwLjJjLTItNi42LTUuOC0xMy44LTIzLjgtMTMuOFM1OC45IDI2LjMgNTguOSAyNi4zbC4xIDEzLjJjLTEuNyAwLTQuNC0xLjEtNy43LTMuMSAwIDAtNS41LTMuNy0xMC40LTMuNHoiIGZpbGw9IiM5MzUwNWMiLz48cGF0aCBkPSJNMzkuNiA3Ny43czE1LTIyLjkgNDQuMy0yMy41YzI5LjMtLjYgMzQuMiAxNi4xIDM0LjIgMTYuMUwxMjMgNjdzLTE5LTE3LjMtNDAtMTVjLTM0LjggMi4zLTQ4LjUgMjEuOS00OC41IDIxLjl6IiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik04MiAxNS44UzU5LjcgMTEgNTguOCAyNC4ybC40IDE1YzMuNC4yIDYuOCAwIDEwLjEtLjZWMjUuNGMuMSAwLTEuNC05LjcgMTIuNy05LjZ6IiBmaWxsPSIjNzQzYTRiIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzA4Ij48cGF0aCBkPSJNMTIzLjkgNDMuOGMtNSAxLjItNy4yIDQuOC0xMy43IDVhNC42IDQuNiAwIDAxLTIuOS0xLjdsLTEtMS43cy0xLjctMTQuNy0yLjktMTcuMWMtMy4xLTYuNC00LTEwLjMtMzIuMi0xMC4zLTIuNS0uMi01LjEgMC03LjYuNS04LjggMS0xNi41IDQuNC0xMy42IDEzLjZhODEgODEgMCAwMDMuOSAxNi4yYy0uNiAxLTEuNSAxLjktMi41IDIuNGwtMS43LjZjLTMgLjYtNy41LS4yLTEyLjktMS42LTExLjEtMi44LTEwLjcgNi40LTguNCA5LjUgMi4zIDMuMSA3LjMgNC41IDE1LjUgMi4xIDExLjItMy40IDI3LjUtNy41IDQxLTguMyAxNS0uNiAyNS4yIDEgMzIuMiAzLjQgNi41IDIuMiAxNi4zLTEuOCAxNi4xLTUuNy0uMi0zLjktNC4zLTguMS05LjMtNi45eiIgZmlsbD0iIzI0NDI1YiIvPjxwYXRoIGQ9Ik01OC4xIDU3LjNjOC43LTIuNiAxNy42LTQuMiAyNi43LTQuOCAxNi4xLS44IDMzLjcgMy45IDMzLjcgMy45IDIuMS43IDQuNS44IDYuNi4xIDAgMC0yNC4xLTkuNS00MC45LTguMi04LjQuNy0yNC45IDUtMjQuOSA1cy0xOS44IDYuNC0zMC45IDYuM2MuMi4yIDMuMiA3LjYgMjkuNy0yLjN6IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBkPSJNNTEuNCAzOC45czMzLjMtMTMuMiA1My41LTRsMSA3LjRzLTExLjUtOC01Mi43IDMuNGwtMS44LTYuOHoiLz48cGF0aCBkPSJNODMuNSAxOS4xUzQ0IDEzIDUwIDMyLjFjMSA2LjcgMi44IDEzLjIgNS4zIDE5LjQgMCAwIDEyLjctMi4xIDE4LjItNC4ybC00LjgtMTYuMmMwIC4xLTMuNy0xMS4xIDE0LjgtMTJ6IiBvcGFjaXR5PSIuMTUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMDkiPjxwYXRoIGQ9Ik00My44IDYyLjNjLTIuOC43LTMuNS0xLjYuMi01LjNhNTUuNCA1NS40IDAgMDEzOS0xNGMyNCAxIDMxIDEwIDMxIDEwczQgNS0yLjQgMy43YzAgMC0zMS0xNC4xLTY3LjggNS42eiIgZmlsbD0iIzc0M2E0YiIvPjxwYXRoIGQ9Ik00NS41IDYwLjJBNDguMiA0OC4yIDAgMDE2OCA1MGMxOC00IDM5LjEgMS42IDM5LjEgMS42czUuOSAxLjEgNS45IDMuMy0zIC4yLTMgLjJjLTI0LjMtNS4zLTQ3LjctNS42LTY2IDggMC0uMS0xLS43IDEuNS0yLjl6IiBvcGFjaXR5PSIuMiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0yMy45IDk0IDM3LjMpIiBjeD0iOTQiIGN5PSIzNy4zIiByeD0iMTQuOCIgcnk9IjE2LjkiIGZpbGw9IiNjMWMxYzEiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMjQuMyA5NC43IDM2LjIpIiBjeD0iOTQuNyIgY3k9IjM2LjIiIHJ4PSIxNC4xIiByeT0iMTYuMiIgZmlsbD0iI2VmZWZlZiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0xNy4xIDk1LjQgMzYuNykiIGN4PSI5NS40IiBjeT0iMzYuNyIgcng9IjExLjUiIHJ5PSIxMyIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0xNy4xIDk2LjEgMzYuNSkiIGN4PSI5Ni4xIiBjeT0iMzYuNSIgcng9IjMuNSIgcnk9IjQiLz48cGF0aCBkPSJNOTMuMiAzNC4yYTcgNyAwIDAxMy42IDIuMmMxLjUgMS43LjggNC0xLjIgMy45IDMuNC43IDQuNi0yLjcgMy4zLTUuOSAwIDAtMi41LTQuMS01LjctLjJ6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMyIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xMCI+PHBhdGggZD0iTTQ0LjYgNjJDNTUuMSA0NSA2My45IDI4LjcgNjcgMTVjMy44LTEuMyAyNC4zIDE4IDQyIDM4LjUgMCAwLTI5LjEtMzEuOS02NC40IDguNXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik02OCAxNWM4LjQgNC44IDI1LjIgMjIuNSA0MSAzOC41LTkuOS04LjctMTcuOS0xMi40LTI0LjctMTIuOEw2OCAxNXoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTExMy43IDM3LjlzMTEgNSAxMCAxMi0xMCA1LTEwLTEtMy0xMCAwLTExek0xMTUuMiAzMy44czQuMi0xLjQgNS43LjdjMS41IDItMS40IDMuOC0yLjkgMi4yLTEuNS0xLjYtMy4zLTItMi44LTN6TTQ4LjggMjUuNXMtMTAgNC41LTkuMSAxMC45IDkuMSA0LjUgOS4xLS45IDIuNy05LjEgMC0xMHpNMzMuNSA0Ni44cy43IDUuNi0yLjQgNi45LTQuNC0yLjgtMi00LjIgMy4zLTMuNiA0LjQtMi43eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xMSI+PHBhdGggZD0iTTgxLjEgMzMuOHM2LjcgMi40IDQuNCA0LjgtNC45LTMuOC0xNi43LTEuMlM0MiA0MiA0MSA3Mi40bDE2LjEgMy4xcy0zLjMtMTIuMSA2LjctMTIuMVY1MS4zczIwIDEwLjkgMzMuNCA2IDI3LjgtMzYuMiAzLjMtMzkuOS0xOS40IDE2LjQtMTkuNCAxNi40eiIgZmlsbD0iIzQ0MmExNiIvPjxwYXRoIGQ9Ik00MSA3Mi40bDE2LjEgMy4xcy0zLjMtMTIuMSA2LjctMTIuMWMwIDAtMTAtMTAuOSAwLTEyLjFzMjAgMTAuOSAzMy40IDYgMjcuOC0zNi4yIDMuMy0zOS45YzkuMiAxMy45IDYuMiAyMS02LjEgMjUuOS0xMC45IDQuNC0yMS40LjktMzMuMiA1LjFDNDYgNTIgNDEuNSA2Ny4xIDQxIDcyLjR6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xMDUgNTAuNnM2IDYuNSA3LjIgMTAuNSAzLjYgMS4zIDMuNi0yLjZjMC03LjQtMy0xMC40LTUuOS0xNC40IiBmaWxsPSIjNDQyYTE2Ii8+PHBhdGggZD0iTTEwNSA1MC42czYgNi41IDcuMiAxMC41IDMuNiAxLjMgMy42LTIuNmMxLjEtNS4yLTUuOS0xNC40LTUuOS0xNC40IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik00MS4zIDczLjlMNTcgNzcuNXYybC0xNS41LTR6bTQgNC40bDExLjIgMi44LjIgMi0xMS4xLTMuMnoiIGZpbGw9IiM3NTRjMjQiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTIiPjxwYXRoIGQ9Ik03OC4xIDIwLjZDNTkuOSAyMS43IDQ1LjYgMjYuNCA0NiAzMS4xczE1LjUgNy43IDMzLjcgNi42IDMyLjUtNS44IDMyLjEtMTAuNS0xNS42LTcuNy0zMy43LTYuNnptMS4zIDE0LjVjLTE2LjMuOS0yOS44LTEuMS0zMC4xLTQuNnMxMi42LTcuMSAyOS04LjEgMjkuOCAxLjEgMzAuMSA0LjYtMTIuNiA3LjEtMjkgOC4xeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNzguMSAxOS42QzU5LjkgMjAuNyA0NS42IDI1LjQgNDYgMzAuMXMxNS41IDcuNyAzMy43IDYuNiAzMi41LTUuOCAzMi4xLTEwLjUtMTUuNi03LjctMzMuNy02LjZ6bTEuMyAxNC41Yy0xNi4zLjktMjkuOC0xLjEtMzAuMS00LjZzMTIuNi03LjEgMjktOC4xIDI5LjggMS4xIDMwLjEgNC42LTEyLjYgNy4xLTI5IDguMXoiIGZpbGw9IiNmZmY4MDAiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTMiPjxwYXRoIGQ9Ik00My44IDYyLjNjLTIuOC43LTMuNS0xLjYuMi01LjNhNTUuNCA1NS40IDAgMDEzOS0xNGMyNCAxIDMxIDEwIDMxIDEwczQgNS0yLjQgMy43YzAgMC0zMS0xNC4xLTY3LjggNS42eiIgZmlsbD0iIzc0M2E0YiIvPjxwYXRoIGQ9Ik00NS41IDYwLjJBNDguMiA0OC4yIDAgMDE2OCA1MGMxOC00IDM5LjEgMS42IDM5LjEgMS42czUuOSAxLjEgNS45IDMuMy0zIC4yLTMgLjJjLTI0LjMtNS4zLTQ3LjctNS42LTY2IDggMC0uMS0xLS43IDEuNS0yLjl6IiBvcGFjaXR5PSIuMiIvPjxwYXRoIGQ9Ik03MS41IDUwLjJjMS0yLjcuNi05LjUtLjktMTMuNS0uMi0uNS0uOSAxLjQtMS4xIDEtMS43LTYuNS0zLjctNi45LTUtNy4ybC0xLjEgMmMuOC02LjEtNS4yLTkuNS01LjItOS41bC40IDEuNmMtMS45LTItNC4xLTMuNi02LjUtNS0uMy0uMy0uMy0uMy0uMi4yLjIgMi43LjggNS40IDEuOCA3LjlsLTEuMi0xcy41IDYuOSA2LjUgOC43bC0yLjMuMmMuNCA0LjYgNSA2LjYgNSA2LjZzLTIuNS0uMy0yLjIuMWMzLjEgMy44IDcuMyA2LjYgMTIgNy45eiIvPjxwYXRoIGQ9Ik03MS41IDUwLjJjMS0yLjcuNi05LjUtLjktMTMuNS0uMi0uNS0uOSAxLjQtMS4xIDEtMS43LTYuNS0zLjctNi45LTUtNy4ybC0xLjEgMmMuOC02LjEtNS4yLTkuNS01LjItOS41bC40IDEuNmMtMS45LTItNC4xLTMuNi02LjUtNS0uMy0uMy0uMy0uMy0uMi4ybDE5LjYgMzAuNHoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTYyLjkgNTAuN2MtLjMtMi4xLTIuOS02LjctNS4yLTguOS0uMy0uMy0uMSAxLjMtLjQgMS0zLjQtMy45LTQuOS0zLjUtNS45LTMuMmwtLjEgMS44Yy0xLjUtNC41LTYuOC00LjctNi44LTQuN2wuOC45Yy0yLS43LTQtMS02LjEtMS4yLS4zLS4xLS4zLS4xLS4xLjIgMS4xIDEuOCAyLjQgMy40IDMuOSA0LjhsLTEuMi0uM3MyLjcgNC41IDcuNCAzLjdsLTEuNS45YzEuOCAzIDUuNyAyLjcgNS43IDIuN3MtMS44LjctMS41LjhjMy41IDEuNyA3LjMgMi4yIDExIDEuNXoiIGZpbGw9IiMzOWI1NGEiLz48cGF0aCBkPSJNNjIuOSA1MC43Yy0uMy0yLjEtMi45LTYuNy01LjItOC45LS4zLS4zLS4xIDEuMy0uNCAxLTMuNC0zLjktNC45LTMuNS01LjktMy4ybC0uMSAxLjhjLTEuNS00LjUtNi44LTQuNy02LjgtNC43bC44LjljLTItLjctNC0xLTYuMS0xLjItLjMtLjEtLjMtLjEtLjEuMiAxLjEgMS44IDIuNCAzLjQgMy45IDQuOGwtMS4yLS4zczIuNyA0LjUgNy40IDMuN2wtMS41LjljMS44IDMgNS43IDIuNyA1LjcgMi43cy0xLjguNy0xLjUuOGMzLjUgMS43IDcuMyAyLjIgMTEgMS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xNCI+PHBhdGggZD0iTTQ1IDU1bC02LTE4LjhzNCA4LjkgMTEgNi44IDgtMTcuMSA4LTE3LjEgMyAxMi40IDExIDEyLjJTNzkuNSAyNCA3OS41IDI0IDgzIDM3IDg4IDM3YzEwLjEgMCAxMy0xMi4xIDEzLTEyLjFzMyAxNiA4IDE2YzMuMS0uMSA2LTEuNCA4LTMuOGwtNiAxNWMwIC4xLTQ5LTUuNi02NiAyLjl6IiBmaWxsPSIjZmZlMDAwIi8+PHBhdGggZD0iTTQ1IDU1YzMwLTIuNyA1MS45LTguOSA1Ni0zMC4xIDAgMCAzIDE2IDggMTYgMy4xLS4xIDYtMS40IDgtMy44bC02IDE1YzAgLjEtNDktNS42LTY2IDIuOXoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik00NC41IDYyLjJBNzAuMyA3MC4zIDAgMDE4MyA1MWMyMyAwIDI3LjIgMy45IDI3LjIgMy45bDMuMiA0LjRzMy4xIDMuMiA1LjEtLjgtMy0xMi0xOC0xNS00MiAwLTU0IDctNyAxNS01IDE1SDQzbDEuNS0zLjN6IiBmaWxsPSIjYzY5NzU3Ii8+PHBhdGggZD0iTTQ0LjUgNjIuN0E3MC4zIDcwLjMgMCAwMTgzIDUxLjVjMjMgMCAyNy4yIDMuOSAyNy4yIDMuOWwzLjIgNC40czMuMSAzLjIgNS4xLS44QzEwOSAzNyAzOSA0OSAzOS40IDYzLjljLjYgMS4zIDEuNSAyLjEgMi4xIDIuMUg0M2wxLjUtMy4zeiIgb3BhY2l0eT0iLjEiLz48Y2lyY2xlIGN4PSIxMDEuNyIgY3k9IjIyLjIiIHI9IjYuOCIvPjxwYXRoIGQ9Ik0xMDguNSAyM2E2LjggNi44IDAgMDEtNy42IDYgNyA3IDAgMDEtNC42LTIuNWMxLjcuNiA2LjEgMS4zIDguOS0xLjQgMi0xLjkgMi4xLTUuNiAxLjYtNy40YTYuOCA2LjggMCAwMTEuNyA1LjN6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMjUiLz48Y2lyY2xlIGN4PSIxMDAuNyIgY3k9IjM5LjIiIHI9IjIuNSIvPjxjaXJjbGUgY3g9IjYwLjciIGN5PSI0MC4yIiByPSIyLjUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTUiPjxwYXRoIGQ9Ik0xMzMgNDguOGMtMS45LTguNi0xMC4yLTEyLjYtMjguMi05LjVDOTkuNCAzMiA4OSAxOSA4MiAxNWwtMy43LTItMjEuMy0uMmMtMy4yLjMtNS44LjctNy4yIDEuNSAwIDAtLjcgMy0xLjkgNC4xLTIuOSAyLjQgNS4xIDMuNCA1LjEgMy40bC0yIDMgNCAydjNjMS44IDYuOS0uMyAxNC0uMyAxNHMxLjIgMS42LTE3LjIuNEMxOS4xIDQzIDIzIDY1LjggMzYgNjMuOGw4LjktMWExNzEgMTcxIDAgMDA0OS40LTkuNGMzLjgtMSA3LjYtMS42IDExLjUtMS45IDMuNyAyLjggNi44IDYuMyA5LjIgMTAuMmwuMy0uMi0uMi4xYzAgLjIgMTkuOS0zLjggMTcuOS0xMi44em0tMjEuNSAzYzEuNy4yIDMuMi45IDQuNSAyLTEuNC0uOS0yLjktMS42LTQuNS0yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDUuOCA1MS41YzMuNyAzIDcgNi4yIDkuMiAxMC41IDAgMCA2LjMtMi44IDEuNi04IDAgMC0xLjYtMy0xMC44LTIuNXoiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTM3LjggNjMuNHMzMy0uOSA1Ni44LTEwYzAgMCAxNi43LTQuNiAyMS43LjRzLS45IDgtLjkgOCAyMC00IDE4LTEzLTExLTEzLTMxLTktMTguNiAxNy4zLTY0LjYgMjMuNnoiIG9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik03MC45IDEzYzExIDExLjYgMjIgMjUuNiAxOSAzMS42IDUtMi41IDguMS00LjIgMTQuOS01LjMtMi45LTQuMi02LTguMi05LjItMTIuMUM5NS42IDI3LjIgODMgMTQgNzggMTN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik01NC40IDQ0YzkgMiAyOS4yLTIgNDUuNS0xMS41bC04LjYtOS45Yy0uNSAyLTMwLjcgNy43LTM2LjMgOC40LjkgMy41LjIgNy44LS42IDEzeiIvPjxwYXRoIGQ9Ik02OS45IDI2TDgzIDIyLjJjMi0uNiA0IC42IDQuNiAyLjVsMy4zIDExLjRjLjYgMi0uNiA0LTIuNSA0LjZsLTEzLjEgMy44Yy0yIC42LTQtLjYtNC42LTIuNWwtMy4zLTExLjRjLS42LTIgLjYtNCAyLjUtNC42eiIgZmlsbD0iI2ZmZTAwMCIvPjxwYXRoIGQ9Ik03My45IDI4LjVsNy4xLTJjMS41LS40IDMgLjQgMy41IDEuOWwxLjkgNi42Yy40IDEuNS0uNCAzLTEuOSAzLjVsLTcuMSAyYy0xLjUuNC0zLS40LTMuNS0xLjlMNzIgMzEuOWMtLjQtMS41LjQtMyAxLjktMy40eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8xNiI+PHBhdGggZD0iTTQzLjUgNjIuMnMtNy41LS4yLTkuNC0zLjhjLS4yLTEuMS0uMi0yLjMtLjEtMy41YTQ1LjcgNDUuNyAwIDAxNDctMzdjMzIgMSA0NCAzMyA0MiA0My0xIDMtNiA1LTcuNiAzLjVDMTExIDU3IDk5LjkgNTMuNCA4MyA1NGMtMzIgMC0zOS41IDguMi0zOS41IDguMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODMgMjBzMTYgOCAxOCAyNWwtNiAxMGMxNSAwIDIxIDEwIDIxIDEwczUgMCA3LTQuM2MuNy01IC4xLTE0LjItMTEuMS0yOC4yIDAgMC0xMC45LTEzLjUtMjguOS0xNC41IDAgMC00IDEgMCAyeiIgb3BhY2l0eT0iLjA1Ii8+PHBhdGggZD0iTTQzLjYgNjEuOXMtNy41LS4xLTkuMi0zLjZjLTEuNC0yIDE0LjctMTEuOSA0Ny0xMS4zczQzLjQgMTEuNyA0MS40IDE0LjFjLTIgNC4xLTcuNSAzLjktNy41IDMuOSAwLS43LTIuNi0xMS45LTMxLjktMTAuNi0zNC40LjYtMzkuOCA3LjUtMzkuOCA3LjV6IiBvcGFjaXR5PSIuMiIvPjxnIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzQuOCA1Ny43czQuOSA0LjEgNyA0LjNsMS4yLS42LTcuMy00LjctLjkgMXpNNDEgNTMuMmw3LjcgNS44IDIuMy0uOC03LjQtNnpNNTQuNiA0OS4ybDUuMSA3LjQgMy4yLS42LTQuNy03LjV6TTcwLjQgNDcuMmwyLjMgNy42IDIuOS0uMi0xLTcuNnpNODkuMSA0Ny4zbC0xLjMgNy4xIDIuOC4xIDIuMy02Ljh6TTEwNS4yIDQ5LjlsLTMuOCA2LjEgMi40LjcgNC4zLTZ6TTExOC45IDU1LjZsLTcuNiA0LjEgMi41IDEuNiA4LTMuMnoiLz48L2c+PGVsbGlwc2UgY3g9Ijk2LjIiIGN5PSIzMi41IiByeD0iOC4yIiByeT0iOS41Ii8+PHBhdGggZD0iTTEyMi4yIDUxLjhhOS41IDkuNSAwIDAxLTcuNS02Yy0xLjEtMi45LS45LTYuMS43LTguOCAzLjEgNC40IDUuNSA5LjQgNi44IDE0Ljh6TTUyLjkgMzIuMmMtMS44IDUtNi42IDcuNy0xMC45IDYuMmwtMS0uNXM1LTggMTEuOC0xMmMuOCAyLjEuOCA0LjMuMSA2LjN6TTgxLjEgMjMuNmMtMS4zIDUuMS01LjkgOC4zLTEwLjMgNy4xcy02LjctNS45LTUuNy0xMC44QzcxIDE4IDc0IDE4IDgwLjcgMThhOSA5IDAgMDEuNCA1LjZ6TTUwIDUwLjJWNTBhOS4zIDkuMyAwIDAxOS41LTljNC0uMSA3LjYgMi40IDkgNi4xQTgwLjQgODAuNCAwIDAwNTAgNTAuMnoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJ0b3BfMTciPjxwYXRoIGQ9Ik00Ni41IDU4LjJzLTEyLS42LTE2LjUtMy44YTkuMSA5LjEgMCAwMDYtNC4zYzEuNS0yLjUgMi4xLTUuNCAxLjctOC4zIDAgMCA5LjEtLjMgMTMuOC01LjVTNTcgMjMuNyA1NyAyMy43czcuOSA0LjEgMjEuNSAxLjhTOTUuMyAxOCA5NS4zIDE4czIuMiA5IDkuNCAxMmM0LjYgMS44IDkuNCAzIDE0LjMgMy42LS43IDguNi02LjEgMTMuNS0xMyAxNS44LTE5LjYtNy4xLTU5LjUgOC44LTU5LjUgOC44eiIgZmlsbD0iIzExMjI4OSIvPjxwYXRoIGQ9Ik00Ni41IDU4LjJzLTEyLS42LTE2LjUtMy44YTkuMSA5LjEgMCAwMDYtNC4zYzEuNS0yLjUgMi4xLTUuNCAxLjctOC4zIDAgMCA5LjEtLjMgMTMuOC01LjVTNTcgMjMuNyA1NyAyMy43czcuOSA0LjEgMjEuNSAxLjhTOTUuMyAxOCA5NS4zIDE4czIuMiA5IDkuNCAxMmM0LjYgMS44IDkuNCAzIDE0LjMgMy42LS43IDguNi02LjEgMTMuNS0xMyAxNS44LTE5LjYtNy4xLTU5LjUgOC44LTU5LjUgOC44eiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNDUgNjJzMTMuNy0xMy42IDQ5LjctMTEuM2MwIDAgMTEuMyAyIDE0LjYgNC44IDAgMCAuNC0xMy45LTE2LjItMTZzLTM1LjYgMS42LTQzLjUgMTEuN0EyNS45IDI1LjkgMCAwMDQ1IDYyeiIgZmlsbD0iIzE1MjRhNSIvPjxlbGxpcHNlIGN4PSI5NC4xIiBjeT0iNDMuMSIgcng9IjUiIHJ5PSI3LjciIGZpbGw9IiMxMTFjNjAiLz48ZWxsaXBzZSBjeD0iOTUuNyIgY3k9IjQzLjEiIHJ4PSI1IiByeT0iNy43Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzE4Ij48cGF0aCBkPSJNNzUuMyAzOC44QTEzLjkgMTMuOSAwIDAwNjAgMzRjLTEwIDMtNy40IDEzLjQtMTYuMiAxOS4yUzM0IDUxIDM0IDUxcy0xIDI0IDIxIDE2YzAgMCA5LTIgMTItOS0uMSAyLjUtLjcgNC45LTIgNyA0LjctLjggOS40LTEuNyAxNC03IDAgMCAzLTUgNCAwIDMgNyAxNCA3IDE0IDdzLTMtNiAwLTEwYzMtMyAyLjgtMS44IDIuOC0xLjhTMTAzIDYzIDExMyA2MnMxMC0xMiAxMC0xMi0zIDctNiAyLTEwLjQtMjEuMS0xNy43LTEzLjUtMjQgLjMtMjQgLjN6Ii8+PHBhdGggZD0iTTc0IDIybDIgMjRzMTEtMyAyMiAxbDUtMjUtMTAgMTAtNC0xNi03IDE1LTgtOXoiIGZpbGw9IiNmZjAiLz48cGF0aCBkPSJNNzUuOCA0My40TDc2IDQ2czExLTMgMjIgMWwuNS0yLjZhNDAuMiA0MC4yIDAgMDAtMjIuNy0xeiIgZmlsbD0iI2Q2ODIyNyIvPjxnIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNODkgMTZsNCAxNi40LTMtMS44LTIuMy0xMS44em0tMTUgNi40bDggOC4yLTMgLjktNC43LTUuOHpNOTMuNSA0NS42bDQuMSAxLjMgNS45LTI0LjgtNS42IDUuMi00LjQgMTguM3oiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzE5Ij48cGF0aCBkPSJNMTA1LjEgMjQuM2g3LjlTOTQuMiA5LjggNzUgMjEuNkM2OS4yIDI1IDYzLjQgMzUuNyA2MSA0NS4yYzAgMCAyMy41LTcuNyAzMy44IDExLjhoNC44TDExMyAyNC4zeiIvPjxwYXRoIGQ9Ik0xMTMgMjQuM1M5Mi44IDguNyA3My40IDIyLjdjMCAwIDExLjUtMTAuMyAzMS43IDEuNnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTk0LjggNTdoNC43TDExMyAyNC4zaC03Ljl6IiBmaWxsPSIjMDEwMTA3IiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9InRvcF8yMCI+PHBhdGggZD0iTTgzLjggNDMuNEE4LjMgOC4zIDAgMDA4MiA0NmMtMSAyIDEgNyA3IDhzMTEgMiAxMi0zLTEzLjQtOC4zLTE3LjItNy42eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNODIuOCA0NC44TDEwMiAxOWwtMy42IDI5LjhDOTcgNTUgNzkgNTUgODIuOCA0NC44eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04Mi44IDQ0LjhDOTEgNTEgOTYgNDAgOTcuOSAyNC40TDEwMiAxOWwtMy42IDI5LjhDOTcgNTUgNzkgNTUgODIuOCA0NC44eiIgb3BhY2l0eT0iLjE1Ii8+PHBhdGggZD0iTTk4LjggNDVTODkgNTIgODUgNDEuOGwxLjMtMS43czQuNyA4IDEyLjggM3ptLTguOS05LjdzMy41IDcuNyA5LjggMi43bC4zLTJjLTMuMyAxLjYtNi4zIDEuMy05LTIuM3ptNC4xLTUuNnMyIDQuMiA2LjUgMS43bC4yLTIuMnMtMy40IDItNS42LTF6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0idG9wXzIxIj48cGF0aCBkPSJNNzQuOSAzMy41cy03LTIuNC02LjItOS42IDkuNS0xMS40IDE1LjMtNS4xYzMuNCAzLjQgNC4xIDguNiAxLjggMTIuOGwtMTAuOSAxLjl6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTc5LjggMjYuNmMtMzEuNy0xLjYtMzMuOSAyNy0zMy45IDI3bDY1IC44Yy0uMS0uMS41LTI2LjMtMzEuMS0yNy44eiIvPjxwYXRoIGQ9Ik00Ni4xIDQ5LjhzLTQuNyAxLjItNS40IDQuNi0xLjIgNy44LTEuMiA3LjhjLjEgMS45IDIuOSA0LjEgMi45IDQuMWwxLjEtMi43YzEwLjgtNS44IDQyLjEtOC40IDUwLjctOC44IDUuNi0uMSAxMS4yLjMgMTYuNyAxLjFsMi4yIDMuNCAzLjYtMi41Yy43LS40IDEuMS0xLjIuNy0yLS42LTEuNC0zLTEwLjMtNS0xMS43LTEuMy0uOS0xMS0yLjMtMjguOC0uNGEyNjkuMiAyNjkuMiAwIDAwLTM3LjUgNy4xeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zOS41IDYyLjJjLjEgMS45IDIuOSA0LjEgMi45IDQuMWwxLjEtMi43YzEwLjgtNS44IDQyLjEtOC40IDUwLjctOC44IDUuMy0uMSAxMC41LjIgMTUuNyAxLjFsMy4yIDMuNSAzLjYtMi41Yy43LS40IDEuMS0xLjIuNy0yLTMuOS05LjQtODAgMi40LTc3LjkgNy4zeiIgb3BhY2l0eT0iLjEyIi8+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik00NS43IDQ5LjhzLTEuNCA3LjUtMS4yIDkuNGMuMSAxLjIuNCAyLjMuOCAzLjRsMi4xLS43LS44LTMuNCAxLjEtOS4yLTIgLjV6Ii8+PHBhdGggZD0iTTQ4LjUgNDkuMnMtMS40IDcuNS0xLjIgOS40Yy4xIDEuMi40IDIuMy44IDMuNGwyLjEtLjctLjgtMy40IDEuMS05LjItMiAuNXpNNTUuOSA0Ny40bC0uMyA4LjggMSAzLjMgMi0uMy0uOS0zdi05LjF6Ii8+PHBhdGggZD0iTTU4LjMgNDYuOGwtLjMgOC44IDEgMy4yIDItLjMtLjktM3YtOXpNNjcuNyA0NWwuOSA5LjItLjEgMy4yIDIuNy0uMy0uNC0zLjEtMS4yLTkuM3pNNzEuMSA0NC40bC44IDkuMnYzLjJsMi42LS4zLS4zLTMuMi0xLjItOS4yek04My45IDU1LjRsLjEtMy4xLTEuMS05LjYgMi41LS4yIDEuNCA5LjUtLjcgMy40ek04Ny4yIDU1LjJ2LTNsLTEuMS05LjYgMi41LS4zIDEuNCA5LjYtLjcgMy4zek05OSA0MS43bDEuNCA5LjUtLjQgMy42IDIuMy4yLjYtMy43LTEuOC05LjZ6TTEwMi40IDQxLjdsMS44IDkuNi0uNSAzLjggMi41LjIuNS0zLjgtMi05Ljd6TTExMS43IDQyLjdsMy45IDEwLjQtNC45IDIuNyAxLjQgMiA1LjUtMy4yLTMuNS04LjljLjEgMC0xLTIuNi0yLjQtM3oiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzAxIj48cGF0aCBkPSJNOTAuNSAxMjIuNXM1IDAgNC0yYy0uNC0uOS0zLjktMi42LTMuOS0yLjZsLTIuNC4zYzIuNCAyIDMgMy40IDIuMyA0LjN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik04OSAxMjIuOHMtMS4xIDMuNiAyIDQuMmM2IDEgNyA2IDYgOC0yIDUtMTYgOC0yMi0ycy02LTExLTE2LTEyLTEyIDUtMTIgNWMwIDIgMSAxIDEgMSAyLTMuNiA1LjktNS42IDEwLTUgOSAxIDExIDMgMTIgNXM1IDExIDEyIDEzIDE0IDAgMTYtNS0zLjMtOC41LTYtOWMtLjgtLjItMS44IDAtMi0yLjh2LS4yYzAtMi0xLS4yLTEtLjJ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik04NC41IDEyMy41YzEgMiA2LTEgNi0xczUgMCA0LTJjLS40LS45LTMuOS0yLjYtMy45LTIuNmwtNC44LjZzLTEuOCAzLjktMS4zIDV6Ii8+PHBhdGggZD0iTTkwIDEyMi44cy0xLjEgMy42IDIgNC4yYzYgMSA3IDYgNiA4LTIgNS0xNiA4LTIyLTJzLTYtMTEtMTYtMTItMTIgNS0xMiA1YzAgMiAxIDEgMSAxIDItMy42IDUuOS01LjYgMTAtNSA5IDEgMTEgMyAxMiA1czUgMTEgMTIgMTMgMTQgMCAxNi01LTMuMy04LjUtNi05Yy0uOC0uMi0xLjggMC0yLTIuOHYtLjJjMC0yLTEtLjItMS0uMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODQuNSAxMjMuNWMxIDIgNC0xIDYtMXM1IDAgNC0yYy0xLjUuNS03LjUgMi41LTEwIDN6IiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wMiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTE3LjggMTI3LjNjLTUtNS45LTkuOS0yLjUtMTEuOS0uNy0xLjItMS0yLjMtMi4xLTMuMi0zLjRMOTcgMTE1YTM1LjIgMzUuMiAwIDAxLTEyLjIgNC4xbDMuNiAxMXMtNSAuNy01IDMuNCAyLjIgNi4yIDguNiAzLjQgMTIuOS0uNyAxOC42LjcgMTIuMi0uNyAxMi4yLTQuOGMwLTMuMi0xLjMtNS42LTUtNS41ek03NS41IDEyNS45bC0uOC03LjJzLTEwLTEuNC0xNi40LTUuN2MwIDAtMy40IDEyLjktNi45IDE0LjlhNCA0IDAgMDAtNS40IDEuMyAzLjkgMy45IDAgMDAzLjMgNmMuNiAwIDEuMy0uMiAxLjgtLjVhNS4zIDUuMyAwIDAwOSAuMiA1LjQgNS40IDAgMDA3LjEgMi42IDUgNSAwIDAwMi41LTIuNSA2IDYgMCAwMDguMyAyLjEgNiA2IDAgMDAyLjEtOC4zIDUuNiA1LjYgMCAwMC00LjYtMi45eiIvPjwvZz48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTEyMiAxMzEuOWMtMi42LTIuNi03LjktMy03LjktM2E5IDkgMCAwMTMuOS0uOWMyLjItLjEgNCAxLjcgNCAzLjl6TTg2LjEgMTE5LjFTOTAgMTI4IDg5IDEzMWMwIDAgMS45LTggMS0xMC4ycy0zLjktMS43LTMuOS0xLjd6TTU4LjkgMTEzLjlzLTMuMyAxMS4yLTYuMyAxM2MwIDAgNy4yLTUuNiA4LjEtOC40cy0xLjgtNC42LTEuOC00LjZ6TTc5IDEzMC45Yy0yLjYtMi42LTQuNi0zLjMtNy45IDAgMC0yLjIgMS44LTMuOSAzLjktMy45czQgMS43IDQgMy45ek02Ny42IDEzM2MtMS45LTEuOS0zLjMtMi40LTUuNyAwLS4xLTEuNiAxLjEtMi45IDIuNy0zczIuOSAxLjEgMyAyLjd2LjN6TTU4LjMgMTMxLjZjLTEuNC0xLjQtMi41LTEuOC00LjMgMGEyLjEgMi4xIDAgMDEyLjMtMmMxLjEgMCAxLjkuOSAyIDJ6TTUyLjEgMTMxLjZjLTEuMy0yLjQtMi42LTMuMi01LjUtMS42LjQtMS41IDEuOS0yLjUgMy40LTIuMSAxLjUuNCAyLjUgMS45IDIuMSAzLjR2LjN6Ii8+PC9nPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNODMuNCAxMzMuNWMwIDIuNyAyLjIgNi4yIDguNiAzLjRzMTIuOS0uNyAxOC42LjcgMTIuMi0uNyAxMi4yLTQuOEMxMTQgMTM4IDExMyAxMzQgOTggMTM0LjZjLTggMC0xMiA0LjQtMTQuNi0xLjF6TTcxLjUgMTM2LjFjNS4yLS40IDcuOC0xLjggNy4zLTguNGE1LjYgNS42IDAgMDEtNyA4LjZjLS4yIDAtLjItLjEtLjMtLjJ6TTYyLjYgMTM2LjVjNC4yLS4zIDYuMi0xLjUgNS44LTYuNyAxLjkgMS42IDIuMSA0LjQuNSA2LjJzLTQuNCAyLjEtNi4yLjVjMCAuMS0uMSAwLS4xIDB6TTUzLjUgMTM1LjljMy43LS4yIDUuNS0xLjMgNS4yLTUuOSAxLjcgMS40IDIgMy44LjYgNS41YTMuOSAzLjkgMCAwMS01LjUuNmwtLjMtLjJ6TTQ3LjMgMTM0YzMtLjIgNC41LTEgNC4yLTQuOCAxLjQgMS4xIDEuNiAzLjEuNSA0LjVzLTMuMSAxLjYtNC41LjVsLS4yLS4yek02OSAxMTcuNWwuOCA3LjNjLTUuMS0uNC0xMC4yLjYtMTQuNyAyLjhhNDAgNDAgMCAwMTE0LjktLjhzMi44LTEuOCA1LjYtLjlsLS45LTcuNGEyMiAyMiAwIDAxLTUuNy0xek0xMDUuOSAxMjYuNmMyLTEuOCA2LjktNS4yIDExLjkuNyAwIC4xLTguOCAyLjctMTEuOS0uN3oiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzAzIj48cGF0aCBkPSJNNTkuNSAxMTQuNGMtLjYtMS0xLjktMS4yLTIuOS0uNmgtLjFjLTEuOCAxLjItMS44IDIuOS0xLjIgMy41bDEyLjIgMTMuNCAxLjIgMTEuMXMwIDEuMiAyLjMgMS4yIDEuOC0xLjggMS44LTEuOGwtLjYtMTEuMSA4LjgtMTRjMS4yLTEuOC0xLjItNS44LTQuNy0yLjlMNzEuNiAxMjYgNzAgMTA5LjhhMyAzIDAgMDAtMi45LTEuOGMtMi4zIDAtMi4zIDIuMy0yLjMgMy41czIuOSAxNS4yIDIuOSAxNS4ybC04LjItMTIuM3pNMTE5IDEyMC4yYzAtLjYtLjUtMS4yLTEuMS0xLjJsLTExLjEgMi45LTIuMSAyYzEuNy0xLjkgMy4xLTMuOSA0LjQtNi4xIDEuMi0yLjMgMi4zLTEuOCAyLjMtMS44czIuOSAwIDMuNS0xLjgtLjYtMS44LTIuOS0yLjNjLTEuNS0uMy0zIC4xLTQuMSAxLjJsLTguOCA5LjktMy41LTUuMiAxLjgtMy41Yy0xLjggMi4zLTEyLjIgNS4yLTEyLjIgNS4ybDUuMiAxLjJjMiAxLjcgMy44IDMuNyA1LjIgNS44IDEuOCAyLjktMi4zIDE0LTIuMyAxNC0uMyAyLjUgMy43IDEuNSA0LjctMi4yLjUtMi44IDEuMi01LjUgMi04LjEgMS40LjIgOS4zIDEuMSAxMC45IDEuMS45IDAgMS43LS43IDEuOC0xLjd2LS4xbC01LjgtMy41Yy0uMS4xIDEyLjEtNC42IDEyLjEtNS44eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNNTkuNSAxMTQuNGMtLjYtLjItMS4yLS4yLTEuOCAwLTEuOCAxLjIgMS44IDUuMiAxLjggNS4ybDkuMyAxMS4xIDEuMiAxMS4xcy0uMyAxLjIgMS4yIDEuMmMyLS4zIDEuOC0xLjggMS44LTEuOGwtLjYtMTEuMSA4LjgtMTRjMS4yLTEuOC0uOS0zLjgtMy41LTEuMmwtNS44IDEyLjgtMS45LTE3LjlzMC0xLjItMi4zLTEuMi0xLjggMi45LTEuOCAyLjlsMi45IDE2LjktOS4zLTE0ek05Mi40IDExOC4ybDUuMyA3IDEuNS0yLjEtMy42LTUuMSAxLjQtMi45LTQuNiAyLjV6Ii8+PC9nPjxwYXRoIGQ9Ik05OS44IDEyNi43YzIuMy0xLjggNi42LTguMyA5LjItMTIuMSAyLjItMS42IDQuOS0yLjIgNi0uMi0uNSAxLjgtMy41IDEuOC0zLjUgMS44cy0xLjItLjYtMi4zIDEuOC01LjggOC4yLTcuNiA5LjMtMy42IDExLTMuNiAxMWMtMSAxLjktMiAzLTMuMSAzbDQuOS0xNC42eiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNMTA2LjggMTIybDExLjEtMi45Yy42IDAgMS4yLjUgMS4yIDEuMSAwIDEuMi0xMi4yIDUuOC0xMi4yIDUuOGw1LjggMy41YzAgLjktLjcgMS43LTEuNyAxLjhoLS4xYy0xLjggMC0xMS4xLTEuMi0xMS4xLTEuMmwxLjItMi41IDUuOC01LjZ6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wNCI+PHBhdGggZD0iTTg2LjggMTE4LjdMMTA4IDEwOWM1LjggMTAuNyA1IDE5LjkgMCAyOC4xbC0yMS4yLTEwLjhjLjktMS4xIDEuOS01LjIgMC03LjZ6TTc5LjEgMTE3LjdsLTI2LTEyYy01LjUgOS42LTUuNSAyMS4yIDAgMzQuNmwyNi4xLTEzLjRjLTEuMi0xLjMtMy44LTUuNC0uMS05LjJ6Ii8+PHBhdGggZD0iTTc5LjEgMTE3LjdsLTI2LTEyYy01LjUgOS42LTUuNSAyMS4yIDAgMzQuNmwyNi4xLTEzLjRjLTEuMi0xLjMtMy44LTUuNC0uMS05LjJ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMTUiLz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNSI+PHBhdGggZD0iTTk3LjkgMTI1LjlsLTcuMS0xLjZzLTEuMi0uMS0xLjEtLjhjLjEtLjcgMS4zLS41IDEuMy0uNWw3LjIuMmMuNy4xIDEuMi44IDEuMSAxLjUtLjEuNy0uNyAxLjItMS40IDEuMnpNOTguMiAxMjBsLTcuMSAxLjRzLTEuMS40LTEuMy0uM2MtLjItLjcgMS0xIDEtMWw2LjgtMi43YTEgMSAwIDAxMS40Ljl2LjFjLjMuNy0uMSAxLjMtLjggMS42ek02Ni44IDEyN2w5LjEtMi4yczEuNi0uMiAxLjUtMWMtLjItLjYtMS44LS4zLTEuOC0uM2wtOS4zLjljLS44IDAtMS40LjgtMS4zIDEuNi4yLjggMSAxLjIgMS44IDF6TTY2LjMgMTIwbDkuMyAxLjVzMS41LjQgMS43LS4zYy4yLS43LTEuMy0xLTEuMy0xbC04LjktMi43Yy0uOC0uMi0xLjYuMi0xLjkgMS0uMi43LjMgMS40IDEuMSAxLjZ6Ii8+PC9nPjxjaXJjbGUgY3g9IjgzLjkiIGN5PSIxMjIuMSIgcj0iNi43Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzA1Ij48cGF0aCBkPSJNOTUuOCAxMTUuNWExNiAxNiAwIDAwMi43IDIuNWMuNCAwIDEuMy0yLjQgMi4xLTUgMi43LTEuOCAyLjItMS40IDQuNy0zLjUgMy4xIDYuNSA4LjYgMTkuNSA4LjYgMTkuNWwtMS45IDEwdi05cy03LjctMTctOC43LTE3Yy0xIDAtMi45IDExLTMuOSAxMS0uNSAwLTcuMy03LjItNy4zLTcuMnpNNTUuOSAxMTAuNnMtMy42IDMuNC00IDMuNGMtMS4xIDAtNC40LTEyLTUuNS0xMnMtMTIuMSAyMy0xMi4xIDIzbDIuMiAxMHYtOXM4LjgtMTcgOS45LTE3IDMuMyAxMSA0LjQgMTFjLjUgMCA4LjMtNy4xIDguMy03LjFsLTMuMi0yLjN6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik01NS45IDExMC42cy0zLjYgMy40LTQgMy40Yy0xLjEgMC00LjQtMTItNS41LTEycy0xMi4xIDIzLTEyLjEgMjNsMi4yIDEwdi05czguOC0xNyA5LjktMTcgMy4zIDExIDQuNCAxMWMuNSAwIDguMy03LjEgOC4zLTcuMWwtMy4yLTIuM3pNOTUuOCAxMTUuNWExNiAxNiAwIDAwMi43IDIuNWMuNCAwIDEuMy0yLjMgMi4xLTUgMi42LTEuNyAyLjMtMS41IDQuNy0zLjUgMy4xIDYuNSA4LjYgMTkuNSA4LjYgMTkuNWwtMS45IDEwdi05cy03LjctMTctOC43LTE3Yy0xIDAtMi45IDExLTMuOSAxMS0uNSAwLTcuMy03LjItNy4zLTcuMnoiLz48L2c+PHBhdGggZD0iTTcwIDEwNy4xcy05IDEyLjMtMTAgMTIuMy00LTEzLjQtNS0xMy40LTExIDI1LjgtMTEgMjUuOGwyIDExLjJ2LTEwLjFzOC0xOS4xIDktMTkuMSAzIDEyLjMgNCAxMi4zIDE1LTE2LjggMTUtMTYuOCAwLTMuMy00LTIuMnoiLz48cGF0aCBkPSJNNjAgMTIyLjRjLTEgMC00LTEyLjQtNS0xMi40cy0xMCAyMS44LTEwIDIxLjhsMSAxMS4ydi0xMC4xczgtMTkuMSA5LTE5LjEgMyAxMi4zIDQgMTIuMyAxNS0xNi44IDE1LTE2LjhjMC0uOS0uNS0xLjgtMS4zLTIuMi0uNi0uMy0xMS43IDE1LjMtMTIuNyAxNS4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNOTYgMTA3LjJzOSAxMi4zIDEwIDEyLjMgNC0xMy41IDUtMTMuNSAxMSAyNS44IDExIDI1LjhsLTIgMTEuMnYtMTAuMXMtOC0xOS4xLTktMTkuMS0zIDEyLjMtNCAxMi4zLTE1LTE2LjgtMTUtMTYuOCAwLTMuMiA0LTIuMXoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMDYiPjxwYXRoIGQ9Ik02MSAxMTQuN2E2My4zIDYzLjMgMCAwMDI2LjYgMTZjLTcgMi41LTggNi41LTkuNiAxMi4zIDAgMCAxNS40LTMuMyAxNy03LjcgMCAwIDYgNi44IDE4IDUuOC0yLjItNS44LTktMTIuMi0xOC0xMy41LTIuNyAwLTQuMi02LjggMy0xMi42LTIyIDguNy0zNy0uMy0zNy0uM3oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik04Ny42IDEzMC43Yy02LjYgMi4xLTguMyA2LjctOS42IDEyLjMgMCAwIDE1LjQtMy4zIDE3LTcuNyAwIDAgNiA2LjggMTggNS44LTIuMi01LjgtOS0xMi4yLTE4LTEzLjUgMCAuNC0uNiAxLS42IDIuMi0xLjYtLjMtNC4zLjEtNi44IDF6Ii8+PHBhdGggZD0iTTkxIDEyOC41czE0IDQuOCAyMiAxMi42Yy0yLjItNS44LTktMTIuMi0xOC0xMy41LTIuNyAwLTQuMi02LjggMy0xMi42YTUyIDUyIDAgMDEtOC41IDIuNmMtMi41IDggMS41IDEwLjkgMS41IDEwLjl6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMSIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wNyI+PHBhdGggZD0iTTg1LjIgMTIwLjVjLS42IDUuMyAwIDEwLjYgMS44IDE1LjUgMyA4IDIgNiAyIDYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNmMjkwNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNODggMTM4cy02LjQtMTkuMSAxMi44LTE5LjZTMTI5IDk5IDEyOSA5OWEzNC40IDM0LjQgMCAwMS0xMCAyOWMtNyA4LTIzLTQtMzEgMTB6TTg0LjcgMTMwLjRzLTMuMy04LjgtMTcuOS0xMC0yOS4yIDEuMi0zMi41LTE0LjRjLTEgOC4yIDEuNCAxNi41IDYuOCAyMi44IDkgMTAuOCAzMS40IDMuNiAzMS40IDMuNnM5LTMuNiAxNC42IDMuNmwtMi40LTUuNnoiLz48ZyBvcGFjaXR5PSIuMjUiIGZpbGw9IiMwMTAxMDEiPjxwYXRoIGQ9Ik04OCAxMzhjLTEtMTcgMzYtOCA0MS0zOWEzNC40IDM0LjQgMCAwMS0xMCAyOWMtNyA4LTIzLTQtMzEgMTB6TTM0LjIgMTA2UzMzIDEyMCA0MSAxMjguOGM5IDEwLjIgMzEuNCAzLjYgMzEuNCAzLjYgMS40LTIuNCAxNS42LS4zIDE0LjYgMy42IDAtMTMuNy00OC0zLjktNTIuOC0zMHoiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzA4Ij48cGF0aCBmaWxsPSIjZmQ5NzI3IiBkPSJNMTAxLjYyIDEyNy44Yy42My02LjktLjc1LTguODgtLjc1LTguODhzLTEuNjItMTAuMjQtNi40NC0xMi44M2MtMy4xMy0xLjc4LTUuNjctMS44My03LjkzLTEuMTEtMi4xMy4wMi00LjE4LjY3LTYuMDIgMS44Ny0uMTEuMDgtLjMzLjE0LS40NS4yMmEzNC4xIDM0LjEgMCAwMS0xMy4xOC0yLjk3IDE1LjYgMTUuNiAwIDAwLTkuOTUtMS4xNmMtNC43LjE3LTEwLjA0IDIuNzctMTEuMTMgMTIuODQtMS44NCAxNi41MyA2LjU1IDI0LjEzIDYuNTUgMjQuMTMgMy43NSA0LjAyIDEwLjY2IDYuODggMTYuMjIgNS4zMyAyLjQzLjAzIDQuNzMtLjg4IDYuNjItMi4zNyAwIDAgNC4xMy02LjA3IDEwLjAyLTcuNzZsLjMxLS4wNGMyLjcxLjE4IDUuNDguMDYgOC4xMS0uNDggNC41MS0uMjEgNy41Mi0xLjcgOC4wMi02Ljh6Ii8+PHBhdGggZD0iTTY5LjQzIDE0My42N2E5LjY2IDkuNjYgMCAwMS0zLjggMS45N2MuOTItLjA0IDEuODUtLjE4IDIuNzEtLjQzIDIuNDQuMDIgNC43My0uODkgNi42Mi0yLjM4IDAgMCA0LjA0LTYuMDggMTAuMDItNy43NS0uOTIuMDMtMS44Ni4xNy0yLjgxLjQtNy4zNC4xMi0xMi43NCA4LjItMTIuNzQgOC4yem0zMi4xOS0xNS44OGMuNjMtNi45LS43NS04Ljg3LS43NS04Ljg3cy0xLjYyLTEwLjI1LTYuNDQtMTIuODRjLTMuMTQtMS43Ny01LjY3LTEuODItNy45My0xLjEtLjkyLjAzLTEuODYuMTctMi43Mi40MiAxLjgxLjEyIDMuNTUuNjQgNS4xMiAxLjUyIDQuODIgMi42IDYuNDQgMTIuODQgNi40NCAxMi44NHMxLjM3IDEuOTcuNzUgOC44N2MtLjQgMy45OS0yLjMzIDUuNjgtNS4zMiA2LjQ2LjkyLS4wMyAxLjg2LS4xNyAyLjgyLS40IDQuNTItLjMyIDcuNTMtMS44MSA4LjAzLTYuOXptLTM0Ljg3LTIzLjdhMTUuNiAxNS42IDAgMDAtOS45NS0xLjE3Yy0uOTIuMDQtMS44Ni4xNy0yLjgyLjQgMi40NS0uMDYgNSAuNSA3LjE0IDEuNTkgMy4wNSAxLjY2IDEyLjMgMy45MiAxNiAyLjU1IDEuMS4xIDIuMjUtLjEgMy4yNi0uNjMtLjEyLjA4LS4zMy4xNC0uNDUuMjJhMzQuMSAzNC4xIDAgMDEtMTMuMTgtMi45NnoiIG9wYWNpdHk9Ii44Ii8+PGNpcmNsZSBmaWxsPSIjMzMyMjFmIiB0cmFuc2Zvcm09InJvdGF0ZSgxMC4xMykiIHI9IjUuNyIgY3k9IjEwNS4xMiIgY3g9IjEwMC42MyIvPjxwYXRoIGZpbGw9IiM1NDM5MzMiIGQ9Ik0xMTMuMDIgMTE0LjA4bC0yOC4xOCAzLjY2YTUuNyA1LjcgMCAwMTEuMDggNC40NSA1LjcgNS43IDAgMDEtLjQ2IDEuNGwyOC4zNC0zLjY4Yy40MS0uMDMuNy0uNDguNjctLjlsLS41Ni00LjI2Yy0uMDMtLjQtLjQ4LS43LS45LS42N3oiLz48cGF0aCBkPSJNNjguNDEgMTE1LjI1bDIuNTkgMTUuMS0zLjU2LjU4LS4zLTEuNzhjLS45My4xMy0xLjkyLS41NS0yLjA2LTEuNDlsLjAyLS4xYy0uMy0xLjc4LTEuNTQtNy45LTEuNTQtNy45LjEyLS42OC43NC0xLjI4IDEuMzgtMS40N2wtLjE4LTIuMzd6Ii8+PHBhdGggZmlsbD0iI2ZkOTcyNyIgZD0iTTExOC45NyAxMTAuODhsNi44Ny0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wM2E0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOTFhNC45OCA0Ljk4IDAgMDEtNS41NC00LjI0bC0uMTItMS4wNGE0Ljk4IDQuOTggMCAwMTQuMjQtNS41NHoiLz48cGF0aCBvcGFjaXR5PSIuMiIgZD0iTTExOC45NyAxMTAuODhsNi44Ny0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wM2E0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOTFhNC45OCA0Ljk4IDAgMDEtNS41NC00LjI0bC0uMTItMS4wNGE0Ljk4IDQuOTggMCAwMTQuMjQtNS41NHoiLz48cGF0aCBmaWxsPSIjNTQzOTMzIiBkPSJNMTE2LjYyIDExMC45N3MtLjU5LTEuODMuOTYtMS45NmMxLjU1LS4xMyAxLjMzIDEuNjYgMS4zMyAxLjY2em0zLjU5IDEwLjZzLjQ5IDEuODEtLjk2IDEuOTZjLTEuNDUuMTUtMS4zMy0xLjY2LTEuMzMtMS42NnptNC4xMy0uMzhzLjQ5IDEuODEtLjk2IDEuOTZjLTEuNDUuMTUtMS4zMy0xLjY2LTEuMzMtMS42NnptMy41NC0uNDlzLjUgMS44Mi0uOTYgMS45NmMtMS40NS4xNS0xLjMzLTEuNjYtMS4zMy0xLjY2em0tNy4xMS0xMC4ycy0uNTktMS44NC45Ni0xLjk3YzEuNTUtLjEzIDEuMzMgMS42NiAxLjMzIDEuNjZ6bTQuMTMtLjM5cy0uNTktMS44My45Ni0xLjk2YzEuNTUtLjEzIDEuMzMgMS42NiAxLjMzIDEuNjZ6Ii8+PHBhdGggZmlsbD0iI2ZkOTcyNyIgZD0iTTExOC4wOSAxMTAuNzJsNi44Ni0uOWE0Ljk4IDQuOTggMCAwMTUuNTQgNC4yNGwuMTIgMS4wNGE0Ljk4IDQuOTggMCAwMS00LjI0IDUuNTRsLTYuODcuOWE0Ljk4IDQuOTggMCAwMS01LjU0LTQuMjRsLS4xMi0xLjA0YTUuMDcgNS4wNyAwIDAxNC4yNS01LjU0eiIvPjxwYXRoIGQ9Ik0xMTcuNTEgMTEzLjM2bDguNTMtMS4xMWMuMzEtLjA1LjU3LjIuNjIuNTEuMDUuMzItLjIuNTgtLjUyLjYybC04LjUzIDEuMTJjLS4zLjA0LS41Ny0uMi0uNjEtLjUyLS4wNS0uMzEuMi0uNTcuNTEtLjYyem0xLjA3IDQuMjZsOC41My0xLjEyYy4zMS0uMDQuNTcuMi42Mi41Mi4wNC4zMS0uMi41Ny0uNTIuNjJsLTguNTMgMS4xMWMtLjMxLjA1LS41Ny0uMi0uNjItLjUxLS4wNi0uMjIuMi0uNTguNTItLjYyeiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8wOSI+PHBhdGggZD0iTTczLjcgMTI0LjhsLS4xLTEgLjEtNi4zLTMuOC0uNS41IDRjLTMtLjItNS45LjUtOC41IDItMyAyLTUgNS0zIDhzNiAzIDExIDBhNy4yIDcuMiAwIDAwMy44LTYuMnoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik03Ni44IDEyMnMwLTIuMS0zLjItMi41djQuM2wuMSAxYy0uMSAyLjYtMS41IDUtMy44IDYuMi01IDMtOSAzLTExIDBzMC02IDMtOGMyLjYtMS41IDUuNS0yLjIgOC41LTJsLS4yLTEuM2MtMS44LjMtMy42LjgtNS4zIDEuMy0xMiA0LTEzIDE2LTEyIDE3czMgMiAxMCAyYzQuMi0uMSA4LTIuMyAxMC02bDEgNXMyIDIgMyAwLS4xLTE3LS4xLTE3eiIvPjxwYXRoIGQ9Ik04Ny4yIDEyNC44bC4xLTEtLjEtNi4zIDMuOC0uNS0uNSA0YzMtLjIgNS45LjUgOC41IDIgMyAyIDUgNSAzIDhzLTYgMy0xMSAwYTcgNyAwIDAxLTMuOC02LjJ6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNODQgMTIyczAtMi4xIDMuMi0yLjV2NC4zbC0uMSAxYy4xIDIuNiAxLjUgNSAzLjggNi4yIDUgMyA5IDMgMTEgMHMwLTYtMy04YTE0LjkgMTQuOSAwIDAwLTguNS0ybC4yLTEuM2MxLjguMyAzLjYuOCA1LjMgMS4zIDEyIDQgMTMgMTYgMTIgMTdzLTMgMi0xMCAyYy00LjItLjEtOC0yLjMtMTAtNmwtMSA1cy0yIDItMyAwIC4xLTE3IC4xLTE3eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMCI+PGVsbGlwc2UgY3g9IjgwIiBjeT0iMTMxLjUiIHJ4PSIzMiIgcnk9IjguNyIgb3BhY2l0eT0iLjMiLz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxMzAuMyIgcng9IjE3IiByeT0iNC4xIiBvcGFjaXR5PSIuNiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMSI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNjQuNyAxMTUuOXMtMi44IDEwLjctMTEuMiAxMi45Yy01IDEuMy0xMC4zLjUtMTQuNi0yLjIgMCAwLTMuOS0xLjEtMS43IDIuOHM4LjQgMTEuOCAyNS44IDUuNiAxOC0xNi45IDE4LTE2LjktMTEuMiAxLjItMTYuMy0yLjJ6Ii8+PHBhdGggZD0iTTU4IDExMnMtNi4yIDEzLjUtMTUuMiAzLjljMCAwLTUuNi01LjYtMy40IDEuMXMxMS4xIDE4LjcgMzAuMy45YzAgLjEtNy44LTItMTEuNy01Ljl6TTk0LjggMTE1LjlzMi44IDEwLjcgMTEuMiAxMi45YzUgMS4zIDEwLjMuNSAxNC42LTIuMiAwIDAgMy45LTEuMSAxLjcgMi44cy04LjQgMTEuOC0yNS45IDUuNi0xOC0xNi45LTE4LTE2LjkgMTEuMyAxLjIgMTYuNC0yLjJ6Ii8+PHBhdGggZD0iTTEwMS41IDExMnM2LjIgMTMuNSAxNS4yIDMuOWMwIDAgNS42LTUuNiAzLjQgMS4xcy0xMS4yIDE4LjctMzAuMy45Yy0uMS4xIDcuOC0yIDExLjctNS45eiIvPjwvZz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjUgNDYgMTIxLjYpIiBjeD0iNDUuOSIgY3k9IjEyMS42IiByeD0iMS40IiByeT0iMS44Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTIuNSA1MSAxMjIuMykiIGN4PSI1MSIgY3k9IjEyMi4zIiByeD0iMS44IiByeT0iMS40Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTI3LjUgNTUuNiAxMjEpIiBjeD0iNTUuNiIgY3k9IjEyMS4xIiByeD0iMS40IiByeT0iMS4xIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQ3LjggNTguNCAxMTguNikiIGN4PSI1OC40IiBjeT0iMTE4LjYiIHJ4PSIxLjQiIHJ5PSIxLjEiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMjUgMTEzLjUgMTIxLjYpIiBjeD0iMTEzLjUiIGN5PSIxMjEuNiIgcng9IjEuOCIgcnk9IjEuNCIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC04Ny41IDEwOC41IDEyMi4zKSIgY3g9IjEwOC41IiBjeT0iMTIyLjMiIHJ4PSIxLjQiIHJ5PSIxLjgiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjIuNSAxMDMuOSAxMjEuMSkiIGN4PSIxMDMuOSIgY3k9IjEyMS4xIiByeD0iMS4xIiByeT0iMS40Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTQyLjIgMTAxIDExOC42KSIgY3g9IjEwMS4xIiBjeT0iMTE4LjYiIHJ4PSIxLjEiIHJ5PSIxLjQiLz48cGF0aCBkPSJNNTggMTEycy02LjIgMTMuNS0xNS4yIDMuOWMwIDAtNS42LTUuNi0zLjQgMS4xczExLjEgMTguNyAzMC4zLjljMCAuMS03LjgtMi0xMS43LTUuOXoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4zIi8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0xMDEuNSAxMTJzNi4yIDEzLjUgMTUuMiAzLjljMCAwIDUuNi01LjYgMy40IDEuMXMtMTEuMiAxOC43LTMwLjMuOWMtLjEuMSA3LjgtMiAxMS43LTUuOXpNNjQuNyAxMTUuOXMtMi44IDEwLjctMTEuMiAxMi45Yy01IDEuMy0xMC4zLjUtMTQuNi0yLjIgMCAwLTMuOS0xLjEtMS43IDIuOHM4LjQgMTEuOCAyNS44IDUuNiAxOC0xNi45IDE4LTE2LjktMTEuMiAxLjItMTYuMy0yLjJ6Ii8+PHBhdGggZD0iTTk0LjggMTE1LjlzMi44IDEwLjcgMTEuMiAxMi45YzUgMS4zIDEwLjMuNSAxNC42LTIuMiAwIDAgMy45LTEuMSAxLjcgMi44cy04LjQgMTEuOC0yNS45IDUuNi0xOC0xNi45LTE4LTE2LjkgMTEuMyAxLjIgMTYuNC0yLjJ6Ii8+PC9nPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTYyLjUgMTE0LjhzLTEuNyAxNC42LTcuMyAxNC42YzAgMC0yLjIgMC0zLjktMi44cy0zLjQtMi4yLTIuOC42UzUwLjcgMTM5LjYgNjIgMTM5czE1LjctMTEuMiAxNS43LTE3LjR2LTMuMmMtLjEgMC05LjYuMy0xNS4yLTMuNnpNOTcgMTE0LjhzMS43IDE0LjYgNy4zIDE0LjZjMCAwIDIuMiAwIDMuOS0yLjhzMy40LTIuMiAyLjguNi0yLjIgMTIuNC0xMy41IDExLjgtMTUuNy0xMS4yLTE1LjctMTcuNHYtMy4yczkuNi4zIDE1LjItMy42eiIvPjwvZz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMzcuMSA2NC4xIDEyOC4zKSIgY3g9IjY0LjEiIGN5PSIxMjguMyIgcng9IjIuMiIgcnk9IjEuNyIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC05LjUgNTguNSAxMzEuMSkiIGN4PSI1OC41IiBjeT0iMTMxLjEiIHJ4PSIyLjIiIHJ5PSIxLjciLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjIuMSA2OCAxMjMuOCkiIGN4PSI2OCIgY3k9IjEyMy44IiByeD0iMS44IiByeT0iMS4zIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTgyLjQgNjkgMTE5LjMpIiBjeD0iNjkuMSIgY3k9IjExOS4zIiByeD0iMS44IiByeT0iMS4zIi8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTUyLjkgOTUuMyAxMjguMykiIGN4PSI5NS4zIiBjeT0iMTI4LjMiIHJ4PSIxLjciIHJ5PSIyLjIiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtODAuNSAxMDEgMTMxLjEpIiBjeD0iMTAwLjkiIGN5PSIxMzEuMSIgcng9IjEuNyIgcnk9IjIuMiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0yNy45IDkxLjUgMTIzLjgpIiBjeD0iOTEuNSIgY3k9IjEyMy44IiByeD0iMS4zIiByeT0iMS44Ii8+PGVsbGlwc2UgdHJhbnNmb3JtPSJyb3RhdGUoLTcuNiA5MC40IDExOS4zKSIgY3g9IjkwLjQiIGN5PSIxMTkuMyIgcng9IjEuMyIgcnk9IjEuOCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xMiI+PGcgZmlsbD0iI2VkZWRlZCI+PHBhdGggZD0iTTYxIDExNS4ybDMuNiA1LjFzNi4yIDQgMTYuOCAzLjZjMTMuMS0uNyAxNy41LTMuNiAxNy41LTMuNmwyLjktNy4zcy0xNiAxMC45LTQwLjggMi4yeiIvPjxwYXRoIGQ9Ik02Ny45IDEzMWE2IDYgMCAwMDIgMS4yYzYuMSAyLjYgMjEgMi41IDI0LjItMS4ybDIuMi05LjZhNjAgNjAgMCAwMS0yOS45IDBsMS41IDkuNnoiLz48cGF0aCBkPSJNNzAuMyAxMzMuN2MzLjEgMy4xIDcuMyA0LjggMTEuNyA0LjggNy4zIDAgMTAuMi00LjggMTAuMi00Ljh2LTEuMXMtMTAuOSAzLjgtMjEuOS0uNXYxLjZ6Ii8+PC9nPjxwYXRoIGQ9Ik04MS40IDEyMy45bDEuNi0uMWEzNy42IDM3LjYgMCAwMDE1LjktMy41bDIuOS03LjNzLTcuMSA0LjktMTkuMiA1LjVjMi40IDEuMS0xLjIgNS40LTEuMiA1LjR6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNNzAuMyAxMzMuN2MzLjEgMy4xIDcuMyA0LjggMTEuNyA0LjggNy4zIDAgMTAuMi00LjggMTAuMi00Ljh2LTEuMXMtMTAuOSAzLjgtMjEuOS0uNXYxLjZ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik03OC4xIDEyMy41Yy4zLjMtNi40IDMuOS0xMC45IDMuN2wuMyAxczkuNy0xIDEyLjctNWwtMi4xLjN6bTE2LjggNC44YzEuMi43LTEwLjMgNi43LTE2IDUuOWw0LS4xczktLjQgMTItNC41di0xLjN6bS0uNC02LjRzLTEzLjQgMTAuMy0yNS42IDkuOGwxLjYuNnMxMC45IDEuNiAyNS44LTEwLjRoLTEuOHoiLz48ZyBvcGFjaXR5PSIuMTUiPjxwYXRoIGQ9Ik04MSAxMzRjNS42LjEgMTEuMy0uOSAxMy4xLTNsMi4yLTkuNmE4NiA4NiAwIDAxLTE0LjMgMS44Yy45IDEuNS4xIDUuOC0xIDEwLjh6Ii8+PHBhdGggZD0iTTgyLjEgMTIzLjJjMTAuMiAwIDEzLjctMS41IDEzLjctMS41bC0uNiAxLjVzLTE2LjggMy42LTI4LjQtLjd2LTEuMXM1LjEgMS44IDE1LjMgMS44eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMTMiPjxwYXRoIGQ9Ik04OC44IDExNy45bC4yIDYuMWMzLjIgMS4yIDYuOCAxLjIgMTAgMGwzLjItMTEuOHMtNy43IDQuNi0xMy40IDUuN3oiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNOTEgMTI0LjZTODkuOSAxMzcgOTEgMTM5czQuNCAzIDQuNCAwIDEuNi0xNC40IDEuNi0xNC40bC0zIC4yYy0xIDAtMiAwLTMtLjJ6IiBmaWxsPSIjZjVmNWY1Ii8+PHBhdGggZD0iTTkxIDEzOWMxLjEgMiA0LjQgMyA0LjQgMHMxLjYtMTQuNCAxLjYtMTQuNGwtMyAuMnMwIDE1LjItMyAxNC4yeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNjkuNiAxMjMuM3MyLjYgNS4yIDUuMiA3LjFMNzggMTMzdjQuMmMwIC40LTkuOC0yLjgtOC40LTEzLjl6IiBmaWxsPSIjNmQ0NzE2Ii8+PHBhdGggZD0iTTY4LjkgMTIzLjNzNS4yLTEuMyA4LjQgMiAzLjIgNy44IDEuMyA3LjgtMS45LjYtOS43LTkuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDQuMiAxMDguNHM0LjUtNy44IDE4LjItLjdTNjUgMTI5LjggNzcuMyAxMzdjMCAwLTMuNSAzLjUtOC01LjctNC40LTktNC4zLTIzLjYtMjUuMS0yMi45eiIgZmlsbD0iIzk5NjcxZCIvPjxwYXRoIGQ9Ik03Ny4zIDEzN3MtNS44IDIuNi05LjgtMTAuNFM1OSAxMDUuOCA0OCAxMDYuNGMtMS42IDAtMyAuNi00LjIgMS42LTUuMyA0LjgtMS4yIDE4LjcgNC4yIDIzLjEgNi41IDUuMiAyMC44IDEwLjQgMjYuNyA4LjRzMi42LTIuNSAyLjYtMi41eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik03OC4yIDExOC4ybC0uOSA3LjFjLTEuOC0xLjMtMy40LTIuMi00LjgtMi4ybC42LTUuOWMxLjcuNSAzLjQuOCA1LjEgMXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik00NS41IDExMWgxMWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTExYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTQ0LjUgMTE0aDE0Yy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTRjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNDQuNSAxMTdoMTdjLjMgMCAuNS4yLjUuNXMtLjIuNS0uNS41aC0xN2MtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41ek00NS41IDEyMGgxN2MuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTE3Yy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTQ2LjUgMTIzaDE3Yy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTdjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNDguNSAxMjZoMTdjLjMgMCAuNS4yLjUuNXMtLjIuNS0uNS41aC0xN2MtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41ek01MC41IDEyOWgxNWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTE1Yy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjV6TTU0LjUgMTMyaDEzYy4zIDAgLjUuMi41LjVzLS4yLjUtLjUuNWgtMTNjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXpNNTkuNSAxMzVoOWMuMyAwIC41LjIuNS41cy0uMi41LS41LjVoLTljLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNXoiLz48cGF0aCBkPSJNOTQuNyAxMjQuN2MxLjgtLjIgMi41LS4xIDQuMy0uN2wzLjItMTEuOC00LjMgMi40cy0uNyAxMC4yLTMuMiAxMHoiIG9wYWNpdHk9Ii4xIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE0Ij48cGF0aCBkPSJNOTcgMTIyLjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNOTcuNiAxMjIuNXMtNS40LTEuNC04LjkgMi0zLjQgOC4yLTEuNCA4LjIgMi4yLjcgMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjMuNSAxMDYuOHMtNC44LTguMi0xOS4xLS43Yy0xNC4zIDcuNS0yLjcgMjMuMi0xNS43IDMwLjcgMCAwIDMuNCA0LjMgOC40LTUuOSA0LjctOS4zIDQuNi0yNC43IDI2LjQtMjQuMXoiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNODguOCAxMzYuOHM2LjEgMi43IDEwLjItMTAuOSA4LjktMjEuOCAyMC40LTIxLjFjMS42IDAgMy4yLjYgNC40IDEuNyA1LjYgNSAxLjMgMTkuNi00LjQgMjQuMi02LjggNS40LTIxLjggMTAuOS0yNy45IDguOXMtMi43LTIuOC0yLjctMi44eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik04Ny44IDExNy4ybDEgNy40YzEuOS0xLjQgMy42LTIuMyA1LTIuM2wtLjYtNi4yYy0xLjguNS0zLjYuOC01LjQgMS4xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTEyMi4yIDExMC42aC0xMS42Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTEyMy4zIDExMy44aC0xNC43Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNC43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMy4zIDExNi45aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMi4yIDEyMC4xaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMi41LS41LjV6TTEyMS4xIDEyMy4yaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTExOS4xIDEyNi40aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTExNyAxMjkuNWgtMTUuOGMtLjMgMC0uNS0uMi0uNS0uNXMuMi0uNS41LS41SDExN2MuMyAwIC41LjIuNS41di4xYzAgLjItLjMuNC0uNS40ek0xMTIuOCAxMzIuN0g5OS4xYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTEwNy41IDEzNS44SDk4Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWg5LjVjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNXoiLz48cGF0aCBkPSJNNjMgMTIzLjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNNjAuMyAxMTNsLTIuMSAxMS4zYzEuOS0xLjQgMi43LS4zIDQuMS0uM2wyLjItOS4yYy0yLS40LTIuOS0xLjQtNC4yLTEuOHoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik02My42IDEyMy41cy01LjUtMS40LTguOSAyYy0zLjQgMy40LTMuNCA4LjItMS40IDguMnMyLjIuNyAxMC4zLTEwLjJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg5LjUgMTA3LjhzLTQuOC04LjItMTkuMS0uN2MtMTQuMyA3LjUtMi43IDIzLjItMTUuNyAzMC43IDAgMCAzLjYgNCA4LjQtNiA0LjYtOS4zIDQuNi0yNC42IDI2LjQtMjR6IiBmaWxsPSIjOTk2NzFkIi8+PHBhdGggZD0iTTU0LjggMTM3LjhzNi4xIDIuNyAxMC4yLTEwLjkgOC45LTIxLjggMjAuNC0yMS4xYzEuNiAwIDMuMi42IDQuNCAxLjcgNS42IDUgMS4zIDE5LjYtNC40IDI0LjItNi44IDUuNC0yMS44IDEwLjktMjggOC45cy0yLjYtMi44LTIuNi0yLjh6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTg4LjIgMTExLjZINzYuNmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTEuNmMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41ek04OS4zIDExNC44SDc0LjVjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDE0LjdjLjMgMCAuNS4yLjUuNXYuMWMuMS4zLS4yLjUtLjQuNXpNODkuMyAxMTcuOUg3MS40Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTg4LjIgMTIxLjFINzAuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjItLjIuNS0uNS41ek04Ny4xIDEyNC4ySDY5LjNjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDE3LjljLjMgMCAuNS4yLjUuNXYuMWMtLjEuMy0uMy41LS42LjV6TTg1LjEgMTI3LjRINjcuMmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjVoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjItLjMuNS0uNS41ek04MyAxMzAuNUg2Ny4yYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjVIODNjLjMgMCAuNS4yLjUuNXYuMWMwIC4yLS4zLjQtLjUuNHpNNzguOCAxMzMuN0g2NS4xYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy41LS41LjV6TTczLjUgMTM2LjhINjRjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xNSI+PHBhdGggZD0iTTEyOS4xIDExNC4xYzEuMi0xLjgtLjktMi44LTMuMi0yLjMgMCAwLTE0LjYgMi42LTMwIDQtMTMuMiA1LjctMjcgNi0zNS43LTEuNi0xMi42LTMtMjIuNC03LjUtMjUuNy01LjggMCAwLTYuNi45LTUuMyA1LjMtLjEgMS4zLjIgMi41LjggMy43IDMuNiA1LjcgMzkuOCAxMy44IDcyLjQgOCAxOC4zLTMuMiAyNS4yLTYuOCAyNi43LTkuMi4zLS42LjMtMS40IDAtMi4xek01NCAxMjMuNHptNDUuOC4zbDIuNS0uNGEyNjcuMSAyNjcuMSAwIDAwLTIuNS40eiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjYzLjgiIGN5PSIxMzQuNyIgcj0iNi4xIiBmaWxsPSIjNDkwYjM3Ii8+PGNpcmNsZSBjeD0iNjEuMSIgY3k9IjEzNC41IiByPSI2LjEiLz48Y2lyY2xlIGN4PSIxMTEuMyIgY3k9IjEzMy4xIiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI2MS4xIiBjeT0iMTM0LjUiIHI9IjYuMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNNTYuNSAxMzJsNC4yLjRjLjcuMSAxLjIuNyAxLjIgMS40bC0uMSAxLjVjLS4xLjctLjcgMS4yLTEuNCAxLjJsLTQuMi0uNGMtLjctLjEtMS4yLS43LTEuMi0xLjRsLjEtMS41Yy4xLS43LjctMS4yIDEuNC0xLjJ6IiBmaWxsPSIjMDEwMTAxIi8+PGNpcmNsZSBjeD0iMTA4LjciIGN5PSIxMzMuNyIgcj0iNi4xIi8+PGNpcmNsZSBjeD0iMTA4LjciIGN5PSIxMzMuNyIgcj0iNi4xIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNCIvPjxwYXRoIGQ9Ik0xMDMuNSAxMzIuN2w0LjEtLjljLjctLjIgMS40LjMgMS41IDFsLjMgMS41Yy4yLjctLjMgMS40LTEgMS41bC00LjEuOWMtLjcuMi0xLjQtLjMtMS41LTFsLS4zLTEuNWMtLjItLjYuMy0xLjMgMS0xLjV6IiBmaWxsPSIjMDEwMTAxIi8+PGNpcmNsZSBjeD0iOTkuMyIgY3k9IjEzNS43IiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI5Ni42IiBjeT0iMTM2LjMiIHI9IjYuMSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9Ijk2LjYiIGN5PSIxMzYuMyIgcj0iMy40Ii8+PHBhdGggZD0iTTEyMC4zIDEyNS41Yy0xNC4zIDQuNS01OS42IDkuOC03Ny44LS45LTEuOC0xLTQuNC0yLjktNC40LTIuOXMzMi45IDEwLjggNzIuOSAxLjhjMTEuMy0yLjkgMTgtNS41IDE4LjQtOS4yIDMuMSAyLTIuNSA5LjEtOS4xIDExLjJ6IiBmaWxsPSIjNDkwYjM3Ii8+PHBhdGggZD0iTTI5LjIgMTEzLjZjLS4xIDEuMy4yIDIuNS44IDMuNyAzLjYgNS43IDM5LjggMTMuOCA3Mi40IDggMTguMy0zLjIgMjUuMi02LjggMjYuNy05LjIuNS0uOCAwLTIuNi0uMS0xLjktNiA0LjctMjMuNCAxMC00My4zIDEwLjctMjYuMSAxLTU0LjQtMy43LTU2LjUtMTEuM3oiIG9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBjeD0iNTEuNyIgY3k9IjEzMy43IiByPSI2LjEiIGZpbGw9IiM0OTBiMzciLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEzMy40IiByPSI2LjEiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEzMy40IiByPSIzLjQiLz48cGF0aCBkPSJNMzQuNSAxMDguNHMtOC4xIDEuMi00LjUgNi45YzMuNiA1LjcgMzkuOCAxMy44IDcyLjQgOCAxOC4zLTMuMiAyNS4yLTYuOCAyNi43LTkuMiAxLjItMS44LS44LTIuOC0zLjItMi4zIDAgMC0xNC42IDIuNi0zMCA0YTQyLjkgNDIuOSAwIDAxLTM1LjYtMS42Yy0xMi42LTMtMjIuNS03LjUtMjUuOC01Ljh6Ii8+PGVsbGlwc2UgY3g9Ijc5IiBjeT0iMTIxIiByeD0iMTgiIHJ5PSIyIiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMTUiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJib3R0b21fMTYiPjxnIGZpbGw9IiNhMzRiMWEiPjxwYXRoIGQ9Ik03OSAxMTkuMmwtLjQgMTEuMnMxLjEgMi42LTkuNyAyLjZINDYuMnMtNS40LTUuMi0yLjItNy44IDExLjktMy40IDExLjktMy40bC0yLjYtNi42IDI1LjcgNHpNODEuNiAxMTkuMkw4MCAxMzAuNHMtMSAyLjYgOS44IDIuNmgyMi43czUuNC01LjIgMi4yLTcuOC0xNC45LTMuNC0xNC45LTMuNGwuNi01LjYtMTguOCAzeiIvPjwvZz48cGF0aCBkPSJNNTkuOCAxMTguNGwtOC4zLS45Yy0uMyAwLS41LS4zLS40LS42bC4xLS41YzAtLjMuMy0uNS42LS40bDguMy45Yy4zIDAgLjUuMy40LjZsLS4xLjVjLS4xLjItLjMuNC0uNi40ek02MC42IDEyMC45bC04LjMtLjljLS4zIDAtLjUtLjMtLjQtLjZsLjEtLjVjMC0uMy4zLS41LjYtLjRsOC4zLjljLjMgMCAuNS4zLjQuNmwtLjEuNWMtLjEuMy0uNC41LS42LjR6TTk0LjkgMTE3LjNsOC4zLjVjLjMgMCAuNS4zLjUuNXYuNWMwIC4zLS4zLjUtLjUuNWwtOC4zLS41Yy0uMyAwLS41LS4zLS41LS41di0uNWMwLS4zLjMtLjYuNS0uNXpNOTMuOSAxMTkuNmw4LjMuNWMuMyAwIC41LjMuNS41di41YzAgLjMtLjMuNS0uNS41bC04LjMtLjVjLS4zIDAtLjUtLjMtLjUtLjV2LS41YzAtLjMuMi0uNS41LS41eiIvPjxnIGZpbGw9IiM0OTBiMzciPjxjaXJjbGUgY3g9IjY4LjUiIGN5PSIxMzUuOSIgcj0iMy45Ii8+PGNpcmNsZSBjeD0iNTIuNSIgY3k9IjEzNS45IiByPSIzLjkiLz48Y2lyY2xlIGN4PSI5MC4yIiBjeT0iMTM1LjkiIHI9IjMuOSIvPjxjaXJjbGUgY3g9IjEwNi4yIiBjeT0iMTM1LjkiIHI9IjMuOSIvPjwvZz48ZyBmaWxsPSIjZmZmIj48Y2lyY2xlIGN4PSI3MC4yIiBjeT0iMTM1LjciIHI9IjMuOSIvPjxjaXJjbGUgY3g9IjU0LjIiIGN5PSIxMzUuNyIgcj0iMy45Ii8+PGNpcmNsZSBjeD0iODguNSIgY3k9IjEzNS43IiByPSIzLjkiLz48Y2lyY2xlIGN4PSIxMDQuNSIgY3k9IjEzNS43IiByPSIzLjkiLz48L2c+PGNpcmNsZSBjeD0iNzAuMiIgY3k9IjEzNS43IiByPSIyLjIiLz48Y2lyY2xlIGN4PSI1NC4yIiBjeT0iMTM1LjciIHI9IjIuMiIvPjxjaXJjbGUgY3g9Ijg4LjUiIGN5PSIxMzUuNyIgcj0iMi4yIi8+PGNpcmNsZSBjeD0iMTA0LjUiIGN5PSIxMzUuNyIgcj0iMi4yIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE3Ij48cGF0aCBkPSJNNDUgMTM3aDc1czYgMCA3LTIuMiAxIDMuMy03IDQuNS02NyAwLTc1IDAtOS0yLjMgMC0yLjN6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTM0IDEzOC4zaDc1czYgMCA3LTIuMiAxIDMuMy03IDQuNS02NyAwLTc1IDBsLTIuMi0uMS0xLjUtMiAzLjctLjJ6IiBmaWxsPSIjOTE5MTkxIi8+PHBhdGggZD0iTTc5LjkgMTE3LjhsLTEwLjYgMTcuNlM2OC4yIDEzOCA3OSAxMzhoMjIuN3M1LjQtNS4yIDIuMi03LjgtMTEuOS0zLjQtMTEuOS0zLjRsOC42LTEzLjhzLTcuNiA1LjItMjAuNyA0Ljh6IiBmaWxsPSIjNDkyMzBmIi8+PHBhdGggZD0iTTYzLjYgMTE1LjJMNTIgMTM1LjRzLTEgMi42IDkuOCAyLjZoMjIuN3M1LjQtNS4yIDIuMi03LjgtMTEuOS0zLjQtMTEuOS0zLjRsNy42LTguNmMtLjEgMC03LjcuOC0xOC44LTN6IiBmaWxsPSIjYTM0YjFhIi8+PHBhdGggZD0iTTc0LjQgMTE5LjdsOC4xIDEuOWMuMy4xLjQuMy40LjZsLS4xLjVjLS4xLjMtLjMuNC0uNi40bC04LjEtMS45Yy0uMy0uMS0uNC0uMy0uNC0uNmwuMS0uNWMuMS0uMy40LS40LjYtLjR6TTcyLjkgMTIyLjhsOC4xIDEuOWMuMy4xLjQuMy40LjZsLS4xLjVjLS4xLjMtLjMuNC0uNi40bC04LjEtMS45Yy0uMy0uMS0uNC0uMy0uNC0uNmwuMS0uNWMwLS4zLjMtLjQuNi0uNHpNOTEuNCAxMTguN2w4LjEgMS45Yy4zLjEuNC4zLjQuNmwtLjEuNWMtLjEuMy0uMy40LS42LjRsLTguMS0xLjljLS4zLS4xLS40LS4zLS40LS42bC4xLS41Yy4xLS4zLjMtLjQuNi0uNHpNODkuOSAxMjEuOGw4LjEgMS45Yy4zLjEuNC4zLjQuNmwtLjEuNWMtLjEuMy0uMy40LS42LjRsLTguMS0xLjljLS4zLS4xLS40LS4zLS40LS42bC4xLS41YzAtLjMuMy0uNC42LS40eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8xOCI+PHBhdGggZD0iTTY0LjUgMTIyLjVzMi43IDUuNSA1LjUgNy41YzEuMi44IDIuMyAxLjggMy40IDIuN3Y0LjRjMCAuNC0xMC4yLTMtOC45LTE0LjZ6IiBmaWxsPSIjNmQ0NzE2Ii8+PHBhdGggZD0iTTYzLjggMTIyLjVzNS41LTEuNCA4LjkgMiAzLjQgOC4yIDEuNCA4LjItMi4xLjctMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNy45IDEwNi44czQuOC04LjIgMTkuMS0uN2MxNC4zIDcuNSAyLjcgMjMuMiAxNS43IDMwLjcgMCAwLTMuNyAzLjY1LTguMzYtNS45My00LjU5LTkuNDItNC41NC0yNC42Ny0yNi40NC0yNC4wN3oiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNNzIuNyAxMzYuOHMtNi4xIDIuNy0xMC4yLTEwLjktOC45LTIxLjgtMjAuNS0yMS4xYy0xLjYgMC0zLjIuNi00LjQgMS43LTUuNSA1LTEuMyAxOS42IDQuNCAyNC4yIDYuOCA1LjQgMjEuOCAxMC45IDI4IDguOXMyLjctMi44IDIuNy0yLjh6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTczLjcgMTE3LjJsLTEgNy40Yy0xLjktMS40LTMuNi0yLjMtNS0yLjNsLjctNi4yYzEuNy41IDMuNC44IDUuMyAxLjF6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJNMzkuMyAxMDkuNmgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVIMzkuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjV6TTM4LjIgMTEyLjdINTNjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUgzOC4yYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4yLjMtLjUuNS0uNXpNMzguMiAxMTUuOWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVIMzguMmMtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4zLS41LjUtLjV6TTM5LjMgMTE5aDE3LjljLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUgzOS4zYy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4yLjItLjUuNS0uNXpNNDAuMyAxMjIuMmgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVINDAuM2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4zLS41LjUtLjV6TTQyLjQgMTI1LjNoMTcuOWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41SDQyLjRjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41ek00NC41IDEyOC41aDE1LjhjLjMgMCAuNS4yLjUuNXYuMWMwIC4zLS4yLjUtLjUuNUg0NC41Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNXpNNDguNyAxMzEuNmgxMy43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjVINDguN2MtLjMgMC0uNS0uMi0uNS0uNXYtLjFjMC0uMy4yLS41LjUtLjV6TTU0IDEzNC44aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41SDU0Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNXoiLz48Y2lyY2xlIGN4PSIxMDIuOCIgY3k9IjEyMy45IiByPSIxNS41IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExOC4zIDEyMy45YzAgOC41LTYuOSAxNS41LTE1LjUgMTUuNS01IC4xLTkuOC0yLjQtMTIuNi02LjUgMjMuMyA1LjYgMjMuMy0xOC43IDE5LjEtMjMgNS41IDIuMyA5LjEgNy45IDkgMTR6IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBkPSJNMTExLjIgMTIybC0xLjkgNi42Yy0uMS40LS40LjYtLjguNmwtNi44LjJjLS40IDAtLjctLjItLjgtLjZsLTIuMy02LjRjLS4xLS40IDAtLjguMy0xbDUuNC00LjJjLjMtLjIuNy0uMiAxIDBsNS42IDMuOWMuMi4yLjQuNS4zLjl6TTEwOC44IDEwOS42bC00LjIgMy4yYy0uMy4yLS43LjItMSAwbC01LjUtMy44YzMuNS0xLjEgNy4zLS45IDEwLjcuNnpNOTkuMiAxMzQuMWwxLjggNS4xYy0yLjIuMS05LTIuOC0xMC01LjIgMC0uMi4zLS4yLjYtLjJsNi45LS4yYy4zIDAgLjYuMi43LjV6TTkwLjkgMTEzLjlsMS45IDUuNGMuMS4zIDAgLjctLjMuOWwtNS4zIDQuMWMtLjEtMy44IDEuMi03LjUgMy43LTEwLjR6TTExMC44IDEzNy4ybDEuNC00LjdjLjEtLjMuNC0uNi44LS42bDMuMi0uMWMtMS40IDIuMi0zLjIgNC01LjQgNS40ek0xMTggMTIwLjdsLTEuNy0xLjFjLS4zLS4yLS40LS42LS4zLS45bC42LTEuOWMuNyAxLjIgMS4yIDIuNSAxLjQgMy45ek0xMDAuOCAxMjkuNDVhLjI1LjI1IDAgMDAtLjIzLjE2bC0xLjQgMy40YS4yNS4yNSAwIDEwLjQ2LjE5bDEuNC0zLjRhLjI1LjI1IDAgMDAtLjI0LS4zNXpNOTMuNTcgMTE5Ljg1YS4yNS4yNSAwIDAwLS4wNi40OGwzLjQgMS4zYS4yNS4yNSAwIDEwLjE4LS40NmwtMy40LTEuM2EuMjUuMjUgMCAwMC0uMTItLjAyek0xMTUuMyAxMTguNjVhLjI1LjI1IDAgMDAtLjExLjAzbC0zLjMgMS43YS4yNS4yNSAwIDEwLjIzLjQ0bDMuMy0xLjdhLjI1LjI1IDAgMDAtLjEyLS40N3oiLz48cGF0aCBkPSJNMTAzLjkgMTEyLjg1YS4yNS4yNSAwIDAwLS4yNS4yNmwuMiAzLjdhLjI1LjI1IDAgMTAuNS0uMDJsLS4yLTMuN2EuMjUuMjUgMCAwMC0uMjQtLjI0ek0xMDkuNSAxMjguODVhLjI1LjI1IDAgMDAtLjE4LjQzbDIuNiAyLjZhLjI1LjI1IDAgMTAuMzYtLjM2bC0yLjYtMi42YS4yNS4yNSAwIDAwLS4xOC0uMDd6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iYm90dG9tXzE5Ij48cGF0aCBkPSJNMzkgMTEwbDkgMjNzNDgtMSA0Ny0yYy0uNi0uNi0yLjgtNy4zLTQuNi0xMy0yMi40IDUtMzYuMy04LTM2LjMtOEgzOXoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTk1IDEzMWwyNiA5LTI2IDIuNC0xNyAxLjYtMzAtMTEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTk1IDEzMC45VjE0MmwyNi0yeiIgb3BhY2l0eT0iLjUiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTYzLjUgMTMxLjljLS44LTIuOCAzMS45LTEyLjUgMzIuNy04LjMuNCAyLjQtMzQuNCA1LTM0LjggMi42czcuMS01LjIgMTYuNy02LjJsMi4xLS4yIi8+PHBhdGggZD0iTTYzLjUgMTM3LjljLS44LTIuMSAzMi4xLTEwLjcgMzIuOC03LjQuMyAxLjktNy4yIDMuNC0xNi44IDQuNXMtMTcuNi40LTE3LjktMS40Yy0uMS0uNi41LTEuMiAxLjctMS44Ii8+PC9nPjxwYXRoIGQ9Ik00OCAxMzN2MTguMmMuOC41IDMuMS42IDUuMi44SDc4di04bC0zMC0xMXoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZD0iTTEyMSAxNDB2Ny4yYTI2IDI2IDAgMDEtMTUgNC44SDc4di04bDQzLTR6Ii8+PHBhdGggZD0iTTEyMSAxNDB2Ny4yYTI2IDI2IDAgMDEtMTUgNC44SDc4di04bDQzLTR6IiBvcGFjaXR5PSIuMSIgZmlsbD0iI2ZmZiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8yMCI+PHBhdGggZD0iTTQ2LjQgMTAxLjFzLTEuMyAxLjktMS4xIDUuOWMuNyA5LjctMi4xIDE5LjUgMy41IDI2LjQgNS42IDcgMTYuNyAxMS44IDIyLjkgOC40czUuNi0xNS4zLTEuNC0yMC4yYTIxLjggMjEuOCAwIDAxLTQuNC00LjcgNDAgNDAgMCAwMS0xOS41LTE1Ljh6IiBmaWxsPSIjOTk2NzFkIi8+PHBhdGggZD0iTTQ2LjQgMTAxLjFzLTEuMyAxLjktMS4xIDUuOWMuNyA5LjctMi4xIDE5LjUgMy41IDI2LjQgMTIuMiAxMi45IDIyLjkgOC40IDIyLjkgOC40LTEwLjEgMS4xLTIxLjYtMzUuOC0yMS42LTM1LjhhMzAgMzAgMCAwMS0zLjctNC45eiIgZmlsbD0iIzZkNDcxNiIvPjxwYXRoIGQ9Ik01NC44IDExNS40Yy00IDAtNy4zLTMuMy03LjMtNy4zLjEtMS4zLjUtMi43IDEuMS0zLjguMS0uMiA3LjEgOC4xIDEwLjggOS41IDAtLjEtMS4zIDEuMi00LjYgMS42eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01OC44IDExMy4zYy0uOC4zLTEuNy41LTIuNi42YTYgNiAwIDAxLTUuOS02LjNsLjItMS44YTI0IDI0IDAgMDA4LjMgNy41eiIgb3BhY2l0eT0iLjIiLz48cGF0aCBkPSJNOTQgMTI0LjVzLTIuOCA1LjUtNS41IDcuNWMtMS4yLjgtMi4zIDEuOC0zLjQgMi43djQuNGMwIC40IDEwLjItMyA4LjktMTQuNnoiIGZpbGw9IiM2ZDQ3MTYiLz48cGF0aCBkPSJNOTQuNiAxMjQuNXMtNS40LTEuNC04LjkgMmMtMy40IDMuNC0zLjQgOC4yLTEuNCA4LjJzMi4yLjcgMTAuMy0xMC4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMjAuNSAxMDguOHMtNC44LTguMi0xOS4xLS43Yy0xNC4zIDcuNS0yLjcgMjMuMi0xNS43IDMwLjcgMCAwIDMuNyAzLjYgOC40LTUuOSA0LjYtOS4zIDQuNi0yNC43IDI2LjQtMjQuMXoiIGZpbGw9IiM5OTY3MWQiLz48cGF0aCBkPSJNODUuOCAxMzguOHM2LjEgMi43IDEwLjItMTAuOSA4LjktMjEuOCAyMC40LTIxLjFjMS42IDAgMy4yLjYgNC40IDEuNyA1LjYgNSAxLjMgMTkuNi00LjQgMjQuMi02LjggNS40LTIxLjggMTAuOS0yNy45IDguOXMtMi43LTIuOC0yLjctMi44eiIgZmlsbD0iIzQ0NCIvPjxwYXRoIGQ9Ik04NC44IDExOS4ybDEgNy40YzEuOS0xLjQgMy42LTIuMyA1LTIuM2wtLjYtNi4yYy0xLjguNS0zLjYuOC01LjQgMS4xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0iTTExOS4yIDExMi42aC0xMS42Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxMS42Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTEyMC4zIDExNS44aC0xNC43Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNC43Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTEyMC4zIDExOC45aC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMy41LS41LjV6TTExOS4yIDEyMi4xaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMi41LS41LjV6TTExOC4xIDEyNS4yaC0xNy45Yy0uMyAwLS41LS4yLS41LS41di0uMWMwLS4zLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjV2LjFjMCAuMy0uMi41LS41LjV6TTExNi4xIDEyOC40SDk4LjJjLS4zIDAtLjUtLjItLjUtLjVzLjItLjUuNS0uNWgxNy45Yy4zIDAgLjUuMi41LjUgMCAuMi0uMy41LS41LjV6TTExNCAxMzEuNUg5OC4yYy0uMyAwLS41LS4yLS41LS41cy4yLS41LjUtLjVIMTE0Yy4zIDAgLjUuMi41LjV2LjFjMCAuMi0uMy40LS41LjR6TTEwOS44IDEzNC43SDk2LjFjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDEzLjdjLjMgMCAuNS4yLjUuNXYuMWMwIC4yLS4zLjUtLjUuNXpNMTA0LjUgMTM3LjhIOTVjLS4zIDAtLjUtLjItLjUtLjV2LS4xYzAtLjMuMi0uNS41LS41aDkuNWMuMyAwIC41LjIuNS41di4xYzAgLjMtLjIuNS0uNS41eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImJvdHRvbV8yMSI+PGVsbGlwc2UgY3g9IjM2LjkiIGN5PSIxMjYuNyIgcng9IjE1LjQiIHJ5PSIyNS42IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTAuMSkiLz48cGF0aCBkPSJNNTkgMTE4Yy4zIDEuNy0xLjUgMy42LTEuNSAzLjZzLTIuNC0xLTIuOC0zIDEuNi0zLjYgMS42LTMuNiAyLjQgMSAyLjcgM3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEyMC43IDEyMC44Yy0yLjYgMTMuNS0xMS4yIDIzLjEtMTkuMiAyMS42LTcuNi0xLjQtMTItMTIuMi0xMC40LTI0LjZDOTQgMTE2IDEwNyAxMTMgMTE1LjYgOTYuM2M0LjggNC41IDcgMTQuMSA1IDI0LjV6Ii8+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjQiPjxwYXRoIGQ9Ik00OS4yIDEyMC4zYy44IDQuMiA0LjcgMTYuNCAxMCAxOC41LTUuMiAxLTExLjEtNy4xLTEzLTE4cy43LTIwLjYgNi0yMS42Yy00LjYgMi4zLTMuOCAxNi45LTMgMjF6TTk3IDExNi43Yy0uNyA0LTEuNCAxNi40IDIuNyAyMC4yLTUtMS03LjUtOS44LTUuOC0xOS45bDMuNC0xLjYtLjMgMS4zeiIvPjwvZz48ZyBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMiI+PHBhdGggZD0iTTU1LjYgOTIuOWEyNS42IDE1LjQgNzkuOSAwMC0xLjUuMSAyNS42IDE1LjQgNzkuOSAwMC0xMC43IDI4IDI1LjYgMTUuNCA3OS45IDAwMTkuNyAyMi41IDI1LjYgMTUuNCA3OS45IDAwMTAuNi0yOCAyNS42IDE1LjQgNzkuOSAwMC0xOC0yMi42em0tMi41IDYuM2M1IDAgMTAuNCA3LjggMTIuMiAxOC4xIDIgMTEtLjcgMjAuNi02IDIxLjVhNC45IDQuOSAwIDAxLS45IDBjLTUgMC0xMC40LTcuNy0xMi4yLTE4LTItMTEgLjctMjAuNiA2LTIxLjZhNC44IDQuOCAwIDAxLjkgMHpNMTE1LjYgOTYuM0MxMDcgMTEzIDk0IDExNiA5MSAxMTcuOGMtMS42IDEyLjQgMi44IDIzLjIgMTAuNCAyNC42IDggMS41IDE2LjYtOC4xIDE5LjItMjEuNiAyLTEwLjQtLjMtMjAtNS4xLTI0LjV6bS00IDdjMS43IDQgMi4xIDkuOCAxIDE2LjItMiAxMC03LjIgMTcuNC0xMiAxNy40YTQuMyA0LjMgMCAwMS0xIDBjLTQuOS0xLTcuNC05LjgtNS44LTE5LjkuMS0uMyAxMS4yLTQgMTcuOC0xMy42eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzAxIj48cGF0aCBkPSJNOTQgODVzNC44LTIgOC4yIDBjLjguNC43IDEuMSAwIDIgMCAwLTMuNCA0LTQuMSA0cy00LjgtNC00LjgtNGMtLjYtMS0uMy0xLjcuNy0yeiIvPjxwYXRoIGQ9Ik05OS4zIDg0LjFjMSAuMiAyIC40IDMgLjkuOC40LjcgMS4xIDAgMmEyMi4xIDIyLjEgMCAwMS00LjEgNGMxLjktMy4yIDIuNi02LjMgMS4xLTYuOXoiIGZpbGw9IiMzYTNhM2EiIG9wYWNpdHk9Ii4yIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05NiAxMDBjMS42LjIgMi01LjggMi05TTg4IDk1LjVzNy41IDExIDE4IDAiLz48L2c+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik03OSA4MnMwLTEyIDYtMTIgNiAxMS42IDYgMTEuNlM4NiA3MCA3OSA4MnpNMTAyIDgyczAtMTIgNi0xMiA2IDExLjYgNiAxMS42LTUtMTEuNi0xMiAuNHoiLz48L2c+PHBhdGggZD0iTTk2IDg2czQtMSA2IDBoLTZ6IiBvcGFjaXR5PSIuMyIgZmlsbD0iI2ZmZiIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii41Ij48cGF0aCBkPSJNOTMgOTBjLTkuOS0zLjgtMjAuNC02LjItMzEtN005Mi42IDkxLjNjLTEyLTIuOC0yNy43LTEuMi0yNy43LTEuMk05Mi41IDkzLjJjLTEyLjMtMS0yNy42IDUtMjcuNiA1TTEwMSA5MGE4NC4xIDg0LjEgMCAwMTI3LTdNMTAxLjMgOTEuM2MxMC41LTIuOCAyNC4xLTEuMiAyNC4xLTEuMk0xMDEuNCA5My4yYzEwLjctMSAyNCA1IDI0IDUiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wMiI+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik03NyA3NXMwLTEyIDYtMTIgNiAxMS42IDYgMTEuNlM4NCA2MyA3NyA3NXpNMTAxIDc0LjVzMC0xMSA1LjUtMTEgNS41IDEwLjYgNS41IDEwLjYtNC42LTEwLjYtMTEgLjR6TTEwNi43IDEwMGExNSAxNSAwIDAxLTExLjEgNUg5NWExNSAxNSAwIDAxLTExLjEtNWMtMy0zLjItNS04LjUtNS0xMXM0LjYgMS41IDE2IDEuNWguNmM3LjggMCAxMi43LTIuNSAxMy42LTNzMi40LS42IDIuNCAxLjYtMS45IDcuNy00LjkgMTF6Ii8+PC9nPjxjaXJjbGUgY3g9Ijk5IiBjeT0iNzkuOCIgcj0iOSIvPjxwYXRoIGQ9Ik0xMDggODAuOGE5IDkgMCAwMS0xNiA0LjZjMi4zLjggOCAxLjYgMTEuNi0yIDIuNy0yLjUgMi44LTcuMiAyLjEtOS42YTkgOSAwIDAxMi4yIDd6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuMiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDMiPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik03Mi40IDcwLjVzLTUgMi4zLTQuNSA1LjQgNC41IDIuMyA0LjUtLjQgMS40LTQuNSAwLTV6TTExMSA2Ni44czMuMi0uOSA0LjMuNy0xLjIgMi45LTIuMyAxLjYtMi41LTEuNi0yLTIuM3pNNzAuNSA2Ny4ycy0zLjQtLjEtNCAxLjggMS45IDIuNSAyLjYgMSAyLTIuMiAxLjQtMi44eiIvPjwvZz48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTEwOS45IDEwMS4xSDc1LjVzMS43LTE5LjQgMTguNi0xOS40YzQuNC0uMiA4LjggMS42IDExLjggNC44IDUuMyA1LjcgNCAxNC42IDQgMTQuNnoiLz48Y2lyY2xlIGN4PSI3OC44IiBjeT0iNjcuNyIgcj0iNC44Ii8+PGNpcmNsZSBjeD0iMTA2LjEiIGN5PSI2Ny43IiByPSI0LjQiLz48L2c+PHBhdGggZD0iTTEwNS4zIDU4LjVjMi45LS4zIDUuOCA0LjYgOC42IDYuOSAwIDAtMy43LTcuNS00LjQtOC42cy00LjIgMS43LTQuMiAxLjd6TTgwLjcgNTkuMmMtMi42LTEuMi03IDIuMy0xMC40IDMuNiAwIDAgNi01LjggNy4xLTYuNnMzLjMgMyAzLjMgM3oiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA0Ij48ZWxsaXBzZSBjeD0iMTA4LjgiIGN5PSI3MS42IiByeD0iMy43IiByeT0iNC4zIiBmaWxsPSIjNDIyMTBiIi8+PHBhdGggZD0iTTc2LjEgODcuM3MyLjggMTMuNCAxOC40IDEyLjdjMTYtLjggMTYuNS0xMy42IDE2LjUtMTMuNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyMTBiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik03NS42IDY4LjJhOS4zIDkuMyAwIDAxOC43IDYuMmMtMy4yLTIuMS00LjItMi44LTktLjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQyMjEwYiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMDUiPjxwYXRoIGQ9Ik04My41IDU3LjdhMSAxIDAgMDAtLjkgMS4zczQgMTEuOCA0LjMgMjIuM2ExIDEgMCAxMDIgMGMtLjMtMTEtNC40LTIzLTQuNC0yM2ExIDEgMCAwMC0xLS42em0tLjMgMi41Yy0xLjYuMi0yLjcuNy0zLjMgMS43LS43IDEtLjUgMiAwIDMgLjkgMiAzIDMuOSA1LjggNS4yIDIuNCAxLjIgNC4yIDMgNC43IDQgLjMuNi4yIDEgMCAxLjMtLjIuNC0uOC44LTIgMS4xLTIuNC41LTMuOCAwLTQuNi0uOS0uOS0uOC0xLjEtMi0uNy0zLjFhMSAxIDAgMTAtMi0uNyA1LjEgNS4xIDAgMDAxLjIgNS4yYzEuNCAxLjQgMy43IDIuMSA2LjUgMS41IDEuNi0uNCAyLjctMSAzLjMtMiAuNi0xIC42LTIuMS4xLTMuMS0uOC0yLTMtMy43LTUuNi01LTIuNC0xLjMtNC40LTMtNS00LjMtLjItLjYtLjItLjkgMC0xLjEgMC0uMy42LS42IDEuOC0uOCAyLjYtLjIgMy44LjYgNC41IDEuMi42LjcuNyAxLjMuNyAxLjNhMSAxIDAgMTAyLS4zcy0uMi0xLjMtMS4zLTIuNGMtMS0xLTMtMi02LjEtMS44ek0xMDIuMiA1Ny45YTEgMSAwIDAwLTEgMS40czUgMTAuNiA2LjIgMjAuM2ExIDEgMCAxMDItLjIgODAuNyA4MC43IDAgMDAtNi4zLTIxIDEgMSAwIDAwLS45LS41em0tLjEgMi41Yy0xLjUuNC0yLjUgMS0zIDEuOS0uNSAxLS4zIDIgLjMgMyAxIDEuNyAzLjMgMy4yIDYgNC4yIDIuMy45IDQuMiAyLjMgNC43IDMuMy4zLjUuMy44LjEgMS4xLS4xLjMtLjYuOC0xLjcgMS4yLTIuMS43LTMuNS4zLTQuMy0uNGEyLjkgMi45IDAgMDEtMS0yLjggMSAxIDAgMTAtMi0uNGMtLjMgMS43LjMgMy42IDEuNyA0LjggMS40IDEuMiAzLjYgMS42IDYuMi43IDEuNC0uNSAyLjQtMS4yIDMtMi4yLjQtMSAuMy0yLS4yLTMtMS0xLjgtMy4yLTMuMi01LjktNC4yLTIuMy0uOS00LjMtMi4zLTUtMy40LS4yLS41LS4yLS44LS4xLTEgMC0uMi41LS42IDEuNi0uOCAyLjQtLjQgMy42LjEgNC4yLjYuNy42LjggMS4xLjggMS4xYTEgMSAwIDEwMi0uNXMtLjQtMS4yLTEuNS0yLjFjLTEuMS0xLTMtMS42LTYtMS4xeiIvPjxwYXRoIGQ9Ik0xMDYuNyA5OWExNSAxNSAwIDAxLTExLjEgNUg5NWExNSAxNSAwIDAxLTExLTVjLTMtMy4yLTUtOC41LTUtMTFzNC42IDEuNSAxNiAxLjVoLjZjNy44IDAgMTIuNy0yLjUgMTMuNi0zczIuNC0uNiAyLjQgMS42LTEuOSA3LjctNC45IDExeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNOTIgOTAuM2MtLjQuMS0uNyAxMC41IDAgMTQuNXM5LjIgNy42IDExLjctNGMxLjQtNC40LjctMTEuOS43LTExLjlzLTYuOCAyLjItMTIuMyAxLjN6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTk4LjcgOTIuNnMuNyA3LjEtLjIgMTEuNC43IDQuMiAyLjQgMiAzLjgtNi4yIDMuNS0xMy43di0zLjRsLTUuOSAxLjZ6IiBmaWxsPSIjZTg0NzE1Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wNiI+PGcgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiPjxwYXRoIGQ9Ik03NyA3NnMwLTEyIDYtMTIgNiAxMS41OSA2IDExLjU5Uzg0IDY0IDc3IDc2ek0xMDEgNzUuNXMwLTExIDUuNS0xMSA1LjUgMTAuNjIgNS41IDEwLjYyLTQuNTgtMTAuNjItMTEgLjM4ek05NS4zMyA5NS4wOXEtLjc3IDAtMS41LS4wNmMtLjg4LS4wNi0xLjI4IDUuMzYtMi41NSA1LjY3cy0xLjcyLTYuMzgtMi41NC02LjYzYy0yLjM3LS43Mi02LjQ4LTEuNzYtOC4yNi0yLjkxLTQtMi41OS00LjQyLTUuNzQtNC40Mi03IDAtMi4zOCA3LjQ2IDUuNDIgMTkgNS40MmguNDZjNy44OSAwIDEyLjc4LTIuNTMgMTMuNjUtM3MyLjM5LS42NSAyLjM5IDEuNmMwIDEuMDktMS44NSAyLjc3LTQuNjkgNC4yMS0uNzMuMzctLjg2IDguNDMtMi4zOCA4LjA1cy0xLjczLTYuMzktMi42NS02LjE0YTI0LjIgMjQuMiAwIDAxLTYuNTEuNzl6Ii8+PC9nPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik04Ny45MyA4OC41NGwyLjU3IDExLjM4cy40NiAxLjkyIDEuNDggMCAyLjUtMTAuNCAyLjUtMTAuNGEyNi42NiAyNi42NiAwIDAxLTYuNTUtLjk4ek0xMDAuODQgODkuMTNsMi44MSAxMC4yMXMxLjIyIDIuMzQgMS43OCAwIDEuNzctMTEuODkgMS43Ny0xMS44OS0xLjUxLjgyLTYuMzYgMS42OHoiLz48L2c+PGcgb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNOTEgOTEuNTFzMS4xOS0uNTEgMCA4LjQxYzAgMCAwIDEuMDggMSAwIC44LTEuOTIgMi40OC0xMC40IDIuNDgtMTAuNGExOS4yMSAxOS4yMSAwIDAxLTQuMzYtLjQ1ek0xMDMuNDUgOTAuOHMxLjA3LS43MiAxLjUgOC4yN2EuODcuODcgMCAwMC4yMy40M2MuMTYuMTQgMS42OS0xMS42MyAxLjY5LTExLjYzYTQ4LjE2IDQ4LjE2IDAgMDEtNC43MiAxLjY4eiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA3Ij48ZyBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiI+PHBhdGggZD0iTTc2IDc3czAtMTIgNi0xMiA2IDExLjYgNiAxMS42UzgzIDY1IDc2IDc3ek0xMDAgNzYuNXMwLTExIDUuNS0xMSA1LjUgMTAuNiA1LjUgMTAuNi00LjYtMTAuNi0xMSAuNHoiLz48L2c+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik03NSA5MS4xYy0uMi0xLjUuNC0yLjkgMS40LTMuOSAwIDAgMTAuOCAwIDEzLTQuNnM0LjMtMTAuMSA3LjktNy44YzUuNyAzLjMgNSA3LjggOC42IDEwLjFzNy4yIDUuNyAxMi4yIDUuNyA1LjguNSA1LjggMi4xLTIuMiA0LjctNi41IDMuMS0xMC40LTQuMy0xOS44LS40LTUgNC43LTEwLjggMi4zYy00LjEtMS44LTgtNC0xMS44LTYuNnoiLz48cGF0aCBkPSJNNzcuOCA5Mi42bC0uNiAyLjkgMi4yIDMuNnM2LjUgMCA4LjcgMi4yIDEzLjcgNSAyMC45IDIuOSA2LjctOC42IDYuNy04LjYtMTIuNyA1LjQtMjIuMSAyLjFhOSA5IDAgMDEtMy4xIDEuNWMtMi4yLS43LTQuNC0xLjUtNi42LTIuNS0yLjMtMS00LjMtMi40LTYuMS00LjF6Ii8+PHBhdGggZD0iTTExNi4zIDk0LjVzLTUuOC0yLjItMTAuMS0xLjRjLTMuNC41LTYuNyAxLjMtOS45IDIuNiA0LjIgMS43IDEzLjYtMS4yIDIwLTEuMnoiLz48L2c+PHBhdGggZD0iTTExNi4zIDk0LjVzLTUuOC0yLjItMTAuMS0xLjQtOSAxLjgtMTEuMyAzLjRjMCAwIDIuNCAxLjcgNy4yIDEuM3MxMi4xLTEuOCAxNC4yLTMuM3oiIGZpbGw9IiNlYjUyNzMiLz48cGF0aCBkPSJNNzYgOTAuOWwxLjQtMy42czEwLjggMCAxMy00LjMgNC4zLTkuNCA3LjktNy4yIDUgNy4yIDguNiA5LjQgNy4yIDQuMyAxMi4yIDQuMyA1LjcgMS40IDUuNyAyLjktMi4yIDQuMy02LjUgMi45LTEwLjQtNC0xOS44LS40LTUgNC4zLTEwLjggMi4yYy00LTEuNy03LjktMy44LTExLjctNi4yeiIgZmlsbD0iI2ZiZGIzMSIvPjxwYXRoIGQ9Ik03NiA5MC45bDEuNC0zLjZhNTAgNTAgMCAwMDE1LjEgNy4yYzQuMy01IDIxLjYtNSAzMi40LTIuMi4xIDEuNC0yLjIgNC4zLTYuNSAyLjlzLTEwLjQtNC0xOS44LS40LTUgNC4zLTEwLjggMi4yYy00LjEtMS42LTgtMy43LTExLjgtNi4xeiIgb3BhY2l0eT0iLjA1Ii8+PHBhdGggZD0iTTkxLjggODNsLS43IDIuMiA1LjEgNC4zYy40LjQgMSAuNCAxLjQgMCAuNy0uNy0yLjItMy42LTIuMi0zLjZMOTMuMyA4M2MtLjQtLjQtMS0uNC0xLjUgMCAuMSAwIC4xIDAgMCAweiIvPjxwYXRoIGQ9Ik03OC44IDkyLjZsLS42IDEuOSAyLjIgMy42czYuNSAwIDguNyAyLjIgMTMuNyA1IDIwLjkgMi45IDYuNy04LjYgNi43LTguNi0xMi43IDUuNC0yMi4xIDIuMWE5IDkgMCAwMS0zLjEgMS41Yy0yLjItLjctNC40LTEuNS02LjYtMi41LTMuNS0xLjUtNi4xLTMuMS02LjEtMy4xeiIgZmlsbD0iI2ZiZGIzMSIvPjxwYXRoIGQ9Ik03OC44IDkyLjZsLS42IDEuOSAyLjIgMy42czYuNSAwIDguNyAyLjIgMTMuNyA1IDIwLjkgMi45IDYuNy04LjYgNi43LTguNi0xMi43IDUuNC0yMi4xIDIuMWE5IDkgMCAwMS0zLjEgMS41Yy0yLjItLjctNC40LTEuNS02LjYtMi41LTMuNS0xLjUtNi4xLTMuMS02LjEtMy4xeiIgb3BhY2l0eT0iLjIiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzA4Ij48cGF0aCBkPSJNMTExLjQgNjguM2MuNiAyLjctLjYgNS4zLTIuNSA1LjdzLTQtMS41LTQuNi00LjIuNi01LjMgMi41LTUuN2MuNy0uMSA3LjkuMyA3LjkuM3MtMy42IDIuNS0zLjMgMy45ek04MC43IDY2LjljLS42IDMuMS43IDUuOSAyLjggNi4zczQuNC0xLjcgNS4xLTQuNy0uNi01LjktMi44LTYuM2MtLjYtLjEtMTAuMS0uMS0xMC42LjEtLjkuMyA2LjggMy43IDUuNSA0LjZ6Ii8+PHBhdGggZD0iTTExMS45IDgxLjZjLTcuNyAxMC4zLTIxLjIgOS42LTMzLjQgMCAwIDAgMS43IDE1LjQgMTggMTUuNCA1LjMgMCA4LjktMS42IDExLjQtMy44IDUuMi00LjYgNC0xMS42IDQtMTEuNnoiIG9wYWNpdHk9Ii42IiBmaWxsPSIjMDEwMTAxIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8wOSI+PHBhdGggZD0iTTg1LjIgOTRoMjEuMnMtLjYgMTEtMTAuOCAxMWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMy0zLjMtOC4zLTMuMy04LjN6IiBmaWxsPSIjNjAzODEzIi8+PHBhdGggZD0iTTEwMy41IDEwMS4zYTEwIDEwIDAgMDEtNy45IDMuNWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMyAxNy43LTQgMTUtLjh6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTgyLjIgODIuNHMtMTAtNC45LTguNS0xMS40IDEwLjEtLjcgOS41LS45IDYuMi01LjQgOC41LjhjMS43IDYuMS03LjkgMTIuNS05LjUgMTEuNXpNMTA3IDgyLjRzLTguNS00LjktNy4yLTExLjRjMS4yLTYuNSA4LjYtLjcgOC0uOS0uNC0uMiA1LjQtNS40IDcuMy44IDEuNSA2LjEtNi43IDEyLjUtOCAxMS41eiIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNODIuMiA4Mi40cy0xMC00LjktOC41LTExLjQgMTAtLjYgOS41LS45Yy03LjItNC03LjUgOC42LTEgMTIuM3pNMTA3IDgyLjRzLTguNi00LjktNy4zLTExLjRjMS4zLTYuNSA4LjUtLjYgOC0uOS02LTQtNi4zIDguNi0uOCAxMi4zeiIvPjwvZz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzEwIj48cGF0aCBkPSJNOTcuNiA4Mi40YzQuOC4yIDguNSA0LjMgOC4zIDkuMWwtLjEgMy4zYTguNyA4LjcgMCAwMS05LjEgOC4zSDk2YTggOCAwIDAxLTcuNi04LjRsLjItNGE4LjYgOC42IDAgMDE5LTguM3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ii8+PHBhdGggZD0iTTkyLjYgNjNhMSAxIDAgMDAtLjkuNUw4Mi4xIDgwYTEgMSAwIDEwMS43IDFsOS43LTE2LjZhMSAxIDAgMDAtLjktMS41em0tMTEgLjRhMSAxIDAgMDAtLjggMS42bDExLjQgMTUuOGExIDEgMCAxMDEuNi0xLjJMODIuNCA2My44YTEgMSAwIDAwLS44LS40ek0xMTIuMiA2My43YTEgMSAwIDAwLS44LjRsLTEwIDE1LjRhMSAxIDAgMTAxLjYgMWwxMC0xNS4zYTEgMSAwIDAwLS44LTEuNXptLTkuNS0uOWExIDEgMCAwMC0xIDEuNGw4LjMgMTdhMSAxIDAgMTAxLjgtLjhsLTguMi0xN2ExIDEgMCAwMC0uOS0uNnoiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzExIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNzcuMiA3MC45YzEtNS42IDkuMS01LjYgOS44LS4yTTEwMy41IDcwLjdjLjktNS4yIDguNS01LjIgOS4xLS4yIi8+PC9nPjxwYXRoIGQ9Ik04NS4yIDkxaDIxLjJzLS42IDExLTEwLjggMTFjLTIuNi4xLTUuMi0uOS03LjEtMi43LTMuMi0zLjMtMy4zLTguMy0zLjMtOC4zeiIgZmlsbD0iIzYwMzgxMyIvPjxwYXRoIGQ9Ik0xMDMuNSA5OC4zYTEwIDEwIDAgMDEtNy45IDMuNWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMyAxNy43LTQgMTUtLjh6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTk4IDg0LjljMS4xLTYuNi0zLjMtMTIuMS0xMy4yLTkuOS03LjggMi00LjQgOS45LTguOCAxMy4ycy0xMSAzLjMtMTEgMy4zIDI3LjUgOS45IDMzLTYuNnoiIGZpbGw9IiM0ZDMxMTgiLz48cGF0aCBkPSJNOTcuMiA4NC43Yy0xLTYuNCAzLTExLjggMTItOS43IDYuOCAxIDQgOS43IDggMTIuOXMxMCAzLjIgMTAgMy4yLTI1IDkuNy0zMC02LjR6IiBmaWxsPSIjNGQzMTE4Ii8+PGcgb3BhY2l0eT0iLjE1Ij48cGF0aCBkPSJNOTggODQuN2MxLTYuNC0zLTExLjgtMTItOS43IDEzLjIgNCAyLjIgMjEtMTggMTYuMSAwIDAgMjUgOS43IDMwLTYuNHpNMTAyLjggNzUuMVMxMDggNzUgMTA5IDc4czAgNiAxIDggNy44IDcuOCAxNi40IDUuNGMwIDAtOS4zIDEuMi0xMS4zLTcuMXMtMy41LTEwLjItMTIuMy05LjJ6Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTIiPjxwYXRoIGQ9Ik0xMDQuNyAxMDEuMWMtMi44IDMuMi02LjkgNS0xMS4xIDVoLS40Yy00LjMgMC04LjMtMS44LTExLjEtNS0zLTMuMy00LjktOC42LTQuOS0xMSAwLTIuMSAzLjUuNiAxMi4zIDEuM2wzLjcuMWguNWM3LjkgMCAxMi44LTIuNSAxMy43LTMgLjktLjUgMi40LS43IDIuNCAxLjZzLTIuMSA3LjctNS4xIDExeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMy4xIDgyLjggNzUuOCkiIGN4PSI4Mi44IiBjeT0iNzUuOCIgcng9IjYuMiIgcnk9IjguNiIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0zLjEgMTA1LjggNzUuOSkiIGN4PSIxMDUuOCIgY3k9Ijc1LjkiIHJ4PSI2LjIiIHJ5PSI4LjYiIGZpbGw9IiNmZmYiLz48ZWxsaXBzZSBjeD0iODIuOSIgY3k9Ijc2LjMiIHJ4PSIzLjciIHJ5PSI0LjQiLz48ZWxsaXBzZSBjeD0iMTA1LjkiIGN5PSI3Ni4zIiByeD0iMy43IiByeT0iNC40Ii8+PGNpcmNsZSBjeD0iODAuNSIgY3k9IjczLjkiIHI9IjIiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIxMDMuNSIgY3k9IjczLjkiIHI9IjIiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzcuNyA2Ny4zYzMuNS00LjEgNy00IDEwLjQgMCAwIDAtNC44LTkuNi0xMC40IDB6TTEwMC43IDY3LjNjMy41LTQuMSA3LTQgMTAuNCAwIDAgMC00LjgtOS42LTEwLjQgMHoiLz48cGF0aCBkPSJNNjguMyA2N3Y0bDIgLjJjLjguMyAxLjMgMSAxLjQgMS44djUuNHMuOSA5IDEwLjggOC41UzkyLjcgNzcgOTIuNyA3N3MwLTYuNSAyLjItNi41IDIuMyA2LjUgMi4zIDYuNS40IDkuOSAxMC4zIDkuOSAxMC4zLTguNSAxMC4zLTguNXYtNS44YzAtLjcuNi0xLjMgMS4zLTEuM2gxLjl2LTRsLTIxLjgtLjFjLS44LjItMS40LjYtMiAxLjJsLTIuMSAyLTIuMi0yLjFhMy40IDMuNCAwIDAwLTIuNy0xTDY4LjMgNjd6IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTkwLjEgOTYuNWwtLjItNC4zYzMuMy40IDYuNy4zIDEwLS40bC4yIDQuMmMuMS41LS4yLjctLjcuOWwtNCAuMi0uNC0zLjQtLjMgMy4zLTMuOS4yYy0uNS0uMS0uNy0uMy0uNy0uN3oiIGZpbGw9IiNmZmYiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzEzIj48cGF0aCBkPSJNMTA5IDk4LjRhMjEuMSAyMS4xIDAgMDEtMTIuOSA0LjFoLS41YTIxLjIgMjEuMiAwIDAxLTEyLjktNC4xYy0zLjUtMi44LTUuNy03LTUuNy05czcuMiAxLjEgMjAuNiAxLjFoLTEuNWM5LjEgMCAxNC44LTIgMTUuOC0yLjQgMS0uNCAyLjctLjYgMi43IDEuMyAwIDEuOC0yIDYuMi01LjYgOXoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48ZWxsaXBzZSBjeD0iOTcuMyIgY3k9IjcyLjciIHJ4PSI3LjciIHJ5PSIxMC44IiB0cmFuc2Zvcm09InJvdGF0ZSgtMy4yIDk3LjQgNzIuNykiIGZpbGw9IiNmZmYiLz48ZWxsaXBzZSBjeD0iOTcuNCIgY3k9Ijc0LjUiIHJ4PSI0LjYiIHJ5PSI1LjUiLz48Y2lyY2xlIGN4PSI5NC41IiBjeT0iNzEuNSIgcj0iMi41IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTkxIDYyYzQuNC01LjEgOC43LTUgMTMgMCAwIDAtNi0xMi0xMyAweiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTQiPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNODQgNjNjLTItMS01LTItOSAzcy04IDEzLTUgMTkgMTEgMyAxMi0xIDAtNiAzLTkgNC05LTEtMTJ6TTEwMy4yIDYyLjhjMS45LS45IDQuNy0xLjkgOC40IDIuOHM3LjQgMTIuMSA0LjcgMTcuNy0xMC4zIDIuNy0xMS4yLTEgMC01LjYtMi44LTguNC0zLjctOC4zLjktMTEuMXoiLz48L2c+PHBhdGggZD0iTTk4IDgzLjExYy0zLjctLjA2LTcgLjg5LTcgLjg5LTEuNS4zLTIgMS0xIDIgMCAwIDQuNzQgMy4xNiA2LjUgMy44NmE1OC40NSA1OC40NSAwIDAxLS4xNyAzLjY4Yy0uMTEgMS4zNy0uMyAyLjczLS41NyAzLjY5LS4xNC40OC0uMy43OC0uNCAxLjAxLS4yMy40OS0uMzguNjEtLjM4LjYxLS4zOC4wNC0uNDcuMDMtLjQ3LjAzLTEuNS0uMDYtMi44OC0uMzMtNC4xLS43M2ExNi4zNyAxNi4zNyAwIDAxLTYuNTQtMy45OS41LjUgMCAxMC0uNzQuNjhzMi41OCAyLjg0IDYuOTcgNC4yNmM0LjM4IDEuNDIgMTAuNiAxLjM4IDE3LjctNC4yLjU4LS40MS0uMDgtMS4yNi0uNi0uOC00LjEzIDMuMjUtNy44NSA0LjUyLTExLjA2IDQuNzUuMjUtLjM2LjQzLS44Mi41OC0xLjM1LjMtMS4wOC40OS0yLjQ4LjYtMy44OC4xMS0xLjM3LjE2LTIuNzMuMTgtMy43N0M5OS4xIDg5LjEzIDEwMyA4NiAxMDMgODZjMS0uOSAxLjItMS42IDAtMmExNC4yMSAxNC4yMSAwIDAwLTUtLjg5eiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTUiPjxwYXRoIGQ9Ik05NCA3MWMtNy40LjUtOC45IDQuOC04LjkgNC44YTIxIDIxIDAgMDAtMi40IDkuMmMwIDQuMy0uOCA0IDQuNSA1LjIgMCAwLTEgMTEgOS4zIDEwLjN2My43YzAgMTAuNiA2LjQgMy40IDYuNCAzLjRzNy45LTMuOSA5LjktMTYuNFMxMDIuOSA3MSA5NCA3MXptLjEgMjEuMmwtLjMtLjIuMy4yem0tLjMtLjFsLTIuNi0uOWMuOS4yIDEuOC41IDIuNi45em0uOC40YzEuMi44IDEuNyAxLjkgMS45IDMuOGE2IDYgMCAwMC0xLjktMy44eiIgb3BhY2l0eT0iLjIiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMTQuNyAxMDYuOSA3Mi4zKSIgY3g9IjEwNi44IiBjeT0iNzIuMyIgcng9IjMuNiIgcnk9IjUuMSIgZmlsbD0iIzQyMjEwYiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC04MS42IDgzLjcgNzIuNCkiIGN4PSI4My43IiBjeT0iNzIuNCIgcng9IjUuNyIgcnk9IjQiIGZpbGw9IiM0MjIxMGIiLz48cGF0aCBkPSJNOTQuOSA3MmMtNi43LjQtOCA0LjQtOCA0LjRhMTkuMSAxOS4xIDAgMDAtMi4yIDguNGMwIDMuOS0uNyAzLjcgNC4xIDQuOCAwIDAtLjkgMTAuMSA4LjQgOS42djMuNGMwIDkuOCA1LjggMy4xIDUuOCAzLjFzNy4xLTMuNiA4LjktMTUuMS05LTE4LjYtMTctMTguNnptLjEgMTkuNmwtLjMtLjIuMy4yem0tLjMtLjFsLTIuMy0uOGMuOC4xIDEuNi40IDIuMy44em0uNy40YzEuMS44IDEuNSAxLjggMS43IDMuNWE1LjEgNS4xIDAgMDAtMS43LTMuNXoiIGZpbGw9IiNmYmRiMzEiLz48cGF0aCBkPSJNODguOCA4OS43cy0uOSAxMC4xIDguNCA5LjZjMCAwIC44LTYuNS0yLjQtNy44cy02LTItNi0xLjh6IiBvcGFjaXR5PSIuMiIvPjxwYXRoIGQ9Ik04Ni45IDc2LjRzMS4zLTQgOC00LjRjOCAwIDE4LjcgNy4xIDE2LjkgMTguN3MtOC45IDE1LjEtOC45IDE1LjFjOC45LTE2IDUuMi0zMC41LTE2LTI5LjR6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNOTAuMyA3OS4xYy0uNyAxLjQtMS4yIDIuOS0xLjYgNC40IDAgLjkgMy4yLTUuMyAxLjYtNC40em0xLjMgMGExNCAxNCAwIDAwLS45IDIuOWMuMS41IDIuMi0zLjcuOS0yLjl6Ii8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xNiI+PGcgb3BhY2l0eT0iLjMiPjxlbGxpcHNlIGN4PSIxMDAuNSIgY3k9Ijg2LjUiIHJ4PSIxNC41IiByeT0iMTEuNyIgZmlsbD0iI2ZjZmNmYyIvPjxwYXRoIGQ9Ik0xMDAuNSA5OC4yYy04IDAtMTQuNS01LjItMTQuNS0xMS43czYuNS0xMS43IDE0LjUtMTEuN1MxMTUgODAgMTE1IDg2LjVjMC03LjMtNy40LTEzLjMtMTYuNS0xMy4zUzgyIDc5LjIgODIgODYuNXM3LjQgMTMuMyAxNi41IDEzLjMgMTYuNS02IDE2LjUtMTMuM2MwIDYuNS02LjUgMTEuNy0xNC41IDExLjd6Ii8+PC9nPjxnIGZpbGw9IiMyMTEzMDkiPjxlbGxpcHNlIGN4PSI5NiIgY3k9Ijg2LjUiIHJ4PSIzIiByeT0iNS41Ii8+PGVsbGlwc2UgY3g9IjEwNyIgY3k9Ijg2LjUiIHJ4PSIzIiByeT0iNS41Ii8+PC9nPjxnIGZpbGw9IiM0MjIxMGIiPjxwYXRoIGQ9Ik05OSA4Ni41YzAgMy0xLjMgNS41LTMgNS41LS41IDAtMS4xLS4yLTEuNC0uNkM5OCA5MSA5OCA4MiA5NC4zIDgyYy40LS42IDEtLjkgMS43LTEgMS43IDAgMyAyLjUgMyA1LjV6TTExMCA4Ni41YzAgMy0xLjMgNS41LTMgNS41LS41IDAtMS4xLS4yLTEuNC0uNiAzLjQtLjQgMy40LTkuNC0uMy05LjQuNC0uNiAxLS45IDEuNy0xIDEuNyAwIDMgMi41IDMgNS41eiIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0xMS41IDEwOS44IDY5KSIgY3g9IjEwOS44IiBjeT0iNjkiIHJ4PSIzLjYiIHJ5PSI1LjEiLz48ZWxsaXBzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNzguNSA4Ni43IDY3LjcpIiBjeD0iODYuNyIgY3k9IjY3LjciIHJ4PSI1LjciIHJ5PSI0Ii8+PC9nPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTciPjxwYXRoIGQ9Ik0xMTcuMiA2NlM4MS40IDU0LjUgNDQgNjMuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTAxLjUgNjMuNHMuNSAxOS42IDcgMjAuNmM0LjUgMS4xIDYuNS0xLjcgNy00LjZzLjQtMTEuNC0xLjgtMTQuM0wxMDEgNjJsLjUgMS40eiIgZmlsbD0iIzAxMDEwMSIvPjxlbGxpcHNlIHRyYW5zZm9ybT0icm90YXRlKC0zLjEgODUuMyA3Mi43KSIgY3g9Ijg1LjMiIGN5PSI3Mi43IiByeD0iNy43IiByeT0iMTAuOCIgZmlsbD0iI2ZmZiIvPjxlbGxpcHNlIGN4PSI4NS40IiBjeT0iNzQuNSIgcng9IjQuNiIgcnk9IjUuNSIvPjxjaXJjbGUgY3g9IjgyLjUiIGN5PSI3MS41IiByPSIyLjUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzkgNjIuNGMzLjYtMi42IDExLjUgMS42IDE3IDIuNiAwIDAtMTAuOS03LjItMTIuOC04LjJTNzkgNjIuNCA3OSA2Mi40eiIvPjxwYXRoIGQ9Ik0xMDYuOSA5MC44Yy0yLjctMy02LjYtNC44LTEwLjYtNC44aC0uNGMtMTAuNiAxLjEtMTguMSAxMC40LTE1LjMgMTUuMyAyLjUgNS41IDE5LjktOC4zIDI3LjguNiAyLjMgMS4zIDMuNy0xIDMuMi0zLjQtLjQtMi4yLTEuOC00LjUtNC43LTcuN3oiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ii8+PHBhdGggZD0iTTgwLjggOTUuNnMtMS44IDMuNC0uMyA1LjdjMi41IDUuNSAxOS45LTguMyAyNy44LjYuNC0yLjkuNS01LjkuNC04LjguMS0uMS0yNy45IDMuMy0yNy45IDIuNXoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNODAuOCA5NS42cy0xLjggMy40LS4zIDUuN2MyLjUgNS41IDE5LjktOC4zIDI3LjguNi40LTIuOS41LTUuOS40LTguOC4xLS4xLTI3LjkgMy4zLTI3LjkgMi41eiIgZmlsbD0iI2ZmZiIvPjwvc3ltYm9sPjxzeW1ib2wgaWQ9ImZhY2VfMTgiPjxwYXRoIGQ9Ik03NyA4MXMwLTEyIDYtMTIgNiAxMS42IDYgMTEuNlM4NCA2OSA3NyA4MXptMjQtLjVzMC0xMSA1LjUtMTEgNS41IDEwLjYgNS41IDEwLjYtNC42LTEwLjYtMTEgLjR6IiBmaWxsPSIjMDEwMTAxIiBvcGFjaXR5PSIuNiIvPjxwYXRoIGQ9Ik03NSA4NS40aDM4LjNzLTEuMSAyMy4xLTE5LjQgMjMuMWMtNSAuMi05LjctMS45LTEyLjktNS44LTUuOC02LjgtNi0xNy4zLTYtMTcuM3oiIGZpbGw9IiM2MDM4MTMiLz48cGF0aCBkPSJNMTA4LjEgMTAwLjhhMTYuNSAxNi41IDAgMDEtMTQuMiA3LjNjLTUgLjItOS43LTEuOS0xMi45LTUuOC01LjgtNi44IDMxLjktOC4zIDI3LjEtMS41eiIgZmlsbD0iI2YxNWEyNCIvPjxwYXRoIGQ9Ik03NSA4NWgzOC4zYy0uMSAyLjUtLjUgNS0xLjMgNy4zIDAgMC0yMi41IDQuMi0zNS45LS4zYTMzIDMzIDAgMDEtMS4xLTd6IiBmaWxsPSIjZmZmIi8+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8xOSI+PHBhdGggZD0iTTc0LjQgODNjMTMuNSAyIDI2LjQgMi41IDM4LjIgMCAwIDAtMS4xIDIzLTE5LjQgMjMtNC45LjItOS42LTItMTIuOC01LjctNS43LTYuOC02LTE3LjMtNi0xNy4zeiIgZmlsbD0iIzAxMDEwMSIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJNMTA3LjQgOTguNGExNi43IDE2LjcgMCAwMS0xNC4yIDcuM2MtNC45LjItOS42LTItMTIuOC01LjctNS43LTYuOSAzMS44LTguNCAyNy0xLjZ6IiBmaWxsPSIjZjE1YTI0Ii8+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik05My40IDY3LjhjLS4yLS40LS42LS42LTEtLjZsLTcuOS4yLTQuOC02LjljLS40LS41LTEtLjYtMS41LS4ybC0uNC41LTIuMSA4LjEtNy41IDIuNWExIDEgMCAwMC0uNy45Yy0uMS40LjEuOC41IDEuMWw2LjYgNC44LjEgOC40YzAgLjQuMi44LjYgMSAuNC4yLjguMSAxLjEtLjFsNi4yLTUuMSA3LjYgMi43aC41bC42LS4zYy4zLS4zLjQtLjguMi0xLjJsLTIuOC04Yy4xLjEgNC45LTcuNCA0LjctNy44ek0xMjEuNSA3MS45YTEgMSAwIDAwLS44LS44bC03LjYtMS45LTIuNy03LjRjLS4yLS41LS45LS44LTEuNC0uNWwtLjQuNC00LjIgNi43LTcuOC40Yy0uNCAwLS44LjMtLjkuNi0uMi40LS4xLjguMiAxLjFsNSA2LjEtMi4xIDcuN2MtLjEuNCAwIC44LjMgMS4xLjMuMy43LjQgMS4xLjJsNy4zLTNMMTE0IDg3bC41LjIuNi0uMWMuMy0uMi41LS42LjUtMWwtLjUtNy45Yy0uMS0uMyA2LjUtNS45IDYuNC02LjN6Ii8+PC9nPjxnIGZpbGw9IiNmM2ZmMDAiPjxwYXRoIGQ9Ik05Mi4zIDY4LjZhMSAxIDAgMDAtLjktLjVsLTcuMS4yLTQuMi01LjljLS40LS40LTEtLjUtMS40LS4xbC0uMy40LTIgNy02LjggMi4zYy0uMy4xLS42LjQtLjcuOCAwIC40LjEuNy40LjlsNS45IDQuMVY4NWMwIC40LjIuNy42LjkuMy4xLjcuMSAxLS4xbDUuNy00LjQgNi44IDIuMmMuNC4xLjcgMCAxLS4yLjItLjMuMy0uNy4yLTFsLTIuNC02LjlzNC40LTYuNiA0LjItNi45ek0xMTguOSA3Mi40Yy0uMS0uMy0uMy0uNi0uNi0uN2wtNi4yLTEuNi0yLjItNi4xYy0uMi0uNS0uNy0uNy0xLjItLjVsLS40LjMtMy40IDUuNS02LjQuM2MtLjUgMC0uOS40LS44LjlsLjIuNSA0LjEgNS0xLjcgNi4zYy0uMS4zIDAgLjcuMy45LjIuMi42LjMuOS4ybDYtMi40IDUuMyAzLjYuNC4xLjUtLjFjLjMtLjIuNS0uNS40LS44bC0uNC02LjVjLS4xIDAgNS4zLTQuNiA1LjItNC45eiIvPjwvZz48ZyBvcGFjaXR5PSIuMSI+PHBhdGggZD0iTTg0IDY4LjNsLTQtNS45YTEgMSAwIDAwLTEuMy0uMmMtLjIuMS0uMy4zLS4zLjVsMy43IDYuMyAxLjktLjd6TTkwLjcgNjguOGwtNC40IDUuOC4xLjItLjEgMS4xIDIuNCA2LjdjLjIuNS43LjcgMS4yLjVsLjQtLjQtMi03LjFoLS40bDMuNy01LjZjLjItLjQuMS0xLS40LTEuMmgtLjV6TTExMS44IDcwLjFsLTIuMS02LjFjLS4yLS40LS42LS42LTEtLjVsLS40LjMgMS43IDYuNCAxLjgtLjF6TTExNy40IDcyLjFsLTUuMyA0di4ybC0uNC45LjQgNi40YzAgLjQuNC44LjkuN2wuNS0uMnYtNi42bC0uMy0uMSA0LjYtNGMuMy0uMy4zLS44IDAtMS4xbC0uNC0uMnoiLz48L2c+PGcgb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNODEuNiA3OS4ybC01LjIgNC45YTEgMSAwIDAwMCAxLjNsLjUuMiA1LjYtNC43LS45LTEuN3pNMTA3IDc4LjlsLTUuNyAzYy0uNC4yLS41LjctLjMgMS4xLjEuMi4yLjMuNC4zbDYtMi43LS40LTEuN3oiLz48L2c+PC9zeW1ib2w+PHN5bWJvbCBpZD0iZmFjZV8yMCI+PHBhdGggZD0iTTg3LjIgOTRoMjEuMnMtLjYgMTEtMTAuOCAxMWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMy0zLjMtOC4zLTMuMy04LjN6IiBmaWxsPSIjNjAzODEzIi8+PHBhdGggZD0iTTEwNS41IDEwMS4zYTEwIDEwIDAgMDEtNy45IDMuNWMtMi42LjEtNS4yLS45LTcuMS0yLjctMy4yLTMuMyAxNy43LTQgMTUtLjh6IiBmaWxsPSIjZjE1YTI0Ii8+PHBhdGggZD0iTTcxLjMgNjhoLTEuOHY0aDEuOGMxIC4zIDEuOCAxLjIgMS44IDIuMlY4MHMtLjMgOC4xIDExLjggNy45YzAgMC04LjYuMi0xMC04LjN2LTUuNGMwLS44LS42LTEuNS0xLjMtMS44bC0xLjktLjQtLjQtNHoiIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTcxLjMgNjh2NGwyIC4yYy44LjMgMS4zIDEgMS40IDEuOHY1LjRzLjkgOSAxMC44IDguNVM5NS43IDc4IDk1LjcgNzhzMC00LjUgMi4yLTQuNSAyLjMgNC41IDIuMyA0LjUuNCA5LjkgMTAuMyA5LjkgMTAuMy04LjUgMTAuMy04LjV2LTUuOGMwLS43LjYtMS4zIDEuMy0xLjNoMS45di00bC0yMS44LS4xYy0uOC4yLTEuNC42LTIgMS4ybC0yLjEgMi0yLjItMi4xYTMuNCAzLjQgMCAwMC0yLjctMUw3MS4zIDY4eiIgb3BhY2l0eT0iLjUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTcxLjMgNjh2NGwyIC4yYy44LjMgMS4zIDEgMS40IDEuOHY1LjRzLjkgOSAxMC44IDguNVM5NS43IDc4IDk1LjcgNzhzMC00LjUgMi4yLTQuNSAyLjMgNC41IDIuMyA0LjUuNCA5LjkgMTAuMyA5LjkgMTAuMy04LjUgMTAuMy04LjV2LTUuOGMwLS43LjYtMS4zIDEuMy0xLjNoMS45di00bC0yMS44LS4xYy0uOC4yLTEuNC42LTIgMS4ybC0yLjEgMi0yLjItMi4xYTMuNCAzLjQgMCAwMC0yLjctMUw3MS4zIDY4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48L3N5bWJvbD48c3ltYm9sIGlkPSJmYWNlXzIxIj48cGF0aCBkPSJNNzkgODguNWMtLjMtLjEtNi40IDQuMi04LjMgNi4ycy40IDcuOCA4LjMgNGMzLjItMS4yIDcuMS00LjcgNy4xLTQuN3MtNC44LTIuNC03LjEtNS41eiIgZmlsbD0iI2YxNWEyNCIvPjxwYXRoIGQ9Ik04MS4xIDkyLjdjLTIgMS44LTQuMiAzLjUtNi42IDQuOC0yLjkgMS40LTIuMSAyLjIgMCAyLjFzNS41LS44IDkuNy00LjJsMS45LTEuNC00LTIuMi0xIC45eiIgZmlsbD0iI2U4NDcxNSIvPjxwYXRoIGQ9Ik03Ni4xIDgzLjNjLS41LTIuNiAzLjMgMTMuNCAxOC40IDEyLjcgMTYtLjggMTYuNS0xMy42IDE2LjUtMTMuNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyMTBiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxnIGZpbGw9IiMwMTAxMDEiIG9wYWNpdHk9Ii42Ij48cGF0aCBkPSJNNzcgNzVzMC0xMiA2LTEyIDYgMTEuNiA2IDExLjZTODQgNjMgNzcgNzV6TTEwMCA3NXMwLTEyIDYtMTIgNiAxMS42IDYgMTEuNi01LTExLjYtMTIgLjR6Ii8+PC9nPjwvc3ltYm9sPjwvc3ZnPg==";
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
