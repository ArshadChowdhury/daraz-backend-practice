import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Test Coffee',
      brand: 'Test Brand',
      flavors: ['fake flavor 1', 'fake flavor 2'],
    },
  ];

  findAllCoffees(limit, offset) {
    console.log(limit, offset);

    return this.coffees;
  }

  findOneCoffee(id) {
    const coffee = this.coffees.find((coffee) => coffee.id == id);

    if (!coffee) {
      throw new HttpException(
        `Coffee ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return coffee;
  }

  createCoffee(coffee) {
    this.coffees.push(coffee);
    return coffee;
  }

  updateCoffee(id, coffee) {
    const index = this.coffees.findIndex((c) => c.id == id);

    console.log(index);

    if (index !== -1) {
      // Update the coffee at the found index
      this.coffees[index] = { ...this.coffees[index], ...coffee };
      return this.coffees[index];
    } else {
      return `Coffee with ID ${id} not found`;
    }
  }

  deleteCoffee(id) {
    this.coffees.splice(id - 1, 1);
    return `${id} was deleted from database`;
  }
}
