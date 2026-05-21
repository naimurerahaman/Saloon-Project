import type { Metadata } from 'next'
import { getGallery } from '@/lib/gallery'
import GalleryGrid from '@/components/sections/GalleryGrid'
import CTASection from '@/components/sections/CTASection'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse the Smart Gents Saloon gallery — precision haircuts, beard sculpts, straight-razor shaves, and luxury grooming captured through our lens.',
  alternates: { canonical: `${BASE}/gallery` },
  openGraph: {
    url: `${BASE}/gallery`,
    title: 'Gallery | Smart Gents Saloon',
    description:
      'A showcase of our craft — precision haircuts, beard sculpts, hot-towel shaves, and luxury grooming work by our master barbers.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Smart Gents Saloon',
    description: 'A showcase of precision barbering and luxury grooming.',
    images: ['/opengraph-image'],
  },
}

export default async function GalleryPage() {
  const items = await getGallery()

  return (
    <>
      <GalleryGrid items={items} />
      <CTASection />
    </>
  )
}
