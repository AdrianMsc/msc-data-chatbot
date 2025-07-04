/** @type {import('tailwindcss').Config} */
const colors = require("./src/styles/tailwind/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
