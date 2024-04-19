import { IsNumber } from 'class-validator';

import { IsOptionalBoolean } from '@/assets/decorators/validation';

export class PomodoroSessionDto {
  @IsOptionalBoolean()
  isCompleted: boolean;
}

export class PomodoroRoundDto {
  @IsNumber()
  totalSeconds: number;

  @IsOptionalBoolean()
  isCompleted: boolean;
}
