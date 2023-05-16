import { defineComponent as o, openBlock as e, createElementBlock as r, toDisplayString as s } from "vue";
class _ {
  ping() {
    return "PING!";
  }
}
const c = { class: "bg-primary" }, l = /* @__PURE__ */ o({
  __name: "EtButton",
  props: {
    text: {}
  },
  setup(t) {
    const n = t;
    return (p, a) => (e(), r("button", c, s(n.text), 1));
  }
});
export {
  l as EtButton,
  _ as Sonar
};
