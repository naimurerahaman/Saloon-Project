import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as bcrypt from 'bcrypt'

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL']! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  const adminPassword = await bcrypt.hash('Admin@2026!', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartgents.com' },
    update: {},
    create: {
      email: 'admin@smartgents.com',
      password: adminPassword,
      name: 'Super Admin',
      role: 'ADMIN',
      isActive: true,
    },
  })

  console.log(`✅ Admin user: ${admin.email}`)
  console.log('🌱 Seed complete.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
