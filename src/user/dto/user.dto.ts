import { IsEmail, IsOptional, MinLength } from 'class-validator';

import { OptionalString } from '@/assets/decorators/validation';
import { AuthDto } from '@/auth/dto/auth.dto';

import { PomodoroSettingsDto } from './pomodoro-settings.dto';

export class UserDto extends PomodoroSettingsDto implements AuthDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @OptionalString()
  name: string;

  @OptionalString()
  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  password: string;
}
