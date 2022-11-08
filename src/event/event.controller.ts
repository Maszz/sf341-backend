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
  Query,
} from '@nestjs/common';
import { ApiProperty, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { EventService } from './event.service';
import {
  CreateEventDto,
  CreateEventResponseDto,
  GetEventByIdDto,
  EventDto,
} from './dto/create-event.dto';
import { AddParticipantDto, RemoveParticipantDto } from './dto/participant.dto';
import { Event } from '@prisma/client';
@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/createEvent')
  @ApiOkResponse({
    description: 'The event records ',
    type: CreateEventResponseDto,
  })
  @HttpCode(200)
  async createEvent(
    @Body() createEventParam: CreateEventDto,
  ): Promise<CreateEventResponseDto> {
    // const args = {
    //   name: createEventParam.eventName,
    //   description: createEventParam.description,
    //   location: createEventParam.location,
    //   date: new Date(Date.now()),
    //   creatorUsername: createEventParam.creatorUsername,
    // };
    return this.eventService.createEvent(createEventParam);
  }
  @Get('/getEventList')
  async getEventList(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Query('u') username: string,
  ): Promise<any> {
    return this.eventService.getEventList(
      parseInt(offset),
      parseInt(limit),
      username,
    );
  }

  @Get('/getEventById')
  async getEventById(@Query('id') id: string): Promise<any> {
    return this.eventService.getEventByIdForCardDisplay(id);
  }

  @Post('/addParticipant')
  @ApiOkResponse({
    description: 'The event records by id.',
    type: EventDto,
  })
  @HttpCode(200)
  async addParticipant(@Body() args: AddParticipantDto): Promise<any> {
    return this.eventService.addPaticipantToEvent(args);
  }

  // @Post('/removeParticipant')
  // @ApiOkResponse({
  //   description: 'The event records by id.',
  //   type: EventDto,
  // })
  // @HttpCode(200)
  // async removeParticipant(
  //   @Body() args: RemoveParticipantDto,
  // ): Promise<EventDto> {
  //   return this.eventService.removePaticipantToEvent(args);
  // }

  // @ApiOkResponse({
  //   description: 'The event records by id.',
  //   type: GetEventByIdDto,
  // })
  // @Get('/getEvent/:eventId')
  // async getEvent(@Param('eventId') eventId: string): Promise<GetEventByIdDto> {
  //   return this.eventService.getEventById(eventId);
  // }
}
