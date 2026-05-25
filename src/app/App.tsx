import { Routes, Route } from "react-router-dom";
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

function Home() {
  const isLoggedIn = localStorage.getItem("auth") === "true";

  if (!isLoggedIn) {
    return <Login onLogin={() => window.location.reload()} />;
  }

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

      </Routes>
    </Suspense>
  );
}
