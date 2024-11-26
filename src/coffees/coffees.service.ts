import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAllCoffees(limit, offset) {
    console.log(limit, offset);

    return this.coffeeRepository.find();
  }

  async findOneCoffee(id) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new HttpException(
        `Coffee ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return coffee;
  }

  createCoffee(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async updateCoffee(id, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async deleteCoffee(id) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    return this.coffeeRepository.remove(coffee);
  }
}
