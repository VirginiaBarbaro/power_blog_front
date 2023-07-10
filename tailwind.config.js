/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "575px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      "light-beige": "#e3ded9",
      "dark-beige": "#bba686",
      "dark-blue": "#283e56",
      "light-blue": "#8aa4ab",
    },
  },
  plugins: [require("flowbite/plugin")],
};
