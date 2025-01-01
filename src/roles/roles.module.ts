import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, PrismaService, UserService],
  controllers: [RolesController],
})
export class RolesModule {}
