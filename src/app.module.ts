import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';

ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [ConfigModule.forRoot(), UserModule, TweetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
