import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users')
  getHelloFromUser(): string {
    return this.userService.getHelloUser();
  }
}
