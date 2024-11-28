import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Arshad Chowdhury',
      username: 'arshad23',
      password: '1234ZZ',
    },
    {
      id: 2,
      name: 'Ahsaan Chowdhury',
      username: 'ahsaan23',
      password: '1234ZZ',
    },
    {
      id: 3,
      name: 'Sazzad Hossain',
      username: 'sazzad23',
      password: '1234ZZ',
    },
    {
      id: 4,
      name: 'Maruf Hasan',
      username: 'maruf23',
      password: '1234ZZ',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);

    return newUser;
  }
}
