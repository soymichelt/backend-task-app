import { inject, injectable } from 'tsyringe';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { TaskResponse } from '@modules/tasks/application/responses/taskResponse';
import { UpdateTaskRequest } from '@modules/tasks/application/useCases/update/updateTaskRequest';
import { UpdateTaskUseCase } from '@modules/tasks/application/useCases/update/updateTaskUseCase';

@injectable()
export class UpdateTaskController extends BaseController<UpdateTaskRequest, TaskResponse> {
  constructor(@inject('UpdateTaskUseCase') private readonly useCase: UpdateTaskUseCase) {
    super();
  }

  public async run(request: UpdateTaskRequest): Promise<TaskResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
