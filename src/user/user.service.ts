import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: User['id']) {
    return this.prisma.user.findMany({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
  }
}
