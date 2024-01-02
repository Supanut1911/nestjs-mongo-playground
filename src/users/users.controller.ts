import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async insertUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.insertUser(createUserDTO);
  }

  @Get(':username')
  async findUserById(@Param('username') username: string) {
    return await this.userService.findUserByUsername(username);
  }
}
