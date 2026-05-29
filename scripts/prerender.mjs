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

/* ──────────────── SEO BODY CONTENT (crawlable, sr-only) ────────────────
   Injected into the .sr-only <aside> sibling of #root (see index.html).
   Purpose: give crawlers unique body text + real internal <a> links on the
   first HTML fetch — the SPA navbar uses onClick buttons (not crawlable) and
   the visible body is JS/Supabase-rendered. Visually hidden → no UX change.
   Keep copy factual and concise; no keyword stuffing.
   ──────────────────────────────────────────────────────────────────── */

const LINK_TEXT = {
  "/": "Scuba Diving Dubai",
  "/try-dive": "Try Scuba Diving in Dubai (Discover Scuba)",
  "/padi-open-water": "PADI Open Water Diver Course Dubai",
  "/padi-scuba-diver": "PADI Scuba Diver Course Dubai",
  "/advanced-open-water": "PADI Advanced Open Water Course Dubai",
  "/padi-rescue-diver": "PADI Rescue Diver Course Dubai",
  "/padi-divemaster": "PADI Divemaster Course Dubai",
  "/specialty-courses": "PADI Specialty Courses Dubai",
  "/scuba-diving-dubai": "Scuba Diving in Dubai",
  "/palm-jumeirah-diving": "Palm Jumeirah Diving",
  "/fujairah-scuba-diving": "Fujairah Scuba Diving",
  "/padi-course-dubai": "PADI Courses Dubai",
  "/about": "About UAE Dive",
};

// Per-route: short factual intro + contextual related internal links.
const CONTENT = {
  "/": {
    h: "Scuba Diving in Dubai with UAE Dive",
    p: "UAE Dive is a PADI dive centre based at Palm Jumeirah, Dubai, with East Coast trips in Fujairah. We run the full PADI pathway — from a first-time Try Dive through Open Water, Advanced, Rescue Diver and the professional Divemaster rating.",
    related: ["/try-dive", "/padi-open-water", "/padi-rescue-diver", "/padi-divemaster", "/scuba-diving-dubai", "/fujairah-scuba-diving"],
  },
  "/try-dive": {
    h: "Try Scuba Diving in Dubai — Discover Scuba",
    p: "A guided, beginner-friendly first scuba experience in Dubai with PADI instructors. No certification or prior experience needed. Most divers continue with the Open Water Diver course after their Try Dive.",
    related: ["/padi-open-water", "/padi-scuba-diver", "/scuba-diving-dubai"],
  },
  "/padi-open-water": {
    h: "PADI Open Water Diver Course in Dubai",
    p: "Your first full scuba certification — eLearning, confined-water pool sessions and open-water dives. Once certified you can continue to Advanced Open Water, then Rescue Diver and Divemaster.",
    related: ["/try-dive", "/advanced-open-water", "/padi-rescue-diver", "/padi-divemaster"],
  },
  "/padi-scuba-diver": {
    h: "PADI Scuba Diver Course in Dubai",
    p: "A shorter entry-level certification for those with limited time. It is a recognised step toward the full Open Water Diver certification and the courses beyond it.",
    related: ["/padi-open-water", "/advanced-open-water"],
  },
  "/advanced-open-water": {
    h: "PADI Advanced Open Water Course in Dubai",
    p: "Five adventure dives including deep and navigation, building on the Open Water Diver certification. Advanced Open Water is the prerequisite for the Rescue Diver course.",
    related: ["/padi-open-water", "/padi-rescue-diver", "/specialty-courses"],
  },
  "/padi-rescue-diver": {
    h: "PADI Rescue Diver Course in Dubai",
    p: "Scenario-based rescue and emergency-response training. Rescue Diver follows Advanced Open Water and is the gateway to the professional Divemaster rating.",
    related: ["/advanced-open-water", "/padi-divemaster"],
  },
  "/padi-divemaster": {
    h: "PADI Divemaster Course in Dubai",
    p: "The first PADI professional rating — lead and assist divers, with an internship at UAE Dive. Rescue Diver is the prerequisite for becoming a Divemaster.",
    related: ["/padi-rescue-diver", "/advanced-open-water", "/specialty-courses"],
  },
  "/specialty-courses": {
    h: "PADI Specialty Courses in Dubai",
    p: "Focused courses such as Deep, Wreck, Night and Underwater Photography. Specialties count toward the Master Scuba Diver rating and complement Advanced and Divemaster training.",
    related: ["/advanced-open-water", "/padi-divemaster"],
  },
  "/scuba-diving-dubai": {
    h: "Scuba Diving in Dubai — Courses & Dive Trips",
    p: "A complete guide to scuba diving in Dubai with UAE Dive: PADI courses from Try Dive to Divemaster, Palm Jumeirah pool and training sessions, and East Coast dive trips in Fujairah.",
    extra: [
      "Dubai offers warm water year-round, with confined-water training run from our Palm Jumeirah base and open-water dives along the Dubai coast and the UAE East Coast. Conditions suit complete beginners and certified divers building experience alike.",
      "Whether you want a one-off Discover Scuba session or a full certification pathway, every programme is led by PADI-certified instructors and follows international training standards.",
    ],
    list: [
      "Beginner-friendly Try Dive — no certification needed",
      "PADI Open Water, Advanced, Rescue Diver and Divemaster certification",
      "Palm Jumeirah pool and training base in Dubai",
      "East Coast boat and reef dive trips in Fujairah",
    ],
    related: ["/try-dive", "/padi-open-water", "/padi-rescue-diver", "/padi-divemaster", "/palm-jumeirah-diving", "/fujairah-scuba-diving", "/padi-course-dubai"],
  },
  "/palm-jumeirah-diving": {
    h: "Diving on Palm Jumeirah, Dubai",
    p: "UAE Dive's Dubai base is at Azure Residences on Palm Jumeirah, where we run pool sessions, course briefings and dive planning. Open Water, Try Dive and the wider PADI course range are all available here.",
    extra: [
      "Palm Jumeirah is a convenient, central starting point for divers in Dubai — calm, controlled water for skill practice before progressing to open-water dives. It is an ideal location for first-time divers and for students completing the confined-water portion of a PADI course.",
      "From the Palm Jumeirah base you can begin any certification level and arrange onward open-water and East Coast dives.",
    ],
    list: [
      "Azure Residences dive base on Palm Jumeirah",
      "Pool sessions and PADI course briefings",
      "Suitable for first-time divers and course students",
    ],
    related: ["/try-dive", "/padi-open-water", "/scuba-diving-dubai", "/padi-course-dubai"],
  },
  "/fujairah-scuba-diving": {
    h: "Scuba Diving in Fujairah & the UAE East Coast",
    p: "Boat and reef dives at Dibba and Khor Fakkan on the UAE East Coast, plus PADI courses and weekend dive trips. A natural next step after Open Water certification in Dubai.",
    extra: [
      "Fujairah sits on the Gulf of Oman, where richer reefs and better visibility make it the UAE's premier dive region. Sites around Dibba and Khor Fakkan are home to reef fish, rays, turtles and seasonal larger marine life.",
      "We run regular weekend trips from our Royal Beach base in Dibba Fujairah, suitable for certified divers and for course training dives.",
    ],
    list: [
      "Dibba and Khor Fakkan dive sites on the Gulf of Oman",
      "Boat dives, reef dives and weekend dive trips",
      "Marine life including reef fish, rays and turtles",
      "Royal Beach base in Dibba Fujairah",
    ],
    related: ["/padi-open-water", "/advanced-open-water", "/scuba-diving-dubai", "/try-dive"],
  },
  "/padi-course-dubai": {
    h: "PADI Courses in Dubai",
    p: "Every PADI course under one roof in Dubai — Open Water, Advanced Open Water, Rescue Diver and Divemaster — with internationally recognised certification from UAE Dive.",
    extra: [
      "PADI is the world's most widely recognised diver-training organisation, and a PADI certification earned in Dubai is valid for diving anywhere in the world. Courses combine eLearning theory, confined-water skills and open-water dives.",
      "Whether you are starting with your first certification or going professional, there is a structured PADI pathway with prices ranging from AED 350 for a Try Dive up to professional-level training.",
    ],
    list: [
      "PADI Open Water Diver — your first full certification",
      "PADI Advanced Open Water — deep and navigation dives",
      "PADI Rescue Diver — emergency-response training",
      "PADI Divemaster — the first professional rating",
    ],
    related: ["/padi-open-water", "/advanced-open-water", "/padi-rescue-diver", "/padi-divemaster", "/padi-scuba-diver"],
  },
  "/try-scuba-diving-dubai": {
    h: "Try Scuba Diving in Dubai",
    p: "A safe, guided first-time scuba experience in Dubai with PADI instructors — no certification required. The usual next step is the PADI Open Water Diver course.",
    extra: [
      "A Try Dive (Discover Scuba Diving) is the easiest way to breathe underwater for the first time. After a short briefing, you enter the water with an instructor at your side the whole time, so no prior experience or swimming qualification is needed.",
      "It is ideal for holidaymakers, families and anyone curious about diving. If you love it, the session can count toward your full Open Water Diver certification.",
    ],
    list: [
      "No certification or experience required",
      "One-to-one instructor supervision throughout",
      "From AED 350 — credited toward Open Water if you continue",
    ],
    related: ["/try-dive", "/padi-open-water", "/scuba-diving-dubai"],
  },
  "/about": {
    h: "About UAE Dive",
    p: "UAE Dive is a team of PADI-certified instructors and divemasters running scuba training in Dubai (Palm Jumeirah) and Fujairah (Dibba).",
    related: ["/padi-open-water", "/try-dive", "/scuba-diving-dubai"],
  },
};

function buildContentBlock(route) {
  const c = CONTENT[route.path];
  if (!c) return "";
  const paras = [c.p, ...(c.extra || [])]
    .filter(Boolean)
    .map((t) => `<p>${t}</p>`)
    .join("");
  const list = (c.list || []).length
    ? `<ul>${c.list.map((li) => `<li>${li}</li>`).join("")}</ul>`
    : "";
  const links = (c.related || [])
    .filter((p) => LINK_TEXT[p])
    .map((p) => `<li><a href="${SITE_URL}${p}">${LINK_TEXT[p]}</a></li>`)
    .join("");
  const nav = links
    ? `<nav aria-label="Related scuba diving pages"><ul>${links}</ul></nav>`
    : "";
  return `<h2>${c.h}</h2>${paras}${list}${nav}`;
}

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

  const contentBlock = buildContentBlock(route);
  if (html.includes("<!--prerender:content:start-->")) {
    html = html.replace(
      /<!--prerender:content:start-->[\s\S]*?<!--prerender:content:end-->/,
      `<!--prerender:content:start-->${contentBlock}<!--prerender:content:end-->`,
    );
  }

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
