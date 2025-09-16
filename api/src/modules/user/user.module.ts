import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserController } from 'modules/user/user.controller'
import { UserService } from 'modules/user/user.service'
import { PrismaService } from 'shared/prisma.service'

@Module({
  imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'secret', signOptions: { expiresIn: '7d' } })],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule { }
