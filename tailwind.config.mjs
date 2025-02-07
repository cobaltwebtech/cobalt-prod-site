/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      slate: colors.slate,
      cyan: colors.cyan,
      orange: colors.orange,
      black: "#000000",
      white: "#ffffff",
      cobalt: {
        50: "#a8d2ff",
        100: "#74b3ff",
        200: "#3e80ff",
        300: "#134eff",
        400: "#0039ff",
        500: "#0039ff",
        600: "#0033e4",
        700: "#0021b0",
        800: "#001689",
        900: "#000D51",
        950: "#000835",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("preline/plugin"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
