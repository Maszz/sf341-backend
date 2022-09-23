import { Controller, Get, Req, Res, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRespondDto } from './user.dto';

import { LoggerService } from '../logger/logger.service';
import { User, Prisma } from '@prisma/client';
interface UserUpdateProfileDto {
  username: string;
  name?: string;
  surname?: string;
  bio?: string;
}
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  async getAllUsers(): Promise<UserRespondDto[]> {
    const data = this.userService.users({});
    return data;
  }

  @Get(':username')
  async getUser(
    @Param('username') username: string,
  ): Promise<UserRespondDto | string> {
    const user =
      (await this.userService.user({
        username: username,
      })) || 'User not found';
    return user;
  }

  @Post('update/profile')
  async updateUserProfile(@Body() args: UserUpdateProfileDto) {
    // TODO
    const { username, ...params } = args;
    const user = await this.userService.updateProfile({
      username: username,
      updateParams: params,
    });
  }
}
