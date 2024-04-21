import { Task, User } from './index';

/**
 * Result of GET /user/profile.
 */
export type Profile = {
  user: Omit<User, 'password'> & { tasks: Array<Task> };
  statistics: Array<{
    label: string;
    value: number;
  }>;
};
