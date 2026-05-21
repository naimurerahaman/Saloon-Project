import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn the story behind Smart Gents Saloon — a decade of master barbering, award-winning craft, and an unwavering commitment to the finest grooming experience in London.',
}

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <CTASection />
    </>
  )
}
