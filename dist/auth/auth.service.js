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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const user_service_1 = require("../user/user.service");
const verification_service_1 = require("../verification.service");
let AuthService = class AuthService {
    constructor(jwt, userService, verificationService, configService) {
        this.jwt = jwt;
        this.userService = userService;
        this.verificationService = verificationService;
        this.configService = configService;
        this.EXPIRE_DAY_REFRESH_TOKEN = 1;
        this.REFRESH_TOKEN_NAME = 'refreshToken';
    }
    async login(dto) {
        const { password, ...user } = await this.validateUser(dto);
        const verificationStatus = await this.getVerificationStatus(user);
        if (verificationStatus !== client_1.VerificationStatus.accepted)
            throw new common_1.BadRequestException('Confirm account from email.');
        const tokens = this.issueToken(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async register(dto) {
        const oldUser = await this.userService.getByEmail(dto.email);
        if (oldUser)
            throw new common_1.BadRequestException('User already exists');
        const { password, ...user } = await this.userService.create(dto);
        await this.verificationService.requestVerification(user.id);
        return {
            verification: client_1.VerificationStatus.requested,
        };
    }
    async verifyViaEmail(userId, secret, res) {
        const frontEndUrl = this.configService.get('FRONT_END_HOST');
        try {
            const isValid = await this.verificationService.verify(userId, secret);
            if (!isValid)
                throw new common_1.BadRequestException('Incorrect verification data.');
            res.redirect(`${frontEndUrl}/auth/verify/accepted`);
        }
        catch (err) {
            res.redirect(`${frontEndUrl}/auth/verify/expired`);
        }
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const { password, ...user } = await this.userService.getById(result.id);
        const tokens = this.issueToken(user.id);
        return {
            user,
            ...tokens,
        };
    }
    getResponseConfig() {
        const envMode = this.configService.get('ENV_MODE') || 'dev';
        return {
            httpOnly: true,
            domain: this.configService.get('APP_HOST'),
            secure: envMode === 'prod',
            sameSite: 'lax',
        };
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            ...this.getResponseConfig(),
            expires: expiresIn,
        });
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            ...this.getResponseConfig(),
            expires: new Date(0),
        });
    }
    issueToken(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async validateUser(dto) {
        const user = await this.userService.getByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid password');
        return user;
    }
    async getVerificationStatus({ id, }) {
        const verification = await this.verificationService.getByUserId(id);
        if (!verification) {
            await this.userService.delete(id);
            throw new common_1.ForbiddenException('Verification not requested for that user');
        }
        return verification.status;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        verification_service_1.VerificationService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map