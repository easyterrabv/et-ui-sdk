import { defineComponent as _, openBlock as c, createElementBlock as r, toDisplayString as a } from "vue";
class d {
  ping() {
    return console.info("ping!"), "PING!";
  }
}
const p = { class: "personal-button" }, u = /* @__PURE__ */ _({
  __name: "button",
  props: {
    text: {}
  },
  setup(t) {
    const o = t;
    return (n, e) => (c(), r("button", p, a(o.text), 1));
  }
});
const l = (t, o) => {
  const n = t.__vccOpts || t;
  for (const [e, s] of o)
    n[e] = s;
  return n;
}, f = /* @__PURE__ */ l(u, [["__scopeId", "data-v-7724ea33"]]);
export {
  f as PersonalButton,
  d as Sonar
};
