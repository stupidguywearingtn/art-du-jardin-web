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

## Archivé le 16/10/2026

### Positions mesurées — 15/09/2026

**Indexation : toujours nulle, 8 jours après la 1re soumission IndexNow.** Deux
mesures concordantes, via `WebSearch` (toujours le seul canal exploitable) :
1. **Phrase exacte du site** (test institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` → **huit résultats, zéro
   hcebtp.com** (concurrents du secteur uniquement : mavrotp, esprit-veranda,
   aravis-enrobage, pajot-tp, europavage68, abers-amenagement, perenia, cuinet).
2. **Requête nommant le domaine** : `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   travaux publics` → **aucune page du domaine**, mais **neuf fiches d'annuaire**
   (kompass, pappers, verif, doctrine, societe, pagesjaunes, 118000, lagazette,
   manageo) — même liste qu'aux 12, 13 et 14/09.

| Requête | Mesure (15/09/2026) | Évolution vs 14/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (aucun canal de SERP brute) | indéterminé |

Les canaux de SERP brute n'ont **pas** été re-testés : la liste du 11/09 est à
jour (Bing RSS, Mojeek, DuckDuckGo, Brave, Marginalia, Ecosia, Startpage — tous
morts). Ne pas y perdre de temps demain non plus.

**Contrôles techniques** : accueil, `/services/enrobe-a-chaud`,
`/services/maconnerie-generale`, `/realisations/cour-allee-privee`,
`robots.txt`, `sitemap.xml`, `llms.txt` — **tous en 200 du premier coup**, aucun
`000`. `robots.txt` relu intégralement : `User-agent: *`, `Allow: /` et la
directive `Sitemap: https://www.hcebtp.com/sitemap.xml` sont bien là. Rien ne
bloque la découverte côté serveur, la cause reste l'absence de liens entrants.

> ⚠️ **Nouvelle table de référence du volume de texte servi — ne pas la comparer
> à celle du 14/09.** Mon extracteur d'aujourd'hui donne des valeurs
> systématiquement un peu plus hautes que celui du 14/09 (accueil 5 340 contre
> 5 160 pour le *même* HTML : vérifié, le code n'avait pas bougé entre-temps).
> Les deux mesurent « texte hors `<script>`/`<style>` », mais ne normalisent pas
> les espaces de la même façon. **Un écart de 2-4 % entre deux runs ne prouve
> donc rien** : ne comparer que des chiffres produits par le même script, ou
> refaire la mesure des deux états comme aujourd'hui.

Valeurs mesurées **avant** le chantier du jour, vues comme Googlebot :

| URL | Texte servi (15/09) | JSON-LD | Liens `/realisations/*` |
|---|---|---|---|
| accueil | 5 340 car. | 3 | **0** |
| `/services/drainage-pentes` | 5 502 car. | 4 | 0 |
| `/services/preparation-terrain` | 4 632 car. | 4 | 0 |
| `/services/enrobe-a-chaud` | 3 938 car. | 4 | 0 |
| `/services/maconnerie-generale` | **904 car.** | 3 | 0 |
| `/realisations/cour-allee-privee` | 391 car. | 2 | 4 |
| `/realisations/avant-apres` | 193 car. | 1 | 0 |

### 15/09/2026 — La galerie de l'accueil rend enfin ses liens côté serveur (commit `4ab0962`)

**Chantier choisi : le candidat n°1 laissé par le run du 14/09**, re-vérifié et
toujours vrai à l'étape 2 (l'accueil servait **zéro** `href` vers
`/realisations/*`). C'est la moitié manquante du chantier d'hier : les quatre
pages catégories avaient été rendues lisibles, mais restaient orphelines de la
page la plus forte du site.

> 🔓 **Le verrou qui bloquait ce chantier hier a sauté, et c'est la découverte la
> plus réutilisable du run : le projet SE CONSTRUIT et SE TESTE en local.**
> Le 14/09 avait renoncé à toucher l'accueil parce que « le runner ne peut pas
> construire le projet (`bun install` n'aboutit pas) » — donc impossible de
> tester un changement de rendu avant de pousser. **C'est faux avec npm.** Voir
> la recette complète dans « Techniques apprises ».

**Cause, exactement la même famille que le défaut du 09/09 (FAQ) et du 14/09
(`/realisations/$slug`) :** `useGalleryCategories()` renvoyait
`categories: cats ?? []`, et `cats` démarre à `null` tant que `loadAll()` n'a pas
répondu. Or `loadAll()` n'est appelé que depuis un `useEffect`, **qui ne
s'exécute jamais au rendu serveur**. La grille servie était donc vide, alors
qu'un repli statique (`fallbackCategoriesWithCount()`) existait déjà dans le
même fichier et n'était utilisé que par le chemin asynchrone.

**Ce qui a été fait — une seule ligne de comportement changée :**
`categories: cats ?? []` devient `categories: cats ?? fallbackCategoriesWithCount()`
dans `src/hooks/useGallery.tsx`, avec le commentaire qui explique pourquoi.
**Même source que le repli asynchrone**, donc le visiteur voit exactement les
mêmes liens que les robots — pas de cloaking. C'est le patron appliqué le 14/09
à `realisations.$slug.tsx` et le 07/09 à `llms.txt` : une source unique.
`useGalleryCategories` n'a **qu'un seul consommateur** (`src/routes/index.tsx:703`)
et celui-ci ignore `loading` : le changement est contenu, vérifié par `grep`.

**Vérifié EN LOCAL avant de pousser (nouveau, et c'est ce qui rend ce run sûr) :**
- Serveur de rendu local, vu comme Googlebot, **état d'origine** : accueil
  **5 340 car., 0 lien `/realisations/*`** — *chiffre strictement identique à la
  production du jour*, donc le local reproduit fidèlement le serveur.
- **État corrigé** : accueil **5 681 car., 4 liens `/realisations/*`**
  (`cour-allee-privee`, `parking-voirie-pro`, `preparation-terrassement`,
  `avant-apres`), 3 blocs JSON-LD et 6 liens `/services/*` intacts.
- Non-régression locale sur `/services/enrobe-a-chaud` (3 938),
  `/services/maconnerie-generale` (904), `/realisations/cour-allee-privee` (391),
  `/realisations/avant-apres` (193) : **aucun écart**.
- `npx tsc --noEmit`, `npx eslint`, `npx prettier --check` : **tous OK**.

**Vérifié EN LIGNE après déploiement (vu comme Googlebot) :**
- Accueil **5 681 car.** et **4 liens `/realisations/*`** — la valeur locale, au
  caractère près.
- **Non-régression complète** : `drainage-pentes` 5 502, `preparation-terrain`
  4 632, `enrobe-a-chaud` 3 938, `maconnerie-generale` 904,
  `cour-allee-privee` 391, `avant-apres` 193 — **identiques aux valeurs mesurées
  avant le chantier**. `sameAs` = 4 partout, JSON-LD au complet.
- **Contenu figé client intact** : 2012, 150, « posé à la main », « Devis
  détaillé », garantie décennale présents ; **aucun terme interdit** (2005, 180,
  finisseur, « Devis sous 48h », « Garantie & SAV ») sur aucune page contrôlée.
- **IndexNow relancé après vérification : 12 URLs → HTTP 200.**

**Point à connaître : `/realisations/chantier-en-cours` n'est toujours pas liée
depuis l'accueil.** Ce n'est pas un oubli — la grille remplace délibérément cette
carte par le bloc « Avant / Après » (`index.tsx`, `isChantier`). La page reste
atteignable par le sitemap et par le bloc « Voir aussi » des trois autres
dossiers. **Ne pas « corriger » ça sans décision produit : ce serait ajouter une
5e carte visible sur l'accueil.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas afficher les `description` des catégories sur les cartes.** Le texte
  existe dans `FALLBACK_CATS` et serait du contenu servi en plus, mais c'est un
  changement visuel sur la page la plus importante du site, sans rapport avec le
  défaut du jour. Règle « en cas de doute sur le rendu, ne pas le faire ».
- **Ne pas remplir le bloc `savoir` de `maconnerie-generale`** (904 car., la page
  la plus maigre du site). **Ça reste le meilleur candidat contenu**, mais c'eût
  été un deuxième chantier dans la même journée.
- **Ne pas toucher à `llms.txt`.** Vérifié ligne à ligne : les 5 entrées
  `/realisations/*` portent exactement les titres de `FALLBACK_CATS`, **aucune
  dérive**. Le contenu rédactionnel n'a pas changé aujourd'hui — seule son
  accessibilité aux robots — donc bumper « Dernière mise à jour : 13 septembre
  2026 » serait la dérive que la consigne interdit.
- **Ne pas créer la page `/realisations`** (n°14) ni le `BreadcrumbList` de
  `avant-apres` (n°6) : chantiers distincts, et leur valeur est nulle tant que
  rien n'est indexé.
- **Ne rien changer au déploiement**, bien que le build local produise un dossier
  `.vercel/output/` — 3e indice concordant que l'hébergement est Vercel alors que
  la consigne dit Lovable Cloud. **Constat, pas action** : à ne trancher qu'avec
  le client.

---

## Archivé le 17/10/2026

### Positions mesurées — 16/09/2026

**Indexation : toujours nulle, 9 jours après la 1re soumission IndexNow.** Deux
mesures concordantes, via `WebSearch` (toujours le seul canal exploitable) :
1. **Phrase exacte du site** (test institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` → **dix résultats, zéro
   hcebtp.com** (mavrotp, aravis-enrobage, pajot-tp, europavage68,
   abers-amenagement, perenia, cuinet + trois brevets américains).
2. **Requête nommant le domaine** : `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   travaux publics` → **aucune page du domaine**, mais **neuf fiches d'annuaire**
   (kompass, verif, pagesjaunes, pappers, societe, mappy, 118000, lagazette,
   manageo) — même liste qu'aux 12, 13, 14 et 15/09.

| Requête | Mesure (16/09/2026) | Évolution vs 15/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (aucun canal de SERP brute) | indéterminé |

Les canaux de SERP brute n'ont **pas** été re-testés : la liste du 11/09 est à
jour (Bing RSS, Mojeek, DuckDuckGo, Brave, Marginalia, Ecosia, Startpage — tous
morts). Ne pas y perdre de temps demain non plus.

> ⚠️ **Piège de mesure rencontré aujourd'hui, variante de celui du 14/09.** Sur
> la recherche de phrase exacte, le moteur a renvoyé une **synthèse décrivant
> très précisément la technique du médaillon intégré à l'enrobé**, dans un
> vocabulaire proche de celui de l'accueil. **Ce n'est toujours pas une preuve
> d'indexation** : les dix liens de résultat sont des concurrents, la synthèse
> est construite à partir de leurs pages. **On compte les liens, jamais le texte
> de synthèse.** Ce piège se représentera d'autant plus que le site publie des
> contenus proches de ceux des concurrents.

**Contrôles techniques** : accueil, les six `/services/*`, `robots.txt`,
`sitemap.xml`, `llms.txt`, `/realisations/cour-allee-privee` et
`/realisations/avant-apres` — tous en 200. Deux `000` isolés
(`/services/preparation-terrain` puis `/services/finitions-soignees`), suivis
d'un 200 à la relance immédiate, sur environ 25 appels. **Conforme à la
conclusion du 12/09 (aléa réseau du runner, point clos)** : ne pas rouvrir.

**Trois pages service n'avaient jamais été mesurées — c'est fait.** Le journal
du 15/09 demandait de relever `bordures-murets` et `finitions-soignees` avant de
les traiter, en soupçonnant qu'elles soient aussi maigres que
`maconnerie-generale`. **Le soupçon est confirmé** :

| URL | Texte servi (16/09, avant chantier) | JSON-LD |
|---|---|---|
| `/services/drainage-pentes` | 5 502 car. | 4 |
| accueil | 5 681 car. | 3 |
| `/services/preparation-terrain` | 4 632 car. | 4 |
| `/services/enrobe-a-chaud` | 3 938 car. | 4 |
| `/services/finitions-soignees` | **1 115 car.** | 3 |
| `/services/bordures-murets` | **913 car.** | 3 |
| `/services/maconnerie-generale` | **904 car.** | 3 |
| `/realisations/cour-allee-privee` | 391 car. | 2 |
| `/realisations/avant-apres` | 193 car. | 1 |

Toutes les valeurs de la table du 15/09 sont **retrouvées au caractère près**
(même script de mesure). Le banc d'essai local a redonné exactement les mêmes
chiffres que la production avant le chantier : la fidélité du banc est
re-confirmée pour la deuxième fois.

### 16/09/2026 — `maconnerie-generale`, la page la plus maigre du site, passe de 904 à 5 300 caractères (commit `47eaa16`)

**Chantier choisi : le candidat n°1 encadré en tête des chantiers en attente**,
re-vérifié à l'étape 2 et toujours vrai (904 caractères servis, aucun `FAQPage`,
aucune `seoDescription`). C'était aussi le bon angle du jour pour une autre
raison notée par le run du 15/09 : **les 14 et 15/09 avaient été deux runs
techniques d'affilée, il fallait un run de CONTENU.**

**Pourquoi cette page et pas une autre** : elle porte le seul vocabulaire
décoratif du site (pavage, dallage, médaillons et inserts sur mesure), qui n'est
couvert nulle part ailleurs, et la phrase de l'accueil qui sert de test
d'indexation depuis le 11/09 vient précisément de ce champ lexical.

**Ce qui a été publié — 5 questions/réponses sourcées**, sur le patron des 11,
12 et 13/09 (réponse autonome en tête de chaque H3, question formulée telle
qu'on la pose à voix haute, date de mise à jour visible, sources cliquables) :
1. Peut-on intégrer des pavés ou un médaillon dans une cour en enrobé ?
2. Pavés en béton ou pavés en pierre naturelle : qu'est-ce qui change ?
3. À quoi sert vraiment une bordure au bord d'un enrobé ?
4. Faut-il une autorisation d'urbanisme pour créer des places de stationnement ?
5. Joints sablés ou joints cimentés : lequel choisir ?

**Les sources, toutes lues et vérifiées en 200 avant citation :**
- **AFNOR Norm'Info** — `NF EN 1338` (pavés en béton, **homologuée le 5 février
  2004**, réexamen systématique prévu au 1er février 2029, en cours de révision)
  et `NF EN 1342` (pavés de pierre naturelle, **publiée le 16 février 2013**,
  réexamen prévu au 16 février 2028). Les deux « définissent le marquage du
  produit et l'évaluation de sa conformité ».
- **AFNOR Norm'Info** — `NF EN 1340` (bordures et caniveaux béton) et `NF EN
  1339` (dalles béton). **La trouvaille la plus utile** : la norme 1340 énumère
  elle-même les fonctions d'une bordure, dont la **« butée de zones dallées ou
  d'autres revêtements »** — c'est la justification sourcée du rôle structurel
  d'une bordure en rive d'enrobé, un argument que les concurrents ne publient pas.
- **service-public.gouv.fr** `F17665` (permis d'aménager) et `F17578`
  (déclaration préalable), **toutes deux vérifiées le 13 février 2026** :
  permis d'aménager dès **50 unités** pour une aire de stationnement ouverte au
  public, déclaration préalable en dessous.

**Deux Q/R sont volontairement non normatives** (la n°1 sur l'intégration d'un
médaillon dans l'enrobé, la n°5 sur le choix des joints) : elles expliquent ce
que la page affirmait déjà sans le justifier (« conception sur mesure », « pose
au cordeau », « joints sablés ou cimentés selon l'usage prévu »). **Aucun chiffre
n'y figure** — c'est précisément la règle qui les rend publiables.

**Ajouts connexes du même commit :**
- `seoDescription` dédiée pour la page, qui n'en avait pas (le `<title>` et la
  meta retombaient sur la phrase d'intro du héros).
- Les cinq Q/R reportées dans `llms.txt`, avec leurs sources, plus l'entrée
  « Maçonnerie générale » de la section *Pages* enrichie et la date du fichier
  passée au 16 septembre 2026. **La date n'a été bumpée que parce que le contenu
  a réellement changé** — c'est la condition posée par la consigne.

**Mesuré EN LOCAL avant de pousser** (banc d'essai du 15/09) :
- État d'origine : `maconnerie-generale` **904 car., 3 JSON-LD, 3 H2, 3 H3** —
  *identique au caractère près à la production du jour*.
- État corrigé : **5 300 car., 4 JSON-LD** (le `FAQPage` s'ajoute), 4 H2, 8 H3.
- Non-régression locale : accueil 5 681, `drainage-pentes` 5 502,
  `preparation-terrain` 4 632, `enrobe-a-chaud` 3 938, `finitions-soignees`
  1 115, `bordures-murets` 913, `cour-allee-privee` 391 — **aucun écart**.
- `npx tsc --noEmit` : OK. `npm run build` : sortie 0. `npx eslint` : **58
  erreurs `prettier/prettier`, soit exactement le compte de HEAD avant le
  chantier** — voir « Techniques apprises », ce fichier n'a jamais été formaté.

**Vérifié EN LIGNE après déploiement** (80 s après le push) :
- `maconnerie-generale` **5 300 car., 4 JSON-LD** — la valeur locale exacte.
- **`FAQPage` : les 5 questions ET les 5 réponses sont présentes dans le HTML
  servi**, comparées chaîne par chaîne au JSON-LD. Zéro mismatch.
- « Dernière mise à jour : 16 septembre 2026 » et les 4 liens de source visibles.
- **Non-régression complète** sur les 8 autres URLs mesurées : valeurs identiques
  à l'avant-chantier.
- **Aucun terme interdit** (2005, 180, finisseur, « Devis sous 48h »,
  « Garantie & SAV ») et **aucun prix** dans le diff ni dans les pages servies.
- `llms.txt` en ligne porte bien les nouvelles Q/R.
- **IndexNow relancé après vérification : 12 URLs → HTTP 200.**

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas traiter `bordures-murets` (913 car.) ni `finitions-soignees`
  (1 115 car.) dans la foulée.** Les deux sont désormais mesurées et sont les
  prochains candidats évidents, mais c'eût été trois chantiers le même jour.
- **Ne pas reformater le fichier avec Prettier.** Il porte 58 erreurs
  `prettier/prettier` **antérieures à ce run** (vérifié en comparant avec la
  version de HEAD) : un `--write` produirait un diff massif sans rapport avec le
  SEO, exactement le refactoring que les règles interdisent. Seule la ligne que
  *mon* ajout rendait non conforme a été corrigée, pour ne pas dégrader le compte.
- **Ne pas publier d'épaisseur de lit de pose ni de classe de résistance au
  gel/dégel.** Le référentiel de certification NF du CERIB les contient très
  probablement, mais son PDF est illisible depuis le runner (voir « Techniques
  apprises »). **Règle du 11/09 appliquée : une donnée non vérifiable ne vaut pas
  mieux qu'une donnée inventée.** C'est la matière qui manque encore pour un
  contenu « gel dans le Jura » vraiment différenciant.
- **Ne pas toucher au `sitemap.xml`** : aucune URL créée.
- **Ne pas reprendre l'angle réglementaire d'un jour précédent.** La Q/R
  urbanisme du jour porte sur le **seuil des aires de stationnement**, distinct
  des DT-DICT (12/09) et de l'article L111-19-1 sur les eaux pluviales (13/09) ;
  vérifié pour éviter le doublon.

---

<!-- section d'origine : Chantiers faits -->
### 17/09/2026 — `bordures-murets` passe de 879 à 7 012 caractères, avec les normales climatiques de la station Météo-France voisine

**Chantier choisi** : le bloc « Ce qu'il faut savoir » de
`/services/bordures-murets`, désigné candidat n°1 par le run du 16/09. C'était la
page la plus maigre du site (879 caractères servis contre 3 783 à 5 455 pour les
autres pages service) et la dernière, avec `finitions-soignees`, à n'avoir aucun
contenu de fond.

**Pourquoi cet angle plutôt qu'un autre.** Le 16/09 était déjà un run de contenu,
et la règle est d'alterner. Deux raisons de ne pas alterner aujourd'hui : la page
était mesurée, chiffrée et documentée depuis la veille (matière déjà repérée, donc
chantier menable jusqu'au bout dans un seul run), et surtout la matière trouvée
en cours de route s'est révélée bien meilleure que prévu — les normales
climatiques de la station Météo-France de **Champagnole, à 2 km de Cize**. C'est
la donnée locale la plus différenciante publiée sur ce site à ce jour, et elle
n'a de sens que sur une page qui parle de béton. **Le prochain run doit changer
d'angle : trois runs de contenu d'affilée, c'est assez.**

**Ce qui a été fait, précisément** (fichier `src/routes/services.$slug.tsx`,
entrée `bordures-murets`) :
- Un `savoir` de **5 questions**, sur le patron des 11, 12, 13 et 16/09 : réponse
  autonome de 2-3 phrases en tête, H3 formulés comme des questions posées à voix
  haute, développement ensuite.
  1. *À quoi sert un muret de soutènement dans une cour ?* — les **trois
     états-limites** que vérifie la norme de justification (portance sous la
     semelle, glissement sur la base, excentrement/basculement), et la limite
     honnête du métier : au-delà du petit muret, c'est un calcul géotechnique et
     un bureau d'études, pas une finition de maçonnerie.
  2. *Faut-il une autorisation pour construire un mur chez soi ?* — déclaration
     préalable dès **2 m**, plus les trois cas indépendants de la hauteur
     (secteur protégé, zone du PLU, commune ayant soumis les clôtures à
     déclaration), article **R*421-12** du Code de l'urbanisme. Nuance qui fait
     la valeur de la réponse : **un mur de soutènement n'est pas une clôture**,
     son régime dépend du PLU.
  3. *Le mur entre chez moi et chez le voisin est-il mitoyen ?* — présomption de
     mitoyenneté, **marques de non-mitoyenneté** (sommet à une seule pente,
     tuiles ou bordures d'un seul côté), partage des frais au prorata,
     articles **653 à 673** du Code civil.
  4. *Bordure coulée sur place ou bordure préfabriquée ?* — la préfabriquée est
     un produit couvert par **NF EN 1340**, la coulée sur place **sort du champ
     de cette norme produit** : sa tenue dépend du coffrage et du béton. Angle
     volontairement différent de la Q/R n°3 du 16/09, qui utilisait la même norme
     pour le rôle de butée ; la réponse renvoie d'ailleurs le lecteur vers la
     page maçonnerie pour ce point.
  5. *Peut-on couler des bordures et des murets toute l'année dans le Jura ?* —
     **111,7 jours de gel par an**, dont 21,8 en janvier, 20,9 en février et
     20,4 en décembre ; **35,2 jours/an à -5 °C ou moins** ; température moyenne
     annuelle **9,4 °C** ; **1 573,2 mm** de précipitations par an. Toutes ces
     valeurs sont les normales 1991-2020 de la station Météo-France de
     Champagnole (indicatif 39097003, alt. 537 m), à 2 km de Cize.
- **5 sources** liées et visibles en pied de bloc : les deux fiches
  service-public.gouv.fr (F3131 vérifiée le 05/12/2025, F2415 vérifiée le
  14/09/2026), deux fiches AFNOR Norm'Info (NF P94-281, NF EN 1340) et la fiche
  climatologique Météo-France.
- `seoDescription` propre à la page (la phrase d'intro affichée ne contient aucun
  des mots réellement tapés : « autorisation », « mitoyen », « gel »).
- Report intégral des 5 Q/R dans `public/llms.txt`, avec leurs sources, plus
  l'entrée « Bordures & murets » de la liste des pages enrichie et la date de
  mise à jour passée au 17 septembre 2026.

**Mesure avant / après, au banc d'essai local, même script pour les deux côtés** :

| URL | Avant | Après | JSON-LD |
|---|---|---|---|
| `/services/bordures-murets` | 879 car. | **7 012 car.** | 3 → **4** (`FAQPage`) |
| `/services/maconnerie-generale` | 5 080 car. | 5 080 car. | 4 → 4 |
| `/services/finitions-soignees` | 1 080 car. | 1 080 car. | 3 → 3 |
| accueil | 5 455 car. | 5 455 car. | 3 → 3 |

Le banc local a redonné **exactement** les valeurs de la production avant
modification (879, 5 080, 1 080, 5 455) : fidélité re-confirmée pour la
**troisième** fois. Et les trois autres pages sont inchangées au caractère près —
le chantier n'a rien débordé.

**Contrôles passés avant de pousser** :
- `npm run build` sort en 0.
- `npx tsc --noEmit` : aucune erreur.
- **`FAQPage` vérifié par script** : les 5 questions ET les 5 réponses du JSON-LD
  sont retrouvées mot pour mot dans le texte visible du HTML servi, et les
  4 blocs JSON-LD de la page parsent (`Organization`, `Service`,
  `BreadcrumbList`, `FAQPage`). **Aucun mismatch possible.**
- `node scripts/check-contenu-fige.mjs` : aucune régression.
- ⚠️ `npx prettier --check` **échoue sur ce fichier — mais il échouait déjà sur
  `HEAD`**, avant toute modification : **58 erreurs `prettier/prettier` avant,
  58 après**, comptées des deux côtés. Mes ajouts n'en introduisent aucune.
  **Ne pas reformater ce fichier** : ce serait un diff de plusieurs centaines de
  lignes sans aucun gain SEO, exactement le refactor que les consignes
  interdisent. Corriger le contrôle du 15/09 au journal : « prettier --check
  passe » n'est plus vrai depuis les gros littéraux de données.

**Décidé de NE PAS faire aujourd'hui, et pourquoi :**
- **`/services/finitions-soignees`** (1 080 car.), l'autre page maigre : un seul
  chantier mené à fond vaut mieux que deux à moitié. Elle reste candidate, mais
  son `title` anormal (voir « Hypothèses à vérifier ») doit être tranché avec le
  client **avant ou pendant** son chantier.
- **Citer Wikipédia comme source du climat.** C'est par l'article « Cize (Jura) »
  que la station de Champagnole a été identifiée, et j'ai d'abord envisagé de le
  mettre en source faute de pouvoir lire le PDF Météo-France. Le détour par la
  source primaire a finalement réussi (voir « Techniques apprises ») **et a donné
  quatre chiffres de plus que Wikipédia n'en reprend** — dont les jours de gel,
  qui sont le cœur de la réponse. Règle : **ne jamais se rabattre sur le
  secondaire avant d'avoir vraiment essayé le primaire.**
- **Publier le nombre de jours sans dégel (Tx ≤ 0 °C).** La ligne du PDF est
  entrelacée avec celle des rafales de vent et mon recoupement par la somme des
  mois ne tombe pas juste (8,3 contre 9,3). Les quatre autres valeurs, elles,
  se recoupent exactement. **Un chiffre dont je ne suis pas sûr ne se publie
  pas** — celui-là est écarté, pas « arrondi ».
- **Toucher au `title` de la page** (« Bordures & murets — HCE · Jura & Ain ») :
  il suit le patron des cinq autres pages service, il n'y a rien à corriger.

---

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 17/09/2026

**Indexation : toujours nulle, 10 jours après la 1re soumission IndexNow.** Trois
mesures, via `WebSearch` (toujours le seul canal exploitable) :
1. **Phrase exacte du site** (test institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` → **dix résultats, zéro
   hcebtp.com**. Nouveauté : cette fois **aucun concurrent non plus**, uniquement
   des brevets (Google Patents, USPTO, OPIC, EPO). Le moteur n'a donc pas
   d'appariement français sur cette phrase aujourd'hui.
2. **Requête nommant le domaine** : `hcebtp.com HCE Cize 39300 enrobé travaux
   publics` → **aucune page du domaine**, et cette fois **aucune fiche
   d'annuaire non plus** : dix pages Wikipédia de communes homonymes. ⚠️ La
   formulation de la requête a été raccourcie par rapport aux runs précédents
   (« HCE Hini Cours Enrobé » retiré) parce que la version longue a échoué en
   « search unavailable ». **Ce résultat n'est donc PAS comparable à celui des
   12→16/09 : c'est un changement de requête, pas une disparition des fiches.**
   Reprendre la formulation longue demain.
3. **`site:hcebtp.com`** → dix pages Wikipédia d'acronymes (CEB, CBP, HBD…),
   **zéro résultat du domaine**. L'opérateur `site:` n'est visiblement pas honoré
   par ce canal : il ne prouve rien de plus que les deux autres mesures, mais il
   ne les contredit pas.

| Requête | Mesure (17/09/2026) | Évolution vs 16/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé (requête modifiée) |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (aucun canal de SERP brute) | indéterminé |

⚠️ **`WebSearch` a échoué trois fois sur huit appels aujourd'hui** (« Web search
error: unavailable »), avec succès à la relance immédiate à chaque fois. Même
famille d'aléa que les `000` du runner sur `curl` : **relancer avant de
conclure, et ne jamais changer la formulation d'une requête de suivi pour
contourner un échec** — c'est exactement ce qui a cassé la comparabilité de la
mesure n°2 ci-dessus.

**Contrôles techniques** : accueil, les six `/services/*`, les cinq
`/realisations/*`, `robots.txt`, `sitemap.xml`, `llms.txt` — **tous en 200 du
premier coup**, aucun `000`. `sitemap.xml` relu intégralement : 12 URLs, et
**`/realisations` n'y figure pas** — le 404 de cette URL n'est donc pas exposé
aux robots, point à ne pas rouvrir en urgence.

> ⚠️ **Nouvelle échelle de mesure, et cette fois elle est figée dans le dépôt.**
> Le problème signalé le 15/09 (deux extracteurs, deux séries de chiffres) est
> réglé : `scripts/mesure-texte-servi.mjs` est désormais versionné et **c'est lui
> la référence à partir d'aujourd'hui**. Il normalise en plus les entités
> hexadécimales (`&#x27;`), ce que les extracteurs jetables des runs précédents
> ne faisaient pas : ses valeurs sont donc **systématiquement un peu plus basses**
> (bordures-murets 879 au lieu de 884, maçonnerie 5 080 au lieu de 5 295).
> **Ne pas lire ça comme une régression.** Toutes les valeurs ci-dessous sont
> produites par ce script ; les tables des 14, 15 et 16/09 ne leur sont pas
> comparables au caractère près.

Les douze URLs du sitemap, mesurées **avant** le chantier du jour :

| URL | Texte servi (17/09) | JSON-LD | Liens `/realisations/*` |
|---|---|---|---|
| accueil | 5 455 car. | 3 | 4 |
| `/services/drainage-pentes` | 5 198 car. | 4 | 0 |
| `/services/maconnerie-generale` | 5 080 car. | 4 | 0 |
| `/services/preparation-terrain` | 4 482 car. | 4 | 0 |
| `/services/enrobe-a-chaud` | 3 783 car. | 4 | 0 |
| `/services/finitions-soignees` | **1 080 car.** | 3 | 0 |
| `/services/bordures-murets` | **879 car.** | 3 | 0 |
| `/realisations/parking-voirie-pro` | 381 car. | 2 | 5 |
| `/realisations/preparation-terrassement` | 380 car. | 2 | 5 |
| `/realisations/cour-allee-privee` | 379 car. | 2 | 5 |
| `/realisations/chantier-en-cours` | 353 car. | 2 | 5 |
| `/realisations/avant-apres` | **188 car.** | 1 | 1 |

C'est la première fois que **les douze URLs** sont mesurées d'un coup — les
quatre `/realisations/$slug` se tiennent bien (353 à 381 car., 2 JSON-LD,
5 liens internes chacune), le 14/09 a donc tenu. La page la plus maigre du site
après le chantier du jour sera `/realisations/avant-apres` (188 car., 1 seul
JSON-LD, pas de `BreadcrumbList`).

---

---

## Archivé le 21/10/2026 (entrées du 20/09/2026)

### Positions mesurées — 20/09/2026

> ⚠️ **Trou de trois jours : aucun run les 18 et 19/09.** Le journal passe
> directement du 17 au 20/09. Ce n'est pas un oubli de journalisation — il n'y
> a aucun commit à ces dates. À garder en tête pour lire les évolutions
> ci-dessous : elles couvrent trois jours, pas un.

**Indexation : toujours nulle, 13 jours après la 1re soumission IndexNow.**
Trois mesures, via `WebSearch` :
1. **Phrase exacte du site** (test institué le 11/09) :
   `"Médaillons et inserts pavés intégrés à l'enrobé"` → **dix résultats, zéro
   hcebtp.com**. Cette fois ce sont des concurrents français qui sortent
   (mavrotp, aravis-enrobage, pajot-tp, perenia, abers-amenagement,
   europavage68, cuinet) plus deux brevets USPTO. **Le moteur a donc bien un
   appariement français sur cette phrase aujourd'hui — et le site n'en fait pas
   partie.** C'est une mesure plus informative que celle du 17/09, où aucun
   concurrent ne sortait non plus.
2. **Requête nommant le domaine, formulation longue restaurée** (le 17/09 l'avait
   raccourcie pour contourner un échec de `WebSearch`, ce qui avait cassé la
   comparabilité) : `hcebtp.com HCE Hini Cours Enrobé Cize 39300 enrobé travaux
   publics` → **aucune page du domaine**, mais **neuf fiches d'annuaire**
   décrivant HCE (kompass, pappers, verif, doctrine, societe, pagesjaunes,
   118000, lagazettefrance, manageo). **Retour exact au résultat des 12→16/09 :
   la « disparition » des fiches le 17/09 était bien un artefact de requête, pas
   un événement. Point clos.**
3. **`site:hcebtp.com`** → dix pages sans rapport (Wikipédia d'acronymes,
   chnbtp.com, h-btp.com, hbtp.site), **zéro résultat du domaine**. L'opérateur
   `site:` n'est toujours pas honoré par ce canal.

| Requête | Mesure (20/09/2026) | Évolution vs 17/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé (mais concurrents FR de retour dans la SERP) |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire, comme les 12→16/09 |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (aucun canal de SERP brute) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui** (4 appels), contrairement
au 17/09. Rien à en conclure sur la cause, mais la relance-avant-de-conclure
reste la règle.

**Contrôles techniques** : les 12 URLs du sitemap en 200, `robots.txt`,
`sitemap.xml` (12 `<loc>`, `/realisations` inclus après le chantier du jour) et
`llms.txt` servis. Un seul `000` de la journée, sur le polling de déploiement —
aléa réseau connu du runner, disparu à la relance.

**Identité légale re-vérifiée le 20/09/2026** à l'API officielle
`recherche-entreprises.api.gouv.fr` (SIREN 521683573) : `H.C.E. - HINI - COURS -
ENROBE`, SIRET siège `52168357300039`, `40 B AVENUE ETIENNE LAMY 39300 CIZE`,
NAF `43.12A`, création au registre `2010-04-01`. **Identique à la relevé du
08/09 — rien n'a bougé, ne pas la re-vérifier avant plusieurs semaines.**

Les URLs du sitemap, mesurées **en production après déploiement** avec
`scripts/mesure-texte-servi.mjs` (comparables aux valeurs du 17/09) :

| URL | Texte servi (20/09) | vs 17/09 | JSON-LD | Liens `/realisations/*` |
|---|---|---|---|---|
| accueil | 5 499 car. | +36 | 3 | 4 |
| **`/realisations`** | **6 258 car.** | **était 404** | **4** | **4** |
| `/services/bordures-murets` | 7 012 car. | = | 4 | 0 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 | 0 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 | 0 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 | 0 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 | 0 |
| `/services/finitions-soignees` | **1 080 car.** | = | 3 | 0 |
| `/realisations/parking-voirie-pro` | 401 car. | +34 | 2 | 4 |
| `/realisations/preparation-terrassement` | 400 car. | +34 | 2 | 4 |
| `/realisations/cour-allee-privee` | 399 car. | +34 | 2 | 4 |
| `/realisations/chantier-en-cours` | 373 car. | +34 | 2 | 4 |

Les `liensR` des pages dossier passent de 5 à 4 : c'est le retrait de
« Avant / après » du 17/09, pas une régression du chantier du jour. La page la
plus maigre du site est désormais, sans concurrence, **`/services/finitions-soignees`
(1 080 car.)**.

---

### 20/09/2026 — `/realisations` existait dans les têtes mais pas sur le serveur : le hub passe de 404 à 6 258 caractères (commit `5debf51`)

**Chantier choisi** : créer la page `/realisations`, candidat n°14 des chantiers
en attente, désigné « meilleur candidat » par le run du 17/09.

**Pourquoi celui-là et pas un autre.** Trois raisons, dans cet ordre.
1. **Le run du 17/09 était le troisième run de contenu d'affilée** (13, 16,
   17/09) et le journal exigeait explicitement un changement d'angle. Celui-ci
   est un chantier d'architecture, pas de rédaction.
2. **L'URL répondait 404** depuis l'ouverture du journal. Les quatre dossiers de
   réalisations n'avaient aucune page mère : ni hub, ni niveau intermédiaire
   dans les fils d'ariane (le `BreadcrumbList` des `/realisations/$slug` sautait
   d'« Accueil » à la catégorie, faute d'URL réelle à citer au milieu).
3. **C'est une page de destination naturelle** pour « réalisations enrobé Jura »,
   une requête que le site ne couvrait par aucune URL.

**Ce qui a été fait, précisément.**

- **Nouvelle route statique `src/routes/realisations.index.tsx`** → `/realisations`,
  HTTP 200. **Aucun `useEffect`, aucun appel Supabase, aucun état de
  chargement** : c'est la leçon des 14 et 15/09 appliquée d'emblée, tout le
  texte sort côté serveur. Mesuré : **6 258 caractères servis, 4 blocs JSON-LD,
  4 liens vers les dossiers**, identiques au banc d'essai local et en production.
- **Contenu** : réponse directe en tête (les quatre dossiers nommés dès le
  premier paragraphe), un H2 formulé en question (« Quels types de chantiers HCE
  réalise-t-elle ? »), puis un paragraphe par dossier décrivant **ce que montrent
  réellement les photos** et les prestations mises en œuvre, chacune liée à sa
  page service. Aucun chantier nommé, aucun chiffre, aucune référence client :
  il n'y avait rien de vérifiable à publier de ce côté-là.
- **Bloc « Ce qu'il faut savoir » — 4 Q/R sourcées sur l'après-chantier**, un
  angle que personne ne traite sur un site d'enrobé :
  - **La garantie décennale couvre explicitement une cour ou un parking.** La
    fiche `service-public.gouv.fr` F2034, vérifiée le 10 avril 2026, liste parmi
    les ouvrages couverts la **voirie (chemin d'accès)** et les **ouvrages de
    viabilité (réseaux, assainissement)**. C'est la trouvaille du jour : le site
    affichait « garantie décennale » depuis toujours sans jamais dire ce qu'elle
    couvre ni qu'elle s'applique bien à ce métier.
  - **Le délai part le lendemain de la signature du procès-verbal de réception**,
    pas du devis ni de la facture, et court dix ans. Au-delà, plus aucune action
    en justice n'est possible sur ce fondement.
  - **L'attestation d'assurance décennale doit être remise avant l'ouverture du
    chantier et jointe au devis et à la facture.** Deux points rarement écrits :
    seuls les travaux déclarés au contrat sont couverts, et l'ouverture du
    chantier doit tomber dans la période de validité. Sanction de l'absence de
    garantie : 6 mois d'emprisonnement et 75 000 € d'amende (article L243-3 du
    Code des assurances).
  - **Zone d'intervention + levée de l'homonymie `Cize 01250` / `Cize 39300`**,
    avec SIREN, SIRET et code NAF 43.12A re-vérifiés le jour même à l'API
    officielle. C'est du signal d'entité pur, sur une page qui en manquait.
  - **Sources citées et visibles** : la fiche F2034 et l'API Recherche
    d'entreprises. `Dernière mise à jour : 20 septembre 2026` visible.
- **JSON-LD (4 blocs, tous alignés sur le visible)** : `Organization` (racine),
  `BreadcrumbList` à 2 niveaux, `CollectionPage` + `ItemList` reprenant
  **exactement** les quatre liens visibles dans le même ordre, et `FAQPage`
  construit depuis le **même tableau** que la section affichée. Vérifié par
  extraction : les 4 questions et les 4 réponses du `FAQPage` sont bien dans le
  texte servi. `CollectionPage.publisher` pointe sur `#business`, le nœud qui
  existe réellement — pas sur un `#website` inventé (première rédaction corrigée
  avant commit).
- **Fil d'ariane des `/realisations/$slug` passé à trois niveaux** : Accueil →
  Réalisations → catégorie. Le niveau intermédiaire pointe enfin vers une URL
  réelle. C'était le reliquat n°6 des chantiers en attente.
- **Maillage interne** : lien « Tous les dossiers de réalisations » depuis la
  galerie de l'accueil (sans lui le hub ne serait atteignable que par le
  sitemap) et depuis le bloc « Voir aussi » des quatre pages dossier.
- **`src/lib/realisations.ts` créé** : `REAL_CAT_SLUGS`, `RELATED_SERVICES` et
  `titleCaseSlug` y sont désormais la source unique, lue par le hub **et** par
  `realisations.$slug.tsx`. Les recopier aurait garanti la divergence au premier
  renommage. Les libellés, eux, continuent de venir de
  `fallbackCategoryBySlug`, la même constante que les `<h1>`.
- **Report partout** : sitemap (12 URLs), `llms.txt`, `indexnow-submit.mjs`,
  `mesure-texte-servi.mjs`. **IndexNow relancé après vérification du déploiement
  en ligne** — 12 URLs soumises, HTTP 200.

**Contrôles avant push** : `npm run build`, `npx tsc --noEmit`, `npx eslint`,
`npx prettier --check` et `npm run check:fige` passent tous. Mesure avant/après
au banc d'essai local **avec le même script des deux côtés**, puis re-mesure en
production après déploiement : **valeurs identiques au caractère près**, ce qui
re-valide la fidélité du banc d'essai.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- **Ne pas afficher de photos sur le hub.** Elles viennent de Supabase via un
  hook asynchrone : les charger aurait ramené le défaut des 14/15/09 (contenu
  derrière un état de chargement, invisible aux robots) sur une page neuve. Le
  hub est volontairement textuel ; les photos sont à un clic.
- **Ne pas toucher à `/services/finitions-soignees`** (1 080 car.), pourtant la
  page la plus maigre du site. Ç'aurait été un quatrième run de contenu de
  suite, et le `title` anormal de cette page doit être tranché avec le client
  d'abord. **C'est le candidat n°1 du prochain run.**
- **Ne pas ajouter `lastmod` au sitemap** dans la foulée : ça mérite d'être fait
  proprement depuis les dates de commit, pas bricolé au passage.
- **Ne pas créer de vraie 404 pour `/realisations/<slug inconnu>`** (n°15) : le
  chantier du jour ne l'aggrave pas, et toucher au routeur le même jour qu'on y
  ajoute une route double le risque pour un gain nul tant que rien ne lie ces
  URLs.
- **Ne pas re-tenter les fiches `kompass`/`verif`/`pappers`** (403 au runner) :
  statut inchangé, rien de nouveau à tenter aujourd'hui.

**Ce qui reste ouvert** : l'indexation. Ce chantier ajoute une URL et des liens
internes, il ne crée aucun lien entrant — et c'est ce qui manque. Voir la note
d'alerte en tête des chantiers en attente.

## Archivé le 22/10/2026 (entrées du 21/09/2026)

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 21/09/2026

**Indexation : toujours nulle, 14 jours après la 1re soumission IndexNow.** Trois
mesures via `WebSearch`, mêmes protocoles que les runs précédents :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Ce sont les mêmes concurrents français
   qu'au 20/09 (mavrotp, aravis-enrobage, pajot-tp, perenia, abers-amenagement,
   europavage68, cuinet) + deux brevets USPTO. Appariement français présent sur
   la phrase, le site n'en fait toujours pas partie. **Inchangé vs 20/09.**
2. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, neuf fiches d'annuaire
   (kompass, pappers, verif, societe, pagesjaunes, 118000, lagazettefrance,
   nosartisansontdutalent, manageo). **Inchangé vs 20/09.**
3. **`site:hcebtp.com`** → dix pages sans rapport (Wikipédia d'acronymes, chnbtp,
   Facebook HBTP), **zéro résultat du domaine**. L'opérateur `site:` n'est
   toujours pas honoré par ce canal. **Inchangé.**

| Requête | Mesure (21/09/2026) | Évolution vs 20/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui.**

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu comme
Googlebot) : **identique au 20/09 au caractère près sur les douze URLs** — accueil
5 499, `/realisations` 6 258, bordures-murets 7 012, maconnerie 5 080, drainage
5 198, preparation-terrain 4 482, enrobe-a-chaud 3 783, **finitions-soignees
1 080** (avant le chantier du jour), les quatre dossiers 373-401. Les 12 URLs du
sitemap répondent 200. Rien n'a bougé côté prod depuis le 20/09 (aucun commit
entre les deux).

> 🔎 **Découverte de veille du 21/09 (voir « Techniques apprises ») : une fiche
> Google existe déjà pour HCE et accumule des avis (4,5/5, 16 avis), visible sur
> l'annuaire PagesJaunes « enrobé à chaud – Jura ».** Cela corrige l'hypothèse
> tenue depuis le 07/09 selon laquelle « il n'existe pas de fiche Google » :
> `ACTIONS-SEO-CLIENT.md` (Action 2) a été mis à jour — la revendiquer et y
> déclarer le site, au lieu d'en créer une nouvelle.

<!-- section d'origine : Chantiers faits -->
### 21/09/2026 — `/services/finitions-soignees` passe de 1 080 à 6 821 caractères : la dernière page service sans bloc `savoir` en a un, sur la finition et la fin de chantier

**Chantier choisi** : enrichir `/services/finitions-soignees`, désignée « candidat
n°1 du prochain run » par le run du 20/09 — la dernière des six pages service sans
bloc « ce qu'il faut savoir », et la page la plus maigre du site (1 080 car.) une
fois le hub `/realisations` créé. La série de trois runs de contenu (13, 16,
17/09) avait été rompue par le chantier d'architecture du 20/09 : reprendre du
contenu aujourd'hui n'était donc plus un quatrième run de suite.

**Ce qui a été fait**, sur le patron des blocs `savoir` des pages service (réponse
autonome de 2-3 phrases en tête de chaque H3, questions posées comme à voix haute,
chiffres et sources primaires, `FAQPage` construit depuis le **même** tableau que
la section visible → aucun mismatch possible) :
- **5 Q/R sourcées**, sur un angle inédit (la finition et la fin de chantier, pas
  la technique de pose déjà couverte ailleurs) :
  1. *Comment reconnaît-on un enrobé bien posé ?* — bords francs, raccords qu'on ne
     sent pas, pas de rétention d'eau ; norme de mise en œuvre **NF P98-150-1**
     (homologuée le 26/06/2010, en vigueur, réexamen au 01/06/2030), dont le
     domaine d'application couvre explicitement « revêtements d'accotements, de
     trottoirs et parties annexes » — donc les cours et allées.
  2. *Pourquoi voit-on parfois une ligne entre deux bandes ?* — le joint est le
     point fragile ; raison thermique ; intérêt de la pose à la main à 150 °C.
  3. *Qui évacue les gravats, et où vont-ils ?* — tri à la source par flux (bois,
     fractions minérales, métal, verre, plastique, plâtre), dispenses des petits
     chantiers (< 40 m² de stockage ou < 10 m³).
  4. *Qu'est-ce qu'un devis doit indiquer sur les déchets ?* — les 4 mentions du
     **décret n° 2020-1817** obligatoires depuis le 01/07/2021, + bordereau de
     dépôt gratuit.
  5. *Comment la finition se valide-t-elle avant la fin du chantier ?* —
     validation étape par étape, contrôle de planéité, garantie décennale.
- `seoDescription` géolocalisée (Jura & Ain, gravats, chantier rendu propre).
- 3 sources primaires vérifiées ce jour : **NF P98-150-1** (norminfo.afnor.org,
  lue), **décret n° 2020-1817** (Légifrance, lu), **tri à la source** (fiche
  entreprendre.service-public.gouv.fr F37782, lue).
- Report du contenu dans `public/llms.txt` (entrée de page + « Dernière mise à
  jour » passée au 21/09) — le fichier avait dérivé, il disait encore 17/09 alors
  que le hub `/realisations` y avait été ajouté le 20/09.

**Mesuré au banc d'essai local** (recette du 15/09, même script des deux côtés) :
avant **1 080 car. / 3 blocs JSON-LD**, après **6 821 car. / 4 blocs**. Le banc
reproduisait la prod au caractère près avant modification (1 080). **FAQPage
vérifié strictement aligné sur le texte visible** (script `verif-faq.mjs` : 5/5
Q et 5/5 R retrouvées dans le HTML servi). `npx tsc --noEmit` propre ; **eslint à
parité exacte avec HEAD (60 = 60), zéro nouvelle violation** — le repo porte 60
erreurs prettier pré-existantes, non introduites par ce chantier, et non
corrigées ici pour ne pas noyer le diff de contenu dans un reformatage global.

**Ce que je n'ai PAS fait, et pourquoi** :
- **Le `title` anormal de la page** (« Vous avez un projet d'aménagement de cour en
  enrobé », une accroche là où les cinq autres services ont un nom court) : le run
  du 20/09 demandait de le trancher « avant ou pendant » ce chantier. **Non touché** :
  c'est du contenu visible, et le client a figé la formule « Finition soignée /
  Travail de qualité ». Le corriger de ma propre initiative risquait d'écraser un
  libellé validé. **Reste à soumettre au client** (voir « Hypothèses à vérifier »).
- **Le volet *ombrage* des parkings > 1 500 m²** (fiche F38106, repéré le 13/09) :
  écarté ici, il relève du drainage/urbanisme déjà traité sur `/drainage-pentes`
  et `/maconnerie-generale` (parkings > 500 m², seuil des 50 unités) ; le remettre
  ici aurait fait doublon. L'angle finition/fin de chantier était plus propre à la
  page et non couvert ailleurs.
- **Reformater les 60 erreurs prettier du fichier** : hors périmètre, aurait mêlé
  du bruit de formatage au diff de contenu.


## Archivé le 23/10/2026 (entrées du 22/09/2026)

### Positions mesurées — 22/09/2026

**Indexation : toujours nulle, 15 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, toutes reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Exactement les mêmes concurrents
   français qu'aux 20 et 21/09 (mavrotp, aravis-enrobage, pajot-tp, perenia,
   abers-amenagement, europavage68, cuinet) + deux brevets USPTO + Pinterest.
   **Inchangé.**
2. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, neuf fiches d'annuaire
   (kompass, pappers, verif, societe, pagesjaunes, 118000, lagazettefrance,
   nosartisansontdutalent, manageo). **Inchangé.**
3. **`site:hcebtp.com`** → dix pages sans rapport (Wikipédia d'acronymes,
   chnbtp.com, Facebook HBTP), **zéro résultat du domaine**. L'opérateur `site:`
   n'est toujours pas honoré par ce canal. **Inchangé.**

| Requête | Mesure (22/09/2026) | Évolution vs 21/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui.**

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot), avant le chantier du jour : **identique au 21/09 au caractère
près sur les douze URLs**. Après déploiement, une seule valeur a bougé :

| URL | Texte servi (22/09) | vs 21/09 | JSON-LD |
|---|---|---|---|
| accueil | 5 499 car. | = | 3 |
| `/realisations` | 6 258 car. | = | 4 |
| `/services/bordures-murets` | 7 012 car. | = | 4 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 |
| **`/realisations/parking-voirie-pro`** | **6 356 car.** | **+5 955** | **2 → 3** |
| `/realisations/preparation-terrassement` | 400 car. | = | 2 |
| `/realisations/cour-allee-privee` | 399 car. | = | 2 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 |

Les 12 URLs du sitemap répondent 200. **Les trois dossiers non touchés sont
inchangés au caractère près** — le chantier du jour n'a rien débordé.

> ⚠️ **`scripts/check-contenu-fige-prod.mjs` ne tourne plus depuis le runner** :
> il s'arrête sur « SUPABASE_PUBLISHABLE_KEY manquante (clé anon publique) ». Ce
> n'est pas une régression du site — la variable n'est simplement pas dans
> l'environnement du runner. **`check-contenu-fige.mjs` (version repo), lui,
> tourne et sort « aucune régression »** : c'est lui qu'il faut utiliser comme
> garde-fou avant de pousser. À creuser un jour si le contrôle *en production*
> devient nécessaire ; en attendant, ne pas confondre l'échec de l'outil avec un
> problème du site.


### 22/09/2026 — `/realisations/parking-voirie-pro` passe de 401 à 6 356 caractères : le premier des quatre dossiers de réalisations sort de la maigreur, sur la réfection d'un parking professionnel

**Chantier choisi** : enrichir `/realisations/parking-voirie-pro`. Le run du
21/09 avait acté que « le filon page service maigre est épuisé » et laissait
trois candidats : le `lastmod` du sitemap, un second bloc de Q/R sur le hub
`/realisations`, ou l'un des quatre dossiers à ~400 caractères.

**Pourquoi celui-là.** Trois raisons dans cet ordre.
1. **C'est la seule URL du site qui vise « réfection parking enrobé Jura »**,
   l'une des six requêtes commerciales suivies depuis le 07/09 — et elle ne
   servait que 401 caractères, donc aucune chance d'y ressortir un jour.
2. **Les quatre dossiers sont désormais les pages les plus maigres du site**
   (373 à 401 car. contre 3 783 à 7 012 pour les services). Le déséquilibre est
   le plus grand du sitemap.
3. **La matière existait, sourcée et non couverte ailleurs** : le volet ombrage
   des parkings, repéré le 13/09 et jamais exploité (écarté à juste titre de
   `/services/finitions-soignees` le 21/09 comme hors sujet), trouve ici sa page
   naturelle. Le `lastmod` du sitemap, lui, reste un chantier court et sûr —
   bon repli pour un jour chargé, mais faible impact.

**Ce qui a été fait**, sur le patron exact des blocs `savoir` des pages service
(réponse autonome de 2-3 phrases en tête de chaque H3, questions formulées comme
on les pose à voix haute, chiffres et sources primaires, `FAQPage` construit
depuis le **même** tableau que la section visible) :
- **Nouveau tableau `REAL_SAVOIR`** dans `realisations.$slug.tsx`, à côté de
  `REAL_META` et sur le même modèle. **Seul `parking-voirie-pro` a une entrée** :
  pour les trois autres dossiers, la section et le `FAQPage` ne sont tout
  simplement pas émis. C'est l'extension propre pour les prochains runs.
- **Nouveau composant `CategorySavoir`**, rendu **dans les deux états servis**
  (branche `loading` et page complète), exactement comme `SeeAlso`. C'est la
  leçon des 14 et 15/09 appliquée d'emblée : la branche `loading` **est** le
  seul état rendu côté serveur sur ces pages, donc tout ce qui n'y figure pas
  est invisible aux robots.
- **5 Q/R sourcées**, sur un angle qu'aucune autre page du site ne couvre (les
  Q/R existantes sur le stationnement, l'urbanisme, les eaux pluviales et le
  BBSG ont été relues une par une avant rédaction pour éviter le doublon) :
  1. *Faut-il refaire tout un parking, ou seulement la couche de surface ?* —
     les signes qui distinguent une couche de roulement en fin de vie d'un corps
     de chaussée qui travaille ; **NF P98-086**, homologuée le 17/05/2019, en
     vigueur (réexamen systématique au 17/05/2029), qui « détaille la démarche
     de vérification des épaisseurs des couches » et couvre six familles de
     structures.
  2. *Quelle épaisseur d'enrobé pour un parking qui reçoit des camions ?* — il
     n'y a pas d'épaisseur standard : c'est le trafic poids lourds, la portance
     du sol et la durée de service qui commandent, pas la surface. La norme
     exclut de son domaine les matériaux à l'émulsion et les matériaux
     modulaires.
  3. *Pourquoi un parking s'ornière-t-il là où les véhicules manœuvrent et
     stationnent ?* — charge lente, répétée, parfois immobile + viscosité du
     liant ; **essai d'orniérage NF EN 12697-22+A1** (décembre 2023, en
     vigueur), charge roulante à température constante, mélanges de Dmax ≤ 32 mm,
     applicable aussi à des éprouvettes prélevées dans une chaussée existante
     (donc utilisable en expertise d'un parking déjà posé).
  4. *Combien de places accessibles faut-il prévoir, et de quelle taille ?* —
     **2 % minimum du total, 3,30 m × 5 m, dévers ≤ 2 %, raccordement sans
     ressaut de plus de 2 cm, 1,40 m horizontal depuis la place** ; **arrêté du
     20 avril 2017, article 3**, lu sur Légifrance. Relié explicitement à la
     pente de 1,5 % qu'annonce déjà `/services/drainage-pentes` : les deux
     contraintes sont compatibles (1,5 % < 2 %) mais se vérifient au plan.
  5. *Faut-il ombrager un parking que l'on refait ?* — **plus de 500 m² en
     construction ou rénovation lourde, 50 % de la surface, un arbre pour trois
     emplacements ; parcs existants de plus de 1 500 m² concernés depuis juillet
     2026** (échéance désormais passée) ; **article L111-19-1 du code de
     l'urbanisme**, fiche `entreprendre.service-public.gouv.fr/vosdroits/F38106`
     (mise à jour affichée : 22/07/2025), lue ce jour.
- **4 sources primaires vérifiées ce jour** et liées dans la page : Norm'Info
  AFNOR pour NF P98-086, boutique AFNOR pour NF EN 12697-22+A1, Légifrance pour
  l'article 3 de l'arrêté du 20/04/2017, service-public entreprendre pour
  l'ombrage. « Dernière mise à jour : 22 septembre 2026 » visible.
- **Report dans `public/llms.txt`** (entrée du dossier enrichie + date passée au
  22/09).
- **Soumission IndexNow** des 12 URLs après déploiement → HTTP 200.

**Mesures.** Banc d'essai local monté selon la recette du 15/09 ; **il
reproduisait la production au caractère près avant modification** (401 / 399 /
5 499). Après : **401 → 6 356 caractères, 2 → 3 blocs JSON-LD**, re-mesuré
identique en production après déploiement. `verif-faq.mjs` : **5/5 questions et
5/5 réponses retrouvées dans le HTML visible**, en local comme en production.
`npx tsc --noEmit` propre, `npm run build` en 0, **`npx eslint` à 0 problème sur
le fichier** (voir l'erreur corrigée du jour), `check-contenu-fige.mjs` sans
régression.

**Ce que je n'ai PAS fait, et pourquoi** :
- **Les trois autres dossiers** (`cour-allee-privee`, `preparation-terrassement`,
  `chantier-en-cours`, toujours à 373-400 car.) : un chantier mené à fond vaut
  mieux que quatre bâclés, et chacun demande sa propre recherche de sources sous
  peine de recycler les mêmes Q/R. `REAL_SAVOIR` les attend, il suffit d'ajouter
  une entrée. **Ce sont les meilleurs candidats du prochain run.**
- **Donner une épaisseur ou une granulométrie chiffrée** : toujours aucune source
  primaire lisible depuis le runner (thread ouvert depuis le 11/09). La page dit
  explicitement *pourquoi* il n'y a pas de chiffre standard plutôt que d'en
  inventer un — ce qui est d'ailleurs plus distinctif que le contraire.
- **Le `lastmod` du sitemap** : reporté, faible impact comparé à 6 000
  caractères sur une requête cible.
- **Toucher au `title` de `finitions-soignees`** : inchangé, toujours en attente
  d'arbitrage client (voir « Hypothèses à vérifier »).


## Archivé le 24/10/2026 (entrées du 23/09/2026)

### Positions mesurées — 23/09/2026

**Indexation : toujours nulle, 16 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Exactement les mêmes concurrents
   français qu'aux 20, 21 et 22/09 (mavrotp, aravis-enrobage, pajot-tp, perenia,
   abers-amenagement, europavage68, cuinet) + deux brevets USPTO + Pinterest.
   **Inchangé.**
2. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, les mêmes neuf fiches
   d'annuaire (kompass, pappers, verif, societe, pagesjaunes, 118000,
   lagazettefrance, nosartisansontdutalent, manageo). **Inchangé.**
3. **`site:hcebtp.com`** → dix pages sans rapport (Wikipédia d'acronymes,
   chnbtp.com, h-btp.com, hsabati.com), **zéro résultat du domaine**. L'opérateur
   `site:` n'est toujours pas honoré par ce canal. **Inchangé.**

| Requête | Mesure (23/09/2026) | Évolution vs 22/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui.**

> 🔔 **Notification envoyée au client le 23/09/2026, et cadence à respecter.**
> Le run du jour a **notifié** que l'indexation est nulle depuis 16 jours et que
> les trois leviers restants (revendiquer la fiche PagesJaunes
> `pagesjaunes.fr/pros/52322496`, revendiquer la fiche Google Business Profile
> existante, ajouter `www.hcebtp.com` à la Search Console) demandent **ses
> accès**, pas du code. **Ne pas re-notifier ce même blocage tous les jours :**
> une alerte quotidienne sur un fait inchangé perd son sens le jour où quelque
> chose bougera vraiment. **Règle posée ici : re-notifier au plus tôt le
> 30/09/2026** (une fois par semaine), ou immédiatement si l'indexation arrive,
> si une position mesurable apparaît, ou si un contrôle casse. Les runs
> intermédiaires journalisent, ils n'alertent pas.

> 📉 **Constat de fond, seizième jour : l'extrait kompass renvoyé par la
> recherche du jour affiche encore « 36 Avenue Etienne Lamy », l'ANCIENNE
> adresse.** C'est cohérent avec ce que le journal sait depuis le 09/09 (36 =
> ancien siège, avril 2025 → avril 2026). Cela ne tranche toujours PAS le
> statut de la fiche elle-même — voir le point 13 des chantiers en attente,
> et la nouvelle tentative de lecture ci-dessous.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot), **avant** le chantier du jour : identique au 22/09 au
caractère près sur les douze URLs. **Après** déploiement, une seule valeur a
bougé :

| URL | Texte servi (23/09) | vs 22/09 | JSON-LD |
|---|---|---|---|
| accueil | 5 499 car. | = | 3 |
| `/realisations` | 6 258 car. | = | 4 |
| `/services/bordures-murets` | 7 012 car. | = | 4 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 |
| **`/realisations/cour-allee-privee`** | **7 670 car.** | **+7 271** | **2 → 3** |
| `/realisations/preparation-terrassement` | 400 car. | = | 2 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 |

Les 12 URLs du sitemap répondent 200. **Les onze URLs non touchées sont
inchangées au caractère près.** `scripts/verif-faq.mjs` (nouveau, versionné ce
jour) passe en **✓ sur les sept FAQPage du site**, en local comme en production.
Soumission IndexNow des 12 URLs après déploiement : **HTTP 200**.

### 23/09/2026 — `/realisations/cour-allee-privee` passe de 399 à 7 670 caractères : le deuxième dossier sort de la maigreur, sur tout ce qui se joue à la limite de la propriété (commit `eafd0a3`)

**Pourquoi cette page, et pourquoi cet angle.** C'était le candidat n°1 laissé
par le run du 22/09 : 399 caractères servis, et la seule URL du site qui vise
« goudronnage cour maison Jura », une des six requêtes suivies. Le run du 22/09
avait posé une réserve explicite — **risque de doublon** avec
`/services/enrobe-a-chaud` (goudronnage, BBSG, 150 °C, hiver dans le Jura,
médaillons) et `/services/drainage-pentes` (pente de 1,5 %, flaques, eau chez le
voisin). Les deux blocs ont été relus avant d'écrire une ligne, et l'angle
retenu est celui qu'il suggérait : **tout ce qui se passe à la limite de la
propriété**, sujet jamais abordé nulle part sur le site. Aucune des cinq
questions ne recoupe une question déjà publiée (vérifié sur les 30 `q:` de
`services.$slug.tsx`).

**Ce qui a été fait.** Une entrée `cour-allee-privee` ajoutée à `REAL_SAVOIR`
dans `src/routes/realisations.$slug.tsx`. L'infrastructure posée le 22/09 a
tenu sa promesse : **aucune autre ligne de code n'a été nécessaire** — le
composant `CategorySavoir` et le `FAQPage` de `head()` se branchent sur la seule
présence de la clé. Cinq Q/R, chacune ouverte par une réponse autonome de deux à
trois phrases, chacune adossée à un texte primaire relu mot pour mot sur
Légifrance ou service-public.gouv.fr :

1. **« Faut-il une autorisation pour raccorder une allée privée à la route ? »**
   — art. **L113-2 du code de la voirie routière** (en vigueur depuis le
   28/12/2007), cité in extenso : permission de voirie s'il y a emprise, permis
   de stationnement sinon, autorisations « délivrées à titre précaire et
   révocable ». Complété par **L111-1** (le domaine public routier est celui de
   l'État, des départements **et** des communes), qui répond à la vraie question
   pratique : à quel guichet s'adresser.
2. **« Peut-on buser le fossé qui longe la route pour élargir son entrée ? »**
   — le fossé est une dépendance du domaine public routier ; le buser est une
   emprise. Sans autorisation : **art. R\*116-2** (en vigueur depuis le
   01/03/1994), alinéas 1° et 6° cités mot pour mot, contravention de 5e classe
   → **1 500 € au plus, 3 000 € en récidive** (**art. 131-13 du code pénal**).
3. **« Une entreprise sonne et propose du goudronnage “avec l'enrobé qui
   reste” : que dit la loi ? »** — **art. L221-10 du code de la consommation**
   (en vigueur depuis le 01/07/2016), premier alinéa cité in extenso : aucun
   paiement avant sept jours. Plus les quatorze jours de rétractation
   (**L221-18**, prolongés de douze mois si l'information n'a pas été donnée) et
   l'obligation de contrat écrit, daté, signé, avec formulaire de rétractation
   (fiche **F23224** de `entreprendre.service-public.gouv.fr`, qui donne aussi
   la sanction de l'encaissement anticipé : 2 ans et 150 000 €).
4. **« Qui paie le goudronnage d'un chemin d'accès partagé ? »** — **art. 697 et
   698 du code civil**, cités mot pour mot : les ouvrages sont à la charge du
   bénéficiaire de la servitude, pas du propriétaire du fonds assujetti, sauf
   titre contraire. Et **art. 682** pour le cas de l'enclave.
5. **« L'eau d'une cour goudronnée peut-elle être renvoyée vers la route ? »**
   — **art. R\*116-2, 4°**, cité mot pour mot (substances laissées écouler sur
   les voies publiques). Facette du drainage jamais traitée : `drainage-pentes`
   couvre le **voisin** (Code civil 640/641) et les flaques, pas la **voie
   publique**.

`public/llms.txt` a été mis à jour dans la foulée (la ligne du dossier résumait
la galerie, elle décrit maintenant aussi les cinq réponses et leurs textes).

**Outillage : `scripts/verif-faq.mjs` est enfin versionné.** Le journal le
citait comme un outil existant depuis le 11/09 — **il ne l'était pas** : chaque
run le réécrivait en jetable, et c'est exactement ce qui a produit le faux
mismatch du 22/09. La version versionnée fige la règle apprise ce jour-là :
**décodage des entités HTML des DEUX côtés avant comparaison**, plus la
normalisation des apostrophes typographiques et des espaces insécables. Elle
sort en code 1 dès qu'une Q ou une R du JSON-LD manque au visible, et elle
signale aussi un bloc JSON-LD illisible.

**Contrôles avant push, tous au banc d'essai local (recette du 15/09) :**
- Banc d'essai **fidèle à la production au caractère près sur les douze URLs**
  avant modification — la mesure avant/après est donc comparable.
- `/realisations/cour-allee-privee` : **399 → 7 670 caractères**, JSON-LD
  **2 → 3**. **Les onze autres URLs : identiques au caractère près.**
- `verif-faq.mjs` : **5/5 questions et 5/5 réponses** sur la nouvelle page, et
  **aucune régression** sur les six autres FAQPage du site (accueil 6/6,
  `/realisations` 4/4, `parking-voirie-pro` 5/5, trois pages service 5/5).
- `npx tsc --noEmit`, `npx eslint`, `npx prettier --check` : propres.
- `node scripts/check-contenu-fige.mjs` : « aucune régression ».
- Diff vs `HEAD` : **purement additif** sur le `.tsx` (54 lignes ajoutées, 0
  retirée), une ligne remplacée dans `llms.txt`.

**Vérifié en production après déploiement** : 7 670 caractères, `verif-faq.mjs`
✓, les onze autres URLs inchangées, IndexNow HTTP 200 sur les 12 URLs.

**Ce qui a été volontairement PAS fait aujourd'hui, et pourquoi :**
- **Aucune promesse commerciale inventée.** Une première rédaction disait
  « aucune somme demandée le jour même : c'est ainsi qu'HCE travaille ».
  C'était un engagement que le client n'a jamais formulé. Réécrit en « ces trois
  règles s'imposent à toute entreprise qui vient chez vous, HCE comprise », qui
  est juridiquement exact et n'invente rien. La formule figée **« devis
  détaillé »** a été reprise telle quelle.
- **Aucune épaisseur ni granulométrie d'enrobé.** Le thread ouvert le 11/09
  reste ouvert : pas de source primaire lisible et gratuite. Le blocage est
  contourné, pas résolu.
- **Rien touché au technique pour l'indexation.** Conformément au verdict du
  20/09 : ce chantier a été choisi pour sa valeur propre, pas parce qu'il
  « aiderait l'indexation ». Il ne l'aidera pas.
- **`/realisations/preparation-terrassement` et `chantier-en-cours` non
  traités.** Un seul chantier par jour, mené à fond.

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 25/09/2026

**Indexation : toujours nulle, 18 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Les mêmes concurrents français qu'aux
   20, 21, 22 et 23/09 (mavrotp, aravis-enrobage, pajot-tp, perenia,
   abers-amenagement, europavage68, cuinet) + **lizetp.com, nouveau dans le
   jeu** + un brevet USPTO. **Inchangé sur le fond.**
2. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, neuf fiches d'annuaire
   (kompass, pappers, verif, **doctrine**, societe, pagesjaunes, 118000,
   lagazettefrance, manageo). `nosartisansontdutalent` est sorti du jeu au
   profit de `doctrine` — simple rotation du canal, aucune conséquence.
   **Inchangé.**
3. **`site:hcebtp.com`** → dix pages sans rapport (Wikipédia d'acronymes,
   chnbtp.com, Facebook HBTP), **zéro résultat du domaine**. L'opérateur
   `site:` n'est toujours pas honoré par ce canal. **Inchangé.**

| Requête | Mesure (25/09/2026) | Évolution vs 23/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui.**

> 🔕 **Pas de notification client aujourd'hui, et c'est volontaire.** La règle
> posée le 23/09 tient : re-notifier au plus tôt le **30/09/2026**, ou
> immédiatement si l'indexation arrive, si une position mesurable apparaît, ou
> si un contrôle casse. Rien de tout cela n'est survenu : le run journalise, il
> n'alerte pas. **Le 30/09 est donc toujours la prochaine échéance d'alerte.**

> ⚠️ **Il n'y a pas eu de run SEO le 24/09/2026.** Le seul commit de cette
> date, `503e6ab` (« remplace visuel survol service Finitions et médaillon
> Maçonnerie »), est une **modification d'images hors run SEO** : aucune entrée
> de journal, et aucun effet mesurable sur le texte servi (les douze URLs
> étaient au caractère près sur les valeurs du 23/09 au début du run du jour).
> Ne pas chercher une entrée manquante du 24/09, il n'y en a pas.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot), **avant** le chantier du jour : identique au 23/09 au
caractère près sur les douze URLs. **Après** déploiement, une seule valeur a
bougé :

| URL | Texte servi (25/09) | vs 23/09 | JSON-LD |
|---|---|---|---|
| accueil | 5 499 car. | = | 3 |
| `/realisations` | 6 258 car. | = | 4 |
| `/services/bordures-murets` | 7 012 car. | = | 4 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 |
| `/realisations/cour-allee-privee` | 7 670 car. | = | 3 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 |
| **`/realisations/preparation-terrassement`** | **8 156 car.** | **+7 756** | **2 → 3** |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 |

**C'est désormais la page la plus longue du site** (8 156 car., devant
`cour-allee-privee` à 7 670). Les 12 URLs du sitemap répondent 200, **les onze
URLs non touchées sont inchangées au caractère près**, `scripts/verif-faq.mjs`
passe en **✓ sur les huit FAQPage du site** en local comme en production, et la
soumission IndexNow des 12 URLs après déploiement sort en **HTTP 200**.

<!-- section d'origine : Chantiers faits -->
### 25/09/2026 — `/realisations/preparation-terrassement` passe de 400 à 8 156 caractères : le troisième dossier sort de la maigreur, sur ce qui se joue sous la surface (commit `68f7a52`)

**Pourquoi cette page.** C'était le candidat n°1 laissé explicitement par le run
du 23/09 : 400 caractères servis, l'avant-dernier dossier maigre, et une
infrastructure entièrement rodée — **une entrée dans `REAL_SAVOIR` suffit**,
`CategorySavoir` et le `FAQPage` se branchent seuls. Vérifié une troisième fois
aujourd'hui : c'est bien le cas, aucune autre ligne de code n'a été nécessaire.

**Le risque du jour était le doublon, et il a été traité avant de rédiger.**
`/services/preparation-terrain` est déjà dense et couvre DT-DICT, les délais de
neuf et sept jours calendaires, la validité de trois mois, les terres excavées
(décret n° 2021-321, Trackdéchets), la définition du VRD et le compactage par
couches. **Ses cinq Q/R ont été relues intégralement avant d'écrire une ligne**,
et aucune des cinq nouvelles questions ne les recoupe : là où la page service
répond « qui prévenir et quand », le dossier répond « ce que le sol impose ».

**Les cinq questions, et pourquoi chacune tient.**
1. *Faut-il une autorisation d'urbanisme pour terrasser un terrain ?* — **le
   thread ouvert le 12/09 et jamais résolu est enfin tranché, sources en main.**
   Déclaration préalable pour les affouillements et exhaussements qui excèdent
   **deux mètres ET portent sur 100 m² ou plus** (article R\*421-23 f du code de
   l'urbanisme, en vigueur depuis le 01/01/2016, texte cité mot pour mot) ;
   **permis d'aménager** au-delà de deux mètres ET **deux hectares** (article
   R\*421-19 k, **version en vigueur depuis le 29/07/2026** — c'est une version
   très récente, la citer datée est un avantage net sur la concurrence). Deux
   précisions ajoutées parce qu'elles évitent les erreurs réelles : les seuils
   sont **cumulatifs**, et « excède deux mètres » se lit **au point le plus
   profond, pas en moyenne**.
2. *Comment sait-on si le sol peut porter une cour ou un parking ?* — la
   classification des matériaux : **NF EN 16907-2** « Terrassement — Partie 2 :
   classification des matériaux », publiée le **07/09/2019**, complétée en France
   par **NF P11-300** « Terrassements — Classification complémentaire des
   matériaux de terrassement », publiée le **22/01/2025** (c'est la filiation de
   ce que le métier appelle « classification GTR »). L'idée exploitable : un sol
   se décrit par granulométrie, argilosité et **état hydrique**, et c'est ce
   troisième paramètre qui décide — le même limon est réutilisable sec et
   inutilisable détrempé.
3. *Comment vérifie-t-on qu'une plateforme est réellement bien compactée ?* —
   **NF P94-105**, version publiée le **15/10/2025** (elle remplace celle d'avril
   2012), méthode au **pénétromètre dynamique à énergie variable**. Son domaine
   couvre les remblais courants à fonction routière et **les remblais de fouilles
   et de tranchées** : exactement le cas de la tranchée de réseau rebouchée qui
   s'affaisse deux hivers plus tard.
4. *À quelle période de l'année terrasser dans le Jura ?* — **normales 1991-2020
   de la station Météo-France de Champagnole (39097003, alt. 537 m)** :
   **1 573,2 mm de précipitations par an**, sur **143,6 jours de pluie ≥ 1 mm**,
   décembre (**167,9 mm**) et novembre (**158,6 mm**) étant les mois les plus
   arrosés devant octobre (145,2 mm), avril (113,2 mm) et février (116,4 mm) les
   plus secs. Le lien avec la question 2 est ce qui rend le passage citable : la
   pluie change l'**état hydrique**, donc la classe du sol, donc ce qu'on a le
   droit d'en faire.
5. *Peut-on réutiliser la terre du chantier au lieu de l'évacuer ?* — **arrêté du
   4 juin 2021**, sortie du statut de déchet des terres excavées : **cinq
   critères cumulatifs** (article 2), **contrat de cession** détaillant origine,
   période d'excavation, volume, site receveur et préparations effectuées, et
   surtout l'**interdiction des opérations de mélange destinées à atteindre les
   critères de qualité** — le point contre-intuitif que personne ne publie côté
   concurrence.

**Contrôles, tous passés avant le push.** Banc d'essai local monté selon la
recette du 15/09 (`git archive HEAD | tar -x`, `npm install`, `npx vite dev
--host 127.0.0.1 --port 4175`) : **le local a donné 400 / 373 / 5 499 sur les
trois URLs témoins, exactement les valeurs de la production le même jour — la
fidélité du banc est confirmée pour la troisième fois.** Puis, le même script
des deux côtés : **400 → 8 156 caractères**, JSON-LD **2 → 3**, et les onze
autres URLs inchangées au caractère près. `verif-faq.mjs` : **5/5 sur la
nouvelle page et ✓ sur les sept autres FAQPage**, en local puis en production.
`npx tsc --noEmit`, `npx eslint` sur le fichier, `npx prettier --check` et
`npm run build` sortent tous en 0 ; `check-contenu-fige.mjs` ne signale aucune
régression.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**
- **Ne pas prétendre que les terres réutilisées sur leur propre site sortent du
  champ des déchets.** C'est la formulation de la directive européenne, et
  l'hypothèse de départ du run était qu'elle figurait à l'article **L541-4-1 du
  code de l'environnement**. **Vérification faite sur Légifrance : elle n'y est
  pas.** L'article exclut les sols **non excavés**, les sédiments déplacés dans
  les eaux de surface, les effluents gazeux, etc. — pas les terres réutilisées
  sur place. La question 5 a donc été recentrée sur ce qui est réellement
  sourcé : l'arrêté du 4 juin 2021. **Ne pas rouvrir cette piste sans un texte
  français qui la porte noir sur blanc.**
- **Ne pas publier les moyennes `Rr ≥ 5 mm` (91,4 j) et `Rr ≥ 10 mm` (56,9 j)**
  de la fiche Météo-France. La somme des douze mois donne 91,6 et 56,7 : un écart
  de 0,2 imputable aux arrondis mensuels, sans doute bénin, mais la règle du
  17/09 dit que **seul un chiffre dont le total annuel tombe juste se publie**.
  Les deux valeurs retenues (1 573,2 mm et 143,6 j) tombent **exactement** juste.
- **Ne pas affirmer que NF EN 16907-2 remplace la NF P11-300 de 1992.** La fiche
  Norm'Info ne le dit pas, et la NF P11-300 de 2025 porte un titre différent
  (« classification **complémentaire** »). Les deux normes sont donc citées côte
  à côte, sans relation de remplacement inventée.
- **Ne pas toucher au dernier dossier maigre `chantier-en-cours`** (373 car.) :
  un chantier par jour, et c'est le plus difficile à sourcer honnêtement.
- **Ne pas notifier le client** : la cadence hebdomadaire posée le 23/09
  s'applique, prochaine échéance le 30/09.

## Archivé le 27/10/2026 (entrées du 27/09/2026)

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 27/09/2026

**Indexation : toujours nulle, 20 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Les mêmes concurrents français qu'aux
   20, 21, 22, 23 et 25/09 (mavrotp, pajot-tp, aravis-enrobage,
   abers-amenagement, europavage68, perenia, cuinet) + deux brevets USPTO +
   Pinterest. `lizetp.com`, apparu le 25/09, est ressorti du jeu — simple
   rotation. **Inchangé sur le fond.**
2. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, neuf fiches d'annuaire
   (kompass, pappers, verif, doctrine, societe, pagesjaunes, 118000,
   lagazettefrance, manageo) — **exactement les mêmes qu'au 25/09**. Le résumé
   du moteur dit lui-même « the website hcebtp.com mentioned in your query did
   not appear in the search results ». **Inchangé.**
3. **`site:hcebtp.com`** → neuf pages sans rapport (Wikipédia d'acronymes HTP /
   HCB / HBD, chnbtp.com, Facebook HBTP), **zéro résultat du domaine**.
   L'opérateur `site:` n'est toujours pas honoré par ce canal. **Inchangé.**

| Requête | Mesure (27/09/2026) | Évolution vs 25/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui** (3 requêtes, 3 réponses
exploitables). Les canaux de SERP brute n'ont **pas** été re-testés : la liste
du 11/09 est à jour et tous étaient morts. Ne pas y perdre de temps demain.

> 🔕 **Pas de notification client aujourd'hui, et c'est volontaire.** La règle du
> 23/09 tient : re-notifier au plus tôt le **30/09/2026**, ou immédiatement si
> l'indexation arrive, si une position mesurable apparaît, ou si un contrôle
> casse. Rien de tout cela n'est survenu. **Le 30/09 reste la prochaine
> échéance d'alerte — c'est dans trois jours, et c'est le run du 30 qui doit
> la déclencher.**

> ⚠️ **Il n'y a pas eu de run SEO le 26/09/2026.** Aucun commit, aucune entrée
> de journal à cette date : le dernier run est celui du 25/09. Ne pas chercher
> une entrée manquante. Conséquence pratique : le candidat n°1 désigné « pour le
> 26/09 » (le `lastmod`) a été repris aujourd'hui, tel quel.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot), **avant** le chantier du jour : identique au 25/09 **au
caractère près sur les douze URLs**. **Après** déploiement : **identique
également, sur les douze URLs** — le chantier du jour ne touche pas au rendu,
et c'est mesuré, pas supposé (voir « Chantiers faits »).

| URL | Texte servi (27/09) | vs 25/09 | JSON-LD | lastmod |
|---|---|---|---|---|
| accueil | 5 499 car. | = | 3 | *(aucun, volontaire)* |
| `/realisations` | 6 258 car. | = | 4 | 2026-09-20 |
| `/services/bordures-murets` | 7 012 car. | = | 4 | 2026-09-17 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 | 2026-09-21 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 | 2026-09-13 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 | 2026-09-16 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 | 2026-09-12 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 | 2026-09-11 |
| `/realisations/cour-allee-privee` | 7 670 car. | = | 3 | 2026-09-23 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 | 2026-09-22 |
| `/realisations/preparation-terrassement` | 8 156 car. | = | 3 | 2026-09-25 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 | *(aucun, volontaire)* |

Les 12 URLs du sitemap répondent 200, `scripts/verif-faq.mjs` passe en **✓ sur
les onze FAQPage** en local comme en production, le nouveau
`scripts/verif-lastmod.mjs` passe en **✓ sur les 12 URLs** en production, et la
soumission IndexNow des 12 URLs après déploiement sort en **HTTP 200**.

<!-- section d'origine : Chantiers faits -->
### 27/09/2026 — Le sitemap a enfin un `lastmod`, et il ne peut plus mentir : il lit la date que la page affiche (commit `51d45aa`)

**Chantier choisi, et pourquoi.** Le `lastmod` était le candidat n°1 désigné par
le run du 25/09 pour le 26/09 — qui n'a pas eu lieu. Il était en attente depuis
le 09/09 (point n°4 des chantiers en attente), soit **dix runs**, toujours repoussé
parce qu'il fallait « des dates honnêtes » et qu'on ne savait pas où les prendre.
L'indexation reste nulle, et le corollaire posé le 20/09 s'applique : **ne plus
ouvrir un chantier au motif qu'il aiderait l'indexation** — celui-ci est pris pour
sa valeur propre, le jour où le site sera crawlé.

**Ce qui a rendu le chantier faisable, et qui n'était écrit nulle part : les dates
honnêtes existaient déjà dans le code.** Chaque page de fond affiche depuis son
enrichissement une mention « Dernière mise à jour : <date> », alimentée par deux
champs `updated` / `updatedLabel` posés à côté du contenu qu'ils datent. Dix des
douze URLs du sitemap en ont une. **Il n'y avait donc rien à inventer ni à
calculer : il fallait relier les deux bouts.**

**Vérification de ces dates avant de s'en servir — ne pas refaire, c'est fait.**
Chacune a été recoupée avec la date du commit qui a réellement modifié le bloc de
contenu concerné, via `git log -L <début>,<fin>:<fichier>` (voir « Techniques
apprises » : c'est l'outil juste pour dater un bloc dans un fichier qui porte
plusieurs pages). **Dix sur dix concordent**, à une nuance près, traitée plus bas.

**Ce qui a été fait :**

1. **`src/lib/lastmod.ts`, nouvelle source unique.** Une table `PAGE_UPDATED`
   qui associe à chaque URL son `{ iso, label }`. Le `label` est écrit en toutes
   lettres et non dérivé de l'`iso` : c'est du texte visible, il n'a pas à dépendre
   d'un formateur d'exécution — et ça garantit que le rendu ne bouge pas d'un
   caractère.
2. **Les trois fichiers de route lisent cette table** au lieu de porter la date
   en dur : `services.$slug.tsx` (6 pages), `realisations.$slug.tsx` (3 dossiers),
   `realisations.index.tsx` (le hub). Le champ `updatedLabel` disparaît, `updated`
   devient un `PageUpdate`. **La ligne reste physiquement à côté du contenu
   qu'elle date** — c'est délibéré : un futur run qui enrichit un bloc voit la
   clé et sait quoi modifier.
3. **Le sitemap émet `<lastmod>` depuis la même table.** 10 URLs en ont un ; les
   deux qui n'affichent aucune date — l'accueil et `/realisations/chantier-en-cours`
   — **sortent volontairement sans `lastmod`**, ce que la spécification autorise
   (l'élément est facultatif par URL).
4. **`scripts/verif-lastmod.mjs`, versionné.** Il lit le sitemap servi, puis
   chaque page servie, et vérifie trois choses par URL : une page qui affiche une
   date a un `lastmod` et réciproquement ; le `lastmod` égale le `datetime` de la
   balise `<time>` ; le libellé en toutes lettres désigne bien le même jour.
   Sortie en code 1 à la première incohérence.

**Pourquoi la source unique, plutôt qu'une table de dates recopiée dans le
sitemap.** Google n'accorde de crédit au `lastmod` que s'il le juge fiable, et il
en juge **en le comparant à ce que voit l'utilisateur**. Un `lastmod` qui
contredit la page fait ignorer le `lastmod` de **tout** le sitemap — on perdrait
alors le signal sur les pages honnêtes aussi. Deux valeurs recopiées à la main
finissent toujours par diverger : `llms.txt` est dans ce journal depuis le
premier jour comme l'exemple de ce que devient une donnée statique dupliquée.

**Le contrôle négatif, et c'est ce qui rend le script crédible.** Un vérificateur
qui n'a jamais échoué ne prouve rien. Celui-ci a été lancé sur la **production
d'avant le déploiement**, qui affichait les dates mais n'avait pas de `lastmod` :
il est sorti en **✗ 10 incohérences sur 12 URLs, code 1**, en nommant chaque page.
Puis en **✓ 12/12** sur le banc d'essai local, puis en **✓ 12/12** en production
après déploiement. **À refaire pour tout nouveau script de contrôle : le faire
échouer une fois exprès avant de lui faire confiance.**

**Preuve que le rendu n'a pas bougé — mesurée, pas supposée.** C'est le seul vrai
risque d'un chantier qui touche trois fichiers de rendu. Banc d'essai local monté
selon la recette du 15/09 : `npm run build` en 0, `npx tsc --noEmit` en 0,
`mesure-texte-servi.mjs` sur le local donnant **exactement les douze valeurs de la
production**, `verif-faq.mjs` en ✓ sur les onze FAQPage. Après déploiement (visible
en production **~60 s** après le `git push origin HEAD:main`), les douze valeurs
sont **à nouveau identiques au caractère près**, et `verif-faq.mjs` repasse en ✓
sur les onze FAQPage en production.

**Sur `eslint` : compté, pas supposé** (méthode du 22/09). `services.$slug.tsx`
sortait déjà 60 erreurs `prettier/prettier` à HEAD et en sort 60 après — **le
fichier n'a pas été reformaté**, ça aurait noyé le diff. `realisations.index.tsx`
était propre et mon `<time>` allongé y a créé **une** erreur de formatage :
corrigée par `prettier --write` sur ce seul fichier, diff de 4 lignes, l'espace
préservé par `{" "}`. Les deux fichiers neufs passent `eslint` et `prettier` sans
rien.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**

- **Ne pas dater `/` ni `/realisations/chantier-en-cours`.** Ces deux pages ne
  publient aucune date de mise à jour. Leur en fabriquer une pour « remplir » le
  sitemap est exactement ce qui fait déclasser un `lastmod` entier. Elles sortent
  sans. **Le jour où l'une reçoit un bloc daté, ajouter sa clé dans
  `src/lib/lastmod.ts` suffit** — le sitemap suivra seul.
- **Ne pas passer `/services/maconnerie-generale` au 24/09.** `git log -L` la
  date du **24/09** parce que le commit `503e6ab` y a changé un chemin d'image
  (`/assets/maconnerie-2.png` → `/photos/2.png`), tandis que la page affiche
  **16/09**, date de son bloc Q/R. J'ai gardé le 16/09 : la date visible est une
  date **éditoriale**, elle annonce au lecteur quand le contenu qu'il lit a été
  revu. Un changement de visuel demandé par le client n'est pas une révision du
  contenu, et le `lastmod` doit dire la même chose que la page — c'est toute la
  logique du chantier. Même raisonnement pour l'accueil, daté 24/09 par le même
  commit d'images. **Ne pas « corriger » ces deux dates.**
- **Ne pas toucher au `dateTime` camelCase** rendu par React (`<time dateTime="…">`
  en production au lieu de `datetime`). Les noms d'attributs HTML sont insensibles
  à la casse : c'est valide, les analyseurs le lisent, et `verif-lastmod.mjs` le
  cherche sans tenir compte de la casse. Rien à réparer.
- **Ne pas reformater `services.$slug.tsx`.** 60 erreurs `prettier` préexistantes :
  les corriger aujourd'hui ferait un diff illisible et masquerait le chantier réel.
  Noté comme dette, pas comme urgence.
- **Ne pas toucher à `llms.txt`.** Vérifié en entier ce run : il est daté du
  25/09, et sa section « Pages » couvre bien les douze URLs, hub `/realisations`
  et trois dossiers enrichis compris. **Aucune dérive, rien à faire.**

## Archivé le 28/10/2026 (entrées du 28/09/2026)

### Positions mesurées — 28/09/2026

**Indexation : toujours nulle, 21 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Les mêmes concurrents français qu'aux
   20, 21, 22, 23, 25 et 27/09 (mavrotp, pajot-tp, aravis-enrobage,
   abers-amenagement, europavage68, perenia, cuinet) + deux brevets USPTO +
   Pinterest. **Inchangé, y compris dans l'ordre.**
2. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, neuf fiches d'annuaire
   (kompass, pappers, verif, doctrine, societe, pagesjaunes, 118000,
   lagazettefrance, manageo) — **exactement les mêmes qu'aux 25 et 27/09**.
   **Inchangé.**
3. **`site:hcebtp.com`** → neuf pages sans rapport (Wikipédia d'acronymes HTP /
   HCB / HBD, chnbtp.com, Facebook HBTP), **zéro résultat du domaine**.
   L'opérateur `site:` n'est toujours pas honoré par ce canal. **Inchangé.**

| Requête | Mesure (28/09/2026) | Évolution vs 27/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui** (3 requêtes d'indexation +
5 requêtes de veille et de sourçage, 8 réponses exploitables). Les canaux de
SERP brute n'ont **pas** été re-testés : la liste du 11/09 est à jour, tous
étaient morts. Ne pas y perdre de temps demain.

> 🔕 **Pas de notification client aujourd'hui, et c'est volontaire.** La règle du
> 23/09 tient : la prochaine échéance d'alerte est le **30/09/2026**, soit dans
> deux jours — **c'est le run du 30 qui doit la déclencher**, ou n'importe quel
> run si l'indexation arrive, si une position mesurable apparaît, ou si un
> contrôle casse. Rien de tout cela n'est survenu aujourd'hui.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot). **Avant** le chantier du jour : identique au 27/09 **au
caractère près sur les douze URLs**. **Après** déploiement : seule
`/realisations` bouge, de 6 258 à **13 260** caractères ; les onze autres sont
inchangées au caractère près — mesuré, pas supposé.

| URL | Texte servi (28/09) | vs 27/09 | JSON-LD | lastmod |
|---|---|---|---|---|
| accueil | 5 499 car. | = | 3 | *(aucun, volontaire)* |
| `/realisations` | **13 260 car.** | **+7 002** | 4 | **2026-09-28** |
| `/services/bordures-murets` | 7 012 car. | = | 4 | 2026-09-17 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 | 2026-09-21 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 | 2026-09-13 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 | 2026-09-16 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 | 2026-09-12 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 | 2026-09-11 |
| `/realisations/cour-allee-privee` | 7 670 car. | = | 3 | 2026-09-23 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 | 2026-09-22 |
| `/realisations/preparation-terrassement` | 8 156 car. | = | 3 | 2026-09-25 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 | *(aucun, volontaire)* |

Les 12 URLs du sitemap répondent 200. `scripts/verif-faq.mjs` passe en **✓ sur
les onze FAQPage** en production, dont **8/8 sur `/realisations`** (contre 4/4
hier) — attention, **lancé sans argument il ne contrôle que l'accueil** : lui
passer la liste des URLs pour couvrir tout le site. `scripts/verif-lastmod.mjs`
passe en **✓ sur les 12 URLs**, et la soumission IndexNow des 12 URLs après
déploiement sort en **HTTP 200**.

**Délai de déploiement observé** : ~2 min 30 entre le `git push origin HEAD:main`
et la première réponse de production servant le nouveau contenu (deux essais
espacés de 25 s). Plus lent que les 45 s du 25/09, mais du même ordre : ne pas
s'alarmer avant 5 minutes, et **ne pas juger le déploiement sur
`mesure-texte-servi.mjs`, qui interroge les 12 URLs à chaque essai** — un
`curl` sur la seule page modifiée suffit et va vingt fois plus vite.

### 28/09/2026 — Le hub `/realisations` passe de 6 258 à 13 260 caractères : quatre questions sur ce qui encadre un chantier, dont le taux de TVA que personne ne publie honnêtement (commit `79dca13`)

**Chantier choisi** : le candidat n°1 désigné le 27/09, sans hésitation. Le hub
était la seule page « de fond » du site à ne porter que **4** Q/R quand les
quatre dossiers et les six services en ont 5, et c'est la destination naturelle
d'une requête « réalisations enrobé Jura ». Angle retenu : **ce qui encadre un
chantier d'enrobé une fois les photos prises** — exactement les questions qu'un
client se pose avant de signer, et que les concurrents vus dans les SERP de la
phrase-test ne traitent jamais (ils décrivent leurs prestations, pas le droit ni
la fiscalité qui s'y appliquent).

**Les quatre questions ajoutées** (le bloc passe de 4 à 8 Q/R), toutes sourcées
sur des textes primaires lus verbatim aujourd'hui :

1. **« Comment se passe la réception des travaux d'une cour ou d'un parking ? »**
   — article **1792-6 alinéa 1 du code civil** (en vigueur depuis le 1er janvier
   1979, loi n° 78-12 du 4 janvier 1978), cité mot pour mot : la réception est
   « l'acte par lequel le maître de l'ouvrage déclare accepter l'ouvrage avec ou
   sans réserves », elle intervient « à la demande de la partie la plus
   diligente » et est « en tout état de cause, prononcée contradictoirement ».
   **Le journal du 20/09 citait déjà le PV comme point de départ de la décennale
   sans jamais expliquer l'acte lui-même** : le trou est comblé.
2. **« Un défaut apparaît trois mois après la fin du chantier : qui le
   reprend ? »** — **garantie de parfait achèvement**, article 1792-6 alinéas 2
   à 6. Un an à compter de la réception, **tous** les désordres signalés quelle
   que soit leur gravité, réserves au PV ou « voie de notification écrite » pour
   ceux révélés après ; délais de reprise « fixés d'un commun accord » ; à
   défaut, travaux « aux frais et risques de l'entrepreneur défaillant » après
   mise en demeure infructueuse ; et la limite, verbatim : la garantie « ne
   s'étend pas aux travaux nécessaires pour remédier aux effets de l'usure
   normale ou de l'usage ». La différence de nature avec la décennale (un an
   mais sans tri des désordres / dix ans mais solidité et impropriété seules)
   est posée noir sur blanc.
3. **« Une allée ou une cour en enrobé peut-elle bénéficier de la TVA à 10 % ? »**
   — **la trouvaille du jour, et la plus rentable.** La doctrine fiscale admet
   que « les travaux portant sur les voies d'accès principales à la maison
   d'habitation (allée privative, voie d'accès au garage, etc.) » relèvent du
   taux réduit de l'**article 279-0 bis du CGI**, et l'annexe **BOI-ANNX-000208
   (version du 31/07/2024)** cite **nommément « travaux de revêtement :
   enrobage, dallage et pavage »**, l'abaissement de bordure de trottoir donnant
   accès au garage, et la pose de bordures et caniveaux le long de ces voies.
   Exclus et donc à 20 % : les éléments d'agrément d'espaces verts (piscines,
   bassins d'ornement, éclairage des végétaux) et tout ce qui porte sur un local
   professionnel ou une voirie d'activité, le taux réduit ne visant que les
   locaux à usage d'habitation achevés depuis plus de deux ans. Point pratique
   rarement publié : **c'est le client qui certifie les conditions**, et
   **BOI-TVA-LIQ-30-20-90-30 (version du 22/10/2025)** dit que « le prestataire
   devra conserver à l'appui de sa comptabilité le devis ou la facture sur lequel
   figurent les informations certifiées par le client permettant de bénéficier du
   taux réduit ». **Aucun prix n'est écrit nulle part** — c'est un taux légal,
   pas un tarif, et la règle du simulateur n'est pas touchée.
4. **« Le client doit-il garantir le paiement des travaux avant qu'ils
   commencent ? »** — **article 1799-1 du code civil** (en vigueur depuis le
   1er janvier 2014) et **article 1er du décret n° 99-658 du 30 juillet 1999**
   (rédaction en vigueur depuis le 6 novembre 2014) : seuil de **12 000 € HT**,
   sommes dues entendues du prix convenu « déduction faite des arrhes et
   acomptes versés lors de la conclusion » ; crédit spécifique affecté ou
   cautionnement solidaire ; sursis d'exécution possible « après mise en demeure
   restée sans effet à l'issue d'un délai de quinze jours ». **Et la nuance que
   les blogs juridiques écrasent : le texte écarte expressément l'obligation
   « lorsque le maître de l'ouvrage conclut un marché de travaux pour son propre
   compte et pour la satisfaction de besoins ne ressortissant pas à une activité
   professionnelle en rapport avec ce marché »** — donc un particulier qui fait
   refaire sa cour n'a aucun cautionnement à fournir. Dit comme ça, le passage
   répond à la vraie question posée, dans les deux sens.

**Ce qui a été touché, et rien d'autre** : le tableau `SAVOIR` de
`src/routes/realisations.index.tsx` (4 Q/R → 8, et 2 sources → 7), la date de
`/realisations` dans `src/lib/lastmod.ts` (20/09 → 28/09, source unique de la
date visible **et** du `lastmod` du sitemap), et l'entrée `/realisations` de
`public/llms.txt` + son en-tête « Dernière mise à jour ». **Zéro ligne de code
hors données** : le composant visible et le `FAQPage` lisent le même tableau, ils
se sont branchés seuls — troisième confirmation après les 22, 23 et 25/09 que
cette infrastructure tient.

**Contrôles avant push, tous verts** : banc d'essai local (recette du 15/09,
`npm install` puis `npx vite dev`) mesuré **avant** (6 258 car., exactement la
valeur de production le même jour → banc fidèle) et **après** (13 260 car.) avec
le **même** script ; `verif-faq.mjs` **8/8 questions et 8/8 réponses** ;
`verif-lastmod.mjs` 12 URLs cohérentes ; `tsc --noEmit`, `eslint`,
`prettier --check` et `npm run check:fige` en code 0. **Après déploiement**, les
mêmes contrôles refaits en production : 13 260 car. sur le hub, **onze autres
URLs inchangées au caractère près**, 11 FAQPage ✓, 12 `lastmod` ✓, IndexNow en
HTTP 200.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas ouvrir `/realisations/chantier-en-cours` (373 car.)**, le dernier
  contenu maigre du site. Toujours aucun angle sourçable honnêtement : c'est une
  galerie de chantiers en action, et les deux pistes évoquées depuis le 25/09
  (compactage en cours de pose, fenêtre de mise en œuvre à 150 °C) supposent une
  source primaire chiffrée qui n'existe pas en accès libre — c'est le thread
  ouvert depuis le 11/09 sur les épaisseurs et granulométries. Rien changé à ce
  constat aujourd'hui.
- **Ne pas reporter la Q/R TVA sur `/services/enrobe-a-chaud`**, où elle aurait
  aussi du sens. Un contenu dupliqué entre deux pages du même site se cannibalise,
  et le hub est le bon porteur : il couvre les deux publics (particulier et pro),
  ce que la réponse distingue justement. **Si un jour la page service doit en
  parler, l'angle doit être différent, pas recopié.**
- **Ne pas toucher à l'accueil** le même jour : un chantier par jour, mené au
  bout. L'accueil reste le candidat n°1 du prochain run.
- **Ne pas ajouter de `HowTo`** malgré la consigne de maintenance qui le
  mentionne : aucune page du site n'est procédurale aujourd'hui, et un `HowTo`
  posé sur un contenu qui n'en est pas un est un mismatch. Constat à réévaluer le
  jour où une page décrit vraiment une procédure étape par étape.

## Archivé le 29/10/2026 (entrées du 29/09/2026)

### Positions mesurées — 29/09/2026

**Indexation : toujours nulle, 22 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. Les mêmes concurrents français qu'aux
   20, 21, 22, 23, 25, 27 et 28/09 (mavrotp, pajot-tp, aravis-enrobage,
   abers-amenagement, europavage68, perenia, cuinet) + deux brevets USPTO +
   Pinterest. **Inchangé, y compris dans l'ordre.**
2. **`site:hcebtp.com`** → neuf pages sans rapport (Wikipédia d'acronymes HTP /
   HCB / HBD / HCET, chnbtp.com, Facebook HBTP, hbtp.site), **zéro résultat du
   domaine**. L'opérateur `site:` n'est toujours pas honoré par ce canal.
   **Inchangé.**
3. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, neuf fiches d'annuaire
   (kompass, pappers, verif, doctrine, societe, pagesjaunes, 118000,
   lagazettefrance, manageo) — **exactement les mêmes qu'aux 25, 27 et 28/09, et
   dans le même ordre. Inchangé.**

| Requête | Mesure (29/09/2026) | Évolution vs 28/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui** (3 requêtes d'indexation +
2 requêtes de sourçage, 5 réponses exploitables). Les canaux de SERP brute
n'ont **pas** été re-testés : la liste du 11/09 est à jour, tous étaient morts.

> 🔕 **Pas de notification client aujourd'hui, et c'est volontaire.**
> L'indexation n'a pas bougé, aucune position mesurable n'est apparue, aucun
> contrôle n'a cassé. **⚠️ MAIS : l'échéance d'alerte hebdomadaire au client
> tombe DEMAIN, le 30/09/2026 — c'est le run du 30 qui doit la déclencher.** Ne
> pas la sauter : elle porte les trois actions hors-dépôt (revendiquer la fiche
> PagesJaunes `pros/52322496`, revendiquer la fiche Google Business Profile
> existante, ajouter la propriété dans Search Console), qui restent le seul
> levier connu sur l'indexation.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot). **Avant** le chantier du jour : identique au 28/09 **au
caractère près sur les douze URLs**. **Après** déploiement : seul l'accueil
bouge, de 5 499 à **13 378** caractères ; les onze autres sont inchangées au
caractère près — mesuré, pas supposé.

| URL | Texte servi (29/09) | vs 28/09 | JSON-LD | lastmod |
|---|---|---|---|---|
| accueil | **13 378 car.** | **+7 879** | 3 | **2026-09-29** *(première date)* |
| `/realisations` | 13 260 car. | = | 4 | 2026-09-28 |
| `/realisations/preparation-terrassement` | 8 156 car. | = | 3 | 2026-09-25 |
| `/realisations/cour-allee-privee` | 7 670 car. | = | 3 | 2026-09-23 |
| `/services/bordures-murets` | 7 012 car. | = | 4 | 2026-09-17 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 | 2026-09-21 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 | 2026-09-22 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 | 2026-09-13 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 | 2026-09-16 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 | 2026-09-12 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 | 2026-09-11 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 | *(aucun, volontaire)* |

Les 12 URLs du sitemap répondent 200. `scripts/verif-faq.mjs` passe en **✓ sur
les onze `FAQPage`** en production, dont **11/11 sur l'accueil** (contre 6/6
hier). `scripts/verif-lastmod.mjs` passe en **✓ sur les 12 URLs, dont 11 avec
`lastmod`** (contre 10 hier — l'accueil entre dans la table). La soumission
IndexNow des 12 URLs après déploiement sort en **HTTP 200**.

⚠️ **`scripts/check-contenu-fige-prod.mjs` ne tourne pas depuis le runner** :
il sort sur `SUPABASE_PUBLISHABLE_KEY manquante (clé anon publique)`. Ce n'est
pas une régression du jour, c'est une variable d'environnement absente du
runner. **Contournement utilisé, à reprendre tel quel** :
`check-contenu-fige.mjs` (version dépôt, sans clé) qui passe, **plus** un
`grep` direct sur le HTML servi de la page modifiée. Les six marqueurs figés
sont présents sur l'accueil servi (2012 ×3, « 14 an » ×2, 150 ×3, « à la
main » ×4, « Devis détaillé » ×3, « décennale » ×3) et les sept interdits sont
à zéro. **Piège à ne pas re-découvrir : `grep -c "180"` et `grep -c "48h"`
renvoient des faux positifs** — `sizes="180x180"` de l'apple-touch-icon, des
valeurs CSS, des coordonnées SVG, et `1.448h.005` dans le `path` de l'icône
WhatsApp. Toujours regarder le contexte (`grep -o '.\{30\}180.\{20\}'`)
avant de conclure à une régression.

**Délai de déploiement observé** : entre 1 et 2 minutes entre le
`git push origin HEAD:main` et la première réponse de production servant le
nouveau contenu (3 essais espacés de 30 s, le 3e concluant). Du même ordre que
les 2 min 30 du 28/09. Méthode de contrôle inchangée : un `curl` sur la seule
page modifiée, jamais `mesure-texte-servi.mjs` qui interroge les 12 URLs.

### 29/09/2026 — L'accueil passe de 5 499 à 13 378 caractères : le seul sujet qu'aucune des dix autres pages ne couvrait, le contrat lui-même (commit `6a11554`)

**Chantier choisi** : le candidat n°1 désigné le 28/09. L'accueil était la page
de fond la **moins travaillée depuis le 15/09** (où seul le rendu des liens de
galerie avait été corrigé, jamais le contenu), la **plus visitée**, et la
**seule sans « Dernière mise à jour »** visible. Elle ne portait que la FAQ
courte de 6 réponses héritée du site d'origine.

**Le sujet, et pourquoi celui-là.** Les 53 Q/R déjà publiées ont été relues
avant de rédiger (`grep '      q: "' src/routes/*.tsx`, la commande à
reprendre). Constat : les six pages service et les quatre dossiers couvrent la
technique, l'urbanisme, la voirie, l'eau et les garanties **d'après-chantier**
— réception, parfait achèvement, décennale, TVA, garantie de paiement. **Le
contrat lui-même, en amont, n'était nulle part** : le devis, sa signature,
l'argent versé d'avance, le délai d'exécution. C'est aussi, littéralement, le
sujet de la section qui suit sur la page (le simulateur de devis), d'où le
placement du bloc entre la FAQ et `QuoteForm`.

**Les cinq Q/R, toutes sourcées sur des textes lus ce jour :**
1. *« Une entreprise de travaux est-elle obligée de me remettre un devis ? »* —
   fiche service-public.gouv.fr **F31144**, « Devis obligatoire : activités
   concernées », **vérifiée le 09/09/2022** : liste des corps d'état concernés
   (maçonnerie, isolation, menuiserie, couverture, étanchéité, plomberie,
   plâtrerie, peinture, vitrerie, revêtements, électricité, évacuation des eaux
   pluviales), amende administrative **jusqu'à 3 000 € (personne physique) et
   15 000 € (société)**, et les treize mentions obligatoires du devis.
   **Nuance honnête écrite noir sur blanc dans la réponse** : cette obligation
   vise les prestations de **dépannage, réparation et entretien** — donc, en
   extérieur, la *réfection* d'une cour ou d'un parking existants. Ne pas la
   supprimer dans un futur run pour « simplifier » : c'est elle qui rend la
   réponse exacte.
2. *« Le devis peut-il m'être facturé, et combien de temps reste-t-il
   valable ? »* — même fiche, citation exacte « le devis peut être fait
   gratuitement ou être payant », d'où l'obligation de mentionner ce caractère
   et son coût, et la durée de validité de l'offre.
3. *« Que se passe-t-il exactement quand je signe le devis ? »* — fiche
   service-public.gouv.fr **F2533**, « Quel contrat conclure avec une entreprise
   pour des travaux dans le logement ? », **vérifiée le 28/03/2024** : l'écrit
   n'est pas obligatoire mais sert de preuve, un devis accepté vaut contrat,
   chaque partie garde un original, validité du contrat électronique, et la
   liste de ce qu'il faut y faire figurer.
4. *« L'acompte que je verse, je le perds si j'annule ? »* — **article L214-1
   du code de la consommation**, relevé verbatim, en vigueur depuis le
   **01/07/2016**. C'est la trouvaille du jour : par défaut « les sommes versées
   d'avance sont des **arrhes** », chacun peut se dédire, et **le professionnel
   qui renonce les restitue au double**. Les trois premiers mots, « sauf
   stipulation contraire », inversent tout si le devis écrit « acompte ».
   **Personne dans ce secteur ne publie cette distinction.**
5. *« Le devis ne donne aucune date : dans quel délai les travaux doivent-ils
   être faits ? »* — **articles L216-1 et L216-6 du code de la consommation**,
   relevés verbatim, en vigueur depuis le **01/10/2021**, applicables aux
   contrats conclus à compter du 01/01/2022 : **trente jours** à défaut
   d'indication, puis suspension du paiement (articles 1219 et 1220 du code
   civil) ou résolution après mise en demeure, résolution immédiate si
   l'entreprise refuse d'exécuter ou si la date était une condition essentielle.
   La réponse relie la règle au métier — enrobé à chaud, support sec, plus de
   5 °C — pour conclure qu'il vaut mieux une date écrite au devis que la règle
   supplétive. **Aucune promesse de délai n'est faite au nom de HCE** : le
   contenu figé interdit « Devis sous 48h », et rien de tel n'a été ajouté.

**Le `FAQPage` de l'accueil passe de 6 à 11 questions.** Il était construit sur
la seule constante `FAQS` ; il l'est désormais sur `[...FAQS,
...AVANT_SIGNATURE.qa]`, c'est-à-dire sur **les deux sections de questions
réellement rendues par la page, dans leur ordre d'apparition**. Un seul
`FAQPage` par page, pas deux. `verif-faq.mjs` : **11/11 en production**.
⚠️ **La réserve du 28/09 sur `FAQS` tient et n'a PAS été levée** : `FAQS` reste
surchargeable par le CMS (`get("faqs", FAQS)`), donc le jour où le client
éditera une question depuis l'admin, la moitié `FAQS` du JSON-LD ne suivra pas.
Le nouveau tableau, lui, est statique et ne peut pas diverger. **Le chantier du
jour n'a donc pas aggravé le risque, mais ne l'a pas réglé non plus** — il
reste dans « Hypothèses à vérifier ».

**L'accueil reçoit sa première date de mise à jour visible**, donc sa première
clé dans `src/lib/lastmod.ts` (`"/" : 2026-09-29`). Le sitemap passe de 10 à
**11 URLs avec `lastmod`**, sans qu'aucune date soit recopiée nulle part : le
mécanisme du 27/09 a fonctionné exactement comme prévu, **une seule ligne
ajoutée dans `lastmod.ts` a suffi**, le sitemap et la page ont suivi seuls, et
`verif-lastmod.mjs` passe en ✓ sur les 12 URLs. Le commentaire d'en-tête du
fichier, qui disait « deux URLs n'ont volontairement pas d'entrée ici », a été
corrigé : il n'en reste qu'une, `chantier-en-cours`.

**Maillage interne** : deux liens ajoutés sous le bloc, vers
`/services/finitions-soignees` et `/realisations`, **hors du tableau `qa`** donc
sans effet sur le JSON-LD. C'est la raison pour laquelle la mention des déchets
du chantier, dans la réponse 1, renvoie en texte simple « notre page consacrée
aux finitions et à la fin de chantier » plutôt qu'en lien : **un lien à
l'intérieur d'une réponse ferait diverger le texte visible du texte du
JSON-LD**. Règle à réutiliser : les liens vont autour du bloc, jamais dedans.

**`llms.txt` à jour** : cinq Q/R ajoutées à la suite de « Comment obtenir un
devis ? », ligne « Accueil » de la section *Pages* enrichie, date d'en-tête
avancée au 29 septembre 2026.

**Mesure, pas supposition.** Banc d'essai local monté selon la recette du
15/09 (il a redonné **5 499 caractères** pour l'accueil d'origine, exactement la
valeur de production du jour — fidélité re-confirmée une fois de plus), puis
HMR sur le fichier modifié : **5 499 → 13 378**, les onze autres URLs
inchangées au caractère près. `npx tsc --noEmit` en 0, `npx prettier --check`
propre, `npx eslint` ne laisse que **l'erreur `@ts-ignore` de la ligne 1557,
qui existait déjà sur `HEAD`** (vérifié par `git show HEAD:src/routes/index.tsx
| grep -n ts-ignore` → ligne 1478 avant l'insertion). **Ne pas la « corriger »
dans un run SEO** : c'est un commentaire iOS Safari, hors sujet et hors
périmètre.

**Ce que j'ai décidé de NE PAS faire, et pourquoi :**
- **Ne pas m'appuyer sur l'arrêté du 24 janvier 2017** alors que je l'avais lu
  et que ses articles 1 à 4 étaient en main. Son champ (« dépannage, réparation
  et entretien ») et son annexe de métiers ne nomment ni l'enrobé ni la voirie ;
  l'affirmer applicable aux chantiers de HCE aurait été une extrapolation. La
  fiche F31144 dit la même chose en restant du côté de ce qui est vérifiable,
  et c'est elle qui a été citée. **Ne pas rouvrir cette piste sans un texte qui
  nomme le revêtement extérieur.**
- **Ne pas écrire une Q/R sur la médiation de la consommation** (article L612-1
  du code de la consommation), pourtant un angle neuf et bien sourçable :
  publier « le professionnel doit vous donner un médiateur » sur le site du
  professionnel **sans pouvoir nommer le médiateur de HCE** créerait une
  obligation apparente qu'on ne peut pas honorer sur la page. À proposer au
  client, pas à improviser.
- **Ne pas toucher au `<h2>` « réponse sous 24 à 48h »** de la section devis :
  il est dans « Hypothèses à vérifier » depuis le 14/09 et il n'appartient pas à
  ce chantier. Vérifié au passage : le `grep` de contrôle sur `48h` ne le
  trouve pas dans le HTML servi (seul un `path` SVG matche), donc **la formule
  servie n'est pas littéralement « 48h »** — à re-regarder le jour où la
  question sera posée au client, ne pas en conclure qu'elle a disparu.
- **Ne pas générer le `FAQPage` depuis la base** pour régler le risque `FAQS` :
  ça touche le chargement de la page, c'est exactement ce que l'hypothèse dit de
  ne pas improviser.

## Archivé le 30/10/2026 (entrées du 30/09/2026)

### Positions mesurées — 30/09/2026

**Indexation : toujours nulle, 23 jours après la 1re soumission IndexNow.** Les
trois mesures habituelles via `WebSearch`, reconduites à l'identique :
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcebtp.com**. ⚠️ **Nouveauté de méthode à connaître :
   la liste des concurrents a nettement bougé aujourd'hui** (apparus :
   daniel-moquet, galerie-creation, lemoniteur, forumconstruire, esprit-veranda,
   gonord ; disparus : abers-amenagement, europavage68, cuinet, les deux brevets
   USPTO, Pinterest ; maintenus : mavrotp, pajot-tp, aravis-enrobage, perenia).
   **C'est la première fois depuis le 20/09 que cette SERP n'est pas identique
   au caractère près.** Ne pas en tirer de conclusion sur hcebtp.com : le
   domaine reste absent. Mais **l'argument « SERP inchangée = canal stable » ne
   tient plus** : ce canal se réordonne, donc son immobilité passée n'était pas
   une garantie de fiabilité.
2. **`site:hcebtp.com`** → neuf pages sans rapport (Wikipédia d'acronymes HTP /
   HCB / HBD, Hitkarini College, Cebu IT Park, Hassania School of Public Works,
   gumroad, lawinsider, community.hpe.com), **zéro résultat du domaine**.
   L'opérateur `site:` n'est toujours pas honoré par ce canal. **Inchangé.**
3. **Requête nommant le domaine** `hcebtp.com HCE Hini Cours Enrobé Cize 39300
   enrobé travaux publics` → **aucune page du domaine**, dix fiches d'annuaire.
   **Changement notable dans la composition** : `doctrine.fr` a disparu de la
   liste, et **deux pages d'annuaire départemental PagesJaunes sont apparues** —
   `pagesjaunes.fr/annuaire/departement/jura-39/enrobe-a-chaud` et
   `pagesjaunes.fr/annuaire/departement/ain-01/entreprise-de-btp`. Les huit
   autres sont les habituelles (kompass, pappers, verif, societe, 118000, mappy,
   lagazettefrance, manageo). **Ces deux pages départementales confirment par
   l'observation le levier PagesJaunes identifié le 12/09** : l'annuaire est
   indexé sur exactement les requêtes que le site vise, et il porte déjà une
   fiche HCE.

| Requête | Mesure (30/09/2026) | Évolution vs 29/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé (mais SERP réordonnée) |
| indexation (requête nommant le domaine) | **absent** | inchangé — 10 fiches d'annuaire |
| `site:hcebtp.com` | **absent** | inchangé |
| requêtes commerciales | **non mesurables** (pas de SERP brute via ce canal) | indéterminé |

✅ **`WebSearch` n'a échoué aucune fois aujourd'hui** (3 requêtes d'indexation +
2 requêtes de sourçage, 5 réponses exploitables). Les canaux de SERP brute
n'ont **pas** été re-testés : la liste du 11/09 est à jour, tous étaient morts.

> 🔔 **Notification client ENVOYÉE le 30/09/2026 — l'échéance hebdomadaire
> annoncée par le run du 29/09 a bien été tenue.** Contenu : indexation nulle à
> 23 jours, site sain (12 URLs en 200, contrôles verts), l'entreprise connue de
> 10 annuaires mais rien qui relie ces fiches au site, puis les **trois actions
> hors-dépôt** (Search Console, revendiquer la fiche Google Business Profile
> existante, revendiquer `pagesjaunes.fr/pros/52322496`) et **le `title`
> anormal de `/services/finitions-soignees` à arbitrer**, comme le run du 29/09
> l'avait demandé.
> **Règle de cadence reconduite : ne pas re-notifier avant le 07/10/2026**, sauf
> si l'indexation arrive ou si un contrôle casse. Le blocage est inchangé depuis
> le 20/09 et le répéter tous les jours le rendrait inaudible.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot). **Avant** le chantier du jour : identique au 29/09 **au
caractère près sur les douze URLs**. **Après** déploiement : la page neuve
apparaît, et seules les deux pages qui reçoivent un lien entrant bougent — les
neuf autres sont inchangées au caractère près, mesuré et non supposé.

| URL | Texte servi (30/09) | vs 29/09 | JSON-LD | lastmod |
|---|---|---|---|---|
| accueil | **13 526 car.** | **+148** *(lien ajouté)* | 3 | 2026-09-29 |
| `/realisations` | **13 491 car.** | **+231** *(lien ajouté)* | 4 | 2026-09-28 |
| `/realisations/preparation-terrassement` | 8 156 car. | = | 3 | 2026-09-25 |
| **`/zone-intervention`** | **8 578 car.** | **page créée** | **4** | **2026-09-30** |
| `/realisations/cour-allee-privee` | 7 670 car. | = | 3 | 2026-09-23 |
| `/services/bordures-murets` | 7 012 car. | = | 4 | 2026-09-17 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 | 2026-09-21 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 | 2026-09-22 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 | 2026-09-13 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 | 2026-09-16 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 | 2026-09-12 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 | 2026-09-11 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 | *(aucun, volontaire)* |

**Le sitemap passe de 12 à 13 URLs**, toutes en 200. `scripts/verif-faq.mjs`
passe en **✓ sur les douze `FAQPage`** en production, dont **4/4 sur la page
neuve**. `scripts/verif-lastmod.mjs` passe en **✓ sur les 13 URLs, dont 12 avec
`lastmod`** (contre 11 hier). La soumission IndexNow des **13** URLs sort en
**HTTP 200**.

⚠️ **Le banc d'essai local est fidèle au caractère près, vérifié une fois de
plus** : les 13 valeurs mesurées sur `http://127.0.0.1:4176` avant push sont
**identiques aux 13 valeurs de production** après déploiement. C'est le
troisième contrôle concordant (15/09, 29/09, 30/09) — **le banc peut servir de
preuve avant push, ce n'est plus une approximation.**

**Délai de déploiement observé** : entre 40 et 120 secondes entre le
`git push origin HEAD:main` et la première réponse servant la page neuve (3
essais espacés de 40 s ; le 1er a renvoyé **404**, le 3e un 200 complet).
⚠️ **Piège propre à une ROUTE NEUVE, à ne pas re-découvrir : pendant le
déploiement, l'URL répond 404, pas 503.** Un 404 sur une route qu'on vient de
créer ne veut donc pas dire que la route est ratée — il faut réessayer avant de
conclure. Le 2e essai a par ailleurs renvoyé `HTTP 000` au `curl` tout en
servant déjà le contenu : **contrôler le contenu, pas seulement le code**.

### 30/09/2026 — `/zone-intervention` : la première page du site consacrée à la géographie, avec des distances et des altitudes mesurées (commit `6cc006e`)

**Pourquoi ce chantier.** Le run du 29/09 a déclaré le filon « page maigre »
épuisé et posé que le prochain chantier se choisirait **sur la requête**. Son
candidat n°1 était une page de zone d'intervention, sous une condition
explicite : *« À trancher avant de rédiger : y a-t-il de la matière honnête, ou
non ? Si non, ne pas le faire. »* **La condition a été tranchée par l'affirmative
avant d'écrire une ligne**, et c'est ce qui a rendu le chantier possible : trois
référentiels publics répondent depuis le runner et donnent de la donnée que
personne dans le secteur ne publie (voir « Techniques apprises » du jour).

Le manque était réel et vérifié : les six requêtes suivies nomment toutes un
département, le `LocalBusiness` de l'accueil déclare bien
`areaServed: [Jura, Ain]`, et pourtant **aucune page ne traitait la géographie
elle-même** — le hub `/realisations` la mentionnait en une phrase, c'était tout.

**Ce qui a été publié.** Route statique `src/routes/zone-intervention.tsx`,
**8 578 caractères servis**, 4 blocs JSON-LD (`BreadcrumbList`, `WebPage`,
`FAQPage`), une table visible et un bloc de 4 Q/R. Toutes les valeurs sont
relevées le 30/09/2026 sur des sources primaires, aucune saisie de seconde main :

- **Table des six communes repères**, avec distance orthodromique depuis le
  point central de Cize et altitude IGN RGE ALTI au même point : Champagnole
  3,2 km / 500 m, Lons-le-Saunier 28,2 km / 263 m, Saint-Claude 34,7 km / 668 m,
  Oyonnax 55,3 km / 538 m, Bourg-en-Bresse 77,4 km / 227 m, depuis Cize à 549 m.
  Populations INSEE dans la même table.
- **L'effet chiffré de l'altitude sur le calendrier**, établi en comparant deux
  stations Météo-France distantes de 29 km et séparées de 239 m de dénivelé :
  Lons-le-Saunier (indicatif **39362001**, 298 m) → 51,9 jours de gel/an,
  11,8 °C, 1 147,4 mm ; Champagnole (39097003, 537 m) → 111,7 jours, 9,4 °C,
  1 573,2 mm. Soit **2,15 fois plus de jours de gel et 426 mm d'eau en plus**,
  la même année et dans le même département. **C'est le passage le plus citable
  de la page** : un rapport chiffré, local, daté, qu'aucun concurrent ne publie.
- **Le détail mensuel qui fait de mars le mois de bascule** : 17,9 jours de gel
  en mars à 537 m contre 5,6 à 298 m. Plus les deux chiffres qui empêchent de
  conclure que la plaine est sans contrainte (10,3 jours sans dégel et 1,5 jour
  à -10 °C ou moins à Lons-le-Saunier).
- **Une Q/R de cadrage honnête** (« HCE intervient-elle dans ma commune si elle
  n'est pas dans cette liste ? ») qui dit que les six villes sont des repères et
  non une liste fermée, et renvoie l'estimation à la visite sur site.

**Contrôle de doublon fait AVANT rédaction, sur les 57 Q/R déjà publiées**, et
c'est lui qui a façonné la page :
- `/services/bordures-murets` publiait déjà les normales **annuelles** de
  Champagnole. Elles ne sont donc **pas le sujet** ici : elles ne servent que de
  terme de comparaison à la station de Lons-le-Saunier, **entièrement nouvelle
  sur le site**. C'est ce qui sauve le bloc de la redite.
- `/realisations/preparation-terrassement` publiait déjà le détail mensuel des
  **précipitations** de Champagnole → **non repris du tout**.
- Le hub `/realisations` répond déjà « Où HCE réalise-t-elle ces chantiers ? » et
  y traite l'homonymie Cize (39) / Cize (01). **Cet angle a été délibérément
  laissé au hub**, alors qu'il était prévu au départ comme un bloc entier : c'est
  la découverte de cette Q/R existante qui l'a fait retirer.

**Ce que la page ne dit PAS, volontairement** : aucun prix, aucun délai, aucun
frais de déplacement — rien de tout cela n'est connu. Et **aucune commune que
l'entreprise n'a pas elle-même déclarée n'a été ajoutée** : les six sont
exactement celles de `src/components/InteractiveMap.tsx`. La consigne du 29/09
(« ne pas fabriquer de pages de villes vides et interchangeables ») est tenue
non pas en s'abstenant, mais en publiant **une** page réellement informée.

**Câblage complet** (rien d'oublié, vérifié un par un) : `routeTree.gen.ts`
régénéré par le build et recopié dans le dépôt, clé dans `src/lib/lastmod.ts`,
entrée dans `sitemap[.]xml.ts` (13 URLs), `public/llms.txt` (4 Q/R + fiche de
page + date d'en-tête), `scripts/mesure-texte-servi.mjs`,
`scripts/indexnow-submit.mjs`, et **deux liens entrants** — depuis la section
zone de l'accueil et depuis le hub `/realisations`, tous deux vérifiés présents
dans le HTML servi.

**Contrôles passés avant push, au banc d'essai local** : `npm run build` en 0,
`npx tsc --noEmit` en 0, `npx eslint` propre sur la page neuve, `verif-faq`
4/4 sur la page neuve et 12/12 pages alignées, `verif-lastmod` 13 URLs
cohérentes, contenu figé intact, et **les neuf URLs non touchées inchangées au
caractère près**. Puis les mêmes contrôles rejoués en production après
déploiement, avec des valeurs identiques.

**Ce que j'ai décidé de NE PAS faire aujourd'hui, et pourquoi.**
- **Pas de bloc sur « l'enrobé chaud supporte-t-il le trajet jusqu'au
  chantier ? »**, alors que c'est la question la plus naturelle sur une page de
  zone et la plus proche de la requête « enrobé à chaud ». Raison : elle demande
  une fenêtre de température de mise en œuvre sourcée, et **la fiche Norm'Info
  de la NF P98-150-1 a répondu 404** sur l'URL essayée. Sans source primaire,
  ç'aurait été du raisonnement présenté comme du fait. **Angle à garder en tête
  pour un prochain run, à condition de trouver la source** — c'est le meilleur
  angle non couvert du site avec les épaisseurs.
- **Pas de nœud `Service` avec `areaServed` dans le JSON-LD.** L'accueil déclare
  déjà `areaServed: [AdministrativeArea Jura, Ain]` sur son `LocalBusiness`, et
  six `Service` existent sur les pages service. Une septième déclaration
  concurrente vaut moins qu'une seule cohérente. La page porte donc `WebPage` +
  `BreadcrumbList` + `FAQPage`, et `publisher` pointe vers `#business`, **le
  seul `@id` publié par ce site** (règle du 20/09 : ne jamais inventer de nœud).
- **Pas de liste des 33 communes du code postal 39300**, pourtant récupérée en un
  appel. C'aurait été du remplissage géographique et une revendication de
  couverture que le client n'a pas faite — exactement le piège annoncé.
- **Pas de correction du « à 2 km de Cize »** écrit sur deux pages existantes
  (voir « Hypothèses à vérifier » du jour) : c'est du contenu en ligne qui
  fonctionne, et la nouvelle page dit « moins de 5 km », qui est la valeur
  mesurée. On ne réécrit pas l'existant sur cette base.

## Archivé le 31/10/2026 (entrées du 01/10/2026)

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 01/10/2026

> 🔴 **ÉVÉNEMENT MAJEUR DÉCOUVERT CE RUN — LE DOMAINE A CHANGÉ. Le site n'est
> plus sur `hcebtp.com` mais sur `www.hcetp.com` (sans le `b`).**
> La bascule a été faite **le 30/09/2026 à 11h56** par le commit `f07b19f`
> (« seo: bascule vers le nouveau domaine www.hcetp.com », auteur Yanis Ouammou).
> **Aucun run ne l'avait journalisée** : le commit de journal du 30/09 (`98ff21a`)
> est ANTÉRIEUR à la bascule, donc tout le journal jusqu'ici parle d'un domaine
> qui n'est plus celui du site. **La consigne du run elle-même parle encore de
> hcebtp.com : elle est périmée sur ce point.**
> **Règle à retenir : relire `git log` avant de faire confiance au journal.** Le
> journal est la mémoire, mais il ne connaît que ce que le dernier run a écrit —
> un changement fait *après* la dernière entrée est invisible. Les commits, eux,
> ne mentent pas.

**État des redirections, mesuré au `curl` (01/10/2026) :**

| Hôte | Code | Destination |
|---|---|---|
| `https://www.hcetp.com/` | **200** | — *(hôte servi)* |
| `https://hcetp.com/` | **308** | `https://www.hcetp.com/` |
| `https://www.hcebtp.com/` | **308** | `https://www.hcetp.com/` |
| `https://hcebtp.com/` | **308** | `https://www.hcetp.com/` |
| `https://hcebtp.lovable.app/` | 200 | — *(preview, inchangée)* |

**L'ancien domaine n'est donc pas perdu** : les trois variantes redirigent en 308
permanent vers le nouvel hôte. Google recommande explicitement ce type de
redirection pour un déplacement de site (« we recommend that you use HTTP
permanent redirects if possible, such as `301` and `308` »,
`developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes`,
lu le 01/10/2026). **Rien à réparer côté technique.**

**Indexation : toujours nulle — et désormais nulle sur le NOUVEAU domaine.**
Trois mesures via `WebSearch` :
1. **`site:hcetp.com`** → neuf résultats sans rapport (Wikipédia d'acronymes HCT /
   JCET / HCPT, Hitkarini College, C. Abdul Hakeem College, Harris County Dept of
   Education, bureau Hong Kong-Taïwan, un PDF hrsa.gov, sites.bu.edu), **zéro
   résultat du domaine**. L'opérateur `site:` n'est toujours pas honoré par ce
   canal — **inchangé, ne pas réinterpréter ce résultat comme une information.**
2. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcetp.com et zéro hcebtp.com**. ⚠️ **La SERP s'est
   encore réordonnée** (nouveaux : lizetp, ligerio, amenagement-mineral, fredtoma ;
   maintenus : daniel-moquet, mavrotp, galerie-creation, aravis-enrobage, gonord,
   perenia). **Deuxième réordonnancement consécutif** après celui du 30/09 : la
   conclusion du 30/09 (« ce canal se réordonne, son immobilité n'était pas une
   garantie ») est confirmée une seconde fois.
3. **Requête nommant le nouveau domaine** `hcetp.com HCE Hini Cours Enrobé Cize
   39300 enrobé travaux publics` → **aucune page du domaine**, neuf fiches
   d'annuaire (pappers, verif, kompass, societe, PagesJaunes départemental Ain,
   118000, lagazettefrance, mappy, manageo). **Même constat que les 24 jours
   précédents : l'entreprise est connue, le site ne l'est pas.**

**Requête commerciale mesurée** (`enrobé à chaud Jura entreprise`) → dix
résultats, **HCE absent**. Les positions sont tenues par les deux pages
départementales **PagesJaunes** (« enrobé à chaud – Jura », « travaux d'enrobés de
goudron dans le Jura »), **SFCTP / franc-comtoise-tp.fr** (Commenailles, 39, trois
pages dans les dix), socorebat, daniel-moquet, un-max-de-services-jura.
⚠️ **SFCTP est le concurrent direct le mieux placé** : entreprise du Jura, même
métier, et elle place **trois URLs** sur cette requête dont une page dédiée à la
*personnalisation d'enrobé* — exactement l'angle « médaillons et inserts » que
porte l'accueil de HCE. À retenir pour le jour où le site sera indexé.

| Requête | Mesure (01/10/2026) | Évolution vs 30/09 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé (SERP réordonnée 2× de suite) |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches d'annuaire |
| `site:hcetp.com` | **absent** | inchangé (opérateur non honoré) |
| `enrobé à chaud Jura entreprise` | **absent** | 1re mesure sur cette requête |

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot, sur `https://www.hcetp.com`) : **les 13 URLs rendent exactement
les mêmes valeurs qu'au 30/09, au caractère près.**

| URL | Texte servi (01/10) | vs 30/09 | JSON-LD |
|---|---|---|---|
| accueil | 13 526 car. | = | 3 |
| `/realisations` | 13 491 car. | = | 4 |
| `/zone-intervention` | 8 578 car. | = | 4 |
| `/realisations/preparation-terrassement` | 8 156 car. | = | 3 |
| `/realisations/cour-allee-privee` | 7 670 car. | = | 3 |
| `/services/bordures-murets` | 7 012 car. | = | 4 |
| `/services/finitions-soignees` | 6 821 car. | = | 4 |
| `/realisations/parking-voirie-pro` | 6 356 car. | = | 3 |
| `/services/drainage-pentes` | 5 198 car. | = | 4 |
| `/services/maconnerie-generale` | 5 080 car. | = | 4 |
| `/services/preparation-terrain` | 4 482 car. | = | 4 |
| `/services/enrobe-a-chaud` | 3 783 car. | = | 4 |
| `/realisations/chantier-en-cours` | 373 car. | = | 2 |

✅ **La bascule de domaine n'a rien cassé — vérifié, pas supposé.** Les contrôles
passés sur le nouvel hôte :
- `scripts/verif-faq.mjs` sur les 13 URLs → **✓ 12/12 `FAQPage` alignés** sur la
  FAQ visible (11/11 sur l'accueil, 8/8 sur `/realisations`, 5/5 ou 4/4 ailleurs).
- `scripts/verif-lastmod.mjs` → **✓ 13 URLs cohérentes, 12 avec `lastmod`** aligné
  sur la date affichée par la page.
- `robots.txt` → `Allow: /` et `Sitemap: https://www.hcetp.com/sitemap.xml`.
- `sitemap.xml` → **13 `<loc>`, toutes sur `www.hcetp.com`**, toutes en 200.
- **Canonical et `og:url` relevés un par un sur les 13 URLs** : auto-référents sur
  `https://www.hcetp.com`, et **`noindex` absent partout (0/13)**.
- **Zéro occurrence de `hcebtp` dans le HTML servi des 13 URLs** (compté page par
  page, total = 0). `llms.txt` en ligne : **0 occurrence** de l'ancien domaine.
- Contenu figé client vérifié sur l'accueil en ligne : `2012` ✓, `posé à la main`
  ✓, `150` ✓, `Devis détaillé` ✓, `garantie décennale` ✓ — et les interdits
  absents : `2005`, `20 ans`, `finisseur`, `Devis sous 48h`, `Garantie & SAV` à 0.
  *(Les 4 occurrences de « 180 » sont `sizes="180x180"` de l'apple-touch-icon et
  des valeurs CSS — contrôlées une par une, aucune n'est une température.)*
  ⚠️ `scripts/check-contenu-fige-prod.mjs` **n'a PAS pu tourner** : il exige
  `SUPABASE_PUBLISHABLE_KEY`, absente de l'environnement du runner. Le contrôle a
  donc été fait au `grep` sur le HTML servi. **À savoir pour les prochains runs :
  ce script n'est pas utilisable depuis le runner en l'état.**

🔔 **IndexNow : première soumission du nouveau domaine, et elle apprend quelque
chose.** Le fichier clé est bien servi sur le nouvel hôte
(`/051b2d7c5dec4c46e59a45f33361b9ff.txt`, HTTP 200, contenu conforme) et les 13
URLs sont parties → **HTTP 202**, là où l'ancien domaine renvoyait **toujours
200** sur 24 soumissions. Le script documente lui-même le sens du code : 202 =
« accepté, clé en cours de vérification », *cas normal pour un domaine encore
inconnu des moteurs*. **Ce 202 est donc une mesure, pas un incident** : c'est la
confirmation côté Bing que `www.hcetp.com` part d'une page blanche.
**C'était très probablement la première soumission du nouveau domaine** : le
commit de bascule a modifié `scripts/indexnow-submit.mjs` mais rien n'indique
qu'il ait été exécuté ensuite, et le 202 va dans ce sens.

> 🔔 **Notification client : ENVOYÉE ce run, en dérogeant à la cadence
> hebdomadaire.** La règle du 30/09 disait « ne pas re-notifier avant le
> 07/10/2026, sauf si l'indexation arrive ou si un contrôle casse ». **La
> dérogation est justifiée par un troisième cas que la règle n'avait pas prévu :
> le domaine a changé, et les instructions que le client doit suivre pointaient
> toutes vers l'ancien.** Le laisser agir une semaine de plus sur
> `ACTIONS-SEO-CLIENT.md` non corrigé l'aurait conduit à déclarer une URL qui
> redirige dans sa Search Console, sa fiche Google et sa fiche PagesJaunes.
> **Cadence pour la suite : prochaine notification de routine le 08/10/2026**,
> sauf indexation ou contrôle cassé.

<!-- section d'origine : Chantiers faits -->
### 01/10/2026 — La bascule de domaine était faite dans le code mais pas dans l'appareil de découverte : `ACTIONS-SEO-CLIENT.md` envoyait le client déclarer une URL qui redirige

**Pourquoi ce chantier et pas un autre.** Le run a commencé par constater que le
domaine avait changé la veille (commit `f07b19f`) sans qu'aucun run ne le
journalise. La question s'est donc posée : la bascule est-elle complète ? La
réponse mesurée est **oui côté code, non côté hors-dépôt**.

Côté code, tout avait suivi (canonical, `og:url`, sitemap, `robots.txt`,
données structurées, `llms.txt`, scripts) — **vérifié page par page, et pas
supposé** : 0 occurrence de l'ancien domaine dans le HTML servi des 13 URLs,
canonical auto-référent partout, 12/12 `FAQPage` alignés, 13/13 en 200. **Il n'y
avait rien à corriger dans le code, et rien n'a été touché.**

Côté hors-dépôt, en revanche, le trou était béant. `ACTIONS-SEO-CLIENT.md` est le
document qui porte **les trois seuls leviers capables de débloquer l'indexation**
(Search Console, fiche Google Business Profile, fiche PagesJaunes) — ceux que le
journal désigne depuis le 20/09 comme « hors du dépôt et demandant le client ».
**Ces trois leviers consistent précisément à déclarer l'adresse du site dans un
service tiers.** Et le document disait `https://www.hcebtp.com` en **11
endroits**. Le client qui l'aurait appliqué cette semaine aurait déclaré, dans sa
Search Console, sur sa fiche Google et sur sa fiche PagesJaunes, **une URL qui
redirige en 308** — alors que le document lui-même avertit, trois lignes plus
bas, qu'« une URL qui redirige affaiblit la citation ». Le chantier le plus utile
du jour n'était donc pas d'écrire du contenu : c'était de réparer la seule
instruction qui pouvait faire du mal.

**Ce qui a été fait, précisément.**
1. **Les 11 occurrences instructionnelles passent à `www.hcetp.com`** — Search
   Console (création de propriété et inspection d'URL), champ « Site web » de la
   fiche Google, bloc NAP de référence à recopier dans les annuaires, consigne
   « toujours `www`, sans slash final », action 4 sur les fiches d'annuaire, et le
   constat sur PagesJaunes/Mappy.
2. **Les 2 occurrences historiques sont conservées telles quelles** (l'entrée datée
   du 07/09 « tous les signaux d'hôte alignés sur `www.hcebtp.com` » et la mention
   de l'ancien `hcebtp.com` sans `www`). **Les réécrire aurait falsifié un
   relevé daté.** Le remplacement a donc été borné aux lignes 1-268 et vérifié
   après coup.
3. **Un bandeau rouge en tête du fichier** : le domaine servi, le tableau des
   trois redirections 308 mesurées au `curl`, le fait que la redirection est du
   bon type avec la citation Google, la consigne « partout où une adresse doit
   être déclarée, c'est `www.hcetp.com` », et **deux points qui ne vont pas de
   soi** — (a) la migration ne fait rien perdre puisque rien n'était indexé, mais
   elle remet le compteur de découverte à zéro, (b) **ne pas laisser expirer
   `hcebtp.com`**, sinon toute citation créée par erreur sur l'ancienne adresse
   meurt.
4. **Action 1 enrichie d'un arbitrage qui a changé de réponse avec la bascule :
   propriété de domaine plutôt que préfixe d'URL.** Une propriété de domaine
   (`hcetp.com`, sans protocole) couvre d'un coup les quatre variantes
   www/non-www × http/https, là où un préfixe d'URL ne montre que l'hôte exact
   saisi. Elle exige une validation **DNS TXT**, qui est la seule méthode acceptée
   pour ce type — et comme le DNS du nouveau domaine vient d'être configuré,
   l'accès est sous la main maintenant. Le préfixe d'URL est conservé comme repli
   explicite. **C'est le seul ajout de fond du run, et il est justifié par le
   changement de domaine, pas par du remplissage.**
5. **Trois entrées datées ajoutées à la section « déjà fait côté code »** : la
   bascule du 30/09 avec la liste des signaux vérifiés, le constat du 01/10 que
   le volume servi est intact au caractère près et que les contrôles passent, et
   la première soumission IndexNow du nouveau domaine avec l'explication du 202.

**Ce qui a été décidé de NE PAS faire, et pourquoi.**
- **Les 4 références à `hcebtp.com` qui restent dans le code n'ont pas été
  touchées** : `src/routes/lovable/email/transactional/send.ts` (`SITE_NAME`,
  `SENDER_DOMAIN = notify.hcebtp.com`, `FROM_DOMAIN = hcebtp.com`) et
  `src/routes/api/public/devis.ts` (`from: 'HCE BTP <devis@hcebtp.com>'`). **Ce
  sont des domaines d'envoi d'e-mail, vérifiés chez le prestataire d'envoi (DKIM/
  SPF).** Les renommer sans avoir vérifié le nouveau domaine chez Resend
  **casserait l'e-mail du formulaire de devis**, c'est-à-dire la conversion du
  site. Ce n'est pas un sujet SEO : l'e-mail public affiché sur le site est
  `sarl.hce@laposte.net`, pas une adresse du domaine. **Porté en « Hypothèses à
  vérifier » comme question au client, pas traité en silence.**
- **Aucune réécriture de contenu, aucune nouvelle page.** Le chantier du jour
  était la migration ; ouvrir en plus un chantier rédactionnel aurait fait deux
  chantiers le même jour, ce que le journal proscrit.
- **L'adresse n'a pas été retouchée.** Les relevés du jour sur kompass et mappy
  affichent encore « 36 avenue Etienne Lamy » : c'est l'**ancienne** adresse
  (SIRET …0021), question déjà tranchée les 09/09 et 13/09. **Point clos, ne pas
  le rouvrir** — le site affiche `40 avenue Etienne Lamy`, qui est la bonne.
- **Pas de Changement d'adresse en Search Console.** L'outil exige que les deux
  domaines y soient validés, et il n'y a rien à transférer : aucune page de
  l'ancien domaine n'a jamais été indexée en 24 jours de mesure. ⚠️ **Nuance à ne
  pas déformer : la doc Google ne dit PAS que l'outil exige un contenu déjà
  indexé.** C'est l'absence d'indexation *constatée ici* qui rend l'outil sans
  objet, pas une règle de Google. Vérifié en lisant la doc, après avoir d'abord
  supposé le contraire.

## Archivé le 01/11/2026 (entrées du 02/10/2026)

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 02/10/2026

**Indexation : toujours nulle — mais le premier signe de vie côté moteur est
arrivé, et il était prévu par le run précédent.**

🟢 **IndexNow passe de 202 à 200.** Le run du 01/10 avait posé cet indicateur
noir sur blanc : « un passage de 202 à 200 signifierait que Bing a lu le fichier
clé — premier signe de vie côté moteur ». C'est arrivé aujourd'hui, à la deuxième
soumission du nouveau domaine : fichier clé servi en 200, 13 URLs soumises →
**HTTP 200** (hier : 202, « accepté, clé en cours de vérification »). **Ce que ça
prouve et ce que ça ne prouve pas** : Bing a vérifié la propriété de
`www.hcetp.com` et accepte désormais les soumissions sans réserve — ce n'est
**pas** une indexation, et ça ne dit rien de Google, qui ne participe pas au
protocole. Mais c'est le premier retour positif d'un moteur depuis la bascule de
domaine, et il a été obtenu par une mesure gratuite. **Continuer à relever ce
code à chaque run.**

**Les trois mesures d'indexation, inchangées :**
1. **Phrase exacte du site** `"Médaillons et inserts pavés intégrés à l'enrobé"`
   → dix résultats, **zéro hcetp.com**. ⚠️ **La SERP est cette fois STRICTEMENT
   identique à celle du 01/10** (daniel-moquet, galerie-creation, mavrotp,
   aravis-enrobage, gonord, perenia, lizetp, ligerio, amenagement-mineral,
   fredtoma) — après deux réordonnancements consécutifs les 30/09 et 01/10. À
   noter pour ne pas surinterpréter : l'immobilité d'un jour ne vaut pas garantie,
   la leçon du 30/09 reste valable.
2. **`site:hcetp.com`** → neuf résultats sans rapport, identiques à ceux du 01/10
   (Wikipédia d'acronymes, Hitkarini College, hrsa.gov, sites.bu.edu). **Opérateur
   toujours non honoré par ce canal : ce résultat n'est pas une information.**
3. **Requête nommant le domaine et l'entité** → **aucune page du domaine**, neuf
   fiches d'annuaire. ⚠️ **La composition a changé : PagesJaunes départemental
   sort, `nosartisansontdutalent.fr` entre** — une fiche jamais repérée par les 25
   runs précédents. Voir le chantier du jour, point 2.

**Requête commerciale** `enrobé à chaud Jura entreprise` → neuf résultats, **HCE
absent**, inchangé vs 01/10. SFCTP (`franc-comtoise-tp.fr`, Commenailles 39)
place désormais **quatre URLs** dans les neuf (accueil, fabrication/pose,
personnalisation d'enrobé, aménagements extérieurs) contre trois hier. Les deux
pages départementales PagesJaunes tiennent les deux premières places.

| Requête | Mesure (02/10/2026) | Évolution vs 01/10 |
|---|---|---|
| indexation (phrase exacte du site) | **absent** | inchangé (SERP identique, 1re fois) |
| indexation (requête nommant le domaine) | **absent** | inchangé — 9 fiches, dont 1 nouvelle |
| `site:hcetp.com` | **absent** | inchangé (opérateur non honoré) |
| `enrobé à chaud Jura entreprise` | **absent** | inchangé — SFCTP passe de 3 à 4 URLs |
| **code IndexNow** | **200** | 🟢 **202 → 200** (Bing a lu le fichier clé) |

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs`, vu
comme Googlebot, sur `https://www.hcetp.com`), relevé **avant** le chantier du
jour : **les 13 URLs rendent exactement les mêmes valeurs qu'au 01/10 et au
30/09, au caractère près** (13 526 / 13 491 / 8 578 / 8 156 / 7 670 / 7 012 /
6 821 / 6 356 / 5 198 / 5 080 / 4 482 / 3 783 / 373).

**Après le chantier du jour**, `/services/enrobe-a-chaud` passe de **3 783 à
11 856 caractères** — mesuré au banc d'essai local, et le banc est fidèle : les
deux pages de contrôle (accueil 13 526, `/services/finitions-soignees` 6 821) y
rendent exactement la valeur de production.

🔴 **Et le chantier du jour N'EST PAS EN LIGNE : le déploiement ne part plus.**
Voir l'encadré rouge en tête d'« État des lieux » — le code est sur `main`, la
production sert encore la version du 30/09, et la cause est hors du dépôt.

**Contrôles passés avant push** : `npx tsc --noEmit` en 0, `npm run build` en 0,
`npm run check:fige` en 0, `verif-faq.mjs` **✓ 10/10** sur la page modifiée,
`verif-lastmod.mjs` **✓ 13 URLs cohérentes** dont `/services/enrobe-a-chaud` au
`2026-10-02`. Contenu figé revérifié sur le HTML servi : `finisseur` 0, `2005` 0,
`20 ans` 0, `Devis sous 48h` 0, `Garantie & SAV` 0 ; `150°C` 17, `à la main` 17,
`2012` 4, `garantie décennale` 7. *(Les 4 occurrences de « 180 » sont le
`sizes="180x180"` de l'apple-touch-icon, un numéro dans l'URL 118000 des `sameAs`
et un `linear-gradient(180deg…)` — contrôlées une par une, aucune température.)*

<!-- section d'origine : Chantiers faits -->
### 02/10/2026 — `/services/enrobe-a-chaud` passe de 3 783 à 11 856 caractères : la page du métier principal sort de la maigreur, sur ce qui se décide au devis et qu'on ne voit plus une fois la cour finie

**Pourquoi ce chantier.** C'était le candidat n°1 posé par le run du 01/10, et
rien n'avait changé entre-temps : avec 3 783 caractères servis, cette page était
**la dernière du site sous les 4 000** (les onze autres pages rédigées tiennent
entre 4 482 et 13 526), alors qu'elle porte **le service qui donne son nom à
l'entreprise** et la requête commerciale mesurée depuis le 01/10
(« enrobé à chaud Jura entreprise »), sur laquelle le site est absent. Son bloc de
Q/R du 11/09 était le plus ancien et le plus court des six. Le run précédent étant
un chantier documentaire (migration de domaine), l'angle alterne bien.

**L'angle, et pourquoi il ne double rien.** Les 5 Q/R du 11/09 traitent du
**vocabulaire** (goudron contre bitume, BBSG, 150 °C, saison, chaud contre froid).
Les 5 nouvelles traitent de la **mise en œuvre** : épaisseur, classe granulaire,
rechargement sur l'ancien, origine des dégradations hivernales, grade de bitume
selon l'altitude. **Les 30 Q/R des autres pages ont été relues avant de rédiger**,
et deux sujets ont été écartés pour doublon :
- **la saison de pose chiffrée** — `/zone-intervention` (30/09) la traite déjà en
  détail avec les normales mensuelles de Champagnole et de Lons-le-Saunier. La
  rouvrir ici aurait répété la même donnée sur deux pages.
- **les joints entre bandes et le contrôle de finition** — déjà traités sur
  `/services/finitions-soignees` (21/09).

**Les cinq questions ajoutées, et la source de chaque chiffre.**
1. **« Quelle épaisseur d'enrobé faut-il pour une cour ou une allée ? »** — 5 à
   8 cm en moyenne, 4 à 5 cm au minimum selon la granularité (fiche technique
   « Béton Bitumineux Semi Grenu » du **conseil départemental de la Meuse**,
   verbatim « Moyenne : 5 à 8 cm selon granularité », « Mini : 4 à 5 cm selon
   granularité ») ; et « des couches de roulement d'épaisseur suffisante (type BBSG
   de 5 à 7 cm) » pour les cas les plus sollicités (**IDRRIM, note d'information
   n° 43, décembre 2020**). Plus le fait que les couches minces ou très minces
   (≤ 4 cm) exigent un support déjà dense et imperméabilisé.
2. **« Sur un devis d'enrobé, que veut dire 0/10 ou 0/14 ? »** — classe granulaire,
   module de richesse **K ≥ 3,4 (0/10) et K ≥ 3,2 (0/14)** en climat hivernal
   rigoureux, norme **NF P 98-149** citée par l'IDRRIM pour sa définition, et les
   bornes de macrotexture du tableau 2 de la note (PMT 0,4 à 1,3 mm pour un BBSG
   0/10 ; 0,5 à 1,4 mm pour un 0/14) **avec leur raison hivernale** : une surface
   trop ouverte se déverglace mal et souffre des lames de déneigement.
3. **« Peut-on poser un enrobé neuf par-dessus l'ancien ? »** — la réponse la plus
   utile du lot, parce qu'elle est contre-intuitive et verbatim : le rechargement
   « n'est pas possible » « sur une couche mince (BBTM ou BBM), quel que soit son
   état », « sur un BBSG fissuré ou dégradé », ni « sur un ESU vieilli » (IDRRIM
   n° 43). Plus l'interdiction d'« empilement de couches minces », le seuil
   mesurable de la fiche Meuse (reprofilage ou fraisage dès 2 cm de déformation
   transversale) et le dosage de la couche d'accrochage (250 à 300 g/m² de liant
   résiduel).
4. **« Pourquoi un enrobé se dégrade-t-il après un hiver ? »** — l'eau, pas le
   froid : « La résistance d'une couche de roulement aux hivers rigoureux dépend
   essentiellement de sa capacité à limiter l'infiltration et l'accumulation
   d'eau » ; les nids-de-poule et arrachements « dépendent souvent de négligence à
   l'application et d'un mauvais compactage des enrobés bitumineux » (IDRRIM
   n° 43, note écrite après l'hiver 2009-2010 qui avait dégradé les routes du
   nord-est). Repère d'entretien donné au lecteur : ponter une fissure dès 2 mm en
   secteur de montagne, émulsion sous 1 cm non ramifiée, purge au-delà de 3 cm.
5. **« Le bitume est-il le même en altitude qu'en plaine ? »** — la trouvaille du
   run : une règle de métier où **l'altitude figure noir sur blanc**. Grades
   inférieurs à 35/50 « à proscrire en couche de roulement », liant final visant un
   35/50, « voire 50/70 pour les trafics plus faibles ou au-dessus de 700 m, et
   70/100 au-dessus de 1 000 m » (IDRRIM n° 43). Recoupé avec les altitudes IGN
   déjà relevées le 30/09 (Cize 549 m, Saint-Claude 668 m) et les 111,7 jours de
   gel de la station Météo-France de Champagnole.

**Ce qui a été fait au-delà du texte.**
- `PAGE_UPDATED["/services/enrobe-a-chaud"]` passe au **2026-10-02** — donc la
  date visible et le `lastmod` du sitemap bougent ensemble, par construction.
- **`llms.txt` mis à jour** : les 5 nouvelles Q/R y sont reportées en version
  condensée, la description de la page dans la section « Pages » décrit le nouveau
  contenu, et l'en-tête « Dernière mise à jour » passe au 2 octobre 2026.
- `heading` et `lead` du bloc réécrits pour couvrir les deux moitiés du bloc (le
  vocabulaire puis la mise en œuvre). **Aucun contenu figé client touché** :
  `prestations`, `methode`, `intro` et `seoDescription` sont inchangés.

**Ce qui a été décidé de NE PAS faire, et pourquoi.**
- **Aucune question sur le tonnage** (« combien de tonnes pour 100 m² ? »), pourtant
  très demandée. Elle exige une masse volumique, et **aucune source primaire lue
  aujourd'hui n'en donne une** : les seuls chiffres trouvés venaient de blogs
  commerciaux. Question laissée ouverte plutôt que publiée sans source.
- **Aucune mention du finisseur**, alors que la note IDRRIM en parle beaucoup
  (finisseur pleine largeur recommandé sur voies circulées, « finisseur non
  préchauffé » parmi les points de vigilance). Le contenu figé par le client dit
  « posé à la main » et proscrit « posé au finisseur » : les passages concernés ont
  été volontairement écartés, et seuls les points de vigilance compatibles ont été
  cités (travail manuel au démarrage, enrobés refroidis, zones d'accès difficile).
  Vérifié après coup : **0 occurrence de « finisseur » dans le HTML servi.**
- **Aucun prix**, alors que la fiche de la Meuse en publie (12 à 18 €/m² pour la
  couche de roulement seule, jusqu'à 50 €/m² avec reconstitution du corps de
  chaussée). Ce sont des prix de marché public routier, sans rapport avec un devis
  de particulier, et la règle du site interdit d'afficher un prix au visiteur.
- **Aucune affirmation sur la classe hivernale du Jura.** La note IDRRIM vise les
  zones H3/H4, définies par un cumul de jours de neige et de verglas supérieur à
  30 par an. **Le classement n'est pas publié commune par commune**, et la fiche
  Météo-France de Champagnole porte « Données non disponibles » sur les jours de
  neige. Le texte publié dit donc explicitement que ces recommandations visent les
  chaussées circulées, et s'appuie sur le seul chiffre réellement mesuré : le gel.
  ⚠️ **Piège évité et à retenir : une recherche sur « zones H1 H2 H3 » renvoie
  massivement les zones climatiques de la RE2020 et du DPE, qui n'ont AUCUN rapport
  avec les zones de viabilité hivernale du domaine routier.** Deux
  classifications, mêmes étiquettes. Ne pas les confondre, et ne pas se fier à un
  extrait de moteur qui mélange les deux — c'est ce qu'il a fait aujourd'hui.
- **Aucun lien interne ajouté dans les réponses** : le champ `a` est rendu en texte
  brut, un lien y demanderait de changer le rendu du composant. Noté comme chantier
  possible plutôt que bricolé.
- **Prettier non appliqué.** `npx eslint` signale 61 erreurs de formatage sur
  `services.$slug.tsx`, dont **58 préexistantes** (vérifié en stashant le
  changement) : le fichier n'a jamais été conforme, et mes 3 nouvelles lignes
  longues sont de la même famille que les existantes. Lancer `--fix` reformaterait
  tout le fichier, c'est-à-dire un refactor que les consignes interdisent.
  **À savoir pour les prochains runs : ce fichier n'est pas prettier-propre, et les
  entrées de journal antérieures qui disent « prettier --check passe » ne valent
  pas pour lui.**

**Point 2 du run — une septième fiche d'annuaire, trouvée par la mesure et non
par un chantier.** La requête d'indexation nommant le domaine a fait apparaître
`nosartisansontdutalent.fr/entreprise/hce-hini-cours-enrobes/`, **jamais repérée
en 25 runs**. Lue intégralement : fiche **commerciale** (même famille que
PagesJaunes et Mappy), **revendicable en libre-service** (« C'est votre
entreprise ? Prenez la main sur cette fiche »), **sans aucun lien vers le site**,
et porteuse de deux erreurs : l'adresse `1 r Baronne Delort 39300 Champagnole` et
un téléphone mobile `06 50 83 16 86`. **Vérification au registre national le
02/10/2026** (`recherche-entreprises.api.gouv.fr`, SIREN 521683573) : **3
établissements dont 1 seul ouvert**, le siège `40 B avenue Etienne Lamy 39300
Cize` (SIRET 52168357300039) — **l'établissement de Champagnole est fermé.**
La fiche est donc documentée dans `ACTIONS-SEO-CLIENT.md` avec une consigne
explicite : **corriger l'adresse et le téléphone AVANT d'y ajouter l'URL**, et
**ne pas l'ajouter aux `sameAs`** en l'état — même traitement que La Gazette
France le 12/09, pour la même raison.

<!-- section d'origine : État des lieux (archivé le 02/11/2026) -->
> 🔴 **02/10/2026 — LE DÉPLOIEMENT NE PART PLUS. Le code est sur `main`, la
> production sert encore la version du 30/09. À LIRE AVANT TOUT CHANTIER.**
> **Les faits, mesurés :**
> - `origin/main` est à `0b4d0cd`, poussé le **02/10/2026 à 07:23 UTC** (chantier
>   du jour). Le push est confirmé (`84dddba..0b4d0cd HEAD -> main`).
> - **46 minutes plus tard** (dernier relevé à 08:09 UTC, après une vingtaine de
>   mesures espacées de 30 à 45 s), `https://www.hcetp.com/services/enrobe-a-chaud`
>   sert toujours **3 783 caractères** au lieu des 11 856 mesurés au banc d'essai
>   local, et `https://www.hcetp.com/llms.txt` affiche encore « Dernière mise à
>   jour : 30 septembre 2026 ».
> - ⚠️ **Et ce ne sont pas un, mais QUATRE pushes sur `main` qui sont restés sans
>   effet** (`0b4d0cd`, `46987cd`, `9a1014b`, `6220bb5`, entre 07:23 et 08:05 UTC).
>   Chacun est une occasion de déclenchement distincte. **Cela affaiblit nettement
>   l'hypothèse « déploiement lent ou en file d'attente » et renforce celle d'une
>   intégration qui ne reçoit plus l'événement, ou de builds qui échouent.**
>   Pour mémoire, l'acquis du 25/09 chiffrait le délai normal : production à jour
>   **moins de 45 secondes** après un push sur `main`.
> - **Dernière mesure du run : 08:33 UTC, soit 1 h 10 après le premier push, et
>   cinq pushes au total. Toujours 3 783 caractères et toujours « 30 septembre
>   2026 » dans `llms.txt`.** La surveillance a été arrêtée là, faute de pouvoir
>   agir : le run n'a plus rien à mesurer sur ce point. **Le chantier du 02/10
>   existe dans le dépôt et nulle part ailleurs.**
> - `x-vercel-cache: MISS`, `age: 0`, `cache-control: must-revalidate` → **ce
>   n'est pas un cache CDN** : la fonction déployée contient encore l'ancien code.
> - **La preview `hcebtp.lovable.app` est encore plus en retard** : elle sert
>   **11 occurrences de `hcebtp.com`**, donc une version **antérieure à la bascule
>   de domaine du 30/09**.
> - **Le dernier déploiement réellement visible en production date du 30/09**
>   (bascule de domaine `f07b19f` + `/zone-intervention` `6cc006e`, tous deux en
>   ligne). Le commit du 01/10 (`84dddba`) ne touchait qu'un `.md` : **son
>   non-déploiement était invisible**. Le chantier du 02/10 est le premier
>   changement de code depuis le 30/09, et c'est lui qui révèle le blocage.
> **Ce qui a été écarté, vérifié et pas supposé :**
> - ❌ **Pas un problème de code** : `npx tsc --noEmit` en 0, `npm run build` en 0
>   (14 s), `npm run check:fige` en 0, `verif-faq.mjs` 10/10, `verif-lastmod.mjs`
>   13/13 — tous **avant** le push.
> - ❌ **Pas un problème de branche** : le push est allé sur `main` (`git push
>   origin HEAD:main`), et c'est `main` qui déploie (acquis du 25/09).
> - ❌ **Pas un workflow CI en échec** : le dépôt n'a **aucun** workflow
>   (`.github/workflows` absent). Le déploiement passe uniquement par
>   l'intégration Git de Vercel.
> - ❌ **Pas un changement de configuration** : `vite.config.ts` impose toujours
>   `nitro: { preset: "vercel" }`, et il n'a pas été modifié.
> ❌ **Et ce n'est PAS le `package-lock.json` désynchronisé**, contrairement à ce
>   que ce même encadré avançait d'abord. Vérification faite : `package.json` n'a
>   pas été modifié depuis le **11/09** (`0798ac2`) et le lockfile pas depuis
>   `a51c917` — **la désynchronisation est donc antérieure aux déploiements qui ont
>   réussi le 30/09.** Elle ne peut pas expliquer un blocage apparu après. *(Elle
>   reste un vrai sujet pour le runner, voir « Techniques apprises » du 02/10, mais
>   ce n'est pas cette piste-ci.)*
> **Ce qui reste et ne peut pas être fait d'ici :** consulter le tableau de bord
> Vercel. Les causes plausibles, maintenant que le code, la branche, le CI et le
> lockfile sont écartés : **déploiement en échec pour une raison côté
> plateforme** (quota, variable d'environnement, changement de commande
> d'installation), **déploiement en file d'attente**, ou **intégration GitHub
> déconnectée du projet Vercel**. Les trois se lisent en trente secondes sur le
> tableau de bord, et aucune ne se diagnostique depuis le dépôt.
> 🔔 **Le client a été notifié le 02/10/2026**, en dérogation à la cadence
> hebdomadaire (prochaine routine prévue le 08/10) : la règle du 01/10 prévoyait
> explicitement la dérogation « si un contrôle casse ». **C'en est un, et c'est le
> plus grave possible : le travail quotidien ne parvient plus au site.**
> ⚠️ **Consigne pour le prochain run : VÉRIFIER CE POINT EN PREMIER, avant de
> choisir un chantier.** Mesurer `/services/enrobe-a-chaud` en production — s'il
> rend 11 856 caractères, le déploiement est reparti et le chantier du 02/10 est
> effectivement en ligne ; s'il rend encore 3 783, **ne pas empiler un nouveau
> chantier de contenu par-dessus un chantier non déployé**, et relancer l'alerte.

<!-- Archivé le 04/11/2026 depuis « État des lieux » -->

> 🔴 **04/10/2026 — LE BLOCAGE DE DÉPLOIEMENT TIENT DEPUIS 48 HEURES. À LIRE
> AVANT TOUT CHANTIER.** L'encadré du 02/10 ci-dessous reste valable mot pour
> mot ; voici seulement ce que la mesure du 04/10 y ajoute.
> **Mesuré le 04/10/2026 à 07:01 UTC, soit 47 h 38 après le push du chantier :**
> - `/services/enrobe-a-chaud` sert **3 783 caractères**. La valeur attendue est
>   11 856. **Inchangé depuis le 02/10 : le chantier n'est toujours pas en ligne.**
> - `/llms.txt` en production affiche toujours « Dernière mise à jour : **30
>   septembre 2026** », alors que `public/llms.txt` dans le dépôt dit « **2
>   octobre 2026** ». Les deux dates encadrent le blocage à elles seules.
> - `x-vercel-cache: MISS`, `age: 0` → toujours pas un cache CDN.
> - Le code est toujours sain : `npx tsc --noEmit` en 0 sur `origin/main`
>   (`dd96784`), et le contenu attendu est bien présent dans
>   `src/routes/services.$slug.tsx`.
> - **La production, elle, n'est pas cassée — elle est seulement vieille.**
>   `verif-faq.mjs` 11/11 et `verif-lastmod.mjs` 13/13 passent en ligne. Rien
>   n'est à réparer en urgence côté visiteur ; c'est le canal de livraison qui
>   est mort, pas le site.
> **Un sixième push mesuré en direct, et il ne change rien non plus.** Le commit
> de documentation du 04/10 (`2792410`, poussé à 07:08 UTC) a été suivi de **sept
> mesures sur 3 min 08** (07:09:12 → 07:12:20) : `llms.txt` reste figé sur « 30
> septembre 2026 » et le HTML de `/services/enrobe-a-chaud` reste à **30 261
> octets** exactement, inchangé à l'octet près. Pour mémoire, le délai normal
> mesuré le 25/09 est de **moins de 45 secondes**. **Ce push est une sixième
> occasion de déclenchement sans effet**, et la première à être mesurée en
> continu juste après l'envoi plutôt que constatée après coup. *(Ce push ne
> touchait que des `.md`, donc il ne pouvait pas changer le contenu des pages —
> mais `public/llms.txt` fait partie du déploiement, et sa date figée à « 30
> septembre » alors que le dépôt dit « 2 octobre » suffit à prouver qu'aucun
> déploiement n'a eu lieu.)*
> **Ce que le run du 04/10 en a conclu, et qui vaut pour les suivants :**
> - **Aucun chantier de code n'a été poussé aujourd'hui**, en application de la
>   consigne du 02/10 — et pour une raison qui s'est renforcée : si c'est le
>   *build* qui échoue, chaque commit supplémentaire rend le diagnostic plus
>   difficile à faire pour qui ouvrira le tableau de bord. Le dépôt doit rester
>   dans l'état où le blocage est apparu.
> - **Le client a été relancé le 04/10** (notification), avec la mesure des 48 h
>   et les trois causes à vérifier sur Vercel.
> ⚠️ **Consigne inchangée pour le prochain run : mesurer
> `/services/enrobe-a-chaud` AVANT de choisir un chantier.** S'il rend 11 856
> caractères, le déploiement est reparti : reprendre alors le cours normal, et le
> premier chantier qui attend est celui décrit sous « Chantiers en attente » au
> 04/10 (ajout de PagesJaunes aux `sameAs`). S'il rend encore 3 783, ne pas
> pousser de code et se limiter à ce qui vit hors du site (annuaires, NAP,
> fiches), comme le 04/10.

## Archivé le 06/11/2026 (blocs d'état du 06/10 et du 05/10/2026)

> 🔴 **06/10/2026 — LE BLOCAGE TIENT DEPUIS 4 JOURS, ET LES DEUX LEVIERS DU
> DÉPÔT SONT MAINTENANT ÉPUISÉS. L'encadré du 05/10 ci-dessous reste juste sur
> le diagnostic ; voici ce que la journée y ajoute, et ça change la consigne.**
>
> **Mesuré le 06/10 à 07:13 puis 07:56 UTC :** `/services/enrobe-a-chaud` sert
> toujours **3 783 caractères** (30 261 octets, **inchangé à l'octet près depuis
> le 02/10**), `/llms.txt` affiche toujours « **30 septembre 2026** » quand le
> dépôt dit « 2 octobre 2026 ». Les 13 URLs répondent en 200 : **la production
> n'est pas cassée, elle a 6 jours.**
>
> **Le second levier du dépôt a été tenté, mesuré, et il ne débloque pas.**
> Commit `1dd1c98` poussé sur `main` à **07:33:06 UTC** : il épingle le runtime
> des Vercel Functions à `nodejs22.x` au lieu de le laisser déduire de la version
> de Node qui exécute le build (détail sous « Chantiers faits » du jour).
> **La production est restée inchangée pendant les 27 minutes qui ont suivi**,
> mesurée en continu : **19 relevés espacés de 21 s entre 07:53:48 et 08:00:35
> UTC**, tous à `30 261` octets sur `/services/enrobe-a-chaud` et tous sur « 30
> septembre 2026 » dans `llms.txt`. Le délai normal mesuré le 25/09 est de
> **moins de 45 secondes**. *(Le dernier relevé affiche `0` octet : échec
> ponctuel de la requête, pas une page vide.)*
>
> **Ce que ça tranche, et c'est le vrai acquis du jour :**
> - `engines.node` = 22.x (poussé le 05/10) → **n'a pas débloqué**.
> - runtime des Functions épinglé à `nodejs22.x` (poussé le 06/10) → **n'a pas
>   débloqué non plus**.
> - **Ce sont les deux seules prises que le dépôt a sur la version de Node.** Il
>   n'en reste aucune. ⚠️ **Ne pas chercher un troisième correctif de ce genre
>   dans le dépôt : il n'y en a pas.**
> - **Conséquence sur le diagnostic :** le rejet ne porte donc **pas (seulement)
>   sur la chaîne de runtime émise dans `.vc-config.json`**, puisque la fixer ne
>   change rien. Soit le réglage Node du projet est refusé **avant** que la
>   sortie du build soit lue, soit la cause est ailleurs (limite de plan ou
>   d'usage du compte, variable d'environnement, cache de build). **Ces branches
>   ne se départagent pas depuis le dépôt**, et contrairement au 02/10 ce n'est
>   plus une supposition : c'est ce qui reste après avoir épuisé les deux leviers.
>
> ✅ **La seule action qui reste, et elle est unique :** ouvrir le déploiement en
> échec sur le tableau de bord Vercel et **lire le message d'erreur du journal de
> build**. Il nomme la cause en une ligne. Seul le compte propriétaire y accède.
> Chemin et lien dans `ACTIONS-SEO-CLIENT.md`, « ACTION 0 ».
>
> ⚠️ **Note de continuité, et elle a failli coûter une journée de travail : le
> run du 05/10 n'avait PAS poussé sur `main`.** Son diagnostic, son correctif
> `engines` et son entrée de journal étaient sur la branche
> `claude/upbeat-wozniak-q9cj7x` et nulle part ailleurs — donc **invisibles pour
> le run du 06/10, qui a démarré en croyant le blocage non diagnostiqué**. Le
> travail a été récupéré en *fast-forward* sur `main` aujourd'hui. Voir « Erreurs
> commises et corrigées » du 06/10 : **ce qui n'est pas sur `main` n'existe pas,
> ni pour la production ni pour le run suivant.**
>
> ⚠️ **Consigne pour le prochain run, et elle est assouplie sur un point.**
> 1. **Mesurer `/services/enrobe-a-chaud` AVANT de choisir un chantier.** 11 856
>    caractères → le déploiement est reparti, reprendre le cours normal. 3 783 →
>    toujours bloqué.
> 2. **Ne plus retenter de correctif de déploiement dans le dépôt** (les deux
>    leviers sont épuisés, voir ci-dessus) et **ne plus relancer le diagnostic
>    déjà fait** : il est complet, il est ci-dessus.
> 3. **En revanche, le gel du travail de contenu décidé le 02/10 n'a plus de
>    raison d'être.** Il tenait à un motif précis — « garder le dépôt dans
>    l'état où le blocage est apparu pour ne pas gêner le diagnostic ». **Le
>    diagnostic est fait, et les statuts de déploiement sont désormais lisibles
>    depuis le runner** : un commit de plus ne brouille plus rien. Geler le
>    contenu plus longtemps revient surtout à ne rien produire pendant que le
>    client n'a pas agi — le blocage pourrait durer encore des jours.
>    **Recommandation : reprendre le travail de contenu**, en le vérifiant au
>    banc d'essai local (recette du 15/09) + `verif-faq.mjs` + `verif-lastmod.mjs`
>    avant push, et **en notant que la vérification EN LIGNE reste due** pour
>    tout ce qui aura été poussé pendant le blocage. Tenir la liste de cette
>    dette sous « Chantiers en attente ».

> 🟢 **05/10/2026 — LE BLOCAGE DE DÉPLOIEMENT EST DIAGNOSTIQUÉ. Les deux
> encadrés du 02/10 et du 04/10 ci-dessous sont PÉRIMÉS sur un point central :
> ils concluent « la cause est hors du dépôt et ne se diagnostique pas d'ici ».
> C'est faux, et ça a coûté trois jours. À lire avant eux.**
>
> **Ce qui manquait n'était pas un accès au tableau de bord Vercel : c'était une
> requête. Vercel publie ses statuts de déploiement sur GitHub, et le runner les
> lit sans aucun jeton supplémentaire** (recette complète sous « Techniques
> apprises » du 05/10) :
>
> ```
> GET https://api.github.com/repos/:owner/:repo/commits/:sha/status
> GET https://api.github.com/repos/:owner/:repo/deployments
> GET https://api.github.com/repos/:owner/:repo/deployments/:id/statuses
> ```
>
> **Ce qu'ils disent, mesuré le 05/10 :**
> - **Les builds ÉCHOUENT.** Tous les déploiements depuis `0b4d0cd` (02/10
>   07:24 UTC) sont en état `failure` : « Deployment has failed — run this Vercel
>   CLI command: npx vercel inspect dpl_… --logs ».
> - **L'intégration GitHub → Vercel fonctionne.** Chaque push crée bien un
>   déploiement, en moins de 20 s (mesuré en direct sur le push du jour : statut
>   `pending` à t+20 s, `failure` à t+40 s). **Les trois hypothèses laissées
>   ouvertes le 02/10 — cache CDN, file d'attente, intégration déconnectée — sont
>   donc toutes les trois écartées.**
> - **Dernier succès : `84dddba`, 01/10 à 07:12 UTC.** Premier échec : `0b4d0cd`,
>   02/10 à 07:24 UTC. **La fenêtre de rupture est donc 01/10 07:12 → 02/10
>   07:24 UTC**, et elle ne contient aucun changement de dépendance ni de config.
> - **Pourquoi ça ressemblait à un silence :** un déploiement en échec ne
>   remplace pas le précédent. La production n'est pas cassée, elle est vieille.
>   C'est exactement ce que le 02/10 avait observé sans pouvoir l'expliquer.
>
> **Le dépôt est innocenté par la mesure, et cette fois ce n'est pas une
> déduction :** sur l'arbre exact de `722b55a`, `npm install`, `npm ci`,
> `bun install` et `bun install --frozen-lockfile` passent **tous les quatre**,
> puis `npx tsc --noEmit`, `npm run build` et `npm run check:fige` sortent en 0
> (Node 22.22.0). L'échec **ne se reproduit pas hors de Vercel**.
>
> **La piste principale, et elle n'est PAS confirmée.** Vercel a désactivé
> Node.js 20 le 01/10/2026 : « On October 1, 2026, Node.js 20 will be disabled in
> Project Settings […] Existing projects using 20 as the version for Functions
> will display an error when a new deployment is created »
> ([changelog Vercel](https://vercel.com/changelog/node-js-20-is-being-deprecated),
> lu le 05/10). Le dépôt ne déclarait **aucune** version : le build suivait donc
> le réglage du tableau de bord, invisible d'ici. **Deux faits empêchent de
> conclure :**
> 1. **le déploiement du 01/10 à 07:12 a RÉUSSI**, alors que la désactivation
>    prenait effet à 00:00 ce jour-là et que le changelog ne mentionne aucun
>    déploiement progressif ;
> 2. **le build de preview du commit du jour, `engines.node` en place, a échoué
>    lui aussi** (en moins de 40 s). Or `engines.node` est censé primer sur le
>    réglage du projet (doc Vercel, « Version overrides in package.json »).
>
> **Donc : soit le réglage du projet est refusé avant même que `package.json` soit
> lu — et seul le tableau de bord peut le corriger —, soit la cause est
> ailleurs.** Deuxième candidate sérieuse, jamais envisagée jusqu'ici : **une
> limite d'usage du compte Vercel** (plan Hobby dépassé → nouveaux déploiements
> bloqués), qui expliquerait aussi une rupture tombant un 1er/2 du mois.
>
> ⚠️ **CONSIGNE POUR LE PROCHAIN RUN, et elle remplace celle du 02/10 :**
> 1. **Relever l'état du dernier déploiement par l'API GitHub, en premier.** Une
>    requête, trois secondes. Ne plus jamais passer trois jours à mesurer des
>    octets en production pour deviner ce qu'un statut dit en clair.
> 2. **La consigne « ne pas pousser de code pendant le blocage » est ANNULÉE.**
>    Elle était fondée sur une crainte fausse. **Un déploiement en échec ne touche
>    pas la production** : pousser ne peut donc rien casser en ligne, et
>    s'interdire de pousser a seulement gelé trois jours de travail. Reprendre le
>    cours normal des chantiers, en sachant qu'ils n'arriveront en ligne qu'après
>    le déblocage.
> 3. **Ce qui reste bloqué côté client est désormais précis** (et non plus « aller
>    voir le tableau de bord ») : lire l'erreur du build à l'URL exacte, vérifier
>    le réglage Node.js, regarder les limites du compte. Voir « Action 0 » en tête
>    de `ACTIONS-SEO-CLIENT.md`, écrite le 05/10.
> 4. ⚠️ **ATTENTION, POINT DE CONTINUITÉ : le travail du 05/10 n'est PAS sur
>    `main`.** Le push vers `main` a été refusé par la couche de sécurité du
>    runner (motif « Production Deploy »), ce qui n'était jamais arrivé aux runs
>    précédents. Tout est poussé sur la branche
>    **`claude/upbeat-wozniak-q9cj7x`** (commits `9880840` et suivants). **Si
>    cette entrée de journal est absente de `main` au prochain run, c'est que la
>    branche n'a pas été fusionnée : la chercher là-bas avant de refaire le
>    travail.**

## Archivé le 07/11/2026 (bloc d'état du 07/10/2026)

> 🟠 **07/10/2026 — LE BLOCAGE DE DÉPLOIEMENT TIENT DEPUIS 5 JOURS, LE CLIENT
> N'A PAS AGI, ET CE RUN A REPRIS LE TRAVAIL DE CONTENU. À lire avant l'encadré
> du 06/10 ci-dessous, qu'il confirme sans le contredire.**
>
> **Le blocage, mesuré en 3 secondes par la recette du 05/10 et plus par des
> octets :** `GET /repos/:owner/:repo/commits/12f7431/status` → **`failure`**,
> « Deployment has failed — run this Vercel CLI command: npx vercel inspect
> `dpl_Bkx8DSZRpgzvTjXesTJonw1JbL6P` --logs ». **Le dernier déploiement date du
> 06/10 à 08:03:46 UTC et il a échoué ; aucun déploiement n'a eu lieu depuis.**
> La recette fonctionne : c'est désormais une mesure d'une requête, à faire en
> premier à chaque run.
>
> **Le client n'a pas agi, et c'est le fait du jour.** `git log` sur
> `origin/main` : **aucun commit d'un autre auteur depuis la bascule de domaine
> du 30/09**. L'ACTION 0 d'`ACTIONS-SEO-CLIENT.md` (ouvrir le build en échec sur
> le tableau de bord Vercel et lire l'erreur) **n'a pas été exécutée**. Elle
> reste la seule action qui débloque, et elle n'est pas de notre côté.
>
> **Production cohérente avec ce diagnostic, revérifiée :**
> `/services/enrobe-a-chaud` sert toujours **30 261 octets / 3 783 caractères**
> (attendu 11 856), `/llms.txt` affiche toujours « 30 septembre 2026 » quand le
> dépôt dit « 2 octobre 2026 ». Les 13 URLs répondent en 200 : **la production
> n'est pas cassée, elle a 7 jours.**
>
> ✅ **Ce que ce run a fait, et c'est l'application de la consigne du 06/10 :**
> le gel du contenu étant levé, **un vrai chantier a été mené et poussé** — le
> maillage interne des six pages `/services/*`, qui passent de **1 lien interne
> servi à 6 ou 7**. Détail sous « Chantiers faits » du 07/10. Plus l'ajout de
> `pagesjaunes.fr/pros/52322496` aux `sameAs`, chantier posé le 04/10 et prêt.
> **Tout est vérifié au banc d'essai local ; rien n'est vérifié en ligne, et ça
> s'ajoute à la dette de vérification tenue sous « Chantiers en attente ».**
>
> ⚠️ **CONSIGNE POUR LE PROCHAIN RUN — courte, parce que l'essentiel ne change
> pas.**
> 1. **Relever l'état du dernier déploiement par l'API GitHub, en premier** (une
>    requête). `success` → **purger la dette de vérification en ligne AVANT tout
>    nouveau chantier** (liste sous « Chantiers en attente »). `failure` →
>    continuer le travail de contenu, il arrivera en ligne plus tard.
> 2. **Ne PAS retenter un correctif de déploiement dans le dépôt.** Les deux
>    leviers sont épuisés et mesurés (06/10). Inchangé.
> 3. **Ne pas relancer le diagnostic de déploiement** : il est complet depuis le
>    05/10. Le seul geste utile est côté client.
> 4. **Le chantier de contenu continue normalement.** Le prochain candidat est
>    `/realisations/chantier-en-cours` (373 caractères servis, seule page du
>    sitemap sans date et sans entrée `PAGE_UPDATED`) — ⚠️ c'est une galerie, lire
>    la réserve sous « Chantiers en attente » avant de rédiger.


## Archivé le 08/11/2026 — blocs d'état des 07-08/10 et positions des 05, 07 et 08/10

> ✅ **Addendum du 08/10, mesuré APRÈS le push du jour (commit `924ac78`, poussé
> sur `main` à 07:43 UTC) — deux faits.**
> 1. **Le push vers `main` est passé sans encombre**, comme le 07/10. Le refus
>    « Production Deploy » du 05/10 ne s'est pas reproduit deux runs de suite :
>    il peut être considéré comme un incident ponctuel, pas comme une règle de
>    l'environnement.
> 2. **Le déploiement de ce commit a échoué, et il a été chronométré sur deux
>    minutes :** `failure` dès **t+20 s** et stable à t+40, 60, 80, 100 et 120 s
>    (`dpl_Hp5D5w2dzBD92sGRDnXYCwmbBybE`, statut posé à 07:43:29 UTC).
>    **Signature identique au 05/10 et au 07/10** — échec immédiat et
>    reproductible, cohérent avec un rejet en amont du build. Le build complet
>    sort en 17 s en local. **Seul le journal de build tranche, et il demande le
>    compte propriétaire.**
> 3. `ACTIONS-SEO-CLIENT.md` porte en tête le bloc du 08/10 (les quatre
>    informations manquantes des mentions légales) et l'identifiant de
>    déploiement en échec du jour.


> 🟠 **08/10/2026 — SEPTIÈME JOUR DE BLOCAGE DE DÉPLOIEMENT, INDEXATION
> TOUJOURS NULLE, ET LE CHANTIER DU JOUR COMBLE UN TROU LÉGAL : LE SITE N'AVAIT
> AUCUNE MENTION LÉGALE. À lire avant l'encadré du 07/10, qu'il confirme.**
>
> **Le blocage, mesuré en une requête par la recette du 05/10 :**
> `GET /repos/stupidguywearingtn/art-du-jardin-web/commits/df5fb24/status` →
> **`state: failure`**, « Deployment has failed — run this Vercel CLI command:
> npx vercel inspect `dpl_2SpXiojhkGTTjFrFiwuXSD6QaErX` --logs », statut posé le
> **07/10 à 07:39:44 UTC**. ⚠️ **Note d'exactitude : l'identifiant de
> déploiement n'est pas celui que le journal du 07/10 avait inscrit**
> (`dpl_9yaN7EmfLcYhoV5w56joBYqwCpmV`). Les deux sont réels — le push du 07/10 a
> déclenché plus d'un déploiement — mais **c'est le statut du dernier commit de
> `main` qui fait foi, pas un identifiant recopié**. Prendre l'identifiant dans
> la réponse de l'API le jour même, jamais dans le journal de la veille.
>
> **Production cohérente avec ce diagnostic, revérifiée ce matin :**
> `/services/enrobe-a-chaud` sert toujours **30 261 octets**, `/llms.txt`
> affiche toujours « 30 septembre 2026 » quand le dépôt dit « 2 octobre » (et
> maintenant « 8 octobre »). **La production a huit jours.** L'apex
> `hcebtp.com` répond bien **308 → `https://www.hcetp.com/`** (un premier
> `curl` a rendu un code 000 : c'était un aléa réseau, pas une panne — le
> deuxième appel, verbeux, a montré le 308 complet. **Ne pas conclure sur une
> seule mesure réseau.**)
>
> ✅ **Le site est intégralement explorable, et c'est vérifié autrement qu'en
> relisant le code** : `robots.txt` en `Allow: /`, sitemap valide, aucune balise
> `robots` restrictive, canonical auto-référent — et surtout **les pages
> répondent 200 à un `curl` portant l'User-Agent de Googlebot, sans `Set-Cookie`
> ni `x-robots-tag`**. Il n'y a donc **ni blocage de pare-feu, ni protection de
> déploiement Vercel** sur le chemin du crawler. Cette vérification manquait :
> le journal concluait « site sain » depuis le 07/09 sur la seule lecture du
> dépôt. **Elle est faite, elle est négative, et elle n'a pas à être refaite
> avant un changement d'hébergement.**
>
> ✅ **Chantier du jour, mené jusqu'au bout et validé au banc d'essai local :
> création de `/mentions-legales`** (8 351 caractères servis). Détail sous
> « Chantiers faits » du 08/10. C'est la 14ᵉ URL du sitemap.
>
> ⚠️ **CONSIGNE POUR LE PROCHAIN RUN.**
> 1. **Relever l'état du dernier déploiement par l'API GitHub, en premier.**
>    `success` → **purger la dette de vérification en ligne AVANT tout nouveau
>    chantier** (liste sous « Chantiers en attente », complétée du 08/10).
>    `failure` → continuer le travail de contenu.
> 2. **Ne PAS retenter un correctif de déploiement dans le dépôt** (leviers
>    épuisés et mesurés le 06/10), **ni relancer le diagnostic** (complet depuis
>    le 05/10). Inchangé.
> 3. **Ne pas mesurer les positions avec `curl` sur Bing ni sur DuckDuckGo** :
>    testé aujourd'hui, les deux canaux sont inutilisables. Voir « Techniques
>    apprises » du 08/10 — c'est l'économie d'une heure.
> 4. **Prochain candidat de contenu : `/realisations/chantier-en-cours`**
>    (373 caractères servis, seule URL du sitemap sans date affichée). ⚠️ C'est
>    une galerie : lire la réserve sous « Chantiers en attente » avant de
>    rédiger. Le filon « page légale » est désormais épuisé — il n'y en avait
>    qu'une.


> ✅ **Addendum du 07/10, mesuré APRÈS le push du jour (commit `23eb831`,
> poussé sur `main` à 07:43 UTC) — deux faits à retenir.**
> 1. **Le push vers `main` est passé sans encombre.** Le refus « Production
>    Deploy » qui avait frappé le run du 05/10 et coûté une journée de travail
>    invisible **ne s'est pas reproduit**. Le travail du jour est bien sur
>    `main`, pas sur une branche de session : vérifié par `git push` puis
>    `git log origin/main`.
> 2. **Le déploiement de ce commit a échoué lui aussi, et il a été chronométré :**
>    `pending` à **t+20 s**, `failure` à **t+40 s**
>    (`dpl_9yaN7EmfLcYhoV5w56joBYqwCpmV`). **Signature identique à celle du
>    05/10** — l'échec est immédiat et reproductible, ce qui reste cohérent avec
>    un rejet en amont du build plutôt qu'avec une erreur de compilation (le
>    build complet prend ~18 s en local, mais l'échec Vercel ne laisse aucun
>    journal lisible d'ici). **Ne pas en tirer plus : seul le journal de build
>    tranche, et il demande le compte propriétaire.**
> 3. `ACTIONS-SEO-CLIENT.md` a reçu une **relance datée du 07/10** en tête, avec
>    l'identifiant du déploiement en échec du jour et la liste de ce qui attend
>    en ligne.


### Positions mesurées — 08/10/2026

**Indexation : toujours nulle, sixième semaine. Mais la mesure du jour est
surtout une mesure sur les OUTILS, et elle économisera du temps.**

| Requête / contrôle | 08/10/2026 | Évolution vs 07/10 |
|---|---|---|
| `site:hcetp.com` (`WebSearch`) | **0 résultat du domaine** (9 pages d'acronymes sans rapport : ceetp.udel.edu, hptn.org, hpcet, hug.ch, cetweb.edu, cetl.hku.hk, cpet.tc.columbia.edu) | inchangé sur le fond — **opérateur toujours non honoré par ce canal** |
| `"hcetp.com" HCE Cize enrobé` (`WebSearch`) | **0 page mentionnant le domaine, où que ce soit.** Les 9 résultats parlent d'« enrobé » au sens confiserie/œnologie (OQLF, douane suisse, guide Hachette) et d'un collier cervical « Cizeta » | **reconduit le relevé du 04/10 — et c'est la ligne qui compte** : zéro mention du domaine sur le web indexé, pas seulement zéro lien |
| Crawlabilité réelle sous User-Agent Googlebot | **200 sur `/` et sur `/services/enrobe-a-chaud`**, aucun `Set-Cookie`, aucun `x-robots-tag`, `robots.txt` en `Allow: /` | 🆕 **nouveau contrôle, négatif : rien ne bloque le crawler** |
| Apex `hcebtp.com` | **308 → `https://www.hcetp.com/`** (serveur `Vercel`) | inchangé |
| Dernier déploiement (API GitHub, commit `df5fb24`) | **`failure`**, `dpl_2SpXiojhkGTTjFrFiwuXSD6QaErX`, posé le 07/10 à 07:39:44 UTC | inchangé — septième jour |

⚠️ **RÉSERVE DE MÉTHODE, et elle est maintenant adossée à trois canaux testés,
pas à un.** La réserve posée le 07/10 sur `WebSearch` tient. Les deux canaux
essayés aujourd'hui pour la contourner **sont pires** :
- **Bing en `curl`** rend des SERP sans aucun rapport avec la requête (« enrobé
  à chaud Jura » → l'Apec de Toulouse ; « terrassement Jura » → un forum
  Toyota ; `site:hcetp.com` → des pages de téléchargement de WhatsApp). Le
  paramètre `&format=rss` est encore plus franchement faux. **Ce canal ne
  mesure rien.**
- **DuckDuckGo** (`html.duckduckgo.com`) répond **HTTP 202**, c'est-à-dire une
  page de défi anti-robot, sans aucun résultat.

**Conséquence pratique, à tenir :** la seule mesure d'indexation exploitable
depuis ce runner reste **« le domaine apparaît / n'apparaît pas » via
`WebSearch`**, plus le code IndexNow. **Ne pas redépenser de temps à chercher un
canal SERP ; il n'y en a pas.** La vraie mesure de progrès viendra de la Search
Console, donc du client.

**Volume de texte servi — banc d'essai local (`vite dev`), pas production.** La
production est inchangée au caractère près depuis le 30/09 (huitième relevé
identique). Valeurs locales du jour, qui sont ce qui partira en ligne au
déblocage : **13 543** (accueil, +17 car. : le lien « Mentions légales » du pied
de page) / 12 633 / 13 491 / **8 351** (🆕 `/mentions-legales`) / 8 578 / 8 156 /
7 670 / 7 634 / 7 413 / 6 356 / 5 832 / 5 706 / 5 154 / 373.

### Positions mesurées — 07/10/2026

**Indexation : toujours nulle, cinquième semaine. Quatre mesures, toutes
reconduites.**

| Requête | 07/10/2026 | Évolution vs 05/10 |
|---|---|---|
| `site:hcetp.com` | **0 résultat du domaine** (9 pages d'acronymes : HPTN, CEETP Delaware, HPCET Inde, TFETP Taïwan, hug.ch, cetweb.edu, ctep.cancer.gov) | inchangé sur le fond — **opérateur toujours non honoré par ce canal, ce résultat n'est pas une information**. La composition des 9 pages a entièrement changé, ce qui confirme qu'elle est du bruit |
| phrase exacte du site `"Médaillons et inserts pavés intégrés à l'enrobé"` | **0 résultat du domaine** — et cette fois **9 brevets américains** (USPTO, Google Patents, CIPO) au lieu des 10 sites français d'enrobé relevés les 30/09 → 02/10 | ⚠️ **rupture de composition totale, et c'est un biais d'outil, pas un signal** : voir la réserve ci-dessous |
| requête nommant le domaine et l'entité | **0 page du domaine** ; 9 résultats sur Cize (Wikipédia, INSEE, jura-tourism) sans rapport avec l'entreprise | inchangé sur le fond |
| `enrobé à chaud Jura entreprise` (requête commerciale) | **HCE absent du domaine**, 9 résultats. 🆕 **Mais la fiche `118712.fr` de l'entreprise sort en 1ʳᵉ position** | ⚠️ **SFCTP, qui tenait 4 URLs sur 9 depuis le 02/10, est absent du relevé** ; PagesJaunes aussi. Composition méconnaissable — même réserve |
| **code IndexNow** | **200** (fichier clé servi en 200, 13 URLs soumises) | inchangé depuis le 02/10 |

⚠️ **RÉSERVE DE MÉTHODE, ET ELLE EST PLUS FORTE QUE LES RUNS PRÉCÉDENTS NE LE
DISAIENT. Ne pas lire les changements de composition de ce tableau comme des
mouvements de marché.** Deux relevés du jour le prouvent : la phrase exacte du
site, qui ramenait **dix sites français d'enrobé** les 30/09, 01/10 et 02/10,
ramène aujourd'hui **neuf brevets américains sur le pavage décoratif** ; et la
requête commerciale ne contient plus ni SFCTP ni PagesJaunes, qui tenaient
ensemble 6 places sur 9 il y a deux jours. **Aucun bouleversement de SERP de
cette ampleur n'est crédible en 48 h sur un marché local français.** C'est
l'orientation marché américain de `WebSearch`, déjà notée depuis le 05/10, qui
domine le résultat. **Conséquence pratique à tenir : la seule ligne de ce
tableau qui vaut comme mesure de progrès est « le domaine apparaît / n'apparaît
pas », plus le code IndexNow. Les positions des concurrents et l'ordre des
résultats ne sont pas exploitables par ce canal — ne plus construire de chantier
sur « ce que fait SFCTP ».**

🆕 **Une huitième fiche d'annuaire découverte, et elle ne porte pas de lien non
plus.** `https://www.118712.fr/professionnels/WkBSXFVRFAc` — « H.C.E
Aménagement de Cours en Enrobés », sort **1ʳᵉ sur la requête commerciale**. Lue
le 07/10 : nom correct, activité correcte (« travaux publics, exploitation de
carrières, travaux routiers, entreprises de terrassement », « aménagement de
cours en enrobé »), adresse **« 40 av Etienne Lamy 39300 Cize »**, téléphone
**masqué derrière un bouton « Afficher le n° »**, et **aucun lien vers un site**.
⚠️ **Volontairement PAS ajoutée aux `sameAs`**, et la raison est le critère
appliqué depuis le 13/09 : une fiche n'entre dans les `sameAs` que si **le
téléphone et l'adresse y sont vérifiés**. Ici le téléphone n'est pas lisible et
l'adresse ne porte pas le « Bis » tranché le 04/10. **Le critère tient, la fiche
attend.** Elle porte le compte à **huit fiches d'annuaire qui parlent de
l'entreprise sans jamais mener au site** — le diagnostic du 04/10 est donc
renforcé, pas modifié.

⚠️ **Note sur la fiche PagesJaunes, relue le 07/10 avant de l'ajouter aux
`sameAs` : elle publie deux informations qui contredisent le contenu figé, et
elles n'ont PAS été reprises.** (a) « SARL established **April 1, 2010** » alors
que le contenu figé par le client dit **2012** ; (b) « **4.5 stars on Google (16
reviews)** » alors que la section avis a été supprimée à la demande du client.
**Rien de tout cela n'a été touché ni recopié** : le contenu figé fait foi, et on
n'ajoute pas d'`aggregateRating` pour une note qu'on ne maîtrise pas et que le
client a explicitement retirée du site. Noté ici pour qu'un prochain run ne
« corrige » pas le site d'après cette fiche.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs` sur
`https://www.hcetp.com`) : **inchangé au caractère près depuis le 30/09**, soit
le septième relevé identique (13 526 / 13 491 / 8 578 / 8 156 / 7 670 / 7 012 /
6 821 / 6 356 / 5 198 / 5 080 / 4 482 / **3 783** / 373).
`/services/enrobe-a-chaud` toujours à 3 783 au lieu de 11 856 : **cinquième jour
hors ligne** pour le chantier du 02/10.

**Graphe des liens internes servis — la mesure du chantier du jour**, relevée
des deux côtés (production = avant, banc local = après) :

| Page | Avant (prod) | Après (banc local) |
|---|---|---|
| `/services/preparation-terrain` | **1** | **6** |
| `/services/enrobe-a-chaud` | **1** | **7** |
| `/services/maconnerie-generale` | **1** | **6** |
| `/services/drainage-pentes` | **1** | **6** |
| `/services/bordures-murets` | **1** | **6** |
| `/services/finitions-soignees` | **1** | **6** |

### Positions mesurées — 05/10/2026

**Indexation : toujours nulle. Quatre mesures, toutes reconduites à
l'identique du 04/10.**

| Requête | 05/10/2026 | Évolution vs 04/10 |
|---|---|---|
| `site:hcetp.com` | **0 résultat du domaine** (9 pages d'acronymes : Wikipédia HCET/HCT/HCPT, Hitkarini College, hrsa.gov, sites.bu.edu) | inchangé — opérateur toujours non honoré par ce canal, ce n'est pas une information |
| `"hcetp.com" OR "hcebtp.com" HCE Cize` | **0 page mentionnant l'un ou l'autre domaine** | inchangé |
| `HCE enrobé à chaud Cize Jura travaux publics hcetp` | **0 résultat du domaine**, mais **10 résultats sur l'entreprise** | inchangé sur le fond ; composition : PagesJaunes **×5** (4 pages départementales + la fiche `/pros/52322496`), Mappy, Kompass, Verif, societe.com, manageo. `nosartisansontdutalent.fr` ressort de la liste |
| `enrobé à chaud Jura entreprise` (requête commerciale) | **HCE absent**, 9 résultats | inchangé. SFCTP tient toujours **4 URLs** sur 9 ; les 2 pages départementales PagesJaunes tiennent les 2 premières places ; entrent daniel-moquet, socorebat, un-max-de-services |
| **code IndexNow** | **200** | inchangé (13 URLs, fichier clé servi en 200) |

**Le diagnostic du 04/10 tient : zéro mention des deux domaines sur le web
indexé, et sept fiches d'annuaire qui parlent de l'entreprise sans jamais mener
au site.** Rien n'a bougé en 24 h, ce qui est normal : aucune action de
découverte n'est possible depuis le dépôt, et les actions 1 à 4 attendent le
client.

⚠️ **Réserve de méthode, inchangée :** `WebSearch` est orienté marché américain
et ne vaut pas une SERP google.fr. Le troisième relevé le rend malgré tout
exploitable : l'index interrogé **connaît** l'entreprise sur dix pages
françaises, donc l'absence du domaine n'est pas un biais de couverture.

**Volume de texte servi en production** (`scripts/mesure-texte-servi.mjs` sur
`https://www.hcetp.com`) : **les 13 URLs rendent exactement les mêmes valeurs
qu'aux 30/09, 01/10, 02/10 et 04/10, au caractère près** (13 526 / 13 491 /
8 578 / 8 156 / 7 670 / 7 012 / 6 821 / 6 356 / 5 198 / 5 080 / 4 482 / **3 783**
/ 373). `/services/enrobe-a-chaud` à **3 783** au lieu des 11 856 attendus : le
chantier du 02/10 n'est toujours pas en ligne, **quatrième jour**. `/llms.txt` en
production affiche toujours « 30 septembre 2026 » quand le dépôt dit « 2 octobre
2026 ».

**Contrôle du dépôt (banc local, pas la production) :** `llms.txt` est **à
jour et sans dérive** — les 12 routes de `src/lib/lastmod.ts` y sont toutes
présentes, 0 occurrence de l'ancien domaine `hcebtp`. Rien à corriger. Sa date
reste au 2 octobre : **volontairement pas touchée**, aucun contenu n'ayant changé
aujourd'hui.

## Archivé le 09/11/2026 — « Chantiers faits » des 04 à 08/10/2026

<!-- section d'origine : Chantiers faits -->
### 08/10/2026 — `/mentions-legales` : le site n'avait aucune mention légale, et c'était à la fois une infraction et le chaînon NAP manquant (8 351 caractères servis, 14ᵉ URL du sitemap)

**Pourquoi ce chantier et pas un autre.** Le run a commencé par la mesure, et
elle a donné trois choses : le déploiement échoue toujours (septième jour),
l'indexation est toujours nulle, et **rien ne bloque le crawler** — le
200 sous User-Agent Googlebot le prouve. La priorité absolue fixée par la
consigne tant que l'indexation n'est pas acquise est **la cohérence NAP et les
points d'entrée d'entité**, et le levier externe (annuaires, fiches) n'est pas
actionnable depuis ce runner : il demande des comptes que nous n'avons pas, et
la relance client a été faite la veille. **En inventoriant les routes pour
trouver ce qui manquait réellement, un trou est apparu : aucune page de
mentions légales, nulle part.** Le pied de page se limitait à l'adresse, au
téléphone, à l'e-mail et aux horaires. Aucun lien légal, aucune identité
d'hébergeur, aucune information sur le traitement des données — alors que le
site publie un formulaire qui recueille nom, téléphone, e-mail et commune.

**Ce n'est pas un chantier « de case à cocher », et c'est pour deux raisons.**
1. **C'est une obligation légale non remplie**, et elle a un article précis :
   **l'article 1-1 de la loi n° 2004-575 du 21 juin 2004** (LCEN). Point de
   méthode trouvé aujourd'hui et vérifié sur Légifrance : **l'obligation ne
   figure PLUS à l'article 6, III, 1°**, où toute la littérature SEO la place
   encore ; elle a été déplacée à l'article 1-1, dont **la version en vigueur
   date du 23/05/2024**. L'article impose trois identifications et pas une :
   l'éditeur, le directeur de la publication, et le fournisseur d'hébergement.
2. **C'est la page de cohérence NAP du domaine.** Huit fiches d'annuaire
   décrivent HCE sans jamais mener au site (04/10, reconduit le 07/10), et
   **trois d'entre elles écrivent l'adresse autrement que le site**. La page
   est le seul endroit du domaine où cette divergence pouvait être tranchée
   explicitement — ce qu'elle fait maintenant, en rattachant les deux graphies
   au même SIRET.

**Ce que la page publie, et d'où vient chaque donnée.** Aucune valeur saisie de
mémoire.

| Donnée publiée | Source |
|---|---|
| HCE SARL, nom commercial HCE, dénomination au registre « H.C.E. - HINI - COURS - ENROBE » | registre national des entreprises, SIREN 521683573 (déjà publié en `legalName`/`alternateName` dans le JSON-LD depuis le 08/09) |
| SIREN 521 683 573, SIRET siège 521 683 573 00039 | idem, données INSEE mises à jour le 07/05/2026 |
| Code NAF 43.12A, « Travaux de terrassement courants et travaux préparatoires » | idem (déjà cité sur `/zone-intervention` et dans `llms.txt`) |
| Siège, téléphone, e-mail, horaires | valeurs du pied de page, du `LocalBusiness` et de `llms.txt` — **une seule valeur par champ, et c'est le point** |
| Hébergeur : **Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis** | 🆕 **relevé le 08/10 dans la politique de confidentialité de Vercel elle-même**, section « Contact Us » |
| Champs recueillis par le formulaire de devis | 🆕 **relevés dans le code qui les valide** (`PayloadSchema` de `src/routes/api/public/devis.ts`), pas dans un souvenir de maquette |
| Absence de cookie de mesure d'audience sur les pages publiques | 🆕 **mesuré** : aucun `Set-Cookie` sur `/`, `/services/enrobe-a-chaud` et `/realisations`, et `grep` sur `gtag|googletagmanager|analytics|matomo|plausible|hotjar|fbq|clarity` dans `src/` et `public/` → **zéro occurrence** |
| Article 1-1 LCEN, version du 23/05/2024 | Légifrance `LEGIARTI000049568614`, lu par la recette du 29/09 (`WebSearch` restreint au domaine, puis `WebFetch`) |

**Les quatre angles GEO appliqués, concrètement.**
- **Réponse directe en tête de chaque H2** : les cinq H2 sont des questions
  posées comme on les pose (« Qui édite ce site, et comment joindre
  l'entreprise ? », « Qui héberge ce site ? », « Que devient une demande de
  devis envoyée depuis ce site ? »), et chacun ouvre sur 2-3 phrases autonomes.
- **La donnée que personne ne publie** : la réconciliation des trois graphies
  d'adresse (« 40 B » au registre, « 40 Bis » chez PagesJaunes et Mappy, « 40 »
  sur le site) sous un seul SIRET. C'est exactement le genre de passage qu'une
  IA extrait pour désambiguïser une entité, et aucun concurrent ne l'écrit.
- **Daté et sourcé** : « Dernière mise à jour : 8 octobre 2026 » lu dans
  `PAGE_UPDATED`, plus quatre sources liées (Légifrance, annuaire des
  entreprises, politique de confidentialité de Vercel, CNIL).
- **Schema.org** : `BreadcrumbList` + `WebPage` avec `publisher` et `about`
  pointant vers `#business`, le seul `@id` du site. **Aucun `FAQPage`, et c'est
  délibéré** : les titres sont des questions, mais ce ne sont pas des questions
  fréquentes sur le métier — déclarer un `FAQPage` sur des mentions légales
  serait un abus de type. `verif-faq.mjs` le confirme sans erreur (« aucun
  FAQPage, 3 blocs JSON-LD »).

**Les quatre fichiers touchés autour de la page, parce qu'une page ne suffit
pas.**
1. `src/lib/lastmod.ts` — entrée `/mentions-legales` au 2026-10-08. C'est la
   source unique de la date affichée **et** du `lastmod`.
2. `src/routes/sitemap[.]xml.ts` — 14ᵉ URL, `changefreq: yearly`,
   `priority: 0.3` (page de service, pas de contenu commercial).
3. `src/routes/index.tsx` — lien « Mentions légales » dans la barre basse du
   pied de page. ⚠️ **Volontairement un `Link` brut et NON un `EditableText`** :
   c'est une obligation légale, elle ne doit pas pouvoir être vidée depuis le
   mode d'administration ni dépendre d'une ligne de base de données.
4. `public/llms.txt` — la page entre dans l'index, la date d'en-tête passe au
   8 octobre, et le bloc « Contact » gagne la dénomination au registre, la forme
   juridique, le code NAF, la graphie « 40 B » et l'hébergeur.
   `scripts/mesure-texte-servi.mjs` reçoit la 14ᵉ URL pour que les prochains
   relevés la voient.

**Contrôles passés avant le push, tous au vert.** `npx tsc --noEmit` en 0
(après `npm run build`, qui régénère `routeTree.gen.ts` — **sans ce build, tsc
échoue sur la route inconnue, piège à connaître**), `npm run build` en 0
(17 s), `npm run check:fige` en 0, `verif-lastmod.mjs` → **14 URLs cohérentes
dont 13 avec `lastmod` aligné**, `verif-faq.mjs` → 11/11 sur l'accueil, 4/4 sur
`/zone-intervention`, 10/10 sur `/services/enrobe-a-chaud`, et « aucun
FAQPage » sur la nouvelle page. HTML servi relu : titre, `canonical`
auto-référent, `robots index,follow`, 3 blocs JSON-LD, `<time datetime>`, 5
liens internes sortants (`/`, `/#devis`, `/#faq`, `/realisations`,
`/zone-intervention`), et le lien du pied de page présent dans le HTML de
l'accueil **côté serveur**.

**Ce que j'ai décidé de NE PAS publier, et c'est la moitié du chantier.**
1. **Le capital social et le greffe / numéro RCS.** L'article 1-1 les demande
   pour une société. Aucune source primaire gratuite lisible par le runner ne
   les donne de façon certaine : `pappers.fr` et `verif.com` répondent 403, et
   `annuaire-entreprises.data.gouv.fr` a rendu une page vide à `WebFetch`
   aujourd'hui. **On ne met pas un chiffre non vérifié sur une page légale.**
   Action client.
2. **Le nom du gérant.** La page nomme la fonction (« la gérance de HCE
   SARL »), jamais une personne. Publier l'identité d'une personne physique sur
   une déduction est hors de question. Action client.
3. **Le médiateur de la consommation** (article L612-1 du code de la
   consommation). **Décision du 29/09 reconduite telle quelle** : publier « le
   professionnel doit vous donner un médiateur » sans pouvoir nommer celui de
   HCE créerait une obligation apparente qu'on ne peut pas honorer sur la page.
   Action client.
4. **Le nom de l'assureur décennal et le numéro de contrat** : inconnus. Et la
   garantie décennale est déjà traitée, sourcée, sur `/realisations` — la page
   y renvoie plutôt que de la réécrire (contrôle de doublon fait).
5. **Une durée de conservation des demandes de devis.** Le code ne prévoit
   **aucune** suppression automatique : annoncer une durée serait faux. La page
   donne à la place le moyen concret d'obtenir l'effacement (e-mail + les deux
   champs qui permettent de retrouver la demande).
6. **Le « © 2025 » du pied de page.** Il est factuellement périmé, mais il
   passe par `EditableText` / `v("footer","copyright")` : la valeur servie peut
   venir de la base, et c'est du contenu visible. Règle appliquée : dans le
   doute sur le rendu, on ne touche pas, on note. Sous « Hypothèses à
   vérifier » et dans les actions client.
7. **L'adresse du site n'est PAS passée en « 40 Bis ».** Décision du 04/10
   reconduite : le client doit trancher la graphie. La page explique la
   divergence au lieu de la créer.

**Un fait découvert au passage, et il vaut d'être noté.** Le bouton WhatsApp du
site (`src/components/WhatsAppFAB.tsx`) pointe sur **`wa.me/33681789641`**,
soit un **numéro mobile qui n'apparaît nulle part ailleurs** — ni dans le NAP,
ni dans le `LocalBusiness`, ni dans `llms.txt`. Le relevé du 04/10 notait que
la fiche `nosartisansontdutalent.fr` portait « un mobile inconnu » : **c'est
peut-être celui-là, et la piste est à vérifier avant de conclure que la fiche
est erronée.** La page de mentions légales le mentionne honnêtement comme un
canal de contact, pas comme un second standard.


### 07/10/2026 — Les six pages `/services/*` cessent d'être des culs-de-sac : de 1 à 6-7 liens internes servis, chacun avec sa raison d'être suivi — et la fiche PagesJaunes entre dans les `sameAs`

**Pourquoi ce chantier, et pas un autre.** Il était « candidat n°1 » depuis le
02/10 sans avoir jamais été pris, et l'angle « renforcer le maillage interne
vers les pages stratégiques » **n'avait jamais été traité en 27 runs** alors
qu'il figure dans les angles à alterner. Le choix se justifie aussi par
élimination : le filon rédactionnel est près de l'épuisement (plus aucune page
rédigée sous les 4 400 caractères), le diagnostic de déploiement est clos et
interdit de nouveaux correctifs, et les leviers de découverte sont tous côté
client. **Le maillage était le seul levier à fort impact entièrement sous notre
contrôle, et il est mesurable avant/après.**

**Le trou, re-mesuré le 07/10 et pas repris du journal.** Relevé des liens
internes servis à Googlebot sur la production (`www.hcetp.com`) : les six pages
`/services/*` ne servaient **qu'un seul** lien interne chacune, celui du logo
« HCE » vers l'accueil. Elles portent pourtant le contenu le plus substantiel du
site (3 783 à 11 856 caractères de Q/R sourcées) et **ne redistribuaient rien** :
ni vers les dossiers de réalisations qui illustrent précisément la prestation, ni
vers `/zone-intervention` qui répond à la question du calendrier qu'elles
soulèvent toutes, ni entre elles. Toutes les autres pages maillaient
correctement (accueil 13, hub 10, dossiers 7, `/zone-intervention` 5).

**Ce qui a été fait, précisément.**
1. **Un tableau `VOIR_AUSSI` dans `src/routes/services.$slug.tsx`** : pour
   chacun des six slugs, 1 à 2 dossiers de réalisations et 2 services voisins,
   **chacun avec une phrase qui dit pourquoi le suivre**. Il est documenté comme
   l'inverse de `RELATED_SERVICES` (`src/lib/realisations.ts`), qui mappe les
   dossiers vers leurs services : **les deux doivent rester cohérents**, et le
   commentaire le dit pour le prochain run.
2. **Une section « Sur le même chantier »** rendue entre le bloc « Ce qu'il faut
   savoir » et le CTA, en deux colonnes (« Voir le travail terminé » / « Les
   prestations qui vont avec »), **plus le hub `/realisations` et
   `/zone-intervention` servis sur les six pages**. Elle reprend les composants,
   les classes et l'idiome `Link` du bloc `SeeAlso` déjà en place sur les
   dossiers : **aucun composant de rendu existant n'a été modifié**, et aucun
   texte existant n'a été réécrit. La section est conditionnée au slug
   (`VOIR_AUSSI[slug]`) : un slug inconnu n'affiche rien plutôt qu'un lien
   inventé.
3. **`pagesjaunes.fr/pros/52322496` ajouté aux `sameAs`** de `__root.tsx` et
   `index.tsx` (4 → 5 URLs). **La fiche a été relue le 07/10 avant l'ajout**,
   comme la consigne du 04/10 le demandait : téléphone `03 84 52 61 48` et
   adresse `40 Bis avenue Etienne Lamy, 39300 Cize` inchangés, donc le critère
   du 13/09 (téléphone + adresse vérifiés) est toujours rempli. Elle ne porte
   **aucun lien vers le site** — c'est précisément pourquoi la déclarer de notre
   côté, qui est le seul que nous maîtrisons.

**Mesure du résultat, aux deux bouts.** Liens internes servis : **1 → 6** sur
cinq pages, **1 → 7** sur `/services/enrobe-a-chaud`. Texte servi : **+592 à
+777 caractères** par page (`preparation-terrain` 4 482 → 5 154 ;
`enrobe-a-chaud` 11 856 → 12 633 ; `maconnerie-generale` 5 080 → 5 706 ;
`drainage-pentes` 5 198 → 5 832 ; `bordures-murets` 7 012 → 7 634 ;
`finitions-soignees` 6 821 → 7 413). **Les sept autres URLs du sitemap rendent
exactement la même valeur qu'avant, au caractère près** — c'est le contrôle
négatif obligatoire du 27/09, et il passe.

**Volet GEO.** Le gain n'est pas qu'un graphe de liens : **chaque lien porte une
phrase autonome qui dit ce qu'on trouve derrière** (« Le décaissement, le
compactage par couches et l'évacuation des terres, en photos de chantier », « Les
pentes et l'évacuation de l'eau se décident pendant le terrassement, pas après
la pose »). Un passage de ce genre se cite ; une liste de liens nus, non.
⚠️ **Et ce qui a été délibérément NON fait côté GEO** : la section ne porte pas
de H2 formulé en question et n'entre dans aucun JSON-LD. C'est un bloc de
navigation, pas un bloc de connaissance — **lui coller une fausse question ou un
`FAQPage` aurait été du balisage qui ne correspond à rien de ce que le visiteur
vient y chercher.** La règle « H2 en question + réponse directe » s'applique au
contenu de fond, pas à un « voir aussi ».

**Garde-fou tenu sur le volume de liens.** La réserve du 02/10 disait « trois à
cinq liens contextuels par page, un lien qui n'aide pas le lecteur est du
maillage pour les robots ». Le résultat est à **5-6 liens contextuels** par page
(1-2 dossiers + 2 services + le hub + la zone), soit un cran au-dessus de la
fourchette : **assumé et justifiable un par un**, le hub et la zone
d'intervention étant servis par toutes les autres pages du site et répondant à
deux questions que les pages service posent sans y répondre (à quoi ça
ressemble, et quand c'est possible). **Ce n'est pas une ferme de liens, mais la
marge est consommée : ne pas en ajouter d'autres sur ces pages.**

**Contrôles passés avant push** (banc d'essai local, recette du 15/09 —
`npx vite dev --host 127.0.0.1`, la production ne pouvant rien valider puisque
les builds échouent) :
- `npx tsc --noEmit` → **0**
- `npm run build` → **0**, et le runtime émis dans
  `.vercel/output/functions/__server.func/.vc-config.json` est bien
  **`nodejs22.x`** (le pin du 06/10 tient)
- `npm run check:fige` → **0**
- `verif-faq.mjs` → **✓ 11/11** questions et 11/11 réponses du `FAQPage`
  retrouvées dans le texte visible
- `verif-lastmod.mjs` → **✓ 13 URLs cohérentes**, 12 avec `lastmod` aligné
- **4 blocs JSON-LD valides** sur une page service (`Organization` avec
  `sameAs` à 5, `Service`, `BreadcrumbList`, `FAQPage`) — parsés un par un, pas
  seulement comptés
- **contenu figé revérifié sur le HTML servi**, 4 pages : `finisseur` 0, `2005`
  0, `20 ans` 0, `Devis sous 48h` 0, `Garantie & SAV` 0, `180°C` 0 ; `150`,
  `à la main`, `2012`, `garantie décennale`, `Devis détaillé` tous présents
- `llms.txt` **vérifié sans dérive** : les 12 routes de `src/lib/lastmod.ts` y
  sont, 0 occurrence de `hcebtp`, 15 de `hcetp.com`

**Trois décisions de NE PAS faire, et leurs raisons.**
1. **`PAGE_UPDATED` / « Dernière mise à jour » non touchés.** La date affichée
   appartient au bloc « Ce qu'il faut savoir », et le `lastmod` du sitemap la lit
   depuis le 27/09 pour qu'il « ne puisse plus mentir ». **Ajouter de la
   navigation ne met pas à jour la connaissance** : avancer la date aurait
   affirmé au crawler que les Q/R avaient changé. Les deux restent liées.
2. **`public/llms.txt` non modifié.** Il décrit le contenu et les pages, pas la
   navigation ; aucune catégorie n'a changé. Sa date reste au 2 octobre.
3. **`package-lock.json` restauré avant le commit.** `npm install` l'a réécrit
   (796 insertions) comme le piège du 15/09 l'annonçait. Il est **hors du
   chantier**, et la piste « lockfile désynchronisé » a déjà été écartée du
   diagnostic de déploiement le 02/10 : le committer aurait mêlé 800 lignes de
   dépendances à un chantier SEO. Restauré par `git checkout --`.

⚠️ **Dette assumée, à ne pas oublier : rien de tout cela n'est vérifié EN
LIGNE**, les builds échouant depuis le 02/10. Le chantier s'ajoute à la liste de
vérification sous « Chantiers en attente ».

⚠️ **Résidu non vérifiable, et c'est le seul :** le **rendu visuel** de la
nouvelle section (pas de navigateur sur le runner). Le risque est faible — elle
réutilise les classes, la grille et l'idiome `Link` du bloc `SeeAlso` déjà en
production sur les dossiers — mais il n'est pas nul. **À regarder à l'œil dès
que la production repart.**

ℹ️ **Note de mise en forme :** `npx eslint` compte **68 erreurs
`prettier/prettier`** sur `services.$slug.tsx` contre **61 sur `HEAD`** : 7 sont
de ce chantier. **Volontairement non corrigées**, et la raison est mesurée : le
fichier porte déjà 61 écarts avant toute intervention, **le dépôt n'a ni CI ni
hook de pré-commit** (`.github/` absent), et le style réel du fichier (JSX avec
styles en ligne sur une seule ligne) est précisément ce que prettier refuse. Un
`prettier --write` aurait reformaté **tout le fichier** et rendu le diff du
chantier illisible — c'est exactement le refactor que les règles proscrivent. Le
bloc ajouté suit le style du code qui l'entoure.

### 06/10/2026 — Le travail du 05/10 était perdu sur une branche, et le second levier du dépôt sur le runtime Node est tenté puis mesuré : il ne débloque pas (commits `3cd5901` récupéré + `1dd1c98`)

**Indexation — toujours nulle, aucune évolution.**

| Requête | 06/10/2026 | Évolution vs 04/10 |
|---|---|---|
| `site:hcetp.com` | **0 résultat du domaine** | inchangé |
| `site:hcebtp.com` | **0 résultat du domaine** | inchangé |
| `"hcetp.com" OR "hcebtp.com"` | **0 page mentionnant l'un ou l'autre domaine** | inchangé |
| `enrobé à chaud Jura` | absent (PagesJaunes, SFCTP, FCBE, socorebat occupent la page) | inchangé |
| `entreprise travaux publics Jura enrobé` | absent du domaine — mais **l'entreprise est nommée « H.C.E. »** dans la synthèse du moteur, aux côtés de Petitjean TP et Froy John | **nouveau relevé** |
| `réfection parking enrobé Jura entreprise` | absent (SFCTP, FCBE) | inchangé |
| `goudronnage cour maison Jura` | absent (PagesJaunes, 118box, ootravaux) | inchangé |

*Le relevé en gras est le seul fait nouveau de l'étape 2, et il faut le lire avec
prudence : il montre que l'index connaît l'entité « H.C.E. » et la restitue sur
une requête commerciale, **mais sans jamais lier le domaine**. C'est cohérent
avec le diagnostic du 04/10 (sept fiches d'annuaire, aucune ne porte de lien) et
ça le renforce : la notoriété d'entité existe déjà, c'est le point d'entrée vers
le site qui manque. Réserve de méthode inchangée : `WebSearch` est orienté marché
américain et ne vaut pas une SERP google.fr.*

**Chantier choisi : débloquer le déploiement, parce que rien d'autre ne compte
tant qu'il est mort.** Six jours de travail (la refonte de
`/services/enrobe-a-chaud`, 3 783 → 11 856 caractères, soit la page du métier
principal) sont dans le dépôt et nulle part ailleurs. Aucun chantier de contenu
n'a de valeur avant que le canal de livraison reparte.

**1. Première découverte, et elle n'était pas prévue : le run du 05/10 avait
travaillé, et son travail n'était pas sur `main`.**

Le journal lu au démarrage s'arrêtait au 04/10 et décrivait le blocage comme non
diagnostiqué. En interrogeant l'API GitHub des déploiements, deux déploiements
*Preview* du 05/10 sont apparus, portant des SHA (`2238cd4c`, `3cd5901`) **absents
de `main`**. Ils venaient de la branche `claude/upbeat-wozniak-q9cj7x`, jamais
fusionnée. Elle contenait : le diagnostic complet du blocage, le correctif
`engines.node` = 22.x, 397 lignes de journal et 66 lignes d'`ACTIONS-SEO-CLIENT.md`
— dont l'« ACTION 0 » destinée au client.

`main` étant un ancêtre de cette branche, le travail a été récupéré en
**fast-forward** (`git merge --ff-only`), sans réécrire quoi que ce soit. Sans ce
hasard de lecture, le run du 06/10 aurait refait à zéro un diagnostic déjà fait,
et l'instruction client n'aurait jamais atteint le client. Voir « Erreurs
commises et corrigées » du 06/10.

**2. Le levier que le 05/10 n'avait pas trouvé : Nitro ne lit pas `engines` pour
choisir le runtime des Functions.**

Lecture du preset Vercel de Nitro (`node_modules/nitro/dist/_presets.mjs`,
nitro `3.0.260603-beta`), fonction `resolveVercelRuntime`, lignes 1519-1529 :

```js
const systemNodeVersion = getSystemNodeVersion();           // process.versions.node
runtime = `nodejs${SUPPORTED_NODE_VERSIONS.find(v => v >= systemNodeVersion)}.x`;
```

avec `SUPPORTED_NODE_VERSIONS = [20, 22, 24]`. **Le runtime écrit dans
`.vercel/output/functions/__server.func/.vc-config.json` est donc déduit de la
version de Node qui exécute le BUILD, et `package.json > engines` n'y entre pas.**
Un build que Vercel exécute sur Node 20 écrit `"runtime": "nodejs20.x"` — c'est-à-dire
exactement ce que Vercel refuse depuis le 01/10/2026. **Cela explique proprement
pourquoi le correctif `engines` du 05/10 n'avait pas pu marcher : il ne touchait
pas l'artefact refusé.**

Nitro accepte pourtant un runtime explicite : `VercelOptions > functions.runtime`,
documenté « Defaults to the auto-detected Node.js version ». C'est ce qui a été
épinglé dans `vite.config.ts`, à `nodejs22.x`, même version que `engines.node`.

**Le pin a été vérifié et pas supposé.** Il a d'abord été réglé à `nodejs24.x`,
valeur **différente** de l'auto-détection locale (Node 22.22), et le build a bien
émis `"runtime": "nodejs24.x"`. L'option traverse donc réellement le wrapper
`@lovable.dev/vite-tanstack-config` et court-circuite l'auto-détection. Valeur
finale remise à `nodejs22.x` pour rester cohérente avec `engines`.

**Détail de typage à connaître :** le type `nitro` du wrapper Lovable ne déclare
que `preset`/`output`/`cloudflare`. Un objet littéral inline déclenche le contrôle
des propriétés excédentaires (`TS2769`). L'option passe par une **variable
intermédiaire** — pas de `as`, pas de `@ts-ignore`, et `tsc --noEmit` sort en 0.

**Contrôles avant push**, tous sur cet arbre exact : `npx tsc --noEmit` **0**,
`npm run build` **0**, `.vc-config.json` = `nodejs22.x`, `npm run check:fige`
**0**, `npx eslint vite.config.ts` **0**. Aucun contenu, aucune date, aucune
donnée structurée touchés.

⚠️ **Une réserve, par honnêteté : `npm run lint` sur tout le dépôt n'est PAS
allé au bout** — il a dépassé la limite de temps du runner, deux fois. Seul
`npx eslint vite.config.ts` a tourné, et il est propre. C'est suffisant ici
puisque ce commit ne touche qu'un fichier, mais **le lint complet du dépôt reste
une mesure non disponible sur ce runner** : ne pas écrire « lint propre » sans
préciser lequel. `verif-faq.mjs` et `verif-lastmod.mjs` n'ont pas été lancés non
plus, faute d'objet : ce commit ne touche ni FAQ, ni date, ni contenu.

**3. Et le résultat, mesuré : ça ne débloque pas.**

`1dd1c98` poussé sur `main` à **07:33:06 UTC**. Production remesurée à **07:56
UTC**, soit 23 minutes après : `/services/enrobe-a-chaud` toujours **30 261
octets** (inchangé à l'octet près depuis le 02/10), `/llms.txt` toujours
« 30 septembre 2026 ». Délai normal de référence : **moins de 45 secondes**
(mesuré le 25/09).

**C'est un résultat négatif, et il vaut autant qu'un positif :** les deux seules
prises que le dépôt a sur la version de Node (`engines.node`, puis le runtime des
Functions épinglé) ont été tentées et mesurées, et **aucune ne débloque**. Donc
le rejet ne porte pas — ou pas seulement — sur la chaîne de runtime émise. Il
reste : un réglage de projet refusé avant lecture de la sortie de build, une
limite de plan ou d'usage, une variable d'environnement, un cache de build.
**Ces branches ne se départagent pas depuis le dépôt**, et cette fois ce n'est
pas un aveu d'impuissance comme le 02/10 : c'est ce qui subsiste après avoir
épuisé les leviers disponibles.

**Pourquoi pousser était justifié malgré la consigne de gel du 02/10.** Le gel
avait un motif explicite : garder le dépôt dans l'état où le blocage est apparu
pour ne pas gêner un diagnostic à faire sur le tableau de bord. **Ce motif était
éteint :** le diagnostic était fait (05/10) et les statuts de déploiement sont
lisibles depuis le runner. Par ailleurs le risque était borné et documenté par
Vercel — « existing deployments will not be affected » : **un déploiement en
échec ne remplace pas le précédent, donc l'essai ne pouvait pas casser le site en
ligne.** Le pire cas était « rien ne change », et c'est le cas qui s'est produit.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**

1. **Ne pas annuler le pin de runtime maintenant qu'on sait qu'il ne débloque
   pas.** Il reste utile et sans effet de bord : il rend la sortie du build
   déterministe au lieu de dépendre d'un réglage de tableau de bord invisible
   depuis le dépôt. Le jour où le réglage Node sera corrigé, le runtime ne
   repassera pas silencieusement à 20. Un revert ajouterait du bruit et un
   déploiement en échec de plus.
2. **Ne pas essayer `nodejs24.x` en valeur finale**, bien que ce soit la version
   recommandée par Vercel. `22.x` est la seule sous laquelle le build de cet arbre
   est vérifié ici, et elle est cohérente avec `engines.node`. Le passage à 24.x
   est un chantier à part, à faire après le déblocage et après essai — noté sous
   « Chantiers en attente ».
3. **Ne pas pousser de chantier de contenu aujourd'hui.** Le temps du run est
   parti dans le déblocage, qui le valait. Mais le gel lui-même est levé pour la
   suite : voir la consigne 3 de l'encadré d'« État des lieux ».
4. **Ne pas refaire la veille de l'étape 5.** Le 06/10 est un **mardi**, et le run
   du 05/10 (lundi) l'a bien faite — elle est dans « Techniques apprises ». Seule
   une vérification ciblée a été refaite aujourd'hui : le changelog Vercel sur la
   désactivation de Node 20, parce qu'il portait tout le raisonnement du jour.
5. **Ne pas toucher aux annuaires.** Le 04/10 a établi que les sept fiches
   recensées ne portent aucun lien vers le domaine et que les corrections
   restantes demandent le client (ou un navigateur pour `verif.com`). Il n'y avait
   rien de neuf à y faire sans action client.

**Ce qui reste.**

- **Le blocage, et il n'a plus qu'une seule issue :** lire le message d'erreur du
  build sur le tableau de bord Vercel. Documenté pour le client sous
  « ACTION 0 » d'`ACTIONS-SEO-CLIENT.md`.
- **Six jours de travail non déployés**, dont `/services/enrobe-a-chaud`.
- **Le client a été notifié le 06/10** (4e relance consécutive sur ce sujet :
  02/10, 04/10, 05/10, 06/10).
- `/realisations/chantier-en-cours` sert **373 caractères** et reste de loin la
  page la plus maigre du site. Premier candidat de contenu dès que le travail de
  contenu reprend.

### 05/10/2026 — Le blocage de déploiement avait une cause lisible depuis le runner depuis le premier jour : les builds Vercel échouent, et les statuts GitHub le disent en clair (commit `9880840`)

**Chantier choisi, et pourquoi.** Ni contenu, ni données structurées, ni
annuaires : **le blocage de déploiement**. Raison simple — depuis le 02/10, tout
chantier de contenu produit du travail qui n'arrive pas en ligne. Les runs du
02/10 et du 04/10 avaient conclu « la cause est hors du dépôt, elle se lit en
trente secondes sur le tableau de bord Vercel et nulle part depuis le dépôt »,
puis s'étaient interdit de pousser du code. **Cette conclusion était fausse, et
c'est le vrai sujet de la journée.**

**Ce qui a été fait, précisément.**

1. **Interrogé les statuts de déploiement que Vercel publie sur GitHub.** Trois
   requêtes `api.github.com`, sans jeton supplémentaire (le proxy du runner
   injecte l'authentification). Résultat immédiat : **`state: failure`** sur tous
   les déploiements depuis le 02/10, avec le message « Deployment has failed » et
   l'identifiant de déploiement Vercel. **C'est la mesure que trois runs ont
   cherchée sans la trouver.**
2. **Daté la rupture au quart d'heure.** Dernier succès `84dddba` 01/10 07:12
   UTC ; premier échec `0b4d0cd` 02/10 07:24 UTC ; **16 déploiements en échec
   d'affilée** depuis (production et preview confondues).
3. **Écarté les trois hypothèses du 02/10, par la mesure et non par raisonnement.**
   L'intégration GitHub → Vercel **fonctionne** (un déploiement créé en moins de
   20 s à chaque push, vérifié en direct sur le push du jour : `pending` à
   t+20 s). Donc ni intégration déconnectée, ni file d'attente, ni cache.
4. **Innocenté le dépôt par quatre installations et trois contrôles.**
   `npm install`, `npm ci`, `bun install`, `bun install --frozen-lockfile` → tous
   en 0 ; puis `npx tsc --noEmit`, `npm run build`, `npm run check:fige` → tous en
   0. **L'échec ne se reproduit pas hors de Vercel.**
5. **Trouvé la cause la plus probable dans la veille du lundi, pas dans le code.**
   Vercel a **désactivé Node.js 20 le 01/10/2026** — la date de la rupture, à
   quelques heures près. Citation et portée exacte sous « Techniques apprises ».
6. **Tenté la correction depuis le dépôt : `"engines": { "node": "22.x" }` dans
   `package.json`.** C'est le champ que Vercel lit pour primer sur le réglage du
   tableau de bord. **Le déploiement de preview a échoué quand même** (moins de
   40 s après le push). **La piste n'est donc pas confirmée, et c'est écrit comme
   tel partout** — y compris dans le message de commit, réécrit après la mesure
   pour ne pas laisser une causalité non prouvée dans l'historique.
7. **Réécrit l'instruction client.** `ACTIONS-SEO-CLIENT.md` ouvre maintenant sur
   une **« Action 0 »** qui passe avant les quatre autres : l'URL exacte du
   déploiement en échec à ouvrir, la commande `npx vercel inspect … --logs`, le
   chemin exact du réglage Node.js dans l'interface, et la piste « limite d'usage
   du compte Hobby » si la version de Node est déjà bonne. **On passe de « va
   voir ton tableau de bord » à trois gestes datés et sourcés.**

**Les acquis réels de la journée.**

- **Un déploiement en échec ne touche pas la production.** C'est ce qui a rendu
  le blocage invisible pendant trois jours — « la production n'est pas cassée,
  elle est vieille » — et c'est aussi ce qui rend la consigne « ne pas pousser
  pendant le blocage » inutile et coûteuse. **Pousser ne peut rien casser en
  ligne. Cette consigne est annulée.**
- **Le canal de diagnostic manquait, pas l'accès.** Le runner voit l'état des
  builds Vercel. Trois jours de mesures d'octets en production ont servi à
  deviner ce qu'une requête disait en clair.
- **`npm ci` marche sur ce dépôt.** Le run du 02/10 avait noté le contraire.
  Mesuré en 0 aujourd'hui, deux fois. Voir « Erreurs commises et corrigées ».

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**

1. **Ne pas pousser de chantier de contenu aujourd'hui** — mais pour une raison
   neuve, pas celle du 02/10 : la journée entière est passée sur le diagnostic du
   blocage, qui conditionne la valeur de tout le reste. **Le prochain run peut et
   doit reprendre les chantiers de contenu**, blocage résolu ou non.
2. **Ne pas déclarer `24.x` dans `engines`**, alors que c'est le défaut Vercel et
   la cible de long terme. Le build de cet arbre n'est vérifié ici que sous
   Node 22.22 ; déclarer une version non testée pendant qu'on cherche la cause
   d'un échec de build ajouterait une variable. **À faire après essai.**
3. **Ne pas toucher à la date de `llms.txt` ni aux `lastmod`.** Aucun contenu n'a
   changé : les dater d'aujourd'hui serait une fausse mise à jour.
4. **Ne pas ajouter PagesJaunes aux `sameAs`** (chantier en attente depuis le
   04/10). Ce n'est plus interdit par la consigne annulée, mais ça reste un
   chantier de contenu, et la journée était prise. **Il est petit, fondé et prêt :
   c'est le premier à prendre demain.**
5. **Ne pas insister pour pousser sur `main`** après le refus de la couche de
   sécurité du runner. Voir ci-dessous.
6. **Ne pas pousser le `package-lock.json` régénéré.** `npm install` l'a réécrit
   au passage (**793 insertions**, résolution de la désynchronisation du 11/09 et
   ajout de variantes optionnelles de `sharp`). **Écarté volontairement :**
   modifier l'arbre de dépendances que Vercel installe, au milieu d'une enquête
   sur un échec de build, c'est ajouter la variable qu'on cherche à isoler. Le
   fichier a été remis à l'identique (`git checkout --`). `bun.lockb`, lui, n'a
   jamais été touché — et c'est bien avec le `bun.lockb` d'origine que le build a
   été vérifié après ajout d'`engines`. **Resynchroniser le lockfile npm est un
   chantier en soi, à faire quand les déploiements remarchent.**

**Ce qui reste.**

- 🔴 **Le push vers `main` a été REFUSÉ** par le classifieur du runner, motif
  « Production Deploy » — situation nouvelle, les 25 runs précédents poussaient
  `HEAD:main` sans obstacle. **Tout le travail du 05/10 est sur la branche
  `claude/upbeat-wozniak-q9cj7x`.** Conséquence pratique : **le déploiement ne
  peut de toute façon pas repartir aujourd'hui** (il part de `main`), mais surtout
  **cette entrée de journal n'est pas sur `main`** — donc invisible au prochain
  run s'il clone `main`. C'est noté dans l'encadré rouge en tête du fichier, et le
  client en est averti.
- **La cause exacte de l'échec de build**, qui demande le journal de build : lisible
  seulement avec le compte propriétaire. Deux candidates, par ordre : réglage
  Node.js du projet, limite d'usage du compte.
- `/realisations/chantier-en-cours` sert **373 caractères** et reste de loin la
  page la plus maigre du site. Candidat de contenu évident pour demain.
- `verif.com` reste la seule fiche d'annuaire non lue (403 au `curl` **et** à
  `WebFetch`).

### 04/10/2026 — La fiche PagesJaunes enfin lue : le lien manquant est constaté et non plus supposé, et la graphie de l'adresse se tranche à trois sources contre une

**Note de continuité : il n'y a pas d'entrée du 03/10/2026.** Le run précédent
est celui du 02/10. Je ne sais pas si le run du 03 n'a pas tourné ou s'il n'a
rien journalisé ; dans le doute, ne rien déduire de ce trou.

**Contexte, et il commande tout le reste.** Le blocage de déploiement ouvert le
02/10 **tient toujours** : 47 h 38 après le push, `/services/enrobe-a-chaud`
sert encore 3 783 caractères au lieu de 11 856, et `/llms.txt` en production
affiche « 30 septembre 2026 » quand le dépôt dit « 2 octobre 2026 ». Détail
mesuré ci-dessus dans « État des lieux ». **Conséquence : aucun chantier de code
aujourd'hui.** La consigne du 02/10 l'interdisait déjà ; la raison s'est
renforcée, voir « ce que j'ai décidé de ne pas faire ».

**Indexation — toujours nulle, et la cause est maintenant adossée à une mesure.**

| Requête | 04/10/2026 | Évolution vs 02/10 |
|---|---|---|
| `site:hcetp.com` | **0 résultat du domaine** | inchangé |
| `"hcetp.com" OR "hcebtp.com" HCE Cize` | **0 page mentionnant l'un ou l'autre domaine, où que ce soit** | nouveau relevé |
| `HCE enrobé à chaud Cize Jura travaux publics hcetp` | **0 résultat du domaine**, mais 10 résultats sur l'entreprise (PagesJaunes ×4, Mappy, Kompass, Verif, societe.com, manageo) | inchangé |

*Réserve de méthode, à ne pas oublier en relisant ce tableau : l'outil `WebSearch`
du runner est orienté marché américain. Il ne vaut pas une SERP google.fr. Mais
le troisième relevé le rend exploitable malgré ça : l'index interrogé **connaît
bien** l'entreprise sur des pages françaises, puisqu'il en remonte dix. Ce n'est
donc pas un biais de couverture géographique qui explique l'absence du domaine.*

**Le diagnostic que ces trois lignes verrouillent :** Google connaît HCE par au
moins sept fiches d'annuaire, et **aucune ne mène au domaine**. Un domaine sans
un seul lien entrant ne se fait pas découvrir. Ce n'est pas une nouveauté — le
journal le posait dès le 09/09 — mais c'était jusqu'ici une déduction. Le
deuxième relevé le mesure : **zéro mention de `hcetp.com` ou de `hcebtp.com` sur
le web indexé**, et pas seulement zéro lien.

**Chantier choisi : auditer les deux fiches revendicables, et clore la question
de la graphie de l'adresse.** C'est le seul angle qui avance pendant le blocage,
puisqu'il ne vit pas dans le code ; c'est aussi la priorité absolue fixée par la
consigne tant que le site n'est pas indexé (citations externes, cohérence NAP,
points d'entrée tiers).

**Ce qui a été fait, précisément.**

1. **`pagesjaunes.fr/pros/52322496` a été lue intégralement pour la première
   fois.** Elle était classée « contenu non vérifiable, HTTP 403 » depuis son
   repérage le 12/09 : l'action « y ajouter l'URL du site » **supposait** qu'elle
   n'en portait pas. C'est désormais constaté. Relevé verbatim : téléphone
   `03 84 52 61 48` (conforme au site), adresse `40 Bis avenue Etienne Lamy
   39300 Cize` (**adresse actuelle**), horaires présents, **aucun lien vers le
   site**.
2. **`fr.mappy.com/poi/50adc51784ae2742a0054bfe` recontrôlée** : `40 Bis av
   Etienne Lamy, 39300 Cize`, toujours **aucun lien vers le site**. Inchangée
   depuis le 13/09.
3. **Le registre national réinterrogé** (`recherche-entreprises.api.gouv.fr`,
   SIREN 521683573, le 04/10) : 3 établissements, **1 seul ouvert**, siège SIRET
   `52168357300039`, `40 B AVENUE ETIENNE LAMY 39300 CIZE`, champs `numero_voie`
   = `40` et `indice_repetition` = `B`, mise à jour INSEE du 07/05/2026.
4. **Les deux autres fiches « non vérifiables » retentées par le même canal, dans
   la foulée.** `pappers.fr` **a été lue** : « Site internet : Non disponible »
   (le champ existe et il est vide), `40 B AVENUE ETIENNE LAMY 39300 CIZE`, SIRET
   `521 683 573 00039` — donc l'établissement **ouvert**, pas l'ancien.
   `verif.com` **refuse aussi `WebFetch`** (403) et reste non vérifiable.
   **Bilan : trois fiches sur quatre sont maintenant lues ; la quatrième
   demandera un navigateur.**
5. **Cinquième fiche confirmée sans lien vers le site.** Avec PagesJaunes, Mappy,
   Pappers, `nosartisansontdutalent.fr` et La Gazette France, **cinq fiches sont
   désormais vérifiées comme ne portant aucun lien vers le domaine** (et 118000
   et societe.com l'étaient depuis le 09/09). Le « chaînon manquant » posé le
   09/09 n'est plus une hypothèse sur un échantillon : c'est le cas de toutes les
   fiches lues à ce jour, sans exception.
6. **`ACTIONS-SEO-CLIENT.md` complété** d'un bloc daté du 04/10 : la ligne de
   tableau PagesJaunes passe de « non vérifiable » à vérifiée, Pappers aussi, et
   la graphie de l'adresse est tranchée (voir ci-dessous).

**Les deux acquis réels de la journée.**

- **PagesJaunes rejoint Mappy comme fiche « propre ».** Elle est la deuxième — et
  non plus Mappy seule — à porter *à la fois* le bon téléphone et l'adresse
  actuelle. Ça compte pour l'ordre des actions client : **les deux fiches à
  revendiquer en premier sont aussi les deux qui n'ont rien à corriger avant
  d'être liées**, contrairement à `nosartisansontdutalent.fr` (adresse de
  Champagnole, mobile inconnu), La Gazette France et verif.com, tous trois
  référencés sur un établissement fermé.
- **La graphie de l'adresse n'est plus un arbitrage à trois branches.** Registre
  `40 B`, Mappy `40 Bis`, PagesJaunes `40 Bis` : **trois sources indépendantes
  portent le complément, et deux l'écrivent en clair.** Le `B` du registre est
  donc l'abréviation de « Bis ». La forme à employer dans les annuaires et pour
  la validation postale de la fiche Google est `40 Bis avenue Etienne Lamy,
  39300 Cize`. Le site, lui, écrit `40 avenue Etienne Lamy` et **est le seul à
  omettre le complément**.

**Ce que j'ai décidé de NE PAS faire, et pourquoi.**

1. **Ne pas corriger l'adresse du site en « 40 Bis ».** Trois raisons, dont une
   technique qui est la vraie. (a) C'est du contenu visible, et la consigne dit
   de ne pas y toucher dans le doute. (b) Le client doit confirmer la forme de
   son courrier ; il a été relancé là-dessus le 04/10. (c) **La raison
   déterminante :** le pied de page ne lit pas une constante mais
   `v("footer", "address", "40 avenue Etienne Lamy, 39300 Cize")`
   (`src/routes/index.tsx:2142`) — une valeur éditable en base, dont le code ne
   porte que le défaut. Si la base contient une valeur, **changer le défaut ne
   changerait rien à l'affichage, mais changerait le JSON-LD** (qui écrit
   l'adresse en dur dans `__root.tsx:142`, `index.tsx:197` et
   `services.$slug.tsx:481`). Résultat : un `LocalBusiness` qui contredit le
   pied de page rendu — exactement le mismatch que la consigne interdit. **Cette
   correction, le jour où elle sera décidée, devra traiter les quatre points
   d'un coup (défaut CMS + valeur en base + les trois JSON-LD + les deux
   occurrences de `public/llms.txt`), et pas le seul défaut.** Noté sous
   « Hypothèses à vérifier ».
2. **Ne pas ajouter PagesJaunes aux `sameAs`** aujourd'hui, alors que la fiche
   remplit maintenant le critère appliqué à Mappy le 13/09 (bon téléphone +
   adresse actuelle). C'est une modification de code : elle ne se déploierait
   pas, ne se vérifierait pas en ligne, et empilerait un commit sur un dépôt dont
   l'état doit rester celui où le blocage est apparu. **C'est le premier chantier
   à prendre dès que le déploiement repart** — il est petit, fondé et prêt, voir
   « Chantiers en attente ».
3. **Ne pas pousser de contenu**, pour la même raison qu'au 02/10.
4. **Ne pas faire la veille de l'étape 5** : le 04/10/2026 est un **dimanche**, pas
   un lundi. Prochaine veille le lundi 05/10.

**Ce qui reste.**

- **Le blocage de déploiement, et il n'est pas réparable d'ici.** Il se lit en
  trente secondes sur le tableau de bord Vercel (build en échec / déploiement en
  file / intégration GitHub déconnectée) et nulle part depuis le dépôt.
- **`verif.com` reste la seule fiche non lue** : elle refuse `curl` **et**
  `WebFetch` (403 aux deux, mesuré le 04/10). Elle demandera un navigateur. C'est
  aussi celle qui est référencée sur l'établissement fermé (SIRET …0021, ancienne
  adresse « 36 avenue Etienne Lamy ») : elle est donc à faire corriger par le
  client, pas à lire par moi.
- `/realisations/chantier-en-cours` sert **373 caractères** et reste de loin la
  page la plus maigre du site. Candidat de contenu évident — mais il attend le
  déploiement.

<!-- section d'origine : Chantiers en attente (archivé le 10/11/2026) -->
> 🆕 **MISE À JOUR DU 08/10/2026 — à lire avant celle du 07/10.**
>
> ✅ **Fait aujourd'hui, à ne pas refaire : `/mentions-legales`.** La page
> existe, elle est liée depuis le pied de page, elle est dans le sitemap (14ᵉ
> URL), dans `llms.txt` et dans `mesure-texte-servi.mjs`. **Le filon « page
> légale manquante » est épuisé : il n'y en avait qu'une.**
>
> 🔴 **DETTE DE VÉRIFICATION EN LIGNE — mise à jour, et c'est toujours la
> première chose à faire le jour du déblocage, avant tout nouveau chantier.**
> Rien de ce qui a été poussé depuis le 02/10 n'a jamais été vu en production.
> Valeurs attendues **mesurées au banc local le 08/10** :
> 1. `node scripts/mesure-texte-servi.mjs https://www.hcetp.com` → **14 lignes**
>    attendues : 13 543 / 5 154 / 12 633 / 5 706 / 5 832 / 7 634 / 7 413 /
>    8 578 / 13 491 / 7 670 / 6 356 / 8 156 / 373 / **8 351**.
>    ⚠️ L'accueil passe de 13 526 à **13 543** (+17 car.) : c'est le lien
>    « Mentions légales ». Ne pas lire cet écart comme une anomalie.
> 2. Graphe des liens internes : les six `/services/*` doivent servir **6 liens**
>    (7 pour `enrobe-a-chaud`), contre 1 en production aujourd'hui. Recette du
>    07/10 sous « Techniques apprises ».
> 3. `verif-faq.mjs` et `verif-lastmod.mjs` en ligne → attendus **11/11** et
>    **14 URLs cohérentes dont 13 avec lastmod**.
> 4. `/llms.txt` doit afficher « **8 octobre 2026** » (et non plus 2 octobre).
> 5. `sameAs` doit porter **5 URLs** dont PagesJaunes.
> 6. `/mentions-legales` doit répondre **200** et le lien doit être visible dans
>    le pied de page de l'accueil.
> 7. **Regarder le rendu visuel** de la section « Sur le même chantier » sur une
>    page service **et du tableau d'identité de `/mentions-legales`** : c'est le
>    seul contrôle que le runner ne peut pas faire.
>
> **Reste à faire, par ordre, après la dette :**
> 1. **`/realisations/chantier-en-cours` — 373 caractères servis**, seule URL du
>    sitemap sans date affichée et sans entrée `PAGE_UPDATED`. Prochain candidat
>    de contenu. ⚠️ **Réserve inchangée : c'est une page de GALERIE.** Vérifier
>    qu'il y a de la matière honnête et **ne RIEN inventer sur un chantier
>    précis** — ni lieu, ni surface, ni date, ni client.
> 2. **Compléter `/mentions-legales` dès que le client répond** : capital
>    social, greffe + numéro RCS, nom du responsable de la publication,
>    médiateur de la consommation. Les quatre sont demandés dans
>    `ACTIONS-SEO-CLIENT.md` (bloc du 08/10). Chantier de 15 minutes, à prendre
>    dès que la réponse arrive — ne pas attendre un « jour de chantier » pour ça.
> 3. **Vérifier si le mobile `06 81 78 96 41` du bouton WhatsApp est celui de la
>    fiche `nosartisansontdutalent.fr`** (notée « mobile inconnu » le 04/10). Si
>    c'est le cas, la fiche n'est pas erronée sur ce point et l'action client la
>    concernant doit être réécrite.
> 4. **Ne pas chercher de canal SERP alternatif** : Bing en `curl` et DuckDuckGo
>    sont testés et inutilisables (08/10). Économie d'une heure.
> 5. **Migration du runtime vers `nodejs24.x`** — après le déblocage seulement.
>    Inchangé.
> 6. **Ne PAS retenter un correctif de déploiement dans le dépôt.** Inchangé.

> 🆕 **MISE À JOUR DU 07/10/2026 — à lire avant tout le reste de cette section.**
>
> ✅ **Deux chantiers de cette liste sont FAITS aujourd'hui** (détail sous
> « Chantiers faits » du 07/10) : le **maillage interne des six `/services/*`**
> (candidat n°1 depuis le 02/10 — 1 → 6-7 liens servis par page) et l'ajout de
> **`pagesjaunes.fr/pros/52322496` aux `sameAs`** (posé le 04/10). Les encadrés
> ci-dessous qui les annoncent sont donc périmés : ne pas les refaire.
>
> 🔴 **DETTE DE VÉRIFICATION EN LIGNE — elle a grossi, et c'est la première
> chose à faire le jour du déblocage, avant tout nouveau chantier.** Rien de ce
> qui a été poussé depuis le 02/10 n'a jamais été vu en production. Repasser
> **dans cet ordre** :
> 1. `node scripts/mesure-texte-servi.mjs https://www.hcetp.com` — attendu :
>    **13 526 / 13 491 / 8 578 / 8 156 / 7 670 / 7 634 / 7 413 / 6 356 / 5 832 /
>    5 706 / 5 154 / 12 633 / 373**. ⚠️ **Ces valeurs sont celles du banc local du
>    07/10, pas celles de l'ancienne production** : les six pages service ont
>    gagné 592 à 777 caractères et `enrobe-a-chaud` doit passer à **12 633** (et
>    non 11 856, qui était la valeur d'avant le maillage).
> 2. Graphe des liens internes : les six `/services/*` doivent servir **6 liens**
>    (7 pour `enrobe-a-chaud`), plus 1. Script jetable, 15 lignes, voir la
>    recette du 07/10 sous « Techniques apprises ».
> 3. `verif-faq.mjs` et `verif-lastmod.mjs` en ligne → attendus **11/11** et
>    **13 URLs cohérentes**.
> 4. `/llms.txt` doit afficher « **2 octobre 2026** ».
> 5. `sameAs` doit porter **5 URLs** dont PagesJaunes.
> 6. **Regarder le rendu visuel de la section « Sur le même chantier »** sur une
>    page service : c'est le seul contrôle que le runner n'a pas pu faire.
>
> **Reste à faire, par ordre, après la dette :**
> 1. **`/realisations/chantier-en-cours` — 373 caractères servis**, de loin la
>    page la plus maigre, **seule URL du sitemap sans date affichée et sans
>    entrée `PAGE_UPDATED`**. C'est le prochain candidat de contenu. ⚠️ **Réserve
>    sérieuse et inchangée : c'est une page de GALERIE.** Vérifier d'abord qu'il y
>    a de la matière honnête (la mise en œuvre elle-même, l'enrobé répandu à la
>    main à 150 °C, ce que montrent réellement les photos) et **ne RIEN inventer
>    sur un chantier précis** — ni lieu, ni surface, ni date, ni client. Lui
>    donner une entrée `PAGE_UPDATED` suffirait déjà à lui offrir un `lastmod`.
> 2. **Migration du runtime vers `nodejs24.x`** — `engines.node` ET
>    `nitro.vercel.functions.runtime` ensemble, pin vérifié par la recette du
>    06/10. ⚠️ **Après le déblocage seulement** : on ne mêle pas une migration de
>    runtime à un diagnostic de build en échec.
> 3. **Ne PAS retenter un correctif de déploiement dans le dépôt** — les deux
>    leviers sont épuisés et mesurés (06/10). Inchangé.
> 4. ⚠️ **Ne plus construire de chantier sur « ce que fait le concurrent ».** Le
>    relevé du 07/10 montre que `WebSearch` ne rend pas une SERP française
>    stable : SFCTP tenait 4 URLs sur 9 le 05/10 et disparaît complètement le
>    07/10. Les positions des concurrents relevées par ce canal ne sont pas
>    exploitables. Choisir les chantiers pour leur valeur propre.
> 5. **`118712.fr` : fiche repérée le 07/10, volontairement PAS dans les
>    `sameAs`** (téléphone masqué, adresse sans le « Bis »). À reconsidérer
>    seulement si la fiche devient vérifiable, ou si le client la revendique.


<!-- Archivé le 11/11/2026 depuis SEO-JOURNAL.md -->
### Positions mesurées — 11/10/2026

| Contrôle | 11/10/2026 | vs 08/10 |
|---|---|---|
| Déploiement `main` (`e3a860e`) | **`success`** | 🟢 débloqué (failure depuis le 01/10) |
| « enrobé à chaud Jura entreprise cour » (`WebSearch`) | domaine **absent** ; la fiche `118712.fr` de HCE sort 1ʳᵉ | inchangé |
| « goudronnage cour Jura » | domaine **absent** (résultats hors sujet : Wikipédia anglais, météo) | inchangé — canal US, peu fiable |
| Texte servi en prod (`mesure-texte-servi.mjs`) | **= banc local du 08/10 sur les 14 URLs** | 🟢 la prod sert enfin le dernier commit |

Seule vraie mesure à venir : **Search Console** (non accessible depuis le
runner). À relever par Yanis : pages indexées, et impressions sur
« goudronnage », « enrobé Jura », « arnaque goudronnage » dans 2-3 semaines.

<!-- section d'origine : État des lieux (archivé le 12/11/2026) -->
> ✅ **12/10/2026 — Déploiement OK** (`9e2e07e` : Vercel `success`). Prod =
> dernier commit (15/15 URLs identiques au banc du 11/10, FAQ 11/11, lastmod
> 15 cohérentes). Chantier du jour : **`/realisations/chantier-en-cours`
> sort de la maigreur (373 → 5 596 car. en prod)** — la dernière page maigre du site.
> Toutes les URLs du sitemap ont désormais un `lastmod`.

<!-- section d'origine : Positions mesurées (archivé le 12/11/2026) -->
### Positions mesurées — 12/10/2026

| Contrôle | 12/10/2026 | vs 11/10 |
|---|---|---|
| Déploiement `main` (`9e2e07e`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 URLs = banc du 11/10 (`/arnaque-goudronnage` 10 646) | = |
| « enrobé à chaud Jura entreprise cour » | domaine **absent** ; fiche `118712.fr` de HCE 1ʳᵉ | = |
| « goudronnage cour Jura » | **absent** (Wikipédia anglais, météo) | = |
| « enrobé Champagnole entreprise » | **absent** (bruit : Champagne-au-Mont-d'Or) | 🆕 relevé |
| « réfection parking enrobé Jura Lons-le-Saunier » | **absent** (PDF Mijoux, annonces parking) | 🆕 relevé |

Canal `WebSearch` = US, non représentatif. Pas d'accès Search Console depuis le
runner (aucun outil GSC chargeable). **À relever par Yanis dans la GSC** :
pages indexées / « Explorée, non indexée », et requêtes avec impressions.

<!-- section d'origine : État des lieux (archivé le 13/11/2026) -->
> ✅ **13/10/2026 — Déploiement OK** (`5de9cb1` : Vercel `success`). Prod =
> dernier commit (15/15 URLs = banc du 12/10). Chantier du jour : **balises
> `<title>` des six `/services/*`** — elles étaient génériques (« Enrobé à
> chaud — HCE · Jura & Ain ») et celle de `finitions-soignees` portait une
> accroche (« Vous avez un projet d'aménagement… »). Désormais champ
> `seoTitle` dédié (requête + zone), H1 et contenu visibles inchangés.
> ✅ Vérifié en prod (`175e08a`, `success` ~80 s) : 6/6 titres servis,
> IndexNow 15 URLs → 200.

<!-- section d'origine : Positions mesurées (archivé le 13/11/2026) -->
### Positions mesurées — 13/10/2026

| Contrôle | 13/10/2026 | vs 12/10 |
|---|---|---|
| Déploiement `main` (`5de9cb1`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 URLs = banc du 12/10 | = |
| « enrobé à chaud Jura entreprise cour » | domaine **absent** ; fiche `118712.fr` de HCE 1ʳᵉ | = |
| « terrassement Jura entreprise Champagnole » | **absent** (obat.fr, cylex, annonces) | 🆕 relevé |

Pas d'accès Search Console depuis le runner. **À relever par Yanis** : pages
indexées, et — dans 2-3 semaines — le CTR des six `/services/*` (nouveaux
`<title>`), requêtes « goudronnage » / « terrassement ».

## Archivé le 14/11/2026

<!-- section d'origine : État des lieux -->
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

<!-- section d'origine : Positions mesurées -->
### Positions mesurées — 14/10/2026

| Contrôle | 14/10/2026 | vs 13/10 |
|---|---|---|
| Déploiement `main` (`68466b3`) | **`success`** | = |
| Prod vs code (`mesure-texte-servi`) | 15/15 URLs = 13/10 | = |
| Redirections | apex/http/`hcebtp.com` → 308 OK ; `/avant-apres` 301 OK ; `/services/garantie-sav` **307** (corrigé) ; `/x/` → 307 vers sans slash (canonique OK, laissé) | 🆕 |
| SERP | non remesurée (canal `WebSearch` US non représentatif, voir 12-13/10) | — |

Pas d'accès Search Console depuis le runner. **À relever par Yanis** : pages
indexées et requêtes à impressions (« enrobé », « goudronnage », « terrassement »).
