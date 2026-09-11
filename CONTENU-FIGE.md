# Contenu figé — HCE BTP

Décisions **validées par le client**. Elles ne se rediscutent pas et ne doivent
réapparaître sous aucune forme, ni dans le code, ni dans un seed, ni dans la base.

Le script `npm run check:fige` échoue si une de ces valeurs revient dans le repo.

## Règles

| Interdit | Valeur validée |
|---|---|
| Un prix visible par le visiteur (`show_price = true`, `price_from` non nul) | Aucun prix en ligne, nulle part |
| `Allée` comme libellé de type de projet | `Chemin` |
| `180°C` / `160°C` | `150°C` |
| `2005` comme année de création | `2012` |
| `20 années d'expérience` | `14 années d'expérience` |
| `devis sous 48h`, `réponse sous 24 à 48h`, `sous 48 heures` | `Devis détaillé` (aucune promesse de délai) |
| `posé au finisseur` | `posé à la main` |
| `enrobé fin ou épais` | `enrobé sous différentes granulations` |
| `Garantie & SAV` | `Finition soignée` / `Travail de qualité` (garder la mention légale « garantie décennale ») |
| `Reprise immédiate` | `Demande de validation` |
| Section avis / témoignages | Supprimée (demande client) |

## Pourquoi ces valeurs sont déjà revenues une fois

Le 25/08/2026 à 22h11, la base a été recréée sur un nouveau projet Supabase
(l'ancienne était sur Lovable Cloud, hors d'accès). Les migrations d'origine ont
été rejouées **telles quelles** : elles ont réinséré les valeurs d'avant les
corrections client. Les corrections faites 20 minutes plus tard dans les fichiers
de migration n'ont rien changé — une migration déjà jouée ne rejoue jamais.

Résultat : les 4 lignes de `project_types` portent toutes le même `updated_at`
(`2026-08-25T20:11:52Z`) et les valeurs pré-correction (prix visibles, « Allée »).

**Règle qui en découle : une correction de contenu n'est terminée que quand elle
est faite aux TROIS endroits.**

1. le code (fallback du composant),
2. les seeds (`supabase/SETUP-PROD.sql` + migrations),
3. **la base de production** (UPDATE, ou édition inline en mode admin).

Corriger seulement 1 et 2 donne l'illusion que c'est réglé : le site continue de
servir les lignes de la base.

## Où vit quoi

| Contenu | Source réelle |
|---|---|
| Types de projet du simulateur (libellés, prix, ordre) | table `project_types` |
| Titre de la section devis | table `quote_section` |
| Cartes « Pourquoi HCE » | table `why_us_cards` |
| Zone d'intervention + villes | tables `service_area`, `service_area_cities` |
| Titre de la section réalisations | table `gallery_section` |
| Textes édités en mode admin | table `site_content_fields` |
| FAQ, marquee, hero, pages services | **code** (`src/components/sections.tsx`, `src/routes/`) |

## Pièges connus

- `supabase/SETUP-PROD.sql` contient un seed de `gallery_photos` : **ne jamais le
  relancer** sur la prod, il repeuple la galerie.
- `supabase/FIX-CONTENU-FIGE.sql` est le script sûr à relancer : il ne touche que
  `project_types`.
