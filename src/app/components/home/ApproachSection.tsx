import { approach } from "../../content/homeContent";

export function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading">
      <h2 id="approach-heading" className="text-3xl font-semibold lg:text-4xl">{approach.title}</h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[color:var(--muted-foreground)]">{approach.description}</p>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {approach.steps.map((step) => (
          <li key={step.number} className="rounded-md border border-[color:var(--border)] bg-white p-5">
            <div className="flex items-center gap-2 text-[color:var(--clay)]">
              <span className="text-2xl font-semibold">{step.number}</span>
              <span className="h-0.5 w-6 bg-[color:var(--accent)]" aria-hidden="true" />
            </div>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-1.5 leading-7 text-[color:var(--muted-foreground)]">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
