import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { caseStudyArticleShellPolicy } from "@/app/constants/policy";

import { CaseStudyArticleShell } from "./CaseStudyArticleShell";

describe("CaseStudyArticleShell", () => {
  it("applies article stack spacing from policy", () => {
    const html = renderToStaticMarkup(
      <CaseStudyArticleShell>
        <p>Child</p>
      </CaseStudyArticleShell>,
    );
    expect(html).toContain(
      `class="${caseStudyArticleShellPolicy.articleShellColumnClassName}"`,
    );
  });
});
