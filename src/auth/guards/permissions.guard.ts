import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from '@prisma/client';
import { getObjectEntries } from '@xenopomp/advanced-utils';

import { getUserFromCtx } from '@/auth/decorators/user.decorator';
import { RolesService } from '@/roles/roles.service';

type PermissionList = Partial<Record<keyof typeof Permissions, boolean>>;

const SetRoles = Reflector.createDecorator<PermissionList>();

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const user = getUserFromCtx(ctx);
    const userPerms = await this.rolesService.getPermissionsById(user.id);

    const routePerms = this.reflector.get<PermissionList>(
      SetRoles,
      ctx.getHandler(),
    );

    // Superuser entry
    if (userPerms.includes('all')) {
      return true;
    }

    // Filter permissions by enabled ones
    const reqPerms = getObjectEntries(routePerms)
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, enabled]) => enabled,
      )
      .map(([perm]) => perm);

    // Here user is not super one. Checking if 'all' permission is required.
    // If it is, denying request (because only superuser can access endpoint).
    if (reqPerms.includes('all')) {
      return false;
    }

    // Check if requested permissions are fulfilled
    return reqPerms.every(item => userPerms.includes(item));
  }
}

/**
 * Checks if user from context can access this endpoint.
 * @param perms
 * @constructor
 * @example
 * // USE BEFORE Auth DECORATOR!!!!
 * \@HttpCode(200)
 * \@Get('today')
 * \@RequiresPermissions({})
 * \@Auth()
 *   async getTodaySession(@CurrentUser('id') userId: string) {
 *     return this.pomodoroService.getTodaySession(userId);
 *   }
 */
export const RequiresPermissions = (perms: PermissionList) =>
  applyDecorators(SetRoles(perms), UseGuards(PermissionsGuard));
