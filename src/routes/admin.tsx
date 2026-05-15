import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent, reloadSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Trash2, Plus, Upload, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — HCE" }, { name: "robots", content: "noindex" }] }),
});

type Hero = { line1: string; line2: string; badge: string; tagline: string };
type Service = { n: string; t: string; img: string; slug: string };
type Faq = { q: string; a: string };

const DEFAULT_HERO: Hero = { line1: "L'Enrobé qui", line2: "Marque le Temps.", badge: "HCE — Cize, Jura", tagline: "Depuis 2005" };

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Chargement...</div>;
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
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Tabs defaultValue="hero">
          <TabsList>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="hero" className="mt-6"><HeroEditor /></TabsContent>
          <TabsContent value="services" className="mt-6"><ServicesEditor /></TabsContent>
          <TabsContent value="faq" className="mt-6"><FaqEditor /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

async function saveContent(key: string, data: any) {
  const { error } = await supabase.from("site_content").upsert({ key, data }, { onConflict: "key" });
  if (error) {
    toast.error(error.message);
    return false;
  }
  await reloadSiteContent();
  toast.success("Enregistré");
  return true;
}

async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: false });
  if (error) { toast.error(error.message); return null; }
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/photos/... ou URL" />
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border cursor-pointer text-sm hover:bg-muted">
          {busy ? "..." : <><Upload className="w-4 h-4" />Upload</>}
          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            setBusy(true);
            const url = await uploadImage(f);
            setBusy(false);
            if (url) onChange(url);
          }} />
        </label>
      </div>
      {value && <img src={value} alt="" className="h-24 w-40 object-cover rounded-md border border-border" />}
    </div>
  );
}

function HeroEditor() {
  const { get } = useSiteContent();
  const [hero, setHero] = useState<Hero>(get("hero", DEFAULT_HERO));

  useEffect(() => { setHero(get("hero", DEFAULT_HERO)); }, [get]);

  return (
    <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
      <div><Label>Titre — ligne 1</Label><Input value={hero.line1} onChange={(e) => setHero({ ...hero, line1: e.target.value })} /></div>
      <div><Label>Titre — ligne 2</Label><Input value={hero.line2} onChange={(e) => setHero({ ...hero, line2: e.target.value })} /></div>
      <div><Label>Badge (sous le titre)</Label><Input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} /></div>
      <div><Label>Tagline (coin droit)</Label><Input value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} /></div>
      <Button onClick={() => saveContent("hero", hero)}>Enregistrer</Button>
    </div>
  );
}

function ServicesEditor() {
  const { get } = useSiteContent();
  const [items, setItems] = useState<Service[]>([]);

  useEffect(() => {
    setItems(get<Service[]>("services", []));
  }, [get]);

  function update(i: number, patch: Partial<Service>) {
    setItems(items.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  }
  function add() {
    setItems([...items, { n: String(items.length + 1).padStart(2, "0"), t: "Nouveau service", img: "", slug: "" }]);
  }
  function remove(i: number) {
    setItems(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      {items.map((s, i) => (
        <div key={i} className="bg-card p-5 rounded-xl border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Service #{i + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => remove(i)}><Trash2 className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Numéro</Label><Input value={s.n} onChange={(e) => update(i, { n: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={s.slug} onChange={(e) => update(i, { slug: e.target.value })} /></div>
          </div>
          <div><Label>Titre</Label><Input value={s.t} onChange={(e) => update(i, { t: e.target.value })} /></div>
          <div><Label>Image</Label><ImageField value={s.img} onChange={(v) => update(i, { img: v })} /></div>
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1" />Ajouter</Button>
        <Button onClick={() => saveContent("services", items)}>Enregistrer tous les services</Button>
      </div>
    </div>
  );
}

function FaqEditor() {
  const { get } = useSiteContent();
  const [items, setItems] = useState<Faq[]>([]);

  useEffect(() => { setItems(get<Faq[]>("faqs", [])); }, [get]);

  function update(i: number, patch: Partial<Faq>) {
    setItems(items.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  }
  function add() { setItems([...items, { q: "", a: "" }]); }
  function remove(i: number) { setItems(items.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-4">
      {items.map((f, i) => (
        <div key={i} className="bg-card p-5 rounded-xl border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Question #{i + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => remove(i)}><Trash2 className="w-4 h-4" /></Button>
          </div>
          <div><Label>Question</Label><Input value={f.q} onChange={(e) => update(i, { q: e.target.value })} /></div>
          <div><Label>Réponse</Label><Textarea rows={3} value={f.a} onChange={(e) => update(i, { a: e.target.value })} /></div>
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="outline" onClick={add}><Plus className="w-4 h-4 mr-1" />Ajouter</Button>
        <Button onClick={() => saveContent("faqs", items)}>Enregistrer la FAQ</Button>
      </div>
    </div>
  );
}
