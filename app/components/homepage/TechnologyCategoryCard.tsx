import { Card } from "@/app/components/content/Card";
import { resolveTechnologyStackIcon } from "@/app/config/technologyStackIconRegistry";
import { homepageTechnologyStackSectionPolicy } from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export type TechnologyCategoryCardProps = Readonly<{
  categoryTitle: string;
  itemLabels: readonly string[];
}>;

export function TechnologyCategoryCard({
  categoryTitle,
  itemLabels,
}: TechnologyCategoryCardProps) {
  return (
    <Card className="h-full">
      <div className="space-y-2">
        <Heading level="h3">{categoryTitle}</Heading>
        <ul className={homepageTechnologyStackSectionPolicy.technologyItemListClassName}>
          {itemLabels.map((label) => {
            const Icon = resolveTechnologyStackIcon(label);
            return (
              <li key={label}>
                <div
                  className={
                    homepageTechnologyStackSectionPolicy.technologyItemRowClassName
                  }
                >
                  <Icon
                    aria-hidden
                    className={
                      homepageTechnologyStackSectionPolicy.technologyItemIconClassName
                    }
                  />
                  <BodyText size="sm" className="text-textSecondary">
                    {label}
                  </BodyText>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
