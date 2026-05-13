/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5151FA",
        primaryHover: "#3B3BE0",
        secondary: "#F7B20B",
        secondaryHover: "#D69A09",
        accent: "#2F8D7A",
        accentStrong: "#216758",
        bgsoft: "#F2F6FB",
      },
      fontFamily: {
        body: ["Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 61, 115, 0.14)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
