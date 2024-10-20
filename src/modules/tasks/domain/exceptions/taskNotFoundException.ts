import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class TaskNotFoundException extends DomainException {
  constructor(taskId: string) {
    super({
      name: 'TaskNotFoundException',
      message: 'Task not found',
      status: 404,
      code: ERROR_CODES['TaskNotFoundException'],
      errorType: 'error',
      metadata: { taskId },
    });
  }
}
