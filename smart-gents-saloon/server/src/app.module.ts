import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller.js'
import { PrismaModule } from './prisma/prisma.module.js'
import { AuthModule } from './modules/auth/auth.module.js'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard.js'
import { RolesGuard } from './modules/auth/guards/roles.guard.js'
import configuration from './config/configuration.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60_000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    // Guard execution order: throttle → jwt → roles
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
