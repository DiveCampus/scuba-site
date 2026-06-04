// Shared visual tokens for the "Choose Your Path" course card.
//
// Consumed by BOTH the public frontend (DivingCourses.tsx) and the admin
// editor (CoursesPage.tsx) so the admin preview matches the real card's
// dimensions, radius, gradient, typography and overlay placement exactly.
// Change a value here and both surfaces stay in sync.
export const courseCard = {
  // Outer shell: width, height, radius, background, shadow.
  shell:
    "w-[260px] h-[620px] rounded-[28px] overflow-hidden bg-[#0f2f4d] shadow-[0_10px_40px_rgba(0,0,0,0.4)]",
  // Full-card dark gradient (image legibility).
  gradient: "absolute inset-0 bg-gradient-to-t from-black/90 to-transparent",
  // Age pill (positioned by the caller at top-4 left-4).
  ageBadge: "bg-white text-black text-xs px-3 py-1 rounded-full uppercase",
  // Bottom-left content block.
  bottomBlock: "absolute bottom-6 left-5",
  title:
    "text-white text-[20px] md:text-[24px] font-semibold tracking-[0.5px] leading-[1.2] uppercase",
  fromLabel: "text-sm text-white/70 mt-2 uppercase",
  price: "text-3xl font-bold text-cyan-300 uppercase",
};
