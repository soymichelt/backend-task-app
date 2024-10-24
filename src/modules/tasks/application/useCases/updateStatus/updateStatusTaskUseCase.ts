import { inject, injectable } from 'tsyringe';
import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { UpdateStatusTaskRequest } from '@modules/tasks/application/useCases/updateStatus/updateStatusTaskRequest';
import { TaskStatus } from '@modules/tasks/domain/valueObjects/taskStatus/taskStatus';
import { TaskNotFoundException } from '@modules/tasks/domain/exceptions/taskNotFoundException';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

@injectable()
export class UpdateStatusTaskUseCase extends BaseUseCase<UpdateStatusTaskRequest, TaskResponse> {
  constructor(@inject('TaskRepository') private readonly repository: TaskRepository) {
    super();
  }

  public async run(request: UpdateStatusTaskRequest): Promise<TaskResponse> {
    const taskId = TaskId.build(request.taskId);
    const userId = UserId.build(request.userId);

    const taskSelected = await this.repository.find(taskId, userId);
    if (!taskSelected) {
      throw new TaskNotFoundException(taskId.value);
    }

    taskSelected.updateStatus(TaskStatus.fromString(request.status));

    await this.repository.save(taskSelected);

    return taskSelected.toPrimitives();
  }
}
