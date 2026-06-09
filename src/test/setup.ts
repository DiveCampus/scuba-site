// Test setup for the jsdom (component) project ONLY.
// The node/logic project uses ./test/setup.ts instead — keep them separate.
//
// Responsibilities:
//   1. Register @testing-library/jest-dom matchers (toBeInTheDocument, etc.).
//   2. Polyfill the few browser APIs jsdom lacks but framer-motion / scroll use.
//   3. Mock the single Supabase client chokepoint so component renders are
//      deterministic and never touch the network (and never hit the
//      createClient() env assertion in src/lib/supabaseClient.ts).
//   4. Unmount React trees between tests.

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.spyOn(console, "log").mockImplementation(() => {});

/* ---------------------------------------------------------------- polyfills */

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// framer-motion's `whileInView` relies on IntersectionObserver; jsdom has none.
// A no-op keeps elements at their initial state but still mounted in the DOM,
// which is all our presence assertions need.
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver || (NoopObserver as unknown as typeof IntersectionObserver);
globalThis.ResizeObserver =
  globalThis.ResizeObserver || (NoopObserver as unknown as typeof ResizeObserver);

window.scrollTo = window.scrollTo || (() => {});
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

/* ------------------------------------------------------- supabase chokepoint */
// Every service imports `supabase` from "@/lib/supabaseClient". One mock here
// covers them all. List queries resolve to `{ data: [] }`; `.single()` /
// `.maybeSingle()` resolve to `{ data: null }` so both list-mapping sections
// and single-object hero fetches render their static shells safely.
vi.mock("@/lib/supabaseClient", () => {
  const makeBuilder = () => {
    let single = false;
    const settle = () =>
      Promise.resolve({
        data: single ? null : [],
        error: null,
        count: 0,
        status: 200,
        statusText: "OK",
      });

    const builder: unknown = new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === "then") {
            const p = settle();
            return p.then.bind(p);
          }
          if (prop === "single" || prop === "maybeSingle") {
            return () => {
              single = true;
              return builder;
            };
          }
          // every other query method (select/eq/order/limit/insert/...) chains
          return () => builder;
        },
      },
    );
    return builder;
  };

  const supabase = {
    from: () => makeBuilder(),
    rpc: () => makeBuilder(),
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      signInWithPassword: async () => ({ data: {}, error: null }),
      signOut: async () => ({ error: null }),
    },
    storage: {
      from: () => ({
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        upload: async () => ({ data: null, error: null }),
        remove: async () => ({ data: null, error: null }),
      }),
    },
    channel: () => ({ on: () => ({ subscribe: () => ({}) }), subscribe: () => ({}) }),
    removeChannel: () => {},
  };

  return { supabase, default: supabase };
});

afterEach(() => {
  cleanup();
});
