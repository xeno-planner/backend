import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

import {
  IsOptionalBoolean,
  IsOptionalEnum,
  IsOptionalString,
} from '@/assets/decorators/validation';

export class TaskDto {
  @IsOptionalString()
  name: string;

  @IsOptionalBoolean()
  isCompleted?: boolean;

  @IsOptionalString()
  createdAt?: string;

  @IsOptionalEnum(Priority)
  @Transform(({ value }) => ('' + value).toLowerCase())
  priority: Priority;
}
