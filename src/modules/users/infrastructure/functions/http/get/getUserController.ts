import { UserResponse } from '@modules/users/application/responses/userResponse';
import { GetUserRequest } from '@modules/users/application/useCases/get/getUserRequest';
import { GetUserUseCase } from '@modules/users/application/useCases/get/getUserUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserController extends BaseController<GetUserRequest, UserResponse> {
  constructor(@inject('GetUserUseCase') private readonly useCase: GetUserUseCase) {
    super();
  }

  public async run(request: GetUserRequest): Promise<UserResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
