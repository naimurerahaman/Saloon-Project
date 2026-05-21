import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'
import CTASection from '@/components/sections/CTASection'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn the story behind Smart Gents Saloon — a decade of master barbering, award-winning craft, and an unwavering commitment to the finest grooming experience.',
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    url: `${BASE}/about`,
    title: 'About | Smart Gents Saloon',
    description:
      'The story behind Smart Gents Saloon — founded on a passion for precision, elevated by a decade of master craft.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Smart Gents Saloon',
    description: 'A decade of master barbering and luxury grooming.',
    images: ['/opengraph-image'],
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <CTASection />
    </>
  )
}
