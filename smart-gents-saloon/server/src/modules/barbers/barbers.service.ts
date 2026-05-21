import { Injectable, NotFoundException } from '@nestjs/common'
import type { Barber } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service.js'

@Injectable()
export class BarbersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Barber[]> {
    return this.prisma.barber.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    })
  }

  async findOne(id: string): Promise<Barber> {
    const barber = await this.prisma.barber.findUnique({ where: { id } })
    if (!barber || !barber.isActive) {
      throw new NotFoundException(`Barber ${id} not found`)
    }
    return barber
  }
}
