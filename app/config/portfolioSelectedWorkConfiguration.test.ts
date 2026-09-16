import { existsSync } from "fs";
import path from "path";

import { describe, expect, it } from "vitest";

import { getAllSelectedWork } from "@/app/config/portfolioSelectedWorkConfiguration";

const publicDirectory = path.join(process.cwd(), "public");

describe("portfolioSelectedWorkConfiguration", () => {
  it("lists six live pieces with unique slugs and https links", () => {
    const work = getAllSelectedWork();
    expect(work).toHaveLength(6);
    expect(new Set(work.map((item) => item.slug)).size).toBe(6);
    for (const item of work) {
      expect(item.liveUrl).toMatch(/^https:\/\//);
      if (item.sourceUrl) expect(item.sourceUrl).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it("ships both screenshot formats for every piece", () => {
    for (const item of getAllSelectedWork()) {
      expect(existsSync(path.join(publicDirectory, item.screenshot.webpSrc))).toBe(true);
      expect(existsSync(path.join(publicDirectory, item.screenshot.pngSrc))).toBe(true);
      expect(item.screenshot.alt.length).toBeGreaterThan(10);
    }
  });

  it("keeps copy free of em dashes", () => {
    for (const item of getAllSelectedWork()) {
      expect(`${item.title}${item.kicker}${item.summary}`).not.toContain("—");
    }
  });
});
