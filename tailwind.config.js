/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./sandbox/**/*.{vue,html,js,ts}",
        "./src/components/**/*.{vue,html,js,ts}",
        "./src/helpers/**/*.{vue,html,js,ts}",
        "./src/layouts/**/*.{vue,html,js,ts}"
    ],
    theme: {
        colors: {
            background: "var(--background)",
            white: {
                DEFAULT: "var(--white)",
                off: "var(--off-white)",
                dark: "var(--dark-white)"
            },
            red: {
                light: "var(--red-light)",
                DEFAULT: "var(--red)",
                dark: "var(--red-dark)"
            },
            purple: {
                light: "var(--purple-light)",
                DEFAULT: "var(--purple)",
                dark: "var(--purple-dark)"
            },
            yellow: {
                light: "var(--yellow-light)",
                DEFAULT: "var(--yellow)",
                dark: "var(--yellow-dark)"
            },
            green: {
                light: "var(--green-light)",
                DEFAULT: "var(--green)",
                dark: "var(--green-dark)"
            },
            grey: {
                light: "var(--grey-light)",
                DEFAULT: "var(--grey-light)",
                dark: "var(--grey-dark)"
            },
            blue: {
                light: "var(--blue-light)",
                DEFAULT: "var(--blue)",
                dark: "var(--blue-dark)"
            },
            danger: {
                light: "var(--danger-light)",
                DEFAULT: "var(--danger)",
                dark: "var(--danger-dark)"
            },
            premium: {
                light: "var(--premium-light)",
                DEFAULT: "var(--premium)",
                dark: "var(--premium-dark)"
            },
            success: {
                light: "var(--success-light)",
                DEFAULT: "var(--success)",
                dark: "var(--success-dark)"
            },
            warning: {
                light: "var(--warning-light)",
                DEFAULT: "var(--warning)",
                dark: "var(--warning-dark)"
            },
            primary: {
                light: "var(--primary-light)",
                DEFAULT: "var(--primary)",
                dark: "var(--primary-dark)"
            }
        }
    },
    plugins: [],
}