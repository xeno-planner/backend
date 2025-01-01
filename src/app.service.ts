import { Injectable } from '@nestjs/common';

import { DbStatus } from '@/assets/types';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  /** Tries to connect to database. */
  async getDbStatus(): Promise<DbStatus> {
    let canConnect = false;

    // Trying to connect to database here. If it fails
    // we will know in response.
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (err) {
      canConnect = false;
    }

    return {
      canConnect,
    };
  }
}
