import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Brand ──────────────────────────────────────────────
        brand: {
          50:  "hsl(248, 100%, 97%)",
          100: "hsl(248, 95%, 93%)",
          200: "hsl(248, 90%, 85%)",
          300: "hsl(248, 85%, 75%)",
          400: "hsl(248, 80%, 65%)",
          500: "hsl(248, 75%, 55%)",
          600: "hsl(248, 70%, 45%)",
          700: "hsl(248, 65%, 35%)",
          800: "hsl(248, 60%, 25%)",
          900: "hsl(248, 55%, 15%)",
        },
        // ── Accents ────────────────────────────────────────────
        accent: {
          violet: "hsl(263, 90%, 65%)",
          indigo: "hsl(235, 85%, 65%)",
          cyan:   "hsl(190, 90%, 50%)",
          green:  "hsl(142, 75%, 45%)",
          amber:  "hsl(38, 92%, 50%)",
          red:    "hsl(355, 85%, 55%)",
        },
        // ── Dark backgrounds ───────────────────────────────────
        surface: {
          DEFAULT: "hsl(222, 47%, 7%)",
          "01": "hsl(222, 40%, 10%)",
          "02": "hsl(222, 35%, 13%)",
          "03": "hsl(222, 30%, 17%)",
          "04": "hsl(222, 25%, 22%)",
          border: "hsl(222, 25%, 22%)",
        },
        // ── Text ───────────────────────────────────────────────
        text: {
          primary:   "hsl(210, 20%, 98%)",
          secondary: "hsl(215, 15%, 65%)",
          muted:     "hsl(215, 12%, 45%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "rep-counter": ["clamp(4rem, 12vw, 9rem)", { lineHeight: "1", fontWeight: "800" }],
        "stat-value":  ["clamp(1.5rem, 4vw, 2.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
      },
      animation: {
        "fade-in":      "fade-in 0.3s ease-out",
        "slide-up":     "slide-up 0.4s ease-out",
        "scale-in":     "scale-in 0.2s ease-out",
        "pulse-glow":   "pulse-glow 2s ease-in-out infinite",
        "rep-bounce":   "rep-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "countdown":    "countdown 1s linear",
        "shimmer":      "shimmer 1.5s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
        "rep-bounce": {
          "0%":   { transform: "scale(1)" },
          "50%":  { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        "countdown": {
          "0%":   { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "glow-violet": "0 0 40px -10px hsl(263, 90%, 65%, 0.4)",
        "glow-indigo": "0 0 40px -10px hsl(235, 85%, 65%, 0.4)",
        "glow-green":  "0 0 40px -10px hsl(142, 75%, 45%, 0.3)",
        "card":        "0 4px 24px -4px rgba(0,0,0,0.4)",
        "card-hover":  "0 8px 40px -8px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, hsl(263, 90%, 65%), hsl(235, 85%, 65%))",
        "gradient-dark":  "linear-gradient(180deg, hsl(222, 47%, 7%), hsl(222, 40%, 10%))",
        "mesh-1": "radial-gradient(ellipse at 0% 0%, hsl(263, 90%, 65%, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, hsl(235, 85%, 65%, 0.1) 0%, transparent 50%)",
        "shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
