import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { BookController } from 'modules/books/book.controller'
import { BookService } from 'modules/books/book.service'
import { PrismaService } from 'shared/prisma.service'

@Module({
  imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'secret', signOptions: { expiresIn: '7d' } })],
  controllers: [BookController],
  providers: [BookService, PrismaService],
  exports: [BookService],
})
export class BookModule { }
