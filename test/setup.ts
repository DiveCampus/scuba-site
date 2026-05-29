// Provide a minimal `Deno` global so the edge-function modules can be imported
// under Node/Vitest. Only `Deno.env.get` is touched at module load time; it
// returns undefined here, which the functions already handle via fallbacks.
type DenoLike = { env: { get: (key: string) => string | undefined } };

const g = globalThis as unknown as { Deno?: DenoLike };
if (!g.Deno) {
  g.Deno = { env: { get: () => undefined } };
}
