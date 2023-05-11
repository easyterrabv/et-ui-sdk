import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [vue(), dts()],
    optimizeDeps: {
        exclude: ['vue-demi']
    },
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "et-ui-sdk",
            fileName: "index",
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});