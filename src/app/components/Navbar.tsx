"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollRef = useRef(0);

  const navText =
    "text-[13px] uppercase tracking-[2px] text-white transition duration-300";

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(path);
  };

  const routeMap: any = {
    "Advanced Open Water": "/advanced-open-water",
    "Specialty Courses": "/specialty-courses",
    "PADI Divemaster": "/padi-divemaster",
    "PADI Rescue Diver": "/padi-rescue-diver",
    "PADI Open Water": "/padi-open-water",
    "PADI Open Diver": "/padi-open-diver",
  };

  const menuItems = [
    { label: "Try Diving", href: "#try-diving" },
    { label: "Get Certified", dropdown: ["PADI Open Water", "PADI Open Diver"] },
    {
      label: "Level Up",
      dropdown: [
        "Advanced Open Water",
        "Specialty Courses",
        "PADI Divemaster",
        "PADI Rescue Diver",
      ],
    },
    { label: "Reactivate", href: "#reactivate" },
    { label: "About", href: "/about" },
  ];

  // 🔥 Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 100) {
        setShowNavbar(true);
        return;
      }

      setShowNavbar(currentScroll < lastScrollRef.current);
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* 🔥 MAIN NAV */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 bg-[#05263c]/90 backdrop-blur">

        {/* LOGO */}
        <div
          className="flex items-center h-[50px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logow.svg" className="h-full object-contain" />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {"dropdown" in item ? (
                <>
                  <button className={navText}>
                    {item.label.toUpperCase()}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-[170%] left-0 min-w-[220px] rounded-xl p-4 bg-[#082544]/95 backdrop-blur-xl border border-cyan-400/20"
                      >
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleNavigation(routeMap[sub])}
                            className="block w-full text-left px-4 py-2 text-white hover:text-cyan-300"
                          >
                            {sub.toUpperCase()}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={navText}
                >
                  {item.label.toUpperCase()}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center gap-5 text-white">
          <Phone />
          <Mail />
          <button className="px-5 py-2 text-sm rounded-full bg-cyan-300 text-black hover:scale-105 transition">
            BOOK NOW
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔥 MOBILE MENU (DESKTOP STYLE) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden w-full bg-[#082544]/95 backdrop-blur-xl border-t border-cyan-400/20"
          >
            <div className="flex flex-col p-4 space-y-2">

              {menuItems.map((item) => (
                <div key={item.label}>

                  {"dropdown" in item ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          )
                        }
                        className="w-full text-left px-4 py-3 text-white border-b border-white/10"
                      >
                        {item.label.toUpperCase()}
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 bg-[#05263c]/60 rounded"
                          >
                            {item.dropdown.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => {
                                  handleNavigation(routeMap[sub]);
                                  setIsOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-white hover:text-cyan-300"
                              >
                                {sub.toUpperCase()}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigation(item.href);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white border-b border-white/10"
                    >
                      {item.label.toUpperCase()}
                    </button>
                  )}

                </div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}