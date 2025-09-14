import { Module } from '@nestjs/common'
import { PrayersController } from './prayers.controller'
import { PrismaService } from '../../shared/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Module({ controllers: [PrayersController], providers: [PrismaService, JwtService] })
export class PrayersModule {}
