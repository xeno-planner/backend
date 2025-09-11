import { Injectable, NotFoundException } from '@nestjs/common';
import { TimeBlock } from '@prisma/client';

import { PrismaService } from '@/prisma.service';
import { TimeBlockDto } from '@/time-block/dto/time-block.dto';

@Injectable()
export class TimeBlockService {
  constructor(private readonly prisma: PrismaService) {}

  async exists(timeBlockId: string): Promise<boolean> {
    const block: TimeBlock = await this.prisma.timeBlock.findUnique({
      where: {
        id: timeBlockId,
      },
    });

    return block !== undefined && block !== null;
  }

  async getAll(userId: string) {
    return this.prisma.timeBlock.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async create(dto: TimeBlockDto, userId: string) {
    return this.prisma.timeBlock.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(
    dto: Partial<TimeBlockDto>,
    timeBlockId: string,
    userId: string,
  ) {
    if (!(await this.exists(timeBlockId))) throw new NotFoundException();

    return this.prisma.timeBlock.update({
      where: {
        userId,
        id: timeBlockId,
      },
      data: dto,
    });
  }

  async delete(timeBlockId: string, userId: string) {
    if (!(await this.exists(timeBlockId))) throw new NotFoundException();

    return this.prisma.timeBlock.delete({
      where: {
        id: timeBlockId,
        userId,
      },
    });
  }

  async updateOrder(ids: string[]) {
    return this.prisma.$transaction(
      ids.map((id, order) =>
        this.prisma.timeBlock.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }
}
