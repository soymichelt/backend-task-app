import { DomainException } from '@shared/domain/exceptions/domainException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';

export class UserTokenRequiredException extends DomainException {
  constructor() {
    super({
      name: 'UserTokenRequiredException',
      message: 'User token required',
      status: 403,
      code: ERROR_CODES['UserTokenRequiredException'],
      errorType: 'error',
    });
  }
}
