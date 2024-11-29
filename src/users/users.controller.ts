import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './entities/user.entity';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Public()
  @Post('new-user')
  createNewUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
