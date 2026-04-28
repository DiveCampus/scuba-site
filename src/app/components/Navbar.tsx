import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navbarHover, setNavbarHover] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isHero, setIsHero] = useState(true);

  const lastScrollRef = useRef(0);

  const navText =
    "text-[13px] uppercase tracking-[2px] text-white transition duration-300";

  // ✅ 🔥 FINAL NAVIGATION HANDLER
  const handleNavigation = (path: string) => {
    // 👉 SECTION SCROLL
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // 👉 NORMAL ROUTE
    navigate(path);
  };

  // 🔥 ROUTES
  const routeMap: any = {
    "Advanced Open Water": "/advanced-open-water",
    "Specialty Courses": "/specialty-courses",
    "PADI Divemaster": "/padi-divemaster",
    "PADI Rescue Diver": "/rescue-diver",
    "PADI Open Water": "/padi-open-water",
    "PADI Open Diver": "/padi-open-diver",
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setIsHero(currentScroll < window.innerHeight * 0.8);

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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50 font-habara"
    >
      <motion.div
        onMouseEnter={() => setNavbarHover(true)}
        onMouseLeave={() => setNavbarHover(false)}
        className="flex items-center justify-between px-10 py-4 w-full bg-[#05263c]/90 backdrop-blur"
      >
        {/* ✅ LOGO FIX */}
        <div
          className="flex items-center h-[50px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logow.svg" className="h-full object-contain" />
        </div>

        {/* MENU */}
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
                        className="absolute top-[170%] left-0 min-w-[250px] rounded-xl p-4 bg-[#082544]/90 backdrop-blur-xl border border-cyan-400/20"
                      >
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub}
                            className="block w-full text-left px-4 py-3 rounded-lg text-white hover:text-cyan-300 transition"
                            onClick={() => handleNavigation(routeMap[sub])}
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

        {/* MOBILE */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.div>
    </motion.nav>
  );
}