import { existsSync } from "fs";
import path from "path";

import { describe, expect, it } from "vitest";

import {
  calculateBudgetUsagePercent,
  pulseboardCaseStudyConfiguration,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";

const publicDirectory = path.join(process.cwd(), "public");

function collectHrefValues(configurationNode: unknown): string[] {
  if (Array.isArray(configurationNode)) {
    return configurationNode.flatMap(collectHrefValues);
  }
  if (configurationNode && typeof configurationNode === "object") {
    return Object.entries(configurationNode).flatMap(([configurationKey, configurationValue]) => {
      if (typeof configurationValue !== "string") {
        return collectHrefValues(configurationValue);
      }
      return configurationKey === "href" || configurationKey.endsWith("Href") ? [configurationValue] : [];
    });
  }
  return [];
}

function collectStringValues(configurationNode: unknown): string[] {
  if (typeof configurationNode === "string") {
    return [configurationNode];
  }
  if (configurationNode && typeof configurationNode === "object") {
    return Object.values(configurationNode).flatMap(collectStringValues);
  }
  return [];
}

describe("portfolioPulseboardCaseStudyConfiguration", () => {
  const { links, demoVideo, heroScreenshot, performance } = pulseboardCaseStudyConfiguration;

  it("points every outbound link at an https URL", () => {
    const outboundHrefs = collectHrefValues(pulseboardCaseStudyConfiguration);

    expect(outboundHrefs).toEqual(
      expect.arrayContaining([links.primaryLink, ...links.secondaryLinks].map((link) => link.href)),
    );
    for (const outboundHref of outboundHrefs) {
      expect(outboundHref).toMatch(/^https:\/\//);
    }
  });

  it("ships the demo video, its poster and its captions", () => {
    for (const assetSrc of [demoVideo.mp4Src, demoVideo.posterSrc, demoVideo.captionsSrc]) {
      expect(existsSync(path.join(publicDirectory, assetSrc)), assetSrc).toBe(true);
    }
  });

  it("ships both hero screenshot formats", () => {
    expect(existsSync(path.join(publicDirectory, heroScreenshot.webpSrc))).toBe(true);
    expect(existsSync(path.join(publicDirectory, heroScreenshot.pngSrc))).toBe(true);
  });

  it("keeps copy free of em dashes", () => {
    for (const copyText of collectStringValues(pulseboardCaseStudyConfiguration)) {
      expect(copyText).not.toContain("—");
    }
  });

  it("gives every section a unique heading id", () => {
    const { architecture, designSystem, failureModes, testing, limits } = pulseboardCaseStudyConfiguration;
    const sectionTitleIds = [architecture, designSystem, performance, failureModes, testing, limits].map(
      (section) => section.sectionTitleId,
    );

    expect(new Set(sectionTitleIds).size).toBe(sectionTitleIds.length);
  });

  it("keeps every measured number within its budget", () => {
    const { virtualizedTable, bundleBudgets } = performance;

    expect(virtualizedTable.p95FrameMilliseconds).toBeLessThanOrEqual(
      virtualizedTable.frameBudgetMilliseconds,
    );
    for (const budget of bundleBudgets.budgets) {
      expect(budget.usedKilobytes, budget.chunkLabel).toBeLessThanOrEqual(budget.budgetKilobytes);
    }
  });

  it("rounds budget usage to a whole percent", () => {
    expect(calculateBudgetUsagePercent(10.2, 16.7)).toBe(61);
    expect(calculateBudgetUsagePercent(229, 360)).toBe(64);
  });

  it("reports an overrun above 100 percent instead of clamping it", () => {
    expect(calculateBudgetUsagePercent(450, 360)).toBe(125);
  });

  it("rejects a budget that is not positive", () => {
    expect(() => calculateBudgetUsagePercent(10, 0)).toThrow(RangeError);
    expect(() => calculateBudgetUsagePercent(10, -5)).toThrow(RangeError);
  });
});
