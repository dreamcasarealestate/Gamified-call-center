import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0b0f19",
        cardDark: "#111827",
        accent: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
      },
      boxShadow: {
        glow: "0 0 20px rgba(34,197,94,0.4)",
        soft: "0 10px 25px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
