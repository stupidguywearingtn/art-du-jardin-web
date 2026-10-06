// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Detachement de l'hebergement Lovable/Cloudflare -> deploiement direct sur
// Vercel. Le preset Nitro par defaut ("cloudflare-module", impose par le
// wrapper Lovable) produit un bundle incompatible avec les Functions
// Vercel ; on le force explicitement ici.
// Runtime des Vercel Functions epingle explicitement. Sans ce champ, le preset
// Nitro le deduit de la version de Node qui fait tourner le BUILD
// (resolveVercelRuntime -> getSystemNodeVersion, nitro 3.0.260603-beta) : un
// build sur Node 20 emet "nodejs20.x" dans .vc-config.json. Or Vercel a
// desactive Node 20 pour les Functions le 01/10/2026 et refuse tout nouveau
// deploiement qui le declare
// (https://vercel.com/changelog/node-js-20-is-being-deprecated) — ce qui
// correspond a la fenetre de rupture mesuree ici (dernier succes 01/10 07:12
// UTC, premier echec 02/10 07:24 UTC). Epingler la valeur rend la sortie
// independante du reglage Node du tableau de bord, invisible depuis le depot.
// Garder la meme version que package.json > engines.node.
//
// Passe par une variable intermediaire a dessein : le type `nitro` du wrapper
// Lovable ne declare que `preset`/`output`/`cloudflare`, alors que Nitro accepte
// bien `vercel.functions.runtime` (VercelOptions). Un objet litteral inline
// declencherait le controle des proprietes excedentaires de TypeScript ; via une
// variable, l'option passe sans `as` ni `@ts-ignore`. Verifie : le build emet
// bien le runtime epingle (teste avec une valeur differente de l'auto-detection).
const nitroConfig = {
  preset: "vercel",
  vercel: { functions: { runtime: "nodejs22.x" } },
};

export default defineConfig({
  nitro: nitroConfig,
});
