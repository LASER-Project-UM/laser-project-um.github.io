import { projectFacts } from "../../content/homeContent";

export function ProjectGlanceSection() {
  return (
    <section className="bg-[var(--um-blue-800)] text-white" aria-labelledby="glance-heading">
      <div className="mx-auto max-w-[1360px] px-4 py-9 lg:px-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="h-0.5 w-6 bg-[color:var(--accent)]" aria-hidden="true" />
          <h2 id="glance-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">The project at a glance</h2>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
          {projectFacts.map((fact) => (
            <div key={fact.label} className="border-l-2 border-[color:var(--accent)]/50 pl-4">
              <dd className="text-4xl font-semibold leading-none text-[color:var(--accent)] lg:text-5xl">{fact.value}</dd>
              <dt className="mt-2.5 text-base font-semibold text-white">{fact.label}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-white/75">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
