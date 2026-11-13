# SEO-JOURNAL — hcebtp.com

Mémoire de la maintenance SEO/GEO quotidienne. **Chaque run démarre sans aucun
souvenir : ce fichier est la seule continuité.** À lire en entier avant d'agir,
et à compléter en fin de run.

---

## État des lieux

> ✅ **13/11/2026 — Déploiement OK** (`ee6d9ff` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200, chiffres = banc du 12/11). Chantier (**contenu**, après un jour
> technique) : **`/arnaque-goudronnage`** (10 656, lastmod 11/10) +1 Q/R **« Y a-t-il eu des
> arnaques au goudronnage dans le Jura ? »** — alerte réelle de la **gendarmerie du Jura**
> lue (Plein Air, 23/03/2021 : « Plusieurs faits ont été dénoncés dans le département ces
> derniers jours » ; pas de devis/contrat, goudron de mauvaise qualité, prix qui évolue ;
> conseils : 17, ne rien signer/payer, relever la plaque). Présentée **datée 2021**, + phrase
> « aucune alerte plus récente Jura/Ain retrouvée ». Rien trouvé pour l'Ain (3 recherches).
> **Pas de phrase sur la saison de pose** (Hypothèse du 22/10 non tranchée). Source ajoutée,
> `datePublished` figé au 11/10 (il suivait le lastmod), lastmod + `llms.txt` 13/11. Banc
> local : **11 880 car.**, FAQ 7/7. Build OK, `check:fige` OK. Archive : état + positions 13/10.

> ✅ **12/11/2026 — Déploiement OK** (`2b3c08e` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; `/zone-intervention` 11 143 = banc du 11/11). Chantier
> (**technique — maillage + titres**, après un jour contenu) : (1) **Hypothèse du 01/11
> tranchée** : les 23 photos servies sur `/realisations/cour-allee-privee` ont été relues
> (planche-contact, rendu Playwright de la prod) → enrobé + bordures béton + bandes de pavés /
> dalles en rive (4 photos), **aucun médaillon visible**. Donc `RELATED_SERVICES` du dossier
> gagne `maconnerie-generale` et `bordures-murets` (lien retour + `about` JSON-LD 2 → 4), et
> la raison du lien `maconnerie-generale` → dossier passe de « pavés, dallages et médaillons…
> en photos » à « des bandes de pavés et de dalles posées en rive d'enrobé, en photos ».
> (2) Bloc « Voir aussi » des 4 `/realisations/*` : les H2 « — Autres réalisations » / « — Les
> prestations mises en œuvre » (identiques sur 4 pages) deviennent des sur-titres ; H2 =
> questions (« Quels autres chantiers d'HCE peut-on voir en photos ? », « Quels services
> d'HCE ce dossier « {titre} » illustre-t-il ? ») + 1 phrase de réponse qui décrit les liens
> (rien de neuf affirmé). Banc local (`vite dev`) : cour 10 686, parking 11 659, prépa
> 11 139, chantier 10 385, maçonnerie 10 021 ; mobile 390 px sans débordement (SSR sans JS).
> `lastmod` / `llms.txt` non touchés (liens et titres seuls). Build OK, `check:fige` OK.
> Archive : état + positions du 12/10.
> ✅ Vérifié en prod (`b1bd28e`, `success`) : cour 10 696, parking 11 667, H2 question servi,
> maçonnerie 10 021 (= banc), IndexNow 16 URLs → 200.

> ✅ **11/11/2026 — Déploiement OK** (`b8cbaca` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; services = H2 du 10/11 en ligne, ex. enrobé 13 463). Chantier
> (**contenu**, après un jour technique) : **`/zone-intervention`** (8 784, lastmod 30/09 — la
> plus ancienne) +1 Q/R **« Dans le Jura, à qui demander l'autorisation de raccorder sa cour à
> une route départementale ? »**. Angle local, complémentaire de la règle générale déjà sur
> `cour-allee-privee` (L113-2, R*116-2) : Département du Jura, règlement de voirie
> départementale du 28/05/2010 (lu dans 2 arrêtés jura.fr), exemple réel = arrêté du
> 11/04/2024, accès riverain RD 39 Châtillon, délégation ARD Champagnole (pente ≤ 5 %,
> « ne pas envoyer l'eau vers la chaussée », buse Ø 300 mm × 6 m + têtes de sécurité, travaux
> ≤ 14 j, 5 ans précaire et révocable, redevance 3,92 €/an) — présenté comme un dossier, pas un
> barème. **Rien d'affirmé sur les démarches faites par HCE.** + lien visible vers
> `cour-allee-privee`, lead complété. Banc local : **11 143 car.**, FAQ 5/5, lastmod +
> `llms.txt` 11/11. Build OK, `check:fige` OK, `verif-lastmod` : seul écart connu `/`.
> Archive : positions du 11/10.
> ✅ Vérifié en prod (`8ea9744`, `success`) : `/zone-intervention` 11 143 car. (= banc), FAQ
> 5/5, `llms.txt` (Châtillon servi), IndexNow 16 URLs → 200.

> ✅ **10/11/2026 — Déploiement OK** (`d65ec0d` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; `/contact` 7 314 : Q/R du 09/11 en ligne). Chantier (**technique —
> titres H2 vs requêtes**, après un jour contenu ; veille 09/11) : sur les 6 `/services/*`,
> les H2 génériques « Nos prestations » / « Comment HCE travaille » (identiques sur 6 pages)
> deviennent des questions ciblées (requête + zone), chacune suivie d'une réponse directe
> de 1-2 phrases qui **résume uniquement** `prestations` / `methode` (rien de neuf affirmé).
> Champ `sections` dans `ServiceData`. Gabarit : les phrases « Vous avez un projet de
> {titre} ? », « Demander un devis pour {titre} » et les `alt` de galerie/héros utilisent
> `schemaName ?? title` → fin de « Demander un devis pour vous avez un projet
> d'aménagement… » sur `finitions-soignees` (H1 **non touché**, toujours à soumettre au
> client). Banc local : services +350 à +550 car. (ex. enrobé 13 463), 10 autres URLs
> identiques à la prod, FAQ 6/6 pages OK, mobile 390 px sans débordement. `lastmod` non
> touché (aucun fait nouveau). Build OK, `check:fige` OK. Archive : MAJ « en attente » 07-08/10.
> ✅ Vérifié en prod (`a5c667f`, `success`) : enrobé 13 463 / finitions 11 394 car. (= banc),
> H2 question servi, plus de « devis pour vous avez un projet », IndexNow 16 URLs → 200.

> ✅ **09/11/2026 — Déploiement OK** (`25d76aa` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; maçonnerie 9 592, correction « moins de 5 km » du 08/11 en ligne).
> Lundi : veille (voir « Techniques apprises »). Chantier (**contenu**, après un jour
> technique) : **`/contact`** (5 733, la plus maigre hors accueil) +1 Q/R **« Comment mesurer
> la surface de sa cour ou de son chemin avant de demander un devis ? »** (le formulaire
> demande longueur × largeur ; rien sur le site n'aidait à les obtenir). Contenu : calcul
> rectangle / découpage triangles / bande pour un chemin, outils « Mesurer une surface » et
> « Mesurer une distance » de **cartes.gouv.fr** (IGN, inauguré le 25/06/2026, successeur du
> Géoportail — vérifié sur ign.fr et l'aide cartes.gouv.fr), limites (arbres, cadastre = toute
> la parcelle), case « Je ne connais pas les dimensions » du formulaire, surface remesurée à la
> visite. **Aucun prix, aucun délai.** Banc local : **7 314 car.**, FAQ 5/5, lead « Quatre » →
> « Cinq », lastmod + `llms.txt` 09/11. Build OK, `check:fige` OK, `verif-lastmod` : seul
> écart connu `/`. Archive : « Chantiers faits » des 04-08/10.
> ✅ Vérifié en prod (`9cc4500`, `success`) : `/contact` 7 314 car., FAQ 5/5, `llms.txt`
> 09/11 (cartes.gouv.fr servi), IndexNow 16 URLs → 200.

> ✅ **08/11/2026 — Déploiement OK** (`e2c963c` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; `maconnerie-generale` 9 583 : Q/R du 07/11 en ligne). Chantier
> (**technique — cohérence factuelle**, après un jour contenu) : la distance station
> Météo-France de Champagnole ↔ Cize est tranchée. Station 39097003 : 46°45'24"N / 5°53'09"E
> (relu sur la fiche climatologique, data.gouv). Siège géocodé par la BAN (Géoplateforme,
> `40 Avenue Etienne Lamy 39300 Cize`, score 0,95) : 46,7235 / 5,9188 → **4,5 km** ;
> centroïde de Cize → 4,8 km. Le « 2 km » était faux depuis les deux points : remplacé par
> « à moins de 5 km » (formule déjà servie sur `/zone-intervention` et `enrobe-a-chaud`) dans
> 2 Q/R de `/services/*` (maçonnerie, bordures-murets) et 2 passages de `llms.txt`. Marqueur
> « Cize · Siège » de la carte : centroïde → adresse du siège (46,7234 / 5,9186, = JSON-LD et
> `/contact`). `lastmod` non touché (correction de 2 mots). Build OK, `check:fige` OK.
> Archive : blocs d'état 07-08/10 + positions 05, 07, 08/10.
> 🆕 Relevé : la carte affiche « 120 / 85 / 42 / 38 / 95 / 67 chantiers réalisés » par ville
> (`InteractiveMap.tsx`) — **chiffres sans source connue**, non touchés (voir Hypothèses 08/11).
> ✅ Vérifié en prod (`e1f7d80`, `success`) : 0 « 2 km de Cize » servi (maçonnerie,
> bordures-murets, `llms.txt`), IndexNow 16 URLs → 200.

> ✅ **07/11/2026 — Déploiement OK** (`5928665` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200, mêmes valeurs qu'au 06/11). Chantier (**contenu**, après un jour
> technique) : **`/services/maconnerie-generale`** (8 040, la plus maigre des services) +1 Q/R
> **« Des pavés en béton tiennent-ils au gel et au sel de déneigement dans le Jura ? »**
> (« déverglaçage » / option « D » absents de la page). Sources : référentiel NF 072 « Pavés
> de voirie en béton » (CERIB / AFNOR Certification, rév. 2, juin 2016 : option « + D »,
> annexe D de NF EN 1338, perte moyenne ≤ 1,0 kg/m², aucun individuel > 1,5 ; marquage
> « T5 + D » ; option au choix du fabricant, non liée au climat) ; Météo-France Champagnole
> (111,7 j de gel, déjà cité ailleurs) ; guide CERIB 2017 (pose sur mortier +5 à +30 °C).
> **Rien d'affirmé sur les produits posés par HCE.** Banc local : **9 583 car.**, FAQ 8/8,
> lastmod + `llms.txt` 07/11. Build OK, `check:fige` OK, `verif-lastmod` : seul écart connu
> `/`. Archive : bloc d'état du 07/10.
> ✅ Vérifié en prod (`018f9b5`, `success`) : `maconnerie-generale` 9 583 car., FAQ 8/8,
> `llms.txt` 07/11, IndexNow 16 URLs → 200.

> ✅ **06/11/2026 — Déploiement OK** (`074ed2b` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200, valeurs identiques au 04/11 ; pas de run le 05/11). Chantier
> (**technique — données structurées**, après un jour contenu) : les 6 blocs `Service` de
> `/services/*` reçoivent un `@id` stable (`…/services/<slug>#service`) ; le `WebPage` des
> 4 `/realisations/*` gagne un `about` qui pointe vers ces `@id`, construit depuis
> `RELATED_SERVICES` (le même tableau que la liste visible « Les prestations mises en
> œuvre » : pas de lien de données sans lien visible). Pas de `name` dans `about` (le nom
> fait foi sur la page du service ; les libellés de liens diffèrent de `schemaName`).
> Accueil **non touché** (catalogue `hasOfferCatalog` : noms plus longs que les pages
> service, y poser le même `@id` donnerait deux noms au même nœud). Banc local : texte servi
> 16/16 identique à la prod, nombre de blocs inchangé, slug inconnu = Organization seul.
> `lastmod` non modifié (pas de contenu). Build OK, `check:fige` OK. Archive : blocs d'état
> du 05/10 et du 06/10.
> ✅ Vérifié en prod (`e5dba9c`, `success`) : `@id` servi sur `/services/enrobe-a-chaud`,
> `about` (2 services) sur `/realisations/parking-voirie-pro`, 16/16 en 200, IndexNow 16 URLs → 200.

> ✅ **04/11/2026 — Déploiement OK** (`34d4a0c` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; les 4 `/realisations/*` servent bien 4 JSON-LD : WebPage du 03/11 en
> ligne). Chantier (**contenu**, après un jour technique) : **`/realisations/parking-voirie-pro`**
> (la plus maigre des réalisations, 8 468 car.) +1 Q/R **« Un parking en enrobé doit-il avoir
> un séparateur d'hydrocarbures et un dossier « loi sur l'eau » ? »** (« hydrocarbure » n'était
> sur le site que pour les taches sur cour ; « 2.1.5.0 » absent). Sources : doctrine 2.1.5.0 de
> la préfecture du Var / DDTM (libellé de la rubrique cité verbatim : déclaration > 1 ha projet
> + bassin amont intercepté, autorisation ≥ 20 ha ; attention particulière > 30 places ;
> parking non revêtu compté) — présentée comme exemple départemental, pas comme règle du Jura ;
> GRAIE, rendez-vous du 08/12/2004 à Annemasse (ruissellement < 5 mg/l, souvent < 1 mg/l
> Grand Lyon ; pollution « essentiellement particulaire » ; séparateurs Vénissieux 1995 :
> +14 % à -71 % sur gazole ; séparateur réservé aux zones à risque accidentel). **Rien
> d'affirmé sur la pratique d'HCE.** Banc local (`vite dev --host 127.0.0.1`) : **11 212 car.**,
> FAQ 7/7, lead « six » → « sept », lastmod + `llms.txt` 04/11. Build OK, `check:fige` OK,
> `verif-lastmod` : seul écart connu `/`. Archive : bloc d'état du 04/10.
> ✅ Vérifié en prod (`086ca80`, `success`) : `parking-voirie-pro` 11 212 car., FAQ 7/7,
> `llms.txt` 04/11, IndexNow 16 URLs → 200.

> ✅ **03/11/2026 — Déploiement OK** (`9899c8f` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200 ; `preparation-terrassement` 10 703, valeurs identiques au 02/11).
> Chantier (**technique — données structurées**, après un jour contenu) : relecture
> `seo-schema` des JSON-LD servis sur les 16 URLs. Réponse à la question ouverte depuis le
> 29/10 : les 4 `/realisations/*` ont **déjà** un `BreadcrumbList` ; le bloc manquant était
> un **nœud de page** (toutes les autres URLs portent WebPage / CollectionPage / ContactPage /
> Article / Service). Ajout d'un `WebPage` (`@id` = URL, `name`/`description` = meta,
> `inLanguage`, `isPartOf` → `@id` du CollectionPage `/realisations`, `publisher` →
> `#business`, `dateModified` lu dans `PAGE_UPDATED` = date visible, émis seulement si le bloc
> daté est rendu ; rien pour un slug inconnu). Pas d'`about` vers les services : leurs blocs
> `Service` n'ont pas d'`@id` (pointeur mort). Banc local : 4/4 pages **3 → 4 JSON-LD**,
> texte servi inchangé, slug inconnu = Organization seul. `lastmod` non modifié (pas de
> contenu). Build OK, `check:fige` OK. Archive : rien (pas d'entrée du 03/10).
> ✅ Vérifié en prod (`1faa4a7`, `success`) : 4/4 `/realisations/*` servent 4 JSON-LD, texte
> inchangé, IndexNow 16 URLs → 200.

> ✅ **02/11/2026 — Déploiement OK** (`d754824` : statut GitHub `success`). Prod = dernier
> commit (16/16 en 200, valeurs identiques au 01/11 ; maillage maçonnerie en ligne).
> Lundi : veille (voir « Techniques apprises »). Chantier (**contenu**, après un jour
> maillage) : **`/realisations/preparation-terrassement`** (la plus maigre des réalisations,
> 8 359 car., inchangée depuis le 25/09) +1 Q/R **« Le fond du terrassement est argileux et
> détrempé : que fait-on avant de remblayer ? »** (« chaux » absente du site ; question de
> saison : novembre-décembre = mois les plus pluvieux à Champagnole). Trois issues (attendre /
> purger-substituer sur géotextile / traiter à la chaux). Sources : guide FRTP Normandie
> sept. 2019 (chaux vive : baisse de la teneur en eau, floculation, IPI en hausse ; « pas de
> mise en œuvre sous 5 °C » ; renvoie au GTS SETRA/LCPC 2000 et à NF P94-100) ; Chambre
> d'agriculture nov. 2016 (analyse préalable obligatoire, terre végétale exclue). **Rien
> d'affirmé sur la pratique d'HCE** (pas dit qu'HCE traite à la chaux) : renvoi au devis
> détaillé. Banc local : **10 703 car.**, FAQ 6/6, lead « cinq » → « six », lastmod +
> `llms.txt` 02/11. Build OK, `check:fige` OK, `verif-lastmod` : seul écart connu `/`.
> Archive : bloc d'état du 02/10.
> ✅ Vérifié en prod (`e5e2f98`, `success`) : `preparation-terrassement` 10 703 car., FAQ 6/6,
> `llms.txt` 02/11, IndexNow 16 URLs → 200.

> ✅ **31/10/2026 — Déploiement OK** (`573396f` : Vercel `READY`, production). Prod =
> dernier commit (16/16 en 200, valeurs identiques au 30/10). Chantier (**contenu**, après
> un jour technique) : **`/realisations/chantier-en-cours`** (la plus maigre des
> réalisations, 7 648 car.) +1 Q/R **« Pourquoi voit-on une ligne entre deux bandes
> d'enrobé, et est-ce un défaut ? »** (« joint » absent du site). Sources : P. Langlois,
> Laboratoire des chaussées, « Confection des joints longitudinaux et transversaux »
> (archive Bitume Québec : compacité du joint 4 à 10 % plus faible, chevauchement 25-50 mm,
> liant d'accrochage sur le joint, compactage côté chaud à 150 mm puis recouvrement 150 mm,
> objectif 1-2 %) ; bulletin MTQ vol. 7 n° 8, août 2002 (joint transversal dès un arrêt
> d'une quinzaine de minutes). Sources « route au finisseur » dites comme telles ; rien
> affirmé sur HCE au-delà de « posé à la main, 150 °C ». Banc local (`vite dev`) :
> **9 956 car.**, FAQ 6/6, lead « cinq » → « six », lastmod + `llms.txt` 31/10.
> Build OK, `check:fige` OK, `verif-lastmod` : seul écart connu `/`. Archive : entrées du 01/10.
> ⚠️ WebFetch d'une URL non issue d'une recherche (PDF MTQ 2009 déjà cité) = refusée en run
> automatique ; passer par WebSearch puis WebFetch des URL renvoyées.
> ✅ Vérifié en prod (`a4550c0`) : `chantier-en-cours` 9 956 car., FAQ 6/6, `llms.txt` à
> jour, IndexNow 16 URLs → 200.

> ✅ **30/10/2026 — Déploiement OK** (`4e062af` : statut GitHub `success`). Prod =
> dernier commit (16/16 en 200, valeurs du 29/10 : `cour-allee-privee` 10 081). Chantier
> (**technique — maillage**, après un jour contenu) : graphe des liens servis (HTML sans JS,
> 16 URLs) → `/arnaque-goudronnage` n'avait que **3 pages entrantes** ;
> les 4 `/realisations/*` ne liaient pas
> `/zone-intervention`. Ajouts : ligne « À lire aussi » (zone + arnaque) dans `SeeAlso` des
> 4 `/realisations/*` (rendu dans les deux états) ; phrase de renvoi vers l'arnaque sous le
> tableau de `/zone-intervention` ; lien arnaque étendu à `/services/preparation-terrain`
> (motif : cour « goudronnée » sans fondation = signe cité sur la page arnaque).
> ⚠️ `check:fige` a bloqué une 1re formulation commençant par « Avant de signer » (motif de
> la section supprimée le 22/10) → reformulée. Banc local : arnaque **3 → 9** entrantes,
> zone **11 → 15** ; `zone-intervention` 8 605 → 8 762, `preparation-terrain` 9 121 → 9 263,
> `/realisations/*` +140 car. ; rendu sans JS à 390 px OK (pas de défilement horizontal ;
> le rendu client local plante faute de variables Supabase, normal hors Vercel). `lastmod`
> non modifié (maillage). Build OK, `check:fige` OK. Archive : entrées du 30/09.
> ✅ Vérifié en prod (`f487f71`, `success`) : arnaque 9 entrantes, zone 15, valeurs de car.
> identiques au banc local, IndexNow 16 URLs → 200.

> ✅ **29/10/2026 — Déploiement OK** (`445c79c` : statut GitHub `success`). Prod =
> dernier commit (16/16 en 200 ; +63 car. du 28/10 visibles sur les 4 `/realisations/*`,
> ex. `cour-allee-privee` 7 733). Chantier (**contenu**, après un jour technique) :
> **`/realisations/cour-allee-privee`** (inchangée depuis le 23/09) +1 Q/R **« Les racines
> d'un arbre peuvent-elles soulever une allée en enrobé, et que faire avant de goudronner ? »**
> (« racine » absente du site hors une mention sur `/zone-intervention`). Sources : Smiley
> 2008, *Arboriculture & Urban Forestry* 34(3) p. 179-183 (poussée liée à la surface de
> contact racine/revêtement ; barrière verticale rigide 45 cm efficace, film PE 0,15 mm
> franchi 3/5 ; essai US, trottoirs béton — présenté comme indication) ; INC fiche J 322
> (code civil art. 671 : 2 m / 50 cm ; art. 673 : couper soi-même les racines du voisin à
> la limite, droit imprescriptible). Rien d'affirmé sur la pratique d'HCE au-delà de
> « signaler les arbres à la visite, devis détaillé ». Banc local : **10 081 car.**, FAQ
> 6/6, lead « cinq » → « six », lastmod + `llms.txt` 29/10. Build OK, `check:fige` OK,
> `verif-lastmod` : seul écart connu `/`. Archive : entrées du 29/09.
> ✅ Vérifié en prod (`338be6b`, `success`) : `cour-allee-privee` 10 081 car., FAQ 6/6,
> lastmod sitemap 2026-10-29, `llms.txt` à jour, IndexNow 16 URLs → 200.

> ✅ **28/10/2026 — Déploiement OK** (`4acdaf3` : statut GitHub `success`). Prod =
> dernier commit (16/16 en 200, valeurs du 27/10 : `preparation-terrain` 9 121). Chantier
> (**technique — maillage**, après un jour contenu) : les 4 `/realisations/*` n'avaient
> aucun lien vers `/contact` ni `/mentions-legales`. ⚠️ Piège évité : le CTA bas de ces
> pages n'est rendu **qu'après chargement client** (état serveur = état de chargement) —
> un premier ajout là n'apparaissait pas dans le HTML servi (0 lien au banc local). Ligne
> « HCE · Cize, Jura · 03 84 52 61 48 · Contact · Mentions légales » placée dans `SeeAlso`
> (rendu dans les deux états). Banc local : 4/4 pages servent `href="/contact"` et
> `href="/mentions-legales"`, +63 car. par page, rendu sans JS vérifié à 390 px (pas de
> défilement horizontal). `lastmod` non modifié (maillage, pas de contenu). Build OK,
> `check:fige` OK. Archive : entrées du 28/09.
> ✅ Vérifié en prod (`0dc0b32`, `success`) : `href="/contact"` servi sur les 4
> `/realisations/*`, IndexNow 16 URLs → 200.

> ✅ **27/10/2026 — Déploiement OK** (`192d0dd` : statut GitHub `success`). Prod =
> dernier commit (16/16 en 200 ; +27 car. du maillage du 26/10 visibles, ex.
> `enrobe-a-chaud` 12 809). Chantier (**contenu**, après un jour technique) :
> **`/services/preparation-terrain`** (7 165, la plus maigre des services) +1 Q/R
> **« Le gel peut-il soulever ou casser une cour en enrobé dans le Jura ? »** (0 occurrence
> de « gélif » / « dégel » sur le site avant). Sources : Bonnard & Recordon 1958 (Soc.
> suisse de géotechnique : gélif dès 3 % < 0,02 mm, sables limoneux les plus sensibles,
> 3 conditions, 80-140 cm de gel dans le Jura et les Préalpes **suisses** — présenté comme
> ordre de grandeur, côté suisse), Wikipédia « Barrière de dégel » (R411-20/R411-21,
> faiblesse maximale au dégel). Aucune barrière de dégel « Jura 39 » affirmée (pas de source
> départementale trouvée). Rien sur la pratique d'HCE au-delà du devis détaillé. Banc local :
> 7 165 → **9 121 car.**, FAQ 8/8, lead mis à jour, lastmod + `llms.txt` 27/10. Build OK,
> `check:fige` OK, `verif-lastmod` : seul écart connu `/` (depuis 22/10). Archive : entrées
> du 27/09.
> ✅ Vérifié en prod (`a1c3c96`, `success`) : `preparation-terrain` 9 121 car., FAQ 8/8,
> lastmod sitemap 2026-10-27, `llms.txt` à jour, IndexNow 16 URLs → 200.

> ✅ **26/10/2026 (lundi) — Déploiement OK** (`e0b4e35` : statut GitHub `success`). Prod =
> dernier commit (16/16 en 200, valeurs du 25/10). Chantier (**technique — maillage**,
> après un jour contenu) : `/contact` n'était lié que depuis le pied de page de l'accueil
> (0 lien entrant servi sur les 15 autres URLs). Ajout d'une ligne « Contact · Mentions
> légales » dans les pieds de page simplifiés : 6 `/services/*`, `/zone-intervention`,
> `/realisations` ; « Contact » ajouté sur `/mentions-legales` et `/arnaque-goudronnage` ;
> « Mentions légales » ajouté sur `/contact`. Banc local (`vite dev --host 127.0.0.1`) :
> `/contact` lié depuis **11 pages** (+ accueil) ; +27 car. par page touchée, rien d'autre
> ne bouge. `lastmod` / « Dernière mise à jour » **non modifiés** (pied de page seulement,
> pas de contenu). Les 4 `/realisations/*` n'ont pas de pied de page → pas touchées.
> Build OK (`npm ci` puis `npm run build`), `check:fige` OK. Veille du lundi faite
> (Techniques apprises). Archive : rien à archiver (pas de run le 26/09).
> ✅ Vérifié en prod (`adcf0ba`, `success`) : `href="/contact"` servi sur `/services/enrobe-a-chaud`
> et `/zone-intervention`, IndexNow 16 URLs → 200.

> ✅ **25/10/2026 — Déploiement OK** (`f53cb90` : statut GitHub `success`). Prod =
> dernier commit (16/16 en 200, valeurs du 24/10). Chantier (**contenu**, après un jour
> technique) : **`/services/bordures-murets`** (7 658, inchangée depuis le 17/09) +1 Q/R
> **« Faut-il un drainage derrière un muret de soutènement ? »** (0 occurrence de
> « barbacane » / « massif drainant » sur le site avant). Sources : AQC, plaquette « Murs
> de soutènement — bonnes pratiques » (nov. 2022, murs < 3 m : massif drainant sans
> fines, géotextile, drain ≥ 100 mm au-dessus de la fondation, pente 3-10 mm/m, exutoire
> EP, regards ; barbacane seule insuffisante, accord du voisin en aval) et « risques
> réels » (fév. 2011 : drainage absent/inefficace, barbacanes bouchées). Aucun chiffre de
> sinistralité (les plaquettes n'en donnent pas). Rien d'affirmé sur la pratique propre
> d'HCE (« se règle au devis détaillé »). Banc local (`vite dev`) : 7 658 → **9 506
> car.**, FAQ 6/6, lead mis à jour, lastmod + `llms.txt` 25/10. Build OK, `check:fige` OK.
> Archive : entrées du 25/09.
> ✅ Vérifié en prod (`0064f38`, `success`) : `bordures-murets` 9 506 car., FAQ 6/6,
> lastmod sitemap 2026-10-25, `llms.txt` à jour, IndexNow 16 URLs → 200.

> ✅ **24/10/2026 — Déploiement OK** (`fa4ce52` : statut GitHub `success`). Prod =
> dernier commit (15/15 en 200, valeurs du 23/10). Chantier (**technique / local**) :
> nouvelle page **`/contact`** (16ᵉ URL du sitemap) — NAP complet en clair (identique au
> bloc canonique), GPS INSEE 46.7234 / 5.9186 + lien carte OSM, `ContactPage`
> (`mainEntity` → `#business`, pas de NAP redéclaré), `BreadcrumbList`, FAQPage 4/4 =
> FAQ visible : joindre HCE, trouver la bonne Cize (Cize 01106 à 68,1 km, calculé),
> préparer une demande de devis (champs réels du formulaire, ni prix ni date ferme),
> vérifier qu'on parle à HCE (rappel du fixe, SIREN sur annuaire-entreprises). Mobile
> WhatsApp **non repris** (hypothèse ouverte). Aucune alerte « Jura » inventée. Lien
> « Contact » ajouté au pied de page de l'accueil ; sitemap, `lastmod` 24/10,
> `llms.txt`, scripts IndexNow / mesure mis à jour. Banc local : `/contact` **5 694
> car.**, 4 JSON-LD, pas de défilement horizontal à 390 px (rendu SSR contrôlé à l'œil).
> Build OK, `check:fige` OK. `verif-lastmod` : seul écart = `/` sans date visible
> (connu depuis le 22/10, suppression client). Archive : entrées du 23/09.
> ✅ Vérifié en prod (`85cec14`, `success`) : `/contact` 200, 5 694 car., FAQ 4/4, sitemap
> 16 URLs, `llms.txt` à jour, IndexNow 16 URLs → 200.

> ✅ **23/10/2026 — Déploiement OK** (`5c3e56c` : statut GitHub `success`). Prod =
> dernier commit (15/15 en 200, valeurs du 22/10). Chantier (**contenu**, après un jour
> technique) : **`/realisations/chantier-en-cours`** (5 596, la plus maigre hors accueil)
> +1 Q/R **« Quel est ce liquide noir répandu au sol juste avant l'enrobé ? »** (couche
> d'accrochage : bulletin MTQ vol. 7 n° 12, déc. 2002 — « coller ensemble deux couches
> d'enrobé », ~0,25 kg/m² de bitume résiduel, surface propre et sèche ; Bitume Québec
> 26/11/2008 « Le collage des couches »). Rien d'affirmé sur la pratique propre d'HCE
> (« dépend du support, à préciser au devis détaillé »). Banc local : 5 596 → **7 445
> car.**, FAQ 5/5, lead « quatre » → « cinq », lastmod + `llms.txt` 23/10. Build OK,
> `check:fige` OK. Archive : entrées du 22/09.
> ✅ Vérifié en prod (`079dfdf`, `success`) : `chantier-en-cours` 7 445 car., FAQ 5/5,
> `llms.txt` 23/10, IndexNow 15 URLs → 200.

> ✅ **22/10/2026 — Déploiement OK** (`87af34d` : Vercel `success`). Prod = dernier
> commit : la suppression demandée par le client (section juridique de l'accueil + Q/R
> « posé toute l'année ») est **en ligne** (0 occurrence en prod, FAQPage 5/5 = FAQ
> visible). Effet : **accueil 13 579 → 5 529 car.**, page la plus maigre du site.
> Chantier (**technique — cohérence après suppression**) : `/mentions-legales`
> renvoyait vers « les conditions d'un devis, les arrhes et l'acompte, et le délai
> d'exécution […] sur l'accueil » via `#faq` — texte devenu faux **et** ancre morte
> (aucun `id="faq"`) → phrase retirée. `lastmod` `/` 29/09 → 22/10 (contenu changé,
> plus de date visible sur l'accueil), `/mentions-legales` → 22/10, `llms.txt` daté
> 22/10 (modifié le 22/10 sans changer sa date). Ancres internes restantes : `#devis`,
> `#galerie` → existent. Build OK, `check:fige` OK. Archive : entrées du 21/09.
> ✅ Vérifié en prod (`ecb7fe7`, `success`) : `lastmod` `/` et `/mentions-legales`
> 2026-10-22, plus de renvoi « arrhes » sur `/mentions-legales`, `llms.txt` 22/10, IndexNow 15 URLs → 200.

> ✅ **21/10/2026 — Déploiement OK** (`0f8cdeb` : statut GitHub `success`). Prod =
> dernier commit (15/15 en 200, valeurs du 20/10). Chantier (**contenu**) :
> **`/realisations/parking-voirie-pro`** +1 Q/R **bornes de recharge / fourreaux avant
> l'enrobé** (CCH L113-12 à L113-14, R113-6 ; fiche service-public F38491 vérifiée le
> 12/06/2026). Le sujet « perméabilité 500 m² » était déjà traité sur `drainage-pentes`
> → pas dupliqué. Banc local : 6 356 → **8 265 car.**, FAQ 6/6, lastmod + `llms.txt`
> 21/10 (+1 Q/R autonome). Build OK, `check:fige` OK. Archive : entrées du 20/09 → 
> `docs/seo-journal-archive.md`.
> ✅ Vérifié en prod (`ec730c6`, `success`) : `parking-voirie-pro` 8 265 car., lastmod
> 2026-10-21, `llms.txt` 21/10, IndexNow 15 URLs → 200.

> ✅ **20/10/2026 — Déploiement OK** (`2d8f086` : Vercel `success`). Prod = dernier
> commit (15/15 en 200, valeurs du 19/10). Chantier (**technique**) : **meta
> descriptions** — 10 pages dépassaient 160 car. (173 à 248) → toutes ≤ 159 au banc
> local (`vite dev`), `og:description` suit (même constante). Texte visible
> inchangé (15/15 identiques), FAQ 11/11, build OK, `check:fige` OK. Pas de
> `lastmod` ni « mise à jour » touchés (contenu inchangé). `llms.txt` : rien à
> modifier (ne cite pas ces descriptions).
> ✅ Vérifié en prod (`b3a57d3`, `success` < 4 min) : descriptions ≤ 159 servies,
> textes 15/15 inchangés, IndexNow 15 URLs → 200.

> ✅ **19/10/2026 — Déploiement OK** (`9b956ab` : Vercel `READY`). Prod = dernier
> commit (15/15 en 200, valeurs du 18/10). Lundi : veille (Google met en avant les
> liens dans les réponses IA ; rapports IA de la Search Console depuis le 03/06).
> Chantier (contenu) : **`/services/maconnerie-generale`** +2 Q/R pose des pavés /
> dalles (guide CERIB 2017), 5 726 → 8 013 car. au banc local, FAQ 7/7, lastmod +
> `llms.txt` 19/10. Build OK, `check:fige` OK.
> ✅ Vérifié en prod (`87313a3`, < 100 s) : `maconnerie-generale` 8 013 car., lastmod
> 2026-10-19, `llms.txt` 19/10, IndexNow 15 URLs → 200.

> ✅ **18/10/2026 — Déploiement OK** (`e99d634` : Vercel `READY`, lu via l'API
> Vercel). Prod = dernier commit (15/15 URLs en 200, valeurs du 17/10 ; FAQ 11/11 ;
> lastmod 15/15 alignés). Chantier du jour (**technique**, après 3 jours de Q/R) :
> **poids des images**. Audit on-page des 15 URLs (title, canonical, og:url, H1
> unique, alt : tout OK) ; en revanche l'accueil chargeait **~12 Mo d'images**
> brutes depuis `/photos/` : 5 PNG de 2,5 à 3,3 Mo (`geste-enrobe-a-chaud`,
> `matiere-bordure-nette`, `process-controle-finitions`, `1.png` bandeau
> « Finitions soignées », `2.png` galerie maçonnerie) + un JPEG de 1 Mo. Copies
> **.webp** créées à côté des originaux (originaux conservés), code pointé dessus :
> 3,3 Mo → 355 Ko, 3,2 Mo → 359 Ko, 3,1 Mo → 260 Ko, 2,5 Mo → 154 Ko, 3,1 Mo →
> 282 Ko, 1,06 Mo → 314 Ko (**~16,4 Mo → ~1,7 Mo**). Rendu contrôlé à l'œil.
> Build OK, `check:fige` OK. Les valeurs servies par la base (`site_content_fields`,
> admin) priment sur ces défauts : à l'accueil, aucune n'était surchargée (URLs
> servies = défauts du code).
> ✅ Vérifié en prod (`a341c1e`, < 120 s) : 6 `.webp` en 200, plus aucun
> `/photos/*.png` dans le HTML de l'accueil ni de `maconnerie-generale`, textes
> inchangés (accueil 13 579), IndexNow 15 URLs → 200.

> ✅ **17/10/2026 — Déploiement OK** (`979e485` : Vercel `success`). Prod =
> dernier commit (15/15 URLs en 200, `finitions-soignees` 10 891 car. = Q/R du
> 16/10 en ligne). Chantier du jour (contenu, page la plus maigre après
> maçonnerie) : **`/services/drainage-pentes`** — 2 Q/R : **où envoyer l'eau
> d'une cour (rue / réseau / parcelle)** (C. civ. 641 et 681, réponse min.
> Intérieur JO Sénat 2/06/2016 « ne constitue pas une obligation pour les
> communes », art. L2224-10 CGCT → demander le zonage pluvial en mairie) et
> **classe de caniveau à grille devant un garage** (NF EN 1433, A 15 → F 900 ;
> repères d'usage Hauraton A15/B125/C250/D400). FAQ 5 → 7, 5 856 → 9 557 car.
> (banc local), `PAGE_UPDATED` + lastmod 17/10, `llms.txt` 17/10 (+2 Q/R).
> Build OK, `check:fige` OK.
> ✅ Vérifié en prod (`fbc84e5`, `success` < 90 s) : `drainage-pentes` 9 557 car.,
> lastmod 2026-10-17, `llms.txt` à jour, IndexNow 15 URLs → 200.

> ✅ **16/10/2026 — Déploiement OK** (`0c777ee` : Vercel `success`). Prod =
> dernier commit (15/15 URLs en 200, `preparation-terrain` 7 138 car. = Q/R du
> 15/10 en ligne). Chantier du jour (contenu, saisonnier) :
> **`/services/finitions-soignees`** — 2 Q/R d'entretien avant l'hiver :
> **sel de déneigement** (essai Cerema 2015 : enrobé ~91 % de résistance en eau
> salée vs ~75 % en eau douce, limites de l'essai dites) et **taches de
> gazole/huile** (solvants du bitume, bulletin MTQ 2004). FAQ 5 → 7,
> `PAGE_UPDATED` 16/10, `llms.txt` 16/10 (+2 Q/R). Banc local OK, build OK,
> `check:fige` OK. Accès robots IA vérifié pour la 1ʳᵉ fois : tout en 200.
> ✅ Vérifié en prod (`627143e`, `success` < 60 s) : 2 Q/R servies,
> `finitions-soignees` 7 399 → 10 891 car., « 16 octobre 2026 » affiché, lastmod
> 2026-10-16, `llms.txt` à jour, IndexNow 15 URLs → 200.

> ✅ **15/10/2026 — Déploiement OK** (`295ca4f` : Vercel `success`). Prod =
> dernier commit (15/15 URLs servies, valeurs du 14/10). Chantier du jour
> (contenu) : **`/services/preparation-terrain`** — deux prestations listées mais
> jamais expliquées reçoivent leur Q/R : **puits perdu** (eaux pluviales
> seulement ; rejet d'eaux usées interdit, art. 13 de l'arrêté du 7/09/2009,
> source préfecture du Doubs) et **enrochement** (vs muret). FAQ 5 → 7,
> `PAGE_UPDATED` 15/10, `llms.txt` 15/10. Banc local OK, build OK, `check:fige` OK.
> ✅ Vérifié en prod (`ebb0310`, `success` < 80 s) : 2 Q/R servies, « 15 octobre
> 2026 » affiché, `llms.txt` à jour, IndexNow 15 URLs → 200.

> ✅ **14/10/2026 — Déploiement OK** (`68466b3` : Vercel `success`). Prod =
> dernier commit (15/15 URLs = valeurs du 13/10). Chantier du jour (technique) :
> **aperçu de partage + entité locale**. L'`og:image` de tout le site (sauf
> `/services/*`) était une **capture d'une ancienne preview Lovable** sur un
> bucket tiers `r2.dev`, montrant un finisseur (contraire à « posé à la
> main ») et un titre tronqué → remplacée par `/og-hce.jpg` (vraie photo
> d'allée du dépôt, 1200×630, servie par le domaine). `LocalBusiness` →
> `HomeAndConstructionBusiness` + `image` + `hasOfferCatalog` (6 services, sans
> prix). `/services/garantie-sav` : 307 → **301**.
> ✅ Vérifié en prod (`3e40ab4`, `success` < 100 s) : `og-hce.jpg` servi (200),
> `HomeAndConstructionBusiness` en ligne, `garantie-sav` → 301, textes inchangés,
> IndexNow 15 URLs → 200.

> ✅ **11/10/2026 — LA PRODUCTION SE DÉPLOIE À NOUVEAU. Le blocage du 01/10 est
> levé.** Yanis a mergé `fix/tanstack-cve-deploy` (PR #1, commit `e3a860e`, le
> 10/10 à 22:30) : statut Vercel **`success`** sur `main`. **La dette de
> vérification en ligne est purgée, à ne pas refaire** : 14/14 URLs servent
> exactement les valeurs attendues du banc local du 08/10 (13 543 / 5 154 /
> 12 633 / … / 373 / 8 351), FAQ 11/11, lastmod 14 URLs cohérentes, `llms.txt`
> « 8 octobre 2026 », `sameAs` à 5 URLs dont PagesJaunes, `/mentions-legales`
> en 200 et liée en pied de page, six `/services/*` à 6 liens de contenu (7 pour
> `enrobe-a-chaud`). Les encadrés « blocage » ci-dessous sont **historiques**.
> Chantier du jour : **`/arnaque-goudronnage`** (15ᵉ URL). Pas de run les 09 et
> 10/10.

> 🔴 **DOMAINE — À LIRE AVANT TOUT (mis à jour le 01/10/2026).**
> **Le site est servi sur `https://www.hcetp.com`** (sans le `b`), depuis la
> bascule du 30/09/2026 (commit `f07b19f`). `hcebtp.com`, `www.hcebtp.com` et
> `hcetp.com` **redirigent en 308** vers cet hôte, vérifié au `curl` le
> 01/10/2026. La preview reste `hcebtp.lovable.app`.
> ⚠️ **Tout ce qui est écrit plus bas dans ce journal avant le 01/10/2026 nomme
> l'ANCIEN domaine `hcebtp.com`.** Ces mentions sont des relevés datés, elles
> n'ont pas été réécrites — **les lire comme de l'histoire, pas comme l'état
> actuel**. La consigne du run nomme aussi encore `hcebtp.com` : elle est périmée
> sur ce point.
> **Mesurer toujours `www.hcetp.com`.** Les scripts de `scripts/` sont déjà à jour.

*Au 09/09/2026.*

**Identité légale de l'entreprise — référence vérifiée, ne plus la rechercher.**
Relevée le 08/09/2026 au registre national des entreprises
(`recherche-entreprises.api.gouv.fr`) :

```
SIREN 521683573 · SIRET siège 52168357300039
H.C.E. - HINI - COURS - ENROBE (sigle H.C.E.) · SARL · NAF 43.12A
40 B avenue Etienne Lamy, 39300 Cize · géocodage INSEE 46.7234 / 5.9186
Entreprise active · création au registre 01/04/2010 (le site dit 2012, figé client)
```

**Le site est rendu côté serveur** : vu comme Googlebot, l'accueil renvoie
4 640 caractères de texte et tous les `<h1>`/`<h2>` dans le HTML brut. La
non-indexation n'est donc **pas** un problème de rendu JavaScript. Question
tranchée le 08/09, ne pas la rouvrir.

> ⚠️ **Nuance apportée le 14/09/2026 — le rendu serveur n'est PAS uniforme.**
> L'affirmation ci-dessus vaut pour l'accueil et les `/services/*`. Elle était
> **fausse pour les quatre `/realisations/$slug`**, qui ne servaient que 62
> caractères (« Chargement… ») : leur contenu était derrière un `if (loading)`
> alimenté par un `useEffect`, qui ne s'exécute jamais côté serveur. Corrigé le
> 14/09. **Il reste au moins un endroit dans ce cas : les cartes de la galerie
> de l'accueil** (aucun `href` vers `/realisations/*` dans le HTML servi) — voir
> le candidat n°1 des chantiers en attente.
> **Règle à en tirer : « le site est rendu côté serveur » est vrai page par
> page, jamais globalement. Un composant qui charge ses données dans un
> `useEffect` et masque tout derrière un état de chargement est invisible aux
> robots, même sur un site SSR.**

> ⚙️ **Outils de contrôle versionnés — les utiliser, ne pas en réécrire.**
> `scripts/mesure-texte-servi.mjs` (volume de texte servi, depuis le 17/09),
> `scripts/verif-faq.mjs` (le `FAQPage` correspond au texte visible, depuis le
> 23/09) et `scripts/verif-lastmod.mjs` (le `lastmod` du sitemap correspond à la
> date affichée par la page, depuis le 27/09). Les trois prennent une base ou des
> URLs en argument et marchent aussi bien sur le banc d'essai local que sur la
> production. Les deux derniers sortent en code 1 à la première incohérence :
> **les lancer avant tout push qui touche au contenu ou aux dates.**
>
> ⚙️ **Depuis le 17/09/2026, la mesure du texte servi a un instrument unique et
> versionné : `scripts/mesure-texte-servi.mjs`.** L'utiliser pour TOUTE mesure
> (production comme banc d'essai local, avant comme après). Les tables des 14,
> 15 et 16/09 ci-dessous viennent d'extracteurs jetables différents et **ne sont
> pas comparables au caractère près** avec les valeurs du 17/09 et suivantes ;
> la table de référence à jour est celle du 17/09.

**Volume de texte servi, référence mesurée le 14/09/2026** (vu comme Googlebot,
`<script>` **et** `<style>` retirés). Toute page qui s'écarte franchement de ces
valeurs signale un problème de rendu :

| URL | Texte servi |
|---|---|
| accueil | 5 160 car. |
| `/services/drainage-pentes` | 5 207 car. |
| `/services/preparation-terrain` | 4 483 car. |
| `/services/enrobe-a-chaud` | 3 784 car. |
| `/services/maconnerie-generale` | **890 car.** (pas de bloc `savoir`) |
| `/realisations/$slug` (les 4) | 357 à 386 car. *(62 avant le 14/09)* |
| `/realisations/avant-apres` | 188 car. |
| `/realisations` | ~~**404 — la route n'existe pas**~~ **créée le 20/09/2026, 6 258 car.** |

*Constats du 07/09 ci-dessous, toujours valables.*

**Le site est en ligne et sain, mais invisible.** Aucun moteur ne connaît le
domaine. Ce n'est pas un problème de code — c'est un problème de découverte.

- **Hébergement réel : Vercel**, pas Lovable Cloud. `server: Vercel` sur l'apex
  comme sur `www`. Le déploiement se fait au push sur `main`.
- **`hcebtp.com` répond 308 vers `www.hcebtp.com`.** L'hôte réellement servi est
  donc `www`. (Corrigé le 07/09 : tous les canonical pointaient vers l'apex.)
- Pages vérifiées en ligne le 07/09 : accueil et `/services/enrobe-a-chaud` en
  HTTP 200, titres et descriptions présents et distincts, `lang="fr"`.
- `robots.txt` : `Allow: /`, aucun blocage. `sitemap.xml` : HTTP 200, 12 URLs.
- Données structurées en place : `Organization` (root), `LocalBusiness` +
  `FAQPage` (accueil), `Service` (pages services). ~~Le `FAQPage` correspond bien
  à la FAQ visible — même source `FAQS`.~~ **Faux jusqu'au 09/09/2026** : la
  constante était bien commune, mais cinq réponses sur six n'étaient pas rendues
  dans la page. Corrigé le 09/09, vérifié en ligne — les six réponses sont
  maintenant dans le HTML servi.
- Le contenu figé par le client est correctement servi : 2012, 14 ans, 150 °C,
  « posé à la main », « Devis détaillé », garantie décennale, pas de section avis.

### NAP canonique — référence, ne pas laisser diverger

Tel que publié dans le pied de page du site, repris à l'identique dans le
`LocalBusiness` et dans `llms.txt` :

```
HCE / HCE SARL · 40 avenue Etienne Lamy, 39300 Cize, France
03 84 52 61 48 · sarl.hce@laposte.net · https://www.hcetp.com
Lun-Ven 8h-18h · Sam 8h-12h · Créée en 2012
SIREN 521683573 · SIRET siège 52168357300039
```

> ⚠️ **Corrigé le 07/10/2026 : ce bloc portait encore `https://www.hcebtp.com`.**
> Le domaine a basculé sur `www.hcetp.com` le 30/09 (commit `f07b19f`) et le
> run du 01/10 l'a journalisé — mais **personne n'avait corrigé le bloc de
> référence lui-même**, celui qui porte le titre « ne pas laisser diverger ». Il
> a donc affiché l'ancien domaine pendant six runs. Vérifié le 07/10 : le dépôt
> publie bien `https://www.hcetp.com` partout (15 occurrences dans `llms.txt`,
> 0 occurrence de `hcebtp` dans `public/`), et l'adresse `40 avenue Etienne
> Lamy` ci-dessus est bien celle que publient `__root.tsx`,
> `services.$slug.tsx`, `zone-intervention` et `realisations.index`.
> **Leçon : un bloc de référence ne se vérifie pas tout seul. Le relire contre
> le code, pas contre le souvenir.**
>
> ⚠️ **Ne pas confondre avec le domaine d'envoi d'e-mails, qui est resté
> `hcebtp.com` et ne doit PAS être aligné à la légère** (constaté le 07/10) :
> `src/routes/lovable/email/transactional/send.ts` (`SENDER_DOMAIN =
> "notify.hcebtp.com"`, `FROM_DOMAIN = "hcebtp.com"`) et
> `src/routes/api/public/devis.ts` (`from: 'HCE BTP <devis@hcebtp.com>'`). Ce
> sont des domaines vérifiés auprès du fournisseur d'e-mail (SPF/DKIM) : les
> changer sans que le nouveau domaine soit vérifié **casserait l'envoi des
> demandes de devis**. Voir « Hypothèses à vérifier ».

Attention : **il existe deux communes nommées Cize**, Cize 01250 dans l'Ain et
Cize 39300 dans le Jura. HCE est dans le Jura, coordonnées 46.726 / 5.914.

> Note sur l'hébergement — **tranchée par le code le 07/10/2026, la question est
> close.** Les consignes de maintenance disent « Lovable Cloud, pas Vercel » ;
> **sur le front, c'est faux, et ce n'est pas une déduction** : `vite.config.ts`
> porte en commentaire « Détachement de l'hébergement Lovable/Cloudflare →
> déploiement direct sur Vercel », force `nitro.preset = "vercel"` et épingle
> `vercel.functions.runtime`. L'en-tête `server: Vercel` en production le
> confirme, comme les statuts de déploiement Vercel lus dans l'API GitHub depuis
> le 05/10. **Ce qui reste côté Lovable** : le wrapper de build
> (`@lovable.dev/vite-tanstack-config`), l'auth et l'e-mail
> (`@lovable.dev/cloud-auth-js`, `@lovable.dev/email-js`), le backend Supabase,
> et la preview `hcebtp.lovable.app`. **La consigne est donc périmée sur le
> front et juste sur le backend.** ⚠️ Cela ne change RIEN à la règle d'action :
> **ne rien changer au déploiement**, qui reste hors de notre portée.

### ⚠️ Découverte de méthode du 13/09 — ne jamais juger une fiche sur son extrait

**C'est la leçon la plus réutilisable de ce run.** `fr.mappy.com` est remontée dans
les résultats avec un titre annonçant **« 36 av Etienne Lamy »**, soit l'ancienne
adresse. La règle en vigueur depuis le 09/09 (« toute fiche affichant encore 36 ou
Champagnole est périmée ») conduisait à l'écarter sans l'ouvrir, comme
`lagazettefrance.fr` et `doctrine.fr` l'avaient été.

**La page, elle, affiche « 40 Bis av Etienne Lamy, 39300 Cize » — l'adresse
actuelle — et le téléphone `03 84 52 61 48`, identique au site.** L'extrait du
moteur était périmé, pas la fiche. En appliquant le raccourci, la meilleure fiche
externe disponible aurait été jetée.

**Règle à appliquer désormais : l'extrait d'un moteur ne vaut pas lecture.** Il
reflète un cache qui peut avoir des mois de retard. Une fiche ne peut être écartée
pour adresse périmée **qu'après avoir ouvert la page**. C'est le prolongement direct
de la leçon du 08/09 (« une URL en 200 ne prouve pas que la page existe ») : ici,
un extrait de SERP ne prouve pas ce que la page contient.

> **Conséquence à traiter un autre jour** : `lagazettefrance.fr` et `doctrine.fr`
> ont bien été **lues** avant d'être écartées le 12/09 — elles restent donc
> écartées à juste titre, ne pas les rouvrir. En revanche `kompass.fr` et
> `verif.com` ont été jugées périmées **sur la seule foi d'extraits de recherche**
> (403 au runner, contenu jamais lu). Leur statut « périmée » n'est donc pas
> établi. Noté en chantier en attente.

### Positions mesurées — 13/11/2026

| Contrôle | 13/11/2026 | vs 12/11 |
|---|---|---|
| Déploiement `main` (`ee6d9ff`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; cour 10 696, parking 11 667 (= 12/11) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/arnaque-goudronnage` (et requête « arnaque goudronnage Jura »).

### Positions mesurées — 12/11/2026

| Contrôle | 12/11/2026 | vs 11/11 |
|---|---|---|
| Déploiement `main` (`2b3c08e`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; zone 11 143 (Q/R du 11/11 en ligne) | = banc |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact`, `/arnaque-goudronnage` et `/zone-intervention`.

### Positions mesurées — 11/11/2026

| Contrôle | 11/11/2026 | vs 10/11 |
|---|---|---|
| Déploiement `main` (`b8cbaca`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; services = banc du 10/11 (enrobé 13 463, finitions 11 394) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact`, `/arnaque-goudronnage` et `/zone-intervention`.

### Positions mesurées — 10/11/2026

| Contrôle | 10/11/2026 | vs 09/11 |
|---|---|---|
| Déploiement `main` (`d65ec0d`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; contact 7 314 (Q/R du 09/11 en ligne) | +1 581 contact |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 09/11/2026

| Contrôle | 09/11/2026 | vs 08/11 |
|---|---|---|
| Déploiement `main` (`25d76aa`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; maçonnerie 9 592 (correction du 08/11 en ligne) | +9 maçonnerie |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 08/11/2026

| Contrôle | 08/11/2026 | vs 07/11 |
|---|---|---|
| Déploiement `main` (`e2c963c`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; maçonnerie 9 583 (Q/R du 07/11 en ligne) | +1 543 maçonnerie |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 07/11/2026

| Contrôle | 07/11/2026 | vs 06/11 |
|---|---|---|
| Déploiement `main` (`5928665`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, mêmes valeurs (maçonnerie 8 040, contact 5 733) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 06/11/2026

| Contrôle | 06/11/2026 | vs 04/11 |
|---|---|---|
| Déploiement `main` (`074ed2b`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, mêmes valeurs (accueil 5 537, contact 5 733) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions sur « enrobé Jura », « goudronnage » ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 04/11/2026

| Contrôle | 04/11/2026 | vs 03/11 |
|---|---|---|
| Déploiement `main` (`34d4a0c`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; `/realisations/*` 4 JSON-LD (WebPage du 03/11 en ligne) | +1 bloc ×4 |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 03/11/2026

| Contrôle | 03/11/2026 | vs 02/11 |
|---|---|---|
| Déploiement `main` (`9899c8f`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; `preparation-terrassement` 10 703 (Q/R du 02/11 en ligne) | = |
| JSON-LD `/realisations/*` (prod, avant run) | 3 blocs (Organization, BreadcrumbList, FAQPage) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 02/11/2026

| Contrôle | 02/11/2026 | vs 01/11 |
|---|---|---|
| Déploiement `main` (`d754824`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; `maconnerie-generale` 8 040, `enrobe-a-chaud` 12 937 (maillage du 01/11 en ligne) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 01/11/2026

| Contrôle | 01/11/2026 | vs 31/10 |
|---|---|---|
| Déploiement `main` (`93549fe`) | **`success`** (Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200 ; `chantier-en-cours` 9 956 (Q/R joints du 31/10 en ligne) | = |
| Liens entrants vers `/services/maconnerie-generale` (prod, avant run) | 2 pages (accueil ×2, `bordures-murets`) | — |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 31/10/2026

| Contrôle | 31/10/2026 | vs 30/10 |
|---|---|---|
| Déploiement `main` (`573396f`) | **`READY`** (Vercel, production) | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, valeurs identiques au 30/10 | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 30/10/2026

| Contrôle | 30/10/2026 | vs 29/10 |
|---|---|---|
| Déploiement `main` (`4e062af`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, valeurs identiques au 29/10 | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` et `/arnaque-goudronnage`.

### Positions mesurées — 29/10/2026

| Contrôle | 29/10/2026 | vs 28/10 |
|---|---|---|
| Déploiement `main` (`445c79c`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, +63 car. sur les 4 `/realisations/*` (attendu) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact`.

### Positions mesurées — 28/10/2026

| Contrôle | 28/10/2026 | vs 27/10 |
|---|---|---|
| Déploiement `main` (`4acdaf3`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, valeurs identiques au 27/10 | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact`.

### Positions mesurées — 27/10/2026

| Contrôle | 27/10/2026 | vs 26/10 |
|---|---|---|
| Déploiement `main` (`192d0dd`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, +27 car. sur les pages au pied de page enrichi (attendu) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact`.

### Positions mesurées — 26/10/2026

| Contrôle | 26/10/2026 | vs 25/10 |
|---|---|---|
| Déploiement `main` (`e0b4e35`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, valeurs identiques au 25/10 (`bordures-murets` 9 506) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact`.

### Positions mesurées — 25/10/2026

| Contrôle | 25/10/2026 | vs 24/10 |
|---|---|---|
| Déploiement `main` (`f53cb90`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 16/16 en 200, valeurs identiques au 24/10 (`/contact` 5 694) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions ; indexation de `/contact` demandée ?

### Positions mesurées — 24/10/2026

| Contrôle | 24/10/2026 | vs 23/10 |
|---|---|---|
| Déploiement `main` (`fa4ce52`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200, valeurs identiques au 23/10 (`chantier-en-cours` 7 445) | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à impressions ;
demander l'indexation de `/contact` (Inspection d'URL).

### Positions mesurées — 23/10/2026

| Contrôle | 23/10/2026 | vs 22/10 |
|---|---|---|
| Déploiement `main` (`5c3e56c`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200, valeurs identiques au 22/10 | = |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à impressions.

### Positions mesurées — 22/10/2026

| Contrôle | 22/10/2026 | vs 21/10 |
|---|---|---|
| Déploiement `main` (`87af34d`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200 ; accueil **5 529** (13 579 la veille) | 🔻 suppression client |
| FAQPage accueil vs FAQ visible (`verif-faq`) | 5/5 | 🆕 (6 → 5) |
| SERP | non relevée (canal `WebSearch` US, non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : « Performances IA » + requêtes à
impressions, et surveiller l'accueil après la baisse de contenu.

### Positions mesurées — 21/10/2026

| Contrôle | 21/10/2026 | vs 20/10 |
|---|---|---|
| Déploiement `main` (`0f8cdeb`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200, valeurs du 20/10 | = |
| « réfection parking enrobé Jura entreprise » | domaine **absent** (marchés publics, DIR Est) ; fiche `118712.fr` de HCE présente | 🆕 relevé |

Canal `WebSearch` = US, non représentatif. Pas d'accès Search Console. **À relever
par Yanis** : rapport « Performances IA » + requêtes à impressions.

### Positions mesurées — 20/10/2026

| Contrôle | 20/10/2026 | vs 19/10 |
|---|---|---|
| Déploiement `main` (`2d8f086`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200, valeurs identiques au 19/10 | = |
| Meta descriptions > 160 car. (prod, avant push) | 10/15 (accueil 138 OK) — corrigé ce run | 🆕 recompté (12 annoncé le 18/10 : comptage HTML encodé) |
| « goudronnage cour Jura entreprise » | domaine **absent** ; fiche `118712.fr` de HCE 1ʳᵉ | = |
| « enrobé Ain entreprise cour » | **absent** (marchés publics, annuaires hors zone) | 🆕 relevé |

Canal `WebSearch` = US, non représentatif. Pas d'accès Search Console. **À relever
par Yanis** : rapport « Performances IA » + requêtes à impressions.

### Positions mesurées — 19/10/2026

| Contrôle | 19/10/2026 | vs 18/10 |
|---|---|---|
| Déploiement `main` (`9b956ab`) | **`READY`** (API Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200, valeurs identiques au 18/10 | = |
| « enrobé à chaud Jura entreprise cour » | domaine **absent** ; fiche `118712.fr` de HCE 1ʳᵉ | = |
| « terrassement Jura entreprise » | **absent** (obat.fr, cylex, offres d'emploi) | 🆕 relevé |

Canal `WebSearch` = US, non représentatif. Pas d'accès Search Console. **À relever
par Yanis** : rapport « Performances IA » (nouveau, cf. Techniques 19/10), pages
indexées, requêtes à impressions.

### Positions mesurées — 18/10/2026

| Contrôle | 18/10/2026 | vs 17/10 |
|---|---|---|
| Déploiement `main` (`e99d634`) | **`READY`** (API Vercel) | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200 ; `drainage-pentes` 9 557 (Q/R 17/10 servies) | = |
| `verif-faq` / `verif-lastmod` en ligne | 11/11 ; 15/15 alignés | = |
| On-page 15 URLs (title 47-78 car., canonical = og:url = URL, 1 H1, 0 img sans alt, 404 réel) | OK | 🆕 1ʳᵉ mesure groupée |
| Meta descriptions > 160 car. | 12/15 (troncature d'extrait seulement, pas un facteur de classement) | 🆕 noté, non traité |
| Poids images accueil | ~12 Mo → corrigé ce run (voir État des lieux) | 🆕 |
| SERP | non remesurée (dimanche, canal `WebSearch` US non représentatif) | — |

Pas d'accès Search Console. **À relever par Yanis** : rapport « Signaux Web
essentiels » (LCP mobile) avant/après cette correction.

### Positions mesurées — 17/10/2026

| Contrôle | 17/10/2026 | vs 16/10 |
|---|---|---|
| Déploiement `main` (`979e485`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200 ; `finitions-soignees` 10 891 (Q/R 16/10 servies) | = |
| JSON-LD (7 pages contrôlées) | tous valides ; BreadcrumbList partout hors accueil ; FAQPage = FAQ visible | = |
| « réfection parking enrobé Jura entreprise » | domaine **absent** ; fiche `118712.fr` de HCE présente | 🆕 relevé |
| « enrobé Lons-le-Saunier entreprise cour goudron » | **absent** (INRS, Saint-Gobain, bruit) | 🆕 relevé |

Canal `WebSearch` = US, non représentatif. Pas d'accès Search Console. **À relever
par Yanis** : pages indexées, requêtes à impressions (« caniveau », « eaux pluviales cour »).

### Positions mesurées — 16/10/2026

| Contrôle | 16/10/2026 | vs 15/10 |
|---|---|---|
| Déploiement `main` (`0c777ee`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200 ; `preparation-terrain` 7 138 (Q/R 15/10 servies) | 🆕 |
| Robots IA (`robots.txt` `Allow: /` ; GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot, CCBot → 200) | OK | 🆕 1ʳᵉ mesure |
| « enrobé à chaud Jura entreprise cour » / « goudronnage cour Jura entreprise » | domaine **absent** ; fiche `118712.fr` de HCE 1ʳᵉ | = |
| « enrobé Champagnole entreprise goudron » | **absent** (bruit Géorisques, Champagne-au-Mont-d'Or) | = |

Canal `WebSearch` = US, non représentatif. Pas d'accès Search Console. **À relever
par Yanis** : pages indexées / « Explorée, non indexée », requêtes à impressions.

### Positions mesurées — 15/10/2026

| Contrôle | 15/10/2026 | vs 14/10 |
|---|---|---|
| Déploiement `main` (`295ca4f`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 en 200 ; `preparation-terrain` 5 170 car. avant ce run | = |
| SERP | non remesurée (canal `WebSearch` US non représentatif) | — |

Pas d'accès Search Console depuis le runner. **À relever par Yanis** : pages
indexées, requêtes à impressions (« goudronnage », « enrobé Jura », « puits perdu »).

### Positions mesurées — 14/10/2026

| Contrôle | 14/10/2026 | vs 13/10 |
|---|---|---|
| Déploiement `main` (`68466b3`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 URLs = 13/10 | = |
| Redirections | apex/http/`hcebtp.com` → 308 OK ; `/avant-apres` 301 OK ; `/services/garantie-sav` **307** (corrigé) ; `/x/` → 307 vers sans slash (canonique OK, laissé) | 🆕 |
| SERP | non remesurée (canal `WebSearch` US non représentatif, voir 12-13/10) | — |

Pas d'accès Search Console depuis le runner. **À relever par Yanis** : pages
indexées et requêtes à impressions (« enrobé », « goudronnage », « terrassement »).

## Chantiers faits

### 13/11/2026 — `/arnaque-goudronnage` : Q/R alerte de la gendarmerie du Jura (2021)
Section `jura` (2ᵉ, après « Le procédé »), FAQPage = FAQ visible (7/7), source Plein Air
23/03/2021. Commentaire d'en-tête mis à jour (règle « aucune alerte locale inventée »).
10 656 → 11 880 car.

### 12/11/2026 — `/realisations/*` : H2 « Voir aussi » en questions ; lien retour cour-allee-privee → maçonnerie et bordures
`realisations.ts` (`RELATED_SERVICES`), `realisations.$slug.tsx` (`SeeAlso`, helper
`enLettres`), `services.$slug.tsx` (raison du lien maçonnerie → dossier, sans « médaillons »).
Le tableau des services de `/realisations` (index) affiche aussi les 2 nouveaux liens.

### 11/11/2026 — `/zone-intervention` : Q/R permission de voirie sur route départementale du Jura
Q/R n° 4 (avant « ma commune »), FAQPage = FAQ visible, 2 sources (arrêté jura.fr RD 39
Châtillon 11/04/2024 ; Légifrance L113-2). Lien vers `cour-allee-privee`. 8 784 → 11 143 car.

### 10/11/2026 — `/services/*` : H2 génériques → questions ciblées + réponse directe ; phrases du gabarit réparées
H2 prestations / méthode par service (ex. « Quels travaux d'enrobé à chaud et de goudronnage
HCE réalise-t-elle ? », « Comment HCE prépare-t-elle un terrain avant l'enrobé ? ») ; CTA et
`alt` sur `schemaName ?? title`. `services.$slug.tsx` seul.

### 09/11/2026 — `/contact` : Q/R « mesurer la surface de sa cour avant un devis »
Q/R n° 4 (avant « vraie entreprise »), FAQPage = FAQ visible (même tableau), 2 sources
ajoutées (aide cartes.gouv.fr « Utiliser les outils de mesure » ; IGN 19/10/2026). 5 733 → 7 314 car.

### 08/11/2026 — Distance station de Champagnole ↔ Cize : « 2 km » → « moins de 5 km »
Mesure : siège (BAN) 4,5 km, centroïde 4,8 km de la station 39097003. 2 Q/R
`services.$slug.tsx` + 2 passages `llms.txt`. Carte : marqueur siège sur l'adresse géocodée.

### 07/11/2026 — `/services/maconnerie-generale` : Q/R pavés, gel et sel (option « D »)
8 040 → 9 583 car. (banc local), FAQ 7 → 8. Référentiel NF 072 (CERIB, 2016) + Météo-France
Champagnole + guide CERIB 2017. Lead, lastmod et `llms.txt` au 07/11.

### 06/11/2026 — JSON-LD : `@id` sur les `Service`, `about` sur les `/realisations/*`
`services.$slug.tsx` : `"@id": …/services/<slug>#service`. `realisations.$slug.tsx` : `about`
= `RELATED_SERVICES` → `@id` + `url`. Texte servi inchangé. Accueil laissé tel quel.

### 04/11/2026 — `/realisations/parking-voirie-pro` : Q/R eaux pluviales et séparateur d'hydrocarbures

8 468 → 11 212 car. (banc local), FAQ 7/7. Rubrique 2.1.5.0 (doctrine préfecture du Var) +
GRAIE 2004 (efficacité des séparateurs). Lastmod et `llms.txt` au 04/11.

### 02/11/2026 — `/realisations/preparation-terrassement` : Q/R fond de forme argileux et détrempé
Question de saison (terrassement en automne jurassien), absente du site. Réponse directe (on
ne remblaie pas dessus), trois issues, limites vérifiables du traitement à la chaux (essai
NF P94-100, pas sur terre végétale, pas sous 5 °C), renvoi au devis détaillé. FAQ 5 → 6,
2 sources ajoutées. 8 359 → 10 703 car. (banc local).

### 01/11/2026 — Maillage : `/services/maconnerie-generale` passe de 2 à 6 pages entrantes
Ajouts (avec raison affichée, règle `VOIR_AUSSI`) : `enrobe-a-chaud` et `finitions-soignees`
(« Les prestations qui vont avec ») ; phrases de renvoi de `/zone-intervention` et `/contact`.
Banc local (`vite dev`) : 1 lien sur chacune, `enrobe-a-chaud` 12 809 → 12 937, `finitions`
10 918 → 11 039, `zone` 8 762 → 8 784, `contact` 5 711 → 5 733. Pas de `lastmod` touché
(liens seuls). **Non fait** : `RELATED_SERVICES["cour-allee-privee"]` ne liste pas la
maçonnerie alors que `maconnerie-generale` renvoie vers ce dossier pour ses photos de
pavés — voir Hypothèses.

### 31/10/2026 — `/realisations/chantier-en-cours` : Q/R joint entre deux bandes d'enrobé
Question réelle de fin de chantier (ligne visible entre deux bandes), absente du site.
Réponse directe (normal si fermé, à niveau, compacté), pourquoi c'est un point faible
(Langlois), gestes de pose, lien avec la Q/R « pourquoi l'équipe ne s'arrête pas », quoi
signaler à la réception. FAQ 5 → 6, 2 sources ajoutées.

### 29/10/2026 — `/realisations/cour-allee-privee` : Q/R racines d'arbre sous une allée
Question réelle (allée bombée/fissurée en ligne depuis un arbre), absente du site. Réponse
directe, mécanisme (contact racine/revêtement), parades testées (Smiley 2008, limites de
l'essai dites), droit de voisinage (art. 671/673), conséquence chantier (se traite au
décaissement). Placée en dernière Q/R. FAQ 5 → 6, 2 sources ajoutées.

### 28/10/2026 — Maillage : `/contact` et `/mentions-legales` liés depuis les 4 `/realisations/*`
Fichier `realisations.$slug.tsx`, composant `SeeAlso` (servi dans l'état de chargement **et**
la page complète). Ne rien ajouter au CTA bas pour les robots : il est client seul. Après ce
run, `/contact` est lié depuis les 15 autres URLs indexables.

### 27/10/2026 — `/services/preparation-terrain` : Q/R gel et dégel du sol sous une cour
Question saisonnière réelle (cour qui se soulève / se fissure après l'hiver), absente du
site. Réponse directe en tête (c'est le sol qui gèle, pas l'enrobé), mécanisme lentilles
de glace → perte de portance au dégel, critère de gélivité chiffré, ordre de grandeur de
profondeur de gel (côté suisse, daté 1958, explicitement présenté comme tel), remèdes
(matériaux non gélifs, couper l'eau → lien drainage/pentes), barrières de dégel comme
repère connu. Placée après « compacter par couches ». FAQ 7 → 8, 2 sources.

### 26/10/2026 — Maillage : `/contact` et `/mentions-legales` liés depuis les pieds de page simplifiés

Avant : `/contact` (page NAP officielle créée le 24/10) n'avait qu'un lien entrant (pied de
page de l'accueil). Après : liée depuis 11 pages (6 services, zone, hub réalisations,
mentions légales, arnaque, + accueil). `/mentions-legales` gagne aussi un lien depuis les
6 services, la zone, le hub et `/contact`. Fichiers : `services.$slug.tsx`,
`zone-intervention.tsx`, `realisations.index.tsx`, `mentions-legales.tsx`,
`arnaque-goudronnage.tsx`, `contact.tsx`. Reste : les 4 `/realisations/*` n'ont pas de pied
de page (ne pas en inventer un sans valider le rendu).

### 25/10/2026 — `/services/bordures-murets` : Q/R drainage d'un muret de soutènement
Question réelle (mur qui pousse / bombe après la pluie), absente du site. Réponse directe,
puis causes de sinistres (AQC 2011), dispositif complet (AQC 2022), rôle limité des
barbacanes, rejet chez le voisin, pluviométrie de Champagnole déjà sourcée sur la page.
Placée en 2ᵉ position (juste après « À quoi sert un muret »). FAQ 5 → 6, 2 sources.

### 24/10/2026 — `/contact` : une URL officielle et stable pour le NAP
Idée de la veille du 19/10 (bloc de réponse Google « page contact d'une entreprise »).
Fichier `src/routes/contact.tsx`, modèle `zone-intervention`. Contenu propre, pas une
copie du pied de page : homonymie Cize avec distance calculée, graphie « 40 B » du
registre, informations à préparer (alignées sur les 3 étapes réelles du formulaire),
vérification d'identité. Sources : annuaire-entreprises, recherche-entreprises (geo
INSEE 08/09), geo.api.gouv.fr.

### 23/10/2026 — `/realisations/chantier-en-cours` : Q/R « liquide noir avant l'enrobé » (couche d'accrochage)
Question réelle du jour de la pose, absente du site (0 occurrence « accrochage »). Réponse
directe en tête, puis rôle (coller les couches), ~0,25 kg/m² de bitume résiduel, surface
propre et sèche, météo, pelage / décollement par plaque si mauvaise liaison (MTQ 2002),
délai entre accrochage et enrobé, tenue à la fatigue (Bitume Québec 2008), consigne
pratique (ne pas marcher dessus). Placée en 2ᵉ position (après « pourquoi l'équipe ne
s'arrête pas »). FAQ 4 → 5, 2 sources ajoutées. Banc local 5 596 → 7 445 car.

### 22/10/2026 — Cohérence après la suppression client du 22/10 : renvoi mort sur `/mentions-legales`, `lastmod`
`/mentions-legales` (section « Réutilisation ») annonçait que devis, arrhes, acompte et
délai d'exécution étaient traités sur l'accueil, lien `hash="faq"` : faux depuis la
suppression et ancre inexistante → phrase retirée (pas de nouveau renvoi : le client ne
veut pas de bloc juridique devis/acompte/délais). Banc local : 8 351 → 8 247 car.
`PAGE_UPDATED` `/` et `/mentions-legales` → 22/10 ; `llms.txt` daté 22/10. Aucune
autre référence au bloc supprimé (`avant-signature` : 0 ; `llms.txt` propre).

### 21/10/2026 — `/realisations/parking-voirie-pro` : Q/R bornes de recharge
Requête réelle d'un gérant qui refait son parking, non couverte. Réponse directe en
tête (« souvent des fourreaux, à poser avant l'enrobé »), puis : rénovation importante
= ≥ 25 % de la valeur hors foncier, parc > 10 places → 20 % pré-équipées dont 2 % PMR,
1 place PMR équipée, conduits ≥ 100 mm (L113-12, R113-6) ; existant non résidentiel
> 20 places → 1 point + 1 par tranche de 20 depuis le 01/01/2025, ex. 95 places = 4
(L113-13) ; exclusions PME / coût > 7 % (L113-14). Rien n'est affirmé sur une
prestation électrique d'HCE. Lead « cinq » → « six questions », source ajoutée.

### 20/10/2026 — Meta descriptions : 10 pages ramenées sous 160 caractères

Avant (prod) → après (banc local) : `enrobe-a-chaud` 173→152, `maconnerie-generale`
168→153, `drainage-pentes` 196→149, `bordures-murets` 174→150,
`finitions-soignees` 184→153, `zone-intervention` 239→140, `realisations` 179→151,
`realisations/preparation-terrassement` 161→149, `mentions-legales` 248→154,
`arnaque-goudronnage` 232→146 (mot-clé « Arnaque au goudronnage » mis en tête).
Mot-clé + zone gardés en début de phrase, aucune promesse nouvelle, `150°C` /
« posé à la main » / « devis détaillé » / « garantie décennale » conservés. Gain
attendu : extrait non tronqué (pas un facteur de position). Les 5 autres déjà ≤ 159.

### 19/10/2026 — `/services/maconnerie-generale` : Q/R pose des pavés sous voiture, et pavés vs dalles
Page la plus maigre du site (5 726 car.). Deux Q/R ajoutées, sourcées sur le
guide de pose CERIB/FIB (juillet 2017) : **lit de sable 3 cm ± 1, sable 0/4 ou
0/6,3, joints 2-4 mm, damage plaque vibrante, butée obligatoire, sable stabilisé
75-100 kg/m³** ; **dalles non damées, joints ≥ 5 mm, pose sur mortier limitée au
trafic T5**. Rien n'est affirmé sur la pratique propre d'HCE au-delà de l'existant.
FAQ 5 → 7 (FAQPage = visible, `verif-faq` 7/7), lead mis à jour, source ajoutée,
`PAGE_UPDATED` + lastmod 19/10, `llms.txt` 19/10 (+2 Q/R). Banc local : 5 726 →
**8 013 car.** Build OK, `check:fige` OK.

### 18/10/2026 — Images de l'accueil : ~16 Mo de PNG bruts → WebP (~1,7 Mo)

- Constat : `optimizeImage.ts` disait « /photos déjà léger » — faux pour 5 PNG
  (2,5-3,3 Mo) et un JPEG (1 Mo) servis bruts sur l'accueil et `maconnerie-generale`.
- Fait : `convert -strip -resize 1600x1600> -quality 78 -define webp:method=6`
  (cartes « matière » à 900 px de large), originaux gardés, 6 défauts de code
  pointés vers `.webp` (`index.tsx`, `services.$slug.tsx`), commentaire corrigé.
- Non fait (volontairement) : `width`/`height` sur les `<img>` — elles sont toutes
  dans des conteneurs dimensionnés (`absolute inset-0` / `aspect-*`), pas de CLS
  attendu ; pas de passage par `wsrv.nl` (garde les images sur le domaine).
- ✅ Vérifié en prod le 18/10 : 6 `.webp` en 200 et référencés dans le HTML.

### 17/10/2026 — `/services/drainage-pentes` : Q/R « où envoyer l'eau » et « caniveau à grille »

- **Pourquoi** : page service la plus maigre après maçonnerie (5 856 car.) ; les
  questions « rejeter l'eau de sa cour dans la rue / le réseau » et « quel
  caniveau devant un garage » n'étaient traitées nulle part.
- **Fait** : 2 Q/R, réponse directe en tête. Eau : C. civ. art. 641 et 681 (fiche
  CAUE 13), réponse du ministère de l'Intérieur au JO Sénat du 2/06/2016 (question
  J.-L. Masson), art. L2224-10 CGCT cité ; renvoi au zonage pluvial / règlement de
  la mairie, puits perdu limité aux eaux pluviales (cohérent avec la Q/R du 15/10).
  Caniveau : NF EN 1433 (A 15 → F 900, charge d'essai en kN) ; usages selon le
  tableau Hauraton (traduits, sans guillemets), y compris la nuance « allées
  domestiques en A 15 » ; aucun chiffre de pose inventé. 3 sources ajoutées.
- Lead de la page complété ; `PAGE_UPDATED` → 17/10 (lastmod 2026-10-17 vérifié au
  banc) ; `llms.txt` → 17/10 (+2 Q/R, description de la page complétée).
- Banc local (handler Vercel/Nitro importé, `vite preview` ne sert pas les routes :
  500) : 200, 9 557 car., FAQPage 7 = 7 Q/R visibles ; 14 autres URLs inchangées.
- Archivage : Positions + Chantier du 16/09 → `docs/seo-journal-archive.md`.

### 16/10/2026 — `/services/finitions-soignees` : Q/R « sel de déneigement » et « tache de gazole / huile »

- **Pourquoi** : avant l'hiver, requêtes réelles d'entretien jamais traitées
  (aucune occurrence de « déneig », « sel », « huile » dans les Q/R du site).
- **Fait** : 2 Q/R, réponse directe en tête. Sel : essai Cerema (Ginoux,
  séminaire CCLEAR, 3/02/2015) — BBTM 0/10, 7 j à 18 °C, eau saturée 400 g/L ;
  rs/R ≈ 0,91 vs r/R ≈ 0,75 ; 3 limites dites (pas de gel, imbibition plus
  forte, rien sur béton/pavés) ; renvoi aux vrais risques (lame trop basse, neige
  entassée sans exutoire). Gazole/huile : MTQ Info DGLC vol. 9 n° 12 (déc. 2004),
  citations verbatim vérifiées, portée (moment de la pose) dite ; 3 réflexes.
  Aucun chiffre non sourcé. 3 sources ajoutées (dont fiche Météo-France
  Champagnole, 111,7 j de gel déjà cité ailleurs).
- `PAGE_UPDATED` → 16/10 (lastmod sitemap 2026-10-16 vérifié), `llms.txt` → 16/10
  (+2 Q/R sourcées, description de la page complétée).
- Banc local (handler Nitro) : 200, 2 Q/R visibles, FAQPage 7 = 7 Q/R visibles.
- Archivage : Positions + Chantier du 15/09 → `docs/seo-journal-archive.md`.

### 15/10/2026 — `/services/preparation-terrain` : Q/R « puits perdu » et « enrochement »

- **Constat** : « Puits perdus » et « Enrochement » listés dans les prestations,
  jamais expliqués (seule mention : « puits perdu » en fin de Q/R drainage).
- **Fait** : 2 Q/R (réponse directe en tête, H2/Q formulés comme une question à
  une IA). Puits perdu = eaux pluviales seulement ; citation de l'art. 13 de
  l'arrêté du 7/09/2009 (rejet d'eaux usées, même traitées, interdit en puisard /
  puits perdu ; puits d'infiltration = eaux traitées, autorisé par la commune sur
  étude hydrogéologique) ; PLU / périmètre de captage renvoyés à la mairie.
  Enrochement : principe, drainant, emprise, mêmes vérifications qu'un mur,
  bureau d'études au-delà — **aucun chiffre** (pas de source). Source ajoutée :
  version consolidée de l'arrêté (préfecture du Doubs).
- `PAGE_UPDATED` → 15/10 (lastmod sitemap suit), `llms.txt` → 15/10.
- Banc local (handler Nitro) : 200, 2 Q/R visibles, FAQPage 7 items = FAQ visible.
- Archivage : Positions + Chantier du 14/09 → `docs/seo-journal-archive.md`.

### 14/10/2026 — Aperçu de partage et entité locale : fin de l'image Lovable, `HomeAndConstructionBusiness`, 301

- **Constat (prod)** : `og:image`/`twitter:image` de l'accueil et de toutes les
  pages hors `/services/*` = capture 1920×1080 d'une **ancienne preview
  Lovable** (`pub-…r2.dev/…lovable.app-….png`, 1,9 Mo) : finisseur au premier
  plan, accroche tronquée « de père en f… ». C'est l'image vue sur WhatsApp,
  Facebook, LinkedIn et candidate pour les moteurs. `twitter:title/description`
  répétaient l'accueil sur chaque page.
- **Fait** : `public/og-hce.jpg` (recadrage 1200×630 de
  `assets/enrobe-a-chaud-allee.jpg`, vraie photo, 324 Ko) ; `twitter:card`
  → `summary_large_image` ; `twitter:title/description/image` retirés (X lit
  les `og:*` propres à chaque page). Les `/services/*` gardent leur photo.
- JSON-LD accueil : `@type` `HomeAndConstructionBusiness` (sous-type de
  `LocalBusiness`, même `@id #business`), `image`, `hasOfferCatalog` = 6
  `Offer`→`Service` avec URL, **aucun prix**. `provider` des services aligné.
- `/services/garantie-sav` : `statusCode: 301` (partait en 307 temporaire).
- Pas de changement de contenu visible → ni `PAGE_UPDATED` ni `llms.txt`.
- Banc local (handler Nitro appelé directement) : og:image 3 cas OK, JSON-LD
  OK, 301 OK. Build OK, `check:fige` OK.
- **Contenu écarté après vérification** : les Q/R « autorisation d'urbanisme
  pour terrasser » et « réutiliser la terre » existent déjà sur
  `/realisations/preparation-terrassement` — ne pas les redoubler sur
  `/services/preparation-terrain`. **Avant tout nouveau Q/R : `grep -n 'q: "'
  src/routes/*.tsx`.**
- Archivage : Positions + Chantier du 13/09 → `docs/seo-journal-archive.md`.

### 13/10/2026 — Balises `<title>` des six `/services/*` : de génériques à ciblées (requête + zone)

- **Constat (mesure prod)** : les 6 services servaient `<title>{H1} — HCE · Jura
  & Ain` ; « goudronnage », « terrassement », « bordures béton » absents des
  titres ; `finitions-soignees` avait pour `<title>` (et nom JSON-LD `Service` /
  `BreadcrumbList`) l'accroche « Vous avez un projet d'aménagement de cour en
  enrobé ». Le `<title>` est le signal on-page le plus fort et ce que Google
  affiche dans la SERP.
- **Fait** : champ obligatoire `seoTitle` (+ `og:title`), et `schemaName`
  optionnel pour le JSON-LD de `finitions-soignees` (« Finition soignée
  d'enrobé », formule validée par le client). Titres : « Terrassement et
  préparation de terrain — Jura & Ain | HCE », « Enrobé à chaud, goudronnage de
  cour — Jura & Ain | HCE », « Pavage, dallage et médaillons dans l'enrobé —
  Jura | HCE », « Drainage et pentes d'une cour en enrobé — Jura & Ain | HCE »,
  « Bordures béton et murets de soutènement — Jura & Ain | HCE », « Finition
  soignée d'une cour en enrobé — Jura & Ain | HCE » (54-58 car.).
- **Non touché** : H1 visibles (dont l'accroche de `finitions-soignees`, à
  soumettre au client — voir 21/09), contenu, `PAGE_UPDATED` (pas de « mise à
  jour » affichée pour un simple titre), `llms.txt` (couvrait déjà goudronnage).
- Banc local : build OK, `check:fige` OK, FAQ 11/11, 6 titres servis vérifiés.
- Archivage : Positions + Chantier du 12/09 → `docs/seo-journal-archive.md`.
- **Non fait, à proposer** : H1 de l'accueil = « HCE » seul (aucun mot métier).
  Le changer touche le visuel du héros → à valider par Yanis, pas de texte caché.

### 12/10/2026 — `/realisations/chantier-en-cours` : 373 → 5 604 car. servis (banc local), bloc « le jour de la pose »

- **Pourquoi** : dernière page maigre du site, seule URL sans date ni FAQ.
  Angle sans rien inventer sur un chantier précis : les 4 questions d'un
  client le jour de la pose (aucune n'était couverte ailleurs — vérifié par
  la liste des `q:` du dépôt).
- **Q/R** : (1) pourquoi l'équipe ne s'arrête pas — 150 °C posé à la main ;
  guide MTQ Québec 2009 : compactage impossible < 85 °C, < 10 min insuffisant ;
  (2) fumées de bitume — CIRC 2011 groupe 2B (exposition **professionnelle**),
  INRS : irritantes, plus de fumées quand la température monte ; (3) quoi
  préparer chez soi (conseils, aucune promesse au nom de HCE) ; (4) quand
  marcher/rouler sur l'enrobé neuf — pas de chiffre (aucune source primaire
  FR trouvée), explication thermoplastique + renvoi GPA art. 1792-6.
- `REAL_SAVOIR` (section + `FAQPage` 4/4), `PAGE_UPDATED` → lastmod
  2026-10-12 (**15/15 URLs avec lastmod**), `llms.txt` 12 octobre 2026,
  commentaires `lastmod.ts`/`sitemap` mis à jour. Build OK, `check:fige` OK.
- Archivage : Positions + Chantier du 11/09 → `docs/seo-journal-archive.md`.
- ✅ Vérifié en prod (`f80869e`, `success` ~80 s) : 5 604 car., FAQ 4/4,
  lastmod 15/15, `llms.txt` 12 octobre, IndexNow 15 URLs → 200, rendu mobile
  propre (capture Playwright).
- 🔴 **Découverte : la galerie de ce dossier est VIDE en prod** (« Aucune
  photo dans cette catégorie pour le moment », 0 image ; `cour-allee-privee`
  en a 23). Le lead disait « les photos de cette page montrent… » → corrigé
  dans un 2ᵉ commit, ainsi que la meta description qui promettait des photos.
  **Action client : ajouter des photos de pose dans « Chantier en cours » via
  l'admin** (ou retirer la carte de la galerie). Pas touché à la base.

### 11/10/2026 — `/arnaque-goudronnage` : nouvelle page (10 646 car. servis au banc local), 15ᵉ URL du sitemap

- **Pourquoi** : requête réelle (« arnaque goudronnage », « faux bitumeurs »)
  que le site ne couvrait que par une Q/R de droit dans `cour-allee-privee`.
- **Contenu** : 6 H2 en questions, chacun suivi d'une réponse directe de 2-3
  phrases reprise à l'identique dans le `FAQPage` (6/6 au `verif-faq.mjs`) :
  le procédé, les signes (liste de 7 + signes techniques : 150 °C, rouleau,
  fondation), vérifier une entreprise (Annuaire des entreprises, attestation
  décennale jointe au devis — L243-2 code des assurances, modèle arrêté du
  05/01/2016, attestations émises depuis le 01/07/2016), la loi (renvoi vers
  `cour-allee-privee` pour L221-10/L221-18 ; exception d'urgence L221-28
  seulement si sollicitée ; abus de faiblesse L121-8 à L121-10, 3 ans /
  375 000 €), après coup (rétractation, SignalConso, plainte, 17), et les
  preuves vérifiables de HCE (SIREN/SIRET, adresse Cize, fixe, créée en 2012,
  devis détaillé, garantie décennale).
- **Sources** : France Bleu Berry (alerte gendarmerie Indre), DGCCRF
  20/02/2024, INC (L243-2), Annuaire des entreprises, UFC-Que Choisir,
  SignalConso. ⚠️ **Aucune alerte gendarmerie Jura/Ain retrouvée en source
  primaire** : la page ne prétend pas que le procédé sévit localement.
- **Rien promis au nom du client** (pas de « HCE ne démarche jamais »).
- JSON-LD : `BreadcrumbList`, `Article` (author/publisher → `#business`),
  `FAQPage`. `lastmod` 2026-10-11 ; `llms.txt` mis à jour (11 octobre 2026).
- **Maillage** : lien en pied de page de l'accueil (13 526 → 13 579 car.) et
  dans « Sur le même chantier » de `/services/enrobe-a-chaud` (12 633 → 12 761) ;
  la page lie vers enrobé, préparation, `cour-allee-privee`, réalisations,
  zone, mentions légales.
- Banc local : build OK, `check:fige` OK, `verif-lastmod` 15 URLs cohérentes
  dont 14 avec lastmod. ⚠️ Au banc local l'hydratation client plante (variables
  Supabase absentes du runner) — c'est l'environnement, pas la page ; le SSR
  est complet. **Rendu visuel à vérifier en prod.**
- Archivage : entrées « Positions » et « Chantiers faits » du 07 au 10/09
  déplacées dans `docs/seo-journal-archive.md` (8 000 → ~7 450 lignes).

> Entrées « Chantiers faits » des 04 à 08/10/2026 archivées le 09/11 dans `docs/seo-journal-archive.md`.

## Chantiers en attente

Par ordre de priorité. **Alterner les angles, ne pas refaire le même deux jours
de suite.**

> 🆕 **MISE À JOUR DU 13/11/2026 — prime sur tout ce qui suit.**
> ✅ `/arnaque-goudronnage` : Q/R gendarmerie du Jura (à vérifier en prod : ~11 880 car.,
> FAQ 7/7, « Plein Air » servi, lastmod 13/11, `llms.txt` 13/11 ; puis IndexNow).
> 1. Prochain technique : texte SSR de `/realisations/*` (« Chargement des photos… ») —
>    `alt` / légende côté serveur sans toucher à Supabase ; sinon noter.
> 2. Prochain contenu : `bordures-murets` (9 983) ; accueil : **rien sans accord client**.
> 3. Lundi 16/11 : veille (étape 6).
> 4. Yanis/client : saison de pose (Hypothèse 22/10) ; H1 `finitions-soignees` ; compteurs
>    de la carte ; Search Console ; fiche Google Business Profile.

> 🆕 **MISE À JOUR DU 12/11/2026 — prime sur tout ce qui suit.**
> ✅ H2 « Voir aussi » des `/realisations/*` + lien retour `cour-allee-privee` → maçonnerie /
> bordures (à vérifier en prod : cour ~10 686 car., H2 « Quels autres chantiers d'HCE… »,
> `about` 4 services ; puis IndexNow).
> 1. Prochain contenu : `/arnaque-goudronnage` (10 656, vérifier son lastmod) ou
>    `bordures-murets` (9 983) ; accueil : **rien sans accord client**.
> 2. Prochain technique : texte servi de `/realisations/*` en SSR = « Chargement des
>    photos… » (photos client seul) — voir si un `alt` / une légende peut sortir côté serveur
>    sans toucher à Supabase ; sinon noter.
> 3. Yanis/client : H1 de `finitions-soignees` ; compteurs « X chantiers réalisés » de la
>    carte ; Search Console ; fiche Google Business Profile.

> 🆕 **MISE À JOUR DU 11/11/2026 — prime sur tout ce qui suit.**
> ✅ `/zone-intervention` : Q/R permission de voirie Jura (à vérifier en prod : ~11 143 car.,
> FAQ 5/5, lastmod 11/11, `llms.txt` 11/11, puis IndexNow).
> 1. Prochain technique : passe H2 sur `/realisations/*` (« — Autres réalisations », « — Les
>    prestations mises en œuvre ») ; lien retour `cour-allee-privee` → maçonnerie.
> 2. Prochain contenu : `/arnaque-goudronnage` (10 656, vérifier son lastmod) ou
>    `bordures-murets` (9 983) ; accueil : **rien sans accord client**.
> 3. Yanis/client : H1 de `finitions-soignees` ; compteurs « X chantiers réalisés » de la
>    carte ; Search Console ; fiche Google Business Profile.

> 🆕 **MISE À JOUR DU 10/11/2026 — prime sur tout ce qui suit.**
> ✅ H2 questions sur les 6 `/services/*` (à vérifier en prod : `/services/enrobe-a-chaud`
> sert « Quels travaux d'enrobé à chaud et de goudronnage » ; `finitions-soignees` ne sert
> plus « devis pour vous avez un projet » ; puis IndexNow).
> 1. Prochain contenu : `/zone-intervention` (8 784, lastmod 30/09 — la plus ancienne) ;
>    accueil : **rien sans accord client**.
> 2. Technique en réserve : même passe H2 sur `/realisations/*` (« — Autres réalisations »,
>    « — Les prestations mises en œuvre ») ; lien retour `cour-allee-privee` → maçonnerie.
> 3. Yanis/client : H1 de `finitions-soignees` (accroche) ; compteurs « X chantiers
>    réalisés » de la carte ; Search Console ; fiche Google Business Profile.

> 🆕 **MISE À JOUR DU 09/11/2026 — prime sur tout ce qui suit.**
> ✅ `/contact` : Q/R mesure de surface (à vérifier en prod : ~7 314 car., FAQ 5/5, lastmod
> 09/11, `llms.txt` 09/11, puis IndexNow).
> 1. Prochain technique : lien retour `cour-allee-privee` → maçonnerie (photos d'abord) ; ou
>    relecture titres/H2 vs requêtes (veille 09/11 : correspondance titre/H2 ↔ requête).
> 2. Prochain contenu : `/zone-intervention` (8 784, lastmod 30/09 — la plus ancienne) ;
>    accueil : **rien sans accord client**.
> 3. Yanis/client : compteurs « X chantiers réalisés » de la carte (sourcer ou retirer) ;
>    Search Console ; fiche Google Business Profile ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 08/11/2026 — prime sur tout ce qui suit.**
> ✅ Distance station Champagnole tranchée (à vérifier en prod : plus aucun « 2 km de Cize »
> servi ; `llms.txt` lignes 332 et 392 ; puis IndexNow).
> 1. Lundi 09/11 : veille (étape 6).
> 2. Prochain contenu : `/contact` (5 733) ; accueil : **rien sans accord client**.
> 3. Technique en réserve : lien retour `cour-allee-privee` → maçonnerie (photos d'abord).
> 4. Yanis/client : sourcer ou retirer les compteurs « X chantiers réalisés » de la carte ;
>    Search Console ; fiche Google Business Profile ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 07/11/2026 — prime sur tout ce qui suit.**
> ✅ `maconnerie-generale` : Q/R gel/sel (à vérifier en prod : ~9 583 car., FAQ 8/8, lastmod
> 07/11, `llms.txt` 07/11, puis IndexNow).
> 1. Lundi 09/11 : veille (étape 6).
> 2. Prochain technique : lien retour `cour-allee-privee` → maçonnerie (Hypothèses 01/11,
>    photos à regarder d'abord) ; ou incohérence « moins de 5 km » / « 2 km » entre Cize et
>    Champagnole sur `/services/*` (ligne ~199 de `services.$slug.tsx` vs ~420) à trancher.
> 3. Prochain contenu : `/contact` (5 733) ; accueil : **rien sans accord client**.
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 06/11/2026 — prime sur tout ce qui suit.**
> ✅ `@id` Service + `about` réalisations (à vérifier en prod : `/services/enrobe-a-chaud`
> sert `"@id":"https://www.hcetp.com/services/enrobe-a-chaud#service"` ; puis IndexNow).
> 1. Prochain contenu : `/services/maconnerie-generale` (8 040, la plus maigre des services)
>    ou `/contact` (5 733) ; accueil : **rien sans accord client**. Piste : doctrine eaux
>    pluviales de la DDT du Jura pour compléter la Q/R du 04/11.
> 2. Lundi 09/11 : veille (étape 6).
> 3. Technique en réserve : lien retour `cour-allee-privee` → maçonnerie (Hypothèses 01/11,
>    photos à regarder d'abord).
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 04/11/2026 — prime sur tout ce qui suit.**
> ✅ `parking-voirie-pro` : Q/R eaux pluviales / séparateur (à vérifier en prod : ~11 212 car.,
> FAQ 7/7, lastmod 04/11, `llms.txt` 04/11, puis IndexNow).
> 1. Prochain technique : `RELATED_SERVICES` de `cour-allee-privee` → maçonnerie (Hypothèses
>    01/11) ; ou `@id` sur les blocs `Service` pour un `about` depuis les réalisations.
> 2. Prochain contenu : `/contact` (5 733) ou `/services/maconnerie-generale` (8 040) ;
>    accueil : **rien sans accord client**. Piste : doctrine eaux pluviales de la DDT du Jura
>    (si trouvée, l'ajouter à la Q/R du 04/11 à la place ou à côté de celle du Var).
> 3. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 03/11/2026 — prime sur tout ce qui suit.**
> ✅ `WebPage` sur les 4 `/realisations/*` (à vérifier en prod : 4 JSON-LD par page,
> `isPartOf` → `/realisations`, `dateModified` = date visible ; puis IndexNow).
> 1. Prochain contenu : `parking-voirie-pro` (8 468, la plus maigre des réalisations) ;
>    accueil : **rien sans accord client**.
> 2. Prochain technique : `RELATED_SERVICES` de `cour-allee-privee` → maçonnerie (Hypothèses
>    01/11) ; ou `@id` sur les blocs `Service` pour permettre un `about` depuis les réalisations.
> 3. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 02/11/2026 — prime sur tout ce qui suit.**
> ✅ `preparation-terrassement` : Q/R fond argileux (à vérifier en prod : ~10 703 car., FAQ
> 6/6, lastmod 02/11, `llms.txt`, puis IndexNow).
> 1. Prochain technique : relecture `seo-schema` des JSON-LD des `/realisations/*` (3 blocs
>    contre 4 ailleurs : manque-t-il un `BreadcrumbList` ?) ; ou `RELATED_SERVICES` de
>    `cour-allee-privee` → maçonnerie (voir Hypothèses 01/11).
> 2. Prochain contenu : `parking-voirie-pro` (8 468) ; accueil : **rien sans accord client**.
> 3. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 01/11/2026 — prime sur tout ce qui suit.**
> ✅ Maillage maçonnerie — **vérifié en prod** (`dda5244`, 1 lien sur chacune des 4 pages),
> IndexNow 16 URLs 200.
> 1. Lundi 02/11 : veille (étape 6).
> 2. Prochain contenu : `parking-voirie-pro` (8 468) ou `preparation-terrassement` (8 359) ;
>    accueil : **rien sans accord client**.
> 3. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 31/10/2026 — prime sur tout ce qui suit.**
> ✅ `chantier-en-cours` : Q/R joints (à vérifier en prod : ~9 956 car., FAQ 6/6, lastmod
> 31/10, `llms.txt`, puis IndexNow).
> 1. Prochain technique : `/services/maconnerie-generale` n'a que **2 pages entrantes** —
>    renvois pertinents depuis bordures-murets, finitions, realisations.
> 2. Lundi 02/11 : veille (étape 6).
> 3. Prochain contenu : `parking-voirie-pro` (8 468) ou `preparation-terrassement` (8 359) ;
>    accueil : **rien sans accord client**.
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 30/10/2026 — prime sur tout ce qui suit.**
> ✅ Maillage vers `/arnaque-goudronnage` (3 → 9 entrantes) et `/zone-intervention` depuis les
> `/realisations/*` (à vérifier en prod : `href="/arnaque-goudronnage"` sur
> `/realisations/chantier-en-cours`, `/zone-intervention`, `/services/preparation-terrain`).
> 1. Prochain contenu : `chantier-en-cours` (7 648) ; accueil : **rien sans accord client**.
> 2. Prochain technique : `/services/maconnerie-generale` n'a que **2 pages entrantes**
>    (la plus isolée des services) — trouver des renvois pertinents (bordures-murets,
>    finitions, realisations).
> 3. Lundi 02/11 : veille (étape 6).
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 29/10/2026 — prime sur tout ce qui suit.**
> ✅ `cour-allee-privee` : Q/R racines (à vérifier en prod : ~10 081 car., FAQ 6/6, lastmod
> 29/10, IndexNow).
> 1. Prochain technique : au choix — `/zone-intervention` (8 605, lastmod 30/09) a 0 lien
>    vers `/realisations/*` ; ou relecture `seo-schema` des JSON-LD des `/realisations/*`
>    (3 blocs contre 4 ailleurs : vérifier s'il manque un `BreadcrumbList` ou autre).
> 2. Prochain contenu : `chantier-en-cours` (7 508) ; accueil : **rien sans accord client**.
> 3. Lundi 02/11 : veille (étape 6).
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 28/10/2026 — prime sur tout ce qui suit.**
> ✅ Lien `/contact` + `/mentions-legales` sur les 4 `/realisations/*` (à vérifier en prod :
> `href="/contact"` sur `/realisations/cour-allee-privee`, +63 car.).
> 1. Prochain contenu : `realisations/chantier-en-cours` (7 445+63) ou `cour-allee-privee`
>    (7 670+63) ; accueil : **rien sans accord client**. Piste : source départementale Jura
>    sur les barrières de dégel.
> 2. Lundi 02/11 : veille (étape 6).
> 3. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 27/10/2026 — prime sur tout ce qui suit.**
> ✅ `preparation-terrain` : Q/R gel/dégel (à vérifier en prod : 9 121 car., FAQ 8/8, IndexNow).
> 1. Prochain technique : lien `/contact` sur les 4 `/realisations/*` (près du bloc d'appel
>    final, rendu à vérifier).
> 2. Prochain contenu : `realisations/chantier-en-cours` (7 445) ou `/realisations/cour-allee-privee`
>    (7 670) ; accueil : **rien sans accord client**. Piste : source départementale Jura sur
>    les barrières de dégel (si trouvée, l'ajouter à la Q/R gel).
> 3. Lundi 02/11 : veille (étape 6).
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; fiche Google Business
>    Profile complète ; statut du mobile WhatsApp.

> 🆕 **MISE À JOUR DU 26/10/2026 — prime sur tout ce qui suit.**
> ✅ Maillage `/contact` depuis les pieds de page simplifiés (à vérifier en prod : `href="/contact"` sur `/services/enrobe-a-chaud`).
> 1. Prochain contenu : `preparation-terrain` (7 138, la plus maigre des services) ;
>    accueil : **rien sans accord client**.
> 2. Prochain technique : lien `/contact` sur les 4 `/realisations/*` (pas de pied de page :
>    à placer près du bloc d'appel final, rendu à vérifier).
> 3. GEO hors site (veille 26/10) : GBP et annuaires pèsent plus que le site dans les
>    citations IA locales → fiche Google Business Profile complète = action Yanis/Naofal.
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; statut du mobile
>    WhatsApp.

> 🆕 **MISE À JOUR DU 25/10/2026 — prime sur tout ce qui suit.**
> ✅ `bordures-murets` : Q/R drainage — vérifiée en prod (9 506 car., FAQ 6/6), IndexNow 200.
> 1. Lundi 26/10 : veille (étape 6).
> 2. Prochain technique : maillage `/contact` depuis `/mentions-legales` et les pieds de page
>    simplifiés (zone, services, réalisations).
> 3. Prochain contenu : `preparation-terrain` (7 138, la plus maigre des services) ;
>    accueil : **rien sans accord client**.
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; statut du mobile
>    WhatsApp.

> 🆕 **MISE À JOUR DU 24/10/2026 — prime sur tout ce qui suit.**
> ✅ `/contact` créée (à vérifier en prod : 16 URLs, FAQ 4/4, IndexNow).
> 1. Prochain contenu : `preparation-terrain` (7 138) ou `bordures-murets` (7 658) ; accueil :
>    **rien sans accord client**.
> 2. Lundi 26/10 : veille (étape 6).
> 3. Maillage `/contact` : lien depuis `/mentions-legales` et les pieds de page simplifiés
>    (zone, services, réalisations) — petit jour technique.
> 4. Yanis : Search Console (Performances IA + indexation `/contact`) ; statut du mobile
>    WhatsApp 06 81 78 96 41 (à mettre dans le NAP partout, ou nulle part).

> 🆕 **MISE À JOUR DU 23/10/2026 — prime sur tout ce qui suit.**
> ✅ `chantier-en-cours` : Q/R couche d'accrochage — vérifiée en prod, IndexNow 200.
> 1. Prochain technique : page `/contact` (NAP, horaires, accès, `ContactPage`) — ouverte depuis le 19/10.
> 2. Prochain contenu : `preparation-terrain` (7 138) ou `bordures-murets` (7 658) ; accueil
>    (5 529) : **rien sans accord client**.
> 3. Lundi 26/10 : veille (étape 6).
> 4. Yanis : rapport « Performances IA » de la Search Console ; réponse de Naofal sur la
>    portée de sa demande du 22/10 (voir Hypothèses).

> 🆕 **MISE À JOUR DU 22/10/2026 — prime sur tout ce qui suit.**
> ✅ Renvoi mort `/mentions-legales` → accueil retiré, `lastmod` alignés (à vérifier en prod).
> 1. Prochain contenu : `chantier-en-cours` (5 596) ; l'accueil (5 529) est désormais le
>    plus maigre, mais **ne rien y ajouter sans accord** (suppression client récente).
> 2. Prochain technique : page `/contact` (NAP, horaires, accès depuis Champagnole,
>    `ContactPage`) — idée de la veille du 19/10, toujours ouverte.
> 3. Lundi 26/10 : veille (étape 6).
> 4. Yanis : rapport « Performances IA » de la Search Console.

> 🆕 **MISE À JOUR DU 21/10/2026 — prime sur tout ce qui suit.**
> ✅ `parking-voirie-pro` : Q/R bornes de recharge (à vérifier en prod après push).
> 1. Prochain technique : URL/ancre contact stable portant le NAP (veille 19/10).
> 2. Prochain contenu : `chantier-en-cours` (5 596), la plus maigre.
> 3. Lundi 26/10 : veille (étape 6).
> 4. Yanis : rapport « Performances IA » de la Search Console.

> 🆕 **MISE À JOUR DU 20/10/2026 — prime sur tout ce qui suit.**
> ✅ Meta descriptions ≤ 160 car. sur les 15 URLs (à vérifier en prod après push).
> 1. Prochain contenu (mercredi) : `realisations/parking-voirie-pro` (6 356) ou `chantier-en-cours` (5 596).
> 2. Prochain technique : URL/ancre contact stable portant le NAP (veille 19/10).
> 3. Yanis : rapport « Performances IA » de la Search Console.

> 🆕 **MISE À JOUR DU 19/10/2026 — prime sur tout ce qui suit.**
> ✅ `maconnerie-generale` : 2 Q/R pose des pavés / dalles (guide CERIB 2017) — vérifiées en prod, IndexNow 200.
> 1. Prochain jour technique : meta descriptions > 160 car. (12 pages) **ou** URL/ancre contact stable (veille 19/10).
> 2. Prochain contenu : `realisations/chantier-en-cours` (5 596) ou `parking-voirie-pro` (6 356), les plus maigres.
> 3. Yanis : rapport « Performances IA » de la Search Console (impressions AI Overviews / Mode IA).

> 🆕 **MISE À JOUR DU 18/10/2026 — prime sur tout ce qui suit.**
> ✅ Images lourdes → WebP (accueil + maçonnerie) : faites et vérifiées en prod, IndexNow 200.
> 1. Prochain contenu : `maconnerie-generale` (5 726 car.), la page la plus maigre.
> 2. Lundi 19/10 : veille (étape 6).
> 3. Meta descriptions de 12 pages > 160 car. : raccourcir un jour « technique »
>    (gain = extrait lisible, pas de position).
> 4. H1 accueil « HCE », Bing Webmaster Tools : inchangés (Yanis).

> 🆕 **MISE À JOUR DU 17/10/2026 — prime sur tout ce qui suit.**
> ✅ Q/R eau / caniveau sur `drainage-pentes` : faites et vérifiées en prod, IndexNow 200.
> 1. Rien à revérifier.
> 2. Prochain angle **technique ou local** (3 jours de contenu Q/R d'affilée) ; contenu :
>    `maconnerie-generale` (5 726 car.) devient la page la plus maigre.
> 3. H1 de l'accueil « HCE » → proposition à Yanis (inchangé, rendu à valider).
> 4. Bing Webmaster Tools (action Yanis, inchangée).
> 5. Page ville Champagnole : écartée pour l'instant — `/zone-intervention` couvre
>    déjà Champagnole (distance, altitude, normales Météo-France) ; une page dédiée
>    serait quasi dupliquée.

> 🆕 **MISE À JOUR DU 16/10/2026 — prime sur tout ce qui suit.**
> ✅ Q/R sel / gazole : faits et vérifiés en prod, IndexNow 200.
> 1. H1 de l'accueil « HCE » → proposer à Yanis un H1 métier visible.
> 2. Bing Webmaster Tools (action Yanis, inchangée) — ChatGPT/Copilot lisent Bing.
> 3. Page ville Champagnole : seulement avec contenu propre (à étudier).
> 4. FAQ accueil : chiffres non sourcés → confirmation client (Hypothèses).
> 5. Prix au m² : `CONTENU-FIGE.md` interdit tout prix en ligne → ne pas en publier,
>    même en fourchette, sans accord écrit du client.

> 🆕 **MISE À JOUR DU 15/10/2026 — prime sur tout ce qui suit.**
> ✅ Q/R puits perdu / enrochement : **faits et vérifiés en prod**, IndexNow 200.
> 1. H1 de l'accueil « HCE » → proposer à Yanis un H1 métier visible.
> 2. Bing Webmaster Tools (action Yanis, inchangée).
> 3. Page ville Champagnole : seulement avec contenu propre (à étudier).
> 4. FAQ accueil : chiffres non sourcés → confirmation client (Hypothèses).

> 🆕 **MISE À JOUR DU 14/10/2026 — prime sur tout ce qui suit.**
> ✅ og:image / `HomeAndConstructionBusiness` / 301 : **faits et vérifiés en
> prod le 14/10**, IndexNow 200. Rien à revérifier.
> 1. H1 de l'accueil « HCE » → proposer à Yanis un H1 métier visible.
> 2. Bing Webmaster Tools (action Yanis, inchangée).
> 3. Prochain contenu : prestations listées mais jamais expliquées sur
>    `preparation-terrain` (**enrochement**, **puits perdu**) — requêtes réelles ;
>    sourcer (puits perdu : eaux pluviales seulement, l'ANC relève de l'arrêté du
>    7/09/2009 — ne rien affirmer sans le texte).
> 4. FAQ de l'accueil : chiffres non sourcés (« 20 à 30 ans », « 100 à 200 m²
>    en 2 à 4 jours ») → **Hypothèse à vérifier**, à faire confirmer par le client.

> 🆕 **MISE À JOUR DU 13/10/2026 — prime sur tout ce qui suit.**
> ✅ `<title>` des six services : **fait et vérifié en prod** (6/6), IndexNow 200.
> 1. H1 de l'accueil « HCE » → proposer à Yanis un H1 métier visible.
> 2. Bing Webmaster Tools (action Yanis, inchangée).
> 3. Requête « enrobé Champagnole » : page ville seulement avec contenu propre
>    (Champagnole à ~2,4 km de Cize, station Météo-France 39097003) — à étudier.
> 4. Galerie « Chantier en cours » vide (client), mentions légales (client),
>    `nodejs24.x` (Yanis) : inchangés.

> 🆕 **MISE À JOUR DU 12/10/2026 — prime sur tout ce qui suit.**
> ✅ `/realisations/chantier-en-cours` : **fait** (plus aucune page maigre).
> 1. Vérifier en prod après déploiement : chantier-en-cours **5 596 car.** (vérifié),
>    FAQ 4/4, lastmod 15/15 ; relancer `indexnow-submit.mjs`.
> 2. **Bing Webmaster Tools** (action Yanis, voir Techniques apprises 12/10) :
>    ChatGPT search et Copilot s'appuient sur l'index Bing — import depuis la
>    GSC en 2 min. Puis Bing Places si la fiche Google est revendiquée.
> 3. Requêtes villes (« enrobé Champagnole », « enrobé Lons-le-Saunier ») :
>    pas de page ville sans contenu propre et vrai ; la matière existe pour
>    Champagnole (station Météo-France déjà citée) — à étudier, sans doorway.
> 4. Migration `nodejs24.x` (touche `package.json`) → à proposer à Yanis.
> 4 bis. Galerie « Chantier en cours » **vide en prod** → photos à ajouter par
>    le client (admin). Ne rien faire côté base.
> 5. `/mentions-legales` dès que le client fournit capital, RCS, gérant,
>    médiateur.

> 🆕 **MISE À JOUR DU 11/10/2026 — prime sur tout ce qui suit.**
> ✅ Dette de vérification en ligne : **purgée** (prod = dernier commit).
> ✅ `/arnaque-goudronnage` : **faite**.
> 1. ✅ **Vérifié en prod le 11/10 après push** (`41f406e`, `success` en ~60 s) :
>    `/arnaque-goudronnage` 200, 10 646 car., FAQ 6/6, lastmod 15 URLs, rendu
>    mobile propre (capture), `llms.txt` « 11 octobre 2026 ». IndexNow : la
>    liste du script n'avait que 13 URLs (manquaient `/mentions-legales` et la
>    nouvelle page) → corrigée, **15 URLs soumises, HTTP 200**.
> 2. **Migration runtime `nodejs24.x`** : désormais possible (déblocage fait),
>    mais elle touche `package.json` (`engines`) → **hors périmètre de la
>    routine, à proposer à Yanis**, pas à faire seul.
> 3. `/realisations/chantier-en-cours` (373 car., galerie — ne rien inventer).
> 4. `/mentions-legales` dès que le client fournit capital, RCS, gérant,
>    médiateur.
> 5. Angle GEO non couvert : **mentions de la marque hors site** (8 annuaires
>    sans lien vers le site) — action client (fiche Google, liens d'annuaire).

> ⚠️ **MISE À JOUR DU 05/10/2026 — la condition « dès que le déploiement repart »
> qui ouvre le chantier ci-dessous est LEVÉE.** Elle supposait qu'il fallait
> éviter de pousser pendant le blocage ; c'était faux (un déploiement en échec ne
> touche pas la production). **Le chantier PagesJaunes se fait au prochain run,
> blocage résolu ou non** — il sera simplement en ligne plus tard. Deux réserves
> réelles, elles : **(a)** le push vers `main` a été refusé au runner le 05/10
> (motif « Production Deploy »), donc vérifier d'abord si `main` accepte un push,
> sinon pousser sur la branche de session et le signaler ; **(b)** la
> vérification en ligne du résultat restera impossible tant que les builds
> échouent — contrôler au banc d'essai local (`npm run build` + `verif-faq.mjs`).
>
> **AJOUTS DU 06/10/2026 — à traiter avant la liste du 05/10 ci-dessous :**
> - **Dette de vérification en ligne.** Tout ce qui a été poussé depuis le 02/10
>   n'a **jamais été vu en production** : la refonte de `/services/enrobe-a-chaud`
>   (11 856 car.), les deux dates de `public/llms.txt`, `engines.node`, le pin de
>   runtime. **Dès que le déploiement repart, repasser dans l'ordre :**
>   `mesure-texte-servi.mjs` sur `https://www.hcetp.com` (attendu : 11 856 car.
>   sur `enrobe-a-chaud`, les 12 autres URLs inchangées), puis `verif-faq.mjs` et
>   `verif-lastmod.mjs` en ligne, puis `llms.txt` doit afficher « 2 octobre
>   2026 ». **C'est la première chose à faire le jour du déblocage, avant tout
>   nouveau chantier.**
> - **Migration du runtime vers `nodejs24.x`.** Le pin est à `22.x` parce que
>   c'est la seule version sous laquelle le build de cet arbre est vérifié ici.
>   Vercel recommande 24.x et finira par déprécier 22 comme il l'a fait pour 20.
>   **À faire après le déblocage** (pas pendant : on ne mélange pas une migration
>   avec un diagnostic), en changeant `engines.node` ET
>   `nitro.vercel.functions.runtime` ensemble, et en vérifiant le pin par la
>   recette du 06/10 (le régler à une valeur fausse).
> - **Ne PAS retenter un correctif de déploiement dans le dépôt.** Les deux
>   leviers (`engines`, runtime épinglé) sont épuisés et mesurés. Voir l'encadré
>   d'« État des lieux » du 06/10.
>
> **Autres chantiers posés le 05/10, par ordre :**
> 1. **`/realisations/chantier-en-cours` — 373 caractères servis, de loin la page
>    la plus maigre du site.** Candidat de contenu le plus évident, et le filon
>    « page maigre » n'est donc pas épuisé contrairement à ce que disait le 29/09.
> 2. **Maillage interne des six pages `/services/*` : elles ne servent qu'un seul
>    lien interne chacune** (mesuré le 02/10, re-confirmé le 05/10 : colonne
>    `liensR` à 0 sur les six, contre 4 sur l'accueil et les `/realisations/*`).
>    Chantier identifié le 02/10 et jamais fait.
> 3. **Passer `engines.node` de `22.x` à `24.x`** (défaut Vercel, cible de long
>    terme), **après avoir essayé le build sous Node 24** — pas avant, et pas
>    pendant qu'on cherche la cause d'un échec de build.

> 🆕 **PREMIER CHANTIER À PRENDRE DÈS QUE LE DÉPLOIEMENT REPART (posé le
> 04/10/2026) — ajouter `pagesjaunes.fr/pros/52322496` aux `sameAs`.** La fiche a
> été lue et vérifiée le 04/10 : téléphone `03 84 52 61 48` et adresse actuelle
> `40 Bis avenue Etienne Lamy 39300 Cize`. Elle remplit donc **exactement** le
> critère appliqué à Mappy le 13/09 (bon téléphone + adresse actuelle), et elle
> est la deuxième fiche à le remplir. Les `sameAs` à compléter sont ceux de
> `__root.tsx` (~l. 126) et `index.tsx` (~l. 178), qui portent aujourd'hui quatre
> URLs. **Chantier volontairement non fait le 04/10** : c'est du code, il ne se
> serait pas déployé ni vérifié en ligne, et le dépôt doit rester dans l'état où
> le blocage de déploiement est apparu. Petit, fondé, prêt — à faire d'un trait
> une fois la production repartie, en recontrôlant d'abord que la fiche n'a pas
> changé.

> 🆕 **CANDIDAT N°1 DU PROCHAIN RUN (au 02/10/2026) — les six pages
> `/services/*` sont des culs-de-sac pour le crawl : chacune ne sert QU'UN seul
> lien interne, vers l'accueil.**
> **C'est mesuré en production le 02/10, pas supposé.** Le graphe des liens
> internes servis à Googlebot, relevé page par page sur les 13 URLs du sitemap :
>
> | Page | Liens internes servis |
> |---|---|
> | accueil | **13** (les 6 services, les 4 dossiers, le hub, `/zone-intervention`, `/signin`) |
> | `/realisations` | **10** |
> | les 4 `/realisations/$slug` | **7** chacune |
> | `/zone-intervention` | **5** |
> | **les 6 `/services/*`** | **1** — uniquement `/` |
>
> Autrement dit : les pages qui portent aujourd'hui le contenu le plus
> substantiel du site (3 783 à 11 856 caractères de Q/R sourcées) ne redistribuent
> **rien** — ni vers les dossiers de réalisations qui illustrent précisément leur
> service, ni vers `/zone-intervention` qui répond à la question du calendrier
> qu'elles soulèvent toutes, ni entre elles. Toutes les autres pages du site, elles,
> maillent correctement. **Le trou est localisé et réparable.**
> **Pourquoi c'est le meilleur chantier maintenant.** Le filon rédactionnel est
> près de l'épuisement (plus aucune page rédigée sous les 4 400 caractères), et
> l'angle « renforcer le maillage interne vers les pages stratégiques » figure dans
> les angles à alterner **sans avoir jamais été traité en 26 runs**. C'est le seul
> levier de ce type entièrement sous notre contrôle, et il est **mesurable
> avant/après avec l'outil déjà versionné** (colonne `liensR` de
> `mesure-texte-servi.mjs`, et le petit relevé de graphe refait au besoin).
> ⚠️ **Deux réserves à lever avant de rédiger, et elles sont sérieuses :**
> 1. **Le champ `a` des Q/R est rendu en texte brut** (`{f.a}` dans un `<p>`) :
>    impossible d'y glisser un lien sans toucher au composant de rendu. Deux
>    options honnêtes : placer les liens dans les sections de prose existantes, ou
>    ajouter au type `savoir` un champ optionnel « pour aller plus loin » rendu
>    **sous** le bloc. La seconde est plus propre et ne réécrit aucun texte
>    existant.
> 2. **Ne pas transformer ça en ferme de liens.** Trois à cinq liens contextuels
>    par page, vers la page réellement pertinente (un service vers le dossier de
>    réalisation qui l'illustre, et vers `/zone-intervention` pour le calendrier).
>    Un lien qui n'aide pas le lecteur est du maillage pour les robots, ce que la
>    consigne proscrit.
> **Candidat n°2 si le n°1 est écarté** : `/realisations/chantier-en-cours`, seule
> URL du sitemap encore sous les 400 caractères (373) et sans bloc daté. ⚠️ C'est
> une page de **galerie** : vérifier d'abord qu'il y a de la matière honnête (la
> mise en œuvre elle-même, l'enrobé répandu à la main à 150 °C) et **ne rien
> inventer sur un chantier précis**. C'est aussi la seule URL sans entrée dans
> `PAGE_UPDATED` — lui en donner une suffirait à lui offrir un `lastmod`.

> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 01/10/2026) —
> `/services/enrobe-a-chaud`, 3 783 caractères.**~~ **Fait le 02/10/2026** : bloc
> de 5 nouvelles Q/R sourcées sur la mise en œuvre (épaisseurs 5-8 cm et minimum
> 4-5 cm, classes 0/10 et 0/14 et module de richesse NF P 98-149, conditions de
> rechargement sur un enrobé existant, origine des dégradations hivernales et
> entretien des fissures, grade de bitume selon l'altitude), `FAQPage` aligné
> **10/10**, `lastmod` au 2026-10-02, report dans `llms.txt`. **3 783 → 11 856
> caractères servis.** L'angle « personnalisation d'enrobé » repéré chez SFCTP n'a
> **pas** été traité : il recoupe les Q/R médaillons de
> `/services/maconnerie-generale` (16/09), et aucune source primaire honnête n'a
> été trouvée sur les pigments et les liants de synthèse. **Plus aucune page
> rédigée du site n'est sous les 4 400 caractères**, à l'exception de la galerie
> `/realisations/chantier-en-cours` (373).

> 🆕 **CANDIDAT N°1 DU PROCHAIN RUN (au 01/10/2026) —
> `/services/enrobe-a-chaud`, 3 783 caractères : la page la plus maigre du site
> hors galerie, et c'est la page du métier principal.**
> **Pourquoi elle, et pourquoi maintenant.** Les 11 autres pages rédigées tiennent
> entre 4 482 et 13 526 caractères ; celle-ci est **la dernière sous les 4 000**.
> Or c'est la page qui porte **le service qui donne son nom à l'entreprise** et la
> requête commerciale mesurée ce run (« enrobé à chaud Jura entreprise »), sur
> laquelle le site est absent. Elle a bien reçu un bloc de Q/R le 11/09 (sur le
> goudronnage), mais c'est le plus ancien et le plus court des six.
> **Angle repéré ce run, et il est précis.** Le concurrent le mieux placé sur cette
> requête est **SFCTP / `franc-comtoise-tp.fr`** (Commenailles, 39), qui place
> **trois URLs dans les dix résultats**, dont une page dédiée à la
> **personnalisation d'enrobé**. C'est l'angle à contester — et HCE a de quoi le
> faire honnêtement, puisque l'accueil porte déjà « médaillons et inserts pavés
> intégrés à l'enrobé » et la pose à la main à 150 °C.
> **Matière métier à chercher (ce que personne ne publie, cf. ÉTAPE 4)** :
> épaisseurs et granulométries normalisées par usage (piéton / véhicule léger /
> poids lourd), ce que la norme **NF EN 13108** et **NF P98-150-1** imposent
> réellement, la fenêtre de pose dans le Jura reliée aux **normales Météo-France
> déjà relevées** (Champagnole 39097003 : 111,7 jours de gel/an ; Crotenay
> 39362001 : 51,9), et la différence chaud/froid déjà sourcée le 11/09.
> ⚠️ **Avant de rédiger : relire les 5 Q/R du 11/09 de cette même page ET celles
> de `finitions-soignees` (21/09)** pour ne pas doubler. Le journal signale que le
> filon « page maigre » a été déclaré épuisé le 29/09 — **cette page est
> l'exception qui restait**, pas une réouverture du filon.
> **Méthode inchangée** : patron des blocs `savoir`, réponse directe en tête de
> chaque H2, H2 formulés comme des questions posées à voix haute, sources
> primaires datées, `FAQPage` strictement aligné sur la FAQ visible, mesure
> avant/après au banc d'essai local avec `scripts/mesure-texte-servi.mjs` des deux
> côtés, puis `verif-faq.mjs` et `verif-lastmod.mjs` avant de pousser, et report
> dans `llms.txt`.

> 🆕 **01/10/2026 — Indicateur de progrès gratuit à relever à chaque run : le code
> de retour d'IndexNow.** `www.hcetp.com` renvoie **202** (clé en cours de
> vérification, hôte inconnu des moteurs) là où l'ancien domaine renvoyait **200**
> sur 24 soumissions. **Un passage de 202 à 200 signifierait que Bing a lu le
> fichier clé** — premier signe de vie côté moteur, et il ne coûte rien à mesurer.
> Le noter dans la table de positions à chaque run.

> ⚠️ **01/10/2026 — Rappel sur la priorité, inchangée depuis le 20/09 et renforcée
> par la bascule.** Le domaine est neuf : le compteur de découverte est à zéro, et
> **aucun chantier de contenu ne déclenchera l'indexation.** Les trois leviers
> restent hors du dépôt (Search Console sur `hcetp.com`, revendication de la fiche
> Google existante, revendication de `pagesjaunes.fr/pros/52322496`), tous
> désormais documentés avec le bon domaine dans `ACTIONS-SEO-CLIENT.md`.
> **Ne pas ouvrir de chantier au motif qu'il « aiderait l'indexation ».** Choisir
> les chantiers pour leur valeur propre.

> 🚨 **ALERTE DU 20/09/2026 — le délai de deux semaines fixé le 07/09 est
> écoulé, et le verdict est tombé : le domaine a besoin de liens entrants
> réels.**
> Le point n°2 ci-dessous disait : « si rien après ~2 semaines, c'est que le
> domaine a besoin de liens entrants réels ». Nous y sommes — **13 jours,
> 5 soumissions IndexNow en 200, toujours aucune page indexée, ni Google ni
> Bing**. Le canal IndexNow fonctionne, le site est techniquement sain, le
> contenu s'est étoffé de 900 à 7 000 caractères sur quatre pages service.
> **Aucun de ces leviers n'est celui qui manque.** Tout ce qui est faisable
> depuis le dépôt a été fait ou est du second ordre.
> **Ce qui débloquera l'indexation est hors du dépôt et demande le client :**
> 1. **Revendiquer la fiche `pagesjaunes.fr/pros/52322496`** et y déclarer
>    `https://www.hcebtp.com` — c'est la seule fiche *commerciale* des neuf,
>    elle accepte un lien sortant, et elle est déjà indexée. **Meilleur levier
>    identifié, inchangé depuis le 12/09.**
> 2. ~~**Créer une fiche Google Business Profile**~~ **CORRIGÉ le 21/09 : la fiche
>    existe déjà** (note Google 4,5/5, 16 avis, vue sur l'annuaire PagesJaunes
>    départemental). Il ne faut donc pas en créer une (doublon) mais **revendiquer
>    la fiche existante et y déclarer `https://www.hcebtp.com`**. C'est la porte
>    d'entrée la plus directe vers l'index de Google, et un levier encore plus fort
>    qu'une création puisqu'elle porte déjà 16 avis. Voir Action 2 du fichier client.
> 3. **Google Search Console** : ajouter la propriété `www.hcebtp.com` et
>    soumettre le sitemap. Aucun équivalent n'existe depuis le dépôt, IndexNow
>    ne couvrant pas Google.
> Tout cela figure déjà dans `ACTIONS-SEO-CLIENT.md`. **Le run du jour n'a pas
> les droits pour le faire ; le signaler est tout ce qu'il peut faire.**
> **Corollaire pour les prochains runs : ne plus ouvrir de chantier au motif
> qu'il « aiderait l'indexation ». Aucun ne le fera.** Choisir les chantiers
> pour leur valeur propre le jour où le site sera indexé.

> ✅ ~~**CANDIDAT N°1 — la galerie de l'accueil ne rend aucun lien côté
> serveur.**~~ **Fait le 15/09/2026** (commit `4ab0962`) : l'accueil sert
> désormais 4 liens `/realisations/*` et 5 681 caractères, vérifié en local
> puis en ligne. Le verrou invoqué le 14/09 (« le runner ne peut pas construire
> le projet ») **était faux** — voir la recette de build local dans
> « Techniques apprises », c'est l'acquis le plus réutilisable du 15/09.

> ✅ ~~**`/services/maconnerie-generale` ne sert que 904 caractères.**~~
> **Fait le 16/09/2026** (commit `47eaa16`) : bloc de 5 Q/R sourcées (normes
> NF EN 1338/1339/1340/1342, seuil des 50 unités en urbanisme), `FAQPage`,
> `seoDescription` et report dans `llms.txt`. **904 → 5 300 caractères servis**,
> vérifié en local puis en ligne.

> ✅ ~~**`/services/bordures-murets` (879 car.), la page la plus maigre du
> site.**~~ **Fait le 17/09/2026** : bloc de 5 Q/R sourcées (états-limites d'un
> mur de soutènement, déclaration préalable à 2 m, mitoyenneté, bordure coulée
> contre préfabriquée, 111,7 jours de gel/an à 2 km de Cize), `FAQPage`,
> `seoDescription` et report dans `llms.txt`. **879 → 7 012 caractères servis.**

> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN — `/services/finitions-soignees`
> (1 080 car.).**~~ **Fait le 21/09/2026** : bloc de 5 Q/R sourcées sur la
> finition et la fin de chantier (NF P98-150-1, décret n° 2020-1817 sur les
> mentions déchets des devis, tri à la source), `FAQPage`, `seoDescription`,
> report dans `llms.txt`. **1 080 → 6 821 caractères servis.** **Les six pages
> service ont désormais toutes un bloc `savoir`.** Le `title` anormal n'a PAS
> été touché (contenu figé client → à soumettre, voir « Hypothèses à vérifier »).
>
> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 21/09) — plus de page service maigre :
> changer de terrain.**~~ **Traité le 22/09/2026** : le terrain a changé pour les
> dossiers de réalisations, voir l'encadré ci-dessous. *Raisonnement d'origine
> conservé :* Les six services sont traités. Les meilleurs candidats
> restants, par ordre d'intérêt :
> - **`lastmod` dans le sitemap** depuis les dates de commit (n°4) — chantier
>   court et net, sûr, bon repli. À ne faire qu'avec des dates honnêtes.
> - **Enrichir le hub `/realisations`** d'un second bloc de Q/R : il a été créé
>   le 20/09, il a désormais eu le temps d'exister, et c'est la page de
>   destination naturelle d'une requête « réalisations enrobé Jura ».
> - **Enrichir l'accueil** ou une `/realisations/$slug` (les 4 dossiers plafonnent
>   à ~400 car. servis — mais attention, c'est du contenu de galerie, pas de la
>   rédaction : vérifier d'abord qu'il y a de la matière honnête à ajouter).
> **Méthode inchangée** : patron des blocs `savoir`, mesure avant/après au banc
> d'essai local avec **`scripts/mesure-texte-servi.mjs` des deux côtés**, et
> **`verif-faq.mjs`** pour prouver l'alignement JSON-LD/visible avant de pousser.

> 📌 *Archive de l'encadré du 15/09, conservé pour la trace du raisonnement :*
> `/services/maconnerie-generale` ne servait que 904 caractères,
> contre 3 938 à 5 502 pour les quatre autres pages
> service. C'était la page la plus maigre du site et **le meilleur candidat contenu
> depuis trois runs** ; le 14/09 comme le 15/09 l'ont écartée pour ne pas faire
> deux chantiers le même jour, pas parce qu'elle ne le méritait pas.
> **Pourquoi elle est rentable** : elle porte déjà « médaillons et inserts sur
> mesure », c'est-à-dire le vocabulaire des requêtes décoratives (pavage,
> dallage), et l'accueil contient la phrase « Médaillons et inserts pavés
> intégrés à l'enrobé » qui sert de test d'indexation depuis le 11/09.
> **Méthode** : bloc `savoir` sur le patron des 11, 12 et 13/09 (réponse directe
> en tête de chaque H2, H2 formulés comme des questions posées à voix haute,
> chiffres et sources primaires, `FAQPage` strictement aligné sur la FAQ
> visible). **Ne pas répéter les Q/R déjà publiées** sur l'enrobé (11/09), le
> terrassement (12/09) ou le drainage (13/09).
> **Matière repérée et non exploitée** : le volet *ombrage* des parkings
> existants de plus de 1 500 m² (échéance juillet 2026), fiche
> `entreprendre.service-public.gouv.fr/vosdroits/F38106`, lue le 13/09.
> **Mesurer avant / après avec le banc d'essai local** (recette du 15/09), et
> **le même script pour les deux mesures** (voir l'avertissement du 15/09 sur les
> écarts d'extracteur).

> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 22/09) — `/realisations/cour-allee-privee`.**~~
> **Fait le 23/09/2026** (commit `eafd0a3`) : bloc de 5 Q/R sourcées sur
> l'accès à la voie publique (L113-2 et L111-1 du code de la voirie routière),
> le busage du fossé et l'amende de 5e classe (R\*116-2, 131-13 du code pénal),
> le démarchage à domicile (L221-10 et L221-18 du code de la consommation, fiche
> F23224), le financement d'un chemin d'accès partagé (682, 697, 698 du code
> civil) et l'écoulement vers la voie publique (R\*116-2, 4°). **399 → 7 670
> caractères servis**, `FAQPage` aligné 5/5, `llms.txt` à jour. **La réserve de
> doublon posée le 22/09 a été levée en relisant les deux blocs concernés avant
> de rédiger : aucune des cinq questions ne recoupe les 30 déjà publiées.**
>
> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 23/09) — `/realisations/preparation-terrassement`
> (400 car.).**~~ **Fait le 25/09/2026** (commit `68f7a52`) : bloc de 5 Q/R
> sourcées sur les seuils d'autorisation d'urbanisme d'un mouvement de terre
> (R\*421-23 f et R\*421-19 k du code de l'urbanisme), la classification des sols
> (NF EN 16907-2 du 07/09/2019 et NF P11-300 du 22/01/2025), le contrôle réel du
> compactage (NF P94-105 du 15/10/2025, pénétromètre dynamique à énergie
> variable), la saison de terrassement dans le Jura (normales Météo-France de
> Champagnole : 1 573,2 mm/an sur 143,6 jours de pluie ≥ 1 mm) et la sortie du
> statut de déchet des terres excavées (arrêté du 4 juin 2021). **400 → 8 156
> caractères servis**, `FAQPage` aligné 5/5, `llms.txt` à jour. **Le thread des
> seuils d'affouillement, ouvert le 12/09 et jamais résolu, est tranché.** La
> réserve de doublon avec `/services/preparation-terrain` a été levée en relisant
> ses cinq Q/R avant de rédiger. *Raisonnement d'origine conservé ci-dessous.*
>
> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 25/09) — le `lastmod` du sitemap.**~~
> **Fait le 27/09/2026** (commit `51d45aa`) : 10 des 12 URLs ont un `<lastmod>`,
> lu dans `src/lib/lastmod.ts`, la même source que la date affichée par la page ;
> les 2 URLs sans date visible (accueil, `chantier-en-cours`) sortent sans
> `lastmod`, volontairement. `scripts/verif-lastmod.mjs` garde l'alignement.
> **Le point n°4 ci-dessous, en attente depuis le 09/09, est clos.**
>
> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 27/09) — enrichir le hub
> `/realisations` d'un second bloc de Q/R.**~~ **Fait le 28/09/2026** (commit
> `79dca13`) : quatre Q/R sourcées sur la réception des travaux (article 1792-6
> al. 1 du code civil), la garantie de parfait achèvement d'un an et sa
> différence avec la décennale (al. 2 à 6), le taux de TVA d'une allée privée
> (article 279-0 bis du CGI, BOI-ANNX-000208 du 31/07/2024 qui nomme
> l'« enrobage », BOI-TVA-LIQ-30-20-90-30 du 22/10/2025) et la garantie de
> paiement des marchés privés (article 1799-1 du code civil, seuil de 12 000 €
> HT du décret n° 99-658). **Le bloc passe de 4 à 8 Q/R, 6 258 → 13 260
> caractères servis**, `FAQPage` aligné 8/8, `lastmod` avancé au 28/09,
> `llms.txt` à jour. Les trois angles repérés le 27/09 (réception, parfait
> achèvement, paiement) ont tous trouvé leur source primaire ; le quatrième
> (TVA) est une trouvaille du jour.
>
> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 28/09) — enrichir l'accueil
> (5 499 car.).**~~ **Fait le 29/09/2026** (commit `6a11554`) : bloc « Avant de
> signer » de 5 Q/R sourcées sur le devis obligatoire et ses mentions (fiche
> service-public.gouv.fr F31144), le devis gratuit ou payant et sa durée de
> validité, la valeur contractuelle d'un devis signé (fiche F2533), la
> distinction arrhes / acompte (article L214-1 du code de la consommation) et
> le délai de trente jours à défaut de date écrite (articles L216-1 et L216-6).
> **5 499 → 13 378 caractères servis**, `FAQPage` porté de 6 à 11 et aligné
> 11/11, première clé `"/"` dans `src/lib/lastmod.ts`, `llms.txt` à jour.
> *Raisonnement d'origine conservé ci-dessous.*
>
> 📌 *Raisonnement d'origine du 28/09 :* **enrichir l'accueil (5 499 car.).** C'est désormais le meilleur candidat restant, et de loin :
> **la page la plus visitée du site, la seule page de fond sans « Dernière mise
> à jour », et la moins travaillée depuis le 15/09** (où seul le rendu des liens
> de galerie avait été corrigé, pas le contenu). Elle porte déjà un `FAQPage` de
> 6 Q/R **construit depuis la constante `FAQS` de `src/components/sections.tsx`,
> qui peut être surchargée par le CMS** — lire l'entrée correspondante des
> « Hypothèses à vérifier » AVANT d'y toucher : ajouter une Q/R dans `FAQS` est
> sans danger, mais le jour où le client édite la FAQ depuis l'admin, le JSON-LD
> ne suivra pas. **Attention au doublon** : 30 Q/R de services + 23 Q/R de
> réalisations sont déjà publiées, **les relire avant de rédiger**. Angles qui
> n'appartiennent à aucune page existante et qui conviennent à un accueil :
> comment se déroule une visite de chantier et ce qu'elle permet de chiffrer ;
> ce qu'un devis de travaux doit obligatoirement mentionner (décret n° 2020-1817
> sur les déchets est déjà cité sur `finitions-soignees` — chercher autre chose,
> par exemple les mentions du devis de travaux côté consommateur) ; quelle
> surface minimale justifie une intervention. **Si l'accueil reçoit un bloc
> daté, ajouter sa clé dans `src/lib/lastmod.ts`** — le sitemap suivra seul, et
> `verif-lastmod.mjs` le contrôlera.
> *Repli sûr* : `/realisations/chantier-en-cours` (373 car.) reste le dernier
> contenu maigre, mais **toujours sans angle sourçable** (voir « décidé de ne pas
> faire » du 28/09). Ne l'ouvrir que le jour où une source primaire apparaît.
>
> 📌 *Raisonnement d'origine du 27/09, conservé :* **enrichir le hub
> `/realisations` d'un second bloc de Q/R.** C'est le meilleur des candidats
> restants : créé le 20/09, il a eu le temps d'exister, il est la destination
> naturelle d'une requête « réalisations enrobé Jura », et il ne porte
> aujourd'hui que **4** Q/R quand les dossiers en ont 5. L'infrastructure est
> celle de `realisations.index.tsx` (constante `SAVOIR`), déjà branchée sur le
> `FAQPage` et sur `src/lib/lastmod.ts` — **penser à faire avancer la date dans
> `src/lib/lastmod.ts` et nulle part ailleurs, le sitemap suivra seul.**
> **Attention au doublon** : les 4 Q/R du hub couvrent déjà la garantie
> décennale (champ, point de départ, attestation) et la zone d'intervention.
> **Les relire avant de rédiger**, ainsi que les 5 de `cour-allee-privee` et les
> 5 de `parking-voirie-pro`. Angles non encore utilisés, à condition de trouver
> une source primaire lisible : la réception des travaux et le procès-verbal
> (le point de départ de la décennale est cité, l'acte lui-même non) ; la
> garantie de parfait achèvement à un an, distincte de la décennale ; l'acompte
> et l'échelonnement des paiements sur un chantier de travaux.
> *Repli sûr si le sujet ne se source pas* : enrichir l'accueil (5 499 car., la
> page la plus visitée et la moins travaillée depuis le 15/09).
>
> 📌 *Raisonnement d'origine du 25/09, conservé :* changer de terrain, PAS
> `chantier-en-cours`. Il ne reste qu'un dossier maigre, `/realisations/chantier-en-cours`
> (373 car.), et c'est **le plus difficile à sourcer honnêtement** : une galerie
> de chantiers en action, pas un sujet technique. Ne l'ouvrir que le jour où un
> angle honnête apparaît (le compactage en cours de pose ? la température de
> 150 °C et sa fenêtre de mise en œuvre ? — à condition de trouver une source
> primaire lisible, ce qui n'a jamais été vérifié). **Les meilleurs candidats du
> 26/09, par ordre d'intérêt :**
> - **`lastmod` dans le sitemap** depuis les dates de commit (point n°4) —
>   toujours pas fait après neuf runs, court, net et sûr. **C'est son tour.** Les
>   dates existent maintenant page par page (`git log -1 --format=%cI` sur le
>   fichier qui porte le contenu), donc la contrainte « uniquement des dates
>   honnêtes » est satisfaisable sans rien inventer.
> - **Enrichir le hub `/realisations`** d'un second bloc de Q/R : créé le 20/09,
>   il a eu le temps d'exister, et c'est la destination naturelle d'une requête
>   « réalisations enrobé Jura ».
> - **Enrichir l'accueil** (5 499 car.) : la page la plus visitée, et la moins
>   travaillée depuis le 15/09.
>
> 📌 *Raisonnement d'origine du 23/09, conservé :* `/realisations/preparation-terrassement`
> (400 car.). Il reste **deux** dossiers maigres sur quatre, et
> l'infrastructure est rodée : **une entrée dans `REAL_SAVOIR` suffit**, le
> composant et le `FAQPage` se branchent seuls (vérifié deux fois, les 22 et
> 23/09). **Attention au doublon** : `/services/preparation-terrain` est déjà
> dense (DT-DICT, terres excavées, compactage par couches, délais) — **relire
> ses 5 Q/R avant de rédiger**. Angles repérés et NON encore utilisés, à
> condition de trouver une source primaire lisible : le **classement GTR des
> sols** et la portance (si une source gratuite existe, ce qui n'a jamais été
> vérifié) ; la **réutilisation des déblais sur site** plutôt que l'évacuation ;
> les **seuils d'urbanisme des affouillements et exhaussements** (thread ouvert
> depuis le 12/09, jamais résolu — **le vérifier d'abord, ne pas le supposer**).
> Le dernier dossier, `/realisations/chantier-en-cours` (373 car.), reste **le
> plus difficile à sourcer honnêtement** : c'est une galerie de chantiers en
> action, pas un sujet technique. À garder pour la fin.
>
> 📌 *Raisonnement d'origine du 22/09, conservé :* les trois dossiers de
> réalisations encore à ~400 caractères. `parking-voirie-pro` est traité
> (401 → 6 356 car. le 22/09) et l'infrastructure existe : **il suffit d'ajouter
> une entrée à `REAL_SAVOIR` dans `realisations.$slug.tsx`**, le composant
> `CategorySavoir` et le `FAQPage` se branchent tout seuls. Par ordre d'intérêt :
> - **`/realisations/cour-allee-privee`** (399 car.) — vise « goudronnage cour
>   maison Jura », une des six requêtes suivies. **Attention au doublon** :
>   l'angle cour privée est déjà largement couvert par `/services/enrobe-a-chaud`
>   (goudronnage, BBSG, 150 °C, hiver dans le Jura, médaillons et pavés) et
>   `/services/drainage-pentes` (pente de 1,5 %, flaques, eau chez le voisin).
>   **Relire ces deux blocs avant de rédiger** et chercher un angle neuf (entrée
>   charretière et accès à la voie publique ? raccordement au domaine public ?
>   permission de voirie ?) — à condition de trouver une source primaire lisible.
> - **`/realisations/preparation-terrassement`** (400 car.) — même précaution
>   vis-à-vis de `/services/preparation-terrain` (DT-DICT, terres excavées,
>   compactage par couches), déjà dense.
> - **`/realisations/chantier-en-cours`** (373 car.) — le plus maigre, mais aussi
>   le plus difficile à sourcer honnêtement : c'est une galerie de chantiers en
>   action, pas un sujet technique. À garder pour la fin.
> **Méthode inchangée** : patron des blocs `savoir`, mesure avant/après au banc
> d'essai local avec `scripts/mesure-texte-servi.mjs` **des deux côtés**,
> `verif-faq.mjs` (version avec décodage d'entités, cf. 22/09) pour prouver
> l'alignement JSON-LD/visible, et **`npx eslint` comparé à la version HEAD du
> fichier**, pas supposé.
>
> **Autres candidats, si l'on veut changer de terrain** :
> - **`lastmod` dans le sitemap** depuis les dates de commit (n°4) — chantier
>   court et net, sûr, toujours pas fait. Bon repli un jour chargé. À ne faire
>   qu'avec des dates honnêtes.
> - **Enrichir le hub `/realisations`** d'un second bloc de Q/R.
> - **Enrichir l'accueil** (5 499 car., la page la plus visitée et la moins
>   travaillée depuis le 15/09).

> ✅ ~~**CANDIDAT N°1 DU PROCHAIN RUN (au 29/09) — une page de destination pour
> une requête géographique non couverte.**~~ **Fait le 30/09/2026** (commit
> `6cc006e`) : création de `/zone-intervention`, **8 578 caractères servis**,
> 4 blocs JSON-LD, table des six communes repères (distances orthodromiques
> depuis Cize et altitudes IGN RGE ALTI) et 4 Q/R dont la comparaison chiffrée
> de deux stations Météo-France séparées de 239 m de dénivelé (51,9 contre
> 111,7 jours de gel par an). La condition posée le 29/09 — *« y a-t-il de la
> matière honnête, ou non ? »* — a été **tranchée par l'affirmative avant
> rédaction**, en vérifiant que trois référentiels publics répondent depuis le
> runner. La précaution « pas de pages de villes interchangeables » est tenue :
> **une** page informée, six communes qui sont celles déclarées par l'entreprise,
> aucune ajoutée.

> 🔴 **CANDIDAT N°1 DU PROCHAIN RUN (au 30/09) — les épaisseurs, les
> granulométries et la fenêtre de température de pose : le dernier trou béant du
> site, MAIS seulement si une source primaire apparaît.** Le run du 30/09 a buté
> dessus une cinquième fois : le bloc « l'enrobé chaud supporte-t-il le trajet
> jusqu'au chantier ? » a été **abandonné faute de source** (la fiche Norm'Info
> de la NF P98-150-1 a répondu 404). C'est pourtant la question la plus naturelle
> sur les requêtes « enrobé à chaud Jura » et « enrobé à chaud Ain ».
> ⚠️ **Ne pas y consacrer un run entier à l'aveugle** — cinq tentatives ont
> échoué depuis le 11/09. **Piste neuve et non essayée**, repérée le 30/09 :
> `llms.txt` affirme déjà quelque part que l'enrobé à chaud « demande un support
> sec et plus de 5 °C ». **D'où vient ce « 5 °C » ?** S'il a une source, elle
> ouvre le sujet ; s'il n'en a pas, c'est un chiffre non sourcé publié sur le
> site et il faut le traiter comme tel. **Commencer par ça : c'est une question
> à dix minutes, pas un run.**
> Les autres candidats, par ordre d'intérêt :
> - **Le risque `FAQS` / CMS sur l'accueil.** L'accueil porte 11 questions dont
>   6 surchargeables depuis l'admin ; le jour où le client en édite une, le
>   JSON-LD ne suivra pas → mismatch sanctionnable. Générer le `FAQPage` depuis
>   la base plutôt que depuis la constante. **Chantier technique, pas éditorial**,
>   il touche au chargement de la page : voir « Hypothèses à vérifier », à
>   évaluer sérieusement, pas à improviser un jour chargé. **C'est le seul
>   défaut structurel connu qui reste sur le site.**
> - **Enrichir `/zone-intervention`**, mais **pas avant plusieurs jours** : elle
>   vient d'être créée, laissons-la exister (c'est la règle qui a bien servi pour
>   le hub `/realisations`, créé le 20/09 et enrichi le 28/09). Angles repérés et
>   non utilisés : la fenêtre de température de pose (voir ci-dessus), et les
>   contraintes d'accès d'un camion d'enrobé en voirie étroite **si** une source
>   apparaît.
> - **`/realisations/chantier-en-cours`** (373 car.), la seule page sans bloc de
>   fond, **toujours sans angle sourçable**. Ne l'ouvrir que le jour où une source
>   primaire apparaît — ce qui rejoint exactement le sujet des épaisseurs et des
>   températures ci-dessus. **Si ce filon s'ouvre, il débloque les deux d'un
>   coup.**
> - **Le `title` anormal de `/services/finitions-soignees`** : **transmis au
>   client dans la notification du 30/09**, comme demandé. Ne rien faire tant
>   qu'il n'a pas répondu — c'est du contenu visible figé.

> 📌 *Raisonnement d'origine du 29/09, conservé :* **le filon « page maigre » est
> épuisé : le prochain chantier se choisit sur la REQUÊTE, plus sur le nombre
> de caractères.** Onze des douze URLs portent maintenant un bloc de fond
> sourcé et daté ; la seule qui n'en a pas, `/realisations/chantier-en-cours`
> (373 car.), reste **sans angle sourçable** (voir « décidé de ne pas faire »
> des 25 et 28/09) et ne doit être ouverte que le jour où une source primaire
> apparaît. **Ne pas ouvrir un chantier au seul motif qu'une page est courte :
> il n'y en a plus.** Les candidats, par ordre d'intérêt :
> - **Une page de destination pour une requête géographique non couverte.**
>   Les six requêtes suivies nomment le Jura et l'Ain, mais **aucune page ne
>   cible une ville**. Rien sur Lons-le-Saunier, Oyonnax, Bourg-en-Bresse,
>   Champagnole ou Saint-Claude, alors que le `LocalBusiness` déclare deux
>   départements. **Précaution absolue : ne pas fabriquer de pages de villes
>   vides et interchangeables** (c'est du contenu de remplissage, exactement ce
>   que la doctrine de Google du 14/09 sanctionne). Une page de zone
>   d'intervention **unique et réellement informée** (distances depuis Cize,
>   contraintes d'accès, saison de pose selon l'altitude — les normales
>   Météo-France de Champagnole sont déjà exploitées et citables) vaut mieux
>   que dix pages de villes. **À trancher avant de rédiger : y a-t-il de la
>   matière honnête, ou non ? Si non, ne pas le faire.**
> - **Le risque `FAQS` / CMS sur l'accueil**, maintenant que l'accueil porte 11
>   questions dont 6 surchargeables : générer le `FAQPage` depuis la base
>   plutôt que depuis la constante. **Chantier technique, pas éditorial**, et
>   il touche au chargement de la page — voir « Hypothèses à vérifier », à
>   évaluer sérieusement avant d'y toucher, pas à improviser un jour chargé.
> - **Le `title` anormal de `/services/finitions-soignees`** (« Vous avez un
>   projet d'aménagement de cour en enrobé »), en attente depuis le 14/09 :
>   c'est du contenu visible figé côté client, donc **à lui soumettre**, pas à
>   corriger. À joindre à l'alerte hebdomadaire du 30/09.
> - **Les épaisseurs et granulométries d'enrobé**, toujours le trou le plus
>   visible du site côté requêtes, **si et seulement si** une source primaire
>   gratuite apparaît (thread ouvert depuis le 11/09, quatre tentatives
>   infructueuses — ne pas y consacrer un run entier à l'aveugle).

1. **Vérifier l'indexation à chaque run.** Tant que `site:hcebtp.com` ne renvoie
   rien, la priorité reste la découverte, pas le contenu.
2. **Vérifier le résultat IndexNow.** Si Bing indexe dans les jours qui suivent,
   c'est la preuve que le blocage était bien la découverte et non un filtre
   qualité. Si rien après ~2 semaines, c'est que le domaine a besoin de liens
   entrants réels (action 4 du fichier client). **Le canal lui-même fonctionne :
   soumission en 202 au 1er run du 07/09, puis en 200 au 2e run le même jour, ce
   qui veut dire que la clé est vérifiée.** Ne plus perdre de temps à diagnostiquer
   IndexNow — s'il n'y a toujours rien dans Bing, le problème est ailleurs.
3. ~~**Titres et descriptions des pages `/realisations/*`.**~~ **Fait le
   10/09/2026** (commit `68f9fa2`). Les 5 URLs ont désormais des `<title>` et meta
   descriptions uniques, accentués et géolocalisés (+ `og:title`/`og:description`),
   via un tableau statique `REAL_META` dans `realisations.$slug.tsx` et un `head()`
   enrichi sur `avant-apres`. Vérifié en ligne.
4. ~~**`lastmod` dans le sitemap.** Absent.~~ **Fait le 27/09/2026** (commit
   `51d45aa`), après dix runs d'attente. La contrainte « uniquement des dates
   honnêtes » est tenue autrement que prévu : au lieu de recopier des dates de
   commit dans le sitemap, le `lastmod` **lit la date que la page affiche déjà**
   (`src/lib/lastmod.ts`, source unique). Les dix dates ont été recoupées une par
   une avec `git log -L` sur le bloc de contenu concerné. Les deux URLs sans date
   visible sortent sans `lastmod`. **Entretien : ne jamais modifier une date
   ailleurs que dans `src/lib/lastmod.ts`, ne la faire avancer que lorsque le
   contenu change vraiment, et lancer `node scripts/verif-lastmod.mjs` avant de
   pousser** — il échoue en code 1 à la première divergence.
5. ~~**Aucune page ne cible « goudronnage »**~~ **Fait le 11/09/2026** (commit
   `47499e2`) : bloc de 5 Q/R sourcées sur `/services/enrobe-a-chaud`, `FAQPage`
   correspondant, meta description, `llms.txt`. **Reste à faire dessus** : mesurer
   dans quelques semaines si la page ressort sur « goudronnage cour Jura », et
   compléter avec des épaisseurs/granulométries **le jour où une source primaire
   lisible sera trouvée** (voir « décidé de ne pas faire » du 11/09).
6. ~~**`BreadcrumbList`**~~ **Fait.** Les six `/services/*` le 11/09/2026, les
   quatre `/realisations/$slug` le 14/09/2026 (commit `352c250`), à deux niveaux
   et vérifiés en ligne (le `name` de niveau 2 est strictement égal au `<h1>`).
   ~~**Reste la seule `/realisations/avant-apres`**~~ **Sans objet** : la page a
   été retirée le 17/09 à la demande du client, la route ne fait plus que
   rediriger en 301.
   ~~**Ne jamais insérer de niveau « Réalisations » : `/realisations` répond 404.**~~
   **Périmé le 20/09/2026** : le hub `/realisations` existe, et les quatre
   `/realisations/$slug` ont un fil d'ariane à trois niveaux depuis ce jour-là.
7. ~~**Adresse postale complète absente** du `LocalBusiness`.~~ **Fait le
   07/09/2026 (2e run).** L'adresse était déjà publiée dans le pied de page du
   site, il n'y avait rien à demander au client.
8. **Éviter les runs concurrents.** Deux runs ont tourné le 07/09 et le second a
   commencé par refaire une partie du premier. **Réflexe à prendre au tout début
   de chaque run : `git fetch origin main && git log --oneline -5 origin/main`
   avant même de lire ce journal** — le journal du repo local peut être en
   retard de plusieurs commits sur ce qui a déjà été poussé aujourd'hui.
9. ~~**`sameAs` à ajouter** au `LocalBusiness` dès que les premières fiches
   externes existeront.~~ **Fait le 08/09/2026** — la fiche `societe.com` existait
   déjà, il n'y avait pas à attendre. À **compléter** dès que Google Business
   Profile, Pappers ou une page réseau social vérifiée existeront : le tableau
   `sameAs` est en place, il suffit d'y ajouter des URLs (une seule règle :
   vérifier chaque URL en 200 et confirmer qu'elle décrit bien HCE avant de
   l'ajouter).
10. **Angles déjà utilisés, à ne pas reprendre tout de suite** : 07/09 hôte
    canonique + IndexNow ; 07/09 (2e) NAP interne + consolidation `@id` ;
    08/09 identité légale + `sameAs` ; 09/09 lisibilité de la FAQ pour les
    crawlers + recensement des fiches externes ; 10/09 titres/descriptions
    `/realisations/*` + `sameAs` manageo ; **11/09 contenu « goudronnage » sourcé
    + `FAQPage`/`BreadcrumbList` sur les services**.
    **12/09 contenu « terrassement » sourcé (DT-DICT, terres excavées) sur
    `/services/preparation-terrain` + repérage de la fiche PagesJaunes.**
    **13/09 contenu « eau / eaux pluviales » sourcé (Code civil, parkings de
    plus de 500 m²) sur `/services/drainage-pentes` + `sameAs` mappy.**
    **14/09 rendu serveur des 4 pages `/realisations/$slug` (62 → ~380 car.),
    maillage interne « Voir aussi » et `BreadcrumbList` + veille du lundi.**
    **15/09 rendu serveur des cartes de la galerie de l'accueil (0 → 4 liens
    `/realisations/*`) + mise en place du banc d'essai de build local.**
    **16/09 contenu « pavage / dallage / bordures » sourcé (normes NF EN 1338,
    1339, 1340, 1342 et seuil des 50 unités en urbanisme) sur
    `/services/maconnerie-generale` + `FAQPage` + `seoDescription` + llms.txt.**
    **17/09 contenu « bordures et murets » sourcé (états-limites NF P94-281,
    déclaration préalable à 2 m et R*421-12, mitoyenneté 653-673 du Code civil,
    normales climatiques Météo-France de Champagnole) sur
    `/services/bordures-murets` + `FAQPage` + `seoDescription` + llms.txt,
    et versionnement de `scripts/mesure-texte-servi.mjs`.**
    **20/09 création du hub `/realisations` (404 → 6 258 car.), fil d'ariane à
    trois niveaux sur les pages dossier, maillage depuis l'accueil, Q/R sourcées
    sur la garantie décennale appliquée à la voirie (fiche service-public
    F2034) + `src/lib/realisations.ts` comme source unique.**
    **21/09 contenu « finition et fin de chantier » sourcé (NF P98-150-1 sur la
    mise en œuvre, décret n° 2020-1817 sur les mentions déchets des devis, tri à
    la source F37782) sur `/services/finitions-soignees` + `FAQPage` +
    `seoDescription` + llms.txt + veille du lundi (AI Overviews & recherche
    locale) + correction de l'hypothèse « pas de fiche Google ».**
    **22/09 contenu « réfection de parking professionnel » sourcé (NF P98-086 sur
    le dimensionnement structurel, NF EN 12697-22+A1 sur l'essai d'orniérage,
    arrêté du 20/04/2017 art. 3 sur les places accessibles, L111-19-1 sur
    l'ombrage des parcs) sur `/realisations/parking-voirie-pro` + `REAL_SAVOIR`
    + `CategorySavoir` rendu dans les deux états servis + `FAQPage` + llms.txt
    + veille du lundi (parsing JSON-LD simple-passe de Google, audit négatif).**
    **23/09 contenu « accès à la voie publique et démarchage » sourcé (L113-2 et
    L111-1 du code de la voirie routière, R\*116-2 et 131-13 du code pénal,
    L221-10 et L221-18 du code de la consommation + fiche F23224, articles 682,
    697 et 698 du code civil) sur `/realisations/cour-allee-privee` +
    `REAL_SAVOIR` + `FAQPage` + llms.txt, et versionnement de
    `scripts/verif-faq.mjs`.**
    **25/09 contenu « terrassement : urbanisme, sols et compactage » sourcé
    (R\*421-23 f et R\*421-19 k du code de l'urbanisme, NF EN 16907-2 et
    NF P11-300 pour la classification des matériaux, NF P94-105 pour le contrôle
    de compactage, normales de précipitations Météo-France de Champagnole,
    arrêté du 4 juin 2021 sur la sortie du statut de déchet des terres excavées)
    sur `/realisations/preparation-terrassement` + `REAL_SAVOIR` + `FAQPage` +
    llms.txt.**
    **28/09 second bloc de Q/R sur le hub `/realisations` (réception des
    travaux et article 1792-6 al. 1 du code civil, garantie de parfait
    achèvement al. 2 à 6, TVA à 10 % d'une allée privée avec BOI-ANNX-000208 du
    31/07/2024 et BOI-TVA-LIQ-30-20-90-30 du 22/10/2025, garantie de paiement
    de l'article 1799-1 et seuil de 12 000 € HT du décret n° 99-658) + veille
    du lundi (élagage des types de données structurées par Google, le BOFiP
    comme filon).**
    **29/09 contenu « avant de signer » sourcé sur l'accueil (devis obligatoire
    et ses mentions via la fiche F31144 vérifiée le 09/09/2022, devis gratuit ou
    payant et durée de validité, valeur contractuelle du devis signé via la
    fiche F2533 vérifiée le 28/03/2024, arrhes contre acompte via l'article
    L214-1 du code de la consommation, délai supplétif de trente jours et
    recours via les articles L216-1 et L216-6) + `FAQPage` de l'accueil porté de
    6 à 11 questions + première clé `"/"` dans `lastmod.ts` + deux liens
    internes + llms.txt.**
    **30/09 création de `/zone-intervention` (0 → 8 578 car.) : première page
    géographique du site, table des six communes repères avec distances
    orthodromiques depuis Cize et altitudes IGN RGE ALTI, comparaison chiffrée
    des stations Météo-France de Lons-le-Saunier (39362001, 298 m) et de
    Champagnole (39097003, 537 m) sur les jours de gel, les précipitations et la
    température moyenne, détail mensuel faisant de mars le mois de bascule,
    `WebPage` + `BreadcrumbList` + `FAQPage`, deux liens entrants (accueil et hub
    `/realisations`) + notification hebdomadaire au client.**
    **✅ MISE À JOUR DU 30/09 : douze des treize URLs portent un bloc de fond
    sourcé et daté, et le site a désormais une page par grande intention —
    services, réalisations, géographie, contrat. Le prochain chantier ne se
    choisit plus ni sur le volume ni sur l'intention manquante, mais sur la
    SOURCE : c'est la disponibilité d'une source primaire qui décide, et le
    sujet en attente est celui des épaisseurs / granulométries / températures.**
    *Constat du 29/09, conservé :*
    **✅ MISE À JOUR DU 29/09 : les onze pages de fond du site portent
    désormais un bloc sourcé et daté. Le filon « page maigre » est ÉPUISÉ — il
    ne reste que `chantier-en-cours` (373 car.), sans angle sourçable. Le
    prochain chantier se choisit sur la requête visée, pas sur le volume.**
    *Constat périmé du 25/09, conservé :*
    **✅ MISE À JOUR DU 25/09 : les six pages service ET trois des quatre
    dossiers de réalisations ont un bloc `savoir`. Il n'en reste qu'un,
    `chantier-en-cours` (373 car.), et c'est le plus dur à sourcer — le filon
    « page maigre » est donc quasiment épuisé lui aussi. Le prochain run change
    de terrain (sitemap `lastmod`, hub `/realisations`, accueil).**
    *Constat périmé du 23/09, conservé :* **Les six pages service ont toutes un bloc `savoir`, et deux des quatre
    dossiers de réalisations aussi (`parking-voirie-pro` le 22/09,
    `cour-allee-privee` le 23/09). Il en reste deux :
    `preparation-terrassement` (400 car.) puis `chantier-en-cours` (373 car.).**
    *Constat du 22/09, conservé :* les six pages service ont toutes un bloc
    `savoir`, et le premier des quatre dossiers de réalisations aussi. Le prochain run continue sur les trois
    dossiers restants (l'infrastructure est posée), ou change de terrain
    (sitemap `lastmod`, hub `/realisations`, accueil).**
    Le filon « rendu serveur » est épuisé : les trois cas connus (FAQ 09/09,
    `/realisations/$slug` 14/09, galerie de l'accueil 15/09) sont corrigés.
    **Candidats pour le prochain run, par ordre d'intérêt (état au 20/09) :**
    - 🔴 **`/services/finitions-soignees`** (1 080 car.) : la dernière page
      service sans bloc `savoir`, et la page la plus maigre du site sans
      concurrence maintenant que le hub existe. **C'est son tour.** Trancher
      d'abord son `title` anormal (voir « Hypothèses à vérifier »). Matière
      repérée et jamais exploitée : le volet *ombrage* des parkings de plus de
      1 500 m² (échéance juillet 2026), fiche
      `entreprendre.service-public.gouv.fr/vosdroits/F38106`, lue le 13/09.
    - `lastmod` du sitemap depuis les dates de commit (n°4) — chantier court,
      bon repli un jour chargé.
    - **Enrichir le hub `/realisations`** d'un second bloc de Q/R une fois que
      les pages service seront toutes traitées ; pas avant, il vient d'être créé.
    - Les seuils d'urbanisme des affouillements, **si** une source primaire
      lisible apparaît (voir « décidé de ne pas faire » du 12/09).
    ~~- Créer une vraie page `/realisations` (n°14)~~ **fait le 20/09.**
    ~~- `/realisations/avant-apres`~~ **sans objet, page retirée le 17/09.**
    **Toujours à éviter** : un nouveau run `sameAs`/identité (angle saturé).
14. ~~**Créer une page `/realisations`.**~~ **Fait le 20/09/2026** (commit
    `5debf51`) : route statique, 6 258 caractères servis, `CollectionPage` +
    `ItemList` + `FAQPage` + `BreadcrumbList`, ajoutée au sitemap, à `llms.txt`,
    à IndexNow et au script de mesure ; fil d'ariane des pages dossier passé à
    trois niveaux ; liens entrants depuis l'accueil et depuis les quatre
    dossiers. *Constat d'origine ci-dessous, conservé pour la trace.*
    L'URL répondait **404** (vérifié le 14/09) :
    il n'y a aucune route, et donc aucun hub reliant les 5 dossiers. C'est à la
    fois un manque de maillage et une page de destination naturelle pour une
    requête du type « réalisations enrobé Jura ». **Tant qu'elle n'existe pas,
    ne jamais pointer un lien ni un `BreadcrumbList` vers `/realisations`.**
    Si elle est créée : l'ajouter au sitemap et à `llms.txt`, et reprendre le
    niveau intermédiaire dans les fils d'ariane des `/realisations/*`.
15. **`/realisations/<slug inconnu>` répond HTTP 200**, pas 404, en servant un
    shell quasi vide (47 car.) — constaté le 14/09. Comportement pré-existant du
    routeur, **non aggravé** par le commit du jour (le garde-fou ajouté empêche
    au moins d'y servir un `<h1>` fabriqué et un `BreadcrumbList`). Risque réel
    mais faible tant que rien ne lie ces URLs. À traiter le jour où un vrai 404
    sera possible côté route.
13. **Re-statuer `kompass.fr` et `verif.com`, jugées périmées sans avoir été
    lues.** ⏳ **Nouvelle tentative le 23/09/2026, toujours infructueuse** :
    `fr.kompass.com` renvoie désormais **405 Method Not Allowed** (et non plus
    403), `verif.com` **403**. Les deux restent illisibles depuis le runner, et
    leur statut reste donc **non établi**. L'extrait de recherche du 23/09
    affiche bien « 36 Avenue Etienne Lamy » pour kompass, mais c'est **un
    extrait**, exactement ce que le 13/09 a appris à ne pas prendre pour argent
    comptant. Ne pas rouvrir avant qu'un moyen de lire ces pages apparaisse.
    *Constat d'origine :* Les deux ont été classées « ancienne adresse » **sur la seule foi
    d'extraits de recherche**, jamais en ouvrant la page (403 au runner). Le
    run du 13/09 a montré qu'un extrait peut avoir des mois de retard alors que
    la page est à jour (cas mappy). Leur statut n'est donc **pas** établi — ni
    dans un sens ni dans l'autre. À trancher le jour où un moyen de lire ces
    pages apparaît ; en attendant, **ne pas les ajouter en `sameAs`** (on ne cite
    pas ce qu'on n'a pas lu) mais **ne pas non plus les présenter au client comme
    certainement périmées**. `lagazettefrance.fr` et `doctrine.fr`, elles, ont
    bien été lues le 12/09 : elles restent écartées, ne pas les rouvrir.
11. ~~**Vérifier que les autres contenus dépliables du site sont bien dans le
    HTML servi.**~~ **Fait le 14/09/2026 — résultat NÉGATIF, ne pas rouvrir.**
    Les quatre `AnimatePresence` du site ont été ouverts un par un : ce sont
    `sections.tsx:581` et `sections.tsx:1074` (les **étapes du simulateur de
    devis**, versions desktop et mobile), `index.tsx:228` (le **voile de
    chargement** qui s'efface au premier rendu) et
    `realisations.$slug.tsx:510` (la **lightbox** d'images). **Aucun ne contient
    de contenu éditorial** : il n'y a rien à récupérer côté SEO et il ne faut
    pas y toucher. Le défaut de la FAQ du 09/09 était bien un cas isolé.
    **Mais la méthode, elle, a payé** : c'est en mesurant dans la foulée le
    volume de texte servi page par page qu'est apparu le vrai défaut du jour
    (les `/realisations/*` à 62 caractères). **À refaire périodiquement :
    comparer le nombre de caractères servis de chaque URL du sitemap — une page
    très en dessous des autres est le symptôme.**
12. **Compléter `sameAs` avec `pappers.fr` et `verif.com`** quand un moyen de
    lire ces pages existera (elles renvoient 403 depuis le runner). Ne pas les
    ajouter sans avoir vu leur contenu. ~~**Ajout du 11/09 :
    `entreprises.lagazettefrance.fr`.** À lire et à ajouter si elle porte
    l'adresse actuelle.~~ **Traité le 12/09/2026 : lue, elle porte l'ANCIENNE
    adresse (SIRET …0021, « 36 avenue Etienne Lamy », Champagnole) → écartée
    définitivement, comme `doctrine.fr`. Ne pas les rouvrir.**
    **Nouveau, 12/09 : `pagesjaunes.fr/pros/52322496` existe** (403 depuis le
    runner, donc pas de `sameAs`). Sa valeur est ailleurs : c'est la seule fiche
    *commerciale* des cinq, elle se revendique et accepte un lien vers le site.
    Passée en tête de l'action 4 du fichier client — **c'est aujourd'hui le
    meilleur levier de découverte identifié.**

---

## Hypothèses à vérifier

### 08/11/2026 — Les compteurs « chantiers réalisés » de la carte ont-ils une source ?
`src/components/InteractiveMap.tsx` affiche au visiteur, dans la bulle de chaque ville :
Cize 120, Lons-le-Saunier 85, Saint-Claude 42, Champagnole 38, Bourg-en-Bresse 95,
Oyonnax 67 « chantiers réalisés ». Aucune source dans le dépôt ni dans le journal ; valeurs
probablement héritées du gabarit Lovable. **Non touché** (contenu existant, possible donnée
client). Si Naofal ne les confirme pas : retirer la ligne « X chantiers » (garder ville + desc).

### 01/11/2026 — Le dossier « Cour et allée privée » montre-t-il vraiment des pavés ?
`/services/maconnerie-generale` y renvoie (« pavés, dallages et médaillons… en photos »),
mais le dossier ne liste pas la maçonnerie dans ses prestations (`RELATED_SERVICES`). Les
photos sont en base : à regarder avant d'ajouter le lien retour, ou de corriger la phrase.
✅ **Tranché le 12/11/2026** : 23 photos relues — pavés / dalles en rive d'enrobé sur 4 photos,
bordures béton sur plusieurs, **aucun médaillon**. Lien retour ajouté, phrase corrigée.

### 22/10/2026 — La demande client du 22/10 vaut-elle pour les autres blocs juridiques du site ?
Le client a fait retirer de l'accueil le bloc loi devis/acompte/délais et la Q/R « posé
toute l'année » (mars-novembre, > 5 °C). Restent ailleurs, non touchés : règles du
démarchage (L221-10, 7 jours, rétractation 14 jours) sur `/arnaque-goudronnage` et
`/realisations/cour-allee-privee` ; TVA / 1799-1 sur `/realisations` ; saison de pose
(> 5 °C, hiver) sur `/services/enrobe-a-chaud`, `bordures-murets`, `zone-intervention`.
→ **Yanis : demander à Naofal si l'objection porte sur l'accueil seulement** ou aussi sur
ces pages (notamment la saison de pose). Ne rien supprimer avant réponse.

### 18/10/2026 — Le texte alternatif de la photo « geste » ne décrit pas la photo

Alt servi : « HCE posant l'enrobé à chaud à la main à 150°C, vapeur visible au
coucher de soleil ». La photo (`geste-enrobe-a-chaud`) montre une cour fraîchement
posée en plein jour, rouleau compacteur devant un garage, sans vapeur ni coucher
de soleil. Un alt fidèle aide Google Images et l'accessibilité. Non modifié
(texte éditable en admin, `geste.image_alt`) : à valider par Yanis avant de changer.

### 14/10/2026 — FAQ de l'accueil : deux chiffres sans source
« Un enrobé bien préparé et compacté tient 20 à 30 ans » et « Une cour
standard de 100 à 200 m² se réalise en 2 à 4 jours » (FAQ d'origine, code +
JSON-LD). Vraisemblables mais non sourcés : à faire confirmer par Naofal avant
toute reprise par une IA. Non touchés.

### 08/10/2026 — Le pied de page affiche « © 2025 » en octobre 2026, et la valeur peut venir de la base

La barre basse du pied de page sert **« © 2025 HCE SARL · Tous droits
réservés »**, mesuré en production et au banc local. Nous sommes en octobre
2026 : c'est factuellement périmé, et un visiteur comme un moteur y lisent un
signal de site laissé en plan.

**Pourquoi ce n'est PAS corrigé aujourd'hui.** La valeur passe par
`EditableText section="footer" field="copyright"`, dont le fallback est dans
`src/routes/index.tsx` (~l. 2188) mais dont **la valeur réellement servie peut
venir de la table `site_content_fields`** — exactement le piège documenté dans
`CONTENU-FIGE.md` (« une correction de contenu n'est terminée que quand elle est
faite aux TROIS endroits »). La production sert aujourd'hui la même chaîne que
le fallback, ce qui **suggère** qu'il n'y a pas de surcharge en base, mais ne le
prouve pas.

**Ce qu'il faut faire, et dans cet ordre :** (1) demander au client s'il veut
« 2026 » ou une mention sans année — c'est fait, bloc du 08/10 dans
`ACTIONS-SEO-CLIENT.md` ; (2) si oui, vérifier d'abord si la ligne existe en
base avant de toucher au fallback. **Ne pas remplacer par une année calculée à
l'exécution sans l'accord du client** : ce serait un changement de
comportement, pas une correction de valeur.

### 08/10/2026 — Un mobile apparaît sur le site sans être dans le NAP

`src/components/WhatsAppFAB.tsx` pointe sur `wa.me/33681789641`
(**06 81 78 96 41**). Ce numéro n'est **ni dans le pied de page, ni dans le
`LocalBusiness`, ni dans `llms.txt`, ni dans le bloc NAP canonique** de ce
journal. Deux questions ouvertes, et aucune n'est tranchée : **(a)** est-ce le
mobile professionnel de l'entreprise, et doit-il entrer dans le NAP (auquel cas
il faut le déclarer partout de la même façon, pas à moitié) ? **(b)** est-ce le
« mobile inconnu » relevé le 04/10 sur la fiche `nosartisansontdutalent.fr`, qui
était compté comme une erreur de la fiche ? **Ne rien modifier avant d'avoir
posé la question** : un numéro de téléphone déclaré à tort dans des données
structurées est pire qu'un numéro absent.

### 07/10/2026 — Le domaine d'envoi des e-mails est resté `hcebtp.com` : intentionnel ou oubli de la bascule ?

**Constaté, pas supposé.** Le dépôt publie `www.hcetp.com` partout côté site
(15 occurrences dans `llms.txt`, 0 `hcebtp` dans `public/`), **mais trois
constantes d'envoi d'e-mails portent encore l'ancien domaine** :
- `src/routes/lovable/email/transactional/send.ts` → `SITE_NAME = "hcebtp"`,
  `SENDER_DOMAIN = "notify.hcebtp.com"`, `FROM_DOMAIN = "hcebtp.com"`
- `src/routes/api/public/devis.ts` → `from: 'HCE BTP <devis@hcebtp.com>'`

**Pourquoi ce n'est très probablement PAS un oubli, et pourquoi il ne faut
surtout pas y toucher.** Un domaine d'expédition doit être **vérifié auprès du
fournisseur d'e-mail** (SPF, DKIM, enregistrements DNS). `hcebtp.com` l'est sans
doute depuis l'origine ; `hcetp.com` ne l'est probablement pas, puisqu'il date du
30/09. **Changer ces constantes sans que le nouveau domaine soit vérifié ferait
tomber l'envoi des demandes de devis — c'est-à-dire la seule conversion du
site.** Le risque est totalement disproportionné au gain SEO, qui est nul : une
adresse d'expéditeur n'est pas indexée.

⚠️ **À NE PAS FAIRE de notre propre initiative.** Ce point ne se tranche qu'avec
le client, et seulement s'il a vérifié `hcetp.com` auprès du fournisseur. **Noté
ici pour qu'un prochain run ne « complète la bascule de domaine » par zèle.** La
cohérence NAP ne concerne pas l'adresse d'expédition des e-mails transactionnels.

### 07/10/2026 — La fiche PagesJaunes affiche « 2010 » et une note Google : deux contradictions avec le contenu figé, laissées intactes

La fiche `pagesjaunes.fr/pros/52322496`, relue le 07/10, publie « SARL
established **April 1, 2010** » et « **4.5 stars on Google (16 reviews)** ». Le
contenu figé par le client dit **2012**, et la section avis **a été supprimée à
sa demande**. **Rien n'a été modifié ni recopié.** Deux lectures possibles, et
elles ne se départagent pas d'ici : soit 2010 est la date d'immatriculation
réelle et 2012 celle du début d'activité retenue par le client, soit la fiche se
trompe. **Dans les deux cas la consigne est la même : le contenu figé fait foi,
on ne touche pas.** Noté pour qu'un prochain run ne « corrige » pas le site
d'après un annuaire. ⚠️ **Et surtout : ne pas ajouter d'`aggregateRating` sur la
base de cette note** — ce serait republier un avis que le client a explicitement
retiré du site.

> 🆕 **04/10/2026 — corriger l'adresse en « 40 Bis » demande quatre changements
> simultanés, pas un : le pied de page est éditable en base.** Le site écrit
> `40 avenue Etienne Lamy` et il est **la seule source à omettre le complément**
> (registre `40 B`, Mappy `40 Bis`, PagesJaunes `40 Bis` — relevés du 04/10).
> La correction est donc probablement justifiée sur le fond, **mais elle n'a pas
> été faite**, et pas seulement parce que le client doit confirmer la forme de son
> courrier.
> **La raison technique, qui est la vraie, et qu'il ne faut pas redécouvrir :**
> le pied de page lit `v("footer", "address", "40 avenue Etienne Lamy, 39300
> Cize")` (`src/routes/index.tsx:2142`) — une valeur **éditable en base**, dont le
> code ne porte que la valeur par défaut. Les trois JSON-LD, eux, écrivent
> l'adresse **en dur** (`__root.tsx:142`, `index.tsx:197`,
> `services.$slug.tsx:481`), et `public/llms.txt` la répète deux fois (l. 23 et
> l. 537).
> **Donc : si la base contient une valeur, changer le défaut ne changerait rien à
> l'affichage mais changerait le JSON-LD** → un `LocalBusiness` qui contredit le
> pied de page rendu, c'est-à-dire le mismatch que la consigne interdit
> explicitement. **À vérifier avant toute correction : ce que contient réellement
> la valeur `footer.address` en base.** Et le jour où la correction se fait, elle
> traite les quatre endroits d'un coup, puis `verif-faq.mjs` et un contrôle du
> pied de page rendu.

> 🆕 **02/10/2026 — L'accueil sert à Googlebot un lien vers `/signin`.** Relevé
> dans le graphe des liens internes du 02/10 : l'accueil expose 13 liens internes,
> dont `/signin` (la page de connexion de l'espace d'édition). Elle n'est pas dans
> le sitemap et rien n'indique qu'elle soit indexée. **Impact SEO probable : nul à
> négligeable** — mais c'est un lien de plus dans le budget de crawl d'un domaine
> qui n'est pas encore découvert, et une page de connexion n'a rien à gagner d'un
> passage de robot. **À vérifier avant de toucher à quoi que ce soit** : (a) ce
> lien est-il visible pour un visiteur ou réservé à un administrateur connecté,
> (b) la page porte-t-elle déjà un `noindex`. **Rien n'a été modifié** : c'est du
> rendu, et la consigne demande de ne pas y toucher au doute. Le correctif propre,
> le jour où il se justifie, est un `noindex` sur `/signin`, pas la suppression du
> lien.

> 🆕 **01/10/2026 — L'e-mail reste sur l'ancien domaine : question au client.**
> Quatre références à `hcebtp.com` subsistent dans le code, toutes liées à
> l'envoi d'e-mail : `SITE_NAME = "hcebtp"`, `SENDER_DOMAIN = "notify.hcebtp.com"`
> et `FROM_DOMAIN = "hcebtp.com"` dans
> `src/routes/lovable/email/transactional/send.ts`, et
> `from: 'HCE BTP <devis@hcebtp.com>'` dans `src/routes/api/public/devis.ts`.
> `ACTIONS-USER-REQUISES.md` mentionne par ailleurs `devis@hcebtp.com` « à terme,
> après vérification du domaine dans Resend ».
> **Elles n'ont PAS été modifiées, et il ne faut pas les modifier à l'aveugle** :
> un domaine d'envoi doit être vérifié (DKIM/SPF) chez le prestataire avant
> d'être utilisé. Changer la chaîne sans faire la vérification côté Resend
> **casse l'e-mail du formulaire de devis**.
> **Question à poser : l'e-mail bascule-t-il aussi sur `hcetp.com` ?** Si oui,
> c'est une action client chez Resend (vérifier `notify.hcetp.com`), et le code
> suivra *ensuite*. Si non, laisser tel quel : ce n'est pas un problème SEO —
> l'adresse publique du site est `sarl.hce@laposte.net`. **Impact SEO réel :
> quasi nul** (aucun de ces domaines n'apparaît dans une page servie, mesuré à 0
> sur les 13 URLs). **Ne pas en faire un chantier SEO ; juste ne pas l'oublier.**

> 🆕 **01/10/2026 — `scripts/check-contenu-fige-prod.mjs` est inutilisable depuis
> le runner.** Il s'arrête sur `SUPABASE_PUBLISHABLE_KEY manquante (clé anon
> publique)`. Le contrôle du contenu figé a donc été fait au `grep` sur le HTML
> servi, ce qui marche mais ne couvre que l'accueil.
> **À vérifier : la clé anon est publique par nature** (c'est son rôle), donc soit
> elle peut être lue depuis le bundle servi et le script pourrait s'en passer,
> soit il faut la fournir au runner. **Ne rien changer au script sans avoir
> tranché** : il sert de garde-fou sur du contenu figé client, le casser coûterait
> plus que l'inconvénient actuel.

- ✅ **Tranché le 08/11/2026** (siège BAN → 4,5 km ; « 2 km » remplacé par « moins de 5 km »).
  **Deux pages publient « la station Météo-France de Champagnole, à 2 km de
  Cize », alors que la distance mesurée est de 4,8 km.** Relevé le 30/09/2026 :
  la station 39097003 est à 46°45'24"N / 5°53'09"E, le point central de Cize
  (INSEE 39153) à 46,7209 / 5,9212, soit **4,8 km** à vol d'oiseau. Le « 2 km »
  figure sur `/services/bordures-murets` (17/09) et dans la Q/R « Où HCE
  réalise-t-elle ces chantiers ? » du hub `/realisations` (« à deux kilomètres de
  Champagnole »). ⚠️ **Non corrigé volontairement** : c'est du contenu en ligne
  qui fonctionne, l'écart est petit, et il se peut que la mesure d'origine ait
  été prise depuis un autre point (le siège au 40 avenue Etienne Lamy plutôt que
  le centroïde communal — ce qui est plausible et rendrait le « 2 km » défendable
  pour la distance commune-à-commune). **La page `/zone-intervention` dit « moins
  de 5 km », qui est la valeur mesurée depuis le centroïde.** À trancher un jour
  creux en géocodant l'adresse exacte du siège, pas en réécrivant l'existant sur
  la foi d'une mesure prise depuis un autre point.
- **`llms.txt` affirme que l'enrobé à chaud « demande un support sec et plus de
  5 °C » — ce « 5 °C » n'a aucune source identifiée.** Relevé le 30/09/2026 dans
  la Q/R sur le délai de trente jours. Il est antérieur aux runs récents et n'a
  jamais été rattaché à une source primaire. **Deux issues possibles, et il faut
  trancher laquelle** : soit il a une source (et elle ouvre alors le sujet des
  températures de pose, en attente depuis le 11/09), soit il n'en a pas et c'est
  **un chiffre non sourcé publié sur le site**, ce que la consigne interdit.
  ⚠️ **Ne pas le supprimer sans vérifier** — il est peut-être exact — mais ne pas
  le réutiliser ailleurs tant qu'il n'est pas sourcé. **Premier geste du
  prochain run qui ouvrira le sujet enrobé.**

- **`scripts/check-contenu-fige-prod.mjs` ne tourne plus depuis le runner** :
  il sort sur `SUPABASE_PUBLISHABLE_KEY manquante (clé anon publique)`, relevé
  le 29/09/2026. Non diagnostiqué : la variable d'environnement peut n'avoir
  jamais existé sur ce runner, ou avoir disparu. **Ce n'est pas un problème du
  site** — la version dépôt `check-contenu-fige.mjs` passe, et un `grep` direct
  sur le HTML servi confirme les marqueurs figés. À creuser un jour creux ;
  en attendant, utiliser le contournement décrit dans les positions du 29/09.
- **Le `<h2>` « Demandez votre devis / réponse sous 24 à 48h » n'apparaît pas
  tel quel dans le HTML servi** : un `grep -c "48h"` sur l'accueil de
  production, le 29/09/2026, ne trouve qu'un `path` SVG (`1.448h.005`, icône
  WhatsApp). La formule servie est donc écrite autrement (espace, entité,
  découpage entre nœuds) que ce que le journal rapporte depuis le 14/09.
  **Ne pas en conclure que la mention a disparu ni qu'elle a été corrigée** :
  la question au client reste ouverte. À re-regarder dans le rendu, pas au
  `grep`, le jour où elle sera tranchée.

- **Aucune source primaire lisible ne donne d'épaisseurs ni de granulométries
  d'enrobé chiffrées.** Thread ouvert le 11/09, toujours ouvert au 22/09 après
  une nouvelle tentative : Norm'Info et la boutique AFNOR donnent le **statut**
  et le **domaine d'application** des normes (utilisable, et utilisé), mais pas
  leur contenu chiffré, qui est payant. Le catalogue des structures types
  (SETRA/LCPC) n'a pas été trouvé en accès libre depuis le runner. **Conséquence
  assumée : les pages disent pourquoi il n'y a pas d'épaisseur standard au lieu
  d'en publier une.** Ne pas « compléter » avec un chiffre trouvé sur un blog.
- **Le `scripts:` de `head()` (TanStack Router) n'échappe pas le JSON-LD en
  entités HTML, contrairement au texte des composants.** Vérifié le 22/09 sur
  six URLs en production (0 entité). C'est ce qui rend le site indemne du
  changement de parsing de Google du 21/08/2026. **Si un jour un bloc JSON-LD
  était écrit autrement (enfant de `<script>` dans un composant React plutôt que
  via `head()`), le contrôle serait à refaire** — il est dans `verif-faq.mjs`.
- **Le `title` du service `finitions-soignees` n'est pas un nom de service.**
  Relevé le 14/09 dans `services.$slug.tsx` : les cinq autres services ont un
  titre court (« Enrobé à chaud », « Drainage & pentes »…), celui-ci porte
  **« Vous avez un projet d'aménagement de cour en enrobé »** — une phrase
  d'accroche, alors que son `intro` (« Bords nets, raccords maîtrisés, surface
  plane et homogène ») décrit bien des finitions. Ça ressemble à un champ
  écrasé par erreur, mais c'est du **contenu visible**, et le client a figé la
  formule « Finition soignée / Travail de qualité » : **non modifié**, à lui
  soumettre. En attendant, les liens du bloc « Voir aussi » posés le 14/09
  pointent cette page sous le libellé « Finitions soignées », qui décrit
  honnêtement son contenu réel.
- **L'accueil affiche un `<h2>` « Demandez votre devis / réponse sous 24 à
  48h ».** Relevé le 14/09. Le client a figé « Devis détaillé » **contre**
  « Devis sous 48h » ; ici la promesse porte sur le **délai de réponse**, pas
  sur le devis lui-même, et la formule est antérieure à tous les runs du
  journal. **Non touché** — mais c'est assez proche de l'interdit pour mériter
  une confirmation. Ne pas le « corriger » de sa propre initiative.
- **Le choix `www` comme hôte canonique est déduit, pas confirmé par le client.**
  Il vient du 308 observé en production, qui est la configuration réelle. Si le
  client décidait de servir l'apex, il faudrait inverser les canonical. À
  confirmer avec lui.
- **`src/lib/optimizeImage.ts` garde volontairement `https://hcebtp.com`** (sans
  `www`). Ce chemin sert les images via le proxy wsrv.nl et **fonctionne
  aujourd'hui** — l'aligner risquerait de casser l'affichage des images pour un
  gain SEO nul. Ne pas y toucher sans tester le rendu.
- **`ACTIONS-USER-REQUISES.md` mentionne Vercel ET Lovable Cloud.** La prod
  observée est bien Vercel. Ne pas « corriger » ce fichier : il concerne le
  back-office et le SQL, pas le SEO, et le rôle exact de Lovable Cloud
  (Supabase / edge functions) n'a pas été vérifié.
- **Marqueurs superposés sur la carte** depuis la correction des coordonnées de
  Cize : Cize (46.726/5.914) et Champagnole (46.747/5.911) sont à ~2,4 km, donc
  quasiment confondus au zoom 8. Exact géographiquement, discutable visuellement.
  Non touché — c'est une décision de design. À faire valider avant d'y toucher.
- **Environnement du runner** : `bun install` **n'aboutit pas** (bloqué ~513 Mo
  téléchargés, processus jamais rendu la main), et `npm ci` échoue déjà d'après
  le run précédent. **Il n'y a donc pas de build complet possible depuis le
  runner.** Contournement validé le 08/09 et suffisant pour du SEO :
  `bun build <fichier> --no-bundle --outfile …` transpile un `.tsx` **sans
  node_modules** et signale toute erreur de syntaxe ; et un bloc
  `JSON.stringify({…})` peut être extrait et évalué dans `node` pour prouver
  qu'il produit du JSON valide. Les deux ont servi ici avant de pousser.
- **L'adresse « 36 avenue Etienne Lamy » n'est plus une inconnue** : c'est
  l'ancien siège (avril 2025 → avril 2026), pas une erreur d'annuaire. Voir
  l'entrée du 09/09. La divergence `40` / `40 B` reste, elle, à trancher par le
  client.
- **Le `FAQPage` de l'accueil est construit depuis la constante `FAQS`**, alors
  que la FAQ affichée peut être surchargée par le CMS (`get("faqs", FAQS)` dans
  `src/components/sections.tsx`). Aujourd'hui les deux coïncident. Mais si le
  client édite une question depuis l'admin, le JSON-LD ne suivra pas → mismatch
  sanctionnable. Le correctif propre demande de générer le JSON-LD côté serveur
  depuis la base, ce qui touche le chargement de la page : à évaluer, pas à
  improviser.
- **Le numéro WhatsApp (06 81 78 96 41, `src/components/WhatsAppFAB.tsx`) diffère
  du téléphone du site (03 84 52 61 48).** Sans doute volontaire (fixe entreprise
  + mobile). Non modifié dans le code, mais signalé dans `ACTIONS-SEO-CLIENT.md`
  comme piège NAP : il ne doit jamais être déclaré comme numéro principal.
- **L'adresse officielle porte un « B » que le site n'affiche pas** : registre
  `40 B avenue Etienne Lamy`, pied de page `40 avenue Etienne Lamy`. Les fiches
  d'entreprise automatiques reprennent le `40 B`. Non tranché, non modifié —
  question posée au client. Tant que ce n'est pas réglé, **ne pas « corriger »
  l'un des deux de sa propre initiative** : la divergence est connue et
  volontairement laissée en l'état.
- **Le registre date la création de l'entreprise au 01/04/2010, le site dit 2012.**
  2012 est figé par le client, donc intouchable. Les deux peuvent être vraies
  (immatriculation puis démarrage réel), mais il faut le savoir avant de conclure
  qu'un annuaire affichant 2010 se trompe.
- **L'établissement siège a une date de création au registre du 01/04/2026**
  (SIRET 52168357300039), très récente, alors que l'entreprise date de 2010.
  Signe d'un changement d'établissement ou de siège récent. Sans effet SEO connu,
  mais à garder en tête si une fiche d'annuaire affiche une adresse différente
  de l'actuelle.
- **Le 07/09, `https://www.hcebtp.com/sitemap.xml` a renvoyé une fois
  `connection reset`**, puis 200 trois fois de suite juste après. Traité comme un
  incident réseau transitoire du runner et non comme un problème du site. Si ça
  se reproduit sur plusieurs runs, creuser sérieusement : un sitemap
  intermittent bloquerait le crawl.

---

## Erreurs commises et corrigées

### 07/10/2026 — Le bloc de référence « NAP canonique — ne pas laisser diverger » a porté l'ancien domaine pendant six runs

**L'erreur.** Le domaine a basculé sur `www.hcetp.com` le 30/09 (commit
`f07b19f`) et le run du 01/10 l'a découvert et journalisé avec un encadré rouge
« ÉVÉNEMENT MAJEUR ». **Mais le bloc « NAP canonique » en tête du journal, celui
qui porte explicitement le titre « référence, ne pas laisser diverger », a
continué d'afficher `https://www.hcebtp.com`** jusqu'au 07/10. Six runs ont lu
une référence fausse sur le point le plus sensible du dossier.

**Pourquoi personne ne l'a vu, et c'est le vrai enseignement.** Les runs du
01/10 au 06/10 ont tous **ajouté** leur constat en tête d'« État des lieux » —
l'endroit où on écrit — sans **relire** la section de référence, qui se trouve
200 lignes plus bas et qu'on croit stable *parce qu'elle est une référence*.
**Un bloc de référence est le dernier endroit qu'on relit et le premier qu'on
cite : c'est exactement ce qui le rend dangereux quand il dérive.**

**Corrigé le 07/10** : l'URL est passée à `https://www.hcetp.com`, vérifiée
contre le code (15 occurrences dans `llms.txt`, 0 `hcebtp` dans `public/`), avec
un encadré qui date la correction et distingue explicitement le **domaine du
site** du **domaine d'envoi des e-mails**, resté `hcebtp.com` à bon droit.
L'adresse `40 avenue Etienne Lamy` du bloc a été revérifiée au passage contre
`__root.tsx`, `services.$slug.tsx`, `zone-intervention` et
`realisations.index` : **elle est correcte**, le « 40 Bis » tranché le 04/10 ne
concerne que la graphie des fiches d'annuaire, pas ce que publie le site.

**Règle à tenir.** **Quand un run découvre un changement d'identité (domaine,
adresse, téléphone, raison sociale), il corrige le bloc de référence DANS LE
MÊME RUN**, avant d'écrire son encadré du jour. Et à chaque run : **relire le
bloc NAP contre le code**, pas contre le souvenir. Trois lignes de `grep`
suffisent. La note sur l'hébergement du même bloc a été mise à jour dans la
même passe, pour la même raison : elle laissait ouverte depuis des semaines une
question que `vite.config.ts` tranche en une ligne.

### 06/10/2026 — 🔴 Le travail d'un run entier est resté invisible 24 h parce qu'il n'était pas sur `main` — et la cause n'est pas une négligence, c'est un refus de l'environnement

**Les faits.** Le run du 05/10 a produit le travail le plus important de la
semaine : diagnostic du blocage de déploiement (builds Vercel en échec), recette
pour lire les statuts depuis le runner, « ACTION 0 » à destination du client,
397 lignes de journal. **Tout cela était sur `claude/upbeat-wozniak-q9cj7x` et
pas sur `main`.**

⚠️ **Et la raison n'est pas un oubli : le push vers `main` a été REFUSÉ au runner
le 05/10, motif « Production Deploy ».** Le run l'a constaté, a basculé sur la
branche de session, et l'a écrit noir sur blanc sous « Chantiers en attente ».
**Il a fait ce qu'il pouvait.** Ne pas lui imputer une étourderie en relisant
cette entrée.

*(Le même refus a frappé le run du 06/10, mais sur une autre action : la lecture
de l'API des déploiements, bloquée deux fois au motif « Production Deploy ». En
revanche **le `git push origin main` du 06/10 est passé sans encombre**. Le
filtre est donc intermittent, pas une interdiction permanente — ce qui est la
pire des configurations, parce qu'on ne peut pas s'organiser autour.)*

**Ce que ça a coûté, concrètement.**
1. **La production n'a rien reçu** — seul `main` déclenche un déploiement de
   production. Les deux déploiements du 05/10 étaient des *Preview*.
2. **Le run du 06/10 a démarré aveugle.** `SEO-JOURNAL.md` sur `main` s'arrêtait
   au 04/10 et décrivait le blocage comme non diagnostiqué. **Le journal est la
   seule mémoire entre les runs : un journal écrit ailleurs que sur `main` n'est
   pas une mémoire.** Une demi-journée a failli repartir sur un diagnostic déjà
   fait.
3. **L'instruction client n'a pas atteint le client** pendant 24 h, alors que le
   blocage courait et que `ACTIONS-SEO-CLIENT.md` est le document qu'il lit.

**Comment ça a été rattrapé — par un détour sur lequel il ne faut pas compter.**
En listant les déploiements via l'API GitHub, deux *Preview* du 05/10 portaient
des SHA **absents de `main`**. C'est en remontant ces SHA qu'on a trouvé la
branche. `main` en étant un ancêtre, `git merge --ff-only` a suffi à tout
récupérer sans rien réécrire. **Sans cette requête, le travail restait perdu.**

**Les deux règles à en tirer.**

> **1. Ce qui n'est pas sur `main` n'existe pas** — ni pour la production, ni
> pour le run du lendemain. Avant de terminer un run, vérifier explicitement que
> `main` porte le commit (`git log --oneline origin/main -1`), et pas seulement
> que « le push a réussi » : l'environnement désigne une branche de session par
> défaut, donc un `git push` sans argument ne va PAS sur `main`.
>
> **2. Si le push vers `main` est refusé, le dire en tête de journal, pas en
> annexe.** Le 05/10 l'avait noté sous « Chantiers en attente », au milieu d'une
> liste — là où le run suivant ne le lit qu'après avoir déjà travaillé. Un
> travail qui n'a pas pu atteindre `main` doit être signalé **dans l'encadré
> d'« État des lieux »**, avec le nom de la branche à fusionner, parce que c'est
> la première chose que lit le run suivant. **Et commencer tout run par
> `git branch -r --no-merged origin/main` : trois secondes, et ça aurait suffi à
> trouver la branche du 05/10 immédiatement.**

- 🔴 **05/10/2026 — L'ERREUR LA PLUS COÛTEUSE DU JOURNAL : avoir déclaré un
  problème « non diagnosticable d'ici » sans avoir cherché le canal qui le
  diagnostique.** Les runs du 02/10 et du 04/10 ont écrit, et répété en
  majuscules, que la cause du blocage de déploiement « se lit en trente secondes
  sur le tableau de bord Vercel **et nulle part depuis le dépôt** ». **Faux.**
  Vercel publie l'état de chaque build sur GitHub, et le runner le lit sans jeton
  supplémentaire. Une requête de trois secondes disait « `failure` » depuis le
  02/10. **Coût réel : trois jours de blocage non diagnostiqué, dont deux runs
  entiers passés à mesurer des octets en production pour deviner ce qu'un statut
  disait en clair, et un client relancé deux fois avec une consigne vague.**
  **Règle à en tirer, générale et pas limitée au déploiement : avant d'écrire
  « ça ne se voit pas d'ici », énumérer les canaux qui pourraient le voir et les
  essayer un par un. Un verdict d'impossibilité est une hypothèse, et elle se
  teste comme les autres.**

- 🔴 **05/10/2026 — La consigne « ne pas pousser de code pendant le blocage »
  était fondée sur une crainte fausse, et elle a gelé trois jours de travail.**
  Elle était justifiée ainsi le 02/10 puis renforcée le 04/10 : « si c'est le
  *build* qui échoue, chaque commit supplémentaire rend le diagnostic plus
  difficile », « le dépôt doit rester dans l'état où le blocage est apparu ».
  **Or un déploiement en échec ne remplace pas la production** : pousser ne
  pouvait rien casser en ligne, et n'aurait rien gêné du diagnostic, qui se fait
  par commit (`/commits/:sha/status`) et non par état global du dépôt. Résultat :
  le chantier du 04/10 a renoncé à une modification « petite, fondée et prête »
  (PagesJaunes dans les `sameAs`) pour rien. **Consigne annulée le 05/10.**

- **05/10/2026 — « `npm ci` ne peut pas marcher sur ce dépôt » : faux.** Noté
  comme acquis le 02/10, à partir de la désynchronisation entre `package.json`
  (modifié le 11/09) et `package-lock.json` (modifié le 02/09). Mesuré deux fois
  le 05/10, dont une après ajout du champ `engines` : **`npm ci` sort en 0 et
  installe 688 paquets.** `bun install --frozen-lockfile` aussi (0, 684 installs
  vérifiés). **La désynchronisation existe peut-être sur le papier, mais elle
  n'empêche aucune installation reproductible.** Ne pas rouvrir cette piste pour
  expliquer un échec de build.

- **05/10/2026 — Le piège du `git fetch` qui mentait (acquis du 27/09) s'est
  représenté, et il peut faire croire à une divergence inexistante.** Au démarrage
  du run, `git log origin/main` donnait `62421b1` (30/09) alors que la branche
  locale était à `722b55a` (04/10) : lu vite, ça dit « neuf commits ne sont jamais
  arrivés sur `main` », ce qui aurait relancé un faux diagnostic (« les runs
  précédents poussaient sur une branche, pas sur `main` »). **La référence locale
  `origin/main` était simplement périmée** — `git ls-remote origin refs/heads/main`
  répondait bien `722b55a`. **Règle : pour l'état réel d'une branche distante,
  `git ls-remote`, jamais `git log origin/<branche>`.**

- **30/09/2026 — j'ai écrit des caractères d'espace invisibles dans du code, et
  seul ESLint l'a vu.** Pour formater les populations de la table, la première
  version appelait
  `c.hab.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ")`. Les séquences
  `\u202f` et `\u00a0` **ont été écrites dans le fichier sous forme de caractères
  littéraux** (espace fine insécable U+202F et espace insécable U+00A0) au lieu
  de séquences d'échappement ASCII. Résultat : `no-irregular-whitespace` en
  erreur, et une expression régulière contenant des caractères invisibles —
  illisible et fragile. **Corrigé** par un formateur déterministe et purement
  ASCII : `String(c.hab).replace(/\B(?=(\d{3})+(?!\d))/g, " ")`, qui a en prime
  l'avantage de **ne pas dépendre des données de locale ICU du runtime** (un
  `toLocaleString` peut rendre un séparateur différent côté serveur et côté
  navigateur, donc produire une divergence d'hydratation).
  **Deux leçons :** *(a)* ne jamais supposer qu'une séquence `\uXXXX` écrite dans
  un outil d'édition arrive échappée dans le fichier — **le vérifier au
  `cat -A`** ; *(b)* **lancer ESLint sur tout fichier neuf avant de le pousser**
  — ici c'est le seul contrôle qui a attrapé le problème, ni `tsc`, ni le build,
  ni la mesure de texte servi ne l'ont signalé. Une assertion Python
  (`assert '\u202f' not in s`) a été ajoutée au correctif pour prouver que le
  fichier est propre, plutôt que de le supposer.
- **30/09/2026 — j'ai cru `verif-faq.mjs` plus bavard qu'il n'est, et j'ai
  failli conclure trop vite.** Lancé avec une simple base
  (`node scripts/verif-faq.mjs https://www.hcebtp.com`), il **ne contrôle que
  l'accueil** et affiche une seule ligne « 11/11 » — ce qui ressemble à un bilan
  complet. Passé un chemin nu (`/zone-intervention`), il échoue en
  `Failed to parse URL`. ⚠️ **Ce script prend des URLs COMPLÈTES, une par page, et
  n'a pas de liste interne** (contrairement à `mesure-texte-servi.mjs` et à
  `verif-lastmod.mjs`, qui prennent une base). **Conséquence pour les prochains
  runs : pour prouver que les douze `FAQPage` sont alignés, il faut lui passer
  les douze URLs explicitement.** C'est ce qui a été fait ensuite, au banc puis
  en production. Sans ça, le run aurait annoncé « FAQ vérifiée » en n'ayant
  vérifié que l'accueil — exactement le genre de contrôle en trompe-l'œil que ce
  journal traque depuis le 08/09.

- **28/09/2026 — je suis retombé dans le piège du `git fetch` multi-réf, le jour
  même où le journal le décrivait.** Premier geste du run :
  `git fetch origin main claude/upbeat-wozniak-0goiw0`. La branche assignée
  **n'existait pas encore sur le dépôt distant** (`couldn't find remote ref`),
  donc **le fetch a échoué en entier et `origin/main` est resté sur le 22/09** —
  d'où six commits qui semblaient « en attente » et une minute passée à croire
  que les runs des 23 au 27/09 n'étaient pas déployés. Corrigé par
  `git fetch origin main` seul : `origin/main` était en fait **strictement égal à
  HEAD**. **Règle durcie pour les prochains runs : la branche de travail assignée
  par l'environnement n'existe pas sur `origin` au démarrage — ne JAMAIS la mettre
  dans le même `git fetch` que `main`.** Fetcher `main` seul, toujours. Et
  l'existence d'une réf `origin/<branche>` en local ne prouve rien : c'est un
  reste de clonage, `git ls-remote --heads origin` est le seul juge.
- **28/09/2026 — rappel confirmé, pas une erreur du jour : seule `main`
  déploie.** Le commit a été poussé sur `main` (`git push origin HEAD:main`) et la
  production a servi le nouveau contenu ~2 min 30 plus tard, puis la branche
  assignée a été poussée séparément pour respecter la consigne d'environnement.
  **L'ordre compte : `main` d'abord, la branche ensuite.**
- **27/09/2026 — j'ai cru pendant plusieurs minutes que les runs du 23 et du
  25/09 n'avaient jamais été déployés.** `git fetch origin main <branche-qui-
  n'existe-pas>` a échoué sur la seconde réf et **n'a donc actualisé ni l'une ni
  l'autre** : `origin/main` pointait encore sur le 22/09, et `git log
  origin/main..HEAD` affichait six commits « en attente ». Rien n'a été poussé ni
  « réparé » sur cette base — c'est la mesure en production
  (`mesure-texte-servi.mjs`, 8 156 car. sur `preparation-terrassement`) qui a
  montré que le 25/09 était bien en ligne, avant qu'un `git fetch origin main`
  seul ne ramène `a8cee95..6a2b4dc`. **Corrigé, et la règle est dans « Techniques
  apprises » : une réf à la fois, et en cas de contradiction entre git et la
  production, c'est la production qui tranche.**

- **25/09/2026 — le chantier a été poussé sur la branche assignée par
  l'environnement, et n'a donc PAS été déployé pendant six minutes.**
  L'environnement d'exécution demande de développer et de pousser sur
  `claude/upbeat-wozniak-1f20t3`. Fait — puis la production a été interrogée
  huit fois de suite sans changer : **seule `main` déclenche un déploiement**.
  Corrigé le jour même par une avance rapide de `main` sur le commit
  (`git checkout main && git merge --ff-only <sha> && git push origin main`),
  après quoi la production a servi la nouvelle page en moins de 45 secondes.
  **La consigne de maintenance avait raison depuis le début (« Commit direct sur
  main ») ; c'est l'environnement qui induit en erreur.** Voir le détail dans
  « Techniques apprises » du 25/09. **Aucune perte : le commit est le même sur
  les deux branches, rien n'a été réécrit.**

- **25/09/2026 — j'ai commencé la rédaction en croyant que l'exemption des
  terres réutilisées sur leur site d'excavation figurait à l'article L541-4-1 du
  code de l'environnement.** C'est la formulation de la directive européenne, pas
  celle du droit français. **Vérification faite sur Légifrance avant d'écrire une
  ligne : l'article ne contient pas cette exemption.** La question a été
  recentrée sur l'arrêté du 4 juin 2021, qui traite réellement du sujet. **Rien
  de faux n'a été publié** — l'erreur a été arrêtée à la vérification, ce qui est
  précisément le rôle de l'étape « source primaire lue avant d'écrire ». **Règle
  générale à retenir : ne jamais transposer une formulation de directive
  européenne sans vérifier l'article français de transposition.**

- **23/09/2026 — le journal affirmait qu'un outil existait alors qu'il n'avait
  jamais été committé.**
  Depuis le 11/09, les entrées de ce journal renvoyaient à `verif-faq.mjs`
  comme à un instrument disponible (« le contrôle est dans `verif-faq.mjs` »,
  « utiliser `verif-faq.mjs` pour prouver l'alignement »). **`find . -name
  "verif-faq*"` ne renvoyait rien au 23/09** : le fichier n'a jamais existé
  dans le dépôt, chaque run le réécrivait de mémoire et le jetait. C'est la
  cause racine du faux mismatch du 22/09 — la version jetable de ce jour-là
  ignorait le décodage des entités HTML que les versions précédentes avaient
  peut-être eu. **Corrigé le 23/09 : `scripts/verif-faq.mjs` est versionné,
  documenté, et embarque la règle des entités.**
  **Règle à retenir : un outil qui n'est pas committé n'existe pas. Avant de
  compter sur un script cité dans ce journal, faire `ls scripts/`.**

- **23/09/2026 — j'ai failli prêter à HCE un engagement commercial que le
  client n'a jamais formulé (rattrapé avant le push).**
  Une première rédaction du bloc sur le démarchage à domicile concluait :
  « aucune somme demandée le jour même : c'est la règle, et c'est ainsi
  qu'HCE travaille ». Les deux premières propositions sont du droit, la
  troisième est une **affirmation invérifiable sur les pratiques de
  l'entreprise** — exactement le type d'invention que les consignes
  interdisent. Réécrit en « ces trois règles s'imposent à toute entreprise qui
  vient chez vous, HCE comprise », qui est juridiquement exact et ne promet
  rien au nom du client.
  **Règle à retenir : citer un texte qui s'impose à l'entreprise est factuel ;
  affirmer que l'entreprise le respecte est un témoignage, et on n'en invente
  pas. La nuance se joue sur un demi-membre de phrase.**

- **22/09/2026 — j'ai cru à un mismatch FAQPage qui n'existait pas, parce que
  mon propre script ne décodait pas les entités HTML.**
  Le premier passage de `verif-faq.mjs` sur la nouvelle page a annoncé
  **2/5 questions et 0/5 réponses** retrouvées dans le HTML visible. Un
  mismatch JSON-LD/visible est sanctionnable : la tentation immédiate a été de
  suspecter le rendu. **C'était faux.** Le signal qui a tranché : les deux
  seules questions retrouvées étaient **exactement les deux qui ne contiennent
  aucune apostrophe**. Le texte visible du site est servi avec les apostrophes
  échappées en `&#x27;`, le JSON-LD non (voir « Techniques apprises » du jour) ;
  la comparaison brute échouait donc sur toute chaîne contenant `'`, `œ` ou `&`.
  Après ajout d'un décodage d'entités des deux côtés : **5/5 et 5/5**, en local
  comme en production.
  **Règle à retenir : un contrôle d'alignement JSON-LD/visible DOIT décoder les
  entités HTML avant de comparer, sinon il produit de faux mismatchs sur tout
  texte français.** Le `verif-faq.mjs` du scratchpad porte désormais ce
  décodage — le réécrire sans lui, c'est re-tomber dedans. Et plus
  généralement : **avant de croire un outil qui annonce une régression, chercher
  le motif dans ce qu'il rate.** Ici, « toutes les chaînes qui échouent ont une
  apostrophe » désignait le bug en une ligne.
- **22/09/2026 — j'ai introduit 31 erreurs prettier dans un fichier qui était
  propre, et je ne l'ai vu qu'en comparant avec HEAD.**
  Le journal du 21/09 note « eslint à parité exacte avec HEAD (60 = 60) » pour
  `services.$slug.tsx`, qui porte 60 erreurs prettier pré-existantes. J'ai
  d'abord lu mes 31 erreurs sur `realisations.$slug.tsx` comme du bruit du même
  ordre. **`realisations.$slug.tsx` était, lui, à 0 erreur à HEAD** : les 31
  étaient toutes les miennes. Corrigées par `npx prettier --write` sur le seul
  fichier touché (sans effet de bord : le fichier étant propre à HEAD, prettier
  n'a reformaté que mes ajouts ; les 31 lignes supprimées au diff sont la
  ré-indentation du bloc `BreadcrumbList`, passé à l'intérieur d'un spread).
  **Règle : « parité avec HEAD » veut dire mesurer HEAD, pas supposer un
  héritage.** La mesure tient en une commande — sortir la version HEAD du
  fichier (`git show HEAD:<chemin>`) dans le banc d'essai et y lancer eslint.
- **21/09/2026 — l'hypothèse « il n'existe pas de fiche Google » était fausse.**
  Depuis le 07/09, l'Action 2 du fichier client et le chantier n°2 « débloquer
  l'indexation » disaient tous deux qu'il fallait **créer** une fiche Google
  Business Profile parce qu'elle « n'existe pas ». En mesurant la visibilité ce
  jour, l'annuaire PagesJaunes départemental (page lisible depuis le runner)
  affiche une **note Google de 4,5/5 sur 16 avis** pour HCE à Cize. Une note
  Google implique un établissement Google Maps existant. **La fiche existe donc
  déjà** — le conseil « en créer une » était non seulement inutile mais risqué
  (créer un doublon dégrade le référencement local). **Corrigé** : `Action 2` de
  `ACTIONS-SEO-CLIENT.md` réécrite pour dire « revendiquer la fiche existante et y
  déclarer `https://www.hcebtp.com` », et l'alerte du 20/09 dans « Chantiers en
  attente » reste valable sur le fond (le déblocage est hors dépôt) mais son
  point n°2 est à lire à la lumière de cette correction. **Leçon de méthode** :
  ne jamais poser « ça n'existe pas » sans l'avoir cherché ; l'annuaire
  départemental PagesJaunes est lisible là où les fiches `/pros/` sont en 403,
  et il porte les notes Google — c'est un instrument de mesure gratuit.
- **17/09/2026 — j'ai changé la formulation d'une requête de suivi pour
  contourner une panne, et j'ai cassé la série de mesures.** La requête
  d'indexation `hcebtp.com HCE Hini Cours Enrobé Cize 39300 travaux publics`,
  utilisée à l'identique du 12 au 16/09, a échoué en « Web search error:
  unavailable ». Au lieu de la relancer telle quelle, je l'ai **raccourcie**, et
  la version courte n'a ramené aucune des neuf fiches d'annuaire que les cinq
  runs précédents relevaient. Pendant un instant, ça ressemblait à une
  disparition des fiches — ça n'en était pas une, c'est une autre requête.
  **Règle : une requête de suivi est un instrument de mesure. On la relance
  mot pour mot après un échec ; si on doit vraiment la changer, on mesure les
  deux versions le même jour pour garder le point de raccord.** Même famille
  d'erreur que les extracteurs de texte jetables du 15/09, et corrigée de la
  même façon : figer l'instrument.
  *(La panne elle-même est bénigne : 3 échecs sur 8 appels, chaque fois suivis
  d'un succès à la relance immédiate. Comme les `000` de `curl`, on relance.)*

- 🔴 **16/09/2026 — `git reset --hard` a effacé le chantier du jour, non commité.
  Lire ceci avant toute manipulation de branche.** Le dépôt local était sur la
  branche `claude/upbeat-wozniak-r5b0z1` alors que la consigne dit de committer
  sur `main`. Pour m'y remettre j'ai enchaîné `git checkout main` **puis**
  `git reset --hard origin/main` — et ce second appel a **détruit les deux
  fichiers modifiés et non commités du jour** (`services.$slug.tsx` et
  `llms.txt`), soit l'intégralité du travail rédactionnel et des vérifications
  locales déjà faites. Le fichier de route a pu être récupéré depuis la copie du
  banc d'essai (`$SP/build-test/src/routes/`), qui contenait la version à jour ;
  `llms.txt`, jamais copié là-bas, a dû être réécrit intégralement.
  **Deux règles à appliquer désormais, sans exception :**
  1. **`git checkout main` d'abord, chantier ensuite.** Se mettre sur la bonne
     branche **au tout début du run**, avant la première modification de
     fichier, en même temps que le `git fetch origin main` déjà prévu au point 8
     des chantiers en attente.
  2. **Ne jamais lancer `git reset --hard` tant que `git status` n'est pas
     propre.** `git checkout main` suffisait ici : la branche était déjà
     synchronisée avec `origin/main`, le `reset` n'apportait rien et ne pouvait
     que détruire. Si un `reset` semble nécessaire, committer d'abord.
  **Dégât réel : environ vingt minutes de réécriture, aucune perte définitive** —
  mais seulement grâce au banc d'essai, ce qui est de la chance, pas une méthode.

- **15/09/2026 — « le runner ne peut pas construire le projet » était faux, et
  cette conclusion a coûté un run entier.** Le 14/09, un `bun install` qui
  n'aboutit pas m'avait fait écrire au journal que le projet n'était pas
  constructible ici, et **c'est sur cette base que le chantier de l'accueil a été
  reporté** (« impossible de tester avant de pousser »). Vérifié aujourd'hui :
  `npm install` puis `npm run build` passent en une quarantaine de secondes, et
  `npx vite dev` sert un vrai rendu serveur qui reproduit la production au
  caractère près. Le chantier a été fait en quelques minutes, avec une
  vérification avant / après que le 14/09 n'avait pas.
  **Leçon : un outil qui échoue ne prouve rien sur les autres.** Avant d'écrire
  au journal qu'une capacité manque — et surtout avant de reporter un chantier
  pour cette raison — essayer la deuxième voie évidente. C'est la même famille
  d'erreur que le 13/09 (« un extrait de moteur ne vaut pas lecture ») : une
  observation partielle promue en fait général.

- **14/09/2026 — ma première version du correctif fabriquait des soft 404.**
  En rendant la branche de chargement des `/realisations/*`, j'avais écrit
  `{fb?.title ?? titleCaseSlug(slug)}` : pour **n'importe quel** slug, la page
  servait alors un `<h1>` crédible et un `BreadcrumbList`, avec un HTTP 200.
  `/realisations/n-importe-quoi` serait devenu une page d'apparence valide —
  **un espace de crawl infini de pages vides**, exactement ce qu'on veut éviter
  sur un domaine qui se bat déjà pour être indexé. Repéré en relisant mon propre
  diff avant de commiter, corrigé par un garde-fou (slug inconnu → shell minimal,
  aucun balisage) et **vérifié en ligne après déploiement** : un slug inventé
  sert 47 caractères et zéro `BreadcrumbList`.
  **Leçon : en rendant côté serveur une route à paramètre, toujours se demander
  ce que la page renvoie pour un paramètre qui n'existe pas.** Un repli
  « joli » (title-case du slug) est utile à un humain qui s'est trompé d'URL,
  et nuisible à un crawler.
- **14/09/2026 — une synthèse de moteur a failli me faire conclure à
  l'indexation.** Sur la requête commerciale `entreprise enrobé à chaud Jura
  goudronnage cour`, le texte de synthèse décrivait « HCE – Travaux Publics
  (Cize, 39) » dans les termes mêmes du site (« intervient dans le Jura ainsi
  que le secteur d'Oyonnax »). **Zéro lien `hcebtp.com` dans les résultats** :
  l'information venait des fiches d'annuaire. **Leçon : la règle du 08/09
  (« compter les liens de résultat ») doit aussi s'appliquer aux textes de
  synthèse générés au-dessus des résultats, qui sont encore plus trompeurs
  qu'un comptage d'occurrences puisqu'ils citent l'entreprise par son nom.**
- **13/09/2026 — j'ai failli jeter la meilleure fiche externe du site sur la foi
  d'un extrait de moteur.** L'extrait de `fr.mappy.com` annonçait « 36 av Etienne
  Lamy », l'ancienne adresse. La règle en vigueur depuis le 09/09 (« fiche affichant
  36 ou Champagnole = périmée ») la condamnait sans appel. En l'ouvrant quand même,
  la page affiche **« 40 Bis av Etienne Lamy, 39300 Cize »** et le téléphone du
  site : c'est la seule fiche connue à porter les deux données conformes.
  **Leçon : un extrait de SERP reflète un cache, pas la page.** Il ne peut jamais
  servir à écarter une source — seulement à la repérer. Prolongement direct de la
  leçon du 08/09 (« une URL en 200 ne prouve pas que la page existe »).
  **Effet de bord à traiter** : `kompass.fr` et `verif.com` avaient été classées
  périmées par ce même raccourci, sans lecture. Leur statut est rouvert
  (chantier en attente n°13). `lagazettefrance.fr` et `doctrine.fr`, lues le
  12/09, restent écartées à juste titre.
- **13/09/2026 — deux fausses sources écartées de justesse.** (a) `hal.science`
  renvoie une page de challenge Anubis intitulée « Oh noes! » : sans lire le
  contenu, on croit avoir obtenu un document scientifique. (b) `meteo.bzh` répond
  200 avec un tableau de normales climatiques **entièrement vide** (« -- » partout).
  Dans les deux cas j'aurais pu publier un chiffre de gel « sourcé » qui ne l'était
  pas. **Le chiffre n'a pas été publié.** Même famille de piège que Startpage le
  11/09 : **un code 200 et une page de la bonne forme ne prouvent pas la donnée.**

- **11/09/2026 — j'ai détruit mon propre travail avec un `git reset --hard`
  enchaîné à un `git checkout` qui avait échoué. À ne jamais reproduire.**
  Commande lancée : `git checkout main 2>&1 | tail -2 && git reset --hard origin/main`.
  Le `checkout` a refusé de basculer (modifications non commitées, message
  « Aborting »), **mais le `tail` en fin de tuyau sort avec le code 0** : le `&&` a
  donc laissé passer le `reset --hard`, qui a effacé les deux fichiers modifiés du
  jour. Travail entièrement refait (le contenu était encore dans le fil), zéro perte
  finale, mais du temps perdu.
  **Trois règles à garder :**
  1. **Ne jamais mettre `git checkout`/`git switch` dans un tuyau** : c'est le code
     de sortie de la *dernière* commande du tuyau qui compte, pas celui de git.
  2. **Ne jamais enchaîner un `reset --hard` derrière un `&&`** dans la même
     commande qu'autre chose. Le `reset --hard` se lance seul, après avoir lu
     `git status`.
  3. **Commiter avant de changer de branche**, toujours. Le commit est gratuit,
     le travail perdu ne l'est pas.
  Rappel utile pour ce repo : le push se fait vers `main` (`git push origin HEAD:main`)
  depuis la branche de travail — **il n'y a jamais besoin de basculer de branche.**

- **07/09/2026 — `llms.txt` avait dérivé.** Il annonçait « depuis 2005 »,
  « devis gratuit sous 48h » et « 160°C » alors que le client a explicitement figé
  2012, « Devis détaillé » et 150 °C. Le fichier n'avait pas été mis à jour quand
  le contenu du site l'a été. Corrigé. **Leçon : `llms.txt` est statique et ne
  suit aucun contenu automatiquement — le relire à chaque fois qu'un chiffre ou
  une page change.**
- **07/09/2026 (2e run) — une information donnée comme manquante était déjà sur
  le site.** `ACTIONS-SEO-CLIENT.md` demandait au client son adresse postale
  complète « non publiée sur le site ». Elle était dans le pied de page depuis le
  début, avec l'email et les horaires. **Leçon : avant de demander une donnée au
  client, la chercher dans le rendu du site — pied de page, page contact, mentions
  légales.** Corrigé, et l'adresse est maintenant dans le `LocalBusiness`.
- **07/09/2026 (2e run) — travail dupliqué faute d'avoir fetché avant de
  commencer.** Deux runs le même jour ; le second a réécrit `llms.txt` et rédigé
  un document client déjà produits par le premier, et ne s'en est aperçu qu'au
  push. Aucun dégât (le travail en double a été jeté, pas forcé sur `main`), mais
  du temps perdu. **Leçon : `git fetch origin main` en toute première action du
  run, avant même de lire ce journal.** Ajouté aux chantiers en attente.
- **08/09/2026 — la métrique de mesure du 07/09 était fausse.** « Absent = zéro
  occurrence de `hcebtp` dans le HTML de la SERP » ne vaut rien quand la requête
  contient elle-même le mot : Bing la réinjecte dans le `<title>`, l'`og:url`, le
  champ de recherche et la pagination. `site:hcebtp.com` mesuré aujourd'hui donne
  **22 occurrences pour zéro résultat**. La conclusion du 07/09 (« non indexé »)
  restait juste, mais par chance — sur les requêtes non-marque, où le mot n'apparaît
  pas dans la requête. **Leçon : compter les liens de résultat
  (`href="…hcebtp.com…"`), jamais les occurrences d'une chaîne.** Détail complet
  dans « Positions mesurées — 08/09/2026 ».
- **08/09/2026 — une URL en HTTP 200 ne prouve pas que la page existe.**
  `annuaire-entreprises.data.gouv.fr` renvoie 200 et 957 octets pour n'importe
  quel slug, y compris inventé : c'est une application JavaScript qui sert une
  coquille avant de charger son contenu. J'ai failli l'ajouter en `sameAs` sur la
  seule foi du code 200. **Leçon : vérifier qu'une page contient bien la donnée
  attendue (ici le SIREN ou la raison sociale) avant de la citer** — le code HTTP
  ne suffit pas. C'est exactement ce contrôle qui a validé `societe.com`
  (45 occurrences du SIREN, adresse conforme) et disqualifié l'autre.
- **09/09/2026 — le contrôle du `FAQPage` était fait à moitié depuis deux runs.**
  Le journal demandait de vérifier « que les questions balisées sont présentes
  dans le texte visible ». Les questions le sont — elles sont dans les boutons de
  l'accordéon. **Les réponses, elles, ne l'étaient pas** : cinq sur six
  n'existaient nulle part dans le HTML servi. Le contrôle passait au vert sur un
  site en infraction. **Leçon : vérifier les deux moitiés d'une paire Q/R, et plus
  généralement contrôler le contenu réellement servi plutôt que la constante du
  code source.** Corrigé, cf. l'entrée du jour.
- **09/09/2026 — deux mesures fausses écartées de justesse dans la même heure.**
  (a) Le SERP HTML de Bing renvoyait « absent » pour **toutes** les requêtes ; ce
  n'est qu'en lançant une **requête de contrôle qui a forcément des résultats**
  (`colas enrobé`, zéro domaine externe renvoyé) qu'il est apparu que le canal
  lui-même était mort, et non le site absent. (b) Le flux RSS a d'abord affiché
  « 2 liens hcebtp.com » sur `site:hcebtp.com` : c'étaient les deux `<link>` de
  tête où Bing répète la requête. **Leçon : toute campagne de mesure doit inclure
  une requête témoin, et tout compteur doit exclure les liens du moteur lui-même.**
  Sans le témoin, j'aurais consigné « absent partout » comme un fait.
- **09/09/2026 — j'ai d'abord annoncé un gain de contenu deux fois trop gros.**
  Première mesure du texte visible après correctif : 7 058 caractères, parce que
  mon extraction retirait les `<script>` mais pas les `<style>` — le CSS était
  compté comme du texte. Mesure correcte : **4 640 → 5 160 (+11 %)**. Le 4 640
  retombe exactement sur le chiffre du 08/09, ce qui valide la comparaison.
  **Leçon : retirer `<script>` *et* `<style>` avant de compter du texte, et se
  méfier d'un chiffre qui fait un bond trop flatteur.**
- **07/09/2026 — faux positif évité.** Un premier `curl` sur le sitemap a échoué
  (connection reset) et ressemblait à une panne expliquant la non-indexation.
  Trois relances ont renvoyé 200 : c'était le runner, pas le site. **Leçon : ne
  jamais conclure à une panne sur un seul appel réseau.**

---

## Techniques apprises

### 09/11/2026 (lundi) — 📚 Correspondance titre/H2 ↔ requête et fraîcheur 30-90 j pèsent sur les citations ChatGPT ; 📚 Géoportail → cartes.gouv.fr
- AirOps, « AI Search Statistics (October 2026) », publiée 29/10, màj 02/11/2026
  (https://www.airops.com/blog/ai-search-statistics) — **corrélations, études US, pas de local** :
  page n° 1 Google citée par ChatGPT 43,2 % (3,5× hors top 20, mars 2026) ; H2 proche de la
  requête : 55,9 → 75,3 % de citation (avr. 2026) ; titre ≥ 50 % de recouvrement avec la requête :
  20,1 % vs 9,3 % ; pages de 30-89 jours les plus citées (32,8 %) ; FAQPage 45,6 % ; ≥ 2 sources
  sortantes / 500 mots : ×2,4. **Applicable** : on le fait déjà (H2 = question, sources, FAQ
  visible). À exploiter : relire `<title>`/H2 contre les requêtes de la Search Console dès que
  Yanis les fournit ; ne pas toucher `lastmod` sans contenu (la fraîcheur se gagne par du vrai
  contenu, cycle naturel d'une page tous les 1-3 mois).
- IGN, 19/10/2026 (https://www.ign.fr/actualites/apres-geoportail-decouvrez-cartesgouvfr) :
  cartes.gouv.fr (inauguré le 25/06/2026) succède au Géoportail ; les anciens liens
  `geoservices.ign.fr/…pdf` redirigent (302) vers cartes.gouv.fr. **Applicable** : citer
  cartes.gouv.fr, plus le Géoportail, dans tout nouveau contenu.
- Rien de neuf vérifiable sur claude-seo / geo-seo-claude (pas de changelog lisible depuis le
  runner) ; test « AI Overviews à la place du pack local » (DAC, juin 2025) : ancien, pays non
  précisé — ne change rien : la fiche Google Business Profile reste l'action n° 1 côté client.

### 02/11/2026 (lundi) — 📚 Gemini local : 60 % des citations vont aux sites d'entreprise, mais une mesure ponctuelle ne vaut rien
- **Steady Demand, 20/08/2026** (repris par Optimixed / MarTech / Search Engine Land),
  14 472 citations sur 1 487 requêtes locales (US) : ~**60 %** des citations de Gemini en
  local pointent vers le **site de l'entreprise** (plus qu'annuaires + avis réunis) ; mêmes
  sources sur deux recherches identiques **40 %** du temps seulement ; même entreprise en
  tête **7 %** ; Gemini et ChatGPT citent les mêmes sources **8 %** du temps (pack local
  Google : ~90 % de constance). Source :
  https://optimixed.com/article/business-sites-lead-gemini-local-ai-citations-but-results-vary-fdfe02
- **Applicable** : (1) confirme le pari « contenu propre sur le site » (cf. BrightLocal
  26/10 pour la part GBP) ; (2) **ne jamais conclure sur une seule interrogation d'une IA** :
  si Yanis teste ChatGPT/Gemini à la main, répéter 3-5 fois et noter la fréquence de
  citation, pas un oui/non. La mesure stable reste le pack local et la Search Console.
- Rien de nouveau côté Google depuis la note du 26/10 (mise à jour liens AI Overviews du
  15/10) ; Search Engine Land refusé au `WebFetch`. Skills : pas re-vérifié (canal inutile,
  cf. 19/10).
- ⚙️ `vite dev` doit être lancé avec `--host 127.0.0.1` dans ce runner (sinon
  `EAFNOSUPPORT ::`).

### 26/10/2026 (lundi) — 📚 Google renforce les liens dans AI Overviews (15/10) ; 📚 en local, la fiche Google pèse plus que le site dans les citations IA

- **Google, 15/10/2026** (blog.google, « AI Mode and AI Overviews updates to explore the
  web ») : liens intégrés plus nombreux et plus tôt dans les réponses ; test d'une section
  « pages officielles » en tête de réponse pour une tâche précise ; carrousels
  d'actualités étendus. **Applicable** : une page officielle claire par tâche (`/contact`
  pour « joindre HCE », `/arnaque-goudronnage` pour « vérifier une entreprise ») — d'où le
  maillage du jour. Source :
  https://blog.google/products-and-platforms/products/search/updates-ai-mode-overviews-explore-web/
- **BrightLocal, 26/08/2026 (MAJ 16/09)**, 60 970 vérifications US/UK/AU : la fiche Google
  Business Profile ≈ 28,6 % des citations (≈ 67 % de celles des AI Overviews, calcul sur
  leurs tableaux) ; ChatGPT cite surtout Yelp (marché US, Yelp peu pertinent en France —
  l'équivalent local est PagesJaunes). Les sites d'entreprise = ~93 % des **domaines**
  cités mais pas des citations. **Applicable** : la fiche GBP d'HCE (catégories, horaires,
  photos, description, lien `/contact`) est le levier GEO local n° 1 — hors de portée du
  dépôt, action client. Chiffres internes de l'étude parfois incohérents (28,5 vs 28,63 %).
  Source : https://www.brightlocal.com/resources/ai-directory-sources/
- Skills claude-seo / geo-seo-claude : pas vérifié de nouvelle version ce run.

### 19/10/2026 (lundi) — 📚 Google met en avant les liens dans AI Overviews / Mode IA, et la Search Console compte les impressions IA
Sources : billet Google de Hema Budaraju du 15/10/2026, repris par BetaNews
(betanews.com/article/google-ai-mode-inline-links-higher-click-data/, 16/10) et
Europa Press/Infobae (16/10).
- **Liens intégrés** au texte des réponses IA, nettement plus fréquents ; liens de
  fin de réponse avec miniatures.
- **Test** : un bloc en tête de réponse pour les requêtes dont la réponse est sur
  un ou deux sites officiels (exemple cité : **la page contact d'une entreprise**).
  → Applicable : HCE n'a pas d'URL `/contact` dédiée (contact = section de
  l'accueil). Candidat pour un jour technique : vérifier qu'une ancre/URL de
  contact stable et crawlable porte le NAP complet. Ne rien créer sans contenu propre.
- **Search Console : rapports de performance IA depuis le 03/06/2026**
  (impressions dans AI Overviews et Mode IA, pas encore de clics). → C'est la
  seule vraie mesure GEO côté Google : **Yanis doit la relever**.
- ⚙️ Pas de nouvelle version des skills claude-seo / geo-seo-claude trouvée par
  `WebSearch` (résultats hors sujet) ; ne pas re-chercher chaque lundi par ce canal.
- ⚙️ Le dépôt cloné n'a pas `node_modules` : `npm ci` (18 s) avant `npm run build`.
- ⚙️ Source réutilisable : guide CERIB/FIB *pose des pavés, dalles et bordures*
  (juillet 2017, réf. 152E_V4), copie Alkern lisible par `WebFetch`.

### 12/10/2026 (lundi) — 📚 ChatGPT search en local : le site de l'entreprise pèse 58 % des sources, via l'index Bing
Source : BrightLocal, *Uncovering ChatGPT Search Sources* (12/12/2024, 800
recherches locales US, données nov. 2024) — brightlocal.com/research/uncovering-chatgpt-search-sources.
- Sources citées : **sites d'entreprise 58 %**, mentions (médias, Wikipédia)
  27 %, annuaires 15 % ; Reddit/Quora 0. ChatGPT Search s'appuie surtout sur
  l'**index Bing** et lit aussi les avis Google.
- **Applicable ici** : le contenu propre du site est bien le premier levier
  GEO local (ce qu'on fait), mais il faut être **indexé par Bing**. IndexNow
  est fait ; **Bing Webmaster Tools n'a jamais été demandé** (absent de
  `ACTIONS-SEO-CLIENT.md`) → action Yanis : importer le site depuis la GSC.
- Limite : étude US de 2024, pas de mesure française équivalente trouvée.
- ⚙️ Aucun outil Search Console n'est chargeable depuis le runner (ToolSearch
  « search console » → rien) : ne pas re-chercher, demander les chiffres à Yanis.
- ⚙️ `vite dev` doit être lancé avec `--host 127.0.0.1` (sinon EAFNOSUPPORT
  sur `::`) ; `verif-faq.mjs` accepte une URL de page précise.
- ⚙️ Guide MTQ Québec 2009 (*mise en place des enrobés bitumineux*) : source
  publique, en français, chiffrée sur la fenêtre de compactage — réutilisable.

### 08/10/2026 — ⚙️ Trois canaux de mesure tranchés (dont deux à ne plus jamais essayer), ⚙️ le piège `tsc` d'une route neuve, et 📚 les mentions légales ont changé d'article en 2024

**1. ⚙️ NE PLUS JAMAIS essayer de mesurer une SERP avec `curl` sur Bing ou sur
DuckDuckGo depuis ce runner.** Testé à fond aujourd'hui, les deux échouent, et
différemment :
- **Bing en HTML** (`bing.com/search?q=…&setlang=fr&cc=FR&mkt=fr-FR`) répond
  200 avec une page complète… **dont le contenu n'a aucun rapport avec la
  requête** : « enrobé à chaud Jura » a rendu l'Apec de Toulouse, « terrassement
  Jura » un forum Toyota, « goudronnage cour maison Jura » neuf pages de
  zhihu.com sur la pizza, et `site:hcetp.com` des pages de téléchargement de
  WhatsApp. Le compteur `sb_count` affiche des volumes plausibles, ce qui rend
  le piège sournois : **une page qui a l'air d'une SERP n'en est pas une.**
- **Bing en `&format=rss`** est pire : 10 `<item>` bien formés et totalement
  décorrélés, donc **aucun symptôme visible**. C'est le canal le plus dangereux
  des deux.
- **DuckDuckGo** (`html.duckduckgo.com/html/?q=…`) répond **HTTP 202** avec une
  page de défi anti-robot et zéro résultat. Au moins il le dit.

**Règle qui en découle, à ne pas re-tester :** le seul canal de mesure
d'indexation depuis ce runner est l'outil **`WebSearch`**, avec sa réserve
connue (orienté marché américain, opérateur `site:` non honoré), et la seule
ligne exploitable est **« le domaine apparaît / n'apparaît pas »**. Tout le
reste demande la Search Console, donc le client.

**2. ⚙️ RECETTE — une route neuve fait échouer `tsc` jusqu'à ce que le build
l'enregistre.** Ce routeur (TanStack) génère `src/routeTree.gen.ts`, et le type
des chemins (`Link to=…`) en dérive. Créer `src/routes/mentions-legales.tsx`
puis lancer `npx tsc --noEmit` donne **deux erreurs trompeuses** :
`TS2322: Type '"/mentions-legales"' is not assignable to type '"." | ".." | "/" | …'`
et `TS2345: … is not assignable to parameter of type 'keyof FileRoutesByPath'`.
**Ce ne sont pas des erreurs de code : c'est l'arbre des routes qui n'a pas été
régénéré.** L'ordre à tenir est donc **`npm run build` d'abord, `tsc` ensuite** —
et `routeTree.gen.ts` est suivi par git, il entre dans le commit.

**3. ⚙️ Le banc d'essai local, deux précisions qui ont coûté du temps
aujourd'hui.** La recette du 15/09 reste exacte mais incomplète sur deux points.
- **`bun install` marche** (650 paquets en 9 s) et **ne réécrit ni `bun.lockb`
  ni `package-lock.json`** — vérifié par `git status` juste après. C'est donc
  l'installation à préférer dans le dépôt de travail, contrairement à
  `npm install` que le 15/09 interdisait à raison.
- **`npx vite preview` échoue toujours** (il cherche `dist/server/server.js`
  quand le build produit `.vercel/output/`), et **si une tentative de `preview`
  a déjà pris le port 4175, le `vite dev` suivant glisse silencieusement sur
  4176** — en affichant l'URL dans son journal, pas dans le terminal. **Lire
  `dev.log` avant de conclure qu'un 500 vient du code.** Le 500 du jour venait
  de là.

**4. 📚 Les mentions légales obligatoires ont changé d'article en 2024, et
toute la littérature SEO cite encore l'ancien.** Relevé sur Légifrance le
08/10 : l'obligation d'identification de l'éditeur d'un service de
communication au public en ligne ne figure **plus à l'article 6, III, 1° de la
loi n° 2004-575 du 21 juin 2004** (LCEN) mais à **son article 1-1**, dont la
version en vigueur date du **23/05/2024** (loi SREN). L'article impose trois
identifications : l'éditeur, le directeur de la publication, **et** le
fournisseur d'hébergement. **Pourquoi c'est exploitable ici :** c'est une
donnée datée, vérifiable, que les pages de mentions légales des concurrents
n'ont pas mise à jour — exactement le type de passage qu'une IA cite. Et c'est
la base légale du chantier du jour.
Source : `legifrance.gouv.fr/loda/article_lc/LEGIARTI000049568614`.

**5. ⚙️ Un hébergeur se cite depuis sa propre politique de confidentialité, pas
depuis un souvenir.** L'article 1-1 impose de nommer l'hébergeur. `vercel.com/contact`
ne donne aucune adresse postale ; **`vercel.com/legal/privacy-policy`, section
« Contact Us », la donne en clair** : « Vercel Inc. », « 440 N Barranca Avenue
#4133 Covina, CA 91723 United States ». À réutiliser tel quel, et à revérifier
le jour où l'hébergement change.

**6. ⚙️ Vérifier qu'un crawler n'est pas bloqué se fait avec son User-Agent, pas
en relisant `robots.txt`.** Le journal concluait « site sain » depuis le 07/09
sur la lecture du dépôt. Le contrôle qui manquait tient en une ligne et il est
désormais fait, négatif :
`curl -s -o /dev/null -D - -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://www.hcetp.com/`
→ **200**, aucun `x-robots-tag`, aucun `Set-Cookie`. Cela écarte une protection
de déploiement Vercel ou un pare-feu applicatif, qui auraient rendu un 401/403
**uniquement** sur l'UA du robot. **À refaire seulement si l'hébergement ou le
domaine change.**

**7. ⚙️ `npx eslint .` ne finit PAS sur ce runner — ne jamais le lancer sur tout
le dépôt.** Lancé aujourd'hui pour vérifier qu'une erreur de lint préexistait,
il a été **tué au bout de 30 minutes sans avoir rendu de résultat**. C'est le
même genre de piège que le `pkill` du 07/10 : une commande qui paraît anodine et
qui mange un run. **Toujours lister les fichiers :**
`npx eslint src/routes/<fichier>.tsx …` sort en quelques secondes.
⚠️ `npm run lint` du `package.json` est précisément `eslint .` : **ne pas
l'ajouter à la recette d'avant-push.** Les contrôles d'avant-push qui marchent
et qui suffisent sont ceux du 08/10 : `npm run build`, `npx tsc --noEmit`,
`npm run check:fige`, `npx prettier --check <fichiers>`, `verif-lastmod.mjs`,
`verif-faq.mjs`.
**Et la bonne façon de savoir si une erreur de lint préexiste** : la lire dans
la version commitée du fichier, pas en lintant tout le dépôt —
`git show HEAD:src/routes/index.tsx | grep -n "@ts-ignore"`. Une ligne, une
seconde. (Réponse du jour : l'erreur `@typescript-eslint/ban-ts-comment` de
`src/routes/index.tsx:1561` est **préexistante**, au même numéro de ligne, et
n'a donc pas été corrigée — règle « ne pas réparer ce qui marche ».)

**8. ⚙️ Ne pas conclure sur une seule mesure réseau.** Le premier `curl` sur
l'apex `https://hcebtp.com/` a rendu un **code 000** (échec de connexion), ce
qui aurait pu se journaliser en « l'apex est tombé ». Le second appel, en mode
verbeux, a montré un **308 propre vers `https://www.hcetp.com/`**. L'aléa était
dans le réseau du runner, pas sur le domaine. **Toute mesure réseau négative se
confirme par un second appel avant d'être écrite.**

### 07/10/2026 — ⚙️ Trois acquis : relever le graphe des liens internes en 15 lignes, le piège du `pkill` qui tue le run, et 📚 `WebSearch` ne rend pas une SERP française exploitable pour juger un concurrent

⚙️ **RECETTE — relever les liens internes servis à Googlebot, page par page.**
`mesure-texte-servi.mjs` a une colonne `liensR`, mais elle ne compte **que** les
liens `/realisations/*` : elle ne voit ni les liens entre services, ni
`/zone-intervention`, ni le hub. Pour mesurer un chantier de maillage il faut le
graphe complet, et il tient en quelques lignes :

```js
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const r = await fetch(base + p, { headers: { "User-Agent": UA } });
const h = await r.text();
const hrefs = [...h.matchAll(/href="(\/[^"#?]*)/g)].map(m => m[1]);
const internal = [...new Set(hrefs)].filter(u =>
  !u.startsWith("/assets") && !u.startsWith("/_") &&
  !/\.(png|jpg|svg|ico|webp|xml|txt|json|webmanifest|css|js|mjs)$/i.test(u));
```

- **Filtrer les assets et les `/_…` est indispensable** : sans ça on compte les
  images et les chunks du build, et le chiffre ne veut plus rien dire.
- **Dédoublonner** (`new Set`) : on mesure des cibles distinctes, pas des
  occurrences — un lien présent dans le header et dans le footer est un seul
  chemin de crawl.
- ⚠️ **Sur le banc local, vider les variables de proxy dans le script**
  (`delete process.env.HTTPS_PROXY` etc.), sinon `fetch` envoie la requête vers
  `127.0.0.1` **dans le proxy sortant** et échoue. C'est l'équivalent du
  `--noproxy '*'` de la recette `curl` du 15/09, que `fetch` n'a pas.
- **Se mesure des deux côtés** : production = avant, banc local = après. C'est
  comme ça que le 1 → 6-7 du jour a été établi.

⚠️ **PIÈGE — `pkill -f "vite dev"` TUE LE RUN LUI-MÊME.** Lancé pour arrêter le
serveur du banc d'essai, il a terminé la commande avec le code **144** (128+16,
SIGTERM) : le motif `-f` matche aussi la ligne de commande du shell qui le
contient. **Ne pas s'en servir pour arrêter le banc.** Le serveur `vite dev`
lancé en arrière-plan n'a de toute façon pas besoin d'être arrêté : le runner est
éphémère. Si c'est vraiment nécessaire, viser le PID précis, pas un motif.

⚠️ **RAPPEL VÉRIFIÉ À SES DÉPENS — `npm install` réécrit `package-lock.json`
dans le dépôt de travail.** Le piège était documenté depuis le 15/09 et il a
quand même été déclenché aujourd'hui (796 insertions dans le lockfile, repérées
au `git status` avant le commit, restaurées par `git checkout --`).
**`node_modules` n'est PAS présent au démarrage du runner : il faut installer
avant tout contrôle, et donc le piège se présente à chaque run.** La parade la
plus simple n'est pas la copie de travail du 15/09 mais **un `git status` avant
chaque commit** : le lockfile modifié y saute aux yeux.

📚 **`WebSearch` NE PERMET PAS DE JUGER UN CONCURRENT, et c'est maintenant
démontré, plus seulement soupçonné.** La réserve « orienté marché américain »
traîne dans le journal depuis le 05/10 sans conséquence pratique. Les relevés du
07/10 la rendent opérationnelle :
- la **phrase exacte du site**, qui ramenait **dix sites français d'enrobé** les
  30/09, 01/10 et 02/10 (dont une SERP strictement identique deux jours de
  suite), ramène le 07/10 **neuf brevets américains** sur le pavage décoratif
  (USPTO, Google Patents, CIPO) ;
- la requête commerciale ne contient plus **ni SFCTP ni PagesJaunes**, qui
  tenaient ensemble **6 places sur 9** deux jours plus tôt.

**Aucun bouleversement de cette ampleur n'est crédible en 48 h sur un marché
local français : c'est l'outil qui bouge, pas le marché.**
**Ce qu'on peut encore en tirer, et c'est tout :** « le domaine apparaît / n'y
est pas » (une absence confirmée sur quatre formulations reste une absence), et
le code IndexNow. **Ce qu'on doit arrêter d'en tirer :** l'ordre des résultats,
le nombre d'URLs d'un concurrent, et tout chantier bâti sur « l'angle repéré
chez SFCTP ». Le chantier du 02/10 avait été partiellement choisi sur ce motif —
il se justifiait aussi par la maigreur de la page, donc la conclusion reste
bonne, mais **le motif, lui, n'était pas une mesure.**

### 06/10/2026 — ⚙️ Trois acquis sur la chaîne de déploiement : Nitro ignore `engines` pour le runtime des Functions, le pin se vérifie en le réglant à une valeur fausse, et le type du wrapper Lovable se contourne sans `as`

**1. ⚙️ Le preset Vercel de Nitro déduit le runtime des Functions de la version
de Node qui exécute le BUILD — `package.json > engines` n'y entre pas.**

`node_modules/nitro/dist/_presets.mjs`, `resolveVercelRuntime()`, lignes
1519-1529 de nitro `3.0.260603-beta` :

```js
const systemNodeVersion = getSystemNodeVersion();   // = process.versions.node
runtime = `nodejs${SUPPORTED_NODE_VERSIONS.find(v => v >= systemNodeVersion)
                   ?? SUPPORTED_NODE_VERSIONS.at(-1)}.x`;
```

`SUPPORTED_NODE_VERSIONS = [20, 22, 24]`. La valeur part dans
`.vercel/output/functions/__server.func/.vc-config.json`, champ `runtime`.
**Conséquence pratique : déclarer `engines.node` ne change pas le runtime
déclaré des Functions.** Les deux réglages sont indépendants, et c'est
contre-intuitif — Vercel documente `engines` comme le moyen de surcharger la
version du tableau de bord, ce qui est vrai **pour le build**, pas pour ce que
le preset Nitro écrit dans la sortie.

L'override existe et c'est le bon : `nitro.vercel.functions.runtime`
(`VercelOptions > functions.runtime`, typé
`"nodejs20.x" | "nodejs22.x" | "nodejs24.x"`, documenté « Defaults to the
auto-detected Node.js version »). En place dans `vite.config.ts` depuis
`1dd1c98`.

**2. ⚙️ RECETTE — vérifier qu'un `pin` de configuration est réellement pris en
compte : le régler à une valeur FAUSSE.**

Épingler le runtime à `nodejs22.x` sur une machine qui tourne déjà sous Node 22
ne prouve rien : la sortie est identique avec ou sans l'option. **Le contrôle
n'a de valeur que si la valeur épinglée diffère de celle qu'aurait produite
l'auto-détection.** Ici : pin réglé à `nodejs24.x`, build, puis lecture de
`.vc-config.json` → `"runtime": "nodejs24.x"`. L'option traverse donc bien le
wrapper Lovable. Valeur finale remise à `nodejs22.x` ensuite.

**C'est le même principe que le « contrôle négatif obligatoire » noté le 27/09,
appliqué à une configuration au lieu d'une mesure.** À réutiliser pour toute
option dont la valeur par défaut pourrait coïncider avec la valeur voulue.

**3. ⚙️ Passer une option que le type du wrapper ne déclare pas, sans `as` ni
`@ts-ignore` : une variable intermédiaire.**

Le type `nitro` de `@lovable.dev/vite-tanstack-config` ne déclare que
`preset`/`output`/`cloudflare`. Un littéral inline déclenche le contrôle des
propriétés excédentaires de TypeScript (`TS2769`, « 'vercel' does not exist in
type … »). Or ce contrôle **ne s'applique qu'aux objets littéraux « frais »** :

```ts
const nitroConfig = {
  preset: "vercel",
  vercel: { functions: { runtime: "nodejs22.x" } },
};
export default defineConfig({ nitro: nitroConfig });
```

`tsc --noEmit` sort en **0**, et l'option arrive bien à Nitro (vérifiée par le
point 2). Préférable à `as never` ou `@ts-ignore` : rien n'est masqué, et le
jour où le wrapper élargira son type, ce code restera valide tel quel —
contrairement à `@ts-expect-error`, qui deviendrait lui-même une erreur.

**4. ⚠️ Et le résultat négatif, qui est l'acquis le plus utile : ni `engines`
ni le runtime épinglé ne débloquent un déploiement Vercel refusé.** Mesuré le
06/10 (push 07:33:06 UTC, production inchangée à 07:56). Donc **quand les builds
Vercel échouent, il ne faut pas plus de deux tentatives depuis le dépôt sur ce
terrain-là.** Au-delà, la cause est côté plateforme et seul le journal de build
du tableau de bord la nomme. À ne pas réapprendre une troisième fois.

### 05/10/2026 (lundi — veille de l'étape 5) — ⚙️ La recette qui manquait depuis trois jours : lire l'état des builds Vercel depuis le runner, 📚 Vercel a désactivé Node.js 20 le 01/10/2026, et 📚 les AI Overviews sont déployés en France depuis septembre 2026

⚙️ **RECETTE — Voir l'état des déploiements Vercel sans compte Vercel.** À
utiliser **en premier** dès qu'un doute existe sur la mise en ligne. Vercel écrit
chaque déploiement et chaque statut dans l'API GitHub du dépôt ; le proxy du
runner injecte l'authentification, donc un `curl` nu suffit :

```bash
R=stupidguywearingtn/art-du-jardin-web
# 1. État du dernier commit : success / failure / pending, + l'URL du build
curl -sS -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$R/commits/$(git rev-parse HEAD)/status"
# 2. Historique des déploiements (sha, environnement Production/Preview, date)
curl -sS -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$R/deployments?per_page=30"
# 3. Statut final d'un déploiement donné (+ target_url, log_url)
curl -sS -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$R/deployments/<id>/statuses"
```

Ce que ça donne et ne donne pas :
- ✅ **l'état** (`success`/`failure`/`pending`), **la date au quart d'heure**,
  **l'identifiant de déploiement Vercel** (`dpl_…`) et **l'URL du tableau de
  bord** ;
- ✅ de quoi **dater une rupture au commit près** : comparer le dernier `success`
  et le premier `failure` encadre la cause sans toucher au code ;
- ✅ de quoi **distinguer « rien ne part » de « tout échoue »**, ce qui était
  exactement la question ouverte du 02/10 ;
- ❌ **pas le journal de build** : le contenu de l'erreur demande le compte
  propriétaire. L'URL de déploiement en échec sert une page Vercel « Deployment
  has failed » sans détail (vérifié : `initialReadyState: ERROR`, aucun message).
- ⚠️ **Les délais affichés ne mesurent pas la durée du build** : Vercel poste le
  déploiement et son statut final au même instant (écart mesuré 0-1 s sur 24
  déploiements, succès compris). **Pour chronométrer un build, interroger
  `/commits/:sha/status` en boucle après le push** — c'est ainsi qu'a été mesuré
  `pending` à t+20 s puis `failure` à t+40 s le 05/10.
- 🔎 Deux canaux voisins **vides** sur ce dépôt, ne pas y perdre de temps :
  `/commits/:sha/check-runs` (0) et `/commits/:sha/comments` (0). Vercel passe
  uniquement par les *statuses* et les *deployments*.

📚 **VERCEL A DÉSACTIVÉ NODE.JS 20 LE 01/10/2026 — applicable ici, et c'est la
piste principale du blocage.** Verbatim du
[changelog Vercel « Node.js 20 is being deprecated »](https://vercel.com/changelog/node-js-20-is-being-deprecated)
(lu le 05/10/2026) : « **On October 1, 2026, Node.js 20 will be disabled in
Project Settings** […] **Existing projects using 20 as the version for Functions
will display an error when a new deployment is created** ». Et : « existing
deployments with Serverless Functions will not be affected » — **ce qui explique
qu'un site non redéployé continue de tourner normalement**.
- Versions disponibles aujourd'hui : **24.x (défaut), 22.x, 20.x** — la doc
  `/docs/functions/runtimes/node-js/node-js-versions` liste encore 20.x, mais
  elle est datée du 27/02/2026 : **sur ce point précis, c'est le changelog qui
  fait foi, pas la page de référence.**
- **Comment imposer une version depuis le dépôt** (verbatim doc Vercel, « Version
  overrides in `package.json` ») : « You can define the major Node.js version in
  the `engines#node` section of the `package.json` **to override the one you have
  selected in the Project Settings** ». Syntaxe acceptée : `22.x`, `^22.0.0`.
  ⚠️ **Attention au piège : une plage large remonte la version la plus récente** —
  la table de la doc donne `>=20.0.0` → **24.x**. Pour une version déterministe,
  écrire `22.x` et rien d'autre.
- ⚠️ **Ce qui a été mesuré ici et qui tempère tout ce qui précède : ajouter
  `engines.node` n'a PAS débloqué le déploiement** (preview du 05/10 en échec en
  moins de 40 s), et **le déploiement du 01/10 à 07:12 a réussi** alors que la
  désactivation prenait effet à 00:00 ce jour-là. Donc soit le réglage du projet
  est refusé en amont de la lecture de `package.json`, soit la cause est
  ailleurs. **Ne pas présenter cette piste comme établie.**
- 🔧 **Où vérifier la version réellement demandée par le build, et c'est propre
  aux presets Nitro/Vercel** : après `npm run build`, le fichier
  `.vercel/output/functions/__server.func/.vc-config.json` porte un champ
  `runtime`. Ici il vaut **`nodejs22.x`** (vérifié le 05/10). **C'est le build qui
  déclare le runtime à Vercel** : si un jour ce champ sort à `nodejs20.x`, le
  déploiement sera refusé quoi que dise `engines`. À regarder avant de pousser un
  changement de version de Node ou de Nitro.

📚 **LES AI OVERVIEWS SONT DÉPLOYÉS EN FRANCE DEPUIS SEPTEMBRE 2026 — et ça
change la hiérarchie des chantiers hors-site.** Déploiement en France « au plus
tard le 23 septembre 2026 », et les AI Overviews apparaissent sur une large part
des requêtes à intention locale. Deux conséquences **applicables ici** :
1. **Les annuaires que l'IA cite pèsent plus qu'avant**, parce que la réponse est
   construite en croisant plusieurs sources et le Knowledge Graph plutôt qu'en
   listant des liens. **PagesJaunes tient les deux premières places de la requête
   commerciale mesurée depuis le 02/10** : la fiche `/pros/52322496`, vérifiée
   propre le 04/10 (bon téléphone, adresse actuelle, mais **aucun lien vers le
   site**), est donc le point d'entrée le plus rentable du dossier. **Ça confirme
   l'ordre des actions client, ça ne le change pas.**
2. **Le classement ne suffit plus** : sur une requête où Google affiche une
   réponse IA, une position donnée rapporte nettement moins de clics qu'avant.
   **L'objectif reste « être la source citée », ce que fait déjà le travail de
   fond (réponse directe en tête de H2, chiffres sourcés, `FAQPage` aligné sur le
   visible). Rien à changer dans la méthode.**
⚠️ **Réserve sur la qualité des sources :** cette veille-ci n'a ramené que des
blogs d'agences, pas de source primaire Google. **Les deux chiffres couramment
cités (déploiement France, part des requêtes locales concernées) sont à traiter
comme des ordres de grandeur, pas comme des mesures.** Ne pas les recopier dans
une page du site.

📚 **GOOGLE NE RECULE PAS SUR LES DONNÉES STRUCTURÉES EN 2026 — vérifié, rien à
faire.** Les pages de référence `LocalBusiness`, `Organization` et la galerie des
types supportés sont toujours en place sur developers.google.com, et la mise à
jour de septembre 2026 **ajoute** du support de requêtes « local business » aux
unités agrégateur/fournisseur. **Le site est indemne : ses types en place
(`LocalBusiness`, `Organization`, `Service`, `FAQPage`, `BreadcrumbList`) sont
tous encore documentés.** Point à ne pas rouvrir avant longtemps — c'est la
deuxième veille consécutive (avec celle du 28/09) qui conclut pareil.

### 04/10/2026 — ⚙️ Un HTTP 403 au `curl` ne veut pas dire qu'une page est illisible : `WebFetch` passe là où le runner est refusé

**L'acquis, en une phrase : avant de classer une page « contenu non vérifiable »,
l'essayer par `WebFetch` — c'est un canal différent de `curl` depuis le runner, et
il n'est pas bloqué par les mêmes protections.**

**Ce qui l'a révélé.** `pagesjaunes.fr/pros/52322496` était marquée « contenu non
vérifiable depuis nos outils, HTTP 403 » dans `ACTIONS-SEO-CLIENT.md` **depuis le
12/09/2026**, soit 22 jours. Le 04/10, `WebFetch` l'a lue sans difficulté et en a
sorti le téléphone, l'adresse et l'absence de lien vers le site. **Rien n'avait
changé côté PagesJaunes : c'est le canal qui n'avait jamais été essayé.**

**Pourquoi ça marche.** `curl` depuis le runner part avec un `User-Agent` d'outil
et une IP de datacenter — la signature que les anti-bots de Solocal et consorts
refusent. `WebFetch` passe par une autre infrastructure, qui se présente
autrement. Les deux ne tombent donc pas sur les mêmes murs.

**Le coût de ne pas l'avoir su.** L'action client « revendiquer PagesJaunes et y
ajouter l'URL » — classée priorité n°1 de l'action 4 depuis le 12/09 — reposait
pendant trois semaines sur une **hypothèse** (« elle ne porte probablement pas le
lien ») présentée au client comme une tâche. Elle était juste, mais elle aurait pu
être fausse, et la vérification coûtait un appel d'outil.

**Règle à appliquer.** « Non vérifiable » n'est un statut acceptable qu'après avoir
essayé **les deux** canaux. *(À noter avec la recette du 02/10 sur les PDF :
`WebFetch` est décidément l'outil à essayer en second quand `curl` cale, et
réciproquement.)*

**⚠️ Nuance mesurée le même jour, et elle évite d'en faire une règle trop large :
`WebFetch` n'est pas un passe-partout.** Les deux autres fiches classées « non
vérifiable » ont été retentées par ce canal dans le même run :

| Fiche | Résultat au `WebFetch` du 04/10 |
|---|---|
| `pappers.fr/entreprise/hce-hini-cours-enrobe-521683573` | **lue** — « Site internet : Non disponible », `40 B AVENUE ETIENNE LAMY 39300 CIZE`, SIRET `521 683 573 00039`, téléphone « Réservé aux utilisateurs connectés » |
| `verif.com/societe/H.C.E.---HINI---COURS---ENROBE-521683573/` | **toujours HTTP 403**, y compris par `WebFetch` |

Donc : deux fiches débloquées sur trois (PagesJaunes, Pappers), une qui résiste aux
deux canaux (Verif). **`verif.com` reste légitimement « non vérifiable » et il ne
sert à rien de la retenter par ces deux outils** — elle demandera un navigateur, ou
rien. Le statut « non vérifiable » garde donc un sens, mais il se mérite après deux
essais, pas après un.

### 02/10/2026 — ⚙️ Cinq acquis : lire un PDF que `WebFetch` refuse, un filon de documents techniques routiers gratuits, deux classifications qui portent les mêmes étiquettes, `npm ci` qui ne peut pas marcher sur ce dépôt, et un trou dans la fiche Météo-France de Champagnole

**1. ⚙️ RECETTE — `WebFetch` ne lit pas un PDF, mais il l'enregistre : le chemin
est dans sa réponse, et `pdftotext` finit le travail.** C'est l'acquis le plus
réutilisable du jour, et il débloque un gisement entier de sources primaires.
Appelé sur un PDF, `WebFetch` répond « le contenu fourni est un fichier PDF
encodé en binaire qui n'est pas lisible » — ce qui ressemble à un échec. **Mais
la dernière ligne de sa réponse donne le chemin local du fichier téléchargé**
(`[Binary content (application/pdf, 980.6KB) also saved to …/tool-results/…pdf]`).
Il suffit alors de :
```
pdftotext -layout <ce chemin> sortie.txt
```
`pdftotext` est **déjà installé** sur le runner (`/usr/bin/pdftotext`), et
l'option `-layout` conserve les colonnes — indispensable pour les tableaux. Deux
PDF ont été lus intégralement ainsi aujourd'hui (46 ko et 6 ko de texte).
**Ne plus jamais renoncer à une source parce qu'elle est en PDF.** Rappel utile :
la recette du 17/09 pour les fiches Météo-France faisait la même chose à la main
avec `curl` ; celle-ci marche même quand l'URL n'est connue que par `WebSearch`.

**2. ⚙️ FILON — l'IDRRIM et les conseils départementaux publient des documents
techniques routiers gratuits, datés et verbatim-citables.** Deux sources
nouvelles, toutes deux exploitées aujourd'hui :
- **IDRRIM — notes d'information**, `idrrim.com/ressources/documents/…`. La n° 43
  de **décembre 2020** (« Choix et mise en œuvre des couches de surface dans les
  zones soumises à des conditions climatiques hivernales rigoureuses ») est une
  mine pour ce site : elle est **écrite pour les zones à hiver rigoureux**, donc
  elle chiffre exactement ce que le climat du Jura change à un enrobé. Elle
  contient des interdits verbatim (« le rechargement n'est pas possible sur… »),
  des seuils (pontage dès 2 mm, module de richesse K, bornes de macrotexture) et
  **une règle indexée sur l'altitude** (grade de bitume 50/70 au-dessus de 700 m,
  70/100 au-dessus de 1 000 m) qu'aucun concurrent ne publie. **Les notes n° 17,
  n° 35 et n° 43 sont désormais connues ; il y en a d'autres, l'index est sur le
  site de l'IDRRIM.**
- **Fiches techniques des conseils départementaux**, par technique de revêtement.
  Celle de la **Meuse** sur le BBSG donne, sur une page, domaine d'emploi,
  épaisseurs moyennes et minimales, granularités, conditions météo de pose
  (« Température ambiante > 5°C », « Pas de pluie »), dosage de couche
  d'accrochage et moyens de compactage. ⚠️ **Elle n'est pas datée** : la citer
  comme fiche technique du département, sans inventer de millésime. ⚠️ **Elle
  publie aussi des prix au m²** — ne jamais les reprendre, ce sont des prix de
  marché public et le site n'affiche aucun prix.

**3. 📚 PIÈGE — « zones H1/H2/H3/H4 » désigne DEUX classifications sans rapport,
et le moteur mélange les deux.** La note IDRRIM vise les zones **H3 ou H4** de la
**viabilité hivernale routière**, définies par `J1+J2+J3 > 30` (jours de neige
blanchissant la chaussée, jours de verglas sous précipitation, jours de verglas
hors précipitation). Une recherche sur ces étiquettes renvoie massivement les
**zones climatiques H1/H2/H3 de la RE2020 et du DPE**, qui sont thermiques,
découpées autrement, et n'ont rien à voir. L'extrait de `WebSearch` a mélangé les
deux dans une même réponse et attribué au Jura une zone « H1c » qui appartient à
la seconde classification. **Rien n'a été publié sur cette base.**
**Règle : quand deux référentiels partagent une étiquette, n'en citer aucun sans
avoir identifié le document qui la définit.** Et corollaire pratique : le
classement Hi n'est pas publié commune par commune — la carte de la note est une
image, non extractible.

**4. ⚙️ `npm ci` NE PEUT PAS marcher sur ce dépôt, et ce n'est pas un incident.**
`package-lock.json` est désynchronisé de `package.json` (`Missing: miniflare,
sharp, workerd, ws from lock file`), ce que le journal note depuis le 09/09 avec
la consigne « **ne pas régénérer `package-lock.json`** ». La séquence qui marche,
et qui respecte cette consigne :
```
npm install --no-audit --no-fund     # 16 s, et il réécrit package-lock.json
… travail, build, mesures …
git checkout -- package-lock.json    # AVANT de commiter
```
**Le `git checkout` n'est pas optionnel** : sans lui, le commit emporte 840 lignes
de churn de lockfile qui n'ont rien à voir avec le chantier. Vérifié aujourd'hui
avec `git status` avant commit.

**5. ⚙️ Détail à ne pas rechercher deux fois : la fiche climatologique de
Champagnole n'a PAS les jours de neige.** La rubrique « Nombre moyen de jours avec
brouillard / orage / grêle / neige » porte « **Données non disponibles** » pour la
station 39097003. Les lignes exploitables de cette fiche sont le gel (`Tn ≤ 0` :
111,7 j/an ; `Tn ≤ -5` : 35,2 ; `Tn ≤ -10` : 10,0), les jours sans dégel
(`Tx ≤ 0` : 9,3), les températures et les précipitations. **Le contrôle de
cohérence interne du 30/09 a resservi et passe** : (3,6 + 15,2) / 2 = 9,4, soit
exactement la moyenne annuelle affichée.

### 01/10/2026 — ⚙️ Trois acquis : le journal ne voit pas ce qui suit sa dernière entrée, le code 202 d'IndexNow est une mesure, et Google avalise le 308

**1. ⚠️ LE PLUS IMPORTANT — le journal ne connaît que ce que le dernier run a
écrit. Lire `git log` AVANT de lui faire confiance.**
Le domaine du site a changé le 30/09 à 11h56 (commit `f07b19f`). Le commit de
journal du 30/09 (`98ff21a`) est **antérieur** à cette bascule. Résultat : les
353 Ko de journal, *y compris l'entrée la plus récente*, décrivent un domaine qui
n'est plus celui du site — et **la consigne du run elle-même est périmée sur ce
point**, puisqu'elle nomme `hcebtp.com`. Un run qui aurait fait confiance au
journal et à sa consigne aurait travaillé une journée entière sur le mauvais
domaine.
**Recette à appliquer en ouverture de chaque run, après la lecture du journal :**
```
git log --oneline -15        # ce qui a bougé depuis la dernière entrée
curl -sS -o /dev/null -w "%{http_code} %{redirect_url}\n" https://<domaine>/
```
Un commit non journalisé est le cas normal, pas l'exception : le client et
d'autres sessions poussent aussi sur `main`. **Corollaire : l'étape « mesurer
avant d'agir » doit inclure « vérifier quel domaine on mesure ».**

**2. ⚙️ IndexNow : `202` au lieu de `200` est une information, pas une panne.**
L'ancien domaine a renvoyé **200** sur 24 soumissions consécutives. La première
soumission du nouveau domaine renvoie **202**. Le script le documente lui-même :
200 = accepté, **202 = accepté, clé en cours de vérification — « cas normal pour
un domaine encore inconnu des moteurs »**. Donc :
- **Ne pas traiter un 202 comme un échec** et ne pas resoumettre en boucle.
- **Le 202 se lit comme une mesure** : il confirme, depuis Bing, que l'hôte est
  neuf et inconnu. C'est le seul signal d'indexation qu'on obtienne sans Search
  Console, et il est gratuit.
- **Il devrait repasser à 200** une fois la clé vérifiée : si un prochain run voit
  200 sur `www.hcetp.com`, c'est que Bing a au moins lu le fichier clé. **À
  surveiller — c'est un indicateur de progrès, à relever à chaque run.**

**3. 📚 Google avalise explicitement le `308` pour un déplacement de site.**
Doc lue le 01/10/2026 :
`developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes`.
Verbatim : « *we recommend that you use HTTP permanent redirects if possible,
such as `301` and `308`* ». Utile ici parce que Lovable Cloud sert du **308** et
non du 301 sur les trois variantes de l'ancien domaine : **le 308 n'est pas un
pis-aller, c'est une des deux formes recommandées.** Ne pas perdre de temps à
chercher à le convertir en 301.
Même doc, sur l'outil **Changement d'adresse** : « *You only need this tool when
moving from one domain or subdomain to another* » et elle exige que les variantes
soient **validées dans la Search Console**.
⚠️ **Erreur de raisonnement évitée de justesse, à ne pas refaire** : j'ai d'abord
supposé que la doc conditionnait cet outil à un contenu déjà indexé, et j'allais
l'écrire comme un fait sourcé. **La doc ne dit pas ça.** Ce qui est vrai ici,
c'est que *dans ce cas précis* l'outil n'a rien à transférer, puisque rien n'a
jamais été indexé — c'est une conclusion tirée de nos mesures, pas une règle
Google. **Vérifier la source avant d'attribuer à Google une règle qui arrange.**

### 30/09/2026 — ⚙️ Trois référentiels publics géolocalisés lisibles depuis le runner, l'index des stations Météo-France enfin trouvé, et un extrait de moteur qui se trompe sur un chiffre

**1. ⚙️ FILON — trois référentiels publics de géodonnées répondent depuis le
runner, et ils donnent de la donnée locale que personne dans le BTP ne publie.**
C'est l'acquis le plus réutilisable du jour : il ouvre un type de contenu entier
(le géographique) qui était jusqu'ici jugé infaisable honnêtement.
- **`geo.api.gouv.fr/communes`** (API Découpage administratif, données
  INSEE/IGN). Champs utiles :
  `?nom=<commune>&fields=nom,code,codeDepartement,population,centre,surface`.
  Rend le **code INSEE**, la **population**, la **surface** et le **point central**
  de la commune. Recherche par `nom` (attention : rend les homonymes, utile) ou
  par `codePostal` (rend les 33 communes du 39300, par exemple).
- **`data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json?lon=…&lat=…&resource=ign_rge_alti_wld&zonly=true`**
  → **altitude réelle IGN RGE ALTI** en un appel, réponse
  `{"elevations": [530.42]}`. Aucune clé, aucune inscription.
- **Distance orthodromique** calculée en local (formule de haversine, R =
  6 371,0088 km). **Toujours l'annoncer comme « à vol d'oiseau »** : ce n'est pas
  une distance routière, et en moyenne montagne l'écart est important.
⚠️ **Trois pièges rencontrés, tous coûteux :**
- **Le proxy sortant coupe ces APIs de façon intermittente**
  (`ws_closed_mid_exchange`, `Connection reset by peer`) : 4 appels sur 6 ont
  échoué au premier essai. **Toujours envelopper dans une boucle de reprise
  avec attente croissante** — un script Python de 5 lignes a tout récupéré là où
  une boucle `curl` en shell perdait la moitié des résultats silencieusement.
- **L'altitude rendue est celle du POINT INTERROGÉ**, pas celle « de la ville ».
  Interroger le point central d'une commune étalée donne une valeur qui peut
  s'écarter de dizaines de mètres de l'altitude usuellement citée. **Le dire
  dans le texte publié** — c'est ce qui a été fait — plutôt que de laisser croire
  à une précision qu'on n'a pas.
- **Les homonymes sont réels et piègent** : `?nom=Cize` rend **Cize 39153**
  (Jura, 797 hab, 549 m) **et Cize 01106** (Ain, 168 hab, 324 m), à 68 km l'une
  de l'autre. Le code INSEE est le seul identifiant sûr — pas le nom, pas le
  code postal.

**2. ⚙️ RECETTE — trouver l'indicatif d'une station Météo-France, ce que le
17/09 avait laissé en suspens.** Le 17/09 a établi que les fiches
`FICHECLIM_<indicatif>.pdf` sont lisibles sur
`object.files.data.gouv.fr/meteofrance/data/synchro_ftp/REF_STATION/`, mais pas
comment **trouver l'indicatif**. Deux acquis aujourd'hui :
- ❌ **L'indicatif n'est PAS « code INSEE + 00N ».** Huit essais construits sur
  cette hypothèse (`39300001`, `01053001`, `39478001`…) ont tous renvoyé **404**.
  Champagnole `39097003` coïncide avec son code INSEE **par hasard**. Ne pas
  perdre de temps à deviner.
- ✅ **Ce qui marche : `WebSearch` sur `FICHECLIM <ville> indicatif station`** —
  le premier résultat donne l'URL exacte, donc l'indicatif. C'est ainsi que
  **Lons-le-Saunier = 39362001** a été trouvé (station située sur la commune de
  **Montmorot**, code INSEE 39362 — ce qui explique définitivement pourquoi la
  déduction depuis le code INSEE de la ville ne peut pas marcher).
- ✅ **Le bucket S3 se liste**, ce qui donne un index complet si besoin :
  `object.files.data.gouv.fr/meteofrance/?list-type=2&prefix=data/synchro_ftp/REF_STATION/&max-keys=40`
  (pagination par `NextContinuationToken`). **Le dossier lui-même renvoie
  `NoSuchKey`** : c'est la forme `?list-type=2&prefix=` qu'il faut, pas l'URL du
  répertoire.
- **Reconnaître une fiche absente : 404 avec un corps de 431 octets.** Comparer
  la **taille** (une vraie fiche pèse ~120 ko), pas seulement le code, comme le
  17/09 l'avait déjà noté pour une autre URL.
- **La recette de lecture du PDF du 17/09 fonctionne telle quelle**, y compris
  le regroupement par ordonnée `y`. Le recoupement annuel/somme des douze mois a
  de nouveau servi : les précipitations tombent **exactement** juste sur les deux
  stations (1 573,2 et 1 147,4), et **la ligne `Tn ≤ -5 °C` de Lons-le-Saunier
  est fusionnée avec un autre tableau et amputée d'un mois → écartée, non
  publiée.** Les lignes propres l'ont été.

**3. 📚 LEÇON — un extrait de moteur peut se tromper sur un CHIFFRE, pas
seulement être périmé.** Le 13/09 avait appris qu'un extrait pouvait avoir des
mois de retard. Aujourd'hui, pire : l'extrait `WebSearch` sur la fiche de
Lons-le-Saunier annonçait *« average maximum 16 °C, average 7,7 °C »*. La fiche
primaire, lue et recoupée, donne **max 16,0 °C, moyenne 11,8 °C, minimale
7,7 °C** — l'extrait avait **pris la température minimale pour la moyenne**. Le
chiffre existait bien dans la source, mais sous une autre étiquette.
**C'est ce qui aurait été publié si la fiche n'avait pas été ouverte.** Contrôle
qui l'a attrapé en deux secondes et qu'il faut systématiser : **la moyenne doit
tomber entre le min et le max** — ici (7,7 + 16,0) / 2 = 11,85 ≈ 11,8 ✓.
**Règle : tout chiffre relevé dans un extrait doit être recoupé par une
cohérence interne, pas seulement par sa présence dans la source.**

### 29/09/2026 — ⚙️ Trois acquis : lire Légifrance à coup sûr, forcer le verbatim français de WebFetch, et un gisement de sources entier resté inexploité

**1. ⚙️ RECETTE — atteindre un article de Légifrance à coup sûr, en deux
appels.** Le point qui a coûté le plus de temps aujourd'hui, à ne pas
re-découvrir. Trois formes d'URL existent et **elles ne se valent pas** :
- `legifrance.gouv.fr/codes/article_lc/LEGIARTI…` → **marche**, c'est la seule
  fiable pour un article de code. Mais l'identifiant `LEGIARTI` n'est pas
  devinable, et **un identifiant inventé renvoie un 404 franc** (essayé, perdu).
- `legifrance.gouv.fr/loda/id/JORFTEXT…` → marche pour un texte non codifié
  (arrêté, décret) **si l'identifiant est le bon**. Avec un mauvais
  `JORFTEXT`, la page répond 200 mais **ne sert que la navigation du site** —
  le piège est là : on croit avoir lu le texte alors qu'on n'a lu qu'un menu.
  **Symptôme à reconnaître : une réponse qui parle de « navigation and menu
  structure ». Ne jamais citer sur cette base.**
- `legifrance.gouv.fr/codes/section_lc/…` → 404 sur les deux essais du jour.
  Ne pas insister.
**La recette qui marche : `WebSearch` avec
`allowed_domains: ["legifrance.gouv.fr", "www.legifrance.gouv.fr"]` et le
numéro d'article en clair** (`"L216-1" code de la consommation …`) → le
premier résultat donne l'URL `article_lc` exacte → `WebFetch` dessus pour le
verbatim. Deux appels, zéro devinette. **Trois articles obtenus ainsi
aujourd'hui.**

**2. ⚙️ `WebFetch` répond parfois en ANGLAIS et paraphrase — il faut le forcer,
et le contrôler.** Sur la fiche service-public.gouv.fr F31144, le premier appel
a rendu un résumé **en anglais** (« Masonry, HVAC, chimney sweeping… »,
« Quotes are typically free ») là où il fallait des citations françaises
exactes pour les publier. **Deux correctifs qui ont fonctionné, à appliquer
d'emblée la prochaine fois :** ajouter **`?lang=fr`** à l'URL
service-public.gouv.fr, et écrire **« Recopie EN FRANÇAIS et verbatim »** dans
le prompt, en numérotant précisément ce qu'on veut (liste, montants, phrase
exacte, date de « Vérifié le »). Le second appel a rendu la citation exacte
« le devis peut être fait gratuitement ou être payant » et la liste française
complète des mentions. **Règle générale : ne jamais publier une citation
obtenue d'un `WebFetch` qui a répondu dans une autre langue que la source —
c'est une traduction, donc une reformulation, donc pas un verbatim.** C'est le
prolongement direct de la leçon du 13/09 sur les extraits de moteur.

**3. 📚 FILON — le code de la consommation est un gisement entier que le
secteur BTP n'exploite pas.** Tous les runs depuis le 11/09 ont puisé dans le
code civil, le code de l'urbanisme, le code de la voirie routière, les normes
AFNOR, le BOFiP et les fiches service-public. **Le livre II du code de la
consommation (formation et exécution du contrat) n'avait jamais été ouvert**,
et il regorge de règles que le client se pose en vrai et que personne ne
publie : arrhes contre acompte (L214-1, exploité aujourd'hui), délai
d'exécution supplétif et recours (L216-1 et L216-6, exploités aujourd'hui),
information précontractuelle (L111-1), démarchage et rétractation (L221-10 et
L221-18, déjà exploités le 23/09 sur `cour-allee-privee`). **Restent
inexploités et repérés** : la médiation de la consommation (L612-1 — **mais
voir la raison de ne pas la publier, dans « décidé de ne pas faire » du
29/09**), et la garantie légale de conformité appliquée aux prestations de
services. **Avantage particulier de ce code pour le GEO : ses articles sont
courts, se relèvent verbatim, et portent une date de version en vigueur** —
exactement la forme de passage qu'une IA cite.

### 28/09/2026 (veille du lundi) — 📚 Google élague des types de données structurées mais ne recule pas sur le principe (le site est indemne, vérifié), et ⚙️ le BOFiP est lisible depuis le runner : un second filon de sources primaires datées

**1. 📚 Veille : ce qui a changé côté données structurées en 2026, et pourquoi
ça ne nous coûte rien.** Google a supprimé en 2026 le support de plusieurs types
de résultats enrichis — d'après les sources secondaires lues aujourd'hui : en
juin, **Book Actions, Course Info, Claim Review, Estimated Salary, Learning
Video, Special Announcement et Vehicle Listing** ; en juillet, la fin de
**Special Announcement** (héritage du Covid) ; et une note de dépréciation sur
**Practice Problem**, que la presse SEO a lue comme un recul général alors
qu'elle ne visait qu'une fonctionnalité peu utilisée. La position officielle
citée est l'inverse d'un désengagement : Google dit retirer « some features that
aren't being used very often and aren't adding significant value to users ».
**Contrôle négatif fait tout de suite, et c'est lui qui compte** : l'inventaire
des `@type` du dépôt (`grep` sur `src/`) ne contient que **Organization,
LocalBusiness, Service, FAQPage, BreadcrumbList, CollectionPage et ItemList** —
**aucun** des types retirés. **Rien à changer, et rien à re-vérifier avant
longtemps.** *Réserve honnête, à lever un autre jour :* cette liste vient de
sources secondaires (Search Engine Journal du 11/11/2025 et résumés de moteur),
**pas** d'une page de Google. Deux impasses rencontrées : `searchengineland.com`
répond **403 à `WebFetch`** (ne pas réessayer), et
`developers.google.com/search/blog/<année>/<mois>` **n'est pas une URL d'index
valide → 404** (deviner un chemin de billet ne marche pas ; passer par
`developers.google.com/search/updates`).

**2. 📚 Le reste de la veille confirme la stratégie en cours, sans rien ajouter
d'applicable aujourd'hui.** Trois points revenus de plusieurs sources : les
données structurées servent désormais de **signal de fiabilité d'entité** réutilisé
par les réponses génératives (et pas seulement de déclencheur de résultat
enrichi) ; la fiche **Google Business Profile alimente directement les AI
Overviews** sur les requêtes locales — ce qui **renforce encore l'action n°2 du
fichier client** (revendiquer la fiche existante et y déclarer le site) ; et la
« prominence » locale pèse de plus en plus sur l'engagement réel plutôt que sur
les seuls liens. **Aucune de ces trois choses n'est faisable depuis le dépôt** :
elles confirment l'alerte du 20/09 au lieu de la contredire. Ne pas rouvrir de
chantier code au motif qu'il « aiderait l'indexation ».

**3. ⚙️ RECETTE — le BOFiP se lit depuis le runner, et chaque page porte sa date
de version dans son URL.** C'est le second filon de sources primaires après
Légifrance (23/09), et le premier qui couvre la **fiscalité**, sujet dont aucun
concurrent du secteur ne parle honnêtement. Méthode qui a marché du premier coup :
- Chercher par `WebSearch` un **fragment exact** du texte visé + l'identifiant
  `BOI-…`. Les blogs de paysagistes et de fiscalistes paraphrasent — **ne pas les
  citer**.
- L'URL utile a la forme
  `bofip.impots.gouv.fr/bofip/<n>-PGP.html/identifiant=<BOI-…>-<AAAAMMJJ>`.
  **Le suffixe de date est la date de la version**, donc une citation
  vérifiable et datée sans avoir à la deviner. Vérifier qu'on cite bien la
  version la plus récente : plusieurs dates coexistent pour un même identifiant
  (ici 2012, 2014, 2024 pour `BOI-ANNX-000208`, et 2012, 2014, 2024, **2025**
  pour `BOI-TVA-LIQ-30-20-90-30`) — **la plus ancienne sort souvent en tête des
  résultats de recherche.**
- Les **annexes `BOI-ANNX-…`** sont les pages les plus rentables : ce sont des
  tableaux cas par cas (ici « travaux extérieurs et assimilés : cours
  d'immeubles, terrasses, vérandas, espaces verts ») qui **nomment les techniques
  du métier**. Celle du 31/07/2024 écrit littéralement « travaux de revêtement :
  enrobage, dallage et pavage ». Un contenu qui cite ça se distingue
  immédiatement.
**Pourquoi ça vaut pour le GEO** : une réponse qui dit « oui à 10 % dans ce cas,
non à 20 % dans cet autre », avec l'article du CGI, l'identifiant de doctrine et
la date de version, est un passage autonome et vérifiable — le profil exact de ce
qu'une IA reprend. **Filon non épuisé** : le même corpus traite du taux applicable
aux travaux sur locaux professionnels, des attestations, et de la distinction
entretien / amélioration. À réutiliser, en citant toujours la version datée.

**4. ⚙️ Deux pièges d'outillage relevés aujourd'hui, à ne pas re-découvrir.**
- **`scripts/verif-faq.mjs` lancé sans argument ne contrôle que l'accueil**
  (« 6/6 »), ce qui peut laisser croire que tout le site est vérifié. Pour
  couvrir les onze `FAQPage`, **lui passer la liste des URLs**. Le `✓` global sur
  une base ne dit rien des pages profondes.
- **`scripts/mesure-texte-servi.mjs` interroge les 12 URLs à chaque appel** : s'en
  servir pour attendre un déploiement coûte des minutes pour rien. Attendre avec
  un `curl` sur la seule page modifiée (ou sur `/sitemap.xml` pour voir bouger le
  `lastmod`), puis lancer la mesure complète une fois.

### 27/09/2026 — ⚙️ Trois acquis : un `git fetch` qui ment, l'outil pour dater un bloc, et le contrôle négatif obligatoire

**1. 🔴 `git fetch origin <ref-ok> <ref-inexistante>` n'actualise RIEN, et laisse
`origin/main` périmé sans le dire clairement. Le piège le plus coûteux du run.**
Le réflexe n°8 des chantiers en attente est « toujours raisonner sur `origin/main`
après un fetch ». J'ai lancé
`git fetch origin main claude/upbeat-wozniak-9nxawk` — la branche assignée
n'existait pas encore côté distant. Git a répondu
`fatal: couldn't find remote ref claude/…` et **abandonné le fetch en entier** :
`origin/main` est resté sur le commit du 22/09. Conclusion apparente, et fausse :
« les runs du 23 et du 25/09 n'ont jamais atteint `main`, donc n'ont jamais été
déployés ». C'est **la production qui a démenti** : `mesure-texte-servi.mjs`
donnait bien 8 156 caractères sur `preparation-terrassement`, donc le 25/09 était
bien en ligne. Un `git fetch origin main` seul a alors ramené
`a8cee95..6a2b4dc`, et tout est rentré dans l'ordre.
**Règle : ne fetcher qu'une seule réf à la fois, ou vérifier que le fetch est
sorti en 0. Un fetch qui échoue sur une réf ne met à jour aucune des autres.**
**Règle plus générale, et c'est elle qui a sauvé le run : quand git et la
production se contredisent, c'est la production qui a raison** — elle est le
seul état observable, le reste n'est qu'une référence locale.

**2. ⚙️ `git log -L <début>,<fin>:<fichier>` date un BLOC, pas un fichier — c'est
l'outil qu'il manquait sur ce dépôt.** Six pages service vivent dans un seul
`services.$slug.tsx`, quatre dossiers dans un seul `realisations.$slug.tsx` :
`git log -1 -- <fichier>` y donne la même date pour toutes les pages, ce qui est
faux et inutilisable pour un `lastmod`. `-L` suit une plage de lignes à travers
l'historique en corrigeant les décalages, et rend le dernier commit ayant
réellement touché **ce bloc-là**. Les dix dates obtenues concordent avec les
dates affichées par les pages.
**Précaution vérifiée aujourd'hui, à reprendre :** un résultat surprenant se
contrôle en lisant le patch. `-L` datait `enrobe-a-chaud` du 12/09 alors que son
bloc a été écrit le 11/09 ; le patch de `eaef5d4` montre qu'il y a bien ajouté le
`heading` et le `lead` de ce bloc. **La date était juste, le doute a été levé en
trois lignes de `git show`, pas en supposant un effet de bord.**

**3. ⚙️ Un vérificateur qui n'a jamais échoué ne prouve rien : le faire échouer
exprès, une fois, avant de lui faire confiance.** Ce journal a déjà payé deux
fois pour l'avoir oublié (la métrique d'occurrences du 07/09, le SERP Bing vide
du 09/09 qui rendait « absent » pour tout). Occasion gratuite aujourd'hui :
`verif-lastmod.mjs` a été lancé sur la production **avant** le déploiement, où les
pages affichaient des dates sans qu'aucun `lastmod` n'existe. Il est sorti en
**✗ 10/12, code 1**, en nommant chaque page — donc il détecte réellement une
divergence. Puis ✓ 12/12 en local, ✓ 12/12 en production après déploiement.
**À systématiser : tout script de contrôle neuf se qualifie sur un cas faux connu
avant de servir de feu vert.**

### 25/09/2026 — ⚙️ Trois acquis opérationnels : la branche qui déploie, les normes récemment révisées, et une hypothèse juridique tuée net

**1. ⚠️ SEULE `main` DÉPLOIE. Le point le plus coûteux du run, à ne pas
re-découvrir.** L'environnement d'exécution assigne une branche de travail
(`claude/upbeat-wozniak-1f20t3`) et demande d'y pousser. **Pousser là n'a aucun
effet sur la production** : le commit a été poussé sur cette branche, puis la
production a été interrogée **huit fois sur six minutes** et servait toujours
l'ancienne page. Ce n'est qu'après un `git push origin main` (en avance rapide,
la branche n'étant que `main` + 1 commit) que le déploiement est parti, visible
en production **moins de 45 secondes plus tard**.
**Règle à appliquer telle quelle au prochain run : le chantier n'est terminé que
lorsque le commit est sur `main` et que `mesure-texte-servi.mjs` le confirme en
production.** La consigne de maintenance le dit déjà (« Commit direct sur
main »), c'est l'environnement qui suggère autre chose.
**Piège associé, rencontré le même jour :** `git log --oneline main..<branche>`
a d'abord fait croire que quatre commits des runs précédents manquaient sur
`main`. **C'était la réf locale `main` qui était périmée**, pas la branche
distante : après `git fetch origin main`, `origin/main` les contenait tous.
**Toujours raisonner sur `origin/main` après un fetch, jamais sur `main` local**
— c'est le point n°8 des chantiers en attente, illustré.

**2. 📚 Norm'Info sert aussi à repérer les normes RÉCEMMENT révisées, et c'est
un filon GEO à part entière.** La fiche Norm'Info ne donne pas que le titre et
le statut : elle donne la **date de publication de la version en vigueur**. Deux
trouvailles du jour, toutes deux inexploitées par la concurrence parce qu'elles
sont trop fraîches pour les contenus recyclés :
- **NF P11-300**, republiée le **22/01/2025** sous un titre nouveau,
  « Terrassements — Classification complémentaire des matériaux de
  terrassement » (et non plus l'intitulé de 1992 sur les remblais et couches de
  forme) ;
- **NF P94-105**, republiée le **15/10/2025**, qui remplace la version d'avril
  2012.
**Ce que ça vaut :** citer une norme **avec la date de sa version en vigueur**
est exactement ce qui fait la différence pour une IA, qui cherche des passages
datés et vérifiables. **À réutiliser : avant d'écrire sur un sujet technique,
chercher l'indice de la norme sur `norminfo.afnor.org` et regarder sa date de
publication — si elle est de moins de deux ans, c'est l'angle du contenu.**
Rappel du 16/09 toujours valable : Norm'Info donne titre, statut et domaine
d'application **gratuitement**, le texte intégral reste payant, et on ne cite
que ce qu'on a lu sur la fiche.

**3. 🔴 L'exemption « terres réutilisées sur leur propre site » n'est PAS à
l'article L541-4-1 du code de l'environnement.** Hypothèse de départ du run,
héritée de la formulation de la directive européenne. **Vérifiée sur Légifrance,
elle est fausse :** l'article exclut du régime des déchets les **sols non
excavés** (y compris pollués), les sédiments déplacés dans les eaux de surface,
les effluents gazeux, le CO₂ stocké, les matières agricoles et sylvicoles
naturelles, les matières radioactives, les sous-produits animaux, les explosifs
déclassés et les matières premières pour aliments animaux — **pas les terres
excavées réutilisées sur place**. Le texte français qui traite réellement du
sujet est l'**arrêté du 4 juin 2021**, qui fixe cinq critères cumulatifs de
sortie du statut de déchet (article 2). **Ne pas rouvrir cette piste sans un
texte français qui la porte noir sur blanc** — et, plus généralement, **ne
jamais transposer une formulation de directive européenne dans un contenu
français sans vérifier l'article de transposition.**

### 23/09/2026 — ⚙️ Deux acquis réutilisables : un outil de contrôle enfin versionné, et un filon de sources juridiques gratuit et inépuisable

**1. Ne jamais croire le journal quand il dit qu'un outil « existe ».** Le
journal citait `verif-faq.mjs` comme un instrument disponible depuis le 11/09.
**Il n'a jamais été dans le dépôt** — `find . -name "verif-faq*"` ne renvoie
rien au 23/09. Chaque run le réécrivait de mémoire, avec des règles différentes,
et c'est très exactement ce qui a produit le faux mismatch du 22/09. Il est
maintenant versionné dans `scripts/verif-faq.mjs`, avec la règle du 22/09 figée
dedans (décodage des entités des deux côtés) et la documentation de la raison
d'être en tête de fichier. **Règle générale à en tirer : un outil qui n'est pas
committé n'existe pas. Si un run le réécrit, il doit le versionner, pas le
jeter.** Le même reproche vaut potentiellement pour d'autres « outils »
mentionnés dans ce journal — vérifier par `ls scripts/` avant de compter dessus.

**2. Légifrance est lisible depuis le runner, et c'est le filon le plus riche
trouvé jusqu'ici.** Après des semaines d'impasses sur les normes AFNOR (contenu
payant) et les catalogues SETRA (introuvables), le constat du jour est net :
**`legifrance.gouv.fr/codes/article_lc/<LEGIARTI…>` se lit sans difficulté et
rend le texte verbatim d'un article, avec sa date d'entrée en vigueur.** Cinq
articles ont été relevés mot pour mot en une session (L113-2 et R\*116-2 du code
de la voirie routière, L221-10 du code de la consommation, 697 et 698 du code
civil). **Méthode qui marche, à réutiliser telle quelle :**
- L'identifiant `LEGIARTI…` se trouve par `WebSearch` en citant un fragment
  exact du texte recherché entre guillemets. Chercher le numéro d'article seul
  ramène surtout des blogs juridiques — **ne pas les citer, ils paraphrasent**.
- ⚠️ **Un même numéro d'article peut correspondre à plusieurs `LEGIARTI…`** :
  l'ancien, abrogé, et celui en vigueur. C'est arrivé aujourd'hui sur L221-10
  (`LEGIARTI000006292359` est l'ancien, abrogé au 01/07/2016 ;
  `LEGIARTI000032226864` est celui en vigueur). **Toujours demander explicitement
  l'état de l'article dans le prompt de `WebFetch` et refuser un texte dont le
  contenu ne correspond pas au numéro annoncé.**
- Une URL `codes/section_lc/…` rend plusieurs articles d'un coup — pratique pour
  une section courte (697 à 702 ici).
- ⚠️ **`service-public.fr` redirige en 301 vers `service-public.gouv.fr`** :
  utiliser directement le nouveau domaine, et `entreprendre.service-public.gouv.fr`
  pour les fiches « côté entreprise ». Les anciens identifiants de fiche (F…)
  restent valables.

**Pourquoi ça compte pour le GEO et pas seulement pour le SEO :** un bloc qui
cite un article de code mot pour mot, avec sa date d'entrée en vigueur et le
montant exact d'une amende, est un passage **autonome et vérifiable**. C'est le
profil de contenu que les LLM reprennent, et c'est ce que les concurrents
directs (vus dans les SERP de la phrase-test depuis le 11/09) ne publient
jamais : ils décrivent leurs prestations, pas le droit qui s'y applique.

**3. Le chantier du jour confirme que l'infrastructure `REAL_SAVOIR` tient.**
Deuxième dossier enrichi, **zéro ligne de code hors du tableau de données**. Le
prochain run peut traiter `preparation-terrassement` sans rouvrir la mécanique :
il n'y a qu'à écrire cinq Q/R et cinq sources.

### 22/09/2026 (veille du lundi) — 📚 Google ne « déroule » plus les entités HTML dans le JSON-LD, et le site est indemne (vérifié, ne pas refaire avant longtemps)

**1. Le changement de veille le plus concret depuis l'ouverture du journal :
depuis le 21/08/2026, Google n'applique plus qu'une seule passe de
dé-échappement HTML sur le JSON-LD.**
Jusque-là, le parser de Google était indulgent : face à une entité doublement
échappée à l'intérieur d'un `<script type="application/ld+json">` (typiquement
`&amp;amp;` ou `&amp;#39;`), il continuait à dérouler jusqu'à retomber sur un
caractère normal. **Cette indulgence est terminée** : une seule passe, puis le
JSON est lu tel quel. Google justifie le changement par l'alignement sur le
standard JSON. **Ce n'est pas un sujet de classement, c'est un sujet
d'exactitude des données et de résultats enrichis** : un JSON-LD correctement
échappé n'est pas affecté du tout.
**Précision de méthode importante** : le changement a été annoncé sur LinkedIn
et **ne figure pas au changelog de `developers.google.com/search/updates`** — ce
changelog a été lu ce jour (entrées de juillet à septembre 2026 : favicons le
28/08, sources préférées le 20/08, badge de profil de recherche le 16/09,
unités agrégateur/fournisseur le 18/09…) et il n'en dit rien. Ne pas conclure
d'une absence au changelog qu'un changement n'existe pas.

**2. Audit fait, résultat NÉGATIF — le site est indemne. Ne pas rouvrir le sujet
sans raison.**
Un extracteur (`audit-jsonld.mjs`, scratchpad) a lu le HTML servi de six URLs
vues comme Googlebot et compté les entités HTML **dans le bloc JSON-LD brut** :

| URL | Blocs JSON-LD | Entités HTML | JSON |
|---|---|---|---|
| accueil | 3 (`Organization`, `LocalBusiness`, `FAQPage`) | **0** | valide |
| `/services/enrobe-a-chaud` | 4 | **0** | valide |
| `/services/finitions-soignees` | 4 | **0** | valide |
| `/services/bordures-murets` | 4 | **0** | valide |
| `/realisations` | 4 | **0** | valide |
| `/realisations/cour-allee-privee` | 2 | **0** | valide |

**Zéro entité, JSON valide partout.** Raison de fond : le JSON-LD de ce site est
produit par `JSON.stringify` et injecté via le `scripts:` de `head()` de
TanStack Router, qui ne passe pas le contenu par l'échappement de texte HTML de
React. Le contrôle a été **ajouté à `verif-faq.mjs`** pour qu'il tourne
désormais à chaque chantier, sans coût.

**3. Corollaire utile découvert au passage : le texte *visible* du site, lui,
EST échappé en entités** (`l&#x27;œil`, etc.), alors que le JSON-LD ne l'est
pas. C'est exactement le comportement correct, mais **c'est un piège pour tout
script qui compare les deux** — voir « Erreurs commises et corrigées » du jour.

**4. Le reste de la veille n'a rien donné d'exploitable.** Les recherches sur
« AI Overviews septembre 2026 » remontent presque exclusivement des blogs
d'agences qui se recopient (taux d'apparition des AI Overviews « 47-64 % des
requêtes », « 2,5× plus de chances d'être cité avec du schema », « +40 %
d'apparitions avec un schema Tier 1 » : aucun de ces chiffres n'est traçable
jusqu'à une source primaire, **ne pas les reprendre**). Les seules sources
primaires lues aujourd'hui sont le changelog Google ci-dessus et les quatre
sources métier du chantier. **Enseignement de méthode : sur ce sujet, partir du
changelog officiel plutôt que d'une requête généraliste — le rendement est bien
meilleur.**

### 21/09/2026 (veille du lundi) — 📚 Une fiche Google existe déjà pour HCE, et l'état de l'art confirme que le hors-site pèse bien plus que le site

**1. Découverte la plus actionnable du jour : la fiche Google existe déjà.**
En mesurant la visibilité, l'annuaire PagesJaunes « enrobé à chaud – Jura »
(`pagesjaunes.fr/annuaire/departement/jura-39/enrobe-a-chaud`, page **lisible**
depuis le runner, contrairement aux `/pros/` en 403) affiche pour « H.C.E
Aménagement de Cours en Enrobés » à Cize une **note Google de 4,5/5 sur 16 avis**.
Une note Google ne s'affiche que si un établissement Google Maps / Business
Profile existe. **Conclusion : la fiche n'est pas à créer, elle est à
revendiquer.** C'est un meilleur levier qu'une création (16 avis = de l'autorité
déjà accumulée), et il ne lui manque probablement que le champ Site web pointant
`https://www.hcebtp.com`. Corrigé dans `ACTIONS-SEO-CLIENT.md` (Action 2) et dans
« Erreurs commises et corrigées ». **Limite à connaître** : la note vient d'un
extrait d'annuaire, pas d'un accès direct à la fiche (Google Maps non ouvrable
proprement depuis le runner) ; le fait que la fiche existe est solide (double
lecture, WebSearch + WebFetch), son statut exact (revendiquée ou non) reste à
confirmer par le client quand il y accédera.

**2. État de l'art AI Overviews & recherche locale (septembre 2026), sources
sérieuses et datées :**
- **Search Engine Journal / étude Whitespark** : les AI Overviews apparaissent
  sur **68 % des requêtes locales** (vs 39 % pour le pack local classique). Une
  entreprise peut être 1re du pack local et **absente de l'AI Overview** pour la
  même requête : ce sont deux systèmes distincts.
  (`searchenginejournal.com/ai-overviews-now-answer-most-local-searches-how-to-get-your-business-cited/580757/`)
- **Analyse Omniscient Digital (23 000+ citations)** : le contenu du site propre
  ne pèse que **23 %** des citations ; **77 % viennent du hors-site**. → confirme
  frontalement le verdict du 20/09 : *ce qui manque à hcebtp.com est hors du
  dépôt* (fiche Google, annuaires, liens entrants), pas un chantier de contenu.
- **Ahrefs (17 M de citations IA)** : le contenu cité est en moyenne **25,7 %
  plus frais** que le contenu classiquement bien classé. → le « Dernière mise à
  jour » visible et honnête reste payant ; ne l'actualiser que sur vrai changement.
- **Placement dans la page** : ~**44 %** des citations viennent des premiers 30 %
  de la page. → pour un bloc `savoir`, garder la réponse autonome **en tête** du
  H3 (déjà la règle) et ne pas enterrer les Q/R trop bas dans la page.
**Applicable ici** : rien de neuf à coder aujourd'hui, mais deux confirmations
fortes — (a) le hors-site est le vrai levier, donc continuer à pousser le client
vers la fiche Google et les annuaires ; (b) la fraîcheur et la structure
réponse-en-tête, déjà appliquées, sont les bons réflexes GEO.

### 20/09/2026 — ⚙️ Deux acquis réutilisables : une route neuve dans ce routeur, et une source décennale qui parle enfin de voirie

**1. Créer une route statique dans ce projet : la convention exacte.**
Le routage est **à plat** (`src/routes/realisations.$slug.tsx` → `/realisations/$slug`),
sans fichier de layout parent. Pour ajouter `/realisations` :
- **nommer le fichier `realisations.index.tsx`**, jamais `realisations.tsx` —
  ce dernier deviendrait le *parent* de `realisations.$slug` et exigerait un
  `<Outlet/>`, donc casserait les pages dossier ;
- déclarer `createFileRoute("/realisations/")` (avec la barre finale, c'est
  l'`id` que génère le plugin), mais **lier avec `to="/realisations"`** — le
  routeur expose les deux et `tsc` valide ;
- **`src/routeTree.gen.ts` est versionné et régénéré par le build.** Il faut
  donc lancer le build au banc d'essai **et recopier le fichier généré dans le
  dépôt**, sinon le commit contient une route que l'arbre ne connaît pas.
- Contrôle : l'URL sans barre finale répond bien **200** en direct, pas 301.

**2. La garantie décennale couvre nommément la voirie — c'est publiable et
sourçable.** Fiche `service-public.gouv.fr/particuliers/vosdroits/F2034`,
« Garantie décennale des constructeurs », **vérifiée le 10 avril 2026**,
**lisible intégralement depuis le runner en HTTP 200** (curl avec UA Googlebot,
~118 ko). Elle liste explicitement parmi les ouvrages couverts : *ouvrages de
viabilité (réseaux, assainissement)*, *voirie (chemin d'accès)*, *ouvrages avec
fondations*. Elle donne aussi le point de départ du délai (*le lendemain de la
signature du procès-verbal de réception*), l'obligation de joindre l'attestation
d'assurance *au devis et à la facture*, la restriction *seuls les travaux
déclarés dans le contrat sont couverts*, et la sanction (*6 mois
d'emprisonnement et 75 000 € d'amende*, article L243-3 du Code des assurances).
**Pourquoi c'est rentable ici** : le site affiche « garantie décennale » sur
presque chaque page depuis toujours, sans jamais dire ce qu'elle couvre. Les
concurrents font pareil. Un passage qui répond *« oui, une cour et un parking
sont couverts, et voici le texte qui le dit »* est autonome, daté, sourcé — le
profil exact de ce qu'une IA cite.
**Attention en le réutilisant** : ne pas écrire que l'attestation d'HCE est
jointe à ses devis. C'est ce que la **loi** impose au professionnel ; nous
n'avons pas vérifié la pratique de l'entreprise. La page dit « HCE intervient
sous garantie décennale », ce qui reprend le contenu figé du site, et rien de plus.

**3. Ne pas inventer de nœud `@id` dans le JSON-LD.** Première rédaction du hub :
`isPartOf: { "@id": ".../#website" }`. **Ce nœud n'existe nulle part sur le
site** — les seuls `@id` publiés sont `#business` (`Organization` à la racine,
`LocalBusiness` sur l'accueil). Une référence vers un `@id` fantôme est un
pointeur mort. Corrigé en `publisher: { "@id": ".../#business" }` avant commit.
**Règle : avant d'écrire un `@id` dans un nouveau bloc, `grep '"@id"' src/routes/`.**

### 17/09/2026 — 📚 Les fiches climatologiques Météo-France sont lisibles, et le « piège PDF » n'est pas une fatalité

**C'est l'acquis le plus réutilisable du run, et il contredit une règle écrite
ici les 11, 12 et 16/09** (« WebFetch n'extrait rien d'un PDF, ne pas insister »).
La règle est vraie de `WebFetch`. Elle est **fausse du PDF lui-même** : beaucoup
de PDF administratifs français ont des flux de contenu **non compressés**, et
leur texte se reconstruit en quelques lignes de Python sans aucune dépendance
(`pdftotext` n'est pas installé sur le runner).

**La recette qui a marché**, à réutiliser telle quelle :

```python
import re
d = open('fiche.pdf','rb').read().decode('latin-1')
items, cur = [], (0.0, 0.0)
for m in re.finditer(r'1 0 0 1 ([-\d.]+) ([-\d.]+) cm|BT\s(.*?)ET', d, re.S):
    if m.group(3) is not None:                 # un bloc de texte
        s = ''.join(re.findall(r'\((?:\\.|[^()])*\)', m.group(3)))
        s = re.sub(r'[()]', '', s).strip()
        if s: items.append((cur[1], cur[0], s))   # (y, x, texte)
    else:
        cur = (float(m.group(1)), float(m.group(2)))   # position courante
rows = {}
for y, x, s in items: rows.setdefault(round(y), []).append((x, s))
for y in sorted(rows, reverse=True):
    print(round(y), '|', ' '.join(s for x, s in sorted(rows[y])))
```

**Le point clé, c'est le regroupement par ordonnée `y`** : un tableau de PDF est
une suite de cellules indépendantes, et sans ce regroupement on obtient une
bouillie de nombres sans étiquette. Avec, chaque ligne du tableau se relit
telle quelle. Deux pièges rencontrés :
- **Une image en ASCII85 au début du fichier** produit du faux texte entre
  parenthèses. Filtrer sur `BT … ET` (et non sur `(…)`) l'élimine.
- **Deux tableaux à la même hauteur fusionnent** (ici « rafales ≥ 16 m/s » et
  « Tx ≤ 0 °C » : une ligne sur deux appartient à l'autre tableau). **Recouper
  systématiquement chaque valeur annuelle par la somme des douze mois** : quand
  la somme tombe juste, la ligne est bien démêlée ; sinon, le chiffre ne se
  publie pas. C'est ce recoupement qui a validé 111,7 / 35,2 / 10,0 et écarté
  le « jours sans dégel ».

**Où sont ces fiches.** `donneespubliques.meteofrance.fr/FichesClim/…` redirige
vers « donnée indisponible » (piège : le `curl` renvoie **200** sur une page
d'erreur de 346 octets — toujours vérifier la TAILLE, pas seulement le code).
L'URL qui marche est sur data.gouv.fr :
`https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/REF_STATION/FICHECLIM_<indicatif>.pdf`
— ici `39097003` pour Champagnole. **Comment trouver l'indicatif de la station
la plus proche d'une commune** : l'article Wikipédia de la commune (section
Climat) le donne en référence, avec la distance à vol d'oiseau. Wikipédia sert
ici d'**index vers la source primaire**, il n'est pas cité comme source.

**Ce que la fiche contient et que personne ne publie côté concurrence** : pour
la station de Champagnole (indicatif 39097003, alt. 537 m, normales 1991-2020,
fiche éditée le 06/06/2026) — moyennes mensuelles et annuelles de température
max / moyenne / min, hauteur de précipitations, **nombre moyen de jours avec
Tn ≤ 0 °C / ≤ -5 °C / ≤ -10 °C et Tx ≥ 25 °C / ≥ 30 °C**, degrés-jours unifiés,
vent, et les records avec leur date. **C'est de la donnée métier locale
directement exploitable** : gel pour le béton et la maçonnerie, chaleur pour la
pose d'enrobé, pluie pour le drainage. **Chaque page de fond du site peut y
puiser un chiffre qui lui est propre** — à faire, sans jamais réutiliser deux
fois le même.

### 16/09/2026 — 📚 `norminfo.afnor.org` : les normes AFNOR sont citables gratuitement

**C'est la trouvaille la plus réutilisable du run, et elle lève un blocage posé
le 11/09.** Le journal notait alors : « les normes AFNOR sont payantes (…) donc
on ne publie pas d'épaisseur ». C'est vrai du **texte** des normes, mais pas de
leur **fiche descriptive** : `norminfo.afnor.org` est la base publique et
gratuite de l'AFNOR, et chaque fiche donne, en HTTP 200 et lisible par
`WebFetch` :
- le **titre officiel exact** de la norme,
- son **domaine d'application** détaillé (souvent la liste des usages couverts),
- sa **date d'homologation ou de publication**, son **statut** et la date de
  **réexamen systématique** prévue,
- ce que la norme déclare définir (marquage du produit, évaluation de conformité).

**Ce que ça autorise et ce que ça n'autorise pas.** On peut citer une référence
de norme, sa date, son périmètre et les fonctions qu'elle énumère — c'est déjà
une autorité que les concurrents ne mobilisent pas. On ne peut toujours **pas**
en tirer une valeur chiffrée d'essai (épaisseur, classe de gel/dégel, résistance)
puisque le texte reste payant. **La règle du 11/09 tient donc pour les chiffres,
elle tombe pour les références.**

Normes utilisées le 16/09, fiches vérifiées en 200 :
`NF EN 1338` (pavés béton, homologuée 05/02/2004) · `NF EN 1339` (dalles béton) ·
`NF EN 1340` (bordures et caniveaux béton) · `NF EN 1342` (pavés de pierre
naturelle, publiée 16/02/2013). URL de la forme
`norminfo.afnor.org/norme/<ref>/<slug>/<id>` — les retrouver par `WebSearch` avec
`allowed_domains: ["norminfo.afnor.org"]`, qui fonctionne très bien.

**Astuce de contenu qui en découle** : le domaine d'application d'une norme
contient souvent un argument métier tout fait. `NF EN 1340` énumère les fonctions
d'une bordure — séparation, délimitation, drainage, **butée** — ce qui donne une
justification sourcée du rôle structurel d'une bordure en rive d'enrobé. Chercher
systématiquement ce genre de phrase dans le périmètre plutôt que dans les valeurs.

**Impasses confirmées le 16/09, ne pas les re-tenter :**
- ❌ **Le référentiel de certification NF « pavés et dalles de voirie » du CERIB**
  (`cerib.com/wp-content/uploads/2016/11/referentiel-nf-paves-voirie.pdf`) se
  télécharge, mais `WebFetch` n'en extrait rien de lisible. C'est le piège PDF
  déjà documenté les 11 et 12/09. **Il contient probablement les classes de
  gel/dégel et les épaisseurs de lit de pose** — c'est la matière qui manque pour
  un contenu « pavage et gel dans le Jura », et elle reste inaccessible.
- ⚠️ **`boutique.afnor.org` sert des fiches en anglais** et pousse à l'achat :
  passer par `norminfo.afnor.org`, qui est en français et plus complet sur les
  dates et le statut.
- ✅ **`service-public.gouv.fr` confirme sa fiabilité** (fiches `F17578` et
  `F17665`, toutes deux « vérifiées le 13 février 2026 »). **Le seuil chiffré
  n'est pas toujours dans la fiche évidente** : la fiche « déclaration préalable »
  liste les aires de stationnement sans donner de seuil, c'est la fiche **permis
  d'aménager** qui porte le « au moins 50 unités ». **Lire les deux fiches d'un
  couple autorisation/dispense avant de conclure.**

### 15/09/2026 — ⚙️ RECETTE : construire le projet et voir le HTML servi, en local, avant de pousser

**À lire avant tout chantier qui touche au rendu. C'est ce qui manquait depuis
l'ouverture du journal**, et ce qui a fait renoncer le run du 14/09 à corriger
l'accueil. La conclusion « le runner ne peut pas construire le projet » venait
d'un `bun install` qui n'aboutit pas. **`bun` échoue, `npm` marche.**

Deux pièges à ne pas re-découvrir :
- **`npm ci` échoue** (`EUSAGE`, `Missing: miniflare@… from lock file`) :
  `package.json` et `package-lock.json` ne sont pas synchrones. Il faut
  `npm install`, qui **réécrit `package-lock.json`** — donc **ne jamais le lancer
  dans le dépôt de travail**, sous peine de committer un lockfile modifié.
  Travailler sur une copie : `git archive HEAD | tar -x -C <dossier de travail>`.
- **`npx vite preview` ne marche pas** : il cherche `dist/server/server.js`,
  alors que le build produit `.vercel/output/`. Ne pas insister.
  **C'est `npx vite dev` qui rend le service** — il fait bien du SSR.

La recette qui a fonctionné (~20 s d'install, ~16 s de build) :

```bash
SP=<scratchpad>; rm -rf $SP/build-test; mkdir -p $SP/build-test
git archive HEAD | tar -x -C $SP/build-test
cd $SP/build-test && npm install --no-audit --no-fund   # PAS npm ci
npm run build                                            # contrôle: doit sortir en 0
npx vite dev --host 127.0.0.1 --port 4175 &              # --host obligatoire (pas d'IPv6 ici)
curl -s --noproxy '*' -A "Mozilla/5.0 (compatible; Googlebot/2.1)" http://127.0.0.1:4175/
```

- **`--host 127.0.0.1` est obligatoire** : sans lui, `listen EAFNOSUPPORT` (pas
  d'IPv6 sur le runner). Et `--noproxy '*'` sur le `curl`, sinon la requête part
  dans le proxy sortant.
- **Le serveur a du HMR** : copier un fichier modifié dans `$SP/build-test/src/`
  suffit à re-mesurer, sans relancer quoi que ce soit. C'est comme ça que
  l'avant / après du jour a été obtenu.
- **Contrôles qui passent tous ici** : `npx tsc --noEmit`, `npx eslint <fichier>`,
  `npx prettier --check <fichier>`.

**Ce que ça change, et qui vaut plus que le chantier du jour :** on peut
désormais mesurer le HTML servi **avant** de pousser. Aujourd'hui le local a
donné **5 340 caractères pour l'accueil d'origine — exactement la valeur de la
production le même jour**, ce qui valide la fidélité du banc d'essai. La règle
« en cas de doute sur un changement touchant au rendu, ne pas le faire » ne doit
donc plus servir d'échappatoire : **le doute se lève par la mesure**. Elle reste
valable pour ce qu'on ne peut pas mesurer (le rendu visuel, faute de navigateur).

### 14/09/2026 (veille du lundi) — Google a publié sa doctrine officielle sur l'IA, et elle contredit plusieurs habitudes du GEO

**C'est la veille la plus importante depuis l'ouverture du journal**, parce
qu'elle remplace des blogs d'agences par une source primaire. Google a publié en
**mai 2026** un guide dédié, tenu à jour depuis :

- **`developers.google.com/search/docs/fundamentals/ai-optimization-guide`**
  — « Optimizing for generative AI features on Google Search ».
  **Dernière mise à jour affichée : 2026-07-10.**
- **`developers.google.com/search/docs/appearance/ai-features`**
  — conditions d'éligibilité aux AI Overviews et à AI Mode.
  **Dernière mise à jour affichée : 2025-12-10.**

**Ce que Google écrit noir sur blanc** (citations relevées sur les pages
elles-mêmes, pas sur des commentaires de presse) :

1. 🔴 **`llms.txt` ne sert à rien pour Google.** « *You don't need to create new
   machine readable files, AI text files, markup, or Markdown to appear in
   Google Search* », et créer ces fichiers « *will neither harm nor help your
   site's visibility or rankings* ». **Conséquence ici : on continue de tenir
   `llms.txt` à jour — la consigne client l'impose, il est gratuit à maintenir
   et il peut servir à d'autres crawlers — mais il ne faut plus jamais le
   compter comme un levier d'indexation ni de visibilité Google.** Le temps
   qu'il coûte doit rester marginal.
2. 🔴 **Aucun balisage schema.org n'est requis** pour les AI Overviews ou AI
   Mode : « *Structured data isn't required for generative AI search, and
   there's no special schema.org markup you need to add* ». Google ajoute
   aussitôt que c'est **quand même une bonne idée** de le maintenir, parce qu'il
   ouvre droit aux **résultats enrichis** de la recherche classique.
   **Conséquence ici : on garde `LocalBusiness`, `Service`, `FAQPage` et
   `BreadcrumbList` — ils restent justifiés — mais on cesse de les présenter
   comme un levier GEO. Leur valeur est SEO classique.**
3. 🔴 **Le découpage en « chunks » et la réécriture « pour les IA » ne servent à
   rien** : « *There's no requirement to break your content into tiny pieces* »,
   « *You don't need to write in a specific way just for generative AI search* ».
   **La règle de la réponse autonome en tête de H2 garde du sens** (elle est
   bonne pour le lecteur, et elle reste documentée côté Perplexity/ChatGPT),
   **mais il ne faut plus la présenter comme une exigence de Google.**
4. ✅ **LE point qui compte pour ce site, et il confirme toute la stratégie
   actuelle** : pour apparaître dans les fonctionnalités d'IA, « *a page must be
   **indexed** and eligible to be shown in Google Search with a snippet* ».
   **L'indexation est donc un préalable absolu au GEO, et non une voie
   parallèle.** Tant que `site:hcebtp.com` ne renvoie rien, **aucun travail GEO
   ne peut rapporter quoi que ce soit** : la priorité « découverte d'abord » du
   journal est validée par la source primaire.
5. ✅ **Pour un commerce local, Google recommande explicitement le *Google
   Business Profile*** comme moyen d'être visible « *in both AI responses and
   other Google Search results* ». **C'est l'action 2 du fichier client, et la
   doc de Google est désormais l'argument à lui opposer s'il hésite.**
6. ✅ Exigences techniques : contenu **crawlable**, et « *JavaScript SEO best
   practices* » pour que le contenu ne soit pas bloqué. **C'est exactement le
   défaut corrigé aujourd'hui** sur les `/realisations/*`.

> ⚠️ **Sources écartées volontairement ce lundi.** La recherche sur « ce qui
> fait citer une entreprise locale par ChatGPT/Perplexity en 2026 » n'a renvoyé
> que des **blogs d'agences** (clairon.ai, locafy, leapd, cheers.tech,
> pleiadesconsultancy, beancount…). Ils avancent des chiffres très précis et
> très flatteurs — « Yelp cité dans 33 % des réponses locales », « mettre
> "2026" dans un titre augmente les citations de 30 % », « 80 % des sources
> citées ne sont pas dans le top 10 Google » — **sans lien vers une étude
> lisible**. Aucun n'a été retenu et **rien n'a été appliqué sur cette base**.
> La consigne « sources sérieuses uniquement » s'applique ici pleinement :
> l'astuce « mettre l'année dans le titre » est typiquement le genre de chose
> qu'on applique par réflexe et qu'on ne peut plus justifier ensuite. À
> re-chercher un lundi où une étude primaire sera disponible.

**Rien à corriger dans le code à la suite de cette veille** : aucune technique
appliquée jusqu'ici sur ce site n'est contredite au point d'être nuisible. Deux
d'entre elles (`llms.txt`, balisage « pour l'IA ») sont simplement **moins
utiles qu'on ne le croyait**, et doivent cesser d'être prioritaires.

### 13/09/2026 — Deux fiches service-public très rentables, et les impasses du jour
Complète la liste du 12/09. **Ne pas re-tester les impasses, elles sont datées.**
- ✅ **`service-public.gouv.fr/particuliers/vosdroits/F2443`** — servitude
  naturelle d'écoulement (articles 640 et 641 du Code civil). Page **« vérifiée le
  29 mai 2026 »**, donc très fraîche. Utilisable pour tout sujet « où part l'eau ».
- ✅ **`entreprendre.service-public.gouv.fr/vosdroits/F38106`** — ombrage et
  gestion des eaux pluviales des **parcs de stationnement** (article L111-19-1 du
  Code de l'urbanisme, mise à jour du 22 juillet 2025). **C'est la source la plus
  utile trouvée jusqu'ici pour le volet professionnel** : elle vise les parkings
  de plus de 500 m² **y compris en rénovation lourde**, donc exactement la requête
  `réfection parking enrobé Jura`. Elle contient aussi un volet ombrage (parkings
  existants de plus de 1 500 m², échéance juillet 2026) **non exploité à ce jour** —
  matière disponible pour un futur contenu destiné aux pros.
- 💡 **Méthode qui a produit ces deux trouvailles** : lancer `WebSearch` avec
  `allowed_domains: ["service-public.gouv.fr", "entreprendre.service-public.gouv.fr"]`.
  Une recherche libre sur le même sujet ne renvoyait que des PDF de préfectures et
  des blogs ; le filtre de domaine fait ressortir directement les fiches. **À
  réutiliser systématiquement pour toute question réglementaire.**
- ❌ **`hal.science` est protégé par un challenge Anubis** : `WebFetch` reçoit une
  page d'erreur « Oh noes! » qui ne ressemble pas à un blocage au premier coup
  d'œil. **Piège** : sans lire le contenu renvoyé, on croit avoir une source.
- ❌ **`meteo.bzh` (miroir des normales Météo-France) répond 200 mais sert un
  tableau entièrement vide** (« -- » dans toutes les cases). Même piège que
  Startpage le 11/09 : code 200 et page de la bonne forme, zéro donnée.
- ❌ **Les normales climatiques Météo-France ne sont disponibles qu'en PDF**
  (`donneespubliques.meteofrance.fr/FichesClim/…`) — piège documenté le 12/09,
  non tenté. **Un chiffre climatique local reste donc non publiable à ce jour.**
- ⚠️ **`ecologie.gouv.fr` : attention aux 301 vers `archive-2017-2022.ecologie.gouv.fr`.**
  Les communiqués anciens y basculent. Une page d'archive reste lisible mais c'est
  une source datée : préférer une fiche service-public à jour quand elle existe.
- **Règle confirmée** : une source lisible mais hors sujet (l'étude Cerema sur deux
  routes des Alpes-Maritimes) ne vaut pas mieux qu'une source absente. Ne pas céder
  à la tentation de citer ce qu'on a réussi à ouvrir.

### 12/09/2026 — Les sources publiques françaises lisibles depuis le runner
Suite directe de la note du 11/09. La leçon du jour : **le droit français en
ligne n'est pas accessible à parts égales**, et il faut viser les bons hôtes.
- ✅ **`entreprendre.service-public.gouv.fr` et `www.service-public.gouv.fr` se
  lisent parfaitement** via `WebFetch` et rendent des fiches précises et datées
  (obligations, délais, validité). **C'est la meilleure source réglementaire
  disponible ici** — autorité maximale, zéro blocage. Attention :
  `service-public.fr` redirige en 301 vers `service-public.gouv.fr`, il faut
  relancer sur l'URL d'arrivée.
- ✅ **`ecologie.gouv.fr` se lit aussi**, et ses pages « politiques publiques »
  donnent décrets, arrêtés et dates de bascule à jour.
- ❌ **Légifrance répond 403** au runner, en `WebFetch` **comme** en curl avec
  UA navigateur. `circulaires.gouv.fr` n'est qu'une redirection 302 vers
  Légifrance : même impasse. **Ne pas réessayer, c'est du temps perdu** — passer
  par la fiche service-public équivalente, qui dit la même chose en clair.
- ❌ **`pagesjaunes.fr`, `pappers.fr`, `verif.com`, `kompass.fr`, `batiment.cc`
  : 403/405.** Liste stable depuis trois runs.
- ⚠️ **Décoder un PDF de préfecture : ne pas s'acharner.** Le PDF de l'Ain se
  télécharge (curl échoue en `000`, mais `WebFetch` le sauve sur disque et
  indique le chemin). En revanche l'extraction est piégeuse : les polices sont
  sous-ensemblées, et **fusionner les tables `ToUnicode` de plusieurs polices
  produit un texte qui ressemble à une substitution cohérente mais qui est
  faux** — j'ai failli lire des seuils réglementaires dans du charabia. Le
  décodage correct exige une table par police (`/F1`, `/F2`…), donc de résoudre
  les `/Font` dans les objets — qui sont ici dans des `ObjStm` compressés.
  **Conclusion : pour une donnée réglementaire, chercher la page HTML
  équivalente sur un site en `.gouv.fr` plutôt que de décoder un PDF.**
- **Règle réaffirmée** : quatre sources secondaires concordantes ne remplacent
  pas une source primaire lue. Le seuil des affouillements n'a donc pas été
  publié (cf. chantier du 12/09). **Suite le 25/09/2026 : la source primaire est
  devenue lisible (Légifrance répond depuis le 23/09) et le seuil a été publié,
  cité mot pour mot. La règle a tenu treize jours et a fini par payer — attendre
  la source primaire n'est pas renoncer, c'est différer.**

### 11/09/2026 — Où trouver de la donnée métier citable sans l'inventer
Le volet GEO réclame « ce que personne d'autre ne publie » : épaisseurs,
températures, normes. Le piège est de recopier des blogs d'agences qui se citent
entre eux. Ce qui a marché aujourd'hui, à réutiliser :
- **Les notes du CFTR / de l'IDRRIM sont en accès libre** (`idrrim.com`,
  `dtrf.cerema.fr`) et font autorité — ce sont les organismes techniques de la
  route. La note CFTR-info n°17 donne la structure des normes enrobés :
  série **NF EN 13108**, **BBSG = partie 1**, **marquage CE obligatoire depuis le
  1er mars 2008**, retrait des anciennes **NF P 98-1xx** à la même date. Recoupé
  par une seconde recherche avant publication.
- **`doc.cerema.fr` renvoie des 503 par intermittence**, mais les mêmes documents
  sont souvent hébergés sur `idrrim.com` — chercher le titre plutôt que s'acharner
  sur l'URL.
- **Lire un PDF sans `pdftotext`** (absent du runner) : décompresser les flux
  `stream…endstream` en zlib avec Python, extraire les chaînes entre parenthèses.
  Sur les PDF à police sous-ensemble, le texte sort **décalé d'un offset constant
  par casse** (ici +46 sur les minuscules) : `chr(ord(c)+46)` suffit à le rendre
  lisible. Assez bon pour vérifier une affirmation, pas pour citer au mot près —
  **les chiffres, eux, ne se décodent pas de façon fiable** (les chiffres sortent
  en séquences d'échappement, j'ai donc recoupé la date de 2008 ailleurs plutôt
  que de la déduire).
- **Les normes AFNOR sont payantes** : NF P 98-130 (épaisseurs de mise en œuvre
  par granularité) n'est pas lisible. **Donc on ne publie pas d'épaisseur.** Une
  donnée métier non vérifiable ne vaut pas mieux qu'une donnée inventée.
- **TotalEnergies** publie une page technique nette sur bitume/asphalte/goudron :
  source industrielle, utilisable pour la distinction goudron (charbon, abandonné
  dans les routes au milieu des années 1980) / bitume (pétrole).

### 07/09/2026 — IndexNow reste pertinent en 2026, y compris pour le GEO
Source : blog Bing Webmaster, *IndexNow Drives Smarter and Faster Content
Discovery* (mai 2025) et *Introducing AI Performance in Bing Webmaster Tools*
(février 2026) ; protocole : indexnow.org/faq.
- Plus de 3,5 milliards d'URLs soumises par jour ; 18 % des nouvelles URLs
  cliquées en recherche web.
- Bing indique explicitement qu'IndexNow sert à ce que **les systèmes d'IA
  référencent la version à jour d'une page** — ce n'est plus seulement un
  mécanisme d'indexation web.
- **Google ne participe pas** au protocole : IndexNow ne remplace jamais la
  Search Console.
- Protocole : clé de 8 à 128 caractères `[a-zA-Z0-9-]`, fichier `<clé>.txt` à la
  racine contenant exactement la clé, POST JSON `{host, key, keyLocation,
  urlList}` sur `https://api.indexnow.org/indexnow`, 10 000 URLs max par requête.
  **HTTP 202 est la réponse normale pour un domaine encore inconnu** : reçu, clé
  en cours de vérification. 422 = clé/domaine incohérents.

### 08/09/2026 — Les identifiants légaux comme clé d'entité (applicable ici)
Pas une nouveauté d'algorithme, mais une technique sous-utilisée pour une TPE
locale, et directement applicable à ce site.
- Un moteur ou un LLM ne « comprend » une entreprise que s'il peut la **résoudre**
  vers une entité connue. Pour une TPE française sans Wikipédia, sans presse et
  sans réseaux sociaux, le **SIREN est le seul identifiant fort disponible** :
  c'est la clé primaire de tous les annuaires légaux, et donc le pivot par lequel
  une IA peut recouper le site et les fiches d'entreprise existantes.
- `identifier` en `PropertyValue` (SIREN, SIRET) est la façon standard de le
  déclarer en schema.org, et `sameAs` relie le site aux fiches externes.
- **L'API `recherche-entreprises.api.gouv.fr` est gratuite, publique, sans clé**
  et renvoie dénomination, forme juridique, adresse, NAF, dirigeants et
  géocodage INSEE. Requête : `?q=<SIREN>` ou `?q=<nom>&code_postal=<cp>`.
  **Elle échoue par intermittence à travers le proxy du runner
  (`ws_closed_mid_exchange`) : prévoir 3-4 tentatives avec pause**, ce n'est pas
  une panne de l'API.
- Le géocodage INSEE de l'établissement est plus précis et bien plus autorisé que
  le centroïde de commune qu'on trouve sur les sites de géographie grand public.
- **Ne jamais publier de numéro de TVA calculé** à partir du SIREN : la clé est
  déterministe, mais l'assujettissement ne se déduit pas.

### 09/09/2026 — Un accordéon citable par une IA : replier en CSS, jamais en démontant
Technique, pas actualité — mais c'est la cause du défaut corrigé aujourd'hui, et
elle se reproduira ailleurs sur ce site comme sur n'importe quel site React.
- **Un contenu monté conditionnellement (`{isOpen && …}`) n'existe pas dans le HTML
  servi.** Il est invisible pour tout ce qui n'exécute pas de JavaScript, ce qui
  inclut la plupart des crawlers d'IA. Sur un accordéon de FAQ — le format le plus
  cité par les IA — c'est la totalité de la valeur du contenu qui disparaît.
- **Le repli correct se fait en CSS, contenu toujours monté** :
  `display: grid` + `grid-template-rows: 1fr | 0fr`, `overflow: hidden`, et
  `min-height: 0` sur l'enfant (sans lui, la ligne ne se replie pas). La
  transition sur `grid-template-rows` anime la hauteur automatique, ce que
  `height: auto` ne sait pas faire.
- **Sur un site rendu côté serveur, préférer une transition CSS à une librairie
  d'animation** pour ce genre de repli : React sérialise le `style` tel quel, donc
  l'état plié est garanti dans le HTML serveur. Avec une librairie, l'état rendu
  au premier passage dépend de sa propre logique SSR — invérifiable ici puisque le
  runner ne peut pas construire le projet.
- **Un contenu replié n'est pas un contenu caché** au sens des règles Google : le
  balisage `FAQPage` reste valide dès lors que l'utilisateur peut le déplier.
  Ce qui est sanctionnable, c'est l'inverse — un balisage sans contenu
  correspondant dans la page.
- **Le runner dispose de Chromium** (`/opt/pw-browsers/chromium-*/chrome-linux/chrome`,
  le module Playwright n'est pas installé mais le binaire suffit) :
  `--headless --screenshot=x.png file://…` permet de **vérifier visuellement** un
  correctif de rendu. Le site en ligne, lui, n'est pas atteignable par ce
  Chromium (TLS du proxy) : capturer une reproduction locale du markup, pas la
  page réelle.

### 07/09/2026 — Ce qui fait citer un contenu par une IA
Convergence de plusieurs guides GEO 2026 (à recouper avec des sources primaires,
la plupart sont des blogs d'agences) :
- Les passages **extraits** font 130 à 170 mots : une « unité sémantique
  autonome ». D'où la règle de la réponse directe et autonome en tête de chaque
  H2 — un passage qui a besoin du contexte des paragraphes précédents n'est pas
  citable.
- Les gains les plus reproductibles viennent de l'**ajout de statistiques** et de
  **sources citées**, pas de la longueur.
- Le `FAQPage` reste le balisage au meilleur rapport effort/résultat.
- Reddit pèse 21 % des citations des AI Overviews et 46,5 % de celles de
  Perplexity. **Non applicable ici** : pas de présence Reddit à fabriquer pour un
  artisan du Jura, et poster soi-même serait exactement le genre de faux signal
  que le client a refusé. Noté pour ne pas y revenir.

---

## 2026-09-17 — Décision client (hors run SEO) : section « Avant / Après » supprimée

- Demande du client : retirer la section « Avant / Après » des réalisations.
- Carte « Avant / Après » retirée de la galerie d'accueil → la carte « Chantier en cours » reprend sa place.
- `/realisations/avant-apres` redirige en **301** vers `/#galerie` (URL déjà soumise via sitemap + IndexNow, pas de 404).
- Retirée du sitemap (11 URLs), de `llms.txt`, de `indexnow-submit.mjs`, de `mesure-texte-servi.mjs` et du bloc « Autres réalisations ».
- **Ne pas la réintroduire** (garde-fou ajouté dans `npm run check:fige`). Les tables `before_after_*` restent en base, non utilisées.
