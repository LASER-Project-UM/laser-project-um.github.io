import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { hero } from "../../content/homeContent";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--primary)] text-white" aria-labelledby="hero-heading">
      <div className="absolute inset-0">
        <ImageWithFallback src={hero.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,39,76,.95) 0%, rgba(0,39,76,.88) 44%, rgba(0,39,76,.5) 100%)" }} />
      </div>
      <div className="relative mx-auto max-w-[1360px] px-4 py-14 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="mb-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/90">{hero.description}</p>
          <p className="mb-7 mt-4 max-w-3xl text-lg leading-relaxed text-white/90">
            LASER is generously supported by the{" "}
            <a
              href={hero.supportUrl}
              className="font-semibold text-white underline decoration-[color:var(--accent)] decoration-2 underline-offset-4 hover:text-[color:var(--accent)]"
            >
              {hero.supportName}
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/datasets" className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--accent)] px-6 py-3.5 font-semibold text-[color:var(--primary)] transition hover:brightness-105">
              Explore datasets <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/publications" className="inline-flex items-center rounded-sm border-2 border-white/50 px-6 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">Read publications</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
