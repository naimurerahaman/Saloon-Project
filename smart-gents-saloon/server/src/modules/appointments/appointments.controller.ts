import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { AppointmentsService } from './appointments.service.js'
import { CreateAppointmentDto } from './dto/create-appointment.dto.js'
import { GetAppointmentsQueryDto } from './dto/get-appointments-query.dto.js'
import { GetAvailabilityQueryDto } from './dto/get-availability-query.dto.js'
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto.js'
import { Public } from '../auth/decorators/public.decorator.js'
import { Roles } from '../auth/decorators/roles.decorator.js'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  /**
   * GET /api/v1/appointments/availability?barberId=&date=&serviceId=
   *
   * Returns available 30-minute time slots for the given barber, date, and
   * service (duration determines how much of the day each slot consumes).
   * Must be declared BEFORE /:id to prevent "availability" matching as an id.
   * Public — no authentication required.
   */
  @Public()
  @Get('availability')
  getAvailability(@Query() query: GetAvailabilityQueryDto) {
    return this.appointmentsService.getAvailability(query)
  }

  /**
   * GET /api/v1/appointments
   * Optional filters: ?status=PENDING, ?date=2024-01-15, ?barberId=xxx
   * ADMIN only.
   */
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() query: GetAppointmentsQueryDto) {
    return this.appointmentsService.findAll(query)
  }

  /**
   * GET /api/v1/appointments/:id
   * ADMIN only.
   */
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id)
  }

  /**
   * POST /api/v1/appointments
   * Creates a new booking. Validates service, barber, business hours,
   * and scheduling conflicts before persisting.
   * Public — customers book without authentication.
   */
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto)
  }

  /**
   * PATCH /api/v1/appointments/:id/status
   * Transitions an appointment's status (PENDING → APPROVED / CANCELLED / COMPLETED).
   * ADMIN only.
   */
  @Roles(Role.ADMIN)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, dto)
  }
}
