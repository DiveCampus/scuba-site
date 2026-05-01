"use client";

import { useEffect, useState } from "react";
import {
  getFooter,
  getSocials,
  getLocations,
  updateFooter,
  updateSocial,
  updateLocation,
} from "@/services/footerService";

export function FooterAdmin() {
  const [footer, setFooter] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    console.log("📡 Loading footer...");

    const f = await getFooter();
    const s = await getSocials();
    const l = await getLocations();

    console.log("FOOTER:", f.data);
    console.log("SOCIALS:", s.data);
    console.log("LOCATIONS:", l.data);

    setFooter(f.data);
    setSocials(s.data || []);
    setLocations(l.data || []);
    setLoading(false);
  };

  // ================= FOOTER =================
  const handleFooterChange = (field: string, value: string) => {
    setFooter((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveFooter = async () => {
    if (!footer) return;

    console.log("💾 Saving footer:", footer);

    const payload = {
      description: footer.description,
      email: footer.email,
      phone: footer.phone,
      location: footer.location,
      copyright: footer.copyright,
    };

    const { error } = await updateFooter(footer.id, payload);

    if (error) {
      console.error("❌ Footer error:", error);
      alert("Footer save failed");
    } else {
      console.log("✅ Footer saved");
      alert("Footer saved successfully");
    }
  };

  // ================= SOCIAL =================
  const handleSocialChange = (id: string, value: string) => {
    setSocials((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url: value } : s))
    );
  };

  const saveSocial = async (id: string) => {
    const row = socials.find((s) => s.id === id);

    const payload = {
      url: row?.url,
    };

    console.log("💾 Saving social:", payload);

    const { error } = await updateSocial(id, payload);

    if (error) {
      console.error("❌ Social error:", error);
      alert("Social update failed");
    } else {
      console.log("✅ Social updated");
      alert("Social updated");
    }
  };

  // ================= LOCATION =================
  const handleLocationChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setLocations((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, [field]: value } : l
      )
    );
  };

  const saveLocation = async (id: string) => {
    const row = locations.find((l) => l.id === id);

    const payload = {
      title: row?.title,
      address: row?.address,
      map_url: row?.map_url,
    };

    console.log("💾 Saving location:", payload);

    const { error } = await updateLocation(id, payload);

    if (error) {
      console.error("❌ Location error:", error);
      alert("Location update failed");
    } else {
      console.log("✅ Location updated");
      alert("Location updated");
    }
  };

  // ================= LOADING =================
  if (loading || !footer) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <section className="p-10 bg-[#0b2c45] text-white space-y-10">

      <h1 className="text-3xl font-bold">Footer Admin</h1>

      {/* ================= MAIN ================= */}
      <div className="space-y-4 bg-white/5 p-6 rounded-xl">
        <h2 className="text-xl">Main Content</h2>

        <input
          value={footer.description || ""}
          onChange={(e) =>
            handleFooterChange("description", e.target.value)
          }
          className="w-full p-2 bg-black/40 rounded"
          placeholder="Description"
        />

        <input
          value={footer.email || ""}
          onChange={(e) =>
            handleFooterChange("email", e.target.value)
          }
          className="w-full p-2 bg-black/40 rounded"
          placeholder="Email"
        />

        <input
          value={footer.phone || ""}
          onChange={(e) =>
            handleFooterChange("phone", e.target.value)
          }
          className="w-full p-2 bg-black/40 rounded"
          placeholder="Phone"
        />

        <input
          value={footer.location || ""}
          onChange={(e) =>
            handleFooterChange("location", e.target.value)
          }
          className="w-full p-2 bg-black/40 rounded"
          placeholder="Location"
        />

        <button
          onClick={saveFooter}
          className="bg-green-400 text-black px-4 py-2 rounded"
        >
          Save Footer
        </button>
      </div>

      {/* ================= SOCIAL ================= */}
      <div className="space-y-4 bg-white/5 p-6 rounded-xl">
        <h2 className="text-xl">Social Links</h2>

        {socials.map((s) => (
          <div key={s.id} className="flex gap-3 items-center">

            <span className="w-24">{s.platform}</span>

            <input
              value={s.url || ""}
              onChange={(e) =>
                handleSocialChange(s.id, e.target.value)
              }
              className="flex-1 p-2 bg-black/40 rounded"
            />

            <button
              onClick={() => saveSocial(s.id)}
              className="bg-green-400 text-black px-3 py-1 rounded"
            >
              Save
            </button>

          </div>
        ))}
      </div>

      {/* ================= LOCATIONS ================= */}
      <div className="space-y-4 bg-white/5 p-6 rounded-xl">
        <h2 className="text-xl">Locations</h2>

        {locations.map((l) => (
          <div key={l.id} className="space-y-2 border-b pb-4">

            <input
              value={l.title || ""}
              onChange={(e) =>
                handleLocationChange(l.id, "title", e.target.value)
              }
              className="w-full p-2 bg-black/40 rounded"
              placeholder="Title"
            />

            <input
              value={l.address || ""}
              onChange={(e) =>
                handleLocationChange(l.id, "address", e.target.value)
              }
              className="w-full p-2 bg-black/40 rounded"
              placeholder="Address"
            />

            <input
              value={l.map_url || ""}
              onChange={(e) =>
                handleLocationChange(l.id, "map_url", e.target.value)
              }
              className="w-full p-2 bg-black/40 rounded"
              placeholder="Map URL"
            />

            <button
              onClick={() => saveLocation(l.id)}
              className="bg-green-400 text-black px-3 py-1 rounded"
            >
              Save Location
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}