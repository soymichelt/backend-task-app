import { inject, injectable } from 'tsyringe';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { DeleteTaskRequest } from '@modules/tasks/application/useCases/delete/deleteTaskRequest';
import { DeleteTaskUseCase } from '@modules/tasks/application/useCases/delete/deleteTaskUseCase';

@injectable()
export class DeleteTaskController extends BaseController<DeleteTaskRequest, void> {
  constructor(@inject('DeleteTaskUseCase') private readonly useCase: DeleteTaskUseCase) {
    super();
  }

  public async run(request: DeleteTaskRequest): Promise<void> {
    await this.useCase.run(request);
  }
}
