import { IsNumber, IsString } from 'class-validator';

import {
  IsOptionalNumber,
  IsOptionalString,
} from '@/assets/decorators/validation';

export class TimeBlockDto {
  @IsString()
  name: string;

  @IsOptionalString()
  color?: string;

  @IsNumber()
  duration: number;

  @IsOptionalNumber()
  order: number;
}
