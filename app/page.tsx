import { HeroSection } from "@/app/components/homepage/HeroSection";
import { HomepageExperienceSection } from "@/app/components/homepage/HomepageExperienceSection";
import { HomepageContactSection } from "@/app/components/homepage/HomepageContactSection";
import { HomepageProjectsSection } from "@/app/components/homepage/HomepageProjectsSection";
import { HomepageTechnologyStackSection } from "@/app/components/homepage/HomepageTechnologyStackSection";
import { PageLayout } from "@/app/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <HomepageExperienceSection />
      <HomepageProjectsSection />
      <HomepageTechnologyStackSection />
      <HomepageContactSection />
    </PageLayout>
  );
}
