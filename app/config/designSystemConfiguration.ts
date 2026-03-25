export type ColorToken = Readonly<{
  name: string;
  variable: string;
  tailwindClass: string;
}>;

export type TypographyToken = Readonly<{
  name: string;
  tailwindClass: string;
  sampleText: string;
}>;

export type SpacingToken = Readonly<{
  name: string;
  value: string;
  tailwindClass: string;
}>;

export type RadiusToken = Readonly<{
  name: string;
  variable: string;
  tailwindClass: string;
}>;

export type ShadowToken = Readonly<{
  name: string;
  variable: string;
  tailwindClass: string;
}>;

export const designSystemColorTokens: ReadonlyArray<ColorToken> = [
  { name: "Background Page", variable: "--color-background-page", tailwindClass: "bg-backgroundPage" },
  { name: "Text Primary", variable: "--color-text-primary", tailwindClass: "bg-textPrimary" },
  { name: "Text Secondary", variable: "--color-text-secondary", tailwindClass: "bg-textSecondary" },
  { name: "Accent Primary", variable: "--color-accent-primary", tailwindClass: "bg-accentPrimary" },
  { name: "Accent Secondary", variable: "--color-accent-secondary", tailwindClass: "bg-accentSecondary" },
  { name: "Border Default", variable: "--color-border-default", tailwindClass: "bg-borderDefault" },
  { name: "Border Muted", variable: "--color-border-muted", tailwindClass: "bg-borderMuted" },
  { name: "Surface Elevated", variable: "--color-surface-elevated", tailwindClass: "bg-surfaceElevated" },
  { name: "Surface Muted", variable: "--color-surface-muted", tailwindClass: "bg-surfaceMuted" },
  { name: "Accent Highlight", variable: "--color-accent-highlight", tailwindClass: "bg-accentHighlight" },
  { name: "Glow Violet", variable: "--color-glow-violet", tailwindClass: "bg-glowViolet" },
  { name: "Glow Cyan", variable: "--color-glow-cyan", tailwindClass: "bg-glowCyan" },
] as const;

export const designSystemTypographyTokens: ReadonlyArray<TypographyToken> = [
  { name: "Heading 1", tailwindClass: "text-3xl font-semibold leading-tight tracking-tight", sampleText: "Heading 1" },
  { name: "Heading 2", tailwindClass: "text-2xl font-semibold leading-tight tracking-tight", sampleText: "Heading 2" },
  { name: "Heading 3", tailwindClass: "text-xl font-semibold leading-snug", sampleText: "Heading 3" },
  { name: "Heading 4", tailwindClass: "text-lg font-semibold leading-snug", sampleText: "Heading 4" },
  { name: "Body Large", tailwindClass: "text-lg leading-7", sampleText: "Body large text" },
  { name: "Body Base", tailwindClass: "text-base leading-6", sampleText: "Body base text" },
  { name: "Body Small", tailwindClass: "text-sm leading-5", sampleText: "Body small text" },
  { name: "Caption", tailwindClass: "text-xs leading-4 text-textSecondary", sampleText: "Caption text" },
] as const;

export const designSystemSpacingTokens: ReadonlyArray<SpacingToken> = [
  { name: "4", value: "0.25rem", tailwindClass: "w-4 h-4" },
  { name: "8", value: "0.5rem", tailwindClass: "w-8 h-8" },
  { name: "12", value: "0.75rem", tailwindClass: "w-12 h-12" },
  { name: "16", value: "1rem", tailwindClass: "w-16 h-16" },
  { name: "24", value: "1.5rem", tailwindClass: "w-24 h-24" },
  { name: "32", value: "2rem", tailwindClass: "w-32 h-32" },
  { name: "48", value: "3rem", tailwindClass: "w-48 h-48" },
  { name: "64", value: "4rem", tailwindClass: "w-64 h-64" },
  { name: "96", value: "6rem", tailwindClass: "w-96 h-96" },
] as const;

export const designSystemRadiusTokens: ReadonlyArray<RadiusToken> = [
  { name: "Small", variable: "--radius-sm", tailwindClass: "rounded-sm" },
  { name: "Medium", variable: "--radius-md", tailwindClass: "rounded-md" },
  { name: "Large", variable: "--radius-lg", tailwindClass: "rounded-lg" },
  { name: "Full", variable: "--radius-full", tailwindClass: "rounded-full" },
] as const;

export const designSystemShadowTokens: ReadonlyArray<ShadowToken> = [
  { name: "Small", variable: "--shadow-sm", tailwindClass: "shadow-sm" },
  { name: "Medium", variable: "--shadow-md", tailwindClass: "shadow-md" },
  { name: "Large", variable: "--shadow-lg", tailwindClass: "shadow-lg" },
  {
    name: "Case study elevated",
    variable: "--shadow-case-study-elevated",
    tailwindClass: "shadow-caseStudyElevated",
  },
] as const;

export const designSystemTokens = {
  colors: designSystemColorTokens,
  typography: designSystemTypographyTokens,
  spacing: designSystemSpacingTokens,
  radius: designSystemRadiusTokens,
  shadows: designSystemShadowTokens,
} as const;
