import { describe, expect, it } from "vitest";

import {
  clampOutcomesCarouselPage,
  chunkOutcomesCarouselPages,
  getOutcomesCarouselLayoutName,
  getOutcomesCarouselPageCount,
  getOutcomesCarouselPageSize,
} from "./outcomesCarouselPaging";

describe("outcomes carousel paging", () => {
  it("uses 2x2 pages on phones and tablets and 3x2 pages from 1024px", () => {
    for (const width of [320, 375, 639, 640, 768, 1023]) {
      expect(getOutcomesCarouselLayoutName(width), `${width}px`).toBe("compact");
      expect(getOutcomesCarouselPageSize(getOutcomesCarouselLayoutName(width))).toBe(4);
    }
    for (const width of [1024, 1280, 1440, 1920]) {
      expect(getOutcomesCarouselLayoutName(width), `${width}px`).toBe("wide");
      expect(getOutcomesCarouselPageSize(getOutcomesCarouselLayoutName(width))).toBe(6);
    }
  });

  it("counts pages from the item count and page size", () => {
    expect(getOutcomesCarouselPageCount(5, 4)).toBe(2);
    expect(getOutcomesCarouselPageCount(5, 6)).toBe(1);
    expect(getOutcomesCarouselPageCount(4, 4)).toBe(1);
    expect(getOutcomesCarouselPageCount(9, 4)).toBe(3);
    expect(getOutcomesCarouselPageCount(13, 6)).toBe(3);
    expect(getOutcomesCarouselPageCount(0, 4)).toBe(0);
  });

  it("splits cards into ordered pages for each layout", () => {
    const cards = ["a", "b", "c", "d", "e", "f", "g", "h"];
    expect(chunkOutcomesCarouselPages(cards, getOutcomesCarouselPageSize("compact"))).toEqual([
      ["a", "b", "c", "d"],
      ["e", "f", "g", "h"],
    ]);
    expect(chunkOutcomesCarouselPages(cards, getOutcomesCarouselPageSize("wide"))).toEqual([
      ["a", "b", "c", "d", "e", "f"],
      ["g", "h"],
    ]);
    expect(chunkOutcomesCarouselPages(cards.slice(0, 5), 6)).toEqual([["a", "b", "c", "d", "e"]]);
    expect(chunkOutcomesCarouselPages([], 4)).toEqual([]);
  });

  it("clamps page targets to the available pages", () => {
    expect(clampOutcomesCarouselPage(-1, 2)).toBe(0);
    expect(clampOutcomesCarouselPage(5, 2)).toBe(1);
    expect(clampOutcomesCarouselPage(1, 2)).toBe(1);
    expect(clampOutcomesCarouselPage(3, 0)).toBe(0);
  });
});
