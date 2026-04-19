/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b1220",
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
        },
        brand: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#b9d0ff",
          300: "#8db0ff",
          400: "#5e8cff",
          500: "#3b6bff",
          600: "#2a52e6",
          700: "#1f3fb8",
          800: "#1a348f",
          900: "#162b74",
        },
        good: { 500: "#10b981", 600: "#059669" },
        warn: { 500: "#f59e0b", 600: "#d97706" },
        bad: { 500: "#ef4444", 600: "#dc2626" },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)",
      },
    },
  },
  plugins: [],
};
