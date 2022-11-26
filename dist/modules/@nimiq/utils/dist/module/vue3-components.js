class e {
  static getBrowserInfo() {
    return {
      browser: e.detectBrowser(),
      version: e.detectVersion(),
      isMobile: e.isMobile()
    };
  }
  static isMobile() {
    return /i?Phone|iP(ad|od)|Android|BlackBerry|Opera Mini|WPDesktop|Mobi(le)?|Silk/i.test(navigator.userAgent);
  }
  static detectBrowser() {
    if (e._detectedBrowser)
      return e._detectedBrowser;
    const r = navigator.userAgent;
    return /Edge\//i.test(r) ? e._detectedBrowser = e.Browser.EDGE : /(Opera|OPR)\//i.test(r) ? e._detectedBrowser = e.Browser.OPERA : /Firefox\//i.test(r) ? e._detectedBrowser = e.Browser.FIREFOX : /Chrome\//i.test(r) ? e._detectedBrowser = navigator.plugins.length === 0 && navigator.mimeTypes.length === 0 && !e.isMobile() ? e.Browser.BRAVE : e.Browser.CHROME : /^((?!chrome|android).)*safari/i.test(r) ? e._detectedBrowser = e.Browser.SAFARI : e._detectedBrowser = e.Browser.UNKNOWN, e._detectedBrowser;
  }
  static detectVersion() {
    if (typeof e._detectedVersion < "u")
      return e._detectedVersion;
    let r;
    switch (e.detectBrowser()) {
      case e.Browser.EDGE:
        r = /Edge\/(\S+)/i;
        break;
      case e.Browser.OPERA:
        r = /(Opera|OPR)\/(\S+)/i;
        break;
      case e.Browser.FIREFOX:
        r = /Firefox\/(\S+)/i;
        break;
      case e.Browser.CHROME:
        r = /Chrome\/(\S+)/i;
        break;
      case e.Browser.SAFARI:
        r = /(iP(hone|ad|od).*?OS |Version\/)(\S+)/i;
        break;
      case e.Browser.BRAVE:
      default:
        return e._detectedVersion = null, null;
    }
    const t = navigator.userAgent.match(r);
    if (!t)
      return e._detectedVersion = null, null;
    const s = t[t.length - 1].replace(/_/g, "."), a = s.split("."), i = [];
    for (let n = 0; n < 4; ++n)
      i.push(parseInt(a[n], 10) || 0);
    const [o, u, l, f] = i;
    return e._detectedVersion = { versionString: s, major: o, minor: u, build: l, patch: f }, e._detectedVersion;
  }
  static isChrome() {
    return e.detectBrowser() === e.Browser.CHROME;
  }
  static isFirefox() {
    return e.detectBrowser() === e.Browser.FIREFOX;
  }
  static isOpera() {
    return e.detectBrowser() === e.Browser.OPERA;
  }
  static isEdge() {
    return e.detectBrowser() === e.Browser.EDGE;
  }
  static isSafari() {
    return e.detectBrowser() === e.Browser.SAFARI;
  }
  static isBrave() {
    return e.detectBrowser() === e.Browser.BRAVE;
  }
  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  static isBadIOS() {
    const r = e.getBrowserInfo();
    return r.browser === e.Browser.SAFARI && r.isMobile && r.version && (r.version.major < 11 || r.version.major === 11 && r.version.minor === 2);
  }
  static isPrivateMode() {
    return new Promise((r) => {
      const t = () => r(!0), s = () => r(!1), a = () => /Constructor/.test(window.HTMLElement) || window.safari && window.safari.pushNotification && window.safari.pushNotification.toString() === "[object SafariRemoteNotification]";
      if (window.webkitRequestFileSystem) {
        window.webkitRequestFileSystem(0, 0, s, t);
        return;
      }
      if (document.documentElement && "MozAppearance" in document.documentElement.style) {
        const i = indexedDB.open(null);
        i.onerror = t, i.onsuccess = s;
        return;
      }
      if (a())
        try {
          window.openDatabase(null, null, null, null);
        } catch {
          t();
          return;
        }
      if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
        t();
        return;
      }
      s();
    });
  }
}
(function(d) {
  (function(r) {
    r.CHROME = "chrome", r.FIREFOX = "firefox", r.OPERA = "opera", r.EDGE = "edge", r.SAFARI = "safari", r.BRAVE = "brave", r.UNKNOWN = "unknown";
  })(d.Browser || (d.Browser = {}));
})(e || (e = {}));
var c = e;
const E = c;
export {
  E as default
};
//# sourceMappingURL=vue3-components.js.map
