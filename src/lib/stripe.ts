export function getStripePublishableKey() {
  return (
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    import.meta.env.STRIPE_PUBLISHABLE_KEY ||
    ""
  );
}
