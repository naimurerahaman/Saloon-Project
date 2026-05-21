import type { Metadata } from 'next'
import { getServices } from '@/lib/services'
import ServicesGrid from '@/components/sections/ServicesGrid'
import CTASection from '@/components/sections/CTASection'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full menu of premium grooming services — signature haircuts, beard sculpting, straight-razor shaves, luxury packages, and treatments for the modern gentleman.',
  alternates: { canonical: `${BASE}/services` },
  openGraph: {
    url: `${BASE}/services`,
    title: 'Services | Smart Gents Saloon',
    description:
      'Premium grooming services including haircuts, beard sculpting, hot-towel shaves, and luxury packages — all crafted for the discerning gentleman.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Smart Gents Saloon',
    description: 'Premium grooming services for the modern gentleman.',
    images: ['/opengraph-image'],
  },
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <ServicesGrid services={services} />
      <CTASection />
    </>
  )
}
