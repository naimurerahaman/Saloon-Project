import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import { AppModule } from './app.module.js'
import { HttpExceptionFilter, AllExceptionsFilter } from './common/filters/http-exception.filter.js'
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  const port = config.get<number>('port', 3001)
  const frontendUrl = config.get<string>('frontendUrl', 'http://localhost:3000')

  // Security headers
  app.use(helmet())

  // CORS
  app.enableCors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  // Global API prefix
  app.setGlobalPrefix('api/v1')

  // Global validation pipe — strip unknown fields, auto-transform types
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // Global exception filters (order: specific first, catch-all last)
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())

  // Global response envelope
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(port)
  console.log(`Server running → http://localhost:${port}/api/v1`)
  console.log(`Health check  → http://localhost:${port}/api/v1/health`)
}

bootstrap()
