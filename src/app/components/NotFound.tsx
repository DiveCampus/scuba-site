// 404 page for unmatched routes. SEO noindex is handled centrally by
// RouteSeo + getRouteSeo() in App.tsx (returns the __notFound config).
// Minimal, theme-consistent UI — no design system changes.

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0e27] flex flex-col items-center justify-center text-center px-6 text-white">
      <p className="text-cyan-400 text-[12px] font-semibold tracking-[3px] uppercase mb-3">404</p>
      <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1] mb-4">Page not found</h1>
      <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed max-w-md mb-8">
        The page you are looking for doesn’t exist or has moved. Explore our
        PADI scuba diving courses in Dubai instead.
      </p>
      <a
        href="/"
        className="px-8 py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:scale-105 transition duration-300"
      >
        Back to UAE Dive home
      </a>
    </div>
  );
}
