import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';

import { SanitizedUser } from '@/assets/types/SanitizedUser';
import { AuthDto } from '@/auth/dto/auth.dto';
import { PrismaService } from '@/prisma.service';
import { UserDto } from '@/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: User['id']) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
        role: true,
      },
    });
  }

  async getByEmail(email: User['email']) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        tasks: true,
      },
    });
  }

  async create(dto: AuthDto) {
    const user: Pick<User, 'email' | 'name' | 'password'> = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getProfile(id: string): Promise<{
    user: SanitizedUser;
    statistics: Array<{
      label: string;
      value: number;
    }>;
  }> {
    const profile = await this.getById(id);

    /** Count of all tasks of user. */
    const totalTasks = profile.tasks.length;
    /** Count of completed tasks of user. */
    const completedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    // Get one day and one week timestamps
    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    /** Count of tasks not older than one day ago. */
    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: todayStart.toISOString(),
        },
      },
    });

    /** Count of tasks not older than one week ago. */
    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: weekStart.toISOString(),
        },
      },
    });

    /** Remove password from response. */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = profile;

    return {
      user: rest,
      statistics: [
        {
          label: 'Всего',
          value: totalTasks,
        },
        {
          label: 'Выполнено задач',
          value: completedTasks,
        },
        {
          label: 'Задачи за сегодня',
          value: todayTasks,
        },
        {
          label: 'Задачи за неделю',
          value: weekTasks,
        },
      ],
    };
  }
}
