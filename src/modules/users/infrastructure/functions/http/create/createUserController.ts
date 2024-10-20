import { inject, injectable } from 'tsyringe';
import { UserCreatedResponse } from '@modules/users/application/responses/userCreatedResponse';
import { CreateUserRequest } from '@modules/users/application/useCases/create/createUserRequest';
import { CreateUserUseCase } from '@modules/users/application/useCases/create/createUserUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';

@injectable()
export class CreateUserController extends BaseController<CreateUserRequest, UserCreatedResponse> {
  constructor(@inject('CreateUserUseCase') private readonly useCase: CreateUserUseCase) {
    super();
  }

  public async run(request: CreateUserRequest): Promise<UserCreatedResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
