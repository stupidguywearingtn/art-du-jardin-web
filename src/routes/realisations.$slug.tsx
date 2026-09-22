import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { EditModeProvider, useEditMode } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { useAuth } from "@/hooks/useAuth";
import { useGalleryByCategorySlug, fallbackCategoryBySlug } from "@/hooks/useGallery";
import { REAL_CAT_SLUGS, RELATED_SERVICES, titleCaseSlug } from "@/lib/realisations";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2, ImagePlus } from "lucide-react";
import { optimizeImageUrl } from "@/lib/optimizeImage";
import { cropCover } from "@/lib/cropImage";

/** Nombre d'emplacements toujours proposés à l'admin par dossier (extensible). */
const MIN_SLOTS = 5;

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

/**
 * Titres et descriptions par catégorie de réalisation, rendus côté serveur.
 * Le composant charge la catégorie de façon asynchrone (Supabase / fallback),
 * donc `head()` n'a que le slug : ce tableau reprend à l'identique les titres
 * et descriptions des catégories (voir FALLBACK_CATS dans `useGallery.tsx`)
 * pour que le <title> et la meta description soient uniques, accentués et
 * géolocalisés au lieu du slug brut. Aucun chiffre inventé : ces pages sont des
 * galeries photo, les descriptions décrivent ce qu'on y voit.
 */
const REAL_META: Record<string, { title: string; description: string }> = {
  "cour-allee-privee": {
    title: "Cour et allée privée en enrobé — Jura et Ain — HCE",
    description:
      "Photos de cours et allées privées réalisées en enrobé à chaud par HCE dans le Jura et l'Ain : finitions soignées, bords nets. Devis détaillé, visite gratuite.",
  },
  "parking-voirie-pro": {
    title: "Parkings et voiries en enrobé pour pros — Jura — HCE",
    description:
      "Réalisations HCE de parkings d'entreprise, voiries de copropriété et grandes plateformes en enrobé à chaud dans le Jura et l'Ain. Demandez un devis détaillé.",
  },
  "preparation-terrassement": {
    title: "Préparation de terrain et terrassement dans le Jura — HCE",
    description:
      "Chantiers HCE de préparation de terrain et de terrassement dans le Jura : décaissement, nivellement, drainage et plateformes avant pose d'enrobé. Devis détaillé.",
  },
  "chantier-en-cours": {
    title: "Chantiers d'enrobé en cours — HCE, Cize (Jura)",
    description:
      "HCE à l'œuvre dans le Jura et l'Ain : photos de chantiers d'enrobé en cours — pose à la main à 150 °C, compactage, équipe en action.",
  },
};

/**
 * Bloc « ce qu'il faut savoir » par dossier de réalisations, sur le patron des
 * pages service : question posée telle qu'on la pose à voix haute, réponse
 * autonome de 2-3 phrases en tête, chiffres et sources primaires ensuite.
 *
 * Pourquoi ici : au 22/09/2026 les quatre `/realisations/$slug` ne servaient
 * que 373 à 401 caractères de texte — un titre, une description d'une ligne et
 * du maillage. Ce sont les pages les plus maigres du site depuis que les six
 * services ont été traités, et `parking-voirie-pro` est la seule URL qui vise
 * la requête « réfection parking enrobé Jura ».
 *
 * Le même tableau alimente la section visible ET le JSON-LD FAQPage de la
 * page : aucun mismatch possible. Les trois autres dossiers n'ont pas encore
 * d'entrée — la section et le FAQPage ne sont alors tout simplement pas émis.
 */
const REAL_SAVOIR: Record<
  string,
  {
    heading: string;
    lead: string;
    updated: string;
    updatedLabel: string;
    qa: { q: string; a: string }[];
    sources: { label: string; url: string }[];
  }
> = {
  "parking-voirie-pro": {
    heading: "Refaire un parking professionnel : ce qui se décide avant la première tonne d'enrobé",
    lead: "Un parking d'entreprise ne se traite pas comme une cour de maison : ce sont le trafic poids lourds, l'accessibilité des places et, depuis 2023, l'ombrage qui commandent le projet — pas la surface à couvrir. Voici cinq questions qui se posent avant un chantier de réfection, avec les textes qui s'appliquent.",
    updated: "2026-09-22",
    updatedLabel: "22 septembre 2026",
    qa: [
      {
        q: "Faut-il refaire tout un parking, ou seulement la couche de surface ?",
        a: "Cela dépend de ce qui est abîmé, et la différence se voit à l'œil. Si le revêtement est fissuré, désenrobé ou terni mais que la surface reste plane, c'est la couche de roulement qui est en fin de vie et elle peut se renouveler seule. Si l'on voit des affaissements, des ornières profondes, des faïençages en mailles serrées ou des nids-de-poule qui reviennent toujours au même endroit, c'est le corps de chaussée qui travaille en dessous : un tapis neuf posé par-dessus reproduira le même défaut en une à deux saisons. Ce second cas relève d'un calcul de structure, pas d'un choix d'épaisseur au jugé : la norme française NF P98-086, homologuée le 17 mai 2019 et toujours en vigueur (réexamen systématique prévu au 17 mai 2029), « détaille la démarche de vérification des épaisseurs des couches » et couvre six familles de structures de chaussée — souple, bitumineuse, semi-rigide, mixte, inverse et en béton. Seule une visite sur place permet de trancher entre les deux : c'est l'objet du devis détaillé établi après visite.",
      },
      {
        q: "Quelle épaisseur d'enrobé faut-il pour un parking qui reçoit des camions ?",
        a: "Il n'existe pas d'épaisseur standard : elle se déduit du trafic poids lourds attendu, de la portance du sol en place et de la durée de service visée : c'est exactement l'objet de la norme NF P98-086, dont le domaine d'application vise les chaussées neuves « ouvertes au trafic poids lourds ». Conséquence concrète pour un maître d'ouvrage : à surface égale, un parking de bureaux où ne circulent que des véhicules légers et une aire où manœuvrent des semi-remorques ne se dimensionnent pas de la même façon — c'est le nombre et le poids des poids lourds qui commande, pas le nombre de mètres carrés. À noter que cette norme exclut de son domaine les matériaux à l'émulsion et les matériaux modulaires : les pavés et les dalles d'une zone piétonne adjacente relèvent d'autres règles.",
      },
      {
        q: "Pourquoi un parking s'ornière-t-il là où les véhicules manœuvrent et stationnent ?",
        a: "Parce qu'à ces endroits la charge est lente, répétée et parfois complètement immobile, et que le bitume est un liant visqueux : plus la charge dure longtemps et plus il fait chaud, plus le matériau flue. Les ornières apparaissent donc en priorité dans les allées de manœuvre, devant les quais et sur les emplacements où stationnent les véhicules lourds — rarement au milieu des zones parcourues vite. Cette sensibilité se mesure en laboratoire avant même la pose : l'essai d'orniérage normalisé NF EN 12697-22+A1 (décembre 2023, en vigueur) fait passer une charge roulante à température constante sur une éprouvette et mesure la profondeur d'ornière obtenue. Il s'applique aux mélanges bitumineux dont la plus grande dimension granulaire est inférieure ou égale à 32 mm, et il peut être conduit aussi bien sur des éprouvettes fabriquées en laboratoire que sur des éprouvettes prélevées dans une chaussée existante — c'est donc aussi un outil d'expertise pour un parking déjà posé qui se déforme.",
      },
      {
        q: "Combien de places accessibles faut-il prévoir sur un parking, et de quelle taille ?",
        a: "Les places adaptées destinées à l'usage du public représentent au minimum 2 % du nombre total de places prévues pour le public, avec une largeur minimale de 3,30 m et une longueur minimale de 5 m. La place doit former un espace horizontal au dévers près, inférieur ou égal à 2 %, et se raccorder sans ressaut de plus de 2 cm au cheminement d'accès à l'entrée du bâtiment ou à l'ascenseur, ce cheminement restant horizontal au dévers près sur au moins 1,40 m depuis la place. Ces valeurs sont celles de l'article 3 de l'arrêté du 20 avril 2017, qui vise les établissements recevant du public lors de leur construction et les installations ouvertes au public lors de leur aménagement. Elles ont une conséquence directe sur le calepinage : une place adaptée est sensiblement plus large qu'une place courante, et son dévers maximal de 2 % doit se concilier avec la pente d'évacuation de l'eau — la pente minimale de 1,5 % qu'HCE applique vers les exutoires reste sous ce plafond, mais les deux contraintes se vérifient au plan, avant le terrassement, pas au moment de la pose.",
      },
      {
        q: "Faut-il ombrager un parking que l'on refait ?",
        a: "Oui, au-delà d'un seuil de surface, et c'est devenu l'un des premiers points à trancher. Les parcs de stationnement extérieurs de plus de 500 m² faisant l'objet d'une construction ou d'une rénovation lourde doivent comporter des dispositifs d'ombrage — arbres à canopée large ou ombrières — sur au moins 50 % de leur surface, au titre de l'article L111-19-1 du code de l'urbanisme ; pour la solution arborée, le ratio retenu est d'un arbre pour trois emplacements de stationnement. Les parcs déjà existants de plus de 1 500 m² sont concernés à partir de juillet 2026, échéance désormais passée. Des exemptions sont prévues, notamment en cas d'impossibilité technique, de contraintes de sécurité ou de contraintes patrimoniales. Ce volet ne relève pas de la pose d'enrobé elle-même, mais il change l'emprise, le calepinage et parfois les fondations du parking : il vaut mieux l'avoir tranché avant le décaissement qu'après la pose.",
      },
    ],
    sources: [
      {
        label: "NF P98-086 — dimensionnement structurel des chaussées neuves (AFNOR Norm'Info)",
        url: "https://norminfo.afnor.org/norme/nf-p98-086/dimensionnement-structurel-des-chaussees-routieres-application-aux-chaussees-neuves/121315",
      },
      {
        label: "NF EN 12697-22+A1 — essai d'orniérage des mélanges bitumineux (AFNOR)",
        url: "https://www.boutique.afnor.org/en-gb/standard/nf-en-1269722-a1/bituminous-mixtures-test-methods-part-22-wheel-tracking/fa208593/366516",
      },
      {
        label: "Arrêté du 20 avril 2017, article 3 — places de stationnement adaptées (Légifrance)",
        url: "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000034485468",
      },
      {
        label:
          "Ombrage des parcs de stationnement extérieurs (entreprendre.service-public.gouv.fr)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F38106",
      },
    ],
  },
};

/**
 * Les autres dossiers de réalisations, pour le bloc « Voir aussi », et les
 * services correspondants, viennent tous deux de `@/lib/realisations` :
 * le hub `/realisations` (créé le 20/09/2026) lit exactement les mêmes
 * tableaux. Les libellés, eux, sont résolus par `fallbackCategoryBySlug`,
 * la même source que le `<h1>` de la page cible — les recopier ici les
 * ferait diverger au premier renommage.
 */

/**
 * En-tête fixe de la page. Extrait pour être rendu à l'identique dans les
 * trois états (chargement, catégorie introuvable, page complète) : le HTML
 * servi doit contenir les mêmes liens que la page vue par le visiteur.
 */
function CategoryHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
      <div className="px-6 md:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>
          HCE
        </Link>
        <Link
          to="/"
          hash="galerie"
          className="label text-gold hover:text-foreground transition-colors"
        >
          ← Retour
        </Link>
      </div>
    </header>
  );
}

/**
 * Bloc « Voir aussi » : les autres dossiers et les services correspondants.
 * Rendu dans l'état de chargement **et** dans la page complète — servir aux
 * robots des liens que le visiteur ne verrait pas serait du cloaking.
 */
function SeeAlso({ slug }: { slug: string }) {
  const others = REAL_CAT_SLUGS.filter((s) => s !== slug).map((s) => ({
    slug: s,
    label: fallbackCategoryBySlug(s)?.title ?? titleCaseSlug(s),
  }));
  const services = RELATED_SERVICES[slug] ?? [
    { slug: "enrobe-a-chaud", label: "Enrobé à chaud" },
    { slug: "preparation-terrain", label: "Préparation de terrain" },
  ];
  return (
    <section className="relative w-full bg-background px-6 md:px-12 py-12 md:py-16 border-t border-gold/15">
      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="label text-gold">— Autres réalisations</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                to="/realisations"
                className="text-muted hover:text-gold transition-colors"
                style={{ fontFamily: "var(--font-body)", fontSize: 15 }}
              >
                Tous les dossiers de réalisations
              </Link>
            </li>
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/realisations/$slug"
                  params={{ slug: c.slug }}
                  className="text-muted hover:text-gold transition-colors"
                  style={{ fontFamily: "var(--font-body)", fontSize: 15 }}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="label text-gold">— Les prestations mises en œuvre</h2>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="text-muted hover:text-gold transition-colors"
                  style={{ fontFamily: "var(--font-body)", fontSize: 15 }}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Section « Ce qu'il faut savoir » du dossier, si le slug en a une.
 * Rendue dans l'état de chargement **et** dans la page complète, exactement
 * comme `SeeAlso` : c'est ce texte que reprend le JSON-LD FAQPage émis par
 * `head()`, et servir aux robots un contenu que le visiteur ne verrait pas
 * serait du cloaking. Contenu toujours monté, jamais replié.
 */
function CategorySavoir({ slug }: { slug: string }) {
  const savoir = REAL_SAVOIR[slug];
  if (!savoir) return null;
  return (
    <section className="relative w-full bg-background px-6 md:px-12 py-16 md:py-24 border-t border-gold/15">
      <div className="max-w-4xl mx-auto">
        <div className="label text-gold">— Ce qu'il faut savoir</div>
        <h2
          className="font-display mt-6 text-foreground"
          style={{ fontSize: "clamp(28px, 4.4vw, 48px)", fontWeight: 400, lineHeight: 1.1 }}
        >
          {savoir.heading}
        </h2>
        <p className="mt-6 text-muted max-w-3xl" style={{ fontSize: 17, lineHeight: 1.7 }}>
          {savoir.lead}
        </p>

        <div className="mt-14 space-y-12">
          {savoir.qa.map((f) => (
            <article key={f.q}>
              <h3
                className="font-display text-gold"
                style={{ fontSize: "clamp(21px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.25 }}
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
            Dernière mise à jour : <time dateTime={savoir.updated}>{savoir.updatedLabel}</time>
          </p>
          <p className="mt-2">
            Sources :{" "}
            {savoir.sources.map((s, i) => (
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
      </div>
    </section>
  );
}

export const Route = createFileRoute("/realisations/$slug")({
  component: RealisationsRoute,
  head: ({ params }) => {
    const cat = fallbackCategoryBySlug(params.slug);
    const meta = REAL_META[params.slug] ?? {
      title: `${titleCaseSlug(params.slug)} — Réalisations HCE`,
      description:
        "Découvrez les réalisations HCE en enrobé à chaud, cours, parkings et terrassement dans le Jura et l'Ain. Devis détaillé, visite gratuite.",
    };
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        { property: "og:url", content: `https://www.hcebtp.com/realisations/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://www.hcebtp.com/realisations/${params.slug}` }],
      /* Fil d'ariane à trois niveaux depuis le 20/09/2026 : le hub
         `/realisations` existe désormais comme route réelle (il répondait 404
         jusque-là, d'où les deux niveaux précédents). Émis pour les seules
         catégories connues : baliser un slug quelconque reviendrait à décrire
         une page qui finira sur l'écran « Catégorie introuvable ». */
      scripts: [
        ...(cat
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Accueil",
                      item: "https://www.hcebtp.com/",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Réalisations",
                      item: "https://www.hcebtp.com/realisations",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: cat.title,
                      item: `https://www.hcebtp.com/realisations/${params.slug}`,
                    },
                  ],
                }),
              },
            ]
          : []),
        /* FAQPage construit depuis le MÊME tableau que la section visible
           (`REAL_SAVOIR`), rendue par `CategorySavoir` dans les deux états
           servis : le JSON-LD ne peut donc pas décrire une FAQ absente de la
           page. Non émis pour un dossier qui n'a pas encore de bloc. */
        ...(REAL_SAVOIR[params.slug]
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: REAL_SAVOIR[params.slug].qa.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
});

function RealisationsRoute() {
  // EditModeProvider doit envelopper la page pour que la toolbar admin
  // persiste sur les routes dynamiques (sinon le client perd l'accès à l'admin
  // dès qu'il navigue sur /realisations/{slug}).
  const { reload } = useSiteContentFields(HOME_SITE_ID);
  return (
    <EditModeProvider siteId={HOME_SITE_ID} onPublished={reload}>
      <RealisationsPage />
    </EditModeProvider>
  );
}

function RealisationsPage() {
  const { slug } = Route.useParams();
  const { category, photos, loading, reload } = useGalleryByCategorySlug(slug);
  const { isAdmin } = useAuth();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const isFallback = (category?.id ?? "").startsWith("fb-");

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      // Recadrage 4:5 forcé (canvas, côté client) : ratio identique pour
      // toutes les photos quel que soit le fichier envoyé depuis l'admin.
      const processed = await cropCover(file).catch(() => file);
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(path, processed, { upsert: false });
      if (error) {
        toast.error(error.message);
        return null;
      }
      return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
    } catch (e) {
      toast.error((e as Error).message);
      return null;
    }
  };

  const replacePhoto = async (id: string, file: File) => {
    setBusyId(id);
    const url = await uploadFile(file);
    if (url) {
      const { error } = await supabase.from("gallery_photos").update({ url }).eq("id", id);
      if (error) toast.error(error.message);
      else {
        toast.success("Photo remplacée");
        reload();
      }
    }
    setBusyId(null);
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    setBusyId(id);
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
    setBusyId(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Photo supprimée");
      reload();
    }
  };

  const addPhotos = async (files: FileList) => {
    if (!category) return;
    setAdding(true);
    let order = photos.length > 0 ? Math.max(...photos.map((p) => p.display_order)) + 1 : 0;
    for (const f of Array.from(files)) {
      const url = await uploadFile(f);
      if (!url) continue;
      const { error } = await supabase.from("gallery_photos").insert({
        url,
        category_id: category.id,
        display_order: order++,
      });
      if (error) toast.error(error.message);
    }
    setAdding(false);
    toast.success(`${files.length} photo(s) ajoutée(s)`);
    reload();
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || lightbox === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 50) {
      setLightbox((i) =>
        i === null
          ? null
          : delta < 0
            ? (i + 1) % photos.length
            : (i - 1 + photos.length) % photos.length,
      );
    }
    setTouchStart(null);
  };

  // État de chargement = **le seul état rendu côté serveur**. `loading` part à
  // `true` et les données n'arrivent que dans un `useEffect`, qui ne s'exécute
  // jamais au rendu serveur : tout ce qui n'est pas ici est absent du HTML
  // servi. Avant le 14/09/2026 cette branche ne renvoyait que « Chargement… »,
  // soit 62 caractères de texte, sans <h1> ni aucun lien — ces pages étaient
  // donc vides pour tout robot qui n'exécute pas de JavaScript (c'est le cas
  // de la plupart des crawlers d'IA). On y rend désormais le titre, la
  // description et le maillage, résolus de façon synchrone depuis le slug.
  if (loading) {
    const fb = fallbackCategoryBySlug(slug);
    // Slug inconnu : on garde le shell minimal d'origine. Rendre un titre
    // fabriqué à partir de n'importe quel slug transformerait
    // `/realisations/<n'importe quoi>` en soft 404 crédible, donc en espace de
    // crawl infini. Ces URLs finissent de toute façon sur la branche 404
    // ci-dessous une fois le chargement terminé.
    if (!fb) {
      return (
        <main className="bg-background text-foreground min-h-screen flex items-center justify-center">
          <span className="label text-gold">Chargement…</span>
        </main>
      );
    }
    return (
      <>
        <EditModeToolbar />
        <main className="bg-background text-foreground overflow-x-hidden">
          <CategoryHeader />
          <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden">
            <div className="max-w-5xl mx-auto">
              <div className="label text-gold">— Réalisations</div>
              <h1
                className="font-display mt-4 text-foreground"
                style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
              >
                {fb.title}
              </h1>
              {fb.description && (
                <p className="mt-6 max-w-2xl text-muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
                  {fb.description}
                </p>
              )}
            </div>
          </section>
          <section className="relative w-full px-4 md:px-12 py-12 md:py-20 bg-background">
            <div className="text-center label text-gold">Chargement des photos…</div>
          </section>
          <CategorySavoir slug={slug} />
          <SeeAlso slug={slug} />
        </main>
      </>
    );
  }

  if (!category) {
    return (
      <>
        <EditModeToolbar />
        <main className="bg-background text-foreground min-h-screen">
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
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <h1 className="font-display text-6xl text-gold">404</h1>
              <p className="mt-4 text-muted">Catégorie introuvable.</p>
              <Link
                to="/"
                className="mt-8 inline-block label text-gold border-b border-gold/40 pb-1"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <EditModeToolbar />
      <SmoothScroll />
      <WhatsAppFAB />
      <main className="bg-background text-foreground overflow-x-hidden">
        {/* HEADER */}
        <CategoryHeader />

        {/* HERO catégorie */}
        <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="label text-gold">— Réalisations</div>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
            >
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-6 max-w-2xl text-muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
                {category.description}
              </p>
            )}
            {photos.length > 0 && (
              <div className="mt-4 label text-gold/70" style={{ fontSize: 11 }}>
                {photos.length} chantier{photos.length > 1 ? "s" : ""} livré
                {photos.length > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </section>

        {/* GRILLE photos — format 4:5 unique */}
        <section className="relative w-full px-4 md:px-12 py-12 md:py-20 bg-background">
          {/* Barre admin pour cette catégorie */}
          {isAdmin && (
            <div
              className="max-w-7xl mx-auto mb-6 p-4 rounded border flex items-center justify-between gap-4 flex-wrap"
              style={{ borderColor: "var(--cuivre-500)", background: "rgba(138,90,60,0.08)" }}
            >
              <div
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "var(--creme-50)" }}
              >
                <strong>Mode admin</strong> — survol une photo pour Remplacer ou Supprimer.
                {isFallback && (
                  <span className="ml-2" style={{ color: "var(--sable-500)" }}>
                    ⚠ La catégorie « {category.title} » n'est pas encore en base — applique
                    SETUP-PROD.sql pour activer les modifications.
                  </span>
                )}
              </div>
              {!isFallback && (
                <label
                  className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--cuivre-500)",
                    color: "var(--creme-50)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {adding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Upload…
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Ajouter des photos
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={adding}
                    onChange={(e) => e.target.files && addPhotos(e.target.files)}
                  />
                </label>
              )}
            </div>
          )}

          {photos.length === 0 && !(isAdmin && !isFallback) ? (
            <p className="text-center text-muted max-w-md mx-auto py-20">
              Aucune photo dans cette catégorie pour le moment.
            </p>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {photos.map((p, idx) => {
                const editable = isAdmin && !p.id.startsWith("fb-");
                return (
                  <div
                    key={p.id}
                    className="relative aspect-[4/5] group/photo overflow-hidden"
                    style={{ background: "var(--surface)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(idx)}
                      className="block w-full h-full"
                      aria-label={`Ouvrir la photo ${idx + 1}`}
                    >
                      <img
                        src={optimizeImageUrl(p.url, 700)}
                        alt={p.alt_text ?? category.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                      />
                    </button>
                    {editable && (
                      <div
                        className="absolute inset-0 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover/photo:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(14,14,15,0.75), transparent 50%)",
                        }}
                      >
                        <label
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer pointer-events-auto"
                          style={{
                            background: "var(--cuivre-500)",
                            color: "var(--creme-50)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {busyId === p.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Pencil className="w-3 h-3" />
                          )}
                          Remplacer
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={busyId === p.id}
                            onChange={(e) =>
                              e.target.files?.[0] && replacePhoto(p.id, e.target.files[0])
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => deletePhoto(p.id)}
                          disabled={busyId === p.id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold pointer-events-auto"
                          style={{
                            background: "rgba(14,14,15,0.8)",
                            color: "#f87171",
                            border: "1px solid #f87171",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          <Trash2 className="w-3 h-3" /> Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Emplacements vides — visibles uniquement en admin (DB active),
                  au moins MIN_SLOTS par dossier, chacun uploadable séparément. */}
              {isAdmin &&
                !isFallback &&
                Array.from({ length: Math.max(0, MIN_SLOTS - photos.length) }).map((_, i) => (
                  <label
                    key={`empty-${i}`}
                    className="relative aspect-[4/5] flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed transition-opacity hover:opacity-80"
                    style={{
                      borderColor: "var(--cuivre-500)",
                      background: "rgba(138,90,60,0.06)",
                      color: "var(--creme-50)",
                    }}
                  >
                    {adding ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ImagePlus className="w-6 h-6" style={{ color: "var(--cuivre-300)" }} />
                    )}
                    <span
                      className="text-xs"
                      style={{ fontFamily: "var(--font-body)", letterSpacing: "0.08em" }}
                    >
                      Emplacement {photos.length + i + 1}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={adding}
                      onChange={(e) => e.target.files && addPhotos(e.target.files)}
                    />
                  </label>
                ))}
            </div>
          )}
        </section>

        {/* Maillage interne — identique à celui de l'état de chargement */}
        <CategorySavoir slug={slug} />
        <SeeAlso slug={slug} />

        {/* CTA bas */}
        <section className="relative w-full bg-depth-b py-12 md:py-20 px-6 text-center">
          <div className="label text-gold mb-4">— Un projet similaire ?</div>
          <p
            className="font-display italic text-foreground max-w-2xl mx-auto mb-8"
            style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}
          >
            Recevez un devis détaillé, visite gratuite.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              hash="devis"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 6,
                background: "var(--cuivre-500)",
                color: "var(--creme-50)",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              Demander un devis <span aria-hidden>→</span>
            </Link>
            <a
              href="tel:0384526148"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 6,
                background: "transparent",
                color: "var(--creme-50)",
                border: "1px solid var(--creme-50)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <span aria-hidden>📞</span> 03 84 52 61 48
            </a>
          </div>
        </section>

        <MobileFloatingCTA href="/#devis" />
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(14,14,15,0.95)" }}
            onClick={() => setLightbox(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              className="absolute z-[9999] flex items-center justify-center transition-all duration-200"
              style={{
                top: "1rem",
                right: "1rem",
                width: 48,
                height: 48,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
              }}
              aria-label="Fermer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute top-4 left-4 label text-gold/80" style={{ fontSize: 11 }}>
              {category.title} · {lightbox + 1}/{photos.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + photos.length) % photos.length);
              }}
              className="absolute left-2 md:left-8 text-gold text-4xl p-4"
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % photos.length);
              }}
              className="absolute right-2 md:right-8 text-gold text-4xl p-4"
              aria-label="Suivant"
            >
              ›
            </button>
            <img
              src={optimizeImageUrl(photos[lightbox].url, 1600)}
              alt={photos[lightbox].alt_text ?? category.title}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {photos[lightbox].caption && (
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/80 text-center max-w-md px-4"
                style={{ fontSize: 13, fontFamily: "var(--font-body)" }}
              >
                {photos[lightbox].caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
