-- has_role() est utilisee dans les policies RLS (user_roles, site_content,
-- site_content_fields, storage.objects, etc.) mais son EXECUTE n'a jamais
-- ete accorde explicitement aux roles anon/authenticated sur ce projet
-- (recree par migration brute, sans les grants par defaut de Lovable).
-- Consequence : toute requete authentifiee touchant une policy qui appelle
-- has_role() echoue avec "permission denied for function has_role" (42501),
-- donc isAdmin restait bloque a false cote client quel que soit le compte.
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;
