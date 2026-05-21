import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices } from '@/lib/services'
import { CATEGORIES } from '@/lib/services'
import Container from '@/components/ui/Container'
import CTASection from '@/components/sections/CTASection'
import { Clock, ArrowRight } from 'lucide-react'
import type { Service } from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'View the full pricing menu at Smart Gents Saloon — transparent prices for every haircut, beard sculpt, shave, and luxury package. No hidden fees.',
  alternates: { canonical: `${BASE}/pricing` },
  openGraph: {
    url: `${BASE}/pricing`,
    title: 'Pricing | Smart Gents Saloon',
    description:
      'Full pricing menu for premium grooming services — haircuts, beard sculpts, shaves, and luxury packages at Smart Gents Saloon.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Smart Gents Saloon',
    description: 'Transparent pricing for every grooming service we offer.',
    images: ['/opengraph-image'],
  },
}

function PricingRow({ service }: { service: Service }) {
  return (
    <div className="group flex items-center justify-between gap-4 py-5 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.015] -mx-6 px-6 transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          <div>
            <h3 className="text-white text-sm font-medium group-hover:text-gold transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-white/35 text-xs leading-relaxed mt-1 line-clamp-2 max-w-lg">
              {service.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-1.5 text-white/28">
          <Clock size={11} />
          <span className="text-[11px] tracking-wide">{service.duration} min</span>
        </div>
        <span className="text-gold font-bold text-base w-16 text-right">
          £{service.price}
        </span>
        <Link
          href={`/booking?service=${service.id}`}
          className="hidden sm:flex items-center gap-1.5 text-white/25 text-[10px] tracking-[0.2em] uppercase hover:text-gold transition-colors duration-200"
          aria-label={`Book ${service.title}`}
        >
          Book
          <ArrowRight size={9} />
        </Link>
      </div>
    </div>
  )
}

function CategorySection({ category, services }: { category: string; services: Service[] }) {
  if (services.length === 0) return null
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-0">
        <h2 className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold">
          {category}
        </h2>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-white/20 text-[10px] tracking-wider">
          {services.length} service{services.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="bg-card border border-white/[0.06] px-6 mt-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent -mx-6 mb-0" />
        {services.map((s) => (
          <PricingRow key={s.id} service={s} />
        ))}
      </div>
    </div>
  )
}

export default async function PricingPage() {
  const services = await getServices()

  const categorised = CATEGORIES.slice(1).map((cat) => ({
    label: cat,
    items: services.filter((s) => s.category === cat),
  }))

  const uncategorised = services.filter(
    (s) => !CATEGORIES.slice(1).includes(s.category as typeof CATEGORIES[number]),
  )

  return (
    <>
      <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
        <Container>
          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold/45" />
              <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Transparent Pricing</span>
              <div className="h-px w-8 bg-gold/45" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
              Our <span className="text-gold italic">Pricing.</span>
            </h1>
            <p className="text-white/35 max-w-md mx-auto text-sm leading-relaxed">
              No hidden fees — every service priced transparently. Book online
              in minutes and arrive knowing exactly what to expect.
            </p>
          </div>

          {/* Pricing tables by category */}
          <div className="max-w-3xl mx-auto">
            {categorised.map(({ label, items }) => (
              <CategorySection key={label} category={label} services={items} />
            ))}
            {uncategorised.length > 0 && (
              <CategorySection category="Other" services={uncategorised} />
            )}
          </div>

          {/* Note */}
          <p className="text-center text-white/18 text-[10px] tracking-[0.3em] uppercase mt-10">
            All prices are in GBP and include VAT where applicable.
            Prices subject to change — confirm when booking.
          </p>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
