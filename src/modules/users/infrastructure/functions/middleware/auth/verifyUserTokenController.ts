import { UserResponse } from '@modules/users/application/responses/userResponse';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { VerifyUserTokenUseCase } from '@modules/users/application/useCases/verifyToken/verifyUserTokenUseCase';
import { inject, injectable } from 'tsyringe';

type VerifyUserTokenControllerRequest = {
  headers: {
    authorization: string;
  };
};

@injectable()
export class VerifyUserTokenController extends BaseController<VerifyUserTokenControllerRequest, UserResponse> {
  constructor(@inject('VerifyUserTokenUseCase') private readonly useCase: VerifyUserTokenUseCase) {
    super();
  }

  public async run(request: VerifyUserTokenControllerRequest): Promise<UserResponse> {
    const { authorization } = request.headers;
    const result = await this.useCase.run({
      token: authorization?.replace('Bearer ', ''),
    });

    return result;
  }
}
