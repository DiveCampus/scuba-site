import { Routes, Route } from "react-router-dom";

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
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { AdvancedOpenWater } from "./components/pages/AdvancedOpenWater";
import { SpecialtyCourses } from "./components/pages/SpecialtyCourses";
import { PadIDivemasterHero } from "./components/pages/PadIDivemasterHero";
import { PadiOpenDiver } from "./components/pages/PadiOpenDiver";
import { HeroSection } from "./components/pages/HeroSection";
import { PadiRescueDiver } from "./components/pages/PadiRescueDiver";

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
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={isAdminAuth ? <AdminDashboard /> : <AdminLogin />}
      />
      <Route path="/advanced-open-water" element={<AdvancedOpenWater />} />
      <Route path="/specialty-courses" element={<SpecialtyCourses/>}/>
      <Route path="/padi-divemaster" element={<PadIDivemasterHero />} />
      <Route path="/padi-rescue-diver" element={<PadiRescueDiver />} />
      <Route path="/padi-open-water" element={<HeroSection />} /> 
      <Route path="/padi-open-diver" element={<PadiOpenDiver />} />

    </Routes>
  );
}