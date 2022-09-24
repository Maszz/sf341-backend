import { ApiProperty, ApiOkResponse } from '@nestjs/swagger';
import { Event, EventChat, User } from '@prisma/client';
import { UserDto } from '../../user/dto/user.dto';
export class CreateEventDto {
  @ApiProperty()
  eventName: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  creatorUsername: string;
}

export class EventChatDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  eventId: string;
}
export class EventDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  location: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  creatorId: string;
  @ApiProperty()
  participantsId: string[];
}
export class CreateEventResponseDto {
  @ApiProperty({ type: EventDto })
  event: Event;
  @ApiProperty({ type: EventChatDto })
  eventChat: EventChatDto;
}
export class GetEventByIdDto extends EventDto {
  @ApiProperty()
  creator: UserDto;
  @ApiProperty({ type: [UserDto] })
  participants: UserDto[];
  @ApiProperty()
  eventChat: EventChatDto;
}
