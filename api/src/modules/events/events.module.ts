import { Module } from '@nestjs/common'
import { EventsController } from './events.controller'
import { PrismaService } from '../../shared/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { EventsService } from 'modules/events/events.service'
@Module({
    imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'secret', signOptions: { expiresIn: '7d' } })],
    controllers: [EventsController],
    providers: [EventsService, PrismaService],
    exports: [EventsService],
})
export class EventsModule { }
