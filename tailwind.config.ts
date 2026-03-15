import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "rgba(255, 255, 255, 0.6)",
        neon: {
          cyan: "#00f3ff",
          crimson: "#ff003c",
        },
        primary: {
          DEFAULT: "rgba(255, 255, 255, 0.9)",
          subtle: "rgba(255, 255, 255, 0.6)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-sf-pro)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
