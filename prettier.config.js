// @ts-check
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind 4 has no JS config; the plugin reads the theme from the CSS entry point.
  tailwindStylesheet: "./src/styles/globals.css",
};

export default config;
