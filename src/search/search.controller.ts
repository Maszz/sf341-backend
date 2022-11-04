import { Controller, Get, Param, Post, Req, Res, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
export type SearchContent = {
  content: string;
  type: string;
  id: string;
  date?: string;
  location?: string;
  name?: string;
  bio?: string;
};
@Controller('search')
export class SearchController {
  private readonly redis: Redis;

  constructor(
    private readonly service: SearchService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  @Get('keyword')
  async search(
    // @Param() param: { keyword: string },
    @Query('term') term: string,
  ): Promise<SearchContent[]> {
    const cache = await this.redis.get(`search?${term}`);
    if (cache) {
      console.log('cache');
      return Promise.resolve(JSON.parse(cache)) as Promise<SearchContent[]>;
    }
    if (term == '') {
      console.log('empty');
      return Promise.resolve([]);
    }
    const result = await this.service.search(term);
    this.redis.set(`search?${term}`, JSON.stringify(result), 'EX', 10);
    return result;
  }
}
