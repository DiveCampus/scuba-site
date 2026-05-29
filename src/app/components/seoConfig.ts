import type { SEOProps } from "./SEO";

const SITE_URL = "https://uaedive.com";

const breadcrumb = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

const courseSchema = (params: {
  name: string;
  description: string;
  url: string;
  price?: number;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: params.name,
  description: params.description,
  url: params.url,
  image: params.image || `${SITE_URL}/A59I0374.webp`,
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "UAE Dive",
    sameAs: SITE_URL,
  },
  ...(params.price && {
    offers: {
      "@type": "Offer",
      price: params.price,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: params.url,
    },
  }),
  inLanguage: "en-AE",
  isAccessibleForFree: false,
});

export const seoConfig: Record<string, SEOProps> = {
  "/": {
    title: "PADI Scuba Diving Dubai | Open Water, Rescue & Divemaster Courses",
    description:
      "Learn scuba diving in Dubai with PADI-certified instructors at UAE Dive. Open Water, Advanced, Rescue Diver and Divemaster courses from AED 350.",
    canonical: "/",
    jsonLd: breadcrumb([{ name: "Home", url: `${SITE_URL}/` }]),
  },

  "/about": {
    title: "About UAE Dive | PADI 5★ Dive Centre Dubai & Fujairah",
    description:
      "Meet the UAE Dive team — PADI-certified instructors and divemasters running premium scuba training in Dubai (Palm Jumeirah) and Fujairah (Dibba).",
    canonical: "/about",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "About", url: `${SITE_URL}/about` },
    ]),
  },

  "/try-dive": {
    title: "Try Scuba Diving Dubai | Discover Scuba Diving Experience UAE",
    description:
      "Try scuba diving in Dubai for the first time. A guided beginner-friendly Discover Scuba Diving experience with PADI instructors. From AED 350.",
    canonical: "/try-dive",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Try Dive", url: `${SITE_URL}/try-dive` },
      ]),
      courseSchema({
        name: "Try Dive / Discover Scuba Diving Dubai",
        description: "Beginner first-time scuba experience in Dubai with PADI instructors.",
        url: `${SITE_URL}/try-dive`,
        price: 350,
        image: `${SITE_URL}/img3.webp`,
      }),
    ],
  },

  "/padi-open-water": {
    title: "PADI Open Water Diver Course Dubai | Get Scuba Certified",
    description:
      "Get your PADI Open Water Diver certification in Dubai. eLearning, pool sessions and open-water dives with world-class PADI instructors at UAE Dive.",
    canonical: "/padi-open-water",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Open Water", url: `${SITE_URL}/padi-open-water` },
      ]),
      courseSchema({
        name: "PADI Open Water Diver Course Dubai",
        description: "Internationally recognised PADI Open Water Diver certification course in Dubai.",
        url: `${SITE_URL}/padi-open-water`,
        price: 2200,
        image: `${SITE_URL}/A59I9590.webp`,
      }),
    ],
  },

  "/padi-scuba-diver": {
    title: "PADI Scuba Diver Course Dubai | Entry-Level Certification",
    description:
      "PADI Scuba Diver course in Dubai — a shorter entry-level scuba certification. Perfect for those with limited time. Backed by UAE Dive's PADI instructors.",
    canonical: "/padi-scuba-diver",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Scuba Diver", url: `${SITE_URL}/padi-scuba-diver` },
      ]),
      courseSchema({
        name: "PADI Scuba Diver Course Dubai",
        description: "Entry-level PADI Scuba Diver certification course in Dubai.",
        url: `${SITE_URL}/padi-scuba-diver`,
        price: 1200,
        image: `${SITE_URL}/pool.avif`,
      }),
    ],
  },

  "/advanced-open-water": {
    title: "PADI Advanced Open Water Diver Course Dubai | UAE Dive",
    description:
      "Advance your scuba skills with the PADI Advanced Open Water Diver course in Dubai. Five adventure dives, deep diving and navigation. Book with UAE Dive.",
    canonical: "/advanced-open-water",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Advanced Open Water", url: `${SITE_URL}/advanced-open-water` },
      ]),
      courseSchema({
        name: "PADI Advanced Open Water Diver Course Dubai",
        description: "Level-up your dive skills with the PADI AOW certification in Dubai.",
        url: `${SITE_URL}/advanced-open-water`,
        price: 1300,
        image: `${SITE_URL}/A59I0450.webp`,
      }),
    ],
  },

  "/padi-rescue-diver": {
    title: "PADI Rescue Diver Course Dubai | Lifesaving Scuba Training",
    description:
      "Become a PADI Rescue Diver in Dubai. Real scenario-based rescue training, problem-solving and emergency response. Taught by UAE Dive's PADI instructors.",
    canonical: "/padi-rescue-diver",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Rescue Diver", url: `${SITE_URL}/padi-rescue-diver` },
      ]),
      courseSchema({
        name: "PADI Rescue Diver Course Dubai",
        description: "Lifesaving rescue diver training and emergency-response scuba certification in Dubai.",
        url: `${SITE_URL}/padi-rescue-diver`,
        price: 1800,
        image: `${SITE_URL}/A59I0374.webp`,
      }),
    ],
  },

  "/padi-divemaster": {
    title: "PADI Divemaster Course Dubai | Go Pro With UAE Dive",
    description:
      "Start your scuba career with the PADI Divemaster course in Dubai. Professional-level dive training, leadership skills and career path support at UAE Dive.",
    canonical: "/padi-divemaster",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Divemaster", url: `${SITE_URL}/padi-divemaster` },
      ]),
      courseSchema({
        name: "PADI Divemaster Course Dubai",
        description: "Become a PADI Divemaster in Dubai — the first PADI professional rating.",
        url: `${SITE_URL}/padi-divemaster`,
        price: 2200,
        image: `${SITE_URL}/A59I9631.webp`,
      }),
    ],
  },

  "/specialty-courses": {
    title: "PADI Specialty Diving Courses Dubai | Wreck, Night, Deep, Photo",
    description:
      "Expand your diving with PADI specialty courses in Dubai — wreck, deep, night, underwater photography and more. Flexible scheduling at UAE Dive.",
    canonical: "/specialty-courses",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Specialty Courses", url: `${SITE_URL}/specialty-courses` },
    ]),
  },

  /* ===== LOCAL SEO LANDING PAGES ===== */

  "/scuba-diving-dubai": {
    title: "Scuba Diving Dubai | PADI Dive Center, Courses & Trips | UAE Dive",
    description:
      "The complete guide to scuba diving in Dubai. PADI courses from Try Dive to Divemaster, Palm Jumeirah training and East Coast dive trips with UAE Dive.",
    canonical: "/scuba-diving-dubai",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Scuba Diving Dubai", url: `${SITE_URL}/scuba-diving-dubai` },
    ]),
  },

  "/palm-jumeirah-diving": {
    title: "Palm Jumeirah Diving | Scuba Dive Center Dubai | UAE Dive",
    description:
      "Scuba diving on Palm Jumeirah, Dubai. PADI courses, pool sessions and dive briefings from our Azure Residences dive base. Book online with UAE Dive.",
    canonical: "/palm-jumeirah-diving",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Palm Jumeirah Diving", url: `${SITE_URL}/palm-jumeirah-diving` },
    ]),
  },

  "/fujairah-scuba-diving": {
    title: "Fujairah Scuba Diving | East Coast UAE Dives | Dibba & Khor Fakkan",
    description:
      "Scuba diving on the UAE East Coast — Fujairah, Dibba and Khor Fakkan. Boat dives, reef dives and PADI courses with UAE Dive.",
    canonical: "/fujairah-scuba-diving",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Fujairah Scuba Diving", url: `${SITE_URL}/fujairah-scuba-diving` },
    ]),
  },

  "/padi-course-dubai": {
    title: "PADI Courses Dubai | Open Water, Advanced, Rescue & Divemaster",
    description:
      "All PADI courses in Dubai under one roof — Open Water, Advanced Open Water, Rescue Diver and Divemaster. Internationally recognised certification with UAE Dive.",
    canonical: "/padi-course-dubai",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "PADI Courses Dubai", url: `${SITE_URL}/padi-course-dubai` },
    ]),
  },

  "/try-scuba-diving-dubai": {
    title: "Try Scuba Diving in Dubai | First-Time Discover Scuba Experience",
    description:
      "First-time scuba diving in Dubai. A safe, guided Try Scuba experience with PADI instructors — no certification required. From AED 350 with UAE Dive.",
    canonical: "/try-scuba-diving-dubai",
    jsonLd: breadcrumb([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Try Scuba Diving Dubai", url: `${SITE_URL}/try-scuba-diving-dubai` },
    ]),
  },

  /* ===== TRANSACTIONAL / PRIVATE ===== */

  "/booking": {
    title: "Book Your Scuba Dive | UAE Dive",
    description: "Complete your scuba diving booking with UAE Dive.",
    canonical: "/booking",
    noindex: true,
  },

  "/open-diver/booking": {
    title: "Book Your Scuba Dive | UAE Dive",
    description: "Complete your scuba diving booking with UAE Dive.",
    canonical: "/booking",
    noindex: true,
  },

  "/payment-success": {
    title: "Payment Successful | UAE Dive",
    description: "Your scuba diving booking is confirmed.",
    canonical: "/payment-success",
    noindex: true,
  },

  "/payment-cancel": {
    title: "Payment Cancelled | UAE Dive",
    description: "Your scuba diving booking was not completed.",
    canonical: "/payment-cancel",
    noindex: true,
  },

  "/admin": {
    title: "Admin | UAE Dive",
    canonical: "/admin",
    noindex: true,
  },

  __default: {
    title: "PADI Scuba Diving Dubai | UAE Dive",
    description: "PADI scuba diving courses in Dubai and the UAE with UAE Dive.",
    canonical: "/",
  } as SEOProps,

  // Unknown / unmatched routes (404). Must NOT be indexed.
  __notFound: {
    title: "Page Not Found | UAE Dive",
    description: "The page you are looking for could not be found.",
    canonical: "/",
    noindex: true,
  } as SEOProps,
};

export function getRouteSeo(pathname: string): SEOProps {
  if (seoConfig[pathname]) return seoConfig[pathname];

  // Admin sub-routes all noindex
  if (pathname.startsWith("/admin")) return seoConfig["/admin"];

  // Any other unmatched path is a 404 → noindex (prevents soft-404 indexing).
  return seoConfig.__notFound;
}
