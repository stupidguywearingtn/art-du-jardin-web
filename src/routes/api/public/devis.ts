import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const TEMPLATE_NAME = 'devis-notification'

const PayloadSchema = z.object({
  project_type_slug: z.string().max(64).nullable().optional(),
  project_type_label: z.string().max(120).nullable().optional(),
  length_m: z.number().positive().max(10000).nullable().optional(),
  width_m: z.number().positive().max(10000).nullable().optional(),
  estimated_surface_m2: z.number().positive().max(1_000_000).nullable().optional(),
  free_dimensions: z.string().max(500).nullable().optional(),
  description: z.string().max(4000).nullable().optional(),
  name: z.string().min(1).max(120),
  phone: z.string().min(1).max(40),
  email: z.string().email().max(200),
  postal_code: z.string().max(20).nullable().optional(),
  city: z.string().max(120).nullable().optional(),
})

export const Route = createFileRoute('/api/public/devis')({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }),
      POST: async ({ request }) => {
        const cors = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !serviceKey) {
          return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers: cors })
        }

        let raw: unknown
        try {
          raw = await request.json()
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors })
        }

        const parsed = PayloadSchema.safeParse(raw)
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: 'Invalid payload', issues: parsed.error.issues }), { status: 400, headers: cors })
        }
        const p = parsed.data

        const supabase = createClient(supabaseUrl, serviceKey)

        // 1) Archive en base
        const { error: insertError } = await supabase.from('devis_requests').insert(p as any)
        if (insertError) {
          console.warn('devis_requests insert failed', insertError.message)
        }

        // 2) Préparer email
        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template) {
          return new Response(JSON.stringify({ error: 'Email template missing' }), { status: 500, headers: cors })
        }
        const surfaceStr =
          p.estimated_surface_m2 != null
            ? `${p.estimated_surface_m2} m²${p.length_m && p.width_m ? ` (${p.length_m} × ${p.width_m})` : ''}`
            : p.free_dimensions || 'non précisée'

        const templateData = {
          projectType: p.project_type_label || p.project_type_slug || '—',
          surface: surfaceStr,
          name: p.name,
          email: p.email,
          phone: p.phone,
          city: p.city || '',
          postalCode: p.postal_code || '',
          message: p.description || '',
        }

        const to = template.to
        if (!to) {
          return new Response(JSON.stringify({ error: 'No recipient configured' }), { status: 500, headers: cors })
        }

        const element = React.createElement(template.component as any, templateData)
        const html = await render(element)
        const plainText = await render(element, { plainText: true })
        const subject =
          typeof template.subject === 'function'
            ? template.subject(templateData)
            : template.subject

        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
          console.error('RESEND_API_KEY missing — devis archivé mais email non envoyé')
          return new Response(JSON.stringify({ ok: true, emailed: false }), { status: 200, headers: cors })
        }

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'HCE BTP <devis@hcebtp.com>',
            to: [to],
            reply_to: p.email,
            subject,
            html,
            text: plainText,
          }),
        })

        if (!resendRes.ok) {
          const errText = await resendRes.text()
          console.error('Resend send failed', errText)
          return new Response(JSON.stringify({ ok: true, emailed: false }), { status: 200, headers: cors })
        }

        return new Response(JSON.stringify({ ok: true, emailed: true }), { status: 200, headers: cors })
      },
    },
  },
})
