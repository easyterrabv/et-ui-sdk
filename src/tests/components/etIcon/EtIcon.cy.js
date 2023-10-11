import EtIcon from "src/components/etIcon/EtIcon.vue";
import { mount } from "cypress/vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faAnglesLeft, faAnglesRight, faTabletButton, faChevronLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const icons = [
    faHouse,
    faAnglesLeft,
    faAnglesRight,
    faTabletButton,
    faChevronLeft,
    faChevronDown
];
library.add(...icons);
describe(`<EtIcon />`, () => {
    icons.forEach((icon) => {
        const iconName = icon.iconName;
        it(`renders - icon - ${iconName}`, () => {
            mount(EtIcon, {
                props: {
                    icon: iconName
                }
            });
            cy.get("svg")
                .should("have.class", "et-icon")
                .should("have.class", `fa-${iconName}`);
        });
    });
});
