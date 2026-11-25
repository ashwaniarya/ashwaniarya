import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";

import { CaseStudySummaryCard } from "./CaseStudySummaryCard";

describe("CaseStudySummaryCard", () => {
  it("shows where each case study was built as a text pill, with no logo image", () => {
    for (const caseStudy of getAllCaseStudies()) {
      const markup = renderToStaticMarkup(<CaseStudySummaryCard caseStudy={caseStudy} />);
      expect(markup).toContain('data-test="case-study-built-at-pill"');
      expect(markup).toContain(`Built at ${caseStudy.company}</span>`);
      expect(markup).not.toMatch(/<img/);
      // Case studies get no In production pill; that pill is for outcome cards only.
      expect(markup).not.toContain("In production");
    }
  });
});
