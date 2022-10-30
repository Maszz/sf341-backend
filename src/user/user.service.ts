import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import {
  UpdateOnboardingParams,
  UpdateOnboardingGenderParams,
} from './user.controller';
interface IUpdateProfileParamsArgs {
  updateParams: {
    name?: string;
    surname?: string;
    bio?: string;
  };
  username: string;
}
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    // includeInput: Prisma.UserInclude | null = null,
  ): Promise<Prisma.Prisma__UserClient<User & unknown>> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      // include: includeInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user
      .create({
        data,
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async updateProfile(args: IUpdateProfileParamsArgs) {
    const { username, updateParams } = args;
    return this.prisma.user.update({
      where: {
        username: username,
      },
      data: {
        profile: {
          update: updateParams,
        },
      },
    });
  }

  async UpdateOnboarding(args: UpdateOnboardingParams) {
    const { onboarding, userId } = args;
    return this.prisma.user.update({
      where: {
        username: userId,
      },
      data: {
        onboarding: onboarding,
      },
    });
  }

  async UpdateOnboardingGender(args: UpdateOnboardingGenderParams) {
    const { gender, userId } = args;
    return this.prisma.user.update({
      where: {
        username: userId,
      },
      data: {
        profile: {
          update: {
            gender: gender,
          },
        },
      },
    });
  }

  async setCategoryToUser({
    tags,
    userId,
  }: {
    tags: string[];
    userId: string;
  }) {
    const categoryId = await this.prisma.category.findMany({
      where: {
        name: {
          in: ['Technology', 'Science', 'Politics', 'Sports'],
        },
      },
      select: {
        id: true,
        // name: true,
      },
    });
    this.prisma.user.update({
      where: {
        username: userId,
      },
      data: {
        // categoryIDs: {
        //   set: categoryId.map((category) => category.id),
        // },
        categories: {
          connect: categoryId,
        },
      },
    });
  }

  async getTags() {
    return this.prisma.category.findMany({
      select: {
        name: true,
      },
    });
  }
}
