import { Injectable, NotFoundException } from '@nestjs/common'
import type { Gallery } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service.js'
import { UploadsService } from '../uploads/uploads.service.js'
import type { CreateGalleryDto } from './dto/create-gallery.dto.js'
import type { GetGalleryQueryDto } from './dto/get-gallery-query.dto.js'
import type { UpdateGalleryDto } from './dto/update-gallery.dto.js'

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploads: UploadsService,
  ) {}

  /** Returns all active gallery items, optionally filtered by category. */
  findAll(query: GetGalleryQueryDto): Promise<Gallery[]> {
    return this.prisma.gallery.findMany({
      where: {
        isActive: true,
        ...(query.category && { category: query.category }),
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async findOne(id: string): Promise<Gallery> {
    const item = await this.prisma.gallery.findUnique({ where: { id } })
    if (!item || !item.isActive) throw new NotFoundException(`Gallery item ${id} not found`)
    return item
  }

  create(dto: CreateGalleryDto): Promise<Gallery> {
    return this.prisma.gallery.create({
      data: { ...dto, sortOrder: dto.sortOrder ?? 0 },
    })
  }

  async update(id: string, dto: UpdateGalleryDto): Promise<Gallery> {
    await this.resolveOrFail(id)
    return this.prisma.gallery.update({ where: { id }, data: dto })
  }

  /** Hard-deletes the DB record and removes the asset from Cloudinary. */
  async remove(id: string): Promise<{ id: string }> {
    const item = await this.resolveOrFail(id)

    // Best-effort Cloudinary deletion — don't fail the request if CDN is unavailable
    try {
      await this.uploads.destroy(item.publicId)
    } catch {
      // Cloudinary deletion failed; DB record is still removed below
    }

    await this.prisma.gallery.delete({ where: { id } })
    return { id }
  }

  private async resolveOrFail(id: string): Promise<Gallery> {
    const item = await this.prisma.gallery.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Gallery item ${id} not found`)
    return item
  }
}
