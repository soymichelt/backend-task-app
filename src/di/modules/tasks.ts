import { container } from '@di/shared/index';
import { CreateTaskUseCase } from '@modules/tasks/application/useCases/create/createTaskUseCase';
import { DeleteTaskUseCase } from '@modules/tasks/application/useCases/delete/deleteTaskUseCase';
import { FindAllTasksUseCase } from '@modules/tasks/application/useCases/findAll/findAllTasksUseCase';
import { UpdateTaskUseCase } from '@modules/tasks/application/useCases/update/updateTaskUseCase';
import { CreateTaskController } from '@modules/tasks/infrastructure/functions/http/create/createTaskController';
import { DeleteTaskController } from '@modules/tasks/infrastructure/functions/http/delete/deleteTaskController';
import { FindAllTasksController } from '@modules/tasks/infrastructure/functions/http/findAll/findAllTasksController';
import { UpdateTaskController } from '@modules/tasks/infrastructure/functions/http/update/updateTaskController';
import { VerifyUserTokenUseCase } from '@modules/users/application/useCases/verifyToken/verifyUserTokenUseCase';
import { VerifyUserTokenController } from '@modules/users/infrastructure/functions/middleware/auth/verifyUserTokenController';

container
  .register<VerifyUserTokenUseCase>('VerifyUserTokenUseCase', VerifyUserTokenUseCase)
  .register<VerifyUserTokenController>('VerifyUserTokenController', VerifyUserTokenController)
  .register<CreateTaskUseCase>('CreateTaskUseCase', CreateTaskUseCase)
  .register<CreateTaskController>('CreateTaskController', CreateTaskController)
  .register<UpdateTaskUseCase>('UpdateTaskUseCase', UpdateTaskUseCase)
  .register<UpdateTaskController>('UpdateTaskController', UpdateTaskController)
  .register<DeleteTaskUseCase>('DeleteTaskUseCase', DeleteTaskUseCase)
  .register<DeleteTaskController>('DeleteTaskController', DeleteTaskController)
  .register<FindAllTasksUseCase>('FindAllTasksUseCase', FindAllTasksUseCase)
  .register<FindAllTasksController>('FindAllTasksController', FindAllTasksController);

export { container };
