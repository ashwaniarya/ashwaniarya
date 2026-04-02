import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { CaseStudyProductChapterConfiguration } from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";

import { CaseStudyProductChapter } from "./CaseStudyProductChapter";

const minimalProductChapter: CaseStudyProductChapterConfiguration = {
  heading: "Chapter title",
  segmentLabel: "B2B",
  bodyParagraphs: ["Body paragraph for layout test."],
  impactBullets: [],
  skills: [],
};

describe("CaseStudyProductChapter", () => {
  it("omits top border on body stack when product impact snapshot renders", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductChapter
        chapter={{
          ...minimalProductChapter,
          productImpactSnapshot: {
            stageLabel: "Early",
            dailyReachLabel: "~1k/day",
          },
        }}
      />,
    );
    expect(html).toContain(
      `class="${caseStudyProductChapterPolicy.productChapterBodyStackWhenAfterImpactClassName}"`,
    );
    expect(html).not.toContain(
      `class="${caseStudyProductChapterPolicy.productChapterBodyStackWhenTopRuleClassName}"`,
    );
  });

  it("keeps top border on body stack when product impact snapshot is absent", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductChapter chapter={minimalProductChapter} />,
    );
    expect(html).toContain(
      `class="${caseStudyProductChapterPolicy.productChapterBodyStackWhenTopRuleClassName}"`,
    );
    expect(html).not.toContain(
      `class="${caseStudyProductChapterPolicy.productChapterBodyStackWhenAfterImpactClassName}"`,
    );
  });

  it("renders introduction sections as h4 headings with body text before bodyParagraphs", () => {
    const html = renderToStaticMarkup(
      <CaseStudyProductChapter
        chapter={{
          ...minimalProductChapter,
          introductionSections: [
            { sectionHeading: "Overview", sectionBody: "Overview body copy." },
            { sectionHeading: "Problem", sectionBody: "Problem body copy." },
            { sectionHeading: "My role", sectionBody: "My role body copy." },
          ],
          bodyParagraphs: ["Technical paragraph one."],
        }}
      />,
    );
    expect(html).toContain("<h4");
    expect(html).toContain("Overview</h4>");
    expect(html).toContain("Problem</h4>");
    expect(html).toContain("My role</h4>");
    expect(html).toContain("Overview body copy.");
    expect(html).toContain("Problem body copy.");
    expect(html).toContain("My role body copy.");
    expect(html).toContain("Technical paragraph one.");
    expect(html).toContain(
      `class="${caseStudyProductChapterPolicy.productChapterIntroductionOuterStackClassName}"`,
    );
  });
});
