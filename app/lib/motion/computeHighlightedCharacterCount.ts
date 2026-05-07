/**
 * Maps normalized ScrollTrigger progress to how many leading characters should appear highlighted.
 */
export function computeHighlightedCharacterCount(
  scrollProgress: number,
  totalCharacters: number,
): number {
  if (totalCharacters <= 0) {
    return 0;
  }
  const clampedProgress = Math.min(1, Math.max(0, scrollProgress));
  return Math.round(clampedProgress * totalCharacters);
}
