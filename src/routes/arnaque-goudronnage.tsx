import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { PAGE_UPDATED } from "@/lib/lastmod";

/**
 * PAGE `/arnaque-goudronnage` — créée le 11/10/2026.
 *
 * POURQUOI CETTE PAGE EXISTE. « Arnaque goudronnage », « faux bitumeurs »,
 * « goudronneurs itinérants » sont des requêtes réelles, et le sujet revient
 * chaque saison dans les alertes de gendarmerie. Le site n'en parlait que dans
 * UNE question de `/realisations/cour-allee-privee` (le droit du démarchage :
 * L221-10, L221-18). Cette page traite l'autre moitié, celle qui manquait :
 * comment reconnaître le procédé, comment vérifier une entreprise en cinq
 * minutes, que faire après avoir signé — et elle oppose à chaque signe
 * d'alerte une preuve que le visiteur peut contrôler lui-même chez HCE.
 *
 * RÈGLES DE RÉDACTION TENUES ICI (à garder si la page est reprise) :
 * - **Aucune alerte locale inventée.** Aucune alerte de la gendarmerie du Jura
 *   ou de l'Ain n'a été retrouvée en source primaire le 11/10/2026 ; la page
 *   cite donc l'alerte de la gendarmerie de l'Indre (France Bleu Berry) comme
 *   exemple, et ne prétend pas que le procédé « sévit dans le Jura ».
 * - **Aucune promesse au nom du client.** On décrit ce que la loi impose à
 *   toute entreprise et les éléments d'identité publics de HCE (SIRET, adresse,
 *   téléphone fixe, date de création). On n'écrit PAS « HCE ne fait jamais de
 *   porte-à-porte » ni « HCE ne demande jamais d'acompte » : invérifiable,
 *   donc interdit (leçon du 23/09/2026 dans SEO-JOURNAL.md).
 * - **Pas de redite** de la Q/R démarchage de `cour-allee-privee` : on y
 *   renvoie par lien pour le détail des articles L221-10 et L221-18.
 * - Chaque H2 est une question telle qu'on la pose à un moteur ou à une IA,
 *   et le premier paragraphe qui la suit y répond en 2-3 phrases. C'est ce
 *   premier paragraphe — et lui seul — qui est repris dans le `FAQPage`.
 *
 * Contrainte de rendu (14 et 15/09/2026) : tout est statique, aucun appel
 * Supabase, aucun `useEffect`.
 */

const URL_PAGE = "https://www.hcetp.com/arnaque-goudronnage";

const TITRE = "Arnaque au goudronnage : les signes qui doivent alerter — Jura & Ain | HCE";
const DESCRIPTION =
  "Arnaque au goudronnage (« il nous reste de l'enrobé ») : les signes, vérifier l'entreprise (SIRET, décennale) et que faire si vous avez déjà payé.";

/**
 * Les sections. `q` = H2 visible, `r` = réponse directe visible (reprise telle
 * quelle dans le FAQPage), `suite` = paragraphes de développement, visibles
 * mais hors FAQPage.
 */
type Section = { id: string; label: string; q: string; r: string; suite: string[]; liste?: string[] };

const SECTIONS: Section[] = [
  {
    id: "procede",
    label: "Le procédé",
    q: "Comment se passe une arnaque au goudronnage ?",
    r: "Une équipe se présente sans rendez-vous, souvent en camion, et propose de goudronner votre cour ou votre chemin tout de suite, à un prix très bas, avec « l'enrobé qui reste d'un chantier voisin ». Le travail est fait en quelques heures, payé sur-le-champ, souvent en liquide, et le revêtement se dégrade au premier hiver. L'entreprise, elle, est introuvable.",
    suite: [
      "La gendarmerie de l'Indre a décrit ce procédé dans une alerte relayée par France Bleu Berry : de faux ouvriers proposent, contre de l'argent, de goudronner une partie du chemin d'accès, à des tarifs attractifs, avec un produit de mauvaise qualité qui ne tient pas. Elle appelle « à la plus grande vigilance, notamment pour les personnes isolées et les plus fragiles ». Des alertes de même nature sont publiées régulièrement par les gendarmeries d'autres départements, au printemps et à l'automne, quand il fait assez doux pour poser.",
      "Le schéma de pression est le même que celui que la DGCCRF décrit pour les arnaques à la rénovation : un prix « préférentiel » conditionné à une décision immédiate, un paiement le jour même, et parfois une renonciation au délai de rétractation signée en échange de la remise. C'est la combinaison urgence + prix + paiement immédiat qui doit alerter, pas l'un des trois isolément.",
    ],
  },
  {
    id: "signes",
    label: "Les signes",
    q: "Quels signes doivent faire refuser une offre de goudronnage ?",
    r: "Refusez dès que l'un de ces signes apparaît : pas de devis écrit et détaillé, pas d'adresse d'entreprise vérifiable, pas de numéro SIRET, une demande de paiement avant la fin des travaux ou le jour même, et l'argument de l'enrobé « qui reste » pour justifier l'urgence. Un vrai chantier d'enrobé se prépare : il passe par une visite, un devis et une date.",
    suite: [
      "Les signes à repérer, un par un :",
      "Il y a aussi des signes techniques, que l'on reconnaît même sans être du métier. Un enrobé à chaud se fabrique en centrale et se pose chaud — HCE le pose à la main à 150 °C, puis le compacte au rouleau avant qu'il refroidisse. Une cour ne se « goudronne » pas sans préparation : il faut décaisser, poser et compacter une couche de fondation, et régler les pentes pour que l'eau parte. Une équipe qui étale un produit directement sur la terre ou l'herbe, sans rouleau, ou qui ne sait pas dire quelle épaisseur elle pose, ne fait pas un enrobé qui passera l'hiver jurassien.",
    ],
    liste: [
      "Personne n'est venu mesurer avant de donner un prix, ou le prix est annoncé « au mètre » de vive voix, sans document.",
      "Le devis n'existe pas, ou il ne précise ni la surface, ni l'épaisseur, ni la granulométrie (0/10, 0/14), ni la préparation du support.",
      "Aucune adresse d'établissement, ou une simple boîte postale ; un numéro de téléphone portable comme seul contact.",
      "Pas de numéro SIRET sur le devis, ou un numéro qui ne correspond à rien dans l'annuaire officiel des entreprises.",
      "Une attestation d'assurance décennale absente du devis, ou promise « pour plus tard ».",
      "Le paiement demandé avant la fin des travaux, en liquide, ou le jour même de la signature.",
      "L'urgence : « c'est maintenant ou jamais », « l'enrobé va refroidir », « on repart ce soir ».",
    ],
  },
  {
    id: "verifier",
    label: "Vérifier",
    q: "Comment vérifier une entreprise de goudronnage avant de signer ?",
    r: "En cinq minutes et gratuitement : saisissez son numéro SIRET ou son nom sur l'Annuaire des entreprises de l'État (annuaire-entreprises.data.gouv.fr), qui affiche l'adresse, la date de création et le code d'activité. Vérifiez ensuite que l'attestation d'assurance décennale est bien jointe au devis : c'est une obligation légale. Enfin, assurez-vous que l'adresse donnée existe vraiment.",
    suite: [
      "L'Annuaire des entreprises est le service officiel, gratuit, qui réunit les informations légales des entreprises établies en France : adresse, date de création, activité, SIREN, SIRET et code NAF. Une entreprise de travaux routiers ou de terrassement porte en général un code d'activité de la division 42 ou 43 (par exemple 43.12A, « Travaux de terrassement courants et travaux préparatoires »). Une entreprise créée il y a trois semaines, domiciliée à l'autre bout du pays, ou dont l'activité n'a rien à voir avec les travaux, doit poser question.",
      "Pour l'assurance, la règle est écrite dans l'article L243-2 du code des assurances : les justificatifs d'assurance décennale prennent la forme d'attestations « jointes aux devis et factures des professionnels assurés ». Le modèle d'attestation, fixé par un arrêté du 5 janvier 2016 et applicable aux attestations émises depuis le 1er juillet 2016, mentionne au minimum le nom de l'assuré, son numéro d'identification, l'assureur, le numéro et la période de validité du contrat, et les activités couvertes. Vérifiez que l'activité « travaux de voirie », « VRD » ou « terrassement » y figure bien : une attestation qui ne couvre que la peinture ne couvre pas votre cour.",
    ],
  },
  {
    id: "loi",
    label: "La loi",
    q: "Une entreprise de goudronnage peut-elle se faire payer le jour même chez moi ?",
    r: "Non. Pour un contrat signé à votre domicile, l'entreprise ne peut recevoir aucun paiement avant un délai de sept jours, et vous disposez de quatorze jours pour vous rétracter. Une entreprise qui exige un règlement immédiat sur le pas de la porte enfreint la loi.",
    suite: [
      "Le détail des articles L221-10 et L221-18 du code de la consommation, et les sanctions prévues, est donné sur la page consacrée aux cours et allées privées. Deux précisions qui comptent face à ce procédé précis. D'abord, le code prévoit une exception au droit de rétractation pour les travaux d'entretien ou de réparation à réaliser en urgence au domicile — mais seulement s'ils ont été expressément sollicités par le consommateur. Une équipe qui sonne d'elle-même pour proposer un goudronnage n'entre pas dans ce cas, même si elle présente le chantier comme urgent.",
      "Ensuite, quand la pression s'exerce sur une personne âgée ou vulnérable, les faits peuvent relever de l'abus de faiblesse, défini aux articles L121-8 à L121-10 du code de la consommation. L'UFC-Que Choisir rappelle que ce délit est puni de trois ans d'emprisonnement et de 375 000 € d'amende, montant qui peut être porté à 10 % du chiffre d'affaires.",
    ],
  },
  {
    id: "recours",
    label: "Après coup",
    q: "J'ai déjà signé ou payé un goudronnage : que faire ?",
    r: "Si le contrat a été signé chez vous il y a moins de quatorze jours, envoyez sans attendre une lettre de rétractation en recommandé avec accusé de réception. Signalez ensuite les faits sur SignalConso, la plateforme de la DGCCRF, et déposez plainte à la gendarmerie si vous avez payé, en apportant le devis, le reçu, une photo du véhicule et de l'immatriculation.",
    suite: [
      "Gardez tout : le papier signé, même s'il ne ressemble pas à un devis, les messages, le numéro de téléphone, les photos des travaux. Si l'entreprise a omis de vous informer de votre droit de rétractation, le délai de quatorze jours est prolongé de douze mois. Si l'équipe est encore sur place et que la pression devient menaçante, appelez le 17.",
      "Pour le revêtement lui-même : un enrobé mal posé ne se « répare » pas en rajoutant une couche par-dessus. S'il faut reprendre la surface, faites-la d'abord examiner par une entreprise identifiable, qui vous remettra un devis détaillé indiquant ce qui doit être retiré et ce qui peut être conservé.",
    ],
  },
  {
    id: "hce",
    label: "Les preuves de HCE",
    q: "Comment vérifier HCE, entreprise d'enrobé à Cize dans le Jura ?",
    r: "Avec les mêmes contrôles que pour n'importe quelle entreprise. HCE SARL est immatriculée sous le SIREN 521 683 573 (SIRET du siège 521 683 573 00039), son siège est au 40 avenue Etienne Lamy, 39300 Cize, son téléphone fixe est le 03 84 52 61 48, et elle a été créée en 2012. Ces informations se vérifient en deux minutes sur l'Annuaire des entreprises.",
    suite: [
      "Chaque chantier commence par une visite sur site et un devis détaillé : surface, épaisseur, granulation et préparation du support y sont écrits, pour que vous puissiez comparer avec une autre offre. Les travaux d'enrobé sont couverts par la garantie décennale, et vous êtes en droit de demander l'attestation correspondante avec le devis — à HCE comme à toute autre entreprise. La garantie décennale, la garantie de parfait achèvement et la réception des travaux sont expliquées, articles du code civil à l'appui, sur la page des réalisations.",
      "HCE intervient dans le Jura et dans l'Ain, depuis Cize, près de Champagnole. Les communes desservies, avec les distances depuis le siège, sont détaillées sur la page de la zone d'intervention. Si quelqu'un se présente chez vous au nom de HCE et que vous avez un doute, appelez le 03 84 52 61 48 : c'est le numéro du siège, publié à l'identique sur l'ensemble du site et dans les annuaires.",
    ],
  },
];

const SOURCES = [
  {
    label:
      "France Bleu Berry — « Indre : l'arnaque aux \"bitumeurs\" est de retour, la gendarmerie appelle à la vigilance »",
    url: "https://www.francebleu.fr/infos/faits-divers-justice/indre-l-arnaque-aux-bitumeurs-est-de-retour-la-gendarmerie-appelle-a-la-vigilance-1616057249",
  },
  {
    label:
      "DGCCRF — Lutte contre les arnaques dans le secteur des travaux de rénovation (20 février 2024)",
    url: "https://www.economie.gouv.fr/dgccrf/lutte-contre-les-arnaques-dans-le-secteur-des-travaux-de-renovation-0",
  },
  {
    label:
      "Institut national de la consommation — attestations d'assurance jointes aux devis et factures (article L243-2 du code des assurances), depuis le 1er juillet 2016",
    url: "https://www.inc-conso.fr/node/9118",
  },
  {
    label: "Annuaire des entreprises (service officiel de l'État) — fiche de HCE, SIREN 521683573",
    url: "https://annuaire-entreprises.data.gouv.fr/entreprise/521683573",
  },
  {
    label: "UFC-Que Choisir — abus de faiblesse : articles L121-8 à L121-10 et sanctions",
    url: "https://www.quechoisir.org/lettre-type-achats-abus-de-faiblesse-n1027",
  },
  {
    label: "SignalConso — signaler un problème avec une entreprise (DGCCRF)",
    url: "https://signal.conso.gouv.fr/",
  },
] as const;

export const Route = createFileRoute("/arnaque-goudronnage")({
  component: ArnaqueGoudronnage,
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL_PAGE },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: URL_PAGE }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hcetp.com/" },
            { "@type": "ListItem", position: 2, name: "Arnaque au goudronnage", item: URL_PAGE },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${URL_PAGE}#article`,
          headline: "Arnaque au goudronnage : les signes qui doivent alerter",
          description: DESCRIPTION,
          inLanguage: "fr-FR",
          url: URL_PAGE,
          mainEntityOfPage: URL_PAGE,
          datePublished: PAGE_UPDATED["/arnaque-goudronnage"].iso,
          dateModified: PAGE_UPDATED["/arnaque-goudronnage"].iso,
          author: { "@id": "https://www.hcetp.com/#business" },
          publisher: { "@id": "https://www.hcetp.com/#business" },
          about: ["Arnaque au goudronnage", "Démarchage à domicile", "Enrobé à chaud"],
          spatialCoverage: ["Jura", "Ain"],
        }),
      },
      {
        /* FAQPage strictement aligné sur le visible : chaque question est un
           H2 de la page, chaque réponse est le paragraphe qui le suit
           immédiatement, au caractère près (contrôlé par verif-faq.mjs). */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SECTIONS.map((s) => ({
            "@type": "Question",
            name: s.q,
            acceptedAnswer: { "@type": "Answer", text: s.r },
          })),
        }),
      },
    ],
  }),
});

const H2 = "font-display mt-6 text-foreground";
const H2_STYLE = {
  fontSize: "clamp(26px, 4vw, 42px)",
  fontWeight: 400,
  lineHeight: 1.08,
} as const;
const P = "mt-6 max-w-3xl text-foreground/90";
const P_STYLE = { fontSize: 17, lineHeight: 1.75 } as const;
const LIEN = "underline decoration-gold/40 underline-offset-2 hover:text-gold";

function ArnaqueGoudronnage() {
  const updated = PAGE_UPDATED["/arnaque-goudronnage"];

  return (
    <>
      <SmoothScroll />
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

        {/* HERO — réponse directe en tête */}
        <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Fil d'ariane" className="label text-gold">
              <Link to="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
              <span aria-hidden> — </span>
              <span>Arnaque au goudronnage</span>
            </nav>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(36px, 6.5vw, 86px)", fontWeight: 400, lineHeight: 0.98 }}
            >
              Arnaque au goudronnage : les signes qui doivent alerter
            </h1>
            <p className="mt-6 max-w-3xl text-muted" style={{ fontSize: 17, lineHeight: 1.7 }}>
              Une équipe qui sonne sans rendez-vous, propose de goudronner votre cour le jour même
              avec « l'enrobé qui reste d'un chantier » et demande à être payée tout de suite : c'est
              le schéma de l'arnaque au goudronnage. Cette page explique comment la reconnaître,
              comment vérifier n'importe quelle entreprise en cinq minutes avant de signer, et quoi
              faire si vous avez déjà payé. Elle est écrite par HCE, entreprise d'enrobé à chaud
              établie à Cize, dans le Jura, depuis 2012.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 label text-gold">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-foreground transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="px-6 md:px-12 pt-16 md:pt-20 max-w-5xl mx-auto scroll-mt-24">
            <div className="label text-gold">— {s.label}</div>
            <h2 className={H2} style={H2_STYLE}>
              {s.q}
            </h2>
            <p className={P} style={{ ...P_STYLE, fontWeight: 500 }}>
              {s.r}
            </p>
            {s.id === "signes" ? (
              <>
                <p className={P} style={P_STYLE}>
                  {s.suite[0]}
                </p>
                <ul className="mt-4 max-w-3xl list-disc pl-6 space-y-2 text-foreground/90" style={P_STYLE}>
                  {s.liste?.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <p className={P} style={P_STYLE}>
                  {s.suite[1]}
                </p>
                <p className={P} style={P_STYLE}>
                  Ce qui se décide réellement au devis d'un enrobé — épaisseur, granulation, pose sur
                  l'ancien revêtement ou non — est détaillé sur la page{" "}
                  <Link to="/services/$slug" params={{ slug: "enrobe-a-chaud" }} className={LIEN}>
                    enrobé à chaud
                  </Link>
                  , et la préparation du sol sur la page{" "}
                  <Link to="/services/$slug" params={{ slug: "preparation-terrain" }} className={LIEN}>
                    préparation de terrain
                  </Link>
                  .
                </p>
              </>
            ) : (
              s.suite.map((p) => (
                <p key={p.slice(0, 40)} className={P} style={P_STYLE}>
                  {p}
                </p>
              ))
            )}
            {s.id === "loi" && (
              <p className={P} style={P_STYLE}>
                Voir la question sur le démarchage à domicile dans le dossier{" "}
                <Link to="/realisations/$slug" params={{ slug: "cour-allee-privee" }} className={LIEN}>
                  cour et allée privée
                </Link>
                .
              </p>
            )}
            {s.id === "hce" && (
              <p className={P} style={P_STYLE}>
                Pour aller plus loin :{" "}
                <Link to="/mentions-legales" className={LIEN}>
                  l'identité légale complète de HCE
                </Link>
                ,{" "}
                <Link to="/realisations" className={LIEN}>
                  les réalisations et les garanties
                </Link>
                ,{" "}
                <Link to="/zone-intervention" className={LIEN}>
                  la zone d'intervention
                </Link>
                .
              </p>
            )}
          </section>
        ))}

        {/* DATE + SOURCES */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto">
          <div
            className="mt-16 border-t border-gold/15 pt-6 text-muted"
            style={{ fontSize: 14, lineHeight: 1.7 }}
          >
            <p>
              Dernière mise à jour : <time dateTime={updated.iso}>{updated.label}</time>
            </p>
            <p className="mt-2">
              Sources :{" "}
              {SOURCES.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={LIEN}>
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
            <p className="mt-2">
              Cette page donne une information générale et ne remplace pas un conseil juridique.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 md:px-12 py-28 md:py-32 text-center bg-surface mt-16">
          <div className="label text-gold">— Un projet ?</div>
          <h2
            className="font-display mt-6 text-foreground max-w-3xl mx-auto"
            style={{ fontSize: "clamp(30px, 4.5vw, 56px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            Un devis <span className="italic text-gold">écrit et détaillé</span>, avant tout
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
          <p className="mt-3 text-muted text-sm">
            HCE SARL · 40 avenue Etienne Lamy, 39300 Cize · 03 84 52 61 48
          </p>
          <p className="mt-2 text-muted text-sm">
            <Link to="/mentions-legales" className="transition-colors hover:text-gold">
              Mentions légales
            </Link>
          </p>
        </footer>
        <MobileFloatingCTA href="/#devis" />
      </main>
    </>
  );
}
