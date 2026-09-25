import { PageShell } from "./PageShell";
import { ApproachSection } from "./home/ApproachSection";
import { FocalRegionsSection } from "./home/FocalRegionsSection";
import { HeroSection } from "./home/HeroSection";
import { ProjectGlanceSection } from "./home/ProjectGlanceSection";
import { ResearchAreasSection } from "./home/ResearchAreasSection";
import { ResourcesSection } from "./home/ResourcesSection";
import { UpdatesSection } from "./home/UpdatesSection";

export function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectGlanceSection />
      <PageShell>
        <div className="space-y-14">
          <ApproachSection />
          <UpdatesSection />
          <ResearchAreasSection />
          <FocalRegionsSection />
          <ResourcesSection />
        </div>
      </PageShell>
    </div>
  );
}
