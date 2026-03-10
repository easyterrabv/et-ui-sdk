import EtToolTip from "src/components/EtToolTip.vue";
import { mount } from "cypress/vue";

describe("<EtToolTip />", () => {
    const getToggle = () => cy.get(".et-sdk-tooltip--toggle");
    const getContent = () => cy.get(".et-sdk-tooltip--content");

    describe("rendering", () => {
        it("mounts without crash when no tooltip slot is provided", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me" }
            });

            getToggle().should("exist");
        });

        it("renders toggle slot content", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().should("contain.text", "Hover me");
        });

        it("renders tooltip slot content", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getContent().should("contain.text", "Tooltip text");
        });

        it("tooltip is hidden by default", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getContent().should("not.be.visible");
        });

        it("applies contentClass to the tooltip element", () => {
            mount(EtToolTip, {
                props: { contentClass: "my-custom-class" },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getContent().should("have.class", "my-custom-class");
        });
    });

    describe("show / hide on hover", () => {
        it("shows tooltip on mouseenter of toggle", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("be.visible");
        });

        it("hides tooltip on mouseleave of toggle", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("be.visible");
            getToggle().trigger("mouseleave");
            getContent().should("not.be.visible");
        });
    });

    describe("direction prop", () => {
        it("sets the popper placement attribute from the direction prop", () => {
            mount(EtToolTip, {
                props: { direction: "right" },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("have.attr", "data-popper-placement", "right");
        });

        it("defaults to bottom placement", () => {
            mount(EtToolTip, {
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("have.attr", "data-popper-placement", "bottom");
        });
    });

    describe("delay prop", () => {
        it("does not show tooltip immediately when delay is set", () => {
            cy.clock();

            mount(EtToolTip, {
                props: { delay: 500 },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("not.be.visible");
        });

        it("shows tooltip after delay has elapsed", () => {
            cy.clock();

            mount(EtToolTip, {
                props: { delay: 500 },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            cy.tick(500);
            getContent().should("be.visible");
        });

        it("cancels the delayed show when mouse leaves before delay elapses", () => {
            cy.clock();

            mount(EtToolTip, {
                props: { delay: 500 },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getToggle().trigger("mouseleave");
            cy.tick(500);
            getContent().should("not.be.visible");
        });
    });

    describe("keepAliveOnContent prop", () => {
        it("keeps tooltip visible when mouse moves from toggle to content", () => {
            cy.clock();

            mount(EtToolTip, {
                props: { keepAliveOnContent: true },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("be.visible");

            getToggle().trigger("mouseleave");
            getContent().trigger("mouseenter");
            cy.tick(200);

            getContent().should("be.visible");
        });

        it("hides tooltip when mouse leaves content element", () => {
            cy.clock();

            mount(EtToolTip, {
                props: { keepAliveOnContent: true },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("be.visible");

            getToggle().trigger("mouseleave");
            getContent().trigger("mouseenter");
            getContent().trigger("mouseleave");
            cy.tick(200);

            getContent().should("not.be.visible");
        });

        it("hides tooltip when mouse leaves toggle without entering content", () => {
            cy.clock();

            mount(EtToolTip, {
                props: { keepAliveOnContent: true },
                slots: { default: "Hover me", tooltip: "Tooltip text" }
            });

            getToggle().trigger("mouseenter");
            getContent().should("be.visible");

            getToggle().trigger("mouseleave");
            cy.tick(200);

            getContent().should("not.be.visible");
        });
    });
});
