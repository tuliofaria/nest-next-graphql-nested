import { ObjectType, Field } from '@nestjs/graphql';
import { Lesson } from './lesson';

@ObjectType()
export class CourseModule {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(type => Lesson)
  firstLesson: Lesson;
}