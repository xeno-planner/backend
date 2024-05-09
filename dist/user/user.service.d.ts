import { User } from '@prisma/client';
import { SanitizedUser } from '@/assets/types/SanitizedUser';
import { AuthDto } from '@/auth/dto/auth.dto';
import { PrismaService } from '@/prisma.service';
import { UserDto } from '@/user/dto/user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(id: User['id']): Promise<{
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            priority: import(".prisma/client").$Enums.Priority;
            isCompleted: boolean;
            userId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        workInterval: number;
        breakInterval: number;
        intervalsCount: number;
    }>;
    getByEmail(email: User['email']): Promise<{
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            priority: import(".prisma/client").$Enums.Priority;
            isCompleted: boolean;
            userId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        workInterval: number;
        breakInterval: number;
        intervalsCount: number;
    }>;
    create(dto: AuthDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        name: string;
        password: string;
        workInterval: number;
        breakInterval: number;
        intervalsCount: number;
    }>;
    update(id: string, dto: UserDto): Promise<{
        email: string;
        name: string;
    }>;
    delete(id: string): Promise<void>;
    getProfile(id: string): Promise<{
        user: SanitizedUser;
        statistics: Array<{
            label: string;
            value: number;
        }>;
    }>;
}
