import { Controller, Get } from '@nestjs/common'
import { Public } from './modules/auth/decorators/public.decorator.js'

@Controller()
export class AppController {
  @Public()
  @Get('health')
  health(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
