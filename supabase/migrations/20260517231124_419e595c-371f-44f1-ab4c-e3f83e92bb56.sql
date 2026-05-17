
CREATE TYPE public.content_type AS ENUM ('text', 'image', 'richtext');

CREATE TABLE public.site_content_fields (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  content_type public.content_type NOT NULL DEFAULT 'text',
  content_value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (site_id, section_key, field_key)
);

CREATE INDEX idx_site_content_fields_site ON public.site_content_fields(site_id);

ALTER TABLE public.site_content_fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site content fields public read"
  ON public.site_content_fields FOR SELECT
  USING (true);

CREATE POLICY "admins manage site content fields"
  ON public.site_content_fields FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER touch_site_content_fields_updated_at
  BEFORE UPDATE ON public.site_content_fields
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
