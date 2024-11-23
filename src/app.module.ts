import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { ProductsModule } from './products/tweet.module';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';

ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ProductsModule],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}
