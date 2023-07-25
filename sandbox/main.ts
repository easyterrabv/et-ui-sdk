import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Index from "sandbox/pages/Index.vue";
import VariousComponents from "sandbox/pages/VariousComponents.vue";
import InputComponents from "sandbox/pages/InputsComponents.vue"
import SimpleTableComponent from "sandbox/pages/SimpleTableComponent.vue";

// @ts-ignore
import App from "./App.vue";

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/various', component: VariousComponents},
        {path: '/inputs', component: InputComponents},
        {path: '/simple-table', component: SimpleTableComponent},
    ]
}));
app.mount("#app");