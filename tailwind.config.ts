import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-once": "ping 1s ease-in-out 1",
        "fade-in": "fadeIn 300ms ease-in",
        "pulse-on-change": "pulse 1s ease-in-out 1",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGray: "#F0EEED",
      },
    },
  },
  plugins: [],
} satisfies Config;
