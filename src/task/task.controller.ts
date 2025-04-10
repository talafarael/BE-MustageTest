import { Body, Controller, Delete, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { AuthenticatedRequest } from 'src/types/authenticatedRequest';
import { ChangeTaskDto } from './dto/changeTask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  @Post("create")
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() data: CreateTaskDto, @Request() req: AuthenticatedRequest) {
    return await this.taskService.createTask(data, req)
  }
  @Post("change")
  @UseGuards(JwtAuthGuard)
  async changeTask(@Body() data: ChangeTaskDto, @Request() req: AuthenticatedRequest) {
    return await this.taskService.changeTask(data, req)
  }
  @Post("change-complete")
  @UseGuards(JwtAuthGuard)
  async changeComplete(@Query("taskId") taskId: string, @Request() req: AuthenticatedRequest) {

    return await this.taskService.changeComplete(taskId, req);
  }
  @Post(":id")
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param("id") id: string, @Request() req: AuthenticatedRequest) {
    return await this.taskService.deleteTask(id, req);
  }



}
