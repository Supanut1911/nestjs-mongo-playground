import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateTaskDTO } from './DTO/createTask.dto';
import { GetUser } from 'src/utils/get-user.decorator';
import { User } from 'src/users/user.model';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Post()
  async createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ) {
    return await this.taskService.createTaks(user, createTaskDTO);
  }
}
