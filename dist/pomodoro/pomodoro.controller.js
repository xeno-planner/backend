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
exports.PomodoroController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const pomodoro_dto_1 = require("./pomodoro.dto");
const pomodoro_service_1 = require("./pomodoro.service");
let PomodoroController = class PomodoroController {
    constructor(pomodoroService) {
        this.pomodoroService = pomodoroService;
    }
    async getTodaySession(userId) {
        return this.pomodoroService.getTodaySession(userId);
    }
    async create(userId) {
        return this.pomodoroService.create(userId);
    }
    async updateRound(id, dto) {
        return this.pomodoroService.updateRound(dto, id);
    }
    async update(dto, userId, id) {
        return this.pomodoroService.update(dto, id, userId);
    }
    async deleteSession(id, userId) {
        return this.pomodoroService.deleteSession(id, userId);
    }
};
exports.PomodoroController = PomodoroController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('today'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PomodoroController.prototype, "getTodaySession", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PomodoroController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/round/:id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pomodoro_dto_1.PomodoroRoundDto]),
    __metadata("design:returntype", Promise)
], PomodoroController.prototype, "updateRound", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)('/:id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pomodoro_dto_1.PomodoroSessionDto, String, String]),
    __metadata("design:returntype", Promise)
], PomodoroController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)('/:id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PomodoroController.prototype, "deleteSession", null);
exports.PomodoroController = PomodoroController = __decorate([
    (0, common_1.Controller)('user/timer'),
    __metadata("design:paramtypes", [pomodoro_service_1.PomodoroService])
], PomodoroController);
//# sourceMappingURL=pomodoro.controller.js.map