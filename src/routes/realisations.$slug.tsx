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
 * page : aucun mismatch possible. Le dossier `chantier-en-cours` n'a pas encore
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
  "cour-allee-privee": {
    heading:
      "Goudronner une cour ou une allée de maison : les questions qui se posent avant le devis",
    lead: "Une cour privée s'arrête rarement à la limite de la propriété : elle se raccorde à une route, traverse parfois un fossé, et dessert quelquefois plusieurs maisons. Ces trois points relèvent de textes précis, et ce sont eux qui décident du calendrier du chantier bien plus que la météo. Voici cinq questions à trancher avant de signer, avec les textes applicables.",
    updated: "2026-09-23",
    updatedLabel: "23 septembre 2026",
    qa: [
      {
        q: "Faut-il une autorisation pour raccorder une allée privée à la route ?",
        a: "Oui, dès que les travaux touchent la route elle-même — bordure, accotement, trottoir, fossé — et non pas seulement quand on refait l'intérieur de la propriété. L'article L113-2 du code de la voirie routière, en vigueur depuis le 28 décembre 2007, pose la règle : « l'occupation du domaine public routier n'est autorisée que si elle a fait l'objet, soit d'une permission de voirie dans le cas où elle donne lieu à emprise, soit d'un permis de stationnement dans les autres cas. Ces autorisations sont délivrées à titre précaire et révocable. » Deux conséquences pratiques. D'abord, la demande se fait auprès du gestionnaire de la voie concernée : l'article L111-1 du même code définit le domaine public routier comme « l'ensemble des biens du domaine public de l'Etat, des départements et des communes affectés aux besoins de la circulation terrestre » — ce n'est donc pas toujours la mairie, et une entrée sur route départementale ne se traite pas au même guichet qu'une entrée sur voie communale. Ensuite, « précaire et révocable » n'est pas une formule de style : l'autorisation obtenue n'est pas un droit acquis sur la route. Le partage est simple à retenir : ce qui est chez vous est à vous, ce qui déborde sur la route se demande.",
      },
      {
        q: "Peut-on buser le fossé qui longe la route pour élargir son entrée ?",
        a: "Pas de sa propre initiative : un fossé de bord de route est une dépendance du domaine public routier, pas un morceau du terrain riverain. Le buser ou le combler crée une emprise, et relève donc de la permission de voirie de l'article L113-2. Le faire sans l'avoir demandée est une contravention de la cinquième classe au titre de l'article R*116-2 du code de la voirie routière, en vigueur depuis le 1er mars 1994, qui vise ceux qui « sans autorisation, auront empiété sur le domaine public routier ou accompli un acte portant ou de nature à porter atteinte à l'intégrité de ce domaine ou de ses dépendances » (1°) et ceux qui, « sans autorisation préalable, auront exécuté un travail sur le domaine public routier » (6°). L'amende encourue pour la cinquième classe est de 1 500 € au plus, portée à 3 000 € en cas de récidive lorsque le règlement le prévoit, selon l'article 131-13 du code pénal. C'est la raison pour laquelle un chantier d'accès commence par une question administrative et non par un coup de pelle : le délai d'instruction du gestionnaire de voirie doit être intégré au planning dès la visite, sinon c'est lui qui décale la pose.",
      },
      {
        q: "Une entreprise sonne à la porte et propose du goudronnage « avec l'enrobé qui reste » : que dit la loi ?",
        a: "Trois règles s'appliquent à tout contrat signé chez vous, et elles sont vérifiables sur-le-champ. Un : le professionnel ne peut rien encaisser tout de suite. L'article L221-10 du code de la consommation, en vigueur depuis le 1er juillet 2016, dispose que « le professionnel ne peut recevoir aucun paiement ou aucune contrepartie, sous quelque forme que ce soit, de la part du consommateur avant l'expiration d'un délai de sept jours à compter de la conclusion du contrat hors établissement ». Deux : vous disposez de quatorze jours pour vous rétracter sans avoir à vous justifier (article L221-18 du même code) — et si l'entreprise a omis de vous informer de ce droit, le délai est prolongé de douze mois. Trois : le contrat doit être écrit, daté, signé des deux parties et accompagné d'un formulaire de rétractation. La fiche officielle « Démarchage à domicile : règles à respecter » de service-public.gouv.fr rappelle que l'encaissement avant sept jours est puni de deux ans d'emprisonnement et de 150 000 € d'amende. Ces trois règles s'imposent à toute entreprise qui vient chez vous, HCE comprise : un devis détaillé remis pour être relu au calme, daté, et aucune somme encaissée le jour même. Une pression à signer et à payer immédiatement, au motif qu'il resterait de l'enrobé d'un chantier voisin, est incompatible avec ces textes.",
      },
      {
        q: "Qui paie le goudronnage d'un chemin d'accès partagé entre plusieurs maisons ?",
        a: "En l'absence de clause contraire, celui qui bénéficie du passage, pas celui dont le terrain le supporte. Le code civil est explicite en deux articles : « celui auquel est due une servitude a droit de faire tous les ouvrages nécessaires pour en user et pour la conserver » (article 697), et « ces ouvrages sont à ses frais, et non à ceux du propriétaire du fonds assujetti, à moins que le titre d'établissement de la servitude ne dise le contraire » (article 698). Autrement dit, empierrer ou enrober un chemin de desserte est un droit du bénéficiaire, à sa charge, sauf si l'acte qui a créé la servitude en décide autrement — d'où la première chose à faire : relire cet acte. Quand le terrain n'a aucune issue sur la voie publique, c'est l'article 682 qui joue : le propriétaire enclavé « est fondé à réclamer sur les fonds de ses voisins un passage suffisant pour assurer la desserte complète de ses fonds, à charge d'une indemnité proportionnée au dommage qu'il peut occasionner ». Côté chantier, cela a une conséquence très concrète : avant de chiffrer un accès partagé, il faut savoir qui commande, qui paie et sur quelle largeur le passage est établi, sinon le devis porte sur une surface que personne n'assume.",
      },
      {
        q: "L'eau d'une cour goudronnée peut-elle être renvoyée vers la route ?",
        a: "C'est la pente à éviter, et le motif est d'abord réglementaire. Le même article R*116-2 du code de la voirie routière punit d'une amende de cinquième classe ceux qui « auront laissé écouler ou auront répandu ou jeté sur les voies publiques des substances susceptibles de nuire à la salubrité et à la sécurité publiques ou d'incommoder le public » (4°). Une cour imperméabilisée qui déverse son ruissellement sur la chaussée relève de cette logique — et dans le Jura, le risque n'est pas théorique : ce qui s'écoule sur la route en novembre y gèle en décembre, à l'endroit précis où les véhicules freinent pour tourner. La règle de conception qui en découle est simple : une cour se pente vers un exutoire situé sur la propriété — caniveau, grille, noue, puits d'infiltration — et jamais vers la voie publique par défaut. C'est un point à arrêter au plan, avant le décaissement : une fois l'enrobé posé et compacté, une pente ne se corrige pas, elle se refait.",
      },
    ],
    sources: [
      {
        label:
          "Article L113-2 du code de la voirie routière — permission de voirie et permis de stationnement (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000017924078",
      },
      {
        label:
          "Article R*116-2 du code de la voirie routière — contraventions de voirie (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006398642",
      },
      {
        label:
          "Article L221-10 du code de la consommation — pas de paiement avant sept jours (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226864",
      },
      {
        label: "Démarchage à domicile : règles à respecter (entreprendre.service-public.gouv.fr)",
        url: "https://entreprendre.service-public.gouv.fr/vosdroits/F23224",
      },
      {
        label: "Articles 697 et 698 du code civil — ouvrages et frais d'une servitude (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070721/LEGISCTA000006150128/",
      },
    ],
  },
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
  "preparation-terrassement": {
    heading: "Terrasser un terrain : ce qui se règle sur le papier avant le premier coup de godet",
    lead: "Un terrassement se prépare autant au bureau que sur le terrain. Selon la profondeur et la surface remuées, il relève d'une déclaration en mairie ; il se déroule presque toujours à quelques mètres d'un voisin ; et ce qui sort du sol — une limite mal placée, une argile gonflante, un vestige — peut arrêter le chantier net. Voici cinq points à trancher avant de faire venir la pelle, avec les textes applicables. Les déclarations de réseaux (DT-DICT), le devenir des terres évacuées et le compactage par couches sont traités à part, sur la page Préparation de terrain.",
    updated: "2026-09-24",
    updatedLabel: "24 septembre 2026",
    qa: [
      {
        q: "Faut-il une autorisation pour décaisser ou remblayer un terrain ?",
        a: "Au-delà d'un double seuil, oui ; en dessous, non — et les deux conditions sont cumulatives. Une déclaration préalable est exigée quand le terrassement dépasse deux mètres de profondeur (ou de hauteur, s'il s'agit d'un remblai) et porte sur au moins cent mètres carrés. Si l'un des deux seuils n'est pas atteint, aucune formalité d'urbanisme n'est due à ce titre. Le texte est l'article R*421-23 du code de l'urbanisme, en vigueur depuis le 1er janvier 2016, qui soumet à déclaration préalable, « à moins qu'ils ne soient nécessaires à l'exécution d'un permis de construire, les affouillements et exhaussements du sol dont la hauteur, s'il s'agit d'un exhaussement, ou la profondeur dans le cas d'un affouillement, excède deux mètres et qui portent sur une superficie supérieure ou égale à cent mètres carrés » (f). Un cran au-dessus, c'est un permis d'aménager qu'il faut : l'article R*421-19 k) du même code vise les mêmes travaux lorsqu'ils « portent sur une superficie supérieure ou égale à deux hectares ». Deux remarques pratiques. D'abord, l'exception compte autant que la règle : un décaissement nécessaire à l'exécution d'un permis de construire est déjà couvert par ce permis, il n'y a pas de déclaration à refaire. Ensuite, ces seuils sont nationaux : c'est en mairie, au service urbanisme, que l'on vérifie ce que le document d'urbanisme local ajoute pour la parcelle concernée.",
      },
      {
        q: "Comment être sûr de la limite de propriété avant de faire venir la pelle ?",
        a: "En faisant borner le terrain — et c'est un droit que l'on peut imposer à son voisin, pas une faveur à négocier. L'article 646 du code civil, en vigueur depuis le 21 mars 1804 et jamais modifié depuis, tient en deux phrases : « Tout propriétaire peut obliger son voisin au bornage de leurs propriétés contiguës. Le bornage se fait à frais communs. » Le voisin ne peut donc pas refuser, et la dépense se partage entre les deux. Pourquoi cela se joue avant le terrassement et non après : un décaissement suit une limite, et une plateforme, une bordure ou un mur posés à partir d'une limite fausse ne se rattrapent pas au réglage — ils se déposent. Une clôture, une haie ou un ancien muret ne valent pas bornage : ce sont des ouvrages, pas des points de droit. En pratique, les bornes existantes se repèrent et se relèvent avant l'ouverture du sol, car une borne arrachée par un godet ne se replace pas à l'estime : elle est remise en place par un géomètre-expert.",
      },
      {
        q: "Le terrassement peut-il causer un litige avec le voisin, et qui en répond ?",
        a: "Oui, et depuis le 15 avril 2024 la règle est écrite noir sur blanc dans le code civil — elle vise d'ailleurs le maître d'ouvrage, c'est-à-dire celui qui commande les travaux, et pas seulement l'entreprise qui les exécute. L'article 1253, en vigueur depuis le 17 avril 2024, dispose que « le propriétaire, le locataire, l'occupant sans titre, le bénéficiaire d'un titre ayant pour objet principal de l'autoriser à occuper ou à exploiter un fonds, le maître d'ouvrage ou celui qui en exerce les pouvoirs qui est à l'origine d'un trouble excédant les inconvénients normaux de voisinage est responsable de plein droit du dommage qui en résulte ». « De plein droit » est le mot important : il n'y a pas de faute à prouver, seulement un trouble anormal et un dommage. Sur un chantier de terrassement, les sujets concrets sont toujours les mêmes : vibrations, poussière, boue laissée sur la chaussée, stationnement des engins, eaux détournées pendant les travaux. Ce que cela change dans l'organisation du chantier : prévenir les voisins de la période et de la durée, caler l'accès des camions, nettoyer la voie en fin de journée, et ne pas laisser un merlon de terre s'égoutter chez le voisin en attendant l'évacuation. Le second alinéa du même article réserve le cas des activités antérieures à l'arrivée de la personne lésée, à condition qu'elles soient conformes aux lois et règlements et qu'elles se soient poursuivies sans aggravation du trouble — une antériorité, donc, qui ne couvre pas un chantier nouveau.",
      },
      {
        q: "On a mis au jour quelque chose en creusant : faut-il le déclarer ?",
        a: "Oui, immédiatement au maire, et l'obligation pèse sur deux personnes à la fois : celui qui découvre et le propriétaire du terrain. Le chantier ne reprend pas comme si de rien n'était. L'article L531-14 du code du patrimoine, en vigueur depuis le 24 février 2004, vise le cas où, « par suite de travaux ou d'un fait quelconque, des monuments, des ruines, substructions, mosaïques, éléments de canalisation antique, vestiges d'habitation ou de sépulture anciennes, des inscriptions ou généralement des objets pouvant intéresser la préhistoire, l'histoire, l'art, l'archéologie ou la numismatique sont mis au jour » : l'inventeur et le propriétaire « sont tenus d'en faire la déclaration immédiate au maire », qui transmet sans délai au préfet, lequel saisit l'autorité compétente en matière d'archéologie. La suite dépend de ce qui a été trouvé : aux termes de l'article L531-15, si la poursuite des recherches présente un intérêt public au point de vue de la préhistoire, de l'histoire, de l'art ou de l'archéologie, « les fouilles ne peuvent être poursuivies que par l'Etat ou après autorisation de l'Etat ». À retenir : la liste du texte est large — une canalisation ancienne ou des fondations en pierre suffisent, il n'est pas question que de trésors — et la déclaration est le seul moyen de sécuriser la reprise du chantier.",
      },
      {
        q: "Mon terrain est-il argileux, et qu'est-ce que ça change avant de terrasser ?",
        a: "Cela se vérifie gratuitement, carte à l'appui, sur le site public Géorisques, et la réponse a une portée réglementaire : seules les zones classées en exposition moyenne ou forte au retrait-gonflement des sols argileux sont concernées par le dispositif. C'est l'arrêté du 22 juillet 2020 définissant les zones exposées au phénomène de mouvement de terrain différentiel consécutif à la sécheresse et à la réhydratation des sols argileux, entré en vigueur le 10 août 2020, qui fixe ce zonage : l'exposition des formations argileuses y est évaluée sur trois critères — la nature lithologique des terrains, leur composition minéralogique et leur comportement géotechnique — et son article 2 précise que les zones d'exposition faible ne sont pas visées par le dispositif du code de la construction et de l'habitation. Ce que cela implique juridiquement porte sur la vente, pas sur les travaux : « en cas de vente d'un terrain non bâti constructible, une étude géotechnique préalable est fournie par le vendeur » (article L132-5 du code de la construction et de l'habitation, en vigueur depuis le 1er juillet 2021), étude qui « reste annexée au titre de propriété du terrain et suit les mutations successives de celui-ci ». La conséquence pratique est celle-là : sur un terrain acquis non bâti en zone moyenne ou forte, cette étude existe déjà et voyage avec le titre de propriété — c'est le document à ressortir avant de terrasser, plutôt qu'une étude à commander. Son objet, défini par l'article R132-4 du même code, est de « procéder à une première identification des risques géotechniques d'un site et à la définition des principes généraux de construction ». HCE ne réalise pas ces études géotechniques : elle terrasse, draine et prépare les plateformes — mais savoir si la parcelle est en zone argileuse avant de dessiner les niveaux évite de découvrir le sujet une fois le sol ouvert.",
      },
    ],
    sources: [
      {
        label:
          "Article R*421-23 du code de l'urbanisme — affouillements et exhaussements soumis à déclaration préalable (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031764703",
      },
      {
        label: "Article R*421-19 du code de l'urbanisme — seuil du permis d'aménager (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000034355339",
      },
      {
        label: "Article 646 du code civil — droit au bornage, à frais communs (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006429902",
      },
      {
        label:
          "Article 1253 du code civil — troubles anormaux du voisinage, loi n° 2024-346 du 15 avril 2024 (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006437138",
      },
      {
        label:
          "Articles L531-14 et L531-15 du code du patrimoine — découvertes fortuites (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074236/LEGISCTA000006177313",
      },
      {
        label:
          "Arrêté du 22 juillet 2020 définissant les zones exposées au retrait-gonflement des sols argileux (Légifrance)",
        url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042220805",
      },
      {
        label:
          "Article L132-5 du code de la construction et de l'habitation — étude géotechnique préalable (Légifrance)",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041588033",
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
