import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { reloadSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Trash2, Plus, Upload, LogOut, RefreshCw, GripVertical, ArrowUp, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — HCE" }, { name: "robots", content: "noindex" }] }),
});

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

/* ============================================================
   IMPORTANT (brief 9.d) : tout ce qui s'enregistre via cet admin
   doit aller dans site_content_fields (et non site_content),
   parce que la home publique lit avec useV() → site_content_fields.
   Pattern de sauvegarde garanti :
     1. await upsert Supabase
     2. si erreur → toast.error et on n'avance pas
     3. si succès → toast.success + on rafraîchit le cache lecture
   ============================================================ */

async function saveField(section: string, field: string, value: string): Promise<boolean> {
  const { error } = await supabase
    .from("site_content_fields")
    .upsert(
      {
        site_id: HOME_SITE_ID,
        section_key: section,
        field_key: field,
        content_type: "text",
        content_value: value,
      },
      { onConflict: "site_id,section_key,field_key" },
    );
  if (error) {
    toast.error(`Échec sauvegarde « ${section}.${field} » : ${error.message}`);
    return false;
  }
  return true;
}

async function saveMany(items: Array<{ section: string; field: string; value: string }>): Promise<boolean> {
  if (items.length === 0) return true;
  const rows = items.map((it) => ({
    site_id: HOME_SITE_ID,
    section_key: it.section,
    field_key: it.field,
    content_type: "text" as const,
    content_value: it.value,
  }));
  const { error } = await supabase
    .from("site_content_fields")
    .upsert(rows, { onConflict: "site_id,section_key,field_key" });
  if (error) {
    toast.error(`Échec sauvegarde : ${error.message}`);
    return false;
  }
  return true;
}

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Chargement…</div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-4">
        <h1 className="font-display text-3xl">Accès refusé</h1>
        <p className="text-muted-foreground max-w-md">
          Ton compte ({user.email}) n'a pas le rôle administrateur. Demande à un admin de te l'attribuer dans la table <code>user_roles</code>.
        </p>
        <div className="flex gap-2">
          <Button onClick={() => signOut()} variant="outline"><LogOut className="w-4 h-4 mr-2" />Se déconnecter</Button>
          <Link to="/" className="text-sm underline self-center">Retour au site</Link>
        </div>
      </div>
    );
  }

  return <AdminUI onSignOut={signOut} email={user.email ?? ""} />;
}

function AdminUI({ onSignOut, email }: { onSignOut: () => void; email: string }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl">Admin HCE</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="text-sm underline self-center">Voir le site</Link>
            <Button variant="outline" size="sm" onClick={onSignOut}><LogOut className="w-4 h-4 mr-2" />Déconnexion</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="hero">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="hero">Page d'accueil</TabsTrigger>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="types">Types de projet</TabsTrigger>
            <TabsTrigger value="requests">Demandes de devis</TabsTrigger>
            <TabsTrigger value="contact">Coordonnées</TabsTrigger>
            <TabsTrigger value="figures">Chiffres-clés</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6"><HeroEditor /></TabsContent>
          <TabsContent value="gallery" className="mt-6"><GalleryEditor /></TabsContent>
          <TabsContent value="types" className="mt-6"><ProjectTypesEditor /></TabsContent>
          <TabsContent value="requests" className="mt-6"><DevisRequestsList /></TabsContent>
          <TabsContent value="contact" className="mt-6"><ContactEditor /></TabsContent>
          <TabsContent value="figures" className="mt-6"><FiguresEditor /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ============================================================
   HERO EDITOR — fix critique : écrit dans site_content_fields
   ============================================================ */
function HeroEditor() {
  const { get, reload } = useSiteContentFields(HOME_SITE_ID);
  const [hero, setHero] = useState({
    line1: get("hero", "line1", "Enrobé · Cours ·"),
    line2: get("hero", "line2", "Parkings · Terrassement"),
    badge: get("hero", "badge", "Jura & Ain — depuis 2012"),
    tagline: get("hero", "tagline", "Depuis 2012"),
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setHero({
      line1: get("hero", "line1", "Enrobé · Cours ·"),
      line2: get("hero", "line2", "Parkings · Terrassement"),
      badge: get("hero", "badge", "Jura & Ain — depuis 2012"),
      tagline: get("hero", "tagline", "Depuis 2012"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    const ok = await saveMany([
      { section: "hero", field: "line1", value: hero.line1 },
      { section: "hero", field: "line2", value: hero.line2 },
      { section: "hero", field: "badge", value: hero.badge },
      { section: "hero", field: "tagline", value: hero.tagline },
    ]);
    if (ok) {
      toast.success("Hero enregistré");
      await reload();
      await reloadSiteContent();
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
      <div className="text-xs text-muted-foreground -mt-2 mb-2">
        ✅ Ces champs sont lus en direct par la page d'accueil (table <code>site_content_fields</code>).
      </div>
      <div><Label>Titre — ligne 1</Label><Input value={hero.line1} onChange={(e) => setHero({ ...hero, line1: e.target.value })} /></div>
      <div><Label>Titre — ligne 2</Label><Input value={hero.line2} onChange={(e) => setHero({ ...hero, line2: e.target.value })} /></div>
      <div><Label>Badge (sous le titre)</Label><Input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} /></div>
      <div><Label>Tagline (coin droit)</Label><Input value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} /></div>
      <Button onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
    </div>
  );
}

/* ============================================================
   GALLERY EDITOR — catégories + photos (replace / delete / reorder)
   ============================================================ */
type Cat = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  display_order: number;
  active: boolean;
};
type Photo = {
  id: string;
  url: string;
  caption: string | null;
  alt_text: string | null;
  category_id: string | null;
  display_order: number;
};

async function uploadToGallery(file: File): Promise<string | null> {
  // Compression rapide : redimensionnement à 1920px max, qualité 82
  const compressed = await compressImage(file, 1920, 0.82).catch(() => file);
  const ext = (compressed.name || file.name).split(".").pop() || "jpg";
  const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, compressed, { upsert: false });
  if (error) {
    toast.error(error.message);
    return null;
  }
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}

function compressImage(file: File, maxSize: number, quality: number): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Not an image"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = img.width * ratio;
        const h = img.height * ratio;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("No canvas ctx")); return; }
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("Compression failed")); return; }
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality,
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function GalleryEditor() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [photosByCat, setPhotosByCat] = useState<Record<string, Photo[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [c, p] = await Promise.all([
      supabase.from("gallery_categories").select("*").order("display_order"),
      supabase.from("gallery_photos").select("*").order("display_order"),
    ]);
    if (c.error) toast.error(c.error.message);
    if (p.error) toast.error(p.error.message);
    const catList = (c.data ?? []) as Cat[];
    const photoList = (p.data ?? []) as Photo[];
    const byCat: Record<string, Photo[]> = {};
    for (const ph of photoList) {
      const k = ph.category_id ?? "_uncat";
      if (!byCat[k]) byCat[k] = [];
      byCat[k].push(ph);
    }
    setCats(catList);
    setPhotosByCat(byCat);
    setActiveCat((prev) => prev ?? catList[0]?.id ?? null);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateCat = async (id: string, patch: Partial<Cat>) => {
    const { error } = await supabase.from("gallery_categories").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Catégorie mise à jour");
    load();
  };

  if (loading) {
    return <div className="text-muted-foreground">Chargement…</div>;
  }

  if (cats.length === 0) {
    return (
      <div className="bg-card p-6 rounded-xl border border-border">
        <p className="text-muted-foreground">
          Aucune catégorie en base. Applique la migration <code>20260527120000_gallery_and_quote_tables.sql</code>
          via Supabase pour initialiser les catégories et les photos.
        </p>
        <Button className="mt-4" variant="outline" onClick={load}><RefreshCw className="w-4 h-4 mr-2" />Recharger</Button>
      </div>
    );
  }

  const current = cats.find((c) => c.id === activeCat) ?? cats[0];
  const photos = photosByCat[current.id] ?? [];

  return (
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-xl border border-border flex gap-2 flex-wrap">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-3 py-1.5 rounded text-sm border transition ${
              current.id === c.id ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
            }`}
          >
            {c.title} <span className="opacity-60 ml-1">({photosByCat[c.id]?.length ?? 0})</span>
          </button>
        ))}
      </div>

      <CategoryEditor cat={current} onSave={(patch) => updateCat(current.id, patch)} />

      <PhotoList catId={current.id} photos={photos} cats={cats} onChange={load} />
    </div>
  );
}

function CategoryEditor({ cat, onSave }: { cat: Cat; onSave: (patch: Partial<Cat>) => void }) {
  const [local, setLocal] = useState<Cat>(cat);
  useEffect(() => setLocal(cat), [cat.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-card p-6 rounded-xl border border-border space-y-3">
      <div className="text-xs text-muted-foreground">Catégorie sélectionnée</div>
      <div><Label>Titre</Label><Input value={local.title} onChange={(e) => setLocal({ ...local, title: e.target.value })} /></div>
      <div><Label>Description</Label><Textarea rows={2} value={local.description ?? ""} onChange={(e) => setLocal({ ...local, description: e.target.value })} /></div>
      <div>
        <Label>Photo de couverture (URL)</Label>
        <CoverImageField value={local.cover_url ?? ""} onChange={(v) => setLocal({ ...local, cover_url: v })} />
      </div>
      <Button onClick={() => onSave({ title: local.title, description: local.description, cover_url: local.cover_url })}>
        Enregistrer la catégorie
      </Button>
    </div>
  );
}

function CoverImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/photos/… ou URL" />
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border cursor-pointer text-sm hover:bg-muted whitespace-nowrap">
          {busy ? "…" : <><Upload className="w-4 h-4" />Upload</>}
          <input
            type="file" accept="image/*" className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0]; if (!f) return;
              setBusy(true);
              const url = await uploadToGallery(f);
              setBusy(false);
              if (url) onChange(url);
            }}
          />
        </label>
      </div>
      {value && <img src={value} alt="" className="h-24 w-40 object-cover rounded-md border border-border" />}
    </div>
  );
}

function PhotoList({ catId, photos, cats, onChange }: { catId: string; photos: Photo[]; cats: Cat[]; onChange: () => void }) {
  const replacePhoto = async (id: string, file: File) => {
    const url = await uploadToGallery(file);
    if (!url) return;
    const { error } = await supabase.from("gallery_photos").update({ url }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Photo remplacée");
    onChange();
  };

  const updatePhoto = async (id: string, patch: Partial<Photo>) => {
    const { error } = await supabase.from("gallery_photos").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    onChange();
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Photo supprimée");
    onChange();
  };

  const movePhoto = async (i: number, dir: -1 | 1) => {
    const a = photos[i];
    const b = photos[i + dir];
    if (!a || !b) return;
    const { error: e1 } = await supabase.from("gallery_photos").update({ display_order: b.display_order }).eq("id", a.id);
    const { error: e2 } = await supabase.from("gallery_photos").update({ display_order: a.display_order }).eq("id", b.id);
    if (e1 || e2) { toast.error("Réordonnancement échoué"); return; }
    onChange();
  };

  const addPhotos = async (files: FileList) => {
    let nextOrder = photos.length > 0 ? Math.max(...photos.map((p) => p.display_order)) + 1 : 0;
    for (const f of Array.from(files)) {
      const url = await uploadToGallery(f);
      if (!url) continue;
      const { error } = await supabase.from("gallery_photos").insert({
        url, category_id: catId, display_order: nextOrder++,
      });
      if (error) { toast.error(error.message); continue; }
    }
    toast.success(`${files.length} photo(s) ajoutée(s)`);
    onChange();
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">Photos ({photos.length})</h3>
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground cursor-pointer text-sm">
          <Plus className="w-4 h-4" />Ajouter des photos
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && addPhotos(e.target.files)} />
        </label>
      </div>
      {photos.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aucune photo dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {photos.map((p, i) => (
            <div key={p.id} className="bg-background p-3 rounded-lg border border-border flex gap-3">
              <img src={p.url} alt={p.alt_text ?? ""} className="w-28 h-28 object-cover rounded flex-shrink-0" />
              <div className="flex-1 space-y-2 min-w-0">
                <Input
                  placeholder="Légende (optionnel)"
                  value={p.caption ?? ""}
                  onChange={(e) => updatePhoto(p.id, { caption: e.target.value })}
                  className="text-xs"
                />
                <select
                  value={p.category_id ?? ""}
                  onChange={(e) => updatePhoto(p.id, { category_id: e.target.value })}
                  className="w-full text-xs bg-background border border-border rounded px-2 py-1.5"
                >
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
                <div className="flex gap-1 flex-wrap">
                  <label className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs border border-border cursor-pointer hover:bg-muted">
                    <Upload className="w-3 h-3" />Remplacer
                    <input
                      type="file" accept="image/*" className="hidden"
                      onChange={(e) => e.target.files?.[0] && replacePhoto(p.id, e.target.files[0])}
                    />
                  </label>
                  <button onClick={() => movePhoto(i, -1)} disabled={i === 0}
                          className="p-1.5 rounded border border-border hover:bg-muted disabled:opacity-30">
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button onClick={() => movePhoto(i, 1)} disabled={i === photos.length - 1}
                          className="p-1.5 rounded border border-border hover:bg-muted disabled:opacity-30">
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button onClick={() => deletePhoto(p.id)}
                          className="p-1.5 rounded border border-destructive/30 text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PROJECT TYPES EDITOR
   ============================================================ */
type PType = {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  price_from: number | null;
  price_unit: string;
  show_price: boolean;
  display_order: number;
  active: boolean;
};

function ProjectTypesEditor() {
  const [items, setItems] = useState<PType[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("project_types").select("*").order("display_order");
    if (error) toast.error(error.message);
    setItems((data ?? []) as PType[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const update = async (id: string, patch: Partial<PType>) => {
    const { error } = await supabase.from("project_types").update(patch).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Type mis à jour");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce type de projet ?")) return;
    const { error } = await supabase.from("project_types").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    load();
  };

  const add = async () => {
    const { error } = await supabase.from("project_types").insert({
      slug: `nouveau-${Date.now()}`, label: "Nouveau type", price_unit: "€/m²",
      display_order: items.length, active: true,
    });
    if (error) { toast.error(error.message); return; }
    load();
  };

  if (loading) return <div className="text-muted-foreground">Chargement…</div>;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Le « à partir de X €/m² » affiché sur la carte est <strong>indicatif</strong> et éditable ici.
        Aucun total n'est jamais calculé pour le client.
      </p>
      {items.map((t) => (
        <div key={t.id} className="bg-card p-5 rounded-xl border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{t.slug}</span>
            <Button variant="ghost" size="sm" onClick={() => remove(t.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div><Label>Libellé</Label><Input value={t.label} onChange={(e) => update(t.id, { label: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={t.slug} onChange={(e) => update(t.id, { slug: e.target.value })} /></div>
          </div>
          <div><Label>Description courte</Label><Input value={t.description ?? ""} onChange={(e) => update(t.id, { description: e.target.value })} /></div>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div><Label>Prix à partir de</Label><Input type="number" step="0.01" value={t.price_from ?? ""} onChange={(e) => update(t.id, { price_from: e.target.value ? Number(e.target.value) : null })} /></div>
            <div><Label>Unité</Label><Input value={t.price_unit} onChange={(e) => update(t.id, { price_unit: e.target.value })} /></div>
            <label className="inline-flex items-center gap-2 text-sm pb-2">
              <input type="checkbox" checked={t.show_price} onChange={(e) => update(t.id, { show_price: e.target.checked })} />
              Afficher le prix
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3 items-end">
            <div><Label>Ordre d'affichage</Label><Input type="number" value={t.display_order} onChange={(e) => update(t.id, { display_order: Number(e.target.value) })} /></div>
            <label className="inline-flex items-center gap-2 text-sm pb-2">
              <input type="checkbox" checked={t.active} onChange={(e) => update(t.id, { active: e.target.checked })} />
              Actif (affiché aux visiteurs)
            </label>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1" />Ajouter un type</Button>
    </div>
  );
}

/* ============================================================
   DEVIS REQUESTS LIST (lecture seule, plus récents en haut)
   ============================================================ */
type DevisRow = {
  id: string;
  created_at: string;
  project_type_label: string | null;
  estimated_surface_m2: number | null;
  free_dimensions: string | null;
  name: string;
  phone: string;
  email: string;
  city: string | null;
  postal_code: string | null;
  description: string | null;
  status: string;
};

function DevisRequestsList() {
  const [rows, setRows] = useState<DevisRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("devis_requests")
      .select("id, created_at, project_type_label, estimated_surface_m2, free_dimensions, name, phone, email, city, postal_code, description, status")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as DevisRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="text-muted-foreground">Chargement…</div>;

  if (rows.length === 0) {
    return (
      <div className="bg-card p-6 rounded-xl border border-border text-muted-foreground">
        Aucune demande de devis pour le moment.
        <Button className="ml-3" size="sm" variant="outline" onClick={load}><RefreshCw className="w-4 h-4 mr-1" />Rafraîchir</Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{rows.length} demande(s) — aucun prix n'est jamais calculé ni affiché.</p>
        <Button size="sm" variant="outline" onClick={load}><RefreshCw className="w-4 h-4 mr-1" />Rafraîchir</Button>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{new Date(r.created_at).toLocaleString("fr-FR")}</span>
            <span className="px-2 py-0.5 rounded bg-muted">{r.project_type_label ?? "—"}</span>
          </div>
          <div className="mt-2 grid md:grid-cols-3 gap-3 text-sm">
            <div>
              <div className="font-medium">{r.name}</div>
              <a href={`tel:${r.phone}`} className="block text-primary hover:underline">{r.phone}</a>
              <a href={`mailto:${r.email}`} className="block text-primary hover:underline truncate">{r.email}</a>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Surface</div>
              <div>{r.estimated_surface_m2 !== null ? `${r.estimated_surface_m2} m²` : (r.free_dimensions || "—")}</div>
              {(r.postal_code || r.city) && (
                <div className="mt-2 text-muted-foreground text-xs">Localisation</div>
              )}
              {(r.postal_code || r.city) && (
                <div>{[r.postal_code, r.city].filter(Boolean).join(" ")}</div>
              )}
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Message</div>
              <div className="whitespace-pre-wrap">{r.description || "—"}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   CONTACT EDITOR — téléphone, email, adresse, horaires (footer)
   ============================================================ */
function ContactEditor() {
  const { get, reload } = useSiteContentFields(HOME_SITE_ID);
  const [c, setC] = useState({
    phone: get("footer", "phone", "03 84 52 61 48"),
    email: get("footer", "email", "sarl.hce@laposte.net"),
    address: get("footer", "address", "40 avenue Etienne Lamy, 39300 Cize"),
    hours: get("footer", "hours", "Lun-Ven 8h-18h · Sam 8h-12h"),
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setC({
      phone: get("footer", "phone", "03 84 52 61 48"),
      email: get("footer", "email", "sarl.hce@laposte.net"),
      address: get("footer", "address", "40 avenue Etienne Lamy, 39300 Cize"),
      hours: get("footer", "hours", "Lun-Ven 8h-18h · Sam 8h-12h"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    const ok = await saveMany([
      { section: "footer", field: "phone", value: c.phone },
      { section: "footer", field: "email", value: c.email },
      { section: "footer", field: "address", value: c.address },
      { section: "footer", field: "hours", value: c.hours },
    ]);
    if (ok) {
      toast.success("Coordonnées enregistrées");
      await reload();
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
      <p className="text-xs text-muted-foreground">
        ⚠️ Ces champs alimentent le footer du site. Pour modifier les liens <code>tel:</code> et
        <code>mailto:</code> partout, il faut aussi mettre à jour le code (en dur dans le hero
        et les CTAs).
      </p>
      <div><Label>Téléphone</Label><Input value={c.phone} onChange={(e) => setC({ ...c, phone: e.target.value })} /></div>
      <div><Label>Email</Label><Input value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} /></div>
      <div><Label>Adresse</Label><Input value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} /></div>
      <div><Label>Horaires</Label><Input value={c.hours} onChange={(e) => setC({ ...c, hours: e.target.value })} /></div>
      <Button onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
    </div>
  );
}

/* ============================================================
   FIGURES EDITOR — chiffres-clés (Transformation)
   ============================================================ */
function FiguresEditor() {
  const { get, reload } = useSiteContentFields(HOME_SITE_ID);
  const [f, setF] = useState({
    chantiers: get("transformation", "stat_0_l", "Chantiers"),
    years_label: get("transformation", "stat_1_l", "Années"),
    satisfied_label: get("transformation", "stat_2_l", "Satisfaits"),
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setF({
      chantiers: get("transformation", "stat_0_l", "Chantiers"),
      years_label: get("transformation", "stat_1_l", "Années"),
      satisfied_label: get("transformation", "stat_2_l", "Satisfaits"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    const ok = await saveMany([
      { section: "transformation", field: "stat_0_l", value: f.chantiers },
      { section: "transformation", field: "stat_1_l", value: f.years_label },
      { section: "transformation", field: "stat_2_l", value: f.satisfied_label },
    ]);
    if (ok) {
      toast.success("Chiffres-clés enregistrés");
      await reload();
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
      <p className="text-xs text-muted-foreground">
        Tu peux modifier les <strong>libellés</strong> des chiffres-clés (1000 chantiers, 14 années, 100%
        satisfaits) affichés dans la section Avant/Après. Les valeurs numériques elles-mêmes (1000, 14, 100)
        sont définies dans le code pour préserver la cohérence du discours (depuis 2012 = 14 années).
      </p>
      <div><Label>Libellé pour 1000+</Label><Input value={f.chantiers} onChange={(e) => setF({ ...f, chantiers: e.target.value })} /></div>
      <div><Label>Libellé pour 14</Label><Input value={f.years_label} onChange={(e) => setF({ ...f, years_label: e.target.value })} /></div>
      <div><Label>Libellé pour 100%</Label><Input value={f.satisfied_label} onChange={(e) => setF({ ...f, satisfied_label: e.target.value })} /></div>
      <Button onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</Button>
    </div>
  );
}
