import { Module } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.service'
import { AuthModule } from './auth/auth.module'
import { EventsModule } from './events/events.module'
import { PrayersModule } from './prayers/prayers.module'
import { DevotionsModule } from './devotions/devotions.module'

@Module({
  imports: [AuthModule, EventsModule, PrayersModule, DevotionsModule],
  providers: [PrismaService],
})
export class AppModule {}
