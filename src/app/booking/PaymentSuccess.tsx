"use client";

import { Link, useSearchParams } from "react-router-dom";
import { getCourseBySlug } from "@/data/courseData";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const course = getCourseBySlug(searchParams.get("course"));

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex items-center justify-center px-6 font-habara">
      <div className="max-w-xl text-center">
        <p className="text-cyan-300 tracking-[3px] text-xs uppercase mb-4">
          Payment confirmed
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          Your booking is complete
        </h1>
        <p className="text-white/70 leading-relaxed mb-8">
          Thank you for booking {course.title}. Our team will contact you with the
          next steps shortly.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
