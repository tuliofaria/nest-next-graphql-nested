import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Lesson {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => GraphQLJSON)
  metadata: any;
}