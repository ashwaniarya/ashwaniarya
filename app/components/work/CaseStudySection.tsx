import type { ReactNode } from "react";

import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { Heading } from "@/design-system/tokens/Typography";

export type CaseStudySectionProps = Readonly<{
  title: string;
  titleId?: string;
  children: ReactNode;
}>;

export function CaseStudySection({ title, titleId, children }: CaseStudySectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3">
        <EditorialAccentMark variant="verticalSection" />
        <Heading level="h2" id={titleId} className="text-balance">
          {title}
        </Heading>
      </div>
      <div className="space-y-3 pl-3 sm:pl-4">{children}</div>
    </section>
  );
}
