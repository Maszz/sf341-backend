import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  HttpCode,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
interface CreateEventDto {
  eventName: string;
  description: string;
  location: string;
  date: string;
  creatorUsername: string;
}

interface AddAndRemoveParticipantDto {
  eventId: string;
  username: string;
}

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/createEvent')
  @HttpCode(200)
  async createEvent(@Body() createEventParam: CreateEventDto): Promise<any> {
    const date = new Date(createEventParam.date);
    const args = {
      name: createEventParam.eventName,
      description: createEventParam.description,
      location: createEventParam.location,
      date: new Date(Date.now()),
      creatorUsername: createEventParam.creatorUsername,
    };
    return this.eventService.createEvent(args);
  }

  @Post('/addParticipant')
  @HttpCode(200)
  async addParticipant(@Body() args: AddAndRemoveParticipantDto): Promise<any> {
    return this.eventService.addPaticipantToEvent(args);
  }

  @Post('/removeParticipant')
  @HttpCode(200)
  async removeParticipant(
    @Body() args: AddAndRemoveParticipantDto,
  ): Promise<any> {
    return this.eventService.removePaticipantToEvent(args);
  }

  @Get('/getEvent/:eventId')
  async getEvent(@Param('eventId') eventId: string) {
    return this.eventService.getEventById(eventId);
  }
}
