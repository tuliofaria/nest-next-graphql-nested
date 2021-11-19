import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { FakeDataResolver } from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    FakeDataResolver
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
