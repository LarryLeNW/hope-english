import { Module } from '@nestjs/common'
import { PrismaService } from 'shared/prisma.service'
import { AuthModule } from 'modules/auth/auth.module'
import { EventsModule } from 'modules/events/events.module'
import { PrayersModule } from 'modules/prayers/prayers.module'
import { DevotionsModule } from 'modules/devotions/devotions.module'
import { UserModule } from 'modules/user/user.module'
import { BookModule } from 'modules/books/book.module'
import { BookCateModule } from 'modules/bookCates/bookCate.module'
import { EmailModule } from 'modules/email/email.module'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bullmq'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, EventsModule, PrayersModule, DevotionsModule, UserModule, BookModule, BookCateModule, EmailModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT || 6379),
        retryStrategy: (times) => Math.min(times * 500, 5000),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule { }
