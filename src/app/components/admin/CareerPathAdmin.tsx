"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  Save,

} from "lucide-react";

import {

  getCareerPathSection,

  updateCareerPathSection,

  getCareerPathBenefits,

  updateCareerPathBenefit,

  getCareerPathFaqs,

  updateCareerPathFaq,

} from "@/services/CareerPathService";

/* =========================================
   ADMIN PANEL
========================================= */

export default function CareerPathAdmin() {

  const [section, setSection] =
    useState<any>(null);

  const [benefits, setBenefits] =
    useState<any[]>([]);

  const [faqs, setFaqs] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData =
      async () => {

        const sectionRes = await getCareerPathSection();

        const benefitsRes = await getCareerPathBenefits();

        const faqRes = await getCareerPathFaqs();

        setSection(
          sectionRes.data
        );

        setBenefits(
          benefitsRes.data || []
        );

        setFaqs(
          faqRes.data || []
        );

      };

    fetchData();

  }, []);

  /* =========================================
     SAVE SECTION
  ========================================= */

  const handleSave =
    async () => {

      if (!section?.id)
        return;

      setSaving(true);

      await updateCareerPathSection(
        section.id,
        section
      );

      setSaving(false);

    };

  if (!section)
    return null;

  return (

    <section
      className="py-28 bg-[#f4f7fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="flex items-center justify-between flex-wrap gap-5 mb-14">

          <div>

            <p className="text-[10px] tracking-[4px] text-cyan-500 mb-3">

              ADMIN PANEL

            </p>

            <h2 className="text-4xl font-bold text-[#0a0e27]">

              Career Path Section

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="h-[56px] px-8 rounded-2xl bg-cyan-500 text-white font-semibold flex items-center gap-3"
          >

            <Save size={18} />

            {
              saving
                ? "Saving..."
                : "Save Changes"
            }

          </button>

        </div>

        {/* SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">

          <textarea
            rows={2}
            value={
              section.title
            }
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            className="rounded-3xl border border-gray-200 bg-white p-5 outline-none resize-none text-[#0a0e27]"
          />

          <textarea
            rows={2}
            value={
              section.highlighted_title
            }
            onChange={(e) =>
              setSection({
                ...section,
                highlighted_title:
                  e.target.value,
              })
            }
            className="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 outline-none resize-none text-cyan-600"
          />

          <textarea
            rows={5}
            value={
              section.description
            }
            onChange={(e) =>
              setSection({
                ...section,
                description:
                  e.target.value,
              })
            }
            className="rounded-3xl border border-gray-200 bg-white p-5 outline-none resize-none text-gray-500 md:col-span-2"
          />

          <input
            type="text"
            value={
              section.faq_title
            }
            onChange={(e) =>
              setSection({
                ...section,
                faq_title:
                  e.target.value,
              })
            }
            className="h-[58px] rounded-3xl border border-gray-200 bg-white px-5 outline-none"
          />

        </div>

        {/* BENEFITS + FAQ */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* BENEFITS */}
          <div>

            <h3 className="text-2xl font-semibold text-[#0a0e27] mb-6">

              Benefits

            </h3>

            <div className="space-y-4">

              {benefits.map(
                (item, i) => (

                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-3xl p-5"
                  >

                    <textarea
                      rows={2}
                      value={
                        item.title
                      }
                      onChange={async (e) => {

                        const updated =
                          [...benefits];

                        updated[i].title =
                          e.target.value;

                        setBenefits(updated);

                        await updateCareerPathBenefit(
                          item.id,
                          updated[i]
                        );

                      }}
                      className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none mb-4"
                    />

                    <input
                      type="text"
                      value={
                        item.tag
                      }
                      onChange={async (e) => {

                        const updated =
                          [...benefits];

                        updated[i].tag =
                          e.target.value;

                        setBenefits(updated);

                        await updateCareerPathBenefit(
                          item.id,
                          updated[i]
                        );

                      }}
                      className="w-full h-[52px] rounded-2xl border border-cyan-200 bg-cyan-50 px-4 outline-none text-cyan-600"
                    />

                  </div>

                )
              )}

            </div>

          </div>

          {/* FAQ */}
          <div>

            <h3 className="text-2xl font-semibold text-[#0a0e27] mb-6">

              FAQ

            </h3>

            <div className="space-y-4">

              {faqs.map(
                (item, i) => (

                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-3xl p-5"
                  >

                    <textarea
                      rows={2}
                      value={
                        item.question
                      }
                      onChange={async (e) => {

                        const updated =
                          [...faqs];

                        updated[i].question =
                          e.target.value;

                        setFaqs(updated);

                        await updateCareerPathFaq(
                          item.id,
                          updated[i]
                        );

                      }}
                      className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none mb-4"
                    />

                    <textarea
                      rows={5}
                      value={
                        item.answer
                      }
                      onChange={async (e) => {

                        const updated =
                          [...faqs];

                        updated[i].answer =
                          e.target.value;

                        setFaqs(updated);

                        await updateCareerPathFaq(
                          item.id,
                          updated[i]
                        );

                      }}
                      className="w-full rounded-2xl border border-gray-200 p-4 outline-none resize-none text-gray-500"
                    />

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}