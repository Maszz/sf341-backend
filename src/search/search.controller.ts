import { Controller, Get, Param, Post, Req, Res, Query } from '@nestjs/common';
import { SearchService } from './search.service';
@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('keyword')
  search(
    // @Param() param: { keyword: string },
    @Query('term') term: string,
  ): Promise<{ content: string; type: string; id?: string }[]> {
    if (term == '') {
      return Promise.resolve([]);
    }
    return this.service.search(term);
  }
}
