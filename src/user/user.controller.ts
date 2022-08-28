import { Controller, Get, Req, Res, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRespondDto } from './user.dto';

import { LoggerService } from '../logger/logger.service';
import { User, Prisma } from '@prisma/client';

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
}
