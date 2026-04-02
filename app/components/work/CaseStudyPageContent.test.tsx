import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getCaseStudyBySlug } from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyArticleShellPolicy } from "@/app/constants/policy";

import { CaseStudyPageContent } from "./CaseStudyPageContent";

describe("CaseStudyPageContent", () => {
  it("wraps header and body sections with distinct vertical rhythm from policy", () => {
    const caseStudy = getCaseStudyBySlug("getbujo");
    expect(caseStudy).toBeDefined();
    const html = renderToStaticMarkup(
      <CaseStudyPageContent caseStudy={caseStudy!} />,
    );
    expect(html).toContain(
      `class="${caseStudyArticleShellPolicy.caseStudyHeaderBlockBottomMarginClassName}"`,
    );
    expect(html).toContain(
      `class="${caseStudyArticleShellPolicy.caseStudyBodySectionsVerticalStackClassName}"`,
    );
  });
});
