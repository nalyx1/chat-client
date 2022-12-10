/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        default: "rgba(256, 256, 256, 0.8);",
      },
      height: {
        default: "79vh",
      },
    },
  },
  plugins: [],
};
