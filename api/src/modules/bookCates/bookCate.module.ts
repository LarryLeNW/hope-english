import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { BookCateController } from 'modules/bookCates/bookCate.controller'
import { BookCateService } from 'modules/bookCates/bookCate.service'
import { PrismaService } from 'shared/prisma.service'

@Module({
  imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'secret', signOptions: { expiresIn: '7d' } })],
  controllers: [BookCateController],
  providers: [BookCateService, PrismaService],
  exports: [BookCateService],
})
export class BookCateModule { }
