import type { Metadata } from 'next'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Smart Gents Saloon. Find our address, opening hours, WhatsApp, and send us a message. We reply within 24 hours.',
}

export default function ContactPage() {
  return <ContactSection />
}
