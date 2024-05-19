import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, VerificationStatus } from '@prisma/client';
import { verify } from 'argon2';
import { CookieOptions, Response } from 'express';

import { SanitizedUser } from '@/assets/types/SanitizedUser';
import { AuthDto } from '@/auth/dto/auth.dto';
import { UserService } from '@/user/user.service';
import { VerificationService } from '@/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly verificationService: VerificationService,
    private readonly configService: ConfigService,
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN: number = 1;
  REFRESH_TOKEN_NAME: string = 'refreshToken';

  async login(dto: AuthDto) {
    // Get user and sanitize him
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);

    // Check for verification
    const verificationStatus = await this.getVerificationStatus(user);

    // Continue only if user clicked
    // Confirm account button from email.
    if (verificationStatus !== VerificationStatus.accepted)
      throw new BadRequestException('Confirm account from email.');

    /** Access and refresh tokens */
    const tokens = this.issueToken(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    /** Check if user with certain email exists. */
    if (oldUser) throw new BadRequestException('User already exists');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto);

    // Request verification
    await this.verificationService.requestVerification(user.id);

    return {
      verification: VerificationStatus.requested,
    };
  }

  async verifyViaEmail(userId: string, secret: string, res: Response) {
    /** Link to deployed front-end app. */
    const frontEndUrl = this.configService.get<string>('FRONT_END_HOST');

    try {
      const isValid = await this.verificationService.verify(userId, secret);

      if (!isValid)
        throw new BadRequestException('Incorrect verification data.');

      // Redirect to front-end page
      res.redirect(`${frontEndUrl}/auth/verify/accepted`);
    } catch (err) {
      // Redirect to error page
      res.redirect(`${frontEndUrl}/auth/verify/expired`);
    }
  }

  /**
   * Generates new tokens if given refreshToken
   * is valid.
   * @param refreshToken
   */
  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getById(result.id);

    const tokens = this.issueToken(user.id);

    return {
      user,
      ...tokens,
    };
  }

  /** Returns config for cookie response. */
  private getResponseConfig(): CookieOptions {
    const envMode =
      this.configService.get<'dev' | 'prod' | undefined>('ENV_MODE') || 'dev';

    return {
      httpOnly: true,
      domain: this.configService.get('APP_HOST'),
      // true if production
      secure: envMode === 'prod',
      // lax if production
      // sameSite: envMode === 'prod' ? 'lax' : 'none',
      sameSite: 'none',
    };
  }

  /** Add refreshToken to server cookies. */
  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      ...this.getResponseConfig(),
      expires: expiresIn,
    });
  }

  /** Clear cookie header of response. */
  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      ...this.getResponseConfig(),
      expires: new Date(0),
    });
  }

  /** Generates both of access and refresh tokens. */
  private issueToken(userId: User['id']) {
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

  /**
   * Checks if user with certain email exists
   * and return him.
   */
  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    /** True if password from dto is valid. */
    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  /** Checks if user has been verificated. */
  private async getVerificationStatus({
    id,
  }: SanitizedUser): Promise<VerificationStatus> {
    const verification = await this.verificationService.getByUserId(id);

    /** No verification record was found. */
    if (!verification) {
      await this.userService.delete(id);
      throw new ForbiddenException('Verification not requested for that user');
    }

    return verification.status;
  }
}
