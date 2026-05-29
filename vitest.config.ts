import { defineConfig } from "vitest/config";
import path from "node:path";

// Minimal, risk-based test config. Tests live in /test and target only the
// payment, pricing and SEO logic that carries real production risk.
//
// The Stripe edge functions are Deno modules that import `serve` from a Deno
// std URL-ish specifier and `createClient` from an esm.sh URL. Node/Vitest
// cannot load `https://` imports, so we transform those two import lines out of
// the edge source IN MEMORY (replacing them with local no-op consts) before the
// module is evaluated. This lets the tests exercise the *real* exported pure
// logic (signature verification, COURSE_MAP) without mocking it and without
// touching the files on disk. The `Deno` global is stubbed in test/setup.ts.
export default defineConfig({
  plugins: [
    {
      name: "deno-edge-import-shim",
      enforce: "pre",
      transform(code: string, id: string) {
        if (!id.includes("/supabase/functions/")) return null;
        const shimmed = code
          .replace(
            /import\s*\{\s*serve\s*\}\s*from\s*["']std\/http\/server\.ts["'];?/,
            "const serve = (_handler: unknown) => {};"
          )
          .replace(
            /import\s*\{\s*createClient\s*\}\s*from\s*["']https:\/\/esm\.sh\/@supabase\/supabase-js@2["'];?/,
            "const createClient = () => ({} as unknown);"
          );
        return shimmed === code ? null : { code: shimmed, map: null };
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    globals: false,
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary"],
      // Only report on the logic we deliberately protect — keeps the % honest
      // and avoids diluting it with untested UI/admin code.
      include: [
        "src/data/courseData.ts",
        "src/app/components/seoConfig.ts",
        "supabase/functions/stripe-webhook/index.ts",
        "supabase/functions/create-checkout-session/index.ts",
      ],
    },
  },
});
