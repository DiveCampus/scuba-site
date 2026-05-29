import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DivingCourses } from "./components/DivingCourses";
import { FeaturedExperiences } from "./components/FeaturedExperiences";
import { Testimonials } from "./components/Testimonials";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Gallery } from "./components/Gallery";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { BookingForm } from "./components/BookingForm";
import { Footer } from "./components/Footer";

import Login from "./components/Login";

import { SEO } from "./components/SEO";
import { getRouteSeo } from "./components/seoConfig";

// Non-Home routes are code-split. They load on navigation, not on first paint.
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AdvancedOpenWater = lazy(() =>
  import("./components/pages/AdvancedOpenWater").then((m) => ({ default: m.AdvancedOpenWater }))
);
const SpecialtyCourses = lazy(() =>
  import("./components/pages/SpecialtyCourses").then((m) => ({ default: m.SpecialtyCourses }))
);
const PadiRescueDiver = lazy(() =>
  import("./components/pages/PadiRescueDiver").then((m) => ({ default: m.PadiRescueDiver }))
);
const PadiOpenWater = lazy(() =>
  import("./components/pages/PadiOpenWater").then((m) => ({ default: m.PadiOpenWater }))
);
const DivemasterPage = lazy(() => import("./divemaster/PadIDivemaster"));
const AboutDive = lazy(() => import("./About/AboutDive"));
const AdvancedPadiOpenDiver = lazy(() =>
  import("./components/pages/AdvancedPadiOpenDiver").then((m) => ({ default: m.AdvancedPadiOpenDiver }))
);
const TryDive = lazy(() =>
  import("./TryDive/TryDive").then((m) => ({ default: m.TryDive }))
);
const BookingPage = lazy(() => import("./booking/BookingPage"));
const PaymentSuccess = lazy(() => import("./booking/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./booking/PaymentCancel"));

/**
 * Reads current pathname and injects per-route Helmet metadata.
 * Renders nothing visible. Does not change UI/UX/auth.
 */
function RouteSeo() {
  const { pathname } = useLocation();
  const meta = getRouteSeo(pathname);
  return <SEO {...meta} />;
}

function Home() {
  // ────────────────────────────────────────────────────────────────
  // TEMPORARILY DISABLED FOR SEO INDEXING
  // Restore before private launch if needed.
  //
  // This "Launching Soon" login gate hid the public homepage (and the
  // /scuba-diving-dubai, /palm-jumeirah-diving, /fujairah-scuba-diving
  // landing routes that reuse <Home/>) from both visitors and Googlebot.
  // Commented out so crawlers + users see the real public marketing page.
  // NOTE: this gate uses the "auth" key only — admin uses "adminAuth"
  // (see <App/> below) and is intentionally LEFT FULLY PROTECTED.
  //
  // To restore: uncomment the three lines below.
  //
  // const isLoggedIn = localStorage.getItem("auth") === "true";
  // if (!isLoggedIn) {
  //   return <Login onLogin={() => window.location.reload()} />;
  // }
  // ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      <Hero />
      <DivingCourses />
      <FeaturedExperiences />
      <Testimonials />
      <BookingForm />
      <WhyChooseUs />
      <Gallery />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default function App() {
  const isAdminAuth = localStorage.getItem("adminAuth") === "true";

  return (
    <>
      <RouteSeo />
      <Suspense fallback={null}>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard/*"
            element={isAdminAuth ? <AdminDashboard /> : <AdminLogin />}
          />
          <Route path="/advanced-open-water" element={<AdvancedOpenWater />} />
          <Route path="/try-dive" element={<TryDive />} />
          <Route path="/specialty-courses" element={<SpecialtyCourses/>}/>
          <Route path="/padi-divemaster" element={<DivemasterPage />} />
          <Route path="/padi-rescue-diver" element={<PadiRescueDiver />} />
          <Route path="/padi-scuba-diver" element={<AdvancedPadiOpenDiver />} />
          <Route path="/padi-open-water" element={<PadiOpenWater />} />
          <Route path="/about" element={<AboutDive />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/open-diver/booking" element={<BookingPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />

          {/* LOCAL SEO LANDING PAGES — reuse existing components, unique <head> metadata only */}
          <Route path="/scuba-diving-dubai" element={<Home />} />
          <Route path="/palm-jumeirah-diving" element={<Home />} />
          <Route path="/fujairah-scuba-diving" element={<Home />} />
          <Route path="/padi-course-dubai" element={<PadiOpenWater />} />
          <Route path="/try-scuba-diving-dubai" element={<TryDive />} />

        </Routes>
      </Suspense>
    </>
  );
}
