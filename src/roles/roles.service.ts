import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Permissions } from '@prisma/client';

import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';

@Injectable()
export class RolesService implements OnModuleInit {
  private loggerCtx = 'Roles';

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const adminRoles = await this.prisma.userRole.findMany({
      where: {
        permissions: {
          has: Permissions.all,
        },
      },
    });

    // Fallback admin role
    if (!adminRoles.length) {
      Logger.log(
        'Did not found any admin role. Creating default one.',
        this.loggerCtx,
      );

      await this.prisma.userRole.create({
        data: {
          name: '<default_admin>',
          permissions: [Permissions.all],
        },
      });
    }
  }

  /** Get all user`s permissions */
  async getPermissionsById(userId: string): Promise<Permissions[]> {
    const { role } = await this.userService.getById(userId, {
      role: true,
    });

    return !!role ? role.permissions : [];
  }
}
