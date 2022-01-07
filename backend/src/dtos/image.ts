import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Image {
  @Field()
  @Directive('@external')
  id: string;

  @Field()
  url: string;
}
