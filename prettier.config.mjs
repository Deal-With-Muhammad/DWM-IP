/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 110,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
