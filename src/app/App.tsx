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
import { PadiRescueDiver } from "./components/pages/PadiRescueDiver";
import { PadiOpenWater } from "./components/pages/PadiOpenWater";
import DivemasterPage from "./divemaster/PadIDivemaster";
import AboutDive from "./About/AboutDive";
import { AdvancedPadiOpenDiver, AdvnacedOpenDiver } from "./components/pages/AdvancedPadiOpenDiver";

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
      <Route path="/padi-divemaster" element={<DivemasterPage />} />
      <Route path="/padi-rescue-diver" element={<PadiRescueDiver />} />
      <Route path="/padi-open-water" element={<PadiOpenWater />} /> 
      <Route path="/padi-open-diver" element={<AdvancedPadiOpenDiver />} />
      <Route path="/about" element={<AboutDive />} />

    </Routes>
  );
}