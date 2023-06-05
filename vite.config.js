import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
    plugins: [vue(), dts()],
    resolve:{
        alias:{
            'src' : path.resolve(__dirname, './src'),
            'sandbox' : path.resolve(__dirname, './sandbox')
        },
    },
    optimizeDeps: {
        exclude: ['vue-demi']
    }
});