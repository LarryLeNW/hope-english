import { Module } from '@nestjs/common'
import { DevotionsController } from './devotions.controller'
import { PrismaService } from '../../shared/prisma.service'

@Module({ controllers: [DevotionsController], providers: [PrismaService] })
export class DevotionsModule {}
