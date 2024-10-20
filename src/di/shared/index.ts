import { container } from 'tsyringe';
import { RequestParserController } from '@shared/infrastructure/controllers/requests/requestParserController';
import { FcfHttpV2RequestParserController } from '@shared/infrastructure/controllers/requests/fcfHttpRequestParserController';
import { ManagerRequestParsersController } from '@shared/infrastructure/controllers/requests/managerRequestParsersController';
import { Logger } from '@shared/domain/loggers/logger';
import { FirebaseLogger } from '@shared/infrastructure/loggers/firebase/firebaseLogger';
import { AuthService } from '@modules/users/domain/services/authService';
import { FirebaseAuthService } from '@modules/users/infrastructure/services/firebase/firebaseAuthService';
import { UserRepository } from '@modules/users/domain/repositories/userRepository';
import { FirestoreUserRepository } from '@modules/users/infrastructure/persistence/firestore/firestoreUserRepository';
import { TaskRepository } from '@modules/tasks/domain/repositories/taskRepository';
import { FirestoreTaskRepository } from '@modules/tasks/infrastructure/persistence/firestore/firestoreTaskRepository';

container
  .register<Logger>('Logger', FirebaseLogger)
  .register<RequestParserController>('RequestParserController', FcfHttpV2RequestParserController)
  .register<ManagerRequestParsersController>('ManagerRequestParsersController', ManagerRequestParsersController)
  .register<AuthService>('AuthService', FirebaseAuthService)
  .register<UserRepository>('UserRepository', FirestoreUserRepository)
  .register<TaskRepository>('TaskRepository', FirestoreTaskRepository);

export { container };
