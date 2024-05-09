import { User } from '@prisma/client';
interface IPomodoroSettings extends Partial<Pick<User, 'workInterval' | 'breakInterval' | 'intervalsCount'>> {
}
export declare class PomodoroSettingsDto implements IPomodoroSettings {
    workInterval?: number;
    breakInterval?: number;
    intervalsCount?: number;
}
export {};
