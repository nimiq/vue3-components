import h from "./vue3-components2.js";
import { QrScannerEvents as P } from "./vue3-components2.js";
import { resolveComponent as p, openBlock as s, createElementBlock as o, createElementVNode as a, normalizeClass as _, renderSlot as v, toDisplayString as n, createVNode as d, Transition as f, withCtx as t, createBlock as l, createCommentVNode as u, pushScopeId as k, popScopeId as b } from "vue";
import "./vue3-components3.js";
import w from "../../../_virtual/vue3-components.js";
const i = (e) => (k("data-v-f2dcb425"), e = e(), b(), e), y = {
  class: "qr-scanner nq-blue-bg",
  ref: "root$"
}, g = {
  ref: "video$",
  muted: "",
  autoplay: "",
  playsinline: "",
  width: "600",
  height: "600"
}, S = /* @__PURE__ */ i(() => /* @__PURE__ */ a("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 238 238"
}, [
  /* @__PURE__ */ a("path", {
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "4",
    d: "M31.3 2H10a8 8 0 0 0-8 8v21.3M206.8 2H228a8 8 0 0 1 8 8v21.3m0 175.4V228a8 8 0 0 1-8 8h-21.3m-175.4 0H10a8 8 0 0 1-8-8v-21.3"
  })
], -1)), $ = {
  key: 0,
  class: "camera-access-failed"
}, C = {
  key: 0,
  class: "camera-access-failed-warning"
}, I = { key: 1 }, N = { class: "camera-access-failed-warning" }, Q = { key: 0 }, B = { key: 0 }, V = /* @__PURE__ */ i(() => /* @__PURE__ */ a("span", { class: "browser-menu-icon" }, null, -1)), q = /* @__PURE__ */ i(() => /* @__PURE__ */ a("div", { class: "browser-menu-arrow" }, null, -1)), E = {
  key: 1,
  class: "access-denied-instructions"
}, H = {
  key: 1,
  class: "access-denied-instructions"
}, M = /* @__PURE__ */ i(() => /* @__PURE__ */ a("b", null, "Safari", -1)), A = {
  key: 0,
  class: "camera-icon-chrome"
}, F = {
  key: 1,
  class: "camera-icon-firefox"
}, R = { key: 2 };
function T(e, r, U, j, z, D) {
  const c = p("I18n");
  return s(), o("div", y, [
    a("video", g, null, 512),
    a("div", {
      ref: "overlay$",
      class: _(["overlay", { inactive: e.cameraAccessFailed }])
    }, [
      v(e.$slots, "default", {}, () => [
        S
      ], !0)
    ], 2),
    a("button", {
      class: "nq-button-s inverse cancel-button",
      onClick: r[0] || (r[0] = (...m) => e.cancel && e.cancel(...m))
    }, n(e.$t("Cancel")), 1),
    d(f, { name: "fade" }, {
      default: t(() => [
        e.cameraAccessFailed ? (s(), o("div", $, [
          e.hasCamera ? (s(), o("div", I, [
            a("div", N, n(e.$t("Unblock the camera for this website to scan QR codes.")), 1),
            e.isMobileOrTablet ? (s(), o("div", Q, [
              e.browser === "chrome" ? (s(), o("div", B, [
                d(c, {
                  path: "Click on {icon} and go to\\nSettings > Site Settings > Camera",
                  tag: "div",
                  componentName: "QrScanner",
                  class: "access-denied-instructions"
                }, {
                  icon: t(() => [
                    V
                  ]),
                  _: 1
                }),
                q
              ])) : (s(), o("div", E, n(e.$t("Grant camera access when asked.")), 1))
            ])) : (s(), o("div", H, [
              e.browser === "safari" ? (s(), l(c, {
                key: 0,
                path: "Click on {safari} and go to\\nSettings for this Website > Camera",
                tag: "div",
                componentName: "QrScanner"
              }, {
                safari: t(() => [
                  M
                ]),
                _: 1
              })) : (s(), l(c, {
                key: 1,
                path: "Click on {icon} in the URL bar.",
                tag: "div",
                componentName: "QrScanner"
              }, {
                icon: t(() => [
                  e.browser === "chrome" ? (s(), o("span", A)) : e.browser === "firefox" ? (s(), o("span", F)) : (s(), o("span", R, n(e.$t("the camera icon")), 1))
                ]),
                _: 1
              }))
            ]))
          ])) : (s(), o("div", C, n(e.$t("Your device does not have an accessible camera.")), 1))
        ])) : u("", !0)
      ]),
      _: 1
    })
  ], 512);
}
const Y = /* @__PURE__ */ w(h, [["render", T], ["__scopeId", "data-v-f2dcb425"]]);
export {
  P as QrScannerEvents,
  Y as default
};
//# sourceMappingURL=vue3-components.js.map
