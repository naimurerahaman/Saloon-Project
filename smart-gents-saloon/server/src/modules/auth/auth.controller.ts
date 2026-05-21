import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { LoginDto } from './dto/login.dto.js'
import { RefreshTokenDto } from './dto/refresh-token.dto.js'
import { Public } from './decorators/public.decorator.js'
import { CurrentUser } from './decorators/current-user.decorator.js'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { JwtPayload } from './strategies/jwt.strategy.js'
import type { RefreshPayload } from './strategies/jwt-refresh.strategy.js'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /api/v1/auth/login */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  /** POST /api/v1/auth/refresh
   *  Body: { refreshToken: string }
   *  Returns new access + refresh token pair. Old refresh token is invalidated.
   */
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @CurrentUser() user: RefreshPayload,
    @Body() dto: RefreshTokenDto,
  ) {
    return this.authService.refresh(dto, user.id)
  }

  /** POST /api/v1/auth/logout  (requires valid access token) */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUser() user: JwtPayload) {
    return this.authService.logout(user.id)
  }

  /** GET /api/v1/auth/profile  (requires valid access token) */
  @Get('profile')
  getProfile(@CurrentUser() user: JwtPayload) {
    return this.authService.getProfile(user.id)
  }
}
