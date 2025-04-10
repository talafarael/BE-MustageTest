import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async findOne(email: string): Promise<any | undefined> {
    try {
      return await this.prisma.user.findFirst({
        where: { email: email },
        include: {
          tasks: true
        }
      })
    } catch (e) {
      console.error('Error in findOne:', e);
      throw new Error('Failed to fetch user by name');
    }
  }
  async getTask(filter: string | null, search: string | undefined, req) {
    try {
      if (!req.user?.userId) {
        throw new Error('User ID is not defined');
      }

      const userId = req.user.userId;

      const parsedFilter =
        filter === 'true' ? true :
          filter === 'false' ? false :
            null;
      const parsedSearch = search === 'undefined' || search === undefined ? undefined : search;

      const where: Prisma.TaskWhereInput = {
        userId,
        ...(parsedSearch && {
          title: {
            contains: parsedSearch,
            mode: 'insensitive',
          }
        }),
        ...(parsedFilter !== null && { isComplete: parsedFilter }),
      };

      const tasks = await this.prisma.task.findMany({ where });
      return tasks;

    } catch (e) {
      console.error(e);
      throw new Error('Delete task failed');
    }

  }
}

