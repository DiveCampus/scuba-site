// Shared render helper for component tests. Wraps the UI in the providers the
// pages need at runtime — a Router (components call useNavigate / <Link>) and a
// HelmetProvider (some sections render <Helmet> for SEO). Import `renderPage`
// and the usual Testing Library helpers (screen, within, ...) from here.

import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </HelmetProvider>
  );
}

export function renderPage(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AppProviders, ...options });
}

// Re-export everything from RTL so tests have one import source.
export * from "@testing-library/react";
