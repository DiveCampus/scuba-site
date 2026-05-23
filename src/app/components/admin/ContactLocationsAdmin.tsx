"use client";

import {

  useEffect,
  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Save,

} from "lucide-react";

import {

  getContactLocations,
  updateContactLocation,

} from "@/services/ContactLocationsService";

export default function
ContactLocationsAdmin() {

  const [

    locations,
    setLocations,

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

        locations,

      } = await getContactLocations();

      setLocations(
        locations
      );

    };

  /* =====================================
     UPDATE
  ===================================== */

  const updateField =
    (
      id: string,
      field: string,
      value: string
    ) => {

      setLocations(
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
     ADD LOCATION
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

        for (
          const item
          of locations
        ) {

          await updateContactLocation(

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

  return (

    <section
      className="py-24 bg-[#f5f8fb]"
      style={{
        fontFamily:
          "Harabara, sans-serif",
      }}
    >

      <div
        className="max-w-3xl mx-auto grid md:grid-cols-2 gap-7 px-6"
      >

        {locations.map(

          (
            item
          ) => (

            <motion.div
              key={
                item.id
              }
              whileHover={{
                y: -4,
              }}
              transition={{
                duration:
                  0.25,
              }}
              className="rounded-2xl border border-[#d9e2ec] bg-white p-7 shadow-sm relative"
            >


              {/* TITLE */}
              <input
                value={
                  item.title
                }
                onChange={e =>
                  updateField(

                    item.id,

                    "title",

                    e.target
                      .value
                  )
                }
                className="w-full text-center text-[12px] tracking-[2px] text-[#23364d] uppercase mb-10 bg-transparent outline-none"
              />

              {/* INFO */}
              <div
                className="space-y-5"
              >

                {/* ADDRESS */}
                <div
                  className="flex items-center gap-4"
                >

                  <div
                    className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center shadow-md shrink-0"
                  >

                    <MapPin
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <textarea
                    value={
                      item.address
                    }
                    onChange={e =>
                      updateField(

                        item.id,

                        "address",

                        e.target
                          .value
                      )
                    }
                    rows={3}
                    className="w-full bg-transparent outline-none text-[13px] leading-[1.7] text-[#7b8794] resize-none"
                  />

                </div>

                {/* EMAIL */}
                <div
                  className="flex items-center gap-4"
                >

                  <div
                    className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center shadow-md shrink-0"
                  >

                    <Mail
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <input
                    value={
                      item.email
                    }
                    onChange={e =>
                      updateField(

                        item.id,

                        "email",

                        e.target
                          .value
                      )
                    }
                    className="w-full bg-transparent outline-none text-[13px] text-[#7b8794]"
                  />

                </div>

                {/* PHONE */}
                <div
                  className="flex items-center gap-4"
                >

                  <div
                    className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center shadow-md shrink-0"
                  >

                    <Phone
                      size={17}
                      className="text-white"
                    />

                  </div>

                  <input
                    value={
                      item.phone
                    }
                    onChange={e =>
                      updateField(

                        item.id,

                        "phone",

                        e.target
                          .value
                      )
                    }
                    className="w-full bg-transparent outline-none text-[13px] text-[#7b8794]"
                  />

                </div>

              </div>

              {/* MAP */}
              <div
                className="mt-7 relative overflow-hidden rounded-xl border border-[#d9e2ec]"
              >

                <img
                  src={
                    item.map_image
                  }
                  className="w-full h-[145px] object-cover"
                />

                <button
                  className="absolute top-3 left-3 flex items-center gap-1 px-3 py-2 rounded-md bg-white text-[11px] font-medium text-cyan-600 shadow-md border border-[#d9e2ec]"
                >

                  Open in Maps

                  <ExternalLink
                    size={12}
                  />

                </button>

              </div>

              {/* MAP URL */}
              <input
                value={
                  item.map_url
                }
                onChange={e =>
                  updateField(

                    item.id,

                    "map_url",

                    e.target
                      .value
                  )
                }
                placeholder="
                Google Maps URL
                "
                className="mt-4 w-full rounded-xl border border-[#d9e2ec] px-4 py-3 outline-none text-sm"
              />

              {/* IMAGE */}
              <input
                value={
                  item.map_image
                }
                onChange={e =>
                  updateField(

                    item.id,

                    "map_image",

                    e.target
                      .value
                  )
                }
                placeholder="
                Image URL
                "
                className="mt-3 w-full rounded-xl border border-[#d9e2ec] px-4 py-3 outline-none text-sm"
              />

            </motion.div>
          )
        )}

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