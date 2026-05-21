import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Role } from '@prisma/client'
import { memoryStorage } from 'multer'
import { Roles } from '../auth/decorators/roles.decorator.js'
import { UploadsService } from './uploads.service.js'

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  /**
   * POST /api/v1/uploads?folder=gallery
   * Accepts a single image file (field name: "file"), max 10 MB.
   * Uploads to Cloudinary under smart-gents-saloon/<folder> and returns
   * the optimised CDN URL and publicId.
   * ADMIN only.
   */
  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB hard limit at Multer level
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.uploads.upload(file, folder)
  }

  /**
   * DELETE /api/v1/uploads?publicId=smart-gents-saloon/gallery/abc123
   * Permanently removes the asset from Cloudinary.
   * ADMIN only.
   */
  @Roles(Role.ADMIN)
  @Delete()
  @HttpCode(HttpStatus.OK)
  remove(@Query('publicId') publicId: string) {
    return this.uploads.destroy(publicId)
  }
}
