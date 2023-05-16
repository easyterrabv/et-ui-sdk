var R = Object.defineProperty;
var C = (t, s, n) => s in t ? R(t, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[s] = n;
var _ = (t, s, n) => (C(t, typeof s != "symbol" ? s + "" : s, n), n);
import { defineComponent as E, ref as h, computed as v, openBlock as $, createElementBlock as T, normalizeClass as k, unref as c, withModifiers as L, withKeys as N, renderSlot as S } from "vue";
class P {
  ping() {
    return "PING!";
  }
}
var i = /* @__PURE__ */ ((t) => (t.XS = "xs", t.S = "s", t.M = "m", t.L = "l", t))(i || {}), e = /* @__PURE__ */ ((t) => (t.DEFAULT = "default", t.PRIMARY = "primary", t.SUCCESS = "success", t.DANGER = "danger", t.WARNING = "warning", t.PREMIUM = "premium", t))(e || {});
class F {
  constructor(s, n, ...o) {
    _(this, "callback");
    _(this, "args");
    _(this, "wait");
    _(this, "timeOutID");
    this.callback = s, this.wait = n, this.args = o;
  }
  debounce(...s) {
    this.timeOutID && window.clearTimeout(this.timeOutID), this.timeOutID = window.setTimeout(() => {
      this.callback.apply(null, [...this.args, ...s]);
    }, this.wait);
  }
}
const b = /* @__PURE__ */ new Map([
  [e.DEFAULT, "button-type__default"],
  [e.PRIMARY, "button-type__primary"],
  [e.SUCCESS, "button-type__success"],
  [e.DANGER, "button-type__danger"],
  [e.WARNING, "button-type__warning"],
  [e.PREMIUM, "button-type__premium"]
]), l = "cursor-pointer", y = /* @__PURE__ */ new Map([
  [
    e.DEFAULT,
    `${l} button-type__default__hover`
  ],
  [
    e.PRIMARY,
    `${l} button-type__primary__hover`
  ],
  [
    e.SUCCESS,
    `${l} button-type__success__hover`
  ],
  [e.DANGER, `${l} button-type__danger__hover`],
  [
    e.WARNING,
    `${l} button-type__warning__hover`
  ],
  [
    e.PREMIUM,
    `${l} button-type__premium__hover`
  ]
]), p = "cursor-not-allowed", m = /* @__PURE__ */ new Map([
  [
    e.DEFAULT,
    `${p} button-type__default__disabled`
  ],
  [
    e.PRIMARY,
    `${p} button-type__primary__disabled`
  ],
  [
    e.SUCCESS,
    `${p} button-type__success__disabled`
  ],
  [
    e.DANGER,
    `${p} button-type__danger__disabled`
  ],
  [
    e.WARNING,
    `${p} button-type__warning__disabled`
  ],
  [
    e.PREMIUM,
    `${p} button-type__premium__disabled`
  ]
]), f = /* @__PURE__ */ new Map([
  [i.XS, "sizing__xs"],
  [i.S, "sizing__s"],
  [i.M, "sizing__m"],
  [i.L, "sizing__l"]
]), z = (t) => (b.has(t) ? b.get(t) : b.get(e.DEFAULT)) || "", B = (t) => (y.has(t) ? y.get(t) : y.get(e.DEFAULT)) || "", U = (t) => (m.has(t) ? m.get(t) : m.get(e.DEFAULT)) || "", G = (t) => (f.has(t) ? f.get(t) : f.get(i.M)) || "", W = /* @__PURE__ */ E({
  __name: "EtButton",
  props: {
    disabled: { default: !1 },
    readonly: { default: !1 },
    active: { default: !1 },
    size: { default: i.M },
    type: { default: e.DEFAULT }
  },
  emits: ["click", "focus", "blur"],
  setup(t, { expose: s, emit: n }) {
    const o = t, g = (r) => {
      if (o.disabled || o.readonly) {
        r.preventDefault();
        return;
      }
      n("click", r);
    }, w = () => {
      var r;
      return (r = a == null ? void 0 : a.value) == null ? void 0 : r.focus();
    }, D = () => {
      var r;
      return (r = a == null ? void 0 : a.value) == null ? void 0 : r.blur();
    }, M = new F(g, 100), a = h(null), A = v(() => [
      z(o.type),
      G(o.size),
      o.disabled || o.readonly ? "" : B(o.type),
      o.disabled ? U(o.type) : ""
    ].join(" "));
    return s({
      focus: w,
      blur: D
    }), (r, u) => ($(), T("button", {
      ref_key: "elButton",
      ref: a,
      class: k(["border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default", c(A)]),
      onMouseup: u[0] || (u[0] = L((d) => c(M).debounce(d), ["left", "stop"])),
      onKeyup: u[1] || (u[1] = N((d) => c(M).debounce(d), ["enter"])),
      onFocus: u[2] || (u[2] = (d) => n("focus")),
      onBlur: u[3] || (u[3] = (d) => n("blur"))
    }, [
      S(r.$slots, "default")
    ], 34));
  }
});
export {
  W as EtButton,
  P as Sonar
};
