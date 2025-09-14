import { Module } from '@nestjs/common'
import { EventsController } from './events.controller'
import { PrismaService } from '../../shared/prisma.service'
@Module({ controllers: [EventsController], providers: [PrismaService] })
export class EventsModule {}
