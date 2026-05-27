# Comment activer l'édition admin — 2 minutes chrono

> Si tu lis ce fichier, c'est probablement parce que l'admin HCE affiche
> *"Could not find the table 'public.gallery_photos' in the schema cache"*
> ou *"Le seed automatique a échoué"*. Voici le pourquoi et le comment.

## Le diagnostic en une ligne

Les tables existent bien en base, mais le **cache schéma de PostgREST** (le moteur REST de Supabase) est obsolète : il ne voit pas les nouvelles tables, donc tous les `INSERT`/`UPDATE`/`UPSERT` retournent une erreur "table not found". Une seule commande SQL répare ça : `NOTIFY pgrst, 'reload schema';`.

Pour faire les choses bien, on en profite aussi pour :
- recréer toute table éventuellement manquante,
- ré-appliquer toutes les RLS,
- pré-remplir tout ce qui est vide.

## Procédure (clique-par-clic)

1. Ouvre **https://supabase.com/dashboard/project/cpermydundhtwzvztedq** (c'est le projet de prod, ID `cpermydundhtwzvztedq`).
   - Si Lovable utilise un autre projet, va dans **Lovable Cloud → Connect Supabase** pour vérifier l'URL, puis remplace cet ID.
2. Dans la sidebar gauche, clique **SQL Editor**.
3. En haut, clique **+ New query**.
4. Ouvre `supabase/SETUP-PROD.sql` (à la racine de ce dossier), **copie tout** le contenu.
5. Colle-le dans l'éditeur SQL de Supabase.
6. Clique **Run** (en bas à droite, ou Ctrl+Enter).
7. Tu dois voir une série de messages "Success" sans erreur fatale.

> Si tu vois `permission denied`, c'est que tu es connecté avec un user sans
> droit DDL. Connecte-toi avec le compte propriétaire du projet Supabase
> (généralement celui qui l'a créé via Lovable).

## Vérification (30 secondes)

Dans la même fenêtre SQL Editor, ajoute en bas :

```sql
select 'why_us_cards' as t, count(*) from why_us_cards
union all select 'service_area_cities', count(*) from service_area_cities
union all select 'gallery_categories', count(*) from gallery_categories
union all select 'gallery_photos', count(*) from gallery_photos
union all select 'project_types', count(*) from project_types;
```

Tu dois voir :
- `why_us_cards`        → 4
- `service_area_cities` → 8
- `gallery_categories`  → 5
- `gallery_photos`      → 25
- `project_types`       → 4

## Pourquoi ton compte admin doit aussi être checké

Toutes les écritures admin sont protégées par RLS avec la fonction
`has_role(auth.uid(), 'admin')`. Si tu n'as pas de ligne dans `user_roles`
avec ton `user_id` et `role = 'admin'`, **tu peux te connecter mais aucune
sauvegarde n'aboutira** (RLS rejette silencieusement).

Le SQL contient un block qui **promeut automatiquement le user le plus ancien
en admin** si aucun admin n'existe. Donc après l'avoir exécuté, un de tes
comptes (le premier inscrit) sera admin. Pour vérifier :

```sql
select u.email, ur.role
from auth.users u
left join user_roles ur on ur.user_id = u.id
order by u.created_at;
```

Si **ton** compte n'a pas le rôle `admin`, ajoute-le :

```sql
insert into user_roles (user_id, role)
select id, 'admin' from auth.users where email = 'ton-email@example.com';
```

## Test concret (30 secondes en plus)

Une fois le SQL appliqué, retourne sur **`/admin`** :

1. Clique sur l'onglet **Pourquoi HCE** → tu dois voir 4 cartes (Enrobé à chaud, 1000+ chantiers, Devis détaillé, Finitions soignées) avec leurs descriptions, prêtes à éditer.
2. Modifie le titre, clique **Enregistrer l'en-tête**.
3. Va sur la home (`/`), tu vois ton changement en live.

Si à l'étape 2 tu vois un toast rouge "permission denied" → ton compte n'est pas admin, voir la section précédente.

## En cas de blocage absolu

Demande-moi de re-générer un SETUP allégé sans `has_role()` — il existe une
version "RLS = authenticated" plus laxiste (n'importe quel user connecté peut
écrire) qui débloque si la gestion de rôle est l'obstacle. Mais ce serait à
ne faire qu'en dernier recours pour des raisons de sécurité.
