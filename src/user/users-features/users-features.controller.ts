import { Controller } from '@nestjs/common';

import { FeatureRequest } from './user-features.decorators';
import { UsersFeaturesService } from './users-features.service';

@Controller('user/features')
export class UsersFeaturesController {
  constructor(private readonly usersFeaturesService: UsersFeaturesService) {}

  @FeatureRequest('/can-access-admin-page', {
    canAccessAdminPage: true,
  })
  canAccessAdminPage() {}

  @FeatureRequest('/can-view-db-status', {
    canAccessAdminPage: true,
    canViewDbStatus: true,
  })
  canViewDbStatus() {}
}
