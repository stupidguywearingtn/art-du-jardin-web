# Back-office éditable « à la Wix » — guide de portage

> Comment reproduire, sur un autre projet (ici **Marcus Immo**), le système
> d'édition inline utilisé sur `art-du-jardin-web` : un admin connecté active un
> « mode édition », clique directement sur les textes / images de la page pour
> les modifier, accumule des brouillons, puis publie tout d'un coup.
>
> Ce document est **autonome** : tout le code à coller est ici, dé-marqué de
> l'identité HCE. Stack cible supposée inconnue → le cœur est du React
> agnostique, avec une section d'adaptation par framework à la fin. Backend :
> on part de **zéro sur Supabase**.

---

## 1. Vue d'ensemble

### 1.1 Ce que fait le système

- Un bouton « Espace pro » (icône clé) dans la nav → page `/signin` (email + mot
  de passe Supabase, option Google).
- Si l'utilisateur connecté a le rôle `admin`, une **barre d'édition** apparaît
  en haut de toutes les pages, en permanence.
- Bouton **Activer / Désactiver** le mode édition.
- Mode actif : au survol, chaque zone éditable montre un contour + un stylo.
  - **Texte** : clic → `contentEditable`, `Entrée` (ou blur) valide, `Échap`
    annule. La valeur part dans un **brouillon** local (pas encore en base).
  - **Image** : clic → petite fenêtre « Remplacer » (upload de fichier vers le
    storage Supabase, ou coller une URL). Idem, ça part en brouillon.
- La barre affiche un compteur « N modifs non sauvegardées » + **Sauvegarder**
  (publie tous les brouillons en base d'un coup) + **Annuler** (jette les
  brouillons).
- Le public voit toujours la dernière version **publiée** ; à défaut, un
  fallback codé en dur dans le composant.

### 1.2 Les deux façons de stocker du contenu

| Besoin | Mécanisme | Table |
|---|---|---|
| Textes / images « libres » d'une page (titre de hero, paragraphe, image de fond, label de section…) | brouillon → publish groupé | **`site_content_fields`** — clé `(site_id, section_key, field_key)` |
| Listes structurées (cartes « pourquoi nous », villes desservies, catégories de galerie…) | édition **instantanée** ligne par ligne (`UPDATE ... WHERE id`) | **une table dédiée par type** (ex. `why_us_cards`) éditée via `<EditableField>` |

Ce guide détaille surtout le **premier** mécanisme (`site_content_fields`), qui
couvre 90 % du besoin « je veux pouvoir changer ce texte / cette photo ». Le
second est décrit en [§7](#7-variante-listes-structurées-editablefield).

### 1.3 Résolution d'une valeur

Pour chaque champ affiché, la valeur retenue est, dans l'ordre :

```
brouillon en cours (si mode édition actif)  >  valeur publiée en base  >  fallback codé en dur
```

C'est le rôle du petit helper `useV()` montré en [§6.3](#63-le-helper-usev).

### 1.4 Schéma

```
┌──────────────┐        ┌────────────────────┐        ┌─────────────────────┐
│  Navigateur  │        │  Supabase Auth     │        │  Postgres (RLS)     │
│              │        │                    │        │                     │
│  /signin ────┼───────▶│ signInWithPassword │        │ user_roles          │
│              │        └────────────────────┘        │  (user_id, 'admin') │
│  useAuth ────┼───────────── select role ───────────▶│                     │
│   isAdmin    │                                      │                     │
│              │                                      │ site_content_fields │
│  Editable*   │── upsert (publish) ─────────────────▶│  RLS: has_role(...) │
│  components  │── select (lecture publique) ────────▶│  RLS: read = true   │
│              │                                      │                     │
│  EditableImage ── upload ──▶ storage bucket ────────│ storage.objects     │
│              │               "site-images"          │  RLS: has_role(...) │
└──────────────┘                                      └─────────────────────┘
```

### 1.5 Inventaire des fichiers à créer

| Fichier | Rôle |
|---|---|
| `src/integrations/supabase/client.ts` | client Supabase singleton |
| `src/hooks/useAuth.tsx` | session + `isAdmin` (contexte React) |
| `src/hooks/useEditMode.tsx` | mode édition + brouillons + publish (contexte React) |
| `src/hooks/useSiteContentFields.ts` | lecture (cache module) des valeurs publiées d'un site |
| `src/components/EditableText.tsx` | texte inline éditable → brouillon |
| `src/components/EditableImage.tsx` | image éditable (upload / URL) → brouillon |
| `src/components/EditableField.tsx` | *(optionnel)* champ d'une ligne SQL, save instantané |
| `src/components/EditModeToolbar.tsx` | la barre du haut |
| `src/styles/back-office.css` | 4 tokens CSS (couleurs de l'UI d'édition) |
| `src/routes/signin.tsx` | page de connexion |
| migration SQL | tables + RLS + bucket (voir §2) |

---

## 2. Supabase depuis zéro

### 2.1 Créer le projet

1. [supabase.com](https://supabase.com) → **New project**. Note le mot de passe
   de la base.
2. **Project Settings → API** : récupère
   - `Project URL` → `https://xxxx.supabase.co`
   - `anon` / `publishable` key (clé publique, safe côté client)
3. **Authentication → Providers** : « Email » est activé par défaut. Pour la
   prod, décide si tu veux la confirmation d'email (Auth → Providers → Email →
   *Confirm email*). Pour un back-office à 1–2 admins, tu peux la laisser mais
   confirmer à la main (§2.4).
4. *(Optionnel)* **Authentication → Providers → Google** si tu veux le bouton
   « Continuer avec Google ».

### 2.2 Migration SQL

**SQL Editor → New query**, colle **tout** ce bloc, exécute :

```sql
-- ============================================================
--  BACK-OFFICE ÉDITABLE — schéma minimal
-- ============================================================

-- ---------- Rôles ----------
do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- SECURITY DEFINER = la fonction lit user_roles en contournant la RLS,
-- ce qui évite une récursion infinie dans les policies qui l'appellent.
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

-- Sans ce grant explicite, toute requête authentifiée touchant une policy
-- qui appelle has_role() échoue en "permission denied for function" (42501)
-- et isAdmin reste bloqué à false.
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;

drop policy if exists "user_roles readable by self or admin" on public.user_roles;
create policy "user_roles readable by self or admin"
  on public.user_roles for select
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins manage roles" on public.user_roles;
create policy "admins manage roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ---------- Utilitaire updated_at ----------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ---------- Contenu éditable par champ ----------
do $$ begin
  create type public.content_type as enum ('text', 'image', 'richtext');
exception when duplicate_object then null; end $$;

create table if not exists public.site_content_fields (
  id            uuid primary key default gen_random_uuid(),
  site_id       uuid not null,
  section_key   text not null,
  field_key     text not null,
  content_type  public.content_type not null default 'text',
  content_value text,
  updated_at    timestamptz not null default now(),
  unique (site_id, section_key, field_key)
);

create index if not exists idx_scf_site on public.site_content_fields(site_id);

alter table public.site_content_fields enable row level security;

drop policy if exists "scf public read" on public.site_content_fields;
create policy "scf public read"
  on public.site_content_fields for select using (true);

drop policy if exists "scf admin write" on public.site_content_fields;
create policy "scf admin write"
  on public.site_content_fields for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists scf_touch on public.site_content_fields;
create trigger scf_touch before update on public.site_content_fields
  for each row execute function public.touch_updated_at();

-- ---------- Storage : images uploadées depuis l'éditeur ----------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site-images admin write" on storage.objects;
create policy "site-images admin write"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "site-images admin update" on storage.objects;
create policy "site-images admin update"
  on storage.objects for update
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "site-images admin delete" on storage.objects;
create policy "site-images admin delete"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));
```

### 2.3 Choisir un `site_id`

`site_content_fields` est multi-sites via la colonne `site_id` (un `uuid`
libre). Pour Marcus Immo, fixe une constante une fois pour toutes, ex. :

```ts
export const SITE_ID = "22222222-2222-2222-2222-222222222222";
```

Tu n'as **rien à insérer** : une ligne apparaît au premier « Sauvegarder » sur
un champ donné. Tant qu'aucune ligne n'existe, le fallback du composant
s'affiche.

### 2.4 Créer le compte admin

1. **Authentication → Users → Add user** → email + mot de passe. Coche *Auto
   Confirm User* pour éviter l'étape email.
2. Copie l'`UID` de l'utilisateur créé.
3. **SQL Editor** :

```sql
insert into public.user_roles (user_id, role)
values ('COLLE-L-UID-ICI', 'admin')
on conflict (user_id, role) do nothing;
```

Vérif :

```sql
select public.has_role('COLLE-L-UID-ICI', 'admin');  -- doit renvoyer true
```

---

## 3. Variables d'environnement + client Supabase

### 3.1 `.env`

```bash
# Vite (art-du-jardin utilise Vite) — préfixe VITE_ obligatoire
VITE_SUPABASE_URL="https://xxxx.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOi..."

# Next.js — remplace par :
# NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
```

### 3.2 Dépendance

```bash
npm i @supabase/supabase-js
```

### 3.3 `src/integrations/supabase/client.ts`

```ts
import { createClient } from "@supabase/supabase-js";

// --- Vite ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// --- Next.js : remplace les 2 lignes ci-dessus par ---
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase env vars manquantes (URL / clé publishable).");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // en SSR il n'y a pas de localStorage : on ne le passe que côté client
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

> **Typage** : la version d'origine fait `createClient<Database>()` avec un type
> généré (`supabase gen types typescript`). C'est optionnel. Sans lui, les
> appels `.from("table")` sont typés `any` — acceptable pour démarrer.

---

## 4. Les tokens CSS de l'UI d'édition

Les composants n'utilisent **que** ces 4 variables pour toute leur
décoration (contours, stylos, barre). Colle ce bloc dans ton CSS global et
ajuste les couleurs à l'identité Marcus Immo.

`src/styles/back-office.css` :

```css
:root {
  /* couleur d'accent de l'éditeur (contours, stylo, barre du haut) */
  --bo-accent: #8a5a3c;
  /* texte/á-plat posé SUR --bo-accent */
  --bo-accent-contrast: #fdf9f2;
  /* fond sombre (badge compteur, overlay image) */
  --bo-dark: #0e0e0f;
  /* signale un brouillon non publié */
  --bo-dirty: #c8a47e;
}
```

Importe-le une fois (ex. dans `main.tsx` / `_app.tsx` / layout racine) :

```ts
import "@/styles/back-office.css";
```

---

## 5. Les hooks

### 5.1 `src/hooks/useAuth.tsx`

Fournit `user`, `session`, `isAdmin`, `loading`, `signOut`. `isAdmin` est
recalculé à chaque changement d'état d'auth via un `select` sur `user_roles`.

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null, session: null, isAdmin: false, loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = (uid: string) =>
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle()
        .then(({ data }) => setIsAdmin(!!data));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        // déféré : évite un deadlock si on rappelle supabase dans le callback
        setTimeout(() => checkAdmin(s.user.id), 0);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) checkAdmin(data.session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider
      value={{
        user: session?.user ?? null,
        session,
        isAdmin,
        loading,
        signOut: async () => { await supabase.auth.signOut(); },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
```

### 5.2 `src/hooks/useSiteContentFields.ts`

Lecture des valeurs **publiées** pour un `site_id`. Cache au niveau module
(1 seul fetch même si 50 composants l'utilisent), avec un mécanisme d'abonnement
pour re-render après `reload()`.

```ts
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type FieldMap = Record<string, string>; // `${section}.${field}` -> value

const caches = new Map<string, FieldMap>();
const listenersMap = new Map<string, Set<(m: FieldMap) => void>>();

async function load(siteId: string) {
  const { data, error } = await supabase
    .from("site_content_fields")
    .select("section_key, field_key, content_value")
    .eq("site_id", siteId);

  const map: FieldMap = {};
  if (!error && data) {
    for (const row of data) {
      map[`${row.section_key}.${row.field_key}`] = row.content_value ?? "";
    }
  }
  caches.set(siteId, map);
  listenersMap.get(siteId)?.forEach((l) => l(map));
  return map;
}

export function useSiteContentFields(siteId: string) {
  const [fields, setFields] = useState<FieldMap>(caches.get(siteId) ?? {});

  useEffect(() => {
    let listeners = listenersMap.get(siteId);
    if (!listeners) { listeners = new Set(); listenersMap.set(siteId, listeners); }
    listeners.add(setFields);
    if (!caches.has(siteId)) load(siteId);
    else setFields(caches.get(siteId)!);
    return () => { listeners!.delete(setFields); };
  }, [siteId]);

  const get = useCallback(
    (section: string, field: string, fallback: string) => {
      const v = fields[`${section}.${field}`];
      return v !== undefined && v !== "" ? v : fallback;
    },
    [fields],
  );

  return { get, reload: () => load(siteId) };
}
```

> **SSR** : ce hook lit en `useEffect` (client uniquement). En première frame
> serveur, `get()` renvoie donc toujours le fallback, puis l'hydratation
> applique la valeur publiée. Si tu veux la valeur publiée dès le SSR, fais un
> `select` équivalent dans le loader / `getServerSideProps` et passe-le en prop
> initiale à `useState`.

### 5.3 `src/hooks/useEditMode.tsx`

Le cœur : état `enabled`, dictionnaire de brouillons, `publish()` (upsert
groupé), `cancel()`.

```tsx
import {
  createContext, useCallback, useContext, useMemo, useState, type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export type DraftType = "text" | "image";
type Draft = { value: string; type: DraftType };
type Drafts = Record<string, Draft>; // clé: `${section}.${field}`

type Ctx = {
  isAdmin: boolean;
  enabled: boolean;
  toggle: () => void;
  drafts: Drafts;
  getDraft: (section: string, field: string) => string | undefined;
  setDraft: (section: string, field: string, type: DraftType, value: string) => void;
  hasDrafts: boolean;
  publish: () => Promise<void>;
  cancel: () => void;
  siteId: string;
  publishing: boolean;
};

const EditModeCtx = createContext<Ctx | null>(null);

export function EditModeProvider({
  siteId, children, onPublished,
}: {
  siteId: string;
  children: ReactNode;
  onPublished?: () => void;
}) {
  const { isAdmin } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [publishing, setPublishing] = useState(false);

  const setDraft = useCallback(
    (section: string, field: string, type: DraftType, value: string) => {
      setDrafts((d) => ({ ...d, [`${section}.${field}`]: { value, type } }));
    },
    [],
  );

  const getDraft = useCallback(
    (section: string, field: string) => drafts[`${section}.${field}`]?.value,
    [drafts],
  );

  const cancel = useCallback(() => setDrafts({}), []);

  const publish = useCallback(async () => {
    const entries = Object.entries(drafts);
    if (entries.length === 0) return;
    setPublishing(true);
    try {
      const rows = entries.map(([k, v]) => {
        const [section_key, field_key] = k.split(".");
        return {
          site_id: siteId,
          section_key,
          field_key,
          content_type: v.type,
          content_value: v.value,
        };
      });
      const { error } = await supabase
        .from("site_content_fields")
        .upsert(rows, { onConflict: "site_id,section_key,field_key" });
      if (error) throw error;
      toast.success("Modifications publiées");
      setDrafts({});
      onPublished?.();
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur lors de la publication");
    } finally {
      setPublishing(false);
    }
  }, [drafts, siteId, onPublished]);

  const value = useMemo<Ctx>(
    () => ({
      isAdmin,
      enabled: enabled && isAdmin,
      toggle: () => setEnabled((e) => !e),
      drafts,
      getDraft,
      setDraft,
      hasDrafts: Object.keys(drafts).length > 0,
      publish,
      cancel,
      siteId,
      publishing,
    }),
    [isAdmin, enabled, drafts, getDraft, setDraft, publish, cancel, siteId, publishing],
  );

  return <EditModeCtx.Provider value={value}>{children}</EditModeCtx.Provider>;
}

export function useEditMode() {
  const ctx = useContext(EditModeCtx);
  if (!ctx) throw new Error("useEditMode doit être utilisé dans <EditModeProvider>");
  return ctx;
}
```

**Dépendance `sonner`** (toasts) : `npm i sonner`, et pose `<Toaster />` une
fois à la racine. Pour t'en passer, remplace les `toast.*` par un `console` /
un autre système de notif.

---

## 6. Les composants

Dépendances communes : `npm i lucide-react` (icônes).

### 6.1 `src/components/EditableText.tsx`

```tsx
import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { Pencil, Check } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  value: string;              // fallback / valeur publiée déjà résolue
  as?: ElementType;           // "h1", "p", "span", "a"...
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;        // true => Entrée = retour ligne, pas validation
};

export function EditableText({
  section, field, value, as: Tag = "div", className, style, multiline = false,
}: Props) {
  const { enabled, setDraft, getDraft } = useEditMode();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const draftVal = getDraft(section, field);
  const displayValue = draftVal ?? value;
  const isDirty = draftVal !== undefined && draftVal !== value;

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const next = ref.current?.innerText ?? "";
    if (next !== value) setDraft(section, field, "text", next);
  };

  if (!enabled) {
    return <Tag className={className} style={style}>{displayValue}</Tag>;
  }

  return (
    <span
      className="relative inline-block group/editable align-baseline"
      style={{ width: "fit-content", maxWidth: "100%" }}
    >
      <Tag
        ref={ref as any}
        className={`${className ?? ""} outline-none rounded-sm cursor-pointer`}
        style={{
          ...style,
          boxShadow: editing
            ? "0 0 0 2px var(--bo-accent), 0 0 0 4px rgba(0,0,0,0.12)"
            : isDirty
              ? "0 0 0 1px var(--bo-dirty)"
              : undefined,
        }}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={(e: React.MouseEvent) => {
          if (!editing) { e.preventDefault(); e.stopPropagation(); setEditing(true); }
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing) e.currentTarget.style.boxShadow =
            "0 0 0 1px var(--bo-accent), inset 0 0 0 9999px rgba(0,0,0,0.04)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing) e.currentTarget.style.boxShadow = isDirty
            ? "0 0 0 1px var(--bo-dirty)" : "";
        }}
        onBlur={editing ? commit : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setEditing(false);
            if (ref.current) ref.current.innerText = displayValue;
          }
        }}
      >
        {displayValue}
      </Tag>

      {!editing && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditing(true); }}
          className="absolute -top-2 -right-2 z-[150] hidden group-hover/editable:flex items-center justify-center w-6 h-6 rounded-full shadow-lg"
          style={{ background: "var(--bo-accent)", color: "var(--bo-accent-contrast)" }}
          aria-label="Éditer"
        >
          <Pencil className="w-3 h-3" />
        </button>
      )}

      {editing && (
        <span
          aria-hidden
          className="absolute -top-7 left-0 z-[150] inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
          style={{ background: "var(--bo-accent)", color: "var(--bo-accent-contrast)" }}
        >
          <Check className="w-3 h-3" /> Entrée = valider · Échap = annuler
        </span>
      )}
    </span>
  );
}
```

> Les classes utilitaires (`absolute`, `-top-2`, `group-hover/...`) sont du
> **Tailwind**. Si Marcus Immo n'a pas Tailwind : soit tu l'ajoutes, soit tu
> convertis cette poignée de classes en CSS module (une vingtaine de lignes).

### 6.2 `src/components/EditableImage.tsx`

Version portable : `transform` (par défaut identité) remplace le
`optimizeImageUrl` spécifique à HCE. Utilise 3 primitives shadcn/ui
(`Dialog`, `Input`, `Button`) — remplaçables par du HTML nu (voir note).

```tsx
import { useState, type ReactNode } from "react";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  value: string;                       // URL courante (résolue: draft>publié>fallback)
  children: (url: string) => ReactNode; // rendu avec l'URL (img / background)
  transform?: (url: string) => string; // optionnel: CDN resize, etc.
};

const BUCKET = "site-images";

export function EditableImage({ section, field, value, children, transform }: Props) {
  const { enabled, setDraft, siteId } = useEditMode();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const displayUrl = transform ? transform(value) : value;

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${siteId}/${section}-${field}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setDraft(section, field, "image", data.publicUrl);
      toast.success("Image mise à jour (brouillon)");
      setOpen(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  if (!enabled) return <>{children(displayUrl)}</>;

  return (
    <>
      <div className="relative group/editable w-full h-full">
        <div
          className="w-full h-full rounded-sm cursor-pointer"
          style={{ outline: "0 solid transparent", transition: "outline 200ms ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.outline = "2px solid var(--bo-accent)";
            e.currentTarget.style.outlineOffset = "-2px";
          }}
          onMouseLeave={(e) => { e.currentTarget.style.outline = "0 solid transparent"; }}
        >
          {children(displayUrl)}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm shadow-lg pointer-events-auto"
            style={{ background: "var(--bo-accent)", color: "var(--bo-accent-contrast)" }}
          >
            <Pencil className="w-4 h-4" /> Remplacer
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer l'image</DialogTitle>
            <DialogDescription>Téléversez un fichier ou collez une URL.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }}
            />
            <div className="space-y-2">
              <Input placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button
                variant="secondary"
                className="w-full"
                disabled={!url || uploading}
                onClick={() => {
                  setDraft(section, field, "image", url);
                  toast.success("Image mise à jour (brouillon)");
                  setOpen(false);
                  setUrl("");
                }}
              >
                Utiliser cette URL
              </Button>
            </div>
            {uploading && (
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Loader2 className="w-4 h-4 animate-spin" /> Téléversement…
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

> **Sans shadcn/ui** : remplace `<Dialog>` par un `position:fixed` overlay
> maison, `<Input>` par `<input>`, `<Button>` par `<button>`. La logique
> (`upload`, `setDraft`) ne change pas.
>
> **Usage `children`** — image `<img>` :
> ```tsx
> <EditableImage section="hero" field="bg" value={url}>
>   {(u) => <img src={u} alt="" className="w-full h-full object-cover" />}
> </EditableImage>
> ```
> ou background CSS :
> ```tsx
> <EditableImage section="hero" field="bg" value={url}>
>   {(u) => <div style={{ backgroundImage: `url(${u})` }} className="..." />}
> </EditableImage>
> ```

### 6.3 Le helper `useV()`

À définir une fois par page (ou dans un petit module partagé). Résout
`draft > publié > fallback` :

```ts
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { useEditMode } from "@/hooks/useEditMode";

export function useV(siteId: string) {
  const { get } = useSiteContentFields(siteId);
  const { getDraft } = useEditMode();
  return (section: string, field: string, fallback: string) =>
    getDraft(section, field) ?? get(section, field, fallback);
}
```

### 6.4 `src/components/EditModeToolbar.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import { useEditMode } from "@/hooks/useEditMode";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Pencil, X, LogOut, Save } from "lucide-react";
import { toast } from "sonner";

export function EditModeToolbar() {
  const { isAdmin, enabled, toggle, drafts, hasDrafts, publish, cancel, publishing } = useEditMode();
  const { user } = useAuth();
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(44);

  // la barre peut passer sur 2 lignes selon la largeur : on mesure sa vraie
  // hauteur pour dimensionner le spacer et ne jamais recouvrir la page.
  useEffect(() => {
    if (!isAdmin || !barRef.current) return;
    const ro = new ResizeObserver(([entry]) =>
      setBarHeight(Math.ceil(entry.contentRect.height)),
    );
    ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [isAdmin]);

  if (!isAdmin) return null;

  const draftCount = Object.keys(drafts).length;

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnecté");
    window.location.href = "/";
  };

  return (
    <>
      <div
        ref={barRef}
        className="fixed top-0 inset-x-0 z-[200] shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
        style={{ background: "var(--bo-accent)", color: "var(--bo-accent-contrast)" }}
        role="region"
        aria-label="Barre d'édition admin"
      >
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-3 text-sm">
          <Pencil className="w-4 h-4 flex-none" />
          <span className="font-medium hidden sm:inline">
            {enabled ? "Mode édition ACTIF" : "Mode édition désactivé"}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="px-3 py-1 rounded text-xs font-semibold flex-none"
            style={{
              background: enabled ? "rgba(0,0,0,0.25)" : "var(--bo-accent-contrast)",
              color: enabled ? "var(--bo-accent-contrast)" : "var(--bo-accent)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {enabled ? "Désactiver" : "Activer"}
          </button>

          {enabled && hasDrafts && (
            <span
              className="px-2.5 py-1 rounded text-xs font-semibold flex-none"
              style={{ background: "var(--bo-dark)", color: "var(--bo-dirty)" }}
            >
              {draftCount} modif{draftCount > 1 ? "s" : ""} non sauvegardée{draftCount > 1 ? "s" : ""}
            </span>
          )}

          <div className="flex-1" />

          {enabled && hasDrafts && (
            <>
              <button
                type="button"
                onClick={cancel}
                disabled={publishing}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs hover:bg-black/20 disabled:opacity-40"
              >
                <X className="w-3.5 h-3.5" /> Annuler
              </button>
              <button
                type="button"
                onClick={publish}
                disabled={publishing}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded font-semibold text-sm disabled:opacity-50"
                style={{ background: "var(--bo-accent-contrast)", color: "var(--bo-accent)" }}
              >
                {publishing
                  ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde…</>)
                  : (<><Save className="w-4 h-4" /> Sauvegarder</>)}
              </button>
            </>
          )}

          <span className="hidden md:inline text-xs opacity-80 flex-none truncate max-w-[180px]" title={user?.email ?? ""}>
            {user?.email}
          </span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-black/20"
            aria-label="Se déconnecter"
          >
            <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>

      {/* spacer : pousse le contenu sous la barre, hauteur mesurée en direct */}
      <div aria-hidden style={{ height: barHeight }} />
    </>
  );
}
```

### 6.5 `src/routes/signin.tsx` (adapter le routage à ta stack)

```tsx
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

function friendlyError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Email pas encore confirmé.";
  if (m.includes("rate limit")) return "Trop de tentatives, réessaie plus tard.";
  return msg;
}

export function SignInPage({ onSignedIn }: { onSignedIn?: () => void }) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "forgot">("signin");

  if (user) {
    return <div className="min-h-screen grid place-items-center"><p>Connecté.</p></div>;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connexion réussie.");
        onSignedIn?.();
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Email de réinitialisation envoyé.");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(friendlyError(err?.message ?? "Erreur"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-semibold mb-2">Espace pro</h1>
        <p className="text-sm opacity-70 mb-6">Connecte-toi pour modifier le site.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email" required placeholder="Email"
            className="w-full border rounded px-3 py-2"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          {mode === "signin" && (
            <input
              type="password" required minLength={6} placeholder="Mot de passe"
              className="w-full border rounded px-3 py-2"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <button type="submit" disabled={busy} className="w-full border rounded px-3 py-2 font-medium">
            {busy ? "..." : mode === "signin" ? "Se connecter" : "Envoyer le lien"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "forgot" : "signin")}
          className="mt-4 w-full text-xs opacity-70"
        >
          {mode === "signin" ? "Mot de passe oublié ?" : "← Retour"}
        </button>
      </div>
    </div>
  );
}
```

> Pas de « créer un compte » public : les admins sont créés à la main dans
> Supabase (§2.4). C'est voulu.

---

## 6.bis Branchement dans l'app

### Racine (une fois)

```tsx
// layout racine / _app / __root
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import "@/styles/back-office.css";

export function Root({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
```

### Chaque page éditable

```tsx
import { EditModeProvider } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { useV } from "@/hooks/useV";

const SITE_ID = "22222222-2222-2222-2222-222222222222";

export function HomePage() {
  const { reload } = useSiteContentFields(SITE_ID);
  return (
    <EditModeProvider siteId={SITE_ID} onPublished={reload}>
      <HomeBody />
    </EditModeProvider>
  );
}

function HomeBody() {
  const v = useV(SITE_ID);
  return (
    <>
      <EditModeToolbar />

      <EditableImage section="hero" field="bg" value={v("hero", "bg", "/img/hero-defaut.jpg")}>
        {(url) => (
          <section style={{ backgroundImage: `url(${url})` }} className="hero">
            <EditableText
              section="hero" field="title" as="h1" className="text-6xl font-bold"
              value={v("hero", "title", "Marcus Immo — l'immobilier autrement")}
            />
            <EditableText
              section="hero" field="subtitle" as="p" multiline
              value={v("hero", "subtitle", "Estimation gratuite sous 24h.")}
            />
          </section>
        )}
      </EditableImage>
    </>
  );
}
```

### Le déclencheur dans la nav

```tsx
import { useAuth } from "@/hooks/useAuth";
import { useEditMode } from "@/hooks/useEditMode";
import { KeyRound } from "lucide-react";

function ProButton() {
  const { isAdmin } = useAuth();
  const { enabled, toggle } = useEditMode();

  if (isAdmin) {
    return (
      <button
        onClick={toggle}
        title={enabled ? "Désactiver l'édition" : "Activer l'édition"}
        className="w-9 h-9 grid place-items-center rounded-full border"
        style={{
          background: enabled ? "var(--bo-accent)" : "transparent",
          color: enabled ? "var(--bo-accent-contrast)" : "inherit",
        }}
      >
        <KeyRound className="w-4 h-4" />
      </button>
    );
  }
  // non connecté : lien vers /signin (adapte au routeur de ta stack)
  return (
    <a href="/signin" title="Espace pro" className="w-9 h-9 grid place-items-center rounded-full border opacity-60">
      <KeyRound className="w-4 h-4" />
    </a>
  );
}
```

> `ProButton` doit être rendu **à l'intérieur** d'un `<EditModeProvider>` (donc
> la nav est sous le provider). Si ta nav est globale, remonte le
> `<EditModeProvider>` au niveau du layout et retire-le des pages.

---

## 6.ter Recette « rendre un champ éditable »

1. **Texte** : entoure la valeur.
   ```tsx
   // avant
   <h2 className="section-title">Nos biens</h2>
   // après
   <EditableText section="biens" field="title" as="h2" className="section-title"
     value={v("biens", "title", "Nos biens")} />
   ```
2. **Image** : passe par le render-prop.
3. **Convention de nommage** : `section` = bloc logique (`hero`, `footer`,
   `services`, `contact`), `field` = rôle (`title`, `subtitle`, `bg`, `cta`,
   `item_1_title`…). Ces chaînes deviennent la clé en base — garde-les stables,
   un renommage = un nouveau champ (l'ancien contenu publié devient orphelin).
4. **Multi-instances** : pour une liste de N items connus, fabrique les clés :
   `field={`item_${i}_title`}`.

---

## 7. Variante « listes structurées » (`EditableField`)

Quand le contenu est une **vraie liste dynamique** (ajout/suppression de
lignes, ordre, activation), on ne passe pas par `site_content_fields` mais par
une table dédiée éditée **ligne par ligne, save instantané au blur**.

Exemple de table :

```sql
create table if not exists public.mi_cards (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  display_order int  not null default 0,
  active        boolean not null default true,
  updated_at    timestamptz not null default now()
);
alter table public.mi_cards enable row level security;
create policy "mi_cards read"  on public.mi_cards for select using (true);
create policy "mi_cards write" on public.mi_cards for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger mi_cards_touch before update on public.mi_cards
  for each row execute function public.touch_updated_at();
```

`src/components/EditableField.tsx` :

```tsx
import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Props = {
  table: string;          // ex. "mi_cards"
  rowId: string;
  field: string;          // ex. "title"
  value: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;
  placeholder?: string;
  onSaved?: () => void;   // rappelle un reload() de ta liste
};

export function EditableField({
  table, rowId, field, value, as: Tag = "div",
  className, style, multiline = false, placeholder = "", onSaved,
}: Props) {
  const { enabled } = useEditMode();
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [local, setLocal] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const r = document.createRange();
      r.selectNodeContents(ref.current); r.collapse(false);
      const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r);
    }
  }, [editing]);

  const commit = async () => {
    const next = (ref.current?.innerText ?? "").trim();
    setEditing(false);
    if (next === value) return;
    setLocal(next);
    setSaving(true);
    const { error } = await (supabase.from(table as never) as any)
      .update({ [field]: next }).eq("id", rowId);
    setSaving(false);
    if (error) { toast.error(`Sauvegarde échouée : ${error.message}`); setLocal(value); return; }
    toast.success("Sauvegardé");
    onSaved?.();
  };

  if (!enabled || !isAdmin) {
    return <Tag className={className} style={style}>{local || placeholder}</Tag>;
  }

  return (
    <span className="relative inline-block group/ef align-baseline" style={{ width: "fit-content", maxWidth: "100%" }}>
      <Tag
        ref={ref as any}
        className={`${className ?? ""} outline-none rounded-sm cursor-pointer`}
        style={{
          ...style,
          boxShadow: editing
            ? "0 0 0 2px var(--bo-accent)"
            : saving ? "0 0 0 2px var(--bo-dirty)" : undefined,
        }}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={(e: React.MouseEvent) => {
          if (!editing) { e.preventDefault(); e.stopPropagation(); setEditing(true); }
        }}
        onBlur={editing ? commit : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === "Enter") { e.preventDefault(); (e.target as HTMLElement).blur(); }
          if (e.key === "Escape") { e.preventDefault(); setEditing(false); if (ref.current) ref.current.innerText = local; }
        }}
      >
        {local || placeholder}
      </Tag>
      {!editing && !saving && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditing(true); }}
          className="absolute -top-2 -right-2 z-[150] hidden group-hover/ef:flex items-center justify-center w-6 h-6 rounded-full shadow-lg"
          style={{ background: "var(--bo-accent)", color: "var(--bo-accent-contrast)" }}
          aria-label="Éditer"
        >
          <Pencil className="w-3 h-3" />
        </button>
      )}
      {saving && (
        <span className="absolute -top-2 -right-2 z-[150] grid place-items-center w-6 h-6 rounded-full"
          style={{ background: "var(--bo-dirty)", color: "var(--bo-dark)" }}>
          <Loader2 className="w-3 h-3 animate-spin" />
        </span>
      )}
    </span>
  );
}
```

Côté hook de liste : lecture avec cache module + fallback, comme
`useSiteContentFields`, mais sur ta table dédiée. Le pattern complet (fallback
statique tant que la table est vide, `reload()` après édition) est dans
`useEditableSections.tsx` du projet d'origine si tu veux t'en inspirer.

---

## 8. Adaptation par stack

### 8.1 Commun à toutes

- `<AuthProvider>` doit envelopper toute l'app.
- `<EditModeProvider siteId=...>` enveloppe chaque page (ou le layout).
- `<EditModeToolbar />` rendu une fois par page sous le provider.
- Les composants `Editable*` sont du **React pur** : ils fonctionnent partout.

### 8.2 Vite + React (SPA) — le plus proche de l'original

- `import.meta.env.VITE_*` pour les env.
- Routage : `react-router` → `<Link to="/signin">`, page `signin` = route
  classique.
- Aucun souci SSR : tout est client.

### 8.3 Next.js (App Router)

- Env : `process.env.NEXT_PUBLIC_*` (adapter `client.ts`).
- **`"use client"`** en tête de : `useAuth.tsx`, `useEditMode.tsx`,
  `useSiteContentFields.ts`, tous les `Editable*`, `EditModeToolbar`,
  `signin`, et toute page qui les utilise.
- `AuthProvider` : dans un composant client monté dans `app/layout.tsx`.
- `window` / `localStorage` : déjà gardés par `typeof window !== "undefined"`.
- Routage : `import Link from "next/link"`, page `app/signin/page.tsx`.
- Pour du contenu publié dès le SSR : lis `site_content_fields` dans un Server
  Component / `generateMetadata` et passe la map en prop initiale.

### 8.4 Next.js (Pages Router)

- `AuthProvider` autour de `<Component />` dans `_app.tsx`.
- `import { useRouter } from "next/router"` pour les redirections post-login.
- `getServerSideProps` pour précharger le contenu publié si besoin.

### 8.5 TanStack Start (identique à l'original)

- `client.ts` gère déjà `import.meta.env` + fallback `process.env` pour le SSR.
- `EditModeProvider` dans le `component` de la route, `AuthProvider` dans
  `__root.tsx`.
- Voir `src/routes/index.tsx` et `src/routes/services.$slug.tsx` du projet
  d'origine pour un exemple réel de wiring.

---

## 9. Pièges connus

| Piège | Détail |
|---|---|
| `permission denied for function has_role` (42501) → `isAdmin` toujours `false` | il **faut** `grant execute on function public.has_role(...) to anon, authenticated;` (inclus dans le SQL §2.2). |
| Récursion RLS sur `user_roles` | `has_role()` doit être `security definer` + `set search_path = public`. |
| Cache module-level | `useSiteContentFields` ne refetch pas tout seul. Après `publish()`, l'`onPublished` rappelle `reload()`. Un `F5` marche toujours. |
| SSR : 1ère frame = fallback | normal (lecture en `useEffect`). Voir note §5.2 pour charger côté serveur. |
| Renommer une `section`/`field` | crée un nouveau champ ; l'ancien contenu publié devient orphelin en base (inoffensif mais invisible). |
| `EditableText` casse la mise en page inline | il enveloppe dans un `<span style="inline-block; width:fit-content">`. Pour un bloc pleine largeur, mets la classe de largeur sur le `Tag` interne, pas sur le parent. |
| Upload storage refusé | vérifier que le compte a bien le rôle `admin` (policies `site-images admin write`). |
| `EditableField` = save **immédiat** (pas de brouillon) | c'est voulu pour les listes. Ne pas mélanger avec le compteur de la barre. |
| Confirmation d'email Supabase activée | un admin créé sans *Auto Confirm* ne peut pas se connecter tant qu'il n'a pas cliqué le lien. |

---

## 10. Checklist de portage Marcus Immo

- [ ] Projet Supabase créé, URL + clé publishable récupérées
- [ ] SQL §2.2 exécuté sans erreur
- [ ] `SITE_ID` choisi et mis en constante
- [ ] Compte admin créé + ligne `user_roles` insérée + `has_role(...)` = `true`
- [ ] `npm i @supabase/supabase-js sonner lucide-react`
- [ ] `client.ts` adapté à la stack (env)
- [ ] 3 hooks + 3–4 composants collés
- [ ] `back-office.css` importé, 4 tokens ajustés à la charte
- [ ] `<AuthProvider>` + `<Toaster>` à la racine
- [ ] `<EditModeProvider>` + `<EditModeToolbar>` sur une page test
- [ ] Bouton clé dans la nav (connecté = toggle, sinon lien `/signin`)
- [ ] 1 `EditableText` + 1 `EditableImage` de test → éditer → Sauvegarder → F5 → la valeur persiste
- [ ] (si Next) `"use client"` partout où il faut
```

