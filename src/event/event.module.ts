import { Module, Logger, Global } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { EventService } from './event.service';
import { EventController } from './event.controller';
@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService, Logger],
})
export class EventModule {}
