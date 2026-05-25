import { serve } from "std/http/server.ts";

type CourseSlug =
  | "open-diver"
  | "try-dive"
  | "advanced-open-water"
  | "padi-open-water"
  | "padi-scuba-diver"
  | "padi-rescue-diver"
  | "padi-divemaster";

type CheckoutRequest = {
  courseSlug?: CourseSlug;
};

const COURSE_MAP: Record<
  CourseSlug,
  {
    title: string;
    description: string;
    amount: number;
    currency: "AED";
    metadata: Record<string, string>;
  }
> = {
  "open-diver": {
    title: "PADI Open Diver Course",
    description: "Beginner certification course with pool and open-water training.",
    amount: 220000,
    currency: "AED",
    metadata: {
      courseType: "certification",
    },
  },
  "try-dive": {
    title: "Try Dive Experience",
    description: "First-time scuba experience for complete beginners.",
    amount: 35000,
    currency: "AED",
    metadata: {
      courseType: "experience",
    },
  },
  "advanced-open-water": {
    title: "Advanced Open Water Course",
    description: "Level up your dive skills with advanced open-water training.",
    amount: 130000,
    currency: "AED",
    metadata: {
      courseType: "certification",
    },
  },
  "padi-open-water": {
    title: "PADI Open Water Course",
    description: "Worldwide-recognized PADI certification for new divers.",
    amount: 220000,
    currency: "AED",
    metadata: {
      courseType: "certification",
    },
  },
  "padi-scuba-diver": {
    title: "PADI Scuba Diver Course",
    description: "Entry-level PADI scuba certification with guided training.",
    amount: 120000,
    currency: "AED",
    metadata: {
      courseType: "certification",
    },
  },
  "padi-rescue-diver": {
    title: "PADI Rescue Diver Course",
    description: "Build rescue awareness, problem-solving, and confidence underwater.",
    amount: 180000,
    currency: "AED",
    metadata: {
      courseType: "certification",
    },
  },
  "padi-divemaster": {
    title: "PADI Divemaster Course",
    description: "Professional-level training for divers ready to lead.",
    amount: 220000,
    currency: "AED",
    metadata: {
      courseType: "professional",
    },
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function getAllowedOrigins() {
  const configuredOrigins = Deno.env.get("ALLOWED_CHECKOUT_ORIGINS")
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

  return new Set([
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    ...configuredOrigins,
  ]);
}

function getRequestOrigin(req: Request) {
  const origin = req.headers.get("origin");

  if (origin) {
    return origin;
  }

  const referer = req.headers.get("referer");

  if (!referer) {
    return null;
  }

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

function getCheckoutBaseUrl(req: Request) {
  const requestOrigin = getRequestOrigin(req);
  const allowedOrigins = getAllowedOrigins();

  if (requestOrigin && allowedOrigins.has(requestOrigin)) {
    return requestOrigin;
  }

  const siteUrl = Deno.env.get("SITE_URL");

  if (siteUrl) {
    return new URL(siteUrl).origin;
  }

  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeSecretKey) {
      return jsonResponse({ error: "Missing STRIPE_SECRET_KEY." }, 500);
    }

    const { courseSlug } = (await req.json()) as CheckoutRequest;
    const course = courseSlug ? COURSE_MAP[courseSlug] : null;

    if (!courseSlug || !course) {
      return jsonResponse({ error: "Unknown course." }, 400);
    }

    const checkoutBaseUrl = getCheckoutBaseUrl(req);

    if (!checkoutBaseUrl) {
      return jsonResponse({ error: "Checkout origin is not allowed." }, 403);
    }

    const successUrl = `${checkoutBaseUrl}/payment-success?course=${courseSlug}`;
    const cancelUrl = `${checkoutBaseUrl}/payment-cancel?course=${courseSlug}`;
    const checkoutMetadata = {
      course_slug: courseSlug,
      ...course.metadata,
    };

    const params = new URLSearchParams({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": course.currency.toLowerCase(),
      "line_items[0][price_data][unit_amount]": String(course.amount),
      "line_items[0][price_data][product_data][name]": course.title,
      "line_items[0][price_data][product_data][description]": course.description,
    });

    for (const [key, value] of Object.entries(checkoutMetadata)) {
      params.set(`metadata[${key}]`, value);
    }

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      return jsonResponse(
        { error: session?.error?.message || "Stripe checkout session failed." },
        stripeResponse.status
      );
    }

    return jsonResponse({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create Stripe checkout session.",
      },
      500
    );
  }
});
