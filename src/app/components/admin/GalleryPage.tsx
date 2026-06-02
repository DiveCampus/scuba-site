"use client";

import {

  motion,
  AnimatePresence,

} from "framer-motion";

import {

  useEffect,
  useRef,
  useState,

} from "react";

import {

  getGallery,
  updateGalleryImage,

} from "@/services/galleryService";

export function Gallery() {

  const [

    images,
    setImages,

  ] = useState<any[]>(
    []
  );

  const [

    original,
    setOriginal,

  ] = useState<any[]>(
    []
  );

  const [

    editingId,
    setEditingId,

  ] = useState<string | null>(
    null
  );

  const [

    isAdmin,
    setIsAdmin,

  ] = useState(
    true
  );

  const [

    selectedIndex,
    setSelectedIndex,

  ] = useState<number | null>(
    null
  );

  const [

    currentIndex,
    setCurrentIndex,

  ] = useState(
    0
  );

  const sliderRef =
    useRef<HTMLDivElement>(
      null
    );

  /* =====================================
     LOAD
  ===================================== */

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const {

        data,

      } = await getGallery();

      const sorted =
        (data || [])

          .sort(
            (a, b) =>
              a.position -
              b.position
          )

          .slice(
            0,
            7
          );

      setImages(
        sorted
      );

      setOriginal(
        sorted
      );

    };

  /* =====================================
     CHANGE
  ===================================== */

  const handleChange =
    (
      id: string,
      value: string
    ) => {

      setImages(
        prev =>
          prev.map(
            img =>

              img.id ===
              id

                ? {

                    ...img,

                    image_url:
                      value,

                  }

                : img
          )
      );

    };

  /* =====================================
     SAVE
  ===================================== */

  const handleSave =
    async (
      img: any
    ) => {

      await updateGalleryImage(

        img.id,

        img.image_url

      );

      setEditingId(
        null
      );

      load();

    };

  /* =====================================
     CANCEL
  ===================================== */

  const handleCancel =
    () => {

      setImages(
        original
      );

      setEditingId(
        null
      );

    };

  /* =====================================
     SLIDER
  ===================================== */

  const scrollToIndex =
    (
      index: number
    ) => {

      if (
        !sliderRef.current
      )
        return;

      const container =
        sliderRef.current;

      const child =
        container
          .children[
          index
        ] as HTMLElement;

      container.scrollTo({

        left:

          child.offsetLeft -

          container.offsetWidth /
            2 +

          child.offsetWidth /
            2,

        behavior:
          "smooth",

      });

      setCurrentIndex(
        index
      );

    };

  const next =
    () =>
      scrollToIndex(

        (
          currentIndex +
          1
        ) %
          images.length

      );

  const prev =
    () =>

      scrollToIndex(

        (
          currentIndex -
          1 +
          images.length
        ) %
          images.length

      );

  /* =====================================
     AUTO CENTER DETECT
  ===================================== */

  useEffect(() => {

    const container =
      sliderRef.current;

    if (
      !container
    )
      return;

    const handleScroll =
      () => {

        const center =

          container.scrollLeft +

          container.offsetWidth /
            2;

        let closest =
          0;

        let minDist =
          Infinity;

        Array.from(
          container.children
        ).forEach(

          (
            child,
            i
          ) => {

            const el =
              child as HTMLElement;

            const childCenter =

              el.offsetLeft +

              el.offsetWidth /
                2;

            const dist =
              Math.abs(

                center -
                  childCenter

              );

            if (
              dist <
              minDist
            ) {

              minDist =
                dist;

              closest =
                i;

            }

          }

        );

        setCurrentIndex(
          closest
        );

      };

    container.addEventListener(

      "scroll",

      handleScroll

    );

    return () =>
      container.removeEventListener(

        "scroll",

        handleScroll

      );

  }, []);

  return (

    <section
      className="relative py-32 overflow-hidden font-habara"
    >

      {/* ADMIN */}
      <button
        onClick={() =>
          setIsAdmin(
            !isAdmin
          )
        }
        className="absolute top-6 right-6 z-50 bg-white/20 text-white px-3 py-1 rounded border"
      >

        {isAdmin

          ? "Exit Admin"

          : "Admin Mode"}

      </button>

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]"
      />

      <div
        className="relative max-w-[1400px] mx-auto px-6"
      >

        {/* HEADER */}
        <div
          className="text-center mb-20"
        >

          <h2
            className="text-5xl font-bold text-white"
          >

            Underwater{" "}

            <span
              className="text-cyan-300"
            >

              Gallery

            </span>

          </h2>

        </div>

        {/* SLIDER */}
        <div
          className="relative"
        >

          <button
            onClick={
              prev
            }
            className="absolute left-4 top-1/2 z-20 text-white"
          >

            ‹

          </button>

          <button
            onClick={
              next
            }
            className="absolute right-4 top-1/2 z-20 text-white"
          >

            ›

          </button>

          {/* IMAGES */}
          <div
            ref={
              sliderRef
            }
            className="flex gap-8 overflow-x-auto px-16 snap-x scroll-smooth no-scrollbar"
          >

            {images.map(

              (
                image,
                index
              ) => {

                const isActive =
                  index ===
                  currentIndex;

                const isEditing =
                  editingId ===
                  image.id;

                return (

                  <motion.div
                    key={
                      image.id
                    }
                    className="snap-center flex-shrink-0 min-w-[280px] md:min-w-[360px]"
                    animate={{
                      scale:
                        isActive
                          ? 1
                          : 0.85,

                      opacity:
                        isActive
                          ? 1
                          : 0.5,
                    }}
                    onClick={(
                      e
                    ) => {

                      const target =
                        e.target as HTMLElement;

                      const isAdminClick =
                        target.closest(
                          ".admin-panel"
                        );

                      if (
                        isAdminClick
                      )
                        return;

                      setSelectedIndex(
                        index
                      );

                    }}
                  >

                    <div
                      className="relative rounded-xl overflow-hidden"
                    >

                      <img
                        src={
                          image.image_url
                        }
                        className="w-full h-[420px] object-cover"
                      />

                      {isAdmin && (

                        <div
                          className="admin-panel absolute bottom-2 left-2 right-2 bg-black/70 p-2 rounded"
                        >

                          {isEditing ? (

                            <>
                              <input
                                value={
                                  image.image_url
                                }
                                onChange={(
                                  e
                                ) =>
                                  handleChange(

                                    image.id,

                                    e
                                      .target
                                      .value
                                  )
                                }
                                className="w-full text-white bg-white/10 p-2 text-xs rounded"
                              />

                              <div
                                className="flex gap-2 mt-2"
                              >

                                <button
                                  onClick={(
                                    e
                                  ) => {

                                    e.stopPropagation();

                                    handleSave(
                                      image
                                    );

                                  }}
                                  className="bg-green-400 text-black px-3 py-1 text-xs rounded"
                                >

                                  Save

                                </button>

                                <button
                                  onClick={(
                                    e
                                  ) => {

                                    e.stopPropagation();

                                    handleCancel();

                                  }}
                                  className="bg-red-500 text-white px-3 py-1 text-xs rounded"
                                >

                                  Cancel

                                </button>

                              </div>
                            </>
                          ) : (

                            <button
                              onClick={(
                                e
                              ) => {

                                e.stopPropagation();

                                setEditingId(
                                  image.id
                                );

                              }}
                              className="bg-white/20 text-white px-3 py-1 text-xs rounded"
                            >

                              Edit

                            </button>
                          )}

                        </div>
                      )}

                    </div>

                  </motion.div>
                );

              }
            )}

          </div>

        </div>

      </div>

      {/* MODAL */}
      <AnimatePresence>

        {selectedIndex !==
          null && (

          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          >

            <img
              src={
                images[
                  selectedIndex
                ]
                  .image_url
              }
              className="max-w-[90%] max-h-[80%]"
            />

            <button
              onClick={() =>
                setSelectedIndex(
                  null
                )
              }
              className="absolute top-6 right-6 text-white text-3xl"
            >

              ✕

            </button>

          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
}