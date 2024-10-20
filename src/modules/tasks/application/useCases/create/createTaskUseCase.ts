import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { inject, injectable } from 'tsyringe';
import { CreateTaskRequest } from '@modules/tasks/application/useCases/create/createTaskRequest';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { Task } from '@modules/tasks/domain/task';
import { TaskTitle } from '@modules/tasks/domain/valueObjects/taskTitle/taskTitle';
import { TaskDescription } from '@modules/tasks/domain/valueObjects/taskDescription/taskDescription';
import { TaskStatus, TaskStatusEnum } from '@modules/tasks/domain/valueObjects/taskStatus/taskStatus';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

@injectable()
export class CreateTaskUseCase extends BaseUseCase<CreateTaskRequest, TaskResponse> {
  constructor(@inject('TaskRepository') private readonly repository: TaskRepository) {
    super();
  }

  public async run(request: CreateTaskRequest): Promise<TaskResponse> {
    const newTask = Task.build({
      taskId: TaskId.newId(),
      title: TaskTitle.build(request.title),
      description: TaskDescription.build(request.description),
      status: TaskStatus.build(request.status as TaskStatusEnum),
      userId: UserId.build(request.userId),
    });

    await this.repository.save(newTask);

    return newTask.toPrimitives();
  }
}
