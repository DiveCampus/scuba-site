import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DivingCourses } from './components/DivingCourses';
import { FeaturedExperiences } from './components/FeaturedExperiences';
import { Testimonials } from './components/Testimonials';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import Login from './components/Login';

import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('auth') === 'true'
  );

  const isAdminAuth = localStorage.getItem("adminAuth") === "true";

  // 🔥 ADMIN ROUTES
  if (location.pathname.startsWith("/admin")) {

    if (location.pathname === "/admin") {
      return <AdminLogin />;
    }

    if (location.pathname === "/admin/dashboard") {
      return isAdminAuth ? <AdminDashboard /> : <AdminLogin />;
    }

    return null;
  }

  // 🔥 USER ROUTES
  return (
    <>
      {isLoggedIn ? (
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
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}