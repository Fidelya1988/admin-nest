import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = ['Alice', 'Bob'];

  getUsers(): string[] {
    return this.users;
  }
}
