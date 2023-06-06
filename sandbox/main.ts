import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Index from "sandbox/pages/Index.vue";
import VariousComponents from "sandbox/pages/VariousComponents.vue";
import InputComponents from "sandbox/pages/InputsComponents.vue"

// @ts-ignore
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHouse,
    faAnglesLeft,
    faAnglesRight,
    faTabletButton,
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faTimes,
    faArrowRightFromBracket,
    faEnvelope,
    faCircleDot,
    faTag,
    faPlus,
    faCalendarDays
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHouse,
    faAnglesLeft,
    faAnglesRight,
    faTabletButton,
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faTimes,
    faArrowRightFromBracket,
    faEnvelope,
    faCircleDot,
    faTag,
    faPlus,
    faCalendarDays
);

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/various', component: VariousComponents},
        {path: '/inputs', component: InputComponents},
    ]
}));
app.mount("#app");