import { describe, expect, it } from "vitest";

import {
  homepageProductionProofMetricsConfiguration,
  homepageProductionProofSectionCopyConfiguration,
} from "@/app/config/homepageProductionProofConfiguration";
import { getCaseStudyBySlug } from "@/app/config/portfolioCaseStudiesConfiguration";

const serialisedGetbujoCaseStudy = JSON.stringify(getCaseStudyBySlug("getbujo"));

describe("homepageProductionProofConfiguration", () => {
  it("exposes exactly four metrics with unique keys", () => {
    expect(homepageProductionProofMetricsConfiguration).toHaveLength(4);

    const metricKeys = homepageProductionProofMetricsConfiguration.map(
      (metric) => metric.metricKey,
    );
    expect(new Set(metricKeys).size).toBe(metricKeys.length);
  });

  it("keeps every metric value traceable to the getbujo case study", () => {
    for (const metric of homepageProductionProofMetricsConfiguration) {
      expect(serialisedGetbujoCaseStudy).toContain(metric.valueLabel);
    }
  });

  it("fills every copy field on every metric", () => {
    for (const metric of homepageProductionProofMetricsConfiguration) {
      expect(metric.metricLabel.trim().length).toBeGreaterThan(0);
      expect(metric.contextLine.trim().length).toBeGreaterThan(0);
    }
  });

  it("renders section copy without em dashes so the strip stays scannable", () => {
    const sectionCopy = [
      homepageProductionProofSectionCopyConfiguration.sectionHeading,
      ...homepageProductionProofSectionCopyConfiguration.sectionIntroLines,
      ...homepageProductionProofMetricsConfiguration.flatMap((metric) => [
        metric.metricLabel,
        metric.contextLine,
      ]),
    ].join(" ");

    expect(sectionCopy).not.toContain("—");
  });
});
