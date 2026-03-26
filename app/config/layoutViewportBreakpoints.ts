/**
 * Min viewport width (px) for the “comfortable phone” tier (mobile-first).
 * Below this, base Tailwind classes apply; from this width, `narrowPhoneUp:` overrides.
 * Must match `narrowPhoneUpScreenMinWidthPx` in tailwind.config.ts (that file cannot import here).
 */
export const narrowPhoneMinWidthPx = 420 as const;
