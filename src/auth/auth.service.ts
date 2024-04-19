import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';

import { AuthDto } from '@/auth/dto/auth.dto';
import { SanitizedUser } from '@/types/SanitizedUser';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: AuthDto) {
    // Get user and sanitize him
    const user = await this.validateUser(dto);
    const sanitized = this.sanitizeUser(user);
    /** Access and refresh tokens */
    const tokens = this.issueToken(sanitized.id);

    return {
      user: sanitized,
      ...tokens,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sanitizeUser({ password, ...user }: User): SanitizedUser {
    return user;
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

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    /** True if password from dto is valid. */
    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
