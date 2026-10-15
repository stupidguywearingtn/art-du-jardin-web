# Archive du SEO-JOURNAL — entrées de plus de 30 jours

Déplacées hors de `SEO-JOURNAL.md` le 11/10/2026 pour alléger la lecture de début de run.
Contenu inchangé. Les « Techniques apprises » sont restées dans le journal (ce sont des règles, pas un historique).

<!-- section d'origine : Positions mesurées -->
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

<!-- section d'origine : Positions mesurées -->
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

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 09/09/2026

**Lire d'abord l'encadré ci-dessous : le canal de mesure de Bing a cassé
aujourd'hui.** Aucune valeur par requête n'est fiable ce jour. Les noter « absent »
serait inventer une continuité qui n'existe pas — c'est précisément l'erreur du
07/09 sous une autre forme.

| Requête | Bing (09/09/2026) | Évolution vs 08/09 |
|---|---|---|
| `enrobé à chaud Jura` | **non mesurable** (canal invalide) | indéterminé |
| `enrobé à chaud Ain` | **non mesurable** | indéterminé |
| `entreprise travaux publics Jura` | **non mesurable** | indéterminé |
| `réfection parking enrobé Jura` | **non mesurable** | indéterminé |
| `terrassement Jura` | **non mesurable** | indéterminé |
| `goudronnage cour maison Jura` | **non mesurable** | indéterminé |
| marque `hcebtp` | **non mesurable** | indéterminé |
| `site:hcebtp.com` | **non mesurable** | indéterminé |

**Ce qui est établi aujourd'hui malgré tout : le site n'est toujours pas indexé.**
La preuve ne vient pas de Bing mais de `WebSearch`, dont le résultat est
exploitable : sur `hcebtp.com HCE enrobé Cize Jura`, **aucune page du domaine ne
ressort**, alors que la requête nomme explicitement le domaine et que quatre
fiches d'entreprise décrivant HCE, elles, remontent. Un domaine indexé serait
sorti en tête sur une requête pareille.

Nous sommes à 2 jours de la première soumission IndexNow : toujours dans le délai
normal, rien à en conclure.

Constat qui oriente tout le reste : **le domaine est inconnu des moteurs, mais
l'entreprise, elle, est déjà connue** — quatre annuaires la décrivent. Le problème
est bien le rattachement des deux, pas la notoriété.

> ⚠️ **La méthode de mesure du 08/09 est morte aujourd'hui — lire ceci avant de
> mesurer quoi que ce soit.**
> Le SERP HTML de Bing est désormais protégé par un **challenge de preuve de
> travail JavaScript** (`PoWConfig` dans la page). En curl, on reçoit une coquille
> sans aucun résultat : zéro domaine externe, y compris **sur des requêtes de
> contrôle qui ont forcément des résultats** (`colas enrobé`). Les quelques titres
> présents sont des suggestions sans rapport (Outlook, Recycle Bin…), ce qui donne
> l'illusion d'un SERP réel. **Compter les liens de résultat dans ce HTML produit
> donc « absent » pour tout, y compris pour des sites parfaitement indexés.**
> **Le contournement qui marche : `&format=rss`.** `https://www.bing.com/search?q=…&format=rss`
> renvoie du XML propre, sans JavaScript et sans challenge. Vérifié aujourd'hui sur
> `colas enrobé` → colas.com, Wikipédia, colasquebec.ca : de vrais résultats.
> **Deux précautions obligatoires :**
> 1. **Une requête à la fois, espacées.** Enchaînées rapidement, les réponses RSS
>    dérivent vers des résultats sans aucun rapport avec la requête (sites médicaux
>    japonais pour « enrobé à chaud Jura », zhihu.com pour `site:hcebtp.com`).
>    Toujours regarder si les domaines renvoyés sont plausibles pour la requête ; si
>    non, **la mesure est invalide, ce n'est pas un « absent »**.
> 2. **Exclure les liens de Bing lui-même** avant de compter : le flux RSS répète la
>    requête dans deux balises `<link>` de tête, donc `site:hcebtp.com` fait
>    apparaître « 2 liens hcebtp.com » qui ne sont pas des résultats. C'est la même
>    erreur qu'au 07/09, sous une autre forme.

**Limite de mesure à connaître** (à ne pas re-découvrir demain) :
- L'outil `WebSearch` est un moteur généraliste US qui **ignore l'opérateur
  `site:`** — il renvoie des pages Wikipédia sans rapport. Ne pas s'en servir
  pour tester l'indexation, ça donne un faux négatif inexploitable.
  **Nuance ajoutée le 09/09/2026 : il reste inutile pour `site:`, mais c'est le
  meilleur outil disponible pour trouver les mentions externes de l'entreprise.**
  C'est lui qui a fait apparaître aujourd'hui les quatre fiches d'annuaire
  (societe.com, pappers, verif, 118000) que trois runs de scraping Bing n'avaient
  jamais vues. À utiliser à chaque run avec des requêtes de type
  `HCE enrobé Cize Jura`, `H.C.E. HINI COURS ENROBE`, `521683573`.
- **Google est inatteignable depuis le runner** (pas de SERP brute), et
  DuckDuckGo renvoie un captcha.
- **Bing en curl fonctionne** et accepte `&setlang=fr&cc=FR` : c'est la seule
  mesure fiable disponible aujourd'hui. Comme Bing alimente Copilot et la
  recherche web de ChatGPT, c'est aussi la mesure la plus utile côté GEO.
- Le parseur de SERP dans `bingq.py` (scratchpad, non commité) n'a **pas** réussi
  à extraire les domaines concurrents : le sélecteur `li.b_algo` ne correspond
  plus au markup actuel. Le comptage d'occurrences de `hcebtp`, lui, est fiable.
  À refaire proprement pour pouvoir suivre les concurrents.

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 10/09/2026

**Indexation : toujours nulle.** Établi par `WebSearch` (le seul canal exploitable
aujourd'hui) : sur `hcebtp.com HCE Hini Cours Enrobé Cize`, **aucune page du domaine
ne ressort**, alors que huit fiches d'entreprise décrivant HCE remontent (pappers,
verif, kompass, societe, 118000, manageo, batiment.cc…). Un domaine indexé serait
sorti en tête sur une requête qui le nomme. Même constat qu'au 09/09 : entreprise
connue, domaine inconnu. Nous sommes à 3 jours de la 1re soumission IndexNow — délai
encore normal.

| Requête | Mesure (10/09/2026) |
|---|---|
| `site:hcebtp.com` (indexation) | **absent** (via WebSearch nommant le domaine) |
| requêtes commerciales | **non mesurables ce jour** (voir encadré) |

> ⚠️ **Aucun canal de SERP brut n'a fonctionné aujourd'hui — ne pas noter « absent »
> par requête, ce serait inventer une continuité (erreur du 07/09).**
> - **Bing RSS (`&format=rss`)** : dérive totale. Requête témoin `colas enrobe` →
>   annonces immobilières allemandes ; `enrobe a chaud Jura` → sites d'université
>   mexicaine (buap.mx). Le témoin prouve que le canal est mort, pas le site absent.
>   La précaution du 09/09 (requête témoin obligatoire) a encore payé.
> - **Mojeek** : HTTP 403. **DuckDuckGo lite/html** : `anomaly` (captcha) / code 000.
>   **Ecosia** : 403. **Marginalia** : 302. Aucun exploitable en curl aujourd'hui.
> - **`WebSearch`** reste utile pour l'indexation (nommer le domaine) et les
>   mentions externes, mais ignore toujours `site:`.

**Fiche externe découverte et vérifiée : manageo.fr.** `WebSearch` sur
`hcebtp.com HCE Hini Cours Enrobé Cize` a fait remonter plusieurs annuaires. Une
seule était lisible depuis le runner **et** porte l'adresse actuelle :
`manageo.fr/entreprises/521683573.html` (HTTP 200, 86 Ko), qui affiche
« ENTREPRISE H.C.E. - HINI - COURS - ENROBE », SIRET siège **52168357300039** et
adresse **« 40 AVENUE ETIENNE LAMY 39300 CIZE »** — l'actuelle, pas l'ancienne
« 36 » ni Champagnole. Ajoutée en `sameAs` (voir chantier du jour).

Les autres restent invérifiables ou périmées depuis le runner :
- **kompass.fr** (405), **verif.com** (403), **pappers.fr** (403),
  **batiment.cc** (403) : contenu non lisible. verif/kompass affichent d'ailleurs
  l'**ancienne** adresse (« 36 avenue Etienne Lamy » / Champagnole) d'après les
  extraits de recherche — périmées, à ne pas citer.
- **nosartisansontdutalent.fr** : bloqué par la politique réseau du runner
  (`connect_rejected`). Non vérifiable ici.

<!-- section d'origine : Chantiers faits -->
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

<!-- section d'origine : Chantiers faits -->
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

<!-- section d'origine : Chantiers faits -->
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

<!-- section d'origine : Chantiers faits -->
### 09/09/2026 — Les six réponses de la FAQ rendues lisibles par les crawlers (commit `5b77328`)

**Chantier choisi : un défaut réel trouvé à l'étape 2**, pas un des chantiers
prévus. Le contrôle de non-régression du `FAQPage` — celui que le journal demande
de refaire à chaque run — a cette fois été poussé jusqu'aux **réponses** et pas
seulement aux questions. Il a révélé un vrai problème.

**Le constat.** Dans le HTML servi de l'accueil, **une seule des six réponses de
la FAQ était présente**. Les cinq autres n'existaient nulle part dans la page :
uniquement dans le JSON-LD `FAQPage`. Cause : `src/components/sections.tsx`
montait la réponse conditionnellement (`{isOpen && <motion.div>…}`), donc seul
l'item ouvert par défaut (index 0) était rendu côté serveur.

Deux conséquences, toutes deux traitées :
1. **Mismatch structurel sanctionnable.** Le `FAQPage` déclarait six questions et
   six réponses ; la page n'en montrait qu'une. C'est exactement le cas que la
   consigne interdit (« le JSON-LD FAQPage doit TOUJOURS correspondre à une FAQ
   réellement visible »). Le journal avait bien noté ce risque en hypothèse, mais
   pour une autre cause (surcharge CMS) ; la cause réelle était plus immédiate.
2. **Perte GEO directe, et c'est le plus coûteux.** La FAQ est le contenu le plus
   citable du site : six questions autonomes avec des chiffres métier (20-30 ans
   de durée de vie, 2-4 jours de chantier, pose au-dessus de 5 °C, mars à
   novembre). Les crawlers qui n'exécutent pas de JavaScript — ceux des IA au
   premier chef — n'en lisaient **aucune**, sauf la première.

**Le correctif.** Le repli passe désormais par une transition CSS sur
`grid-template-rows` (`1fr` ↔ `0fr`, avec `min-height: 0` sur l'enfant) au lieu
d'un montage conditionnel. La réponse est toujours dans le DOM ; fermée, elle est
repliée à hauteur nulle. `aria-expanded` ajouté sur le bouton.

**Pourquoi pas framer-motion en montage permanent**, qui aurait été le réflexe :
- Passer un `style` qui change à un composant `motion` laisse React écrire
  directement la propriété animée au re-render — l'animation serait *sautée*, le
  panneau s'ouvrirait d'un coup.
- Sans `style` explicite, il fallait parier sur ce que framer-motion émet côté
  serveur avec `initial={false}`. **Invérifiable ici : le runner ne peut pas
  construire le projet.** Si le pari était faux, les six réponses s'affichaient
  dépliées jusqu'à l'hydratation. La transition CSS, elle, est rendue telle quelle
  par React : le HTML serveur sort déjà `0fr`, comportement certain.

**Vérifications faites (avant et après déploiement) :**
- Transpilation des trois fichiers modifiés (`bun build --no-bundle`) : aucune
  erreur. `AnimatePresence` reste importé et utilisé ailleurs dans le fichier.
- **Rendu réellement contrôlé dans un navigateur** : Chromium est présent sur le
  runner (`/opt/pw-browsers/chromium-*/chrome-linux/chrome`). Une reproduction du
  repli exact, ouverte en `file://` et capturée en PNG, confirme que l'item fermé
  est invisible **et n'occupe aucune hauteur** (les deux bordures se touchent).
- **En ligne après déploiement, vu comme Googlebot : les 6 réponses balisées sont
  toutes présentes dans le corps HTML.** Plus aucun mismatch. (Comparaison faite
  en normalisant accents et apostrophes — une comparaison naïve donne 5 faux
  « absents ».)
- **Texte visible de l'accueil : 4 640 → 5 160 caractères (+11 %)**, mesuré avec
  la même méthode qu'au 08/09. C'est du contenu à forte valeur de citation.
- Contenu figé par le client intact après déploiement : 2012, 14 ans, 150 °C,
  « posé à la main », « Devis détaillé », garantie décennale, pas de section avis.
- **IndexNow relancé après vérification : 12 URLs → HTTP 200.**

**Volet citations externes (priorité absolue tant que rien n'est indexé) :**

`WebSearch` a fait apparaître **quatre fiches d'entreprise déjà en ligne**, dont
trois que le journal ne connaissait pas. Aucune ne porte l'adresse du site.

- **`118000.fr/e_C0092984566` ajoutée en `sameAs`** (2e référence externe du
  site). Vérifiée en lisant la page : elle décrit bien « HCE Hini Cours Enrobé à
  CIZE 39300 » et publie en microdonnées `itemprop="telephone" 0384526148`,
  exactement le numéro du site. Aucune adresse chez eux, donc aucun conflit NAP.
- **`pappers.fr` et `verif.com` NON ajoutées** : elles répondent **HTTP 403** à nos
  requêtes. Leur existence est certaine (résultats de recherche), leur contenu
  invérifiable depuis le runner. La règle du 08/09 s'applique : on ne cite pas ce
  qu'on n'a pas lu.

**Découverte qui règle deux questions ouvertes du journal — l'entreprise a
déménagé deux fois.** Relevé sur les annonces légales reprises par societe.com :

```
SIRET …0013  Champagnole (39300), 1 rue Baronne Delort   jusqu'en avril 2025
SIRET …0021  36 avenue Etienne Lamy, 39300 Cize          à compter du 22/04/2025
             (délibération d'AGE du 22 avril 2025, annonce JAL puis BODACC 04/05/2025)
SIRET …0039  40 B avenue Etienne Lamy, 39300 Cize        siège actuel, BODACC 29/04/2026
```

Ce que ça résout :
1. **La date de création du SIRET siège au 01/04/2026** intriguait depuis le 08/09 :
   c'est simplement le second déménagement, à l'intérieur de Cize.
2. **L'adresse du site est la bonne**, à la lettre `B` près. On peut cesser de
   soupçonner le pied de page d'être périmé. En revanche **toute fiche affichant
   encore « 36 avenue Etienne Lamy » ou Champagnole est périmée** — c'est le cas de
   verif.com, référencée sous le SIRET …0021. Une ancienne adresse qui circule sur
   plusieurs annuaires empêche Google de consolider l'entreprise en une entité.

`ACTIONS-SEO-CLIENT.md` : tableau des quatre fiches (ce que chacune publie, quoi
en faire) et historique des établissements ajoutés à l'action 4.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas prendre les chantiers de contenu que le run précédent avait mis en tête**
  (titres `/realisations/*`, page « goudronnage »). Un défaut qui rend cinq
  passages sur six illisibles pour les IA passe avant l'optimisation de contenus
  qui, eux, sont déjà lisibles. Les deux restent en attente, intacts.
- **Ne pas corriger le mismatch CMS du `FAQPage`** (JSON-LD construit depuis la
  constante `FAQS`, affichage depuis `get("faqs", FAQS)`). Aujourd'hui les deux
  coïncident et le correctif propre demande de générer le JSON-LD côté serveur
  depuis la base : ça touche le chargement de la page. Reste en hypothèse.
- **Ne pas toucher `llms.txt` ni sa date de mise à jour.** Son contenu n'a pas
  changé aujourd'hui. La consigne dit d'actualiser la date seulement en cas de
  modification réelle : une date qui bouge sans raison est un faux signal.
- **Ne pas modifier l'adresse affichée** (`40` vs `40 B`) malgré la confirmation
  qu'il s'agit bien du siège actuel : c'est du rendu, et seul le client sait quelle
  forme il utilise au courrier. Question déjà posée dans le fichier client.
- **Ne pas conclure à une panne sur le `robots.txt`.** Un premier appel a renvoyé
  un code `000` ce matin, ce qui ressemblait à une explication de la
  non-indexation (un `robots.txt` injoignable fait différer le crawl par Google).
  **12 requêtes de suite ensuite : 12 × HTTP 200**, contenu conforme, apex et UA
  navigateur également. C'était le runner, comme pour le sitemap le 07/09.

<!-- section d'origine : Chantiers faits -->
### 10/09/2026 — Titres et meta descriptions des `/realisations/*` + fiche manageo (commit `68f9fa2`)

**Bascule sur le contenu, comme le journal le demandait depuis trois runs.** Le
chantier en attente n°3 (titres `/realisations/*`) avait été reporté les 07, 08 et
09/09 au profit du travail d'entité et de la FAQ. La consigne était explicite : ne
pas le repousser une quatrième fois sans raison aussi forte. Aucune n'est apparue,
donc il est traité.

**Le défaut, confirmé à l'étape 2 (pas seulement lu dans le journal).** Dans
`realisations.$slug.tsx`, le `<title>` était généré par
`params.slug.replace(/-/g, " ")` → « Réalisations · cour allee privee — HCE » : sans
accents, sans majuscules. Et les **5 URLs `/realisations/*` partageaient une meta
description identique** (« Découvrez nos réalisations en enrobé… »). Sur 12 URLs au
sitemap, 5 étaient donc mal titrées et non différenciées.

**Ce qui a été fait :**
1. **Tableau statique `REAL_META` (slug → titre + description)** dans
   `realisations.$slug.tsx`, repris à l'identique des titres/descriptions des
   catégories (`FALLBACK_CATS` de `useGallery.tsx`) — le `head()` n'a que le slug
   car la catégorie se charge en asynchrone côté client. Chaque page a désormais un
   `<title>` unique, accentué et géolocalisé (Jura/Ain), une meta description propre,
   plus `og:title`/`og:description`. Repli en title-case pour un slug inconnu (au
   lieu du slug brut).
2. **`realisations.avant-apres.tsx`** : titre et description enrichis et géolocalisés
   sur le même modèle (c'était la 5e URL qui partageait la description générique).
3. **Angle GEO respecté sans rien inventer** : ces pages sont des galeries photo, les
   descriptions décrivent ce qu'on y voit réellement ; chiffres client honorés
   (150 °C, « posé à la main »). Pas de FAQ ni de JSON-LD ajouté ici → aucun risque
   de mismatch.
4. **Volet découverte (priorité tant que non indexé)** : `manageo.fr` ajoutée en
   `sameAs` de l'`Organization` (`__root.tsx`) et du `LocalBusiness` (`index.tsx`),
   3e référence externe corroborant l'entité. Vérifiée ce jour (adresse actuelle,
   SIRET siège). Un commentaire daté explique la vérif dans chaque fichier.

**Vérifications avant push :** les 4 fichiers transpilent sans erreur
(`bun build --no-bundle`, méthode validée le 08/09 ; l'ENOENT d'outdir n'est pas une
erreur de syntaxe).

**Vérifié en ligne après déploiement (vu comme Googlebot) :**
- Les **5 URLs `/realisations/*`** servent chacune un `<title>` et une meta
  description **uniques, accentués, géolocalisés** (cour-allee-privee,
  parking-voirie-pro, preparation-terrassement, chantier-en-cours, avant-apres —
  tous distincts, contrôlés un par un).
- **`sameAs` = 3 références** (societe.com, 118000.fr, manageo.fr) sur
  l'`Organization` **et** le `LocalBusiness` (2 occurrences chacune). Aucune
  régression.
- **Non-régression FAQ** : les 6 réponses balisées sont toujours dans le HTML visible
  (attention : « supérieure**s** à 5°C », sans espace → une comparaison naïve donne un
  faux « absent », cf. leçon du 09/09).
- **Contenu figé client intact** : 2012, 14 ans, 150 °C, « posé à la main »,
  « Devis détaillé », garantie décennale. Aucun « 2005 ». Les 21 « 180 » du HTML sont
  tous du CSS/icône (`sizes="180x180"`, `clamp(180px)`, `width:180px`), aucun
  « 180 °C ». Les 2 « 48h » sont « réponse sous 24 à 48h » (délai de réponse à un
  contact, pas le devis) et un tracé SVG WhatsApp — pas le « Devis sous 48h »
  interdit. Pré-existants, non touchés.
- **IndexNow relancé : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas ajouter de `BreadcrumbList`** aux pages réalisations aujourd'hui (chantier
  en attente n°6) : un seul chantier mené à fond. Reste en attente, naturel à coupler
  avec ces pages un prochain jour.
- **Ne pas ajouter kompass/verif/pappers/batiment.cc en `sameAs`** : soit
  invérifiables depuis le runner (403/405), soit affichant l'ancienne adresse
  (« 36 » / Champagnole) — on ne cite pas ce qu'on n'a pas lu, et surtout pas une
  fiche périmée qui empêcherait Google de consolider l'entité.
- **Ne pas toucher `llms.txt` ni sa date** : aucune catégorie ni aucun chiffre n'a
  changé aujourd'hui ; bouger la date sans modification réelle serait un faux signal.
- **Ne pas générer de `lastmod` au sitemap** (n°4) : toujours pas de date de
  modification honnête par page.


<!-- archivé le 12/10/2026 -->
<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 11/09/2026

**Indexation : toujours nulle, 4 jours après la 1re soumission IndexNow.** Deux
mesures concordantes aujourd'hui, toutes deux via `WebSearch` (seul canal
exploitable) :
1. `hcebtp.com HCE Hini Cours Enrobé Cize` → **aucune page du domaine**, mais
   **huit fiches d'annuaire** décrivant HCE (kompass, verif, pappers, societe,
   118000, lagazettefrance, nosartisansontdutalent, manageo).
2. **Test nouveau et plus probant que le précédent : recherche d'une phrase
   exacte du site.** `"Médaillons et inserts pavés intégrés à l'enrobé"` (texte
   unique de l'accueil, entre guillemets) → **zéro résultat hcebtp.com**, neuf
   pages de concurrents sans rapport. Une page indexée ressort toujours sur une
   citation exacte de son propre texte. **À refaire à chaque run : c'est le test
   d'indexation le plus net dont on dispose ici, et il ne dépend pas de
   l'opérateur `site:` que `WebSearch` ignore.**

| Requête | Mesure (11/09/2026) | Évolution vs 10/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé |
| requêtes commerciales | **non mesurables ce jour** (voir encadré) | indéterminé |

**Ce que la SERP apprend quand même sur le marché** (requête
`enrobé à chaud Jura entreprise` via `WebSearch`) : les positions sont tenues par
**pagesjaunes.fr** (pages départementales « enrobé à chaud » et « travaux
d'enrobés de goudron »), **socorebat-france.fr** (qui publie une page
**« Enrobés goudron à Cize 39300 »**, soit la commune même du siège d'HCE),
daniel-moquet.com et franc-comtoise-tp.fr. **Deux enseignements :** le vocabulaire
« goudron / goudronnage » est bien celui des pages qui rankent, et un annuaire
occupe déjà la requête sur la commune d'HCE. C'est ce constat qui a fait choisir
le chantier du jour.

> ⚠️ **Canaux de SERP brute : toujours aucun exploitable. Ne pas les re-tester un
> par un demain, la liste est à jour.**
> - **Bing RSS (`&format=rss`)** : toujours mort. Requête témoin `colas enrobe` →
>   résultats sur le **Taj Mahal**. Le témoin obligatoire (leçon du 09/09) a encore
>   évité une fausse mesure « absent ».
> - **Mojeek** 403 · **DuckDuckGo** lite et html : HTTP 202 avec page d'anomalie ·
>   **Brave** 429 · **Marginalia** 302 · **Ecosia** 403.
> - **Startpage** : HTTP 200 et 22 Ko, **mais zéro lien de résultat** dans le HTML
>   (page de challenge). **Piège** : c'est le seul canal qui répond 200 sans rien
>   servir — un comptage naïf de liens y produirait « absent » pour tout. Vérifié
>   et écarté le 11/09.
> - **`WebSearch`** : le seul utilisable. Ignore `site:`, mais **respecte les
>   guillemets de phrase exacte** — c'est ce qui rend le test n°2 ci-dessus fiable.

**Contrôles techniques du jour** : accueil 200 (102 Ko), `robots.txt` 200,
`llms.txt` 200, `/services/enrobe-a-chaud` 200. `sitemap.xml` a renvoyé **une fois
`000` (connexion coupée) puis 200 trois fois de suite** — 2e occurrence du même
incident après le 07/09. Toujours traité comme un aléa réseau du runner, mais
**c'est la deuxième fois : si un 3e run le revoit, creuser sérieusement.**


<!-- section d'origine : Chantiers faits -->
### 11/09/2026 — La requête « goudronnage » enfin couverte, avec sources (commit `47499e2`)

**Chantier choisi : le n°5 des chantiers en attente**, le seul angle de contenu
jamais pris, explicitement désigné par le run du 10/09 comme le meilleur candidat.
Le mot « goudronnage » n'apparaissait **nulle part** sur le site, alors que c'est
le mot que tapent les particuliers. La mesure du jour l'a confirmé côté marché :
sur `enrobé à chaud Jura entreprise`, les pages qui rankent s'appellent « travaux
d'enrobés de goudron dans le Jura » (pagesjaunes) et **« Enrobés goudron à Cize
39300 »** (socorebat) — un annuaire occupe la requête sur la commune du siège.

**Pourquoi ce chantier malgré la priorité « découverte »** : les leviers de
découverte actionnables depuis le repo sont épuisés (hôte canonique, sitemap,
IndexNow, entité `@id`, identifiants légaux, 3 `sameAs` vérifiés). Ce qui reste
est **côté client** (Search Console, fiche d'établissement Google, premiers liens
entrants) et figure dans `ACTIONS-SEO-CLIENT.md`. Continuer à empiler du `sameAs`
aurait été le 5e run sur 6 sur le même angle, pour un gain nul.

**Ce qui a été fait, sur `/services/enrobe-a-chaud` :**
1. **Section visible « Ce qu'il faut savoir »**, cinq questions formulées comme on
   les pose à voix haute, chaque réponse autonome en 2-3 phrases (60-80 mots, la
   taille des passages qu'extraient les LLM) : goudronnage vs enrobé · ce qu'est un
   BBSG et ce que dit la norme · pourquoi 150 °C · pose en hiver dans le Jura ·
   chaud contre froid.
2. **Contenu toujours monté, sans accordéon** — application directe de la leçon du
   09/09 : un contenu replié en JS n'existe pas pour les crawlers d'IA.
3. **`FAQPage` construit depuis le même tableau que la section rendue** (champ
   `savoir.qa` de `ServiceData`) : le mismatch balisage/contenu est structurellement
   impossible, il ne dépend pas d'une vigilance humaine.
4. **`BreadcrumbList` ajouté aux six pages `/services/*`** (chantier en attente n°6,
   moitié traitée) : JSON-LD pur, aucun changement de rendu.
5. **`seoDescription` optionnelle** : la meta description de l'enrobé porte
   maintenant le mot « goudronnage ». **La phrase d'intro affichée dans le héros n'a
   pas été touchée** — pas de réécriture de contenu client.
6. **Données métier sourcées, rien d'inventé.** Les seuls chiffres nouveaux
   proviennent de deux sources **citées visiblement dans la page** : TotalEnergies
   (le goudron vient du charbon, abandonné dans les constructions routières au
   milieu des années 1980, cancérigène ; le bitume vient du pétrole) et
   IDRRIM/CFTR-info n°17 (série NF EN 13108, BBSG = partie 1, marquage CE
   obligatoire depuis le 1er mars 2008, retrait des NF P 98-1xx à cette date —
   recoupé par une 2e recherche). Tout le reste (150 °C, pose à la main, > 5 °C et
   sol sec, mars à novembre) est repris du contenu déjà publié par le client.
7. **« Dernière mise à jour : 11 septembre 2026 »** visible, en `<time datetime>`.
8. **`llms.txt`** : les quatre réponses correspondantes ajoutées, date du fichier
   passée au 11/09 (modification réelle, donc date légitime).

**Vérifié en ligne après déploiement (vu comme Googlebot) :**
- `/services/enrobe-a-chaud` sert **4 blocs JSON-LD** : `Organization`, `Service`,
  `BreadcrumbList` (2 items), `FAQPage` (5 items).
- **Les 5 questions ET les 5 réponses du `FAQPage` sont présentes mot pour mot dans
  le texte visible** (comparaison automatique après suppression des `<script>` et
  des balises) — zéro mismatch.
- Date, sources (TotalEnergies, IDRRIM), « NF EN 13108 », « BBSG » présents dans le
  rendu ; meta description avec « Goudronnage ».
- **Non-régression** : `/services/drainage-pentes` garde sa description d'origine,
  a gagné le `BreadcrumbList`, et **n'a pas de `FAQPage`** ; les 6 réponses de la
  FAQ de l'accueil sont toujours dans le HTML servi.
- **Contenu figé client intact** sur la page : 2012, 150 °C, « Devis détaillé »,
  garantie décennale. Aucun « 2005 », aucun « 180 °C », aucun « finisseur », aucun
  « Devis sous 48h ».
- **IndexNow relancé : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas publier d'épaisseurs ni de granulométries chiffrées** (4-5 cm, 0/6,
  0/10…), alors que c'est exactement le genre de données métier qui se fait citer.
  Les seules sources trouvées sont des blogs d'agences qui se recopient, et la
  norme NF P 98-130 est payante : **je n'ai pas pu lire la valeur, donc je ne la
  publie pas.** À reprendre si une source primaire lisible apparaît (guide Cerema
  en accès libre, CCTP départemental).
- **Ne pas créer de page dédiée `/goudronnage`** : le routeur est en file-based
  routing avec un `routeTree.gen.ts` généré au build, et **le runner ne peut pas
  construire le projet** (ni `bun install` ni `npm ci` n'aboutissent). Ajouter une
  route sans pouvoir la compiler, c'est risquer de casser le déploiement entier
  pour une page. Enrichir une page existante donne le même bénéfice sans ce risque.
- **Ne pas toucher la phrase d'intro du héros** ni aucun texte client existant.
- **Ne pas ajouter de `BreadcrumbList` aux pages `/realisations/*`** aujourd'hui :
  la moitié restante du n°6, à faire un autre jour.
- **Ne pas ajouter `lagazettefrance.fr` en `sameAs`** alors que la fiche est
  apparue aujourd'hui dans les résultats : je ne l'ai pas ouverte et lue depuis le
  runner. Règle inchangée — on ne cite pas ce qu'on n'a pas vérifié.



<!-- archivé le 13/10/2026 — section d'origine : Positions mesurées -->
### Positions mesurées — 12/09/2026

**Indexation : toujours nulle, 5 jours après la 1re soumission IndexNow.** Deux
mesures concordantes, toutes deux via `WebSearch` (toujours le seul canal
exploitable) :
1. **Phrase exacte du site** (le test le plus net, institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` entre guillemets →
   **dix résultats, zéro hcebtp.com**, rien que des concurrents et deux brevets
   américains. Une page indexée ressort toujours sur une citation exacte de son
   propre texte.
2. **Requête nommant le domaine** : `hcebtp.com HCE Hini Cours Enrobé Cize 39300`
   → **aucune page du domaine**, mais **neuf fiches d'annuaire** décrivant HCE.

| Requête | Mesure (12/09/2026) | Évolution vs 11/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé |
| requêtes commerciales | **non mesurables ce jour** (aucun canal de SERP brute) | indéterminé |

Les canaux de SERP brute n'ont **pas** été re-testés un par un : la liste du
11/09 est à jour et tous étaient morts (Bing RSS, Mojeek, DuckDuckGo, Brave,
Marginalia, Ecosia, Startpage). Ne pas y perdre de temps demain non plus.

**Découverte du jour, et c'est la plus utile depuis plusieurs runs : une fiche
PagesJaunes existe.** `pagesjaunes.fr/pros/52322496`, « H.C.E Cize - Travaux
publics (adresse, horaires) ». Aucun des cinq runs précédents ne l'avait vue.
C'est la **seule fiche commerciale** parmi les cinq connues (les autres sont des
fiches légales automatiques), donc la seule qui se revendique auprès de Solocal
et accepte un lien vers le site — et PagesJaunes est déjà le domaine qui tient
les positions sur les requêtes visées (constat du 11/09). Passée en tête de
l'action 4 du fichier client. **Non ajoutée en `sameAs` : HTTP 403 depuis le
runner, donc contenu non lu** — règle inchangée.

**Question ouverte n°12 tranchée : `lagazettefrance.fr` est écartée.** Elle, se
lit très bien (HTTP 200, 130 Ko) et le journal demandait depuis le 11/09 de la
lire pour en faire « un `sameAs` gratuit ». Lue aujourd'hui : elle est
référencée sous le **SIRET …0021**, affiche **« 36 avenue Etienne Lamy »** et
mentionne Champagnole — l'**ancienne** adresse. Elle n'a donc pas été ajoutée :
une fiche périmée de plus empêche Google de consolider l'entité. `doctrine.fr`,
également apparue, affiche aussi Champagnole → même sort. **Ne pas rouvrir ces
deux-là.**

**Contrôles techniques** : accueil, `robots.txt`, `sitemap.xml`, `llms.txt`,
`/services/enrobe-a-chaud` tous en 200 du premier coup.
`/services/preparation-terrain` a renvoyé **une fois `000` puis 200 cinq fois de
suite**. C'est la 3e fois qu'un `000` isolé apparaît (07/09 et 11/09 sur le
sitemap), mais **cette fois sur une autre URL, alors que le sitemap répondait
200 du premier coup** : ça confirme l'hypothèse « aléa réseau du runner » et
disqualifie l'hypothèse « sitemap intermittent ». Le point peut être considéré
comme clos, sauf si un jour plusieurs URLs échouent ensemble.


<!-- archivé le 13/10/2026 — section d'origine : Chantiers faits -->
### 12/09/2026 — La requête « terrassement » couverte sur `/services/preparation-terrain` (commit `eaef5d4`)

**Chantier choisi : le candidat n°1 désigné par le run du 11/09**, et pour la
raison qu'il donnait : `/services/preparation-terrain` existait avec **ni bloc de
questions, ni donnée métier, ni source**, alors que `terrassement Jura` est une
des six requêtes visées et que le site y est absent. Le mécanisme (`savoir` dans
`ServiceData`, `FAQPage` généré depuis le même tableau) était déjà en place
depuis le 11/09 : il suffisait de le remplir. Angle différent de la veille
(contenu enrobé) et surtout différent des quatre runs d'entité/`sameAs`.

**Ce qui a été fait :**
1. **Cinq Q/R sur `/services/preparation-terrain`**, questions posées à voix
   haute, réponse autonome en 2-3 phrases en tête, contenu **toujours monté**
   (leçon du 09/09) : déclaration avant de creuser · délai avant démarrage ·
   devenir des terres excavées · ce qu'est le terrassement VRD · pourquoi
   compacter par couches.
2. **`FAQPage` construit depuis le même tableau que la section visible** — le
   mismatch est structurellement impossible, comme sur l'enrobé.
3. **Données métier sourcées, lues directement, rien d'inventé** :
   - **DT-DICT** (lu sur `entreprendre.service-public.gouv.fr/vosdroits/F23491`) :
     le responsable de projet dépose la **DT**, chaque entreprise intervenante
     **et chaque sous-traitant** déposent leur **DICT** ; délais de réponse
     **9 jours calendaires** (DT par internet) et **7 jours calendaires** (DICT) ;
     **validité 3 mois** ; téléservice « Réseaux et canalisations ».
   - **Terres excavées** (lu sur `ecologie.gouv.fr`) : registre chronologique
     obligatoire depuis le **1er janvier 2022** (**décret n° 2021-321 du 25 mars
     2021**, **arrêté du 31 mai 2021**), registre national, et **bascule sur
     Trackdéchets au 5 mai 2025** après fusion avec le RNTDS.
   Les deux sources sont **citées visiblement** en bas de la page.
   C'est exactement le profil « ce que personne d'autre ne publie » : aucun site
   de TP local n'explique le délai réglementaire qui retarde un chantier, ni la
   traçabilité des terres — et la bascule Trackdéchets de mai 2025 est récente.
4. **`seoDescription`** portant « terrassement », « VRD » et « viabilisation »
   (la phrase d'intro du héros n'a **pas** été touchée).
5. **`llms.txt`** : les cinq réponses ajoutées, date passée au 12 septembre
   (modification réelle, donc date légitime).
6. **Petit déplacement de code nécessaire** : le titre et le chapeau de la
   section étaient écrits **en dur** dans le rendu et parlaient de goudronnage.
   Ils passent en champs `heading`/`lead` de `savoir`. Texte de l'enrobé recopié
   à l'identique → **aucun changement visible sur `/services/enrobe-a-chaud`**
   (vérifié en ligne).

**Vérifié en ligne après déploiement (vu comme Googlebot) :**
- `/services/preparation-terrain` sert **4 blocs JSON-LD** : `Organization`,
  `Service`, `BreadcrumbList`, `FAQPage`.
- **Les 5 questions ET les 5 réponses sont présentes mot pour mot dans le texte
  visible** (comparaison après suppression des `<script>` *et* `<style>`, accents
  et apostrophes normalisés) — **zéro mismatch**.
- Rendu contenant bien : DT-DICT, Trackdéchets, décret 2021-321, arrêté du
  31 mai 2021, 5 mai 2025, VRD, portance, « 12 septembre 2026 », les deux liens
  de sources. Meta description avec « Terrassement, VRD et viabilisation ».
- **Non-régression, le vrai risque du jour** : `/services/enrobe-a-chaud` rend
  toujours le même titre et le même chapeau, garde sa date du **11 septembre**,
  ses 5 Q/R **sans mismatch**, BBSG / NF EN 13108 / TotalEnergies intacts ;
  l'**accueil** garde ses **6 Q/R sans mismatch** ; `/services/drainage-pentes`
  est inchangée et toujours sans `FAQPage`.
- **Contenu figé client intact** : 150 °C, « posé à la main », « Devis détaillé ».
  Aucun « 2005 », « 180 °C », « finisseur », « Devis sous 48h ».
  *(« 2012 » est absent de cette page-là, et l'était déjà : seule la phrase
  d'intro de l'enrobé porte « depuis 2012 ». Ce n'est pas une régression — ne pas
  s'en alarmer demain.)*
- **IndexNow relancé : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- ✅ ~~**Ne pas publier les seuils d'urbanisme des affouillements** (déclaration
  préalable au-delà de 2 m de profondeur et 100 m²)~~ **RÉSOLU le 25/09/2026 :
  Légifrance est lisible depuis le 23/09, l'article R\*421-23 f a été lu et cité
  mot pour mot sur `/realisations/preparation-terrassement`, avec l'article
  R\*421-19 k pour le permis d'aménager. Thread refermé, ne pas le rouvrir.**
  *Constat d'origine du 12/09 conservé :* c'était la
  question la plus demandée du lot et quatre sources concordaient.
  **Légifrance répond 403** au runner (WebFetch et curl), le PDF de la
  préfecture de l'Ain n'a pas pu être décodé de façon fiable, et il ne reste que
  des cabinets d'avocats. Règle du 08/09 : on ne cite pas ce qu'on n'a pas lu.
  **À reprendre le jour où une source primaire lisible apparaît** — c'est une
  vraie question de particulier, elle mérite d'être couverte correctement.
- **Ne pas ajouter `pagesjaunes.fr` en `sameAs`** malgré tout son intérêt :
  HTTP 403, contenu non lu. Elle vaut surtout comme **action client** (lien
  entrant), pas comme `sameAs`.
- **Ne pas ajouter `lagazettefrance.fr` ni `doctrine.fr`** : lues, elles portent
  l'ancienne adresse. Question close.
- **Ne pas toucher la phrase d'intro du héros** de `preparation-terrain`, ni
  aucun texte client existant.
- **Ne pas ajouter de `BreadcrumbList` aux `/realisations/*`** (reliquat du n°6) :
  un seul chantier mené à fond.
- **Ne pas faire la veille de l'étape 5** : elle est prévue le lundi, on est
  samedi.

<!-- section d'origine : Positions mesurées (archivé le 14/10/2026) -->
### Positions mesurées — 13/09/2026

**Indexation : toujours nulle, 6 jours après la 1re soumission IndexNow.** Deux
mesures concordantes, via `WebSearch` (toujours le seul canal exploitable) :
1. **Phrase exacte du site** (le test institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` → **dix résultats, zéro
   hcebtp.com** (concurrents + deux brevets américains, exactement comme au 12/09).
2. **Requête nommant le domaine** : `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   travaux publics` → **aucune page du domaine**, mais **neuf fiches d'annuaire**.

| Requête | Mesure (13/09/2026) | Évolution vs 12/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé |
| requêtes commerciales | **non mesurables ce jour** (aucun canal de SERP brute) | indéterminé |

Les canaux de SERP brute n'ont **pas** été re-testés : la liste du 11/09 est à jour
(Bing RSS, Mojeek, DuckDuckGo, Brave, Marginalia, Ecosia, Startpage — tous morts).
Ne pas y perdre de temps demain non plus.

**Contrôles techniques** : accueil, `robots.txt`, `sitemap.xml`, `llms.txt`,
`/services/drainage-pentes` tous en **200 du premier coup**. Aucun `000` cette fois
— cohérent avec la conclusion du 12/09 (aléa réseau du runner, point clos).

<!-- section d'origine : Chantiers faits (archivé le 14/10/2026) -->
### 13/09/2026 — L'eau et les eaux pluviales couvertes sur `/services/drainage-pentes` (commit `3f080f2`)

**Chantier choisi : le candidat n°1 désigné par le run du 12/09**, et pour sa
raison : `drainage-pentes` était la page service la plus pauvre du site — aucun
texte hors la liste des prestations, ni question, ni source — alors que « où part
l'eau » est la question qui précède tout projet de goudronnage. Le mécanisme
(`savoir` dans `ServiceData`, `FAQPage` généré depuis le même tableau) était rodé
depuis le 11/09 : il suffisait de le remplir. **Changement purement de données,
aucun code de rendu touché.**

**Ce qui a été fait :**
1. **Cinq Q/R sur `/services/drainage-pentes`**, questions posées à voix haute,
   réponse autonome de 88 à 123 mots en tête, contenu **toujours monté** (leçon du
   09/09) : l'eau chez le voisin · la pente minimum · l'origine des flaques ·
   les obligations des parkings de plus de 500 m² · drain ou pente.
2. **`FAQPage` construit depuis le même tableau que la section visible** — mismatch
   structurellement impossible.
3. **Données réglementaires lues directement, rien d'inventé**, et **citées
   visiblement** en bas de page :
   - **`service-public.gouv.fr/particuliers/vosdroits/F2443`** (page « vérifiée le
     29 mai 2026 ») : servitude naturelle d'écoulement, **articles 640 et 641 du
     Code civil** ; l'obligation du fonds inférieur ne vaut que pour un écoulement
     **naturel, sans intervention humaine** ; elle **tombe si le fonds supérieur
     aggrave** l'écoulement ; elle ne couvre que **eaux de pluie, de source et de
     fonte des neiges**, pas les eaux usées.
   - **`entreprendre.service-public.gouv.fr/vosdroits/F38106`** (mise à jour du
     22 juillet 2025) : parcs de stationnement extérieurs **de plus de 500 m²**,
     neufs ouverts au public **ou faisant l'objet d'une rénovation lourde** →
     sur **au moins 50 % de la surface**, revêtements, aménagements hydrauliques
     ou dispositifs végétalisés favorisant **la perméabilité et l'infiltration
     des eaux pluviales ou leur évaporation** ; **article L111-19-1 du Code de
     l'urbanisme** ; projets soumis à autorisation d'urbanisme.
   **Pourquoi c'est le meilleur contenu publié jusqu'ici côté GEO** : le mot
   « rénovation lourde » d'un parking de plus de 500 m² couvre directement la
   requête visée **`réfection parking enrobé Jura`**, et aucun site de TP local
   ne publie cette obligation. Le volet « eau chez le voisin » est, lui, la
   question que les particuliers posent vraiment avant de goudronner.
4. **`seoDescription`** portant « drainage », « pente » et « eaux pluviales »
   (la phrase d'intro du héros n'a **pas** été touchée).
5. **`llms.txt`** : les cinq réponses ajoutées, date au 13 septembre, **et une
   dérive corrigée** — la section « Pages » ne mentionnait pas les Q/R ajoutées à
   `preparation-terrain` le 12/09. Les deux entrées sont désormais à jour.

**Volet découverte — 4e `sameAs`, et il est de meilleure qualité que les trois
autres.** `fr.mappy.com/poi/50adc51784ae2742a0054bfe`, **lue et vérifiée** :
elle publie le téléphone `03 84 52 61 48` **et** l'adresse actuelle
« 40 Bis av Etienne Lamy, 39300 Cize ». C'est la **seule fiche connue à porter les
deux à la fois** (118000 n'a pas d'adresse, societe.com et manageo n'ont pas le
téléphone). Ajoutée à l'`Organization` et au `LocalBusiness`, avec un commentaire
daté expliquant le piège de l'extrait périmé. Voir l'encadré de méthode plus haut.

`ACTIONS-SEO-CLIENT.md` : fiche Mappy documentée — **aucun lien vers le site**,
donc lien retour à créer en la revendiquant ; **horaires divergents** (site
Lun-Ven 8h-18h / Sam 8h-12h, Mappy Lun-Sam 7h-19h) signalés comme incohérence NAP
à corriger ; nom commercial différent (« H.C.E Aménagement de Cours en Enrobés »).

**Vérifié en ligne après déploiement (vu comme Googlebot) :**
- `/services/drainage-pentes` sert **4 blocs JSON-LD** : `Organization`, `Service`,
  `BreadcrumbList`, `FAQPage`.
- **Les 5 questions ET les 5 réponses sont présentes mot pour mot dans le texte
  visible** (comparaison après suppression des `<script>` *et* `<style>`, accents
  et apostrophes normalisés) — **zéro mismatch**.
- Rendu contenant : articles 640 et 641, L111-19-1, « 500 m² », « 1,5 % »,
  « puits perdu », « 13 septembre 2026 », les deux liens de sources. Meta
  description et `<title>` conformes.
- **Non-régression, le vrai risque du jour** : l'**accueil** garde ses **6 Q/R sans
  mismatch** ; `/services/enrobe-a-chaud` et `/services/preparation-terrain`
  gardent chacune leurs **5 Q/R sans mismatch** et leurs blocs JSON-LD.
  **`sameAs` = 4 partout** (Organization et LocalBusiness), mappy inclus.
- **Contenu figé client intact** : 2012, 150 °C, « posé à la main », « Devis
  détaillé », garantie décennale. Aucun « 2005 », « 180 °C », « finisseur »,
  « Devis sous 48h », ni dans les pages ni dans `llms.txt`.
  *(Rappel du 12/09 confirmé ce jour : « 2012 » est absent de
  `/services/preparation-terrain` et l'a toujours été — le contrôle automatique le
  signale comme « disparu », **ce n'est pas une régression**. Ne pas s'en alarmer.)*
- `llms.txt` servi en 200, 13 688 o, 220 lignes, sans aucun terme interdit.
- **IndexNow relancé après vérification : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas publier de chiffre sur le gel**, alors que c'était l'angle « contrainte
  saisonnière du Jura » que la consigne réclame et que j'avais commencé à le
  documenter. Les sources primaires sont inaccessibles : **HAL est protégé par un
  challenge Anubis**, la fiche climatologique Météo-France n'existe qu'en **PDF**
  (piège documenté le 12/09), et le miroir HTML `meteo.bzh` sert un tableau
  **entièrement vide** (« -- » partout). Le chiffre « 53 jours de gel à
  Lons-le-Saunier » n'apparaît que dans un extrait d'agrégateur : **non lu à la
  source, donc non publié.** La Q/R sur les flaques mentionne le gel de façon
  purement qualitative (l'eau augmente de volume en gelant), ce qui n'exige aucune
  source. **À reprendre si une normale climatique lisible en HTML apparaît** —
  ce serait une vraie donnée locale citable.
- **Ne pas citer `doc.cerema.fr`** bien que la page se lise : le document trouvé
  est une étude de dimensionnement au gel sur deux routes des Alpes-Maritimes,
  sans rapport avec une cour privée du Jura. Une source lisible mais hors sujet
  ne vaut pas mieux qu'une source absente.
- **Ne pas ajouter `pagesjaunes.fr` en `sameAs`** : toujours HTTP 403, contenu
  non lu. Elle reste le meilleur levier **côté client** (action 4), pas un `sameAs`.
- **Ne pas « corriger » l'adresse du site en « 40 Bis »** alors que Mappy est la
  **deuxième source indépendante** (avec le registre national) à porter le
  complément que le pied de page n'affiche pas. C'est du rendu, et la question est
  déjà posée au client depuis le 08/09. Renforcée dans le fichier client, **pas
  tranchée**.
- **Ne pas rouvrir `kompass.fr` / `verif.com` aujourd'hui** : leur statut
  « périmée » est fragile (voir l'encadré), mais elles répondent 403 et le run
  avait un chantier. Passé en chantier en attente n°13.
- **Ne pas ajouter de `BreadcrumbList` aux `/realisations/*`** (reliquat du n°6) :
  un seul chantier mené à fond.
- **Ne pas faire la veille de l'étape 5** : elle est prévue le lundi, on est
  dimanche. **Elle tombe demain 14/09 — la faire avant de choisir le chantier.**

---

---

## Archivé le 15/10/2026

### Positions mesurées — 14/09/2026

**Indexation : toujours nulle, 7 jours après la 1re soumission IndexNow.** Deux
mesures concordantes, via `WebSearch` (toujours le seul canal exploitable) :
1. **Phrase exacte du site** (test institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` → **huit résultats, zéro
   hcebtp.com** (concurrents uniquement ; les deux brevets américains vus les
   12 et 13/09 ont disparu du jeu de résultats, sans effet sur la conclusion).
2. **Requête nommant le domaine** : `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   travaux publics` → **aucune page du domaine**, mais **neuf fiches d'annuaire**
   (kompass, verif, pagesjaunes, pappers, societe, mappy, 118000, lagazette,
   manageo) — exactement la même liste qu'au 12 et 13/09.
3. `site:hcebtp.com` → **zéro résultat du domaine** (le moteur renvoie des pages
   Wikipédia sans rapport, signature d'un index qui ne connaît rien sur le sujet).

| Requête | Mesure (14/09/2026) | Évolution vs 13/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (aucun canal de SERP brute) | indéterminé |

> ⚠️ **Piège de mesure rencontré aujourd'hui, à connaître.** La requête
> commerciale `entreprise enrobé à chaud Jura goudronnage cour` a renvoyé une
> synthèse décrivant **« HCE – Travaux Publics (Cize, 39) »** avec un vocabulaire
> très proche de celui du site (« intervient dans le Jura ainsi que le secteur
> d'Oyonnax »). **Ce n'est pas une preuve d'indexation** : aucun lien
> `hcebtp.com` dans les résultats, et la description vient des fiches
> d'annuaire (PagesJaunes tient les 2 premières places). **La règle du 08/09
> tient : on compte les liens de résultat, jamais les mentions dans un texte
> de synthèse.** C'est la même famille d'erreur que le comptage d'occurrences.

**Contrôles techniques** : accueil, `robots.txt`, `llms.txt` en 200 du premier
coup. `sitemap.xml` et `/services/maconnerie-generale` ont renvoyé `000` puis
200 à la relance — et sur 10 appels de contrôle, 2 `000` isolés répartis sur les
deux URLs. **Conforme à la conclusion du 12/09 (aléa réseau du runner, point
clos)** : ne pas rouvrir le sujet tant que plusieurs URLs n'échouent pas ensemble
de façon durable.


### 14/09/2026 — Les 4 pages `/realisations/*` étaient vides sans JavaScript (commit `352c250`)

**Chantier choisi : un problème technique découvert à l'étape 2**, et non le
candidat prévu par le run du 13/09. Le journal proposait en n°1 le chantier
n°11 (vérifier les contenus dépliables). **Il a été fait, et il est négatif** —
voir plus bas. C'est en mesurant le volume de texte réellement servi page par
page, dans la foulée, que le vrai défaut est apparu.

**Le constat, mesuré sur le site en ligne vu comme Googlebot :**

| URL | Texte servi | `<h1>` | Liens internes |
|---|---|---|---|
| `/realisations/cour-allee-privee` | **62 car.** | **aucun** | **0** |
| `/realisations/parking-voirie-pro` | **62 car.** | **aucun** | **0** |
| `/realisations/preparation-terrassement` | **62 car.** | **aucun** | **0** |
| `/realisations/chantier-en-cours` | **62 car.** | **aucun** | **0** |
| `/realisations/avant-apres` | 188 car. | présent | 1 |
| `/services/*` | 3 784 à 5 207 car. | présent | 1 |
| accueil | 5 160 car. | présent | 7 |

Les 62 caractères étaient le mot « Chargement… ». **Quatre des douze URLs du
sitemap ne contenaient donc aucun contenu** pour Google et pour tout crawler
d'IA — qui, eux, n'exécutent pas de JavaScript du tout.

**Cause, identique en nature au défaut de la FAQ corrigé le 09/09 :** tout le
contenu de la page était derrière un `if (loading) return <Chargement…>`, et
`useGalleryByCategorySlug` démarre à `loading: true` en ne chargeant ses données
que dans un `useEffect` — **qui ne s'exécute jamais au rendu serveur**. L'état de
chargement était donc *le seul état jamais rendu côté serveur*. `avant-apres`,
qui rend son enveloppe et ne diffère que les photos, servait déjà de modèle
correct dans le même dossier.

**Deuxième constat, découvert dans la foulée : ces URLs étaient orphelines.**
Aucune page du site ne les liait dans le HTML servi — l'accueil a bien un
`<h2>` « Nos réalisations. », mais **les cartes de la galerie sont elles aussi
rendues côté client**, donc aucun `href` vers `/realisations/*`. Ces pages
n'étaient atteignables que par le sitemap. Le travail du 10/09 (titres et meta
descriptions uniques sur ces 5 URLs) ne pouvait donc rien rapporter.

**Ce qui a été fait :**
1. **`fallbackCategoryBySlug` exportée depuis `useGallery.tsx`** : résolution
   **synchrone** du titre et de la description depuis le slug. Source unique —
   le même `FALLBACK_CATS` que le repli asynchrone — donc le texte servi ne peut
   pas diverger du texte affiché. (Principe anti-dérive appliqué partout
   ailleurs : `llms.txt` le 07/09, `FAQPage` le 09/09.)
2. **La branche `loading` rend désormais** l'en-tête, le `<h1>` de la catégorie,
   sa description et le maillage — au lieu du seul mot « Chargement… ».
3. **Bloc « Voir aussi »** : les 3 autres dossiers + `avant-apres` + les services
   réellement mis en œuvre par ce type de chantier (une cour privée → enrobé et
   finitions ; un parking → enrobé et préparation de terrain ; un terrassement →
   préparation et drainage). **Rendu dans l'état de chargement ET dans la page
   complète** : servir aux robots des liens que le visiteur ne verrait pas serait
   du cloaking. C'est le point le plus important de la conception.
4. **`BreadcrumbList`** sur les catégories connues — **le reliquat du chantier en
   attente n°6 est donc traité pour les `/realisations/*`**. Deux niveaux, comme
   sur `/services/*` : **pas de niveau intermédiaire « Réalisations »**, car
   `/realisations` **n'est pas une route du site et répond bien 404** (vérifié) —
   un fil d'ariane ne doit pointer que vers des URLs réelles.
5. **En-tête extrait en composant `CategoryHeader`** : les trois états de la page
   ne peuvent plus diverger.
6. **Garde-fou anti-soft-404** : pour un slug inconnu, le shell minimal d'origine
   est conservé et **aucun `BreadcrumbList` n'est émis**. Sans cette garde, ma
   première version fabriquait un `<h1>` à partir de n'importe quel slug, ce qui
   aurait transformé `/realisations/<n'importe quoi>` en soft 404 crédible, donc
   en espace de crawl infini. **Défaut introduit puis corrigé avant le commit.**

**Vérifié en ligne après déploiement (vu comme Googlebot) :**
- Les 4 pages servent **357 à 386 caractères** (contre 62), un `<h1>` réel
  (`Cour & allée privée`, `Parking, grand espace et voirie pro`,
  `Préparation & terrassement`, `Chantier en cours`) et **7 liens internes**
  chacune (contre 0).
- **`BreadcrumbList` présent sur les 4, et son `name` de niveau 2 est
  strictement égal au `<h1>` visible** — comparaison automatique, zéro écart.
- **Slug inventé (`/realisations/slug-invente-xyz`) : 47 caractères, aucun
  `BreadcrumbList`.** Le garde-fou fonctionne.
- **Non-régression, le vrai risque du jour** : accueil **5 160 car.** (chiffre
  identique au 09/09 et au 13/09) avec `Organization` + `LocalBusiness` +
  `FAQPage` ; `/services/enrobe-a-chaud` **3 784**, `/services/preparation-terrain`
  **4 483**, `/services/drainage-pentes` **5 207**, chacune avec ses **4 blocs
  JSON-LD** intacts ; `avant-apres` **188 car.**, inchangée. **`sameAs` = 4
  partout.**
- **Contenu figé client intact** : 2012, 150 °C, « posé à la main », « Devis
  détaillé », garantie décennale présents ; **aucun terme interdit** (2005, 180,
  finisseur, « Devis sous 48h », « Garantie & SAV ») sur aucune des pages
  contrôlées.
- **IndexNow relancé après vérification : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas rendre la galerie de l'accueil côté serveur**, alors que c'est la
  cause de l'orphelinat. C'est une section visuelle qui marche, au cœur de la
  page la plus importante du site, et **le runner ne peut pas construire le
  projet** (`bun install` n'aboutit pas) : impossible de tester un changement de
  rendu sur l'accueil avant de pousser. **C'est le chantier n°1 pour un prochain
  run**, avec la méthode ci-dessous.
- **Ne pas créer de page `/realisations`.** Elle manque (l'URL répond 404 et rien
  ne fait hub), mais créer une route est un chantier à part entière et la règle
  est « un seul chantier mené à fond ». Noté en attente n°14.
- **Ne pas toucher à `llms.txt`** : il liste déjà les 5 pages avec exactement les
  titres servis (vérifié), et **le contenu rédactionnel de ces pages n'a pas
  changé** — seule son accessibilité aux robots a changé. Bumper la date de mise
  à jour sans modification réelle serait précisément la dérive que la consigne
  interdit. **Aucune dérive constatée aujourd'hui.**
- **Ne pas ajouter de « Dernière mise à jour »** sur ces 4 pages : ce sont des
  galeries photo, pas des pages de fond. Une date y serait du bruit, et elle
  mentirait dès que le client ajoute une photo depuis l'admin.
- **Ne pas remplir le bloc `savoir` de `maconnerie-generale`** (candidat n°2 du
  13/09) : c'eût été un 4e run d'affilée sur le même mécanisme, ce que le journal
  d'hier déconseillait explicitement. **Il reste le meilleur candidat contenu.**
- **Ne pas corriger le HTTP 200 sur `/realisations/<slug inconnu>`** : c'est un
  comportement pré-existant du routeur, non aggravé par ce commit (le shell servi
  est quasi vide et sans balisage). Noté en attente n°15.

---

