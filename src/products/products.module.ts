import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Size } from './entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Size])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
