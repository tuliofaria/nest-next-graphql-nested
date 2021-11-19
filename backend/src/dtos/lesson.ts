import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Lesson {
  @Field()
  id: string;

  @Field()
  name: string;
}