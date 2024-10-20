import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { inject, injectable } from 'tsyringe';
import { VerifyUserTokenRequest } from '@modules/users/application/useCases/verifyToken/verifyUserTokenRequest';
import { UserResponse } from '@modules/users/application/responses/userResponse';
import { AuthService } from '@modules/users/domain/services/authService';
import { UserToken } from '@modules/users/domain/valueObjects/userToken/userToken';
import { User } from '@modules/users/domain/user';

@injectable()
export class VerifyUserTokenUseCase extends BaseUseCase<VerifyUserTokenRequest, UserResponse> {
  constructor(@inject('AuthService') private readonly service: AuthService) {
    super();
  }

  public async run(request: VerifyUserTokenRequest): Promise<UserResponse> {
    const token = UserToken.build(request.token);

    const user = await this.service.getByToken(token);

    return this.mapUserToResponse(user);
  }

  private mapUserToResponse(user: User): UserResponse {
    const primitives = user.toPrimitives();
    delete primitives.password;

    return primitives;
  }
}
