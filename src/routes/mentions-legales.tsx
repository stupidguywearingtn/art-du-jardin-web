import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { PAGE_UPDATED } from "@/lib/lastmod";

/**
 * PAGE `/mentions-legales` — créée le 08/10/2026.
 *
 * POURQUOI CETTE PAGE EXISTE. Deux raisons, et la première est qu'elle manquait
 * purement et simplement.
 *
 * 1. **Obligation légale non remplie.** Le site publie un formulaire qui
 *    recueille nom, téléphone, e-mail, commune et description de projet, et ne
 *    portait AUCUNE mention légale : ni identité de l'éditeur, ni directeur de
 *    la publication, ni hébergeur, ni information sur le traitement des
 *    données. Le pied de page se limitait à l'adresse, au téléphone et à
 *    l'e-mail. L'obligation est à l'article 1-1 de la loi n° 2004-575 du
 *    21 juin 2004 (LCEN) — et pas à son article 6, III, 1°, où elle figurait
 *    avant la loi du 21 mai 2024 ; la version en vigueur de l'article 1-1 date
 *    du 23/05/2024 (relevée sur Légifrance le 08/10/2026).
 * 2. **C'est la page de cohérence NAP du site**, et c'est pour ça qu'elle est
 *    prise comme chantier pendant que l'indexation est nulle : la consigne de
 *    maintenance fait de la cohérence Nom / Adresse / Téléphone et des points
 *    d'entrée d'entité la priorité absolue tant que Google n'a pas découvert le
 *    domaine. Huit fiches d'annuaire décrivent HCE sans jamais mener au site
 *    (constat du 04/10, re-confirmé le 07/10) ; trois d'entre elles écrivent
 *    l'adresse « 40 Bis » quand le site écrit « 40 ». Cette page est le seul
 *    endroit du domaine où cette divergence peut être tranchée explicitement,
 *    en rattachant les deux graphies au même SIRET.
 *
 * CE QUI N'EST VOLONTAIREMENT PAS ÉCRIT ICI, et il ne faut pas le « compléter »
 * sans source :
 * - **le capital social et le greffe d'immatriculation** : non vérifiés depuis
 *   une source primaire lisible par le runner (pappers.fr et verif.com
 *   répondent 403). L'article 1-1 les demande pour une société : c'est une
 *   action client, inscrite dans ACTIONS-SEO-CLIENT.md.
 * - **le nom du gérant** : même raison. La page nomme donc la fonction
 *   (« la gérance »), jamais une personne. On ne publie pas l'identité d'une
 *   personne physique sur une déduction.
 * - **le médiateur de la consommation** (article L612-1 du code de la
 *   consommation) : décision prise le 29/09/2026 et reconduite ici — publier
 *   « le professionnel doit vous donner un médiateur » sans pouvoir nommer
 *   celui de HCE créerait une obligation apparente qu'on ne peut pas honorer
 *   sur la page. Action client.
 * - **le nom de l'assureur décennal et le numéro de contrat** : inconnus.
 *   La garantie décennale elle-même est déjà traitée, sourcée, sur
 *   `/realisations` — d'où le lien plutôt qu'une redite.
 * - **une durée de conservation des demandes de devis** : le code ne prévoit
 *   aucune suppression automatique, donc annoncer une durée serait faux. La
 *   page donne à la place le moyen concret d'obtenir l'effacement.
 *
 * Contrainte de rendu (apprise les 14 et 15/09/2026) : tout est statique.
 * Aucun `useEffect`, aucun appel Supabase, aucun état de chargement.
 */

const URL_ML = "https://www.hcetp.com/mentions-legales";

const TITRE = "Mentions légales — HCE SARL, Cize (39300), Jura";
const DESCRIPTION =
  "Éditeur, identité légale, hébergeur et traitement des données de ce site : HCE SARL, 40 avenue Etienne Lamy, 39300 Cize, SIREN 521683573, SIRET 52168357300039, code NAF 43.12A. Ce que devient une demande de devis et comment en obtenir l'effacement.";

/**
 * Identité légale. CHAQUE LIGNE A UNE SOURCE, et aucune n'est saisie de
 * mémoire : SIREN, SIRET, dénomination au registre et code NAF viennent du
 * registre national des entreprises (`recherche-entreprises.api.gouv.fr`,
 * SIREN 521683573, interrogé le 08/09/2026 puis le 04/10/2026, données INSEE
 * mises à jour le 07/05/2026) ; téléphone, e-mail, adresse affichée et horaires
 * sont ceux que publient déjà le pied de page, le `LocalBusiness` de l'accueil
 * et `public/llms.txt` — c'est précisément le point : une seule valeur par
 * champ, partout.
 */
const IDENTITE = [
  { k: "Dénomination", v: "HCE SARL" },
  { k: "Nom commercial", v: "HCE" },
  { k: "Dénomination au registre national", v: "H.C.E. - HINI - COURS - ENROBE" },
  { k: "Forme juridique", v: "Société à responsabilité limitée (SARL)" },
  { k: "Siège social", v: "40 avenue Etienne Lamy, 39300 Cize, France" },
  { k: "SIREN", v: "521 683 573" },
  { k: "SIRET du siège", v: "521 683 573 00039" },
  {
    k: "Code d'activité (NAF/APE)",
    v: "43.12A — Travaux de terrassement courants et travaux préparatoires",
  },
  { k: "Téléphone", v: "03 84 52 61 48" },
  { k: "Adresse électronique", v: "sarl.hce@laposte.net" },
  { k: "Horaires", v: "Du lundi au vendredi 8h-18h, le samedi 8h-12h" },
  {
    k: "Responsable de la publication",
    v: "La gérance de HCE SARL, joignable aux coordonnées ci-dessus",
  },
] as const;

/**
 * Les champs réellement recueillis par le formulaire de devis. Relevés le
 * 08/10/2026 **dans le code qui les valide**, pas dans un souvenir de
 * maquette : `PayloadSchema` de `src/routes/api/public/devis.ts`. Si le
 * formulaire change, cette liste doit changer avec lui — c'est la seule partie
 * de cette page qui dépend du code.
 */
const CHAMPS_DEVIS = [
  "le nom",
  "le numéro de téléphone",
  "l'adresse électronique",
  "le code postal et la commune du chantier",
  "le type de projet choisi",
  "les dimensions saisies ou la surface estimée",
  "la description libre du projet, si elle est remplie",
] as const;

const SOURCES = [
  {
    label:
      "Légifrance — article 1-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, version en vigueur depuis le 23 mai 2024 (relevé le 8 octobre 2026)",
    url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049568614",
  },
  {
    label:
      "Registre national des entreprises — SIREN 521683573 : dénomination, SIRET du siège, adresse et code NAF (API recherche-entreprises.api.gouv.fr, données INSEE mises à jour le 7 mai 2026)",
    url: "https://annuaire-entreprises.data.gouv.fr/entreprise/521683573",
  },
  {
    label:
      "Vercel — Privacy Policy, section « Contact Us » : raison sociale et adresse postale de l'hébergeur (relevées le 8 octobre 2026)",
    url: "https://vercel.com/legal/privacy-policy",
  },
  {
    label:
      "CNIL — exercer ses droits sur ses données personnelles (accès, rectification, effacement, opposition)",
    url: "https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles",
  },
] as const;

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegales,
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL_ML },
    ],
    links: [{ rel: "canonical", href: URL_ML }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hcetp.com/" },
            { "@type": "ListItem", position: 2, name: "Mentions légales", item: URL_ML },
          ],
        }),
      },
      {
        /* WebPage. `publisher` pointe vers `#business`, le seul `@id` publié par
           ce site — on ne crée pas de nœud, un pointeur mort ne vaut rien.
           Aucun `FAQPage` ici, et c'est volontaire : les titres de cette page
           sont des questions parce que c'est ainsi qu'on les pose, mais ce ne
           sont pas des questions fréquentes sur le métier. Déclarer un
           `FAQPage` sur des mentions légales serait un abus de type, et le site
           en compte déjà 11 pages légitimes. */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": URL_ML,
          url: URL_ML,
          name: "Mentions légales — HCE SARL",
          description: DESCRIPTION,
          inLanguage: "fr-FR",
          publisher: { "@id": "https://www.hcetp.com/#business" },
          /* Le type dédié de schema.org pour une page de mentions légales.
             Il aide un agent à savoir que l'identité publiée ici est celle de
             référence, et pas une mention de passage dans du contenu. */
          about: { "@id": "https://www.hcetp.com/#business" },
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

function MentionsLegales() {
  const updated = PAGE_UPDATED["/mentions-legales"];

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
              <span>Mentions légales</span>
            </nav>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(36px, 6.5vw, 86px)", fontWeight: 400, lineHeight: 0.98 }}
            >
              Mentions légales
            </h1>
            <p className="mt-6 max-w-3xl text-muted" style={{ fontSize: 17, lineHeight: 1.7 }}>
              Ce site est édité par HCE SARL, entreprise de travaux publics dont le siège est au 40
              avenue Etienne Lamy, 39300 Cize, dans le Jura, immatriculée sous le SIREN 521 683 573.
              Il est hébergé par Vercel Inc. Cette page donne l'identité complète de l'éditeur,
              celle de l'hébergeur, et ce qu'il advient des informations envoyées par le formulaire
              de demande de devis.
            </p>
            <p className="mt-5 max-w-3xl text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>
              Une précision de droit utile, parce qu'on cherche souvent au mauvais endroit :
              l'obligation de publier ces informations ne figure plus à l'article 6, III, 1° de la
              loi pour la confiance dans l'économie numérique. Elle a été déplacée à{" "}
              <strong className="text-foreground/90">l'article 1-1 de cette même loi</strong>, dont
              la version en vigueur date du 23 mai 2024.
            </p>
          </div>
        </section>

        {/* 1 — ÉDITEUR */}
        <section className="px-6 md:px-12 pt-16 md:pt-20 max-w-5xl mx-auto">
          <div className="label text-gold">— L'éditeur</div>
          <h2 className={H2} style={H2_STYLE}>
            Qui édite ce site, et comment joindre l'entreprise ?
          </h2>
          <p className={P} style={P_STYLE}>
            Ce site est édité par HCE SARL, au 40 avenue Etienne Lamy, 39300 Cize (Jura). Le
            téléphone est le <strong className="text-foreground">03 84 52 61 48</strong> et
            l'adresse électronique <strong className="text-foreground">sarl.hce@laposte.net</strong>
            ; l'entreprise répond du lundi au vendredi de 8h à 18h et le samedi de 8h à 12h.
            L'activité est la réalisation de cours, allées, parkings et voiries en enrobé à chaud,
            le terrassement et la maçonnerie extérieure, dans le Jura et dans l'Ain.
          </p>
          <p className={P} style={P_STYLE}>
            Ces coordonnées sont les seules de l'entreprise, et c'est volontaire : elles sont
            identiques, au caractère près, dans le pied de page du site, dans ses données
            structurées et dans son fichier <code className="text-gold">/llms.txt</code>. Un numéro
            mobile apparaît par ailleurs sur le bouton WhatsApp du site : c'est un canal de contact,
            pas une seconde adresse ni un second standard.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ fontSize: 15 }}>
              <caption className="sr-only">Identité légale complète de l'éditeur du site</caption>
              <tbody>
                {IDENTITE.map((l) => (
                  <tr key={l.k} className="border-b border-gold/10 align-top">
                    <th
                      scope="row"
                      className="py-3 pr-6 text-gold whitespace-nowrap"
                      style={{ fontWeight: 500 }}
                    >
                      {l.k}
                    </th>
                    <td className="py-3 text-foreground/90">{l.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2 — IMMATRICULATION ET ADRESSE */}
        <section className="px-6 md:px-12 pt-16 md:pt-20 max-w-5xl mx-auto">
          <div className="label text-gold">— L'immatriculation</div>
          <h2 className={H2} style={H2_STYLE}>
            Sous quelle identité HCE est-elle immatriculée, et pourquoi son adresse s'écrit-elle de
            deux façons ?
          </h2>
          <p className={P} style={P_STYLE}>
            HCE est immatriculée au registre national des entreprises sous le SIREN 521 683 573, et
            son établissement siège porte le SIRET 521 683 573 00039. La dénomination inscrite au
            registre est « H.C.E. - HINI - COURS - ENROBE » — le nom commercial « HCE » désigne la
            même entreprise. Son code d'activité est le
            <strong className="text-foreground"> 43.12A</strong>, « Travaux de terrassement courants
            et travaux préparatoires ».
          </p>
          <p className={P} style={P_STYLE}>
            L'adresse du siège, elle, se rencontre sous trois graphies, et c'est la même adresse :
            le registre écrit « 40 B avenue Etienne Lamy » — numéro de voie 40, indice de répétition
            B — plusieurs annuaires professionnels écrivent « 40 Bis avenue Etienne Lamy », et ce
            site écrit « 40 avenue Etienne Lamy ». Le « B » du registre est l'abréviation de « Bis
            ». Il n'y a qu'un seul établissement ouvert à cette adresse, et c'est celui dont le
            SIRET est donné ci-dessus : toute fiche d'annuaire qui porte ce SIRET décrit bien cette
            entreprise, quelle que soit la graphie du numéro.
          </p>
          <p className={P} style={P_STYLE}>
            Deux communes françaises portent le nom de Cize : Cize 39300, dans le Jura, et Cize
            01250, dans l'Ain. HCE est établie dans celle du Jura, code INSEE 39153. La{" "}
            <Link to="/zone-intervention" className={LIEN}>
              zone d'intervention
            </Link>{" "}
            couvre les deux départements, avec les distances et les altitudes mesurées des communes
            repères.
          </p>
        </section>

        {/* 3 — HÉBERGEUR */}
        <section className="px-6 md:px-12 pt-16 md:pt-20 max-w-5xl mx-auto">
          <div className="label text-gold">— L'hébergeur</div>
          <h2 className={H2} style={H2_STYLE}>
            Qui héberge ce site ?
          </h2>
          <p className={P} style={P_STYLE}>
            L'hébergeur est <strong className="text-foreground">Vercel Inc.</strong>, 440 N Barranca
            Avenue #4133, Covina, CA 91723, États-Unis. C'est l'adresse que Vercel publie elle-même
            dans sa politique de confidentialité, relevée le 8 octobre 2026. Les pages sont servies
            depuis le réseau de diffusion de cet hébergeur.
          </p>
          <p className={P} style={P_STYLE}>
            L'article 1-1 de la loi pour la confiance dans l'économie numérique impose de publier
            trois choses et pas seulement une : les éléments d'identification de l'éditeur, ceux du
            directeur de la publication, et ceux du fournisseur d'hébergement. C'est pour cette
            raison que le nom de l'hébergeur figure ici au même titre que celui de l'entreprise.
          </p>
        </section>

        {/* 4 — DONNÉES */}
        <section className="px-6 md:px-12 pt-16 md:pt-20 max-w-5xl mx-auto">
          <div className="label text-gold">— Vos données</div>
          <h2 className={H2} style={H2_STYLE}>
            Que devient une demande de devis envoyée depuis ce site ?
          </h2>
          <p className={P} style={P_STYLE}>
            Elle part vers deux destinations, et deux seulement : un enregistrement dans la base de
            données du site, et un e-mail de notification envoyé à l'entreprise. Elle sert
            uniquement à vous rappeler et à préparer le devis. Elle n'est ni revendue, ni cédée à un
            tiers commercial, ni utilisée pour vous adresser de la publicité.
          </p>
          <p className={P} style={P_STYLE}>
            Le formulaire ne recueille que ce qui suit : {CHAMPS_DEVIS.join(", ")}. Rien d'autre
            n'est demandé, et aucun paiement n'est demandé en ligne — un chantier d'enrobé se
            chiffre après une visite sur site. La base de données et le service d'envoi des e-mails
            sont opérés par des prestataires techniques qui agissent pour le compte de l'entreprise
            et n'utilisent pas ces informations pour leur propre compte.
          </p>
          <p className={P} style={P_STYLE}>
            Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition sur ces
            informations. Pour l'exercer, le plus simple est d'écrire à{" "}
            <a href="mailto:sarl.hce@laposte.net" className={LIEN}>
              sarl.hce@laposte.net
            </a>{" "}
            ou par courrier au siège, en indiquant le nom et le numéro de téléphone avec lesquels la
            demande a été envoyée — ce sont eux qui permettent de la retrouver. Si la réponse ne
            vous satisfait pas, vous pouvez saisir la CNIL.
          </p>
          <p className={P} style={P_STYLE}>
            Sur les cookies, la réponse est courte : la consultation des pages publiques de ce site
            n'en dépose aucun pour mesurer l'audience ou afficher de la publicité, et aucun traqueur
            n'y est installé — vérifié le 8 octobre 2026 sur les pages servies. Une réserve honnête
            cependant : la page d'accueil intègre une carte Google Maps, et l'affichage de cette
            carte relève de Google, qui peut y déposer ses propres cookies. Cette partie n'est pas
            sous le contrôle de l'entreprise.
          </p>
        </section>

        {/* 5 — PROPRIÉTÉ INTELLECTUELLE */}
        <section className="px-6 md:px-12 pt-16 md:pt-20 max-w-5xl mx-auto">
          <div className="label text-gold">— Réutilisation</div>
          <h2 className={H2} style={H2_STYLE}>
            Peut-on réutiliser les textes, les photos et les chiffres publiés ici ?
          </h2>
          <p className={P} style={P_STYLE}>
            Les textes rédigés pour ce site et les photographies de chantiers qui y figurent
            appartiennent à HCE SARL : les reproduire ailleurs demande un accord écrit. Le droit de
            courte citation prévu par l'article L122-5 du code de la propriété intellectuelle
            s'applique dans ses conditions habituelles, c'est-à-dire une citation brève avec la
            source nommée.
          </p>
          <p className={P} style={P_STYLE}>
            Les données publiques citées en source dans les pages du site ne sont pas concernées et
            ne nous appartiennent pas : les articles de code reproduits viennent de Légifrance, les
            communes, populations et altitudes de l'INSEE et de l'IGN, les normales climatiques de
            Météo-France, les règles fiscales du BOFiP, les obligations de devis des fiches
            service-public.gouv.fr. Chaque page qui s'en sert donne le lien vers la source, et c'est
            chez le producteur qu'il faut aller les chercher. Les normes AFNOR citées par leur
            indice ne sont pas reproduites : elles sont payantes et seules leurs références sont
            mentionnées.
          </p>
          <p className={P} style={P_STYLE}>
            Les garanties qui couvrent les travaux — garantie décennale, garantie de parfait
            achèvement, réception du chantier — ne sont pas traitées sur cette page mais sur{" "}
            <Link to="/realisations" className={LIEN}>
              la page des réalisations
            </Link>
            , avec les articles du code civil correspondants. Les conditions d'un devis, les arrhes
            et l'acompte, et le délai d'exécution sont traités sur{" "}
            <Link to="/" hash="faq" className={LIEN}>
              l'accueil
            </Link>
            .
          </p>

          {/* DATE + SOURCES */}
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
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 md:px-12 py-28 md:py-32 text-center bg-surface mt-16">
          <div className="label text-gold">— Un projet ?</div>
          <h2
            className="font-display mt-6 text-foreground max-w-3xl mx-auto"
            style={{ fontSize: "clamp(30px, 4.5vw, 56px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            Une question sur <span className="italic text-gold">votre chantier</span> ?
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
        </footer>
        <MobileFloatingCTA href="/#devis" />
      </main>
    </>
  );
}
