import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Index from "sandbox/pages/Index.vue";
import VariousComponents from "sandbox/pages/VariousComponents.vue";
import InputComponents from "sandbox/pages/InputsComponents.vue"
import DataGrid from "sandbox/pages/DataGrid.vue";
import TestEmpty from "sandbox/pages/TestEmpty.vue";

import App from "./App.vue";
import ModalComponents from "./pages/ModalComponents.vue";

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/various', component: VariousComponents},
        {path: '/inputs', component: InputComponents},
        {path: '/data-grid', component: DataGrid},
        {path: '/modals', component: ModalComponents},
        {path: '/test', component: TestEmpty},
    ]
}));
app.mount("#app");