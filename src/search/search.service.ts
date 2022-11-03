import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

export interface SearchEventContent {
  content: string;
  type: string;
  id: string;
  date: Date;
  location: string;
}
export interface SearchUserContent {
  content: string;
  type: string;
  id: string;
  name: string;
  bio: string;
}
export type SearchContent = {
  content: string;
  type: string;
  id: string;
  date?: string;
  location?: string;
  name?: string;
  bio?: string;
};
export type test =
  | {
      content: string;
      type: string;
      id: string;
      date: Date;
      location: string;
    }
  | {
      content: string;
      type: string;
      id: string;
      name: string;
      bio: string;
    }[];

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(keyword: string): Promise<SearchContent[]> {
    const events = await this.prisma.event.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            creator: {
              username: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        name: true,
        date: true,
        location: true,
        id: true,
      },
    });
    const eventsArr = events.map((event) => {
      return {
        content: event.name,
        type: 'event',
        id: event.id,
        date: event.date,
        location: event.location,
      };
    });
    const user = await this.prisma.user.findMany({
      where: {
        username: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      select: {
        username: true,
        id: true,
        profile: {
          select: {
            name: true,
            bio: true,
          },
        },
      },
    });
    const userArr = user.map((user) => {
      return {
        content: user.username,
        type: 'user',
        id: user.id,
        name: user.profile?.name || '',
        bio: user.profile?.bio || '',
      };
    });
    const result = [...eventsArr, ...userArr] as SearchContent[];
    return result;
  }
}
