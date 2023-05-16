var R = Object.defineProperty;
var E = (t, s, u) => s in t ? R(t, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : t[s] = u;
var c = (t, s, u) => (E(t, typeof s != "symbol" ? s + "" : s, u), u);
import { defineComponent as C, ref as $, computed as h, openBlock as T, createElementBlock as N, normalizeClass as S, unref as d, withModifiers as L, withKeys as U, renderSlot as k } from "vue";
class O {
  ping() {
    return "PING!";
  }
}
var _ = /* @__PURE__ */ ((t) => (t.XS = "xs", t.S = "s", t.M = "m", t.L = "l", t))(_ || {}), e = /* @__PURE__ */ ((t) => (t.DEFAULT = "default", t.PRIMARY = "primary", t.SUCCESS = "success", t.DANGER = "danger", t.WARNING = "warning", t.PREMIUM = "premium", t))(e || {});
class F {
  constructor(s, u, ...n) {
    c(this, "callback");
    c(this, "args");
    c(this, "wait");
    c(this, "timeOutID");
    this.callback = s, this.wait = u, this.args = n;
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
]), o = "cursor-pointer", y = /* @__PURE__ */ new Map([
  [
    e.DEFAULT,
    `${o} button-type__default__hover`
  ],
  [
    e.PRIMARY,
    `${o} button-type__primary__hover`
  ],
  [
    e.SUCCESS,
    `${o} button-type__success__hover`
  ],
  [e.DANGER, `${o} button-type__danger__hover`],
  [
    e.WARNING,
    `${o} button-type__warning__hover`
  ],
  [
    e.PREMIUM,
    `${o} button-type__premium__hover`
  ]
]), m = /* @__PURE__ */ new Map([
  [
    e.DEFAULT,
    `${o} button-type__default__active`
  ],
  [
    e.PRIMARY,
    `${o} button-type__primary__active`
  ],
  [
    e.SUCCESS,
    `${o} button-type__success__active`
  ],
  [
    e.DANGER,
    `${o} button-type__danger__active`
  ],
  [
    e.WARNING,
    `${o} button-type__warning__active`
  ],
  [
    e.PREMIUM,
    `${o} button-type__premium__active`
  ]
]), l = "cursor-not-allowed", f = /* @__PURE__ */ new Map([
  [
    e.DEFAULT,
    `${l} button-type__default__disabled`
  ],
  [
    e.PRIMARY,
    `${l} button-type__primary__disabled`
  ],
  [
    e.SUCCESS,
    `${l} button-type__success__disabled`
  ],
  [
    e.DANGER,
    `${l} button-type__danger__disabled`
  ],
  [
    e.WARNING,
    `${l} button-type__warning__disabled`
  ],
  [
    e.PREMIUM,
    `${l} button-type__premium__disabled`
  ]
]), M = /* @__PURE__ */ new Map([
  [_.XS, "sizing__xs"],
  [_.S, "sizing__s"],
  [_.M, "sizing__m"],
  [_.L, "sizing__l"]
]), B = (t) => (b.has(t) ? b.get(t) : b.get(e.DEFAULT)) || "", z = (t) => (y.has(t) ? y.get(t) : y.get(e.DEFAULT)) || "", G = (t) => (m.has(t) ? m.get(t) : m.get(e.DEFAULT)) || "", I = (t) => (f.has(t) ? f.get(t) : f.get(e.DEFAULT)) || "", P = (t) => (M.has(t) ? M.get(t) : M.get(_.M)) || "", H = /* @__PURE__ */ C({
  __name: "EtButton",
  props: {
    disabled: { default: !1 },
    readonly: { default: !1 },
    active: { default: !1 },
    size: { default: _.M },
    type: { default: e.DEFAULT }
  },
  emits: ["click", "focus", "blur"],
  setup(t, { expose: s, emit: u }) {
    const n = t, A = (a) => {
      if (n.disabled || n.readonly) {
        a.preventDefault();
        return;
      }
      u("click", a);
    }, v = () => {
      var a;
      return (a = i == null ? void 0 : i.value) == null ? void 0 : a.focus();
    }, w = () => {
      var a;
      return (a = i == null ? void 0 : i.value) == null ? void 0 : a.blur();
    }, g = new F(A, 100), i = $(null), D = h(() => [
      B(n.type),
      P(n.size),
      !n.disabled && !n.readonly ? z(n.type) : "",
      !n.disabled && n.active ? G(n.type) : "",
      n.disabled ? I(n.type) : ""
    ].join(" "));
    return s({
      focus: v,
      blur: w
    }), (a, r) => (T(), N("button", {
      ref_key: "elButton",
      ref: i,
      class: S(["et-button border-2 rounded drop-shadow-sm whitespace-nowrap inline-block cursor-default", d(D)]),
      onMouseup: r[0] || (r[0] = L((p) => d(g).debounce(p), ["left", "stop"])),
      onKeyup: r[1] || (r[1] = U((p) => d(g).debounce(p), ["enter"])),
      onFocus: r[2] || (r[2] = (p) => u("focus")),
      onBlur: r[3] || (r[3] = (p) => u("blur"))
    }, [
      k(a.$slots, "default")
    ], 34));
  }
});
export {
  H as EtButton,
  O as Sonar
};
