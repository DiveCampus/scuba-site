"use client";

import { useState } from "react";
import { X, Info, Lock, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BookingModal({ isOpen, onClose }: any) {
  const [divers, setDivers] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [tip, setTip] = useState("none");

  const toggleOption = (i: number) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const options = [
    {
      title: "Private Instructor",
      sub: "1 ON 1 Training",
      price: "+ AED 250",
    },
    {
      title: "Advanced Open Water Course",
      sub: "Bundle Offer (Save AED 100)",
      price: "+ AED 1,300",
    },
    {
      title: "Fujairah Expedition",
      sub: "2 Dives in UAE’s best Dive sites",
      price: "+ AED 400",
    },
  ];

  // if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="w-full min-h-screen bg-white overflow-y-auto font-habara"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full min-h-screen">

          {/* MAIN CONTAINER */}
          <motion.div
            initial={{ scale: 0.96, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 30 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen bg-white overflow-hidden"
          >
            <div className="grid lg:grid-cols-[60%_40%]">

              {/* ================= LEFT SIDE ================= */}
              <div className="relative bg-white px-5 md:px-12 py-8 md:py-10">

                {/* CLOSE */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 text-gray-400 hover:text-black transition"
                >
                  <X size={22} />
                </button>

                <div className="max-w-[620px] mx-auto">

                  {/* EXPRESS CHECKOUT */}
                  <div className="mb-10">
                    <p className="text-center text-gray-500 text-sm mb-4">
                      Express checkout
                    </p>

                    <button className="w-full h-[54px] bg-black rounded-lg flex items-center justify-center hover:opacity-90 transition">
                      <img
                        src="/gpay.webp"
                        alt="gpay"
                        className="h-7 object-contain"
                      />
                    </button>

                    <div className="flex items-center gap-4 my-6">
                      <div className="h-[1px] bg-gray-300 flex-1" />
                      <span className="text-sm text-gray-400">OR</span>
                      <div className="h-[1px] bg-gray-300 flex-1" />
                    </div>
                  </div>

                  {/* CONTACT */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-[34px] font-semibold text-black">
                        Contact
                      </h2>

                      <button className="text-blue-600 text-sm hover:underline">
                        Sign in
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Email or mobile phone number"
                      className="w-full h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                    />

                    <label className="flex items-center gap-3 mt-4 text-sm text-gray-700">
                      <input type="checkbox" checked readOnly />
                      Email me with news and offers
                    </label>
                  </div>

                  {/* PAYMENT */}
                  <div className="mb-10">
                    <h2 className="text-[34px] font-semibold text-black mb-1">
                      Payment
                    </h2>

                    <p className="text-sm text-gray-500 mb-5">
                      All transactions are secure and encrypted.
                    </p>

                    <div className="rounded-2xl border border-blue-500 overflow-hidden bg-[#fafafa]">

                      {/* CARD HEADER */}
                      <div className="bg-[#f5f7fb] border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                        <p className="font-medium text-black">
                          Credit card
                        </p>

                        <div className="flex items-center gap-2">
                          <img src="/visa.webp" className="h-5" />
                          <img src="/mastercard.webp" className="h-5" />
                          <img src="/amex.webp" className="h-5" />
                        </div>
                      </div>

                      {/* CARD INPUTS */}
                      <div className="p-5 space-y-4">

                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Card number"
                            className="w-full h-[56px] rounded-xl border border-gray-300 px-5 pr-12 outline-none focus:border-blue-500 transition"
                          />

                          <Lock
                            size={18}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Expiration date (MM / YY)"
                            className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                          />

                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Security code"
                              className="w-full h-[56px] rounded-xl border border-gray-300 px-5 pr-12 outline-none focus:border-blue-500 transition"
                            />

                            <HelpCircle
                              size={18}
                              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Name on card"
                          className="w-full h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BILLING */}
                  <div className="mb-10">
                    <h2 className="text-[34px] font-semibold text-black mb-5">
                      Billing address
                    </h2>

                    <div className="space-y-4">

                      <select className="w-full h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition">
                        <option>United Arab Emirates</option>
                      </select>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          placeholder="First name"
                          className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                        />

                        <input
                          placeholder="Last name"
                          className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                        />
                      </div>

                      <input
                        placeholder="Address"
                        className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                      />

                      <input
                        placeholder="Apartment, suite, etc. (optional)"
                        className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          placeholder="City"
                          className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                        />

                        <select className="h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition">
                          <option>Dubai</option>
                        </select>
                      </div>

                      <div className="relative">
                        <input
                          placeholder="Phone"
                          className="w-full h-[56px] rounded-xl border border-gray-300 px-5 pr-12 outline-none focus:border-blue-500 transition"
                        />

                        <HelpCircle
                          size={18}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TIP SECTION */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-10">

                    <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-200">
                      <input type="checkbox" checked readOnly />

                      <p className="text-sm text-black">
                        Show your support for the team at divecampus
                      </p>
                    </div>

                    <div className="p-5">

                      {/* TIP BUTTONS */}
                      <div className="grid grid-cols-4 rounded-xl overflow-hidden border border-gray-200 mb-5">

                        {[
                          { id: "2", label: "2%", amount: "AED 44.00" },
                          { id: "5", label: "5%", amount: "AED 110.00" },
                          { id: "10", label: "10%", amount: "AED 220.00" },
                          { id: "none", label: "None", amount: "" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setTip(item.id)}
                            className={`
                              h-[82px] border-r last:border-r-0 transition flex flex-col items-center justify-center
                              ${
                                tip === item.id
                                  ? "bg-[#eef4ff] border-blue-500 text-black"
                                  : "bg-white hover:bg-gray-50"
                              }
                            `}
                          >
                            <span className="font-semibold">
                              {item.label}
                            </span>

                            {item.amount && (
                              <span className="text-xs text-gray-500 mt-1">
                                {item.amount}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* CUSTOM TIP */}
                      <div className="flex gap-3 mb-4">

                        <div className="flex-1 h-[56px] border border-gray-300 rounded-xl flex items-center justify-between px-5">
                          <input
                            placeholder="Custom tip"
                            className="outline-none bg-transparent w-full"
                          />

                          <div className="flex items-center gap-4 text-gray-500">
                            <button>−</button>
                            <button>+</button>
                          </div>
                        </div>

                        <button className="w-[120px] rounded-xl border border-gray-300 text-gray-500 hover:bg-gray-50 transition">
                          Add tip
                        </button>
                      </div>

                      <p className="text-sm text-gray-600">
                        Thank you, we appreciate it.
                      </p>
                    </div>
                  </div>

                  {/* PAY BUTTON */}
                  <button className="w-full h-[60px] rounded-2xl bg-[#1773ea] hover:bg-[#1365cf] transition text-white text-lg font-semibold shadow-lg">
                    Pay now
                  </button>
                </div>
              </div>

              {/* ================= RIGHT SIDE ================= */}
              <div className="bg-[#f7f7f7] border-l border-gray-200 px-6 md:px-10 py-10">

                <div className="max-w-[420px]">

                  {/* PRODUCT */}
                  <div className="flex items-start justify-between mb-10">

                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src="/course.webp"
                          alt=""
                          className="w-[76px] h-[76px] rounded-xl object-cover border border-gray-200"
                        />

                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">
                          1
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[22px] font-semibold text-black leading-tight">
                          PADI DiveMaster Course
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed mt-1">
                          Divemaster Course | Flexible (without
                          PADI Crewpack and eLearning)
                        </p>
                      </div>
                    </div>

                    <p className="text-[26px] font-semibold text-black">
                      AED 2,200.00
                    </p>
                  </div>

                  {/* DISCOUNT */}
                  <div className="flex gap-3 mb-10">
                    <input
                      placeholder="Discount code or gift card"
                      className="flex-1 h-[56px] rounded-xl border border-gray-300 px-5 outline-none focus:border-blue-500 transition"
                    />

                    <button className="w-[100px] rounded-xl border border-gray-300 bg-[#ececec] hover:bg-[#e2e2e2] transition text-gray-600">
                      Apply
                    </button>
                  </div>

                  {/* TOTALS */}
                  <div className="space-y-5 border-b border-gray-300 pb-8 mb-8">

                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>AED 2,200.00</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                      <span className="flex items-center gap-1">
                        Estimated taxes
                        <Info size={14} />
                      </span>

                      <span>AED 110.00</span>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[36px] font-semibold text-black">
                        Total
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Including taxes
                      </p>
                    </div>

                    <p className="text-[42px] font-bold text-black">
                      AED 2,310.00
                    </p>
                  </div>

                  {/* ADDONS */}
                  <div className="mt-10 space-y-3">

                    {options.map((item, i) => {
                      const active = selected.includes(i);

                      return (
                        <motion.div
                          key={i}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleOption(i)}
                          className={`
                            rounded-2xl border p-4 cursor-pointer transition-all
                            ${
                              active
                                ? "border-cyan-500 bg-cyan-50 shadow-md"
                                : "border-gray-200 bg-white hover:border-cyan-300"
                            }
                          `}
                        >
                          <div className="flex justify-between items-start">

                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-black">
                                  {item.title}
                                </h4>

                                <Info
                                  size={14}
                                  className="text-gray-400"
                                />
                              </div>

                              <p className="text-sm text-gray-500 mt-1">
                                {item.sub}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold text-black">
                                {item.price}
                              </p>

                              <div
                                className={`
                                  mt-2 w-5 h-5 rounded-md flex items-center justify-center text-xs
                                  ${
                                    active
                                      ? "bg-cyan-500 text-white"
                                      : "border border-gray-300"
                                  }
                                `}
                              >
                                {active && "✓"}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}