import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

import {
  OptionalBoolean,
  OptionalEnum,
  OptionalString,
} from '@/assets/decorators/validation';

export class TaskDto {
  @OptionalString()
  name: string;

  @OptionalBoolean()
  isCompleted?: boolean;

  @OptionalString()
  createdAt?: string;

  @OptionalEnum(Priority)
  @Transform(({ value }) => ('' + value).toLowerCase())
  priority: Priority;
}
