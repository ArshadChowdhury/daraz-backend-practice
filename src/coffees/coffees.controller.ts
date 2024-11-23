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

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() query) {
    const { limit, offset } = query;
    return this.coffeesService.findAllCoffees(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOneCoffee(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    return this.coffeesService.createCoffee(body);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body) {
    return this.coffeesService.updateCoffee(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.coffeesService.deleteCoffee(id);
  }
}
