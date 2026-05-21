import type { Metadata } from 'next'
import { getTeam } from '@/lib/team'
import TeamGrid from '@/components/sections/TeamGrid'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the master barbers at Smart Gents Saloon — a team of certified professionals with decades of combined experience in precision cuts, shaves, and luxury grooming.',
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
