import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class GetUserAuthException extends DomainException {
  constructor(emailOrUserId: string, error: Error | any) {
    super({
      name: 'GetUserAuthException',
      message: 'Unexpected error while obtaining user auth',
      status: 500,
      code: ERROR_CODES['GetUserAuthException'],
      errorType: 'error',
      metadata: {
        emailOrUserId,
        message: error.message,
        stack: error.stack,
        code: error.code,
      },
    });
  }
}
