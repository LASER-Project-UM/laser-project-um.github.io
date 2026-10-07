import { User } from "lucide-react";
import { personPhotoUrl, type Person } from "../../content/peopleContent";

export function PersonCard({ person }: { person: Person }) {
  const photo = personPhotoUrl(person);
  // Put compact labels first so longer research-area names do not force an
  // unnecessarily short first row and leave a large empty space beside it.
  const balancedTeams = [...person.teams].sort((a, b) => a.length - b.length);
  return (
    <article className="overflow-hidden bg-white px-6 lg:px-7">
      <div className="aspect-[4/5] w-full overflow-hidden bg-white">
        {photo ? <img src={photo} alt={person.name} className="h-full w-full object-cover object-[center_25%]" /> : (
          <div className="flex h-full min-h-40 w-full items-center justify-center"><User className="h-10 w-10 text-muted-foreground" aria-hidden="true" /></div>
        )}
      </div>
      <div className="py-6 lg:py-7">
        <h3 className="mb-2 text-2xl">{person.name}</h3>
        {person.title && <div className="mb-4 font-medium text-foreground">{person.title}</div>}
        {balancedTeams.length > 0 && <div className="mb-4 flex flex-wrap gap-2">{balancedTeams.map((team) => (
          <span key={team} className="border border-black bg-white px-3 py-1.5 text-sm text-primary">{team}</span>
        ))}</div>}
        {person.bio && <p className="text-lg leading-8 text-muted-foreground">{person.bio}</p>}
      </div>
    </article>
  );
}
