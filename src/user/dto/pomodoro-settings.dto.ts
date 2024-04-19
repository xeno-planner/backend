import { User } from '@prisma/client';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

interface IPomodoroSettings
  extends Partial<
    Pick<User, 'workInterval' | 'breakInterval' | 'intervalsCount'>
  > {}

export class PomodoroSettingsDto implements IPomodoroSettings {
  @IsOptional()
  @IsNumber()
  @Min(1)
  workInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalsCount?: number;
}
