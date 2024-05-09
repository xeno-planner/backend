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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBlockController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const time_block_dto_1 = require("./dto/time-block.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const time_block_service_1 = require("./time-block.service");
let TimeBlockController = class TimeBlockController {
    constructor(timeBlockService) {
        this.timeBlockService = timeBlockService;
    }
    async getAll(userId) {
        return this.timeBlockService.getAll(userId);
    }
    async create(dto, userId) {
        return this.timeBlockService.create(dto, userId);
    }
    async update(dto, userId, id) {
        return this.timeBlockService.update(dto, id, userId);
    }
    async updateOrder(dto) {
        return this.timeBlockService.updateOrder(dto.ids);
    }
    async delete(userId, id) {
        return this.timeBlockService.delete(id, userId);
    }
};
exports.TimeBlockController = TimeBlockController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeBlockController.prototype, "getAll", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [time_block_dto_1.TimeBlockDto, String]),
    __metadata("design:returntype", Promise)
], TimeBlockController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/:id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [time_block_dto_1.TimeBlockDto, String, String]),
    __metadata("design:returntype", Promise)
], TimeBlockController.prototype, "update", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('order/update'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], TimeBlockController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeBlockController.prototype, "delete", null);
exports.TimeBlockController = TimeBlockController = __decorate([
    (0, common_1.Controller)('user/time-block'),
    __metadata("design:paramtypes", [time_block_service_1.TimeBlockService])
], TimeBlockController);
//# sourceMappingURL=time-block.controller.js.map