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
exports.PomodoroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PomodoroService = class PomodoroService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTodaySession(userId) {
        const today = new Date().toISOString().split('T')[0];
        return this.prisma.pomodoroSession.findFirst({
            where: {
                createdAt: {
                    gte: new Date(today),
                },
                userId,
            },
            include: {
                rounds: {
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
        });
    }
    async create(userId) {
        const todaySession = await this.getTodaySession(userId);
        if (todaySession)
            return todaySession;
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                intervalsCount: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.pomodoroSession.create({
            data: {
                rounds: {
                    createMany: {
                        data: Array.from({ length: user.intervalsCount }, () => ({
                            totalSeconds: 0,
                        })),
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                rounds: true,
            },
        });
    }
    async update(dto, pomodoroId, userId) {
        return this.prisma.pomodoroSession.update({
            where: {
                userId,
                id: pomodoroId,
            },
            data: dto,
        });
    }
    async updateRound(dto, roundId) {
        return this.prisma.pomodoroRound.update({
            where: {
                id: roundId,
            },
            data: dto,
        });
    }
    async deleteSession(sessionId, userId) {
        return this.prisma.pomodoroSession.delete({
            where: {
                id: sessionId,
                userId,
            },
        });
    }
};
exports.PomodoroService = PomodoroService;
exports.PomodoroService = PomodoroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PomodoroService);
//# sourceMappingURL=pomodoro.service.js.map