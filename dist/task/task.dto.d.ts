import { Priority } from '@prisma/client';
export declare class TaskDto {
    name: string;
    isCompleted?: boolean;
    createdAt?: string;
    priority: Priority;
}
