import type { ReactNode } from "react";

import { Heading } from "@/design-system/tokens/Typography";

export type CaseStudySectionProps = Readonly<{
  title: string;
  titleId?: string;
  children: ReactNode;
}>;

export function CaseStudySection({ title, titleId, children }: CaseStudySectionProps) {
  return (
    <section aria-labelledby={titleId} className="space-y-5 mb-6">
      <div className="flex items-start gap-3 prose-rhythm">
        <Heading level="h2" id={titleId} className="text-balance">
          {title}
        </Heading>
      </div>
      <div className="space-y-3 narrowPhoneUp:pl-0 sm:pl-2">{children}</div>
    </section>
  );
}
