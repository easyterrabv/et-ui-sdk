/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./sandbox/**/*.{vue,html,js,ts}",
        "./src/components/**/*.{vue,html,js,ts}",
        "./src/layouts/**/*.{vue,html,js,ts}"
    ],
    theme: {
        extend: {
            colors: {
                "et-primary-color": "var(--et-primary-color)"
            }
        },
    },
    plugins: [],
}