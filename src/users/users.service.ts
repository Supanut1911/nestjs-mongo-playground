import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      name: 'Alice doe',
      username: 'alice',
      password: 'alice123',
    },
    {
      id: '2',
      name: 'Bob doe',
      username: 'bob',
      password: 'bob123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
