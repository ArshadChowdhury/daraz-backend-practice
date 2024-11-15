import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHelloUser(): string {
    return 'Hello again from User';
  }
}
