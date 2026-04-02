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
    <section className="space-y-4 mb-6">
      <div className="flex items-start gap-3 prose-rhythm">
        <EditorialAccentMark variant="verticalSection" />
        <Heading level="h2" id={titleId} className="text-balance">
          {title}
        </Heading>
      </div>
      <div className="space-y-3 narrowPhoneUp:pl-0 sm:pl-2">{children}</div>
    </section>
  );
}
