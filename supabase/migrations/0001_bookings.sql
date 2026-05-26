-- Bookings: source of truth for course bookings and their payment state.
-- Written by the create-checkout-session and stripe-webhook edge functions,
-- which connect with the service_role key and therefore bypass RLS.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),

  -- Stripe references. UNIQUE so that webhook retries cannot duplicate rows.
  stripe_session_id        text unique,
  stripe_payment_intent_id text unique,

  -- Course
  course_slug  text not null,
  course_title text,

  -- Customer (populated by Stripe Checkout via customer_details on completion)
  customer_name  text,
  customer_email text,
  customer_phone text,

  -- Payment
  amount_total integer,                -- smallest currency unit (e.g. fils for AED)
  currency     text default 'aed',

  -- Status (constrained so silent typos cannot land)
  payment_status text not null default 'pending'
    check (payment_status in ('pending','paid','failed','expired','refunded')),
  booking_status text not null default 'pending'
    check (booking_status in ('pending','confirmed','cancelled')),

  -- Optional metadata
  preferred_date  date,
  failure_reason  text,

  -- Lifecycle
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at    timestamptz
);

create index if not exists bookings_course_slug_idx     on public.bookings (course_slug);
create index if not exists bookings_customer_email_idx  on public.bookings (customer_email);
create index if not exists bookings_payment_status_idx  on public.bookings (payment_status);
create index if not exists bookings_booking_status_idx  on public.bookings (booking_status);
create index if not exists bookings_created_at_idx      on public.bookings (created_at desc);

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- Idempotency log: Stripe retries deliveries on non-2xx. The webhook tries to
-- INSERT the event id first; a 23505 unique_violation means "already processed,
-- return 200 immediately." This guarantees exactly-once business logic per event.
create table if not exists public.stripe_webhook_events (
  id          text primary key,        -- Stripe event id (evt_...)
  type        text not null,
  payload     jsonb not null,
  received_at timestamptz not null default now()
);

-- RLS: deny everyone except service_role by default. Admin read access can be
-- granted later once a real authenticated_admin role exists (today's admin auth
-- is localStorage-based, so the safest default is no client-side reads).
alter table public.bookings              enable row level security;
alter table public.stripe_webhook_events enable row level security;

drop policy if exists "service_role_bookings_all" on public.bookings;
create policy  "service_role_bookings_all" on public.bookings
  for all to service_role using (true) with check (true);

drop policy if exists "service_role_events_all" on public.stripe_webhook_events;
create policy  "service_role_events_all" on public.stripe_webhook_events
  for all to service_role using (true) with check (true);
