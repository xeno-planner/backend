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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const components_1 = require("@react-email/components");
const nodemailer_1 = require("nodemailer");
const user_service_1 = require("../user/user.service");
let MailService = class MailService {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
        this.transporter = null;
        this.transporter = (0, nodemailer_1.createTransport)({
            service: 'Gmail',
            auth: {
                user: this.configService.get('SMTP_EMAIL_HOST_USER'),
                pass: this.configService.get('SMTP_EMAIL_HOST_PASSWORD'),
            },
            secure: true,
        });
    }
    async renderEmail(...params) {
        return (0, components_1.renderAsync)(...params);
    }
    async sendMailTo({ email, subject, html }) {
        await this.transporter.sendMail({
            from: this.configService.get('SMTP_EMAIL_HOST_USER'),
            to: email,
            subject,
            html,
        });
    }
    async sendMailByUserId(userId, ...params) {
        const { email } = await this.userService.getById(userId);
        const html = await this.renderEmail(...params);
        await this.sendMailTo({
            email,
            subject: 'Подтверждение учетной записи',
            html,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map