import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundPage: "rgb(var(--color-background-page) / <alpha-value>)",
        textPrimary: "rgb(var(--color-text-primary) / <alpha-value>)",
        textSecondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        accentPrimary: "rgb(var(--color-accent-primary) / <alpha-value>)",
        accentSecondary: "rgb(var(--color-accent-secondary) / <alpha-value>)",
        borderDefault: "rgb(var(--color-border-default) / <alpha-value>)",
        borderMuted: "rgb(var(--color-border-muted) / <alpha-value>)",
        surfaceElevated: "rgb(var(--color-surface-elevated) / <alpha-value>)",
        surfaceMuted: "rgb(var(--color-surface-muted) / <alpha-value>)",
        accentHighlight: "rgb(var(--color-accent-highlight) / <alpha-value>)",
        glowViolet: "rgb(var(--color-glow-violet) / <alpha-value>)",
        glowCyan: "rgb(var(--color-glow-cyan) / <alpha-value>)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        caseStudyElevated: "var(--shadow-case-study-elevated)",
      },
    },
  },
  plugins: [],
};

export default config;


