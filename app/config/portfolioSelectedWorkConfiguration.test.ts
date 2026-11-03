import { existsSync } from "fs";
import path from "path";

import { describe, expect, it } from "vitest";

import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";
import { getAllSelectedWork } from "@/app/config/portfolioSelectedWorkConfiguration";

const publicDirectory = path.join(process.cwd(), "public");
const appDirectory = path.join(process.cwd(), "app");

describe("portfolioSelectedWorkConfiguration", () => {
  it("lists ten live pieces with unique slugs and https links", () => {
    const work = getAllSelectedWork();
    expect(work).toHaveLength(10);
    expect(new Set(work.map((item) => item.slug)).size).toBe(10);
    for (const item of work) {
      expect(item.liveUrl).toMatch(/^https:\/\//);
      if (item.sourceUrl) expect(item.sourceUrl).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it("ships both screenshot formats for every screenshot-based tile", () => {
    for (const item of getAllSelectedWork()) {
      if (item.tilePreview.previewKind !== "screenshot") continue;
      const { webpSrc, pngSrc, alt } = item.tilePreview;
      expect(existsSync(path.join(publicDirectory, webpSrc))).toBe(true);
      expect(existsSync(path.join(publicDirectory, pngSrc))).toBe(true);
      expect(alt.length).toBeGreaterThan(10);
    }
  });

  it("uses code previews for private or tooling entries without public captures", () => {
    const codePreviewSlugs = getAllSelectedWork()
      .filter((item) => item.tilePreview.previewKind === "code")
      .map((item) => item.slug);
    expect(codePreviewSlugs).toEqual(["postgres-mcp", "agent-dev-tools"]);
  });

  it("keeps copy free of em dashes", () => {
    for (const item of getAllSelectedWork()) {
      expect(`${item.title}${item.kicker}${item.summary}`).not.toContain("—");
    }
  });

  it("sends Pulseboard to its case study, and every case-study link to a real page", () => {
    const work = getAllSelectedWork();
    const dynamicCaseStudyPaths = new Set(
      getAllCaseStudies().map((caseStudy) => `/work/${caseStudy.slug}`),
    );

    expect(work.find((item) => item.slug === "pulseboard")?.caseStudyHref).toBe("/work/pulseboard");
    for (const { caseStudyHref } of work) {
      if (!caseStudyHref) continue;
      const hasStaticPage = existsSync(path.join(appDirectory, caseStudyHref, "page.tsx"));
      expect(hasStaticPage || dynamicCaseStudyPaths.has(caseStudyHref), caseStudyHref).toBe(true);
    }
  });
});
