import { TaskDto } from '@/task/task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        priority: import(".prisma/client").$Enums.Priority;
        isCompleted: boolean;
        userId: string;
    }[]>;
    create(dto: TaskDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        priority: import(".prisma/client").$Enums.Priority;
        isCompleted: boolean;
        userId: string;
    }>;
    update(dto: TaskDto, userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        priority: import(".prisma/client").$Enums.Priority;
        isCompleted: boolean;
        userId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        priority: import(".prisma/client").$Enums.Priority;
        isCompleted: boolean;
        userId: string;
    }>;
}
