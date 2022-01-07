import { ObjectType, Field } from '@nestjs/graphql';
import { Image } from './image';

@ObjectType()
export class Course {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Image, { nullable: true })
  image?: Image;
}
