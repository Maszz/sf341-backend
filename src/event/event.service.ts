import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import {
  Log,
  Prisma,
  Event,
  EventChat,
  Region,
  LatLng,
  MemberType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
interface ICreateEventArgs {
  eventName: string;
  eventDescription: string;
  startDateTime: string;
  endDateTime: string;
  memberType: MemberType;
  memberLimit: number;
  isPublic: boolean;
  eventColors: string[];
  location: Region;
  locationName: string;
  locationDescription: string;
  locationMarker: LatLng;
  creatorUsername: string;
}
interface IAddParticipantArgs {
  eventId: string;
  username: string;
}
@Injectable()
export class EventService {
  constructor(
    private readonly logger: Logger, // initialize logger instance
    private readonly prisma: PrismaService, // initialize prisma instance:
  ) {}

  async createEvent(
    data: ICreateEventArgs,
  ): Promise<{ event: Event; eventChat: EventChat }> {
    // this.logger.log('createEvent()');
    const event = await this.prisma.event.create({
      data: {
        name: data.eventName,
        description: data.eventDescription,
        startDate: data.startDateTime,
        endDate: data.endDateTime,
        location: data.location,
        locationName: data.locationName,
        locationMarker: data.locationMarker,
        memberType: data.memberType,
        memberLimit: data.memberLimit,
        isPublic: data.isPublic,

        eventColors: {
          c1: data.eventColors[0],
          c2: data.eventColors[1],
        },
        locationDetails: data.locationDescription,
        creator: {
          connect: {
            username: data.creatorUsername,
          },
        },
      },
    });
    const eventChat = await this.prisma.eventChat.create({
      data: {
        event: {
          connect: {
            id: event.id,
          },
        },
      },
    });
    return { event, eventChat };
  }

  async addPaticipantToEvent(data: IAddParticipantArgs) {
    // TODO
    const { eventId, username } = data;
    console.log(data);

    const creator = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        creator: true,
        participants: true,
      },
    });
    if (creator.creator.username === username) {
      console.log('case1');
      throw new ForbiddenException('creator cannot join event');
    }

    if (creator.participants.some((p) => p.username === username)) {
      console.log('case2');
      throw new ForbiddenException('You are already a participant');
      return;
    }
    const paticipan = await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        participants: {
          connect: {
            username: username,
          },
        },
      },
    });
    return paticipan;
  }

  async removePaticipantToEvent(data: IAddParticipantArgs) {
    // TODO
    const { eventId, username } = data;

    const paticipan = await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        participants: {
          disconnect: {
            id: username,
          },
        },
      },
    });
    return paticipan;
  }

  async getEventByIdForCardDisplay(eventId: string) {
    return await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        eventChat: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async getEventList(offset: number, limit: number, username: string) {
    return await this.prisma.event.findMany({
      skip: offset,
      take: limit,
      where: {
        NOT: [
          {
            creator: {
              username: username,
            },
          },
          {
            participants: {
              some: {
                username: username,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        eventColors: true,

        eventChat: {
          select: {
            id: true,
          },
        },
      },
    });
  }
  async getEventListForUserCreated(
    offset: number,
    limit: number,
    username: string,
  ) {
    return await this.prisma.event.findMany({
      skip: offset,
      take: limit,
      where: {
        creator: {
          username: username,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        eventColors: true,
        eventChat: {
          select: {
            id: true,
          },
        },
      },
    });
  }
  async getEventListForUserJoined(
    offset: number,
    limit: number,
    username: string,
  ) {
    return await this.prisma.event.findMany({
      skip: offset,
      take: limit,
      where: {
        participants: {
          some: {
            username: username,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        eventColors: true,
        eventChat: {
          select: {
            id: true,
          },
        },
      },
    });
  }
}
