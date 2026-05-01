"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useEffect, useState } from "react";
import { updateFaq, getFaqs } from "@/services/faqSerrvice";

export function FaqAdmin() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [temp, setTemp] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data, error } = await getFaqs();

    if (error) {
      console.error("❌ ERROR:", error);
      return;
    }

    setFaqs(data || []);
    setTemp(data || []);
  };

  const handleChange = (id: string, field: string, value: string) => {
    setTemp((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, [field]: value } : f
      )
    );
  };

  const handleSave = async (id: string) => {
    const updated = temp.find((f) => f.id === id);
    await updateFaq(id, updated);
    setEditingId(null);
    load();
  };

  const handleCancel = () => {
    setTemp(faqs);
    setEditingId(null);
  };

  return (
    <section className="relative py-32 overflow-hidden">

      {/* ADMIN */}
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="absolute top-6 right-6 bg-white/20 text-white px-3 py-1 rounded"
      >
        {isAdmin ? "Exit Admin" : "Admin"}
      </button>

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />

      <div className="relative max-w-[1000px] mx-auto px-6">

        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">

          {temp.map((faq) => {
            const isEditing = editingId === faq.id;

            return (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className={`border border-white/10 rounded-xl bg-white/5 px-6 ${
                  isEditing ? "ring-2 ring-cyan-300" : ""
                }`}
              >

                {/* QUESTION */}
                <AccordionTrigger className="text-white py-4">

                  {isEditing ? (
                    <input
                      value={faq.question}
                      onChange={(e) =>
                        handleChange(faq.id, "question", e.target.value)
                      }
                      className="w-full bg-black/40 text-white p-2 rounded border border-cyan-400"
                    />
                  ) : (
                    <div className="flex justify-between w-full items-center">

                      <span
                        onClick={() => isAdmin && setEditingId(faq.id)}
                        className="cursor-pointer"
                      >
                        {faq.question}
                      </span>

                      {isAdmin && (
                        <button
                          onClick={() => setEditingId(faq.id)}
                          className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-cyan-400 hover:text-black"
                        >
                          Edit
                        </button>
                      )}

                    </div>
                  )}

                </AccordionTrigger>

                {/* ANSWER */}
                <AccordionContent className="text-white/70">

                  {isEditing ? (
                    <textarea
                      value={faq.answer}
                      onChange={(e) =>
                        handleChange(faq.id, "answer", e.target.value)
                      }
                      className="w-full bg-black/40 text-white p-2 rounded border border-cyan-400"
                    />
                  ) : (
                    <p>{faq.answer}</p>
                  )}

                  {isAdmin && isEditing && (
                    <div className="flex gap-3 mt-4">

                      <button
                        onClick={() => handleSave(faq.id)}
                        className="px-4 py-1 bg-green-400 text-black rounded"
                      >
                        Save
                      </button>

                      <button
                        onClick={handleCancel}
                        className="px-4 py-1 bg-red-500 text-white rounded"
                      >
                        Cancel
                      </button>

                    </div>
                  )}

                </AccordionContent>

              </AccordionItem>
            );
          })}

        </Accordion>
      </div>
    </section>
  );
}