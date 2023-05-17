import EtButton from "src/components/etButton/EtButton.vue";
import { UI_SIZING, UI_TYPES } from "src/enums.ts";
import { mount } from "cypress/vue";
import {
    sizeToClass,
    typeToButtonActiveClass,
    typeToButtonClass,
    typeToButtonDisabledClass,
    typeToButtonHoverClass
} from "src/helpers/typeToClass.ts";

describe(`<EtButton />`, () => {
    Object.keys(UI_SIZING).forEach((uiSize) => {
        const sizeClasses = sizeToClass(
            UI_SIZING[uiSize as keyof typeof UI_SIZING]
        ).split(" ");

        Object.keys(UI_TYPES).forEach((uiType: string) => {
            const regularTypeClasses = typeToButtonClass(
                UI_TYPES[uiType as keyof typeof UI_TYPES]
            ).split(" ");
            const disabledTypeClasses = typeToButtonDisabledClass(
                UI_TYPES[uiType as keyof typeof UI_TYPES]
            ).split(" ");
            const hoverTypeClasses = typeToButtonHoverClass(
                UI_TYPES[uiType as keyof typeof UI_TYPES]
            ).split(" ");
            const activeTypeClasses = typeToButtonActiveClass(
                UI_TYPES[uiType as keyof typeof UI_TYPES]
            ).split(" ");

            it(`renders - ${uiSize} - ${uiType}`, () => {
                mount(EtButton, {
                    props: {
                        type: UI_TYPES[uiType as keyof typeof UI_TYPES],
                        size: UI_SIZING[uiSize as keyof typeof UI_SIZING]
                    },
                    slots: {
                        default: "Click Me!"
                    }
                });

                cy.get("button")
                    .should("have.class", "et-button")
                    .should("satisfy", ($el) => {
                        const classList = Array.from($el[0].classList);

                        // TESTS:  Should contain all basic classes related to size and type
                        return [
                            sizeClasses.every((sizeClass: String) =>
                                classList.includes(sizeClass)
                            ),
                            regularTypeClasses.every(
                                (regularTypeClass: String) =>
                                    classList.includes(regularTypeClass)
                            )
                        ].every((check) => check);
                    })
                    .click()
                    .then(() => {
                        const emits = Cypress.vueWrapper.emitted();
                        cy.wrap(emits)
                            .should("have.property", "click")
                            .then(() => {
                                // @ts-ignore
                                const event = emits.click[0][0];
                                cy.wrap(event).should("be.instanceof", Event);
                            });
                    })
                    .then(() => {
                        // Disabled the button and check if it contains all the disable classes and non of the hover classes
                        Cypress.vueWrapper.setProps({
                            disabled: true,
                            readonly: false,
                            active: false
                        });

                        cy.get("button").should("satisfy", ($el) => {
                            const classList = Array.from($el[0].classList);
                            return [
                                disabledTypeClasses.every((c: String) =>
                                    classList.includes(c)
                                ),
                                hoverTypeClasses.every(
                                    (c: String) => !classList.includes(c)
                                )
                            ].every((check) => check);
                        });
                    })
                    .then(() => {
                        // Make button readonly and check if it doesn't have any hover classes
                        Cypress.vueWrapper.setProps({
                            disabled: false,
                            readonly: true,
                            active: false
                        });

                        cy.get("button").should("satisfy", ($el) => {
                            const classList = Array.from($el[0].classList);
                            return hoverTypeClasses.every(
                                (c: String) => !classList.includes(c)
                            );
                        });
                    })
                    .then(() => {
                        // Make button active and check if it does have all active classes
                        Cypress.vueWrapper.setProps({
                            disabled: false,
                            readonly: false,
                            active: true
                        });

                        cy.get("button").should("satisfy", ($el) => {
                            const classList = Array.from($el[0].classList);
                            return activeTypeClasses.every((c: String) =>
                                classList.includes(c)
                            );
                        });
                    })
                    .then(() => {
                        // Trigger focus & blur and see if emits have been triggered.
                        Cypress.vueWrapper.setProps({
                            disabled: false,
                            readonly: false,
                            active: false
                        });
                        const vm: typeof EtButton = Cypress.vueWrapper.vm;
                        vm.focus();
                        vm.blur();

                        const emits = Cypress.vueWrapper.emitted();
                        cy.wrap(emits).should("have.property", "focus");
                        cy.wrap(emits).should("have.property", "blur");
                    });
            });
        });
    });
});
