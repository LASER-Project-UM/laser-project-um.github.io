import type { PlainTextItem } from "../content/plainTextContent";

export function PlainTextListing({ items, emptyMessage }: { items: PlainTextItem[]; emptyMessage: string }) {
  if (items.length === 0) {
    return <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-6">
      {items.map((item, index) => (
        <article key={`${item.TITLE}-${index}`} className="border-l-4 border-[color:var(--accent)] bg-[color:var(--secondary)] p-6">
          {item.TYPE && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--clay)]">{item.TYPE}</p>}
          <h2 className="text-2xl font-semibold">{item.TITLE}</h2>
          {(item.AUTHORS || item.DATE || item.VENUE) && (
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{[item.AUTHORS, item.VENUE, item.DATE].filter(Boolean).join(" · ")}</p>
          )}
          {item.DESCRIPTION && <p className="mt-4 leading-7">{item.DESCRIPTION}</p>}
          {item.LINK && <a className="mt-4 inline-block font-semibold text-[color:var(--primary)] hover:underline" href={item.LINK} target="_blank" rel="noreferrer">{item["LINK LABEL"] || "Learn more"}</a>}
        </article>
      ))}
    </div>
  );
}
