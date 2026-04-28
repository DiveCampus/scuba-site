import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-habara">

      {/* BACKGROUND */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-105">
          <source src="/vid1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05263C]/60 via-transparent to-[#18476D]/70" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* TOP LABEL */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="uppercase tracking-[6px] text-cyan-300 text-[12px] mb-5"
        >
          Dive Campus Diving Club
        </motion.p>

        {/* MAIN HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-6xl font-semibold leading-tight"
        >
          Where Divers{" "}
          <span className="text-[#38BDF8]">LEVEL UP</span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/85 text-sm md:text-lg max-w-3xl mx-auto leading-7 md:leading-8"
        >
          Only destination in{" "}
          <span className="text-[#38BDF8] font-medium">
            Middle East
          </span>{" "}
          providing{" "}
          <span className="text-[#38BDF8] font-medium">
            full spectrum dive education
          </span>{" "}
          and{" "}
          <span className="text-[#38BDF8] font-medium">
            immersive experiences
          </span>.
        </motion.p>

        {/* LINE */}
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-[2px] bg-[#38BDF8]/70 rounded-full" />
        </div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
        >
          <button className="px-10 py-4 rounded-full bg-[#38BDF8] text-black font-semibold text-sm uppercase tracking-wide hover:scale-105 hover:bg-cyan-300 transition-all duration-300 shadow-[0_8px_25px_rgba(56,189,248,0.4)]">
            Get Certified →
          </button>

          <button className="px-10 py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white font-medium text-sm uppercase tracking-wide hover:bg-white/10 hover:scale-105 transition-all duration-300">
            Go Diving
          </button>
        </motion.div>

        {/* LOCATIONS */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-[14px] uppercase tracking-[3px] text-white/80">

          <div className="flex items-center gap-2"><MapPin size={12}/>Dubai</div>
          <div className="flex items-center gap-2"><MapPin size={12}/>Khor Fakkan</div>
          <div className="flex items-center gap-2"><MapPin size={12}/>Deep Dive Dubai</div>
          <div className="flex items-center gap-2"><MapPin size={12}/>Aquarium</div>
        </div>
      </div>

      {/* SCROLL */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#courses" className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[3px]">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </motion.div>

    </section>
  );
}