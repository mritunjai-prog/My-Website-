import type { Config } from "tailwindcss";

/**
 * Design system
 * -------------
 * Obsidian base, acid-lime signal, iris violet counterpoint.
 * Every colour resolves through CSS variables so the light theme is a
 * single attribute flip on <html>.
 */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        acid: "var(--acid)",
        "acid-ink": "var(--acid-ink)",
        accent: "var(--accent-text)",
        iris: "var(--iris)",
        cyan: "var(--cyan)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "clamp-display": "clamp(2.5rem, 6vw, 5.5rem)",
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
