/**
 * Auto-seed des tables Supabase éditables.
 * Appelé depuis chaque éditeur admin au premier chargement si la table est vide.
 * Idempotent : ne fait rien si la table contient déjà des lignes.
 * Tous les inserts requièrent un compte admin (RLS).
 */

import { supabase } from "./client";

export async function ensureWhyUsSeeded(): Promise<boolean> {
  const { data: existingSec } = await supabase.from("why_us_section").select("id").eq("id", 1).maybeSingle();
  if (!existingSec) {
    await supabase.from("why_us_section").upsert({
      id: 1,
      tag: "— Pourquoi HCE",
      title: "Quatre raisons, une certitude.",
      cta_text: "Convaincu ? Recevez un devis personnalisé.",
    });
  }
  const { count } = await supabase.from("why_us_cards").select("*", { head: true, count: "exact" });
  if ((count ?? 0) === 0) {
    await supabase.from("why_us_cards").insert([
      { title: "Enrobé à chaud", description: "Pose à la main à 180°C, compactage maîtrisé pour une durabilité maximale.", icon_name: "flame", display_order: 1, active: true },
      { title: "1000+ chantiers", description: "Plus de 1000 chantiers réalisés dans le Jura et l'Ain depuis 2012, 14 années d'expérience.", icon_name: "star", display_order: 2, active: true },
      { title: "Devis détaillé", description: "Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.", icon_name: "file-text", display_order: 3, active: true },
      { title: "Finitions soignées", description: "Bords nets, raccords maîtrisés, surface plane et homogène jusqu'à la dernière passe.", icon_name: "shield-check", display_order: 4, active: true },
    ]);
  }
  return true;
}

export async function ensureServiceAreaSeeded(): Promise<boolean> {
  const { data: existingSec } = await supabase.from("service_area").select("id").eq("id", 1).maybeSingle();
  if (!existingSec) {
    await supabase.from("service_area").upsert({
      id: 1,
      tag: "— Zone d'intervention",
      title: "Jura & Ain, depuis Cize.",
      description: "HCE intervient autour de Cize pour les cours, allées, parkings, travaux de terrassement et finitions extérieures.",
      cta_text: "Votre commune n'est pas listée ? On se déplace jusqu'à 60 km.",
    });
  }
  const { count } = await supabase.from("service_area_cities").select("*", { head: true, count: "exact" });
  if ((count ?? 0) === 0) {
    await supabase.from("service_area_cities").insert([
      { name: "Cize", is_headquarters: true, display_order: 1 },
      { name: "Lons-le-Saunier", is_headquarters: false, display_order: 2 },
      { name: "Saint-Claude", is_headquarters: false, display_order: 3 },
      { name: "Champagnole", is_headquarters: false, display_order: 4 },
      { name: "Bourg-en-Bresse", is_headquarters: false, display_order: 5 },
      { name: "Oyonnax", is_headquarters: false, display_order: 6 },
      { name: "Nantua", is_headquarters: false, display_order: 7 },
      { name: "Pont-d'Ain", is_headquarters: false, display_order: 8 },
    ]);
  }
  return true;
}

export async function ensureGallerySectionSeeded(): Promise<boolean> {
  const { data } = await supabase.from("gallery_section").select("id").eq("id", 1).maybeSingle();
  if (!data) {
    await supabase.from("gallery_section").upsert({
      id: 1,
      subtitle: "— Plus de 1000 chantiers livrés depuis 2012",
      title: "Nos réalisations.",
    });
  }
  return true;
}

export async function ensureQuoteSectionSeeded(): Promise<boolean> {
  const { data } = await supabase.from("quote_section").select("id").eq("id", 1).maybeSingle();
  if (!data) {
    await supabase.from("quote_section").upsert({
      id: 1,
      tag: "— Demande de devis",
      title: "Estimez votre projet",
      subtitle: "en 90 secondes.",
    });
  }
  return true;
}

export async function ensureProjectTypesSeeded(): Promise<boolean> {
  const { count } = await supabase.from("project_types").select("*", { head: true, count: "exact" });
  if ((count ?? 0) === 0) {
    await supabase.from("project_types").insert([
      { slug: "cour", label: "Cour privée", description: "Enrobé à chaud, allée + bordure + finition.", price_from: 65, price_unit: "€/m²", show_price: true, display_order: 1, active: true },
      { slug: "allee", label: "Allée", description: "Pose, bordures et finition soignée.", price_from: 75, price_unit: "€/m²", show_price: true, display_order: 2, active: true },
      { slug: "parking", label: "Parking pro", description: "Voirie, poids-lourds possible.", price_from: 55, price_unit: "€/m²", show_price: true, display_order: 3, active: true },
      { slug: "preparation", label: "Préparation seule", description: "Décaissement + nivellement.", price_from: 30, price_unit: "€/m²", show_price: true, display_order: 4, active: true },
    ]);
  }
  return true;
}

/**
 * Initialise les 5 catégories de galerie ET les 25 photos.
 * Si les catégories existent déjà, on ne touche pas aux photos (préservation
 * des uploads admin existants).
 */
export async function ensureGallerySeeded(): Promise<boolean> {
  const { data: existingCats } = await supabase.from("gallery_categories").select("id").limit(1);
  const catsExist = (existingCats ?? []).length > 0;

  let catMap: Record<string, string> = {};

  if (!catsExist) {
    const { data: inserted, error } = await supabase
      .from("gallery_categories")
      .insert([
        { slug: "cour-allee-privee", title: "Cour & allée privée", description: "Cours résidentielles et allées privées en enrobé à chaud, finitions soignées.", cover_url: "/photos/15-cour-golden-hour.jpg", display_order: 1, active: true },
        { slug: "parking-voirie-pro", title: "Parking & voirie pro", description: "Parkings d'entreprise, voiries de copropriété, plateformes industrielles.", cover_url: "/photos/26-pro-batiment-commercial.jpg", display_order: 2, active: true },
        { slug: "preparation-terrassement", title: "Préparation & terrassement", description: "Décaissement, nivellement, drainage et préparation de plateformes.", cover_url: "/photos/06-chantier-bobcat-preparation.jpg", display_order: 3, active: true },
        { slug: "details-finitions", title: "Détails & finitions", description: "Médaillons, pavés, bordures, raccords millimétriques.", cover_url: "/photos/02-hero-medaillon-paves.jpg", display_order: 4, active: true },
        { slug: "chantier-en-cours", title: "Chantier en cours", description: "HCE à l'œuvre — pose, compactage, équipe en action.", cover_url: "/photos/01-hero-finisseur-vapeur-sunset.jpg", display_order: 5, active: true },
      ])
      .select();
    if (error) {
      console.error("seed gallery_categories:", error);
      return false;
    }
    for (const c of inserted ?? []) catMap[c.slug] = c.id;
  } else {
    const { data: allCats } = await supabase.from("gallery_categories").select("id, slug");
    for (const c of allCats ?? []) catMap[c.slug] = c.id;
  }

  // Photos : seulement si la table est complètement vide
  const { count: photoCount } = await supabase.from("gallery_photos").select("*", { head: true, count: "exact" });
  if ((photoCount ?? 0) === 0) {
    const rows: Array<{ url: string; alt_text: string; category_id: string; display_order: number }> = [];
    const cour = catMap["cour-allee-privee"];
    if (cour) {
      const courFiles = [
        "11-cour-courbe-ciel", "12-cour-courbe-muret-pierre", "13-cour-parking-muret", "14-cour-maison-volets-rouges",
        "15-cour-golden-hour", "16-cour-maison-blanche-ciel-bleu", "17-cour-arbres-automne", "18-cour-allee-entre-maisons",
        "19-cour-batiment-bois", "20-cour-maison-beige-frontal", "21-cour-maison-moderne-blanche", "22-cour-maison-blanche-garage",
        "23-cour-courbe-arbres", "24-cour-maison-plain-pied", "25-cour-allee-curve-garage",
      ];
      courFiles.forEach((f, i) => rows.push({ url: `/photos/${f}.jpg`, alt_text: "Cour résidentielle en enrobé HCE", category_id: cour, display_order: i }));
    }
    const pro = catMap["parking-voirie-pro"];
    if (pro) {
      rows.push({ url: "/photos/08-chantier-plaque-vibrante.jpg", alt_text: "Compactage à la plaque vibrante sur parking", category_id: pro, display_order: 0 });
      rows.push({ url: "/photos/26-pro-batiment-commercial.jpg", alt_text: "Parking enrobé devant bâtiment commercial", category_id: pro, display_order: 1 });
    }
    const prep = catMap["preparation-terrassement"];
    if (prep) {
      rows.push({ url: "/photos/06-chantier-bobcat-preparation.jpg", alt_text: "Mini-pelle Bobcat en préparation de terrain à Cize", category_id: prep, display_order: 0 });
      rows.push({ url: "/photos/07-chantier-terrain-brouette.jpg", alt_text: "Préparation manuelle du terrain avant pose", category_id: prep, display_order: 1 });
    }
    const det = catMap["details-finitions"];
    if (det) {
      rows.push({ url: "/photos/02-hero-medaillon-paves.jpg", alt_text: "Médaillon de pavés intégré dans l'enrobé", category_id: det, display_order: 0 });
      rows.push({ url: "/photos/09-detail-bordure-beton.jpg", alt_text: "Bordure béton coulée HCE", category_id: det, display_order: 1 });
      rows.push({ url: "/photos/10-detail-texture-enrobe-frais.jpg", alt_text: "Texture enrobé à chaud fraîchement posé", category_id: det, display_order: 2 });
    }
    const ch = catMap["chantier-en-cours"];
    if (ch) {
      rows.push({ url: "/photos/01-hero-finisseur-vapeur-sunset.jpg", alt_text: "HCE en cours de pose à la main", category_id: ch, display_order: 0 });
      rows.push({ url: "/photos/03-hero-rouleau-compacteur.jpg", alt_text: "Rouleau compacteur sur chantier HCE", category_id: ch, display_order: 1 });
      rows.push({ url: "/photos/04-hero-golden-hour.jpg", alt_text: "Chantier HCE en golden hour", category_id: ch, display_order: 2 });
    }
    if (rows.length > 0) {
      const { error } = await supabase.from("gallery_photos").insert(rows);
      if (error) {
        console.error("seed gallery_photos:", error);
        return false;
      }
    }
  }

  return true;
}
