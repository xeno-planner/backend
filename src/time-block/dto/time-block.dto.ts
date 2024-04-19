import { IsNumber, IsString } from 'class-validator';

import { OptionalNumber, OptionalString } from '@/assets/decorators/validation';

export class TimeBlockDto {
  @IsString()
  name: string;

  @OptionalString()
  color?: string;

  @IsNumber()
  duration: number;

  @OptionalNumber()
  order: number;
}
