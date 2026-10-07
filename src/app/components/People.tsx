import { useState } from "react";
import { peopleInCategoryAndTeam, researchTeams, teamIntroduction } from "../content/peopleContent";
import { MemberDirectorySection } from "./people/MemberDirectorySection";
import { LeadershipSection } from "./people/LeadershipSection";
import { PageShell } from "./PageShell";

export function People() {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const investigators = peopleInCategoryAndTeam("Principal Investigator", selectedTeam);
  const teamMembers = peopleInCategoryAndTeam("Team Member", selectedTeam);
  const advisors = peopleInCategoryAndTeam("External Advisor", selectedTeam);
  const pastCollaborators = peopleInCategoryAndTeam("Past Collaborator", selectedTeam);

  return (
    <PageShell breadcrumb={[["Home", "/"], ["People"]]}>
      <header className="mb-8 w-full">
        <h1 className="mb-3 text-4xl font-semibold lg:text-5xl">Our Team</h1>
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">{teamIntroduction}</p>
      </header>
      <nav aria-label="Filter people by research area" className="mb-12 flex flex-wrap gap-2.5">
        {["All", ...researchTeams].map((team) => (
          <button
            key={team}
            type="button"
            onClick={() => setSelectedTeam(team)}
            aria-pressed={selectedTeam === team}
            className={`px-4 py-2 text-sm font-medium transition-colors ${selectedTeam === team ? "border border-primary bg-primary text-white" : "border border-black bg-white text-foreground hover:bg-secondary"}`}
          >
            {team}
          </button>
        ))}
      </nav>
      <LeadershipSection investigators={investigators} />
      <MemberDirectorySection
        title="Team Members"
        description="Our current LASER members bring a wide range of expertise and collaboration to the project’s ongoing research."
        people={teamMembers}
      />
      <MemberDirectorySection
        title="External Advisors"
        description="External advisors contribute additional expertise and institutional perspectives to LASER research."
        people={advisors}
      />
      <MemberDirectorySection
        title="Past Collaborators"
        description="We are grateful for the contributions of past LASER collaborators whose work helped shape the project."
        people={pastCollaborators}
        last
      />
    </PageShell>
  );
}
