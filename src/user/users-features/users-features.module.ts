import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { RolesService } from '@/roles/roles.service';
import { UserService } from '@/user/user.service';

import { UsersFeaturesController } from './users-features.controller';
import { UsersFeaturesService } from './users-features.service';

@Module({
  controllers: [UsersFeaturesController],
  providers: [UsersFeaturesService, UserService, RolesService, PrismaService],
})
export class UsersFeaturesModule {}
