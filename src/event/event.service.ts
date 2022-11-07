import { Injectable, Logger } from '@nestjs/common';
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
    this.logger.log('createEvent()');
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
          connectOrCreate: {
            where: {
              username: data.creatorUsername,
            },
            create: {
              username: data.creatorUsername,
              email: data.creatorUsername,
            },
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

    const paticipan = await this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        participants: {
          connect: {
            id: username,
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

  async getEventById(eventId: string) {
    return await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        creator: true,
        participants: true,
        eventChat: true,
      },
    });
  }
}
