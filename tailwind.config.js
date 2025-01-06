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
  },
  plugins: [],
};
