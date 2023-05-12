import { defineComponent as _, openBlock as c, createElementBlock as r, toDisplayString as a } from "vue";
class d {
  ping() {
    return "PING!";
  }
}
const p = { class: "personal-button" }, u = /* @__PURE__ */ _({
  __name: "etButton",
  props: {
    text: {}
  },
  setup(t) {
    const o = t;
    return (e, n) => (c(), r("button", p, a(o.text), 1));
  }
});
const l = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, s] of o)
    e[n] = s;
  return e;
}, m = /* @__PURE__ */ l(u, [["__scopeId", "data-v-a872b35d"]]);
export {
  m as EtButton,
  d as Sonar
};
