import { useState } from "react";
import { PageShell } from "./PageShell";
import publicationsText from "../../../EDIT-CONTENT/PUBLICATIONS.txt?raw";
import { parsePlainTextListing, sortNewestFirst } from "../content/plainTextContent";
import { ExternalLink } from "lucide-react";

export function Publications() {
  const content = parsePlainTextListing(publicationsText);
  const items = sortNewestFirst(content.items);
  const [filter, setFilter] = useState<"all" | "publications" | "conferences">("all");
  const visibleItems = items.filter((item) => {
    const type = (item.TYPE || "Publication").toLowerCase();
    if (filter === "publications") return type === "publication";
    if (filter === "conferences") return type.startsWith("conference");
    return true;
  });

  return (
    <PageShell breadcrumb={[["Home", "/"], ["Publications"]]}>
      <header className="mb-8 max-w-5xl">
        <h1 className="mb-5 text-4xl font-semibold lg:text-5xl">Publications &amp; Conferences</h1>
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">
          LASER publications examine the climate, ecosystem, and social impacts of forest-natural climate solutions through interdisciplinary research spanning carbon accounting, biodiversity, geospatial analysis, and community-centered assessment. Together, these outputs reflect the project’s broader goal of building more transparent, spatially explicit, and cross-disciplinary approaches to evaluating forest-climate interventions.
        </p>
      </header>
      {items.length === 0 ? (
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">{content.emptyMessage}</p>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter publications and conferences">
            {([
              ["all", "All"],
              ["publications", "Publications"],
              ["conferences", "Conferences"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={`border px-4 py-2 text-sm font-semibold transition ${filter === value ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white" : "border-[color:var(--border)] bg-white text-[color:var(--primary)] hover:border-[color:var(--primary)]"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid gap-6">
            {visibleItems.length === 0 && (
              <p className="border border-[color:var(--border)] bg-[color:var(--secondary)] p-6 text-[color:var(--muted-foreground)]">
                No {filter === "conferences" ? "conference entries" : "publications"} are available yet.
              </p>
            )}
            {visibleItems.map((item, index) => {
              const type = item.TYPE || "Publication";
              const isConference = type.toLowerCase().startsWith("conference");
              return (
                <article key={`${item.TITLE}-${index}`} className="border border-[color:var(--border)] bg-white px-6 py-7 sm:px-10 sm:py-9">
                  <p className={`mb-4 inline-flex px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white ${isConference ? "bg-[color:var(--clay)]" : "bg-[color:var(--primary)]"}`}>{type}</p>
                  <h2 className="max-w-6xl text-xl font-semibold leading-snug sm:text-2xl">{item.TITLE}</h2>
                  {(item.AUTHORS || item.DATE) && (
                    <p className="mt-4 text-base text-[color:var(--muted-foreground)]">
                      {item.AUTHORS}{item.AUTHORS && item.DATE ? ` (${item.DATE})` : item.DATE}
                    </p>
                  )}
                  {item.VENUE && <p className="mt-2 text-base font-medium">{item.VENUE}</p>}
                  {item.DESCRIPTION && <p className="mt-5 max-w-6xl text-base leading-7 text-[color:var(--muted-foreground)]">{item.DESCRIPTION}</p>}
                  {item.LINK && (
                    <a className="mt-5 inline-flex items-center gap-2 text-base font-medium text-[color:var(--foreground)] underline decoration-1 underline-offset-4 hover:text-[color:var(--primary)]" href={item.LINK} target="_blank" rel="noreferrer">
                      <ExternalLink aria-hidden="true" className="h-5 w-5" />
                      {item["LINK LABEL"] || "Learn more"}
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}
    </PageShell>
  );
}
