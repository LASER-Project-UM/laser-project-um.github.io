import type { Person } from "../../content/peopleContent";
import { PersonCard } from "./PersonCard";

export function MemberDirectorySection({ title, description, people, last = false }: { title: string; description: string; people: Person[]; last?: boolean }) {
  if (people.length === 0) return null;
  return <section className={last ? undefined : "mb-14"}>
    <div className="mb-6 w-full"><h2 className="mb-2 text-2xl font-semibold">{title}</h2><p className="text-lg leading-8 text-[color:var(--muted-foreground)]">{description}</p></div>
    <div className="grid items-start gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">{people.map((person) => <PersonCard key={person.name} person={person} />)}</div>
  </section>;
}
