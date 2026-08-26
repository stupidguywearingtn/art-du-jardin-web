-- service_area_cities et why_us_cards ont une PK uuid generee aleatoirement
-- sans contrainte unique naturelle : leurs seeds utilisaient "on conflict (id)
-- do nothing", qui ne peut jamais matcher un id fraichement genere. Consequence
-- : chaque replay de migration (fait plusieurs fois lors du recreate du
-- projet) a duplique les 8 villes et les 4 cartes "Pourquoi HCE". Deja
-- nettoye en direct sur la prod (delete des doublons) ; cette migration
-- ajoute la contrainte manquante pour empecher toute recidive.
alter table public.service_area_cities add constraint service_area_cities_name_key unique (name);
alter table public.why_us_cards add constraint why_us_cards_title_key unique (title);
