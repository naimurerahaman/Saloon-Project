import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { ServicesService } from './services.service.js'
import { CreateServiceDto } from './dto/create-service.dto.js'
import { UpdateServiceDto } from './dto/update-service.dto.js'
import { GetServicesQueryDto } from './dto/get-services-query.dto.js'
import { Public } from '../auth/decorators/public.decorator.js'
import { Roles } from '../auth/decorators/roles.decorator.js'

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * GET /api/v1/services
   * GET /api/v1/services?category=HAIRCUT
   *
   * Returns all active services, optionally filtered by category.
   * Public — no authentication required.
   */
  @Public()
  @Get()
  findAll(@Query() query: GetServicesQueryDto) {
    return this.servicesService.findAll(query)
  }

  /**
   * GET /api/v1/services/:id
   *
   * Returns a single active service by ID.
   * Public — no authentication required.
   */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id)
  }

  /**
   * POST /api/v1/services
   *
   * Creates a new service. ADMIN only.
   */
  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto)
  }

  /**
   * PATCH /api/v1/services/:id
   *
   * Partially updates a service. ADMIN only.
   * Send { isActive: true } to reactivate a soft-deleted service.
   */
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto)
  }

  /**
   * DELETE /api/v1/services/:id
   *
   * Soft-deletes a service (sets isActive: false). ADMIN only.
   * Returns { id } of the deactivated service.
   */
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id)
  }
}
