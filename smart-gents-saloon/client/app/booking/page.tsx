import type { Metadata } from 'next'
import { getServices } from '@/lib/services'
import { getBookingBarbers } from '@/lib/booking'
import BookingWizard from '@/components/sections/BookingWizard'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Reserve your chair at Smart Gents Saloon. Choose your service, select a master barber, and pick a time that works for you — online booking in minutes.',
  alternates: { canonical: `${BASE}/booking` },
  openGraph: {
    url: `${BASE}/booking`,
    title: 'Book an Appointment | Smart Gents Saloon',
    description:
      'Reserve your chair in minutes. Choose your service, pick a barber, and book online at Smart Gents Saloon.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book an Appointment | Smart Gents Saloon',
    description: 'Reserve your grooming appointment online in minutes.',
    images: ['/opengraph-image'],
  },
}

interface PageProps {
  searchParams: Promise<{ service?: string; barber?: string }>
}

export default async function BookingPage({ searchParams }: PageProps) {
  const { service, barber } = await searchParams
  const [services, barbers] = await Promise.all([getServices(), getBookingBarbers()])

  return (
    <BookingWizard
      services={services}
      barbers={barbers}
      initialServiceId={service}
      initialBarberId={barber}
    />
  )
}
