import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true })

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  const config = new DocumentBuilder()
    .setTitle('Catholic Community API')
    .setDescription('API for devotions, prayers, events')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: { persistAuthorization: true }
  })

  await app.listen(process.env.PORT || 3001)
  console.log('API http://localhost:' + (process.env.PORT || 3001) + "/docs")
  console.log('Swagger docs at /docs')
}
bootstrap()
