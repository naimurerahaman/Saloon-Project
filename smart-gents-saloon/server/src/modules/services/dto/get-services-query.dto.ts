import { IsEnum, IsOptional } from 'class-validator'
import { ServiceCategory } from '@prisma/client'

export class GetServicesQueryDto {
  /** Filter by service category */
  @IsOptional()
  @IsEnum(ServiceCategory, {
    message: `category must be one of: ${Object.values(ServiceCategory).join(', ')}`,
  })
  category?: ServiceCategory
}
