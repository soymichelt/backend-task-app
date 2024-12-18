import { inject, injectable } from 'tsyringe';
import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { DeleteTaskRequest } from '@modules/tasks/application/useCases/delete/deleteTaskRequest';
import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { TaskId } from '@modules/tasks/domain/valueObjects/taskId/taskId';
import { TaskNotFoundException } from '@modules/tasks/domain/exceptions/taskNotFoundException';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

@injectable()
export class DeleteTaskUseCase extends BaseUseCase<DeleteTaskRequest, void> {
  constructor(@inject('TaskRepository') private readonly repository: TaskRepository) {
    super();
  }

  public async run(request: DeleteTaskRequest): Promise<void> {
    const taskId = TaskId.build(request.taskId);
    const userId = UserId.build(request.userId);

    const taskSelected = await this.repository.find(taskId, userId);
    if (!taskSelected) {
      throw new TaskNotFoundException(taskId.value);
    }

    await this.repository.remove(taskSelected);
  }
}
