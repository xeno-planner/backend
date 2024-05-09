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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(id) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                tasks: true,
            },
        });
    }
    async getByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                tasks: true,
            },
        });
    }
    async create(dto) {
        const user = {
            email: dto.email,
            name: '',
            password: await (0, argon2_1.hash)(dto.password),
        };
        return this.prisma.user.create({
            data: user,
        });
    }
    async update(id, dto) {
        let data = dto;
        if (dto.password) {
            data = { ...dto, password: await (0, argon2_1.hash)(dto.password) };
        }
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                name: true,
                email: true,
            },
        });
    }
    async delete(id) {
        await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
    async getProfile(id) {
        const profile = await this.getById(id);
        const totalTasks = profile.tasks.length;
        const completedTasks = await this.prisma.task.count({
            where: {
                userId: id,
                isCompleted: true,
            },
        });
        const todayStart = (0, date_fns_1.startOfDay)(new Date());
        const weekStart = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(new Date(), 7));
        const todayTasks = await this.prisma.task.count({
            where: {
                userId: id,
                createdAt: {
                    gte: todayStart.toISOString(),
                },
            },
        });
        const weekTasks = await this.prisma.task.count({
            where: {
                userId: id,
                createdAt: {
                    gte: weekStart.toISOString(),
                },
            },
        });
        const { password, ...rest } = profile;
        return {
            user: rest,
            statistics: [
                {
                    label: 'Всего',
                    value: totalTasks,
                },
                {
                    label: 'Выполнено задач',
                    value: completedTasks,
                },
                {
                    label: 'Задачи за сегодня',
                    value: todayTasks,
                },
                {
                    label: 'Задачи за неделю',
                    value: weekTasks,
                },
            ],
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map