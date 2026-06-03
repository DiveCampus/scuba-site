import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Two isolated test projects so the existing node logic tests and the new
// jsdom component tests never share an environment:
//
//   • "logic"      — node env, the original risk-based tests in /test
//                    (payment, pricing, SEO). UNCHANGED behavior.
//   • "components" — jsdom env, React Testing Library smoke tests for the
//                    critical marketing pages, in src/**/__tests__.
//
// Coverage is configured once at the root and merged across both projects.

const alias = { "@": path.resolve(__dirname, "src") };

// The Stripe edge functions are Deno modules importing from URL-ish specifiers
// that Node/Vitest cannot resolve. Transform those two import lines out IN
// MEMORY before evaluation so the tests exercise the real pure logic. (Moved
// verbatim from the previous single-config setup.)
const denoEdgeImportShim = {
  name: "deno-edge-import-shim",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    if (!id.includes("/supabase/functions/")) return null;
    const shimmed = code
      .replace(
        /import\s*\{\s*serve\s*\}\s*from\s*["']std\/http\/server\.ts["'];?/,
        "const serve = (_handler: unknown) => {};",
      )
      .replace(
        /import\s*\{\s*createClient\s*\}\s*from\s*["']https:\/\/esm\.sh\/@supabase\/supabase-js@2["'];?/,
        "const createClient = () => ({} as unknown);",
      );
    return shimmed === code ? null : { code: shimmed, map: null };
  },
};

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [denoEdgeImportShim],
        resolve: { alias },
        test: {
          name: "logic",
          environment: "node",
          globals: false,
          setupFiles: ["./test/setup.ts"],
          include: ["test/**/*.test.ts"],
        },
      },
      {
        plugins: [react()],
        // This repo has a NESTED src/node_modules with its own react +
        // framer-motion copies. Without forcing a single instance, components
        // resolve React from src/node_modules while the renderer (react-dom via
        // Testing Library) resolves it from the root — two React copies, which
        // makes hooks/useContext null. Dedupe + explicit aliases pin everyone
        // to the root copy.
        resolve: {
          alias: {
            ...alias,
            react: path.resolve(__dirname, "node_modules/react"),
            "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
            "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
            "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime"),
            "framer-motion": path.resolve(__dirname, "node_modules/framer-motion"),
          },
          dedupe: ["react", "react-dom", "framer-motion", "scheduler"],
        },
        test: {
          name: "components",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.test.{ts,tsx}"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html"],
      reportsDirectory: "./coverage",
      // Honest, scoped coverage: the deliberately-protected logic files plus the
      // phase-1 marketing pages now under smoke test.
      include: [
        "src/data/courseData.ts",
        "src/app/components/seoConfig.ts",
        "supabase/functions/stripe-webhook/index.ts",
        "supabase/functions/create-checkout-session/index.ts",
        "src/app/TryDive/TryDive.tsx",
        "src/app/components/pages/Divetry.tsx",
        "src/app/components/pages/PadiOpenWater.tsx",
        "src/app/components/pages/PadiRescueDiver.tsx",
        "src/app/divemaster/PadIDivemaster.tsx",
        "src/app/components/pages/AboutDiveCampus.tsx",
      ],
    },
  },
});
