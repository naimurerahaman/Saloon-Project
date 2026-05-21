import { Injectable, NotFoundException } from '@nestjs/common'
import type { Service } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service.js'
import type { CreateServiceDto } from './dto/create-service.dto.js'
import type { UpdateServiceDto } from './dto/update-service.dto.js'
import type { GetServicesQueryDto } from './dto/get-services-query.dto.js'

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Returns all active services, optionally filtered by category. */
  findAll(query: GetServicesQueryDto): Promise<Service[]> {
    return this.prisma.service.findMany({
      where: {
        isActive: true,
        ...(query.category && { category: query.category }),
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
  }

  /** Returns a single active service, or throws 404. */
  async findOne(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({ where: { id } })
    if (!service || !service.isActive) {
      throw new NotFoundException(`Service ${id} not found`)
    }
    return service
  }

  /** Creates a new service. */
  create(dto: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({
      data: { ...dto, sortOrder: dto.sortOrder ?? 0 },
    })
  }

  /**
   * Updates an existing service (active or inactive).
   * Admins may pass { isActive: true } to reactivate a soft-deleted entry.
   */
  async update(id: string, dto: UpdateServiceDto): Promise<Service> {
    await this.resolveOrFail(id)
    return this.prisma.service.update({ where: { id }, data: dto })
  }

  /** Soft-deletes a service by setting isActive to false. */
  async remove(id: string): Promise<{ id: string }> {
    await this.resolveOrFail(id)
    await this.prisma.service.update({ where: { id }, data: { isActive: false } })
    return { id }
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  /** Resolves any service record (regardless of isActive) for admin mutations. */
  private async resolveOrFail(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({ where: { id } })
    if (!service) throw new NotFoundException(`Service ${id} not found`)
    return service
  }
}
