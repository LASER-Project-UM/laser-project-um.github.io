import { User } from "lucide-react";
import type { TeamLeader } from "../../content/peopleContent";

export function LeaderCard({ leader }: { leader: TeamLeader }) {
  return (
    <article className="overflow-hidden border border-border bg-white">
      <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
        {leader.image ? (
          <img src={leader.image} alt={leader.name} className="h-full w-full object-cover" style={{ objectPosition: leader.imagePosition ?? "center" }} />
        ) : (
          <div className="flex h-full w-full items-center justify-center"><User className="h-10 w-10 text-muted-foreground" /></div>
        )}
      </div>
      <div className="p-6 lg:p-7">
        <h3 className="mb-1">{leader.name}</h3>
        <div className="mb-1 text-sm font-medium text-foreground">{leader.role}</div>
        <div className="mb-4 text-sm leading-6 text-muted-foreground">{leader.institution}</div>
        <p className="leading-7 text-muted-foreground">{leader.bio}</p>
      </div>
    </article>
  );
}
