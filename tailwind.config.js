/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./utils/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          DEFAULT: "#111827",
          50: "#F1F3F9",
          100: "#DFE5F1",
          200: "#BBC8E2",
          300: "#98AAD2",
          400: "#748DC3",
          500: "#5170B3",
          600: "#3F5A92",
          700: "#30446E",
          800: "#202E4B",
          900: "#111827",
          950: "#070A10",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
