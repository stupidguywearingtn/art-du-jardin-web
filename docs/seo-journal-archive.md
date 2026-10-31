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
