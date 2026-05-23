import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

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
  title?: string;
  description?: string;
  amount?: number;
  currency?: string;
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
};

const COURSES: Record<
  CourseSlug,
  {
    title: string;
    description: string;
    amount: number;
    courseType: string;
  }
> = {
  "open-diver": {
    title: "PADI Open Diver Course",
    description: "Beginner certification course with pool and open-water training.",
    amount: 220000,
    courseType: "certification",
  },
  "try-dive": {
    title: "Try Dive Experience",
    description: "First-time scuba experience for complete beginners.",
    amount: 35000,
    courseType: "experience",
  },
  "advanced-open-water": {
    title: "Advanced Open Water Course",
    description: "Level up your dive skills with advanced open-water training.",
    amount: 130000,
    courseType: "certification",
  },
  "padi-open-water": {
    title: "PADI Open Water Course",
    description: "Worldwide-recognized PADI certification for new divers.",
    amount: 220000,
    courseType: "certification",
  },
  "padi-scuba-diver": {
    title: "PADI Scuba Diver Course",
    description: "Entry-level PADI scuba certification with guided training.",
    amount: 120000,
    courseType: "certification",
  },
  "padi-rescue-diver": {
    title: "PADI Rescue Diver Course",
    description: "Build rescue awareness, problem-solving, and confidence underwater.",
    amount: 180000,
    courseType: "certification",
  },
  "padi-divemaster": {
    title: "PADI Divemaster Course",
    description: "Professional-level training for divers ready to lead.",
    amount: 220000,
    courseType: "professional",
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

    const {
      courseSlug,
      title,
      description,
      amount,
      currency,
      metadata,
      successUrl,
      cancelUrl,
    } = (await req.json()) as CheckoutRequest;
    const course = courseSlug ? COURSES[courseSlug] : null;

    if (!courseSlug || !course) {
      return jsonResponse({ error: "Unknown course." }, 400);
    }

    if (!successUrl || !cancelUrl) {
      return jsonResponse({ error: "Missing successUrl or cancelUrl." }, 400);
    }

    const unitAmount =
      typeof amount === "number" && amount > 0
        ? Math.round(amount * 100)
        : course.amount;
    const checkoutCurrency = (currency || "AED").toLowerCase();
    const productName = title || course.title;
    const productDescription = description || course.description;
    const checkoutMetadata = {
      course_slug: courseSlug,
      course_type: course.courseType,
      ...metadata,
    };

    const params = new URLSearchParams({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": checkoutCurrency,
      "line_items[0][price_data][unit_amount]": String(unitAmount),
      "line_items[0][price_data][product_data][name]": productName,
      "line_items[0][price_data][product_data][description]": productDescription,
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
