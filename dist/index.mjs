import { defineComponent as s, openBlock as _, createElementBlock as r, toDisplayString as p } from "vue";
class f {
  ping() {
    return console.info("ping!"), "PING!";
  }
}
const a = { class: "personal-button" }, u = /* @__PURE__ */ s({
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
  for (const [n, c] of e)
    o[n] = c;
  return o;
}, d = /* @__PURE__ */ l(u, [["__scopeId", "data-v-87c4ec5f"]]);
export {
  d as EtButton,
  f as Sonar
};
