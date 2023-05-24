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
                }
            }
        },
    },
    plugins: [],
}