import HeroSection from '@/components/sections/HeroSection'
import AboutPreview from '@/components/sections/AboutPreview'
import FeaturedServices from '@/components/sections/FeaturedServices'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import GalleryPreview from '@/components/sections/GalleryPreview'
import CTASection from '@/components/sections/CTASection'

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
