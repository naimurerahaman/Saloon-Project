import type { Metadata } from 'next'
import { getGallery } from '@/lib/gallery'
import GalleryGrid from '@/components/sections/GalleryGrid'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse the Smart Gents Saloon gallery — precision haircuts, beard sculpts, straight-razor shaves, and luxury grooming captured through our lens.',
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
