import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

// LIBRARY build: compiles src -> dist (ESM + .d.ts). Consumers install via git
// tag and import the precompiled output (package.json `exports` -> dist), so they
// do NOT compile the SFCs themselves. Demo/sandbox build lives in
// vite.demo.config.js. All bare specifiers (vue, @fortawesome/*, @tiptap/*) are
// externalized so deps aren't bundled; relative internal imports stay bundled.
const isExternal = (id) => !id.startsWith(".") && !path.isAbsolute(id);

export default defineConfig({
    plugins: [
        vue(),
        dts({
            include: ["src"],
            exclude: [
                "src/**/*.cy.ts",
                "src/**/*.spec.ts",
                "src/tests/**",
                "sandbox/**"
            ],
            entryRoot: "src",
            outDir: "dist"
        })
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "./src"),
            sandbox: path.resolve(__dirname, "./sandbox")
        }
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
        // Single bundled stylesheet (dist/style.css) instead of per-chunk CSS.
        cssCodeSplit: false,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            formats: ["es"]
        },
        rollupOptions: {
            external: isExternal,
            output: {
                // Per-file chunks mirroring src/, so consumers can tree-shake.
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
                assetFileNames: (asset) =>
                    asset.names?.some((n) => n.endsWith(".css"))
                        ? "style.css"
                        : "assets/[name][extname]"
            }
        }
    }
});
