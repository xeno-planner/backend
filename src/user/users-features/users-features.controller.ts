import { Controller, Get, HttpCode } from '@nestjs/common';

import { Auth } from '@/auth/decorators/auth.decorator';
import { RequiresPermissions } from '@/auth/guards/permissions.guard';

import { UsersFeaturesService } from './users-features.service';

@Controller('user/features')
export class UsersFeaturesController {
  constructor(private readonly usersFeaturesService: UsersFeaturesService) {}

  @HttpCode(200)
  @Get('/can-access-admin-page')
  @RequiresPermissions({ canAccessAdminPage: true })
  @Auth()
  canAccessAdminPage() {}
}
