var ma = Object.defineProperty;
var da = (t, n, a) => n in t ? ma(t, n, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[n] = a;
var nt = (t, n, a) => (da(t, typeof n != "symbol" ? n + "" : n, a), a);
import { defineComponent as va, ref as pa, computed as ba, openBlock as ga, createElementBlock as ha, normalizeClass as ya, unref as Tt, withModifiers as ka, withKeys as wa, renderSlot as xa } from "vue";
class ur {
  ping() {
    return "PING!";
  }
}
function dn(t, n) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(t);
    n && (e = e.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), a.push.apply(a, e);
  }
  return a;
}
function c(t) {
  for (var n = 1; n < arguments.length; n++) {
    var a = arguments[n] != null ? arguments[n] : {};
    n % 2 ? dn(Object(a), !0).forEach(function(e) {
      k(t, e, a[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : dn(Object(a)).forEach(function(e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
    });
  }
  return t;
}
function _t(t) {
  return _t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
    return typeof n;
  } : function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, _t(t);
}
function Aa(t, n) {
  if (!(t instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function vn(t, n) {
  for (var a = 0; a < n.length; a++) {
    var e = n[a];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
  }
}
function _a(t, n, a) {
  return n && vn(t.prototype, n), a && vn(t, a), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function k(t, n, a) {
  return n in t ? Object.defineProperty(t, n, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[n] = a, t;
}
function Zt(t, n) {
  return Sa(t) || Pa(t, n) || zn(t, n) || Na();
}
function ct(t) {
  return Ea(t) || Ca(t) || zn(t) || Oa();
}
function Ea(t) {
  if (Array.isArray(t))
    return Ut(t);
}
function Sa(t) {
  if (Array.isArray(t))
    return t;
}
function Ca(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function Pa(t, n) {
  var a = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (a != null) {
    var e = [], r = !0, o = !1, i, s;
    try {
      for (a = a.call(t); !(r = (i = a.next()).done) && (e.push(i.value), !(n && e.length === n)); r = !0)
        ;
    } catch (f) {
      o = !0, s = f;
    } finally {
      try {
        !r && a.return != null && a.return();
      } finally {
        if (o)
          throw s;
      }
    }
    return e;
  }
}
function zn(t, n) {
  if (t) {
    if (typeof t == "string")
      return Ut(t, n);
    var a = Object.prototype.toString.call(t).slice(8, -1);
    if (a === "Object" && t.constructor && (a = t.constructor.name), a === "Map" || a === "Set")
      return Array.from(t);
    if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))
      return Ut(t, n);
  }
}
function Ut(t, n) {
  (n == null || n > t.length) && (n = t.length);
  for (var a = 0, e = new Array(n); a < n; a++)
    e[a] = t[a];
  return e;
}
function Oa() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Na() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var pn = function() {
}, tn = {}, $n = {}, jn = null, Yn = {
  mark: pn,
  measure: pn
};
try {
  typeof window < "u" && (tn = window), typeof document < "u" && ($n = document), typeof MutationObserver < "u" && (jn = MutationObserver), typeof performance < "u" && (Yn = performance);
} catch {
}
var Ia = tn.navigator || {}, bn = Ia.userAgent, gn = bn === void 0 ? "" : bn, $ = tn, h = $n, hn = jn, dt = Yn;
$.document;
var D = !!h.documentElement && !!h.head && typeof h.addEventListener == "function" && typeof h.createElement == "function", Un = ~gn.indexOf("MSIE") || ~gn.indexOf("Trident/"), vt, pt, bt, gt, ht, M = "___FONT_AWESOME___", Ht = 16, Hn = "fa", Wn = "svg-inline--fa", X = "data-fa-i2svg", Wt = "data-fa-pseudo-element", Ta = "data-fa-pseudo-element-pending", nn = "data-prefix", an = "data-icon", yn = "fontawesome-i2svg", Ma = "async", Ra = ["HTML", "HEAD", "STYLE", "SCRIPT"], Gn = function() {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
}(), g = "classic", y = "sharp", en = [g, y];
function ut(t) {
  return new Proxy(t, {
    get: function(a, e) {
      return e in a ? a[e] : a[g];
    }
  });
}
var it = ut((vt = {}, k(vt, g, {
  fa: "solid",
  fas: "solid",
  "fa-solid": "solid",
  far: "regular",
  "fa-regular": "regular",
  fal: "light",
  "fa-light": "light",
  fat: "thin",
  "fa-thin": "thin",
  fad: "duotone",
  "fa-duotone": "duotone",
  fab: "brands",
  "fa-brands": "brands",
  fak: "kit",
  "fa-kit": "kit"
}), k(vt, y, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular",
  fasl: "light",
  "fa-light": "light"
}), vt)), ot = ut((pt = {}, k(pt, g, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), k(pt, y, {
  solid: "fass",
  regular: "fasr",
  light: "fasl"
}), pt)), st = ut((bt = {}, k(bt, g, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), k(bt, y, {
  fass: "fa-solid",
  fasr: "fa-regular",
  fasl: "fa-light"
}), bt)), La = ut((gt = {}, k(gt, g, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), k(gt, y, {
  "fa-solid": "fass",
  "fa-regular": "fasr",
  "fa-light": "fasl"
}), gt)), Da = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/, Bn = "fa-layers-text", Fa = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, za = ut((ht = {}, k(ht, g, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), k(ht, y, {
  900: "fass",
  400: "fasr",
  300: "fasl"
}), ht)), Xn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], $a = Xn.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), ja = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], W = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, ft = /* @__PURE__ */ new Set();
Object.keys(ot[g]).map(ft.add.bind(ft));
Object.keys(ot[y]).map(ft.add.bind(ft));
var Ya = [].concat(en, ct(ft), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", W.GROUP, W.SWAP_OPACITY, W.PRIMARY, W.SECONDARY]).concat(Xn.map(function(t) {
  return "".concat(t, "x");
})).concat($a.map(function(t) {
  return "w-".concat(t);
})), et = $.FontAwesomeConfig || {};
function Ua(t) {
  var n = h.querySelector("script[" + t + "]");
  if (n)
    return n.getAttribute(t);
}
function Ha(t) {
  return t === "" ? !0 : t === "false" ? !1 : t === "true" ? !0 : t;
}
if (h && typeof h.querySelector == "function") {
  var Wa = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  Wa.forEach(function(t) {
    var n = Zt(t, 2), a = n[0], e = n[1], r = Ha(Ua(a));
    r != null && (et[e] = r);
  });
}
var Vn = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: Hn,
  replacementClass: Wn,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
et.familyPrefix && (et.cssPrefix = et.familyPrefix);
var Z = c(c({}, Vn), et);
Z.autoReplaceSvg || (Z.observeMutations = !1);
var d = {};
Object.keys(Vn).forEach(function(t) {
  Object.defineProperty(d, t, {
    enumerable: !0,
    set: function(a) {
      Z[t] = a, rt.forEach(function(e) {
        return e(d);
      });
    },
    get: function() {
      return Z[t];
    }
  });
});
Object.defineProperty(d, "familyPrefix", {
  enumerable: !0,
  set: function(n) {
    Z.cssPrefix = n, rt.forEach(function(a) {
      return a(d);
    });
  },
  get: function() {
    return Z.cssPrefix;
  }
});
$.FontAwesomeConfig = d;
var rt = [];
function Ga(t) {
  return rt.push(t), function() {
    rt.splice(rt.indexOf(t), 1);
  };
}
var z = Ht, T = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function Ba(t) {
  if (!(!t || !D)) {
    var n = h.createElement("style");
    n.setAttribute("type", "text/css"), n.innerHTML = t;
    for (var a = h.head.childNodes, e = null, r = a.length - 1; r > -1; r--) {
      var o = a[r], i = (o.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(i) > -1 && (e = o);
    }
    return h.head.insertBefore(n, e), t;
  }
}
var Xa = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function lt() {
  for (var t = 12, n = ""; t-- > 0; )
    n += Xa[Math.random() * 62 | 0];
  return n;
}
function tt(t) {
  for (var n = [], a = (t || []).length >>> 0; a--; )
    n[a] = t[a];
  return n;
}
function rn(t) {
  return t.classList ? tt(t.classList) : (t.getAttribute("class") || "").split(" ").filter(function(n) {
    return n;
  });
}
function qn(t) {
  return "".concat(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Va(t) {
  return Object.keys(t || {}).reduce(function(n, a) {
    return n + "".concat(a, '="').concat(qn(t[a]), '" ');
  }, "").trim();
}
function Ct(t) {
  return Object.keys(t || {}).reduce(function(n, a) {
    return n + "".concat(a, ": ").concat(t[a].trim(), ";");
  }, "");
}
function on(t) {
  return t.size !== T.size || t.x !== T.x || t.y !== T.y || t.rotate !== T.rotate || t.flipX || t.flipY;
}
function qa(t) {
  var n = t.transform, a = t.containerWidth, e = t.iconWidth, r = {
    transform: "translate(".concat(a / 2, " 256)")
  }, o = "translate(".concat(n.x * 32, ", ").concat(n.y * 32, ") "), i = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), s = "rotate(".concat(n.rotate, " 0 0)"), f = {
    transform: "".concat(o, " ").concat(i, " ").concat(s)
  }, u = {
    transform: "translate(".concat(e / 2 * -1, " -256)")
  };
  return {
    outer: r,
    inner: f,
    path: u
  };
}
function Ka(t) {
  var n = t.transform, a = t.width, e = a === void 0 ? Ht : a, r = t.height, o = r === void 0 ? Ht : r, i = t.startCentered, s = i === void 0 ? !1 : i, f = "";
  return s && Un ? f += "translate(".concat(n.x / z - e / 2, "em, ").concat(n.y / z - o / 2, "em) ") : s ? f += "translate(calc(-50% + ".concat(n.x / z, "em), calc(-50% + ").concat(n.y / z, "em)) ") : f += "translate(".concat(n.x / z, "em, ").concat(n.y / z, "em) "), f += "scale(".concat(n.size / z * (n.flipX ? -1 : 1), ", ").concat(n.size / z * (n.flipY ? -1 : 1), ") "), f += "rotate(".concat(n.rotate, "deg) "), f;
}
var Qa = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function Kn() {
  var t = Hn, n = Wn, a = d.cssPrefix, e = d.replacementClass, r = Qa;
  if (a !== t || e !== n) {
    var o = new RegExp("\\.".concat(t, "\\-"), "g"), i = new RegExp("\\--".concat(t, "\\-"), "g"), s = new RegExp("\\.".concat(n), "g");
    r = r.replace(o, ".".concat(a, "-")).replace(i, "--".concat(a, "-")).replace(s, ".".concat(e));
  }
  return r;
}
var kn = !1;
function Mt() {
  d.autoAddCss && !kn && (Ba(Kn()), kn = !0);
}
var Ja = {
  mixout: function() {
    return {
      dom: {
        css: Kn,
        insertCss: Mt
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        Mt();
      },
      beforeI2svg: function() {
        Mt();
      }
    };
  }
}, R = $ || {};
R[M] || (R[M] = {});
R[M].styles || (R[M].styles = {});
R[M].hooks || (R[M].hooks = {});
R[M].shims || (R[M].shims = []);
var O = R[M], Qn = [], Za = function t() {
  h.removeEventListener("DOMContentLoaded", t), Et = 1, Qn.map(function(n) {
    return n();
  });
}, Et = !1;
D && (Et = (h.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(h.readyState), Et || h.addEventListener("DOMContentLoaded", Za));
function te(t) {
  D && (Et ? setTimeout(t, 0) : Qn.push(t));
}
function mt(t) {
  var n = t.tag, a = t.attributes, e = a === void 0 ? {} : a, r = t.children, o = r === void 0 ? [] : r;
  return typeof t == "string" ? qn(t) : "<".concat(n, " ").concat(Va(e), ">").concat(o.map(mt).join(""), "</").concat(n, ">");
}
function wn(t, n, a) {
  if (t && t[n] && t[n][a])
    return {
      prefix: n,
      iconName: a,
      icon: t[n][a]
    };
}
var ne = function(n, a) {
  return function(e, r, o, i) {
    return n.call(a, e, r, o, i);
  };
}, Rt = function(n, a, e, r) {
  var o = Object.keys(n), i = o.length, s = r !== void 0 ? ne(a, r) : a, f, u, l;
  for (e === void 0 ? (f = 1, l = n[o[0]]) : (f = 0, l = e); f < i; f++)
    u = o[f], l = s(l, n[u], u, n);
  return l;
};
function ae(t) {
  for (var n = [], a = 0, e = t.length; a < e; ) {
    var r = t.charCodeAt(a++);
    if (r >= 55296 && r <= 56319 && a < e) {
      var o = t.charCodeAt(a++);
      (o & 64512) == 56320 ? n.push(((r & 1023) << 10) + (o & 1023) + 65536) : (n.push(r), a--);
    } else
      n.push(r);
  }
  return n;
}
function Gt(t) {
  var n = ae(t);
  return n.length === 1 ? n[0].toString(16) : null;
}
function ee(t, n) {
  var a = t.length, e = t.charCodeAt(n), r;
  return e >= 55296 && e <= 56319 && a > n + 1 && (r = t.charCodeAt(n + 1), r >= 56320 && r <= 57343) ? (e - 55296) * 1024 + r - 56320 + 65536 : e;
}
function xn(t) {
  return Object.keys(t).reduce(function(n, a) {
    var e = t[a], r = !!e.icon;
    return r ? n[e.iconName] = e.icon : n[a] = e, n;
  }, {});
}
function Bt(t, n) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, e = a.skipHooks, r = e === void 0 ? !1 : e, o = xn(n);
  typeof O.hooks.addPack == "function" && !r ? O.hooks.addPack(t, xn(n)) : O.styles[t] = c(c({}, O.styles[t] || {}), o), t === "fas" && Bt("fa", n);
}
var yt, kt, wt, K = O.styles, re = O.shims, ie = (yt = {}, k(yt, g, Object.values(st[g])), k(yt, y, Object.values(st[y])), yt), sn = null, Jn = {}, Zn = {}, ta = {}, na = {}, aa = {}, oe = (kt = {}, k(kt, g, Object.keys(it[g])), k(kt, y, Object.keys(it[y])), kt);
function se(t) {
  return ~Ya.indexOf(t);
}
function fe(t, n) {
  var a = n.split("-"), e = a[0], r = a.slice(1).join("-");
  return e === t && r !== "" && !se(r) ? r : null;
}
var ea = function() {
  var n = function(o) {
    return Rt(K, function(i, s, f) {
      return i[f] = Rt(s, o, {}), i;
    }, {});
  };
  Jn = n(function(r, o, i) {
    if (o[3] && (r[o[3]] = i), o[2]) {
      var s = o[2].filter(function(f) {
        return typeof f == "number";
      });
      s.forEach(function(f) {
        r[f.toString(16)] = i;
      });
    }
    return r;
  }), Zn = n(function(r, o, i) {
    if (r[i] = i, o[2]) {
      var s = o[2].filter(function(f) {
        return typeof f == "string";
      });
      s.forEach(function(f) {
        r[f] = i;
      });
    }
    return r;
  }), aa = n(function(r, o, i) {
    var s = o[2];
    return r[i] = i, s.forEach(function(f) {
      r[f] = i;
    }), r;
  });
  var a = "far" in K || d.autoFetchSvg, e = Rt(re, function(r, o) {
    var i = o[0], s = o[1], f = o[2];
    return s === "far" && !a && (s = "fas"), typeof i == "string" && (r.names[i] = {
      prefix: s,
      iconName: f
    }), typeof i == "number" && (r.unicodes[i.toString(16)] = {
      prefix: s,
      iconName: f
    }), r;
  }, {
    names: {},
    unicodes: {}
  });
  ta = e.names, na = e.unicodes, sn = Pt(d.styleDefault, {
    family: d.familyDefault
  });
};
Ga(function(t) {
  sn = Pt(t.styleDefault, {
    family: d.familyDefault
  });
});
ea();
function fn(t, n) {
  return (Jn[t] || {})[n];
}
function le(t, n) {
  return (Zn[t] || {})[n];
}
function G(t, n) {
  return (aa[t] || {})[n];
}
function ra(t) {
  return ta[t] || {
    prefix: null,
    iconName: null
  };
}
function ce(t) {
  var n = na[t], a = fn("fas", t);
  return n || (a ? {
    prefix: "fas",
    iconName: a
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function j() {
  return sn;
}
var ln = function() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function Pt(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.family, e = a === void 0 ? g : a, r = it[e][t], o = ot[e][t] || ot[e][r], i = t in O.styles ? t : null;
  return o || i || null;
}
var An = (wt = {}, k(wt, g, Object.keys(st[g])), k(wt, y, Object.keys(st[y])), wt);
function Ot(t) {
  var n, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = a.skipLookups, r = e === void 0 ? !1 : e, o = (n = {}, k(n, g, "".concat(d.cssPrefix, "-").concat(g)), k(n, y, "".concat(d.cssPrefix, "-").concat(y)), n), i = null, s = g;
  (t.includes(o[g]) || t.some(function(u) {
    return An[g].includes(u);
  })) && (s = g), (t.includes(o[y]) || t.some(function(u) {
    return An[y].includes(u);
  })) && (s = y);
  var f = t.reduce(function(u, l) {
    var m = fe(d.cssPrefix, l);
    if (K[l] ? (l = ie[s].includes(l) ? La[s][l] : l, i = l, u.prefix = l) : oe[s].indexOf(l) > -1 ? (i = l, u.prefix = Pt(l, {
      family: s
    })) : m ? u.iconName = m : l !== d.replacementClass && l !== o[g] && l !== o[y] && u.rest.push(l), !r && u.prefix && u.iconName) {
      var v = i === "fa" ? ra(u.iconName) : {}, b = G(u.prefix, u.iconName);
      v.prefix && (i = null), u.iconName = v.iconName || b || u.iconName, u.prefix = v.prefix || u.prefix, u.prefix === "far" && !K.far && K.fas && !d.autoFetchSvg && (u.prefix = "fas");
    }
    return u;
  }, ln());
  return (t.includes("fa-brands") || t.includes("fab")) && (f.prefix = "fab"), (t.includes("fa-duotone") || t.includes("fad")) && (f.prefix = "fad"), !f.prefix && s === y && (K.fass || d.autoFetchSvg) && (f.prefix = "fass", f.iconName = G(f.prefix, f.iconName) || f.iconName), (f.prefix === "fa" || i === "fa") && (f.prefix = j() || "fas"), f;
}
var ue = /* @__PURE__ */ function() {
  function t() {
    Aa(this, t), this.definitions = {};
  }
  return _a(t, [{
    key: "add",
    value: function() {
      for (var a = this, e = arguments.length, r = new Array(e), o = 0; o < e; o++)
        r[o] = arguments[o];
      var i = r.reduce(this._pullDefinitions, {});
      Object.keys(i).forEach(function(s) {
        a.definitions[s] = c(c({}, a.definitions[s] || {}), i[s]), Bt(s, i[s]);
        var f = st[g][s];
        f && Bt(f, i[s]), ea();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(a, e) {
      var r = e.prefix && e.iconName && e.icon ? {
        0: e
      } : e;
      return Object.keys(r).map(function(o) {
        var i = r[o], s = i.prefix, f = i.iconName, u = i.icon, l = u[2];
        a[s] || (a[s] = {}), l.length > 0 && l.forEach(function(m) {
          typeof m == "string" && (a[s][m] = u);
        }), a[s][f] = u;
      }), a;
    }
  }]), t;
}(), _n = [], Q = {}, J = {}, me = Object.keys(J);
function de(t, n) {
  var a = n.mixoutsTo;
  return _n = t, Q = {}, Object.keys(J).forEach(function(e) {
    me.indexOf(e) === -1 && delete J[e];
  }), _n.forEach(function(e) {
    var r = e.mixout ? e.mixout() : {};
    if (Object.keys(r).forEach(function(i) {
      typeof r[i] == "function" && (a[i] = r[i]), _t(r[i]) === "object" && Object.keys(r[i]).forEach(function(s) {
        a[i] || (a[i] = {}), a[i][s] = r[i][s];
      });
    }), e.hooks) {
      var o = e.hooks();
      Object.keys(o).forEach(function(i) {
        Q[i] || (Q[i] = []), Q[i].push(o[i]);
      });
    }
    e.provides && e.provides(J);
  }), a;
}
function Xt(t, n) {
  for (var a = arguments.length, e = new Array(a > 2 ? a - 2 : 0), r = 2; r < a; r++)
    e[r - 2] = arguments[r];
  var o = Q[t] || [];
  return o.forEach(function(i) {
    n = i.apply(null, [n].concat(e));
  }), n;
}
function V(t) {
  for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++)
    a[e - 1] = arguments[e];
  var r = Q[t] || [];
  r.forEach(function(o) {
    o.apply(null, a);
  });
}
function L() {
  var t = arguments[0], n = Array.prototype.slice.call(arguments, 1);
  return J[t] ? J[t].apply(null, n) : void 0;
}
function Vt(t) {
  t.prefix === "fa" && (t.prefix = "fas");
  var n = t.iconName, a = t.prefix || j();
  if (n)
    return n = G(a, n) || n, wn(ia.definitions, a, n) || wn(O.styles, a, n);
}
var ia = new ue(), ve = function() {
  d.autoReplaceSvg = !1, d.observeMutations = !1, V("noAuto");
}, pe = {
  i2svg: function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return D ? (V("beforeI2svg", n), L("pseudoElements2svg", n), L("i2svg", n)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = n.autoReplaceSvgRoot;
    d.autoReplaceSvg === !1 && (d.autoReplaceSvg = !0), d.observeMutations = !0, te(function() {
      ge({
        autoReplaceSvgRoot: a
      }), V("watch", n);
    });
  }
}, be = {
  icon: function(n) {
    if (n === null)
      return null;
    if (_t(n) === "object" && n.prefix && n.iconName)
      return {
        prefix: n.prefix,
        iconName: G(n.prefix, n.iconName) || n.iconName
      };
    if (Array.isArray(n) && n.length === 2) {
      var a = n[1].indexOf("fa-") === 0 ? n[1].slice(3) : n[1], e = Pt(n[0]);
      return {
        prefix: e,
        iconName: G(e, a) || a
      };
    }
    if (typeof n == "string" && (n.indexOf("".concat(d.cssPrefix, "-")) > -1 || n.match(Da))) {
      var r = Ot(n.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: r.prefix || j(),
        iconName: G(r.prefix, r.iconName) || r.iconName
      };
    }
    if (typeof n == "string") {
      var o = j();
      return {
        prefix: o,
        iconName: G(o, n) || n
      };
    }
  }
}, E = {
  noAuto: ve,
  config: d,
  dom: pe,
  parse: be,
  library: ia,
  findIconDefinition: Vt,
  toHtml: mt
}, ge = function() {
  var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = n.autoReplaceSvgRoot, e = a === void 0 ? h : a;
  (Object.keys(O.styles).length > 0 || d.autoFetchSvg) && D && d.autoReplaceSvg && E.dom.i2svg({
    node: e
  });
};
function Nt(t, n) {
  return Object.defineProperty(t, "abstract", {
    get: n
  }), Object.defineProperty(t, "html", {
    get: function() {
      return t.abstract.map(function(e) {
        return mt(e);
      });
    }
  }), Object.defineProperty(t, "node", {
    get: function() {
      if (D) {
        var e = h.createElement("div");
        return e.innerHTML = t.html, e.children;
      }
    }
  }), t;
}
function he(t) {
  var n = t.children, a = t.main, e = t.mask, r = t.attributes, o = t.styles, i = t.transform;
  if (on(i) && a.found && !e.found) {
    var s = a.width, f = a.height, u = {
      x: s / f / 2,
      y: 0.5
    };
    r.style = Ct(c(c({}, o), {}, {
      "transform-origin": "".concat(u.x + i.x / 16, "em ").concat(u.y + i.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: r,
    children: n
  }];
}
function ye(t) {
  var n = t.prefix, a = t.iconName, e = t.children, r = t.attributes, o = t.symbol, i = o === !0 ? "".concat(n, "-").concat(d.cssPrefix, "-").concat(a) : o;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: c(c({}, r), {}, {
        id: i
      }),
      children: e
    }]
  }];
}
function cn(t) {
  var n = t.icons, a = n.main, e = n.mask, r = t.prefix, o = t.iconName, i = t.transform, s = t.symbol, f = t.title, u = t.maskId, l = t.titleId, m = t.extra, v = t.watchable, b = v === void 0 ? !1 : v, x = e.found ? e : a, S = x.width, P = x.height, N = r === "fak", w = [d.replacementClass, o ? "".concat(d.cssPrefix, "-").concat(o) : ""].filter(function(F) {
    return m.classes.indexOf(F) === -1;
  }).filter(function(F) {
    return F !== "" || !!F;
  }).concat(m.classes).join(" "), A = {
    children: [],
    attributes: c(c({}, m.attributes), {}, {
      "data-prefix": r,
      "data-icon": o,
      class: w,
      role: m.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(S, " ").concat(P)
    })
  }, I = N && !~m.classes.indexOf("fa-fw") ? {
    width: "".concat(S / P * 16 * 0.0625, "em")
  } : {};
  b && (A.attributes[X] = ""), f && (A.children.push({
    tag: "title",
    attributes: {
      id: A.attributes["aria-labelledby"] || "title-".concat(l || lt())
    },
    children: [f]
  }), delete A.attributes.title);
  var _ = c(c({}, A), {}, {
    prefix: r,
    iconName: o,
    main: a,
    mask: e,
    maskId: u,
    transform: i,
    symbol: s,
    styles: c(c({}, I), m.styles)
  }), U = e.found && a.found ? L("generateAbstractMask", _) || {
    children: [],
    attributes: {}
  } : L("generateAbstractIcon", _) || {
    children: [],
    attributes: {}
  }, H = U.children, It = U.attributes;
  return _.children = H, _.attributes = It, s ? ye(_) : he(_);
}
function En(t) {
  var n = t.content, a = t.width, e = t.height, r = t.transform, o = t.title, i = t.extra, s = t.watchable, f = s === void 0 ? !1 : s, u = c(c(c({}, i.attributes), o ? {
    title: o
  } : {}), {}, {
    class: i.classes.join(" ")
  });
  f && (u[X] = "");
  var l = c({}, i.styles);
  on(r) && (l.transform = Ka({
    transform: r,
    startCentered: !0,
    width: a,
    height: e
  }), l["-webkit-transform"] = l.transform);
  var m = Ct(l);
  m.length > 0 && (u.style = m);
  var v = [];
  return v.push({
    tag: "span",
    attributes: u,
    children: [n]
  }), o && v.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [o]
  }), v;
}
function ke(t) {
  var n = t.content, a = t.title, e = t.extra, r = c(c(c({}, e.attributes), a ? {
    title: a
  } : {}), {}, {
    class: e.classes.join(" ")
  }), o = Ct(e.styles);
  o.length > 0 && (r.style = o);
  var i = [];
  return i.push({
    tag: "span",
    attributes: r,
    children: [n]
  }), a && i.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [a]
  }), i;
}
var Lt = O.styles;
function qt(t) {
  var n = t[0], a = t[1], e = t.slice(4), r = Zt(e, 1), o = r[0], i = null;
  return Array.isArray(o) ? i = {
    tag: "g",
    attributes: {
      class: "".concat(d.cssPrefix, "-").concat(W.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(d.cssPrefix, "-").concat(W.SECONDARY),
        fill: "currentColor",
        d: o[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(d.cssPrefix, "-").concat(W.PRIMARY),
        fill: "currentColor",
        d: o[1]
      }
    }]
  } : i = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: o
    }
  }, {
    found: !0,
    width: n,
    height: a,
    icon: i
  };
}
var we = {
  found: !1,
  width: 512,
  height: 512
};
function xe(t, n) {
  !Gn && !d.showMissingIcons && t && console.error('Icon with name "'.concat(t, '" and prefix "').concat(n, '" is missing.'));
}
function Kt(t, n) {
  var a = n;
  return n === "fa" && d.styleDefault !== null && (n = j()), new Promise(function(e, r) {
    if (L("missingIconAbstract"), a === "fa") {
      var o = ra(t) || {};
      t = o.iconName || t, n = o.prefix || n;
    }
    if (t && n && Lt[n] && Lt[n][t]) {
      var i = Lt[n][t];
      return e(qt(i));
    }
    xe(t, n), e(c(c({}, we), {}, {
      icon: d.showMissingIcons && t ? L("missingIconAbstract") || {} : {}
    }));
  });
}
var Sn = function() {
}, Qt = d.measurePerformance && dt && dt.mark && dt.measure ? dt : {
  mark: Sn,
  measure: Sn
}, at = 'FA "6.4.0"', Ae = function(n) {
  return Qt.mark("".concat(at, " ").concat(n, " begins")), function() {
    return oa(n);
  };
}, oa = function(n) {
  Qt.mark("".concat(at, " ").concat(n, " ends")), Qt.measure("".concat(at, " ").concat(n), "".concat(at, " ").concat(n, " begins"), "".concat(at, " ").concat(n, " ends"));
}, un = {
  begin: Ae,
  end: oa
}, xt = function() {
};
function Cn(t) {
  var n = t.getAttribute ? t.getAttribute(X) : null;
  return typeof n == "string";
}
function _e(t) {
  var n = t.getAttribute ? t.getAttribute(nn) : null, a = t.getAttribute ? t.getAttribute(an) : null;
  return n && a;
}
function Ee(t) {
  return t && t.classList && t.classList.contains && t.classList.contains(d.replacementClass);
}
function Se() {
  if (d.autoReplaceSvg === !0)
    return At.replace;
  var t = At[d.autoReplaceSvg];
  return t || At.replace;
}
function Ce(t) {
  return h.createElementNS("http://www.w3.org/2000/svg", t);
}
function Pe(t) {
  return h.createElement(t);
}
function sa(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.ceFn, e = a === void 0 ? t.tag === "svg" ? Ce : Pe : a;
  if (typeof t == "string")
    return h.createTextNode(t);
  var r = e(t.tag);
  Object.keys(t.attributes || []).forEach(function(i) {
    r.setAttribute(i, t.attributes[i]);
  });
  var o = t.children || [];
  return o.forEach(function(i) {
    r.appendChild(sa(i, {
      ceFn: e
    }));
  }), r;
}
function Oe(t) {
  var n = " ".concat(t.outerHTML, " ");
  return n = "".concat(n, "Font Awesome fontawesome.com "), n;
}
var At = {
  replace: function(n) {
    var a = n[0];
    if (a.parentNode)
      if (n[1].forEach(function(r) {
        a.parentNode.insertBefore(sa(r), a);
      }), a.getAttribute(X) === null && d.keepOriginalSource) {
        var e = h.createComment(Oe(a));
        a.parentNode.replaceChild(e, a);
      } else
        a.remove();
  },
  nest: function(n) {
    var a = n[0], e = n[1];
    if (~rn(a).indexOf(d.replacementClass))
      return At.replace(n);
    var r = new RegExp("".concat(d.cssPrefix, "-.*"));
    if (delete e[0].attributes.id, e[0].attributes.class) {
      var o = e[0].attributes.class.split(" ").reduce(function(s, f) {
        return f === d.replacementClass || f.match(r) ? s.toSvg.push(f) : s.toNode.push(f), s;
      }, {
        toNode: [],
        toSvg: []
      });
      e[0].attributes.class = o.toSvg.join(" "), o.toNode.length === 0 ? a.removeAttribute("class") : a.setAttribute("class", o.toNode.join(" "));
    }
    var i = e.map(function(s) {
      return mt(s);
    }).join(`
`);
    a.setAttribute(X, ""), a.innerHTML = i;
  }
};
function Pn(t) {
  t();
}
function fa(t, n) {
  var a = typeof n == "function" ? n : xt;
  if (t.length === 0)
    a();
  else {
    var e = Pn;
    d.mutateApproach === Ma && (e = $.requestAnimationFrame || Pn), e(function() {
      var r = Se(), o = un.begin("mutate");
      t.map(r), o(), a();
    });
  }
}
var mn = !1;
function la() {
  mn = !0;
}
function Jt() {
  mn = !1;
}
var St = null;
function On(t) {
  if (hn && d.observeMutations) {
    var n = t.treeCallback, a = n === void 0 ? xt : n, e = t.nodeCallback, r = e === void 0 ? xt : e, o = t.pseudoElementsCallback, i = o === void 0 ? xt : o, s = t.observeMutationsRoot, f = s === void 0 ? h : s;
    St = new hn(function(u) {
      if (!mn) {
        var l = j();
        tt(u).forEach(function(m) {
          if (m.type === "childList" && m.addedNodes.length > 0 && !Cn(m.addedNodes[0]) && (d.searchPseudoElements && i(m.target), a(m.target)), m.type === "attributes" && m.target.parentNode && d.searchPseudoElements && i(m.target.parentNode), m.type === "attributes" && Cn(m.target) && ~ja.indexOf(m.attributeName))
            if (m.attributeName === "class" && _e(m.target)) {
              var v = Ot(rn(m.target)), b = v.prefix, x = v.iconName;
              m.target.setAttribute(nn, b || l), x && m.target.setAttribute(an, x);
            } else
              Ee(m.target) && r(m.target);
        });
      }
    }), D && St.observe(f, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}
function Ne() {
  St && St.disconnect();
}
function Ie(t) {
  var n = t.getAttribute("style"), a = [];
  return n && (a = n.split(";").reduce(function(e, r) {
    var o = r.split(":"), i = o[0], s = o.slice(1);
    return i && s.length > 0 && (e[i] = s.join(":").trim()), e;
  }, {})), a;
}
function Te(t) {
  var n = t.getAttribute("data-prefix"), a = t.getAttribute("data-icon"), e = t.innerText !== void 0 ? t.innerText.trim() : "", r = Ot(rn(t));
  return r.prefix || (r.prefix = j()), n && a && (r.prefix = n, r.iconName = a), r.iconName && r.prefix || (r.prefix && e.length > 0 && (r.iconName = le(r.prefix, t.innerText) || fn(r.prefix, Gt(t.innerText))), !r.iconName && d.autoFetchSvg && t.firstChild && t.firstChild.nodeType === Node.TEXT_NODE && (r.iconName = t.firstChild.data)), r;
}
function Me(t) {
  var n = tt(t.attributes).reduce(function(r, o) {
    return r.name !== "class" && r.name !== "style" && (r[o.name] = o.value), r;
  }, {}), a = t.getAttribute("title"), e = t.getAttribute("data-fa-title-id");
  return d.autoA11y && (a ? n["aria-labelledby"] = "".concat(d.replacementClass, "-title-").concat(e || lt()) : (n["aria-hidden"] = "true", n.focusable = "false")), n;
}
function Re() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: T,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function Nn(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  }, a = Te(t), e = a.iconName, r = a.prefix, o = a.rest, i = Me(t), s = Xt("parseNodeAttributes", {}, t), f = n.styleParser ? Ie(t) : [];
  return c({
    iconName: e,
    title: t.getAttribute("title"),
    titleId: t.getAttribute("data-fa-title-id"),
    prefix: r,
    transform: T,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: o,
      styles: f,
      attributes: i
    }
  }, s);
}
var Le = O.styles;
function ca(t) {
  var n = d.autoReplaceSvg === "nest" ? Nn(t, {
    styleParser: !1
  }) : Nn(t);
  return ~n.extra.classes.indexOf(Bn) ? L("generateLayersText", t, n) : L("generateSvgReplacementMutation", t, n);
}
var Y = /* @__PURE__ */ new Set();
en.map(function(t) {
  Y.add("fa-".concat(t));
});
Object.keys(it[g]).map(Y.add.bind(Y));
Object.keys(it[y]).map(Y.add.bind(Y));
Y = ct(Y);
function In(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!D)
    return Promise.resolve();
  var a = h.documentElement.classList, e = function(m) {
    return a.add("".concat(yn, "-").concat(m));
  }, r = function(m) {
    return a.remove("".concat(yn, "-").concat(m));
  }, o = d.autoFetchSvg ? Y : en.map(function(l) {
    return "fa-".concat(l);
  }).concat(Object.keys(Le));
  o.includes("fa") || o.push("fa");
  var i = [".".concat(Bn, ":not([").concat(X, "])")].concat(o.map(function(l) {
    return ".".concat(l, ":not([").concat(X, "])");
  })).join(", ");
  if (i.length === 0)
    return Promise.resolve();
  var s = [];
  try {
    s = tt(t.querySelectorAll(i));
  } catch {
  }
  if (s.length > 0)
    e("pending"), r("complete");
  else
    return Promise.resolve();
  var f = un.begin("onTree"), u = s.reduce(function(l, m) {
    try {
      var v = ca(m);
      v && l.push(v);
    } catch (b) {
      Gn || b.name === "MissingIcon" && console.error(b);
    }
    return l;
  }, []);
  return new Promise(function(l, m) {
    Promise.all(u).then(function(v) {
      fa(v, function() {
        e("active"), e("complete"), r("pending"), typeof n == "function" && n(), f(), l();
      });
    }).catch(function(v) {
      f(), m(v);
    });
  });
}
function De(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  ca(t).then(function(a) {
    a && fa([a], n);
  });
}
function Fe(t) {
  return function(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = (n || {}).icon ? n : Vt(n || {}), r = a.mask;
    return r && (r = (r || {}).icon ? r : Vt(r || {})), t(e, c(c({}, a), {}, {
      mask: r
    }));
  };
}
var ze = function(n) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = a.transform, r = e === void 0 ? T : e, o = a.symbol, i = o === void 0 ? !1 : o, s = a.mask, f = s === void 0 ? null : s, u = a.maskId, l = u === void 0 ? null : u, m = a.title, v = m === void 0 ? null : m, b = a.titleId, x = b === void 0 ? null : b, S = a.classes, P = S === void 0 ? [] : S, N = a.attributes, w = N === void 0 ? {} : N, A = a.styles, I = A === void 0 ? {} : A;
  if (n) {
    var _ = n.prefix, U = n.iconName, H = n.icon;
    return Nt(c({
      type: "icon"
    }, n), function() {
      return V("beforeDOMElementCreation", {
        iconDefinition: n,
        params: a
      }), d.autoA11y && (v ? w["aria-labelledby"] = "".concat(d.replacementClass, "-title-").concat(x || lt()) : (w["aria-hidden"] = "true", w.focusable = "false")), cn({
        icons: {
          main: qt(H),
          mask: f ? qt(f.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: _,
        iconName: U,
        transform: c(c({}, T), r),
        symbol: i,
        title: v,
        maskId: l,
        titleId: x,
        extra: {
          attributes: w,
          styles: I,
          classes: P
        }
      });
    });
  }
}, $e = {
  mixout: function() {
    return {
      icon: Fe(ze)
    };
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(a) {
        return a.treeCallback = In, a.nodeCallback = De, a;
      }
    };
  },
  provides: function(n) {
    n.i2svg = function(a) {
      var e = a.node, r = e === void 0 ? h : e, o = a.callback, i = o === void 0 ? function() {
      } : o;
      return In(r, i);
    }, n.generateSvgReplacementMutation = function(a, e) {
      var r = e.iconName, o = e.title, i = e.titleId, s = e.prefix, f = e.transform, u = e.symbol, l = e.mask, m = e.maskId, v = e.extra;
      return new Promise(function(b, x) {
        Promise.all([Kt(r, s), l.iconName ? Kt(l.iconName, l.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function(S) {
          var P = Zt(S, 2), N = P[0], w = P[1];
          b([a, cn({
            icons: {
              main: N,
              mask: w
            },
            prefix: s,
            iconName: r,
            transform: f,
            symbol: u,
            maskId: m,
            title: o,
            titleId: i,
            extra: v,
            watchable: !0
          })]);
        }).catch(x);
      });
    }, n.generateAbstractIcon = function(a) {
      var e = a.children, r = a.attributes, o = a.main, i = a.transform, s = a.styles, f = Ct(s);
      f.length > 0 && (r.style = f);
      var u;
      return on(i) && (u = L("generateAbstractTransformGrouping", {
        main: o,
        transform: i,
        containerWidth: o.width,
        iconWidth: o.width
      })), e.push(u || o.icon), {
        children: e,
        attributes: r
      };
    };
  }
}, je = {
  mixout: function() {
    return {
      layer: function(a) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.classes, o = r === void 0 ? [] : r;
        return Nt({
          type: "layer"
        }, function() {
          V("beforeDOMElementCreation", {
            assembler: a,
            params: e
          });
          var i = [];
          return a(function(s) {
            Array.isArray(s) ? s.map(function(f) {
              i = i.concat(f.abstract);
            }) : i = i.concat(s.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(d.cssPrefix, "-layers")].concat(ct(o)).join(" ")
            },
            children: i
          }];
        });
      }
    };
  }
}, Ye = {
  mixout: function() {
    return {
      counter: function(a) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.title, o = r === void 0 ? null : r, i = e.classes, s = i === void 0 ? [] : i, f = e.attributes, u = f === void 0 ? {} : f, l = e.styles, m = l === void 0 ? {} : l;
        return Nt({
          type: "counter",
          content: a
        }, function() {
          return V("beforeDOMElementCreation", {
            content: a,
            params: e
          }), ke({
            content: a.toString(),
            title: o,
            extra: {
              attributes: u,
              styles: m,
              classes: ["".concat(d.cssPrefix, "-layers-counter")].concat(ct(s))
            }
          });
        });
      }
    };
  }
}, Ue = {
  mixout: function() {
    return {
      text: function(a) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = e.transform, o = r === void 0 ? T : r, i = e.title, s = i === void 0 ? null : i, f = e.classes, u = f === void 0 ? [] : f, l = e.attributes, m = l === void 0 ? {} : l, v = e.styles, b = v === void 0 ? {} : v;
        return Nt({
          type: "text",
          content: a
        }, function() {
          return V("beforeDOMElementCreation", {
            content: a,
            params: e
          }), En({
            content: a,
            transform: c(c({}, T), o),
            title: s,
            extra: {
              attributes: m,
              styles: b,
              classes: ["".concat(d.cssPrefix, "-layers-text")].concat(ct(u))
            }
          });
        });
      }
    };
  },
  provides: function(n) {
    n.generateLayersText = function(a, e) {
      var r = e.title, o = e.transform, i = e.extra, s = null, f = null;
      if (Un) {
        var u = parseInt(getComputedStyle(a).fontSize, 10), l = a.getBoundingClientRect();
        s = l.width / u, f = l.height / u;
      }
      return d.autoA11y && !r && (i.attributes["aria-hidden"] = "true"), Promise.resolve([a, En({
        content: a.innerHTML,
        width: s,
        height: f,
        transform: o,
        title: r,
        extra: i,
        watchable: !0
      })]);
    };
  }
}, He = new RegExp('"', "ug"), Tn = [1105920, 1112319];
function We(t) {
  var n = t.replace(He, ""), a = ee(n, 0), e = a >= Tn[0] && a <= Tn[1], r = n.length === 2 ? n[0] === n[1] : !1;
  return {
    value: Gt(r ? n[0] : n),
    isSecondary: e || r
  };
}
function Mn(t, n) {
  var a = "".concat(Ta).concat(n.replace(":", "-"));
  return new Promise(function(e, r) {
    if (t.getAttribute(a) !== null)
      return e();
    var o = tt(t.children), i = o.filter(function(H) {
      return H.getAttribute(Wt) === n;
    })[0], s = $.getComputedStyle(t, n), f = s.getPropertyValue("font-family").match(Fa), u = s.getPropertyValue("font-weight"), l = s.getPropertyValue("content");
    if (i && !f)
      return t.removeChild(i), e();
    if (f && l !== "none" && l !== "") {
      var m = s.getPropertyValue("content"), v = ~["Sharp"].indexOf(f[2]) ? y : g, b = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(f[2]) ? ot[v][f[2].toLowerCase()] : za[v][u], x = We(m), S = x.value, P = x.isSecondary, N = f[0].startsWith("FontAwesome"), w = fn(b, S), A = w;
      if (N) {
        var I = ce(S);
        I.iconName && I.prefix && (w = I.iconName, b = I.prefix);
      }
      if (w && !P && (!i || i.getAttribute(nn) !== b || i.getAttribute(an) !== A)) {
        t.setAttribute(a, A), i && t.removeChild(i);
        var _ = Re(), U = _.extra;
        U.attributes[Wt] = n, Kt(w, b).then(function(H) {
          var It = cn(c(c({}, _), {}, {
            icons: {
              main: H,
              mask: ln()
            },
            prefix: b,
            iconName: A,
            extra: U,
            watchable: !0
          })), F = h.createElement("svg");
          n === "::before" ? t.insertBefore(F, t.firstChild) : t.appendChild(F), F.outerHTML = It.map(function(ua) {
            return mt(ua);
          }).join(`
`), t.removeAttribute(a), e();
        }).catch(r);
      } else
        e();
    } else
      e();
  });
}
function Ge(t) {
  return Promise.all([Mn(t, "::before"), Mn(t, "::after")]);
}
function Be(t) {
  return t.parentNode !== document.head && !~Ra.indexOf(t.tagName.toUpperCase()) && !t.getAttribute(Wt) && (!t.parentNode || t.parentNode.tagName !== "svg");
}
function Rn(t) {
  if (D)
    return new Promise(function(n, a) {
      var e = tt(t.querySelectorAll("*")).filter(Be).map(Ge), r = un.begin("searchPseudoElements");
      la(), Promise.all(e).then(function() {
        r(), Jt(), n();
      }).catch(function() {
        r(), Jt(), a();
      });
    });
}
var Xe = {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(a) {
        return a.pseudoElementsCallback = Rn, a;
      }
    };
  },
  provides: function(n) {
    n.pseudoElements2svg = function(a) {
      var e = a.node, r = e === void 0 ? h : e;
      d.searchPseudoElements && Rn(r);
    };
  }
}, Ln = !1, Ve = {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          la(), Ln = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        On(Xt("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        Ne();
      },
      watch: function(a) {
        var e = a.observeMutationsRoot;
        Ln ? Jt() : On(Xt("mutationObserverCallbacks", {
          observeMutationsRoot: e
        }));
      }
    };
  }
}, Dn = function(n) {
  var a = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return n.toLowerCase().split(" ").reduce(function(e, r) {
    var o = r.toLowerCase().split("-"), i = o[0], s = o.slice(1).join("-");
    if (i && s === "h")
      return e.flipX = !0, e;
    if (i && s === "v")
      return e.flipY = !0, e;
    if (s = parseFloat(s), isNaN(s))
      return e;
    switch (i) {
      case "grow":
        e.size = e.size + s;
        break;
      case "shrink":
        e.size = e.size - s;
        break;
      case "left":
        e.x = e.x - s;
        break;
      case "right":
        e.x = e.x + s;
        break;
      case "up":
        e.y = e.y - s;
        break;
      case "down":
        e.y = e.y + s;
        break;
      case "rotate":
        e.rotate = e.rotate + s;
        break;
    }
    return e;
  }, a);
}, qe = {
  mixout: function() {
    return {
      parse: {
        transform: function(a) {
          return Dn(a);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(a, e) {
        var r = e.getAttribute("data-fa-transform");
        return r && (a.transform = Dn(r)), a;
      }
    };
  },
  provides: function(n) {
    n.generateAbstractTransformGrouping = function(a) {
      var e = a.main, r = a.transform, o = a.containerWidth, i = a.iconWidth, s = {
        transform: "translate(".concat(o / 2, " 256)")
      }, f = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), u = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), l = "rotate(".concat(r.rotate, " 0 0)"), m = {
        transform: "".concat(f, " ").concat(u, " ").concat(l)
      }, v = {
        transform: "translate(".concat(i / 2 * -1, " -256)")
      }, b = {
        outer: s,
        inner: m,
        path: v
      };
      return {
        tag: "g",
        attributes: c({}, b.outer),
        children: [{
          tag: "g",
          attributes: c({}, b.inner),
          children: [{
            tag: e.icon.tag,
            children: e.icon.children,
            attributes: c(c({}, e.icon.attributes), b.path)
          }]
        }]
      };
    };
  }
}, Dt = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function Fn(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return t.attributes && (t.attributes.fill || n) && (t.attributes.fill = "black"), t;
}
function Ke(t) {
  return t.tag === "g" ? t.children : [t];
}
var Qe = {
  hooks: function() {
    return {
      parseNodeAttributes: function(a, e) {
        var r = e.getAttribute("data-fa-mask"), o = r ? Ot(r.split(" ").map(function(i) {
          return i.trim();
        })) : ln();
        return o.prefix || (o.prefix = j()), a.mask = o, a.maskId = e.getAttribute("data-fa-mask-id"), a;
      }
    };
  },
  provides: function(n) {
    n.generateAbstractMask = function(a) {
      var e = a.children, r = a.attributes, o = a.main, i = a.mask, s = a.maskId, f = a.transform, u = o.width, l = o.icon, m = i.width, v = i.icon, b = qa({
        transform: f,
        containerWidth: m,
        iconWidth: u
      }), x = {
        tag: "rect",
        attributes: c(c({}, Dt), {}, {
          fill: "white"
        })
      }, S = l.children ? {
        children: l.children.map(Fn)
      } : {}, P = {
        tag: "g",
        attributes: c({}, b.inner),
        children: [Fn(c({
          tag: l.tag,
          attributes: c(c({}, l.attributes), b.path)
        }, S))]
      }, N = {
        tag: "g",
        attributes: c({}, b.outer),
        children: [P]
      }, w = "mask-".concat(s || lt()), A = "clip-".concat(s || lt()), I = {
        tag: "mask",
        attributes: c(c({}, Dt), {}, {
          id: w,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [x, N]
      }, _ = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: A
          },
          children: Ke(v)
        }, I]
      };
      return e.push(_, {
        tag: "rect",
        attributes: c({
          fill: "currentColor",
          "clip-path": "url(#".concat(A, ")"),
          mask: "url(#".concat(w, ")")
        }, Dt)
      }), {
        children: e,
        attributes: r
      };
    };
  }
}, Je = {
  provides: function(n) {
    var a = !1;
    $.matchMedia && (a = $.matchMedia("(prefers-reduced-motion: reduce)").matches), n.missingIconAbstract = function() {
      var e = [], r = {
        fill: "currentColor"
      }, o = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      e.push({
        tag: "path",
        attributes: c(c({}, r), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var i = c(c({}, o), {}, {
        attributeName: "opacity"
      }), s = {
        tag: "circle",
        attributes: c(c({}, r), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return a || s.children.push({
        tag: "animate",
        attributes: c(c({}, o), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: c(c({}, i), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), e.push(s), e.push({
        tag: "path",
        attributes: c(c({}, r), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: a ? [] : [{
          tag: "animate",
          attributes: c(c({}, i), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), a || e.push({
        tag: "path",
        attributes: c(c({}, r), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: c(c({}, i), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: e
      };
    };
  }
}, Ze = {
  hooks: function() {
    return {
      parseNodeAttributes: function(a, e) {
        var r = e.getAttribute("data-fa-symbol"), o = r === null ? !1 : r === "" ? !0 : r;
        return a.symbol = o, a;
      }
    };
  }
}, tr = [Ja, $e, je, Ye, Ue, Xe, Ve, qe, Qe, Je, Ze];
de(tr, {
  mixoutsTo: E
});
E.noAuto;
E.config;
var nr = E.library;
E.dom;
E.parse;
E.findIconDefinition;
E.toHtml;
E.icon;
E.layer;
E.text;
E.counter;
var ar = {
  prefix: "fas",
  iconName: "house",
  icon: [576, 512, [127968, 63498, 63500, "home", "home-alt", "home-lg-alt"], "f015", "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]
}, B = /* @__PURE__ */ ((t) => (t.XS = "xs", t.S = "s", t.M = "m", t.L = "l", t))(B || {}), p = /* @__PURE__ */ ((t) => (t.DEFAULT = "default", t.PRIMARY = "primary", t.SUCCESS = "success", t.DANGER = "danger", t.WARNING = "warning", t.PREMIUM = "premium", t))(p || {});
class er {
  constructor(n, a, ...e) {
    nt(this, "callback");
    nt(this, "args");
    nt(this, "wait");
    nt(this, "timeOutID");
    this.callback = n, this.wait = a, this.args = e;
  }
  debounce(...n) {
    this.timeOutID && window.clearTimeout(this.timeOutID), this.timeOutID = window.setTimeout(() => {
      this.callback.apply(null, [...this.args, ...n]);
    }, this.wait);
  }
}
const Ft = /* @__PURE__ */ new Map([
  [p.DEFAULT, "button-type__default"],
  [p.PRIMARY, "button-type__primary"],
  [p.SUCCESS, "button-type__success"],
  [p.DANGER, "button-type__danger"],
  [p.WARNING, "button-type__warning"],
  [p.PREMIUM, "button-type__premium"]
]), C = "cursor-pointer", zt = /* @__PURE__ */ new Map([
  [
    p.DEFAULT,
    `${C} button-type__default__hover`
  ],
  [
    p.PRIMARY,
    `${C} button-type__primary__hover`
  ],
  [
    p.SUCCESS,
    `${C} button-type__success__hover`
  ],
  [p.DANGER, `${C} button-type__danger__hover`],
  [
    p.WARNING,
    `${C} button-type__warning__hover`
  ],
  [
    p.PREMIUM,
    `${C} button-type__premium__hover`
  ]
]), $t = /* @__PURE__ */ new Map([
  [
    p.DEFAULT,
    `${C} button-type__default__active`
  ],
  [
    p.PRIMARY,
    `${C} button-type__primary__active`
  ],
  [
    p.SUCCESS,
    `${C} button-type__success__active`
  ],
  [
    p.DANGER,
    `${C} button-type__danger__active`
  ],
  [
    p.WARNING,
    `${C} button-type__warning__active`
  ],
  [
    p.PREMIUM,
    `${C} button-type__premium__active`
  ]
]), q = "cursor-not-allowed", jt = /* @__PURE__ */ new Map([
  [
    p.DEFAULT,
    `${q} button-type__default__disabled`
  ],
  [
    p.PRIMARY,
    `${q} button-type__primary__disabled`
  ],
  [
    p.SUCCESS,
    `${q} button-type__success__disabled`
  ],
  [
    p.DANGER,
    `${q} button-type__danger__disabled`
  ],
  [
    p.WARNING,
    `${q} button-type__warning__disabled`
  ],
  [
    p.PREMIUM,
    `${q} button-type__premium__disabled`
  ]
]), Yt = /* @__PURE__ */ new Map([
  [B.XS, "sizing__xs"],
  [B.S, "sizing__s"],
  [B.M, "sizing__m"],
  [B.L, "sizing__l"]
]), rr = (t) => (Ft.has(t) ? Ft.get(t) : Ft.get(p.DEFAULT)) || "", ir = (t) => (zt.has(t) ? zt.get(t) : zt.get(p.DEFAULT)) || "", or = (t) => ($t.has(t) ? $t.get(t) : $t.get(p.DEFAULT)) || "", sr = (t) => (jt.has(t) ? jt.get(t) : jt.get(p.DEFAULT)) || "", fr = (t) => (Yt.has(t) ? Yt.get(t) : Yt.get(B.M)) || "", mr = /* @__PURE__ */ va({
  __name: "EtButton",
  props: {
    disabled: { default: !1 },
    readonly: { default: !1 },
    active: { default: !1 },
    size: { default: B.M },
    type: { default: p.DEFAULT }
  },
  emits: ["click", "focus", "blur"],
  setup(t, { expose: n, emit: a }) {
    const e = t, r = (l) => {
      if (e.disabled || e.readonly) {
        l.preventDefault();
        return;
      }
      a("click", l);
    }, o = () => {
      var l;
      return (l = f == null ? void 0 : f.value) == null ? void 0 : l.focus();
    }, i = () => {
      var l;
      return (l = f == null ? void 0 : f.value) == null ? void 0 : l.blur();
    }, s = new er(r, 100), f = pa(null), u = ba(() => [
      rr(e.type),
      fr(e.size),
      !e.disabled && !e.readonly ? ir(e.type) : "",
      !e.disabled && e.active ? or(e.type) : "",
      e.disabled ? sr(e.type) : ""
    ].join(" "));
    return n({
      focus: o,
      blur: i
    }), (l, m) => (ga(), ha("button", {
      ref_key: "elButton",
      ref: f,
      class: ya(["et-button border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default", Tt(u)]),
      onMouseup: m[0] || (m[0] = ka((v) => Tt(s).debounce(v), ["left", "stop"])),
      onKeyup: m[1] || (m[1] = wa((v) => Tt(s).debounce(v), ["enter"])),
      onFocus: m[2] || (m[2] = (v) => a("focus")),
      onBlur: m[3] || (m[3] = (v) => a("blur"))
    }, [
      xa(l.$slots, "default")
    ], 34));
  }
});
nr.add(ar);
export {
  mr as EtButton,
  ur as Sonar
};
