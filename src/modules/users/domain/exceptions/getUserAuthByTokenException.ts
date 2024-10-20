import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class GetUserAuthByTokenException extends DomainException {
  constructor(token: string, error: Error | any) {
    super({
      name: 'GetUserAuthByTokenException',
      message: 'Unexpected error while user auth token is verified',
      status: 403,
      code: ERROR_CODES['GetUserAuthByTokenException'],
      errorType: 'error',
      metadata: {
        token,
        message: error.message,
        stack: error.stack,
        code: error.code,
      },
    });
  }
}
