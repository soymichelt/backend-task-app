import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { CreateTaskRequest } from '@modules/tasks/application/useCases/create/createTaskRequest';
import { CreateTaskUseCase } from '@modules/tasks/application/useCases/create/createTaskUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

type CreateTaskControllerRequest = Omit<CreateTaskRequest, 'userId'> & {
  user: {
    userId: string;
  };
};

@injectable()
export class CreateTaskController extends BaseController<CreateTaskControllerRequest, TaskResponse> {
  constructor(@inject('CreateTaskUseCase') private readonly useCase: CreateTaskUseCase) {
    super();
  }

  public async run(request: CreateTaskControllerRequest): Promise<TaskResponse> {
    const result = await this.useCase.run({
      title: request.title,
      description: request.description,
      status: request.status,
      userId: request.user?.userId,
    });

    return result;
  }
}
