import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// DEMO/sandbox site build (index.html -> sandbox/main.ts). Separate from the
// library build (vite.config.js). `npm run dev` serves this; `npm run build:demo`
// outputs a static showcase site to demo-dist/.
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "./src"),
            sandbox: path.resolve(__dirname, "./sandbox")
        }
    },
    build: {
        outDir: "demo-dist",
        emptyOutDir: true
    }
});
