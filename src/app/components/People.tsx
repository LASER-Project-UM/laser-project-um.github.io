import { currentCollaborators, externalAdvisors, pastCollaborators, teamIntroduction } from "../content/peopleContent";
import { MemberDirectorySection } from "./people/MemberDirectorySection";
import { LeadershipSection } from "./people/LeadershipSection";
import { PageShell } from "./PageShell";

export function People() {
  return (
    <PageShell breadcrumb={[["Home", "/"], ["People"]]}>
      <header className="mb-8 max-w-3xl">
        <h1 className="mb-3 text-4xl font-semibold lg:text-5xl">Our Team</h1>
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">{teamIntroduction}</p>
      </header>
      <LeadershipSection />
      <MemberDirectorySection
        title="Current Collaborators"
        description="Our current LASER members bring a wide range of expertise and collaboration to the project’s ongoing research."
        names={currentCollaborators}
      />
      <MemberDirectorySection
        title="External Advisors"
        description="External advisors contribute additional expertise and institutional perspectives to LASER research."
        names={externalAdvisors}
      />
      <MemberDirectorySection
        title="Past Collaborators"
        description="We are grateful for the contributions of past LASER collaborators whose work helped shape the project."
        names={pastCollaborators}
        last
      />
    </PageShell>
  );
}
