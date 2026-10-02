# SEO-JOURNAL — hcebtp.com

Mémoire de la maintenance SEO/GEO quotidienne. **Chaque run démarre sans aucun
souvenir : ce fichier est la seule continuité.** À lire en entier avant d'agir,
et à compléter en fin de run.

---

## État des lieux

> 🔴 **02/10/2026 — LE DÉPLOIEMENT NE PART PLUS. Le code est sur `main`, la
> production sert encore la version du 30/09. À LIRE AVANT TOUT CHANTIER.**
> **Les faits, mesurés :**
> - `origin/main` est à `0b4d0cd`, poussé le **02/10/2026 à 07:23 UTC** (chantier
>   du jour). Le push est confirmé (`84dddba..0b4d0cd HEAD -> main`).
> - **26 minutes plus tard**, `https://www.hcetp.com/services/enrobe-a-chaud` sert
>   toujours **3 783 caractères** au lieu des 11 856 mesurés au banc d'essai
>   local, et `https://www.hcetp.com/llms.txt` affiche encore « Dernière mise à
>   jour : 30 septembre 2026 ».
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
> **Ce qui reste et ne peut pas être fait d'ici :** consulter le tableau de bord
> Vercel. Les trois causes plausibles, par ordre de vraisemblance : déploiement en
> échec (le candidat le plus sérieux est **`npm ci`, qui ne peut pas réussir sur
> ce dépôt** — `package-lock.json` est désynchronisé, voir « Techniques
> apprises » du 02/10 ; si Vercel est passé de `bun`/`npm install` à `npm ci`, le
> build échoue sans toucher au code), déploiement en file d'attente, ou
> intégration GitHub déconnectée du projet Vercel.
> 🔔 **Le client a été notifié le 02/10/2026**, en dérogation à la cadence
> hebdomadaire (prochaine routine prévue le 08/10) : la règle du 01/10 prévoyait
> explicitement la dérogation « si un contrôle casse ». **C'en est un, et c'est le
> plus grave possible : le travail quotidien ne parvient plus au site.**
> ⚠️ **Consigne pour le prochain run : VÉRIFIER CE POINT EN PREMIER, avant de
> choisir un chantier.** Mesurer `/services/enrobe-a-chaud` en production — s'il
> rend 11 856 caractères, le déploiement est reparti et le chantier du 02/10 est
> effectivement en ligne ; s'il rend encore 3 783, **ne pas empiler un nouveau
> chantier de contenu par-dessus un chantier non déployé**, et relancer l'alerte.

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

- **Deux pages publient « la station Météo-France de Champagnole, à 2 km de
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
