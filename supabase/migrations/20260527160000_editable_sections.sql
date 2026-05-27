-- ============================================================
-- Correctif édition admin : nouvelles tables pour rendre éditables
-- "Pourquoi HCE", "Zone d'intervention", header galerie & devis.
-- ============================================================

-- ============ POURQUOI HCE — section + cartes ============
create table if not exists public.why_us_section (
  id int primary key default 1,
  tag text,
  title text,
  cta_text text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

create table if not exists public.why_us_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  display_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.why_us_section enable row level security;
alter table public.why_us_cards enable row level security;

create policy "why_us_section public read" on public.why_us_section for select using (true);
create policy "why_us_section admin write" on public.why_us_section for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "why_us_cards public read" on public.why_us_cards for select using (true);
create policy "why_us_cards admin write" on public.why_us_cards for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger why_us_section_touch before update on public.why_us_section
  for each row execute function public.touch_updated_at();
create trigger why_us_cards_touch before update on public.why_us_cards
  for each row execute function public.touch_updated_at();

-- Seed avec les valeurs actuelles
insert into public.why_us_section (id, tag, title, cta_text) values
  (1, '— Pourquoi HCE', 'Quatre raisons, une certitude.', 'Convaincu ? Recevez un devis personnalisé.')
on conflict (id) do nothing;

insert into public.why_us_cards (title, description, icon_name, display_order)
select * from (values
  ('Enrobé à chaud', 'Pose à la main à 180°C, compactage maîtrisé pour une durabilité maximale.', 'flame', 1),
  ('1000+ chantiers', 'Plus de 1000 chantiers réalisés dans le Jura et l''Ain depuis 2012, 14 années d''expérience.', 'star', 2),
  ('Devis détaillé', 'Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.', 'file-text', 3),
  ('Finitions soignées', 'Bords nets, raccords maîtrisés, surface plane et homogène jusqu''à la dernière passe.', 'shield-check', 4)
) as v(title, description, icon_name, display_order)
where not exists (select 1 from public.why_us_cards);

-- ============ ZONE D'INTERVENTION — section + villes ============
create table if not exists public.service_area (
  id int primary key default 1,
  tag text,
  title text,
  description text,
  cta_text text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

create table if not exists public.service_area_cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_headquarters boolean not null default false,
  display_order int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.service_area enable row level security;
alter table public.service_area_cities enable row level security;

create policy "service_area public read" on public.service_area for select using (true);
create policy "service_area admin write" on public.service_area for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "service_area_cities public read" on public.service_area_cities for select using (true);
create policy "service_area_cities admin write" on public.service_area_cities for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger service_area_touch before update on public.service_area
  for each row execute function public.touch_updated_at();
create trigger service_area_cities_touch before update on public.service_area_cities
  for each row execute function public.touch_updated_at();

insert into public.service_area (id, tag, title, description, cta_text) values
  (1, '— Zone d''intervention',
   'Jura & Ain, depuis Cize.',
   'HCE intervient autour de Cize pour les cours, allées, parkings, travaux de terrassement et finitions extérieures.',
   'Votre commune n''est pas listée ? On se déplace jusqu''à 60 km.')
on conflict (id) do nothing;

insert into public.service_area_cities (name, is_headquarters, display_order)
select * from (values
  ('Cize',             true,  1),
  ('Lons-le-Saunier',  false, 2),
  ('Saint-Claude',     false, 3),
  ('Champagnole',      false, 4),
  ('Bourg-en-Bresse',  false, 5),
  ('Oyonnax',          false, 6),
  ('Nantua',           false, 7),
  ('Pont-d''Ain',      false, 8)
) as v(name, is_headquarters, display_order)
where not exists (select 1 from public.service_area_cities);

-- ============ HEADER GALERIE ============
create table if not exists public.gallery_section (
  id int primary key default 1,
  subtitle text,
  title text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

alter table public.gallery_section enable row level security;
create policy "gallery_section public read" on public.gallery_section for select using (true);
create policy "gallery_section admin write" on public.gallery_section for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger gallery_section_touch before update on public.gallery_section
  for each row execute function public.touch_updated_at();

insert into public.gallery_section (id, subtitle, title) values
  (1, '— Plus de 1000 chantiers livrés depuis 2012', 'Nos réalisations.')
on conflict (id) do nothing;

-- ============ HEADER SIMULATEUR DEVIS ============
create table if not exists public.quote_section (
  id int primary key default 1,
  tag text,
  title text,
  subtitle text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

alter table public.quote_section enable row level security;
create policy "quote_section public read" on public.quote_section for select using (true);
create policy "quote_section admin write" on public.quote_section for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger quote_section_touch before update on public.quote_section
  for each row execute function public.touch_updated_at();

insert into public.quote_section (id, tag, title, subtitle) values
  (1, '— Demande de devis', 'Estimez votre projet', 'en 90 secondes.')
on conflict (id) do nothing;

-- ============ project_types : s'assurer que description existe ============
alter table public.project_types add column if not exists description text;
-- (déjà présent dans la migration de Phase 8, mais on rejoue par sécurité)

-- ============ gallery_categories : ajouter description si manquante ============
alter table public.gallery_categories add column if not exists description text;
