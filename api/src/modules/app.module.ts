import { Module } from '@nestjs/common'
import { PrismaService } from 'shared/prisma.service'
import { AuthModule } from 'modules/auth/auth.module'
import { EventsModule } from 'modules/events/events.module'
import { PrayersModule } from 'modules/prayers/prayers.module'
import { DevotionsModule } from 'modules/devotions/devotions.module'
import { UserModule } from 'modules/user/user.module'
import { BookModule } from 'modules/books/book.module'
import { BookCateModule } from 'modules/bookCates/bookCate.module'

@Module({
  imports: [AuthModule, EventsModule, PrayersModule, DevotionsModule, UserModule, BookModule, BookCateModule],
  providers: [PrismaService],
})
export class AppModule { }
