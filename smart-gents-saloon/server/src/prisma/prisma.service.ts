import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client!: PrismaClient

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const connectionString = this.config.get<string>('database.url')!
    const adapter = new PrismaPg({ connectionString })
    this.client = new PrismaClient({ adapter })
    await this.client.$connect()
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect()
  }

  // ─── Model accessors ─────────────────────────────────────────────────────────

  get user() {
    return this.client.user
  }

  get service() {
    return this.client.service
  }

  get barber() {
    return this.client.barber
  }

  get appointment() {
    return this.client.appointment
  }

  get gallery() {
    return this.client.gallery
  }

  get testimonial() {
    return this.client.testimonial
  }

  // ─── Transaction helper ───────────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $transaction(...args: any[]): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.client.$transaction as any)(...args)
  }
}
