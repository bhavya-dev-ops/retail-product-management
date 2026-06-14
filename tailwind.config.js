/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#a80f12",
          redDark: "#7d080a",
          ink: "#0b1220",
          charcoal: "#171717",
          soft: "#fff7f4",
          mist: "#f5f5f5",
        },
      },
      boxShadow: {
        premium: "0 16px 40px rgba(11, 18, 32, 0.12)",
      },
    },
  },
  plugins: [],
};
