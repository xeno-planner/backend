import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDto } from '@/auth/dto/auth.dto';
import { UserService } from '@/user/user.service';
import { VerificationService } from '@/verification.service';
export declare class AuthService {
    private readonly jwt;
    private readonly userService;
    private readonly verificationService;
    private readonly configService;
    constructor(jwt: JwtService, userService: UserService, verificationService: VerificationService, configService: ConfigService);
    EXPIRE_DAY_REFRESH_TOKEN: number;
    REFRESH_TOKEN_NAME: string;
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                priority: import(".prisma/client").$Enums.Priority;
                isCompleted: boolean;
                userId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string;
            workInterval: number;
            breakInterval: number;
            intervalsCount: number;
        };
    }>;
    register(dto: AuthDto): Promise<{
        verification: "requested";
    }>;
    verifyViaEmail(userId: string, secret: string, res: Response): Promise<void>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                priority: import(".prisma/client").$Enums.Priority;
                isCompleted: boolean;
                userId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string;
            workInterval: number;
            breakInterval: number;
            intervalsCount: number;
        };
    }>;
    private getResponseConfig;
    addRefreshTokenToResponse(res: Response, refreshToken: string): void;
    removeRefreshTokenFromResponse(res: Response): void;
    private issueToken;
    private validateUser;
    private getVerificationStatus;
}
