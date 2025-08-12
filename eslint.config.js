import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["dist/**", "node_modules/**"] // ✅ ignore compiled files
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    ...tseslint.configs.recommended,
    pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        languageOptions: { parserOptions: { parser: tseslint.parser } }
    },
    {
        files: ["**/*.{ts,vue}"],
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn", // or "off" if you want to disable completely
                {
                    "argsIgnorePattern": "^_",    // ignore unused function args starting with _
                    "varsIgnorePattern": "^_"     // ignore unused variables starting with _
                }
            ],
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "vue/multi-word-component-names": "off",
            "vue/no-deprecated-filter": "off",
        }
    }
]);


