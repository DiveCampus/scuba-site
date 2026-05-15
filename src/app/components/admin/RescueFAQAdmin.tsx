"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Save,
  Plus,
  X,
} from "lucide-react";

import {
  getRescueFAQ,
  updateRescueFAQSection,
  updateRescueFAQReview,
  updateRescueFAQItem,
} from "@/services/RescueFAQService";

export default function RescueFAQAdmin() {

  const [active, setActive] =
    useState<number>(0);

  const [section, setSection] =
    useState<any>(null);

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [faqs, setFaqs] =
      useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {

    const load =
      async () => {

        try {

          const res =
            await getRescueFAQ();

          console.log(
            "RESCUE ADMIN =>",
            res
          );

          setSection(
            res.section
          );

          setReviews(
            res.reviews || []
          );

          setFaqs(
            res.faqs || []
          );

        } catch (err) {

          console.error(err);

        } finally {

          setLoading(false);

        }

      };

    load();

  }, []);

  /* =========================================
     SAVE
  ========================================= */

  const handleSave =
    async () => {

      try {

        setSaving(true);

        console.log(
          "SECTION =>",
          section
        );

        console.log(
          "REVIEWS =>",
          reviews
        );

        console.log(
          "FAQS =>",
          faqs
        );

        /* SECTION */
        await updateRescueFAQSection(
          section.id,
          section
        );

        /* REVIEWS */
        await Promise.all(
          reviews.map(
            (item) =>
              updateRescueFAQReview(
                item.id,
                item
              )
          )
        );

        /* FAQS */
        await Promise.all(
          faqs.map(
            (item) =>
              updateRescueFAQItem(
                item.id,
                item
              )
          )
        );

        alert(
          "Saved Successfully"
        );

      } catch (err) {

        console.error(err);

        alert(
          "Save Failed"
        );

      } finally {

        setSaving(false);

      }

    };

  if (loading || !section)
    return null;

  return (

    <section
      className="
        relative
        py-28
        bg-[#f4f7fb]
        overflow-hidden
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="
          fixed
          top-6
          right-6
          z-50
          flex
          items-center
          gap-2
          px-6
          py-3
          rounded-2xl
          bg-cyan-500
          text-white
          shadow-xl
        "
      >

        <Save size={18} />

        {
          saving
            ? "Saving..."
            : "Save"
        }

      </button>

      {/* GLOW */}
      <div className="
        absolute
        top-10
        left-10
        w-72
        h-72
        bg-cyan-400/10
        blur-[120px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-10
        right-10
        w-72
        h-72
        bg-blue-500/10
        blur-[120px]
        rounded-full
      " />

      {/* HEADER */}
      <div className="
        relative
        text-center
        max-w-[760px]
        mx-auto
        px-4
      ">

        <input
          value={
            section.top_text || ""
          }
          onChange={(e) =>
            setSection({
              ...section,
              top_text:
                e.target.value,
            })
          }
          className="
            text-center
            bg-transparent
            text-[10px]
            tracking-[3px]
            uppercase
            text-cyan-500
            w-full
            outline-none
            mb-5
          "
        />

        {/* TITLE */}
        <div className="
          flex
          flex-col
          gap-2
        ">

          <input
            value={
              section.title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                title:
                  e.target.value,
              })
            }
            className="
              bg-transparent
              text-center
              text-3xl
              md:text-5xl
              font-semibold
              text-black
              outline-none
            "
          />

          <input
            value={
              section.highlighted_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                highlighted_title:
                  e.target.value,
              })
            }
            className="
              bg-transparent
              text-center
              text-3xl
              md:text-5xl
              font-semibold
              text-cyan-500
              outline-none
            "
          />

        </div>

        {/* DESCRIPTION */}
        <textarea
          rows={4}
          value={
            section.description || ""
          }
          onChange={(e) =>
            setSection({
              ...section,
              description:
                e.target.value,
            })
          }
          className="
            mt-8
            bg-transparent
            text-center
            text-[16px]
            text-gray-600
            leading-[2]
            w-full
            outline-none
            resize-none
          "
        />

      </div>

      {/* MAIN GRID */}
      <div className="
        relative
        max-w-[980px]
        mx-auto
        grid
        md:grid-cols-2
        gap-12
        mt-16
        px-4
      ">

        {/* LEFT */}
        <div className="
          bg-white
          rounded-3xl
          p-8
          border
          border-gray-200
          shadow-sm
          text-center
        ">

          <input
            value={
              section.review_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                review_title:
                  e.target.value,
              })
            }
            className="
              w-full
              bg-transparent
              text-center
              text-[22px]
              font-semibold
              text-black
              outline-none
            "
          />

          <textarea
            rows={3}
            value={
              section.review_subtitle || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                review_subtitle:
                  e.target.value,
              })
            }
            className="
              mt-4
              w-full
              bg-transparent
              text-center
              text-gray-600
              outline-none
              resize-none
            "
          />

          {/* REVIEWS */}
          <div className="
            mt-8
            grid
            grid-cols-2
            gap-4
          ">

            {reviews.map(
              (item, i) => (

              <textarea
                key={item.id}
                rows={5}
                value={
                  item.review_text
                }
                onChange={(e) => {

                  const updated =
                    [...reviews];

                  updated[i]
                    .review_text =
                    e.target.value;

                  setReviews(
                    updated
                  );

                }}
                className="
                  bg-[#f9fbfd]
                  rounded-2xl
                  p-4
                  text-black
                  text-[12px]
                  outline-none
                  resize-none
                "
              />

            ))}

          </div>

        </div>

        {/* RIGHT FAQ */}
        <div>

          <input
            value={
              section.faq_title || ""
            }
            onChange={(e) =>
              setSection({
                ...section,
                faq_title:
                  e.target.value,
              })
            }
            className="
              bg-transparent
              text-[14px]
              font-semibold
              uppercase
              text-black
              mb-6
              outline-none
            "
          />

          <div className="
            space-y-4
          ">

            {faqs.map(
              (item, i) => (

              <div
                key={item.id}
                className={`
                  rounded-2xl
                  border
                  px-5
                  py-5
                  transition
                  ${
                    active === i
                      ? "border-cyan-400 bg-white"
                      : "border-gray-200 bg-white"
                  }
                `}
              >

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    cursor-pointer
                  "
                  onClick={() =>
                    setActive(
                      active === i
                        ? -1
                        : i
                    )
                  }
                >

                  <input
                    value={
                      item.question
                    }
                    onChange={(e) => {

                      const updated =
                        [...faqs];

                      updated[i]
                        .question =
                        e.target.value;

                      setFaqs(
                        updated
                      );

                    }}
                    className="
                      bg-transparent
                      text-black
                      font-medium
                      w-full
                      outline-none
                    "
                  />

                  {active === i ? (
                    <X className="
                      text-cyan-500
                    " />
                  ) : (
                    <Plus className="
                      text-gray-400
                    " />
                  )}

                </div>

                {active === i && (

                  <textarea
                    rows={4}
                    value={
                      item.answer
                    }
                    onChange={(e) => {

                      const updated =
                        [...faqs];

                      updated[i]
                        .answer =
                        e.target.value;

                      setFaqs(
                        updated
                      );

                    }}
                    className="
                      mt-5
                      w-full
                      bg-transparent
                      text-gray-600
                      outline-none
                      resize-none
                    "
                  />

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}