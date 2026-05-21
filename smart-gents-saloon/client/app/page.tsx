import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'

// Below-fold sections — split into separate JS chunks to reduce initial bundle
const AboutPreview    = dynamic(() => import('@/components/sections/AboutPreview'))
const FeaturedServices = dynamic(() => import('@/components/sections/FeaturedServices'))
const WhyChooseUs     = dynamic(() => import('@/components/sections/WhyChooseUs'))
const Testimonials    = dynamic(() => import('@/components/sections/Testimonials'))
const GalleryPreview  = dynamic(() => import('@/components/sections/GalleryPreview'))
const CTASection      = dynamic(() => import('@/components/sections/CTASection'))

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  alternates: { canonical: BASE },
  openGraph: {
    url: BASE,
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <CTASection />
    </>
  )
}
