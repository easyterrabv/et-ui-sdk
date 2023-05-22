import EtMenuItem from "src/components/etMenu/EtMenuItem.vue";
import { mount } from "cypress/vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHouse,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHouse);

describe(`<EtMenuItem />`, () => {
    it("renders correctly when fully shown", () => {
        mount(EtMenuItem, {
            slots: {
                default: "Hello, World!"
            }
        }).then((component) => {
            cy.wrap(component.wrapper.setProps({
                isActive: false,
                isCollapsed: false
            }));

            cy.get(".et-menu-item").should("have.class", "et-menu-item");

            cy.get(".et-menu-item > div")
                .should("have.class", "w-full")
                .should("not.have.class", "!border-primary");

            cy.get(".et-menu-item-content").should("not.have.class", "hidden");
        });
    });
    it("renders correctly when fully shown and active", () => {
        mount(EtMenuItem, {
            slots: {
                default: "Hello, World!"
            }
        }).then((component) => {
            cy.wrap(component.wrapper.setProps({
                isActive: true,
                isCollapsed: false
            }));

            cy.get(".et-menu-item > div").should("have.class", "!border-primary");
        });
    });

    it("renders correctly when collapsed", () => {
        mount(EtMenuItem, {
            slots: {
                default: "Hello, World!"
            }
        }).then((component) => {
            cy.wrap(component.wrapper.setProps({
                isActive: false,
                isCollapsed: true
            }));

            cy.get(".et-menu-item-content").should("have.class", "hidden");
        });
    });

    it("renders correctly when collapsed and active", () => {
        mount(EtMenuItem, {
            slots: {
                default: "Hello, World!"
            }
        }).then((component) => {
            cy.wrap(component.wrapper.setProps({
                isActive: true,
                isCollapsed: true
            }));

            cy.get(".et-menu-item-content").should("have.class", "hidden");
        });
    });
});
