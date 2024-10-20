import { container } from '@di/shared/index';
import { CreateUserUseCase } from '@modules/users/application/useCases/create/createUserUseCase';
import { GetUserUseCase } from '@modules/users/application/useCases/get/getUserUseCase';
import { CreateUserController } from '@modules/users/infrastructure/functions/http/create/createUserController';
import { GetUserController } from '@modules/users/infrastructure/functions/http/get/getUserController';
import { VerifyUserTokenUseCase } from '@modules/users/application/useCases/verifyToken/verifyUserTokenUseCase';
import { VerifyUserTokenController } from '@modules/users/infrastructure/functions/middleware/auth/verifyUserTokenController';

container
  .register<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase)
  .register<CreateUserController>('CreateUserController', CreateUserController)
  .register<GetUserUseCase>('GetUserUseCase', GetUserUseCase)
  .register<GetUserController>('GetUserController', GetUserController)
  .register<VerifyUserTokenUseCase>('VerifyUserTokenUseCase', VerifyUserTokenUseCase)
  .register<VerifyUserTokenController>('VerifyUserTokenController', VerifyUserTokenController);

export { container };
