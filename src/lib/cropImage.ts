/**
 * Recadrage + redimensionnement d'une image côté client (<canvas>), avant
 * upload vers Supabase Storage.
 *
 * Toutes les galeries HCE (grille d'accueil « Nos réalisations », pages
 * /realisations/{slug}, page Avant / Après) partagent **un seul format** :
 * portrait 4:5. Peu importe le fichier envoyé depuis l'admin, il est ramené
 * à ce ratio par un recadrage « cover » centré — le rendu reste homogène
 * sur toutes les cartes.
 */

/** Largeur cible du format galerie unique (px). */
export const GALLERY_W = 1600;
/** Hauteur cible du format galerie unique (px) — ratio 4:5. */
export const GALLERY_H = 2000;

/**
 * Recadre `file` au format `targetW × targetH` (défaut 1600×2000, 4:5) via un
 * canvas, en mode « cover » (l'image remplit toute la cible, le débordement
 * est rogné, cadrage centré). Renvoie un nouveau `File` JPEG.
 *
 * Ne dépend d'aucune lib externe. Rejette si le fichier n'est pas une image
 * ou si le navigateur ne peut pas la décoder — l'appelant peut alors
 * retomber sur le fichier d'origine.
 */
export function cropCover(
  file: File,
  targetW = GALLERY_W,
  targetH = GALLERY_H,
  quality = 0.82,
): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Le fichier n'est pas une image"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image illisible"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas indisponible"));
          return;
        }
        // « cover » : on prend l'échelle qui remplit la cible dans les deux axes.
        const scale = Math.max(targetW / img.width, targetH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, (targetW - drawW) / 2, (targetH - drawH) / 2, drawW, drawH);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Encodage de l'image échoué"));
              return;
            }
            const base = file.name.replace(/\.[^.]+$/, "") || "photo";
            resolve(new File([blob], `${base}.jpg`, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality,
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/** Côté le plus long (px) des photos de réalisation envoyées depuis l'admin. */
export const GALLERY_MAX = 2000;

/**
 * 19/11/2026 (demande client) : redimensionne SANS recadrer — la photo garde
 * son cadrage d'origine (paysage, portrait, panoramique). Seul le côté le plus
 * long est ramené à `maxSide` px pour alléger l'upload. La grille affiche
 * toujours des vignettes 4:5 homogènes (object-cover) ; la visionneuse, elle,
 * montre la photo entière dans son vrai format.
 */
export function resizeKeepRatio(file: File, maxSide = GALLERY_MAX, quality = 0.85): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Le fichier n'est pas une image"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image illisible"));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas indisponible"));
          return;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Encodage de l'image échoué"));
              return;
            }
            const base = file.name.replace(/\.[^.]+$/, "") || "photo";
            resolve(new File([blob], `${base}.jpg`, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality,
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
