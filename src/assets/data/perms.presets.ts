import { PermissionList } from '@/auth/guards/permissions.guard';

const superUser: PermissionList = {
  all: true,
};

/** Makes it easier to set up user permissions. */
export const PermsPresets = {
  superUser,
};
