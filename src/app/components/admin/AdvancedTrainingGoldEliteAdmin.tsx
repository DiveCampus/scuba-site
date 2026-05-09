"use client";

import { useEffect, useState } from "react";

import {

  Save,

} from "lucide-react";

import {

  getAdvancedTrainingEliteSection,

  updateAdvancedTrainingEliteSection,

} from "@/services/AdvancedTrainingEliteService";

/* =========================================
   ADMIN
========================================= */

export default function AdvancedTrainingGoldElitedAdmin() {

  const [data, setData] =
    useState<any>(null);

  const [saving, setSaving] =
    useState(false);

  /* =========================================
     FETCH
  ========================================= */

  useEffect(() => {

    const fetchData = async () => {

      const { data } =
        await getAdvancedTrainingEliteSection();

      setData(data);

    };

    fetchData();

  }, []);

  /* =========================================
     SAVE
  ========================================= */

  const handleSave = async () => {

    if (!data?.id) return;

    setSaving(true);

    await updateAdvancedTrainingEliteSection(
      data.id,
      data
    );

    setSaving(false);

  };

  if (!data) return null;

  return (

    <section
      className="
        py-36
        bg-[#f4f7fb]
      "
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        {/* TOP */}
        <div className="
          flex
          items-center
          justify-between
          mb-20
          flex-wrap
          gap-5
        ">

          <div>

            <p className="
              text-cyan-500
              tracking-[4px]
              text-[10px]
              mb-3
            ">

              ADMIN PANEL

            </p>

            <h2 className="
              text-4xl
              font-bold
              text-[#071133]
            ">

              Advanced Training Gold

            </h2>

          </div>

          <button
            onClick={handleSave}
            className="
              h-[56px]
              px-7
              rounded-2xl
              bg-cyan-500
              text-white
              flex
              items-center
              gap-3
              font-semibold
            "
          >

            <Save size={18} />

            {
              saving
                ? "Saving..."
                : "Save Changes"
            }

          </button>

        </div>

        {/* MAIN */}
        <div className="
          grid
          lg:grid-cols-2
          gap-20
        ">

          {/* LEFT */}
          <div>

            {/* BADGE */}
            <input
              value={data.badge}
              onChange={(e) =>
                setData({
                  ...data,
                  badge:
                    e.target.value,
                })
              }
              className="
                w-full
                h-[58px]
                rounded-full
                border
                border-cyan-300
                bg-white
                px-6
                text-cyan-500
                tracking-[4px]
                text-[10px]
                outline-none
                mb-10
              "
            />

            {/* TITLE */}
            <textarea
              rows={3}
              value={data.title}
              onChange={(e) =>
                setData({
                  ...data,
                  title:
                    e.target.value,
                })
              }
              className="
                w-full
                rounded-[28px]
                bg-white
                border
                border-gray-200
                p-6
                text-5xl
                font-bold
                text-[#071133]
                outline-none
                resize-none
                mb-6
              "
            />

            {/* HIGHLIGHT */}
            <textarea
              rows={2}
              value={
                data.highlighted_title
              }
              onChange={(e) =>
                setData({
                  ...data,
                  highlighted_title:
                    e.target.value,
                })
              }
              className="
                w-full
                rounded-[28px]
                bg-cyan-50
                border
                border-cyan-200
                p-6
                text-5xl
                font-bold
                text-cyan-500
                outline-none
                resize-none
                mb-8
              "
            />

            {/* DESCRIPTION */}
            <textarea
              rows={6}
              value={
                data.description
              }
              onChange={(e) =>
                setData({
                  ...data,
                  description:
                    e.target.value,
                })
              }
              className="
                w-full
                rounded-[30px]
                bg-white
                border
                border-gray-200
                p-6
                text-[#5f6982]
                leading-[2]
                outline-none
                resize-none
                mb-12
              "
            />

            {/* CARD */}
            <div className="
              bg-[#fffdf8]
              border
              border-yellow-300
              rounded-[34px]
              p-8
            ">

              {/* CARD TITLE */}
              <textarea
                rows={2}
                value={
                  data.card_title
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    card_title:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-[24px]
                  bg-white
                  border
                  border-gray-200
                  p-5
                  text-3xl
                  font-bold
                  text-[#071133]
                  outline-none
                  resize-none
                  mb-6
                "
              />

              {/* CARD DESC */}
              <textarea
                rows={5}
                value={
                  data.card_description
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    card_description:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-[24px]
                  bg-white
                  border
                  border-gray-200
                  p-5
                  text-[#667085]
                  outline-none
                  resize-none
                  mb-8
                "
              />

              {/* TAGS */}
              <div className="
                grid
                gap-4
              ">

                {[
                  "tag_1",
                  "tag_2",
                  "tag_3",
                ].map((key: any) => (

                  <input
                    key={key}
                    value={data[key]}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [key]:
                          e.target.value,
                      })
                    }
                    className="
                      w-full
                      h-[56px]
                      rounded-full
                      border
                      border-yellow-300
                      bg-white
                      px-5
                      text-yellow-600
                      outline-none
                    "
                  />

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="
            grid
            grid-cols-2
            gap-6
          ">

            {/* IMAGE 1 */}
            <div className="
              row-span-2
              rounded-[34px]
              overflow-hidden
              bg-white
              border
              border-gray-200
              p-4
            ">

              <img
                src={data.image_1}
                className="
                  w-full
                  h-[500px]
                  rounded-[24px]
                  object-cover
                  mb-4
                "
              />

              <input
                value={data.image_1}
                onChange={(e) =>
                  setData({
                    ...data,
                    image_1:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  h-[54px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  outline-none
                "
              />

            </div>

            {/* IMAGE 2 */}
            <div className="
              rounded-[34px]
              overflow-hidden
              bg-white
              border
              border-gray-200
              p-4
            ">

              <img
                src={data.image_2}
                className="
                  w-full
                  h-[220px]
                  rounded-[24px]
                  object-cover
                  mb-4
                "
              />

              <input
                value={data.image_2}
                onChange={(e) =>
                  setData({
                    ...data,
                    image_2:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  h-[54px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  outline-none
                "
              />

            </div>

            {/* IMAGE 3 */}
            <div className="
              rounded-[34px]
              overflow-hidden
              bg-white
              border
              border-gray-200
              p-4
            ">

              <img
                src={data.image_3}
                className="
                  w-full
                  h-[220px]
                  rounded-[24px]
                  object-cover
                  mb-4
                "
              />

              <input
                value={data.image_3}
                onChange={(e) =>
                  setData({
                    ...data,
                    image_3:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  h-[54px]
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  outline-none
                "
              />

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}