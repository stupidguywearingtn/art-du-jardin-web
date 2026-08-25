
-- ============ WHY_US_SECTION ============
CREATE TABLE IF NOT EXISTS public.why_us_section (
  id INT PRIMARY KEY DEFAULT 1,
  tag TEXT,
  title TEXT,
  cta_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT why_us_section_single_row CHECK (id = 1)
);
GRANT SELECT ON public.why_us_section TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.why_us_section TO authenticated;
GRANT ALL ON public.why_us_section TO service_role;
ALTER TABLE public.why_us_section ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "why_us_section public read" ON public.why_us_section;
CREATE POLICY "why_us_section public read" ON public.why_us_section FOR SELECT USING (true);
DROP POLICY IF EXISTS "why_us_section admin write" ON public.why_us_section;
CREATE POLICY "why_us_section admin write" ON public.why_us_section FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ WHY_US_CARDS ============
CREATE TABLE IF NOT EXISTS public.why_us_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.why_us_cards TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.why_us_cards TO authenticated;
GRANT ALL ON public.why_us_cards TO service_role;
ALTER TABLE public.why_us_cards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "why_us_cards public read" ON public.why_us_cards;
CREATE POLICY "why_us_cards public read" ON public.why_us_cards FOR SELECT USING (true);
DROP POLICY IF EXISTS "why_us_cards admin write" ON public.why_us_cards;
CREATE POLICY "why_us_cards admin write" ON public.why_us_cards FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ QUOTE_SECTION ============
CREATE TABLE IF NOT EXISTS public.quote_section (
  id INT PRIMARY KEY DEFAULT 1,
  tag TEXT,
  title TEXT,
  subtitle TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT quote_section_single_row CHECK (id = 1)
);
GRANT SELECT ON public.quote_section TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_section TO authenticated;
GRANT ALL ON public.quote_section TO service_role;
ALTER TABLE public.quote_section ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "quote_section public read" ON public.quote_section;
CREATE POLICY "quote_section public read" ON public.quote_section FOR SELECT USING (true);
DROP POLICY IF EXISTS "quote_section admin write" ON public.quote_section;
CREATE POLICY "quote_section admin write" ON public.quote_section FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ PROJECT_TYPES ============
CREATE TABLE IF NOT EXISTS public.project_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  description TEXT,
  price_from NUMERIC,
  price_unit TEXT NOT NULL DEFAULT '€/m²',
  show_price BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_types TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_types TO authenticated;
GRANT ALL ON public.project_types TO service_role;
ALTER TABLE public.project_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "project_types public read" ON public.project_types;
CREATE POLICY "project_types public read" ON public.project_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "project_types admin write" ON public.project_types;
CREATE POLICY "project_types admin write" ON public.project_types FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SEED DATA ============
INSERT INTO public.why_us_section (id, tag, title, cta_text) VALUES
  (1, '— Pourquoi HCE', 'Quatre raisons, une certitude.', 'Convaincu ? Recevez un devis personnalisé.') ON CONFLICT (id) DO NOTHING;

INSERT INTO public.why_us_cards (title, description, icon_name, display_order, active) VALUES
  ('Enrobé à chaud', 'Pose à la main à 180°C, compactage maîtrisé pour une durabilité maximale.', 'flame', 1, true),
  ('1000+ chantiers', 'Plus de 1000 chantiers réalisés dans le Jura et l''Ain depuis 2012, 14 années d''expérience.', 'star', 2, true),
  ('Devis détaillé', 'Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.', 'file-text', 3, true),
  ('Finitions soignées', 'Bords nets, raccords maîtrisés, surface plane et homogène jusqu''à la dernière passe.', 'shield-check', 4, true);

INSERT INTO public.quote_section (id, tag, title, subtitle) VALUES
  (1, '— Demande de devis', 'Demandez votre devis', 'réponse sous 24 à 48h.') ON CONFLICT (id) DO NOTHING;

-- show_price=false partout : HCE ne communique pas de prix indicatif en ligne
-- (retire aussi le "price_from" pour ne pas laisser un chiffre fantome dans
-- les donnees, meme non affiche).
INSERT INTO public.project_types (slug, label, description, price_from, price_unit, show_price, display_order, active) VALUES
  ('cour', 'Cour privée', 'Enrobé à chaud, compactage', NULL, '€/m²', false, 1, true),
  ('allee', 'Allée', 'Bordures + finition soignée', NULL, '€/m²', false, 2, true),
  ('parking', 'Parking pro', 'Voirie poids lourds possible', NULL, '€/m²', false, 3, true),
  ('preparation', 'Préparation seule', 'Décaissement + nivellement', NULL, '€/m²', false, 4, true)
  ON CONFLICT (slug) DO NOTHING;
