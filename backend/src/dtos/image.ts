import {
  ObjectType,
  Field,
  Directive,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';

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

export enum ImageResizeType {
  FILL,
  CROP,
}
export enum ImageGravityType {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  NORTH_EAST,
  NORTH_WEST,
  SOUTH_EAST,
  SOUTH_WEST,
  CENTER,
}

registerEnumType(ImageResizeType, {
  name: 'ImageResizeType',
  description: 'Image resizes',
  valuesMap: {
    FILL: {
      description: 'Fill',
    },
    CROP: {
      description: 'Crop',
    },
  },
});

registerEnumType(ImageGravityType, {
  name: 'ImageGravityType',
  description: 'Gravity resizes',
  valuesMap: {
    NORTH: {
      description: 'north (top edge)',
    },
    SOUTH: {
      description: 'south (bottom edge)',
    },
    EAST: {
      description: 'east (right edge)',
    },
    WEST: {
      description: 'west (left edge)',
    },
    NORTH_EAST: {
      description: 'north-east (top-right corner)',
    },
    NORTH_WEST: {
      description: 'north-west (top-left corner)',
    },
    SOUTH_EAST: {
      description: 'south-east (bottom-right corner)',
    },
    SOUTH_WEST: {
      description: 'south-west (bottom-left corner)',
    },
    CENTER: {
      description: 'center',
    },
  },
});

@InputType()
export class ImageParams {
  @Field()
  id: string;

  @Field(() => ImageResizeType, { nullable: true })
  resizeType?: ImageResizeType;

  @Field(() => ImageGravityType, { nullable: true })
  gravityType?: ImageGravityType;

  @Field()
  url: string;
}
