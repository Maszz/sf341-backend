import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(
    keyword: string,
  ): Promise<{ content: string; type: string; id?: string }[]> {
    const events = this.prisma.event.findMany({
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
        id: true,
      },
    });
    const eventsArr = (await events).map((event) => {
      return { content: event.name, type: 'event', id: event.id };
    });
    const user = this.prisma.user.findMany({
      where: {
        username: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      select: { username: true },
    });
    const userArr = (await user).map((user) => {
      return { content: user.username, type: 'user' };
    });
    const result = [...eventsArr, ...userArr];
    return result;
  }
}
