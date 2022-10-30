import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetCurrentUserCookie } from 'src/auth/decorators/getCurrentUserCookie.decorator';
import { TagService } from './tag.service';
@Controller('tags')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Get()
  getAllTags(): Promise<string[]> {
    return this.service.getAllTags();
  }

  @Get('set')
  setPrimaryTag(): Promise<void> {
    return this.service.setPrimaryTag();
  }
}
