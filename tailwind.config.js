/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        googleBlue: "#4285F4",
        googleRed: "#DB4437",
        googleYellow: "#F4B400",
        googleGreen: "#0F9D58",
      },
    },
    animation: {
      slideInLeft: "slideInLeft 0.7s ease-out forwards",
      slideInTop: "slideInTop 0.7s ease-out forwards",
    },
    keyframes: {
      slideInLeft: {
        "0%": { transform: "translateX(-100%)", opacity: 0 },
        "100%": { transform: "translateX(0)", opacity: 1 },
      },
      slideInTop: {
        "0%": { transform: "translateY(-100%)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
    },
  },
  plugins: [],
};
