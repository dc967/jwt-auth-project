/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        card: "#121212",
        border: "#262626",
        primary: "#10b981",
        muted: "#1a1a1a",
        "muted-foreground": "#a3a3a3",
        foreground: "#fafafa",
        destructive: "#ef4444",
        "chart-2": "#3b82f6",
        "chart-3": "#f59e0b",
      },
    },
  },
  plugins: [],
}
