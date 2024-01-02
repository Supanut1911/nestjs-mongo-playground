import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './DTO/createUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModule: Model<User>,
  ) {}

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

  async insertUser(createUserDTO: CreateUserDTO) {
    const { username, password, name } = createUserDTO;

    try {
      const hashPassword = encodePassword(password);
      const newUser = new this.userModule({
        username,
        password: hashPassword,
        name,
      });
      const user = await newUser.save();
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
