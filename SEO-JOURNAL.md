# SEO-JOURNAL — hcebtp.com

Mémoire de la maintenance SEO/GEO quotidienne. **Chaque run démarre sans aucun
souvenir : ce fichier est la seule continuité.** À lire en entier avant d'agir,
et à compléter en fin de run.

---

## État des lieux

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

## Chantiers faits

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
- **Ne pas publier les seuils d'urbanisme des affouillements** (déclaration
  préalable au-delà de 2 m de profondeur et 100 m²), alors que c'était la
  question la plus demandée du lot et que quatre sources concordent.
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

## Chantiers en attente

Par ordre de priorité. **Alterner les angles, ne pas refaire le même deux jours
de suite.**

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
> 2. **Créer une fiche Google Business Profile** pour HCE à Cize 39300 : c'est
>    la porte d'entrée la plus directe vers l'index de Google pour une entreprise
>    locale, et elle n'existe pas.
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

> 🔴 **CANDIDAT N°1 DU PROCHAIN RUN — `/services/finitions-soignees`
> (1 080 car.), la dernière page service sans bloc `savoir`, et désormais la
> page la plus maigre du site sans concurrence.**
> ✅ **La condition posée le 17/09 est levée** : le run du 20/09 a changé
> d'angle (architecture, pas contenu), donc reprendre du contenu demain n'est
> plus un quatrième run de suite. **C'est son tour.**
> Quand elle sera prise : **son `title` anormal** (voir « Hypothèses à
> vérifier ») doit être tranché avec le client **avant ou pendant** le chantier,
> pas après. Matière possible et non exploitée : le volet *ombrage* des parkings
> de plus de 1 500 m² (échéance juillet 2026), fiche
> `entreprendre.service-public.gouv.fr/vosdroits/F38106`, lue le 13/09.
> **Méthode** : patron des 11, 12, 13, 16 et 17/09, mesure avant/après au banc
> d'essai local avec **`scripts/mesure-texte-servi.mjs` des deux côtés**.

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
4. **`lastmod` dans le sitemap.** Absent. À n'ajouter qu'avec une date honnête
   (date de commit du contenu), jamais une date générée à la volée.
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
    **✅ La série de trois runs de contenu (13, 16, 17/09) a été rompue le 20/09
    par un chantier d'architecture. Le prochain run peut reprendre du contenu :
    `/services/finitions-soignees`.**
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
    lues.** Les deux ont été classées « ancienne adresse » **sur la seule foi
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
  publié (cf. chantier du 12/09).

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
