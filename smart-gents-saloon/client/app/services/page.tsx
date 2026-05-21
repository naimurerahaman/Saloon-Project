import type { Metadata } from 'next'
import { getServices } from '@/lib/services'
import ServicesGrid from '@/components/sections/ServicesGrid'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full menu of premium grooming services — haircuts, beard sculpting, straight-razor shaves, luxury packages, and treatments for the modern gentleman.',
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
