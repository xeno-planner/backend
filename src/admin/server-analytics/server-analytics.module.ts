import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';
import { RolesService } from '@/roles/roles.service';
import { UserService } from '@/user/user.service';

import { ServerAnalyticsController } from './server-analytics.controller';
import { ServerAnalyticsService } from './server-analytics.service';

@Module({
  controllers: [ServerAnalyticsController],
  providers: [ServerAnalyticsService, PrismaService, RolesService, UserService],
})
export class ServerAnalyticsModule {}
