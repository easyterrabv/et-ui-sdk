/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./sandbox/**/*.{vue,html,js,ts}",
        "./src/components/**/*.{vue,html,js,ts}",
        "./src/helpers/**/*.{vue,html,js,ts}",
        "./src/layouts/**/*.{vue,html,js,ts}"
    ],
    theme: {
        extend: {
            colors: {
                default: {
                    light: colors.slate["300"],
                    DEFAULT: colors.slate["500"],
                    dark: colors.slate["700"],
                },
                primary: {
                    light: colors.blue["500"],
                    DEFAULT: colors.blue["600"],
                    dark: colors.blue["700"],
                },
                success: {
                    light: colors.emerald["300"],
                    DEFAULT: colors.emerald["500"],
                    dark: colors.emerald["700"],
                },
                danger: {
                    light: colors.rose["300"],
                    DEFAULT: colors.rose["500"],
                    dark: colors.rose["700"],
                },
                warning: {
                    light: colors.amber["300"],
                    DEFAULT: colors.amber["500"],
                    dark: colors.amber["700"],
                },
                text: {
                    light: colors.slate["300"],
                    DEFAULT: colors.slate["600"],
                    dark: colors.slate["900"]
                }
            }
        },
    },
    plugins: [],
}