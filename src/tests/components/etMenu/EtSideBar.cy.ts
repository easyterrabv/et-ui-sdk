import EtSideBar from "src/components/etMenu/EtSideBar.vue";
import { mount } from "cypress/vue";

describe(`<EtSideBar />`, () => {
    it("renders - and collapses", () => {
        mount(EtSideBar).then((component) => {
            const componentInstance = component.component;

            cy.get("aside")
                .should("have.class", "et-side-bar")
                .should("have.class", "w-56");

            cy.wrap(componentInstance).invoke("toggleCollapse");

            cy.get("aside").should("have.class", "w-14");
        });
    });
});
