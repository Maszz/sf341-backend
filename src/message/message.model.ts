import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field((type) => ID)
  _id: string;

  @Field((type) => String, { nullable: true })
  sender_id?: string;

  @Field((type) => String, { nullable: true })
  senderName?: string;

  @Field((type) => String, { nullable: true })
  message: string;

  @Field((type) => Date)
  date: Date;
}
