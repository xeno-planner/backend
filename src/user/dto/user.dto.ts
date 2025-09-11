import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { IsOptionalString } from '@/assets/decorators/validation';
import { AuthDto } from '@/auth/dto/auth.dto';

import { PomodoroSettingsDto } from './pomodoro-settings.dto';

export class UserDto extends PomodoroSettingsDto implements AuthDto {
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'login must be at least 5 characters long',
  })
  @MaxLength(15, {
    message: 'login must be not longer then 5 characters long',
  })
  login: string;

  @IsOptionalString()
  name: string;

  @IsOptionalString()
  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  password: string;
}
