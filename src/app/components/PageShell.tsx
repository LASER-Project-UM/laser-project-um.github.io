import type { ReactNode } from "react";
import { Link } from "react-router";

/**
 * Shared interior-page frame. Primary navigation now lives entirely in the
 * site header, leaving interior pages a wider, calmer reading column.
 */

interface PageShellProps {
  /** Breadcrumb trail, e.g. [["Home", "/"], ["Datasets"]]. Last item is current. */
  breadcrumb?: [string, string?][];
  children: ReactNode;
}

export function PageShell({ breadcrumb, children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 lg:px-8">
      <div className="py-8 lg:py-10">
        <div className="min-w-0">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[color:var(--muted-foreground)]">
                {breadcrumb.map(([label, href], i) => {
                  const isLast = i === breadcrumb.length - 1;
                  return (
                    <li key={label} className="flex items-center gap-2">
                      {href && !isLast ? (
                        <Link
                          to={href}
                          className="text-[color:var(--primary)] hover:underline"
                        >
                          {label}
                        </Link>
                      ) : (
                        <span aria-current={isLast ? "page" : undefined}>{label}</span>
                      )}
                      {!isLast && (
                        <span aria-hidden="true" className="text-[color:var(--muted-foreground)]/60">
                          ›
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
