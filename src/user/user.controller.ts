import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserRespondDto } from './dto/user.dto';

import { LoggerService } from '../logger/logger.service';
import { User, Prisma } from '@prisma/client';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import { ApiProperty, ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  // @Get()
  // @ApiOkResponse({
  //   description: 'User response',
  //   type: [UserRespondDto],
  // })
  // async getAllUsers(): Promise<UserRespondDto[]> {
  //   const data = this.userService.users({});
  //   return data;
  // }

  @Get(':username')
  @ApiOkResponse({
    description: 'User response',
    type: UserRespondDto || 'User not found',
  })
  async getUser(
    @Param('username') username: string,
  ): Promise<UserRespondDto | 'User not found'> {
    const user =
      (await this.userService.getUserByuserName(username)) || 'User not found';
    return user;
  }

  @Post('update/profile')
  @ApiOkResponse({
    description: 'User response',
    type: UserDto,
  })
  @HttpCode(200)
  async updateUserProfile(@Body() args: UserUpdateProfileDto): Promise<{
    profile: User;
    updateUsername: boolean;
  }> {
    // TODO
    const user = await this.userService.updateProfile(args);
    return user;
  }

  @Post('update/onboarding')
  @HttpCode(200)
  async updateUserOnboarding(
    @Body() args: UpdateOnboardingParams,
  ): Promise<{ result: boolean }> {
    // TODO
    const user = await this.userService.UpdateOnboarding(args);
    return { result: user.onboarding };
  }
  @Post('update/onboarding/gender')
  @HttpCode(200)
  async updateUserOnboardingGender(
    @Body() args: UpdateOnboardingGenderParams,
  ): Promise<{ result: boolean }> {
    // TODO
    const user = await this.userService.UpdateOnboardingGender(args);
    return { result: true };
  }
  @Post('update/tags')
  @HttpCode(200)
  async updateTags(
    @Body() args: UpdateTagsParams,
  ): Promise<{ result: boolean }> {
    // TODO
    const user = await this.userService.setCategoryToUser(args);
    return { result: true };
  }
  @Get('tags')
  @HttpCode(200)
  async getTags(): Promise<{ name: string }[]> {
    // TODO
    const tags = await this.userService.getTags();
    tags.map((tag) => {
      return tag.name;
    });
    return tags;
  }
}

export interface UpdateOnboardingParams {
  onboarding: boolean;
  userId: string;
}
export interface UpdateOnboardingGenderParams {
  gender: string;
  userId: string;
}
export interface UpdateTagsParams {
  tags: string[];
  userId: string;
}
