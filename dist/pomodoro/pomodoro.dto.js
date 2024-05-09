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
exports.PomodoroRoundDto = exports.PomodoroSessionDto = void 0;
const class_validator_1 = require("class-validator");
const validation_1 = require("../assets/decorators/validation");
class PomodoroSessionDto {
}
exports.PomodoroSessionDto = PomodoroSessionDto;
__decorate([
    (0, validation_1.IsOptionalBoolean)(),
    __metadata("design:type", Boolean)
], PomodoroSessionDto.prototype, "isCompleted", void 0);
class PomodoroRoundDto {
}
exports.PomodoroRoundDto = PomodoroRoundDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PomodoroRoundDto.prototype, "totalSeconds", void 0);
__decorate([
    (0, validation_1.IsOptionalBoolean)(),
    __metadata("design:type", Boolean)
], PomodoroRoundDto.prototype, "isCompleted", void 0);
//# sourceMappingURL=pomodoro.dto.js.map