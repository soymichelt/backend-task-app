import { inject, injectable } from 'tsyringe';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { DeleteTaskRequest } from '@modules/tasks/application/useCases/delete/deleteTaskRequest';
import { DeleteTaskUseCase } from '@modules/tasks/application/useCases/delete/deleteTaskUseCase';

type DeleteTaskControllerRequest = Omit<DeleteTaskRequest, 'userId'> & {
  user: {
    userId: string;
  };
};

@injectable()
export class DeleteTaskController extends BaseController<DeleteTaskControllerRequest, void> {
  constructor(@inject('DeleteTaskUseCase') private readonly useCase: DeleteTaskUseCase) {
    super();
  }

  public async run(request: DeleteTaskControllerRequest): Promise<void> {
    await this.useCase.run({
      taskId: request.taskId,
      userId: request.user?.userId,
    });
  }
}
