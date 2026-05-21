import type { Metadata } from 'next'
import { getServices } from '@/lib/services'
import { getBookingBarbers } from '@/lib/booking'
import BookingWizard from '@/components/sections/BookingWizard'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Reserve your chair at Smart Gents Saloon. Choose your service, select a master barber, and pick a time that works for you — online booking in minutes.',
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
