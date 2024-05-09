import { PrismaService } from '@/prisma.service';
import { TimeBlockDto } from '@/time-block/dto/time-block.dto';
export declare class TimeBlockService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
        duration: number;
        order: number;
        userId: string;
    }[]>;
    create(dto: TimeBlockDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
        duration: number;
        order: number;
        userId: string;
    }>;
    update(dto: Partial<TimeBlockDto>, timeBlockId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
        duration: number;
        order: number;
        userId: string;
    }>;
    delete(timeBlockId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
        duration: number;
        order: number;
        userId: string;
    }>;
    updateOrder(ids: string[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
        duration: number;
        order: number;
        userId: string;
    }[]>;
}
