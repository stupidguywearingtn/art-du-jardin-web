import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { fallbackCategoryBySlug } from "@/hooks/useGallery";
import { REAL_CAT_SLUGS, RELATED_SERVICES, titleCaseSlug } from "@/lib/realisations";

/**
 * HUB `/realisations` — créé le 20/09/2026.
 *
 * Avant cette date l'URL répondait 404 : les cinq dossiers de réalisations
 * n'avaient aucune page mère, ni dans le maillage interne ni dans les fils
 * d'ariane, alors que « réalisations enrobé Jura » est une requête de
 * destination naturelle. Cette page les rassemble.
 *
 * Contrainte de rendu, apprise à ses dépens les 14 et 15/09/2026 : **tout le
 * contenu de cette page est statique**. Aucun `useEffect`, aucun appel
 * Supabase, aucun état de chargement — un contenu chargé après le premier
 * rendu n'existe pas pour un robot. Les titres des dossiers viennent de
 * `fallbackCategoryBySlug`, c'est-à-dire de la même constante que les `<h1>`
 * des pages cibles, pour que le texte servi ici et le texte affiché là-bas ne
 * puissent pas diverger.
 */

const URL_HUB = "https://www.hcebtp.com/realisations";

const TITRE = "Réalisations HCE — enrobé, cours et parkings dans le Jura";
const DESCRIPTION =
  "Les chantiers HCE en photos : cours et allées privées, parkings et voiries pro, préparation et terrassement, chantiers en cours dans le Jura et l'Ain. Devis détaillé après visite.";

/**
 * Ce que montre chaque dossier. Descriptions de ce qu'on voit réellement sur
 * les photos et de ce que le type de chantier implique — aucun chantier
 * nommé, aucun chiffre, aucune référence client inventée.
 */
const DOSSIERS: Record<string, string> = {
  "cour-allee-privee":
    "Des surfaces privées reprises d'un seul tenant : la cour ou l'allée est décaissée, la plateforme réglée, puis l'enrobé posé et compacté. Ce sont les raccords qui se regardent en premier sur ces photos — la jonction au seuil du garage, le tour des regards, la rive tenue par une bordure.",
  "parking-voirie-pro":
    "Des surfaces qui encaissent des véhicules lourds et des manœuvres répétées : parkings d'entreprise, voiries de copropriété, plateformes. La préparation du support et l'évacuation de l'eau y pèsent plus lourd que sur une cour, parce que la charge et la surface amplifient le moindre défaut de portance ou de pente.",
  "preparation-terrassement":
    "L'étape d'avant l'enrobé, celle qu'on ne voit plus une fois le chantier fini : décaissement, réglage de la plateforme, drainage, mise à niveau des regards. C'est elle qui décide de la tenue de la surface finie, et c'est pour ça qu'elle a son propre dossier photo.",
  "chantier-en-cours":
    "L'équipe au travail : l'enrobé à chaud répandu à la main à 150 °C, puis compacté au rouleau avant qu'il ne refroidisse. Ces photos montrent la mise en œuvre elle-même, pas seulement le résultat.",
};

/**
 * Bloc « ce qu'il faut savoir ». Questions posées telles qu'on les pose à voix
 * haute, réponse autonome en tête. Ce tableau est la source unique de la
 * section visible ET du JSON-LD `FAQPage` : les deux ne peuvent pas diverger.
 */
const SAVOIR = {
  heading: "Ce qu'on nous demande avant de signer",
  lead: "Regarder des photos de chantiers ne dit pas ce qui se passe après, une fois l'enrobé posé et la facture payée. Voici ce que couvre réellement la garantie décennale sur une cour ou un parking, à partir de quand elle court, quel document l'entreprise doit remettre avant d'ouvrir le chantier, et d'où HCE intervient.",
  updated: "2026-09-20",
  updatedLabel: "20 septembre 2026",
  qa: [
    {
      q: "Une cour ou un parking en enrobé est-il couvert par la garantie décennale ?",
      a: "Oui. La garantie décennale ne concerne pas que les bâtiments : la fiche officielle service-public.gouv.fr sur la garantie décennale des constructeurs, vérifiée le 10 avril 2026, cite parmi les ouvrages couverts la voirie — c'est-à-dire le chemin d'accès — et les ouvrages de viabilité, réseaux et assainissement. Une cour, une allée ou un parking réalisés par un professionnel entrent donc dans son champ. Ce qu'elle couvre, ce ne sont pas les défauts d'aspect : ce sont les désordres qui menacent la solidité de l'ouvrage ou le rendent impropre à son usage, y compris quand ils proviennent d'un vice du sol. La garantie repose sur l'article 1792 du Code civil, et l'assurance correspondante doit être souscrite par l'entreprise avant le démarrage des travaux. HCE intervient sous garantie décennale.",
    },
    {
      q: "À partir de quand court la garantie décennale d'un chantier ?",
      a: "Le délai démarre le lendemain de la signature du procès-verbal de réception des travaux, et il court dix ans. C'est donc la réception — le moment où le maître d'ouvrage accepte l'ouvrage — qui déclenche le compte à rebours, et non la date du devis, du début du chantier ou de la facture. Passé ces dix ans, plus aucune action en justice ne peut être engagée contre le constructeur sur ce fondement. Concrètement, sur une cour ou un parking, cela veut dire qu'il faut un document de réception daté : sans lui, le point de départ de la garantie n'est pas établi. Source : service-public.gouv.fr, fiche vérifiée le 10 avril 2026.",
    },
    {
      q: "Quel document l'entreprise doit-elle remettre avant d'ouvrir le chantier ?",
      a: "Une attestation d'assurance de responsabilité civile décennale, remise au maître d'ouvrage avant l'ouverture du chantier. La loi impose en outre de la joindre au devis et à la facture : ce n'est pas un document à réclamer, c'est un document que le professionnel fournit. Deux points de vigilance que la fiche officielle signale et qu'on lit rarement ailleurs. D'abord, seuls les travaux déclarés dans le contrat d'assurance sont couverts — une entreprise assurée pour un métier ne l'est pas automatiquement pour un autre. Ensuite, l'ouverture du chantier doit intervenir pendant la période de validité du contrat, donc la date de l'attestation compte autant que son existence. L'absence de garantie décennale est un délit puni de 6 mois d'emprisonnement et de 75 000 € d'amende, prévu à l'article L243-3 du Code des assurances.",
    },
    {
      q: "Où HCE réalise-t-elle ces chantiers ?",
      a: "Dans le Jura (39) et l'Ain (01), depuis son siège de Cize. L'entreprise est enregistrée au registre national des entreprises sous le SIREN 521683573, SIRET du siège 52168357300039, au 40 avenue Etienne Lamy, 39300 Cize, avec le code d'activité NAF 43.12A — travaux de terrassement courants et travaux préparatoires — relevé le 20 septembre 2026. Un point d'attention pour qui cherche l'entreprise ou vérifie une adresse : il existe deux communes nommées Cize en France, l'une dans l'Ain (01250) et l'autre dans le Jura (39300). HCE est celle du Jura, à deux kilomètres de Champagnole.",
    },
  ],
  sources: [
    {
      label:
        "service-public.gouv.fr — Garantie décennale des constructeurs (article 1792 du Code civil, article L243-3 du Code des assurances), fiche vérifiée le 10 avril 2026",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2034",
    },
    {
      label:
        "API Recherche d'entreprises (annuaire des entreprises, DINUM) — fiche SIREN 521683573",
      url: "https://recherche-entreprises.api.gouv.fr/search?q=521683573",
    },
  ],
};

function dossierTitre(slug: string): string {
  return fallbackCategoryBySlug(slug)?.title ?? titleCaseSlug(slug);
}

export const Route = createFileRoute("/realisations/")({
  component: HubRealisations,
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL_HUB },
    ],
    links: [{ rel: "canonical", href: URL_HUB }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hcebtp.com/" },
            { "@type": "ListItem", position: 2, name: "Réalisations", item: URL_HUB },
          ],
        }),
      },
      {
        /* CollectionPage : cette page n'est pas un article, c'est la page mère
           des quatre dossiers. L'ItemList reprend exactement les quatre liens
           visibles, dans le même ordre. */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": URL_HUB,
          url: URL_HUB,
          name: "Réalisations HCE",
          description: DESCRIPTION,
          inLanguage: "fr-FR",
          publisher: { "@id": "https://www.hcebtp.com/#business" },
          mainEntity: {
            "@type": "ItemList",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: REAL_CAT_SLUGS.length,
            itemListElement: REAL_CAT_SLUGS.map((slug, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: dossierTitre(slug),
              url: `https://www.hcebtp.com/realisations/${slug}`,
            })),
          },
        }),
      },
      {
        /* FAQPage construit depuis le même tableau que la section visible
           ci-dessous : toute question ajoutée ici l'est des deux côtés. */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SAVOIR.qa.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function HubRealisations() {
  return (
    <>
      <SmoothScroll />
      <WhatsAppFAB />
      <main className="bg-background text-foreground overflow-x-hidden">
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>
              HCE
            </Link>
            <Link to="/" className="label text-gold hover:text-foreground transition-colors">
              ← Accueil
            </Link>
          </div>
        </header>

        {/* HERO — réponse directe en tête, avant tout développement */}
        <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Fil d'ariane" className="label text-gold">
              <Link to="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
              <span aria-hidden> — </span>
              <span>Réalisations</span>
            </nav>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
            >
              Les réalisations HCE
            </h1>
            <p className="mt-6 max-w-3xl text-muted" style={{ fontSize: 17, lineHeight: 1.7 }}>
              HCE range ses chantiers en quatre dossiers photo : cours et allées privées, parkings
              et voiries professionnelles, préparation et terrassement, chantiers en cours. Tous ont
              été réalisés dans le Jura et l'Ain, depuis Cize (39300), en enrobé à chaud posé à la
              main à 150 °C. Cette page les rassemble et indique, dossier par dossier, ce que
              montrent les photos et quelles prestations le chantier met en œuvre.
            </p>
          </div>
        </section>

        {/* LES QUATRE DOSSIERS */}
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl mx-auto">
          <div className="label text-gold">— Les dossiers</div>
          <h2
            className="font-display mt-6 text-foreground"
            style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            Quels types de chantiers HCE réalise-t-elle ?
          </h2>
          <p className="mt-6 max-w-3xl text-muted" style={{ fontSize: 17, lineHeight: 1.7 }}>
            Quatre familles de chantiers, de la cour de maison à la plateforme d'entreprise, plus un
            dossier consacré à la mise en œuvre elle-même. Chaque dossier ouvre sa galerie photo
            complète.
          </p>

          <div className="mt-12 space-y-12">
            {REAL_CAT_SLUGS.map((slug, i) => (
              <article
                key={slug}
                className="border-l-2 pl-6"
                style={{ borderColor: "var(--cuivre-500)" }}
              >
                <div
                  className="font-display text-gold"
                  style={{ fontSize: 40, fontWeight: 300, lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display text-foreground mt-3"
                  style={{ fontSize: 26, fontWeight: 400 }}
                >
                  <Link
                    to="/realisations/$slug"
                    params={{ slug }}
                    className="hover:text-gold transition-colors"
                  >
                    {dossierTitre(slug)}
                  </Link>
                </h3>
                <p className="mt-4 text-foreground/90" style={{ fontSize: 16, lineHeight: 1.75 }}>
                  {DOSSIERS[slug]}
                </p>
                <p className="mt-4 text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>
                  Prestations mises en œuvre :{" "}
                  {(RELATED_SERVICES[slug] ?? []).map((s, j) => (
                    <span key={s.slug}>
                      {j > 0 && " · "}
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
                      >
                        {s.label}
                      </Link>
                    </span>
                  ))}
                </p>
                <p className="mt-4">
                  <Link
                    to="/realisations/$slug"
                    params={{ slug }}
                    className="label text-gold border-b border-gold/40 pb-1"
                  >
                    Voir les photos <span aria-hidden>→</span>
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CE QU'IL FAUT SAVOIR — questions réelles, réponses autonomes.
            Contenu rendu en clair et toujours monté : c'est lui que reprend le
            JSON-LD FAQPage de cette page (même tableau `SAVOIR.qa`). */}
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-4xl mx-auto border-t border-gold/15">
          <div className="label text-gold">— Ce qu'il faut savoir</div>
          <h2
            className="font-display mt-6 text-foreground"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            {SAVOIR.heading}
          </h2>
          <p className="mt-6 text-muted max-w-3xl" style={{ fontSize: 17, lineHeight: 1.7 }}>
            {SAVOIR.lead}
          </p>

          <div className="mt-14 space-y-12">
            {SAVOIR.qa.map((f) => (
              <article key={f.q}>
                <h3
                  className="font-display text-gold"
                  style={{
                    fontSize: "clamp(21px, 2.4vw, 28px)",
                    fontWeight: 400,
                    lineHeight: 1.25,
                  }}
                >
                  {f.q}
                </h3>
                <p className="mt-4 text-foreground/90" style={{ fontSize: 17, lineHeight: 1.75 }}>
                  {f.a}
                </p>
              </article>
            ))}
          </div>

          <div
            className="mt-16 border-t border-gold/15 pt-6 text-muted"
            style={{ fontSize: 14, lineHeight: 1.7 }}
          >
            <p>
              Dernière mise à jour : <time dateTime={SAVOIR.updated}>{SAVOIR.updatedLabel}</time>
            </p>
            <p className="mt-2">
              Sources :{" "}
              {SAVOIR.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
                  >
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 md:px-12 py-32 text-center bg-surface">
          <div className="label text-gold">— Un projet ?</div>
          <h2
            className="font-display mt-6 text-foreground max-w-3xl mx-auto"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            Un chantier <span className="italic text-gold">comme ceux-là</span> chez vous ?
          </h2>
          <p
            className="mt-6 text-muted max-w-2xl mx-auto"
            style={{ fontSize: 16, lineHeight: 1.7 }}
          >
            Visite gratuite sur site, puis devis détaillé et sans engagement.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              hash="devis"
              className="cta-primary"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 4,
                background: "var(--cuivre-500)",
                color: "#fff",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s ease",
              }}
            >
              Demander un devis →
            </Link>
            <a
              href="tel:0384526148"
              className="cta-secondary"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 4,
                background: "transparent",
                color: "var(--creme-50)",
                border: "1px solid var(--creme-50)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              📞 03 84 52 61 48
            </a>
          </div>
        </section>

        {/* FOOTER simplifié */}
        <footer
          className="px-6 md:px-12 py-12 text-center border-t border-gold/15"
          style={{ background: "var(--footer)" }}
        >
          <Link to="/" className="font-display text-gold text-3xl">
            HCE
          </Link>
          <p className="mt-3 text-muted text-sm">Cize, Jura · 03 84 52 61 48</p>
        </footer>
        <MobileFloatingCTA href="/#devis" />
      </main>
    </>
  );
}
