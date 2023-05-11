import { defineComponent as c, openBlock as _, createElementBlock as r, toDisplayString as p } from "vue";
class f {
  ping() {
    return "PING!";
  }
}
const a = { class: "personal-button" }, u = /* @__PURE__ */ c({
  __name: "etButton",
  props: {
    text: {}
  },
  setup(t) {
    const e = t;
    return (o, n) => (_(), r("button", a, p(e.text), 1));
  }
});
const l = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, s] of e)
    o[n] = s;
  return o;
}, d = /* @__PURE__ */ l(u, [["__scopeId", "data-v-31987fc7"]]);
export {
  d as EtButton,
  f as Sonar
};
