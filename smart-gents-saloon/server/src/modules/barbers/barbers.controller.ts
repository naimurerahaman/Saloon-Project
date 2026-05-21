import { Controller, Get, Param } from '@nestjs/common'
import { BarbersService } from './barbers.service.js'
import { Public } from '../auth/decorators/public.decorator.js'

@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  /** GET /api/v1/barbers */
  @Public()
  @Get()
  findAll() {
    return this.barbersService.findAll()
  }

  /** GET /api/v1/barbers/:id */
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barbersService.findOne(id)
  }
}
