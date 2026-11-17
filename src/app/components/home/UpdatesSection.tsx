import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { getUpdatePosts } from "../../content/updatesContent";

export function UpdatesSection() {
  const latest = getUpdatePosts()[0];
  return (
    <section aria-labelledby="updates-heading" className="border-l-4 border-[color:var(--accent)] bg-[color:var(--secondary)] px-6 py-5 lg:flex lg:items-center lg:justify-between lg:gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--clay)]">Latest from LASER</p>
        <h2 id="updates-heading" className="mt-1 text-2xl font-semibold">Research updates</h2>
        <p className="mt-2 max-w-3xl leading-7 text-[color:var(--muted-foreground)]">{latest ? `${latest.title}${latest.date ? ` · ${latest.date}` : ""}` : "Project news and research progress will be highlighted here as updates become available."}</p>
      </div>
      <Link to={latest?.separatePage ? `/blog/${latest.slug}` : "/blog"} className="mt-4 inline-flex shrink-0 items-center gap-2 font-semibold text-[color:var(--primary)] hover:underline lg:mt-0">
        {latest ? "Read latest update" : "View updates"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
