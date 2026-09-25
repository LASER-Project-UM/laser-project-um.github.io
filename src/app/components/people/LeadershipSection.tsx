import { teamLeaders } from "../../content/peopleContent";
import { LeaderCard } from "./LeaderCard";

export function LeadershipSection() {
  return (
    <section className="mb-14">
      <h2 className="mb-5 text-2xl font-semibold">Principal Investigators</h2>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {teamLeaders.map((leader) => <LeaderCard key={leader.name} leader={leader} />)}
      </div>
    </section>
  );
}
