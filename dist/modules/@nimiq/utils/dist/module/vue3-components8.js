class s {
  static stringToUtf8ByteArray(t) {
    if (typeof TextEncoder < "u")
      return new TextEncoder().encode(t);
    const o = [];
    let c = 0;
    for (let e = 0; e < t.length; e++) {
      let r = t.charCodeAt(e);
      r < 128 ? o[c++] = r : r < 2048 ? (o[c++] = r >> 6 | 192, o[c++] = r & 63 | 128) : (r & 64512) == 55296 && e + 1 < t.length && (t.charCodeAt(e + 1) & 64512) == 56320 ? (r = 65536 + ((r & 1023) << 10) + (t.charCodeAt(++e) & 1023), o[c++] = r >> 18 | 240, o[c++] = r >> 12 & 63 | 128, o[c++] = r >> 6 & 63 | 128, o[c++] = r & 63 | 128) : (o[c++] = r >> 12 | 224, o[c++] = r >> 6 & 63 | 128, o[c++] = r & 63 | 128);
    }
    return new Uint8Array(o);
  }
  static utf8ByteArrayToString(t) {
    if (typeof TextDecoder < "u")
      return new TextDecoder("utf-8").decode(t);
    const o = [];
    let c = 0, e = 0;
    for (; c < t.length; ) {
      const r = t[c++];
      if (r < 128)
        o[e++] = String.fromCharCode(r);
      else if (r > 191 && r < 224) {
        const i = t[c++];
        o[e++] = String.fromCharCode((r & 31) << 6 | i & 63);
      } else if (r > 239 && r < 365) {
        const i = t[c++], n = t[c++], f = t[c++], x = ((r & 7) << 18 | (i & 63) << 12 | (n & 63) << 6 | f & 63) - 65536;
        o[e++] = String.fromCharCode(55296 + (x >> 10)), o[e++] = String.fromCharCode(56320 + (x & 1023));
      } else {
        const i = t[c++], n = t[c++];
        o[e++] = String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | n & 63);
      }
    }
    return o.join("");
  }
  static isValidUtf8(t, o = !1) {
    const c = [
      9,
      10,
      13
    ];
    if (typeof TextDecoder < "u")
      try {
        const i = new TextDecoder("utf-8", { fatal: !0 }).decode(t);
        if (!o)
          return !0;
        const n = i.match(/[\u0000-\u001F\u007F]/gu);
        return n ? n.every((f) => c.includes(f.charCodeAt(0))) : !0;
      } catch {
        return !1;
      }
    let e = 0;
    for (; e < t.length; ) {
      const r = t.length - e, i = t[e];
      if (i <= 127)
        if (i >= 32 && i <= 126)
          ++e;
        else if (!o)
          ++e;
        else if (c.indexOf(i) > -1)
          ++e;
        else
          break;
      else if (i >= 194 && i <= 223 && r >= 2) {
        const n = t[++e];
        if (n >= 128 && n <= 191)
          ++e;
        else
          break;
      } else if (i === 224 && r >= 3) {
        const n = t[++e], f = t[++e];
        if (n >= 160 && n <= 191 && f >= 128 && f <= 191)
          ++e;
        else
          break;
      } else if (i >= 225 && i <= 236 && r >= 3) {
        const n = t[++e], f = t[++e];
        if (n >= 128 && n <= 191 && f >= 128 && f <= 191)
          ++e;
        else
          break;
      } else if (i === 237 && r >= 3) {
        const n = t[++e], f = t[++e];
        if (n >= 128 && n <= 159 && f >= 128 && f <= 191)
          ++e;
        else
          break;
      } else if (i >= 238 && i <= 239 && r >= 3) {
        const n = t[++e], f = t[++e];
        if (n >= 128 && n <= 191 && f >= 128 && f <= 191)
          ++e;
        else
          break;
      } else if (i === 240 && r >= 4) {
        const n = t[++e], f = t[++e], x = t[++e];
        if (n >= 144 && n <= 191 && f >= 128 && f <= 191 && x >= 128 && x <= 191)
          ++e;
        else
          break;
      } else if (i >= 241 && i <= 243 && r >= 4) {
        const n = t[++e], f = t[++e], x = t[++e];
        if (n >= 128 && n <= 191 && f >= 128 && f <= 191 && x >= 128 && x <= 191)
          ++e;
        else
          break;
      } else if (i === 244 && r >= 4) {
        const n = t[++e], f = t[++e], x = t[++e];
        if (n >= 128 && n <= 143 && f >= 128 && f <= 191 && x >= 128 && x <= 191)
          ++e;
        else
          break;
      } else
        break;
    }
    return e === t.length;
  }
  static truncateToUtf8ByteLength(t, o, c = !0) {
    if (o < 0)
      throw new Error("Invalid byte length");
    let e;
    if (typeof t == "string" ? e = s.stringToUtf8ByteArray(t) : e = t, e.length <= o)
      return {
        result: t,
        didTruncate: !1
      };
    const r = [226, 128, 166];
    for (o < r.length && (c = !1), e = e.subarray(0, o - (c ? r.length : 0)); !s.isValidUtf8(e); )
      e = e.subarray(0, e.length - 1);
    return c && (e = new Uint8Array(e.buffer, e.byteOffset, e.length + r.length), typeof t != "string" && (e = new Uint8Array(e)), e.set(r, e.length - r.length)), {
      result: typeof t == "string" ? s.utf8ByteArrayToString(e) : e,
      didTruncate: !0
    };
  }
}
export {
  s as Utf8Tools
};
//# sourceMappingURL=vue3-components8.js.map
