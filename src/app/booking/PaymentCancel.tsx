"use client";

import { Link, useSearchParams } from "react-router-dom";
import { getCourseBySlug } from "@/data/courseData";

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const course = getCourseBySlug(searchParams.get("course"));

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex items-center justify-center px-6 font-habara">
      <div className="max-w-xl text-center">
        <p className="text-cyan-300 tracking-[3px] text-xs uppercase mb-4">
          Payment cancelled
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          Checkout was not completed
        </h1>
        <p className="text-white/70 leading-relaxed mb-8">
          Your {course.title} booking has not been charged. You can return to
          checkout whenever you are ready.
        </p>
        <Link
          to={`/booking?course=${course.slug}`}
          className="inline-flex rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300"
        >
          Return to checkout
        </Link>
      </div>
    </div>
  );
}
