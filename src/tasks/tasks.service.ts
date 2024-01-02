import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.model';
import { User } from 'src/users/user.model';
import { CreateTaskDTO } from './DTO/createTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private readonly taskModule: Model<Task>,

    @InjectModel('User')
    private readonly userModule: Model<User>,
  ) {}

  async createTaks(user: User, createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;
    const newTask = new this.taskModule({
      title,
      description,
      user: user.id,
    });

    const task = await newTask.save();
    const existUser = await this.userModule.findById(user.id);
    existUser.tasks = [...existUser.tasks, task];
    existUser.save();
    return task;
  }
}
