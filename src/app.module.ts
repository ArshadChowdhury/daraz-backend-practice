import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { ProductsModule } from './products/tweet.module';
import { CoffeesModule } from './coffees/coffees.module';

ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ProductsModule, CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
