import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from '@/auth/dto/auth.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: AuthDto) {
    return dto;
  }
}
