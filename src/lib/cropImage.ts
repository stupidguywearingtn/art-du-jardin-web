/**
 * Redimensionnement d'une image côté client (<canvas>), avant upload vers
 * Supabase Storage. Jusqu'au 19/11/2026 les photos étaient recadrées en 4:5
 * (cropCover, supprimé) : le client perdait ses plans larges.
 */

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
