import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

import { AuthDto } from '@/auth/dto/auth.dto';

import { PomodoroSettingsDto } from './pomodoro-settings.dto';

export class UserDto extends PomodoroSettingsDto implements AuthDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  password: string;
}
