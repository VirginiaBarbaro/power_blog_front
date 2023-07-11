/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    /* screens: {
      xs: "320px",
      sm: "575px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    }, */
    colors: {
      "dark-black": "#000000",
      "dark-grey": "#666666",
      "semidark-grey": "#979797",
      "light-grey": "#eeeeee",
      "electric-blue": "#0088cc",
    },
  },
  plugins: [require("flowbite/plugin")],
};
