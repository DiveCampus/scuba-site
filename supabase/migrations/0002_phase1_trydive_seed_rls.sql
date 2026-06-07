-- ============================================================================
-- PHASE 1 — TRY DIVE: SEED divetry_* + RLS FOR ALL PHASE 1 TABLES
-- Safe to run multiple times (idempotent). One copy-paste block.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. SEED divetry_section (single row; only if table is empty)
-- ----------------------------------------------------------------------------
insert into public.divetry_section
  (background_image, top_tag, label, title, subtitle)
select
  '/img3.webp',
  '100% BEGINNER FRIENDLY · NO SWIMMING REQUIRED',
  'FIRST-TIME SCUBA EXPERIENCE',
  'FOR COMPLETE BEGINNERS',
  'OPEN TO AGES 10 & ABOVE'
where not exists (select 1 from public.divetry_section);

-- ----------------------------------------------------------------------------
-- 2. SEED divetry_cards (Dubai + Fujairah; only if that slug is missing)
-- ----------------------------------------------------------------------------
insert into public.divetry_cards
  (location_slug, badge, title, description, price, button_text, sort_order)
select
  'dubai',
  'BEACH TRY DIVE',
  'DUBAI',
  E'Walk-in Beach Entry\nPalm Jumeirah Beach\nQuick & Convenient',
  350,
  'BOOK DUBAI EXPERIENCE',
  1
where not exists (select 1 from public.divetry_cards where location_slug = 'dubai');

insert into public.divetry_cards
  (location_slug, badge, title, description, price, button_text, sort_order)
select
  'fujairah',
  'BOAT TRY DIVE',
  'FUJAIRAH REEFS',
  E'Natural Corals\nScenic Boat Trip\nExotic Marine Life',
  450,
  'BOOK FUJAIRAH EXPERIENCE',
  2
where not exists (select 1 from public.divetry_cards where location_slug = 'fujairah');

-- ----------------------------------------------------------------------------
-- 3. RLS — applied ONLY to Phase 1 tables that actually exist.
--    anon          -> SELECT only (public site visitors read content)
--    authenticated -> SELECT / INSERT / UPDATE / DELETE (admin panel)
--    service_role  -> bypasses RLS automatically (edge functions)
-- ----------------------------------------------------------------------------
do $$
declare
  t text;
  phase1_tables text[] := array[
    'divetry_section',
    'divetry_cards',
    'first_dive_steps_section',
    'first_dive_steps_cards',
    'weekend_routine_section',
    'weekend_routine_images',
    'weekend_routine_gift_card',
    'dive_confidence_section',
    'dive_confidence_reviews',
    'dive_confidence_faqs',
    'choose_dive_site_section',
    'choose_dive_site_cards',
    'choose_dive_site_items',
    'expert_hands_section',
    'expert_hands_features',
    'legacy_of_trust_section',
    'contact_locations',
    'adventure_gallery_section',
    'adventure_gallery_images',
    'try_dive_footer_section',
    'try_dive_footer_links',
    'try_dive_footer_socials'
  ];
begin
  foreach t in array phase1_tables loop
    if to_regclass('public.' || t) is not null then

      -- enable RLS (idempotent)
      execute format('alter table public.%I enable row level security', t);

      -- anon: SELECT only
      execute format('drop policy if exists %I on public.%I', t || '_anon_select', t);
      execute format(
        'create policy %I on public.%I for select to anon using (true)',
        t || '_anon_select', t
      );

      -- authenticated: full read/write
      execute format('drop policy if exists %I on public.%I', t || '_auth_all', t);
      execute format(
        'create policy %I on public.%I for all to authenticated using (true) with check (true)',
        t || '_auth_all', t
      );

    else
      raise notice 'Skipping missing table: public.%', t;
    end if;
  end loop;
end $$;
