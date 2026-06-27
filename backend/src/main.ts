import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { execSync } from 'child_process'
import { AppModule } from './app.module'

try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' })
} catch (e) {
  console.error('Migration failed:', e)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.enableCors({
    origin: [
      /^http:\/\/localhost:\d+$/,
      /^https:\/\/.*\.up\.railway\.app$/,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  await app.listen(process.env.PORT ?? 3001)
  console.log('Backend rodando em http://localhost:3001')
}

bootstrap()
