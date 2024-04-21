import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

@Injectable()
export class VerificationService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  /** Returns string of oldest allowed date. */
  private getTimeThreshold(): string {
    return new Date().toISOString().split('T')[0];
  }

  /** Clears stale verifications. */
  private async clearStale() {
    const today = new Date().toISOString().split('T')[0];

    // Clear all verifications that are too old
    const deletionInfo = await this.prisma.userVerification.deleteMany({
      where: {
        createdAt: {
          lt: new Date(today),
        },
      },
    });

    // Log deletion info only if any deleted
    if (deletionInfo.count > 0) {
      Logger.log(`Deleted stale verifications: ${deletionInfo.count}`);
    }
  }

  async onModuleInit() {
    await this.clearStale();
  }

  async getByUserId(userId: string) {
    await this.clearStale();

    const today = this.getTimeThreshold();

    return this.prisma.userVerification.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(today),
        },
      },
    });
  }

  /**
   * This methods contains logic related to
   * sending email and creating verification record in database.
   * @param userId
   */
  async requestVerification(userId: string) {
    await this.prisma.userVerification.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
