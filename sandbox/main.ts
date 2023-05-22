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
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHouse,
    faAnglesLeft,
    faAnglesRight,
    faTabletButton,
    faChevronLeft,
    faChevronDown
);

const app = createApp(App);
app.mount("#app");