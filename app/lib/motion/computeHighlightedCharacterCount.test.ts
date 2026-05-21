import { describe, expect, it } from "vitest";

import { computeHighlightedCharacterCount } from "@/app/lib/motion/computeHighlightedCharacterCount";

describe("computeHighlightedCharacterCount", () => {
  it("returns 0 for non-positive totals", () => {
    expect(computeHighlightedCharacterCount(0.5, 0)).toBe(0);
    expect(computeHighlightedCharacterCount(0.5, -3)).toBe(0);
  });

  it("clamps progress and scales to character count", () => {
    expect(computeHighlightedCharacterCount(-1, 10)).toBe(0);
    expect(computeHighlightedCharacterCount(2, 10)).toBe(10);
    expect(computeHighlightedCharacterCount(0.5, 10)).toBe(5);
  });
});
