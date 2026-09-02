# Actions à faire pour activer 100 % du site

> Le code est poussé sur `main` (commits jusqu'à `4a40b29`). Pour que tout
> fonctionne en prod, il reste **3 actions** dont une seulement est vraiment
> critique pour l'édition. Les deux autres concernent l'email du formulaire devis.
>
> Estimation : **2 + 3 + 5 min = 10 min** au total.

---

## ⚡ Action 1 — Apply SQL `SETUP-PROD.sql` (2 min) — **CRITIQUE**

C'est ce qui débloque l'édition admin (résout aussi le bug « schema cache »).
Tant que ce n'est pas fait, les sauvegardes échouent.

### Si tu as accès à un SQL Editor (Lovable Cloud → Supabase → SQL)
1. Ouvre l'éditeur SQL.
2. Copie tout le contenu de [`supabase/SETUP-PROD.sql`](./supabase/SETUP-PROD.sql).
3. Run.
4. C'est tout. Le NOTIFY à la fin résout le cache.

### Si tu n'as PAS accès au SQL Editor depuis Lovable
Lovable Cloud doit avoir un panneau quelque part qui s'appelle « Database »,
« Backend » ou « SQL ». Cherche-le, c'est forcément là.

Sinon, dernier recours : connecte-toi sur https://supabase.com avec ton compte
Lovable (s'il y a un SSO) ou avec le compte qui possède le projet Supabase
`cpermydundhtwzvztedq` → Project → SQL Editor.

---

## 📧 Action 2 — Clé API Resend (3 min) — pour l'email du devis

### A. Créer le compte
1. https://resend.com/signup (gratuit, 3000 emails/mois)
2. Vérifie ton email
3. Une fois connecté : sidebar **API Keys** → **Create API Key** → nom au choix (ex: `hce-prod`)
4. Copie la clé `re_XXXXXXXXXX...` (visible une seule fois !)

### B. Configurer la clé dans Supabase
Va dans le dashboard Supabase de ton projet :
- **Settings** → **Edge Functions** → **Secrets** (ou via Lovable Cloud si exposé)
- Ajoute 3 secrets :
  - `RESEND_API_KEY` = ta clé `re_…`
  - `DEVIS_TO_EMAIL` = `yanisouammou063@gmail.com`
  - `DEVIS_FROM_EMAIL` = `HCE Devis <onboarding@resend.dev>` (par défaut Resend ; à terme : `devis@hcebtp.com` après vérification du domaine dans Resend)

### C. Déployer l'edge function
```bash
# Une seule fois, depuis le dossier du repo :
npx supabase login                         # si pas déjà fait
npx supabase link --project-ref cpermydundhtwzvztedq
npx supabase functions deploy send-devis --no-verify-jwt
```

> Pas envie de toucher à la CLI ? Lovable Cloud doit avoir une fonctionnalité
> « Deploy edge function from repo » dans la sidebar Backend / Functions.

### Tant que ce n'est pas fait
Le code a un **fallback mailto** : quand un visiteur soumet le devis, son client
mail s'ouvre vers `yanisouammou063@gmail.com`. Pas idéal mais pas bloquant.

---

## 🖼️ Action 3 — Apply SQL `SETUP-GALLERY-V2.sql` (2 min) — pour la galerie « Nos réalisations »

Nouvelle version de la galerie : les 4 cartes repartent **sans photo**
(placeholder « Bientôt disponible »), chaque dossier propose **5 emplacements
vides** uploadables depuis l'admin, et toute photo envoyée est **recadrée
automatiquement au format 4:5** (1600×2000). La section « Avant / Après »
passe elle aussi en base avec un back-office par emplacement.

1. SQL Editor Supabase → colle tout [`supabase/SETUP-GALLERY-V2.sql`](./supabase/SETUP-GALLERY-V2.sql) → Run.
2. Ça crée les tables `before_after_*`, **vide les photos de galerie existantes**
   (section RESET, commente-la si tu veux les garder) et recharge le cache.

Tant que ce n'est pas fait : le site tourne en mode « galerie vide » (fallback
statique), l'upload admin des dossiers et de l'Avant/Après est désactivé.

---

## 🚀 Action 4 — Rien à faire côté déploiement

Vercel et Lovable Cloud auto-déploient à chaque push GitHub.

---

## ✅ Validation — fais ce mini-test dans cet ordre

### Test 1 — Édition inline texte
1. Va sur `/signin`, connecte-toi avec le compte admin (créé lors du SETUP-PROD).
2. Tu es redirigé vers la home. **Barre cuivre en haut** avec « Mode édition ACTIF ».
3. Survole le titre « Confiez vos comptes » du hero → contour cuivre + petit stylo.
4. Clique dessus → champ devient éditable, ring cuivre épais.
5. Modifie → Entrée pour valider → un badge sable « 1 modif non sauvegardée » apparaît dans la barre.
6. Clique **Sauvegarder** (cuivre crème en haut à droite). Toast vert.
7. Recharge → le changement persiste.

### Test 2 — Carte WhyUs
1. Scroll jusqu'à « Pourquoi HCE ».
2. Sur la carte « Enrobé à chaud », clique le titre. Édite. Le badge orange apparaît au coin.
3. La sauvegarde est **instantanée** (au blur), pas besoin du bouton de la barre.

### Test 3 — Photo /realisations
1. Scroll jusqu'à « Nos réalisations » → clique « Cour & allée privée ».
2. Sur `/realisations/cour-allee-privee`, barre cuivre `Mode admin — ajouter / remplacer / supprimer` au-dessus de la grille.
3. Grille de dossiers au format 4:5. Tant qu'un dossier a moins de 5 photos,
   des **emplacements vides** en pointillés cuivre apparaissent (admin only).
4. Clique un emplacement vide (ou « Remplacer » au survol d'une photo) → choisis
   un fichier → **recadrage 4:5 auto (1600×2000)** puis upload → la photo apparaît.

### Test 4 — Formulaire devis
1. Va dans `#devis`, complète les 3 étapes, soumets.
2. Si l'edge function est déployée + Resend OK → **email arrive à yanisouammou063@gmail.com**.
3. Sinon → ton client mail s'ouvre en fallback avec le contenu pré-rempli.

### Test 5 — Site public normal
1. Clique « Quitter » dans la barre cuivre → toast « Déconnecté » + retour home.
2. Aucun stylo, aucun contour, aucune barre admin. Le site se comporte normalement.

---

## 🆘 Si un truc casse

- **« Could not find the table … in the schema cache »** → l'action 1 n'a pas été
  faite, ou le NOTIFY n'a pas tourné. Re-runer le SETUP-PROD.sql résout.
- **« permission denied » au save d'un EditableField** → ton compte n'a pas le
  rôle `admin` dans `user_roles`. Voir section bootstrap admin dans le SETUP.
- **L'email n'arrive pas** → vérifier dans Resend → Logs s'il y a une trace.
  Sinon, le code fait un fallback mailto.
- **Barre cuivre invisible après login** → vérifier dans la console DevTools s'il
  y a une erreur sur `EditModeToolbar`. Une recharge dure (Ctrl+Shift+R) souvent
  suffit (cache asset Vite).

Si quoi que ce soit casse différemment, dis-le-moi avec l'erreur exacte et je
fix dans la foulée.
