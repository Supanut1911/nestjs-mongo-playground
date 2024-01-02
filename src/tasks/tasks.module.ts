import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './tasks.model';
import { UserSchema } from 'src/users/user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Task',
        schema: TaskSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
