import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { FindAllTasksUseCase } from '@modules/tasks/application/useCases/findAll/findAllTasksUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

type FindAllTasksControllerRequest = {
  user: {
    userId: string;
  };
};

@injectable()
export class FindAllTasksController extends BaseController<FindAllTasksControllerRequest, TaskResponse[]> {
  constructor(@inject('FindAllTasksUseCase') private readonly useCase: FindAllTasksUseCase) {
    super();
  }

  public async run(request: FindAllTasksControllerRequest): Promise<TaskResponse[]> {
    const result = await this.useCase.run({
      userId: request.user?.userId,
    });

    return result;
  }
}
