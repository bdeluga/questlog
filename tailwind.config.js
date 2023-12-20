import { mauveDark, orangeDark, grass, red, plum } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...mauveDark,
      ...orangeDark,
      ...grass,
      ...red,
      ...plum,
      transparent: "transparent",
      inherit: "inherit",
    },
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + 24px))",
          },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
    },
  },
  plugins: [],
};
