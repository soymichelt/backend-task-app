import { inject, injectable } from 'tsyringe';
import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { GetUserRequest } from '@modules/users/application/useCases/get/getUserRequest';
import { UserResponse } from '@modules/users/application/responses/userResponse';
import { UserRepository } from '@modules/users/domain/repositories/userRepository';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { User } from '@modules/users/domain/user';

@injectable()
export class GetUserUseCase extends BaseUseCase<GetUserRequest, UserResponse> {
  constructor(@inject('UserRepository') private readonly repository: UserRepository) {
    super();
  }

  public async run(request: GetUserRequest): Promise<UserResponse> {
    const email = UserEmail.build(request.email);

    const userSelected = await this.repository.findByEmail(email);
    if (!userSelected) {
      throw new Error();
    }

    return this.mapUserToResponse(userSelected);
  }

  private mapUserToResponse(user: User): UserResponse {
    const primitives = user.toPrimitives();
    delete primitives.password;

    return primitives;
  }
}
