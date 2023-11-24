import { mauveDark, orangeDark } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...mauveDark,
      ...orangeDark,
    },
    extend: {},
  },
  plugins: [],
};
