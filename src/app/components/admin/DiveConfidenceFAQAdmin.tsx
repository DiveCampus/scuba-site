"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  motion,
  AnimatePresence,

} from "framer-motion";

import {

  Plus,
  X,
  Save,

} from "lucide-react";

import {

  getDiveConfidenceFAQ,
  updateDiveConfidenceSection,
  updateDiveConfidenceReview,
  updateDiveConfidenceFAQItem,

} from "@/services/DiveConfidenceFAQService";

export default function
DiveConfidenceFAQAdmin() {

  const [

    active,
    setActive,

  ] = useState(0);

  const [

    section,
    setSection,

  ] = useState<any>(null);

  const [

    reviews,
    setReviews,

  ] = useState<any[]>([]);

  const [

    faqs,
    setFaqs,

  ] = useState<any[]>([]);

  const [

    saving,
    setSaving,

  ] = useState(false);

  /* =====================================
     LOAD
  ===================================== */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const {

        section,
        reviews,
        faqs,

      } =
        await getDiveConfidenceFAQ();

      setSection(
        section
      );

      setReviews(
        reviews || []
      );

      setFaqs(
        faqs || []
      );

    };

  /* =====================================
     FAQ UPDATE
  ===================================== */

  const updateFaq =
    (
      id: string,
      field: string,
      value: string
    ) => {

      setFaqs(
        prev =>
          prev.map(
            faq =>
              faq.id === id
                ? {

                    ...faq,

                    [field]:
                      value,

                  }
                : faq
          )
      );

    };

  /* =====================================
     REVIEW UPDATE
  ===================================== */

  const updateReview =
    (
      id: string,
      field: string,
      value: string
    ) => {

      setReviews(
        prev =>
          prev.map(
            item =>
              item.id === id
                ? {

                    ...item,

                    [field]:
                      value,

                  }
                : item
          )
      );

    };

  /* =====================================
     SAVE
  ===================================== */

  const handleSave =
    async () => {

      try {

        setSaving(
          true
        );

        /* SECTION */
        await updateDiveConfidenceSection(

          section.id,

          section

        );

        /* REVIEWS */
        for (
          const review
          of reviews
        ) {

          await updateDiveConfidenceReview(

            review.id,

            review

          );

        }

        /* FAQS */
        for (
          const faq
          of faqs
        ) {

          await updateDiveConfidenceFAQItem(

            faq.id,

            faq

          );

        }

        alert(
          "Saved Successfully ✅"
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

      } finally {

        setSaving(
          false
        );

      }

    };

  if (
    !section
  )
    return null;

  return (

    <section
      className="
      py-28
      bg-[#f7f9fc]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="
      max-w-6xl
      mx-auto
      grid
      lg:grid-cols-2
      gap-20
      px-6
      ">

        {/* LEFT SIDE */}
        <div
          className="
          max-w-md
          "
        >

          {/* TITLE */}
          <textarea
            value={
              section.title
            }
            onChange={e =>
              setSection({

                ...section,

                title:
                  e.target
                    .value,

              })
            }
            rows={2}
            className="
            w-full
            bg-transparent
            text-4xl
            md:text-5xl
            font-semibold
            resize-none
            outline-none
            text-[#0a0e27]
            leading-[1.05]
            "
          />

          {/* HIGHLIGHT */}
          <input
            value={
              section.highlighted_title
            }
            onChange={e =>
              setSection({

                ...section,

                highlighted_title:
                  e.target
                    .value,

              })
            }
            className="
            mt-3
            text-cyan-500
            text-4xl
            bg-transparent
            outline-none
            w-full
            "
          />

          {/* DESC */}
          <textarea
            value={
              section.description
            }
            onChange={e =>
              setSection({

                ...section,

                description:
                  e.target
                    .value,

              })
            }
            rows={5}
            className="
            mt-7
            w-full
            resize-none
            bg-transparent
            outline-none
            text-[15px]
            leading-[1.9]
            text-[#7b8794]
            "
          />

          {/* REVIEWS */}
          <div className="
          mt-10
          space-y-4
          ">

            {reviews.map(
              review => (

                <div
                  key={
                    review.id
                  }
                  className="
                  w-fit
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-full
                  border
                  border-[#d7e1ea]
                  bg-white
                  shadow-sm
                  "
                >

                  {review.icon_url ? (

                    <img
                      src={
                        review.icon_url
                      }
                      className="
                      w-12
                      object-contain
                      "
                    />

                  ) : (

                    <div
                      className={`
                      w-3
                      h-3
                      rounded-full
                      ${
                        review.color ===
                        "green"

                          ? "bg-green-500"

                          : "bg-cyan-500"
                      }
                      `}
                    />

                  )}

                  <div
                    className="
                    space-y-2
                    "
                  >

                    <input
                      value={
                        review.rating
                      }
                      onChange={e =>
                        updateReview(

                          review.id,

                          "rating",

                          e.target
                            .value
                        )
                      }
                      className="
                      text-sm
                      font-semibold
                      text-[#0a0e27]
                      outline-none
                      bg-transparent
                      "
                    />

                    <input
                      value={
                        review.review_count
                      }
                      onChange={e =>
                        updateReview(

                          review.id,

                          "review_count",

                          e.target
                            .value
                        )
                      }
                      className="
                      text-[10px]
                      tracking-[1px]
                      text-cyan-500
                      bg-transparent
                      outline-none
                      "
                    />

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* RIGHT FAQ */}
        <div
          className="
          space-y-4
          "
        >

          {faqs.map(

            (
              item,
              i
            ) => {

              const isOpen =
                active === i;

              return (

                <motion.div
                  key={
                    item.id
                  }
                  layout
                  className={`
                  rounded-2xl
                  border
                  transition
                  overflow-hidden
                  ${
                    isOpen

                      ? "border-cyan-400 bg-white shadow-md"

                      : "border-[#d9e2ec] bg-white"
                  }
                  `}
                >

                  {/* HEADER */}
                  <button
                    onClick={() =>
                      setActive(

                        isOpen
                          ? -1
                          : i
                      )
                    }
                    className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    text-left
                    "
                  >

                    <input
                      value={
                        item.question
                      }
                      onChange={e =>
                        updateFaq(

                          item.id,

                          "question",

                          e.target
                            .value
                        )
                      }
                      className="
                      text-[15px]
                      text-[#243447]
                      font-medium
                      bg-transparent
                      outline-none
                      flex-1
                      "
                    />

                    <div
                      className="
                      text-cyan-500
                      "
                    >

                      {isOpen ? (

                        <X
                          size={16}
                        />

                      ) : (

                        <Plus
                          size={16}
                        />

                      )}

                    </div>

                  </button>

                  {/* CONTENT */}
                  <AnimatePresence>

                    {isOpen && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                      >

                        <div
                          className="
                          px-6
                          pb-6
                          "
                        >

                          <textarea
                            value={
                              item.answer
                            }
                            onChange={e =>
                              updateFaq(

                                item.id,

                                "answer",

                                e.target
                                  .value
                              )
                            }
                            rows={4}
                            className="
                            w-full
                            resize-none
                            bg-transparent
                            outline-none
                            text-[14px]
                            leading-[1.9]
                            text-[#7b8794]
                            "
                          />

                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </motion.div>
              );
            }
          )}

        </div>

      </div>

      {/* SAVE */}
      <div className="
      flex
      justify-center
      mt-14
      ">

        <button
          onClick={
            handleSave
          }
          disabled={
            saving
          }
          className="
          flex
          items-center
          gap-3
          px-8
          py-4
          rounded-2xl
          bg-cyan-500
          text-white
          hover:scale-[1.03]
          transition
          shadow-lg
          "
        >

          <Save
            size={18}
          />

          {saving

            ? "Saving..."

            : "Save Changes"}

        </button>

      </div>

    </section>
  );
}