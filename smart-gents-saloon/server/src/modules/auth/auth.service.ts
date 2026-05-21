import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma/prisma.service.js'
import type { LoginDto } from './dto/login.dto.js'
import type { RefreshTokenDto } from './dto/refresh-token.dto.js'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<AuthTokens & { user: AuthUser }> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password)
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const tokens = await this.issueTokens(user.id, user.email, user.role)
    await this.saveHashedRefreshToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }
  }

  async refresh(dto: RefreshTokenDto, userId: string): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user || !user.isActive || !user.refreshToken) {
      throw new ForbiddenException('Access denied')
    }

    const tokenValid = await bcrypt.compare(dto.refreshToken, user.refreshToken)
    if (!tokenValid) throw new ForbiddenException('Access denied')

    const tokens = await this.issueTokens(user.id, user.email, user.role)
    await this.saveHashedRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async logout(userId: string): Promise<void> {
    // updateMany with a condition avoids an error if refreshToken is already null
    await this.prisma.user.updateMany({
      where: { id: userId, refreshToken: { not: null } },
      data: { refreshToken: null },
    })
  }

  async getProfile(userId: string): Promise<AuthUser & { createdAt: Date }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })
    if (!user) throw new UnauthorizedException()
    return user
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private async issueTokens(userId: string, email: string, role: string): Promise<AuthTokens> {
    // expiresIn is typed as StringValue (ms template literal) in @nestjs/jwt v11.
    // Config values are validated at runtime; the cast is safe.
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync({ sub: userId, email, role }, {
        secret: this.config.get<string>('jwt.secret')!,
        expiresIn: this.config.get('jwt.expiresIn') as any,
      }),
      this.jwt.signAsync({ sub: userId }, {
        secret: this.config.get<string>('jwt.refreshSecret')!,
        expiresIn: this.config.get('jwt.refreshExpiresIn') as any,
      }),
    ])
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return { accessToken, refreshToken }
  }

  private async saveHashedRefreshToken(userId: string, token: string): Promise<void> {
    const hashed = await bcrypt.hash(token, 10)
    await this.prisma.user.update({ where: { id: userId }, data: { refreshToken: hashed } })
  }
}
