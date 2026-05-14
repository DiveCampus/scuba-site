"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  const [showNavbar, setShowNavbar] =
    useState(true);

  const lastScrollRef = useRef(0);

  const navText =
    "text-[13px] uppercase tracking-[2px] text-white transition duration-300 cursor-pointer";

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      const el = document.querySelector(path);

      if (el)
        el.scrollIntoView({
          behavior: "smooth",
        });

      return;
    }

    navigate(path);
  };

  const routeMap: any = {
    "Advanced Open Water":
      "/advanced-open-water",

    "Specialty Courses":
      "/specialty-courses",

    "PADI Divemaster":
      "/padi-divemaster",

    "PADI Rescue Diver":
      "/padi-rescue-diver",

    "PADI Open Water":
      "/padi-open-water",

    "PADI Scuba Diver":
      "/padi-scuba-diver",
  };

  const menuItems = [
    {
      label: "Try Dive",
      href: "/try-dive",
    },

    {
      label: "Get Certified",

      dropdown: [
        "PADI Open Water",
        "PADI Scuba Diver",
      ],
    },

    {
      label: "Level Up",

      dropdown: [
        "Advanced Open Water",
        "Specialty Courses",
        "PADI Divemaster",
        "PADI Rescue Diver",
      ],
    },

    {
      label: "Reactivate",
      href: "#reactivate",
    },

    {
      label: "About",
      href: "/about",
    },
  ];

  // NAVBAR SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.scrollY;

      if (currentScroll < 100) {
        setShowNavbar(true);
        return;
      }

      setShowNavbar(
        currentScroll <
          lastScrollRef.current
      );

      lastScrollRef.current =
        currentScroll;
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: showNavbar ? 0 : -100,
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        {/* MAIN NAV */}
        <div
          className="
            flex
            items-center
            justify-between

            px-6
            lg:px-10

            py-4

            bg-[#05263c]/90
            backdrop-blur
          "
        >
          {/* LOGO */}
          <div
            className="
              flex
              items-center
              h-[50px]
              cursor-pointer
            "
            onClick={() => navigate("/")}
          >
            <img
              src="/logow.svg"
              className="h-full object-contain"
            />
          </div>

          {/* DESKTOP MENU */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-10
            "
          >
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() =>
                  setActiveDropdown(
                    item.label
                  )
                }
                onMouseLeave={() =>
                  setActiveDropdown(null)
                }
              >
                {"dropdown" in item ? (
                  <>
                    <button
                      className={`
                        ${navText}

                        relative
                        pb-2
                      `}
                    >
                      {item.label.toUpperCase()}

                      {/* ANIMATED LINE */}
                      <span
                        className="
                          absolute
                          left-0
                          bottom-0

                          h-[2px]
                          w-0

                          bg-cyan-300

                          transition-all
                          duration-300

                          group-hover:w-full
                        "
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown ===
                        item.label && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                          }}
                          className="
                            absolute
                            top-[170%]
                            left-0

                            min-w-[220px]

                            rounded-xl
                            p-4

                            bg-[#082544]/95
                            backdrop-blur-xl

                            border
                            border-cyan-400/20
                          "
                        >
                          {item.dropdown.map(
                            (sub) => (
                              <button
                                key={sub}
                                onClick={() =>
                                  handleNavigation(
                                    routeMap[
                                      sub
                                    ]
                                  )
                                }
                                className="
                                  block
                                  w-full
                                  text-left

                                  px-4
                                  py-2

                                  text-white
                                  hover:text-cyan-300

                                  cursor-pointer
                                "
                              >
                                {sub.toUpperCase()}
                              </button>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      handleNavigation(
                        item.href
                      )
                    }
                    className={`
                      ${navText}

                      relative
                      pb-2
                    `}
                  >
                    {item.label.toUpperCase()}

                    {/* ANIMATED LINE */}
                    <span
                      className="
                        absolute
                        left-0
                        bottom-0

                        h-[2px]
                        w-0

                        bg-cyan-300

                        transition-all
                        duration-300

                        group-hover:w-full
                      "
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-5
              text-white
            "
          >
            {/* CONTACT TEXT */}
            <div
              className="
                flex
                flex-col
                items-end

                leading-[1.4]
              "
            >
              <span
                className="
                  text-[12px]
                  tracking-[2px]
                  uppercase
                "
              >
                Call 800 72822
              </span>

              <span
                className="
                  text-cyan-300
                  text-[11px]
                  tracking-[2px]
                  uppercase
                "
              >
                (SCUBA)
              </span>

              <span
                className="
                  text-white/50
                  text-[10px]
                  tracking-[2px]
                  uppercase
                "
              >
                OR WhatsApp us on
                +971507703483
              </span>
            </div>

            {/* CALL ICON */}
            <a
              href="tel:80072822"
              className="
                flex
                items-center
                justify-center

                w-[42px]
                h-[42px]

                rounded-full

                border
                border-cyan-300/30

                hover:bg-cyan-300
                hover:text-black

                transition
                duration-300

                cursor-pointer
              "
            >
              <Phone size={18} />
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="
              lg:hidden
              text-white
              cursor-pointer
            "
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                lg:hidden
                w-full

                bg-[#082544]/95
                backdrop-blur-xl

                border-t
                border-cyan-400/20
              "
            >
              <div
                className="
                  flex
                  flex-col

                  p-4
                  space-y-2
                "
              >
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {"dropdown" in item ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown ===
                                item.label
                                ? null
                                : item.label
                            )
                          }
                          className="
                            w-full
                            text-left

                            px-4
                            py-3

                            text-white

                            border-b
                            border-white/10

                            cursor-pointer
                          "
                        >
                          {item.label.toUpperCase()}
                        </button>

                        <AnimatePresence>
                          {activeDropdown ===
                            item.label && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                height: 0,
                              }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              className="
                                pl-4
                                bg-[#05263c]/60
                                rounded
                              "
                            >
                              {item.dropdown.map(
                                (sub) => (
                                  <button
                                    key={sub}
                                    onClick={() => {
                                      handleNavigation(
                                        routeMap[
                                          sub
                                        ]
                                      );

                                      setIsOpen(
                                        false
                                      );
                                    }}
                                    className="
                                      block
                                      w-full
                                      text-left

                                      px-4
                                      py-2

                                      text-white
                                      hover:text-cyan-300

                                      cursor-pointer
                                    "
                                  >
                                    {sub.toUpperCase()}
                                  </button>
                                )
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          handleNavigation(
                            item.href
                          );

                          setIsOpen(false);
                        }}
                        className="
                          w-full
                          text-left

                          px-4
                          py-3

                          text-white

                          border-b
                          border-white/10

                          cursor-pointer
                        "
                      >
                        {item.label.toUpperCase()}
                      </button>
                    )}
                  </div>
                ))}

                {/* MOBILE CONTACT */}
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    mt-4
                    px-4
                    pt-4

                    border-t
                    border-white/10
                  "
                >
                  <div
                    className="
                      flex
                      flex-col

                      leading-[1.4]
                    "
                  >
                    <span
                      className="
                        text-[12px]
                        tracking-[2px]
                        uppercase
                        text-white
                      "
                    >
                      Call 800 72822
                    </span>

                    <span
                      className="
                        text-cyan-300
                        text-[11px]
                        tracking-[2px]
                        uppercase
                      "
                    >
                      (SCUBA)
                    </span>

                    <span
                      className="
                        text-white/50
                        text-[10px]
                        tracking-[2px]
                      "
                    >
                      WhatsApp:
                      +971507703483
                    </span>
                  </div>

                  <a
                    href="tel:80072822"
                    className="
                      flex
                      items-center
                      justify-center

                      w-[42px]
                      h-[42px]

                      rounded-full

                      border
                      border-cyan-300/30

                      text-white

                      hover:bg-cyan-300
                      hover:text-black

                      transition
                      duration-300

                      cursor-pointer
                    "
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}