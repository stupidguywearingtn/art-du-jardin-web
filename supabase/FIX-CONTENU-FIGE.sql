-- ============================================================
-- HCE — REMISE EN CONFORMITE DU CONTENU FIGE (base de production)
-- ============================================================
-- A coller dans : Supabase > projet hce-btp > SQL Editor > Run
--
-- POURQUOI CE FICHIER
-- Le contenu de la section "Demande de devis" n'est pas dans le code :
-- il vit dans la table public.project_types de la base. Le 25/08/2026 a
-- 22:11, la base a ete recreee sur un nouveau projet Supabase et les
-- migrations d'origine ont ete rejouees : elles ont reinsere les valeurs
-- d'AVANT les corrections client (prix visibles, libelle "Allée").
-- Corriger les fichiers ne corrige pas les lignes deja inserees : il faut
-- cet UPDATE, une fois, sur la base.
--
-- Ce script est idempotent : on peut le relancer sans risque.
-- Il ne touche a AUCUNE autre table (ni photos, ni galerie, ni devis recus).
-- ============================================================

begin;

-- 1. Aucun prix affiche au visiteur, sur aucun type de projet.
update public.project_types
   set show_price = false,
       price_from = null,
       updated_at = now()
 where show_price is true
    or price_from is not null;

-- 2. Le type 2 s'appelle "Chemin" (correction client), jamais "Allée".
update public.project_types
   set label = 'Chemin',
       description = 'Bordures + finition soignée',
       updated_at = now()
 where slug = 'allee'
   and label <> 'Chemin';

-- 3. Libelle du parking aligne sur la version validee.
update public.project_types
   set description = 'et grand espace',
       updated_at = now()
 where slug = 'parking'
   and description <> 'et grand espace';

-- 4. La valeur par defaut de la colonne redevient false : une ligne creee
--    plus tard sans preciser show_price n'affichera plus de prix.
alter table public.project_types
  alter column show_price set default false;

commit;

-- Verification (doit renvoyer 4 lignes, show_price = false, price_from = null,
-- et le libelle "Chemin" en position 2) :
select display_order, slug, label, description, price_from, show_price
  from public.project_types
 order by display_order;
