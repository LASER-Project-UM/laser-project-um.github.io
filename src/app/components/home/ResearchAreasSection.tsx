import { researchAreas } from "../../content/homeContent";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ResearchAreasSection() {
  return (
    <section aria-labelledby="areas-heading">
      <h2 id="areas-heading" className="text-3xl font-semibold lg:text-4xl">Core areas of work</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {researchAreas.map((area) => (
          <figure key={area.title} className="m-0 flex flex-col overflow-hidden rounded-md border border-[color:var(--border)] bg-white transition-shadow hover:shadow-md">
            <div className="relative aspect-[3/2] overflow-hidden bg-[color:var(--muted)]">
              <ImageWithFallback src={area.image} alt={area.alt} className={`h-full w-full ${area.containImage ? "bg-white object-contain" : "object-cover"}`} />
              <span className="absolute left-3 top-3 rounded-sm px-2 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.06em] text-white" style={{ backgroundColor: area.tagColor }}>{area.tag}</span>
              {area.credit && <span className="absolute bottom-2 right-2 rounded-sm bg-black/65 px-2 py-1 text-[0.62rem] font-medium tracking-[0.02em] text-white">{area.credit}</span>}
            </div>
            <figcaption className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold">{area.title}</h3>
              <p className="mt-2 leading-7 text-[color:var(--muted-foreground)]">{area.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
