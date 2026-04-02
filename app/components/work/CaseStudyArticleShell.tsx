import type { ReactNode } from "react";

import { caseStudyArticleShellPolicy } from "@/app/constants/policy";

export type CaseStudyArticleShellProps = Readonly<{
  children: ReactNode;
}>;

export function CaseStudyArticleShell({ children }: CaseStudyArticleShellProps) {
  return (
    <article className={caseStudyArticleShellPolicy.articleShellColumnClassName}>
      {children}
    </article>
  );
}
