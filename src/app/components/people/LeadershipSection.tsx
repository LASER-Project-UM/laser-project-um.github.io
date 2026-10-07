import type { Person } from "../../content/peopleContent";
import { PersonCard } from "./PersonCard";

export function LeadershipSection({ investigators }: { investigators: Person[] }) {
  if (investigators.length === 0) return null;
  return <section className="mb-14">
    <h2 className="mb-5 text-2xl font-semibold">Principal Investigators</h2>
    <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">{investigators.map((person) => <PersonCard key={person.name} person={person} />)}</div>
  </section>;
}
