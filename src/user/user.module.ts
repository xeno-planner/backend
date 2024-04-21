import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@/prisma.service';
import { VerificationService } from '@/verification.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule],
  providers: [UserService, PrismaService, VerificationService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
