import { inject, injectable } from 'tsyringe';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { UpdateStatusTaskRequest } from '@modules/tasks/application/useCases/updateStatus/updateStatusTaskRequest';
import { UpdateStatusTaskUseCase } from '@modules/tasks/application/useCases/updateStatus/updateStatusTaskUseCase';

type UpdateStatusTaskControllerRequest = Omit<UpdateStatusTaskRequest, 'userId'> & {
  user: {
    userId: string;
  };
};

@injectable()
export class UpdateStatusTaskController extends BaseController<UpdateStatusTaskControllerRequest, TaskResponse> {
  constructor(@inject('UpdateStatusTaskUseCase') private readonly useCase: UpdateStatusTaskUseCase) {
    super();
  }

  public async run(request: UpdateStatusTaskControllerRequest): Promise<TaskResponse> {
    const result = await this.useCase.run({
      taskId: request.taskId,
      status: request.status,
      userId: request.user?.userId,
    });

    return result;
  }
}
