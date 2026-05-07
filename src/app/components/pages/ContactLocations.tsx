"use client";

import {
  MapPin,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

import { motion } from "framer-motion";

export function ContactLocations() {
  const locations = [
    {
      title: "DUBAI CONTACT DETAILS",
      address:
        "Azure Residences, The Palm Jumeirah, Dubai, UAE",
      email: "info@nemodivingcenter.com",
      phone: "+971 56 704 4472",
      map: "/map1.jpg",
    },

    {
      title: "FUJAIRAH CONTACT DETAILS",
      address:
        "Royal Beach, Dibba Fujairah, Al Fujairah",
      email: "dive@nemodivingcenter.com",
      phone: "+971 58 504 4450",
      map: "/map2.jpg",
    },
  ];

  return (
    <>
      <section
        className="py-24 bg-[#f5f8fb]"
        style={{ fontFamily: "Harabara, sans-serif" }}
      >

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-7 px-6">

          {locations.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -4,
              }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-[#d9e2ec] bg-white p-7 shadow-sm"
            >

              {/* TITLE */}
              <h3 className="text-center text-[12px] tracking-[2px] text-[#23364d] uppercase mb-10">

                {item.title}

              </h3>

              {/* INFO */}
              <div className="space-y-5">

                {/* ADDRESS */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center shadow-md shrink-0">

                    <MapPin
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <p className="text-[13px] leading-[1.7] text-[#7b8794]">
                    {item.address}
                  </p>

                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center shadow-md shrink-0">

                    <Mail
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <p className="text-[13px] text-[#7b8794]">
                    {item.email}
                  </p>

                </div>

                {/* PHONE */}
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center shadow-md shrink-0">

                    <Phone
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <p className="text-[13px] text-[#7b8794]">
                    {item.phone}
                  </p>

                </div>

              </div>

              {/* MAP */}
              <div className="mt-7 relative overflow-hidden rounded-xl border border-[#d9e2ec]">

                {/* MAP IMAGE */}
                <img
                  src={item.map}
                  alt="map"
                  className="w-full h-[145px] object-cover"
                />

                {/* MAP BUTTON */}
                <button className="absolute top-3 left-3 flex items-center gap-1 px-3 py-2 rounded-md bg-white text-[11px] font-medium text-cyan-600 shadow-md border border-[#d9e2ec]">

                  Open in Maps

                  <ExternalLink size={12} />

                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </section>

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