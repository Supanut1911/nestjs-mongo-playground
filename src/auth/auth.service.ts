import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { username, password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
