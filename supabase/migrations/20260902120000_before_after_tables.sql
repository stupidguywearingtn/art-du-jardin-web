-- Section « Avant / Après » pilotée par la base.
-- (Le reset des photos de galerie n'est PAS inclus ici — voir
--  supabase/SETUP-GALLERY-V2.sql pour la remise à zéro manuelle.)

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

insert into public.before_after_pairs (title, display_order)
select 'Comparaison ' || g, g - 1
from generate_series(1, 6) as g
where not exists (select 1 from public.before_after_pairs);
