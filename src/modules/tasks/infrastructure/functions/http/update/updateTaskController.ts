import { inject, injectable } from 'tsyringe';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { UpdateTaskRequest } from '@modules/tasks/application/useCases/update/updateTaskRequest';
import { UpdateTaskUseCase } from '@modules/tasks/application/useCases/update/updateTaskUseCase';

type UpdateTaskControllerRequest = Omit<UpdateTaskRequest, 'userId'> & {
  user: {
    userId: string;
  };
};

@injectable()
export class UpdateTaskController extends BaseController<UpdateTaskControllerRequest, TaskResponse> {
  constructor(@inject('UpdateTaskUseCase') private readonly useCase: UpdateTaskUseCase) {
    super();
  }

  public async run(request: UpdateTaskControllerRequest): Promise<TaskResponse> {
    const result = await this.useCase.run({
      taskId: request.taskId,
      title: request.title,
      description: request.description,
      deadline: request.deadline,
      status: request.status,
      level: request.level,
      userId: request.user?.userId,
    });

    return result;
  }
}
