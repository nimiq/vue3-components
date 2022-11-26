function i(t) {
  const o = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(t)}=([^;]+)`));
  return o && decodeURIComponent(o[2]);
}
function a(t, o, e) {
  if (typeof t != "string")
    throw new Error("cookieName must be a string");
  if (typeof o != "string")
    throw new Error("cookieValue must be a string");
  const r = [`${encodeURIComponent(t)}=${encodeURIComponent(o)}`];
  if (e) {
    if (typeof e != "object")
      throw new Error("options must be an object");
    if (e.path && typeof e.path != "string")
      throw new Error("options.path must be a string");
    if (e.domain && typeof e.domain != "string")
      throw new Error("options.domain must be a string");
    if (e.maxAge && typeof e.maxAge != "number")
      throw new Error("options.maxAge must be a number");
    if (e.expires && typeof e.expires != "string")
      throw new Error("options.expires must be a string");
    if (e.samesite && !["lax", "strict", "none"].includes(e.samesite))
      throw new Error('options.samesite must be either "lax", "strict" or "none"');
    e.path && r.push(`path=${e.path}`), e.secure && r.push("secure"), e.domain && r.push(`domain=${e.domain}`), e.maxAge && r.push(`max-age=${e.maxAge}`), e.expires && r.push(`expires=${e.expires}`), e.samesite && r.push(`samesite=${e.samesite}`);
  }
  const n = r.join(";");
  return document.cookie = n, n;
}
function s(t) {
  document.cookie = `${encodeURIComponent(t)}=;max-age=0`;
}
var m = /* @__PURE__ */ Object.freeze({
  getCookie: i,
  setCookie: a,
  unsetCookie: s
});
export {
  i as a,
  a as b,
  s as c,
  m as d
};
//# sourceMappingURL=vue3-components3.js.map
