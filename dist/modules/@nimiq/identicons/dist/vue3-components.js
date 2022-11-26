class l {
  static async svg(e) {
    const t = h(e);
    return this._svgTemplate(t[0], t[2], t[3] + t[4], t[5] + t[6], t[7] + t[8], t[9] + t[10], t[11]);
  }
  static async render(e, t) {
    t.innerHTML = await this.svg(e);
  }
  static async toDataUrl(e) {
    return `data:image/svg+xml;base64,${this._btoa(await this.svg(e, !0))}`;
  }
  static placeholder(e = "#bbb", t = 1) {
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" >
<path fill="none" stroke="${e}" stroke-width="${2 * t}" transform="translate(0, 8) scale(0.5)" d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z"/>
<g transform="scale(0.9) translate(9, 8)">
<circle cx="80" cy="80" r="40" fill="none" stroke="${e}" stroke-width="${t}" opacity=".9"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
</g></svg>`;
  }
  static renderPlaceholder(e, t, n) {
    e.innerHTML = this.placeholder(t, n);
  }
  static placeholderToDataUrl(e, t) {
    return `data:image/svg+xml;base64,${this._btoa(this.placeholder(e, t))}`;
  }
  static async image(e) {
    const t = await this.toDataUrl(e), n = await this._loadImage(t);
    return n.style.width = "100%", n.style.height = "100%", n;
  }
  static async _svgTemplate(e, t, n, s, r, c, i) {
    return this._$svg(await this._$identicons(e, t, n, s, r, c, i));
  }
  static async _$identicons(e, t, n, s, r, c, i) {
    const o = m(e, t, i);
    return e = o.main, t = o.background, `<g color="${e}" fill="${i = o.accent}">
<rect fill="${t}" x="0" y="0" width="160" height="160"/>
<circle cx="80" cy="80" r="40" fill="${e}"/>
<g opacity=".1" fill="#010101"><path d="M119.21,80a39.46,39.46,0,0,1-67.13,28.13c10.36,2.33,36,3,49.82-14.28,10.39-12.47,8.31-33.23,4.16-43.26A39.35,39.35,0,0,1,119.21,80Z"/></g>
${await this._generatePart("top", s)}
${await this._generatePart("side", r)}
${await this._generatePart("face", n)}
${await this._generatePart("bottom", c)}
</g>`;
  }
  static _$svg(e) {
    const t = this._getRandomId();
    return `<svg viewBox="0 0 160 160" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="hexagon-clip-${t}">
<path d="M251.6 17.34l63.53 110.03c5.72 9.9 5.72 22.1 0 32L251.6 269.4c-5.7 9.9-16.27 16-27.7 16H96.83c-11.43 0-22-6.1-27.7-16L5.6 159.37c-5.7-9.9-5.7-22.1 0-32L69.14 17.34c5.72-9.9 16.28-16 27.7-16H223.9c11.43 0 22 6.1 27.7 16z" transform="scale(0.5) translate(0, 16)"/>
</clipPath></defs>
<g clip-path="url(#hexagon-clip-${t})">
${e}
</g></svg>`;
  }
  static async _generatePart(e, t) {
    const n = await this._getAssets(), s = e + "_" + this._assetIndex(t, e), r = n.getElementById(s);
    return r ? r.innerHTML : "";
  }
  static _loadImage(e) {
    return new Promise((t, n) => {
      const s = document.createElement("img");
      s.addEventListener("load", (r) => t(s), { once: !0 }), s.src = e;
    });
  }
  static async _getAssets() {
    return this._assetsPromise || (this._assetsPromise = new Promise(async function(e) {
      let t;
      if (t = typeof IdenticonsAssets < "u" ? IdenticonsAssets : await fetch(self.NIMIQ_IDENTICONS_SVG_PATH || l.svgPath).then((n) => n.text()), typeof DOMParser != "function") {
        if (typeof module > "u" || !module.exports)
          throw new Error("No DOMParser available");
        global.DOMParser = require("dom-parser");
      }
      e(new DOMParser().parseFromString(t, "image/svg+xml"));
    }));
  }
  static _btoa(e) {
    if (typeof btoa == "function")
      return btoa(e);
    if (typeof module < "u" && module.exports)
      return Buffer.from(e).toString("base64");
    throw new Error("No btoa or equivalent available");
  }
  static _assetIndex(e, t) {
    return (e = Number(e) % 21 + 1) < 10 && (e = "0" + e), e;
  }
  static _getRandomId() {
    return Math.floor(256 * Math.random());
  }
}
l.svgPath = "/node_modules/@nimiq/identicons/dist/identicons.min.svg";
function h(a) {
  const e = ("" + a.split("").map((t) => Number(t.charCodeAt(0)) + 3).reduce((t, n) => t * (1 - t) * g(n), 0.5)).split("").reduce((t, n) => n + t, "");
  return u(e.replace(".", e[5]).substr(4, 17), 13, e[5]);
}
function g(a) {
  let e = 1 / a;
  for (let t = 0; t < 100; t++)
    e = (1 - e) * e * 3.569956786876;
  return e;
}
function u(a, e, t) {
  if (String.prototype.padEnd)
    return a.padEnd(e, t);
  for (; a.length < e; )
    a += t;
  return a.substring(0, Math.max(a.length, e));
}
function m(a, e, t) {
  return p(f(a, e, t));
}
function f(a, e, t) {
  for (a = parseInt(a, 10), e = parseInt(e, 10), t = parseInt(t, 10), a === e && ++a > 9 && (a = 0); t === a || t === e; )
    ++t > 9 && (t = 0);
  return { main: a, background: e, accent: t };
}
function p(a) {
  return { main: d[a.main], background: w[a.background], accent: d[a.accent] };
}
const d = ["#FC8702", "#D94432", "#E9B213", "#1A5493", "#0582CA", "#5961A8", "#21BCA5", "#FA7268", "#88B04B", "#795548"], w = ["#FC8702", "#D94432", "#E9B213", "#1F2348", "#0582CA", "#5F4B8B", "#21BCA5", "#FA7268", "#88B04B", "#795548"];
export {
  w as backgroundColors,
  d as colors,
  l as default,
  f as hashToIndices,
  m as hashToRGB,
  h as makeHash
};
//# sourceMappingURL=vue3-components.js.map
