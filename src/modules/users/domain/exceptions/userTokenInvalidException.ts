import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class UserTokenInvalidException extends DomainException {
  constructor() {
    super({
      name: 'UserTokenInvalidException',
      message: 'User token invalid',
      status: 403,
      code: ERROR_CODES['UserTokenInvalidException'],
      errorType: 'error',
    });
  }
}
