import { defineComponent as _, openBlock as c, createElementBlock as r, toDisplayString as p } from "vue";
class d {
  ping() {
    return console.info("ping!"), "PING!";
  }
}
const a = { class: "personal-button" }, u = /* @__PURE__ */ _({
  __name: "button",
  props: {
    text: {}
  },
  setup(t) {
    const e = t;
    return (o, n) => (c(), r("button", a, p(e.text), 1));
  }
});
const l = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, s] of e)
    o[n] = s;
  return o;
}, f = /* @__PURE__ */ l(u, [["__scopeId", "data-v-07dee0e4"]]);
export {
  f as PersonalButton,
  d as Sonar
};
