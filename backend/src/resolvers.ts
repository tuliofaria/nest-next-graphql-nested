import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Course } from './dtos/course';
import { CourseModule } from './dtos/course-module';
import { Image, ImageParams } from './dtos/image';
import { Lesson } from './dtos/lesson';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface IImage {
  id: string;
  url: string;
}
interface ILesson {
  id: string;
  name: string;
  metadata: any;
}

interface IModule {
  id: string;
  name: string;
  lessons: ILesson[];
  firstLesson: ILesson;
}

interface ICourse {
  id: string;
  name: string;
  modules: IModule[];
  image?: IImage;
}

const courses: ICourse[] = [];

for (let j = 0; j < 10; j++) {
  const course: ICourse = {
    id: `${j}`,
    name: `Course ${j}`,
    modules: [],
  };

  for (let k = 0; k < 15; k++) {
    const module = {
      id: `c${course.id}-m${k}`,
      name: `Module ${course.id}/${k}`,
    };
    const lessons = [];
    for (let i = 0; i < 100; i++) {
      lessons.push({
        id: `c${course.id}-m${k}-l${i}`,
        name: `lesson ${i}`,
        metadata: {
          moduleName: 'name',
          list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          sub: {
            sub: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        },
      });
    }
    course.modules.push({
      ...module,
      lessons,
      firstLesson: lessons[0],
    });
  }

  courses.push(course);
}

@Resolver((of) => Course)
export class FakeDataResolver {
  @ResolveField('image', () => Image)
  async getImage(
    @Parent() course: Course,
    @Args('params') params: ImageParams,
  ): Promise<Image> {
    console.log(params);
    return {
      id: 'test',
      url: 'aaa',
    };
  }

  @Query((returns) => Course)
  async course(@Args('id') id: string): Promise<Course> {
    await sleep(2000);
    const course = courses.find((course) => course.id === id);
    return course;
  }

  @Query((returns) => [CourseModule])
  async courseModules(@Args('id') id: string): Promise<CourseModule[]> {
    await sleep(2000);
    const course = courses.find((course) => course.id === id);
    return course.modules;
  }

  @Query((returns) => [Course])
  async courses(): Promise<Course[]> {
    await sleep(2000);
    return courses;
  }

  @Query((returns) => [Lesson])
  async lessons(
    @Args('id') id: string,
    @Args('idModule') idM: string,
  ): Promise<Lesson[]> {
    await sleep(2000);
    const course = courses.find((course) => course.id === id);
    const courseModule = course.modules.find((module) => module.id === idM);
    return courseModule.lessons;
  }
}
