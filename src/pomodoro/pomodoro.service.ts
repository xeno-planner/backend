import { Injectable, NotFoundException } from '@nestjs/common';
import { PomodoroRound, PomodoroSession } from '@prisma/client';

import { PomodoroRoundDto, PomodoroSessionDto } from '@/pomodoro/pomodoro.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class PomodoroService {
  constructor(private readonly prisma: PrismaService) {}

  async roundExists(roundId: string): Promise<boolean> {
    const round: PomodoroRound = await this.prisma.pomodoroRound.findUnique({
      where: {
        id: roundId,
      },
    });

    return round !== null && round !== undefined;
  }

  async sessionExists(sessionId: string): Promise<boolean> {
    const session: PomodoroSession =
      await this.prisma.pomodoroSession.findUnique({
        where: {
          id: sessionId,
        },
      });

    return session !== null && session !== undefined;
  }

  async getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    return this.prisma.pomodoroSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today),
        },
        userId,
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) return todaySession;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        intervalsCount: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.pomodoroSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervalsCount }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        rounds: true,
      },
    });
  }

  async update(
    dto: Partial<PomodoroSessionDto>,
    pomodoroId: string,
    userId: string,
  ) {
    if (!(await this.sessionExists(pomodoroId))) throw new NotFoundException();

    return this.prisma.pomodoroSession.update({
      where: {
        userId,
        id: pomodoroId,
      },
      data: dto,
    });
  }

  async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
    if (!(await this.roundExists(roundId))) throw new NotFoundException();

    return this.prisma.pomodoroRound.update({
      where: {
        id: roundId,
      },
      data: dto,
    });
  }

  async deleteSession(sessionId: string, userId: string) {
    if (!(await this.sessionExists(sessionId))) throw new NotFoundException();

    return this.prisma.pomodoroSession.delete({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
}
