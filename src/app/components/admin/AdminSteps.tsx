"use client";

import { useEffect, useState } from "react";
import {
  getSteps,
  updateStepsSection,
  updateStepItem,
} from "@/services/stepsService";

export default function StepsAdmin() {
  const [section, setSection] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { section, list } = await getSteps();
      setSection(section);
      setList(list || []);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await updateStepsSection(section);

    for (let item of list) {
      await updateStepItem(item);
    }

    setSaving(false);
  };

  if (!section) return null;

  return (
    <section className="py-20 bg-[#f8fafc] min-h-screen px-4">

      <div className="max-w-4xl mx-auto text-center mb-12">

        <input
          value={section.title}
          onChange={(e) =>
            setSection({ ...section, title: e.target.value })
          }
          className="text-3xl md:text-5xl font-bold text-center w-full bg-transparent outline-none"
        />

        <input
          value={section.highlight}
          onChange={(e) =>
            setSection({ ...section, highlight: e.target.value })
          }
          className="text-2xl text-cyan-500 mt-2 text-center w-full bg-transparent outline-none"
        />

        <textarea
          value={section.subtitle}
          onChange={(e) =>
            setSection({ ...section, subtitle: e.target.value })
          }
          className="mt-4 text-center w-full bg-transparent outline-none text-gray-500"
        />
      </div>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {list.map((item, i) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow space-y-3"
          >
            <p className="text-sm text-gray-400">
              Step {item.step_number}
            </p>

            <input
              value={item.title}
              onChange={(e) => {
                const updated = [...list];
                updated[i].title = e.target.value;
                setList(updated);
              }}
              className="font-bold w-full outline-none"
            />

            <textarea
              value={item.description}
              onChange={(e) => {
                const updated = [...list];
                updated[i].description = e.target.value;
                setList(updated);
              }}
              className="text-sm text-gray-500 w-full outline-none"
            />

            <input
              value={item.tag}
              onChange={(e) => {
                const updated = [...list];
                updated[i].tag = e.target.value;
                setList(updated);
              }}
              placeholder="Tag (optional)"
              className="text-xs text-cyan-500 w-full outline-none"
            />
          </div>
        ))}

      </div>

      {/* SAVE */}
      <div className="text-center mt-10">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-cyan-400 text-black rounded-full font-semibold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </section>
  );
}