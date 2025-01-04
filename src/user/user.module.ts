import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma.service';
import { VerificationService } from '@/verification.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersFeaturesModule } from './users-features/users-features.module';

@Module({
  imports: [ConfigModule, UsersFeaturesModule],
  providers: [UserService, PrismaService, VerificationService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
