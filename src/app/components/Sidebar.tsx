import { Link, useLocation } from "react-router";
import { ArrowRight, Mail } from "lucide-react";

/**
 * Left navigation rail, styled after the SEAS interior-page sidebar but
 * enriched so it fills the column with useful content (nav + context card +
 * contact) rather than leaving empty space. Sticky on large screens.
 *
 * Accessibility: rendered as a labelled <nav> landmark with aria-current on
 * the active link; all interactive targets are real links with visible focus.
 */

const links = [
  { path: "/", label: "Home" },
  { path: "/people", label: "People" },
  { path: "/datasets", label: "Datasets" },
  { path: "/publications", label: "Publications" },
  { path: "/blog", label: "Updates" },
  { path: "/connect", label: "Connect" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      {/* Maize top rule */}
      <div className="h-1 w-12 rounded bg-[color:var(--accent)]" />

      <nav aria-label="LASER site sections" className="pt-5">
        <Link
          to="/"
          className="block text-xl font-semibold leading-none text-[color:var(--primary)] hover:underline"
        >
          LASER <span aria-hidden="true">»</span>
        </Link>
        <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted-foreground)]">
          Life-cycle · Ecosystems · Risk
        </p>

        <ul className="mt-5 space-y-0.5">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    "flex items-center justify-between gap-2 border-l-2 py-2 pl-3 pr-2 text-[0.98rem] leading-snug transition-colors " +
                    (isActive
                      ? "border-[color:var(--accent)] bg-[color:var(--secondary)] font-semibold text-[color:var(--primary)]"
                      : "border-transparent text-[color:var(--primary)]/80 hover:border-[color:var(--accent)]/60 hover:bg-[color:var(--secondary)] hover:text-[color:var(--primary)]")
                  }
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="text-[color:var(--muted-foreground)]">
                    ›
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Context / call-to-action card — fills the rail with something useful */}
      <div className="mt-8 rounded-md bg-[color:var(--primary)] p-5 text-white">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">
          Open science
        </p>
        <p className="mt-2 text-[0.95rem] leading-6 text-white/90">
          Datasets, methods, and code from the LASER project are openly available
          for researchers and practitioners.
        </p>
        <Link
          to="/datasets"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-[color:var(--accent)] px-3.5 py-2 text-sm font-semibold text-[color:var(--primary)] transition-[filter] hover:brightness-95"
        >
          Browse datasets
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <Link
        to="/connect"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--primary)] hover:underline"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Questions? Get in touch
      </Link>
    </div>
  );
}
