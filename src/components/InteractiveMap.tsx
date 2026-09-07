import { useEffect, useRef, useState } from "react";

const CITIES = [
  // Cize (39300, Jura), le siège réel — à ne pas confondre avec Cize (01250,
  // dans l'Ain) qui se trouve en 46.244/5.464, à ~55 km au sud.
  { name: "Cize", lat: 46.726, lng: 5.914, hq: true, chantiers: 120, desc: "Notre siège social. Atelier, dépôt machines et planning des équipes." },
  { name: "Lons-le-Saunier", lat: 46.674, lng: 5.554, chantiers: 85, desc: "Chantiers résidentiels et copropriétés. Devis détaillé." },
  { name: "Saint-Claude", lat: 46.387, lng: 5.864, chantiers: 42, desc: "Préparation de terrain et enrobé en zone montagne." },
  { name: "Champagnole", lat: 46.747, lng: 5.911, chantiers: 38, desc: "Cours, allées et parkings d'entreprise." },
  { name: "Bourg-en-Bresse", lat: 46.205, lng: 5.226, chantiers: 95, desc: "Voiries, parkings et zones commerciales." },
  { name: "Oyonnax", lat: 46.255, lng: 5.658, chantiers: 67, desc: "Plateformes industrielles et chantiers professionnels." },
];

// rough Jura+Ain coverage polygon (lng, lat reversed for Leaflet which expects [lat,lng])
const COVERAGE: [number, number][] = [
  [47.0, 5.05], [47.05, 5.55], [46.95, 6.10], [46.65, 6.25],
  [46.25, 6.10], [45.95, 5.85], [45.80, 5.55], [45.85, 5.20], [46.20, 5.00], [46.60, 5.00],
];

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let map: any = null;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !mapRef.current) return;

      map = L.map(mapRef.current, {
        center: [46.45, 5.55],
        zoom: 8,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // coverage polygon
      L.polygon(COVERAGE, {
        color: "var(--cuivre-500)",
        weight: 1,
        opacity: 0.5,
        fillColor: "var(--cuivre-500)",
        fillOpacity: 0.08,
      }).addTo(map);

      // city markers
      CITIES.forEach((c) => {
        const size = c.hq ? 22 : 14;
        const icon = L.divIcon({
          className: "hce-pin",
          html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:var(--cuivre-500);box-shadow:0 0 0 4px rgba(200,153,42,0.18),0 0 16px rgba(200,153,42,0.5);${c.hq ? "border:2px solid #fff;" : ""}"></span>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        const marker = L.marker([c.lat, c.lng], { icon }).addTo(map);
        marker.bindTooltip(
          `<div style="font-family:var(--font-body);font-size:12px;padding:2px 4px;"><strong style="color:var(--cuivre-500);letter-spacing:0.1em;text-transform:uppercase;font-size:10px;">${c.name}${c.hq ? " · Siège" : ""}</strong><br/><span style="color:#fff;">${c.chantiers} chantiers réalisés</span></div>`,
          { direction: "top", offset: [0, -size / 2], className: "hce-tooltip" }
        );
        marker.bindPopup(
          `<div style="font-family:var(--font-body);color:#fff;min-width:200px;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--cuivre-500);line-height:1;">${c.name}</div>
            <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A8A8A8;margin-top:4px;">${c.chantiers} chantiers</div>
            <p style="font-size:13px;line-height:1.5;margin-top:10px;color:#fff;">${c.desc}</p>
          </div>`,
          { className: "hce-popup" }
        );
      });

      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0 bg-surface" style={{ filter: ready ? "none" : "blur(4px)" }} />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="label text-gold">Chargement de la carte…</span>
        </div>
      )}
      <style>{`
        .hce-tooltip{background:var(--asphalte-900) !important;border:1px solid var(--cuivre-500) !important;color:#fff !important;border-radius:0 !important;box-shadow:0 4px 12px rgba(0,0,0,0.5) !important;}
        .hce-tooltip:before{display:none !important;}
        .hce-popup .leaflet-popup-content-wrapper{background:var(--asphalte-900);border:1px solid var(--cuivre-500);border-radius:0;color:#fff;}
        .hce-popup .leaflet-popup-tip{background:var(--cuivre-500);}
        .hce-popup .leaflet-popup-close-button{color:var(--cuivre-500) !important;font-size:18px !important;padding:6px 8px !important;}
        .leaflet-control-zoom a{background:var(--asphalte-900) !important;color:var(--cuivre-500) !important;border:1px solid #2E2E2E !important;}
        .leaflet-control-zoom a:hover{background:#262626 !important;}
      `}</style>
    </div>
  );
}
