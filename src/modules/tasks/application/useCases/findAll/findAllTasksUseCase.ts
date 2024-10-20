import { inject, injectable } from 'tsyringe';
import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { FindAllTasksRequest } from '@modules/tasks/application/useCases/findAll/findAllTasksRequest';
import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';

@injectable()
export class FindAllTasksUseCase extends BaseUseCase<FindAllTasksRequest, TaskResponse[]> {
  constructor(@inject('TaskRepository') private readonly repository: TaskRepository) {
    super();
  }

  public async run(request: FindAllTasksRequest): Promise<TaskResponse[]> {
    const userId = UserId.build(request.userId);

    const tasks = await this.repository.findAll(userId);

    return tasks.map((task) => task.toPrimitives());
  }
}
