"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  MapPin,
  Mail,
  Phone,
  Save,
  Trash2,
  Plus,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  getLocations,
  updateLocation,
  createLocation,
  deleteLocation,
} from "@/services/locationService";

export default function LocationAdmin() {
  const [
    locations,
    setLocations,
  ] = useState<any[]>([]);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } =
      await getLocations();

    setLocations(data || []);
  };

  const handleChange = (
    index: number,
    key: string,
    value: any
  ) => {
    const updated = [
      ...locations,
    ];

    updated[index][key] =
      value;

    setLocations(updated);
  };

  const handleSave =
    async () => {
      setSaving(true);

      await Promise.all(
        locations.map(
          updateLocation
        )
      );

      setSaving(false);
    };

  const handleAdd =
    async () => {
      const {
        data,
      }: any =
        await createLocation(
          {
            title:
              "NEW LOCATION",

            rating:
              "5.0",

            reviews:
              "(0 Reviews)",

            address: "",

            email: "",

            phone: "",

            map_url: "",
          }
        );

      if (data?.[0]) {
        setLocations([
          ...locations,
          data[0],
        ]);
      }
    };

  const handleDelete =
    async (id: string) => {
      await deleteLocation(
        id
      );

      setLocations(
        locations.filter(
          (l) =>
            l.id !== id
        )
      );
    };

  return (
    <section className="py-32 bg-gradient-to-b from-[#f8fafc] to-[#eef2f6]">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-14">

          <div>

            <h2 className="text-4xl font-bold text-[#0a0e27]">

              Location CMS

            </h2>

            <p className="text-gray-500 mt-2">

              Manage all dive campus locations dynamically.

            </p>

          </div>

          {/* <button
            onClick={
              handleAdd
            }
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-2xl
              bg-cyan-400
              text-black
              font-semibold
            "
          > */}

            {/* <Plus className="w-5 h-5" />

            Add Location */}

          {/* </button> */}

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {locations.map(
            (
              loc,
              i
            ) => (
              <motion.div
                key={loc.id}
                whileHover={{
                  y: -4,
                }}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-gray-200
                  overflow-hidden
                  shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                "
              >

                {/* TOP */}
                <div className="p-8 border-b border-gray-100">

                  <div className="flex items-center justify-between mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center">

                      <MapPin className="text-cyan-500 w-6 h-6" />

                    </div>

                    {/* <button
                      onClick={() =>
                        handleDelete(
                          loc.id
                        )
                      }
                      className="text-red-500"
                    >

                      <Trash2 className="w-5 h-5" />

                    </button> */}

                  </div>

                  <div className="space-y-4">

                    <input
                      value={
                        loc.title
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          i,
                          "title",
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full text-2xl font-bold outline-none"
                    />

                    <div className="grid grid-cols-2 gap-4">

                      <input
                        value={
                          loc.rating
                        }
                        onChange={(
                          e
                        ) =>
                          handleChange(
                            i,
                            "rating",
                            e
                              .target
                              .value
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl border"
                        placeholder="Rating"
                      />

                      <input
                        value={
                          loc.reviews
                        }
                        onChange={(
                          e
                        ) =>
                          handleChange(
                            i,
                            "reviews",
                            e
                              .target
                              .value
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl border"
                        placeholder="Reviews"
                      />

                    </div>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-8 space-y-5">

                  <div className="flex gap-3 items-start">

                    <MapPin className="text-cyan-500 w-5 h-5 mt-4" />

                    <textarea
                      value={
                        loc.address
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          i,
                          "address",
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full px-4 py-3 rounded-2xl border min-h-[100px]"
                      placeholder="Address"
                    />

                  </div>

                  <div className="flex gap-3 items-center">

                    <Mail className="text-cyan-500 w-5 h-5" />

                    <input
                      value={
                        loc.email
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          i,
                          "email",
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border"
                      placeholder="Email"
                    />

                  </div>

                  <div className="flex gap-3 items-center">

                    <Phone className="text-cyan-500 w-5 h-5" />

                    <input
                      value={
                        loc.phone
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          i,
                          "phone",
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border"
                      placeholder="Phone"
                    />

                  </div>

                  {/* MAP URL */}
                  <div>

                    <label className="text-sm text-gray-500 mb-2 block">

                      Google Maps Embed URL

                    </label>

                    <input
                      value={
                        loc.map_url
                      }
                      onChange={(
                        e
                      ) =>
                        handleChange(
                          i,
                          "map_url",
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border"
                    />

                  </div>

                  {/* PREVIEW */}
                  <div className="rounded-2xl overflow-hidden border">

                    <iframe
                      src={
                        loc.map_url
                      }
                      className="w-full h-[240px]"
                    />

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

        {/* SAVE */}
        <div className="fixed bottom-8 right-8">

          <button
            onClick={
              handleSave
            }
            className="
              flex
              items-center
              gap-3
              px-8
              py-4
              rounded-2xl
              bg-cyan-400
              text-black
              font-semibold
              shadow-xl
            "
          >

            <Save className="w-5 h-5" />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </section>
  );
}