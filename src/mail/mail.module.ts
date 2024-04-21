import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';

import { MailService } from './mail.service';

@Module({
  providers: [MailService, UserService, PrismaService],
})
export class MailModule {}
