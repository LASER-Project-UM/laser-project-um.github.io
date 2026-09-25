import { focalRegions } from "../../content/homeContent";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function FocalRegionsSection() {
  return (
    <section aria-labelledby="regions-heading">
      <h2 id="regions-heading" className="text-3xl font-semibold lg:text-4xl">One framework, contrasting forest systems</h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[color:var(--muted-foreground)]">Boreal, temperate, and tropical biomes face different climate, management, and social pressures. Assessing them with a single, spatially explicit method makes results comparable across very different forests.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {focalRegions.map((region) => (
          <figure key={region.country} className="group m-0 overflow-hidden rounded-md border border-[color:var(--border)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--muted)]">
              <ImageWithFallback src={region.image} alt={region.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--primary)]/90 to-transparent p-4">
                <figcaption>
                  <span className="block text-lg font-semibold text-white">{region.country}</span>
                  <span className="block text-xs uppercase tracking-[0.08em] text-white/80">{region.biome}</span>
                </figcaption>
              </div>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
