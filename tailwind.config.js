/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/components/**/*.{vue,html,js}"],
    theme: {
        extend: {
            colors: {
                "et-primary-color": "var(--et-primary-color)"
            }
        },
    },
    plugins: [],
}