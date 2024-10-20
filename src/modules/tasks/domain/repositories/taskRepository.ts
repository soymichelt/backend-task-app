import { Task } from '@modules/tasks/domain/task';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  remove(task: Task): Promise<void>;
  find(taskId: TaskId): Promise<Task | undefined>;
  findAll(userId: UserId): Promise<Task[]>;
}
