import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

@Injectable()
export class VerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUserId(id: string) {
    const today = new Date().toISOString().split('T')[0];

    return this.prisma.userVerification.findUnique({
      where: {
        userId: id,
        createdAt: {
          gte: new Date(today),
        },
      },
    });
  }
}
