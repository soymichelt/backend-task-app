import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class CreateUserAuthException extends DomainException {
  constructor(email: string, error: Error | any) {
    super({
      name: 'CreateUserAuthException',
      message: 'Unexpected error creating user authentication',
      status: 500,
      code: ERROR_CODES['CreateUserAuthException'],
      errorType: 'error',
      metadata: {
        email,
        message: error.message,
        stack: error.stack,
        code: error.code,
      },
    });
  }
}
