import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { EditModeProvider } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { EditableImage } from "@/components/EditableImage";
import { optimizeImageUrl } from "@/lib/optimizeImage";

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

type ServiceData = {
  n: string;
  title: string;
  hero: string;
  intro: string;
  prestations: string[];
  methode: { t: string; d: string }[];
  gallery: string[];
  /* Description utilisée dans <title>/meta uniquement, quand la phrase d'intro
     affichée dans le héros ne contient pas le vocabulaire réellement tapé par
     les internautes. Aucun effet sur le rendu. */
  seoDescription?: string;
  /* Bloc « ce qu'il faut savoir » : questions posées telles qu'on les pose à
     voix haute, réponse autonome de 2-3 phrases en tête. Rendu visible en clair
     (jamais replié, jamais monté conditionnellement) ET repris tel quel dans le
     JSON-LD FAQPage de la page : les deux viennent du même tableau, aucun
     mismatch possible. */
  savoir?: {
    /* Titre et chapeau de la section : propres à chaque service, donc portés
       par la donnée et non écrits en dur dans le rendu. */
    heading: string;
    lead: string;
    updated: string;
    updatedLabel: string;
    qa: { q: string; a: string }[];
    sources: { label: string; url: string }[];
  };
};

const SERVICES: Record<string, ServiceData> = {
  "preparation-terrain": {
    n: "01",
    title: "Préparation de terrain",
    hero: "/assets/preparation-terrain-1.png",
    intro: "De la lecture du sol à la viabilisation complète : HCE prépare votre terrain pour une pose d'enrobé qui dure dans le temps.",
    prestations: ["Aménagements extérieurs", "Terrassement VRD (Voirie et Réseaux Divers)", "Viabilisation de terrains", "Génie civil", "Puits perdus", "Drainage des sols", "Enrochement", "Aménagement de terrasses"],
    methode: [
      { t: "Lecture du terrain", d: "Étude des pentes, du sol et des écoulements avant tout terrassement." },
      { t: "Décaissement contrôlé", d: "Mini-pelle et chargeur pour respecter les volumes prévus au devis." },
      { t: "Compactage par couches", d: "Plaque vibrante et rouleau, contrôle de portance." },
    ],
    gallery: [
      "/assets/preparation-terrain-1.png",
      "/assets/preparation-terrain-2.png",
      "/assets/preparation-terrain-3.png",
    ],
    seoDescription:
      "Terrassement, VRD et viabilisation dans le Jura et l'Ain : décaissement contrôlé, drainage et compactage par couches avant toute pose d'enrobé. Devis détaillé.",
    savoir: {
      heading: "Terrassement : les questions qu'on nous pose avant d'ouvrir le sol",
      lead: "Avant de goudronner une cour ou de viabiliser un terrain, il y a le terrassement : des déclarations obligatoires, des délais réglementaires, des terres à évacuer et un sol à compacter. Voici ce que cela implique concrètement dans le Jura et l'Ain.",
      updated: "2026-09-12",
      updatedLabel: "12 septembre 2026",
      qa: [
        {
          q: "Faut-il prévenir quelqu'un avant de creuser sur un terrain ?",
          a: "Oui, et c'est une obligation réglementaire, pas une formalité interne à l'entreprise. Avant des travaux de terrassement ou de sondage, le responsable du projet adresse une déclaration de projet de travaux (DT) aux exploitants de réseaux, et chaque entreprise qui intervient sur le chantier — sous-traitants compris — dépose sa propre déclaration d'intention de commencement de travaux (DICT). Les deux passent par le téléservice public « Réseaux et canalisations », qui recense les réseaux d'électricité, de gaz, d'eau et de télécommunications présents sous la parcelle.",
        },
        {
          q: "Combien de temps faut-il prévoir avant de démarrer un terrassement ?",
          a: "Il faut compter le délai de réponse des exploitants de réseaux, qui est encadré : neuf jours calendaires pour une DT déposée par internet, sept jours calendaires pour une DICT. Ces déclarations ont en outre une durée de validité de trois mois — si le chantier n'a pas commencé dans ce délai, elles sont à refaire. C'est pourquoi un terrassement sérieux ne démarre pas le lendemain de la signature : le devis détaillé est établi, puis ces déclarations sont déposées avant la première ouverture du sol.",
        },
        {
          q: "Que deviennent les terres retirées de mon terrain ?",
          a: "Elles ne partent pas n'importe où. Depuis le 1er janvier 2022, les terres excavées font l'objet d'un registre chronologique tenu par ceux qui les produisent, les transportent ou les valorisent, en application du décret n° 2021-321 du 25 mars 2021 et de l'arrêté du 31 mai 2021. Ces registres alimentent un registre national, et depuis le 5 mai 2025 la déclaration passe par la plateforme Trackdéchets. Concrètement, un chantier de terrassement conforme sait dire où sont allées les terres sorties de votre parcelle.",
        },
        {
          q: "Le terrassement VRD, qu'est-ce que c'est exactement ?",
          a: "VRD veut dire « voirie et réseaux divers ». C'est la partie du terrassement qui prépare à la fois les surfaces de circulation — cour, allée, parking — et les réseaux enterrés qui passent dessous : eau, électricité, télécommunications, évacuation des eaux pluviales. Sur un terrain à viabiliser, c'est l'étape qui rend la parcelle utilisable avant toute finition de surface. HCE réalise le terrassement VRD, la viabilisation de terrains, le drainage des sols et l'enrochement dans le Jura et l'Ain.",
        },
        {
          q: "Pourquoi faut-il compacter le sol par couches avant de poser un enrobé ?",
          a: "Parce qu'un enrobé ne rattrape jamais un support qui bouge. Une terre remise en place d'un seul tenant conserve des vides : sous le poids des véhicules, elle se tasse de façon irrégulière, et la surface finit par se fissurer ou par retenir des flaques. Le compactage se fait donc par couches successives, à la plaque vibrante puis au rouleau, avec contrôle de la portance — c'est ce support-là qui porte les véhicules, l'enrobé posé à la main à 150°C n'étant que la couche de finition.",
        },
      ],
      sources: [
        {
          label: "service-public.gouv.fr — Déclaration de travaux à proximité de réseaux (DT-DICT)",
          url: "https://entreprendre.service-public.gouv.fr/vosdroits/F23491",
        },
        {
          label: "Ministère de la Transition écologique — Traçabilité des déchets, terres excavées et sédiments",
          url: "https://www.ecologie.gouv.fr/politiques-publiques/tracabilite-dechets-terres-excavees-sediments",
        },
      ],
    },
  },
  "enrobe-a-chaud": {
    n: "02",
    title: "Enrobé à chaud",
    hero: "/assets/enrobe-1.png",
    intro: "Pose à la main à 150°C, compactage maîtrisé, garantie décennale. La spécialité historique d'HCE depuis 2012.",
    prestations: ["Enrobé noir, rouge, saumon, bordeaux", "Enrobé sous différentes granulations", "Pose à la main à 150°C", "Compactage maîtrisé", "Garantie décennale"],
    methode: [
      { t: "Préparation thermique", d: "Enrobé livré à température, application sans interruption." },
      { t: "Pose à la main", d: "Épaisseur régulière, pentes maîtrisées, joints soignés." },
      { t: "Compactage en plusieurs passes", d: "Rouleau tandem pour une densité optimale." },
    ],
    gallery: [
      "/assets/enrobe-1.png",
      "/assets/enrobe-2.png",
      "/assets/enrobe-3.png",
    ],
    seoDescription:
      "Goudronnage de cour, d'allée ou de parking dans le Jura et l'Ain : HCE pose l'enrobé à chaud à la main à 150°C et le compacte au rouleau. Devis détaillé, garantie décennale.",
    savoir: {
      heading: "Goudronnage ou enrobé : les questions qu'on nous pose",
      lead: "« Faire goudronner sa cour » et « poser un enrobé à chaud » désignent aujourd'hui le même chantier. Voici ce que recouvre réellement le mot, ce que disent les normes, et à quelle saison le chantier est possible dans le Jura et l'Ain.",
      updated: "2026-09-11",
      updatedLabel: "11 septembre 2026",
      qa: [
        {
          q: "Goudronnage et enrobé, est-ce la même chose ?",
          a: "Dans le langage courant, oui : quand on parle de « goudronner » une cour, une allée ou un parking, ce qui est posé aujourd'hui est un enrobé bitumineux. Le goudron véritable est un produit issu du charbon, qui a cessé d'être utilisé dans les constructions routières au milieu des années 1980, son caractère cancérigène ayant été établi. L'enrobé à chaud qu'HCE pose dans le Jura et l'Ain est fait de granulats et de bitume, un liant issu de la distillation du pétrole : ce n'est pas du goudron.",
        },
        {
          q: "Pourquoi mon devis d'enrobé parle-t-il de BBSG ?",
          a: "BBSG veut dire « béton bitumineux semi-grenu » : c'est la famille d'enrobé la plus courante pour les cours, les allées et les parkings. Les enrobés à chaud sont couverts par la série de normes NF EN 13108, dont la partie 1 correspond précisément au BBSG. Depuis le 1er mars 2008, tout enrobé bitumineux à chaud mis sur le marché porte le marquage CE, et les anciennes normes françaises NF P 98-1xx ont été retirées à cette date.",
        },
        {
          q: "Pourquoi l'enrobé se pose-t-il à 150°C ?",
          a: "Parce qu'un enrobé ne se compacte que tant qu'il est chaud. HCE le pose à la main à 150°C puis le compacte au rouleau avant qu'il ne refroidisse : c'est ce compactage, fait dans la bonne fenêtre de température, qui donne au revêtement sa densité et son étanchéité. Posé trop froid, l'enrobé se referme mal et la surface reste poreuse — elle vieillit alors beaucoup plus vite.",
        },
        {
          q: "Peut-on faire goudronner sa cour en hiver dans le Jura ?",
          a: "Non, pas en plein hiver. L'enrobé à chaud demande une température extérieure supérieure à 5°C et un support sec : sur un sol gelé ou détrempé, l'enrobé n'accroche pas et refroidit trop vite pour être compacté correctement. HCE intervient donc généralement de mars à novembre dans le Jura et l'Ain, et la préparation du terrain se planifie en amont de cette fenêtre.",
        },
        {
          q: "Quelle différence entre enrobé à chaud et enrobé à froid ?",
          a: "L'enrobé à froid se livre prêt à l'emploi et se compacte sans chauffe : c'est une solution de réparation ponctuelle, pour reboucher un nid-de-poule ou une tranchée. L'enrobé à chaud, lui, est fabriqué en centrale, livré chaud et posé à 150°C : c'est celui qui donne une surface homogène sur une cour, une allée ou un parking entier. HCE travaille l'enrobé à chaud, en noir, rouge, saumon ou bordeaux et sous différentes granulations.",
        },
      ],
      sources: [
        {
          label: "TotalEnergies — Bitume, asphalte et goudron : quelles différences ?",
          url: "https://services.totalenergies.fr/professionnels/conseils/bitumes/quelles-differences-entre-bitume-asphalte-goudron",
        },
        {
          label: "IDRRIM / CFTR-info n°17 — La normalisation européenne des enrobés (NF EN 13108)",
          url: "https://www.idrrim.com/ressources/publications/1/374,Note17.pdf",
        },
      ],
    },
  },
  "maconnerie-generale": {
    n: "03",
    title: "Maçonnerie générale",
    hero: "/assets/maconnerie-1.png",
    intro: "Pavage, dallage, médaillons sur mesure : une maçonnerie qui s'intègre à votre enrobé pour personnaliser votre extérieur.",
    prestations: ["Pavage", "Pose de bordures", "Dallage", "Médaillons et inserts décoratifs sur mesure"],
    methode: [
      { t: "Conception sur mesure", d: "Dessin du motif, choix des matériaux et calepinage avec vous." },
      { t: "Pose au cordeau", d: "Niveau laser et précision millimétrique sur les jonctions." },
      { t: "Finition jointoyée", d: "Joints sablés ou cimentés selon l'usage prévu." },
    ],
    gallery: [
      "/assets/maconnerie-1.png",
      "/photos/2.png",
      "/assets/maconnerie-3.png",
    ],
    seoDescription:
      "Pavage, dallage, bordures et médaillons intégrés à l'enrobé dans le Jura et l'Ain : motif dessiné avec vous, pose au cordeau, joints sablés ou cimentés. Devis détaillé.",
    savoir: {
      heading: "Pavage, dallage et médaillons : les questions qu'on nous pose",
      lead: "Le pavage, le dallage et les médaillons ne remplacent pas l'enrobé : ils s'y intègrent. Voici comment les deux techniques se posent sur un même chantier, ce que disent les normes des pavés, des dalles et des bordures, et à partir de quand une autorisation d'urbanisme entre en jeu, dans le Jura et l'Ain.",
      updated: "2026-09-16",
      updatedLabel: "16 septembre 2026",
      qa: [
        {
          q: "Peut-on intégrer des pavés ou un médaillon dans une cour en enrobé ?",
          a: "Oui, et c'est la raison d'être de la plupart des maçonneries qu'HCE réalise : les deux techniques se posent sur le même chantier et sur le même support. Le motif — médaillon, rosace, ligne de calepinage, contour d'entrée — est dessiné et calé avec vous avant les travaux, les pavés ou les dalles sont posés au cordeau et au niveau laser, puis l'enrobé à chaud vient occuper le reste de la surface autour d'eux. C'est la pose à la main, à 150°C, qui rend ce mariage possible : elle permet de travailler au plus près des courbes et des jonctions, ce qu'une pose mécanisée, faite pour les grandes surfaces régulières, permet mal.",
        },
        {
          q: "Pavés en béton ou pavés en pierre naturelle : qu'est-ce qui change ?",
          a: "Ce sont deux familles de produits distinctes, chacune régie par sa propre norme européenne. Les pavés en béton relèvent de la NF EN 1338, homologuée en février 2004, qui couvre les pavés préfabriqués en béton destinés aux piétons comme aux véhicules — chemins piétonniers, pistes cyclables, parkings, routes, aires industrielles. Les pavés de pierre naturelle relèvent de la NF EN 1342, publiée en février 2013, qui vise les pavés de pierre utilisés en revêtement de sol extérieur et de route. Les deux normes définissent le marquage du produit et l'évaluation de sa conformité : un pavé vendu pour ces usages est identifiable, quel que soit le matériau. Le choix se fait ensuite sur l'aspect recherché, le calepinage voulu et le budget.",
        },
        {
          q: "À quoi sert vraiment une bordure au bord d'un enrobé ?",
          a: "À tenir la rive, et pas seulement à faire joli. La norme NF EN 1340, qui couvre les éléments de bordure et de caniveau préfabriqués en béton, énumère leurs fonctions : séparation, délimitation physique ou visuelle, drainage, et butée des zones dallées ou des autres revêtements. C'est ce dernier rôle qu'on oublie le plus souvent : sans butée, le bord d'une cour finit par s'effriter sous les roues, parce que rien ne retient le matériau latéralement. Les dalles en béton ont de la même façon leur norme, la NF EN 1339. HCE pose des bordures béton coulées sur place ou des bordures pavées, selon la forme à suivre.",
        },
        {
          q: "Faut-il une autorisation d'urbanisme pour créer des places de stationnement ?",
          a: "Cela dépend de la capacité de l'aire et de son ouverture au public, jamais du revêtement choisi. D'après service-public.gouv.fr, un permis d'aménager est exigé pour une aire de stationnement ouverte au public lorsque l'aménagement crée une capacité d'accueil totale d'au moins 50 unités ; en dessous de ce seuil, l'aire de stationnement fait partie des aménagements de faible importance qui relèvent de la déclaration préalable. Ces deux fiches ont été vérifiées le 13 février 2026. Pour une cour de maison, c'est le plan local d'urbanisme de la commune qui tranche : la mairie est le bon interlocuteur avant de lancer le chantier.",
        },
        {
          q: "Joints sablés ou joints cimentés : lequel choisir ?",
          a: "Cela se décide sur l'usage prévu de la surface, et c'est un vrai choix, pas un détail de finition. Un joint sablé reste perméable et un peu souple : il laisse passer l'eau, se recharge facilement et encaisse les micro-mouvements du support sans casser, mais il se creuse au nettoyeur haute pression et laisse la végétation s'installer. Un joint cimenté donne une surface fermée, facile à balayer et à laver, au prix de la rigidité : si le support bouge, c'est le joint qui se fissure. La décision se prend au moment du calepinage, en même temps que le dessin du motif.",
        },
      ],
      sources: [
        {
          label: "AFNOR Norm'Info — NF EN 1338, Pavés en béton : prescriptions et méthodes d'essai",
          url: "https://norminfo.afnor.org/norme/nf-en-1338/paves-en-beton-prescriptions-et-methodes-dessai/73708",
        },
        {
          label: "AFNOR Norm'Info — NF EN 1340, Éléments pour bordures de trottoir en béton",
          url: "https://norminfo.afnor.org/norme/nf-en-1340/elements-pour-bordures-de-trottoir-en-beton-prescriptions-et-methodes-dessai/69403",
        },
        {
          label:
            "service-public.gouv.fr — Permis d'aménager (aires de stationnement ouvertes au public)",
          url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17665",
        },
      ],
    },
  },
  "drainage-pentes": {
    n: "04",
    title: "Drainage & pentes",
    hero: "/assets/drainage-1.jpeg",
    intro: "Une cour qui dure, c'est d'abord une cour qui évacue l'eau. HCE étudie les pentes avant chaque pose.",
    prestations: ["Études de pente", "Drainage périphérique", "Évacuation des eaux pluviales", "Lecture du terrain avant pose"],
    methode: [
      { t: "Diagnostic d'écoulement", d: "Identification des points bas et des arrivées d'eau." },
      { t: "Drains périphériques", d: "Pose de drains et de regards aux endroits stratégiques." },
      { t: "Pentes calculées", d: "Pente minimum 1.5 % vers les exutoires, vérifiée au laser." },
    ],
    gallery: [
      "/assets/drainage-1.jpeg",
      "/assets/drainage-3.jpeg",
      "/assets/drainage-4.jpeg",
    ],
    seoDescription:
      "Drainage et pentes avant pose d'enrobé dans le Jura et l'Ain : étude des écoulements, pente minimum 1,5 % vers les exutoires, drains périphériques et évacuation des eaux pluviales. Devis détaillé.",
    savoir: {
      heading: "Drainage, pentes et eaux pluviales : les questions qu'on nous pose",
      lead: "Poser un enrobé sur une cour, une allée ou un parking imperméabilise une surface qui absorbait jusque-là une partie de la pluie : cette eau doit désormais aller quelque part. Voici où elle part, ce que dit la réglementation, et pourquoi la pente se calcule avant la pose et non après, dans le Jura et l'Ain.",
      updated: "2026-09-13",
      updatedLabel: "13 septembre 2026",
      qa: [
        {
          q: "Une cour goudronnée peut-elle envoyer l'eau chez le voisin ?",
          a: "C'est le premier point à régler, et il est encadré par la loi. Le terrain situé en contrebas est tenu de recevoir les eaux qui s'écoulent naturellement du terrain situé au-dessus : c'est la servitude naturelle d'écoulement, prévue aux articles 640 et 641 du Code civil. Mais cette obligation ne vaut que pour un écoulement naturel, c'est-à-dire sans intervention humaine, et elle tombe si le propriétaire du terrain supérieur aggrave cet écoulement — par exemple en installant un drainage qui dirige les eaux vers la parcelle voisine. Elle ne concerne par ailleurs que les eaux de pluie, de source et de fonte des neiges, pas les eaux usées. C'est pour cette raison qu'HCE identifie les points bas et les exutoires avant de goudronner.",
        },
        {
          q: "Quelle pente faut-il pour qu'une cour en enrobé évacue l'eau ?",
          a: "HCE applique une pente minimum de 1,5 % vers les exutoires, vérifiée au laser — soit 1,5 cm de dénivelé par mètre parcouru. En dessous, les irrégularités inévitables de toute surface posée suffisent à créer des zones de rétention : l'eau n'a plus de sens d'écoulement franc et elle stagne. Cette pente se décide avant le terrassement, car elle se rattrape dans les niveaux du support : l'enrobé est une couche de finition d'épaisseur régulière, il épouse la forme qu'on lui donne dessous, il ne la corrige pas.",
        },
        {
          q: "Pourquoi des flaques se forment-elles sur un enrobé ?",
          a: "Une flaque signale presque toujours un problème de niveaux, pas un défaut du revêtement lui-même. Trois causes reviennent : une pente insuffisante ou orientée vers un point qui n'a pas d'exutoire, un exutoire absent ou sous-dimensionné au point bas, ou un support qui s'est tassé après la pose et a formé une cuvette. L'eau qui stagne fait vieillir la surface plus vite : elle reste en contact avec le revêtement, s'infiltre par le moindre défaut, et en hiver elle gèle — or l'eau augmente de volume en gelant, ce qui travaille le matériau. C'est précisément ce que le diagnostic d'écoulement, fait avant la pose, sert à éviter.",
        },
        {
          q: "Refaire un parking de plus de 500 m² : y a-t-il des obligations sur les eaux de pluie ?",
          a: "Oui, et elles visent aussi les rénovations, pas seulement les parkings neufs. Les parcs de stationnement extérieurs de plus de 500 m², nouvellement construits et ouverts au public ou faisant l'objet d'une rénovation lourde, doivent comporter sur au moins 50 % de leur surface des revêtements de surface, des aménagements hydrauliques ou des dispositifs végétalisés favorisant la perméabilité et l'infiltration des eaux pluviales ou leur évaporation. Cette obligation figure à l'article L111-19-1 du Code de l'urbanisme et s'applique aux projets soumis à autorisation d'urbanisme ; le même article prévoit également un dispositif d'ombrage. Pour un parking d'entreprise ou de copropriété, cela se prépare dès le devis, car la répartition des surfaces en dépend.",
        },
        {
          q: "Faut-il un drain, ou la pente suffit-elle ?",
          a: "Les deux ne traitent pas la même eau, et l'une ne remplace pas l'autre. La pente évacue l'eau de surface, celle qui tombe sur la cour et doit rejoindre un exutoire. Le drain périphérique traite l'eau présente dans le sol : venues d'eau d'un terrain en pente, remontées, ruissellement collecté en amont par la parcelle. Un support gorgé d'eau perd sa portance, et un enrobé posé dessus finit par se déformer quelle que soit la qualité de la pose. HCE commence donc par un diagnostic d'écoulement, puis pose drains et regards là où l'eau arrive réellement ; lorsqu'aucun exutoire n'existe à proximité, l'évacuation peut passer par un puits perdu.",
        },
      ],
      sources: [
        {
          label: "service-public.gouv.fr — Doit-on recevoir les eaux qui s'écoulent du terrain de son voisin ? (articles 640 et 641 du Code civil)",
          url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2443",
        },
        {
          label: "entreprendre.service-public.gouv.fr — Ombrage et gestion des eaux pluviales des parcs de stationnement (article L111-19-1 du Code de l'urbanisme)",
          url: "https://entreprendre.service-public.gouv.fr/vosdroits/F38106",
        },
      ],
    },
  },
  "bordures-murets": {
    n: "05",
    title: "Bordures & murets",
    hero: "/assets/bordures-1.png",
    intro: "Bordures béton coulées sur place, pavées, ou petits murets de soutènement : la finition qui fait toute la différence.",
    prestations: ["Bordures béton coulées", "Bordures pavées", "Petits murets de soutènement", "Finitions périphériques"],
    methode: [
      { t: "Coffrage soigné", d: "Lignes droites ou courbes selon votre cour, jamais en kit." },
      { t: "Coulage sur place", d: "Béton dosé pour résister au gel et à la décennie." },
      { t: "Décoffrage propre", d: "Finition lisse, arêtes nettes, prêt à recevoir l'enrobé." },
    ],
    gallery: ["/assets/bordures-1.png", "/assets/bordures-2.png", "/assets/bordures-3.png"],
    seoDescription:
      "Bordures béton coulées sur place, bordures pavées et petits murets de soutènement dans le Jura et l'Ain : autorisation d'urbanisme, mur mitoyen, tenue au gel. Devis détaillé.",
    savoir: {
      heading: "Bordures et murets : les questions qu'on nous pose",
      lead: "Une bordure tient la rive d'une cour, un muret retient la terre : ce sont deux ouvrages différents, avec chacun leurs règles. Voici quand une autorisation d'urbanisme entre en jeu, à qui appartient le mur qui sépare deux terrains, ce qui distingue une bordure coulée sur place d'une bordure préfabriquée, et ce que l'hiver jurassien impose au béton.",
      updated: "2026-09-17",
      updatedLabel: "17 septembre 2026",
      qa: [
        {
          q: "À quoi sert un muret de soutènement dans une cour ?",
          a: "À retenir la terre là où le terrain change de niveau, pour que la surface au-dessus reste plane et utilisable. Dès qu'une cour est terrassée dans une pente — le cas courant dans le Jura — il faut soit adoucir le talus, ce qui consomme de la place, soit le retenir par un ouvrage, ce qui n'en consomme pas. Un mur de soutènement peut céder de trois façons, et ce sont exactement les trois vérifications que demande la norme de justification de ces ouvrages, la NF P94-281, document d'application nationale de l'Eurocode 7 : la portance du sol sous la semelle, le glissement du mur sur sa base, et l'excentrement, c'est-à-dire le basculement sous la poussée des terres. HCE réalise de petits murets de soutènement en accompagnement d'un chantier de cour ou d'allée ; au-delà, quand la hauteur retenue devient importante ou qu'un véhicule circule juste derrière, le dimensionnement relève d'un calcul géotechnique et d'un bureau d'études, pas d'une finition de maçonnerie. Cette norme est elle-même en cours de révision : le projet est passé en enquête publique jusqu'au 16 mars 2026, pour une publication attendue fin 2026.",
        },
        {
          q: "Faut-il une autorisation pour construire un mur chez soi ?",
          a: "Oui dans plusieurs cas précis, et la hauteur n'est que l'un d'eux. Une déclaration préalable de travaux est obligatoire dès que le mur atteint 2 mètres de hauteur, mais aussi, quelle que soit sa hauteur, si le terrain se trouve en secteur protégé, dans une zone désignée par le plan local d'urbanisme, ou dans une commune qui a décidé de soumettre les clôtures à déclaration. Ces règles, rappelées par service-public.gouv.fr dans une fiche vérifiée le 5 décembre 2025 et prévues à l'article R*421-12 du Code de l'urbanisme, visent les clôtures et les murs de clôture. Un mur de soutènement, lui, n'est pas une clôture : sa fonction est de retenir les terres, et son régime dépend du plan local d'urbanisme de la commune. Dans les deux cas, la mairie est le bon interlocuteur, et la question se règle avant le chantier plutôt qu'après.",
        },
        {
          q: "Le mur entre chez moi et chez le voisin est-il mitoyen ?",
          a: "Il est présumé mitoyen s'il sépare deux propriétés appartenant à des propriétaires différents — bâtiments, cours, jardins ou champs. Cette présomption tombe si le mur porte des marques de non-mitoyenneté : un sommet à une seule pente, ou des tuiles et des bordures situées d'un seul côté ; le mur appartient alors au propriétaire de ce côté-là. La distinction n'a rien de théorique quand on refait une cour. Sur un mur mitoyen, les frais d'entretien et de réparation se partagent entre les deux propriétaires à proportion de leurs droits, et les réparations autres qu'urgentes supposent leur accord ; chacun supporte en revanche le coût des dégradations qu'il cause. Ces règles figurent aux articles 653 à 673 du Code civil, et la fiche service-public.gouv.fr correspondante a été vérifiée le 14 septembre 2026. Autrement dit : avant d'adosser un muret, de rehausser une séparation ou de décaisser au pied d'un mur existant, il faut savoir à qui il appartient.",
        },
        {
          q: "Bordure coulée sur place ou bordure préfabriquée : qu'est-ce qui change ?",
          a: "La bordure préfabriquée est un produit industriel : des éléments de béton moulés en usine, de dimensions fixes, couverts par la norme NF EN 1340 qui vise les éléments de bordure et de caniveau préfabriqués en béton. La bordure coulée sur place est un ouvrage fabriqué sur le chantier, au coffrage, et elle sort donc du champ de cette norme produit : sa tenue dépend du coffrage, du béton mis en œuvre et du décoffrage, pas d'un marquage. Ce qui les sépare à l'usage, c'est la forme. Un élément préfabriqué suit une ligne droite ou un rayon standard, et une courbe se rattrape en ouvrant les joints ; une bordure coulée épouse la forme réelle de la cour, courbes comprises, sans interruption tous les mètres. HCE coffre puis coule sur place, ou pose des bordures pavées lorsque le dessin le demande. Le rôle structurel de la bordure — la butée qui empêche la rive de l'enrobé de s'effriter sous les roues — est le même dans les deux cas ; il est détaillé sur la page Maçonnerie générale.",
        },
        {
          q: "Peut-on couler des bordures et des murets toute l'année dans le Jura ?",
          a: "Pas indifféremment : un béton frais redoute le gel tant qu'il n'a pas pris, et l'hiver jurassien n'est pas une saison neutre. À la station Météo-France de Champagnole, à 2 km de Cize et à 537 m d'altitude, les normales 1991-2020 relèvent 111,7 jours de gel par an, c'est-à-dire de jours où la température minimale descend à 0 °C ou en dessous — dont 21,8 en janvier, 20,9 en février et 20,4 en décembre — et 35,2 jours par an où elle descend à -5 °C ou en dessous. La température moyenne annuelle y est de 9,4 °C. L'eau est l'autre paramètre local, et il est marquant : la même station relève 1 573,2 mm de précipitations par an. C'est ce cumul qui fait qu'une bordure n'est pas ici un simple élément de décoration — elle canalise le ruissellement vers les exutoires au lieu de le laisser attaquer la rive de l'enrobé. En pratique, la période des travaux se cale avec vous au moment du devis, qui est établi après une visite sur site.",
        },
      ],
      sources: [
        {
          label:
            "service-public.gouv.fr — Quelles sont les règles pour construire ou installer une clôture ? (article R*421-12 du Code de l'urbanisme)",
          url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F3131",
        },
        {
          label: "service-public.gouv.fr — Mur mitoyen (articles 653 à 673 du Code civil)",
          url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2415",
        },
        {
          label:
            "AFNOR Norm'Info — NF P94-281, Justification des ouvrages géotechniques : ouvrages de soutènement, murs",
          url: "https://norminfo.afnor.org/norme/prnf-p94-281/justification-des-ouvrages-geotechniques-normes-dapplication-nationale-de-leurocode-7-ouvrages-de-soutenement-murs/210865",
        },
        {
          label: "AFNOR Norm'Info — NF EN 1340, Éléments pour bordures de trottoir en béton",
          url: "https://norminfo.afnor.org/norme/nf-en-1340/elements-pour-bordures-de-trottoir-en-beton-prescriptions-et-methodes-dessai/69403",
        },
        {
          label:
            "Météo-France — Fiche climatologique de la station de Champagnole (39), indicatif 39097003, statistiques 1991-2020",
          url: "https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/REF_STATION/FICHECLIM_39097003.pdf",
        },
      ],
    },
  },
  "finitions-soignees": {
    n: "06",
    title: "Vous avez un projet d'aménagement de cour en enrobé",
    hero: "/assets/finitions-1.jpeg",
    intro: "Bords nets, raccords maîtrisés, surface plane et homogène. Le souci du détail jusqu'à la dernière passe.",
    prestations: [
      "Bords et angles nets, sans bavure",
      "Raccords et jonctions parfaitement intégrés",
      "Surface plane, homogène, sans flaque",
      "Nettoyage complet du chantier en fin de travaux",
    ],
    methode: [
      { t: "Contrôle visuel et de planéité", d: "Vérification complète avant de quitter le chantier." },
      { t: "Demande de validation", d: "Chaque étape est validée avec vous avant de poursuivre." },
      { t: "Livraison propre", d: "Chantier rendu propre, prêt à l'usage." },
    ],
    gallery: [
      "/assets/finitions-1.jpeg",
      "/assets/finitions-3.jpeg",
      "/assets/finitions-4.jpeg",
    ],
    seoDescription:
      "Finitions d'enrobé dans le Jura et l'Ain : bords nets, raccords entre bandes, surface plane sans flaque, chantier rendu propre et gravats évacués. Devis détaillé après visite sur site.",
    savoir: {
      heading: "Finitions et fin de chantier : les questions qu'on nous pose",
      lead: "La finition est la partie du chantier que le client voit vraiment : les bords, les raccords entre bandes, la planéité, et l'état dans lequel le chantier est rendu. Voici à quoi se reconnaît un enrobé bien posé, pourquoi une ligne apparaît parfois entre deux bandes, où partent les gravats d'une cour refaite, et ce qu'un devis doit obligatoirement dire à ce sujet.",
      updated: "2026-09-21",
      updatedLabel: "21 septembre 2026",
      qa: [
        {
          q: "Comment reconnaît-on un enrobé bien posé ?",
          a: "À trois choses visibles à l'œil nu, sans aucun instrument : des bords francs, sans bavure ni épaisseur qui s'effrite ; des raccords entre bandes qu'on ne sent pas sous le pied ; et une surface qui ne retient pas l'eau une fois la pluie passée. Ces trois points se jugent à la réception du chantier, et ce sont eux qui font la différence entre deux surfaces posées avec le même enrobé. Côté normalisation, la mise en œuvre des enrobés à chaud et leur contrôle sur chantier relèvent de la norme NF P98-150-1, homologuée le 26 juin 2010 et toujours en vigueur (son réexamen est programmé au 1er juin 2030). Son domaine d'application mérite d'être connu d'un particulier : il ne couvre pas seulement les couches de roulement, de liaison et d'assise d'une route, mais aussi les « revêtements d'accotements, de trottoirs et les parties annexes des chaussées ainsi qu'au travail de reprofilage » — autrement dit exactement le type de surfaces qu'on refait dans une cour, une allée ou un parking. HCE fait un contrôle visuel et de planéité avant de quitter le chantier.",
        },
        {
          q: "Pourquoi voit-on parfois une ligne entre deux bandes d'enrobé ?",
          a: "Parce qu'un enrobé se pose par bandes successives, et que la jonction entre deux bandes est l'endroit le plus fragile de toute la surface. Une ligne légèrement visible n'est pas forcément un défaut ; en revanche, un joint mal traité se désagrège avant le reste du revêtement. La raison est thermique : deux bandes ne se lient entre elles que tant que le matériau est encore assez chaud pour être compacté ensemble. Si la première bande a refroidi avant que la seconde arrive contre elle, le joint reste une simple mise bout à bout, plus poreuse, par où l'eau entre puis gèle. C'est là que la pose à la main à 150 °C prend son intérêt : elle permet de travailler la jonction et les rives au plus près, y compris sur des courbes et autour d'un obstacle, là où une bande large impose un tracé rectiligne. Le nombre de bandes nécessaires se décide en fonction de la forme de la surface, avant le début de la pose.",
        },
        {
          q: "Qui évacue les gravats d'une cour refaite, et où vont-ils ?",
          a: "C'est l'entreprise qui s'en charge, et ils ne partent pas n'importe où : les déchets d'un chantier se trient à la source, par flux, puis se déposent dans une installation qui accepte ce flux-là. Pour une cour ou un parking, l'essentiel du volume relève de la fraction minérale. Les flux à trier séparément sur un chantier de construction ou de démolition sont le bois, les fractions minérales, le métal, le verre, le plastique et le plâtre — la fraction minérale regroupant le béton et les gravats, donc les croûtes d'enrobé et l'ancien support décaissé. Deux cas de dispense existent et concernent précisément les petits chantiers : un chantier qui dispose de moins de 40 m² de surface de stockage, ou dont le volume total de déchets reste inférieur à 10 m³. Un chantier de cour chez un particulier tombe souvent dans l'un des deux, ce qui ne dispense pas de déposer les déchets dans une installation qui les accepte.",
        },
        {
          q: "Qu'est-ce qu'un devis de travaux doit indiquer sur les déchets du chantier ?",
          a: "Quatre informations, obligatoires depuis le 1er juillet 2021 : une estimation de la quantité totale de déchets que le chantier va produire, les modalités de gestion et d'enlèvement prévues, le ou les points de collecte où l'entreprise compte les déposer, et une estimation des coûts associés. Ces mentions sont fixées par le décret n° 2020-1817 du 29 décembre 2020 et s'appliquent aux devis de travaux de construction, de rénovation et de démolition de bâtiments, ainsi qu'aux travaux de jardinage. Le point de collecte doit être identifié précisément : raison sociale, adresse et type d'installation. En fin de parcours, l'installation qui reçoit les déchets remet gratuitement un bordereau de dépôt, rempli conjointement avec l'entreprise, qui mentionne la date du dépôt, l'installation, la nature et les quantités déposées, l'entreprise et le client. C'est une des raisons pour lesquelles le devis d'HCE est détaillé et établi après une visite sur site : la quantité de déchets d'un chantier de cour ne s'estime pas au téléphone.",
        },
        {
          q: "Comment la finition se valide-t-elle avant la fin du chantier ?",
          a: "Étape par étape avec le client, et pas seulement au moment de partir : chaque étape est validée avant de passer à la suivante, et un contrôle visuel et de planéité est fait avant de quitter le chantier. La raison est simple : sur un enrobé, presque tout ce qui détermine la surface finale se décide avant la dernière passe. Les niveaux du support, l'emplacement des exutoires, le tracé des bordures, la position des raccords et le calepinage d'un éventuel motif se jouent pendant la préparation et la pose. Une fois l'enrobé posé et refroidi, ces choix ne se reprennent plus sans toucher au revêtement lui-même. D'où l'intérêt de valider en cours de chantier plutôt que de tout découvrir à la fin. Les travaux d'HCE sont par ailleurs couverts par une garantie décennale.",
        },
      ],
      sources: [
        {
          label:
            "NF P98-150-1 — mise en œuvre et contrôle sur chantier des enrobés à chaud (Afnor)",
          url: "https://norminfo.afnor.org/norme/nf-p98-150-1/enrobes-hydrocarbones-execution-des-assises-de-chaussees-couches-de-liaison-et-couches-de-roulement-partie-1-enrobes-hydrocarbones-a-chaud-constituants-formulation-fabrication-transport-mise-en-oeuvre-et-controle-sur-chantier/77679",
        },
        {
          label:
            "Décret n° 2020-1817 du 29 décembre 2020 — mentions déchets sur les devis (Légifrance)",
          url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042841880",
        },
        {
          label: "Tri à la source des déchets d'entreprise (service-public.gouv.fr)",
          url: "https://entreprendre.service-public.gouv.fr/vosdroits/F37782",
        },
      ],
    },
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const data = SERVICES[params.slug];
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — HCE · Jura & Ain` },
          { name: "description", content: loaderData.seoDescription ?? loaderData.intro },
          { property: "og:title", content: `${loaderData.title} — HCE` },
          { property: "og:description", content: loaderData.seoDescription ?? loaderData.intro },
          { property: "og:image", content: `https://www.hcebtp.com${loaderData.hero}` },
          { property: "og:url", content: `https://www.hcebtp.com/services/${params.slug}` },
        ]
      : [{ title: "Service — HCE" }],
    links: loaderData
      ? [{ rel: "canonical", href: `https://www.hcebtp.com/services/${params.slug}` }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: loaderData.title,
              description: loaderData.intro,
              provider: {
                "@type": "LocalBusiness",
                "@id": "https://www.hcebtp.com/#business",
                name: "HCE",
                url: "https://www.hcebtp.com",
                telephone: "+33 3 84 52 61 48",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "40 avenue Etienne Lamy",
                  postalCode: "39300",
                  addressLocality: "Cize",
                  addressRegion: "Jura",
                  addressCountry: "FR",
                },
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Jura" },
                { "@type": "AdministrativeArea", name: "Ain" },
              ],
              url: `https://www.hcebtp.com/services/${params.slug}`,
            }),
          },
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
                  name: loaderData.title,
                  item: `https://www.hcebtp.com/services/${params.slug}`,
                },
              ],
            }),
          },
          /* FAQPage construit depuis le même tableau que la section visible
             plus bas dans la page : le balisage ne peut pas décrire une
             question qui ne serait pas rendue. */
          ...(loaderData.savoir
            ? [
                {
                  type: "application/ld+json",
                  children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: loaderData.savoir.qa.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  }),
                },
              ]
            : []),
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-display text-6xl text-gold">404</h1>
        <p className="mt-4 text-muted">Service introuvable.</p>
        <Link to="/" className="mt-8 inline-block label text-gold border-b border-gold/40 pb-1">— Retour à l'accueil</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>{error.message}</p>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { reload } = useSiteContentFields(HOME_SITE_ID);
  return (
    <EditModeProvider siteId={HOME_SITE_ID} onPublished={reload}>
      <ServicePageBody />
    </EditModeProvider>
  );
}

function ServicePageBody() {
  const data = Route.useLoaderData() as ServiceData;
  const { slug } = Route.useParams();
  const { get } = useSiteContent();
  const { get: getField } = useSiteContentFields(HOME_SITE_ID);
  const adminServices = get<Array<{ slug: string; img: string }>>("services", []);
  const override = adminServices.find((s) => s?.slug === slug)?.img;
  const heroImg = getField("service_images", slug, override && override.length > 0 ? override : data.hero);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <EditModeToolbar />
      <SmoothScroll />

      <main className="bg-background text-foreground overflow-x-hidden">
        {/* HEADER nav */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>HCE</Link>
            <Link to="/" className="label text-gold hover:text-foreground transition-colors">← Accueil</Link>
          </div>
        </header>

        {/* Sticky CTA desktop */}
        <div
          className="hidden md:block fixed z-40"
          style={{
            top: 78, right: 24,
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "translateY(0)" : "translateY(-10px)",
            pointerEvents: scrolled ? "auto" : "none",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Link
            to="/" hash="devis"

            className="cta-primary"
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s ease" }}
          >
            Demander un devis →
          </Link>
        </div>

        {/* HERO */}
        <section className="relative w-full h-[80vh] overflow-hidden">
          <EditableImage section="service_images" field={slug} value={heroImg}>
            {(url) => (
              <img
                src={url}
                alt={data.title}
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </EditableImage>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(14,14,15,0.35) 0%, rgba(14,14,15,0.55) 45%, rgba(14,14,15,0.92) 100%)" }}
          />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16">
            <div className="font-display text-gold" style={{ fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 300, lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>{data.n}</div>
            <h1 className="font-display text-foreground mt-2" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.5)" }}>{data.title}</h1>
            <p className="mt-6 max-w-2xl" style={{ fontSize: 18, lineHeight: 1.6, color: "#F4EFE6", textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>{data.intro}</p>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="label text-gold">— Ce que nous faisons</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400 }}>Nos prestations</h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {data.prestations.map((p) => (
              <li key={p} className="border-b border-gold/15 py-4 flex items-baseline gap-4">
                <span className="text-gold font-display" style={{ fontSize: 20 }}>—</span>
                <span className="text-foreground/90" style={{ fontSize: 17 }}>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* MID-PAGE CTA — bande sombre avec photo */}
        <section
          className="relative w-full overflow-hidden border-y border-gold/15"
          style={{ minHeight: 200, background: "var(--asphalte-900)" }}
        >
          <div className="relative z-10 px-6 py-14 md:py-16 text-center max-w-3xl mx-auto">
            <p className="font-display italic text-foreground" style={{ fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.3 }}>
              Vous avez un projet de <span className="text-gold">{data.title.toLowerCase()}</span> ?
            </p>
            <p className="mt-3 text-muted text-sm md:text-base">
              Devis détaillé · Visite gratuite · Garantie décennale
            </p>
            <div className="mt-7">
              <Link
                to="/" hash="devis"

                className="cta-primary"
                style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "14px 28px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" }}
              >
                Demander un devis pour ce projet →
              </Link>
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
          <div
            className={`grid grid-cols-1 gap-3 ${
              data.gallery.length <= 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : data.gallery.length === 4
                  ? "md:grid-cols-4"
                  : "md:grid-cols-3"
            }`}
          >
            {data.gallery.map((g) => (
              <div key={g} className="aspect-[4/3] overflow-hidden">
                <img src={optimizeImageUrl(g, 800)} alt={data.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* METHODE */}
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="label text-gold">— Notre méthode</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400 }}>Comment HCE travaille</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.methode.map((m, i) => (
              <article key={m.t} className="border-l-2 pl-6" style={{ borderColor: "var(--cuivre-500)" }}>
                <div className="font-display text-gold" style={{ fontSize: 48, fontWeight: 300, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-foreground mt-4" style={{ fontSize: 24, fontWeight: 400 }}>{m.t}</h3>
                <p className="mt-3 text-muted" style={{ lineHeight: 1.6 }}>{m.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CE QU'IL FAUT SAVOIR — questions réelles, réponses autonomes.
            Contenu rendu en clair et toujours monté : c'est lui que reprend le
            JSON-LD FAQPage de cette page (même tableau `savoir.qa`). */}
        {data.savoir && (
          <section className="px-6 md:px-12 py-24 md:py-32 max-w-4xl mx-auto border-t border-gold/15">
            <div className="label text-gold">— Ce qu'il faut savoir</div>
            <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05 }}>
              {data.savoir.heading}
            </h2>
            <p className="mt-6 text-muted max-w-3xl" style={{ fontSize: 17, lineHeight: 1.7 }}>
              {data.savoir.lead}
            </p>

            <div className="mt-14 space-y-12">
              {data.savoir.qa.map((f) => (
                <article key={f.q}>
                  <h3 className="font-display text-gold" style={{ fontSize: "clamp(21px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.25 }}>
                    {f.q}
                  </h3>
                  <p className="mt-4 text-foreground/90" style={{ fontSize: 17, lineHeight: 1.75 }}>
                    {f.a}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-16 border-t border-gold/15 pt-6 text-muted" style={{ fontSize: 14, lineHeight: 1.7 }}>
              <p>
                Dernière mise à jour :{" "}
                <time dateTime={data.savoir.updated}>{data.savoir.updatedLabel}</time>
              </p>
              <p className="mt-2">
                Sources :{" "}
                {data.savoir.sources.map((s, i) => (
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
        )}

        {/* CTA */}
        <section id="service-cta-bottom" className="relative px-6 md:px-12 py-32 text-center bg-surface">
          <div className="label text-gold">— Un projet ?</div>
          <h2 className="font-display mt-6 text-foreground max-w-3xl mx-auto" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.05 }}>
            Demander un devis pour <span className="italic text-gold">{data.title.toLowerCase()}</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link
              to="/" hash="devis"

              className="cta-primary"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "14px 28px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" }}
            >
              Demander un devis →
            </Link>
            <a
              href="tel:0384526148"

              className="cta-secondary"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "14px 28px", borderRadius: 4, background: "transparent", color: "var(--creme-50)", border: "1px solid var(--creme-50)", textDecoration: "none", transition: "all 0.2s ease" }}
            >
              📞 03 84 52 61 48
            </a>
          </div>
        </section>

        {/* FOOTER simplifié */}
        <footer className="px-6 md:px-12 py-12 text-center border-t border-gold/15" style={{ background: "var(--footer)" }}>
          <Link to="/" className="font-display text-gold text-3xl">HCE</Link>
          <p className="mt-3 text-muted text-sm">Cize, Jura · 03 84 52 61 48</p>
        </footer>
        <MobileFloatingCTA href="/#devis" />
      </main>
    </>
  );
}
