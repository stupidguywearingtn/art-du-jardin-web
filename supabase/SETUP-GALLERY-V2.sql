-- ============================================================
-- HCE — SETUP GALERIE V2 (idempotent, à coller-runer dans le SQL Editor)
-- ============================================================
-- À exécuter APRÈS supabase/SETUP-PROD.sql. Ce script :
--   1. crée les tables « Avant / Après » (before_after_pairs / _photos)
--      + leurs RLS (lecture publique, écriture admin) ;
--   2. amorce 6 comparaisons vides ;
--   3. (SECTION RESET, active) VIDE les photos de galerie existantes et
--      remet les vignettes de cartes à zéro — la galerie « Nos réalisations »
--      repart d'une page blanche, le client remplit les emplacements depuis
--      l'admin. Commente la section 3 si tu veux CONSERVER les photos en base.
--   4. force le rechargement du cache PostgREST.
-- Ré-exécutable sans risque (hors section 3 qui re-vide à chaque passage).
-- ============================================================

-- ===== 1. TABLES AVANT / APRÈS ==============================

create table if not exists public.before_after_pairs (
  id uuid primary key default gen_random_uuid(),
  title text,
  display_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.before_after_pairs enable row level security;

drop policy if exists "before_after_pairs public read" on public.before_after_pairs;
create policy "before_after_pairs public read" on public.before_after_pairs for select using (true);
drop policy if exists "admins manage before_after_pairs" on public.before_after_pairs;
create policy "admins manage before_after_pairs" on public.before_after_pairs for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists before_after_pairs_touch on public.before_after_pairs;
create trigger before_after_pairs_touch before update on public.before_after_pairs
  for each row execute function public.touch_updated_at();

create table if not exists public.before_after_photos (
  id uuid primary key default gen_random_uuid(),
  pair_id uuid not null references public.before_after_pairs(id) on delete cascade,
  side text not null check (side in ('avant', 'apres')),
  url text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.before_after_photos enable row level security;

drop policy if exists "before_after_photos public read" on public.before_after_photos;
create policy "before_after_photos public read" on public.before_after_photos for select using (true);
drop policy if exists "admins manage before_after_photos" on public.before_after_photos;
create policy "admins manage before_after_photos" on public.before_after_photos for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_before_after_photos_pair
  on public.before_after_photos(pair_id, side, display_order);

-- ===== 2. SEED — 6 comparaisons vides =======================

insert into public.before_after_pairs (title, display_order)
select 'Comparaison ' || g, g - 1
from generate_series(1, 6) as g
where not exists (select 1 from public.before_after_pairs);

-- ===== 3. RESET GALERIE — repart de zéro ====================
-- ⚠️ Supprime TOUTES les photos de galerie en base et remet les vignettes
--    de cartes à null. Commente ce bloc pour garder l'existant.

truncate table public.gallery_photos;
update public.gallery_categories set cover_url = null;

-- ===== 4. RELOAD CACHE POSTGREST ============================

notify pgrst, 'reload schema';

-- ===== FIN ==================================================
-- ✅ Tables avant/après : créées + RLS
-- ✅ 6 comparaisons vides amorcées
-- ✅ Galerie vidée (emplacements à remplir via l'admin)
-- ✅ Cache PostgREST rechargé
