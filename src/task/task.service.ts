import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { AuthenticatedRequest } from 'src/types/authenticatedRequest';
import { ChangeTaskDto } from './dto/changeTask.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) { }
  async createTask(data: CreateTaskDto, req: AuthenticatedRequest) {
    try {
      if (!req.user?.userId) {
        console.log(req.user)
        throw new Error('User ID is not defined');
      }
      await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          user: {
            connect: { id: req.user.userId },
          },
        },
      });
      return true
    } catch (e) {
      console.error(e)
      throw new Error('Create task  failed');

    }
  }
  async changeTask(data: ChangeTaskDto, req: AuthenticatedRequest) {
    try {
      if (!req.user?.userId) {
        throw new Error('User ID is not defined');
      }
      const existingTask = await this.prisma.task.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!existingTask) {
        throw new Error('Task not found');
      }

      if (existingTask.userId !== req.user.userId) {
        throw new Error('You do not have permission to modify this task');
      }

      await this.prisma.task.update({
        where: {
          id: data.id
        },
        data: {
          title: data.title,
          description: data.description,
        },
      });
      return true
    } catch (e) {
      console.error(e)
      throw new Error('Create task  failed');

    }
  }
  async deleteTask(taskId: string, req: AuthenticatedRequest): Promise<boolean> {
    try {
      if (!req.user?.userId) {
        throw new Error('User ID is not defined');
      }

      const existingTask = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!existingTask) {
        throw new Error('Task not found');
      }

      if (existingTask.userId !== req.user.userId) {
        throw new Error('You do not have permission to delete this task');
      }

      await this.prisma.task.delete({
        where: { id: taskId },
      });

      return true;
    } catch (e) {
      console.error(e);
      throw new Error('Delete task failed');
    }
  }
  async changeComplete(taskId: string, req: AuthenticatedRequest): Promise<boolean> {
    try {
      if (!req.user?.userId) {
        throw new Error('User ID is not defined');
      }
      const existingTask = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!existingTask) {
        throw new Error('Task not found');
      }

      if (existingTask.userId !== req.user.userId) {
        throw new Error('You do not have permission to delete this task');
      }
      await this.prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          isComplete: !existingTask.isComplete
        }
      })
      return true;
    } catch (e) {
      console.error(e);
      throw new Error('Delete task failed');
    }

  }


}
