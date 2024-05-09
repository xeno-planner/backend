import { PomodoroRoundDto, PomodoroSessionDto } from '@/pomodoro/pomodoro.dto';
import { PomodoroService } from './pomodoro.service';
export declare class PomodoroController {
    private readonly pomodoroService;
    constructor(pomodoroService: PomodoroService);
    getTodaySession(userId: string): Promise<{
        rounds: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            totalSeconds: number;
            isCompleted: boolean;
            pomodoroSessionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isCompleted: boolean;
        userId: string;
    }>;
    create(userId: string): Promise<{
        rounds: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            totalSeconds: number;
            isCompleted: boolean;
            pomodoroSessionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isCompleted: boolean;
        userId: string;
    }>;
    updateRound(id: string, dto: PomodoroRoundDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalSeconds: number;
        isCompleted: boolean;
        pomodoroSessionId: string;
    }>;
    update(dto: PomodoroSessionDto, userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isCompleted: boolean;
        userId: string;
    }>;
    deleteSession(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isCompleted: boolean;
        userId: string;
    }>;
}
