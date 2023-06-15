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
                    'extra-light': colors.slate["100"],
                    light: colors.slate["300"],
                    DEFAULT: colors.slate["500"],
                    dark: colors.slate["700"],
                },
                primary: {
                    'extra-light': colors.blue["100"],
                    light: colors.blue["300"],
                    DEFAULT: colors.blue["600"],
                    dark: colors.blue["700"],
                },
                success: {
                    'extra-light': colors.emerald["100"],
                    light: colors.emerald["300"],
                    DEFAULT: colors.emerald["500"],
                    dark: colors.emerald["700"],
                },
                danger: {
                    'extra-light': colors.rose["100"],
                    light: colors.rose["300"],
                    DEFAULT: colors.rose["500"],
                    dark: colors.rose["700"],
                },
                warning: {
                    'extra-light': colors.amber["100"],
                    light: colors.amber["300"],
                    DEFAULT: colors.amber["500"],
                    dark: colors.amber["700"],
                },
                text: {
                    'extra-light': colors.slate["100"],
                    light: colors.slate["300"],
                    DEFAULT: colors.slate["600"],
                    dark: colors.slate["900"]
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}