import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';

import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, UserService, PrismaService],
})
export class MailModule {}
