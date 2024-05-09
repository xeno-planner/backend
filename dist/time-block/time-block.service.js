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
exports.TimeBlockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TimeBlockService = class TimeBlockService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(userId) {
        return this.prisma.timeBlock.findMany({
            where: {
                userId,
            },
            orderBy: {
                order: 'asc',
            },
        });
    }
    async create(dto, userId) {
        return this.prisma.timeBlock.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    async update(dto, timeBlockId, userId) {
        return this.prisma.timeBlock.update({
            where: {
                userId,
                id: timeBlockId,
            },
            data: dto,
        });
    }
    async delete(timeBlockId, userId) {
        return this.prisma.timeBlock.delete({
            where: {
                id: timeBlockId,
                userId,
            },
        });
    }
    async updateOrder(ids) {
        return this.prisma.$transaction(ids.map((id, order) => this.prisma.timeBlock.update({
            where: { id },
            data: { order },
        })));
    }
};
exports.TimeBlockService = TimeBlockService;
exports.TimeBlockService = TimeBlockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeBlockService);
//# sourceMappingURL=time-block.service.js.map