"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import { IslamProfileModal } from "../IslamProfileModal";
import { SnehaProfileModal } from "../SnehaProfileModal";
import { JustinProfileModal } from "../JustinProfileModal";
import { KhushiProfileModal } from "../KhushiProfileModal";
import { BriceProfileModal } from "./BriceProfileModal";
import { AyeProfileModal } from "./AyeProfileModal";
import { AbdullahProfileModal } from "../AbdullahProfileModal";
import { SurieProfileModal } from "../SurieProfileModal";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { role: "Founder", name: "ISLAM" },
  { role: "Co-Founder", name: "SNEHA" },
  { role: "Lead Instructor", name: "Justin" },
  { role: "IDC Staff Instructor", name: "KHUSHI" },
  { role: "Dive Master", name: "BRICE" },
  { role: "Dive Operations", name: "ABDULLAH" },
  { role: "Customer Service", name: "AYE" },
  { role: "Dive Operation", name: "Sorie" }
];

export function AboutDiveCampus() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // ✅ MODAL STATE
  const [selectedMember, setSelectedMember] =
    useState<string | null>(null);

  // ✅ ESC CLOSE
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    document.documentElement.style.scrollBehavior =
      "smooth";

    document.body.classList.add(
      "hide-scrollbar"
    );

    // ✅ FIX LIVE SCROLL BUG
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow =
      "auto";

    const ctx = gsap.context(() => {
      const total = cardsRef.current.length;

      const getRadius = () => {
        if (window.innerWidth < 480)
          return 95;

        if (window.innerWidth < 640)
          return 120;

        if (window.innerWidth < 1024)
          return 180;

        return 260;
      };

      let radius = getRadius();

      const updateOrbit = () => {
        radius = getRadius();

        ScrollTrigger.refresh();
      };

      window.addEventListener(
        "resize",
        updateOrbit
      );

      // INITIAL POSITION
      cardsRef.current.forEach(
        (card, i) => {
          const angle =
            (i / total) *
            Math.PI *
            2;

          gsap.set(card, {
            x:
              Math.cos(angle) *
              radius,

            y:
              Math.sin(angle) *
              radius,

            opacity: 0.3,
            scale: 0.7,
          });
        }
      );

      let rotation = {
        value: 0,
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: "+=4000",

          scrub: 1.2,

          pin: true,

          pinSpacing: true,

          invalidateOnRefresh: true,

          // ✅ IMPORTANT
          anticipatePin: 1,

          // ✅ IMPORTANT
          fastScrollEnd: true,
          markers: false,
        },
      });

      tl.to(rotation, {
        value: Math.PI * 2,

        ease: "none",

        onUpdate: () => {
          cardsRef.current.forEach(
            (card, i) => {
              const angle =
                (i / total) *
                Math.PI *
                2 +
                rotation.value;

              const x =
                Math.cos(angle) *
                radius;

              const y =
                Math.sin(angle) *
                radius;

              const depth =
                Math.cos(angle);

              gsap.set(card, {
                x,
                y,

                scale:
                  0.7 +
                  depth * 0.3,

                opacity:
                  0.3 +
                  depth * 0.7,

                filter: `blur(${(1 - depth) * 8
                  }px)`,
              });
            }
          );
        },
      });

      return () => {
        window.removeEventListener(
          "resize",
          updateOrbit
        );

        tl.kill();
      };
    }, sectionRef);

    // ✅ CLEANUP
    return () => {
      ctx.revert();

      // ✅ KILL ALL TRIGGERS
      ScrollTrigger.getAll().forEach(
        (trigger) => trigger.kill()
      );

      // ✅ REMOVE PIN SPACERS
      document
        .querySelectorAll(".pin-spacer")
        .forEach((el) => {
          const parent =
            el.parentNode;

          if (parent) {
            while (el.firstChild) {
              parent.insertBefore(
                el.firstChild,
                el
              );
            }

            parent.removeChild(el);
          }
        });

      // ✅ FORCE RESET
      gsap.set("body", {
        clearProps: "all",
      });

      gsap.set("html", {
        clearProps: "all",
      });

      document.body.style.overflow =
        "auto";

      document.documentElement.style.overflow =
        "auto";

      document.body.style.position =
        "relative";

      document.documentElement.style.position =
        "relative";

      document.body.classList.remove(
        "hide-scrollbar"
      );

      // ✅ FORCE REFRESH
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45] text-white"
        style={{
          fontFamily: "Harabara, sans-serif",
        }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px]" />

        {/* ORBIT */}
        <div className="absolute inset-0 flex items-center justify-center">

          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.06,
              }}
              transition={{
                duration: 0.25,
              }}
              ref={(el) => {
                if (el)
                  cardsRef.current[i] = el;
              }}
              onClick={() => {
                if (
                  member.name === "ISLAM" ||
                  member.name === "SNEHA" ||
                  member.name === "Justin" ||
                  member.name === "KHUSHI" ||
                  member.name === "BRICE" ||
                  member.name === "AYE" ||
                  member.name === "ABDULLAH" ||
                  member.name === "Sorie"
                ) {
                  setSelectedMember(member.name);
                }
              }}
              className="
    absolute
    w-[120px]
    h-[170px]

    sm:w-[140px]
    sm:h-[190px]

    md:w-[160px]
    md:h-[220px]

    lg:w-[180px]
    lg:h-[240px]

    rounded-[24px]
    md:rounded-[32px]

    bg-white/10
    backdrop-blur-md
    border
    border-white/15

    flex
    flex-col
    items-center
    justify-center

    cursor-pointer
    overflow-hidden
    group

    transform-gpu
    will-change-transform

    shadow-[0_20px_60px_rgba(0,0,0,0.25)]
  "
            >
              {/* CARD GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-400/10 to-blue-500/10" />

              {/* IMAGE */}
              <div
                className="
      relative
      z-10

      w-[60px]
      h-[60px]

      sm:w-[70px]
      sm:h-[70px]

      md:w-[80px]
      md:h-[80px]

      lg:w-[88px]
      lg:h-[88px]

      rounded-full
      overflow-hidden

      border
      border-cyan-300/30

      shadow-[0_0_30px_rgba(34,211,238,0.18)]

      mb-4
      md:mb-5
    "
              >
                <img
                  src={
                    member.name === "ISLAM"
                      ? "/Islam.webp"
                      : member.name === "SNEHA"
                        ? "/Sneha.webp"
                        : member.name === "Justin"
                          ? "/Justin.webp"
                          : member.name === "KHUSHI"
                            ? "/Khushi.webp"
                            : member.name === "BRICE"
                              ? "/Brice.webp"
                              : member.name === "AYE"
                                ? "/Aye.webp"
                                : member.name === "ABDULLAH"
                                  ? "/Abdullah.webp"
                                  : member.name === "Sorie"
                                    ? "/Surie.webp"
                                    : "/placeholder.jpg"
                  }
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* IMAGE GLOW */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
              </div>

              {/* NAME */}
              <h3
                className="
      relative
      z-10

      text-[12px]
      sm:text-[14px]
      md:text-[16px]
      lg:text-[18px]

      tracking-[2px]
      md:tracking-[3px]

      font-semibold
      uppercase

      leading-[1.4]

      text-center
    "
              >
                {member.name}
              </h3>

              {/* ROLE */}
              <p
                className="
      relative
      z-10

      text-cyan-300

      text-[8px]
      sm:text-[9px]
      md:text-[10px]

      tracking-[2px]
      md:tracking-[3px]

      uppercase

      mt-2
      md:mt-3

      text-center

      leading-[1.8]

      px-2
    "
              >
                {member.role}
              </p>
            </motion.div>
          ))}

        </div>

        {/* ISLAM MODAL */}
        <IslamProfileModal
          open={selectedMember === "ISLAM"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

        {/* SNEHA MODAL */}
        <SnehaProfileModal
          open={selectedMember === "SNEHA"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

        {/* JUSTIN MODAL */}
        <JustinProfileModal
          open={selectedMember === "Justin"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* KHUSHI MODAL */}
        <KhushiProfileModal
          open={selectedMember === "KHUSHI"}
          onClose={() =>
            setSelectedMember(null)
          }
        />

        <BriceProfileModal
          open={selectedMember === "BRICE"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* AYE MODAL */}
        <AyeProfileModal
          open={selectedMember === "AYE"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* ABDULLAH MODAL */}
        <AbdullahProfileModal
          open={selectedMember === "ABDULLAH"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
        {/* SORIE MODAL */}
        <SurieProfileModal
          open={selectedMember === "Sorie"}
          onClose={() =>
            setSelectedMember(null)
          }
        />
      </section>

      {/* GLOBAL STYLES */}
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        html,
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}