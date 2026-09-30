import { createFileRoute, Link } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { PAGE_UPDATED } from "@/lib/lastmod";

/**
 * PAGE `/zone-intervention` — créée le 30/09/2026.
 *
 * Pourquoi cette page existe. Les six requêtes commerciales suivies depuis le
 * 07/09/2026 nomment toutes un département (« enrobé à chaud Jura », « enrobé à
 * chaud Ain », « entreprise travaux publics Jura »…), et le `LocalBusiness` de
 * l'accueil déclare bien `areaServed: [Jura, Ain]` — mais **aucune page du site
 * ne traitait la géographie elle-même**. Le hub `/realisations` la mentionne en
 * une phrase ; c'est tout.
 *
 * Ce qu'elle apporte et qu'aucun concurrent ne publie : les distances et les
 * altitudes **mesurées** des six communes repères de la zone, et la conséquence
 * chiffrée de l'altitude sur le calendrier d'un chantier, établie en comparant
 * deux stations Météo-France distantes de 29 km et séparées de 239 m de
 * dénivelé. C'est le seul angle géographique honnête trouvé : il repose sur de
 * la donnée publique vérifiable, pas sur des pages de villes interchangeables.
 *
 * ⚠️ Précaution assumée : **les six communes sont présentées comme des repères,
 * jamais comme une liste fermée**, et aucune commune que l'entreprise n'a pas
 * elle-même déclarée n'est ajoutée. Les six sont exactement celles de
 * `src/components/InteractiveMap.tsx`. Aucun prix, aucun délai, aucun frais de
 * déplacement n'est annoncé : rien de tout cela n'est connu.
 *
 * Contrainte de rendu (apprise les 14 et 15/09/2026) : **tout est statique**.
 * Aucun `useEffect`, aucun appel Supabase, aucun état de chargement — un
 * contenu monté après le premier rendu n'existe pas pour un robot.
 */

const URL_ZONE = "https://www.hcetp.com/zone-intervention";

const TITRE = "Zone d'intervention HCE — Jura et Ain, depuis Cize (39300)";
const DESCRIPTION =
  "Jusqu'où HCE se déplace depuis Cize : distances et altitudes mesurées de Champagnole, Lons-le-Saunier, Saint-Claude, Oyonnax et Bourg-en-Bresse, et ce que l'altitude change au calendrier d'un chantier d'enrobé. Devis détaillé après visite.";

/**
 * Les six communes repères de la zone, dans l'ordre de distance croissante.
 *
 * PROVENANCE DE CHAQUE COLONNE — relevé le 30/09/2026, aucune valeur saisie à
 * la main depuis une autre source :
 * - `insee`, `hab`, et le point central qui sert aux distances : API Découpage
 *   administratif de l'État (`geo.api.gouv.fr/communes`, données INSEE/IGN).
 * - `altM` : référentiel altimétrique RGE ALTI de l'IGN, interrogé au point
 *   central de la commune (`data.geopf.fr/altimetrie`). C'est l'altitude de CE
 *   point, pas celle de la mairie ni du clocher — d'où des écarts avec
 *   l'altitude usuellement citée pour une ville étalée. Dit explicitement dans
 *   le texte visible, pour ne pas laisser croire à une précision qu'on n'a pas.
 * - `kmCize` : distance orthodromique (« à vol d'oiseau ») entre le point
 *   central de Cize et celui de la commune. Ce n'est PAS une distance routière,
 *   et le texte visible le dit.
 */
const COMMUNES = [
  { nom: "Cize", dep: "Jura (39)", insee: "39153", altM: 549, kmCize: null, hab: 797, siege: true },
  { nom: "Champagnole", dep: "Jura (39)", insee: "39097", altM: 500, kmCize: 3.2, hab: 8036 },
  { nom: "Lons-le-Saunier", dep: "Jura (39)", insee: "39300", altM: 263, kmCize: 28.2, hab: 16618 },
  { nom: "Saint-Claude", dep: "Jura (39)", insee: "39478", altM: 668, kmCize: 34.7, hab: 8386 },
  { nom: "Oyonnax", dep: "Ain (01)", insee: "01283", altM: 538, kmCize: 55.3, hab: 22480 },
  { nom: "Bourg-en-Bresse", dep: "Ain (01)", insee: "01053", altM: 227, kmCize: 77.4, hab: 42372 },
] as const;

/**
 * Bloc « ce qu'il faut savoir ». Questions posées telles qu'on les pose à voix
 * haute, réponse autonome et citable en tête de chaque réponse. Ce tableau est
 * la source unique de la section visible ET du JSON-LD `FAQPage` : les deux ne
 * peuvent pas diverger.
 *
 * CONTRÔLE DE DOUBLON fait avant rédaction, sur les 57 Q/R déjà publiées (11
 * accueil, 30 services, 16 réalisations). Les recoupements connus et assumés :
 * - `/services/bordures-murets` publie déjà les normales annuelles de
 *   Champagnole (111,7 jours de gel, 35,2 à -5 °C, 9,4 °C, 1 573,2 mm) et ses
 *   trois mois d'hiver (21,8 / 20,9 / 20,4). Ici ces valeurs ne sont PAS le
 *   sujet : elles servent de terme de comparaison à la station de
 *   Lons-le-Saunier, entièrement nouvelle sur le site.
 * - `/realisations/preparation-terrassement` publie le détail mensuel des
 *   PRÉCIPITATIONS de Champagnole. Il n'est donc pas repris ici du tout.
 * - Le hub `/realisations` répond déjà « Où HCE réalise-t-elle ces chantiers ? »
 *   et y traite l'homonymie Cize (39) / Cize (01). **Cet angle est volontairement
 *   laissé au hub et non repris ici.**
 */
const SAVOIR = {
  heading: "Ce qu'on nous demande sur la zone d'intervention",
  lead: "Une zone d'intervention se résume d'habitude à une liste de villes, ce qui ne renseigne sur rien. Voici les chiffres réels, mesurés sur les référentiels publics de l'État : à quelle distance et à quelle altitude se trouvent les six communes repères de la zone, pourquoi l'altitude pèse plus lourd que le kilométrage sur un chantier d'enrobé, quels mois sont effectivement compromis et à quel endroit, et ce qu'il faut faire si votre commune n'est pas dans la liste.",
  updated: PAGE_UPDATED["/zone-intervention"],
  qa: [
    {
      q: "Jusqu'où HCE se déplace-t-elle depuis Cize ?",
      a: "Dans le Jura (39) et dans l'Ain (01), et la plus éloignée des six communes repères de cette zone est Bourg-en-Bresse, à 77,4 kilomètres à vol d'oiseau du centre de Cize. Les quatre autres sont nettement plus proches : Champagnole à 3,2 km, Lons-le-Saunier à 28,2 km, Saint-Claude à 34,7 km et Oyonnax à 55,3 km. Ce que ces chiffres disent, et qu'une simple liste de villes ne dit pas : l'essentiel de la zone tient dans un rayon d'environ 35 kilomètres autour du siège, et les deux villes de l'Ain sont les seules à le dépasser franchement. Le siège est à Cize, commune de 797 habitants du Jura, code INSEE 39153 — à ne pas confondre avec la commune homonyme de l'Ain. Deux précisions de méthode, parce qu'elles changent la lecture : ces distances sont calculées entre les points centraux des communes publiés par l'API Découpage administratif de l'État, relevés le 30 septembre 2026, et ce sont des distances à vol d'oiseau, pas des distances routières — en moyenne montagne, le trajet réel est toujours plus long que la ligne droite.",
    },
    {
      q: "Pourquoi l'altitude d'un chantier compte plus que sa distance ?",
      a: "Parce que la distance coûte du temps de trajet, alors que l'altitude retire des semaines au calendrier. Sur les six communes repères, l'écart d'altitude atteint 441 mètres : 227 m à Bourg-en-Bresse, 263 m à Lons-le-Saunier, 500 m à Champagnole, 538 m à Oyonnax, 549 m à Cize et 668 m à Saint-Claude — relevés le 30 septembre 2026 sur le référentiel altimétrique RGE ALTI de l'IGN, au point central de chaque commune. Deux stations Météo-France encadrent cet intervalle et permettent de chiffrer exactement ce que le dénivelé change, à 29 kilomètres de distance seulement. À Lons-le-Saunier (indicatif 39362001, altitude 298 m), les normales 1991-2020 donnent 51,9 jours de gel par an — c'est-à-dire de jours où la température minimale descend à 0 °C ou en dessous — pour une température moyenne annuelle de 11,8 °C et 1 147,4 mm de précipitations. À Champagnole (indicatif 39097003, altitude 537 m), la station la plus proche de Cize à moins de 5 km, les mêmes normales donnent 111,7 jours de gel, 9,4 °C de moyenne et 1 573,2 mm de précipitations. Autrement dit : 239 mètres de plus, c'est 2,15 fois plus de jours de gel et 426 millimètres d'eau en plus, la même année et dans le même département. Et comme l'amplitude réelle de la zone (441 m) vaut presque le double de celle qui sépare ces deux stations, un chantier à Saint-Claude et un chantier à Bourg-en-Bresse ne se planifient pas de la même façon, même à distance comparable du siège. Fiches climatologiques Météo-France éditées le 6 juin 2026.",
    },
    {
      q: "Quels mois de l'année sont réellement compromis, et à quel endroit ?",
      a: "Décembre, janvier et février partout ; mars et novembre en altitude seulement — et c'est mars qui fait la bascule. Le détail mensuel des normales 1991-2020 le montre sans ambiguïté. À la station de Champagnole (537 m), le gel touche 21,8 jours en janvier, 20,9 en février et 20,4 en décembre, puis encore 17,9 jours en mars et 9,0 jours en avril, et il n'est pas tout à fait nul en mai (1,4 jour) : la saison franchement hivernale y dure cinq mois pleins. À la station de Lons-le-Saunier (298 m), les mêmes mois comptent 14,0, 11,3 et 13,1 jours de gel, et mars n'en compte plus que 5,6. Le mois qui reste hivernal à 537 mètres est donc déjà praticable 240 mètres plus bas — c'est là que se joue l'écart, pas au cœur de l'hiver où les deux sont bloqués. Deux chiffres empêchent toutefois de conclure que « plaine » veut dire « sans contrainte » : Lons-le-Saunier relève tout de même 10,3 jours par an où la température ne repasse pas au-dessus de 0 °C de toute la journée, et 1,5 jour par an à -10 °C ou moins. À Champagnole, ce dernier chiffre monte à 10,0 jours, et 35,2 jours par an descendent à -5 °C ou moins. La conséquence pratique est la même des deux côtés mais elle ne tombe pas au même moment : un projet décidé à l'automne se planifie souvent pour le printemps suivant, et ce décalage est plus long en altitude qu'en plaine. Ce n'est pas un délai commercial, c'est le climat local. La période se cale avec vous au moment du devis, qui est établi après une visite sur site.",
    },
    {
      q: "HCE intervient-elle dans ma commune si elle n'est pas dans cette liste ?",
      a: "Très probablement si elle se trouve dans le Jura ou dans l'Ain : les six communes citées ici sont des repères destinés à donner l'étendue réelle de la zone, pas une liste fermée. La zone déclarée par l'entreprise est départementale — le Jura (39) et l'Ain (01) — et les six villes servent à la mesurer, pas à la restreindre. La bonne façon de vérifier reste de le demander : la réponse dépend de la commune, mais aussi de la nature et de la taille du chantier, et elle se donne en un appel. Ce qui ne se donne pas par téléphone, en revanche, c'est un prix. Un chantier d'enrobé se chiffre après une visite sur site, parce que la surface, l'accès des engins, l'état du support et l'évacuation de l'eau ne s'évaluent pas autrement — et ce sont eux qui font le devis, pas le nom de la commune. HCE est enregistrée sous le SIREN 521683573, au 40 avenue Etienne Lamy, 39300 Cize, code d'activité NAF 43.12A (travaux de terrassement courants et travaux préparatoires).",
    },
  ],
  sources: [
    {
      label:
        "API Découpage administratif (geo.api.gouv.fr, données INSEE/IGN) — communes, codes INSEE, population et points centraux, relevés le 30 septembre 2026",
      url: "https://geo.api.gouv.fr/",
    },
    {
      label:
        "IGN — RGE ALTI, référentiel altimétrique à grande échelle (altitudes relevées au point central de chaque commune le 30 septembre 2026)",
      url: "https://cartes.gouv.fr/rechercher-une-donnee/dataset/IGNF_RGE-ALTI",
    },
    {
      label:
        "Météo-France — fiche climatologique de CHAMPAGNOLE (39), indicatif 39097003, altitude 537 m, normales 1991-2020, éditée le 6 juin 2026",
      url: "https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/REF_STATION/FICHECLIM_39097003.pdf",
    },
    {
      label:
        "Météo-France — fiche climatologique de LONS LE SAUNIER (39), indicatif 39362001, altitude 298 m, normales 1991-2020, éditée le 6 juin 2026",
      url: "https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/REF_STATION/FICHECLIM_39362001.pdf",
    },
  ],
};

export const Route = createFileRoute("/zone-intervention")({
  component: ZoneIntervention,
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL_ZONE },
    ],
    links: [{ rel: "canonical", href: URL_ZONE }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.hcetp.com/" },
            { "@type": "ListItem", position: 2, name: "Zone d'intervention", item: URL_ZONE },
          ],
        }),
      },
      {
        /* WebPage. `publisher` pointe vers `#business`, le SEUL `@id` publié par
           ce site (Organization à la racine, LocalBusiness sur l'accueil) — ne
           jamais inventer de nœud, un pointeur mort ne vaut rien. Aucun
           `areaServed` n'est redéclaré ici : l'accueil le fait déjà
           (AdministrativeArea Jura + Ain) et deux déclarations concurrentes
           valent moins qu'une. */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": URL_ZONE,
          url: URL_ZONE,
          name: "Zone d'intervention HCE — Jura et Ain",
          description: DESCRIPTION,
          inLanguage: "fr-FR",
          publisher: { "@id": "https://www.hcetp.com/#business" },
        }),
      },
      {
        /* FAQPage construit depuis le même tableau que la section visible :
           toute question ajoutée l'est des deux côtés à la fois.
           `scripts/verif-faq.mjs` échoue en code 1 si l'un dérive de l'autre. */
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

function ZoneIntervention() {
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
              <span>Zone d'intervention</span>
            </nav>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
            >
              Le Jura et l'Ain, depuis Cize
            </h1>
            <p className="mt-6 max-w-3xl text-muted" style={{ fontSize: 17, lineHeight: 1.7 }}>
              HCE intervient dans le Jura (39) et dans l'Ain (01), depuis son siège de Cize (39300).
              Les six communes repères de cette zone s'échelonnent de Champagnole, à 3 kilomètres, à
              Bourg-en-Bresse, à 77 kilomètres à vol d'oiseau. Mais sur un chantier d'enrobé à
              chaud, ce n'est pas le kilométrage qui décide du calendrier : c'est l'altitude, qui
              varie de 227 à 668 mètres d'un bout à l'autre de la zone. Cette page donne les
              distances et les altitudes mesurées, commune par commune, puis ce qu'elles changent
              concrètement sur la période des travaux.
            </p>
          </div>
        </section>

        {/* LA TABLE MESURÉE — réponse directe avant le tableau, comme partout
            ailleurs sur le site. Un tableau se cite bien, à condition que la
            phrase qui le précède se suffise à elle-même. */}
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-5xl mx-auto">
          <div className="label text-gold">— Les distances réelles</div>
          <h2
            className="font-display mt-6 text-foreground"
            style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400, lineHeight: 1.05 }}
          >
            À quelle distance et à quelle altitude, commune par commune ?
          </h2>
          <p
            className="mt-6 max-w-3xl text-foreground/90"
            style={{ fontSize: 17, lineHeight: 1.75 }}
          >
            Les six communes repères de la zone se répartissent sur 77 kilomètres et sur 441 mètres
            de dénivelé. Les distances ci-dessous sont mesurées à vol d'oiseau entre les points
            centraux des communes — un trajet routier en moyenne montagne est toujours plus long —
            et les altitudes sont relevées sur le référentiel RGE ALTI de l'IGN à ce même point
            central, pas à la mairie ni au clocher : sur une ville étalée, l'écart avec l'altitude
            habituellement citée peut atteindre quelques dizaines de mètres.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ fontSize: 15 }}>
              <caption className="sr-only">
                Distances depuis Cize et altitudes des six communes repères de la zone
                d'intervention HCE
              </caption>
              <thead>
                <tr className="border-b border-gold/30">
                  <th scope="col" className="py-3 pr-4 text-gold" style={{ fontWeight: 500 }}>
                    Commune
                  </th>
                  <th scope="col" className="py-3 pr-4 text-gold" style={{ fontWeight: 500 }}>
                    Département
                  </th>
                  <th scope="col" className="py-3 pr-4 text-gold" style={{ fontWeight: 500 }}>
                    Altitude (IGN)
                  </th>
                  <th scope="col" className="py-3 pr-4 text-gold" style={{ fontWeight: 500 }}>
                    Distance de Cize
                  </th>
                  <th scope="col" className="py-3 text-gold" style={{ fontWeight: 500 }}>
                    Habitants (INSEE)
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMUNES.map((c) => (
                  <tr key={c.insee} className="border-b border-gold/10">
                    <th
                      scope="row"
                      className="py-3 pr-4 text-foreground"
                      style={{ fontWeight: 400 }}
                    >
                      {c.nom}
                      {"siege" in c && c.siege ? (
                        <span className="text-muted"> — siège</span>
                      ) : null}
                    </th>
                    <td className="py-3 pr-4 text-foreground/90">{c.dep}</td>
                    <td className="py-3 pr-4 text-foreground/90">{c.altM} m</td>
                    <td className="py-3 pr-4 text-foreground/90">
                      {c.kmCize === null ? "—" : `${String(c.kmCize).replace(".", ",")} km`}
                    </td>
                    <td className="py-3 text-foreground/90">
                      {String(c.hab).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-3xl text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>
            Ces six communes sont des repères, pas une liste fermée : la zone déclarée par
            l'entreprise est départementale. Les prestations elles-mêmes sont détaillées sur les
            pages{" "}
            <Link
              to="/services/$slug"
              params={{ slug: "enrobe-a-chaud" }}
              className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
            >
              Enrobé à chaud
            </Link>
            ,{" "}
            <Link
              to="/services/$slug"
              params={{ slug: "preparation-terrain" }}
              className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
            >
              Préparation de terrain
            </Link>{" "}
            et{" "}
            <Link
              to="/services/$slug"
              params={{ slug: "drainage-pentes" }}
              className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
            >
              Drainage &amp; pentes
            </Link>
            , et les chantiers réalisés dans cette zone sont regroupés dans les{" "}
            <Link
              to="/realisations"
              className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
            >
              réalisations
            </Link>
            .
          </p>
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
              Dernière mise à jour :{" "}
              <time dateTime={SAVOIR.updated.iso}>{SAVOIR.updated.label}</time>
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
            Votre chantier est <span className="italic text-gold">dans cette zone</span> ?
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
