-- ============================================================
-- Phase 4 + 8 : tables galerie + types de projet + demandes de devis
-- ============================================================

-- ============ GALLERY CATEGORIES ============
create table if not exists public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  cover_url text,
  display_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.gallery_categories enable row level security;

create policy "gallery_categories public read"
  on public.gallery_categories for select using (true);

create policy "admins manage gallery_categories"
  on public.gallery_categories for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger gallery_categories_touch
  before update on public.gallery_categories
  for each row execute function public.touch_updated_at();

-- ============ PHOTOS ============
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  caption text,
  alt_text text,
  category_id uuid references public.gallery_categories(id) on delete set null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;

create policy "gallery_photos public read"
  on public.gallery_photos for select using (true);

create policy "admins manage gallery_photos"
  on public.gallery_photos for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger gallery_photos_touch
  before update on public.gallery_photos
  for each row execute function public.touch_updated_at();

create index if not exists idx_gallery_photos_category on public.gallery_photos(category_id, display_order);

-- ============ PROJECT TYPES (Simulateur) ============
create table if not exists public.project_types (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  description text,
  price_from numeric(10, 2),
  price_unit text not null default '€/m²',
  show_price boolean not null default false,
  display_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.project_types enable row level security;

create policy "project_types public read"
  on public.project_types for select using (true);

create policy "admins manage project_types"
  on public.project_types for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger project_types_touch
  before update on public.project_types
  for each row execute function public.touch_updated_at();

-- ============ DEVIS REQUESTS ============
create table if not exists public.devis_requests (
  id uuid primary key default gen_random_uuid(),
  project_type_slug text,
  project_type_label text,
  length_m numeric(10, 2),
  width_m numeric(10, 2),
  estimated_surface_m2 numeric(12, 2),
  free_dimensions text,
  description text,
  name text not null,
  phone text not null,
  email text not null,
  postal_code text,
  city text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.devis_requests enable row level security;

create policy "devis_requests public insert"
  on public.devis_requests for insert
  with check (true);

create policy "devis_requests admin read"
  on public.devis_requests for select
  using (public.has_role(auth.uid(), 'admin'));

create policy "devis_requests admin update"
  on public.devis_requests for update
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_devis_requests_created on public.devis_requests(created_at desc);

-- ============ SEED categories ============
insert into public.gallery_categories (slug, title, description, cover_url, display_order)
values
  ('cour-allee-privee',     'Cour & allée privée',     'Cours résidentielles et allées privées en enrobé à chaud, finitions soignées.', '/photos/15-cour-golden-hour.jpg',        1),
  ('parking-voirie-pro',    'Parking & voirie pro',    'Parkings d''entreprise, voiries de copropriété, plateformes industrielles.',   '/photos/26-pro-batiment-commercial.jpg', 2),
  ('preparation-terrassement','Préparation & terrassement','Décaissement, nivellement, drainage et préparation de plateformes.',         '/photos/06-chantier-bobcat-preparation.jpg', 3),
  ('details-finitions',     'Détails & finitions',     'Médaillons, pavés, bordures, raccords millimétriques.',                          '/photos/02-hero-medaillon-paves.jpg',    4),
  ('chantier-en-cours',     'Chantier en cours',       'HCE à l''œuvre — pose, compactage, équipe en action.',                            '/photos/01-hero-finisseur-vapeur-sunset.jpg', 5)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  cover_url = excluded.cover_url,
  display_order = excluded.display_order;

-- ============ SEED photos ============
do $$
declare
  cat_cour uuid;
  cat_pro uuid;
  cat_prep uuid;
  cat_details uuid;
  cat_chantier uuid;
  v_filename text;
  v_order int;
begin
  select id into cat_cour     from public.gallery_categories where slug = 'cour-allee-privee';
  select id into cat_pro      from public.gallery_categories where slug = 'parking-voirie-pro';
  select id into cat_prep     from public.gallery_categories where slug = 'preparation-terrassement';
  select id into cat_details  from public.gallery_categories where slug = 'details-finitions';
  select id into cat_chantier from public.gallery_categories where slug = 'chantier-en-cours';

  -- Skip seed if photos already present
  if exists (select 1 from public.gallery_photos limit 1) then
    return;
  end if;

  -- Cour & allée privée (15 photos : 11 → 25)
  v_order := 0;
  for v_filename in select unnest(array[
    '11-cour-courbe-ciel','12-cour-courbe-muret-pierre','13-cour-parking-muret',
    '14-cour-maison-volets-rouges','15-cour-golden-hour','16-cour-maison-blanche-ciel-bleu',
    '17-cour-arbres-automne','18-cour-allee-entre-maisons','19-cour-batiment-bois',
    '20-cour-maison-beige-frontal','21-cour-maison-moderne-blanche','22-cour-maison-blanche-garage',
    '23-cour-courbe-arbres','24-cour-maison-plain-pied','25-cour-allee-curve-garage'
  ])
  loop
    insert into public.gallery_photos (url, alt_text, category_id, display_order)
    values ('/photos/' || v_filename || '.jpg', 'Cour résidentielle en enrobé HCE', cat_cour, v_order);
    v_order := v_order + 1;
  end loop;

  -- Parking & voirie pro
  insert into public.gallery_photos (url, alt_text, category_id, display_order) values
    ('/photos/08-chantier-plaque-vibrante.jpg', 'Compactage à la plaque vibrante sur parking', cat_pro, 0),
    ('/photos/26-pro-batiment-commercial.jpg', 'Parking enrobé devant bâtiment commercial', cat_pro, 1);

  -- Préparation & terrassement
  insert into public.gallery_photos (url, alt_text, category_id, display_order) values
    ('/photos/06-chantier-bobcat-preparation.jpg', 'Mini-pelle Bobcat en préparation de terrain à Cize', cat_prep, 0),
    ('/photos/07-chantier-terrain-brouette.jpg', 'Préparation manuelle du terrain avant pose', cat_prep, 1);

  -- Détails & finitions
  insert into public.gallery_photos (url, alt_text, category_id, display_order) values
    ('/photos/02-hero-medaillon-paves.jpg', 'Médaillon de pavés intégré dans l''enrobé', cat_details, 0),
    ('/photos/09-detail-bordure-beton.jpg', 'Bordure béton coulée HCE', cat_details, 1),
    ('/photos/10-detail-texture-enrobe-frais.jpg', 'Texture enrobé à chaud fraîchement posé', cat_details, 2);

  -- Chantier en cours
  insert into public.gallery_photos (url, alt_text, category_id, display_order) values
    ('/photos/01-hero-finisseur-vapeur-sunset.jpg', 'HCE en cours de pose à la main', cat_chantier, 0),
    ('/photos/03-hero-rouleau-compacteur.jpg', 'Rouleau compacteur sur chantier HCE', cat_chantier, 1),
    ('/photos/04-hero-golden-hour.jpg', 'Chantier HCE en golden hour', cat_chantier, 2);
end $$;

-- ============ SEED project types ============
insert into public.project_types (slug, label, description, price_from, price_unit, display_order)
values
  ('cour',        'Cour privée',      'Enrobé à chaud, compactage',          65, '€/m²', 1),
  ('allee',       'Chemin',           'Bordures + finition soignée',       NULL, '€/m²', 2),
  ('parking',     'Parking pro',      'Voirie poids lourds possible',        55, '€/m²', 3),
  ('preparation', 'Préparation seule','Décaissement + nivellement',          30, '€/m²', 4)
on conflict (slug) do update set
  label = excluded.label,
  description = excluded.description,
  display_order = excluded.display_order;

-- ============ HOMEPAGE_CONTENT (legacy keyed) — pré-remplissage hero ============
-- (Le hero public lit déjà depuis site_content_fields via useV(), mais on garde
-- ce filet de sécurité pour le legacy useSiteContent.)
insert into public.site_content (key, data)
values ('hero', '{"line1":"Enrobé · Cours ·","line2":"Parkings · Terrassement","badge":"Jura & Ain — depuis 2012","tagline":"Depuis 2012"}'::jsonb)
on conflict (key) do nothing;
