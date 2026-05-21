import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Public } from '../auth/decorators/public.decorator.js'
import { Roles } from '../auth/decorators/roles.decorator.js'
import { CreateGalleryDto } from './dto/create-gallery.dto.js'
import { GetGalleryQueryDto } from './dto/get-gallery-query.dto.js'
import { UpdateGalleryDto } from './dto/update-gallery.dto.js'
import { GalleryService } from './gallery.service.js'

@Controller('gallery')
export class GalleryController {
  constructor(private readonly gallery: GalleryService) {}

  /** GET /api/v1/gallery?category=haircuts — public */
  @Public()
  @Get()
  findAll(@Query() query: GetGalleryQueryDto) {
    return this.gallery.findAll(query)
  }

  /** GET /api/v1/gallery/:id — public */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gallery.findOne(id)
  }

  /** POST /api/v1/gallery — admin; body contains url + publicId from a prior upload */
  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateGalleryDto) {
    return this.gallery.create(dto)
  }

  /** PATCH /api/v1/gallery/:id — admin; update caption, category, sortOrder, isActive */
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGalleryDto) {
    return this.gallery.update(id, dto)
  }

  /** DELETE /api/v1/gallery/:id — admin; removes from DB + Cloudinary */
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.gallery.remove(id)
  }
}
