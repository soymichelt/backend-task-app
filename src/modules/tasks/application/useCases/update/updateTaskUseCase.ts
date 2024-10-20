import { inject, injectable } from 'tsyringe';
import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { UpdateTaskRequest } from '@modules/tasks/application/useCases/update/updateTaskRequest';
import { TaskTitle } from '@modules/tasks/domain/valueObjects/taskTitle/taskTitle';
import { TaskDescription } from '@modules/tasks/domain/valueObjects/taskDescription/taskDescription';
import { TaskStatus, TaskStatusEnum } from '@modules/tasks/domain/valueObjects/taskStatus/taskStatus';
import { TaskNotFoundException } from '@modules/tasks/domain/exceptions/taskNotFoundException';

@injectable()
export class UpdateTaskUseCase extends BaseUseCase<UpdateTaskRequest, TaskResponse> {
  constructor(@inject('TaskRepository') private readonly repository: TaskRepository) {
    super();
  }

  public async run(request: UpdateTaskRequest): Promise<TaskResponse> {
    const taskId = TaskId.build(request.taskId);

    const taskSelected = await this.repository.find(taskId);
    if (!taskSelected) {
      throw new TaskNotFoundException(taskId.value);
    }

    taskSelected.update({
      title: TaskTitle.build(request.title),
      description: TaskDescription.build(request.description),
      status: TaskStatus.build(request.status as TaskStatusEnum),
    });

    await this.repository.save(taskSelected);

    return taskSelected.toPrimitives();
  }
}
