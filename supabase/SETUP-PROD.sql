-- ============================================================
-- HCE — SETUP PROD (idempotent, à coller-runer dans Supabase SQL Editor)
-- ============================================================
-- Crée toutes les tables manquantes, applique les RLS, pré-remplit
-- les valeurs par défaut, puis force le rafraîchissement du cache
-- PostgREST. Peut être ré-exécuté autant de fois que nécessaire :
-- - les CREATE sont en IF NOT EXISTS
-- - les ALTER COLUMN sont en IF NOT EXISTS
-- - les policies sont DROP puis CREATE
-- - les INSERT utilisent ON CONFLICT DO NOTHING ou WHERE NOT EXISTS
-- ============================================================

-- ===== 0. PRÉREQUIS (rôle admin, fonction has_role) =========

-- PostgreSQL ne supporte pas "create type if not exists" → DO block
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'user');
  end if;
end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

drop policy if exists "user_roles readable by self or admin" on public.user_roles;
create policy "user_roles readable by self or admin"
  on public.user_roles for select
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins manage roles" on public.user_roles;
create policy "admins manage roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Fonction qui touche updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ===== 1. SITE_CONTENT (kv legacy) ==========================

create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "site content public read" on public.site_content;
create policy "site content public read" on public.site_content for select using (true);
drop policy if exists "admins write site content" on public.site_content;
create policy "admins write site content" on public.site_content for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists site_content_touch on public.site_content;
create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_updated_at();

-- ===== 2. SITE_CONTENT_FIELDS (per-field éditable) ==========

do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_type') then
    create type public.content_type as enum ('text', 'image', 'richtext');
  end if;
end $$;

create table if not exists public.site_content_fields (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null,
  section_key text not null,
  field_key text not null,
  content_type public.content_type not null default 'text',
  content_value text,
  updated_at timestamptz not null default now(),
  unique (site_id, section_key, field_key)
);
alter table public.site_content_fields enable row level security;
drop policy if exists "site content fields public read" on public.site_content_fields;
create policy "site content fields public read" on public.site_content_fields for select using (true);
drop policy if exists "admins manage site content fields" on public.site_content_fields;
create policy "admins manage site content fields" on public.site_content_fields for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== 3. GALLERY ===========================================

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
alter table public.gallery_categories add column if not exists description text;
alter table public.gallery_categories add column if not exists cover_url text;

drop policy if exists "gallery_categories public read" on public.gallery_categories;
create policy "gallery_categories public read" on public.gallery_categories for select using (true);
drop policy if exists "admins manage gallery_categories" on public.gallery_categories;
create policy "admins manage gallery_categories" on public.gallery_categories for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

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
alter table public.gallery_photos add column if not exists alt_text text;
alter table public.gallery_photos add column if not exists caption text;

drop policy if exists "gallery_photos public read" on public.gallery_photos;
create policy "gallery_photos public read" on public.gallery_photos for select using (true);
drop policy if exists "admins manage gallery_photos" on public.gallery_photos;
create policy "admins manage gallery_photos" on public.gallery_photos for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_gallery_photos_category on public.gallery_photos(category_id, display_order);

create table if not exists public.gallery_section (
  id int primary key default 1,
  subtitle text,
  title text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
alter table public.gallery_section enable row level security;
drop policy if exists "gallery_section public read" on public.gallery_section;
create policy "gallery_section public read" on public.gallery_section for select using (true);
drop policy if exists "gallery_section admin write" on public.gallery_section;
create policy "gallery_section admin write" on public.gallery_section for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== 4. WHY US ============================================

create table if not exists public.why_us_section (
  id int primary key default 1,
  tag text,
  title text,
  cta_text text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
alter table public.why_us_section enable row level security;
drop policy if exists "why_us_section public read" on public.why_us_section;
create policy "why_us_section public read" on public.why_us_section for select using (true);
drop policy if exists "why_us_section admin write" on public.why_us_section;
create policy "why_us_section admin write" on public.why_us_section for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table if not exists public.why_us_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  display_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.why_us_cards enable row level security;
drop policy if exists "why_us_cards public read" on public.why_us_cards;
create policy "why_us_cards public read" on public.why_us_cards for select using (true);
drop policy if exists "why_us_cards admin write" on public.why_us_cards;
create policy "why_us_cards admin write" on public.why_us_cards for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== 5. SERVICE AREA ======================================

create table if not exists public.service_area (
  id int primary key default 1,
  tag text,
  title text,
  description text,
  cta_text text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
alter table public.service_area enable row level security;
drop policy if exists "service_area public read" on public.service_area;
create policy "service_area public read" on public.service_area for select using (true);
drop policy if exists "service_area admin write" on public.service_area;
create policy "service_area admin write" on public.service_area for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table if not exists public.service_area_cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_headquarters boolean not null default false,
  display_order int not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.service_area_cities enable row level security;
drop policy if exists "service_area_cities public read" on public.service_area_cities;
create policy "service_area_cities public read" on public.service_area_cities for select using (true);
drop policy if exists "service_area_cities admin write" on public.service_area_cities;
create policy "service_area_cities admin write" on public.service_area_cities for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== 6. PROJECT TYPES + QUOTE SECTION =====================

create table if not exists public.project_types (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  description text,
  price_from numeric(10, 2),
  price_unit text not null default '€/m²',
  show_price boolean not null default true,
  display_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.project_types enable row level security;
alter table public.project_types add column if not exists description text;

drop policy if exists "project_types public read" on public.project_types;
create policy "project_types public read" on public.project_types for select using (true);
drop policy if exists "project_types admin write" on public.project_types;
create policy "project_types admin write" on public.project_types for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table if not exists public.quote_section (
  id int primary key default 1,
  tag text,
  title text,
  subtitle text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
alter table public.quote_section enable row level security;
drop policy if exists "quote_section public read" on public.quote_section;
create policy "quote_section public read" on public.quote_section for select using (true);
drop policy if exists "quote_section admin write" on public.quote_section;
create policy "quote_section admin write" on public.quote_section for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ===== 7. DEVIS REQUESTS ====================================

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
drop policy if exists "devis_requests public insert" on public.devis_requests;
create policy "devis_requests public insert" on public.devis_requests for insert with check (true);
drop policy if exists "devis_requests admin read" on public.devis_requests;
create policy "devis_requests admin read" on public.devis_requests for select using (public.has_role(auth.uid(), 'admin'));
drop policy if exists "devis_requests admin update" on public.devis_requests;
create policy "devis_requests admin update" on public.devis_requests for update
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_devis_requests_created on public.devis_requests(created_at desc);

-- ===== 8. SEED — valeurs par défaut =========================

-- WHY US section + cartes
insert into public.why_us_section (id, tag, title, cta_text)
values (1, '— Pourquoi HCE', 'Quatre raisons, une certitude.', 'Convaincu ? Recevez un devis personnalisé.')
on conflict (id) do nothing;

insert into public.why_us_cards (title, description, icon_name, display_order)
select * from (values
  ('Enrobé à chaud',     'Pose à la main à 180°C, compactage maîtrisé pour une durabilité maximale.',                          'flame',        1),
  ('1000+ chantiers',    'Plus de 1000 chantiers réalisés dans le Jura et l''Ain depuis 2012, 14 années d''expérience.',       'star',         2),
  ('Devis détaillé',     'Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.',                              'file-text',    3),
  ('Finitions soignées', 'Bords nets, raccords maîtrisés, surface plane et homogène jusqu''à la dernière passe.',               'shield-check', 4)
) as v(title, description, icon_name, display_order)
where not exists (select 1 from public.why_us_cards);

-- SERVICE AREA section + villes
insert into public.service_area (id, tag, title, description, cta_text)
values (
  1,
  '— Zone d''intervention',
  'Jura & Ain, depuis Cize.',
  'HCE intervient autour de Cize pour les cours, allées, parkings, travaux de terrassement et finitions extérieures.',
  'Votre commune n''est pas listée ? On se déplace jusqu''à 60 km.'
) on conflict (id) do nothing;

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

-- GALLERY headers + catégories
insert into public.gallery_section (id, subtitle, title)
values (1, '— Plus de 1000 chantiers livrés depuis 2012', 'Nos réalisations.')
on conflict (id) do nothing;

insert into public.gallery_categories (slug, title, description, cover_url, display_order)
values
  ('cour-allee-privee',       'Cour & allée privée',       'Cours résidentielles et allées privées en enrobé à chaud, finitions soignées.', '/photos/15-cour-golden-hour.jpg',          1),
  ('parking-voirie-pro',      'Parking & voirie pro',      'Parkings d''entreprise, voiries de copropriété, plateformes industrielles.',   '/photos/26-pro-batiment-commercial.jpg',   2),
  ('preparation-terrassement','Préparation & terrassement','Décaissement, nivellement, drainage et préparation de plateformes.',           '/photos/06-chantier-bobcat-preparation.jpg', 3),
  ('details-finitions',       'Détails & finitions',       'Médaillons, pavés, bordures, raccords millimétriques.',                         '/photos/02-hero-medaillon-paves.jpg',      4),
  ('chantier-en-cours',       'Chantier en cours',         'HCE à l''œuvre — pose, compactage, équipe en action.',                          '/photos/01-hero-finisseur-vapeur-sunset.jpg', 5)
on conflict (slug) do nothing;

-- GALLERY photos (seulement si la table est vide)
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
  if exists (select 1 from public.gallery_photos limit 1) then
    return;
  end if;
  select id into cat_cour     from public.gallery_categories where slug = 'cour-allee-privee';
  select id into cat_pro      from public.gallery_categories where slug = 'parking-voirie-pro';
  select id into cat_prep     from public.gallery_categories where slug = 'preparation-terrassement';
  select id into cat_details  from public.gallery_categories where slug = 'details-finitions';
  select id into cat_chantier from public.gallery_categories where slug = 'chantier-en-cours';

  v_order := 0;
  for v_filename in select unnest(array[
    '11-cour-courbe-ciel','12-cour-courbe-muret-pierre','13-cour-parking-muret','14-cour-maison-volets-rouges',
    '15-cour-golden-hour','16-cour-maison-blanche-ciel-bleu','17-cour-arbres-automne','18-cour-allee-entre-maisons',
    '19-cour-batiment-bois','20-cour-maison-beige-frontal','21-cour-maison-moderne-blanche','22-cour-maison-blanche-garage',
    '23-cour-courbe-arbres','24-cour-maison-plain-pied','25-cour-allee-curve-garage'
  ])
  loop
    insert into public.gallery_photos (url, alt_text, category_id, display_order)
    values ('/photos/' || v_filename || '.jpg', 'Cour résidentielle en enrobé HCE', cat_cour, v_order);
    v_order := v_order + 1;
  end loop;

  insert into public.gallery_photos (url, alt_text, category_id, display_order) values
    ('/photos/08-chantier-plaque-vibrante.jpg',   'Compactage à la plaque vibrante sur parking',        cat_pro, 0),
    ('/photos/26-pro-batiment-commercial.jpg',    'Parking enrobé devant bâtiment commercial',          cat_pro, 1),
    ('/photos/06-chantier-bobcat-preparation.jpg','Mini-pelle Bobcat en préparation de terrain à Cize', cat_prep, 0),
    ('/photos/07-chantier-terrain-brouette.jpg',  'Préparation manuelle du terrain avant pose',         cat_prep, 1),
    ('/photos/02-hero-medaillon-paves.jpg',       'Médaillon de pavés intégré dans l''enrobé',          cat_details, 0),
    ('/photos/09-detail-bordure-beton.jpg',       'Bordure béton coulée HCE',                            cat_details, 1),
    ('/photos/10-detail-texture-enrobe-frais.jpg','Texture enrobé à chaud fraîchement posé',            cat_details, 2),
    ('/photos/01-hero-finisseur-vapeur-sunset.jpg','HCE en cours de pose à la main',                    cat_chantier, 0),
    ('/photos/03-hero-rouleau-compacteur.jpg',    'Rouleau compacteur sur chantier HCE',                cat_chantier, 1),
    ('/photos/04-hero-golden-hour.jpg',           'Chantier HCE en golden hour',                         cat_chantier, 2);
end $$;

-- QUOTE section + project types
insert into public.quote_section (id, tag, title, subtitle)
values (1, '— Demande de devis', 'Estimez votre projet', 'en 90 secondes.')
on conflict (id) do nothing;

insert into public.project_types (slug, label, description, price_from, price_unit, display_order)
values
  ('cour',        'Cour privée',       'Enrobé à chaud, allée + bordure + finition.', 65, '€/m²', 1),
  ('allee',       'Allée',             'Pose, bordures et finition soignée.',         75, '€/m²', 2),
  ('parking',     'Parking pro',       'Voirie, poids-lourds possible.',              55, '€/m²', 3),
  ('preparation', 'Préparation seule', 'Décaissement + nivellement.',                 30, '€/m²', 4)
on conflict (slug) do nothing;

-- FAQ et MARQUEE dans site_content (legacy keyed)
insert into public.site_content (key, data) values
  ('faqs', '[
    {"q":"Sous combien de temps recevrai-je mon devis ?","a":"Après visite sur site, nous vous transmettons un devis détaillé sous 48 heures ouvrées, sans engagement."},
    {"q":"L''enrobé peut-il être posé toute l''année ?","a":"L''enrobé à chaud requiert des températures supérieures à 5°C et un sol sec. Nous intervenons généralement de mars à novembre."},
    {"q":"Quelle est la durée de vie d''un enrobé HCE ?","a":"Un enrobé bien préparé et compacté tient 20 à 30 ans selon l''usage, sans entretien lourd."},
    {"q":"Faut-il un permis pour refaire ma cour ?","a":"Pour un simple revêtement à l''identique, aucune autorisation n''est nécessaire. Nous vous conseillons en cas de doute."},
    {"q":"Travaillez-vous pour les particuliers et les professionnels ?","a":"Oui : cours privées, allées, parkings d''entreprise, voiries de copropriété, plateformes industrielles."},
    {"q":"Combien de temps dure un chantier type ?","a":"Une cour standard de 100 à 200 m² se réalise en 2 à 4 jours, préparation comprise."}
  ]'::jsonb)
on conflict (key) do nothing;

insert into public.site_content (key, data) values
  ('marquee_items', '["1000+ chantiers livrés","14 années d''expérience","Jura · Ain","Devis sous 48h","Garantie décennale","Enrobé à chaud","Visite gratuite"]'::jsonb)
on conflict (key) do nothing;

-- Hero / footer / chiffres-clés dans site_content_fields (utilisés par useV)
-- Note : déjà rempli en grande partie, on n'écrase pas.
-- SITE_ID utilisé par la home : '11111111-1111-1111-1111-111111111111'

-- ===== 9. AUTO-PROMOTE PREMIER USER COMME ADMIN =============
-- Si aucun admin n'existe encore, promeut le user le plus ancien.
-- (Utile si le trigger bootstrap_first_admin n'a pas tourné.)

do $$
declare
  v_uid uuid;
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    select id into v_uid from auth.users order by created_at asc limit 1;
    if v_uid is not null then
      insert into public.user_roles (user_id, role) values (v_uid, 'admin')
      on conflict (user_id, role) do nothing;
    end if;
  end if;
end $$;

-- ===== 10. FORCE RELOAD POSTGREST SCHEMA CACHE ==============
-- C'est la commande qui résout "Could not find the table in the schema cache".
notify pgrst, 'reload schema';

-- ===== FIN ==================================================
-- ✅ Tables : créées si manquantes
-- ✅ Colonnes : ajoutées si manquantes
-- ✅ RLS : appliquées (public read, admin write)
-- ✅ Seed : exécuté sur tables vides
-- ✅ Cache PostgREST : forcé à recharger
-- ✅ Premier user promu admin si aucun admin
