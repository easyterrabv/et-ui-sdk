import { createApp } from "vue";

// @ts-ignore
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHouse,
    faAnglesLeft,
    faAnglesRight,
    faTabletButton,
    faChevronLeft,
    faChevronDown,
    faTimes,
    faArrowRightFromBracket,
    faEnvelope,
    faCircleDot,
    faTag,
    faPlus
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHouse,
    faAnglesLeft,
    faAnglesRight,
    faTabletButton,
    faChevronLeft,
    faChevronDown,
    faTimes,
    faArrowRightFromBracket,
    faEnvelope,
    faCircleDot,
    faTag,
    faPlus
);

const app = createApp(App);
app.mount("#app");