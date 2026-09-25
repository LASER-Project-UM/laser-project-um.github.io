import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Root() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background">
      {/* Skip link — first focusable element, for keyboard & screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[color:var(--primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Navigation />

      {/* Pages own their own layout (full-bleed hero + PageShell body). */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
