import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async insertUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.insertUser(createUserDTO);
  }
}
