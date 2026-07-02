import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  ssr: false,
  head: () => ({ meta: [{ title: "Nouveau mot de passe — HCE" }, { name: "robots", content: "noindex" }] }),
});

function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Le lien de reset dépose un token dans le hash → Supabase l'échange contre une session.
    // On attend l'événement PASSWORD_RECOVERY (ou une session existante) avant d'autoriser le submit.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) return toast.error("Mot de passe : 8 caractères minimum.");
    if (pw !== pw2) return toast.error("Les deux mots de passe ne correspondent pas.");
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) throw error;
      toast.success("Mot de passe mis à jour. Tu es connecté.");
      nav({ to: "/" });
    } catch (err: any) {
      toast.error(err.message ?? "Erreur");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        <h1 className="font-display text-3xl text-foreground mb-2">Nouveau mot de passe</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {ready
            ? "Choisis un nouveau mot de passe pour ton compte admin."
            : "Ouverture du lien de réinitialisation… si rien ne se passe, redemande un email."}
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="pw">Nouveau mot de passe</Label>
            <Input id="pw" type="password" required minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} disabled={!ready} />
          </div>
          <div>
            <Label htmlFor="pw2">Confirmer</Label>
            <Input id="pw2" type="password" required minLength={8} value={pw2} onChange={(e) => setPw2(e.target.value)} disabled={!ready} />
          </div>
          <Button type="submit" disabled={busy || !ready} className="w-full">
            {busy ? "..." : "Mettre à jour"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => nav({ to: "/signin" })}
          className="mt-4 w-full text-xs text-muted-foreground hover:text-foreground"
        >
          ← Retour à la connexion
        </button>
      </div>
    </div>
  );
}
