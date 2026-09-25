import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router";

const footerLinks = [
  { to: "/blog", label: "Updates" },
  { to: "/people", label: "People" },
  { to: "/datasets", label: "Datasets" },
  { to: "/publications", label: "Publications" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t-[3px] border-[color:var(--accent)] bg-[color:var(--primary)] text-white">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_0.8fr_1fr] lg:px-8">
        <div className="max-w-md">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
            LASER Project
          </Link>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Interdisciplinary research on the climate, ecosystem, and social
            impacts of forest–natural climate solutions.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
            Explore
          </h2>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-white/90 hover:text-[color:var(--accent)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
            Questions or collaboration?
          </h2>
          <div className="flex flex-col items-start gap-5">
            <a
              href="mailto:seas-laser@umich.edu"
              className="inline-flex max-w-full items-center gap-2 break-all text-sm text-white hover:text-[color:var(--accent)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              seas-laser@umich.edu
            </a>
            <Link
              to="/connect"
              className="inline-flex items-center gap-2 bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-[color:var(--primary)] transition-[filter] hover:brightness-95"
            >
              Connect with us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
