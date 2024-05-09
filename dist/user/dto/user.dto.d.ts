import { AuthDto } from '@/auth/dto/auth.dto';
import { PomodoroSettingsDto } from './pomodoro-settings.dto';
export declare class UserDto extends PomodoroSettingsDto implements AuthDto {
    email: string;
    name: string;
    password: string;
}
