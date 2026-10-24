import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { PAGE_UPDATED } from "@/lib/lastmod";

/**
 * PAGE `/contact` — créée le 24/10/2026.
 *
 * Pourquoi cette page existe. Jusqu'ici, les coordonnées de HCE n'étaient
 * publiées que dans le pied de page de l'accueil (valeurs éditables en base) et
 * dans les données structurées : aucune URL stable ne portait à elle seule le
 * NAP complet. Or Google teste depuis octobre 2026 un bloc de réponse en tête
 * des résultats IA pour les requêtes dont la réponse tient sur un site officiel,
 * avec l'exemple explicite de « la page contact d'une entreprise » (veille du
 * 19/10/2026, SEO-JOURNAL.md). Les moteurs et les IA ont donc besoin d'UNE page
 * officielle, crawlable, qui réponde à « comment joindre / où se trouve HCE ».
 *
 * ⚠️ Règles tenues :
 * - Les coordonnées sont celles du bloc « NAP canonique » du journal, à
 *   l'identique du pied de page et du `LocalBusiness` de l'accueil. Le mobile du
 *   bouton WhatsApp n'est PAS repris ici : son statut est en question ouverte
 *   (« Hypothèses à vérifier », 08/10/2026).
 * - Aucune promesse de délai (contenu figé), aucun prix.
 * - Coordonnées GPS : géocodage INSEE de l'établissement, les mêmes que le
 *   `geo` du `LocalBusiness` (recherche-entreprises.api.gouv.fr, 08/09/2026).
 * - Aucune alerte locale inventée (même règle que `/arnaque-goudronnage`) :
 *   pas de « sévit dans le Jura ».
 * - Distance Cize (39153) ↔ Cize (01106) : 68,1 km entre les points centraux
 *   de geo.api.gouv.fr, calculée le 24/10/2026 (formule de haversine).
 * - Tout est statique (aucun appel Supabase) : rendu complet côté serveur.
 */

const URL_CONTACT = "https://www.hcetp.com/contact";

const TITRE = "Contact HCE — enrobé et travaux publics à Cize (Jura) · 03 84 52 61 48";
const DESCRIPTION =
  "Coordonnées officielles de HCE : 40 avenue Etienne Lamy, 39300 Cize (Jura), 03 84 52 61 48, horaires, accès et préparation d'une demande de devis.";

const GPS = { lat: 46.7234, lon: 5.9186 };
const LIEN_CARTE = `https://www.openstreetmap.org/?mlat=${GPS.lat}&mlon=${GPS.lon}#map=16/${GPS.lat}/${GPS.lon}`;

const COORDONNEES: { k: string; v: string; href?: string }[] = [
  { k: "Entreprise", v: "HCE — HCE SARL (H.C.E. - HINI - COURS - ENROBE au registre)" },
  { k: "Adresse", v: "40 avenue Etienne Lamy, 39300 Cize, Jura (39), France" },
  { k: "Téléphone", v: "03 84 52 61 48", href: "tel:0384526148" },
  { k: "E-mail", v: "sarl.hce@laposte.net", href: "mailto:sarl.hce@laposte.net" },
  { k: "Horaires", v: "Lundi au vendredi 8h-18h · samedi 8h-12h" },
  { k: "Zone d'intervention", v: "Jura (39) et Ain (01)" },
  { k: "SIREN / SIRET du siège", v: "521 683 573 / 521 683 573 00039" },
  { k: "Coordonnées GPS", v: "46.7234, 5.9186", href: LIEN_CARTE },
];

/**
 * Questions réelles autour du contact. Source unique de la section visible ET
 * du JSON-LD `FAQPage` (`scripts/verif-faq.mjs`).
 *
 * CONTRÔLE DE DOUBLON : l'homonymie Cize (39) / Cize (01) est traitée en
 * détail sur le hub `/realisations` et les vérifications anti-arnaque sur
 * `/arnaque-goudronnage` ; ici elles ne sont que rappelées en une phrase, avec
 * un lien, sous l'angle propre à cette page (trouver et joindre la bonne
 * entreprise).
 */
const SAVOIR = {
  heading: "Ce qu'on nous demande avant d'appeler",
  lead: "Quatre questions reviennent avant le premier contact : comment joindre l'entreprise, où elle se trouve exactement, ce qu'il faut avoir sous la main pour une demande de devis, et comment s'assurer qu'on parle bien à HCE et pas à un démarcheur qui en emprunte le nom.",
  updated: PAGE_UPDATED["/contact"],
  qa: [
    {
      q: "Comment contacter l'entreprise HCE ?",
      a: "Par téléphone au 03 84 52 61 48, du lundi au vendredi de 8h à 18h et le samedi de 8h à 12h, ou par e-mail à sarl.hce@laposte.net. Pour une demande de devis, le formulaire en ligne de l'accueil fonctionne en trois étapes — le type de projet, les dimensions approximatives de la surface, puis vos coordonnées — et l'entreprise vous rappelle pour convenir d'une visite sur site. C'est cette visite qui permet d'établir un devis détaillé et sans engagement. Le numéro 03 84 52 61 48 est une ligne fixe, celle du siège de Cize ; c'est le même que celui des annuaires professionnels où l'entreprise est référencée.",
    },
    {
      q: "Où se trouve HCE, et comment ne pas se tromper de Cize ?",
      a: "Au 40 avenue Etienne Lamy, 39300 Cize, dans le Jura — à 3,2 kilomètres à vol d'oiseau du centre de Champagnole. Les coordonnées GPS de l'établissement sont 46.7234 de latitude et 5.9186 de longitude : c'est le géocodage officiel de l'INSEE pour le SIRET 52168357300039, plus précis que le centre de la commune. Deux pièges classiques. Le premier : il existe une autre commune nommée Cize, dans l'Ain (code postal 01250, code INSEE 01106), à environ 68 kilomètres à vol d'oiseau ; un GPS à qui l'on donne seulement « Cize » peut proposer l'une ou l'autre, d'où l'intérêt de saisir le code postal 39300 ou les coordonnées. Le second : l'adresse s'écrit « 40 B avenue Etienne Lamy » au registre national des entreprises et « 40 Bis » dans plusieurs annuaires — il s'agit de la même adresse et du même établissement.",
    },
    {
      q: "Que faut-il préparer avant de demander un devis d'enrobé ?",
      a: "Cinq informations suffisent pour un premier échange utile : la commune du chantier et son code postal, le type de surface (cour, chemin, parking, voirie), ses dimensions approximatives — une longueur et une largeur à quelques mètres près suffisent, elles sont affinées sur place —, ce qu'il y a aujourd'hui au sol (gravier, terre, ancien enrobé fissuré, béton) et la façon dont un engin peut y accéder. Si vous connaissez un problème d'eau, une flaque qui stagne ou un ruissellement vers la maison, dites-le dès le départ : c'est ce qui décide des pentes et parfois d'un drainage. Deux choses, en revanche, ne se donnent pas par téléphone : un prix et une date de pose ferme. Un chantier d'enrobé se chiffre après une visite sur site, parce que la surface réelle, l'état du support et l'évacuation de l'eau ne s'évaluent pas autrement, et la période de pose dépend de la météo et de l'altitude du chantier.",
    },
    {
      q: "Comment être sûr de parler à la vraie entreprise HCE ?",
      a: "En rappelant vous-même le 03 84 52 61 48, plutôt qu'un numéro laissé par un démarcheur, et en vérifiant le SIREN 521 683 573 sur l'Annuaire des entreprises de l'État (annuaire-entreprises.data.gouv.fr), qui affiche gratuitement la dénomination, l'adresse du siège à Cize et l'activité. Ces coordonnées sont les seules publiées par l'entreprise : elles figurent à l'identique sur ce site, dans ses mentions légales et dans les annuaires professionnels. Le rappel est utile parce que des offres de goudronnage faites sans rendez-vous, « avec l'enrobé qui reste d'un chantier voisin », font l'objet d'alertes de gendarmerie dans plusieurs départements : les signes qui doivent alerter et les vérifications à faire sont détaillés sur la page consacrée à l'arnaque au goudronnage.",
    },
  ],
  sources: [
    {
      label:
        "Annuaire des entreprises (data.gouv.fr) — fiche SIREN 521683573 : dénomination, siège et activité",
      url: "https://annuaire-entreprises.data.gouv.fr/entreprise/521683573",
    },
    {
      label:
        "API Recherche d'entreprises (recherche-entreprises.api.gouv.fr) — géocodage INSEE de l'établissement 52168357300039, consulté le 8 septembre 2026",
      url: "https://recherche-entreprises.api.gouv.fr/search?q=521683573",
    },
    {
      label:
        "API Découpage administratif (geo.api.gouv.fr) — points centraux de Cize (39153) et de Champagnole (39097), relevés le 30 septembre 2026",
      url: "https://geo.api.gouv.fr/",
    },
  ],
};

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL_CONTACT },
    ],
    links: [{ rel: "canonical", href: URL_CONTACT }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hcetp.com/" },
            { "@type": "ListItem", position: 2, name: "Contact", item: URL_CONTACT },
          ],
        }),
      },
      {
        /* ContactPage. `mainEntity` pointe vers `#business`, l'entité déjà
           décrite en entier sur l'accueil (adresse, geo, horaires, sameAs) :
           on ne la redéclare pas ici, pour ne pas créer deux versions
           concurrentes du NAP. */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": URL_CONTACT,
          url: URL_CONTACT,
          name: "Contact HCE — Cize (Jura)",
          description: DESCRIPTION,
          inLanguage: "fr-FR",
          mainEntity: { "@id": "https://www.hcetp.com/#business" },
          publisher: { "@id": "https://www.hcetp.com/#business" },
        }),
      },
      {
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

const LIEN = "underline decoration-gold/40 underline-offset-2 hover:text-gold";

function Contact() {
  return (
    <>
      <SmoothScroll />
      <WhatsAppFAB />
      <main className="bg-background text-foreground overflow-x-hidden">
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

        {/* HERO — réponse directe en tête */}
        <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Fil d'ariane" className="label text-gold">
              <Link to="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
              <span aria-hidden> — </span>
              <span>Contact</span>
            </nav>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
            >
              Contacter HCE à Cize
            </h1>
            <p className="mt-6 max-w-3xl text-muted" style={{ fontSize: 17, lineHeight: 1.7 }}>
              HCE, entreprise d'enrobé à chaud et de travaux publics créée en 2012, se joint au 03
              84 52 61 48, du lundi au vendredi de 8h à 18h et le samedi de 8h à 12h. Son siège
              est au 40 avenue Etienne Lamy, 39300 Cize, dans le Jura, à côté de Champagnole ; elle
              intervient dans tout le Jura et l'Ain. Chaque devis est détaillé, sans engagement, et
              établi après une visite sur site.
            </p>
          </div>
        </section>

        {/* COORDONNÉES — NAP complet, en clair */}
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl mx-auto">
          <div className="label text-gold">— Coordonnées officielles</div>
          <h2
            className="font-display mt-6 text-foreground"
            style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            Quelles sont les coordonnées de HCE ?
          </h2>
          <p
            className="mt-6 max-w-3xl text-foreground/90"
            style={{ fontSize: 17, lineHeight: 1.75 }}
          >
            Ce sont les seules coordonnées publiées par l'entreprise, identiques à celles de ses{" "}
            <Link to="/mentions-legales" className={LIEN}>
              mentions légales
            </Link>{" "}
            et des annuaires professionnels. Le téléphone est une ligne fixe, celle du siège.
          </p>
          <dl
            className="mt-10 grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-x-8 gap-y-4"
            style={{ fontSize: 16 }}
          >
            {COORDONNEES.map((c) => (
              <div key={c.k} className="contents">
                <dt className="label text-gold pt-1">{c.k}</dt>
                <dd className="text-foreground/90 border-b border-gold/10 pb-3">
                  {c.href ? (
                    <a
                      href={c.href}
                      className={LIEN}
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {c.v}
                    </a>
                  ) : (
                    c.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-3xl text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>
            Jusqu'où l'entreprise se déplace, commune par commune, est détaillé sur la page{" "}
            <Link to="/zone-intervention" className={LIEN}>
              Zone d'intervention
            </Link>
            . Les prestations sont décrites sur les pages{" "}
            <Link to="/services/$slug" params={{ slug: "enrobe-a-chaud" }} className={LIEN}>
              Enrobé à chaud
            </Link>{" "}
            et{" "}
            <Link to="/services/$slug" params={{ slug: "preparation-terrain" }} className={LIEN}>
              Préparation de terrain
            </Link>
            , et les chantiers dans les{" "}
            <Link to="/realisations" className={LIEN}>
              réalisations
            </Link>
            . En cas de démarchage au nom de l'entreprise, voir{" "}
            <Link to="/arnaque-goudronnage" className={LIEN}>
              Arnaque au goudronnage : les signes
            </Link>
            .
          </p>
        </section>

        {/* CE QU'IL FAUT SAVOIR — même tableau que le JSON-LD FAQPage */}
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
              Dernière mise à jour :{" "}
              <time dateTime={SAVOIR.updated.iso}>{SAVOIR.updated.label}</time>
            </p>
            <p className="mt-2">
              Sources :{" "}
              {SAVOIR.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={LIEN}>
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
            Décrivez votre <span className="italic text-gold">chantier</span>
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
