"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { role: "Founder", name: "ISLAM" },
  { role: "Co-Founder", name: "SNEHA" },
  { role: "Lead Instructor", name: "Justin" },
  { role: "Dive Master", name: "Ali Hassan" },
  { role: "Instructor", name: "Sara Khan" },
  { role: "Operations", name: "Ahmed Raza" },
  { role: "Admin", name: "Zaw" },
];

export function AboutDiveCampus() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // 🔥 Prevent scroll memory bugs
    ScrollTrigger.clearScrollMemory();

    const ctx = gsap.context(() => {
      const total = cardsRef.current.length;

      const getRadius = () => {
        if (window.innerWidth < 640) return 120;
        if (window.innerWidth < 1024) return 180;
        return 260;
      };

      let radius = getRadius();

      const updateOrbit = () => {
        radius = getRadius();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", updateOrbit);

      // Initial positions
      cardsRef.current.forEach((card, i) => {
        const angle = (i / total) * Math.PI * 2;

        gsap.set(card, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          opacity: 0.3,
          scale: 0.7,
        });
      });

      let rotation = { value: 0 };

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      }).to(rotation, {
        value: Math.PI * 2,
        ease: "none",
        onUpdate: () => {
          cardsRef.current.forEach((card, i) => {
            const angle = (i / total) * Math.PI * 2 + rotation.value;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const depth = Math.cos(angle);

            gsap.set(card, {
              x,
              y,
              scale: 0.7 + depth * 0.3,
              opacity: 0.3 + depth * 0.7,
              filter: `blur(${(1 - depth) * 8}px)`,
            });
          });
        },
      });

      // Cleanup resize listener
      return () => {
        window.removeEventListener("resize", updateOrbit);
      };
    }, sectionRef);

    // ✅ CLEANUP (SAFE + CORRECT)
    return () => {
      ctx.revert(); // removes pin, spacer, inline styles

      ScrollTrigger.killAll(false, true); // kill only triggers safely

      // reset scroll behavior
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      window.scrollTo({ top: 0, behavior: "auto" });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] text-white"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {team.map((member, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="absolute w-[160px] h-[200px] rounded-xl bg-white/10 backdrop-blur border border-white/20 flex flex-col items-center justify-center"
          >
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-cyan-300 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}