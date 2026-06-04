"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
const HeroAdminOpen = lazy(  () => import("./HeroAdminOpen"));
// All admin sub-components are code-split. Only the actively selected
// section's chunk is fetched. Visual layout is unchanged.
const CoursesPage = lazy(() => import("./CoursesPage"));
const Gallery = lazy(() => import("./GalleryPage").then((m) => ({ default: m.Gallery })));
const PricingPage = lazy(() => import("./PricingPage").then((m) => ({ default: m.PricingPage })));
const FaqAdmin = lazy(() => import("./FaqAdmin").then((m) => ({ default: m.FaqAdmin })));
const FeaturedAdmin = lazy(() => import("./FeaturedAdmin").then((m) => ({ default: m.FeaturedAdmin })));
const TrainingQuality = lazy(() => import("./TestimonialsAdmin").then((m) => ({ default: m.TrainingQuality })));
const WhyAdmin = lazy(() => import("./WhyAdmin").then((m) => ({ default: m.WhyAdmin })));
const FooterAdmin = lazy(() => import("./FooterAdmin").then((m) => ({ default: m.FooterAdmin })));
const HeroSectionAdmin = lazy(() => import("./HeroSectionAdmin"));
const FeaturesAdmin = lazy(() => import("./FeaturesAdmin"));
const CompareAdmin = lazy(() => import("./CompareAdmin"));
const CommunityFAQSelectionAdmin = lazy(() => import("./CommunityFAQSelectionAdmin"));
const WhyChooseAdmin = lazy(() => import("./WhyChooseAdmin"));
const GoldStandardAdmin = lazy(() => import("./GoldStandardAdmin"));
const LocationAdmin = lazy(() => import("./LocationAdmin"));
const FootAdmin = lazy(() => import("./FootAdmin"));
const PadiOpenDiverAdmin = lazy(() => import("./PadiOpenDiverAdmin"));
const AdvancedProtocolAdmin = lazy(() => import("./AdvancedProtocolAdmin"));
const AOWAdvantageAdmin = lazy(() => import("./AOWAdvantageAdmin"));
const GlobalPassportAdmin = lazy(() => import("./GlobalPassportAdmin"));
const ChooseEnvironmentAdmin = lazy(() => import("./ChooseEnvironmentAdmin"));
const AdvancedTrainingGoldAdmin = lazy(() => import("./AdvancedTrainingGoldAdmin"));
const MasteryGapAdmin = lazy(() => import("./MasteryGapAdmin"));
const PremiumFooterAdmin = lazy(() => import("./PremiumFooterAdmin"));
const OpenDiverAdmin = lazy(() => import("./OpenDiverAdmin"));
const HybridProtocolAdmin = lazy(() => import("./HybridProtocolAdmin"));
const EliteBenefitsAdmin = lazy(() => import("./EliteBenefitsAdmin"));
const OceanEliteAdmin = lazy(() => import("./OceanEliteAdmin"));
const DiveEnvironmentAdmin = lazy(() => import("./DiveEnvironmentAdmin"));
const AdvancedTrainingGoldElitedAdmin = lazy(() => import("./AdvancedTrainingGoldEliteAdmin"));
const TrainingComparisonAdmin = lazy(() => import("./TrainingComparisonAdmin"));
const EliteFooterAdmin = lazy(() => import("./EliteFooterAdmin"));
const DivemasterHeroAdmin = lazy(() => import("./DivemasterHeroAdmin"));
const CommandOceanAdmin = lazy(() => import("./CommandOceanAdmin"));
const ComparisonDiveAdmin = lazy(() => import("./ComparisonDiveAdmin"));
const ProfessionalStatusAdmin = lazy(() => import("./ProfessionalStatusAdmin"));
const CareerPathAdmin = lazy(() => import("./CareerPathAdmin"));
const GoldStandardDiveAdmin = lazy(() => import("./GoldStandardDiveAdmin"));
const RescueHeroAdmin = lazy(() => import("./RescueHeroAdmin"));
const RescueCapabilitiesAdmin = lazy(() => import("./RescueCapabilitiesAdmin"));
const RescueComparisonAdmin = lazy(() => import("./RescueComparisonAdmin"));
const SimulationRealityAdmin = lazy(() => import("./SimulationToRealityAdmin"));
const MasterScubaCTAAdmin = lazy(() => import("./MasterScubaCTAAdmin"));
const StepsAdmin = lazy(() => import("./AdminSteps").then((m) => ({ default: m.StepsAdmin })));
const RescueFAQAdmin = lazy(() => import("./RescueFAQAdmin"));
const DiveTrainingShowcaseAdmin = lazy(() => import("./DiveTrainingShowcaseAdmin"));
const LocationFooterAdmin = lazy(() => import("./LocationFooterAdmin"));
const DivetryAdmin = lazy(() => import("./DivetryAdmin"));
const FirstDiveStepsAdmin = lazy(() => import("./FirstDiveStepsAdmin"));
const WeekendRoutineAdmin = lazy(() => import("./WeekendRoutineAdmin"));
const DiveConfidenceFAQAdmin = lazy(() => import("./DiveConfidenceFAQAdmin"));
const ChooseDiveSiteAdmin = lazy(() => import("./ChooseDiveSiteAdmin"));
const ExpertHandsAdmin = lazy(() => import("./ExpertHandsAdmin"));
const LegacyOfTrustAdmin = lazy(() => import("./LegacyOfTrustAdmin"));
const ContactLocationsAdmin = lazy(() => import("./ContactLocationsAdmin"));
const AdventureGalleryAdmin = lazy(() => import("./AdventureGalleryAdmin"));
const TryDiveFooterAdmin = lazy(() => import("./TryDiveFooterAdmin"));
const MediaManager = lazy(() => import("./MediaManager").then((m) => ({ default: m.MediaManager })));
// import EnvironmentSectionAdmin from "./EnvironmentSectionAdmin";
// SECTIONS REGISTRY
// Order preserved from the original pages[] (visual order of nav buttons).
// Names preserved exactly (including original spacing) to keep UI identical.
// Slugs drive URL routing; renaming a slug is a URL-breaking change.
type AdminSection = {
  slug: string;
  name: string;
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
};

const sections: AdminSection[] = [
  { slug: "hero-section", name: "Hero Section", Component: HeroSectionAdmin },
  { slug: "courses", name: "Courses", Component: CoursesPage },
  { slug: "featured", name: "Featured", Component: FeaturedAdmin },
  { slug: "gallery", name: "Gallery", Component: Gallery },
  { slug: "pricing", name: "Pricing", Component: PricingPage },
  { slug: "TrainingQuality", name: "TrainingQuality", Component: TrainingQuality },
  { slug: "why", name: "Why", Component: WhyAdmin },
  { slug: "faq", name: "FAQ", Component: FaqAdmin },
  { slug: "footer", name: "Footer", Component: FooterAdmin },
  { slug: "HeroAdmin-Open", name: "HeroAdminOpen", Component: HeroAdminOpen },
  { slug: "features", name: "Features", Component: FeaturesAdmin },
  { slug: "steps", name: "Steps", Component: StepsAdmin },
  { slug: "compare", name: "Compare", Component: CompareAdmin },
  { slug: "community-faq", name: "Community FAQ", Component: CommunityFAQSelectionAdmin },
  { slug: "why-choose", name: "Why Choose", Component: WhyChooseAdmin },
  { slug: "gold-standard", name: "Gold Standard", Component: GoldStandardAdmin },
  { slug: "location", name: "Location", Component: LocationAdmin },
  { slug: "foot", name: "Foot", Component: FootAdmin },
  { slug: "padi-open-diver", name: "PADI Open Diver", Component: PadiOpenDiverAdmin },
  { slug: "advanced-protocol", name: "Advanced Protocol", Component: AdvancedProtocolAdmin },
  { slug: "aow-advantage", name: "AOW Advantage", Component: AOWAdvantageAdmin },
  { slug: "global-passport", name: "Global Passport", Component: GlobalPassportAdmin },
  { slug: "choose-environment", name: "Choose Environment", Component: ChooseEnvironmentAdmin },
  { slug: "advanced-training-gold", name: " Advanced Training Gold Section", Component: AdvancedTrainingGoldAdmin },
  { slug: "mastery-gap", name: "Mastery Gap", Component: MasteryGapAdmin },
  { slug: "premium-footer", name: "Premium Footer", Component: PremiumFooterAdmin },
  { slug: "open-diver", name: "Open Diver", Component: OpenDiverAdmin },
  { slug: "hybrid-protocol", name: "Hybrid Protocol", Component: HybridProtocolAdmin },
  { slug: "elite-benefits", name: "Elite Benefits", Component: EliteBenefitsAdmin },
  { slug: "ocean-elite", name: " Ocean Elite", Component: OceanEliteAdmin },
  { slug: "dive-environment", name: "Dive Environment", Component: DiveEnvironmentAdmin },
  { slug: "advanced-training-gold-elite", name: "Advanced Training Gold EliteAdmin", Component: AdvancedTrainingGoldElitedAdmin },
  { slug: "training-comparison", name: " Training Comparison", Component: TrainingComparisonAdmin },
  { slug: "elite-footer", name: " Elite Footer", Component: EliteFooterAdmin },
  { slug: "divemaster-hero", name: " Divemaster Hero", Component: DivemasterHeroAdmin },
  { slug: "command-ocean", name: "Command Ocean", Component: CommandOceanAdmin },
  { slug: "comparison-dive", name: "Comparison Dive", Component: ComparisonDiveAdmin },
  { slug: "professional-status", name: "Professional Status", Component: ProfessionalStatusAdmin },
  { slug: "career-path", name: "Career Path", Component: CareerPathAdmin },
  { slug: "gold-standard-dive", name: "Gold Standard Dive", Component: GoldStandardDiveAdmin },
  { slug: "rescue-hero", name: "Rescue Hero", Component: RescueHeroAdmin },
  { slug: "rescue-capabilities", name: "Rescue Capabilities", Component: RescueCapabilitiesAdmin },
  { slug: "rescue-comparison", name: " Rescue Comparison", Component: RescueComparisonAdmin },
  { slug: "simulation-to-reality", name: "Simulation to Reality", Component: SimulationRealityAdmin },
  { slug: "master-scuba-cta", name: "Master Scuba CTA", Component: MasterScubaCTAAdmin },
  { slug: "rescue-faq", name: "Rescue FAQ Admin", Component: RescueFAQAdmin },
  { slug: "dive-training-showcase", name: "Dive TrainingShowcase Admin", Component: DiveTrainingShowcaseAdmin },
  { slug: "location-footer", name: "Location Footer Admin", Component: LocationFooterAdmin },
  { slug: "divetry", name: "Divetry Admin", Component: DivetryAdmin },
  { slug: "first-dive-steps", name: "First DiveSteps Admin", Component: FirstDiveStepsAdmin },
  { slug: "weekend-routine", name: "Weekend Routine Admin", Component: WeekendRoutineAdmin },
  { slug: "dive-confidence-faq", name: "Dive ConfidenceFAQ Admin", Component: DiveConfidenceFAQAdmin },
  { slug: "choose-dive-site", name: "Choose DiveSite Admin", Component: ChooseDiveSiteAdmin },
  { slug: "expert-hands", name: "ExpertHands Admin", Component: ExpertHandsAdmin },
  { slug: "legacy-of-trust", name: "LegacyOfTrustAdmin", Component: LegacyOfTrustAdmin },
  { slug: "contact-locations", name: "ContactLocationsAdmin", Component: ContactLocationsAdmin },
  { slug: "adventure-gallery", name: "Adventure Gallery Admin", Component: AdventureGalleryAdmin },
  { slug: "try-dive-footer", name: "TryDiveFooterAdmin", Component: TryDiveFooterAdmin },
  { slug: "media-manager", name: "Image Uploads & Url", Component: MediaManager },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Derive active section from URL (no local pagination state).
  const slugFromUrl = location.pathname.split("/").pop() || "";
  const matchedIndex = sections.findIndex((s) => s.slug === slugFromUrl);
  const currentIndex = matchedIndex >= 0 ? matchedIndex : 0;
  const currentSlug = sections[currentIndex].slug;

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

      setLoading(false);
    };

    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // Sections come from the module-scope `sections` registry above.
  // currentIndex / currentSlug are derived from the URL.

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen px-4 py-6">

      <div
        className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-10"
      >

        {/* LOGOUT */}
        <div className="flex justify-end">

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="h-[44px] px-5 rounded-2xl bg-red-500 text-white text-sm font-medium"
          >
            Logout
          </motion.button>

        </div>

        {/* PAGINATION BUTTONS */}
        <div
          className="flex flex-wrap gap-3 justify-center"
        >

          {sections.map((s, index) => (

            <button
              key={s.slug}
              onClick={() => navigate(`/admin/dashboard/${s.slug}`)}
              className={`
                px-4
                py-2
                rounded-xl
                text-sm
                transition-all
                border

                ${
                  currentIndex === index
                    ? "bg-cyan-400 text-black border-cyan-400"
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                }
              `}
            >
              {s.name}
            </button>

          ))}

        </div>

        {/* CURRENT COMPONENT */}
        <motion.div
          key={currentSlug}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <Suspense
            fallback={
              <div className="text-white/60 text-center py-8">Loading...</div>
            }
          >
            <Routes>
              <Route
                index
                element={<Navigate to={sections[0].slug} replace />}
              />
              {sections.map((s) => {
                const Section = s.Component;
                return (
                  <Route
                    key={s.slug}
                    path={s.slug}
                    element={<Section />}
                  />
                );
              })}
              <Route
                path="*"
                element={<Navigate to={sections[0].slug} replace />}
              />
            </Routes>
          </Suspense>
        </motion.div>

        {/* PREV NEXT */}
        <div className="flex items-center justify-between gap-4">

          <button
            disabled={currentIndex === 0}
            onClick={() =>
              navigate(`/admin/dashboard/${sections[currentIndex - 1].slug}`)
            }
            className="flex-1 h-[50px] rounded-2xl bg-white/10 disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={currentIndex === sections.length - 1}
            onClick={() =>
              navigate(`/admin/dashboard/${sections[currentIndex + 1].slug}`)
            }
            className="flex-1 h-[50px] rounded-2xl bg-cyan-400 text-black font-medium disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}
