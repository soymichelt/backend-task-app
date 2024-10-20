import { BaseUseCase } from '@shared/domain/useCases/baseUseCases';
import { inject, injectable } from 'tsyringe';
import { CreateUserRequest } from './createUserRequest';
import { UserRepository } from '@modules/users/domain/repositories/userRepository';
import { AuthService } from '@modules/users/domain/services/authService';
import { UserEmail } from '@modules/users/domain/valueObjects/userEmail/userEmail';
import { UserId } from '@modules/users/domain/valueObjects/userId/userId';
import { UserPassword } from '@modules/users/domain/valueObjects/userPassword/userPassword';
import { User } from '@modules/users/domain/user';
import { EmailAlreadyExistsException } from '@modules/users/domain/exceptions/emailAlreadyExistsException';
import { UserToken } from '@modules/users/domain/valueObjects/userToken/userToken';
import { UserCreatedResponse } from '@modules/users/application/responses/userCreatedResponse';

@injectable()
export class CreateUserUseCase extends BaseUseCase<CreateUserRequest, UserCreatedResponse> {
  constructor(
    @inject('UserRepository') private readonly repository: UserRepository,
    @inject('AuthService') private readonly service: AuthService,
  ) {
    super();
  }

  public async run(request: CreateUserRequest): Promise<UserCreatedResponse> {
    const email = UserEmail.build(request.email);

    const userSelected = await this.repository.findByEmail(email);
    if (userSelected) {
      throw new EmailAlreadyExistsException(email.value);
    }

    const newUser = User.build({
      userId: UserId.newId(),
      email,
      password: UserPassword.build(request.password),
    });

    await this.repository.save(newUser);
    const token = await this.service.create(newUser);

    return this.mapUserToResponse(newUser, token);
  }

  private mapUserToResponse(user: User, token: UserToken): UserCreatedResponse {
    const primitives = user.toPrimitives();

    return {
      userId: primitives.userId,
      email: primitives.email,
      token: token.value,
    };
  }
}
