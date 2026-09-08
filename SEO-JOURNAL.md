# SEO-JOURNAL — hcebtp.com

Mémoire de la maintenance SEO/GEO quotidienne. **Chaque run démarre sans aucun
souvenir : ce fichier est la seule continuité.** À lire en entier avant d'agir,
et à compléter en fin de run.

---

## État des lieux

*Au 08/09/2026.*

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
  `FAQPage` (accueil), `Service` (pages services). Le `FAQPage` correspond bien
  à la FAQ visible — même source `FAQS` dans `src/components/sections.tsx`.
- Le contenu figé par le client est correctement servi : 2012, 14 ans, 150 °C,
  « posé à la main », « Devis détaillé », garantie décennale, pas de section avis.

### NAP canonique — référence, ne pas laisser diverger

Tel que publié dans le pied de page du site, repris à l'identique dans le
`LocalBusiness` et dans `llms.txt` :

```
HCE / HCE SARL · 40 avenue Etienne Lamy, 39300 Cize, France
03 84 52 61 48 · sarl.hce@laposte.net · https://www.hcebtp.com
Lun-Ven 8h-18h · Sam 8h-12h · Créée en 2012
SIREN 521683573 · SIRET siège 52168357300039
```

Attention : **il existe deux communes nommées Cize**, Cize 01250 dans l'Ain et
Cize 39300 dans le Jura. HCE est dans le Jura, coordonnées 46.726 / 5.914.

> Note sur l'hébergement : les consignes de maintenance disent « Lovable Cloud,
> pas Vercel », alors que l'en-tête `server` observé en production dit Vercel.
> Les deux ne sont pas forcément incompatibles (front déployé sur Vercel, backend
> Supabase/edge functions côté Lovable). Ne pas trancher sans le client, et ne
> rien changer au déploiement sur cette base.

### Positions mesurées — 07/09/2026 (métrique erronée, voir 08/09)

| Requête | Bing FR (07/09/2026) | Google |
|---|---|---|
| `enrobé à chaud Jura` | absent | non mesuré |
| `enrobé à chaud Ain` | absent | non mesuré |
| `entreprise travaux publics Jura` | absent | non mesuré |
| `réfection parking enrobé Jura` | absent | non mesuré |
| `terrassement Jura` | absent | non mesuré |
| `goudronnage cour maison Jura` | absent | non mesuré |
| marque `hcebtp` | absent | non mesuré |
| `site:hcebtp.com` | **0 résultat** | non mesuré |

### Positions mesurées — 08/09/2026

| Requête | Bing FR (08/09/2026) | Évolution vs 07/09 |
|---|---|---|
| `enrobé à chaud Jura` | absent | inchangé |
| `enrobé à chaud Ain` | absent | inchangé |
| `entreprise travaux publics Jura` | absent | inchangé |
| `réfection parking enrobé Jura` | absent | inchangé |
| `terrassement Jura` | absent | inchangé |
| `goudronnage cour maison Jura` | absent | inchangé |
| marque `hcebtp` | absent (SERP renvoie du spam sans rapport) | inchangé |
| `site:hcebtp.com` | **0 résultat** | inchangé |

**Toujours aucune indexation au 08/09/2026**, 1 jour après la première
soumission IndexNow. Normal : le délai usuel se compte en jours à semaines, et
IndexNow ne concerne pas Google.

> ⚠️ **Correction de méthode de mesure — important, ne pas retomber dedans.**
> Le journal du 07/09 définissait « absent » comme « zéro occurrence de la chaîne
> `hcebtp` dans le HTML de la SERP ». **Cette métrique est fausse** : la requête
> elle-même est réinjectée par Bing dans le `<title>`, l'`og:url`, le champ de
> recherche et la pagination. Mesuré aujourd'hui, `site:hcebtp.com` donne
> **22 occurrences de `hcebtp` pour zéro résultat réel**, et la requête de marque
> 23 occurrences pour zéro résultat. Le comptage d'occurrences ne dit donc rien
> dès que la requête contient le mot cherché.
> **La bonne métrique : compter les liens de résultat**, c'est-à-dire les
> `href="…hcebtp.com…"` présents dans la SERP. Vérifier en plus que les `<h2>`
> de la page sont bien des résultats pertinents — sur la requête de marque, Bing
> a renvoyé des pages « Kalyan Chart » sans aucun rapport, ce qui est la signature
> d'un index qui ne connaît rien sur le sujet.

« Absent » = zéro lien `hcebtp.com` dans la page de résultats.

**Limite de mesure à connaître** (à ne pas re-découvrir demain) :
- L'outil `WebSearch` est un moteur généraliste US qui **ignore l'opérateur
  `site:`** — il renvoie des pages Wikipédia sans rapport. Ne pas s'en servir
  pour tester l'indexation, ça donne un faux négatif inexploitable.
- **Google est inatteignable depuis le runner** (pas de SERP brute), et
  DuckDuckGo renvoie un captcha.
- **Bing en curl fonctionne** et accepte `&setlang=fr&cc=FR` : c'est la seule
  mesure fiable disponible aujourd'hui. Comme Bing alimente Copilot et la
  recherche web de ChatGPT, c'est aussi la mesure la plus utile côté GEO.
- Le parseur de SERP dans `bingq.py` (scratchpad, non commité) n'a **pas** réussi
  à extraire les domaines concurrents : le sélecteur `li.b_algo` ne correspond
  plus au markup actuel. Le comptage d'occurrences de `hcebtp`, lui, est fiable.
  À refaire proprement pour pouvoir suivre les concurrents.

---

## Chantiers faits

### 07/09/2026 — Découvrabilité du domaine (commit `11aa697`)

Chantier choisi parce que **tout le reste est inutile tant que rien n'est
indexé** : améliorer un contenu que personne ne crawle ne rapporte rien.

1. **Cohérence d'hôte.** L'apex répond 308 vers `www`, mais `canonical`,
   `og:url`, le sitemap, `robots.txt` et les `url` des données structurées
   pointaient tous vers l'apex. Le crawler recevait donc une URL canonique qui
   redirige ailleurs — signal de canonicalisation contradictoire. Tout aligné sur
   `https://www.hcebtp.com`.
2. **Canonical ajouté** sur `/realisations/$slug` et `/realisations/avant-apres`,
   qui n'en avaient aucun alors que les 5 URLs sont dans le sitemap.
3. **IndexNow activé.** Clé publique `public/051b2d7c5dec4c46e59a45f33361b9ff.txt`
   + `scripts/indexnow-submit.mjs` (soumet les 12 URLs du sitemap). Notifie Bing,
   Yandex, Seznam, Naver. Google ne participe pas au protocole.
   **Soumission effectuée le 07/09/2026 après déploiement : les 12 URLs sont
   parties, réponse HTTP 202** (= reçu, clé en cours de vérification — c'est la
   réponse attendue pour un domaine encore inconnu des moteurs). Fichier clé
   vérifié en ligne en 200 avant l'envoi. **C'est le premier signal jamais
   envoyé à un moteur pour ce domaine.** Le relancer après chaque modification
   de contenu : `node scripts/indexnow-submit.mjs`.
4. **`llms.txt` réécrit.** Il contenait trois affirmations en contradiction
   directe avec le site et avec les consignes du client : « depuis 2005 »,
   « devis gratuit sous 48h », « 160°C ». C'est le fichier que lisent les IA :
   il leur servait de fausses informations. Réécrit en mode GEO — réponse directe
   et autonome sous chaque question, questions formulées comme on les pose à voix
   haute, date de mise à jour visible, chiffres du client uniquement, URLs
   absolues.
5. **`ACTIONS-SEO-CLIENT.md`** créé : les 4 leviers de découverte côté Google qui
   ne peuvent pas être actionnés depuis le repo (Search Console, fiche
   d'établissement, cohérence NAP, premiers liens entrants).

**Vérifié en ligne après déploiement** : `canonical` et `og:url` en
`https://www.hcebtp.com/` sur l'accueil, canonical présent sur
`/realisations/cour-allee-privee`, sitemap servi avec 12 URLs en `www`,
`robots.txt` pointant vers le sitemap `www`, fichier clé IndexNow en 200.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas toucher `src/lib/optimizeImage.ts`** malgré son `https://hcebtp.com`
  sans `www` : ce chemin sert les images via wsrv.nl et fonctionne. Gain SEO nul,
  risque d'affichage réel.
- **Ne pas ajouter de `lastmod`** au sitemap : je n'ai pas de date de
  modification honnête par page, et une date inventée ou générée au build est un
  signal faux que les moteurs apprennent à ignorer.
- **Ne pas réécrire les titres des pages `/realisations/*`** aujourd'hui, bien
  que le défaut soit réel : un seul chantier mené à fond vaut mieux que deux à
  moitié. Mis en tête des chantiers en attente.
- **Ne pas ajouter de crawlers IA nommés dans `robots.txt`** : `User-agent: *`
  + `Allow: /` les autorise déjà tous. Les lister n'ajoute rien et crée une
  liste à maintenir.

### 07/09/2026 (2e run) — NAP complet et consolidation de l'entité

**Contexte à connaître avant tout : deux runs ont tourné le même jour.** Le
premier (`11aa697`, 13h23 UTC) a traité la découvrabilité. Ce second run a
démarré en parallèle sans voir son travail, et a d'abord reproduit une partie du
même chantier (réécriture de `llms.txt`, document client sur les citations)
avant de trouver `origin/main` en avance au moment du push. **Le travail
dupliqué a été jeté, pas forcé** : la version `llms.txt` du premier run est
meilleure côté GEO (questions posées à voix haute, réponse autonome sous chaque
titre) et elle a été conservée telle quelle ; le document `CITATIONS-NAP.md` qui
faisait doublon avec `ACTIONS-SEO-CLIENT.md` n'a jamais été commité. Seul ce qui
était réellement nouveau a été gardé.

**Chantier retenu : le NAP**, parce que c'est le point que le premier run avait
explicitement laissé ouvert (chantier en attente n°7, et action 3 du fichier
client) — et parce que son blocage n'existait pas.

1. **L'adresse postale complète était déjà publiée sur le site.**
   `ACTIONS-SEO-CLIENT.md` la donnait comme « non publiée, à confirmer par le
   client ». C'est faux : le pied de page de l'accueil affiche
   `40 avenue Etienne Lamy, 39300 Cize`, ainsi que l'email `sarl.hce@laposte.net`
   et les horaires `Lun-Ven 8h-18h · Sam 8h-12h` (`src/routes/index.tsx`, section
   Footer). Il n'y avait donc rien à demander au client : l'information était sous
   la main. Fichier client corrigé en conséquence.
2. **`LocalBusiness` complété.** Il ne portait que la ville. Ajout de
   `streetAddress`, `postalCode`, `geo`, `email`, `legalName`, `logo`,
   `foundingDate` (2012) et `openingHoursSpecification`. Chaque valeur est reprise
   à l'identique du pied de page visible : pas de mismatch possible entre le
   JSON-LD et le rendu. C'est le signal local fort qui manquait.
3. **Entité consolidée par `@id`.** Le site émettait trois nœuds schema.org
   décrivant « HCE » sans lien entre eux : `Organization` dans `__root.tsx` (sur
   toutes les pages), `LocalBusiness` sur l'accueil, et le `provider` des pages
   `/services/*`. Ils portent maintenant tous
   `@id: https://www.hcebtp.com/#business` — une entité au lieu de trois
   concurrentes. L'`Organization` et le `provider` ont aussi reçu l'adresse
   complète.
4. **Bug corrigé, visible par le visiteur.** `src/components/InteractiveMap.tsx`
   plaçait le marqueur « Cize · Siège » en **46.244/5.464**, qui sont les
   coordonnées de **Cize (01250), dans l'Ain**. Le siège réel est **Cize (39300),
   Jura**, en **46.726/5.914** (sources : cartesfrance.fr, communes.com), soit
   ~55 km plus au nord. Sur une section intitulée « Zone d'intervention », d'un
   site qui se positionne sur « enrobé Jura », le siège était affiché dans le
   mauvais département. Corrigé, avec un commentaire pour éviter la rechute.
5. **`llms.txt` : NAP complété** (raison sociale, adresse complète, email,
   horaires) dans « L'entreprise en bref » et dans « Contact ». Le reste du
   fichier, écrit par le premier run, n'a pas été touché.

**Vérifié en ligne après déploiement** : le `LocalBusiness` servi sur
`https://www.hcebtp.com/` contient bien l'adresse complète, `geo`, `email`,
`legalName`, `foundingDate` et les horaires ; `llms.txt` servi en 200 avec le NAP
complet aux deux endroits.

**IndexNow relancé après déploiement : 12 URLs soumises → HTTP 200.** À noter
pour demain : le premier run de la journée avait reçu **202** (« reçu, clé en
cours de vérification »). Le passage à **200** signifie que la clé est désormais
vérifiée et la soumission acceptée telle quelle. Le canal IndexNow est donc
opérationnel — ce qui déplace la question : si Bing n'indexe toujours rien dans
les jours qui viennent alors que les soumissions passent en 200, le blocage n'est
plus la découverte mais l'absence de liens entrants (action 4 du fichier client).

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas toucher au rendu de la carte** malgré un effet de bord connu de la
  correction : Cize (46.726/5.914) et Champagnole (46.747/5.911) ne sont qu'à
  ~2,4 km, donc au zoom 8 les deux pastilles se superposent presque. C'est
  géographiquement exact. Fusionner les points, décaler un label ou retirer
  Champagnole est une décision de design, pas de SEO — noté en hypothèse à
  vérifier plutôt qu'improvisé.
- **Ne pas ajouter `aggregateRating` ni `priceRange`** au `LocalBusiness` : aucune
  source, et la section avis a été supprimée à la demande du client. Un
  `aggregateRating` fabriqué serait un faux avis structuré.
- **Ne pas ajouter `sameAs`** : aucun profil externe vérifié n'existe à ce jour
  — c'est précisément le problème que traite l'action 4 du fichier client. À
  ajouter dès que les premières fiches existeront.
- **Ne pas re-réécrire `llms.txt`** ni créer un second document client : le
  premier run avait déjà fait les deux, mieux ou aussi bien.
- **Ne pas régénérer `package-lock.json`** bien qu'il soit désynchronisé de
  `package.json` (`npm ci` échoue : miniflare, sharp, workerd, ws manquants). Le
  projet installe avec Bun. Hors périmètre SEO et risqué.

### 08/09/2026 — Rattachement du site à l'entité légale HCE (SIREN/SIRET)

**Contexte.** Indexation toujours nulle. La priorité reste donc la découverte et
le rattachement externe, pas le contenu. Angle choisi différent des deux runs du
07/09 (hôte canonique, puis NAP interne) : cette fois **relier le domaine à une
entreprise que les moteurs connaissent déjà**.

**Le raisonnement.** Le site décrivait une entreprise nommée « HCE » à « Cize »
sans le moindre identifiant vérifiable. Or « HCE » est un sigle très répandu et
il existe deux communes nommées Cize : rien ne permettait à un moteur, ni à une
IA, de rapprocher `hcebtp.com` d'une entreprise réelle. Pendant ce temps des
fiches d'entreprise décrivant HCE existent déjà en ligne et sont crawlées. Le
chaînon manquant était l'identifiant qui relie les deux.

**Ce qui a été trouvé** (source : registre national des entreprises via
`recherche-entreprises.api.gouv.fr`, consulté le 08/09/2026) :

```
SIREN 521683573 · SIRET siège 52168357300039
H.C.E. - HINI - COURS - ENROBE (sigle H.C.E.) · SARL (nature juridique 5499)
NAF 43.12A — travaux de terrassement courants et travaux préparatoires
40 B avenue Etienne Lamy, 39300 Cize · géocodage INSEE 46.7234009 / 5.9185757
Entreprise active · date de création au registre : 2010-04-01
```

**Ce qui a été fait :**

1. **Identifiants légaux dans les données structurées.** `identifier`
   (`PropertyValue` SIREN + SIRET), `alternateName` avec la dénomination du
   registre, ajoutés à l'`Organization` du root (présente sur **toutes** les
   pages) et au `LocalBusiness` de l'accueil. C'est la donnée qui désigne
   l'entreprise sans ambiguïté possible.
2. **Premier `sameAs` du site** — chantier en attente n°9, débloqué. Il pointe
   vers `societe.com/societe/h-c-e-hini-cours-enrobe-521683573.html`, **fiche
   vérifiée en ligne avant d'être citée** (HTTP 200, même SIREN, même adresse que
   le registre). C'est la première fois que le site se relie à une page externe
   existante.
3. **`geo` remplacé par le géocodage officiel INSEE de l'établissement**
   (46.7234 / 5.9186) au lieu du centre de la commune (46.726 / 5.914) utilisé
   depuis hier : ~300 m plus précis, et l'autorité de la source change tout.
4. **`llms.txt`** : bloc d'identité légale complet (dénomination au registre,
   SIREN, SIRET, forme juridique, code NAF) + nouvelle Q/R **« HCE est-elle une
   entreprise réellement déclarée ? »**. C'est une question que les particuliers
   posent vraiment avant de confier un chantier de plusieurs milliers d'euros à
   un artisan, et la réponse est autonome et vérifiable — exactement le profil
   d'un passage citable par une IA. Date de mise à jour passée au 8 septembre.
5. **`ACTIONS-SEO-CLIENT.md`** : bloc d'identité légale à recopier tel quel dans
   les annuaires, et surtout — **la fiche societe.com existe déjà et ne porte pas
   l'adresse du site**. La revendiquer pour y ajouter l'URL est le lien entrant le
   plus rapide à obtenir aujourd'hui, depuis une page que Google crawle déjà.
   C'est passé en tête de l'action 4.

**Vérifications faites avant de pousser :**
- Les deux blocs JSON-LD modifiés ont été **évalués et sérialisés en JSON réel**
  (722 et 1180 octets, `identifier`/`sameAs`/`geo`/`alternateName` conformes).
- Le site est **rendu côté serveur** : en se présentant comme Googlebot, la page
  d'accueil renvoie 4 640 caractères de texte visible et tous les `<h1>`/`<h2>`
  dans le HTML brut. **Le blocage d'indexation n'est donc pas un problème de
  rendu JavaScript** — question tranchée, ne pas la rouvrir.
- Aucun changement visible par le visiteur.

**Vérifié en ligne après déploiement (commit `8a18f38`) :**
- `llms.txt` servi avec le bloc SIREN/SIRET/NAF et la nouvelle Q/R, date au
  8 septembre.
- JSON-LD de l'accueil récupéré **en se présentant comme Googlebot** et parsé :
  `Organization` et `LocalBusiness` portent bien `identifier` (SIREN + SIRET),
  `sameAs` et `alternateName` ; le `geo` du `LocalBusiness` est bien en
  46.7234 / 5.9186.
- **Contrôle de non-régression du `FAQPage`** : les 6 questions balisées sont
  toutes présentes dans le texte visible de la page. Aucun mismatch. (À refaire
  à chaque run, c'est le risque signalé en « Hypothèses à vérifier ».)
- `robots.txt`, `sitemap.xml` (12 URLs) et le fichier clé IndexNow toujours en 200.
- **IndexNow relancé après vérification : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas corriger l'adresse en « 40 B avenue Etienne Lamy »** malgré le
  registre. Le pied de page affiche `40`, et le JSON-LD doit refléter le contenu
  visible. Changer l'un sans l'autre crée un mismatch, changer les deux touche au
  rendu sur une donnée dont seul le client sait si le `B` est utilisé au courrier.
  Reporté au client dans `ACTIONS-SEO-CLIENT.md`, à trancher **avant** la
  validation postale de la fiche Google.
- **Ne pas toucher `foundingDate: 2012`** alors que le registre dit 2010 : 2012
  est figé par le client, et les deux dates peuvent coexister légitimement
  (immatriculation 2010, activité 2012). Signalé, pas modifié.
- **Ne pas remplacer `legalName: "HCE SARL"`** par la dénomination du registre :
  « HCE SARL » est cohérent avec le `© HCE SARL` du pied de page et l'entreprise
  est bien une SARL. La dénomination officielle est ajoutée en `alternateName`,
  ce qui apporte le bénéfice de rapprochement sans contredire l'affichage. Une
  fois le SIREN présent, la chaîne de caractères du nom compte de toute façon peu.
- **Ne pas publier de numéro de TVA intracommunautaire.** Il se calcule bien à
  partir du SIREN (clé déterministe), mais rien ne prouve que l'entreprise est
  assujettie ni qu'elle publie ce numéro. Un identifiant calculé n'est pas un
  identifiant vérifié.
- **Ne pas citer `annuaire-entreprises.data.gouv.fr` en `sameAs`** alors que
  c'est la source officielle, donc le meilleur candidat : la page est une coquille
  JavaScript qui renvoie **957 octets et HTTP 200 pour n'importe quel slug**, y
  compris inventé. Impossible de vérifier depuis le runner qu'une URL donnée
  décrit bien HCE — et on ne cite pas ce qu'on n'a pas vérifié. À reprendre si un
  moyen de contrôle apparaît.
- **Ne pas déplacer le marqueur de la carte** sur les nouvelles coordonnées : 300 m
  au zoom 8 sont invisibles, le gain est nul et c'est du rendu.
- **Ne pas relancer IndexNow avant d'avoir vérifié le déploiement en ligne** :
  soumettre des URLs dont le serveur renvoie encore l'ancienne version ne sert à
  rien. Relancé après contrôle (résultat noté plus bas).

---

## Chantiers en attente

Par ordre de priorité. **Alterner les angles, ne pas refaire le même deux jours
de suite.**

1. **Vérifier l'indexation à chaque run.** Tant que `site:hcebtp.com` ne renvoie
   rien, la priorité reste la découverte, pas le contenu.
2. **Vérifier le résultat IndexNow.** Si Bing indexe dans les jours qui suivent,
   c'est la preuve que le blocage était bien la découverte et non un filtre
   qualité. Si rien après ~2 semaines, c'est que le domaine a besoin de liens
   entrants réels (action 4 du fichier client). **Le canal lui-même fonctionne :
   soumission en 202 au 1er run du 07/09, puis en 200 au 2e run le même jour, ce
   qui veut dire que la clé est vérifiée.** Ne plus perdre de temps à diagnostiquer
   IndexNow — s'il n'y a toujours rien dans Bing, le problème est ailleurs.
3. **Titres et descriptions des pages `/realisations/*`.** Aujourd'hui le titre
   est généré par `params.slug.replace(/-/g, " ")` → « Réalisations · cour allee
   privee — HCE » : sans accents, sans majuscules, et les 5 pages partagent la
   même meta description. Chantier propre et sans risque (head uniquement).
4. **`lastmod` dans le sitemap.** Absent. À n'ajouter qu'avec une date honnête
   (date de commit du contenu), jamais une date générée à la volée.
5. **Aucune page ne cible « goudronnage »** — le mot n'apparaît nulle part sur le
   site alors que c'est le terme que tapent les particuliers. À traiter en
   contenu, pas en bourrage de mots-clés.
6. **Pas de `BreadcrumbList`** sur les pages services et réalisations.
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
    08/09 identité légale + `sameAs`. **Le prochain run devrait basculer sur le
    contenu** — le n°3 (titres `/realisations/*`) ou le n°5 (« goudronnage »)
    sont prêts à être pris et n'ont encore jamais été traités.

---

## Hypothèses à vérifier

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
- **07/09/2026 — faux positif évité.** Un premier `curl` sur le sitemap a échoué
  (connection reset) et ressemblait à une panne expliquant la non-indexation.
  Trois relances ont renvoyé 200 : c'était le runner, pas le site. **Leçon : ne
  jamais conclure à une panne sur un seul appel réseau.**

---

## Techniques apprises

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
