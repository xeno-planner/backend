import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma.service';
export declare class VerificationService implements OnModuleInit {
    private readonly prisma;
    private readonly configService;
    private readonly mailService;
    constructor(prisma: PrismaService, configService: ConfigService, mailService: MailService);
    private clearStale;
    onModuleInit(): Promise<void>;
    getByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        secret: string;
        status: import(".prisma/client").$Enums.VerificationStatus;
    }>;
    requestVerification(userId: string): Promise<void>;
    verify(userId: string, secret: string): Promise<boolean>;
}
