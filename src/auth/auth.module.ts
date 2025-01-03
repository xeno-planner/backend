import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '@/auth/jwt.strategy';
import { getJwtConfig } from '@/config/jwt.config';
import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma.service';
import { UserModule } from '@/user/user.module';
import { VerificationService } from '@/verification.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    VerificationService,
    MailService,
  ],
})
export class AuthModule {}
