import { Controller, Get } from '@nestjs/common';

import { Auth } from '@/auth/decorators/auth.decorator';
import { RequiresPermissions } from '@/auth/guards/permissions.guard';

import { ServerAnalyticsService } from './server-analytics.service';

@Controller('admin/server-analytics')
export class ServerAnalyticsController {
  constructor(
    private readonly serverAnalyticsService: ServerAnalyticsService,
  ) {}

  @Get('/db/status')
  @RequiresPermissions({ canAccessAdminPage: true })
  @Auth()
  async getDbStatus() {
    return this.serverAnalyticsService.getDbStatus();
  }
}
