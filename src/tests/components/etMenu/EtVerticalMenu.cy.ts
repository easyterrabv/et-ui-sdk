import EtVerticalMenu from "src/components/etMenu/EtVerticalMenu.vue";
import { mount } from "cypress/vue";

describe(`<EtVerticalMenu />`, () => {
    it("renders - and collapses", () => {
        mount(EtVerticalMenu).then((component) => {
            const componentInstance = component.component;

            cy.get("aside")
                .should("have.class", "et-vertical-menu")
                .should("have.class", "w-56");

            cy.wrap(componentInstance).invoke("toggleCollapse");

            cy.get("aside").should("have.class", "w-14");
        });
    });
});
