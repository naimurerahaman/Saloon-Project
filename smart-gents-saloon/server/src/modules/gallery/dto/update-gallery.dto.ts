import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator'

export class UpdateGalleryDto {
  @IsOptional()
  @IsString()
  caption?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number
}
