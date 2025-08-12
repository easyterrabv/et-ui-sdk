import EtButton from "src/components/etButton/EtButton.vue";
import { UI_SIZING, UI_TYPES } from "src/helpers/enums.ts";
import { mount } from "cypress/vue";

describe(`<EtButton />`, () => {
    Object.keys(UI_SIZING).forEach((uiSize) => {
        Object.keys(UI_TYPES).forEach((uiType: string) => {
            it(`renders - ${uiSize} - ${uiType}`, () => {
                mount(EtButton, {
                    props: {
                        type: UI_TYPES[uiType as keyof typeof UI_TYPES],
                        size: UI_SIZING[uiSize as keyof typeof UI_SIZING]
                    },
                    slots: {
                        default: "Render me!"
                    }
                });

                cy.get("button").should("have.class", "et-sdk-button");
            });
        });
    });

    it(`emits click event on click`, () => {
        mount(EtButton, {
            slots: {
                default: "Click Me!"
            }
        });

        cy.get("button")
            .click()
            .then(() => {
                const emits = Cypress.vueWrapper.emitted();
                cy.wrap(emits)
                    .should("have.property", "click")
                    .then(() => {
                        const event = emits.click[0][0];
                        cy.wrap(event).should("be.instanceof", Event);
                    });
            });
    });

    it(`Does not emit click event on click when disabled`, () => {
        mount(EtButton, {
            props: {
                disabled: true
            },
            slots: {
                default: "Click Me!"
            }
        });

        cy.get("button")
            .click()
            .then(() => {
                const emits = Cypress.vueWrapper.emitted();
                cy.wrap(emits).should("not.have.property", "click");
            });
    });

    it(`Does not emit click event on click when readonly`, () => {
        mount(EtButton, {
            props: {
                readonly: true
            },
            slots: {
                default: "Dont click Me!"
            }
        });

        cy.get("button")
            .click()
            .then(() => {
                const emits = Cypress.vueWrapper.emitted();
                cy.wrap(emits).should("not.have.property", "click");
            });
    });

    it("Emits focus and blur emits on these events", () => {
        mount(EtButton, {
            props: {
                readonly: true
            },
            slots: {
                default: "Focus me!"
            }
        }).then((component) => {
            const componentInstance = component.component;
            componentInstance.focus();
            componentInstance.blur();

            const emits = component.wrapper.emitted();
            cy.wrap(emits).should("have.property", "focus");
            cy.wrap(emits).should("have.property", "blur");
        });
    });
});
