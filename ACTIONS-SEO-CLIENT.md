# SEO — les 4 actions que seul le client peut faire

> Constat au 7 septembre 2026 : **aucune page de hcebtp.com n'est présente dans les
> index Google ni Bing**. Une recherche sur la marque elle-même ne renvoie rien.
>
> Ce n'est PAS un problème de code. Le site a été vérifié :
> `robots.txt` en `Allow: /`, sitemap valide à 12 URLs (HTTP 200), aucun `noindex`,
> canonical présent sur toutes les pages, HTML servi en 200 par le serveur.
>
> Le problème est en amont : **les moteurs n'ont jamais découvert le domaine.**
> Un moteur découvre un site de deux façons — un lien depuis un site déjà connu,
> ou une déclaration directe par le propriétaire. Il n'y a aujourd'hui ni l'un
> ni l'autre. Les 4 actions ci-dessous sont les seules qui débloquent ça, et
> aucune ne peut être faite depuis le code : elles demandent toutes de se
> connecter avec le compte du propriétaire.

---

## Action 1 — Google Search Console (10 min) — **LA plus importante**

C'est le seul canal qui dit directement à Google « ce domaine existe ».

1. Aller sur https://search.google.com/search-console
2. Ajouter une propriété → choisir **Préfixe d'URL** → saisir `https://www.hcebtp.com`
   (bien avec le `www` : c'est l'hôte réellement servi, l'adresse sans `www`
   redirige vers lui).
3. Valider la propriété. La méthode la plus simple ici : **balise HTML** ou
   **fichier HTML** → dans ce cas, transmets le contenu de la balise / le fichier,
   je le pose dans le repo et il est en ligne au prochain déploiement.
   La validation par **enregistrement DNS TXT** marche aussi si tu as la main sur
   le domaine.
4. Une fois validé : menu **Sitemaps** → soumettre `sitemap.xml`.
5. Menu **Inspection d'URL** → coller `https://www.hcebtp.com/` → bouton
   **Demander une indexation**. À refaire pour les 2-3 pages les plus importantes
   (`/services/enrobe-a-chaud`, `/services/preparation-terrain`).

Sans cette action, le reste n'aura qu'un effet lent et indirect.

---

## Action 2 — Fiche Google Business Profile (20 min)

Pour une entreprise locale, la fiche d'établissement est le premier point d'entrée :
elle est indexée immédiatement, elle fait exister l'entreprise sur les recherches
« près de moi », et elle porte un lien vers le site.

1. https://business.google.com → créer la fiche.
2. Catégorie principale suggérée : **Entreprise de travaux publics** ou
   **Entrepreneur en revêtement routier**. Catégories secondaires : terrassement,
   maçonnerie.
3. **Zone desservie** : Jura (39) et Ain (01), plutôt qu'une adresse visible si
   l'activité se fait chez le client.
4. Site web : `https://www.hcebtp.com` (avec le `www`).
5. La validation par courrier postal prend 1 à 2 semaines : à lancer tôt.

---

## Action 3 — Cohérence NAP (Nom / Adresse / Téléphone)

Les moteurs recoupent l'entreprise entre les sites. Le nom, l'adresse et le
téléphone doivent être **écrits exactement pareil partout** : site, fiche Google,
annuaires, signature d'email, réseaux sociaux. Une variante (« HCE BTP » ici,
« HCE » là, deux formats de téléphone) affaiblit le recoupement.

Bloc de référence, tel qu'il figure sur le site :

```
HCE
Cize, Jura (39)
03 84 52 61 48
https://www.hcebtp.com
```

> **À confirmer par le client** : l'adresse postale complète (numéro + rue + code
> postal). Elle n'est pas publiée sur le site aujourd'hui. Dès que tu me la donnes,
> je la mets dans les données structurées `LocalBusiness` — une adresse postale
> complète et vérifiable est un des signaux les plus forts pour le référencement
> local, et l'un des rares que le site n'envoie pas encore.

---

## Action 4 — Premiers points d'entrée externes

Google découvre un domaine en suivant un lien depuis un site qu'il connaît déjà.
Il en faut donc au moins quelques-uns, réels et légitimes :

- Les **annuaires professionnels du BTP** et les plateformes de mise en relation
  sur lesquelles l'entreprise est déjà inscrite (si c'est le cas) : y ajouter
  l'adresse du site.
- Les **fiches d'entreprise automatiques** (registre du commerce, annuaires
  d'entreprises) : beaucoup existent déjà sans le site ; la plupart permettent de
  revendiquer la fiche et d'y ajouter l'URL.
- Un **compte Facebook / Instagram professionnel** avec le lien du site : ces
  pages sont crawlées très fréquemment.
- Les **partenaires, fournisseurs ou clients pros** qui ont un site : un lien
  depuis leur page « partenaires » ou une référence chantier vaut plus que dix
  annuaires.

Pas de rachat de liens, pas d'inscription en masse dans des annuaires vides :
c'est inefficace aujourd'hui et risqué.

---

## Ce qui a déjà été fait côté code (rien à faire)

- `robots.txt` ouvert, sitemap.xml valide à 12 URLs.
- **07/09/2026** — Tous les signaux d'hôte alignés sur `https://www.hcebtp.com`
  (canonical, `og:url`, sitemap, `robots.txt`, données structurées). Ils pointaient
  auparavant vers `hcebtp.com` sans `www`, qui redirige en 308 : le crawler
  recevait une URL canonique qui redirige ailleurs.
- **07/09/2026** — Canonical ajouté sur les 5 pages `/realisations/*` qui n'en
  avaient pas.
- **07/09/2026** — Protocole **IndexNow** activé (clé publique déposée à la racine,
  script `scripts/indexnow-submit.mjs`). Il notifie Bing, Yandex, Seznam et Naver
  à chaque mise à jour. Google n'y participe pas, d'où l'action 1 — mais l'index
  Bing alimente Copilot et la recherche web de ChatGPT.
- **07/09/2026** — `llms.txt` corrigé : il annonçait encore « depuis 2005 »,
  « devis gratuit sous 48h » et « 160°C », en contradiction avec le site
  (2012, devis détaillé, 150 °C). C'est le fichier que lisent les IA.
- Données structurées présentes : `Organization`, `LocalBusiness`, `FAQPage`
  (accueil), `Service` (pages services).
