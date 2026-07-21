import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 沿用旧站品牌系统：SANDO 极地橙 × terrain-x 地形青 × 岩灰
        orange: {
          50: "#fff4ef",
          100: "#ffe5d9",
          400: "#ff8c5c",
          500: "#ff6b35",
          600: "#f0521a",
          700: "#c43f10",
        },
        teal: {
          50: "#effaf7",
          100: "#d4f0e9",
          400: "#3ec4ab",
          500: "#1fa98f",
          600: "#158a74",
          700: "#116e5d",
        },
        rock: {
          50: "#f7f7f6",
          100: "#ececeb",
          200: "#d8d8d6",
          300: "#b3b3b0",
          400: "#84847f",
          500: "#63635e",
          600: "#4a4a4a",
          700: "#3a3a3a",
          800: "#2b2b2b",
          900: "#1d1d1d",
          950: "#141414",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "'Arial Narrow'", "sans-serif"],
        sans: ["Inter", "'PingFang SC'", "'Microsoft YaHei'", "sans-serif"],
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,20,20,.06), 0 10px 30px -14px rgba(20,20,20,.25)",
        lift: "0 2px 6px rgba(20,20,20,.08), 0 20px 48px -18px rgba(20,20,20,.35)",
      },
      maxWidth: {
        site: "min(1680px, 94vw)",
      },
    },
  },
  plugins: [],
};
export default config;
