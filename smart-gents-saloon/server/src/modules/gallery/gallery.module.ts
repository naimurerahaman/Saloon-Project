import { Module } from '@nestjs/common'
import { UploadsModule } from '../uploads/uploads.module.js'
import { GalleryController } from './gallery.controller.js'
import { GalleryService } from './gallery.service.js'

@Module({
  imports: [UploadsModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
