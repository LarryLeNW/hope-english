import { Module } from '@nestjs/common'
import { EventsController } from './events.controller'
import { PrismaService } from '../../shared/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { EventsService } from 'modules/events/events.service'
import { EmailModule } from 'modules/email/email.module'
import { UserService } from 'modules/user/user.service'
@Module({
    imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'secret', signOptions: { expiresIn: '7d' } }), EmailModule],
    controllers: [EventsController],
    providers: [EventsService, PrismaService, UserService],
    exports: [EventsService],
})
export class EventsModule { }
