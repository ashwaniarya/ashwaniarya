import { HeroSection } from "@/app/components/homepage/HeroSection";
import { HomepageContactSection } from "@/app/components/homepage/HomepageContactSection";
import { HomepageProjectsSection } from "@/app/components/homepage/HomepageProjectsSection";
import { HomepageTechnologyStackSection } from "@/app/components/homepage/HomepageTechnologyStackSection";
import { PageLayout } from "@/app/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <HomepageProjectsSection />
      <HomepageTechnologyStackSection />
      <HomepageContactSection />
    </PageLayout>
  );
}
