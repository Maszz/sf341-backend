import {
  Field,
  Int,
  ObjectType,
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  InputType,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuardGraphql } from '../auth/guard/jwt-auth-graphql.guard';
@InputType()
export class GetMessageInput {
  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  offset?: number;
  @Field((type) => Int, { nullable: true, defaultValue: 20 })
  limit?: number;
}
@InputType()
export class SaveMessageInput {
  @Field()
  //   sender_id: string;
  @Field()
  senderName: string;
  @Field()
  message: string;
}
const pubSub = new PubSub();

@Resolver((of) => Message)
export class MessageResolver {
  constructor(private readonly msgSservice: MessageService) {}

  @UseGuards(JwtAuthGuardGraphql)
  @Query((returns) => [Message])
  async getMessage(@Args('getMessageInput') getMessageInput: GetMessageInput) {
    const data = await this.msgSservice.Messages({
      skip: getMessageInput.offset,
      take: getMessageInput.limit,
      orderBy: {
        date: 'desc',
      },
    });
    console.log(data);
    return data;
  }
  @UseGuards(JwtAuthGuardGraphql)
  @Mutation((returns) => Message)
  async saveMessage(
    @Args('saveMessageData') saveMessageData: SaveMessageInput,
  ) {
    const data = await this.msgSservice.createMessage(saveMessageData);
    pubSub.publish('messageAdded', { messageAdded: data });

    return data;
  }
  //   @ResolveField()
  //   async posts(@Parent() author: Message) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }

  @Subscription((returns) => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
