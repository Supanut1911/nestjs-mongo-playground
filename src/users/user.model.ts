import * as mongoose from 'mongoose';
import { Task } from 'src/tasks/tasks.model';

export const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  tasks: Task[];
}
