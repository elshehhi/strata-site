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
      // STRATA type scale — one deliberate ladder for the whole site (replaces the ad-hoc
      // text-[11px]…text-[16px] sizes + five different hero clamps). line-height + tracking
      // are baked in. Voices: micro = JetBrains label · caption/sm/body/lead = Inter Tight ·
      // title/heading/feature/display = Fraunces (pair with font-display).
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em" }], // 11px — mono uppercase labels
        caption: ["0.8125rem", { lineHeight: "1.5" }], // 13px — captions / fine print
        sm: ["0.875rem", { lineHeight: "1.55" }], // 14px — secondary / UI text
        body: ["1rem", { lineHeight: "1.65" }], // 16px — reading body
        lead: ["1.1875rem", { lineHeight: "1.6" }], // 19px — lead paragraphs
        title: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }], // 24px — card / sub-section titles
        heading: ["2rem", { lineHeight: "1.18", letterSpacing: "-0.015em" }], // 32px — section headings
        feature: ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }], // 44px — chapter / feature titles
        display: ["clamp(2.6rem,6.5vw,5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }], // hero
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
