/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4B4BCC",
        primaryHover: "#3A3AB8",
        secondary: "#F5A623",
        secondaryHover: "#D9911A",
        accent: "#4ABFBF",
        accentStrong: "#35A0A0",
        bgsoft: "#F2F4FB",
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
