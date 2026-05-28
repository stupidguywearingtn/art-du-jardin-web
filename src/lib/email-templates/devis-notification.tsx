import * as React from 'react'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface DevisNotificationProps {
  projectType?: string
  surface?: string
  name?: string
  email?: string
  phone?: string
  city?: string
  postalCode?: string
  message?: string
}

const DevisNotificationEmail = ({
  projectType,
  surface,
  name,
  email,
  phone,
  city,
  postalCode,
  message,
}: DevisNotificationProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Nouvelle demande de devis — {projectType || 'HCE'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nouvelle demande de devis</Heading>
        <Text style={text}>
          Une nouvelle demande vient d'être soumise depuis le site HCE.
        </Text>

        <Section style={card}>
          <Text style={label}>Type de projet</Text>
          <Text style={value}>{projectType || '—'}</Text>
          <Text style={label}>Surface estimée</Text>
          <Text style={value}>{surface || '—'}</Text>
        </Section>

        <Hr style={hr} />

        <Section style={card}>
          <Text style={label}>Nom</Text>
          <Text style={value}>{name || '—'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Text style={label}>Téléphone</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Ville</Text>
          <Text style={value}>{city || '—'} {postalCode ? `(${postalCode})` : ''}</Text>
        </Section>

        {message ? (
          <>
            <Hr style={hr} />
            <Section style={card}>
              <Text style={label}>Message</Text>
              <Text style={value}>{message}</Text>
            </Section>
          </>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>Email automatique — HCE BTP</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DevisNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Nouvelle demande de devis — ${data.projectType || 'HCE'}`,
  displayName: 'Notification demande de devis',
  to: 'yanisouammou063@gmail.com',
  previewData: {
    projectType: 'Cour',
    surface: '120 m²',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '06 12 34 56 78',
    city: 'Lons-le-Saunier',
    postalCode: '39000',
    message: 'Je souhaite un devis pour ma cour.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0E0E0F', margin: '0 0 18px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 20px' }
const card = { margin: '0 0 8px' }
const label = { fontSize: '11px', color: '#8A5A3C', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '12px 0 2px', fontWeight: 600 }
const value = { fontSize: '14px', color: '#0E0E0F', margin: '0 0 8px', lineHeight: '1.5' }
const hr = { borderColor: '#e5e5e5', margin: '18px 0' }
const footer = { fontSize: '11px', color: '#999999', margin: '12px 0 0', textAlign: 'center' as const }
