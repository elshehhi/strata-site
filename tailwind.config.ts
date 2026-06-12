import type { Config } from "tailwindcss";

/**
 * STRATA design tokens — "sunrise over stone".
 * Source of truth: prototype/nature-stack-pro/DESIGN_SPEC.md §E.
 * Warm obsidian inks, one dawn accent, a reserved near→far depth axis.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          0: "#0B0A08", // the well
          1: "#14110D", // panel
          2: "#1B1712", // raised
          3: "#241E17", // hover
        },
        paper: {
          hi: "#ECE4D6",
          mid: "#A89D8B",
          low: "#6F6759",
        },
        dawn: { DEFAULT: "#E8A25C", hi: "#F4C490" },
        far: "#8FA6B8",
        sage: "#9AB197",
        rust: "#C96F4A",
      },
      borderColor: {
        hairline: "rgba(255,214,165,.07)",
        "hairline-strong": "rgba(255,214,165,.14)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wordmark: "0.34em",
        micro: "0.14em",
      },
      transitionTimingFunction: {
        strata: "cubic-bezier(.22,.8,.24,1)",
      },
      transitionDuration: {
        fast: "140ms",
        med: "260ms",
        stage: "480ms",
      },
    },
  },
  plugins: [],
};

export default config;
