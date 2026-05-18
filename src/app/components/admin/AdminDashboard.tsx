"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { getHero, updateHero } from "@/services/heroService";
import { useNavigate } from "react-router-dom";

import CoursesPage from "./CoursesPage";
import { Gallery } from "./gallerypage";
import { PricingPage } from "./PricingPage";
import { FaqAdmin } from "./FaqAdmin";
import { FeaturedAdmin } from "./FeaturedAdmin";
import { TestimonialsAdmin } from "./TestimonialsAdmin";
import { WhyAdmin } from "./WhyAdmin";
import { FooterAdmin } from "./FooterAdmin";
import HeroSectionAdmin from "./HeroSectionAdmin";
import FeaturesAdmin from "./FeaturesAdmin";
import CompareAdmin from "./CompareAdmin";
import CommunityFAQSelectionAdmin from "./CommunityFAQSelectionAdmin";
import WhyChooseAdmin from "./WhyChooseAdmin";
import GoldStandardAdmin from "./GoldStandardAdmin";
import LocationAdmin from "./LocationAdmin";
import FootAdmin from "./FootAdmin";
import PadiOpenDiverAdmin from "./PadiOpenDiverAdmin";
import AdvancedProtocolAdmin from "./AdvancedProtocolAdmin";
import AOWAdvantageAdmin from "./AOWAdvantageAdmin";
import GlobalPassportAdmin from "./GlobalPassportAdmin";
import ChooseEnvironmentAdmin from "./ChooseEnvironmentAdmin";
import AdvancedTrainingGoldAdmin from "./AdvancedTrainingGoldAdmin";
import MasteryGapAdmin from "./MasteryGapAdmin";
import PremiumFooterAdmin from "./PremiumFooterAdmin";
import OpenDiverAdmin from "./OpenDiverAdmin";
import HybridProtocolAdmin from "./HybridProtocolAdmin";
import EliteBenefitsAdmin from "./EliteBenefitsAdmin";
import OceanEliteAdmin from "./OceanEliteAdmin";
import DiveEnvironmentAdmin from "./DiveEnvironmentAdmin";
import AdvancedTrainingGoldElitedAdmin from "./AdvancedTrainingGoldEliteAdmin";
import TrainingComparisonAdmin from "./TrainingComparisonAdmin";
import EliteFooterAdmin from "./EliteFooterAdmin";
import DivemasterHeroAdmin from "./DivemasterHeroAdmin";
import CommandOceanAdmin from "./CommandOceanAdmin";
import ComparisonDiveAdmin from "./ComparisonDiveAdmin";
import ProfessionalStatusAdmin from "./ProfessionalStatusAdmin";
import CareerPathAdmin from "./CareerPathAdmin";
import GoldStandardDiveAdmin from "./GoldStandardDiveAdmin";
import RescueHeroAdmin from "./RescueHeroAdmin";
import RescueCapabilitiesAdmin from "./RescueCapabilitiesAdmin";
import RescueComparisonAdmin from "./RescueComparisonAdmin";
import SimulationRealityAdmin from "./SimulationToRealityAdmin";
import MasterScubaCTAAdmin from "./MasterScubaCTAAdmin";
import { StepsAdmin } from "./AdminSteps";
import RescueFAQAdmin from "./RescueFAQAdmin";
import DiveTrainingShowcaseAdmin from "./DiveTrainingShowcaseAdmin";
import LocationFooterAdmin from "./LocationFooterAdmin";
import DivetryAdmin from "./DivetryAdmin";
import FirstDiveStepsAdmin from "./FirstDiveStepsAdmin";
import WeekendRoutineAdmin from "./WeekendRoutineAdmin";
// import EnvironmentSectionAdmin from "./EnvironmentSectionAdmin";
export default function AdminDashboard() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/admin");
        return;
      }

      const { data } = await getHero();

      setHero(data);
      setLoading(false);
    };

    init();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await updateHero(hero);

    const { data } = await getHero();

    setHero(data);

    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // PAGINATED COMPONENTS
  const pages = [
    {
      name: "Courses",
      component: <CoursesPage />,
    },
    {
      name: "Featured",
      component: <FeaturedAdmin />,
    },
    {
      name: "Gallery",
      component: <Gallery />,
    },
    {
      name: "Pricing",
      component: <PricingPage />,
    },
    {
      name: "Testimonials",
      component: <TestimonialsAdmin />,
    },
    {
      name: "Why",
      component: <WhyAdmin />,
    },
    {
      name: "FAQ",
      component: <FaqAdmin />,
    },
    {
      name: "Footer",
      component: <FooterAdmin />,
    },
    {
      name: "Hero Section",
      component: <HeroSectionAdmin />,
    },
    {
      name: "Features",
      component: <FeaturesAdmin />,
    },
    {
      name: "Steps",
      component: <StepsAdmin />,
    },
    {
      name: "Compare",
      component: <CompareAdmin />,
    },
    {
      name: "Community FAQ",
      component: <CommunityFAQSelectionAdmin />,
    },
    {
      name: "Why Choose",
      component: <WhyChooseAdmin />,
    },
    {
      name: "Gold Standard",
      component: <GoldStandardAdmin />,
    },
    {
      name: "Location",
      component: <LocationAdmin />,
    },
    {
      name: "Foot",
      component: <FootAdmin />,
    },
    {
      name: "PADI Open Diver",
      component: <PadiOpenDiverAdmin />,
    },
    {
      name: "Advanced Protocol",
      component: <AdvancedProtocolAdmin />,
    },
    {
      name: "AOW Advantage",
      component: <AOWAdvantageAdmin />,
    },
    {
      name : "Global Passport",
      component : <GlobalPassportAdmin />
    },
    {
      name :"Choose Environment",
      component : <ChooseEnvironmentAdmin />
    },
    {
      name:" Advanced Training Gold Section",
      component:<AdvancedTrainingGoldAdmin/>
    },
    {
      name :  "Mastery Gap",
      component : <MasteryGapAdmin />
    },
    {
      name: "Premium Footer",
      component: <PremiumFooterAdmin/>
    },
    {
      name :"Open Diver",
      component:<OpenDiverAdmin />
    },
    {
      name :"Hybrid Protocol",
      component:<HybridProtocolAdmin/>
    },
    {
      name :"Elite Benefits",
      component:<EliteBenefitsAdmin />
    },
    {
      name :" Ocean Elite",
      component:<OceanEliteAdmin />
    },
    {
      name :"Dive Environment",
      component :<DiveEnvironmentAdmin />
    },
    {
      name :"Advanced Training Gold EliteAdmin",
      component:<AdvancedTrainingGoldElitedAdmin />
    },
    {
      name :" Training Comparison",
      component:<TrainingComparisonAdmin />
    },
    {
      name :" Elite Footer",
      component:<EliteFooterAdmin />
    },
    {
      name :" Divemaster Hero",
      component:<DivemasterHeroAdmin />
    },
    {
      name: "Command Ocean",
      component: <CommandOceanAdmin />
    }, 
    {
     name :"Comparison Dive",
     component:<ComparisonDiveAdmin />
    },
    {
      name :"Professional Status",
      component:<ProfessionalStatusAdmin />
    },
    {
      name :"Career Path",
      component:<CareerPathAdmin />
    },
    {
      name: "Gold Standard Dive",
      component:<GoldStandardDiveAdmin />
    },
    
    // {
    //   name :" Environment Section",
    //   component :<EnvironmentSectionAdmin />
    // }

    {
      name :"Rescue Hero",
      component:<RescueHeroAdmin />
    },
    {
      name :"Rescue Capabilities",
      component:<RescueCapabilitiesAdmin />
    },
    {
      name :" Rescue Comparison",
      component:<RescueComparisonAdmin />
    },
    {
      name :"Simulation to Reality",
      component:<SimulationRealityAdmin />
    },
    {
      name :"Master Scuba CTA",
      component :<MasterScubaCTAAdmin />
    },
    {
      name :"Rescue FAQ Admin",
      component : <RescueFAQAdmin />
    },
    {
      name : "Dive TrainingShowcase Admin",
      component : <DiveTrainingShowcaseAdmin />
    },
    {
      name : "Location Footer Admin",
      component : <LocationFooterAdmin />
    },
    {
      name :"Divetry Admin",
      component: <DivetryAdmin />
    },
    {
      name :"First DiveSteps Admin",
      component: <FirstDiveStepsAdmin />
    },
    {
      name : "Weekend Routine Admin",
      component: <WeekendRoutineAdmin />
    }

    
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No data
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen px-4 py-6">

      <div
        className="
          w-full
          max-w-md
          sm:max-w-xl
          md:max-w-3xl
          lg:max-w-5xl
          xl:max-w-6xl
          mx-auto
          space-y-10
        "
      >

        {/* LOGOUT */}
        <div className="flex justify-end">

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="
              h-[44px]
              px-5
              rounded-2xl
              bg-red-500
              text-white
              text-sm
              font-medium
            "
          >
            Logout
          </motion.button>

        </div>

        {/* HERO ADMIN */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-2xl
            p-5
            sm:p-6
            md:p-8
            bg-white/5
            backdrop-blur
            shadow-lg
            text-center
          "
        >

          {/* TOP TEXT */}
          {editingField === "top_text" ? (
            <input
              value={hero.top_text || ""}
              onChange={(e) =>
                setHero({
                  ...hero,
                  top_text: e.target.value,
                })
              }
              onBlur={() => setEditingField(null)}
              autoFocus
              className="
                w-full
                text-[11px]
                tracking-widest
                uppercase
                text-cyan-300
                bg-transparent
                outline-none
                text-center
              "
            />
          ) : (
            <p
              onClick={() => setEditingField("top_text")}
              className="
                text-[11px]
                tracking-widest
                uppercase
                text-cyan-300
                cursor-pointer
              "
            >
              {hero.top_text || "Click to edit"}
            </p>
          )}

          {/* TITLE */}
          <h1
            className="
              mt-3
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-semibold
              leading-tight
            "
          >

            {editingField === "title" ? (
              <input
                value={hero.title || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    title: e.target.value,
                  })
                }
                onBlur={() => setEditingField(null)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-center
                "
              />
            ) : (
              <span
                onClick={() => setEditingField("title")}
                className="cursor-pointer"
              >
                {hero.title || "Click to edit"}
              </span>
            )}

            {" "}

            {editingField === "subtitle" ? (
              <input
                value={hero.subtitle || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    subtitle: e.target.value,
                  })
                }
                onBlur={() => setEditingField(null)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-cyan-400
                  text-center
                "
              />
            ) : (
              <span
                onClick={() => setEditingField("subtitle")}
                className="
                  text-cyan-400
                  cursor-pointer
                "
              >
                {hero.subtitle || ""}
              </span>
            )}

          </h1>

          {/* DESCRIPTION */}
          <div
            className="
              mt-4
              text-sm
              sm:text-base
              md:text-lg
              text-white/80
            "
          >

            {editingField === "description" ? (
              <textarea
                value={hero.description || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    description: e.target.value,
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-center
                "
              />
            ) : (
              <p
                onClick={() => setEditingField("description")}
                className="
                  cursor-pointer
                  w-full
                "
              >
                {hero.description || "Click to edit description"}
              </p>
            )}

          </div>

          {/* PRICE */}
          <div className="mt-6 space-y-1">

            {editingField === "old_price" ? (
              <input
                type="number"
                value={hero.old_price || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    old_price: Number(e.target.value),
                  })
                }
                onBlur={() => setEditingField(null)}
                autoFocus
                className="
                  w-full
                  text-center
                  bg-transparent
                  outline-none
                  text-white/50
                  line-through
                "
              />
            ) : (
              <p
                onClick={() => setEditingField("old_price")}
                className="
                  text-white/50
                  line-through
                  text-sm
                  sm:text-base
                  cursor-pointer
                "
              >
                AED {hero.old_price || 0}
              </p>
            )}

            {editingField === "price" ? (
              <input
                type="number"
                value={hero.price || ""}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    price: Number(e.target.value),
                  })
                }
                onBlur={() => setEditingField(null)}
                className="
                  w-full
                  text-center
                  bg-transparent
                  outline-none
                  text-cyan-400
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                "
              />
            ) : (
              <p
                onClick={() => setEditingField("price")}
                className="
                  text-cyan-400
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                  cursor-pointer
                "
              >
                AED {hero.price || 0}
              </p>
            )}

          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="
              mt-6
              w-full
              h-[48px]
              sm:h-[52px]
              rounded-2xl
              bg-cyan-400
              text-black
              font-medium
            "
          >
            {hero.cta_text || "Get Started"}
          </motion.button>

          {/* SAVE */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="
              mt-4
              w-full
              h-[48px]
              sm:h-[52px]
              rounded-2xl
              bg-green-400
              text-black
              font-medium
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>

        </motion.section>

        {/* PAGINATION BUTTONS */}
        <div
          className="
            flex
            flex-wrap
            gap-3
            justify-center
          "
        >

          {pages.map((page, index) => (

            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`
                px-4
                py-2
                rounded-xl
                text-sm
                transition-all
                border

                ${
                  currentPage === index
                    ? "bg-cyan-400 text-black border-cyan-400"
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                }
              `}
            >
              {page.name}
            </button>

          ))}

        </div>

        {/* CURRENT COMPONENT */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {pages[currentPage].component}
        </motion.div>

        {/* PREV NEXT */}
        <div className="flex items-center justify-between gap-4">

          <button
            disabled={currentPage === 0}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="
              flex-1
              h-[50px]
              rounded-2xl
              bg-white/10
              disabled:opacity-40
            "
          >
            Previous
          </button>

          <button
            disabled={currentPage === pages.length - 1}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="
              flex-1
              h-[50px]
              rounded-2xl
              bg-cyan-400
              text-black
              font-medium
              disabled:opacity-40
            "
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}