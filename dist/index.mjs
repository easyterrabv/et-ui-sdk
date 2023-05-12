import { defineComponent as n, openBlock as e, createElementBlock as r, toDisplayString as s } from "vue";
class l {
  ping() {
    return "PING!";
  }
}
const c = { class: "bg-et-primary-color" }, _ = /* @__PURE__ */ n({
  __name: "etButton",
  props: {
    text: {}
  },
  setup(t) {
    const o = t;
    return (p, a) => (e(), r("button", c, s(o.text), 1));
  }
});
export {
  _ as EtButton,
  l as Sonar
};
