// ==============================
// FILE: src/components/pages/BookingPage.tsx
// ==============================

"use client";

import { useNavigate, useSearchParams } from "react-router-dom";
import { getCourseBySlug } from "@/data/courseData";
import { BookingModal } from "../components/pages/BookingModal";

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const course = getCourseBySlug(searchParams.get("course"));

  return (
    <BookingModal
      isOpen={true}
      onClose={() => navigate(-1)}
      course={course}
    />
  );
}
