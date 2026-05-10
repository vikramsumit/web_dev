/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f4efe6",
        ink: "#0f172a",
        calm: "#0f766e",
        alert: "#b91c1c",
        support: "#7c3aed",
        panel: "#fffaf4",
        line: "#d9cfc2",
      },
      boxShadow: {
        card: "0 24px 60px rgba(15, 23, 42, 0.12)",
      },
      fontFamily: {
        display: ["Avenir Next", "Segoe UI", "sans-serif"],
        body: ["Trebuchet MS", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

