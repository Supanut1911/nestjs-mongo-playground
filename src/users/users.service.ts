import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './DTO/createUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModule: Model<User>,
  ) {}

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

  async findUserByUsername(username: string) {
    try {
      const user = await this.userModule.findOne({ username });
      if (!user) {
        throw new NotFoundException(error);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
