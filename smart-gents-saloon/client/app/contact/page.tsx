import type { Metadata } from 'next'
import ContactSection from '@/components/sections/ContactSection'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Smart Gents Saloon. Find our address, opening hours, WhatsApp, and send us a message. We reply within 24 hours.',
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    url: `${BASE}/contact`,
    title: 'Contact | Smart Gents Saloon',
    description:
      'Reach us by phone, WhatsApp, or message. Visit us at 15 Savile Row, London. We reply within 24 hours.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Smart Gents Saloon',
    description: 'Get in touch — we reply within 24 hours.',
    images: ['/opengraph-image'],
  },
}

export default function ContactPage() {
  return <ContactSection />
}
