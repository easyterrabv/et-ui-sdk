import EtInput from "src/components/etForm/EtInput.vue";
import { mount } from "cypress/vue";

describe(`<EtInput />`, () => {
    it("renders a basic input", () => {
        mount(EtInput);
        cy.get(".et-sdk-input-wrapper input").should(
            "have.class",
            "et-sdk-input"
        );
    });

    it("emits on input", () => {
        mount(EtInput).then((component) => {
            const componentInstance = component.component;
            cy.wrap(componentInstance).invoke("focus");
            cy.wrap(componentInstance).invoke(
                "setValue",
                "Hello, setting a value!"
            );
            cy.wrap(componentInstance).invoke("blur");

            const emits = component.wrapper.emitted();
            cy.wrap(emits).should("have.property", "update:modelValue");
            cy.wrap(emits).should("have.property", "focus");
            cy.wrap(emits).should("have.property", "blur");
        });
    });
});
