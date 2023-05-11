import { defineComponent as _, openBlock as c, createElementBlock as r, toDisplayString as a } from "vue";
class i {
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
    const e = t;
    return (o, n) => (c(), r("button", p, a(e.text), 1));
  }
});
const l = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, s] of e)
    o[n] = s;
  return o;
}, m = /* @__PURE__ */ l(u, [["__scopeId", "data-v-a872b35d"]]);
export {
  m as EtButton,
  i as Sonar
};
