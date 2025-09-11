import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';

import { PrismaService } from '@/prisma.service';
import { TaskDto } from '@/task/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async taskExists(taskId: string): Promise<boolean> {
    const task: Task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (task === null) {
      return false;
    }

    if (task === undefined) {
      return false;
    }

    return true;
  }

  async getAll(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(dto: TaskDto, userId: string) {
    return this.prisma.task.create({
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

  async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
    if (!(await this.taskExists(taskId))) throw new NotFoundException();

    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }

  async delete(taskId: string) {
    if (!(await this.taskExists(taskId))) throw new NotFoundException();

    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
