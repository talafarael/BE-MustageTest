import { Controller, Get, Param, Query, Request, Search, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types/authenticatedRequest';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return await this.userService.findOne(req.user.email)
  }
  @UseGuards(JwtAuthGuard)
  @Get("get-task")
  async getTask(
    @Query("filter") filter: string | null,
    @Query("search") search: string | undefined,
    @Request() req: AuthenticatedRequest
  ) {
    return await this.userService.getTask(filter, search, req);
  }
}
