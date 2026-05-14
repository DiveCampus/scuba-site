"use client";

import {
  Monitor,
  Waves,
  CheckCircle,
  Globe,
} from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import {
  getSteps,
  updateStepsSection,
  updateStepItem,
} from "@/services/stepsService";

export function StepsAdmin() {
  const [section, setSection] =
    useState<any>(null);

  const [steps, setSteps] =
    useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  const [editing, setEditing] =
    useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const {
      section,
      list,
    } = await getSteps();

    setSection(section);

    setSteps(list || []);
  };

  const handleSectionChange = (
    field: string,
    value: string
  ) => {
    setSection((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStepChange = (
    id: string,
    field: string,
    value: any
  ) => {
    setSteps((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const saveSection =
    async () => {
      setSaving(true);

      await updateStepsSection(
        section
      );

      setSaving(false);

      setEditing(null);
    };

  const saveStep = async (
    item: any
  ) => {
    setSaving(true);

    await updateStepItem(item);

    setSaving(false);

    setEditing(null);
  };

  const icons = [
    <Monitor className="w-6 h-6" />,
    <Waves className="w-6 h-6" />,
    <CheckCircle className="w-6 h-6" />,
    <Globe className="w-6 h-6" />,
  ];

  if (!section) return null;

  return (
    <section className="py-28 bg-[#f3f6f9]">

      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-20">

        {/* TITLE */}
        {editing === "title" ? (
          <div className="flex flex-col items-center gap-4">

            <input
              value={
                section.title
              }
              onChange={(e) =>
                handleSectionChange(
                  "title",
                  e.target.value
                )
              }
              className="
                text-4xl
                md:text-7xl
                font-bold
                text-center
                bg-white
                border
                border-cyan-300
                rounded-xl
                p-3
                w-full
              "
            />

            <input
              value={
                section.highlight
              }
              onChange={(e) =>
                handleSectionChange(
                  "highlight",
                  e.target.value
                )
              }
              className="
                text-3xl
                text-cyan-500
                font-bold
                text-center
                bg-white
                border
                border-cyan-300
                rounded-xl
                p-3
                w-full
              "
            />

            <textarea
              value={
                section.subtitle
              }
              onChange={(e) =>
                handleSectionChange(
                  "subtitle",
                  e.target.value
                )
              }
              className="
                bg-white
                border
                border-cyan-300
                rounded-xl
                p-4
                w-full
                text-center
              "
            />

            <button
              onClick={
                saveSection
              }
              className="
                px-6
                py-3
                bg-cyan-500
                text-white
                rounded-xl
              "
            >
              {saving
                ? "Saving..."
                : "Save"}
            </button>

          </div>
        ) : (
          <div
            onClick={() =>
              setEditing(
                "title"
              )
            }
            className="cursor-pointer"
          >
            <h2
              className="
                flex
                flex-col
                items-center
                text-4xl
                md:text-7xl
                font-bold
                text-[#0a0e27]
                leading-[1.05]
                tracking-[1px]
              "
              style={{
                fontFamily:
                  "Harabara, sans-serif",
              }}
            >
              <span>
                {
                  section.title
                }
              </span>

              <span
                className="
                  text-cyan-500
                  mt-3
                  md:mt-5
                "
              >
                {
                  section.highlight
                }
              </span>
            </h2>

            <p
              className="
                text-gray-500
                mt-4
              "
              style={{
                fontFamily:
                  "Inter, sans-serif",
              }}
            >
              {
                section.subtitle
              }
            </p>
          </div>
        )}
      </div>

      {/* STEPS */}
      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
          grid
          md:grid-cols-4
          gap-6
        "
      >
        {steps.map(
          (step, i) => {
            const isEditing =
              editing ===
              step.id;

            return (
              <div
                key={step.id}
                className="relative"
              >

                {/* ARROW */}
                {i !== 0 && (
                  <div
                    className="
                      hidden
                      md:block
                      absolute
                      -left-4
                      top-1/2
                      -translate-y-1/2
                      text-cyan-400
                      text-xl
                    "
                  >
                    →
                  </div>
                )}

                {/* CARD */}
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className={`
                    relative
                    p-6
                    rounded-2xl
                    border
                    transition
                    shadow-sm
                    cursor-pointer

                    ${
                      step.highlight
                        ? "bg-[#fffdf7] border-yellow-300 shadow-md"
                        : "bg-white border-gray-200"
                    }

                    ${
                      isEditing
                        ? "ring-2 ring-cyan-400"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setEditing(
                      step.id
                    )
                  }
                >

                  {/* BADGE */}
                  {isEditing ? (
                    <input
                      value={
                        step.tag
                      }
                      onChange={(
                        e
                      ) =>
                        handleStepChange(
                          step.id,
                          "tag",
                          e.target
                            .value
                        )
                      }
                      className="
                        absolute
                        top-3
                        right-3
                        text-[10px]
                        px-2
                        py-1
                        rounded-full
                        border
                      "
                    />
                  ) : (
                    step.highlight && (
                      <div
                        className="
                          absolute
                          top-3
                          right-3
                          text-[10px]
                          px-3
                          py-1
                          bg-cyan-500
                          text-white
                          rounded-full
                        "
                      >
                        {
                          step.tag
                        }
                      </div>
                    )
                  )}

                  {/* ICON */}
                  <div className="text-cyan-500 mb-4">
                    {
                      icons[
                        i
                      ]
                    }
                  </div>

                  {/* TITLE */}
                  {isEditing ? (
                    <input
                      value={
                        step.title
                      }
                      onChange={(
                        e
                      ) =>
                        handleStepChange(
                          step.id,
                          "title",
                          e.target
                            .value
                        )
                      }
                      className="
                        w-full
                        border
                        rounded-lg
                        p-2
                        mb-3
                      "
                    />
                  ) : (
                    <h3
                      className="
                        font-semibold
                        text-[#0a0e27]
                        mb-2
                      "
                      style={{
                        fontFamily:
                          "Harabara, sans-serif",
                      }}
                    >
                      {
                        step.title
                      }
                    </h3>
                  )}

                  {/* DESC */}
                  {isEditing ? (
                    <>
                      <textarea
                        value={
                          step.description
                        }
                        onChange={(
                          e
                        ) =>
                          handleStepChange(
                            step.id,
                            "description",
                            e.target
                              .value
                          )
                        }
                        className="
                          w-full
                          border
                          rounded-lg
                          p-2
                          mb-3
                        "
                      />

                      <button
                        onClick={() =>
                          saveStep(
                            step
                          )
                        }
                        className="
                          w-full
                          py-2
                          rounded-xl
                          bg-cyan-500
                          text-white
                        "
                      >
                        {saving
                          ? "Saving..."
                          : "Save"}
                      </button>
                    </>
                  ) : (
                    <p
                      className="
                        text-sm
                        text-gray-500
                        leading-relaxed
                      "
                      style={{
                        fontFamily:
                          "Inter, sans-serif",
                      }}
                    >
                      {
                        step.description
                      }
                    </p>
                  )}

                </motion.div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}