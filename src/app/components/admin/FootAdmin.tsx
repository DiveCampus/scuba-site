"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getFooter,
  updateFooterSection,
  updateFooterLink,
  updateFooterSocial,
  updateFooterApp,
} from "@/services/footService";

export default function FootAdmin() {
  const [section, setSection] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      console.log("🚀 Loading footer...");

      const { section, links, socials, apps } = await getFooter();

      console.log("📦 SECTION:", section);
      console.log("📦 LINKS:", links);
      console.log("📦 SOCIALS:", socials);
      console.log("📦 APPS:", apps);

      setSection(section);
      setLinks(links);
      setSocials(socials);
      setApps(apps);
    };

    load();
  }, []);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    setSaving(true);

    console.log("💾 Saving footer...");

    await updateFooterSection(section);
    await Promise.all(links.map(updateFooterLink));
    await Promise.all(socials.map(updateFooterSocial));
    await Promise.all(apps.map(updateFooterApp));

    setSaving(false);

    console.log("✅ Footer saved");
  };

  if (!section) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#06141f] text-white">

      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* ================= SECTION ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

          <h2 className="text-xl font-semibold text-cyan-400">
            Footer Section
          </h2>

          <input
            value={section.whatsapp_text || ""}
            onChange={(e) =>
              setSection({ ...section, whatsapp_text: e.target.value })
            }
            placeholder="WhatsApp Text"
            className="w-full bg-white/10 px-4 py-2 rounded-lg outline-none"
          />

          <input
            value={section.subscribe_placeholder || ""}
            onChange={(e) =>
              setSection({
                ...section,
                subscribe_placeholder: e.target.value,
              })
            }
            placeholder="Subscribe Placeholder"
            className="w-full bg-white/10 px-4 py-2 rounded-lg outline-none"
          />

          <input
            value={section.copyright || ""}
            onChange={(e) =>
              setSection({ ...section, copyright: e.target.value })
            }
            placeholder="Copyright Text"
            className="w-full bg-white/10 px-4 py-2 rounded-lg outline-none"
          />
        </div>

        {/* ================= LINKS ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            Footer Links
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {["info", "experiences", "courses"].map((cat) => (
              <div key={cat}>
                <h3 className="text-sm uppercase text-gray-400 mb-3">
                  {cat}
                </h3>

                {links
                  .filter((l) => l.category === cat)
                  .map((item, i) => (
                    <input
                      key={item.id}
                      value={item.label}
                      onChange={(e) => {
                        const updated = [...links];
                        const index = updated.findIndex(
                          (x) => x.id === item.id
                        );
                        updated[index].label = e.target.value;
                        setLinks(updated);
                      }}
                      className="w-full mb-2 bg-white/10 px-3 py-2 rounded-lg outline-none text-sm"
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* ================= SOCIAL ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            Social Links
          </h2>

          {socials.map((item, i) => (
            <div key={item.id} className="flex gap-3 mb-3">

              <input
                value={item.platform}
                onChange={(e) => {
                  const updated = [...socials];
                  updated[i].platform = e.target.value;
                  setSocials(updated);
                }}
                className="w-1/3 bg-white/10 px-3 py-2 rounded-lg outline-none"
              />

              <input
                value={item.url}
                onChange={(e) => {
                  const updated = [...socials];
                  updated[i].url = e.target.value;
                  setSocials(updated);
                }}
                className="w-full bg-white/10 px-3 py-2 rounded-lg outline-none"
              />

            </div>
          ))}
        </div>

        {/* ================= APPS ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            App Links
          </h2>

          {apps.map((item, i) => (
            <div key={item.id} className="flex gap-3 mb-3">

              <input
                value={item.name}
                onChange={(e) => {
                  const updated = [...apps];
                  updated[i].name = e.target.value;
                  setApps(updated);
                }}
                className="w-1/3 bg-white/10 px-3 py-2 rounded-lg outline-none"
              />

              <input
                value={item.link}
                onChange={(e) => {
                  const updated = [...apps];
                  updated[i].link = e.target.value;
                  setApps(updated);
                }}
                className="w-full bg-white/10 px-3 py-2 rounded-lg outline-none"
              />

            </div>
          ))}
        </div>

        {/* ================= SAVE ================= */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-10 py-3 bg-cyan-400 text-black rounded-full font-semibold"
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </div>

      </div>
    </section>
  );
}