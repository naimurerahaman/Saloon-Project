import type { Metadata } from 'next'
import { getTeam } from '@/lib/team'
import TeamGrid from '@/components/sections/TeamGrid'
import CTASection from '@/components/sections/CTASection'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartgentssaloon.com'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the master barbers at Smart Gents Saloon — certified professionals with decades of combined experience in precision cuts, shaves, and luxury grooming.',
  alternates: { canonical: `${BASE}/team` },
  openGraph: {
    url: `${BASE}/team`,
    title: 'Our Team | Smart Gents Saloon',
    description:
      'Meet our master barbers — a team of certified professionals dedicated to precision, craft, and the finest grooming experience.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team | Smart Gents Saloon',
    description: 'Meet the master barbers behind Smart Gents Saloon.',
    images: ['/opengraph-image'],
  },
}

export default async function TeamPage() {
  const members = await getTeam()

  return (
    <>
      <TeamGrid members={members} />
      <CTASection />
    </>
  )
}
