/**
 * Post-build prerender for the React+Vite SPA.
 *
 * Why this exists:
 *   Helmet only mutates the DOM after JS runs. curl / Googlebot's initial
 *   fetch sees the raw index.html, which is identical for every route. This
 *   script generates one physical <route>/index.html per route — the
 *   <head> is baked in at build time, so initial HTML is unique per URL.
 *
 * How it works:
 *   1. Reads dist/index.html (Vite's build output).
 *   2. For each registered route, replaces the block between
 *      <!--prerender:seo:start--> and <!--prerender:seo:end-->.
 *   3. Injects per-route JSON-LD between
 *      <!--prerender:jsonld:start--> and <!--prerender:jsonld:end-->.
 *   4. Writes dist/<route>/index.html. Netlify's static-file-first behavior
 *      serves the prerendered file directly; the SPA fallback only kicks in
 *      for unknown routes.
 *
 * Source of truth for per-route SEO is duplicated here from
 * src/app/components/seoConfig.ts because that file is TypeScript and Vite-
 * compiled. Keep both in sync.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "..", "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

const SITE_URL = "https://uaedive.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/A59I0374.webp`;

/* ────────────────────────── ROUTE → SEO DATA ──────────────────────────
   Mirror of src/app/components/seoConfig.ts. Keep in sync.
   The first route ('/') overwrites dist/index.html in place.
   ──────────────────────────────────────────────────────────────────── */

const breadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

const courseSchema = (params) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: params.name,
  description: params.description,
  url: params.url,
  image: params.image || DEFAULT_OG_IMAGE,
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

const routes = [
  {
    path: "/",
    title: "PADI Scuba Diving Dubai | Open Water, Rescue & Divemaster Courses",
    description:
      "Learn scuba diving in Dubai with PADI-certified instructors at UAE Dive. Open Water, Advanced, Rescue Diver and Divemaster courses from AED 350.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [breadcrumb([{ name: "Home", url: `${SITE_URL}/` }])],
  },

  {
    path: "/about",
    title: "About UAE Dive | PADI 5★ Dive Centre Dubai & Fujairah",
    description:
      "Meet the UAE Dive team — PADI-certified instructors and divemasters running premium scuba training in Dubai (Palm Jumeirah) and Fujairah (Dibba).",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "About", url: `${SITE_URL}/about` },
      ]),
    ],
  },

  {
    path: "/try-dive",
    title: "Try Scuba Diving Dubai | Discover Scuba Diving Experience UAE",
    description:
      "Try scuba diving in Dubai for the first time. A guided beginner-friendly Discover Scuba Diving experience with PADI instructors. From AED 350.",
    ogImage: `${SITE_URL}/img3.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Try Dive", url: `${SITE_URL}/try-dive` },
      ]),
      courseSchema({
        name: "Try Dive / Discover Scuba Diving Dubai",
        description:
          "Beginner first-time scuba experience in Dubai with PADI instructors.",
        url: `${SITE_URL}/try-dive`,
        price: 350,
        image: `${SITE_URL}/img3.webp`,
      }),
    ],
  },

  {
    path: "/padi-open-water",
    title: "PADI Open Water Diver Course Dubai | Get Scuba Certified",
    description:
      "Get your PADI Open Water Diver certification in Dubai. eLearning, pool sessions and open-water dives with world-class PADI instructors at UAE Dive.",
    ogImage: `${SITE_URL}/A59I9590.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Open Water", url: `${SITE_URL}/padi-open-water` },
      ]),
      courseSchema({
        name: "PADI Open Water Diver Course Dubai",
        description:
          "Internationally recognised PADI Open Water Diver certification course in Dubai.",
        url: `${SITE_URL}/padi-open-water`,
        price: 2200,
        image: `${SITE_URL}/A59I9590.webp`,
      }),
    ],
  },

  {
    path: "/padi-scuba-diver",
    title: "PADI Scuba Diver Course Dubai | Entry-Level Certification",
    description:
      "PADI Scuba Diver course in Dubai — a shorter entry-level scuba certification. Perfect for those with limited time. Backed by UAE Dive's PADI instructors.",
    ogImage: `${SITE_URL}/pool.avif`,
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

  {
    path: "/advanced-open-water",
    title: "PADI Advanced Open Water Diver Course Dubai | UAE Dive",
    description:
      "Advance your scuba skills with the PADI Advanced Open Water Diver course in Dubai. Five adventure dives, deep diving and navigation. Book with UAE Dive.",
    ogImage: `${SITE_URL}/A59I0450.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Advanced Open Water", url: `${SITE_URL}/advanced-open-water` },
      ]),
      courseSchema({
        name: "PADI Advanced Open Water Diver Course Dubai",
        description:
          "Level-up your dive skills with the PADI AOW certification in Dubai.",
        url: `${SITE_URL}/advanced-open-water`,
        price: 1300,
        image: `${SITE_URL}/A59I0450.webp`,
      }),
    ],
  },

  {
    path: "/padi-rescue-diver",
    title: "PADI Rescue Diver Course Dubai | Lifesaving Scuba Training",
    description:
      "Become a PADI Rescue Diver in Dubai. Real scenario-based rescue training, problem-solving and emergency response. Taught by UAE Dive's PADI instructors.",
    ogImage: `${SITE_URL}/A59I0374.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Rescue Diver", url: `${SITE_URL}/padi-rescue-diver` },
      ]),
      courseSchema({
        name: "PADI Rescue Diver Course Dubai",
        description:
          "Lifesaving rescue diver training and emergency-response scuba certification in Dubai.",
        url: `${SITE_URL}/padi-rescue-diver`,
        price: 1800,
        image: `${SITE_URL}/A59I0374.webp`,
      }),
    ],
  },

  {
    path: "/padi-divemaster",
    title: "PADI Divemaster Course Dubai | Go Pro With UAE Dive",
    description:
      "Start your scuba career with the PADI Divemaster course in Dubai. Professional-level dive training, leadership skills and career path support at UAE Dive.",
    ogImage: `${SITE_URL}/A59I9631.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Divemaster", url: `${SITE_URL}/padi-divemaster` },
      ]),
      courseSchema({
        name: "PADI Divemaster Course Dubai",
        description:
          "Become a PADI Divemaster in Dubai — the first PADI professional rating.",
        url: `${SITE_URL}/padi-divemaster`,
        price: 2200,
        image: `${SITE_URL}/A59I9631.webp`,
      }),
    ],
  },

  {
    path: "/specialty-courses",
    title: "PADI Specialty Diving Courses Dubai | Wreck, Night, Deep, Photo",
    description:
      "Expand your diving with PADI specialty courses in Dubai — wreck, deep, night, underwater photography and more. Flexible scheduling at UAE Dive.",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Specialty Courses", url: `${SITE_URL}/specialty-courses` },
      ]),
    ],
  },

  /* ─────── LOCAL SEO LANDING PAGES ─────── */
  {
    path: "/scuba-diving-dubai",
    title: "Scuba Diving Dubai | PADI Dive Center, Courses & Trips | UAE Dive",
    description:
      "The complete guide to scuba diving in Dubai. PADI courses from Try Dive to Divemaster, Palm Jumeirah training and East Coast dive trips with UAE Dive.",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Scuba Diving Dubai", url: `${SITE_URL}/scuba-diving-dubai` },
      ]),
    ],
  },
  {
    path: "/palm-jumeirah-diving",
    title: "Palm Jumeirah Diving | Scuba Dive Center Dubai | UAE Dive",
    description:
      "Scuba diving on Palm Jumeirah, Dubai. PADI courses, pool sessions and dive briefings from our Azure Residences dive base. Book online with UAE Dive.",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Palm Jumeirah Diving", url: `${SITE_URL}/palm-jumeirah-diving` },
      ]),
    ],
  },
  {
    path: "/fujairah-scuba-diving",
    title: "Fujairah Scuba Diving | East Coast UAE Dives | Dibba & Khor Fakkan",
    description:
      "Scuba diving on the UAE East Coast — Fujairah, Dibba and Khor Fakkan. Boat dives, reef dives and PADI courses with UAE Dive.",
    ogImage: `${SITE_URL}/Khorfakkan.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Fujairah Scuba Diving", url: `${SITE_URL}/fujairah-scuba-diving` },
      ]),
    ],
  },
  {
    path: "/padi-course-dubai",
    title: "PADI Courses Dubai | Open Water, Advanced, Rescue & Divemaster",
    description:
      "All PADI courses in Dubai under one roof — Open Water, Advanced Open Water, Rescue Diver and Divemaster. Internationally recognised certification with UAE Dive.",
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "PADI Courses Dubai", url: `${SITE_URL}/padi-course-dubai` },
      ]),
    ],
  },
  {
    path: "/try-scuba-diving-dubai",
    title: "Try Scuba Diving in Dubai | First-Time Discover Scuba Experience",
    description:
      "First-time scuba diving in Dubai. A safe, guided Try Scuba experience with PADI instructors — no certification required. From AED 350 with UAE Dive.",
    ogImage: `${SITE_URL}/img3.webp`,
    jsonLd: [
      breadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Try Scuba Diving Dubai", url: `${SITE_URL}/try-scuba-diving-dubai` },
      ]),
    ],
  },
];

/* ────────────────────────── HELPERS ────────────────────────── */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSeoBlock(route) {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;
  const robots = route.noindex ? "noindex, nofollow" : "index, follow";

  const t = escapeHtml(route.title);
  const d = escapeHtml(route.description || "");
  const c = escapeHtml(canonical);
  const img = escapeHtml(ogImage);

  return [
    `  <title>${t}</title>`,
    `  <meta name="description" content="${d}" />`,
    `  <meta name="robots" content="${robots}" />`,
    `  <link rel="canonical" href="${c}" />`,
    `  <meta property="og:title" content="${t}" />`,
    `  <meta property="og:description" content="${d}" />`,
    `  <meta property="og:image" content="${img}" />`,
    `  <meta property="og:url" content="${c}" />`,
    `  <meta name="twitter:title" content="${t}" />`,
    `  <meta name="twitter:description" content="${d}" />`,
    `  <meta name="twitter:image" content="${img}" />`,
  ].join("\n");
}

function buildJsonLdBlock(route) {
  if (!route.jsonLd || route.jsonLd.length === 0) return "";
  return route.jsonLd
    .map(
      (obj) =>
        `\n  <script type="application/ld+json">${JSON.stringify(obj)}</script>`,
    )
    .join("");
}

function substituteMarkers(template, route) {
  const seoBlock = buildSeoBlock(route);
  const jsonLdBlock = buildJsonLdBlock(route);

  let html = template.replace(
    /<!--prerender:seo:start-->[\s\S]*?<!--prerender:seo:end-->/,
    `<!--prerender:seo:start-->\n${seoBlock}\n  <!--prerender:seo:end-->`,
  );

  html = html.replace(
    /<!--prerender:jsonld:start-->[\s\S]*?<!--prerender:jsonld:end-->/,
    `<!--prerender:jsonld:start-->${jsonLdBlock}\n  <!--prerender:jsonld:end-->`,
  );

  return html;
}

/* ────────────────────────── MAIN ────────────────────────── */

function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`[prerender] dist/index.html not found at ${TEMPLATE_PATH}`);
    console.error(`[prerender] run \`vite build\` first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  if (!template.includes("<!--prerender:seo:start-->")) {
    console.error(
      "[prerender] marker <!--prerender:seo:start--> missing from dist/index.html.",
    );
    console.error("[prerender] check that index.html has the prerender markers.");
    process.exit(1);
  }

  let count = 0;
  for (const route of routes) {
    const html = substituteMarkers(template, route);

    const outPath =
      route.path === "/"
        ? path.join(DIST_DIR, "index.html")
        : path.join(DIST_DIR, route.path.replace(/^\//, ""), "index.html");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, "utf-8");
    console.log(`[prerender] ✓ ${route.path.padEnd(28)} → ${path.relative(process.cwd(), outPath)}`);
    count++;
  }

  console.log(`\n[prerender] done. ${count} routes prerendered.`);
}

main();
