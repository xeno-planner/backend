import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';

import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, PrismaService, UserService],
})
export class RolesModule {}
