import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { caseStudyProductChapterPolicy } from "@/app/constants/policy";

import {
  CaseStudyProductImpactSnapshot,
  productImpactSnapshotHasRenderableContent,
} from "./CaseStudyProductImpactSnapshot";

describe("productImpactSnapshotHasRenderableContent", () => {
  it("returns false when all string fields are empty or whitespace", () => {
    expect(
      productImpactSnapshotHasRenderableContent({
        stageLabel: "  ",
        dailyReachLabel: "",
      }),
    ).toBe(false);
  });

  it("returns true when revenue alone is provided", () => {
    expect(
      productImpactSnapshotHasRenderableContent({
        stageLabel: "",
        dailyReachLabel: "",
        revenueLabel: "~$1 MRR",
      }),
    ).toBe(true);
  });
});

describe("CaseStudyProductImpactSnapshot", () => {
  it("renders join time and sessions and omits opens when revenueLabel is undefined", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductImpactSnapshot
        snapshot={{ stageLabel: "24s → 6s", dailyReachLabel: "100K–150K" }}
      />,
    );
    expect(html).toContain(
      caseStudyProductChapterPolicy.impactSnapshotHeadingClassName,
    );
    expect(html).toContain(
      caseStudyProductChapterPolicy.impactSnapshotPanelFrameClassName,
    );
    expect(html).toContain("Impact Metric");
    expect(html).toContain(
      caseStudyProductChapterPolicy.impactSnapshotMetricLabelRowClassName,
    );
    expect(html).toContain(
      caseStudyProductChapterPolicy.impactSnapshotMetricLabelRailClassName,
    );
    expect(html).toContain("24s → 6s");
    expect(html).toContain("100K–150K");
    expect(html).toContain("Join time");
    expect(html).toContain("Sessions");
    expect(html).not.toContain("Opens");
    expect(html).toContain('aria-labelledby="');
    expect(html).toContain("<section");
  });

  it("renders the opens row when revenueLabel is provided", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductImpactSnapshot
        snapshot={{
          stageLabel: "24s → 6s",
          dailyReachLabel: "100K–150K",
          revenueLabel: "4K–5K",
        }}
      />,
    );
    expect(html).toContain("Opens");
    expect(html).toContain("4K–5K");
  });

  it("renders nothing when snapshot has no non-empty values", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductImpactSnapshot
        snapshot={{ stageLabel: "", dailyReachLabel: "" }}
      />,
    );
    expect(html).toBe("");
  });
});
