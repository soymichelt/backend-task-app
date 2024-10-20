import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class UserAuthDisabledException extends DomainException {
  constructor() {
    super({
      name: 'UserAuthDisabledException',
      message: 'User auth disabled',
      status: 403,
      code: ERROR_CODES['UserAuthDisabledException'],
      errorType: 'error',
    });
  }
}
