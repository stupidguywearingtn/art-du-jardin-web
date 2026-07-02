import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/signin")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Connexion — HCE Admin" }, { name: "robots", content: "noindex" }] }),
});

function friendlyError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Email pas encore confirmé — vérifie ta boîte mail.";
  if (m.includes("user already registered")) return "Un compte existe déjà avec cet email.";
  if (m.includes("rate limit")) return "Trop de tentatives, réessaie dans quelques minutes.";
  if (m.includes("network")) return "Problème réseau — vérifie ta connexion.";
  return msg;
}

function LoginPage() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");

  useEffect(() => {
    if (!loading && user && mode !== "forgot") nav({ to: "/" });
  }, [loading, user, nav, mode]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connexion réussie.");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast.success("Compte créé. Vérifie ton email pour confirmer.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Email de réinitialisation envoyé. Vérifie ta boîte mail.");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(friendlyError(err.message ?? "Erreur"));
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/" });
    if (r.error) toast.error("Connexion Google impossible");
  }

  const title =
    mode === "signin" ? "Se connecter" : mode === "signup" ? "Créer le compte" : "Envoyer le lien";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        <h1 className="font-display text-3xl text-foreground mb-2">Admin HCE</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "forgot"
            ? "Entre ton email — on t'envoie un lien pour définir un nouveau mot de passe."
            : "Connecte-toi pour modifier le site."}
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {mode !== "forgot" && (
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="mt-2 text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>
          )}
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "..." : title}
          </Button>
        </form>

        {mode !== "forgot" && (
          <>
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px bg-border flex-1" />OU<div className="h-px bg-border flex-1" />
            </div>
            <Button variant="outline" className="w-full" onClick={google}>
              Continuer avec Google
            </Button>
          </>
        )}

        <button
          type="button"
          onClick={() =>
            setMode(mode === "signin" ? "signup" : mode === "signup" ? "signin" : "signin")
          }
          className="mt-4 w-full text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin"
            ? "Pas de compte ? Créer un compte"
            : mode === "signup"
              ? "Déjà inscrit ? Se connecter"
              : "← Retour à la connexion"}
        </button>
      </div>
    </div>
  );
}
