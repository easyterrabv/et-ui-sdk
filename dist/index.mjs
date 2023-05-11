import { defineComponent as c, openBlock as _, createElementBlock as r, toDisplayString as p } from "vue";
class f {
  ping() {
    return console.info("ping!"), "PING!";
  }
}
const a = { class: "personal-button" }, u = /* @__PURE__ */ c({
  __name: "etButton",
  props: {
    text: {}
  },
  setup(t) {
    const o = t;
    return (e, n) => (_(), r("button", a, p(o.text), 1));
  }
});
const l = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, s] of o)
    e[n] = s;
  return e;
}, d = /* @__PURE__ */ l(u, [["__scopeId", "data-v-31987fc7"]]);
export {
  d as EtButton,
  f as Sonar
};
