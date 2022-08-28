import { Module, CacheInterceptor } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MessageService, MessageResolver],
  exports: [],
})
export class MessageModule {}
