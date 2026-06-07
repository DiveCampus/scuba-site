"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  Save,

} from "lucide-react";

import {

  getAdventureGallery,
  updateAdventureGallerySection,
  updateAdventureGalleryImage,

} from "@/services/AdventureGalleryService";

export default function
AdventureGalleryAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(
    null
  );

  const [

    images,
    setImages,

  ] = useState<any[]>(
    []
  );

  const [

    saving,
    setSaving,

  ] = useState(
    false
  );

  /* =====================================
     LOAD
  ===================================== */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const { section, images } = await getAdventureGallery();

      setSection(
        section
      );

      setImages(
        images || []
      );

    };

  /* =====================================
     UPDATE IMAGE
  ===================================== */

  const updateImage =
    (
      id: string,
      value: string
    ) => {

      setImages(
        prev =>
          prev.map(
            item =>
              item.id === id
                ? {

                    ...item,

                    image_url:
                      value,

                  }
                : item
          )
      );

    };

  const updateImageField =
    (
      id: string,
      field: string,
      value: string
    ) => {

      setImages(
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
     ADD IMAGE
  ===================================== */


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
        await updateAdventureGallerySection(

          section.id,

          section

        );

        /* IMAGES */
        for (
          const item
          of images
        ) {

          await updateAdventureGalleryImage(

            item.id,

            item

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
      className="py-24 bg-[#f5f8fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      {/* HEADER */}
      <div
        className="text-center px-6"
      >

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
          className="w-full max-w-3xl mx-auto text-center bg-transparent text-[34px] md:text-[52px] leading-[1.05] tracking-[-1.5px] font-semibold text-[#0b1c2e] resize-none outline-none"
        />

        <textarea
          value={
            section.highlight_title
          }
          onChange={e =>
            setSection({

              ...section,

              highlight_title:
                e.target
                  .value,

            })
          }
          rows={2}
          className="w-full max-w-3xl mx-auto text-center bg-transparent text-cyan-500 text-[34px] md:text-[52px] leading-[1.05] tracking-[-1.5px] font-semibold resize-none outline-none"
        />

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
          className="mt-5 w-full max-w-2xl mx-auto text-center bg-transparent text-[14px] leading-[1.8] text-[#7f8b99] resize-none outline-none"
        />

      </div>

      {/* GALLERY */}
      <div
        className="max-w-[1150px] mx-auto mt-14 px-6"
      >

        <div
          className="grid grid-cols-5 gap-3"
        >

          {images.map(
            item => (

              <motion.div
                key={
                  item.id
                }
                whileHover={{
                  scale:
                    1.02,
                }}
                className={`
                overflow-hidden
                rounded-[4px]
                relative
                border

                ${
                  item.grid_span
                  === "3"

                    ? "col-span-3"

                    : item.grid_span
                    === "2"

                    ? "col-span-2"

                    : "col-span-1"
                }
                `}
              >


                {/* IMAGE */}
                <img
                  src={
                    item.image_url
                  }
                  className="w-full h-[200px] object-cover"
                />

                {/* URL */}
                <div
                  className="p-3 bg-white"
                >

                  <input
                    value={
                      item.image_url
                    }
                    onChange={e =>
                      updateImage(

                        item.id,

                        e.target
                          .value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                  />

                  <input
                    value={
                      item.image_alt || ""
                    }
                    onChange={e =>
                      updateImageField(

                        item.id,

                        "image_alt",

                        e.target
                          .value
                      )
                    }
                    placeholder="Alt text (SEO)"
                    className="mt-2 w-full border rounded-lg px-3 py-2 text-xs text-[#7b8794] outline-none"
                  />

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>

      {/* BUTTONS */}
      <div
        className="flex justify-center gap-4 mt-16"
      >


        <button
          onClick={
            handleSave
          }
          disabled={
            saving
          }
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500 text-white hover:scale-[1.03] transition shadow-lg"
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