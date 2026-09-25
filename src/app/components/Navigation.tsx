import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { HeaderLogo } from "./HeaderLogo";

const links = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Updates" },
  { path: "/people", label: "People" },
  { path: "/datasets", label: "Datasets" },
  { path: "/publications", label: "Publications" },
  { path: "/connect", label: "Connect" },
];

export function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-[3px] border-[color:var(--accent)] bg-[color:var(--primary)] text-white">
      <div className="mx-auto flex min-h-[112px] max-w-[1720px] items-center gap-8 px-4 py-4 lg:px-8">
        <a
          href="https://seas.umich.edu/"
          className="block w-[min(32vw,480px)] min-w-[230px] shrink-0"
          aria-label="University of Michigan School for Environment and Sustainability"
        >
          <HeaderLogo />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden self-stretch lg:flex lg:items-center">
          <ul className="flex h-full items-center gap-[clamp(1rem,1.6vw,2rem)] border-b border-[color:var(--accent)]/80">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <li key={link.path} className="h-full">
                  <Link
                    to={link.path}
                    aria-current={active ? "page" : undefined}
                    className={
                      "relative flex h-full items-center whitespace-nowrap text-sm font-semibold uppercase tracking-[0.035em] transition-colors hover:text-[color:var(--accent)] " +
                      (active ? "text-white after:absolute after:-bottom-px after:left-0 after:h-[3px] after:w-full after:bg-[color:var(--accent)]" : "text-white/95")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 shrink-0 place-items-center border border-white/40 lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile primary" className="border-t border-white/20 px-4 pb-5 lg:hidden">
          <ul className="grid sm:grid-cols-2">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={"block border-b border-white/15 py-3 text-sm font-semibold uppercase tracking-wide " + (active ? "text-[color:var(--accent)]" : "text-white")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
