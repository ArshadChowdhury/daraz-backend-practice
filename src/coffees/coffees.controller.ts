import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = query;
    return this.coffeesService.findAllCoffees(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOneCoffee(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.createCoffee(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.updateCoffee(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.coffeesService.deleteCoffee(id);
  }
}
