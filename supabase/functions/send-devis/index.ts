/**
 * Edge function : envoi d'une demande de devis HCE par email via Resend.
 *
 * Variables d'environnement requises (à configurer dans Supabase) :
 *  - RESEND_API_KEY      : clé API Resend (re_…)
 *  - DEVIS_TO_EMAIL      : email destinataire (par défaut yanisouammou063@gmail.com)
 *  - DEVIS_FROM_EMAIL    : adresse expéditeur Resend (par défaut onboarding@resend.dev,
 *                          à remplacer par un domaine vérifié pour la prod)
 *
 * Appelée depuis le client :
 *   supabase.functions.invoke("send-devis", { body: { ...payload } })
 */

// @ts-nocheck (Deno env, pas Node)
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Payload = {
  project_type_label?: string;
  length_m?: number | null;
  width_m?: number | null;
  estimated_surface_m2?: number | null;
  free_dimensions?: string | null;
  name: string;
  phone: string;
  email: string;
  postal_code?: string | null;
  city?: string | null;
  description?: string | null;
};

function htmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(p: Payload) {
  const surfaceStr = p.estimated_surface_m2 != null
    ? `~${p.estimated_surface_m2} m² (${p.length_m} × ${p.width_m})`
    : (p.free_dimensions || "non précisée");

  const lines: Array<[string, string | undefined | null]> = [
    ["Type de projet", p.project_type_label],
    ["Surface estimée", surfaceStr],
    ["Nom", p.name],
    ["Téléphone", p.phone],
    ["Email", p.email],
    ["Ville", p.city],
    ["Code postal", p.postal_code],
  ];

  const rows = lines
    .filter(([, v]) => v && String(v).trim() !== "")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;font-weight:600;">${k}</td><td style="padding:6px 12px;">${htmlEscape(String(v))}</td></tr>`)
    .join("");

  const message = p.description?.trim()
    ? `<div style="margin-top:24px;padding:16px;background:#f7f3eb;border-left:4px solid #8a5a3c;"><div style="font-weight:600;color:#666;margin-bottom:8px;">Message :</div><div style="white-space:pre-wrap;">${htmlEscape(p.description)}</div></div>`
    : "";

  const html = `<!doctype html><html><body style="font-family:Inter,sans-serif;background:#f4efe6;padding:24px;margin:0;">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e7dfd0;">
      <div style="background:#0e0e0f;color:#c8a55b;padding:20px;font-family:Georgia,serif;font-size:24px;">HCE — Nouvelle demande de devis</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222;">${rows}</table>
      <div style="padding:0 12px 16px;">${message}</div>
      <div style="padding:16px;color:#999;font-size:12px;border-top:1px solid #eee;">
        Envoyé depuis le formulaire devis du site HCE.
      </div>
    </div></body></html>`;

  const text = lines.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`).join("\n") +
    (p.description ? `\n\nMessage :\n${p.description}` : "");

  return { html, text };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const TO = Deno.env.get("DEVIS_TO_EMAIL") ?? "yanisouammou063@gmail.com";
  const FROM = Deno.env.get("DEVIS_FROM_EMAIL") ?? "HCE Devis <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  if (!payload?.name || !payload?.email || !payload?.phone) {
    return new Response(JSON.stringify({ error: "name, email, phone required" }), {
      status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const { html, text } = buildEmail(payload);
  const subject = `Devis HCE — ${payload.project_type_label ?? payload.name}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: payload.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(JSON.stringify({ error: errText }), {
      status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify({ ok: true, id: data.id }), {
    status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
