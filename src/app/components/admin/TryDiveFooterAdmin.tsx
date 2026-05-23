"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  FaApple,
  FaGooglePlay,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,

} from "react-icons/fa6";

import {

  Save,
  Trash2,

} from "lucide-react";

import {

  getTryDiveFooter,
  updateTryDiveFooterSection,
  updateTryDiveFooterLink,
  updateTryDiveFooterSocial,

} from "@/services/TryDiveFooterService";

export default function
TryDiveFooterAdmin() {

  const [

    section,
    setSection,

  ] = useState<any>(
    null
  );

  const [

    links,
    setLinks,

  ] = useState<any[]>(
    []
  );

  const [

    socials,
    setSocials,

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

      const {

        section,
        links,
        socials,

      } = await getTryDiveFooter();

      setSection(
        section
      );

      setLinks(
        links || []
      );

      setSocials(
        socials || []
      );

    };

  /* =====================================
     UPDATE LINK
  ===================================== */

  const updateLink =
    (
      id: string,
      field: string,
      value: string
    ) => {

      setLinks(
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
     UPDATE SOCIAL
  ===================================== */

  const updateSocial =
    (
      id: string,
      value: string
    ) => {

      setSocials(
        prev =>
          prev.map(
            item =>
              item.id === id
                ? {

                    ...item,

                    url:
                      value,

                  }
                : item
          )
      );

    };

  /* =====================================
     DELETE LINK
  ===================================== */

  const removeLink =
    (
      id: string
    ) => {

      setLinks(
        prev =>
          prev.filter(
            item =>
              item.id !==
              id
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
        await updateTryDiveFooterSection(

          section.id,

          section

        );

        /* LINKS */
        for (
          const item
          of links
        ) {

          await updateTryDiveFooterLink(

            item.id,

            item

          );

        }

        /* SOCIALS */
        for (
          const item
          of socials
        ) {

          await updateTryDiveFooterSocial(

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

    <>
      <footer
        className="relative overflow-hidden bg-[#02101d] pt-20 pb-10"
        style={{
          fontFamily:
            "Harabara, sans-serif",
        }}
      >

        {/* BACKGROUND */}
        <div
          className="absolute inset-0"
        >

          <img
            src={
              section.footer_bg_image
            }
            alt="footer"
            className="w-full h-full object-cover opacity-20"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-[#02101d] via-[#02101d]/90 to-[#02101d]"
          />

        </div>

        {/* CONTENT */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-6"
        >

          {/* TOP GRID */}
          <div
            className="grid md:grid-cols-5 gap-10"
          >

            {/* DOWNLOAD */}
            <div>

              <h4
                className="text-white text-[11px] tracking-[2px] font-semibold mb-6"
              >

                DOWNLOAD APP

              </h4>

              <div
                className="space-y-3"
              >

                {/* APP STORE */}
                <div>

                  <button
                    className="w-[160px] h-[48px] rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-3 px-4"
                  >

                    <FaApple
                      className="text-white text-xl"
                    />

                    <div
                      className="text-left"
                    >

                      <p
                        className="text-[8px] text-white/40 uppercase"
                      >

                        Download on the

                      </p>

                      <p
                        className="text-white text-sm font-medium"
                      >

                        App Store

                      </p>

                    </div>

                  </button>

                  <input
                    value={
                      section.app_store_url
                    }
                    onChange={e =>
                      setSection({

                        ...section,

                        app_store_url:
                          e.target
                            .value,

                      })
                    }
                    placeholder="
                    App Store URL
                    "
                    className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none"
                  />

                </div>

                {/* GOOGLE PLAY */}
                <div>

                  <button
                    className="w-[160px] h-[48px] rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-3 px-4"
                  >

                    <FaGooglePlay
                      className="text-white text-lg"
                    />

                    <div
                      className="text-left"
                    >

                      <p
                        className="text-[8px] text-white/40 uppercase"
                      >

                        Get it on

                      </p>

                      <p
                        className="text-white text-sm font-medium"
                      >

                        Google Play

                      </p>

                    </div>

                  </button>

                  <input
                    value={
                      section.google_play_url
                    }
                    onChange={e =>
                      setSection({

                        ...section,

                        google_play_url:
                          e.target
                            .value,

                      })
                    }
                    placeholder="
                    Google Play URL
                    "
                    className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none"
                  />

                </div>

              </div>

            </div>

            {/* CONNECT */}
            <div>

              <h4
                className="text-white text-[11px] tracking-[2px] font-semibold mb-6"
              >

                CONNECT

              </h4>

              <div
                className="flex items-center gap-2 text-white/70 text-sm mb-5"
              >

                <FaWhatsapp
                  className="text-cyan-400"
                />

                <input
                  value={
                    section.whatsapp_text
                  }
                  onChange={e =>
                    setSection({

                      ...section,

                      whatsapp_text:
                        e.target
                          .value,

                    })
                  }
                  className="bg-transparent outline-none text-white"
                />

              </div>

              <input
                value={
                  section.whatsapp_url
                }
                onChange={e =>
                  setSection({

                    ...section,

                    whatsapp_url:
                      e.target
                        .value,

                  })
                }
                placeholder="
                WhatsApp URL
                "
                className="w-full rounded-full bg-white/[0.03] border border-white/10 px-5 py-3 text-sm text-white outline-none"
              />

              <div
                className="space-y-3 mt-4"
              >

                <input
                  value={
                    section.newsletter_placeholder
                  }
                  onChange={e =>
                    setSection({

                      ...section,

                      newsletter_placeholder:
                        e.target
                          .value,

                    })
                  }
                  className="w-full h-[44px] rounded-full bg-white/[0.03] border border-white/10 px-5 text-sm text-white outline-none"
                />

                <input
                  value={
                    section.subscribe_button_text
                  }
                  onChange={e =>
                    setSection({

                      ...section,

                      subscribe_button_text:
                        e.target
                          .value,

                    })
                  }
                  className="w-full h-[44px] rounded-full bg-cyan-500 text-white text-sm font-semibold text-center outline-none"
                />

              </div>

            </div>
                        {/* INFORMATION */}
            <div>

              <h4
                className="text-white text-[11px] tracking-[2px] font-semibold mb-6"
              >

                INFORMATION

              </h4>

              <div
                className="space-y-4"
              >

                {links
                  .filter(
                    item =>
                      item.section_name
                      ===
                      "information"
                  )
                  .map(
                    item => (

                      <div
                        key={
                          item.id
                        }
                        className="flex items-center gap-2"
                      >

                        <input
                          value={
                            item.title
                          }
                          onChange={e =>
                            updateLink(

                              item.id,

                              "title",

                              e.target
                                .value
                            )
                          }
                          className="flex-1 bg-transparent text-sm text-white/50 outline-none"
                        />

                        <Trash2
                          size={15}
                          onClick={() =>
                            removeLink(
                              item.id
                            )
                          }
                          className="text-red-400 cursor-pointer"
                        />

                      </div>
                    )
                  )}

              </div>

            </div>

            {/* EXPERIENCES */}
            <div>

              <h4
                className="text-white text-[11px] tracking-[2px] font-semibold mb-6"
              >

                EXPERIENCES

              </h4>

              <div
                className="space-y-4"
              >

                {links
                  .filter(
                    item =>
                      item.section_name
                      ===
                      "experiences"
                  )
                  .map(
                    item => (

                      <div
                        key={
                          item.id
                        }
                        className="flex items-center gap-2"
                      >

                        <input
                          value={
                            item.title
                          }
                          onChange={e =>
                            updateLink(

                              item.id,

                              "title",

                              e.target
                                .value
                            )
                          }
                          className="flex-1 bg-transparent text-sm text-white/50 outline-none"
                        />

                        <Trash2
                          size={15}
                          onClick={() =>
                            removeLink(
                              item.id
                            )
                          }
                          className="text-red-400 cursor-pointer"
                        />

                      </div>
                    )
                  )}

              </div>

            </div>

            {/* COURSES */}
            <div>

              <h4
                className="text-white text-[11px] tracking-[2px] font-semibold mb-6"
              >

                DIVING COURSES

              </h4>

              <div
                className="space-y-4"
              >

                {links
                  .filter(
                    item =>
                      item.section_name
                      ===
                      "courses"
                  )
                  .map(
                    item => (

                      <div
                        key={
                          item.id
                        }
                        className="flex items-center gap-2"
                      >

                        <input
                          value={
                            item.title
                          }
                          onChange={e =>
                            updateLink(

                              item.id,

                              "title",

                              e.target
                                .value
                            )
                          }
                          className="flex-1 bg-transparent text-sm text-white/50 outline-none"
                        />

                        <Trash2
                          size={15}
                          onClick={() =>
                            removeLink(
                              item.id
                            )
                          }
                          className="text-red-400 cursor-pointer"
                        />

                      </div>
                    )
                  )}

              </div>

            </div>

          </div>

          {/* DIVIDER */}
          <div
            className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >

            {/* SOCIALS */}
            <div
              className="flex items-center gap-3"
            >

              {socials.map(
                item => (

                  <div
                    key={
                      item.id
                    }
                    className="flex flex-col gap-2"
                  >

                    <button
                      className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70"
                    >

                      {item.icon_name ===
                      "facebook" ? (

                        <FaFacebookF
                          size={13}
                        />

                      ) : item.icon_name ===
                        "instagram" ? (

                        <FaInstagram
                          size={14}
                        />

                      ) : (

                        <FaXTwitter
                          size={13}
                        />

                      )}

                    </button>

                    <input
                      value={
                        item.url
                      }
                      onChange={e =>
                        updateSocial(

                          item.id,

                          e.target
                            .value
                        )
                      }
                      className="w-[140px] rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white outline-none"
                    />

                  </div>
                )
              )}

            </div>

            {/* COPYRIGHT */}
            <input
              value={
                section.copyright_text
              }
              onChange={e =>
                setSection({

                  ...section,

                  copyright_text:
                    e.target
                      .value,

                })
              }
              className="text-[11px] tracking-[1px] text-white/30 text-center bg-transparent outline-none w-full md:w-[420px]"
            />

          </div>

        </div>

      </footer>

      {/* SAVE BUTTON */}
      <div
        className="flex justify-center mt-10"
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

    </>
  );
}