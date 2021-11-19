import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CourseModule {
  @Field()
  id: string;

  @Field()
  name: string;
}