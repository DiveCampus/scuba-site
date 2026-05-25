import { supabase } from "@/lib/supabaseClient";
import type { CourseData } from "@/data/courseData";

type CheckoutSessionResponse = {
  sessionId?: string;
  url?: string;
  error?: string;
};

function getCheckoutSessionPayload(course: CourseData) {
  return {
    courseSlug: course.slug,
  };
}

async function createLocalCheckoutSession(course: CourseData) {
  const response = await fetch(
    "http://127.0.0.1:54321/functions/v1/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getCheckoutSessionPayload(course)),
    }
  );

  const data = (await response.json()) as CheckoutSessionResponse;

  if (!response.ok) {
    throw new Error(data?.error || "Unable to create local Stripe checkout session.");
  }

  return data;
}

async function createProductionCheckoutSession(course: CourseData) {
  const { data, error } = await supabase.functions.invoke<CheckoutSessionResponse>(
    "create-checkout-session",
    {
      body: getCheckoutSessionPayload(course),
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createCheckoutSession(course: CourseData) {
  const data = import.meta.env.DEV
    ? await createLocalCheckoutSession(course)
    : await createProductionCheckoutSession(course);

  if (!data?.url) {
    throw new Error(data?.error || "Unable to create Stripe checkout session.");
  }

  return data.url;
}
