import { describe, expect, it } from "vitest";

import {
  experienceTimelineSourceReference,
  homepageProductionProofMetricsConfiguration,
  homepageProductionProofSectionCopyConfiguration,
  type ProductionProofMetricRecord,
} from "@/app/config/homepageProductionProofConfiguration";
import { homepageWorkHistoryConfiguration } from "@/app/config/homepageWorkHistoryConfiguration";
import { findRetiredClaims } from "@/app/config/retiredClaimPatterns";

const serialisedWorkHistory = JSON.stringify(homepageWorkHistoryConfiguration);
const maxValueLabelTokenLength = 10;
const typedMetrics: readonly ProductionProofMetricRecord[] = homepageProductionProofMetricsConfiguration;

describe("homepageProductionProofConfiguration", () => {
  it("exposes exactly eight metrics with unique keys", () => {
    expect(homepageProductionProofMetricsConfiguration).toHaveLength(8);

    const metricKeys = homepageProductionProofMetricsConfiguration.map(
      (metric) => metric.metricKey,
    );
    expect(new Set(metricKeys).size).toBe(metricKeys.length);
  });

  it("keeps every timeline-sourced metric value traceable to the Experience timeline", () => {
    const timelineMetrics = homepageProductionProofMetricsConfiguration.filter(
      (metric) => metric.sourceReference === experienceTimelineSourceReference,
    );
    expect(timelineMetrics).toHaveLength(5);
    for (const metric of timelineMetrics) {
      // Tiles use a compact "100K-150K" range; the timeline spells it "100K to 150K".
      const expected = metric.valueLabel.replace(" → ", " to ").replace(/(\d+K)-(\d+K)/g, "$1 to $2").replace(/\bhrs$/, "hours");
      // Boundaries stop a fragment such as "0K-150K" passing as a substring of "100K to 150K".
      const escaped = expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      expect(serialisedWorkHistory).toMatch(new RegExp(`(?<![\\w.])${escaped}(?![\\w])`));
    }
  });

  it("adds the Tap Invest onboarding card with the confirmed values", () => {
    const tapInvest = homepageProductionProofMetricsConfiguration.find(
      (metric) => metric.metricKey === "tapInvestOnboardingTime",
    );
    expect(tapInvest).toMatchObject({
      valueLabel: "2-3 days → 3-4 hrs",
      metricLabel: "Onboarding time",
    });
    expect(tapInvest?.builtAt).toBe("Tap Invest");
    expect((tapInvest as ProductionProofMetricRecord | undefined)?.contextLine).toBe(
      "Automated onboarding for new asset-leasing businesses, from document checks to the listing on the app",
    );
  });

  it("adds the Tap Invest frontend and CV outcome cards with their cited sources", () => {
    const byKey = Object.fromEntries(
      homepageProductionProofMetricsConfiguration.map((metric) => [metric.metricKey, metric]),
    );
    expect(byKey.tapInvestFrontendFromScratch).toMatchObject({
      valueLabel: "Built from scratch",
      metricLabel: "Frontend web app",
      builtAt: "Tap Invest",
      contextLine: "Architecture and build",
    });
    expect(byKey.tapInvestRenderEngineOpsWork).toMatchObject({ valueLabel: "~10x", metricLabel: "Less ops work" });
    expect(byKey.tapInvestDesignSystemDelivery).toMatchObject({
      valueLabel: "~10x",
      metricLabel: "Faster feature delivery",
    });
    for (const metric of homepageProductionProofMetricsConfiguration) {
      expect(metric.sourceReference.trim().length, metric.metricKey).toBeGreaterThan(0);
    }
  });

  it("does not bring back the four pre-#79 getbujo tiles, which are all excluded claims", () => {
    for (const oldValue of ["~100k/day", "$0 → $150K ARR", "~30k/month", "~$20k MRR"]) {
      expect(findRetiredClaims(oldValue), oldValue).not.toEqual([]);
      expect(JSON.stringify(homepageProductionProofMetricsConfiguration)).not.toContain(oldValue);
    }
  });

  it("names the section with Ashwani's phrase", () => {
    expect(homepageProductionProofSectionCopyConfiguration.sectionHeading).toBe("Outcomes achieved");
    expect(homepageProductionProofSectionCopyConfiguration.carouselLabel).toBe("Outcome cards");
  });

  it("backs the Tap Invest frontend and ~10x cards with lines in the Tap Invest timeline entry", () => {
    const tapInvestLines = homepageWorkHistoryConfiguration.find((role) => role.roleKey === "tapinvest")!.detailLines;
    expect(tapInvestLines).toContain("Architected the frontend web app from scratch.");
    expect(tapInvestLines.join(" ")).toContain("server-driven page-render engine that reads layout from the database: about 10x less ops work");
    expect(tapInvestLines.join(" ")).toContain(
      "design system and the designer-to-developer handoff: about 10x faster feature delivery",
    );
    expect(tapInvestLines.join(" ")).not.toMatch(/[\u2013\u2014]/);
  });

  it("carries no excluded or retired claim on any card", () => {
    expect(findRetiredClaims(JSON.stringify(homepageProductionProofMetricsConfiguration))).toEqual([]);
    expect(findRetiredClaims(JSON.stringify(homepageProductionProofSectionCopyConfiguration))).toEqual([]);
  });

  it("splits the tiles two from getbujo, two from AIClicks and four from Tap Invest", () => {
    const sources = homepageProductionProofMetricsConfiguration.map((metric) => metric.builtAt);
    expect(sources).toEqual([
      "getbujo",
      "getbujo",
      "AIClicks",
      "AIClicks",
      "Tap Invest",
      "Tap Invest",
      "Tap Invest",
      "Tap Invest",
    ]);
  });

  it("keeps every value label token short enough for a four-column tile", () => {
    // "/" and "→" give browsers no line-break opportunity, so a long token in the
    // big-number slot clips the tile instead of wrapping. Nouns belong in metricLabel.
    for (const metric of homepageProductionProofMetricsConfiguration) {
      for (const token of metric.valueLabel.split(/\s+/)) {
        expect(token.length, `${metric.metricKey}: "${token}"`).toBeLessThanOrEqual(
          maxValueLabelTokenLength,
        );
      }
    }
  });

  it("fills every copy field on every metric", () => {
    for (const metric of homepageProductionProofMetricsConfiguration) {
      expect(metric.metricLabel.trim().length).toBeGreaterThan(0);
    }
    for (const metric of typedMetrics) {
      if (metric.contextLine !== undefined) expect(metric.contextLine.trim().length).toBeGreaterThan(0);
    }
  });

  it("labels every outcome with where it was built, using the Experience timeline company name, and no logos", () => {
    const timelineCompanies = homepageWorkHistoryConfiguration.map((role) => role.company);
    for (const metric of typedMetrics) {
      expect(timelineCompanies, metric.metricKey).toContain(metric.builtAt);
      // The company is carried by the pill, so the caption does not repeat it.
      expect(metric.contextLine ?? "", metric.metricKey).not.toMatch(/^(getbujo|AIClicks|Tap Invest)\b/);
    }
    expect(JSON.stringify(homepageProductionProofMetricsConfiguration)).not.toMatch(/logo|\.(svg|png|webp)/i);
  });

  it("marks all eight outcomes as shipped to production (each describes live production work)", () => {
    expect(typedMetrics.every((metric) => metric.inProduction === true)).toBe(true);
    expect(homepageProductionProofSectionCopyConfiguration.builtAtPillPrefix).toBe("Built at");
    expect(homepageProductionProofSectionCopyConfiguration.inProductionPillLabel).toBe("In production");
  });

  it("renders section copy without em dashes so the strip stays scannable", () => {
    const sectionCopy = [
      homepageProductionProofSectionCopyConfiguration.sectionHeading,
      ...homepageProductionProofSectionCopyConfiguration.sectionIntroLines,
      ...typedMetrics.flatMap((metric) => [
        metric.metricLabel,
        metric.contextLine ?? "",
      ]),
    ].join(" ");

    expect(sectionCopy).not.toMatch(/[\u2013\u2014]/);
  });
});
