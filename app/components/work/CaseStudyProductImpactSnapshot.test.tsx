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
  it("renders Stage and Daily reach and omits Revenue when revenueLabel is undefined", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductImpactSnapshot
        snapshot={{ stageLabel: "Early", dailyReachLabel: "~100k/day" }}
      />,
    );
    expect(html).toContain(
      caseStudyProductChapterPolicy.impactSnapshotHeadingClassName,
    );
    expect(html).toContain("Early");
    expect(html).toContain("~100k/day");
    expect(html).toContain("Stage");
    expect(html).toContain("Daily reach");
    expect(html).not.toContain("Revenue");
    expect(html).toContain('aria-labelledby="');
    expect(html).toContain("<section");
  });

  it("renders Revenue row when revenueLabel is provided", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductImpactSnapshot
        snapshot={{
          stageLabel: "Early",
          dailyReachLabel: "~80 agents",
          revenueLabel: "~$20k MRR",
        }}
      />,
    );
    expect(html).toContain("Revenue");
    expect(html).toContain("~$20k MRR");
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
