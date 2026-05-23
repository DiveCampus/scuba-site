export type CourseSlug =
  | "open-diver"
  | "try-dive"
  | "advanced-open-water"
  | "padi-open-water"
  | "padi-scuba-diver"
  | "padi-rescue-diver"
  | "padi-divemaster";

export type CourseData = {
  slug: CourseSlug;
  title: string;
  description: string;
  details: string;
  image: string;
  price: number;
  currency: "AED";
  stripeMetadata: {
    courseId: CourseSlug;
    courseType: string;
  };
};

export const COURSE_DATA: Record<CourseSlug, CourseData> = {
  "open-diver": {
    slug: "open-diver",
    title: "PADI Open Diver Course",
    description: "Beginner certification course with pool and open-water training.",
    details: "Open Diver Course | Flexible schedule with pro-grade scuba equipment",
    image: "/img3.webp",
    price: 2200,
    currency: "AED",
    stripeMetadata: {
      courseId: "open-diver",
      courseType: "certification",
    },
  },
  "try-dive": {
    slug: "try-dive",
    title: "Try Dive Experience",
    description: "First-time scuba experience for complete beginners.",
    details: "Try Dive | Beginner friendly beach scuba experience",
    image: "/img3.webp",
    price: 350,
    currency: "AED",
    stripeMetadata: {
      courseId: "try-dive",
      courseType: "experience",
    },
  },
  "advanced-open-water": {
    slug: "advanced-open-water",
    title: "Advanced Open Water Course",
    description: "Level up your dive skills with advanced open-water training.",
    details: "Advanced Open Water | Specialty dives and confidence training",
    image: "/A59I0450.webp",
    price: 1300,
    currency: "AED",
    stripeMetadata: {
      courseId: "advanced-open-water",
      courseType: "certification",
    },
  },
  "padi-open-water": {
    slug: "padi-open-water",
    title: "PADI Open Water Course",
    description: "Worldwide-recognized PADI certification for new divers.",
    details: "PADI Open Water | eLearning, pool, and ocean sessions",
    image: "/A59I9590.webp",
    price: 2200,
    currency: "AED",
    stripeMetadata: {
      courseId: "padi-open-water",
      courseType: "certification",
    },
  },
  "padi-scuba-diver": {
    slug: "padi-scuba-diver",
    title: "PADI Scuba Diver Course",
    description: "Entry-level PADI scuba certification with guided training.",
    details: "PADI Scuba Diver | Flexible training with instructor support",
    image: "/pool.avif",
    price: 1200,
    currency: "AED",
    stripeMetadata: {
      courseId: "padi-scuba-diver",
      courseType: "certification",
    },
  },
  "padi-rescue-diver": {
    slug: "padi-rescue-diver",
    title: "PADI Rescue Diver Course",
    description: "Build rescue awareness, problem-solving, and confidence underwater.",
    details: "PADI Rescue Diver | Emergency skills and scenario training",
    image: "/A59I0374.webp",
    price: 1800,
    currency: "AED",
    stripeMetadata: {
      courseId: "padi-rescue-diver",
      courseType: "certification",
    },
  },
  "padi-divemaster": {
    slug: "padi-divemaster",
    title: "PADI Divemaster Course",
    description: "Professional-level training for divers ready to lead.",
    details: "Divemaster Course | Flexible schedule without PADI Crewpack and eLearning",
    image: "/course.webp",
    price: 2200,
    currency: "AED",
    stripeMetadata: {
      courseId: "padi-divemaster",
      courseType: "professional",
    },
  },
};

export const DEFAULT_COURSE_SLUG: CourseSlug = "open-diver";

export function getCourseBySlug(slug: string | null): CourseData {
  if (slug && slug in COURSE_DATA) {
    return COURSE_DATA[slug as CourseSlug];
  }

  return COURSE_DATA[DEFAULT_COURSE_SLUG];
}

export function formatCoursePrice(amount: number) {
  return `AED ${amount.toLocaleString("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
