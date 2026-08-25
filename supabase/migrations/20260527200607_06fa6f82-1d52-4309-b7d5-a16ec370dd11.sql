
-- ============ SERVICE_AREA ============
CREATE TABLE IF NOT EXISTS public.service_area (
  id INT PRIMARY KEY DEFAULT 1,
  tag TEXT,
  title TEXT,
  description TEXT,
  cta_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT service_area_single_row CHECK (id = 1)
);
GRANT SELECT ON public.service_area TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_area TO authenticated;
GRANT ALL ON public.service_area TO service_role;
ALTER TABLE public.service_area ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_area public read" ON public.service_area;
CREATE POLICY "service_area public read" ON public.service_area FOR SELECT USING (true);
DROP POLICY IF EXISTS "service_area admin write" ON public.service_area;
CREATE POLICY "service_area admin write" ON public.service_area FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SERVICE_AREA_CITIES ============
CREATE TABLE IF NOT EXISTS public.service_area_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  is_headquarters BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_area_cities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_area_cities TO authenticated;
GRANT ALL ON public.service_area_cities TO service_role;
ALTER TABLE public.service_area_cities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_area_cities public read" ON public.service_area_cities;
CREATE POLICY "service_area_cities public read" ON public.service_area_cities FOR SELECT USING (true);
DROP POLICY IF EXISTS "service_area_cities admin write" ON public.service_area_cities;
CREATE POLICY "service_area_cities admin write" ON public.service_area_cities FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ GALLERY_SECTION ============
CREATE TABLE IF NOT EXISTS public.gallery_section (
  id INT PRIMARY KEY DEFAULT 1,
  subtitle TEXT,
  title TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT gallery_section_single_row CHECK (id = 1)
);
GRANT SELECT ON public.gallery_section TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_section TO authenticated;
GRANT ALL ON public.gallery_section TO service_role;
ALTER TABLE public.gallery_section ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_section public read" ON public.gallery_section;
CREATE POLICY "gallery_section public read" ON public.gallery_section FOR SELECT USING (true);
DROP POLICY IF EXISTS "gallery_section admin write" ON public.gallery_section;
CREATE POLICY "gallery_section admin write" ON public.gallery_section FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ GALLERY_CATEGORIES ============
CREATE TABLE IF NOT EXISTS public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_categories TO authenticated;
GRANT ALL ON public.gallery_categories TO service_role;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_categories public read" ON public.gallery_categories;
CREATE POLICY "gallery_categories public read" ON public.gallery_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "gallery_categories admin write" ON public.gallery_categories;
CREATE POLICY "gallery_categories admin write" ON public.gallery_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ GALLERY_PHOTOS ============
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.gallery_categories(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX gallery_photos_category_idx ON public.gallery_photos(category_id);
GRANT SELECT ON public.gallery_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;
GRANT ALL ON public.gallery_photos TO service_role;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_photos public read" ON public.gallery_photos;
CREATE POLICY "gallery_photos public read" ON public.gallery_photos FOR SELECT USING (true);
DROP POLICY IF EXISTS "gallery_photos admin write" ON public.gallery_photos;
CREATE POLICY "gallery_photos admin write" ON public.gallery_photos FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ DEVIS_REQUESTS ============
CREATE TABLE IF NOT EXISTS public.devis_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  project_type TEXT,
  surface_estimate TEXT,
  free_dimensions TEXT,
  city TEXT,
  postal_code TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.devis_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.devis_requests TO authenticated;
GRANT ALL ON public.devis_requests TO service_role;
ALTER TABLE public.devis_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "devis_requests anyone insert" ON public.devis_requests;
CREATE POLICY "devis_requests anyone insert" ON public.devis_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "devis_requests admin read" ON public.devis_requests;
CREATE POLICY "devis_requests admin read" ON public.devis_requests FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "devis_requests admin manage" ON public.devis_requests;
CREATE POLICY "devis_requests admin manage" ON public.devis_requests FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SEED ============
INSERT INTO public.service_area (id, tag, title, description, cta_text) VALUES
  (1, '— Zone d''intervention', 'Jura & Ain, depuis Cize.',
   'HCE intervient autour de Cize pour les cours, allées, parkings, travaux de terrassement et finitions extérieures.',
   'Votre commune n''est pas listée ? On se déplace jusqu''à 60 km.') ON CONFLICT (id) DO NOTHING;

INSERT INTO public.service_area_cities (name, is_headquarters, display_order) VALUES
  ('Cize', true, 1),
  ('Lons-le-Saunier', false, 2),
  ('Saint-Claude', false, 3),
  ('Champagnole', false, 4),
  ('Bourg-en-Bresse', false, 5),
  ('Oyonnax', false, 6),
  ('Nantua', false, 7),
  ('Pont-d''Ain', false, 8);

INSERT INTO public.gallery_section (id, subtitle, title) VALUES
  (1, '— Plus de 1000 chantiers livrés depuis 2012', 'Nos réalisations.') ON CONFLICT (id) DO NOTHING;
