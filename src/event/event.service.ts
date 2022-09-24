import { Injectable, Logger } from '@nestjs/common';
import { Log, Prisma, Event, EventChat } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
interface ICreateEventArgs {
  name: string;
  description: string;
  location: string;
  date: Date;
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
        name: data.name,
        description: data.description,
        date: data.date,
        location: data.location,
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
