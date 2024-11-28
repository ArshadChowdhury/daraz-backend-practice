import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Size } from './entities/size.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  findAllProducts(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.productRepository.find({
      relations: ['sizes'],
      skip: offset,
      take: limit,
    });
  }

  async findOneProduct(id) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!product) {
      throw new HttpException(
        `Product no. ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const sizes = await Promise.all(
      createProductDto.sizes.map((name) => this.preloadSizesByName(name)),
    );

    const product = this.productRepository.create({
      ...createProductDto,
      sizes,
    });
    return this.productRepository.save(product);
  }

  async updateProduct(id, updateProductDto: UpdateProductDto) {
    const sizes =
      updateProductDto.sizes &&
      (await Promise.all(
        updateProductDto.sizes.map((name) => this.preloadSizesByName(name)),
      ));

    const product = await this.productRepository.preload({
      id: +id,
      ...updateProductDto,
      sizes,
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return this.productRepository.save(product);
  }

  async deleteProduct(id) {
    const product = await this.productRepository.findOne({ where: { id } });
    return this.productRepository.remove(product);
  }

  private async preloadSizesByName(name: string): Promise<Size> {
    const existingSize = await this.sizeRepository.findOne({
      where: { name },
    });

    if (existingSize) {
      return existingSize;
    }

    return this.sizeRepository.create({ name });
  }
}
