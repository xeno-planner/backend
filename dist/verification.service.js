"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const Verification_template_1 = require("./assets/templates/Verification.template");
const mail_service_1 = require("./mail/mail.service");
const prisma_service_1 = require("./prisma.service");
let VerificationService = class VerificationService {
    constructor(prisma, configService, mailService) {
        this.prisma = prisma;
        this.configService = configService;
        this.mailService = mailService;
    }
    async clearStale() {
        const today = new Date().toISOString().split('T')[0];
        const deletionInfo = await this.prisma.userVerification.deleteMany({
            where: {
                status: {
                    not: client_1.VerificationStatus.accepted,
                },
                createdAt: {
                    lt: new Date(today),
                },
            },
        });
        if (deletionInfo.count > 0) {
            common_1.Logger.log(`Deleted stale verifications: ${deletionInfo.count}`);
        }
    }
    async onModuleInit() {
        await this.clearStale();
    }
    async getByUserId(userId) {
        await this.clearStale();
        return this.prisma.userVerification.findFirst({
            where: {
                userId,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }
    async requestVerification(userId) {
        const appUrl = this.configService.get('APP_FULL_URL');
        const secret = (0, random_string_generator_util_1.randomStringGenerator)();
        const linkToVerification = `${appUrl}/api/auth/verify/${userId}?secret=${secret}`;
        await this.mailService.sendMailByUserId(userId, (0, Verification_template_1.default)({ url: linkToVerification }));
        await this.prisma.userVerification.create({
            data: {
                secret: await (0, argon2_1.hash)(secret),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    async verify(userId, secret) {
        const { secret: encodedSecret, status } = await this.getByUserId(userId);
        if (status === client_1.VerificationStatus.accepted) {
            throw new common_1.UnprocessableEntityException('User already verified');
        }
        const isValid = await (0, argon2_1.verify)(encodedSecret, secret);
        if (isValid) {
            await this.prisma.userVerification.update({
                where: {
                    userId,
                },
                data: {
                    status: client_1.VerificationStatus.accepted,
                },
            });
        }
        return isValid;
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        mail_service_1.MailService])
], VerificationService);
//# sourceMappingURL=verification.service.js.map