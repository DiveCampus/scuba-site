"use client";

import {
  FaApple,
  FaGooglePlay,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export function TryDiveFooter() {
  return (
    <>
      <footer
        className="relative overflow-hidden bg-[#02101d] pt-20 pb-10"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src="/footer-bg.jpg"
            alt="footer"
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#02101d] via-[#02101d]/90 to-[#02101d]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* TOP GRID */}
          <div className="grid md:grid-cols-5 gap-10">

            {/* DOWNLOAD */}
            <div>
              <h4 className="text-white text-[11px] tracking-[2px] font-semibold mb-6">
                DOWNLOAD APP
              </h4>

              <div className="space-y-3">

                {/* APP STORE */}
                <button className="w-[160px] h-[48px] rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center gap-3 px-4">

                  <FaApple className="text-white text-xl" />

                  <div className="text-left">
                    <p className="text-[8px] text-white/40 uppercase">
                      Download on the
                    </p>

                    <p className="text-white text-sm font-medium">
                      App Store
                    </p>
                  </div>

                </button>

                {/* PLAY STORE */}
                <button className="w-[160px] h-[48px] rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center gap-3 px-4">

                  <FaGooglePlay className="text-white text-lg" />

                  <div className="text-left">
                    <p className="text-[8px] text-white/40 uppercase">
                      Get it on
                    </p>

                    <p className="text-white text-sm font-medium">
                      Google Play
                    </p>
                  </div>

                </button>

              </div>
            </div>

            {/* CONNECT */}
            <div>
              <h4 className="text-white text-[11px] tracking-[2px] font-semibold mb-6">
                CONNECT
              </h4>

              <div className="flex items-center gap-2 text-white/70 text-sm mb-5">
                <FaWhatsapp className="text-cyan-400" />
                WhatsApp Support
              </div>

              <div className="space-y-3">

                <input
                  type="email"
                  placeholder="Enter email for deals..."
                  className="w-full h-[44px] rounded-full bg-white/[0.03] border border-white/10 px-5 text-sm text-white placeholder:text-white/30 outline-none"
                />

                <button className="w-full h-[44px] rounded-full bg-cyan-500 hover:bg-cyan-400 transition text-white text-sm font-semibold tracking-[1px]">
                  SUBSCRIBE
                </button>

              </div>
            </div>

            {/* INFO */}
            <div>
              <h4 className="text-white text-[11px] tracking-[2px] font-semibold mb-6">
                INFORMATION
              </h4>

              <div className="space-y-4 text-sm text-white/50">

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  About Us
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Blogs
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Terms & Conditions
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Privacy Policy
                </p>

              </div>
            </div>

            {/* EXPERIENCES */}
            <div>
              <h4 className="text-white text-[11px] tracking-[2px] font-semibold mb-6">
                EXPERIENCES
              </h4>

              <div className="space-y-4 text-sm text-white/50">

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Try Scuba Dive
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Certified Dive Trips
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  International Trips
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Refresher Course
                </p>

              </div>
            </div>

            {/* COURSES */}
            <div>
              <h4 className="text-white text-[11px] tracking-[2px] font-semibold mb-6">
                DIVING COURSES
              </h4>

              <div className="space-y-4 text-sm text-white/50">

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  PADI Open Water
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Advanced Open Water
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Rescue Diver
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Dive Master
                </p>

                <p className="hover:text-cyan-400 cursor-pointer transition">
                  Retail Shop
                </p>

              </div>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* SOCIALS */}
            <div className="flex items-center gap-3">

              <button className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/30 transition">
                <FaFacebookF size={13} />
              </button>

              <button className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/30 transition">
                <FaInstagram size={14} />
              </button>

              <button className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400/30 transition">
                <FaXTwitter size={13} />
              </button>

            </div>

            {/* COPYRIGHT */}
            <p className="text-[11px] tracking-[1px] text-white/30 text-center">
              © 2026 DIVING IN UAE | POWERED BY DIVE CAMPUS CENTER
            </p>

          </div>

        </div>

      </footer>

      {/* FONT */}
      <style jsx global>{`
        @font-face {
          font-family: 'Harabara';
          src: url('/fonts/Harabara.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </>
  );
}