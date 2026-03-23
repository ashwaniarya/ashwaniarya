import { HeroSection } from "@/app/components/homepage/HeroSection";
import { PageLayout } from "@/app/components/layout/PageLayout";
import { ProjectSection } from "@/app/components/sections/ProjectSection";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <ProjectSection
        left={
          <div className="space-y-2">
            <Heading level="h2">Projects</Heading>
            <BodyText className="max-w-prose text-textSecondary">
              A two-column section shell. You control the left and right content.
            </BodyText>
          </div>
        }
        right={
          <div className="space-y-2">
            <Heading level="h3">Right panel</Heading>
            <BodyText className="max-w-prose text-textSecondary">
              Drop in cards, timelines, screenshots, or any React content here.
            </BodyText>
          </div>
        }
      />
    </PageLayout>
  );
}
