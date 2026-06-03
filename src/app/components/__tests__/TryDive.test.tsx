import { describe, it, expect } from "vitest";
import { renderPage, screen } from "@/test/test-utils";
import { TryDive } from "@/app/TryDive/TryDive";

describe("TryDive page", () => {
  it("renders without crashing", () => {
    const { container } = renderPage(<TryDive />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("shows the primary hero title", () => {
    renderPage(<TryDive />);
    expect(
      screen.getByRole("heading", { name: /for complete beginners/i }),
    ).toBeInTheDocument();
  });

  it("shows the booking CTA", () => {
    renderPage(<TryDive />);
    expect(
      screen.getByRole("button", { name: /book dubai experience/i }),
    ).toBeInTheDocument();
  });

  it("renders multiple page sections", () => {
    const { container } = renderPage(<TryDive />);
    expect(container.querySelectorAll("section").length).toBeGreaterThan(2);
  });
});
