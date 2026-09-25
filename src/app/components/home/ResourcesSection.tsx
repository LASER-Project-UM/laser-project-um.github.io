import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { projectResources } from "../../content/homeContent";

export function ResourcesSection() {
  return (
    <section aria-labelledby="resources-heading" className="rounded-lg bg-[color:var(--primary)] p-6 text-white lg:p-9">
      <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[color:var(--accent)] before:h-0.5 before:w-6 before:bg-[color:var(--accent)] before:content-['']">Explore the work</p>
      <h2 id="resources-heading" className="mt-3 text-2xl font-semibold text-white lg:text-3xl">Datasets, publications, and updates</h2>
      <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
        {projectResources.map((resource) => (
          <Link key={resource.title} to={resource.href} className="group flex items-start gap-4 border-t border-white/20 py-5 transition-colors hover:border-[color:var(--accent)]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-white/40 transition-colors group-hover:border-[color:var(--accent)] group-hover:bg-[color:var(--accent)] group-hover:text-[color:var(--primary)]">
              <resource.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="mb-0.5 block text-lg font-semibold text-white">{resource.title}</span>
              <span className="block leading-7 text-white/80">{resource.description}</span>
            </span>
            <ArrowRight className="mt-2 h-5 w-5 shrink-0 self-start opacity-50 transition group-hover:text-[color:var(--accent)] group-hover:opacity-100" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
