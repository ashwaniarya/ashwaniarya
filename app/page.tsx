import { HeroSection } from "@/app/components/homepage/HeroSection";
import { HomepageAboutMeSection } from "@/app/components/homepage/HomepageAboutMeSection";
import { HomepageExperienceSection } from "@/app/components/homepage/HomepageExperienceSection";
import { HomepageContactSection } from "@/app/components/homepage/HomepageContactSection";
import { HomepageProductionProofSection } from "@/app/components/homepage/HomepageProductionProofSection";
import { HomepageProjectsSection } from "@/app/components/homepage/HomepageProjectsSection";
import { HomepageSelectedWorkSection } from "@/app/components/homepage/HomepageSelectedWorkSection";
import { HomepageTechnologyStackSection } from "@/app/components/homepage/HomepageTechnologyStackSection";
import { PageLayout } from "@/app/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <HomepageAboutMeSection />
      <HomepageProductionProofSection />
      <HomepageSelectedWorkSection />
      <HomepageExperienceSection />
      <HomepageProjectsSection />
      <HomepageTechnologyStackSection />
      <HomepageContactSection />
    </PageLayout>
  );
}
