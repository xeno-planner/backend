import { Injectable } from '@nestjs/common';

import { DbStatus } from '@/../packages/types/extra';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class ServerAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Tries to connect to database. */
  async getDbStatus(): Promise<DbStatus> {
    let status: DbStatus['status'] = 'ok';

    // Trying to connect to database here. If it fails
    // we will know in response.
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (err) {
      status = 'failing';
    }

    return {
      status,
    };
  }
}
