import { Get, HttpCode, applyDecorators } from '@nestjs/common';

import { Auth } from '@/auth/decorators/auth.decorator';
import {
  PermissionList,
  RequiresPermissions,
} from '@/auth/guards/permissions.guard';

export const FeatureRequest = (route: string, perms: PermissionList) =>
  applyDecorators(
    ...[
      HttpCode(200),
      Get(route),
      RequiresPermissions(perms),
      Auth(),
    ].reverse(),
  );
